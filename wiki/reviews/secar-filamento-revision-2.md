# Revisión de `secar-filamento` — segunda vuelta

**Veredicto: APROBADO** — 0 fallos bloqueantes, 5 menores, 2 notas abiertas de la vuelta 1.

Guía: `src/content/guias/secar-filamento.ts` (705 líneas). Cocinado: `wiki/cooked/secar-filamento.md`
(corregido). Brief: `wiki/briefs/secar-filamento.md`. Fuentes crudas: las seis del lote, abiertas
**por su ruta real** (`material-bambulab-drying.md` es la reutilizada, con la URL de la página de
secado de Bambu en su frontmatter).

**Comprobado contra `wiki/raw/`, no contra el cocinado.** Cada cifra se ha contrastado con la
tabla de Appendix I de Bambu (`material-bambulab-drying.md:121-144`) leída **por posición**, no
por copia; la tabla de Prusament (`secar-filamento-prusa-kb-drying-filament.md:78-90`); el §1.4
de Bambu (`:50-54`); los apéndices II y III (`:148-180`, `:182-241`); la página de calidad de
impresión (`secar-filamento-bambu-wiki-common-print-quality-problem.md`); la página de hilos de
Prusa (`secar-filamento-prusa-kb-stringing-and-oozing.md`); la del horno Memmert
(`secar-filamento-prusa-kb-memmert-uf-oven-drying.md`) y la caja estanca
(`secar-filamento-bambu-wiki-sealed-box.md`).

Las quince citas entrecomilladas se han buscado con los espacios normalizados, porque los
ficheros crudos están partidos a 80–136 columnas: **las quince son literales**. La única que no
aparece como cadena continua es la de la tarjeta `pa`, y es porque lleva una elisión marcada con
«…» que corta la enumeración de poliamidas; las dos mitades son literales.

**Lo que hay que decir primero, porque es lo bueno: los diez fallos de la vuelta 1 están
corregidos, uno a uno, y las correcciones no han roto ninguna cifra.** La matriz numérica —
**28 conjuntos de valores**, que en la vuelta 1 eran 26 y ahora son 28 porque la regla de la
poliamida se partió en dos y `guardar-sellado` movió sus cifras del `porque` al `valor`— cuadra
celda por celda con la tabla de Bambu y fila por fila con la de Prusa. **36 contrastes
posicionales contra la tabla de Bambu: 35 cuadran y el que queda es la celda del TPU en el AMS
2 Pro**, que lleva la salvedad dentro del propio valor (65 °C más la nota de la tabla) y que la
guía publica aparte en el `alcance` de `ams2pro-tpu`. No hay ni un setpoint inventado, ni una
cifra interpolada, ni un tiempo que la fuente no dé, ni una cifra de impresión colada.

No se ha modificado la guía, ni el cocinado, ni las fuentes crudas.

## Comprobaciones

| # | Comprobación | Resultado |
|---|---|---|
| 1 | Afirmaciones con respaldo | **PASA** — las 28 cifras y las 15 citas están en `wiki/raw/`; 1 menor por un detalle añadido que la fuente no dice (ver fallo menor 1) |
| 2 | Contradicciones internas | **PASA** — 1 menor de redacción (fallo menor 3) |
| 3 | Relleno y frases de IA | **PASA** — ninguna fórmula canónica; ningún párrafo sin dato |
| 4 | Las cuatro etapas, y que hagan algo | **PASA** — 19 comprobaciones en verde sobre el módulo (15 el calco de `verify:guias`, 4 propias); ninguna regla muerta, ninguna variable decorativa, ninguna cifra sin alcance |
| 5 | Citas correctas y accesibles | **PASA** — 15/15 literales, 6/6 URLs en `wiki/raw/`, sin repetir, la primera cita en la primera tarjeta |

## Los diez fallos de la vuelta 1, uno a uno

