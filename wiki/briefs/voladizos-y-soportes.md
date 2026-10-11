# Brief — `voladizos-y-soportes`

Fecha: 2026-10-08. Fase de ingesta, séptimo tema. Modo: `ingest`.

## Decisión editorial

**Pregunta:** por qué cuelga un voladizo, cuándo hacen falta soportes de verdad, y qué se
puede esperar de la cara que apoya sobre ellos.

**Público:** quien ve un voladizo que se descuelga o una superficie rugosa justo encima de
los soportes, y no sabe si el problema es el ángulo, la refrigeración o los propios soportes.

**Alcance:** voladizos, ángulo máximo sin soporte, y soportes (cuándo y con qué coste en la
cara apoyada). **Quedan fuera:** la primera capa (→ `adhesion-primera-capa`), el warping
(→ `warping-pla`), la humedad y el stringing (→ `material`), y la temperatura de boquilla
(→ `temperatura-hotend`, sin escribir).

**Decisión que el lector debe poder tomar:** si su voladizo necesita soportes o se arregla
con refrigeración y orientación, y qué esperar de la cara que queda encima de los soportes.

**Producto principal:** diagnóstico diferencial —voladizo que cuelga frente a soportes que
fallan frente a cara apoyada rugosa— **más** la matriz de ángulos y las reglas de soporte.

## Estructura

1. **Diferencial.** Tres fallos que se ven parecidos: el voladizo se descuelga (ángulo o
   refrigeración), el soporte no sostiene o se separa, y la cara que apoyaba sale rugosa.
   `siNo` → `warping-pla`.
2. **Variables.** Propuesta: `voladizo` (el ángulo más crítico) y `soporte` (si usas soportes
   o no). `verify:guias` rechaza cualquiera que sea decorativa.
3. **Conocimiento.** Qué ángulo aguanta sin soporte, cómo ayuda la refrigeración, y qué
   determina la calidad de la cara apoyada (separación soporte-pieza, tipo de interfaz).
4. **Reglas.** Añadir soportes a partir de cierto ángulo, ajustar refrigeración, orientar la
   pieza, y las decisiones que afectan a la cara apoyada.
5. **Fuera de alcance.** Los cuatro destinos de arriba.

## Campos del panel: `hasOverhangs` y `overhangAngle` (los dos opcionales)

Los dos son **opcionales** en `ProjectMetadata`, así que la guía lleva una sección que
contesta **por qué el slicer puede no haberlos escrito**: no todos los G-code traen el
ángulo, y «Soportes en el perfil: No» no es «la pieza no tiene voladizos». Declara
`campos: ['hasOverhangs', 'overhangAngle']`, cada uno anclado a la variable o tarjeta que lo
explica, y sus entradas en `src/lib/wiki-campos.ts`.

## Fuentes

Tres candidatas verificadas hoy (200 y con cuerpo real), y una reutilizada:

| URL | Qué trae |
|---|---|
| `https://wiki.bambulab.com/en/filament-acc/filament/print-quality/overhang` | Ángulos, refrigeración y cuándo hacen falta soportes |
| `https://help.prusa3d.com/article/failing-supports_1807` | Soportes que fallan: por qué y qué hacer |
| `https://help.prusa3d.com/article/bad-looking-surface-above-supports_1803` | La cara que apoya sobre soportes: por qué sale rugosa |
| `wiki/raw/adhesion-primera-capa-prusa-kb-skirt-and-brim.md` | Ya en `raw` (la usa `adhesion-primera-capa`); **no se vuelve a descargar** |

El recolector puede añadir alguna más de los **dos dominios registrados**
(`wiki.bambulab.com` y `help.prusa3d.com`); no de foros ni de otros sitios, que no están en
`wiki/policy/sources.json`.

## Gate específico de este tema

Además de las reglas del plan:

1. **Un ángulo de referencia no es una garantía.** Si la fuente da un ángulo como «hasta
   aquí sin soportes», se publica con su condición (boquilla, refrigeración, material).
2. **La cara apoyada nunca sale igual que una cara libre.** Si la fuente lo dice, se dice;
   no se promete una cara limpia que la fuente no promete.
3. **Voladizo y puente no son lo mismo.** Un puente va de apoyo a apoyo; un voladizo, no. Si
   la fuente los distingue, se distinguen.
4. **«Falla el soporte» no es «el soporte sobra».** Se separan las causas del soporte de las
   del voladizo.
5. **Ninguna cifra de temperatura de boquilla ni de cama se repite aquí.** Son de otras guías.

## Lo que esta guía NO debe ser

Una tabla de ángulos sin decisión. El valor está en **separar los tres fallos** —voladizo,
soporte y cara apoyada— porque se ven parecidos y no se arreglan igual.

## Prueba de utilidad

Antes de aprobarla, debe responder o declarar fuera de alcance tres escenas:

1. Un voladizo a 60° sin soportes que se descuelga.
2. Soportes que se separan de la pieza a media impresión.
3. La cara que apoyaba sobre soportes sale rugosa y el usuario quiere que salga lisa.

No se escriben las respuestas esperadas de antemano. Se comprueba que la página permita
decidir, o que diga con claridad que no hay evidencia suficiente.
