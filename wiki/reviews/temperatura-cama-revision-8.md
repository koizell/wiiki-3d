# Revisión de temperatura-cama — octava vuelta, fase P0

**Veredicto: RECHAZADO** — 5 fallos agrupados, 1 bloqueante.

Artículo: `src/content/wiki/temperatura-cama.md`. Cocinado: `wiki/cooked/temperatura-cama.md`.
Brief: `wiki/briefs/temperatura-cama-revision.md`. Historial: `wiki/reviews/temperatura-cama-revision-7.md`.

Todo se ha comprobado contra el **cuerpo** de los seis `wiki/raw/temperatura-cama-*.md` y
`warping-pla-prusa-forum-adjusting-settings-warping-pla.md`, no contra el cocinado: el
artículo y el cocinado coinciden por construcción, así que compararlos sólo detects lo que
el redactor se inventó por su cuenta, no lo que nació en la capa cocida. Y es justo en la
capa cocida donde han nacido los dos fallos de fondo de esta vuelta.

El hilo de foro está partido a 80 columnas, así que sus citas se han buscado por las dos
mitades de cada frase. Las otras cinco fuentes tienen el cuerpo en líneas largas y se han
leído enteras. El dato interno sobre el panel (cinco alias, `0` pintado como `0 °C`) se ha
contrastado con el código, **sólo lectura**: `ParserService.ts:474–480` y
`AnalysisPanel.tsx:296–297` dicen exactamente lo que dice el artículo.

## Comprobaciones

| # | Comprobación | Resultado |
|---|---|---|
| 1 | Afirmaciones con respaldo | FALLA — 1 afirmación más fuerte que su fuente: `first-layer-issues` «no publica ninguna cifra de cama» |
| 2 | Contradicciones internas | FALLA — 3: PETG «las tres fuentes», la banda 60/70 de la cámara, y la de `first-layer-issues` |
| 3 | Relleno y frases de IA | PASA — ninguna frase canónica de IA; ningún párrafo sin dato (dos cierres flojos, en notas) |
| 4 | Longitud y estructura | PASA — 7.301 palabras, un H1, frontmatter con `title`/`slug`/`date`/`sources`/`tags` y slug correcto |
| 5 | Citas correctas | FALLA — 1 cita entrecomillada con una condición eliminada sin elipsis (Orca, «for each Bed type») |

**Recuento de palabras.** 7.301, con el método que declara el informe 7: JavaScript sobre
el cuerpo visible, regex `/[\p{L}\p{N}]+(?:[’'_-][\p{L}\p{N}]+)*/gu`, sin frontmatter, sin
URLs y sin marcas Markdown, incluidos títulos, tablas, texto visible de los enlaces y el
pie. Esta vuelta no tenía shell disponible, así que el recuento se ha reproducido sobre
una transcripción del cuerpo en cinco tramos: 1.195 + 1.385 + 1.459 + 1.684 + 1.578 = 7.301.
La diferencia con la vuelta anterior (6.465) es de unas 840 palabras, y ese crecimiento es
todo material denso: filas nuevas de tabla, el recorrido de limpieza y la sección del campo.
No sale relleno del crecimiento.

La primera cita está en la línea 37 de 712, dentro de la primera mitad.

## Fallos, con dónde y qué hacer

### 1 · Bloqueante · Se afirma que una fuente no publica una cifra que sí publica, y el propio artículo la cita doscientos renglones más abajo

**Dónde:** sección «Qué pasa si está demasiado caliente», líneas 257–261.

**Qué dice:** «**No da ninguna temperatura**, ni por material ni por chapa:
`first-layer-issues` no publica ninguna cifra de cama en todo el lote.»