| # | Fallo de la vuelta 1 | Dónde está ahora | Estado |
|---|---|---|---|
| 1 | **Bloqueante.** La guía decía que la tabla de Prusa no cubre el PC | Tarjeta `prusa-tabla`, `:234` | **CORREGIDO.** Ahora: «no da cifras propias para ABS, PA sin fibra, TPU de otras marcas, PET-CF ni PVA. **El ASA y el PC sí están**», y publica las seis cifras de Prusa (ASA 80 ºC/4 h; PC Blend 85 ºC/5 h; PC Blend Carbon Fiber 90 ºC/4 h; PC Space Grade 90 °C/4–6 h) frente a los 80 °C/8 h del AMS HT de Bambu, con el «no se promedian» de rigor. Las seis cifras están en la tabla cruda de Prusa (`:85-88`) y la lista de lo que no se cubre es ahora la correcta: ABS, PA sin fibra, TPU de otras marcas, PET-CF y PVA no tienen fila propia |
| 2 | **Bloqueante.** Cita entrecomillada que no estaba en ninguna fuente | Tarjeta `prusa-tabla`, `:236` | **CORREGIDO.** Ahora cita la literal: «the following temperatures and times are recommended for the Prusament materials», que es el final exacto de `secar-filamento-prusa-kb-drying-filament.md:74` |
| 3 | **Importante.** El `alcance` de `horno-pla` decía que el PLA Aero sube la cama | `horno-pla`, `:365` | **CORREGIDO.** Ahora nombra las columnas: en el horno suben el Silk, el Aero y el Galaxy (55 °C) y el Wood (55–65 °C); en la cama el Aero **no** cambia —60–70 °C, como el Basic— y los que suben son el Silk, el Galaxy, el Wood y el PLA-CF/GF. Las once cifras de variantes que menciona están en `material-bambulab-drying.md:123-128` |
| 4 | **Importante.** Tres reglas con cifra y sin `alcance` | `horno-pla-cf` `:375`, `amsht-abs-pc` `:463`, `horno-abs-pc` `:507` | **CORREGIDO.** Las tres llevan `alcance`, y las dos que aplanaban filas con otra cifra dicen cuáles: «Las variantes ASA-CF, ABS-GF y ASA Aero dan **80 °C** en el horno, no 75–85 °C» (`material-bambulab-drying.md:133-134`) |
| 5 | **Importante.** `cama-abs-pc-pa` no llevaba el «con fibra» en el `alcance` | `cama-abs-pc-pa`, `:541` | **CORREGIDO.** Ahora: «Las cifras de la poliamida son las de la poliamida **con fibra**: para el PA sin refuerzo ninguna fuente da parámetros» |
| 6 | **Menor.** `ams2pro-no-llega` publicaba 8 h para un material que pide 8–12 h | `ams2pro-no-llega` `:434` y nueva `ams2pro-no-llega-pa` `:445` | **CORREGIDO.** La regla se ha partido en dos, como proponía la vuelta 1: `ams2pro-no-llega` sale con `material: ['abs','pc']` y 8 h; la poliamida tiene regla propia, con 8–12 h, y su propio `alcance` con el «con fibra» |
| 7 | **Menor.** La cita de la tarjeta `petg` no era literal (mayúscula cambiada) | `petg`, `:205` | **CORREGIDO.** Ahora es literal y completa: «the drying temperature is automatically lowered after a print job starts, usually below the filament's softening point, to prevent clogging in the AMS» (`material-bambulab-drying.md:52`) |
| 8 | **Menor.** La tarjeta `petg` enseñaba cifras de un material a quien había declarado otro | `petg`, `:198` | **CORREGIDO.** Lleva `cuando: { material: 'petg' }`, como sus hermanas `pa`, `pc` y `lw-pla` |
| 9 | **Menor.** «Es la única diferencia entre las dos filas de PLA en ese método» | `cama-pla-cf`, `:395` | **CORREGIDO.** Ahora dice la diferencia de temperatura (5 °C) y de tiempo, y añade el matiz que faltaba: la fila del PLA Basic pide voltear cada 6 horas y tapar con la caja o una tapa de PC, y la del PLA-CF/GF no lleva ninguna de las dos (`material-bambulab-drying.md:123` y `:125`) |
| 10 | **Menor.** La cita de `almacenamiento` era de Prusa y las cifras de al lado, de Bambu | `almacenamiento`, `:244` | **CORREGIDO.** El cuerpo empieza ahora con «Las cifras de almacenamiento son de Bambu» y separa el bloque de Prusa («Prusa no da ninguna de esas cifras: publica el procedimiento…»). La cita de Prusa sigue siendo la de Prusa |

