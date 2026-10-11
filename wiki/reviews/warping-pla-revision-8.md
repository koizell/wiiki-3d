# Revisión de warping-pla — octava vuelta, lint R0 2026-10-04

**Veredicto: RECHAZADO** — 2 fallos, ambos menores, ninguno bloqueante.

Artículo: `src/content/wiki/warping-pla.md` (570 líneas). Cocinado:
`wiki/cooked/warping-pla.md`. Informe que manda: `wiki/reviews/warping-pla-revision-7.md`.
Brief: `wiki/briefs/warping-pla-quirurgico.md`. Historial: revisiones 1 a 6.

**Los tres defectos del brief están resueltos y comprobados contra el cuerpo de las nueve
fuentes crudas**, no contra el cocinado: el artículo y el cocinado coinciden por
construcción, así que compararlos sólo detectaría lo que el redactor se inventó por su
cuenta, no lo que nació en la capa cocida. Las fuentes se localizaron por el `url:` del
frontmatter del artículo y por la lista `fuentes:` del cocinado, **no por el slug del
fichero**: cuatro de las nueve son compartidas con `temperatura-cama` y se han abierto por
su ruta real (`temperatura-cama-prusa-kb-filament-material-guide.md`,
`temperatura-cama-bambu-wiki-filament-guide-material-table.md`,
`temperatura-cama-prusa-kb-pla.md`, `temperatura-cama-orcaslicer-wiki-material-temperatures.md`).
No se ha consultado internet ni se ha modificado artículo, cocinado, raw ni informes
anteriores.

## Comprobaciones

| # | Comprobación | Resultado |
|---|---|---|
| 1 | Afirmaciones con respaldo | FALLA — 2: un límite numérico publicado con la desigualdad cambiada y un síntoma atribuido al hilo que no lo dice |
| 2 | Contradicciones internas | PASA — el 65 °C aparece en cada mención como techo de usuario, `and/or` sigue siendo `and/or`, la columna de Neophyl sigue acotada a sus fotos |
| 3 | Relleno y frases de IA | PASA — ninguna fórmula canónica; un párrafo sin dato, señalado abajo como nota |
| 4 | Longitud y estructura | PASA — recuento **no medido** (ver abajo); un solo H1, frontmatter completo, `slug` correcto, `## Qué puede salir mal` con contenido real |
| 5 | Citas correctas | PASA — las nueve URLs coinciden con el `url:` de raw y no se repiten; todas las citas entrecomilladas se han localizado en el cuerpo de las fuentes, incluidas las de los hilos partidas a 80 columnas, buscadas por mitades |

### Recuento de palabras: no medido

Esta vuelta **no ha tenido shell**, así que no hay contador ejecutado sobre el fichero y
**no se publica ninguna cifra**. El recuento de 5.192 palabras del informe 7 es
histórico y midió una versión anterior del fichero: no es vigente. Por inspección, el
cuerpo visible (líneas 26–570, sin frontmatter) es de varios miles de palabras, muy por
encima del mínimo de 800, y esa comprobación no depende del número exacto. Si hace falta
la cifra, hay que ejecutarla sobre el fichero.

## Fallos, con dónde y qué hacer

### 1 · Menor · Un límite numérico publicado con la desigualdad cambiada: ≤25 % sale como «por debajo del 25 %»

**Dónde:** `:92`, `:385` (título del apartado 5) y `:388`.

**Qué dice:** «Gyroid por debajo del 25 % para el modelo grande y plano», el título «### 5.
Cambia el relleno a Gyroid por debajo del 25 %» y «Bambu lo pone como opción **por debajo
del 25 %** de densidad».

**Por qué falla:** `wiki/raw/warping-pla-bambu-wiki-warping-falling-off-collapsing.md:164-169`
es literal en el cuerpo de la fuente:

> Large flat model warping … Recommended direction: Switch to Gyroid at **≤25 %**

`≤25 %` es «25 % o menos». «Por debajo del 25 %» es `<25 %`, que **excluye el propio 25 %**.
No es una paráfrasis más floja: es una frontera distinta, y en un valor de densidad de
relleno esa frontera es lo que el lector copia al laminador. El artículo conserva elsewhere
el signo y el rango con exactitud (`+5 a +10 °C`, `8 a 10 mm`, `±10 °C`, `and/or`), así que
la desigualdad no es un detalle que este artículo pueda convertir en palabras.

