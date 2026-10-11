# Revisión de temperatura-cama (quinta vuelta)

**Veredicto: RECHAZADO** — 2 fallos, ambos de la comprobación 1 y ambos de una frase.
Ninguno toca una cifra, una cita ni una atribución; los otros cuatro puntos pasan.

Artículo revisado: `src/content/wiki/temperatura-cama.md` (653 líneas)
Material cocinado: `wiki/cooked/temperatura-cama.md`
Fuentes crudas: seis en `wiki/raw/` — cinco `temperatura-cama-*` y
`warping-pla-prusa-forum-adjusting-settings-warping-pla.md`
Revisión anterior: `wiki/reviews/temperatura-cama-revision-4.md` (APROBADO)

## Comprobaciones

| # | Comprobación | Resultado |
|---|---|---|
| 1 | Afirmaciones con respaldo | **FALLA** — 2 afirmaciones sin respaldo en `wiki/raw/` ni en `wiki/cooked/` |
| 2 | Contradicciones internas | PASA |
| 3 | Relleno y frases de IA | PASA |
| 4 | Longitud y estructura | PASA — ≈ 6 200 palabras, un solo `<h1>` (línea 21), secciones en orden, `## Qué puede salir mal` con 13 casos reales, frontmatter completo y `slug` igual al nombre del fichero |
| 5 | Citas correctas | PASA — 6 de 6 URLs en `wiki/raw/` con ese mismo `url`, 0 repetidas, 0 inventadas, primera cita en la línea 35 |

## Los seis puntos que había que mirar, uno a uno

**1 · «Antes de soltar la pieza» (líneas 347-372): las tres instrucciones están
cocinadas y con cita literal.** Las tres están en `wiki/raw/` y las tres en la misma
línea de la fuente, la 78 del fichero de Bambu:

| Lo que dice el artículo | Dónde está |
|---|---|
| «After printing, wait a few minutes until the plate and model have fully cooled before removing the print. This makes removal easier and helps **avoid scratching the plate or damaging the bottom of the model**» (l. 355) | Bambu, l. 78, literal |
| «remove the build plate and **gently flex it** to release the model **and the purge tower (if any)**» (l. 359) | Bambu, l. 78, literal |
| «la torre de purga sale con la pieza», y por eso no hay que cortar la base (l. 360) | Es la lectura de esa misma frase, y la causa («impide que quien busque su pieza corte la base») está cocinada |

Las tres tienen delante su enlace a Bambu en el mismo párrafo (l. 352), y las tres
salen con `grep` del fragmento entero, porque el fichero de Bambu va sin partir. La
corroboración de Prusa (l. 366) es literal y está en `first-layer-issues` l. 54. Y la
afirmación negativa del artículo —«Prusa no dice lo de esperar»— se sostiene: `wait`,
`cooled` y `cool` sólo salen en el fichero de Bambu.

Lo que el cocinado prohibía publicar —«que quitar en caliente deforma la base y que ese
resultado se confunde después con warping»— **no está publicado**: el artículo se
queda en «una cama bien puesta no sirve de nada si la pieza se arranca en caliente» y
en los dos motivos que da la fuente. ✓

**2 · La acetona que viene dentro: está unida a la prohibición, no suelta.** Es la
forma exacta que pedía el cocinado. La secuencia es: la prohibición entera («For the
textured and the satin steel sheets, do not use acetone at all!», l. 326) → la segunda
mitad del aviso (l. 330) → «la prohibición no acaba en la primera frase» → «las dos
advertencias van juntas en el mismo párrafo de la fuente: quédate con la primera y te
llevas la mitad útil del aviso» (l. 337). Y en `## Qué puede salir mal` vuelve atada:
«la prohibición de la chapa texturizada no te llega» (l. 604). Ambas frases están en
`first-layer-issues` l. 37, en el mismo orden. ✓

**3 · Contradicción 5 (PETG): el 110 no sube al PETG.** El artículo hace las dos cosas
que había que hacer. Primeiro, separa: «No es el PETG de la fila de arriba: es una
variante aparte, con su propio nombre y su propia boquilla» (l. 193), con la fila
literal «PETG HT | No, No, No | 270 °C, **110 °C**» (l. 192), que es exactamente la
línea 16 de la guía de Prusa, y «**una fila por debajo de la del PETG**» también es
cierto (l. 15 y l. 16). Segundo, dice por escrito que la frase que hay que evitar no la
dice nadie: «Es exactamente el error que hace que alguien escriba «Prusa lleva el PETG
hasta 110 °C», y **no lo dice nadie en este lote**» (l. 195). Y `## Qué puede salir mal`
lo repite como error con nombre propio (l. 585). En ningún punto del artículo el 110
aparece como cifra de cama del PETG. ✓

