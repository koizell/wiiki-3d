# Revisión de ruta-de-calibracion (turno 1)

**Veredicto: RECHAZADO** — 6 fallos, de los cuales 1 bloqueante.

La arquitectura de la guía es la correcta: enruta, no repite, declara las
contradicciones con sus dos lados y no elige. El problema no es de forma, es de
**atribución**: en tres sitios la guía trata el tramo de Duet3D como si fuera una
tercera ruta completa, y una de esas tres veces dice algo que la propia tarjeta
del guide desmiente.

| # | Comprobación | Resultado |
|---|---|---|
| 1 | Afirmaciones con respaldo | FALLA — 1 afirmación falsa sobre Duet3D, 2 deslizamientos de atribución |
| 2 | Contradicciones internas | FALLA — el título y una regla contradicen dos tarjetas de la propia guía |
| 3 | Relleno y frases de IA | PASA — 0 frases de IA, ninguna tarjeta sin dato |
| 4 | Las cuatro etapas | PASA — 3 comprobaciones, 5 variables, 16 tarjetas, 12 reglas, 3 `fueraDeAlcance` |
| 5 | Citas correctas y accesibles | FALLA — se cita a Klipper3d y Marlin, y ninguno está en `fuentes` |

`npm run verify:guias` pasa (1091/1091): los fallos que hay aquí no los ve el
verificador automático.

## Las contradicciones, una por una

### Contradicción 2 — la dirección del síntoma del PA: PASA, y bien resuelta

Es la parte mejor tratada de la guía. El choque frontal queda **declarado, no
resuelto**: la misma forma queda atribuida a lados opuestos del rango.

- **Bambu** (raw `ruta-de-calibracion-bambu-wiki-flow-dynamics-calibration.md:159`): «a K factor value of 0.006 … would be too low, as the corner
  **is bulging and it's round**».
- **Klipper** (raw `flow-rate-klipper-pressure-advance.md:43`): «Layers
  **below** the ideal pressure_advance setting will have blobbing at the corners, and layers
  **above** the ideal setting can lead to **rounded corners**».

La guía no publica un «K bajo = bulging» suelto: la tarjeta lo dice con todas
las letras.

### Contradicción 3 — la escala del K: PASA

Cuatro escalas, ninguna traducida, ninguna comparada.

| Escala | Fuente |
|---|---|
| Bambu 0,006–0,024 | raw Bambu:159 |
| Prusa 0,05 (0,4) / 0,04 (0,6) | raw Prusa:77 y :90 |
| Duet3D 0,025 directa → 0,7 / 2,0 en Bowden largo, en segundos | raw Duet3D:53-61 |
| Marlin 0,1–2,0 mm/mm/s | raw Marlin:40 |
| Klipper 0,050–1,000, alto sólo en Bowden | raw Klipper:53 |

Y el cierre: «El 0,05 de Prusa y el S0.025 de Duet3D no son el mismo número con
otro nombre».

### Contradicción 4 — la retracción en Bowden: PASA

Tres valores, sin resolver: OrcaSlicer 1–6 mm con paso de 0,2, Control3D 6–7 mm,
Simplify3D hasta 15 mm. El solapamiento en el 6 mm está dicho, y los límites de
2 mm y 6–7 mm van marcados como de una sola fuente.

### Contradicción 1 — el orden: FALLA → el fallo bloqueante

**Dónde:** tarjeta `tres-ordenes` (línea 138) frente a las reglas `temperatura`
(línea 410), `retracciones` (líneas 447 y 450) y la tarjeta `retraccion-directa`
(línea 290).

**Qué dice la tarjeta:** «Duet3D publica **sólo un tramo**: Input Shaping, PA y retracción.»

**Qué dicen las reglas:**

1. `temperatura` → `alcance`: «**Los tres órdenes la ponen la primera.**»
2. `retracciones` → `porque`: «es **el único paso en el que los tres órdenes coinciden**: todos lo ponen tras el PA **y del flujo**»
3. `retraccion-directa`, punto 3: «**Los tres órdenes** ponen la retracción después del PA y del flujo, así que es el paso que menos se mueve.»

**Por qué falla:** la página de Duet3D
(`raw/ruta-de-calibracion-duet3d-pressure-advance.md:148`) sólo dice «It is recommend to first tune Input Shaping, then Pressure Advance, then Retraction».
La temperatura **no aparece** en él, y el flujo tampoco.

Y «el único paso en el que los tres órdenes coinciden» **tapa un desacuerdo que el
material cocinado declara explícitamente**: «Duet3D mete el Input Shaping antes de
la retracción, y OrcaSlicer lo pone en el grupo avanzado, **después** de la
retracción… Es un desacuerdo real entre dos fuentes oficiales sobre el orden de
dos pasos» (cocido, Contradicción 1).

**Qué hacer:** cambiar «los tres órdenes» por «los dos órdenes que publican la
ruta completa (Control3D y OrcaSlicer)», y en `retracciones` decir lo que Duet3D
sí aporta.

## Los otros cinco fallos

| # | Gravedad | Dónde | Qué hacer |
|---|---|---|---|
| 2 | Importante | `titulo`, l. 20 | «Ruta de calibración: **qué orden sigue cada fabricante**» promete un dato que la guía explica que no existe. |
| 3 | Importante | `entrada`, l. 26, y las reglas | «Lo que sigue es **la secuencia que se puede recomendar**» sin declarar cuál es. El material cocinado lo exige literal. |
| 4 | Importante | `fuentes` | Klipper3d y Marlin se citan y no están: la `pa-esquina-redondeada` **cita literal a Klipper3d** y la `pa-vocabulario` describe el vocabulario de Marlin. |
| 5 | Menor | reglas `flujo` y `pa` | Dos `porque` atribuyen a Control3D lo que dice OrcaSlicer. |
| 6 | Menor | `retraccion-directa`, p. 2 | «el **material cocinado** la marca como sin corroborar»: jerga interna en un texto para el lector. |

## Notas que no bloquean

- **La contradicción de Input Shaping no se declara.** El material cocinado la
  lista como desacuerdo real entre dos fuentes oficiales. La guía enseña los dos
  fragmentos en la tarjeta `tres-ordenes` pero nunca dice que se contradicen.
- **Bambu sí lista un orden, aunque sin justificarlo.** La tarjeta
  `sin-orden-canonico` dice que Bambu no publica un orden. La formulación exacta
  sería «Bambu lista sus tests en el menú de Bambu Studio, pero no los justifica:
  es un orden de menú, no una secuencia recomendada». La diferencia importa,
  porque esa tarjeta es la bisagra de toda la guía.
- **La tarjeta `valor-gcode` mezcla dos ejes.** Está filtrada por `slicer`, pero
  sus puntos 2 y 3 son de Duet3D (firmware).
- **La «pieza final» cierra bien**, pero no dice «después de los siete tests», que
  es la frase que lo convierte en cierre y no en un paso más.
- **Lo que sí está impecable:** las nueve citas entrecomilladas están literalmente
  en `wiki/raw/`; las cinco URLs de `fuentes` están en `wiki/raw/` y no hay
  ninguna repetida; la primera cita está en la primera tarjeta; y las Control3D
  están marcadas como lo que son en cada sitio.
