# Revisión de temperatura-cama — novena vuelta, lint R0 2026-10-04

**Veredicto: RECHAZADO** — 2 fallos, ambos menores, ninguno bloqueante.

Artículo: `src/content/wiki/temperatura-cama.md` (725 líneas). Cocinado:
`wiki/cooked/temperatura-cama.md`. Informe que manda:
`wiki/reviews/temperatura-cama-revision-8.md`. Brief:
`wiki/briefs/temperatura-cama-quirurgico.md`. Historial: revisiones 1 a 8.

**Los cinco defectos del brief están resueltos y comprobados contra el cuerpo de las seis
fuentes crudas**, no contra el cocinado: cuando el artículo y el cocinado coinciden, comparar
los dos no puede ver un error que nació en el cocinado. Las fuentes se localizaron por el
`url:` del frontmatter del artículo y por la lista `fuentes:` del cocinado, **no por el slug
del fichero**: cuatro de las seis son compartidas con `warping-pla`
(`temperatura-cama-prusa-kb-filament-material-guide.md`,
`temperatura-cama-bambu-wiki-filament-guide-material-table.md`,
`temperatura-cama-prusa-kb-pla.md`, `temperatura-cama-orcaslicer-wiki-material-temperatures.md`)
y una es un hilo de foro de `warping-pla`
(`warping-pla-prusa-forum-adjusting-settings-warping-pla.md`). Se han abierto por su ruta
real. Los hilos de foro están partidos a 80 columnas, así que sus citas se han buscado por
las dos mitades; las otras cinco fuentes tienen el cuerpo en líneas largas y se han leído
enteras. No se ha consultado internet ni se ha modificado artículo, cocinado, raw ni
informes anteriores.

## Comprobaciones

| # | Comprobación | Resultado |
|---|---|---|
| 1 | Afirmaciones con respaldo | FALLA — 1: se afirma que sólo Bambu desglosa por chapa, cuando la fuente dice que Prusa tiene seis columnas de chapa |
| 2 | Contradicciones internas | PASA con una salvedad — las dos mitades de la contradicción 60/70 ya no se contradicen en ningún punto; queda una ambigüedad propagada en «Qué puede salir mal», en nota |
| 3 | Relleno y frases de IA | PASA — ninguna fórmula canónica; ningún párrafo sin dato |
| 4 | Longitud y estructura | PASA — recuento **no medido** (ver abajo); un solo H1, frontmatter con `title`/`slug`/`date`/`sources`/`tags` y `slug` correcto, sección del campo opcional conservada con su título |
| 5 | Citas correctas | FALLA — 3 citas entrecomilladas cerradas sin puntos suspensivos donde la fuente sigue con la parte que las matiza; una de ellas ha perdido los puntos suspensivos desde el informe 8 |

### Recuento de palabras: no medido

Esta vuelta **no ha tenido shell**, así que no hay contador ejecutado sobre el fichero y
**no se publica ninguna cifra**. El 7.301 del informe 8 midió otra versión del fichero: no es
vigente. Por inspección, el cuerpo visible (líneas 22–725) es de varios miles de palabras,
muy por encima del mínimo de 800, y esa comprobación no depende del número exacto.

## Fallos, con dónde y qué hacer

### 1 · Menor · «La única de las tres que desglosa por chapa» es falso contra la fuente, y contradice la fila siguiente de su propia tabla

**Dónde:** `:32`, tercera columna de la segunda fila de la tabla de `:29-35`. La fila
siguiente, `:33`, dice lo correcto.

**Qué dice:** «**Bambu Lab** | 35 – 45 ℃ en Cool Plate | Es la segunda tabla, y **es la
única de las tres que desglosa por chapa**».

**Por qué falla:** `wiki/raw/temperatura-cama-prusa-kb-filament-material-guide.md:33-34` lo
dice en el **cuerpo** de la fuente, no en las notas:

> The table also has a SHEETS group of six columns and a PHYSICAL FEATURES group of four.
> The SHEETS column headers are: Textured, Smooth PEI, Satin, Special PA Nylon, PP, HT.

Prusa **sí desglosa por chapa**, con seis columnas. Lo que no puede hacerse es publicar su
**contenido**, porque en el original los valores no caen bajo su cabecera
(`:65-69`, notas del recolector). Son dos afirmaciones distintas, y el artículo sostiene la
segunda en la fila de al lado —«Tabla de materiales, **sin columna de chapa utilizable**»—,
que es la forma correcta. Las dos celdas contiguas no pueden decir a la vez que Prusa no
desglosa por chapa y que Prusa tiene una columna de chapa.

