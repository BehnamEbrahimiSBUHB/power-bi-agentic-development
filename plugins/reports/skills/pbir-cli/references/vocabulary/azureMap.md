# azureMap

```yaml
number format:
  also_called: [format string, display units, decimal places, value format]
  general: [formatString (format string)]
legend:
  also_called: [key, series key, color key, legend box]
  legend: [show (show or hide), position (position)]
legend title:
  also_called: [legend name, legend heading]
  legend: [showTitle (show or hide), titleText (text content)]
legend text:
  also_called: [legend labels, legend entries, legend items]
  legend: [fontFamily (font family), fontSize (font size), bold (bold), italic (italic), underline (underline), labelColor (font color)]
map bubbles:
  also_called: [bubbles, circles on the map, map points, pins, map markers, map dots]
  dataPoint: [showAllDataPoints (apply-to scope), fill (fill color)]
  bubbleLayer: [show (show or hide), mapTransparency (transparency), bubbleRadius (size), minBubbleRadius (size), markerRangeType (scale type), radiusScalingMethod (scale type), maxRadius (size), logScale (size), x2 (position), pitchAlignment (orientation), zoomScaleFactor (size), minZoom (geographic or zoom setting), maxZoom (geographic or zoom setting), layerPosition (position), fillColor (fill color), matchFillColor (match another color), scale (size), minScale (range start or minimum), maxScale (size), markerType (shape or marker type), imageSourceType (image source), imageData (image source), imageUrl (URL or link), iconId (shape or marker type), markerRotation (angle or rotation), rotationAlignment (orientation), borderShow (show or hide), sizeByValue (behavior or interaction), minDataScalingRange (range start or minimum), maxDataScalingRange (range end or maximum)]
  commonDataOptions: [unselectedTransparency (transparency), showZeros (show or hide), showNegatives (show or hide), minDataValue (range start or minimum), maxDataValue (range end or maximum)]
data labels:
  also_called: [labels, values on the bars, numbers on the chart, value labels, bar labels, point labels]
  labels: [show (show or hide), color (font color)]
data label value:
  also_called: [label value, value part of the label, the number in the label]
  labels: [labelDisplayUnits (display units), labelPrecision (decimal places)]
base map:
  also_called: [map background, map style, map theme, basemap]
  mapControls: [defaultStyle (style or theme preset), showLabels (show or hide), showCountryRegionBorders (show or hide), showAdminDistrictBorders (show or hide), showAdminDistrict2Borders (show or hide), showBuildingFootprints (show or hide), showRoadDetails (show or hide)]
map controls:
  also_called: [zoom buttons, map navigation, map toolbar, map settings, lasso]
  mapControls: [showStylePicker (show or hide), showNavigationControls (show or hide), showSelectionControl (show or hide)]
map camera view:
  also_called: [map zoom, map center, pitch, heading, map position]
  mapControls: [zoom (geographic or zoom setting), centerLatitude (geographic or zoom setting), centerLongitude (geographic or zoom setting), heading (angle or rotation), pitch (angle or rotation), autoZoom (behavior or interaction), autoZoomIncludesReferenceLayer (behavior or interaction), worldWrap (behavior or interaction)]
internal state that is not visible:
  also_called: [hidden property, engine setting, saved state, query option, not in the format pane]
  mapControls: [geocodingCulture (behavior or interaction)]
  bubbleLayer: [x1 (line interpolation), y1 (line interpolation), y2 (line interpolation)]
map regions:
  also_called: [filled areas, shapes, countries, states, polygons, choropleth areas, territories]
  filledMap: [show (show or hide), defaultColor (fill color), mapTransparency (transparency), minZoom (geographic or zoom setting), maxZoom (geographic or zoom setting), layerPosition (position)]
border around the bars or marks:
  also_called: [bar border, bar outline, column border, stroke around bars, mark outline, slice border]
  filledMap: [strokeColor (border color), autoStrokeColor (behavior or interaction), matchFillColor (match another color), strokeTransparency (transparency), strokeWidth (width or thickness), borderShow (show or hide)]
  bubbleLayer: [strokeColor (border color), autoStrokeColor (match another color), strokeTransparency (transparency), bubbleStrokeWidth (width or thickness), blur (shadow or glow effect)]
clustered map bubbles:
  also_called: [clusters, bubble clusters, grouped bubbles]
  bubbleLayer: [clusteredBubbleFontSize (font size), clusteredBubbleStrokeColor (border color), clusteringEnabled (behavior or interaction), clusteredBubbleRadius (size), clusteredBubbleFillColor (fill color), clusteredBubbleTransparency (transparency), clusteredBubbleFontColor (font color), clusteredBubbleStrokeWidth (width or thickness), clusteredBubbleAutoStrokeColor (match another color), clusteredBubbleMatchFillColor (match another color), clusteredBubbleStrokeTransparency (transparency), clusteredBubbleBorderShow (show or hide)]
category labels:
  also_called: [category names, labels of the categories, category text, field label]
  categoryLabels: [show (show or hide), fontFamily (font family), fontSize (font size), bold (bold), italic (italic), underline (underline), color (font color)]
data label background:
  also_called: [label background, label box, label pill, label fill]
  categoryLabels: [enableBackground (show or hide), backgroundColor (background color), backgroundTransparency (transparency)]
heat map layer:
  also_called: [heat map, heat spots, density layer, hot spots]
  heatMapLayer: [show (show or hide), heatMapRadius (size), heatMapRadiusUnit (display units), mapTransparency (transparency), heatMapIntensity (value or amount), heatMapColorLow (color scale or gradient), heatMapColorCenter (color scale or gradient), heatMapColorHigh (color scale or gradient), heatMapUseSize (behavior or interaction), minZoom (geographic or zoom setting), maxZoom (geographic or zoom setting), layerPosition (position), minDataScalingRange (range start or minimum), maxDataScalingRange (range end or maximum)]
3D map columns:
  also_called: [3D bars, map bars, 3D column layer, extruded bars]
  barChart: [show (show or hide), showModern (show or hide), barShape (shape or marker type), barHeight (height), heightPixels (height), heightMeters (height), scaleHeightOnZoom (behavior or interaction), thickness (width or thickness), widthPixels (width or thickness), widthMeters (width or thickness), scaleThicknessOnZoom (behavior or interaction), defaultColor (fill color), mapTransparency (transparency), minZoom (geographic or zoom setting), maxZoom (geographic or zoom setting), layerPosition (position), heightUnit (display units), widthUnit (display units), minimumHeightPixels (height), maximumHeightPixels (height), minimumHeightMeters (height), maximumHeightMeters (height), heightByValue (behavior or interaction), widthByValue (behavior or interaction), minimumWidthPixels (width or thickness), maximumWidthPixels (width or thickness), minimumWidthMeters (width or thickness), maximumWidthMeters (width or thickness), minDataScalingRange (range start or minimum), maxDataScalingRange (range end or maximum)]
map reference layer:
  also_called: [reference layer, geojson overlay, custom shapes overlay]
  referenceLayer: [additionalDatasource (data field binding), bubbleFillColor (fill color), bubbleStrokeColor (border color), bubbleStrokeWidth (width or thickness), bubbleStrokeTransparency (transparency), polygonFillColor (fill color), polygonStrokeColor (border color), polygonStrokeWidth (width or thickness), polygonStrokeTransparency (transparency), lineStrokeColor (line color), lineStrokeWidth (width or thickness), lineStrokeTransparency (transparency), unmappedObjectVisibility (show or hide), unmappedObjectUseCustomColors (behavior or interaction), unmappedObjectFillColor (fill color), unmappedObjectStrokeColor (border color), datasourceType (image source), referenceLayerUrl (URL or link), show (show or hide)]
traffic layer:
  also_called: [traffic, traffic overlay, incidents]
  traffic: [show (show or hide), showIncidents (show or hide), showTrafficControl (show or hide)]
map tile layer:
  also_called: [tile layer, custom base map, map tiles]
  tileLayer: [tileLayerUrl (URL or link), tileSize (size), northBounds (geographic or zoom setting), southBounds (geographic or zoom setting), eastBounds (geographic or zoom setting), westBounds (geographic or zoom setting), mapTransparency (transparency), isTMS (behavior or interaction), minZoom (range start or minimum), maxZoom (range end or maximum), layerPosition (position), show (show or hide), tileSizeDropdown (size)]
map paths:
  also_called: [path layer, routes, lines on the map]
  pathLayer: [color (line color), strokeWidth (width or thickness), strokeTransparency (transparency), minZoom (range start or minimum), maxZoom (range end or maximum), show (show or hide)]
```
