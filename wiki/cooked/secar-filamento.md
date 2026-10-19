---
titulo: Secar filamento
tema: secar-filamento
fuentes:
  - wiki/raw/secar-filamento-prusa-kb-drying-filament.md
  - wiki/raw/secar-filamento-prusa-kb-memmert-uf-oven-drying.md
  - wiki/raw/secar-filamento-prusa-kb-stringing-and-oozing.md
  - wiki/raw/secar-filamento-bambu-wiki-sealed-box.md
  - wiki/raw/secar-filamento-bambu-wiki-common-print-quality-problem.md
  - wiki/raw/material-bambulab-drying.md
cocinado: 2026-10-19
---

# Secar filamento

**Nota de revisión (cocinero, 2026-10-19).** Este fichero se ha corregido después de
`wiki/reviews/secar-filamento-revision-1.md` (veredicto RECHAZADO). Dos de los fallos
bloqueantes de ese informe **nacían aquí**, no en la guía, y se han corregido en el
material cocinado: (a) la lista de lo que la tabla de Prusa no cubría, que excluía el
PC —la tabla **sí** lo tiene, en tres filas—, y (b) una cita entrecomillada de la
tabla de Prusa que no existe en la fuente. Los dos van señalados en el sitio donde
están. **El resto del fichero se conserva tal cual.**

**Advertencia de alcance que manda sobre todo lo demás:** en este fichero **todas las
temperaturas son de secado**, nunca de impresión. Una columna que dice «cama 60–70 °C
para PLA» es la **cama puesta al servicio del secado**, no la temperatura de cama de
impresión: 60–70 °C es irreconciliable con cualquier temperatura de impresión de PLA.
Ver `## Contradicciones` y `## Tirado` para lo que se ha dejado fuera por esto.

## Afirmaciones

### «Higroscópico» no es «está húmedo»: la propiedad y el estado

