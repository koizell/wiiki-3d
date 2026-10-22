# Revisión de la partición del resumen (19 guías)

**Veredicto global: RECHAZADO** — 12 guías con fallo, de los cuales **1
bloqueante**.

No es una guía: es una revisión transversal. La partición del `resumen` de las 19
guías que lo tienen partido, contra el contrato («una frase») y contra las
fuentes.

La partición es **mecánicamente impecable**: en las 19 guías el corte cae en
frontera de frase, ninguno queda a medias, ninguno deja el `resumenExtra`
empezando por una conjunción sin sujeto, y en `wiki/raw/` no hay ni una
abreviatura partida («M6.», «S.»). El problema no es el corte: **es que el corte
dejó en la mitad visible la frase que menos información lleva.**

## Comprobaciones

| # | Comprobación | Resultado |
|---|---|---|
| 1 | El corte es natural | PASA — 19/19 en frontera de frase, sin fragmentos huérfanos |
| 2 | La primera frase sola es buen resumen | FALLA — 12/19 repiten el `sintoma` que la tarjeta ya enseña |
| 3 | La segunda frase no repite ni contradice | FALLA — 1 guía (`stringing`) afirma una distinción que sus fuentes niegan |
| 4 | Las dos mitades con respaldo en `wiki/raw/` | FALLA — 1 guía (`stringing`); `temperatura-cama` se contradice a sí misma |
| 5 | `resumenExtra` en su sitio y orden de lectura | PASA — `GuiaRoute.tsx:305`, dentro del `<details>` y antes de `entrada`, en las 19 |

## El fallo de fondo: la frontera quedó en el lado equivocado

El `resumen` visible es **más corto que el de las 14 guías que no se tocaron**, y
lo que dice es el síntoma que la tarjeta ya enseña en el `<h3>`:

| guía | `sintoma` (h3 de la tarjeta) | `resumen` (línea de la tarjeta) | largo |
|---|---|---|---|
| `adhesion-primera-capa` | La base no se pega a la cama | **La base no se pega.** | 19 |
| `warping-pla` | Las esquinas se levantan de la cama | **Las esquinas se levantan.** | 25 |
| `malla-de-cama` | La primera capa se pega a trozos | La adhesión va y viene por zonas. | 33 |
| `elephant-foot` | La base sale más ancha que arriba | La base sale más ancha que el resto. | 36 |
| `flow-rate` | Huecos o exceso de material en las líneas | Hay huecos entre líneas o material de sobra. | 44 |
| `agujeros-ovalados` | Los agujeros salen más pequeños o elípticos | **Los agujeros salen más pequeños o elípticos.** | 44 |
| `despegue-a-mitad` | La pieza se despega o tumba a mitad | La pieza se despega, tumba o se desmorona a mitad. | 50 |
| `separaciones-entre-capas` | Las capas se sueltan por dentro | Las capas se sueltan por dentro y la base está plana. | 53 |
| `max-volumetric-speed` | Subextrusión o atascos a alta velocidad | La pieza se subextruye o se atasca sólo a alta velocidad. | 57 |
| `stringing` | Hilos finos entre piezas o goteo de la boquilla | Hilos finos entre piezas o goteo **constante** de la boquilla. | 58 |
| `tolerancias-y-encaje` | La pieza no sale a medida o no encaja | La pieza sale más grande o más pequeña de lo diseñado, o no encaja con otra. | 76 |

La tarjeta del índice pinta las tres líneas seguidas
(`WikiIndexRoute.tsx:154-156`): `sintoma` como título, `titulo` debajo, `resumen`
como descripción. En esas once, las dos primeras líneas dicen lo mismo que la
tercera, con otras palabras. En `agujeros-ovalados` son **la misma frase dos
veces**, con punto y todo.

La referencia de estilo está en las 14 guías que no se tocaron:

```
altura-capa          Qué altura de capa poner según lo que buscas: detalle, tiempo o resistencia, y el límite que impone la boquilla.
enclosure-y-warping  Cerrar o abrir la puerta del enclosure, y qué temperatura de cámara buscar, según tu filamento, tu chapa y tu habitación.
temperatura-hotend   Qué temperatura de boquilla poner según el material, y cómo distinguir si un defecto es la temperatura o es otra cosa.
torre-temperatura    Cómo calibrar la temperatura de boquilla con una torre: qué mide, cómo configurarla en cada slicer y cómo leer el resultado.
```

Esas responden «**qué va a hacer esta guía por mí**». Las once de la tabla
responden «**qué te pasa**» — que es el `sintoma`. Media del `resumen` tras la
partición: **99,3 caracteres**; media de las 14 intactas: **128**. Y la media del
`resumenExtra` es **111,4**: la mitad escondida es hoy, de media, más larga que
la visible.

La consecuencia práctica: **lo que de verdad resume la guía está en el
desplegable**, y lo que se ve a un vistazo es un titular que repite el que ya
estaba encima.

## Fallos, con dónde y qué hacer

### 1 · Bloqueante · `stringing` — la segunda mitad afirma una distinción que las tres fuentes niegan

**Dónde:** `src/content/guias/stringing.ts:18`, `resumenExtra`.

**Qué dice:** «Distingue stringing de oozing y ajusta retracción, temperatura y travel speed en el orden correcto.»

**Por qué falla:** la primera mitad está respaldada: Simplify3D publica ese orden
exacto (distancia de retracción → velocidad de retracción → temperatura → *avoid
crossing outline* → velocidad de movimiento), y está en
`wiki/cooked/stringing-retraccion.md:89-93`. La otra mitad no. **Las tres
fuentes de esta guía dicen que stringing y oozing son lo mismo**:

- `wiki/raw/stringing-simplify3d-print-quality.md:22` — «Stringing (otherwise known as oozing, whiskers, or "hairy" prints) occurs when small strings of plastic are left behind…»
- `wiki/raw/temperatura-hotend-prusa-stringing-and-oozing.md:13` — «Stringing or oozing, also known as "hairy prints"…»

Y el grep de `wiki/raw/` entero por «drip», «blob», «not moving», «stationary» no
devuelve ni una fuente que defina el oozing como goteo sin movimiento. La guía no
trae la distinción de ningún sitio: se la da a sí misma, y su propia tarjeta «Qué
es el oozing» (`stringing.ts:128-141`) cita a Simplify3D describiendo **el mismo
fenómeno** que su tarjeta anterior llama stringing.

Por qué es bloqueante y no una nota: la afirmación llega al `description`
publicado (`src/lib/seo.ts:98` concatena `resumen` + `resumenExtra`), y contradice
la cita que la propia guía pone en su primera tarjeta.

**Qué hacer:** reescribir la segunda mitad **alrededor de lo que las fuentes sí
dicen**, y revisar el `diferencial.contra` entero, que también está construido
sobre esa distinción.

### 2 · Importante · La frontera está en el lado equivocado en once guías

**Qué hacer:** reescribir el `resumen` en el estilo de las 14 intactas («Qué…»,
«Cómo…», o la tesis de la guía).

**Mover la frontera no basta:** la segunda mitad es hoy una instrucción al
lector («Antes de compensar, mide el error…»), no un resumen; si se la sube al
`resumen` el `description` publicará un imperativo en vez de una descripción.

### 3 · Importante · `temperatura-cama` — «seis cifras» contra «cinco apariciones»

**Dónde:** `resumen` (l. 34) frente a la tarjeta de las cifras (título, cuerpo y
`cifra.nota`).

**Qué dice el resumen:** «El PLA admite seis cifras de cama y todas son ciertas».
**Qué dice la tarjeta:** el título es «Las seis cifras del PLA…» — pero su cuerpo
termina «**Son cinco apariciones**» y su `cifra` lleva la nota «**cinco cifras**
para un solo material».

El recuento real que sostiene la guía son **seis apariciones** (Bambu por chapa
×2, Bambu por filamento, el objetivo 55–65 de su página de warping, Prusa tabla
50–60, Prusa ficha 60, OrcaSlicer 50–60), pero la tarjeta sólo enumera cinco y su
lista de cifras (`35 · 50 · 55 · 60 · 65 °C`) **se salta el 45** y no cuenta el 55
que sí está.

**Qué hacer:** decidir el número —seis— y arreglar la tarjeta: que el cuerpo
cuente las seis y que la `cifra` liste los seis números (`35 · 45 · 50 · 55 · 60 ·
65 °C`). El «seis» está respaldado en `wiki/raw/`; el «cinco», no.

### 4 · Menor · `malla-de-cama` — «la malla» no se presenta hasta dos párrafos después

El `titulo` no se pinta en la cabecera, así que el orden real de lectura es: `h1`
→ resumen → desplegable → **«La malla…»**. La malla aparece por primera vez en la
`entrada`, que va después.

### 5 · Menor · `voladizos-y-soportes` — el paralelismo roto

«a decidir si necesitas soportes **o** con refrigeración y orientación es
suficiente.» El «o» une un subjuntivo con un nominal. La misma construcción está
en el `para` de la variable `ángulo`.

### 6 · Menor · `esquinas-petg` — «ensombrece» se puede leer al revés

Si se lee como «PETG tapa el warping del PLA» dice lo contrario de lo que la guía
sostiene: la tarjeta dice que el PETG queda «justo por encima» del PLA en riesgo
de warping, y `wiki/cooked/esquinas-petg.md:56` lo confirma.

### 7 · Menor · `tpu-flexible` — el resumen repite literalmente la primera frase de la entrada

## Notas que no bloquean

- **La partición no perdió una palabra.** El diff del commit `8d3c39f` lo
  demuestra: en los 19 ficheros la línea `-` del `resumen` es exactamente la
  concatenación de la línea `+` del `resumen` y la línea `+` del `resumenExtra`.
  `git show 8d3c39f` no toca ni una palabra. El problema es de reparto, no de
  contenido.
- **`verify:guias` pasa 1091/1091.** La comprobación automática verifica que el
  `resumen` es una frase; no verifica que esa frase diga algo. El defecto de este
  informe es invisible para el script.
- **Tres del `resumenExtra` son defendibles sin cambios**, y son el modelo de lo
  que debería ser la primera mitad: `ventilador-warping`, `secar-filamento` y
  `z-seam`.
- **`stringing` tiene un problema anterior y más grave que la partición**: su
  `diferencial.contra` es «stringing en viajes, oozing constante, temperatura
  alta y filamento húmedo», y el `diferencial` es lo que el redactor escribió para
  *separar* este problema del de al lado. Si la distinción no está en las
  fuentes, el diferencial entero está construido sobre ella.
- **Daño de texto ajeno a la partición, en `separaciones.ts`**: la tarjeta
  «desacuerdo» tiene la palabra corrupta «ambosacted» y la tarjeta «hilos» mezcla
  inglés («sin-improvement», «Oídos así»). Viene del script de acortamiento, no de
  la partición, pero está en la misma zona de la guía. **Corregido** el
  2026-10-21.
- **`voladizos-y-soportes`, `agujeros-ovalados` y `elephant-foot` comparten el
  mismo final** («la compensación mueve el contorno, no cura la causa»). Es el
  patrón de una plantilla, no una coincidencia.
