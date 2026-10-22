import type { Guia } from './tipos.ts';
import { AUTOR } from './autor.ts';

/**
 * La costura Z.
 *
 * La guía cuyo producto principal es una **decisión**, no un ajuste: ¿esto es la
 * costura, dónde la pongo para que estorbe menos y cuándo lo que veo es normal?
 *
 * ## Por qué esta guía no habla de un defecto
 *
 * Porque las dos casas del corpus dicen, con redactores distintos, lo mismo: la
 * costura es un fenómeno **normal e inevitable** en FFF y **no se puede eliminar**.
 * Publicarla como «el problema a corregir» contradiría a sus dos fuentes
 * primarias. Así que lo que esta guía publica es **qué se puede mejorar** y
 * **qué es normal que se vea**, y hay una regla que lo dice en voz alta.
 *
 * ## Las dos nomenclaturas, con su casa
 *
 * Las dos ofrecen las mismas cuatro posiciones, pero **las lógicas no
 * coinciden**: Bambu da *Nearest / Aligned / Back / Random* y Prusa *Nearest /
 * Aligned / Rear / Random*. Se publican **las dos, con su casa**, y no un menú
 * común: el cuarto modo se llama distinto y además **hace otra cosa** —*Back* va
 * detrás de la pieza y *Rear* al fondo de la cama, funcionando como *Aligned*—,
 * y el tipo del modo de bufanda también.
 *
 * ## El *seam gap* no se funde
 *
 * Bambu Studio lo expresa como **porcentaje del diámetro actual de la boquilla**
 * y publica un default (**15 %**). PrusaSlicer lo expresa como una **distancia
 * con signo** —positiva interrumpe el lazo, negativa lo solapa— y no publica
 * default. Son dos parametrizaciones de dos programas distintos: el 15 % no se
 * traduce a milímetros aquí ni se mezcla con la distancia con signo.
 *
 * ## El dato de resistencia es de Prusa y sólo de Prusa
 *
 * «the seams are weak spots for the prints» y «This option increases the overall
 * strength of the print» son de Prusa. Bambu **no publica nada de resistencia de
 * la pieza en su apartado de costura** —en otras secciones de su wiki sí habla de
 * resistencia: warping, grietas entre capas, flujo—, así que aquí la resistencia
 * se publica atribuida a Prusa y no como propiedad de la costura.
 *
 * ## El *spiral vase* no es la solución general
 *
 * Su alcance va escrito en las dos fuentes, pero **las condiciones no son las
 * mismas**: Bambu pone cuatro —una sola pared exterior, sin relleno ni tapa
 * superior, y sólo modelos simples— y Prusa pone dos: un solo perímetro y nada
 * de relleno. Y no elimina la costura de la pieza: en Bambu las capas del fondo
 * la siguen teniendo. El modo es de la guía de relleno; aquí sólo se publica su
 * alcance y sus condiciones.
 *
 * ## El panel
 *
 * Esta guía **no** entra en `CAMPOS_WIKI`: el campo `material` ya tiene dueño,
 * que es la guía `material`. Lo que hace es lo mismo que `secar-filamento` y
 * `tpu-flexible`: su variable `material` declara `campos: ['material']` y la
 * guía declara `leeDelAnalisis: ['material']`, así que la barra «Tu archivo»
 * enseña el material del G-code y lo lleva a la casilla donde se declara.
 */
