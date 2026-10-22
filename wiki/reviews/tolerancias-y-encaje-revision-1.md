# Revisión de tolerancias-y-encaje

**Veredicto: RECHAZADO** — 0 fallos.

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
| `componentes-tensos` | «elongación» y «apretar» | **PÉRDIDA REAL** | «Varillas o rodamientos» sí sobrevive (tarjeta `soluciones-maquina`) y «sustituir» también, pero la tarjeta `causas-maquina` conserva sólo la parte del backlash, no la de creep/elongación: el `porque` queda con el término técnico solo. Y «apretar», el remedio de varillas y rodamientos, no está en ninguna parte. |
| `no-compensar-abiertos` | «que producen caminos no cerrados en una capa» | **Redundancia** | El propio `porque` («capas con caminos no cerrados») y la tarjeta `limitaciones-caminos`. |
| `post-procesado-lijar` | «otros artefactos de impresión» | **Redundancia** | Tarjeta `post-procesado`. |
| `post-procesado-lijar` | «que para infradimensionadas» | **Redundancia** | `porque` y `alcance`: el post-procesado «sirve para piezas sobredimensionadas», que ya implica lo contrario para las infradimensionadas. |
| `usar-orca-tolerance-test` | la lista de tolerancias (0,0 / 0,05 / 0,1 / 0,2 / 0,3 / 0,4 mm) | **Redundancia** | Tarjeta `orca-tolerance-test`, con la lista exacta y su cita. La frase sigue siendo cierta: «de 0,0 a 0,4 mm». |

---

Esta vuelta es una revisión de contenido por acortamiento: sólo se han
acortado los `porque` de más de 200 caracteres. El contenido no ha cambiado ni
en una palabra: lo comprueba `verify:recorte`, campo por campo.
