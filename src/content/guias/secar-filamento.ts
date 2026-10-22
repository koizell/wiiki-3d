import type { Guia } from './tipos.ts';
import { AUTOR } from './autor.ts';

/**
 * Secar filamento.
 *
 * La guía que calcula una matriz: material × método → temperatura y tiempo.
 *
 * ## Por qué las reglas son muchas
 *
 * Porque el producto de este tema **es** una matriz, y una matriz por escrito en
 * prosa son veinte párrafos que hay que leer enteros para descubrir que sólo
 * applies la celda del PETG en el horno. Aquí cada celda es una regla con su
 * condición, y el motor enseña la que corresponde a lo que ha declarado quien lee.
 *
 * ## La cifra que casi se publica mal
 *
 * El PETG tiene varias cifras de temperatura en el corpus, y **una de ellas no es
 * un setpoint de secado**. El `55 °C` de la página de secado de Bambu **no** es
 * una temperatura de secado: es la temperatura a la que el AMS **baja** el secado
 * cuando arranca una impresión, para no atascar el extrusor. Publicarlo como «el
 * PETG se seca a 55 °C» sería publicar una cifra que significa otra cosa, y
 * además coincidiría con el 55 °C de Prusa —que sí es un setpoint, pero de su
 * tabla de Prusament y sin método asignado—, que es justo el cruce que hace que
 * la cifra sea tan fácil de publicar mal. Por eso la tarjeta del PETG publica las
 * celdas por método y explica de dónde sale cada número, y por eso ninguna regla
 * de esta guía dice «55 °C» para el PETG.
 *
 * ## Lo que no hay
 *
 * Cifras de PA sin fibra: las dos tablas dan poliamida **con fibra** (PA6-CF/GF,
 * PAHT-CF/GF y PA11 Carbon Fiber). Ninguna fuente da parámetros para PA12, PA6 o
 * nylon sin refuerzo, y esta guía no rellena el hueco. Se dice, en la tarjeta y en
 * el alcance de las reglas de PA, que para ese material no hay cifras.
 *
 * Y ninguna cifra de cama ni de boquilla **de impresión**: las de esta guía son
 * de secado. La cama aparece como método de secado y nunca como temperatura de
 * impresión, y por eso ninguna regla de aquí lleva `rango`: el `rango` compara
 * una cifra con el G-code del visitante, y una temperatura de secado comparada con
 * la cama de su perfil no dice nada.
 */
