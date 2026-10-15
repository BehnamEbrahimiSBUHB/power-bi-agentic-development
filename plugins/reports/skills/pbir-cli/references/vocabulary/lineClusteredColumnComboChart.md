# lineClusteredColumnComboChart

```yaml
number format:
  also_called: [format string, display units, decimal places, value format]
  general: [formatString (format string)]
the visual as a whole:
  also_called: [general, overall, entire visual, chart settings]
  general: [visualType1 (shape or marker type), visualType2 (shape or marker type)]
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
legend markers:
  also_called: [legend icons, legend symbols, legend swatches]
  legend: [legendMarkerRendering (shape or marker type), matchLineColor (match another color)]
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
  categoryAxis: [axisType (scale type), preferredCategoryWidth (width or thickness), maxMarginFactor (size)]
spacing between bars or marks:
  also_called: [gap between bars, bar width, inner padding, bar spacing, category gap, series gap, overlap]
  categoryAxis: [innerPadding (spacing or gap)]
  layout: [clusteredGapSize (spacing or gap), clusteredGapOverlaps (layout or arrangement), clusteredGapOverlapReverse (layout or arrangement)]
x axis labels:
  also_called: [axis values, tick labels, axis text, axis numbers, category names on the axis]
  categoryAxis: [concatenateLabels (behavior or interaction), fontFamily (font family), fontSize (font size), bold (bold), italic (italic), underline (underline), labelColor (font color), labelDisplayUnits (display units), labelPrecision (decimal places)]
x axis range and scale:
  also_called: [axis min and max, axis start and end, axis scale, log scale, axis bounds, invert axis]
  categoryAxis: [start (range start or minimum), end (range end or maximum), logAxisScale (scale type), roundRange (behavior or interaction)]
x axis gridlines:
  also_called: [grid lines, background lines, horizontal lines behind the bars, guide lines]
  categoryAxis: [gridlineShow (show or hide), gridlineThickness (width or thickness), gridlineColor (line color), gridlineTransparency (transparency), gridlineStyle (line style), gridlineAutoScale (behavior or interaction), gridlineDashArray (line style), gridlineDashCap (line style)]
x axis title:
  also_called: [axis name, axis caption, axis heading]
  categoryAxis: [showAxisTitle (show or hide), titleText (text content), titleFontFamily (font family), titleFontSize (font size), titleBold (bold), titleItalic (italic), titleUnderline (underline), titleColor (font color)]
series stacking order:
  also_called: [stack order, series sort, reverse stack]
  categoryAxis: [reverseStackOrder (layout or arrangement)]
  layout: [seriesOrderReversed (layout or arrangement), seriesOrderSorted (layout or arrangement)]
y axis:
  also_called: [vertical axis, value axis, left axis, y-axis]
  valueAxis: [show (show or hide), invertAxis (behavior or interaction), sharedAxis (behavior or interaction), axisStyle (line style), secAxisStyle (style or theme preset), secShow (show or hide)]
y axis range and scale:
  also_called: [axis min and max, axis start and end, axis scale, log scale, axis bounds, invert axis]
  valueAxis: [start (range start or minimum), end (range end or maximum), logAxisScale (scale type), roundRange (behavior or interaction), scaleToFit (behavior or interaction), alignZeros (behavior or interaction)]
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
secondary axis range and scale:
  also_called: [right axis min and max, secondary axis scale]
  valueAxis: [secLogAxisScale (scale type), secStart (range start or minimum), secEnd (range end or maximum), secRoundRange (behavior or interaction)]
secondary axis title:
  also_called: [right axis title, second axis name]
  valueAxis: [secAxisLabel (text content), secShowAxisTitle (show or hide), secTitleColor (font color), secTitleFontFamily (font family), secTitleFontSize (font size), secTitleBold (bold), secTitleItalic (italic), secTitleUnderline (underline), secTitleText (text content)]
secondary axis labels:
  also_called: [right axis values, secondary axis text, second axis numbers]
  valueAxis: [secLabelColor (font color), secFontFamily (font family), secFontSize (font size), secBold (bold), secItalic (italic), secUnderline (underline), secLabelDisplayUnits (display units), secLabelPrecision (decimal places)]
zoom slider:
  also_called: [zoom bar, axis slider, range slider on the axis, scroll zoom]
  zoom: [show (show or hide), showOnCategoryAxis (show or hide), categoryMin (range start or minimum), categoryMax (range end or maximum), categorySize (size), showOnValueAxis (show or hide), valueMin (range start or minimum), valueMax (range end or maximum), valueSize (width or thickness), showLabels (show or hide), showTooltip (show or hide), showOnValueSecAxis (show or hide), valueSecMin (range start or minimum), valueSecMax (range end or maximum), valueSecSize (size)]
columns:
  also_called: [vertical bars, bars, column, the columns, pillars]
  dataPoint: [defaultColor (fill color), fill (fill color), fillRule (color scale or gradient), fillTransparency (transparency)]
border around the bars or marks:
  also_called: [bar border, bar outline, column border, stroke around bars, mark outline, slice border]
  dataPoint: [borderShow (show or hide), borderSize (width or thickness), borderColorMatchFill (match another color), borderColor (border color), borderTransparency (transparency)]
  markers: [borderShow (show or hide), borderWidth (width or thickness), borderColorMatchFill (match another color), borderColor (border color), borderTransparency (transparency)]
shaded area under the line:
  also_called: [area, area fill, fill under line, shading, area shade]
  dataPoint: [transparency (transparency)]
  lineStyles: [areaShow (show or hide), areaColor (fill color)]
lines:
  also_called: [line, series line, trend lines, the line, stroke, curve]
  lineStyles: [strokeShow (show or hide), strokeWidth (width or thickness), strokeTransparency (transparency), lineStyle (line style), strokeAutoScale (behavior or interaction), strokeDashArray (line style), strokeDashCap (line style), strokeLineJoin (line style), showSeries (apply-to scope), lineChartType (line interpolation), interpolationStep (line interpolation), interpolationSmooth (line interpolation), interpolationSmoothParam (line interpolation)]
markers on the line:
  also_called: [points, dots, data points, line markers, marker]
  lineStyles: [showMarker (show or hide), markerShape (shape or marker type), markerSize (size), markerColor (fill color), showMarkerByDefault (show or hide), areaMatchStrokeColor (match another color)]
  markers: [transparency (transparency), rotation (angle or rotation)]
data labels:
  also_called: [labels, values on the bars, numbers on the chart, value labels, bar labels, point labels]
  labels: [show (show or hide), showByDefault (show or hide), showSeries (show or hide), showAll (apply-to scope), labelPosition (position), labelDensity (spacing or gap), optimizeLabelDisplay (behavior or interaction), labelContainerMaxWidth (width or thickness), labelOrientation (orientation), showDynamicLabels (behavior or interaction), fontFamily (font family), fontSize (font size), bold (bold), italic (italic), underline (underline), color (font color), transparency (transparency), showBlankAs (blank value handling), labelContentLayout (layout or arrangement)]
data label background:
  also_called: [label background, label box, label pill, label fill]
  labels: [enableBackground (show or hide), backgroundColor (background color), backgroundTransparency (transparency)]
  seriesLabels: [enableBackground (show or hide), backgroundColor (background color), backgroundTransparency (transparency), backgroundMatchColor (match another color)]
data label value:
  also_called: [label value, value part of the label, the number in the label]
  labels: [dynamicLabelValue (data field binding), valueFormatString (format string), enableValueDataLabel (show or hide), labelDisplayUnits (display units), valueCustomFormatString (format string), labelPrecision (decimal places), titleLabelDisplayUnits (display units), titleLabelPrecision (decimal places)]
data label title:
  also_called: [label title, label header, series name in the label]
  labels: [dynamicLabelTitle (data field binding), titleFormatString (format string), enableTitleDataLabel (show or hide), titleContentType (label content), titleFontFamily (font family), titleFontSize (font size), titleBold (bold), titleItalic (italic), titleUnderline (underline), titleColor (font color), titleTransparency (transparency), titleShowBlankAs (blank value handling)]
data label detail:
  also_called: [detail label, second value in the label, label detail, extra label measure]
  labels: [dynamicLabelDetail (data field binding), detailFormatString (format string), enableDetailDataLabel (show or hide), detailContentType (label content), detailFontFamily (font family), detailFontSize (font size), detailBold (bold), detailItalic (italic), detailUnderline (underline), detailColor (font color), detailTransparency (transparency), detailLabelDisplayUnits (display units), detailCustomFormatString (format string), detailLabelPrecision (decimal places), detailShowBlankAs (blank value handling)]
callout value:
  also_called: [big number, main value, kpi value, headline number, card value, the number]
  labels: [titleCustomFormatString (format string)]
series labels:
  also_called: [line end labels, series names next to the lines, direct labels, inline legend]
  seriesLabels: [show (show or hide), showByDefault (show or hide), seriesColor (font color), seriesMatchColor (match another color), seriesTransparency (transparency), seriesPosition (position), showAll (apply-to scope), textSize (font size), bold (bold), italic (italic), underline (underline), seriesFontFamily (font family), seriesWordWrap (word wrap), seriesMaximumWidth (width or thickness), maximumOffset (spacing or gap)]
leader lines:
  also_called: [label connector lines, callout lines, lines from label to point]
  seriesLabels: [leaderLines (show or hide), leaderLineWidth (width or thickness), leaderLineColor (line color), leaderLineTransparency (transparency), leaderLinePattern (line style), leaderLineAutoScale (behavior or interaction), leaderLineDashArray (line style), leaderLineDashCap (line style)]
error bars:
  also_called: [whiskers, error lines, uncertainty bars, confidence bars, error caps]
  error: [enabled (show or hide), errorRange (data field binding), barShow (show or hide), barMatchSeriesColor (match another color), barColor (fill color), barWidth (width or thickness), barBorderColor (border color), barBorderSize (width or thickness)]
error band:
  also_called: [error shading, uncertainty band, shaded error area]
  error: [shadeShow (show or hide), shadeBandStyle (line style), shadeColor (background color), shadeMatchSeriesColor (match another color), shadeTransparency (transparency)]
error bar markers:
  also_called: [error caps, error end markers]
  error: [markerShape (shape or marker type), showMarkerByDefault (show or hide), markerShow (show or hide), markerSize (size)]
error bar labels:
  also_called: [error values, upper and lower bound labels]
  error: [labelShow (show or hide), labelFontFamily (font family), labelFontSize (font size), labelBold (bold), labelItalic (italic), labelUnderline (underline), labelColor (font color), labelMatchSeriesColor (match another color), labelFormat (display units), labelBackground (show or hide), labelBackgroundColor (background color), labelBackgroundTransparency (transparency)]
error values in the tooltip:
  also_called: [error tooltip, bounds in tooltip]
  error: [tooltipShow (show or hide), tooltipFormat (label content)]
plot area:
  also_called: [chart area, chart background, area behind the bars, plot background, plot image]
  plotArea: [transparency (transparency), image (image source)]
internal state that is not visible:
  also_called: [hidden property, engine setting, saved state, query option, not in the format pane]
  filters: [filteredToUniqueValue (behavior or interaction)]
constant line label:
  also_called: [reference line label, line data label, target label]
  xAxisReferenceLine: [displayName (text content), dataLabelShow (show or hide), dataLabelText (label content), dataLabelColor (font color), dataLabelDecimalPoints (decimal places), dataLabelHorizontalPosition (position), dataLabelVerticalPosition (position), dataLabelDisplayUnits (display units)]
  y1AxisReferenceLine: [displayName (text content), dataLabelShow (show or hide), dataLabelText (label content), dataLabelColor (font color), dataLabelDecimalPoints (decimal places), dataLabelHorizontalPosition (position), dataLabelVerticalPosition (position), dataLabelDisplayUnits (display units)]
  referenceLine: [displayName (text content), dataLabelShow (show or hide), dataLabelText (label content), dataLabelColor (font color), dataLabelDecimalPoints (decimal places), dataLabelHorizontalPosition (position), dataLabelVerticalPosition (position), dataLabelDisplayUnits (display units)]
constant line:
  also_called: [reference line, target line, threshold line, benchmark line, goal line, average line, min line, max line, median line, percentile line]
  xAxisReferenceLine: [value (value or amount), position (position), show (show or hide), width (width or thickness), lineColor (line color), transparency (transparency), style (line style), autoScale (behavior or interaction), dashArray (line style), dashCap (line style)]
  y1AxisReferenceLine: [value (value or amount), position (position), show (show or hide), width (width or thickness), lineColor (line color), transparency (transparency), style (line style), autoScale (behavior or interaction), dashArray (line style), dashCap (line style)]
  referenceLine: [value (value or amount), position (position), show (show or hide), width (width or thickness), lineColor (line color), transparency (transparency), style (line style), autoScale (behavior or interaction), dashArray (line style), dashCap (line style)]
constant line shaded region:
  also_called: [shade above the line, shade below the line, reference band, shaded region]
  xAxisReferenceLine: [shadeShow (show or hide), shadeRegion (position), shadeColor (fill color), shadeColorMatchStroke (match another color), shadeTransparency (transparency)]
  y1AxisReferenceLine: [shadeShow (show or hide), shadeRegion (position), shadeColor (fill color), shadeColorMatchStroke (match another color), shadeTransparency (transparency)]
  referenceLine: [shadeShow (show or hide), shadeRegion (position), shadeColor (fill color), shadeColorMatchStroke (match another color), shadeTransparency (transparency)]
trend line:
  also_called: [trendline, regression line, best fit line]
  trend: [show (show or hide), width (width or thickness), lineColor (line color), transparency (transparency), style (line style), autoScale (behavior or interaction), dashArray (line style), dashCap (line style), displayName (text content), combineSeries (behavior or interaction), useHighlightValues (behavior or interaction)]
annotations:
  also_called: [callouts, highlights, chart annotations]
  annotationTemplate: [callout (text content)]
```
