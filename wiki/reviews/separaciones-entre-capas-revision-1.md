# Revisión de separaciones-entre-capas (primera vuelta)

**Veredicto: RECHAZADO** — 4 fallos, de los cuales 2 bloqueantes.

Artículo revisado: `src/content/wiki/separaciones-entre-capas.md` (404 líneas en el
momento de esta vuelta)
Material cocinado: `wiki/cooked/separaciones-entre-capas.md`
Fuentes crudas: siete en `wiki/raw/` — cinco `separaciones-entre-capas-*`, más
`warping-pla-prusa-forum-warping-at-corners.md` y
`temperatura-cama-prusa-kb-filament-material-guide.md`

## Comprobaciones

| # | Comprobación | Resultado |
|---|---|---|
| 1 | Afirmaciones con respaldo | **FALLA** — 1 afirmación sobre las fuentes contradicha por `wiki/raw/` (línea 231), y 1 cuenta heredada del recolector que el crudo no sostiene (línea 307) |
| 2 | Contradicciones internas | **FALLA** — el artículo dice «las seis fuentes» y el frontmatter lista siete (línea 284) |
| 3 | Relleno y frases de IA | **PASA** |
| 4 | Longitud y estructura | **PASA** — ≈2.550 palabras (estimadas, ver abajo) |
| 5 | Citas correctas | **PASA con una reserva menor** — las 27 citas literales están todas en `wiki/raw/`, las 7 URLs existen como `url:`, ninguna repetida, primera cita en la línea 45; tres llevan apóstrofo recto donde el crudo trae tipográfico |

## Los ocho puntos del encargo: los ocho están bien

| # | Punto | Estado |
|---|---|---|
| 1 | Las tres cifras de boquilla | **PASA** — tabla de tres filas (218-222), cada una con su origen y su función; el 195-220 sin unidad; y escrito explícitamente que «el KB nunca dice que 185 °C sea demasiado poco» (235-238). Ninguna se usa como corrección de otra |
| 2 | El 50-60 °C es de cama | **PASA** — línea 247-252: identifica las dos cifras de la fila como boquilla y cama, dice que el KB no da cifra de cama, y manda a `temperatura-cama`. Comprobado en crudo: `grep` de `bed\|°C` en el KB da tres coincidencias y ninguna es temperatura de cama |
| 3 | La frase prohibida | **PASA** — aparece sólo en «Qué puede salir mal» (343) como el error que no hay que escribir, con la versión estrecha que sí aguanta |
| 4 | La trampa del ventilador | **PASA** — líneas 138-148 y 350-352: el consejo de subir ventilador y alargar retracción se cita como de voladizos, se dice de qué problema habla y se explica por qué no es contradicción |
| 5 | El issue 11914 | **PASA** — citado en el cuerpo (línea 324) con la atribución a Neophyl y enlazado al hilo del foro. Su URL de GitHub **no** está en `sources`: `grep '11914'` en `wiki/raw/` la encuentra sólo en el cuerpo de `warping-at-corners.md:68`, nunca como `url:` de frontmatter |
| 6 | Las citas literales | **PUNTO** — ver fallo 4. Las ocho correcciones que se describen como hechas **no están en el artículo** |
| 7 | Sin `campo` | **PASA** — no lo declara, y el comentario del frontmatter que lo justifica es exacto: `docs/plan-de-contenido.md` nombra campo en los artículos 1, 3, 4, 5, 7, 8 y 9, y los dos que no lo nombran son el 2 (este) y el 6 (`enclosure-y-warping`). También es cierto que `layerHeight` es de `altura-capa` (plan, §7) y que `warpingRisk`/`riskLevel` son de `warping-pla` (`src/lib/wiki-campos.ts:47-48`) |
| 8 | Los dos `[[warping-pla]]` y ninguna afirmación de campo | **PASA** — líneas 111 y 392. Y el artículo no afirma en ningún sitio que explique un campo del panel: el punto 1 de la sección de slicer dice justo lo contrario («Este campo no trae ningún veredicto de adhesión») y el punto 3 declara que ninguna fuente dice qué claves escribe cada laminador |

