---
titulo: "Flow Ratio Calibration"
url: https://github.com/OrcaSlicer/OrcaSlicer/wiki/flow_ratio_calib
sitio: github.com
tipo: oficial
capturado: 2026-10-16
autor: OrcaSlicer project
idioma: en
---

# Flow Ratio Calibration

Flow ratio determines how much filament is extruded and is crucial for high-quality prints. A properly calibrated flow ratio ensures consistent layer adhesion and accurate dimensions.

- Too low flow ratio causes under-extrusion, which leads to gaps, weak layers, and poor structural integrity.
- Too high flow ratio causes over-extrusion, resulting in excess material, rough surfaces, and dimensional inaccuracies.

Tip: Follow the recommended calibration order in the Calibration Guide.

Warning: BambuLab Printers: Make sure you do not select the 'Flow calibration' option.

## Calibration Types

- YOLO: A simplified method that adjusts the flow ratio in a single pass using the formula `OldFlowRatio ± modifier`.
  - Recommended: calibration range `[-0.05, +0.05]`, flow ratio step `0.01`.
  - Perfectionist: calibration range `[-0.04, +0.035]`, flow ratio step `0.005`.
- 2-Pass Calibration: the legacy method, using two passes to determine the optimal flow ratio with the formula `OldFlowRatio * (100 + modifier) / 100`.

### Archimedean chords + YOLO (Recommended)

This method uses the Archimedean Chords pattern for flow ratio calibration with the YOLO (Recommended) approach.

1. Select the printer and the filament you want to calibrate. This method is based on the filament's current flow ratio, so make sure you select the correct filament before proceeding.
2. In the `Calibration` menu, under the `Flow ratio` section, select `YOLO (Recommended)`.
3. A new project with eleven blocks will be created, each with a different flow ratio modifier. Slice and print the project.
4. Examine the printed blocks and identify the one with the best surface quality. Look for:
   1. The smoothest top surface.
   2. No visible gaps between the pattern arcs.
   3. Minimal or no visible line between the Inner Spiral and the Outer Arcs.
   In this example, the block with a flow modifier of `+0.01` produced the best results, despite a visible line between the Inner Spiral and the Outer Arcs; reducing the flow further begins to show gaps between the lines.
5. Update the flow ratio in the filament settings using the equation: `OldFlowRatio ± modifier`. If your previous flow ratio was `0.98` and you selected the block with a flow ratio modifier of `+0.01`, the new value would be: `0.98 + 0.01 = 0.99`. Remember to save the filament profile.

   Note: The new Archimedean chords pattern uses a specific print order that prints the inner spiral last so you can check for material accumulation on the contact line at the end.

### Monotonic Line + 2-Pass Calibration

This example uses the Monotonic Line pattern with the 2-Pass Calibration approach.

1. Select the printer, filament, and process you want to use for the test.
2. In the `Calibration` menu, under the `Flow ratio` section, select `Pass 1`.
3. A new project with nine blocks will be created, each with a different flow ratio modifier. Slice and print the project.
4. Examine the blocks and determine which one has the smoothest top surface.
5. Update the flow ratio in the filament settings using the equation: `OldFlowRatio * (100 + modifier) / 100`. For example, if your previous flow ratio was `0.98` and you selected the block with a flow ratio modifier of `+5`, the new value would be: `0.98 × (100 + 5) / 100 = 1.029`. Remember to save the filament profile.
6. Perform the `Pass 2` calibration. This process is similar to `Pass 1`, but a new project with ten blocks will be generated. The flow ratio modifiers for this project will range from `-9` to `0`.
7. Repeat steps 4 and 5. For example, if your previous flow ratio was `1.029` and you selected the block with a flow ratio modifier of `-6`, the new value would be: `1.029 × (100 - 6) / 100 = 0.96726`. Remember to save the filament profile.

Tip: @ItsDeidara has created an HTML tool to help with these calculations. Check it out if you find the equations confusing: Orca-Slicer-Assistant.

## Credits

- Archimedean Chords Idea: Jimcorner

## Notas del recolector

- Fuente oficial del wiki de OrcaSlicer. Describe los dos métodos de calibración de Flow Ratio: YOLO con patrón Archimedean Chords (once bloques, pasos 0.01 o 0.005) y el histórico en dos pasadas (nueve y diez bloques, fórmulas explícitas). Aporta el criterio de cuándo el flujo es alto/bajo según superficie superior.
- Las imágenes y GIF del artículo no se han descargado; se describen por texto.
- El cuerpo original está en inglés y no se ha traducido.
- Estado HTTP 200 verificado en la captura. No es una cáscara.