**4 · Contradicción 6 (agua): se publica el matiz y no lo resuelve el redactor.** Las
dos citas literales, cada una con su enlace (l. 294 Prusa, l. 303 Bambu). Después, el
matiz en tres piezas: que los dos juegan con agua y jabón, que el paréntesis de Prusa
existe para que no se pueda leer de otra manera, que Bambu enlaza a su propia guía de
la Textured PEI y que esa guía no está entre las fuentes, y que «agua tibia y jabón» es
la lectura que no se equivoca ninguna de las dos (l. 308-315). No se elige una y se
borra la otra; se publica la contradicción y se dice que Bambu se contradice con
Prusa. También aparece como error en `## Qué puede salir mal` (l. 607). ✓

**5 · El sujeto de la cuarta limpieza.** Corregido desde la cuarta vuelta. Ahora dice
«La razón que da Prusa es que «PEI can lose its adhesive powers after a couple of
hundred hours»» (l. 318), con el sujeto que tiene la fuente. En la vuelta anterior era
«la PEI lisa», y era el único sitio donde el artículo añadía un sujeto a la cita. ✓

**6 · `### Revisado y no incorporado` no está en el artículo.** No hay ni un `###` en
las 653 líneas: el único `h1` es el de la línea 21 y las diecinueve cabeceras de sección
son todas `##`. Tampoco ha colado nada del `## Sin respaldo` ni del `## Tirado` del
cocinado como estructura: la nota interna que el cocinado abre con «Nota de revisión» no
está, y el bloque `>` de las líneas 554-560 se autodeclara como comentario del artículo
—«Lo que aquí no te vamos a contar»— y marca `bed_temperature` como dato interno
nuestro. ✓

## Las tres preguntas, sobre el artículo entero

**1 · ¿La atribución es correcta?** Sí, y en los seis casos donde hay una persona.

- **Zakalawe** es el «antes» (hilo l. 20-23) y el «después» (hilo l. 96-97), y el
  artículo lo nombra en ambos con su enlace (l. 464 y l. 492).
- **Lichtjaeger** es la respuesta de las tres cosas (hilo l. 46-52) y el artículo dice
  «las dio **Lichtjaeger**». Las tres frases están en su intervención: la primera
  capa (l. 46-47), el lavado con acetona (l. 49-50) y el «max 65°C» (l. 52). ✓
- El cuarto post es **de otro usuario** y el artículo lo dice así, sin nombre, que es lo
  correcto porque en la fuente el nombre es un guion (hilo l. 102). La fecha que da,
  28/06/2019, es la del post (l. 101). ✓
- **Luzijager no es la recomendación de Prusa** y el artículo lo dice dos veces, con la
  razón: «un paréntesis y un «max 65°C», y de un usuario del foro. No es la
  recomendación de Prusa» (l. 480), y luego separa la cifra —corroborada por la tabla de
  Bambu— de la palabra «techo», que sigue siendo de un usuario (l. 523-527). ✓
- **Peter M** no aparece, ni su «first layer hotter». Correcto: el cocinado lo dejó
  fuera por intention sin cifra ni resultado.

**2 · ¿La afirmación es exacta, con su tiempo verbal y su modo?** Sí. Los cuatro límites
del hilo están los cuatro: subió dos variables a la vez, no dice a qué temperatura
subió, lo dice con «seemed to», y lo único firme es que bajar a 50 y luego a 40 °C no
funcionó (l. 488-495). El «none of which helped so far» conserva su «so far» y se
cuenta como un fallo declarado por quien lo probó. El «I will setup an enclosure… which
I suspect» no aparece en ninguna forma, ni en condicional ni disfrazado de caso
resuelto. El raft se cuenta como lo que fue —funcionó, con mala superficie— y no como
una recomendación. ✓

**3 · ¿El contexto es el correcto en los nombres propios?** Sí. Los nombres propios que
podrían haber cambiado de contexto, buscados uno a uno:

- **`Fusion`** está en la intervención de Zakalawe (hilo l. 96-97) y el artículo lo
  transcribe con Fusion, sin convertirlo en el laminador. Es el error que costó dos
  revisiones en `warping-pla` y no ha vuelto. ✓
- **`PrusaSlicer`** está en `first-layer-issues` l. 66 con «will configure them
  correctly based on the selected material, so you don't need to adjust the temperatures
  manually on the printer itself». ✓ (con la salvedad del fallo 2 de este informe).
