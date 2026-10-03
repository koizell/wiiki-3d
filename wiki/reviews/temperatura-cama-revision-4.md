# Revisión de temperatura-cama (cuarta vuelta)

**Veredicto: APROBADO.** Los tres fallos de la vuelta anterior están los tres
corregidos, y el párrafo nuevo de OrcaSlicer —que es lo último que se escribió y lo que
menos ha pasado por revisión— sale entero: **los once materiales son los once que tiene
la tabla**, en el mismo orden, y PETG no está entre ellos.

Artículo revisado: `src/content/wiki/temperatura-cama.md`
Material cocinado: `wiki/cooked/temperatura-cama.md`
Fuentes crudas: seis en `wiki/raw/` — cinco `temperatura-cama-*` y una
`warping-pla-prusa-forum-adjusting-settings-warping-pla.md`, que es el hilo de foro
Revisión anterior: `wiki/reviews/temperatura-cama-revision-3.md` (RECHAZADO)

## Comprobaciones

| # | Comprobación | Resultado |
|---|---|---|
| 1 | Afirmaciones con respaldo | PASA — todas las cifras y las 28 cadenas entrecomilladas, comprobadas en `wiki/raw/` |
| 2 | Contradicciones internas | PASA |
| 3 | Relleno y frases de IA | PASA |
| 4 | Longitud y estructura | PASA — ≈ 3 900 palabras (mínimo 800), un solo `<h1>`, secciones en orden, `## Qué puede salir mal` con contenido real, frontmatter completo y `slug` igual al nombre del fichero |
| 5 | Citas correctas | PASA — 6 de 6 URLs en `wiki/raw/`, 0 repetidas, 0 inventadas, primera cita en la línea 43 |

## Los tres fallos de la vuelta anterior, uno a uno

### 1 · Bloqueante anterior · La cifra de PETG atribuida a la tabla que no la tiene

**Corregido.** La línea 113 dice ahora: «Para el **PETG, Prusa sube los dos extremos
diez grados** — 70–90 donde **el otro, Bambu**, da 60–80—, y las ventanas sólo se tocan
en 70–80». Los dos extremos suben diez (70−60 y 90−80), el solapamiento 70–80 es
correcto, y la atribución es la única que se puede hacer: **Bambu es el único
fabricante del lote con un 60–80 de PETG**, en sus dos tablas
(`temperatura-cama-bambu…` líneas 68 y 102-103). Y el artículo ya no se descontradice
doce líneas antes, porque la celda de OrcaSlicer para PETG dice «no sale en su tabla» y
ahora hay un párrafo que lo explica.

### 2 · Importante anterior · La aritmética del 65 y el 70, invertida

**Corregido.** La frase es ahora «Subir por la vía documentada de Prusa **te saca del
rango que publica Prusa antes que del que publica otro fabricante**: del 50–60 sales en
el 61, y del 45–65 de Bambu, en el 66.» Los dos números están bien y, sobre todo,
**sostienen la frase que los acompaña**: 61 sale antes que 66, así que lo propio se
abandona antes que lo ajeno. Ya no hay dos lecturas posibles, porque el artículo nombra
los dos umbrales en vez de dejar que el lector los calcule.

### 3 · Menor anterior · La dirección de la columna de Prusa en PC

**Corregido.** «En **PC el acuerdo de las dos columnas sigue siendo exacto**, 100–120 en
las dos, pero Prusa se aparta al revés: su 100–115 se queda cinco grados por debajo del
techo de los otros, y es el único de los tres materiales donde Prusa es más conservadora
que Bambu.» Los cinco grados salen (120−115), y el «único de los tres» es cierto y está
acotado a los tres materiales del que está hablando, así que no hace falta comprobar si
se extiende a PETG y TPU —aunque también se sostiene.

## El párrafo nuevo de OrcaSlicer, material por material