### Las tres notas no bloqueantes que se dijeron que se cerraban

| Nota | Estado |
|---|---|
| «El horno doméstico aparece en dos papeles» (el de Bambu, que lo prohíbe, y el del gel de sílice, que lo usa) | **CERRADA.** La tarjeta `desecante` (`:258`) lo explica: «Ese horno de casa es el mismo que Bambu prohíbe para el filamento: lo que aquí se hornea es el gel de sílice, no el carrete, y sus temperaturas no son de secado» |
| «`prusa-tabla` dice “en la AMS, 6 h”» (Prusa no tiene AMS) | **CERRADA.** Ahora: «ni el de un AMS —Prusa no tiene AMS; el AMS 2 Pro y el AMS HT son de Bambu—» (`:234`) |
| «El ABS, el ASA y el PC comparten fila en la tabla de Bambu» | **CERRADA.** En las dos reglas que lo decían ahora se lee «El ABS y el ASA comparten fila en la tabla de Bambu y el PC tiene fila propia, y las dos dan 80 °C durante 8 horas en el AMS HT» (`:461`) y lo mismo en `horno-abs-pc` (`:505`) |

## Las dos trampas del cocinado

| Trampa | Estado | Comprobación |
|---|---|---|
| **El 55 °C del PETG no es un setpoint de secado** | **BIEN TRATADA** | Ningún `valor` ni ninguna `cifra` de la guía contiene «55 °C»: los tres valores del PETG son 65 °C/12 h (AMS), 60–65 °C/8 h (horno) y 75–85 °C/12 h (cama), los de la tabla de Bambu. El 55 °C aparece **explicado como lo que es** en cinco sitios —la tarjeta `petg` (`:197`), el `alcance` de `ams-petg` (`:409`), el de `sin-aparato` (`:562`), la tarjeta `prusa-tabla` (`:234`) y el comentario de cabecera (`:19-27`)— y en ninguno se presenta como temperatura de secado. El 55 °C de Prusa se mantiene separado del de Bambu en todos ellos |
| **El hueco del PA sin fibra** | **BIEN TRATADA, Y AHORA TAMBIÉN EN TODAS LAS REGLAS** | La tarjeta `pa` (`:283`) lo dice, el módulo lo repite en el `entrada` (`:50`) y en el comentario de cabecera (`:31-34`), y **las cuatro** reglas de PA lo llevan en el `alcance`: `ams2pro-no-llega-pa` (`:453`), `amsht-pa` (`:475`), `horno-pa` (`:519`) y `cama-abs-pc-pa` (`:541`). En la vuelta 1 faltaba en la cuarta; ahora no falta en ninguna |

## Las cifras, revisitadas una por una

El encargo decía «las 26 cifras». **Ahora son 28** —21 reglas con `valor` y 7 tarjetas con
`cifra`— porque la corrección del fallo 6 partió la regla de la poliamida en dos y la del fallo 4
movió las cuatro cifras de `guardar-sellado` del `porque` al `valor`. Se han vuelto a recorrer
todas, contra la tabla leída del crudo.

