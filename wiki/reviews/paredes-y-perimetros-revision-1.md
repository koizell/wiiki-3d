# Revisión de paredes-y-perimetros

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
| `vase-mode-ajustes` | (solo dimensiones exteriores) y externos | **Redundancia** | La tarjeta vase-mode conserva las dos cosas: El modelo debe definirse como sólido (solo dimensiones exteriores) y el ancho de extrusión de los perímetros externos. |
| `external-perimeters-first` | la superficie queda ligeramente menos suave y secundario | **Redundancia** | El alcance: Prusa: superficie menos suave; OrcaSlicer: costuras Z menos consistentes. Atribuir cada efecto a su fuente. |

---

Esta vuelta es una revisión de contenido por acortamiento: sólo se han
acortado los `porque` de más de 200 caracteres. El contenido no ha cambiado ni
en una palabra: lo comprueba `verify:recorte`, campo por campo.
