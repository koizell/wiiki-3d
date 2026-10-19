# Revisión de `secar-filamento` — primera vuelta

**Veredicto: RECHAZADO** — 10 fallos, de los cuales 2 bloqueantes.

Guía: `src/content/guias/secar-filamento.ts` (685 líneas). Cocinado:
`wiki/cooked/secar-filamento.md`. Brief: `wiki/briefs/secar-filamento.md`.
Fuentes crudas: las seis del lote, abiertas **por su ruta real** y no por el nombre del
fichero (`material-bambulab-drying.md` es la reutilizada, con la URL de la página de
secado de Bambu en su frontmatter).

**Comprobado contra `wiki/raw/`, no contra el cocinado.** El artículo y el cocinado
coinciden por construcción, así que compararlos sólo detectaría lo que el redactor se
inventó por su cuenta. Cada cifra de este artículo se ha contrastado con el cuerpo de la
fuente de la que sale: la tabla de Appendix I de Bambu (`material-bambulab-drying.md:121-144`),
la tabla de Prusament (`secar-filamento-prusa-kb-drying-filament.md:78-90`), el §1.4 de
Bambu (`:50-54`), el Appendix II y III de Bambu (`:148-180`, `:182-241`), la página de
calidad de impresión de Bambu (`secar-filamento-bambu-wiki-common-print-quality-problem.md`),
la página de hilos de Prusa (`secar-filamento-prusa-kb-stringing-and-oozing.md`), la del
horno Memmert (`secar-filamento-prusa-kb-memmert-uf-oven-drying.md`) y la caja estanca
(`secar-filamento-bambu-wiki-sealed-box.md`).

**Lo que hay que decir primero, porque es lo bueno: la matriz numérica de la guía es
exacta.** Las 19 reglas con cifra y las 7 tarjetas con cifra —26 conjuntos de valores—
se han contrastado una a una con la tabla de Bambu y con la de Prusa, y **todas
cuadran**. No hay ni un setpoint inventado, ni una cifra interpolada, ni un tiempo que
la fuente no dé. Las dos trampas que el material cocinado avisó están **bien tratadas**
(ver más abajo). Los diez fallos de este informe son de **alcance, atribución y
citación**, no de números.

No se ha modificado la guía, ni el cocinado, ni las fuentes crudas.

## Comprobaciones

| # | Comprobación | Resultado |
|---|---|---|
| 1 | Afirmaciones con respaldo | **FALLA** — 2 afirmaciones contradichas por la fuente cruda: el alcance de la tabla de Prusa (la guía dice que no cubre el PC, y la fuente tiene tres filas de PC) y el alcance de las variantes de PLA (el Aero no sube la cama) |
| 2 | Contradicciones internas | PASA — con una nota: la frase del PLA Aero (fallo 3) queda en tensión con la regla `cama-pla`, que publica 60–70 °C para todo el material `pla` |
| 3 | Relleno y frases de IA | PASA — ninguna fórmula canónica («en resumen», «cabe destacar», «en el mundo de la impresión 3D»…); ningún párrafo sin dato: las 7 tarjetas con cifra y las 19 reglas con cifra llevan número, comparación o fuente propia |
| 4 | Las cuatro etapas, y que hagan algo | **FALLA** — 3 reglas con cifra y sin `alcance` (`horno-pla-cf`, `amsht-abs-pc`, `horno-abs-pc`) cuando la fuente acota esas filas; 1 tarjeta con cifras que dependen del material y sin `cuando`; 1 regla con sus cifras enterradas en el `porque` |
| 5 | Citas correctas y accesibles | **FALLA** — 1 cita entrecomillada que **no está en ninguna fuente** (motivo de rechazo por sí solo) y 1 cita no literal; las 6 URLs de `fuentes` sí están en `wiki/raw/` con ese mismo `url` y no hay ninguna repetida |

### Comprobación 4 en detalle

