---
titulo: "OrcaSlicer Wiki - Layer Height"
url: https://github.com/SoftFever/OrcaSlicer/wiki/quality_settings_layer_height
sitio: github.com
tipo: oficial
capturado: 2026-10-16
autor: OrcaSlicer
idioma: en
---

# Layer Height

Mode: `Simple`.
Variables: `layer_height`, `initial_layer_print_height`.
Type: `Float`.
CLI Example: `--layer-height=1` (same pattern for the other variables above).

Layer height defines the vertical thickness of each printed layer, playing a crucial role in both print quality and printing speed.

Note: You can use a variable layer height with the Variable Layer Height feature.

Using smaller layer heights increases print time but results in:

- Smoother surface finishes
- Less noticeable layer lines
- Enhanced detail on curves
- Better performance on overhangs

## Quick Reference

| Nozzle Size | Min | Max | First Layer Height |
| --- | --- | --- | --- |
| 0.2mm | 0.04mm | 0.16mm | 0.12mm |
| 0.3mm | 0.06mm | 0.24mm | 0.18mm |
| 0.4mm | 0.08mm | 0.32mm | 0.25mm |
| 0.5mm | 0.10mm | 0.40mm | 0.30mm |
| 0.6mm | 0.12mm | 0.48mm | 0.35mm |
| 0.8mm | 0.16mm | 0.64mm | 0.45mm |
| 1.0mm | 0.20mm | 0.80mm | 0.55mm |

## Layer Height Guidelines

Usually, the optimal range for layer height is between 20% and 80% of the nozzle diameter.

- **Below 20%:** Flow inconsistencies and "fish scale" patterns may occur, especially at high speeds.
- **Over 80%:** Increased risk of layer adhesion issues and reduced print quality.

## First Layer Height

Controls the thickness of the initial layer. A thicker first layer improves bed adhesion and compensates for build surface imperfections.

**Recommended:** 0.25mm for 0.4mm nozzle (62.5% of nozzle diameter)
**Recommended maximum:** 65% of nozzle diameter

## Layer Height Overhangs Impacts

Layer height directly affects overhang angle capability and quality.

**Smaller layer heights** enable steeper overhangs by reducing the unsupported distance between layers, while **larger layer heights** increase this gap, leading to more sagging and requiring support material at shallower angles.

## Notas del recolector

- La tabla de Quick Reference es especialmente útil: da valores concretos de altura de capa y primera capa por tamaño de boquilla.
- La sección de First Layer Height es relevante para el tema de primera capa aplastada: recomienda 0.25mm para boquilla 0.4mm (62.5% del diámetro) y un máximo del 65%.
- El texto original está en inglés y no ha sido traducido.
- OrcaSlicer es un slicer open-source derivado de Bambu Studio/PrusaSlicer.
