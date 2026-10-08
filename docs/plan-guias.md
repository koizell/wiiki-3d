# Wiki 3D: el formato guía y cómo se construye

Fecha: 2026-10-05. Estado: **implementado y verificado**, con tres guías escritas.
Predecesor: [`plan-de-contenido.md`](plan-de-contenido.md), que es el backlog
histórico de artículos y queda superado en su premissa.

---

## 1. Lo que cambió, y por qué

Había cuatro artículos de entre 5.600 y 7.900 palabras. Salían de un material
cocinado de 8.500 a 19.900 palabras por tema, así que la información estaba; lo que
fallaba era la **forma**.

El artículo de warping tenía 5.627 palabras y un índice con nueve entradas largas.
Para responder «¿las esquinas de mi PLA se levantan por la cama o por el
ventilador?» había que leerlo entero, y el orden de lectura no era el orden de la
pregunta. La primera acción útil —comprobar que es warping y no separación entre
capas— estaba en la sección cuarta, después de tres párrafos de contexto.

Y su contenido era casi todo estructura: «estas cuatro cosas no son warping», «estas
dos fuentes se contradicen en X», «esto no lo resuelve la capa Y». En un muro de
texto, esa estructura desaparece: un párrafo que enumera cuatro fallos se lee como
una enumerated más, no como cuatro salidas. En una tarjeta es su forma natural.

**La decisión: el artículo deja de ser prosa y pasa a ser un instrumento.**

## 2. El formato

Una guía no es un texto. Es un **fichero de TypeScript** en
`src/content/guias/<slug>.ts` que cumple `src/content/guias/tipos.ts`.

Y es TypeScript por una razón concreta, que no es el pemeriksaan de tipos:
**la guía calcula**. Su última etapa es una lista de acciones que depende de lo que
quien lee ha declarado, y eso no se puede escribir como prosa. En Markdown, «si usas
la Cool Plate sube la cama a 35–45 °C» es un artículo con tres ramas escritos como
tres párrafos que hay que leer los tres. Aquí es una línea.

La alternativa descartada era un `.md` con YAML anidado, que habría exigido escribir un
parser del subconjunto que la página necesita y que nadie comprobaría.

### Las cuatro etapas, y por qué en este orden

| # | Campo | Qué es |
|---|---|---|
| 1 | `diferencial` | Tres preguntas que distinguen este problema del de al lado, cada una con sus dos caras. Y una salida: si la respuesta es «no», un enlace a la guía que sí lo es. |
| 2 | `variables` | Lo que la persona declara: material, chapa, tamaño, dónde está la impresora. Las marcadas `necesaria` se preguntan primero. |
| 3 | `conocimiento` | Tarjetas con su cifra y su cita, **filtradas** por las variables: la fila de la Textured PEI no aparece si marcaste la Cool Plate. |
| 4 | `reglas` | Condiciones `cuando → acción → valor → porqué → fuente → alcance`, ordenadas. Se calculan. |

El diferencial va primero por una razón de coste: subir la cama de un warping que en
realidad es una separación entre capas no arregla nada, y la única forma de saberlo
antes de tocar nada es el diferencial.

### Lo que hace y no hace el motor

`src/lib/guias.ts` es lógica pura, sin React, y se prueba en Node con
`npm run verify:guias`.

**La condición es estricta**: una regla sale sólo si *todas* las variables de su
condición están contestadas y todas coinciden. La alternativa —aplicarla con lo que se
sepa— daría una recomendación que cambia según lo que el usuario se ha acordado de
contestar, que es peor que no dar ninguna: es una recomendación que parece
personalizada y no lo está.

De ahí sale la propiedad que hace la página viva: **la guía se llena mientras lees**.
Cuantas más variables declaras, más tarjetas y más acciones aparecen.

`fueraDeAlcance` no es decorativo. Es lo que hace que lo de arriba sea creíble: una
guía que dice qué *no* resuelve y a dónde llevar el caso es más útil que una que lo
cubre todo sin decirlo.

## 3. Lo que se interconecta

Cuatro sitios, todos comprobados por `npm run verify:wiki`:

1. **El panel de análisis → la guía.** El panel dice «Riesgo de warping, 35 %» y el
   enlace de debajo lleva a la guía que explica ese 35 %. Vive en
   `src/lib/wiki-campos.ts`, y `verify:wiki` lo contrasta con las guías de verdad en
   las dos direcciones.
2. **El diferencial → la otra guía.** Es el punto de salida de equivocarse. warping
   lleva a separaciones y al revés.
3. **Dentro de una tarjeta y de «esto no lo resuelve».** La tarjeta de la temperatura
   de cama lleva a warping, porque subir la cama es una de las cinco acciones de
   aquélla.
