# Brief — `altura-capa`

Fecha: 2026-10-08. Fase de ingesta, octavo tema. Modo: `ingest`.

## Decisión editorial

**Pregunta:** qué altura de capa poner, y qué cambia entre una fina y una gruesa:
detalle, tiempo y resistencia. Y el límite que impone la boquilla.

**Público:** quien está eligiendo la altura de capa de un perfil, o tiene una pieza que
sale con poca resolución, tarda demasiado o se rompe por las capas, y no sabe si eso es
la altura.

**Alcance:** la altura de capa y sus consecuencias —resolución visible, tiempo de
impresión, unión entre capas— y el límite de la boquilla. **Quedan fuera:** la primera
capa (→ `adhesion-primera-capa`), el warping (→ `warping-pla`), la temperatura de
boquilla (→ `temperatura-hotend`, sin escribir) y la separación entre capas (→
`separaciones-entre-capas`).

**Decisión que el lector debe poder tomar:** qué altura de capa usar para lo que va a
imprimir, y si el defecto que ve es la altura o es otra cosa.

**Producto principal:** matriz contextual —altura frente a boquilla, resolución y
tiempo— **más** un diferencial que separa «es la altura» de «es el ajuste».

## Estructura

1. **Diferencial.** Lo que la altura de capa explica de un defecto y lo que no: una
   superficie con escalones frente a una superficie con huecos o rebabas. `siNo` →
   `warping-pla`.
2. **Variables.** Propuesta: `altura` (necesaria) y `boquilla` (el diámetro, que pone el
   techo). `verify:guias` rechaza cualquiera que sea decorativa.
3. **Conocimiento.** La relación entre altura, boquilla y resolución; el efecto en el
   tiempo; y qué pasa con la unión entre capas.
4. **Reglas.** Qué altura para qué, y el límite con la boquilla.
5. **Fuera de alcance.** Los cuatro destinos de arriba.

## Campo del panel: `layerHeight` (opcional)

`layerHeight` es **opcional** en `ProjectMetadata`, así que la guía lleva una sección que
contesta **por qué el slicer puede no haberlo escrito**. Declara `campos: ['layerHeight']`
y su entrada en `src/lib/wiki-campos.ts`.

## Fuentes

Tres candidatas verificadas hoy (200 y con cuerpo real), todas dentro de los dominios
registrados:

| URL | Qué trae |
|---|---|
| `https://wiki.bambulab.com/en/software/bambu-studio/layer-height` | Qué es la altura de capa y cómo se ajusta en Bambu Studio |
| `https://help.prusa3d.com/article/layers-and-perimeters_1748` | Capas y perímetros: la relación con la boquilla y la resolución |
| `https://help.prusa3d.com/article/variable-layer-height-function_1750` | La altura de capa variable (adaptativa) |

El recolector puede añadir alguna más de los **dos dominios registrados**
(`wiki.bambulab.com` y `help.prusa3d.com`); no de foros ni de otros sitios.

**Hueco declarado:** All3DP es el único sitio con cifras de resistencia por altura de
capa, y su HTML no trae el texto del artículo. Si ninguna fuente del lote da la
resistencia en números, se dice que falta, no se inventa.

## Gate específico de este tema

Además de las reglas del plan:

1. **El techo de la boquilla es una regla con su margen.** Si la fuente da «hasta el
   75 % del diámetro» (o similar), se publica con su número y su fuente; no se
   redondea a «no pases de la mitad».
2. **Menos altura no es «mejor».** Es más detalle a cambio de más tiempo, y con un
   efecto en la unión entre capas que la fuente acota. No se vende como mejora.
3. **La resistencia, si no está en números, no se inventa.** Un «más capas, más unión»
   sin cifra se publica como lo que es.
4. **La altura variable es una función, no una altura.** Si la fuente la describe, se
   distingue del ajuste de altura fija.
5. **Ninguna cifra de temperatura ni de cama se repite aquí.** Son de otras guías.

## Lo que esta guía NO debe ser

Una tabla de alturas sin decisión. El valor está en **relacionar la altura con la
boquilla y con lo que se busca** —detalle, tiempo o unión— y en separar lo que la
altura explica de lo que no.

## Prueba de utilidad

Antes de aprobarla, debe responder o declarar fuera de alcance tres escenas:

1. Una figura pequeña con curvas que sale con escalones visibles.
2. Una pieza funcional que se parte justo por una capa, no por la pared.
3. Un perfil con boquilla de 0,4 mm y altura de 0,32 mm.

No se escriben las respuestas esperadas de antemano. Se comprueba que la página permita
decidir, o que diga con claridad que no hay evidencia suficiente.
