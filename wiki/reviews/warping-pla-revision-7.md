# Revisión de warping-pla — séptima vuelta, lint 2026-10-04

**Veredicto: RECHAZADO** — 3 fallos agrupados, 1 bloqueante.

Artículo: `src/content/wiki/warping-pla.md`. Cocinado: `wiki/cooked/warping-pla.md`.
Informes previos: `warping-pla-revision-6.md` (manda como historial) y anteriores. No se ha
reutilizado ninguna aprobación previa como evidencia.

Esta vuelta se ha hecho **contra el cuerpo de las nueve fuentes crudas**, dato a dato, y
**no** contra `wiki/cooked/`. Para cada cifra, cita y nombre propio se ha localizado el
pasaje en el fichero crudo y se ha comprobado alcance, modal y autor. Las notas del
recolector se han distinguido del texto de la fuente. No se ha consultado internet ni se
ha modificado artículo, cooked ni raw.

## Comprobaciones

| # | Comprobación | Resultado |
|---|---|---|
| 1 | Afirmaciones con respaldo | FALLA — 1 afirmación contradicha por el cuerpo de raw y 1 inferencia sin respaldo presentada como conclusión |
| 2 | Contradicciones internas | FALLA — el caso de 2019 se llama dos veces «ciclo completo» y el propio artículo lo declara sin medir tres veces |
| 3 | Relleno y frases de IA | PASA — ninguna frase canónica de IA; un solo párrafo sin dato, señalado abajo como nota |
| 4 | Longitud y estructura | PASA — 5.192 palabras; un H1, frontmatter completo, `slug` correcto |
| 5 | Citas correctas | PASA — las nueve URLs coinciden con `url:` de raw y no se repiten; 40 citas verificadas en el cuerpo de las fuentes, incluidas las que cruzan salto de línea |

Los 13 fallos del informe 6 están **resueltos**, los trece. Eso se detalla más abajo, porque
es el resultado de esta vuelta y porque el fallo que queda es de la clase distinta que
buscaba: no es un residuo de los trece, es una afirmación nueva.

### Recuento de palabras

**5.192 palabras**, con el método que declara el informe 6: secuencias Unicode de
letras/cifras con apóstrofos, guiones ASCII y guiones bajos internos
(`/[\p{L}\p{N}]+(?:[’'_-][\p{L}\p{N}]+)*/gu`), sobre una transcripción del cuerpo visible.
Excluye frontmatter, URLs, marcas Markdown y texto alternativo de las imágenes; incluye
títulos, tablas, etiquetas de enlaces y pie.

Se calculó en tres bloques (líneas 26–157, 159–386 y 388–558: 1.230 + 2.260 + 1.702) y se
contrastó con un tokenizador de espacios sobre una muestra limpia, que coincide.
Dos detalles del método que conviene tener presentes para comparar con otros recuentos: la
raya `–` de «185–235» **no** une tokens (la clase sólo admite el guion ASCII `-`), así que
cuenta como dos, y el símbolo `°` no es letra ni cifra, de modo que «°C» cuenta como `C`.
Está a más de seis veces del mínimo de 800, así que un desvío de transcripción de unas
pocas palabras no afecta a la comprobación.

## Fallos, con dónde y qué hacer

### 1 · Bloqueante · Se afirma que una columna no existe cuando la fuente dice que existe

**Dónde:** línea 308-310, sección «3. Sube la temperatura de cama».

**Qué dice:** «La tabla de Prusa **no desglosa por chapa**: ni el PETG, el ABS ni el PC
vienen separados por chapa, así que la columna de chapa no existe en ella».

**Por qué falla:** `wiki/raw/temperatura-cama-prusa-kb-filament-material-guide.md:33-34`
dice lo contrario, en el cuerpo de la fuente y no en las notas:

> The table also has a SHEETS group of six columns and a PHYSICAL FEATURES group of four.
> The SHEETS column headers are: Textured, Smooth PEI, Satin, Special PA Nylon, PP, HT.

La columna de chapa existe en la página, y con seis columnas. Lo que el corpus **no**
tiene es los valores de esas columnas, y la razón está también en el fichero crudo, en las
notas del recolector (`:65-69`): no se transcribieron «por desalineación en el original»,
no porque la columna no esté. Cooked `warping-pla.md:194-195` dice exactamente lo mismo que
el artículo, así que comparar contra cooked no lo podía ver: es el patrón que motivó esta
vuelta.

