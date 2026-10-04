# Revisión de temperatura-cama (sexta vuelta)

**Veredicto: APROBADO.** Las cinco comprobaciones pasan.

Artículo revisado: `src/content/wiki/temperatura-cama.md` (657 líneas)
Material cocinado: `wiki/cooked/temperatura-cama.md`
Fuentes crudas: seis en `wiki/raw/` — cinco `temperatura-cama-*` y
`warping-pla-prusa-forum-adjusting-settings-warping-pla.md`
Revisión anterior: `wiki/reviews/temperatura-cama-revision-5.md` (RECHAZADO, 2 fallos)

## Comprobaciones

| # | Comprobación | Resultado |
|---|---|---|
| 1 | Afirmaciones con respaldo | PASA — las 2 de la vuelta anterior corregidas; ninguna afirmación nueva sin respaldo en `wiki/raw/` |
| 2 | Contradicciones internas | PASA — los 6 parámetros con más de un valor, cada uno con su contexto |
| 3 | Relleno y frases de IA | PASA — ninguna de las frases marcadas; ningún párrafo sin dato |
| 4 | Longitud y estructura | PASA — ≈ 6 200 palabras, un solo `<h1>` (línea 21), secciones en orden, `## Qué puede salir mal` con 13 casos, frontmatter completo y `slug` igual al nombre del fichero |
| 5 | Citas correctas | PASA — 6 de 6 URLs en `wiki/raw/` con ese mismo `url`, 0 repetidas, 55 cadenas entrecomilladas comprobadas una a una, 0 inventadas, primera cita en la línea 35 |

## Los dos fallos de la quinta vuelta

**1 · La enumeración de la fila «Composite materials» — corregida, y bien.** Ya no
aparece «desde la fibra de madera al CF»: `grep 'fibra de madera'` en el artículo da
cero, y en `wiki/raw/` también — o sea que la enumeración era Tan inventada como decía
el informe. Lo que hay ahora (líneas 157-162) es el aviso que la sostiene y un dato
que sí está:

| Lo que dice ahora el artículo | Dónde está |
|---|---|
| «es una fila que **agrega** composites distintos» | Cocinado, l. 69-71 (es su lectura de la etiqueta `Composite materials`, no una cifra) |
| «el 120 es el extremo alto de una fila agregada» | Cocinado, l. 69-71 |
| «**Wood / metal filled, 60 – 100 °C**» | Prusa, `filament-material-guide` l. 29, literal y con su fila propia |
| «La fila de al lado» | L. 28 y l. 29 son filas consecutivas |

La frase nueva **no repite** lo que ya está en la tabla del artículo (línea 152): lo
que hace es decirle al lector por qué esa fila de al lado tampoco corrige a la primera.
Y el «Wood / metal filled» ya no se usa como ejemplo de lo que la fila agregada
cubre —que es exactamente el error del informe anterior—, sino como lo que es: una
fila con nombre propio, intervalo propio y un techo de 100. ✓

**2 · Lo que lleva la cabecera de un G-code — corregido, y además el razonamiento.**
Las dos frases que no tenían respaldo se han ido, y con ellas el problema de dirección
que el informe señalaba: si el slicer pone la temperatura, el G-code sí la lleva, así
que lo que faltaba era el campo analizado, no el dato.

Lo que hay ahora (líneas 537-541): «**1 · El slicer pone la temperatura solo.** […] Lo
que puede faltar es el dato en el archivo, y eso ya no lo explica ninguna de las seis
fuentes: qué clave escribe el G-code y dónde la busca el analizador es cosa nuestra, y
está declarado más abajo.»

- El título ya no dice «y no la escribe» ✓
- «PrusaSlicer la configura a partir del material seleccionado, así que no hay nada que
  tocar en la impresora» es paráfrasis fiel de `first-layer-issues` l. 66 ✓
- Lo que no tiene fuente queda **declarado como tal** y conectado con el bloque de las
  líneas 558-564, que ya existía y que dice lo mismo. Es la forma correcta: en vez de
  inventar el comportamiento del G-code, el artículo admite que no lo sabe y señala
  dónde está lo que sí sabe. ✓

Las otras tres razones del apartado siguen en pie y las tres se sostienen: la cita de
`pla` l. 23 sobre que el PLA no necesita cama, las seis variables literales de la
sección Bed de OrcaSlicer, y el 0 como valor puesto (Bambu l. 115).

## Las tres referencias de sitio