**Por qué falla:** `temperatura-cama-prusa-kb-first-layer-issues.md:66` publica una cifra de
cama, y el artículo la cita textualmente cinco secciones después: «If you are
experimenting with new materials that don't adhere well, you can try to increase the
heatbed temperature by 5-10 °C». La primera mitad de la frase es correcta y está bien
acotada —la página no da temperatura recomendada por material ni por chapa—, pero la
segunda mitad es falsa contra el fichero crudo y además contradice lo que el artículo
atribuye a esa misma página en «Cómo se sube, cuánto y cuándo». Es exactamente la clase de
afirmación que este paso existe para cazar: no es una errata de estilo, es una afirmación
falsa sobre lo que una fuente contiene, y además está en la parte del artículo que sirve
para «completar» la idea de que aquello no es un efecto térmico.

**Qué hacer:** quitar la segunda mitad, o sustituirla por la forma que sí se sostiene:
`first-layer-issues` no publica ninguna temperatura de cama recomendada por material ni
por chapa, y su único número de cama es el incremento de +5–10 °C sobre el valor del
perfil.

### 2 · Importante · El PETG tiene dos rangos, no tres fuentes, y el artículo dice tres

**Dónde:** sección «El PETG: tres cifras…», líneas 196–197 y 215–217.

**Qué dice:** «El PETG es el material donde **las tres fuentes** se separan más —60, 70 y
90—» y, más abajo, «ninguna de **las tres** se parece a **las otras dos** en los dos
extremos».

**Por qué falla:** el artículo dice más arriba, con la fuente a la vista, que
**la tabla de OrcaSlicer no tiene fila de PETG** (líneas 118 y 127–132, con
`orcaslicer-wiki-material-temperatures.md:24–35`, donde no aparece PETG). Para el PETG hay
**dos** rangos: Bambu 60–80 (`:68`, `:102`) y Prusa 70–90 (`prusa-kb-filament-material-guide.md:15`).
La tercera cifra que se invoca, el 110, es la del PETG HT, y el mismo artículo acaba de
decir que es **otro material**. Una frase que compara «las tres» con «las otras dos» sólo
funciona con tres, así que la segunda frase no tiene a qué referirse. Viene de la
contradicción 5 del cocinado (`cooked:614–617`), que dice lo mismo, y por eso hay que
corregir las dos capas: comparar contra el cocinado no lo habría visto.

**Qué hacer:** escribir que para el PETG hay **dos** rangos que se solapan sólo en 70–80, y
que la tercera cifra —110— es de otra variante de la misma tabla. Si se quiere mantener la
idea de «el material donde las fuentes se separan más», hay que sostenerla con las dos que
lo listan, sin contar una tercera que no lo lista.

### 3 · Importante · La contradicción 60/70 se publica sin resolver, pero se ubica mal

**Dónde:** sección «La cama también calienta la cámara», líneas 429–435.

**Qué dice:** «**hasta 60 °C** de cama las dos mitades de la página no se contradicen;
**por encima de 60**, la página se contradice consigo misma.»

**Por qué falla:** las dos mitades son la prosa («when the heatbed is set above **60 ℃**:
We recommend opening the front door and/or removing the upper glass cover plate») y la
última columna de la tabla de chapas («If bed > **70** ℃, Recommended»), en
`bambu-wiki-filament-guide-material-table.md:89` y `:102`. Con esas dos reglas, por encima
de 70 °C **las dos mitades recomiendan lo mismo**: ahí no hay contradicción. La banda en la
que la página se contradice consigo misma es la de **60 a 70 °C** (a 60 o menos ninguna
recomienda; a más de 70 las dos recomiendan). La frase que se publica extiende el
desacuerdo a una zona donde la página es coherente, y es justo la frase que el cocinado
proponía usar como criterio editorial con su alcance (`cooked:579–580`): copiada tal cual,
el alcance no es el de la fuente.

Lo bueno: el artículo **no resuelve** la discrepancia, no da un número para decidir con
PETG y no llama conservador a ninguno de los dos. El brief y la contradicción 4 se
respetan en lo esencial. Lo que falla es dónde está el desacuerdo, que es la mitad
técnica de la frase.

