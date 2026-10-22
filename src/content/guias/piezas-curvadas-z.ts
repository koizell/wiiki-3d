import type { Guia } from './tipos.ts';
import { AUTOR } from './autor.ts';

export const piezasCurvadasZ: Guia = {
  slug: 'piezas-curvadas-z',
  titulo: 'Piezas curvadas en Z',
  resumen:
    'Curvas con escalones, superficies que pierden detalle o capas que se han corrido en el eje Z: la causa suele ser la altura de capa o la orientación de la curva, no la temperatura.',
  sintoma: 'Superficie curva con escalones o capas corridas en Z',
  dibujo: 'capas',
  entrada:
    'Una pieza con curvas en Z sale con escalones visibles, pierde detalle o, en el peor caso, se ha corrido entera. Subir la temperatura no lo arregla: aquí el ajuste es la altura de capa, la orientación de la superficie y, si hubo un desplazamiento real, la mecánica o el driver. Esta guía separa los tres casos mirando la pieza antes de tocar nada.',
  autor: AUTOR,
  actualizado: '2026-10-17',
  minutos: 4,
  campos: [],
  diferencial: {
    contra: 'capas desplazadas y warping',
    contraCorto: 'capas desplazadas',
    comprobaciones: [
      {
        id: 'escalones',
        mira: '¿Ves escalones o líneas de capa en la superficie curva?',
        si: 'Escalones visibles en una superficie curva: es un problema de resolución vertical o de orientación de la curva.',
        no: 'Si no hay escalones pero la pieza se ha corrido entera, no es altura de capa.',
      },
      {
        id: 'corrida',
        mira: '¿La pieza entera ha salido corrida hacia un lado, pero la unión entre capas sigue intacta?',
        si: 'La pieza se ha movido entera y la unión sigue intacta: es una capa desplazada, no una curva mal resuelta.',
        no: 'Si la unión entre capas se conserva y no hay desplazamiento, el problema está en la superficie.',
      },
      {
        id: 'esquinas',
        mira: '¿Las esquinas de la base se levantan de la cama?',
        si: 'Las esquinas levantadas son warping, no un problema de curvas en Z.',
        no: 'Si la base está plana y sólo la superficie curva muestra escalones, sigue aquí.',
      },
    ],
    siNo: { guia: 'capas-desplazadas', etiqueta: 'Capas desplazadas' },
  },
  variables: [
    {
      id: 'superficie',
      etiqueta: 'Orientación de la curva',
      indicador: 'cama',
      para: 'Z contouring sólo gestiona superficies superiores; las curvas invertidas no se corrigen con él.',
      necesaria: true,
      opciones: [
        { id: 'superior', etiqueta: 'Superior (top-facing)', detalle: 'Curva mirando hacia arriba' },
        { id: 'inferior', etiqueta: 'Inferior (invertida)', detalle: 'Curva mirando hacia abajo' },
        { id: 'ambas', etiqueta: 'Ambas', detalle: 'Superior e inferior' },
      ],
    },
    {
      id: 'altura',
      etiqueta: 'Altura de capa',
      indicador: 'altura',
      para: 'La altura de capa es la resolución vertical y decide el detalle en curvas.',
      necesaria: true,
      opciones: [
        { id: 'fina', etiqueta: 'Fina', detalle: 'Máximo detalle, tiempo largo' },
        { id: 'media', etiqueta: 'Media', detalle: 'Equilibrio' },
        { id: 'gruesa', etiqueta: 'Gruesa', detalle: 'Tiempo corto, capas visibles' },
      ],
    },
    {
      id: 'boquilla',
      etiqueta: 'Diámetro de boquilla',
      indicador: 'temperatura',
      para: 'La boquilla pone el techo y el suelo de la altura de capa.',
      necesaria: true,
      opciones: [
        { id: '04', etiqueta: '0,4 mm', detalle: 'Boquilla estándar' },
        { id: '06', etiqueta: '0,6 mm', detalle: 'Boquilla grande' },
        { id: '08', etiqueta: '0,8 mm', detalle: 'Boquilla extragrande' },
      ],
    },
    {
      id: 'zContouring',
      etiqueta: 'Z contouring (ZAA)',
      indicador: 'altura',
      para: 'Si está activo, suaviza superficies superiores curvas sin cambiar la altura de capa nominal.',
      opciones: [
        { id: 'activado', etiqueta: 'Activado' },
        { id: 'desactivado', etiqueta: 'Desactivado' },
        { id: 'no-se', etiqueta: 'No lo sé' },
      ],
    },
    {
      id: 'desplazamiento',
      etiqueta: '¿Hubo desplazamiento de capa?',
      indicador: 'calibracion',
      para: 'Si la pieza se ha corrido entera, la causa es mecánica o eléctrica, no la altura.',
      opciones: [
        { id: 'si', etiqueta: 'Sí, se ha corrido' },
        { id: 'no', etiqueta: 'No, sólo la superficie' },
      ],
    },
  ],
  conocimiento: [
    {
      id: 'altura-y-curvas',
      titulo: 'La altura de capa es la resolución vertical',
      puntos: [
        'La altura de capa define cuánto detalle tiene la pieza en el eje Z.',
        'Usar alturas menores da acabado de superficie más suave.',
        'Líneas de capa menos visibles, más detalle en curvas y mejor rendimiento en voladizos.',
      ],
      indicador: 'altura',
      cuerpo:
        'La altura de capa define cuánto detalle tiene la pieza en el eje Z. Usar alturas menores da acabado de superficie más suave, líneas de capa menos visibles, más detalle en curvas y mejor rendimiento en voladizos.',
      cifra: { valor: '20 %–80 %', nota: 'del diámetro de boquilla, rango óptimo' },
      cita: {
        texto:
          'Usar capas más pequeñas aumenta el tiempo de impresión pero da: acabado de superficie más suave, líneas de capa menos visibles, mayor detalle en curvas y mejor rendimiento en voladizos.',
        fuente: 'OrcaSlicer Wiki - Layer Height',
      },
    },
    {
      id: 'altura-variables',
      titulo: 'Variables de altura de capa en el slicer',
      puntos: [
        'La altura de capa define el grosor vertical de cada capa y afecta tanto a la calidad como a la velocidad.',
        'En OrcaSlicer se ajusta con las variables layer_height e initial_layer_print_height.',
      ],
      indicador: 'slicer',
      cuerpo:
        'La altura de capa define el grosor vertical de cada capa y afecta tanto a la calidad como a la velocidad. En OrcaSlicer se ajusta con las variables layer_height e initial_layer_print_height.',
      cita: {
        texto:
          'La altura de capa define el grosor vertical de cada capa y afecta tanto a la calidad como a la velocidad. Variables `layer_height`, `initial_layer_print_height` (Float).',
        fuente: 'OrcaSlicer Wiki - Layer Height',
      },
    },
    {
      id: 'por-debajo-20',
      titulo: 'Por debajo del 20 %: inconsistencias de flujo',
      cuando: { altura: 'fina' },
      puntos: [
        'Por debajo del 20 % del diámetro de boquilla pueden aparecer inconsistencias de flujo y patrones "fish scale".',
        'Especialmente a altas velocidades.',
      ],
      indicador: 'temperatura',
      cuerpo:
        'Por debajo del 20 % del diámetro de boquilla pueden aparecer inconsistencias de flujo y patrones "fish scale", especialmente a altas velocidades.',
      cita: {
        texto:
          'Por debajo del 20 %: inconsistencias de flujo y patrones "fish scale", especialmente a altas velocidades.',
        fuente: 'OrcaSlicer Wiki - Layer Height',
      },
    },
    {
      id: 'por-encima-80',
      titulo: 'Por encima del 80 %: riesgo de adhesión entre capas',
      cuando: { altura: 'gruesa' },
      puntos: [
        'Por encima del 80 % del diámetro de boquilla hay mayor riesgo de problemas de adhesión entre capas y reducción de calidad de impresión.',
      ],
      indicador: 'calibracion',
      cuerpo:
        'Por encima del 80 % del diámetro de boquilla hay mayor riesgo de problemas de adhesión entre capas y reducción de calidad de impresión.',
      cita: {
        texto: 'Por encima del 80 %: mayor riesgo de problemas de adhesión entre capas y reducción de calidad de impresión.',
        fuente: 'OrcaSlicer Wiki - Layer Height',
      },
    },
    {
      id: 'z-contouring-que-es',
      titulo: 'Z contouring (ZAA) suaviza curvas superiores',
      puntos: [
        'Z contouring reduce el escalonado visible en superficies curvas.',
        'Y pendientes superiores ajustando la altura Z de puntos de extrusión individuales para que el toolpath siga mejor la superficie del modelo.',
      ],
      indicador: 'geometria',
      cuerpo:
        'Z contouring reduce el escalonado visible en superficies curvas y pendientes superiores ajustando la altura Z de puntos de extrusión individuales para que el toolpath siga mejor la superficie del modelo.',
      cita: {
        texto:
          'Z Contouring (ZAA) reduce el escalonado visible en superficies curvas y pendientes superiores ajustando la altura Z de puntos de extrusión individuales para que el toolpath siga mejor la superficie del modelo.',
        fuente: 'OrcaSlicer Wiki - Z Contouring',
      },
    },
    {
      id: 'z-contouring-limite',
      titulo: 'Z contouring no gestiona curvas invertidas',
      puntos: [
        'La implementación actual apunta a superficies curvas o pendientes orientadas hacia arriba (top-facing).',
        'Las curvas orientadas hacia abajo o invertidas no se gestionan.',
        'Por eso la orientación de la curva decide si Z contouring sirve o no.',
      ],
      indicador: 'geometria',
      cuerpo:
        'La implementación actual apunta a superficies curvas o pendientes orientadas hacia arriba (top-facing). Las curvas orientadas hacia abajo o invertidas no se gestionan. Por eso la orientación de la curva decide si Z contouring sirve o no.',
      cita: {
        texto:
          'La implementación actual sólo maneja superficies curvas/pendientes superiores; curvas hacia abajo o boca abajo no se manejan.',
        fuente: 'OrcaSlicer Wiki - Z Contouring',
      },
    },
    {
      id: 'z-contouring-min-wall',
      titulo: 'Minimize wall height angle',
      cuando: { zContouring: 'activado' },
      puntos: [
        'Reduce la altura de los perímetros de superficie superior para ajustarse mejor al borde del modelo en pendientes más pronunciadas.',
        'Que ese ángulo; afecta a perímetros internos y externos.',
        'Poner 0 para desactivar.',
      ],
      indicador: 'geometria',
      cuerpo:
        'Reduce la altura de los perímetros de superficie superior para ajustarse mejor al borde del modelo en pendientes más pronunciadas que ese ángulo; afecta a perímetros internos y externos. Poner 0 para desactivar.',
      cifra: { valor: '35°', nota: 'valor por defecto, punto de partida razonable' },
      cita: {
        texto:
          'Minimize wall height angle: default 35 grados; reduce la altura de perímetros de superficie superior para que coincidan mejor con el borde del modelo en pendientes más pronunciadas que ese ángulo.',
        fuente: 'OrcaSlicer Wiki - Z Contouring',
      },
    },
    {
      id: 'z-contouring-min-z',
      titulo: 'Minimum z height',
      cuando: { zContouring: 'activado' },
      puntos: [
        'Valores menores permiten un contouring más fuerte pero dejan menos grosor mínimo de capa.',
      ],
      indicador: 'altura',
      cuerpo:
        'Valores menores permiten un contouring más fuerte pero dejan menos grosor mínimo de capa.',
      cita: {
        texto:
          'Minimum z height: controla la altura mínima de capa permitida para toolpaths contorneados; valores más bajos permiten contouring más fuerte pero dejan menos grosor de capa mínimo.',
        fuente: 'OrcaSlicer Wiki - Z Contouring',
      },
    },
    {
      id: 'z-contouring-fill',
      titulo: "Don't alternate fill direction",
      cuando: { zContouring: 'activado' },
      puntos: [
        'Mantiene la dirección de relleno consistente de capa a capa.',
        'Ayuda a un patrón de superficie más consistente en superficies superiores curvas.',
        'Sólo tiene efecto cuando Z contouring está habilitado para esa región.',
      ],
      indicador: 'geometria',
      cuerpo:
        'Mantiene la dirección de relleno consistente de capa a capa; ayuda a un patrón de superficie más consistente en superficies superiores curvas. Sólo tiene efecto cuando Z contouring está habilitado para esa región.',
      cita: {
        texto:
          "Don't alternate fill direction: mantener la dirección de relleno consistente capa a capa produce un patrón de superficie más consistente en superficies curvas superiores; sólo tiene efecto cuando Z contouring está habilitado para esa región.",
        fuente: 'OrcaSlicer Wiki - Z Contouring',
      },
    },
    {
      id: 'voladizos',
      titulo: 'Altura de capa y voladizos',
      puntos: [
        'Las alturas de capa menores permiten voladizos más pronunciados al reducir la distancia no soportada entre capas.',
        'Las mayores aumentan esa distancia, provocando más sagging y necesidad de soportes a ángulos menores.',
      ],
      indicador: 'altura',
      cuerpo:
        'Las alturas de capa menores permiten voladizos más pronunciados al reducir la distancia no soportada entre capas; las mayores aumentan esa distancia, provocando más sagging y necesidad de soportes a ángulos menores.',
      cita: {
        texto:
          'Capas más pequeñas permiten voladizos más pronunciados (reducen la distancia no soportada entre capas); capas más grandes aumentan ese gap y provocan más sagging.',
        fuente: 'OrcaSlicer Wiki - Layer Height',
      },
    },
    {
      id: 'primera-capa',
      titulo: 'Altura de primera capa',
      puntos: [
        'La altura de primera capa controla el grosor de la capa inicial.',
        'Una primera capa más gruesa mejora la adhesión a la cama y compensa imperfecciones de la superficie de construcción.',
        'Recomendado 0,25 mm para boquilla de 0,4 mm, máximo 65 % del diámetro de boquilla.',
      ],
      indicador: 'calibracion',
      cuerpo:
        'La altura de primera capa controla el grosor de la capa inicial; una primera capa más gruesa mejora la adhesión a la cama y compensa imperfecciones de la superficie de construcción. Recomendado 0,25 mm para boquilla de 0,4 mm, máximo 65 % del diámetro de boquilla.',
      cifra: { valor: '0,25 mm', nota: 'boquilla de 0,4 mm (62,5 % del diámetro)' },
      cita: {
        texto: 'Recomendado: 0,25 mm para boquilla de 0,4 mm (62,5 % del diámetro de boquilla).',
        fuente: 'OrcaSlicer Wiki - Layer Height',
      },
    },
    {
      id: 'desplazamiento-causas',
      titulo: 'Desalineación de capas: causa mecánica o eléctrica',
      cuando: { desplazamiento: 'si' },
      puntos: [
        'Las impresoras 3D usan control en lazo abierto: no hay realimentación de la posición real del cabezal.',
        'Si algo se desvía, la impresión sigue como si nada.',
        'Si el cabezal se mueve demasiado rápido.',
        'Los motores pueden no seguir el ritmo (se oye un clic al fallar la posición) y el resto de la impresión queda desalineado.',
      ],
      indicador: 'maquina',
      cuerpo:
        'Las impresoras 3D usan control en lazo abierto: no hay realimentación de la posición real del cabezal; si algo se desvía, la impresión sigue como si nada. Si el cabezal se mueve demasiado rápido, los motores pueden no seguir el ritmo (se oye un clic al fallar la posición) y el resto de la impresión queda desalineado.',
      cita: {
        texto:
          'La mayoría de impresoras usan control en lazo abierto: no hay feedback de la posición real del cabezal.',
        fuente: 'Simplify3D Print Quality Troubleshooting',
      },
    },
  ],
  reglas: [
    {
      id: 'altura-gruesa',
      accion: 'Baja la altura de capa al mínimo del rango para ganar detalle en curvas',
      valor: '20 % del diámetro de boquilla',
      porque:
        'A mayor altura, menos capas y menor tiempo, pero las curvas pierden detalle y el acabado es más rugoso.',
      alcance: 'Rango óptimo 20 %–80 % del diámetro de boquilla (OrcaSlicer). El mínimo mejora detalle y voladizos.',
      cuando: { altura: 'gruesa' },
      fuente: 'OrcaSlicer Wiki - Layer Height',
    },
    {
      id: 'altura-minimo',
      accion: 'No bajes por debajo del 20 % del diámetro de boquilla',
      valor: '20 % mínimo',
      porque:
        'Por debajo del 20 % aparecen inconsistencias de flujo y patrones "fish scale", especialmente a altas velocidades.',
      alcance: 'Rango óptimo 20 %–80 % del diámetro de boquilla (OrcaSlicer).',
      cuando: { altura: 'fina' },
      fuente: 'OrcaSlicer Wiki - Layer Height',
    },
    {
      id: 'limite-superior-04',
      accion: 'No superes el 80 % del diámetro de boquilla',
      valor: '0,32 mm',
      porque: 'Por encima del 80 % aumenta el riesgo de mala adhesión entre capas y pérdida de calidad.',
      alcance: 'Boquilla de 0,4 mm: 0,32 mm es el 80 % de 0,4 mm.',
      cuando: { boquilla: '04' },
      fuente: 'OrcaSlicer Wiki - Layer Height',
    },
    {
      id: 'limite-superior-06',
      accion: 'No superes el 80 % del diámetro de boquilla',
      valor: '0,48 mm',
      porque: 'Por encima del 80 % aumenta el riesgo de mala adhesión entre capas y pérdida de calidad.',
      alcance: 'Boquilla de 0,6 mm: 0,48 mm es el 80 % de 0,6 mm.',
      cuando: { boquilla: '06' },
      fuente: 'OrcaSlicer Wiki - Layer Height',
    },
    {
      id: 'limite-superior-08',
      accion: 'No superes el 80 % del diámetro de boquilla',
      valor: '0,64 mm',
      porque: 'Por encima del 80 % aumenta el riesgo de mala adhesión entre capas y pérdida de calidad.',
      alcance: 'Boquilla de 0,8 mm: 0,64 mm es el 80 % de 0,8 mm.',
      cuando: { boquilla: '08' },
      fuente: 'OrcaSlicer Wiki - Layer Height',
    },
    {
      id: 'z-contouring-activar',
      accion: 'Activa Z contouring (ZAA) para suavizar curvas superiores',
      porque:
        'Ajusta la altura Z de puntos individuales en superficies superiores curvas sin cambiar la altura de capa nominal.',
      alcance: 'Sólo superficies top-facing. Las curvas invertidas no se gestionan.',
      cuando: { zContouring: 'desactivado', superficie: ['superior', 'ambas'] },
      fuente: 'OrcaSlicer Wiki - Z Contouring',
    },
    {
      id: 'z-contouring-no-invertidas',
      accion: 'No cuentes con Z contouring para curvas invertidas',
      porque:
        'La implementación actual no gestiona curvas orientadas hacia abajo. Para esas, la vía es bajar la altura de capa.',
      alcance: 'Límite documentado de la función: sólo superficies orientadas hacia arriba.',
      cuando: { superficie: ['inferior', 'ambas'] },
      fuente: 'OrcaSlicer Wiki - Z Contouring',
    },
    {
      id: 'z-contouring-min-wall-angle',
      accion: "Ajusta 'Minimize wall height angle' si la pendiente es pronunciada",
      valor: '35° por defecto',
      porque:
        'Reduce la altura de los perímetros de superficie superior para ajustarse mejor al borde del modelo en pendientes más pronunciadas que ese ángulo.',
      alcance: 'Poner 0 para desactivar. Valor por defecto razonable: 35°.',
      cuando: { zContouring: 'activado' },
      fuente: 'OrcaSlicer Wiki - Z Contouring',
    },
    {
      id: 'z-contouring-min-z',
      accion: "Ajusta 'Minimum z height' según la fuerza de contouring deseada",
      porque:
        'Valores menores permiten contouring más fuerte pero dejan menos grosor mínimo de capa.',
      alcance: 'Afecta a recorridos, infill de superficie superior y paredes.',
      cuando: { zContouring: 'activado' },
      fuente: 'OrcaSlicer Wiki - Z Contouring',
    },
    {
      id: 'z-contouring-fill',
      accion: "Activa 'Don't alternate fill direction' para superficies curvas superiores",
      porque:
        'Mantiene la dirección de relleno consistente de capa a capa; ayuda a un patrón de superficie más consistente en superficies superiores curvas.',
      alcance: 'Sólo tiene efecto cuando Z contouring está habilitado para esa región.',
      cuando: { zContouring: 'activado' },
      fuente: 'OrcaSlicer Wiki - Z Contouring',
    },
    {
      id: 'desplazamiento-velocidad',
      accion: 'Reduce la velocidad de impresión en un 50 %',
      valor: '50 %',
      porque:
        'Si el cabezal se mueve demasiado rápido, los motores pueden no seguir el ritmo y el resto de la impresión queda desalineado.',
      alcance: 'Ajustar "Default Printing Speed" (con extrusión) y "X/Y Axis Movement Speed" (sin extrusión).',
      cuando: { desplazamiento: 'si' },
      fuente: 'Simplify3D Print Quality Troubleshooting',
    },
    {
      id: 'desplazamiento-aceleracion',
      accion: 'Baja la aceleración en el firmware',
      porque:
        'Una aceleración y desaceleración más gradual evita que los motores pierdan la posición deseada.',
      alcance:
        'Sugerencia de Simplify3D para desalineación; no da un valor numérico concreto.',
      cuando: { desplazamiento: 'si' },
      fuente: 'Simplify3D Print Quality Troubleshooting',
    },
    {
      id: 'desplazamiento-correas',
      accion: 'Revisa la tensión de las correas',
      porque:
        'Las correas de goma se estiran con el tiempo; tensión demasiado floja hace que patine sobre la polea, demasiado apretada genera fricción excesiva.',
      alcance:
        'Demasiado floja: el belt patina sobre la polea. Demasiado apretada: fricción excesiva en los rodamientos.',
      cuando: { desplazamiento: 'si' },
      fuente: 'Simplify3D Print Quality Troubleshooting',
    },
    {
      id: 'desplazamiento-setscrews',
      accion: 'Aprieta los set-screws (grub screws) de las poleas',
      porque:
        'Si se aflojan, la polea deja de girar con el motor y el cabezal no alcanza la posición deseada.',
      alcance: 'Anclan la polea al eje del motor.',
      cuando: { desplazamiento: 'si' },
      fuente: 'Simplify3D Print Quality Troubleshooting',
    },
    {
      id: 'desplazamiento-corriente',
      accion: 'Revisa la corriente de los motores y el sobrecalentamiento del driver',
      porque:
        'Corriente insuficiente a los motores o sobrecalentamiento del driver puede detener temporalmente el motor hasta que se enfría.',
      alcance: 'Problemas eléctricos, no mecánicos.',
      cuando: { desplazamiento: 'si' },
      fuente: 'Simplify3D Print Quality Troubleshooting',
    },
  ],
  fueraDeAlcance: [
    {
      sintoma: 'Las esquinas se levantan de la cama',
      porQue: 'Es warping: contracción térmica en los exteriores, no un problema de curvas en Z.',
      guia: 'warping-pla',
    },
    {
      sintoma: 'La pieza sale corrida entera hacia un lado',
      porQue: 'Es una capa desplazada: la causa es mecánica o eléctrica. Esta guía sólo cubre el desplazamiento como diagnóstico rápido.',
      guia: 'capas-desplazadas',
    },
    {
      sintoma: 'Z-wobble, acoplamiento rígido o flexible, backlash',
      porQue: 'Las fuentes procesadas no los cubren; no se inventan afirmaciones sobre ellos.',
    },
    {
      sintoma: 'Obstrucción o falta de material',
      porQue: 'No llegó filamento suficiente; es un problema de flujo o de temperatura, no de curvas.',
      guia: 'separaciones-entre-capas',
    },
  ],
  fuentes: [
    {
      url: 'https://github.com/SoftFever/OrcaSlicer/wiki/quality_settings_layer_height',
      quien: 'OrcaSlicer Wiki - Layer Height',
      que: 'Altura de capa, rango óptimo, voladizos, primera capa.',
    },
    {
      url: 'https://github.com/SoftFever/OrcaSlicer/wiki/quality_settings_z_contouring',
      quien: 'OrcaSlicer Wiki - Z Contouring',
      que: 'Z contouring (ZAA): superficies curvas superiores, parámetros y límites.',
    },
    {
      url: 'https://www.simplify3d.com/support/print-quality-troubleshooting/',
      quien: 'Simplify3D Print Quality Troubleshooting',
      que: 'Desalineación de capas: velocidad, correas, set-screws, corriente.',
    },
  ],
};