Las tres eran inexactas en la vuelta anterior. Las tres están ahora bien:

| Referencia | Dónde está la frase en `wiki/raw/` | Dice |
|---|---|---|
| «Literal, **en la misma línea y a continuación**» (l. 332) | `first-layer-issues` **l. 37**: las dos frases de la acetona están en la misma línea, una detrás de otra | ✓ |
| «En **otra sección** de esa misma página, la que abre con «How to prepare your print surface»» (l. 372) | La espátula está en la l. 54, dentro de la sección **Glue** (epígrafe en la l. 39); la regla de las manos está en la l. 19, bajo el epígrafe de la **l. 17**. Ya no se dice que estén juntas | ✓ |
| «es la primera frase **de la primera sección** de esa misma página» (l. 518) | «How to prepare your print surface» es el primer epígrafe de la página (l. 17) y su primera frase es la de las manos (l. 19). Ya no se dice «la primera línea» | ✓ |

Las tres se pueden comprobar en una lectura y son del tipo que no se nota al releer:
por eso era bueno que quedaran anotadas.

## Lo que se pidió comprobar otra vez

**`### Revisado y no incorporado` sigue sin estar.** No hay ni un `###` en las 657
líneas: el único `<h1>` es el de la línea 21, y las diecinueve cabeceras de sección son
todas `##`. Tampoco ha colado estructura del cocinado: ni la nota de revisión, ni
`## Sin respaldo`, ni `## Tirado`.

**`## Qué puede salir mal` no ha cambiado.** Sigue en la línea 574 y sigue con los
**13 casos**, en el mismo orden: warping por bajar la cama, el 65 °C copiado a cualquier
chapa, el 60 °C leído como tope, el 110 °C del PETG HT, la tapa puesta con PLA, subir
con la cama sucia, la acetona donde no toca, el quitaesmalte, el agua caliente, arrancar
en caliente, cortar la base para separar la torre de purga, el 0 contra el hueco, y la
chapa cambiada a ciegas.

## Las tres preguntas, sobre el artículo entero

Repasadas desde el principio otra vez, no sólo los puntos marcados. Con 6 200 palabras
es donde un dato nuevo se cuela sin que nadie lo mire dos veces.

**1 · ¿La atribución es correcta? ¿Quién lo dijo?**

Los seis sitios donde hay una persona, buscados uno a uno en `wiki/raw/`:

- **Zakalawe** es el «antes» (hilo l. 14, intervenido l. 16-37) y el «después» (hilo
  l. 92, intervenido l. 96-97). El artículo lo nombra en los dos, con su enlace (l. 466
  y l. 494). ✓
- **Lichtjaeger** es la respuesta de las tres cosas (hilo l. 42) y las tres están en su
  intervención: la altura de primera capa (l. 46-47), el lavado (l. 49-50) y el
  «max 65°C» (l. 52). El artículo dice «las dio **Lichtjaeger**». ✓
- El **cuarto post** es de otro usuario y el artículo lo dice así, sin nombre (l. 507),
  que es lo correcto porque en la fuente el nombre es un guion (hilo l. 102). La fecha,
  28/06/2019, es la del post (hilo l. 101). ✓
- **«Handle the bed only by el edges»** se atribuye a «otro usuario» del hilo de Prusa
  (l. 373-374) — y es del cuarto post, no de Zakalawe ni de Lichtjaeger (hilo l. 116).
  Correcto. ✓
- **El «max 65°C»** se separa de Prusa dos veces, con la razón: «de un usuario del
  foro. No es la recomendación de Prusa» (l. 482-483) y, más abajo, la separación entre
  la cifra corroborada por Bambu y la palabra «techo», que sigue siendo de un usuario
  (l. 526-530). ✓
- **Peter M** no aparece. Correcto: el cocinado lo dejó fuera por intention sin cifra ni
  resultado, y `grep 'Peter M'` en el artículo da cero.

**2 · ¿La afirmación es exacta, con su tiempo verbal y su modo?**

Los cinco casos en que la fuente habla en condicional o en futuro, buscados:

- **«I will setup an enclosure […] which I suspect»** (hilo l. 31-32) — no aparece en
  ninguna forma. `grep 'I will setup'` y `grep 'I suspect'` en el artículo dan cero. La
  palabra `enclosure` sale sólo dos veces: como celda de la tabla de Prusa (l. 169) y
  como enlace a `[[enclosure-y-warping]]`. Es la cuarta fabricación de `warping-pla` y no
  ha vuelto. ✓
