# cardVisual

```yaml
accent bar:
  also_called: [colored side bar, left stripe, side line, accent line, color strip]
  accentBar: [show (show or hide), position (position), color (fill color), transparency (transparency), width (width or thickness)]
card border:
  also_called: [card outline, border around the card, card stroke, card frame]
  border: [show (show or hide), width (width or thickness), color (border color), transparency (transparency), style (line style)]
  layout: [rectangleRoundedCurveLeftTop (corner radius), rectangleRoundedCurveRightTop (corner radius), rectangleRoundedCurveLeftBottom (corner radius), rectangleRoundedCurveRightBottom (corner radius), borderWidth (width or thickness), borderColor (border color), borderTransparency (transparency), borderStyle (line style)]
  outline: [show (show or hide), lineColor (border color), transparency (transparency), weight (width or thickness)]
callout area:
  also_called: [callout background, area behind the big number, callout box, callout section]
  cardCalloutArea: [paddingUniform (padding or margin), paddingIndividual (layout or arrangement), paddingLeft (padding or margin), paddingRight (padding or margin), paddingTop (padding or margin), paddingBottom (padding or margin), rectangleRoundedCurve (corner radius), rectangleRoundedCurveCustomStyle (behavior or interaction), rectangleRoundedCurveLeftBottom (corner radius), rectangleRoundedCurveLeftTop (corner radius), rectangleRoundedCurveRightBottom (corner radius), rectangleRoundedCurveRightTop (corner radius), show (show or hide), backgroundFillColor (fill color), backgroundTransparency (transparency)]
  layout: [calloutSize (size)]
card image:
  also_called: [image on the card, card picture, logo, hero image, card icon image]
  cardImage: [show (show or hide), altText (text content), image (image source), imageBlur (image effect), imageContrast (image effect), imageData (image source), imageDataFit (image fit), imageEffects (behavior or interaction), imageExposure (image effect), imageHeight (height), imageSaturation (image effect), imageTransparency (transparency), imageType (image source), imageUrl (URL or link), imageUrlFit (image fit), paddingUniform (padding or margin), paddingIndividual (layout or arrangement), paddingLeft (padding or margin), paddingRight (padding or margin), paddingTop (padding or margin), paddingBottom (padding or margin), rectangleRoundedCurve (corner radius), rectangleRoundedCurveCustomStyle (behavior or interaction), rectangleRoundedCurveLeftBottom (corner radius), rectangleRoundedCurveLeftTop (corner radius), rectangleRoundedCurveRightBottom (corner radius), rectangleRoundedCurveRightTop (corner radius)]
  image: [imageAreaSize (size)]
the visual as a whole:
  also_called: [general, overall, entire visual, chart settings]
  cardImage: [addBackground (show or hide), backgroundFillColor (fill color), backgroundTransparency (transparency)]
  grid: [show (show or hide), width (width or thickness), color (fill color)]
  layout: [style (layout or arrangement), fixedHeight (height), fixedWidth (width or thickness), showFixedSize (show or hide)]
  rotation: [angle (angle or rotation)]
divider:
  also_called: [divider line, separator, line between callout and reference labels, rule]
  divider: [show (show or hide), dividerWidth (width or thickness), dividerColor (line color), dividerTransparency (transparency), dividerLineStyle (line style), dividerIgnorePadding (behavior or interaction)]
  referenceLabelLayout: [paddingBeforeDivider (padding or margin), paddingAfterDivider (padding or margin)]
card fill:
  also_called: [card background, card color, card fill image, background of each card]
  fillCustom: [show (show or hide), fillColor (fill color), transparency (transparency), image (image source), imageTransparency (transparency), imageSplitTransparency (behavior or interaction), imageBlur (image effect), imageContrast (image effect), imageData (image source), imageEffects (behavior or interaction), imageExposure (image effect), imageFit (image fit), imageHeight (height), imageSaturation (image effect), imageShow (show or hide), imageType (image source), imageUrl (URL or link)]
  layout: [backgroundTransparency (transparency), backgroundShow (show or hide), backgroundImage (image source), backgroundImageTransparency (transparency), backgroundImageBlur (image effect), backgroundImageContrast (image effect), backgroundImageData (image source), backgroundImageEffects (behavior or interaction), backgroundImageExposure (image effect), backgroundImageFit (image fit), backgroundImageHeight (height), backgroundImageSaturation (image effect), backgroundImageShow (show or hide), backgroundImageType (image source), backgroundImageUrl (URL or link)]
number format:
  also_called: [format string, display units, decimal places, value format]
  general: [formatString (format string), applyFormattingNullSelectorDefaults (blank value handling)]
card glow:
  also_called: [glow, outer glow, halo]
  glowCustom: [show (show or hide), color (fill color), transparency (transparency), shadowBlur (shadow or glow effect), glowPositionPreset (shadow or glow effect), angle (angle or rotation), glowDistance (shadow or glow effect), position (position), glowSpread (size)]
horizontal gridlines:
  also_called: [row lines, lines between rows, row borders, horizontal grid]
  grid: [transparency (transparency), style (line style)]
image:
  also_called: [picture, photo, logo, graphic]
  image: [show (show or hide), imageType (image source), image (image source), imageUrl (URL or link), imageData (image source), fit (image fit), imageEffects (behavior or interaction), blur (image effect), contrast (image effect), exposure (image effect), saturation (image effect), transparency (transparency), position (position), padding (padding or margin), size (size), altText (text content), fixedSize (behavior or interaction), verticalAlignment (alignment), horizontalAlignment (alignment), rectangleRoundedCurve (corner radius), rectangleRoundedCurveCustomStyle (behavior or interaction), rectangleRoundedCurveLeftBottom (corner radius), rectangleRoundedCurveLeftTop (corner radius), rectangleRoundedCurveRightBottom (corner radius), rectangleRoundedCurveRightTop (corner radius)]
callout label:
  also_called: [label under the number, card label, measure name, value caption, category label]
  label: [show (show or hide), text (text content), heading (label content), fontFamily (font family), fontSize (font size), bold (bold), italic (italic), underline (underline), fontColor (font color), position (position), transparency (transparency), textWrap (word wrap), alignBaselines (layout or arrangement), matchValueAlignment (behavior or interaction), horizontalAlignment (alignment)]
cards layout:
  also_called: [card arrangement, cards grid, number of cards, card order, space between cards, rows and columns of cards]
  layout: [alignment (alignment), orientation (orientation), rowCount (count or limit), columnCount (count or limit), maxTiles (count or limit), cellPadding (spacing or gap), customizePadding (show or hide), rowPadding (spacing or gap), columnPadding (spacing or gap), contentOrder (layout or arrangement), collage (layout or arrangement), autoGrid (layout or arrangement)]
  smallMultiplesLayout: [fixNumberOfTiles (layout or arrangement)]
container behind all the cards:
  also_called: [outer background, grid background, cards backdrop, container shape, container border]
  layout: [backgroundFillColor (background color), rectangleRoundedCurve (corner radius), rectangleRoundedCurveCustomStyle (apply-to scope)]
small multiples gridlines:
  also_called: [lines between small multiples, panel borders, facet dividers]
  layout: [customizeLines (show or hide), lineWidth (width or thickness), lineColor (line color), lineTransparency (transparency), lineStyle (line style), gridlineWidth (width or thickness), gridlineColor (line color), gridlineTransparency (transparency), gridlineStyle (line style)]
  smallMultiplesGrid: [gridlineShow (show or hide), gridlineWidth (width or thickness), gridlineColor (line color), gridlineTransparency (transparency), gridlineStyle (line style), gridlineRegion (which sides are drawn)]
card padding:
  also_called: [inner spacing, margins inside the card, padding]
  layout: [leftOuterMargin (padding or margin), rightOuterMargin (padding or margin), topOuterMargin (padding or margin), bottomOuterMargin (padding or margin), paddingUniform (padding or margin), paddingIndividual (layout or arrangement)]
  padding: [paddingSelection (size), leftMargin (padding or margin), rightMargin (padding or margin), topMargin (padding or margin), bottomMargin (padding or margin), paddingUniform (padding or margin), paddingIndividual (behavior or interaction)]
card overflow:
  also_called: [scrolling, paging, overflow style, continuous scroll]
  overFlow: [overFlowStyle (behavior or interaction), overFlowDirection (orientation)]
reference labels:
  also_called: [reference label section, comparison values, secondary values, supporting measures, sub values]
  referenceLabel: [value (text content), formatString (format string), paddingUniform (padding or margin), paddingIndividual (layout or arrangement), paddingLeft (padding or margin), paddingRight (padding or margin), paddingTop (padding or margin), paddingBottom (padding or margin)]
reference label background:
  also_called: [reference section background, reference area fill]
  referenceLabel: [backgroundColor (background color), backgroundTransparency (transparency), backgroundShow (show or hide), rectangleRoundedCurve (corner radius), rectangleRoundedCurveCustomStyle (behavior or interaction), rectangleRoundedCurveLeftBottom (corner radius), rectangleRoundedCurveLeftTop (corner radius), rectangleRoundedCurveRightBottom (corner radius), rectangleRoundedCurveRightTop (corner radius)]
reference label detail:
  also_called: [reference detail, variance detail, delta, third line of the reference label]
  referenceLabelDetail: [show (show or hide), detailFontColor (font color), detailFontSize (font size), detailFontFamily (font family), detailUnderline (underline), detailBold (bold), detailItalic (italic), detailTransparency (transparency), detailPrecision (decimal places), detailDisplayUnits (display units), showBlankAs (blank value handling), detailValue (data field binding), formatString (format string), detailBackgroundColor (background color), customFormatString (format string), textWrap (word wrap)]
reference label layout:
  also_called: [reference labels arrangement, reference labels position, space between reference labels]
  referenceLabelLayout: [position (position), arrangement (layout or arrangement), style (style or theme preset), horizontalAlignment (alignment), verticalAlignment (alignment), valueArea (value or amount), labelSpace (spacing or gap), outerPadding (padding or margin), customizePadding (show or hide)]
reference label title:
  also_called: [reference title, comparison title, secondary label name]
  referenceLabelTitle: [show (show or hide), titleText (text content), titleFontSize (font size), titleFontFamily (font family), titleUnderline (underline), titleItalic (italic), titleBold (bold), titleFontColor (font color), titleTransparency (transparency), titleContentType (label content), textWrap (word wrap)]
reference label value:
  also_called: [reference value, comparison number, secondary number]
  referenceLabelValue: [show (show or hide), valueFontColor (font color), valueFontSize (font size), valueFontFamily (font family), valueUnderline (underline), valueBold (bold), valueItalic (italic), valueTransparency (transparency), valuePrecision (decimal places), valueDisplayUnits (display units), showBlankAs (blank value handling), customFormatString (format string), textWrap (word wrap)]
rotation:
  also_called: [rotate, angle, tilt, text rotation]
  rotation: [shapeAngle (angle or rotation), textAngle (angle or rotation)]
card shadow:
  also_called: [drop shadow, shadow, elevation]
  shadowCustom: [show (show or hide), color (fill color), transparency (transparency), shadowBlur (shadow or glow effect), shadowPositionPreset (shadow or glow effect), angle (angle or rotation), shadowDistance (shadow or glow effect), position (position), shadowSpread (size)]
card shape:
  also_called: [rounded corners, corner radius, card corners, snipped corners]
  shapeCustomRectangle: [tileShape (shape or marker type), rectangleRoundedCurve (corner radius), rectangleRoundedCurveCustomStyle (show or hide), rectangleRoundedCurveLeftTop (corner radius), rectangleRoundedCurveRightTop (corner radius), rectangleRoundedCurveLeftBottom (corner radius), rectangleRoundedCurveRightBottom (corner radius), tabCutCornerSnipSizeTop (corner radius), tabCutCornerSnipSizeCustomStyle (show or hide), tabCutCornerSnipSizeLeftTop (corner radius), tabCutCornerSnipSizeRightTop (corner radius), tabCutCornerSnipSizeLeftBottom (corner radius), tabCutCornerSnipSizeRightBottom (corner radius), tabCutCornerSnipSizeBottom (corner radius)]
small multiples accent bar:
  also_called: [accent bar on each small multiple, panel accent]
  smallMultiplesAccentBar: [show (show or hide), position (position), color (fill color), transparency (transparency), width (width or thickness)]
small multiples border:
  also_called: [border around each small multiple, panel border]
  smallMultiplesBorder: [gridlineShow (show or hide), gridlineWidth (width or thickness), gridlineColor (line color), gridlineTransparency (transparency), gridlineStyle (line style)]
small multiples background:
  also_called: [panel background, facet background, cell background]
  smallMultiplesCellBackGround: [backgroundFillColor (background color), backgroundTransparency (transparency), backgroundShow (show or hide), backgroundImage (image source), backgroundImageTransparency (transparency), backgroundImageShow (show or hide), backgroundImageType (image source), backgroundImageUrl (URL or link), backgroundImageData (image source), backgroundImageDataFit (image fit), backgroundImageHeight (height), backgroundImageUrlFit (image fit), backgroundImageEffects (behavior or interaction), backgroundImageExposure (image effect), backgroundImageContrast (image effect), backgroundImageSaturation (image effect), backgroundImageBlur (image effect)]
small multiples header:
  also_called: [card group header, category header of the cards, header above each card group]
  smallMultiplesHeader: [fontFamily (font family), fontSize (font size), fontColor (font color), bold (bold), italic (italic), underline (underline), transparency (transparency), horizontalAlignment (alignment), verticalAlignment (alignment), textWrap (word wrap), displayUnits (display units), precision (decimal places), showBlankAs (blank value handling), leftMargin (padding or margin), rightMargin (padding or margin), topMargin (padding or margin), bottomMargin (padding or margin), backgroundShow (show or hide), backgroundColor (background color), backgroundTransparency (transparency), backgroundImage (image source), backgroundImageTransparency (transparency), backgroundImageBlur (image effect), backgroundImageContrast (image effect), backgroundImageData (image source), backgroundImageEffects (behavior or interaction), backgroundImageExposure (image effect), backgroundImageFit (image fit), backgroundImageHeight (height), backgroundImageSaturation (image effect), backgroundImageShow (show or hide), backgroundImageType (image source), backgroundImageUrl (URL or link), customFormatString (format string), paddingUniform (padding or margin)]
small multiples padding:
  also_called: [space between small multiples, panel padding, facet spacing]
  smallMultiplesHeader: [paddingIndividual (behavior or interaction)]
  smallMultiplesLayout: [cellPadding (spacing or gap), customizePadding (show or hide), rowPadding (spacing or gap), columnPadding (spacing or gap)]
small multiples grid:
  also_called: [small multiples layout, facet grid, panel layout, trellis rows and columns]
  smallMultiplesLayout: [orientation (orientation), maxSmallMultiples (count or limit), rowCount (count or limit), columnCount (count or limit), style (style or theme preset), autoGrid (layout or arrangement)]
small multiple titles:
  also_called: [small multiples headers, facet titles, panel titles, trellis headers, subheader]
  smallMultiplesLayout: [maxHeaderSize (size), titleOrientation (orientation), headerPosition (position)]
small multiples outer shape:
  also_called: [shape of the small multiples container, outer corners]
  smallMultiplesOuterShape: [rectangleRoundedCurve (corner radius), rectangleRoundedCurveLeftBottom (corner radius), rectangleRoundedCurveLeftTop (corner radius), rectangleRoundedCurveRightBottom (corner radius), rectangleRoundedCurveRightTop (corner radius), rectangleRoundedCurveCustomStyle (behavior or interaction)]
small multiples overflow:
  also_called: [small multiples scrolling, paging of small multiples]
  smallMultiplesOverFlow: [overFlowStyle (behavior or interaction), overFlowDirection (orientation)]
spacing between label and value:
  also_called: [vertical spacing, gap between value and label]
  spacing: [verticalSpacing (spacing or gap)]
callout value:
  also_called: [big number, main value, kpi value, headline number, card value, the number]
  value: [show (show or hide), fontFamily (font family), fontSize (font size), bold (bold), italic (italic), underline (underline), fontColor (font color), horizontalAlignment (alignment), textWrap (word wrap), labelDisplayUnits (display units), labelPrecision (decimal places), customFormatString (format string), showBlankAs (blank value handling), transparency (transparency)]
```
