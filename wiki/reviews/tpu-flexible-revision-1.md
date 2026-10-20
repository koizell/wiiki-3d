# Revisión de `tpu-flexible` — primera vuelta

**Veredicto: RECHAZADO** — 8 fallos, de los cuales 1 bloqueante.

Guía: `src/content/guias/tpu-flexible.ts` (741 líneas). Cocinado:
`wiki/cooked/tpu-flexible.md`. Brief: `wiki/briefs/tpu-flexible.md`.
Fuentes crudas: las siete del lote, abiertas **por su ruta real** y no por el nombre del
fichero (`slicer-prusa-kb-prusament-tpu-95a-material-guide.md` y
`material-bambulab-material-table.md` son las dos reutilizadas; las otras cinco llevan el
prefijo `tpu-flexible-`).

**Comprobado contra `wiki/raw/`, no contra el cocinado.** Cada cifra, cada cita y cada
atribución de esta guía se ha contrastado con el cuerpo de la fuente de la que sale, no con
`wiki/cooked/tpu-flexible.md`. La razón es la de siempre: el artículo y el cocinado
coinciden por construcción, así que compararlos sólo detectaría lo que el redactor se
inventó por su cuenta, que no es el error que más ha pasado.

**Lo que hay que decir primero, porque es lo bueno: las cinco trampas que avisó el
material cocinado están bien tratadas, y las cinco.** El umbral de 85A es de Bambu y la
guía lo dice en el sitio que se lee (cabecera, tarjeta, regla y `alcance`); el AMS publica
las tres partes del matiz; el hueco de bowden está declarado y no hay ninguna regla de
bowden; el 0,4 mm con el 85A publica las dos fuentes; y las cuatro cifras de boquilla van
separadas con su alcance, con el 250 °C identificado como temperatura de **carga**. La
matriz de la guía —28 reglas, 16 tarjetas, 4 variables— cuadra con las siete fuentes. **Los
ocho fallos de este informe son de citación y de alcance, no de números**, y ninguno de
ellos toca la matriz. No hace falta ninguna fuente nueva.

No se ha modificado la guía, ni el cocinado, ni las fuentes crudas.

## Comprobaciones

| # | Comprobación | Resultado |
|---|---|---|
| 1 | Afirmaciones con respaldo | **FALLA** — dos cadenas entrecomilladas atribuidas a Bambu que **no están en `wiki/raw/`** (una además más fuerte que la fuente), una atribución de documento equivocada en `fuentes`, y tres afirmaciones que la fuente no dice tal como las dice la guía |
| 2 | Contradicciones internas | **FALLA** — en un mismo camino declarado salen **dos acciones opuestas** (`ams-no` y `tpu-para-ams`), y la `alcance` de la primera no lleva la excepción que las separa |
| 3 | Relleno y frases de IA | PASA — ninguna fórmula canónica («en resumen», «cabe destacar», «en el mundo de la impresión 3D»…); 5.447 palabras visibles y ningún párrafo sin dato, cifra o fuente propia |
| 4 | Las cuatro etapas, y que hagan algo | PASA — diferencial con 3 comprobaciones de dos caras, 4 variables justificadas y ninguna decorativa, 28 reglas y 16 tarjetas con `cifra` filtrada, 6 destinos de `fueraDeAlcance`; las comprobaciones mecánicas de `verify:guias` replicadas a mano: **todas en verde** |
| 5 | Citas correctas y accesibles | **FALLA** — dos cadenas entrecomilladas que no están en ninguna fuente, y una entrada de `fuentes` que atribuye a un documento algo que ese documento no contiene; las 7 URLs sí están en `wiki/raw/` con ese mismo `url` y no hay ninguna repetida |

### Comprobación 4 en detalle

`tpu-flexible` **todavía no está en el registro `GUIAS`** (`src/lib/guias.ts:81`), así que
`npm run verify:guias` **no la ha mirado**: el contador sale en 845/845 sin haber contado
esta guía. Se han replicado sus comprobaciones sobre el módulo en
`/tmp/opencode/check-tpu.mjs` (sin tocar el repositorio): **pasan todas**.

