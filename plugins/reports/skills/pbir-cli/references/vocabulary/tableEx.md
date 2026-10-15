# tableEx

```yaml
number format:
  also_called: [format string, display units, decimal places, value format]
  general: [formatString (format string)]
section outline:
  also_called: [table border, header border, outline, frame around the section, border lines]
  grid: [outlineStyle (which sides are drawn), outlineColor (border color), outlineWeight (width or thickness)]
  columnHeaders: [outlineStyle (shape or marker type), outlineColor (border color), outlineWeight (width or thickness)]
  values: [outlineStyle (which sides are drawn), outlineColor (border color), outlineWeight (width or thickness)]
  total: [outlineColor (border color), outlineWeight (width or thickness)]
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
  columnHeaders: [fontFamily (font family), fontSize (font size), bold (bold), italic (italic), underline (underline), fontColor (font color), backColor (background color), alignment (alignment), wordWrap (word wrap)]
column width:
  also_called: [column size, auto-size columns, width of columns]
  columnHeaders: [autoSizeColumnWidth (behavior or interaction), columnAdjustment (behavior or interaction), defaultColumnWidth (width or thickness), customColumnWidth (behavior or interaction)]
  columnWidth: [value (width or thickness)]
values cells:
  also_called: [cells, values, table body, rows, data cells, numbers in the table]
  values: [fontFamily (font family), fontSize (font size), bold (bold), italic (italic), underline (underline), fontColor (font color), backColor (background color), wordWrap (word wrap)]
alternate rows:
  also_called: [banded rows, zebra stripes, alternating row color, every other row, striped rows]
  values: [fontColorPrimary (font color), backColorPrimary (background color), fontColorSecondary (font color), backColorSecondary (background color)]
web links in cells:
  also_called: [url icon, hyperlinks, link icon, web url]
  values: [urlIcon (show or hide), webURL (URL or link)]
icons in cells:
  also_called: [conditional icons, kpi icons, icon set, arrows in cells, traffic lights]
  values: [icon (behavior or interaction)]
totals row:
  also_called: [total row, grand total, bottom total, total line, sum row]
  total: [totals (show or hide), label (text content), outlineStyle (which sides are drawn), fontFamily (font family), fontSize (font size), bold (bold), italic (italic), underline (underline), fontColor (font color), backColor (background color)]
specific column formatting:
  also_called: [one column, single field, field formatting, this column only, per column format]
  columnFormatting: [labelDisplayUnits (display units), labelPrecision (decimal places), fontColor (font color), backColor (background color), alignment (alignment), styleHeader (apply-to scope), styleValues (apply-to scope), styleTotal (apply-to scope)]
data bars in cells:
  also_called: [in-cell bars, cell bar chart, data bars, conditional bars]
  columnFormatting: [dataBars (behavior or interaction)]
internal state that is not visible:
  also_called: [hidden property, engine setting, saved state, query option, not in the format pane]
  clustering: [transform (internal value)]
sparklines:
  also_called: [mini charts in cells, tiny line charts, inline charts, spark lines]
  sparklines: [chartType (line interpolation), dataColor (line color), strokeWidth (width or thickness), markers (behavior or interaction), markerColor (fill color), markerSize (size), markerShape (shape or marker type)]
table accessibility:
  also_called: [alt text column, screen reader row reference]
  accessibility: [altTextColumns (text content), rowWithReferenceText (data field binding)]
```
