# Revisión de malla-de-cama

**Veredicto: APROBADO** — 0 fallos.

## Comprobaciones

| # | Comprobación | Resultado |
|---|---|---|
| 1 | Afirmaciones con respaldo | PASA |
| 2 | Contradicciones internas | PASA |
| 3 | Relleno y frases de IA | PASA |
| 4 | Las cuatro etapas, y que hagan algo | PASA |
| 5 | Citas correctas | PASA |
| 6 | *El acortamiento no ha cambiado lo que la guía dice* | PASA |

## Las reglas acortadas, una por una

El `porque` de estas reglas perdió algo al acortarse. La pregunta es si el
matiz **sobrevive** en el `alcance`, en la condición o en una tarjeta, o si de
verdad se ha ido.

| Regla | Lo que se ha ido | Veredicto | Por qué |
|---|---|---|---|
| `no-apretar` | poor print quality | **Redundancia** | extrusion problems and clogging ya lo dice. |
| `no-apretar` | due to the print sticking too much | **Redundancia** | El mecanismo de sobre-pegado está en el alcance. |
| `limpiar-chapa` | Su eficacia está condicionada: y para el material | **Redundancia** | El siempre que conserva la condición; para el material es un subdetalle de los ajustes. |
| `malla-7x7` | puntos y de imanes | **Redundancia** | La tarjeta imanes lo dice literal: tres de los 49 puntos quedan tan cerca de los imanes. |

## Notas que no bloquean

- La cita elidida de no-apretar es correcta: las dos mitades son contiguas en wiki/raw/adhesion-primera-capa-prusa-kb-first-layer-calibration-i3.md y lo elidido va marcado con puntos suspensivos. No es reordenación ni resumen dentro de las comillas.

---

Esta vuelta es una revisión de contenido por acortamiento: sólo se han
acortado los `porque` de más de 200 caracteres. El contenido no ha cambiado ni
en una palabra: lo comprueba `verify:recorte`, campo por campo.