- Ninguna condición apunta a una variable inexistente, y ningún valor de condición es
  imposible (las 28 reglas y las 16 tarjetas).
- Toda acción con cifra (`°C`, `mm`, `%`) la lleva en `valor`; ninguna la entierra en el
  `porque`.
- **Las 28 reglas tienen `alcance`**, incluidas las que llevan cifra, que es lo que pide
  la regla de la wiki cuando la fuente acota.
- Ninguna variable es decorativa y **cada una cambia el resultado en algún montaje** (la
  comprobación de alcanzabilidad, con todas las combinaciones de las variables vecinas).
- Ninguna regla con condición sale sin contestaciones; las dos reglas sin condición
  (`velocidad`, `soporte-pla`) lo explican en su `alcance`.
- Los diez destinos de enlace (`siNo`, `enlaza` y `fueraDeAlcance`) existen **por su
  slug**, no por su nombre de fichero: `warping-pla`, `separaciones-entre-capas`,
  `temperatura-cama`, `material`, `secar-filamento`, `stringing` y `flow-rate` están todos
  en el registro.
- Negritas equilibradas y ningún `**` en un campo que se pinta como texto plano; las
  270 combinaciones de las cuatro variables dan al menos una regla o una tarjeta.

## Fallos, con dónde y qué hacer

### 1 · Bloqueante · Dos comillas de Bambu en español que no están en ninguna fuente

**Dónde:** reglas, `velocidad`, `alcance`, `:431`.

**Qué dice:**

> Bambu da la misma dirección sin número: **«mantén el límite de velocidad volumétrica por
> defecto»** y **«no aumentes la velocidad»**.

**Por qué falla:** `grep` de las dos cadenas en `wiki/raw/` **no devuelve nada**. No están
en inglés tampoco. Lo que Bambu escribió es otra cosa:

```
wiki/raw/tpu-flexible-bambu-wiki-tpu-85a-90a-printing-guide-for-p-series.md:247
- Please keep the default volumetric speed limit during printing, and it is not
  recommended to increase the print speed.

wiki/raw/tpu-flexible-bambu-wiki-tpu-90a-printing-guide-for-a-series.md:235
- Please keep the default max volumetric speed limit during printing, and avoid
  increasing the print speed.
```

Las dos comillas de la guía son una **traducción**, no una cita. Y una de ellas es además
**más fuerte que la fuente**: la serie P dice *«it is **not recommended** to increase the
print speed»*, y la guía lo escribe como imperativo —«no aumentes la velocidad»—, que
lee como una prohibición.

**Por qué es bloqueante y no una nota de estilo:** la casa entera usa las comillas
angulares para texto **literal de la fuente**, y lo hace en英文 en las otras dieciséis
tarjetas y las veintiocho reglas (revisados los 30 módulos de `src/content/guias/`). Una
cadena entrecomillada que no se puede encontrar con `grep` no se puede comprobar en la
siguiente vuelta, y es exactamente el fallo que la revisión 1 de `secar-filamento` marcó
como bloqueante: *«una cita entrecomillada que no existe en la fuente es, por protocolo,
motivo de rechazo aunque la frase signifique lo que dice»*. El contenido es cierto; lo que
no puede ser es una cita.

**Qué hacer:** poner las dos cadenas en inglés literal, o quitarles las comillas y
dejarlas como paráfrasis atribuida («Bambu dice que se mantenga el límite de velocidad
volumétrica por defecto y que no se aumente la velocidad»). Si se citan, con la literal.

### 2 · Importante · Dos acciones opuestas en el mismo camino declarado

**Dónde:** reglas `ams-no` (`:394-402`) y `tpu-para-ams` (`:414-422`).

**Qué pasa:** con `maquina: bambu`, `ams: ams` y `material: tpu-ams` —comprobado con el
motor— salen a la vez las dos:

```
REGLA ams-no        | Saca el TPU del AMS: ese aparato no lo va a alimentar
REGLA tpu-para-ams  | Con el filamento «TPU for AMS», alimenta por el canal normal de
                    | cualquier AMS
```

La primera dice que el aparato no lo alimenta; la segunda dice que sí. La guía **no
inventa** la contradicción —la publica y la explica en la tarjeta `tpu-ams-producto` y en
el `alcance` de `tpu-para-ams` («Es un filamento distinto del TPU corriente»)—, pero el
`alcance` de `ams-no` (`:401`) **no lleva la excepción**:

> «Es una limitación del aparato. El AMS tiene un engranaje de transmisión que el AMS
> lite no tiene, y por eso puede con algunos filamentos blandos o rugosos. Y la tabla de
> materiales no menciona el AMS HT en ninguna fila: no lo contradice, no habla de él.»

Es la excepción que separa las dos reglas, y está en la regla B y no en la A. Quien
tenga un AMS y un carrete «TPU for AMS» lee primero «saca el TPU del AMS» y después
«alimenta por el canal normal de cualquier AMS», sin que ninguna de las dos tarjetas le
diga que la segunda es la que vale para su filamento.

**Qué hacer:** llevar la excepción al `alcance` de `ams-no` («…salvo el filamento «TPU
for AMS», que sí alimenta por el canal normal de cualquier AMS»), o acotar su `cuando` al
TPU corriente (`material: ['tpu', '85a', '90a', '95a']`). Lo segundo es lo más limpio:
las dos reglas nunca se contradicen porque nunca coexisten.

### 3 · Importante · La lista de fuentes atribuye a la serie A algo que esa página no tiene

**Dónde:** `fuentes`, entrada de la guía de la serie A, `:711`.

**Qué dice:**

> «Serie A: **la incompatibilidad del 85A en la A1**, el desgaste del engranaje, el carrete
> elevado, la cama, las chapas y la pieza alta y fina que se queda oscilando.»

**Por qué falla:** la guía de la serie A es **sólo de 90A** y no menciona el 85A. `grep`
de `85A` en `wiki/raw/tpu-flexible-bambu-wiki-tpu-90a-printing-guide-for-a-series.md`
devuelve **una sola línea, y es la nota del recolector** (`:304`), que dice lo contrario de
lo que afirma la guía:

> «**Variante:** esta guía es **sólo de 90A** para A1. La incompatibilidad de **TPU 85A con
> la serie A1** está en la tabla de compatibilidad de la guía general de TPU (también en
> este lote), **no** en esta página.»

La incompatibilidad A1 + 85A sale de la **guía general** (`tpu-printing-guide.md:55`,
`| A1 series | ❌Incompatible | ✅ | ✅ | ✅ |`), y la tarjeta `variantes` de la guía la
atribuye bien. El error está sólo en la lista de `fuentes`, que es donde se leerá para
volver a la fuente.

**Qué hacer:** quitar «la incompatibilidad del 85A en la A1» de la descripción de esa
fuente, y dejar en su lugar lo que la página sí tiene y no está en ninguna otra: el
carrete elevado, la cama de 30–35 °C, la chapa con adhesivo, la pieza alta y fina que
oscila, la descarga manual y la incompatibilidad de la Cool Plate SuperTack.

### 4 · Menor · La entrada escribe la frase que la propia guía dice que no se escribe

**Dónde:** `entrada`, `:70`.

**Qué dice:** «Por debajo de 85A los engranajes de una Bambu no muerden; **el AMS no lo
deja pasar por su canal**; y de las máquinas de husillo no hay ni una fuente en este
tema.»

**Por qué falla:** la cabecera del módulo dice, con todas las letras, «**Lo que no se
escribe es «el AMS no puede con TPU»**». La entrada dice lo mismo con otras palabras, y es
el primer párrafo que se lee. Con el filamento «TPU for AMS» un AMS **sí** lo deja pasar
por su canal, y eso está en la propia guía tres pantallas más abajo.

**Qué hacer:** «el AMS no deja pasar un TPU corriente por su canal». Con «corriente» la
frase es cierta y no contradice la excepción.