Y es la misma tabla de la que trata el hermano: `warping-pla:312-317` dice ahora, correctamente,
que la tabla «**sí trae columna de chapa, y son seis**» y que lo que no se publica es su
contenido. Dos artículos de la wiki con dos versiones sobre la misma tabla es exactamente lo
que el brief de warping pedía: «dos artículos no pueden decir cosas distintas sobre la misma
tabla». `wiki/cooked/temperatura-cama.md:537` lo tiene bien y es el modelo a seguir:
«Es **la única de las tres que dice que la chapa cambia la cifra**, y lo dice con una tabla,
no con una frase».

**Qué hacer:** cambiar «desglosa por chapa» por la formulación del cocinado —«la única de las
tres que **publica cifras por chapa**» o «que **dice que la chapa cambia la cifra**»—, con lo
que las dos filas contiguas y los dos artículos dicen lo mismo y la conclusión de `:100-105`
—«cada casa publica con un alcance distinto»— se sostiene sin tocar nada más.

### 2 · Menor · Tres citas entrecomilladas cerradas sin puntos suspensivos donde la fuente sigue con la parte que las limita

**Dónde:** `:79`, `:529-530` y `:565`.

**Qué dicen y qué les falta:**

| Dónde | Lo que el artículo escribe | Lo que sigue en la fuente |
|---|---|---|
| `:79` | «The old Engineering Plates are not recommended for printing PLA» | `filament-guide-material-table.md:116` — «**. All engineering plates currently sold are the new version and can be used with glue**» |
| `:529-530` | «the bed in your picture looks dirty. Try to wash it with soap water and wipe it with acetone (once a month)» | `adjusting-settings-warping-pla.md:49` — «**For a cleaned bed,** the bed in your picture looks dirty…» |
| `:565` | «Hot Water wash: often, as needed» | `adjusting-settings-warping-pla.md:114` — «Hot Water wash: often, as needed**, and after any of the above**» |

**Por qué falla:** las tres son el mismo defecto que el punto 5 del informe 8 —una cita
cerrada justo donde empieza lo que la limita— y las tres las había anotado aquel informe
como notas. Dos cosas cambian respecto de entonces.

La primera, en `:79`: la mitad que falta es la que **resuelve la celda que el párrafo está
discutiendo**. El artículo dice «En la columna de Engineering Plate el PLA viene con la
condición pegada a la cifra: «45 - 65 ℃ Glue Required». La página **no explica por qué**», y
justo después cita media nota cuya otra mitad dice que **las chapas que se venden hoy sí se
pueden usar con pegamento**. Lo que el lector se lleva —«esa página no es para mi chapa»— es
justo lo que la parte omitida desmentía.

La segunda, en `:529-530`: la cita **ha perdido los puntos suspensivos** que el informe 8 le
reconoció («the bed in your picture looks dirty…», con los puntos). Ahora se cierra como
literal completo, y lo que se ha omitido es la condición que la autoriza: Lichtjaeger sólo
llama sucia la cama **si se está limpiando**. El glose del artículo, «lavar la cama porque en
la foto se veía sucia», es la lectura sin condición.

La tercera, `:565`, es la más leve: la cadencia pierde «and after any of the above», que es
justo la parte que encadena el lavado con el alcohol.

**Qué hacer:** las tres comillas, con puntos suspensivos donde empieza lo que falta, y la
condición dicha fuera de la cita. En `:79` basta con «The old Engineering Plates are not
recommended for printing PLA… **and the ones currently sold are the new version and can be
used with glue**», que es lo que permite decir que la nota sí informa al lector con una chapa
actual. O cortar la cita en «…are not recommended for printing PLA» y cerrar con puntos
suspensivos, pero entonces el «no explica por qué» tiene que matizarse. Sin puntos
suspensivos, ninguna de las tres es publicable.

## Los cinco defectos del brief: resueltos

Comprobados contra el cuerpo de las fuentes, dato a dato.

