import type { Guia } from './tipos';
import { AUTOR } from './autor.ts';

/**
 * Flow rate, flow ratio y control de presión.
 *
 * El flujo no es una constante del slicer: lo ajustan dos capas distintas
 * (el multiplicador de extrusión del slicer y el porcentaje del firmware) y su
 * efecto total es el producto de las dos. Calibrarlo es medir, no adivinar.
 */
export const flowRate: Guia = {
  slug: 'flow-rate',
  titulo: 'Flow rate y calibración del flujo',
  resumen:
    'Cómo se calibra el flujo de filamento, y por qué el ajuste del slicer y el del firmware son dos capas distintas.',
  resumenExtra:
    'Antes de tocar temperatura se descarta warping y separación: lo que falla aquí es cuánto filamento sale.',
  sintoma: 'Huecos o exceso de material en las líneas',
  dibujo: 'hotend',
  entrada:
    'La pieza está bien adherida y las capas no se abren por dentro: lo que se ve es que las líneas no llenan o que sobra material. Subir la cama o la boquilla no lo arregla. Lo que falla es la cantidad de filamento que sale, y las dos capas que la ajustan (slicer y firmware) son distintas.',
  autor: AUTOR,
  actualizado: '2026-10-21',
  minutos: 8,

  diferencial: {
    contra: 'warping, separación entre capas, desplazamiento y sub/sobreextrusión por flujo',
    contraCorto: 'warping y separación',
    comprobaciones: [
      {
        id: 'base',
        mira: 'La base de la pieza, pegada a la cama: ¿está plana o se levanta por las esquinas?',
        si: 'Arqueada o con las esquinas levantadas desde la cama. Es warping: el contraste térmico tira de los extremos.',
        no: 'Plana. Entonces no es warping: sigue comprobando el corte y el flujo.',
      },
      {
        id: 'corte',
        mira: '¿Se abre la pieza por dentro, entre capas?',
        si: 'Se abre por dentro con corte limpio. Es separación entre capas; la temperatura y el enfriamiento son el ajuste.',
        no: 'No se abre: la unión está intacta y lo que falla es la cantidad de material.',
      },
      {
        id: 'lineas',
        mira: 'Las líneas de la capa superior: ¿se ven con huecos o con material acumulado junto a los perímetros?',
        si: 'Huecos entre líneas o material acumulado en un lado: es un problema de flow, no de adhesión.',
        no: 'Líneas uniformes pero otras anomalías (bandas, nozzle clog): puede no ser flow; revisa retracción y obstrucción.',
      },
    ],
    siNo: { guia: 'warping-pla', etiqueta: 'Warping en PLA' },
  },

  variables: [
    {
      id: 'material',
      etiqueta: 'Material',
      indicador: 'material',
      para: 'Cada material fluye distinto: PLA fluye fácil, ABS y nylon más espeso, PETG pegajoso, TPU flexible y viscoso, PC duro y los composites abrasivos.',
      necesaria: true,
      campos: ['material'],
      opciones: [
        { id: 'pla', etiqueta: 'PLA' },
        { id: 'pla-cf', etiqueta: 'PLA-CF / composites' },
        { id: 'petg', etiqueta: 'PETG' },
        { id: 'abs', etiqueta: 'ABS o ASA' },
        { id: 'pa', etiqueta: 'PA / nylon' },
        { id: 'pc', etiqueta: 'PC' },
        { id: 'tpu', etiqueta: 'TPU' },
      ],
    },
    {
      id: 'slicer',
      etiqueta: 'Slicer',
      indicador: 'slicer',
      para: 'Cada slicer calibra el flujo con un procedimiento distinto y no se mezclan entre ecosistemas.',
      necesaria: true,
      opciones: [
        { id: 'prusa', etiqueta: 'PrusaSlicer' },
        { id: 'bambu', etiqueta: 'Bambu Studio' },
        { id: 'orca', etiqueta: 'OrcaSlicer' },
        { id: 'otro', etiqueta: 'Otro' },
      ],
    },
    {
      id: 'defecto',
      etiqueta: 'Síntoma visible',
      indicador: 'general',
      para: 'La dirección del ajuste depende de si falta o sobra material.',
      necesaria: true,
      opciones: [
        { id: 'sub', etiqueta: 'Subextrusión (huecos, líneas débil)', detalle: 'Falta material' },
        { id: 'sobre', etiqueta: 'Sobreextrusión (blobs, líneas que se solapan)', detalle: 'Sobra material' },
        { id: 'ambos', etiqueta: 'Ambos o no lo tengo claro' },
      ],
    },
    {
      id: 'boquilla',
      etiqueta: 'Boquilla',
      indicador: 'temperatura',
      para: 'Algunas calibraciones automáticas sólo soportan un diámetro concreto, y el caudal volumétrico depende del área de sección.',
      opciones: [
        { id: '04', etiqueta: '0,4 mm' },
        { id: '06', etiqueta: '0,6 mm o más' },
        { id: 'otra', etiqueta: 'Otra o no lo sé' },
      ],
    },
    {
      id: 'extrusor',
      etiqueta: 'Extrusor',
      indicador: 'maquina',
      para: 'Direct drive y bowden necesitan correcciones de presión distintas, con escalas distintas.',
      opciones: [
        { id: 'directo', etiqueta: 'Direct drive' },
        { id: 'bowden', etiqueta: 'Bowden' },
        { id: 'desconocido', etiqueta: 'No lo sé' },
      ],
    },
    {
      id: 'firmware',
      etiqueta: 'Firmware',
      indicador: 'maquina',
      para: 'Pressure Advance y Linear Advance son funciones específicas de cada firmware y no se portan entre ellos.',
      opciones: [
        { id: 'klipper', etiqueta: 'Klipper' },
        { id: 'marlin', etiqueta: 'Marlin' },
        { id: 'otro', etiqueta: 'Otro' },
        { id: 'desconocido', etiqueta: 'No lo sé' },
      ],
    },
  ],

  conocimiento: [
    {
      id: 'misma-cosa',
      titulo: 'El mismo ajuste, en dos capas distintas',
      puntos: [
        'El extrusion multiplier del slicer y el flow rate del firmware ajustan la misma cosa: cuánto filamento sale de la boquilla.',
        'Total flow rate = M221 (firmware) × Extrusion multiplier (slicer, PrusaSlicer usa la misma matemática que Slic3r).',
        'Cambiar uno no cambia el valor del otro, y el efecto total es el producto.',
      ],
      indicador: 'slicer',
      cuerpo:
        'El extrusion multiplier del slicer y el flow rate del firmware ajustan la misma cosa: cuánto filamento sale de la boquilla. Total flow rate = M221 (firmware) × Extrusion multiplier (slicer, PrusaSlicer usa la misma matemática que Slic3r). Cambiar uno no cambia el valor del otro, y el efecto total es el producto.',
      cifra: { valor: 'M221 × EM', nota: 'efecto total multiplicativo (Prusa)' },
      cita: {
        texto: 'Extrusion multiplier (PrusaSlicer) y flow rate (firmware) son dos maneras de ajustar la misma cosa; total flow rate = Flow multiplier en firmware × Extrusion multiplier en PrusaSlicer.',
        fuente: 'Prusa Research',
      },
    },
    {
      id: 'flow-definicion',
      titulo: 'Qué es el flow rate',
      puntos: [
        'Es la cantidad de filamento que empuja el extrusor, medida como porcentaje o multiplicador del valor por defecto.',
        'Y controla el grosor del plástico extruido.',
        'Demasiado alto produce sobreextrusión: blobs y líneas que se solapan.',
        'Demasiado bajo produce subextrusión: huecos en las líneas.',
      ],
      indicador: 'altura',
      cuerpo:
        'Es la cantidad de filamento que empuja el extrusor, medida como porcentaje o multiplicador del valor por defecto, y controla el grosor del plástico extruido. Demasiado alto produce sobreextrusión: blobs y líneas que se solapan. Demasiado bajo produce subextrusión: huecos en las líneas.',
      cifra: { valor: '1 = 100 %', nota: 'Prusa: PLA por defecto' },
      cita: {
        texto: 'Flow rate es el porcentaje o multiplicador del valor por defecto; demasiado alto provoca sobreextrusión (blobs, líneas que se solapan) y demasiado bajo subextrusión (huecos en las líneas).',
        fuente: 'Bambu Lab',
      },
    },
    {
      id: 'materiales',
      titulo: 'El flow debe coincidir con el material',
      puntos: [
        'Los filamentos difieren en viscosidad y punto de fusión: PLA fluye fácil, ABS y nylon algo más espeso.',
        'PETG pegajoso, TPU flexible y viscoso, PC duro y los composites pueden ser abrasivos.',
        'El flow debe coincidir con las propiedades del material.',
        'También son útiles para materiales espumosos como LW-PLA, que se expanden mucho al calentarse.',
      ],
      indicador: 'velocidad',
      cuerpo:
        'Los filamentos difieren en viscosidad y punto de fusión: PLA fluye fácil, ABS y nylon algo más espeso, PETG pegajoso, TPU flexible y viscoso, PC duro y los composites pueden ser abrasivos. El flow debe coincidir con las propiedades del material. También son útiles para materiales espumosos como LW-PLA, que se expanden mucho al calentarse.',
      cita: { texto: 'Los filamentos difieren en viscosidad y punto de fusión; el flow debe coincidir con las propiedades del material.', fuente: 'Bambu Lab' },
    },
    {
      id: 'em-prusa-default',
      titulo: 'Extrusion Multiplier por defecto en PrusaSlicer',
      puntos: [
        'El EM por defecto para PLA es 1, y los valores ajustados habitualmente quedan entre 0,9 y 1,1.',
        'Esta calibración está marcada por Prusa como avanzada y recomendada sólo para usuarios experimentados.',
        'No es necesaria en una impresora recién salida de fábrica, y el valor ideal difiere por tipo de material, color e incluso por bobina.',
      ],
      indicador: 'calibracion',
      cuerpo:
        'El EM por defecto para PLA es 1, y los valores ajustados habitualmente quedan entre 0,9 y 1,1. Esta calibración está marcada por Prusa como avanzada y recomendada sólo para usuarios experimentados; no es necesaria en una impresora recién salida de fábrica, y el valor ideal difiere por tipo de material, color e incluso por bobina.',
      cuando: { slicer: 'prusa' },
      cifra: { valor: '0,9–1,1', nota: 'EM ajustado para PrusaSlicer (avanzado)' },
      cita: {
        texto: 'Extrusion Multiplier por defecto para PLA: 1; valores ajustados habitualmente entre 0,9 y 1,1. Calibración avanzada recomendada para usuarios experimentados.',
        fuente: 'Prusa Research',
      },
    },
    {
      id: 'preset-prusa',
      titulo: 'El preset base sobre el que se calibra (Prusa)',
      puntos: [
        'Perfil de boquilla 0,4, altura de capa 0,1–0,2 mm, ancho de extrusión 0,45 y EM = 1 para materiales básicos (PLA, ABS, PETG).',
        'Calibrar sobre otro preset desplaza el resultado.',
      ],
      indicador: 'calibracion',
      cuerpo:
        'Perfil de boquilla 0,4, altura de capa 0,1–0,2 mm, ancho de extrusión 0,45 y EM = 1 para materiales básicos (PLA, ABS, PETG). Calibrar sobre otro preset desplaza el resultado.',
      cuando: { slicer: 'prusa' },
      cifra: { valor: '0,45 mm', nota: 'ancho de extrusión base del preset' },
      cita: { texto: 'Preset base: boquilla 0,4, altura de capa 0,1–0,2 mm, ancho de extrusión 0,45, EM = 1 para PLA, ABS y PETG.', fuente: 'Prusa Research' },
    },
    {
      id: 'caudal-maximo',
      titulo: 'Caudal volumétrico máximo',
      puntos: [
        'En Bambu Studio el Flow muestra el caudal volumétrico en distintas posiciones y la impresora impone un límite máximo por filamento.',
        'Máximo caudal volumétrico = área de sección transversal de la línea extruida × velocidad máxima de impresión.',
        'Cambiar parámetros obliga a volver a rebanar.',
      ],
      indicador: 'maquina',
      cuerpo:
        'En Bambu Studio el Flow muestra el caudal volumétrico en distintas posiciones y la impresora impone un límite máximo por filamento. Máximo caudal volumétrico = área de sección transversal de la línea extruida × velocidad máxima de impresión. Cambiar parámetros obliga a volver a rebanar.',
      cifra: { valor: 'área × velocidad', nota: 'Bambu: fórmula de límite' },
      cita: { texto: 'Máximo caudal volumétrico = área de sección transversal de la línea extruida × velocidad máxima de impresión.', fuente: 'Bambu Lab' },
    },
    {
      id: 'flow-ratio-rango',
      titulo: 'Flow Ratio en OrcaSlicer',
      puntos: [
        'El Flow Ratio (filament_flow_ratio, modo Advanced) cambia proporcionalmente todo el flujo de extrusión de ese filamento en el G-code.',
        'El material puede tener cambio de volumen al pasar entre fundido y cristalino.',
        'Rango recomendado: entre 0,95 y 1,05. El flow ratio final del objeto es ese valor multiplicado por el flow ratio del filamento.',
      ],
      indicador: 'slicer',
      cuerpo:
        'El Flow Ratio (filament_flow_ratio, modo Advanced) cambia proporcionalmente todo el flujo de extrusión de ese filamento en el G-code; el material puede tener cambio de volumen al pasar entre fundido y cristalino. Rango recomendado: entre 0,95 y 1,05. El flow ratio final del objeto es ese valor multiplicado por el flow ratio del filamento.',
      cuando: { slicer: ['orca', 'bambu'] },
      cifra: { valor: '0,95–1,05', nota: 'rango recomendado de flow ratio (Orca)' },
      cita: { texto: 'Rango recomendado entre 0,95 y 1,05; el flow ratio final es ese valor multiplicado por el del filamento.', fuente: 'OrcaSlicer' },
    },
    {
      id: 'max-vol-no-cero',
      titulo: 'Max Volumetric Speed no puede ser cero',
      puntos: [
        'En OrcaSlicer, el Max Volumetric Speed (filament_max_volumetric_speed) es el volumen de filamento.',
        'Que se puede fundir y extruir por segundo.',
        'La velocidad de impresión se limita a ese valor para evitar atascos, subextrusión o mala adhesión entre capas.',
        'No puede ser cero.',
      ],
      indicador: 'calibracion',
      cuerpo:
        'En OrcaSlicer, el Max Volumetric Speed (filament_max_volumetric_speed) es el volumen de filamento que se puede fundir y extruir por segundo; la velocidad de impresión se limita a ese valor para evitar atascos, subextrusión o mala adhesión entre capas. No puede ser cero.',
      cuando: { slicer: 'orca' },
      cifra: { valor: '> 0 mm³/s', nota: 'límite impuesto por el slicer' },
      cita: { texto: 'Max Volumetric Speed: el volumen de filamento que se puede fundir y extruir por segundo; no puede ser cero.', fuente: 'OrcaSlicer' },
    },
    {
      id: 'adaptive-vol',
      titulo: 'Adaptive volumetric speed (experimental)',
      puntos: [
        'En OrcaSlicer, el Adaptive volumetric speed (filament_adaptive_volumetric_speed.',
        'Modo Developer) es experimental e incompleto (importado de BBS).',
        'Con él habilitado, el flujo se limita por el menor entre el valor ajustado y el máximo definido por el usuario.',
        'Con él deshabilitado, sólo se aplica el máximo del usuario.',
      ],
      indicador: 'slicer',
      cuerpo:
        'En OrcaSlicer, el Adaptive volumetric speed (filament_adaptive_volumetric_speed, modo Developer) es experimental e incompleto (importado de BBS). Con él habilitado, el flujo se limita por el menor entre el valor ajustado y el máximo definido por el usuario; con él deshabilitado, sólo se aplica el máximo del usuario.',
      cuando: { slicer: 'orca' },
      cita: { texto: 'Adaptive volumetric speed es experimental e incompleto; limita por el menor entre el valor ajustado y el máximo del usuario.', fuente: 'OrcaSlicer' },
    },
    {
      id: 'm221-comando',
      titulo: 'M221: Set Flow Percentage (Marlin)',
      puntos: [
        'M221 S<percent> [T<index>] fija el porcentaje de flujo, que se aplica a todos los movimientos del extrusor (E) añadidos al planner.',
        'T<index> selecciona el extrusor en máquinas multieje; por defecto es el extrusor activo.',
        'Es el mismo valor que Prusa llama Flow rate en el menú Tune del firmware.',
        'Marlin no describe calibración en esa página, sólo el comando y sus parámetros.',
      ],
      indicador: 'calibracion',
      cuerpo:
        'M221 S<percent> [T<index>] fija el porcentaje de flujo, que se aplica a todos los movimientos del extrusor (E) añadidos al planner. T<index> selecciona el extrusor en máquinas multieje; por defecto es el extrusor activo. Es el mismo valor que Prusa llama Flow rate en el menú Tune del firmware. Marlin no describe calibración en esa página, sólo el comando y sus parámetros.',
      cuando: { firmware: 'marlin' },
      cifra: { valor: '90–110 %', nota: 'rango habitual del menú Tune' },
      cita: { texto: 'M221 S<percent> [T<index>] fija el porcentaje de flujo aplicado a los movimientos del extrusor.', fuente: 'Marlin Firmware' },
    },
    {
      id: 'presion-concepto',
      titulo: 'Pressure Advance: qué corrige (Anticipación)',
      puntos: [
        'Pressure advance (Klipper; equivalente a Linear Advance en Marlin.',
        'Y documentado también por OrcaSlicer y Duet/RepRap) compensa el retraso de la presión del filamento en la boquilla durante aceleración.',
        'Y deceleración, reduciendo ooze, blobs y extrusión inconsistente, sobre todo en esquinas y movimientos rápidos.',
        'No cambia el tiempo ni la trayectoria del cabezal, ni la cantidad total de filamento extruido.',
        'Sólo añade movimiento del extrusor durante la aceleración/deceleración.',
      ],
      indicador: 'slicer',
      cuerpo:
        'Pressure advance (Klipper; equivalente a Linear Advance en Marlin, y documentado también por OrcaSlicer y Duet/RepRap) compensa el retraso de la presión del filamento en la boquilla durante aceleración y deceleración, reduciendo ooze, blobs y extrusión inconsistente, sobre todo en esquinas y movimientos rápidos. No cambia el tiempo ni la trayectoria del cabezal, ni la cantidad total de filamento extruido: sólo añade movimiento del extrusor durante la aceleración/deceleración.',
      cifra: { valor: 'Sin cambio de tiempo', nota: 'sólo añade movimiento del extrusor' },
      cita: { texto: 'Pressure advance compensa el retraso de presión del filamento en la boquilla durante aceleración y deceleración.', fuente: 'Klipper3d' },
    },
    {
      id: 'pa-dependencia',
      titulo: 'PA depende de todo el montaje',
      puntos: [
        'La PA depende del extrusor, la boquilla y el filamento: un filamento de distinto fabricante o pigmento puede exigir valores muy distintos.',
        'Y conviene calibrarla en cada impresora y con cada bobina.',
        'También la afectan la temperatura de impresión y los caudales de extrusión.',
      ],
      indicador: 'calibracion',
      cuerpo:
        'La PA depende del extrusor, la boquilla y el filamento: un filamento de distinto fabricante o pigmento puede exigir valores muy distintos, y conviene calibrarla en cada impresora y con cada bobina. También la afectan la temperatura de impresión y los caudales de extrusión.',
      cita: { texto: 'PA depende del extrusor, la boquilla y el filamento; un filamento de distinto fabricante o pigmento puede exigir valores muy distintos.', fuente: 'Klipper3d' },
    },
    {
      id: 'pa-rango-klipper',
      titulo: 'Valores típicos de PA (Klipper)',
      puntos: [
        'Valores típicos de pressure advance entre 0,050 y 1,000 (el extremo alto sólo en bowden).',
        'Si no mejora hasta 1,000, es poco probable que ayude: volver a la configuración por defecto con PA deshabilitado.',
      ],
      indicador: 'maquina',
      cuerpo:
        'Valores típicos de pressure advance entre 0,050 y 1,000 (el extremo alto sólo en bowden). Si no mejora hasta 1,000, es poco probable que ayude: volver a la configuración por defecto con PA deshabilitado.',
      cuando: { firmware: 'klipper' },
      cifra: { valor: '0,050–1,000', nota: 'típico de Klipper (alto sólo bowden)' },
      cita: { texto: 'Valores típicos de pressure advance: entre 0,050 y 1,000. Si no mejora hasta 1,000, es poco probable que ayude.', fuente: 'Klipper3d' },
    },
    {
      id: 'pa-alto',
      titulo: 'PA alto: avisos de extrusor',
      puntos: [
        'Si el PA es alto (> 0,200) puede haber saltos del extrusor al volver a la aceleración normal.',
        'Conviene tener la rotation_distance del extrusor y la temperatura de boquilla ya calibradas antes.',
        'Medir con calibre la altura de la mejor calidad; ante la duda, escoger la más baja.',
        'Un PA alto exige mucha adaptación del extrusor durante la acel/decel.',
      ],
      indicador: 'calibracion',
      cuerpo:
        'Si el PA es alto (> 0,200) puede haber saltos del extrusor al volver a la aceleración normal. Conviene tener la rotation_distance del extrusor y la temperatura de boquilla ya calibradas antes. Medir con calibre la altura de la mejor calidad; ante la duda, escoger la más baja. Un PA alto exige mucha adaptación del extrusor durante la acel/decel.',
      cuando: { firmware: 'klipper' },
      cifra: { valor: '> 0,200', nota: 'aviso de PA alto en Klipper' },
      cita: { texto: 'Si el PA es alto (> 0,200) puede haber saltos del extrusor al volver a la aceleración normal.', fuente: 'Klipper3d' },
    },
    {
      id: 'pa-ensayo-klipper',
      titulo: 'Ensayo de PA en Klipper',
      puntos: [
        'En Klipper se activa con pressure_advance = <valor> en [extruder] y un RESTART.',
        'El ensayo usa una torre hueca (cuadrado hueco, square_tower.stl), velocidad alta (≈ 100 mm/s).',
        'Relleno cero y capa gruesa (≈ 75 % del diámetro de boquilla).',
        'Desactivar en el slicer "dynamic acceleration control" y costuras "scarf joint".',
        'Comandos base: SET_VELOCITY_LIMIT SQUARE_CORNER_VELOCITY=1 ACCEL=500.',
        'Direct drive TUNING_TOWER COMMAND=SET_PRESSURE_ADVANCE PARAMETER=ADVANCE START=0 FACTOR=.005; bowden largo FACTOR=.020.',
        'Cálculo: PA = start + altura medida × factor.',
      ],
      indicador: 'slicer',
      cuerpo:
        'En Klipper se activa con pressure_advance = <valor> en [extruder] y un RESTART. El ensayo usa una torre hueca (cuadrado hueco, square_tower.stl), velocidad alta (≈ 100 mm/s), relleno cero y capa gruesa (≈ 75 % del diámetro de boquilla). Desactivar en el slicer "dynamic acceleration control" y costuras "scarf joint". Comandos base: SET_VELOCITY_LIMIT SQUARE_CORNER_VELOCITY=1 ACCEL=500; direct drive TUNING_TOWER COMMAND=SET_PRESSURE_ADVANCE PARAMETER=ADVANCE START=0 FACTOR=.005; bowden largo FACTOR=.020. Cálculo: PA = start + altura medida × factor.',
      cuando: { firmware: 'klipper' },
      cifra: { valor: 'FACTOR .005 / .020', nota: 'Klipper: FACTOR por tipo de extrusor' },
      cita: { texto: 'SET_VELOCITY_LIMIT SQUARE_CORNER_VELOCITY=1 ACCEL=500; TUNING_TOWER ... FACTOR=.005 (direct) o .020 (bowden). PA = start + altura × factor.', fuente: 'Klipper3d' },
    },
    {
      id: 'linear-advance',
      titulo: 'Linear Advance en Marlin (Anticipación)',
      puntos: [
        'LIN_ADVANCE desacopla la extrusión de los ejes XYZ para controlar la presión del material dentro de la boquilla en función de la velocidad.',
        'De impresión; reduce material extra al final de cada movimiento y sangrado en esquinas.',
        'Mejora la precisión dimensional y permite velocidades más altas sin perder calidad.',
        'En v1.5, K pasa a tener unidades significativas (mm de compresión por mm/s de velocidad de extrusión.',
        'Mm/mm/s); valores típicos de K alrededor de 0,1–2,0 (frente a 30–130 en v1.0).',
        'Necesita recalibrar K al cambiar de versión.',
      ],
      indicador: 'calibracion',
      cuerpo:
        'LIN_ADVANCE desacopla la extrusión de los ejes XYZ para controlar la presión del material dentro de la boquilla en función de la velocidad de impresión; reduce material extra al final de cada movimiento y sangrado en esquinas. Mejora la precisión dimensional y permite velocidades más altas sin perder calidad. En v1.5, K pasa a tener unidades significativas (mm de compresión por mm/s de velocidad de extrusión, mm/mm/s); valores típicos de K alrededor de 0,1–2,0 (frente a 30–130 en v1.0). Necesita recalibrar K al cambiar de versión.',
      cuando: { firmware: 'marlin' },
      cifra: { valor: '0,1–2,0 (v1,5)', nota: 'Marlin K v1.5' },
      cita: { texto: 'LIN_ADVANCE v1.5: K típico 0,1–2,0; v1.0: 30–130. Recalibrar al cambiar de versión.', fuente: 'Marlin Firmware' },
    },
    {
      id: 'k-bowden',
      titulo: 'Bowden necesita K más alto',
      puntos: [
        'Los extrusores bowden necesitan un K más alto que los directos.',
        'Rangos orientativos de K para bowden: ≈ 0,1 hasta ≈ 2,0 (v1.5) o ≈ 30 hasta ≈ 130 (v1.0).',
        'El mejor K depende del tipo de filamento (los muy flexibles como Ninjaflex pueden no funcionar).',
        'Temperatura de impresión, características del extrusor (directo vs. bowden, longitud, holguras) y geometría de boquilla.',
        'El steps/mm del extrusor debe estar calibrado con precisión y hay que repetir la calibración si cambia alguno de esos parámetros.',
      ],
      indicador: 'calibracion',
      cuerpo:
        'Los extrusores bowden necesitan un K más alto que los directos. Rangos orientativos de K para bowden: ≈ 0,1 hasta ≈ 2,0 (v1.5) o ≈ 30 hasta ≈ 130 (v1.0). El mejor K depende del tipo de filamento (los muy flexibles como Ninjaflex pueden no funcionar), temperatura de impresión, características del extrusor (directo vs. bowden, longitud, holguras) y geometría de boquilla. El steps/mm del extrusor debe estar calibrado con precisión y hay que repetir la calibración si cambia alguno de esos parámetros.',
      cuando: { extrusor: 'bowden' },
      cifra: { valor: 'v1,5: 0,1–2,0', nota: 'Marlin K en bowden (v1.5)' },
      cita: { texto: 'Los extrusores bowden necesitan un K más alto que los directos; K depende de filamento, temperatura, extrusor y boquilla.', fuente: 'Marlin Firmware' },
    },
    {
      id: 'k-calibracion',
      titulo: 'Patrón de calibración K-Factor (Marlin)',
      puntos: [
        'Generar G-code con el generador de Marlin.',
        'Cada línea: 20 mm de extrusión a velocidad lenta, luego 40 mm a velocidad rápida y 20 mm a velocidad lenta.',
        'El K aumenta por pasos (K-Factor Stepping).',
        'Demasiado bajo da presión atrasada al acelerar (línea "starved") y exceso al decelerar (blob).',
        'Demasiado alto da exceso al arrancar y hambre al decelerar; la línea con transición fluida y apenas visible es la óptima.',
      ],
      indicador: 'calibracion',
      cuerpo:
        'Generar G-code con el generador de Marlin. Cada línea: 20 mm de extrusión a velocidad lenta, luego 40 mm a velocidad rápida y 20 mm a velocidad lenta. El K aumenta por pasos (K-Factor Stepping). Demasiado bajo da presión atrasada al acelerar (línea "starved") y exceso al decelerar (blob); demasiado alto da exceso al arrancar y hambre al decelerar; la línea con transición fluida y apenas visible es la óptima.',
      cuando: { firmware: 'marlin' },
      cifra: { valor: '20/40/20 mm', nota: 'patrón lento/rápido/lento' },
      cita: { texto: 'Cada línea: 20 mm lento, 40 mm rápido, 20 mm lento; K aumenta por pasos.', fuente: 'Marlin Firmware' },
    },
    {
      id: 'pa-orca',
      titulo: 'PA por filamento en OrcaSlicer',
      puntos: [
        'En OrcaSlicer, el PA del material (enable_pressure_advance.',
        'Pressure_advance float, modos Simple/Advanced) habilitado sobrescribe el resultado de la auto-calibración.',
        'Y sirve para compensar el retraso de presión.',
        'Reduciendo blobs, ooze y extrusión inconsistente.',
        'Adaptive Pressure Advance (beta, adaptive_pressure_advance) asume.',
        'Que con velocidades/caudales/aceleraciones crecientes el PA efectivo típicamente disminuye.',
        'Así que un solo valor de PA suele no ser óptimo para todos los elementos.',
        'El slicer modela la respuesta del sistema y emite el PA calculado según las condiciones.',
        'Al habilitarlo, el valor fijo de PA se sobrescribe; se recomienda un valor fijo razonable como respaldo y para cambios de herramienta.',
      ],
      indicador: 'calibracion',
      cuerpo:
        'En OrcaSlicer, el PA del material (enable_pressure_advance, pressure_advance float, modos Simple/Advanced) habilitado sobrescribe el resultado de la auto-calibración y sirve para compensar el retraso de presión, reduciendo blobs, ooze y extrusión inconsistente. Adaptive Pressure Advance (beta, adaptive_pressure_advance) asume que con velocidades/caudales/aceleraciones crecientes el PA efectivo típicamente disminuye, así que un solo valor de PA suele no ser óptimo para todos los elementos; el slicer modela la respuesta del sistema y emite el PA calculado según las condiciones. Al habilitarlo, el valor fijo de PA se sobrescribe; se recomienda un valor fijo razonable como respaldo y para cambios de herramienta.',
      cuando: { slicer: 'orca' },
      cita: { texto: 'PA por filamento sobrescribe la auto-calibración; Adaptive PA (beta) modela la respuesta del extrusor y sobrescribe el valor fijo.', fuente: 'OrcaSlicer' },
    },
    {
      id: 'adaptive-pa-medidas',
      titulo: 'Mediciones para Adaptive PA (beta)',
      puntos: [
        'Adaptive Pressure Advance para voladizos (adaptive_pressure_advance_overhangs.',
        'Beta) y PA para puentes (adaptive_pressure_advance_bridges) son opcionales.',
        'Un PA más bajo en puentes ayuda a reducir la subextrusión leve justo después del puente (caída de presión al imprimir en el aire).',
        'Poner 0 desactiva. Las mediciones son tripletes "PA, FLOW, ACCELERATION", uno por línea (ej.',
        '0,04, 3,96, 3000).',
        'Calibrar ejecutando la prueba de PA en al menos 3 velocidades por valor de aceleración, para la aceleración mínima y la máxima.',
        'Y no superar la aceleración máxima recomendada por el input shaper de Klipper.',
        'El PA ideal debe disminuir al aumentar el caudal volumétrico; si no, revisar el extrusor o usar el valor de la prueba más rápida.',
      ],
      indicador: 'calibracion',
      cuerpo:
        'Adaptive Pressure Advance para voladizos (adaptive_pressure_advance_overhangs, beta) y PA para puentes (adaptive_pressure_advance_bridges) son opcionales: un PA más bajo en puentes ayuda a reducir la subextrusión leve justo después del puente (caída de presión al imprimir en el aire); poner 0 desactiva. Las mediciones son tripletes "PA, FLOW, ACCELERATION", uno por línea (ej. 0,04, 3,96, 3000). Calibrar ejecutando la prueba de PA en al menos 3 velocidades por valor de aceleración, para la aceleración mínima y la máxima, y no superar la aceleración máxima recomendada por el input shaper de Klipper. El PA ideal debe disminuir al aumentar el caudal volumétrico; si no, revisar el extrusor o usar el valor de la prueba más rápida.',
      cuando: { slicer: 'orca' },
      cita: { texto: 'Mediciones: tripletes PA, FLOW, ACCELERATION; al menos 3 velocidades por aceleración; el PA ideal debe disminuir al aumentar el caudal.', fuente: 'OrcaSlicer' },
    },
    {
      id: 'tpu-composites',
      titulo: 'TPU y composites: flujo más conservador',
      puntos: [
        'TPU es flexible y viscoso, y los composites (PLA-CF, PETG-CF)\npueden ser abrasivos y exigir boquilla endurecida.',
        'En ambos casos la\ncalibración por paredes interiores es la que mejor funciona.',
        'Porque la\nviscosidad y la abrasión no se capturan bien con el método visual por\ncapa superior.',
      ],
      indicador: 'calibracion',
      cuerpo:
        'TPU es flexible y viscoso, y los composites (PLA-CF, PETG-CF)\npueden ser abrasivos y exigir boquilla endurecida. En ambos casos la\ncalibración por paredes interiores es la que mejor funciona, porque la\nviscosidad y la abrasión no se capturan bien con el método visual por\ncapa superior.',
      cuando: { material: ['tpu', 'pla-cf'] },
      enlaza: { guia: 'temperatura-hotend', etiqueta: 'Ver temperatura de boquilla' },
    },
    {
      id: 'bambu-auto-notas',
      titulo: 'Auto Flow Rate en Bambu Studio',
      puntos: [
        'Bambu Studio Auto Flow Rate Calibration usa Micro-Lidar que mide directamente los patrones.',
        'Puede fallar con filamentos transparentes o semitransparentes, con partículas brillantes o de acabado muy reflectante.',
        'Los resultados varían entre calibración y filamento; se sigue mejorando con actualizaciones de firmware.',
        'La calibración manual puede ser precisa si se sigue el procedimiento.',
        'Sólo disponible en la serie X1; con OTA 01.06.00.00 sólo se soporta boquilla 0,4 mm.',
      ],
      indicador: 'calibracion',
      cuerpo:
        'Bambu Studio Auto Flow Rate Calibration usa Micro-Lidar que mide directamente los patrones; puede fallar con filamentos transparentes o semitransparentes, con partículas brillantes o de acabado muy reflectante. Los resultados varían entre calibración y filamento; se sigue mejorando con actualizaciones de firmware. La calibración manual puede ser precisa si se sigue el procedimiento. Sólo disponible en la serie X1; con OTA 01.06.00.00 sólo se soporta boquilla 0,4 mm.',
      cuando: { slicer: 'bambu' },
      cifra: { valor: 'sólo 0,4 mm', nota: 'Bambu auto con OTA 01.06.00.00' },
      cita: { texto: 'Auto Flow Rate Calibration usa Micro-Lidar; puede fallar con filamentos transparentes o reflectantes; con OTA 01.06.00.00 sólo boquilla 0,4 mm.', fuente: 'Bambu Lab' },
    },
    {
      id: 'bambu-manual-notas',
      titulo: 'Calibración manual en Bambu Studio',
      puntos: [
        'Modos manual: gruesa (coarse) con valores de flujo entre 80 % y 120 % sobre el flow ratio del preset.',
        'Paso del 5 %; útil cuando no se sabe el rango.',
        'Fina (fine) con valores entre 91 % y 100 % sobre un flow ratio personalizado.',
        'Paso del 1 %; útil si el rango ya se conoce con un margen < 10 %.',
        'Complete Calibration encadena coarse y luego, opcionalmente, fine; Fine basada en Flow Ratio hace sólo la fina.',
        'Tras imprimir, el bloque más liso decide (ejemplo de la fuente: entre muestras −5 a +5, la muestra +5 fue la más lisa.',
        'Flow rate 0,997500; en la fina, evitar muestras con subextrusión leve y conformarse con 0).',
      ],
      indicador: 'calibracion',
      cuerpo:
        'Modos manual: gruesa (coarse) con valores de flujo entre 80 % y 120 % sobre el flow ratio del preset, paso del 5 %; útil cuando no se sabe el rango. Fina (fine) con valores entre 91 % y 100 % sobre un flow ratio personalizado, paso del 1 %; útil si el rango ya se conoce con un margen < 10 %. Complete Calibration encadena coarse y luego, opcionalmente, fine; Fine basada en Flow Ratio hace sólo la fina. Tras imprimir, el bloque más liso decide (ejemplo de la fuente: entre muestras −5 a +5, la muestra +5 fue la más lisa, flow rate 0,997500; en la fina, evitar muestras con subextrusión leve y conformarse con 0).',
      cuando: { slicer: 'bambu' },
      cifra: { valor: '80–120 % / 91–100 %', nota: 'coarse paso 5 %, fine paso 1 % (Bambu)' },
      cita: { texto: 'Manual coarse: 80–120 %, paso 5 %; fine: 91–100 %, paso 1 %.', fuente: 'Bambu Lab' },
    },
    {
      id: 'advertencia-bambu-orca',
      titulo: 'Bambu Lab: no mezclar ecosistemas de calibración',
      puntos: [
        'OrcaSlicer avisa a los usuarios de Bambu Lab: no seleccionar la opción "Flow calibration" en OrcaSlicer.',
        'Bambu Studio tiene su propio flujo (Micro-Lidar, bloques por porcentaje) que no es el de OrcaSlicer (modificadores de flow ratio.',
        'Patrones Archimedean). Usar uno en el ecosistema del otro no está soportado por ninguna de las dos fuentes.',
      ],
      indicador: 'calibracion',
      cuerpo:
        'OrcaSlicer avisa a los usuarios de Bambu Lab: no seleccionar la opción "Flow calibration" en OrcaSlicer. Bambu Studio tiene su propio flujo (Micro-Lidar, bloques por porcentaje) que no es el de OrcaSlicer (modificadores de flow ratio, patrones Archimedean). Usar uno en el ecosistema del otro no está soportado por ninguna de las dos fuentes.',
      cuando: { slicer: ['bambu', 'orca'] },
      cita: { texto: 'OrcaSlicer avisa: en impresoras Bambu Lab no seleccionar la opción Flow calibration.', fuente: 'OrcaSlicer' },
    },
    {
      id: 'flow-dynamics-previo',
      titulo: 'Flow Dynamics antes del Flow Rate (Bambu)',
      puntos: [
        'El flow rate requiere otras calibraciones previas (Flow Dynamics) antes de tocarlo.',
        'Síntomas que lo justifican (tras hacer las demás calibraciones): sobreextrusión (blobs/zits, capas gruesas).',
        'Subextrusión (capas que faltan, relleno débil, huecos), mala calidad superficial y poca resistencia.',
        'También útil para materiales espumosos como LW-PLA.',
      ],
      indicador: 'calibracion',
      cuerpo:
        'El flow rate requiere otras calibraciones previas (Flow Dynamics) antes de tocarlo. Síntomas que lo justifican (tras hacer las demás calibraciones): sobreextrusión (blobs/zits, capas gruesas), subextrusión (capas que faltan, relleno débil, huecos), mala calidad superficial y poca resistencia. También útil para materiales espumosos como LW-PLA.',
      cuando: { slicer: 'bambu' },
      enlaza: { guia: 'separaciones-entre-capas', etiqueta: 'Ver separación entre capas' },
    },
    {
      id: 'abrir-por-dentro',
      titulo: 'Cuándo la temperatura no es el ajuste',
      puntos: [
        'Si el corte sale con material arrancado, no llegó filamento suficiente: es un problema de flujo, y subir la temperatura lo empeora.',
        'Subextrusión leve se ve como huecos entre líneas de capa o perímetros.',
        'El ajuste que corresponde es de flow; no de temperatura de cama.',
      ],
      indicador: 'cama',
      cuerpo:
        'Si el corte sale con material arrancado, no llegó filamento suficiente: es un problema de flujo, y subir la temperatura lo empeora. Subextrusión leve se ve como huecos entre líneas de capa o perímetros. El ajuste que corresponde es de flow; no de temperatura de cama.',
      enlaza: { guia: 'temperatura-hotend', etiqueta: 'Ver temperatura de hotend' },
    },
  ],

  reglas: [
    {
      id: 'medir-preciso',
      accion: 'Calibra el Extrusion Multiplier midiendo la pared de un cubo en Vase Mode',
      valor: 'EM = 0,45 / espesor medio medido',
      porque:
        'Método de Prusa: cubo en vaso a la altura de capa más usada; tres o más medidas en medio de cada pared. Reimprime con el valor nuevo. Las calibradoras baratas fallan con una sola pared de perímetro.',
      cuando: { slicer: 'prusa' },
      fuente: 'Prusa Research',
      alcance:
        'Es el método preciso de Prusa, el contrario del visual: pide altura de capa habitual y ancho de extrusión 0,45 del preset base, y el espesor medio de las tres o más medidas es lo que divide ese 0,45.',
    },
    {
      id: 'visual-pla',
      accion: 'Ajusta por ojo el PLA a 0,20 mm: capa superior lisa y brillante, sin material junto a los perímetros',
      valor: 'sube o baja el EM en 1–2 % por iteración',
      porque:
        'Método visual de Prusa: cubo con los presets de PLA a 0,20 mm de capa. Sobra material junto a los perímetros, baja el EM; huecos entre líneas, súbelo. Los huecos microscópicos son aceptables.',
      cuando: { slicer: 'prusa', material: 'pla' },
      fuente: 'Prusa Research',
      alcance: 'Aplica a PLA con preset base. Sobre/subextrusión también diagnostica defectos.',
    },
    {
      id: 'em-default',
      accion: 'Parte de un Extrusion Multiplier de 1 para PLA, ABS o PETG',
      valor: '1 (100 %)',
      porque:
        'Es el valor por defecto del preset base prusiano y el punto de partida documentado antes de calibrar.',
      cuando: { slicer: 'prusa', material: ['pla', 'petg', 'abs'] },
      fuente: 'Prusa Research',
      alcance: 'Sólo el preset base (boquilla 0,4, capa 0,1–0,2).',
    },
    {
      id: 'empieza-defecto',
      accion: 'Sube el multiplicador si hay huecos, bájalo si hay blobs o solape',
      valor: '1–2 % por iteración',
      porque:
        'La dirección del ajuste depende de si falta o sobra material: subextrusión leve, huecos entre líneas o perímetros; sobreextrusión, marcas en capas inferiores y acumulación en las superiores.',
      cuando: { defecto: ['sub', 'sobre'] },
      fuente: 'Prusa Research, Bambu Lab',
      alcance: 'Los valores de iteración salen del método visual de Prusa; Bambu describe el mismo síntoma sin cifra de paso.',
    },
    {
      id: 'm221-averia',
      accion: 'Usa M221 sólo como ajuste temporal durante la impresión',
      valor: '90–110 % habitual; M221 S150 = 150 %',
      porque:
        'M221 S<percent> fija el porcentaje de flujo de los movimientos del extrusor; T<index> elige extrusor en multieje. No cambia el Extrusion Multiplier del slicer: el efecto total es el producto.',
      cuando: { firmware: ['marlin'] },
      fuente: 'Marlin Firmware, Prusa Research',
      alcance: 'M221 es el mismo valor que Prusa llama Flow rate en Tune; Marlin sólo documenta el comando, no una calibración.',
    },
    {
      id: 'bambu-previo',
      accion: 'Haz primero otras calibraciones (Flow Dynamics) antes de tocar el Flow Rate',
      porque:
        'El flow rate requiere calibraciones previas. Conviene filamento seco, boquilla limpia, extrusor limpio y chapa lavada antes de empezar, y no calibrar con extrusor sucio ni boquilla semitapada.',
      cuando: { slicer: 'bambu' },
      fuente: 'Bambu Lab',
      alcance: 'Flow Dynamics no está documentado en este lote; sólo se cita como paso previo.',
    },
    {
      id: 'bambu-auto',
      accion: 'Usa Auto Flow Rate Calibration si tu impresora es serie X1',
      valor: 'sólo boquilla 0,4 mm con OTA 01.06.00.00',
      porque:
        'Auto mide los patrones con Micro-Lidar. Con AMS se sincroniza la lista de filamentos desde el AMS; tras imprimir, botón Next y guardar el resultado en un preset nuevo de filamento.',
      cuando: { slicer: 'bambu', boquilla: '04' },
      fuente: 'Bambu Lab',
      alcance:
        'Auto sólo está disponible en serie X1; el corpus no dice si otras series soportan boquillas distintas. Para sobrescribir el preset original hay que darle el mismo nombre que el calibrado; el menú es Calibration > Flow Rate > Auto-Calibration.',
    },
    {
      id: 'bambu-coarse',
      accion: 'Lanza la calibración gruesa si no se conoce el rango',
      valor: '80–120 %, paso 5 %',
      porque:
        'Útil cuando no se sabe el rango; imprime bloques de 80 a 120 % sobre el flow ratio del preset y juzga a ojo el más liso.',
      cuando: { slicer: 'bambu' },
      fuente: 'Bambu Lab',
      alcance: 'Sobre el flow ratio del preset, no un valor absoluto.',
    },
    {
      id: 'bambu-fine',
      accion: 'Lanza la calibración fina si el rango ya se conoce con margen < 10 %',
      valor: '91–100 %, paso 1 %',
      porque:
        'Fina sobre un flow ratio personalizado; útil si el rango se conoce con margen < 10 %. Complete Calibration encadena gruesa y luego, opcionalmente, fina; la variante por Flow Ratio hace sólo la fina.',
      cuando: { slicer: 'bambu' },
      fuente: 'Bambu Lab',
      alcance: 'No mezclar con el flujo de calibración de OrcaSlicer.',
    },
    {
      id: 'orca-flow-ratio',
      accion: 'Deja el Flow Ratio de OrcaSlicer entre 0,95 y 1,05',
      valor: '0,95–1,05',
      porque:
        'El Flow Ratio cambia proporcionalmente todo el flujo de extrusión de ese filamento en el G-code. El flow ratio final del objeto es ese valor multiplicado por el flow ratio del filamento.',
      cuando: { slicer: 'orca' },
      fuente: 'OrcaSlicer',
      alcance: 'El material puede tener cambio de volumen entre estados fundido y cristalino.',
    },
    {
      id: 'orca-yolo',
      accion: 'Calcula el nuevo Flow Ratio con YOLO: OldFlowRatio ± modifier',
      valor: 'rango [-0,05, +0,05], paso 0,01 (Perfectionist [-0,04, +0,035], 0,005)',
      porque:
        'Pase único: OldFlowRatio ± modifier; 11 bloques, y se elige el de superficie más lisa, sin huecos y con la línea más fina entre la espiral interior y los arcos exteriores.',
      cuando: { slicer: 'orca' },
      fuente: 'OrcaSlicer',
      alcance:
        'YOLO es el recomendado; el legacy se mantiene: uno suma/resta absoluto y el otro escala porcentualmente, con OldFlowRatio × (100 + modifier) / 100. Patrón recomendado: Archimedean Chords, que imprime la espiral interior al final para comprobar la acumulación.',
    },
    {
      id: 'orca-maxvol-calc',
      accion: 'Calibra el Max Volumetric Speed midiendo la altura justo antes de los defectos',
      valor: '5 mm³/s inicio, 20 mm³/s fin, paso 0,5 (ej. 5 + 19 × 0,5 = 14,5 mm³/s)',
      porque:
        'Si subes velocidad o caudal, sube antes la boquilla (torre de temperatura). El cambio de brillo brillante↔mate es la pista: mide la altura justo antes de los fallos. En Preview se verifica.',
      cuando: { slicer: 'orca' },
      fuente: 'OrcaSlicer',
      alcance:
        'La prueba es el mejor caso: no tiene en cuenta retracciones ni otros ajustes. Verificar el corte físico. El valor depende de material, máquina, diámetro de boquilla y montaje del extrusor: se calibra por impresora y por filamento, y dentro de un mismo tipo (PLA) también afectan la marca y el color. La fórmula es inicio + altura × paso.',
    },
    {
      id: 'orca-maxvol-seguridad',
      accion: 'Reduce el valor calculado un 10–20 %, o más, por seguridad',
      valor: '-10 a -20 %',
      porque:
        'La prueba de caudal volumétrico es el mejor caso: no cuenta retracciones ni otros ajustes que aumentan atascos o subextrusión. Imprimir a alto caudal puede dar mala adhesión entre capas.',
      cuando: { slicer: 'orca' },
      fuente: 'OrcaSlicer',
      alcance: 'No es una pérdida de rendimiento: es el margen frente a retracciones y cambios de caudal.',
    },
    {
      id: 'orca-adaptive-vol',
      accion: 'No uses Adaptive volumetric speed como ajuste definitivo',
      porque:
        'Es experimental e incompleto (importado de BBS): con él habilitado, el flujo se limita por el menor entre el valor ajustado y el máximo del usuario; deshabilitado, sólo aplica el máximo del usuario.',
      cuando: { slicer: 'orca' },
      fuente: 'OrcaSlicer',
      alcance: 'Puede usarse como complemento, no como sustituto del valor medido.',
    },
    {
      id: 'orca-pa-filamento',
      accion: 'Habilita Pressure advance por filamento si hay blobs o ooze',
      valor: 'pressure_advance (float)',
      porque:
        'Compensa el retraso de presión en accel/decel y reduce blobs, ooze y extrusión inconsistente; habilitado sobrescribe la auto-calibración. Conviene un valor fijo de respaldo al cambiar de herramienta.',
      cuando: { slicer: 'orca' },
      fuente: 'OrcaSlicer',
      alcance: 'Adaptive PA afirma que un PA único suele no ser óptimo a altas velocidades; no da un modelo cerrado ni valores publicados.',
    },
    {
      id: 'orca-adaptive-pa-calib',
      accion: 'Si activas Adaptive PA, mide al menos 3 velocidades por aceleración',
      valor: 'tripletes PA, FLOW, ACCELERATION',
      porque:
        'La prueba de PA necesita al menos 3 velocidades por valor de aceleración (perímetros exteriores, interiores y la feature más rápida), sin superar la del input shaper de Klipper.',
      cuando: { slicer: 'orca' },
      fuente: 'OrcaSlicer',
      alcance:
        'Formato de medición 0,04, 3,96, 3000 por línea. El PA ideal debe disminuir al aumentar el caudal: si no, revisa el extrusor.',
    },
    {
      id: 'klipper-activar-pa',
      accion: 'Activa pressure_advance en [extruder] y reinicia',
      valor: 'pressure_advance = <valor>; RESTART',
      porque:
        'Compensa la presión en accel/decel: calibra antes rotation_distance y la temperatura. Con un PA alto puede ser útil combinar retracción ≈ 0,75 mm y "wipe on retract"; desactiva "z-lift on retract".',
      cuando: { firmware: 'klipper' },
      fuente: 'Klipper3d',
      alcance:
        'La temperatura de la que habla la fuente es la de boquilla, y «z-lift on retract» es una opción del slicer. Los ≈ 0,75 mm son sólo de Klipper; no hay corroboración cruzada.',
    },
    {
      id: 'klipper-tuning-tower',
      accion: 'Calibra PA con torre hueca y TUNING_TOWER',
      valor: 'direct drive FACTOR=.005; bowden largo FACTOR=.020; PA = 0 + altura × factor',
      porque:
        'Prepara: SET_VELOCITY_LIMIT SQUARE_CORNER_VELOCITY=1 ACCEL=500. Torre hueca, ≈ 100 mm/s, relleno cero y capa gruesa (75 % del diámetro de boquilla). Mide con calibre la altura de la mejor calidad.',
      cuando: { firmware: 'klipper', extrusor: ['directo', 'bowden', 'desconocido'] },
      fuente: 'Klipper3d',
      alcance: 'El FACTOR documentado es .005 para direct drive y .020 para bowden largo; no se traduce a la escala de Marlin.',
    },
    {
      id: 'klipper-volver-default',
      accion: 'Vuelve al valor por defecto sin PA si no mejora hasta 1.000',
      valor: '0,050–1,000',
      porque:
        'Valores típicos de pressure advance entre 0,050 y 1,000 (extremo alto sólo bowden). Si no mejora hasta 1,000, es poco probable que ayude.',
      cuando: { firmware: 'klipper' },
      fuente: 'Klipper3d',
      alcance: 'También si el PA alto (> 0,200) provoca saltos del extrusor al volver a aceleración normal.',
    },
    {
      id: 'marlin-la-enable',
      accion: 'Compila con LIN_ADVANCE y fija K por M900 en el start script',
      valor: 'K típico 0,1–2,0 (v1,5)',
      porque:
        'Compila con #define LIN_ADVANCE y #define LIN_ADVANCE_K <valor> en Configuration_adv.h; con un solo material, fija ahí el mejor K. Alternativa: M900 Kxx en el script de inicio, con LIN_ADVANCE_K a 0.',
      cuando: { firmware: 'marlin' },
      fuente: 'Marlin Firmware',
      alcance:
        'Los scripts son individuales por impresora y gusto personal; el firmware debe tener la funcionalidad activa. Las rutas del script de inicio son Cura: Machine Settings; Slic3r: Custom G-code; Simplify3D: Scripts → Custom G-code, y son nombres de menú que pueden cambiar con la versión del slicer.',
    },
    {
      id: 'marlin-kfactor-calib',
      accion: 'Calibra K con patrón 20/40/20 mm y K-Factor Stepping',
      valor: '20/40/20 mm',
      porque:
        'Cada línea: 20 mm lenta, 40 mm rápida, 20 mm lenta; el K sube por pasos. Si el jerk limita la aceleración, las opciones son subir el jerk, bajar la aceleración o el K, o acortar el bowden.',
      cuando: { firmware: 'marlin' },
      fuente: 'Marlin Firmware',
      alcance:
        'LIN_ADVANCE en Marlin v1.5: K en mm/mm/s. En v1.0 son 30–130. El límite del jerk del extrusor que reduce la aceleración es cosa de la v1.5.',
    },
    {
      id: 'marlin-desactivar-presion',
      accion: 'Desactiva en el slicer Coast at end, extra restart length y wipe while retract',
      porque:
        'Interfieren con Linear Advance, que controla la presión; las otras tocan la extrusión al final. Desactiva "wipe while retract" y "combing"; la retracción puede ser 0. K = 0 desactiva el avance.',
      cuando: { firmware: 'marlin' },
      fuente: 'Marlin Firmware',
      alcance: 'Configurar K mediante start script sigue requiriendo la funcionalidad activa en firmware.',
    },
    {
      id: 'recalibrar-montaje',
      accion: 'Recalibra el flujo si cambias material, boquilla, extrusor o temperatura',
      porque:
        'La PA y el caudal volumétrico dependen del extrusor, la boquilla y el filamento; la PA también de la temperatura y del caudal. Lo que cambia el montaje cambia el valor calibrado.',
      fuente: 'Klipper3d, Marlin Firmware, OrcaSlicer',
      alcance: 'Cada firmware calibra con su propio patrón; ver las fuentes para los rangos.',
    },
    {
      id: 'orcaslicer-bambu',
      accion: 'En impresoras Bambu Lab con OrcaSlicer, no selecciones "Flow calibration"',
      porque:
        'OrcaSlicer avisa específicamente: el flujo de calibración de Bambu Studio (Micro-Lidar) no es el de OrcaSlicer (modificadores de flow ratio, patrones Archimedean), y mezclarlos no está soportado.',
      fuente: 'OrcaSlicer',
      alcance: 'Aviso de una fuente cruzada sobre el ecosistema Bambu.',
    },
  ],

  fueraDeAlcance: [
    {
      sintoma: 'Las esquinas se levantan de la cama',
      porQue: 'Es warping: contracción térmica en los exteriores. El diagnóstico y la cifra de cama son otros.',
      guia: 'warping-pla',
    },
    {
      sintoma: 'Las capas se sueltan por dentro',
      porQue: 'Es separación entre capas: la unión falla y no es cantidad de material. Se arregla con temperatura y enfriamiento.',
      guia: 'separaciones-entre-capas',
    },
    {
      sintoma: 'La pieza ha salido corrida de su sitio',
      porQue: 'Es desplazamiento de capa: la unión está intacta y el hotend no fue donde debía.',
      guia: 'capas-desplazadas',
    },
    {
      sintoma: 'Obstrucción, clog o retracción excesiva',
      porQue: 'La retracción y la obstrucción no están cubiertas aquí: afectan al flujo pero su ajuste es de temperatura y de limpieza de la boquilla.',
      guia: 'temperatura-hotend',
    },
  ],

  fuentes: [
    {
      url: 'https://help.prusa3d.com/article/extrusion-multiplier-calibration_2257',
      quien: 'Prusa Research',
      que: 'Extrusion Multiplier: definición, métodos preciso/visual, presets y rangos.',
    },
    {
      url: 'https://wiki.bambulab.com/en/software/bambu-studio/calibration_flow_rate',
      quien: 'Bambu Lab',
      que: 'Flow Rate: auto/manual, coarse/fine, precauciones y Flow Dynamics.',
    },
    {
      url: 'https://wiki.bambulab.com/en/software/bambu-studio/view-slicing-information',
      quien: 'Bambu Lab',
      que: 'Flow en Bambu Studio: caudal volumétrico máximo.',
    },
    {
      url: 'https://github.com/OrcaSlicer/OrcaSlicer/wiki/material_flow_ratio_and_pressure_advance',
      quien: 'OrcaSlicer',
      que: 'Flow Ratio, Max Volumetric Speed (limitación) y Pressure Advance.',
    },
    {
      url: 'https://github.com/OrcaSlicer/OrcaSlicer/wiki/flow_ratio_calib',
      quien: 'OrcaSlicer',
      que: 'Calibración de Flow Ratio: YOLO y 2-pass (legado).',
    },
    {
      url: 'https://github.com/OrcaSlicer/OrcaSlicer/wiki/volumetric_speed_calib',
      quien: 'OrcaSlicer',
      que: 'Calibración de Max Volumetric Speed por altura medida.',
    },
    {
      url: 'https://www.klipper3d.org/Pressure_Advance.html',
      quien: 'Klipper3d',
      que: 'Pressure Advance: concepto, ensayo, FACTOR y valores típicos.',
    },
    {
      url: 'https://marlinfw.org/docs/features/lin_advance.html',
      quien: 'Marlin Firmware',
      que: 'Linear Advance: K, calibración y activación.',
    },
    {
      url: 'https://marlinfw.org/docs/gcode/M221.html',
      quien: 'Marlin Firmware',
      que: 'M221: Set Flow Percentage.',
    },
    {
      url: 'https://github.com/OrcaSlicer/OrcaSlicer/wiki/material_volumetric_speed_limitation',
      quien: 'OrcaSlicer',
      que: 'Max Volumetric Speed: no puede ser cero y efecto de aditivos de filamento.',
    },
  ],

  campos: [],
  leeDelAnalisis: ['material'],
};