# Revisión de slicer

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
| `cura-plantillas` | los cuatro nombres literales de los puntos de inserción | **Redundancia** | El `alcance` da la ruta exacta (`Preferences → Configure Cura… → Printers → Machine Settings`) donde Cura rotula las cuatro, y el `porque` conserva el recuento («cuatro puntos de inserción»). |
| `binario-convertir` | la vía global (`Configuration → Preferences → Other`) | **Pérdida menor** | Ver la nota 1. |

## Notas que no bloquean

- `binario-convertir`: se ha ido la vía global (`Configuration → Preferences → Other → Use binary G-code when the printer supports it`), que está en el material cocinado («Se puede desactivar globalmente para todos los perfiles…») y en el crudo. No está en ninguna otra parte de la guía. No cambia la acción —la conversión y la desactivación por impresora siguen—, así que no es un fallo, pero es un dato cocinado que ha desaparecido de la wiki.

- `vista-de-capas`: se ha ido «si las hay, hay que activar soportes», que la fuente dice literal («if you notice any, it's necessary to turn on support generation»). La tarjeta `soportes` y el enlace a `voladizos-y-soportes` cubren el conocimiento, pero la condicional ya no está escrita en ninguna parte.

- `revisa-salida`: el `porque` ha perdido «Es la comprobación que casi nadie hace». Esa afirmación no la sostiene ninguna de las nueve fuentes: quitarla es una corrección, no una pérdida.

---

Esta vuelta es una revisión de contenido por acortamiento: sólo se han
acortado los `porque` de más de 200 caracteres. El contenido no ha cambiado ni
en una palabra: lo comprueba `verify:recorte`, campo por campo.
