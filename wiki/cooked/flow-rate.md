---
titulo: Flow rate, flow ratio y control de presión (Linear/Pressure Advance)
tema: flow-rate
fuentes:
  - wiki/raw/flow-rate-prusa-kb-extrusion-multiplier-calibration.md
  - wiki/raw/flow-rate-bambu-wiki-calibration-flow-rate.md
  - wiki/raw/flow-rate-bambu-wiki-view-slicing-information.md
  - wiki/raw/flow-rate-orcaslicer-material-flow-ratio-and-pressure-advance.md
  - wiki/raw/flow-rate-orcaslicer-flow-ratio-calib.md
  - wiki/raw/flow-rate-orcaslicer-volumetric-speed-calib.md
  - wiki/raw/flow-rate-orcaslicer-material-volumetric-speed-limitation.md
  - wiki/raw/flow-rate-klipper-pressure-advance.md
  - wiki/raw/flow-rate-marlin-linear-advance.md
  - wiki/raw/flow-rate-marlin-m221-set-flow-percentage.md
cocinado: 2026-10-16
---

# Flow rate, flow ratio y control de presión

## Afirmaciones

### Conceptos y unidades

- El **extrusion multiplier** (en el slicer) y el **flow rate** (en el firmware) son
  dos maneras de ajustar la **misma cosa**: cuánto filamento sale de la boquilla. Cambiar
  uno no cambia el valor del otro. — [Prusa Research](https://help.prusa3d.com/article/extrusion-multiplier-calibration_2257),
  `wiki/raw/flow-rate-prusa-kb-extrusion-multiplier-calibration.md`
- **Total flow rate = Flow multiplier en firmware (M221) × Extrusion multiplier en
  PrusaSlicer.** PrusaSlicer usa la misma matemática de flujo que Slic3r.
  — [Prusa Research](https://help.prusa3d.com/article/extrusion-multiplier-calibration_2257),
  `wiki/raw/flow-rate-prusa-kb-extrusion-multiplier-calibration.md`
- **Flow rate** = cantidad de filamento que empuja el extrusor, medida como
  **porcentaje o multiplicador del valor por defecto**; controla el grosor del plástico
  extruido. Demasiado alto → sobreextrusión (blobs, líneas que se solapan); demasiado
  bajo → subextrusión (huecos en las líneas). — [Bambu Lab](https://wiki.bambulab.com/en/software/bambu-studio/calibration_flow_rate),
  `wiki/raw/flow-rate-bambu-wiki-calibration-flow-rate.md`
- Los filamentos difieren en viscosidad y punto de fusión: PLA fluye fácil, ABS y
  nylon son algo más espesos, PETG es pegajoso, TPU es flexible y viscoso,
  policarbonato es duro y los composites pueden ser abrasivos. El flow debe coincidir
  con las propiedades del material. — [Bambu Lab](https://wiki.bambulab.com/en/software/bambu-studio/calibration_flow_rate),
  `wiki/raw/flow-rate-bambu-wiki-calibration-flow-rate.md`
- Los materiales espumosos (LW-PLA para aviones RC) se expanden mucho al calentarse;
  la calibración sirve de referencia útil para esos filamentos. — [Bambu Lab](https://wiki.bambulab.com/en/software/bambu-studio/calibration_flow_rate),
  `wiki/raw/flow-rate-bambu-wiki-calibration-flow-rate.md`
- En Bambu Studio el **Flow** muestra el **caudal volumétrico** en distintas
  posiciones. La impresora impone un **límite máximo de caudal volumétrico por
  filamento**. **Máximo caudal volumétrico = área de sección transversal de la línea
  extruida × velocidad máxima de impresión.** — [Bambu Lab](https://wiki.bambulab.com/en/software/bambu-studio/view-slicing-information),
  `wiki/raw/flow-rate-bambu-wiki-view-slicing-information.md`
- Cambiar parámetros obliga a volver a rebanar. — [Bambu Lab](https://wiki.bambulab.com/en/software/bambu-studio/view-slicing-information),
  `wiki/raw/flow-rate-bambu-wiki-view-slicing-information.md`
- En OrcaSlicer, el **Flow Ratio** (`filament_flow_ratio`, modo Advanced, lista de
  flotantes, CLI `--filament-flow-ratio=1`) cambia **proporcionalmente** todo el flujo
  de extrusión de ese filamento en el G-code. El material puede tener cambio de volumen
  al pasar entre estados fundido y cristalino. **Rango recomendado: entre 0,95 y 1,05.**
  El flow ratio final del objeto es ese valor **multiplicado por el flow ratio del
  filamento**. — [OrcaSlicer](https://github.com/OrcaSlicer/OrcaSlicer/wiki/material_flow_ratio_and_pressure_advance),
  `wiki/raw/flow-rate-orcaslicer-material-flow-ratio-and-pressure-advance.md`
- **Max Volumetric Speed** en OrcaSlicer (`filament_max_volumetric_speed`, modo
  Advanced, lista de flotantes, CLI `--filament-max-volumetric-speed=1`) es el **volumen
  de filamento que se puede fundir y extruir por segundo**. La velocidad de impresión
  se limita a ese valor para evitar atascos, subextrusión o mala adhesión entre capas.
  **No puede ser cero.** — [OrcaSlicer](https://github.com/OrcaSlicer/OrcaSlicer/wiki/material_volumetric_speed_limitation),
  `wiki/raw/flow-rate-orcaslicer-material-volumetric-speed-limitation.md`
- **Adaptive volumetric speed** (modo Developer, `filament_adaptive_volumetric_speed`,
  boolean, CLI `--filament-adaptive-volumetric-speed=1`) es experimental e incompleto
  (importado de BBS). Con él habilitado, el flujo se limita por el **menor** entre el
  valor ajustado (calculado desde ancho de línea y altura de capa) y el máximo definido
  por el usuario; con él deshabilitado, sólo se aplica el máximo del usuario.
  — [OrcaSlicer](https://github.com/OrcaSlicer/OrcaSlicer/wiki/material_volumetric_speed_limitation),
  `wiki/raw/flow-rate-orcaslicer-material-volumetric-speed-limitation.md`

### Flow en firmware y en slicer (valores por defecto)

- Extrusion Multiplier por defecto para PLA en PrusaSlicer: **1** (1 = 100 %, 0,95 =
  95 %). Valores ajustados habitualmente entre **0,9 y 1,1**. — [Prusa Research](https://help.prusa3d.com/article/extrusion-multiplier-calibration_2257),
  `wiki/raw/flow-rate-prusa-kb-extrusion-multiplier-calibration.md`
- En el menú de la impresora, durante la impresión: Tune → Flow. Valores habituales
  **entre 90 y 110** (porcentaje), aunque se puede ir por encima o por debajo.
  — [Prusa Research](https://help.prusa3d.com/article/extrusion-multiplier-calibration_2257),
  `wiki/raw/flow-rate-prusa-kb-extrusion-multiplier-calibration.md`
- El preset base de PrusaSlicer sobre el que se calibra: perfil de boquilla **0,4**,
  altura de capa **0,1–0,2 mm**, ancho de extrusión **0,45**, EM = **1** para
  materiales básicos (PLA, ABS, PETG). — [Prusa Research](https://help.prusa3d.com/article/extrusion-multiplier-calibration_2257),
  `wiki/raw/flow-rate-prusa-kb-extrusion-multiplier-calibration.md`
- Esta calibración de Extrusion Multiplier está marcada por Prusa como **avanzada** y
  recomendada sólo para **usuarios experimentados**; no es necesaria en una impresora
  recién salida de fábrica. El valor ideal difiere por tipo de material, color y
  hasta por bobina. — [Prusa Research](https://help.prusa3d.com/article/extrusion-multiplier-calibration_2257),
  `wiki/raw/flow-rate-prusa-kb-extrusion-multiplier-calibration.md`

### M221 — Set Flow Percentage (Marlin; firmware-específico)

- `M221 S<percent> [T<index>]` fija el **porcentaje de flujo**, que se aplica a todos
  los movimientos del extrusor (E) añadidos al planner. `T<index>` selecciona el
  extrusor en máquinas multieje; por defecto es el extrusor activo. Es el mismo valor
  que Prusa llama *Flow rate* en el menú Tune del firmware.
  — [Marlin Firmware](https://marlinfw.org/docs/gcode/M221.html),
  `wiki/raw/flow-rate-marlin-m221-set-flow-percentage.md`
- Ejemplo documentado: `M221 S150` fija el flujo al 150 %. — [Marlin Firmware](https://marlinfw.org/docs/gcode/M221.html),
  `wiki/raw/flow-rate-marlin-m221-set-flow-percentage.md`
- Marlin no describe calibración en esa página: sólo el comando y sus parámetros.

### Extrusion Multiplier — calibración (Prusa; dos métodos)

- **Método preciso**: cubo en modo vaso (Vase Mode, Spiral vase) con la altura de
  capa más usada; tomar **tres o más medidas en medio de cada pared**, calcular el
  espesor medio, y aplicar **Extrusion multiplier = (ancho de extrusión 0,45 /
  espesor medio medido)**. Reimprimir con el valor nuevo y repetir si hace falta.
  Las calibradores baratos pueden no dar medidas fiables de una sola pared de perímetro.
  — [Prusa Research](https://help.prusa3d.com/article/extrusion-multiplier-calibration_2257),
  `wiki/raw/flow-rate-prusa-kb-extrusion-multiplier-calibration.md`
- **Método visual**: cubo con los presets por defecto de PLA de Prusa a **0,20 mm**
  de capa; la cara superior debe quedar **lisa, brillante y sin surco ni acumulación
  junto a los perímetros**. Ajustar el EM subiendo o bajando en **1–2 %** por iteración.
  Si hay **demasiado material cerca de los perímetros**, bajar el EM; si hay **huecos
  visibles** entre líneas, subirlo (los huecos microscópicos cerca de los perímetros
  son aceptables). — [Prusa Research](https://help.prusa3d.com/article/extrusion-multiplier-calibration_2257),
  `wiki/raw/flow-rate-prusa-kb-extrusion-multiplier-calibration.md`
- **Diagnóstico de defecto**: sobreextrusión (demasiado material) → marcas en capas
  inferiores y acumulación en las superiores; subextrusión leve → huecos entre líneas
  de capa o perímetros. — [Prusa Research](https://help.prusa3d.com/article/extrusion-multiplier-calibration_2257),
  `wiki/raw/flow-rate-prusa-kb-extrusion-multiplier-calibration.md`

### Flow Rate — calibración en Bambu Studio (Bambu; dos modos)

- El flow rate requiere otras calibraciones previas (Flow Dynamics) antes de tocarlo.
  Síntomas que lo justifican (tras hacer las demás calibraciones): sobreextrusión
  (blobs/zits, capas gruesas), subextrusión (capas que faltan, relleno débil,
  huecos), mala calidad superficial, poca resistencia. También útil para materiales
  espumosos como LW-PLA. — [Bambu Lab](https://wiki.bambulab.com/en/software/bambu-studio/calibration_flow_rate),
  `wiki/raw/flow-rate-bambu-wiki-calibration-flow-rate.md`
- **Auto Flow Rate Calibration** usa Micro-Lidar que mide directamente los patrones.
  Puede fallar con filamentos **transparentes o semitransparentes, con partículas
  brillantes o de acabado muy reflectante**. Los resultados varían entre calibración
  y filamento; se sigue mejorando con actualizaciones de firmware. La calibración
  manual puede ser precisa si se sigue el procedimiento.
  — [Bambu Lab](https://wiki.bambulab.com/en/software/bambu-studio/calibration_flow_rate),
  `wiki/raw/flow-rate-bambu-wiki-calibration-flow-rate.md`
- **Modos**: Auto-Calibration (sólo la **serie X1**) y Manual Calibration (el usuario
  juzga a ojo la calidad del bloque). — [Bambu Lab](https://wiki.bambulab.com/en/software/bambu-studio/calibration_flow_rate),
  `wiki/raw/flow-rate-bambu-wiki-calibration-flow-rate.md`
- **Manual — calibración gruesa (coarse)**: valores de flujo entre **80 % y 120 %**
  sobre el flow ratio del preset, paso del **5 %**. Útil cuando no se sabe el rango.
  — [Bambu Lab](https://wiki.bambulab.com/en/software/bambu-studio/calibration_flow_rate),
  `wiki/raw/flow-rate-bambu-wiki-calibration-flow-rate.md`
- **Manual — calibración fina (fine)**: valores entre **91 % y 100 %** sobre un flow
  ratio personalizado, paso del **1 %**. Útil si el rango ya se conoce con un margen
  < 10 %. — [Bambu Lab](https://wiki.bambulab.com/en/software/bambu-studio/calibration_flow_rate),
  `wiki/raw/flow-rate-bambu-wiki-calibration-flow-rate.md`
- **Complete Calibration** = primero gruesa y luego, opcionalmente, fina. **Fine
  Calibration basada en Flow Ratio** = fina directa sobre el flow ratio indicado.
  — [Bambu Lab](https://wiki.bambulab.com/en/software/bambu-studio/calibration_flow_rate),
  `wiki/raw/flow-rate-bambu-wiki-calibration-flow-rate.md`
- **Auto**: Calibration > Flow Rate > Auto-Calibration; elegir boquilla, tipo de
  chapa y filamento (ejemplo de la fuente: boquilla 0,4 mm, Smooth PEI Plate, Bambu
  ABS). Con AMS, se puede sincronizar la lista de filamentos desde el AMS. Calibrar
  boquillas distintas exige soporte del firmware; con **OTA 01.06.00.00 sólo se
  soporta 0,4 mm**. Tras imprimir, botón Next y guardar el resultado en un preset
  nuevo (o sobrescribir el original). — [Bambu Lab](https://wiki.bambulab.com/en/software/bambu-studio/calibration_flow_rate),
  `wiki/raw/flow-rate-bambu-wiki-calibration-flow-rate.md`
- **Manual**: Calibration > Flow Rate > Manual Calibration; elegir tipo; imprimir,
  juzgar visualmente el bloque más liso, seleccionar el mejor y guardar. Ejemplo de
  la fuente: entre muestras −5 a +5, la muestra +5 fue la más lisa con flow rate
  0,997500; en la fina, evitar las muestras con subextrusión leve (−1) y conformarse
  con 0. — [Bambu Lab](https://wiki.bambulab.com/en/software/bambu-studio/calibration_flow_rate),
  `wiki/raw/flow-rate-bambu-wiki-calibration-flow-rate.md`
- **Precauciones de calibración** (Bambu): filamento seco antes y después; boquilla
  limpia por dentro y por fuera (cold pulls o boquilla nueva si hay duda); extrusor
  limpio; lavar la chapa antes de empezar para que la primera capa adhiera; no
  calibrar con extrusor sucio ni boquilla semitapada. — [Bambu Lab](https://wiki.bambulab.com/en/software/bambu-studio/calibration_flow_rate),
  `wiki/raw/flow-rate-bambu-wiki-calibration-flow-rate.md`

### Flow Ratio — calibración en OrcaSlicer (dos métodos)

- OrcaSlicer advierte a los **usuarios de Bambu Lab: no seleccionar la opción 'Flow
  calibration'**. — [OrcaSlicer](https://github.com/OrcaSlicer/OrcaSlicer/wiki/flow_ratio_calib),
  `wiki/raw/flow-rate-orcaslicer-flow-ratio-calib.md`
- **YOLO** (pase único): ajusta el flow ratio en un paso con `OldFlowRatio ±
  modifier`. Parámetros recomendados: rango de calibración **[-0,05, +0,05]** y paso
  de flow ratio **0,01** (Perfectionist: rango [-0,04, +0,035], paso 0,005). Se
  imprimen 11 bloques, uno por modificador; se elige el de mejor superficie superior
  (más lisa, sin huecos, línea mínima entre espiral interior y arcos exteriores) y se
  actualiza con `OldFlowRatio ± modifier` (ejemplo: 0,98 + 0,01 = 0,99). Patrón
  recomendado: Archimedean Chords, que imprime la espiral interior al final para
  comprobar acumulación. — [OrcaSlicer](https://github.com/OrcaSlicer/OrcaSlicer/wiki/flow_ratio_calib),
  `wiki/raw/flow-rate-orcaslicer-flow-ratio-calib.md`
- **Calibración en 2 pasadas (legado)**: primera pasada con 9 bloques y segundo con
  10 bloques (modificadores de −9 a 0). Fórmula `OldFlowRatio × (100 + modifier) /
  100` (ejemplo: 0,98 × (100 + 5) / 100 = 1,029; segunda: 1,029 × (100 − 6) / 100 =
  0,96726). — [OrcaSlicer](https://github.com/OrcaSlicer/OrcaSlicer/wiki/flow_ratio_calib),
  `wiki/raw/flow-rate-orcaslicer-flow-ratio-calib.md`
- Existe una herramienta HTML (Orca-Slicer-Assistant, de @ItsDeidara) para las
  operaciones. Idea de Archimedean Chords: Jimcorner.
  — [OrcaSlicer](https://github.com/OrcaSlicer/OrcaSlicer/wiki/flow_ratio_calib),
  `wiki/raw/flow-rate-orcaslicer-flow-ratio-calib.md`

### Max Volumetric Speed — calibración en OrcaSlicer

- El valor depende de **material, máquina, diámetro de boquilla y montaje del
  extrusor**; hay que calibrarlo por impresora y por filamento. Incluso dentro del
  mismo tipo (PLA), **marca y color** afectan. Si se va a subir velocidad/flujo,
  conviene subir la temperatura de boquilla hacia el extremo alto del rango del
  filamento (torre de temperatura). — [OrcaSlicer](https://github.com/OrcaSlicer/OrcaSlicer/wiki/volumetric_speed_calib),
  `wiki/raw/flow-rate-orcaslicer-volumetric-speed-calib.md`
- Procedimiento documentado: pedir inicio, fin y paso de caudal volumétrico; valores
  por defecto **5 mm³/s inicio, 20 mm³/s fin, paso 0,5**. Imprimir, anotar dónde
  empiezan a fallar las capas y dónde baja la calidad; un cambio de brillo
  (brillante ↔ mate) es pista visual de degradación del material o mala adhesión.
  Medir con calibre o regla la **altura justo antes de los defectos**. Fórmula:
  **Filament Max Volumetric Speed = inicio + (altura medida × paso)**. Ejemplo con
  19 mm: 5 + (19 × 0,5) = **14,5 mm³/s**. — [OrcaSlicer](https://github.com/OrcaSlicer/OrcaSlicer/wiki/volumetric_speed_calib),
  `wiki/raw/flow-rate-orcaslicer-volumetric-speed-calib.md`
- Verificación cruzada en la pestaña Preview del slicer, esquema de color **"flow"**,
  bajando hasta la altura medida y deslizando el cabezal. Tras calcularlo, fijarlo en
  los ajustes del filamento. — [OrcaSlicer](https://github.com/OrcaSlicer/OrcaSlicer/wiki/volumetric_speed_calib),
  `wiki/raw/flow-rate-orcaslicer-volumetric-speed-calib.md`
- La prueba es **el mejor caso**: no tiene en cuenta retracciones ni otros ajustes
  que pueden aumentar atascos o subextrusión. Se recomienda **reducir el valor un
  10–20 %** (o más) por seguridad. Imprimir a alto caudal puede dar mala adhesión
  entre capas o atascos. — [OrcaSlicer](https://github.com/OrcaSlicer/OrcaSlicer/wiki/volumetric_speed_calib),
  `wiki/raw/flow-rate-orcaslicer-volumetric-speed-calib.md`

### Pressure Advance (Klipper y OrcaSlicer; mismo concepto con nombres distintos)

- **Pressure advance** (Klipper, documentado también por OrcaSlicer y Duet/RepRap)
  es una característica que **compensa el retraso de la presión del filamento en la
  boquilla durante aceleración y deceleración**, reduciendo ooze, blobs y extrusión
  inconsistente, sobre todo en esquinas y movimientos rápidos. OrcaSlicer lo describe
  como equivalente al **Linear Advance (Marlin)**. — [Klipper3d](https://www.klipper3d.org/Pressure_Advance.html),
  [OrcaSlicer](https://github.com/OrcaSlicer/OrcaSlicer/wiki/material_flow_ratio_and_pressure_advance),
  `wiki/raw/flow-rate-klipper-pressure-advance.md`,
  `wiki/raw/flow-rate-orcaslicer-material-flow-ratio-and-pressure-advance.md`
- PA no cambia el **tiempo** ni la **trayectoria** del cabezal, ni la **cantidad
  total de filamento** extruido: sólo añade movimiento del extrusor durante la
  aceleración/deceleración. — [Klipper3d](https://www.klipper3d.org/Pressure_Advance.html),
  `wiki/raw/flow-rate-klipper-pressure-advance.md`
- La PA depende del **extrusor, la boquilla y el filamento**; un filamento de distinto
  fabricante o pigmento puede exigir valores muy distintos. Conviene calibrarla en
  cada impresora y con cada bobina. También la afectan la temperatura de impresión y
  los caudales de extrusión. — [Klipper3d](https://www.klipper3d.org/Pressure_Advance.html),
  `wiki/raw/flow-rate-klipper-pressure-advance.md`
- **En Klipper** se activa con `pressure_advance = <valor>` en la sección
  `[extruder]` y un **RESTART**. El ensayo usa una torre hueca (cuadrado hueco,
  `square_tower.stl`), velocidad alta (≈ **100 mm/s**), relleno cero y capa gruesa
  (**≈ 75 % del diámetro de boquilla**). Desactivar en el slicer "dynamic
  acceleration control" y costuras "scarf joint". — [Klipper3d](https://www.klipper3d.org/Pressure_Advance.html),
  `wiki/raw/flow-rate-klipper-pressure-advance.md`
- Preparación del ensayo Klipper:
  `SET_VELOCITY_LIMIT SQUARE_CORNER_VELOCITY=1 ACCEL=500`;
  extrusora directa: `TUNING_TOWER COMMAND=SET_PRESSURE_ADVANCE PARAMETER=ADVANCE START=0 FACTOR=.005`;
  bowden largo: `... FACTOR=.020`.
  Cálculo: **pressure_advance = <start> + <altura medida> × <factor>** (ejemplo:
  0 + 12,90 × 0,020 = 0,258). — [Klipper3d](https://www.klipper3d.org/Pressure_Advance.html),
  `wiki/raw/flow-rate-klipper-pressure-advance.md`
- **Valores típicos de pressure advance: entre 0,050 y 1,000** (el extremo alto sólo
  en bowden). Si no mejora hasta 1,000, es poco probable que ayude: volver a la
  configuración por defecto con PA deshabilitado.
  — [Klipper3d](https://www.klipper3d.org/Pressure_Advance.html),
  `wiki/raw/flow-rate-klipper-pressure-advance.md`
- Avisos Klipper: si el PA es alto (> 0,200) puede haber saltos del extrusor al
  volver a la aceleración normal. Conviene tener la **rotation_distance del extrusor**
  y la **temperatura de boquilla** ya calibradas antes. Medir con calibre la altura
  de la mejor calidad; ante la duda, escoger la más baja. Un PA alto exige mucha
  adaptación del extrusor durante la acel/decel; no hay límite configurado para esa
  cantidad de movimiento. También puede ser útil combinar con una **pequeña retracción
  (≈ 0,75 mm)** y "wipe on retract", y desactivar el "z-lift on retract".
  — [Klipper3d](https://www.klipper3d.org/Pressure_Advance.html),
  `wiki/raw/flow-rate-klipper-pressure-advance.md`
- **OrcaSlicer — PA del material** (`enable_pressure_advance` boolean, `pressure_advance`
  float, modos Simple/Advanced; CLI `--enable-pressure-advance=1`): habilitarlo
  **sobrescribe el resultado de la auto-calibración**. Sirve para compensar el retraso
  de presión; reduce blobs, ooze y extrusión inconsistente.
  — [OrcaSlicer](https://github.com/OrcaSlicer/OrcaSlicer/wiki/material_flow_ratio_and_pressure_advance),
  `wiki/raw/flow-rate-orcaslicer-material-flow-ratio-and-pressure-advance.md`
- **Adaptive Pressure Advance** (beta, `adaptive_pressure_advance`, boolean): con
  velocidades/caudales/aceleraciones crecientes, el PA efectivo **típicamente
  disminuye**, así que un solo valor de PA suele no ser óptimo para todos los
  elementos. El slicer modela la respuesta del sistema de extrusión según caudal
  volumétrico y aceleración, y emite el PA calculado según las condiciones. Al
  habilitarlo, el valor fijo de PA se sobrescribe; se recomienda un valor fijo
  razonable como respaldo y para cambios de herramienta.
  — [OrcaSlicer](https://github.com/OrcaSlicer/OrcaSlicer/wiki/material_flow_ratio_and_pressure_advance),
  `wiki/raw/flow-rate-orcaslicer-material-flow-ratio-and-pressure-advance.md`
- **Adaptive PA para voladizos** (`adaptive_pressure_advance_overhangs`, beta) y **PA
  para puentes** (`adaptive_pressure_advance_bridges`, float): un PA más bajo en
  puentes ayuda a reducir la subextrusión leve justo después del puente (caída de
  presión al imprimir en el aire). Poner 0 desactiva. — [OrcaSlicer](https://github.com/OrcaSlicer/OrcaSlicer/wiki/material_flow_ratio_and_pressure_advance),
  `wiki/raw/flow-rate-orcaslicer-material-flow-ratio-and-pressure-advance.md`
- **Mediciones del Adaptive PA** (beta): tripletes `PA, FLOW, ACCELERATION`, uno por
  línea (ej. `0.04,3.96,3000`). Calibrar ejecutando la prueba de PA en **al menos 3
  velocidades por valor de aceleración** (perímetros exteriores, interiores y la
  feature más rápida), para la aceleración mínima y la máxima, y no superar la
  aceleración máxima recomendada por el input shaper de Klipper. El PA ideal debe
  **disminuir** al aumentar el caudal volumétrico; si no, revisar el extrusor o usar
  el valor de la prueba más rápida. — [OrcaSlicer](https://github.com/OrcaSlicer/OrcaSlicer/wiki/material_flow_ratio_and_pressure_advance),
  `wiki/raw/flow-rate-orcaslicer-material-flow-ratio-and-pressure-advance.md`

### Linear Advance (Marlin; firmware-específico)

- **LIN_ADVANCE** desacopla la extrusión de los ejes XYZ para controlar la **presión
  del material dentro de la boquilla** en función de la velocidad de impresión;
  reduce material extra al final de cada movimiento y sangrado en esquinas. Ventajas:
  mejor precisión dimensional, velocidades más altas sin perder calidad, mejor calidad
  incluso a bajas velocidades, sin necesidad de altas aceleraciones/jerk para esquinas
  afiladas. — [Marlin Firmware](https://marlinfw.org/docs/features/lin_advance.html),
  `wiki/raw/flow-rate-marlin-linear-advance.md`
- **Versión 1.5**: K pasa a tener unidades significativas —"mm de compresión de
  filamento necesarios por 1 mm/s de velocidad de extrusión" (**mm/mm/s**)—; valores
  típicos de K alrededor de **0,1–2,0** (frente a 30–130 en v1.0). Necesita recalibrar
  K al cambiar de versión. — [Marlin Firmware](https://marlinfw.org/docs/features/lin_advance.html),
  `wiki/raw/flow-rate-marlin-linear-advance.md`
- Los extrusores **bowden** necesitan un K más alto que los directos. Rangos
  orientativos de K para bowden: **≈ 0,1 hasta ≈ 2,0 (v1.5)** o **≈ 30 hasta ≈ 130
  (v1.0)**. — [Marlin Firmware](https://marlinfw.org/docs/features/lin_advance.html),
  `wiki/raw/flow-rate-marlin-linear-advance.md`
- El mejor K depende del tipo de filamento (filamentos muy flexibles como Ninjaflex
  pueden no funcionar), temperatura de impresión, características del extrusor (bowden
  vs. directo, longitud del bowden, longitud libre de filamento), tamaño y geometría
  de boquilla. El **steps/mm del extrusor debe estar calibrado con precisión** (en
  bajas velocidades) y minimizar holguras por engranajes o fittings. **Repetir la
  calibración si cambia alguno de esos parámetros.** — [Marlin Firmware](https://marlinfw.org/docs/features/lin_advance.html),
  `wiki/raw/flow-rate-marlin-linear-advance.md`
- **Patrón de calibración K-Factor**: generar G-code con el generador de Marlin. Cada
  línea: **20 mm de extrusión a velocidad lenta**, luego **40 mm a velocidad rápida**,
  y **20 mm a velocidad lenta**. El K aumenta por pasos (`K-Factor Stepping`) desde un
  valor inicial hasta el final. Demasiado bajo → presión atrasada al acelerar (línea
  "starved") y exceso al decelerar (blob); demasiado alto → exceso al arrancar y
  hambre al decelerar; la línea con transición fluida y apenas visible es la óptima.
  — [Marlin Firmware](https://marlinfw.org/docs/features/lin_advance.html),
  `wiki/raw/flow-rate-marlin-linear-advance.md`
- En **v1.5**, LIN_ADVANCE respeta el jerk del extrusor y puede **reducir la
  aceleración** del movimiento si el K requiere correcciones más rápidas de las
  permitidas; en printers direct-drives esto no suele pasar con PLA, en bowden sí. Opciones
  si ocurre: aumentar el jerk del extrusor, bajar aceleración o K, acortar el bowden.
  — [Marlin Firmware](https://marlinfw.org/docs/features/lin_advance.html),
  `wiki/raw/flow-rate-marlin-linear-advance.md`
- **Activación en firmware**: compilar con `#define LIN_ADVANCE` y
  `#define LIN_ADVANCE_K <valor>` en `Configuration_adv.h`. Si se usa un solo
  material, fijar ahí el mejor K y reflashear. Alternativa: poner `M900 Kxx` en el
  script de inicio del slicer (Cura: Machine Settings; Slic3r: Printer Settings →
  Custom G-code; Simplify3D: Scripts → Custom G-code). Con ese método conviene dejar
  `LIN_ADVANCE_K` a 0 en firmware para que no se solape un valor fijo.
  — [Marlin Firmware](https://marlinfw.org/docs/features/lin_advance.html),
  `wiki/raw/flow-rate-marlin-linear-advance.md`
- **Nota 1 de Marlin**: configurar K mediante start script sigue requiriendo la
  funcionalidad activa en el firmware. **Nota 2**: esos scripts son individuales por
  impresora y gusto personal.
  — [Marlin Firmware](https://marlinfw.org/docs/features/lin_advance.html),
  `wiki/raw/flow-rate-marlin-linear-advance.md`
- Consideraciones antes de usar Linear Advance: desactivar en el slicer las opciones
  de control de presión (Pressure advance, Coast at end, extra restart length after
  retract) porque interfieren, y desactivar "wipe while retract" y "combing". Habrá
  poco ooze una vez calibrado K. Revisar la distancia de retracción (puede llegar a
  0). **K = 0 desactiva el avance.** — [Marlin Firmware](https://marlinfw.org/docs/features/lin_advance.html),
  `wiki/raw/flow-rate-marlin-linear-advance.md`
- LIN_ADVANCE no reduce la aceleración en sí; la corrección de presión se modela
  como resorte de filamento (v1.0) donde `advance_steps = delta_extrusion_speed × K`.
  — [Marlin Firmware](https://marlinfw.org/docs/features/lin_advance.html),
  `wiki/raw/flow-rate-marlin-linear-advance.md`

## Contradicciones

**No se resuelven aquí.** Se anotan con matiz; el redactor debe explicar el matiz.

### 1. "Flow rate" y "Extrusion multiplier" son la misma cosa, pero no se suman en el mismo botón

- **Multiplicativo.** Total flow rate = M221 (firmware) × EM (slicer).
  — [Prusa Research](https://help.prusa3d.com/article/extrusion-multiplier-calibration_2257)
- Ajustar uno **no** cambia el valor del otro. — [Prusa Research](https://help.prusa3d.com/article/extrusion-multiplier-calibration_2257)
- **Matiz**: el efecto total es el producto de los dos, por lo que mover ambos a la
  vez complica saber qué hizo el trabajo. El corpus no da una regla de precedencia
  entre slicer y firmware; cada fuente calibra en su propia capa (EM en PrusaSlicer,
  flow en el menú Tune, M221 en Marlin, flow ratio en Orca).

### 2. Las fórmulas de calibración del flow ratio no coinciden (YOLO vs. legacy)

- **YOLO**: `OldFlowRatio ± modifier` (paso 0,01 o 0,005).
  — [OrcaSlicer](https://github.com/OrcaSlicer/OrcaSlicer/wiki/flow_ratio_calib)
- **2-pass (legado)**: `OldFlowRatio × (100 + modifier) / 100`.
  — [OrcaSlicer](https://github.com/OrcaSlicer/OrcaSlicer/wiki/flow_ratio_calib)
- **Matiz**: son métodos distintos de la misma herramienta; YOLO es el recomendado
  por OrcaSlicer y el legacy se mantiene. No son intercambiables: uno suma/resta
  absoluto y el otro escala porcentualmente.

### 3. Bambu: Auto vs. Manual, y coarse vs. fine

- **Auto** usa Micro-Lidar y sólo está disponible en la **serie X1**; con OTA
  01.06.00.00 sólo soporta boquilla **0,4 mm**.
  — [Bambu Lab](https://wiki.bambulab.com/en/software/bambu-studio/calibration_flow_rate)
- **Manual coarse**: rango 80–120 %, paso 5 %; **fine**: 91–100 %, paso 1 %.
  — [Bambu Lab](https://wiki.bambulab.com/en/software/bambu-studio/calibration_flow_rate)
- **Complete Calibration** encadena coarse + fine; **Fine basada en Flow Ratio** hace
  sólo la fina. — [Bambu Lab](https://wiki.bambulab.com/en/software/bambu-studio/calibration_flow_rate)
- **OrcaSlicer avisa**: en impresoras Bambu Lab **no seleccionar la opción 'Flow
  calibration'**. — [OrcaSlicer](https://github.com/OrcaSlicer/OrcaSlicer/wiki/flow_ratio_calib)
- **Matiz**: Bambu Studio tiene su propio flujo de calibración (Micro-Lidar, bloques
  por porcentaje) que **no** es el flujo de OrcaSlicer (modificadores de flow ratio,
  patrones Archimedean). Usar uno en el ecosistema del otro no está soportado por
  ninguna de las dos fuentes.

### 4. El PA de Bambu X1 (Flow Dynamics) frente a Orca/Bambu Studio

- El corpus **no contiene** documentación del "Flow Dynamics Calibration" de Bambu
  (la otra calibración previa que Bambu exige antes del Flow Rate). Sólo se cita su
  nombre como paso previo. — [Bambu Lab](https://wiki.bambulab.com/en/software/bambu-studio/calibration_flow_rate)
- OrcaSlicer define PA como compensación de retraso de presión y lo equipara a
  Linear Advance de Marlin; Klipper lo documenta con su propio ensayo.
  — [Klipper3d](https://www.klipper3d.org/Pressure_Advance.html),
  [OrcaSlicer](https://github.com/OrcaSlicer/OrcaSlicer/wiki/material_flow_ratio_and_pressure_advance)
- **Matiz**: las tres fuentes (Bambu, Orca, Klipper) nombran el mismo fenómeno
  (presión en boquilla en accel/decel), pero las **unidades y escalas** no son
  comparables: Klipper trabaja en 0,050–1,000; Marlin K en 0,1–2,0 (v1,5) o
  30–130 (v1,0); Orca guarda un float por filamento. **No se traduce un valor de
  una escala a otra.**

### 5. K (Marlin) y PA (Klipper) no son el mismo número

- Marlin K v1.5 ≈ **0,1–2,0**; v1.0 ≈ **30–130**.
  — [Marlin Firmware](https://marlinfw.org/docs/features/lin_advance.html)
- Klipper PA típico **0,050–1,000**.
  — [Klipper3d](https://www.klipper3d.org/Pressure_Advance.html)
- **Matiz**: el tamaño y la longitud del bowden determinan el rango; un bowden alto
  en K no se convierte en un PA alto sólo por el número. Cada firmware calibra con su
  propio patrón (Marlin: 20/40/20 mm lento/rápido/lento; Klipper: torre hueca con
  `TUNING_TOWER`). Sólo se puede concluir que los sistemas **bowden** requieren
  correcciones mayores que los **direct drive** en ambas fuentes.

### 6. Adaptive PA (beta, OrcaSlicer) afirma que un PA único no suele ser óptimo

- Con velocidades/aceleraciones crecientes, el PA efectivo **típicamente disminuye**,
  por lo que un solo PA es un compromiso. — [OrcaSlicer](https://github.com/OrcaSlicer/OrcaSlicer/wiki/material_flow_ratio_and_pressure_advance)
- **Ensayo**: al menos 3 velocidades por aceleración; el PA ideal debe **disminuir**
  al aumentar el caudal; si no, revisar el extrusor. — [OrcaSlicer](https://github.com/OrcaSlicer/OrcaSlicer/wiki/material_flow_ratio_and_pressure_advance)
- **Matiz con la honestidad del corpus**: éste afirma la tendencia pero no da un
  modelo cerrado ni valores publicados; las mediciones las pone el usuario.

## Sin respaldo

No hay fuentes secundarias (foros, artículos no oficiales) en este lote: todos los
ficheros son documentación oficial del fabricante/proyecto. La lista siguiente
recoge **afirmaciones que sólo aparecen en una fuente del lote** (sin corroboración
cruzada) y que conviene verificar antes de redactarlas como regla general. No se les
aplica la marca de fuente secundaria porque su origen es documentación oficial.

- El **rango recomendado de flow ratio es 0,95–1,05** y su efecto es proporcional;
  el flow ratio final se **multiplica** por el del filamento.
  — sólo OrcaSlicer (`material_flow_ratio_and_pressure_advance`).
- Que **brand y color** afecten de forma notable al caudal volumétrico máximo y al PA.
  — sólo OrcaSlicer (`volumetric_speed_calib`) y sólo Klipper
  (`Pressure_Advance.html`), respectivamente; no se corroboran entre sí.
- El **paso del 10–20 % de reducción** tras el ensayo de caudal volumétrico.
  — sólo OrcaSlicer (`volumetric_speed_calib`).
- Que la **prueba de caudal volumétrico es "el mejor caso"** y no tiene en cuenta
  retracciones.
  — sólo OrcaSlicer (`volumetric_speed_calib`).
- **Valores típicos de PA (0,050–1,000)**, el comando `TUNING_TOWER ... FACTOR=.005
  / .020` y la fórmula `start + height × factor`.
  — sólo Klipper (`Pressure_Advance.html`).
- Los **ranges de K de Marlin** (0,1–2,0 v1,5; 30–130 v1,0) y el patrón 20/40/20 mm.
  — sólo Marlin (`lin_advance.html`).
- La **advertencia de Orca a los usuarios Bambu** ("no seleccionar 'Flow
  calibration'") y el ejemplo de muestra +5 = 0,997500.
  — sólo OrcaSlicer (`flow_ratio_calib`) y Bambu Studio
  (`calibration_flow_rate`), respectivamente; no se corroboran entre sí.
- El ejemplo de PA adaptativo (`0,04, 3,96, 3000`) y la regla de "al menos 3
  velocidades por aceleración".
  — sólo OrcaSlicer (`material_flow_ratio_and_pressure_advance`).
- Que una **pequeña retracción (~0,75 mm)** y "wipe on retract" sean útiles tras
  calibrar PA en Klipper, y que se desactive "z-lift on retract".
  — sólo Klipper (`Pressure_Advance.html`).
- Los **nombres de opciones de menú** y **secuencias de pulsación** (Calibration >
  Flow Rate > …) son specifics de una versión del slicer/software y pueden cambiar
  con actualizaciones.

## Tirado

Qué se eliminó y por qué (el redactor no usa nada de esto).

- **Navegación del wiki**, "Related wiki links", migas, enlaces de soporte y pie de
  página de cada artículo. — no son datos técnicos.
- **Anuncios y banners** (no presentes en estos ficheros crudos). — no aplican.
- **Imágenes y STL referenciados** (cubos de precisión/visual, square_tower.stl,
  GIFs del wiki de Orca) que no se descargaron. Se conserva la descripción textual.
  — no son citables desde aquí.
- **Metadatos de captura** de los ficheros crudos (estado HTTP 200, "no es una
  cáscara", "el cuerpo original está en inglés y no se ha traducido"). Son notas del
  recolector, no datos del artículo.
- **Analogías ilustrativas** (pasta de dientes para el flow rate). Se descartan
  porque no añaden dato comprobable.
- **Repetidos condensados**: la definición de sobre/subextrusión aparece en Prusa
  KB y Bambu Lab; la de PA aparece en Orca y Klipper; el "flujo = cuánto sale de la
  boquilla" aparece en Prusa y Bambu. Se quedó una versión por fuente y el resto se
  cita como corroboración.
- **Ejemplos numéricos de calibración** (0,997500 en Bambu, 14,5 mm³/s en Orca,
  0,258 en Klipper) se conservan marcados como **ejemplos de la fuente**, no como
  valores universales.
- **Notas de "cola" del fichero crudo** (`## Notas del recolector`) que
  recapitulan el contenido; se usaron como guía de lectura, no se copiaron como
  afirmaciones.

## Relaciones

| Concepto | Se relaciona con | Cómo |
|---|---|---|
| Extrusion multiplier (slicer) | Flow rate / M221 (firmware) | mismo ajuste en capas distintas; efecto total multiplicativo |
| Flow ratio (Orca) | Extrusion multiplier (Prusa/Bambu) | mismo concepto de "factor que multiplica la extrusión", en distintos slicers |
| Caudal volumétrico máximo | Velocidad de impresión | la velocidad de impresión no puede superar el max volumetric speed del filamento |
| Flow ratio | Caudal volumétrico | PA adaptativo depende del caudal volumétrico; el flow ratio afecta la cantidad extruida |
| Pressure Advance (Klipper) | Linear Advance (Marlin) | mismo fenómeno (retraso de presión en accel/decel), distinto firmware y escala |
| PA / Linear Advance | Extrusión / flow | corrige la presión en boquilla sin cambiar la cantidad total extruida |
| Calibración de caudal (Bambu auto/manual) | Calibración de flow ratio (Orca) | procedimientos distintos; Orca avisa de no mezclarlos en impresoras Bambu |
| M221 | Extrusion multiplier | uno fija porcentaje en firmware; el otro en slicer; ninguno modifica al otro |
| Max volumetric speed (Orca) | Calibración por altura medida | formula inicio + altura × paso; luego reducir 10–20 % por seguridad |
| Extrusion multiplier (Prusa) | Cama / flujo / calidad superficial | sobre/subextrusión y ajuste por capa superior o pared de cubo en vaso |
| Tema flow rate | warping / adhesión / separación de capas | sub/sobreextrusión se confunde fácilmente con warping y con gaps entre capas |