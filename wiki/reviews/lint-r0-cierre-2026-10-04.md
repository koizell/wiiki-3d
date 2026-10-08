# Lint R0 — cierre del parche, 2026-10-04

**Veredicto del lote: RECHAZADO** — 2 fallos, ambos menores, ninguno bloqueante.
`warping-pla` queda **APROBADO**: los dos cambios que pedía están bien y no ha vuelto nada
de lo que las vueltas anteriores dejaron cerrado. `temperatura-cama` queda rechazado por
un resto del defecto que el parche corrigió a medias y por una de las tres comillas que no
se tocaron.

No es un veredicto sobre elegibilidad ni sobre ninguna plataforma de monetización.

## Alcance y método

Se comprobaron **los cuatro cambios uno a uno contra el cuerpo de `wiki/raw/`**, no contra
`wiki/cooked/`: el artículo y el cocinado coinciden por construcción, así que compararlos sólo
daría OK a un error que nació en la capa cocida. Las fuentes se localizaron por su ruta real
(`warping-pla-bambu-wiki-warping-falling-off-collapsing.md`,
`warping-pla-prusa-forum-warping-at-corners.md`,
`warping-pla-prusa-forum-adjusting-settings-warping-pla.md`,
`temperatura-cama-prusa-kb-filament-material-guide.md`, `temperatura-cama-prusa-kb-pla.md`,
`temperatura-cama-bambu-wiki-filament-guide-material-table.md`), nunca por el slug del
artículo. Los dos hilos de foro están partidos a 80 columnas, así que sus citas se buscaron
por las dos mitades. No se ha consultado internet. **No se ha modificado artículo, cocinado,
raw ni ningún informe anterior.**

| Cambio | Veredicto | Evidencia |
|---|---|---|
| 1 · `Switch to Gyroid at ≤25 %` como techo | **RESUELTO** | `warping-falling-off-collapsing.md:167`; artículo `:92`, `:385`, `:388`; cocinado `:152` |
| 2 · Radios de 3 mm contra chaflán | **RESUELTO** | `warping-at-corners.md:20-21` y `:24`; `grep` de `crinkle` en el hilo de 2019 da cero; artículo `:116-118` y `:461-465` |
| 3 · Bambu «publica» sus valores por chapa | **PARCIAL** | Celda `:32` corregida; la misma exclusividad sigue en `:56` y `:102` |
| 4 · Tres comillas con puntos suspensivos | **PARCIAL** | Las dos del hilo corregidas y la de `PLA is printable` restaurada; queda la de las Engineering Plates en `:79` |

## Los cuatro cambios, uno a uno

### 1 · Gyroid: el 25 % es techo y el comparador no está invertido — RESUELTO

La fuente, en el cuerpo (`warping-pla-bambu-wiki-warping-falling-off-collapsing.md:164-167`):

> Large flat model warping
> Setting to change: Infill pattern + density
> Recommended direction: Switch to Gyroid at **≤25 %**

Las cuatro menciones del artículo dicen el 25 % como techo y ninguna invierte el signo:

- `:92` — «Gyroid con el **25 % como techo** para el modelo grande y plano» (y el contexto
  «modelo grande y plano» es el de la fila, *Large flat model warping*).
- `:385` — «### 5. Cambia el relleno a Gyroid con el **25 % como techo**».
- `:388` — «con el **25 %** de densidad como techo, con su comparador literal `≤`».

La del cocinado (`wiki/cooked/warping-pla.md:152`) está igual de bien, y ahora con las dos
formas a la vez: «con el 25 % de densidad como techo. La fuente lo escribe con su comparador
literal: «Switch to Gyroid at ≤25 %»». El literal se conserva además en `:64`, `:500` y
`:535`, así que la próxima vuelta tiene la fuente escrita en las dos capas.

**Búsqueda de cierre:** `por debajo del 25|menos del 25|< 25|<25` en todo el repositorio
devuelve **cinco** coincidencias y **ninguna** está en un artículo ni en un cocinado: las
cinco son informes de revisión (`lint-r0-2026-10-04.md:59`,
`warping-pla-revision-8.md:42,46,47,55`). El signo ya no se pierde por ninguna puerta.

