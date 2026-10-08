# Revisión de temperatura-hotend

**Veredicto: APROBADO** — 0 fallos.

## Comprobaciones

| # | Comprobación | Resultado |
|---|---|---|
| 1 | Afirmaciones con respaldo | PASA — todas las cifras y citas verificadas en `wiki/raw/` |
| 2 | Contradicciones internas | PASA — las dos tensiones (PLA Bambu vs Prusa; temperatura↔stringing) salen las dos, con matiz |
| 3 | Relleno y frases de IA | PASA — sin frases de relleno ni párrafos sin datos concretos |
| 4 | Las cuatro etapas | PASA — diferencial, variables, conocimiento y reglas cumplen su función |
| 5 | Citas correctas y accesibles | PASA — 5 fuentes distintas, todas en `wiki/raw/` |

## Detalle de la verificación

### 1 · Afirmaciones con respaldo (verificadas con `grep` en `wiki/raw/`)

| Cifra / cita | Fuente | Resultado |
|---|---|---|
| PLA 190–240 °C | `material-bambulab-material-table.md` línea 32 | ✓ |
| PETG 240–270 °C | `material-bambulab-material-table.md` línea 40 | ✓ |
| ABS 240–280 °C | `material-bambulab-material-table.md` línea 48 | ✓ |
| ASA 240–280 °C | `material-bambulab-material-table.md` línea 50 | ✓ |
| PC 260–290 °C | `material-bambulab-material-table.md` línea 51 | ✓ |
| PA 260–300 °C | `material-bambulab-material-table.md` línea 52 | ✓ |
| TPU 200–250 °C | `material-bambulab-material-table.md` líneas 44–47 | ✓ |
| PLA 195–220 °C (Prusa) | `separaciones-entre-capas-prusa-kb-layer-separation-and-splitting-fdm.md` línea 29 | ✓ |
| «Lowering the temperature decreases the occurrence of strings. Try decreasing the nozzle temperature by 5 – 10°C…» | `temperatura-hotend-prusa-stringing-and-oozing.md` línea 41 | ✓ |
| «This method allows the extruded filament more time to bond with the layer below, thereby improving interlayer adhesion.» | `temperatura-hotend-bambulab-interlayer-cracking.md` línea 31 | ✓ |
| «5°C increments» (PLA) | `separaciones-entre-capas-prusa-kb-layer-separation-and-splitting-fdm.md` línea 29 | ✓ |
| «insufficient temperature» → cracking/separation | `separaciones-entre-capas-prusa-kb-layer-separation-and-splitting-fdm.md` línea 29 | ✓ |
| «very high printing temperatures» → stringing | `temperatura-hotend-prusa-stringing-and-oozing.md` línea 14 | ✓ |
| «gathered moisture» → stringing | `temperatura-hotend-prusa-stringing-and-oozing.md` línea 44 | ✓ |
| «rough and less delicate surfaces» (alta velocidad) | `temperatura-hotend-bambulab-slice-param.md` línea 17 | ✓ |
| «higher gloss» (baja velocidad + alta temperatura) | `temperatura-hotend-bambulab-slice-param.md` línea 17 | ✓ |

### 2 · Contradicciones internas

- **Rango de PLA:** Bambu Lab 190–240 °C vs Prusa 195–220 °C → ambas cifras presentes con su fuente y su atribución. Sin contradicción sin resolver.
- **Trueque temperatura↔stringing:** «Subir la temperatura mejora la unión» (Bambu) y «Bajar la temperatura mejora los hilos» (Prusa) → ambas presentes, con el matiz de que cada una empeora el otro extremo.

### 3 · Relleno y frases de IA

Sin frases de relleno detectadas («En el mundo de la impresión 3D», «es importante destacar», «en resumen», «en conclusión», etc.). Todos los párrafos contienen datos concretos.

### 4 · Las cuatro etapas

- **Diferencial:** Abre la guía, 3 comprobaciones con `si` y `no` declarados, enlace `siNo` a `separaciones-entre-capas` (que existe en `guias.ts`).
- **Variables:** `material` (necesaria, con `para`) y `temperatura` (con `para`). Ninguna decorativa.
- **Conocimiento:** Filtrado por variables cuando toca (`cuando: { material: 'pla' }`, etc.).
- **Reglas:** Todas se pueden llegar; acciones con cifra en `valor`; reglas con número tienen `alcance`.
- **`fueraDeAlcance`:** No vacío, con 6 casos concretos que dicen qué no entra y a dónde llevarlo.

### 5 · Citas correctas y accesibles

- Las 5 URLs de `sources` están en `wiki/raw/` con ese mismo `url`.
- Las 5 fuentes son distintas (sin repeticiones).
- La primera cita está en la primera mitad del artículo (línea 72, conocimiento).
- Todas las citas literales verificadas con `grep` en `wiki/raw/`.

## Notas que no bloquean

- La guía menciona TPU 200–250 °C en las variables con la etiqueta «(Bambu)», lo cual es correcto: la cifra proviene de la tabla de Bambu Lab. No hay una fuente de Prusa para TPU en los ficheros crudos de esta guía, y la guía no afirma que la haya.
- La tarjeta `hotendTemp-opcional` es técnica (sobre `ProjectMetadata`), no de impresión 3D. Es correcta en contexto: explica por qué la variable `temperatura` puede no precontestarse.
