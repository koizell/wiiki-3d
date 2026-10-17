---
titulo: "Gaps in Thin Walls | Simplify3D Print Quality Guide"
url: https://www.simplify3d.com/resources/print-quality-troubleshooting/gaps-in-thin-walls/
sitio: simplify3d.com
tipo: oficial
capturado: 2026-10-17
autor: Simplify3D
idioma: en
---

# Gaps in Thin Walls

Because your 3D printer includes a fixed size nozzle, you may encounter issues when printing very thin walls that are only a few times larger than the nozzle diameter. For example, if you were trying to print a 1.0mm thick wall with a 0.4mm extrusion width, you may need to make some adjustments to ensure your printer creates a completely solid wall and does not leave a gap in the middle. Simplify3D already includes several dedicated settings to help with thin wall printing, so we will describe the relevant settings below.

## Common Solutions

### Adjust the thin wall behavior

The first settings that you need to verify are the dedicated thin wall settings that Simplify3D includes. To view these settings, click "Edit Process Settings" and select the Advanced tab. The software includes several different options for the Internal Thin Wall Type. The default option typically uses something called "gap fill" to fill the small gaps between your thin walls. This will create a back-and-forth infill pattern that adjusts to fill the space between these thin gaps. However, the software also includes another useful option that can fill these thin walls with a single pass. To enable this option, change the Internal Thin Wall Type to "Allow single extrusion fill". This will use a dynamic single extrusion that will adjust in size to perfectly fill the gap between these walls. For more information about single extrusion options, click here to view our detailed article on the subject.

### Change the extrusion width to fit better

In some cases, you may find that you have better luck changing the size of the plastic that is extruded from the nozzle. For example, if you were printing a 1.0mm thick wall, you could achieve a fast and strong print if your nozzle was setup to create a 0.5mm extrusion. This works best for parts that have fairly consistent wall thicknesses. You can adjust the extrusion width that the software creates by clicking "Edit Process Settings" and selecting the Extruders tab. Choose a manual extrusion width and enter a value of your choosing.

## Related Topics

- Gaps Between Infill and Outline — Gaps between the outline of the part and the outer solid infill layers
- Gaps in Floor Corners — Gaps in the corners of the print, where the top layer does not join to the outline of the next layer
- Small Features Not Printed — Very small features are not printed or are missing from the software preview
- Inconsistent Extrusion — Extrusion amount tends to vary and is not consistent enough to produce an accurate shape

## Notas del recolector

- Fuente oficial de Simplify3D (Print Quality Guide). Página "Gaps in Thin Walls".
- Trata paredes delgadas respecto al diámetro de boquilla: ejemplo de pared de 1.0 mm con boquilla de 0.4 mm y ancho de extrusión 0.4 mm.
- Soluciones: tipo de pared delgada interna ("gap fill" por defecto vs "Allow single extrusion fill"), y ajustar el ancho de extrusión para que encaje (ej. 0.5 mm para pared de 1.0 mm).
- Idioma original: inglés. No traducido.
- Imágenes/miniaturas omitidas.
path: wiki/raw/paredes-y-perimetros-simplify3d-gaps-in-thin-walls.md