Y hay un segundo simétrico: el cooked hermano de la misma tabla lo tiene bien escrito.
`wiki/cooked/temperatura-cama.md:491-493` dice «Su columna de chapas **existe en la página
pero está desaliñada y no se publica**», y el artículo de ese mismo fichero, línea 33,
dice «sin columna de chapa **utilizable**». O sea: dos artículos de la wiki dicen dos cosas
distintas sobre la misma tabla, y la de `warping-pla` es la falsa. Quien vaya a mirar la
página de Prusa encontrará seis columnas de chapa y verá que el artículo afirma lo
contrario.

**Qué hacer:** cambiar el sentido de la frase al que dan las fuentes: la tabla **sí**
tiene columnas de chapa (Textured, Smooth PEI, Satin, Special PA Nylon, PP, HT), y lo que
no se puede publicar es su contenido, porque en el original está desalineado respecto a su
cabecera. Justificar a Prusa por chapa desde esa tabla sigue sin poder hacerse, que es lo
que el párrafo quiere concluir — se puede conservar la conclusión, no el motivo. La
corrección va también en `wiki/cooked/warping-pla.md:194-195`, o el redactor la repetirá.

### 2 · Importante · «Ciclo completo» para un caso que el propio artículo declara sin medir

**Dónde:** línea 246 y línea 364.

**Qué dice:** «En el hilo donde está documentado el **ciclo completo** de un warping…» y
«En el mismo hilo donde está documentado el **ciclo completo** de un warping…».

**Por qué falla:** es el mismo residuo del fallo 5 del informe 6, que pedía mantener en
todas las menciones que el caso cambió dos variables, no publicó temperatura y lo describió
como impresión. Las cifras ya están bien: el 65 °C aparece sólo como techo puesto por un
usuario, en las tres menciones (`:246-250`, `:334-339`, `:460-464`). Lo que sobrevive es el
**nombre del caso**. Y el artículo dice, en su propia sección «Qué puede salir mal», que
«nadie en el hilo midió cuál de las dos hizo el trabajo, no dijo con qué valor de cama
acabó» y que lo único replicable es «la dirección». Un desenlace que no se midió, no se
valoró y no se atribuyó no es un ciclo completo.

Esto es usar un dato marcado como dudoso en cuatro párrafos y como cierto en otros dos.
Un lector que llegue sólo a la línea 246 se lleva la impresión contraria a la que el
artículo sostiene veinte líneas más abajo.

**Qué hacer:** cambiar las dos menciones por una descripción del hilo que no afirme
resolución: «el hilo donde está documentado el antes y el intento de después», «el hilo de
2019», o simplemente «ese hilo». La cautela de las secciones vecinas ya está bien escrita y
no hay que tocar nada más.

### 3 · Menor · Inferencia propia presentada como regla de diagnóstico

**Dónde:** líneas 88-89, sección «Por qué ocurre».

**Qué dice:** «Y eso sirve de diagnóstico: si a tu PLA sólo se le levantan las piezas
grandes, el tamaño ya está haciendo su parte y **el ajuste va en otro lado**».

**Por qué falla:** el dato previo —«This is more common with larger prints»,
`warping-pla-bambu-wiki-warping-falling-off-collapsing.md:43-44`— es real y está bien
usado. La segunda cláusula es una conclusión del redactor, y no sólo no está en ninguna
fuente: apunta en contra de la tabla de Bambu, que da ajustes **precisamente** para ese
caso. `Large flat model warping → Infill pattern + density → Switch to Gyroid at ≤25 %`
(`:162-169`) y `Corners lifting — PLA → Bed temperature → Increase by + 5 to 10 °C`
(`:129-133`). Es decir: si sólo fallan las piezas grandes, los pasos 3 y 5 del artículo son
los que la fuente prescribe.

No es una cifra inventada ni una fuente cambiada, por eso es menor. Pero el artículo marca
como inferencia suya la hipótesis de chaflán y radio (`:116-118`) y da por buena esta otra
sin marcarlo, que es la incoherencia que la hace molesta.

**Qué hacer:** marcarlo como criterio del artículo, no de las fuentes, igual que se hizo
en `:116-118`; o quitar la segunda cláusula y dejar el dato del tamaño. Si se deja el
razonamiento, que no empuje al lector a saltarse el paso 3.

## Los trece fallos del informe 6: resueltos

Comprobados uno a uno contra el crudo, no contra la aprobación anterior.

