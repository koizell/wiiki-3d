---
titulo: Altura de capa
tema: altura-capa
fuentes:
  - wiki/raw/altura-capa-bambulab-layer-height.md
  - wiki/raw/altura-capa-prusa-layers-and-perimeters.md
  - wiki/raw/altura-capa-prusa-variable-layer-height.md
  - wiki/raw/altura-capa-bambulab-adaptive-layer-height.md
cocinado: 2026-10-08
---

## Afirmaciones

### Altura de capa y resolución vertical

- La altura de capa es la resolución vertical del modelo: a menor altura, mayor finura.
  > Cita: "we also regard the layer height as the vertical resolution of the model, that is, the lower the layer height, the higher the fineness of the model."
  — [Bambu Lab Wiki](https://wiki.bambulab.com/en/software/bambu-studio/layer-height), capturado 2026-10-08

- La altura de capa es el factor principal que afecta al tiempo de impresión y a la resolución vertical.
  > Cita: "Layer height is the main factor affecting both: - print time - vertical resolution"
  — [Prusa Knowledge Base](https://help.prusa3d.com/article/layers-and-perimeters_1748), capturado 2026-10-08

- Elegir capas más altas acorta significativamente el tiempo de impresión a costa de capas más visibles.
  > Cita: "By choosing taller layer heights you can significantly shorten the print time at the cost of more visible layers."
  — [Prusa Knowledge Base](https://help.prusa3d.com/article/layers-and-perimeters_1748), capturado 2026-10-08

- Elegir una altura de capa pequeña (p. ej. 0,10 mm) produce detalle adicional a cambio de tiempos de impresión más largos.
  > Cita: "choosing a small layer height (e.g. 0.10 mm) will result in extra detail at the cost of longer print times."
  — [Prusa Knowledge Base](https://help.prusa3d.com/article/layers-and-perimeters_1748), capturado 2026-10-08

- La altura de capa solo cambia la resolución vertical; la resolución en el plano XY no se ve afectada.
  > Cita: "Keep in mind, that layer height changes only the vertical resolution."
  — [Prusa Knowledge Base](https://help.prusa3d.com/article/layers-and-perimeters_1748), capturado 2026-10-08

### Altura de capa y tiempo de impresión

- A menor altura de capa, menos obvios los patrones entre capas en la superficie, pero el tiempo de impresión es relativamente mayor.
  > Cita: "The lower the layer height, the less obvious the interlayer patterns on the model surface, but the printing time will be relatively longer."
  — [Bambu Lab Wiki](https://wiki.bambulab.com/en/software/bambu-studio/layer-height), capturado 2026-10-08

- Con altura de capa alta, el caudal de extrusión es relativamente grande y se requiere una velocidad de impresión más lenta para que el hotend funda completamente el filamento extruido.
  > Cita: "When the layer height is set relatively high, the extrusion flow rate is relatively large, and a slower printing speed is required to make the hot end fully melt the extruded filament."
  — [Bambu Lab Wiki](https://wiki.bambulab.com/en/software/bambu-studio/layer-height), capturado 2026-10-08

- Tiempos de impresión concretos para el mismo modelo (Glowing Ghosts): 0,08 mm → 1h 19m; 0,2 mm → 36m 14s; 0,28 mm → 28m 27s.
  > Cita: "0.08mm layer height, printing time 1h 19m | 0.2mm layer height, printing time 36m 14s | 0.28mm layer height, printing time 28m 27s"
  — [Bambu Lab Wiki](https://wiki.bambulab.com/en/software/bambu-studio/layer-height), capturado 2026-10-08

### Límite de la boquilla

- El rango razonable de altura de capa debe estar entre el 20 % y el 70 % del diámetro de la boquilla.
  > Cita: "In general, the reasonable range of layer height should be 20% ~70% of the nozzle diameter."
  — [Bambu Lab Wiki](https://wiki.bambulab.com/en/software/bambu-studio/layer-height), capturado 2026-10-08

- Para una boquilla de 0,4 mm, la altura de capa de impresión adecuada está entre 0,08 mm y 0,28 mm.
  > Cita: "For example, for the 0.4mm diameter nozzle, the appropriate printing layer height is between 0.08mm and 0.28mm."
  — [Bambu Lab Wiki](https://wiki.bambulab.com/en/software/bambu-studio/layer-height), capturado 2026-10-08

- La altura de capa debe estar por debajo del 80 % del diámetro de la boquilla (p. ej. la altura de capa máxima con una boquilla de 0,4 mm es aproximadamente 0,32 mm).
  > Cita: "The layer height should be below 80% of the nozzle diameter (e.g. the maximum layer height with a 0.4 mm nozzle is about 0.32 mm)."
  — [Prusa Knowledge Base](https://help.prusa3d.com/article/layers-and-perimeters_1748), capturado 2026-10-08

- La altura de capa no puede ser mayor que el diámetro de la boquilla; PrusaSlicer muestra un mensaje de error si se introduce tal valor.
  > Cita: "The layer height cannot be higher than the nozzle diameter, PrusaSlicer will display an error message if you try to input such a value."
  — [Prusa Knowledge Base](https://help.prusa3d.com/article/layers-and-perimeters_1748), capturado 2026-10-08

### Altura de capa y resistencia

- La resistencia de un modelo está definida principalmente por el número de perímetros, no por el relleno.
  > Cita: "The strength of a model is mostly defined by the number of perimeters (not the infill)."
  — [Prusa Knowledge Base](https://help.prusa3d.com/article/layers-and-perimeters_1748), capturado 2026-10-08

- Si se cambia la altura de capa, el grosor de pared ideal también cambia.
  > Cita: "if you change the layer height, your ideal wall thickness will change as well!"
  — [Prusa Knowledge Base](https://help.prusa3d.com/article/layers-and-perimeters_1748), capturado 2026-10-08

### Altura de capa variable (adaptativa)

- La altura de capa variable permite definir diferentes regiones del modelo con diferente altura de capa y suavizar automáticamente la transición entre ellas.
  > Cita: "PrusaSlicer lets you define different regions of your model to be printed with a different layer height and automatically smooth the transition between them."
  — [Prusa Knowledge Base](https://help.prusa3d.com/article/variable-layer-height-function_1750), capturado 2026-10-08

- La altura de capa variable puede resultar en tiempos de impresión significativamente más cortos con un sacrificio mínimo de calidad de impresión.
  > Cita: "This can result in significantly shorter print times with minimal sacrifice to the print quality."
  — [Prusa Knowledge Base](https://help.prusa3d.com/article/variable-layer-height-function_1750), capturado 2026-10-08

- La altura de capa variable se puede configurar automáticamente, manualmente, o combinando ambos flujos de trabajo.
  > Cita: "The variable layer height can be set up either automatically, manually or you can combine the two workflows together."
  — [Prusa Knowledge Base](https://help.prusa3d.com/article/variable-layer-height-function_1750), capturado 2026-10-08

- Los perfiles de altura de capa variable también cambian otras cosas además de la altura de capa; por ejemplo, las capas altas obtienen extrusión más ancha.
  > Cita: "the profiles also change other things except for just the layer height - tall layers get wider extrusion, for example."
  — [Prusa Knowledge Base](https://help.prusa3d.com/article/variable-layer-height-function_1750), capturado 2026-10-08

- Un perfil de altura de capa "promedio" (p. ej. perfil de 0,15 mm para boquilla de 0,4 mm) probablemente funcione bien para la mayoría de los casos.
  > Cita: "A good 'average' layer height profile (e.g. 0.15 mm layer height profile for 0.4 mm nozzle) will most likely also work well for most cases."
  — [Prusa Knowledge Base](https://help.prusa3d.com/article/variable-layer-height-function_1750), capturado 2026-10-08

- Para modelos con cima esférica o pendiente, la superficie impresa puede no ser lo suficientemente suave y la sensación de "escalera" es más evidente.
  > Cita: "for some special models, such as models with a spherical top or slope, the printed surface may not be smooth enough, and the 'ladder feeling' on the surface of the model is more obvious."
  — [Bambu Lab Wiki](https://wiki.bambulab.com/en/software/bambu-studio/adaptive-layer-height), capturado 2026-10-08

- Con la misma altura de capa, cuanto mayor es la pendiente, más suave es la superficie del modelo.
  > Cita: "for the same layer height, the larger the slope, the smoother the surface of the model."
  — [Bambu Lab Wiki](https://wiki.bambulab.com/en/software/bambu-studio/adaptive-layer-height), capturado 2026-10-08

- El rango de altura de capa variable está dentro de los límites de altura de la configuración de la impresora; para boquilla de 0,4 mm el rango es 0,08–0,28 mm.
  > Cita: "The height range of variable layer height is in the height limits of the printer settings, for example, the height range of 0.4 nozzle is 0.08-0.28 mm."
  — [Bambu Lab Wiki](https://wiki.bambulab.com/en/software/bambu-studio/adaptive-layer-height), capturado 2026-10-08

- Es mejor no modificar el rango de altura de capa variable.
  > Cita: "you had better not modify it."
  — [Bambu Lab Wiki](https://wiki.bambulab.com/en/software/bambu-studio/adaptive-layer-height), capturado 2026-10-08

- Al arrastrar el triángulo hacia "detail", el modelo impreso tiene mayor precisión y más partes se configuran automáticamente con alturas de capa más bajas.
  > Cita: "If you drag a small triangle closer to 'detail', it indicates that the printed model has higher accuracy, and it will automatically set more parts of the model to lower layer heights."
  — [Bambu Lab Wiki](https://wiki.bambulab.com/en/software/bambu-studio/adaptive-layer-height), capturado 2026-10-08

- El modo suavizado usa un filtro gaussiano; el radio se refiere al ancho del filtro gaussiano.
  > Cita: "The radius refers to the width of the Gaussian filter."
  — [Bambu Lab Wiki](https://wiki.bambulab.com/en/software/bambu-studio/adaptive-layer-height), capturado 2026-10-08

- "Keep min" preserva la altura mínima durante el suavizado.
  > Cita: "the minimum height (the green part) will not be changed, that is, the minimum height will remain the original value when smoothing the curve."
  — [Bambu Lab Wiki](https://wiki.bambulab.com/en/software/bambu-studio/adaptive-layer-height), capturado 2026-10-08

- La prime tower solo se puede habilitar si la altura de capa variable de todos los objetos de la placa es la misma.
  > Cita: "the prime tower can be enabled only if the variable layer height of all objects in the plate is the same."
  — [Bambu Lab Wiki](https://wiki.bambulab.com/en/software/bambu-studio/adaptive-layer-height), capturado 2026-10-08

- La altura de capa variable no es compatible con los soportes orgánicos (organic tree supports).
  > Cita: "Variable layer height is also not supported with organic tree supports."
  — [Bambu Lab Wiki](https://wiki.bambulab.com/en/software/bambu-studio/adaptive-layer-height), capturado 2026-10-08

### Límite inferior de altura de capa

- Prusa no sugiere bajar de 0,10 mm porque la mejora en calidad con capas de 0,07 o 0,05 mm es relativamente menor con tiempos de impresión significativamente más largos.
  > Cita: "Generally, we do not suggest going lower than 0.10 mm as the improvement in print quality with 0.07 or 0.05 mm layers is relatively minor with significantly longer print times."
  — [Prusa Knowledge Base](https://help.prusa3d.com/article/layers-and-perimeters_1748), capturado 2026-10-08

## Contradicciones

### Límite superior de altura de capa como porcentaje del diámetro de boquilla

- 20 %–70 % del diámetro de boquilla — [Bambu Lab Wiki](https://wiki.bambulab.com/en/software/bambu-studio/layer-height), capturado 2026-10-08
- < 80 % del diámetro de boquilla — [Prusa Knowledge Base](https://help.prusa3d.com/article/layers-and-perimeters_1748), capturado 2026-10-08

**Se contradicen.** Bambu da un rango razonable de 20 %–70 % (para boquilla de 0,4 mm: 0,08–0,28 mm). Prusa da un límite máximo del 80 % (para boquilla de 0,4 mm: ~0,32 mm). No son lo mismo y no se promedian: Bambu habla del rango óptimo de calidad, Prusa del límite técnico que el slicer acepta. **El redactor tiene que explicar el matiz, no elegir un número.**

### Límite inferior de altura de capa

- Bambu: el rango razonable empieza en el 20 % del diámetro (0,4 mm → 0,08 mm).
- Prusa: no sugiere bajar de 0,10 mm.

**Se contradicen parcialmente.** Bambu permite 0,08 mm con boquilla de 0,4 mm; Prusa recomienda no pasar de 0,10 mm. La diferencia puede deberse a que Bambu habla del rango que la impresora puede producir y Prusa de la relación calidad/tiempo recomendada. **El redactor tiene que explicar el matiz, no elegir un número.**

## Sin respaldo

Ninguna. Las cuatro fuentes son documentación oficial de fabricante (Bambu Lab y Prusa Research), que son fuentes primarias y no necesitan marca de respaldo.

## Tirado

- **Primera capa:** la altura de primera capa (50 % del diámetro en Bambu, 0,20 mm en Prusa) está fuera del alcance de esta guía → `adhesion-primera-capa`.
- **Perímetros y grosor de pared:** la relación entre perímetros, grosor de pared ideal y solapamiento de extrusiones no es altura de capa.
- **Modo jarrón (spiral vase):** no es altura de capa.
- **Capas sólidas superior/inferior:** no es altura de capa.
- **Ensure vertical shell thickness:** no es altura de capa.
- **Avoid crossing perimeters:** no es altura de capa.
- **Detect thin walls:** no es altura de capa.
- **Thick bridges:** no es altura de capa.
- **External perimeters first:** no es altura de capa.
- **Fill gaps:** no es altura de capa.
- **Perimeter generator (Arachne vs Classic):** no es altura de capa.
- **Only one perimeter:** no es altura de capa.
- **Lógica de redondeo de capas (Bambu):** detalle de implementación del slicer, no una afirmación sobre altura de capa.
- **Precise Z height (Bambu):** característica específica de Bambu Studio 1.9, no una afirmación general sobre altura de capa.
- **Navegación, menús, migas de pan, anuncios, banners:** relleno estándar.
- **Imágenes:** marcadas como "(imagen)" porque el webfetch no las descarga; no son afirmaciones.

## Relaciones

| Concepto | Se relaciona con | Cómo |
|---|---|---|
| altura de capa | boquilla (diámetro) | el diámetro de la boquilla pone el techo: Bambu 20–70 %, Prusa < 80 % |
| altura de capa | resolución vertical | a menor altura, mayor finura; solo afecta a Z, no a XY |
| altura de capa | tiempo de impresión | a menor altura, más capas y más tiempo |
| altura de capa | resistencia | Prusa: la resistencia la definen los perímetros, no la altura de capa |
| altura de capa variable | altura de capa | es una función del slicer que varía la altura según la zona del modelo |
| altura de capa variable | tiempo de impresión | permite usar capas altas donde no se necesita detalle, ahorrando tiempo |
| altura de capa variable | pendiente de la superficie | a mayor pendiente, más suave la superficie con la misma altura de capa |
| altura de capa variable | prime tower | la prime tower solo funciona si todos los objetos tienen la misma altura variable |
| altura de capa variable | soportes orgánicos | no es compatible con organic tree supports |