### 5 · Menor · `descarga-manual` convierte un «might not» de Prusa en una prohibición

**Dónde:** reglas, `descarga-manual`, `alcance`, `:542`.

**Qué dice:** «Prusa tiene la suya y es del mismo tipo —«automatic filament change might
not work properly with flexible filaments»—, así que **ninguna de las dos casas tiene
cambio automático de filamento para este material**.»

**Por qué falla:** la fuente de Prusa (`tpu-flexible-prusa-kb-flexible-materials.md:80`)
dice *«Remember that automatic filament change **might not work properly** with flexible
filaments»*. Eso es una advertencia de fiabilidad, no una declaración de inexistencia. La
guía la convierte en «ninguna de las dos casas tiene cambio automático de filamento para
este material», que es más fuerte que la fuente y que además se apoya en una cita que
ella misma entrecomilla al lado, donde se ve el matiz.

**Qué hacer:** «…así que en las dos casas el cambio automático no es una vía fiable con
este material». La acción que queda es la misma.

### 6 · Menor · «El valor que trae el perfil» no lo dice la fuente

**Dónde:** conocimiento, tarjeta `boquilla-bambu`, `:284`.

**Qué dice:** «…y las guías de serie eligen **225 °C**, que es el valor que trae el perfil.»

**Por qué falla:** la serie P dice *«The **recommended printing temperature** for TPU 85A &
90A is 225°C»* (`…p-series.md:245`) y la serie A, *«The recommended printing temperature
for TPU 90A is 225℃»* (`…a-series.md:233`). Ninguna dice que ese número sea el que trae
el perfil; y el apartado donde está la cifra empieza por *«In addition to the **preset
parameters**, specific parameter settings should be adjusted…»*, que dice justo lo
contrario: el perfil y la cifra son dos cosas distintas.

**Qué hacer:** «…, que es la temperatura de impresión que recomiendan las guías de
serie» y, si se quiere decir que es lo que trae el perfil, decirlo sin convertirlo en
cita de la fuente.

### 7 · Menor · «Las dos casas cambian las cuatro» no lo dice la tabla

**Dónde:** conocimiento, tarjeta `cama-y-camara`, `:309`.

**Qué dice:** «La temperatura de cama de un TPU es una combinación de filamento, máquina,
chapa y adhesivo, y **las dos casas cambian las cuatro**.»

**Por qué falla:** las cuatro dimensiones están en la tabla, pero **el adhesivo no cambia
ninguna cifra**. En la tabla de materiales de Bambu la fila del TPU es:

```
| TPU | 30 - 45 °C | 30 - 45 °C |     ← glue stick | liquid glue
```

Lo que cambia en Bambu es la **chapa** (Engineering 30–35 °C; Smooth PEI / HT y Textured
35–45 °C; Cool Plate «Not recommended»), y en Prusa la **lámina** (PA Nylon, Satin, PP,
Textured) — no el adhesivo.

**De dónde viene:** el cocinado, literalmente: *«Es una combinación de filamento + máquina
+ chapa + adhesivo, y las dos casas cambian las cuatro»*
(`wiki/cooked/tpu-flexible.md:728-729`). **Ojo: si se corrige sólo en la guía, vuelve por
la misma puerta en la siguiente vuelta.** Lo que hay que corregir es el cocinado, y
después la frase de la guía.

**Qué hacer:** «…y las dos casas cambian la máquina, la chapa y el filamento» (y dejar el
adhesivo como la dimensión que la tabla de Bambu enumera sin mover la cifra).

### 8 · Menor · «El 90A y el 95A se imprimen en un equipo más corriente» no lo dice nadie

**Dónde:** variables, `material`, `para`, `:129`.

**Qué dice:** «La dureza decide qué máquina lo muerde y qué boquilla admite: el 85A es un
umbral de engranaje en las Bambu, y **el 90A y el 95A se imprimen en un equipo más
corriente**.»

