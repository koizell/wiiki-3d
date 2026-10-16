---
titulo: Capas desplazadas
tema: capas-desplazadas
fuentes:
  - wiki/raw/capas-desplazadas-orcaslicer-wiki-motion-ability.md
  - wiki/raw/capas-desplazadas-orcaslicer-wiki-acceleration.md
  - wiki/raw/capas-desplazadas-orcaslicer-wiki-jerk-xy.md
  - wiki/raw/capas-desplazadas-klipper-docs-tmc-drivers.md
  - wiki/raw/capas-desplazadas-klipper-docs-faq.md
  - wiki/raw/capas-desplazadas-marlin-docs-troubleshooting.md
  - wiki/raw/capas-desplazadas-marlin-docs-m906-stepper-motor-current.md
cocinado: 2026-10-16
---

# Capas desplazadas

> **Contexto de contraste.** `wiki/cooked/separaciones-entre-capas.md` recoge el otro
> fallo con el que se confunde este: la separación/delaminación, que en Prusa es
> consecuencia de fuerzas de warping que superan la adhesión entre capas. **Aquí va la
> causa opuesta: el bloque de capas sale corrido de su sitio, pero la unión entre capas
> se conserva.** La causa es mecánica/electrónica: el hotend no fue donde el firmware
> ordenó, ya sea por correas y poleas (recogido en `separaciones-entre-capas.md` como
> frontera diagnóstica) o por pérdida de pasos (lo que cocinan estas siete fuentes). Subir
> la temperatura de cama o de boquilla **no toca** una capa desplazada: eso sirve para
> separación/adhesión, no para deslizamiento.
>
> **Lo que este lote no contiene.** Las siete fuentes son de movimiento y de drivers
> TMC (OrcaSlicer, Klipper, Marlin). **No hay en ellas nada sobre obstrucción de
> boquilla, sondeo de cama (Z-probe), nivelación, placa base, ni sobre correas/poleas
> físicas** (esas están en `separaciones-entre-capas.md`). Lo que hay aquí es el lado
> eléctrico/firmware de la pérdida de pasos y los límites de movimiento que la provocan.
> Cuando una afirmación de este fichero es específica de un firmware, se marca.
>
> **Ninguna de estas fuentes es un artículo sobre el defecto.** OrcaSlicer habla de los
> *parámetros* que limitan el movimiento; Klipper y Marlin hablan de las *condiciones* bajo
> las que un motor pierde pasos o deja de responder. **No hay cifras de aceleración ni de
> jerk "seguros" en ninguna fuente**: sólo límites configurables y variables.

## Afirmaciones

### Qué es una capa desplazada (definición que ya está cocinada, y por qué importa aquí)

> **Nota de frontera con `separaciones-entre-capas.md`, no con estas fuentes.** La
> definición mecánica —*"the layers of the printed object to shift from their intended
> positions… associated with an abnormal movement of the X-axis and/or the Y-axis"*,
> con correas y poleas como causa principal— la da Prusa en su artículo de layer
> shifting y está cocinada en `wiki/cooked/separaciones-entre-capas.md` (`## Afirmaciones
> ### La frontera diagnóstica`). Ninguna de las siete fuentes de este lote la repite, así
> que **no se vuelve a cocinar aquí**: se remite. Lo que estas siete fuentes añaden son las
> condiciones eléctricas/firmware que pueden producir el mismo resultado: pérdida de pasos
> del motor y desalineación del hotend a mitad de imprimir.

- **Criterio de distinción, por el mismo Prusa:** *"it is crucial to recognize in
  which axis the layers shifted… Troubleshooting is the same for both axes."* Una capa
  desplazada se reconoce por el eje en el que se corrió; una capa separada se reconoce
  por el corte limpio con ligera curvatura hacia arriba (del KB de separación entre
  capas). **Las dos son de `wiki/cooked/separaciones-entre-capas.md`, no de este lote.**
  — [Prusa Research, layer-shifting_2020, citado en separaciones-entre-capas.md]

- **Causa mecánica principal del fallo, ya cocinada y no repetible como dato de
  adhesión:** *"Layer shifts are most often caused by the **wrong tension of the belts or
  pulleys not being secure**"* y *"A loose or misaligned pulley is usually the main cause
  of staircase layer shifts."* **Se cita aquí sólo para que no se confunda con las
  causas eléctricas de abajo.** El resto de esa página (procedimientos por modelo,
  geometría de correa/polea, Belt Status) está en el `## Tirado` de
  `separaciones-entre-capas.md`.
  — [Prusa Research, layer-shifting_2020, citado en separaciones-entre-capas.md]

### Límites de movimiento y Motion Ability (OrcaSlicer — slicer, no firmware)

> **Alcance del bloque.** Todo lo siguiente es del slicer OrcaSlicer y describe qué
> límites se imponen *al generar G-code*. OrcaSlicer **limita la aceleración para que no
> supere el máximo** configurado en Motion Ability. Algunas opciones **se ignoran si el
> flavor de G-code es Klipper** (indicado en cada una). No son valores universales: son
> variables que el usuario configura.

