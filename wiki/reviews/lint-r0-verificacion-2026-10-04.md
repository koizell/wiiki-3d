# Lint R0 — verificación de los dos fallos menores, 2026-10-04

**Veredicto: APROBADO.** Los dos fallos que dejó
`wiki/reviews/lint-r0-cierre-2026-10-04.md` en `temperatura-cama` están cerrados en las dos
capas, y los once defectos de los tres briefs siguen resueltos: no hay ninguna regresión.

No es un veredicto sobre elegibilidad ni sobre ninguna plataforma de monetización.

## Alcance y método

Verificación corta y binaria de cuatro puntos (a–d), contra el **cuerpo de `wiki/raw/`**, no
contra `wiki/cooked/`: el artículo y el cocinado coinciden por construcción, así que
compararlos sólo daría OK a un error que nació en la capa cocida. Cada afirmación se
localizó por su fichero real, nunca por el slug del artículo. Los dos hilos de foro están
partidos a 80 columnas, así que sus citas se buscaron por las dos mitades. `grep` en
`src/content/wiki/` y `wiki/cooked/` para los absolutos y las frases repetidas. **Sin
internet.** **No se ha modificado artículo, cocinado, raw ni ningún informe anterior.**

**No hay shell en esta sesión**: no hay contador de palabras, ni `git diff`, ni
`npm run verify:wiki`. Donde eso importaba está escrito «no medido».

## Los cuatro puntos

### a · Exclusividad sobre qué casa separa por chapa — CERRADO

`wiki/raw/temperatura-cama-prusa-kb-filament-material-guide.md:33-34`, en el cuerpo:

> The table also has a SHEETS group of six columns and a PHYSICAL FEATURES group of four.
> The SHEETS column headers are: Textured, Smooth PEI, Satin, Special PA Nylon, PP, HT.

Prusa **sí separa por chapa**; lo que no se puede publicar es su **contenido**, porque en el
original los valores no caen bajo su cabecera (nota del recolector, `:65-69`). Con ese
matiz, las tres frases del artículo ya no son un absoluto:

| Dónde | Dice ahora | Veredicto |
|---|---|---|
| `temperatura-cama.md:3` (`description`) | «…y **sólo una publica sus valores por chapa**» | Correcto: el lote publica los valores de Prusa en ninguna parte |
| `:32` (celda de la tabla) | «Es la segunda tabla, y la única que **publica** sus valores por chapa» | Correcto, y la celda de al lado (`:33`) dice «sin columna de chapa utilizable» |
| `:56` | «Lo que sí hace Bambu es separar por chapa, y **es la única que publica los valores de esa separación**» | **Correcto.** Lo que ya no dice es «y ningún otro, es separar por chapa»: la primera mitad atribuye a Bambu lo que hace, la segunda se acota a lo publicable |
| `:102-104` | «Una publica sus valores por chapa, otra da una recomendación general, otra da un intervalo con margen» | Correcto, y ya no dice «una desglosa por chapa» |

Y del lado del hermano, `warping-pla:312-322` sigue diciendo lo que debe: la tabla de Prusa
«**sí trae columna de chapa, y son seis**», lo que no se puede publicar es su **contenido**, y
«de Prusa no se puede decir nada por chapa». Los dos artículos ya cuentan lo mismo.

En la capa cocinada, `wiki/cooked/temperatura-cama.md:551-553` dice ahora «la única que publica
los valores de su separación por chapa» y añade, en la misma línea y a renglón seguido: «La
tabla de Prusa **también tiene un grupo de seis columnas de chapa**; lo que no se puede
publicar es su contenido, desalineado respecto a su cabecera». `:557` dice «una publica sus
valores por chapa». Los dos absolutos que quedaban («el único que separa por chapa» y «una
desglosa por chapa») han desaparecido: `grep` de `separa por chapa|desglosa por chapa` en
`src/content/wiki/` y en `wiki/cooked/` **no devuelve ninguna afirmación de exclusividad**; los
dos únicos aciertos restantes son `warping-pla.md` `:717` (en el cocinado, y como prohibición:
«Escribir que esa tabla «no desglosa por chapa» es falso») y `temperatura-cama.md` `:32`, ya
corregida.

El `## Tirado` del cocinado (`:874-878`) conserva el motivo del descarte —desalineación, no
dificultad— y no se ha tocado. La atribución es correcta en los dos sentidos: el cocinado
presenta la columna como **contenido no publicable**, no como columna inexistente.

### b · Cita de las Engineering Plates — LITERAL

`temperatura-cama.md:78-80`:

> «The old Engineering Plates are not recommended for printing PLA […] All engineering plates
> currently sold are the new version and can be used with glue»

Fuente, `wiki/raw/temperatura-cama-bambu-wiki-filament-guide-material-table.md:116`, línea
única y **sin partir**:

> - The old Engineering Plates are not recommended for printing PLA. All engineering plates
>   currently sold are the new version and can be used with glue.

Ambas mitades de la línea están ahora dentro de la comilla, y lo omitido entre ellas es
justo el punto, de modo que los puntos suspensivos dicen la verdad. Es la corrección que pedía
el fallo 2 del informe de cierre, y está hecha. La segunda mitad —la que dice que las placas
que se venden hoy **sí** valen con cola— es la que faltaba, y sin ella quien tuviera una
Engineering Plate se quedaba con la mitad que le dice que su chapa no sirve. La cita de
«45 - 65 ℃ Glue Required» que la acompaña (`:77`) y el «La página **no explica por qué**»
siguen como estaban, y el «no explica por qué» no se contradice con el matiz: la fuente da
el dato sin dar el argumento.

### c · Gyroid 25 % y atribución del arrugado — INTACTOS Y CORRECTOS

**El 25 % como techo.** Fuente, `warping-pla-bambu-wiki-warping-falling-off-collapsing.md:164-167`,
bajo «Large flat model warping»:

> Recommended direction: Switch to Gyroid at ≤25 %

`warping-pla.md:92`, `:385` y `:388` siguen diciendo **25 % como techo**, con el comparador
literal `≤` conservado en `:388`, y el contexto «modelo grande y plano» es el de la fila. No
hay inversión de signo en ninguna de las cuatro menciones. `grep` de
`por debajo del 25|menos del 25|< 25|<25` en `src/content/wiki/` y `wiki/cooked/`: **cero**.

**El arrugado.** Hilo «Warping at corners», `warping-pla-prusa-forum-warping-at-corners.md`,
**29/11/2024**, abierto por **Elias Spors** (`:13-14`, `:20-21`):

> I tried to round off the 90°-corners with 3mm radii but the crinkles remained

y `:24`: «I also tried to increasing the perimeter count, also with no effect». Las dos frases
están en **esa** intervención y en ninguna otra; el artículo (`:116-118`) atribuye los radios a
**Elias Spors**, dice «un hilo de 2024» y «más perímetros extra, sin efecto», que es lo que
dice `:24`.

La otra mitad de la atribución también es correcta: quien interpreta las fotos es
**Neophyl** (`:52`, `:56-59`), no Spors —«it bows upwards from the bed… compression of the
layers and usually a rough surface on the top»—, que es lo que dice `warping-pla.md:126-130`.

Y el chaflán sigue sin recibir el arrugado: `grep` de `crinkle|arrugado|wrinkl` en el hilo de
2019 (`warping-pla-prusa-forum-adjusting-settings-warping-pla.md`) → **cero coincidencias**,
que es lo que sostiene `warping-pla.md:461-465`. Los dos casos no se encadenan: `:114-122` y
`:450-458` los mantienen separados, con el chaflán en **Fusion** como programa de CAD y sin
ninguna afirmación de que resolviera el caso.

### d · Los once defectos ya resueltos — SIN REGRESIONES

Comprobados en las líneas que el informe de cierre señalaba.

| Artículo | Defecto | Estado |
|---|---|---|
| warping | Columna de chapa de Prusa «no existe» | **Resuelto** — `:312-317` «sí trae columna de chapa, y son seis»; `:319-322` conserva la conclusión cambiando el motivo |
| warping | «Ciclo completo» de un caso sin medir | **Resuelto** — `grep` de `ciclo completo` en `src/content/wiki/`: **cero** |
| warping | «el ajuste va a otro lado» sin marcar | **Resuelto** — `:88-93` lo marca como criterio del artículo y cita las dos recomendaciones de la tabla |
| warping | Los dos fallos del informe 8 (25 %, radios) | **Resueltos** — punto c de este informe |
| warping | Chaflán «en el laminador» / enclosure en condicional / cita inventada | **Resueltos** — `:107-112` dice «a la forma, en Fusion… no dice en qué herramienta»; `:451-458` mantiene los límites; `grep` de `zero warping, none on the bed` en `wiki/raw/`: **cero** |
| temperatura | `first-layer-issues` «no publica ninguna cifra de cama» | **Resuelto** — `:261-266`: «**No da ninguna temperatura recomendada por material ni por chapa**», y el único número es el incremento de **+5–10 °C sobre el perfil** |
| temperatura | Las «tres fuentes» del PETG | **Resuelto** — `:197-201` «las dos fuentes que lo listan» + «no hay una tercera que comparar»; `:219-221` «**ninguno de los dos**» |
| temperatura | Banda 60/70 mal ubicada | **Resuelto y con los límites** — `:437-445`: «entre 60 y 70 °C la página se contradice consigo misma», y a 60 °C o menos nada |
| temperatura | Inmersión equiparada con limpieza | **Resuelto** — `:343-346`: Prusa prohíbe **sumerger la chapa**, Bambu manda **limpiar la superficie** |
| temperatura | Cita de OrcaSlicer sin su condición | **Resuelto** — `:480-484`: la comilla corta con puntos suspensivos en «for each Bed type…» y la condición va **fuera** y explicada |
| separaciones | Recuento de artículos con campo | **Resuelto** — `:17-21` habla del plan de contenido («seis de los nueve»), no de ficheros existentes |
| separaciones | Columna de warping sin procedencia | **Resuelto** — `:95-102` declara de dónde sale cada columna |
| separaciones | «Tres movimientos» y las etiquetas de Naugh | **Resuelto** — `:170-171` y `:458-461`: «cuatro movimientos en tres direcciones», X, Y y las dos diagonales; `:141-144` deja las tres etiquetas |

