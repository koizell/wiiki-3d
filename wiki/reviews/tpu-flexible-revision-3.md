# Revisión de tpu-flexible

**Veredicto: RECHAZADO** — 2 fallos. De los cuales 2 bloqueantes.

## Comprobaciones

| # | Comprobación | Resultado |
|---|---|---|
| 1 | Afirmaciones con respaldo | FALLA — 2 pérdidas |
| 2 | Contradicciones internas | PASA |
| 3 | Relleno y frases de IA | PASA |
| 4 | Las cuatro etapas, y que hagan algo | PASA |
| 5 | Citas correctas y accesibles | FALLA — 2 citas falsas |

## Fallos, con dónde y qué hacer

### 1 · Bloqueante · Cita entrecomillada falsa: escape duplicado

**Dónde:** reglas[].porque, regla `hotend-residuo`, línea 675.

**Qué dice:** «TPU isn\\\'t stiff enough to push the previous filament out the nozzle, so it jams»

**Qué decía:** «TPU isn't stiff enough to push the previous filament out the nozzle, so it jams.»

**Por qué falla:** En una cadena TypeScript entrecomillada simples, `\\` es una barra invertida y `\'` es un apóstrofo. Lo que salía en la página era `TPU isn\'t stiff enough…`, **con una barra que no está en la fuente**. El renderizador sólo entiende `**negrita**` y escapa por construcción como nodo de texto de React, así que la barra se veía. La barra la había metido esta vuelta: antes ponía `isn\'t`, que renderiza bien.

**Qué hacer:** Una sola barra (`isn\'t`), que es lo que hace literal la cita del crudo.

### 2 · Bloqueante · Cita entrecomillada falsa: escape duplicado

**Dónde:** reglas[].porque, regla `retract-off`, línea 715.

**Qué dice:** «It\\\'s alright to turn the retractions off completely and then try to raise them and watch the results»

**Qué decía:** «It’s alright to turn the retractions off completely and then try to raise them and watch the results.»

**Por qué falla:** Mismo caso: en la página salía `It\'s alright…`. El crudo (`wiki/raw/tpu-flexible-prusa-kb-flexible-materials.md`) usa el apóstrofo tipográfico, y la tarjeta `retraccion-caso` de esta misma guía lo sigue escribiendo bien, con `It’s`.

**Qué hacer:** El apóstrofo tipográfico (`It’s`), que además es el del crudo y el del resto del fichero.

## Las reglas acortadas, una por una

El `porque` de estas reglas perdió algo al acortarse. La pregunta es si el
matiz **sobrevive** en el `alcance`, en la condición o en una tarjeta, o si de
verdad se ha ido.

| Regla | Lo que se ha ido | Veredicto | Por qué |
|---|---|---|---|
| `prusa-superficie` | «y al despegar la pieza se daña la lámina» | **PÉRDIDA REAL** | El crudo: «the adhesion is too strong and removing the print will damage the sheet». Es la razón de usar la capa separadora, y no está en el `alcance` ni en ninguna tarjeta. |
| `carga-250` | las dos citas en inglés | **Redundancia** | La que queda, «standard temperature for loading TPU», es literal; la atribución no se pierde, el `valor` lleva el 250 °C y el `alcance` el alcance. Lo que se pierde es la cita literal de las series P y A, no la afirmación. |
| `bambu-engranaje` | «en su apartado del extrusor» | **Redundancia** | El `alcance`: «La frase citada está en el apartado del extrusor de la serie A…». |
| `bambu-feed-assist` | «es un accesorio que existe por el TPU» | **Redundancia** | Tarjeta `modulo-asistencia`: «Es un accesorio que existe por el TPU». |
| `ams-ht` | el «functions solely as» del comienzo | **Pérdida de contexto** | El texto es literal, pero sin elipsis se lee como la frase entera. |
| `goteo-ajustes` | el «You can slightly reduce…» del comienzo | **Pérdida de contexto** | Empieza en minúscula y sin elipsis. |
| `descarga-manual` | «For A1 series printers,» | **Pérdida de contexto** | Es el calificador de alcance de la cita de la serie A, y otra vez sin elipsis. |

## Notas que no bloquean

- Tres citas elididas por delante **sin «…»**: `ams-ht` (el crudo empieza en «functions solely as»), `goteo-ajustes` (empieza en «You can slightly reduce…», en minúscula) y `descarga-manual` (al elidir «For A1 series printers,» se pierde el calificador de alcance de la serie A). El texto es literal en los tres, pero sin elipsis se lee como la frase entera. Poner «…» delante.

---

Esta vuelta es una revisión de contenido por acortamiento: sólo se han
acortado los `porque` de más de 200 caracteres. El contenido no ha cambiado ni
en una palabra: lo comprueba `verify:recorte`, campo por campo.