La estructura está bien montada y las comprobaciones mecánicas del propio repositorio
pasan. Como `secar-filamento` **todavía no está en el registro `GUIAS`**
(`src/lib/guias.ts:80`), `npm run verify:guias` no la ha mirado. Se han replicado sus
comprobaciones sobre el módulo en `/tmp/opencode/check-secar.mjs` (sin tocar el
repositorio): **pasan todas** —condiciones sin variables imposibles, ninguna variable
decorativa, cada variable cambia el resultado en algún montaje, negritas equilibradas,
enlaces internos existentes, cifras con nota de alcance, etc.

Lo que sí falla es lo que la comprobación automática no puede ver:

- **3 reglas con cifra y sin `alcance`**: `horno-pla-cf` (`:365`), `amsht-abs-pc`
  (`:440`), `horno-abs-pc` (`:482`). Las tres salen de la tabla de Bambu, que está
  acotada por filas, y en dos de ellas la fila que la regla aplana tiene **otra cifra**
  (fallo 4).
- **La tarjeta `petg` (`:193`) no lleva `cuando`**, y sus cifras —65, 60–65, 75–85 °C y
  el 55 °C que no es setpoint— son todas del PETG. Sus hermanas materiales sí están
  filtradas: `pa` (`cuando: { material: 'pa' }`), `pc` (`cuando: { material: 'pc' }`),
  `lw-pla` (`cuando: { material: 'pla' }`).
- **La regla `guardar-sellado` (`:545`) lleva sus cifras en el `porque`** —20 % RH, 2–7
  días, 55 % RH, 2–12 h— y no en `valor`. La acción no lleva cifra, así que la
  comprobación automática no lo ve, pero el número que se lee es el del `porque`.

## Fallos, con dónde y qué hacer

### 1 · Bloqueante · La guía dice que la tabla de Prusa no cubre el PC, y la tiene en tres filas

**Dónde:** conocimiento, tarjeta `prusa-tabla`, `:232`.

**Qué dice:** «Su alcance se nota en lo que no cubre: no da cifras propias para **ABS, PA
sin fibra, TPU de otras marcas, PC, PET-CF ni PVA**.»

**Por qué falla:** la tabla de Prusa **sí** tiene filas de PC, y de ASA
(`wiki/raw/secar-filamento-prusa-kb-drying-filament.md:78-90`, literal):

```
| ASA                     | 80 ºC | 4 hours   |
| PC Blend                | 85 ºC | 5 hours   |
| PC Blend Carbon Fiber   | 90 ºC | 4 hours   |
| PC Space Grade          | 90 °C | 4-6 hours |
```

Lo que la fuente no cubre es **ABS**, y el PC está en tres variantes de Prusament. La
guía, además, publica **cuatro reglas de PC** (`ams2pro-no-llega`, `amsht-abs-pc`,
`horno-abs-pc`, `cama-abs-pc-pa`), todas de la tabla de Bambu: el lector al que le digan
«no hay cifras de PC en Prusa» no tiene forma de saber que las hay, ni de comparar.

**Lo que se pierde al decirlo así** es el matiz que la guía sí publica para el PLA, el
PETG, el TPU y el PA11 CF. Para el **ASA** las dos casas discrepan en el tiempo y nadie
lo dice: Bambu da 80 °C / **8 h** en el AMS HT (`material-bambulab-drying.md:132`), Prusa
da 80 ºC / **4 h** sin método asignado (`…drying-filament.md:85`). Es exactamente el caso
del PLA (45 °C / 12 h frente a 45 °C / 6 h) que la guía explica en el `alcance` de
`ams-pla`. Lo mismo con el PC: Prusa da 85 °C / 5 h para el PC Blend y 90 °C / 4–6 h
para el PC Space Grade, frente a los 80 °C / 8 h del AMS HT de Bambu.

**El error no nació en la guía**, y esto hay que decirlo porque si no vuelve por la misma
puerta: está en las **notas del recolector**
(`secar-filamento-prusa-kb-drying-filament.md:135-139`), que se contradicen en la misma
frase —«No cubre … **PC** … con cifras propias: los que aparecen son Woodfill, PVB,
PETG, TPU, PP CF/GF, **ASA, PC Blend, PC Space Grade**, PA11 CF y PEI»— y de ahí pasó a
`wiki/cooked/secar-filamento.md:221`, y de ahí a la guía.

