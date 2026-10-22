import type { Guia } from './tipos';
import { AUTOR } from './autor.ts';

/**
 * El slicer: qué es y qué escribe en tu G-code.
 *
 * La última guía del plan de contenido y la única que no describe un defecto de
 * impresión. Cierra el círculo: **el campo `slicer` es obligatorio en
 * `ProjectMetadata`, así que el panel siempre dice un programa**, y de ese
 * programa salen casi todos los demás valores que la barra «Tu archivo» enseña
 * —material, temperaturas, altura de capa—. Sin esta página, la fila «Slicer»
 * es una palabra sin explicación y los valores de debajo parecen leerlos la app
 * de la nada.
 *
 * ## Las decisiones que tomó el redactor
 *
 * 1. **El campo manda, y por eso no hay sección de «por qué puede faltar».**
 *    `slicer` no es opcional: no hay panel de análisis sin un valor en esa
 *    fila. Y cuando la cabecera no trae la firma de ninguna de las tres familias
 *    que el analizador sabe leer, el parseo se detiene antes de producir
 *    metadatos: ese caso tiene su propia opción en la variable y su propia
 *    tarjeta, porque es un estado real y distinto de «es PrusaSlicer».
 * 2. **El hueco del cocinado es una orden, y se obedece.** Ninguna de las nueve
 *    fuentes enumera la cabecera real de un G-code ni un comentario concreto.
 *    Lo que hay son dos modelos distintos y se dicen como tales: el interruptor
 *    booleano de Orca (`gcode_comments`, «Verbose G-code») y los marcadores de
 *    posición de Cura, que se resuelven en instrucciones. De ahí no se deduce
 *    ninguna lista, y esta guía no la escribe.
 * 3. **Las cinco contradicciones del cocinado van como tarjetas**, con su matiz
 *    y sin resolverse: la frontera de las tres categorías, dónde vive el
 *    metadato, la temperatura por capa, los soportes de árbol y qué se puede
 *    guardar o ni ver.
 * 4. **El slicer sí es variable, y no es decorativa.** Cada casa documenta su
 *    comprobación en su propio sitio: `gcode_comments` es de Orca, las
 *    plantillas de Start/End son de Cura, la carpeta `snapshots` es de Prusa y
 *    el visor de información de laminado es de Bambu. Cada opción dispara una
 *    acción distinta; sin la variable, cinco de las seis reglas condicionadas
 *    no podrían existir.
 * 5. **La segunda variable es el formato de salida, no el perfil.** Si exportas
 *    `.bgcode` el fichero no es texto y «leer la cabecera» necesita un paso
 *    previo. Eso cambia una tarjeta y una acción.
 */
