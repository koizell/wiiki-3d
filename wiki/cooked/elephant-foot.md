---
titulo: Elephant foot (pie de elefante) en impresión 3D FDM
tema: elephant-foot
fuentes:
  - wiki/raw/elephant-foot-prusa-kb-elephant-foot-compensation.md
  - wiki/raw/elephant-foot-bambu-wiki-elephant-foot-compensation.md
  - wiki/raw/elephant-foot-orcaslicer-wiki-elephant-foot-compensation.md
  - wiki/raw/elephant-foot-creality-blog-elephant-foot.md
  - wiki/raw/elephant-foot-klipper-docs-probe-calibrate.md
  - wiki/raw/elephant-foot-bambu-wiki-a1-first-layer-too-low.md
  - wiki/raw/elephant-foot-bambu-forum-elephants-foot-mushrooming.md
cocinado: 2026-10-16
---

## Afirmaciones

### Concepto y causa física

- El «elephant foot» es el defecto en el que la base de la pieza (normalmente la capa 1 y a veces las primeras capas) es más ancha que las capas superiores, formando un anillo saliente en el borde inferior. — [Bambu Lab Wiki – Elephant foot compensation](https://wiki.bambulab.com/en/software/bambu-studio/parameter/elephant-foot), capturado 2026-10-16; [Creality – 3D printer elephant foot](https://www.creality.com/blog/3d-printer-elephant-foot), capturado 2026-10-16.
- La causa física nominal: la primera capa se prensa contra la cama caliente, todavía no ha enfriado del todo y sigue blanda, así que se deforma con más facilidad. — [Prusa Research KB – Elephant foot compensation](https://help.prusa3d.com/article/elephant-foot-compensation_114487), capturado 2026-10-16; [Bambu Lab Wiki, íd.](https://wiki.bambulab.com/en/software/bambu-studio/parameter/elephant-foot), 2026-10-16.
- Segunda causa mecánica nominal: el peso de las capas superiores presiona hacia abajo sobre una base que aún no ha fraguado; cuanto mayor es el modelo y más ancha la base, más notorio es el elephant foot. — [Bambu Lab Wiki, íd.](https://wiki.bambulab.com/en/software/bambu-studio/parameter/elephant-foot), 2026-10-16.
- Causas adicionales explícitas (OrcaSlicer): expansión térmica del material; temperatura de la cama demasiado alta; altura/ nivelación de cama inexacta. — [OrcaSlicer Wiki – quality_settings_precision](https://github.com/OrcaSlicer/OrcaSlicer/wiki/quality_settings_precision), capturado 2026-10-16.
- Un ligero elephant foot se tolera en piezas de apariencia; en piezas críticas de tolerancia (ensambles, snaps, rieles, alojamientos de ejes) el reborde de la base afecta directamente el ajuste y puede hacer fallar el ensamble. — [Bambu Lab Wiki, íd.](https://wiki.bambulab.com/en/software/bambu-studio/parameter/elephant-foot), 2026-10-16.

### Compensación software (slicer)

**PrusaSlicer** (fuente primaria, official Prusa):
- El parámetro escala/achica la primera capa en lugar de lijar el borde. — [Prusa Research KB, íd.](https://help.prusa3d.com/article/elephant-foot-compensation_114487), 2026-10-16.
- Disponible solo en modo Advanced o Expert; no aparece en modo Simple. Ruta: Print settings → Advanced → Elephant foot compensation. — íd.
- Valores alrededor de 0,2 mm suelen funcionar para la boquilla por defecto de 0,4 mm. — íd.
- Desde PrusaSlicer 2.2 se detectan automáticamente las líneas finas de la primera capa y se evita sobre-compensarlas. — íd.
- Los perfiles oficiales de Prusa traen el ajuste activado por defecto. — íd.
- Con el ajuste activo, el brim parece desconectado del modelo en la vista previa; en realidad el hueco se rellena con el material aplastado de la primera capa. La conexión «real» del brim al modelo es más débil con el ajuste activo. — íd.
- Si el brim no conecta en la pieza impresa, la compensación está probablemente ajustada demasiado alta. — íd.
- Un efecto secundario de la «Adaptive elephant foot compensation» es la posible distorsión en los puntos donde detalles finos conectan con partes más grandes del modelo, visible sobre todo en la vista previa; solo afecta a la primera capa; si molesta, poner la compensación a 0. — íd.

**Bambu Studio** (fuente primaria, Bambu Lab):
- Ruta del parámetro: Process → Quality → Precision → Elephant foot compensation. — [Bambu Lab Wiki, íd.](https://wiki.bambulab.com/en/software/bambu-studio/parameter/elephant-foot), 2026-10-16.
- El slicer reduce intencionalmente el contorno de la primera capa para que la primera capa impresa se alinee con las capas superiores. — íd.
- El valor por defecto del sistema es adecuado para modelos generales sin alta precisión dimensional; para precisión alta, medir y calcular el valor. — íd.
- Procedimiento de calibración medido: (1) limpiar la placa con agua caliente y jabón; (2) ejecutar Auto Bed Leveling completo y Flow Dynamics Calibration; (3) imprimir pieza de prueba (cubo 25 × 25 × 10 mm o el gauge block «elephant foot») con EFC = 0 y brim = No-brim; (4) esperar a que la cama se enfríe del todo a temperatura ambiente antes de retirar la pieza. — íd.
- Herramienta de medición: calibre digital o micrómetro con resolución mínima de 0,01 mm. — íd.
- Medir en la mitad de cada lado, no en las esquinas (las esquinas se ven afectadas por Flow Dynamics); tocar suavemente con las mordazas el borde escamado de la primera capa. — íd.
- Fórmula de cálculo: desviación X = tamaño de «foot» X − tamaño de referencia X; desviación Y = tamaño de «foot» Y − tamaño de referencia Y; valor de compensación = (desviación X + desviación Y) / 2. — íd.
- Ejemplo del propio wiki: (25,07 − 24,98) = 0,09; (25,11 − 25,00) = 0,11; (0,09 + 0,11) / 2 = 0,10 mm. — íd.
- El valor de compensación varía según el tipo de placa de impresión y no es intercambiable entre tipos de placa: tras cambiar de placa, recalcular. — íd.
- Con la compensación activa, el brim puede verse desconectado del modelo en la vista previa; es normal, el hueco se rellena por el material aplastado. Si el brim-object gap ya está a 0 mm y sigue viéndose un hueco, la compensación es la causa más probable; para que el brim toque al modelo en la vista previa, poner EFC = 0. — íd.
- Definición de brim en la misma fuente: anillo plano extra impreso en la primera capa alrededor de la base del modelo para aumentar el área de contacto con la placa y mejorar la adherencia/evitar warping. — íd.

**OrcaSlicer** (fuente primaria, OrcaSlicer wiki):
- Parámetros: `elefant_foot_compensation` (Float), modo Advanced; `elefant_foot_compensation_layers` (Integer); ejemplo CLI `--elefant-foot-compensation=1`. — [OrcaSlicer Wiki, íd.](https://github.com/OrcaSlicer/OrcaSlicer/wiki/quality_settings_precision), 2026-10-16.
- Mecánica: compensación positiva que achica la primera capa, decreciendo linealmente a lo largo de las N capas especificadas. Se omite por completo cuando se usa raft. — íd.
- Fórmula por capa: `compensation = input_compensation_distance − (input_compensation_distance / input_compensation_layers) × (current_layer − 1)`, para `current_layer ≤ input_compensation_layers`. — íd.
- Regla derivada: capa 1 → 100 % de la compensación; capas intermedias → decrecimiento lineal; capas por encima de N → 0. — íd.
- Ejemplo numérico con distancia 0,25 mm: con 1 capa → solo capa 1 (0,25 mm); con 2 capas → capa 1 (0,25), capa 2 (0,125); con 5 capas → 0,25 / 0,20 / 0,15 / 0,10 / 0,05 mm en capas 1–5. — íd.
- En la vista previa la pieza parece tener una huella más pequeña en la placa; la pieza final (bien calibrada) tiene las dimensiones correctas; por eso el brim puede verse separado del objeto en la vista previa y, aun así, quedar correctamente unido en la impresión real. Con compensación alta puede convenir activar «Brim use EFC outline» para asegurar la unión del brim. — íd.
- «Elephant Foot Compensation Density» (modo Expert, variable `elefant_foot_layers_density`, porcentaje, rango 50 %–100 %, por defecto 100 % = desactivado): reduce la densidad del infill sólido interno en las capas compensadas por encima de la capa base para mitigar ripples y marcas de boquilla. Fórmula `effective_density = 1 − (1 − elefant_foot_layers_density) × (elefant_foot_compensation_layers − (layer_id − 1)) / elefant_foot_compensation_layers`, con `layer_id` empezando en 0 para la capa base. — íd.
- Recomendación práctica del mismo parámetro: empezar con 80–90 % y 1–2 capas de compensación y ajustar por ripples visibles o marcas en capas sólidas bajas. — íd.
- La densidad reducida solo afecta al infill sólido interno dentro de la zona de compensación; no cambia el infill disperso, las superficies superiores ni la capa base. — íd.

**Cura** (según Creality):
- La función «Initial Layer Horizontal Expansion» con un valor negativo (por ejemplo −0,1 mm) hace que la primera capa se imprima dentro de los límites del modelo. — [Creality, íd.](https://www.creality.com/blog/3d-printer-elephant-foot), 2026-10-16.

**Criterio de cuándo usar compensación vs fixes manuales** (según Creality):
- Abultamiento menor, dimensiones no críticas → compensación software o expansión horizontal negativa como fix rápido. — Creality, íd.
- Abultamiento severo, tolerancias ajustadas → centrarse en nivelación, Z-offset y bajada de temperatura de cama. — íd.
- Primer intento con causa incierta → calibrar máquina (nivelación, Z-offset) primero y luego compensación si queda. — íd.
- Materiales que requieren cama alta (ABS, etc.) → fixes mecánicos (enfriamiento, chamfer) antes que compensación, porque el calor es el factor principal. — íd.
- Tras fixes mecánicos → afinar con compensación si queda un abultamiento residual para precisión exacta. — íd.
- Ajustar en pasos pequeños (0,05–0,1 mm) y volver a probar; un exceso puede dejar la base infradimensionada o provocar separación del brim. — Creality, íd.; Prusa KB, íd.

### Z-offset, nivelación y sonda (z_offset / endstop efectivo)

- La causa directa más mencionada: nozzle demasiado cerca de la cama (Z-offset demasiado bajo) aplasta el filamento sobre la placa y hace que la primera capa sobresalga. — [Creality, íd.](https://www.creality.com/blog/3d-printer-elephant-foot), 2026-10-16.
- Si la primera capa está sobrecoplada (oversquished), subir el Z-offset en 0,05–0,1 mm e imprimir de nuevo un patrón de prueba para confirmar que la base no se aplasta en exceso. — Creality, íd.
- Re-nivelar la cama y subir ligeramente el nozzle; camas desiguales producen abultamientos localizados de un lado. — Creality, íd.
- Tom's Hardware (citado por Creality) como aviso: incluso impresoras de gama alta tienen problemas si la cama no está plana. — Creality, íd.
- Primera capa «demasiado baja» (Cama Bambu A1): el defecto se ve como pelado, abultamiento y líneas onduladas en la primera capa. Causas: heatbed leveling no realizado; posición del hotend cambió respecto al nivelado, nozzle más cerca de la cama, extrusión excesiva de la primera capa. — [Bambu Lab Wiki – A1 First Layer Too Low](https://wiki.bambulab.com/en/a1-mini/troubleshooting/print-issues-troubleshooting), capturado 2026-10-16.
- Recomendación Bambu A1: ejecutar bed leveling automático antes de imprimir, especialmente tras cambiar o sustituir la placa PEI. — íd.
- Ajuste sobre la marcha (Bambu A1, solo fix temporal; puede introducir defectos locales y conviene restaurar el default tras corregir la causa raíz): rango `G29.1 Z` de −0,02 ~ 0 mm en placa texturizada y de −0,01 ~ 0,01 mm en placa no texturizada; primera capa demasiado baja → subir el offset (p. ej. de −0,02 a −0,01); demasiado alta → bajarlo (p. ej. de −0,02 a −0,03). — íd.
- Propuesta adicional (Bambu A1): re-apretar los tornillos del heater assembly que sujetan el hotend (3 tornillos M3×10 + 4 tornillos M2×6 con arandela plana y de presión) y comprobar que el clip (buckle) del heater assembly esté bien fijado; si no lo está, el hotend puede desplazarse hacia abajo con la presión de extrusión durante la impresión. Validación: sin movimiento apreciable al mover el hotend manualmente. — íd.
- Klipper — `z_offset` es la distancia entre la boquilla y la cama en el momento en que la sonda dispara; `PROBE_CALIBRATE` la calcula automáticamente sondando y luego haciendo un sondeo manual («paper test»). Guardar con `SAVE_CONFIG`. — [Klipper docs – Probe calibration](https://www.klipper3d.org/Probe_Calibrate.html), capturado 2026-10-16.
- Invalidación de los resultados de `PROBE_CALIBRATE` (y, consecuentemente, del mallado de cama previo): cambios en el sistema de movimiento, posición del hotend, ubicación de la sonda, o en la inclinación de la cama (ajuste de tornillos de cama, `DELTA_CALIBRATE`, `Z_TILT_ADJUST`, `QUAD_GANTRY_LEVEL`, etc.); tras re nivelar hay que repetir `PROBE_CALIBRATE` y `BED_MESH_CALIBRATE`. — íd.
- Repetibilidad de la sonda: normal hasta un paso de Z o 5 µm (.005 mm) de diferencia entre máximo y mínimo sobre 10 sondas; umbral de «sonda no apta» por encima de 25 µm (.025 mm). — íd.
- Sesgo por ubicación (location bias): medir el `z_offset` en varios puntos (esquinas de la cama en cartesianas/CoreXY, torres en delta); si la diferencia min–max supera 25 µm, la sonda no es apta para bed-leveling típico. — íd.
- Sesgo por temperatura (temperature bias): muchas sondas disparan a otra altura según su temperatura; recomendación: hacer bed-leveling a temperatura consistente (siempre en frío o siempre en caliente) y esperar varios minutos tras alcanzar la temperatura; verificar con `PROBE_ACCURACY` en frío y en caliente. — íd.
- Primera capa: el elephant foot no se puede comprobar en el software de laminado; solo se ve en la pieza impresa real. — [Creality, íd.](https://www.creality.com/blog/3d-printer-elephant-foot), 2026-10-16.

### Temperatura de la cama

- Temperatura de cama demasiado alta hace la base «más fluida», se extiende al ser aplastada por el nozzle; bajar la temperatura de la cama en incrementos de ~5 °C y re-probar. — [Creality, íd.](https://www.creality.com/blog/3d-printer-elephant-foot), 2026-10-16.
- Valores indicativos (Creality): PLA 50–60 °C; ABS ~90–100 °C. — íd.
- Aviso Creality: PLA normalmente solo necesita ~60 °C; imprimir con temperaturas muy altas produce una base excesivamente blanda. — íd.
- OrcaSlicer lista «temperatura de cama demasiado alta» entre las causas explícitas del elephant foot. — [OrcaSlicer Wiki, íd.](https://github.com/OrcaSlicer/OrcaSlicer/wiki/quality_settings_precision), 2026-10-16.

### Extrusión, enfriamiento y fixes mecánicos

- Over-extrusión en la primera capa (flow alto o ancho de línea de primera capa alto) hace que la primera capa sobresalga; bajar el flow de la primera capa a 90–100 % o reducir el ancho de línea de la primera capa. — [Creality, íd.](https://www.creality.com/blog/3d-printer-elephant-foot), 2026-10-16.
- Falta de enfriamiento de las primeras capas mantiene la base blanda y la hace sobresalir con el peso de las capas superiores; activar el ventilador pronto (capa 2 o 3 en adelante), con PLA desde el principio; algunos sistemas permiten ~50 % en la primera capa y velocidad completa en la segunda. — íd.
- Brim de 5–10 mm puede distribuir el aplastamiento sobre un área mayor y estabilizar los bordes; no elimina el elephant foot por sí solo. — íd.
- Raft para casos severos: el raft absorbe la deformación y la base del modelo sale plana. — íd.
- Fix de diseño (CAD): añadir un pequeño chaflán o redondeo de 0,5–5 mm a 45° en los bordes de la base para que el abultamiento se asiente en la cara inclinada y no en la base funcional. — íd.
- Certey/Oles: una figura de síntomas y causas probables (bordes inferiores abultados → altura de boquilla baja / temperatura de cama alta / flow alto de primera capa; esquinas redondeadas y caídas → exceso de aplastamiento y peso en esquinas; base inestable → abultamiento o warping; piezas que no encajan → base sobredimensionada; base rugosa o brillante → temperatura de cama alta / material sin solidificar). — íd.

## Contradicciones

### Temperatura de cama: bajar vs subir

- Bajar la temperatura de cama en incrementos de ~5 °C (PLA 50–60 °C, ABS ~90–100 °C) como fix del abultamiento. — [Creality, íd.](https://www.creality.com/blog/3d-printer-elephant-foot), 2026-10-16.
- En el foro de Bambu Lab, un usuario reporta cama a 55 °C en toda la pieza con PLA y propone subirla a 60 °C para el mismo defecto visual. — [Bambu Lab forum – Elephant's foot? Mushrooming?](https://forum.bambulab.com/t/elephants-foot-mushrooming/110247), capturado 2026-10-16.
- **Se contradicen en la dirección del ajuste.** Pueden ser defectos distintos: Creality asume abultamiento por base reblandecida (más calor → reblandecimiento); el hilo del foro es identificado por varios participantes como warping/encogimiento diferencial por humedad de filamento y diferencia de solidificación entre capas, no como primera capa aplastada. Subir la cama en ese caso busca mejorar la adherencia, no reducir un reblandecimiento. **El redactor debe explicar que estos son dos problemas con la misma apariencia aparente y que el ajuste de temperatura va en direcciones opuestas según el diagnóstico real.**

### Compensación por defecto vs «último recurso»

- Los perfiles oficiales de Prusa traen el ajuste activado por defecto. — [Prusa Research KB, íd.](https://help.prusa3d.com/article/elephant-foot-compensation_114487), 2026-10-16.
- Creality presenta la compensación del slicer como el último recurso («if everything else fails») y siempre después de calibrar. — [Creality, íd.](https://www.creality.com/blog/3d-printer-elephant-foot), 2026-10-16.
- **No es contradicción numérica pero sí de expectativa.** Prusa la trata como estándar de perfil y Creality como fallback. **El redactor debe matizar que la compensación es una corrección geométrica del contorno de la primera capa, no una cura de los problemas físicos (nozzle bajo, cama sobrecalentada), por lo que ambas posiciones son compatibles: sirve como estándar cuando la máquina ya está bien calibrada.**

### Alcance temporal: una capa vs varias capas

- Prusa KB: la compensación «scales/shrinks the first layer» (achica la primera capa). — [Prusa Research KB, íd.](https://help.prusa3d.com/article/elephant-foot-compensation_114487), 2026-10-16.
- Bambu Studio: reduce «first-layer contour». — [Bambu Lab Wiki, íd.](https://wiki.bambulab.com/en/software/bambu-studio/parameter/elephant-foot), 2026-10-16.
- OrcaSlicer: fórmula lineal decreciente sobre `elefant_foot_compensation_layers`, con 100 % solo en la capa 1 y compensación a cero en las capas posteriores a N; admite 1, 2 o 5 (u otras) capas compensadas. — [OrcaSlicer Wiki, íd.](https://github.com/OrcaSlicer/OrcaSlicer/wiki/quality_settings_precision), 2026-10-16.
- **Se contradicen aparentemente en el alcance.** El matiz es el parámetro: Prusa y Bambu exponen un valor único que actúa sobre la primera capa (Prusa «adaptive» detecta paredes finas); Orca generaliza a un número de capas configurable y documenta la fórmula. **El redactor no debe presentar «compensación de primera capa» como una única capa ni como N capas sin decir qué slicer y qué parámetro.**

### Conectividad del brim en la vista previa

- Prusa, Orca y Bambu: con EFC activo el brim aparece separado del modelo en la previsualización; en la impresión real el hueco se rellena por el material aplastado y el brim queda unido. Si con brim-object gap = 0 sigue habiendo hueco, la causa más probable es EFC. — [Prusa Research KB, íd.](https://help.prusa3d.com/article/elephant-foot-compensation_114487), 2026-10-16; [Bambu Lab Wiki, íd.](https://wiki.bambulab.com/en/software/bambu-studio/parameter/elephant-foot), 2026-10-16; [OrcaSlicer Wiki, íd.](https://github.com/OrcaSlicer/OrcaSlicer/wiki/quality_settings_precision), 2026-10-16.
- Creality: un brim de 5–10 mm «may stabilise print edges» y distribuye el aplastamiento; no elimina el elephant foot. — [Creality, íd.](https://www.creality.com/blog/3d-printer-elephant-foot), 2026-10-16.
- **No se contradicen en la mecánica, pero sí en el uso recomendado del brim.** Los tres primeros advierten un artefacto de previsualización y recomiendan no alarmarse; Creality lo propone como fix de estabilización. **El matiz: el brim ayuda a la adherencia/estabilización, pero no corrige el reborde, y la separación visible es esperada con EFC.**

### Z-offset: magnitudes de distintos mecanismos

- Creality: subir el nozzle físico en 0,05–0,1 mm, re-imprimir patrón. — [Creality, íd.](https://www.creality.com/blog/3d-printer-elephant-foot), 2026-10-16.
- Bambu A1 (G29.1 Z): texturizada −0,02 ~ 0 mm; no texturizada −0,01 ~ 0,01 mm; bajar/subir según too high/too low. — [Bambu Lab Wiki – A1 First Layer Too Low](https://wiki.bambulab.com/en/a1-mini/troubleshooting/print-issues-troubleshooting), 2026-10-16.
- **No son comparables numéricamente** (ajuste físico del nozzle frente a offset de firmware en la macro `G29.1` para cama texturizada/no texturizada de la serie A1). **El redactor no debe promediar 0,05–0,1 con −0,02 ~ 0 ni presentar un único número de «subir Z offset».**

### Juicio visual vs medición validada

- Creality: «Elephant foot cannot be checked on your slicing software… only visible on your actual print». — [Creality, íd.](https://www.creality.com/blog/3d-printer-elephant-foot), 2026-10-16.
- Bambu Studio: calibración explícita con calibre/micrómetro de ≥0,01 mm, medición en mitad de cada lado y fórmula para obtener el valor. — [Bambu Lab Wiki, íd.](https://wiki.bambulab.com/en/software/bambu-studio/parameter/elephant-foot), 2026-10-16.
- Foro Bambu: el abultamiento visual del medallón es atribuido por tres participantes distintos a warping/encogimiento diferencial, no a primera capa aplastada; un participante mide un desplazamiento ~0,2 mm en capas posteriores y no en la primera. — [Bambu Lab forum, íd.](https://forum.bambulab.com/t/elephants-foot-mushrooming/110247), 2026-10-16.
- **La misma apariencia puede corresponder a causas distintas.** Creality y Bambu promueven inspección visual/medición del borde; el foro ilustra la confusión real (visualmente indistinguible de warping). **El redactor debe enfatizar que el diagnóstico se valida midiendo (dimensiones de referencia vs borde de foot), no solo por apariencia, y que Creality sí exige además calibrar la máquina primero.**

### Compensación activa + brim: separación de brim

- Activar EFC puede dejar el brim visto como separado en el slicer; en la impresión real el material rellena el hueco. — [Prusa Research KB, íd.; Bambu Lab Wiki, íd.; OrcaSlicer Wiki, íd.](https://help.prusa3d.com/article/elephant-foot-compensation_114487).
- Creality: «Over-adjusting compensation […] can make the base undersized or cause brim separation»; ajustar en 0,05–0,1 mm y re-probar. — [Creality, íd.](https://www.creality.com/blog/3d-printer-elephant-foot), 2026-10-16.
- **Matiz:** la separación en previsualización es esperada y se rellena; la separación en la pieza real indica compensación excesiva. Dos fenómenos que se parecen y deben distinguirse.

## Sin respaldo

Todas las siguientes afirmaciones provienen de una única fuente secundaria (foro), sin corroboración independiente; se registran para que el redactor decida si las usa marcadas o las omite.

- Medallón de 63,5 mm (2,5") × 6,35 mm (1/4") de espesor con hinchazón visible en paredes superior e inferior, impresora P1S con puertas y ventilación abiertas, filamento EPAX High Speed PLA «Burnt Titanium» (glitter), ajuste 0,20 mm estándar, sin brim, placa PEI High Temp preparada con agua y jabón Dawn, filamento secado 6 h a 45 °C con desecante, pared externa 3×, velocidades de pared externa/interna 200 mm/s, velocidad volumétrica máxima 23 mm³/s, TorreTemp indicó 215 °C, cama a 55 °C en toda la pieza, generador de pared Arachne, filamento comprado y abierto en 03/2024 guardado en dry box. **[UNA SOLA FUENTE — foro, sin corroborar]** — [Bambu Lab forum, íd.](https://forum.bambulab.com/t/elephants-foot-mushrooming/110247), 2026-10-16.
- El defecto visual del hilo es atribuido por varios participantes (ElektroQuark, JonRaymond, EnoTheThracian) a warping, no a compresión de la primera capa; EnoTheThracian señala que el secado (6 h a 45 °C) ni es largo ni suficientemente caliente y que warping/curling es un indicador típico de filamento húmedo. **[UNA SOLA FUENTE — foro, sin corroborar]** — íd.
- Hipótesis de contracción diferencial: capas que tardan más en imprimirse dejan que las anteriores enfríen y se encojan más, de modo que las capas nuevas acaban ~0,2 mm más grandes; propuesta: imprimir sólido (100 % infill) para eliminar la diferencia entre extremos y centro. **[UNA SOLA FUENTE — foro, sin corroborar]** — íd. (participante NestoriusBIG).
- Una impresión de prueba (disco de 2" × 1/4") con lo que había en la máquina (BL Matte Dark Red, ~1 semana en la máquina, humedad ambiente ~65 %) usando 0,20 mm estándar, solid infill concéntrico y top/bottom rectilineal, no mostró distorsión. **[UNA SOLA FUENTE — foro, sin corroborar]** — íd. (participante SailDesign).
- Dos posibles causas no relacionadas con parámetros de pieza: actualización de firmware 01.07.00.00 introdujo el defecto en todos los modelos y una reversión a 01.06.x lo corrigió (WSDesEng), y la limpieza de placa con agua y jabón y el secado de filamento por sí solos no resolvieron el problema reportado. **[UNA SOLA FUENTE — foro, sin corroborar]** — íd.
- El autor probó limpiar la placa con agua y jabón y con IPA, y considera subir la cama de 55 °C a 60 °C como experimento. **[UNA SOLA FUENTE — foro, sin corroborar]** — íd.

## Tirado

- Menús de navegación, contenidos, migas de pan, botones («submit support ticket», «Bambu AI», «share»), imágenes y capturas sustituidas por sus nombres de archivo, en las siete fuentes.
- Texto de acompañamiento sin datos («We hope this guide has been helpful», «Our customer support team will review your request»), secciones de «End Notes», disclaimer de seguridad.
- Páginas de producto/impresoras a las que se remite desde las fuentes (PEI Plate Cleaning Guide, Flow Dynamics Calibration, wiki de brim, Filament Drying Recommendations) sin el contenido enlazado: solo se conserva la mención de que existe y la necesidad de seguirlo.
- Descripción genérica de «qué es un brim» repetida en Bambu wiki y asumida en Orca: se consolidó una sola definición en Afirmaciones.
- Conversación del foro irrelevante al defecto (ofertas de ayuda, preguntas sobre si el modelo era diseñado por el autor, conversación sobre «hijack» bienvenido, etc.) y posts de respuesta parcial atribuyendo a warping: se consolidaron en las afirmaciones marcadas como sin respaldo.
- Imágenes (diagramas, step-by-step de calibre, screenshots de slicer) no descargadas ni usadas como fuentes de ningún dato: una imagen no es una fuente ni respalda afirmaciones.
- Valores duplicados entre fuentes (creality «Z offset 0,05–0,1 mm» y bambu A1 G29.1) no se promedian: se mantienen separados en Afirmaciones y se anotan como no comparables en Contradicciones.
- Repeticiones de la misma idea física reescrita (primera capa blanda por calor + peso de capas superiores) por tres fuentes: se conserva una afirmación combinada y las otras dos se citan como corroboración.
- Anotado en las notas del recolector: el foro es una única fuente secundaria; el acuerdo entre varios usuarios dentro del mismo hilo no convierte sus respuestas en fuentes independientes.

## Relaciones

| Concepto | Se relaciona con | Cómo |
|---|---|---|
| elephant foot | adhesión a la cama | un borde sobredimensionado por compresión o por warping afecta la estabilidad y la unión de la pieza a la placa |
| elephant foot | temperatura de cama | base reblandecida por calor alto (Creality/Orca) vs mejora de adherencia subiendo la cama (experimentos del foro) |
| elephant foot | Z-offset / nivelación | nozzle demasiado cerca es la causa mecánica más directa del reborde de la primera capa |
| compensación software (EFC) | brim | con EFC activo el brim parece desconectado en el slicer pero se rellena en la impresión real; exceso produce separación real |
| EFC | capas múltiples | Orca aplica compensación lineal decreciente sobre N capas configurables; Prusa/Bambu actúan sobre la primera capa |
| primeras capas | enfriamiento | activar fan pronto solidifica la base antes de recibir el peso de capas superiores |
| abultamiento visual | warping / contracción diferencial | mismo aspecto, causas distintas; distinguir por medición, no por apariencia |
| z_offset | sonda (Klipper) | `PROBE_CALIBRATE`, `PROBE_ACCURACY`, location bias y temperature bias cambian el Z efectivo de la primera capa |
| compensación software | fixes mecánicos | la compensación no cura nozzle bajo ni cama sobrecalentada; se usa tras calibrar o para residuos |