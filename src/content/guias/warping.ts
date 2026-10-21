import type { Guia } from './tipos';
import { AUTOR } from './autor.ts';

/**
 * Warping en PLA.
 *
 * La guía piloto del formato, escrita desde `wiki/cooked/warping-pla.md`. Lo
 * interesante del material cocinado es que ya viene **filtrado**: 8.510 palabras
 * de las que el artículo anterior sacaba 5.627 de prosa, y casi todo lo que sobra
 * aquí era precisamente la estructura que la página tiene que aportar por su
 * cuenta —«estas cuatro cosas no son warping», «estas dos fuentes se contradicen
 * en X»— porque en un muro de texto esa estructura se pierde y en una tarjeta no.
 *
 * ## Las cifras y de dónde sale cada una
 *
 * Este fichero es el que más se juega con la credibility de la wiki: **las cifras
 * de cama del PLA son seis y todas son ciertas**, y lo que las separa no es el
 * fabricante sino la chapa. Eso es una tabla, y una tabla en prosa son tres
 * párrafos que hay que leer con lupa. Aquí son una tarjeta con su cifra y su
 * condición.
 */
export const warping: Guia = {
  slug: 'warping-pla',
  titulo: 'Warping en PLA',
  resumen:
    'Las esquinas se levantan.',
  resumenExtra:
    'Antes de subir la cama, comprueba que es warping y no separación entre capas, y qué chapa usas: la cifra de cama depende de ella más que del fabricante.',
  sintoma: 'Las esquinas se levantan de la cama',
  dibujo: 'esquinas',
  entrada: 'El PLA es el material rígido que menos warpea, así que cuando sus esquinas se levantan casi nunca es el filamento: es la chapa, la cama o el aire. Esta guía empieza por lo que se ve —una base plana y esquinas que se curvan hacia arriba— y termina con la cifra de cama que toca a tu montaje.',
  autor: AUTOR,
  actualizado: '2026-10-11',
  minutos: 3,

  diferencial: {
    contra: 'separación entre capas',
    comprobaciones: [
      {
        id: 'base',
        mira: 'La base de la pieza, pegada a la cama: ¿está plana o arqueada?',
        si: 'Arqueada hacia arriba desde la cama, comprimiendo las capas y dejando superficie rugosa arriba. Es warping.',
        no: 'Plana, con las capas sueltas por dentro. Es separación entre capas, y se arregla con otro ajuste.',
      },
      {
        id: 'grieta',
        mira: '¿Dónde está la rotura?',
        si: 'En el borde exterior, en las esquinas o a lo largo de una pared larga.',
        no: 'Por dentro de la pieza, en el centro, o en una sección horizontal. Eso no es warping de esquinas.',
      },
      {
        id: 'pegado',
        mira: '¿Se separa también del brim, si llevas brim?',
        si: 'El brim se despega del cuerpo: es señal de que la pieza se curvaba, no un fallo del brim.',
        no: 'El brim se queda pegado y la pieza se abre justo encima: el problema está en la unión entre capas.',
      },
    ],
    siNo: { guia: 'separaciones-entre-capas', etiqueta: 'Separaciones entre capas' },
  },

  variables: [
    {
      id: 'material',
      etiqueta: 'Material',
      indicador: 'material',
      para: 'El PLA es el menos propenso de los siete rígidos, así que si warpea, el ajuste tiene más peso que en otros.',
      necesaria: true,
      /*
       * `campos: ['material']` dice que el material que trae el G-code se
       * declara en esta variable, que es exactamente lo que hace `precontestar`.
       * Es la mitad izquierda de la barra «Tu archivo»: el dato del archivo y el
       * sitio donde el lector contesta lo mismo, para que no haya dos sitios.
       */
      campos: ['material'],
      opciones: [
        { id: 'pla', etiqueta: 'PLA', detalle: 'El más indulgente de los rígidos' },
        { id: 'pla-cf', etiqueta: 'PLA-CF' },
        { id: 'petg', etiqueta: 'PETG', detalle: 'Similar al PLA en riesgo de warping' },
        { id: 'abs', etiqueta: 'ABS o ASA', detalle: 'Warpean casi siempre sin cámara cerrada' },
        { id: 'pc', etiqueta: 'PC o PC-CF', detalle: 'El extremo alto del ranking de riesgo' },
        { id: 'pa', etiqueta: 'PA o variantes' },
      ],
    },
    {
      id: 'chapa',
      etiqueta: 'Chapa',
      indicador: 'cama',
      para: 'Esto decide la cifra de cama. Más que el fabricante.',
      necesaria: true,
      opciones: [
        { id: 'cool', etiqueta: 'Cool Plate', detalle: 'PLA: 35–45 °C' },
        { id: 'textured', etiqueta: 'Textured PEI', detalle: 'PLA: 45–65 °C' },
        { id: 'smooth', etiqueta: 'Smooth PEI', detalle: 'PLA: 45–65 °C' },
        { id: 'engineering', etiqueta: 'Engineering Plate', detalle: 'PLA: 45–65 °C, con pegamento' },
        { id: 'acero', etiqueta: 'Acero liso' },
      ],
    },
    {
      id: 'tamaño',
      etiqueta: 'Tamaño de la pieza',
      indicador: 'geometria',
      para: 'El warping aparece más en piezas grandes, y eso cambia dónde mirar.',
      necesaria: true,
      opciones: [
        { id: 'grande', etiqueta: 'Grande y plana', detalle: 'La más propensa' },
        { id: 'mediana', etiqueta: 'Mediana' },
        { id: 'pequena', etiqueta: 'Pequeña o alta' },
      ],
    },
    {
      id: 'cama',
      etiqueta: 'Temperatura de cama ahora',
      indicador: 'cama',
      para: 'La contradicción entre fabricantes —puerta cerrada o abierta— se explica por esto: con la cama alta y el filamento blando, el calor de la cámara pasa a ser un problema propio.',
      /*
       * `bedTemp` es lo que esta guía **lee** del archivo (`leeDelAnalisis`), y esta
       * variable es donde aterriza: la cifra de la cabecera del G-code marca aquí
       * «alta» o «baja», y quien lee ve por qué esa casilla se sola.
       */
      campos: ['bedTemp'],
      opciones: [
        { id: 'baja', etiqueta: 'Baja o sin cama', detalle: 'PLA en Cool Plate a 35 °C' },
        { id: 'media', etiqueta: 'Media', detalle: 'El rango habitual del PLA' },
        { id: 'alta', etiqueta: 'Alta', detalle: 'Por encima de 45 °C' },
      ],
    },
    {
      id: 'ventana',
      etiqueta: '¿Dónde está la impresora?',
      indicador: 'entorno',
      para: 'Por debajo de 20 °C aparece warping incluso en PLA, y una corriente de aire basta para enfriarte un lado.',
      opciones: [
        { id: 'cerrada', etiqueta: 'Estructura cerrada' },
        { id: 'abierta', etiqueta: 'Estructura abierta' },
        { id: 'corriente', etiqueta: 'Con corriente de aire cerca', detalle: 'Ventana, aire acondicionado, ventilador de mesa' },
      ],
    },
    {
      id: 'camara',
      etiqueta: '¿Estabas imprimiendo con la puerta cerrada?',
      indicador: 'maquina',
      para: 'La contradicción entre fabricantes se explica por esto, no por la marca.',
      opciones: [
        { id: 'cerrada', etiqueta: 'Sí, cerrada' },
        { id: 'abierta', etiqueta: 'No, abierta o sin tapa' },
      ],
    },
  ],

  conocimiento: [
    {
      id: 'mecanismo',
      titulo: 'Por qué se levanta',
      puntos: [
        'Es contracción térmica, no un ajuste mal puesto.',
        'El filamento sale fundido y llega frío a la pieza: ese salto es un choque térmico.',
        'Durante el enfriamiento el plástico se contrae, y el problema es dónde: los bordes exteriores se enfrían antes que el centro,.',
        'y esa diferencia genera una tensión que tira de las esquinas hacia arriba.',
      ],
      indicador: 'temperatura',
      cuerpo:
        'Es contracción térmica, no un ajuste mal puesto. El filamento sale fundido y llega frío a la pieza: ese salto es un choque térmico. Durante el enfriamiento el plástico se contrae, y el problema es dónde: los bordes exteriores se enfrían antes que el centro, y esa diferencia genera una tensión que tira de las esquinas hacia arriba.',
      cita: {
        texto:
          'the edges cool down quicker which causes the material to shrink and pull the corners up',
        fuente: 'wiki.bambulab.com',
      },
    },
    {
      id: 'riesgo',
      titulo: 'El ranking de riesgo, y lo que no dice',
      /*
       * `warpingRisk` y `riskLevel` son el mismo dato en dos versiones —el número
       * y la categoría— y salen en el panel como dos filas. Esta tarjeta es la que
       * explica qué significa ese número, así que es el ancla de las dos. Que
       * apunten a la misma tarjeta no es una ambigüedad: son la misma explicación,
       * mandarlas a dos sitios obligaría a escribirla dos veces.
       */
      campos: ['warpingRisk', 'riskLevel'],
      puntos: [
        'Bambu ordena por riesgo de warping los filamentos que su propia tabla llama propensos a contraerse.',
        'PC → PA-CF → PA → ABS → ASA → PETG → PLA.',
        'Son siete y el PLA es el último.',
        'Ordena esos siete, no todos los rígidos, y no dice cuántas veces viene del ajuste y cuántas del material.',
      ],
      indicador: 'material',
      cuerpo:
        'Bambu ordena por riesgo de warping los filamentos que su propia tabla llama propensos a contraerse: PC → PA-CF → PA → ABS → ASA → PETG → PLA. Son siete y el PLA es el último. Ordena esos siete, no todos los rígidos, y no dice cuántas veces viene del ajuste y cuántas del material.',
      cifra: { valor: '7 → 1', nota: 'PC es el más propenso; el PLA, el menos' },
    },
    {
      id: 'cama-bambu',
      titulo: 'La cifra de cama depende de la chapa',
      cuando: { material: ['pla', 'pla-cf'] },
      puntos: [
        'La tabla por chapa de Bambu da dos rangos para el PLA, y son los dos extremos de la misma fila leídos por columnas distintas.',
        'No se contradicen: con la Cool Plate pide 35–45 °C, y con la Textured PEI,.',
        'la Smooth PEI y la Engineering pide 45–65 °C. El 35–45 es de la Cool Plate, y si tu chapa es otra no es el tuyo.',
      ],
      indicador: 'cama',
      cuerpo:
        'La tabla por chapa de Bambu da dos rangos para el PLA, y son los dos extremos de la misma fila leídos por columnas distintas. No se contradicen: con la Cool Plate pide 35–45 °C, y con la Textured PEI, la Smooth PEI y la Engineering pide 45–65 °C. El 35–45 es de la Cool Plate, y si tu chapa es otra no es el tuyo.',
      cifra: { valor: '35–65 °C', nota: 'todo el PLA de Bambu; el rango depende de la chapa' },
      cita: {
        texto: 'with the Cool Plate the PLA asks for 35 – 45 ℃',
        fuente: 'wiki.bambulab.com',
      },
      enlaza: { guia: 'temperatura-cama', etiqueta: 'Ver las seis cifras' },
    },
    {
      id: 'cama-prusa',
      titulo: 'Prusa da 50–60 °C, y no está en conflicto',
      puntos: [
        'Los 50–60 °C de Prusa y los del slicer Orca están dentro del 45–65 que pide la Textured PEI, y el 60 °C de la ficha del PLA también.',
        'Son el mismo rango leído con distinta anchura.',
        'Lo que cambia entre fabricantes es el margen: Bambu da treinta grados para el PLA y Prusa da diez.',
      ],
      indicador: 'slicer',
      cuerpo:
        'Los 50–60 °C de Prusa y los del slicer Orca están dentro del 45–65 que pide la Textured PEI, y el 60 °C de la ficha del PLA también. Son el mismo rango leído con distinta anchura. Lo que cambia entre fabricantes es el margen: Bambu da treinta grados para el PLA y Prusa da diez.',
      cifra: { valor: '50–60 °C', nota: 'Prusa, tabla de materiales' },
    },
    {
      id: 'techo',
      titulo: 'El 65 °C no es un techo',
      puntos: [
        'Coincide con el extremo alto del intervalo de Bambu para la Textured PEI, pero no es lo mismo.',
        'uno es un techo que un usuario le pone a otro en un foro, el otro el extremo de un intervalo de fabricante para esa chapa.',
        'De las fuentes revisadas, ningún fabricante dice que no se pueda pasar de ahí, y la tabla de Prusa para PLA se queda en 50–60 °C.',
      ],
      indicador: 'cama',
      cuerpo:
        'Coincide con el extremo alto del intervalo de Bambu para la Textured PEI, pero no es lo mismo: uno es un techo que un usuario le pone a otro en un foro, el otro el extremo de un intervalo de fabricante para esa chapa. De las fuentes revisadas, ningún fabricante dice que no se pueda pasar de ahí, y la tabla de Prusa para PLA se queda en 50–60 °C.',
      cuando: { material: ['pla', 'pla-cf'] },
      cifra: { valor: '65 °C', nota: 'extremo alto del rango, no un límite' },
    },
    {
      id: 'fan-bambu',
      titulo: 'El ventilador: dos fuentes, dos ventiladores',
      cuando: { material: ['pla', 'pla-cf', 'petg'] },
      puntos: [
        'Bambu habla del auxiliar y dice dos cosas distintas en dos páginas: en una, bajarlo a 40–50 %; en otra, reducirlo 20–30 %.',
        'El corpus no resuelve cuál aplicar.',
        'Y no es el ventilador de pieza del que habla Prusa, que para PLA y PETG recomienda lo contrario.',
        'comprobar que el de pieza está activo y probarlo a subirlo, con el límite de que demasiado ventilador puede bajar la adhesión entre capas.',
      ],
      indicador: 'ventilacion',
      cuerpo:
        'Bambu habla del auxiliar y dice dos cosas distintas en dos páginas: en una, bajarlo a 40–50 %; en otra, reducirlo 20–30 %. El corpus no resuelve cuál aplicar. Y no es el ventilador de pieza del que habla Prusa, que para PLA y PETG recomienda lo contrario: comprobar que el de pieza está activo y probarlo a subirlo, con el límite de que demasiado ventilador puede bajar la adhesión entre capas.',
    },
    {
      id: 'boquilla-chapa',
      titulo: 'El cambio de chapa también cambia la boquilla',
      cuando: { chapa: 'textured' },
      puntos: [
        'La Textured PEI baja la boquilla 0,04 mm automáticamente al nivelar, para asegurar la primera capa.',
        'Si laminaste para la Cool Plate e imprimes en la Textured, ese descenso no se aplica,.',
        'la boquilla queda demasiado alta y la primera capa no se pega.',
        'Son el síntoma del mismo error de una línea de perfil.',
      ],
      indicador: 'calibracion',
      cuerpo:
        'La Textured PEI baja la boquilla 0,04 mm automáticamente al nivelar, para asegurar la primera capa. Si laminaste para la Cool Plate e imprimes en la Textured, ese descenso no se aplica, la boquilla queda demasiado alta y la primera capa no se pega. Son el síntoma del mismo error de una línea de perfil.',
      cifra: { valor: '−0,04 mm', nota: 'descenso que no se aplica si el perfil es de otra chapa' },
    },
    {
      id: 'grande-seco',
      titulo: 'Pieza grande y plana: el enclosure pasa a ser la variable',
      cuando: { tamaño: 'grande', material: ['abs', 'pc', 'pa'] },
      puntos: [
        'Bambu dice que los modelos grandes y planos en ABS, ASA o PC «casi siempre warpean sin cámara cerrada»,.',
        'y que si no hay cámara la alternativa es cambiar a PLA, PLA-CF, PETG o PETG-CF.',
        'Es el único sitio de esta guía donde el material decide y decide mucho, y va en la dirección contraria al ranking del principio.',
        'allí el PLA era el más seguro, y aquí es la salida cuando la pieza es grande.',
      ],
      indicador: 'material',
      cuerpo:
        'Bambu dice que los modelos grandes y planos en ABS, ASA o PC «casi siempre warpean sin cámara cerrada», y que si no hay cámara la alternativa es cambiar a PLA, PLA-CF, PETG o PETG-CF. Es el único sitio de esta guía donde el material decide y decide mucho, y va en la dirección contraria al ranking del principio: allí el PLA era el más seguro, y aquí es la salida cuando la pieza es grande.',
      enlaza: { guia: 'temperatura-cama', etiqueta: 'Ver las cifras de cama' },
    },
    {
      id: 'no-es-warping',
      titulo: 'Cuatro fallos que no son warping',
      puntos: [
        'El colapso de piezas altas y finas es mecánico, no térmico: la boquilla tumba un modelo alto por vibración,.',
        'las correas flojas dan holgura al cabezal.',
        'La boquilla contra el relleno es otra fila del catálogo.',
        'Los voladizos inclinados y las piezas pequeñas son condición del consejo de ventilador de Prusa, no un tipo de warping.',
        'Y la humedad no es warping: si el filamento suena a chasquido, hay que secarlo y reintentar,.',
        'y ninguna fuente de este lote dice con qué temperatura.',
      ],
      indicador: 'ventilacion',
      cuerpo:
        'El colapso de piezas altas y finas es mecánico, no térmico: la boquilla tumba un modelo alto por vibración, las correas flojas dan holgura al cabezal. La boquilla contra el relleno es otra fila del catálogo. Los voladizos inclinados y las piezas pequeñas son condición del consejo de ventilador de Prusa, no un tipo de warping. Y la humedad no es warping: si el filamento suena a chasquido, hay que secarlo y reintentar, y ninguna fuente de este lote dice con qué temperatura.',
    },
  ],

  reglas: [
    {
      id: 'limpiar',
      accion: 'Limpia la chapa con agua templada y jabón',
      valor: 'Enjuaga y deja secar al aire',
      porque:
        'Es el primero de los tres pasos que Bambu atribuye a aproximadamente el 80 % de los fallos de warping y adhesión, y sale también en su lista de correcciones rápidas. Después de limpiar, no toques la superficie con las manos.',
      cuando: { material: ['pla', 'pla-cf', 'petg', 'abs', 'pc', 'pa'] },
      fuente: 'Bambu Lab',
      alcance: 'Los tres pasos resuelven ~80 % según el fabricante. El ventilador no está en esa lista.',
    },
    {
      id: 'nivelar',
      accion: 'Nivela la cama',
      valor: 'Calibración automática completa',
      porque:
        'Segundo paso del mismo Tier 1, y Bambu lo pide especialmente después de mover la impresora, hacer mantenimiento o cambiar de chapa.',
      cuando: { material: ['pla', 'pla-cf', 'petg', 'abs', 'pc', 'pa'] },
      fuente: 'Bambu Lab',
    },
    {
      id: 'boquilla-fija',
      accion: 'Comprueba que la boquilla está bien instalada',
      porque: 'Los clips tienen que estar apretados en la forma correcta para que no quede floja.',
      cuando: { material: ['pla', 'pla-cf', 'petg', 'abs', 'pc', 'pa'] },
      fuente: 'Bambu Lab',
    },
    {
      id: 'cama',
      accion: 'Sube la temperatura de cama',
      cuando: { chapa: 'cool', material: ['pla', 'pla-cf'] },
      valor: '35–45 °C',
      rango: { campo: 'bedTemp', min: 35, max: 45, unidad: '°C' },
      porque:
        'La dirección no tiene discusión: hay que subir, y Bambu lo cuantifica en +5 a +10 °C. En Cool Plate el rango de la tabla es 35–45 °C, así que 65 °C queda fuera de él.',
      fuente: 'Bambu Lab',
      alcance: 'Ninguna fuente de este lote dice qué ocurre por salirse de rango en la Cool Plate.',
    },
    {
      id: 'cama-textured',
      accion: 'Sube la temperatura de cama',
      cuando: { chapa: ['textured', 'smooth', 'engineering'], material: ['pla', 'pla-cf'] },
      valor: '45–65 °C, objetivo 55–65 °C',
      rango: { campo: 'bedTemp', min: 45, max: 65, unidad: '°C' },
      porque:
        'Los 55–65 °C son el objetivo de diagnóstico de la página de warping y el 45–65 °C el intervalo de la tabla por chapa. No son lo mismo: el objetivo es una ventana más estrecha dentro del intervalo.',
      fuente: 'Bambu Lab',
    },
    {
      id: 'cama-petg',
      accion: 'Sube la temperatura de cama',
      cuando: { material: 'petg' },
      valor: '60–80 °C',
      rango: { campo: 'bedTemp', min: 60, max: 80, unidad: '°C' },
      porque:
        'Es el único rango del material que da Bambu en su tabla por filamento. Los 50–60 °C que se ven para el PETG no salen de esa tabla.',
      fuente: 'Bambu Lab',
    },
    {
      id: 'cama-abs',
      accion: 'Sube la temperatura de cama',
      cuando: { material: 'abs' },
      valor: '90–100 °C',
      rango: { campo: 'bedTemp', min: 90, max: 100, unidad: '°C' },
      porque:
        'Rango de Bambu para ABS y ASA en su tabla por filamento. La opción «ABS o ASA» de arriba cubre los dos porque comparten fila en esa tabla.',
      fuente: 'Bambu Lab',
    },
    {
      id: 'ventilador-3-capas',
      accion: 'Apaga el enfriamiento en las 3 primeras capas',
      cuando: { material: ['pla', 'pla-cf', 'petg'] },
      valor: 'No cooling for the first 3 layers',
      porque:
        'Es el ajuste que Bambu señala como el más importante para el warping, y lo dice en ese orden. Sin enfriamiento en esas capas la primera capa se enfría más despacio y se pega mejor.',
      fuente: 'Bambu Lab',
      alcance: 'Son las primeras capas de esta opción, no las del ventilador auxiliar. Son dos ajustes distintos.',
    },
    {
      id: 'brim',
      accion: 'Añade un brim, o brim ears si sólo fallan dos esquinas',
      cuando: { material: ['pla', 'pla-cf', 'petg', 'abs', 'pc', 'pa'] },
      valor: '8–10 mm de ancho',
      porque:
        'Un brim de 8 a 10 mm aumenta la superficie en contacto con la cama. Si sólo se levantan dos esquinas, brim ears dirigidos únicamente a ellas es mejor que un brim entero.',
      fuente: 'Bambu Lab',
    },
    {
      id: 'ventilador-piezas-pequenas',
      accion: 'Prueba a activar algo de ventilador de pieza, bajo y a baja velocidad',
      cuando: { tamaño: ['pequena', 'mediana'], material: ['abs', 'pc', 'pa'] },
      valor: '10–20 %',
      porque:
        'Prusa pone los voladizos inclinados y las piezas pequeñas como condición de su consejo de ventilador: en esos casos probar a activarlo despacio, incluso con materiales que no necesitan mucha refrigeración. Su objetivo declarado es enfriar la pieza «ni demasiado rápido ni demasiado despacio», así que el punto es probar despacio y comprobar, no subir a fondo.',
      fuente: 'Prusa Research',
      alcance:
        'El corpus no dice hacia qué lado se curva un voladizo ni por qué, así que esta guía no lo dice. Y ojo al verbo: es un «you may try», no una recomendación categórica.',
    },
    {
      id: 'relleno',
      accion: 'Cambia el relleno a Gyroid',
      cuando: { material: ['pla', 'pla-cf', 'petg', 'abs'] },
      valor: '25 % como techo',
      porque:
        'Grid y Triangle crean tensión lineal interna y el Gyroid se contrae por igual en todas las direcciones. Bambu lo pone como opción con el 25 % de densidad como techo, con su comparador literal.',
      fuente: 'Bambu Lab',
      alcance: 'Que Gyroid mejora lo dicen las dos fuentes. Que cubic sea mejor tiene una sola fuente, un foro.',
    },
    {
      id: 'corriente',
      accion: 'Corta la corriente de aire alrededor de la impresora',
      cuando: { ventana: 'corriente' },
      porque:
        'Una ventana abierta, un aire acondicionado o un ventilador de mesa basta para enfriarte un lado más que otro, y esa diferencia es la que genera la tensión.',
      fuente: 'Bambu Lab',
    },
    {
      id: 'abierta',
      accion: 'Abre la puerta frontal y quita la tapa superior',
      cuando: { camara: 'cerrada', cama: 'alta' },
      porque:
        'Para filamentos con temperatura de reblandecimiento por debajo de 60 °C —PLA, PVA, TPU— y cama por encima de 45 °C, Bambu recomienda abrir la puerta y/o quitar la tapa para que el calor de la cámara no reblandezca el filamento.',
      fuente: 'Bambu Lab',
      alcance: 'Es un «y/o» de la fuente: la puerta basta, o la tapa basta. Traducirlo como «las dos cosas» le exigiría una conjunción que no pidió.',
    },
  ],

  fueraDeAlcance: [
    {
      sintoma: 'La pieza alta y fina se tumba',
      porQue:
        'Es colapso estructural, no warping: la boquilla la derriba por vibración a alta velocidad y las correas flojas dan holgura al cabezal. Los ajustes son reducir velocidad y aceleración, comprobar correas y habilitar soportes.',
      guia: 'warping-pla',
    },
    {
      sintoma: 'Las capas se sueltan por dentro y la base está plana',
      porQue:
        'No es warping. Cambiar la temperatura o el ventilador no lo arregla: el protocolo es otro.',
      guia: 'separaciones-entre-capas',
    },
    {
      sintoma: 'La superficie sale rugosa, con burbujas o chasquidos',
      porQue:
        'Es humedad del filamento, no warping. La única instrucción respaldada es secar y reintentar; ninguna fuente de este lote dice con qué temperatura.',
    },
  ],

  fuentes: [
    {
      url: 'https://wiki.bambulab.com/en/filament-acc/filament/print-quality/warping-falling-off-collapsing',
      quien: 'Bambu Lab',
      que: 'Página de warping: mecanismo, ranking de riesgo, Tier 1 y ajustes.',
    },
    {
      url: 'https://wiki.bambulab.com/en/knowledge-sharing/printed-model-warping',
      quien: 'Bambu Lab',
      que: 'Página de warping en modelos: enfriamiento y ventilador auxiliar.',
    },
    {
      url: 'https://help.prusa3d.com/article/warping_2011',
      quien: 'Prusa Research',
      que: 'Knowledge base de warping: ventilador de pieza y condiciones.',
    },
    {
      url: 'https://forum.prusa3d.com/forum/original-prusa-i3-mk3s-mk3-how-do-i-print-this-printing-help/adjusting-settings-for-warping-of-pla/',
      quien: 'Foro de Prusa, 2019',
      que: 'Hilo con el antes y el intento de después. Cambió cama y chaflán a la vez.',
    },
    {
      url: 'https://forum.prusa3d.com/forum/how-do-i-print-this-printing-help/warping-at-corners/',
      quien: 'Foro de Prusa, 2024',
      que: 'Hilo sobre esquinas arrugadas, con el criterio de quien responde.',
    },
  ],

  campos: ['warpingRisk', 'riskLevel'],
  leeDelAnalisis: ['material', 'bedTemp'],
};