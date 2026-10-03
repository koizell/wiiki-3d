# Revisión de warping-pla, tercera vuelta

**Veredicto: RECHAZADO** — 6 fallos, de los cuales 3 bloqueantes.

Artículo revisado: `src/content/wiki/warping-pla.md`
Fuentes cocinadas: `wiki/cooked/warping-pla.md`
Informes anteriores: `wiki/reviews/warping-pla-revision-1.md`, `warping-pla-revision-2.md`

**Cómo se cuenta.** Igual que en las dos vueltas anteriores: el frontmatter no cuenta,
las URLs de los enlaces tampoco, y se cuentan secuencias de letras y cifras.

## Comprobaciones

| # | Comprobación | Resultado |
|---|---|---|
| 1 | Afirmaciones con respaldo | **FALLA** — 3 afirmaciones que el cooked da por ciertas y el crudo no contiene |
| 2 | Contradicciones internas | **FALLA** — el mismo caso se cuenta dos veces y se atribuye a dos hilos distintos |
| 3 | Relleno y frases de IA | **FALLA** — ninguna frase prohibida, pero hay una palabra rota en el texto publicado |
| 4 | Longitud y estructura | PASA — 2 418 palabras |
| 5 | Citas correctas | **FALLA** — 3 wikilinks a páginas que no existen, y es una regresión de la revisión 2 |

## Fallos, con dónde y qué hacer

### 1 · Bloqueante · «Chaflanar la arista en el laminador» no lo dice ninguna fuente

**Dónde:** sección «Por qué ocurre», líneas 77-80. Repetido en «Qué puede salir mal»,
líneas 265-266 y 284-286.

**Qué dice:** «lo que funcionó fue **chaflanar la arista en el laminador**», con cita al
hilo *Adjusting settings for warping of PLA*.

**Por qué falla:** el hilo dice literalmente «I increased the bed temperature and
chamfered the edges of the shape in **Fusion**» (`wiki/raw/warping-pla-prusa-forum-adjusting-settings-warping-pla.md`,
líneas 96-97). *Fusion* es Autodesk Fusion 360, un programa de CAD. Un laminador es
otra cosa. El artículo está mandando a chaflanar en una máquina con la que no se puede
chanfrar nada.

La cita tampoco sostiene lo que se le atribuye: el error está ya en
`wiki/cooked/warping-pla.md`, líneas 38-39 («chaflanando la arista en el laminador»),
y el redactor lo copió tal cual en los tres sitios. Pero lo que sale publicado es una
instrucción falsa con una URL real al lado, que es la combinación que este paso existe
para cazar.

**Qué hacer:** el cocinero corrige `wiki/cooked/warping-pla.md` a «chaflanó las aristas
en Fusion», y el redactor ajusta los tres sitios. No es una cuestión de estilo: la
redacción correcta es *en Fusion*, o *en el modelo*, y no *en el laminador*.

### 2 · Bloqueante · Dos hilos de foro fundidos en un solo caso, con el autor cambiado

**Dónde:** sección «Por qué ocurre», líneas 77-80.

**Qué dice:** «quien probó **radios de 3 mm** en las esquinas no consiguió que el
arrugado desapareciera, y lo que funcionó fue chaflanar la arista en el laminador
([Lichtjaeger y Zakalawe, foro de Prusa](…/adjusting-settings-warping-pla/))».

**Por qué falla:** los radios de 3 mm **no están en ese hilo**. Están en *Warping at
corners*, escritos por **Elias Spors**, en `wiki/raw/warping-pla-prusa-forum-warping-at-corners.md`:
«I tried to round off the 90°-corners with 3mm radii but the crinkles remained»
(líneas 20-21, y las notas del recolector, líneas 115-118). El hilo de Lichtjaeger y
Zakalawe no los menciona en ningún post.

El artículo monta con ellos una cadena causal —«probé radios y no bastó; lo que bastó
fue X»— que **ninguna de las dos fuentes dice**: en el hilo de las esquinas nadie
probó el chaflán, y en el de Zakalawe nadie probó radios. Son dos personas, dos hilos y
dosantanse años distintos (2019 y 2024).

**Qué hacer:** separarlos. Cada hecho con su hilo y su autor. Si se quiere contar la
cadena completa —radios que no bastaron por un lado, chaflán que funcionó por otro—,
hay que decirlo así, diciendo que son dos casos.

### 3 · Bloqueante · El enclosure «sin tapa, con espuma de embalaje pegada» no aparece en el hilo citado

**Dónde:** sección «El enclosure», líneas 247-250.

**Qué dice:** «Quien resolvió su caso en el foro de Prusa lo hizo con un enclosure
**sin tapa**, con espuma de embalaje pegada ([Zakalawe, foro de Prusa](…/adjusting-settings-warping-pla/))».

