# Revisión de temperatura-hotend

**Veredicto: RECHAZADO** — 3 fallos, de los cuales 2 bloqueantes.

## Comprobaciones

| # | Comprobación | Resultado |
|---|---|---|
| 1 | Afirmaciones con respaldo | FALLA — 1 dato sin respaldo (TPU) |
| 2 | Contradicciones internas | PASA |
| 3 | Relleno y frases de IA | PASA |
| 4 | Las cuatro etapas, y que hagan algo | PASA |
| 5 | Citas correctas y accesibles | FALLA — 1 cita no respalda su afirmación |

## Fallos, con dónde y qué hacer

### 1 · Bloqueante · TPU 210–230 °C sin respaldo

**Dónde:** variable `material`, opción `{ id: 'tpu', etiqueta: 'TPU', detalle: '210–230 °C' }`.

**Qué dice:** "TPU: 210–230 °C".

**Por qué falla:** no está en `wiki/raw/`. La fuente Bambu Lab material table da **200–250 °C** para TPU (líneas 44–47 del fichero crudo). El rango 210–230 °C no aparece en ninguna de las cinco fuentes cocinadas ni crudas.

**Qué hacer:** cambiar a 200–250 °C (Bambu Lab material table), o quitar la opción TPU hasta que una fuente lo respalde.

### 2 · Bloqueante · Diferencial `acabado` contradice la fuente

**Dónde:** diferencial, comprobación `acabado`.

**Qué dice:** "¿La superficie tiene rebabas o falta de brillo? → Sí: Temperatura alta o velocidad baja con temperatura alta."

**Por qué falla:** la fuente Bambu Lab Wiki dice exactamente lo contrario: "printing at low speeds, especially when printing at low speeds together with high nozzle temperatures, usually leads to **smoother and more delicate print surfaces which show higher gloss and clearer details**" (línea 17 del crudo). Baja velocidad + alta temperatura es la combinación que **mejora** la superficie, no la que la empeora. El diferencial está usando la fuente al revés.

**qué hacer:** invertir la lógica. La combinación velocidad baja + temperatura alta **mejora** el acabado. Si hay rebabas o falta de brillo, el problema es otra cosa (velocidad alta, temperatura baja, o ajuste de retracción).

### 3 · Menor · La cita del trueque no respalda su afirmación

**Dónde:** conocimiento `trueque`, cita.

**Qué dice:** "Subir la temperatura mejora la unión y el acabado pero empeora los hilos. Bajarla mejora los hilos pero empeora la unión."

**Por qué falla:** la cita que acompaña —"printing at low speeds, especially when printing at low speeds together with high nozzle temperatures, usually leads to smoother and more delicate print surfaces"— habla de la relación **velocidad↔temperatura↔acabado**. No menciona la unión entre capas, ni el stringing, ni el trueque temperatura↔stringing. La cita no respalda la afirmación principal del cuerpo.

** qué hacer:** o cambiar la cita por una que sí hable del trueche (Prusa: "Lowering the temperature decreases the occurrence of strings" + Bambu: "This method allows the extruded filament more time to bond with the layer below"), o cambiar el cuerpo para que hable de lo que la cita dice.

## Notas que no bloquean

- Las dos tensiones del cocinado salen las dos, con matiz: el rango de PLA (Bambu 190–240 °C vs Prusa 195–220 °C) está en las variables, en el conocimiento `rango-pla` y en la regla `temp-pla`. El trueque temperatura↔stringing está en el conocimiento `trueque`. Ambas tensiones están correctas.
- Los enlaces a guías (`separaciones-entre-capas`, `temperatura-cama`, `altura-capa`, `material`, `voladizos-y-soportes`, `enclosure-y-warping`) existen todos en `src/lib/guias.ts`. ✓
- Las cinco URLs de `sources` están en `wiki/raw/` con ese mismo `url`. ✓
- No hay fuentes repetidas. ✓
- La primera cita ("190 - 240") está en la primera mitad del artículo. ✓