**Qué hacer:** (a) corregir la lista de lo que la tabla de Prusa no cubre: **ABS**, PA sin
fibra, TPU de otras marcas, PET-CF y PVA; el PC y el ASA **sí** están. (b) publicar el
matiz del ASA y del PC con la misma fórmula que ya usan las otras reglas: «Prusa da X °C
y Y h para su ASA, sin método asignado; no se promedian». (c) Como el error está también
en el cocinado, **corregirlo en `wiki/cooked/secar-filamento.md`**, o la próxima vuelta
lo vuelve a traer.

### 2 · Bloqueante · Una cita entrecomillada que no está en ninguna fuente

**Dónde:** conocimiento, tarjeta `prusa-tabla`, `:234`.

**Qué dice:** la cita es *«the recommended drying temperatures and times for the Prusament
materials»*.

**Por qué falla:** `grep` de esa cadena en `wiki/raw/` **no devuelve nada**. La frase de
la página de Prusa es otra (`…drying-filament.md:74`):

> Once you are sure that the spool will not fall apart, **the following temperatures and
> times are recommended for the Prusament materials.**

Y la del horno Memmert es la otra que se le parece (`…memmert-uf-oven-drying.md:85`):
*«For a comprehensive list of recommended drying temperatures and times for various
filament types»*.

Lo que la guía publica entre comillas es una paráfrasis de las dos. El contenido es
correcto —la tabla es de los Prusament—, pero una cita entrecomillada que no existe en la
fuente es, por protocolo, motivo de rechazo aunque la frase signifique lo que dice.

**Qué hacer:** poner la literal. La primera es la que describe la tabla; la segunda, si se
quiere señalar además que la página del horno Memmert remite a ella.

### 3 · Importante · El alcance de `horno-pla` afirma que el PLA Aero sube la cama, y no la sube

**Dónde:** reglas, `horno-pla`, `alcance`, `:363`.

**Qué dice:** «Las otras variantes de PLA tienen su propia cifra: **el Silk, el Aero y el
Galaxy suben la cama**, y el Wood es el único que marca el secado como obligatorio.»

**Por qué falla:** la columna de cama de la tabla de Bambu
(`wiki/raw/material-bambulab-drying.md:123-128`) es:

```
| PLA Basic / PLA Matte | … | 60-70 | 12 | … |
| PLA Silk               | … | 65-75 | 12 | … |
| PLA-CF / GF            | … | 65-75 | 12 | … |
| PLA Wood               | … | 70-75 | 12 | … |
| PLA Aero               | … | 60-70 | 12 | … |   ← la misma que el Basic
| PLA Galaxy             | … | 65-75 | 12 | … |
```

El **PLA Aero tiene 60–70 °C en la cama**, igual que el PLA Basic/Matte: no sube. Lo que
cambia del Aero es el **horno** (55 °C frente a los 50 °C del Basic). Y la guía le dice al
lector de Aero que su cifra de cama es más alta, cuando las dos filas que puede tener a
mano en pantalla son 60–70 °C (`cama-pla`) y 65–75 °C (`cama-pla-cf`): el que siga la
indicación se lleva la del PLA-CF, que no es la suya.

**Qué hacer:** nombrar las variantes que sí cambian y decir en qué columna. Las que
cambian en la cama son el Silk, el Galaxy, el Wood y el PLA-CF/GF; en el horno cambian
todas menos el Basic/Matte. Y el Wood es el único PLA con secado «Required» ✓ (eso sí es
cierto y se puede dejar como está).

### 4 · Importante · Tres reglas con cifra y sin `alcance`, y en dos de ellas la fila que se aplana tiene otra cifra

**Dónde:** reglas `horno-pla-cf` (`:365`), `amsht-abs-pc` (`:440`) y `horno-abs-pc`
(`:482`).

**Por qué falla:** el `alcance` es donde la guía marca el radio de acción de una cifra, y
la fuente de estas tres está acotada por filas. Las tres son la tabla de Bambu, y en la
tabla:

