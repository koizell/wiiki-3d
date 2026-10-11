# Revisión de altura-capa

**Veredicto: RECHAZADO** — 2 fallos, de los cuales 2 bloqueantes.

## Comprobaciones

| # | Comprobación | Resultado |
|---|---|---|
| 1 | Afirmaciones con respaldo | PASA |
| 2 | Contradicciones internas | PASA |
| 3 | Relleno y frases de IA | PASA |
| 4 | Estructura y función | PASA |
| 5 | Citas correctas y accesibles | FALLA — 2 enlaces a guías inexistentes |

## Fallos, con dónde y qué hacer

### 1 · Bloqueante · Enlace a guía inexistente: `warping-pla`

**Dónde:** `fueraDeAlcance`, segunda entrada (línea 179 del `.ts`).

**Qué dice:** `guia: 'warping-pla'`

**Por qué falla:** No existe `src/content/guias/warping-pla.ts`. Las guías que sí existen son `warping.ts` y `enclosure-y-warping.ts`. Con `enlaza.guia` el enlace se rompe.

**Qué hacer:** Cambiar a `guia: 'warping'` (si esa es la guía correcta) o quitar el `guia` y dejar el texto sin enlace.

### 2 · Bloqueante · Enlace a guía inexistente: `separaciones-entre-capas`

**Dónde:** `fueraDeAlcance`, cuarta entrada (línea 189 del `.ts`).

**Qué dice:** `guia: 'separaciones-entre-capas'`

**Por qué falla:** No existe `src/content/guias/separaciones-entre-capas.ts`. La guía que sí existe es `separaciones.ts`. Con `enlaza.guia` el enlace se rompe.

**Qué hacer:** Cambiar a `guia: 'separaciones'` (si esa es la guía correcta) o quitar el `guia` y dejar el texto sin enlace.

## Notas que no bloquean

- Las dos contradicciones del cocinado (límite superior 20–70 % vs < 80 %, y límite inferior 0,08 vs 0,10 mm) salen **las dos, con su matiz**, en las tarjetas de conocimiento. Bien.
- Las cinco citas literales coinciden con `wiki/raw/` palabra por palabra.
- Las atribuciones Bambu Lab / Prusa Research son correctas.
- No hay frases de IA ni párrafos de relleno.
- Las variables están justificadas y ninguna es decorativa.
- Las reglas están ordenadas y todas se pueden llegar.
- Toda acción con cifra la lleva en `valor`.
- Toda regla con número tiene su `alcance`.
