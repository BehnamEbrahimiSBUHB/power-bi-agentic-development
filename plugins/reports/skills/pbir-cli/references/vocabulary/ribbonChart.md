# ribbonChart

```yaml
number format:
  also_called: [format string, display units, decimal places, value format]
  general: [formatString (format string)]
responsive behavior:
  also_called: [responsive, auto resize, adaptive layout]
  general: [responsive (behavior or interaction), responsiveLegacy (behavior or interaction)]
legend:
  also_called: [key, series key, color key, legend box]
  legend: [show (show or hide), position (position)]
legend title:
  also_called: [legend name, legend heading]
  legend: [showTitle (show or hide), titleText (text content)]
legend text:
  also_called: [legend labels, legend entries, legend items]
  legend: [fontFamily (font family), fontSize (font size), bold (bold), italic (italic), underline (underline), labelColor (font color)]
gradient legend:
  also_called: [color scale legend, color bar, continuous legend]
  legend: [showGradientLegend (show or hide)]
small multiple titles:
  also_called: [small multiples headers, facet titles, panel titles, trellis headers, subheader]
  subheader: [show (show or hide), fontFamily (font family), fontSize (font size), bold (bold), italic (italic), underline (underline), fontColor (font color), alignment (alignment), position (position), titleWrap (word wrap)]
small multiples grid:
  also_called: [small multiples layout, facet grid, panel layout, trellis rows and columns]
  smallMultiplesLayout: [layoutType (layout or arrangement), rowCount (count or limit), columnCount (count or limit)]
small multiples background:
  also_called: [panel background, facet background, cell background]
  smallMultiplesLayout: [backgroundColor (background color), backgroundTransparency (transparency)]
small multiples gridlines:
  also_called: [lines between small multiples, panel borders, facet dividers]
  smallMultiplesLayout: [gridLineType (line style), gridLineShow (show or hide), gridLineWidth (width or thickness), gridLineColor (line color), gridLineTransparency (transparency), gridLineStyle (line style)]
small multiples padding:
  also_called: [space between small multiples, panel padding, facet spacing]
  smallMultiplesLayout: [gridPadding (padding or margin), advancedPaddingOptions (behavior or interaction), columnPaddingInner (padding or margin), columnPaddingOuter (padding or margin), rowPaddingInner (padding or margin), rowPaddingOuter (padding or margin)]
x axis:
  also_called: [horizontal axis, category axis, bottom axis, x-axis]
  categoryAxis: [show (show or hide), invertAxis (orientation), axisStyle (style or theme preset)]
x axis layout:
  also_called: [axis position, axis side, axis type, category width, concatenate labels, axis size]
  categoryAxis: [axisType (scale type), preferredCategoryWidth (width or thickness), maxMarginFactor (size), switchAxisPosition (position)]
spacing between bars or marks:
  also_called: [gap between bars, bar width, inner padding, bar spacing, category gap, series gap, overlap]
  categoryAxis: [innerPadding (spacing or gap)]
  layout: [stackedGapSize (spacing or gap)]
x axis labels:
  also_called: [axis values, tick labels, axis text, axis numbers, category names on the axis]
  categoryAxis: [concatenateLabels (behavior or interaction), fontFamily (font family), fontSize (font size), bold (bold), italic (italic), underline (underline), labelColor (font color), labelDisplayUnits (display units), labelPrecision (decimal places)]
x axis range and scale:
  also_called: [axis min and max, axis start and end, axis scale, log scale, axis bounds, invert axis]
  categoryAxis: [start (range start or minimum), end (range end or maximum), logAxisScale (scale type), roundRange (behavior or interaction)]
x axis title:
  also_called: [axis name, axis caption, axis heading]
  categoryAxis: [showAxisTitle (show or hide), titleText (text content), titleFontFamily (font family), titleFontSize (font size), titleBold (bold), titleItalic (italic), titleUnderline (underline), titleColor (font color)]
x axis gridlines:
  also_called: [grid lines, background lines, horizontal lines behind the bars, guide lines]
  categoryAxis: [gridlineShow (show or hide), gridlineThickness (width or thickness), gridlineColor (line color), gridlineTransparency (transparency), gridlineStyle (line style), gridlineAutoScale (behavior or interaction), gridlineDashArray (line style), gridlineDashCap (line style)]
y axis:
  also_called: [vertical axis, value axis, left axis, y-axis]
  valueAxis: [show (show or hide), invertAxis (orientation), sharedAxis (behavior or interaction), axisStyle (line style)]
y axis range and scale:
  also_called: [axis min and max, axis start and end, axis scale, log scale, axis bounds, invert axis]
  valueAxis: [start (range start or minimum), end (range end or maximum), logAxisScale (scale type), roundRange (behavior or interaction), scaleToFit (behavior or interaction)]
y axis labels:
  also_called: [axis values, tick labels, axis text, axis numbers, category names on the axis]
  valueAxis: [fontFamily (font family), fontSize (font size), bold (bold), italic (italic), underline (underline), labelColor (font color), labelDisplayUnits (display units), labelPrecision (decimal places)]
y axis title:
  also_called: [axis name, axis caption, axis heading]
  valueAxis: [showAxisTitle (show or hide), titleText (text content), titleFontFamily (font family), titleFontSize (font size), titleBold (bold), titleItalic (italic), titleUnderline (underline), titleColor (font color)]
y axis gridlines:
  also_called: [grid lines, background lines, horizontal lines behind the bars, guide lines]
  valueAxis: [gridlineShow (show or hide), gridlineThickness (width or thickness), gridlineColor (line color), gridlineTransparency (transparency), gridlineStyle (line style), gridlineAutoScale (behavior or interaction), gridlineDashArray (line style), gridlineDashCap (line style)]
y axis layout:
  also_called: [axis position, axis side, axis type, category width, concatenate labels, axis size]
  valueAxis: [switchAxisPosition (position)]
zoom slider:
  also_called: [zoom bar, axis slider, range slider on the axis, scroll zoom]
  zoom: [show (show or hide), showOnCategoryAxis (show or hide), categoryMin (range start or minimum), categoryMax (range end or maximum), categorySize (width or thickness), showOnValueAxis (show or hide), valueMin (range start or minimum), valueMax (range end or maximum), valueSize (width or thickness), showLabels (show or hide), showTooltip (show or hide)]
ribbons:
  also_called: [ribbon bands, connectors between columns, flows, bands]
  dataPoint: [defaultColor (fill color), fill (fill color), fillRule (color scale or gradient), fillTransparency (transparency), borderShow (show or hide), borderSize (width or thickness), borderColorMatchFill (match another color), borderColor (border color), borderOutlineOnly (show or hide)]
  layout: [stackedGapExplodes (behavior or interaction), ribbonGapSize (spacing or gap)]
  ribbonBands: [show (show or hide), fillMatchColor (match another color), fillColor (fill color), fillTransparency (transparency), borderShow (show or hide), borderColor (border color)]
border around the bars or marks:
  also_called: [bar border, bar outline, column border, stroke around bars, mark outline, slice border]
  dataPoint: [borderTransparency (transparency)]
  ribbonBands: [borderSize (width or thickness), borderColorMatchFill (match another color), borderTransparency (transparency)]
series stacking order:
  also_called: [stack order, series sort, reverse stack]
  layout: [seriesOrderReversed (layout or arrangement), seriesOrderSorted (layout or arrangement)]
data labels:
  also_called: [labels, values on the bars, numbers on the chart, value labels, bar labels, point labels]
  labels: [show (show or hide), showByDefault (show or hide), showSeries (show or hide), showAll (apply-to scope), labelPosition (position), labelDensity (spacing or gap), optimizeLabelDisplay (behavior or interaction), labelContainerMaxWidth (width or thickness), labelOrientation (orientation), labelOverflow (word wrap), wordWrap (word wrap), showDynamicLabels (behavior or interaction), enableValueDataLabel (show or hide), fontFamily (font family), fontSize (font size), bold (bold), italic (italic), underline (underline), color (font color), transparency (transparency), showBlankAs (blank value handling), labelContentLayout (layout or arrangement), horizontalAlignment (alignment)]
data label background:
  also_called: [label background, label box, label pill, label fill]
  labels: [enableBackground (show or hide), backgroundColor (background color), backgroundTransparency (transparency)]
  totals: [enableBackground (show or hide), backgroundColor (background color), backgroundTransparency (transparency)]
data label value:
  also_called: [label value, value part of the label, the number in the label]
  labels: [dynamicLabelValue (data field binding), valueFormatString (format string), labelDisplayUnits (display units), valueCustomFormatString (format string), labelPrecision (decimal places)]
data label title:
  also_called: [label title, label header, series name in the label]
  labels: [dynamicLabelTitle (data field binding), titleFormatString (format string), enableTitleDataLabel (show or hide), titleContentType (label content), titleFontFamily (font family), titleFontSize (font size), titleBold (bold), titleItalic (italic), titleUnderline (underline), titleColor (font color), titleTransparency (transparency), titleLabelDisplayUnits (display units), titleCustomFormatString (format string), titleLabelPrecision (decimal places), titleShowBlankAs (blank value handling)]
data label detail:
  also_called: [detail label, second value in the label, label detail, extra label measure]
  labels: [dynamicLabelDetail (data field binding), detailFormatString (format string), enableDetailDataLabel (show or hide), detailContentType (label content), detailFontFamily (font family), detailFontSize (font size), detailBold (bold), detailItalic (italic), detailUnderline (underline), detailColor (font color), detailTransparency (transparency), detailLabelDisplayUnits (display units), detailCustomFormatString (format string), detailLabelPrecision (decimal places), detailShowBlankAs (blank value handling)]
total labels:
  also_called: [stack totals, totals above the bars, sum labels, stacked total]
  totals: [show (show or hide), labelDisplayUnits (display units), labelPrecision (decimal places), fontFamily (font family), fontSize (font size), bold (bold), italic (italic), underline (underline), color (font color), showPositiveAndNegative (behavior or interaction)]
plot area:
  also_called: [chart area, chart background, area behind the bars, plot background, plot image]
  plotArea: [transparency (transparency), image (image source)]
constant line label:
  also_called: [reference line label, line data label, target label]
  xAxisReferenceLine: [displayName (text content), dataLabelShow (show or hide), dataLabelText (label content), dataLabelColor (font color), dataLabelDecimalPoints (decimal places), dataLabelHorizontalPosition (position), dataLabelVerticalPosition (position), dataLabelDisplayUnits (display units)]
  y1AxisReferenceLine: [displayName (text content), dataLabelShow (show or hide), dataLabelText (label content), dataLabelColor (font color), dataLabelDecimalPoints (decimal places), dataLabelHorizontalPosition (position), dataLabelVerticalPosition (position), dataLabelDisplayUnits (display units)]
constant line:
  also_called: [reference line, target line, threshold line, benchmark line, goal line, average line, min line, max line, median line, percentile line]
  xAxisReferenceLine: [value (value or amount), position (position), show (show or hide), width (width or thickness), lineColor (line color), transparency (transparency), style (line style), autoScale (behavior or interaction), dashArray (line style), dashCap (line style), shadeColorMatchStroke (match another color)]
  y1AxisReferenceLine: [value (value or amount), position (position), show (show or hide), width (width or thickness), lineColor (line color), transparency (transparency), style (line style), autoScale (behavior or interaction), dashArray (line style), dashCap (line style)]
constant line shaded region:
  also_called: [shade above the line, shade below the line, reference band, shaded region]
  xAxisReferenceLine: [shadeShow (show or hide), shadeRegion (position), shadeColor (fill color), shadeTransparency (transparency)]
  y1AxisReferenceLine: [shadeShow (show or hide), shadeRegion (position), shadeColor (fill color), shadeColorMatchStroke (match another color), shadeTransparency (transparency)]
trend line:
  also_called: [trendline, regression line, best fit line]
  trend: [show (show or hide), width (width or thickness), lineColor (line color), transparency (transparency), style (line style), autoScale (behavior or interaction), dashArray (line style), dashCap (line style), displayName (text content), combineSeries (behavior or interaction), useHighlightValues (behavior or interaction)]
error bars:
  also_called: [whiskers, error lines, uncertainty bars, confidence bars, error caps]
  error: [enabled (show or hide), errorRange (data field binding), barShow (show or hide), barMatchSeriesColor (match another color), barColor (fill color), barWidth (width or thickness), barBorderColor (border color), barBorderSize (width or thickness)]
error bar markers:
  also_called: [error caps, error end markers]
  error: [markerShow (show or hide), markerShape (shape or marker type), markerSize (size)]
error bar labels:
  also_called: [error values, upper and lower bound labels]
  error: [labelShow (show or hide), labelFontFamily (font family), labelFontSize (font size), labelBold (bold), labelItalic (italic), labelUnderline (underline), labelColor (font color), labelMatchSeriesColor (match another color), labelFormat (display units), labelBackground (show or hide), labelBackgroundColor (background color), labelBackgroundTransparency (transparency)]
error values in the tooltip:
  also_called: [error tooltip, bounds in tooltip]
  error: [tooltipShow (show or hide), tooltipFormat (label content)]
internal state that is not visible:
  also_called: [hidden property, engine setting, saved state, query option, not in the format pane]
  filters: [filteredToUniqueValue (behavior or interaction)]
annotations:
  also_called: [callouts, highlights, chart annotations]
  annotationTemplate: [callout (text content)]
```