export const slicer: Guia = {
  slug: 'slicer',
  titulo: 'El slicer: qué es y qué escribe en tu G-code',
  resumen:
    'El panel dice qué programa generó tu G-code y de él salen casi todos los demás valores: esta guía explica qué es un slicer, qué hace con tu modelo y qué se puede saber de su salida.',
  sintoma: 'No sé de dónde sale el dato del slicer ni los valores del panel',
  dibujo: 'slicer',
  entrada:
    'El campo del slicer es obligatorio, así que el panel siempre nombra un programa: es el que convirtió tu modelo en instrucciones capa a capa y el que escribió en el fichero el material, las temperaturas y la altura de capa que estás leyendo. Esta guía explica qué hace ese programa, cómo organiza sus ajustes y qué se puede inspeccionar de su salida antes de imprimir. También dice qué no está escrito en ninguna parte, que es la mitad honesta del tema. Si tu pieza ya está impresa y falla, el filtro de abajo te lleva a la guía que toca.',
  autor: AUTOR,
  actualizado: '2026-10-13',
  minutos: 5,

  campos: ['slicer'],

  /*
   * El diferencial de esta guía no separa dos síntomas de pieza: separa dos
   * orígenes. Quien llega aquí desde la fila «Slicer» del panel suele estar en
   * una de dos situaciones, y confundirlas es caro: o el fichero que va a
   * imprimir no es el que cree —caso antiguo, ajuste tocado después de exportar—,
   * o el fichero es correcto y el problema está en la máquina o el material.
   * Las tres comprobaciones se contestan mirando, sin cambiar ningún ajuste.
   */
  diferencial: {
    contra: 'un fallo de la impresora o del material, no del fichero',
    contraCorto: 'la impresora o el material',
    comprobaciones: [
      {
        id: 'origen',
        mira: 'El fichero que estás imprimiendo, ¿es el que acabas de exportar?',
        si: 'No, es uno de antes, o has tocado algún ajuste después de exportar: ese fichero no lleva el cambio. Hay que volver a laminar y exportar otra vez.',
        no: 'Sí: refleja tu perfil tal y como estaba en el momento de exportar.',
      },
      {
        id: 'previsualizacion',
        mira: 'Abre la vista de capas: ¿el problema se ve ya ahí?',
        si: 'Sí: piezas que empiezan a imprimirse en el aire, soportes que no están o una geometría que no coincide con el modelo. El ajuste del slicing está mal, y esta guía dice cómo revisarlo.',
        no: 'No: la previsualización está bien y el fallo sólo aparece en la pieza impresa. El laminado hizo lo que le pediste, así que el origen es otro.',
      },
      {
        id: 'perfil',
        mira: 'El perfil que el slicer dice tener aplicado, ¿es el de tu impresora, tu boquilla y tu material?',
        si: 'No lo has mirado, o no coincide: todo lo que el programa calcula después está calculado para otro montaje, y la pieza puede salir bien laminada y mal impresa.',
        no: 'Sí, coincide: si aun así la pieza falla, el problema no está en el ajuste del slicing.',
      },
    ],
    siNo: { guia: 'warping-pla', etiqueta: 'Warping en PLA' },
  },

  variables: [
    {
      id: 'slicer',
      etiqueta: 'Slicer',
      /*
       * Este es el sitio donde se explica el campo `slicer`: la barra «Tu
       * archivo» enseña el valor que trae el G-code y enlaza aquí, a la
       * variable que pregunta lo mismo. Se declara en la variable y no en una
       * tarjeta a propósito —`verify:guias` falla si un campo apunta a dos
       * sitios distintos dentro de la misma guía, y quien lee necesita
       * **declarar** su programa antes que **entender** el de su fichero.
       */
      indicador: 'slicer',
      para: 'Cada casa documenta su propia comprobación en su propio sitio, y el de una no vale para las otras tres: lo que hay que mirar cambia de programa.',
      necesaria: true,
      campos: ['slicer'],
      opciones: [
        { id: 'prusa', etiqueta: 'PrusaSlicer', detalle: 'Pestañas, snapshots, .bgcode' },
        { id: 'orca', etiqueta: 'OrcaSlicer', detalle: 'Interruptor Verbose G-code' },
        { id: 'bambu', etiqueta: 'Bambu Studio', detalle: 'Información de laminado por capa' },
        { id: 'cura', etiqueta: 'Cura', detalle: 'Start y End G-code de máquina' },
        { id: 'desconocido', etiqueta: 'No lo sé', detalle: 'El archivo no trae firma' },
      ],
    },
    {
      id: 'formato',
      etiqueta: 'Formato de salida',
      indicador: 'slicer',
      para: 'Si exportas en binario no puedes abrir el fichero con un editor de texto, y leerlo es una de las comprobaciones de esta guía.',
      opciones: [
        { id: 'texto', etiqueta: 'Texto (.gcode)', detalle: 'Se abre con cualquier editor' },
        { id: 'binario', etiqueta: 'Binario (.bgcode)', detalle: 'Comprimido: no es texto' },
      ],
    },
  ],

  conocimiento: [
    {
      id: 'que-es',
      titulo: 'Qué es un slicer',
      puntos: [
        'Es el programa que convierte el modelo en instrucciones capa a capa para la impresora, y su producto es un fichero.',
        'G-code de texto o binario.',
        'La razón de que haya capas está escrita: cada capa se apoya sobre la anterior,.',
        'así que hace falta calcular qué soporte va debajo de lo que se imprimiría en el aire.',
        'Es gratuito, de código abierto, y no está atado a una marca de impresora.',
        'la comunidad ha hecho perfiles para máquinas de muchos fabricantes y los que no vienen integrados se importan a mano.',
      ],
      indicador: 'slicer',
      cuerpo:
        'Es el programa que convierte el modelo en instrucciones capa a capa para la impresora, y su producto es un fichero: G-code de texto o binario. La razón de que haya capas está escrita: cada capa se apoya sobre la anterior, así que hace falta calcular qué soporte va debajo de lo que se imprimiría en el aire. Es gratuito, de código abierto, y no está atado a una marca de impresora: la comunidad ha hecho perfiles para máquinas de muchos fabricantes y los que no vienen integrados se importan a mano.',
      cita: {
        texto:
          'To start printing, you need to convert your model to layer-by-layer instructions for the printer with a slicer.',
        fuente: 'help.prusa3d.com',
      },
    },
    {
      id: 'recorrido',
      titulo: 'El recorrido: de modelo a fichero',
      puntos: [
        'El recorrido en PrusaSlicer es: importar, orientar, elegir impresora, material y perfil, decidir soportes, relleno y brim,.',
        'previsualizar y exportar.',
        'Admite cinco formatos de entrada —STL, STEP, 3MF, OBJ y AMF—.',
        'Las piezas no se imprimen macizas ni huecas: se usa un patrón de relleno disperso que dé soporte interno a las capas superiores,.',
        'y su ejemplo de partida está en torno a un 15 % de relleno.',
        'La altura de capa es otro ajuste, con su propio rango.',
      ],
      indicador: 'slicer',
      cuerpo:
        'El recorrido en PrusaSlicer es: importar, orientar, elegir impresora, material y perfil, decidir soportes, relleno y brim, previsualizar y exportar. Admite cinco formatos de entrada —STL, STEP, 3MF, OBJ y AMF—. Las piezas no se imprimen macizas ni huecas: se usa un patrón de relleno disperso que dé soporte interno a las capas superiores, y su ejemplo de partida está en torno a un 15 % de relleno. La altura de capa es otro ajuste, con su propio rango.',
      cifra: { valor: '0,15–0,20 mm', nota: 'altura de capa de partida que sugiere Prusa' },
      cita: {
        texto: 'offer very good print quality at reasonable print times',
        fuente: 'help.prusa3d.com',
      },
      enlaza: { guia: 'altura-capa', etiqueta: 'Ver la altura de capa' },
    },
    {
      id: 'perfiles',
      titulo: 'Un preset es un conjunto, no un ajuste',
      puntos: [
        'Bambu reparte sus cientos de parámetros en tres categorías —impresora,.',
        'filamento y proceso— y un preset no es un ajuste sino el conjunto de los ajustes de una categoría.',
        'El de impresora lleva la velocidad máxima de cada eje, los límites del área de impresión y el diámetro de boquilla; el de filamento,.',
        'la temperatura de impresión, la de cama y el flow ratio; el de proceso, la altura de capa, los detalles de soporte y el ancho de extrusión.',
        'Prusa organiza lo mismo en tres pestañas y trae presets integrados para muchos materiales.',
      ],
      indicador: 'maquina',
      cuerpo:
        'Bambu reparte sus cientos de parámetros en tres categorías —impresora, filamento y proceso— y un preset no es un ajuste sino el conjunto de los ajustes de una categoría. El de impresora lleva la velocidad máxima de cada eje, los límites del área de impresión y el diámetro de boquilla; el de filamento, la temperatura de impresión, la de cama y el flow ratio; el de proceso, la altura de capa, los detalles de soporte y el ancho de extrusión. Prusa organiza lo mismo en tres pestañas y trae presets integrados para muchos materiales.',
      cita: {
        texto:
          'These parameters are divided into three categories: printer, filament and process',
        fuente: 'wiki.bambulab.com',
      },
      enlaza: { guia: 'material', etiqueta: 'Qué cambia entre materiales' },
    },
    {
      id: 'frontera',
      titulo: 'Las tres categorías existen en las dos casas; la frontera, no',
      puntos: [
        'Las dos casas dicen tener la misma separación en tres grupos, pero el reparto concreto no cae en el mismo sitio.',
        'en Prusa la retracción vive en la pestaña Printers,.',
        'y en Bambu la retracción no se nombra en ninguna de las tres listas mientras el flow ratio vive en el preset de filamento.',
        'Es una frontera distinta, **no un sinónimo**, y ninguna de las dos fuentes declara la equivalencia con la otra.',
        'De aquí no se puede escribir que las tres categorías sean «lo de la máquina,.',
        'lo del material y lo del trabajo» como si fuera una taxonomía compartida.',
      ],
      indicador: 'maquina',
      cuerpo:
        'Las dos casas dicen tener la misma separación en tres grupos, pero el reparto concreto no cae en el mismo sitio: en Prusa la retracción vive en la pestaña Printers, y en Bambu la retracción no se nombra en ninguna de las tres listas mientras el flow ratio vive en el preset de filamento. Es una frontera distinta, **no un sinónimo**, y ninguna de las dos fuentes declara la equivalencia con la otra. De aquí no se puede escribir que las tres categorías sean «lo de la máquina, lo del material y lo del trabajo» como si fuera una taxonomía compartida.',
    },
    {
      id: 'metadato',
      titulo: 'Dónde vive el metadato: tres respuestas, y ninguna vale para las otras dos',
      puntos: [
        'OrcaSlicer documenta un interruptor booleano —`gcode_comments`,.',
        '«Verbose G-code»— que añade comentarios descriptivos y opcionales a líneas y bloques.',
        'Cura no documenta ningún interruptor de comentarios: documenta plantillas de inicio y fin con marcadores que el slicer resuelve al exportar,',
        'y en su ejemplo el valor acaba en la instrucción —`M140 S50.0`—, no en un comentario.',
        'Y Orca documenta un tercer sitio, el nombre del fichero, con una plantilla de tokens de la que sale `OrcaCube_PLA_1h15m.gcode`.',
        'Son tres modelos distintos de dónde acaba un dato: en un fichero de Cura la temperatura de cama se saca del parámetro M140,.',
        'no de un comentario.',
      ],
      indicador: 'slicer',
      cuerpo:
        'OrcaSlicer documenta un interruptor booleano —`gcode_comments`, «Verbose G-code»— que añade comentarios descriptivos y opcionales a líneas y bloques. Cura no documenta ningún interruptor de comentarios: documenta plantillas de inicio y fin con marcadores que el slicer resuelve al exportar, y en su ejemplo el valor acaba en la instrucción —`M140 S50.0`—, no en un comentario. Y Orca documenta un tercer sitio, el nombre del fichero, con una plantilla de tokens de la que sale `OrcaCube_PLA_1h15m.gcode`. Son tres modelos distintos de dónde acaba un dato: en un fichero de Cura la temperatura de cama se saca del parámetro M140, no de un comentario.',
    },
    {
      id: 'hueco',
      titulo: 'Lo que ninguna fuente de esta guía lista',
      puntos: [
        'Ninguna de las nueve fuentes enumera la cabecera real de un G-code ni un comentario concreto de los que el slicer escribe por su cuenta.',
        'lo documentado es un booleano en Orca y marcadores de posición en Cura, y de eso no se puede deducir una lista.',
        'Tampoco está el nombre literal de la etiqueta que aparece en el nombre del fichero cuando el análisis del tiempo todavía se está ejecutando,',
        'ni dice ninguna fuente si un `.bgcode` conserva los mismos metadatos que el ASCII.',
        'Los huecos se declaran y **no se rellenan**.',
      ],
      indicador: 'slicer',
      cuerpo:
        'Ninguna de las nueve fuentes enumera la cabecera real de un G-code ni un comentario concreto de los que el slicer escribe por su cuenta: lo documentado es un booleano en Orca y marcadores de posición en Cura, y de eso no se puede deducir una lista. Tampoco está el nombre literal de la etiqueta que aparece en el nombre del fichero cuando el análisis del tiempo todavía se está ejecutando, ni dice ninguna fuente si un `.bgcode` conserva los mismos metadatos que el ASCII. Los huecos se declaran y **no se rellenan**.',
    },
    {
      id: 'calcula',
      titulo: 'Lo que el slicer calcula, y se puede inspeccionar después',
      puntos: [
        'Tras laminar se puede ver, capa a capa, el tipo de línea, el filamento, la velocidad, la ruta de impresión, el tiempo,.',
        'el ventilador y la temperatura de boquilla.',
        'La altura de capa es la resolución vertical del modelo —a menos altura,.',
        'más finura— y el ancho de línea es la anchura del filamento fundido que sale por la boquilla, normalmente casi igual al diámetro de ésta.',
        'El caudal máximo se calcula con una fórmula que la fuente da literal,.',
        'y el visor es también el sitio donde se añaden pausas y G-code propio por capa.',
      ],
      indicador: 'ventilacion',
      cuerpo:
        'Tras laminar se puede ver, capa a capa, el tipo de línea, el filamento, la velocidad, la ruta de impresión, el tiempo, el ventilador y la temperatura de boquilla. La altura de capa es la resolución vertical del modelo —a menos altura, más finura— y el ancho de línea es la anchura del filamento fundido que sale por la boquilla, normalmente casi igual al diámetro de ésta. El caudal máximo se calcula con una fórmula que la fuente da literal, y el visor es también el sitio donde se añaden pausas y G-code propio por capa.',
      cita: {
        texto:
          'Maximum volumetric flow rate = cross-sectional area of extruded line * maximum printing speed',
        fuente: 'wiki.bambulab.com',
      },
    },
    {
      id: 'temperatura-capa',
      titulo: 'La temperatura de boquilla por capa: constante, y a la vez no',
      puntos: [
        'Bambu dice que con un solo filamento la temperatura de boquilla será constante durante todo el proceso,.',
        'y que con varios filamentos y un AMS puede variar.',
        'La misma página documenta lo contrario para un caso concreto.',
        'el G-code personalizado por capa permite cambiarla a mitad de impresión —M104 S250 calienta la boquilla a 250 °C antes de esa capa—,.',
        'y así se hace una torre de temperaturas.',
        'La frase de la constante va acotada a un solo filamento y a lo que muestra un visor,.',
        'así que no se puede leer como «la temperatura es una durante toda la impresión».',
      ],
      indicador: 'temperatura',
      cuerpo:
        'Bambu dice que con un solo filamento la temperatura de boquilla será constante durante todo el proceso, y que con varios filamentos y un AMS puede variar. La misma página documenta lo contrario para un caso concreto: el G-code personalizado por capa permite cambiarla a mitad de impresión —M104 S250 calienta la boquilla a 250 °C antes de esa capa—, y así se hace una torre de temperaturas. La frase de la constante va acotada a un solo filamento y a lo que muestra un visor, así que no se puede leer como «la temperatura es una durante toda la impresión».',
      enlaza: { guia: 'temperatura-hotend', etiqueta: 'Temperatura de boquilla' },
    },
    {
      id: 'soportes',
      titulo: 'Soportes automáticos sí, de árbol no',
      puntos: [
        'Prusa dice que PrusaSlicer puede detectar dónde colocar soportes y generarlos automáticamente, con dos opciones en el desplegable.',
        'Everywhere o On build plate only.',
        'En su FAQ, la respuesta a los soportes de árbol para FDM es un no con matiz temporal: «at least for the time being».',
        'No se contradicen: una habla de la generación automática en general y la otra de un tipo concreto,.',
        'y el «no» no se puede generalizar a «PrusaSlicer no genera soportes» ni a «ningún slicer tiene soportes de árbol».',
      ],
      indicador: 'slicer',
      cuerpo:
        'Prusa dice que PrusaSlicer puede detectar dónde colocar soportes y generarlos automáticamente, con dos opciones en el desplegable: Everywhere o On build plate only. En su FAQ, la respuesta a los soportes de árbol para FDM es un no con matiz temporal: «at least for the time being». No se contradicen: una habla de la generación automática en general y la otra de un tipo concreto, y el «no» no se puede generalizar a «PrusaSlicer no genera soportes» ni a «ningún slicer tiene soportes de árbol».',
      enlaza: { guia: 'voladizos-y-soportes', etiqueta: 'Voladizos y soportes' },
    },
    {
      id: 'niveles',
      titulo: 'Cuatro niveles, y sólo lo global se guarda',
      puntos: [
        'En Bambu Studio los parámetros de proceso tienen cuatro niveles: Global, que afecta a cada objeto del proyecto; Object; Part; y Modifier,.',
        'una parte especial pensada para cambiar parámetros en las regiones que intersecta.',
        'La regla general es que, si el mismo parámetro está a valores distintos en varios niveles, se usa el del nivel más pequeño.',
        'Y hay una restricción que se pierde de vista: los presets son globales, así que un cambio a nivel de objeto,.',
        'parte o modificador no se puede guardar como preset.',
      ],
      indicador: 'general',
      cuerpo:
        'En Bambu Studio los parámetros de proceso tienen cuatro niveles: Global, que afecta a cada objeto del proyecto; Object; Part; y Modifier, una parte especial pensada para cambiar parámetros en las regiones que intersecta. La regla general es que, si el mismo parámetro está a valores distintos en varios niveles, se usa el del nivel más pequeño. Y hay una restricción que se pierde de vista: los presets son globales, así que un cambio a nivel de objeto, parte o modificador no se puede guardar como preset.',
      cifra: { valor: '5 % → 20 %', nota: 'el ejemplo de Bambu: 5 % global y 20 % a un objeto' },
      cita: {
        texto:
          'Usually, if the same parameter is set in multiple levels at different values, the value from the smallest level will be used.',
        fuente: 'wiki.bambulab.com',
      },
    },
    {
      id: 'visibilidad',
      titulo: 'Tres casas filtran el acceso, por tres caminos distintos',
      puntos: [
        'Bambu filtra por el nivel de aplicabilidad, porque sólo las modificaciones globales se pueden guardar como preset.',
        'Prusa filtra por el modo de interfaz, y hay parámetros que sólo se ven en modo experto.',
        'Orca filtra por el nivel de visibilidad: `gcode_comments` es Advanced y `gcode_add_line_number` es Developer,.',
        'así que la legibilidad del G-code depende del modo en que esté el programa.',
        'Ninguna declara que su filtro equivalga al de las otras, y **un ajuste que no aparece no significa que el slicer no lo aplique**.',
      ],
      indicador: 'slicer',
      cuerpo:
        'Bambu filtra por el nivel de aplicabilidad, porque sólo las modificaciones globales se pueden guardar como preset. Prusa filtra por el modo de interfaz, y hay parámetros que sólo se ven en modo experto. Orca filtra por el nivel de visibilidad: `gcode_comments` es Advanced y `gcode_add_line_number` es Developer, así que la legibilidad del G-code depende del modo en que esté el programa. Ninguna declara que su filtro equivalga al de las otras, y **un ajuste que no aparece no significa que el slicer no lo aplique**.',
    },
    {
      id: 'estimacion',
      titulo: 'El tiempo estimado depende del perfil',
      puntos: [
        'Prusa dice que su estimación de tiempo es muy precisa —a menudo menos de un minuto de diferencia en una impresión de más de diez horas—,.',
        'pero sólo si se elige el perfil de impresora correcto, porque la estimación tiene en cuenta la aceleración,.',
        'el jerk y otros ajustes que cambian de una máquina a otra.',
        'Una estimación calculada con el perfil equivocado no es precisa: está hecha para otra impresora.',
      ],
      indicador: 'maquina',
      cuerpo:
        'Prusa dice que su estimación de tiempo es muy precisa —a menudo menos de un minuto de diferencia en una impresión de más de diez horas—, pero sólo si se elige el perfil de impresora correcto, porque la estimación tiene en cuenta la aceleración, el jerk y otros ajustes que cambian de una máquina a otra. Una estimación calculada con el perfil equivocado no es precisa: está hecha para otra impresora.',
      cifra: { valor: '< 1 min', nota: 'diferencia habitual en más de 10 h, con el perfil correcto' },
    },
    {
      id: 'binario',
      titulo: 'El fichero puede no ser texto',
      cuando: { formato: 'binario' },
      puntos: [
        'El `.bgcode` codifica y comprime el G-code ASCII: la razón es el tamaño, porque el texto ocupa mucho.',
        'No es una compresión cualquiera —las impresoras corren en hardware limitado, y por eso comprimir no es trivial—,.',
        'pero el origen del formato es el peso del fichero, no la limitación del hardware.',
        'En PrusaSlicer se activa en Printers → General → Support binary G-code y viene activado por defecto desde la versión 2.7.0.',
        'la conversión en los dos sentidos está en File → Convert.',
        'Hace falta firmware que lo soporte —en MINI, MK4 y XL desde el 5.1.0— y hay programas externos de control, OctoPrint entre ellos,.',
        'que pueden tener problemas con él.',
      ],
      indicador: 'slicer',
      cuerpo:
        'El `.bgcode` codifica y comprime el G-code ASCII: la razón es el tamaño, porque el texto ocupa mucho. No es una compresión cualquiera —las impresoras corren en hardware limitado, y por eso comprimir no es trivial—, pero el origen del formato es el peso del fichero, no la limitación del hardware. En PrusaSlicer se activa en Printers → General → Support binary G-code y viene activado por defecto desde la versión 2.7.0; la conversión en los dos sentidos está en File → Convert. Hace falta firmware que lo soporte —en MINI, MK4 y XL desde el 5.1.0— y hay programas externos de control, OctoPrint entre ellos, que pueden tener problemas con él.',
      cifra: { valor: '~70 %', nota: 'reducción media de tamaño en las pruebas de Prusa' },
    },
    {
      id: 'sin-firma',
      titulo: 'Si el archivo no trae firma',
      cuando: { slicer: 'desconocido' },
      puntos: [
        'Esta app lee la cabecera del fichero y busca la firma de una de las tres familias que sabe leer; si no aparece ninguna,.',
        'el análisis se detiene y el panel pide volver a exportar el G-code desde el slicer para que incluya la cabecera con los ajustes.',
        'Las dos causas que el analizador admite son un fichero truncado y un programa que no escribe cabecera.',
        'El analizador también agrupa por familias: OrcaSlicer,.',
        'Bambu Studio y los forks de Creality comparten convención y no se distinguen entre sí, igual que PrusaSlicer y SuperSlicer.',
        'Eso es cosa del analizador, no de la documentación de ningún fabricante —que, como se ve arriba, tampoco lista la cabecera—.',
      ],
      indicador: 'slicer',
      cuerpo:
        'Esta app lee la cabecera del fichero y busca la firma de una de las tres familias que sabe leer; si no aparece ninguna, el análisis se detiene y el panel pide volver a exportar el G-code desde el slicer para que incluya la cabecera con los ajustes. Las dos causas que el analizador admite son un fichero truncado y un programa que no escribe cabecera. El analizador también agrupa por familias: OrcaSlicer, Bambu Studio y los forks de Creality comparten convención y no se distinguen entre sí, igual que PrusaSlicer y SuperSlicer. Eso es cosa del analizador, no de la documentación de ningún fabricante —que, como se ve arriba, tampoco lista la cabecera—.',
    },
  ],

  reglas: [
    {
      id: 'perfil-aplicado',
      accion: 'Confirma que el perfil aplicado es el de tu impresora y tu material',
      porque:
        'Todo lo que el programa calcula se hace para el montaje que describe el perfil: con otro material u otra máquina, el fichero sale bien laminado para otra cosa, hasta la estimación de tiempo.',
      fuente: 'Bambu Lab, Prusa Research',
      alcance:
        'No depende de ninguna variable de esta guía: es la comprobación previa a todas las demás. Y un perfil de impresión no es propiedad del fabricante del slicer —Prusa trae presets integrados para muchos materiales, pero se puede importar el de otra casa—.',
    },
    {
      id: 'revisa-salida',
      accion: 'Revisa la salida del G-code antes de enviarla a la impresora',
      porque:
        'Cura avisa en su página de Start/End G-code: editar el G-code a mano puede dañar la impresora, y hay que comprobar la salida antes de enviarla. Es la única que ve el fichero que va a correr.',
      fuente: 'Ultimaker Cura',
      alcance:
        'Es un aviso de Cura sobre su propia salida, no una lista de comentarios. Y aquí está el hueco de esta guía: ninguna de las nueve fuentes enumera la cabecera ni qué comentarios escribe el slicer por su cuenta. Cómo se lee esa cabecera en esta app es cosa del analizador, no de Cura —está en la tarjeta «Si el archivo no trae firma».',
    },
    {
      id: 'vista-de-capas',
      accion: 'Inspecciona la vista de capas antes de exportar',
      porque:
        'Prusa lo pone como buena práctica literal: en esa vista se ve si la forma coincide con el modelo y se detectan las piezas en el aire. Bambu: la ruta capa a capa muestra si el G-code es el esperado.',
      fuente: 'Prusa Research, Bambu Lab',
      alcance:
        'Es una condición del recorrido, no de un material ni de un síntoma: se hace antes de exportar, con el perfil ya elegido.',
    },
    {
      id: 'relaminar',
      accion: 'Vuelve a laminar y a exportar después de cada cambio',
      porque:
        'Es literal: si modificas cualquier parámetro, hay que laminar otra vez. Un ajuste cambiado en el proyecto no viaja al fichero exportado: el G-code de la tarjeta SD sigue siendo el de antes.',
      fuente: 'Bambu Lab',
      alcance:
        'No depende de ninguna variable de esta guía: es cierta para cualquier programa y cualquier material, porque lo que se vuelve a laminar es el fichero, no el perfil. Un ajuste cambiado en el proyecto no viaja al G-code ya exportado.',
    },
    {
      id: 'orca-verbose',
      accion: 'Activa Verbose G-code si vas a leer el fichero',
      valor: '--gcode-comments=1',
      porque:
        'Orca documenta el booleano `gcode_comments` (modo Advanced): añade comentarios para que el fichero sea legible. Su página da el coste: ficheros mucho más grandes y lentitud al imprimir desde SD.',
      cuando: { slicer: 'orca' },
      fuente: 'OrcaSlicer',
      alcance:
        'Es un interruptor que existe, no una lista de comentarios: la página no enumera ninguno. Y el modo en que está el slicer decide si se ve siquiera la casilla.',
    },
    {
      id: 'bambu-visor',
      accion: 'Abre la información de laminado y revísala capa a capa',
      porque:
        'Bambu muestra por capa el tipo de línea, el filamento, la velocidad y la ruta: así se ve si el G-code es el esperado. Es donde se añaden pausas y G-code propio por capa, la torre de temperaturas.',
      cuando: { slicer: 'bambu' },
      fuente: 'Bambu Lab',
      alcance:
        'Lo que muestra el visor no es lo que está escrito en el fichero: la página no dice que la temperatura de boquilla viaje como comentario.',
    },
    {
      id: 'cura-plantillas',
      accion: 'Revisa el Start y End G-code de tu máquina',
      porque:
        'Cura documenta cuatro puntos de inserción y dos avisos con ⚠️: editar el G-code a mano puede dañar la impresora, y hay comandos propios que sólo se deben quitar si se sabe para qué valen.',
      cuando: { slicer: 'cura' },
      fuente: 'Ultimaker Cura',
      alcance:
        'Se configuran en Preferences → Configure Cura… → Printers → Machine Settings. Los marcadores se resuelven al exportar y el valor acaba en la instrucción, no en un comentario: el comentario de su ejemplo lo escribe quien configura el perfil.',
    },
    {
      id: 'prusa-snapshots',
      accion: 'Comprueba la carpeta snapshots antes de actualizar el slicer',
      porque:
        'PrusaSlicer crea siempre una copia de seguridad de todos los perfiles de impresión antes de una actualización. Si tras actualizar tu perfil ha cambiado sin que lo tocaras, la copia está ahí.',
      cuando: { slicer: 'prusa' },
      fuente: 'Prusa Research',
      alcance:
        'La copia es de los perfiles de impresión, y la fuente da las rutas literales para Windows, Mac y Linux.',
    },
    {
      id: 'sin-firma',
      accion: 'Vuelve a exportar el G-code desde el slicer con la cabecera puesta',
      porque:
        'Sin la firma de las tres familias que el analizador lee, el análisis se detiene: no hay material, ni temperaturas, ni altura de capa. Fichero truncado o programa sin cabecera: la misma solución.',
      cuando: { slicer: 'desconocido' },
      fuente: 'El analizador de esta app',
      alcance:
        'Es el comportamiento de esta app, no una recomendación de ningún fabricante. Ninguna de las nueve fuentes de esta guía lista la cabecera de un G-code, así que tampoco se puede decir qué comentario faltaba.',
    },
    {
      id: 'binario-convertir',
      accion: 'Convierte el fichero a texto antes de revisarlo',
      porque:
        'El `.bgcode` es el ASCII codificado y comprimido: no es texto, no se abre con un editor. En PrusaSlicer se desactiva en Printers → General → Support binary G-code, y se convierte en File → Convert.',
      cuando: { formato: 'binario' },
      fuente: 'Prusa Research',
      alcance:
        'Si usas un programa externo de control, la fuente avisa de que OctoPrint puede tener problemas con el binario. Y no dice si los metadatos se conservan o desaparecen: no se puede concluir ninguna de las dos cosas.',
    },
  ],

  fueraDeAlcance: [
    {
      sintoma: 'Las esquinas se levantan de la cama',
      porQue:
        'Si la previsualización estaba bien y la pieza impresa se curva, el origen es térmico y mecánico, no del laminado. Subir la cama, cambiar el brim o el ventilador se hace en la guía de warping, no aquí.',
      guia: 'warping-pla',
    },
    {
      sintoma: 'Las capas se sueltan por dentro y la base está plana',
      porQue:
        'La unión entre capas es temperatura, flujo y material. Por bien laminado que esté el fichero, no arregla una adhesión entre capas que no se dio.',
      guia: 'separaciones-entre-capas',
    },
    {
      sintoma: 'La primera capa no se pega o sale irregular',
      porQue:
        'La adhesión de la primera capa es chapa, nivelado y distancia entre boquilla y cama: es estado de la máquina, con su propio protocolo.',
      guia: 'adhesion-primera-capa',
    },
    {
      sintoma: 'Quieres la lista de comentarios que tu slicer escribe en la cabecera',
      porQue:
        'Ninguna de las nueve fuentes de esta guía los enumera: lo que hay documentado es un interruptor booleano en Orca y marcadores de posición en Cura. El hueco se declara y no se rellena, que es la regla de esta página.',
    },
  ],

  fuentes: [
    {
      url: 'https://help.prusa3d.com/article/prusaslicer-general-info_1910',
      quien: 'Prusa Research',
      que: 'PrusaSlicer General info: las tres pestañas de ajustes y qué hay en cada una.',
    },
    {
      url: 'https://help.prusa3d.com/article/first-print-with-prusaslicer_1753',
      quien: 'Prusa Research',
      que: 'First print with PrusaSlicer (2.9): el recorrido de modelo a fichero y la previsualización.',
    },
    {
      url: 'https://help.prusa3d.com/article/faq-prusaslicer_1789',
      quien: 'Prusa Research',
      que: 'FAQ de PrusaSlicer: licencia, copias de seguridad, estimación de tiempo y soportes de árbol.',
    },
    {
      url: 'https://help.prusa3d.com/article/prusament-tpu-95a-material-guide_899653',
      quien: 'Prusa Research',
      que: 'Guía del Prusament TPU 95A: un fabricante que remite al perfil de su propio slicer, y la visibilidad por modo.',
    },
    {
      url: 'https://help.prusa3d.com/article/binary-g-code_646763',
      quien: 'Prusa Research',
      que: 'Binary G-code: qué es el .bgcode, su tamaño y cómo se activa y se convierte.',
    },
    {
      url: 'https://wiki.bambulab.com/en/software/bambu-studio/how-to-set-slicing-parameters',
      quien: 'Bambu Lab',
      que: 'Setting Guide of Slicing Parameters: las tres categorías, los niveles y los presets.',
    },
    {
      url: 'https://wiki.bambulab.com/en/software/bambu-studio/view-slicing-information',
      quien: 'Bambu Lab',
      que: 'View slicing information: qué se inspecciona capa a capa y el G-code propio por capa.',
    },
    {
      url: 'https://www.orcaslicer.com/wiki/print_settings/others/others_settings_g_code_output.html',
      quien: 'OrcaSlicer',
      que: 'G-Code Output: el booleano Verbose G-code, la numeración de líneas y la plantilla de nombre.',
    },
    {
      url: 'https://github.com/Ultimaker/Cura/wiki/Start-End-G%E2%80%90Code',
      quien: 'Ultimaker Cura',
      que: 'Start-End G-Code: los cuatro puntos de inserción y los marcadores que se resuelven al exportar.',
    },
  ],
};
