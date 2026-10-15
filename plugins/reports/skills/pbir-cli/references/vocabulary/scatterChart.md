# scatterChart

```yaml
number format:
  also_called: [format string, display units, decimal places, value format]
  general: [formatString (format string)]
responsive behavior:
  also_called: [responsive, auto resize, adaptive layout]
  general: [responsive (behavior or interaction), responsiveLegacy (internal value)]
the visual as a whole:
  also_called: [general, overall, entire visual, chart settings]
  general: [dataVolume (count or limit)]
  bubbles: [preventOverflow (behavior or interaction)]
  colorByCategory: [show (show or hide)]
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
x axis:
  also_called: [horizontal axis, category axis, bottom axis, x-axis]
  categoryAxis: [show (show or hide), invertAxis (orientation), axisType (scale type), axisStyle (style or theme preset), treatNullsAsZero (blank value handling)]
x axis range and scale:
  also_called: [axis min and max, axis start and end, axis scale, log scale, axis bounds, invert axis]
  categoryAxis: [start (range start or minimum), end (range end or maximum), logAxisScale (scale type), roundRange (behavior or interaction)]
x axis layout:
  also_called: [axis position, axis side, axis type, category width, concatenate labels, axis size]
  categoryAxis: [preferredCategoryWidth (width or thickness), maxMarginFactor (size)]
spacing between bars or marks:
  also_called: [gap between bars, bar width, inner padding, bar spacing, category gap, series gap, overlap]
  categoryAxis: [innerPadding (spacing or gap)]
x axis labels:
  also_called: [axis values, tick labels, axis text, axis numbers, category names on the axis]
  categoryAxis: [fontFamily (font family), fontSize (font size), bold (bold), italic (italic), underline (underline), labelColor (font color), labelDisplayUnits (display units), labelPrecision (decimal places)]
x axis title:
  also_called: [axis name, axis caption, axis heading]
  categoryAxis: [showAxisTitle (show or hide), titleText (text content), titleFontFamily (font family), titleFontSize (font size), titleBold (bold), titleItalic (italic), titleUnderline (underline), titleColor (font color)]
x axis gridlines:
  also_called: [grid lines, background lines, horizontal lines behind the bars, guide lines]
  categoryAxis: [gridlineShow (show or hide), gridlineThickness (width or thickness), gridlineColor (line color), gridlineTransparency (transparency), gridlineStyle (line style), gridlineAutoScale (behavior or interaction), gridlineDashArray (line style), gridlineDashCap (line style)]
y axis:
  also_called: [vertical axis, value axis, left axis, y-axis]
  valueAxis: [show (show or hide), invertAxis (behavior or interaction), axisStyle (line style), treatNullsAsZero (blank value handling)]
y axis range and scale:
  also_called: [axis min and max, axis start and end, axis scale, log scale, axis bounds, invert axis]
  valueAxis: [start (range start or minimum), end (range end or maximum), logAxisScale (scale type), roundRange (behavior or interaction)]
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
bubbles:
  also_called: [points, dots, scatter points, markers, circles, scatter dots]
  dataPoint: [defaultColor (fill color), showAllDataPoints (apply-to scope), fill (fill color), fillRule (color scale or gradient)]
  bubbles: [bubbleSize (size), markerRangeType (scale type), markerShape (shape or marker type), showSeries (apply-to scope)]
  fillPoint: [style (shape or marker type)]
markers on the line:
  also_called: [points, dots, data points, line markers, marker]
  markers: [transparency (transparency), rotation (angle or rotation)]
border around the bars or marks:
  also_called: [bar border, bar outline, column border, stroke around bars, mark outline, slice border]
  markers: [borderShow (show or hide), borderWidth (width or thickness), borderColorMatchFill (match another color), borderColor (border color), borderTransparency (transparency)]
  colorBorder: [show (show or hide)]
plot area:
  also_called: [chart area, chart background, area behind the bars, plot background, plot image]
  plotArea: [transparency (transparency), image (image source)]
category labels:
  also_called: [category names, labels of the categories, category text, field label]
  categoryLabels: [show (show or hide), fontFamily (font family), fontSize (font size), bold (bold), italic (italic), underline (underline), color (font color), enableBackground (show or hide), backgroundColor (background color)]
data label background:
  also_called: [label background, label box, label pill, label fill]
  categoryLabels: [backgroundTransparency (transparency)]
trend line:
  also_called: [trendline, regression line, best fit line]
  trend: [show (show or hide), width (width or thickness), lineColor (line color), transparency (transparency), style (line style), autoScale (behavior or interaction), dashArray (line style), dashCap (line style), displayName (text content), combineSeries (apply-to scope)]
constant line label:
  also_called: [reference line label, line data label, target label]
  xAxisReferenceLine: [displayName (text content), dataLabelShow (show or hide), dataLabelText (label content), dataLabelColor (font color), dataLabelDecimalPoints (decimal places), dataLabelHorizontalPosition (position), dataLabelVerticalPosition (position), dataLabelDisplayUnits (display units)]
  y1AxisReferenceLine: [displayName (text content), dataLabelShow (show or hide), dataLabelText (label content), dataLabelColor (font color), dataLabelDecimalPoints (decimal places), dataLabelHorizontalPosition (position), dataLabelVerticalPosition (position), dataLabelDisplayUnits (display units)]
  referenceLine: [displayName (text content), dataLabelShow (show or hide), dataLabelText (label content), dataLabelColor (font color), dataLabelDecimalPoints (decimal places), dataLabelHorizontalPosition (alignment), dataLabelVerticalPosition (position), dataLabelDisplayUnits (display units)]
constant line:
  also_called: [reference line, target line, threshold line, benchmark line, goal line, average line, min line, max line, median line, percentile line]
  xAxisReferenceLine: [value (value or amount), position (position), show (show or hide), width (width or thickness), lineColor (line color), transparency (transparency), style (line style), autoScale (behavior or interaction), dashArray (line style), dashCap (line style)]
  y1AxisReferenceLine: [value (value or amount), position (position), show (show or hide), width (width or thickness), lineColor (line color), transparency (transparency), style (line style), autoScale (behavior or interaction), dashArray (line style), dashCap (line style)]
  referenceLine: [value (value or amount), position (position), show (show or hide), width (width or thickness), lineColor (line color), transparency (transparency), style (line style), autoScale (behavior or interaction), dashArray (line style), dashCap (line style), shadeColorMatchStroke (match another color)]
constant line shaded region:
  also_called: [shade above the line, shade below the line, reference band, shaded region]
  xAxisReferenceLine: [shadeShow (show or hide), shadeRegion (position), shadeColor (fill color), shadeColorMatchStroke (match another color), shadeTransparency (transparency)]
  y1AxisReferenceLine: [shadeShow (show or hide), shadeRegion (position), shadeColor (fill color), shadeColorMatchStroke (match another color), shadeTransparency (transparency)]
  referenceLine: [shadeShow (show or hide), shadeRegion (position), shadeColor (fill color), shadeTransparency (transparency)]
play axis:
  also_called: [animation frame, play slider, current frame]
  currentFrameIndex: [index (internal value)]
internal state that is not visible:
  also_called: [hidden property, engine setting, saved state, query option, not in the format pane]
  clustering: [transform (behavior or interaction)]
symmetry shading:
  also_called: [plot area shading, upper and lower shading, shaded halves of the scatter plot]
  plotAreaShading: [show (show or hide), displayName (text content), upperShadingColor (fill color), lowerShadingColor (fill color), transparency (transparency)]
ratio line:
  also_called: [diagonal line, y over x line, ratio reference line]
  ratioLine: [displayName (text content), show (show or hide), width (width or thickness), lineColor (line color), transparency (transparency), style (line style), autoScale (behavior or interaction), dashArray (line style), dashCap (line style)]
```
