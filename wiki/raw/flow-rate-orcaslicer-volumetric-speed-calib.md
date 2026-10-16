---
titulo: "Max Volumetric Speed (FlowRate) Calibration"
url: https://github.com/OrcaSlicer/OrcaSlicer/wiki/volumetric_speed_calib
sitio: github.com
tipo: oficial
capturado: 2026-10-16
autor: OrcaSlicer project
idioma: en
---

# Max Volumetric Speed (FlowRate) Calibration

Max Volumetric Speed value varies depending on your **material**, **machine**, **nozzle diameter**, and even your **extruder setup**, so it’s important to calibrate it for your specific printer and each filament you use.

Tip: Follow the recommended calibration order in the Calibration Guide.

Note: Even for the same material type (e.g., PLA), the **brand** and **color** can significantly affect the maximum flow rate.

Tip: If you're planning to increase speed or flow, it’s a good idea to **increase your nozzle temperature**, preferably toward the higher end of the recommended range for your filament. Use a temperature tower calibration to find that range.

## Calibration Overview

You will be prompted to enter the settings for the test: start volumetric speed, end volumetric speed, and step. It is recommended to use the default values (5mm³/s start, 20mm³/s end, with a step of 0.5), unless you already have an idea of the lower or upper limit for your filament. Select "OK", slice the plate, and send it to the printer.

Once printed, take note of where the layers begin to fail and where the quality begins to suffer.

Tip: A **change in surface sheen** (glossy vs. matte) is often a visual cue of material degradation or poor layer adhesion.

Use calipers or a ruler to measure the **height** of the model just before the defects begin.

Then you can:

- Use the following formula

  $$ Filament Max Volumetric Speed = start + (HeightMeasured * step) $$

  In this case (19mm), so the calculation would be: `5 + (19 * 0.5) = 14.5mm³/s`

- Use OrcaSlicer in the "Preview" tab, make sure the color scheme "flow" is selected. Scroll down to the layer height that you measured, and click on the toolhead slider. This will indicate the max flow level for your filament.

After you have determined the maximum volumetric speed, you can set it in the filament settings. This will ensure that the printer does not exceed the maximum flow rate for the filament.

Note: This test is a best case scenario and doesn't take into account Retraction or other settings that can increase clogs or under-extrusion. You may want to reduce the flow by 10%-20% (or even further) to ensure print quality/strength. Printing at high volumetric speed can lead to poor layer adhesion or even clogs in the nozzle.

## Notas del recolector

- Fuente oficial del wiki de OrcaSlicer. Es el procedimiento paso a paso del ensayo de caudal volumétrico máximo: valores por defecto (5 mm³/s inicio, 20 mm³/s fin, paso 0.5), medición de la altura con calibre antes de los defectos, fórmula explicita (start + HeightMeasured × step) y verificación cruzada en la pestaña Preview con el esquema "flow".
- Advierte que la prueba es el mejor caso y recomienda reducir un 10-20% por seguridad (adhesión/clogs).
- El cuerpo original está en inglés y no se ha traducido.
- Estado HTTP 200 verificado en la captura. No es una cáscara.
