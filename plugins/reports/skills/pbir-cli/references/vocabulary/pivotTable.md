# pivotTable

```yaml
number format:
  also_called: [format string, display units, decimal places, value format]
  general: [formatString (format string)]
the visual as a whole:
  also_called: [general, overall, entire visual, chart settings]
  general: [layout (layout or arrangement)]
section outline:
  also_called: [table border, header border, outline, frame around the section, border lines]
  grid: [outlineStyle (which sides are drawn), outlineColor (border color), outlineWeight (width or thickness)]
  columnHeaders: [outlineStyle (which sides are drawn), outlineColor (border color), outlineWeight (width or thickness)]
  rowHeaders: [outlineStyle (which sides are drawn)]
  values: [outlineStyle (which sides are drawn), outlineColor (border color)]
vertical gridlines:
  also_called: [column lines, lines between columns, column borders, vertical grid]
  grid: [gridVertical (show or hide), gridVerticalColor (line color), gridVerticalWeight (width or thickness)]
horizontal gridlines:
  also_called: [row lines, lines between rows, row borders, horizontal grid]
  grid: [gridHorizontal (show or hide), gridHorizontalColor (line color), gridHorizontalWeight (width or thickness)]
row padding:
  also_called: [row height, cell padding, space inside rows, row spacing]
  grid: [rowPadding (padding or margin)]
table global text:
  also_called: [table font, global font size, text size for the whole table]
  grid: [textSize (font size)]
images in cells:
  also_called: [image size in table, picture cells, image height]
  grid: [imageHeight (height), imageWidth (width or thickness)]
column headers:
  also_called: [header row, table header, column titles, column names, top row, headings]
  columnHeaders: [fontFamily (font family), fontSize (font size), bold (bold), italic (italic), underline (underline), fontColor (font color), backColor (background color), alignment (alignment), titleAlignment (alignment), wordWrap (word wrap)]
column width:
  also_called: [column size, auto-size columns, width of columns]
  columnHeaders: [autoSizeColumnWidth (behavior or interaction), columnAdjustment (behavior or interaction), defaultColumnWidth (width or thickness), customColumnWidth (behavior or interaction), customColumnWidthGranularView (behavior or interaction)]
  columnWidth: [value (width or thickness)]
web links in cells:
  also_called: [url icon, hyperlinks, link icon, web url]
  columnHeaders: [urlIcon (show or hide)]
  rowHeaders: [urlIcon (show or hide)]
  values: [urlIcon (behavior or interaction), webURL (URL or link)]
expand and collapse icons:
  also_called: [plus minus icons, +/- buttons, drill icons, expand buttons, chevrons]
  columnHeaders: [showExpandCollapseButtons (show or hide), expandCollapseButtonsColor (icon color), expandCollapseButtonsSize (size)]
  rowHeaders: [showExpandCollapseButtons (show or hide), expandCollapseButtonsColor (icon color), expandCollapseButtonsSize (size)]
internal state that is not visible:
  also_called: [hidden property, engine setting, saved state, query option, not in the format pane]
  columnHeaders: [autoExpand (behavior or interaction)]
  rowHeaders: [autoExpand (behavior or interaction)]
row headers:
  also_called: [row labels, row names, first column, row titles, hierarchy column]
  rowHeaders: [unfrozen (behavior or interaction), outlineColor (border color), outlineWeight (width or thickness), fontFamily (font family), fontSize (font size), bold (bold), italic (italic), underline (underline), fontColor (font color), backColor (background color), alignment (alignment), wordWrap (word wrap), expandCompositeHierarchy (behavior or interaction), repeatRowHeaders (behavior or interaction), legacyStyleDisabled (behavior or interaction)]
stepped layout indentation:
  also_called: [row indentation, hierarchy indent, stepped rows, compact layout]
  rowHeaders: [stepped (layout or arrangement), steppedLayoutIndentation (padding or margin)]
values cells:
  also_called: [cells, values, table body, rows, data cells, numbers in the table]
  values: [outlineWeight (width or thickness), fontFamily (font family), fontSize (font size), bold (bold), italic (italic), underline (underline), fontColor (font color), backColor (background color), wordWrap (word wrap)]
alternate rows:
  also_called: [banded rows, zebra stripes, alternating row color, every other row, striped rows]
  values: [fontColorPrimary (font color), backColorPrimary (background color), fontColorSecondary (font color), backColorSecondary (background color), bandedRowHeaders (show or hide)]
values on rows:
  also_called: [measures on rows, switch values to rows, pivot values]
  values: [valuesOnRow (layout or arrangement)]
icons in cells:
  also_called: [conditional icons, kpi icons, icon set, arrows in cells, traffic lights]
  values: [icon (behavior or interaction)]
subtotals:
  also_called: [sub totals, group totals, row subtotals, column subtotals, intermediate totals]
  subTotals: [fontFamily (font family), fontSize (font size), bold (bold), italic (italic), underline (underline), fontColor (font color), backColor (background color), rowSubtotals (show or hide), rowSubtotalsLabel (text content), rowSubtotalsPosition (position), perRowLevel (apply-to scope), columnSubtotals (show or hide), columnSubtotalsLabel (text content), perColumnLevel (apply-to scope), applyToHeaders (apply-to scope), levelSubtotalEnabled (show or hide), levelSubtotalLabel (text content)]
totals row:
  also_called: [total row, grand total, bottom total, total line, sum row]
  total: [fontFamily (font family), fontSize (font size), bold (bold), italic (italic), underline (underline), fontColor (font color), backColor (background color), applyToHeaders (apply-to scope)]
row grand total:
  also_called: [grand total row, bottom grand total, row totals]
  rowTotal: [fontFamily (font family), fontSize (font size), bold (bold), italic (italic), underline (underline), fontColor (font color), backColor (background color), applyToHeaders (apply-to scope)]
column grand total:
  also_called: [grand total column, total column on the right, column totals]
  columnTotal: [fontFamily (font family), fontSize (font size), bold (bold), italic (italic), underline (underline), fontColor (font color), backColor (background color), applyToHeaders (apply-to scope)]
specific column formatting:
  also_called: [one column, single field, field formatting, this column only, per column format]
  columnFormatting: [labelDisplayUnits (display units), labelPrecision (decimal places), fontColor (font color), backColor (background color), alignment (alignment), styleHeader (apply-to scope), styleValues (apply-to scope), styleSubtotals (apply-to scope), styleTotal (apply-to scope)]
data bars in cells:
  also_called: [in-cell bars, cell bar chart, data bars, conditional bars]
  columnFormatting: [dataBars (behavior or interaction)]
sparklines:
  also_called: [mini charts in cells, tiny line charts, inline charts, spark lines]
  sparklines: [chartType (line interpolation), dataColor (fill color), strokeWidth (width or thickness), markers (behavior or interaction), markerColor (fill color), markerSize (size), markerShape (shape or marker type)]
table accessibility:
  also_called: [alt text column, screen reader row reference]
  accessibility: [altTextColumns (text content)]
blank rows:
  also_called: [spacer rows, empty rows between groups, separator rows]
  blankRows: [showBlankRows (show or hide), blankRowColor (fill color), blankRowTransparency (transparency), showBorder (show or hide), borderPosition (position), borderColor (border color), borderTransparency (transparency), borderWidth (width or thickness)]
annotations:
  also_called: [callouts, highlights, chart annotations]
  annotationTemplate: [highlight (behavior or interaction)]
```