- La fila **«ASA-CF, ABS-GF»** da **80 °C** en el horno de convección forzada
  (`material-bambulab-drying.md:133`), y la fila **«ASA Aero»** también, **80 °C**
  (`:134`). La regla `horno-abs-pc` publica **75–85 °C** para el material `abs`, que es
  «ABS o ASA»: el ASA-CF y el ASA Aero reciben una cifra que no es la de su fila, y
  ninguna parte de la guía lo dice. La guía **sí** hace esta operación para el PLA, en
  el `alcance` de `horno-pla`; aquí falta.
- `amsht-abs-pc` publica 80 °C · 8 h para ABS/ASA/PC y no menciona que la casa que
  tiene la otra cifra para el ASA y el PC los publica sin método y con otro tiempo
  (fallo 1). Es el `alcance` que le falta.
- `horno-pla-cf` (50–60 °C · 8 h) es la fila «PLA-CF / GF», que es de **filamento de
  Bambu**, no de cualquier PLA con fibra.

**Qué hacer:** poner `alcance` en las tres, con las filas que cubren y las que se
quedan fuera de la regla: «la fila ABS/ASA de la tabla de Bambu; las variantes ASA-CF,
ABS-GF y ASA Aero tienen 80 °C en el horno».

### 5 · Importante · `cama-abs-pc-pa` es la única regla de PA que no lleva el «con fibra» en su `alcance`

**Dónde:** reglas, `cama-abs-pc-pa`, `:514-523`.

**Qué dice:** el `valor` es **90–100 °C · 12 h** para el material `pa`, y el `alcance` sólo
habla de la cama y del carrete: «Cama al servicio del secado, no cama de impresión. A
90–100 °C el carrete negro viejo de Prusa no aguanta…».

**Por qué falla:** el hueco del PA sin fibra —la segunda trampa del material cocinado— lo
resuelven bien las otras tres reglas de PA: `amsht-pa` («Son las cifras de la poliamida
**con fibra**. Para el PA sin refuerzo ninguna fuente da parámetros»), `horno-pa` (igual) y
`ams2pro-no-llega` («la poliamida con fibra, 8–12 h»). En `cama-abs-pc-pa` la salvedad
sólo está en el `porque` («…y la **poliamida con fibra** comparten…»), y el `valor` —que
es lo que sale grande y en color de acento— se le enseña a un nylon sin refuerzo sin
ninguna nota al lado. La regla y la tarjeta `pa` dicen cosas distintas sobre el mismo
material.

**Qué hacer:** llevar el «con fibra» al `alcance` de `cama-abs-pc-pa`, igual que está en
las otras tres.

### 6 · Menor · El `valor` de `ams2pro-no-llega` dice 8 h y la regla también sale para el PA, que pide 8–12 h

**Dónde:** reglas, `ams2pro-no-llega`, `:429-439`.

**Qué dice:** `valor: '75–85 °C · 8 h'`, y la regla se dispara con `material: ['abs', 'pc',
'pa']`. La corrección está en el `alcance` («la poliamida con fibra, 8–12 h»), pero el
número grande es el de arriba.

**Por qué falla:** la fila de Bambu da 75–85 °C / **8–12 h** para la poliamida con fibra
(`material-bambulab-drying.md:141`), y 75–85 °C / 8 h para ABS/ASA (`:132`) y para el PC
(`:138`). El `valor` es correcto para dos de los tres materiales y corto para el tercero.

**Qué hacer:** o el `valor` dice «75–85 °C · 8 h (8–12 h en poliamida)», o la regla se
parte en dos: una para ABS/PC y otra para la poliamida.

### 7 · Menor · Una cita con la mayúscula cambiada

**Dónde:** conocimiento, tarjeta `petg`, `:203`.

**Qué dice:** *«the drying temperature is automatically lowered after a print job starts,
**Usually** below the filament's softening point»*.

**Por qué falla:** la fuente (`material-bambulab-drying.md:52`) escribe
*«…after a print job starts, **usually** below the filament's softening point, **to
prevent clogging in the AMS**»*, en minúscula y con la cola final que la cita no
recoge, sin puntos suspensivos. La afirmación que sostiene la cita —que el 55 °C es la
temperatura a la que el AMS **baja** el secado al arrancar una impresión— está bien
atribuida y bien explicada; lo que falla es que la cita no es literal.

