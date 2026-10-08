---
titulo: "Bad looking surface above supports"
url: https://help.prusa3d.com/article/bad-looking-surface-above-supports_1803
sitio: help.prusa3d.com
tipo: oficial
capturado: 2026-10-08
autor: Prusa Research
idioma: en
---

Generally speaking, it's always the best option to rotate the object in such a way that the supports are not needed at all. However, if you need to print complex objects, you will end up using supports anyway. After you remove the support structure, you may notice that the surface above the supports looks worse than the rest of the print.

*The picture above shows the artifacts that can appear if print settings are not optimal*

## How to fix bad looking surface above supports

Again, try to **rotate the object in PrusaSlicer** and find a better orientation that would require fewer supports.

You may also consider using the Cut tool, to print two parts more easily, which you then glue together.

## Support settings

In order to make the supports easier to break off from the printed object, a small gap is left between the support and the object's surface. If you decrease the gap, you may get better results, but the supports may be more difficult to remove.

You can tweak the values for supports in PrusaSlicer, section *Print Settings – Support material*. Try fine-tuning Contact Z and Decrease pattern spacing to improve the quality of the surface.

Another good thing to try is to increase the number of interface layers to 3-4. You will have a more solid top-surface of your support, which can also make the contact-point of the support easier to remove.

## Notas del recolector

- El artículo está en inglés y no se ha traducido.
- El artículo es corto pero con contenido concreto: explica que la cara sobre soportes sale rugosa por el gap entre soporte y pieza, y da tres ajustes específicos (Contact Z, pattern spacing, interface layers).
- El artículo no promete que la cara quede lisa; dice que se puede mejorar la calidad de la superficie ajustando parámetros.
- El artículo no menciona ángulos concretos ni temperaturas.
- Las imágenes del artículo están alojadas en help.prusa3d.com/wp-content/uploads/ y no se han descargado.
