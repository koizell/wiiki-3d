---
titulo: "Material Flow Ratio and Pressure Advance"
url: https://github.com/OrcaSlicer/OrcaSlicer/wiki/material_flow_ratio_and_pressure_advance
sitio: github.com
tipo: oficial
capturado: 2026-10-16
autor: OrcaSlicer project
idioma: en
---

# Material Flow Ratio and Pressure Advance

Flow ratio and pressure advance settings for the selected material.

## Flow Ratio

Mode: `Advanced`.
Variable: `filament_flow_ratio`.
Type: `Float list`.
CLI Example: `--filament-flow-ratio=1`.

The material may have volumetric change after switching between molten and crystalline states. This setting changes all extrusion flow of this filament in G-code proportionally. The recommended value range is between 0.95 and 1.05. You may be able to tune this value to get a nice flat surface if there is slight overflow or underflow.

The final object flow ratio is this value multiplied by the filament flow ratio.

Tip: Check the Flow Ratio Calibration guide.

## Pressure Advance

Modes:
`Simple` Variable: `enable_pressure_advance`.
`Advanced` Variable: `pressure_advance`.
Type: `enable_pressure_advance` (Boolean list), `pressure_advance` (Float list).
CLI Example: `--enable-pressure-advance=1` (`enable_pressure_advance` shown; other variables above follow their own type).

Pressure advance [Klipper](https://www.klipper3d.org/Pressure_Advance.html) and [RepRap](https://docs.duet3d.com/User_manual/Tuning/Pressure_advance) AKA [Linear advance (Marlin)](https://marlinfw.org/docs/features/lin_advance.html) is a feature that compensates for the lag in filament pressure within the nozzle during acceleration and deceleration. It helps improve print quality by reducing issues like blobs, oozing, and inconsistent extrusion, especially at corners or during fast movements.

Note: Auto calibration result will be overwritten once enabled

Tip: Check the Pressure Advance Calibration guide.

### Enable adaptive Pressure Advance (beta)

Mode: `Advanced`.
Variable: `adaptive_pressure_advance`.
Type: `Boolean list`.
CLI Example: `--adaptive-pressure-advance=1`.

With increasing print speeds (and hence increasing volumetric flow through the nozzle) and increasing accelerations, it has been observed that the effective PA value typically decreases. This means that a single PA value is not always 100% optimal for all features and a compromise value is usually used that does not cause too much bulging on features with lower flow speed and accelerations while also not causing gaps on faster features.

This feature aims to address this limitation by modeling the response of your printer's extrusion system depending on the volumetric flow speed and acceleration it is printing at. Internally, it generates a fitted model that can extrapolate the needed pressure advance for any given volumetric flow speed and acceleration, which is then emitted to the printer depending on the current print conditions.

When enabled, the pressure advance value above is overridden. However, a reasonable default value above is strongly recommended to act as a fallback and for when tool changing.

Tip: Check the Adaptive Pressure Advance Calibration guide.

#### Enable adaptive pressure advance for overhangs (beta)

Mode: `Advanced`.
Variable: `adaptive_pressure_advance_overhangs`.
Type: `Boolean list`.
CLI Example: `--adaptive-pressure-advance-overhangs=1`.

Enable adaptive PA for overhangs as well as when flow changes within the same feature. This is an experimental option, as if the PA profile is not set accurately, it will cause uniformity issues on the external surfaces before and after overhangs.

#### Pressure advance for bridges

Mode: `Advanced`.
Variable: `adaptive_pressure_advance_bridges`.
Type: `Float list`.
CLI Example: `--adaptive-pressure-advance-bridges=1`.

Pressure advance value for bridges. Set to 0 to disable. A lower PA value when printing bridges helps reduce the appearance of slight under extrusion immediately after bridges. This is caused by the pressure drop in the nozzle when printing in the air and a lower PA helps counteract this.

#### Adaptive pressure advance measurements (beta)

Add sets of pressure advance (PA) values, the volumetric flow speeds and accelerations they were measured at, separated by a comma. One set of values per line. Example:

```
[PA 1],[FLOW 1],[ACCELERATION 1]
[PA 2],[FLOW 2],[ACCELERATION 2]
...
[PA n],[FLOW n],[ACCELERATION n]
```

```
0.04,3.96,3000
0.033,3.96,10000
0.029,7.91,3000
0.026,7.91,10000
```

##### How to calibrate Adaptive Pressure Advance

It's highly recommended to use the Adaptive Pressure Advance Calibration guide.

1. Run the pressure advance test for at least 3 speeds per acceleration value. It is recommended that the test is run for at least the speed of the external perimeters, the speed of the internal perimeters and the fastest feature print speed in your profile (usually it's the sparse or solid infill). Then run them for the same speeds for the slowest and fastest print accelerations, and no faster than the recommended maximum acceleration as given by the Klipper input shaper.
2. Take note of the optimal PA value for each volumetric flow speed and acceleration. You can find the flow number by selecting "flow" from the color scheme drop down and move the horizontal slider over the PA pattern lines. The number should be visible at the bottom of the page. The ideal PA value should be decreasing the higher the volumetric flow is. If it is not, confirm that your extruder is functioning correctly. The slower and with less acceleration you print, the larger the range of acceptable PA values. If no difference is visible, use the PA value from the faster test.
3. Enter the triplets of PA values, Flow and Accelerations in the text box here and save your filament profile.

## Notas del recolector

- Fuente oficial del wiki de OrcaSlicer. Aporta la definición de Flow Ratio (rango recomendado 0.95-1.05), su efecto proporcional sobre el flujo en el G-code, y la definición de Pressure Advance como compensación de la demora de presión en boquilla a acelerar/decelerar, con Adaptive Pressure Advance (beta) dependiente del caudal volumétrico y de la aceleración.
- Incluye los Avisos/Variables del slicer (filament_flow_ratio, pressure_advance, adaptive_pressure_advance...). Los enlaces internos a otras páginas wiki se conservan; no se han descargado imágenes.
- El cuerpo original está en inglés y no se ha traducido.
- Estado HTTP 200 verificado en la captura. No es una cáscara.
