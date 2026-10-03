# Mediciones de los candidatos de layout de 768–1199

Las mediciones que cerraron la decisión del reparto de altura entre 768 y 1199 px.
Están aquí como **registro histórico**: explican por qué el código es como es.

## Qué contienen

Once alternativas a `grid-template-rows: auto minmax(0, 1fr) minmax(0, 1fr)`, cada
una medida en 8–16 viewports con un STL real cargado y con un G-code real, en
los tres tramos que importan.

## La decisión que cerraron

**Ganó la E**: `aspect-ratio: 16/10` en el visor y el documento como scroll, en
lugar de repartir la altura de la ventana entre el visor y el panel.

| candidato | visor mín | modelo mín | panel mín | doc scrollea | recortado |
|---|---|---|---|---|---|
| A · `1fr 1fr` (el que estaba) | 165px | 127px | 160px | no | no |
| B · suelo `minmax(40dvh, 1fr)` en la fila | 165px | 127px | 160px | no | no — **no-op exacto** |
| C · `1.5fr 1fr` | 225px | 173px | 160px | no | no |
| D · `auto minmax(0,1fr) auto` | **50px** | 38px | 571px | no | panel inalcanzable |
| **E · `aspect-ratio` + doc scroll** | **313px** | **241px** | **489px** | sí | no |
| F · rail de 64px, lado a lado | 464px | 258px | — | no | no (aspect 0.41–1.1) |
| G · `16/10` con panel como resto | 313px | 241px | **0px** | no | no |
| H · `4/3` con panel como resto | 375px | 288px | **0px** | sí | no |
| I · suelo en `.viewer-3d-container` | 300px | 231px | 220px | no | **sí** |
| K · suelo en la fila + cromo `134px` | 300px | 231px | **85px** | no | no |
| K3 · K con cap 2:1 | 267px | 205px | 118px | no | no |

## No hay que re-litigar esta decisión

Los scripts están aquí para entender el porqué, **no para volver a comparar**. Si
alguien cambia el layout de 768–1199, el sitio para medir es `scripts/verify/`
(`npm run verify:layout`), que mide contra el código actual.

## Los dos scripts que son trampas

Vuelven a ser tentadores porque parecen la solución obvious. No lo son.

**B — un suelo en `dvh` en la fila no hace nada.** El `fr` ya reparte más espacio
del que el suelo pide, así que la pista nunca llega al mínimo. Medido: los ocho
viewports dan exactamente los mismos números que A. La variante L de
`propuesta2.mjs` lo confirma por el otro lado: quitar el `134px` de cromo devuelve
166 px, otra vez ≈ A.

**I — un suelo en `.viewer-3d-container` recorta el visor.** El visor reclama más
alto del que su fila tiene, y `.canvas-area { overflow: hidden }` lo recorta en
silencio. Peor: `Viewer3D` dimensiona el renderer con `clientHeight`, así que el
modelo se encuadra contra un alto que el usuario no ve. El suelo tiene que ir en
la fila **contando el cromo**, o en ningún sitio.

## Cómo se midió el tamaño del modelo

La columna «modelo» es la proyección del modelo a píxeles, replicando la
aritmética de `frameCamera` en `src/components/Viewer3D.tsx:260-263` — está en
`frame.mjs` y, actualizado, en `modelPixels()` de `../../probe.mjs`.

El punto clave: `limitingFov = Math.min(verticalFov, horizontalFov)`, así que en
un visor **ancho** el limitante es el vertical, el modelo se encuadra a la altura
y ocupa el 77% de ella. El tamaño en pantalla escala lineal con el alto del
visor. Por eso un candidato que sólo mejore la proporción sin aumentar el alto no
sirve de nada.

## Advertencia importante

**Estos scripts miden contra el código de aquel momento, no contra el actual.**

Medían el `.viewer-container` con la clase `viewer-container--fill`, que ya no
existe (se absorbió a `.viewer-container`), y el `App.tsx` con los `<label>` que
hoy son `<button>`. Sus números **no son reproducibles** sobre el código actual y
no deben usarse como línea base para comparar nada.

Para el estado del layout hoy: `npm run verify:layout`.

## Ficheros

| Script | Qué midió |
|---|---|
| `frame.mjs` | Réplica de `frameCamera`: qué FOV limita y cuántos píxeles ocupa el modelo |
| `candidatos.mjs` | A, B, C, D, E, F — 8 viewports × 2 estados |
| `candidatos2.mjs` | G, H, I — nacieron de los hallazgos de los anteriores |
| `propuesta.mjs` | La variante de E con suelo en `dvh`, y su versión sin acotar |
| `propuesta2.mjs` | C y K, y el control L que demuestra que B es no-op |
| `propuesta3.mjs` | K2 (K con suelo de panel) y E refinada |
| `final.mjs` | Comparación final E vs K en 16 viewports, incluidos ≥1200 |

## Dependencias del sistema

Iguales que los del `../README.md`: el Chromium necesita `libnspr4`, `libnss3` y
`libasound2`, y hay que exportarlo.

```bash
export LD_LIBRARY_PATH=/tmp/chromium-deps/root/usr/lib/x86_64-linux-gnu
```

## Por qué están versionados

Porque `aspect-ratio: 16/10` en un rango de ancho concreto no se explica solo.
La próxima persona que lea esa regla va a preguntarse por qué 16/10, y por qué en
ese tramo y no en otro. Estos scripts son la respuesta, y son la única respuesta
que no sea «lo decidió alguien».