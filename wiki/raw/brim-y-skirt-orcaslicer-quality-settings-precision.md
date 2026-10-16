---
titulo: "Precision"
url: https://github.com/OrcaSlicer/OrcaSlicer/wiki/quality_settings_precision
sitio: github.com
tipo: oficial
capturado: 2026-10-16
autor: OrcaSlicer project
idioma: en
---

# Precision

This section covers the settings that affect the precision of your prints. These settings can help you achieve better dimensional accuracy, reduce artifacts, and improve overall print quality.

- [Slice gap closing radius](#slice-gap-closing-radius)
- [Resolution](#resolution)
- [Arc fitting](#arc-fitting)
- [X-Y Compensation](#x-y-compensation)
  - [X-Y hole compensation](#x-y-hole-compensation)
  - [X-Y contour compensation](#x-y-contour-compensation)
- [Elephant foot compensation](#elephant-foot-compensation)
  - [Elephant Foot Compensation Density](#elephant-foot-compensation-density)
- [Precise wall](#precise-wall)
  - [Technical explanation](#technical-explanation)
- [Precise Z Height](#precise-z-height)
- [Polyholes](#polyholes)
  - [Polyhole detection margin](#polyhole-detection-margin)
  - [Polyhole twist](#polyhole-twist)
  - [Maximum Polyhole edge count](#maximum-polyhole-edge-count)

## Elephant foot compensation

[Mode](option_mode): `Advanced`.
[Variables](built_in_placeholders_variables): `elefant_foot_compensation`, `elefant_foot_compensation_layers`.
[Type](option_type): `elefant_foot_compensation` (Float), `elefant_foot_compensation_layers` (Integer).
[CLI Example](cli_mode#setting-overrides): `--elefant-foot-compensation=1` (`elefant_foot_compensation` shown; other variables above follow their own type).
This feature compensates for the "elephant foot" effect, which occurs when the first few layers of a print are wider than the rest due to:

- Weight of the material above them.
- Thermal expansion of the material.
- Bed temperature being too high.
- Inaccurate bed height/leveling.

To mitigate this effect, OrcaSlicer allows you to specify a positive distance by which the first layer is shrunk, decreasing linearly over the specified number of layers. This adjustment effectively reduces the width of the first few layers, helping to achieve a more accurate final print size.

The compensation is only applied when the object is printed directly on the build plate. It is skipped when a [raft](support_settings_raft) is used.

Note

This feature makes the part look like it has a smaller footprint on the build plate in the preview, but the final print (if calibrated correctly) will have the correct dimensions.
That's why the brim may look disconnected from the object when this feature is enabled. But in the final print, the brim will be correctly attached to the object.
If you use a high Elephant foot compensation value, you may want to enable the [Brim use EFC outline](others_settings_brim#brim-use-efc-outline) option to ensure proper brim attachment.

### Elephant Foot Compensation Density

[Mode](option_mode): `Expert`.
[Variable](built_in_placeholders_variables): `elefant_foot_layers_density`.
[Type](option_type#integer-float-percentage): `Percentage`.
[CLI Example](cli_mode#setting-overrides): `--elefant-foot-layers-density=20%`.
Controls the internal solid infill density used on Elephant Foot Compensation layers above the bottom layer.
This helps reduce excess material buildup and ripple/nozzle-scrape artifacts on early solid layers when first-layer squish is high.

- Range: 50% to 100%
- Default: 100% (feature disabled)

Note

This only affects internal solid infill inside the compensation zone.
It does not change sparse infill, top surfaces, or the bottommost layer. Start with 80-90% and 1-2 compensation layers, then tune based on visible ripples or nozzle scraping on lower solid layers.

## Notas del recolector

- Fuente oficial del wiki de OrcaSlicer; aporta la causa directa de que un brim "parezca" desconectado en la previsualización cuando Elephant foot compensation está activo.
- Afirma expresamente que el brim queda correctamente unido en la impresión final si la compensación está calibrada correctamente.
- Si la compensación de pie de elefante es alta, recomienda activar "Brim use EFC outline".
- Enumera causas del pie de elefante: peso del material, expansión térmica, cama demasiado caliente, nivelado incorrecto.
- Texto original en inglés, no traducido.
