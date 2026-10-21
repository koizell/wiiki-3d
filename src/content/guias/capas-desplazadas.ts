import type { Guia } from './tipos';
import { AUTOR } from './autor.ts';

/**
 * Capas desplazadas.
 *
 * Lo que aquí produce movimiento real es el hotend yendo a un sitio donde no
 * debía: la pieza sale corrida, pero la unión entre capas se conserva. Las
 * causas son eléctricas/firmware (pérdida de pasos, corriente del TMC, modo
 * de chopper, tensión de fuente) o mecánicas (correas/poleas, ya en
 * `separaciones-entre-capas.md`).
 */
export const capasDesplazadas: Guia = {
  slug: 'capas-desplazadas',
  titulo: 'Capas desplazadas',
  resumen:
    'El bloque está bien pegado pero ha salido corrido. Antes de tocar temperatura, se descarta que sea separación o warping: la causa suele ser el motor, el driver o el firmware, no la unión entre capas.',
  sintoma: 'Las capas se han corrido de su sitio',
  dibujo: 'capas',
  entrada:
    'La pieza no se ha abierto por dentro ni tiene las esquinas levantadas: ha salido enteramente corrida a un lado, y la unión entre capas sigue intacta. Subir la cama o la boquilla no lo arregla. Lo que falla aquí es que el hotend no fue donde el firmware ordenó, por una causa mecánica (correa/polea) o eléctrica (pérdida de pasos, driver, fuente).',
  autor: AUTOR,
  actualizado: '2026-10-16',
  minutos: 5,

  diferencial: {
    contra: 'separación entre capas y warping',
    contraCorto: 'separación/warping',
    comprobaciones: [
      {
        id: 'base',
        mira: 'La base de la pieza, pegada a la cama: ¿ha salido corrida hacia un lado o sigue en su sitio?',
        si: 'Corrida hacia un lado, y la pieza sigue unida. Es una capa desplazada.',
        no: 'En su sitio, plana o arqueada. Entonces no es desplazamiento: mira la separación o el warping.',
      },
      {
        id: 'union',
        mira: '¿Se abre por dentro o se rompe la unión entre capas?',
        si: 'No se abre: la unión sigue intacta y la pieza se ha movido entera.',
        no: 'Se abre con un corte limpio o desgarrado. Es separación entre capas o falta de material, y la temperatura sí es el ajuste.',
      },
      {
        id: 'eje',
        mira: '¿En qué eje se ha corrido la pieza?',
        si: 'Sólo X, sólo Y o los dos. Es un desplazamiento de capa; el diagnóstico es el mismo para ambos ejes.',
        no: 'No se ha corrido: no tienes capa desplazada, descarta por el diferencial de separación o warping.',
      },
    ],
    siNo: { guia: 'separaciones-entre-capas', etiqueta: 'Separaciones entre capas' },
  },

  variables: [
    {
      id: 'firmware',
      etiqueta: 'Firmware',
      indicador: 'maquina',
      para: 'Los comandos, los errores y los procedimientos cambian por firmware: Klipper, Marlin u otro.',
      necesaria: true,
      opciones: [
        { id: 'klipper', etiqueta: 'Klipper' },
        { id: 'marlin', etiqueta: 'Marlin' },
        { id: 'otro', etiqueta: 'Otro firmware' },
      ],
    },
    {
      id: 'driver',
      etiqueta: 'Driver del motor',
      indicador: 'maquina',
      para: 'Cómo se fija la corriente del motor depende de si el driver se configura por UART o lleva potenciómetro.',
      necesaria: true,
      opciones: [
        { id: 'tmc-uart', etiqueta: 'TMC con UART' },
        { id: 'tmc-standalone', etiqueta: 'TMC standalone' },
        { id: 'trimpot', etiqueta: 'A4988/DRV con potenciómetro' },
      ],
    },
    {
      id: 'corriente',
      etiqueta: 'Corriente del motor',
      indicador: 'velocidad',
      para: 'Menos corriente da menos torque y puede perder pasos; más de la cuenta sobrecalienta el driver.',
      necesaria: true,
      opciones: [
        { id: 'baja', etiqueta: 'Baja o que pierde pasos', detalle: 'El motor se para o salta en movimientos rápidos' },
        { id: 'ok', etiqueta: 'Ajustada y sin avisos' },
        { id: 'alta-caliente', etiqueta: 'Alta y el motor/driver se calientan', detalle: 'Demasiado calor' },
        { id: 'desconocida', etiqueta: 'No lo sé' },
      ],
    },
    {
      id: 'modo',
      etiqueta: 'Modo del driver TMC',
      indicador: 'general',
      para: 'stealthChop es más silencioso pero introduce positional lag y puede disparar sobrecorriente; spreadCycle es el modo por defecto de Klipper.',
      opciones: [
        { id: 'spreadcycle', etiqueta: 'spreadCycle' },
        { id: 'stealthchop', etiqueta: 'stealthChop' },
        { id: 'desconocido', etiqueta: 'No lo sé' },
        { id: 'no-aplica', etiqueta: 'No tengo TMC' },
      ],
    },
    {
      id: 'interpolacion',
      etiqueta: 'Interpolación del driver',
      indicador: 'calibracion',
      para: 'La interpolación reduce ruido, pero añade un error posicional sistemático.',
      opciones: [
        { id: 'activa', etiqueta: 'Activa' },
        { id: 'desactivada', etiqueta: 'Desactivada' },
        { id: 'desconocida', etiqueta: 'No lo sé' },
        { id: 'no-aplica', etiqueta: 'No tengo TMC' },
      ],
    },
    {
      id: 'psu',
      etiqueta: 'Fuente de alimentación',
      indicador: 'maquina',
      para: 'Una fuente insuficiente se congela o resetea los drivers al combinar calentadores con movimientos rápidos.',
      opciones: [
        { id: 'suficiente', etiqueta: 'Suficiente y medida' },
        { id: 'insuficiente', etiqueta: 'Insuficiente' },
        { id: 'no-medido', etiqueta: 'No la he medido' },
      ],
    },
    {
      id: 'hold',
      etiqueta: 'hold_current',
      indicador: 'calibracion',
      para: 'Reducir corriente con el motor inmóvil ahorra calor, pero puede introducir movimiento no ordenado.',
      opciones: [
        { id: 'ninguno', etiqueta: 'No lo he configurado' },
        { id: 'configurado', etiqueta: 'Lo tengo configurado' },
        { id: 'z-dedicado', etiqueta: 'Motores Z dedicados inactivos' },
      ],
    },
    {
      id: 'cambioMecanico',
      etiqueta: 'Cambio mecánico reciente',
      indicador: 'calibracion',
      para: 'Input Shaping se recalibra tras cambios mecánicos o estructurales.',
      opciones: [
        { id: 'si', etiqueta: 'Sí' },
        { id: 'no', etiqueta: 'No' },
      ],
    },
  ],

  conocimiento: [
    {
      id: 'frontera',
      titulo: 'No es ni separación ni warping',
      puntos: [
        'Una capa desplazada conserva la unión entre capas: el bloque sale corrido, pero no se abre.',
        'Por eso subir la temperatura de cama o de boquilla no toca el fallo: esas ajustan adhesión, y aquí la unión está intacta.',
        'La causa está en el movimiento del hotend.',
      ],
      indicador: 'calibracion',
      cuerpo:
        'Una capa desplazada conserva la unión entre capas: el bloque sale corrido, pero no se abre. Por eso subir la temperatura de cama o de boquilla no toca el fallo: esas ajustan adhesión, y aquí la unión está intacta. La causa está en el movimiento del hotend.',
      enlaza: { guia: 'separaciones-entre-capas', etiqueta: 'Comparar con separación entre capas' },
    },
    {
      id: 'eje',
      titulo: 'El eje en el que se corrió importa para el diagnóstico',
      puntos: [
        'Prusa pide identificar el eje para saber qué tocar.',
        'Los pasos de diagnóstico son iguales para X y para Y; lo que cambia es qué motor, driver y correa se revisan.',
        'Una impresora con correa independiente por eje aísla el fallo al eje que se movió.',
      ],
      indicador: 'maquina',
      cuerpo:
        'Prusa pide identificar el eje para saber qué tocar. Los pasos de diagnóstico son iguales para X y para Y; lo que cambia es qué motor, driver y correa se revisan. Una impresora con correa independiente por eje aísla el fallo al eje que se movió.',
    },
    {
      id: 'corriente-tuning',
      titulo: 'Corriente del TMC: torque frente a calor',
      puntos: [
        'Más corriente da más torque y más precisión posicional, pero también más calor.',
        'Si el driver se calienta demasiado se deshabilita; si el motor se calienta demasiado pierde torque.',
        'La mejor práctica de Klipper es preferir valores altos mientras el motor siga tibio al tacto y el driver no reporte avisos.',
      ],
      indicador: 'maquina',
      cuerpo:
        'Más corriente da más torque y más precisión posicional, pero también más calor. Si el driver se calienta demasiado se deshabilita; si el motor se calienta demasiado pierde torque. La mejor práctica de Klipper es preferir valores altos mientras el motor siga tibio al tacto y el driver no reporte avisos.',
      cifra: { valor: 'Tibio al tacto, sin avisos', nota: 'criterio de Klipper, sin cifra fija' },
    },
    {
      id: 'hold-current',
      titulo: 'hold_current: casi siempre mejor no ponerlo',
      puntos: [
        'Cambiar la corriente del motor cuando detecta que no se mueve introduce movimiento por detent forces o por fuerzas externas sobre el carro.',
        'Pocos movimientos de impresión dejan el motor inmóvil el tiempo suficiente para activarlo, así que Klipper recomienda no especificarlo.',
        'La excepción son los motores Z dedicados que están inactivos en la impresión normal, calibrando driver_TPOWERDOWN e IHOLDDELAY.',
      ],
      indicador: 'calibracion',
      cuerpo:
        'Cambiar la corriente del motor cuando detecta que no se mueve introduce movimiento por detent forces o por fuerzas externas sobre el carro. Pocos movimientos de impresión dejan el motor inmóvil el tiempo suficiente para activarlo, así que Klipper recomienda no especificarlo. La excepción son los motores Z dedicados que están inactivos en la impresión normal, calibrando driver_TPOWERDOWN e IHOLDDELAY.',
      cuando: { hold: ['configurado', 'z-dedicado'] },
    },
    {
      id: 'stealthchop-lag',
      titulo: 'stealthChop introduce positional lag',
      puntos: [
        'stealthChop es más silencioso que spreadCycle,.',
        'pero en pruebas ha mostrado un incremento de positional lag de alrededor del 75 % de un full-step en movimientos a velocidad constante,.',
        'además de poder desencadenar sobrecorriente.',
        'La fuente lo deja como trueque: tú decides si prefieres el ruido menor.',
      ],
      indicador: 'velocidad',
      cuerpo:
        'stealthChop es más silencioso que spreadCycle, pero en pruebas ha mostrado un incremento de positional lag de alrededor del 75 % de un full-step en movimientos a velocidad constante, además de poder desencadenar sobrecorriente. La fuente lo deja como trueque: tú decides si prefieres el ruido menor.',
      cifra: { valor: '~0,150 mm', nota: 'positional lag, ej. 40 mm / 200 steps, sin corroborar' },
      cuando: { modo: ['stealthchop', 'desconocido'] },
    },
    {
      id: 'interpolacion-error',
      titulo: 'La interpolación añade un error sistemático',
      puntos: [
        'La interpolación reduce el ruido a costa de retrasar la ejecución de los steps.',
        'En spreadCycle el error es de casi medio microstep configurado.',
        'Con spreadCycle y interpolate en False, subir los microsteps a 64 o 128 da un ruido similar sin ese error.',
      ],
      indicador: 'general',
      cuerpo:
        'La interpolación reduce el ruido a costa de retrasar la ejecución de los steps. En spreadCycle el error es de casi medio microstep configurado. Con spreadCycle y interpolate en False, subir los microsteps a 64 o 128 da un ruido similar sin ese error.',
      cifra: { valor: '~0,006 mm', nota: 'spreadCycle, ej. 40 mm / 200 / 16, un sólo fuente' },
      cuando: { interpolacion: ['activa', 'desconocida'] },
    },
    {
      id: 'spreadcycle-recomendacion',
      titulo: 'SpreadCycle más microsteps altos: precisión sin ruido',
      puntos: [
        'Para mejor precisión posicional, usar spreadCycle y deshabilitar la interpolación.',
        'entonces se puede subir los microsteps para reducir el ruido audible, típicamente 64 o 128.',
      ],
      indicador: 'general',
      cuerpo:
        'Para mejor precisión posicional, usar spreadCycle y deshabilitar la interpolación; entonces se puede subir los microsteps para reducir el ruido audible, típicamente 64 o 128.',
      cifra: { valor: '64 o 128', nota: 'microsteps en spreadCycle sin interpolación' },
      cuando: { modo: 'spreadcycle' },
    },
    {
      id: 'errores-tmc',
      titulo: 'Si el driver se deshabilita, la impresión se para',
      puntos: [
        'Un TMC que se deshabilita deja de mantener la posición y deja de responder a los comandos; en Klipper eso lleva a shutdown.',
        'Las causas registradas son Overtemp, ShortToGND/ShortToSupply, reset a mitad de impresión y Undervoltage.',
        'El modo stealthChop puede disparar sobrecorriente por mala predicción de la carga mecánica.',
      ],
      indicador: 'maquina',
      cuerpo:
        'Un TMC que se deshabilita deja de mantener la posición y deja de responder a los comandos; en Klipper eso lleva a shutdown. Las causas registradas son Overtemp, ShortToGND/ShortToSupply, reset a mitad de impresión y Undervoltage. El modo stealthChop puede disparar sobrecorriente por mala predicción de la carga mecánica.',
      cuando: { driver: ['tmc-uart', 'tmc-standalone'] },
    },
    {
      id: 'psu-medicion',
      titulo: 'La fuente se mide bajo carga',
      puntos: [
        'Una fuente insuficiente combinada con calentadores y movimientos a alta velocidad puede congelar la placa sin paro ni watchdog,.',
        'dejando los calentadores activos.',
        'Se mide la tensión de entrada con multímetro durante los movimientos rápidos.',
        'una caída por debajo de la tensión esperada —12 V o 24 V— indica problema.',
      ],
      indicador: 'velocidad',
      cuerpo:
        'Una fuente insuficiente combinada con calentadores y movimientos a alta velocidad puede congelar la placa sin paro ni watchdog, dejando los calentadores activos. Se mide la tensión de entrada con multímetro durante los movimientos rápidos; una caída por debajo de la tensión esperada —12 V o 24 V— indica problema.',
      cifra: { valor: '12 V o 24 V', nota: 'umbral de caída bajo carga' },
    },
    {
      id: 'pasos-perdidos',
      titulo: 'Detectar pasos perdidos con GET_POSITION',
      puntos: [
        'En Klipper se puede medir sin imprimir: homing, GET_POSITION, movimientos a alta velocidad, homing de nuevo y otro GET_POSITION.',
        'se comparan los valores de la línea mcu.',
        'Una pérdida real aparece en múltiplos de 64 microsteps con 16 microsteps; pequeñas diferencias se deben a los finales de carrera,.',
        'que disparan en posiciones ligeramente distintas.',
      ],
      indicador: 'maquina',
      cuerpo:
        'En Klipper se puede medir sin imprimir: homing, GET_POSITION, movimientos a alta velocidad, homing de nuevo y otro GET_POSITION; se comparan los valores de la línea mcu. Una pérdida real aparece en múltiplos de 64 microsteps con 16 microsteps; pequeñas diferencias se deben a los finales de carrera, que disparan en posiciones ligeramente distintas.',
      cifra: { valor: 'múltiplos de 64', nota: 'con 16 microsteps configurados' },
      cuando: { firmware: 'klipper' },
    },
    {
      id: 'cornering',
      titulo: 'Jerk y Junction Deviation son alternativos',
      puntos: [
        'Son dos algoritmos de control de esquinas, no dos parámetros que se suman.',
        'En Marlin 2, Classic Jerk está deprecado en favor de Junction Deviation,.',
        'y si una máquina usa Classic Jerk hay que poner Maximum Junction Deviation a 0 para que apliquen los límites de jerk.',
        'OrcaSlicer da la conversión JD = 0,4 · Jerk² / Accel.',
      ],
      indicador: 'slicer',
      cuerpo:
        'Son dos algoritmos de control de esquinas, no dos parámetros que se suman. En Marlin 2, Classic Jerk está deprecado en favor de Junction Deviation, y si una máquina usa Classic Jerk hay que poner Maximum Junction Deviation a 0 para que apliquen los límites de jerk. OrcaSlicer da la conversión JD = 0,4 · Jerk² / Accel.',
      cifra: { valor: 'JD = 0,4·Jerk²/Accel', nota: 'conversión OrcaSlicer' },
    },
    {
      id: 'input-shaping',
      titulo: 'Input Shaping y su calibración',
      puntos: [
        'Contraataca vibraciones en movimientos de alta velocidad, que se manifiestan como ringing.',
        'Se recomienda calibrar una vez al año o tras cambios mecánicos o estructurales: reubicación, superficie de apoyo, correas, motores, chasis.',
      ],
      indicador: 'calibracion',
      cuerpo:
        'Contraataca vibraciones en movimientos de alta velocidad, que se manifiestan como ringing. Se recomienda calibrar una vez al año o tras cambios mecánicos o estructurales: reubicación, superficie de apoyo, correas, motores, chasis.',
      cuando: { cambioMecanico: ['si', 'no'] },
    },
    {
      id: 'limites-orca',
      titulo: 'OrcaSlicer: aceleración, Motion Ability y flavor',
      puntos: [
        'Los límites de aceleración y jerk del slicer no superan los máximos de Motion Ability.',
        'Si la aceleración normal de printing es 0, Orca no envía comandos de aceleración y manda la del firmware,.',
        'deshabilitando los demás ajustes de aceleración del proceso.',
        'Con flavor Klipper, la opción de emitir límites al G-code se ignora y accel_to_decel se gestiona con SET_VELOCITY_LIMIT (por defecto al 50.',
        '%).',
      ],
      indicador: 'slicer',
      cuerpo:
        'Los límites de aceleración y jerk del slicer no superan los máximos de Motion Ability. Si la aceleración normal de printing es 0, Orca no envía comandos de aceleración y manda la del firmware, deshabilitando los demás ajustes de aceleración del proceso. Con flavor Klipper, la opción de emitir límites al G-code se ignora y accel_to_decel se gestiona con SET_VELOCITY_LIMIT (por defecto al 50 %).',
      cuando: { driver: ['tmc-uart', 'tmc-standalone', 'trimpot'] },
    },
    {
      id: 'rsense',
      titulo: 'rsense mal configurado como causa',
      puntos: [
        'Marlin advierte de impresión poco fiable y capas desplazadas cuando rsense no está configurado según las recomendaciones.',
        'No da valor ni procedimiento; es una comprobación de configuración del driver Trinamic.',
      ],
      indicador: 'maquina',
      cuerpo:
        'Marlin advierte de impresión poco fiable y capas desplazadas cuando rsense no está configurado según las recomendaciones. No da valor ni procedimiento; es una comprobación de configuración del driver Trinamic.',
      cuando: { firmware: 'marlin' },
    },
  ],

  reglas: [
    {
      id: 'correas-primero',
      accion: 'Descarta primero las correas y las poleas',
      cuando: { firmware: ['klipper', 'marlin', 'otro'] },
      porque:
        'Son la causa principal de capas desplazadas según Prusa: tensión incorrecta de correa o polea no asegurada. Es un fallo mecánico, anterior a cualquier ajuste de firmware.',
      fuente: 'Prusa',
      alcance:
        'Es un paso de triage antes que una regla eléctrica. El ajuste electrónico/firmware viene después de comprobarlo.',
    },
    {
      id: 'medir-pasos',
      accion: 'Mide la pérdida de pasos con GET_POSITION entre dos homing',
      cuando: { firmware: 'klipper' },
      porque:
        'Permite afinar corrientes, aceleraciones y velocidades sin imprimir ni gastar filamento: basta correr movimientos de alta velocidad entre los dos GET_POSITION.',
      fuente: 'Klipper FAQ',
      alcance:
        'Sólo documentado para Klipper. Marlin no tiene un método equivalente en estas fuentes.',
    },
    {
      id: 'm906',
      accion: 'Fija la corriente con M906 en mA',
      valor: 'M906 X<mA> Y<mA> Z<mA>',
      cuando: { firmware: 'marlin', driver: ['tmc-uart', 'tmc-standalone'] },
      porque:
        'M906 establece la corriente del motor en milliamperios para drivers Trinamic. Usar M907 en su lugar si el driver lleva potenciómetro por I2C.',
      fuente: 'Marlin M906',
      alcance:
        'Requiere Trinamic. Las versiones de Marlin anteriores a 2.1.2 también soportan L64xx.',
    },
    {
      id: 'rsense-verificar',
      accion: 'Verifica que rsense esté configurado según las recomendaciones',
      cuando: { firmware: 'marlin' },
      porque:
        'Marlin lo enlaza directamente con impresión poco fiable y capas desplazadas.',
      fuente: 'Marlin Troubleshooting',
      alcance:
        'Fuente única, sin valor concreto ni procedimiento. Marcar como no corroborado.',
    },
    {
      id: 'corriente-subir',
      accion: 'Sube la corriente del motor si pierde pasos',
      cuando: { corriente: 'baja' },
      porque:
        'Más corriente da más torque y más precisión posicional. Puede introducir calor; vigilar que el motor siga tibio al tacto y el driver no reporte avisos.',
      fuente: 'Klipper TMC, Marlin Troubleshooting',
      alcance:
        'Klipper ofrece un criterio (calor al tacto, sin avisos); Marlin da ~1500 mA sólo para TMC2208 ruidoso. No se combinan en una cifra única.',
    },
    {
      id: 'corriente-bajar',
      accion: 'Baja la corriente si el motor o el driver se calientan',
      valor: '~1500 mA',
      cuando: { corriente: 'alta-caliente', driver: 'tmc-standalone' },
      porque:
        'La sobrecorriente deshabilita el driver (Overtemp, reset, Undervoltage) y deja de mantener posición. Reducir la corriente y mejorar la refrigeración es la vía documentada.',
      fuente: 'Klipper TMC, Marlin Troubleshooting',
      alcance:
        'La cifra de ~1500 mA aparece sólo para TMC2208 ruidoso/que rechina (Marlin, reportes recopilados); no es una recomendación universal.',
    },
    {
      id: 'hold-quitar',
      accion: 'Prueba a quitar hold_current si el eje se mueve al cambiar de corriente',
      cuando: { hold: 'configurado' },
      porque:
        'Cambiar la corriente con el motor inmóvil introduce movimiento por detent forces o por fuerzas externas sobre el carro, y pocas impresiones dejan el motor el tiempo suficiente para activarlo.',
      fuente: 'Klipper TMC',
      alcance:
        'Regla general documentada: «prefer not to specify a hold_current». No es una prohibición absoluta, sino una preferencia por defecto.',
    },
    {
      id: 'hold-z',
      accion: 'Aplica hold_current en motores Z dedicados inactivos, calibrando driver_TPOWERDOWN e IHOLDDELAY',
      indicador: 'activar',
      cuando: { hold: 'z-dedicado' },
      porque:
        'Los motores Z que no participan en la impresión normal (sin bed_mesh, bed_tilt, skew en Z ni vase mode) se mantienen más fríos con hold_current, calculando el movimiento no ordenado en nivelación y sondeo.',
      fuente: 'Klipper TMC',
      alcance:
        'Excepción documentada al caso general. Si no estás seguro, preferir no especificar hold_current.',
    },
    {
      id: 'stealthchop-sobrecorriente',
      accion: 'Si aparecen ShortToGND o ShortToSupply con stealthChop, deshabilita stealthChop y repite',
      cuando: { modo: 'stealthchop' },
      porque:
        'En stealthChop el driver puede predecir mal la carga mecánica, enviar demasiada corriente y disparar su propia detección de sobrecorriente. La prueba a posteriori decide la causa.',
      fuente: 'Klipper TMC',
      alcance:
        'El mismo síntoma admite hardware/cableado (siempre posible) y predicción del driver (sólo en stealthChop). La prueba no afirma la causa a priori.',
    },
    {
      id: 'stealthchop-precision',
      accion: 'Pasa a spreadCycle si necesitas precisión posicional',
      cuando: { modo: 'stealthchop' },
      porque:
        'spreadCycle da más torque y más precisión posicional que stealthChop, a costa de más ruido en algunas impresoras.',
      fuente: 'Klipper TMC',
      alcance:
        'Trueque documentado: torque/precisión frente a ruido. StealthChop puede preferirse por el ruido menor, con positional lag conocido.',
    },
    {
      id: 'no-alternar-modo',
      accion: 'Elige un modo (spreadCycle o stealthChop) y no lo cambies con el motor en movimiento',
      cuando: { modo: ['spreadcycle', 'stealthchop'] },
      porque:
        'Los drivers producen resultados pobres y confusos si el modo cambia mientras el motor está a velocidad no nula.',
      fuente: 'Klipper TMC',
      alcance:
        'La elección es de instalación, no de impresión. La configuración stealthchop_threshold no afecta al sensorless homing: Klipper ajusta el modo automáticamente ahí.',
    },
    {
      id: 'errores-diversos',
      accion: 'Revisa cables y fuente ante reset, Undervoltage o pérdida de comunicación con la MCU',
      cuando: { firmware: 'klipper' },
      porque:
        'reset=1/CS_ACTUAL=0/SE=0 y uv_cp=1 pueden deberse a problemas de tensión o cableado. Lost communication with MCU suele venir de cable USB, 5 V mezclados, fuente sobrecargada o cables plegados/deshilachados.',
      fuente: 'Klipper TMC, Klipper FAQ',
      alcance:
        'No siempre implica pasos perdidos en la pieza: el driver deshabilitado deja de mantener posición y deja de responder a comandos.',
    },
    {
      id: 'interpolacion-desactivar',
      accion: 'Deshabilita interpolate en spreadCycle para eliminar el error sistemático',
      cuando: { modo: 'spreadcycle', interpolacion: 'activa' },
      porque:
        'La interpolación retrasa la ejecución de los steps e introduce un error sistemático de casi medio microstep configurado.',
      fuente: 'Klipper TMC',
      alcance:
        'El error deja de serlo con interpolate desactivado; con microsteps 64 o 128 se recupera un ruido similar.',
    },
    {
      id: 'microsteps-altos',
      accion: 'Sube los microsteps a 64 o 128 si hay ruido audible con interpolate desactivado',
      cuando: { modo: 'spreadcycle', interpolacion: 'desactivada' },
      porque:
        'Con spreadCycle e interpolate en False, microsteps altos dan un ruido audible similar a la interpolación sin introducir error posicional sistemático.',
      fuente: 'Klipper TMC',
      alcance:
        'Aplica sólo en spreadCycle. En stealthChop la imprecisión de la interpolación es pequeña frente a la del propio modo.',
    },
    {
      id: 'psu-medir',
      accion: 'Mide la tensión de entrada con un multímetro durante movimientos rápidos',
      valor: '12 V o 24 V',
      cuando: { psu: ['no-medido', 'insuficiente'] },
      porque:
        'Una fuente insuficiente junto con calentadores y alta velocidad congela la placa sin paro watchdog. Una tensión por debajo del valor esperado (12 V o 24 V) indica problema.',
      fuente: 'Marlin Troubleshooting',
      alcance:
        'La prueba valida o descarta la fuente bajo carga; no es una magnitud de diseño.',
    },
    {
      id: 'marlin-congelacion',
      accion: 'Prueba a desactivar calentadores o a imprimir más lento si la placa se congela',
      cuando: { firmware: 'marlin' },
      porque:
        'Ayuda a distinguir la congelación por fuente insuficiente de otros fallos.',
      fuente: 'Marlin Troubleshooting',
      alcance:
        'Dos variables de la misma causa (fuente) se prueban por separado para no confundirlas.',
    },
    {
      id: 'acel-limites',
      accion: 'Revisa los límites de aceleración y jerk en Motion Ability',
      cuando: { driver: ['tmc-uart', 'tmc-standalone', 'trimpot'] },
      porque:
        'Una aceleración que supera lo que el motor, el driver y la fuente soportan puede perder pasos y correr la capa. OrcaSlicer limita la aceleración a los máximos configurados.',
      fuente: 'OrcaSlicer Motion Ability, OrcaSlicer Acceleration',
      alcance:
        'Son máximos configurables por el usuario en el slicer, no cifras universales. Si la aceleración normal es 0, el firmware manda.',
    },
    {
      id: 'accel-a-cero',
      accion: 'Confirma que la aceleración la decide el firmware si la de OrcaSlicer está a 0',
      cuando: { firmware: ['klipper', 'marlin', 'otro'] },
      porque:
        'A 0, Orca no envía comandos de aceleración y los demás ajustes de aceleración del proceso se deshabilitan.',
      fuente: 'OrcaSlicer Acceleration',
      alcance:
        'Trampa de diagnóstico: bajar la aceleración a 0 no la desactiva, cede el control al firmware.',
    },
    {
      id: 'accel-to-decel',
      accion: 'Gestiona accel_to_decel sólo con flavor Klipper (por defecto al 50 %)',
      valor: '50 % (1–100 %)',
      cuando: { firmware: 'klipper' },
      porque:
        'Con flavor Klipper, Orca ajusta max_accel_to_decel añadiendo ACCEL_TO_DECEL a cada SET_VELOCITY_LIMIT. Fuera del flavor Klipper la opción no aplica.',
      fuente: 'OrcaSlicer Acceleration',
      alcance:
        'Por defecto habilitado cuando el flavor es Klipper. Sólo editable si está marcado.',
    },
    {
      id: 'cornering-jd',
      accion: 'Si usas Classic Jerk en Marlin 2 con Maximum Junction Deviation mayor que 0, pon JD a 0',
      cuando: { firmware: 'marlin' },
      porque:
        'Jerk y Junction Deviation son alternativos, no acumulativos: configurar ambos a la vez no suma, anula.',
      fuente: 'OrcaSlicer Jerk XY, OrcaSlicer Motion Ability',
      alcance:
        'La conversión es JD = 0,4 · Jerk² / Accel. Los límites de jerk tradicional sólo aplican si JD = 0.',
    },
    {
      id: 'input-shaping-calibrar',
      accion: 'Calibra Input Shaping si ha pasado un año o hubo un cambio mecánico o estructural',
      valor: 'una vez al año',
      cuando: { cambioMecanico: 'si' },
      porque:
        'Las vibraciones en alta velocidad provocan ringing. La calibración contrarresta esas vibraciones, y OrcaSlicer la recomienda tras relocation, nueva superficie, correas, motores o chasis.',
      fuente: 'OrcaSlicer Motion Ability',
      alcance:
        'Recomendación de la página de OrcaSlicer, sin corroboración cruzada. La calibración puede usar un acelerómetro integrado si el equipo lo trae.',
    },
    {
      id: 'emit-limites-klipper',
      accion: 'No dependas de «Emitir límites a G-code» en una impresora Klipper',
      cuando: { firmware: 'klipper' },
      porque:
        'Esa opción se ignora cuando el flavor de G-code es Klipper.',
      fuente: 'OrcaSlicer Motion Ability',
      alcance:
        'En Klipper los límites se gestionan desde la configuración del firmware; la emisión por G-code no aplica.',
    },
  ],

  fueraDeAlcance: [
    {
      sintoma: 'Las esquinas se levantan de la cama',
      porQue:
        'Es warping: contracción térmica en los exteriores. El diagnóstico y la cifra de cama son otros.',
      guia: 'warping-pla',
    },
    {
      sintoma: 'Las capas se sueltan por dentro con corte limpio',
      porQue:
        'Es separación entre capas: la unión falla, aunque la pieza no se haya movido. Se arregla con temperatura y enfriamiento.',
      guia: 'separaciones-entre-capas',
    },
    {
      sintoma: 'Obstrucción, nozzle clog o nivelación/Z-probe',
      porQue:
        'No están en estas siete fuentes. La obstrucción leve puede manifestarse como una capa que falta y estar en la guía de separaciones.',
    },
    {
      sintoma: 'Correas y poleas físicas',
      porQue:
        'Son la causa mecánica principal, pero el procedimiento por modelo y las geometrías de correa/polea están en la guía de separaciones.',
      guia: 'separaciones-entre-capas',
    },
  ],

  fuentes: [
    {
      url: 'https://www.orcaslicer.com/wiki/printer_settings/motion%20ability/printer_motion_ability.html',
      quien: 'OrcaSlicer Wiki',
      que: 'Motion Ability: límites de velocidad, aceleración, jerk y compatibilidad por firmware.',
    },
    {
      url: 'https://www.orcaslicer.com/wiki/print_settings/speed/speed_settings_acceleration.html',
      quien: 'OrcaSlicer Wiki',
      que: 'Acceleration: cuándo sobrescribe al firmware y accel_to_decel (Klipper).',
    },
    {
      url: 'https://www.orcaslicer.com/wiki/print_settings/speed/speed_settings_jerk_xy.html',
      quien: 'OrcaSlicer Wiki',
      que: 'Jerk XY: definición, efectos y conversión Jerk/Junction Deviation.',
    },
    {
      url: 'https://www.klipper3d.org/TMC_Drivers.html',
      quien: 'Klipper',
      que: 'TMC_Drivers: tuning de corriente, hold_current, spreadCycle/stealthChop, interpolación y errores.',
    },
    {
      url: 'https://www.klipper3d.org/FAQ.html',
      quien: 'Klipper',
      que: 'FAQ: detección de pasos perdidos con GET_POSITION y comunicación con la MCU.',
    },
    {
      url: 'https://marlinfw.org/docs/basics/troubleshooting.html',
      quien: 'Marlin',
      que: 'Troubleshooting: conflictos TMC2208, rsense y congelación por fuente insuficiente.',
    },
    {
      url: 'https://marlinfw.org/docs/gcode/M906.html',
      quien: 'Marlin',
      que: 'M906: fijar corriente en mA para drivers Trinamic.',
    },
    {
      url: 'https://help.prusa3d.com/article/layer-shifting_2020',
      quien: 'Prusa Research',
      que: 'Layer shifting: causa por correas/poleas y distinción de ejes.',
    },
  ],
};
