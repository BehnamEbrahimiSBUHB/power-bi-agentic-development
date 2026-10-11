import type { EngineInterface, Register, Timer } from 'claude-code'
import { LINUX_LAUNCH as LAUNCH, openCommand } from './open'

import type { Explorer, Target, TreeNode } from '../types'
import { glyph, type Tier } from './icons'
import { FABRIC_SVG } from './svg-data'
import type { RowSpec, RowsProps, Seg } from './rows'
import { ancestors, EMPTY, empty, emptyMark, isLoaded, merge, visible } from './tree'
import { inOneLake, modelOf, parseChildren, parseOneLake, parseWorkspaces, PLACEHOLDER, typeLabel } from './fabric'
import { FAB_TONE, type FabKind, fabCalls, fabGuids, fabKind, fabPositionals, fabWorkspaces, type Invocation, invocations, join, modelFromConnection, posix, queryOf, targetLabel, tokenize, useDrives } from './parse'
import { fabTouched } from './touch'
import { COPY, REFRESH, runFailure, setupOf, setupRows, spawnFailure } from './setup'

const STATE = { plugin: 'fabric-cli', key: 'explorer' } as const
const NODES = { plugin: 'fabric-cli', key: 'nodes' } as const
const PANE = 'fabric-pane'
const TITLE = 'Fabric'
const TITLE_GLYPH = { fabric: 0xf2292, nerd: 'F', plain: 'F' }
const TITLE_COLOR = '#2dd4bf'
const HINT = 'waiting for a fab command, or /fabric-pane'
const SORT = false
const WINDOW = 400
const DETAIL_ROWS = 12
const HEADER = '#header'
const WHOLE_VERBS = new Set(['mkdir', 'create', 'rm', 'del', 'mv', 'move', 'rename'])
const BUSY_MAX_MS = 600_000
const FLASH_MS = 2700
const DOUBLE_MS = 450
const SHIMMER = ['#f97316', '#fb923c', '#fdba74', '#ffedd5']
const TONES: Record<string, { bright: string[]; dim: string[] }> = {
  orange: { bright: SHIMMER, dim: ['#8a4316', '#a3562a', '#bd7444', '#d29267'] },
  teal: { bright: ['#14b8a6', '#2dd4bf', '#5eead4', '#ccfbf1'], dim: ['#0f5e57', '#16786f', '#2a9488', '#4fb3a8'] },
  pink: { bright: ['#ec4899', '#f472b6', '#f9a8d4', '#fce7f3'], dim: ['#831843', '#9d174d', '#b8406f', '#cf6f93'] },
  purple: { bright: ['#a855f7', '#c084fc', '#d8b4fe', '#f3e8ff'], dim: ['#581c87', '#6b21a8', '#8b47c4', '#a874d6'] },
}
const PLAIN_SPINNER = ['|', '/', '-', '\\']
const FONT_SCRIPT =
  'if command -v fc-list >/dev/null 2>&1; then f=$(fc-list ":charset=$1" file | head -n1 | cut -d: -f1); ' +
  'else f=$(ls "$HOME"/Library/Fonts/*"$2"* /Library/Fonts/*"$2"* 2>/dev/null | head -n1); fi; ' +
  '[ -n "$f" ] || { echo missing; exit 0; }; m=$(stat -c %Z "$f" 2>/dev/null || stat -f %c "$f"); p=$PPID; ' +
  'while [ -n "$p" ] && [ "$p" -gt 1 ]; do c=$(ps -o comm= -p "$p" 2>/dev/null); c=$(basename "$c" 2>/dev/null | tr -d " "); case "$c" in ' +
  'ghostty|kitty|alacritty|Alacritty|foot|footclient|wezterm-gui|konsole|gnome-terminal-|xterm|urxvt|st|Terminal|iTerm2) ' +
  'e=$(ps -o etime= -p "$p" 2>/dev/null | awk -F\'[-:]\' \'{n=NF; s=$n+60*$(n-1); if (n>2) s+=3600*$(n-2); if (n>3) s+=86400*$(n-3); print s}\'); [ -n "$e" ] && [ $(( $(date +%s) - e )) -lt "$m" ] && echo stale || echo ok; exit 0;; esac; ' +
  'p=$(ps -o ppid= -p "$p" 2>/dev/null | tr -d " "); done; echo ok'

let lastPress = { key: '', at: 0 }
const views = new Map<string, { from: number; max: number }>()
let detected: Tier = 'nerd'
let glyphSetting = 'auto'
let fontHint = true
let hinted = false
let fellBack = false
let follow = true
let blink: Timer | null = null
let generation = 0
let running = 0
let closed = false
let noDock = false
let inflight: Promise<void> | null = null
let queued: Promise<void> | null = null
let platform: Promise<'linux' | 'darwin' | 'win32'> | null = null

function osName($: EngineInterface): Promise<'linux' | 'darwin' | 'win32'> {
  platform ??= (async () => {
    if ((await $.env.get('OS')) === 'Windows_NT') return 'win32'
    try {
      return (await $.process.run(['uname', '-s'], { timeoutMs: 3_000 })).stdout.trim() === 'Darwin' ? 'darwin' : 'linux'
    } catch {
      return 'linux'
    }
  })()
  return platform
}

async function openPane($: EngineInterface, args: { id: string; title: string; focus?: true }): Promise<void> {
  if (noDock && !args.focus) return
  await $.ui.open(args)
}

async function cwdOf($: EngineInterface): Promise<string> {
  return posix(await $.session.cwd())
}

function jumpTo(ex: Explorer, query: string): Partial<Explorer> {
  const q = query.trim().toLowerCase()
  const hits = q ? ex.nodes.filter(n => n.name.toLowerCase().includes(q) || n.note.toLowerCase().includes(q)).slice(0, 10) : []
  const open = new Set(ex.expanded)
  for (const n of hits) for (const a of ancestors(ex.nodes, n.id)) open.add(a)
  return { query: '', expanded: [...open], cursor: hits[0]?.id ?? ex.cursor, scroll: null }
}

async function copyOf($: EngineInterface, text: string, surface?: string): Promise<void> {
  const done = await $.ui.copy({ text, ...(surface ? { surface: surface as 'terminal' } : {}) })
  $.ui.toast(done.isCopied ? `Copied ${text}` : 'Could not copy')
}

function clean(segs: Seg[]): Seg[] {
  for (const seg of segs) for (const k of Object.keys(seg) as (keyof Seg)[]) if (seg[k] === undefined) delete seg[k]
  return segs
}

async function installed($: EngineInterface, cmd: string): Promise<boolean> {
  try {
    return (await $.process.run(['sh', '-c', 'command -v "$1" >/dev/null 2>&1', 'sh', cmd], { timeoutMs: 5_000 })).exitCode === 0
  } catch {
    return false
  }
}

async function launch($: EngineInterface, ...choices: string[][]): Promise<void> {
  for (const argv of choices) {
    if (!(await installed($, argv[0] ?? ''))) continue
    try {
      if ((await $.process.run(['sh', '-c', LAUNCH, 'sh', ...argv], { timeoutMs: 15_000 })).exitCode === 0) return
    } catch {
      continue
    }
  }
  $.ui.toast(`could not start ${choices.map(c => c[0] ?? '').join(' or ')}`)
}

async function started($: EngineInterface, argv: string[]): Promise<void> {
  try {
    const run = await $.process.run(argv, { timeoutMs: 10_000 })
    if (run.exitCode !== 0) $.ui.toast(`could not start ${argv[0] ?? ''}: ${(run.stderr || run.stdout).trim().split('\n')[0] ?? ''}`)
  } catch {
    $.ui.toast(`could not start ${argv[0] ?? ''}`)
  }
}

const slots = { busy: 0, queue: [] as (() => void)[] }

async function limited<T>(fn: () => Promise<T>): Promise<T> {
  if (slots.busy < 4) slots.busy++
  else await new Promise<void>(resolve => slots.queue.push(resolve))
  try {
    return await fn()
  } finally {
    const next = slots.queue.shift()
    if (next) next()
    else slots.busy--
  }
}

async function openUrl($: EngineInterface, url: string): Promise<void> {
  const { argv, init } = openCommand(await osName($), url)
  try {
    const run = await $.process.run(argv, init)
    if (run.exitCode !== 0) $.ui.toast(`could not open ${url} with ${argv[0]}: ${run.stderr.trim().split('\n')[0] || `exit ${run.exitCode}`}`)
  } catch {
    $.ui.toast(`could not open ${url} with ${argv[0]}`)
  }
}

function psq(arg: string): string {
  return `'${arg.replace(/'/g, "''")}'`
}