export const zSeam: Guia = {
  slug: 'z-seam',
  titulo: 'La costura Z',
  resumen:
    'La costura Z es el punto donde cada perímetro empieza y acaba: es normal y con FFF no se puede eliminar.',
  resumenExtra:
    'Esta guía dice dónde ponerla para que estorbe menos y qué se puede mejorar.',
  sintoma: 'Una línea vertical que sube por la pared',
  dibujo: 'capas',
  entrada:
    'La costura Z es el punto en el que empieza y acaba cada perímetro de la capa: el cabezal no puede cerrar un círculo, así que ahí la extrusión se detiene y vuelve a empezar. Las dos casas del corpus lo dicen con todas las letras — es normal, y con FFF no se puede eliminar —, y esa es la diferencia con el resto de las guías de este sitio: aquí no se busca el ajuste que borre la costura, sino el sitio donde cae y cuánto se nota. Si lo que ves es un bulto en la base, una capa que se suelta o una pieza que se deforma, esta no es tu guía.',
  autor: AUTOR,
  actualizado: '2026-10-19',
  minutos: 4,

  /*
   * El diferencial separa la costura de las tres cosas con las que se confunde:
   * el bulto de la base, la capa que se suelta y la pieza deformada.
   *
   * La segunda comprobación es la que sostiene el marco de la guía —«se nota
   * más» no es «está mal»—, y por eso su cara de «sí» no dice «tienes un
   * problema» sino «es normal y la forma es la que lo decide».
   *
   * Y la tercera es la que separa dos costuras que se ven igual: la alineada y
   * la que cambia de sitio en cada capa. Ninguna de las dos es un fallo, y lo
   * que las distingue es el modo de posición que hay puesto.
   */
  diferencial: {
    contra:
      'la costura Z, que es normal e inevitable, contra el bulto de la base, la capa que se suelta y la pieza deformada',
    contraCorto: 'un bulto en la base o una capa suelta',
    comprobaciones: [
      {
        id: 'altura',
        mira: '¿El defecto sube por la pared de la pieza de abajo arriba, en vez de estar sólo en el primer milímetro de la base?',
        si: 'Sí: una marca vertical que recorre la altura de la pieza es la costura Z, el punto donde el perímetro de cada capa empieza y acaba. Las dos casas dicen que es normal y que no se puede eliminar.',
        no: 'No: si lo que hay es un anillo o un bulto en la base, es pie de elefante; y si lo que se sueltan son capas horizontales, es un problema de adhesión entre capas. Ninguno de los dos es la costura.',
      },
      {
        id: 'curva',
        mira: '¿La marca se nota más en la parte curva de la pieza que en el resto?',
        si: 'Sí: en una superficie circular la costura no se puede esconder y será muy evidente. Eso lo dicen las dos casas, y ver la línea no significa que el ajuste esté mal: lo que decide es dónde cae.',
        no: 'No: si la pieza tiene esquinas o vértices, ahí la costura se esconde —las dos casas dicen que con esquinas queda efectivamente invisible— y si se nota mucho en una esquina, el problema es otro.',
      },
      {
        id: 'alineada',
        mira: 'Si miras la pieza capa a capa, ¿la marca cae siempre en el mismo sitio del contorno?',
        si: 'Sí: la costura está alineada, que es lo que hacen los modos Nearest y Aligned. Lo que decide cuánto se nota es dónde cae ese punto y qué se imprime alrededor.',
        no: 'No: si cambia de sitio en cada capa, lo que tienes activo es el modo Random. Sigue siendo la costura: lo que cambia es que se ve menos de forma uniforme y aparecen pequeños bultos repartidos por la superficie.',
      },
    ],
    siNo: { guia: 'elephant-foot', etiqueta: 'Pie de elefante' },
  },

  variables: [
    {
      id: 'forma',
      etiqueta: '¿De qué forma es la pieza?',
      indicador: 'geometria',
      para: 'Decide si la costura se puede esconder: en una esquina sí, en un cilindro no. Y decide qué modo de posición conviene.',
      necesaria: true,
      opciones: [
        { id: 'esquinas', etiqueta: 'Con esquinas', detalle: 'Ahí la costura se esconde' },
        { id: 'curva', etiqueta: 'Redonda o cilíndrica', detalle: 'Ahí no se puede esconder' },
        { id: 'mixta', etiqueta: 'Las dos cosas', detalle: 'Una parte con esquinas y otra lisa' },
      ],
    },
    {
      id: 'posicion',
      etiqueta: '¿Dónde cae la costura?',
      indicador: 'geometria',
      para: 'Es lo que separa los tres casos: que no haya nada que hacer, que haya que moverla o que haya que pintar dónde cae.',
      necesaria: true,
      opciones: [
        { id: 'esquina', etiqueta: 'En una esquina o vértice', detalle: 'Ahí es invisible' },
        { id: 'pared', etiqueta: 'En medio de una pared', detalle: 'Se ve de abajo arriba' },
        { id: 'cara-visible', etiqueta: 'En la cara que se va a ver', detalle: 'Y no la puedo girar' },
        { id: 'repartida', etiqueta: 'Cambia de sitio en cada capa', detalle: 'Es el modo Random' },
      ],
    },
    {
      id: 'slicer',
      etiqueta: '¿Qué programa usas?',
      indicador: 'slicer',
      para: 'Las dos casas llaman igual a tres modos y distinto al cuarto, y el hueco de la costura se ajusta de forma distinta en cada una.',
      opciones: [
        { id: 'bambu', etiqueta: 'Bambu Studio', detalle: 'Nearest · Aligned · Back · Random' },
        { id: 'prusa', etiqueta: 'PrusaSlicer', detalle: 'Nearest · Aligned · Rear · Random' },
        { id: 'otro', etiqueta: 'Otro programa', detalle: 'El corpus sólo cubre estos dos' },
      ],
    },
    {
      id: 'material',
      etiqueta: 'Filamento',
      indicador: 'material',
      para: 'La retracción es el mecanismo por el que la costura se nota, y con material flexible esa retracción encoge el filamento y puede atascar.',
      /*
       * `campos: ['material']` aquí y `campos: []` en la guía entera.
       *
       * No es una contradicción: el campo del panel que esta guía **explica** es
       * ninguno —el material ya tiene dueño, la guía `material`— y el que
       * **lee** es el material. La barra «Tu archivo» sólo pinta lo que la guía
       * declara, así que aquí enseña el material de tu G-code y lo lleva a la
       * casilla donde se declara. Es el mismo mecanismo que `secar-filamento` y
       * que `tpu-flexible`.
       */
      campos: ['material'],
      opciones: [
        { id: 'pla', etiqueta: 'PLA' },
        { id: 'petg', etiqueta: 'PETG' },
        { id: 'abs', etiqueta: 'ABS o ASA' },
        { id: 'tpu', etiqueta: 'TPU o flexible' },
        { id: 'otro', etiqueta: 'Otro material' },
      ],
    },
  ],

  conocimiento: [
    {
      id: 'que-es',
      titulo: 'La costura es el final de cada perímetro',
      puntos: [
        'La costura Z es el punto donde el perímetro de una capa **empieza y acaba**.',
        'El cabezal no puede cerrar un círculo, así que ahí la extrusión se detiene y vuelve a empezar.',
        'La definición más fina es la de Bambu Studio y la de Prusa.',
        'Que hablan de **cada perímetro**; la sección de calidad de Bambu habla de "each layer", de cada capa.',
        'La diferencia importa: una pieza con varios perímetros por capa tiene más de un punto de costura en cada capa.',
      ],
      indicador: 'entorno',
      cuerpo:
        'La costura Z es el punto donde el perímetro de una capa **empieza y acaba**: el cabezal no puede cerrar un círculo, así que ahí la extrusión se detiene y vuelve a empezar. La definición más fina es la de Bambu Studio y la de Prusa, que hablan de **cada perímetro**; la sección de calidad de Bambu habla de «each layer», de cada capa. La diferencia importa: una pieza con varios perímetros por capa tiene más de un punto de costura en cada capa.',
      cita: {
        texto: 'The seam is a kind of gap between the start and end points of each perimeter of the layer',
        fuente: 'Bambu Lab',
      },
    },
    {
      id: 'no-es-defecto',
      titulo: 'Es normal, y con FFF no se puede eliminar',
      puntos: [
        'Las dos casas lo dicen con las mismas palabras: es un fenómeno normal y **no se puede eliminar**.',
        'Prusa lo formula sin rodeos —"it is not possible to eliminate the seam.',
        'It will always be somewhat visible"— y Bambu lo llama "unavoidable in FDM 3D printing".',
        'Lo que sí se puede es **moverla** y **reducir cuánto se nota**, y eso es lo que se publica aquí.',
      ],
      indicador: 'general',
      cuerpo:
        'Las dos casas lo dicen con las mismas palabras: es un fenómeno normal y **no se puede eliminar**. Prusa lo formula sin rodeos —«it is not possible to eliminate the seam. It will always be somewhat visible»— y Bambu lo llama «unavoidable in FDM 3D printing». Lo que sí se puede es **moverla** y **reducir cuánto se nota**, y eso es lo que se publica aquí.',
      cita: {
        texto: 'it is not possible to eliminate the seam. It will always be somewhat visible',
        fuente: 'Prusa Research',
      },
    },
    {
      id: 'forma-pieza',
      titulo: 'Cuánto se nota depende de la forma, no del material',
      puntos: [
        'En una superficie con vértices cóncavos y convexos la costura se esconde bien.',
        'En una superficie circular **no se puede esconder y será muy evidente**.',
        'Las dos casas lo dicen.',
        'Ninguna fuente de este lote da un porcentaje de cuánto se nota, y ninguna dice que un material la haga más visible que otro.',
        'Lo que decide es la forma de la pieza.',
      ],
      indicador: 'material',
      cuerpo:
        'En una superficie con vértices cóncavos y convexos la costura se esconde bien; en una superficie circular **no se puede esconder y será muy evidente**. Las dos casas lo dicen. Ninguna fuente de este lote da un porcentaje de cuánto se nota, y ninguna dice que un material la haga más visible que otro: lo que decide es la forma de la pieza.',
      cita: {
        texto:
          'some models with circular surfaces (such as cylinders) will not be able to hide the seams, which will be very obvious',
        fuente: 'Bambu Lab',
      },
    },
    {
      id: 'pos-nearest',
      titulo: 'Nearest: esconderla en una esquina',
      puntos: [
        'Las dos casas lo llaman **Nearest**.',
        'Los tres primeros niveles de la búsqueda de candidatos son los mismos en las dos: primero un vértice cóncavo sin voladizo.',
        'Después uno convexo sin voladizo, después cualquier vértice sin voladizo.',
        '**Bambu añade un cuarto, el vértice con voladizo, como último recurso; Prusa no lo publica** y su texto termina en el tercero.',
        'Con esquinas vivas la costura queda efectivamente invisible, según las dos casas.',
        'Bambu añade que el modo optimiza el camino de viaje para minimizar el *stringing*; Prusa, que está pensado para velocidad.',
        'Poco desplazamiento y resistencia aceptable.',
      ],
      indicador: 'velocidad',
      cuerpo:
        'Las dos casas lo llaman **Nearest**. Los tres primeros niveles de la búsqueda de candidatos son los mismos en las dos: primero un vértice cóncavo sin voladizo, después uno convexo sin voladizo, después cualquier vértice sin voladizo. **Bambu añade un cuarto, el vértice con voladizo, como último recurso; Prusa no lo publica** y su texto termina en el tercero. Con esquinas vivas la costura queda efectivamente invisible, según las dos casas. Bambu añade que el modo optimiza el camino de viaje para minimizar el *stringing*; Prusa, que está pensado para velocidad, poco desplazamiento y resistencia aceptable.',
      cita: {
        texto:
          'this will try to choose a concave non-overhang vertex so that the seam is hidden inside the concave angle',
        fuente: 'Prusa Research',
      },
    },
    {
      id: 'pos-aligned',
      titulo: 'Aligned: la costura casi siempre en el mismo sitio',
      puntos: [
        'También se llama **Aligned** en las dos casas.',
        'Usa la misma búsqueda de candidatos que *Nearest*, pero elige el que está más cerca del punto de inicio de la capa anterior.',
        'De modo que la costura queda **casi siempre alineada** a lo largo de toda la pieza.',
        'Se sabe más o menos dónde está, que es justo lo contrario de dispersarla.',
      ],
      indicador: 'general',
      cuerpo:
        'También se llama **Aligned** en las dos casas. Usa la misma búsqueda de candidatos que *Nearest*, pero elige el que está más cerca del punto de inicio de la capa anterior, de modo que la costura queda **casi siempre alineada** a lo largo de toda la pieza: se sabe más o menos dónde está, que es justo lo contrario de dispersarla.',
      cita: {
        texto: 'This will ensure the seam is mostly aligned throughout the whole object',
        fuente: 'Bambu Lab',
      },
    },
    {
      id: 'pos-back',
      titulo: 'Back (Bambu) y Rear (Prusa): dos operaciones distintas',
      puntos: [
        'La cuarta posición se llama **Back** en Bambu Studio y **Rear** en PrusaSlicer.',
        'Y **no hacen lo mismo**: Bambu pone la costura "behind the model".',
        'Detrás de la pieza; Prusa la lleva "close to max Y (rear of the print bed)", hacia el fondo de la cama, y dice que funciona como *Aligned*.',
        'Las dos casas la justifican por lo mismo: dejar una superficie lisa en la cara que se mira.',
      ],
      indicador: 'slicer',
      cuerpo:
        'La cuarta posición se llama **Back** en Bambu Studio y **Rear** en PrusaSlicer, y **no hacen lo mismo**: Bambu pone la costura «behind the model», detrás de la pieza; Prusa la lleva «close to max Y (rear of the print bed)», hacia el fondo de la cama, y dice que funciona como *Aligned*. Las dos casas la justifican por lo mismo: dejar una superficie lisa en la cara que se mira.',
      cita: {
        texto: 'The seam will be set behind the model',
        fuente: 'Bambu Lab',
      },
    },
    {
      id: 'pos-random',
      titulo: 'Random: un sitio distinto en cada capa',
      puntos: [
        'La costura cae en un punto distinto en cada capa, y así se ve menos de forma uniforme.',
        'El precio lo pagan las dos casas: Bambu avisa de que provoca efectos de "zits" en la superficie.',
        'Y Prusa de que deja pequeños bultos repartidos por ella.',
        '**Según Prusa**, además, este modo aumenta la resistencia total de la impresión.',
        'Bambu no publica nada de resistencia de la pieza en su apartado de costura.',
      ],
      indicador: 'geometria',
      cuerpo:
        'La costura cae en un punto distinto en cada capa, y así se ve menos de forma uniforme. El precio lo pagan las dos casas: Bambu avisa de que provoca efectos de «zits» en la superficie y Prusa de que deja pequeños bultos repartidos por ella. **Según Prusa**, además, este modo aumenta la resistencia total de la impresión; Bambu no publica nada de resistencia de la pieza en su apartado de costura.',
      cita: {
        texto: 'making the seams look less uniform and less obvious than "aligned" or "back"',
        fuente: 'Bambu Lab',
      },
    },
    {
      id: 'seam-gap',
      titulo: 'El hueco de la costura: dos parametrizaciones',
      puntos: [
        'Para disimularla, Bambu Studio **detiene la extrusión por adelantado** en las paredes interior.',
        'Y exterior y deja un hueco que aloja el material sobrante.',
        'Esa longitud se expresa como **porcentaje del diámetro actual de la boquilla**, y el valor por defecto es **15 %**.',
        'El PrusaSlicer usa otra cosa: la distancia entre los extremos del perímetro.',
        '**Con signo**, y si se usa en porcentajes se deriva del diámetro de la boquilla.',
      ],
      indicador: 'slicer',
      cuerpo:
        'Para disimularla, Bambu Studio **detiene la extrusión por adelantado** en las paredes interior y exterior y deja un hueco que aloja el material sobrante. Esa longitud se expresa como **porcentaje del diámetro actual de la boquilla**, y el valor por defecto es **15 %**. El PrusaSlicer usa otra cosa: la distancia entre los extremos del perímetro, **con signo**, y si se usa en porcentajes se deriva del diámetro de la boquilla.',
      cifra: {
        valor: '15 %',
        nota: 'valor por defecto del seam gap de Bambu Studio, en porcentaje del diámetro actual de la boquilla; no es el parámetro del PrusaSlicer, que no publica default',
      },
      cita: {
        texto: 'The default value is 15%.',
        fuente: 'Bambu Lab',
      },
    },
    {
      id: 'seam-gap-prusa',
      titulo: 'El signo: interrumpir el lazo o solaparlo',
      puntos: [
        'En PrusaSlicer el valor **positivo acorta e interrumpe** el lazo del perímetro, para reducir la costura, y el **negativo lo prolonga**.',
        'De modo que los extremos se solapen un poco.',
        'Ponerlo a **0 desactiva la función**. Es otra parametrización del mismo ajuste: el 15 % de Bambu y esta distancia con signo no se suman.',
        'No se promedian y no se traducen entre sí.',
      ],
      indicador: 'slicer',
      cuerpo:
        'En PrusaSlicer el valor **positivo acorta e interrumpe** el lazo del perímetro, para reducir la costura, y el **negativo lo prolonga**, de modo que los extremos se solapen un poco. Ponerlo a **0 desactiva la función**. Es otra parametrización del mismo ajuste: el 15 % de Bambu y esta distancia con signo no se suman, no se promedian y no se traducen entre sí.',
      cita: {
        texto:
          'Positive values will shorten and interrupt the loop slightly to reduce the seam. Negative values will extend the loop',
        fuente: 'Prusa Research',
      },
    },
    {
      id: 'mecanismo',
      titulo: 'Por qué se nota: la retracción al cambiar de capa',
      puntos: [
        'La retracción se hace antes del desplazamiento y el filamento se vuelve a cargar en el hotend al final del desplazamiento.',
        'Justo donde acaba una capa y empieza la siguiente.',
        'Ese punto de recarga es el que se ve como costura.',
        'Existe un interruptor que fuerza la retracción ahí: **Retract on layer change**.',
        'Y la página de costura de Bambu lo conecta con la limpieza de la boquilla: al retraer se hace un pequeño *wiping*.',
      ],
      indicador: 'temperatura',
      cuerpo:
        'La retracción se hace antes del desplazamiento y el filamento se vuelve a cargar en el hotend al final del desplazamiento, justo donde acaba una capa y empieza la siguiente. Ese punto de recarga es el que se ve como costura. Existe un interruptor que fuerza la retracción ahí: **Retract on layer change**. Y la página de costura de Bambu lo conecta con la limpieza de la boquilla: al retraer se hace un pequeño *wiping*.',
      cita: {
        texto: 'Enable this will force the retraction on layer changes.',
        fuente: 'Bambu Lab',
      },
    },
    {
      id: 'retraccion-alcance',
      titulo: 'La retracción no es el ajuste de la costura',
      puntos: [
        'El alcance real de la retracción, según su propia página, es evitar el *stringing* y el *oozing*, no la costura.',
        'Por eso **los hilos tienen su propia guía** y aquí no se repite ninguna cifra de retracción.',
        'Lo que se publica es el mecanismo por el que la costura se nota, no una receta para eliminarla.',
      ],
      indicador: 'general',
      cuerpo:
        'El alcance real de la retracción, según su propia página, es evitar el *stringing* y el *oozing*, no la costura. Por eso **los hilos tienen su propia guía** y aquí no se repite ninguna cifra de retracción: lo que se publica es el mecanismo por el que la costura se nota, no una receta para eliminarla.',
      enlaza: { guia: 'stringing', etiqueta: 'Hilos y goteo' },
      cita: {
        texto: 'the retraction is to prevent stringing and oozing from affecting the appearance of the model',
        fuente: 'Bambu Lab',
      },
    },
    {
      id: 'no-retract-before-wipe',
      titulo: 'La única vez que la documentación escribe «Z-seam»',
      puntos: [
        'Hay un parámetro de Bambu que nombra el efecto tal cual, y es el único sitio donde la palabra aparece así en su documentación.',
        '**Retract amount before wipe**.',
        'Es la longitud de la retracción rápida antes de la limpieza, expresada como porcentaje de la longitud de retracción.',
        'Y su valor por defecto es 0. La propia página dice que **si no se retrae antes de limpiar, el efecto Z-seam en la pared exterior mejora**.',
      ],
      indicador: 'velocidad',
      cuerpo:
        'Hay un parámetro de Bambu que nombra el efecto tal cual, y es el único sitio donde la palabra aparece así en su documentación: **Retract amount before wipe**. Es la longitud de la retracción rápida antes de la limpieza, expresada como porcentaje de la longitud de retracción, y su valor por defecto es 0. La propia página dice que **si no se retrae antes de limpiar, el efecto Z-seam en la pared exterior mejora**.',
      cifra: {
        valor: '0 %',
        nota: 'valor por defecto de «Retract amount before wipe» de Bambu Studio, en porcentaje respecto a la longitud de retracción',
      },
      cita: {
        texto: "If it doesn't retract before wiping, the Z-seam effect on the outer wall will be better",
        fuente: 'Bambu Lab',
      },
    },
    {
      id: 'retraccion-flexible',
      titulo: 'Con TPU, la retracción encoge el filamento',
      cuando: { material: 'tpu' },
      puntos: [
        'Con materiales flexibles como el TPU, la retracción **afecta al diámetro del filamento y lo encoge**.',
        'Lo que puede llevar a atascos y a otros problemas de extrusión.',
        'O sea: el ajuste que en otros materiales mejora el acabado es aquí un problema nuevo, y no una solución.',
      ],
      indicador: 'material',
      cuerpo:
        'Con materiales flexibles como el TPU, la retracción **afecta al diámetro del filamento y lo encoge**, lo que puede llevar a atascos y a otros problemas de extrusión. O sea: el ajuste que en otros materiales mejora el acabado es aquí un problema nuevo, y no una solución.',
      cita: {
        texto:
          'may affect the diameter of the filament and cause it to shrink, leading to clogging and other extrusion problems',
        fuente: 'Bambu Lab',
      },
    },
    {
      id: 'retraccion-rigidos',
      titulo: 'Con PLA, ABS y PETG la retracción activada imprime mejor',
      cuando: { material: ['pla', 'petg', 'abs'] },
      puntos: [
        'La misma página de retracción dice que "for all other materials such as PLA.',
        'ABS, and PETG, the printing effect is better when the retraction is enabled" —para todos los demás materiales.',
        'Como PLA, ABS y PETG, el resultado de impresión es mejor con la retracción activada—.',
        'Y la regla de la fuente es la de todos los demás materiales, así que el filamento de la casilla ABS o ASA cae en ella por la misma frase.',
        'Aunque la fuente no lo nombre. La conclusión es directa: **la retracción no se desactiva para arreglar una costura**.',
        'Lo que se puede cambiar es *cuándo* se limpia la boquilla, que es otra cosa.',
      ],
      indicador: 'temperatura',
      cuerpo:
        'La misma página de retracción dice que «for all other materials such as PLA, ABS, and PETG, the printing effect is better when the retraction is enabled» —para todos los demás materiales, como PLA, ABS y PETG, el resultado de impresión es mejor con la retracción activada—. Y la regla de la fuente es la de todos los demás materiales, así que el filamento de la casilla ABS o ASA cae en ella por la misma frase, aunque la fuente no lo nombre. La conclusión es directa: **la retracción no se desactiva para arreglar una costura**; lo que se puede cambiar es *cuándo* se limpia la boquilla, que es otra cosa.',
      cita: {
        texto:
          'for all other materials such as PLA, ABS, and PETG, the printing effect is better when the retraction is enabled',
        fuente: 'Bambu Lab',
      },
    },
    {
      id: 'bambu-metodos',
      titulo: 'Los cuatro métodos que da Bambu',
      puntos: [
        'La sección de calidad de impresión de Bambu da cuatro cosas para que la costura se note menos.',
        '**Tres perímetros de pared**, **no imprimir varias piezas en la misma placa** para reducir el desplazamiento del cabezal.',
        '**Subir la temperatura de boquilla y bajar la velocidad de la pared exterior** —sin cifras— y el **modo Spiral vase** para algunos modelos.',
        'Los dos últimos: el primero no trae número, y el segundo tiene condiciones que lo dejan fuera de casi todo.',
      ],
      indicador: 'temperatura',
      cuerpo:
        'La sección de calidad de impresión de Bambu da cuatro cosas para que la costura se note menos: **tres perímetros de pared**, **no imprimir varias piezas en la misma placa** para reducir el desplazamiento del cabezal, **subir la temperatura de boquilla y bajar la velocidad de la pared exterior** —sin cifras— y el **modo Spiral vase** para algunos modelos. Los dos últimos: el primero no trae número, y el segundo tiene condiciones que lo dejan fuera de casi todo.',
      cita: {
        texto: 'Appropriately raise the nozzle temperature and reduce the printing speed of the outer wall',
        fuente: 'Bambu Lab',
      },
    },
    {
      id: 'prusa-metodos',
      titulo: 'Lo que dice Prusa: dos ajustes, no una lista',
      puntos: [
        'Prusa no da una lista de métodos, sino dos ajustes: el **avance lineal** y la **calibración del multiplicador de extrusión**.',
        'Sus perfiles originales ya vienen ajustados.',
        'Si afinas un perfil propio, el camino que da la casa es bajar el multiplicador de extrusión y calibrar el avance lineal.',
        'Ninguna de las dos fuentes da cifras aquí: las cifras de flow y de presión avanzada son de otra guía.',
      ],
      indicador: 'calibracion',
      cuerpo:
        'Prusa no da una lista de métodos, sino dos ajustes: el **avance lineal** y la **calibración del multiplicador de extrusión**. Sus perfiles originales ya vienen ajustados; si afinas un perfil propio, el camino que da la casa es bajar el multiplicador de extrusión y calibrar el avance lineal. Ninguna de las dos fuentes da cifras aquí: las cifras de flow y de presión avanzada son de otra guía.',
      enlaza: { guia: 'flow-rate', etiqueta: 'Flujo y subextrusión' },
      cita: {
        texto:
          'you can try lowering the extrusion multiplier and calibrating the linear advance value to lower the visibility of the seam',
        fuente: 'Prusa Research',
      },
    },
    {
      id: 'scarf-que-es',
      titulo: 'Scarf seam (Bambu) y scarf joint (Prusa): la misma idea',
      puntos: [
        'Es la misma cosa con dos nombres: Bambu Studio la llama **scarf seam** desde la versión 1.9 y Prusa la llama **scarf joint**.',
        'En vez de interrumpir el perímetro en la costura, **solapa la extrusión del final con la del principio**, como una bufanda.',
        'Bambu dice que así se reduce la visibilidad "in most cases", es decir en la mayoría de los casos; Prusa.',
        'Que reduce las costuras visibles, sobre todo en superficies curvas.',
      ],
      indicador: 'geometria',
      cuerpo:
        'Es la misma cosa con dos nombres: Bambu Studio la llama **scarf seam** desde la versión 1.9 y Prusa la llama **scarf joint**. En vez de interrumpir el perímetro en la costura, **solapa la extrusión del final con la del principio**, como una bufanda. Bambu dice que así se reduce la visibilidad «in most cases», es decir en la mayoría de los casos; Prusa, que reduce las costuras visibles, sobre todo en superficies curvas.',
      cita: {
        texto: 'The Scarf seams overlap extrusions at the end and start of the perimeter loop',
        fuente: 'Prusa Research',
      },
    },
    {
      id: 'scarf-tipos',
      titulo: 'Los menús no son equivalentes',
      puntos: [
        'Los conjuntos de opciones **no coinciden**.',
        'Bambu ofrece **None / Contour / Contour and Hole**, y desde la versión 1.10 se puede decidir por filamento.',
        'Prusa ofrece **Nowhere / Contour / Everywhere**, donde *Everywhere* cubre también las paredes interiores que rodean los huecos de la pieza.',
        'Cada casa publica sus nombres y sus tipos: no hay un menú común al que traducirlos, y *Contour and Hole* no tiene equivalente en Prusa.',
      ],
      indicador: 'material',
      cuerpo:
        'Los conjuntos de opciones **no coinciden**. Bambu ofrece **None / Contour / Contour and Hole**, y desde la versión 1.10 se puede decidir por filamento. Prusa ofrece **Nowhere / Contour / Everywhere**, donde *Everywhere* cubre también las paredes interiores que rodean los huecos de la pieza. Cada casa publica sus nombres y sus tipos: no hay un menú común al que traducirlos, y *Contour and Hole* no tiene equivalente en Prusa.',
    },
    {
      id: 'scarf-cuando',
      titulo: 'Dónde se aplica: sólo donde la costura no se puede esconder',
      puntos: [
        'Bambu decide solo: aplica la bufanda **sólo donde la costura tradicional no se puede esconder**.',
        'Y no la activa por defecto en superficies con ángulos vivos.',
        'Porque ahí la costura se esconde sola; el umbral de ese ángulo es configurable.',
        'Prusa tiene lo mismo como opción por defecto: **"Scarf joint only on smooth perimeters"**.',
        'Si se desmarca, también se aplica a las superficies que no son lisas.',
      ],
      indicador: 'cama',
      cuerpo:
        'Bambu decide solo: aplica la bufanda **sólo donde la costura tradicional no se puede esconder**, y no la activa por defecto en superficies con ángulos vivos, porque ahí la costura se esconde sola; el umbral de ese ángulo es configurable. Prusa tiene lo mismo como opción por defecto: **«Scarf joint only on smooth perimeters»**. Si se desmarca, también se aplica a las superficies que no son lisas.',
      cita: {
        texto:
          'The Scarf joint is not applied on non-smooth surfaces as the seam can be hidden on curves and corners of the object.',
        fuente: 'Prusa Research',
      },
    },
    {
      id: 'scarf-contra',
      titulo: 'El scarf no es un ajuste sin coste',
      puntos: [
        'Las dos casas publican su contraindicación, y **no son la misma**.',
        'Bambu: extender la bufanda a toda la pared ("Scarf around entire wall") **reduce la extrusión de todo el perímetro**.',
        'Lo que puede dar mala adhesión entre líneas y defectos de superficie; y en la zona volada las líneas pueden no unir bien.',
        'Prusa: **aumenta el tiempo de impresión** y es menos eficaz en esquinas y voladizos.',
      ],
      indicador: 'calibracion',
      cuerpo:
        'Las dos casas publican su contraindicación, y **no son la misma**. Bambu: extender la bufanda a toda la pared («Scarf around entire wall») **reduce la extrusión de todo el perímetro**, lo que puede dar mala adhesión entre líneas y defectos de superficie; y en la zona volada las líneas pueden no unir bien. Prusa: **aumenta el tiempo de impresión** y es menos eficaz en esquinas y voladizos.',
      cita: {
        texto:
          'Note that using scarf seams increases print time, and is less effective in sharp corners and overhangs.',
        fuente: 'Prusa Research',
      },
    },
    {
      id: 'spiral-vase',
      titulo: 'Spiral vase: el único modo que quita la costura de la pared',
      puntos: [
        'Es el único modo en el que la costura **no aparece en la pared exterior**.',
        'La pieza se imprime en una espiral lineal y las costuras sólo quedan en las capas del fondo.',
        'El precio lo escribe **Bambu**, con cuatro condiciones: **una sola pared exterior, sin relleno ni tapa superior**.',
        'Y **sólo modelos simples**, porque los complejos no se pueden imprimir con una sola línea.',
        '**Prusa** pone dos de esas condiciones: un solo perímetro y nada de relleno.',
        'El modo es de la guía de relleno.',
      ],
      indicador: 'geometria',
      cuerpo:
        'Es el único modo en el que la costura **no aparece en la pared exterior**: la pieza se imprime en una espiral lineal y las costuras sólo quedan en las capas del fondo. El precio lo escribe **Bambu**, con cuatro condiciones: **una sola pared exterior, sin relleno ni tapa superior**, y **sólo modelos simples**, porque los complejos no se pueden imprimir con una sola línea. **Prusa** pone dos de esas condiciones: un solo perímetro y nada de relleno. El modo es de la guía de relleno.',
      enlaza: { guia: 'relleno-patrones', etiqueta: 'Relleno y patrones' },
      cita: {
        texto:
          'The model printed by this mode has only a single outer wall, no infill and top shell, and only applies to some simple models',
        fuente: 'Bambu Lab',
      },
    },
    {
      id: 'pintado',
      titulo: 'Pintar la costura a mano',
      puntos: [
        'Las dos casas permiten decidir el punto exacto.',
        'Bambu dice que "Sometimes the auto seam position may be not ideal, you can customize the seam position by manually painting the method".',
        'A veces la posición automática no es ideal, y se puede personalizar pintando el método a mano.',
        'Prusa, desde PrusaSlicer 2.3: la herramienta de *seam painting* permite pintar **seam enforcers** (obligar a.',
        'Que caiga ahí) o **seam blockers** (impedir que caiga en esa zona).',
        'Y lo importante, **según Prusa**: **el pintado no anula el modo elegido, lo restringe**; esa lógica no la publica Bambu.',
      ],
      indicador: 'slicer',
      cuerpo:
        'Las dos casas permiten decidir el punto exacto. Bambu dice que «Sometimes the auto seam position may be not ideal, you can customize the seam position by manually painting the method»: a veces la posición automática no es ideal, y se puede personalizar pintando el método a mano. Prusa, desde PrusaSlicer 2.3: la herramienta de *seam painting* permite pintar **seam enforcers** (obligar a que caiga ahí) o **seam blockers** (impedir que caiga en esa zona). Y lo importante, **según Prusa**: **el pintado no anula el modo elegido, lo restringe**; esa lógica no la publica Bambu.',
      cita: {
        texto: 'The Nearest, Rear, and Random Seam position options are still respected.',
        fuente: 'Prusa Research',
      },
    },
    {
      id: 'resistencia',
      titulo: 'La resistencia: un dato de una sola casa',
      puntos: [
        'Prusa es la única de las dos que habla de resistencia, y lo dice en dos sitios: **las costuras son puntos débiles de la impresión**.',
        'Y por eso descuadrar la costura interior de la exterior hace la pieza más fuerte; y el modo *Random* **aumenta la resistencia total**.',
        'Bambu **no publica nada de resistencia de la pieza en su apartado de costura** —ni en la página de ajustes de costura.',
        'Ni en la de calidad de impresión, ni en el apartado de costura de la página de problemas comunes—.',
        'Su marco es el de la costura como hueco inevitable.',
        'En otras secciones de su wiki sí habla de resistencia, pero de warping y de grietas entre capas, no de la costura.',
      ],
      indicador: 'entorno',
      cuerpo:
        'Prusa es la única de las dos que habla de resistencia, y lo dice en dos sitios: **las costuras son puntos débiles de la impresión**, y por eso descuadrar la costura interior de la exterior hace la pieza más fuerte; y el modo *Random* **aumenta la resistencia total**. Bambu **no publica nada de resistencia de la pieza en su apartado de costura** —ni en la página de ajustes de costura, ni en la de calidad de impresión, ni en el apartado de costura de la página de problemas comunes—: su marco es el de la costura como hueco inevitable. En otras secciones de su wiki sí habla de resistencia, pero de warping y de grietas entre capas, no de la costura.',
      cita: {
        texto: 'the seams are weak spots for the prints',
        fuente: 'Prusa Research',
      },
    },
    {
      id: 'wipe-speed',
      titulo: 'El wipe speed: un porcentaje de la velocidad de viaje',
      puntos: [
        'Bambu Studio aplica el *wipe speed* a **todos los tipos de costura** y lo expresa como porcentaje de la velocidad de desplazamiento.',
        'La página pone el ejemplo de un 80 %, que significa que la velocidad de limpieza es el 80 % de la velocidad de viaje.',
        'Ese 80 % es **el ejemplo de la página, no un valor recomendado**.',
        'La misma página nombra un "Role-Based Wipe Speed" del que **no describe qué hace**.',
        'Eso no se publica, porque no hay nada detrás del nombre.',
      ],
      indicador: 'velocidad',
      cuerpo:
        'Bambu Studio aplica el *wipe speed* a **todos los tipos de costura** y lo expresa como porcentaje de la velocidad de desplazamiento: la página pone el ejemplo de un 80 %, que significa que la velocidad de limpieza es el 80 % de la velocidad de viaje. Ese 80 % es **el ejemplo de la página, no un valor recomendado**. La misma página nombra un «Role-Based Wipe Speed» del que **no describe qué hace**: eso no se publica, porque no hay nada detrás del nombre.',
      cita: {
        texto: 'setting the wiping speed to 80% means that the wiping speed = the traveling speed * 80%',
        fuente: 'Bambu Lab',
      },
    },
  ],

  reglas: [
    {
      id: 'costura-normal',
      accion: 'Acepta la costura: no hay ningún ajuste que la borre',
      porque:
        'Las dos casas lo dicen con las mismas palabras: es inevitable en FFF y **no se puede eliminar**. Lo que se puede es moverla y reducir cuánto se nota.',
      fuente: 'Bambu Lab, Prusa Research',
      alcance:
        'Vale para cualquier material, cualquier forma y cualquier ajuste, y por eso no se condiciona a ninguna variable: es el marco del tema, no el consejo de un caso concreto. Las dos fuentes son documentación oficial de cada casa, y ninguna de las dos promete una costura invisible.',
    },
    {
      id: 'esquina-invisible',
      accion: 'No cambies nada: en una esquina la costura es invisible',
      cuando: { posicion: 'esquina', forma: ['esquinas', 'mixta'] },
      porque:
        'Las dos casas dicen lo mismo de su modo *Nearest*: con esquinas, la costura queda efectivamente invisible, porque el perímetro empieza y acaba justo en un vértice que ya es una arista de la pieza.',
      fuente: 'Bambu Lab, Prusa Research',
      alcance:
        'Lo dicen del modo *Nearest*, que es el que busca vértices, y por eso esta regla sólo sale en piezas que tienen esquinas: en una pieza redonda o cilíndrica no hay vértice donde esconder la costura. Si tu costura cae en una esquina, lo que se está viendo es ese vértice del modelo, no un defecto de impresión.',
    },
    {
      id: 'mover-detras',
      accion: 'Aleja la costura de la cara que se mira',
      valor: 'Back (Bambu Studio) · Rear (PrusaSlicer)',
      cuando: { posicion: 'pared' },
      porque:
        'Las dos casas justifican ese modo por lo mismo: dejar una superficie lisa en la cara que se mira. Bambu lo pone detrás del modelo y Prusa hacia el fondo de la cama.',
      fuente: 'Bambu Lab, Prusa Research',
      alcance:
        'No es la misma operación en las dos casas: el *Back* de Bambu va detrás de la pieza y el *Rear* de Prusa hacia el fondo de la cama, donde Prusa dice que funciona como *Aligned*. El *Rear* sólo sirve si la pieza se coloca con esa cara hacia atrás. Y mover la costura no la quita: sigue estando, sólo deja de estar delante.',
    },
    {
      id: 'girar-pieza',
      accion: 'Orienta la pieza para que la costura caiga en una cara que no se vea',
      cuando: { posicion: 'cara-visible' },
      porque:
        'Es el motivo de las dos casas para el modo de detrás: Bambu quiere una superficie lisa en la cara que se mira y Prusa lo dice útil para objetos que se muestran con una orientación concreta.',
      fuente: 'Bambu Lab, Prusa Research',
      alcance:
        'La orientación es un parámetro del corte, no un ajuste de la costura: su guía es su dueña. Y si la cara visible no tiene esquinas donde esconder la costura, girar la pieza no basta: hace falta decidir el punto exacto.',
    },
    {
      id: 'pintar-bambu',
      accion: 'Pinta la costura a mano para llevarla a otro punto',
      cuando: { slicer: 'bambu', posicion: 'cara-visible' },
      porque:
        'Bambu Studio lo tiene en su página de ajustes de costura: «Sometimes the auto seam position may be not ideal, you can customize the seam position by manually painting the method».',
      fuente: 'Bambu Lab',
      alcance:
        'Es la herramienta de pintado de Bambu Studio, y el corpus no describe el procedimiento ni los modos del cursor. Su página **no publica la lógica de la herramienta**: no dice qué son los *seam enforcers* ni los *seam blockers*, ni qué pasa con el modo de posición elegido. Eso, y el hecho de que el pintado restrinja el modo en vez de sustituirlo, es un dato **sólo de Prusa**.',
    },
    {
      id: 'pintar-prusa',
      accion: 'Pinta la costura con la herramienta de seam painting',
      valor: 'Seam enforcers · Seam blockers (PrusaSlicer 2.3+)',
      cuando: { slicer: 'prusa', posicion: 'cara-visible' },
      porque:
        'Desde la versión 2.3 de PrusaSlicer se puede pintar sobre el modelo: los *seam enforcers* obligan a que la costura caiga en esa zona y los *seam blockers* impiden que caiga en ella.',
      fuente: 'Prusa Research',
      alcance:
        'Sólo aparece en los modos avanzado y experto. Los modos *Nearest*, *Rear* y *Random* se siguen respetando, y con *Aligned* la costura cae en el centro del enforcer: el pintado acota la posición, no la anula.',
    },
    {
      id: 'nearest',
      accion: 'Pasa la costura a Nearest',
      valor: 'Nearest (las dos casas)',
      cuando: { forma: ['esquinas', 'mixta'], posicion: 'pared' },
      porque:
        'Es el modo que eligen las dos casas para las piezas con vértices: con esquinas, la costura queda efectivamente invisible, porque el perímetro empieza y acaba justo en la arista.',
      fuente: 'Bambu Lab, Prusa Research',
      alcance:
        'Bambu añade que *Nearest* optimiza el camino de viaje para minimizar el *stringing*; Prusa lo presenta como óptimo para velocidad, poco desplazamiento y resistencia aceptable. Ninguna de las dos da cifras para ese recorrido.',
    },
    {
      id: 'random-curva',
      accion: 'Prueba el modo Random',
      valor: 'Random (las dos casas)',
      cuando: { forma: 'curva', posicion: ['pared', 'cara-visible'] },
      porque:
        'En una pieza cilíndrica sin esquinas la costura no se puede esconder, y Prusa dice que ahí *Random* es viable: al cambiar de punto en cada capa la marca deja de ser una línea continua.',
      fuente: 'Bambu Lab, Prusa Research',
      alcance:
        'El precio lo pagan las dos casas: pequeños bultos («zits») repartidos por la superficie. **Las condiciones de uso del modo las publica sólo Prusa** —que no tiene sentido en piezas con esquinas y sí en piezas cilíndricas sin aristas—: Bambu no dice para qué formas conviene. El aumento de resistencia también es un dato **sólo de Prusa**.',
    },
    {
      id: 'random-no-esquinas',
      accion: 'No uses Random si la pieza tiene esquinas: usa Nearest o Aligned',
      valor: 'Nearest · Aligned',
      cuando: { forma: ['esquinas', 'mixta'] },
      porque:
        'Prusa lo dice sin rodeos: en modelos con esquinas o aristas vivas *Random* no tiene mucho sentido, y es mejor usar *Nearest* o *Aligned*, que aprovechan el vértice para esconder la costura.',
      fuente: 'Prusa Research',
      alcance:
        'Es una recomendación de Prusa. Bambu no dice qué hacer en ese caso: su *Random* sí afirma que hace la costura menos uniforme y menos llamativa que *Aligned* o *Back*.',
    },
    {
      id: 'random-ya-activo',
      accion: 'Comprueba que el modo Random está funcionando antes de tocar nada',
      cuando: { posicion: 'repartida' },
      porque:
        'Las dos casas lo describen igual: un punto distinto en cada capa, para que la costura se vea menos uniforme. Lo que notas disperso es la costura, y en la superficie los bultos que deja el modo.',
      fuente: 'Bambu Lab, Prusa Research',
      alcance:
        'El coste son los «zits», pequeños bultos repartidos: lo dicen las dos casas. El aumento de resistencia es un dato sólo de Prusa.',
    },
    {
      id: 'random-fuerza',
      accion: 'Mantén Random: según Prusa, refuerza la pieza',
      cuando: { slicer: 'prusa', posicion: 'repartida', forma: 'curva' },
      porque:
        'Prusa dice que *Random* «This option increases the overall strength of the print», y su otro dato sobre resistencia es que **las costuras son puntos débiles** de la pieza.',
      fuente: 'Prusa Research',
      alcance:
        'Es un dato de Prusa y sólo de Prusa: **Bambu no publica nada de resistencia de la pieza en su apartado de costura** (en otras secciones de su wiki sí habla de resistencia, pero de warping y de grietas entre capas). La guía no lo convierte en una propiedad general de la costura. Y sólo tiene sentido donde Prusa lo dice: en piezas sin aristas vivas.',
    },
    {
      id: 'curva-normal',
      accion: 'Acepta que se vea: en una superficie curva no se puede esconder',
      cuando: { forma: 'curva' },
      porque:
        'Las dos casas lo dicen: en las superficies circulares la costura no se puede esconder y será muy evidente. Ver la línea no significa que el ajuste esté mal, ni que el filamento sea el culpable.',
      fuente: 'Bambu Lab, Prusa Research',
      alcance:
        'Ninguna fuente de este lote da un porcentaje de cuánto se nota ni una medida objetiva de la costura. Lo que se publica es el marco de las dos casas, y lo que sí se puede cambiar es dónde cae y cuánto se nota.',
    },
    {
      id: 'mixta-dos-zonas',
      accion: 'Combina: esconde la costura en las esquinas y usa scarf en las zonas lisas',
      cuando: { forma: 'mixta' },
      porque:
        'En una pieza con zonas angulares y zonas lisas, cada zona tiene su solución: en el vértice *Nearest* deja la costura invisible, y en la pared lisa las dos casas señalan la costura bufanda.',
      fuente: 'Bambu Lab, Prusa Research',
      alcance:
        'Ninguna fuente da un procedimiento para combinar los dos modos: es la lectura de las dos recomendaciones, cada una con su alcance. El *scarf* se aplica donde la costura tradicional no se puede esconder. Y son dos zonas distintas de la misma pieza: en el vértice no hay nada que hacer, y la bufanda entra en la pared lisa.',
    },
    {
      id: 'bambu-perimetros',
      accion: 'Pon el número de perímetros de pared en 3',
      valor: '3 perímetros',
      cuando: { slicer: 'bambu' },
      porque:
        'Es el primero de los cuatro métodos que da Bambu en su sección de calidad de impresión para que la costura se note menos, y el único de los cuatro que trae un número.',
      fuente: 'Bambu Lab',
      alcance:
        'Es el número de perímetros de pared, que es un parámetro de la guía de paredes y perímetros; aquí se publica sólo como uno de los cuatro métodos para la costura. El 3 no es un valor de esta guía.',
    },
    {
      id: 'bambu-una-pieza',
      accion: 'Imprime una sola pieza en la placa',
      cuando: { slicer: 'bambu' },
      porque:
        'Es el segundo método de la misma lista: evitar varias piezas en la misma placa para reducir el desplazamiento del cabezal. Bambu lo incluye entre los métodos de la costura, no entre los de impresión.',
      fuente: 'Bambu Lab',
      alcance:
        'El modo de impresión por objeto tiene su propia guía; aquí se publica el método tal como lo da la casa, sin cambiar sus condiciones. No es un ajuste de la costura: es una forma de imprimir.',
    },
    {
      id: 'bambu-temp-velocidad',
      accion: 'Sube la temperatura de boquilla y baja la velocidad de la pared exterior',
      cuando: { slicer: 'bambu' },
      porque:
        'Es el tercer método de Bambu, y la página lo dice sin cifras: «Appropriately raise the nozzle temperature and reduce the printing speed of the outer wall».',
      fuente: 'Bambu Lab',
      alcance:
        'Bambu no da número para ninguna de las dos cosas, y esta guía no los inventa: las cifras de temperatura de boquilla y de velocidad de pared exterior están en sus guías. La dirección es la de la casa, la cantidad es tuya.',
    },
    {
      id: 'prusa-flow',
      accion: 'Baja el multiplicador de extrusión y calibra el avance lineal',
      cuando: { slicer: 'prusa' },
      porque:
        'Prusa dice que afecta a la visibilidad de la costura el avance lineal y el multiplicador de extrusión, y con un perfil propio el camino es bajar el multiplicador y calibrar el avance lineal.',
      fuente: 'Prusa Research',
      alcance:
        'Prusa no da cifras aquí: la calibración de flujo y de presión avanzada, con sus procedimientos, son de la guía de flujo. Sus perfiles originales ya vienen ajustados, así que esto es para afinar un perfil propio.',
    },
    {
      id: 'seam-gap-bambu',
      accion: 'Comprueba el seam gap: por defecto interrumpe el perímetro un 15 % del diámetro de la boquilla',
      valor: '15 %',
      cuando: { slicer: 'bambu' },
      porque:
        'Para disimular la costura, Bambu Studio detiene la extrusión por adelantado en las paredes interior y exterior y deja un hueco para el sobrante, en % del diámetro de la boquilla: 15 % por defecto.',
      fuente: 'Bambu Lab',
      alcance:
        'Es el valor por defecto del seam gap de **Bambu Studio**, en porcentaje del diámetro de la boquilla: no es una medida en milímetros, no es una propiedad del material y no es el parámetro del PrusaSlicer, que es una distancia con signo.',
    },
    {
      id: 'seam-gap-prusa',
      accion: 'Ajusta el seam gap: positivo interrumpe el lazo, negativo lo solapa',
      cuando: { slicer: 'prusa' },
      porque:
        'En PrusaSlicer, positiva acorta e interrumpe el lazo y reduce la costura, negativa lo prolonga y solapa. Si se expresa en %, sale del diámetro de la boquilla. **A 0 se desactiva la función.**',
      fuente: 'Prusa Research',
      alcance:
        'Es otra parametrización del mismo ajuste que el 15 % de Bambu: no se traducen entre sí y no se promedian. Prusa **no publica un valor por defecto**, así que aquí no se da ninguno.',
    },
    {
      id: 'no-retract-before-wipe',
      accion: 'Deja «Retract amount before wipe» en 0, que es su valor por defecto',
      valor: '0 %',
      cuando: { slicer: 'bambu' },
      porque:
        'Bambu escribe «Z-seam» sólo aquí: si no se retrae antes de limpiar, el efecto Z-seam en la pared exterior mejora. Es la longitud de la retracción rápida antes de la limpieza, en % de la retracción.',
      fuente: 'Bambu Lab',
      alcance:
        'El resultado depende del orden de impresión por defecto, interior-exterior, y **no es una propiedad del material**. Prusa no publica nada equivalente en este lote. Y la retracción, en general, es de la guía de hilos.',
    },
    {
      id: 'no-retract-tpu',
      accion: 'No bajes la retracción para arreglar la costura si imprimes material flexible',
      cuando: { material: 'tpu' },
      porque:
        'Con materiales flexibles como el TPU, la retracción puede encoger el filamento y lleva a atascos y a problemas de extrusión: el ajuste que en otros materiales mejora el acabado es aquí un problema.',
      fuente: 'Bambu Lab',
      alcance:
        'Es la advertencia de Bambu sobre materiales flexibles; Prusa no publica nada equivalente en este lote. Para el resto de materiales, la misma página dice que con la retracción activada se imprime mejor.',
    },
    {
      id: 'scarf-bambu',
      accion: 'Activa el scarf seam para solapar el final del perímetro con su principio',
      valor: 'None · Contour · Contour and Hole',
      cuando: { slicer: 'bambu' },
      porque:
        'Bambu Studio introdujo el *scarf seam* en la 1.9: en vez de interrumpir el perímetro, solapa el final y el principio, como una bufanda, y reduce la visibilidad de la costura «in most cases».',
      fuente: 'Bambu Lab',
      alcance:
        'Los tipos de Bambu son None, Contour y Contour and Hole, y no son los mismos que los de Prusa. Su aplicación automática se limita a donde la costura tradicional no se puede esconder, y no se activa por defecto en superficies con ángulos vivos.',
    },
    {
      id: 'scarf-prusa',
      accion: 'Activa el scarf joint para solapar el final del perímetro con su principio',
      valor: 'Nowhere · Contour · Everywhere',
      cuando: { slicer: 'prusa' },
      porque:
        'El *scarf joint* de Prusa solapa las extrusiones del final y del principio del perímetro: esconde las costuras visibles en los perímetros lisos y, según Prusa, mejora la resistencia de la pieza.',
      fuente: 'Prusa Research',
      alcance:
        'Los tipos de Prusa son Nowhere, Contour y Everywhere, y no son los mismos que los de Bambu. Por defecto sólo se aplica en perímetros lisos. Prusa avisa de que **aumenta el tiempo de impresión** y de que es menos eficaz en esquinas y voladizos; la mejora de resistencia es un dato sólo de Prusa.',
    },
    {
      id: 'scarf-no-angulos',
      accion: 'No fuerces el scarf en las zonas con esquinas: ahí la costura se esconde sola',
      cuando: { forma: ['esquinas', 'mixta'] },
      porque:
        'Bambu no aplica la bufanda en paredes con ángulo vivo, donde la costura se puede esconder, y su umbral es configurable. Prusa también por defecto: el scarf joint no se aplica en superficies no lisas.',
      fuente: 'Bambu Lab, Prusa Research',
      alcance:
        'Las dos casas lo limitan a las superficies donde la costura **no** se puede esconder. Ninguna de las dos recomienda forzarlo en una esquina, y su alcance publicado es el contrario del que se suele suponer.',
    },
    {
      id: 'scarf-no-voladizos',
      accion: 'No extiendas el scarf a los voladizos',
      porque:
        'Bambu: por la pequeña extrusión de la bufanda las líneas pueden no unir bien en la zona volada, y la opción de alejarla sólo aplica con poco voladizo. Prusa: menos eficaz en esquinas y voladizos.',
      fuente: 'Bambu Lab, Prusa Research',
      alcance:
        'Vale para cualquier pieza con voladizos, y no se condiciona a ninguna variable porque esta guía no declara si la pieza los tiene: el aviso es de las dos casas y no depende del material ni del modo de costura.',
    },
    {
      id: 'spiral-vase-alcance',
      accion: 'No cuentes con el modo Spiral vase para quitar la costura',
      porque:
        'Es el único modo sin costura en la pared exterior, y **Bambu** y **Prusa** difieren: Bambu pone cuatro (una pared, sin relleno ni tapa, sólo modelos simples) y Prusa dos (un perímetro, sin relleno).',
      fuente: 'Bambu Lab, Prusa Research',
      alcance:
        'No elimina la costura de la pieza: en Bambu las capas del fondo la siguen teniendo. El modo es de la guía de relleno y allí está su explicación completa; aquí sólo se publica su alcance, que es lo que decide si te sirve.',
    },
  ],

  fueraDeAlcance: [
    {
      sintoma: 'Las esquinas levantadas y el warping',
      porQue:
        'Una pieza que se despega de la cama y se deforma no es un problema de costura: es warping, con sus propios ajustes y su propio diagnóstico.',
      guia: 'warping-pla',
    },
    {
      sintoma: 'El bulto en la base',
      porQue:
        'Un ensanchamiento o un anillo en el primer milímetro de la pieza no es la costura: es el pie de elefante, y se mide antes de compensar nada.',
      guia: 'elephant-foot',
    },
    {
      sintoma: 'Las capas que se sueltan',
      porQue:
        'Si lo que se separan son capas horizontales, el problema es la adhesión entre ellas, no el punto donde el perímetro se cierra.',
      guia: 'separaciones-entre-capas',
    },
    {
      sintoma: 'Los hilos y el goteo',
      porQue:
        'La retracción existe para evitar el stringing y el oozing, y ése es su alcance: los hilos tienen su propia guía, con sus cifras y sus causas.',
      guia: 'stringing',
    },
    {
      sintoma: 'El flujo y la subextrusión',
      porQue:
        'Prusa cita el multiplicador de extrusión y el avance lineal como lo que hace visible la costura, pero sus cifras y su calibración son de la guía de flujo.',
      guia: 'flow-rate',
    },
    {
      sintoma: 'Las paredes y los perímetros',
      porQue:
        'El número de perímetros de pared y el orden de impresión interior-exterior son de esa guía; aquí el 3 de Bambu se publica sólo como uno de sus cuatro métodos para la costura.',
      guia: 'paredes-y-perimetros',
    },
    {
      sintoma: 'El modo Spiral vase y el relleno',
      porQue:
        'El único modo que quita la costura de la pared exterior es de esa guía, con sus condiciones de pared, relleno y tapa; aquí sólo se publica su alcance, y las condiciones no son las mismas en las dos casas.',
      guia: 'relleno-patrones',
    },
    {
      sintoma: 'La orientación de la pieza',
      porQue:
        'Girar la pieza para que la costura caiga en una cara que no se ve es un parámetro del corte, y esa guía es su dueña: aquí sólo se publica por qué las dos casas lo tienen en cuenta.',
      guia: 'orientacion-resistencia',
    },
  ],

  fuentes: [
    {
      url: 'https://wiki.bambulab.com/en/software/bambu-studio/Seam',
      quien: 'Bambu Lab',
      que: 'Los ajustes de costura de Bambu Studio: las cuatro posiciones, el seam gap, el wipe speed y todo el scarf seam con sus parámetros, su aplicación automática y sus contraindicaciones.',
    },
    {
      url: 'https://wiki.bambulab.com/en/filament-acc/filament/print-quality/seam',
      quien: 'Bambu Lab',
      que: 'La sección de costura de la calidad de impresión: la definición de costura, los cuatro métodos para mejorarla y las condiciones del modo Spiral vase.',
    },
    {
      url: 'https://wiki.bambulab.com/en/knowledge-sharing/common-print-quality-problem',
      quien: 'Bambu Lab',
      que: 'El diagnóstico de calidad de impresión, cuyo apartado de costura repite el texto anterior: se cita como corroboración, no como fuente independiente.',
    },
    {
      url: 'https://wiki.bambulab.com/en/software/bambu-studio/parameter/retraction',
      quien: 'Bambu Lab',
      que: 'El parámetro de retracción: la recarga del filamento al final del desplazamiento, el interruptor «Retract on layer change», el «Retract amount before wipe» y el límite del material flexible.',
    },
    {
      url: 'https://help.prusa3d.com/article/seam-position_151069',
      quien: 'Prusa Research',
      que: 'La costura en PrusaSlicer: las cuatro posiciones con sus nombres, el seam gap con signo, el scarf joint con sus tipos y sus avisos, y sus datos de resistencia.',
    },
    {
      url: 'https://help.prusa3d.com/article/seam-painting_168620',
      quien: 'Prusa Research',
      que: 'El pintado manual de la costura: los seam enforcers y los seam blockers, y cómo interactúan con el modo de posición que se haya elegido.',
    },
  ],

  /*
   * Esta guía **lee** el material del archivo y no **explica** ningún campo del
   * panel: el material ya tiene dueño, que es la guía `material`. Por eso el
   * campo del panel va vacío y el material va en `leeDelAnalisis`, igual que en
   * `secar-filamento` y en `tpu-flexible`.
   */
  campos: [],
  leeDelAnalisis: ['material'],
};