- Los materiales de impresión FFF son **mayoritariamente higroscópicos**: atraen
  moléculas de agua del ambiente en el que están. Es una **propiedad del material**, no
  un estado del carrete que tiene quien lee. Literal de Prusa: *«The materials used for
  FFF 3D printing are mostly hygroscopic»*.
  — [Prusa Research, Drying filament](https://help.prusa3d.com/article/drying-filament_332086), capturado 2026-10-19
- La **condición** es otra cosa, y Prusa la enuncia aparte: *«a material that has
  gathered humidity might not behave as expected»*. Nadie de este lote afirma que el
  filamento de quien lee esté húmedo.
  — [Prusa Research, Drying filament](https://help.prusa3d.com/article/drying-filament_332086), capturado 2026-10-19
- **No todos los materiales se ven afectados igual.** Prusa, textual: *«PLA, for example,
  doesn't change properties too much by uptaking humidity, whereas Polyamide is affected
  quite significantly»*.
  — [Prusa Research, Drying filament](https://help.prusa3d.com/article/drying-filament_332086), capturado 2026-10-19
- Prusa pide almacenamiento cerrado con material desecante y, si no hay sitio para
  todos, **priorizar los más higroscópicos**: *«prioritize storing filaments that are
  more hygroscopic»*.
  — [Prusa Research, Drying filament](https://help.prusa3d.com/article/drying-filament_332086), capturado 2026-10-19
- Prusa llama **altamente higroscópicos** a poliamida, polipropileno, PVA y BVOH, y
  para esos da dos salidas: *«either ensure they are stored in a dry environment or dry
  them before every print»*.
  — [Prusa Research, Drying filament](https://help.prusa3d.com/article/drying-filament_332086), capturado 2026-10-19
- Bambu, con la misma estructura de propiedad y condición: *«Filament absorbs moisture
  from the air»*, y los defectos **se agravan al subir la humedad ambiente y al
  prolongarse el tiempo de exposición**: *«These issues become more pronounced as
  ambient humidity rises or the filament's exposure time lengthens»*.
  — [Bambu Lab, Filament Drying Recommendations](https://wiki.bambulab.com/en/filament-acc/filament/dry-filament), capturado 2026-10-08
- **Bambu da el criterio de «cuándo hay que secar» sin esperar a ver síntomas:**
  *«if the filament's storage condition is uncertain, it is recommended to dry it
  first»*. La incertidumbre basta.
  — [Bambu Lab, Filament Drying Recommendations](https://wiki.bambulab.com/en/filament-acc/filament/dry-filament), capturado 2026-10-08
- Prusa va más allá y recomienda **evitar tener que secar**: *«It is best to avoid
  having to dry the filament if possible»*.
  — [Prusa Research, Drying filament](https://help.prusa3d.com/article/drying-filament_332086), capturado 2026-10-19

### Cómo se reconoce la humedad

- **La primera señal es la superficie.** Prusa: *«the general first signal will be a
  poor quality of the model surface»*.
  — [Prusa Research, Drying filament](https://help.prusa3d.com/article/drying-filament_332086), capturado 2026-10-19
- **Con alto contenido de agua**, Prusa amplía la lista: *«low layer adhesion, blobs on
  the prints, and bubbling and smoke during extrusion»*.
  — [Prusa Research, Drying filament](https://help.prusa3d.com/article/drying-filament_332086), capturado 2026-10-19
- **El mecanismo, según Bambu:** *«this moisture rapidly vaporizes inside the hot
  nozzle, causing the molten filament to expand, extrude erratically, and form
  bubbles»*, y de ahí salen *«stringing, oozing, holes, rough surfaces, and reduced
  strength»*.
  — [Bambu Lab, Filament Drying Recommendations](https://wiki.bambulab.com/en/filament-acc/filament/dry-filament), capturado 2026-10-08
- **El caso del PETG, con el mecanismo desarrollado:** *«when the water vapor carried by
  the filament passes through the nozzle, it will expand violently due to the heat,
  which causes the melt at the nozzle to expand and spread around»*. Los síntomas que
  Bambu atribuye al PETG húmedo son **boquilla pegajosa, hilos, goteo y superficie
  rugosa** — y la absolución es que se seque el carrete.
  — [Bambu Lab, Common print quality problems](https://wiki.bambulab.com/en/knowledge-sharing/common-print-quality-problem), capturado 2026-10-19
- **Cuanto más material higroscópico, más a menudo hay que secarlo.** Prusa: *«Polyamide,
  PVA, and TPU (Flex) are filaments more often in need of drying than more popular
  filaments like PLA»*.
  — [Prusa Research, Drying filament](https://help.prusa3d.com/article/drying-filament_332086), capturado 2026-10-19
- **La absorción del PETG es baja, pero no nula:** *«Although the water absorption rate
  of PETG filament is relatively low, after exposure to humid air for a certain time,
  the filament will still be damp, and the greater the ambient humidity, the faster the
  filament will be damp»*.
  — [Bambu Lab, Common print quality problems](https://wiki.bambulab.com/en/knowledge-sharing/common-print-quality-problem), capturado 2026-10-19
- **No todo filamento que hace hilos está húmedo.** Prusa lo avisa antes de culpar a la
  humedad: *«Some filaments are naturally more stringy than others. Make sure to compare
  different results from your prints»*.
  — [Prusa Research, Drying filament](https://help.prusa3d.com/article/drying-filament_332086), capturado 2026-10-19

### El diferencial: ¿humedad o ajuste?

**Aquí las dos marcas ordenan las causas al revés, y esa diferencia es el contenido
entero del diferencial.** Ver `## Contradicciones` §4.

- **Bambu pone la humedad la primera** en su apartado de hilos y goteo: *«1. Damp
  filament»*, y detrás la distancia de viaje y la retracción, la temperatura de boquilla
  demasiado alta, los filamentos de baja densidad y el diámetro de boquilla.
  — [Bambu Lab, Common print quality problems](https://wiki.bambulab.com/en/knowledge-sharing/common-print-quality-problem), capturado 2026-10-19
- **Prusa pone la humedad la última**, porque su página es una guía de retracción:
  la causa que enuncia primero es *«very high printing temperatures and/or using
  incorrect retraction settings»*, y la humedad aparece mucho más abajo, en un apartado
  propio («Filament») y como una hipótesis entre otras: *«Try using a different spool
  than the one that is causing the stringing. The filament might have gathered
  moisture, which will cause a lot of stringing»*.
  — [Prusa Research, Stringing and oozing](https://help.prusa3d.com/article/stringing-and-oozing_1805), capturado 2026-10-19
- **La prueba que da Prusa es cambiar de carrete:** si con otro carrete desaparecen
  los hilos, el viejo es el culpable. Es lo que hace su «try using a different spool».
  — [Prusa Research, Stringing and oozing](https://help.prusa3d.com/article/stringing-and-oozing_1805), capturado 2026-10-19
- **La lista completa de causas de hilos que da Prusa**, para que la guía no mande a
  secar cuando el problema es otro: retracción (longitud, velocidad, distancia mínima de
  desplazamiento, retracción al cambiar de capa, wipe al retractar), distancia de
  desplazamiento entre objetos, temperatura de boquilla demasiado alta, material antiguo
  acumulado en la boquilla, disipación térmica del hotend y boquilla desgastada.
  — [Prusa Research, Stringing and oozing](https://help.prusa3d.com/article/stringing-and-oozing_1805), capturado 2026-10-19
- **El caso donde el mismo síntoma tiene dos causas y sólo una se arregla cambiando el
  filamento:** la boquilla pegajosa en PETG. Bambu dice que después de secar, si el
  problema sigue, hay que comprobar si la boquilla está gastada (y cambiarla), y si no
  lo está, ajustar el ratio de flujo a la baja. Es el «si el síntoma no es humedad, que
  se vaya a otra guía» del brief.
  — [Bambu Lab, Common print quality problems](https://wiki.bambulab.com/en/knowledge-sharing/common-print-quality-problem), capturado 2026-10-19
  **Las cifras del ratio (0,93–0,96 recomendado, 0,95 por defecto, 0,93–0,94 como
  ajuste) son de la guía de flujo y no se repiten aquí.** Lo que se conserva es el
  mecanismo, que es lo que hace falta para decidir.
- **El contracara del diferencial: la subextrusión no es un problema de humedad.** En
  el apartado «Under extrusion» de Bambu, las tres familias de causas que da la página
  son resistencia a la extrusión, volumen de extrusión insuficiente y valor de PA mal
  ajustado. **La humedad no aparece en ninguna de las tres.** Quien ve líneas finas y
  huecos va a `flow-rate`, no a secar.
  — [Bambu Lab, Common print quality problems](https://wiki.bambulab.com/en/knowledge-sharing/common-print-quality-problem), capturado 2026-10-19
- **Un caso aparte que sí es de humedad y que el redactor no debe dejar pasar:** el
  filamento de baja densidad (LW-PLA) tiene «more holes and gas (water) in the interior»,
  y por eso la página recomienda secarlo antes de imprimir y bajar el ratio de flujo al
  laminar.
  — [Bambu Lab, Common print quality problems](https://wiki.bambulab.com/en/knowledge-sharing/common-print-quality-problem), capturado 2026-10-19

### La humedad no explica el warping

- **Ninguna fuente de este lote relaciona la humedad con el warping.** La sección de
  warping de Bambu lista como causas el modelo fino y alto con centro de gravedad
  alto, la boquilla rozando la impresión, la adhesión insuficiente a la cama (chapa
  equivocada, nivelado, chapa sucia, brim insuficiente, sin pegamento, cama demasiado
  fría), el tamaño grande con relleno alto, la contracción de los materiales de alta
  temperatura y el desequilibrio entre fuerza de contracción, fuerza magnética y fuerza
  adhesiva. **La humedad no está en esa lista.**
  — [Bambu Lab, Common print quality problems](https://wiki.bambulab.com/en/knowledge-sharing/common-print-quality-problem), capturado 2026-10-19
- Y al revés: **la sección de filamento húmedo de Bambu no incluye esquinas levantadas
  entre sus síntomas** (son boquilla pegajosa, hilos, goteo y superficie rugosa).
  — [Bambu Lab, Common print quality problems](https://wiki.bambulab.com/en/knowledge-sharing/common-print-quality-problem), capturado 2026-10-19
- La única causa que Bambu sí relaciona con el warping en esa página es **térmica**:
  abrir la puerta con cámara demasiado fría *«may cause warping and weaker layer
  adhesion due to excessively low chamber temperature»*.
  — [Bambu Lab, Common print quality problems](https://wiki.bambulab.com/en/knowledge-sharing/common-print-quality-problem), capturado 2026-10-19
- Coherente con lo ya cocinado en `wiki/cooked/warping-pla.md`: chasquidos, burbujas o
  superficie rugosa son el síntoma de **filamento húmedo**, y esa guía manda *«Dry the
  filament before retrying»*, sin hablar de temperatura en ninguna dirección.
  — [Bambu Lab, warping-falling-off-collapsing](https://wiki.bambulab.com/en/filament-acc/filament/print-quality/warping-falling-off-collapsing), vía `wiki/cooked/warping-pla.md`

### La matriz de Bambu: material → método, temperatura y tiempo

**Todo lo de esta tabla es de la misma página**, y cada columna es un método distinto.
Fuente única: [Bambu Lab, Filament Drying Recommendations](https://wiki.bambulab.com/en/filament-acc/filament/dry-filament)
(Appendix I), capturado 2026-10-08.

**Cómo se lee:** `temperatura / tiempo`. La columna **Cama** es la cama usada como
secador —la cama **al servicio del secado**, no la temperatura de cama de impresión—.
«Requerido» / «Recomendado» / «No requerido pero recomendado» es la columna *Drying
Requirement Before Use* del original; «Desecante» es *Desiccant Protection During Use*.

| Filamento | Secado antes de usar | Desecante durante el uso | Cama (H/X/X2D/P2S/P1S) | Horno de convección forzada | AMS 2 Pro | AMS HT |
|---|---|---|---|---|---|---|
| PLA Basic / PLA Matte | Recomendado | No requerido, pero recomendado | 60–70 / 12 h | 50 / 8 h | 45 / 12 h | 45 / 12 h |
| PLA Silk | Recomendado | No requerido, pero recomendado | 65–75 / 12 h | 55 / 8 h | 45 / 12 h | 45 / 12 h |
| PLA-CF / GF | Recomendado | No requerido, pero recomendado | 65–75 / 12 h | 50–60 / 8 h | 45 / 12 h | 45 / 12 h |
| PLA Wood | **Requerido** | **Requerido** | 70–75 / 12 h | 55–65 / 8 h | 45 / 12 h | 45 / 12 h |
| PLA Aero | Recomendado | No requerido, pero recomendado | 60–70 / 12 h | 55 / 8 h | 45 / 12 h | 45 / 12 h |
| PLA Galaxy | Recomendado | No requerido, pero recomendado | 65–75 / 12 h | 55 / 8 h | 45 / 12 h | 45 / 12 h |
| Support for PLA | Recomendado | No requerido, pero recomendado | 65–75 / 12 h | 55 / 8 h | 60 / 12 h | 60 / 12 h |
| Support for PLA/PETG | Recomendado | No requerido, pero recomendado | 65–75 / 12 h | 75 / 8 h | 60 / 12 h | 60 / 12 h |
| **PETG, PETG-CF** | Recomendado | No requerido, pero recomendado | **75–85 / 12 h** | **60–65 / 8 h** | **65 / 12 h** | **65 / 12 h** |
| ABS, ASA | Recomendado | No requerido, pero recomendado | 90–100 / 12 h | 75–85 / 8 h | No compatible | 80 / 8 h |
| ASA-CF, ABS-GF | Recomendado | **Requerido** | 90–100 / 12 h | 80 / 8 h | No compatible | 80 / 8 h |
| ASA Aero | Recomendado | No requerido, pero recomendado | 90–100 / 12 h | 80 / 8 h | No compatible | 80 / 8 h |
| TPU 85A, TPU 90A | **Requerido** | **Requerido** | 90 / 16 h | 70 / 8 h | 65 / 12 h * | 75 / 18 h |
| TPU 95A HF | **Requerido** | **Requerido** | 80–90 / 12 h | 70 / 8 h | 65 / 12 h * | 75 / 18 h |
| TPU for AMS | **Requerido** | **Requerido** | 80–90 / 12 h | 70 / 8 h | 65 / 12 h * | 75 / 18 h |
| PC | **Requerido** | **Requerido** | 90–100 / 12 h | 75–85 / 8 h | No compatible | 80 / 8 h |
| PVA | **Requerido** | **Requerido** | 90–100 / 12 h | 75–85 / 8–12 h | No compatible | 85 / 18 h |
| Support for PA/PET | **Requerido** | **Requerido** | 90–100 / 12 h | 75–85 / 8–12 h | No compatible | 80 / 12 h |
| PA6-CF/GF, PAHT-CF/GF, etc. | **Requerido** | **Requerido** | 90–100 / 12 h | 75–85 / 8–12 h | No compatible | 85 / 12 h |
| PET-CF | **Requerido** | **Requerido** | 90–100 / 12 h | 80 / 8–12 h | No compatible | 80 / 12 h |
| PPA-CF, PPS-CF | **Requerido** | **Requerido** | 110–120 (máx.) / 10–12 h, **«Less effective than a convection oven»** | 100–140 / 8–12 h | No compatible | No compatible |
| Support for ABS | No requerido, pero recomendado | No requerido, pero recomendado | 85–95 / 6 h | 80 / 4 h | No compatible | 80 / 4 h |

\* La propia tabla anota en las tres filas de TPU: *«AMS 2 Pro may not be able to fully
dry TPU— use heatbed or AMS HT instead»*.

**Lo que la tabla no dice, y el redactor no debe suponer:**

- **La columna «cama» es un método de secado, no una temperatura de impresión.** Sus
  60–70 °C para PLA y 90–100 °C para ABS son cifras de cama-secadora.
- **El «voltear a mitad» y la «tapa» sólo aparecen en las filas que los tienen**:
  PLA Basic / PLA Matte y PLA Silk → voltear *«Every 6 hours»*, tapa = caja de
  embalaje del filamento o tapa de PC; Support for ABS → voltear *«Every 3 hours»*. Las
  demás filas llevan «-».
- **La fila de PPA-CF / PPS-CF lleva una advertencia dentro de la celda**: el método con
  cama es *«maximum»* y *«Less effective than a convection oven»*, tanto en temperatura
  como en tiempo. El AMS 2 Pro y el AMS HT son «Not compatible».
- **Ninguna fila da cifras para PA (nylon) sin fibra.** Las de poliamida de Bambu son
  **con fibra**: PA6-CF/GF, PAHT-CF/GF. Ver `## Sin respaldo`.
- **El AMS 2 Pro no da cifras propias para PVA, PET-CF, PC, ABS, ASA ni su familia:**
  son «Not compatible», que es un límite del dispositivo, no una propiedad del
  material. Ver `## Contradicciones` §6 y `## Tirado`.

### La tabla de Prusa: es para materiales Prusament, no para todos

**Advertencia de alcance antes de usarla:** la tabla de Prusa es *«the following
temperatures and times are recommended for the Prusament materials»*.
**No cubre ABS, PA (nylon) sin fibra, TPU de otras marcas, PET-CF ni PVA con cifras
propias.** **El ASA y el PC sí están**, y en filas propias: el ASA en una (80 ºC /
4 h) y el PC en **tres, una por variante de Prusament** (PC Blend 85 ºC / 5 h, PC Blend
Carbon Fiber 90 ºC / 4 h, PC Space Grade 90 °C / 4–6 h). Los doce materiales de la
tabla son PLA/rPLA, Woodfill, PVB, PETG (todas las versiones), TPU, PP CF/GF, ASA,
PC Blend, PC Blend Carbon Fiber, PC Space Grade, PA11 CF y PEI.

**El matiz del ASA y del PC va en `## Contradicciones` §7:** las dos casas secan los
dos materiales y **no con las mismas cifras**. No se promedian.

Fuente: [Prusa Research, Drying filament](https://help.prusa3d.com/article/drying-filament_332086), capturado 2026-10-19.

| Material (Prusament) | Temperatura | Tiempo |
|---|---|---|
| PLA / rPLA | 45 °C | 6 h |
| Woodfill | 45 °C | 6 h |
| PVB | 45 °C | 8 h |
| **PETG (todas las versiones)** | **55 °C** | **6 h** |
| TPU | 60 °C | 4–6 h |
| PP Carbon Fiber / Glass Fiber | 70 °C | 2–4 h |
| ASA | 80 °C | 4 h |
| PC Blend | 85 °C | 5 h |
| PC Blend Carbon Fiber | 90 °C | 4 h |
| PC Space Grade | 90 °C | 4–6 h |
| PA11 Carbon Fiber | 90 °C | 6 h |
| PEI | 150 °C | 8 h |

- **La tabla no asigna método a cada fila.** Es una recomendación por material, y
  debajo la página describe por separado el método «filament dryer», el «oven» y el
  «food dehydrator». **Que el tiempo de una fila sea válido para un horno de cocina es
  una atribución que la fuente no hace.**
- **Prusa no tiene AMS.** El AMS 2 Pro y el AMS HT son aparatos de Bambu: **el tiempo
  de una fila de esta tabla no es un tiempo de AMS**, y el artículo no puede escribir
  «en la AMS, 6 h» como si esa cifra fuera de un aparato de Prusa.
- **Dos advertencias de Prusa sobre la tabla**, textuales: *«It is important not to
  exceed these temperatures while drying the filament, or the filament will soften and
  stick together»* y *«It is important to stick to the recommended drying times to
  prevent overdrying»*.
  — [Prusa Research, Drying filament](https://help.prusa3d.com/article/drying-filament_332086), capturado 2026-10-19
- **Errata tipográfica del original, conservada:** la tabla mezcla «45 ºC» (con «o»
  ordinal) y «45 °C» en filas distintas, y lo mismo con «90 ºC» frente a «90 °C». **Es
  una errata, no dos valores distintos.** No se ha unificado en el crudo y no se
  unifica aquí.

### Métodos: qué permite cada uno y con qué reglas

#### AMS 2 Pro y AMS HT (Bambu)

- **El AMS 2 Pro tiene un techo de 65 °C**, y es un límite del dispositivo: *«Suitable
  for filaments requiring drying temperatures no higher than 65 °C; Some filaments
  require temperatures above 65 °C, and AMS 2 Pro may not fully dry them»*.
  — [Bambu Lab, Filament Drying Recommendations](https://wiki.bambulab.com/en/filament-acc/filament/dry-filament), capturado 2026-10-08
- **El AMS HT cubre todos los filamentos**, pero con salvedad: *«Some materials that
  require high-temperature drying may still not be fully dried, such as PVA, PPS-CF,
  PPA-CF»*.
  — [Bambu Lab, Filament Drying Recommendations](https://wiki.bambulab.com/en/filament-acc/filament/dry-filament), capturado 2026-10-08
- **Cuando se seca ABS en el AMS 2 Pro hay que sacar el PLA**, y la explicación es de
  temperatura, no de incompatibilidad: *«When drying high-temperature filament, you
  need to take out the low-temperature filament. For example, when drying ABS, PLA
  filament cannot be placed in the AMS»*.
  — [Bambu Lab, Filament Drying Recommendations](https://wiki.bambulab.com/en/filament-acc/filament/dry-filament), capturado 2026-10-08
- **El AMS no puede secar mientras la auto-alimentación está corriendo**, para que los
  engranajes no deformen el filamento.
  — [Bambu Lab, Filament Drying Recommendations](https://wiki.bambulab.com/en/filament-acc/filament/dry-filament), capturado 2026-10-08
- **El modo de secado estático no sirve para PLA, PVA, Support for PLA/PETG y TPU**: su
  temperatura de reblandecimiento es baja y las capas se pegan o deforman. El modo de
  rotación es la alternativa que la propia página describe para ese caso.
  — [Bambu Lab, Filament Drying Recommendations](https://wiki.bambulab.com/en/filament-acc/filament/dry-filament), capturado 2026-10-08
- **Al empezar una impresión, la temperatura de secado baja sola** para no atascar el
  AMS: *«the drying temperature is automatically lowered after a print job starts,
  Usually below the filament's softening point»*. Los dos valores que da la página son
  **PLA a 45 °C** (secando PLA mientras se imprime PLA u otro filamento) y **PETG a
  55 °C** (secando PETG mientras se imprime ABS o PETG).
  — [Bambu Lab, Filament Drying Recommendations](https://wiki.bambulab.com/en/filament-acc/filament/dry-filament), capturado 2026-10-08
  **Estos dos números son temperaturas de secado *reducidas*, no la temperatura de
  secado del material.** El 55 °C del PETG sale de aquí, y por eso no es la cifra que
  compite con las de la tabla. Ver `## Contradicciones` §1.
- **El filamento sin bobina hay que montarlo antes en una bobina reutilizable.**
  — [Bambu Lab, Filament Drying Recommendations](https://wiki.bambulab.com/en/filament-acc/filament/dry-filament), capturado 2026-10-08

#### La cama de la impresora usada como secadora (Bambu)

- **El método de cama exige impresora cerrada**: *«P1P / A1 / A2L / A1 mini, as
  open-frame printers, cannot be used to dry filament»*.
  — [Bambu Lab, Filament Drying Recommendations](https://wiki.bambulab.com/en/filament-acc/filament/dry-filament), capturado 2026-10-08
- **El procedimiento completo**, tal cual: descargar el filamento del cabezal; en las
  H/X/X2D/P2S, bajar la cama a la posición de reposo; colocar el filamento en la placa
  y **taparlo con una tapa de material resistente al calor (PA-CF o PC) o con la caja de
  embalaje**; seleccionar material, temperatura y duración; **voltear el carrete a
  mitad** para que el calor sea uniforme; al terminar, **poner la cama a 0 °C y esperar
  a que el carrete se enfríe** antes de retirarlo, con guantes.
  — [Bambu Lab, Filament Drying Recommendations](https://wiki.bambulab.com/en/filament-acc/filament/dry-filament), capturado 2026-10-08
- **El P1S no tiene función de secado**: hay que bajar la cama y fijar la temperatura a
  mano y cronometrar el tiempo. El ejemplo que da la página es ABS a **100 °C** de
  cama, que es coherente con la fila 90–100 de la tabla.
  — [Bambu Lab, Filament Drying Recommendations](https://wiki.bambulab.com/en/filament-acc/filament/dry-filament), capturado 2026-10-08

#### El horno (las dos marcas se separan aquí: ver `## Contradicciones` §3)

- **Bambu recomienda horno de convección forzada** y pone las reglas: la cámara no
  debe ser demasiado pequeña, el carrete **alejado de los elementos calefactores**, y
  las dimensiones mínimas de la cámara para un carrete son **250 mm de fondo × 250 mm
  de ancho × 90 mm de alto**. La bobina reutilizable de Bambu mide 200 mm de diámetro
  exterior y 67 mm de altura.
  — [Bambu Lab, Filament Drying Recommendations](https://wiki.bambulab.com/en/filament-acc/filament/dry-filament), capturado 2026-10-08
- **Bambu prohíbe el microondas y el horno de cocina**, con su razón: *«microwave
  heating is uneven and temperature cannot be controlled; kitchen ovens have very
  uneven heat distribution, and areas near the heating tubes/plates can become
  extremely hot»*.
  — [Bambu Lab, Filament Drying Recommendations](https://wiki.bambulab.com/en/filament-acc/filament/dry-filament), capturado 2026-10-08
- **Prusa permite el horno de casa**, con dos condiciones: *«Home ovens don't have a
  very precise temperature measurement. The fluctuations that do not affect your food
  might damage your filament, especially low-temperature ones like PLA»*, y
  *«make sure to have an external thermometer to correct the temperature if
  necessary»*. La segunda condición es más dura: *«a lot of home ovens cannot be set at
  a temperature low enough to dry the filaments without damaging them. Even if left for
  less time than recommended, high temperatures will damage the filament»*.
  — [Prusa Research, Drying filament](https://help.prusa3d.com/article/drying-filament_332086), capturado 2026-10-19
- **Deshidratador de comida (Prusa):** la adaptación consiste en quitar las bandejas
  entre capas y meter el filamento dentro; *«These dehydrators usually have only low
  temperatures, so check the drying temperature of your filament before purchasing
  one»*.
  — [Prusa Research, Drying filament](https://help.prusa3d.com/article/drying-filament_332086), capturado 2026-10-19
- **Caja secadora dedicada (Prusa):** *«Make sure to check the specifications of the box
  you intend to use to make sure that it matches the drying temperature of your
  filament»*.
  — [Prusa Research, Drying filament](https://help.prusa3d.com/article/drying-filament_332086), capturado 2026-10-19

#### Horno de laboratorio: el procedimiento del Memmert UF (Prusa)

Esta página **no da ninguna temperatura ni tiempo de secado de filamento**: es la guía
de uso del aparato. Remite explícitamente a la otra página de Prusa para los números:
*«For a comprehensive list of recommended drying temperatures and times for various
filament types, consult our dedicated Drying filament article»*.
— [Prusa Research, Drying filament in Memmert UF-series](https://help.prusa3d.com/article/drying-filament-in-memmert-uf-series-universal-oven_913458), capturado 2026-10-19

- **Carga:** hasta **cuatro carretes Prusament de pie**, con espacio entre ellos y
  **sin que toquen las superficies calefactoras** (izquierda, derecha, arriba y abajo).
  Para un solo carrete, también tumbado sobre la rejilla.
  — [Prusa Research, Memmert UF-series](https://help.prusa3d.com/article/drying-filament-in-memmert-uf-series-universal-oven_913458), capturado 2026-10-19
- **Sólo carretes sin su embalaje original:** *«Only insert unwrapped filament spools.
  Do not dry filament in its original packaging»*.
  — [Prusa Research, Memmert UF-series](https://help.prusa3d.com/article/drying-filament-in-memmert-uf-series-universal-oven_913458), capturado 2026-10-19
- **No mezclar materiales en la misma tanda:** *«each material requires different drying
  settings»*.
  — [Prusa Research, Memmert UF-series](https://help.prusa3d.com/article/drying-filament-in-memmert-uf-series-universal-oven_913458), capturado 2026-10-19
- **La compuerta de extracción**, que va del **0 % (cerrada) al 100 % (abierta)** en
  incrementos del 10 %: al 0 % el aire húmedo se retiene y la remoción de humedad es
  peor; al 50 % hay un intercambio equilibrado, *«suitable for most drying processes»*;
  al 100 % hay máximo intercambio de aire.
  — [Prusa Research, Memmert UF-series](https://help.prusa3d.com/article/drying-filament-in-memmert-uf-series-universal-oven_913458), capturado 2026-10-19
- **El ajuste que Prusa da como probado es ventilador al 70 % y compuerta al 30 %**, con
  su alcance explícito: *«These values are not mandatory but have worked well in our
  internal testing. Exact settings may vary depending on material and oven load»*.
  — [Prusa Research, Memmert UF-series](https://help.prusa3d.com/article/drying-filament-in-memmert-uf-series-universal-oven_913458), capturado 2026-10-19
- **El temporizador debe arrancar cuando se alcanza la temperatura objetivo**, no
  cuando se enciende el horno: *«Keep the timer set to start once the target temperature
  is reached (default setting). This ensures accurate drying time»*.
  — [Prusa Research, Memmert UF-series](https://help.prusa3d.com/article/drying-filament-in-memmert-uf-series-universal-oven_913458), capturado 2026-10-19
- **No abrir durante la operación y guantes termorresistentes** al abrir o manipular el
  interior: la cámara alcanza temperaturas que causan quemaduras.
  — [Prusa Research, Memmert UF-series](https://help.prusa3d.com/article/drying-filament-in-memmert-uf-series-universal-oven_913458), capturado 2026-10-19
- **El horno no lo fabrica Prusa**: *«The Memmert UF-series drying oven is a product of
  Memmert GmbH + Co. KG and is not manufactured by Prusa Research»*.
  — [Prusa Research, Memmert UF-series](https://help.prusa3d.com/article/drying-filament-in-memmert-uf-series-universal-oven_913458), capturado 2026-10-19

### Los límites del carrete (Prusa): cuatro cifras distintas, ninguna es del material

**Gate 4: esto es del carrete, no del filamento.** Y hay una trampa de color: el carrete
negro **nuevo** resiste 90 °C y el negro **viejo** sólo 45 °C.

- **Carrete negro viejo (con tapas de plástico prensadas contra el cilindro de cartón):**
  *«The spools can be heated up safely up to 45 ºC»*. Por encima, el plástico se expande
  y expande el cartón, y al enfriar el plástico vuelve a su forma pero el cartón se queda
  expandido: el carrete queda flojo. **La alternativa de Prusa es un tornillo M4×65**
  (rosca de al menos 65 mm, allen de 3,5 mm) que sujete las dos tapas; si se calienta
  por encima de 45 °C, ese tornillo tiene que aguantar el carrete hasta el final de su
  uso.
  — [Prusa Research, Drying filament](https://help.prusa3d.com/article/drying-filament_332086), capturado 2026-10-19
- **Carrete gris viejo (pegado al cartón):** *«The glue added can withstand up to
  90 ºC»*, así que no necesita tornillo si no se supera esa temperatura.
  — [Prusa Research, Drying filament](https://help.prusa3d.com/article/drying-filament_332086), capturado 2026-10-19
- **Carrete negro nuevo:** *«resists drying temperatures as high as 90 °C»*.
  — [Prusa Research, Drying filament](https://help.prusa3d.com/article/drying-filament_332086), capturado 2026-10-19
- **Carrete gris nuevo** (para filamentos de alta temperatura como Prusament PEI 1010):
  *«usable for temperatures reaching 150 °C»*.
  — [Prusa Research, Drying filament](https://help.prusa3d.com/article/drying-filament_332086), capturado 2026-10-19
- **Los carretes nuevos no necesitan preparación previa al secado.**
  — [Prusa Research, Drying filament](https://help.prusa3d.com/article/drying-filament_332086), capturado 2026-10-19
- **El PA11 CF usa el carrete gris viejo y pide Sequedad entre impresiones:**
  *«It is recommended to keep this filament in a dry box between each use, even if the
  filament will be used soon. In case that is not possible, dry the filament before
  each use»*.
  — [Prusa Research, Drying filament](https://help.prusa3d.com/article/drying-filament_332086), capturado 2026-10-19

### Después de secar: el almacenamiento es la mitad del problema

**Reparto de fuentes en este apartado, porque es donde más fácil se mezclan: todas las
cifras de almacenamiento —humedad objetivo, días que aguanta el filamento seco, horas
de reabsorción— son de Bambu.** Prusa publica el **procedimiento** de guardar, y
ninguna cifra. **Una cita de Prusa seguida de las cifras de Bambu es un error de
atribución, no un resumen.** Por eso las cifras y el procedimiento van en bloques
separados, y no en una lista corrida.

#### Las cifras de almacenamiento, y son de Bambu

- **El objetivo de humedad de almacenamiento es por debajo del 20 % RH**, y cuanto más
  baja, más aguanta el filamento seco.
  — [Bambu Lab, Filament Drying Recommendations](https://wiki.bambulab.com/en/filament-acc/filament/dry-filament), capturado 2026-10-08
  **La misma cifra sale también en la página de la caja estanca**
  ([Bambu Lab, Sealed Box](https://wiki.bambulab.com/en/filament-acc/acc/sealed-box),
  capturado 2026-10-19): **es el mismo dato publicado dos veces, no dos fuentes
  independientes.** Se cita una —la de secado— y la otra se menciona como
  corroboración.
- **A 20 % RH el filamento seco aguanta de 2 a 7 días**, según lo higroscópico que sea.
  — [Bambu Lab, Filament Drying Recommendations](https://wiki.bambulab.com/en/filament-acc/filament/dry-filament), capturado 2026-10-08
  (también en la página de la caja estanca: mismo dato, otra publicación)
- **En un interior de ~55 % RH, que es lo habitual, el filamento recién seco absorbe
  humedad suficiente para afectar la calidad en 2 a 12 horas.** El aire abierto suele
  estar entre 45 y 65 % RH, y más en tiempo húmedo.
  — [Bambu Lab, Filament Drying Recommendations](https://wiki.bambulab.com/en/filament-acc/filament/dry-filament), capturado 2026-10-08
  (también en la página de la caja estanca: mismo dato, otra publicación)
- **Termohigrómetro dentro de la caja** para los materiales que absorben con facilidad
  (PA, PA-CF, PAHT-CF, PA6-CF, PA12-CF), con lectura por debajo de 20 % RH.
  — [Bambu Lab, Sealed Box](https://wiki.bambulab.com/en/filament-acc/acc/sealed-box), capturado 2026-10-19
- **Desecante dentro de la caja estanca**, y revisarlo y cambiarlo cuando ya no sea
  eficaz.
  — [Bambu Lab, Sealed Box](https://wiki.bambulab.com/en/filament-acc/acc/sealed-box), capturado 2026-10-19
- **La caja estanca sirve además para alimentar filamento durante la impresión** en
  materiales que no son compatibles con el AMS, como el TPU. Para eso hay que **montar
  unos rodillos dentro de la caja** (Bambu publica el STL) para que el carrete gire sin
  resistencia. La capacidad que recomienda la página es de **4 litros**.
  — [Bambu Lab, Sealed Box](https://wiki.bambulab.com/en/filament-acc/acc/sealed-box), capturado 2026-10-19

#### El procedimiento, en las dos casas (aquí no hay ninguna cifra que atribuir)

- **Bambu, tras secar:** guardar inmediatamente los filamentos sensibles en un
  recipiente sellado o en el AMS con desecantes eficazes, y usarlos lo antes posible.
  — [Bambu Lab, Filament Drying Recommendations](https://wiki.bambulab.com/en/filament-acc/filament/dry-filament), capturado 2026-10-08
- **Prusa da las otras dos formas de guardar:** *«It is best to store your filaments in
  a closed space or box, with some desiccant material in it»*, y **bolsas al vacío con
  desecante dentro**: *«Keep a desiccant in the bag when storing the filament»*.
  — [Prusa Research, Drying filament](https://help.prusa3d.com/article/drying-filament_332086), capturado 2026-10-19
  **La página de Prusa no publica ningún porcentaje de humedad objetivo ni ningún
  plazo:** son dos formas de guardar, no dos cifras.
- **Prusa: en la Prusa XL conviene secar antes de imprimir**, y explica por qué: las
  herramientas inactivas siguen calientes, la humedad se libera dentro de la herramienta
  y produce *«stringing in the toolhead»*, de modo que *«even PLA can absorb enough
  moisture to create printing issues»*. Por eso la XL es más susceptible que una
  impresora de una sola herramienta.
  — [Prusa Research, Drying filament](https://help.prusa3d.com/article/drying-filament_332086), capturado 2026-10-19
- **El paso inmediatamente posterior al secado, en Prusa:** *«After drying, immediately
  transfer the filament spool into the filament dry box and close it to prevent
  reabsorption of moisture»*, y después *«Ensure that the filament path between the dry
  box and printer is not exposed to ambient humidity»*.
  — [Prusa Research, Memmert UF-series](https://help.prusa3d.com/article/drying-filament-in-memmert-uf-series-universal-oven_913458), capturado 2026-10-19

#### El desecante: cómo se sabe si sigue sirviendo

- **El gel de sílice cambia de color:** las perlas amarillas se van poniendo verdes; *«If
  the entire pack appears dark green, it should be replaced with a new one or
  regenerated by drying»*.
  — [Bambu Lab, Filament Drying Recommendations](https://wiki.bambulab.com/en/filament-acc/filament/dry-filament), capturado 2026-10-08
- **Para regenerar el desecante:** no pasar de **100 °C** (por encima se daña la
  estructura de la sílice), y en horno doméstico **80–90 °C durante 1–2 h** si está
  ligeramente húmedo o **2–3 h** si está saturado; las perlas vuelven a naranja al
  enfriar. Con una impresora de cama a **80 °C**, el proceso dura **3–4 h**, porque la
  potencia es menor.
  — [Bambu Lab, Filament Drying Recommendations](https://wiki.bambulab.com/en/filament-acc/filament/dry-filament), capturado 2026-10-08
  **Estas son temperaturas de regeneración del desecante, no de secado del filamento.**
  Confundirlas es el error más fácil de cometer con esta tabla.
- **El gel de sílice se puede regenerar 5–15 veces**, y hay que cambiarlo si el cambio de
  color se ralentiza o las perlas se agrietan. El AMS, el AMS 2 Pro y el AMS HT han
  **eliminado el desecante de cloruro de calcio** y usan sólo gel de sílice.
  — [Bambu Lab, Filament Drying Recommendations](https://wiki.bambulab.com/en/filament-acc/filament/dry-filament), capturado 2026-10-08
- **Criterio de cambio según Prusa (es del dispositivo, no del filamento):** el indicador
  de humedad de la Prusa Pro Filament Drybox **debe volver al 10 %** al cerrar la caja;
  si no vuelve, hay que cambiar el desecante.
  — [Prusa Research, Memmert UF-series](https://help.prusa3d.com/article/drying-filament-in-memmert-uf-series-universal-oven_913458), capturado 2026-10-19

#### Dos materiales con comportamiento propio al.secarse

- **La poliamida se bebe el aire en unos 3 meses** y después **es muy difícil de
  secar**: *«PA-based filaments … absorb a significant amount of moisture when exposed
  to open air for around 3 months. After this level of moisture absorption, it becomes
  very difficult to dry them using a conventional convection oven at 80–90 °C»*. La
  consecuencia que da Bambu es de.preventivo, no de receta: si el filamento no se va a
  usar en mucho tiempo, hay que protegerlo con desecante y guardarlo sellado.
  — [Bambu Lab, Filament Drying Recommendations](https://wiki.bambulab.com/en/filament-acc/filament/dry-filament), capturado 2026-10-08
- **El PC se vuelve quebradizo con ciclos de secado repetidos**, por tensión térmica
  acumulada: *«PC filament may become brittle after repeated "heating–cooling" drying
  cycles»*. No afecta a las propiedades mecánicas de la pieza impresa, pero sí al
  riesgo de rotura del filamento. Bambu avisa de que si ha estado bien protegido puede
  no necesitar secado, o sólo uno corto, para no acumular ciclos.
  — [Bambu Lab, Filament Drying Recommendations](https://wiki.bambulab.com/en/filament-acc/filament/dry-filament), capturado 2026-10-08

### Qué se puede decidir con este corpus (las tres escenas del brief)

1. **PETG recién salido de la caja, con burbujas y chasquidos en la boquilla.**
   **Decidible.** Burbujeo y humo durante la extrusión son señal de agua en el filamento
   según Prusa; Bambu describe el mecanismo y da el remedio para el PETG húmedo
   (secar el carrete). Hay cifras de ambos fabricantes, con su contradicción abierta
   (§1). **Lo que no hay:** ninguna fuente da un criterio para saber si *este* PETG
   concreto está húmedo.
2. **PA (nylon) abierto desde hace cuatro meses, con la pieza rugosa y con hilos.**
   **Parcialmente decidible.** Los hilos no son concluyentes (humedad **o** retracción),
   y la rugosa sí encaja con humedad. Del lado del secado: Bambu dice que a los ~3
   meses la PA ya es muy difícil de secar con horno de convección a 80–90 °C, y ninguna
   fuente da un plazo de caducidad. **Hueco real: ninguna de las dos tablas da
   parámetros para PA sin fibra** (las de Bambu son PA6-CF/GF y PAHT-CF/GF; la de Prusa,
   PA11 Carbon Fiber). Si el PA de quien lee no lleva fibra, la guía **no tiene cifras
   que ofrecerle** y debe decirlo.
3. **PLA de hace un mes, sellado en su bolsa, con líneas finas y huecos.**
   **Decidible, y la respuesta es «no es humedad».** En el apartado de subextrusión de
   Bambu la humedad no aparece entre las causas, y Prusa dice que el PLA *«doesn't
   change properties too much by uptaking humidity»*. Eso es una salida directa a
   `flow-rate`. La matriz de Bambu marca el PLA como *«Recommended»* para secado, no
   *«Required»*, y con desecante *«Not required but recommended»*.

## Contradicciones

**No se resuelven aquí.** Se anotan con su matiz, y el redactor tiene que explicar el
matiz en el artículo en vez de elegir un número.

### 1. La temperatura de secado del PETG: cuatro cifras de Bambu y una de Prusa

Ésta es la contradicción central del tema, y tiene un detalle que hay que entender antes
de escribirla.

- **65–75 °C durante unas 8 horas**, en un *«blast oven»*, como remedio para el PETG
  húmedo. — [Bambu Lab, Common print quality problems](https://wiki.bambulab.com/en/knowledge-sharing/common-print-quality-problem), capturado 2026-10-19
- **55 °C**, del PETG, en la página de secado de Bambu. — [Bambu Lab, Filament Drying Recommendations](https://wiki.bambulab.com/en/filament-acc/filament/dry-filament), capturado 2026-10-08
- **60–65 °C / 8 h** (horno de convección forzada), **65 °C / 12 h** (AMS 2 Pro),
  **65 °C / 12 h** (AMS HT) y **75–85 °C / 12 h** (cama), del PETG, en la tabla de
  secado de Bambu. — [Bambu Lab, Filament Drying Recommendations](https://wiki.bambulab.com/en/filament-acc/filament/dry-filament), capturado 2026-10-08
- **55 °C / 6 h**, para PETG (todas las versiones), en la tabla de Prusa.
  — [Prusa Research, Drying filament](https://help.prusa3d.com/article/drying-filament_332086), capturado 2026-10-19

**El matiz, en tres partes. La segunda es la que evita que el artículo se equivoque.**

1. **El 65–75 °C y el 55 °C no son la misma magnitud, y sólo uno de los dos es una
   temperatura de secado a secas.** El 65–75 °C es el setpoint de secado completo. **El
   55 °C del PETG en la página de Bambu no está en la tabla de secado: está en el
   apartado «Printing While Drying» (§1.4)**, y es la temperatura a la que el AMS
   **baja** la temperatura de secado cuando arranca una impresión, para no atascar el
   extrusor: *«To ensure a stable feeding process and print quality, the drying
   temperature is automatically lowered after a print job starts, usually below the
   filament's softening point»*. Es el mismo apartado el que da 45 °C para el PLA.
   **Publicado como «el PETG se seca a 55 °C» sería falso**: 55 °C es lo que hace el
   AMS *mientras se imprime*, no lo que hay que poner para secarlo. Es el mismo
   apartado el que da 45 °C para el PLA: los dos números salen de §1.4 y ninguno sale
   de la tabla de secado.
2. **Lo que sí es una contradicción real es 65–75 °C frente a 60–65 °C en el horno, y
   frente a 65 °C en el AMS**, todas de Bambu: tres números para el mismo material en
   la misma casa, con métodos distintos. **Y los tiempos tampoco coinciden**: ~8 h en el
   horno de la página de calidad, 8 h en el horno de convección de la tabla, 12 h en el
   AMS. **No se promedian ni se elige uno.** El redactor tiene que publicar la tabla
   por método —que es como el fabricante la da— y, si cita el 65–75 °C de la otra
   página, tiene que decirlo como lo que es: una cifra de una página de diagnóstico,
   no la tabla del fabricante.
3. **El 55 °C de Prusa es una quinta cifra, de otra casa y con otro alcance.** Prusa da
   55 °C / 6 h para PETG en su tabla de Prusament, **sin asignar método a la fila**. Que
   coincida en número con el 55 °C de §1.4 de Bambu es **casualidad**: uno es un
   setpoint de secado y el otro una temperatura reducida durante la impresión. **Si el
   artículo los junta, va a producir un 55 °C que no significa nada.**

**Lo que no se escribe:** un PETG «de 55 a 65 °C», ni un «65 °C es la temperatura
correcta», ni «el 65–75 °C es para PETG y el 60–65 °C para PETG-CF» (la fila de la tabla
de Bambu es «PETG, PETG-CF» juntos, sin distinciones).

### 2. PLA: la misma temperatura y distinto tiempo

- **Prusa: 45 °C / 6 h.** — [Prusa Research, Drying filament](https://help.prusa3d.com/article/drying-filament_332086), capturado 2026-10-19
- **Bambu: AMS 2 Pro 45 °C / 12 h, AMS HT 45 °C / 12 h**, horno de convección forzada
  50 °C / 8 h, cama 60–70 °C / 12 h.
  — [Bambu Lab, Filament Drying Recommendations](https://wiki.bambulab.com/en/filament-acc/filament/dry-filament), capturado 2026-10-08

**El matiz:** la **temperatura coincide** en el AMS (45 °C en las dos casas), así que
ahí no hay contradicción. Lo que no coincide es **el tiempo**: 6 h frente a 12 h para el
mismo material en el mismo dispositivo. Y el horno da 50 °C frente a los 45 °C de la
tabla de Prusa. Como en el caso del PETG, **la tabla de Prusa no dice en qué método se
aplica**, de modo que el 6 h y el 12 h **no se contradicen necesariamente**: pueden ser
el mismo método y un secado más corto, o dos métodos distintos. Lo que el redactor
**no puede hacer** es publicar «el PLA se seca 6 horas» o «12 horas» como si fuera
una verdad única.

### 3. El horno de cocina: Prusa lo permite, Bambu lo prohíbe

- **Prusa: sí se puede, con condiciones.** *«Since most people have an oven at home,
  this seems the easiest way to dry filament»*, seguido de las dos salvedades: los hornos
  domésticos miden mal y sus fluctuaciones *«might damage your filament, especially
  low-temperature ones like PLA»*, hay que usar un **termómetro externo**, y muchos no
  bajan lo suficiente: *«Even if left for less time than recommended, high temperatures
  will damage the filament»*.
  — [Prusa Research, Drying filament](https://help.prusa3d.com/article/drying-filament_332086), capturado 2026-10-19
- **Bambu: no.** *«Do not use a microwave oven or a kitchen oven to dry filaments»*,
  y la razón es la distribución irregular del calor: *«areas near the heating
  tubes/plates can become extremely hot and easily damage the spool or filament»*. Lo
  que Bambu recomienda es un **horno de convección forzada**.
  — [Bambu Lab, Filament Drying Recommendations](https://wiki.bambulab.com/en/filament-acc/filament/dry-filament), capturado 2026-10-08

**El matiz:** **no es un desacuerdo sobre el mismo aparato.** Bambu prohíbe el horno de
cocina y pide convección forzada; Prusa, cuya página además reconoce que el horno
doméstico *«doesn't have a very precise temperature measurement»*, lo admite con
termómetro externo. **El corpus no resuelve cuál seguir.** Lo que sí se puede decir es
que **la posición de Bambu es la más restrictiva y la de Prusa la más permisiva**, y
que las dos fuentes coinciden en una cosa: por encima de la temperatura recomendada el
filamento se estropea (Prusa: *«the filament will soften and stick together»*).

**Lo que no se escribe:** que el horno de cocina sea seguro con termómetro. Lo que
Prusa dice es que hay que comprobar la temperatura, no que el horno sea equivalente al
horno de convección. Y **ninguna fuente asigna un tiempo concreto al horno de
cocina**: la tabla de Prusa da tiempos por material sin método asignado, y los tiempos
de horno de Bambu (8 h) son del horno de convección forzada.

### 4. El orden de las causas de los hilos: la humedad, primero o último

- **Bambu pone la humedad la primera** en su apartado de hilos: *«1. Damp filament»*,
  con la solución de secar y guardar en recipiente hermético con desecante, y detrás el
  resto de causas (distancia de viaje, retracción, temperatura de boquilla, LW-PLA,
  diámetro de boquilla).
  — [Bambu Lab, Common print quality problems](https://wiki.bambulab.com/en/knowledge-sharing/common-print-quality-problem), capturado 2026-10-19
- **Prusa pone la humedad casi la última**, porque su artículo es una guía de retracción:
  la causa declarada al principio es *«very high printing temperatures and/or using
  incorrect retraction settings»*, y la humedad queda en un apartado propio, como una
  hipótesis más: *«Try using a different spool … The filament might have gathered
  moisture, which will cause a lot of stringing»*.
  — [Prusa Research, Stringing and oozing](https://help.prusa3d.com/article/stringing-and-oozing_1805), capturado 2026-10-19

**El matiz:** **las dos páginas son índices de diagnóstico, y cada una ordena según lo
que su página viene a arreglar.** Bambu ordena por *síntoma* (la boquilla pegajosa del
PETG), Prusa por *ajuste* (la retracción). **Que Bambu liste la humedad primero no
significa que la humedad sea la causa más frecuente de los hilos**, y Prusa no dice que
la humedad sea la causa menos frecuente: dice que es una de varias. **El redactor
tiene que publicar las dos listas con su orden y su fuente, y no elegir cuál es «la
primera».** Lo que sí puede decir, porque las dos lo dicen, es que **la prueba
diferencial es cambiar de carrete**.

### 5. TPU: 60 °C frente a 75 °C

- **Prusa: TPU a 60 °C / 4–6 h.** — [Prusa Research, Drying filament](https://help.prusa3d.com/article/drying-filament_332086), capturado 2026-10-19
- **Bambu: cama 80–90 °C / 12 h (90 °C / 16 h en 85A y 90A), horno de convección
  70 °C / 8 h, AMS 2 Pro 65 °C / 12 h, AMS HT 75 °C / 18 h.**
  — [Bambu Lab, Filament Drying Recommendations](https://wiki.bambulab.com/en/filament-acc/filament/dry-filament), capturado 2026-10-08

**El matiz:** los dos son métodos distintos (Prusa no dice cuál), y el rango de Bambu es
muy ancho **dentro de un mismo material**, porque hay tres variantes de TPU con
parámetros distintos. Lo que **no** se escribe es un TPU «a 60–75 °C»: son cifras de
dos fabricantes, con métodos no declarados por una de las partes. **Prusa marca el TPU
como material que necesita secado más a menudo que el PLA**, y Bambu lo marca como
*«Required»* con desecante *«Required»*: ahí los dos coinciden en la necesidad aunque
no en la cifra.

### 6. Un límite de dispositivo que parece un límite de material (gate 4)

No es una contradicción entre fuentes, sino la contradicción que el lector va a
inventarse al leer la tabla de Bambu. Se anota aquí para que no se escriba mal.

- En la tabla de Bambu, **ABS, ASA, ASA-CF, ASA Aero, PC, PVA, Support for PA/PET,
  PA6-CF/GF, PAHT-CF/GF, PET-CF, PPA-CF y PPS-CF aparecen como «Not compatible» en la
  columna del AMS 2 Pro.**
  — [Bambu Lab, Filament Drying Recommendations](https://wiki.bambulab.com/en/filament-acc/filament/dry-filament), capturado 2026-10-08
- La causa está en la misma página, y es el techo del aparato: *«AMS 2 Pro … Suitable
  for filaments requiring drying temperatures no higher than 65 °C»*.
- **Y hay un segundo «not compatible» que es de otra categoría**: en la columna del AMS
  HT, PVA, PPS-CF y PPA-CF son «Not compatible», y en el texto el AMS HT sí puede con
  ellos pero *«may still not be fully dried»*.

**El matiz:** **«el ABS no se puede secar» es falso y no se escribe.** Lo cierto es que
**el AMS 2 Pro no llega a 65 °C** y esos materiales piden en horno temperaturas que van
de 75–85 °C (ABS, ASA, PC, PVA, poliamidas con fibra) a 100–140 °C (PPA-CF,
PPS-CF), así que **el dispositivo no puede**, no el material. Y en el AMS HT, PVA,
PPS-CF y PPA-CF sí caben pero **el aparato no garantiza que queden secos**. Publicar
la tabla con una columna de resultados por método, y el dispositivo como sujeto de la
restricción.

### 7. ASA y PC: las dos tablas los tienen, con cifras distintas

**Este apartado nace de una corrección de alcance.** La lista de lo que la tabla de
Prusa no cubría estaba mal en este mismo fichero —decía que el PC no estaba, y sí
está, en tres filas—, y esa ambigüedad tapaba una contradicción real: **las dos casas
secan el ASA y el PC, y no con las mismas cifras.**

- **ASA.**
  - Bambu: **80 °C / 8 h** en el AMS HT (fila «ABS, ASA»); cama 90–100 °C / 12 h;
    horno de convección forzada 75–85 °C / 8 h.
    — [Bambu Lab, Filament Drying Recommendations](https://wiki.bambulab.com/en/filament-acc/filament/dry-filament), capturado 2026-10-08
  - Prusa: **80 ºC / 4 h**, sin método asignado.
    — [Prusa Research, Drying filament](https://help.prusa3d.com/article/drying-filament_332086), capturado 2026-10-19
- **PC.**
  - Bambu: **80 °C / 8 h** en el AMS HT (fila «PC»); cama 90–100 °C / 12 h; horno de
    convección forzada 75–85 °C / 8 h.
    — [Bambu Lab, Filament Drying Recommendations](https://wiki.bambulab.com/en/filament-acc/filament/dry-filament), capturado 2026-10-08
  - Prusa: **PC Blend 85 ºC / 5 h**, **PC Blend Carbon Fiber 90 ºC / 4 h** y **PC Space
    Grade 90 °C / 4–6 h**, sin método asignado.
    — [Prusa Research, Drying filament](https://help.prusa3d.com/article/drying-filament_332086), capturado 2026-10-19

**El matiz, en tres partes.**

1. **El ASA es el caso limpio: la temperatura coincide y el tiempo no.** 80 °C en las
   dos casas, 4 h frente a 8 h. Es exactamente la forma de la contradicción del PLA
   (§2): como la tabla de Prusa **no asigna método**, sus 4 h **no son un tiempo de
   AMS HT**, y las dos cifras pueden ser el mismo método con dos duraciones distintas
   o dos métodos distintos. **No se promedian y no se escribe «4–8 h».**
2. **El PC no se puede comparar fila a fila, porque ninguna de las dos filas es «el PC»
   de la otra.** La fila de Bambu es «PC» a secas; las de Prusa son **tres variantes de
   Prusament** —PC Blend, PC Blend Carbon Fiber y PC Space Grade—, y cada una tiene su
   cifra. Publicar «el PC se seca a 85 °C» sin decir cuál de las tres es, es el mismo
   error de alcance que se acaba de corregir por el otro lado. **En la comparación más
   estrecha —el AMS HT de Bambu frente a las cifras sin método de Prusa— Prusa da
   temperatura más alta (85 y 90 °C) y tiempo más corto (4–6 h frente a 8 h).**
3. **Lo que una casa puede publicar y la otra no:** Bambu da para el PC y el ASA varias
   columnas —cama, horno de convección y AMS HT—; Prusa da una sola cifra por material
   y sin método. La comparación útil no es «cuál de las dos es la correcta», es «qué
   método está detrás de cada una».

**Lo que no se escribe:** «el ASA se seca 4 h» ni «el ASA se seca 8 h» sin el matiz, ni
un ASA «a 80 °C / 4–8 h»; ni un PC con una sola cifra sin nombrar la variante de
Prusament; ni «la tabla de Prusa no cubre el PC».

## Sin respaldo

Todas las fuentes de este lote son **documentación oficial de fabricante** (Prusa
Research y Bambu Lab), que son fuentes primarias y no necesitan marca de respaldo. Lo que
va en este apartado son las afirmaciones que **el corpus no sostiene** y que el redactor
podría escribir sin darse cuenta, y las extrapolaciones que sí tienen una fuente pero se
le están pidiendo más de lo que dice.

- **Una prueba para saber si tu bobina está húmeda.** **[NO HAY FUENTE EN ESTE LOTE]**
  Ninguna de las seis páginas da una prueba. Lo único cuantitativo que hay es la **humedad
  de almacenamiento objetivo** (< 20 % RH) y el **indicador de humedad de la drybox** (10 %), que son
  criterios de entorno y de dispositivo, **no del filamento**. **No se escribe** la
  prueba de la gota, del chasquido en la boquilla, ni el «saca un metro de filamento y
  comprueba que no cruje».
- **Que secar el carrete arregle las esquinas levantadas.** **[NO SE ESCRIBE]**
  Ninguna fuente de este lote relaciona humedad y warping, y la sección de warping de
  Bambu no incluye la humedad entre sus causas. Ver `## Afirmaciones` §«La humedad no
  explica el warping».
- **Que secar el carrete arregle los hilos o los huecos.** **[NO SE ESCRIBE EN ABSOLUTO]**
  Las dos fuentes que hablan de hilos incluyen la humedad **entre varias** causas, y
  ninguna dice que sea la única. Y en el caso de la subextrusión, Bambu **no incluye la
  humedad** entre las causas.
- **Un plazo máximo entre el secado y la impresión.** **[NO HAY FUENTE]** Bambu dice
  «usar lo antes posible» y da el dato de reabsorción (2–12 h a ~55 % RH), pero ninguna
  fuente da un plazo. **2–12 horas no es un plazo de caducidad**: es el tiempo que
  tarda en absorberse humedad suficiente para afectar la calidad.
- **Qué aspecto tiene un filamento sobreexcluido.** **[NO HAY FUENTE]** Prusa avisa de
  que hay que respetar los tiempos *«to prevent overdrying»* y de que exceder la
  temperatura ablanda y pega el filamento, pero **ninguna fuente describe cómo se ve un
  filamento sobreexcluido**.
- **Cifras de secado para PA (nylon) sin fibra.** **[HUECO DEL CORPUS]**
  Las dos tablas dan poliamida **con fibra**: Bambu, PA6-CF/GF y PAHT-CF/GF; Prusa,
  PA11 Carbon Fiber. **Ninguna fuente da parámetros para PA12, PA6 o nylon sin
  refuerzo.** Si el redactor publica una cifra de PA y no dice que es con fibra, está
  extrapolando. **La guía debe poder decir «para PA sin fibra no hay cifras»**.
- **Aplicar la tabla de Prusa a un filamento que no es Prusament.** **[EXTRAPOLACIÓN]**
  La tabla es *«the following temperatures and times are recommended for the Prusament
  materials»* y no cubre ABS, PA sin fibra, TPU de otras marcas, PET-CF ni PVA con
  cifras propias. Publicarla como tabla de «materiales en general» le añade un alcance
  que la fuente no tiene. **Y publicarla como «no hay cifras de PC», que es falso: el
  PC de Prusa son tres variantes de Prusament.** Ver `## Contradicciones` §7.
- **Publicar las cifras de almacenamiento (20 % RH, 2–7 días, 55 % RH, 2–12 h) bajo
  una cita de Prusa.** **[ATRIBUCIÓN]** Las cuatro cifras son de **Bambu**; Prusa
  publica el procedimiento de guardar y no da ninguna cifra. Una cita de Prusa
  seguida de las cifras de Bambu es un error de atribución, no un resumen.
- **Que el tiempo de la tabla de Prusa sea el tiempo del horno de cocina.** **[LA
  FUENTE NO LO DICE]** La tabla no asigna método a sus filas. Y Bambu, que sí asigna
  métodos, prohíbe precisamente el horno de cocina. **El redactor no puede decir «en el
  horno de casa, PLA 6 h»** salvo que lo marque como una atribución al autor de la tabla.
- **Que «blast oven» y «horno de convección forzada» sean el mismo aparato.**
  **[INFERENCIA]** La página de calidad de impresión de Bambu está escrita como
  traducción automática (dicho por el propio recolector, que señala «blast oven» y
  «ozzing»), y usa *blast oven* donde la tabla usa *forced-air convection oven*. Que
  sean lo mismo es lo más probable —los hornos de convección forzada se llaman así en
  inglés—, pero **ninguna fuente lo dice**. Si el artículo los unifica, lo hace como
  criterio del artículo.
- **El ventilador al 70 % y la compuerta al 30 % del Memmert como ajustes correctos.**
  **[ALCANCE REDUCIDO POR LA PROPIA FUENTE]** Prusa escribe *«These values are not
  mandatory but have worked well in our internal testing»*. **No es un requisito**, es
  el ajuste que a ellos les funciona. Ver también las tres posiciones de compuerta
  (0 %, 50 %, 100 %), que sí están descritas por su efecto.
- **El 10 % de la Prusa Pro Filament Drybox como humedad del filamento.** **[CRITERIO
  DEL DISPOSITIVO]** Es la lectura que debe mostrar el higrómetro de la caja al
  cerrarla, no el contenido de agua del filamento. Si se escribe «el filamento seco
  está al 10 %», es falso.
- **La «humedad residual» de un filamento seco.** **[NO HAY FUENTE]** Ninguna fuente
  da un porcentaje de agua aceptable en el filamento ni una medida para comprobarlo.
- **Que la caja estanca sirva para cualquier material como alternativa al AMS.**
  **[ALCANCE]** La página de Bambu menciona la alimentación durante la impresión para
  materiales **no compatibles con el AMS, como el TPU**, y en ese caso pide rodillos
  dentro. No dice que una caja estanca alimente cualquier material.
- **Que el AMS 2 Pro seque TPU.** **[LO DICE LA TABLA CON SALVEDAD]** La propia celda
  lleva *«AMS 2 Pro may not be able to fully dry TPU— use heatbed or AMS HT
  instead»*. Publicar «TPU: 65 °C en el AMS 2 Pro» sin esa salvedad es falso.
- **Que las cifras de la tabla de Bambu valgan para marcas ajenas.** **[ALCANCE]** La
  tabla es de los filamentos de Bambu. Prusa hace lo propio con los suyos. Publicar
  «PETG: 65 °C / 12 h» sin decir de qué fabricante es el filamento, es publicar una
  cifra más estrecha de lo que parece.

## Tirado

Qué se ha eliminado y por qué. El redactor no usa nada de esto.

**Relleno estándar, ausente en estas fuentes pero excluido por defecto:**

- **Navegación, menús, migas de pan, «compartir», «suscríbete».**
- **Anuncios y banners.**
- **Piezas de producto, precios y enlaces de compra**: *«Where to Buy: Search for
  "*4L sealed box*" on online shopping platforms»*, *«AMS HT purchase link»*, *«AMS 2
  Pro purchase link»*, *«Both models are available on our eshop at prusa3d.com»*, los
  *Purchase links* del apéndice de desecante, la *«Prusa USS Drybox»* y la *«Prusa Pro
  Filament Drybox»* como producto. **Los nombres de los productos sí se conservan**
  cuando son el sujeto de una afirmación («la Prusa Pro Filament Drybox debe volver al
  10 %»), porque en ese caso el nombre identifica el dispositivo al que aplica el dato.
- **Cuestionarios y surveys.** No presentes.
- **Cierres de página de Bambu** («envía un ticket técnico con los logs», «Bambu AI,
  which can instantly answer»), que no son contenido.

**Cifras que son de impresión y salen de aquí (gate 5):**

- **La temperatura de reposo de las herramientas inactivas de la Prusa XL (70 °C).** Es
  temperatura de impresora, no de secado; el recolector lo apontou y está bien apuntado.
  **Lo que sí se conserva** es la afirmación cualitativa: que la XL libera humedad
  dentro de la herramienta y produce hilos en el cabezal, y que por eso recomienda secar
  antes de imprimir.
- **La tabla de materiales de Prusa** (temperaturas de cama y boquilla por material):
  va a `temperatura-cama` y `temperatura-hotend`.
- **La única cifra de temperatura de la página de hilos de Prusa** (bajar la boquilla
  5–10 °C): es de impresión, va a `stringing`.
- **Los 220 °C, 220–240 °C y 250–300 °C** de la página de calidad de impresión de Bambu
  (diagnóstico de boquilla atascada, flush de materiales), y la **punta de calor a
  200 °C** de Prusa para quitar hilos: todas de impresión.
- **El «0,04 mm» de descenso de boquilla tras nivelar en chapa texturizada** y las
  cifras de retracción (2 mm, 3,2 mm, «1,2–1,5 mm, 40–60 mm/s»): van a `placas` y
  `stringing`.
- **Los ratios de flujo** (0,93–0,96, 0,95 por defecto, 0,93–0,94, y el 0,5–0,7 del
  LW-PLA): van a `flow-rate`. **Lo que sí se conserva** es el mecanismo que explica por
  qué el mismo síntoma tiene dos causas y sólo una se arregla cambiando el filamento.

**Apartados enteros de la página de calidad de impresión de Bambu, fuera del alcance
de este tema** (sólo se han usado los dos del diferencial): atasco de extrusor y de
boquilla, primera capa, calidad de voladizos, calidad de puentes, grietas entre capas,
costura, patrón de correa, huecos en la capa superior, brillo desigual y flujo. Todos
ellos van a `flow-rate`, `adhesion-primera-capa`, `voladizos-y-soportes`,
`piezas-grandes-grietas` o `separaciones-entre-capas`.

**Del apartado de warping de Bambu sólo se ha usado la constatación de que la humedad
no aparece entre sus causas.** El resto (brim, chaflán, tipos de chapa, densidad de
relleno) está en `wiki/cooked/warping-pla.md` y `wiki/cooked/placas.md`.

**Otras cosas tiradas:**

- **Las especificaciones del horno Memmert**: 300 °C de temperatura máxima, 32 L y 53 L
  de volumen interno, 585 × 510 × 705 mm y 745 × 584 × 864 mm, 1,6 kW y 2,1 kW. Son
  características del aparato, no del secado del filamento. **El 300 °C no es una
  temperatura de secado de filamento** y no aparece como tal en ninguna parte de este
  fichero.
- **Los requisitos de alimentación del AMS 2 Pro** (que el H2/P2S/X2D alimentan uno
  directamente, que en X1/P1/A2L hace falta adaptador, y la nota del Switching Adapter
  a 24 V 4 A): es información de la máquina, no de cómo secar.
- **La nota «AMS Desiccant Guide» como origen citado del apéndice de desecante**: es
  metadato de la fuente.
- **Los enlaces a otras páginas de wiki** («Filament Storage After Printing», «TPU
  Printing Guide», «How to check which part is clogged», «AMS Desiccant», etc.): son
  navegación. **En particular, la página «Filament Storage After Printing» no está en
  `wiki/raw/`** —no se descargó por no estar bajo los prefijos de ruta permitidos— y
  **no se cita nada de ella**.
- **Los comentarios de las páginas** (29 en la de hilos de Prusa, ninguno capturado en
  las demás).
- **Las imágenes**: sin texto alternativo, marcadas como `[imagen:]`. Ninguna es una
  fuente.
- **Las erratas del original**, conservadas en el crudo y no corregidas aquí: «45 ºC»
  frente a «45 °C» y «90 ºC» frente a «90 °C» en la tabla de Prusa; «ozzing» por
  «oozing», «blast oven», «yourrecent printer logs», «printerand», «Bambu AI,which» y
  «parametes» en las páginas de Bambu. **No se citan como afirmaciones**, pero la
  errata de los grados sí se anota arriba, porque un lector de la tabla podría creer que
  «45 ºC» y «45 °C» son dos valores distintos.

## Relaciones

| Concepto | Se relaciona con | Cómo |
|---|---|---|
| secado de filamento | humedad del filamento | **higroscópico es una propiedad, húmedo es un estado**: la guía dice qué material puede cogerla y cómo se nota, no que el carrete de quien lee esté húmedo |
| secado de filamento | [[stringing\|Stringing]] | la humedad es **una** causa de hilos entre varias; Bambu la lista primera y Prusa casi la última. La prueba diferencial es **cambiar de carrete** |
| secado de filamento | [[flow-rate\|Flujo]] | **las líneas finas y los huecos no son de humedad**: el apartado de subextrusión de Bambu no la incluye entre sus causas |
| secado de filamento | [[warping\|Warping]] | **son fallos distintos**: la sección de warping de Bambu no menciona la humedad y la de filamento húmedo no menciona las esquinas |
| secado de filamento | [[material\|Material]] | la matriz **material → requiere / recomienda / no requiere secado** y **desecante sí o no** sale de la tabla de Bambu |
| secado de filamento | almacenamiento | por debajo de 20 % RH el filamento seco aguanta 2–7 días; a ~55 % RH absorbe en 2–12 h. **Cifras de Bambu**; Prusa publica el procedimiento, no cifras. **Secar sin guardar es la mitad del trabajo** |
| secado de filamento | AMS 2 Pro | **techo de 65 °C**: los materiales que piden más no se secan ahí. Es un límite del aparato, no del material |
| secado de filamento | AMS HT | cubre todos los materiales, pero PVA, PPS-CF y PPA-CF pueden no quedar secos del todo |
| secado de filamento | cama como secador | sólo en impresoras cerradas; **la temperatura de la cama en esta tabla es de secado, no de impresión** |
| secado de filamento | horno | **las dos casas se separan**: Bambu prohíbe el horno de cocina y pide convección forzada; Prusa lo admite con termómetro externo |
| secado de filamento | carrete | cuatro límites distintos: negro viejo 45 °C, negro nuevo 90 °C, gris viejo 90 °C, gris nuevo 150 °C. **El color no basta para saber el límite** |
| secado de filamento | PA | a los ~3 meses al aire es muy difícil de secar; **ninguna fuente da cifras de PA sin fibra** |
| secado de filamento | PC | los ciclos repetidos de secado lo vuelven quebradizo: mejor un secado corto y almacenamiento sellado. **Y las dos tablas no dan la misma cifra**: Prusa, tres variantes de Prusament (85 ºC/5 h, 90 ºC/4 h, 90 °C/4–6 h); Bambu, una fila «PC» a secas (80 °C/8 h en AMS HT) |
| secado de filamento | ASA | **las dos tablas lo tienen y no coinciden en el tiempo**: 80 °C en las dos casas, 4 h (Prusa, sin método asignado) frente a 8 h (Bambu, AMS HT). **Misma temperatura, distinto tiempo** |
| secado de filamento | desecante | el gel de sílice avisa por color; se regenera a 80–90 °C (nunca más de 100 °C). **Son temperaturas del desecante, no del filamento** |
| secado de filamento | Prusa XL multi-herramienta | las herramientas inactivas liberan humedad al filamento y producen hilos en el cabezal: se recomienda secar antes de imprimir |
| secado de filamento | LW-PLA | el filamento de baja densidad tiene gas y huecos dentro: se recomienda secarlo y bajar el ratio de flujo |

**Páginas propias que este tema sugiere:**

- *Almacenamiento y desecante*, porque tiene sus propias cifras y su propia lógica
  (20 % RH, 2–7 días frente a 2–12 h, indicador de color del gel de sílice, criterios de
  caja estanca, bolsa al vacío y drybox) y aplica igual a quien **no** seca nada.
- *Límites del carrete*, porque la trampa del carrete negro viejo (45 °C) frente al
  nuevo (90 °C) es un dato que se paga con el carrete deshecho, y porque los cuatro
  límites conviven en una misma familia de productos.
