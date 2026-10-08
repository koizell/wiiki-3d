# Revisión de voladizos-y-soportes (segunda vuelta)

**Veredicto: APROBADO** — 0 fallos.

## Comprobaciones

| # | Comprobación | Resultado |
|---|---|---|
| 1 | Afirmaciones con respaldo | PASA — 14 citas literales verificadas contra `wiki/raw/` |
| 2 | Contradicciones internas | PASA |
| 3 | Relleno y frases de IA | PASA |
| 4 | Las cuatro etapas | PASA |
| 5 | Citas correctas y accesibles | PASA |

## Detalle de la comprobación 1: citas literales

| Cita en el artículo | Fuente raw | Línea | Literal |
|---|---|---|---|
| "Generally, when the overhang tilt angle is smaller than 45°…" | bambu-wiki-overhang.md | 37 | ✅ |
| "For **PLA**, you can lower the **other layers'** nozzle temperature to around **205 °C**…" | bambu-wiki-overhang.md | 55 | ✅ |
| "Overhang speeds are generally set between **10–60 mm/s**…" | bambu-wiki-overhang.md | 61 | ✅ |
| "After you remove the support structure, you may notice that the surface above the supports looks worse than the rest of the print." | prusa-kb-bad-surface-above-supports.md | 11 | ✅ |
| "a small gap is left between the support and the object's surface" | prusa-kb-bad-surface-above-supports.md | 23 | ✅ |
| "Another good thing to try is to increase the number of interface layers to 3-4…" | prusa-kb-bad-surface-above-supports.md | 27 | ✅ |
| "If support material breaks, it is likely to cause a failure on the whole print." | prusa-kb-failing-supports.md | 11 | ✅ |
| "The rectilinear pattern is set by default and is the easiest to remove." | prusa-kb-failing-supports.md | 27 | ✅ |
| "The rectilinear grid pattern is sturdier and less prone to breaking during printing…" | prusa-kb-failing-supports.md | 28 | ✅ |
| "The honeycomb pattern is sturdy and somewhat difficult to remove." | prusa-kb-failing-supports.md | 29 | ✅ |
| "Use a Brim around our support, found within *Print settings -> Skirt and Brim*." | prusa-kb-failing-supports.md | 25 | ✅ |
| "It is worth considering altering the orientation of the model or splitting the model into multiple parts…" | prusa-kb-failing-supports.md | 17 | ✅ |
| "**Opening the printer's front door and glass lid** can improve cooling performance…" | bambu-wiki-overhang.md | 69 | ✅ |
| "The larger the input angle, the more supports will be generated." | bambu-wiki-overhang.md | 43 | ✅ |

### Detalles verificados

- **"other layers'"** presente en la cita de temperatura PLA (línea 141 del artículo, línea 55 del raw). ✅
- **"glass lid"** presente en la cita de abrir puerta (línea 224 del artículo, línea 69 del raw). ✅
- **"possibly"** presente en la cita de orientación (línea 213 del artículo, línea 17 del raw). ✅
- **"input angle"** presente en la cita de umbral (línea 234 del artículo, línea 43 del raw). ✅

## Detalle de la comprobación 4: estructura

- **Diferencial**: 3 comprobaciones, cada una con `si` y `no`. ✅
- **Variables**: 4 variables, todas con `para` y todas afectan a reglas. ✅
- **Reglas**: 15 reglas, todas con condiciones que se pueden alcanzar. ✅
- **Conocimiento filtrado**: `abrir-puerta` y `refrigeracion-pla` tienen `cuando` con variables. ✅
- **Cifras en `valor`**: 4 reglas con cifras numéricas, todas en `valor`. ✅
- **Alcance**: 15 reglas, todas con `alcance`. ✅
- **`fueraDeAlcance`**: 5 entradas, cada una con síntoma, por qué y guía. ✅

## Detalle de la comprobación 5: citas y enlaces

- 3 fuentes en `sources`, todas con URL presente en `wiki/raw/`. ✅
- Sin fuentes repetidas. ✅
- Primera cita en la primera mitad del artículo (tarjeta `angulo-referencia`). ✅
- Enlaces a guías: `warping-pla`, `adhesion-primera-capa`, `separaciones-entre-capas`, `material` — todos existen. ✅

## Notas

- La guía está bien estructurada y respaldada.
- No se encontraron fallos en esta revisión.