**Por qué falla:** ese hilo no tiene nada de eso. Lo único que dice Zakalawe sobre el
enclosure es que **planeaba** montarlo: «Longer term I will setup an enclosure to keep
the ambient temperature higher which I suspect would make the most difference»
(línea 31). No hay tapa, no hay espuma, y el caso **no** se resolvió con un enclosure:
se resolvió subiendo la cama y chaflanando en Fusion (líneas 96-97).

`wiki/cooked/warping-pla.md`, líneas 204-205, afirma lo mismo («enclosure **sin tapa**,
con espuma»), así que el defecto viene de la capa cocinada. Pero el artículo lo publica
con una cita real, y le añade «de embalaje pegada», que tampoco está en ninguna parte.

Conviene distinguir: el *matiz* de la contradicción 3 del cooked —«abierto o sin tapa
ayuda a mantener el ambiente estable y por encima de 20 °C»— sí está cocinado y el
artículo lo explica bien en las líneas 246-248. Lo que no está es el caso concreto.

**Qué hacer:** quitar el caso del artículo, y que el cocinero lo saque de
`## Contradicciones` de `wiki/cooked/warping-pla.md` si no lo encuentra en el crudo. Es
la tercera vez que este hilo se cita para algo que no dice.

### 4 · Importante · Tres wikilinks a páginas que no existen — regresión de la revisión 2

**Dónde:** línea 99 (`[[separaciones-entre-capas|separaciones entre capas]]`), línea 322
(`[[enclosure-y-warping|Enclosure y warping]]`), línea 326
(`[[adhesion-primera-capa|Adhesión en la primera capa]]`).

**Por qué falla:** en `src/content/wiki/` sólo hay dos ficheros, `warping-pla.md` y
`temperatura-cama.md`. Las tres páginas no existen. La revisión 1 ya bloqueó por esto
(fallo 3) y la revisión 2 lo verificó corregido: «Las tres páginas futuras se nombran
como texto y las tres llevan detrás “Todavía no escrita”». Esta vuelta ha vuelto a poner
los wikilinks, y de paso ha desaparecido la marca de «todavía no escrita».

**Contexto honesto, porque es relevante para decidir:** `temperatura-cama.md` hace lo
mismo con cuatro enlaces a páginas que tampoco existen. Si el criterio del proyecto ha
cambiado y los wikilinks a páginas planificadas están permitidos, hay que cambiarlo por
escrito y fuera de un informe de revisión. Mientras la norma sea la que aplicó la
revisión 1, los dos archivos tienen el mismo fallo y los dos necesitan arreglo.

**Qué hacer:** quitar los tres y dejarlos como texto, o escribir esas páginas antes.

### 5 · Menor · Palabra rota en el texto publicado

**Dónde:** «Qué puede salir mal», cuarto punto, línea 282.

**Qué dice:** «El **síntimo** no dice nada del material.»

**Por qué falla:** no existe esa palabra. Por el contexto («la primera capa sale
demasiado alta») sólo puede ser *síntoma* o *slicer*. Sale así, publicada.

**Qué hacer:** arreglar. Es una letra.

### 6 · Menor · «Nada de esto lleva a la cuenta de material»

**Dónde:** «Lo que este artículo no te va a resolver», líneas 299-300.

**Qué dice:** «Una cifra de coste. Nada de esto lleva a la cuenta de material».

**Por qué falla:** no está en `wiki/cooked/warping-pla.md`, ni en `## Afirmaciones` ni
en `## Sin respaldo`. Es una afirmación sobre lo que las fuentes cubren, hecha sin
ninguna fuente. Suena inocente, pero es exactamente el salto que la frontera entre capas
debe impedir.

**Qué hacer:** quitarlo, o reformularlo como alcance del artículo y no como algo que
las fuentes digan.

## Las cinco preguntas que se han pedido

### 1 · ¿Queda alguna afirmación del artículo que no esté en `wiki/cooked/`?

Dos, y ninguna es técnica:

- **Línea 72:** «Si sólo se levanta en una pieza de **300 mm** y no en una de **30**». Las
  dos cifras no están en ninguna parte. Se leen como ilustración de un condicional y no
  se atribuyen a nadie, así que no las cuento como afirmación, pero escrito con números
  parecen un dato medido. Preferible «una pieza grande y no en una pequeña».
- **Línea 299:** la del coste, que es el fallo 6.

**Todo lo demás está cocinado con su fuente, y además lo he contrastado con
`wiki/raw/` una por una:** +5 a +10 °C, 35 °C en Cool Plate, 55-65 °C en Textured PEI,
0,04 mm de descenso de boquilla, 80 % de los fallos, brim de 8-10 mm, Gyroid ≤25 %,
20 °C de ambiente, +10 °C de compensación, 185-235 °C de boquilla, 40-50 % del auxiliar,
10-20 % de ventilador general, 3 primeras capas sin cooling, cama a 50 y luego 40 °C y
65 °C de respuesta, 45 °C como umbral de cámara. Todos están en el crudo que citan.