| # | Informe 6 | Estado en el artículo |
|---|---|---|
| 1 | Ranking → prevalencia y diagnóstico | `:30-39` acota a «esos siete filamentos», niega el diagnóstico automático y nombra el contraejemplo de ABS/ASA/PC. La descripción del frontmatter ya no dice «el problema casi nunca es el filamento» |
| 2 | 80 % en otra lista | `:161-173` lo atribuye a *Clean / Bed Levelling / Nozzle*, y `:175-180` dice qué **no** está en esa lista y que el cuarto punto no cuenta |
| 3 | Laminador sin chaflán de arista | `:103-108` y `:438-445`: sólo «en Fusion», y negativo explícito de que ninguna fuente describa un laminador. `grep` de `laminator`/`slicer step`/`before export` en raw: cero |
| 4 | «Quema la placa» | `:288-290`: «no hay ninguna que diga que 65 °C en la Cool Plate dañe la chapa», y se sustituye por `elephant foot` de OrcaSlicer |
| 5 | 65 °C como valor del caso resuelto | `:249-250`, `:334-339` y `:460-464`: techo de un usuario, no fabricante, no medición, coincidencia numérica con Bambu explicada como coincidencia. Ver también el fallo 2 de este informe |
| 6 | Diferencia entre chapas sin declarar | `:275-284` declara los dos extremos (10 °C bajo, 20 °C alto) y separa el objetivo 55–65 del intervalo 45–65 |
| 7 | Caso de foro como categoría general | La columna se titula «El caso de las fotos, según Neophyl» y `:139-147` dice que **no** es la definición de todas las separaciones entre capas, y que el criterio de base plana no sale del hilo |
| 8 | Exclusión del ventilador | `:234-239`: «Prusa **no** dice que la respuesta sea no bajar el ventilador», «un *try* con su remedio, no una exclusión», y «ninguno de los dos acota su consejo a un tramo de la impresión» |
| 9 | «Y/o» → dos obligaciones | `:404-416` conserva la cita literal con *and/or*, la marca como recomendación y los dos matices de ambiente |
| 10 | *unlikely* → descarte | `:528-534`: «una opinión de probabilidad… No es un descarte» |
| 11 | Secado → imposibilidad térmica | `:476-482`: sólo el síntoma y «secar y reintentar», y «sobre la temperatura no dice nada en ninguna dirección» |
| 12 | Voladizos y PC-Blend encadenados | `:493-498` (no dice hacia qué lado ni por qué) y `:516-523` (velocidad, aceleración, soportes y colapso son de Bambu; Prusa, de PC-Blend, sólo velocidad) |
| 13 | Párrafo de relleno de la línea 273 | Retirado. No hay equivalente |

Las tres contradicciones del lint marcadas para este artículo están resueltas: el 65 °C
aparece como techo de un usuario y no como valor del caso; puerta **y/o** tapa se
conserva como alternativa; la columna de Neophyl está acotada a su caso de fotos. El
problema abierto entre artículos lo resuelve el fallo 1 de este informe, en sentido
inverso al que allí se apuntaba: no es `warping-pla` quien exagera, es quien niega una
columna que existe.

## Trazabilidad que sí pasa

Comprobada en el cuerpo de las fuentes, con autor y alcance.

- **Causa y mecanismo:** contracción térmica, bordes contra centro
  (`warping-falling-off-collapsing.md:42-45`), choque térmico con la boquilla
  (`warping_2011:21-27`), contracciones de tiradas largas (Diem,
  `warping-at-corners.md:35`). Los tres autores bien asignados.
- **Geometría:** «Sharp angles can be more prone to warping» y el *filleted edge* en eje Z
  son de **Lichtjaeger** (`adjusting-settings-warping-pla.md:80-83`), que es quien los
  escribió. Correcto.
- **Chaflán:** «I increased the bed temperature and chamfered the edges of the shape in
  Fusion» es de **Zakalawe**, Topic starter (`:96-97`). La herramienta es la que dice —Fusion,
  un programa de CAD— y no se ha cambiado por ninguna otra. Correcto.
- **Radios de 3 mm:** de **Elias Spors**, hilo de 2024, cinco años y otro autor después
  de 2019 (`warping-at-corners.md:20-21`), y el artículo no los encadena con el chaflán:
  dice dos veces, en `:115` y `:447-450`, que son conversaciones distintas. Es el
  reproche que pedía el informe 6 y está atendido.
