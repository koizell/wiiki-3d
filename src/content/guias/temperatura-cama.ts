import type { Guia } from './tipos';
import { AUTOR } from './autor.ts';

/**
 * Temperatura de cama.
 *
 * La tercera guía, y la que justifica el formato mejor que ninguna.
 *
 * ## Por qué esta guía no puede ser un artículo
 *
 * Su contenido es, casi entero, una tabla. Las cifras de cama del PLA son seis, y
 * todas son ciertas; lo que las separa no es el fabricante sino el alcance, el
 * intervalo frente al objetivo, y si el número es de la cama o de la pieza. Ese
 * contenido en prosa son seis párrafos con las cifras incrustadas en frases, y
 * quien busca «qué número pongo» tiene que leerlos todos para descubrir que la
 * pregunta estaba mal.
 *
 * Aquí la pregunta es la variable: material y chapa. Y el resultado es una tabla
 * que se rellena mientras se lee.
 *
 * ## Lo que este fichero se niega a hacer
 *
 * A dar **una** cifra. Podría: con `material=pla` y `chapa=cool` sale 35–45 °C, y es
 * la respuesta correcta. Pero lo que no puede hacer es dejar de decir que las otras
 * cinco existen, porque el error real de la gente no es no tener la cifra: es tener
 * una —la que ha leído en un foro— y creer que es la única. Por eso las tres
 * tarjetas de cifras están siempre visibles y la última es la que avisa de que el
 * 65 °C de un hilo no es un techo.
 */
