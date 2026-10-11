# Revisión de enclosure-y-warping

**Veredicto: RECHAZADO** — 1 fallo, bloqueante.

## Comprobaciones

| # | Comprobación | Resultado |
|---|---|---|
| 1 | Afirmaciones con respaldo | FALLA — 1 atribución incorrecta |
| 2 | Contradicciones internas | PASA |
| 3 | Relleno y frases de IA | PASA |
| 4 | Las cuatro etapas | PASA |
| 5 | Citas correctas y accesibles | PASA |

## Fallos, con dónde y qué hacer

### 1 · Bloqueante · Atribución incorrecta

**Dónde:** tarjeta `matiz-cuatro-partes`, campo `cita.texto`.

**Qué dice:** "Con Cool Plate (~35 °C de cama), la cámara no se calienta lo suficiente como para causar heat creep. Con Textured PEI (cama 55–65 °C), la cámara se calienta más y hay que abrir."

**Por qué falla:** la fuente citada es "Bambu Lab, heat creep", pero el dato "55–65 °C" para Textured PEI no está en `wiki/raw/enclosure-y-warping-bambu-wiki-heat-creep.md`. Está en `wiki/raw/warping-pla-bambu-wiki-warping-falling-off-collapsing.md` (línea 72: "needs 55–65 °C for PLA"; línea 133: "Target 55 – 65 °C on Textured PEI"). La parte de Cool Plate sí está en `heat-creep.md` (línea 17: "~35C"; línea 20: "does not reach a value that is high enough"). La cita mezcla dos fuentes en una frase y las atribuye a una sola.

**Qué hacer:** separar la cita en dos, cada una con su fuente. La parte de Cool Plate lleva "Bambu Lab, heat creep". La parte de Textured PEI 55–65 °C lleva "Bambu Lab, warping-falling-off-collapsing". O cambiar la fuente a "Bambu Lab, heat creep + warping-falling-off-collapsing" si se mantiene como una sola cita.

## Notas que no bloquean

- La guía está bien estructurada y las cuatro etapas cumplen su función.
- Las contradicciones del cocinado se explican con matiz en `activa-vs-pasiva` y `matiz-cuatro-partes`.
- No hay relleno ni frases de IA.
- Las variables están todas justificadas y ninguna es decorativa.
- Las reglas están ordenadas y todas se pueden llegar.
- El conocimiento está filtrado por variables cuando toca.
- `fueraDeAlcance` no está vacío y dice algo concreto.
- Las acciones con cifra llevan su `valor`.
- Las reglas con número tienen su `alcance`.
- Las fuentes son correctas y accesibles, y la primera cita está en la primera mitad.
