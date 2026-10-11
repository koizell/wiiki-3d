---
titulo: "Layer separation and splitting FDM"
url: https://help.prusa3d.com/article/layer-separation-and-splitting-fdm_1806
sitio: help.prusa3d.com
tipo: oficial
capturado: 2026-10-04
autor: Prusa Research
idioma: en
---

This refers to the de-lamination of the printed layers. It is mostly caused by an incorrect preset/(custom)profile with wrong temperatures and/or too much cooling from either the print fan or the sorrounding environment.

Layer-separation is more an issue from the "old days" of unheated print-beds and less accessible materials, past ABS. This is rarely an issue on the MK-series hardware with PrusaSlicer presets, especially with materials like PLA and PETG.

It’s not difficult to tell the difference between cracking and missing layers. Best way to identify cracked layers are the clean cuts that show a bit of an upward bend or warp.

Layer separation occurs when the object cracks due to forces exerted on the print when layers cool down at different rates. Warping forces exceed the layer adhesion strength and the layers separate.

[IMAGE]

### **How to prevent Layer separation and Splitting**

ABS is highly susceptible to layer separation when there’s any sort of cold air blowing on the print before it has cooled down fully. We suggest turning fans OFF for ABS prints completely.

**ABS is best printed in an enclosed chamber** (even heated). Here we made one from an Ikea Lack table.

Please remember that you may probably not be able to print objects covering the whole print area using ABS, so it is better to replace ABS with PETG filament. PETG has similar advantages ABS, but it’s much better for printing large objects and it does not have the same tendency to crack/de-laminate. ASA is also a great alternative but is still more dependent on a stable environment when printing than PETG. You can check the material guides for choosing the best material for your print.

PLA may suffer from cracking and layer separation problems if you’re printing with insufficient temperature. Depending on the brand, PLA is printed at a range between 195-220. If you are having issues, **try increasing the printing temperature in 5°C increments, until you get a good layer adhesion.**

### Flow-rate / extrusion multiplier

Increase your printer’s flow rate (in PrusaSlicer called extrusion multiplier). More material extruded will create a stronger bond between layers. increase on 5% increments. For more info please see Extrusion multiplier calibration.

Extrusion-multiplier is located where you set temperatures, but only accessible when PrusaSlicer is set to Advanced- or Expert-mode

## Notas del recolector

- Artículo oficial de la Knowledge Base de Prusa. En el CMS el autor es **Jakub Neidl**,
  creado el 2019-11-19 y actualizado el 2026-08-17 06:40:15; última edición de
  Vojta Zeman. Se atribuye a Prusa Research para mantener la misma convención que el
  resto del lote.

- **Es la frase que sostiene el enlace cruzado con `warping-pla`**, y está literally en
  el cuarto párrafo: "Layer separation occurs when the object cracks due to forces
  exerted on the print when layers cool down at different rates. **Warping forces
  exceed the layer adhesion strength and the layers separate.**" El propio Prusa dice
  que la separación entre capas es consecuencia del warping, no un fenómeno aparte.

- También trae el criterio diagnóstico que pedía el tema: "Best way to identify cracked
  layers are the clean cuts that show a bit of an upward bend or warp", es decir, corte
  limpio con ligera curvatura hacia arriba. Es lo que separa "grieta" de "capa que
  falta" (under-extrusión), que es la distinción que hace el resto de las fuentes.

- Cifras que trae, y que **no son de cama**: PLA "printed at a range between 195-220"
  (sin unidad en el original), incremento de **5 °C** de temperatura hasta conseguir
  adhesión, y **flow rate / extrusion multiplier en incrementos del 5 %**. Contexto:
  PrusaSlicer, sólo accesible en modo Advanced o Expert.

- **La mitad del artículo está escrita pensando en ABS**, con la recomendación de
  ventilador a cero y cámara cerrada. Lo concerniente a PLA es el párrafo de PLA y el de
  flow rate. Se ha dejado tal cual, sin adaptar.

- Los dos recuadros del original (`note-callout` sobre los "old days", `tip-callout`
  sobre la cámara) salen aplanados a párrafo. El cocinero tiene que saber que el
  formato de caja se ha perdido.

- Erratas y rarezas del original conservadas sin tocar: "sorrounding", "past ABS" (el
  original dice literalmente eso, y no "past" por "past it"), "(custom)profile" sin
  espacio, y "increase on 5% increments" con el verbo en minúscula.

- Enlaces que el artículo menciona y **no** se han descargado: la guía de calibración
  del extrusion multiplier, los "material guides" y el post del blog de la cámara IKEA.
  La cifra de cama de PLA **no aparece en este artículo**: el que sí la tiene es
  `warping-pla-prusa-knowledge-base-warping.md` y el material cocinado de `temperatura-cama`.

- El artículo tiene 2 comentarios en el CMS. No se han descargado.
- No se ha traducido nada; el original está en inglés.