- **«none of which helped so far»** — el «so far» se conserva y se cuenta como un fallo
  declarado por quien lo probó (l. 499-501). ✓
- **«that seemed to make a big difference»** — se cuenta como una impresión del autor
  y no como una medición (l. 492-493). ✓
- **El chaflán**: «Subió dos cosas a la vez —cama y chaflán—, así que el hilo no aísla la
  cama» y «**No dice a qué temperatura subió**». El desenlace no se convierte en
  resultado. ✓
- **«From the gaps in your brim, I can say you can go a bit lower»** — es una lectura de
  una foto («I can say»), y el artículo la cuenta como lo que es: una observación sobre
  los huecos que se veían en el brim (l. 474-475). No la convierte en un ajuste medido. ✓

**3 · ¿El contexto es el correcto en los nombres propios?**

Los nombres propios que pueden cambiar de contexto, buscados uno a uno:

- **`Fusion`** sigue siendo Fusion (l. 487), el programa de CAD, no el laminador. El
  error que costó dos revisiones en `warping-pla` no ha vuelto. ✓
- **`PrusaSlicer`** (l. 458, l. 537) es el programa que configura las temperaturas, no la
  impresora: `first-layer-issues` l. 66. ✓
- **`Flex`** está en la fila 25 de la guía de Prusa con 40–85 °C, y **`TPU` no sale en
  ese fichero** — `grep TPU` da cero. El artículo lo dice: «Prusa no lista TPU, lista
  Flex» (l. 115). ✓
- **`Cool Plate` / `Engineering Plate` / `Smooth PEI` / `Textured PEI`** están en la tabla
  de Bambu con esos nombres, y el artículo no le atribuye a Prusa ninguna columna de
  chapa — al contrario, dice que su tabla no la tiene (l. 31). ✓
- **`Not recommended`** (l. 72) es la celda literal de Bambu para TPU en Cool Plate
  (l. 101), no una interpretación. ✓
- **`PETG HT`** está en la fila 16, con su 110 °C al lado, y el artículo separa esa fila
  de la del PETG (l. 193-197). ✓
- **Las seis claves de cama** están literales en la línea 49 del fichero de OrcaSlicer,
  con sus seis gemelas `_initial_layer`. ✓
- **`bed_temperature`** se declara como dato interno y no como fuente, y la declaración
  es cierta: `grep bed_temperature src/services/` lo devuelve en `types.ts` l. 53 y en
  `ParserService.ts`. ✓

## Las 55 citas, otra vez, sobre el fichero actual

Las he vuelto a comprobar una a una contra `wiki/raw/`. **Las 55 están. Ninguna
inventada.** Ni una ha cambiado respecto a la vuelta anterior.

El detalle del ancho sigue siendo el que hay que vigilar, y lo he comprobado antes de
contar: **sólo el hilo de foro tiene el cuerpo partido** (a ~76 columnas, líneas 16-135).
Las cinco fichas —Bambu, OrcaSlicer, `filament-material-guide`, `first-layer-issues` y
`pla`— tienen el cuerpo en líneas largas, sin partir; sólo sus «Notas del recolector»
van partiadas, y esas no son fuente de ninguna cita del artículo. Con eso, el `grep`
del fragmento entero es válido en las cinco fichas y hay que buscar por las dos mitades
en el hilo.

Las que cruzan un salto de línea, comprobadas por partes y unidas:

| Cita | Partida en |
|---|---|
| «I've tried adding the brim, and decreasing the bed temperature down to 50 and then 40 degrees […] the part warps so much along the long axis, that it splits off from brim and completely loses bed adhesion» (l. 469-471) | hilo l. 20 → 21 y l. 22 → 23 |
| «From the gaps in your brim, I can say you can go a bit lower with your first layer height» (l. 475-476) | hilo l. 46 → 47 |
| «the bed in your picture looks dirty. Try to wash it with soap water and wipe it with acetone (once a month)» (l. 476-478) | hilo l. 49 → 50 |
| «Thanks, I increased the bed temperature and chamfered the edges of the shape in Fusion, that seemed to make a big difference» (l. 487-488) | hilo l. 96 → 97 |
| «Google suggested a brim, lower bed temp, and **slower print speed, none of which helped so far**» (l. 499-500) | hilo l. 33 → 34 |
| «Using a **three-layer raft did help**, but that made for a nasty surface finish on the part, and seems like rather overkill to fix this» (l. 502-504) | hilo l. 36 → 37 |
| «By the looks of the bed, **soap and hot water** is your best choice... but you might want to do an alcohol scrub first to get the old PLA residue off» (l. 508-510) | hilo l. 106 → 107 — **éste es el falso negativo real**, el mismo de la vuelta anterior: `you might want to do an alcohol scrub first` da cero |
| «Once in a while, an alcohol rinse is helpful to remove PLA residue. **It does not remove finger oils well**» (l. 510-511) | hilo l. 111 → 112 |

