# Revisión de z-seam

**Veredicto: APROBADO** — 0 fallos.

## Comprobaciones

| # | Comprobación | Resultado |
|---|---|---|
| 1 | Afirmaciones con respaldo | PASA |
| 2 | Contradicciones internas | PASA |
| 3 | Relleno y frases de IA | PASA |
| 4 | Las cuatro etapas, y que hagan algo | PASA |
| 5 | Citas correctas y accesibles | PASA |

## Las reglas acortadas, una por una

El `porque` de estas reglas perdió algo al acortarse. La pregunta es si el
matiz **sobrevive** en el `alcance`, en la condición o en una tarjeta, o si de
verdad se ha ido.

| Regla | Lo que se ha ido | Veredicto | Por qué |
|---|---|---|---|
| `scarf-bambu` | «Desde la 1.10 se puede decidir por filamento» | **Redundancia** | Sigue en la tarjeta `scarf-tipos`. |
| `seam-gap-prusa` | la definición del parámetro y «los extremos se solapan» | **Redundancia** | La definición está en la tarjeta `seam-gap` y el matiz del solape en la propia tarjeta `seam-gap-prusa`. |
| `no-retract-tpu` | «afectar al diámetro del filamento» | **Redundancia** | La tarjeta `retraccion-flexible` lo dice literal y con su cita. |
| `scarf-no-voladizos` | «de los voladizos» | **Redundancia** | El `accion` dice «voladizos» y la tarjeta `scarf-contra` lo repite. |
| `spiral-vase-alcance` | «porque los complejos no se pueden imprimir con una sola línea» | **Redundancia** | La tarjeta `spiral-vase` conserva la razón. |
| `girar-pieza` | las dos citas literales en inglés | **Sin pérdida de contenido** | Las dos paráfrasis son exactas y la atribución es correcta. No se ha creado ninguna cita falsa. |

## Notas que no bloquean

- `girar-pieza`: las dos citas literales se sustituyeron por paráfrasis. Comprobadas una por una en `wiki/raw/`, las dos paráfrasis son exactas, la atribución a «Bambu Lab, Prusa Research» es correcta y `fuente` no ha cambiado. **No es motivo de rechazo**: no se ha creado ninguna cita falsa. El aviso es de otro tipo —ninguna guía del sitio muestra ya esas dos frases literales— y se ha resuelto dejando la prueba en la tarjeta `pos-back`.

- `seam-gap-bambu`: dos sentidos de «para» en la misma frase. «Bambu Studio para la extrusión por adelantado en las paredes interior y exterior y deja un hueco para el sobrante»: la primera es el verbo (detiene) y la segunda la preposición. Es un lapsus que ha metido el acortamiento —la versión anterior decía «detiene la extrusión»— y se lee mal. Corregido en esta vuelta.

---

Esta vuelta es una revisión de contenido por acortamiento: sólo se han
acortado los `porque` de más de 200 caracteres. El contenido no ha cambiado ni
en una palabra: lo comprueba `verify:recorte`, campo por campo.