### 2 · Radios y chaflán: cada atributo en su hilo — RESUELTO

Hilo de 2024, `warping-pla-prusa-forum-warping-at-corners.md:13-24` (Elias Spors,
29/11/2024): «I tried to round off the 90°-corners with 3mm radii but the crinkles remained»
(`:20-21`) e «I also tried to increasing the perimeter count, also with no effect» (`:24`).
Las dos frases que el artículo usa están en **esa** intervención y en ninguna otra.

Hilo de 2019, `warping-pla-prusa-forum-adjusting-settings-warping-pla.md`: `grep` de
`crinkle|arrugado|wrinkle` → **cero coincidencias**. Zakalawe describe «the part warps so much
along the long axis, that it splits off from brim» (`:20-23`) y su desenlace es «I increased
the bed temperature and chamfered the edges of the shape in Fusion, that seemed to make a big
difference» (`:96-97`). El arrugado nunca aparece ahí.

Comprobado en el artículo:

- `:116-118` — la cita literal, el autor (**Elias Spors**), el hilo de 2024, «cinco años y
  otro autor después» y «más perímetros extra, sin efecto», que es lo que dice `:24`.
- `:461-465` — «El primer hilo sí dice que algo persistió; el segundo **no menciona el
  arrugado**, y lo único que reporta es una impresión de mejora». Las dos mitades son
  ciertas: la persistencia está en el hilo de 2024 y la ausencia en el de 2019 es
  comprobable con el `grep` de arriba. **El chaflán ya no recibe el arrugado.**
- `:114-122` y `:450-458` — intactos, con el chaflán en Fusion como programa de CAD y sin
  ninguna afirmación de que resolviera el caso.

`wiki/cooked/warping-pla.md:86-95` respalda el párrafo igual (cita literal en `:88`, «más
perímetros extra, sin efecto» y la inferencia marcada como nuestra en `:92-95`).

### 3 · La tabla ya no dice «desglosa por chapa» — RESUELTO en la celda, no en el artículo

Lo que pedía el cambio está hecho. `:32` dice ahora «Es la segunda tabla, y la única que
**publica** sus valores por chapa», y la fila de al lado (`:33`) sigue diciendo «Tabla de
materiales, sin columna de chapa utilizable». Leídas juntas con `warping-pla:312-317`, las dos
páginas ya dicen lo mismo: Bambu publica una tabla por chapa con valores legibles; Prusa tiene
seis columnas de chapa cuyo contenido no se puede publicar.

Pero **la misma afirmación, en forma de absoluto, sigue en dos frases más del mismo
artículo**, y son la razón de que esto no pase. Ver fallo 1.

### 4 · Las comillas — dos del informe 9 restauradas, una sin tocar

Las tres que el informe 9 señalaba eran `:79`, `:529-530` y `:565`. Estado de cada una,
contrastado con el crudo:

| Dónde | Estado | Comprobación literal |
|---|---|---|
| `:529-531` | **Corregida** | La cita empieza ahora por su condición: «**For a cleaned bed,** the bed in your picture looks dirty. Try to wash it with soap water and wipe it with acetone (once a month)» = `adjusting-settings-warping-pla.md:49-50` literal, con el salto de línea unido. El condicional que faltaba está dentro de la comilla |
| `:565-566` | **Corregida** | «**Hot Water wash: often, as needed, and after any of the above**» = `adjusting-settings-warping-pla.md:114` completo. La parte que encadena el lavado con el alcohol vuelve a estar |
| `:79` | **Sin tocar** | Sigue cerrando donde la fuente sigue. Ver fallo 2 |

De paso, la cuarta cita, que el informe 9 había anotado como localizador confuso, también
está resuelta. `:83-86` cita «PLA is printable **not only on PEI surface, but also on glass,
Kapton tape, or using a glue stick**» (= `temperatura-cama-prusa-kb-pla.md:46`) y añade el
encabezado previo, *«Info for different printer users»*, que también es literal en `:46`. Y el
localizador pasó de «En la misma frase de la ficha del PLA» a «En la misma página», que es lo
que la fuente permite decir: el 60 °C está en la cabecera (`:18`) y la frase de vidrio/Kapton
en la sección de consejos (`:46`). El resto del párrafo (`:86-93`) sigue como lo dejó el
informe 9: el 60 °C es recomendación general y «La página no da ninguna temperatura por
superficie», que es cierto.

