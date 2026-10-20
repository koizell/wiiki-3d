---
titulo: TPU flexible
tema: tpu-flexible
fuentes:
  - wiki/raw/tpu-flexible-bambu-wiki-tpu-printing-guide.md
  - wiki/raw/tpu-flexible-prusa-kb-flexible-materials.md
  - wiki/raw/tpu-flexible-bambu-wiki-tpu-feed-assist-module-troubleshooting.md
  - wiki/raw/tpu-flexible-bambu-wiki-tpu-85a-90a-printing-guide-for-p-series.md
  - wiki/raw/tpu-flexible-bambu-wiki-tpu-90a-printing-guide-for-a-series.md
  - wiki/raw/slicer-prusa-kb-prusament-tpu-95a-material-guide.md
  - wiki/raw/material-bambulab-material-table.md
cocinado: 2026-10-19
---

# TPU flexible

**Nota de revisión (cocinero, 2026-10-19).** Este fichero se ha corregido después de
`wiki/reviews/tpu-flexible-revision-1.md` (veredicto RECHAZADO). **Un fallo de ese
informe nacía aquí, no en la guía**, y por eso volvería por la misma puerta en la
siguiente vuelta si sólo se arreglara el artículo: el material cocinado afirmaba que la
temperatura de cama del TPU es «una combinación de filamento + máquina + chapa +
adhesivo» y que «las dos casas cambian las cuatro». **Eso es falso: el adhesivo no
mueve ninguna cifra, es un requisito de superficie.** La corrección separa en todo el
fichero **lo que es una cifra** (temperatura de cama, temperatura de boquilla) **de lo
que es un requisito de superficie** (adhesivo, chapa), y está señalada en los sitios
donde se aplica: `## Afirmaciones` (cámara, boquilla, módulo, temperatura, superficie de
impresión), `## Contradicciones` §3 y §4, y `## Relaciones`. Al revisar el resto del
fichero **por el mismo patrón** —afirmaciones que dicen más de lo que dice la fuente—
han salido **cuatro más**, corregidas en su sitio: la cita del hotend atribuida a la
página que no la tiene, el «valor del perfil» del 225 °C (en dos sitios), la dirección
de rotación contada como uno de los disparos de la protección de extrusión en seco, y
el TPU «como el PLA y no como el PETG» en la fila de cámara. **El resto del fichero se
conserva tal cual.**

**Qué es este fichero y para qué sirve.** Material cocinado de siete fuentes: cinco
nuevas de este lote (cuatro de la wiki de Bambu Lab y una del KB de Prusa) y dos
reutilizadas de `wiki/raw/` (la guía de Prusament TPU 95A y la tabla de materiales de
Bambu). El redactor escribe la guía `tpu-flexible` con esto y **nada más**.

**Las tres reglas del brief que mandan sobre el resto de este fichero:**

1. **El TPU no es un material con otros números: es un material con otras
   exigencias.** Por eso el eje de `## Afirmaciones` es el **requisito de máquina**
   (trazado del filamento, engranajes, extrusor directo, boquilla), no una tabla de
   temperaturas. Las cifras están, con su fuente, pero subordinadas a la pregunta
   «¿mi máquina puede con esto?».
2. **Shore es una cifra con significación propia.** 85A, 90A y 95A no son «más
   flexible» a secas: son el valor numérico de una escala de dureza, y hay un
   **umbral de 85A** que en Bambu es un umbral de **engranaje**, no una
   recomendación de dureza estética.
3. **Una limitación del AMS es una limitación del aparato.** Todo lo del AMS, del
   cambio automático de filamento, de la temperatura del hotend durante la carga o
   del ancho del carrete es del **dispositivo**. El redactor tiene que escribir el
   aparato como sujeto de la restricción, nunca el filamento.

**Un aviso que recorre todo el fichero:** las cifras de este tema **no son valores
del material**. La temperatura de cama de un TPU es 30–35 °C en una Bambu y 55–75 °C
en una Prusa, y ninguna de las dos está equivocada: son combinaciones distintas de
**máquina y chapa**. Lo mismo con la boquilla. Publicar «el TPU va a 225 °C»
sin decir de qué máquina y de qué filamento es un error de alcance. Ver
`## Contradicciones` §3 y §4.

**Y una distinción que este fichero mantiene separada, porque se confunde muy fácil:
el adhesivo no es una cifra, es un requisito.** Si hay que aplicarlo o no, y con qué
adhesivo, es una **condición de superficie**; la temperatura de cama **no sube ni baja
por ello**. En la tabla de materiales de Bambu la fila del TPU da **30–45 °C con glue
stick y 30–45 °C con glue líquido**: los dos adhesivos dan la misma cifra. Lo que el
adhesivo decide es **si hay que aplicarlo**, y eso lo decide la chapa. Ver
`## Contradicciones` §3.

**Estado de la prueba de utilidad del brief** (tres escenas). La escena 3 está
**cubierta por el corpus**. La escena 2 está **cubierta**. La escena 1 **no tiene
respaldo en ninguna de las siete fuentes**: ninguna menciona un extrusor bowden.
Ver `## Sin respaldo`, primer punto.

## Afirmaciones

### Qué es un TPU, y qué significa la cifra de Shore

