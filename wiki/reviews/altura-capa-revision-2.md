# Revisión de altura-capa

**Veredicto: APROBADO** — 0 fallos.

## Comprobaciones

| # | Comprobación | Resultado |
|---|---|---|
| 1 | Afirmaciones con respaldo | PASA |
| 2 | Contradicciones internas | PASA |
| 3 | Relleno y frases de IA | PASA |
| 4 | Las cuatro etapas | PASA |
| 5 | Citas correctas y accesibles | PASA |

## Detalle de cada comprobación

### 1 · Afirmaciones con respaldo

Cada cita literal y cada cifra verificadas contra `wiki/raw/`:

| Cita / cifra | Fuente | Resultado |
|---|---|---|
| «we also regard the layer height as the vertical resolution of the model, that is, the lower the layer height, the higher the fineness of the model.» | `altura-capa-bambulab-layer-height.md:15` | Exacta |
| «0.08mm layer height, printing time 1h 19m \| 0.2mm layer height, printing time 36m 14s \| 0.28mm layer height, printing time 28m 27s» | `altura-capa-bambulab-layer-height.md:27` | Exacta |
| «In general, the reasonable range of layer height should be 20% ~70% of the nozzle diameter.» | `altura-capa-bambulab-layer-height.md:33` | Exacta |
| «Generally, we do not suggest going lower than 0.10 mm as the improvement in print quality with 0.07 or 0.05 mm layers is relatively minor with significantly longer print times.» | `altura-capa-prusa-layers-and-perimeters.md:24` | Exacta |
| «This can result in significantly shorter print times with minimal sacrifice to the print quality.» | `altura-capa-prusa-variable-layer-height.md:13` | Exacta |

Valores calculados verificados:

| Valor | Cálculo | Correcto | Alcance declarado |
|---|---|---|---|
| 0,42 mm | 70 % de 0,6 mm | Sí | «Boquilla de 0,6 mm: 0,42 mm es el 70 % de 0,6 mm, aplicando la regla de Bambu; la fuente sólo da el ejemplo de 0,4 mm.» |
| 0,56 mm | 70 % de 0,8 mm | Sí | «Boquilla de 0,8 mm: 0,56 mm es el 70 % de 0,8 mm, aplicando la regla de Bambu; la fuente sólo da el ejemplo de 0,4 mm.» |

Atribución correcta: Bambu Lab Wiki para las citas de Bambu, Prusa Knowledge Base para las de Prusa. Modo verbal exacto en todas las citas.

### 2 · Contradicciones internas

Las dos contradicciones están resueltas con matiz:

1. **20–70 % vs < 80 %**: el artículo explica que Bambu habla del rango óptimo de calidad y Prusa del límite técnico que el slicer acepta.
2. **0,08 vs 0,10 mm**: el artículo explica que Bambu habla del rango que la impresora puede producir y Prusa de la relación calidad/tiempo recomendada.

No hay otras contradicciones internas ni datos dudosos presentados como ciertos.

### 3 · Relleno y frases de IA

No se detectan frases de IA («en el mundo de la impresión 3D», «es importante destacar», «en resumen», etc.). No hay párrafos sin datos concretos: cada sección lleva cifras, citas o condiciones.

### 4 · Las cuatro etapas

- **Diferencial**: abre la guía, tiene 3 comprobaciones (escalones, rotura, tiempo), cada una con sus dos caras (`si` y `no`). Enlace `siNo.guia: 'warping-pla'` — verificado que existe.
- **Variables**: `altura` (necesaria, con 3 opciones) y `boquilla` (con 3 opciones). Todas justificadas en `para`, ninguna decorativa.
- **Reglas**: 7 reglas, todas con condiciones alcanzables. Las reglas con número llevan `alcance` que declara el rango de la fuente.
- **Conocimiento**: 6 tarjetas, filtradas cuando toca.
- **`fueraDeAlcance`**: 4 entradas, cada una dice qué caso no entra, por qué, y a dónde llevarlo. Enlaces a `adhesion-primera-capa`, `warping-pla` y `separaciones-entre-capas` — verificados que existen en `src/lib/guias.ts`.
- **Acciones con cifra en `valor`**: todas las reglas con número lo llevan en `valor`, no enterrado en `porque`.

### 5 · Citas correctas y accesibles

- 4 fuentes en `sources`, todas con URL presente en `wiki/raw/`.
- No hay fuentes repetidas.
- Primera cita en la primera mitad del artículo (sección `resolución-vertical`).
- Todas las citas literales verificadas como exactas en el crudo.

## Notas que no bloquean

- La sección `sin-layerheight` explica por qué el campo puede estar vacío. Es útil y no sobra.
- La regla `altura-variable-ahorro` no tiene `valor` numérico, pero no es una acción con cifra: es una recomendación de usar la función. No requiere `alcance` numérico.