- **`Flex`** está en la guía de materiales de Prusa (l. 25, 40–85 °C) y **TPU no sale
  en ese fichero** — `grep TPU` en él da cero. El artículo lo dice: «la última fila
  mezcla materiales: Prusa no lista TPU, lista Flex» (l. 114). ✓
- **`Cool Plate` / `Engineering Plate` / `Smooth PEI` / `Textured PEI` / `PEI`** están
  en la tabla de Bambu con esos nombres, y el artículo no atribuye a Prusa ninguna
  columna de chapa —al contrario, dice que su tabla no la tiene. ✓
- **`PETG HT`** está en la fila 16 de la guía de Prusa, con su 110 °C al lado. ✓
- **Las seis claves de cama** están literales en la línea 49 del fichero de
  OrcaSlicer, con sus seis gemelas `_initial_layer` (l. 547-549). ✓

## Fallos, con dónde y qué hacer

### 1 · Importante · Qué abarca la fila «Composite materials» no está en ninguna capa

**Dónde:** línea 159, sección «Las filas que casi nadie mira», tercera frase.

**Qué dice:** «El 120 es el extremo alto de una fila que cubre desde la fibra de madera
al CF, y por eso no dice nada de un filamento concreto.»

**Por qué falla:** la enumeración no sale de `wiki/cooked/` —`fibra de madera` da cero—
ni de `wiki/raw/`. La fuente no dice qué materiales cubre esa fila: dice
`Composite materials | -, -, Yes | 225-290 °C, 40-120 °C` (guía de Prusa, l. 28). Y lo
peor es que la línea siguiente de esa misma tabla separa justo lo que esta frase junta:
`Wood / metal filled | No, No, - | 190-270 °C, 60-100 °C` (l. 29), con su propia fila, su
propio intervalo y su propia columna de hardware. El artículo imprime las dos filas en
su propia tabla (líneas 151-152) y en la misma página afirma que la de madera está
fuera. Lo que sí está cocinado es lo otro, y es suficiente: que es una fila que
**agrega** y que no se puede leer como «el filamento con fibra va a 120 °C» sin más.

**Qué hacer:** quitar la enumeración y dejar el aviso que la sostiene. Si el ejemplo de
la madera hace falta, primero al cocinado, y desde la fuente: la ficha de cada
composite, no la fila agregada.

### 2 · Menor · Lo que el slicer escribe en el G-code no lo dice ninguna fuente

**Dónde:** línea 536, sección «Por qué tu slicer puede no escribir este dato», punto 1.

**Qué dice:** «PrusaSlicer la configura a partir del material seleccionado, así que
muchos G-code no llevan nada en la cabecera, o llevan el valor del perfil sin
comentar.»

**Por qué falla:** la primera mitad es paráfrasis fiel y está en la fuente
(`first-layer-issues` l. 66). La segunda mitad —que muchos G-code no llevan nada en la
cabecera, o lo llevan sin comentar— no la dice ninguna de las seis: `grep G-code` y
`grep header` en `wiki/raw/` no devuelven ni una mención a la cabecera de un G-code. Y
además el razonamiento apunta al revés de lo que dice la cita: si el slicer configura la
temperatura, el G-code sí la lleva, y lo que el artículo quiere explicar es por qué el
campo analizado puede faltar. Es el mismo sitio donde se fabricó la cita inventada que
este artículo ya corrigió una vez: pegada a una cita real y debajo del mismo enlace.

**Qué hacer:** quedarse con la cita de Prusa y con lo que sí se puede derivar de ella
(el slicer pone la temperatura, el usuario no toca la impresora), y marcar el
comportamiento de la cabecera como lo que es: lo que hace el analizador, no lo que
dice una fuente.

## Las citas

Las 55 cadenas entrecomilladas del artículo, una a una contra `wiki/raw/`. Todas
están. Ninguna inventada.

Comprobado con el fragmento entero, **y** por las dos mitades donde el fichero está
partido, porque el ancho no es el mismo en todo el lote: el hilo de foro va partido a
80 columnas, y `first-layer-issues` y las fichas de Prusa llegan a 400 y 880. El
`grep` del fragmento entero dio **un** falso negativo real, y es exactamente el caso
que había que vigilar:

- «but you might want to do an alcohol scrub first to get the old PLA residue off»
  (l. 506) → `you might want to do an alcohol scrub first` da cero; sale partido entre
  las líneas 106 y 107 del hilo. Con las dos mitades, entero. ✓