| Regla o tarjeta | `valor` / `cifra` | Celda cruda | |
|---|---|---|---|
| `ams-pla` | 45 °C · 12 h | AMS 2 Pro 45/12 y AMS HT 45/12 (PLA Basic) | ✓ |
| `horno-pla` | 50 °C · 8 h | Horno 50/8 (PLA Basic / Matte) | ✓ |
| `horno-pla-cf` | 50–60 °C · 8 h | Horno 50-60/8 (PLA-CF / GF) | ✓ |
| `cama-pla` | 60–70 °C · 12 h | Cama 60-70/12 | ✓ |
| `cama-pla-cf` | 65–75 °C · 12 h | Cama 65-75/12 | ✓ |
| `ams-petg` | 65 °C · 12 h | AMS 2 Pro 65/12 y AMS HT 65/12 | ✓ |
| `horno-petg` | 60–65 °C · 8 h | Horno 60-65/8 | ✓ |
| `cama-petg` | 75–85 °C · 12 h | Cama 75-85/12 | ✓ |
| `ams2pro-no-llega` | 75–85 °C · 8 h | Horno 75-85/8 (ABS, ASA y PC) | ✓ |
| `ams2pro-no-llega-pa` | 75–85 °C · 8–12 h | Horno 75-85/8-12 (PA6-CF/GF) | ✓ |
| `amsht-abs-pc` | 80 °C · 8 h | AMS HT 80/8 (ABS, ASA y PC) | ✓ |
| `amsht-pa` | 85 °C · 12 h | AMS HT 85/12 | ✓ |
| `ams2pro-tpu` | 65 °C · 12 h | AMS 2 Pro 65/12 (+ salvedad de la celda, en el `alcance`) | ✓ |
| `amsht-tpu` | 75 °C · 18 h | AMS HT 75/18 | ✓ |
| `horno-abs-pc` | 75–85 °C · 8 h | Horno 75-85/8 (ABS, ASA y PC) | ✓ |
| `horno-pa` | 75–85 °C · 8–12 h | Horno 75-85/8-12 | ✓ |
| `horno-tpu` | 70 °C · 8 h | Horno 70/8 | ✓ |
| `cama-abs-pc-pa` | 90–100 °C · 12 h | Cama 90-100/12 (ABS, ASA, PC y poliamida) | ✓ |
| `cama-tpu` | 80–90 °C · 12 h | Cama 80-90/12 (TPU 95A HF y TPU for AMS) | ✓ |
| `guardar-sellado` | 20 % RH · 2–7 días · 55 % RH · 2–12 h | Almacenamiento de Bambu (`:176-180`) | ✓ |
| `carrete-limite` | 45 · 90 · 150 °C | Cuatro límites de Prusa (`:49`, `:55`, `:66`) | ✓ |
| `petg` (tarjeta) | 65 · 60–65 · 75–85 °C | Las tres celdas del PETG | ✓ |
| `metodos` (tarjeta) | 65 °C | Techo del AMS 2 Pro | ✓ |
| `almacenamiento` (tarjeta) | 20 % RH | Objetivo de Bambu | ✓ |
| `desecante` (tarjeta) | 80–90 °C | Regeneración del gel de sílice | ✓ |
| `carrete` (tarjeta) | 45 · 90 · 150 °C | Los cuatro límites del carrete | ✓ |
| `pa` (tarjeta) | 3 meses | PA abierto al aire (`:160`) | ✓ |
| `horno-protocolo` (tarjeta) | 250 × 250 × 90 mm | Cámara mínima (`:154`) | ✓ |

**Las cifras de Prusa que la guía usa de contraste, comprobadas fila por fila:** PLA 45 ºC/6 h,
PETG 55 ºC/6 h, TPU 60 °C/4-6 h, ASA 80 ºC/4 h, PC Blend 85 ºC/5 h, PC Blend Carbon Fiber 90 ºC/4 h,
PC Space Grade 90 °C/4-6 h, PA11 Carbon Fiber 90 ºC/6 h. Las ocho están en
`secar-filamento-prusa-kb-drying-filament.md:79-89`, con sus dos formas de grado («45 ºC» con
«o» ordinal y «45 °C») conservadas, como manda el material cocinado.

## Los seis gates del brief