## Fallos, con dónde y qué hacer

### 1 · Bloqueante · Afirmación sobre las fuentes que el crudo contradice

**Dónde:** sección «De dónde sale cada número de boquilla», líneas 231-233, y su
repetición en 236-238.

**Qué dice:** «Que no coincidan no es un descuido de Prusa: **el KB de separación entre
capas no cita la tabla de materiales**, y la tabla de materiales no menciona la
separación entre capas. Son dos documentos que se pisan en el número y no se citan entre
sí.» Y dos líneas después: «**como los dos documentos no se citan, no hay una versión
corregida del otro**».

**Por qué falla:** el KB sí remite a las guías de material.
`wiki/raw/separaciones-entre-capas-prusa-kb-layer-separation-and-splitting-fdm.md:27`
termina su párrafo de ABS así:

> `...You can check the material guides for choosing the best material for your print.`

`grep -E 'material guide'` en ese fichero da dos coincidencias: la del cuerpo (línea 27)
y la de las notas del recolector (línea 73). La segunda mitad de la afirmación sí es
cierta —`grep` de `separation|adhesion|crack|de-lamin|layer` en
`temperatura-cama-prusa-kb-filament-material-guide.md` da cero resultados—, pero la
primera mitad, tal como está escrita, es falsa, y es la que sostiene la conclusión de las
líneas 236-238.

Es el mismo mecanismo que las cuatro fabricaciones de `warping-pla`: el artículo y el
cocinado coinciden por construcción, y el cocinado repite la afirmación sin haber mirado
el cuerpo de la fuente que estaba al lado.

**Qué hacer:** cambiar «no cita» por lo que el crudo sostiene. Por ejemplo: el KB da su
propio rango para el PLA y **no lo toma de la tabla**; lo único que hace es remitir a las
guías de material, y lo hace en el párrafo del ABS, para elegir con qué material
imprimir. La conclusión —no elegir una cifra, explicar las dos— se mantiene intacta,
porque el KB no dice «véase la tabla» para la temperatura.

### 2 · Bloqueante · Contradicción interna con el frontmatter

**Dónde:** sección «Por qué tu slicer puede no escribir este dato», línea 284-285.

**Qué dice:** «Ninguna de las **seis fuentes** de este artículo dice qué claves escribe
cada laminador ni en qué condiciones aparece el dato en el archivo.»

**Por qué falla:** `sources` tiene **siete** URLs (líneas 8-14): las dos páginas de Prusa
KB, la de Bambu, los tres hilos de foro y la tabla de materiales. La afirmación sobre lo
que las fuentes no dicen es correcta; el número no. Cualquier lector que mire el
frontmatter lo ve.

**Qué hacer:** «siete fuentes». De paso, la misma línea 291 dice «Las fuentes de foro de
este lote son **las dos** únicas que cuentan un caso de principio a fin», y hay tres
fuentes de foro: el propio artículo usa la tercera más abajo (línea 320, «el hilo de 2024
de las esquinas arrugadas»), así que la frase se contradice veinte líneas después. Vale
«los dos hilos de capas» o «los dos hilos que cuentan un caso de separación de principio
a fin».

### 3 · Importante · «Dos veces» donde el crudo lo dice una

**Dónde:** sección «Los dos hilos», líneas 307-309.

**Qué dice:** «Todo eso es **una sola fuente de foro**, y además es la lectura de una
imagen que el propio autor califica **dos veces** de baja resolución.»

**Por qué falla:** en
`wiki/raw/separaciones-entre-capas-prusa-forum-layer-separation-delamination-help.md` la
observación sobre la resolución aparece **una vez**, en la cuarta intervención de Naugh
(`:69`): «The photo doesn't have very high resolution, but this is what you can mainly
see». La otra coincidencia de `grep 'photo|picture|resolution'` es la línea 55, «A photo
would help diagnose the problem», que es una petición de foto, no un juicio sobre su
calidad. El «dos veces» viene de las notas del recolector (`:129`), que lo dice dos veces
y no lo respalda; el cocinado lo hereda (`:442-443`) y el artículo lo hereda de ahí.