4. **El analizador → la guía.** Con un G-code cargado, `material` y `bedTemp`
   aparecen ya marcados. La guía no inventa el dato: lo lee del análisis, y si el
   slicer no escribió el campo, se queda sin contestar en vez de rellenarlo.
   `precontestar()` en `lib/guias.ts`; 6 comprobaciones en `verify:guias`.

## 4. El pipeline

Las tres capas y los cuatro agentes no cambian. Cambia lo que produce el redactor.

```text
wiki/raw/          recolector   internet, inmutable. Ya hay 23 fuentes de 4 temas.
wiki/cooked/       cocinero     afirmaciones con contexto, contradicciones, alcance.
                              Ya hay 4 temas: 8.500-19.900 palabras cada uno.
src/content/guias/ redactor     un .ts tipado por tema.  ← LO QUE CAMBIA
wiki/reviews/      revisor      informe acumulativo, nunca sobrescrito
```

### Lo que el redactor escribe ahora

No un artículo. Un `Guia`. Y el orden de trabajo es el inverso al del artículo:

| Antes | Ahora |
|---|---|
| Empezaba por el mecanismo, para tener material. | Empieza por el **diferencial**: qué dos problemas se confunden y cómo se distinguen mirando. |
| Las cifras iban dentro de frases. | Cada cifra es un par `valor` + `nota`, y la nota es el **alcance**. |
| Las contradicciones se explicaban en un párrafo largo. | Cada regla lleva `alcance`, que es una categoría distinta del `porque`. |
| Los enlaces cruzados eran `[[slug]]` en Markdown. | Son `enlaza: { guia, etiqueta }`, y `verify:guias` falla si la guía no existe. |
| «Lo que este artículo no resuelve», en prosa al final. | `fueraDeAlcance`, que la página pinta como tres tarjetas y de las que dos llevan enlace a la otra guía. |

`.opencode/agents/redactor.md` tiene que cambiar en consecuencia. Si no cambia, el
redactor sigue produciendo Markdown y el pipeline deja de encajar con la web, que es
un fallo silencioso: la guía nueva no aparece.

### Lo que no se toca

`wiki/raw/` sigue siendo inmutable. El stdin de la política no cambia: los conflictos
entre proveedores se **declaran y se acotan**, nunca se promedian ni se resuelven por
gusto. `docs/plan-scraping-conocimiento.md` sigue vigente para la fase de
adquisición; este documento no lo sustituye, acota qué se hace con lo que llega.

## 5. El contrato que hace que no se rompa

`npm run verify:guias` — 72 comprobaciones, sin navegador, sobre el motor y las cuatro
guías. Comprueba cosas que una captura no enseña:

- Ninguna condición apunta a una variable que no existe, y ningún valor de condición
  es imposible.
- **Ninguna variable es decorativa**: si se pregunta algo que no cambia el resultado, la
  guía engaña. Esta comprobación encontró dos variables muertas en el primer borrador.
- Cada variable **cambia el resultado en algún montaje**, no necesariamente aislada.
- Ningún enlace interno apunta a una guía inexistente.
- La chapa cambia la cifra de cama, porque esa es la razón de existir de la guía.
- `PLA-CF` no se confunde con `PC` en el mapeo del material.

`npm run verify:wiki` — 93 comprobaciones con navegador. Lo que ahora importa es lo
interactivo: que marcar una variable añada acciones, que cambiarla las recalcule, que
volver a pulsarla la desmarque, que el carril cuente lo mismo que la página, y que el
`siNo` del diferencial lleve a la guía que dice y **no arrastre las respuestas de la
anterior**.

`npm run verify:seo` — 55. El JSON-LD pasó de `Article` a `HowTo`, y **no lleva
`datePublished`**: no hay dato de cuándo se escribió cada guía, e inventar una fecha es
peor que no ponerla porque Google la lee y nadie puede comprobarla.

## 6. Backlog

Las guías escritas cubren el material cocinado disponible:

| Guía | Material cocinado | Estado |
|---|---|---|
| `warping-pla` | 8.510 palabras | escrita, con su cifra por chapa |
| `separaciones-entre-capas` | 9.325 palabras | escrita, con el desacuerdo Prusa/Bambu declarado |
| `temperatura-cama` | 12.548 palabras | escrita, con las seis cifras del PLA |
| `adhesion-primera-capa` | **19.929 palabras** | escrita, y es la que mejor justifica el formato |
| `enclosure-y-warping` | 3.117 palabras | escrita (5.ª guía), con el dibujo nuevo `camara` y la matriz de cámara por filamento |

**Los cuatro temas cocinados del plan inicial están escritos.** Después llegó un quinto,
`enclosure-y-warping`, ya cocinado y también escrito: la siguiente guía vuelve a necesitar
material cocinado nuevo, así que el recolector tiene que traer fuentes antes de que el
cocinero tenga algo que cocinar.

### Por qué `adhesion-primera-capa` es la mejor prueba del formato