| Gate | Estado | Dónde se cumple |
|---|---|---|
| 1 · La temperatura de secado no es la de impresión | **CUMPLIDO** | Cuatro reglas de cama llevan el aviso explícito de que la columna es «la cama **al servicio del secado**» (`:387`, `:398`, `:431`, `:541`); `fueraDeAlcance` manda la cama de impresión a `temperatura-cama` y la boquilla a `temperatura-hotend`; ninguna regla lleva `rango` —comprobado mecánicamente— porque una temperatura de secado comparada con la cama del perfil no dice nada |
| 2 · «Higroscópico» no es «está húmedo» | **CUMPLIDO** | La tarjeta `higroscopico` (`:153`) separa la propiedad del estado con las dos fuentes; la tarjeta `senal` (`:163`) dice que **ninguna fuente del lote da una prueba** |
| 3 · El tiempo sólo si la fuente lo da | **CUMPLIDO** | `sin-aparato` (`:559`) dice que ninguna fuente asigna cifras al deshidratador ni a la caja secadora, y no publica ninguna |
| 4 · Un límite del aparato no es una propiedad del material | **CUMPLIDO** | La tarjeta `metodos` (`:213`) y la regla `ams2pro-no-llega` (`:439`) lo dicen con las dos caras: el ABS se puede secar, lo que no puede es el AMS 2 Pro, con la cita literal del techo de 65 °C |
| 5 · Ninguna cifra de cama ni boquilla de impresión | **CUMPLIDO** | No hay ni una temperatura de impresión en la guía: ni los 220/240/250-300 °C de la página de calidad, ni los 200 °C de la pistolera de Prusa, ni los 70 °C de reposo de la XL. La única cama que no es de secado es la de 80 °C del gel de sílice, y va marcada como tal |
| 6 · La humedad no explica el warping | **CUMPLIDO** | La tarjeta `no-warping` (`:183`) lo dice por los dos lados —la sección de warping no cuenta la humedad entre sus causas, y la de filamento húmedo no cuenta las esquinas entre sus síntomas— y sale a `warping-pla` |

**Las tres escenas del brief, decidibles:** PETG con burbujas → tres reglas con cifra según el
aparato, la tarjeta `petg` con las tres celdas y la explicación de por qué el 55 °C no es una de
ellas, y `boquilla-petg` con el orden de Bambu. PA abierto cuatro meses → la tarjeta `pa` da el
plazo de los ~3 meses y dice que a partir de ahí la respuesta es preventiva, el diferencial
`hilos` avisa de que la humedad es una causa entre varias, y para el PA sin fibra la guía dice
que no hay cifras. PLA con líneas finas y huecos → `huecos-flujo` dice las tres familias de
causas de la subextrusión y que la humedad no está en ninguna, y sale a `flow-rate`.

## Comprobación 4 en detalle

`secar-filamento` **sigue sin estar en el registro `GUIAS`** (`src/lib/guias.ts:80`), así que
`npm run verify:guias` no la ha mirado —las 818 comprobaciones del registro siguen en verde, y
eso es lo que hay que tener en cuenta al publicarla—. Se han replicado sobre el módulo, en
`/tmp/opencode/check-secar2.mjs`, las comprobaciones que `scripts/verify/guias.mjs` hace por
guía: **19 en verde, 15 de ellas el calco de `verify:guias` y 4 propias del revisor** (que toda
regla es alcanzable, que toda tarjeta sale, que ninguna variable es decorativa y que ninguna
regla lleva `rango`). Las que importan aquí:

- Ninguna condición apunta a una variable que no exista, y ningún valor de condición es
  imposible.
- **Ninguna variable es decorativa**: cada una cambia el conjunto de reglas y de tarjetas en
  algún montaje.
- **Ninguna regla es muerta**: para las 26 hay un montaje que la dispara, y ninguna se dispara
  sin contestación cuando su condición pide algo.