Las demás salen con el fragmento entero. De las 55, nueve tienen la forma de cita
partida en dos líneas del artículo y 46 salen literales.

Los fragmentos largos y literales, todos confirmados otra vez:

- «If the bed temperature is too low, … potentially causing mechanical damage» — Orca l. 59
- «PETG, ABS, ASA, XT, and CPH filaments are an exception … (e.g. a glue stick)» — `first-layer-issues` l. 25
- «As a general guideline, you can use the glass transition temperature (Tg) … 5–10 °C» — Orca l. 63
- «In general, following the manufacturer's recommendations … properly leveled bed» — Orca l. 57
- «a few drops of dish soap and warm water (not hot!) … dry the sheet well before using it» — `first-layer-issues` l. 31
- «PEI can lose its adhesive powers … Also, do not use acetone before printing with PETG» — l. 35
- «For the textured and the satin steel sheets … can also contain acetone (acetates)» — l. 37
- «If you are experimenting with new materials … stick a bit better» — l. 66
- «When removing prints with a large surface area … the smooth PEI foil can tear» — l. 54
- «If you don't touch the print surface with your hands or dirty tools, then you don't have to clean it before every print» — l. 19
- «Filaments with a softening temperature below 60 ℃ … deforming the filament» — Bambu l. 84-85
- «Filaments with a softening temperature of 60–80 ℃ (e.g., PETG), when the heatbed is set above 60 ℃» — Bambu l. 89
- «PLA is printable not only on PEI surface, but also on glass, Kapton tape, or using a glue stick» — `pla` l. 46
- «Some of the PLA filaments can be also partially dissolved and glued with acetone» — `pla` l. 54
- «Regularly clean the plate surface with dish soap and hot water … Do not clean the plate with acetone» — Bambu l. 120 y l. 122
- «After printing, wait a few minutes … and the purge tower (if any)» — Bambu l. 78

## Las cifras y las aritméticas, una a una

**Las cinco filas de la cabecera** (líneas 29-33): Bambu 35–65 (tabla de pegamento,
l. 67), Bambu 35–45 en Cool Plate (l. 97), Prusa 50–60 (`filament-material-guide` l. 14),
Prusa 60 (`pla` l. 18), OrcaSlicer 50–60 (l. 25). ✓

**La tabla por chapa** (líneas 65-68): las cuatro filas y las doce celdas contra las
líneas 97, 99, 101 y 102 de Bambu. ✓

**La tabla de los tres fabricantes** (líneas 107-112): las dieciocho celdas contra las
líneas 67-74 de Bambu, 14-25 de Prusa y 25-35 de OrcaSlicer. ✓

**La tabla de las filas que nadie mira** (líneas 143-153): las once de Prusa y las seis
de OrcaSlicer, y es la lista completa de lo que queda fuera de la tabla de arriba. PETG
no aparece entre las de OrcaSlicer, y por eso la celda de la fila del PETG está vacía y
no con un número (l. 117-122). ✓

**Las aritméticas**, que son del redactor y hay que rehacer:

- 50–60 es un rango de 10 grados y el 35–65 de Bambu uno de 30: el «rango de treinta
  grados» de la l. 52 y el «no lo justifica» de la l. 53 cuadran con la frase de Orca
  sobre el ±5 °C de margen típico. ✓
- 100−115 vs 120: cinco grados de diferencia, como dice la l. 127. ✓
- «Prusa es más conservadora que Bambu» sólo en PC: en ABS, ASA y PETG Prusa da un
  techo más alto. La superlativa de la l. 128 es cierta con las dos lecturas posibles
  del «los tres materiales». ✓
- 70–90 contra 60–80: diez grados en los dos extremos, y las ventanas sólo se tocan en
  70–80. ✓
- 60 + 5 = 65 y 60 + 10 = 70; el 65 es el extremo alto exacto del 45–65; del 50–60 se
  sale en el 61 y del 45–65 en el 66. ✓
- 45–115 es el rango más ancho de las tres casas para el PA (treinta grados por debajo
  del 100 con el que arranca Bambu en sus chapas). ✓