**Por qué falla:** no hay ninguna frase así en las siete fuentes. Lo que sí hay es que el
85A de la serie P no se puede cargar por el tubo PTFE y necesita boquilla de 0,6/0,8 mm,
mientras que el 90A sí se carga por el PTFE; y que el 95A de Prusa es un 95A. «Un equipo
más corriente» es una inferencia sobre el tipo de montaje que ninguna fuente formula, y
además mezcla dos casas: el 95A es Prusa, y el 90A es Bambu.

**Qué hacer:** «…y el 90A y el 95A se pueden alimentar por el camino de siempre», que es
lo que dicen las fuentes (el 90A por el PTFE, el 95A con el aflojado del idler).

## Las cinco trampas que avisó el material cocinado

| Trampa | Estado | Comprobación |
|---|---|---|
| **El umbral de 85A es de Bambu, y Prusa no publica ninguno** | **BIEN TRATADA** | La cabecera (`:19-26`), la tarjeta `umbral-85a` (`:190-203`), la regla `dureza-85a` (`:362-371`) y la `entrada` (`:70`)—atribuyen el umbral a Bambu **y dicen explícitamente que Prusa no publica ninguno** (`:193`, `:370`: «Prusa no enuncia ninguno y por eso aquí no se escribe que por debajo de 85A ninguna impresora pueda con TPU»). Además la regla está condicionada a `maquina: 'bambu'`, así que a un usuario de Prusa no le sale. La tarjeta `que-es-tpu` explica además qué es la escala Shore, con su cita literal |
| **El AMS: tres partes, no una** | **BIEN TRATADA, CON UN CHOQUE EN LAS REGLAS** | Las tres partes están publicadas: la incompatibilidad por dispositivo (tarjeta `ams-mecanismo`, `:244-254`, con la cita literal de la tabla), el AMS HT como cámara sellada sin alimentación (`ams-ht-tarjeta`, `:256-266`) y la excepción de producto «TPU for AMS» (`tpu-ams-producto`, `:268-278`). La cabecera las declara las tres (`:28-37`) y la tarjeta `tpu-ams-producto` explica por qué sólo son compatibles si «TPU for AMS» es otro filamento. **Lo que falla es que las dos reglas que las aplican se contradicen en el mismo camino: ver el fallo 2** |
| **El hueco de bowden** | **BIEN TRATADA** | Ninguna de las 28 reglas menciona bowden, husillo ni filamento remoto. La tarjeta `hueco-corpus` (`:237-242`) lo declara: «**ninguna menciona un extrusor bowden** ni una máquina de filamento remoto. Si tu impresora es de husillo, aquí no hay respuesta: ni a favor ni en contra». Los cuatro mecanismos que sí hay (camino de la XL, el 85A sin PTFE, la resistencia del tubo, la pieza al frente de la cama con 90A) se publican **como mecanismos**, en la tarjeta `mecanismos-camino`, y no como regla de bowden. La `entrada` lo repite. Correcto |
| **El 0,4 mm con el 85A: la tabla dice «Compatible» y la guía dice «no»** | **BIEN TRATADA** | La tarjeta `boquilla-04` (`:211-224`) y el `alcance` de `bambu-85a-boquilla` (`:381`) publican **las dos** con su fuente: la tabla general marca 0,4 mm «Compatible» (`material-bambulab-material-table.md:46`) y la guía de TPU dice «cannot be printed with 0.4mm nozzles» (`tpu-printing-guide.md:66`), con la cita entrecomillada literal. También se publica la diferencia de **grado** del 0,2 mm («Not Recommended» en la tabla, «Not compatible» en la guía), que es el segundo matiz del cocinado. La regla además dice por qué manda la guía («la fuente que habla del 85A es la que dice que no») |
| **Las cuatro cifras de boquilla no se funden** | **BIEN TRATADA** | 225 °C (guías de serie), 200–250 °C ±10 °C (tabla), 220–240 °C (Prusament 95A) y 230–245 °C (flexible en general) están en dos tarjetas separadas, filtradas por `maquina`, con su alcance y su cita. El 250 °C va **etiquetado como proceso de carga** en la regla `carga-250` (`:463-472`) y el `alcance` dice «El 250 °C es del proceso de carga y descarga, no de impresión». La cifra de cama no se repite: va a `temperatura-cama` |