El error **no nació en el artículo**: `wiki/cooked/warping-pla.md:152` dice también «por
debajo del 25 % de densidad», mientras que el mismo fichero reproduce el literal en `:64`
—«Switch to Gyroid at ≤25 %»— y en `:499` («Gyroid ≤25 %»). La corrección tiene que ir en
las dos capas o vuelve por la misma puerta.

**Qué hacer:** escribir «25 % o menos» / «Gyroid al 25 % o por debajo», en los tres sitios y
en `wiki/cooked/warping-pla.md:152`.

### 2 · Menor · Un síntoma del hilo de 2024 se transfiere al hilo de 2019

**Dónde:** `:459-462`, «Qué puede salir mal», entrada «Encadenar dos hilos distintos como si
fueran una comparación».

**Qué dice:** «Los radios de 3 mm que **no quitaron el arrugado** y **el chaflán que sí parece
haberlo quitado** están en conversaciones diferentes».

**Por qué falla:** el «arrugado» es el *crinkle* de Elias Spors
(`wiki/raw/warping-pla-prusa-forum-warping-at-corners.md:20-21`: «I tried to round off the
90°-corners with 3mm radii but the crinkles remained»), y el artículo lo traduce así en
`:116-117`. El hilo de 2019 **no menciona ninguna vez el arrugado**: Zakalawe describe una
pieza que «warps so much along the long axis, that it splits off from brim»
(`warping-pla-prusa-forum-adjusting-settings-warping-pla.md:20-23`) y su desenlace es «I
increased the bed temperature and chamfered the edges of the shape in Fusion, that seemed to
make a big difference» (`:96-97`). Comprobado: `grep` de `crinkle` en el hilo de 2019 da
cero.

Es decir: la frase le quita a un caso un síntoma que nunca teve, en el mismo párrafo que
advierte de no encadenar dos hilos. Es la versión en miniatura del defecto que el informe 6
ya corrigió aquí (radios de 3 mm atribuidos al hilo equivocado), y por eso no se puede
aprobar por buena intención: el resto del artículo sí lo hace bien (`:114-122`, `:450-457`),
pero esta frase conserva el error en la versión comprimida.

**Qué hacer:** separar los dos síntomas. Por ejemplo: «Los radios de 3 mm que no quitaron el
arrugado, en un hilo, y el chaflán que parece haberlo cambiado en otro». Y si se quiere
mantener el remate, que sea sobre «el chaflán que **parece** haberlo cambiado», con el
«parece» del propio *that seemed to*.

## Los tres defectos del brief: resueltos

Comprobados contra el cuerpo de las fuentes, no contra la aprobación anterior.

| # | Brief `warping-pla-quirurgico.md` | Estado en el artículo |
|---|---|---|
| 1 · Bloqueante · «la columna de chapa no existe en ella» | **Resuelto** — `:312-317` dice que la tabla **sí trae columna de chapa, y son seis**, con sus seis nombres, y que lo que no se publica es el **contenido**; `:319-322` conserva la conclusión que el párrafo quería sostener («de Prusa no se puede decir nada por chapa») cambiando el motivo. `temperatura-cama-prusa-kb-filament-material-guide.md:33-34` lo dice en el cuerpo de la página. Y `wiki/cooked/warping-pla.md:207-220` está corregido igual, con la cita literal de las seis cabeceras, así que la próxima vuelta no lo reintroduce |
| 2 · Importante · «el ciclo completo de un warping» | **Resuelto** — las dos menciones ahora son «el hilo de 2019» y «ese mismo hilo de 2019» (`:250`, `:376`). `grep` de `ciclo completo` en el artículo: cero |
| 3 · Menor · «el ajuste va en otro lado» | **Resuelto** — `:88-93` marca el razonamiento como «**criterio nuestro, no como dato de ninguna fuente**», quita la cláusula que mandaba a otro sitio y pone en su lugar las dos citas de la tabla que prescribe cama +5 a +10 °C y Gyroid para ese mismo terreno, con un «no quiere decir que el ajuste vaya a otro lado». Coincide con `wiki/cooked/warping-pla.md:58-68` y `:529-537` |

## Los trece defectos del informe 6: sin regresiones

Revisados uno a uno contra el crudo, porque el brief pide expressly no tocarlos. Ninguno ha
vuelto y ninguno se ha resuelto de otra manera:

| # | Informe 6 | Estado |
|---|---|---|
| 1 | Ranking → prevalencia y diagnóstico | `:30-39` acota a «esos siete filamentos», niega el diagnóstico y nombra el contraejemplo de ABS/ASA/PC |
| 2 | 80 % en otra lista | `:165-177` lo atribuye a *Clean / Bed Levelling / Nozzle* y `:179-184` dice qué **no** está en ella y que el cuarto punto no cuenta |
| 3 | Laminador sin chaflán de arista | `:107-112` y `:454-457`: sólo «a la forma, en Fusion», con negación explícita de que ninguna fuente describa un laminador |
| 4 | «Quema la placa» | `:291-297`: «no hay ninguna que diga que 65 °C en la Cool Plate dañe la chapa», sustituido por `elephant foot` de OrcaSlicer |
| 5 | 65 °C como valor del caso resuelto | `:253-254`, `:346-354` y `:472-476`: techo de un usuario, coincidencia numérica explicada como coincidencia, hilo sin temperatura final |
| 6 | Diferencia entre chapas sin declarar | `:279-288` declara los dos extremos (10 °C bajo, 20 °C alto) y separa el objetivo 55–65 del intervalo 45–65 |
| 7 | Caso de foro como categoría general | `:135-141` titula la columna «El caso de las fotos, según Neophyl»; `:143-151` dice que **no** es la definición de todas las separaciones entre capas |
| 8 | Exclusión del ventilador | `:238-243`: «Prusa **no** dice que la respuesta sea no bajar el ventilador», «un *try* con su remedio, no una exclusión» |
| 9 | «Y/o» → dos obligaciones | `:422-428` conserva el literal con *and/or*, lo marca como recomendación y conserva los dos matices de ambiente |
| 10 | *unlikely* → descarte | `:540-546`: «una opinión de probabilidad… No es un descarte» |
| 11 | Secado → imposibilidad térmica | `:488-494`: sólo el síntoma y «secar y reintentar», y «sobre la temperatura no dice nada en ninguna dirección» |
| 12 | Voladizos y PC-Blend encadenados | `:505-510` (no dice hacia qué lado ni por qué) y `:528-535` (velocidad, aceleración, soportes y colapso son de Bambu; Prusa, de PC-Blend, sólo velocidad) |
| 13 | Párrafo de relleno de `:273` | Retirado. No hay equivalente en ese punto |

Las tres contradicciones del lint previo marcadas para este artículo están cerradas: el 65 °C
es techo de usuario en las tres menciones; puerta **y/o** tapa se conserva como alternativa;
la columna de Neophyl está acotada a su caso de fotos.

## Trazabilidad que sí pasa

Comprobada en el cuerpo de las fuentes, con autor, alcance y modal.

- **Causa y mecanismo:** contracción térmica con los bordes antes que el centro
  (`warping-falling-off-collapsing.md:42-45`), choque térmico (`warping_2011:21-27`),
  contracciones de tiradas largas (Diem, `warping-at-corners.md:35-36`). Los tres autores
  bien asignados.
- **Geometría:** «Sharp angles can be more prone to warping» y el *filleted edge* en eje Z son
  de **Lichtjaeger** (`adjusting-settings-warping-pla.md:80-83`), que es quien los escribió.
- **Chaflán:** «I increased the bed temperature and chamfered the edges of the shape in
  Fusion» es de **Zakalawe** (`:96-97`) y la herramienta es la que dice —Fusion, un programa
  de CAD—, sin cambios. Es la primera de las cuatro fabricaciones históricas y sigue
  cerrada.
- **Radios de 3 mm:** de **Elias Spors**, hilo de 2024, cinco años y otro autor después
  (`warping-at-corners.md:20-21`). Es la segunda de las cuatro y sigue cerrada, salvo por el
  fallo 2 de esta vuelta, que es la versión comprimida del mismo deslizamiento.
- **Cifras de cama:** las seis filas de `:260-272` son literales en su fichero —Bambu 35–65 °C
  por pegamento (`filament-guide-material-table.md:67`), 35–45 ℃ y 45–65 ℃ por chapa (`:97`),
  Prusa 50–60 °C (`filament-material-guide.md:14`), Prusa 60 °C (`pla.md:18`), OrcaSlicer
  50–60 °C (`material-temperatures.md:25`)— y la aritmética del párrafo siguiente (10 °C y
  20 °C; treinta contra diez) cuadra con esas filas.
