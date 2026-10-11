---
titulo: "Failing supports"
url: https://help.prusa3d.com/article/failing-supports_1807
sitio: help.prusa3d.com
tipo: oficial
capturado: 2026-10-08
autor: Prusa Research
idioma: en
---

Supports are an important part of a 3D-printed object, especially when printing a model with a complex shape. If support material breaks, it is likely to cause a failure on the whole print.

PrusaSlicer shows a warning message if **stability problems are detected on a model**. In most cases, the solution is adding support material. Typically, support material is added on big or highly sloped overhangs.

More info on support and related settings is on the dedicated support material article.

> **Tip:** It is worth considering altering the orientation of the model or splitting the model into multiple parts in order to possibly reduce overhangs and consequently, the amount of support generated.

## How to prevent failing supports

- **Avoid isolated or scarce support towers**
  - For Grid and Snug supports, by reducing the **pattern spacing**.
  - For Organic supports, by increasing the **branch density**.
- Reduce printing speed for supports in PrusaSlicer, section *Print settings -> Speed*.
- Use a Brim around our support, found within *Print settings -> Skirt and Brim*.
- Use a different support **pattern**. In PrusaSlicer, section *Print setting -> Support material -> Pattern*.
  - The rectilinear pattern is set by default and is the easiest to remove.
  - The rectilinear grid pattern is sturdier and less prone to breaking during printing compared to the rectilinear pattern and is harder to remove.
  - The honeycomb pattern is sturdy and somewhat difficult to remove.
- Change the value of the Overhang Threshold. The Overhang threshold value represents the most horizontal slope (measured from the horizontal plane) that you can print without support material (90° = vertical).
- Use custom supports, tailored to your model.

## Notas del recolector

- El artículo está en inglés y no se ha traducido.
- El artículo define el Overhang Threshold como "the most horizontal slope (measured from the horizontal plane) that you can print without support material (90° = vertical)". Esto es complementario al ángulo de 45° de Bambu Lab: Prusa define el umbral como un ángulo desde el plano horizontal, mientras que Bambu lo define como el ángulo entre la superficie inclinada y la cama.
- El artículo no menciona ángulos concretos para cuándo añadir soportes; remite al Overhang Threshold de PrusaSlicer.
- El artículo no habla de la calidad de la cara que apoya sobre soportes; se centra en la estabilidad estructural del soporte.
- Las imágenes del artículo están alojadas en help.prusa3d.com/wp-content/uploads/ y no se han descargado.