| # | Brief `temperatura-cama-quirurgico.md` | Estado en el artículo |
|---|---|---|
| 1 · Bloqueante · «`first-layer-issues` no publica ninguna cifra de cama en todo el lote» | **Resuelto** — `:261-266` conserva la mitad correcta («**No da ninguna temperatura recomendada por material ni por chapa**») y sustituye la falsa por la que se sostiene: «el único número de cama de `first-layer-issues` es el incremento de **+5–10 °C sobre el valor del perfil**». `first-layer-issues.md:66` publica exactamente ese incremento, y `wiki/cooked/temperatura-cama.md:25-26` está corregido igual |
| 2 · Importante · «las **tres** fuentes» del PETG | **Resuelto** — el título pasa a «tres cifras, y una de ellas es de otro material» (`:194`), el texto dice «entre **las dos fuentes que lo listan**» (`:196`), declara que OrcaSlicer no tiene fila de PETG (`:198-200`) y cierra en «**ninguno de los dos** se parece al otro en los dos extremos» (`:219-220`). Las dos fuentes y sus dos rangos (Bambu 60–80 en `filament-guide-material-table.md:68,102`; Prusa 70–90 en `filament-material-guide.md:15`) y el 110 del PETG HT (`:16`) están donde deben. `wiki/cooked/temperatura-cama.md:650-700` también |
| 3 · Importante · la banda 60/70 mal ubicada | **Resuelto y con los límites estrictos correctos** — `:436-444`: «la prosa ya pide abrir la puerta o quitar la tapa **por encima de 60 °C**, y la tabla todavía no lo marca hasta **70 °C**, así que **entre 60 y 70 °C de cama la página se contradice consigo misma**. A 60 °C o menos ninguna de las dos mitades recomienda nada, y por encima de 70 °C las dos recomiendan lo mismo». Las dos reglas son estrictas en la fuente: `filament-guide-material-table.md:89` («when the heatbed is set above **60** ℃») y `:102` («If bed > **70** ℃, Recommended»), así que a 60 exactos no hay nada y por encima de 70 hay coincidencia. El desacuerdo se publica **sin resolver** y sin llamar conservador a ninguno de los dos. `wiki/cooked/temperatura-cama.md:605-648` también |
| 4 · Menor · «meter la chapa en agua caliente es exactamente lo que Prusa prohíbe» | **Resuelto** — `:341-345`: «Prusa prohíbe por escrito **sumerger la chapa** en agua caliente —«do not submerge the sheet completely in hot water»—, y Bambu manda **limpiar la superficie** con agua caliente. Son dos acciones distintas, y ninguna fuente las equipara». `first-layer-issues.md:31` y `filament-guide-material-table.md:120` lo respaldan tal cual |
| 5 · Menor · la cita de OrcaSlicer sin su condición | **Resuelto** — `:479-483`: la cita cierra con puntos suspensivos en «for each Bed type…», la condición («if Support multi bed types is enabled in printer settings») se dice **fuera** de la cita y se explica qué pasa sin ese soporte. `material-temperatures.md:53` es literal |

## Los doce defectos del informe 7 y los cinco puntos del brief anterior: sin regresiones

Revisados uno a uno contra el crudo, porque el brief pide no tocarlos.

| # | Defecto de la vuelta 7 | Estado |
|---|---|---|
| 1 | El 60 °C de Prusa como valor exclusivo de PEI | Resuelto — `:82-92` lo dice como recomendación general y añade «**La página no da ninguna temperatura por superficie**» |
| 2 | «No quita bien» convertido en «no quita» | Resuelto — `:308-314` conserva «**some** oils» y «**that IPA does not remove**», y `:661-665` conserva el «**well**» del foro como observación del hilo |
| 3 | Químicos: composición y etiquetas | Resuelto — `:364-379`: `brake-cleaner`, «**can also contain**» y «**no dice nada de las etiquetas**» |
| 4 | Torre de purga unida a la pieza | Resuelto — `:401-405` dice que suelta **dos** elementos y niega el corte; `:687-689` lo repite |
| 5 | 70 °C como lectura conservadora | Resuelto — `:442-444` «aquí no te damos ninguno de los dos» y «**ninguna fuente de este lote decide cuál manda**» |
| 6 | `0`, ausencia y panel | Resuelto — `:613-622` y `:691-694`; el único dato interno va marcado como nuestro |
| 7 | Progresión de efectos y cama excluida para capas sueltas | Resuelto — `:705-711` dice que la **cama fría** es una de las causas que OrcaSlicer enumera y manda al otro artículo sin excluir nada |
| 8 | La regla de Orca «produce» los umbrales de Bambu | Resuelto — `:446-453` «**Esa frase no produce ninguna de las cifras de Bambu**» |
| 9 | Superlativo del 130 °C frente al 150 dudoso | Resuelto — `:174-184` acota el 130 a «las filas que **en este artículo se han podido leer con confianza**» y declara el 150 dudoso y fuera de la comparación |
| 10 | PETG HT con «su propia boquilla» | Resuelto — `:209-213` «su propia **temperatura recomendada de boquilla**» |
| 11 | Afirmación de coste | Resuelto — `:701-703` es alcance editorial |
| 12 | Relleno y relación `slicer` | Resuelto — los dos anuncios han desaparecido |

