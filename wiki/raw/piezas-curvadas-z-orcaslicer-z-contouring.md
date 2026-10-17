---
titulo: "OrcaSlicer Wiki - Z Contouring"
url: https://github.com/SoftFever/OrcaSlicer/wiki/quality_settings_z_contouring
sitio: github.com
tipo: oficial
capturado: 2026-10-16
autor: OrcaSlicer
idioma: en
---

# Z Contouring

Mode: `Expert`.
Variable: `zaa_enabled`.
Type: `Boolean`.
CLI Example: `--zaa-enabled=1`.

Z contouring, also called Z-layer anti-aliasing or ZAA, reduces visible stair-stepping on curved and sloped top surfaces by adjusting the Z height of individual extrusion points so the toolpath follows the original model surface more closely.

Instead of keeping every move at a single flat Z for the whole layer, OrcaSlicer processes eligible top-surface toolpaths and emits varying Z values inside the affected layer. This can noticeably smooth domes, chamfers, shallow slopes, and similar top-facing geometry without changing the nominal layer height of the rest of the print.

Note: Current implementation targets top-facing curved or sloped surfaces. **Downward-facing or upside-down curves are not handled.**

## Minimize wall height angle

Mode: `Expert`.
Variable: `zaa_minimize_perimeter_height`.
Type: `Float`.
CLI Example: `--zaa-minimize-perimeter-height=1`.

Reduce the height of top-surface perimeters so they better match the model edge on slopes steeper than this angle. This setting affects both internal and external perimeters. Set `0` to disable it.

The default of 35 degrees is a reasonable starting point.

## Minimum z height

Mode: `Expert`.
Variable: `zaa_min_z`.
Type: `Float`.
CLI Example: `--zaa-min-z=1`.

Minimum local layer height allowed for contoured toolpaths. This setting also controls the slicing plane used for contoured layers.

- Lower values allow stronger contouring but leave less minimum layer thickness.
- Higher values move the slicing plane up (it sits this far above the bottom of the layer), and paths are never lowered below it, so walls and top surface infill can drop less. Top surface infill can also rise up to this amount above the nominal layer height, while walls are never raised.

## Don't alternate fill direction

Mode: `Expert`.
Variable: `zaa_dont_alternate_fill_direction`.
Type: `Boolean`.
CLI Example: `--zaa-dont-alternate-fill-direction=1`.

Keep the fill direction consistent from layer to layer instead of alternating it. This can help produce a more consistent surface pattern on curved top surfaces. It only has an effect when Z contouring is enabled for that region.

## Notas del recolector

- Z Contouring (ZAA) es una función de suavizado de superficies curvas en el plano Z: ajusta la altura de puntos de extrusión individuales para seguir mejor la superficie del modelo.
- Relevante para el tema de piezas curvadas en Z: puede mejorar la calidad de superficies curvas y pendientes sin cambiar la altura de capa nominal.
- El texto original está en inglés y no ha sido traducido.
- OrcaSlicer es un slicer open-source derivado de Bambu Studio/PrusaSlicer.
