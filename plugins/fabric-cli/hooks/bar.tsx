import type { ClientModule } from 'claude-code'

export type BarProps = { id: string; total: number; start: number; size: number; track: string; thumb: string }
type Local = { ref: { unpoint?: () => void; id: string; rows: number; held: boolean } }

const Bar: ClientModule<BarProps, Local> = (props, surface) => {
  const { Box } = surface.elements
  let state = surface.state
  if (state === undefined) {
    state = { ref: { id: props.id, rows: props.size, held: false } }
    surface.setState(state)
  }
  const ref = state.ref
  ref.id = props.id
  ref.rows = Math.max(1, surface.rows || props.size)
  ref.unpoint ??= surface.onPointer(e => {
    if (e.type === 'enter') surface.post({ hover: ref.id })
    if (e.type === 'down' && e.button === 'left') ref.held = true
    if (e.type === 'up' || e.type === 'leave') ref.held = e.type === 'up' ? false : ref.held
    if ((e.type === 'down' && e.button === 'left') || (e.type === 'move' && ref.held && e.button === 'left')) {
      surface.post({ bar: ref.id, frac: Math.max(0, Math.min(1, ((e.fine?.y ?? e.y + 0.5)) / ref.rows)) })
    }
  })
  const rows = ref.rows
  const top = Math.min(rows - 1, Math.round((props.start / Math.max(1, props.total)) * rows))
  const height = Math.max(1, Math.min(rows - top, Math.round((props.size * rows) / Math.max(1, props.total))))
  return (
    <Box width={1} height="100%" flexDirection="column" backgroundColor={props.track}>
      {top > 0 ? <Box height={top} /> : null}
      <Box height={height} backgroundColor={props.thumb} />
    </Box>
  )
}

export default Bar
