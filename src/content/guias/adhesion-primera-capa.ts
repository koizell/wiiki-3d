import type { Guia } from './tipos';
import { AUTOR } from './autor.ts';

/**
 * Adhesión en la primera capa.
 *
 * La cuarta guía, y la que mejor justifica el formato, porque **su propio material
 * cocinado dice que no se puede escribir como artículo**.
 *
 * ## El aviso del cocinero que este fichero tiene que respetar
 *
 * De las ocho fuentes del lote —cocinadas en 19.929 palabras— **ninguna escribe un orden de
 * comprobación**. Hay cuatro listas de causas y las cuatro son sin prioridad. Bambu numera
 * tres apartados pero no pone ni una palabra de prioridad, y al tercero le pone su propio
 * adjetivo de frecuencia: *«in some rare cases»*. Prusa da una lista donde la calibración
 * de primera capa va la primera, pero el encabezado es **«Common factors»** —qué factores
 * son comunes, no en qué orden mirar—, la pregunta que responde es qué causa
 * infraextrusión, y los otros cinco factores **no son de adhesión**.
 *
 * La única prioridad escrita en todo el lote es de otra clase y cabe en una frase: **«antes
 * de pensar en materiales adhesivos, considera el ala»**. Es una prioridad entre dos
 * acciones concretas, no entre las causas.
 *
 * ## Qué hace esta guía con eso
 *
 * Dos cosas, y las dos están escritas en la etapa 4:
 *
 * - El orden de las acciones es **nuestro**, y se declara como tal en la propia etapa. No se
 *   cita a nadie para el orden.
 * - Se publica la única posición escrita —la calibración de primera capa primero en la lista
 *   de factores de infraextrusión— **con su encabezado al lado y con su alcance entero**, que
 *   es «responde a otra pregunta». Un dato de posición es publicable; un protocolo fingido,
 *   no.
 *
 * ## Y lo que hace mejor que las otras tres
 *
 * Es la única del lote con **dos ramas de fallo en el mismo síntoma**: la falta de adhesión
 * tiene su reflejo, y el reflejo no es que la pieza se levante. Aprietas la boquilla para
 * forzar la adhesión, la primera capa queda apretada de más y **el filamento no puede
 * empujarse**: la impresión sale infraextruida. Quien baja la boquilla contra la chapa para
 * que pegue está **cambiando de fallo**, y eso lo dice un imperative, no un consejo.
 *
 * Esa frase es la pieza que faltaba para el diagnóstico diferencial de todo el lote, y es
 * la que abre esta guía.
 */
