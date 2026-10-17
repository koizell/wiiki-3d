---
titulo: "Filament Tolerance Calibration"
url: https://github.com/OrcaSlicer/OrcaSlicer/wiki/tolerance_calib
sitio: github.com/OrcaSlicer
tipo: oficial
capturado: 2026-10-17
autor: OrcaSlicer
idioma: en
---

# Filament Tolerance Calibration

Each filament and printer combination can result in different tolerances. This means that even using the same filament and print profile, tolerances may vary from one printer to another. To correct for these variations, OrcaSlicer provides:

- Filament Compensation:

  - [Shrinkage (XY)](material_basic_information#shrinkage-xy)

  - [Shrinkage (Z)](material_basic_information#shrinkage-z)

- [Process Compensation](quality_settings_precision):

  - [X-Y hole compensation](quality_settings_precision#x-y-compensation)

  - [X-Y contour compensation](quality_settings_precision#x-y-compensation)

  - [Precise wall](quality_settings_precision#precise-wall)

  - [Precise Z height](quality_settings_precision#precise-z-height)

Tip

Follow the recommended calibration order in the [Calibration Guide](calibration_guide).

## Handy Models

OrcaSlicer includes several handy models to help you test and calibrate your printer.
Right-click on your plate in Prepare mode and select "Add Handy Model" to access these models.

### Orca Tolerance Test

This calibration test is designed to evaluate the dimensional accuracy of your printer and filament. The model consists of a base with six hexagonal holes, each with a different tolerance: 0.0 mm, 0.05 mm, 0.1 mm, 0.2 mm, 0.3 mm, and 0.4 mm, as well as a hexagon-shaped tester.

You can check the tolerance using either an 6mm Allen key or the included printed hexagon tester. Use calipers to measure both the holes and the inner tester. Based on your results, you can fine-tune the X-Y hole compensation and X-Y contour compensation settings. Repeat the process until you achieve the desired precision.

## Notas del recolector

- Fuente oficial del wiki de OrcaSlicer. Documenta la calibración de tolerancias por filamento (Shrinkage XY/Z) y por proceso (X-Y hole/contour compensation, Precise wall, Precise Z height), además del modelo de prueba "Orca Tolerance Test" con seis agujeros hexagonales de tolerancia creciente (0.0 a 0.4 mm).
- Texto original en inglés, no traducido.
- La página incluye imágenes de la wiki que no se han reproducido aquí.
