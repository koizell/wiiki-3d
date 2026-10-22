---
titulo: Esquinas levantadas en PETG (warping)
tema: esquinas-petg
fuentes:
  - wiki/raw/esquinas-petg-orcaslicer-wiki-material-temperatures.md
  - wiki/raw/esquinas-petg-prusa-kb-filament-material-guide.md
  - wiki/raw/esquinas-petg-prusa-kb-warping.md
  - wiki/raw/esquinas-petg-bambu-wiki-printed-model-warping.md
  - wiki/raw/esquinas-petg-prusament-petg.md
  - wiki/raw/esquinas-petg-bambu-wiki-warping-falling-off-collapsing.md
  - wiki/raw/esquinas-petg-bambu-wiki-filament-guide-material-table.md
  - wiki/raw/esquinas-petg-prusa-forum-optimal-enclosure-temps.md
cocinado: 2026-10-16
revisado: 2026-10-21
---

## Afirmaciones

### Diagnóstico: no todo "esquina que sube" es el mismo fallo

- Un defecto de esquina levantada es **corner warping**: los bordes o esquinas se curvan hacia arriba durante la impresión, a veces con una línea horizontal en la pared donde la boquilla volvió a golpear la capa levantada. [Bambu Lab Wiki, *Model Warping, Falling Off, or Collapsing*](https://wiki.bambulab.com/en/filament-acc/filament/print-quality/warping-falling-off-collapsing), capturado 2026-10-16
- **Bed adhesion failure** es distinto: la pieza entera se desplaza, resbala o salta de la cama a mitad de la impresión. No es warping; tocar ajustes de warping no lo resuelve. [Bambu Lab Wiki, *Model Warping, Falling Off, or Collapsing*](https://wiki.bambulab.com/en/filament-acc/filament/print-quality/warping-falling-off-collapsing), capturado 2026-10-16
- **Structural collapse** es distinto también: nido de filamento en la parte superior o capas superiores desplazadas respecto a la base. [Bambu Lab Wiki, *Model Warping, Falling Off, or Collapsing*](https://wiki.bambulab.com/en/filament-acc/filament/print-quality/warping-falling-off-collapsing), capturado 2026-10-16
- El warping pequeño puede pasar desapercibido pero aún causar defectos visibles en paredes y capas superiores, por lo que se confunde con problema de extrusión o flujo. [Bambu Lab Wiki, *Model Warping, Falling Off, or Collapsing*](https://wiki.bambulab.com/en/filament-acc/filament/print-quality/warping-falling-off-collapsing), capturado 2026-10-16

### Temperatura de cama para PETG

- PETG: cama 60–80 °C en la tabla oficial de Bambu Lab (glue stick o liquid glue, mismo rango). [Bambu Lab Wiki, *Filament guide — material table*](https://wiki.bambulab.com/en/general/filament-guide-material-table), capturado 2026-10-16
- PETG: cama 70–90 °C según la guía de materiales de Prusa. [Prusa Knowledge Base, *Filament Material Guide*](https://help.prusa3d.com/filament-material-guide), capturado 2026-10-16
- Prusament PETG: cama 80 ± 10 °C (es decir, 70–90 °C). [Prusament PETG](https://prusament.com/materials/prusament-petg/), capturado 2026-10-16
- En la tabla por placa de Bambu: PETG/PETG HF/PETG Translucent = 60–80 °C en Engineering Plate, Smooth PEI/High-Temp y Textured PEI; **Cool Plate no recomendada**. [Bambu Lab Wiki, *Filament guide — material table*](https://wiki.bambulab.com/en/general/filament-guide-material-table), capturado 2026-10-16
- Cama demasiado baja → el filamento no adhiere bien, warping, adhesión entre capas débil o desprendimiento total; cama demasiado alta → deformación tipo elephant foot. La mayoría de materiales toleran un rango de ±5 °C. [OrcaSlicer Wiki, *Material Temperatures*](https://www.orcaslicer.com/wiki/material_settings/filament/material_temperatures.html), capturado 2026-10-16
- Acción directa frente a esquinas levantadas: aumentar la temperatura de cama +5 a +10 °C. [Bambu Lab Wiki, *Model Warping, Falling Off, or Collapsing*](https://wiki.bambulab.com/en/filament-acc/filament/print-quality/warping-falling-off-collapsing), capturado 2026-10-16
- Si la habitación está por debajo de 20 °C: +10 °C adicionales en la cama, sobre todo en impresoras abiertas (Bambu A1). [Bambu Lab Wiki, *Printed Model Warping*](https://wiki.bambulab.com/en/knowledge-sharing/printed-model-warping), capturado 2026-10-16
- PETG extrusor/hotend: 240–270 °C según Bambu, 215–270 °C según Prusa, 250 ± 10 °C según Prusament. [Bambu Lab Wiki, *Filament guide — material table*](https://wiki.bambulab.com/en/general/filament-guide-material-table); [Prusa KB, *Filament Material Guide*](https://help.prusa3d.com/filament-material-guide); [Prusament PETG](https://prusament.com/materials/prusament-petg/), capturado 2026-10-16
- Recinto cerrado y cama caliente (PETG): la **regla ②** de «Chamber Temperature Control Based on Filament Softening Temperature» recomienda abrir la puerta frontal y/o quitar la tapa de cristal superior **cuando la cama está por encima de 60 °C** —PETG es un filamento con temperatura de reblandecimiento de 60–80 °C—, para que el calor de la cámara no reblandezca ni deforme el filamento dentro del extrusor. La propia regla matiza el papel del ambiente: con ambiente alto la cámara sube más y el consejo es más necesario; con ambiente bajo la cámara suele estar más fresca y hace menos falta. [Bambu Lab Wiki, *Filament guide — material table*](https://wiki.bambulab.com/en/general/filament-guide-material-table), capturado 2026-10-16
- Otra cifra de la misma fuente, con otro significado: la columna «Upper Glass Cover Plate Removal?» de la tabla por placa marca, en las filas PETG / PETG HF / PETG Translucent (cama 60–80 °C), «If bed > 70 °C, Recommended». Ese **70 °C es la condición de esa columna** —una recomendación por fila de material—, y no el umbral de la regla ②, que es 60 °C. [Bambu Lab Wiki, *Filament guide — material table*](https://wiki.bambulab.com/en/general/filament-guide-material-table), capturado 2026-10-16

### Temperatura de cama: placa y nivelación

- En la Textured PEI Plate, la impresora baja la boquilla 0,04 mm automáticamente tras la nivelación de cama para garantizar la adhesión de la primera capa. Si se imprime en PEI texturizada pero se selecciona otro tipo de placa en el slicer, se desactiva ese offset y la primera capa queda demasiado alta. [Bambu Lab Wiki, *Printed Model Warping*](https://wiki.bambulab.com/en/knowledge-sharing/printed-model-warping), capturado 2026-10-16
- PETG/PC: bajar demasiado el Live Adjust Z mejora la adhesión pero puede dañar la superficie PEI. [Prusa Knowledge Base, *Warping*](https://help.prusa3d.com/article/warping_2011), capturado 2026-10-16
- PETG tiene adhesión fuerte a la cama; conviene tener cuidado al despegar. IPA puede dejar la adhesión demasiado fuerte; limpiar con limpiacristales o agua con detergente cuando la cama está fría. [Prusament PETG](https://prusament.com/materials/prusament-petg/), capturado 2026-10-16

### Ventilación (fan)

- Mantener la ventilación apagada en las primeras 3 capas para la mayoría de filamentos (PLA, PETG, TPU, etc.) mejora la adhesión y el enfriamiento lento de las capas, evitando warping y fallos. [Bambu Lab Wiki, *Printed Model Warping*](https://wiki.bambulab.com/en/knowledge-sharing/printed-model-warping), capturado 2026-10-16
- Ventilador auxiliar: valor recomendado 40–50 %, recomendable bajarlo a ~20–30 % si hay warping; el ventilador auxiliar alto enfría las paredes exteriores demasiado rápido. [Bambu Lab Wiki, *Printed Model Warping* / *Model Warping, Falling Off, or Collapsing*](https://wiki.bambulab.com/en/knowledge-sharing/printed-model-warping), capturado 2026-10-16
- PETG necesita mucho cooling: si las esquinas se levantan, comprobar que el ventilador de pieza esté activo y valorar aumentar su velocidad; verificar que no esté obstruido ni fundido. [Prusa Knowledge Base, *Warping*](https://help.prusa3d.com/article/warping_2011), capturado 2026-10-16
- Aumentar demasiado la velocidad del ventilador puede levantar el objeto entero y reducir la adhesión entre capas; si eso ocurre, subir la temperatura de boquilla para recuperar la unión entre capas. [Prusa Knowledge Base, *Warping*](https://help.prusa3d.com/article/warping_2011), capturado 2026-10-16
- Prusament PETG: ventilador de pieza requerido al 50 %; primeras capas sin ventilador para prevenir warping, media potencia después. Si se busca la máxima resistencia, imprimir sin ventilador (mayor adhesión entre capas). [Prusament PETG](https://prusament.com/materials/prusament-petg/), capturado 2026-10-16
- PETG tiene baja expansión térmica y raramente se levanta de la cama; PETG y PETG-CF/GF no son propensos a warping y no exigen temperatura ambiente obligatoria, salvo la nota: en cámara cerrada y ambiente frío, conviene no bajar la resistencia entre capas. [Bambu Lab Wiki, *Filament guide — material table*](https://wiki.bambulab.com/en/general/filament-guide-material-table), capturado 2026-10-16

### Ambiente y recinto

- PETG figura en la lista de filamentos que warpean con más facilidad que PLA (junto con ABS, ASA, PA, PC), porque son materiales de mayor temperatura. [Bambu Lab Wiki, *Printed Model Warping*](https://wiki.bambulab.com/en/knowledge-sharing/printed-model-warping), capturado 2026-10-16
- Si la habitación está por debajo de 20 °C, aparecen problemas de warping incluso con PLA y PETG, que son materiales más permisivos. [Bambu Lab Wiki, *Printed Model Warping* / *Model Warping, Falling Off, or Collapsing*](https://wiki.bambulab.com/en/knowledge-sharing/printed-model-warping), capturado 2026-10-16
- Corrientes de aire enfrían el modelo más rápido y aumentan la tensión entre capas; conviene bloquear el flujo de aire alrededor de la impresora. [Bambu Lab Wiki, *Model Warping, Falling Off, or Collapsing*](https://wiki.bambulab.com/en/filament-acc/filament/print-quality/warping-falling-off-collapsing), capturado 2026-10-16
- En impresoras cerradas el ventilador de recinto debe estar desactivado (0) para PLA, PETG, TPU y PVA, porque una cámara caliente atasca la boquilla por reblandecimiento del filamento. [OrcaSlicer Wiki, *Material Temperatures*](https://www.orcaslicer.com/wiki/material_settings/filament/material_temperatures.html), capturado 2026-10-16
- PETG en recinto puede no ser buena idea: necesita mucho cooling y es más difícil lograrlo con temperatura ambiente alta. [Prusa Knowledge Base, *Warping*](https://help.prusa3d.com/article/warping_2011), capturado 2026-10-16
- PETG tiene casi no warping y se imprimen grandes objetos sin recinto sin problema; expansión térmica baja. [Prusament PETG](https://prusament.com/materials/prusament-petg/), capturado 2026-10-16
- Las piezas impresas de la impresora son de PETG y se deforman por encima de 40–50 °C de ambiente; por eso el rango de PETG no puede subirse como el de ABS/ASA sin más. [Foro Prusa, *Optimal enclosure temps for PLA, PETG, ABS?*](https://forum.prusa3d.com/forum/original-prusa-i3-mk3s-mk3-user-mods-octoprint-enclosures-nozzles/optimal-enclosure-temps-for-pla-petg-abs), capturado 2026-10-16
- Enclosure para ABS/ASA/PC/PA: 40–50 °C es suficiente para evitar warping; por encima se arriesga deformar piezas PETG de la impresora. [Foro Prusa, *Optimal enclosure temps for PLA, PETG, ABS?*](https://forum.prusa3d.com/forum/original-prusa-i3-mk3s-mk3-user-mods-octoprint-enclosures-nozzles/optimal-enclosure-temps-for-pla-petg-abs), capturado 2026-10-16
- Bambu: para PETG/PETG-CF, un enclose se recomienda cuando la temperatura ambiente es baja, para no perder resistencia entre capas. [Bambu Lab Wiki, *Filament guide — material table*](https://wiki.bambulab.com/en/general/filament-guide-material-table), capturado 2026-10-16

### Tamaño del modelo, relleno y orientación

- Si el tamaño de impresión es grande y la densidad de relleno alta (ej. 60 %, cuando el default es 15 %) y hay warping, hay que ajustarla. Los patrones con más líneas rectas tienden a encoger más; cambiar a Gyroid reduce el riesgo de contracción. [Bambu Lab Wiki, *Printed Model Warping*](https://wiki.bambulab.com/en/knowledge-sharing/printed-model-warping), capturado 2026-10-16
- Modelos planos grandes: Gyroid a ≤25 % de relleno; los patrones Grid y Triangle generan tensión lineal interna; Gyroid se encoge de forma más uniforme. [Bambu Lab Wiki, *Model Warping, Falling Off, or Collapsing*](https://wiki.bambulab.com/en/filament-acc/filament/print-quality/warping-falling-off-collapsing), capturado 2026-10-16
- Piezas estructurales: 5 paredes y ~25 % de relleno; piezas no estructurales: 2 paredes y 15 %; evitar más de 50 % de relleno para reducir la tendencia a encoger. [Bambu Lab Wiki, *Printed Model Warping*](https://wiki.bambulab.com/en/knowledge-sharing/printed-model-warping), capturado 2026-10-16
- El orden de riesgo de contracción (de mayor a menor): PC → PA-CF → PA → ABS → ASA → PETG → PLA. [Bambu Lab Wiki, *Model Warping, Falling Off, or Collapsing*](https://wiki.bambulab.com/en/filament-acc/filament/print-quality/warping-falling-off-collapsing), capturado 2026-10-16
- Para partes duraderas, aumentar el número de perímetros más que el porcentaje de relleno, porque la mayor parte de la resistencia proviene de la pared exterior. [Prusament PETG](https://prusament.com/materials/prusament-petg/), capturado 2026-10-16
- Reducir la velocidad de impresión un 20–30 % y/o reorientar el modelo para que quede tumbado puede estabilizar piezas altas y delgadas. [Bambu Lab Wiki, *Model Warping, Falling Off, or Collapsing*](https://wiki.bambulab.com/en/filament-acc/filament/print-quality/warping-falling-off-collapsing), capturado 2026-10-16
- Para high-warping materials se recomienda usar una falda impresa (draft shield) y un skirt para retener calor alrededor del objeto. [Prusa Knowledge Base, *Warping*](https://help.prusa3d.com/article/warping_2011), capturado 2026-10-16

### Soluciones de adhesión (brim, pegamento, superficie)

- Brim recomendado de 8–10 mm de ancho para esquinas levantadas; brim ears pintadas sólo en las esquinas que levantan (en Bambu Studio, brim pintado + herramienta Brim Ears). [Bambu Lab Wiki, *Model Warping, Falling Off, or Collapsing*](https://wiki.bambulab.com/en/filament-acc/filament/print-quality/warping-falling-off-collapsing), capturado 2026-10-16
- Añadir un brim aumenta la adhesión a la superficie. [Prusa Knowledge Base, *Warping*](https://help.prusa3d.com/article/warping_2011), capturado 2026-10-16
- Si el brim no basta, añadir una pequeña geometría (ej. cilindro diminuto) en la zona problemática. [Prusa Knowledge Base, *Warping*](https://help.prusa3d.com/article/warping_2011), capturado 2026-10-16
- Glue stick aplicado en capa fina y uniforme actúa a la vez de adhesivo y separador, protegiendo la lámina; útil para ABS, ASA, PA, PC y de urgencia. [Prusa KB, *Warping* / Bambu Lab Wiki](https://help.prusa3d.com/article/warping_2011), capturado 2026-10-16
- Superficie: mantenerla libre de grasa; limpiar con IPA 90 %+ o agua jabonosa; lavar con agua tibia y jabón, secar bien; no tocar con las manos desnudas; secar la placa por completo. [Prusa KB, *Warping*; Bambu Lab Wiki](https://help.prusa3d.com/article/warping_2011), capturado 2026-10-16

### Humedad y material

- PETG absorbe humedad; filament húmedo produce sonidos de crujido/popping, superficies rugosas, burbujas, stringing y resistencia reducida; secar antes de reintentar. [Bambu Lab Wiki, *Filament guide — material table*](https://wiki.bambulab.com/en/general/filament-guide-material-table), capturado 2026-10-16
- Secado PETG: 70 °C durante 8 h (horno de secado por explosión) o 65 °C durante 12 h (AMS). [Bambu Lab Wiki, *Filament guide — material table*](https://wiki.bambulab.com/en/general/filament-guide-material-table), capturado 2026-10-16

## Contradicciones

### Rango de cama para PETG

- Bambu Lab: **60–80 °C** (tabla por placa y por combinación de glue). [Bambu Lab Wiki, *Filament guide — material table*], capturado 2026-10-16
- Prusa: **70–90 °C**. [Prusa KB, *Filament Material Guide*], capturado 2026-10-16
- Prusament: **80 ± 10 °C** (70–90 °C). [Prusament PETG], capturado 2026-10-16

**Se contradicen parcialmente.** Los tres solapan entre 70–80 °C; Bambu da una banda más baja (60–80) y Prusa/Prusament empiezan en 70. La diferencia probablemente viene de que Bambu mide sobre sus placas propias (Engineering/PEI) y Prusament sobre PEI estándar, y del margen de ±5 °C admitido por OrcaSlicer. El redactor debe dar el rango propio de cada fabricante/placa y no aplanar en un solo número.

### Ventilación alta vs baja como causa de esquinas levantadas

- Bambu Lab: un **exceso de cooling** produce warping; sin ventilación en las primeras 3 capas; ventilador auxiliar al 40–50 %, bajarlo a ~20–30 % si hay warping. [Bambu Lab Wiki, *Printed Model Warping* / *Model Warping, Falling Off, or Collapsing*], capturado 2026-10-16
- Prusa KB: PETG **necesita mucho cooling**; si las esquinas se levantan hay que comprobar que el ventilador funcione y **probar a subir** su velocidad; aumentar demasiado el ventilador puede levantar el objeto entero y reducir adhesión entre capas. [Prusa KB, *Warping*], capturado 2026-10-16
- Prusament: primeras capas sin ventilador para prevenir warping, media potencia después; para máxima resistencia, sin ventilador. [Prusament PETG], capturado 2026-10-16

**Se contradicen en la dirección del ajuste.** Ambas pueden ser ciertas según qué ventilador se toque y qué haya fallado: Bambu habla del **ventilador auxiliar/part cooling alto** enfriando las paredes exteriores demasiado rápido en máquinas cerradas; Prusa habla del **ventilador de pieza** apagado o obstruido en máquinas abiertas. El matiz útil: antes de tocar el fan, comprobar si está activo y sin obstrucciones; si ya está muy alto, bajarlo. El redactor debe explicar el matiz, no elegir un sentido.

### Recinto: recomendado vs no recomendado para PETG

- Bambu Lab: PETG "not prone to warping, no mandatory temperature requirements", pero recomienda enclose cuando la temperatura ambiente es baja para no perder resistencia entre capas. [Bambu Lab Wiki, *Filament guide — material table*], capturado 2026-10-16
- Prusa KB: imprimir PLA o PETG en recinto "might not be a good idea", porque necesitan mucho cooling y es más difícil conseguirlo con temperatura ambiente alta. [Prusa KB, *Warping*], capturado 2026-10-16
- Prusament: PETG tiene baja contracción térmica y se imprime grandes objetos sin recinto sin problema. [Prusament PETG], capturado 2026-10-16

**Se contradicen aparentemente.** El matiz es que los recintos ayudan contra corrientes y ambiente frío, pero una cámara demasiado caliente dificulta el cooling de PETG; además las piezas de la impresora son de PETG y se deforman por encima de 40–50 °C. Conclusión operativa: proteger de corrientes sí, cámara a temperatura ambiente del PETG (20–40 °C) y no más.

### Umbral para abrir la puerta o quitar la tapa en PETG: 60 °C o 70 °C

- Regla ② de «Chamber Temperature Control Based on Filament Softening Temperature»: filamentos con temperatura de reblandecimiento de 60–80 °C (p. ej. PETG), **cuando la cama está por encima de 60 °C** → abrir la puerta frontal y/o quitar la tapa de cristal superior. [Bambu Lab Wiki, *Filament guide — material table*], capturado 2026-10-16
- Columna «Upper Glass Cover Plate Removal?» de la tabla por placa: en las filas PETG / PETG HF / PETG Translucent (cama 60–80 °C), «**If bed > 70 °C**, Recommended». La misma columna da «If bed > 45 °C, Recommended» en las filas PLA, PLA Metal/Wood/Marble, PLA-CF, PVA y TPU. [Bambu Lab Wiki, *Filament guide — material table*], capturado 2026-10-16

**Se contradicen dentro de la misma fuente**, y para la misma acción. La lectura que encaja con los datos: la regla ② se calibra sobre la **temperatura de reblandecimiento del filamento** (60–80 °C en PETG) y pone el listón en el extremo bajo de esa banda, mientras que la columna da un número **por fila de material**, acorde a la banda de cama de esa fila —45 °C en la familia PLA, 70 °C en PETG—. La fuente no explica la diferencia. **El redactor no debe aplanarlo en una sola cifra**: 60 °C es el umbral accionable de la regla, y el 70 °C de la tabla dice hasta dónde la propia tabla sigue considerando aceptable no tocar la tapa. Si se cita uno, hay que decir de dónde sale y qué significa cada uno.

### Brim vs perímetros vs relleno como vía de resistencia

- Bambu: Gyroid ≤25 % para planos grandes; estructurales 5 paredes + ~25 %; evitar >50 %. [Bambu Lab Wiki, *Printed Model Warping* / *Model Warping, Falling Off, or Collapsing*], capturado 2026-10-16
- Prusament: para partes duraderas aumentar perímetros, no porcentaje de relleno, porque la resistencia viene de la pared exterior. [Prusament PETG], capturado 2026-10-16

**No llegan a contradecirse; se complementan pero priorizan distinto.** Bambu da cifras de relleno y patrón; Prusament recomienda perímetros primero. El redactor debe presentar ambos como rutas compatibles, no como alternativas excluyentes.

### Brim "pintado solo en esquinas" (Bambu) vs brim completo (Prusa)

- Bambu: brim de 8–10 mm, o brim ears pintadas sólo en las esquinas que levantan. [Bambu Lab Wiki, *Model Warping, Falling Off, or Collapsing*], capturado 2026-10-16
- Prusa: un brim normal es una buena manera de aumentar la adhesión. [Prusa KB, *Warping*], capturado 2026-10-16

**No se contradicen: es granularidad de la solución.** Brim completo es lo básico; brim ears pintadas es la versión dirigida a esquinas concretas.

## Sin respaldo

- Para objetos grandes de PETG conviene subir la temperatura ambiente unos **10 °C** para prevenir warping. **[UNA SOLA FUENTE — foro, sin corroborar]** [Foro Prusa, *Optimal enclosure temps for PLA, PETG, ABS?*](https://forum.prusa3d.com/forum/original-prusa-i3-mk3s-mk3-user-mods-octoprint-enclosures-nozzles/optimal-enclosure-temps-for-pla-petg-abs), capturado 2026-10-16
- Banda razonable de temperatura de PETG en recinto: **20–40 °C** de ambiente. **[UNA SOLA FUENTE — foro, sin corroborar]** [Foro Prusa, *Optimal enclosure temps for PLA, PETG, ABS?*](https://forum.prusa3d.com/forum/original-prusa-i3-mk3s-mk3-user-mods-octoprint-enclosures-nozzles/optimal-enclosure-temps-for-pla-petg-abs), capturado 2026-10-16
- Con HOTEND V6 (Prusa), por encima de **30 °C** de ambiente aumenta el riesgo de heat creep, sobre todo con muchas retracciones; para PLA se prefiere 20–25 °C. **[UNA SOLA FUENTE — foro, sin corroborar]** [Foro Prusa, *Optimal enclosure temps for PLA, PETG, ABS?*](https://forum.prusa3d.com/forum/original-prusa-i3-mk3s-mk3-user-mods-octoprint-enclosures-nozzles/optimal-enclosure-temps-for-pla-petg-abs), capturado 2026-10-16
- Enfoque concreto de un usuario: PETG con cama a 70 °C, ventilador de escape de recinto arrancando a 45 °C, es decir ~20 °C menos que la cama, y ~1 hora para alcanzar esa temperatura de recinto. **[UNA SOLA FUENTE — foro, sin corroborar]** [Foro Prusa, *Optimal enclosure temps for PLA, PETG, ABS?*](https://forum.prusa3d.com/forum/original-prusa-i3-mk3s-mk3-user-mods-octoprint-enclosures-nozzles/optimal-enclosure-temps-for-pla-petg-abs), capturado 2026-10-16
- PETG "Low warping", temperatura de resistencia 68 °C, y "Strength & Rigid" son claims de marketing del fabricante sin cifra accionable para warping; no se han trasladado al artículo como afirmaciones verificables. **[UNA SOLA FUENTE — página de producto]** [Prusament PETG](https://prusament.com/materials/prusament-petg/), capturado 2026-10-16

## Tirado

- Navegación/migas, "compartir", "suscríbete", enlaces a otros artículos de la wiki ("Related wiki links") y menú de Bambu/Prusa no se han trasladado.
- Productos/tiendas y enlaces de descarga (PDF de seguridad, tech sheet de Prusament) no son relevantes para esquinas levantadas y se han descartado.
- Tablas de compatibilidad (AMS/AMS Lite, boquillas, printers por material), nozzle hardness, y modos de secado AMS han sido tiradas por no aportar nada al fallo de esquinas levantadas; sólo se conserva la cifra de secado de PETG.
- Las cifras de impresión de AMS (compatibilidad de carga/descarga) y el mantenimiento (correas, limpieza de engranajes, PTFE) se han descartado por ser fallos mecánicos ajenos al warping térmico.
- El hilo de foro aportaba mucho ruido sobre PLA, ABS, ASA y heat creep; sólo se conservaron los bloques aplicables a PETG en enclose.
- Claims de marketing (durable, low warping, recyclable, low odor) y listas de pros/cons de Prusament se han tirado salvo la afirmación física accionable (baja expansión térmica, no necesita recinto).
- Las imágenes del artículo se sustituyen por su descripción; no se han incluido en el material cocinado.
- "Las temperaturas óptimas en enclosure son poco por debajo de la cama" (Diem) y "no se necesitan settings especiales con recinto" (BogdanH) se han descartado por ser afirmaciones vagas sin cifra.

## Relaciones

| Concepto | Se relaciona con | Cómo |
|---|---|---|
| esquinas levantadas en PETG | adhesión a la cama | sin adhesión suficiente, la contracción levanta la pieza desde el borde |
| esquinas levantadas en PETG | temperatura de cama | +5 a +10 °C cuando las esquinas se levantan; +10 °C adicionales si la habitación está fría |
| esquinas levantadas en PETG | temperatura ambiente | por debajo de 20 °C ocurre incluso con PLA y PETG, materiales permisivos |
| esquinas levantadas en PETG | corrientes de aire | enfrían un lado más rápido y aumentan la tensión entre capas |
| esquinas levantadas en PETG | tipo de placa | seleccionar mal la placa en el slicer desactiva el offset de 0,04 mm en PEI texturizada |
| esquinas levantadas en PETG | tamaño de pieza y relleno | piezas grandes y relleno alto (60 %) aumentan el riesgo; Gyroid ≤25 % reduce contracción |
| esquinas levantadas en PETG | patrón de relleno | Grid/Triangle generan tensión lineal interna; Gyroid se encoge uniformemente |
| ventilación de primera capa | esquinas levantadas | sin ventilador en las primeras 3 capas la primera capa se enfría más despacio y mejora la adhesión |
| ventilador auxiliar alto | esquinas levantadas | ~40–50 % recomendado; bajarlo a ~20–30 % si hay warping |
| recinto | esquinas levantadas | protege contra corrientes y ambiente frío, pero PETG necesita cooling y no debe superar ~40 °C de ambiente |
| temperatura de reblandecimiento del filamento | temperatura de cama y recinto | la regla ② se dispara por el reblandecimiento del filamento (60–80 °C en PETG), no por la temperatura de la cama: con cama por encima de 60 °C hay que airear la cámara |
| adhesión fuerte de PETG | daño de placa PEI | bajar demasiado el Z o adhesión excesiva puede dañar la superficie; usar glue stick como separador |
| brim | esquinas levantadas | 8–10 mm o brim ears pintadas sólo en las esquinas que levantan |
| humedad del filamento | esquinas levantadas | filamento húmedo da burbujas/stringing y reduce resistencia; secar 70 °C/8 h o 65 °C/12 h (AMS) |
| warping en PETG | warping en PLA | PETG es menos propenso que ABS/ASA/PA/PC pero más que PLA según el orden de riesgo de Bambu |
| esquinas levantadas en PETG | elephant foot | cama demasiado alta genera deformación tipo elephant foot en lugar de warping |
| relleno estructural | esquinas levantadas | 5 paredes + ~25 % de relleno equilibra resistencia y contracción en piezas estructurales |
| corner warping | bed adhesion failure | son fallos distintos; confundirlos lleva a tocar ajustes que no aplican |
| corner warping | structural collapse | son fallos distintos; el colapso es problema mecánico/adhesión global, no térmico local |