Es lo que había que comprobar y lo que más fácil se cuela, así que va uno a uno contra
`temperatura-cama-orcaslicer-wiki-material-temperatures.md`, líneas 25-35.

| # | Lo que dice el artículo | La fuente | |
|---|---|---|---|
| 1 | PLA | `PLA \| 180-220 \| 50-60 \| Ambient` (l. 25) | ✓ |
| 2 | ABS | `ABS \| 230-250 \| 90-100 \| 50-70` (l. 26) | ✓ |
| 3 | ASA | `ASA \| 240-260 \| 90-100 \| 50-70` (l. 27) | ✓ |
| 4 | Nylon 6 | `Nylon 6 \| 230-260 \| 90-110 \| 70-100` (l. 28) | ✓ |
| 5 | Nylon 12 | `Nylon 12 \| 225-260 \| 90-110 \| 70-100` (l. 29) | ✓ |
| 6 | TPU | `TPU \| 220-245 \| 40-60 \| Ambient` (l. 30) | ✓ |
| 7 | PC | `PC \| 270-310 \| 100-120 \| 80-100` (l. 31) | ✓ |
| 8 | PC-ABS | `PC-ABS \| 260-280 \| 95-110 \| 60-80` (l. 32) | ✓ |
| 9 | HIPS | `HIPS \| 220-250 \| 90-110 \| 50-70` (l. 33) | ✓ |
| 10 | PP | `PP \| 220-270 \| 80-105 \| 40-70` (l. 34) | ✓ |
| 11 | Acetal | `Acetal (POM) \| 210-240 \| 100-130 \| 70-100` (l. 35) | ✓ |

Once, ninguno inventado, ninguno cambiado de sitio y **PETG no está**, que es lo que el
párrafo afirma. La fuente la presenta como «the standard temperature ranges for common
3D printing materials», así que «sus once materiales» es exactamente lo que son: las
once filas de su tabla, no once materiales del mundo. El artículo no amplía el alcance.

**La consecuencia que el artículo saca de ahí** («Por eso la celda de esa fila está vacía
y no con un número. Cuando tu material no aparezca en una tabla, la primera comprobación
es si falta la fila, no que nadie la haya medido») no la afirma ninguna fuente, y no
hace falta que la afirmen: es una lectura de un hueco observable, y es advice, no un
dato. Es además el tipo de frase que en este artículo importa, porque el PETG es
precisamente el material con el que un lector llegaría buscando y no lo encontraría.
Añade dato (los once nombres) y consecuencia, así que no es relleno.

Y «los dos fabricantes de al lado sí lo listan» es cierto por los dos lados: Bambu en
las líneas 68 y 102, Prusa en la línea 15 (`PETG | No, No, No | 215-270 °C, 70-90 °C`).

## Las tres preguntas, sobre el artículo entero

**1 · ¿La atribución es correcta?** Sí. Seis fuentes, seis enlaces, ninguno cruzado. Los
dos nombres propios que aparecen en el artículo están donde deben:

- El «antes» y el «después» del hilo son de **Zakalawe**, y el enlace lo nombra
  (línea 258). En la fuente, el «antes» es su primer post (l. 20-23) y el «después» es
  su post de las 12:59, marcado «Topic starter» (l. 91-97). ✓
- La respuesta de las tres cosas —primera capa más baja, lavar la cama, «max 65°C»— es
  de **Lichtjaeger** (l. 41-52), y el artículo no le pone nombre: dice «**de un
  usuario**». Eso es más correcto que nombrarlo, porque además el artículo se niega a
  presentarla como recomendación de Prusa, que es justo lo que el hilo no es. ✓
- El «chamfered the edges of the shape in **Fusion**» sigue transcrito con Fusion, sin
  convertirlo en el laminador. Es el error que costó dos revisiones en `warping-pla`, y no
  ha vuelto. ✓
- El «pequeño enclosure» del hilo —«I will setup an enclosure… which I **suspect** would
  make the most difference»— **no aparece en el artículo**, ni en condicional ni
  disfrazado de caso resuelto. ✓