**Qué hacer:** reproducirla literal, con la coma final o con elipsis.

### 8 · Menor · La tarjeta `petg` enseña cifras de un material a quien ha declarado otro

**Dónde:** conocimiento, tarjeta `petg`, `:193-206`.

**Por qué falla:** la tarjeta lleva la cifra destacada «65 · 60–65 · 75–85 °C» y explica
la trampa del 55 °C: son tres cifras del **PETG** y una del PETG que no es setpoint. Las
tres tarjetas que también son de un material —`pa`, `pc` y `lw-pla`— llevan `cuando`
(`material: 'pa'`, `material: 'pc'`, `material: 'pla'`). Esta no, y sale a todo el mundo.

**Qué hacer:** `cuando: { material: 'petg' }`, o justificar que es una tarjeta general
—en cuyo caso conviene que no lleve la cifra de PETG en `cifra`.

### 9 · Menor · «Es la única diferencia entre las dos filas de PLA en ese método»

**Dónde:** reglas, `cama-pla-cf`, `:391`.

**Qué dice:** «El PLA-CF y el PLA-GF suben la fila del PLA en la cama: 65–75 °C durante 12
horas. **Es la única diferencia entre las dos filas de PLA en ese método.**»

**Por qué falla:** las dos filas difieren en más columnas que la temperatura: la fila PLA
Basic/Matte lleva *Flip Interval* «Every 6 hours» y *Cover* «Filament packaging box or PC
cover», y la fila PLA-CF/GF lleva «-» en las dos (`material-bambulab-drying.md:123` y
`:125`). El procedimiento de cama que describe la tarjeta `cama-metodo` es
correcto —voltear a mitad está en §2.1 y en Appendix II (4)—, pero la afirmación de que
la diferencia entre las dos filas es sólo la temperatura no es cierto.

**Qué hacer:** decir «la diferencia de temperatura y tiempo» y dejar de decir «la única
diferencia», o añadir el matiz de las columnas de la tabla.

### 10 · Menor · La cita de la tarjeta `almacenamiento` es de Prusa y las cifras de al lado son de Bambu

**Dónde:** conocimiento, tarjeta `almacenamiento`, `:238-251`.

**Qué pasa:** la tarjeta cita a Prusa (*«After drying, immediately transfer the filament
spool into the filament dry box and close it to prevent reabsorption of moisture»*) y, a
continuación, da las cifras de almacenamiento —20 % RH, 2–7 días, 55 % RH, 2–12 h— **que
son de Bambu** (`material-bambulab-drying.md:176-180` y
`secar-filamento-bambu-wiki-sealed-box.md:35-43`). El propio cocinado avisa de esto:
«son el mismo dato publicado dos veces, no dos fuentes independientes», y «el cocinero
debería citar una sola de las dos».

**Qué hacer:** atribuir las cifras a Bambu en el cuerpo de la tarjeta, o llevarlas a la
casa de Prusa, que también las publica. La regla `guardar-sellado` sí lo hace bien
(`fuente: 'Bambu Lab, Prusa Research'`).

## Las dos trampas que avisó el material cocinado

| Trampa | Estado | Comprobación |
|---|---|---|
| **El 55 °C del PETG no es un setpoint de secado** | **BIEN TRATADA** | Ningún `valor` de la guía contiene «55 °C» para el PETG: las tres celdas del PETG que publica son 65 °C / 12 h (AMS), 60–65 °C / 8 h (horno) y 75–85 °C / 12 h (cama), las de la tabla de Bambu (`:131`). El 55 °C aparece **explicado como lo que es** en la tarjeta `petg` (`:197`), en el `alcance` de `ams-petg` (`:405`) y en el de `sin-aparato` (`:543`), con la cita literal de §1.4 (`material-bambulab-drying.md:52-54`: *«the drying temperature is automatically lowered after a print job starts… when drying PETG while printing ABS or printing with PETG, it is set to 55 °C»*). La tarjeta también explica que el 55 °C de Prusa es **otra casa** y que no se juntan. Es la mejor parte de la guía |
| **El hueco del PA sin fibra** | **BIEN TRATADA, CON UN HUECO** | La tarjeta `pa` (`:277-292`) dice que las dos tablas dan poliamida **con fibra** (PA6-CF/GF, PAHT-CF/GF y PA11 CF) y que ninguna fuente da parámetros para PA12, PA6 o nylon sin refuerzo, y el módulo lo repite en el comentario de cabecera. Las reglas de PA que llevan cifra llevan el «con fibra» en el `alcance`… salvo una: ver el **fallo 5** |