- **Emitir los límites a G-code:** *"If enabled, the machine limits will be emitted to
  G-code file. This option will be ignored if the G-code flavor is set to Klipper."*
  Modo `Advanced`. Variable `emit_machine_limits_to_gcode`. Tipo Boolean. CLI example
  `--emit-machine-limits-to-gcode=1`.
  — [OrcaSlicer Wiki, Motion Ability](https://www.orcaslicer.com/wiki/printer_settings/motion%20ability/printer_motion_ability.html) (`wiki/raw/capas-desplazadas-orcaslicer-wiki-motion-ability.md`)

- **Limitación de velocidad:** *"Safeguard maximum speeds for all axes. This will cap the
  speed set by the process if it exceeds these values."* (sin variables concretas en la
  página).
  — [OrcaSlicer Wiki, Motion Ability](https://www.orcaslicer.com/wiki/printer_settings/motion%20ability/printer_motion_ability.html) (`wiki/raw/capas-desplazadas-orcaslicer-wiki-motion-ability.md`)

- **Limitación de aceleración:** *"Safeguard maximum accelerations for all axes. This will
  cap the acceleration set by the process if it exceeds these values."* Modos: `Simple`
  (variables `machine_max_acceleration_x`, `machine_max_acceleration_y`,
  `machine_max_acceleration_z`, `machine_max_acceleration_e`,
  `machine_max_acceleration_extruding`, `machine_max_acceleration_retracting`) y `Advanced`
  (variable `machine_max_acceleration_travel`). Tipo `Float list`. CLI example
  `--machine-max-acceleration-x=1`.
  — [OrcaSlicer Wiki, Motion Ability](https://www.orcaslicer.com/wiki/printer_settings/motion%20ability/printer_motion_ability.html) (`wiki/raw/capas-desplazadas-orcaslicer-wiki-motion-ability.md`)

- **Limitación de jerk:** *"Safeguard maximum jerks for all axes."*
  — [OrcaSlicer Wiki, Motion Ability](https://www.orcaslicer.com/wiki/printer_settings/motion%20ability/printer_motion_ability.html) (`wiki/raw/capas-desplazadas-orcaslicer-wiki-motion-ability.md`)

- **Máximo jerk (Marlin 2, vía firmware):** *"Maximum jerk for each axis (M205 X, Y, Z,
  E, only apply if JD = 0 for Marlin 2 Firmware)"*. Variable `machine_max_jerk_x/y/z/e`.
  Modo `Simple`. Tipo `Float list`.
  — [OrcaSlicer Wiki, Motion Ability](https://www.orcaslicer.com/wiki/printer_settings/motion%20ability/printer_motion_ability.html) (`wiki/raw/capas-desplazadas-orcaslicer-wiki-motion-ability.md`)

- **Máximo Junction Deviation (Marlin 2, vía firmware):** *"Maximum junction deviation
  (M205 J, only apply if JD > 0 for Marlin Firmware. If your Marlin 2 printer uses Classic
  Jerk set this value to 0")."* Variable `machine_max_junction_deviation`. Modo `Advanced`.
  Tipo `Float list`.
  — [OrcaSlicer Wiki, Motion Ability](https://www.orcaslicer.com/wiki/printer_settings/motion%20ability/printer_motion_ability.html) (`wiki/raw/capas-desplazadas-orcaslicer-wiki-motion-ability.md`)

- **Resonance Compensation (definición):** *"Resonance Compensations are the methods used
  to reduce the vibrations of the printer during high-speed movements, which can cause
  ringing on the surface of the model."*
  — [OrcaSlicer Wiki, Motion Ability](https://www.orcaslicer.com/wiki/printer_settings/motion%20ability/printer_motion_ability.html) (`wiki/raw/capas-desplazadas-orcaslicer-wiki-motion-ability.md`)

- **Resonance Avoidance:** reduce la velocidad de la pared exterior para evitar la zona de
  resonancia de la impresora y así evitar el ringing. Variables `resonance_avoidance`
  (Boolean), `min_resonance_avoidance_speed`, `max_resonance_avoidance_speed` (Float).
  — [OrcaSlicer Wiki, Motion Ability](https://www.orcaslicer.com/wiki/printer_settings/motion%20ability/printer_motion_ability.html) (`wiki/raw/capas-desplazadas-orcaslicer-wiki-motion-ability.md`)

- **Input Shaping (definición):** durante movimientos de alta velocidad las vibraciones
  pueden causar ringing (ondulaciones periódicas en la superficie). *"Input Shaping provides
  an effective solution by counteracting these vibrations, improving print quality and
  reducing wear on components without needing to significantly lower print speeds."*
  Variables `input_shaping_emit` (Boolean), `input_shaping_freq_x/y`, `input_shaping_damp_x/y`
  (Float). CLI example `--input-shaping-emit=1`.
  — [OrcaSlicer Wiki, Motion Ability](https://www.orcaslicer.com/wiki/printer_settings/motion%20ability/printer_motion_ability.html) (`wiki/raw/capas-desplazadas-orcaslicer-wiki-motion-ability.md`)

- **Calibración de Input Shaping:** *"It's usually recommended to perform Input Shaping
  calibration once a year or after any mechanical or structural changes such as relocation,
  changing the support surface, new belts, motors, frame, etc."*
  — [OrcaSlicer Wiki, Motion Ability](https://www.orcaslicer.com/wiki/printer_settings/motion%20ability/printer_motion_ability.html) (`wiki/raw/capas-desplazadas-orcaslicer-wiki-motion-ability.md`)

- **Accelerómetros integrados:** *"Some Printers have built-in accelerometers that can be
  used to **automatically** measure the resonant frequencies of the printer. If your printer
  has one, consider using it as it can provide more accurate results in less time and usually
  is autosaved into the printer firmware."*
  — [OrcaSlicer Wiki, Motion Ability](https://www.orcaslicer.com/wiki/printer_settings/motion%20ability/printer_motion_ability.html) (`wiki/raw/capas-desplazadas-orcaslicer-wiki-motion-ability.md`)

- **Tip de VFA calibration** referenciado en la página (enlace, no contenido descargado).
  — [OrcaSlicer Wiki, Motion Ability](https://www.orcaslicer.com/wiki/printer_settings/motion%20ability/printer_motion_ability.html) (`wiki/raw/capas-desplazadas-orcaslicer-wiki-motion-ability.md`)

### Aceleración por tipo de movimiento y cuándo queda la del firmware (OrcaSlicer)

> **Regla madre:** *"Acceleration in 3D printing is usually set in the printer's firmware.
> These settings override the firmware acceleration when the normal printing acceleration is
> greater than 0. Orca limits the acceleration so it doesn't exceed the maximum set in the
> printer's Motion Ability settings."*

- **Override condicionado:** si `default (normal printing) acceleration` es 0, *"Orca
  doesn't send acceleration commands, so the printer's own acceleration is used and the
  other acceleration settings are disabled."* Variable `default_acceleration`. Modo
  `Advanced`. Tipo `Float list`.
  — [OrcaSlicer Wiki, Acceleration](https://www.orcaslicer.com/wiki/print_settings/speed/speed_settings_acceleration.html) (`wiki/raw/capas-desplazadas-orcaslicer-wiki-acceleration.md`)

- **Aceleraciones por movimiento (variables y efecto):** `outer_wall_acceleration`
  (habitualmente menor que la normal, mejor calidad); `inner_wall_acceleration` (mayor que
  outer wall, más velocidad); `bridge_acceleration` (Float o porcentaje del outer wall);
  `sparse_infill_acceleration` (el porcentaje se calcula sobre la aceleración por defecto);
  `internal_solid_infill_acceleration`; `initial_layer_acceleration` (*"Using a lower value
  can improve build plate adhesion"*); `initial_layer_travel_acceleration` (porcentaje sobre
  Travel Acceleration; valor menor mejora adherencia); `top_surface_acceleration`
  (un valor similar al outer wall acceleration se recomienda); `travel_acceleration`
  (habitualmente mayor que la normal para reducir tiempo de viaje).
  — [OrcaSlicer Wiki, Acceleration](https://www.orcaslicer.com/wiki/print_settings/speed/speed_settings_acceleration.html) (`wiki/raw/capas-desplazadas-orcaslicer-wiki-acceleration.md`)

- **Accel to decel (sólo flavor Klipper):** *"Adjusts Klipper's `max_accel_to_decel`
  automatically. Each time Orca sets the acceleration with `SET_VELOCITY_LIMIT ACCEL=`, it
  adds `ACCEL_TO_DECEL=` at the accel to decel percentage of that acceleration. When
  disabled, `ACCEL_TO_DECEL` is not sent." Sólo se muestra cuando el flavor de G-code es
  Klipper; habilitado por defecto. Variables `accel_to_decel_enable` (Boolean) y
  `accel_to_decel_factor` (Percentage, 1 % a 100 %, por defecto 50 %). Ejemplo: a 5000
  mm/s² y 50 % Orca envía `SET_VELOCITY_LIMIT ACCEL=5000 ACCEL_TO_DECEL=2500`. Sólo editable
  si "Enable accel to decel" está marcado.
  — [OrcaSlicer Wiki, Acceleration](https://www.orcaslicer.com/wiki/print_settings/speed/speed_settings_acceleration.html) (`wiki/raw/capas-desplazadas-orcaslicer-wiki-acceleration.md`)

### Jerk y control de esquinas (OrcaSlicer)

- **Definición en firmware:** *"In printer firmware, **Jerk** is the maximum speed change
  (in mm/s) the printer can make instantly, without accelerating. It controls direction
  changes and velocity transitions during movement."*
  — [OrcaSlicer Wiki, Jerk XY](https://www.orcaslicer.com/wiki/print_settings/speed/speed_settings_jerk_xy.html) (`wiki/raw/capas-desplazadas-orcaslicer-wiki-jerk-xy.md`)

- **Efectos clave (resumen literal):** corner control (valores menores = esquinas más
  suaves/mejor calidad; valores mayores = curvas más rápidas, posibles artefactos);
  print speed (jerk mayor reduce desaceleración en cambios de dirección, aumentando velocidad
  total); surface quality (jerk menor minimiza vibraciones y ringing, importante en paredes
  externas). Orca limita el jerk para que no supere Printer Motion Ability.
  — [OrcaSlicer Wiki, Jerk XY](https://www.orcaslicer.com/wiki/print_settings/speed/speed_settings_jerk_xy.html) (`wiki/raw/capas-desplazadas-orcaslicer-wiki-jerk-xy.md`)

- **Interacción con otras calibraciones:** jerk puede trabajar junto con Pressure Advance,
  Adaptive Pressure Advance e Input Shaping para optimizar calidad y velocidad.
  — [OrcaSlicer Wiki, Jerk XY](https://www.orcaslicer.com/wiki/print_settings/speed/speed_settings_jerk_xy.html) (`wiki/raw/capas-desplazadas-orcaslicer-wiki-jerk-xy.md`)

- **Tipos de control de esquinas y su firmware:**
  - **Jerk (tradicional):** establece una velocidad máxima para cambios de dirección.
    - Klipper: Square corner velocity.
    - RepRapFirmware: Maximum instantaneous speed changes (M566).
    - Marlin 2: Classic Jerk (deprecado en favor de Junction Deviation, pero aún usable).
    - Marlin Legacy: Classic Jerk.
  - **Junction Deviation (moderno):** calcula la velocidad de curva a partir de la
    aceleración de cada tramo y del ángulo de la esquina.
  - [OrcaSlicer Wiki, Jerk XY](https://www.orcaslicer.com/wiki/print_settings/speed/speed_settings_jerk_xy.html) (`wiki/raw/capas-desplazadas-orcaslicer-wiki-jerk-xy.md`)

- **Fórmula de conversión Jerk ↔ Junction Deviation:** `JD = 0.4 · Jerk² / Accel`. Valores
  mayores = curvas más rápidas y agresivas; menores = más controladas/suaves.
  — [OrcaSlicer Wiki, Jerk XY](https://www.orcaslicer.com/wiki/print_settings/speed/speed_settings_jerk_xy.html) (`wiki/raw/capas-desplazadas-orcaslicer-wiki-jerk-xy.md`)

- **Uso clásico de Jerk en Marlin 2 sigue disponible:** *"Classic Jerk can still be used in
  Marlin 2, but it is deprecated in favor of Junction Deviation. If your printer uses Classic
  Jerk, set Maximum Junction Deviation to 0 in the printer settings to enable the Jerk
  settings."*
  — [OrcaSlicer Wiki, Jerk XY](https://www.orcaslicer.com/wiki/print_settings/speed/speed_settings_jerk_xy.html) (`wiki/raw/capas-desplazadas-orcaslicer-wiki-jerk-xy.md`)

- **Variables de jerk por tipo de movimiento:** `default_jerk` (si es 0, se usa el jerk por
  defecto de la impresora); `outer_wall_jerk` (habitualmente menor que la normal, mejor
  calidad); `inner_wall_jerk` (moderadamente mayor que outer, más velocidad);
  `infill_jerk` (mayor que inner wall, más velocidad); `top_surface_jerk` (menor que infill,
  mejor calidad); `initial_layer_jerk` (menor que top surface, mejor adherencia);
  `initial_layer_travel_jerk` (menor mejora adherencia; porcentaje sobre Travel Jerk);
  `travel_jerk` (mayor que infill, reduce tiempo de viaje).
  — [OrcaSlicer Wiki, Jerk XY](https://www.orcaslicer.com/wiki/print_settings/speed/speed_settings_jerk_xy.html) (`wiki/raw/capas-desplazadas-orcaslicer-wiki-jerk-xy.md`)

- **Calibración de esquinas** referenciada: Cornering Calibration guide
  (enlace, sin contenido descargado).
  — [OrcaSlicer Wiki, Jerk XY](https://www.orcaslicer.com/wiki/print_settings/speed/speed_settings_jerk_xy.html) (`wiki/raw/capas-desplazadas-orcaslicer-wiki-jerk-xy.md`)

### Corriente de motor en drivers TMC — run current y hold current

> **Fuentes:** Klipper (primaria, oficial) para tuning y para la preferencia sobre
> `hold_current`; Marlin para el comando `M906` y su syntax. La instrucción del usuario
> pide expresamente la distinción run/hold: Klipper es la única de estas fuentes que la
> trata en detalle.

**Klipper — tuning de la corriente del motor:**

- *"A higher driver current increases positional accuracy and torque. However, a higher
  current also increases the heat produced by the stepper motor and the stepper motor
  driver. If the stepper motor driver gets too hot it will disable itself and Klipper
  will report an error. If the stepper motor gets too hot, it loses torque and positional
  accuracy. (If it gets very hot it may also melt plastic parts attached to it or near
  it.)"*
  — [Klipper, TMC drivers](https://www.klipper3d.org/TMC_Drivers.html) (`wiki/raw/capas-desplazadas-klipper-docs-tmc-drivers.md`)

- Tip de tuning: *"prefer higher current values as long as the stepper motor does not get
  too hot and the stepper motor driver does not report warnings or errors. In general, it
  is okay for the stepper motor to feel warm, but it should not become so hot that it is
  painful to touch."*
  — [Klipper, TMC drivers](https://www.klipper3d.org/TMC_Drivers.html) (`wiki/raw/capas-desplazadas-klipper-docs-tmc-drivers.md`)

**Klipper — hold current (y por qué se desaconseja):**

- Si se configura `hold_current`, el driver TMC puede reducir la corriente al motor
  cuando detecta que no se mueve. Pero cambiar la corriente del motor **puede introducir
  movimiento** del motor, por *"detent forces"* del motor (el imán permanente del rotor
  tira hacia los dientes de hierro del estator) o por **fuerzas externas sobre el
  carro del eje**.
  — [Klipper, TMC drivers](https://www.klipper3d.org/TMC_Drivers.html) (`wiki/raw/capas-desplazadas-klipper-docs-tmc-drivers.md`)

- *"Most stepper motors will not obtain a significant benefit to reducing current during
  normal prints, because few printing moves will leave a stepper motor idle for
  sufficiently long to activate the `hold_current` feature. And, it is unlikely that one
  would want to introduce subtle print artifacts to the few printing moves that do leave a
  stepper idle sufficiently long."*
  — [Klipper, TMC drivers](https://www.klipper3d.org/TMC_Drivers.html) (`wiki/raw/capas-desplazadas-klipper-docs-tmc-drivers.md`)

- Alternativa: si se quiere reducir corriente durante las rutinas de inicio, usar comandos
  `SET_TMC_CURRENT` en una macro `START_PRINT` para ajustar la corriente **antes y
  después** de los movimientos normales de impresión.
  — [Klipper, TMC drivers](https://www.klipper3d.org/TMC_Drivers.html) (`wiki/raw/capas-desplazadas-klipper-docs-tmc-drivers.md`)

- Excepción: impresoras con **motores Z dedicados** que están inactivos durante los
  movimientos normales de impresión (sin `bed_mesh`, sin `bed_tilt`, sin corrección de
  skew en Z, sin impresiones en "vase mode") pueden tener los motores Z más fríos con
  `hold_current`. Si se implementa, tener en cuenta el movimiento no ordenado del eje Z
  durante nivelación de cama, sondeo de cama, calibración del probe, etc. Calibrar
  `driver_TPOWERDOWN` y `driver_IHOLDDELAY`. *"If unsure, prefer to not specify a
  `hold_current`."*
  — [Klipper, TMC drivers](https://www.klipper3d.org/TMC_Drivers.html) (`wiki/raw/capas-desplazadas-klipper-docs-tmc-drivers.md`)

**Marlin — comando `M906` (corriente en mA para TMC):**

- *"Set the motor current (in milliamps) TMC2130|TMC2208|TMC2660|L64xx"*,
  `M906 [E<mA>] I<index> [T<index>] [X<mA>] [Y<mA>] [Z<mA>]`.
- Requiere uno o más drivers Trinamic. Versiones de Marlin anteriores a 2.1.2 también
  soportan L64xx. Drivers con trimpots por i2c deben usar `M907` en su lugar.
- Ejemplos literal: `M906 X5 Y5 Z5`; `M906 T1 E10`; `M906 I1 X5`. Enviar `M906` sin
  parámetros reporta todas las corrientes.
  — [Marlin, M906](https://marlinfw.org/docs/gcode/M906.html) (`wiki/raw/capas-desplazadas-marlin-docs-m906-stepper-motor-current.md`)

### SpreadCycle vs stealthChop e interpolación (Klipper TMC)

> **Por qué afecta a capas desplazadas:** en `stealthChop` puede haber una desviación
> posicional sistemática por "positional lag", y además puede desencadenar errores de
> sobrecorriente (`ShortToGND`/`ShortToSupply`). Las cantidades son de documentos oficiales
> de Klipper y **no están corroboradas** por otra fuente de este lote.

- **Modo por defecto:** Klipper pone los drivers TMC en *"spreadCycle"* mode. Si el driver
  soporta stealthChop, se habilita añadiendo `stealthchop_threshold: 999999` a la sección
  TMC.
  — [Klipper, TMC drivers](https://www.klipper3d.org/TMC_Drivers.html) (`wiki/raw/capas-desplazadas-klipper-docs-tmc-drivers.md`)

- **Comparativa:** *"In general, spreadCycle mode provides greater torque and greater
  positional accuracy than stealthChop mode. However, stealthChop mode may produce
  significantly lower audible noise on some printers."*
  — [Klipper, TMC drivers](https://www.klipper3d.org/TMC_Drivers.html) (`wiki/raw/capas-desplazadas-klipper-docs-tmc-drivers.md`)

- **"Positional lag" en stealthChop:** tests han mostrado un incremento de "positional lag"
  de alrededor del **75 % de un full-step** durante movimientos a velocidad constante en
  modo stealthChop. Ejemplo literal: en una impresora con `rotation_distance` de 40 mm y
  200 `steps_per_rotation`, la desviación de posición de movimientos a velocidad constante
  aumentó en **~0,150 mm**. Este "delay in obtaining the requested position" puede no
  manifestarse como un defecto de impresión significativo, y se puede preferir el modo más
  silencioso stealthChop.
  — [Klipper, TMC drivers](https://www.klipper3d.org/TMC_Drivers.html) (`wiki/raw/capas-desplazadas-klipper-docs-tmc-drivers.md`)

- **Recomendación de consistencia:** *"It is recommended to always use 'spreadCycle' mode
  (by not specifying `stealthchop_threshold`) or to always use 'stealthChop' mode (by
  setting `stealthchop_threshold` to 999999). Unfortunately, the drivers often produce poor
  and confusing results if the mode changes while the motor is at a non-zero velocity."*
  — [Klipper, TMC drivers](https://www.klipper3d.org/TMC_Drivers.html) (`wiki/raw/capas-desplazadas-klipper-docs-tmc-drivers.md`)

- **El modo y el sensorless homing:** el ajuste `stealthchop_threshold` **no afecta** al
  sensorless homing: Klipper cambia automáticamente el TMC a un modo apropiado durante
  operaciones de sensorless homing.
  — [Klipper, TMC drivers](https://www.klipper3d.org/TMC_Drivers.html) (`wiki/raw/capas-desplazadas-klipper-docs-tmc-drivers.md`)

- **Interpolación TMC (`interpolate`):** el ajuste `interpolate` puede reducir el ruido
  audible a costa de introducir un pequeño error posicional sistemático: el driver tarda en
  ejecutar los steps que Klipper le envía. Durante movimientos a velocidad constante, este
  error es de **casi medio microstep configurado** (más precisamente, distancia de medio
  microstep menos 1/512 de la distancia de un full step). Ejemplo literal: en un eje con
  `rotation_distance` 40 mm, 200 `steps_per_rotation` y 16 microsteps, el error sistemático
  introducido durante movimientos a velocidad constante es **~0,006 mm**.
  — [Klipper, TMC drivers](https://www.klipper3d.org/TMC_Drivers.html) (`wiki/raw/capas-desplazadas-klipper-docs-tmc-drivers.md`)

- **Para mejor precisión posicional:** usar modo spreadCycle y deshabilitar la interpolación
  (`interpolate: False` en la configuración TMC). Con esa configuración se puede subir el
  ajuste `microstep` para reducir ruido: típicamente **64** o **128** tendrá ruido audible
  similar a la interpolación, sin introducir error posicional sistemático.
  — [Klipper, TMC drivers](https://www.klipper3d.org/TMC_Drivers.html) (`wiki/raw/capas-desplazadas-klipper-docs-tmc-drivers.md`)

- **En stealthChop, el efecto de la interpolación es relativamente pequeño:** la imprecisión
  posicional de la interpolación es pequeña frente a la imprecisión introducida por stealthChop.
  Por tanto, ajustar la interpolación no se considera útil en stealthChop, y se puede dejar
  en su estado por defecto.
  — [Klipper, TMC drivers](https://www.klipper3d.org/TMC_Drivers.html) (`wiki/raw/capas-desplazadas-klipper-docs-tmc-drivers.md`)

### Detección de pasos perdidos

> **Lo que estas fuentes dan para esto: un método para Klipper y los incrementos en que se
> pierden los pasos.** **No aparece ninguna mención a StallGuard ni a un "caliper" de
> detección de pérdida de pasos** en las siete fuentes: las secciones de sensorless homing
> (que contienen eso) fueron omitidas por el recolector. Marcar como ausente.

**Klipper — método `GET_POSITION`:**

- *"In a way, yes. Home the printer, issue a `GET_POSITION` command, run your print, home
  again and issue another `GET_POSITION`. Then compare the values in the `mcu:` line."*
  Útil para afinar corrientes de motor, aceleraciones y velocidades sin imprimir ni gastar
  filamento: basta correr movimientos de alta velocidad entre los dos `GET_POSITION`.
  — [Klipper, FAQ](https://www.klipper3d.org/FAQ.html) (`wiki/raw/capas-desplazadas-klipper-docs-faq.md`)

- **Limitación del método:** *"Note that endstop switches themselves tend to trigger at
  slightly different positions, so a difference of a couple of microsteps is likely the
  result of endstop inaccuracies. A stepper motor itself can only lose steps in increments
  of 4 full steps. (So, if one is using 16 microsteps, then a lost step on the stepper
  would result in the 'mcu:' step counter being off by a multiple of 64 microsteps.)"*
  — [Klipper, FAQ](https://www.klipper3d.org/FAQ.html) (`wiki/raw/capas-desplazadas-klipper-docs-faq.md`)

**Umbral de lectura (inferencia derivada del párrafo anterior, marcada como tal):**

- Con los finales de carrera los resultados varían en un par de microsteps, así que una
  diferencia pequeña no es pérdida de pasos. Una pérdida real aparece en múltiplos de
  64 microsteps si se usan 16 microsteps. **Es una inferencia del texto, no una cifra
  independiente**, y depende de la configuración (16 microsteps en el ejemplo).

**Ausencias que el redactor tiene que saber:**

- **Sin método de detección de pasos perdidos para Marlin** en estas fuentes. Marlin da el
  comando `M906` para fijar corriente, pero ninguna de las siete fuentes describe un
  procedimiento equivalente al `GET_POSITION` de Klipper.
- **Sin StallGuard ni "caliper"** en el texto capturado. El apartado de sensorless homing
  del documento de drivers TMC fue omitido por el recolector por no aportar a la causa
  mecánica de desplazamiento (ver `## Tirado`). **Lo omitido no se ha resumido.**

### Errores del driver y vacío de fuente / tensión insuficiente

**Klipper — errores TMC reportados (el driver se deshabilita y queda inactivo):**

- *"This type of error indicates the TMC driver detected a problem and has disabled
  itself. That is, the driver stopped holding its position and ignored movement commands.
  If Klipper detects that an active driver has disabled itself, it will transition the
  printer into a 'shutdown' state."*
  — [Klipper, TMC drivers](https://www.klipper3d.org/TMC_Drivers.html) (`wiki/raw/capas-desplazadas-klipper-docs-tmc-drivers.md`)

- **Overtemp `ot=1(OvertempError!)`:** el driver se deshabilitó por sobrecalentamiento.
  Soluciones típicas: reducir corriente del motor paso a paso, aumentar refrigeración en el
  driver y/o en el motor.
  — [Klipper, TMC drivers](https://www.klipper3d.org/TMC_Drivers.html) (`wiki/raw/capas-desplazadas-klipper-docs-tmc-drivers.md`)

- **`ShortToGND` o `ShortToSupply`:** el driver se deshabilitó por detectar corriente muy
  alta. Puede indicar cable suelto o cortocircuitado al motor o dentro del motor. También
  puede ocurrir con stealthChop si el driver no predice bien la carga mecánica del motor
  (predicción pobre → demasiada corriente → dispara su propia detección de sobrecorriente).
  Para probarlo: deshabilitar stealthChop y ver si siguen los errores.
  — [Klipper, TMC drivers](https://www.klipper3d.org/TMC_Drivers.html) (`wiki/raw/capas-desplazadas-klipper-docs-tmc-drivers.md`)

- **`reset=1(Reset)` / `CS_ACTUAL=0(Reset?)` / `SE=0(Reset?)`:** el driver se reseteó a
  mitad de impresión. *"This may be due to voltage or wiring issues."*
  — [Klipper, TMC drivers](https://www.klipper3d.org/TMC_Drivers.html) (`wiki/raw/capas-desplazadas-klipper-docs-tmc-drivers.md`)

- **`uv_cp=1(Undervoltage!)`:** el driver detectó un evento de baja tensión y se
  deshabilitó. *"This may be due to wiring or power supply issues."*
  — [Klipper, TMC drivers](https://www.klipper3d.org/TMC_Drivers.html) (`wiki/raw/capas-desplazadas-klipper-docs-tmc-drivers.md`)

**Klipper — TMC en modo standalone (TMC2208/TMC2224) y comunicación:**

- Si se usa el TMC2208 (o TMC2224) en "standalone mode", usar la última versión de Klipper;
  se añadió un workaround para un problema del driver TMC2208 en "stealthchop" a mediados de
  marzo de 2020.
  — [Klipper, FAQ](https://www.klipper3d.org/FAQ.html) (`wiki/raw/capas-desplazadas-klipper-docs-faq.md`)

- **"Lost communication with MCU" de forma aleatoria**, causas habitualmente hardware del USB
  entre host y microcontrolador:
  - usar cable USB de buena calidad, enchufes seguros;
  - si se usa Raspberry Pi, usar una fuente de calidad y un buen cable; si aparecen avisos
    de "under voltage" (p. ej. en OctoPrint), está relacionado con la fuente y debe
    arreglarse;
  - asegurarse de que la fuente de la impresora no esté sobrecargada (fluctuaciones a la
    patilla USB del microcontrolador pueden resetearla);
  - verificar que cables de steppers, calentadores y otros no estén plegados ni deshilachados
    (el movimiento puede estresar un cable defectuoso, perdiendo contacto, cortocircuitando
    brevemente o generando ruido);
  - reportes de alto ruido USB cuando se mezclan la fuente de 5 V de la impresora y la del
    host; si el microcontrolador se enciende con cualquiera de las dos fuentes, están
    mezcladas; puede ayudar configurar el microcontrolador para usar sólo una fuente, o
    modificar el cable USB para que no transporte 5 V entre host y microcontrolador.
  — [Klipper, FAQ](https://www.klipper3d.org/FAQ.html) (`wiki/raw/capas-desplazadas-klipper-docs-faq.md`)

- **Reinicio del Raspberry Pi durante impresiones:** *"most likely due to voltage
  fluctuations"*; seguir los mismos pasos de "Lost communication with MCU".
  — [Klipper, FAQ](https://www.klipper3d.org/FAQ.html) (`wiki/raw/capas-desplazadas-klipper-docs-faq.md`)

**Marlin — fallos aleatorios por fuente insuficiente:**

- *"An under-powered PSU combined with heaters and high speed moves can lead to a frozen
  board. No kill, no watchdog, heaters stuck on."* Ver [#17202]. Para probar:
  - activar los calentadores de cama y extrusor e imprimir a alta velocidad a ver si se
    congela;
  - probar desactivando calentadores y/o imprimiendo más lento a ver si desaparece;
  - leer la tensión de entrada del PSU con un multímetro durante los movimientos rápidos; si
    cae demasiado por debajo de la tensión esperada (**12 V o 24 V** en el ejemplo del
    original), indica un problema.
  — [Marlin, Troubleshooting Tips](https://marlinfw.org/docs/basics/troubleshooting.html) (`wiki/raw/capas-desplazadas-marlin-docs-troubleshooting.md`)

**Marlin — conflictos de hardware/driver relevantes al desplazamiento:**

- *"Some SilentStepSticks with variable 3-5V logic voltage (VIO) might get damaged if only
  powered over USB."*
  — [Marlin, Troubleshooting Tips](https://marlinfw.org/docs/basics/troubleshooting.html) (`wiki/raw/capas-desplazadas-marlin-docs-troubleshooting.md`)

- **`SPI conflict with the SD card?`** (soluciones varias, sin detalle en la página).
  — [Marlin, Troubleshooting Tips](https://marlinfw.org/docs/basics/troubleshooting.html) (`wiki/raw/capas-desplazadas-marlin-docs-troubleshooting.md`)

- **Eje E no se mueve con Linear Advance y drivers TMC:** *"I ended up using the drivers in
  legacy mode and setting them to SpreadCycle using the OTP (One Time Programmer).
  Unfortunately trying to set individual drivers to SpreadCycle via UART by enabling
  HybridThreshold and setting the threshold to 0 for the respective axes did not work."*
  (referencia #11825).
  — [Marlin, Troubleshooting Tips](https://marlinfw.org/docs/basics/troubleshooting.html) (`wiki/raw/capas-desplazadas-marlin-docs-troubleshooting.md`)

- **TMC2208 ruidoso/rechinante:** *"Increase the current to ~1500mA and lower the Hybrid
  Threshold."*
  — [Marlin, Troubleshooting Tips](https://marlinfw.org/docs/basics/troubleshooting.html) (`wiki/raw/capas-desplazadas-marlin-docs-troubleshooting.md`)

- **TMC2208:** usa SoftwareSerial, lo que **conflicta con Endstop Interrupts**. Desactivar
  Endstop Interrupts para proceder.
  — [Marlin, Troubleshooting Tips](https://marlinfw.org/docs/basics/troubleshooting.html) (`wiki/raw/capas-desplazadas-marlin-docs-troubleshooting.md`)

- **`SOFTWARE_DRIVER_ENABLE`:** no usarlo a menos que lo requiera el hardware.
  — [Marlin, Troubleshooting Tips](https://marlinfw.org/docs/basics/troubleshooting.html) (`wiki/raw/capas-desplazadas-marlin-docs-troubleshooting.md`)

### rsense (Marlin) y desplazamiento de capas

- Fuente única (Marlin Troubleshooting): *"Unreliable printing, shifting layers? Make sure
  the 'rsense' value is configured according to recommendations."* (referencia #9368).
  **No da un valor concreto de rsense**, sólo la indicación de configurarla según las
  recomendaciones.
  — [Marlin, Troubleshooting Tips](https://marlinfw.org/docs/basics/troubleshooting.html) (`wiki/raw/capas-desplazadas-marlin-docs-troubleshooting.md`)

### Qué es específico de firmware (y qué no aparece en este lote)

> Las siete fuentes permiten marcar qué instrucciones van atadas a un firmware. Lo que no
> aparece (boquilla, Z-probing, placa base, correas/poleas físicas) **no se inventa**:
> queda anotado como ausente.

- **OrcaSlicer (slicer, no firmware):** limitación y variables de velocidad/aceleración/jerk;
  variables de Motion Ability; compatibilidad de modo Jerk/JD según firmware; Input Shaping
  y Resonance Avoidance; `accel_to_decel` sólo con flavor Klipper; emisión de límites
  ignorada con flavor Klipper.
  — [OrcaSlicer Wiki](https://www.orcaslicer.com/wiki/printer_settings/motion%20ability/printer_motion_ability.html) y [Acceleration](https://www.orcaslicer.com/wiki/print_settings/speed/speed_settings_acceleration.html), [Jerk XY](https://www.orcaslicer.com/wiki/print_settings/speed/speed_settings_jerk_xy.html) (`wiki/raw/capas-desplazadas-orcaslicer-wiki-*.md`)

- **Klipper (firmware):** tuning de TMC; `hold_current`; modos spreadCycle/stealthChop e
  interpolación; errores TMC; comunicación MCU; método GET_POSITION; macros SET_TMC_CURRENT.
  — [Klipper, TMC drivers](https://www.klipper3d.org/TMC_Drivers.html), [FAQ](https://www.klipper3d.org/FAQ.html) (`wiki/raw/capas-desplazadas-klipper-docs-*.md`)

- **Marlin (firmware):** M906; `rsense`; conflictos TMC2208 (legacy/OTP, Hybrid Threshold);
  SoftwareSerial vs Endstop Interrupts; random halting por fuente insuficiente; SilentStepSticks
  por tensión VIO; SOFTWARE_DRIVER_ENABLE.
  — [Marlin, Troubleshooting](https://marlinfw.org/docs/basics/troubleshooting.html), [M906](https://marlinfw.org/docs/gcode/M906.html) (`wiki/raw/capas-desplazadas-marlin-docs-*.md`)

- **No firmware-específico, por exclusión:** la definición de capa desplazada y la causa
  por correas/poleas son del KB de Prusa (en `separaciones-entre-capas.md`), y los límites
  suaves/duros de OrcaSlicer son del slicer.

- **Ausencias explícitas de este lote (no inferir):** no hay nada aquí sobre obstrucción de
  boquilla, Z-probing, sondeo/nivelación, placa base (board), cableado de motores más allá
  de lo citado, ni sobre velocidad "segura" universal. La corroboración de nozzle clog como
  causa de síntomas afines (una capa que parece faltar = grieta) está en
  `wiki/cooked/separaciones-entre-capas.md`, no aquí.

### Contraste mecánico de alto nivel con `separaciones-entre-capas.md`

<|constrain|> Punto | Separación entre capas (cocinado) | Capas desplazadas (este fichero) |
|---|---|---|
| Mecanismo | Adhesión entre capas vs. fuerzas de warping enfriando a distinta velocidad (Prusa) | Posición del hotend desplazado en X/Y, unión entre capas conservada (Prusa + movimiento eléctrico aquí) |
| Qué se toca | Boquilla, velocidad, ventilador, cama, flow/extrusion multiplier | Aceleración/jerk del movimiento, corriente del motor, modo del driver (spreadCycle/stealthChop), tensión de fuente, correa/polea física |
| Cifras relevantes | 195-220, 185-235 °C, 50-60 °C cama, etc. (ver ese fichero) | Sin valores "seguros" en estas fuentes; sólo variables y límites configurables |
| Enlace cruzado | `## Relaciones` de ese fichero ya apunta a "capas desplazadas" | este fichero apunta a `separaciones-entre-capas.md` en `## Relaciones` |

## Contradicciones

**No se resuelven aquí.** Se anotan con su matiz; el redactor explica el matiz en el
artículo y no elige un número/posición. Varias provienen de fuentes oficiales que son
parcialmente incompatibles entre sí o por tutoriales de foro.

### 1. Alta corriente vs. sobrecalentamiento (tuning del motor)

- *"A higher driver current increases positional accuracy and torque"* pero también
  *"increases the heat"*; si el driver se calienta demasiado se deshabilita. Marlin da
  un valor concreto para TMC2208 ruidoso/que rechina: *"Increase the current to ~1500mA
  and lower the Hybrid Threshold."* El KB oficial de Klipper, por su parte, dice no dar
  una cifra universal: preferir valores más altos mientras el motor no se caliente demasiado
  ni el driver reporte avisos/errores, y que estar tibio está bien pero no doloroso al
  tocar.
  — [Klipper, TMC drivers](https://www.klipper3d.org/TMC_Drivers.html) (`wiki/raw/capas-desplazadas-klipper-docs-tmc-drivers.md`), [Marlin, Troubleshooting](https://marlinfw.org/docs/basics/troubleshooting.html) (`wiki/raw/capas-desplazadas-marlin-docs-troubleshooting.md`)

**Matiz.** Klipper ofrece un criterio (calor tolerable, sin avisos) sin cifra; Marlin da
una cifra (~1500 mA) pero sólo para un síntoma concreto (ruido/rechinido en TMC2208) y
esa cifra viene del pool de informes de la página de troubleshooting, no de un datasheet.
**No son la misma recomendación:** una es afinación por síntomas, la otra es un valor
reportado para un caso. La mejor práctica de Klipper incluso puede exigir **más**
corriente que la que tolera el motor sin calentarse; la cifra de Marlin no lo contradice,
no lo corrobora: es otro caso.

### 2. `hold_current`: ahorrar calor vs. introducir movimiento no ordenado

- Klipper recomienda **no** especificar `hold_current` la mayoría de las veces, porque
  cambiar la corriente puede introducir movimiento por detent forces o fuerzas externas, y
  pocos movimientos de impresión dejan el motor inmóvil el tiempo suficiente.
- Pero **sí puede tener sentido** en motores Z dedicados que están inactivos en impresión
  normal (sin bed_mesh/bed_tilt/skew/Z vase mode), con el aviso de tener en cuenta el
  movimiento no ordenado del eje Z durante nivelación/sondeo/calibración del probe, y de
  calibrar `driver_TPOWERDOWN` y `driver_IHOLDDELAY`.
  — [Klipper, TMC drivers](https://www.klipper3d.org/TMC_Drivers.html) (`wiki/raw/capas-desplazadas-klipper-docs-tmc-drivers.md`)

**Matiz.** No es una contradicción resoluble por elección: es una **excepción
documentada**. La regla general es "no lo pongas"; la excepción es "si usas motores Z
dedicados e inactivos, puede que sí, y con calibration". El artículo no puede decir
"siempre sin hold_current" ni "hold_current en Z", sino "por defecto no; si hay Z
dedicado inactivo, vale la pena probarlo calculando el movimiento no ordenado".

### 3. spreadCycle vs stealthChop: torque/precisión vs. ruido

- spreadCycle: mayor torque y mayor precisión posicional.
- stealthChop: menor ruido audible en algunas impresoras; pero "positional lag" de
  ~75 % de un full-step durante movimiento a velocidad constante (ejemplo: ~0,150 mm con
  rotation_distance 40 mm y 200 steps_per_rotation).
- Además stealthChop puede ser causa de `ShortToGND`/`ShortToSupply` por predicción pobre
  de la carga mecánica.
  — [Klipper, TMC drivers](https://www.klipper3d.org/TMC_Drivers.html) (`wiki/raw/capas-desplazadas-klipper-docs-tmc-drivers.md`)

**Matiz.** No es una contradicción entre cifras: es un **trueque torque/precisión vs.
ruido y estabilidad**. La fuente lo deja explícito con «you may prefer the quieter
behavior». El artículo tiene que presentar los dos modos con la consecuencia posicional
del stealthChop, no como «spreadCycle es mejor». Y el requisito de consistencia (no
cambiar de modo con el motor en movimiento) hace que la elección sea de instalación, no
de impresión.

### 4. Interpolación vs. microsteps altos: dos rutas al mismo ruido

- La interpolación reduce ruido pero introduce error sistemático (~1/2 microstep menos
  1/512 de full step; ~0,006 mm en el ejemplo).
- Alternativa: spreadCycle + `interpolate: False` + microsteps 64/128 para similar ruido
  sin error sistemático.
- En stealthChop, la inexactitud de la interpolación es pequeña frente a la de stealthChop,
  así que la interpolación no vale la pena ajustar.
  — [Klipper, TMC drivers](https://www.klipper3d.org/TMC_Drivers.html) (`wiki/raw/capas-desplazadas-klipper-docs-tmc-drivers.md`)

**Matiz.** Dos recetas distintas con el mismo objetivo (menos ruido, sin artefactos de
posición): una se basa en el driver, la otra en el microstep. **En stealthChop ambas
pierden sentido frente al propio lag del modo stealthChop**, así que no son alternativas
equivalentes: la segunda sólo se justifica con spreadCycle.

### 5. Lag de stealthChop (~0,150 mm) vs. error de interpolación (~0,006 mm): misma
   magnitud aparente, distinto fenómeno

- El ~0,150 mm proviene de positional lag "of around 75 % of a full-step during constant
  velocity moves" con rotation_distance 40 mm y 200 steps_per_rotation.
- El ~0,006 mm proviene de "half a microstep distance minus a 512th of a full step
  distance" con rotation_distance 40 mm, 200 steps_per_rotation y 16 microsteps.
- Ambos son ejemplos ilustrativos con condiciones distintas (un porcentaje de un full-step
  frente a medio microstep a 16 microsteps).

**Matiz.** Las dos cifras usan los mismos dos parámetros (40 mm y 200 steps/rot) pero
**no son comparables ni restables entre sí**: una mide el lag del modo de operación, la
otra el delay del interpolador; una se expresa como porcentaje de un full-step, la otra
como medio microstep. **El redactor no puede sumarlas ni restarlas** ni presentarlas en
la misma frase como "0,156 mm". Si las cita, cada una con su etiqueta.

### 6. OrcaSlicer sobrescribe la aceleración del firmware sólo si el valor normal > 0

- Si `default (normal printing) acceleration` > 0, OrcaSlicer sobrescribe la aceleración
  de firmware y limita a Motion Ability.
- Si es 0, Orca no envía comandos de aceleración, se usa la del firmware y se deshabilitan
  el resto de ajustes de aceleración del proceso.
  — [OrcaSlicer Wiki, Acceleration](https://www.orcaslicer.com/wiki/print_settings/speed/speed_settings_acceleration.html) (`wiki/raw/capas-desplazadas-orcaslicer-wiki-acceleration.md`)

**Matiz.** No es contradicción, pero es una **trampa de diagnóstico**: un usuario que baja
la aceleración a 0 en OrcaSlicer creyendo que "desactiva" aceleración está en realidad
cediendo el control al firmware, con lo que los límites del perfil dejan de aplicarse. Y
al revés, quien cree que los valores de Orca siempre mandan se equivoca cuando ese campo
es 0. Las dos ramas son excluyentes y dependen de un número, no de una preferencia.

### 7. Jerk tradicional (M205 X,Y,Z,E) vs. Junction Deviation (M205 J) en Marlin 2

- OrcaSlicer condiciona la exposición de los límites: `machine_max_jerk_*` "only apply
  if JD = 0 for Marlin 2 Firmware", y `machine_max_junction_deviation` "only apply if
  JD > 0", añadiendo "If your Marlin 2 printer uses Classic Jerk set this value to 0".
  — [OrcaSlicer Wiki, Motion Ability](https://www.orcaslicer.com/wiki/printer_settings/motion%20ability/printer_motion_ability.html) (`wiki/raw/capas-desplazadas-orcaslicer-wiki-motion-ability.md`)
- OrcaSlicer da la conversión `JD = 0.4 · Jerk² / Accel.`; Marlin 2 depreca el Classic
  Jerk en favor de Junction Deviation (pero sigue permitiéndolo).
  — [OrcaSlicer Wiki, Jerk XY](https://www.orcaslicer.com/wiki/print_settings/speed/speed_settings_jerk_xy.html) (`wiki/raw/capas-desplazadas-orcaslicer-wiki-jerk-xy.md`)

**Matiz.** El artículo tiene que explicar que son **dos algoritmos alternativos de una
misma máquina**, no dos parámetros acumulativos. Si una impresora usa Classic Jerk,
Maximum Junction Deviation debe ser 0 para que apliquen los límites de jerk; si usa JD,
los límites de jerk tradicional no aplican. Configurar ambos a la vez no suma: anula.

### 8. "Emit limits to G-code" se ignora con flavor Klipper

- OrcaSlicer puede emitir los límites de máquina al G-code, **pero esa opción se ignora
  si el flavor de G-code es Klipper**, mientras que `accel_to_decel` y la gestión
  TMC/stealthChop son propias de Klipper.
  — [OrcaSlicer Wiki, Motion Ability](https://www.orcaslicer.com/wiki/printer_settings/motion%20ability/printer_motion_ability.html) y [Acceleration](https://www.orcaslicer.com/wiki/print_settings/speed/speed_settings_acceleration.html) (`wiki/raw/capas-desplazadas-orcaslicer-wiki-*.md`)

**Matiz.** En una impresora Klipper los límites por G-code son redundantes/conflictivos con
la configuración del firmware: Orca los envía vía `SET_VELOCITY_LIMIT` cuando puede, y
cuando el flavor es Klipper la opción "emit limits" se ignora. El redactor tiene que
decirlo por flavor, no como afirmación genérica.

### 9. Modo stealthChop y sobrecorriente: causa mechánica vs. causa de firmware

- Klipper sugiere, ante `ShortToGND`/`ShortToSupply` en stealthChop, deshabilitar
  stealthChop y comprobar si los errores siguen, porque puede ser mala predicción de la
  carga mecánica del motor.
- Lo mismo podría ser cable suelto o cortocircuito en el motor o su cableado.
  — [Klipper, TMC drivers](https://www.klipper3d.org/TMC_Drivers.html) (`wiki/raw/capas-desplazadas-klipper-docs-tmc-drivers.md`)

**Matiz.** El mismo síntoma (driver deshabilitado por sobrecorriente) admite dos causas
distintas: hardware/cableado (probable y siempre posible) y predicción del driver en
stealthChop (sólo cuando se usa ese modo). La prueba propuesta (deshabilitar stealthChop)
decide entre ellas *a posteriori*, no afirma la causa *a priori*.

### 10. Corriente insuficiente vs. "más corriente siempre mejor": dos voces oficiales

- Klipper: corriente más alta = más precisión posicional y torque, pero más calor; preferir
  valores más altos mientras el motor no se caliente demasiado ni el driver se queje.
- Marlin Troubleshooting (reportes recopilados): TMC2208 ruidoso → subir a ~1500 mA y bajar
  Hybrid Threshold; y la regla de la página de Marlin es que un valor demasiado bajo puede
  perder pasos, un valor demasiado alto sobrecalienta.
  — [Klipper, TMC drivers](https://www.klipper3d.org/TMC_Drivers.html), [Marlin, Troubleshooting](https://marlinfw.org/docs/basics/troubleshooting.html) (`wiki/raw/capas-desplazadas-*.md`)

**Matiz.** Las dos coinciden en la dirección (corriente baja = pasos perdidos/ruido;
corriente alta = calor), pero **una da un criterio subjetivo (calor al tacto, sin avisos
del driver) y la otra un número (~1500 mA para un síntoma concerto)**. No es la misma
afirmación y no se combina en una única cifra recomendada.

## Sin respaldo

Una sola fuente (primaria o secundaria); las que vienen de documentación oficial de
fabricante de software/firmware no necesitan marca adicional fuerte, pero se indican
igualmente. El redactor puede usarlas **marcadas** como lo que son.

### Procedentes de documentación oficial, pero sin corroboración cruzada

- **~1500 mA para TMC2208 ruidoso/que rechina.** Dato concreto, pero de la página de
  troubleshooting de Marlin que recopila informes ("collected from various reports"). **No
  viene de un datasheet ni de Klipper.** `[UNA SOLA FUENTE — Marlin (reportes recopilados)]`
- **rsense mal configurado como causa de capas desplazadas.** Sólo Marlin lo dice, sin
  valor ni procedimiento. `[UNA SOLA FUENTE — Marlin (reportes recopilados)]`
- **~75 % de un full-step de "positional lag" en stealthChop y ~0,150 mm** del ejemplo.
  De la documentación de Klipper, primaria para Klipper, pero sin corroboración en este
  lote. `[UNA SOLA FUENTE — Klipper docs (sin corroborar por otra fuente)]`
- **Error sistemático de interpolación (~1/2 microstep menos 1/512 de full step; ~0,006
  mm)** con spreadCycle. Ídem. `[UNA SOLA FUENTE — Klipper docs]`
- **Microsteps 64/128 como ruido similar a la interpolación sin error sistemático.**
  `[UNA SOLA FUENTE — Klipper docs]`
- **Dos modos no se deben alternar con el motor en movimiento / preferir siempre un modo.**
  `[UNA SOLA FUENTE — Klipper docs]`
- **GET_POSITION y la actualización por múltiplos de 64 microsteps** (16 microsteps) y
  la variación de un par de microsteps por los finales de carrera. `[UNA SOLA FUENTE —
  Klipper docs (primaria)]`
- **Habilitar Ultra/Stealth por `stealthchop_threshold: 999999`.** `[UNA SOLA FUENTE —
  Klipper docs]`
- **`stealthchop_threshold` no afecta al sensorless homing.** `[UNA SOLA FUENTE —
  Klipper docs]`
- **Recomendación de calibrar Input Shaping una vez al año o tras cambios mecánicos.**
  `[UNA SOLA FUENTE — OrcaSlicer wiki (oficial, sin corroboración)]`
- **Resonance Avoidance** (reducción de velocidad de pared exterior para evitar la zona
  de resonancia). `[UNA SOLA FUENTE — OrcaSlicer wiki]`
- **Accel to decel: por defecto 50 %, rango 1 % a 100 %**, con ejemplo de 5000 mm/s².
  `[UNA SOLA FUENTE — OrcaSlicer wiki]`
- **Aceleración de capa inicial / viaje de capa inicial menores mejorar adherencia;**
  top surface similar a outer wall; travel mayor que la normal; outer wall menor que la
  normal. `[UNA SOLA FUENTE — OrcaSlicer wiki]`
- **Fórmula `JD = 0.4 · Jerk² / Accel.`**. `[UNA SOLA FUENTE — OrcaSlicer wiki]`
- **Correspondencia M205 X,Y,Z,E (ID=0) vs M205 J (JD>0); setear JD a 0 para Classic Jerk.**
  `[UNA SOLA FUENTE — OrcaSlicer wiki]`
- **Paleta de tipos de control por firmware** (Klipper Square corner velocity, RepRap M566,
  Marlin 2 Classic/JD). `[UNA SOLA FUENTE — OrcaSlicer wiki]`
- **OrcaSlicer limita la aceleración para que no supere el máximo de Motion Ability**, y la
  regla "si normal printing acceleration es 0, no se envían comandos". `[UNA SOLA FUENTE —
  OrcaSlicer wiki]`
- **La opción Emit limits to G-code se ignora con flavor Klipper.** `[UNA SOLA FUENTE —
  OrcaSlicer wiki]`
- **M906 (syntax, índices, tool, requerimiento Trinamic; L64xx < 2.1.2; i2c → M907).**
  `[UNA SOLA FUENTE — Marlin (primaria, doc técnica)]`
- **TMC2208 en modo standalone requiere última versión de Klipper por un workaround de
  marzo de 2020.** `[UNA SOLA FUENTE — Klipper FAQ]`
- **"Lost communication with MCU" y sus causas (USB, Pi, PSU, cables, ruido 5V).** Todas de
  un único documento. `[UNA SOLA FUENTE — Klipper FAQ]`
- **Reinicio del Raspberry Pi por fluctuaciones de tensión** + mismos pasos. `[UNA SOLA
  FUENTE — Klipper FAQ]`
- **Podemos detectar pasos perdidos con GET_POSITION** + múltiplos de 64 microsteps. `[UNA
  SOLA FUENTE — Klipper FAQ]`
- **Random Halting por PSU insuficiente** (congelación de placa, sin kill ni watchdog,
  calentadores atascados) + metodología de prueba (12/24 V en el multímetro). `UNA SOLA
  FUENTE — Marlin (reportes recopilados)]`
- **Drivers TMC ausencia de señal por VIO 3-5V cuando только USB**, conflicto SoftwareSerial
  con Endstop Interrupts, SPI con SD, Linear Advance + TMC, SOFTWARE_DRIVER_ENABLE. Todas
  de la misma página. `[UNA SOLA FUENTE — Marlin (reportes recopilados)]`
- **Driver TMC se deshabilita ante Overtemp / ShortToGND / ShortToSupply / reset / uv_cp** y
  sus causas. `[UNA SOLA FUENTE — Klipper docs (primaria)]`

### Cosas que no aparecen en este lote (no es "sin respaldo", es "ausencia")

- **Ningún método de detección de pasos perdidos para Marlin.** No existe en las fuentes
  capturadas.
- **StallGuard / "caliper" de stall:** no aparece en el texto capturado (la sección de
  sensorless homing fue omitida por el recolector). **No se afirma ni se niega** que el
  driver lo soporte: simplemente no está en este lote.
- **Ningún valor universal de corriente para un motor concreto** (ni de Placa, ni de
  calibre por eje) en ninguna de las siete fuentes.
- **Ningún procedimiento de diagnóstico de boquilla, Z-probe, board o nivelación.** Esos,
  si existen, están en otros `cooked`.

## Tirado

Qué se ha eliminado y por qué. El redactor no usa nada de esto.

- **Navegación del sitio OrcaSlicer**, menús, tablas de compatibilidad/tipos, enlaces
  internos a calibración (VFA, Cornering, Pressure Advance, Adaptive PA, Input Shaping) y
  los enlaces a la guía de calibración: **no descargados ni resumidos**. Se ha conservado
  sólo el texto del artículo. Lo mismo en Marlin y Klipper (referencias `#11825`,
  `#9368`, `#17202`, sin su cuerpo).
- **La tabla de variables de Motion Ability de OrcaSlicer** se ha destilado a variables y
  tipos; el resto de la página (jerarquía de menús CLI) es boilerplate de referencia.
- **De los drivers TMC de Klipper:** las secciones de **sensorless homing** (homing sin
  finales, con su configuración `driver_XXX`) y la **configuración de campos `driver_XXX`**
  fueron **omitidas por el recolector por no aportar a la causa mecánica de desplazamiento**,
  y este fichero no las reconstruye ni las resume. Remitir a la URL original para el texto.
  Si el artículo necesita StallGuard o sensorless, ese material hay que recogerlo con otra
  fuente.
- **De Marlin Troubleshooting:** las secciones de LCD, sondeo G29, calentamiento, EEPROM y
  PlatformIO no son relevantes al tema y se omiten aquí; se mantiene sólo el apartado de
  Trinamic y "Random Halting".
- **Imágenes, diagramas, screenshots y photos.** Este lote no describe ni ha descargado
  imágenes. Los GIF/vídeos de esquemas de Marlin (2 `**` sueltos) no son contenido.
- **Comentarios del CMS** de OrcaSlicer/Marlin (no descargados) — 67 en el artículo de
  capas desplazadas de Marlin, según nota del recolector. No se consultan.
- **Firma de bobstro y el Spock cortado**, rarezas tipográficas y erratas de los originales:
  se conservan en `wiki/raw/` (capa inmutable) y no se reproducen aquí.
- **Valores "seguros" que ninguna fuente da.** No hay cifras de aceleración/jerk "correctas"
  universales, ni un rango de corriente único. Lo que hay son variables, límites y
  procedimientos. Este fichero no inventa unos.
- **Procedimientos por modelo** (hardware CORE One/MK/MINI/XL, tensores, nudos de cable) del
  artículo de layer shifting de Prusa: ya están en `separaciones-entre-capas.md` (y en su
  `## Tirado`), porque no tocan la adhesión ni la electricidad de este lote. Aquí sólo se
  cita la causa "correas/poleas" como contraste.
- **La definición mecánica de capa desplazada (Prusa):** no se recocina aquí porque ya está
  cocinada en `separaciones-entre-capas.md`. Se remite.
- **Repetición del warping/layer-separation:** el hilo de Prusa 2026, el issue PrusaSlicer
  #11914 y la regla del 80 % (altura de capa) pertenecen a `separaciones-entre-capas.md`
  y **no** se tratan como causas eléctricas aquí.

## Relaciones

| Concepto | Se relaciona con | Cómo |
|---|---|---|
| capas desplazadas | [[separaciones-entre-capas\|Separaciones entre capas]] | **Dos fallos distintos.** La separación pierde la unión entre capas (warping vs. adhesión); la capa desplazada conserva la unión y cambia de posición en X/Y (correas, poleas, pérdida de pasos). Subir cama/boquilla no toca un desplazamiento; **las páginas se escriben la una para la otra** |
| capas desplazadas | correas y poleas | **Causa mecánica principal** (Prusa, layer-shifting_2020, ya cocinada en separaciones-entre-capas.md); unaffected por ajustes térmicos |
| capas desplazadas | corriente del motor TMC | Menos corriente → menos torque → pasos perdidos; más corriente → más calor → driver deshabilitado. Klipper prefiere alta mientras el motor siga frío al tacto y sin avisos |
| capas desplazadas | aceleración excesiva | Si la aceleración supera lo que el motor/fuente/driver soporta, puede perder pasos y correr la capa; OrcaSlicer la limita a los máximos de Motion Ability y cede al firmware si el campo normal = 0 |
| capas desplazadas | jerk / control de esquinas | Cambios instantáneos de velocidad/dirección; valores altos = curvas más rápidas y posibles artefactos. Jerk y Junction Deviation son **alternativos**, no acumulativos, en Marlin 2 |
| capas desplazadas | Input Shaping | Contraataca vibraciones/ringing en alta velocidad; se recomienda calibrar una vez al año o tras cambios mecánicos/estructurales |
| capas desplazadas | Resonance Avoidance | Reduce la velocidad de la pared exterior para evitar la zona de resonancia |
| capas desplazadas | hold_current | Por defecto no especificar (puede introducir movimiento no ordenado); excepción motores Z dedicados inactivos, con calibration de TPOWERDOWN/IHOLDDELAY |
| capas desplazadas | spreadCycle vs stealthChop | El stealthChop introduce positional lag (~0,150 mm ej.) y puede desencadenar sobrecorriente; spreadCycle da más torque y precisión pero más ruido |
| capas desplazadas | interpolación TMC | Error sistemático de ~0,006 mm (ej. 40/200/16); evitable con spreadCycle + `interpolate: False` + microsteps 64/128 |
| capas desplazadas | pasos perdidos | GET_POSITION (Klipper) entre dos homing; pérdida real en múltiplos de 64 microsteps con 16 microsteps; pequeñas diferencias = inexactitud de finales de carrera |
| capas desplazadas | tensión de fuente | PSU insuficiente + calentadores + movimientos rápidos → congelación de placa (Marlin); tensión por debajo de 12/24 V en el multímetro; resets `uv_cp`/`reset` y resets del host Raspberry Pi |
| capas desplazadas | comunicación USB/MCU | Cables USB de calidad; 5 V mezclados entre fuentes; cables de motores/calentadores plegados o deshilachados |
| capas desplazadas | driver TMC deshabilitado | `ot`, `ShortToGND`, `ShortToSupply`, `reset`, `uv_cp` → shutdown de Klipper; en stealthChop probar a deshabilitar el modo |
| capas desplazadas | rsense | Marlin: verificar que el valor esté configurado según recomendaciones (única fuente secundaria) |
| capas desplazadas | M906 | Set de corriente en mA para TMC (X/Y/Z/E) en Marlin; requiere Trinamic |
| capas desplazadas | accel_to_decel (Klipper) | Orca ajusta `max_accel_to_decel` automáticamente sólo con flavor Klipper; por defecto al 50 % |
| capas desplazadas | nozzle/obstrucción | **No cubierto aquí**: el cruce con Bambu (cold pull como paso 1; una obstrucción leve puede manifestarse como grieta) está en separaciones-entre-capas.md |
| capas desplazadas | Z-probe / nivelación / board | **No cubierto en este lote**: ausente de las siete fuentes |

**Páginas propias que este tema sugiere:**

- **Pasos perdidos / detección:** el método GET_POSITION, sus múltiplos de 64 microsteps, y las limitaciones del método merecen un artículo propio de diagnóstico (y falta método equivalente documentado para Marlin).
- **Configuración de drivers TMC:** toda la sección omitida (sensorless homing, campos driver_XXX, spreadCycle/stealthChop) es un bloque independiente; si el redactor necesita StallGuard, hay que traer nuevas fuentes.
- **Fuente/voltage:** fusibles, PSU insuficiente y random halting son un artículo transversal de hardware.
- **Control de esquinas (jerk vs. JD):** la conversión `JD = 0.4·Jerk²/Accel.` y la distinción de modos es un microltema con su propia página.
- **Correas y poleas (físico):** ya tiene página sugerida desde separaciones-entre-capas.md; las cifras del Belt Status (CORE One/MK/MINI/XL) no están en este fichero.
- **Acumulado con la existente `warping-pla.md` y `separaciones-entre-capas.md`:** la cadena diagnóstica del artículo de capas desplazadas sería **mecánico (correas/poleas) → eléctrico (corriente/driver/fuente) → firmware (aceleración/jerk/limits)**, **después** de descartar separación/adhesión; esto es trabajo del redactor, no del cocinero.
