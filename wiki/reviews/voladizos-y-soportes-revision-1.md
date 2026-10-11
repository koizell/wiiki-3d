# Revisión de voladizos-y-soportes

**Veredicto: RECHAZADO** — 5 fallos, de los cuales 1 bloqueante.

## Comprobaciones

| # | Comprobación | Resultado |
|---|---|---|
| 1 | Afirmaciones con respaldo | FALLA — 1 cita bloqueante con palabra inventada |
| 2 | Contradicciones internas | PASA |
| 3 | Relleno y frases de IA | PASA |
| 4 | Estructura (diferencial, variables, reglas, fueraDeAlcance) | PASA |
| 5 | Citas correctas y accesibles | FALLA — 1 palabra sin respaldo en raw |

## Fallos, con dónde y qué hacer

### 1 · Bloqueante · Cita con palabra inventada ("top cover")

**Dónde:** tarjeta `abrir-puerta`, cita.

**Qué dice:** "opening the front door and **top cover** can improve cooling performance"

**Por qué falla:** el raw de Bambu dice "**glass lid**", no "top cover". `grep` de "top cover" en `wiki/raw/` no devuelve coincidencias. La cita está entrecomilladas y atribuye a Bambu Lab una palabra que Bambu Lab no escribió. No es una paráfrasis: es una cita con una palabra cambiada, y el cambio convierte una instrucción específica (abrir la tapa de cristal) en otra genérica (abrir la cubierta superior).

**Qué hacer:** cambiar "top cover" por "glass lid" en la cita, o parafrasear sin comillas.

### 2 · Importante · Cita de refrigeración pierde "other layers'"

**Dónde:** tarjeta `refrigeracion`, cita.

**Qué dice:** "lower the temperature of **the layers** to ~205 °C"

**Por qué falla:** el raw dice "lower the **other layers'** nozzle temperature". La cita omite "other layers'" y "nozzle", lo que cambia el significado: Bambu recomienda bajar la temperatura de las capas *que no son de voladizo*, no de las capas de voladizo. Quien lea la cita puede bajar la temperatura de las capas equivocadas.

**Qué hacer:** incluir "other layers'" en la cita, o parafrasear sin comillas.

### 3 · Menor · Cita de orientación pierde "possibly"

**Dónde:** tarjeta `orientacion`, cita.

**Qué dice:** "to **reduce** overhangs and consequently the amount of support generated"

**Por qué falla:** el raw dice "to **possibly** reduce overhangs". La cita omite "possibly", convirtiendo una posibilidad en una certeza.

**Qué hacer:** incluir "possibly" en la cita, o parafrasear sin comillas.

### 4 · Menor · Cita de umbral cambia "input angle" por "support threshold angle"

**Dónde:** tarjeta `umbral-bambu-prusa`, cita.

**Qué dice:** "the higher the **support threshold angle** is set, the more supports are generated"

**Por qué falla:** el raw dice "The larger the **input angle**, the more supports will be generated." La cita cambia "input angle" por "support threshold angle", que es un término que el raw no usa en esa frase.

**Qué hacer:** cambiar "support threshold angle" por "input angle" en la cita, o parafrasear sin comillas.

### 5 · Menor · Múltiples citas son paráfrasis, no citas literales

**Dónde:** tarjetas `angulo-referencia`, `velocidad-voladizo`, `cara-apoyada`, `interface-layers`, `soportes-fallan`, `patron-soporte`, `brim-soporte`.

**Qué dice:** todas usan comillas pero ninguna es literal.

**Por qué falla:** el formato de la guía usa `cita.texto` para citas entrecomilladas. Si no son literales, no deberían llevar comillas. Esto es un fallo de formato, no de contenido: las paráfrasis son fieles, pero el lector espera una cita literal cuando ve comillas.

**Qué hacer:** o hacer las citas literales (copiando el raw exacto), o quitar las comillas y presentar como paráfrasis.

## Notas que no bloquean

- La distinción entre **overhang angle** y **overhang threshold** está bien explicada y es el punto fuerte de la guía.
- El diferencial tiene 3 comprobaciones, cada una con dos caras (`si` y `no`). Correcto.
- Las 4 variables tienen `para` y ninguna es decorativa: todas se usan en reglas.
- Las 15 reglas tienen `cuando`, `valor` (cuando llevan cifra) y `alcance`. Todas se pueden llegar.
- `fueraDeAlcance` tiene 5 entradas concretas, con `sintoma`, `porQue` y `guia` cuando existe.
- Los enlaces `warping-pla`, `adhesion-primera-capa`, `separaciones-entre-capas` y `material` apuntan a guías que existen.
- No hay contradicciones internas.
- No hay relleno ni frases de IA.
- El cocinado no tiene sección `## Sin respaldo` (dice "No hay afirmaciones sin respaldo en este lote"), y la guía no presenta nada como respaldado que no lo esté.
