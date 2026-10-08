# Revisión de enclosure-y-warping (segunda vuelta)

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

Cada cifra y cada afirmación técnica de la guía se ha comprobado contra `wiki/raw/`, no contra `wiki/cooked/`. Todas están respaldadas:

- **Temperaturas de cámara por filamento** (0 °C para PLA/PETG/TPU/PVA, 40–50 °C para ABS/ASA, 50–60 °C para PC/PA-CF/PAHT-CF/PET-CF/PPA-CF/PPS/PPS-CF): en `wiki/raw/enclosure-y-warping-bambu-wiki-chamber-temperature.md`, tabla de temperaturas recomendadas.
- **Temperatura de reblandecimiento** (45 °C PLA, 70 °C PETG): en `wiki/raw/enclosure-y-warping-bambu-wiki-chamber-temperature.md`, línea 19.
- **Mecanismo de heat creep**: en `wiki/raw/enclosure-y-warping-bambu-wiki-heat-creep.md`, línea 13.
- **Cool Plate ~35 °C**: en `wiki/raw/enclosure-y-warping-bambu-wiki-heat-creep.md`, línea 17.
- **Textured PEI 55–65 °C**: en `wiki/raw/warping-pla-bambu-wiki-warping-falling-off-collapsing.md`, línea 72.
- **Placas de terceros >50 °C**: en `wiki/raw/enclosure-y-warping-bambu-wiki-heat-creep.md`, línea 24.
- **Ambiente extremadamente bajo 5–10 °C**: en `wiki/raw/enclosure-y-warping-bambu-wiki-heat-creep.md`, línea 28.
- **X1E 60 °C máximo**: en `wiki/raw/enclosure-y-warping-bambu-wiki-chamber-temperature.md`, línea 45.
- **35–39 °C foro de Bambu (Eno)**: en `wiki/raw/enclosure-y-warping-bambu-forum-pla-in-x1c.md`, línea 14.
- **40–50 °C foro de Prusa (BogdanH)**: en `wiki/raw/enclosure-y-warping-prusa-forum-optimal-enclosure-temps.md`, línea 30.
- **«cuanto más alto mejor» (Artur5)**: en `wiki/raw/enclosure-y-warping-prusa-forum-optimal-enclosure-temps.md`, línea 62.
- **Hotend V6 de Prusa propenso al heat creep**: en `wiki/raw/enclosure-y-warping-prusa-forum-optimal-enclosure-temps.md`, línea 35.
- **Corrientes de aire y warping**: en `wiki/raw/warping-pla-bambu-wiki-warping-falling-off-collapsing.md`, líneas 194–196.

Las cifras de `## Sin respaldo` del cocinado (35–39 °C y 40–50 °C) salen marcadas en la guía como «una sola fuente secundaria, sin corroboración». ✅

### 2 · Contradicciones internas

No se ha encontrado ninguna contradicción interna. Las tres contradicciones del cocinado se explican con su matiz:

1. **Enclosure cerrado vs abierto para PLA**: la guía explica en `matiz-cuatro-partes` que depende de la chapa, el ambiente, el hotend y la cama.
2. **0 °C vs 35–39 °C para PLA**: la guía explica en `activa-vs-pasiva` que 0 °C es la consigne de calefacción activa y 35–39 °C es la temperatura real que se alcanza.
3. **Corrientes de aire vs calor de cámara**: la guía explica en `matiz-cuatro-partes` que la misma puerta se cierra para prevenir corrientes y se abre para prevenir calor.

### 3 · Relleno y frases de IA

No se ha detectado ninguna frase de IA («en el mundo de la impresión 3D», «es importante destacar», «en resumen», «en conclusión», «cabe destacar», «sin duda alguna», «a lo largo de este artículo»). La guía es un módulo de TypeScript con estructura de reglas, variables y tarjetas; no hay prosa de relleno. Cada tarjeta contiene datos concretos (temperaturas, condiciones, citas).

### 4 · Las cuatro etapas

- **Diferencial**: abre la guía, tiene 3 comprobaciones, cada una con `si` y `no`. ✅
- **Variables**: todas tienen `para`, ninguna es decorativa (cada una afecta a reglas). ✅
- **Reglas**: ordenadas, todas se pueden llegar con las variables, las acciones con cifra tienen `valor`, toda regla con número tiene `alcance`. ✅
- **Conocimiento**: las cifras que dependen de una variable llevan su `cuando`. ✅
- **`fueraDeAlcance`**: no está vacío, dice qué caso no entra, por qué, y a dónde llevarlo. Las tres guías referenciadas (`warping-pla`, `separaciones-entre-capas`, `adhesion-primera-capa`) existen. ✅

### 5 · Citas correctas y accesibles

- Las 5 URLs de `sources` están en `wiki/raw/` con ese mismo `url`. ✅
- No hay dos fuentes repetidas. ✅
- Toda afirmación técnica del artículo se comprueba en `wiki/raw/`. ✅
- Las citas entrecomilladas están en `wiki/raw/`. ✅
- La primera cita está en la primera mitad del artículo (en `tabla-camara`, la primera tarjeta de conocimiento). ✅
- **Atribución correcta**: Eno (foro de Bambu), BogdanH (foro de Prusa), Artur5 (foro de Prusa), Neophyl (foro de Prusa). ✅
- **Exactitud y modo verbal**: las citas son traducciones literales o paráfrasis fieles de las fuentes. No se convierte una sospecha en un resultado ni un plan en un caso resuelto. ✅
- **Contexto**: no se mezclan dos fuentes en una frase de forma engañosa. La cita de `foro-abs` nombra explícitamente a los dos usuarios y el foro. ✅

## Notas que no bloquean

- La guía no menciona las cifras de `## Sin respaldo` que no aparecen (20–25 °C de Neophyl, 20–40 °C de Artur5 para PETG, 45 °C de Ondrej Liptak para ventilador, 45–50 °C de Artur5 para Lack). Es una omisión aceptable, no un fallo.
- La guía no menciona a Neophyl en las reglas, solo en el conocimiento. Aceptable, ya que su recomendación (20–25 °C) es una fuente secundaria sin corroboración.