## Comprobaciones

### `warping-pla` — APROBADO

| # | Comprobación | Resultado |
|---|---|---|
| 1 | Afirmaciones con respaldo | **PASA** |
| 2 | Contradicciones internas | **PASA** |
| 3 | Relleno y frases de IA | **PASA** — ninguna de las ocho fórmulas canónicas en los tres artículos |
| 4 | Longitud y estructura | **PASA** — recuento **no medido**; un solo `h1`, frontmatter completo, `slug` correcto, `## Qué puede salir mal` con contenido real (`:441`) |
| 5 | Citas correctas | **PASA** — las nueve URLs coinciden con el `url:` de raw y no hay repeticiones; los dos enlaces Markdown internos son las dos imágenes, y los dos ficheros existen |

### `temperatura-cama` — RECHAZADO

| # | Comprobación | Resultado |
|---|---|---|
| 1 | Afirmaciones con respaldo | **PASA** — lo nuevo que se publica está en el crudo |
| 2 | Contradicciones internas | **FALLA** — la exclusividad de Bambu por chapa sigue en dos frases (`temperatura-cama:56`, `:102`) y deja abierta a medias la contradicción entre artículos del `lint-r0` |
| 3 | Relleno y frases de IA | **PASA** — ningún párrafo sin dato en lo tocado |
| 4 | Longitud y estructura | **PASA** — recuento **no medido**; `## Qué puede salir mal` en `:637` |
| 5 | Citas correctas | **FALLA** — 1 cita cerrada justo donde empieza lo que la limita |

## Fallos, con dónde y qué hacer

### 1 · Menor · La exclusividad de Bambu por chapa sigue escrita en dos frases más

**Dónde:** `temperatura-cama:56` y `:102`. También en la `description` del frontmatter (`:3`).

**Qué dicen:**

- `:56` — «Lo que sí hace Bambu, **y ningún otro**, es separar por chapa».
- `:102` — «**Una desglosa por chapa**, otra da una recomendación general, otra da un intervalo
  con margen».
- `:3` — «...y **sólo una** las desglosa por chapa».

**Por qué falla:** `wiki/raw/temperatura-cama-prusa-kb-filament-material-guide.md:33-34` lo
dice en el **cuerpo** de la página, no en las notas:

> The table also has a SHEETS group of six columns and a PHYSICAL FEATURES group of four.
> The SHEETS column headers are: Textured, Smooth PEI, Satin, Special PA Nylon, PP, HT.

Prusa **sí separa por chapa**, con seis columnas. Lo que no puede publicarse es su
**contenido**, porque en el original los valores no caen bajo su cabecera. Son dos cosas
distintas, y el artículo sostiene la segunda en la fila de al lado (`:33`, «sin columna de
chapa utilizable»). El parche arregló la celda y dejó el mismo absoluto dos párrafos más allá,
así que un lector que llegue a `:56` vuelve a leer lo que el informe 9 rejectaba.

Y del lado del hermano: `warping-pla:312-317` dice, correctamente, que la tabla de Prusa
«**sí trae columna de chapa, y son seis**». Dos artículos de la wiki con dos versiones sobre
la misma tabla es lo que este lint vino a cerrar, y sigue abierto por la prosa de
`temperatura-cama`.

**Lo importante, y es lo mismo que pasó con el Gyroid:** estas dos frases **están respaldadas
por el cocinado**, porque el cocinado dice lo mismo —
`wiki/cooked/temperatura-cama.md:551` («el único que separa por chapa») y `:555` («una
desglosa por chapa»). Arreglar sólo el artículo es tapar el síntoma: en la próxima
recocinación el artículo vuelve a traer el absoluto. La corrección tiene que ir en las dos
capas, como la del 25 %.

**Qué hacer:** en `:56` y `:102`, cambiar el absoluto por lo que la fuente sí dice —que
Bambu publica una tabla por chapa **con valores que se pueden leer**— y dejar al lado que la de
Prusa existe pero no es utilizable (que es lo que ya hace `:33`). Lo mismo en la `description`
y en `wiki/cooked/temperatura-cama.md:551` y `:555`. Con eso la contradicción 5 del
`lint-r0-2026-10-04.md` queda cerrada en las dos páginas y en las dos capas.