**Qué hacer:** decir que las dos mitades discrepan **entre 60 y 70 °C** de cama, y que por
encima de 70 las dos recomiendan lo mismo. Sigue sin resolverse cuál de las dos formas
manda, que es lo que el brief pedía.

### 4 · Menor · Se atribuye a Bambu una acción que su página no manda, y la acción es la que Prusa prohíbe

**Dónde:** sección «Limpieza», líneas 336–338.

**Qué dice:** «…y que **meter la chapa en agua caliente por seguir a Bambu** es
exactamente lo que Prusa prohíbe por escrito.»

**Por qué falla:** lo que Prusa prohíbe por escrito es una cosa concreta —«**do not
submerge the sheet completely in hot water**», `first-layer-issues.md:31`—, immersión. Y lo
que Bambu escribe es «Regularly clean the plate surface with dish soap and **hot water**»
(`bambu-wiki-filament-guide-material-table.md:120`), limpiar la superficie. Seguir a Bambu
no lleva a sumergir la chapa. Y el artículo lo sabe: dos párrafos más abajo escribe que «lo
único que dice su página es que se limpie con jabón y agua caliente» y que el agua caliente
entra «como la lectura de un fabricante». El remate va más lejos de lo que sostiene, y cae
en la parte del artículo que más cuidado pone en no alargar el alcance de ninguna de las
dos fuentes.

**Qué hacer:** decir que Prusa prohíbe por escrito sumergir la chapa en agua caliente, y
que Bambu manda limpiar la superficie con agua caliente; son dos acciones distintas y
ninguna fuente las equipara.

### 5 · Menor · Cita entrecomillada a la que se le quita la condición, sin elipsis

**Dónde:** sección «La primera capa tiene su propia temperatura», líneas 469–471.

**Qué dice:** «la instrucción es: «Set the bed temperature for the selected material for
**First Layer and Other Layers** for each Bed type»».

**Por qué falla:** en `orcaslicer-wiki-material-temperatures.md:53` la frase sigue:
«…for each Bed type **if Support multi bed types is enabled in printer settings**». La cita
se cierra sin puntos suspensivos justo donde estaba la condición, y el artículo presenta
esa instrucción como lo que dice la página, sin la condición que la limita. El artículo
mide el resto de sus citas con una regla —modal, alcance, condición— y aquí es el único
sitio donde se salta una de las tres. Se llega a ver porque la mitad de la línea es
literal: el texto está, la condición no.

**Qué hacer:** añadir la condición a la cita, o cortarla con puntos suspensivos donde
empieza y decir que la instrucción va condicionada a que esté activo el soporte de varios
tipos de cama.

## Los doce defectos del informe 7, estado

| # | Defecto de la vuelta 7 | Estado en el artículo |
|---|---|---|
| 1 | El 60 °C de Prusa como valor exclusivo de PEI | **Resuelto** — `:85–92` lo dice como recomendación general sin condicionar superficie |
| 2 | «No quita bien» convertido en «no quita» | **Resuelto** — `:306–309`, `:555–562` y `:649–652` conservan «algunos» y «bien» |
| 3 | Químicos: composición y etiquetas | **Resuelto** — `brake-cleaner`, «can also contain», nada de etiquetas (`:357–372`, `:659–662`) |
| 4 | Torre de purga unida a la pieza | **Resuelto** — `:394–398` y `:674–676` dicen dos elementos que liberar y niegan el corte |
| 5 | 70 °C como lectura conservadora | **Parcial** — ya no se elige ni se llama prudente, pero el alcance queda mal descrito (fallo 3) |
| 6 | `0`, ausencia y panel | **Resuelto** — `:600–621` y `:678–681`; coincide con el código |
| 7 | Progresión de efectos y cama excluida para capas sueltas | **Resuelto** — `:230–234` enumera con «o»; `:692–698` manda al diagnóstico sin excluir la cama |
| 8 | La regla de Orca «produce» los umbrales de Bambu | **Resuelto** — `:437–444` y `:454–458` |
| 9 | Superlativo del 130 °C frente al 150 dudoso | **Resuelto** — `:174–184`, acotado y con el 150 marcado |
| 10 | PETG HT con «su propia boquilla» | **Resuelto** — `:206–213`, «su propia temperatura recomendada de boquilla» |
| 11 | Afirmación de coste | **Resuelto** — `:688–690` es sólo alcance editorial |
| 12 | Relleno y relación `slicer` | **Resuelto** — los dos anuncios han desaparecido y el cocinado descarta la relación |

