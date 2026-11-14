# Revisión de warping-pla

**Veredicto: RECHAZADO** — 3 fallos bloqueantes, 3 importantes.
**Iteración:** 1 de 2
**Fecha:** 2026-11-14
**Brief:** `docs/briefs/warping-pla-revision.md`

## Comprobaciones

| # | Comprobación | Resultado |
|---|---|---|
| 1 | Alcance, vigencia y pregunta | PASA |
| 2 | Afirmaciones con respaldo localizable | FALLA — 2 citas no literales, 1 dato sin fuente listada |
| 3 | Atribución y grado de certeza | FALLA — una regla invierte la causa de la fuente |
| 4 | Coherencia y cobertura | FALLA — una regla se aplica a ABS/PC y les da el consejo contrario |
| 5 | Enlaces, slugs y fechas | FALLA — autoenlace y fuentes omitidas |
| 6 | Valor original y relleno | PASA |

## Fallos bloqueantes

### B1 · La cita del mecanismo no está en la fuente

**Dónde:** tarjeta `mecanismo`, campo `cita.texto`.
**Dice:** «the edges cool down quicker which causes the material to shrink and pull the corners up».
**Fuente declarada:** `wiki/raw/warping-pla-bambu-wiki-warping-falling-off-collapsing.md`.
**Qué dice la fuente:** «The outer edges of the print cool faster than the centre, creating tension that pulls corners up.» (líneas 42-44).
**Por qué falla:** la guía presenta entre comillas una paráfrasis que no aparece en el fichero. La cita es la prueba; una paráfrasis entrecomillada no prueba nada.
**Qué hacer:** sustituir el texto por la frase literal de la fuente, o quitar las comillas y marcarlo como paráfrasis.

### B2 · La cita de la tabla de cama no está en la fuente

**Dónde:** tarjeta `cama-bambu`, campo `cita.texto`.
**Dice:** «with the Cool Plate the PLA asks for 35 – 45 ℃».
**Fuente declarada:** `wiki/raw/temperatura-cama-bambu-wiki-filament-guide-material-table.md`.
**Qué dice la fuente:** la fila de tabla `PLA | 35 - 45 ℃ | 45 - 65 ℃ Glue Required | 45 - 65 ℃ | 45 - 65 ℃` (línea 97). La frase en español de las notas del recolector no es el original.
**Por qué falla:** misma regla que B1: texto entrecomillado que no es literal.
**Qué hacer:** citar la fila literal o convertir la cita en una referencia a la tabla sin comillas.

### B3 · La regla de abrir la cámara se aplica a ABS y PC, y explica la causa al revés

**Dónde:** regla `abierta`.
**Condición actual:** `{ camara: 'cerrada', cama: 'alta' }`.
**Por qué falla, en dos partes:**

1. **Alcance peligroso.** Un usuario con ABS o PC, cámara cerrada y cama alta (90–100 °C) cumple la condición y recibe «abre la puerta y quita la tapa». Para ABS/PC la fuente pide justo lo contrario: cámara cerrada y caliente. La regla necesita `material: ['pla', 'pla-cf']` como mínimo.
2. **Causa invertida.** El `porque` dice «el calor de la cámara no reblandece el filamento». La fuente dice lo contrario: se abre para **evitar que el calor excesivo de la cámara reblandezca y deforme el filamento** (`temperatura-cama-bambu-wiki-filament-guide-material-table.md`, líneas 82-85).

**Qué hacer:** añadir la condición de material, corregir el `porque` y dejar el umbral de PETG (60 °C) en `alcance`, no en una condición que empieza en 45 °C.

## Fallos importantes

### I1 · Cuatro fuentes que sostienen cifras no están en `fuentes`

**Dónde:** array `fuentes` de la guía.
**Qué falta:** las páginas de las que salen las cifras de cama y el ranking:

- `wiki/raw/temperatura-cama-bambu-wiki-filament-guide-material-table.md`
- `wiki/raw/temperatura-cama-prusa-kb-filament-material-guide.md`
- `wiki/raw/temperatura-cama-prusa-kb-pla.md`
- `wiki/raw/temperatura-cama-orcaslicer-wiki-material-temperatures.md`

**Por qué importa:** una cifra sin fuente listada se puede comprobar hoy porque el
cocinero la trajo, pero el lector no puede. La guía debe llevar a la fuente, no sólo
al fabricante en abstracto.
**Qué hacer:** añadirlas con `quien` y `que` específicos.