## Las tres escenas de la prueba de utilidad del brief

| Escena | ¿Decidible? | Por dónde |
|---|---|---|
| **TPU 95A en una bowden que se atasca en la primera capa** | **No, y la guía lo dice** | La tarjeta `hueco-corpus` lo declara sin evidencia en ninguna de las siete fuentes, y no inventa una regla de bowden. Ésta es la respuesta correcta |
| **Un TPU con ruido de extrusor y capas separadas** | **Sí** | El diferencial separa las dos cosas: la comprobación `ruido-extrusor` («eso es el engranaje apretando de más o sin morder el filamento») y la `capas-saltadas` («una capa saltada es una boquilla que se tapó a media impresión»). Abajo, `prusa-idler` (1,5 vueltas), `bambu-engranaje`, `bambu-feed-assist`, `boton-extrusion` y `boquilla-tapada` |
| **Alguien con un AMS que mete TPU y la máquina no lo acepta** | **Sí, con el matiz entero** | `ams-no`, `ams-ht` y `tpu-para-ams`, más las tres tarjetas. Ver el fallo 2 sobre cómo se solapan las dos primeras reglas en el camino `tpu-ams` |

## Lo que sí pasa, comprobado

- **Las 28 reglas y las 16 tarjetas cuadran con las siete fuentes**: las 8 reglas con
  `valor` (85A, 0,6/0,8 mm, 20 mm/s, 250 °C, 1,5 vueltas, 0,2 mm, 5 °C · 0,4 mm³/s, 45 °C)
  y las 6 tarjetas con `cifra` (95A · 90A · 85A, 85A, 0,4 mm, 225 · 200–250 °C,
  220–240 · 230–245 °C, 135 s). **No hay ni una interpolación, ni una cifra de cama, ni un
  tiempo de secado colado.**
- **Las 12 citas de las tarjetas son literales** y se han encontrado con `grep` en
  `wiki/raw/`, con su atribución correcta (Bambu Lab / Prusa Research) y sin que ninguna
  cruce un salto de línea. Las dos únicas que fallan son las del `alcance` de `velocidad`,
  y no son literales: son traducciones (fallo 1).
- **Las 7 URLs de `fuentes` están en `wiki/raw/`** con ese mismo `url`, y no hay ninguna
  repetida. La primera cita está en la primera tarjeta, no al final.
- **El diferencial abre la guía y sus tres comprobaciones tienen las dos caras.** `si` y
  `no` en las tres, y cada `si` es accionable («eso es el engranaje apretando de más o
  sin morder el filamento»).
- **Ninguna variable es decorativa**, y las cuatro cambian el resultado de verdad:
  `maquina` (Bambu / Prusa / otra), `material` (5 grados), `ams` (3 aparatos) y `sintoma`
  (6 síntomas). La `maquina` es `necesaria`, y las `material` y `maquina` van primero.
- **`fueraDeAlcance` tiene los seis destinos del brief**, y cada uno dice qué caso no
  entra, por qué y a dónde llevarlo: `material`, `secar-filamento`, `stringing`,
  `flow-rate`, `warping-pla` y `separaciones-entre-capas`.
- **La cifra va en `valor` y el porqué debajo**, en las 28 reglas. Y **las 28 reglas
  tienen `alcance`**, que es lo que hace falta cuando la fuente acota (el 225 °C es de la
  serie P, el 250 °C es de carga, el 0,4 mm con 85A tiene dos fuentes, el 1,5 vueltas es
  del 95A de Prusa).
- **El `campos` del panel no está en la guía**: `campos: []` y `leeDelAnalisis: ['material']`,
  como `secar-filamento`. La variable `material` declara `campos: ['material']`, así que
  la barra «Tu archivo» enseña el material del G-code y lo lleva a la casilla. El
  `material` ya tiene dueño en la guía `material`, y `verify:wiki` lo confirma.

