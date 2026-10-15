# Anatomy of the complex visuals

The new card, matrix/table and the four slicers split one visible part across several format
objects, and reuse the same object name for different parts. `pbir schema elements <type>` is still
the source of truth; this file explains the shape so the element list reads correctly and names the
traps that survive a correct element match.

Every path below is the `<object>.<property>` that `pbir set` takes, and
`pbir schema describe <type> <object>` lists its properties, types and allowed values.

## cardVisual (new card)

One visual draws N cards, one per value. Every element exists twice: once for a card, once for a
small multiple tile.

```yaml
the big number:      value.*                 # element callout_value
its caption:         label.*                 # element callout_label
box around the pair: cardCalloutArea.*       # element callout_area; its own fill and corners
card fill:           fillCustom.*            # element card_fill
card border:         border.* + outline.*    # element card_outline
card shape/corners:  shapeCustomRectangle.*  # element card_shape
accent bar:          accentBar.*             # element accent_bar
image on the card:   cardImage.* or image.*  # elements card_image / image
shadow / glow:       shadowCustom.* / glowCustom.*
divider between cards: divider.*             # element card_divider
grid of cards:       layout.*                # element card_layout
```

Reference labels (the comparison rows under the big number) are four objects, not one:

```yaml
referenceLabel.*:        what the row shows (value, formatString) AND its background box
referenceLabelTitle.*:   the caption of the row; every property is prefixed title*
referenceLabelValue.*:   the number of the row; every property is prefixed value*
referenceLabelDetail.*:  the second number of the row; every property is prefixed detail*
referenceLabelLayout.*:  where the rows sit, their arrangement, padding around the divider
```

Traps:

```yaml
prefixed property names: referenceLabelTitle.titleFontSize, referenceLabelValue.valueFontSize,
                         referenceLabelDetail.detailFontSize. There is no plain fontSize on them
two backgrounds:         referenceLabel.backgroundColor is the reference-label box;
                         fillCustom.fillColor is the card; background.color is the whole visual
layout is overloaded:    layout.* carries the card grid, padding, background image, the lines
                         between cards and fixed sizing. Match the element, not the object
outline vs border:       border.* is the card frame; outline.* is a thinner separate stroke;
                         layout.lineColor / layout.gridlineColor are the lines BETWEEN cards
grid.*:                  horizontal gridlines between cards (grid.show/width/color), not a table
card vs visual:          fillCustom.* fills each card; background.* fills the whole visual.
                         Same for border.* (card) vs the container border object
```

Small multiples are a parallel set of objects, all prefixed `smallMultiples*`:

```yaml
smallMultiplesHeader.*:        tile title, its font and its own background
smallMultiplesCellBackGround.*: tile fill
smallMultiplesLayout.*:        rows, columns, orientation, maxSmallMultiples
smallMultiplesGrid.*:          gridlines between tiles (gridlineShow/Width/Color/Style)
smallMultiplesBorder.*:        border of a tile, also spelled gridline* (gridlineShow, ...)
smallMultiplesAccentBar.*:     accent bar of a tile
smallMultiplesOuterShape.*:    tile corners
smallMultiplesOverFlow.*:      what happens past maxSmallMultiples
```

Note `smallMultiplesBorder` uses `gridline*` property names even though it is the tile border.

## pivotTable (matrix) and tableEx (table)

Same skeleton. `pivotTable` adds row headers, subtotals and two grand totals.

```dirtree
grid.               whole-table concerns: gridlines, row padding, global text size, image sizing
columnHeaders.      the header row (font, backColor, alignment, column width, word wrap)
rowHeaders.         matrix only: the left hierarchy (stepped layout, expand icons, repeat)
values.             the body cells AND the banding
total.              tableEx: the totals row. pivotTable: the totals row of a column group
subTotals.          pivotTable only: row and column subtotals
rowTotal.           pivotTable only: row grand total
columnTotal.        pivotTable only: column grand total
columnFormatting.   per-column overrides and data bars
columnWidth.        the stored width of one column
sparklines.         sparkline cells
blankRows.          pivotTable only: blank-row separators
accessibility.      screen-reader options
```

Traps:

