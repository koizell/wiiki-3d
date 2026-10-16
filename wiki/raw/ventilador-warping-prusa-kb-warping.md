---
titulo: "Warping"
url: https://help.prusa3d.com/article/warping_2011
sitio: help.prusa3d.com
tipo: oficial
capturado: 2026-10-16
autor: Prusa Research
idioma: en
---

Warping

Relevant for

CORE One family
MK4 family
MMU family
PRO family
ENCLOSURE family

When printing large objects, you can sometimes run into an issue with the corners of
the object being lifted from the bed – mostly when printing with high-temperature
materials such as PC Blend, ASA or ABS. It's usually a result of a sudden
temperature difference between the melting temperature of the nozzle and the
ambient temperature. When this happens, the plastic will shrink and warp. Our goal
is to minimize the thermal shock the printed part receives so it doesn't warp as
much. Less warping also means less residual tension and a stronger part.

Adding a layer of glue stick, applied thinly on the steel sheet when cold, can both
help adhesion and act as a separation layer, protecting the sheet from wear and
tear.

Each material requires a different technique to prevent the lifting of the object.
Different geometries may also need different approaches.

Troubleshooting

Use PrusaSlicer profiles

Make sure you are starting off by using corresponding default profiles in
PrusaSlicer.

Keep the surface free of grease

Before starting any of your prints, simply wipe the print surface clean with IPA
90%+.

Lower the Live Adjust Z slightly to increase bed adhesion. But not too much. Do not
over-squish the first layer. Be aware the bed adhesion might be too high with PETG
or PC and might result in a damaged PEI surface.

Print cooling.

Some materials such as PLA or PETG need a lot of cooling. If corners of your print
are lifting up, check if the print fan is enabled, try increasing the print fan
speed. Check if the print fan actually works and the fan shroud isn't obstructed or
molten.

If steep overhangs and small parts of your print are warping, you may try enabling
the print fan at low speeds (10-20%) even for materials that do not require a lot of
print-cooling such as ABS or PC-Blend.

Be aware that too much print-fan speed may warp and lift up the whole object and
may decrease layer-to-layer adhesion. Our goal is to cool the part neither too fast
nor too slow.

If you experience lower layer-to-layer adhesion or even print cracking after raising
the print-fan speed, try increasing the nozzle temperature to restore the bonding of
the individual layers together properly.

Ambient temperature

For high-temperature filaments, try to maintain a stable ambient temperature. An
open window or an AC unit nearby the printer will increase the occurrence of warps.
High-temperature materials generally require higher ambient temperature not to warp
during printing. If you print with these materials most of the time, you should
consider having the printer in an enclosure. Printing PLA or PETG in an enclosure
might not be a good idea. These materials need a lot of print cooling, which is
harder to achieve with a higher ambient temperature.

Use a skirt and try to print more objects at once.

For high-temperature materials such as PC-Blend, ASA, or ABS, try using a printed
skirt (draft shield) to retain heat in and around the printed object.

Decrease the print speed.

This may help a lot with high-warping materials. Although Prusament PC-Blend is
low-warping compared to other PC-Blend filaments, decreasing the print speed will
help your part as a whole to settle down, melt individual layers together properly
and warp less.

Use the brim

A brim is a good way how to increase the adhesion to the print surface.

If the brim isn't enough, try adding a small geometry (like a tiny cylinder)
specifically to the culprit area.

## Notas del recolector

- Artículo oficial de la Knowledge Base de Prusa, centrado en warping y con un
  bloque específico sobre ventilación ("Print cooling"): un fan demasiado alto
  puede deformar y levantar todo el objeto; subir la velocidad del fan puede
  bajar la adhesión entre capas y provocar grietas.
- Menciona la cura inversa para overhangs abruptos: habilitar el fan al 10-20 %
  incluso en materiales que no requieren mucha refrigeración (ABS, PC-Blend).
- El texto habla sobre todo de materiales de alta temperatura (ABS, ASA, PC-Blend)
  y afirma que imprimir PLA/PETG en cámara cerrada puede no ser buena idea porque
  necesitan mucha refrigeración.
- Cifras: fan para overhangs 10-20 %; incrementos de 5 °C en temperatura de
  boquilla si baja la adhesión entre capas; cama 50-60 °C PLA según ficha de
  material. No se han extraído más cifras que las del original.
- Texto en inglés, no traducido.