- **Ninguna tarjeta es inalcanzable**.
- Toda acción con una cifra la lleva en `valor`; toda regla con número tiene su `alcance`;
  toda tarjeta con `cifra` tiene su nota, y no hay dos cifras iguales con alcances distintos.
- La negrita está equilibrada y sólo en campos que la página interpreta; ninguna regla lleva
  `rango`; `fueraDeAlcance` tiene seis entradas, todas con guía existente.
- Los seis enlaces internos (`warping-pla`, `flow-rate`, `material`, `stringing`,
  `temperatura-hotend`, `temperatura-cama`) existen **por su slug**: `warping.ts` es
  `warping-pla` y `separaciones.ts` es `separaciones-entre-capas`.
- El patrón de campos es el mismo que el de `adhesion-primera-capa` y `flow-rate`: la variable
  `material` declara `campos: ['material']`, la guía declara `campos: []` y
  `leeDelAnalisis: ['material']`. La guía **no** entra en `CAMPOS_WIKI`, así que el campo
  `material` sigue teniendo un solo dueño, la guía `material`. Y el material se precontesta
  bien: las once agujas de `precontestar` (`pla-cf`, `petg-cf`, `petg`, `abs`, `asa`, `pa6`,
  `pa-cf`, `nylon`, `pc`, `pla`, `tpu`) tienen opción en esta guía.

## Fallos menores

Ninguno bloquea. Los cinco son de una línea.

### 1 · Menor · La tarjeta `pc` dice dónde se rompe el filamento, y la fuente no lo dice

**Dónde:** conocimiento, tarjeta `pc`, `:299`.

**Qué dice:** «No afecta a las propiedades mecánicas de la pieza impresa, pero sí al riesgo de
que el filamento se rompa **dentro del extrusor**».

**Por qué falla:** la fuente (`material-bambulab-drying.md:164`) dice otra cosa, y más vaga:
*«Although this does not affect the printed part's mechanical properties, it increases the risk
of filament breakage **during printing**»*. La guía cambia el contexto: de «durante la
impresión» a «dentro del extrusor». Es el mismo patrón que el chaflán «en el laminador» de
`warping-pla`, en miniatura: la atribución es correcta y la afirmación es cierta en lo
sustancial —el filamento quebradizo se rompe al imprimir—, pero el lugar concreto no está en la
fuente. No cambia ninguna cifra ni ninguna acción, y por eso no bloquea; pero es un detalle
añadido, y el material cocinado no lo trae tampoco (el cocinado dice sólo «riesgo de rotura del
filamento»).

**Qué hacer:** escribir lo que dice la fuente —«durante la impresión»— o dejar el enunciado en la
forma del cocinado, que es más prudente.

### 2 · Menor · La regla `otro-carrete` cita un mecanismo de Bambu con la etiqueta de fuente de Prusa

**Dónde:** reglas, `otro-carrete`, `:598-599`.

**Qué dice:** el `porque` termina con «Y el mecanismo del PETG húmedo lo explica: el agua que
viaja con el filamento se expande dentro de la boquilla y sale a chorros», y el `fuente` de la
regla es `'Prusa Research'`.

**Por qué falla:** el mecanismo del agua que se expande en la boquilla es de **Bambu**
(`secar-filamento-bambu-wiki-common-print-quality-problem.md:205`: *«when the water vapor
carried by the filament passes through the nozzle, it will expand violently due to the heat»*).
La página de hilos de Prusa dice sólo *«The filament might have gathered moisture, which will
cause a lot of stringing»*, sin mecanismo. La regla mezcla las dos casas —su `alcance` las
nombra— pero la etiqueta `fuente` sólo recoge una, y en la wiki esa etiqueta es la atribución
textual de la regla.

**Qué hacer:** `fuente: 'Prusa Research, Bambu Lab'`, como ya hace `guardar-sellado`.

### 3 · Menor · Una frase de `amsht-tpu` que no se sostiene leída al pie

**Dónde:** reglas, `amsht-tpu`, `:494`.

