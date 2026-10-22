# Revisión de adhesion-primera-capa

**Veredicto: APROBADO** — 0 fallos.

## Comprobaciones

| # | Comprobación | Resultado |
|---|---|---|
| 1 | Afirmaciones con respaldo | PASA |
| 2 | Contradicciones internas | PASA |
| 3 | Relleno y frases de IA | PASA |
| 4 | Las cuatro etapas, y que hagan algo | PASA |
| 5 | Citas correctas y accesibles | PASA |
| 6 | *El acortamiento no ha cambiado lo que la guía dice* | PASA |

## Las reglas acortadas, una por una

El `porque` de estas reglas perdió algo al acortarse. La pregunta es si el
matiz **sobrevive** en el `alcance`, en la condición o en una tarjeta, o si de
verdad se ha ido.

| Regla | Lo que se ha ido | Veredicto | Por qué |
|---|---|---|---|
| `chapa-perfil` | «Es la causa más silenciosa de las cuatro» | **Redundancia** | Sigue entero en el `para` de la variable `perfil». |
| `limpieza` | «para el material» | **Pérdida menor** | Ver la nota 1. |

## Notas que no bloquean

- `limpieza`: la fuente dice «as long as the right settings are used **for the materials you are trying to print**, and the correct plate type has been selected in the slicer»; ahora dice «sólo si los ajustes y la chapa del slicer son correctos». La guía tiene variable `material`, así que el lector sabe con qué imprime, pero el texto ya no ata los ajustes a ese material. (La otra mitad que se ha ido, «Sin esas dos condiciones, la frase deja de ser cierta», era redundancia pura con el «sólo si».)

- `al-cambiar-chapa`: se ha ido la condición de los ocho perfiles: la fuente dice «We implemented steel sheet profiles **for our printers that need first-layer calibration**»; ahora es «Hasta ocho perfiles de chapa guardables, cada uno con su valor». La condición no está en el `alcance`.

---

Esta vuelta es una revisión de contenido por acortamiento: sólo se han
acortado los `porque` de más de 200 caracteres. El contenido no ha cambiado ni
en una palabra: lo comprueba `verify:recorte`, campo por campo.
