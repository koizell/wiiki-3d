# Revisión de ruta-de-calibracion (turno 2)

**Veredicto: RECHAZADO** — y antes de los fallos, hay que decir lo más
importante.

## ⚠️ La premisa de este turno no se cumple: las correcciones no estaban en el fichero

Se revisó `src/content/guias/ruta-de-calibracion.ts` y **era la versión que el
turno 1 rechazó**, sin ninguno de los seis arreglos. No es una impresión: se
comprobó por cuatro vías.

| Comprobación | Resultado |
|---|---|
| `git status --short` | sólo `.opencode/` sin seguimiento. El fichero **no tenía cambios** |
| `git diff HEAD -- src/content/guias/ruta-de-calibracion.ts` | **vacío**. Idéntico a `HEAD` |
| `git log -- src/content/guias/ruta-de-calibracion.ts` | último toque anterior a la primera revisión |
| `find / -name 'ruta-de-calibracion.ts'` | **una sola copia** en todo el sistema |

Y los seis marcadores, uno a uno:

| Corrección anunciada | Presente |
|---|---|
| «los dos órdenes que publican la ruta completa (Control3D y OrcaSlicer)» | **no** (0 hits) |
| Título «tres órdenes que se contradicen y ninguno es canónico» | **no** — sigue `'Ruta de calibración: qué orden sigue cada fabricante'` |
| `entrada` con «aquí va la de Control3D» | **no** |
| Klipper3d y Marlin en `fuentes` | **no** — `fuentes` sigue con **5** entradas |
| `fuente: 'Control3D, OrcaSlicer'` | **no** |
| «no está corroborada por ninguna otra» | **no** — sigue «el material cocinado la marca como sin corroborar» |
| Tarjeta `valor-gcode-duet` | **no existe** |

**Causa:** un `git checkout src/content/guias/` ejecutado durante el trabajo de
otro script borró las correcciones, que estaban sin commitear. El fallo no fue
del redactor: fue de no commitear su trabajo antes de tocar el árbol.

**Lo que esto enseña, y es lo importante:** las correcciones se habían hecho y se
habían perdido, y **ningún automatismo se enteró**. `verify:guias` da
1091/1091 con la versión rota igual que con la versión buena.

## Comprobaciones

| # | Comprobación | Resultado |
|---|---|---|
| 1 | Afirmaciones con respaldo | FALLA — 4 sin respaldo |
| 2 | Contradicciones internas | FALLA — 3 |
| 3 | Relleno y frases de IA | PASA |
| 4 | Las cuatro etapas | FALLA — 1 (el contenido del M572 de Duet3D se filtra por `slicer`, no por `firmware`) |
| 5 | Citas correctas y accesibles | FALLA — 2 fuentes citadas que no están en `fuentes` |

## Los fallos, con dónde y qué hacer

### 1 · Bloqueante · Duet3D sigue contando como tercera ruta completa, en siete sitios

**Dónde:** `entrada` (l. 26), `titulo` de la tarjeta `tres-ordenes` (l. 142),
`retraccion-directa` (l. 298), regla `temperatura` (l. 418), regla `retracciones`
(l. 455 y 458), `fueraDeAlcance` n.º 3 (l. 552).

**Qué dice:** «Hay tres métodos publicados que se contradicen entre sí» · «Hay
tres órdenes, y se contradicen» · «**Los tres órdenes** ponen la retracción
después del PA y del flujo» · «**Los tres órdenes** la ponen la primera» · «es el
único paso en el que **los tres órdenes coinciden**» · «esa ausencia no se
reconstruye a partir de **los otros tres**».

**Por qué falla:** la fuente de Duet3D dice «It is recommend to first tune Input
Shaping, then Pressure Advance, then Retraction»
(`raw/ruta-de-calibracion-duet3d-pressure-advance.md:148`) — un tramo, sin
temperatura y sin flujo. El material cocinado lo dice sin ambigüedad: «El de
Duet3D es un tramo suelto, **no una ruta completa**» (`wiki/cooked/ruta-de-calibracion.md:519`).

**Qué hacer:** reescribir las siete frases contando **los dos órdenes que
publican la ruta completa**, y tratar el tramo de Duet3D como lo que es, con su
desacuerdo propio. La regla `retracciones` necesita además un `alcance` que
declare el desacuerdo real en vez de repetir dos veces la misma frase.

### 2 · Bloqueante · El título y la `entrada` prometen y no cumplen

El título afirma un orden por fabricante que Prusa y Bambu no dan. Y la `entrada`
no dice **qué orden usa esta guía**, que es lo que el material cocinado exige
literalmente (`wiki/cooked/ruta-de-calibracion.md:519-522`).

### 3 · Importante · La contradicción de Input Shaping entre Duet3D y OrcaSlicer se planta y no se declara

La tarjeta `tres-ordenes` escribe las dos posiciones una al lado de la otra y no
dice que se contradigan, aunque el material cocinado la declara como desacuerdo
**independiente** entre dos fuentes oficiales
(`wiki/cooked/ruta-de-calibracion.md:512-514`).

### 4 · Importante · La tarjeta `sin-orden-canonico` generaliza a Bambu lo que sólo es verdad de Prusa

Para Prusa es exacto: el crudo dice «El artículo **no da un orden de calibración**»
(`raw/ruta-de-calibracion-prusa-kb-linear-advance.md:149`).