**Los cinco puntos que el brief fija y que sí se cumplen:** el panel no trata `0` y
ausencia igual (`:618–621`); nadie dice que un slicer escriba `0` para no usar cama
(`:607–609`); el único dato interno es el que el brief admite, y marcado como nuestro
(`:611–621`); la cama no se excluye para capas sueltas (`:692–698`); y la discrepancia
60/70 se publica sin convertirse en recomendación (`:429–435`, con el fallo 3 sobre dónde
está el desacuerdo). El coste es sólo alcance editorial. El artículo tampoco da a un
fabricante el «techo» de 65 °C: lo separa en cifra corroborada y palabra «techo»
(`:568–572`).

## Trazabilidad que sí pasa

Comprobado en el cuerpo de las fuentes, dato por dato:

| Datos y citas del artículo | Evidencia cruda |
|---|---|
| PLA/PLA-CF 35–65, PETG 60–80, ABS/ASA 90–100, TPU 30–45, PC 100–120, PA 90–110 | `bambu-wiki-filament-guide-material-table.md:66–74` |
| Tabla por chapa: PLA 35–45 Cool / 45–65 otras, PLA-CF, TPU «Not recommended», PETG | mismo `:96–112` |
| «45 - 65 ℃ Glue Required», «The old Engineering Plates…», PETG 60 en prosa y 70 en tabla | mismo `:97`, `:116`, `:89`, `:102` |
| Esperar a que enfríe, flexionar, modelo **y** torre de purga | mismo `:78` |
| Limpiar con jabón y **hot water**, prohibido acetona, el `0` del preset de Bambu Studio | mismo `:120`, `:122`, `:115` |
| PLA 50–60, PETG 70–90, PETG HT 110, ABS 95–110, ASA 90–110, PC 100–115, Flex 40–85 | `prusa-kb-filament-material-guide.md:14–30` |
| Once filas de Orca, ausencia de PETG, ±5 °C, cama fría con «or», *elephant foot*, Tg−5–10 | `orcaslicer-wiki-material-temperatures.md:24–35`, `:56`, `:59`, `:60`, `:63` |
| Doce variables de cama, primera capa y resto, regla de la cámara, atascamiento con cámara alta, filtración | mismo `:49`, `:53–54`, `:78`, `:81`, `:89–90` |
| IPA 90 %, jabón tibio con sus tres contraindicaciones, acetona y sus límites, quitamanchas y `brake-cleaner`, espátula y PEI que se rompe | `prusa-kb-first-layer-issues.md:19–37`, `:54` |
| Incremento +5–10 °C, PrusaSlicer configura solo, no tocar la superficie con las manos | mismo `:19`, `:66` |
| PLA no exige cama, 60 °C sin condicionar, Satin/Smooth por adhesión, vidrio y Kapton, se reblandece >60 °C, acetona como pegamento | `prusa-kb-pla.md:18–19`, `:23`, `:46`, `:54` |
| Antes/después de Zakalawe, las tres respuestas de Lichtjaeger, rutina del cuarto post | `warping-pla-prusa-forum-adjusting-settings-warping-pla.md:20–23`, `:46–52`, `:96–97`, `:106–116` |