- **TPU es el termoplástico de uretano**: un filamento flexible y muy elástico, que
  se estira y **vuelve a su forma original** tras deformarse. Se usa para funda de
  móvil, suelas de zapato y piezas blandas.
  — [Bambu Lab, TPU Printing Guide](https://wiki.bambulab.com/en/knowledge-sharing/tpu-printing-guide), capturado 2026-10-19
- **La dureza del TPU se mide con la escala Shore.** Las dos escalas habituales son
  **Shore A (más blanda)** y **Shore D (más dura)**, y el número se escribe con la
  letra detrás: 90A, 95A, 77D. **Un valor más alto significa material más duro y
  menos flexible.**
  — [Bambu Lab, TPU Printing Guide](https://wiki.bambulab.com/en/knowledge-sharing/tpu-printing-guide), capturado 2026-10-19
- **La orden de dureza completa, de la más dura a la más blanda:**
  `77D > 70D > 68D > 55D > 95A > 90A > 85A > 83A > 80A > 75A > 70A`.
  Nótese que **la escala D y la A no son comparables entre sí sin más** —son
  escalas distintas— y que la lista de Bambu las ordena de una manera, que es la
  ordenación que publica.
  — [Bambu Lab, TPU Printing Guide](https://wiki.bambulab.com/en/knowledge-sharing/tpu-printing-guide), capturado 2026-10-19
- **TPU es un subtipo de TPE**, y la diferencia entre TPU y TPE es **la dureza
  Shore**: *«TPU is basically a subtype of TPE material and the main difference
  between TPU and TPE is its shore hardness»*. Los materiales flexibles se venden
  bajo varios nombres (TPU, TPEE).
  — [Prusa Research, Flexible materials](https://help.prusa3d.com/article/flexible-materials_2057), capturado 2026-10-19
- **El rango habitual del TPU en la escala Shore es 60A–90A.**
  — [Prusa Research, Flexible materials](https://help.prusa3d.com/article/flexible-materials_2057), capturado 2026-10-19
- **La regla que sostiene el eje del brief, literal de Prusa:** *«Generally
  speaking, the softer the filament is, the harder it is to print.»*
  — [Prusa Research, Flexible materials](https://help.prusa3d.com/article/flexible-materials_2057), capturado 2026-10-19
- **85A y 90A son dos grados de dureza del mismo material**, no dos materiales:
  *«85A and 90A indicate the hardness levels of these two materials, with 90A being
  harder than 85A»*.
  — [Bambu Lab, TPU 85A&90A printing guide for P series](https://wiki.bambulab.com/en/filament-acc/filament/tpu-85a-90a-printing-guide-for-p-series), capturado 2026-10-19
- **El TPU 90A es, por definición, un filamento con dureza Shore 90A**; el 95A HF,
  un 95A.
  — [Bambu Lab, TPU 90A printing guide for A series](https://wiki.bambulab.com/en/filament-acc/filament/tpu-85a-90a-printing-guide-for-a-series), capturado 2026-10-19
- **El Prusament TPU 95A es, según su fabricante, uno de los flexibles más fáciles
  de imprimir**, pero no gratis: *«Although it's one of the easiest flexible
  materials to print, it still requires some print preparations»*.
  — [Prusa Research, Prusament TPU 95A material guide](https://help.prusa3d.com/article/prusament-tpu-95a-material-guide_899653), capturado 2026-10-13
- **Propiedades que Prusa atribuye a los materiales flexibles**, con su lista de
  ventajas e inconvenientes: flexibilidad y tenacidad, estabilidad dimensional
  (poca contracción), buena adhesión entre capas, alta resistencia mecánica y
  química; en contra: alta dificultad de impresión, baja velocidad, puentes y
  voladizos muy malos, difícil retirada de soportes, hilos e higroscopicidad.
  — [Prusa Research, Flexible materials](https://help.prusa3d.com/article/flexible-materials_2057), capturado 2026-10-19
- **Prusa reserva los flexibles a quien ya tiene soltura**, con su motivo:
  *«Printing with flexible filaments is recommended only for experienced makers,
  considering various challenges during printing»*, y enumera los desafíos:
  obstrucciones frecuentes de boquilla, puentes y voladizos pobres, **enredado del
  filamento en los engranajes del extrusor**, hilos y goteo.
  — [Prusa Research, Flexible materials](https://help.prusa3d.com/article/flexible-materials_2057), capturado 2026-10-19

### El umbral de 85A: es un umbral de engranaje, no de gusto

Este es el centro del tema, y las dos fuentes que lo dan lo explican **con la misma
mecánica**: el filamento demasiado blando no lo muerden los engranajes.

- **Bambu, en la guía general de TPU:** *«For stable printing, TPU with a hardness
  of 85A or higher is recommended. Softer TPU (such as 83A or 80A) bends easily
  during feeding, which can cause filament buckling, tangling, or unstable
  extrusion.»* Y a continuación, la frase literal que hay que poder citar:
  ***«Bambu Lab printers do not currently support printing with TPU filaments rated
  below 85A hardness.»***
  — [Bambu Lab, TPU Printing Guide](https://wiki.bambulab.com/en/knowledge-sharing/tpu-printing-guide), capturado 2026-10-19
- **Bambu, en el diagnóstico del módulo de asistencia**, con el mecanismo exacto:
  *«TPU filament used is less than 85A hard, and the material is too soft to be
  properly engaged by the extruder gears, resulting in extrusion failure.»* Y el
  remedio: *«TPU with a hardness below 85A needs to be replaced, and the official
  bambu Lab filament should be used to ensure reliable feeding.»*
  — [Bambu Lab, TPU Feed Assist Module — Common troubleshooting Steps](https://wiki.bambulab.com/en/general/troubleshooting/tpu-feed-assist-module), capturado 2026-10-19
- **La consecuencia práctica del mismo umbral, en la guía general:** un TPU de 83A o
  80A **no se puede imprimir en una Bambu**. No es que imprima mal: es que la
  máquina no lo soporta.
  — [Bambu Lab, TPU Printing Guide](https://wiki.bambulab.com/en/knowledge-sharing/tpu-printing-guide), capturado 2026-10-19
- **El mismo umbral, aplicado a un caso de atasco concreto:** *«TPU isn't stiff
  enough to push the previous filament out the nozzle, so it jams»*. Un resto de
  filamento en la entrada del hotend **no lo expulsa un TPU**, porque es demasiado
  blando para empujarlo.
  — [Bambu Lab, TPU Feed Assist Module — Common troubleshooting Steps](https://wiki.bambulab.com/en/general/troubleshooting/tpu-feed-assist-module), capturado 2026-10-19

**Lo que el redactor no puede escribir:** «los TPU de menos de 85A son de peor
calidad» o «cualquier TPU blando da problemas». Lo que el corpus dice es más
estrecho y más útil: **por debajo de 85A los engranajes del extrusor no muerden el
filamento**, y eso es un umbral de la máquina.

### Qué impresora puede con qué variante

#### Bambu: la tabla de compatibilidad por serie y variante

| | TPU 85A | TPU 90A | TPU 95A HF | TPU for AMS |
|---|---|---|---|---|
| H2, X1, P series | ✅ | ✅ | ✅ | ✅ |
| A1 series | ❌ Incompatible | ✅ | ✅ | ✅ |
| A2L | ✅ | ✅ | ✅ | ✅ |

— [Bambu Lab, TPU Printing Guide](https://wiki.bambulab.com/en/knowledge-sharing/tpu-printing-guide), capturado 2026-10-19

- **La única incompatibilidad explícita de la tabla es A1 series + TPU 85A.** Todo
  lo demás es compatible.
  — [Bambu Lab, TPU Printing Guide](https://wiki.bambulab.com/en/knowledge-sharing/tpu-printing-guide), capturado 2026-10-19
- **Prusa, por su lado, es una regla de familia, no de variante:** *«All our
  printers with the Nextruder can be used with little to no tweaking»*, con perfiles
  preparados para Core One, XL, MK4S, MK4 y Prusa Pro HT90. **Los anteriores (MK3S+
  y más viejos) también son compatibles**, pero con perfiles que pueden faltar y
  *«some tweaking (such as loosening the idler) might be required»*.
  — [Prusa Research, Prusament TPU 95A material guide](https://help.prusa3d.com/article/prusament-tpu-95a-material-guide_899653), capturado 2026-10-13
- **Bambu, sobre la cámara:** el TPU **no exige impresora cerrada**. En la tabla de
  materiales, la fila «PLA, PETG, TPU…» dice *«Not prone to warping; no mandatory
  temperature requirements»* y la impresora recomendada es *«Open-frame or enclosed
  printer»*. **Esa fila agrupa PLA, PETG y TPU en la misma frase**, así que **no se
  escribe que el TPU se parezca al PLA y no al PETG**: la tabla no los separa ahí.
  Lo que la misma tabla **sí** añade es una nota **para PETG**: *«For PETG and
  PETG-CF/GF, an enclosed printer is recommended to prevent low ambient temperatures
  from reducing the model's interlayer strength»*.
  — [Bambu Lab, Filament guide — material table](https://wiki.bambulab.com/en/general/filament-guide-material-table), capturado 2026-10-08
- **Contra con la cámara, sí hay una regla de TPU en Bambu, y es de cámara:** los
  filamentos con temperatura de reblandecimiento **por debajo de 60 °C (como el
  TPU)**, con la cama por encima de 45 °C, obligan a *«opening the front door
  and/or removing the upper glass cover plate to prevent excessive chamber heat
  from softening and deforming the filament»*.
  — [Bambu Lab, Filament guide — material table](https://wiki.bambulab.com/en/general/filament-guide-material-table), capturado 2026-10-08
- **Prusa pide lo contrario en un caso concreto, y es un caso de máquina:** con
  boquilla de alto flujo **dentro de una cámara, hay que dejar la puerta abierta**
  (*«Opening the ventilation grill on the Core One is sufficient»*).
  — [Prusa Research, Prusament TPU 95A material guide](https://help.prusa3d.com/article/prusament-tpu-95a-material-guide_899653), capturado 2026-10-13
- **Y una diferencia de máquina que tiene un nombre propio: la A1 es abierta.**
  *«Due to the A1/A1mini being an open printer, it is not possible to dry the
  filament on a heatbed»*: en la A1 el método de secado con la cama caliente —que
  sí recomiendan la guía general y la de la serie P para X, P y H2— **no existe**,
  y el drying necesita AMS 2 Pro o AMS HT. **Es una limitación de la impresora,
  no del TPU.** El procedimiento de secado va a `secar-filamento`.
  — [Bambu Lab, TPU 90A printing guide for A series](https://wiki.bambulab.com/en/filament-acc/filament/tpu-85a-90a-printing-guide-for-a-series), capturado 2026-10-19

#### La boquilla: la variante decide, y el 0,4 mm no vale para el 85A

- **Bambu, regla general:** *«It is not recommended to use 0.2mm nozzles or regular
  high-flow nozzles for printing. Specifically, 85A TPU filaments cannot be printed
  with 0.4mm nozzles.»*
  — [Bambu Lab, TPU Printing Guide](https://wiki.bambulab.com/en/knowledge-sharing/tpu-printing-guide), capturado 2026-10-19
- **Bambu, tabla de boquillas por variante** (guía general):

  | Variante | Compatible | No recomendado | No compatible |
  |---|---|---|---|
  | TPU 85A | 0,6 / 0,8 mm; TPU high-flow hotend | high-flow 0,6 / 0,8 mm | **0,2 / 0,4 mm**; high-flow 0,4 mm |
  | TPU 90A | 0,4 / 0,6 / 0,8 mm; TPU high-flow hotend | high-flow hotend | 0,2 mm |
  | TPU 95A HF | 0,4 / 0,6 / 0,8 mm; high-flow hotend; TPU high-flow hotend | — | 0,2 mm |
  | TPU for AMS | 0,4 / 0,6 / 0,8 mm; high-flow hotend | — | 0,2 mm |

  — [Bambu Lab, TPU Printing Guide](https://wiki.bambulab.com/en/knowledge-sharing/tpu-printing-guide), capturado 2026-10-19
- **La guía de la serie P**, con la misma tabla pero **más específica en la fila del
  90A**: da como no recommended el **high-flow de 0,4, 0,6 y 0,8 mm** uno por uno,
  donde la guía general sólo dice «high-flow hotend» sin desglosar. **La lectura
  sustantiva es la misma** —el high-flow no es buena idea con TPU—, pero la guía de
  serie es la que hay que citar si se quiere el detalle.
  — [Bambu Lab, TPU 85A&90A printing guide for P series](https://wiki.bambulab.com/en/filament-acc/filament/tpu-85a-90a-printing-guide-for-p-series), capturado 2026-10-19
- **La guía de la serie A, para 90A:** 0,2 mm «Not compatible»; 0,4, 0,6 y 0,8 mm
  «Recommended».
  — [Bambu Lab, TPU 90A printing guide for A series](https://wiki.bambulab.com/en/filament-acc/filament/tpu-85a-90a-printing-guide-for-a-series), capturado 2026-10-19
- **El hotend es una pieza de desgaste, y en TPU se nota.** En la guía de la serie A:
  *«it is strongly recommended to use a new hotend or a dedicated hotend for printing
  TPU»*.
  — [Bambu Lab, TPU 90A printing guide for A series](https://wiki.bambulab.com/en/filament-acc/filament/tpu-85a-90a-printing-guide-for-a-series), capturado 2026-10-19
- **Y el historial de la boquilla también cuenta, en la guía general:** *«Nozzle
  history matters. If the Nozzle was previously used with carbon fiber or glass fiber
  filaments, residual fibers may increase resistance when printing TPU. Perform
  several cold pull cleanings before printing TPU»*, y la misma página pide *«brand new
  nozzles, or cold-pull old nozzles before printing»*. **La cita del hotend es de la
  serie A y la del historial de boquilla es de la guía general: no son la misma
  frase, y la guía general no habla de «hotend» en este punto.**
  — [Bambu Lab, TPU Printing Guide](https://wiki.bambulab.com/en/knowledge-sharing/tpu-printing-guide), capturado 2026-10-19
- **Prusa, el mismo problema con otro lenguaje:** *«Make sure the nozzle is
  unobstructed. If you're not sure, do a cold pull to clean it completely.»*
  — [Prusa Research, Flexible materials](https://help.prusa3d.com/article/flexible-materials_2057), capturado 2026-10-19

#### El engranaje del extrusor: la regla de Prusa y su equivalente en Bambu

- **Prusa, la regla de máquina más concreta del lote:** *«Loosen the idler so the
  gears push the filament through only very gently. If they press too hard, the
  filament might get entangled in the gears.»* El idler es **la pieza que aprieta
  el filamento contra los engranajes** —de ahí que la regla sea aflojarlo—; esta
  última explicación es una lectura del mecanismo, no una frase de la fuente, que
  no define la pieza.
  — [Prusa Research, Flexible materials](https://help.prusa3d.com/article/flexible-materials_2057), capturado 2026-10-19
- **Prusa, la misma regla con una medida en la guía del filamento concreto:**
  *«Filament entanglement: If the filament entangles and gets stuck in the gears,
  try loosening the idler screws by 1,5 spins.»*
  — [Prusa Research, Prusament TPU 95A material guide](https://help.prusa3d.com/article/prusament-tpu-95a-material-guide_899653), capturado 2026-10-13
- **Bambu no habla de idler: habla de engranajes que no muerden y del módulo de
  asistencia.** La misma idea, dicha al revés: el engranaje debe agarrar el
  filamento, y si el filamento es demasiado blando no lo agarra.
  — [Bambu Lab, TPU Feed Assist Module — Common troubleshooting Steps](https://wiki.bambulab.com/en/general/troubleshooting/tpu-feed-assist-module), capturado 2026-10-19
- **El desgaste del engranaje también cuenta, en Bambu:** *«If the extruder gear is
  worn, it needs to be replaced (Otherwise, there may be issues with filament
  slipping)»*. El desgaste del engranaje explica el deslizamiento del filamento,
  que es uno de los tres problemas que la propia página lista.
  — [Bambu Lab, TPU 90A printing guide for A series](https://wiki.bambulab.com/en/filament-acc/filament/tpu-85a-90a-printing-guide-for-a-series), capturado 2026-10-19

#### El trazado del filamento: por dónde tiene que pasar

Esto es lo que separa una máquina de otra con TPU, y las dos casas lo cuentan con
detalle distinto.

- **Prusa, XL — el camino largo:** *«The Original Prusa XL has a long path from the
  loading to the extruder nozzle. Due to its softness, Flexible filaments need
  special attention when being loaded in this printer»*, y existe un *«flex filament
  bypass»* imprimible para acortar ese camino.
  — [Prusa Research, Flexible materials](https://help.prusa3d.com/article/flexible-materials_2057), capturado 2026-10-19
- **Prusa, XL — el rodeo concreto:** *«When printing on the Original Prusa XL, you
  may struggle to feed the printer with TPU through the filament sensor on the
  side. It is recommended to unplug the PTFE tube from the sensor and feed the
  filament directly into the tube.»*
  — [Prusa Research, Prusament TPU 95A material guide](https://help.prusa3d.com/article/prusament-tpu-95a-material-guide_899653), capturado 2026-10-13
- **Prusa, CORE One — el rodeo en el otro extremo:** *«It may also be difficult to
  feed the filament through the PTFE tube on the Prusa Core One… we recommend
  unplugging the PTFE tube on the Nextruder side, pushing the filament through,
  then pushing it manually through the filament sensor, and plugging the tube
  again.»*
  — [Prusa Research, Prusament TPU 95A material guide](https://help.prusa3d.com/article/prusament-tpu-95a-material-guide_899653), capturado 2026-10-13
- **Prusa, CORE One+ y CORE One L — una pieza que existe por el TPU:** tienen
  *«a hardware switch on the side filament sensor case that allows the filament
  sensor lever to be looser, allowing for easier loading of flexible filaments to
  the extruder»*. El pestillo **hacia delante** (el lado con la X) afloja la palanca;
  **hacia atrás** la tensa.
  — [Prusa Research, Flexible materials](https://help.prusa3d.com/article/flexible-materials_2057), capturado 2026-10-19
- **Prusa, MK4 y MK4S — el guía de filamento:** *«It is recommended that you use a
  filament guide on your printer (MK4, MK4S) to keep the filament slightly tightened
  during the print.»*
  — [Prusa Research, Prusament TPU 95A material guide](https://help.prusa3d.com/article/prusament-tpu-95a-material-guide_899653), capturado 2026-10-13
- **Bambu, serie P, y aquí la diferencia entre variantes es física:** con **85A**
  *«loading through the PTFE tube is not supported»* — hay que quitar la tapa de
  cristal, desconectar el tubo PTFE del cabezal y **cargar el filamento
  directamente desde arriba al extrusor**. Con **90A** sí se puede: se empuja por
  el PTFE y luego se introduce a mano en el cabezal. **Es una diferencia de
  trazado, no de ajuste.**
  — [Bambu Lab, TPU 85A&90A printing guide for P series](https://wiki.bambulab.com/en/filament-acc/filament/tpu-85a-90a-printing-guide-for-p-series), capturado 2026-10-19
- **Bambu, serie P, y un detalle geométrico que explica un atasco:** con 90A
  *«it is recommended to place the model in the middle towards the front of the
  heatbed to reduce friction between the filament and the PTFE tube»*.
  — [Bambu Lab, TPU 85A&90A printing guide for P series](https://wiki.bambulab.com/en/filament-acc/filament/tpu-85a-90a-printing-guide-for-p-series), capturado 2026-10-19
- **Bambu, resistencia del tubo PTFE — es del tubo, no del filamento:** *«Dents,
  deformation or accumulated filament dust inside the PTFE tube leading to increased
  resistance»*. Los dos remedios son de máquina: **subir el nivel de engranaje del
  módulo de asistencia** o **cambiar el tubo PTFE por uno nuevo de la misma
  longitud**.
  — [Bambu Lab, TPU Feed Assist Module — Common troubleshooting Steps](https://wiki.bambulab.com/en/general/troubleshooting/tpu-feed-assist-module), capturado 2026-10-19
- **Bambu, y la regla general de carga:** el carrete **se eleva** por encima del
  punto de carga del cabezal, porque el filamento no debe ser arrastrado ni
  rozado por la cama o la boquilla calientes. En la guía de la serie A: *«All
  filaments must have the spool elevated (the spool's discharge port should be
  higher than the toolhead's load port)»*.
  — [Bambu Lab, TPU 90A printing guide for A series](https://wiki.bambulab.com/en/filament-acc/filament/tpu-85a-90a-printing-guide-for-a-series), capturado 2026-10-19
  — [Bambu Lab, TPU Printing Guide](https://wiki.bambulab.com/en/knowledge-sharing/tpu-printing-guide), capturado 2026-10-19

#### El accesorio que existe por el TPU: el TPU Feed Assist Module

- **Qué es:** un accesorio para **H, X y P series** que *«reduces TPU feeding
  resistance in any spool orientation, eliminates jams and breaks, and greatly
  boosts TPU print reliability and success rates»*. Además permite imprimir en
  cámara cerrada y deja alimentar directamente por la entrada TPU dedicada.
  — [Bambu Lab, TPU Printing Guide](https://wiki.bambulab.com/en/knowledge-sharing/tpu-printing-guide), capturado 2026-10-19
- **El módulo también tiene su propio lado de los fallos**, y son tres
  situaciones que se confunden entre sí:
  - **Causa de material:** un resto de filamento en la entrada del hotend, que un
    TPU no puede expulsar (*«TPU isn't stiff enough to push the previous filament
    out the nozzle, so it jams»*), o un filamento **por debajo de 85A**, que los
    engranajes no muerden.
  - **Causa de máquina:** hotend obstruido o temperatura insuficiente
    («extrusion resistance of the hotend is too high»), resistencia en el tubo
    PTFE, deslizamiento de engranajes por carrete mal colocado o por **diámetro de
    filamento demasiado fino**, dirección de rotación del carrete incorrecta, o
   residuos dentro del extrusor.
  - **Causa de ajuste/proceso:** la **protección de extrusión en seco** del módulo.
  — [Bambu Lab, TPU Feed Assist Module — Common troubleshooting Steps](https://wiki.bambulab.com/en/general/troubleshooting/tpu-feed-assist-module), capturado 2026-10-19
- **La protección de extrusión en seco, con su cifra:** el módulo sale del modo de
  alimentación **a los ~135 segundos**, y si la ausencia de empuje persiste más de
  135 s se dispara un apagado de protección. **Los escenarios anómalos que la página
  enumera para esa protección son tres**, literales: *«extruder gear slippage,
  disconnected tubing, or filament run-out»*. **La dirección de rotación del carrete
  no está entre ellos**: es una de las **cuatro causas del problema del módulo** que
  la misma página lista aparte (carrete mal colocado, diámetro de filamento
  demasiado fino, dirección de rotación, residuo dentro del extrusor), y lo que
  produce es el deslizamiento del engranaje. **El redactor publica tres escenarios de
  disparo y cuatro causas del problema, y no los funde en una lista de cuatro
  disparos.**
  — [Bambu Lab, TPU Feed Assist Module — Common troubleshooting Steps](https://wiki.bambulab.com/en/general/troubleshooting/tpu-feed-assist-module), capturado 2026-10-19
- **La calibración del módulo importa y hay que respectarla:** tras la
  calibración hay que **reducir el engranaje del módulo en modo de alimentación**
  para no deformar el filamento por asistencia excesiva. Y si el TPU se deforma y
  se acumula en la salida del módulo, el remedio es el modo de descarga, cambiar el
  tramo de filamento y recalibrar.
  — [Bambu Lab, TPU Feed Assist Module — Common troubleshooting Steps](https://wiki.bambulab.com/en/general/troubleshooting/tpu-feed-assist-module), capturado 2026-10-19
- **El botón de extrusión, que se pulsa de uno en uno:** el mismo diagnóstico aparece
  en la guía de la serie P:
  *«When clicking the extrusion button, do not click continuously, as this could
  cause the TPU to get caught in the extruder gears, leading to a clog.»*
  — [Bambu Lab, TPU 85A&90A printing guide for P series](https://wiki.bambulab.com/en/filament-acc/filament/tpu-85a-90a-printing-guide-for-p-series), capturado 2026-10-19

### El AMS: qué es del aparato y qué es del filamento

Este es el bloque del **gate 3**, y el redactor tiene que leerlo con el aparato
como sujeto.

- **Bambu, la regla del AMS HT:** *«Among the AMS series, only the AMS HT supports
  printing with TPU filament. When printing with TPU, the AMS HT functions solely as
  a sealed enclosure — its standard outlet and automatic feeding functionality
  cannot be used. Instead, the filament must be fed through the dedicated TPU
  outlet located on the back of the unit.»*
  — [Bambu Lab, TPU Printing Guide](https://wiki.bambulab.com/en/knowledge-sharing/tpu-printing-guide), capturado 2026-10-19
- **Y los demás AMS, explícitamente:** *«Other AMS models (AMS / AMS Lite / AMS 2
  Pro) are not compatible with TPU filament.»*
  — [Bambu Lab, TPU Printing Guide](https://wiki.bambulab.com/en/knowledge-sharing/tpu-printing-guide), capturado 2026-10-19
- **La excepción de producto, en la misma página:** *«TPU for AMS filament is
  compatible with the standard feeding functionality of all AMS series models for
  loading and printing.»* Hay, por tanto, **un filamento distinto** llamado «TPU
  for AMS» que sí alimenta por el canal normal.
  — [Bambu Lab, TPU Printing Guide](https://wiki.bambulab.com/en/knowledge-sharing/tpu-printing-guide), capturado 2026-10-19
- **La tabla de materiales da la razón física, y la razón es del canal del
  aparato:** *«Too soft (e.g., TPU 95A/85A/83A/80A, damp PVA or BVOH): These
  cannot pass smoothly through the AMS / AMS lite channel, and can easily cause
  loading/unloading failures, clogging, and other issues.»*
  — [Bambu Lab, Filament guide — material table](https://wiki.bambulab.com/en/general/filament-guide-material-table), capturado 2026-10-08
- **Y la diferencia entre AMS y AMS lite es del mecanismo del aparato:** *«the AMS
  has an extra transmission gear that works together with the extruder gear to
  provide stronger feeding force. This helps overcome greater feeding resistance,
  so the AMS can handle some softer or rougher filaments»*; el AMS lite **no tiene
  ese engranaje de transmisión**, por lo que los filamentos blandos o rugosos le
  fallan.
  — [Bambu Lab, Filament guide — material table](https://wiki.bambulab.com/en/general/filament-guide-material-table), capturado 2026-10-08
- **El AMS no es el único aparato con esta limitación: Prusa tiene la suya, y es
  el cambio automático de filamento.** *«Remember that automatic filament change
  might not work properly with flexible filaments.»*
  — [Prusa Research, Flexible materials](https://help.prusa3d.com/article/flexible-materials_2057), capturado 2026-10-19
- **La descarga automática con cutter tampoco funciona con TPU, en P y en A:**
  *«Automatic unloading with a cutter is not supported»* (serie P) y *«For A1
  series printers, manual unloading is required after heating up the hotend.
  Automatic unloading using the cutter is not supported»* (serie A). La descarga es
  **manual**, con el hotend calentado.
  — [Bambu Lab, TPU 85A&90A printing guide for P series](https://wiki.bambulab.com/en/filament-acc/filament/tpu-85a-90a-printing-guide-for-p-series), capturado 2026-10-19
  — [Bambu Lab, TPU 90A printing guide for A series](https://wiki.bambulab.com/en/filament-acc/filament/tpu-85a-90a-printing-guide-for-a-series), capturado 2026-10-19

### Ajustes: qué pide el material y qué no

#### Velocidad

- **Prusa, con dos cifras y una regla:** *«Print slowly. The slower, the better. A
  typical speed for flexible filaments is usually 20 mm/s, the maximal recommended
  speed is somewhere between 30 and 40 mm/s. With higher speeds, you risk clogging
  the nozzle or tangling filament into the gears.»*
  — [Prusa Research, Flexible materials](https://help.prusa3d.com/article/flexible-materials_2057), capturado 2026-10-19
- **Bambu, con una regla equivalente en otro idioma:** *«Please keep the default
  volumetric speed limit during printing, and it is not recommended to increase the
  print speed»* (serie P) y *«Please keep the default max volumetric speed limit
  during printing, and avoid increasing the print speed»* (serie A).
  — [Bambu Lab, TPU 85A&90A printing guide for P series](https://wiki.bambulab.com/en/filament-acc/filament/tpu-85a-90a-printing-guide-for-p-series), capturado 2026-10-19
  — [Bambu Lab, TPU 90A printing guide for A series](https://wiki.bambulab.com/en/filament-acc/filament/tpu-85a-90a-printing-guide-for-a-series), capturado 2026-10-19
- **Bambu, en el diagnóstico de infraextrusión, la velocidad va primero:** *«Reduce
  Printing Speed: A lower printing speed allows the filament to melt more
  thoroughly, which helps reduce the likelihood of under-extrusion.»*
  — [Bambu Lab, TPU Printing Guide](https://wiki.bambulab.com/en/knowledge-sharing/tpu-printing-guide), capturado 2026-10-19
- **Prusa recomienda perfiles concretos de PrusaSlicer** para materiales de
  terceros: *«Semiflex or Flexfill 98A»* y *«Filatech FilaFlex40»*. Para el
  Prusament TPU 95A, el perfil viene en el slicer: *«You can find print profiles
  for this material in PrusaSlicer.»*
  — [Prusa Research, Flexible materials](https://help.prusa3d.com/article/flexible-materials_2057), capturado 2026-10-19
  — [Prusa Research, Prusament TPU 95A material guide](https://help.prusa3d.com/article/prusament-tpu-95a-material-guide_899653), capturado 2026-10-13

#### Temperatura

- **Prusa, el material flexible en general:** boquilla **230–245 °C** (*«Depending on
  hardness and brand»*) y cama **60–75 °C** (*«Depending on the size of the object,
  bigger objects tend to need higher bed temperature»*).
  — [Prusa Research, Flexible materials](https://help.prusa3d.com/article/flexible-materials_2057), capturado 2026-10-19
- **Prusa, un filamento concreto:** boquilla **220–240 °C**, cama **55–75 °C**.
  — [Prusa Research, Prusament TPU 95A material guide](https://help.prusa3d.com/article/prusament-tpu-95a-material-guide_899653), capturado 2026-10-13
- **Bambu, la tabla de materiales:** **200–250 °C** para las cuatro filas de TPU
  (TPU for AMS, TPU 95A HF, TPU 85A, TPU 90A), con el encabezado de la tabla
  *«Nozzle temperature /℃ (±10 °C)»*.
  — [Bambu Lab, Filament guide — material table](https://wiki.bambulab.com/en/general/filament-guide-material-table), capturado 2026-10-08
- **Bambu, las guías de serie eligen un punto dentro de ese rango: 225 °C** para
  TPU 85A/90A en la serie P y para TPU 90A en la serie A. **El 225 °C es la
  temperatura de impresión que recomiendan, no el valor de un perfil:** las dos
  páginas lo dicen en un apartado que empieza *«In addition to the preset parameters,
  specific parameter settings should be adjusted according to the characteristics of
  the model»*. **El redactor no escribe «el 225 °C que trae el perfil»**: el perfil y
  la cifra son dos cosas distintas, y la fuente dice expresamente que el ajuste es
  **además** del preset.
  — [Bambu Lab, TPU 85A&90A printing guide for P series](https://wiki.bambulab.com/en/filament-acc/filament/tpu-85a-90a-printing-guide-for-p-series), capturado 2026-10-19
  — [Bambu Lab, TPU 90A printing guide for A series](https://wiki.bambulab.com/en/filament-acc/filament/tpu-85a-90a-printing-guide-for-a-series), capturado 2026-10-19
- **Prusa, la regla de ajuste, que es relativa y no una cifra:** *«Increase the
  nozzle temperature by 5 °C, this will lower filament resistance. Keep print
  cooling turned off.»*
  — [Prusa Research, Flexible materials](https://help.prusa3d.com/article/flexible-materials_2057), capturado 2026-10-19
- **Bambu, la corrección en sentido contrario, para el goteo:** *«Lower the nozzle
  temperature: Since TPU has high fluidity, excessive nozzle temperature may cause
  oozing. You can slightly reduce the nozzle temperature (by about 5 °C from the
  original setting) to decrease filament flow.»* Y con ella, en el mismo consejo,
  *«decrease the maximum volumetric flow rate by 0.4 mm³/s»*.
  — [Bambu Lab, TPU Printing Guide](https://wiki.bambulab.com/en/knowledge-sharing/tpu-printing-guide), capturado 2026-10-19
- **Prusa, para la obstrucción de boquilla, sube en vez de bajar:** *«If the problem
  persists, you may try loosening the idler, raising the temperature and lowering
  the fan speed.»*
  — [Prusa Research, Prusament TPU 95A material guide](https://help.prusa3d.com/article/prusament-tpu-95a-material-guide_899653), capturado 2026-10-13
- **Bambu, dos acciones que hay que hacer antes de imprimir:** **desactivar la
  calibración de dinámica de flujo** (*«Before TPU printing, please turn off the
  flow dynamics calibration»*, guía general; *«When printing TPU 90A, please disable
  flow dynamic calibration»*, serie A).
  — [Bambu Lab, TPU Printing Guide](https://wiki.bambulab.com/en/knowledge-sharing/tpu-printing-guide), capturado 2026-10-19
  — [Bambu Lab, TPU 90A printing guide for A series](https://wiki.bambulab.com/en/filament-acc/filament/tpu-85a-90a-printing-guide-for-a-series), capturado 2026-10-19

#### Retracción (gate 4: es un caso aparte)

- **Prusa publica el caso aparte, no una cifra menor:** *«If you use a different
  program than PrusaSlicer, try to adjust retractions a little bit. With lower
  retractions, there is a lower risk of clogging the nozzle or filament tangling.
  It's alright to turn the retractions off completely and then try to raise them
  and watch the results.»*
  — [Prusa Research, Flexible materials](https://help.prusa3d.com/article/flexible-materials_2057), capturado 2026-10-19
- **Bambu, en sentido contrario, pero para otro síntoma:** *«Adjust Retraction: After
  each layer, a retraction movement is performed to prevent oozing. If severe
  leaking occurs, try increasing the retraction distance by 0.2 mm from the
  original value.»*
  — [Bambu Lab, TPU Printing Guide](https://wiki.bambulab.com/en/knowledge-sharing/tpu-printing-guide), capturado 2026-10-19
- **El redactor tiene que publicar «desactivar la retracción» como una salida
  legítima en material flexible**, con Prusa, y el «+0,2 mm» como remedio del
  goteo severo, con Bambu. **No se escribe «baja la retracción a 0,2 mm»**: eso
  no lo dice ninguna fuente. Ver `## Contradicciones` §5.

#### Pared, relleno y soportes

- **Prusa, el compromiso entre rigidez y flexibilidad, con sus dos lados:**
  *«Do you need better mechanical resistance? Set more infill and perimeters in
  PrusaSlicer. But if you need to retain the material flexibility, try to lower the
  number of perimeters and top/bottom layers.»*
  — [Prusa Research, Flexible materials](https://help.prusa3d.com/article/flexible-materials_2057), capturado 2026-10-19
- **Y la advertencia que viene detrás, porque los dos ajustes chocan:**
  *«However, keep in mind that flexible filaments are not good at bridging and
  overhangs. A combination of thin layers and poor bridging can lead to ugly holes
  and protrusions.»*
  — [Prusa Research, Flexible materials](https://help.prusa3d.com/article/flexible-materials_2057), capturado 2026-10-19
- **Prusa, soportes:** *«Supports may need more space in Z-axis. Try to increase it
  to 0,3 mm»* y *«Increase 'XY separation between an object and its support to at
  least 100%»*, porque los soportes pegados a la pieza son difíciles de quitar.
  — [Prusa Research, Flexible materials](https://help.prusa3d.com/article/flexible-materials_2057), capturado 2026-10-19
- **Prusa, puentes:** para el TPU 95A, *«Try to increase dynamic overhang speed for
  0% overlap»*.
  — [Prusa Research, Prusament TPU 95A material guide](https://help.prusa3d.com/article/prusament-tpu-95a-material-guide_899653), capturado 2026-10-13
- **Bambu, el material de soporte:** con TPU **el soporte debe ser PLA**, no TPU:
  *«When printing TPU, PLA is recommended as the support filament»*, porque usar el
  propio TPU como soporte *«is often difficult to remove, easily causing surface
  scratches or deformation»*. Y para manchar menos, **PLA de color claro o del
  mismo color que la pieza**.
  — [Bambu Lab, TPU Printing Guide](https://wiki.bambulab.com/en/knowledge-sharing/tpu-printing-guide), capturado 2026-10-19
- **Bambu, y un fallo que es de la pieza, no del ajuste:** *«It is not recommended
  to print tall and thin models, as TPU filament is relatively soft. When the
  printed model reaches a certain height, it may wobble, leading to print
  failure.»* **Una pieza alta y fina con TPU se queda oscilando y se cae.** Es un
  modo de fallo propio del material blando.
  — [Bambu Lab, TPU 90A printing guide for A series](https://wiki.bambulab.com/en/filament-acc/filament/tpu-85a-90a-printing-guide-for-a-series), capturado 2026-10-19

### La superficie de impresión

- **El adhesivo es un requisito de superficie, no una variable de temperatura.** En la
  tabla de materiales de Bambu, la fila del TPU de la tabla de combinaciones
  **filamento + adhesivo** da **30–45 °C con glue stick y 30–45 °C con glue líquido**:
  los dos adhesivos dan la misma cifra. (En esa misma tabla el adhesivo **sí**
  desplaza la cifra de otros materiales —PET-CF/GF es «Not Compatible» con glue
  líquido, y PC y PA son «Not Recommended»—, pero **del TPU no**.) Lo que el adhesivo
  decide es **si hay que aplicarlo**, y eso lo dice la chapa: en la serie A hay que
  aplicarlo en todas salvo en la Textured PEI; en Prusa el adhesivo es **capa
  separadora** en las láminas lisas o satinadas, y el Smooth PEI está marcada «Not
  recommended».
  — [Bambu Lab, Filament guide — material table](https://wiki.bambulab.com/en/general/filament-guide-material-table), capturado 2026-10-08
  — [Bambu Lab, TPU 90A printing guide for A series](https://wiki.bambulab.com/en/filament-acc/filament/tpu-85a-90a-printing-guide-for-a-series), capturado 2026-10-19
  — [Prusa Research, Flexible materials](https://help.prusa3d.com/article/flexible-materials_2057), capturado 2026-10-19
- **Bambu, la regla general:** *«Except for the Cool Plate SuperTack, all other
  types of plates are compatible with TPU filaments.»*
  — [Bambu Lab, TPU Printing Guide](https://wiki.bambulab.com/en/knowledge-sharing/tpu-printing-guide), capturado 2026-10-19
- **Bambu, la serie A, que matiza la regla general con una excepción de primera
  capa:** Cool plate, Engineering plate y HT/Smooth PEI **recomendadas**; **Cool
  plate supertack no compatible** (*«may result in overly strong adhesion»*); y
  **hay que aplicar adhesivo salvo en la Textured PEI**, que *«may become overly
  sticky after applying adhesive»*.
  — [Bambu Lab, TPU 90A printing guide for A series](https://wiki.bambulab.com/en/filament-acc/filament/tpu-85a-90a-printing-guide-for-a-series), capturado 2026-10-19
- **Prusa, el catálogo de láminas del Prusament TPU 95A:** **PA Nylon** y **Satin**
  son «the most recommended print surface»; **PP** y **Textured** son recomendadas;
  **Smooth PEI: «Not recommended»** — si se usa, con capa separadora de glue stick,
  *«the adhesion is too strong and removing the print will damage the sheet»*. Y un
  apunte útil de la Textured: *«adhesion to this print sheet might be too strong»*,
  y el remedio es calentarla a **40 °C** y retirar la pieza con una espátula.
  — [Prusa Research, Prusament TPU 95A material guide](https://help.prusa3d.com/article/prusament-tpu-95a-material-guide_899653), capturado 2026-10-13
- **Prusa, materiales flexibles en general, y el caso de los muy blandos:**
  *«Some very soft flex materials can bond to the bed too much and require the use
  of glue stick on the bed as a separator to prevent PEI damage. A good alternative
  is the Textured Spring-steel sheet.»*
  — [Prusa Research, Flexible materials](https://help.prusa3d.com/article/flexible-materials_2057), capturado 2026-10-19
- **Y el comportamiento del material en la cama, con su remedio, literal de
  Bambu:** *«TPU generally adheres strongly to the build plate, which can make
  models with large bottom surfaces difficult to remove… gently lift one corner of
  the model to create a small gap, spray isopropyl alcohol into the gap, and then
  slowly peel the model away from the build plate.»*
  — [Bambu Lab, TPU Printing Guide](https://wiki.bambulab.com/en/knowledge-sharing/tpu-printing-guide), capturado 2026-10-19

### Los síntomas propios del material: qué falla y por qué

Las dos guías de serie de Bambu listan **los mismos tres problemas**, y esa lista es
la que gobierna el diferencial:

> *«TPU filament is prone to the following problems: Under extrusion (Nozzle
> clogging, loading resistance, filament slipping) · Extruder clogging (Filament
> bending, causing a clog in the extruder gear; disassemble the extruder and remove
> the clogged filament) · Stringing and oozing.»*

— [Bambu Lab, TPU 85A&90A printing guide for P series](https://wiki.bambulab.com/en/filament-acc/filament/tpu-85a-90a-printing-guide-for-p-series), capturado 2026-10-19
— [Bambu Lab, TPU 90A printing guide for A series](https://wiki.bambulab.com/en/filament-acc/filament/tpu-85a-90a-printing-guide-for-a-series), capturado 2026-10-19

- **Infraextrusión: cuatro causas, y ninguna es «el ajuste de flujo».** Bambu las
  enumera: **reducir la velocidad**, **comprobar la resistencia de alimentación**,
  **comprobar que el filamento está seco** y **inspeccionar el hotend por
  residuo** (cold pull antes de empezar).
  — [Bambu Lab, TPU Printing Guide](https://wiki.bambulab.com/en/knowledge-sharing/tpu-printing-guide), capturado 2026-10-19
  **La resistencia de alimentación** tiene su propia sección en la misma guía, con
  su propio enlace interno. Ver `## Contradicciones` §6.
- **Hilos y goteo: cuatro causas y un orden.** Bambu, en el FAQ: **modo de
  impresión «Print sequence By object»** (o menos modelos en la placa) para
  reducir los viajes; **bajar la boquilla ~5 °C** y el flujo volumétrico 0,4 mm³/s;
  **ajustar la retracción** (+0,2 mm) si hay goteo severo; y **asegurarse de que
  el filamento está seco**.
  — [Bambu Lab, TPU Printing Guide](https://wiki.bambulab.com/en/knowledge-sharing/tpu-printing-guide), capturado 2026-10-19
- **Prusa, el mismo síntoma con la causa en otro sitio:** *«Stringing: If the
  stringing occurs, try drying the filament as described above.»* Es la primera
  causa que da, y no menciona la retracción en ese apartado.
  — [Prusa Research, Prusament TPU 95A material guide](https://help.prusa3d.com/article/prusament-tpu-95a-material-guide_899653), capturado 2026-10-13
  **Ver `## Contradicciones` §5.**
- **Capas saltadas: en Prusa, la causa es una boquilla obstruida.** Literal:
  *«Skipped layers: The nozzle got clogged at some point. Deal with it as you would
  deal with a clogged nozzle.»* **No es un problema de adherencia entre capas ni
  de humedad: es una boquilla tapada.**
  — [Prusa Research, Prusament TPU 95A material guide](https://help.prusa3d.com/article/prusament-tpu-95a-material-guide_899653), capturado 2026-10-13
- **Atasco del extrusor por flexión del filamento, con su procedimiento:** el
  filamento se dobla, se enreda en el engranaje del extrusor y hay que **desmontar
  el extrusor y sacar el filamento atascado**.
  — [Bambu Lab, TPU 85A&90A printing guide for P series](https://wiki.bambulab.com/en/filament-acc/filament/tpu-85a-90a-printing-guide-for-p-series), capturado 2026-10-19
- **Bambu, el orden de causas de un atasco al alimentar, tal como lo publica la
  página de diagnóstico:** (a) filamento residual en la entrada del hotend; (b)
  resistencia de extrusión excesiva por hotend obstruido o temperatura
  insuficiente; (c) **dureza insuficiente (< 85A)**, que los engranajes no muerden;
  (d) **resistencia excesiva en el tubo PTFE**, por abolladuras, deformación o polvo
  de filamento acumulado.
  — [Bambu Lab, TPU Feed Assist Module — Common troubleshooting Steps](https://wiki.bambulab.com/en/general/troubleshooting/tpu-feed-assist-module), capturado 2026-10-19
- **El dato de la temperatura de carga, que es de proceso y no de impresión:** el
  hotend debe estar a **250 °C** para *cargar* TPU (*«standard temperature for
  loading TPU»*), tanto en la página de diagnóstico del módulo como en los
  procedimientos de carga y descarga de las guías de serie P y A.
  — [Bambu Lab, TPU Feed Assist Module — Common troubleshooting Steps](https://wiki.bambulab.com/en/general/troubleshooting/tpu-feed-assist-module), capturado 2026-10-19
  — [Bambu Lab, TPU 85A&90A printing guide for P series](https://wiki.bambulab.com/en/filament-acc/filament/tpu-85a-90a-printing-guide-for-p-series), capturado 2026-10-19
  — [Bambu Lab, TPU 90A printing guide for A series](https://wiki.bambulab.com/en/filament-acc/filament/tpu-85a-90a-printing-guide-for-a-series), capturado 2026-10-19
  **El 250 °C es del proceso de carga. La temperatura de impresión es otra cifra
  (225 °C en las guías de serie de Bambu).**

### Lo que el TPU es y no es, por propiedad

- **El TPU es muy higroscópico** —*«TPU filaments are highly hygroscopic»*— y el
  filamento húmedo produce hilos, burbujas y mala adhesión entre capas.
  — [Bambu Lab, TPU Printing Guide](https://wiki.bambulab.com/en/knowledge-sharing/tpu-printing-guide), capturado 2026-10-19
  **Las cifras de secado van a `secar-filamento` (ver `## Tirado`), no aquí.**
- **El TPU no es apto para contacto con alimentos:** *«TPU are NOT food-contact
  grade.»*
  — [Bambu Lab, TPU Printing Guide](https://wiki.bambulab.com/en/knowledge-sharing/tpu-printing-guide), capturado 2026-10-19
  **Va a `material`, no a esta guía. Ver `## Tirado`.**
- **El carrete se ensancha al secar, y eso es un dato de accesorio, no de
  impresión:** de **65,4 mm** a unos **69,4 mm** de ancho. Por eso la caja de 4 L
  (67,5 mm máximos) se queda corta y **Bambu recomienda la de 5,8 L** (108,5 mm):
  *«we strongly recommend using the 5.8L dryer box for TPU printing to ensure
  smooth and reliable filament feeding.»*
  — [Bambu Lab, TPU 90A printing guide for A series](https://wiki.bambulab.com/en/filament-acc/filament/tpu-85a-90a-printing-guide-for-a-series), capturado 2026-10-19
  — [Bambu Lab, TPU 85A&90A printing guide for P series](https://wiki.bambulab.com/en/filament-acc/filament/tpu-85a-90a-printing-guide-for-p-series), capturado 2026-10-19

### Las tres escenas de la prueba de utilidad

**Escena 1 — «TPU 95A en una bowden que se atasca en la primera capa».**
**SIN RESPALDO EN ESTE CORPUS.** Ninguna de las siete fuentes menciona un
extrusor bowden. Ver `## Sin respaldo`, primer punto. Lo que el corpus sí ofrece es
el mecanismo general —el problema del TPU es **la resistencia y el recorrido del
camino de filamento**—, con cuatro ejemplos que lo ilustran: la XL tiene
«a long path from the loading to the extruder nozzle», el 85A de Bambu no se puede
cargar por el tubo PTFE, la resistencia del PTFE por abolladuras atasca la
alimentación, y con 90A hay que colocar la pieza al frente de la cama «to reduce
friction between the filament and the PTFE tube». **La guía debe poder decir que
no hay evidencia para bowden, no deducirla de esos cuatro casos.**

**Escena 2 — «Un TPU que hace ruido de extrusor y sale con las capas separadas».**
**DECIDIBLE, con tres reglas que el corpus sí sostiene:**
1. **El ruido de extrusor es el engranaje apretando de más o no mordiendo.**
   Prusa: *«Loosen the idler so the gears push the filament through only very
   gently»*. Bambu: por debajo de 85A *«the material is too soft to be properly
   engaged by the extruder gears»*.
2. **Las capas separadas son una boquilla obstruida**, en Prusa: *«Skipped layers:
   The nozzle got clogged at some point.»* Y en Bambu, la infraextrusión
   por obstrucción de boquilla, resistencia de carga o deslizamiento del
   filamento.
3. **La tercera causa, que es de máquina y no del material:** un resto de filamento
   en la entrada del hotend **no lo expulsa un TPU**, porque es demasiado blando.

**Escena 3 — «Alguien con un AMS que mete TPU y la máquina no lo acepta».**
**DECIDIBLE, y la respuesta es del aparato:** el AMS / AMS lite / AMS 2 Pro **no
son compatibles con TPU**; el **AMS HT sí**, pero **sólo como cámara estanca y de
secado, sin su función de alimentación**, y el filamento entra por la salida TPU
dedicada. La causa que da la tabla de materiales es que el TPU es demasiado blando
para pasar por el canal del AMS. Y existe una excepción de producto: el filamento
**«TPU for AMS»** sí alimenta por el canal normal de todos los AMS. Ver
`## Contradicciones` §1.

## Contradicciones

**No se resuelven aquí.** Se anotan con su matiz, y el redactor tiene que explicar el
matiz en el artículo en vez de elegir un número o una fila.

### 1. El AMS: «Not Compatible» en la tabla contra «el AMS HT sí sirve» en la guía

- **La tabla de materiales, fila «TPU»:** *«TPU | Compatible | Compatible | Not
  Compatible»*, donde la última columna es «AMS / AMS lite Compatibility». La razón
  está en el mismo apartado: *«Too soft (e.g., TPU 95A/85A/83A/80A…): These cannot
  pass smoothly through the AMS / AMS lite channel.»*
  — [Bambu Lab, Filament guide — material table](https://wiki.bambulab.com/en/general/filament-guide-material-table), capturado 2026-10-08
- **La guía de TPU:** *«Among the AMS series, only the AMS HT supports printing with
  TPU filament»*; el AMS HT *«functions solely as a sealed enclosure — its standard
  outlet and automatic feeding functionality cannot be used»*; y *«Other AMS models
  (AMS / AMS Lite / AMS 2 Pro) are not compatible with TPU filament»*.
  — [Bambu Lab, TPU Printing Guide](https://wiki.bambulab.com/en/knowledge-sharing/tpu-printing-guide), capturado 2026-10-19
- **La guía de TPU, dos párrafos más abajo:** *«TPU for AMS filament is compatible
  with the standard feeding functionality of all AMS series models for loading and
  printing.»*
  — [Bambu Lab, TPU Printing Guide](https://wiki.bambulab.com/en/knowledge-sharing/tpu-printing-guide), capturado 2026-10-19

**El matiz, en tres partes. La tercera es la que impide escribir algo falso.**

1. **No son el mismo objeto.** La tabla habla de la **fila «TPU»**, que es la fila
   genérica, y del **AMS y el AMS lite**. La guía habla del **AMS HT** y de un
   **producto distinto** llamado «TPU for AMS». **La tabla de materiales no menciona
   el AMS HT en ninguna fila**: el AMS HT sólo aparece en su tabla de secado. De
   modo que **la tabla no contradice al AMS HT: no habla de él.**
2. **La contradicción real, y es de una sola pregunta:** *¿hay algún AMS que
   alimente TPU por su canal normal?* La tabla responde que **no** para AMS y AMS
   lite, con una razón física (el canal no deja pasar un filamento demasiado
   blando). La guía responde que **sí**, pero sólo con el filamento «TPU for AMS».
   **El redactor tiene que publicar la tabla por dispositivo**, decir que el AMS HT
   no alimenta, y explicar la excepción de producto. Lo que **no** se escribe es
   «el AMS no puede con TPU», porque el AMS HT puede y el «TPU for AMS» sí alimenta.
3. **Y hay una tensión interna en la propia guía de Bambu**, que el redactor tiene
   que tener presente: la misma página dice que «AMS / AMS Lite / AMS 2 Pro» **no**
   son compatibles con TPU y, a la vez, que el «TPU for AMS» **sí** funciona con la
   alimentación estándar **de todos** los modelos de la serie AMS. Las dos frases
   sólo son compatibles si «TPU for AMS» es un filamento distinto del TPU corriente
   —que es lo que dice el nombre—; **la página no lo explica**. Lo que no se hace
   es elegir una de las dos frases.

### 2. La boquilla de 0,4 mm con TPU 85A: la tabla dice «Compatible», la guía dice «no compatible»

- **La tabla de materiales, fila TPU 85A:** 0,2 mm «Not Recommended»; **0,4 mm
  «Compatible»**; 0,6 y 0,8 mm «Compatible»; high-flow 0,4 mm «Not Compatible»;
  high-flow 0,6 y 0,8 mm «Not Recommended».
  — [Bambu Lab, Filament guide — material table](https://wiki.bambulab.com/en/general/filament-guide-material-table), capturado 2026-10-08
- **La guía de TPU, tabla de boquillas, fila 85A:** *«Compatible: 0.6/0.8 mm / TPU
  high-flow hotend · Not recommended: High-flow 0.6/0.8 mm · Not compatible: 0.2/0.4
  mm / High-flow 0.4 mm»*, y en el texto: *«85A TPU filaments cannot be printed
  with 0.4mm nozzles.»*
  — [Bambu Lab, TPU Printing Guide](https://wiki.bambulab.com/en/knowledge-sharing/tpu-printing-guide), capturado 2026-10-19
- **La guía de la serie P** repite la misma fila: 85A *«Not compatible: 0.2 mm / 0.4
  mm / high-flow 0.4 mm»*.
  — [Bambu Lab, TPU 85A&90A printing guide for P series](https://wiki.bambulab.com/en/filament-acc/filament/tpu-85a-90a-printing-guide-for-p-series), capturado 2026-10-19

**El matiz:**

1. **La fila 85A @ 0,4 mm es una contradicción directa, sin forma de conciliarse.** La
   tabla lo marca compatible; la guía lo dice incompatible **en texto, no sólo en
   tabla**. **La guía es la fuente del requisito de la variante**, y la tabla es una
   tabla general de materiales: el redactor tiene que publicar **las dos**, con su
   fuente, y explicar que para el 85A la fuente que dice «no compatible» es la
   que habla del 85A.
2. **El 0,2 mm difiere en grado, no en dirección:** la tabla dice «Not
   Recommended» y la guía «Not compatible». No es lo mismo. Se publica con el
   matiz, sin fundir los dos términos.
3. **La fila 90A @ high-flow también difiere en grado:** la tabla marca el
   high-flow de 0,4 mm como «Not Compatible» y el de 0,6/0,8 como «Not
   Recommended»; la guía general marca «Not recommended: High-flow hotend» sin
   desglosar, y la guía de la serie P desglosa los tres como no recomendados. **La
   lectura sustantiva coincide en las dos casas; lo que cambia es el grado de la
   prohibición.** Lo que no se escribe es «el 90A no admite high-flow de 0,4 mm
   porque es incompatible», salvo que se cite a la tabla.

### 3. La temperatura de cama del TPU: 30–35 °C en Bambu, 55–75 °C en Prusa

- **Bambu, tabla de materiales, fila TPU:** **30–45 °C** con glue stick y **30–45
  °C** con glue líquido.
  — [Bambu Lab, Filament guide — material table](https://wiki.bambulab.com/en/general/filament-guide-material-table), capturado 2026-10-08
- **Bambu, tabla de materiales, por chapa:** Cool Plate «Not recommended»; Engineering
  Plate **30–35 °C**; Smooth PEI / HT **35–45 °C**; Textured PEI **35–45 °C**.
  — [Bambu Lab, Filament guide — material table](https://wiki.bambulab.com/en/general/filament-guide-material-table), capturado 2026-10-08
- **Bambu, guía de la serie P (85A y 90A):** cama **30–35 °C**.
  — [Bambu Lab, TPU 85A&90A printing guide for P series](https://wiki.bambulab.com/en/filament-acc/filament/tpu-85a-90a-printing-guide-for-p-series), capturado 2026-10-19
- **Bambu, guía de la serie A (90A):** cama **30–35 °C**.
  — [Bambu Lab, TPU 90A printing guide for A series](https://wiki.bambulab.com/en/filament-acc/filament/tpu-85a-90a-printing-guide-for-a-series), capturado 2026-10-19
- **Prusa, guía del Prusament TPU 95A:** cama **55–75 °C**.
  — [Prusa Research, Prusament TPU 95A material guide](https://help.prusa3d.com/article/prusament-tpu-95a-material-guide_899653), capturado 2026-10-13
- **Prusa, materiales flexibles en general:** cama **60–75 °C**, *«Depending on the
  size of the object, bigger objects tend to need higher bed temperature»*.
  — [Prusa Research, Flexible materials](https://help.prusa3d.com/article/flexible-materials_2057), capturado 2026-10-19

**El matiz, y aquí el matiz es casi todo el asunto:**

1. **La cifra de cama de un TPU no es una propiedad del material.** Cambia con el
   **filamento** y con la **máquina**, y en Bambu también con la **chapa**. Bambu
   publica 30–45 °C para un TPU genérico y 30–35 °C en sus guías de serie; **en
   Bambu lo que mueve la cifra es la chapa**: la Cool Plate está descartada («Not
   recommended»), la Engineering Plate va a 30–35 °C y la Smooth PEI / HT y la
   Textured a 35–45 °C. Prusa publica **una sola cifra por filamento**: 55–75 °C
   para su Prusament 95A y 60–75 °C para el material flexible en general, con la
   nota de que los objetos grandes piden más. **La lista de láminas de Prusa —PA
   Nylon, Satin, PP, Textured— es una recomendación de superficie, no una tabla de
   temperaturas por chapa**: en Prusa ninguna fuente da una cifra distinta por
   lámina, y no se escribe que la lámina mueva la temperatura.
2. **El adhesivo no es una cuarta dimensión de la cifra: es un requisito de
   superficie.** En la tabla de materiales de Bambu la fila del TPU da **30–45 °C
   con glue stick y 30–45 °C con glue líquido** —los dos adhesivos, la misma
   cifra—, y en la tabla por chapa **el adhesivo no aparece**: lo que aparece es la
   chapa. (En esa misma tabla de combinaciones el adhesivo **sí** desplaza la cifra
   de otros materiales —PET-CF/GF es «Not Compatible» con glue líquido, y PC y PA
   son «Not Recommended»—, pero **del TPU no**.) Lo que el adhesivo decide es **si
   hay que aplicarlo**: en la serie A hay que aplicarlo en todas las chapas salvo
   en la Textured PEI, que se vuelve demasiado pegajosa, y la Cool Plate SuperTack
   no admite TPU por adhesión excesiva; en Prusa el adhesivo es **capa separadora**
   en las láminas lisas o satinadas, y el Smooth PEI está marcada «Not recommended».
   **El redactor publica el requisito de adhesivo junto a la chapa, y no como una
   variable más de la temperatura: «la cama del TPU cambia con la chapa» es cierto;
   «cambia con el adhesivo» no lo es.**
3. **Por eso no se escribe «el TPU va a 30 °C» ni «el TPU va a 55 °C», ni un
   «30–75 °C» promediado.** Se publica la cifra con su máquina y su filamento, y en
   Bambu también con su chapa.
   **La cifra de cama va a `temperatura-cama`; lo que se queda aquí es que la cifra
   de cama del TPU cambia de un fabricante a otro y no es un valor del material.**
4. **Hay además una regla de cámara que sólo tiene sentido con esta diferencia:**
   en Bambu, con cama por encima de 45 °C y un material que reblandece por debajo
   de 60 °C —**el TPU**—, hay que abrir la puerta o quitar la tapa de cristal.
   — [Bambu Lab, Filament guide — material table](https://wiki.bambulab.com/en/general/filament-guide-material-table), capturado 2026-10-08

### 4. La temperatura de boquilla: cuatro cifras, tres alcances

- **Prusa, Prusament TPU 95A (un filamento concreto):** **220–240 °C**.
  — [Prusa Research, Prusament TPU 95A material guide](https://help.prusa3d.com/article/prusament-tpu-95a-material-guide_899653), capturado 2026-10-13
- **Prusa, materiales flexibles en general (cualquier TPU):** **230–245 °C**,
  *«Depending on hardness and brand»*.
  — [Prusa Research, Flexible materials](https://help.prusa3d.com/article/flexible-materials_2057), capturado 2026-10-19
- **Bambu, tabla de materiales (filamentos de Bambu):** **200–250 °C** para las
  cuatro filas de TPU, con el encabezado *«Nozzle temperature /℃ (±10 °C)»*.
  — [Bambu Lab, Filament guide — material table](https://wiki.bambulab.com/en/general/filament-guide-material-table), capturado 2026-10-08
- **Bambu, guías de serie (la temperatura de impresión que recomiendan):** **225 °C**
  para 85A/90A en la serie P y 90A en la serie A. **No es «el valor que trae el
  perfil»**: las dos páginas lo enuncian como temperatura *recomendada*, en un
  apartado que empieza *«In addition to the preset parameters, specific parameter
  settings should be adjusted according to the characteristics of the model»*, es
  decir, **un ajuste que se hace además del preset, no el preset**.
  — [Bambu Lab, TPU 85A&90A printing guide for P series](https://wiki.bambulab.com/en/filament-acc/filament/tpu-85a-90a-printing-guide-for-p-series), capturado 2026-10-19
  — [Bambu Lab, TPU 90A printing guide for A series](https://wiki.bambulab.com/en/filament-acc/filament/tpu-85a-90a-printing-guide-for-a-series), capturado 2026-10-19

**El matiz:** **no es una contradicción dura, es cuatro alcances distintos, y el
redactor no puede fundirlos en «el TPU va a 225 °C».** El 225 °C de las guías de
serie de Bambu es **un punto dentro** del rango 200–250 de la tabla (que además
tiene ±10 °C de tolerancia), así que **coinciden**. Los dos rangos de Prusa
también se solapan entre sí, y la diferencia entre 220–240 y 230–245 es el alcance:
un filamento concreto frente al material en general, con la coletilla *«depending
on hardness and brand»*. **Lo que se publica es la regla de Prusa («subir 5 °C
respecto al ajuste previo») y la temperatura que recomienda cada guía de serie, no
una cifra universal.** Y el 225 °C **se publica como temperatura recomendada por la
guía**, no como el valor de un perfil.

### 5. La retracción: desactivar o subir 0,2 mm

- **Prusa, con el riesgo de obstrucción y enredado como motivo:**
  *«With lower retractions, there is a lower risk of clogging the nozzle or filament
  tangling. It's alright to turn the retractions off completely and then try to
  raise them and watch the results.»*
  — [Prusa Research, Flexible materials](https://help.prusa3d.com/article/flexible-materials_2057), capturado 2026-10-19
- **Bambu, con el goteo severo como motivo:**
  *«If severe leaking occurs, try increasing the retraction distance by 0.2 mm from
  the original value.»*
  — [Bambu Lab, TPU Printing Guide](https://wiki.bambulab.com/en/knowledge-sharing/tpu-printing-guide), capturado 2026-10-19

**El matiz:** **las dos recomendaciones son correctas y apuntan en direcciones
opuestas porque hablan de síntomas distintos.** Prusa previene del **atasco y del
enredado**, y por eso bajar o desactivar la retracción es una salida legítima en
material flexible. Bambu atiende al **goteo severo**, y para eso un pequeño aumento
de la retracción ayuda. **El redactor tiene que presentar esto como una elección
por síntoma, no como dos reglas que se contradigan.** Y por el **gate 4**: **se
publica «desactivar la retracción» y «+0,2 mm para el goteo», y no se escribe «baja
la retracción a 0,2 mm», que ninguna fuente dice.**

### 6. El orden de las causas de los hilos: ¿sequedad o retracción?

- **Bambu, en el FAQ de TPU, la sequedad va en último lugar** entre las causas de
  hilos y goteo: el orden es «Print sequence By object», «Lower the nozzle
  temperature», «Adjust Retraction» y, en cuarto, *«Ensure the Filament Is Fully
  Dried»*.
  — [Bambu Lab, TPU Printing Guide](https://wiki.bambulab.com/en/knowledge-sharing/tpu-printing-guide), capturado 2026-10-19
- **Prusa, en el troubleshooting del TPU 95A, la sequedad va la primera y única:**
  *«Stringing: If the stringing occurs, try drying the filament as described
  above.»*
  — [Prusa Research, Prusament TPU 95A material guide](https://help.prusa3d.com/article/prusament-tpu-95a-material-guide_899653), capturado 2026-10-13
- **Prusa, en el artículo general de flexibles, la sequedad es una regla de
  impresión, no un diagnóstico:** *«Keep the filament dry. Flexible filaments tend
  to absorb moisture and can be hard to print when wet.»*
  — [Prusa Research, Flexible materials](https://help.prusa3d.com/article/flexible-materials_2057), capturado 2026-10-19

**El matiz:** **las tres son de Prusa y de Bambu, pero de páginas con distinta
finalidad**: el FAQ de Bambu es una lista de acciones para un TPU ya configurado, y
la guía de Prusa es un troubleshooting de un filamento concreto. **Que Bambu ponga
la sequedad en cuarto lugar no significa que sea la causa menos frecuente**, igual
que Prusa no dice que sea la única. **Lo que el redactor puede decir es que las dos
casas incluyen la sequedad entre las causas de hilos, y que el ajuste de
retracción es la otra mitad.** La salida a `secar-filamento` y a `stringing` es la
que ya está cocida en `wiki/cooked/secar-filamento.md` y
`wiki/cooked/stringing-retraccion.md`.

### 7. La superficie: ¿satinada con separador o sin separador?

- **Prusa, artículo general de flexibles:** *«If you print on a smooth or satin
  sheet, apply a separation layer on it (glue stick or Kapton tape should work).
  The powder-coated TXT sheet does not need any separation layer.»*
  — [Prusa Research, Flexible materials](https://help.prusa3d.com/article/flexible-materials_2057), capturado 2026-10-19
- **Prusa, guía del Prusament TPU 95A:** *«Satin sheet: The most recommended print
  surface. Clean the surface with IPA…»* — **sin capa separadora** — y **«Smooth PEI
  sheet: Not recommended»**, con separador sólo si se decide usarla.
  — [Prusa Research, Prusament TPU 95A material guide](https://help.prusa3d.com/article/prusament-tpu-95a-material-guide_899653), capturado 2026-10-13
- **Bambu:** *«Except for the Cool Plate SuperTack, all other types of plates are
  compatible with TPU filaments»*, y la tabla de materiales da 35–45 °C para la
  Smooth PEI / HT y para la Textured PEI.
  — [Bambu Lab, TPU Printing Guide](https://wiki.bambulab.com/en/knowledge-sharing/tpu-printing-guide), capturado 2026-10-19

**El matiz:** **la contradicción es intra-Prusa y de grado.** El artículo general dice
que la superficie satinada **exige separador**; la guía del material concreto dice
que la satinada es **la más recomendada** y no menciona separador. Además las dos
guías de Prusa nombran láminas distintas —la general habla de *satin sheet* y de la
*TXT powder-coated*, la del 95A de *PA Nylon, Satin, PP y Textured*— y **la TXT
powder-coated no aparece en la guía del 95A**, igual que la Textured Spring-steel
no aparece en la general. Y **Bambu dice lo contrario sobre el PEI liso**: lo da
como compatible con 35–45 °C, mientras Prusa lo marca «Not recommended». **Lo que
el redactor escribe es por máquina y por chapa, con la fuente al lado, y no una
regla única de «chapa correcta para TPU».**

## Sin respaldo

**Todas las siete fuentes de este lote son documentación oficial de fabricante**
(Prusa Research y Bambu Lab), que son **fuentes primarias y no necesitan marca de
respaldo**. No hay ningún foro en el lote. Lo que va en este apartado son
afirmaciones que **el corpus no sostiene**, huecos reales, y extrapolaciones que
tienen una fuente pero se le están pidiendo más de lo que dice.

- **Los extrusores bowden: no hay ninguna fuente.** **[HUECO REAL DEL CORPUS]**
  Ninguna de las siete fuentes menciona un extrusor bowden, un tubo PTFE largo, ni
  una máquina con el extrusor separado del cabezal. **La escena 1 de la prueba de
  utilidad no tiene respaldo.** Lo que el corpus sí sostiene es el **mecanismo**
  general (la resistencia y el recorrido del camino de filamento), con cuatro
  casos que lo ilustran: la XL de Prusa tiene «a long path from the loading to the
  extruder nozzle»; el TPU 85A de Bambu **no se puede cargar por el tubo PTFE**; la
  resistencia del PTFE por abolladuras atasca la alimentación; y con 90A hay que
  colocar la pieza al frente de la cama «to reduce friction between the filament
  and the PTFE tube». **El redactor tiene que decir «no hay evidencia para
  extrusores bowden en este corpus» y no convertir esos cuatro casos en una regla
  de bowden.** Una fuente nueva del KB de Prusa o de Bambu sobre máquinas de
  filamento remoto es lo que cerraría el hueco.
- **Que un TPU 95A funcione en una bowden.** **[NO SE ESCRIBE]** Por la misma razón.
  Ni a favor ni en contra.
- **Que el adhesivo cambie la temperatura de cama del TPU.** **[NO SE ESCRIBE]**
  Ninguna de las siete fuentes dice eso. En la tabla de materiales de Bambu la fila
  del TPU da **30–45 °C con glue stick y 30–45 °C con glue líquido**, y la tabla por
  chapa no menciona el adhesivo: lo que mueve la cifra es la chapa. **El adhesivo es
  un requisito de superficie** —aplicarlo o no, y con qué—, y en Prusa es además
  **capa separadora**. Ver `## Contradicciones` §3.
- **Una lista de impresoras que «soportan TPU» fuera de las dos casas.** **[HUECO]**
  El corpus sólo cubre hardware de Bambu (H2, X1, P, A1, A2L) y de Prusa (NXTR,
  MK3S+, MK4, MK4S, XL, CORE One / One+ / One L, Pro HT90). **Cualquier otra
  marca —Creality, Elegoo, Anycubic, un clon de Prusa— no aparece en ninguna
  fuente.** La guía no puede decir «las impresoras de husillo funcionan» ni
  «depende».
- **Las cifras de la serie X1 de Bambu.** **[HUECO]** La guía general enlaza a una
  guía de TPU para la serie X1, pero **no está en este lote**: la única guía de
  serie disponible es la de P y la de A. **No se publica ninguna cifra de la X1.**
- **La variante TPU 95A HF de Bambu, en detalle.** **[ALCANCE]**
  La tabla de la guía general la incluye en la compatibilidad de impresora y en la
  de boquillas, y la tabla de materiales le da 200–250 °C, pero **ninguna de las
  siete fuentes da un procedimiento de carga, descarga o ajustes para el 95A HF**.
  Lo único que se publica es lo que aparece en las tablas, con su fuente.
- **El TPU 85A en la serie A2L.** **[ALCANCE]** La tabla general marca A2L ✅ para
  el 85A, pero **ninguna fuente da el procedimiento de carga del 85A en la A2L**:
  el procedimiento de carga del 85A que hay es el de la serie P (entrada por
  arriba, sin tubo PTFE), y **no se puede dar por válido en la A2L**.
- **Que el 85A sea «demasiado blando» en general, y no sólo en las Bambu.**
  **[ALCANCE DE LA FUENTE]** El umbral de 85A está enunciado por Bambu, y la frase
  es explícita sobre su alcance: *«Bambu Lab printers do not currently support
  printing with TPU filaments rated below 85A hardness»*. **Prusa no enuncia ningún
  umbral de dureza**; su regla es la inversa y cualitativa, *«the softer the
  filament is, the harder it is to print»*, y su TPU es un 95A. **El redactor no
  escribe «por debajo de 85A ninguna impresora puede con TPU»**: eso no lo dice
  ninguna fuente.
- **Que el 85A de Bambu sea inyectable en el AMS.** **[NO SE DICE]** La guía dice
  que el «TPU for AMS» alimenta por el canal normal de todos los AMS. **No dice que
  el TPU 85A de la gama normal lo haga**, y la tabla de materiales marca la fila
  genérica «TPU» como «Not Compatible». Ver `## Contradicciones` §1.
- **Los 135 segundos de la protección de extrusión en seco.** **[UNA SOLA FUENTE
  PRIMARIA, SIN CORROBORAR EN EL LOTE]** El número sale sólo de la página de
  diagnóstico del módulo TPU Feed Assist, y **la página de montaje y calibración
  del módulo —que es donde estaría la corroboración— no está en el lote**. Es
  documentación de fabricante, así que no lleva marca de «fuente secundaria»,
  pero el redactor debe publicarlo **como el valor de ese módulo**, no como un
  tiempo genérico de alimentación de TPU.
- **El ensanchamiento del carrete de 65,4 mm a 69,4 mm al secar.** **[DOS PÁGINAS
  DE LA MISMA CASA, NO DOS FUENTES]** Aparece en la
  guía de la serie P y en la de la serie A, que son la misma casa: **son dos
  publicaciones del mismo dato, no dos fuentes independientes.** La consecuencia
  operativa (la caja de 4 L se queda corta, la de 5,8 L es la recomendada) sí sale
  de las dos.
- **El ancho máximo de las cajas (67,5 mm y 108,5 mm).** **[UNA SOLA FUENTE]**
  Sólo la guía de la serie A los da. La recomendación de usar el AMS HT o una caja
  estanca sí aparece también en la guía general de TPU (*«we recommend using AMS
  HT or filament dry box»*), pero **la recomendación concreta de la caja de 5,8 L
  es sólo de la guía de la serie A**.
- **El «flex filament bypass» de la XL.** **[FUENTE PRIMARIA, ENLACE NO DESCARGADO]**
  El nombre y el hecho existen en la fuente, pero **el modelo 3D está en
  Printables**, fuera del registro de fuentes: **no se cita nada del modelo ni de
  su URL**, sólo el hecho de que existe un bypass para la XL.
- **La «guía de filamento» del MK4/MK4S.** **[FUENTE PRIMARIA]**
  El uso del filament guide está en la guía del Prusament 95A. No hay ninguna otra
  fuente del lote que lo mencione.
- **Que el ventilador OFF sea universal.** **[ALCANCE]** Prusa dice *«Keep print
  cooling turned off»* en el contexto de **material flexible en general**, y en el
  troubleshooting del 95A dice *«lowering the fan speed»* (no «apagarlo»). **El
  redactor no escribe «ventilador a 0» como regla del TPU.**
- **Que el TPU 90A sirva para suelas de zapato, fundas de móvil o correas de
  reloj.** **[PROPEDAD DECLARADA, SIN PRUEBA]** Las tres guías de serie de Bambu
  listan esas aplicaciones, y Prusa lista *«stamps, RC tires, shoe soles, belts»*.
  **Son aplicaciones declaradas por el fabricante, no datos verificados.** Se
  pueden publicar como «aplicaciones típicas», no como propiedades demostradas.
- **La vida útil del carrete, o su resistencia a la humedad.** **[HUECO]** Ninguna
  fuente de este lote da plazos de almacenamiento del TPU. **Las cifras de humedad
  objetivo (20 % RH) y de secado van a `secar-filamento`.**

## Tirado

Qué se ha eliminado y por qué. El redactor no usa nada de esto.

**Relleno estándar, ausente en estas fuentes pero excluido por defecto:**

- **Navegación, menús, migas de pan, «compartir», «suscríbete».**
- **Anuncios y banners.**
- **Piezas de producto, precios y enlaces de compra**: la tienda de filamento de
  Bambu (*us.store.bambulab.com*), el *switching adapter* de AMS 2 Pro y su nota
  de garantía (*«Using a third-party adapter may damage the device and affect your
  warranty coverage»*), los modelos de portacarretes de MakerWorld y el *spool rack*
  de TPU, el *4L/5.8L sealed filament box holder*, el *5.8L sealed filament box
  holder* y los portacarretes de 4 L y 5,8 L. **Los nombres y las medidas de los
  productos sí se conservan cuando son el sujeto de una afirmación** (la caja de
  5,8 L es la recomendada porque el carrete se ensancha), pero **no se cita nada
  de los enlaces de compra o descarga**.
- **Cuestionarios y surveys.** No presentes.
- **Cierres de página de Bambu** («envía un ticket técnico con los logs», «Bambu
  AI, which can instantly answer»), que no son contenido.
- **La línea de Prusa** *«Was this article helpful? … Please log-in»* y la nota de
  idioma: son de la aplicación, no del artículo.

**Cifras que son de impresión y salen de aquí (gate 5):**

- **La temperatura de cama del TPU en sus cuatro versiones** (Bambu 30–45 °C en
  tabla y 30–35 °C en guías de serie; Prusa 55–75 °C y 60–75 °C): va a
  `temperatura-cama`. **Lo que se conserva aquí es que la cifra cambia de
  fabricante a fabricante y no es un valor del material**, más la regla de
  cámara (con cama > 45 °C y un material que reblandece por debajo de 60 °C, abrir
  puerta o quitar tapa).
- **La temperatura de boquilla 200–250 °C** de la tabla de Bambu: sale de la tabla
  con ella. La regla de Prusa («subir 5 °C») y el 225 °C de las guías de serie
  **son de impresión y se quedan**, porque son la diferencia entre máquinas que
  el redactor tiene que poder explicar.
- **Todo el secado del TPU**: la fila de la tabla de materiales (Required / 70 °C
  8 h en horno / AMS 2 Pro «Not recommended» / 75 °C 12 h en AMS HT / desecante
  «Required»), el «drying before printing is essential», los 250 °C de la cama
  como secador en la serie X/P/H2, el «no se puede secar en la cama» de la A1
  (que es un dato de máquina, y se conserva), los 20 % RH de almacenamiento, los
  65,4 → 69,4 mm del carrete (que **sí** se conserva, porque es un dato de
  alimentación, no de secado) y la recomendación de la caja de 5,8 L (que **sí**
  se conserva, por lo mismo). **El secado está ya cocinado en
  `wiki/cooked/secar-filamento.md`, con sus contradicciones ya anotadas.**

**Apartados enteros de las fuentes que no son de este tema:**

- **De la guía general de TPU de Bambu:** el procedimiento completo de montaje de
  la salida TPU del AMS HT con el tubo PTFE de 50 mm y los 5 mm de inserción
  (procedimiento de accesorio), la sección de *Filament Storage* con sus
  recomendaciones de contenedor, el aviso de no apto para contacto con alimentos
  (→ `material`), el aviso de ventilación y el de alcance de niños y mascotas
  (advertencias de seguridad del producto, no del material), la **retirada del
  soporte PLA con alcohol** y el **spray de alcohol para despegar de la cama**
  (procedimientos de postprocesado → `voladizos-y-soportes` y
  `adhesion-primera-capa`), la nota de la placa de cristal superior de las P y el
  procedimiento de purgado con PLA Matte.
- **De la guía de la serie P:** la sección «P2S Loading and Unloading», que en el
  crudo está **vacía** (sólo queda un `*` de vídeo incrustado no descargado), y el
  procedimiento de **flushing con PLA Matte a 250 °C** con sus tres a cinco
  repeticiones, que es de mantenimiento del hotend.
- **De la guía de la serie A:** el procedimiento de flushing con PLA Matte, el
  tutorial de limpieza del extrusor de la A1 (enlazado, no descargado), las
  medidas de las cajas de 4 L y 5,8 L (sólo se conserva la consecuencia, la del
  ancho del carrete), los enlaces de portacarretes y las capturas de vídeo.
- **De la página de diagnóstico del módulo:** **el procedimiento de desmontaje
  completo del extrusor del módulo** (los ocho tornillos de la carcasa, los dos de
  la placa, los dos del bloque, el pestillo del conector Hall, la colocación de
  los shims y los muelles y los tornillos del cuerpo) y **el tutorial de
  limpieza**, con sus siete pasos. Es mantenimiento de un accesorio, y la
  **calibración del módulo** —a la que la página remite dos veces— **no está en el
  lote**: el enlace va a `/en/general/manual/tpu-feed-assist-module`, **fuera de
  los prefijos permitidos**, y no se ha descargado. **No se cita nada de esa
  página.**
- **De la guía de Prusament TPU 95A:** la recomendación de **secar al menos 4 h a
  60 °C**
  (→ `secar-filamento`), las **burbujas en el filamento** (→ `secar-filamento`),
  el **calentamiento de la chapa a 40 °C para retirar la pieza con espátula**
  (procedimiento de retirada de placa), el **«dynamic overhang speed for 0%
  overlap» de PrusaSlicer** (→ `voladizos-y-soportes`, y además es un ajuste de
  modo Experto), y la referencia a la ruta «PrusaSlicer / Print Settings / Speed».
- **De la tabla de materiales de Bambu:** toda la tabla de boquillas de los
  materiales que no son TPU (PLA, PETG, ABS, ASA, PC, PA-CF/GF, PET-CF, Support,
  PPA-CF, PPS-CF), la tabla de temperaturas de cama de esos materiales, la tabla
  de secado completa (sólo se conserva la fila de TPU, y además va a
  `secar-filamento`), la tabla de propiedades mecánicas por estrellas (resistencia al
  calor, al impacto y a la tracción), la nota de que no se limpie la placa con
  acetona, y el bloque de boquillas endurecidas para fibra (excepto la nota de
  que «The nozzle and extruder gears require more frequent maintenance», que sí
  es relevante y se ha conservado en la sección de engranajes).

**Enlaces y fuentes que no se han descargado, y de las que no se cita nada:**

- `/en/general/manual/tpu-feed-assist-module` (montaje, uso y calibración del
  módulo): **fuera de los prefijos permitidos**.
- `/en/general/manual/tpu-high-flow-hotend` (el hotend específico de TPU): fuera de
  prefijos. **El «TPU high-flow hotend» aparece en las tablas de boquilla, y eso
  se cita; sus características, no.**
- `/en/h2d/manual/tpu-high-flow-hotend`, `/en/h2/h2d-tpu-printing-guide`,
  `/en/filament-acc/filament/tpu-85a-90a-printing-guide-for-x-series`,
  `/en/a2l/manual/tpu-printing-guide`, `/en/x2d/manual/tpu-printing-guide`: **las
  guías por serie que faltan** (X1, H2, A2L, X2D). Sus cifras no se publican.
- `/en/filament-acc/filament/dry-filament`, `/en/knowledge-sharing/common-print-quality-problem`,
  `/en/knowledge-sharing/tpu-printing-guide#reducing-feeding-resistance-comparison-across-models`:
  **la subsección «Reducing Feeding Resistance» de la propia guía de TPU** es
  exactamente el apartado que falta sobre resistencia de alimentación, y **no está
  en el lote**: el ancla existe en la página, pero el contenido no se ha extraído
  como sección separada en el crudo. **Lo que se publica es el sumario de la
  página, no ese apartado.**
- `/en/h2s/maintenance/nozzle-cold-pull-maintenance-and-cleaning`,
  `/en/a1-mini/troubleshooting/nozzle-clog`, `/en/a1-mini/troubleshooting/extruder-clog`,
  `/en/x1/troubleshooting/nozzle-clog#cold-pull-method`, `/en/h2s/.../cold-end-clogging`,
  `/en/p1/manual/p1s-cold-pull`: tutoriales de cold pull y limpieza. **No se cita
  nada de ellos**; lo que se cita es la recomendación de hacer cold pull, que está
  en el cuerpo de las páginas.
- `printables.com/model/858033-flex-filament-bypass`, los modelos de MakerWorld
  (`makerworld.com` y `makerworld.com.cn`), `us.store.bambulab.com`, el blog
  `blog.prusaprinters.org/how-to-print-with-flexible-filament`, la tabla de
  materiales de Prusa (`/en/materials`): **fuera del registro o de los prefijos
  permitidos.** De esta última **no se cita nada**, aunque la guía general de
  flexibles remite a ella para comparar propiedades.

**Erratas y rarezas del original, conservadas en el crudo y no corregidas aquí:**
«AMS Seires» por «Series», «filament cannot be extruder» (falta la d), «The TPU
power module» por «feed assist», «the official bambu Lab filament» con «bambu» en
minúscula, los `printsequenceByobject` pegados, «include yourrecent printer
logs», «yourrequestand provide», «Bambu AI,which», «recommended» con «r» doble en
dos sitios de la guía de la serie A, «0,3 mm» con coma decimal en Prusa, «Increase
'XY separation» con la comilla simple mal cerrada, las dobles negritas sueltas
(`**°**C`), el `*` suelto donde iría un vídeo incrustado, y los fragmentos de
maquetación en chino (`类似格式展示`, `H2 系列`, `X1 系列`, `P1 系列`, `A2L`, `X2D`,
`tpu指南-头图en.png`, `关闭校准_en.png`, `料桶侧边开孔.jpeg`, `耗材正常旋转.gif`,
`tpu_喷酒精拆除支撑.gif`, `冲刷-en.gif`, `取下上盖玻璃.jpg`, `料架放置示意.jpg`,
`90a摆放.png`, `收纳箱.jpeg`, `烘烤前后对比.png`, `料桶对比.png`, `耗材架.jpg`,
`耗材插入五通.jpg`, `断开_ptfe_管.jpg`, `退料-en.gif`, `升温点进料-en.gif`). **No se
corrige nada y no se citan como afirmaciones.**

## Relaciones

| Concepto | Se relaciona con | Cómo |
|---|---|---|
| TPU flexible | [[material\|Material]] | la **escala Shore** y la ordenación de durezas (77D > … > 95A > 90A > 85A > … > 70A) son del **material**, no de la máquina |
| TPU flexible | [[secar-filamento\|Secar filamento]] | el TPU es **muy higroscópico**; el secado es **obligatorio** en Bambu. **Las cifras de secado y de humedad no se repiten aquí** |
| TPU flexible | [[temperatura-cama\|Temperatura de cama]] | **la cama del TPU no es un valor del material**: 30–35 °C en Bambu, 55–75 °C en Prusa. **Cambia con la máquina y con la chapa** (Engineering 30–35 °C; Smooth PEI / HT y Textured 35–45 °C). **El adhesivo no mueve la cifra: es un requisito de superficie** |
| TPU flexible | [[temperatura-hotend\|Temperatura de hotend]] | 225 °C en las guías de serie de Bambu, 200–250 °C en la tabla, 220–240 °C el Prusament 95A, 230–245 °C el flexible en general. **El 250 °C de Bambu es de carga, no de impresión** |
| TPU flexible | [[stringing\|Stringing]] | los hilos con TPU tienen **dos candidatas**: sequedad y retracción. **Desactivar la retracción es una salida legítima**; el «+0,2 mm» de Bambu es para el goteo severo |
| TPU flexible | [[flow-rate\|Flujo]] | la infraextrusión con TPU la lista Bambu como **velocidad, resistencia de carga y hotend con residuo** — el flujo no aparece |
| TPU flexible | [[separaciones-entre-capas\|Separaciones entre capas]] | **capas saltadas = boquilla obstruida**, según Prusa. No es un problema de adhesión entre capas |
| TPU flexible | [[adhesion-primera-capa\|Adhesión y primera capa]] | el TPU **se pega fuerte** a la cama: hay que levantar una esquina y aplicar alcohol. Y Bambu dice que **cama > 45 °C con TPU obliga a abrir la cámara** |
| TPU flexible | [[placas\|Placas]] | la **Cool Plate SuperTack no sirve** (adhesión excesiva) y la **Textured PEI no admite adhesivo** (se vuelve pegajosa). Cada casa con su catálogo de láminas |
| TPU flexible | [[voladizos-y-soportes\|Voladizos y soportes]] | los flexibles hacen **puentes y voladizos muy malos**; con TPU el soporte debe ser **PLA**, no TPU |
| TPU flexible | [[max-volumetric-speed\|Flujo máximo]] | con TPU se **mantiene el límite por defecto** y no se sube la velocidad; Prusa da 20 mm/s típicos y 30–40 mm/s máximos |
| TPU flexible | [[enclosure-y-warping\|Enclosure y warping]] | el TPU **no necesita cámara cerrada** («Not prone to warping»), pero sí hay que gestionar la temperatura de la cámara si la cama pasa de 45 °C |
| TPU flexible | [[relleno-patrones\|Relleno y perímetros]] | más relleno y perímetros = más resistencia mecánica; menos = más flexibilidad. **El compromiso tiene un precio en puentes** |
| TPU flexible | [[slicer\|Slicer]] | hay que **desactivar la calibración de dinámica de flujo** antes de imprimir TPU (Bambu), y Prusa da perfiles concretos de terceros |
| TPU flexible | AMS | **el AMS / AMS lite / AMS 2 Pro no son compatibles con TPU**: el filamento demasiado blando no pasa por el canal. **Es un límite del aparato** |
| TPU flexible | AMS HT | **sirve de cámara estanca y de secado, pero su función de alimentación no se usa**: el filamento entra por la salida TPU dedicada |
| TPU flexible | AMS | la **tabla de materiales no menciona el AMS HT en ninguna fila**: no lo contradice, no habla de él |
| TPU flexible | cambio automático de filamento | la Prusa tiene la misma limitación: *«automatic filament change might not work properly with flexible filaments»*. Y Bambu no puede descargar con cutter |
| TPU flexible | TPU Feed Assist Module | accesorio **existente por el TPU**: reduce la resistencia de alimentación y elimina atascos, pero tiene **protección de extrusión en seco a los 135 s** y hay que calibrarlo y bajar el engranaje en modo alimentación |
| TPU flexible | engranaje del extrusor | **el idler se afloja** (Prusa) y **por debajo de 85A el engranaje no muerde** (Bambu). El desgaste del engranaje causa deslizamiento |
| TPU flexible | Shore A 85A | **el umbral es de engranaje, no de gusto**: por debajo de 85A las impresoras Bambu no lo soportan |
| TPU flexible | Shore A 90A / 95A | **más duro = más fácil de alimentar y de imprimir**. El 85A necesita boquilla de 0,6/0,8 y carga directa, sin tubo PTFE |

**Páginas propias que este tema sugiere:**

- *Alimentación de filamento flexible*, porque el problema central no es la
  temperatura sino **el camino**: idler, engranajes, sensor de filamento, tubo
  PTFE, dirección de rotación, spool elevado, y el accesorio que existe por
  esto. Tiene reglas de Prusa y de Bambu que no se pueden fusionar en una.
- *Umbral de dureza y engranaje*, porque el 85A es un **umbral de la máquina**
  con tres consecuencias distintas (no lo muerden los engranajes, no se carga por
  el PTFE, no admite boquilla de 0,4 mm) y porque **cada casa tiene su cifra**:
  Bambu 85A, Prusa sin umbral publicado.
- *Variantes de TPU*, porque la tabla de la guía general de Bambu cruza **cuatro
  variantes × tres grupos de impresoras** y **cuatro variantes × cuatro tipos de
  boquilla**, y esa matriz es un producto propio: `TPU 85A`, `TPU 90A`, `TPU 95A
  HF` y `TPU for AMS` **no son cuatro nombres del mismo filamento**.
