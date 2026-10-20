# Revisión de `tpu-flexible` — segunda vuelta

**Veredicto: RECHAZADO** — 1 fallo, de los cuales 1 importante (no bloqueante), más
8 notas que no bloquean.

Guía: `src/content/guias/tpu-flexible.ts` (745 líneas). Cocinado:
`wiki/cooked/tpu-flexible.md`. Brief: `wiki/briefs/tpu-flexible.md`.
Informe anterior: `wiki/reviews/tpu-flexible-revision-1.md` (RECHAZADO, 8 fallos).

Fuentes crudas: las siete del lote, abiertas **por su ruta real** y no por el nombre
del fichero (`slicer-prusa-kb-prusament-tpu-95a-material-guide.md` y
`material-bambulab-material-table.md` son las dos reutilizadas; las otras cinco llevan
el prefijo `tpu-flexible-`).

**Comprobado contra `wiki/raw/`, no contra el cocinado.** Cada cifra, cada cita y cada
atribución se ha contrastado con el cuerpo de la fuente de la que sale, con `grep -F`
literal y, cuando el fragmento no salía entero, **por las dos mitades**. Los siete
ficheros no tienen el mismo ancho de línea —sólo el del Prusament TPU 95A está partido a
80 columnas—, así que antes de concluir que una cita no está, se ha mirado si el
fichero que la debería contener está partido y si las dos mitades están.

**Lo que hay que decir primero, porque es lo bueno: los ocho fallos de la primera vuelta
están corregidos, uno por uno y en su línea.** Y las cinco trampas que avisó el
material cocinado siguen bien tratadas, y las cinco. La matriz de la guía —28 reglas,
16 tarjetas, 4 variables— cuadra con las siete fuentes, y **las comprobaciones
mecánicas de `verify:guias` replicadas a mano pasan todas**: ninguna regla muerta,
ninguna tarjeta muerta, ninguna variable decorativa, ninguna cifra sin nota de
alcance, ningún enlace a una guía inexistente, ninguna negrita mal cerrada.

**El único fallo que queda es de alcance, y es el mismo sitio donde la primera vuelta
encontró uno.** La corrección del «adhesivo» (fallo 7) pasó de «cambian las cuatro» a
«cambian las tres», y el material cocinado sí quedó corregido del todo —«cambia con el
filamento y con la máquina, **y en Bambu también con la chapa**»—. La tarjeta
`cama-y-camara` de la guía se quedó a medio camino y afirma ahora una cosa que ninguna
fuente de Prusa sostiene. Es un fallo de una frase, pero la frase es de la tarjeta que
**siempre** se ve, y dice lo contrario de lo que dice la propia regla `bambu-camara` de
la misma guía. Detalle abajo.

No se ha modificado la guía, ni el cocinado, ni las fuentes crudas.

## Comprobaciones

| # | Comprobación | Resultado |
|---|---|---|
| 1 | Afirmaciones con respaldo | **FALLA** — 1 afirmación sin respaldo: la tarjeta `cama-y-camara` atribuye a las dos casas una dimensión de la temperatura de cama que sólo existe en Bambu |
| 2 | Contradicciones internas | **FALLA** — la misma tarjeta y la regla `bambu-camara` no pueden ser las dos ciertas sobre la chapa en Prusa |
| 3 | Relleno y frases de IA | PASA — ninguna fórmula canónica («en resumen», «cabe destacar», «en el mundo de la impresión 3D»…); 5.716 palabras visibles y ningún párrafo sin dato, cifra o fuente propia |
| 4 | Las cuatro etapas, y que hagan algo | PASA — diferencial con 3 comprobaciones de dos caras, 4 variables justificadas y ninguna decorativa, 28 reglas y 16 tarjetas con `cifra` filtrada, 6 destinos de `fueraDeAlcance`; las comprobaciones mecánicas de `verify:guias` replicadas a mano: **todas en verde** |
| 5 | Citas correctas y accesibles | PASA — las 7 URLs están en `wiki/raw/` con ese mismo `url`, no hay ninguna repetida, y **las 13 citas de tarjeta y las 78 cadenas entrecomilladas del resto del texto están todas en `wiki/raw/`**, comprobadas por mitades donde el crudo parte la línea |

### Comprobación 4 en detalle

`tpu-flexible` **sigue sin estar en el registro `GUIAS`** (`src/lib/guias.ts`), así que
`npm run verify:guias` **no la ha mirado**: el contador sale en 845/845 sin haber
contado esta guía. Se han replicado sus comprobaciones sobre el módulo en
`/tmp/opencode/check-tpu.mjs` (sin tocar el repositorio): **pasan todas**.