La sustancia —el diagnóstico es una lectura de una foto de baja resolución— es correcta y
está bien marcada. Sólo el número no.

**Qué hacer:** «califica de baja resolución», sin «dos veces». Y si el recolector lo
cree, la nota de `:129` también está mal, aunque `wiki/raw/` no se toca: se anota y se
deja para el siguiente ciclo.

### 4 · Menor · Tres citas literales no coinciden carácter a carácter

**Dónde:** líneas 171, 198, 206 y 300.

**Qué dice / qué hay en el crudo:**

| Artículo | Crudo |
|---|---|
| `Increase your printer's flow rate` (171) | `Increase your printer's flow rate` (`…layer-separation…:33`, apóstrofo tipográfico) |
| `when there's any sort of cold air` (206) | `when there's any sort of cold air` (`…layer-separation…:23`) |
| `The issue still persists so I'll post it` (300) | `The issue still persists so I'll post it` (`…delamination-help…:87`) |
| `from the 'old days' of unheated print-beds` (198) | `from the "old days" of unheated print-beds` (`…layer-separation…:13`) |

**Por qué no es grave:** no cambia una palabra ni una cifra, y no es ninguno de los
cuatro patrones de fabricación. Las comillas simples anidadas dentro de «» son además
convención española correcta para citar una fuente que usa dobles.

**Por qué lo anoto igual:** el encargo dice que en este turno se corrigieron ocho citas en
este sentido, y **`grep '’'` sobre el artículo devuelve cero resultados**: la corrección
no está en el fichero. Las que sí son correctas son las de `bobstro`, porque ese fichero
crudo las lleva rectas (`you're`, `I don't`, `I've`), y esas están bien como están. Las
citas del hilo de 2026 y del KB de Prusa son las que hay que rehacer.

**Qué hacer:** `you’re`, `there’s`, `I’ll` en las tres citas afectadas. La de `'old days'`
se puede dejar como está si se acepta la convención de anidado, pero conviene que sea una
decisión y no un descuido.

## Lo que he comprobado y sale bien, para que no haya que rehacerlo

- **Las 27 citas literales** del artículo están en `wiki/raw/`. He verificado fragmento a
  fragmento: las dos definiciones, el criterio del corte limpio, la de Bambu del atasco,
  las cinco cifras de correa (250/275/±15/240/290) con su frase de «arbitrary number
  inversely proportional to the motor load», el `LCD Menu -> Support -> Belt Status`, los
  cuatro métodos de Bambu con sus cuatro cifras, el 195-220 sin unidad, los 5 °C de Prusa,
  el 5-10C de bobstro, la regla del 80 %, el descarte de altura de jaychatt, la torre de
  Naugh con sus 205/205-210/220-230, el cierre de newgen, y la cita de Neophyl con el
  11914. **Ninguna cita cruza salto de línea problemático:** los tres ficheros de foro y el
  KB de Prusa están partidos, pero ningún fragmento citado queda partido en el artículo.
- **Atribución, persona por persona.** Cada nombre está en la intervención correcta:
  Naugh en la torre y en el *sweet spot*, newgen en el cierre, jaychatt en el descarte de
  altura, bobstro en las tres citas suyas, Neophyl en el 11914. No hay ningún caso como el
  de los radios de 3 mm.
- **Tiempo verbal.** Los dos hilos se cuentan como no cerrados, y el 220-230 se cita como
  recomendación, no como resultado, en los tres sitios donde aparece (líneas 222, 244-245 y
  354-356). No hay ningún condicional convertido en pasado.
