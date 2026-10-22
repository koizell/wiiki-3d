# Revisión de agujeros-ovalados

**Veredicto: RECHAZADO** — 1 fallo. De los cuales 1 bloqueante.

## Comprobaciones

| # | Comprobación | Resultado |
|---|---|---|
| 1 | Afirmaciones con respaldo | PASA |
| 2 | Contradicciones internas | PASA |
| 3 | Relleno y frases de IA | PASA |
| 4 | Las cuatro etapas, y que hagan algo | PASA |
| 5 | Citas correctas | PASA |
| 6 | *El acortamiento no ha cambiado lo que la guía dice* | FALLA — 1 pérdida real |

## Fallos, con dónde y qué hacer

### 1 · Bloqueante · Pérdida real: una afirmación técnica desaparece de la guía

**Dónde:** reglas[].porque, regla usar-hole-compensation.

**Qué dice:** XY Hole Compensation ajusta el tamaño de los agujeros (áreas cerradas) en cada capa y no cambia el exterior. XY Contour Compensation ajusta el contorno exterior y deja los agujeros sin cambios.

**Qué decía antes:** ... XY Contour Compensation ajusta el contorno exterior del modelo; aumenta o disminuye el tamaño XY manteniendo los agujeros sin cambios.

**Por qué falla:** El matiz no está en ninguna otra parte de la guía: ni en el alcance (Esta regla solo aplica a agujeros cerrados), ni en la cuando (tipo-agujero: cerrado), ni en las tarjetas. Y el dato está respaldado: wiki/raw/agujeros-ovalados-bambulab-xy-compensation.md — Adjusts the outer contour of the model. It increases or decreases the overall XY size while keeping hole sizes unchanged. Quien llega por la rama no-compensar-abiertos sale de la guía sin saber que ese parámetro es bidireccional. Antes lo sabía.

**Qué hacer:** Devolver el dato en una frase que quepa en 200 caracteres: XY Contour Compensation ajusta el contorno exterior, aumenta o disminuye el tamaño XY y deja los agujeros sin cambios.

## Las reglas acortadas, una por una

El `porque` de estas reglas perdió algo al acortarse. La pregunta es si el
matiz **sobrevive** en el `alcance`, en la condición o en una tarjeta, o si de
verdad se ha ido.

| Regla | Lo que se ha ido | Veredicto | Por qué |
|---|---|---|---|
| `usar-hole-compensation` | aumenta o disminuye el tamaño XY | **PÉRDIDA REAL** | Ver el fallo. |

---

Esta vuelta es una revisión de contenido por acortamiento: sólo se han
acortado los `porque` de más de 200 caracteres. El contenido no ha cambiado ni
en una palabra: lo comprueba `verify:recorte`, campo por campo.