## Notas que no bloquean

- **La guía todavía no está en el registro `GUIAS`** (`src/lib/guias.ts:81`). Al
  publicarla hay que añadirla, y entonces `verify:guias` la mirará: **las comprobaciones
  mecánicas ya pasan** (ver «Comprobación 4 en detalle»), así que lo que salga será un
  **AVISO** por las dos reglas sin condición (`velocidad` y `soporte-pla`), y las dos lo
  explican en su `alcance`, que es lo que pide el aviso. La guia tiene ya `slug:
  'tpu-flexible'`, y el mapa de `precontestar` ya trae la aguja `tpu → tpu`, que existe
  como opción de la variable `material`.
- **El `alcance` de `bambu-engranaje` comprime dos sitios de la página en uno.** Dice que
  Bambu «lo incluye entre las tres causas de atasco de su diagnóstico», y la frase que cita
  está en el apartado «Extruder» de la guía de la serie A, no en la lista de los tres
  problemas —que está en «Common Printing Issues». La segunda frase de la misma regla lo
  corrige («El desgaste del engranaje explica el deslizamiento del filamento, que es una
  de las causas de infraextrusión que la guía general lista»), así que el sentido final es
  el correcto; lo que falla es el «lo incluye entre las tres».
- **Dos citas cambian el apóstrofo tipográfico**: «If you're not sure…» e «It's alright…»
  llevan el apóstrofo recto donde la fuente lo lleva en curva (’). El texto es idéntico;
  no es una cita inventada, pero conviene ser consistente con la fuente.
- **Las opciones `tpu` y `90a` de la variable `material` se comportan igual** en algunos
  montajes (con Bambu y AMS salen las mismas reglas). No es un problema: la variable no es
  decorativa —la tarjeta `boquilla-04` es sólo del 85A y la `tpu-ams-producto` sólo del
  «TPU for AMS»—, y el conjunto de las cinco opciones sí cambia el resultado.
- **La guía menciona en prosa muchas guías más** —`placas`, `max-volumetric-speed`,
  `slicer`, `voladigos-y-soportes`, `temperatura-hotend`, `adhesion-primera-capa`— y no
  las enlaza. No es un fallo (el enlace es opcional y todas esas guías existen), pero son
  seis `enlaza` gratis en tarjetas que ya las nombran.
- **El cocinado tiene dos sitios que van a devolver estos fallos si no se corrigen
  también**: el «las dos casas cambian las cuatro» de `## Contradicciones` §3 (fallo 7) y
  la atribución de la incompatibilidad del 85A en la A1. La segunda no está en el
  cocinado —la fuente la desmiente explícitamente—, pero la primera sí.

## Para la siguiente vuelta

1. Poner en literal inglés las dos comillas del `alcance` de `velocidad`, o quitarles las
   comillas (**fallo 1**). Es la línea más fácil de arreglar de toda la lista.
2. Separar `ams-no` y `tpu-para-ams`: o la excepción en el `alcance` de `ams-no`, o el
   `cuando` de `ams-no` acotado al TPU corriente (**fallo 2**). Es lo que separa dos
   acciones opuestas en la misma pantalla.
3. Corregir la descripción de la fuente de la serie A en `fuentes`: fuera «la
   incompatibilidad del 85A en la A1», que no está en esa página (**fallo 3**).
4. Los cinco menores (fallos 4 a 8) son de una línea cada uno y pueden ir en la misma
   pasada. El 7 tiene que corregirse **también en `wiki/cooked/tpu-flexible.md`**, o
   vuelve.

**La matriz de la guía —que es lo difícil— no hay que tocarla.** Las cinco trampas del
material cocinado están bien tratadas, las cifras cuadran con las siete fuentes y la
estructura pasa todas las comprobaciones mecánicas. Lo que queda son cuatro atribuciones
y una contradicción entre dos reglas: son correcciones de texto, no de investigación.