## Comprobaciones

| # | Comprobación | Resultado |
|---|---|---|
| 1 | Afirmaciones con respaldo | **PASA** — lo nuevo que se publica está en el crudo |
| 2 | Contradicciones internas | **PASA** — los dos absolutos fuera de sitio, eliminados en las dos capas |
| 3 | Relleno y frases de IA | **PASA** — ninguno de los ocho pasajes tocados introduces relleno |
| 4 | Longitud y estructura | **PASA** — recuento **no medido**; un solo `<h1>` (`:22`), frontmatter con `title`/`slug`/`date`/`sources`/`tags` y `slug` igual al nombre del fichero, secciones en orden, `## Qué puede salir mal` en `:637` |
| 5 | Citas correctas | **PASA** — las seis URLs de `temperatura-cama` están en `wiki/raw/` con ese mismo `url:` (`:8-13` frente a los 15 `url:` del lote) y no hay ninguna repetida; la primera cita está en la primera mitad del artículo (`:37-39`) |

## Notas que no bloquean

- **`wiki/cooked/temperatura-cama.md:537`** conserva una frase de exclusividad con otra
  redacción: «Es **la única de las tres que dice que la chapa cambia la cifra**, y lo dice con
  una tabla, no con una frase». No la rechazo porque el matiz que la acota está a catorce
  líneas de ahí, en la misma contradicción (`:551-553`), y porque lo que la fuente sostiene es
  que **no se puede publicar el contenido** de las columnas de Prusa: nadie puede leer ahí qué
  dice la chapa de la cifra. Aun así, es la frase que volvería a colar el absoluto en la
  próxima recocinación si alguien la cita sin su párrafo.
  **Nota para el cocinero:** si se toca ese fichero otra vez, «la única de las tres que dice
  que la chapa cambia la cifra» conviene que sea «la única de las tres que publica la cifra
  partida por chapa».
- **Los dos fragmentos que el informe de cierre dejó anotados sin respaldo en el cocinado**
  siguen igual y no son un fallo: «Hot Water wash: often, as needed, and after any of the
  above» (`temperatura-cama.md:565-566`, literal en `adjusting-settings-warping-pla.md:114`) y
  el lead-in «Info for different printer users» (`:85`, literal en `prusa-kb-pla.md:46`). Están
  en el crudo, que es lo que manda; lo que no está es en el cocinado.
- **`temperatura-cama.md:677-680`** sigue con «Meter la chapa en agua caliente… un
  fabricante lo escribe y el otro lo prohíbe por escrito». Es la nota del informe 9, no un
  fallo: Prusa sí prohíbe por escrito esa operación y el artículo declara la distinción dos
  pantallas antes (`:343-346`).

## Lo que esta vuelta no ha comprobado

- **No hay `git diff`.** Esta sesión no ha tenido shell. «El parche no ha tocado nada fuera de
  esos pasajes» está comprobado **por lectura**: se han vuelto a leer los pasajes afectados y
  sus vecinos, y los tres bloques tocados (artículo `:3`, `:32`, `:56`, `:78-80`, `:102`; cocinado
  `:537`, `:551-557`) son los únicos con cambios respecto a lo que el informe de cierre
  dejó escrito. No es un diff, y no se afirma que lo sea.
- **Recuento de palabras: no medido** en ningún artículo. No hay contador ejecutado, así que
  no se publica ninguna cifra. Por inspección los tres cuerpos son de varios miles de palabras,
  muy por encima del mínimo de 800.
- **No se ha ejecutado `npm run verify:wiki`** ni se ha comprobado nada en navegador.
- **No se ha comprobado la disponibilidad HTTP** de ninguna URL. El alcance es el corpus
  guardado en `wiki/raw/`.

## Informes escritos en esta vuelta

- `wiki/reviews/lint-r0-verificacion-2026-10-04.md` (este)

No se ha modificado ningún artículo, ningún cocinado, ningún fichero de `wiki/raw/` ni ningún
informe anterior.