export const secarFilamento: Guia = {
  slug: 'secar-filamento',
  titulo: 'Secar filamento',
  resumen:
    'El PETG tiene varias cifras de secado y ninguna es «la» buena: lo que las separa es el método y el fabricante.',
  resumenExtra:
    'Esta guía te dice si lo tuyo es humedad y, si lo es, con qué aparato y a qué temperatura.',
  sintoma: '¿Es humedad lo que me pasa?',
  dibujo: 'rugosidad',
  entrada:
    'Todo filamento FFF es higroscópico, y eso no dice que el tuyo esté húmedo: el síntoma lo pone la pieza. Esta guía separa la humedad del ajuste y termina con la tabla de tu material en el aparato que tienes, con su temperatura y su tiempo. Y avisa de lo que no está publicado: para el PA sin fibra no hay cifras.',
  autor: AUTOR,
  actualizado: '2026-10-19',
  minutos: 5,

  /*
   * El diferencial de esta guía.
   *
   * Lo que se confunde con la humedad no es un ajuste: son **tres ajustes
   * distintos**, y cada uno lleva a su guía. Los hilos tienen más causas que el
   * agua —Bambu las enumera una por una y Prusa empieza por la retracción—, así
   * que el «sí» de esa comprobación tiene que llevar su matiz: la humedad es *una*
   * causa, no *la* causa.
   *
   * Y el caso de las líneas finas y los huecos es el contrario: ahí la humedad
   * **no está** entre las causas que da la fuente, y por eso esa es la salida
   * `siNo`. Es el único «no» que es un «no» rotundo.
   */
  diferencial: {
    contra: 'humedad contra ajuste: una bobina que se ha mojado y un ajuste que está mal puesto',
    contraCorto: 'ajuste de retracción o de flujo',
    comprobaciones: [
      {
        id: 'burbujas',
        mira: 'Durante la extrusión, ¿oyes chasquidos o ves burbujas en el material?',
        si: 'Sí: es la señal que más directamente apunta al agua, y lo que hay que hacer es secar el carrete antes de tocar ningún otro ajuste.',
        no: 'No: puede haber humedad igual, pero esto no la demuestra. La segunda comprobación es más útil.',
      },
      {
        id: 'rugosidad',
        mira: '¿La superficie sale rugosa y la pieza se rompe con menos fuerza de la que esperabas?',
        si: 'Sí: la rugosidad, la mala unión entre capas y la pérdida de resistencia están en la lista de síntomas del filamento húmedo.',
        no: 'No: ese defecto tiene otras causas y esta guía no las cubre. Y que el carrete lleve tiempo abierto no demuestra nada por sí solo.',
      },
      {
        id: 'hilos',
        mira: '¿Lo que ves son hilos finos entre piezas, o goteo en la boquilla?',
        si: 'Sí, pero la humedad es una causa entre varias: Bambu la lista la primera y Prusa casi la última. La prueba que da Prusa es imprimir con otro carrete.',
        no: 'No: si lo que falla son líneas finas y huecos, esto no es humedad. La lista de causas de la subextrusión no la incluye.',
      },
    ],
    siNo: { guia: 'flow-rate', etiqueta: 'Flujo y subextrusión' },
  },

  variables: [
    {
      id: 'material',
      etiqueta: 'Material',
      indicador: 'material',
      para: 'Cada material tiene su fila de la tabla: cambian la temperatura, el tiempo y hasta si hace falta secarlo.',
      necesaria: true,
      /*
       * `campos: ['material']` aquí y `campos: []` en la guía entera.
       *
       * No es una contradicción: el campo del panel que esta guía **explica** es
       * ninguno —el material ya tiene dueño, la guía `material`— y el que
       * **lee** es el material. La barra «Tu archivo» sólo pinta lo que la guía
       * declara, así que aquí enseña el material de tu G-code y lo lleva a la
       * casilla donde se declara. Es el mismo mecanismo que `temperatura-cama`.
       */
      campos: ['material'],
      opciones: [
        { id: 'pla', etiqueta: 'PLA', detalle: 'Secado recomendado' },
        { id: 'pla-cf', etiqueta: 'PLA con fibra', detalle: 'Un poco más caliente' },
        { id: 'petg', etiqueta: 'PETG', detalle: 'Absorbe poco, no cero' },
        { id: 'abs', etiqueta: 'ABS o ASA', detalle: 'Alta temperatura' },
        { id: 'pc', etiqueta: 'PC', detalle: 'Los ciclos lo quebran' },
        { id: 'pa', etiqueta: 'PA o nylon', detalle: 'Sin cifras sin fibra' },
        { id: 'tpu', etiqueta: 'TPU', detalle: 'Secado obligatorio' },
      ],
    },
    {
      id: 'dispositivo',
      etiqueta: '¿Con qué vas a secar?',
      indicador: 'maquina',
      para: 'La tabla da un número por método y no son el mismo: el AMS 2 Pro no pasa de 65 °C y el horno llega a 140 °C.',
      necesaria: true,
      opciones: [
        { id: 'ams2pro', etiqueta: 'AMS 2 Pro', detalle: 'Techo de 65 °C' },
        { id: 'amsht', etiqueta: 'AMS HT', detalle: 'Hasta 85 °C' },
        { id: 'horno', etiqueta: 'Horno de convección', detalle: 'Forzado, no de cocina' },
        { id: 'cama', etiqueta: 'Cama de la impresora', detalle: 'Sólo impresoras cerradas' },
        { id: 'ninguno', etiqueta: 'Nada de esto', detalle: 'Ni AMS ni horno' },
      ],
    },
    {
      id: 'sintoma',
      etiqueta: '¿Qué se ve?',
      indicador: 'general',
      para: 'El síntoma decide si hay que secar y qué comprobar después: los hilos tienen más causas que la humedad, y los huecos no la tienen.',
      opciones: [
        { id: 'burbujas', etiqueta: 'Burbujas o chasquidos' },
        { id: 'hilos', etiqueta: 'Hilos finos entre piezas' },
        { id: 'goteo', etiqueta: 'Goteo o boquilla pegajosa' },
        { id: 'rugosa', etiqueta: 'Superficie rugosa o pieza frágil' },
        { id: 'huecos', etiqueta: 'Líneas finas y huecos' },
        { id: 'nada', etiqueta: 'Nada raro, sólo la tabla' },
      ],
    },
  ],

  conocimiento: [
    {
      id: 'higroscopico',
      titulo: 'Higroscópico no es «está húmedo»',
      puntos: [
        'Los materiales de impresión FFF son **mayoritariamente higroscópicos**: atraen moléculas de agua del ambiente.',
        'Eso es una **propiedad del material**, no el estado de tu carrete, y las dos fuentes de este lote formulan la condición por separado.',
        'Un material higroscópico *puede* coger humedad, y sólo se sabe que la cogió cuando se nota en la pieza.',
      ],
      indicador: 'material',
      cuerpo:
        'Los materiales de impresión FFF son **mayoritariamente higroscópicos**: atraen moléculas de agua del ambiente. Eso es una **propiedad del material**, no el estado de tu carrete, y las dos fuentes de este lote formulan la condición por separado: un material higroscópico *puede* coger humedad, y sólo se sabe que la cogió cuando se nota en la pieza.',
      cita: {
        texto: 'The materials used for FFF 3D printing are mostly hygroscopic',
        fuente: 'Prusa Research',
      },
    },
    {
      id: 'senal',
      titulo: 'La primera señal es la superficie',
      puntos: [
        'Prusa pone la primera señal en la calidad de la superficie, y amplía la lista cuando el contenido de agua es alto.',
        'Mala unión entre capas, bultos en la pieza, burbujas y humo durante la extrusión.',
        '**Ninguna fuente de este lote da una prueba para saber si tu bobina está húmeda**: sólo el síntoma.',
      ],
      indicador: 'entorno',
      cuerpo:
        'Prusa pone la primera señal en la calidad de la superficie, y amplía la lista cuando el contenido de agua es alto: mala unión entre capas, bultos en la pieza, burbujas y humo durante la extrusión. **Ninguna fuente de este lote da una prueba para saber si tu bobina está húmeda**: sólo el síntoma.',
      cita: {
        texto: 'the general first signal will be a poor quality of the model surface',
        fuente: 'Prusa Research',
      },
    },
    {
      id: 'mecanismo',
      titulo: 'Lo que hace el agua dentro de la boquilla',
      puntos: [
        'El mecanismo está escrito en la otra casa, y explica por qué salen todos los síntomas a la vez.',
        'La humedad se vaporiza dentro de la boquilla caliente, el filamento fundido se expande y sale errático.',
        'Y de ahí salen burbujas, hilos, goteo, huecos, superficies rugosas y menos resistencia.',
      ],
      indicador: 'temperatura',
      cuerpo:
        'El mecanismo está escrito en la otra casa, y explica por qué salen todos los síntomas a la vez: la humedad se vaporiza dentro de la boquilla caliente, el filamento fundido se expande y sale errático, y de ahí salen burbujas, hilos, goteo, huecos, superficies rugosas y menos resistencia.',
      cita: {
        texto: 'this moisture rapidly vaporizes inside the hot nozzle, causing the molten filament to expand, extrude erratically, and form bubbles',
        fuente: 'Bambu Lab',
      },
    },
    {
      id: 'no-warping',
      titulo: 'La humedad no explica el warping',
      puntos: [
        'Ninguna fuente de este lote relaciona la humedad con el warping: la sección de warping de Bambu no la cuenta entre sus causas.',
        'Y la sección de filamento húmedo no incluye las esquinas levantadas entre sus síntomas.',
        '**Secar la bobina no levanta ni baja una esquina**, y si eso es lo que te pasa, el diagnóstico es otro.',
      ],
      indicador: 'material',
      cuerpo:
        'Ninguna fuente de este lote relaciona la humedad con el warping: la sección de warping de Bambu no la cuenta entre sus causas, y la sección de filamento húmedo no incluye las esquinas levantadas entre sus síntomas. **Secar la bobina no levanta ni baja una esquina**, y si eso es lo que te pasa, el diagnóstico es otro.',
      enlaza: { guia: 'warping-pla', etiqueta: 'Warping en PLA' },
    },
    {
      id: 'no-huecos',
      titulo: 'Las líneas finas y los huecos no son de humedad',
      puntos: [
        'La subextrusión tiene su propia lista de causas en la fuente.',
        'Resistencia a la extrusión, volumen de extrusión insuficiente y valor de PA mal ajustado.',
        '**La humedad no aparece en ninguna de las tres.** Si lo que falla es que no sale material, secar el carrete no cambia nada de eso.',
      ],
      indicador: 'material',
      cuerpo:
        'La subextrusión tiene su propia lista de causas en la fuente: resistencia a la extrusión, volumen de extrusión insuficiente y valor de PA mal ajustado. **La humedad no aparece en ninguna de las tres.** Si lo que falla es que no sale material, secar el carrete no cambia nada de eso.',
      enlaza: { guia: 'flow-rate', etiqueta: 'Flujo y subextrusión' },
    },
    {
      id: 'petg',
      titulo: 'El PETG tiene varias temperaturas de secado, y una de ellas no lo es',
      puntos: [
        'Tres salen de la **tabla de secado** de Bambu y son un número por método.',
        '65 °C en el AMS, 60–65 °C en el horno de convección y 75–85 °C en la cama.',
        'Otra cifra, 65–75 °C, sale de su página de diagnóstico y no de la tabla.',
        'Y las dos no se resuelven: el corpus no dice por qué el horno de una página pide más que el de la otra.',
        'El **55 °C** que aparece en esa misma página de secado **no es una temperatura de secado**.',
        'Es la que el AMS baja cuando arranca una impresión para no atascar el extrusor.',
        'Prusa da 55 °C y 6 h para su PETG, sin decir en qué método.',
      ],
      indicador: 'cama',
      cuerpo:
        'Tres salen de la **tabla de secado** de Bambu y son un número por método: 65 °C en el AMS, 60–65 °C en el horno de convección y 75–85 °C en la cama. Otra cifra, 65–75 °C, sale de su página de diagnóstico y no de la tabla, y las dos no se resuelven: el corpus no dice por qué el horno de una página pide más que el de la otra. El **55 °C** que aparece en esa misma página de secado **no es una temperatura de secado**: es la que el AMS baja cuando arranca una impresión para no atascar el extrusor. Prusa da 55 °C y 6 h para su PETG, sin decir en qué método.',
      cuando: { material: 'petg' },
      cifra: {
        valor: '65 · 60–65 · 75–85 °C',
        nota: 'AMS · horno · cama, en la tabla de secado de Bambu',
      },
      cita: {
        texto:
          'the drying temperature is automatically lowered after a print job starts, usually below the filament\'s softening point, to prevent clogging in the AMS',
        fuente: 'Bambu Lab',
      },
    },
    {
      id: 'metodos',
      titulo: 'El AMS 2 Pro tiene un techo, y no es un límite del material',
      puntos: [
        'El AMS 2 Pro sirve para filamentos que no piden más de **65 °C**.',
        'Los que piden 75–85 °C —ABS, ASA, PC, PVA, poliamidas con fibra— o 100–140 °C —PPA-CF, PPS-CF— salen en su columna como "no compatible".',
        'Eso es **del aparato**: el ABS se puede secar, lo que no puede es el AMS 2 Pro.',
        'El AMS HT cubre todos los materiales, pero avisa de que algunos no quedan secos del todo.',
      ],
      indicador: 'temperatura',
      cuerpo:
        'El AMS 2 Pro sirve para filamentos que no piden más de **65 °C**. Los que piden 75–85 °C —ABS, ASA, PC, PVA, poliamidas con fibra— o 100–140 °C —PPA-CF, PPS-CF— salen en su columna como «no compatible». Eso es **del aparato**: el ABS se puede secar, lo que no puede es el AMS 2 Pro. El AMS HT cubre todos los materiales, pero avisa de que algunos no quedan secos del todo.',
      cifra: { valor: '65 °C', nota: 'techo del AMS 2 Pro: por encima, el aparato no puede' },
      cita: {
        texto: 'Suitable for filaments requiring drying temperatures no higher than 65 °C',
        fuente: 'Bambu Lab',
      },
    },
    {
      id: 'horno-cocina',
      titulo: 'El horno de cocina: uno lo permite y otro lo prohíbe',
      puntos: [
        'Bambu lo prohíbe —el reparto de calor de un horno doméstico es irregular y las zonas pegadas a las resistencias se ponen muy calientes—.',
        'Y pide convección forzada. Prusa lo admite con dos condiciones: un termómetro externo.',
        'Porque el horno mide mal, y aceptar que muchos hornos no bajan lo suficiente para secar sin estropear el filamento.',
        '**El corpus no resuelve cuál seguir**: lo único en que coinciden es en que pasarse de la temperatura ablanda el filamento y lo pega.',
      ],
      indicador: 'temperatura',
      cuerpo:
        'Bambu lo prohíbe —el reparto de calor de un horno doméstico es irregular y las zonas pegadas a las resistencias se ponen muy calientes— y pide convección forzada. Prusa lo admite con dos condiciones: un termómetro externo, porque el horno mide mal, y aceptar que muchos hornos no bajan lo suficiente para secar sin estropear el filamento. **El corpus no resuelve cuál seguir**: lo único en que coinciden es en que pasarse de la temperatura ablanda el filamento y lo pega.',
      cita: {
        texto: 'Do not use a microwave oven or a kitchen oven to dry filaments',
        fuente: 'Bambu Lab',
      },
    },
    {
      id: 'prusa-tabla',
      titulo: 'La tabla de Prusa es de los materiales Prusament',
      puntos: [
        'Su alcance se nota en lo que no cubre: no da cifras propias para ABS, PA sin fibra, TPU de otras marcas, PET-CF ni PVA.',
        '**No asigna método a sus filas**, así que sus tiempos no son "el tiempo del horno de casa" —su 55 °C.',
        'Y 6 h del PETG no es un tiempo de horno—.',
        'Ni el de un AMS —Prusa no tiene AMS; el AMS 2 Pro y el AMS HT son de Bambu—.',
        'El **ASA y el PC sí están**, y con cifras distintas de las de Bambu: Prusa da 80 ºC y 4 h para su ASA, y 85 ºC y 5 h.',
        '90 ºC y 4 h y 90 °C y 4–6 h para sus tres variantes de PC, sin método asignado, frente a los 80 °C y 8 h del AMS HT de Bambu.',
        'Son dos casas con métodos no declarados por una de las partes y **no se promedian**.',
      ],
      indicador: 'temperatura',
      cuerpo:
        'Su alcance se nota en lo que no cubre: no da cifras propias para ABS, PA sin fibra, TPU de otras marcas, PET-CF ni PVA. **No asigna método a sus filas**, así que sus tiempos no son «el tiempo del horno de casa» —su 55 °C y 6 h del PETG no es un tiempo de horno—, ni el de un AMS —Prusa no tiene AMS; el AMS 2 Pro y el AMS HT son de Bambu—. El **ASA y el PC sí están**, y con cifras distintas de las de Bambu: Prusa da 80 ºC y 4 h para su ASA, y 85 ºC y 5 h, 90 ºC y 4 h y 90 °C y 4–6 h para sus tres variantes de PC, sin método asignado, frente a los 80 °C y 8 h del AMS HT de Bambu. Son dos casas con métodos no declarados por una de las partes y **no se promedian**.',
      cita: {
        texto: 'the following temperatures and times are recommended for the Prusament materials',
        fuente: 'Prusa Research',
      },
    },
    {
      id: 'almacenamiento',
      titulo: 'Secar sin guardar es la mitad del trabajo',
      puntos: [
        'Las cifras de almacenamiento son de Bambu: el objetivo es guardar por debajo del **20 % RH**.',
        'Y a esa humedad el filamento seco aguanta entre 2 y 7 días, según lo higroscópico que sea.',
        'En un interior de unos 55 % RH —lo habitual— el filamento recién seco absorbe suficiente humedad para afectar la calidad en **2 a 12.',
        'Horas**, y en el aire abierto suele estar entre el 45 % y el 65 %.',
        'Prusa no da ninguna de esas cifras: publica el procedimiento, que es pasar el carrete a la caja seca y cerrarla de inmediato.',
        'Y dos formas de guardar, un espacio cerrado con desecante y una bolsa al vacío con desecante dentro.',
      ],
      indicador: 'material',
      cuerpo:
        'Las cifras de almacenamiento son de Bambu: el objetivo es guardar por debajo del **20 % RH**, y a esa humedad el filamento seco aguanta entre 2 y 7 días, según lo higroscópico que sea. En un interior de unos 55 % RH —lo habitual— el filamento recién seco absorbe suficiente humedad para afectar la calidad en **2 a 12 horas**, y en el aire abierto suele estar entre el 45 % y el 65 %. Prusa no da ninguna de esas cifras: publica el procedimiento, que es pasar el carrete a la caja seca y cerrarla de inmediato, y dos formas de guardar, un espacio cerrado con desecante y una bolsa al vacío con desecante dentro.',
      cifra: {
        valor: '20 % RH',
        nota: 'objetivo de almacenamiento de Bambu; a 20 % RH el filamento seco aguanta 2–7 días',
      },
      cita: {
        texto: 'After drying, immediately transfer the filament spool into the filament dry box and close it to prevent reabsorption of moisture',
        fuente: 'Prusa Research',
      },
    },
    {
      id: 'desecante',
      titulo: 'El desecante avisa por color',
      puntos: [
        'El gel de sílice cambia de color: las perlas amarillas se van poniendo verdes.',
        'Y cuando **todo el paquete está verde oscuro** hay que cambiarlo o regenerarlo.',
        'Se regenera en el horno doméstico a 80–90 °C durante 1–2 h si está algo húmedo o 2–3 h si está saturado.',
        'Y **nunca por encima de 100 °C**, porque por encima se daña la estructura de la sílice.',
        'Con una cama a 80 °C el proceso tarda 3–4 h, porque la potencia es menor.',
        'Se puede regenerar 5–15 veces.',
        'Ese horno de casa es el mismo que Bambu prohíbe para el filamento: lo que aquí se hornea es el gel de sílice.',
        'No el carrete, y sus temperaturas no son de secado.',
      ],
      indicador: 'cama',
      cuerpo:
        'El gel de sílice cambia de color: las perlas amarillas se van poniendo verdes, y cuando **todo el paquete está verde oscuro** hay que cambiarlo o regenerarlo. Se regenera en el horno doméstico a 80–90 °C durante 1–2 h si está algo húmedo o 2–3 h si está saturado, y **nunca por encima de 100 °C**, porque por encima se daña la estructura de la sílice. Con una cama a 80 °C el proceso tarda 3–4 h, porque la potencia es menor. Se puede regenerar 5–15 veces. Ese horno de casa es el mismo que Bambu prohíbe para el filamento: lo que aquí se hornea es el gel de sílice, no el carrete, y sus temperaturas no son de secado.',
      cifra: {
        valor: '80–90 °C',
        nota: 'temperatura de regeneración del gel de sílice, no de secado del filamento',
      },
      cita: {
        texto: 'If the entire pack appears dark green, it should be replaced with a new one or regenerated by drying',
        fuente: 'Bambu Lab',
      },
    },
    {
      id: 'carrete',
      titulo: 'Los límites del carrete son cuatro y el color no basta',
      puntos: [
        'El carrete negro **viejo**, con tapas de plástico prensadas contra el cartón.',
        'Sólo se puede calentar hasta 45 °C: por encima el plástico se expande, el cartón se queda expandido al enfriar y el carrete queda flojo.',
        'El gris viejo aguanta 90 °C por el pegamento, el negro nuevo 90 °C y el gris nuevo 150 °C.',
        'Para el carrete viejo por encima de 45 °C, la alternativa de Prusa es un tornillo M4×65 que sujete las dos tapas.',
      ],
      indicador: 'temperatura',
      cuerpo:
        'El carrete negro **viejo**, con tapas de plástico prensadas contra el cartón, sólo se puede calentar hasta 45 °C: por encima el plástico se expande, el cartón se queda expandido al enfriar y el carrete queda flojo. El gris viejo aguanta 90 °C por el pegamento, el negro nuevo 90 °C y el gris nuevo 150 °C. Para el carrete viejo por encima de 45 °C, la alternativa de Prusa es un tornillo M4×65 que sujete las dos tapas.',
      cifra: {
        valor: '45 · 90 · 150 °C',
        nota: 'límite del carrete: negro viejo, gris viejo y negro nuevo, y gris nuevo',
      },
      cita: { texto: 'The spools can be heated up safely up to 45 ºC', fuente: 'Prusa Research' },
    },
    {
      id: 'pa',
      titulo: 'Para el PA sin fibra no hay cifras',
      puntos: [
        'Las dos tablas dan poliamida **con fibra**: Bambu, PA6-CF/GF y PAHT-CF/GF; Prusa, PA11 Carbon Fiber.',
        '**Ninguna fuente da parámetros para PA12, PA6 o nylon sin refuerzo**, y esta guía no rellena ese hueco.',
        'Además el PA abierto al aire se bebe la humedad en unos 3 meses.',
        'Y a partir de ahí es muy difícil de secar con un horno de convección a 80–90 °C.',
        'La respuesta pasa a ser preventiva, protegerlo y guardarlo sellado.',
      ],
      indicador: 'temperatura',
      cuerpo:
        'Las dos tablas dan poliamida **con fibra**: Bambu, PA6-CF/GF y PAHT-CF/GF; Prusa, PA11 Carbon Fiber. **Ninguna fuente da parámetros para PA12, PA6 o nylon sin refuerzo**, y esta guía no rellena ese hueco. Además el PA abierto al aire se bebe la humedad en unos 3 meses, y a partir de ahí es muy difícil de secar con un horno de convección a 80–90 °C: la respuesta pasa a ser preventiva, protegerlo y guardarlo sellado.',
      cuando: { material: 'pa' },
      cifra: {
        valor: '3 meses',
        nota: 'plazo tras el cual el PA abierto al aire ya es muy difícil de secar con horno',
      },
      cita: {
        texto:
          'PA-based filaments … absorb a significant amount of moisture when exposed to open air for around 3 months. After this level of moisture absorption, it becomes very difficult to dry them using a conventional convection oven at 80–90 °C',
        fuente: 'Bambu Lab',
      },
    },
    {
      id: 'pc',
      titulo: 'El PC se vuelve quebradizo con los ciclos',
      puntos: [
        'El PC puede volverse quebradizo después de ciclos repetidos de calentamiento y enfriamiento.',
        'No afecta a las propiedades mecánicas de la pieza impresa, pero sí al riesgo de que el filamento se rompa dentro del extrusor.',
        'Si el carrete ha estado bien protegido, puede no necesitar secado, o sólo uno corto, para no acumular ciclos.',
      ],
      indicador: 'temperatura',
      cuerpo:
        'El PC puede volverse quebradizo después de ciclos repetidos de calentamiento y enfriamiento. No afecta a las propiedades mecánicas de la pieza impresa, pero sí al riesgo de que el filamento se rompa dentro del extrusor. Si el carrete ha estado bien protegido, puede no necesitar secado, o sólo uno corto, para no acumular ciclos.',
      cuando: { material: 'pc' },
      cita: {
        texto: 'PC filament may become brittle after repeated "heating–cooling" drying cycles',
        fuente: 'Bambu Lab',
      },
    },
    {
      id: 'horno-protocolo',
      titulo: 'En el horno, el carrete no puede tocar nada',
      puntos: [
        'El horno tiene que ser de convección forzada, la cámara no demasiado pequeña y el carrete **alejado de los elementos calefactores**.',
        'El mínimo son 250 mm de fondo por 250 mm de ancho y 90 mm de alto.',
        'Y la bobina reutilizable de Bambu mide 200 mm de diámetro exterior y 67 mm de altura.',
        'En el horno de laboratorio de Prusa: sólo carretes sin su embalaje original, sin mezclar materiales en la misma tanda.',
        'Y el temporizador arranca **cuando se alcanza la temperatura objetivo**, no al encender el horno.',
      ],
      indicador: 'temperatura',
      cuerpo:
        'El horno tiene que ser de convección forzada, la cámara no demasiado pequeña y el carrete **alejado de los elementos calefactores**: el mínimo son 250 mm de fondo por 250 mm de ancho y 90 mm de alto, y la bobina reutilizable de Bambu mide 200 mm de diámetro exterior y 67 mm de altura. En el horno de laboratorio de Prusa: sólo carretes sin su embalaje original, sin mezclar materiales en la misma tanda, y el temporizador arranca **cuando se alcanza la temperatura objetivo**, no al encender el horno.',
      cuando: { dispositivo: 'horno' },
      cifra: {
        valor: '250 × 250 × 90 mm',
        nota: 'cámara mínima de un horno de convección para un carrete',
      },
      cita: {
        texto:
          'Keep the timer set to start once the target temperature is reached (default setting). This ensures accurate drying time',
        fuente: 'Prusa Research',
      },
    },
    {
      id: 'cama-metodo',
      titulo: 'La cama como secador, sólo en impresoras cerradas',
      puntos: [
        'El método de cama **exige impresora cerrada**: las de estructura abierta no pueden usarse para secar.',
        'El procedimiento es descargar el filamento del cabezal.',
        'Bajar la cama a la posición de reposo, tapar el carrete con una tapa resistente al calor o con su caja de embalaje.',
        'Y **voltear el carrete a mitad** para que el calor sea uniforme.',
        'Al terminar, la cama a 0 °C y se espera a que el carrete se enfríe antes de tocarlo.',
      ],
      indicador: 'maquina',
      cuerpo:
        'El método de cama **exige impresora cerrada**: las de estructura abierta no pueden usarse para secar. El procedimiento es descargar el filamento del cabezal, bajar la cama a la posición de reposo, tapar el carrete con una tapa resistente al calor o con su caja de embalaje, y **voltear el carrete a mitad** para que el calor sea uniforme. Al terminar, la cama a 0 °C y se espera a que el carrete se enfríe antes de tocarlo.',
      cuando: { dispositivo: 'cama' },
      cita: {
        texto: 'P1P / A1 / A2L / A1 mini, as open-frame printers, cannot be used to dry filament',
        fuente: 'Bambu Lab',
      },
    },
    {
      id: 'lw-pla',
      titulo: 'El filamento de baja densidad trae gas dentro',
      puntos: [
        'El LW-PLA tiene más huecos y gas —agua— en el interior.',
        'Así que la página de diagnóstico recomienda secarlo antes de imprimir y bajar el ratio de flujo al laminar.',
        'El ratio es de la guía de flujo; aquí lo que se conserva es el mecanismo.',
        'Este filamento trae su propio problema de gas aunque el carrete no se haya mojado.',
      ],
      indicador: 'material',
      cuerpo:
        'El LW-PLA tiene más huecos y gas —agua— en el interior, así que la página de diagnóstico recomienda secarlo antes de imprimir y bajar el ratio de flujo al laminar. El ratio es de la guía de flujo; aquí lo que se conserva es el mecanismo: este filamento trae su propio problema de gas aunque el carrete no se haya mojado.',
      cuando: { material: 'pla' },
      cita: { texto: 'more holes and gas (water) in the interior', fuente: 'Bambu Lab' },
      enlaza: { guia: 'flow-rate', etiqueta: 'Flujo y subextrusión' },
    },
  ],

  reglas: [
    {
      id: 'ams-pla',
      accion: 'Seca el carrete en el AMS',
      valor: '45 °C · 12 h',
      cuando: { material: ['pla', 'pla-cf'], dispositivo: ['ams2pro', 'amsht'] },
      porque:
        'Es la celda de la tabla de Bambu para el PLA y el PLA-CF: 45 °C y 12 horas en el AMS. El PLA es el material que menos necesita secarse y aun así la casa lo marca como recomendado.',
      fuente: 'Bambu Lab',
      alcance:
        'Prusa da 45 °C para el PLA pero 6 h, y su tabla no dice en qué método se aplican. Los 12 h son los del AMS de Bambu: no son una verdad sobre el material.',
    },
    {
      id: 'horno-pla',
      accion: 'Seca el carrete en el horno de convección',
      valor: '50 °C · 8 h',
      cuando: { material: 'pla', dispositivo: 'horno' },
      porque:
        'Es la fila del PLA Basic y el PLA Matte de la tabla de Bambu: 50 °C y 8 horas en horno de convección forzada, el único horno que la casa acepta. Da 5 °C más que el AMS a cambio de 4 h menos.',
      fuente: 'Bambu Lab',
      alcance:
        'La fila del PLA Basic y del PLA Matte. En el horno las demás variantes de PLA suben: el Silk, el Aero y el Galaxy dan 55 °C, y el Wood 55–65 °C; el PLA-CF/GF tiene su propia fila, de 50–60 °C. En la cama el Aero **no** cambia —60–70 °C, como el Basic—, y los que suben ahí son el Silk, el Galaxy, el Wood y el PLA-CF/GF. El Wood es el único PLA que marca el secado como obligatorio.',
    },
    {
      id: 'horno-pla-cf',
      accion: 'Seca el carrete en el horno de convección',
      valor: '50–60 °C · 8 h',
      cuando: { material: 'pla-cf', dispositivo: 'horno' },
      porque:
        'El PLA con fibra tiene su propia fila en la tabla de Bambu, más ancha que la del PLA normal: 50–60 °C en el horno y 8 horas. La diferencia son grados: cinco en la cama y hasta diez en el horno.',
      fuente: 'Bambu Lab',
      alcance:
        'La fila «PLA-CF / GF» de la tabla de Bambu: filamento de Bambu con fibra, no cualquier PLA con fibra. En el AMS esa fila da los mismos 45 °C y 12 h que el PLA sin fibra; en la cama, 65–75 °C.',
    },
    {
      id: 'cama-pla',
      accion: 'Seca el carrete en la cama',
      valor: '60–70 °C · 12 h',
      cuando: { material: 'pla', dispositivo: 'cama' },
      porque:
        'La tabla de Bambu da para el PLA Basic y el PLA Matte 60–70 °C durante 12 horas en la cama usada como secador. Es la celda más caliente de las tres del PLA y la que más exige del carrete.',
      fuente: 'Bambu Lab',
      alcance:
        'La cama **al servicio del secado**, no la temperatura de cama de impresión: 60–70 °C es irreconciliable con cualquier temperatura de impresión de PLA. Las cifras de cama de impresión están en la guía de temperatura de cama. Esta celda es la del PLA Basic, el PLA Matte y el PLA Aero; el Silk y el Galaxy dan 65–75 °C y el Wood 70–75 °C.',
    },
    {
      id: 'cama-pla-cf',
      accion: 'Seca el carrete en la cama',
      valor: '65–75 °C · 12 h',
      cuando: { material: 'pla-cf', dispositivo: 'cama' },
      porque:
        'El PLA-CF y el PLA-GF suben la del PLA en la cama: 65–75 °C y 12 h, 5 °C más que el PLA Basic. En el procedimiento no coinciden: el PLA Basic pide voltear cada 6 h y tapar el carrete; el PLA-CF/GF no.',
      fuente: 'Bambu Lab',
      alcance:
        'Cama al servicio del secado, no cama de impresión. El carrete tiene que aguantar el calor: el negro viejo de Prusa sólo llega a 45 °C.',
    },
    {
      id: 'ams-petg',
      accion: 'Seca el carrete en el AMS',
      valor: '65 °C · 12 h',
      cuando: { material: 'petg', dispositivo: ['ams2pro', 'amsht'] },
      porque:
        'El PETG y el PETG-CF comparten fila en la tabla de Bambu, y en el AMS esa fila da 65 °C durante 12 horas. Es el setpoint de secado del PETG en el fabricante que publica la tabla.',
      fuente: 'Bambu Lab',
      alcance:
        'Los 65 °C son del AMS de Bambu. El 55 °C que aparece en esa misma página no es una temperatura de secado: es la que el AMS baja cuando arranca una impresión. El 55 °C de Prusa es de su tabla de Prusament, sin método asignado.',
    },
    {
      id: 'horno-petg',
      accion: 'Seca el carrete en el horno de convección',
      valor: '60–65 °C · 8 h',
      cuando: { material: 'petg', dispositivo: 'horno' },
      porque:
        'La tabla de Bambu da 60–65 °C y 8 horas en horno de convección para el PETG. Su página de diagnóstico da 65–75 °C durante unas 8 horas, y el corpus no explica por qué un horno pide más que el otro.',
      fuente: 'Bambu Lab',
      alcance:
        'Los 60–65 °C son la tabla del fabricante. El 65–75 °C es una cifra de la página de diagnóstico de calidad, no de la tabla: el corpus no resuelve la diferencia y aquí no se promedian.',
    },
    {
      id: 'cama-petg',
      accion: 'Seca el carrete en la cama',
      valor: '75–85 °C · 12 h',
      cuando: { material: 'petg', dispositivo: 'cama' },
      porque:
        'La columna de cama de la tabla de Bambu da 75–85 °C durante 12 horas para el PETG y el PETG-CF. Es la cifra más alta de las tres y la que más exige del carrete.',
      fuente: 'Bambu Lab',
      alcance:
        'Cama al servicio del secado, no cama de impresión: 75–85 °C es incompatible con cualquier temperatura de impresión de PETG. El carrete negro viejo de Prusa no aguanta ni 45 °C.',
    },
    {
      id: 'ams2pro-no-llega',
      accion: 'Saca el ABS o el PC del AMS 2 Pro y usa el horno',
      valor: '75–85 °C · 8 h',
      cuando: { material: ['abs', 'pc'], dispositivo: 'ams2pro' },
      porque:
        'El AMS 2 Pro sólo sirve para filamentos que no piden más de 65 °C, y estos piden 75–85 °C en el horno: en la tabla salen como «no compatible», una limitación del aparato y no del material.',
      fuente: 'Bambu Lab',
      alcance:
        'El ABS y el ASA piden 8 h en el horno, y el PC 8 h también. Si tu AMS es el HT, no necesitas este rodeo: ese llega a 80–85 °C.',
    },
    {
      id: 'ams2pro-no-llega-pa',
      accion: 'Saca la poliamida del AMS 2 Pro y usa el horno',
      valor: '75–85 °C · 8–12 h',
      cuando: { material: 'pa', dispositivo: 'ams2pro' },
      porque:
        'El AMS 2 Pro sólo llega a 65 °C, y la poliamida con fibra de la tabla de Bambu pide 75–85 °C en el horno, así que tampoco cabe: sale como «no compatible», un límite del aparato y no del material.',
      fuente: 'Bambu Lab',
      alcance:
        'Son las cifras de la poliamida **con fibra**; para el PA sin refuerzo ninguna fuente da parámetros. Si tu AMS es el HT, no necesitas este rodeo: ese da 85 °C durante 12 h.',
    },
    {
      id: 'amsht-abs-pc',
      accion: 'Seca el carrete en el AMS HT',
      valor: '80 °C · 8 h',
      cuando: { material: ['abs', 'pc'], dispositivo: 'amsht' },
      porque:
        'El ABS y el ASA comparten fila en la tabla de Bambu y el PC tiene fila propia, y las dos dan 80 °C durante 8 horas en el AMS HT. Es el aparato que sí cubre a los materiales de alta temperatura.',
      fuente: 'Bambu Lab',
      alcance:
        'La fila «ABS, ASA» de la tabla de Bambu; el PC tiene fila propia con las mismas cifras. **Prusa da 80 ºC y 4 h para su ASA, sin método asignado: no se promedian.** Y para el PC, Prusa da 85 ºC y 5 h para el PC Blend, 90 ºC y 4 h para el PC Blend Carbon Fiber y 90 °C y 4–6 h para el PC Space Grade, también sin método asignado: son tres variantes de Prusament, no una fila única de «PC».',
    },
    {
      id: 'amsht-pa',
      accion: 'Seca el carrete en el AMS HT',
      valor: '85 °C · 12 h',
      cuando: { material: 'pa', dispositivo: 'amsht' },
      porque:
        'La poliamida con fibra de la tabla de Bambu —PA6-CF/GF y PAHT-CF/GF— da 85 °C durante 12 horas en el AMS HT, y además la casa marca su secado como obligatorio y el desecante como requerido.',
      fuente: 'Bambu Lab',
      alcance:
        'Son las cifras de la poliamida **con fibra**. Para el PA sin refuerzo ninguna fuente da parámetros, y Prusa, en su tabla de Prusament, da 90 °C y 6 h para su PA11 Carbon Fiber.',
    },
    {
      id: 'ams2pro-tpu',
      accion: 'Seca el carrete en el AMS 2 Pro',
      valor: '65 °C · 12 h',
      cuando: { material: 'tpu', dispositivo: 'ams2pro' },
      porque:
        'El TPU aparece en la tabla del AMS 2 Pro con 65 °C y 12 horas, y las tres variantes de TPU de Bambu repiten la misma cifra.',
      fuente: 'Bambu Lab',
      alcance:
        'La propia tabla avisa en esa celda: el AMS 2 Pro puede no secar bien el TPU y remite a la cama o al AMS HT. Publicar 65 °C sin esa salvedad es falso.',
    },
    {
      id: 'amsht-tpu',
      accion: 'Seca el carrete en el AMS HT',
      valor: '75 °C · 18 h',
      cuando: { material: 'tpu', dispositivo: 'amsht' },
      porque:
        'El AMS HT da 75 °C y 18 horas para el TPU, frente a los 12 h del AMS 2 Pro. Es el único caso del lote en que el mismo aparato da menos tiempo para el mismo material.',
      fuente: 'Bambu Lab',
      alcance:
        'Prusa da 60 °C y 4–6 h para su TPU, sin método asignado. Son dos cifras de dos casas con métodos no declarados por una de las partes: no se promedian.',
    },
    {
      id: 'horno-abs-pc',
      accion: 'Seca el carrete en el horno de convección',
      valor: '75–85 °C · 8 h',
      cuando: { material: ['abs', 'pc'], dispositivo: 'horno' },
      porque:
        'ABS y ASA comparten fila en la tabla de Bambu y el PC tiene fila propia: las dos dan 75–85 °C y 8 h en el horno de convección. El AMS HT da 80 °C y la cama 90–100 °C: el horno se queda en medio.',
      fuente: 'Bambu Lab',
      alcance:
        'La fila «ABS, ASA» de la tabla de Bambu; el PC tiene fila propia con las mismas cifras. Las variantes ASA-CF, ABS-GF y ASA Aero dan **80 °C** en el horno, no 75–85 °C.',
    },
    {
      id: 'horno-pa',
      accion: 'Seca el carrete en el horno de convección',
      valor: '75–85 °C · 8–12 h',
      cuando: { material: 'pa', dispositivo: 'horno' },
      porque:
        'La poliamida con fibra de Bambu da 75–85 °C en el horno, en 8 a 12 horas. Es el método que la casa descarta para el PA que lleva meses abierto: a los 3 meses un horno a 80–90 °C puede no bastar.',
      fuente: 'Bambu Lab',
      alcance:
        'Son las cifras de la poliamida **con fibra**; para el PA sin refuerzo no hay parámetros publicados. Prusa da 90 °C y 6 h para su PA11 Carbon Fiber, sin método asignado.',
    },
    {
      id: 'horno-tpu',
      accion: 'Seca el carrete en el horno de convección',
      valor: '70 °C · 8 h',
      cuando: { material: 'tpu', dispositivo: 'horno' },
      porque:
        'Las tres variantes de TPU de la tabla de Bambu dan 70 °C y 8 horas en el horno de convección forzada, y las tres marcan el secado como obligatorio.',
      fuente: 'Bambu Lab',
      alcance:
        'Prusa da 60 °C y 4–6 h para su TPU, sin método asignado: son cifras de dos casas y no se promedian.',
    },
    {
      id: 'cama-abs-pc-pa',
      accion: 'Seca el carrete en la cama',
      valor: '90–100 °C · 12 h',
      cuando: { material: ['abs', 'pc', 'pa'], dispositivo: 'cama' },
      porque:
        'ABS y ASA comparten fila en Bambu, y el PC y la poliamida con fibra tienen filas propias: las cuatro dan 90–100 °C y 12 h en la cama. Es la más alta del lote y la que más pone a prueba al carrete.',
      fuente: 'Bambu Lab',
      alcance:
        'Cama al servicio del secado, no cama de impresión. A 90–100 °C el carrete negro viejo de Prusa no aguanta: su límite son 45 °C, y el gris nuevo llega a 150 °C. Las cifras de la poliamida son las de la poliamida **con fibra**: para el PA sin refuerzo ninguna fuente da parámetros.',
    },
    {
      id: 'cama-tpu',
      accion: 'Seca el carrete en la cama',
      valor: '80–90 °C · 12 h',
      cuando: { material: 'tpu', dispositivo: 'cama' },
      porque:
        'El TPU 95A HF y el TPU para AMS dan 80–90 °C durante 12 horas en la cama usada como secador. Bambu los marca como material que requiere secado y desecante.',
      fuente: 'Bambu Lab',
      alcance:
        'El TPU 85A y el 90A tienen su propia fila: 90 °C y 16 h. Cama al servicio del secado, nunca temperatura de cama de impresión.',
    },
    {
      id: 'sin-aparato',
      accion: 'Seca en un deshidratador de comida o en una caja secadora',
      cuando: { dispositivo: 'ninguno' },
      porque:
        'Prusa describe los dos aparatos: lo único que hay que comprobar es que su temperatura case con la del filamento, porque los deshidratadores son de baja temperatura. **Ninguna fuente les da cifras.**',
      fuente: 'Prusa Research',
      alcance:
        'Sin método asignado no hay cifra que publicar. Los 55 °C y 6 h de Prusa para el PETG son de su tabla de Prusament, no del deshidratador, y el horno de cocina no es equivalente al horno de convección.',
    },
    {
      id: 'guardar-sellado',
      accion: 'Guarda el carrete en un recipiente sellado, con desecante',
      valor: '20 % RH · 2–7 días · 55 % RH · 2–12 h',
      porque:
        'Secar y guardar son la mitad del trabajo: el filamento seco aguanta un tiempo limitado, que lo fija la humedad del sitio, no el material. Prusa pide espacio cerrado o bolsa al vacío, con desecante.',
      fuente: 'Bambu Lab, Prusa Research',
      alcance:
        'El 20 % RH es una condición del entorno de guardado, no una medida del filamento: ninguna fuente dice cuánto agua lleva un filamento seco. Las cuatro cifras son de Bambu; Prusa publica el procedimiento y ninguna cifra. Para los materiales que la tabla de Bambu marca con desecante requerido —TPU, PC, PVA, los reforzados con fibra y las poliamidas— la fuente pide además una caja estanca o un dry box, y Prusa pide lo mismo para su PA11 Carbon Fiber entre impresiones. La regla no se condiciona a un material porque el procedimiento es el mismo en todos los casos.',
    },
    {
      id: 'carrete-limite',
      accion: 'Comprueba el límite de temperatura de tu carrete antes de calentarlo',
      valor: '45 · 90 · 150 °C',
      porque:
        'Los límites son del carrete, no del filamento: el negro viejo llega a 45 °C; al enfriar, el plástico se encoge, el cartón se queda expandido y el carrete queda flojo. Alternativa: un tornillo M4×65.',
      fuente: 'Prusa Research',
      alcance:
        'Cuatro límites distintos: negro viejo 45 °C, gris viejo 90 °C, negro nuevo 90 °C y gris nuevo 150 °C. El color no basta para saber cuál tienes, y por eso la regla no se puede condicionar a una variable.',
    },
    {
      id: 'no-exceder',
      accion: 'No pases de la temperatura de la tabla ni alargues el tiempo',
      porque:
        'Prusa avisa de las dos cosas: no exceder la temperatura al secar, o el filamento se ablanda y se pega, y atenerse a los tiempos recomendados para evitar el secado excesivo.',
      fuente: 'Prusa Research',
      alcance:
        'Advertencia general de Prusa para cualquier filamento y cualquier método, y por eso no se puede condicionar a un material ni a un aparato concreto. Ninguna fuente de este lote describe cómo se ve un filamento secado de más.',
    },
    {
      id: 'otro-carrete',
      accion: 'Prueba con otro carrete antes de secar',
      cuando: { sintoma: 'hilos' },
      porque:
        'Es la prueba de Prusa: si con otro carrete los hilos desaparecen, el viejo es el culpable. El mecanismo del PETG húmedo lo explica: el agua del filamento se expande en la boquilla y sale a chorros.',
      fuente: 'Prusa Research',
      alcance:
        'La humedad es una causa de hilos entre varias: Bambu la lista la primera en su apartado de hilos y Prusa casi la última, porque cada página ordena según lo que viene a arreglar. Ninguna de las dos dice que sea la causa más frecuente.',
    },
    {
      id: 'huecos-flujo',
      accion: 'Ajusta el flujo: esto no es humedad',
      cuando: { sintoma: 'huecos' },
      porque:
        'Las tres causas que da la página de subextrusión son resistencia a la extrusión, volumen insuficiente y PA mal ajustado. **La humedad no está en ninguna**, así que secar el carrete no cambia nada.',
      fuente: 'Bambu Lab',
      alcance:
        'El ajuste del flujo y el ratio de extrusión están en la guía de flujo. Aquí sólo se descarta la humedad como causa, que es lo que la fuente permite decir.',
    },
    {
      id: 'boquilla-petg',
      accion: 'Si tras secar la boquilla sigue pegajosa, comprueba si está gastada',
      cuando: { material: 'petg', sintoma: 'goteo' },
      porque:
        'Bambu da el orden completo para el PETG húmedo: secar el carrete y, si el problema sigue, comprobar si la boquilla está gastada y cambiarla; y si no lo está, bajar el ratio de flujo.',
      fuente: 'Bambu Lab',
      alcance:
        'El ratio de flujo y sus cifras son de la guía de flujo y no se repiten aquí: lo que se conserva es el orden, que es lo que hace falta para decidir.',
    },
  ],

  fueraDeAlcance: [
    {
      sintoma: 'Qué material elegir y para qué',
      porQue:
        'La elección del filamento y su matriz es otro tema, con su propia guía. Lo que aquí se publica son los parámetros de secado de cada familia, no cuál te conviene.',
      guia: 'material',
    },
    {
      sintoma: 'La retracción y los hilos',
      porQue:
        'Los hilos tienen más causas que la humedad —retracción, distancia de viaje, temperatura de boquilla, boquilla gastada— y la retracción se calibra en su propia guía.',
      guia: 'stringing',
    },
    {
      sintoma: 'El flujo y la subextrusión',
      porQue:
        'Las líneas finas y los huecos no son de humedad: la fuente no incluye la humedad entre las causas de la subextrusión. Ajustar el ratio es otro diagnóstico.',
      guia: 'flow-rate',
    },
    {
      sintoma: 'La temperatura de boquilla',
      porQue:
        'La temperatura de impresión no es la de secado, y son dos números distintos con dos fuentes distintas. Las cifras de boquilla están en su guía.',
      guia: 'temperatura-hotend',
    },
    {
      sintoma: 'La temperatura de cama',
      porQue:
        'Las cifras de esta guía son de secado, incluso las de la columna de cama: son la cama puesta al servicio del secador. Las temperaturas de cama de impresión están en la otra guía.',
      guia: 'temperatura-cama',
    },
    {
      sintoma: 'Las esquinas levantadas',
      porQue:
        'Ninguna fuente de este lote relaciona la humedad con el warping: la sección de warping no la cuenta entre sus causas. El diagnóstico del warping tiene su propia guía.',
      guia: 'warping-pla',
    },
  ],

  fuentes: [
    {
      url: 'https://wiki.bambulab.com/en/filament-acc/filament/dry-filament',
      quien: 'Bambu Lab',
      que: 'Secado de filamento: la matriz de material, método, temperatura y tiempo, el techo de cada aparato y el protocolo del horno y de la cama.',
    },
    {
      url: 'https://wiki.bambulab.com/en/knowledge-sharing/common-print-quality-problem',
      quien: 'Bambu Lab',
      que: 'Diagnóstico de calidad: hilos, goteo, boquilla pegajosa y subextrusión, con el orden de causas de cada una.',
    },
    {
      url: 'https://wiki.bambulab.com/en/filament-acc/acc/sealed-box',
      quien: 'Bambu Lab',
      que: 'La caja estanca: el 20 % RH de almacenamiento, el termohigrómetro, el desecante y la alimentación de materiales no compatibles con el AMS.',
    },
    {
      url: 'https://help.prusa3d.com/article/drying-filament_332086',
      quien: 'Prusa Research',
      que: 'Qué materiales se secan, la tabla de temperaturas y tiempos de los Prusament y los cuatro límites de carrete.',
    },
    {
      url: 'https://help.prusa3d.com/article/stringing-and-oozing_1805',
      quien: 'Prusa Research',
      que: 'Hilos y goteo: la lista completa de causas y la prueba de cambiar de carrete para saber si el filamento es el culpable.',
    },
    {
      url: 'https://help.prusa3d.com/article/drying-filament-in-memmert-uf-series-universal-oven_913458',
      quien: 'Prusa Research',
      que: 'El procedimiento del horno de laboratorio: carga, compuerta de extracción, temporizador y carretes sin su embalaje original.',
    },
  ],

  /*
   * Esta guía **lee** el material del archivo y no **explica** ningún campo del
   * panel: el material ya tiene dueño, que es la guía `material`. Por eso el
   * campo del panel va vacío y el material va en `leeDelAnalisis`, igual que en
   * `adhesion-primera-capa` y en `flow-rate`.
   */
  campos: [],
  leeDelAnalisis: ['material'],
};