- Ninguna condición apunta a una variable inexistente, y ningún valor de condición es
  imposible (las 28 reglas y las 16 tarjetas).
- Toda acción con cifra (`°C`, `mm`, `%`) la lleva en `valor`; ninguna la entierra en el
  `porque`.
- **Las 28 reglas tienen `alcance`**, incluidas las que llevan cifra, que es lo que
  pide la regla de la wiki cuando la fuente acota.
- Ninguna variable es decorativa y **cada una cambia el resultado en algún montaje** (la
  comprobación de alcanzabilidad, con todas las combinaciones de las variables vecinas:
  `maquina` 90, `material` 9, `ams` 15, `sintoma` 3).
- Ninguna regla con condición sale sin contestaciones; las dos reglas sin condición
  (`velocidad`, `soporte-pla`) lo explican en su `alcance`.
- Los diez destinos de enlace (`siNo`, `enlaza` y `fueraDeAlcance`) existen **por su
  slug**, no por su nombre de fichero: `warping-pla`, `separaciones-entre-capas`,
  `temperatura-cama`, `material`, `secar-filamento`, `stringing` y `flow-rate` están
  todos en el registro. **Ni un enlace roto.**
- Negritas equilibradas y ningún `**` en un campo que se pinta como texto plano.
- **Ninguna regla ni ninguna tarjeta es dead code**: con las 270 combinaciones de las
  cuatro variables, las 28 reglas salen entre 15 y 270 veces y las 16 tarjetas entre 30 y
  270. No hay ninguna que nunca salga.

## Los ocho fallos de la primera vuelta, uno por uno

| # | Fallo anterior | Estado | Comprobación |
|---|---|---|---|
| 1 | Dos comillas de Bambu en español que no estaban en ninguna fuente | **CORREGIDO** | Las dos están ahora en inglés literal y son greppables: «Please keep the default volumetric speed limit during printing, and it is not recommended to increase the print speed» (`…p-series.md:247`) y «Please keep the default max volumetric speed limit during printing, and avoid increasing the print speed» (`…a-series.md:235`). Cada una está en su página, y la serie P no aparece en la cita de la serie A ni al revés |
| 2 | Dos acciones opuestas en el mismo camino (`ams-no` y `tpu-para-ams`) | **CORREGIDO** | `ams-no` acotó su `cuando` a `material: ['tpu', '85a', '90a', '95a']` y su `alcance` lleva la excepción del «TPU for AMS». Comprobado **con el motor, en las 270 combinaciones**: las dos reglas **nunca** salen a la vez |
| 3 | La lista de fuentes atribuía a la serie A la incompatibilidad del 85A en la A1 | **CORREGIDO** | La descripción de esa fuente ya no la menciona, y lista sólo lo que la página sí tiene: hotend nuevo o dedicado, desgaste del engranaje, carrete elevado, cama de 30–35 °C, chapa con adhesivo y Cool Plate SuperTack descartada, descarga manual y la pieza alta y fina que oscila. Las siete comprobaciones de esa lista se han verificado una a una en `…a-series.md` |
| 4 | La entrada escribía lo que la cabecera dice que no se escribe | **CORREGIDO** | Ahora dice «un AMS no deja pasar un TPU corriente por su canal» |
| 5 | `descarga-manual` convertía un «might not» en una prohibición | **CORREGIDO** | Ahora dice «en las dos casas el cambio automático de filamento no es una vía fiable con este material», que es lo que dice el «might not work properly» de Prusa |
| 6 | «el valor que trae el perfil» no lo dice la fuente | **CORREGIDO** | La tarjeta `boquilla-bambu` dice ahora «las guías de serie eligen 225 °C **como temperatura de impresión recomendada**». Ya no dice que sea el valor del perfil |
| 7 | «las dos casas cambian las cuatro» | **CORREGIDO A MEDIAS** | El adhesivo ya no es una dimensión ✓, y el cocinado quedó bien corregido. Pero queda un residuo: la tarjeta sigue diciendo «las dos casas cambian **las tres**», y una de las tres no es verdad en Prusa. **Ver el fallo 1 de este informe** |
| 8 | «el 90A y el 95A se imprimen en un equipo más corriente» no lo dice nadie | **CORREGIDO** | Ahora dice «el 90A y el 95A se pueden alimentar por el camino de siempre —el 90A por el tubo PTFE y el 95A aflojando el idler—, que es lo que los separa del 85A». Los dos hechos están en las fuentes: el 90A por el PTFE en `…p-series.md:201-205` y el 95A aflojando el idler en `…95a-material-guide.md:41-42, 92` |