export const adhesion: Guia = {
  slug: 'adhesion-primera-capa',
  titulo: 'Adhesión en la primera capa',
  resumen:
    'La base no se pega.',
  resumenExtra:
    'Antes de tocar nada, comprueba que no sea infraextrusión —apretar la boquilla cambia de fallo— y que el perfil diga la chapa que tienes montada.',
  sintoma: 'La base no se pega a la cama',
  dibujo: 'primera-capa',
  entrada: 'La primera capa no pega, o pega y sale frágil. Son dos fallos distintos con dos arreglos distintos, y apretar la boquilla para forzarla cambia de fallo. Aquí se empieza por saber cuál de los dos tienes.',
  autor: AUTOR,
  actualizado: '2026-10-11',
  minutos: 3,

  /*
   * El diferencial, y es el mejor de las cuatro guías.
   *
   * Las tres comprobaciones salen del material cocinado y las tres tienen respaldo:
   * `under-extrusion` da la primera y la tercera, `first-layer-issues` da la segunda, y la
   * guía del i3 da el patrón de prueba. Y las dos caras negativas no salen por descarte
   * aesthetic: **cada una tiene su propio destino**, que es lo que hace que este filtro
   * sirva y no sea un formulario.
   */
  diferencial: {
    contra: 'warping o infraextrusión',
    comprobaciones: [
      {
        id: 'donde',
        mira: '¿Dónde falla: en toda la base o en un punto?',
        si: 'La base no pega en absoluto, y se levanta al tocar el borde. Es un problema de la primera capa.',
        no: 'Se levanta una esquina o un punto concreto, o la adhesión va y viene. Eso es otra cosa.',
      },
      {
        id: 'bajo',
        mira: '¿Bajaste la boquilla para que pegara?',
        si: 'La pieza ahora se pega, pero sale frágil y con las capas rotas por dentro. Has cambiado de fallo: apretar la primera capa impide que el filamento salga.',
        no: 'No has tocado la boquilla, o sí y el problema era el mismo. Entonces sigue siendo adhesión.',
      },
      {
        id: 'quitar',
        mira: '¿La pieza se despega, o no se puede quitar?',
        si: 'No se puede despegar, y a veces se lleva la chapa. Con PETG, ABS o ASA sobre PEI lisa la adhesión puede ser demasiado fuerte.',
        no: 'Se va con la mano. Es falta de adhesión, y este es el caso que cubre la guía.',
      },
    ],
    siNo: { guia: 'warping-pla', etiqueta: 'Warping en PLA' },
  },

  variables: [
    {
      id: 'sintoma',
      etiqueta: '¿Qué hace exactamente?',
      indicador: 'general',
      para: 'El nombre del fallo decide el diagnóstico, y hay cuatro ramas distintas que se confunden entre sí.',
      necesaria: true,
      opciones: [
        { id: 'nada', etiqueta: 'La base no se pega', detalle: 'Se suelta al sacarla' },
        { id: 'esquina', etiqueta: 'Se levanta una esquina' },
        { id: 'fragil', etiqueta: 'Sale frágil, con capas rotas' },
        { id: 'pegada', etiqueta: 'No se puede despegar' },
        { id: 'huecos', etiqueta: 'La línea de prueba sale con huecos' },
      ],
    },
    {
      id: 'donde',
      etiqueta: '¿Dónde falla?',
      indicador: 'entorno',
      para: 'En toda la base o en un punto cambia lo que se mira: una punto es geometría, y toda la base es el ajuste.',
      necesaria: true,
      opciones: [
        { id: 'toda', etiqueta: 'En toda la base' },
        { id: 'punto', etiqueta: 'En un punto concreto' },
        { id: 'inconsistente', etiqueta: 'A veces sí, a veces no' },
      ],
    },
    {
      id: 'material',
      etiqueta: 'Material',
      indicador: 'material',
      para: 'Los que se pegan de más son un grupo distinto de los que se despegan, y el remedio es el contrario.',
      necesaria: true,
      /*
       * `campos: ['material']` aquí y `campos: []` en la guía entera, y no es una
       * contradicción: el campo del panel que esta guía **explica** es ninguno, y
       * el que **lee** es el material. La barra «Tu archivo» sólo pinta lo que la
       * guía declara, así que aquí enseña el material y nada más.
       */
      campos: ['material'],
      opciones: [
        { id: 'pla', etiqueta: 'PLA', detalle: 'El que peor se pega de todos' },
        { id: 'pla-cf', etiqueta: 'PLA-CF' },
        { id: 'petg', etiqueta: 'PETG', detalle: 'Se pega de más sobre PEI lisa' },
        { id: 'abs', etiqueta: 'ABS o ASA', detalle: 'También se pega de más' },
        { id: 'pa', etiqueta: 'PA o XT' },
      ],
    },
    {
      id: 'chapa',
      etiqueta: 'Chapa',
      indicador: 'cama',
      para: 'La máquina baja la boquilla según la chapa, y no avisa de cuál tiene montada.',
      necesaria: true,
      opciones: [
        { id: 'cool', etiqueta: 'Cool Plate o lisa' },
        { id: 'textured', etiqueta: 'Textured PEI', detalle: 'Baja la boquilla 0,04 mm' },
        { id: 'smooth', etiqueta: 'Smooth PEI' },
        { id: 'engineering', etiqueta: 'Engineering Plate' },
        { id: 'acero', etiqueta: 'Chapa de acero flexible' },
      ],
    },
    {
      id: 'perfil',
      etiqueta: '¿El perfil dice la chapa que tienes montada?',
      indicador: 'slicer',
      para: 'Es la causa más silenciosa de las cuatro: si el perfil no coincide, la máquina baja la boquilla de más o de menos sin que nadie lo note.',
      opciones: [
        { id: 'si', etiqueta: 'Sí, revisado' },
        { id: 'no', etiqueta: 'No, o no lo sé' },
      ],
    },
    {
      id: 'calibrada',
      etiqueta: '¿Has hecho la calibración de primera capa?',
      indicador: 'calibracion',
      para: 'Si la hiciste y el patrón se ve bien, Prusa dice que el problema está en otro sitio, y nombra cuatro.',
      opciones: [
        { id: 'si', etiqueta: 'Sí, y el patrón se ve bien' },
        { id: 'hecha', etiqueta: 'Sí, pero no sé cómo quedó' },
        { id: 'no', etiqueta: 'No, o no me acuerdo' },
      ],
    },
    ],

  conocimiento: [
    {
      id: 'apretar',
      titulo: 'Apretar la boquilla no arregla la adhesión: cambia de fallo',
      puntos: [
        'Es lo primero que va a hacer cualquiera y es un cambio de problema.',
        'Si acercas la boquilla a la chapa para forzar la adhesión,.',
        'la primera capa queda apretada de más y el filamento deja de poder empujarse a través de la boquilla.',
        'El síntoma de eso **no es que la pieza no pegue**: es que sale con material menos, frágil, y con las capas rotas por dentro.',
        'Prusa lo escribe con un imperativo, no como un consejo.',
      ],
      indicador: 'calibracion',
      cuerpo:
        'Es lo primero que va a hacer cualquiera y es un cambio de problema. Si acercas la boquilla a la chapa para forzar la adhesión, la primera capa queda apretada de más y el filamento deja de poder empujarse a través de la boquilla. El síntoma de eso **no es que la pieza no pegue**: es que sale con material menos, frágil, y con las capas rotas por dentro. Prusa lo escribe con un imperativo, no como un consejo.',
      cita: {
        texto:
          'Avoid compensating for a lack of adhesion by squishing the first layer too much. If the nozzle is too close to the build plate, the filament can be obstructed from pushing through.',
        fuente: 'help.prusa3d.com',
      },
    },
    {
      id: 'demasiado',
      titulo: 'La asimetría: los dos lados hacen cosas distintas',
      puntos: [
        'La boquilla demasiado lejos deja la pieza suelta y puede salir un bulto.',
        'La boquilla demasiado cerca hace que **la pieza se pegue de más** y puede dañar la chapa flexible.',
        'Prusa pone, en la línea siguiente, que ese daño no está cubierto por la garantía.',
        'No son dos grados del mismo fallo: son dos fallos con dos consecuencias opuestas.',
      ],
      indicador: 'cama',
      cuerpo:
        'La boquilla demasiado lejos deja la pieza suelta y puede salir un bulto. La boquilla demasiado cerca hace que **la pieza se pegue de más** y puede dañar la chapa flexible. Prusa pone, en la línea siguiente, que ese daño no está cubierto por la garantía. No son dos grados del mismo fallo: son dos fallos con dos consecuencias opuestas.',
      cita: {
        texto:
          'if set too close, you can experience extrusion problems and clogging and poor print quality, or even damage to the hardware, like the Flexible steel sheet',
        fuente: 'help.prusa3d.com',
      },
    },
    {
      id: 'visualmente-bien',
      titulo: 'Si el patrón se ve bien, el problema está en otro sitio',
      puntos: [
        'Es la afirmación más útil del lote para diagnosticar, y su valor está en ser **negativa**.',
        'una calibración que se ve correcta **no descarta** que el problema de adhesión exista,.',
        'sólo lo desplaza fuera del ajuste Z. Prusa nombra cuatro sitios: chapa sucia o grasa, ajustes de impresión, nivelación o calibración XYZ,.',
        'e infraextrusión.',
        'El original dice «en otro sitio, como…»: es una lista de derivación, no una cola de trabajo, y no está cerrada.',
      ],
      indicador: 'calibracion',
      cuerpo:
        'Es la afirmación más útil del lote para diagnosticar, y su valor está en ser **negativa**: una calibración que se ve correcta **no descarta** que el problema de adhesión exista, sólo lo desplaza fuera del ajuste Z. Prusa nombra cuatro sitios: chapa sucia o grasa, ajustes de impresión, nivelación o calibración XYZ, e infraextrusión. El original dice «en otro sitio, como…»: es una lista de derivación, no una cola de trabajo, y no está cerrada.',
      cuando: { calibrada: ['si', 'hecha'] },
      cita: {
        texto:
          'if you are having problems with adhesion, but your first layer calibration looks like the good picture, your problem lies somewhere else',
        fuente: 'help.prusa3d.com',
      },
    },
    {
      id: 'chapa-silenciosa',
      titulo: 'La Textured PEI baja la boquilla 0,04 mm, y no hay aviso',
      /*
       * Esta tarjeta **sólo aparece si has marcado la Textured PEI**, y eso lo decidió
       * `verify:guias`.
       *
       * La primera versión tenía `cuando: { chapa: [las cinco] }`, es decir, se
       * enseñaba con cualquier chapa. Y la comprobación «ninguna variable es
       * decorativa» la marque: con las cinco opciones de chapa, la tarjeta salía
       * siempre y no distinguía ninguna.
       *
       * Ese aviso no era unanairesía de estilo, era un error de contenido. La tarjeta
       * dice «la<Textured PEI baja la boquilla 0,04 mm al nivelar», y la fuente **no dice
       * que haya un descenso equivalente para las otras chapas**: no publica ninguno. Verla
       * con una Cool Plate montada hace que quien la lee busque un descenso de 0,04 mm que
       * su máquina no hace.
       */
      cuando: { chapa: 'textured' },
      puntos: [
        'Cambiar de chapa es un cambio silencioso.',
        'La Textured PEI tiene superficie granular, así que la impresora **baja la boquilla 0,04 mm** al nivelar para asegurar la adhesión.',
        'Si laminaste para otra chapa e imprimes en la Textured, ese descenso no se aplica,.',
        'la boquilla queda demasiado alta y la primera capa no se pega.',
        'Y no hay ningún aviso: la impresora **no puede detectar qué chapa está instalada**.',
        'Es geometría, no temperatura.',
      ],
      indicador: 'calibracion',
      cuerpo:
        'Cambiar de chapa es un cambio silencioso. La Textured PEI tiene superficie granular, así que la impresora **baja la boquilla 0,04 mm** al nivelar para asegurar la adhesión. Si laminaste para otra chapa e imprimes en la Textured, ese descenso no se aplica, la boquilla queda demasiado alta y la primera capa no se pega. Y no hay ningún aviso: la impresora **no puede detectar qué chapa está instalada**. Es geometría, no temperatura.',
      cita: {
        texto:
          'the printer lowers the nozzle by 0,04 mm after heatbed leveling to ensure first-layer adhesion',
        fuente: 'wiki.bambulab.com',
      },
    },
    {
      id: 'grosor',
      titulo: 'Las chapas tienen distinto grosor, y por eso hay que recalibrar al cambiarlas',
      puntos: [
        'Tres páginas de Prusa lo dicen: lisa, satinada y texturizada tienen **grosor distinto**,.',
        'y por eso cada una necesita su propia calibración de primera capa.',
        'Ninguna de las tres da un milímetro de grosor ni un valor de Z: el motivo está escrito en palabras y en ningún número.',
        'Y el aviso es una prohibición, no una recomendación: **no puedes usar la misma calibración si cambias de chapa**.',
      ],
      indicador: 'calibracion',
      cuerpo:
        'Tres páginas de Prusa lo dicen: lisa, satinada y texturizada tienen **grosor distinto**, y por eso cada una necesita su propia calibración de primera capa. Ninguna de las tres da un milímetro de grosor ni un valor de Z: el motivo está escrito en palabras y en ningún número. Y el aviso es una prohibición, no una recomendación: **no puedes usar la misma calibración si cambias de chapa**.',
      cita: {
        texto:
          'You can not use the same first layer calibration if you swap between the Smooth and the textured sheet!',
        fuente: 'help.prusa3d.com',
      },
    },
    {
      id: 'patron',
      titulo: 'Los tres estados del patrón de prueba',
      puntos: [
        'En chapa lisa, el criterio es de superficie y no de número. **Demasiado alto:** la línea está aplastada pero no comprimida,.',
        'y en el cuadrado del final hay huecos entre líneas. **Demasiado bajo:** la línea está comprimida del todo y el cuadrado final tiene surcos.',
        'entre líneas. **Correcto:** superficie pareja,.',
        'sin huecos ni surcos.',
        'En chapa texturizada hay que acercar la boquilla más, y el curle en los bordes del cuadrado final es señal de que está **demasiado baja**,.',
        'no de que no pegue.',
      ],
      indicador: 'cama',
      cuerpo:
        'En chapa lisa, el criterio es de superficie y no de número. **Demasiado alto:** la línea está aplastada pero no comprimida, y en el cuadrado del final hay huecos entre líneas. **Demasiado bajo:** la línea está comprimida del todo y el cuadrado final tiene surcos entre líneas. **Correcto:** superficie pareja, sin huecos ni surcos. En chapa texturizada hay que acercar la boquilla más, y el curle en los bordes del cuadrado final es señal de que está **demasiado baja**, no de que no pegue.',
      cuando: { sintoma: ['huecos', 'nada'] },
    },
    {
      id: 'el-numero',
      titulo: 'El número del LCD no es un objetivo',
      cuando: { calibrada: ['hecha', 'no'] },
      puntos: [
        'Prusa da un rango de −0,400 a −1,500 y en la misma página dice que el valor **es único para cada máquina**,.',
        'que **no significa nada sin una referencia visual** y que además cambia algo con el uso.',
        'Es un valor de pantalla, no milímetros, y la página pide explícitamente lo contrario a usar el número: comprobar visualmente,.',
        'no por un valor fijo.',
        'No lo compares con el 0,04 mm de Bambu: no responden a la misma pregunta.',
      ],
      indicador: 'maquina',
      cuerpo:
        'Prusa da un rango de −0,400 a −1,500 y en la misma página dice que el valor **es único para cada máquina**, que **no significa nada sin una referencia visual** y que además cambia algo con el uso. Es un valor de pantalla, no milímetros, y la página pide explícitamente lo contrario a usar el número: comprobar visualmente, no por un valor fijo. No lo compares con el 0,04 mm de Bambu: no responden a la misma pregunta.',
      cifra: { valor: '−0,4 a −1,5', nota: 'valor de LCD, único por máquina, no un objetivo' },
    },
    {
      id: 'residuo',
      titulo: 'El residuo en la boquilla falsea todo',
      puntos: [
        'Tres sitios y dos fuentes, y es lo mejor corroborado del lote.',
        'Bambu lo pone como **condición previa** a la nivelación: si la punta tiene restos, limpia antes de calibrar.',
        'Prusa lo avisa en pantalla dos veces por caminos distintos: si la boquilla golpea la cama antes de que el sensor dispare,.',
        'la calibración se interrumpe y pide revisar la punta; y también salta el mismo aviso si **tocas la cama mientras está sondeando**.',
        'El mensaje en pantalla no distingue entre las dos causas: las enumera en la misma frase.',
      ],
      indicador: 'calibracion',
      cuerpo:
        'Tres sitios y dos fuentes, y es lo mejor corroborado del lote. Bambu lo pone como **condición previa** a la nivelación: si la punta tiene restos, limpia antes de calibrar. Prusa lo avisa en pantalla dos veces por caminos distintos: si la boquilla golpea la cama antes de que el sensor dispare, la calibración se interrumpe y pide revisar la punta; y también salta el mismo aviso si **tocas la cama mientras está sondeando**. El mensaje en pantalla no distingue entre las dos causas: las enumera en la misma frase.',
    },
    {
      id: 'malla',
      titulo: 'La malla densa es para adhesión irregular, y sólo eso',
      cuando: { donde: ['inconsistente', 'punto'] },
      puntos: [
        'La densidad por defecto de la malla es de 3×3, y Prusa propone subirla a 7×7 **«si sigues con adhesión irregular en la primera capa»**.',
        'La condición es la mitad del dato: no dice que sirva cuando la pieza se levanta por una esquina, ni cuando la base no pega en absoluto.',
        'Es un recurso para una adhesión que va y viene, no para una que falta.',
      ],
      indicador: 'calibracion',
      cuerpo:
        'La densidad por defecto de la malla es de 3×3, y Prusa propone subirla a 7×7 **«si sigues con adhesión irregular en la primera capa»**. La condición es la mitad del dato: no dice que sirva cuando la pieza se levanta por una esquina, ni cuando la base no pega en absoluto. Es un recurso para una adhesión que va y viene, no para una que falta.',
    },
    {
      id: 'falda',
      titulo: 'La falda es un test en vivo',
      puntos: [
        'La falda se imprime **antes que ningún modelo**, y por eso sirve para ver la primera capa sin esperar a que empiece la pieza.',
        'si no se pega bien, o si la boquilla la aprieta de más, cambias el ajuste mientras la ves.',
        'Es la razón por la que la falda está en las impresiones de Prusa con ese uso, y no sólo como adorno de purga.',
      ],
      indicador: 'calibracion',
      cuerpo:
        'La falda se imprime **antes que ningún modelo**, y por eso sirve para ver la primera capa sin esperar a que empiece la pieza: si no se pega bien, o si la boquilla la aprieta de más, cambias el ajuste mientras la ves. Es la razón por la que la falda está en las impresiones de Prusa con ese uso, y no sólo como adorno de purga.',
    },
    {
      id: 'pegamento',
      titulo: 'El pegamento va después del ala, y ese es el único orden escrito',
      puntos: [
        'Es la única prioridad explícita de las ocho fuentes, y cabe en una frase: **antes de pensar en materiales adhesivos, considera el ala**,.',
        'que aumenta la superficie de la primera capa.',
        'Prusa la recomienda para objetos altos con base pequeña y para varios objetos pequeños a la vez,.',
        'y un mínimo de 3 mm. Lo que esa frase **no** dice es que el ala vaya antes que limpiar o que antes que nivelar.',
        'sólo dice que va antes que el pegamento.',
      ],
      indicador: 'calibracion',
      cuerpo:
        'Es la única prioridad explícita de las ocho fuentes, y cabe en una frase: **antes de pensar en materiales adhesivos, considera el ala**, que aumenta la superficie de la primera capa. Prusa la recomienda para objetos altos con base pequeña y para varios objetos pequeños a la vez, y un mínimo de 3 mm. Lo que esa frase **no** dice es que el ala vaya antes que limpiar o que antes que nivelar: sólo dice que va antes que el pegamento.',
      cifra: { valor: '≥ 3 mm', nota: 'de ala, mínimo recomendado' },
      enlaza: { guia: 'temperatura-cama', etiqueta: 'Ver la limpieza de chapa' },
    },
    {
      id: 'limpieza',
      titulo: 'Si no tocas la superficie, no hay que limpiarla antes de cada impresión',
      puntos: [
        'Es la instrucción accionable que no está en la otra guía: si no tocas la superficie con las manos ni con herramientas sucias,.',
        '**no hace falta limpiarla antes de cada impresión**, y basta con limpiar las herramientas como limpias la cama.',
        'Contradice directamente a Bambu, que recomienda lavar antes de imprimir de forma incondicional.',
        'Las dos están escritas, y no se averaged aquí.',
      ],
      indicador: 'cama',
      cuerpo:
        'Es la instrucción accionable que no está en la otra guía: si no tocas la superficie con las manos ni con herramientas sucias, **no hace falta limpiarla antes de cada impresión**, y basta con limpiar las herramientas como limpias la cama. Contradice directamente a Bambu, que recomienda lavar antes de imprimir de forma incondicional. Las dos están escritas, y no se averaged aquí.',
      enlaza: { guia: 'temperatura-cama', etiqueta: 'Ver la limpieza de chapa' },
    },
  ],

  reglas: [
    {
      id: 'chapa-perfil',
      accion: 'Comprueba que el perfil dice la chapa que tienes montada',
      porque:
        'La Textured PEI tiene superficie granular y la impresora baja la boquilla 0,04 mm al nivelar para asegurar la adhesión. Si el perfil dice otra chapa, ese descenso no se aplica y la boquilla queda demasiado alta. Es la causa más silenciosa de las cuatro, porque la impresora **no puede detectar qué chapa está instalada** y no avisa.',
      /*
       * Sólo cuando la respuesta es «no, o no lo sé».
       *
       * La primera versión llevaba `cuando: { perfil: ['no', 'si'] }`, es decir, las dos
       * opciones, y `verify:guias` la marcó como variable decorativa por la razón de
       * siempre: si las dos opciones hacen lo mismo, no estás filtrando. Y la corrección
       * además es **más fiel a la fuente**: decirle a quien ya ha revisado que revise el
       * perfil otra vez es ruido, y lo que la fuente describe es el error que ocurre
       * *cuando* el tipo de chapa del perfil no es el de la montada.
       */
      cuando: { perfil: 'no' },
      valor: 'Textured PEI: la máquina baja 0,04 mm',
      fuente: 'Bambu Lab',
      alcance:
        'El 0,04 mm es de la Textured PEI y de su superficie granular. La fuente no dice que haya un descenso equivalente para las otras chapas, y no publica ninguno. Y el fallo que explica va en una sola dirección: **boquilla demasiado alta**. Elegir mal la chapa no la baja.',
    },
    {
      id: 'no-apretar',
      accion: 'Deja de apretar la boquilla para forzar la adhesión',
      cuando: { sintoma: ['fragil', 'nada'] },
      porque:
        'Acercar la boquilla deja la primera capa apretada de más y el filamento deja de poder empujarse a través. El resultado es una pieza que sí pega pero sale **infraextruida**: frágil y con las capas rotas por dentro. Es un cambio de fallo, no una solución, y la dirección de Prusa es un imperativo: no lo hagas.',
      fuente: 'Prusa Research',
      alcance:
        'No compensa por lo que la falta de adhesión te estaba dando: te da otro problema distinto. La calibración correcta es la que hace que el plástico se pegue y se vea ligeramente comprimido.',
    },
    {
      id: 'limpieza',
      accion: 'Limpia la chapa',
      valor: 'Agua templada y jabón; no toques la superficie después',
      porque:
        'Bambu recomienda lavar con agua caliente y detergente para quitar restos y contaminantes, y evitar tocar la superficie. Su eficacia está **condicionada**: resuelve la mayoría de los problemas de adhesión **siempre que los ajustes sean los correctos para el material y el tipo de chapa del slicer sea el correcto**. Sin esas dos condiciones, la frase deja de ser cierta.',
      cuando: { sintoma: ['nada', 'esquina', 'huecos'], donde: ['toda', 'inconsistente', 'punto'] },
      fuente: 'Bambu Lab',
      alcance:
        'Prusa dice lo contrario y en el mismo registro: si no tocas la superficie con las manos ni con herramientas sucias, no hace falta limpiarla antes de cada impresión. Las dos están escritas y no se promedian.',
    },
    {
      id: 'boquilla-limpia',
      accion: 'Limpia la punta de la boquilla antes de nivelar',
      /*
       * Sin condición, y por el motivo que escriben las dos fuentes.
       *
       * Bambu no da esto como un paso del diagnóstico: lo da como **condición previa**
       * a la nivelación —«después de asegurar que la punta está limpia y sin restos»—. Es
       * algo que se cumple siempre, no algo que se cumpla cuando declares una variable.
       * Y Prusa lo confirma por el otro lado, en pantalla: si la boquilla golpea la cama
       * antes de que el sensor dispare, la calibración se interrumpe y pide revisar la
       * punta.
       *
       * La guía tenía una variable «¿la boquilla estaba limpia al nivelar?» con dos
       * opciones que disparaban las dos la misma regla, y `verify:guias` la marcó como
       * decorativa. Quitar la variable **no pierde información**: la tarjeta `residuo`
       * sigue contando el síntoma, que es lo que se necesita para diagnosticar.
       */
      porque:
        'Un residuo en la punta falsea la nivelación entera: si golpea la cama antes de que el sensor dispare, la calibración se interrumpe y avisa. Y Bambu pone la limpieza de la punta como condición previa a nivelar, no como un paso aparte.',
      fuente: 'Bambu Lab, Prusa Research',
      alcance:
        'Es una condición previa, no un remedio: se cumple siempre, y por eso la acción no se filtra por ninguna variable. Y el aviso de Prusa salta también si tocas la cama mientras está sondeando, sin distinguir las dos causas.',
    },
    {
      id: 'nivela',
      accion: 'Nivela la cama',
      cuando: { donde: ['toda', 'inconsistente', 'punto'] },
      porque:
        'La nivelación es una de las cuatro salidas que da Prusa cuando la calibración se ve bien y el problema persiste. La razón es geométrica: una malla mal hecha deja zonas de la base más lejos de la boquilla de lo que deberían.',
      fuente: 'Prusa Research, Bambu Lab',
      alcance:
        '**Bambu la sitúa como causa rara y lo dice con su propio adjetivo:** *«in some rare cases»*, y describe una adhesión **inconsistente**, no una esquina levantada. Es la única de las ocho fuentes que menciona la nivelación como causa, y por eso el «raro» viene con la acción y no puede separarse de ella.',
    },
    {
      id: 'malla',
      accion: 'Sube la densidad de la malla a 7×7',
      cuando: { donde: 'inconsistente' },
      valor: '49 puntos en vez de 9',
      porque:
        'Prusa propone subir la densidad cuando **sigue habiendo adhesión irregular** en la primera capa. Los puntos de más cerca de los imanes están bastante cerca: la lectura puede desviarse hasta 80 µm, y la compensación de imanes los descarta. Prusa sugiere dejar esa función activada.',
      fuente: 'Prusa Research',
      alcance:
        'La condición es «adhesión irregular». **No** es un recurso para cuando la base no pega en absoluto, ni para una esquina levantada. Y sólo está en el bloque de máquinas con sensor PINDA y SuperPINDA; el MINI usa malla 4×4 y los modelos con LoadCell miden dentro del área de la impresión.',
    },
    {
      id: 'al-cambiar-chapa',
      accion: 'Recalibra la primera capa al cambiar de chapa',
      /*
       * Esta regla **no tiene condición**, y es lo correcto: el motivo es que las chapas
       * tienen distinto grosor, y eso no depende del material ni del síntoma.
       *
       * La primera versión ponía `cuando: { chapa: [las cinco opciones] }`, que es lo mismo
       * que no poner nada pero hace creer que filtra. Y `verify:guias` lo cazó por el otro
       * lado: con las cinco opciones listadas ninguna se distinguía de las demás, y la
       * comprobación «cada variable cambia el resultado en algún montaje» falló diciendo que
       * `chapa` no servía para nada.
       *
       * La guía **sí** necesita que declares la chapa, y por eso la preguntan dos reglas y
       * una tarjeta que sí discriminan: el 0,04 mm de la Textured PEI y el separador de la
       * PEI lisa.
       */
      porque:
        'Las chapas tienen grosor distinto y por eso cada una necesita su propia calibración. Tres páginas de Prusa lo dicen y ninguna da el milímetro. En las impresoras que tienen esta calibración se pueden guardar hasta ocho perfiles de chapa, cada uno con su valor.',
      fuente: 'Prusa Research',
      alcance:
        'El aviso de la fuente es una **prohibición**: no puedes usar la misma calibración de primera capa si cambias entre la lisa y la texturizada. La acción no se filtra por ninguna variable porque el motivo —el grosor— es de la chapa, no del material ni del síntoma. Ninguna de las tres páginas da el grosor en milímetros, así que el motivo está escrito en palabras y en ningún número.',
    },
    {
      id: 'tras-mover',
      accion: 'Repite la calibración si has movido la impresora o has cambiado la boquilla',
      cuando: { calibrada: ['no', 'hecha', 'si'] },
      porque:
        'Dos páginas de Prusa escriben los mismos dos desencadenantes: cambiar de boquilla y mover la impresora a otro sitio. Y hay un buen filtro antes de nada: las impresoras de fábrica ya vienen ajustadas y esta calibración hace falta sobre todo si montaste el kit en casa o si has cambiado la boquilla.',
      fuente: 'Prusa Research',
      alcance:
        '**Ninguna de las dos páginas dice «cada impresión».** Son dos desencadenantes concretos, no una obligación periódica.',
    },
    {
      id: 'brim',
      accion: 'Aplica un ala antes de pensar en pegamento',
      cuando: { sintoma: ['nada', 'esquina', 'huecos'] },
      valor: 'Al menos 3 mm',
      porque:
        'El ala aumenta la superficie de la primera capa. Es la única prioridad escrita en las ocho fuentes del lote, y dice dos cosas: que el ala va antes que los materiales adhesivos, y que Prusa la recomienda para objetos altos con base pequeña y para varios objetos pequeños a la vez.',
      fuente: 'Prusa Research',
      alcance:
        'La prioridad cubre **sólo esos dos casos**. No dice que el ala vaya antes que limpiar la chapa ni que antes que nivelar: sólo dice que va antes que el pegamento.',
    },
    {
      id: 'falda',
      accion: 'Mira la falda durante la impresión y ajusta ahí',
      porque:
        'La falda se imprime antes que ningún modelo, así que puedes ver la primera capa sin esperar a la pieza. Si ves que no se pega bien, o que la boquilla la aprieta demasiado, cambias el ajuste ahí mismo.',
      cuando: { sintoma: ['nada', 'huecos'] },
      fuente: 'Prusa Research',
    },
    {
      id: 'lento',
      accion: 'Baja la velocidad al 75 % en las tres primeras capas',
      valor: '75 % sólo durante las tres primeras',
      porque:
        'Es lo último que propone la página, y su posición importa: dice **«si los pasos anteriores no ayudaron»**. Se hace con el mando durante la impresión, bajando el porcentaje.',
      cuando: { sintoma: ['nada', 'huecos'], donde: ['toda', 'inconsistente', 'punto'] },
      fuente: 'Prusa Research',
      alcance:
        'Es una recomendación, no un dato: la página **no trae ningún caso con antes y después** que la respalde. Y la frase no nombra material, ni modelo de impresora, ni chapa, así que es lo más general que hay en el lote y no se puede atribuir a nada concreto.',
    },
    {
      id: 'separador',
      accion: 'Usa un separador si la pieza no se puede despegar',
      cuando: { material: ['petg', 'abs', 'pa'], sintoma: 'pegada' },
      porque:
        'Con PETG, ABS, ASA, XT y CPH la adhesión **puede ser demasiado fuerte**, y entonces se puede dañar la chapa PEI lisa. El remedio que da la misma frase es un separador, como un stick de pegamento.',
      fuente: 'Prusa Research',
      alcance:
        'Es el otro modo de fallo del mismo síntoma y es oficial: el «no se pega» y el «no se quita» son ramas distintas. La página lo dice en un párrafo de limpieza y **no lo presenta como efecto de una cama demasiado caliente**; en ese párrafo no hay ninguna cifra.',
    },
  ],

  fueraDeAlcance: [
    {
      sintoma: 'La pieza sale frágil y con huecos dentro de las capas',
      porQue:
        'Es un problema de extrusión, no de adhesión. La lista de seis causas que da Prusa —calibración, ajustes del slicer, boquilla, engranajes del extrusor, refrigeración del hotend y filamento— está cocinada y revisada, y cinco de las seis no tocan la cama. Lo único que se cruza con esta guía es el primero.',
    },
    {
      sintoma: 'Se levanta una esquina de una pieza grande',
      porQue:
        'Es warping: contracción térmica, no adhesión. La primera capa puede estar perfecta y la esquina levantarse igual. Cambiar el ajuste Z no lo arregla.',
      guia: 'warping-pla',
    },
    {
      sintoma: 'Necesitas el ajuste de flujo',
      porQue:
        'La calibración del multiplicador de extrusión mide el grosor medio de la pared con un calibre, y es una calibración avanzada para usuarios con experiencia. Mide la superficie del cubo, no su base: una superficie superior lisa no dice nada sobre cómo se sujeta la pieza.',
    },
    {
      sintoma: 'La pieza no se despega y te interesa el consumo',
      porQue:
        'La temperatura de cama es una de las variables de la adhesión y tiene su propia guía, con las seis cifras del PLA y qué pasa por material. Esta guía no publica ninguna cifra de cama propia.',
      guia: 'temperatura-cama',
    },
  ],

  fuentes: [
    {
      url: 'https://wiki.bambulab.com/en/knowledge-sharing/first-layer-not-sticking',
      quien: 'Bambu Lab',
      que: 'Página de primera capa que no se pega: tipo de chapa, limpieza, nivelación, y el 0,04 mm de la Textured PEI.',
    },
    {
      url: 'https://help.prusa3d.com/article/first-layer-calibration-i3_112364',
      quien: 'Prusa Research',
      que: 'Guía del i3: los tres estados del patrón, la asimetría alto/bajo y las cuatro salidas de Prusa.',
    },
    {
      url: 'https://help.prusa3d.com/article/under-extrusion_2007',
      quien: 'Prusa Research',
      que: 'Adhesión mala que no es un fallo de adhesión, y los seis factores de infraextrusión.',
    },
    {
      url: 'https://help.prusa3d.com/article/steel-sheet-profiles_1955',
      quien: 'Prusa Research',
      que: 'Perfiles por chapa: el grosor como motivo, y que la impresora no puede detectar la chapa montada.',
    },
    {
      url: 'https://help.prusa3d.com/article/mesh-bed-leveling_112163',
      quien: 'Prusa Research',
      que: 'Malla 3×3 y 7×7, compensación de imanes y el aviso del StallGuard por residuo.',
    },
    {
      url: 'https://help.prusa3d.com/article/skirt-and-brim_133969',
      quien: 'Prusa Research',
      que: 'Falda como test en vivo, y el ala antes que los materiales adhesivos.',
    },
    {
      url: 'https://help.prusa3d.com/article/first-layer-issues_1804',
      quien: 'Prusa Research',
      que: 'Limpieza condicional, adhesión excesiva con separador, y la velocidad al final de la lista.',
    },
    {
      url: 'https://help.prusa3d.com/article/extrusion-multiplier-calibration_2257',
      quien: 'Prusa Research',
      que: 'La calibración del flujo. Su valor aquí es negativo: sirve para descartar extrusión.',
    },
  ],

  campos: [],
  leeDelAnalisis: ['material'],
};