Los fragmentos largos y literales, todos confirmados:

- «If the bed temperature is too low, … potentially causing mechanical damage» — Orca, l. 59
- «PETG, ABS, ASA, XT, and CPH filaments are an exception … (e.g. a glue stick)» — `first-layer-issues`, l. 25
- «If you are experimenting with new materials … stick a bit better» — l. 66
- «Filaments with a softening temperature below 60 ℃ … deforming the filament» — Bambu, l. 84-85, con el salto en medio
- «I've tried adding the brim, … completely loses bed adhesion» — hilo, l. 20-23
- «Thanks, I increased the bed temperature and chamfered the edges of the shape in Fusion, that seemed to make a big difference» — hilo, l. 96-97
- «As a general guideline, you can use the glass transition temperature (Tg) … 5–10 °C» — Orca, l. 63
- «a few drops of dish soap and warm water (not hot!) … dry the sheet well before using it» — `first-layer-issues`, l. 31
- «PEI can lose its adhesive powers … Also, do not use acetone before printing with PETG» — l. 35
- «For the textured and the satin steel sheets … can also contain acetone (acetates)» — l. 37
- «PLA is printable not only on PEI surface, but also on glass, Kapton tape, or using a glue stick» — `pla`, l. 46
- «Some of the PLA filaments can be also partially dissolved and glued with acetone» — `pla`, l. 54

Las 6 URLs del `sources` están en `wiki/raw/` con ese mismo `url` en el frontmatter, sin
repetir ninguna; la primera cita está en la línea 35, en la primera mitad. Los cuatro
enlaces cruzados y los siete `[[slug|texto]]` van en sintaxis de referencia cruzada, y
`grep '](/'` no devuelve nada: ni un enlace de Markdown a una página interna.
`campo: [bedTemp]` está en la lista permitida y `src/lib/wiki-campos.ts` tiene su
entrada apuntando a este slug.

## Las cifras, una a una

Las he comprobado fila por fila contra los tres ficheros de tablas, no por la fuente
de la frase.

**Las cinco filas de la cabecera** (líneas 29-33): Bambu 35–65 (glue, l. 67), Bambu
35–45 Cool Plate (chapa, l. 97), Prusa 50–60 (l. 14), Prusa 60 (ficha PLA, l. 18),
OrcaSlicer 50–60 (l. 25). ✓

**La tabla por chapa** (líneas 65-68): `PLA | 35-45 | 45-65 Glue | 45-65 | 45-65`,
`PLA-CF | 45-65 | 45-65 Glue | 45-65 | 45-65`, `TPU | Not recommended | 30-35 | 35-45
| 35-45`, `PETG | Not recommended | 60-80 | 60-80 | 60-80` — las cuatro filas, las
cuatro celdas, contra las líneas 97, 99, 101 y 102 de Bambu. ✓

**La tabla de los tres fabricantes** (líneas 107-112): PLA 35–65 / 50–60 / 50–60;
PETG 60–80 / 70–90 / ausente; ABS 90–100 / 95–110 / 90–100; ASA 90–100 / 90–110 /
90–100; PC 100–120 / 100–115 / 100–120; TPU 30–45 / Flex 40–85 / 40–60. Las 18
celdas, contra las líneas 67-74 de Bambu, 14-25 de Prusa y 25-35 de OrcaSlicer. ✓

**La tabla de las filas que nadie mira** (líneas 143-153): las 11 de Prusa (PETG HT 110,
Glow 85, CPE 90–110, PVA/BVOH 60, HIPS 100–110, PP 70–100, nGen 90, PA 70–115,
Composite 40–120, Wood/metal 60–100, PVB 75) y las 6 de OrcaSlicer (Nylon 6 y 12
90–110, PC-ABS 95–110, HIPS 90–110, PP 80–105, Acetal 100–130). Es la lista completa:
las 18 filas de Prusa y las 11 de OrcaSlicer están todas en el artículo, ninguna
inventada, ninguna repetida y PETG no entre las de OrcaSlicer. ✓

**Las aritméticas del artículo** (que son del redactor y hay que rehacerlas):
35–65 es un rango de 30 grados y 50–60 uno de 10; 65 y 70 son 60+5 y 60+10; el 65 es
el extremo alto del 45–65; del 50–60 se sale en el 61 y del 45–65 en el 66; el 120 de
Bambu para PC, PA y PET-CF; el 70 de Prusa es diez más que el 60 de Bambu por los dos
extremos y las ventanas sólo se tocan en 70–80; 120−115 = 5; Prusa queda por debajo de
Bambu sólo en PC de los tres materiales que se comparan; «después de la fibra de madera
al CF» es lo único que no sale (fallo 1). Todas las demás cuadran. ✓

