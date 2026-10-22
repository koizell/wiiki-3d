import type { Guia } from './tipos.ts';
import { AUTOR } from './autor.ts';

/**
 * La ruta de calibración: el orden, y las contradicciones que hay que declarar.
 *
 * Es la primera guía del sitio que **enruta** en vez de diagnosticar. Los siete
 * tests de calibración ya son siete guías, con sus criterios de lectura; aquí no
 * se repite ninguno de ellos. Lo que sí es propio de esta guía es lo que ningún
 * otro sitio tiene: qué orden recomienda cada quien, por qué ese orden es un
 * método y no un dato de fabricante, y qué contradicciones entre fuentes hay
 * que declarar en vez de resolver.
 *
 * Y las reglas no llevan el contenido del test: llevan el enlace a la guía que
 * lo desarrolla. Ése es el cuarto sitio donde la wiki se interconecta, y el que
 * hace posible una guía que enruta sin calcar el contenido.
 */
export const rutaDeCalibracion: Guia = {
  slug: 'ruta-de-calibracion',
  titulo: 'Ruta de calibración: qué orden sigue cada fabricante',
  resumen:
    'Qué orden siguen los siete tests de calibración, cómo llama cada firmware a la función de presión y qué contradicciones hay que declarar sin resolver.',
  sintoma: 'Quiero calibrar mi impresora entera y no sé por dónde empezar',
  dibujo: 'slicer',
  entrada:
    'Esta guía no diagnostica: enruta. Los siete tests de calibración ya están publicados por separado, con sus criterios de lectura, y lo que aquí importa es lo que no está en ninguna parte: el orden. Hay tres métodos publicados que se contradicen entre sí, y Prusa y Bambu no publican ninguno. Lo que sigue es la secuencia que se puede recomendar, con el motivo de cada paso, el enlace a la guía que lo explica y las contradicciones declaradas en vez de resueltas.',
  autor: AUTOR,
  actualizado: '2026-10-21',
  minutos: 10,
  /*
   * `campos` va vacío a propósito, y no es una omisión.
   *
   * `campos` dice qué **campo del panel** explica esta guía, y un campo no puede
   * pertenencer a dos guías. El `material` ya es de la guía `material`, y esta guía
   * no explica el campo: **enruta**. Lo que sí hace es leer el material del
   * archivo para declarar su variable, que es otra cosa, y va en
   * `leeDelAnalisis`.
   */
  leeDelAnalisis: ['material'],

  diferencial: {
    contra: 'un defecto concreto en la pieza y una ruta de calibración entera',
    contraCorto: 'un defecto o una ruta entera',
    comprobaciones: [
      {
        id: 'objetivo',
        mira: '¿Lo que quieres es dejar el equipo ajustado al máximo, sin un defecto concreto que explicar?',
        si: 'Sin un defecto que explicar no hay diagnóstico que hacer: lo que hay es una secuencia de tests, y el orden en que se hacen es lo que decide el resultado.',
        no: 'Si lo que hay es un defecto concreto —esquinas levantadas, hilos, capas abiertas— su diagnóstico tiene su propia guía, y una ruta entera no lo va a resolver.',
      },
      {
        id: 'cambio',
        mira: '¿Ha cambiado algo desde tu última calibración, o es la primera que haces?',
        si: 'Hay un motivo para volver a pasar la ruta: bobina o marca nueva, boquilla gastada o sustituida, o un ajuste de temperatura o de velocidad tocado en el perfil.',
        no: 'Si nada ha cambiado y ya tienes un perfil calibrado, repetir la ruta entera no va a mejorar la impresión: guarda el perfil que tienes.',
      },
      {
        id: 'material-ruta',
        mira: '¿El filamento es de los habituales (PLA, PETG, ABS) y no TPU?',
        si: 'Los materiales habituales se calibran con la secuencia completa de tests, y el valor de presión se vuelve a medir para esa combinación de impresora y filamento.',
        no: 'El TPU es material muy blando y la calibración falla a menudo con él: tiene su propia guía, y la ruta no aplica igual.',
      },
    ],
    siNo: { guia: 'tpu-flexible', etiqueta: 'Si tu filamento es TPU, la ruta no aplica igual' },
  },

  variables: [
    {
      id: 'slicer',
      etiqueta: 'Slicer',
      indicador: 'slicer',
      para: 'Cada programa guarda los valores en un sitio distinto, y el de PrusaSlicer no es el de los demás.',
      necesaria: true,
      opciones: [
        { id: 'prusa', etiqueta: 'PrusaSlicer', detalle: 'El K va en Filament Settings, no en el G-code de impresora' },
        { id: 'bambu', etiqueta: 'Bambu Studio', detalle: 'El Factor K se guarda en la impresora' },
        { id: 'orca', etiqueta: 'OrcaSlicer', detalle: 'PA y flow ratio en el perfil de material' },
        { id: 'cura', etiqueta: 'Cura', detalle: 'El K se añade a mano en el script de inicio' },
        { id: 'simplify3d', etiqueta: 'Simplify3D', detalle: 'El K se añade a mano en el script de inicio' },
        { id: 'otro', etiqueta: 'Otro o no lo sé', detalle: 'El valor acaba en el G-code o en el perfil de material' },
      ],
    },
    {
      id: 'firmware',
      etiqueta: 'Firmware',
      indicador: 'maquina',
      para: 'La función de presión tiene un nombre y una escala distintos en cada firmware, y el valor no se porta entre ellos.',
      necesaria: true,
      opciones: [
        { id: 'prusa', etiqueta: 'Prusa (Linear Advance)', detalle: 'K-value por material, escrito como M900 Kxx' },
        { id: 'duet', etiqueta: 'Duet3D / RepRap', detalle: 'El parámetro se expresa en segundos' },
        { id: 'bambu', etiqueta: 'Bambu (Flow Dynamics)', detalle: 'Factor K propio, guardado en la impresora' },
        { id: 'marlin', etiqueta: 'Marlin', detalle: 'K v1.5 en mm/mm/s' },
        { id: 'klipper', etiqueta: 'Klipper', detalle: 'PA sin unidades, con SET_PRESSURE_ADVANCE' },
        { id: 'otro', etiqueta: 'Otro o no lo sé', detalle: 'La guía explica el nombre de cada uno, no el tuyo' },
      ],
    },
    {
      id: 'extrusor',
      etiqueta: 'Extrusor',
      indicador: 'maquina',
      para: 'La longitud del tubo cambia la escala del valor de presión y el rango de retracción: es lo que separa una cifra de otra.',
      necesaria: true,
      opciones: [
        { id: 'directo', etiqueta: 'Direct drive', detalle: 'Del extrusor a la boquilla sin tubo' },
        { id: 'bowden', etiqueta: 'Bowden', detalle: 'Hay tubo, y su longitud manda' },
        { id: 'desconocido', etiqueta: 'No lo sé', detalle: 'Los rangos de Bowden te sirven de cota superior' },
      ],
    },
    {
      id: 'material',
      etiqueta: 'Material',
      indicador: 'material',
      para: 'El ajuste depende de la combinación de filamento e impresora, y hay materiales en los que la calibración falla.',
      campos: ['material'],
      opciones: [
        { id: 'pla', etiqueta: 'PLA' },
        { id: 'petg', etiqueta: 'PETG' },
        { id: 'abs', etiqueta: 'ABS o ASA' },
        { id: 'tpu', etiqueta: 'TPU', detalle: 'La calibración automática falla a menudo con él' },
        { id: 'otro', etiqueta: 'Otro' },
      ],
    },
    {
      id: 'motivo',
      etiqueta: '¿Por qué recalibras?',
      indicador: 'general',
      para: 'No todos los cambios obligan a repetir los siete tests: esto decide qué pasos hay que rehacer.',
      opciones: [
        { id: 'bobina', etiqueta: 'Bobina o marca nueva', detalle: 'El valor de presión es específico del filamento' },
        { id: 'boquilla', etiqueta: 'Boquilla gastada o sustituida', detalle: 'Más fricción o tolerancias de fábrica distintas' },
        { id: 'ajustes', etiqueta: 'Toqué la temperatura o la velocidad', detalle: 'Bambu obliga a recalibrar en ese caso' },
        { id: 'nada', etiqueta: 'No ha cambiado nada', detalle: 'Guarda el perfil que ya tienes' },
        { id: 'primera', etiqueta: 'Primera calibración', detalle: 'Es el caso para el que existe la ruta completa' },
      ],
    },
  ],

  conocimiento: [
    {
      id: 'tres-ordenes',
      titulo: 'Hay tres órdenes, y se contradicen',
      puntos: [
        'Control3D: temperatura, flujo, PA, velocidad volumétrica, retracciones, tolerancias, voladizos y pieza final.',
        'OrcaSlicer: temperatura, velocidad volumétrica máxima, PA, flujo, retracciones, grupo avanzado y tolerancias al final.',
        'Duet3D publica sólo un tramo: Input Shaping, PA y retracción.',
        'La contradicción está en lo que va antes: el flujo es el segundo paso de un orden y el cuarto del otro.',
      ],
      indicador: 'calibracion',
      cuerpo:
        'Control3D: temperatura, flujo, PA, velocidad volumétrica, retracciones, tolerancias, voladizos y pieza final. OrcaSlicer: temperatura, velocidad volumétrica máxima, PA, flujo, retracciones, grupo avanzado y tolerancias al final. Duet3D publica sólo un tramo: Input Shaping, PA y retracción. La contradicción está en lo que va antes: el flujo es el segundo paso de un orden y el cuarto del otro.',
      cita: {
        texto: 'Do it last, as the result depends on every calibration above',
        fuente: 'OrcaSlicer',
      },
    },
    {
      id: 'sin-orden-canonico',
      titulo: 'No hay un orden canónico',
      puntos: [
        'Prusa y Bambu no publican un orden de calibración: es una ausencia de dato, no un orden distinto.',
        'Y no se puede reconstruir su secuencia a partir de la de los demás.',
        'El de OrcaSlicer es el único que razona cada paso con una dependencia explícita, y es documentación oficial.',
        'El de Control3D es el método de un blog de autor, que sólo justifica el orden por dependencias entre parámetros.',
      ],
      indicador: 'calibracion',
      cuerpo:
        'Prusa y Bambu no publican un orden de calibración: es una ausencia de dato, no un orden distinto, y no se puede reconstruir su secuencia a partir de la de los demás. El de OrcaSlicer es el único que razona cada paso con una dependencia explícita, y es documentación oficial. El de Control3D es el método de un blog de autor, que sólo justifica el orden por dependencias entre parámetros.',
      cita: {
        texto: 'algunos parámetros afectan directamente a los siguientes',
        fuente: 'Control3D',
      },
    },
    {
      id: 'pa-vocabulario',
      titulo: 'El mismo defecto, con cinco nombres',
      puntos: [
        'Bambu describe la esquina del K bajo como abombada y redondeada; Prusa dice que con blobs hay que subir el K.',
        'Duet3D mira el final del perímetro antes del cambio de capa y la costura Z; Klipper mira las capas de la torre.',
        'Marlin lo cuenta así: K bajo da línea "starved" al acelerar y blob al decelerar; K alto, exceso al arrancar y hambre al decelerar.',
        'La familia abombado / hueco coincide en el lado del valor: lo que cambia es el vocabulario y el punto donde se mira.',
      ],
      indicador: 'calibracion',
      cuerpo:
        'Bambu describe la esquina del K bajo como abombada y redondeada; Prusa dice que con blobs hay que subir el K. Duet3D mira el final del perímetro antes del cambio de capa y la costura Z; Klipper mira las capas de la torre. Marlin lo cuenta así: K bajo da línea «starved» al acelerar y blob al decelerar; K alto, exceso al arrancar y hambre al decelerar. La familia abombado / hueco coincide en el lado del valor: lo que cambia es el vocabulario y el punto donde se mira.',
      cita: {
        texto: 'If sharp corners have blobs, increase the K value. If you see missing filament, decrease the K value.',
        fuente: 'Prusa Research',
      },
      enlaza: { guia: 'flow-rate', etiqueta: 'Los patrones, uno a uno' },
    },
    {
      id: 'pa-esquina-redondeada',
      titulo: 'La misma forma, en lados opuestos',
      puntos: [
        'Bambu llama "esquina redondeada y abombada" a la del K bajo; Klipper llama "rounded corners" a la del PA alto.',
        'La misma forma queda atribuida a lados opuestos del rango: es un choque frontal entre las dos fuentes.',
        'Por eso no se puede decir "K bajo = abombado" sin decir de qué patrón se mira y desde qué lado.',
        'La regla que sí es común a todas: se elige el valor en el que la línea o la forma es más uniforme.',
      ],
      indicador: 'calibracion',
      cuerpo:
        'Bambu llama «esquina redondeada y abombada» a la del K bajo; Klipper llama «rounded corners» a la del PA alto. La misma forma queda atribuida a lados opuestos del rango: es un choque frontal entre las dos fuentes. Por eso no se puede decir «K bajo = abombado» sin decir de qué patrón se mira y desde qué lado. La regla que sí es común a todas: se elige el valor en el que la línea o la forma es más uniforme.',
      cita: {
        texto:
          'Layers below the ideal pressure_advance setting will have blobbing at the corners, and layers above the ideal setting can lead to rounded corners and poor extrusion leading up to the corner.',
        fuente: 'Klipper3d',
      },
      enlaza: { guia: 'flow-rate', etiqueta: 'El patrón de cada firmware' },
    },
    {
      id: 'k-escala',
      titulo: 'Una K sin unidades: Prusa, Bambu y Klipper',
      puntos: [
        'Prusa da 0,05 para PLA en boquilla de 0,4 mm y 0,04 en 0,6 mm: son K-values de fabricante, no una recomendación universal.',
        'Bambu usa un Factor K propio: sus ejemplos van de 0,006 a 0,024, y son valores de ejemplo de su método.',
        'Klipper llama PA al mismo parámetro y da un rango típico de 0,050 a 1,000.',
        'Las tres son constantes proporcionales sin unidades: son magnitudes distintas y no se comparan entre sí.',
      ],
      indicador: 'calibracion',
      cuerpo:
        'Prusa da 0,05 para PLA en boquilla de 0,4 mm y 0,04 en 0,6 mm: son K-values de fabricante, no una recomendación universal. Bambu usa un Factor K propio: sus ejemplos van de 0,006 a 0,024, y son valores de ejemplo de su método. Klipper llama PA al mismo parámetro y da un rango típico de 0,050 a 1,000. Las tres son constantes proporcionales sin unidades: son magnitudes distintas y no se comparan entre sí.',
      cifra: {
        valor: '0,05 · 0,006–0,024 · 0,050–1,000',
        nota: 'Prusa, Bambu y Klipper: escalas sin unidades, sin comparación posible entre ellas',
      },
      enlaza: { guia: 'flow-rate', etiqueta: 'La escala de cada firmware' },
      cuando: { firmware: ['prusa', 'bambu', 'klipper', 'otro'] },
    },
    {
      id: 'k-escala-unidades',
      titulo: 'Con unidades: mm/mm/s y segundos',
      puntos: [
        'Marlin v1.5 expresa el K en mm/mm/s, con valores típicos de 0,1 a 2,0.',
        'Duet3D lo da en segundos con M572: 0,025 en directa y hasta 0,7 o 2,0 en Bowden largo, y los llama puntos de partida.',
        'La función es la misma con otra magnitud: velocidad pedida más K por la aceleración del extrusor.',
        'El 0,05 de Prusa y el S0.025 de Duet3D no son el mismo número con otro nombre: son magnitudes distintas.',
      ],
      indicador: 'calibracion',
      cuerpo:
        'Marlin v1.5 expresa el K en mm/mm/s, con valores típicos de 0,1 a 2,0. Duet3D lo da en segundos con M572: 0,025 en directa y hasta 0,7 o 2,0 en Bowden largo, y los llama puntos de partida. La función es la misma con otra magnitud: velocidad pedida más K por la aceleración del extrusor. El 0,05 de Prusa y el S0.025 de Duet3D no son el mismo número con otro nombre: son magnitudes distintas.',
      cifra: {
        valor: 'mm/mm/s · segundos',
        nota: 'Marlin v1.5 y Duet3D: el mismo fenómeno medido en unidades distintas',
      },
      cita: {
        texto:
          'actual_extrusion_speed = requested_extrusion_speed + (K * current_extruder_acceleration)',
        fuente: 'Duet3D',
      },
      enlaza: { guia: 'flow-rate', etiqueta: 'La escala de cada firmware' },
      cuando: { firmware: ['marlin', 'duet'] },
    },
    {
      id: 'pa-alta-retraccion',
      titulo: 'PA alta y retracción: un efecto secundario',
      puntos: [
        'Con mucha PA, el extrusor puede retraer filamento de verdad al final del movimiento.',
        'Si ese movimiento va seguido de un viaje con retracción, la retracción total puede ser excesiva para el hotend.',
        'Duet3D recomienda reducir la retracción al activar el PA, no aumentarla.',
        'Con el jerk del extrusor demasiado bajo, la aceleración queda restringida y la impresión se ralentiza.',
      ],
      indicador: 'calibracion',
      cuerpo:
        'Con mucha PA, el extrusor puede retraer filamento de verdad al final del movimiento. Si ese movimiento va seguido de un viaje con retracción, la retracción total puede ser excesiva para el hotend. Duet3D recomienda reducir la retracción al activar el PA, no aumentarla. Con el jerk del extrusor demasiado bajo, la aceleración queda restringida y la impresión se ralentiza.',
      enlaza: { guia: 'stringing', etiqueta: 'Calibrar la retracción' },
      cuando: { firmware: 'duet' },
    },
    {
      id: 'retraccion-rangos',
      titulo: 'La retracción en Bowden: tres valores',
      puntos: [
        'Control3D sitúa el límite "aproximadamente entre 6 y 7 mm", según la longitud del tubo.',
        'OrcaSlicer recorre 1–6 mm con paso de 0,2 mm, y Simplify3D admite hasta 15 mm.',
        'Los dos primeros se solapan en el 6 mm y los dos quedan muy por debajo del techo de Simplify3D.',
        'El paso de 0,2 mm está corroborado por OrcaSlicer; los límites de 2 mm y de 6–7 mm son de una sola fuente.',
      ],
      indicador: 'calibracion',
      cuerpo:
        'Control3D sitúa el límite «aproximadamente entre 6 y 7 mm», según la longitud del tubo. OrcaSlicer recorre 1–6 mm con paso de 0,2 mm, y Simplify3D admite hasta 15 mm. Los dos primeros se solapan en el 6 mm y los dos quedan muy por debajo del techo de Simplify3D. El paso de 0,2 mm está corroborado por OrcaSlicer; los límites de 2 mm y de 6–7 mm son de una sola fuente.',
      cifra: {
        valor: '1–6 · 6–7 · hasta 15 mm',
        nota: 'OrcaSlicer, Control3D y Simplify3D: tres valores para el mismo Bowden, sin resolver',
      },
      cita: {
        texto: 'el límite puede situarse aproximadamente entre 6 y 7 mm',
        fuente: 'Control3D',
      },
      enlaza: { guia: 'stringing', etiqueta: 'Cómo se calibra la retracción' },
      cuando: { extrusor: ['bowden', 'desconocido'] },
    },
    {
      id: 'retraccion-directa',
      titulo: 'En extrusión directa, el límite es mucho más bajo',
      puntos: [
        'Control3D dice que en extrusión directa 2 mm ya sería un valor muy elevado.',
        'Es una sola fuente, un blog de autor, y el material cocinado la marca como sin corroborar.',
        'Los tres órdenes ponen la retracción después del PA y del flujo, así que es el paso que menos se mueve.',
        'Si los hilos siguen apareciendo, esa fuente manda revisar antes la temperatura, el flujo y el PA.',
      ],
      indicador: 'calibracion',
      cuerpo:
        'Control3D dice que en extrusión directa 2 mm ya sería un valor muy elevado. Es una sola fuente, un blog de autor, y el material cocinado la marca como sin corroborar. Los tres órdenes ponen la retracción después del PA y del flujo, así que es el paso que menos se mueve. Si los hilos siguen apareciendo, esa fuente manda revisar antes la temperatura, el flujo y el PA.',
      enlaza: { guia: 'stringing', etiqueta: 'Cómo se calibra la retracción' },
      cuando: { extrusor: 'directo' },
    },
    {
      id: 'automatico',
      titulo: 'La calibración automática no sustituye a los tests',
      puntos: [
        'Las calibraciones automáticas de flujo o PA son un punto de partida, no la garantía del mejor resultado.',
        'Pueden variar entre trabajos y hacen que la misma pieza no se reproduzca siempre igual.',
        'La propia wiki de Bambu llama "fully automated" a la suya y a la vez enumera los casos en que no es fiable.',
        'Un perfil calibrado a mano reduce variables y da la referencia con la que comparar la máquina.',
      ],
      indicador: 'calibracion',
      cuerpo:
        'Las calibraciones automáticas de flujo o PA son un punto de partida, no la garantía del mejor resultado. Pueden variar entre trabajos y hacen que la misma pieza no se reproduzca siempre igual. La propia wiki de Bambu llama «fully automated» a la suya y a la vez enumera los casos en que no es fiable. Un perfil calibrado a mano reduce variables y da la referencia con la que comparar la máquina.',
      cita: { texto: 'fully automated', fuente: 'Bambu Lab' },
    },
    {
      id: 'bambu-recalibrar',
      titulo: 'Cuándo hay que volver a calibrar',
      puntos: [
        'Filamento nuevo de otra marca o de otro modelo.',
        'Boquilla gastada, por más fricción, o boquilla sustituida, por tolerancias de fabricación.',
        'Cambio de la velocidad volumétrica máxima o de la temperatura de impresión de los ajustes del filamento.',
        'Es la lista de Bambu, y es la razón por la que el orden importa: un ajuste de más arriba cambia lo de más abajo.',
      ],
      indicador: 'calibracion',
      cuerpo:
        'Filamento nuevo de otra marca o de otro modelo. Boquilla gastada, por más fricción, o boquilla sustituida, por tolerancias de fabricación. Cambio de la velocidad volumétrica máxima o de la temperatura de impresión de los ajustes del filamento. Es la lista de Bambu, y es la razón por la que el orden importa: un ajuste de más arriba cambia lo de más abajo.',
    },
    {
      id: 'tpu-no-fiable',
      titulo: 'Con TPU, la calibración no es fiable',
      puntos: [
        'Bambu cuenta el material muy blando, como el TPU, entre los casos con alta probabilidad de fallo de la calibración.',
        'Con hotends de 0,2 mm los resultados automáticos también son imprecisos, y se recomienda el método manual.',
        'Los hotends de terceros, sobre todo en A1 y H2D, pueden dar valores inexactos con el sensor de eddy current.',
        'El TPU tiene su propia guía: la ruta de calibración no es el camino para él.',
      ],
      indicador: 'material',
      cuerpo:
        'Bambu cuenta el material muy blando, como el TPU, entre los casos con alta probabilidad de fallo de la calibración. Con hotends de 0,2 mm los resultados automáticos también son imprecisos, y se recomienda el método manual. Los hotends de terceros, sobre todo en A1 y H2D, pueden dar valores inexactos con el sensor de eddy current. El TPU tiene su propia guía: la ruta de calibración no es el camino para él.',
      enlaza: { guia: 'tpu-flexible', etiqueta: 'La guía del TPU' },
      cuando: { material: 'tpu' },
    },
    {
      id: 'nombres-no-se-portan',
      titulo: 'Los tests tienen ancestros distintos, y el nombre no viaja',
      puntos: [
        'El test de flujo y el de retracción de OrcaSlicer están inspirados en SuperSlicer.',
        'El método PA Line viene del K-factor Calibration Pattern de Marlin, y el PA Tower, de Klipper.',
        'La torre de temperatura es un remix de la Smart compact temperature calibration tower.',
        'El test de caudal máximo es de CNC Kitchen: una "torre de PA" no es el mismo test en un sitio que en otro.',
      ],
      indicador: 'calibracion',
      cuerpo:
        'El test de flujo y el de retracción de OrcaSlicer están inspirados en SuperSlicer. El método PA Line viene del K-factor Calibration Pattern de Marlin, y el PA Tower, de Klipper. La torre de temperatura es un remix de la Smart compact temperature calibration tower. El test de caudal máximo es de CNC Kitchen: una «torre de PA» no es el mismo test en un sitio que en otro.',
    },
    {
      id: 'valor-prusa',
      titulo: 'Dónde vive el valor en PrusaSlicer',
      puntos: [
        'El K-value está en el bloque de G-code personalizado de la pestaña Filament Settings, no en el de la impresora.',
        'En Cura y Simplify3D hay que añadir M900 Kxx al script de inicio a mano, y cambiarlo al cambiar de material.',
        'Prusa advierte de que cambiar los K-values se recomienda sólo a usuarios con experiencia, y de hacer copia antes.',
      ],
      indicador: 'slicer',
      cuerpo:
        'El K-value está en el bloque de G-code personalizado de la pestaña Filament Settings, no en el de la impresora. En Cura y Simplify3D hay que añadir M900 Kxx al script de inicio a mano, y cambiarlo al cambiar de material. Prusa advierte de que cambiar los K-values se recomienda sólo a usuarios con experiencia, y de hacer copia antes.',
      enlaza: { guia: 'flow-rate', etiqueta: 'Calibrar el flujo' },
      cuando: { slicer: 'prusa' },
    },
    {
      id: 'valor-bambu-orca',
      titulo: 'Dónde vive el valor en Bambu Studio y OrcaSlicer',
      puntos: [
        'En OrcaSlicer el PA y el flow ratio van en el perfil de material: enable_pressure_advance y pressure_advance.',
        'En Bambu Studio el Factor K se guarda en la impresora, en Calibration → Flow Dynamics, y también en el perfil del filamento.',
        'Bambu aplica el K manual al mismo tipo de filamento y de boquilla del archivo de PA, con un conmutador activo por defecto.',
        'Se puede crear un perfil de PA sin calibrar, para fijar una compensación a un filamento que ya conoces.',
      ],
      indicador: 'slicer',
      cuerpo:
        'En OrcaSlicer el PA y el flow ratio van en el perfil de material: enable_pressure_advance y pressure_advance. En Bambu Studio el Factor K se guarda en la impresora, en Calibration → Flow Dynamics, y también en el perfil del filamento. Bambu aplica el K manual al mismo tipo de filamento y de boquilla del archivo de PA, con un conmutador activo por defecto. Se puede crear un perfil de PA sin calibrar, para fijar una compensación a un filamento que ya conoces.',
      cita: {
        texto: 'Whether PA parameters apply to the same type of filament and nozzle',
        fuente: 'Bambu Lab',
      },
      cuando: { slicer: ['bambu', 'orca'] },
    },
    {
      id: 'valor-gcode',
      titulo: 'Cuando el valor va dentro del G-code',
      puntos: [
        'En Cura y Simplify3D el K no tiene campo propio: se añade M900 Kxx al script de inicio, a mano.',
        'Duet3D lo hace con M572 D0 S0.1, donde D es la unidad de extrusor y S la cantidad de PA, en segundos.',
        'El valor va por unidad de extrusor: para varios extrusores con el mismo valor, M572 D0:1 S0.1.',
      ],
      indicador: 'slicer',
      cuerpo:
        'En Cura y Simplify3D el K no tiene campo propio: se añade M900 Kxx al script de inicio, a mano. Duet3D lo hace con M572 D0 S0.1, donde D es la unidad de extrusor y S la cantidad de PA, en segundos. El valor va por unidad de extrusor: para varios extrusores con el mismo valor, M572 D0:1 S0.1.',
      cita: { texto: 'M572 D0 S0.1', fuente: 'Duet3D' },
      cuando: { slicer: ['cura', 'simplify3d', 'otro'] },
    },
  ],

  reglas: [
    {
      id: 'temperatura',
      accion: 'Fija la temperatura de boquilla con la torre',
      porque:
        'La temperatura cambia la viscosidad del filamento y de ella dependen todos los pasos siguientes: es lo primero que hay que cerrar.',
      fuente: 'Control3D',
      alcance:
        'Los tres órdenes la ponen la primera. OrcaSlicer la razona: de la viscosidad del filamento depende que fluya bien y se adhiera, y con ella todos los tests que vienen detrás.',
      enlaza: { guia: 'torre-temperatura', etiqueta: 'Cómo se hace la torre de temperatura' },
    },
    {
      id: 'flujo',
      accion: 'Mide el flujo con el test de flow ratio',
      porque:
        'El factor de caudal decide cuánto filamento sale por la boquilla, y corregirlo sobre un perfil ya ajustado suele ser un cambio pequeño.',
      fuente: 'Control3D',
      alcance:
        'Control3D lo pone segundo; OrcaSlicer lo pone cuarto, tras la velocidad volumétrica y el PA, y avisa de que PA y flujo se influyen: uno puede ir antes del otro.',
      enlaza: { guia: 'flow-rate', etiqueta: 'Calibrar el flujo' },
    },
    {
      id: 'pa',
      accion: 'Calibra el Pressure Advance con su patrón',
      porque:
        'Compensa el retraso de la presión del filamento en la boquilla al acelerar y al frenar, y es el ajuste que peor suele estar sin calibrar.',
      fuente: 'Control3D',
      alcance:
        'Control3D lo pone tercero y OrcaSlicer también, pero por otra razón: el PA es el valor que menos se ha calibrado nunca. El nombre y la escala cambian con el firmware.',
      enlaza: { guia: 'flow-rate', etiqueta: 'Calibrar el Pressure Advance' },
    },
    {
      id: 'velocidad-volumetrica',
      accion: 'Mide la velocidad volumétrica máxima',
      porque:
        'El límite real depende de la máquina, la boquilla y la fusión del extrusor, y fija el techo por debajo del cual los tests siguientes funcionan.',
      fuente: 'Control3D',
      alcance:
        'Control3D lo pone cuarto; OrcaSlicer lo pone segundo, avisa de que el valor de la bobina suele estar sobrestimado y pide un 10–20 % por debajo: ese margen sale de dos páginas del mismo wiki.',
      enlaza: { guia: 'max-volumetric-speed', etiqueta: 'Calibrar la velocidad volumétrica' },
    },
    {
      id: 'retracciones',
      accion: 'Calibra la retracción hasta el mínimo sin hilos',
      porque:
        'El objetivo es la distancia más corta que permita imprimir sin hilos, y es el único paso en el que los tres órdenes coinciden: todos lo ponen tras el PA y el flujo.',
      fuente: 'Control3D',
      alcance:
        'Los tres órdenes la ponen después del PA y del flujo; OrcaSlicer lo dice porque los dos cambian la presión en la boquilla. Los límites de 2 mm y de 6–7 mm son de una sola fuente.',
      enlaza: { guia: 'stringing', etiqueta: 'Calibrar la retracción' },
    },
    {
      id: 'tolerancias',
      accion: 'Mide las tolerancias con el test de encaje',
      porque:
        'El objetivo es el ajuste más pequeño que permita encajar las piezas sin forzar, y conviene hacerlo antes de fabricar modelos con encajes precisos.',
      fuente: 'Control3D',
      alcance:
        'Control3D lo pone sexto; OrcaSlicer lo pone al final de todo, porque el resultado depende de cada calibración anterior. Empezar en cero y buscar el mínimo que encaja es de una sola fuente.',
      enlaza: { guia: 'tolerancias-y-encaje', etiqueta: 'Calibrar las tolerancias' },
    },
    {
      id: 'voladizos',
      accion: 'Comprueba los voladizos y los puentes',
      porque:
        'Sirve para ver hasta qué ángulo imprime sin soportes y qué longitud de puente mantiene calidad, y es mejor analizar cada variable por separado.',
      fuente: 'Control3D',
      alcance:
        'Sólo Control3D lo incluye como paso propio. Su final de 75° es de una sola fuente y no es un umbral: el umbral de 45° es de Bambu y está en la guía de voladizos.',
      enlaza: { guia: 'voladizos-y-soportes', etiqueta: 'Voladizos, puentes y soportes' },
    },
    {
      id: 'pieza-final',
      accion: 'Imprime la pieza final de comprobación',
      porque:
        'Una pieza sencilla que combine paredes, curvas, retracciones, puentes y voladizos comprueba que los valores funcionan aplicados a la vez, pero no sustituye a los tests.',
      fuente: 'Control3D',
      alcance:
        'Paso propio de Control3D, sin equivalente en OrcaSlicer ni Duet3D. Si aparecen defectos, hay que revisar el test de esa zona antes de tocar parámetros al azar.',
    },
    {
      id: 'bobina-nueva',
      accion: 'Recalibra el PA y el flujo con la bobina nueva',
      porque:
        'El valor de presión es específico de la combinación de impresora y filamento, y Bambu cuenta el filamento nuevo de otra marca o modelo entre los motivos para recalibrar.',
      fuente: 'Bambu Lab',
      alcance:
        'Lista de motivos de Bambu. El valor se mide para esa combinación de impresora y filamento: no se hereda del carrete anterior ni se copia de otro fabricante.',
      cuando: { motivo: 'bobina' },
      enlaza: { guia: 'flow-rate', etiqueta: 'Calibrar el flujo' },
    },
    {
      id: 'boquilla',
      accion: 'Recalibra tras gastar o sustituir la boquilla',
      porque:
        'Bambu cuenta la boquilla gastada, por más fricción, y la sustituida, por tolerancias de fabricación, entre los motivos para recalibrar.',
      fuente: 'Bambu Lab',
      alcance:
        'La lista de motivos de Bambu no dice qué otros tests hay que repetir: recalibra el valor de presión y decide el resto con los pasos de la ruta.',
      cuando: { motivo: 'boquilla' },
      enlaza: { guia: 'flow-rate', etiqueta: 'Calibrar el flujo' },
    },
    {
      id: 'ajustes-tocados',
      accion: 'Recalibra si cambias la temperatura o la velocidad volumétrica',
      porque:
        'Bambu obliga a recalibrar el valor de presión cuando cambian esos dos ajustes del perfil de filamento, y Orca avisa de que PA y flujo se influyen.',
      fuente: 'Bambu Lab',
      alcance:
        'La lista de motivos es de Bambu. El aviso de OrcaSlicer va en la otra dirección: si el flow ratio cambió mucho, hay que repetir un test rápido de PA.',
      cuando: { motivo: 'ajustes' },
      enlaza: { guia: 'flow-rate', etiqueta: 'Calibrar el flujo' },
    },
    {
      id: 'nada-cambiado',
      accion: 'Conserva el perfil calibrado a mano',
      indicador: 'mantener',
      porque:
        'Un perfil por combinación de impresora y filamento, guardado con los valores obtenidos, es la referencia con la que comparar el comportamiento de la máquina.',
      fuente: 'Control3D',
      alcance:
        'Método de un blog de autor: un perfil por combinación de impresora y filamento, y una sola variable cada vez, para saber qué ajuste mejoró y qué empeoró.',
      cuando: { motivo: 'nada' },
    },
  ],

  fueraDeAlcance: [
    {
      sintoma: 'Cómo se hace cada test',
      porQue:
        'Esta guía da el orden, el motivo y el enlace. Los criterios de lectura de cada prueba están en la guía que la desarrolla, y aquí no se repiten.',
      guia: 'torre-temperatura',
    },
    {
      sintoma: 'Los valores de tu fabricante',
      porQue:
        'Los K de Prusa, el Factor K de Bambu y los valores de arranque de Duet3D son de su firmware y no se traducen entre sí: aquí se declara la escala, no la cifra.',
      guia: 'flow-rate',
    },
    {
      sintoma: 'Un orden oficial para tu máquina',
      porQue:
        'Prusa y Bambu no publican un orden de calibración, y esa ausencia no se reconstruye a partir de los otros tres.',
    },
  ],

  fuentes: [
    {
      url: 'https://control3d.net/como-calibrar-una-impresora-3d-los-7-tests-imprescindibles/',
      quien: 'Control3D',
      que: 'Academia comercial: el método de calibración en ocho pasos de un autor de blog, con los criterios de lectura de cada test. Es una fuente de método, no de datos de fabricante, y sus cifras son de fuente única.',
    },
    {
      url: 'https://github.com/OrcaSlicer/OrcaSlicer/wiki/calibration_guide',
      quien: 'OrcaSlicer',
      que: 'Documentación oficial: el orden de calibración con la dependencia de cada paso, los tests de filamento y de impresora, y la nomenclatura de la función de presión.',
    },
    {
      url: 'https://help.prusa3d.com/article/linear-advance_2252',
      quien: 'Prusa Research',
      que: 'Linear Advance y Pressure Advance: nomenclatura por firmware, K-values por material y geometría del patrón. Prusa no publica un orden de calibración.',
    },
    {
      url: 'https://wiki.bambulab.com/en/software/bambu-studio/calibration_pa',
      quien: 'Bambu Lab',
      que: 'Flow Dynamics: el Factor K, la calibración manual y la automática, cuándo hay que recalibrar y cuándo el resultado no es fiable. Bambu no publica un orden de calibración.',
    },
    {
      url: 'https://docs.duet3d.com/User_manual/Tuning/Pressure_advance',
      quien: 'Duet3D',
      que: 'Pressure advance: de dónde viene el error de presión, el parámetro en segundos por unidad de extrusor, el método más simple y el tramo de orden respecto a Input Shaping y retracción.',
    },
  ],
};
