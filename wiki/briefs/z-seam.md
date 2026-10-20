# Brief — `z-seam`

Fecha: 2026-10-19. Fase de ingesta, lote 1 del ciclo C1, **tercera guía del lote**.
Modo: `ingest`.

## Decisión editorial

**Pregunta:** qué es la costura Z, por qué se nota, cómo se coloca para que se vea menos
y cuándo el defecto que se ve **no** es la costura.

**Público:** quien ve una línea o un bulto vertical en la pieza y no sabe si es la
costura, la retracción, la Elephant's foot o un cambio de temperatura.

**Alcance:** la **costura Z** —qué es, por qué aparece, cómo afecta al acabado y a la
resistencia, y qué se puede hacer con ella—. **Quedan fuera:** el warping (→
`warping-pla`), la Elephant's foot (→ `elephant-foot`), la retracción y los hilos (→
`stringing`), las juntas entre capas (→ `separaciones-entre-capas`), el flujo (→
`flow-rate`), las paredes y los perímetros (→ `paredes-y-perimetros`), el modo *spiral
vase* (→ `relleno-patrones`) y la orientación de la pieza (→ `orientacion-resistencia`).

**Decisión que el lector debe poder tomar:** si lo que ve es la costura, y qué tiene que
cambiar para que se note menos —o si tiene que mirar otra cosa.

**Producto principal:** una matriz **dónde está la costura ↔ qué se nota y por qué**,
más un diferencial que separa «es la costura» de «es otra cosa».

## Estructura

1. **Diferencial.** La costura frente a lo demás: una línea vertical constante frente a
   un bulto, una grieta o una capa que se separa. `siNo` → `separaciones-entre-capas` (si
   son capas que se sueltan) o → `elephant-foot` (si el bulto está en la base).
2. **Variables.** Propuesta: `material` (necesaria) y `posicion` (dónde está la costura:
   lateral, en una esquina, oculta, o en el fondo). `verify:guias` rechaza cualquiera que
   sea decorativa: si una variable no cambia ninguna regla, no se declara.
3. **Conocimiento.** Qué es la costura y por qué existe (el punto donde acaba y empieza
   cada capa); por qué se nota más en un material que en otro; qué la hace más visible
   (la altura de capa, la retracción, la temperatura de la pared exterior, el número de
   perímetros); las posiciones en las que se puede colocar y qué se gana con cada una.
4. **Reglas.** Qué hacer según el material y la posición: dónde colocar la costura para
   que no estorbe, qué ajuste la hace menos visible, y cuándo la costura es normal y no
   hay nada que arreglar.
5. **Fuera de alcance.** Los ocho destinos de arriba.

## Campo del panel: ninguno, y una variable que lee `material`

`material` **ya está tomado** por la guía `material` en `src/lib/wiki-campos.ts`, y un
campo no puede apuntar a dos guías (`verify:wiki` lo comprueba). Esta guía **no** entra
en `CAMPOS_WIKI`.

Como `secar-filamento` y `tpu-flexible`, su variable `material` declara
`leeDelAnalisis: ['material']` y `campos: ['material']`, con lo que la barra «Tu
archivo» enseña el material del G-code y lo lleva a la explicación de esta guía.

## Fuentes

**Una reutilizada**, que ya está en `wiki/raw/` y **no se vuelve a descargar**:

| URL | Estado | Qué trae |
|---|---|---|
| `https://wiki.bambulab.com/en/knowledge-sharing/print-quality-common` | Ya en `wiki/raw/` (`secar-filamento-bambu-wiki-common-print-quality-problem.md`) | La sección «Seam»: qué es la costura, que es un fenómeno normal, y los cuatro métodos que da la casa para mejorar su calidad —tres perímetros de pared, evitar varias piezas en la misma plato, subir la temperatura de boquilla y bajar la velocidad de la pared exterior, y el modo *spiral vase*— |

El recolector debe **buscar más** dentro de los dos dominios registrados
(`wiki.bambulab.com` y `help.prusa3d.com`) hasta llegar a **3–5 fuentes nuevas**, y
buscarlas sobre todo:

- **La página dedicada de Bambu sobre la costura**, que la propia fuente anterior
  enlaza («Seam | Bambu Lab Wiki»). Es la candidata principal: si existe dentro de los
  prefijos permitidos, es el corazón del tema.
- Una fuente del KB de Prusa sobre la **posición de la costura** y sobre qué la hace
  visible.
- Si aparece, una fuente sobre **retractar antes de empezar la capa**, que es el
  mecanismo por el que la costura se nota, y su alcance real.

Las candidatas URLs hay que **verificarlas antes**: un 200 con cuerpo vacío no es una
página (el KB de Prusa se sirve como aplicación React y su texto vive en un
`<div hidden id="S:1">`; mirar el HTML servido antes de dar una fuente por vacía). Y
la página *Spiral vase* que enlaza Bambu está **fuera** del encargo: es `relleno-patrones`.

## Gate específico de este tema

Además de las reglas del plan:

1. **La costura no es un defecto.** La propia casa lo dice: es un fenómeno normal. La
   guía publica qué se puede mejorar y **qué es normal que se vea**, y no convierte una
   línea visible en un fallo que arreglar.
2. **«Se nota más» no es «está mal».** Se publica el mecanismo por el que la costura
   se nota (el punto donde acaba una capa y empieza la siguiente) con su fuente, no una
   afirmación de que la costura debilita la pieza sin dato.
3. **Un límite del aparato no es una propiedad del material.** Si una fuente dice que
   un tipo de impresora no puede colocar la costura donde se quiere, es una limitación
   del aparato.
4. **El modo *spiral vase* no es la solución general.** La fuente dice que sólo aplica a
   modelos simples, con una sola pared exterior, sin relleno ni tapa superior, y que
   los modelos complejos no se pueden imprimir así. Se publica con esas condiciones, y
   la guía de relleno es la dueña del modo.
5. **Ninguna cifra de retracción, de temperatura de cama ni de altura de capa se repite
   aquí** sin su fuente: las que pertenecen a `stringing`, `temperatura-cama` y
   `altura-capa` se dejan en esas guías.
6. **No se generaliza a partir de un solo fabricante.** Si las fuentes sólo hablan de
   la casa de Bambu, eso es lo que se publica, con su fuente.

## Lo que esta guía NO debe ser

Una guía de «cómo esconder la costura». El valor está en **decidir**: ¿esto es la
costura?, ¿dónde la pongo para que estorbe menos?, y cuándo lo que ves es otra cosa.

## Prueba de utilidad

Antes de aprobarla, debe responder o declarar fuera de alcance tres escenas:

1. Una pieza cilíndrica con una línea vertical visible a lo largo de toda la pared.
2. Un bulto en la base de la pieza, justo donde empieza la primera capa.
3. Una pieza cuya costura cae en la cara que se va a ver y no se puede girar.

No se escriben las respuestas esperadas de antemano. Se comprueba que la página permita
decidir, o que diga con claridad que no hay evidencia suficiente.