- **Los dos 25 % de la tabla de ajustes y el 55–65 °C:** «Target 55 – 65 °C on Textured PEI»
  (`:133`) y el literal del Cool Plate frente a Textured PEI (`:71-73`). El artículo separa
  el objetivo del intervalo, como debe.
- **Las dos páginas de Bambu sobre ventilador, separadas:** *40-50 %* como nivel
  (`printed-model-warping.md:60-61`) frente a *Reduce around 20 to 30 %*
  (`warping-falling-off-collapsing.md:174`), con el alcance «this mostly applies on small
  objects or models that have high overhangs» puesto donde la fuente lo pone y con la frase
  «el corpus no resuelve cuál aplicar».
- **Techo por Tg:** la regla de OrcaSlicer es literal (`material-temperatures.md:63`) y la
  afirmación de que el Tg del PLA no está en el corpus es **cierta**: `grep` de `Tg` y
  `glass transition` en las nueve fuentes sólo devuelve la regla y sus notas. La ficha de
  Prusa da punto de fusión (~175 °C), que no es Tg, y el artículo no la confunde.
- **Enclosure y cierre:** Bambu manda cerrar contra corrientes (`warping-falling-off-collapsing.md:196`),
  su tabla manda abrir y/o quitar con cama >45 ℃ (`filament-guide-material-table.md:84-87`),
  Prusa dice que PLA en enclosure «might not be a good idea» (`warping_2011:77-79`) y
  OrcaSlicer avisa de la boquilla taponada y del control a 0 (`material-temperatures.md:81,90`).
- **Enclosure «sin tapa, con espuma»:** la tercera fabricación histórica. `grep` de `espuma`
  y de `sin tapa` en el artículo: cero. El hilo sólo dice «Longer term I will setup an
  enclosure…» (`adjusting-settings-warping-pla.md:31-32`), en futuro y con un *I suspect*, y
  el artículo no lo cuenta como caso. Cerrada.
- **Cita «zero warping, none on the bed»:** la cuarta. `grep` en el artículo: cero, y `grep`
  en `wiki/raw/`: cero.
- **Los cuatro fallos que no son warping de esquinas:** colapso estructural con sus tres
  mecanismos y sus tres ajustes (`:78-95, 156-160`), fila «Nozzle hitting / scraping the
  print» (`:180-186`) y PC-Blend con «Decrease the print speed» (`warping_2011:86-91`) sin
  encadenar el protocolo de Bambu. «Failure Type 3. Structural Collapse» es literal.
- **Fuentes:** las nueve URLs de `sources` coinciden exactamente con el `url:` de los nueve
  ficheros crudos y no hay ninguna repetida. No se ha comprobado disponibilidad HTTP; el
  alcance es el corpus guardado.

## Notas que no bloquean

- **La desalineación de las columnas de Prusa viene de las notas del recolector, no del
  cuerpo de la página.** `:313-315` la presenta como un hecho de la página y entrecomilla
  *«with glue stick»* y *«Cleaned with water»*. Los dos fragmentos están en
  `temperatura-cama-prusa-kb-filament-material-guide.md`, pero **sólo en las notas del
  recolector (`:66-67`)**; el cuerpo de la fuente (`:13-31`) no transcribe esas celdas, y
  `grep` de ambos textos en `wiki/raw/` no devuelve ninguna otra ocurrencia. La conclusión
  del párrafo es correcta y el brief la pedía así, de modo que **no es un fallo**: es una
  afirmación sobre el contenido de la página cuya única traza en el corpus es una nota.
  Quien quiera que sea comprobable por un lector, tiene que decir de dónde sale: «el
  recolector no transcribió esas columnas por desalineación en el original».
- **La cita del brim apunta a una línea que no dice el mecanismo.** `:371-372` atribuye a
  Bambu que el brim «aumenta la superficie en contacto con la cama»; la línea citada
  (`warping-falling-off-collapsing.md:133`) sólo dice «Also add a Brim (8–10 mm wide)». El
  mecanismo está en el corpus, pero en `warping_2011:95` («A brim is a good way how to
  increase the adhesion to the print surface») y en el hilo (`adjusting-settings-warping-pla.md:60-62`).
  La afirmación está respaldada; la cita es imprecisa. Es la nota del informe 7, sin cambios.
