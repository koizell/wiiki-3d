# Revisión de max-volumetric-speed

**Veredicto: RECHAZADO** — 2 fallos.

## Comprobaciones

| # | Comprobación | Resultado |
|---|---|---|
| 1 | Afirmaciones con respaldo | FALLA — 2 pérdidas |
| 2 | Contradicciones internas | PASA |
| 3 | Relleno y frases de IA | PASA |
| 4 | Las cuatro etapas, y que hagan algo | PASA |
| 5 | Citas correctas y accesibles | PASA |
| 6 | *El acortamiento no ha cambiado lo que la guía dice* | FALLA — 2 pérdidas reales |

## Fallos, con dónde y qué hacer

### 1 · Bloqueante · Se ha perdido el paso final del procedimiento de calibración

**Dónde:** reglas[].porque, regla `orca-calibrar`.

**Qué dice:** «El MVS es el caudal que el hotend aguanta: se mide con calibre la altura justo antes de los defectos y se aplica inicio + (altura × paso). El brillo brillante/mate avisa de que la calidad baja.»

**Qué decía:** «…y fijar el valor en los ajustes del filamento.»

**Por qué falla:** Es el paso que hace que la calibración sirva, y la guía ya no lo dice en ningún sitio. La fuente lo tiene literal (`wiki/raw/max-volumetric-speed-orcaslicer-volumetric-speed-calib.md`): «After you have determined the maximum volumetric speed, you can set it in the filament settings». El cocinado también: «el valor se fija después en los ajustes del filamento». Se ha comprobado en las tres otras casas posibles y ninguna lo tiene: ni el `alcance` de la regla («La prueba es el mejor caso…»), ni la tarjeta `calibracion-orca` —que enumera el procedimiento entero—, ni ninguna otra. El MVS es un ajuste por filamento en OrcaSlicer, no del perfil de impresora, y la guía no lo nombra en ninguna parte: quien calibra ahora no sabe dónde escribir el número.

**Qué hacer:** Recuperar la frase en el `porque` («…y se fija en los ajustes del filamento») o, si no cabe, en el `alcance`.

### 2 · Importante · Se ha perdido la mitad de una afirmación compuesta de la fuente

**Dónde:** reglas[].porque, regla `valorar-pla-high-speed`.

**Qué dice:** «Prusament PLA High Speed alcanza 28 mm³/s en CORE One+ a 220 °C: su MFI alto y shear-thinning llevan la impresora al límite sin clogs. El ahorro depende de la forma y el tamaño (Prusa acota 20–40 %).»

**Qué decía:** «…ni hardware especializado.»

**Por qué falla:** La fuente afirma las dos cosas a la vez (`wiki/raw/max-volumetric-speed-prusa-pla-high-speed.md`): «you can push your printer to its limits without risking clogs or installing specialized hardware». El cocinado la tiene dos veces, y una es justo sobre el ahorro de tiempo: «PLA High Speed ahorra hasta 20–40 % de tiempo de impresión … sin hardware especializado». No hay sustituto: el `alcance` dice «el MVS depende del hardware y la forma del modelo», que es la **otra** afirmación de la fuente —la del límite absoluto, que sí depende del extrusor y la cinemática—, no la de que el filamento te salva del hotend de alto caudal. Con la guía como está, un lector con hotend de serie no sabe que el filamento es la alternativa al hardware.

**Qué hacer:** Recuperar «ni hardware especializado» en el `porque`, o dejarlo en el `alcance`.

## Las reglas acortadas, una por una

El `porque` de estas reglas perdió algo al acortarse. La pregunta es si el
matiz **sobrevive** en el `alcance`, en la condición o en una tarjeta, o si de
verdad se ha ido.

| Regla | Lo que se ha ido | Veredicto | Por qué |
|---|---|---|---|
| `valorar-pla-high-speed` | «ni hardware especializado» | **PÉRDIDA REAL** | Ver el fallo 2. |
| `orca-no-adaptive` | «con él deshabilitado, sólo se aplica el máximo del usuario» | **Redundancia** | Sigue literal en la tarjeta `adaptive-vol`, que se muestra con la misma condición (`slicer: 'orca'`). |
| `simplify3d-test` | «valores comunes» | **Pérdida menor** | Ver la nota 1. |

## Notas que no bloquean

- `simplify3d-test`: la fuente dice «The most common values for the filament diameter are 1.75mm and 2.85mm»; ahora es «El diámetro va en Other: 1,75 y 2,85 mm». La cualificación se ha ido y no está en el `alcance`. («en la parte superior» → «arriba» no pierde nada: es el mismo sitio.)

---

Esta vuelta es una revisión de contenido por acortamiento: sólo se han
acortado los `porque` de más de 200 caracteres. El contenido no ha cambiado ni
en una palabra: lo comprueba `verify:recorte`, campo por campo.