export const temperaturaCama: Guia = {
  slug: 'temperatura-cama',
  titulo: 'Temperatura de cama',
  resumen:
    'El PLA admite seis cifras de cama y todas son ciertas: lo que las separa es el alcance de cada fuente, no el fabricante.',
  resumenExtra:
    'Esta guía te dice cuál es la tuya y qué pasa si te pasas.',
  sintoma: '¿Qué número de cama pongo?',
  dibujo: 'cama',
  entrada: 'No hay un número de cama: hay seis para el PLA y dependen del alcance de cada fuente más que del fabricante. Esta guía te da la cifra que toca a la tuya y te dice dónde cae la que trae tu archivo.',
  autor: AUTOR,
  actualizado: '2026-10-21',
  minutos: 2,

  /*
   * El diferencial de esta guía.
   *
   * La primera versión ponía `contra: 'warping por otra causa'` y unas comprobaciones
   * que no eran un diferencial: preguntaban «¿tienes un problema o sólo quieres el
   * número?». El título salía «Antes de tocar nada: descártalo como warping por otra
   * causa», que no significa nada, y la intro, «Lo que más se confunde con esto es
   * warping por otra causa», tampoco.
   *
   * El problema era el dato, no el componente. `contra` es el nombre de **otro
   * diagnóstico** —lo que se confunde con éste—, y aquí ese es el warping. Lo que sí
   * es cierto, y por eso vale la pena mirar la guía, es que la temperatura de cama
   * aparece en los dos problemas; no es que uno sea el otro, es que el mismo ajuste
   * está en juego en los dos y hay que saber en cuál de los dos se está.
   *
   * Y `siNo` va a separaciones, que es a donde llevan las dos caras negativas. Es la
   * salida que importa: quien llega aquí con las capas sueltas por dentro no quiere la
   * cifra de cama, quiere el otro diagnóstico.
   */
  diferencial: {
    contra: 'warping',
    comprobaciones: [
      {
        id: 'base',
        mira: 'La base de la pieza: ¿está plana o arqueada hacia arriba?',
        si: 'Arqueada desde la cama. Es warping, y la temperatura de cama es una de las cinco cosas que hay que mirar.',
        no: 'Plana, con las capas sueltas por dentro. La cama sigue estando en juego, pero el diagnóstico es otro.',
      },
      {
        id: 'corte',
        mira: '¿El corte de la rotura viene limpio o desgarrado?',
        si: 'Desgarrado, con material arrancado: no llegó filamento. Cambiar la cama lo empeora, y el ajuste es de flujo.',
        no: 'Limpio, sin material: faltó adhesión entre capas. La temperatura entra, pero no es la primera variable.',
      },
      {
        id: 'alcance',
        mira: '¿El problema es sólo la primera capa o también las interiores?',
        si: 'Sólo la base: la cifra de cama es directamente el ajuste, y esta guía es lo que buscas.',
        no: 'También las capas del medio: hay dos variables en juego y el orden importa más que la cifra.',
      },
    ],
    siNo: { guia: 'separaciones-entre-capas', etiqueta: 'Separaciones entre capas' },
  },

  variables: [
    {
      id: 'material',
      etiqueta: 'Material',
      indicador: 'material',
      para: 'Cada material tiene su fila. No es una variación pequeña: entre el TPU y el PC hay más de sesenta grados.',
      necesaria: true,
      /*
       * Dos campos, y el segundo es el que obliga a explicar.
       *
       * En esta guía **la temperatura de cama es la cifra que se busca**, y las
       * opciones de esta variable la llevan escrita en su `detalle`: «PLA 35–65 °C»,
       * «PETG 60–80 °C». Por eso `bedTemp` aterriza aquí y no en una tarjeta
       * cualquiera: el dato que el archivo trae se compara con el rango de su fila
       * en el sitio donde están los rangos.
       *
       * Y no es una convención: `verify:guias` falla si un campo declarado no tiene
       * ancla, y si un campo tiene dos anclas distintas dentro de la misma guía.
       */
      campos: ['material', 'bedTemp'],
      opciones: [
        { id: 'pla', etiqueta: 'PLA', detalle: '35–65 °C' },
        { id: 'pla-cf', etiqueta: 'PLA-CF', detalle: '35–65 °C' },
        { id: 'petg', etiqueta: 'PETG', detalle: '60–80 °C' },
        { id: 'abs', etiqueta: 'ABS o ASA', detalle: '90–110 °C' },
        { id: 'pc', etiqueta: 'PC o PET-CF', detalle: '80–120 °C' },
        { id: 'tpu', etiqueta: 'TPU', detalle: '30–60 °C' },
        { id: 'pa', etiqueta: 'PA o nylon', detalle: '70–115 °C' },
      ],
    },
    {
      id: 'chapa',
      etiqueta: 'Chapa',
      indicador: 'cama',
      para: 'Esto es lo que hace que dos fuentes con lo mismo puesto den números distintos. Sin chapa, la cifra no está completa.',
      necesaria: true,
      opciones: [
        { id: 'cool', etiqueta: 'Cool Plate', detalle: 'PLA: 35–45 °C' },
        { id: 'textured', etiqueta: 'Textured PEI', detalle: 'PLA: 45–65 °C' },
        { id: 'smooth', etiqueta: 'Smooth PEI', detalle: 'PLA: 45–65 °C' },
        { id: 'engineering', etiqueta: 'Engineering Plate', detalle: 'PLA: 45–65 °C, con pegamento' },
        { id: 'acero', etiqueta: 'Acero liso o satinada' },
      ],
    },
    {
      id: 'problema',
      etiqueta: 'Qué te está pasando',
      indicador: 'general',
      para: 'Una cama demasiado fría y una demasiado caliente dan fallos distintos, y cada una tiene su mitad de la tabla.',
      opciones: [
        { id: 'nada', etiqueta: 'Nada raro, sólo el número' },
        { id: 'frio', etiqueta: 'No se pega, se suelta' },
        { id: 'caliente', etiqueta: 'La primera capa sale aplastada o no hay forma de sacarla' },
        { id: 'warping', etiqueta: 'Las esquinas se levantan' },
      ],
    },
  ],

  conocimiento: [
    {
      /*
       * La tarjeta de las seis cifras, y el sitio donde se cayó una.
       *
       * El título y el `resumen` de la guía dicen seis, y el cuerpo decía cinco:
       * contaba la fila por chapa de Bambu como una sola vez y no contaba ni el
       * 35–65 por filamento ni el objetivo de 55–65 de la página de warping de
       * Bambu. El `cifra` traía un 55 que el cuerpo no mencionaba, y se saltaba el
       * 45. **Seis apariciones son seis, y los seis números son estos.**
       */
      id: 'seis',
      titulo: 'Las seis cifras del PLA, y por qué todas son ciertas',
      puntos: [
        'No es que los fabricantes se confundan: cada una tiene un alcance distinto.',
        'La tabla por chapa de Bambu da 35–45 °C para la Cool Plate y 45–65 °C para las otras tres.',
        'Su tabla por filamento da 35–65 °C; y su página de warping un objetivo de 55–65 °C en Textured PEI.',
        'Prusa da 50–60 °C en su tabla de materiales y un 60 °C suelto en la ficha del PLA.',
        'Y el slicer repite el 50–60 de Prusa. Son seis apariciones y ninguna está equivocada.',
      ],
      indicador: 'slicer',
      cuerpo:
        'No es que los fabricantes se confundan: cada una tiene un alcance distinto. La tabla por chapa de Bambu da 35–45 °C para la Cool Plate y 45–65 °C para las otras tres; su tabla por filamento da 35–65 °C; y su página de warping un objetivo de 55–65 °C en Textured PEI. Prusa da 50–60 °C en su tabla de materiales y un 60 °C suelto en la ficha del PLA. Y el slicer repite el 50–60 de Prusa. Son seis apariciones y ninguna está equivocada.',
      cifra: { valor: '35 · 45 · 50 · 55 · 60 · 65 °C', nota: 'seis cifras para un solo material' },
    },
    {
      id: 'rango',
      titulo: 'Por qué un rango y no una cifra',
      puntos: [
        'La explicación está escrita, y es la única de las tres fuentes que la da.',
        'La mayoría de los materiales tienen un intervalo óptimo razonablemente amplio, de unos ±5 °C.',
        'Por eso las tablas dan intervalos y no un número.',
        'Los diez grados de diferencia entre el margen de Bambu y el de Prusa son una diferencia de margen, no de temperatura.',
      ],
      indicador: 'temperatura',
      cuerpo:
        'La explicación está escrita, y es la única de las tres fuentes que la da: la mayoría de los materiales tienen un intervalo óptimo razonablemente amplio, de unos ±5 °C. Por eso las tablas dan intervalos y no un número. Los diez grados de diferencia entre el margen de Bambu y el de Prusa son una diferencia de margen, no de temperatura.',
      cita: {
        texto:
          'Most materials have a relatively broad optimal range for bed temperature (typically +/-5°C)',
        fuente: 'www.orcaslicer.com',
      },
    },
    {
      id: 'frio',
      titulo: 'Si la cama está demasiado fría',
      puntos: [
        'El material puede no adherir bien, y eso lleva a warping, a unión débil entre capas o a despegue completo.',
        'En casos severos la pieza puede soltar del todo.',
        'Ojo al alcance: la fuente enumera esas tres cosas con "o", no como una escalera, y el desenlace grave lo marca como potencial.',
        'No como daño confirmado.',
      ],
      indicador: 'cama',
      cuerpo:
        'El material puede no adherir bien, y eso lleva a warping, a unión débil entre capas o a despegue completo. En casos severos la pieza puede soltar del todo. Ojo al alcance: la fuente enumera esas tres cosas con «o», no como una escalera, y el desenlace grave lo marca como potencial, no como daño confirmado.',
      cuando: { problema: 'frio' },
      cita: {
        texto:
          'leading to warping, weak layer bonding, or complete detachment. In severe cases, the printed part may dislodge entirely',
        fuente: 'www.orcaslicer.com',
      },
      enlaza: { guia: 'separaciones-entre-capas', etiqueta: 'Capas sueltas por dentro' },
    },
    {
      id: 'caliente',
      titulo: 'Si la cama está demasiado caliente',
      puntos: [
        'Las capas inferiores se recalientan y reblandecen demasiado, y el resultado es una deformación conocida como elephant foot.',
        'El borde inferior de la pieza se aplana y se sale del contorno.',
        'Con PETG, ABS, ASA y materiales similares hay un riesgo añadido.',
        'La adhesión puede quedar demasiado fuerte y se puede dañar la chapa PEI lisa.',
      ],
      indicador: 'calibracion',
      cuerpo:
        'Las capas inferiores se recalientan y reblandecen demasiado, y el resultado es una deformación conocida como elephant foot: el borde inferior de la pieza se aplana y se sale del contorno. Con PETG, ABS, ASA y materiales similares hay un riesgo añadido: la adhesión puede quedar demasiado fuerte y se puede dañar la chapa PEI lisa.',
      cuando: { problema: 'caliente' },
      cita: {
        texto:
          'the lower layers can overheat and soften excessively, resulting in deformation such as elephant foot',
        fuente: 'www.orcaslicer.com',
      },
    },
    {
      id: 'techo',
      titulo: 'Cómo se calcula un techo, y por qué aquí no se aplica',
      puntos: [
        'Existe una regla: usar la temperatura de transición vítrea del material y restarle 5–10 °C para estimar un límite superior seguro de cama.',
        'Es una regla y no un número, y no se puede aplicar al PLA aquí porque el Tg del PLA no lo da ninguna fuente de esta guía.',
        'Preferimos decir que falta el dato antes que inventar la cifra que saldría de restarle.',
      ],
      indicador: 'cama',
      cuerpo:
        'Existe una regla: usar la temperatura de transición vítrea del material y restarle 5–10 °C para estimar un límite superior seguro de cama. Es una regla y no un número, y no se puede aplicar al PLA aquí porque el Tg del PLA no lo da ninguna fuente de esta guía. Preferimos decir que falta el dato antes que inventar la cifra que saldría de restarle.',
      cuando: { material: ['pla', 'pla-cf'] },
    },
    {
      id: '65',
      titulo: 'El 65 °C no es un techo, y el 60 °C no siempre es de la cama',
      puntos: [
        'El 65 °C aparece en un hilo de foro como «(max 65°C)», y coincide con el extremo alto del intervalo de Bambu para la Textured PEI.',
        'Coincidir no es lo mismo: uno es un techo que un usuario le pone a otro en una conversación.',
        'El otro el extremo de un intervalo de fabricante para esa chapa.',
        'Y el 60 °C de la ficha del PLA aparece dos veces con dos significados.',
        'Como cama recomendada y como temperatura a la que la pieza se reblandece.',
        'Leer el segundo como "no pases de 60 de cama" es el error más fácil de cometer con esta fuente.',
      ],
      indicador: 'cama',
      cuerpo:
        'El 65 °C aparece en un hilo de foro como «(max 65°C)», y coincide con el extremo alto del intervalo de Bambu para la Textured PEI. Coincidir no es lo mismo: uno es un techo que un usuario le pone a otro en una conversación, el otro el extremo de un intervalo de fabricante para esa chapa. Y el 60 °C de la ficha del PLA aparece dos veces con dos significados: como cama recomendada y como temperatura a la que la pieza se reblandece. Leer el segundo como «no pases de 60 de cama» es el error más fácil de cometer con esta fuente.',
      cuando: { material: ['pla', 'pla-cf'] },
      enlaza: { guia: 'warping-pla', etiqueta: 'Warping en PLA' },
    },
    {
      id: 'limpieza',
      titulo: 'La cama también es limpieza',
      puntos: [
        'La temperatura de cama no basta por sí sola, y la fuente lo enumera: mantener la cama limpia —sin aceite ni huellas—.',
        'Una temperatura de cámara estable y una cama bien nivelada dan resultados fiables.',
        'Ninguna de las tres es la cifra.',
        'Y sobre PETG lisa hay un riesgo inverso al del apartado de cama caliente: la adhesión puede quedar demasiado fuerte.',
        'Con un separador como remedio.',
      ],
      indicador: 'calibracion',
      cuerpo:
        'La temperatura de cama no basta por sí sola, y la fuente lo enumera: mantener la cama limpia —sin aceite ni huellas—, una temperatura de cámara estable y una cama bien nivelada dan resultados fiables. Ninguna de las tres es la cifra. Y sobre PETG lisa hay un riesgo inverso al del apartado de cama caliente: la adhesión puede quedar demasiado fuerte, con un separador como remedio.',
    },
    {
      id: 'primera-capa',
      titulo: 'La primera capa tiene su propia temperatura',
      puntos: [
        'Hay una decisión separada para la primera capa y para el resto, y es por eso que los slicers tienen dos variables y no una por chapa.',
        'Subir la temperatura de la primera capa mejora la adhesión a la superficie, con el riesgo de deformaciones tipo elephant foot.',
        'Se aplica al material seleccionado, para primera capa y para el resto.',
        'Y sólo cuando el soporte de varios tipos de cama está activo en los ajustes de la impresora.',
      ],
      indicador: 'calibracion',
      cuerpo:
        'Hay una decisión separada para la primera capa y para el resto, y es por eso que los slicers tienen dos variables y no una por chapa. Subir la temperatura de la primera capa mejora la adhesión a la superficie, con el riesgo de deformaciones tipo elephant foot. Se aplica al material seleccionado, para primera capa y para el resto, y sólo cuando el soporte de varios tipos de cama está activo en los ajustes de la impresora.',
      enlaza: { guia: 'warping-pla', etiqueta: 'Ver el warping' },
    },
  ],

  reglas: [
    {
      id: 'pla',
      accion: 'Pon la cama en el rango de tu chapa',
      cuando: { material: ['pla', 'pla-cf'], chapa: 'cool' },
      valor: '35–45 °C',
      rango: { campo: 'bedTemp', min: 35, max: 45, unidad: '°C' },
      porque:
        'Es la fila por chapa de Bambu leída por su columna de la Cool Plate. Los 65 °C que circulan como cifra del PLA quedan fuera de este rango.',
      fuente: 'Bambu Lab',
      alcance:
        'Ninguna fuente de esta guía dice qué ocurre por salirse del rango en una Cool Plate. No lo publishes como daño a la chapa: no está documentado.',
    },
    {
      id: 'pla-pei',
      accion: 'Sube la cama',
      cuando: { material: ['pla', 'pla-cf'], chapa: ['textured', 'smooth', 'engineering'] },
      valor: '45–65 °C',
      rango: { campo: 'bedTemp', min: 45, max: 65, unidad: '°C' },
      porque:
        'Las tres chapas comparten el mismo rango para el PLA y es el otro extremo de la misma fila. Los 50–60 °C de Prusa y del slicer están dentro: no contradicen, son el mismo rango con distinta anchura.',
      fuente: 'Bambu Lab',
    },
    {
      id: 'petg',
      accion: 'Pon la cama a temperatura',
      cuando: { material: 'petg' },
      valor: '60–80 °C',
      rango: { campo: 'bedTemp', min: 60, max: 80, unidad: '°C' },
      porque:
        'Bambu da ese rango por filamento. La tabla del slicer no tiene fila de PETG, así que no cuenta como una tercera voz a favor ni en contra.',
      fuente: 'Bambu Lab',
      alcance:
        'Prusa da 70–90 °C para PETG (tabla de materiales) y Bambu da 60–80 °C. Son fabricantes distintos y no coinciden; el corpus no lo resuelve.',
    },
    {
      id: 'abs',
      accion: 'Pon la cama a temperatura',
      cuando: { material: 'abs' },
      valor: '90–110 °C',
      rango: { campo: 'bedTemp', min: 90, max: 110, unidad: '°C' },
      porque:
        'ABS y ASA son los dos materiales donde los tres fabricantes más se parecen: Bambu da 90–100 °C y Prusa 90–110 para ASA y 95–110 para ABS. La diferencia es de margen.',
      fuente: 'Bambu Lab, Prusa Research',
    },
    {
      id: 'pc',
      accion: 'Pon la cama a temperatura',
      cuando: { material: 'pc' },
      valor: '80–120 °C',
      rango: { campo: 'bedTemp', min: 80, max: 120, unidad: '°C' },
      porque:
        'PC y PET-CF son las filas más altas de las dos tablas: Bambu da 100–120 °C para el PC y 80–100 para el PET-CF, Prusa 100–115 para el PC. Es el rango más ancho del lote y el que deja menos margen.',
      fuente: 'Bambu Lab, Prusa Research',
    },
    {
      id: 'tpu',
      accion: 'Pon la cama en el rango bajo',
      cuando: { material: 'tpu' },
      valor: '30–60 °C',
      rango: { campo: 'bedTemp', min: 30, max: 60, unidad: '°C' },
      porque:
        'El TPU es el extremo opuesto al PC en la misma tabla. Bambu da 30–45 °C por filamento y 30–35 en Engineering Plate; el slicer da 40–60 °C.',
      fuente: 'Bambu Lab, OrcaSlicer',
    },
    {
      id: 'pa',
      accion: 'Pon la cama a temperatura',
      cuando: { material: 'pa' },
      valor: '70–115 °C',
      rango: { campo: 'bedTemp', min: 70, max: 115, unidad: '°C' },
      porque:
        'PA y nylon tienen la fila más ancha entre los materiales comunes: Prusa da 70–115 °C y el slicer 90–110 °C para nylon 6 y 12.',
      fuente: 'Prusa Research, OrcaSlicer',
    },
    {
      id: 'sube-poco',
      accion: 'Si pruebas un material nuevo, sube la cama en vez de recalibrarla',
      cuando: { problema: ['frio', 'nada'] },
      valor: '+5 a +10 °C sobre el valor del perfil',
      porque:
        'Es un incremento sobre lo que tu perfil ya tiene, no el valor del fabricante. La propia fuente lo distingue en la frase siguiente y dice que el slicer configura el material correctamente.',
      fuente: 'Prusa Research',
      alcance: 'Es un incremento sobre tu perfil. No es una cifra recomendada para ningún filamento concreto.',
    },
    {
      id: 'excesiva',
      accion: 'Baja la cama y usa un separador si no puedes despegar la pieza',
      cuando: { problema: 'caliente' },
      porque:
        'La adhesión demasiado fuerte sobre PEI lisa es un riesgo documentado con PETG, ABS y ASA, y la frase que lo advierte propone el separador como remedio. Baja la temperatura antes de forzar la pieza.',
      fuente: 'Prusa Research',
    },
  ],

  fueraDeAlcance: [
    {
      sintoma: 'Las capas se sueltan por dentro y la base está plana',
      porQue:
        'La unión débil entre capas es un problema distinto, con su propio diagnóstico. La temperatura de cama es una variable más ahí, no la respuesta.',
      guia: 'separaciones-entre-capas',
    },
    {
      sintoma: 'Las esquinas se levantan',
      porQue:
        'La cama es una de las cinco cosas que hay que mirar, y la chapa decide el número. La guía de warping tiene el orden completo.',
      guia: 'warping-pla',
    },
    {
      sintoma: 'Necesitas la cifra exacta de tu bobina concreta',
      porQue:
        'Las tres fuentes lo dicen: los valores pueden variar según la marca del filamento y el modelo de impresora, y hay que seguir las recomendaciones del fabricante de tu filamento. Aquí hay tablas genéricas, y se presentan como tales.',
    },
  ],

  fuentes: [
    {
      url: 'https://wiki.bambulab.com/en/general/filament-guide-material-table',
      quien: 'Bambu Lab',
      que: 'Tabla de materiales con cama por filamento y por chapa. Seis `<table>` reales.',
    },
    {
      url: 'https://help.prusa3d.com/filament-material-guide',
      quien: 'Prusa Research',
      que: 'Tabla de materiales con cama por material y columnas de chapa.',
    },
    {
      url: 'https://help.prusa3d.com/article/pla_2062',
      quien: 'Prusa Research',
      que: 'Ficha del PLA: cama recomendada a 60 °C y la pieza a 60 °C, dos veces con dos significados.',
    },
    {
      url: 'https://www.orcaslicer.com/wiki/material_settings/filament/material_temperatures.html',
      quien: 'OrcaSlicer',
      que: 'Tabla de once materiales: rangos, qué pasa si sobra o falta, y la regla del Tg.',
    },
    {
      url: 'https://help.prusa3d.com/article/first-layer-issues_1804',
      quien: 'Prusa Research',
      que: 'Primera capa: incremento de +5–10 °C y adhesión excesiva en PEI lisa.',
    },
    {
      url: 'https://wiki.bambulab.com/en/filament-acc/filament/print-quality/warping-falling-off-collapsing',
      quien: 'Bambu Lab',
      que: 'Página de warping: objetivo de cama de 55–65 °C para el PLA en Textured PEI, y 35 °C en Cool Plate.',
    },
    {
      url: 'https://forum.prusa3d.com/forum/original-prusa-i3-mk3s-mk3-how-do-i-print-this-printing-help/adjusting-settings-for-warping-of-pla/',
      quien: 'Foro de Prusa, 2019',
      que: 'Hilo con el antes y el intento de después. Bajó la cama y le fue peor.',
    },
  ],

  campos: ['bedTemp'],
  leeDelAnalisis: ['material', 'bedTemp'],
};