- **«El ajuste que Bambu señala como el más importante»** (`:206`) quita el *one of the* de
  «**One of the** most important setting to change» (`printed-model-warping.md:53`). El
  literal va dos líneas después, así que el texto se corrige solo; si se quiere exactitud,
  «uno de los ajustes más importantes». Nota del informe 7, sin cambios.
- **«Bambu da treinta grados para el PLA»** (`:306`) no dice de qué fila. Es la de filamento
  y pegamento (35–65 °C), no la de chapa (45–65 °C) que se está comparando dos líneas antes.
  Conviene nombrarla. Nota del informe 7, sin cambios.
- **«Los dos extremos de la misma fila»** (`:274-277`) aplicado al 35 °C y al 55–65 °C es
  más flojo que lo que la fila dice, porque el 55–65 es un objetivo dentro del 45–65. El
  párrafo siguiente lo aclara bien, así que no es contradicción. Nota del informe 7.
- **El párrafo «Una cifra de coste»** (`:537-538`) es el único del artículo sin ningún dato:
  no lleva temperatura, cantidad, velocidad ni antes y después. No es una afirmación técnica
  falsa ni una frase de IA, pero no está justificando su existencia. Con el cuerpo actual
  sobra; se puede quitar sin tocar nada más. Nota del informe 7, sin cambios.
- **Orden de secciones:** los dos bloques de diagnóstico (`:124`, `:163`) van antes de «Qué
  cambiar» (`:191`). La comprobación 4 pasa igual que en las vueltas 5, 6 y 7 porque existe
  `## Qué puede salir mal` con contenido real y casos de foro concretos, pero si
  `npm run verify:wiki` insiste con el orden, esos dos bloques son lo que movería.
- **Enlaces:** no hay ningún enlace Markdown a una página inexistente. Las dos rutas
  `/wiki/warping-pla/*.svg` son imágenes y los dos ficheros existen. Las cuatro páginas
  nombradas en «Si te interesa» van como `[[slug|texto]]`; `temperatura-cama` y
  `separaciones-entre-capas` existen, y `enclosure-y-warping` y `adhesion-primera-capa` no:
  no es un fallo y el enlace se encenderá solo. El enlace inline al issue 11914 está en el
  cuerpo de `warping-at-corners.md:66-68` y no se presenta como fuente descargada.
- **Promesa de destino, menor:** `:557` ofrece a `temperatura-cama` «**las seis cifras** de la
  tabla». La tabla de apertura de ese artículo tiene **cinco** filas (`:29-35`), aunque
  cubre las seis cifras de la de aquí. La promesa es cierta en el fondo y corta en el número.
- **Frontmatter:** `warpingRisk` y `riskLevel` son efectivamente no opcionales en
  `JevService` (`src/services/types.ts:141,143`), así que la nota del comentario que
  justifica no llevar la sección de dato ausente es correcta. No se ha vuelto a abrir el
  código en esta vuelta: se recoge del informe 7.
- **Frontera con el artículo hermano.** `warping-pla` dice ahora que la tabla de Prusa **sí**
  trae columna de chapa y que lo que no se publica es su contenido; `temperatura-cama:32`
  sigue diciendo que Bambu es «la única de las tres que desglosa por chapa». Las dos páginas
  dicen cosas distintas sobre la misma tabla, que es justo lo que el brief de warping
  prohibía. Está reportado como fallo del hermano en
  `wiki/reviews/temperatura-cama-revision-9.md` y en `wiki/reviews/lint-r0-2026-10-04.md`.

## Para la siguiente vuelta

1. Corregir el signo del límite de Gyroid en `:92`, `:385` y `:388`, **y** en
   `wiki/cooked/warping-pla.md:152`. Es un cambio de cuatro palabras.
2. Separar los dos síntomas en `:459-462`: el arrugado es del hilo de 2024 y el chaflán no
   lo menciona.
3. Las notas de arriba son de una línea y pueden ir en la misma pasada; la de la
   desalineación, si se quiere, es una frase.
4. Raw no se ha tocado y no hace falta tocarlo: los dos fallos se resuelven corrigiendo la
   redacción, no añadiendo fuente.

Este artículo lleva ocho vueltas. Los tres defectos que traía el brief están resueltos y
comprobados; lo que queda son dos frases. Si la novena vuelve a rechazar, el motivo ya no
está en el redactor sino en que `wiki/cooked/` reintroduce el mismo error cada vez que se
recocina, y eso hay que mirarlo antes de pedir otro artículo entero.