## Las tres escenas del brief

| Escena | ¿Decidible? | Por dónde |
|---|---|---|
| PETG recién salido de la caja, con burbujas y chasquidos | **Sí** | `material: petg` + `dispositivo` → tres reglas con cifra; el diferencial dice que el burbujeo es la señal que más directamente apunta al agua; la tarjeta `petg` da las tres celdas y explica por qué el 55 °C no es una de ellas; `boquilla-petg` da el orden de Bambu si la boquilla sigue pegajosa |
| PA abierto desde hace cuatro meses, con la pieza rugosa y con hilos | **Parcialmente, y lo dice** | La tarjeta `pa` da el plazo de los ~3 meses y dice que a partir de ahí el horno de convección a 80–90 °C puede no bastar y la respuesta pasa a ser preventiva; el diferencial `hilos` dice que la humedad es una causa entre varias; la regla `otro-carrete` da la prueba de Prusa; y para el PA sin fibra la guía dice que no hay cifras |
| PLA de hace un mes, sellado, con líneas finas y huecos | **Sí, y la respuesta es «no es humedad»** | La regla `huecos-flujo` dice las tres familias de causas de la subextrusión de Bambu y que la humedad no está en ninguna; sale a `flow-rate` |

## Lo que sí pasa, comprobado

- **Las 26 cifras de la guía cuadran con la fuente.** Celda por celda de la tabla de
  Bambu (Appendix I, `:121-144`) y fila por fila de la tabla de Prusa (`:78-90`): las 19
  reglas con `valor` y las 7 tarjetas con `cifra`. No hay ni una interpolación, ni un
  tiempo inventado, ni una cifra de impresión colada.
- **Gate 1 (secado ≠ impresión):** cumplido. Las reglas de cama llevan tres avisos
  explícitos de que la columna es la cama **al servicio del secado**
  (`:382`, `:393`, `:426`, `:522`), y `fueraDeAlcance` manda la temperatura de cama de
  impresión a `temperatura-cama` y la de boquilla a `temperatura-hotend`.
- **Gate 2 («higroscópico» ≠ «está húmedo»):** cumplido. La tarjeta `higroscopico`
  (`:149`) separa la propiedad del estado con las dos citas literales, y la tarjeta
  `senal` (`:160`) dice que **ninguna fuente de este lote da una prueba** para saber si
  la bobina está húmeda.
- **Gate 3 (el tiempo sólo si la fuente lo da):** cumplido. `sin-aparato` (`:536`) dice
  explícitamente que ninguna fuente asigna cifras al deshidratador ni a la caja
  secadora, y no publica ninguna.
- **Gate 4 (un límite del aparato no es una propiedad del material):** cumplido y bien
  resuelto. La tarjeta `metodos` (`:207`) y la regla `ams2pro-no-llega` (`:429`) dicen
  que el ABS se puede secar y lo que no puede es el AMS 2 Pro, con la cita literal.
- **Gate 6 (la humedad no explica el warping):** cumplido. La tarjeta `no-warping`
  (`:179`) dice que ninguna fuente del lote relaciona humedad con warping, por los dos
  lados, y sale a `warping-pla`.
- **El diferencial abre la guía y las tres comprobaciones tienen las dos caras.** `si` y
  `no` en las tres, y el matiz pedido por el brief en la de `hilos`: «la humedad es *una*
  causa, no *la* causa».
- **Ninguna variable es decorativa.** `material`, `dispositivo` y `sintoma` cambian el
  resultado de verdad (comprobado con el motor). Los seis destinos de `fueraDeAlcance`
  son concretos, dicen por qué y a dónde llevar el caso.
