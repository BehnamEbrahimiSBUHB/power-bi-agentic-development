# advancedSlicerVisual

```yaml
number format:
  also_called: [format string, display units, decimal places, value format]
  general: [formatString (format string)]
the visual as a whole:
  also_called: [general, overall, entire visual, chart settings]
  general: [filter (behavior or interaction)]
  layout: [alignment (alignment), style (layout or arrangement), fixedHeight (height), fixedWidth (width or thickness), showFixedSize (behavior or interaction)]
  rotation: [angle (angle or rotation)]
  actionState: [isCalloutValuesAdvanced (show or hide), isImageAdvanced (show or hide), isSelectionIconAdvanced (show or hide), isExpansionIconAdvanced (behavior or interaction), IsButtonsAdvanced (behavior or interaction)]
internal state that is not visible:
  also_called: [hidden property, engine setting, saved state, query option, not in the format pane]
  general: [selfFilter (behavior or interaction), selfFilterEnabled (behavior or interaction)]
card fill:
  also_called: [card background, card color, card fill image, background of each card]
  fillCustom: [show (show or hide), fillColor (fill color), transparency (transparency), image (image source), imageTransparency (transparency), imageSplitTransparency (behavior or interaction), sourceType (image source), effects (behavior or interaction), exposure (image effect), contrast (image effect), saturation (image effect), blur (image effect), fit (image fit), url (URL or link), field (data field binding), height (height), imageShow (show or hide)]
  layout: [backgroundImageBlur (image effect), backgroundImageContrast (image effect), backgroundImageData (image source), backgroundImageEffects (behavior or interaction), backgroundImageExposure (image effect), backgroundImageFit (image fit), backgroundImageHeight (height), backgroundImageSaturation (image effect), backgroundImageShow (show or hide), backgroundImageType (image source), backgroundImageUrl (URL or link)]
card border:
  also_called: [card outline, border around the card, card stroke, card frame]
  outline: [show (show or hide), lineColor (border color), transparency (transparency), weight (width or thickness)]
  layout: [rectangleRoundedCurve (corner radius), rectangleRoundedCurveCustomStyle (apply-to scope), rectangleRoundedCurveLeftTop (corner radius), rectangleRoundedCurveRightTop (corner radius), borderWidth (width or thickness), borderColor (border color), borderTransparency (transparency), borderStyle (line style)]
callout value:
  also_called: [big number, main value, kpi value, headline number, card value, the number]
  value: [show (show or hide), fontFamily (font family), fontSize (font size), bold (bold), italic (italic), underline (underline), fontColor (font color), horizontalAlignment (alignment), textWrap (word wrap), labelDisplayUnits (display units), labelPrecision (decimal places), customFormatString (format string), showBlankAs (blank value handling), transparency (transparency), verticalAlignment (alignment), text (text content)]
callout label:
  also_called: [label under the number, card label, measure name, value caption, category label]
  label: [show (show or hide), heading (label content), fontFamily (font family), fontSize (font size), bold (bold), italic (italic), underline (underline), fontColor (font color), position (position), transparency (transparency), textWrap (word wrap), alignBaselines (layout or arrangement), matchValueAlignment (layout or arrangement), horizontalAlignment (alignment), field (data field binding), labelSource (label content)]
card shape:
  also_called: [rounded corners, corner radius, card corners, snipped corners]
  shapeCustomRectangle: [tileShape (shape or marker type), rectangleRoundedCurve (corner radius), rectangleRoundedCurveCustomStyle (apply-to scope), rectangleRoundedCurveLeftTop (corner radius), rectangleRoundedCurveRightTop (corner radius), rectangleRoundedCurveLeftBottom (corner radius), rectangleRoundedCurveRightBottom (corner radius), tabCutCornerSnipSizeTop (corner radius), tabCutCornerSnipSizeCustomStyle (apply-to scope), tabCutCornerSnipSizeLeftTop (corner radius), tabCutCornerSnipSizeRightTop (corner radius), tabCutCornerSnipSizeLeftBottom (corner radius), tabCutCornerSnipSizeRightBottom (corner radius), tabCutCornerSnipSizeBottom (corner radius)]
slicer layout:
  also_called: [button arrangement, rows and columns of buttons, orientation, button size]
  layout: [orientation (orientation)]
cards layout:
  also_called: [card arrangement, cards grid, number of cards, card order, space between cards, rows and columns of cards]
  layout: [rowCount (count or limit), columnCount (count or limit), maxTiles (count or limit), cellPadding (spacing or gap), customizePadding (layout or arrangement), rowPadding (spacing or gap), columnPadding (spacing or gap), autoGrid (layout or arrangement)]
callout area:
  also_called: [callout background, area behind the big number, callout box, callout section]
  layout: [calloutSize (size)]
container behind all the cards:
  also_called: [outer background, grid background, cards backdrop, container shape, container border]
  layout: [backgroundFillColor (background color), backgroundTransparency (transparency), backgroundShow (show or hide), backgroundImage (image source), backgroundImageTransparency (transparency), rectangleRoundedCurveLeftBottom (corner radius), rectangleRoundedCurveRightBottom (corner radius)]
small multiples gridlines:
  also_called: [lines between small multiples, panel borders, facet dividers]
  layout: [customizeLines (show or hide), lineWidth (width or thickness), lineColor (line color), lineTransparency (transparency), lineStyle (line style), gridlineWidth (width or thickness), gridlineColor (line color), gridlineTransparency (transparency), gridlineStyle (line style)]
card padding:
  also_called: [inner spacing, margins inside the card, padding]
  layout: [leftOuterMargin (padding or margin), rightOuterMargin (padding or margin), topOuterMargin (padding or margin), bottomOuterMargin (padding or margin)]
  padding: [paddingSelection (size), leftMargin (padding or margin), rightMargin (padding or margin), topMargin (padding or margin), bottomMargin (padding or margin)]
card overflow:
  also_called: [scrolling, paging, overflow style, continuous scroll]
  overFlow: [overFlowStyle (behavior or interaction), overFlowDirection (orientation)]
card shadow:
  also_called: [drop shadow, shadow, elevation]
  shadowCustom: [show (show or hide), color (fill color), transparency (transparency), shadowBlur (shadow or glow effect), shadowPositionPreset (shadow or glow effect), angle (angle or rotation), shadowDistance (shadow or glow effect), position (position), shadowSpread (size)]
card glow:
  also_called: [glow, outer glow, halo]
  glowCustom: [show (show or hide), color (fill color), transparency (transparency), shadowBlur (shadow or glow effect), glowPositionPreset (shadow or glow effect), angle (angle or rotation), glowDistance (shadow or glow effect), position (position), glowSpread (size)]
rotation:
  also_called: [rotate, angle, tilt, text rotation]
  rotation: [shapeAngle (angle or rotation), textAngle (angle or rotation)]
spacing between label and value:
  also_called: [vertical spacing, gap between value and label]
  spacing: [verticalSpacing (spacing or gap)]
accent bar:
  also_called: [colored side bar, left stripe, side line, accent line, color strip]
  accentBar: [show (show or hide), position (position), color (fill color), transparency (transparency), width (width or thickness)]
button icon:
  also_called: [icon, glyph, button symbol, button image]
  icon: [show (show or hide), iconType (shape or marker type), icon (image source), iconUrl (image source), transparency (transparency), position (position), padding (padding or margin), size (size), altText (text content)]
image:
  also_called: [picture, photo, logo, graphic]
  image: [image (data field binding), imageFit (image fit), transparency (transparency), position (position), saturation (image effect), blur (image effect), ignorePadding (behavior or interaction), setAsBackGround (behavior or interaction), padding (padding or margin), show (show or hide), imageFile (image source), url (URL or link), effects (behavior or interaction), sourceType (image source), exposure (image effect), contrast (image effect), height (height), altText (text content), enhancedFit (image fit), enhancedBlur (image effect), enhancedSaturation (image effect)]
card image:
  also_called: [image on the card, card picture, logo, hero image, card icon image]
  image: [imageAreaSize (size)]
visual background:
  also_called: [background, backdrop, canvas of the visual]
  background: [show (show or hide), color (fill color), transparency (transparency), wrapContent (word wrap)]
slicer selection behavior:
  also_called: [single select, multi select, select all, force selection]
  selection: [selectAllCheckboxEnabled (show or hide), strictSingleSelect (behavior or interaction), singleSelect (behavior or interaction), restrictToLeafNodes (behavior or interaction)]
slicer selection state:
  also_called: [selected values, slicer mode, current filter, start and end values]
  data: [isInvertedSelectionMode (behavior or interaction)]
selection icon:
  also_called: [checkbox, radio button, tick box, check mark]
  selectionIcon: [color (fill color), overlayPosition (position), overlayToggle (show or hide), position (position), size (size), show (show or hide), showIconByState (show or hide), spacing (spacing or gap), transparency (transparency), verticalAlignment (alignment)]
slicer items:
  also_called: [slicer values, options, list entries, slicer buttons, slicer tiles, choices]
  behavior: [disabledItemsOrder (layout or arrangement)]
```