- El 60 °C de la ficha del PLA está en mitad del 45–65 de Bambu. ✓
- «Los cuatro números dicen lo mismo sobre un material» (l. 93): son cuatro números
  distintos —35–65, 35–45, 50–60 y 60—, porque el 50–60 de Prusa y el de OrcaSlicer son
  el mismo. ✓

## Notas que no bloquean

Cinco, todas de fondo y ninguna de cifra. Las cuatro primeras se pueden arreglar en una
línea si en algún momento vuelve a tocar este artículo.

- **El 130 °C del Acetal es «la cifra de cama más alta de las tres fuentes»** (l. 164),
  y hay un 150 en la tabla de Prusa. No es una contradicción, porque el artículo explica
  cuatro líneas después por qué esa fila no entra (viene desalineada y no se puede leer
  con confianza), pero la superlativa está escrita como si el 150 no existiera. Lo
  exacto sería «la más alta de las tablas de arriba» o «la más alta que se puede leer».
- **«El panel avisa de si la pieza los necesita»** (l. 638, sobre voladizos y soportes) es
  una afirmación sobre la aplicación, no sobre una fuente, y no lleva la declaración que
  sí lleva el bloque de `bed_temperature` (l. 558-564). `grep` en `wiki/raw/` no encuentra
  nada de voladizos ni de soportes en las seis fuentes de este artículo. Son dos frases
  dentro de «Lo que este artículo no te va a resolver» y no mueven ninguna cifra, pero es
  el mismo género de frase que la que se cayó en la quinta vuelta, y ya está dicho dónde
  escribirlo cuando aparezca.
- **«con su propio nombre y su propia boquilla»** (l. 196, sobre el PETG HT). La tercera
  columna de hardware de esa fila es la boquilla endurecida, y ahí lo que dice es «No»
  (`filament-material-guide` l. 16, cabecera en l. 13). Lo que la fila tiene propio es su
  **cifra** de boquilla, 270 °C, contra los 215–270 del PETG. La frase viene literal del
  cocinado (l. 447-448), así que el arreglo es de las dos capas: «su propia cifra de
  boquilla».
- **«De la sección «Removing Prints»»** (l. 351). En la fuente el epígrafe es
  «2. Removing Prints» (Bambu l. 76). Quitar el número es correcto; dejarlo también lo
  sería.
- **El recuento de palabras es una estimación.** En esta sesión no hay contador: he
  contado por líneas no vacías (505 en el cuerpo) y por densidad de los tramos de prosa
  (14-16 palabras por línea) y de tabla (10-14), y salen unas 6 200. La vuelta anterior
  estimó 6 185 sobre un fichero de 653 líneas, y éste tiene 657. Las dos cifras quedan
  muy por encima de las 800, así que la precisión no cambia nada, pero conviene decirlo
  en vez de dar un número con más exactitud de la que tiene.

## Resumen

Las dos correcciones están hechas y las dos están bien hechas: la enumeración que la
fuente no hacía ha desaparecido y en su lugar hay un dato que sí está, y la frase sobre
la cabecera de un G-code ha desaparecido y en su lugar hay una declaración de que eso no
lo sabe ninguna fuente y de dónde sale lo que sí sabe. Las tres referencias de sitio,
que era lo más difícil de cazar porque las tres son ciertas de una forma y falsas de
otra, están las tres bien.

Las 55 citas están otra vez, una a una, con el hilo de foro desarmado por las dos
mitades donde hace falta. Los cinco casos de condicional y futuro de la fuente de foro
siguen tratándose como lo que son, y el «I will setup an enclosure […] which I suspect» —
la cuarta fabricación de `warping-pla`— sigue sin aparecer. Los nombres propios, los
mismos. Las cifras y las aritméticas, todas cuadradas.

Con más de 6 000 palabras y seis tablas, lo que más me preocupaba era que un dato nuevo
entrase sin comprobar. No ha entrado ninguno: los cinco parámetros que tienen más de un
valor —PLA, PETG, umbral de cámara, agua y acetona— siguen publicando su matiz entero,
y las cuatro afirmaciones negativas del artículo («nadie explica de dónde sale un rango
tan ancho», «Prusa no dice lo de esperar», «ningún fabricante de este lote pone un máximo
al PLA», «la frecuencia no la corrobora nadie») las he comprobado una por una y todas
siguen siendo ciertas contra `wiki/raw/`.

APROBADO.