- **Los enlaces internos existen.** `warping-pla`, `flow-rate`, `material`, `stringing`,
  `temperatura-hotend` y `temperatura-cama` están todos en el registro
  (`src/lib/guias.ts:80`), y se han comprobado **por su slug**, no por su nombre de
  fichero: `warping.ts` es `warping-pla` y `separaciones.ts` es
  `separaciones-entre-capas`.
- **Las seis URLs de `fuentes` están en `wiki/raw/`** con ese mismo `url`, y no hay
  ninguna repetida.

## Notas que no bloquean

- **La guía todavía no está en el registro `GUIAS`.** `npm run verify:guias` no la ha
  mirado. Al publicarla hay que añadirla a `src/lib/guias.ts:80`; las comprobaciones
  mecánicas ya pasan (ver «Comprobación 4 en detalle»), pero saldría un **AVISO** por las
  tres reglas sin condición (`guardar-sellado`, `carrete-limite`, `no-exceder`), y las
  tres tienen su `alcance` explicando por qué no pueden condicionarse, que es lo que
  pide el aviso.
- **Tres opciones de `sintoma` no cambian nada**: `burbujas`, `rugosa` y `nada` dan el
  mismo resultado entre sí. La variable no es decorativa en conjunto (el motor la usa),
  pero el diferencial dice que las burbujas son la señal más directa del agua y ninguna
  regla arranca de ahí. Es defendible —quien marca burbujas recibe las reglas de
  material y aparato, que es lo que toca—, pero si se quiere que la casilla reaccione,
  ahí hay material.
- **El horno doméstico aparece en dos papeles.** La tarjeta `horno-cocina` dice que
  Bambu prohíbe el horno de cocina, y la tarjeta `desecante` dice que el gel de sílice se
  regenera en el horno doméstico a 80–90 °C. Las dos cosas son de la misma página y no
  se contradicen (una es para el filamento, la otra para el desecante), pero una frase
  evitaría que el lector lo lea como un contrasentido.
- **`prusa-tabla` dice «en la AMS, 6 h»** (`:232`). Prusa no tiene AMS: los dos
  aparatos de Bambu se llaman AMS 2 Pro y AMS HT. La comparación que se quiere hacer es
  «no se puede leer como el tiempo de la AMS de Bambu», pero el nombre propio está mal.
- **«El ABS, el ASA y el PC comparten fila en la tabla de Bambu»** (`:446`, `:488`). El
  ABS y el ASA comparten fila; el PC tiene fila propia, con las mismas cifras. El
  `alcance` que falta en esas dos reglas (fallo 4) es donde debería quedar dicho.
- **La guía usa `campos: []` con `leeDelAnalisis: ['material']`**, que es lo que explica
  el comentario del final del módulo. El `material` ya tiene dueño en la guía
  `material`, así que la guía no entra en `CAMPOS_WIKI`. Coherente con el brief.

## Para la siguiente vuelta

1. Corregir la lista de lo que la tabla de Prusa no cubre (**fallo 1**) y publicar el
   matiz del ASA y del PC con la misma fórmula que ya usan las otras reglas. **Y
   corregirlo también en `wiki/cooked/secar-filamento.md:221`**, porque el error viene
   de las notas del recolector y volverá por la misma puerta si sólo se arregla la guía.
2. Poner la cita literal de la tabla de Prusa (**fallo 2**).
3. Corregir la frase del PLA Aero (**fallo 3**) y revisar de paso qué dice exactamente de
   cada variante de PLA.
4. Poner `alcance` en `horno-pla-cf`, `amsht-abs-pc` y `horno-abs-pc` (**fallo 4**), con
   las filas de ASA-CF/ABS-GF y ASA Aero a 80 °C.
5. Llevar el «con fibra» al `alcance` de `cama-abs-pc-pa` (**fallo 5**).

Los fallos 6 a 10 son de una línea cada uno y pueden ir en la misma pasada. Los dos
bloqueantes son de redacción: **no hace falta ninguna fuente nueva**, y el coste de esta
vuelta no está en las cifras, que están todas bien, sino en el alcance de dos tarjetas y
en una cita.

La matriz numérica de la guía —que es lo difícil— **no hay que tocarla**.
