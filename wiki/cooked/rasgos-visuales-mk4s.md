---
titulo: Rasgos visuales — Original Prusa MK4S
tema: rasgos-visuales-mk4s
fuentes:
  - wiki/raw/rasgos-visuales-mk4s-prusa-oficial.md
cocinado: 2026-10-15
---

# Rasgos visuales: MK4S

> **Reprocesado.** La review de terceros que respaldaba parte del material anterior se
> ha borrado del repo; sus afirmaciones se han retirado (ver `## Descartado`). Queda la
> ficha oficial de Prusa, que es fuente primaria y suficiente para la estructura.

## Estructura
- **Diseño abierto**: «The open "bed-slinger" design is the result of a 10-year evolution», con el acceso más fácil a todas las piezas sin desmontaje largo — `rasgos-visuales-mk4s-prusa-oficial.md`
- **Sin piezas soldadas ni pegadas**: todo se puede desmontar con un juego de llaves Allen — `rasgos-visuales-mk4s-prusa-oficial.md`
- **Estructura de extrusiones y marco de aluminio** (fila «Frame» de la tabla comparativa oficial) — `rasgos-visuales-mk4s-prusa-oficial.md`
- Cinemática **cartesiana** (fila «Kinematics» de la misma tabla) — `rasgos-visuales-mk4s-prusa-oficial.md`
- Volumen de impresión **250 × 210 × 220 mm** — `rasgos-visuales-mk4s-prusa-oficial.md`
- Dimensiones **500 × 550 × 400 mm (X×Y×Z) y 7 kg, «without spool»**: las dimensiones oficiales se dan sin la bobina — `rasgos-visuales-mk4s-prusa-oficial.md`
- **Sin cámara de impresión**: la fila «Chamber» dice «No (optional Enclosure as a separate add-on)» — `rasgos-visuales-mk4s-prusa-oficial.md`
- La temperatura máxima de cámara es de **45 °C, y sólo dentro del Enclosure** — `rasgos-visuales-mk4s-prusa-oficial.md`

## Pantalla
- **Pantalla LCD gráfica a color de 3,5″ (65 000 colores) con control táctil** — `rasgos-visuales-mk4s-prusa-oficial.md`
- La única iluminación propia de la máquina es la **barra de estado RGB de la pantalla** (fila «Built-in Lighting»): no hay luz de cámara ni de cama — `rasgos-visuales-mk4s-prusa-oficial.md`
- Posición y orientación de la pantalla: sin verificar.

## Filamento y bobina
- Las dimensiones oficiales se dan **sin bobina**, lo que la ficha afirma de forma explícita — `rasgos-visuales-mk4s-prusa-oficial.md`
- Filamentos que maneja: **PLA, PETG, ASA, filamentos con carga de carbono y TPU flexible** — `rasgos-visuales-mk4s-prusa-oficial.md`
- Sensores avanzados: sensor de filamento y **monitorización de RPM de los motores de los ventiladores** — `rasgos-visuales-mk4s-prusa-oficial.md`
- Dónde se engancha exactamente la bobina (lateral, trasera o soporte del marco): sin verificar.
- Conectividad: **receptor NFC**, módulo Wi-Fi ESP opcional incluido con la impresora; medio de impresión: unidad USB — `rasgos-visuales-mk4s-prusa-oficial.md`

## Extrusor
- **Nextruder de accionamiento directo**, compatible con E3D V6 mediante adaptador — `rasgos-visuales-mk4s-prusa-oficial.md`
- Sistema de transmisión por **engranajes planetarios con relación 10:1** — `rasgos-visuales-mk4s-prusa-oficial.md`
- Boquilla **high-flow Prusa Nozzle brass CHT de 0,4 mm** — `rasgos-visuales-mk4s-prusa-oficial.md`
- Ventilador de refrigeración de **turbina de alto rendimiento con sistema de 360°** — `rasgos-visuales-mk4s-prusa-oficial.md`
- Forma de la carcasa del Nextruder y por dónde orienta el aire el ventilador de 360°: sin verificar.

## Ventilación y detalles
- **Sin cámara integrada**: la cámara es un extra opcional y una solución independiente, no va dentro — `rasgos-visuales-mk4s-prusa-oficial.md`
- **El cerramiento (Enclosure) es un accesorio aparte**, no parte de la máquina — `rasgos-visuales-mk4s-prusa-oficial.md`
- La fila «Advanced sensors» de la MK4S **no incluye sensor de puerta**, que sí aparece en la columna de la CORE One — `rasgos-visuales-mk4s-prusa-oficial.md`
- Para sacar todo el partido a los materiales, la propia ficha recomienda **alojar la MK4S en un Enclosure** — `rasgos-visuales-mk4s-prusa-oficial.md`

## Descartado
- «Flujo volumétrico de 24 mm³ con Prusament PLA, un 50 % más que los 16 mm³ del MK4» — salía de una review de terceros **borrada del repo**. Era además un dato de rendimiento, no un rasgo visible.
- «A new 360 fan freezes the filament into a more precise shape» — misma review borrada. El ventilador de 360° sigue afirmado por la ficha oficial.
- «Placa flexible de acero PEI» — misma review borrada; la ficha oficial viva no la menciona, así que pasa a `Sin verificar`.

## Sin verificar
- **Posición de la pantalla**: la ficha da tamaño y tipo, no dónde está montada.
- **Punto exacto de montaje de la bobina**: la ficha sólo permite saber que va aparte, no si es lateral, trasera o superior.
- **Forma del cabezal del Nextruder** y la orientación del ventilador de 360°.
- **Si hay paneles o cubiertas visibles** sobre las extrusiones de aluminio.
- **Situación y forma de la barra de estado RGB** de la pantalla.
- **Color de la máquina**: ninguna fuente lo menciona.
- **Tipo de placa de impresión** (la ficha viva no la describe; la anterior la daba por lámina flexible de acero PEI y se ha retirado).

## Contradicciones
Ninguna. Queda una sola fuente viva y no se opone a nada. La tabla comparativa que publica en su propia página nombra la columna central «Prusa CORE One» aunque el encabezado actual del sitio hable de CORE One+ (Gen 2); eso afecta al nombre del modelo, no a ningún rasgo de la MK4S.