```yaml
banding lives under values:
  values.backColorPrimary / backColorSecondary / fontColorPrimary / fontColorSecondary,
  and pivotTable turns it on with values.bandedRowHeaders. "zebra stripes", "alternate rows"
  and "row background" all land on values.*, never on grid.*
outline vs gridlines:
  grid.gridHorizontal / gridVertical (+ Color, Weight) are the lines between cells.
  outlineStyle / outlineColor / outlineWeight exist SEPARATELY on grid, columnHeaders,
  rowHeaders, values and (tableEx) total: that is the frame around each section.
  "add a border to the header" is columnHeaders.outline*, not grid.grid*
four totals in a matrix:
  total.* (column-group totals row), subTotals.* (row/column subtotals),
  rowTotal.* (row grand total), columnTotal.* (column grand total). Ask which one is meant
  when the user only says "totals" on a pivotTable
tableEx total.totals:
  the boolean that shows the totals row; total.label is its text
column width:
  columnHeaders.autoSizeColumnWidth off first, then columnHeaders.defaultColumnWidth or the
  per-column columnWidth.value
font size:
  columnHeaders.fontSize / values.fontSize / total.fontSize are per section;
  grid.textSize is the table-wide text size
expand icons:
  columnHeaders.showExpandCollapseButtons and rowHeaders.showExpandCollapseButtons are two
  separate switches with the same name
```

## slicer (the classic slicer)

One visual type, several modes (`data.mode`, `general.orientation`); which elements are visible
depends on the mode, but every object is always settable.

```yaml
header:               header.*         # its font uses header.textSize, not fontSize
items:                items.*          # the list rows; items.textSize, items.background
search box:           searchBox.*      # outlineStyle, borderColor, background only
selection behavior:   selection.*      # selectAllCheckboxEnabled, singleSelect
checkbox colour:      selectionIcon.color
current selection:    data.*           # startDate, endDate, numericStart, mode - state, not style
between/date inputs:  date.*, calendarButton.*, numericInputStyle.*
slider:               slider.*
relative date:        dateRange.* (settings) + relativeText.* / dateRangeText.* (the summary line)
pending changes icon: pendingChangesIcon.*
frame:                general.outlineColor, general.outlineWeight
```

Traps: `header.textSize` and `items.textSize` (not `fontSize`); `data.*` writes the slicer's
selection, so it is a data change, not formatting; `items.background` is the row background while
`background.*` is the whole visual.

## listSlicer and advancedSlicerVisual (the new slicers)

These are built on the card engine, so they borrow the card objects: `value.*`, `label.*`,
`fillCustom.*`, `layout.*`, `padding.*`, `shapeCustomRectangle.*`, `shadowCustom.*`,
`glowCustom.*`, `accentBar.*`, `rotation.*`.

```yaml
the text of an item:   value.*          # element callout_value
its caption:           label.*          # element callout_label
button fill:           fillCustom.*     # per button
whole visual fill:     background.*
buttons grid:          layout.*         # orientation, rowCount, columnCount, style
checkbox / tick:       selectionIcon.*  # full object here, unlike the classic slicer
expand chevron:        expansionIcon.*  # listSlicer only
icon on a button:      icon.*
selection behavior:    selection.*
inverted selection:    data.isInvertedSelectionMode
```

Traps: the item text is `value.*`, not `items.*` (that is the classic `slicer`); `fillCustom.*` is
one button and `background.*` is the visual; `actionState.is*Advanced` are UI state switches that
change which format-pane cards Desktop shows, not anything visible; `expansionIcon.*` exists on
`listSlicer` only, so a request for the expand chevron on an `advancedSlicerVisual` has no path and
the user has to be told.

## textSlicer

A text box that filters. Nothing is shared with the other slicers.

```yaml
the box:              inputTextBox.*   # padding, backColor, borderColor, corner radius
its accent bar:       inputTextBox.accentBar*   # accentBarShow/Position/Color/Width
placeholder:          inputTextBox.placeholder* + inputText.placeholder
typed text and pills: inputText.*      # fontColor, pill corners, pill padding
the x on a pill:      inputText.dismiss*   # dismissColor, dismissSize, dismissPosition
operator dropdown:    filterOperator.* (its styling) + dropdown.filterMode (which operator)
apply button:         applyButton.*
multi-select:         slicerSettings.multiselect
numbers only:         slicerSettings.numericInputOnly
```

Trap: `inputTextBox.*` and `inputText.*` are two different objects one character apart. The box is
`inputTextBox`, the text inside it is `inputText`.

## Container objects

Every type above also carries the container objects, which are the same everywhere:
`title.*`, `subTitle.*`, `divider.*`, `spacing.*`, `background.*`, `border.*`, `padding.*`,
`dropShadow.*`, `visualHeader.*`, `visualHeaderTooltip.*`, `visualTooltip.*`, `visualLink.*`,
`stylePreset.*`, `lockAspect.*`, `general.*`.

On `cardVisual` and the new slicers, `divider.*` is both a container object (the line under the
visual title) and a card element (the line between cards); `border.*` is both the container border
and the card border. The element key in the discovery result says which one a path belongs to.
