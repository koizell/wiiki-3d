---
titulo: "Material Volumetric Speed Limitation"
url: https://github.com/OrcaSlicer/OrcaSlicer/wiki/material_volumetric_speed_limitation
sitio: github.com
tipo: oficial
capturado: 2026-10-16
autor: OrcaSlicer project
idioma: en
---

# Material Volumetric Speed Limitation

Each material profile includes a **maximum volumetric speed** setting, which limits your print speed to prevent issues like nozzle clogs, under-extrusion, or poor layer adhesion.

Tip: Calibrating the maximum volumetric speed for each filament you use is highly recommended. Refer to the Max Volumetric Speed (FlowRate) Calibration guide for detailed instructions on how to perform this calibration.

## Adaptive volumetric speed

Mode: `Developer`.
Variable: `filament_adaptive_volumetric_speed`.
Type: `Boolean list`.
CLI Example: `--filament-adaptive-volumetric-speed=1`.

Warning: Experimental and incomplete feature imported from BBS. Functional for some profiles that already have the variable saved.

When enabled, the extrusion flow is limited by the smaller of the fitted value (calculated from line width and layer height) and the user-defined maximum flow. When disabled, only the user-defined maximum flow is applied.

## Max volumetric speed

Mode: `Advanced`.
Variable: `filament_max_volumetric_speed`.
Type: `Float list`.
CLI Example: `--filament-max-volumetric-speed=1`.

This setting is the volume of filament that can be melted and extruded per second. Printing speed is limited by max volumetric speed, in case of too high and unreasonable speed setting. This value cannot be zero.

## Notas del recolector

- Fuente oficial del wiki de OrcaSlicer. Define el ajuste `filament_max_volumetric_speed` (volumen de filamento fundido y extruido por segundo) y el modo desarrollador `filament_adaptive_volumetric_speed`, y enlaza al ensayo de calibración.
- El cuerpo original está en inglés y no se ha traducido.
- Estado HTTP 200 verificado en la captura. No es una cáscara.
