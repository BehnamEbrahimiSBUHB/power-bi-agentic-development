# Design conventions

House defaults for a report page. Build with the components in [components.md](components.md) first. The bundled `sqlbi` theme template (`pbir theme apply-template "Report.Report" sqlbi`) carries the theme-level defaults; the previous version stays available as `sqlbi_v1`. Apply the rest per visual. Field arguments are typed references (`Sales.Revenue.Measure`, `Date.Month.Column`).

## Page

- 1920x1080 for a dashboard page: a slicer band on the left and four columns of headline card over trend
- Slicers on a dark sidebar blend into it: white text, no background, shadow or border
- Title top-left, 36pt, three words at most (`pbir add title` enforces both and updates an existing title). No subtitle: the title names the page and the visuals carry the detail
- Filters that apply to several pages (unit, currency, metric, scenario) go in the filter pane at report level, not on the canvas. Slicers on the canvas are only for choices the reader changes often, or where a screenshot without the choice would be unclear (the target buttons above a comparison)
- Slicers stacked full height in the left band; use a hierarchy (Brand Hierarchy, Customer Hierarchy) instead of several flat slicers on the same table
- A model that converts currency (a measure multiplies by a selected exchange rate) needs a currency filter on the page. Without one the measure uses whatever rate MAX() picks and every number is wrong. Put the currency in the title
- Check that a comparison has data for the period shown before using it. A blank forecast or budget label reads as broken; pick a period where it exists, or leave it out and say why
- When actuals stop part-way through the year, offer a Full Period / Period-to-Date button slicer at the top and default to period-to-date. Comparison measures (forecast, budget, 1YP) keep only dates that have actuals when period-to-date is on, so every comparison is like for like. Never cut the period with a hidden month filter. Save period-to-date as the slicer's selection with `pbir visuals select`

## Theme (bundled `sqlbi` template)

- Pastel palette, light shadow, corner radius 4
- Legends small (8pt, grey) at the bottom center
- Bars: no border, no value axis or gridlines, data labels on
- Lines: 2.5px actual, area shaded at 90% transparency
- Axis labels thin (Segoe UI, not semibold), grey
- Slicers: no header (the visual title names the field), search box on, thin 10pt items
- Button slicer: no title, background, divider or shadow; compact white buttons with a thin zinc outline and a small grey icon, light grey fill and semibold text when selected, strict single select. Its states are `selection:selected` and `interaction:hover` on `fillCustom`, `outline` and `value`. Give each button its own icon when the choices differ (full calendar for Full Period, partial for Period-to-Date) with `pbir visuals button-icons`. A static per-value image is not possible on this slicer; the icon comes from a measure through the image "Select from data" slot
- Tables and matrices: white cells with subtle banding, no row dividers, no divider under the title; row headers light, only subtotals bold
- Textbox padding 0, so a title never clips

## Color and line style