**Qué dice:** «El AMS HT da 75 °C y 18 horas para el TPU, frente a los 12 h del AMS 2 Pro. Es el
único caso del lote en que **el mismo aparato da menos tiempo** para el mismo material.»

**Por qué falla:** la frase anterior dice que el HT da **más** tiempo (18 h frente a 12 h), y la
que la sigue, leída al pie, dice que un mismo aparato da menos tiempo. El hecho de fondo es
correcto y está bien atribuido: el TPU es el único material del lote al que los dos AMS dan
cifras distintas (12 h en el 2 Pro, 18 h en el HT; todas las demás filas que ambos AMS cubren
repiten el mismo tiempo). Lo que falla es la redacción de la frase que lo resume: debería decir
«el único caso del lote en que **los dos aparatos dan tiempos distintos** para el mismo
material».

**Qué hacer:** cambiar esa frase. No hay contradicción de datos, pero una frase que se puede
leer al revés en una tarjeta que se lee deprisa es un fallo de redacción.

### 4 · Menor · «La más alta de todo el lote» no es la más alta de la tabla

**Dónde:** reglas, `cama-abs-pc-pa`, `:538`.

**Qué dice:** «…las cuatro dan 90–100 °C durante 12 horas en la cama usada como secador. **Es la
más alta de todo el lote**…»

**Por qué falla:** dentro de los materiales de la guía, sí: 90–100 °C es el máximo de la columna
de cama. Pero la tabla de la que sale tiene una fila más arriba: PPA-CF y PPS-CF dan **110–120 °C
(máximo)** en cama (`material-bambulab-drying.md:143`), y la propia guía nombra ese material en
la tarjeta `metodos`, que se lee antes que las reglas. La frase, leída junto a esa tarjeta, se
puede leer como «la más alta de la tabla de Bambu», y no lo es. Es un problema de alcance, no de
cifra.

**Qué hacer:** «Es la más alta de los materiales de esta guía» o «la más alta de la tabla, salvo
la fila de PPA-CF y PPS-CF».

### 5 · Menor · «El AMS HT cubre todos los materiales» es la prosa de la fuente, y la tabla va más estrecha

**Dónde:** conocimiento, tarjeta `metodos`, `:213`.

**Qué dice:** «…salen en su columna como «no compatible». … **El AMS HT cubre todos los
materiales**, pero avisa de que algunos no quedan secos del todo.»

**Por qué falla:** la primera mitad es literal de la fuente (*«All filaments can be dried using
the AMS HT; Some materials that require high-temperature drying may still not be fully dried,
such as PVA, PPS-CF, PPA-CF»*), y la segunda mitad también. El problema es que la frase
anterior nombra PPA-CF y PPS-CF, y **en la tabla esos dos son «Not compatible» en la columna del
AMS HT** (`:143`), que es más fuerte que «pueden no quedar secos del todo». El material cocinado
lo distingue explícitamente en su §6: «hay un segundo “not compatible” que es de otra
categoría». En la práctica no molesta —los materiales de la guía son siete, y los siete son
compatibles con el AMS HT— pero la frase, tal como está, es más ancha que la tabla.

**Qué hacer:** «El AMS HT cubre todos los materiales de esta guía» o añadir que PPA-CF y PPS-CF
salen como «no compatible» en su columna.

## Notas que no bloquean

- **La guía sigue sin estar en el registro `GUIAS`** (`src/lib/guias.ts:80`). Es lo que quedaba
  de la vuelta 1 y no es un cambio de contenido, sino el paso de publicación. Al añadirla
  habrá que mirar dos cosas: `verify:guias` imprimirá un **AVISO** por las tres reglas sin
  condición (`guardar-sellado`, `carrete-limite`, `no-exceder`), que es justo lo que la vuelta 1
  dijo que había que mirar (las tres tienen su `alcance` explicando por qué no pueden
  condicionarse, que es lo que pide el aviso), y `verify:wiki` comprobará que `material` sigue
  teniendo un solo dueño en `CAMPOS_WIKI`. Las comprobaciones replicadas dan verde.