function shq(arg: string): string {
  return `'${arg.replace(/'/g, `'\\''`)}'`
}

async function terminal($: EngineInterface, linux: string[], cmd: string[], cwd = ''): Promise<void> {
  const line = cmd.map(shq).join(' ')
  const os = await osName($)
  if (os === 'linux') {
    if (!(await installed($, linux[0] ?? ''))) return $.ui.toast(`${linux[0] ?? ''} is not installed`)
    return launch($, ['xdg-terminal-exec', ...linux], ['x-terminal-emulator', '-e', ...linux])
  }
  if (os === 'darwin') {
    return started($, ['osascript', '-e', `tell application "Terminal" to do script "${(cwd ? `cd ${shq(cwd)} && ${line}` : line).replace(/\\/g, '\\\\').replace(/"/g, '\\"')}"`, '-e', 'tell application "Terminal" to activate'])
  }
  const inner = `${cwd ? `Set-Location -LiteralPath ${psq(cwd.replace(/\//g, '\\'))}; ` : ''}& ${cmd.map(psq).join(' ')}`
  return started($, ['powershell', '-NoProfile', '-Command', `$ErrorActionPreference = 'Stop'; Start-Process powershell -ArgumentList @('-NoExit', '-Command', ${psq(inner)})`])
}

async function fontState($: EngineInterface, charset: string, name: string): Promise<'ok' | 'stale' | 'missing'> {
  try {
    const out = (await $.process.run(['sh', '-c', FONT_SCRIPT, 'sh', charset, name], { timeoutMs: 5_000 })).stdout.trim()
    return out === 'stale' || out === 'missing' ? out : 'ok'
  } catch {
    return 'missing'
  }
}

async function detectGlyphs($: EngineInterface): Promise<void> {
  if ((await $.env.get('SSH_CONNECTION')) || (await $.env.get('SSH_TTY'))) {
    detected = 'nerd'
    return
  }
  const nerd = (await fontState($, 'f04eb', 'Nerd')) === 'ok'
  detected = nerd && (await fontState($, 'f2621', 'FabricSymbols')) === 'ok' ? 'fabric' : nerd ? 'nerd' : 'plain'
}

function fontNote(): string {
  if (!fontHint || hinted || !fellBack) return ''
  hinted = true
  return 'Tell user once: Fabric pane icons need github.com/data-goblin/fabric-nf plus a Nerd Font. Plugin option fontHint=off disables this.'
}

function tierFor(surface: string): Tier {
  if (glyphSetting === 'fabric' || glyphSetting === 'nerd' || glyphSetting === 'plain') return glyphSetting
  return surface === 'desktop' ? 'plain' : detected
}

function titleGlyph(tier: Tier): string {
  return tier === 'fabric' ? String.fromCodePoint(TITLE_GLYPH.fabric) : tier === 'nerd' ? TITLE_GLYPH.nerd : TITLE_GLYPH.plain
}

function titleFor(target: Target | null): string {
  return target ? tenantName || targetLabel(target) : TITLE
}

async function get($: EngineInterface): Promise<Explorer> {
  const [view, tree] = await Promise.all([$.state.get(STATE), $.state.get(NODES)])
  return { ...empty(), ...view.value, nodes: tree.value ?? [] }
}

async function put($: EngineInterface, fn: (ex: Explorer) => Explorer): Promise<void> {
  for (let i = 0; ; i++) {
    if (i >= 50) throw new Error('pane state is busy; try again')
    const [view, tree] = await Promise.all([$.state.get(STATE), $.state.get(NODES)])
    const cur: Explorer = { ...empty(), ...view.value, nodes: tree.value ?? [] }
    const next = anchored(cur, fn(cur))
    if (next.nodes !== cur.nodes) {
      const done = await $.state.set(NODES, next.nodes, { ifVersion: tree.version })
      if (!done.isSet) continue
    }
    const keys = Object.keys(next) as (keyof Explorer)[]
    if (!keys.some(k => k !== 'nodes' && next[k] !== cur[k])) return
    const { nodes: _nodes, ...rest } = next
    const done = await $.state.set(STATE, { ...rest, nodes: [] }, { ifVersion: view.version })
    if (done.isSet) return
  }
}

function patch($: EngineInterface, fn: (ex: Explorer) => Partial<Explorer>) {
  return put($, ex => ({ ...ex, ...fn(ex) }))
}

async function patchView($: EngineInterface, fn: (ex: Explorer) => Partial<Explorer>): Promise<void> {
  for (let i = 0; ; i++) {
    if (i >= 50) throw new Error('pane state is busy; try again')
    const view = await $.state.get(STATE)
    const cur: Explorer = { ...empty(), ...view.value, nodes: [] }
    const change = fn(cur)
    if (Object.keys(change).length === 0) return
    const done = await $.state.set(STATE, { ...cur, ...change, nodes: [] }, { ifVersion: view.version })
    if (done.isSet) return
  }
}

const sameTarget = (a: Target | null, b: Target | null) => JSON.stringify(a) === JSON.stringify(b)

function refresh($: EngineInterface): Promise<void> {
  if (inflight) {
    const rerun = () => {
      queued = null
      return refresh($)
    }
    queued ??= inflight.then(rerun, rerun)
    return queued
  }
  inflight = doRefresh($).finally(() => {
    inflight = null
  })
  return inflight
}

async function flash($: EngineInterface, ids: string[], alsoLit: string[] = []): Promise<void> {
  const unique = [...new Set(ids)]
  if (unique.length === 0) return
  const ex = await get($)
  await patch($, cur => {
    const byId = new Map(cur.nodes.map(n => [n.id, n]))
    const open = new Set(cur.expanded)
    const bright = new Set([...cur.flash.filter(id => !unique.includes(id)), ...unique])
    const dim = new Set([...cur.flashDim, ...alsoLit])
    for (const id of unique) {
      const chain = ancestors(cur.nodes, id, byId)
      if (!chain.some(a => !open.has(a))) continue
      for (const a of chain) {
        if (!open.has(a)) dim.add(a)
        open.add(a)
      }
    }
    for (const id of bright) dim.delete(id)
    const root = rootOf(cur)
    const away = follow && root !== '' && unique.some(id => id !== root && !ancestors(cur.nodes, id, byId).includes(root))
    return { flash: [...bright], flashDim: [...dim], expanded: [...open], ...(follow ? { scroll: null } : {}), ...(away ? { root: '' } : {}) }
  })
  if (ex.target && !closed) await openPane($, { id: PANE, title: titleFor(ex.target) })
}

type Mark = { ids: string[]; tone: string }

const STRENGTH: FabKind[] = ['read', 'download', 'upload', 'modify']

function toneOf(kinds: FabKind[]): string {
  return FAB_TONE[STRENGTH.reduce<FabKind>((best, k) => (kinds.includes(k) ? k : best), 'read')]
}

function rootOf(ex: Explorer): string {
  return ex.root && ex.nodes.some(n => n.id === ex.root) ? ex.root : ''
}

function anchored(cur: Explorer, next: Explorer): Explorer {
  if (follow || cur.scroll === null || next.scroll !== cur.scroll || (next.nodes === cur.nodes && next.expanded === cur.expanded)) return next
  const top = visible(cur, SORT, rootOf(cur))[cur.scroll]?.node.id
  const at = top ? visible(next, SORT, rootOf(next)).findIndex(row => row.node.id === top) : -1
  return at < 0 || at === cur.scroll ? next : { ...next, scroll: at }
}


async function begin($: EngineInterface, mark: Mark): Promise<void> {
  running++
  generation++
  blink?.cancel()
  blink = null
  const at = await $.clock.now()
  await patchView($, cur => {
    const map = { ...cur.busy }
    for (const id of mark.ids) map[id] = { tone: mark.tone, n: (map[id]?.n ?? 0) + 1, at }
    return { busy: map, work: { tone: mark.tone, at }, flash: [], flashDim: [] }
  })
}

async function finish($: EngineInterface, mark: Mark): Promise<void> {
  running = Math.max(0, running - 1)
  const mine = generation
  const idle = running === 0
  let lit = false
  await patchView($, cur => {
    const map = { ...cur.busy }
    for (const id of mark.ids) {
      const left = (map[id]?.n ?? 1) - 1
      const entry = map[id]
      if (left > 0 && entry) map[id] = { ...entry, n: left }
      else delete map[id]
    }
    lit = cur.flash.length > 0 || cur.flashDim.length > 0
    return { busy: map, ...(idle && generation === mine && !lit ? { work: null } : {}) }
  })
  if (!idle || !lit || generation !== mine) return
  blink?.cancel()
  blink = $.clock.after(FLASH_MS, () => {
    if (generation !== mine || running > 0) return
    blink = null
    quiet(patchView($, () => (generation === mine && running === 0 ? { work: null, flash: [], flashDim: [] } : {})))
  })
}

async function point($: EngineInterface, target: Target | null, opened: 'asked' | 'unasked', fresh = false): Promise<boolean> {
  const moved = !sameTarget((await get($)).target, target)
  if (moved) {
    treeGen++
    await put($, () => ({ ...empty(), target }))
  }
  else if (fresh) await patchView($, () => ({ expanded: [], query: '', selected: '', detail: [], cursor: '' }))
  if (opened === 'asked' || (moved && target)) {
    const title = titleFor(target)
    if (opened === 'asked') {
      closed = false
      await openPane($, { id: PANE, title, focus: true })
    } else if (!closed) await openPane($, { id: PANE, title })
  }
  return moved
}

async function navigate($: EngineInterface, n: TreeNode): Promise<void> {
  await patch($, cur => ({ root: n.id, cursor: n.id, scroll: null, expanded: [...new Set([...cur.expanded, n.id, ...ancestors(cur.nodes, n.id)])] }))
  if (await expandFabric($, n)) await expandOpen($, n.id)
}

async function goUp($: EngineInterface): Promise<void> {
  await patch($, cur => {
    const n = cur.nodes.find(x => x.id === cur.root)
    return { root: n?.parent ?? '', cursor: n?.id ?? cur.cursor, scroll: null }
  })
}

async function goHome($: EngineInterface): Promise<void> {
  await patchView($, () => ({ root: '', scroll: null }))
}

async function press($: EngineInterface, n: TreeNode): Promise<void> {
  const now = await $.clock.now()
  const isDouble = lastPress.key === n.id && now - lastPress.at < DOUBLE_MS
  lastPress = { key: isDouble ? '' : n.id, at: now }
  const ex = await get($)
  if (isDouble && ex.nodes.some(c => c.parent === n.id)) await navigate($, n)
  else if (isDouble) await openLocal($, ex, n)
  else await select($, n)
}

async function openWeb($: EngineInterface, ex: Explorer, n: TreeNode): Promise<void> {
  const url = webUrl(ex, n)
  if (url) await openUrl($, url)
  else $.ui.toast('no Fabric link for this object')
}

let fabContext: { bin: string; env: Record<string, string> } = { bin: 'fab', env: {} }
let treeGen = 0

function contextOf(inv: { bin: string; env: Record<string, string>; cwd: string }): typeof fabContext {
  const env = Object.fromEntries(Object.entries(inv.env).filter(([k]) => /^(FAB_|AZURE_|IDENTITY_|REQUESTS_CA_BUNDLE$|HTTPS?_PROXY$|NO_PROXY$)/i.test(k)))
  return { bin: binOf(inv.bin, inv.cwd), env }
}

function binOf(bin: string, cwd: string): string {
  if (!bin.includes('/') || /[~$`]/.test(bin)) return 'fab'
  if (bin.startsWith('/') || /^[A-Za-z]:\//.test(bin)) return bin
  return cwd.startsWith('/') && !/[~$`]/.test(cwd) ? join(cwd, bin) : 'fab'
}

function targetOf(env: Record<string, string>): Target {
  const identity = [env.FAB_TENANT_ID, env.FAB_SPN_CLIENT_ID].filter(Boolean).join('|')
  return identity ? { kind: 'fabric', identity } : { kind: 'fabric' }
}

function listing(stdout: string, n: TreeNode, nodes: TreeNode[]): { kids: TreeNode[]; become: string } {
  return inOneLake(n) ? parseOneLake(stdout, n) : { kids: parseChildren(stdout, n, nodes), become: '' }
}

async function fabLs($: EngineInterface, path?: string): Promise<string> {
  const ctx = fabContext
  const where = path ? `/${path.replace(/^\/+/, '')}` : '/'
  const run = await limited(() =>
    $.process.run([ctx.bin, 'ls', where, '-l', '--output_format', 'json'], {
      timeoutMs: 60_000,
      ...(Object.keys(ctx.env).length ? { env: ctx.env } : {}),
    }),
  ).catch((err: unknown) => {
    throw spawnFailure(err, ctx.bin)
  })
  if (run.exitCode !== 0) throw runFailure(run, 'fab ls failed')
  if (run.isStdoutTruncated) throw new Error(`fab ls ${where}: too much output to show`)
  return run.stdout
}

const loading = new Map<string, Promise<boolean>>()
let statusOwner = ''

function errorText(err: unknown): string {
  return `error: ${err instanceof Error ? err.message : String(err)}`
}

function wsNode(nodes: TreeNode[], workspace: string): TreeNode | undefined {
  const want = `W:${workspace}`.toLowerCase()
  return nodes.find(n => n.id.toLowerCase() === want)
}

function wsId(nodes: TreeNode[], workspace: string): string {
  return wsNode(nodes, workspace)?.id ?? `W:${workspace}`
}

async function pool<T>(items: T[], fn: (item: T) => Promise<unknown>, size = 4): Promise<void> {
  const queue = [...items]
  await Promise.all(
    Array.from({ length: Math.min(size, queue.length) }, async () => {
      for (let item = queue.shift(); item !== undefined; item = queue.shift()) await fn(item)
    }),
  )
}

async function expandOpen($: EngineInterface, root = ''): Promise<void> {
  const failed = new Set<string>()
  for (let pass = 0; pass < 8; pass++) {
    const ex = await get($)
    const open = new Set(ex.expanded)
    const pending = new Set(ex.nodes.filter(c => c.kind === PLACEHOLDER).map(c => c.parent))
    const byId = new Map(ex.nodes.map(n => [n.id, n]))
    const todo = ex.nodes.filter(n => {
      if (!open.has(n.id) || !pending.has(n.id) || failed.has(n.id)) return false
      const chain = ancestors(ex.nodes, n.id, byId)
      return chain.every(a => open.has(a)) && (!root || chain.includes(root))
    })
    if (todo.length === 0) return
    await pool(todo, async n => {
      if (!(await expandFabric($, n))) failed.add(n.id)
    })
  }
}

async function fabRaw($: EngineInterface, args: string[]): Promise<string> {
  const ctx = fabContext
  const run = await limited(() =>
    $.process.run([ctx.bin, ...args], { timeoutMs: 60_000, ...(Object.keys(ctx.env).length ? { env: ctx.env } : {}) }),
  )
  if (run.exitCode !== 0 || run.isStdoutTruncated) throw new Error((run.stderr || run.stdout).trim().split('\n')[0] || `fab ${args[0]} failed`)
  return run.stdout
}

function quiet(p: Promise<unknown>): void {
  void p.catch(() => undefined)
}

const domainOf = new Map<string, string>()
const domainName = new Map<string, string>()
const capacityOf = new Map<string, string>()
const capacityName = new Map<string, string>()
let tenantName = ''
let tenantAsked = false

function jsonOf<T>(text: string): T | null {
  try {
    return JSON.parse(text.slice(Math.max(0, text.indexOf('{')))) as T
  } catch {
    return null
  }
}

async function loadDomains($: EngineInterface, withCapacity = false): Promise<void> {
  const names = jsonOf<{ result?: { data?: { name?: string; id?: string }[] } }>(await fabRaw($, ['ls', '/.domains', '-l', '--output_format', 'json']).catch(() => ''))
  domainName.clear()
  for (const d of names?.result?.data ?? []) if (d.id && d.name) domainName.set(d.id.toLowerCase(), d.name.replace(/\.Domain$/i, ''))
  const caps = withCapacity ? jsonOf<{ result?: { data?: { name?: string; id?: string }[] } }>(await fabRaw($, ['ls', '/.capacities', '-l', '--output_format', 'json']).catch(() => '')) : null
  capacityName.clear()
  for (const c of caps?.result?.data ?? []) if (c.id && c.name) capacityName.set(c.id.toLowerCase(), c.name.replace(/\.Capacity$/i, ''))
  const found = new Map<string, string>()
  const onCapacity = new Map<string, string>()
  let token = ''
  for (let page = 0; (domainName.size > 0 || withCapacity) && page < 50; page++) {
    const body = jsonOf<{ status_code?: number; text?: { value?: { id?: string; domainId?: string; capacityId?: string }[]; continuationToken?: string } }>(
      await fabRaw($, ['api', token ? `workspaces?continuationToken=${encodeURIComponent(token)}` : 'workspaces']).catch(() => ''),
    )
    if (!body || (body.status_code && body.status_code >= 400)) break
    for (const w of body.text?.value ?? []) {
      if (!w.id) continue
      if (w.domainId && domainName.has(w.domainId.toLowerCase())) found.set(w.id.toLowerCase(), w.domainId.toLowerCase())
      if (w.capacityId) onCapacity.set(w.id.toLowerCase(), w.capacityId.toLowerCase())
    }
    token = body.text?.continuationToken ?? ''
    if (!token) break
  }
  domainOf.clear()
  for (const [w, d] of found) domainOf.set(w, d)
  capacityOf.clear()
  for (const [w, c] of onCapacity) capacityOf.set(w, c)
}

async function loadTenant($: EngineInterface): Promise<void> {
  if (tenantName) return
  const status = await fabRaw($, ['auth', 'status']).catch(() => '')
  const id = status.match(/Tenant ID:\s*([0-9a-f-]{36})/i)?.[1]?.toLowerCase()
  if (!id) return
  const body = jsonOf<{ text?: { value?: { tenantId?: string; displayName?: string }[] } }>(
    await fabRaw($, ['api', '-A', 'azure', 'tenants?api-version=2022-12-01']).catch(() => ''),
  )
  tenantName = body?.text?.value?.find(x => x.tenantId?.toLowerCase() === id)?.displayName ?? ''
}

const GROUP_KINDS = new Set(['domain', 'capacity'])

function plural(n: number, word: string): string {
  return `${n} ${word}${n === 1 ? '' : 's'}`
}

function grouped(nodes: TreeNode[], on: boolean, byCapacity = false): TreeNode[] {
  const flat = nodes.filter(n => !GROUP_KINDS.has(n.kind)).map(n => (n.kind === 'workspace' && n.parent !== '' ? { ...n, parent: '' } : n))
  const spaces = flat.filter(n => n.kind === 'workspace')
  const domainKey = (n: TreeNode) => (on && domainOf.size > 0 ? (domainOf.get(n.sig.toLowerCase()) ?? 'none') : '')
  const capacityKey = (n: TreeNode) => (byCapacity ? (capacityOf.get(n.sig.toLowerCase()) ?? 'none') : '')
  const useDomains = spaces.some(n => domainKey(n) && domainKey(n) !== 'none')
  if (!useDomains && !byCapacity) return flat
  const domainLabel = (k: string) => (k === 'none' ? 'No domain' : (domainName.get(k) ?? `Domain ${k.slice(0, 8)}`))
  const capacityLabel = (k: string) => (k === 'none' ? 'No capacity' : (capacityName.get(k) ?? `Capacity ${k.slice(0, 8)}`))
  const last = (a: string, b: string, none: boolean[]) => (none[0] ? 1 : none[1] ? -1 : a.localeCompare(b))
  const groups = new Map<string, TreeNode>()
  const counts = new Map<string, number>()
  const parentOf = (n: TreeNode): string => {
    let parent = ''
    if (useDomains) {
      const d = domainKey(n)
      parent = `D:${d}`
      if (!groups.has(parent)) groups.set(parent, { id: parent, parent: '', kind: 'domain', name: domainLabel(d), path: '', hidden: false, sig: d, note: '' })
    }
    if (byCapacity) {
      const c = capacityKey(n)
      const id = `${parent ? parent + '|' : ''}C:${c}`
      if (!groups.has(id)) groups.set(id, { id, parent, kind: 'capacity', name: capacityLabel(c), path: '', hidden: false, sig: c, note: '' })
      parent = id
    }
    for (let g: string | undefined = parent; g; g = groups.get(g)?.parent) counts.set(g, (counts.get(g) ?? 0) + 1)
    return parent
  }
  const placed = flat.map(n => (n.kind === 'workspace' ? { ...n, parent: parentOf(n) } : n))
  const sorted = [...groups.values()]
    .map(g => ({ ...g, note: plural(counts.get(g.id) ?? 0, 'workspace') }))
    .sort((a, b) => last(a.name, b.name, [a.sig === 'none', b.sig === 'none']))
  return [...sorted, ...placed]
}

async function toggleDomains($: EngineInterface): Promise<void> {
  const on = (await get($)).byDomain === false
  if (on && domainOf.size === 0) await loadDomains($, (await get($)).byCapacity === true)
  await patch($, cur => ({ byDomain: on, nodes: grouped(cur.nodes, on, cur.byCapacity === true), root: /^[DC]:/.test(cur.root) ? '' : cur.root }))
}

async function toggleCapacity($: EngineInterface): Promise<void> {
  const ex = await get($)
  const on = ex.byCapacity !== true
  if (on && capacityOf.size === 0) await loadDomains($, true)
  await patch($, cur => ({ byCapacity: on, nodes: grouped(cur.nodes, cur.byDomain !== false, on), root: /^[DC]:/.test(cur.root) ? '' : cur.root }))
}

async function relistRoot($: EngineInterface): Promise<void> {
  const target = (await get($)).target
  if (!target) return
  try {
    const kids = parseWorkspaces(await fabLs($))
    await patch($, cur => (sameTarget(cur.target, target) ? { nodes: grouped(merge(grouped(cur.nodes, false), '', kids), cur.byDomain !== false, cur.byCapacity === true), setup: null } : {}))
  } catch (err) {
    statusOwner = ''
    const setup = setupOf(err)
    await patchView($, cur => (sameTarget(cur.target, target) ? { status: setup ? '' : errorText(err), setup } : {}))
  }
}

async function doRefresh($: EngineInterface): Promise<void> {
  const target = (await get($)).target
  if (!target) return
  await patchView($, () => ({ status: 'loading' }))
  treeGen++
  try {
    const view = await get($)
    const byDomain = view.byDomain !== false
    const byCapacity = view.byCapacity === true
    const [listing] = await Promise.all([fabLs($), byDomain || byCapacity ? loadDomains($, byCapacity) : Promise.resolve(), loadTenant($)])
    const nodes = grouped(parseWorkspaces(listing), byDomain, byCapacity)
    await patch($, cur => (sameTarget(cur.target, target) ? { nodes, expanded: cur.nodes.length ? cur.expanded : [], status: '', setup: null } : {}))
    await expandOpen($)
  } catch (err) {
    const setup = setupOf(err)
    await patch($, cur => (sameTarget(cur.target, target) ? { status: setup ? '' : errorText(err), setup } : {}))
  }
}

const rerun = new Map<string, Promise<boolean>>()

function reloadNode($: EngineInterface, id: string): Promise<boolean> {
  const key = `reload:${id.toLowerCase()}`
  const running = loading.get(key)
  if (running) {
    const again = () => {
      rerun.delete(key)
      return reloadNode($, id)
    }
    const next = rerun.get(key) ?? running.then(again, again)
    rerun.set(key, next)
    return next
  }
  const job = (async () => {
    const pending = loading.get(id)
    if (pending) await pending.catch(() => false)
    const ex = await get($)
    const n = ex.nodes.find(x => x.id === id)
    if (!n || !isLoaded(ex.nodes, n.id)) return true
    const gen = treeGen
    try {
      const { kids } = listing(await fabLs($, n.path), n, ex.nodes)
      const owned = statusOwner === n.id
      if (owned) statusOwner = ''
      await patch($, cur => (gen === treeGen && cur.nodes.some(x => x.id === n.id) ? { nodes: merge(cur.nodes, n.id, kids), ...(owned ? { status: '' } : {}) } : {}))
    } catch (err) {
      statusOwner = n.id
      await patchView($, () => ({ status: errorText(err) }))
      return false
    }
    await expandOpen($, n.id)
    return true
  })().finally(() => loading.delete(key))
  loading.set(key, job)
  return job
}

async function reloadWorkspace($: EngineInterface, workspace: string): Promise<boolean> {
  const ws = wsNode((await get($)).nodes, workspace)
  return ws ? reloadNode($, ws.id) : true
}

function expandFabric($: EngineInterface, n: TreeNode): Promise<boolean> {
  const running = loading.get(n.id)
  if (running) return running
  const job = (async () => {
    const ex = await get($)
    if (!ex.nodes.some(c => c.parent === n.id && c.kind === PLACEHOLDER)) return true
    const gen = treeGen
    try {
      const { kids, become } = listing(await fabLs($, n.path), n, ex.nodes)
      const owned = statusOwner === n.id
      if (owned) statusOwner = ''
      const fill = kids.length ? kids : become === 'lakehouse table' ? [] : [emptyMark(n.id)]
      await patch($, cur =>
        gen === treeGen && cur.nodes.some(x => x.parent === n.id && x.kind === PLACEHOLDER)
          ? { nodes: cur.nodes.flatMap(x => (x.parent === n.id && x.kind === PLACEHOLDER ? fill : x.id === n.id && become ? [{ ...x, kind: become, note: become === 'lakehouse table' ? 'Delta table' : x.note }] : [x])), ...(owned ? { status: '' } : {}) }
          : owned
            ? { status: '' }
            : {},
      )
      return true
    } catch (err) {
      statusOwner = n.id
      await patchView($, () => ({ status: errorText(err) }))
      return false
    }
  })().finally(() => loading.delete(n.id))
  loading.set(n.id, job)
  return job
}

async function reveal($: EngineInterface, workspace: string, focus = false): Promise<void> {
  const n = wsNode((await get($)).nodes, workspace)
  if (!n) return
  await patch($, cur => ({ expanded: [...new Set([...cur.expanded, ...ancestors(cur.nodes, n.id), n.id])], ...(focus ? { cursor: n.id } : {}) }))
  await expandFabric($, n)
}

async function revealPath($: EngineInterface, path: string): Promise<void> {
  const segs = path.replace(/^\//, '').replace(/\/$/, '').split('/')
  for (let i = 2; i < segs.length; i++) {
    const want = segs.slice(0, i).join('/').toLowerCase()
    const n = (await get($)).nodes.find(x => x.path.toLowerCase() === want)
    if (!n) return
    await expandFabric($, n)
  }
}

function webUrl(_ex: Explorer, n: TreeNode): string {
  return n.url || ''
}

async function openLocal($: EngineInterface, ex: Explorer, n: TreeNode): Promise<void> {
  const model = modelOf(n)
  if (model) await terminal($, ['te', 'interactive', '-s', model.server, '-d', model.database], ['te', 'interactive', '-s', model.server, '-d', model.database])
  else if (webUrl(ex, n)) await openUrl($, webUrl(ex, n))
}

async function select($: EngineInterface, n: TreeNode): Promise<void> {
  if (n.kind === PLACEHOLDER || n.kind === EMPTY) return
  const ex = await get($)
  const isLeaf = !ex.nodes.some(c => c.parent === n.id)
  await patch($, cur => {
    const open = new Set(cur.expanded)
    if (!isLeaf) open.has(n.id) ? open.delete(n.id) : open.add(n.id)
    return { expanded: [...open], cursor: n.id, selected: n.path ? n.id : cur.selected }
  })
  if (!isLeaf && (await expandFabric($, n))) await expandOpen($, n.id)
  const detail: string[] = [`${n.kind} ${n.name}`, ...(n.path ? [`fab path: ${n.path}`] : n.note ? [n.note] : [])]
  await patchView($, cur => (cur.cursor === n.id ? { detail } : {}))
  const props = await properties($, n).catch((err: unknown) => [`properties unavailable: ${errorText(err)}`])
  if (props.length) await patchView($, cur => (cur.cursor === n.id ? { detail: [...detail, ...props] } : {}))
}

const PROPERTY_LABELS: [string, string][] = [
  ['type', 'Type'],
  ['id', 'ID'],
  ['description', 'Description'],
  ['folderId', 'Folder ID'],
  ['capacityId', 'Capacity'],
  ['capacityRegion', 'Region'],
  ['domainId', 'Domain'],
]

function propertyValue(key: string, value: string): string {
  if (key === 'capacityId') return capacityName.get(value.toLowerCase()) ?? value
  if (key === 'domainId') return domainName.get(value.toLowerCase()) ?? value
  return value
}

function apiPathOf(n: TreeNode): string {
  if (n.kind === 'workspace') return /^[0-9a-f-]{36}$/i.test(n.sig) ? `workspaces/${n.sig}` : ''
  const m = (n.url ?? '').match(/\/groups\/([0-9a-f-]{36})\/[^/]+\/([0-9a-f-]{36})/i)
  return m ? `workspaces/${m[1]}/items/${m[2]}` : ''
}

async function namesOf($: EngineInterface, list: string, suffix: RegExp, into: Map<string, string>): Promise<void> {
  if (into.size > 0) return
  const body = jsonOf<{ result?: { data?: { name?: string; id?: string }[] } }>(await fabRaw($, ['ls', list, '-l', '--output_format', 'json']).catch(() => ''))
  for (const d of body?.result?.data ?? []) if (d.id && d.name) into.set(d.id.toLowerCase(), d.name.replace(suffix, ''))
}

async function properties($: EngineInterface, n: TreeNode): Promise<string[]> {
  const path = apiPathOf(n)
  if (!path) return []
  const body = jsonOf<Record<string, unknown>>(await fabRaw($, ['api', path, '-q', 'text']))
  if (!body) return []
  await Promise.all([
    body.capacityId ? namesOf($, '/.capacities', /\.Capacity$/i, capacityName) : Promise.resolve(),
    body.domainId ? namesOf($, '/.domains', /\.Domain$/i, domainName) : Promise.resolve(),
  ])
  return PROPERTY_LABELS.filter(([k]) => body[k] !== undefined && body[k] !== null && body[k] !== '').map(([k, label]) => `${label}: ${propertyValue(k, String(body[k]))}`)
}

function contextFor(ex: Explorer, n: TreeNode): string {
  return [
    'The user has this Fabric item selected in the Fabric pane; "this", "it" or "the selected" in the prompt likely refers to it.',
    `${n.kind}: ${n.name}`,
    `fab path: ${n.path}`,
    ...ex.detail.slice(2),
  ].join('\n')
}

const waiting = new Map<string, () => Promise<void>>()

function backgroundOf(result: unknown): string {
  if (!result || typeof result !== 'object') return ''
  const id = (result as { backgroundTaskId?: unknown }).backgroundTaskId
  return typeof id === 'string' ? id : ''
}

async function afterFab($: EngineInterface, calls: Invocation[], stale: Set<string>, succeeded: boolean): Promise<void> {
  const head = calls[0]
  if (!head) return
  fabContext = contextOf(head)
  const moved = await point($, targetOf(fabContext.env), 'unasked')
  const start = await get($)
  const fresh0 = moved || start.nodes.length === 0 || start.setup !== null
  if (fresh0) await refresh($)
  const prior = await get($)
  const before = new Set(prior.expanded)
  const lower = (xs: string[]) => [...new Map(xs.map(x => [x.toLowerCase(), x])).values()]
  const changes = calls.filter(inv => fabKind(inv) === 'modify' || fabKind(inv) === 'upload')
  const whole = new Set(
    changes
      .filter(inv => WHOLE_VERBS.has(inv.args[0] ?? '') || (inv.args[0] === 'set' && inv.args.some(a => /displayname/i.test(a))))
      .flatMap(inv => fabPositionals(inv.args.slice(1)).filter(a => /^\/?[^/]+\.Workspace\/?$/i.test(a)).flatMap(a => fabWorkspaces({ ...inv, args: ['', a] })))
      .map(w => w.toLowerCase()),
  )
  if (whole.size && !fresh0) await relistRoot($)
  await pool(lower(calls.flatMap(fabWorkspaces).filter(w => !whole.has(w.toLowerCase()))), w => reveal($, w))
  await pool(
    lower(
      changes.flatMap(fabWorkspaces).filter(w => {
        if (whole.has(w.toLowerCase())) return false
        const id = wsId(prior.nodes, w)
        return isLoaded(prior.nodes, id) || stale.has(id)
      }),
    ),
    w => reloadWorkspace($, w),
  )
  const folders = new Set<string>()
  for (const inv of changes) {
    for (const a of fabPositionals(inv.args.slice(1))) {
      const segs = a.replace(/^\/+|\/+$/g, '').split('/')
      for (let i = 2; i < segs.length; i++) {
        const want = segs.slice(0, i).join('/').toLowerCase()
        const n = prior.nodes.find(x => x.path.toLowerCase() === want)
        if (n && isLoaded(prior.nodes, n.id)) folders.add(n.id)
      }
    }
  }
  await pool([...folders], id => reloadNode($, id))
  for (const a of lower(calls.flatMap(inv => inv.args.slice(1).filter(x => /\.Workspace\//i.test(x))))) await revealPath($, a)
  if (!succeeded) return
  const fresh = await get($)
  const lit = { touched: [] as string[], opened: [] as string[] }
  for (const inv of calls) {
    const touched = fabTouched(inv, fresh.nodes)
    const opened = touched.length ? fabWorkspaces(inv).map(w => wsId(fresh.nodes, w)).filter(id => !before.has(id)) : []
    lit.touched.push(...touched)
    lit.opened.push(...opened)
  }
  await flash($, lit.touched, lit.opened)
}

function byGuid(guids: string[], nodes: TreeNode[]): string[] {
  if (guids.length === 0) return []
  const want = new Set(guids)
  return nodes.filter(n => (n.sig && want.has(n.sig.toLowerCase())) || [...want].some(g => (n.url ?? '').toLowerCase().includes(g))).map(n => n.id)
}

const SQL_KINDS = new Set(['Lakehouse', 'Warehouse', 'SQLEndpoint', 'SQLDatabase', 'MirroredDatabase'])

async function queryNodes($: EngineInterface, queries: { inv: Invocation; q: ReturnType<typeof queryOf> }[], nodes: TreeNode[]): Promise<{ ids: string[]; workspaces: string[]; models: string[] }> {
  const ids: string[] = []
  const workspaces: string[] = []
  const models: string[] = []
  for (const { inv, q } of queries) {
    if (!q) continue
    let workspace = q.workspace
    let model = q.model
    if (q.report) {
      try {
        const base = posix(q.report).startsWith('/') ? posix(q.report) : `${posix(inv.cwd).replace(/\/+$/, '')}/${posix(q.report)}`
        const found = modelFromConnection(String(await $.fs.read(`${base.replace(/\/+$/, '')}/definition.pbir`)))
        if (found) ({ workspace, model } = found)
      } catch {
        continue
      }
    }
    if (workspace && model) {
      workspaces.push(workspace)
      const path = `${workspace}.workspace/${model}.semanticmodel`.toLowerCase()
      models.push(path)
      const n = nodes.find(x => x.path.toLowerCase() === path)
      if (n) ids.push(n.id)
    }
    if (q.database) ids.push(...nodes.filter(n => SQL_KINDS.has(n.kind) && n.name.toLowerCase() === q.database.toLowerCase()).map(n => n.id))
  }
  return { ids: [...new Set(ids)], workspaces: [...new Set(workspaces)], models }
}

async function afterQueries($: EngineInterface, asked: { ids: string[]; workspaces: string[]; models: string[] }): Promise<void> {
  if (closed || noDock) return
  await pool(asked.workspaces, w => reveal($, w))
  const fresh = await get($)
  const ids = [...new Set([...asked.ids, ...fresh.nodes.filter(n => asked.models.includes(n.path.toLowerCase())).map(n => n.id)])]
  await flash($, ids)
}

function wholeArg(args: string | undefined): string {
  const raw = (args ?? '').trim()
  return /^["']/.test(raw) ? (tokenize(raw)[0] ?? '') : raw
}

export const register: Register = (on, options) => {
  glyphSetting = typeof options?.glyphs === 'string' ? options.glyphs : 'auto'
  follow = options?.follow !== 'off'
  fontHint = options?.fontHint !== 'off'

  on('session.start', async ($, e, next) => {
    useDrives((await $.env.get('OS')) === 'Windows_NT')
    hinted = false
    fellBack = false
    quiet(detectGlyphs($).then(() => $.ui.invalidate('ui.render')))
    running = 0
    generation++
    blink?.cancel()
    blink = null
    await patchView($, () => ({ flash: [], flashDim: [], work: null, busy: {} }))
    await $.command.register({ name: PANE, description: 'Open the Fabric pane; args: [workspace]' })
    const ex = await get($)
    if (ex.target) quiet(openPane($, { id: PANE, title: titleFor(ex.target) }))
    return next(e)
  })

  on('command.run', { command: PANE }, async ($, e) => {
    const terminalOnly = !(await $.session.surfaces().catch(() => ['terminal'])).some(x => x !== 'terminal')
    if (terminalOnly && e.presentation && !e.presentation.isFullscreen) return { text: 'The Fabric pane shows in the sidebar, which needs the fullscreen layout. Run /tui fullscreen, then /fabric-pane.' }
    if (terminalOnly && e.presentation && e.presentation.columns < 110) return { text: 'The Fabric pane shows in the sidebar, which needs a terminal at least 110 columns wide. Widen it, then run /fabric-pane.' }
    noDock = false
    const workspace = wholeArg(e.args)
    await point($, targetOf(fabContext.env), 'asked', true)
    await refresh($)
    if (workspace) await reveal($, workspace.replace(/\.Workspace$/i, ''), true)
    return { text: workspace ? `Fabric pane on ${workspace}.` : 'Fabric pane open.' }
  })

  on('tool.call', { tool: 'Bash' }, async ($, e, next) => {
    const command = e.tool === 'Bash' ? e.command : ''
    if (!/\b(fab|te|pbir|sqlcmd)\b/.test(command)) return next(e)
    const found = invocations(command, await cwdOf($), {}, ['fab', 'te', 'pbir', 'sqlcmd'])
    const calls = fabCalls(found.filter(i => i.tool === 'fab'))
    const queries = found.filter(i => i.tool !== 'fab').flatMap(i => {
      const q = queryOf(i)
      return q ? [{ inv: i, q }] : []
    })
    if (calls.length === 0 && queries.length === 0) return next(e)
    if (closed || noDock) return next(e)
    const ex = await get($)
    const asked = await queryNodes($, queries, ex.nodes)
    const mark: Mark = {
      ids: [HEADER, ...calls.flatMap(inv => [...fabWorkspaces(inv).map(w => wsId(ex.nodes, w)), ...fabTouched(inv, ex.nodes), ...byGuid(fabGuids(inv), ex.nodes)]), ...asked.ids],
      tone: toneOf([...calls.map(fabKind), ...(queries.length ? (['read'] as FabKind[]) : [])]),
    }
    await begin($, mark)
    let result: Awaited<ReturnType<typeof next>>
    try {
      result = await next(e)
    } catch (err) {
      await finish($, mark)
      throw err
    }
    const task = result.deny ? '' : backgroundOf(result.result)
    const stale = new Set(loading.keys())
    const settle = async () => {
      try {
        if (result.deny || closed || noDock) return
        if (calls.length) await afterFab($, calls, stale, !result.isError)
        if (queries.length && !result.isError) await afterQueries($, asked)
      } finally {
        await finish($, mark)
      }
    }
    if (task) waiting.set(task, settle)
    else void settle().catch(() => undefined)
    return result
  })

  on('ui.close', async ($, e, next) => {
    const result = await next(e)
    if (e.id === PANE && e.origin.kind === 'person') closed = true
    return result
  })

  on('ui.message', async ($, e, next) => {
    if (e.requestId === PANE && e.element === 'setup' && e.data && typeof e.data === 'object') {
      const data = e.data as { press?: unknown; tab?: unknown; copy?: unknown }
      const pick = [data.tab, data.press, data.copy].find((v): v is string => typeof v === 'string') ?? ''
      if (pick === REFRESH) quiet(refresh($))
      else if (pick.startsWith(COPY)) await copyOf($, pick.slice(COPY.length), e.surface)
      return {}
    }
    if (e.requestId !== PANE || e.element !== 'rows' || !e.data || typeof e.data !== 'object') return next(e)
    const view = views.get(e.surface) ?? { from: 0, max: 0 }
    const data = e.data as { press?: unknown; key?: unknown; ctrl?: unknown; shift?: unknown; scrollTo?: unknown; copy?: unknown }
    const ex = await get($)
    if (typeof data.scrollTo === 'number') {
      const to = Math.round(Math.max(0, Math.min(1, data.scrollTo)) * view.max)
      if (to !== ex.scroll) await patchView($, () => ({ scroll: to }))
      return {}
    }
    if (typeof data.copy === 'string') {
      const n = ex.nodes.find(x => x.id === data.copy)
      if (n) await copyOf($, n.path || n.name, e.surface)
      return {}
    }
    if (typeof data.press === 'string') {
      const n = ex.nodes.find(x => x.id === data.press)
      if (!n) return {}
      if (ex.scroll === null) await patchView($, () => ({ scroll: view.from }))
      if (data.ctrl) await openWeb($, ex, n)
      else if (data.shift) await openLocal($, ex, n)
      else await press($, n)
      return {}
    }
    if (typeof data.key !== 'string') return {}
    const rows = visible(ex, SORT, rootOf(ex))
    const at = rows.findIndex(r => r.node.id === ex.cursor)
    const cur = rows[at]
    const move = (d: number) => {
      const target = rows[Math.max(0, Math.min(rows.length - 1, (at < 0 ? 0 : at) + d))]
      return target ? patchView($, () => ({ cursor: target.node.id, scroll: null })) : Promise.resolve()
    }
    if (data.key === 'up' || data.key === 'k') await move(-1)
    else if (data.key === 'down' || data.key === 'j') await move(1)
    else if (data.key === 'pageup') await move(-10)
    else if (data.key === 'pagedown') await move(10)
    else if (data.key === 'home') await move(-rows.length)
    else if (data.key === 'end') await move(rows.length)
    else if (cur && (data.key === 'y' || data.key === 'Y')) await copyOf($, cur.node.path || cur.node.name, e.surface)
    else if (cur && (data.key === 'right' || data.key === 'l') && !cur.leaf && !cur.open) await select($, cur.node)
    else if (cur && (data.key === 'left' || data.key === 'h')) {
      if (!cur.leaf && cur.open) await patchView($, x => ({ expanded: x.expanded.filter(id => id !== cur.node.id) }))
      else if (cur.node.parent) await patchView($, () => ({ cursor: cur.node.parent }))
    } else if (cur && (data.key === ' ' || data.key === 'return')) await (data.key === 'return' && cur.leaf ? openLocal($, ex, cur.node) : select($, cur.node))
    return {}
  })

  on('ui.scroll', { component: 'Pane', requestId: PANE }, async ($, e) => {
    const view = views.get('terminal') ?? views.get('desktop') ?? { from: 0, max: 0 }
    const ex = await get($)
    const to = Math.max(0, Math.min(view.max, (ex.scroll ?? view.from) + Math.sign(e.by) * Math.max(3, Math.abs(e.by))))
    if (to !== ex.scroll) await patchView($, () => ({ scroll: to }))
    return {}
  })

  on('prompt.submit', async ($, e, next) => {
    if (e.origin?.kind === 'task-notification') {
      for (const [task, settle] of waiting) {
        if (!e.text.includes(task)) continue
        waiting.delete(task)
        void settle().catch(() => undefined)
      }
    }
    const ex = await get($)
    const n = ex.nodes.find(x => x.id === ex.selected)
    if (!ex.target || closed || noDock) return next(e)
    const hint = fontNote()
    const context = [...(e.context ?? []), ...(n ? [contextFor(ex, n)] : []), ...(hint ? [hint] : [])]
    return context.length === (e.context ?? []).length ? next(e) : next({ ...e, context })
  })

  on('ui.render', { component: 'Pane', requestId: PANE }, async ($, e, next) => {
    if (e.surface !== 'terminal' && e.surface !== 'desktop') return next(e)
    if (e.surface === 'terminal' && e.props.placement === 'inline') {
      noDock = true
      void $.ui.close({ id: PANE }).catch(() => undefined)
      const { Box: Empty } = $.ui.resolve(e)
      return <Empty />
    }
    const tier = tierFor(e.surface)
    if (e.surface === 'terminal' && tier === 'plain' && glyphSetting === 'auto') fellBack = true
    const { Box, Text, Button, Input, Client } = $.ui.resolve(e)
    const ex = await get($)
    if (ex.target && !tenantName && !tenantAsked) {
      tenantAsked = true
      quiet(loadTenant($).then(() => $.ui.invalidate('ui.render')))
    }
    const now = await $.clock.now()
    const busyTone = (id: string) => {
      const b = ex.busy[id]
      return b && now - b.at < BUSY_MAX_MS ? b.tone : ''
    }
    const work = ex.work && now - ex.work.at < BUSY_MAX_MS ? ex.work : null
    const brightSet = new Set(work ? ex.flash : [])
    const dimSet = new Set(work ? ex.flashDim : [])
    const width = Math.max(20, e.props.bodyColumns)
    const rows = visible(ex, SORT, rootOf(ex))
    const detailRows = ex.detail.length ? Math.min(ex.detail.length, DETAIL_ROWS) + 3 : 0
    const room = Math.max(5, Math.min(WINDOW, (e.props.scroll?.bodyRows ?? 40) - 4 - detailRows))
    const focusId = follow && work && ex.flash.length ? (ex.flash[ex.flash.length - 1] ?? ex.cursor) : ex.cursor
    const at = Math.max(0, rows.findIndex(r => r.node.id === focusId))
    const isLit = (id: string) => brightSet.has(id) || dimSet.has(id)
    const lit = follow && work ? rows.findIndex(r => isLit(r.node.id)) : -1
    const fits = lit >= 0 && at - lit < room - 2
    const base = Math.max(0, Math.min(Math.max(0, rows.findIndex(r => r.node.id === ex.cursor)) - Math.floor(room / 2), rows.length - room))
    const inView = lit >= base && at < base + room
    const flashing = lit >= 0 && !inView
    const nearBottom = (span: number) => Math.max(0, Math.min(fits ? Math.min(Math.max(0, lit - 1), at - span + 3) : at - span + 3, rows.length - span))
    let from = flashing ? nearBottom(room) : base
    const cap = Math.max(1, Math.floor(room / 3))
    const chain = new Set(flashing ? ancestors(ex.nodes, focusId) : [])
    const keep = (id: string) => chain.has(id) || isLit(id)
    let pinned = flashing ? rows.slice(0, from).filter(r => keep(r.node.id)).slice(-cap) : []
    if (pinned.length) {
      from = nearBottom(Math.max(3, room - pinned.length - 1))
      pinned = rows.slice(0, from).filter(r => keep(r.node.id)).slice(-cap)
    }
    const max = Math.max(0, rows.length - room)
    if (ex.scroll !== null) {
      from = Math.max(0, Math.min(ex.scroll, max))
      pinned = []
    }
    views.set(e.surface, { from, max })
    const shown = rows.slice(from, from + room - pinned.length)
    const sel = ex.nodes.find(n => n.id === ex.selected)
    const clip = (s: string, max = width) => (s.length > max ? s.slice(0, max - 1) + '…' : s)
    const spin = (tone: string): Seg => ({ t: ' ', spin: true, b: true, c: TONES[tone]?.bright[1] ?? SHIMMER[1] })
    const kids = new Map<string, number>()
    for (const k of ex.nodes) if (k.parent && k.kind !== PLACEHOLDER && k.kind !== EMPTY && !GROUP_KINDS.has(k.kind)) kids.set(k.parent, (kids.get(k.parent) ?? 0) + 1)
    const noteOf = (r: (typeof rows)[number]) => r.node.note || (r.open && kids.get(r.node.id) ? plural(kids.get(r.node.id) ?? 0, 'item') : '')
    const rowSpec = (r: (typeof rows)[number]): RowSpec => {
      const n = { ...r.node, note: noteOf(r) }
      const g = glyph(n, tier)
      const arrow = r.leaf ? '  ' : tier === 'plain' ? (r.open ? '▾ ' : '▸ ') : r.open ? '\u{f47c} ' : '\u{f460} '
      const note = n.note ? ` ${n.note}` : ''
      const cols = Math.max(4, width - r.depth * 2 - 6 - note.length)
      const busy = busyTone(n.id)
      const isBright = brightSet.has(n.id) || (work !== null && busy !== '')
      const isDim = !isBright && dimSet.has(n.id)
      const name = clip(n.name, cols)
      const faded = n.hidden || n.kind === 'placeholder' || n.kind === EMPTY
      const tone = work?.tone ?? 'orange'
      const left: Seg[] = [
        { t: '  '.repeat(r.depth) },
        { t: arrow, c: '#7a7a86' },
        isBright || isDim ? { t: g.char + ' ', sh: tone, dim: isDim, one: true } : { t: g.char + ' ', c: faded ? '#6e6e7a' : g.color },
        isBright || isDim ? { t: name, sh: tone, dim: isDim, b: isBright } : { t: name, c: faded ? '#6e6e7a' : g.label, b: n.id === ex.selected },
      ]
      if (busy) left.push(spin(busy))
      return { id: n.kind === 'placeholder' || n.kind === EMPTY ? '' : n.id, left: clean(left), right: note ? [{ t: note, c: '#6e6e7a' }] : [] }
    }
    const note = (text: string): RowSpec => ({ id: '', left: [{ t: text, c: '#6e6e7a' }], right: [] })
    const specs: RowSpec[] = [...pinned.map(rowSpec), ...(pinned.length > 0 ? [note('  ⋮')] : []), ...shown.map(rowSpec)]
    const barSize = Math.max(1, Math.round((specs.length * shown.length) / Math.max(1, rows.length)))
    const bar =
      rows.length > shown.length + pinned.length
        ? { pos: max ? Math.round((from / max) * (specs.length - barSize)) : 0, size: barSize, thumb: '#5b9bd5', track: '#4a4a56' }
        : undefined
    const icon = (nerd: string, fallback: string) => (tier === 'plain' ? fallback : nerd)
    const rootNode = ex.nodes.find(n => n.id === rootOf(ex))
    const headName = rootNode ? rootNode.name : ex.target ? tenantName || targetLabel(ex.target) : TITLE
    const head: RowSpec = {
      id: '',
      left: clean([
        { t: `${titleGlyph(tier)} `, c: TITLE_COLOR },
        { t: headName, b: true },
        ...(ex.status ? [{ t: `  ${ex.status}`, c: '#6e6e7a' }] : []),
        ...(busyTone(HEADER) ? [spin(busyTone(HEADER))] : []),
      ]),
      right: [],
    }
    const spinner = tier === 'plain' ? PLAIN_SPINNER : []
    const table = $.ui.resolve(e)
    const Svg = 'Svg' in table ? table.Svg : undefined
    const native = e.surface === 'desktop' && Boolean(Svg)
    const MUTED = '#6e6e7a'
    const icon16 = (source: string | undefined, alt: string, fallback: Seg, key: string) =>
      native && Svg && source ? <Svg key={key} source={source} alt={alt} width={16} height={16} /> : <Text key={key} color={fallback.c}>{fallback.t}</Text>
    const rule = (key: string) => <Text key={key} color="#3a3a42" wrap="truncate-end">{'─'.repeat(width)}</Text>
    const nativeRow = (r: (typeof rows)[number]) => {
      const n = r.node
      const g = glyph(n, 'plain')
      const note = noteOf(r)
      const faded = n.hidden || n.kind === PLACEHOLDER || n.kind === EMPTY
      const label = clip(n.name, Math.max(4, width - r.depth * 2 - 8 - note.length))
      const busy = busyTone(n.id)
      return (
        <Box key={`n:${n.id}`} flexDirection="row" alignItems="center" gap={1} backgroundColor={n.id === ex.cursor ? '#2c313c' : undefined} hover={{ backgroundColor: '#26282d' }}>
          <Box width={r.depth * 2} flexShrink={0} />
          <Box width={2} flexShrink={0}>
            {r.leaf ? null : <Button key={`t:${n.id}`} plain dimColor label={r.open ? '⌄' : '›'} onPress={() => quiet(select($, n))} />}
          </Box>
          {icon16(FABRIC_SVG[n.kind], typeLabel(n.kind), { t: g.char, c: g.color }, `i:${n.id}`)}
          {faded ? <Text color={MUTED}>{label}</Text> : <Button key={`r:${n.id}`} plain label={label} onPress={() => quiet(press($, n))} />}
          {busy ? <Text color={TONES[busy]?.bright[1]}>…</Text> : null}
          <Box flexGrow={1} />
          {note ? <Text color={MUTED}>{note}</Text> : null}
        </Box>
      )
    }
    const details = ex.detail.slice(1, DETAIL_ROWS).map(l => {
      const at = l.indexOf(': ')
      const key = at > 0 ? l.slice(0, at) : ''
      return { key: key === 'fab path' ? 'Path' : key, value: (at > 0 ? l.slice(at + 2) : l).replace(/\s+/g, ' ') }
    })
    const shownNode = ex.nodes.find(n => n.id === ex.cursor) ?? sel
    const pathed = shownNode && shownNode.path ? shownNode : undefined
    const actions = pathed
      ? [
          ...(webUrl(ex, pathed) ? [{ key: 'web', svg: 'ui:open', nerd: '\u{f0379}', plain: '↗', label: 'Open in Fabric', run: () => quiet(openWeb($, ex, pathed)) }] : []),
          ...(modelOf(pathed) ? [{ key: 'open', svg: 'ui:open', nerd: '\u{f0379}', plain: '↗', label: 'Open in te', run: () => quiet(openLocal($, ex, pathed)) }] : []),
        ]
      : []
    const toggles = (
      <Box flexDirection="row" gap={2}>
        {ex.target && <Button key="domains" plain dimColor={ex.byDomain === false} label={native ? 'Domains' : `${icon('\u{f0ac}', '◇')} `} onPress={() => quiet(toggleDomains($))} />}
        <Button key="capacities" plain dimColor={ex.byCapacity !== true} label={native ? 'Capacities' : `${icon('\u{f04c5}', '◔')} `} onPress={() => quiet(toggleCapacity($))} />
        {rootNode && <Button key="up" plain dimColor label={icon('\u{f005d}', '↑')} onPress={() => quiet(goUp($))} />}
        {rootNode && <Button key="home" plain dimColor label={icon('\u{f02dc}', '⌂')} onPress={() => quiet(goHome($))} />}
        <Button key="refresh" plain dimColor label={icon('\u{f0450}', '↻')} onPress={() => quiet(refresh($))} />
        <Button key="collapse" plain dimColor label={icon('\u{eac5}', '⊟')} onPress={() => quiet(patchView($, () => ({ expanded: [] })))} />
        <Text> </Text>
      </Box>
    )
    return (
      <Box flexDirection="column" minHeight={Math.max(1, e.props.scroll?.bodyRows ?? 1)}>
        <Box flexDirection="row" alignItems="center">
          <Box flexGrow={1} flexShrink={1}>
            {native ? (
              <Box flexDirection="row" alignItems="center" gap={1}>
                {icon16(FABRIC_SVG.fabric, 'Microsoft Fabric', { t: titleGlyph(tier), c: TITLE_COLOR }, 'logo')}
                <Text bold wrap="truncate-end">{headName}</Text>
                {ex.status ? <Text color={MUTED}>{ex.status}</Text> : null}
              </Box>
            ) : (
              <Client key="head" module="./rows.tsx" props={{ rows: [head], active: '', activeBg: '', hoverBg: '', tones: TONES, spinner } satisfies RowsProps} />
            )}
          </Box>
          {toggles}
        </Box>
        <Box flexDirection="row">
          <Box flexGrow={1}>
            {work && !ex.query ? (
              <Client key="working" module="./rows.tsx" props={{ rows: [{ id: '', left: [{ t: 'Claude is working in Fabric...', sh: work.tone }], right: [] }], active: '', activeBg: '', hoverBg: '', tones: TONES, spinner } satisfies RowsProps} />
            ) : (
              <Input
                key="q"
                placeholder="Filter, or Enter to jump"
                autoFocus
                value={ex.query}
                onInput={(v: string) => quiet(patchView($, () => ({ query: v })))}
                onSubmit={(v: string) => quiet(patch($, cur => jumpTo(cur, v)))}
              />
            )}
          </Box>
          {ex.query ? <Button key="clearq" plain dimColor label={tier === 'plain' ? '×' : '\u{f0156}'} onPress={() => quiet(patchView($, () => ({ query: '' })))} /> : null}
        </Box>
        {!ex.setup && ex.nodes.length === 0 && <Text color={MUTED}>{ex.target ? 'nothing loaded yet' : HINT}</Text>}
        {ex.setup ? (
          <Client key="setup" module="./rows.tsx" props={{ rows: setupRows(ex.setup, tier, width), active: '', activeBg: '', hoverBg: '#2d2f33', tones: TONES, spinner } satisfies RowsProps} />
        ) : native ? (
          <Box key="rows" flexDirection="column">
            {pinned.map(nativeRow)}
            {pinned.length > 0 && <Text color={MUTED}>  ⋮</Text>}
            {shown.map(nativeRow)}
          </Box>
        ) : (
          <Client key="rows" module="./rows.tsx" props={{ rows: specs, active: ex.cursor, activeBg: '#3e4451', hoverBg: '#2d2f33', tones: TONES, spinner, ...(bar ? { bar } : {}) } satisfies RowsProps} />
        )}
        <Box flexGrow={1} />
        {shownNode && ex.detail.length > 0 && (
          <Box key="details" flexDirection="column">
            {rule('rule-top')}
            <Box flexDirection="row" alignItems="center" gap={1}>
              {icon16(FABRIC_SVG[shownNode.kind], typeLabel(shownNode.kind), { t: glyph(shownNode, tier).char, c: glyph(shownNode, tier).color }, 'sel')}
              <Text bold wrap="truncate-end">{shownNode.name}</Text>
              <Box flexGrow={1} />
              {sel && <Button key="clear" plain dimColor label={icon('\u{f0156}', '✕')} onPress={() => quiet(patchView($, () => ({ selected: '', detail: [] })))} />}
            </Box>
            {details.map((d, i) => (
              <Box key={`p:${i}`} flexDirection="row" gap={1}>
                <Box width={12} flexShrink={0}>
                  <Text color={MUTED}>{d.key}</Text>
                </Box>
                <Box flexShrink={1}>
                  <Text wrap="truncate-end">{d.value}</Text>
                </Box>
              </Box>
            ))}
            {pathed && rule('rule-actions')}
            {pathed && (
            <Box flexDirection="row" alignItems="center" gap={2}>
              {actions.map(a => (
                <Box key={`a:${a.key}`} flexDirection="row" alignItems="center" gap={1}>
                  {native ? icon16(FABRIC_SVG[a.svg], a.label, { t: '', c: MUTED }, `ai:${a.key}`) : null}
                  <Button key={a.key} plain label={native ? a.label : `${icon(a.nerd, a.plain)} ${a.label}`} onPress={a.run} />
                </Box>
              ))}
              <Box key="a:copy" flexDirection="row" alignItems="center" gap={1}>
                {native ? icon16(FABRIC_SVG['ui:copy'], 'Copy', { t: '', c: MUTED }, 'ai:copy') : null}
                <Button key="copy" plain label={native ? 'Copy path' : `${icon('\u{f018f}', '⧉')} Copy path`} onPress={p => quiet(copyOf($, pathed.path, p.surface))} />
              </Box>
            </Box>
            )}
          </Box>
        )}
      </Box>
    )
  })
}