### 2 · Menor · Una de las tres comillas del informe 9 sigue cerrada donde la fuente sigue

**Dónde:** `temperatura-cama:78-80`, «La tabla que separa por chapa».

**Qué dice:** «La página **no explica por qué**, y añade un matiz que sí está: «The old
Engineering Plates are not recommended for printing PLA». Eso es un dato, no un argumento».

**Por qué falla:** la nota tiene dos mitades y la fuente las da las dos en la misma línea
(`wiki/raw/temperatura-cama-bambu-wiki-filament-guide-material-table.md:116`):

> The old Engineering Plates are not recommended for printing PLA. **All engineering plates
> currently sold are the new version and can be used with glue.**

La cita se cierra justo donde empieza lo que informa al lector con una chapa actual, y sin
puntos suspensivos que lo digan. Quien tenga una Engineering Plate —que es la que la propia
tabla de este artículo da por válida para PLA, con «45 - 65 ℃ Glue Required»— se queda con la
mitad que le dice que su chapa no sirve. La mitad que falta dice lo contrario.

Es el mismo defecto que las otras dos comillas del informe 9, corregidas en este mismo parche
en `:529-531` y `:565-566`. Se corrigieron dos de tres; esta es la que quedó.

**Qué hacer:** o «The old Engineering Plates are not recommended for printing PLA… **and the
ones currently sold are the new version and can be used with glue**», o cortar en
«…are not recommended for printing PLA» y cerrar con puntos suspensivos, matizando entonces el
«no explica por qué». Sin puntos suspensivos, no es publicable.

## Los once defectos de los tres briefs: siguen resueltos, sin regresiones

Comprobados en los puntos que los informes y el lint señalan, contra el crudo.

| Artículo | Defecto | Estado |
|---|---|---|
| warping | La columna de chapa de Prusa «no existe» | **Resuelto** — `:312-317` dice que **sí** trae columna y que son seis, y lo no publicable es el contenido; `:319-322` conserva la conclusión cambiando el motivo |
| warping | El «ciclo completo» de un caso sin medir | **Resuelto** — `grep` de `ciclo completo`: cero |
| warping | El «el ajuste va a otro lado» sin marcar | **Resuelto** — `:88-93` lo marca como criterio del artículo y cita las dos recomendaciones de la tabla |
| warping | Los dos fallos del informe 8 | **Resueltos** — cambios 1 y 2 de este informe |
| temperatura | `first-layer-issues` «no publica ninguna cifra de cama» | **Resuelto** — `:261-266`: «**No da ninguna temperatura recomendada por material ni por chapa**» y el incremento de **+5–10 °C sobre el valor del perfil** |
| temperatura | Las «tres fuentes» del PETG | **Resuelto** — `:196` «entre **las dos fuentes que lo listan**», `:198-200` declara que OrcaSlicer no tiene fila de PETG, `:219-220` «**ninguno de los dos**» |
| temperatura | La banda 60/70 mal ubicada | **Resuelto y con los límites estrictos** — `:436-445`: «entre 60 y 70 °C de cama la página se contradice consigo misma», y a 60 exactos nada |
| temperatura | La inmersión equiparada con la limpieza | **Resuelto** — `:341-346`: Prusa prohíbe **sumerger la chapa**, Bambu manda **limpiar la superficie** |
| temperatura | La cita de OrcaSlicer sin su condición | **Resuelto** — `:480-484`: la condición va **fuera** de la comilla y se explica qué pasa sin ese soporte |
| separaciones | El recuento de artículos con campo | **Resuelto** — `:17-21` lo habla del plan de contenido («seis de los nueve»), no de ficheros existentes: en `src/content/wiki/` hay hoy tres artículos, y lo dice así |
| separaciones | La columna de warping sin procedencia | **Resuelto** — `:95-102` declara de dónde sale cada columna |
| separaciones | «Tres movimientos» y las etiquetas de Naugh | **Resuelto** — `:170` y `:458-461` dicen «cuatro movimientos en tres direcciones» con sus etiquetas; `:142-144` deja las tres etiquetas |