- **Tres de las seis opciones de `sintoma` siguen sin cambiar nada**: `burbujas`, `rugosa` y
  `nada` dan el mismo resultado entre sí, en las dieciséis combinaciones de material y aparato
  comprobadas. Sólo `hilos` (regla `otro-carrete`), `huecos` (regla `huecos-flujo`) y `goteo`
  (regla `boquilla-petg`, sólo para PETG) mueven la pantalla. La variable no es decorativa en
  conjunto, pero es cierto que la primera comprobación del diferencial —la de las burbujas, «la
  señal que más directamente apunta al agua»— deja de ser accionable: quien marca «Burbujas o
  chasquidos» no ve ningún cambio. Sigue siendo defendible (quien marca burbujas recibe las
  reglas de material y aparato, que es lo que toca), pero si se quiere que la casilla reaccione,
  aquí hay material. **Era la nota de la vuelta 1 y no se ha cerrado.**
- **El `no` de la comprobación `hilos` del diferencial no contesta a la `mira` que la precede.**
  La `mira` (`:86`) pregunta «¿Lo que ves son hilos finos entre piezas, o goteo en la
  boquilla?» y el `no` (`:88`) responde «si lo que falla son líneas finas y huecos, esto no es
  humedad». Son dos síntomas distintos en la fuente: hilos (stringing) y líneas finas y huecos
  (subextrusión). Quien responde «no» recibe una respuesta a otra pregunta. No es un error de
  dato —las dos ramas son ciertas— pero es el primer texto que se lee de la guía.
- **«Valor de PA mal ajustado» (`:190` y `:608`) es el «Pressure Advance» de la fuente**
  («Inappropriate PA value»), no la poliamida. En una guía que tiene una opción de material
  llamada «PA o nylon», la ambigüedad es real; «valor de avance de presión» o «PA (advance de
  presión)» la cerrarían.
- **«El AMS 2 Pro no pasa de 65 °C y el horno llega a 140 °C»** (`:123`) es correcto —140 °C es
  el máximo de la columna de horno de convección de la tabla (PPA-CF y PPS-CF)—; lo anoto sólo
  porque el 140 °C no es una temperatura a la que se pueda secar el material de esta guía, y
  la frase está junto a la lista de aparatos.
- **`ams2pro-no-llega`, alcance (`:442`): «Si tu AMS es el HT, no necesitas este rodeo: ese
  llega a 80–85 °C».** El 80 es el valor del AMS HT para el ABS y el PC, y el 85 el de la
  poliamida; la frase es una lectura de la columna, no una especificación del aparato, que
  ninguna fuente da. El lector no se lleva ningún número equivocado, pero conviene saber que es
  una inferencia.
- La matriz numérica de la guía —que es lo difícil— **no hay que volver a tocarla**: se ha
  vuelto a recorrer entera contra el crudo y cuadra.

## Para la siguiente vuelta

1. **Cerrar los cinco menores.** Son cinco líneas: el «dentro del extrusor» de la tarjeta `pc`,
   la etiqueta `fuente` de `otro-carrete`, la frase de `amsht-tpu`, el «de todo el lote» de
   `cama-abs-pc-pa` y el «todos los materiales» de `metodos`.
2. **Registrar la guía en `src/lib/guias.ts:80`** y pasar `npm run verify:guias` y
   `npm run verify:wiki` con ella dentro, mirando el AVISO de las tres reglas sin condición.
3. **Decidir qué se hace con las tres opciones inertes de `sintoma`** (`burbujas`, `rugosa`,
   `nada`). Es la nota que lleva dos vueltas abierta.

**No hace falta ninguna fuente nueva.** Los diez fallos eran de alcance, de atribución y de
citación, y están todos corregidos. Lo que queda es de una línea por cosa, y la guía ya tiene
resuelta la parte difícil: la matriz, las dos trampas y los seis gates.
