---
titulo: Voladizos y soportes
tema: voladizos-y-soportes
fuentes:
  - wiki/raw/voladizos-y-soportes-bambu-wiki-overhang.md
  - wiki/raw/voladizos-y-soportes-prusa-kb-failing-supports.md
  - wiki/raw/voladizos-y-soportes-prusa-kb-bad-surface-above-supports.md
cocinado: 2026-10-08
---

# Voladizos y soportes

## Afirmaciones

### Qué es un voladizo y por qué falla

- Un **voladizo** es la parte de un modelo que se extiende hacia fuera sin material sólido debajo que lo soporte. — [Bambu Lab, How to Print Overhangs](https://wiki.bambulab.com/en/filament-acc/filament/print-quality/overhang)
  > Cita: "When part of a model extends outward without solid material beneath to support it, this portion is considered an **overhang**."
- Durante la impresión, el filamento extruido en un voladizo **no se enfría a tiempo** y se deforma por gravedad, causando que se descuelgue. — [Bambu Lab, How to Print Overhangs](https://wiki.bambulab.com/en/filament-acc/filament/print-quality/overhang)
  > Cita: "the extruded filament is not cooled in time and bonds to the specified position, resulting in dropping"
- Los **soportes** actúan como una red de seguridad bajo los voladizos, proporcionando estabilidad a las capas superiores. — [Bambu Lab, How to Print Overhangs](https://wiki.bambulab.com/en/filament-acc/filament/print-quality/overhang)
  > Cita: "During printing, **supports** act like a safety net beneath overhangs, providing stability for the upper layers."

### Ángulo de referencia: 45° y la distinción entre ángulo y umbral

- **Regla general de Bambu Lab:** cuando el ángulo de voladizo (medido entre la superficie inclinada y la cama caliente) es **menor de 45°**, se recomienda añadir soportes; cuando es **mayor de 45°**, no se necesita soporte. — [Bambu Lab, How to Print Overhangs](https://wiki.bambulab.com/en/filament-acc/filament/print-quality/overhang)
  > Cita: "Generally, when the overhang tilt angle is smaller than 45°, it is recommended to add supports; when it is larger than 45°, no support is needed."
- **Overhang angle** es el ángulo formado entre la superficie inclinada del modelo y la superficie de la cama caliente. — [Bambu Lab, How to Print Overhangs](https://wiki.bambulab.com/en/filament-acc/filament/print-quality/overhang)
  > Cita: "**The overhang angle** mentioned here refers to the angle formed between the inclined surface of the model and the heatbed surface."
- **Overhang threshold** es la proporción de ancho de extrusión sin soporte dentro de una línea de extrusión; **no es el mismo concepto** que el ángulo de voladizo. — [Bambu Lab, How to Print Overhangs](https://wiki.bambulab.com/en/filament-acc/filament/print-quality/overhang)
  > Cita: "In contrast, **the overhang threshold** refers to the proportion of unsupported extrusion width within an extrusion line, which is not the same concept."
- En Bambu Studio, cuanto **mayor** es el ángulo de umbral de soporte configurado, **más soportes** se generan. — [Bambu Lab, How to Print Overhangs](https://wiki.bambulab.com/en/filament-acc/filament/print-quality/overhang)
  > Cita: "The larger the input angle, the more supports will be generated."
- **Definición de PrusaSlicer:** el Overhang Threshold es la pendiente más horizontal (medida desde el plano horizontal) que se puede imprimir sin material de soporte (90° = vertical). — [Prusa Research, Failing supports](https://help.prusa3d.com/article/failing-supports_1807)
  > Cita: "The Overhang threshold value represents the most horizontal slope (measured from the horizontal plane) that you can print without support material (90° = vertical)."

### Optimización de voladizos que ya pasan el umbral (>45°)

- Para voladizos con ángulo **mayor de 45°** (que ya pasan el umbral), se puede **ligeramente bajar la temperatura de boquilla** para reducir la necesidad de refrigeración. — [Bambu Lab, How to Print Overhangs](https://wiki.bambulab.com/en/filament-acc/filament/print-quality/overhang)
  > Cita: "**If the model's overhang angle is steep (more than 45°), you can try slightly lowering the nozzle temperature.**"
- **Para PLA:** bajar la temperatura de las capas a **~205 °C** y aumentar la velocidad del ventilador de refrigeración de voladizo al **100%**. — [Bambu Lab, How to Print Overhangs](https://wiki.bambulab.com/en/filament-acc/filament/print-quality/overhang)
  > Cita: "For **PLA**, you can lower the **other layers'** nozzle temperature to around **205 °C**, while increasing the **overhang cooling fan speed** to **100%**."
- **Para otros filamentos oficiales:** bajar la temperatura **5–10 °C** dentro del rango recomendado. — [Bambu Lab, How to Print Overhangs](https://wiki.bambulab.com/en/filament-acc/filament/print-quality/overhang)
  > Cita: "Make sure the temperature stays within the recommended range, and lower it by about 5–10 °C if needed."
- **Para filamentos de terceros:** imprimir una **torre de temperatura** para determinar la temperatura óptima. — [Bambu Lab, How to Print Overhangs](https://wiki.bambulab.com/en/filament-acc/filament/print-quality/overhang)
  > Cita: "For third-party filaments, it's recommended to print a **temperature tower** to determine the optimal temperature."
- **Overhang Slowing:** reducir la velocidad de impresión específicamente en regiones de voladizo. Las velocidades de voladizo suelen estar entre **10–60 mm/s**; cuanto mayor es el umbral de voladizo, mayor es el área sin soporte y típicamente se requieren velocidades más lentas. — [Bambu Lab, How to Print Overhangs](https://wiki.bambulab.com/en/filament-acc/filament/print-quality/overhang)
  > Cita: "Overhang speeds are generally set between **10–60 mm/s**. The larger the overhang threshold, the greater the unsupported area—typically requiring slower speeds to ensure quality."
- Aumentar el porcentaje del **ventilador de refrigeración de pieza** y del **ventilador de refrigeración auxiliar** según sea necesario. — [Bambu Lab, How to Print Overhangs](https://wiki.bambulab.com/en/filament-acc/filament/print-quality/overhang)
  > Cita: "**Increase the percentage of the part cooling fan and auxiliary cooling fan as needed.**"
- **Abrir la puerta frontal y la cubierta superior** puede mejorar el rendimiento de refrigeración; recomendado solo para **PLA, PETG, TPU**. Para filamentos de alta temperatura, esto puede causar warping o mala adhesión de capas. — [Bambu Lab, How to Print Overhangs](https://wiki.bambulab.com/en/filament-acc/filament/print-quality/overhang)
  > Cita: "**Opening the printer's front door and glass lid** can improve cooling performance (recommended only for materials like **PLA, PETG, TPU**."

### Soportes que fallan: causas y soluciones

- Si el material de soporte se rompe, es probable que cause el **fallo de toda la impresión**. — [Prusa Research, Failing supports](https://help.prusa3d.com/article/failing-supports_1807)
  > Cita: "If support material breaks, it is likely to cause a failure on the whole print."
- PrusaSlicer muestra un **mensaje de advertencia** si detecta problemas de estabilidad en un modelo; en la mayoría de los casos, la solución es añadir material de soporte. — [Prusa Research, Failing supports](https://help.prusa3d.com/article/failing-supports_1807)
  > Cita: "PrusaSlicer shows a warning message if **stability problems are detected on a model**. In most cases, the solution is adding support material."
- El material de soporte se añade típicamente en **voladizos grandes o muy inclinados**. — [Prusa Research, Failing supports](https://help.prusa3d.com/article/failing-supports_1807)
  > Cita: "Typically, support material is added on big or highly sloped overhangs."
- **Evitar torres de soporte aisladas o escasas:**
  - Para soportes **Grid y Snug**: reducir el **pattern spacing** (espaciado de patrón).
  - Para soportes **Organic**: aumentar la **branch density** (densidad de ramificación). — [Prusa Research, Failing supports](https://help.prusa3d.com/article/failing-supports_1807)
  > Cita: "Avoid isolated or scarce support towers" / "For Grid and Snug supports, by reducing the **pattern spacing**." / "For Organic supports, by increasing the **branch density**."
- **Reducir la velocidad de impresión de soportes** en PrusaSlicer (Print settings → Speed). — [Prusa Research, Failing supports](https://help.prusa3d.com/article/failing-supports_1807)
  > Cita: "Reduce printing speed for supports in PrusaSlicer, section *Print settings -> Speed*."
- Usar un **Brim** alrededor del soporte (Print settings → Skirt and Brim). — [Prusa Research, Failing supports](https://help.prusa3d.com/article/failing-supports_1807)
  > Cita: "Use a Brim around our support, found within *Print settings -> Skirt and Brim*."
- **Cambiar el patrón de soporte** (Print settings → Support material → Pattern):
  - **Rectilinear** (por defecto): el más fácil de quitar.
  - **Rectilinear grid**: más resistente y menos propenso a romperse durante la impresión; más difícil de quitar.
  - **Honeycomb**: resistente y algo difícil de quitar. — [Prusa Research, Failing supports](https://help.prusa3d.com/article/failing-supports_1807)
  > Cita: "The rectilinear pattern is set by default and is the easiest to remove." / "The rectilinear grid pattern is sturdier and less prone to breaking during printing compared to the rectilinear pattern and is harder to remove." / "The honeycomb pattern is sturdy and somewhat difficult to remove."
- Usar **soportes personalizados** (custom supports) adaptados al modelo. — [Prusa Research, Failing supports](https://help.prusa3d.com/article/failing-supports_1807)
  > Cita: "Use custom supports, tailored to your model."
- **Cambiar el valor del Overhang Threshold** en PrusaSlicer para ajustar cuándo se generan soportes. — [Prusa Research, Failing supports](https://help.prusa3d.com/article/failing-supports_1807)
  > Cita: "Change the value of the Overhang Threshold."
- **Considerar alterar la orientación del modelo** o **dividir el modelo en múltiples partes** para reducir los voladizos y, consecuentemente, la cantidad de soporte generado. — [Prusa Research, Failing supports](https://help.prusa3d.com/article/failing-supports_1807)
  > Cita: "It is worth considering altering the orientation of the model or splitting the model into multiple parts in order to possibly reduce overhangs and consequently, the amount of support generated."

### Cara sobre soportes: por qué sale rugosa y cómo mejorarla

- La superficie sobre los soportes sale **peor que el resto de la impresión** debido al **gap (separación)** que se deja entre el soporte y la superficie del objeto. — [Prusa Research, Bad looking surface above supports](https://help.prusa3d.com/article/bad-looking-surface-above-supports_1803)
  > Cita: "After you remove the support structure, you may notice that the surface above the supports looks worse than the rest of the print." / "a small gap is left between the support and the object's surface"
- **Reducir el gap** puede mejorar la calidad de la superficie, pero los soportes pueden ser **más difíciles de quitar**. — [Prusa Research, Bad looking surface above supports](https://help.prusa3d.com/article/bad-looking-surface-above-supports_1803)
  > Cita: "If you decrease the gap, you may get better results, but the supports may be more difficult to remove."
- Ajustar **Contact Z** y **Decrease pattern spacing** en PrusaSlicer (Print Settings → Support material) para mejorar la calidad de la superficie. — [Prusa Research, Bad looking surface above supports](https://help.prusa3d.com/article/bad-looking-surface-above-supports_1803)
  > Cita: "Try fine-tuning Contact Z and Decrease pattern spacing to improve the quality of the surface."
- Aumentar el número de **interface layers** a **3–4** proporciona una superficie superior del soporte más sólida, lo que también puede hacer que el punto de contacto del soporte sea **más fácil de quitar**. — [Prusa Research, Bad looking surface above supports](https://help.prusa3d.com/article/bad-looking-surface-above-supports_1803)
  > Cita: "Another good thing to try is to increase the number of interface layers to 3-4. You will have a more solid top-surface of your support, which can also make the contact-point of the support easier to remove."
- **Rotar el objeto** en PrusaSlicer para encontrar una mejor orientación que requiera menos soportes. — [Prusa Research, Bad looking surface above supports](https://help.prusa3d.com/article/bad-looking-surface-above-supports_1803)
  > Cita: "Again, try to **rotate the object in PrusaSlicer** and find a better orientation that would require fewer supports."
- Usar la **herramienta Cut** para imprimir dos partes más fácilmente y luego pegarlas. — [Prusa Research, Bad looking surface above supports](https://help.prusa3d.com/article/bad-looking-surface-above-supports_1803)
  > Cita: "You may also consider using the Cut tool, to print two parts more easily, which you then glue together."

## Contradicciones

**No se resuelven aquí.** Se anotan con su matiz, y el redactor tiene que explicar el matiz en el artículo en vez de elegir un número.

No se han encontrado contradicciones entre las fuentes. Ambas miden el ángulo de voladizo desde el plano horizontal (la cama caliente *es* el plano horizontal); un voladizo a 45° es 45° en las dos. El riesgo de confusión no es el ángulo, sino la palabra «overhang threshold», que significa cosas distintas en cada sitio —véase `## Relaciones`.

## Sin respaldo

Las tres fuentes son **oficiales** (Bambu Lab y Prusa Research), por lo que no necesitan marca de "una sola fuente". No hay afirmaciones sin respaldo en este lote.

## Tirado

Qué se ha eliminado y por qué. El redactor no usa nada de esto.

- **Navegación, menús, migas de pan, "compartir", "suscríbete".** Estándar en todas las fuentes.
- **Anuncios y banners.** No presentes en estas fuentes, pero se excluyen por defecto.
- **Piezas de producto: tiendas, precios, enlaces de compra.** No presentes en estas fuentes.
- **Cuestionarios, surveys.** No presentes en estas fuentes.
- **Repetidos:** No ha sido necesario; cada fuente aporta datos distintos.
- **Texto de navegación de wiki ("Related wiki links") sin el contenido enlazado.** No presente en estas fuentes.
- **Imágenes:** Las imágenes de los tres artículos están alojados en los CDNs de Bambu Lab y Prusa y no se han descargado. No se usan como fuentes.
- **Notas del recolector:** Se han integrado las notas relevantes en las afirmaciones (especialmente la distinción entre overhang angle y overhang threshold, y la advertencia de que las temperaturas/velocidades son para optimizar voladizos que ya pasan el umbral, no para definir el umbral).

## Relaciones

| Concepto | Se relaciona con | Cómo |
|---|---|---|
| voladizos y soportes | warping en PLA | un voladizo que se descuelga por falta de refrigeración se parece al warping; `siNo` → `warping-pla` |
| voladizos y soportes | temperatura de boquilla | bajar la temperatura de boquilla ayuda a que el filamento se enfríe más rápido en voladizos; → `temperatura-hotend` (sin escribir) |
| voladizos y soportes | adhesión a la cama | el Brim alrededor de soportes mejora la estabilidad; → `adhesion-primera-capa` |
| voladizos y soportes | orientación de la pieza | rotar el modelo puede eliminar voladizos o reducir la necesidad de soportes |
| voladizos y soportes | calidad de superficie | la cara que apoya sobre soportes sale rugosa por el gap; ajustar Contact Z, pattern spacing e interface layers |
| overhang angle | overhang threshold | Bambu distingue ambos conceptos; el ángulo es la inclinación de la superficie, el umbral es la proporción de extrusión sin soporte |
| overhang threshold (Bambu) | overhang threshold (PrusaSlicer) | **La misma palabra significa cosas distintas:** en Bambu es la proporción de ancho de extrusión sin soporte dentro de una línea; en PrusaSlicer es el límite angular (pendiente más horizontal que se imprime sin soporte, desde el plano horizontal; 90° = vertical). El redactor debe advertir que no son el mismo parámetro a pesar del nombre idéntico. |
| overhang threshold | generación de soportes | cuanto mayor es el ángulo de umbral configurado, más soportes se generan |
| soportes que fallan | estabilidad de la impresión | si el soporte se rompe, falla toda la impresión |
| gap soporte-pieza | calidad de la cara apoyada | reducir el gap mejora la superficie pero dificulta la remoción del soporte |
| interface layers | remoción del soporte | 3–4 capas de interfaz dan una superficie más sólida y más fácil de quitar |
