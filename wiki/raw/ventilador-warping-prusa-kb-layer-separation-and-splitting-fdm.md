---
titulo: "Layer separation and splitting FDM"
url: https://help.prusa3d.com/article/layer-separation-and-splitting-fdm_1806
sitio: help.prusa3d.com
tipo: oficial
capturado: 2026-10-16
autor: Prusa Research
idioma: en
---

This refers to the de-lamination of the printed layers. It is mostly caused by an incorrect preset/(custom)profile with wrong temperatures and/or too much cooling from either the print fan or the sorrounding environment.

Layer-separation is more an issue from the "old days" of unheated print-beds and less accessible materials, past ABS. This is rarely an issue on the MK-series hardware with PrusaSlicer presets, especially with materials like PLA and PETG.

It’s not difficult to tell the difference between cracking and missing layers. Best way to identify cracked layers are the clean cuts that show a bit of an upward bend or warp.

Layer separation occurs when the object cracks due to forces exerted on the print when layers cool down at different rates. Warping forces exceed the layer adhesion strength and the layers separate.

[IMAGE]

### How to prevent Layer separation and Splitting

ABS is highly susceptible to layer separation when there’s any sort of cold air blowing on the print before it has cooled down fully. We suggest turning fans OFF for ABS prints completely.

ABS is best printed in an enclosed chamber (even heated). Here we made one from an Ikea Lack table.

Please remember that you may probably not be able to print objects covering the whole print area using ABS, so it is better to replace ABS with PETG filament. PETG has similar advantages ABS, but it’s much better for printing large objects and it does not have the same tendency to crack/de-laminate. ASA is also a great alternative but is still more dependent on a stable environment when printing than PETG. You can check the material guides for choosing the best material for your print.

PLA may suffer from cracking and layer separation problems if you’re printing with insufficient temperature. Depending on the brand, PLA is printed at a range between 195-220. If you are having issues, try increasing the printing temperature in 5°C increments, until you get a good layer adhesion.

### Flow-rate / extrusion multiplier

Increase your printer’s flow rate (in PrusaSlicer called extrusion multiplier). More material extruded will create a stronger bond between layers. increase on 5% increments. For more info please see Extrusion multiplier calibration.

Extrusion-multiplier is located where you set temperatures, but only accessible when PrusaSlicer is set to Advanced- or Expert-mode

## Notas del recolector

- Artículo oficial de Prusa Research sobre separación de capas FDM. No es
  exactamente un artículo de warping, pero define el mecanismo común: capas que
  enfrían a ritmos distintos → fuerzas de warping que superan la adhesión entre
  capas → grieta/corte limpio con ligero doblado hacia arriba (upward bend or
  warp).
- Relación directa con el ventilador: "too much cooling from either the print fan or
  the sorrounding environment"; en ABS "turning fans OFF completely".
- Cifras: PLA 195-220 según marca; subir boquilla en incrementos de 5 °C; extrusion
  multiplier en incrementos del 5 % (sólo en modo Advanced/Expert); PETG/ASA como
  alternativas a ABS.
- Texto en inglés, no traducido. Se ha omitido el menú/chrome del sitio.
