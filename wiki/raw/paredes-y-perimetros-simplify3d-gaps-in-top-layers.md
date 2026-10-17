---
titulo: "Gaps in Top Layers | Simplify3D Print Quality Guide"
url: https://www.simplify3d.com/resources/print-quality-troubleshooting/gaps-in-top-layers/
sitio: simplify3d.com
tipo: oficial
capturado: 2026-10-17
autor: Simplify3D
idioma: en
---

# Gaps in Top Layers

To save plastic, most 3D printed parts are created to have a solid shell that surrounds a porous, partially hollow interior. For example, the interior of the part may use a 30% infill percentage, which means that only 30% of the interior is solid plastic, while the rest is air. While the interior of the part may be partially hollow, we want the exterior to remain solid. To do this, Simplify3D allows you to specify how many solid layers you want on the top and bottom of your part. For example, if you were printing a simple cube with 5 top and bottom solid layers, the software would print 5 completely solid layers at the top and bottom of the print, but everything else in the middle would be printed as a partially hollow layer. This technique can save a tremendous amount of plastic and time, while still creating very strong parts thanks to Simplify3D's great infill options. However, depending on what settings you are using, you may notice that the top solid layers of your print are not completely solid. You may see gaps or holes between the extrusions that make up these solid layers. If you have encountered this issue, here are several simple settings that you can adjust to fix it.

## Common Solutions

### Not enough top solid layers

The first setting to adjust is the number of top solid layers that are used. When you try to print a 100% solid layer on top of your partially hollow infill, the solid layer has to span across the hollow air pockets of your infill. When this happens, the extrusions for the solid layer have a tendency to droop or sag down into the air pocket. Because of this, you generally want to print several solid layers at the top of your print to ensure a nice flat, completely solid surface. As a good rule of thumb, you want the solid section at the top of your print to be at least 0.5mm thick. So if you are using a 0.25mm layer height, you would need at least 2 top solid layers. If you are printing at a lower layer height such as 0.1mm, you may need 5 solid layers at the top of your print to achieve the same effect. If you are noticing gaps between the extrusions in your top surface, the first thing you should try is increasing the number of top solid layers. For example, if you noticed the problem using only 3 top solid layers, try printing with 5 top solid layers to see if the problem is improved. Note that additional solid layers will occur within your part dimension and do not add size to the exterior of your part. You can adjust the solid layer settings by clicking "Edit Process Settings" and selecting the Layer tab.

### Infill percentage is too low

The infill on the inside of your part will act as the foundation for the layers above it. The solid layers at the top of your part will need to print on top of this foundation. If your infill percentage is very low, there will be large air gaps in your infill. For example, if you are using an infill percentage of only 10%, the remaining 90% of the interior of your part would be hollow, and this would create some very large air gaps that the solid layers would need to print on top of. If you have tried increasing the number of top solid layers and you are still seeings gaps in the top of your print, you may want to try increasing your infill percentage to see if the gaps go away. For example, if your infill percentage was previously 30%, try using a 50% infill percentage, as this would provide a much better foundation for the solid layers at the top of your print.

### Under-Extrusion

If you have tried increasing the infill percentage and the number of top solid layers, yet you are still seeing gaps in the tops of your print, then you likely have an under-extrusion issue. This means that your nozzle is not extruding as much plastic as the software expects. For a full description of this issue and how to correct it, please read the [Under-extrusion](/support/print-quality-troubleshooting/under-extrusion) section.

## Related Topics

- Gaps in Thin Walls — Gaps between thin walls of the print where the perimeters do not touch
- Weak Infill — Very thin, stringy infill that creates a weak interior and does not bond together well
- Layer Separation and Splitting — Layers are separating and splitting apart while printing
- Under-Extrusion — Printer does not extrude enough plastic, gaps between perimeters and infill

## Notas del recolector

- Fuente oficial de Simplify3D (Print Quality Guide). Página "Gaps in Top Layers".
- Regla práctica: el bloque sólido superior debe tener al menos 0.5 mm de grosor. Con capa de 0.25 mm → mínimo 2 capas sólidas; con 0.1 mm → 5 capas.
- El relleno interior actúa de base para las capas sólidas; relleno bajo (10%) crea huecos grandes. Ejemplo: pasar de 30% a 50% de relleno para mejor base.
- Si persisten huecos tras más capas y más relleno, es under-extrusion.
- Idioma original: inglés. No traducido.
- Imágenes/miniaturas omitidas.
path: wiki/raw/paredes-y-perimetros-simplify3d-gaps-in-top-layers.md