# Revisión de temperatura-cama

**Veredicto: APROBADO** — las cinco comprobaciones pasan, con dos notas que no
bloquean y un defecto que pertenece a otro artículo.

Artículo revisado: `src/content/wiki/temperatura-cama.md`
Material cocinado: `wiki/cooked/temperatura-cama.md`
Fuentes crudas: cinco en `wiki/raw/`, todas `temperatura-cama-*`

## Comprobaciones

| # | Comprobación | Resultado |
|---|---|---|
| 1 | Afirmaciones con respaldo | PASA — 18 cifras rastreadas una a una |
| 2 | Contradicciones internas | PASA — las tres explicadas, ninguna resuelta por decreto |
| 3 | Relleno y frases de IA | PASA — ninguna de la lista |
| 4 | Longitud y estructura | PASA — 2 372 palabras, un `h1`, 11 `h2` |
| 5 | Citas correctas | PASA — 5 de 5 URLs presentes en `wiki/raw/` |

## Lo que sí se comprobó, y cómo

**Las cinco URLs de `sources` están en `wiki/raw/`.** Comprobado sobre los ficheros,
no sobre la lista de candidatos del plan: las cuatro que dio `help.prusa3d.com` y la
de OrcaSlicer aparecen como `url:` en su fichero.

**Las dieciocho cifras del artículo salen del material cocinado.** Sestres cada
número de forma mecánica: 0 °C, 30–35 ℃, 35 °C, 35–45 ℃, 35–65 °C, 40 °C, 45 °C,
45–65 ℃, 5 °C, 5-10 °C, 50 °C, 50–60 °C, 50–60 °C, 5–10 °C, 60 °C, 60–80 ℃, 65 °C y
70 °C. Cero sin respaldo.

**Las tres citas textuales se compararon con la fuente viva**, no con lo que decía el
fichero de `wiki/raw/`. La de Bambu sobre la cámara, la de OrcaSlicer sobre el Tg y la
de Prusa sobre el incremento salen literales. Una cita que se ha transcrito mal es
indistinguible de una correcta cuando las dos están en el mismo fichero.

**Las frases prohibidas: cero.** De la lista completa, ninguna aparece.

## La contradicción, que es lo difícil de este artículo

Es el punto que más merece revisión, porque es donde un artículo de wiki elige número
y sale adelante.

El artículo **no elige**. Abre poniendo las cuatro cifras en una tabla, dice que las
cuatro caben a la vez, y explica por qué: la segunda tabla de Bambu separa por chapa, y
los rangos de Prusa y OrcaSlicer caen dentro del tramo de la Textured PEI mientras que
el 35 °C está en el otro extremo de la misma fila. La conclusión que escribe es «60 °C
puede ser correcto, estar justo y quedarse corto, según qué chapa tengas encima», que
es lo que pedía el material cocinado.

También deja las dos discrepancias que quedan sin resolver, marcadas como tales:

- **El 65 °C del foro contra el 50–60 °C de Prusa.** El artículo no promedia y no
  descarta ninguno: dice que el hilo responde a un problema que ya tenías y la tabla al
  valor de partida, y avisa de que copiar el 65 a una Cool Plate sale por el otro
  extremo.
- **El 60 °C del PLA aparece dos veces con dos significados**, uno sobre la pieza y otro
  sobre la cama. El artículo lo dice con una advertencia explícita en un bloque de cita,
  y es exactamente el tipo de trampa que hace que un lector cite la cifra equivocada.

## Las tres notas, que no bloquean

### 1 · Una glosa del redactor sobre la temperatura de transición

El artículo define la temperatura de transición como «el punto en que pasa de rígido a
blando», y esa definición **no está en ninguna de las cinco fuentes**. La fuente sólo da
la regla: «subtract 5–10 °C to estimate a safe upper limit for bed temperature». El
enlace que OrcaSlicer pone detrás, con la explicación, no se pudo resolver porque el
destino no aparece como URL legible en el HTML servido, y está anotado en
`## Sin respaldo`.

Es una glosa de conocimiento común y sin cita, en una frase que no se presenta como
cita. **Se deja**, porque sin ella la regla no es utilizable, pero queda dicho que esa
definición la pone el redactor y no la fuente.

### 2 · El artículo no menciona dos cosas que el material cocinado sí trae

La de Bambu sobre el pegamento en Engineering Plate, y los 190–240 °C de boquilla del
PLA. La segunda está marcada en el cocinado como `[FUENTE PARA OTRO ARTÍCULO]`, y está
bien que no aparezca aquí: `hotendTemp` tiene su propio artículo en el plan.

La del pegamento no es de otro artículo, pero es un dato y no un argumento —la celda
pone «Glue Required» y la página no explica por qué—, así que omitirlo es
correcto.

### 3 · Cuatro de los ocho enlaces cruzados están pendientes

[[enclosure-y-warping]], [[material]], [[separaciones-entre-capas]] y
[[adhesion-primera-capa]] no existen todavía, y el renderizador los pinta como texto
con marca punteada en vez de como enlaces. Los otros dos —[[warping-pla]] y el segundo
[[warping-pla]]— resuelven.

Comprobado contra el DOM, no contra el Markdown: no sale ningún `href` a una página
inexistente.

## Un defecto que NO es de este artículo

**`wiki/cooked/warping-pla.md`, línea 206, dice una cosa que es falsa.** Afirma que la
tabla de materiales de Prusa «sale **aplastada en texto plano** y no es usable», y lo
pone en `## Tirado` como fuente descartada.

No es cierto. La página no trae **ninguna** etiqueta `<table>`: son 0. La monta con
`div` y atributos de ARIA, y las celdas se extraen por `role="cell"`. Con ese método
salen las 18 filas de material con sus cifras, y el PLA da 185-235 °C de boquilla y
**50-60 °C de cama**.

Lo comprobé dos veces: una por el atributo de ARIA y otra por la búsqueda de los
valores, y coinciden. El fichero que lo deja escrito está en este lote:
`wiki/raw/temperatura-cama-prusa-kb-filament-material-guide.md`.

Y el error se propagó: `src/content/wiki/warping-pla.md` dice, en su artículo, que
«el texto sale aplastado y no la hemos podido leer con fiabilidad». **El artículo
afirma algo falso sobre una fuente que sí se puede leer.**

Por qué no lo he corregido aquí: `wiki/cooked/` y `src/content/wiki/warping-pla.md` son
salida de otro ciclo del pipeline, y ese artículo ya pasó revisión. Corregirlo desde
este trabajo sería saltarme al cocinero y al revisor del otro tema, que es
exactamente lo que la frontera entre capas existe para impedir.

**Lo que hace falta es una segunda vuelta del pipeline sobre warping-pla**, con esta
fuente ya en `wiki/raw/`, el cocinero quitando la línea de `## Tirado` y el revisor
volviendo a mirar el artículo. Es trabajo de quince minutos y es la clase de cosa que
este sistema está montado para cazar.

## Resumen

Aprobado. El artículo no inventa ninguna cifra, cita textualmente donde cita, explica
las tres discrepancias en vez de escolher en ellas, y trae la sección que el campo
opcional `bedTemp` obliga a traer —con cuatro razones distintas por las que el dato
puede faltar, y marcando como dato interno lo que no está en ninguna fuente, que es
justo lo que hace falta para que un revisor externo no lo tome por una cita.