- **Las contradicciones internas que el encargo señalaba:** las tres del cocinado están
  explicadas y no resueltas en silencio. La nº1 (qué subir) ocupa cinco párrafos con el
  matiz de los cuatro puntos; la nº2 (las tres cifras) tiene tabla y tres párrafos; la nº3
  (warping sí o no) se abre acknowledging la afirmación de Prusa, se marca como mecanismo
  típico en las líneas 66-69, y se cierra en «Qué puede salir mal» con la versión estrecha.
- **El `50-60 °C`** sale de la fila `PLA | No, -, No | 185-235 °C, 50-60 °C`
  (`temperatura-cama-prusa-kb-filament-material-guide.md:14`), y la atribución de las dos
  cifras a boquilla y cama la sostiene la cabecera de la tabla, `TEMPERATURES (Nozzle,
  Bed)`. La columna de hardware `No, -, No` es literal y su glosa («sin enclosure, sin
  drybox y sin boquilla endurecida») es exacta frente a `HARDWARE (Enclosure, Drybox,
  Hardened nozzle)`.
- **Enlaces.** `grep '](/wiki/'` en el artículo: cero resultados. Los seis enlaces internos
  son `[[slug|texto]]`. `grep` de las seis frases de IA: cero resultados.
- **Relleno.** Ningún párrafo existe sólo para existir; los párrafos de una línea hacen
  trabajo estructural y los de datos llevan cifra o antes/después.

## Notas que no bloquean

- **El 60 % de ventilador no está marcado como de ABS en el crudo.** El artículo (líneas
  191-192) dice que «los 150 y 100 mm/s y el 60 % de ventilador están escritas **para
  ABS**», y el cocinado dice lo mismo «textualmente». En el crudo, «with ABS» aparece
  sólo en la frase de las velocidades (`bambu…:39`); el 60 % del paso 3 no lleva material
  (`bambu…:45`). El efecto práctico es el mismo —las dos cifras son de una página que no
  menciona el PLA—, pero la atribución al ABS del 60 % es una inferencia, no una cita.
- **«Los pasos de 5 °C no resolvieron aquel caso»** (líneas 242 y 355-356) es una
  inferencia, no un dato del hilo: newgen no dice que los probara, y su lista de descartes
  no los incluye. Viene del cocinado (`:380-383`), que lo dice igual. La conclusión
  práctica —el 220-230 explica por qué el KB no cerró ese caso y no lo respalda— no cambia,
  pero «no resolvieron» presume un intento que nadie reporta.
- **«Todas consultadas el 2026-10-04»** (línea 404): seis de las siete se capturaron ese
  día; la tabla de materiales se capturó el `2026-10-03`
  (`temperatura-cama-prusa-kb-filament-material-guide.md:6`).
- **El rango de la tabla de Prusa se cita como «el KB nunca dice que 185 °C sea demasiado
  poco»** y eso está bien. Sólo quiero dejar escrito que es una afirmación negativa
  comprobada: `grep` del KB no encuentra ningún 185.

## Lo que no he podido comprobar

- **El recuento de palabras.** No hay forma de ejecutar `wc` en este entorno, así que mi
  cifra es un muestreo: 13 palabras por línea de prosa (contadas en dos párrafos) × unas
  196 líneas ≈ **2.550 palabras**. Triplica el mínimo de 800 con cualquiera de las
  convenciones, así que el margen no compensa el riesgo de un error de conteo.
- **`npm run verify:wiki`**, que es lo que comprueba en el navegador los enlaces de
  Markdown y la tabla de campos. Lo que sí he comprobado a mano es que no hay ni un
  `](/wiki/` en el artículo y que la lista de `wiki/cooked/` no promete páginas que el
  redactor no haya nombrado: nombra `capas-desplazadas` y `flow-rate`, y el artículo los
  nombra a los dos en «Si te interesa».
- **La existencia de `temperatura-cama`, `capas-desplazadas` y `flow-rate`**, que no he
  mirado porque un `[[slug]]` a una página que aún no existe no es un fallo.

## Conclusión

