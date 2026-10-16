---
titulo: "Interlayer Cracking"
url: https://wiki.bambulab.com/en/filament-acc/filament/print-quality/interlayer-cracking
sitio: wiki.bambulab.com
tipo: oficial
capturado: 2026-10-16
autor: Bambu Lab
idioma: en
---

### Interlayer Cracking

When the interlayer adhesion of a model is insufficient and the material shrinkage is significant, cracks may appear on the printed part along the Z direction. This issue is common during printing with materials such as ABS, ASA, PC, PET-CF, and PA-CF, as shown in the figure below:

[IMAGE]

### Improvement Methods

### Unclog the Nozzle

A slight nozzle clog may prevent filament extrusion during a specific layer, manifesting similarly to cracking.

1. **Unclog the Nozzle**

Refer to the nozzle unclogging tutorials for cold pull maintenance.

H2D Nozzle Unclogging Tutorial
H2C Nozzle Unclogging Tutorial
H2S Nozzle Unclogging Tutorial
A Series Nozzle Unclogging Tutorial
X1/P1 Nozzle Unclogging Tutorial

2. **Appropriately Increase Nozzle Temperature or Decrease Print Speed**

This method allows the extruded filament more time to bond with the layer below, thereby improving interlayer adhesion. For example, with ABS, you can reduce the inner wall speed to 150 mm/s and the outer wall speed to 100 mm/s.

[IMAGE]

3. **Reduce the Part Cooling Fan Speed**

Preview the fan speed after slicing the model. If the fan speed for the inner and outer walls is 60% as shown below, reduce the "Max fan speed".

[IMAGE]

4. **Appropriately Increase the Heatbed Temperature by 5-10°C. If the device has active chamber heating, increase the chamber temperature by 5°C.**

[IMAGE]

### End Notes

We hope this guide has provided clear and practical support.

If the issue remains unresolved, please submit a support ticket and include your recent
printer logs and additional pictures or other details. Our technical team will review
your request and provide detailed assistance.

You can also visit Bambu AI, which can instantly answer common questions and provide
you with operational guidance.

## Notas del recolector

- Página oficial de la wiki de Bambu Lab, sin autor firmado: se le atribuye la marca.
  Es la fuente del criterio de diagnóstico de Bambu, que es lo que pedía el tema.
- La primera de los cuatro métodos es "desatasascar la boquilla", no tocar la
  temperatura. Es la parte más útil del documento para este artículo: Bambu dice
  explícitamente que un atasco leve puede impedir la extrusión en una capa concreta
  "manifesting similarly to cracking". Eso es exactamente la colisión entre
  separación entre capas y under-extrusión, y es la distinción que separa este artículo
  de un fallo de flujo.
- Cifras concretas: con ABS, velocidad de pared interior 150 mm/s y exterior 100 mm/s;
  cama +5-10 °C; cámara +5 °C si el equipo tiene calefacción activa; y reducir el
  "Max fan speed" tomando como referencia un 60 % en paredes. Los cuatro pasos están
  numerados en el original (el HTML es una lista <ol>); la numeración se ha reconstruido
  como 1-4 porque el texto plano la perdía, pero el orden es el del original y no se
  ha movido nada.
- Bambu no menciona PLA ni PETG en esta página. Los materiales que lista como propensos
  son ABS, ASA, PC, PET-CF y PA-CF. Para el artículo, que es de PLA, este matiz importa
  y el cocinero lo tiene que sacar de aquí, no de suponerlo.
- Discrepancia con Prusa que el cocinero tiene que señalar, no de resolver: Prusa
  (layer-separation-and-splitting-fdm_1806) sube la temperatura de la boquilla en
  incrementos de 5 °C; Bambu sube la cama 5-10 °C y la cámara 5 °C, y en cuanto a
  boquilla dice "aumentar la temperatura o bajar la velocidad". Las dos son oficiales
  y no se contradicen necesariamente, pero el artículo no puede elegir una y callar la otra.
- La página termina con un bloque de "End Notes" que es boilerplate de soporte (abrir
  ticket, Bambu AI). No es contenido técnico y queda aquí sólo porque estaba en el
  original. El cocinero puede descartarlo.
- Los enlaces a los tutoriales de desatasascado (H2D, H2C, H2S, serie A, X1/P1) y al
  ticket de soporte no se han descargado. Se han escrito los textos sin las URL, porque
  aquí sí están todas y son navegación interna de la wiki.
- La definición es útil porque sitúa el eje: las grietas aparecen "along the Z
  direction", es decir, la grieta es perpendicular al plano de la capa. Es el eje que
  este artículo opone al warping (esquinas arriba, pieza curvada).
- Capturada para el sub-tema piezas-grandes-grietas; la misma URL ya existía bajo
  otros slugs y se reescribe aquí como fichero nuevo.
- No se ha traducido nada; el original está en inglés.