Para Bambu no: el crudo dice «**Bambu NO publica un orden de calibración con
razonamiento**… el orden de los elementos de Bambu Studio es el de la página
`…/bambu-studio/Calibration` […] **que los lista sin justificar el orden**»
(`raw/ruta-de-calibracion-bambu-wiki-flow-dynamics-calibration.md:261`).

De Bambu hay una lista; lo que falta es la justificación. «Ausencia de dato» es
exactamente lo contrario de lo que dice la fuente.

### 5 · Importante · `fuente` incompleta en cinco reglas

`flujo` (l. 427), `pa` (l. 436), `velocidad-volumetrica` (l. 447), `tolerancias`
(l. 467) y `retracciones` (l. 457) llevan `fuente: 'Control3D'` y citan a
OrcaSlicer en su `alcance`. El `fuente` es lo que se pinta junto a la acción
(«FUENTE · …», `src/components/guia/ReadoutAccion.tsx:84`).

La atribución es correcta en las cinco; lo que falta es declararla.

### 6 · Importante · Klipper3d y Marlin se citan y no están en `fuentes`

`pa-esquina-redondeada` (cita con `fuente: 'Klipper3d'`, l. 207),
`pa-vocabulario` (l. 180), `k-escala` (l. 217), `k-escala-unidades` (l. 234),
`nombres-no-se-portan` (l. 354). Las dos URL crudas existen y son exactas.

### 7 · Menor · El contenido del M572 de Duet3D se filtra por la variable equivocada

La tarjeta `valor-gcode` (l. 394-406) mete el `M572 D0 S0.1` de Duet3D con
`cuando: { slicer: ['cura','simplify3d','otro'] }`. Ese contenido depende del
**firmware**. Y el mismo contenido ya está en `k-escala-unidades` (l. 241),
filtrado por `firmware: ['marlin','duet']`: duplicado con dos disparadores.

### 8 · Menor · «el material cocinado» en texto para el lector

`retraccion-directa` (l. 297 y 303). La afirmación, en cambio, **está respaldada**
(`wiki/cooked/ruta-de-calibracion.md:628-631`).

## Las dos decisiones que tocaba tomar

### El `fueraDeAlcance` n.º 3 y la tensión con el punto nuevo de Bambu

**No es un fallo por sí mismo**, tal como está el fichero: la guía está diciendo lo
que el material cocinado dice. Pero dentro de la misma frase hay un fallo real: la
expresión **«los otros tres»**. Duet3D publica un tramo, no una ruta, así que la
ausencia no se reconstruye «a partir de los otros tres» sino de los dos órdenes
completos.

**Y hay una condición:** si la tarjeta `sin-orden-canonico` se reescribe separando
Prusa de Bambu, el `fueraDeAlcance` tiene que reescribirse **en la misma pasada**,
o la guía dirá dos cosas distintas sobre Bambu en dos sitios.

La frase que propone el revisor:

> «Prusa no publica ningún orden de calibración y Bambu sólo lista sus tests en el menú de Bambu Studio, sin justificarlos: ninguno de los dos es una secuencia recomendada, y esa ausencia no se reconstruye a partir de Control3D ni de OrcaSlicer.»

### El `porque` de la regla `pa` que calca `presion-concepto` de `flow-rate`

**No es un fallo**, y conviene dejar escrito por qué:

- No es un calque literal.
- La segunda cláusula («es el ajuste que peor suele estar sin calibrar») es **lo
  único que esta guía puede decir y `flow-rate` no**: es la razón por la que el
  paso va donde va, que es el tema entero de esta guía.
- Si se quita la primera cláusula, el `porque` empeora.

Aun así, si se quiere quitar el ruido, **el arreglo es invertir el orden, no
borrar**: que la razón de posición vaya primero y la definición se quede en la
guía a la que esta enruta.

## Notas que no bloquean

- **La `que` de la fuente OrcaSlicer se pasa de alcance**: describe
  `enable_pressure_advance` / `pressure_advance`, que están en otro fichero crudo
  distinto del que declara la URL.
- **La `que` de la fuente Bambu arrastra el mismo problema** que la tarjeta.
- **La `que` de Control3D es correcta**, y la de Duet3D también: su frase «el
  tramo de orden respecto a Input Shaping y retracción» demuestra que **la guía
  sabía que Duet3D era un tramo** y lo contó como ruta completa en otra parte. Eso
  convierte el fallo 1 en un fallo de coherencia interna, no sólo de exactitud.
- `motivo: 'primera'` no tiene ninguna regla detrás. Es correcto (primera
  calibración = la ruta entera), pero conviene saberlo si algún día se toca el
  diferencial.
- **Todo lo demás que se comprobó contra `wiki/raw/` está bien.** Las nueve citas
  entrecomilladas están literalmente en el crudo, y todas las cifras —Prusa
  0,05/0,04, Bambu 0,006–0,024, Klipper 0,050–1,000, Marlin 0,1–2,0, Duet3D
  S0.025/S0,7/1,0–2,0, OrcaSlicer 1–6 mm a 0,2, Simplify3D 15 mm, Control3D 2 mm /
  6–7 mm / 75°, Bambu 45°, M572 D0 S0.1 y D0:1— están todas en el crudo, con sus
  atribuciones correctas.

## Nota de proceso

El turno 1 **nunca se guardó** en `wiki/reviews/`. Sin ese fichero, el turno 2 no
tenía contra qué comparar, y el registro de lo que se rechazó se perdía. Los dos
informes están ahora en `wiki/reviews/ruta-de-calibracion-revision-1.md` y
`wiki/reviews/ruta-de-calibracion-revision-2.md`.