`separaciones-entre-capas` no entraba en el parche y sólo se ha mirado por puntos, en las
líneas que los informes citan.

**Fuentes:** las diez URLs distintas de los dos artículos (nueve de `warping-pla`, seis de
`temperatura-cama`, cuatro compartidas) están en `wiki/raw/` con ese mismo `url:`, y no hay
ninguna repetida dentro de una lista.

**Enlaces:** los únicos Markdown con ruta interna son las dos imágenes de `warping-pla`
(`portada.svg` y `diagrama.svg`), y los dos ficheros existen. Las páginas nombradas que aún no
existen (`adhesion-primera-capa`, `enclosure-y-warping`, `material`, `capas-desplazadas`,
`flow-rate`) van como `[[slug|texto]]` y **no son un fallo**.

## Notas que no bloquean

- **Dos fragmentos del artículo no tienen respaldo en el cocinado, aunque sí en el crudo.**
  «Hot Water wash: often, as needed, and after any of the above» (`:565-566`) y el lead-in
  «Info for different printer users» (`:85`) son literales en `wiki/raw/`
  (`adjusting-settings-warping-pla.md:114` y `prusa-kb-pla.md:46`), pero
  `wiki/cooked/temperatura-cama.md` no los trae: `:344-345` enumera los otros cuatro
  fragmentos del cuarto post y `:378` cita la frase del PLA sin su encabezado. No es una
  invención —el crudo los respalda y por eso no rechazan— pero el cocinado debería llevarlos,
  porque un recocinado que no los vea es justo el camino por el que volverían a caerse.
- **`temperatura-cama:677-680` sigue igual** («**Meter la chapa en agua caliente.** Para la
  misma operación, un fabricante lo escribe y el otro lo prohíbe por escrito»). Es la nota del
  informe 9, no un fallo: Prusa sí prohíbe el agua caliente por escrito para esa operación y el
  artículo declara la distinción dos pantallas antes. El arreglo es de una línea y dejaría la
  sección coherente consigo misma.
- **La descripción del frontmatter de `temperatura-cama` (`:3`)** es el tercer sitio con el
  absoluto del fallo 1. Va en la misma pasada que los otros dos, aunque no lo apuntara el
  informe 9.
- **Notas del informe 8 de `warping-pla`, sin cambios y sin efecto de bloque:** el párrafo sin
  dato «Una cifra de coste» (`:540-541`); la cita del brim (`:371-372`) que apunta a una línea
  que no dice el mecanismo; «el ajuste que Bambu señala como el más importante» (`:206`), que
  quita el *one of the*; y «Bambu da treinta grados para el PLA» (`:306`), que no dice de qué
  fila.
- **Los dos bloques de diagnóstico** (`warping-pla:124` y `:163`) van antes de «Qué cambiar»
  (`:191`). La comprobación 4 pasa igual que en las vueltas anteriores; si `npm run
  verify:wiki` insiste con el orden, esos dos bloques son lo que movería.

## Lo que esta vuelta no ha comprobado

- **No hay `git diff`.** Esta sesión no ha tenido shell, así que «el parche no ha tocado nada
  fuera de esos pasajes» está comprobado **por lectura**: se han vuelto a leer los pasajes
  afectados y sus vecinos, y todo lo que los informes dejaron cerrado sigue escrito como lo
  dejaron. No es lo mismo que un diff, y no se afirma que lo sea.
- **Recuento de palabras: no medido** en los dos artículos. No hay contador ejecutado sobre
  ninguno de los dos ficheros, así que no se publica ninguna cifra. Por inspección ambos
  cuerpos son de varios miles de palabras, muy por encima del mínimo de 800.
- **No se ha ejecutado `npm run verify:wiki`** ni se ha comprobado nada en navegador.
- **No se ha comprobado la disponibilidad HTTP** de ninguna URL. El alcance es el corpus
  guardado en `wiki/raw/`.

## Informes escritos en esta vuelta

- `wiki/reviews/lint-r0-cierre-2026-10-04.md` (este)

No se ha modificado ningún artículo, ningún cocinado, ningún fichero de `wiki/raw/` ni ningún
informe anterior.