**2 · ¿La afirmación es exacta, con su tiempo verbal y su modo?** Sí. Los cuatro límites
del hilo están los cuatro y en el sitio correcto: subió dos variables a la vez, no dice a
qué temperatura subió, lo dice con «seemed to», y lo único firme es que bajar a 50 y luego
a 40 °C no funcionó. El artículo cuenta en pasado lo que el hilo cuenta en pasado, y
marca el «seemed to» como impresión en vez de como medición. La cifra del 65 se separa
de la palabra «techo», que es lo único que sigue siendo de un usuario, y el 65 aparece
corroborado por la tabla de Bambu y no por el hilo. La regla de Tg menos 5–10 °C se cita
sin su justificación, y el artículo explica por qué no la da —el enlace no está en el
texto guardado— en vez de inventar el porqué. La contradicción interna de la página de
Bambu para el PETG (60 °C en la prosa, 70 °C en la tabla) se explica y no se encadena
como una progresión, que es lo que pedía el cocinado. ✓

**3 · ¿El contexto es el correcto en los nombres propios?** Sí. Los tres casos que se han
fabricado antes en este repositorio eran cambios de contexto: el chaflán de Fusion, los
radios de otro hilo, el enclosure planeado. Aquí los nombres propios que aparecen son
`Fusion`, `PrusaSlicer`, `Bambu Studio`, `live-Z`, `Cool Plate`, `Engineering Plate`,
`Smooth PEI`, `Textured PEI`, `PETG`, `TPU`, `Flex` y las seis claves de cama. Los he
buscado uno a uno:

- **`Fusion`** está en la intervención de Zakalawe, y en la fuente dice «the edges of the
  shape», que es el objeto que el artículo nombra. ✓
- **`PrusaSlicer`** aparece en `first-layer-issues` l. 66, con «will configure them
  correctly based on the selected material, so you don't need to adjust the temperatures
  manually on the printer itself». El artículo dice que configura a partir del material y
  que normalmente no hay nada que tocar en la impresora: es una paráfrasis fiel, y no le
  añade ninguna consecuencia que la frase no tenga. ✓
- **`Flex`** está en la guía de materiales de Prusa (l. 25, 40-85 °C), y **TPU no está en
  esa guía**. El artículo lo dice exactamente así, en la línea 99, y no se cuela un TPU de
  Prusa en ninguna otra parte del artículo. ✓
- **Las seis claves de cama** están literales en la línea 49 de la fuente, con sus seis
  gemelas `_initial_layer`. ✓
- **`bed_temperature`** sigue marcado como dato interno nuestro, dentro del bloque
  autodeclarado «Lo que aquí no te vamos a contar», y `bed_temperature_initial_layer_single`
  sigue dicho que no sale de ningún fichero de fuente. Los dosarantía se respetan tal cual
  los dejó el cocinado. ✓

## Las citas

Las 28 cadenas entrecomilladas del artículo, una a una contra `wiki/raw/`. Todas están.
Las siete más largas, literales y del tirón:

- «If the bed temperature is too low, … potentially causing mechanical damage» — Orca, l. 59
- «PETG, ABS, ASA, XT, and CPH filaments are an exception … a separating agent (e.g. a glue
  stick)» — `first-layer-issues`, l. 25
- «If you are experimenting with new materials … the plastic will stick a bit better» — l. 66
- «Filaments with a softening temperature below 60 ℃ … softening and deforming the
  filament» — Bambu, l. 84-85, con el salto de línea en medio
- «I've tried adding the brim … completely loses bed adhesion» — foro, l. 20-23, con la
  elipsis marcada
- «Thanks, I increased the bed temperature and chamfered the edges of the shape in Fusion,
  that seemed to make a big difference» — foro, l. 96-97
- «As a general guideline, you can use the glass transition temperature (Tg) … 5–10 °C» —
  Orca, l. 63