**Los cinco puntos del brief de la vuelta 8 que se exigían siguen cumpliéndose:** el panel no
trata `0` y ausencia igual (`:691-694`); nadie dice que un slicer escriba `0` para no usar cama
(`:620-622`); el único dato interno va marcado como nuestro (`:624-634`); la cama no se
excluye para capas sueltas (`:705-711`); y la discrepancia 60/70 se publica sin convertirse en
recomendación (`:436-444`).

## Trazabilidad que sí pasa

Comprobada en el cuerpo de las fuentes, dato por dato.

| Datos y citas del artículo | Evidencia cruda |
|---|---|
| PLA 35–65, PETG 60–80, ABS/ASA 90–100, TPU 30–45, PC 100–120, PA 90–110, PET-CF/GF 80–100 | `filament-guide-material-table.md:66-74` |
| Tabla por chapa: PLA 35–45 Cool / 45–65 Engineering (con «Glue Required») / 45–65 Smooth / 45–65 Textured; PLA-CF 45–65 ya en Cool; TPU «Not recommended»; PETG 60–80 en las tres | mismo `:96-112` |
| «45 - 65 ℃ Glue Required», «The old Engineering Plates are not recommended for printing PLA», y las dos mitades del umbral de cámara con sus números estrictos | mismo `:97`, `:116`, `:84-87`, `:89-92`, `:102` |
| Esperar a que enfríe, modelo **y** torre de purga | mismo `:78` |
| Limpiar con jabón y **hot water**, prohibido acetona, el `0` del preset de Bambu Studio | mismo `:120`, `:122`, `:115` |
| PLA 50–60, PETG 70–90, PETG HT 110, ABS 95–110, ASA 90–110, PC 100–115, Flex 40–85, y las once filas de la tabla | `filament-material-guide.md:13-31` |
| Las seis cabeceras de chapa que existen en la página | mismo `:33-34` |
| Once materiales de Orca, ausencia de PETG, ±5 °C, cama fría con «or», *elephant foot*, Tg−5–10 | `material-temperatures.md:24-35`, `:56`, `:59`, `:60`, `:63` |
| Doce variables de cama, primera capa y resto, regla de la cámara con su condición, atascamiento con cámara alta, filtración | mismo `:49`, `:53-54`, `:78`, `:81`, `:89-90` |
| IPA 90 %, «some oils and sugars», *Nail polish remover*, no tocar la superficie con las manos, `brake-cleaner` | `first-layer-issues.md:19-37`, `:54` |
| El incremento de +5–10 °C va **sobre el perfil**, no hasta un techo | mismo `:66` |
| PLA no exige cama, 60 °C sin condicionar, Satin/Smooth por adhesión, vidrio y Kapton, se reblandece >60 °C, acetona como pegamento | `pla.md:17-19`, `:23`, `:44-46`, `:54` |
| Antes/después de Zakalawe, las tres respuestas de Lichtjaeger, rutina del cuarto post | `warping-pla-prusa-forum-adjusting-settings-warping-pla.md:20-23`, `:46-52`, `:96-97`, `:106-116` |

Las citas largas en inglés existen y son literales, comprobadas por mitades las del hilo. El
*chamfered* del «después» se cita en inglés y **no** se traduce al laminador: el defecto de
`warping-pla` no se ha reproducido aquí. El «max 65°C» se cita como paréntesis de usuario del
foro y no como techo de Prusa, y `:581-585` separa la cifra —corroborada por el 45–65 de
Bambu— de la palabra «techo» —sólo de un usuario—. Las sumas 60+5=65 y 60+10=70, los cinco
grados del PC de Prusa, los treinta del rango de Bambu frente a los diez del de Prusa y los
45 grados de la ventana de PA están bien calculados.

**Fuentes:** las seis URLs de `sources` tienen exactamente ese `url:` en `wiki/raw/`, sin
duplicados. No hay enlaces Markdown a páginas internas: `adhesion-primera-capa`,
`enclosure-y-warping` y `material` van con sintaxis `[[slug|texto]]`, y `warping-pla` y
`separaciones-entre-capas` existen.

## Notas que no bloquean