## Las cinco trampas del brief, que en la primera vuelta estaban bien tratadas

| Trampa | Estado | Comprobación |
|---|---|---|
| **El umbral de 85A es de Bambu, y Prusa no publica ninguno** | **BIEN TRATADA** | La cabecera (`:19-26`), la tarjeta `umbral-85a` (`:190-203`), la regla `dureza-85a` (`:362-375`) y la `entrada` (`:70`) lo atribuyen a Bambu **y dicen explícitamente que Prusa no enuncia ninguno** (`:193`, `:374`). La regla está condicionada a `maquina: 'bambu'`, así que a un usuario de Prusa no le sale. La tarjeta `que-es-tpu` explica además qué es la escala Shore, con su cita literal |
| **El AMS: tres partes, no una** | **BIEN TRATADA, Y EL CHOQUE DE LAS REGLAS ESTÁ RESUELTO** | Las tres partes están publicadas: la incompatibilidad por dispositivo (tarjeta `ams-mecanismo`, con la cita literal de la tabla), el AMS HT como cámara sellada sin alimentación (`ams-ht-tarjeta`) y la excepción de producto «TPU for AMS» (`tpu-ams-producto`). La cabecera las declara las tres. **Las dos reglas que las aplican ya no se contradicen en ningún camino**: `ams-no` sale en 24 de 270 combinaciones y `tpu-para-ams` en 54, y **no hay ni una combinación en la que salgan las dos** |
| **El hueco de bowden** | **BIEN TRATADA** | `grep -in "bowden\|husillo\|remote filament\|iDex"` sobre las siete fuentes: **cero coincidencias en el cuerpo de las siete**. Las únicas menciones del lote están en las notas del recolector —tres líneas en dos notas— y las dos notas dicen lo contrario («no habla de extrusores bowden en ningún momento»). La guía lo declara en la cabecera, en la `entrada` y en la tarjeta `hueco-corpus` («Si tu impresora es de husillo, aquí no hay respuesta: ni a favor ni en contra»), y **no hay ninguna regla de bowden**: los cuatro mecanismos que sí hay se publican **como mecanismos**, en la tarjeta `mecanismos-camino` |
| **El 0,4 mm con el 85A: la tabla dice «Compatible» y la guía dice «no»** | **BIEN TRATADA** | La tarjeta `boquilla-04` y el `alcance` de `bambu-85a-boquilla` publican **las dos** con su fuente: la tabla general marca 0,4 mm «Compatible» (`material-bambulab-material-table.md:46`) y la guía de TPU dice «85A TPU filaments cannot be printed with 0.4mm nozzles» (`tpu-printing-guide.md:66`), con la cita literal. También se publica la diferencia de **grado** del 0,2 mm («Not Recommended» en la tabla, «Not compatible» en la guía) |
| **Las cuatro cifras de boquilla no se funden** | **BIEN TRATADA** | 225 °C (guías de serie), 200–250 °C ±10 °C (tabla), 220–240 °C (Prusament 95A) y 230–245 °C (flexible en general) están en dos tarjetas separadas, filtradas por `maquina`, con su alcance y su cita. El 250 °C va **etiquetado como proceso de carga** en la regla `carga-250` y su `alcance` dice «El 250 °C es del proceso de carga y descarga, no de impresión». La cifra de cama no se repite: va a `temperatura-cama` |

## Las citas nuevas del redactor

Las cuatro correcciones están **bien hechas**, y se han comprobado con `grep -F` y con
`cat -A` (bytes) para que no dependa de cómo se vea el apóstrofo:

- **Las dos que empalmaban dos trozos del crudo** llevan ahora la elipsis: `ams-mecanismo`
  («Too soft (e.g., TPU 95A/85A/83A/80A**…**: These cannot pass smoothly through the AMS /
  AMS lite channel») y `sintomas-propios` («TPU filament is prone to the following
  problems:**…** Under extrusion (Nozzle clogging, loading resistance, filament slipping)»).
  Las dos mitades de cada una son greppables por separado: la primera contra la tabla de
  materiales, la segunda contra las guías de serie P y A.
- **Los dos apóstrofos** son ahora el tipográfico de la fuente, byte a byte: la guía
  lleva `E2 80 99` (U+2019) en «It’s alright…» y en «If you’re not sure…», y el crudo
  también. Con el apóstrofo recto, `grep` no encontraba nada; ahora sí.

## Los gates del brief

| Gate | Estado | Comprobación |
|---|---|---|
| 1 · El TPU es un material con otras exigencias, no con otros números | PASA | El eje de la guía es el requisito de máquina: engranaje, camino del filamento, boquilla, aparato que alimenta. El diferencial separa el material blando de la máquina que no puede con él. Las cifras están, con su fuente, subordinadas a «¿mi máquina puede con esto?» |
| 2 · Shore es una cifra con significación propia | PASA | La tarjeta `que-es-tpu` explica la escala («Shore A es la escala blanda, Shore D la dura, y un número más alto significa material más duro y menos flexible»), publica la cifra con su fuente y no la convierte en «más flexible» |
| 3 · Una limitación del AMS es una limitación del aparato | PASA | Todo lo del AMS está escrito con el aparato como sujeto: el canal, la cámara estanca, el engranaje de transmisión, el cutter. La cabecera dice «Lo que no se escribe es «el AMS no puede con TPU»» y la `entrada` lo dice con la coletilla «un TPU corriente» |
| 4 · La retracción es un caso aparte, no un número menor | PASA | La regla se llama `retract-off` y su acción es «Prueba a desactivar la retracción», con la cita literal de Prusa. La tarjeta `retraccion-caso` explica las dos direcciones opuestas (atasco/enredado frente a goteo severo). Y dos veces se dice que **no** se escribe «baja la retracción a 0,2 mm» |
| 5 · Ninguna cifra de cama, boquilla de impresión ni de secado se repite sin su fuente | PASA | No hay ninguna cifra de cama del TPU en las tarjetas ni en las reglas: 30–35, 35–45, 30–45, 55–75 y 60–75 no aparecen en ninguna, y tampoco hay ninguna cifra de secado. La boquilla 200–250 °C sale de la tabla de Bambu con ella. El 45 °C que sí aparece es de la regla de **cámara**, y su `alcance` lo dice: «su valor es de cámara, no de cama». La única cifra de cama de toda la guía está en la lista de `fuentes` (descripción de la serie A), con su fuente al lado —ver las notas |
| 6 · No se generaliza a partir de un solo material | PASA | El 85A es de Bambu y se publica como tal; el 95A HF se declara sin guía propia; el Prusament 95A se publica como lo que es; y la variable `material` ofrece «TPU sin dureza conocida» para el que no sabe |

## Fallos, con dónde y qué hacer

### 1 · Importante · La tarjeta atribuye a las dos casas una dimensión que sólo existe en Bambu

**Dónde:** conocimiento, tarjeta `cama-y-camara`, `cuerpo`, `:313`.

**Qué dice:**

> «La temperatura de cama de un TPU es una combinación de filamento, máquina y chapa, y
> **las dos casas cambian las tres**: no es un valor del material, y las cifras de cama
> están en su propia guía.»

**Por qué falla:** en Prusa, **ninguna fuente da una cifra de cama distinta por lámina**.
Las dos fuentes de Prusa dan una cifra por filamento y ninguna más:

```
slicer-prusa-kb-prusament-tpu-95a-material-guide.md:33
Heatbed temperature: 55-75 °C

tpu-flexible-prusa-kb-flexible-materials.md:21
**Recommended bed temperature:** 60 °C - 75 °C (Depending on the size of the object, bigger objects tend to need higher bed temperature).
```

Ni la una ni la otra menciona la lámina, y la variación que sí dan es por **tamaño de
objeto**, no por chapa. La lista de láminas de Prusa (PA Nylon, Satin, PP, Textured) es
una recomendación de superficie. La chapa sólo mueve la cifra **en Bambu**, y ahí está
en la tabla de chapas de la tabla de materiales: Engineering 30–35 °C, Smooth PEI / HT y
Textured 35–45 °C, Cool Plate «Not recommended».

El material cocinado, que **sí** quedó corregido, lo dice sin ambigüedad
(`wiki/cooked/tpu-flexible.md:787-797`):

> «Cambia con el **filamento** y con la **máquina**, y en Bambu también con la
> **chapa**. […] La lista de láminas de Prusa —PA Nylon, Satin, PP, Textured— es una
> recomendación de superficie, no una tabla de temperaturas por chapa: en Prusa ninguna
> fuente da una cifra distinta por lámina, **y no se escribe que la lámina mueva la
> temperatura**.»

Y la propia guía lo dice bien, dos líneas más abajo, en la regla `bambu-camara`
(`:639`): «La cifra de cama del TPU **en Bambu** cambia con el filamento y con la chapa».
Las dos afirmaciones no pueden ser las dos ciertas: si la tarjeta acierta, el «en Bambu»
de la regla sobra; si la regla acierta —y acierta, porque es lo que dicen las fuentes—,
la tarjeta generaliza a Prusa una dimensión que Prusa no tiene.

**Qué hacer:** cambiar «y las dos casas cambian las tres» por «y cambia con el filamento
y con la casa, y en Bambu también con la chapa», que es la fórmula del cocinado y la
que ya usa la regla `bambu-camara`. Con eso, la tarjeta y la regla dicen lo mismo y
las dos dicen lo que dicen las fuentes.

## Notas que no bloquean

- **La cita «standard temperature for loading TPU» sólo está en una de las tres páginas.**
  La regla `carga-250` (`:472`) dice: «Es la temperatura que las tres páginas de Bambu
  dan para el proceso de carga: «standard temperature for loading TPU», tanto en el
  diagnóstico del módulo de asistencia como en los procedimientos de carga y descarga de
  las guías de serie P y A». La frase entre comillas **sólo** aparece en la página del
  módulo (`tpu-feed-assist-module-troubleshooting.md:47`); las series P y A dan los 250 °C
  con otra fórmula («it is recommended to heat the hotend to 250 ℃», «Preheat the hotend
  to 250℃»). El dato es correcto y la cita es literal, pero el «tanto…como» se puede
  leer como si la frase estuviera en las tres. Bastaría con explicitarla: «…: el módulo
  lo llama «standard temperature for loading TPU», y las series P y A dan los mismos
  250 °C en sus procedimientos de carga y descarga».
- **Una regla apunta a una guía que no existe.** El `alcance` de `imprime-objeto`
  (`:598`) dice «El modo de impresión por objeto tiene su propia guía». No la hay: no
  existe en `GUIAS` ninguna guía del modo por objeto, y el material cocinado de este
  tema **no la sugiere** (las tres páginas propias que propone son «Alimentación de
  filamento flexible», «Umbral de dureza y engranaje» y «Variantes de TPU»). No rompe
  ningún enlace, porque es prosa y no un `enlaza`, pero afirma una página que no está.
  Lo propio de este caso es `fueraDeAlcance` y sin `guia`, o quitarlo.
- **Dos citas que sólo cambian la mayúscula inicial.** La regla `prusa-placa` (`:625`)
  cita «the most recommended print surface»; el crudo la tiene con mayúscula («The most
  recommended print surface», dos veces). Y la tarjeta `boquilla-prusa` cita «depending
  on hardness and brand»; el crudo la tiene con mayúscula («(Depending on hardness and
  brand)»). El texto es el mismo en los dos casos, pero la cita no sale con `grep` tal
  cual.
- **Tres citas de tarjeta no son greppables enteras, y no es culpa del redactor.** En
  `que-es-tpu`, `boquilla-prusa` y `retraccion-caso` la captura cruda lleva la
  énfasis de Markdown **en medio** de la frase («its **shore hardness**», «by 5 °C**,
  this will…», «to **turn the retractions off** completely»). Es la convención de la
  casa, no un defecto: `torre-temperatura` y `paredes-y-perimetros` tienen el mismo
  patrón en sus citas ya aprobadas, y las dos mitades de cada una de las tres son
  greppables por separado. **Lo que no puede pasar es una cita en la que el texto no esté**, y no
  hay ninguna: las 13 citas de tarjeta y las 78 cadenas entrecomilladas del resto del
  texto están todas en `wiki/raw/`. De esas 78, **65 son fragmentos literales** de las
  siete fuentes; las otras 13 son o la frase de la propia guía entrecomillada («el AMS no
  puede con TPU», «baja la retracción a 0,2 mm», «apagarlo», «ventilador a 0», «Tu
  archivo», «TPU for AMS»), o dos que sólo cambian la mayúscula inicial (ver la nota
  anterior), o el texto de la cabecera, que va partido por el salto de línea del
  comentario.
- **El comentario de cabecera dice «su chapa» de las cifras de boquilla** (`:51`):
  «Hay 225 °C, 200–250 °C, 220–240 °C y 230–245 °C, y cada una tiene su filamento, su
  máquina y su chapa». La boquilla no depende de la chapa. Es un comentario de
  developers, no se pinta en la página, pero conviene arreglarlo.
- **El `detalle` de la opción 90A dice «El habitual de la gama Bambu»** (`:144`). Ninguna
  fuente dice cuál es el 90A habitual; lo que sí se puede decir es que es el único con
  guía de serie propia en el lote.
- **La lista de `fuentes` lleva una cifra de cama** (`:715`): «la cama de 30–35 °C» en
  la descripción de la serie A. Se pinta en la página, en «De dónde sale esto», y está
  al lado de su fuente; el cuerpo de la guía no repite ninguna cifra de cama. Gate 5
  se cumple, pero conviene saber que esa cifra sale en la página.
- **La guía sigue sin estar en el registro `GUIAS`** (`src/lib/guias.ts`). Al publicarla
  hay que añadirla, y entonces `verify:guias` la mirará: **las comprobaciones
  mecánicas ya pasan** (ver «Comprobación 4 en detalle»), así que lo que saldrá será un
  **AVISO** por las dos reglas sin condición (`velocidad` y `soporte-pla`), y las dos lo
  explican en su `alcance`, que es lo que pide el aviso. La guía tiene ya
  `slug: 'tpu-flexible'`, y el mapa de `precontestar` ya trae la aguja `tpu → tpu`.

## Lo que sí pasa, comprobado

- **Las 28 reglas y las 16 tarjetas cuadran con las siete fuentes.** Las 8 reglas con
  `valor` (85A, 0,6 · 0,8 mm, 20 mm/s, 250 °C, 1,5 vueltas, 0,2 mm, 5 °C · 0,4 mm³/s,
  45 °C) y las 6 tarjetas con `cifra` (95A · 90A · 85A, 85A, 0,4 mm,
  225 · 200–250 °C, 220–240 · 230–245 °C, 135 s). **No hay ni una interpolación, ni una
  cifra de cama en las tarjetas ni en las reglas, ni un tiempo de secado colado.**
- **Las 7 URLs de `fuentes` están en `wiki/raw/`** con ese mismo `url`, y no hay ninguna
  repetida. Las siete páginas que describen son las siete que existen.
- **El diferencial abre la guía y sus tres comprobaciones tienen las dos caras.** `si` y
  `no` en las tres, y cada `si` es accionable («eso es el engranaje apretando de más o
  sin morder el filamento»).
- **Ninguna variable es decorativa**, y las cuatro cambian el resultado de verdad: `maquina`
  (Bambu / Prusa / otra), `material` (5 grados), `ams` (3 aparatos) y `sintoma`
  (6 síntomas). La `maquina` es `necesaria`, y las `material` y `maquina` van primero.
- **`fueraDeAlcance` tiene los seis destinos del brief**, y cada uno dice qué caso no
  entra, por qué y a dónde llevarlo: `material`, `secar-filamento`, `stringing`,
  `flow-rate`, `warping-pla` y `separaciones-entre-capas`.
- **La cifra va en `valor` y el porqué debajo**, en las 28 reglas. Y **las 28 reglas
  tienen `alcance`**, que es lo que hace falta cuando la fuente acota (el 225 °C es de
  la serie P, el 250 °C es de carga, el 0,4 mm con 85A tiene dos fuentes, el 1,5
  vueltas es del 95A de Prusa, el 0,2 mm es sólo para goteo severo).
- **El `campos` del panel no está en la guía**: `campos: []` y `leeDelAnalisis: ['material']`,
  como `secar-filamento`. La variable `material` declara `campos: ['material']`, así que
  la barra «Tu archivo» enseña el material del G-code y lo lleva a la casilla. El
  `material` ya tiene dueño en la guía `material`, y `verify:wiki` lo confirma.

## Para la siguiente vuelta

1. **Una frase.** «Y las dos casas cambian las tres» → «y cambia con el filamento y con
   la casa, y en Bambu también con la chapa». Es lo único que bloquea.
2. Las tres notas de las que antes (§carga-250, §imprime-objeto, §mayúsculas de las
   dos citas) son de una línea cada una y pueden ir en la misma pasada.
3. **La matriz de la guía no hay que tocarla.** Las cinco trampas del material cocinado
   están bien tratadas, las cifras cuadran con las siete fuentes, las 78 cadenas
   entrecomilladas están todas en el crudo y la estructura pasa todas las comprobaciones
   mecánicas. Lo que queda es una frase y tres atribuciones.