Ninguna cita inventada, que sigue siendo lo más difícil de conseguir en este lote. Y las
veintiocho se han buscado con el fragmento entero **y por partes**, porque no todos los
ficheros están partidos igual: el cuerpo de `first-layer-issues` va sin partir (la línea
35 es una sola de más de 400 caracteres), el de Bambu y el del foro sí, y el de la guía de
materiales de Prusa tampoco. Un `grep` del fragmento entero habría dado dos falsos
negativos si se hubiera dado por hecho el ancho de línea equivocado.

Las 6 URLs del `sources` están en `wiki/raw/` con esa misma `url`, ninguna repetida, y la
primera cita está en la línea 43, en la primera mitad. Los enlaces cruzados van todos en
sintaxis `[[slug|texto]]`; no hay ni un enlace de Markdown a una página interna.

## Notas que no bloquean

Cuatro cosas, ninguna de fondo, y tres son de vueltas anteriores:

- **«La PEI lisa «can lose its adhesive powers after a couple of hundred hours»»** (l. 165).
  La fuente dice «**PEI** can lose its adhesive powers after a couple of hundred hours», en
  general, y el artículo le añade el sujeto. En el contexto —el pasaje entero es el del
  acetona, que la fuente limita a la smooth PEI— la lectura es la correcta, y es el único
  sitio donde el artículo añade un sujeto que la frase no lleva. Sigue ahí desde la vuelta
  anterior y no lo he convertido en fallo: es una inferencia defendible dentro de un pasaje
  que la sostiene.

- **«la base se deforma hacia fuera»** (l. 146), en la definición de *elephant foot*. La
  fuente dice «the lower layers can overheat and soften excessively, resulting in
  deformation such as elephant foot»: no dice «hacia fuera». Es una glosa del término, no
  una cita, y no mueve ninguna cifra. Anotado para que quede escrito que es del artículo.

- **«La escala de esa página tiene tres escalones»** (l. 173). La página de Prusa tiene
  cuatro epígrafes de limpieza —IPA, jabón, acetona y **Glue**—, y el artículo cuenta los
  tres disolventes. La frase se refiere a la escala de disolventes y no cambia ningún dato,
  pero es la clase de frase donde un lector puede dar por hecho que el cuarto epígrafe no
  existe.

- **Lo que ya estaba anotado y sigue igual**: los cuatro enlaces cruzados pendientes
  (`[[material]]`, `[[enclosure-y-warping]]`, `[[separaciones-entre-capas]]` y
  `[[adhesion-primera-capa]]`), que van en la sintaxis que el renderizador resuelve; el
  bloque `>` de las líneas 340-346, que usa el marcador de cita para lo que es comentario
  del artículo y se autodeclara como tal; y los dos entrecomillados en español que son voz
  propia («la palabra «techo»», «no se limpie con acetona»), con traducción de algo citado
  literal al lado.

## Resumen

Tres correcciones, tres hechas, y la segunda además ha mejorado la frase: los dos cortes
—el 61 y el 66— ya no son una conclusión que hay que creer sino una aritmética que se
puede comprobar. El párrafo nuevo de OrcaSlicer es la parte que menos había pasado por
revisión y es la parte correcta: los once materiales son los once, en orden, y la
consecuencia que el artículo saca del hueco del PETG es exactamente la que se puede sacar
de un hueco, sin inventarse nada.

Las tres preguntas sobre el artículo entero dan limpio. No hay atribución cruzada, no hay
una fuente planificada en condicional contada en pasado, y no hay ni un nombre propio
cambiado de contexto. La contradicción interna de la página de Bambu sigue explicada en vez de
resuelta, y el dato interno del analizador sigue marcado como tal.

Se queda fuera el recuento exacto de palabras porque en esta sesión no había herramienta
para contar; la cifra es una estimación por secciones, y el margen sobre el mínimo de 800
es de más de cuatro veces, así que la comprobación no cambia de resultado con doscientas
palabras de error.