También es cierta la afirmación negativa, que es la más incómoda de comprobar: la
Knowledge Base de warping de Prusa habla de Live Adjust Z y de brim y **no** da ninguna
cifra de cama para el PLA. En el crudo no aparece ningún número de temperatura de cama.

### 2 · ¿Las seis cifras de cama del artículo están todas cocinadas, con su fuente?

Sí, las seis. Cuatro están en `wiki/cooked/warping-pla.md` (líneas 87-91 y 151) y dos
sólo en `wiki/cooked/temperatura-cama.md` (líneas 33-38):

| Cifra del artículo | Dónde está cocinada |
|---|---|
| Bambu, por filamento y pegamento, 35 – 65 °C | `warping-pla.md` 87-88 |
| Bambu, Cool Plate, 35 – 45 ℃ | `warping-pla.md` 90 |
| Bambu, Engineering/Smooth/Textured, 45 – 65 ℃ | `warping-pla.md` 90-91 |
| Prusa, tabla de materiales, 50 – 60 °C | `warping-pla.md` 85-86 |
| Prusa, ficha del PLA, 60 °C | `temperatura-cama.md` 33-35 |
| OrcaSlicer, 50 – 60 °C | `temperatura-cama.md` 36-38 |

Las dos últimas están fuera del cooked de este tema, y eso me parecía un salto. No lo
es: `wiki/cooked/warping-pla.md`, líneas 82-83, dice literalmente «Estas cifras no
estaban en las cinco fuentes de este tema… Ver `wiki/cooked/temperatura-cama.md`». La
capa cocinada autoriza el salto ella misma. Las cuatro URLs están en `sources` y las
cuatro están en `wiki/raw/`.

Las cifras derivadas también cuadran: 65-35 = 30 grados de margen en Bambu, 60-50 = 10 en
Prusa, y el 50-60 y el 60 caen dentro del 45-65 de la Textured PEI.

### 3 · ¿Ha desaparecido lo de la tabla de Prusa? ¿Hay otra afirmación falsa sobre una fuente?

Lo de la tabla de Prusa ha desaparecido del todo. No queda ni rastro: ni «aplastada», ni
«no se puede leer», ni «no la uso». La corrección del apartado `## Tirado` del cooked se
ha respetado.

Y sí: hay **otras tres**, y son las del fallo 1, el fallo 2 y el fallo 3. Las tres
están en `wiki/cooked/warping-pla.md` como si fueran ciertas —dos en `## Afirmaciones`,
una en `## Contradicciones`— y las tres son Citations que apuntan a un hilo real que no
dice eso. Ninguna la inventó el redactor.

### 4 · ¿Elige un número de temperatura de cama, o explica por qué hay varios?

Explica, y es lo mejor del artículo junto con el diagnóstico diferencial.

- Tabla de las seis cifras con la tabla de la que sale cada una.
- La chapa como la variable que faltaba, y los dos números de Bambu como los dos
  extremos de la misma fila leídos por columnas distintas.
- El error en las dos direcciones: 65 °C en una Cool Plate quema la placa, 35 °C en una
  Textured PEI deja las esquinas levantadas.
- El margen que cambia entre fabricantes (treinta grados contra diez), sin inventar un
  por qué.
- El 65 °C del foro marcado como cifra respaldada por un fabricante pero **no** como
  techo, que es exactamente la división que pide `## Sin respaldo`.

No hay ningún sitio donde se elija un valor por encima de otro. `## Contradicciones`
dice «el redactor tiene que explicar el matiz en el artículo en vez de elegir un
número», y está pedido. Las otras dos contradicciones —ventilador y relleno— también
están resueltas con matiz y no con una elección.

### 5 · ¿Todas las URLs de `sources` y las citadas en el cuerpo están en `wiki/raw/`?

Las nueve de `sources`: sí, las nueve con el mismo `url` en el frontmatter del fichero
crudo correspondiente, y ninguna repetida.

En el cuerpo hay una URL que no: **el issue 11914 de PrusaSlicer**, línea 96. **No lo
cuento como fallo.** Es lo que se pregunta, así que explico el razonamiento entero:

1. **La afirmación que sostiene esa frase sí está cocinada y con fuente.**
   `wiki/cooked/warping-pla.md`, líneas 53-57: el fallo parecido pero distinto —
   separaciones en las juntas por cambios de firmware o de PrusaSlicer, que afectan
   también a PLA que antes no daba problemas —, atribuida a Neophyl en el hilo del foro
   de Prusa. Ese hilo sí está en `wiki/raw/` y sí está en `sources`.
