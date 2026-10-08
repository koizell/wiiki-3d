# Brief — `temperatura-hotend`

Fecha: 2026-10-08. Fase de ingesta, noveno tema. Modo: `ingest`.

## Decisión editorial

**Pregunta:** qué temperatura de boquilla poner, y qué cambia entre una baja y una alta:
unión entre capas, acabado y fluidez.

**Público:** quien está eligiendo la temperatura del hotend de un perfil, o tiene piezas
frágiles entre capas, hilos, o una superficie que sale con rebabas o sin brillo, y no sabe
si eso es la temperatura.

**Alcance:** la temperatura del hotend y sus consecuencias —unión entre capas, acabado,
fluidez— por material. **Quedan fuera:** la temperatura de cama (→ `temperatura-cama`), la
altura de capa (→ `altura-capa`), la separación entre capas como fallo (→
`separaciones-entre-capas`), el material en sí (→ `material`) y los voladizos (→
`voladizos-y-soportes`).

**Decisión que el lector debe poder tomar:** qué temperatura poner para su material, y si
el defecto que ve es la temperatura o es otra cosa.

**Producto principal:** matriz contextual —temperatura de boquilla por material— **más** un
diferencial que separa «está fría» de «está caliente».

## Estructura

1. **Diferencial.** Los dos extremos: una temperatura demasiado baja (unión débil,
   sub-extrusión) frente a una demasiado alta (hilos, rebabas, descolgado). `siNo` →
   `separaciones-entre-capas`.
2. **Variables.** Propuesta: `material` (necesaria) y `temperatura` (dónde estás ahora).
   `verify:guias` rechaza cualquiera que sea decorativa.
3. **Conocimiento.** La tabla de temperaturas por material; qué hace subirla o bajarla; y
   el efecto en la unión entre capas.
4. **Reglas.** Qué temperatura para cada material, y qué ajustar según el síntoma.
5. **Fuera de alcance.** Los cinco destinos de arriba.

## Campo del panel: `hotendTemp` (opcional)

`hotendTemp` es **opcional** en `ProjectMetadata`, así que la guía lleva una sección que
contesta **por qué el slicer puede no haberlo escrito**. Declara `campos: ['hotendTemp']` y
su entrada en `src/lib/wiki-campos.ts`.

## Fuentes

Una candidata nueva, verificada hoy (200 y con cuerpo real), y dos **reutilizadas** que ya
están en `wiki/raw/` —no se vuelven a descargar—:

| URL | Estado |
|---|---|
| `https://wiki.bambulab.com/en/filament-acc/filament/slice-param` | **Nueva** (200) |
| `https://wiki.bambulab.com/en/general/filament-guide-material-table` | Ya en `wiki/raw/` (`material-bambulab-material-table.md`): tabla de temperatura de boquilla por material |
| `https://help.prusa3d.com/article/layer-separation-and-splitting-fdm_1806` | Ya en `wiki/raw/` (`separaciones-entre-capas-prusa-kb-layer-separation-and-splitting-fdm.md`): la temperatura como causa de la unión débil |

El recolector debe **buscar más** dentro de los dos dominios registrados (`wiki.bambulab.com`
y `help.prusa3d.com`) hasta llegar a 3–5 fuentes nuevas, sobre todo una que dé el efecto de
la temperatura en la unión entre capas con algún dato, no sólo con una afirmación.

## Gate específico de este tema

Además de las reglas del plan:

1. **La temperatura de un material es un rango, y cada fabricante tiene el suyo.** Si Bambu
   y Prusa dan rangos distintos para el PLA, se publican los dos con su fuente; no se
   promedian.
2. **La misma palabra, dos cosas.** La temperatura que pide el fabricante para el filamento
   no es la que el slicer escribió en el G-code; si el dato del archivo cae fuera del rango,
   se dice, no se corrige.
3. **Subir la temperatura no es «mejor unión» sin más.** Mejora la unión entre capas a
   cambio de más hilos y peor acabado en voladizos; la fuente acota el trueque y se publica
   con su matiz.
4. **Una torre de temperatura es un procedimiento, no un ajuste.** Si la fuente la propone,
   se explica como lo que es.
5. **Ninguna cifra de cama ni de altura de capa se repite aquí.** Son de otras guías.

## Lo que esta guía NO debe ser

Una tabla de temperaturas sin decisión. El valor está en **relacionar la temperatura con el
síntoma** —unión, hilos, acabado— y en decir cuándo el problema es la temperatura y cuándo
no.

## Prueba de utilidad

Antes de aprobarla, debe responder o declarar fuera de alcance tres escenas:

1. PLA a 200 °C con las capas que se separan al doblar la pieza.
2. PETG a 250 °C con hilos por todos lados.
3. Un G-code cuyo `hotendTemp` está 15 °C por debajo del rango del fabricante.

No se escriben las respuestas esperadas de antemano. Se comprueba que la página permita
decidir, o que diga con claridad que no hay evidencia suficiente.