- **Cifras de cama:** las seis de la tabla de `:256-268` están todas literales en su
  fichero —Bambu 35-65 °C por pegamento (`filament-guide-material-table.md:67`), 35-45 ℃ y
  45-65 ℃ por chapa (`:97`), Prusa 50-60 °C (`filament-material-guide.md:14`), Prusa 60 °C
  (`pla.md:18`), OrcaSlicer 50-60 °C (`material-temperatures.md:25`). La aritmética del
  párrafo siguiente —10 °C y 20 °C, treinta contra diez— cuadra con esas filas.
- **Las dos páginas de Bambu, separadas:** *40-50 %* (auxiliar a ese nivel,
  `printed-model-warping.md:60-61`) frente a *Reduce around 20 to 30 %*
  (`warping-falling-off-collapsing.md:174`), con el alcance «this mostly applies on small
  objects or models that have high overhangs` (`:64-65`) puesto sobre el segundo, que es
  donde la fuente lo pone, y con la Frase «el corpus no resuelve cuál aplicar».
- **Ventilador de Prusa:** subida con sus dos condiciones (`:54-57`), *may* y no *will*
  (`:63-64`), objetivo «neither too fast nor too slow» (`:64-65`) y *try increasing the
  nozzle temperature* **condicionado a haber subido el ventilador** (`:67-69`), que es como
  lo redacta el artículo. Voladizos a 10-20 % con ABS y PC-Blend como condición
  (`:59-61`). Correcto.
- **Tier 1:** los tres pasos literales (`:108-117`), el cuarto punto *Advanced method*
  (`:119`), y *Quick Fixes* con limpieza, cama y brim (`:16-19`). Correcto.
- **Piezas y chapa:** offset de 0,04 mm al nivelar (`warping-falling-off-collapsing.md:74-76`),
  *Glue Required* en la fila del PLA (`filament-guide-material-table.md:97`), *Target 55 –
  65 °C on Textured PEI* y el literal del Cool Plate vs Textured PEI
  (`warping-falling-off-collapsing.md:71-73, 133`), *and/or* con los dos matices de
  ambiente (`filament-guide-material-table.md:84-87`), *open the front door and top cover*
  (`:196`). Correcto.
- **Prusa ficha del PLA:** los dos 60 °C con distinto sujeto, «Recommended bed temperature»
  y «gets soft and deforms» (`pla.md:18, 23`), y «PLA does not require a heated bed»
  (`:23`). La trampa está explicada, no exploitada.
- **Techo por Tg:** la regla de OrcaSlicer es literal (`material-temperatures.md:63`) y la
  afirmación de que el Tg del PLA no está en el corpus es **cierta**: `grep` de `Tg` y
  `glass transition` en los nueve ficheros sólo devuelve la regla y sus notas. La ficha de
  Prusa da punto de fusión (~175 °C), que no es Tg. El artículo no la confunde.
- **Enclosure y cierre:** Bambu manda cerrar contra corrientes y su tabla manda abrir y/o quitar
  con cama >45 ℃; Prusa dice que PLA en enclosure «might not be a good idea»
  (`warping_2011:77-79`); OrcaSlicer avisa de la boquilla taponada y del control a 0
  (`material-temperatures.md:81, 90`). Las tres, con su alcance.
- **Los cuatro fallos que no son warping de esquinas:** colapso estructural con sus tres
  mecanismos y sus tres ajustes (`warping-falling-off-collapsing.md:78-95, 156-160`), fila
  «Nozzle hitting / scraping the print» (`:180-186`), y PC-Blend con «Decrease the print
  speed» (`warping_2011:86-91`) sin encadenar el protocolo de Bambu. El nombre
  «Failure Type 3. Structural Collapse» es literal.
- **Diem en las tres apariciones:** «very little first-layer corner distortion»,
  «enough top surface effect», «It may well be compounded by other factors» y «It is
  unlikely to be filament or temperature related» (`warping-at-corners.md:88-96`). Autor y
  modal correctos en las tres.
- **Humedad:** síntomas y «Dry the filament before retrying»
  (`warping-falling-off-collapsing.md:204-207`); el artículo no añade nada térmico.
- **Relleno:** ninguna de las frases canónicas de IA. No hay ningún párrafo que afirme un
  resultado, una temperatura o un mecanismo sin llevar su dato.

## Notas que no bloquean

- **La cita del brim apunta a un sitio que no dice el mecanismo.** `:359-360` atribuye a
  Bambu «aumenta la superficie en contacto con la cama»; la línea citada
  (`warping-falling-off-collapsing.md:133`) sólo dice «Also add a Brim (8–10 mm wide)». El
  mecanismo está en el corpus, pero en `warping_2011:95` y en el hilo (`:61-62`). La
  afirmación está respaldada; la cita es imprecisa. Basta con mover el enlace o con quitar
  la segunda mitad.
- **«El ajuste que Bambu señala como el más importante»** (`:202`) quita el *one of* de
  «**One of the** most important setting to change» (`printed-model-warping.md:53`). El
  literal va dos líneas después, así que el texto se corrige solo; si se quiere exactitud,
  «uno de los ajustes más importantes».
- **El título «Apaga el ventilador durante las 3 primeras capas»** (`:200`) llama ventilador
  a lo que en la fuente es la opción «No cooling for the first X layers». El cuerpo lo
  distingue bien (`:209-215`); el título, no.
- **«Bambu da treinta grados para el PLA»** (`:302`) no dice de qué fila. Es la de
  filamento y pegamento (35–65 °C), no la de chapa (45–65 °C) que se está comparando dos
  líneas antes. Conviene nombrarla.
- **«Los dos extremos de la misma fila»** (`:270-273`) aplicado al 35 °C y al 55–65 °C es más
  flojo que lo que la fila dice: el 55–65 no es el intervalo de la fila, es un objetivo
  dentro del 45–65. El párrafo siguiente (`:275-284`) lo aclara bien, así que no es
  contradicción, pero la primera frase se queda corta.
- **El párrafo «Una cifra de coste»** (`:525-526`) es el único del artículo sin ningún dato:
  no lleva temperatura, cantidad, velocidad ni antes y después. No es una afirmación
  técnica falsa y no es una frase de IA, pero no está justificando su existencia. Con 5.192
  palabras sobra; se puede quitar sin tocar nada más.
- **Orden de secciones:** los dos bloques de diagnóstico («comprueba que es warping», «el
  Tier 1») van antes de «Qué cambiar». El esquema pide problema → por qué ocurre → cómo se
  resuelve → qué probar. La comprobación 4 pasa igual que en las vueltas 5 y 6 porque
  existe `## Qué puede salir mal` con contenido real y casos de foro concretos, pero si
  `npm run verify:wiki` insiste con el orden, estos dos bloques son lo que movería.