2. **La URL de GitHub no se cita como fuente: es un puntero.** Aparece literalmente
   dentro del crudo ya capturado, en `wiki/raw/warping-pla-prusa-forum-warping-at-corners.md`,
   línea 68, porque es lo que Neophyl escribió en su post. El redactor no se inventó la
   URL: la copió del cooked, que a su vez la copió del crudo.
3. **La wiki no ha ingerido esa URL**, así que no debe estar en `sources`. Y no lo está.
   Ahí está bien.

Lo que sí pediría, sin bloquear nada: que quede claro visualmente que es un enlace al
rastreador de incidencias y no una fuente más del artículo, porque un lector puede
tomarlo por lo segundo. Si el fallo de este tipo fuera «citar una URL que nadie ha
abierto», aquí no se da: la URL es contenido del crudo, no una fuente nueva.

## Lo de las dos vueltas anteriores

- **Fallo 1 de la revisión 1 (la cuantificación inventada):** sigue corregido. Ya no
  dice «el error más frecuente». Dice «es un error documentado con nombre y apellidos»,
  que es lo que sostiene un hilo con sus cifras.
- **Fallo 2 de la revisión 1 (la humedad fuera de apartado):** sigue corregido, y en la
  capa correcta. El cocinero lo movió a `## Afirmaciones` con su fuente y el artículo
  no tuvo que cambiar nada.
- **Fallo 3 de la revisión 1 (los enlaces a páginas inexistentes):** ha vuelto a caer.
  Es el fallo 4 de este informe.

## Notas que no bloquean

- **El defecto de fondo de esta vuelta no es del redactor.** Los tres fallos
  bloqueantes nacen en `wiki/cooked/warping-pla.md`: dos hilos de foro fundidos en una
  afirmación, «in Fusion» convertido en «en el laminador», y un enclosure sin tapa con
  espuma que no existe en el hilo. El artículo coincide con el cooked, que es
  exactamente lo que debe hacer, y por eso **ninguna revisión del artículo podía haberlo
  detectado sin abrir el crudo**.
- **De ahí una sugerencia de método, que es lo que más útil sale de aquí.** Cuando una
  afirmación venga de un foro, el `revisor` debería abrir el fichero crudo de ese hilo y
  comprobar que la frase está dentro. Tres afirmaciones de este artículo no casan con su
  fichero crudo, y las tres son de foro. Cooked y artículo pueden coincidir perfectamente
  y estar los dos equivocados.
- **El diagnóstico diferencial sigue siendo lo mejor del artículo.** La tabla de tres
  filas que separa warping de separaciones entre capas no está copiada de ninguna fuente:
  es síntesis, y es la parte que más valor da.
- **La sección «Qué puede salir mal» tiene contenido real** y ha crecido: siete casos,
  seis de ellos con cifras y con fuente.
- **Ninguna de las frases prohibidas.** No hay «en resumen», «es importante destacar»,
  «cabe destacar» ni nada parecido. La prosa se calibra en dos momentos («lo dejamos
  dicho», «no queremos resumir en una línea») y son aceptables.
- **El apartado de enclosure y el de relleno están bien resueltos**, con el matiz que
  pedía el cooked. Lo que falla ahí es el caso concreto del enclosure, no el
  razonamiento.
- **El panel de campos del frontmatter** (`warpingRisk`, `riskLevel`) es la primera vez
  que un artículo lo trae. Está bien puesto y no estorba.

## Resumen para el redactor

Tres de los seis fallos no se arreglan aquí. Dos necesitan el cocinero:

1. **Bloqueante.** «Chaflanar la arista en el laminador» → «chaflanar las aristas en
   Fusion». Tres sitios: líneas 79-80, 265-266 y 285-286. Requiere que el cocinero corrija
   antes `wiki/cooked/warping-pla.md` líneas 38-39.
2. **Bloqueante.** Los radios de 3 mm son de Elias Spors en *Warping at corners*, no de
   Lichtjaeger y Zakalawe. Separar los dos hilos y no montar una cadena causal que no
   dice ninguna fuente.
3. **Bloqueante.** El enclosure «sin tapa, con espuma de embalaje pegada» no está en el
   hilo. Quitarlo del artículo; el cocinero debería quitarlo también del cooked.
4. **Importante.** Quitar los tres wikilinks a páginas inexistentes (líneas 99, 322 y
   326) y dejarlos como texto, o escribir esas páginas.
5. **Menor.** «síntimo» → «síntoma» (línea 282).
6. **Menor.** Quitar «Nada de esto lleva a la cuenta de material» (líneas 299-300) o
   marcarlo como alcance del artículo.

Los puntos 1, 2 y 3 son de la capa cocinada. Si el cocinero no los arregla, el
redactor no puede publicar la mitad del artículo sin volver a publicar las mismas tres
cosas.
