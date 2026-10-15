# Page components

Reusable parts of a page, each one command. Build from these before assembling the same part from individual visuals. Every field argument is a typed reference (`Sales.Revenue.Measure`, `Periods.Period.Column`); `pbir model "Report.Report" -d` lists them.

```yaml
sidebar:
  what:  full-height left or right panel (the theme's neutral background unless --color is given), logo icon and title, icon nav buttons, slicers inside it blended in (white text, no background, shadow or border)
  cli:   pbir add sidebar <page> --title <name> --icon <icon> --nav "Overview=grid" --nav "Detail=list" [--active Overview] [--color <hex>] [--width 260] [--side left] [--slicer <typed column>]
  notes: place the sidebar's slicers first (x under the width); layered design, so set PBIR_ALLOW_OVERLAP=1 for other placements over it
navbar:
  what:  full-width navigation bar flush to the top or bottom page edge; replaces the scaffolded title; slicers become compact buttons for up to four members, otherwise dropdowns
  cli:   pbir add navbar <page> --title <name> --nav "Overview=grid" [--active Overview] [--slicer <typed column>]
headline card:
  what:  value with icon and title in the metric color, "vs" references with colored variance
  cli:   pbir add kpi-card <page> -v <typed measure> -r "Budget=<typed measure>" --icon <icon> --color <hex>
gauge:
  what:  thin SVG arc in the metric color with a dark target tick and label, in an image visual (a card is for a number; an SVG on its own goes in an image visual)
  cli:   pbir add gauge-card <page> -v <typed measure> --target <typed measure> --color <hex>
period buttons:
  what:  button slicer with one icon per button and a saved default choice
  cli:   pbir visuals button-icons <slicer> -f <typed column> --icon "Full Period=calendar-full" ... ; pbir visuals select <slicer> -f <typed column> -v "Period-to-Date"
  notes: flush buttons with square corners read as one control: `layout.cellPadding 0` (the gap) and `shapeCustomRectangle.rectangleRoundedCurve 0`. Corner style applies to every button; one button cannot be styled on its own
svg templates:
  what:  thin report measures that draw an SVG, wired into their host: a table or matrix column, the new card's image area, or each button of a button slicer. Row bars scale per row level of the host
  cli:   pbir visuals svg <visual> -p <pattern> -a <typed measure> [-t <typed measure>] [--axis <typed column>] [--header <name>]
  patterns: a selection below; `pbir visuals svg --list` prints every pattern with its hosts, required inputs and --opt switches
    bullet:    actual bar, target tick, variance %; grey on or above target, crimson below (cell, card)
    progress:  bar filled to actual / target with the % (cell, card, slicer)
    pill:      variance % in a soft green or red pill with an arrow (cell, card, slicer); on target buttons it shows each target's gap
    sparkline: actual over an axis column, last point marked (cell, card, slicer)
    dumbbell:  actual and target markers joined by a line (cell)
    diverging: variance % left or right of a center line (cell)
    delta:     IBCS absolute variance; a bar from zero with the signed difference on the other side (cell)
    pin:       IBCS relative variance; a line from zero ending in a marker, with the % on the other side (cell)
icons:
  names: the --icon help of `pbir add kpi-card` lists every name; for example coins, receipt, box, truck, users, cart, clock, target, trend, grid, list, logo, calendar, calendar-full, calendar-partial
```