El artículo hace bien las ocho cosas difíciles que este lote pedía: las tres cifras de
boquilla no se mezclan, el 50-60 °C es de cama, la frase prohibida aparece sólo como
error, la trampa del ventilador va con su contexto, el 11914 no está en `sources`, el
`campo` falta a propósito y con la explicación comprobada, y los dos `[[warping-pla]]`
están. La resolución de las tres contradicciones es lo mejor del texto.

Lo que no aguanta son dos afirmaciones sobre las fuentes, y las dos son del mismo tipo:
cosas que el artículo y el cocinado repiten y que el crudo no sostiene. Una se ve con un
`grep` de una línea; la otra, contando el `sources` de su propio frontmatter. Las dos se
arreglan cambiando una frase, y ninguna toca las tres cifras ni los dos hilos. Cuando
vuelvan, sólo hay que volver a mirar esas dos contra `wiki/raw/`.

---

## Nota posterior a la redacción de este informe

Este fichero se escribió después de la vuelta, al rellenar el hueco que dejaba el número 1.
**El cuerpo es el informe de la vuelta 1 tal como se dio entonces**: no se ha corregido
ni reinterpretado a la vista de lo que se arregló después. Se añade aquí sólo el estado
posterior, para que quien lea los dos informes no los lea como contradictorios.

- **Los cuatro fallos están corregidos en el artículo.** El texto actual
  (`src/content/wiki/separaciones-entre-capas.md`, 413 líneas) dice «el KB da su propio
  rango para el PLA y **no lo toma de la tabla**» (línea 234), «Ninguna de las **siete**
  fuentes de este artículo» (línea 291), «califica de baja resolución» sin número
  (línea 316), y lleva los tres apóstrofos tipográficos (`printer’s` en la 171, `there’s`
  en la 209, `I’ll` en la 308). La vuelta 2 recogió todo eso y añadió un fallo menor
  propio —el reparto de fechas del pie—, que a su fecha seguía sin corregir. El pie
  actual (líneas 412-413) ya dice «Cinco consultadas el
  2026-10-04; el hilo de las esquinas arrugadas y la tabla de materiales de Prusa, el
  2026-10-03».
- **El fallo 4 se marcó por el sitio equivocado, y esto es lo que hay que aprender de
  él.** Las ocho correcciones de comillas y apóstrofos existían, pero estaban hechas en
  `wiki/cooked/`, no en el artículo: el redactor no había copiado los fragmentos
  corregidos al escribir. Mi `grep '’'` sobre el artículo era la comprobación correcta y
  el resultado, también; lo que hice mal fue describirlo como «las correcciones no están
  en el fichero», sin comprobar antes dónde se habían hecho. La lección es la contraria
  de la que parecía: cuando una corrección de la que me han avisado no aparece donde la
  miraba, el sitio sospechoso es la capa intermedia, no que la corrección no exista. Y un
  apéndice: el `I've` recto de la línea ~321 **es correcto**, porque
  `separation-of-layers-in-middle-of-print.md:44` lo trae recto también —marcarlo habría
  sido un rechazo falso—.
- **El cocinado tenía el error del fallo 1, y lo ha corregido el cocinero después**, en
  este mismo momento. `wiki/cooked/separaciones-entre-capas.md` ya no contiene «el KB de
  separación entre capas no cita la tabla de materiales» ni «no se citan entre sí», y el
  60 % de ventilador ya aparece marcado como inferencia en lugar de «dicha para ABS»
  (`:73` y `:278`, con el enunciado de `:487` ajustado a las dos velocidades). Es decir:
  el artículo y el material cocinado caían los dos en el mismo error, y los dos lo han
  tenido que arreglar por su cuenta. Es el argumento de siempre para que la comparación
  sea contra `wiki/raw/` y no entre las dos capas.
- **`wiki/reviews/` queda con las dos vueltas.** Este fichero es la vuelta 1; la vuelta 2
  está en `separaciones-entre-capas-revision-2.md` y cita estos cuatro fallos. Quien
  vuelva a este tema ya no tiene el hueco del que habla AGENTS.md.