- **Enlaces:** no hay ningún enlace Markdown a una página inexistente. Las dos rutas
  `/wiki/warping-pla/*.svg` son imágenes y los dos ficheros existen. Las cuatro páginas
  nombradas en «Si te interesa» van como `[[slug|texto]]`; `temperatura-cama` y
  `separaciones-entre-capas` ya existen, y `enclosure-y-warping` y `adhesion-primera-capa`
  no: no es un fallo y el enlace se encenderá solo. El enlace inline al issue 11914 está
  documentado en `warping-at-corners.md:68` y no se presenta como fuente descargada.
- **`sources`:** las nueve URLs coinciden exactamente con el `url:` de los nueve ficheros
  crudos y no hay ninguna repetida. No se ha comprobado disponibilidad HTTP; el alcance es
  el corpus guardado.
- **Frontmatter:** `warpingRisk` y `riskLevel` son efectivamente no opcionales en
  `JevService` (`src/services/types.ts:141,143`), así que la nota del comentario que
  justifica no llevar la sección de dato ausente es correcta.

## Para la siguiente vuelta

1. Corregir el fallo 1 en `src/content/wiki/warping-pla.md:308-310` **y** en
   `wiki/cooked/warping-pla.md:194-195`. Si sólo se arregla el artículo, la vuelta siguiente
   lo reintroduce, porque así es exactamente como entró.
2. Cambiar las dos menciones de «ciclo completo» (`:246`, `:364`) por una descripción del
   hilo que no afirme resolución. Ninguna otra palabra de ese bloque hay que tocarla.
3. Marcar o quitar la inferencia del tamaño (`:88-89`).
4. Las notas de arriba son de una línea cada una y pueden ir en la misma pasada.
5. Raw no se ha tocado y no hace falta tocarlo: los tres fallos se resuelven reduciendo o
   corrigiendo la afirmación, no añadiendo fuente.

Este artículo lleva siete vueltas. Si la octava vuelve a rechazar, el problema ya no está
en el artículo: está en que `wiki/cooked/` se reescribe por encima cada vez que cambia el
criterio, y hay que revisar cómo se genera esa capa antes de pedir otro artículo entero.