Su propio material cocinado dice, en su primera línea de resumen, que **ninguna de sus
ocho fuentes escribe un orden de comprobación**. Hay cuatro listas de causas y las
cuatro son sin prioridad, y la única prioridad escrita en todo el lote es «antes del
pegamento, considera el ala».

Eso es justo lo que un artículo en prosa no puede decir sin mentir. Si redactas una guía
en orden de pasos, quien lee **asume** que ese orden viene de las fuentes. Aquí el orden
es nuestro y está declarado como tal en la propia etapa 4, y la única posición que sí
está escrita —la calibración de primera capa primero en la lista de factores de
infraextrusión— se publica **con su encabezado «Common factors» al lado**, porque esa
lista responde a otra pregunta y cinco de sus seis elementos no son de adhesión.

Además es la única con **dos ramas de fallo en el mismo síntoma**: apretar la boquilla
para forzar la adhesión hace que el filamento no pueda empujarse, y la pieza sale
infraextruida. El síntoma no es que no pegue: es que sale frágil. Quien aprieta está
**cambiando de fallo**, y la fuente lo dice con un imperativo.

Después, y sólo con material cocinado nuevo: material, altura de capa, temperatura de
hotend, flujo, desplazamiento. Cada tema pasa el ciclo entero antes de empezar el
siguiente durante el piloto.

### Lo que encontró la cuarta guía

`adhesion-primera-capa` hizo trabajar a las comprobaciones por primera vez de verdad, y
encontró **cinco fallos reales** en un fichero que acababa de escribirse:

1. **Dos reglas que no podían dispararse**: una pedía una variable que la guía no
   declaraba, y otra pedía un valor de material que no era ninguna de sus opciones.
   Ninguna habría salido nunca en la pantalla.
2. **Dos variables decorativas**: `chapa` y `perfil` se preguntaban pero sus opciones no
   cambiaban nada. La de `chapa` era además un error de contenido: la tarjeta del 0,04 mm
   se enseñaba con cualquier chapa montada, y la fuente no dice que exista un descenso
   equivalente para las otras.
3. **Una regla con dos condiciones en un solo objeto**, que TypeScript rechaza con TS1117.
   Reveló que la regla estaba usando el material para acotar algo que depende del grosor
   de la chapa y no del material.
4. **Y un tipo demasiado estricto**: `cuando` era obligatorio, con el principio «sin
   condición no es una regla», que resultó ser falso. Hay reglas legítimamente
   generales —«recalibra al cambiar de chapa» depende del grosor— y escribirlas como
   `cuando: { chapa: [las cinco] }` es no filtrar mientras aparenta que sí. La regla
   general legítima explica en su `alcance` por qué no puede condicionarse, y
   `verify:guias` avisa si hay alguna sin esa explicación.
5. **52 apariciones de `**` que salían literales.** La negrita carga significado —casi
   siempre en `alcance`, marcando el matiz que separa una afirmación acotada de una
   general— y se veía como `**no puede detectar qué chapa está instalada**`, con los
   asteriscos dentro de la frase. Ahora hay un componente de ocho líneas que la
   interpreta con nodos de texto de React, sin `innerHTML`, y una comprobación que avisa
   si un campo que **no** se interpreta con él lleva `**`.

Lo último tiene una consecuencia de método que ha salido dos veces en este trabajo:
**una comprobación que no se ha visto fallar no está comprobada.** La del riel
—«nada se sale de su columna»— pasó en verde contra el CSS roto que la había creado,
porque `overflow-wrap: anywhere` existe *justamente para no desbordar*: parte la palabra
para que quepa. Lo que se veía era una columna de una letra de ancho, no un
desbordamiento. Y la segunda versión, que ya medía líneas, siguió pasando porque
`parseFloat('normal')` devuelve `NaN` y `NaN > 4` es `false`. Sólo se consiguió una
comprobación real midiendo las dos versiones y poniendo el umbral entre lo que da la
sana y lo que da la rota.

### Criterio de suficiencia de una guía

No es extensión. Es: **¿alguien puede tomar una decisión después de leerla?** Y en el
caso de este formato, algo más: cada variable que se pregunta tiene que cambiar
algo. Es lo que `verify:guias` mide, y es el mejor predictor de que una guía no sea
un texto decorativo.

## 7. Lo que quedó fuera

- **El layout.** `verify:layout` sigue fallando en la aserción del visor a 640×360
  (144 px contra 150). Es deuda documentada en `docs/estado.md`, anterior a este
  trabajo, y no se ha tocado el visor 3D.
- **No hay contador de readership ni analítica.** Nadie sabe si esto se lee, y no se
  va a inventar un número.
- **El campo `dibujo`** es obligatorio en el tipo y hay seis esquemas escritos. Una
  séptima guía con un `dibujo` que no exista no compila, que es exactamente lo que
  queríamos: un dibujo nuevo es trabajo, y no se puede escribir un texto sin él.