## Notas que no bloquean

Cinco cosas, ninguna de fondo: tres son de la cuarta vuelta, dos son de esta.

- **Tres afirmaciones sobre *dónde* está una frase en la fuente, y las tres son
  inexactas.** No mueven ninguna cifra, pero se pueden comprobar y no dan lo que dicen:
  «Literal, en **la línea siguiente**» (l. 330) —en `wiki/raw/` las dos frases de la
  acetona están en la **misma** línea (l. 37), una detrás de otra; en la página sí van
  seguidas, así que la advertencia se sostiene igual. «En **la misma línea** de esa
  página está la regla de no tocar la superficie con las manos» (l. 370) —la espátula
  está en `first-layer-issues` l. 54, al final de la sección de pegamento, y la regla
  de las manos en la l. 19, en «How to prepare your print surface»: no están en la misma
  línea ni en la misma sección. Y ««no toques la superficie con las manos» es **la
  primera línea** de esa misma página» (l. 517) —es la primera frase de su sección, no
  de la página: delante están el título, el párrafo de entrada y el epígrafe. Esta última
  viene del cocinado, que lo dice igual, así que el arreglo es de las dos capas.
- **La fila del PEI vuelve al artículo, y el cocinado la había tirado** (l. 166-169).
  La forma de reintroducirla es la correcta: el número está en la fuente (Prusa, l. 31),
  se dice que viene desalineada y que no se puede leer con confianza, y se manda a la
  ficha del material. Es además lo que permite decir que el 130 del Acetal es el techo
  del lote sin que un lector que abra la tabla de Prusa se encuentre con un 150 sin
  explicación.
- **«muchos G-code no llevan nada en la cabecera»** es el fallo 2, pero conviene decir
  además que el resto de las cuatro razones del apartado sí está: el slicer, el
  material que no necesita cama (cita literal de `pla` l. 23), el nombre de la clave
  (las seis variables literales) y el 0 como valor puesto (Bambu l. 115).
- **El dato interno del analizador se declara como tal.** El `## Sin respaldo` del
  cocinado marca que el nombre a secas sale en
  `src/services/types.ts` (l. 53, confirmado) y no en las fuentes. El artículo lo
  declara con esas palabras, dentro de un bloque que se autodeclara como comentario del
  artículo, y además dice que `bed_temperature_initial_layer_single` no sale de ningún
  fichero de fuente — que es exactamente lo que pasa: sólo aparece en las notas del
  recolector de OrcaSlicer (l. 122).
- **Los `#` de las líneas 16-17 del frontmatter son comentarios YAML**, no dos `<h1>`
  más: en el renderizador no existen, y es la convención que ya usa `warping-pla`
  (líneas 19-22). Lo dejo escrito porque un `grep '^#'` sobre el fichero sí cuenta tres
  y porque cualquier herramienta que contar encabezados sin quitar el frontmatter
  daría un falso positivo.

## Resumen

El artículo está en muy buena forma y es el más difícil de los cinco que han pasado
por aquí: 6 185 palabras, 55 citas comprobadas una a una, ninguna inventada, las tres
contradicciones nuevas publicadas con su matiz —la del PETG separando el 110, la del
agua con las dos citas y sin elegir, la de la cámara con los dos umbrales sin encadenarlos
como una progresión—, y los seis puntos que había que mirar, los seis bien. Los dos
avisos de seguridad que el cocinado rescató del crudo —esperar a que enfríe, y la
acetona dentro del quitaesmalte— están los dos atados a su prohibición, que es donde
valen.

Los dos fallos son una enumeración que la fuente no hace y que su propia tabla
desmiente, y una frase sobre lo que lleva la cabecera de un G-code que no dice ninguna
de las seis fuentes. Los dos son de una línea, ninguno cambia una cifra ni una
recomendación, y ninguno es del tipo que se fabricó en `warping-pla`: no hay ninguna
cita que no exista, ni un nombre propio cambiado de contexto, ni una fuente planeada
contada en pasado. Aun así, el primero de los dos es exactamente el patrón que este
paso existe para cazar —una especificidad verosímil que suena a dato y no está— y por
eso la vuelta es RECHAZADO, no una nota al pie.

Se queda fuera el recuento exacto de palabras: en esta sesión no había contador, y la
cifra es una estimación por secciones sobre las 653 líneas del fichero.