Las citas largas en inglés existen y son literales, comprobadas por mitades las del hilo
(antes `:20–23`, brim `:46–47`, limpieza `:49–50`, Fusion `:96–97`, velocidad `:33–34`,
raft `:36–37`, lavado `:106–107`, aceites `:111–112`). El chamfered del «después» se cita
en inglés y **no** se traduce al laminador: el fallo de `warping-pla` no se ha reproducido.
El «max 65°C» se cita como paréntesis de usuario del foro y no como techo de Prusa. Las
sumas 60+5=65 y 60+10=70, los cinco grados del PC de Prusa, los diez por los dos extremos
del PETG y los 45 grados de la ventana de PA están bien calculados.

Las seis URLs de `sources` tienen exactamente ese `url:` en `wiki/raw/`, sin duplicados.
No hay enlaces Markdown a páginas internas: las tres páginas pendientes —`adhesion-primera-capa`,
`enclosure-y-warping`, `material`— van con sintaxis `[[slug|texto]]`, y con
`separaciones-entre-capas` y `warping-pla` existen. La lista «Si te interesa» cubre las
cuatro relaciones que el cocinado deja vivas.

## Notas que no bloquean

- **Tres citas recortadas sin puntos suspensivos.** «the bed in your picture looks dirty…»
  (deja fuera «For a cleaned bed,») y «Hot Water wash: often, as needed» (deja fuera «, and
  after any of the above»), del cuarto post; y «The old Engineering Plates are not
  recommended for printing PLA», que corta la frase justo antes de «All engineering plates
  currently sold are the new version and can be used with glue» —que es la parte que
  resolvería la duda del «Glue Required». Ninguna de las tres cambia lo que el artículo
  afirma, pero las tres son sitios donde el alcance de la fuente es justo lo que se está
  defendiendo.
- **«En la misma frase de la ficha del PLA»** (`:82–84`) es un localizador confuso: la frase
  de vidrio/Kapton está en la sección de consejos (`prusa-kb-pla.md:46`), no en la misma
  frase que el 60 °C (`:18`).
- **«dos consecuencias más que la tabla no enseña»** (`:453`): esas dos consecuencias son
  prosa de OrcaSlicer, no una tabla, y en ese mismo apartado «la tabla» significa la tabla
  de chapas de Bambu.
- **«El nivelado y esa capa de grasa son las dos cosas que el panel no te enseña»**
  (`:308–309`) es una afirmación negativa sobre la aplicación que va más allá del único dato
  interno que admite el brief. Si crece hacia ahí, habrá que documentarla.
- **«El laminador puede tener la temperatura ya puesta»** (`:585`) usa la frase de
  PrusaSlicer para explicar por qué el campo puede no aparecer, y dos párrafos más abajo el
  artículo admite que ninguna fuente explica cómo llega una temperatura a un archivo. El
  «puede» salva la frase, pero conviene que no se convierta en mecanismo.
- **Comprobado además.** `bed_temperature` sólo aparece en las notas del recolector del
  fichero de OrcaSlicer, nunca en el cuerpo de una fuente, y el artículo lo declara así
  (`:611–616`). El dato interno de los cinco alias y del `0` pintado como `0 °C` coincide
  con `ParserService.ts:474–480` y `AnalysisPanel.tsx:296–297`.
- Nineteve `##` para un artículo de 7.301 palabras es una lista larga, pero cada sección
  lleva datos propios y el orden es el del esquema: cifras, por qué, qué pasa fría y
  caliente, limpieza, cámara, cómo se sube, el caso del foro, el campo, qué puede salir mal.

## Si se vuelve a escribir

Cinco pasajes, ninguno de ellos una reescritura: `:257–261`, `:196–197` y `:215–217`,
`:429–435`, `:336–338`, `:469–471`. Los dos de fondo —`:257–261` y `:196–217`— nacen en
`wiki/cooked/temperatura-cama.md`, así que corregir sólo el artículo los deja volver por la
misma puerta en la siguiente vuelta.