- **La corrección del defecto 4 no se propagó a «Qué puede salir mal».** `:677-680` sigue
  diciendo: «**Meter la chapa en agua caliente.** Para la misma operación, un fabricante lo
  escribe y el otro lo prohíbe por escrito, con paréntesis». Leída sin el cuerpo delante, esa
  entrada le atribuye a un fabricante la instrucción de **meter** la chapa en agua caliente,
  que es exactamente lo que el párrafo corregido (`:341-345`) acaba de decir que ninguna
  fuente dice. La ambigüedad viene de que «lo escribe» no tiene sujeto explícito y lo que
  queda es «meter la chapa». No lo cuento como fallo porque Prusa sí prohíbe el agua caliente
  por escrito para esa operación —«warm water (**not hot!**)» es una prohibición literal— y
  porque el artículo declara la distinción dos pantallas antes, así que un lector no puede
  quedarse con la lectura errónea. Se anota porque el arreglo es de una línea y deja la
  sección coherente consigo misma: «Limpiar la chapa con agua **demasiado** caliente».
- **«El laminador puede tener la temperatura ya puesta»** (`:598`) usa la frase de
  PrusaSlicer para explicar por qué el campo puede no aparecer, y `:609-611` admite que
  ninguna fuente explica cómo llega una temperatura a un archivo. El «puede» salva la frase.
  Nota del informe 8, sin cambios.
- **«El nivelado y esa capa de grasa son las dos cosas que el panel no te enseña»**
  (`:313-314`) es una afirmación negativa sobre la aplicación que va más allá del único dato
  interno que admite el brief. Si crece hacia ahí, habrá que documentarla. Nota del informe 8.
- **«En la misma frase de la ficha del PLA»** (`:82-84`) sigue siendo un localizador confuso:
  la frase de vidrio/Kapton está en la sección de consejos (`pla.md:46`), no junto al 60 °C
  (`:18`). Nota del informe 8.
- **«dos consecuencias más que la tabla no enseña»** (`:462`): esas dos consecuencias son
  prosa de OrcaSlicer, no una tabla, y en ese apartado «la tabla» significa la tabla de
  chapas de Bambu. Nota del informe 8.
- **Comprobado además.** `bed_temperature` sólo aparece en las notas del recolector del
  fichero de OrcaSlicer y nunca en el cuerpo de una fuente, y el artículo lo declara así
  (`:625-629`). El `0` de `:620-622` está atribuido al **preset** de Bambu Studio y no al
  G-code, y el artículo dice que ninguna fuente explica qué escribe un laminador.
- **Estructura.** Diecinueve `##` para un artículo de este tamaño es una lista larga, pero
  cada sección lleva datos propios y el orden es el del esquema: cifras, por qué, qué pasa
  fría y caliente, limpieza, cámara, primera capa, cómo se sube, el caso del foro, el campo,
  qué puede salir mal. El título **«Por qué este dato puede no aparecer»** (`:587`) se
  conserva, que es lo que `verify:wiki` comprueba (`scripts/verify/wiki.mjs`); no se ha
  renombrado.
- **Ninguna barra vertical dentro de una celda.** Revisadas las tres tablas del cuerpo
  (`:29-35`, `:65-70`, `:115-122`, `:151-163`): la de `:65-70` tiene dos celdas
  «Smooth / Textured PEI» combinadas, sin tubería, que es la forma correcta de no partir la
  celda.

## Para la siguiente vuelta

1. `:32`: cambiar «desglosa por chapa» por la formulación del cocinado, «la única de las tres
   que **publica cifras por chapa**». Una palabra, y además cierra la contradicción con
   `warping-pla:312-317`.
2. Las tres citas de `:79`, `:529-530` y `:565`: puntos suspensivos donde empieza lo que
   falta, y la condición dicha fuera de las comillas. En `:79` conviene añadir la otra mitad
   de la nota, que es la que deja al lector con una chapa actual.
3. `:677-680`: quitar el «meter» del enunciado del error, para que la sección no desmienta dos
   párrafos más arriba.
4. Las notas de arriba son de una línea y pueden ir en la misma pasada.
5. Raw no se ha tocado y no hace falta tocarlo: los dos fallos se resuelven en la redacción.

Este artículo lleva nueve vueltas. Los cinco defectos del brief están resueltos y
comprobados. Lo que queda son dos puntos de precisión en una tabla y en tres comillas, y si
la décima vuelve a rechazar ya no es el redactor: es que `wiki/cooked/` reintroduce la
formulación de la columna de chapa y hay que mirarlo antes de pedir otro artículo entero.