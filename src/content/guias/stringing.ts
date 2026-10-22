import type { Guia } from './tipos.ts';
import { AUTOR } from './autor.ts';

/**
 * Stringing y retracción.
 *
 * ## Lo que las fuentes no distinguen
 *
 * Las tres fuentes de este lote usan «stringing» y «oozing» **para el mismo
 * defecto**. Simplify3D abre su página con «Stringing (otherwise known as
 * oozing, whiskers, or "hairy" prints)» y OrcaSlicer habla de «the least
 * stringing and oozing» como si fueran la misma cosa. **Ninguna fuente define
 * el oozing como el goteo constante sin moverse**, y el grep de `wiki/raw/`
 * entero por «drip», «blob», «not moving» o «stationary» no devuelve ninguna.
 *
 * Por eso esta guía **no publica una distinción entre stringing y oozing**: se la
 * daría a sí misma, y en el `description` de la página, que es donde más se ve.
 * Lo que hay es un defecto y varias causas —temperatura alta, filamento húmedo,
 * retracción mal ajustada y velocidad de travel baja— y un orden de ajustes.
 */
export const stringing: Guia = {
  slug: 'stringing',
  titulo: 'Stringing y retracción',
  resumen:
    'Qué ajustes quitan los hilos de plástico y en qué orden probarlos: retracción, temperatura y travel speed.',
  resumenExtra:
    'Las causas que dan las fuentes: temperatura alta, filamento húmedo, retracción mal ajustada y travel lento. Y el orden de Simplify3D: distancia de retracción, velocidad de retracción, temperatura, no cruzar el contorno y velocidad de movimiento.',
  sintoma: 'Hilos finos entre piezas o goteo de la boquilla',
  dibujo: 'hotend',
  ilustracion: { src: '/wiki/stringing/ilustracion.png', alt: 'Dos torres impresas con hilos finos de plástico entre ellas y goteo de la boquilla' },
  entrada:
    'El stringing son hilos finos de plástico que aparecen entre piezas o en voladizos, causados por plástico que gotea de la boquilla mientras el extrusor se mueve. Es también lo que otras fuentes llaman oozing, whiskers o hairy prints: el mismo defecto, no dos, y no hay un ajuste distinto para cada nombre. Lo que hay son varias causas posibles y un orden para descartarlas, que es lo que esta guía te da.',
  autor: AUTOR,
  actualizado: '2026-10-21',
  minutos: 5,

  /*
   * El diferencial, y por qué no separa stringing de oozing.
   *
   * La versión anterior tenía dos comprobaciones sobre lo mismo: una preguntaba
   * si los hilos aparecían sólo durante los viajes y la otra si la boquilla
   * goteaba sin imprimir. Las dos caras —«es stringing» y «es oozing»—
   * repartían el mismo defecto en dos, y ese reparto no lo respaldaba ninguna
   * fuente. Peor: el `contra` las ponía en la misma lista que la temperatura alta
   * y el filamento húmedo, como si fueran diagnósticos distintos.
   *
   * Lo que sí está respaldado son **las causas**, y son cuatro: la temperatura
   * demasiado alta, el filamento húmedo, la retracción mal ajustada y la
   * velocidad de travel baja. El diferencial triagea esas cuatro, y la salida
   * `siNo` va a la guía de temperatura de boquilla, que es donde vive el caso
   * «mi temperatura no es la que dice el fabricante».
   */
  diferencial: {
    contra: 'temperatura de boquilla mal puesta',
    contraCorto: 'la temperatura de boquilla',
    comprobaciones: [
      {
        id: 'temperatura',
        mira: '¿La temperatura que tienes puesta es la que da el fabricante para ese filamento?',
        si: 'Es la que toca: la temperatura no es la causa, y lo que queda son la retracción, el travel speed y la humedad.',
        no: 'No es la que toca: el problema es la temperatura de boquilla, y esa guía la tiene.',
      },
      {
        id: 'humedad',
        mira: '¿Has impreso con este filamento recientemente sin secarlo, o ha estado expuesto al ambiente?',
        si: 'Filamento posiblemente húmedo: sécalo y comprueba que la boquilla esté instalada sin fugas antes de tocar otros ajustes.',
        no: 'Filamento seco: descarta la humedad y sigue con los ajustes de retracción.',
      },
      {
        id: 'viajes',
        mira: '¿Los hilos aparecen sobre todo en los viajes largos, por encima de los espacios abiertos?',
        si: 'Sí: el movimiento es lo que los produce. Sube la velocidad de travel o activa no cruzar el contorno.',
        no: 'No: los hilos no vienen del movimiento, así que la retracción es el ajuste.',
      },
    ],
    siNo: { guia: 'temperatura-hotend', etiqueta: 'Temperatura de hotend' },
  },

  variables: [
    {
      id: 'extrusor',
      etiqueta: 'Tipo de extrusor',
      indicador: 'maquina',
      para: 'La distancia de retracción depende del tipo: direct drive y Bowden necesitan valores completamente distintos.',
      necesaria: true,
      opciones: [
        { id: 'directo', etiqueta: 'Direct drive', detalle: 'Extrusor junto a la boquilla' },
        { id: 'bowden', etiqueta: 'Bowden', detalle: 'Extrusor lejano, filamento por tubo' },
      ],
    },
    {
      id: 'material',
      etiqueta: 'Material',
      indicador: 'material',
      para: 'PETG y TPU son más propensos al stringing y necesitan más retracción que PLA o ABS.',
      necesaria: true,
      opciones: [
        { id: 'pla', etiqueta: 'PLA', detalle: 'Goteo mínimo' },
        { id: 'abs', etiqueta: 'ABS', detalle: 'Goteo mínimo' },
        { id: 'petg', etiqueta: 'PETG', detalle: 'Más propenso al stringing' },
        { id: 'tpu', etiqueta: 'TPU', detalle: 'Más propenso al stringing' },
      ],
    },
    {
      id: 'temperatura',
      etiqueta: 'Temperatura de boquilla',
      indicador: 'temperatura',
      para: 'Si la temperatura está alta, el plástico es menos viscoso y gotea más fácilmente.',
      opciones: [
        { id: 'alta', etiqueta: 'Alta (por encima del rango habitual)' },
        { id: 'dentro', etiqueta: 'Dentro del rango del fabricante' },
      ],
    },
    {
      id: 'humedad',
      etiqueta: 'Humedad del filamento',
      indicador: 'entorno',
      para: 'El filamento húmedo puede causar stringing incluso con la retracción bien ajustada.',
      opciones: [
        { id: 'seco', etiqueta: 'Seco (almacenado bien o recién secado)' },
        { id: 'humedo', etiqueta: 'Posiblemente húmedo' },
        { id: 'desconocido', etiqueta: 'No lo sé' },
      ],
    },
    {
      id: 'travelSpeed',
      etiqueta: 'Velocidad de travel',
      indicador: 'velocidad',
      para: 'Si el travel es lento, la boquilla tiene más tiempo para gotear sobre aire.',
      opciones: [
        { id: 'alta', etiqueta: 'Alta' },
        { id: 'baja', etiqueta: 'Baja' },
      ],
    },
  ],

  conocimiento: [
    {
      id: 'que-es-stringing',
      titulo: 'Qué es el stringing',
      puntos: [
        'El stringing son hilos finos de plástico que quedan sobre el modelo impreso.',
        'Ocurre cuando plástico gotea de la boquilla mientras el extrusor se mueve a una nueva ubicación.',
      ],
      indicador: 'temperatura',
      cuerpo:
        'El stringing son hilos finos de plástico que quedan sobre el modelo impreso. Ocurre cuando plástico gotea de la boquilla mientras el extrusor se mueve a una nueva ubicación.',
      cita: {
        texto: 'This is typically due to plastic oozing out of the nozzle while the extruder is moving to a new location.',
        fuente: 'Simplify3D',
      },
    },
    {
      /*
       * La tarjeta que antes se llamaba «Qué es el oozing».
       *
       * Decía que el oozing es el goteo constante sin moverse, y que se arregla
       * con temperatura mientras el stringing se arregla con retracción. **Eso no
       * lo dice ninguna de las tres fuentes**: las tres usan los dos nombres para
       * el mismo defecto. Lo que sí se puede publicar es exactamente lo contrario,
       * y es lo que dice la cita: stringing, oozing, whiskers y hairy prints son
       * cuatro nombres de un solo defecto.
       */
      id: 'que-es-oozing',
      titulo: 'Oozing, whiskers y hairy prints: el mismo defecto',
      puntos: [
        'Las fuentes no distinguen entre stringing y oozing.',
        'Son dos nombres para el mismo defecto, y el que unas llaman whiskers y otras hairy prints es ese mismo defecto y no un cuarto.',
        'No hay dos fallos que se arreglen distinto; hay uno, y lo que cambia es la causa.',
      ],
      indicador: 'temperatura',
      cuerpo:
        'Las fuentes no distinguen entre stringing y oozing: son dos nombres para el mismo defecto, y el que unas llaman whiskers y otras hairy prints es ese mismo defecto y no un cuarto. No hay dos fallos que se arreglen distinto; hay uno, y lo que cambia es la causa.',
      cita: {
        texto: 'Stringing (otherwise known as oozing, whiskers, or "hairy" prints) occurs when small strings of plastic are left behind on a 3D printed model.',
        fuente: 'Simplify3D',
      },
    },
    {
      id: 'causa-temperatura',
      titulo: 'Causa: temperatura demasiado alta',
      puntos: [
        'Si la temperatura es demasiado alta, el plástico dentro de la boquilla se vuelve menos viscoso y gotea más fácilmente.',
        'Reducir la temperatura 5–10 grados puede tener un impacto significativo en la calidad de impresión.',
      ],
      indicador: 'temperatura',
      cuerpo:
        'Si la temperatura es demasiado alta, el plástico dentro de la boquilla se vuelve menos viscoso y gotea más fácilmente. Reducir la temperatura 5–10 grados puede tener un impacto significativo en la calidad de impresión.',
      cuando: { temperatura: 'alta' },
      cita: {
        texto: 'If the temperature is too high, the plastic inside the nozzle will become less viscous and will leak out of the nozzle much more easily.',
        fuente: 'Simplify3D',
      },
    },
    {
      id: 'causa-humedad',
      titulo: 'Causa: filamento húmedo',
      puntos: [
        'Si hay mucho stringing en la parte superior de la torre de calibración.',
        'Se recomienda secar el filamento y comprobar que la boquilla esté correctamente instalada sin fugas.',
      ],
      indicador: 'calibracion',
      cuerpo:
        'Si hay mucho stringing en la parte superior de la torre de calibración, se recomienda secar el filamento y comprobar que la boquilla esté correctamente instalada sin fugas.',
      cita: {
        texto: 'if there is still a lot of stringing at the top of the tower, it is recommended to dry your filament and ensure that your nozzle is properly installed without any leaks.',
        fuente: 'OrcaSlicer',
      },
    },
    {
      id: 'causa-retraccion',
      titulo: 'Causa: retracción insuficiente',
      puntos: [
        'Si la longitud de retracción es demasiado corta, no previene eficazmente el goteo.',
        'Si es demasiado larga, puede provocar obstrucciones o sub-extrusión.',
      ],
      indicador: 'general',
      cuerpo:
        'Si la longitud de retracción es demasiado corta, no previene eficazmente el goteo. Si es demasiado larga, puede provocar obstrucciones o sub-extrusión.',
      cita: {
        texto: "If the retraction length is too short, it may not effectively prevent oozing, while if it's too long, it can lead to clogs or under-extrusion.",
        fuente: 'OrcaSlicer',
      },
    },
    {
      id: 'causa-travel',
      titulo: 'Causa: velocidad de travel baja',
      puntos: [
        'Aumentar la velocidad de movimiento reduce el tiempo que el extrusor tiene para gotear entre piezas.',
        'Los movimientos cortos pueden ser lo suficientemente rápidos para que el plástico no tenga tiempo de gotear.',
        'Los movimientos largos tienen más probabilidades de crear hilos.',
      ],
      indicador: 'velocidad',
      cuerpo:
        'Aumentar la velocidad de movimiento reduce el tiempo que el extrusor tiene para gotear entre piezas. Los movimientos cortos pueden ser lo suficientemente rápidos para que el plástico no tenga tiempo de gotear; los movimientos largos tienen más probabilidades de crear hilos.',
      cita: {
        texto: 'increasing the movement speed of your machine can also reduce the amount of time that the extruder can ooze when moving between parts',
        fuente: 'Simplify3D',
      },
    },
    {
      id: 'valores-extrusor',
      titulo: 'Valores de retracción por extrusor',
      puntos: [
        'Direct drive: 0,5–2,0 mm. Bowden: hasta 15 mm según Simplify3D, o 1–6 mm según OrcaSlicer.',
        'Ambos rangos provienen de sus respectivas fuentes.',
        'PLA y ABS con stringing mínimo pueden necesitar solo 0,2–0,4 mm (según OrcaSlicer).',
      ],
      indicador: 'slicer',
      cuerpo:
        'Direct drive: 0,5–2,0 mm. Bowden: hasta 15 mm según Simplify3D, o 1–6 mm según OrcaSlicer. Ambos rangos provienen de sus respectivas fuentes. PLA y ABS con stringing mínimo pueden necesitar solo 0,2–0,4 mm (según OrcaSlicer).',
      cifra: {
        valor: '0,5–2 mm · 1–6 mm',
        nota: 'Direct drive 0,5–2 mm; Bowden 1–6 mm (OrcaSlicer) o hasta 15 mm (Simplify3D)',
      },
      cita: {
        texto: 'Most direct-drive extruders only require a retraction distance of 0.5-2.0mm, while some Bowden extruders may require a retraction distance as high as 15mm',
        fuente: 'Simplify3D',
      },
    },
    {
      id: 'velocidad-retraccion',
      titulo: 'Velocidad de retracción',
      puntos: [
        'El rango óptimo es 1200–6000 mm/min (20–100 mm/s).',
        'Si la velocidad de retracción es demasiado lenta.',
        'El plástico goteará lentamente a través de la boquilla y puede empezar a fugarse antes de que el extrusor termine de moverse.',
        'Si es demasiado rápida, el filamento puede separarse del plástico caliente dentro de la boquilla.',
        'O el engranaje puede desgastar trozos del filamento.',
      ],
      indicador: 'temperatura',
      cuerpo:
        'El rango óptimo es 1200–6000 mm/min (20–100 mm/s). Si la velocidad de retracción es demasiado lenta, el plástico goteará lentamente a través de la boquilla y puede empezar a fugarse antes de que el extrusor termine de moverse. Si es demasiado rápida, el filamento puede separarse del plástico caliente dentro de la boquilla, o el engranaje puede desgastar trozos del filamento.',
      cifra: {
        valor: '1200–6000 mm/min',
        nota: '20–100 mm/s',
      },
      cita: {
        texto: 'There is usually a sweet spot somewhere between 1200-6000 mm/min (20-100 mm/s) where retraction performs best.',
        fuente: 'Simplify3D',
      },
    },
    {
      id: 'materiales-propensos',
      titulo: 'Materiales propensos al stringing',
      puntos: [
        'PETG y TPU son más propensos al stringing que PLA o ABS, y pueden requerir longitudes de retracción más largas.',
        'PLA y ABS tienen un goteo mínimo; la torre de retracción puede parecer limpia desde el principio.',
      ],
      indicador: 'material',
      cuerpo:
        'PETG y TPU son más propensos al stringing que PLA o ABS, y pueden requerir longitudes de retracción más largas. PLA y ABS tienen un goteo mínimo; la torre de retracción puede parecer limpia desde el principio.',
      cuando: { material: ['petg', 'tpu'] },
      cita: {
        texto: 'Filaments like PETG and TPU are more prone to stringing, so they may require longer retraction lengths compared to PLA or ABS.',
        fuente: 'OrcaSlicer',
      },
    },
    {
      id: 'wipe',
      titulo: 'Wipe while retracting',
      puntos: [
        'El wipe mueve la boquilla a lo largo del último camino de extracción al retraer, para limpiar el material fugado de la boquilla.',
        'Puede minimizar blobs al imprimir una nueva pieza después de un desplazamiento.',
      ],
      indicador: 'temperatura',
      cuerpo:
        'El wipe mueve la boquilla a lo largo del último camino de extracción al retraer, para limpiar el material fugado de la boquilla. Puede minimizar blobs al imprimir una nueva pieza después de un desplazamiento.',
      cita: {
        texto: 'This moves the nozzle along the last extrusion path when retracting to clean any leaked material on the nozzle. This can minimize blobs when printing a new part after traveling.',
        fuente: 'OrcaSlicer',
      },
    },
    {
      id: 'avoid-crossing',
      titulo: 'Avoid crossing outline',
      puntos: [
        'Ajusta automáticamente la ruta de travel para que la boquilla tenga una distancia muy corta sobre espacios abiertos.',
        'O incluso evitar cruzar espacios abiertos por completo.',
        'Es la solución cuando los movimientos largos son los que producen los hilos.',
      ],
      indicador: 'temperatura',
      cuerpo:
        'Ajusta automáticamente la ruta de travel para que la boquilla tenga una distancia muy corta sobre espacios abiertos, o incluso evitar cruzar espacios abiertos por completo. Es la solución cuando los movimientos largos son los que producen los hilos.',
      cita: {
        texto: 'the software may be able to find a travel path that avoids crossing an open space all together',
        fuente: 'Simplify3D',
      },
    },
    {
      id: 'orden-ajustes',
      titulo: 'Orden de ajustes recomendado',
      puntos: [
        'Primero distancia de retracción, luego velocidad de retracción, luego temperatura, luego travel speed.',
        'Cada ajuste anterior puede eliminar el problema sin tocar los siguientes.',
        'Empezar por el final es cambiar tres cosas a la vez y no saber cuál funcionó.',
      ],
      indicador: 'temperatura',
      cuerpo:
        'Primero distancia de retracción, luego velocidad de retracción, luego temperatura, luego travel speed. Cada ajuste anterior puede eliminar el problema sin tocar los siguientes. Empezar por el final es cambiar tres cosas a la vez y no saber cuál funcionó.',
      cita: {
        texto: 'try increasing the retraction distance by 1mm and test again',
        fuente: 'Simplify3D',
      },
    },
    {
      id: 'travel-distance-threshold',
      titulo: 'Travel distance threshold',
      puntos: [
        'Solo activa la retracción cuando la distancia de travel supera este umbral.',
      ],
      indicador: 'general',
      cuerpo:
        'Solo activa la retracción cuando la distancia de travel supera este umbral.',
      cita: {
        texto: 'Only trigger retraction when the travel distance is longer than this threshold.',
        fuente: 'OrcaSlicer',
      },
    },
    {
      id: 'retract-on-layer-change',
      titulo: 'Retract on layer change',
      puntos: [
        'Fuerza una retracción en cada cambio de capa.',
      ],
      indicador: 'velocidad',
      cuerpo:
        'Fuerza una retracción en cada cambio de capa.',
      cita: {
        texto: 'This forces a retraction on layer changes.',
        fuente: 'OrcaSlicer',
      },
    },
    {
      id: 'extra-length-restart',
      titulo: 'Extra length on restart',
      puntos: [
        'Cantidad adicional de filamento empujado tras la retracción para compensar el filamento perdido.',
      ],
      indicador: 'material',
      cuerpo:
        'Cantidad adicional de filamento empujado tras la retracción para compensar el filamento perdido.',
      cita: {
        texto: 'When the retraction is compensated after changing tool, the extruder will push this additional amount of filament.',
        fuente: 'OrcaSlicer',
      },
    },
  ],

  reglas: [
    {
      id: 'subir-retraccion-directo',
      accion: 'Sube la distancia de retracción a 0,5–2 mm',
      valor: '0,5–2 mm',
      porque:
        'Una retracción demasiado corta no previene eficazmente el goteo. Es el primer ajuste del orden recomendado.',
      cuando: { extrusor: 'directo' },
      alcance:
        'Simplify3D: 0,5–2 mm direct drive; OrcaSlicer: direct drive 0–2 mm con paso de 0,1 mm.',
      fuente: 'Simplify3D',
    },
    {
      id: 'subir-retraccion-bowden',
      accion: 'Sube la distancia de retracción a 1–6 mm',
      valor: '1–6 mm',
      porque:
        'Una retracción demasiado corta no previene eficazmente el goteo. Es el primer ajuste del orden recomendado.',
      cuando: { extrusor: 'bowden' },
      alcance:
        'OrcaSlicer: Bowden 1–6 mm con paso de 0,2 mm. Simplify3D: hasta 15 mm.',
      fuente: 'OrcaSlicer',
    },
    {
      id: 'no-subir-retraccion',
      accion: 'No subas la retracción por encima del rango',
      porque:
        'La retracción excesiva puede provocar obstrucciones o sub-extrusión. Aumentar la retracción indiscriminadamente es la causa más común de atascos.',
      alcance:
        'OrcaSlicer: retracción excesiva causa obstrucciones o sub-extrusión. Es una advertencia general que aplica a cualquier tipo de extrusor y material, por eso no puede condicionarse a una variable concreta.',
      fuente: 'OrcaSlicer',
    },
    {
      id: 'velocidad-retraccion',
      accion: 'Ajusta la velocidad de retracción dentro de 1200–6000 mm/min',
      valor: '1200–6000 mm/min',
      porque:
        'Demasiado lenta: el plástico goteará por la boquilla antes de que el extrusor termine. Demasiado rápida: el filamento puede separarse del plástico caliente o el engranaje puede desgastar trozos.',
      alcance:
        'Simplify3D: rango óptimo 1200–6000 mm/min (20–100 mm/s). El mismo rango se aplica a direct drive y Bowden, por eso no depende del tipo de extrusor ni del material.',
      fuente: 'Simplify3D',
    },
    {
      id: 'bajar-temperatura',
      accion: 'Baja la temperatura 5–10 °C',
      valor: '5–10 °C',
      porque:
        'Si la temperatura es demasiado alta, el plástico se vuelve menos viscoso y gotea más fácilmente.',
      cuando: { temperatura: 'alta' },
      alcance: 'Simplify3D: bajar 5–10 °C puede tener un impacto significativo en la calidad de impresión.',
      fuente: 'Simplify3D',
    },
    {
      id: 'secar-filamento',
      accion: 'Seca el filamento',
      porque:
        'Si hay mucho stringing en la parte superior de la torre de calibración, secar el filamento es el primer paso recomendado.',
      cuando: { humedad: 'humedo' },
      alcance: 'OrcaSlicer: secar y comprobar que la boquilla esté correctamente instalada sin fugas.',
      fuente: 'OrcaSlicer',
    },
    {
      id: 'subir-travel',
      accion: 'Sube la velocidad de travel',
      porque:
        'Aumentar la velocidad de movimiento reduce el tiempo que el extrusor tiene para gotear entre piezas. Los movimientos largos sobre espacios abiertos son los que más hilos producen.',
      cuando: { travelSpeed: 'baja' },
      alcance: 'Simplify3D: mayor velocidad de travel = menos tiempo para gotear.',
      fuente: 'Simplify3D',
    },
    {
      id: 'habilitar-wipe',
      accion: 'Habilita wipe while retracting',
      porque:
        'Mueve la boquilla a lo largo del último camino de extracción al retraer para limpiar el material fugado. Puede minimizar blobs al imprimir una nueva pieza después de un travel.',
      alcance:
        'OrcaSlicer: ajuste de wipe while retracting. Es un ajuste general que beneficia a cualquier combinación de extrusor, material y temperatura, por eso no puede condicionarse a una variable concreta.',
      fuente: 'OrcaSlicer',
    },
    {
      id: 'habilitar-avoid-crossing',
      accion: 'Habilita avoid crossing outline',
      porque:
        'Ajusta automáticamente la ruta de travel para que la boquilla tenga una distancia muy corta sobre espacios abiertos, o incluso evitar cruzar espacios abiertos por completo.',
      alcance:
        'Simplify3D: ajuste de ruta de travel para minimizar la distancia sobre espacios abiertos. Es un ajuste general que reduce el stringing en cualquier combinación de variables, por eso no puede condicionarse a una concreta.',
      fuente: 'Simplify3D',
    },
  ],

  fueraDeAlcance: [
    {
      sintoma: 'Temperatura de boquilla como tema',
      porQue: 'La calibración completa de temperatura de boquilla tiene su propia guía.',
      guia: 'temperatura-hotend',
    },
    {
      sintoma: 'Torres de calibración de temperatura',
      porQue: 'La torre de temperatura como herramienta de calibración es un tema aparte.',
      guia: 'torre-temperatura',
    },
    {
      sintoma: 'Selección de material',
      porQue: 'La elección de material para una aplicación concreta es un tema aparte.',
      guia: 'material',
    },
    {
      sintoma: 'Warping y adhesión',
      porQue: 'El despegue de la cama y la unión entre capas son temas aparte.',
      guia: 'warping-pla',
    },
    {
      sintoma: 'Separación entre capas',
      porQue: 'La separación entre capas como fenómeno diagnóstico tiene su propia guía.',
      guia: 'separaciones-entre-capas',
    },
  ],

  fuentes: [
    {
      url: 'https://www.simplify3d.com/support/print-quality-troubleshooting/stringing-or-oozing/',
      quien: 'Simplify3D',
      que: 'Guía de solución de problemas de stringing y oozing: causas, valores de retracción, orden de ajustes.',
    },
    {
      url: 'https://github.com/SoftFever/OrcaSlicer/wiki/retraction_calib',
      quien: 'OrcaSlicer',
      que: 'Calibración de retracción: torre de calibración, valores por tipo de extrusor, interpretación.',
    },
    {
      url: 'https://github.com/SoftFever/OrcaSlicer/wiki/printer_extruder_retraction',
      quien: 'OrcaSlicer',
      que: 'Ajustes de retracción del extrusor: wipe, travel distance threshold, retract on layer change, extra length on restart.',
    },
  ],
};