- Green and red are for sentiment only (good and bad, the theme's `good` and `bad`). Never give a plain metric a green, red or orange color; the palette keeps them last for that reason
- Semantically distinct metrics get distinct hues on the page; two different metrics never share a color
- Variants of one metric (value and quantity, MTD and YTD) are shades of its hue: turnover dark blue, turnover quantity soft blue-grey
- Use one color per metric on its card title, icon, line and bars
- Actual: solid line in the metric color. Comparison (1YP, budget, forecast): grey, dashed, 1px thinner, small markers. A second comparison on the same chart is dotted (`--line-style dotted`); the legend shows line and marker so the styles read
- Diamond markers only with a marker rotation of 0 (the theme default); a rotation of 45 turns diamonds into squares
- Bar data labels take a darker shade of their bar
- A line cannot change color where it crosses its target (a measure-driven line color is ignored by the line chart); show the gap with the comparison line and the card's variance instead

Apply with `pbir visuals series <visual> -m <typed measure> --color <hex>` or `--comparison`.

## Headline card

`pbir add kpi-card`:

- The visual title names the metric in its color, with a line in that color under it; the card's content sits a padding below the line. The card's own accent bar cannot be spaced from its content, so it stays off
- Icon left of the value at a fixed size, no divider
- The value takes the metric's color, like the title and line. The comparison rows use a darker green and red for contrast on white. References sit under the value, each on one line: "vs Forecast", "vs Budget", "vs 1YP" (the "vs" is added), then the value in the actual's number format and the variance %. The whole reference row keeps the theme's good or bad color. `--points` for a percentage metric, `--lower-is-better` for cost-like metrics
- A card can hold several references; order them forecast, budget, 1YP
- Trends go in a line chart under the card, not inside it. Those trend charts sit under a titled card, so switch their own title and divider off per visual (not in the theme)

## Charts and tables

- Compare categories with horizontal bars (`clusteredBarChart`): the labels read left to right and long names fit. Use vertical columns only for time on the x axis (months, weeks, years)
- A bar chart with many categories or long values drops data labels for a value axis with a title and subtle gridlines; switch labels on per visual where the chart has room, as in a wide dashboard row
- Prefer a donut to a pie (pbir warns when a pie is added); a line chart or a chart with a time axis sorts by the axis (`pbir validate --qa` warns otherwise)
- Sort month axes by the month column, not by value
- Data labels take the color of their bars; when the bars are colored by a measure (green or red), the labels use the same measure (`pbir visuals cf <chart> --measure "labels.color <typed measure>"`). Columns with a target tick carry their labels at the base in a white chip (`labelPosition InsideBase`, `enableBackground`), so a label never collides with the tick. Keep bars thin: `categoryAxis.innerPadding` 65
- Labels aim for three significant digits and never show more than four or five: 2,228M or 2.2bn, not 2,227.8M; 159M, not 159.1M. Pick the display unit and decimals that give that for the largest and smallest label on the chart (`labelDisplayUnits`, `labelPrecision`); a series-level `labelPrecision` overrides the chart's. When one unit cannot fit the range, the model measure needs a dynamic format string expression that picks K/M/bn and the currency per value (SQLBI's dynamic format string pattern); suggest it to the model owner rather than forcing a unit
- Actuals draw on top of their comparisons: a comparison series comes first in the role, the actual last. `pbir visuals series <chart> -m <typed measure> --comparison` moves the comparison to the front; for bars, the grey comparison behind and the metric color in front, overlapping
- Show every month of the year on year-to-date column charts, the variance chart included, so both charts line up and the reader sees how much of the year is left (`pbir visuals show-all <visual> --role Category`). A measure-only chart needs rows for the future months: return 0 there and give the measure a format with an empty zero section (`#,##0;-#,##0;""`)
- Actual against a target over time: columns for the actual, the target as a dark tick from error bars (`pbir visuals error-bars add` with bounds 1% either side of the target, then `error.field(...).barWidth`, `barColor`, `markerShow false`; see [error-bars.md](error-bars.md))
- A single value against a target uses the house gauge, `pbir add gauge-card` (thin SVG arc in the metric color, dark target tick, Segoe, in an image visual). A card is for a number; an SVG on its own goes in an image visual reading the measure (`pbir visuals image <visual> -m <typed measure>`). Avoid the native gauge: it has no arc thickness setting and falls back to DIN
- SVG in a measure: write plain `#` colors; the service encodes the data URI itself, so `%23` breaks every color
- A matrix with several row levels opens one level down: `pbir visuals expand <matrix>`
- Variance about zero follows IBCS: absolute variance as a bar from a zero line (`pbir visuals svg -p delta`), relative variance as a pin, a line ending in a dot (`-p pin`), both green or red with the value on the other side of zero. Prefer these to a dumbbell, which cannot show a few % on a wide range
- Fit a table's columns to its width after adding columns: `pbir visuals column-width <visual> --fit`. Rename column headers on that visual only with `pbir fields rename <visual path> <query ref> <label>` (a label change; `pbir fields replace` swaps the field)
- A matrix comparison column reads best as an SVG bullet (`pbir visuals svg -p bullet`): actual bar in the metric color, target tick, variance % in green or red, scaled per row level, with a `<desc>` sort key (see `svg-table-matrix.md` in the `svg-visuals` skill of the custom-visuals plugin). Set `grid.imageWidth` and `grid.imageHeight`
- Data bars in a matrix are subtle (a pale shade of the metric color) and draw only on detail rows, never on subtotals or totals. So the rows that should carry bars must be the lowest level: two row levels when the second level is the detail

## Review the rendered report

Render the page (Desktop screenshot or a published copy; see [rendered-dashboard-loop.md](rendered-dashboard-loop.md)), wait until every visual has loaded, and look at the screenshot, zooming into each area. Fix everything on this list before showing it to anyone:

1. Something does not render: a blank visual, a broken SVG, a missing month, an error icon
2. Empty space from odd positions: gaps between elements, a visual that does not reach the next one, table columns wider than their content, a grid narrower than its visual (`pbir visuals column-width --fit`)
3. Data labels too long or too small to read: change the display units (millions rather than billions of 0.0x) and precision, or give the model measure a dynamic format string so labels scale with the value and carry the currency
4. Too little contrast: text under 4.5:1 against its background, light grey axis labels, pale text on a tinted fill
5. Elements too close together, or unequal padding between neighbours; line edges up on the same grid
6. Text cut off with "...": a button, header, title or label. Enlarge the visual or column, shorten the string, or rename the field on that visual

Compare with the previous version using `pbir diff`, so a change you did not intend shows up before the screenshot does.

## Publishing over a report someone else edits

Before overwriting a published report, diff the published copy against the version you last published: `pbir diff last-published.Report "Workspace.Workspace/Report.Report" -g visual`. "No differences" means nobody edited it in the service; anything else is their work, so download it first (`pbir download <local> --in-place`) and build on it; [manual-roundtrip-review.md](manual-roundtrip-review.md) covers the comparison. The report id check in `pbir publish --expected-report-id` only confirms which report is overwritten.