### I2 · Autoenlace en `fueraDeAlcance`

**Dónde:** `fueraDeAlcance[0]`, «La pieza alta y fina se tumba», `guia: 'warping-pla'`.
**Por qué falla:** la guía se enlaza a sí misma. El campo es opcional; si no hay otra
guía para el colapso estructural, se omite.
**Qué hacer:** quitar `guia` o apuntar a una guía que exista y trate el caso.

### I3 · Deuda de trazabilidad del material cocinado

**Dónde:** `wiki/cooked/warping-pla.md`.
**Qué pasa:** el cooked es anterior al contrato `A-###`; sus afirmaciones no llevan
identificador ni localización exacta, y la guía tampoco tiene comentarios
`// evidencia: A-###`.
**Por qué no es bloqueante hoy:** las afirmaciones se han podido comprobar contra
`wiki/raw/` una a una. Pero el pipeline nuevo no puede reutilizar este cooked sin
retrofitearlo.
**Qué hacer:** en la próxima actualización de fondo, el cocinero añade IDs y
localización; el redactor deja la traza. No se finge que existe.

## Cobertura de las afirmaciones comprobadas

| Afirmación de la guía | Fuente cruda | Resultado |
|---|---|---|
| Contracción térmica; bordes exterior antes que centro | `warping-pla-bambu-wiki-warping-falling-off-collapsing.md` L42-44 | El hecho pasa; la cita no es literal (B1) |
| Ranking PC → PA-CF → PA → ABS → ASA → PETG → PLA | misma, L47-49 | PASA |
| Cool Plate PLA 35–45 °C | `temperatura-cama-bambu-wiki-filament-guide-material-table.md` L97 | PASA el dato; la cita no es literal (B2) |
| Textured/Smooth/Engineering 45–65 °C | misma, L97 | PASA |
| Prusa 50–60 °C | `temperatura-cama-prusa-kb-filament-material-guide.md` L14 | PASA |
| Orca 50–60 °C | `temperatura-cama-orcaslicer-wiki-material-temperatures.md` L25 | PASA |
| 65 °C es un techo de foro, no de fabricante | `warping-pla-prusa-forum-adjusting-settings-warping-pla.md` L52 | PASA |
| Textured PEI baja la boquilla 0,04 mm | `warping-pla-bambu-wiki-printed-model-warping.md` L33 | PASA |
| Piezas grandes ABS/ASA/PC warpean sin cámara | `warping-pla-bambu-wiki-warping-falling-off-collapsing.md` L214 | PASA |
| Tres pasos resuelven ~80 % | misma, L105 | PASA |
| Subir cama +5–10 °C | misma, L18 y L132 | PASA |
| PETG 60–80 °C | tabla Bambu L102 | PASA |
| ABS/ASA 90–100 °C | tabla Bambu L104 | PASA |
| Sin ventilador las 3 primeras capas | `warping-pla-bambu-wiki-printed-model-warping.md` L59-63 | PASA |
| Brim 8–10 mm | `warping-pla-bambu-wiki-warping-falling-off-collapsing.md` L133 | PASA |
| Ventilador auxiliar 40–50 % y 20–30 % | printed-model L61; falling-off L159-174 | PASA |
| Prusa: 10–20 % en voladizos y piezas pequeñas | `warping-pla-prusa-knowledge-base-warping.md` L59-61 | PASA |
| Gyroid ≤25 % | falling-off L167-168 | PASA |
| Abrir puerta/tapa con cama >45 °C y filamento blando | tabla Bambu L84-85 | El dato pasa; la regla lo invierte y lo aplica de más (B3) |

## Notas que no bloquean

- La guía no declara una fecha de publicación; sólo `actualizado: 2026-10-21`. Es
  correcto: no se inventa `datePublished`.
- `minutos: 3` es una estimación editorial; no se comprueba contra una fuente.
- El enlace a `temperatura-cama` existe en el registro.
- El enlace a `separaciones-entre-capas` existe en el registro.

## Qué falta para aprobar

1. Corregir B1, B2 y B3.
2. Añadir las cuatro fuentes de I1.
3. Quitar el autoenlace de I2.
4. Dejar I3 declarado como deuda, no como algo resuelto.

No se vuelve a pedir una revisión con el mismo material: la segunda iteración se
hace después de corregir estos puntos.
