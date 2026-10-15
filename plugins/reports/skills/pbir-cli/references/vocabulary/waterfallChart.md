# waterfallChart

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
x axis:
  also_called: [horizontal axis, category axis, bottom axis, x-axis]
  categoryAxis: [show (show or hide), axisStyle (line style)]
x axis layout:
  also_called: [axis position, axis side, axis type, category width, concatenate labels, axis size]
  categoryAxis: [preferredCategoryWidth (width or thickness), maxMarginFactor (size)]
spacing between bars or marks:
  also_called: [gap between bars, bar width, inner padding, bar spacing, category gap, series gap, overlap]
  categoryAxis: [innerPadding (spacing or gap)]
x axis labels:
  also_called: [axis values, tick labels, axis text, axis numbers, category names on the axis]
  categoryAxis: [fontFamily (font family), fontSize (font size), bold (bold), italic (italic), underline (underline), labelColor (font color)]
x axis title:
  also_called: [axis name, axis caption, axis heading]
  categoryAxis: [showAxisTitle (show or hide), titleText (text content), titleFontFamily (font family), titleFontSize (font size), titleBold (bold), titleItalic (italic), titleUnderline (underline), titleColor (font color)]
y axis:
  also_called: [vertical axis, value axis, left axis, y-axis]
  valueAxis: [show (show or hide), invertAxis (orientation), axisStyle (line style), totalsEnabled (show or hide)]
y axis range and scale:
  also_called: [axis min and max, axis start and end, axis scale, log scale, axis bounds, invert axis]
  valueAxis: [start (range start or minimum), end (range end or maximum), roundRange (behavior or interaction)]
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
data labels:
  also_called: [labels, values on the bars, numbers on the chart, value labels, bar labels, point labels]
  labels: [show (show or hide), fontFamily (font family), fontSize (font size), bold (bold), italic (italic), underline (underline), color (font color), labelOrientation (orientation), labelPosition (position)]
data label value:
  also_called: [label value, value part of the label, the number in the label]
  labels: [labelDisplayUnits (display units), labelPrecision (decimal places)]
data label background:
  also_called: [label background, label box, label pill, label fill]
  labels: [enableBackground (show or hide), backgroundColor (background color), backgroundTransparency (transparency)]
plot area:
  also_called: [chart area, chart background, area behind the bars, plot background, plot image]
  plotArea: [transparency (transparency), image (image source)]
increase bars:
  also_called: [positive bars, bars going up, gains, green bars, increase columns]
  sentimentColors: [increaseFill (fill color)]
decrease bars:
  also_called: [negative bars, bars going down, losses, red bars, decrease columns]
  sentimentColors: [decreaseFill (fill color)]
total bars:
  also_called: [totals, total column, sum bar, end bar, subtotal bars]
  sentimentColors: [totalFill (fill color)]
other bars:
  also_called: [other column, remainder bar, other breakdown bar]
  sentimentColors: [otherFill (fill color)]
constant line label:
  also_called: [reference line label, line data label, target label]
  y1AxisReferenceLine: [displayName (text content), dataLabelShow (show or hide), dataLabelText (label content), dataLabelColor (font color), dataLabelDecimalPoints (decimal places), dataLabelHorizontalPosition (alignment), dataLabelVerticalPosition (position), dataLabelDisplayUnits (display units)]
constant line:
  also_called: [reference line, target line, threshold line, benchmark line, goal line, average line, min line, max line, median line, percentile line]
  y1AxisReferenceLine: [value (value or amount), position (position), show (show or hide), width (width or thickness), lineColor (line color), transparency (transparency), style (line style), autoScale (behavior or interaction), dashArray (line style), dashCap (line style)]
constant line shaded region:
  also_called: [shade above the line, shade below the line, reference band, shaded region]
  y1AxisReferenceLine: [shadeShow (show or hide), shadeRegion (position), shadeColor (fill color), shadeColorMatchStroke (match another color), shadeTransparency (transparency)]
breakdown bars:
  also_called: [breakdowns, breakdown categories, number of breakdowns]
  breakdown: [maxBreakdowns (count or limit)]
```
