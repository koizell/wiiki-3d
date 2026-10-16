---
titulo: "OrcaSlicer Wiki – Filament Tolerance Calibration (Shrinkage XY/Z, X-Y hole/contour compensation, modelo de tolerancia)"
url: https://github.com/SoftFever/OrcaSlicer/wiki/tolerance_calib
sitio: github.com/SoftFever/OrcaSlicer/wiki
tipo: oficial
capturado: 2026-10-16
autor: OrcaSlicer (OrcaSlicerBot / comunidad)
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

Tip: Follow the recommended calibration order in the Calibration Guide.

## Handy Models

OrcaSlicer includes several handy models to help you test and calibrate your printer.
Right-click on your plate in Prepare mode and select "Add Handy Model" to access these models.

### Orca Tolerance Test

This calibration test is designed to evaluate the dimensional accuracy of your printer and filament. The model consists of a base with six hexagonal holes, each with a different tolerance: 0.0 mm, 0.05 mm, 0.1 mm, 0.2 mm, 0.3 mm, and 0.4 mm, as well as a hexagon-shaped tester.

You can check the tolerance using either an 6mm Allen key or the included printed hexagon tester. Use calipers to measure both the holes and the inner tester. Based on your results, you can fine-tune the X-Y hole compensation and X-Y contour compensation settings. Repeat the process until you achieve the desired precision.

## Notas del recolector

- Wiki oficial del proyecto OrcaSlicer (repositorio SoftFever/OrcaSlicer). Página editada por última vez el 13/10/2026.
- Es la fuente que explica la contracción del filamento como causa (Shrinkage XY y Z) y cómo separa la compensación de filamento de la compensación de proceso.
- Describe el modelo "Orca Tolerance Test", con agujeros hexagonales de 0.0 a 0.4 mm, pensado para ajustar X-Y hole compensation y X-Y contour compensation.
- La página enlaza a `material_basic_information` para los valores de Shrinkage (XY) y (Z); esa página no se ha capturado en este fichero, pero el enlace queda anotado para el cocinero.
- El índice de navegación de 167 páginas del wiki de GitHub se ha omitido; el cuerpo de la página sí se reproduce tal cual.
- El texto original está en inglés y no se ha traducido.
