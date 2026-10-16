---
titulo: "quality_settings_precision (Elephant foot compensation)"
url: https://github.com/OrcaSlicer/OrcaSlicer/wiki/quality_settings_precision
sitio: github.com (OrcaSlicer/OrcaSlicer wiki)
tipo: oficial
capturado: 2026-10-16
autor: OrcaSlicer community / OrcaSlicerBot
idioma: en
---

Elephant foot compensation · OrcaSlicer/OrcaSlicer Wiki

# Elephant foot compensation

Mode: Advanced.
Variables: `elefant_foot_compensation`, `elefant_foot_compensation_layers`.
Type: `elefant_foot_compensation` (Float), `elefant_foot_compensation_layers` (Integer).
CLI Example: `--elefant-foot-compensation=1` (`elefant_foot_compensation` shown; other variables above follow their own type).

This feature compensates for the "elephant foot" effect, which occurs when the first few layers of a print are wider than the rest due to:

- Weight of the material above them.
- Thermal expansion of the material.
- Bed temperature being too high.
- Inaccurate bed height/leveling.

[imagen — elephant-foot.svg]

To mitigate this effect, OrcaSlicer allows you to specify a positive distance by which the first layer is shrunk, decreasing linearly over the specified number of layers. This adjustment effectively reduces the width of the first few layers, helping to achieve a more accurate final print size.

The compensation is only applied when the object is printed directly on the build plate. It is skipped when a raft is used.

[imagen — elephant-foot-compensation.png]

The compensation works as follows:

When current_layer ≤ input_compensation_layers:

compensation = input_compensation_distance − (input_compensation_distance / input_compensation_layers) × (current_layer − 1)

According to the equation, we can establish the following rules:

- In the 1st layer, since it is layer 1 − 1 = 0, compensation is 100%.
- The intermediate layers (between the first and input_compensation_layers) will have linear compensation.
- Layers above the specified amount will not be compensated.

Assuming the compensation value is 0.25 mm:

Elephant Foot Compensation Layers = 1:
- 1st layer: 0.25 mm compensation (100%)
- 2nd layer and beyond: No compensation (0 mm)

Elephant Foot Compensation Layers = 2:
- 1st layer: 0.25 mm compensation (100%)
- 2nd layer: 0.25 − (0.25 / 2) × (2 − 1) = 0.125 mm compensation (50%)
- 3rd layer and beyond: No compensation (0 mm).

Elephant Foot Compensation Layers = 5:
- 1st layer: 0.25 mm compensation (100%)
- 2nd layer: 0.25 − (0.25 / 5) × (2 − 1) = 0.2 mm compensation (80%)
- 3rd layer: 0.25 − (0.25 / 5) × (3 − 1) = 0.15 mm compensation (60%)
- 4th layer: 0.25 − (0.25 / 5) × (4 − 1) = 0.1 mm compensation (40%)
- 5th layer: 0.25 − (0.25 / 5) × (5 − 1) = 0.05 mm compensation (20%)
- 6th layer and beyond: No compensation (0 mm).

Note: This feature makes the part look like it has a smaller footprint on the build plate in the preview, but the final print (if calibrated correctly) will have the correct dimensions. That's why the brim may look disconnected from the object when this feature is enabled. But in the final print, the brim will be correctly attached to the object. If you use a high Elephant foot compensation value, you may want to enable the Brim use EFC outline option to ensure proper brim attachment.

## Elephant Foot Compensation Density

Mode: Expert.
Variable: `elefant_foot_layers_density`.
Type: Percentage.
CLI Example: `--elefant-foot-layers-density=20%`.

Controls the internal solid infill density used on Elephant Foot Compensation layers above the bottom layer. This helps reduce excess material buildup and ripple/nozzle-scrape artifacts on early solid layers when first-layer squish is high.

- Range: 50% to 100%
- Default: 100% (feature disabled)

This option works together with Elephant foot compensation layers. For each compensated layer above the bottom layer, OrcaSlicer applies:

effective_density = 1 − (1 − elefant_foot_layers_density) × (elefant_foot_compensation_layers − (layer_id − 1)) / elefant_foot_compensation_layers

Where:
- `elefant_foot_layers_density` = 80%.
- `elefant_foot_compensation_layers` = 4.
- `layer_id` = Layer index, starting from 0 for the bottom layer.
- Bottom Shell Layers > `elefant_foot_compensation_layers`. Otherwise, the adjustment will be applied only to the number of internal solid infill layers available.

Results in:
- 1st layer - Uncompensated, normal internal solid infill density (100%).
- 2nd layer - 1st compensated layer: 80% density.
- 3rd layer - 2nd compensated layer: 85% density.
- 4th layer - 3rd compensated layer: 90% density.
- 5th layer - 4th compensated layer: 95% density.
- Higher layers: normal internal solid infill density (100%).

Note: This only affects internal solid infill inside the compensation zone. It does not change sparse infill, top surfaces, or the bottommost layer. Start with 80-90% and 1-2 compensation layers, then tune based on visible ripples or nozzle scraping on lower solid layers.

## Notas del recolector

- URL comprobada: 200. Wiki hospedada en GitHub; el contenido se ha extraído del rendered HTML del wiki (no del checkout crudo del .md, que no estaba disponible).
- Fuente oficial de OrcaSlicer con la causa física más explícita de las recogidas: peso del material, expansión térmica, bed temperature demasiado alta e inexactitud de bed height/leveling. Es la única que lista la bed temp alta entre las causas.
- Aporta la fórmula exacta de compensación lineal por capa y un ejemplo numérico (0,25 mm sobre 1/2/5 capas).
- Incluye el parámetro avanzado «Elephant Foot Compensation Density» (infill interno reducido en la zona compensada) para evitar ripples/nozzle scraping; da rango 50-100% y default 100% (desactivado), con recomendación práctica 80-90% y 1-2 capas.
- Remite a `others_settings_brim` para «Brim use EFC outline», relevante para el debate brim vs elephant foot.
- Texto original en inglés, no traducido. Imágenes sustituidas por nombre de archivo.
