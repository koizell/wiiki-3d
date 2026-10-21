import type { Guia } from './tipos.ts';
import { AUTOR } from './autor.ts';

export const alturaCapa: Guia = {
  slug: 'altura-capa',
  titulo: 'Altura de capa',
  resumen: 'Qué altura de capa poner según lo que buscas: detalle, tiempo o resistencia, y el límite que impone la boquilla.',
  sintoma: 'Superficie con escalones, pieza que tarda demasiado o se rompe entre capas',
  dibujo: 'capas',
  entrada: 'La altura de capa decide el detalle, el tiempo y la resistencia, y casi nadie la toca. Esta guía dice cuándo subirla y cuándo bajarla, y por qué una pieza que tarda demasiado no es un fallo.',
  autor: AUTOR,
  actualizado: '2026-10-11',
  minutos: 3,
  campos: ['layerHeight'],
  leeDelAnalisis: ['layerHeight'],
  diferencial: {
    contra: 'Los huecos, las rebabas o la separación entre capas',
    contraCorto: 'Huecos o separación',
    comprobaciones: [
      {
        id: 'escalones',
        mira: '¿Ves escalones en la superficie de la pieza?',
        si: 'Los escalones son el síntoma principal: la altura de capa es la resolución vertical y directamente visible.',
        no: 'Si no hay escalones pero sí huecos o rebabas, el problema no es la altura de capa.',
      },
      {
        id: 'rotura',
        mira: '¿La pieza se rompe justo por una línea de capa?',
        si: 'La rotura entre capas puede deberse a la altura, pero también a la temperatura o al material.',
        no: 'Si la rotura es por la pared o el relleno, el problema es la resistencia estructural, no la altura.',
      },
      {
        id: 'tiempo',
        mira: '¿La impresión tarda mucho más de lo esperado?',
        si: 'A menor altura de capa, más capas y más tiempo: es la relación directa entre altura y duración.',
        no: 'Si el tiempo es normal pero la calidad es mala, el problema puede ser otro ajuste.',
      },
    ],
    siNo: { guia: 'warping-pla', etiqueta: 'Warping y separación entre capas' },
  },
  variables: [
    {
      id: 'altura',
      etiqueta: 'Altura de capa',
      indicador: 'altura',
      para: 'Qué altura de capa usas o quieres usar: condiciona el detalle, el tiempo y el límite de boquilla.',
      necesaria: true,
      campos: ['layerHeight'],
      opciones: [
        { id: 'fina', etiqueta: 'Fina (0,08–0,10 mm)', detalle: 'Máximo detalle, tiempo largo' },
        { id: 'media', etiqueta: 'Media (0,15–0,20 mm)', detalle: 'Equilibrio entre detalle y tiempo' },
        { id: 'gruesa', etiqueta: 'Gruesa (0,28 mm o más)', detalle: 'Tiempo corto, capas visibles' },
      ],
    },
    {
      id: 'boquilla',
      etiqueta: 'Diámetro de boquilla',
      indicador: 'temperatura',
      para: 'El diámetro de la boquilla pone el techo y el suelo de la altura de capa.',
      opciones: [
        { id: '04', etiqueta: '0,4 mm', detalle: 'Boquilla estándar' },
        { id: '06', etiqueta: '0,6 mm', detalle: 'Boquilla grande' },
        { id: '08', etiqueta: '0,8 mm', detalle: 'Boquilla extragrande' },
      ],
    },
  ],
  conocimiento: [
    {
      id: 'resolucion-vertical',
      titulo: 'La altura de capa es la resolución vertical',
      puntos: [
        'La altura de capa define cuánto detalle tiene la pieza en el eje Z. A menor altura, mayor finura, pero el plano XY no se ve afectado.',
      ],
      indicador: 'altura',
      cuerpo: 'La altura de capa define cuánto detalle tiene la pieza en el eje Z. A menor altura, mayor finura, pero el plano XY no se ve afectado.',
      cita: {
        texto: 'we also regard the layer height as the vertical resolution of the model, that is, the lower the layer height, the higher the fineness of the model.',
        fuente: 'Bambu Lab Wiki',
      },
    },
    {
      id: 'altura-tiempo',
      titulo: 'Altura y tiempo de impresión',
      puntos: [
        'Elegir capas más altas acorta significativamente el tiempo a costa de capas más visibles.',
        'Para el mismo modelo, 0,08 mm tarda 1h 19m y 0,28 mm tarda 28m 27s.',
      ],
      indicador: 'general',
      cuerpo: 'Elegir capas más altas acorta significativamente el tiempo a costa de capas más visibles. Para el mismo modelo, 0,08 mm tarda 1h 19m y 0,28 mm tarda 28m 27s.',
      cifra: {
        valor: '1h 19m → 28m 27s',
        nota: 'Mismo modelo (Glowing Ghosts), altura 0,08 mm frente a 0,28 mm',
      },
      cita: {
        texto: '0.08mm layer height, printing time 1h 19m | 0.2mm layer height, printing time 36m 14s | 0.28mm layer height, printing time 28m 27s',
        fuente: 'Bambu Lab Wiki',
      },
    },
    {
      id: 'limite-superior',
      titulo: 'Límite superior: el techo de la boquilla',
      puntos: [
        'La altura de capa debe estar dentro de un rango razonable según el diámetro de la boquilla.',
        'Bambu recomienda el 20 %–70 % del diámetro; Prusa advierte que no debe superar el 80 %.',
      ],
      indicador: 'temperatura',
      cuerpo: 'La altura de capa debe estar dentro de un rango razonable según el diámetro de la boquilla. Bambu recomienda el 20 %–70 % del diámetro; Prusa advierte que no debe superar el 80 %.',
      cita: {
        texto: 'In general, the reasonable range of layer height should be 20% ~70% of the nozzle diameter.',
        fuente: 'Bambu Lab Wiki',
      },
    },
    {
      id: 'limite-inferior',
      titulo: 'Límite inferior: el suelo de la boquilla',
      puntos: [
        'Bambu permite bajar hasta el 20 % del diámetro (0,08 mm con boquilla de 0,4 mm).',
        'Prusa recomienda no bajar de 0,10 mm porque la mejora es menor y el tiempo mucho mayor.',
      ],
      indicador: 'temperatura',
      cuerpo: 'Bambu permite bajar hasta el 20 % del diámetro (0,08 mm con boquilla de 0,4 mm). Prusa recomienda no bajar de 0,10 mm porque la mejora es menor y el tiempo mucho mayor.',
      cita: {
        texto: 'Generally, we do not suggest going lower than 0.10 mm as the improvement in print quality with 0.07 or 0.05 mm layers is relatively minor with significantly longer print times.',
        fuente: 'Prusa Knowledge Base',
      },
    },
    {
      id: 'altura-variable',
      titulo: 'Altura de capa variable (adaptativa)',
      puntos: [
        'La altura variable permite definir regiones del modelo con diferente altura y suavizar la transición.',
        'Puede acortar significativamente el tiempo con un sacrificio mínimo de calidad.',
      ],
      indicador: 'altura',
      cuerpo: 'La altura variable permite definir regiones del modelo con diferente altura y suavizar la transición. Puede acortar significativamente el tiempo con un sacrificio mínimo de calidad.',
      cita: {
        texto: 'This can result in significantly shorter print times with minimal sacrifice to the print quality.',
        fuente: 'Prusa Knowledge Base',
      },
    },
    {
      id: 'sin-layerheight',
      titulo: 'Por qué el slicer puede no haber escrito la altura',
      puntos: [
        'El campo layerHeight es opcional en el análisis.',
        'Si el slicer no lo escribió en el G-code, la guía no puede precontestar la variable y tendrás que declararla a mano.',
      ],
      indicador: 'slicer',
      cuerpo: 'El campo layerHeight es opcional en el análisis. Si el slicer no lo escribió en el G-code, la guía no puede precontestar la variable y tendrás que declararla a mano.',
    },
  ],
  reglas: [
    {
      id: 'buscas-detalle',
      accion: 'Usa altura de capa fina',
      valor: '0,08–0,10 mm',
      porque: 'A menor altura, mayor resolución vertical y menos escalones visibles en la superficie.',
      alcance: 'Rango recomendado para detalle máximo con boquilla de 0,4 mm.',
      cuando: { altura: 'fina' },
      fuente: 'Bambu Lab Wiki',
    },
    {
      id: 'buscas-tiempo',
      accion: 'Usa altura de capa gruesa',
      valor: '0,28 mm o más',
      porque: 'A mayor altura, menos capas y menor tiempo de impresión, a costa de capas más visibles.',
      alcance: 'Rango recomendado para impresiones rápidas con boquilla de 0,4 mm.',
      cuando: { altura: 'gruesa' },
      fuente: 'Prusa Knowledge Base',
    },
    {
      id: 'limite-superior-04',
      accion: 'No superes el 70 % del diámetro de boquilla',
      valor: '0,28 mm',
      porque: 'Bambu recomienda mantener la altura entre el 20 % y el 70 % del diámetro para calidad óptima.',
      alcance: 'Boquilla de 0,4 mm: rango razonable 0,08–0,28 mm.',
      cuando: { boquilla: '04' },
      fuente: 'Bambu Lab Wiki',
    },
    {
      id: 'limite-superior-06',
      accion: 'No superes el 70 % del diámetro de boquilla',
      valor: '0,42 mm',
      porque: 'Bambu recomienda mantener la altura entre el 20 % y el 70 % del diámetro para calidad óptima.',
      alcance: 'Boquilla de 0,6 mm: 0,42 mm es el 70 % de 0,6 mm, aplicando la regla de Bambu; la fuente sólo da el ejemplo de 0,4 mm.',
      cuando: { boquilla: '06' },
      fuente: 'Bambu Lab Wiki',
    },
    {
      id: 'limite-superior-08',
      accion: 'No superes el 70 % del diámetro de boquilla',
      valor: '0,56 mm',
      porque: 'Bambu recomienda mantener la altura entre el 20 % y el 70 % del diámetro para calidad óptima.',
      alcance: 'Boquilla de 0,8 mm: 0,56 mm es el 70 % de 0,8 mm, aplicando la regla de Bambu; la fuente sólo da el ejemplo de 0,4 mm.',
      cuando: { boquilla: '08' },
      fuente: 'Bambu Lab Wiki',
    },
    {
      id: 'limite-inferior-04',
      accion: 'No bajes de 0,10 mm con boquilla de 0,4 mm',
      valor: '0,10 mm',
      porque: 'Prusa recomienda no bajar de 0,10 mm porque la mejora en calidad es menor y el tiempo mucho mayor.',
      alcance: 'Límite inferior recomendado por Prusa para boquilla de 0,4 mm.',
      cuando: { boquilla: '04' },
      fuente: 'Prusa Knowledge Base',
    },
    {
      id: 'altura-variable-ahorro',
      accion: 'Usa altura de capa variable para ahorrar tiempo',
      porque: 'La altura variable permite usar capas altas donde no se necesita detalle, acortando el tiempo con mínima pérdida de calidad.',
      alcance: 'Función del slicer que varía la altura según la zona del modelo.',
      cuando: { altura: 'fina' },
      fuente: 'Prusa Knowledge Base',
    },
  ],
  fueraDeAlcance: [
    {
      sintoma: 'La primera capa no se adhiere o se despega',
      porQue: 'La altura de primera capa es un ajuste distinto y tiene su propia guía.',
      guia: 'adhesion-primera-capa',
    },
    {
      sintoma: 'La pieza se levanta de la chapa o se deforma en las esquinas',
      porQue: 'El warping y la separación entre capas son problemas de adhesión y temperatura, no de altura.',
      guia: 'warping-pla',
    },
    {
      sintoma: 'La temperatura de boquilla no es la adecuada',
      porQue: 'La temperatura de boquilla afecta a la fusión y la adhesión entre capas, pero no es altura de capa.',
    },
    {
      sintoma: 'Hay separación entre capas o la pieza se delamina',
      porQue: 'La separación entre capas es un problema de unión, no de altura de capa.',
      guia: 'separaciones-entre-capas',
    },
  ],
  fuentes: [
    {
      url: 'https://wiki.bambulab.com/en/software/bambu-studio/layer-height',
      quien: 'Bambu Lab Wiki',
      que: 'Qué es la altura de capa y cómo se ajusta en Bambu Studio',
    },
    {
      url: 'https://help.prusa3d.com/article/layers-and-perimeters_1748',
      quien: 'Prusa Knowledge Base',
      que: 'Capas y perímetros: la relación con la boquilla y la resolución',
    },
    {
      url: 'https://help.prusa3d.com/article/variable-layer-height-function_1750',
      quien: 'Prusa Knowledge Base',
      que: 'La altura de capa variable (adaptativa)',
    },
    {
      url: 'https://wiki.bambulab.com/en/software/bambu-studio/adaptive-layer-height',
      quien: 'Bambu Lab Wiki',
      que: 'Altura de capa adaptativa en Bambu Studio',
    },
  ],
};
