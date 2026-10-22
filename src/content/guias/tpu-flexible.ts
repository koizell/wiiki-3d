import type { Guia } from './tipos.ts';
import { AUTOR } from './autor.ts';

/**
 * TPU flexible.
 *
 * La guía cuyo eje no es un ajuste, sino un **requisito de máquina**.
 *
 * ## Por qué esta guía no es una tabla de temperaturas
 *
 * El TPU no es un material con otros números: es un material con otras
 * exigencias. Lo que decide si tu impresora puede con él no es la temperatura
 * de la boquilla, sino el engranaje que muerde el filamento, el camino que
 * recorre hasta el cabezal, la boquilla que llevas montada y el aparato que le
 * alimenta. Por eso las variables son **máquina**, **variante de TPU**, **AMS** y
 * **síntoma**, y por eso las cifras van siempre con su alcance.
 *
 * ## El umbral de 85A, y por qué no es una regla general
 *
 * Por debajo de 85A los engranajes del extrusor no muerden el filamento. Eso
 * lo dice Bambu, de sus impresoras: «Bambu Lab printers do not currently
 * support printing with TPU filaments rated below 85A hardness». **Prusa no
 * enuncia ningún umbral de dureza**: su regla es cualitativa —cuanto más
 * blando, más difícil de imprimir— y su TPU es un 95A. Por eso en esta guía no
 * se escribe que por debajo de 85A ninguna impresora puede con TPU. El 85A es
 * un umbral de engranaje de una casa, y se publica como tal.
 *
 * ## El AMS: el límite es del aparato, y el matiz tiene tres partes
 *
 * La fila «TPU» de la tabla de materiales dice «Not Compatible» **para el AMS y
 * el AMS lite**, y no menciona el AMS HT en ninguna fila: no lo contradice, no
 * habla de él. La guía de TPU dice que el AMS HT sí admite TPU pero que
 * «functions solely as a sealed enclosure», y dos párrafos más abajo que el
 * filamento «TPU for AMS» alimenta por el canal normal de todos los AMS. Las
 * tres cosas se publican, con su fuente: la incompatibilidad por dispositivo,
 * el AMS HT como cámara sin función de alimentación, y la excepción de
 * producto. Lo que no se escribe es «el AMS no puede con TPU».
 *
 * ## El hueco de bowden, declarado y no rellenado
 *
 * Ninguna de las siete fuentes de este lote menciona un extrusor bowden ni una
 * máquina de filamento remoto. **No hay respaldo**, y la guía lo dice. Lo que sí
 * hay son cuatro mecanismos concretos —el recorrido del camino de filamento, el
 * 85A que no carga por el PTFE, la resistencia del tubo y la fricción con el
 * 90A— que se publican **como mecanismos**, nunca convertidos en una regla de
 * bowden.
 *
 * ## Las cifras de temperatura no se funden
 *
 * Hay 225 °C, 200–250 °C, 220–240 °C y 230–245 °C, y cada una tiene su
 * filamento, su máquina y su alcance: no son cuatro formas de decir lo
 * mismo. Se publican por separado. El 250 °C de Bambu es del **proceso de
 * carga**, no de impresión.
 *
 * ## Las citas y los asteriscos del crudo
 *
 * Tres citas de tarjeta no se pueden copiar enteras del crudo, porque la
 * captura lleva la negrita de Markdown **en medio** de la frase: «its **shore
 * hardness**», «by 5 °C**, this will…», «to **turn the retractions off**
 * completely». Es la convención del crudo, no un defecto: las dos mitades de
 * cada una sí son literales y se buscan por separado. Por eso la cita se
 * escribe sin los asteriscos —la página los interpretaría como negrita— y
 * el texto que va entrecomillado es el de la fuente, no el de su formato.
 *
 * ## El panel
 *
 * Esta guía **no** entra en `CAMPOS_WIKI`: el campo `material` ya tiene dueño,
 * que es la guía `material`. Lo que hace es lo mismo que `secar-filamento`: su
 * variable `material` declara `leeDelAnalisis: ['material']` y
 * `campos: ['material']`, así que la barra «Tu archivo» enseña el material del
 * G-code y lo lleva a la casilla donde se declara.
 */
export const tpuFlexible: Guia = {
  slug: 'tpu-flexible',
  titulo: 'TPU flexible',
  resumen:
    'El TPU no es un material con otros números: es un material con otras exigencias.',
  resumenExtra:
    'Qué máquina puede con qué variante, qué hay que cambiar en el equipo y qué no se sabe todavía.',
  sintoma: '¿Mi impresora puede con TPU?',
  dibujo: 'hotend',
  entrada:
    'El TPU no es un material con otros números: es un material con otras exigencias. Lo que decide si tu máquina puede con él no es la temperatura, sino el engranaje que muerde el filamento, el camino que recorre hasta el cabezal, la boquilla que llevas montada y el aparato que le alimenta. Por debajo de 85A los engranajes de una Bambu no muerden; un AMS no deja pasar un TPU corriente por su canal; y de las máquinas de husillo no hay ni una fuente en este tema.',
  autor: AUTOR,
  actualizado: '2026-10-19',
  minutos: 7,

  /*
   * El diferencial separa tres cosas que se confunden: el material blando, la
   * máquina que no puede con él y el ajuste.
   *
   * La primera comprobación es la que más valor tiene, porque el ruido de
   * extrusor tiene un dueño —el engranaje— y ese dueño decide la máquina, no
   * el perfil. La tercera es la del AMS, y su «sí» tiene que llevar el matiz
   * entero: es una limitación del aparato, no del filamento.
   *
   * Y la salida `siNo` va al secado, porque el TPU es muy higroscópico y la
   * humedad es la causa que más se confunde con el resto.
   */
  diferencial: {
    contra:
      'un TPU que sale mal porque es blando contra una máquina que no puede con ese filamento',
    contraCorto: 'un ajuste mal puesto',
    comprobaciones: [
      {
        id: 'ruido-extrusor',
        mira: '¿El extrusor hace un ruido que antes no hacía, o el filamento se dobla y se enreda?',
        si: 'Sí: eso es el engranaje apretando de más o sin morder el filamento. Es el primer síntoma del material flexible, y lo que decide no es el perfil sino la máquina que lo alimenta.',
        no: 'No: entonces el ruido de extrusor no es la causa, y lo que falla tiene otro dueño. Mira la boquilla antes de tocar ningún ajuste.',
      },
      {
        id: 'capas-saltadas',
        mira: '¿Lo que sale son capas saltadas o huecos entre capas, como si la boquilla no dejara salir material?',
        si: 'Sí: Prusa lo dice de otra manera —una capa saltada es una boquilla que se tapó a media impresión—, y no es un problema de adhesión entre capas ni de humedad.',
        no: 'No: si lo que hay son hilos o goteo, el diagnóstico es de otro sitio y el camino de alimentación no es lo que falla.',
      },
      {
        id: 'ams',
        mira: '¿El filamento entra por un AMS, un AMS lite o un AMS 2 Pro?',
        si: 'Sí: eso es un límite del aparato, no del filamento. La tabla de materiales de Bambu marca la fila TPU como no compatible en la columna del AMS y el AMS lite, y el AMS HT es un caso aparte.',
        no: 'No: sin AMS, el límite es el engranaje de tu extrusor y el camino del filamento hasta el cabezal, y la dureza del TPU decide si ese engranaje lo muerde.',
      },
    ],
    siNo: { guia: 'secar-filamento', etiqueta: 'Secar filamento' },
  },

  variables: [
    {
      id: 'maquina',
      etiqueta: 'Máquina',
      indicador: 'maquina',
      para: 'Las reglas no son las mismas en las dos casas del corpus: el umbral de 85A es de las Bambu, el aflojado del idler es de Prusa, y ninguna fuente nombra una marca que no sea una de las dos.',
      necesaria: true,
      opciones: [
        { id: 'bambu', etiqueta: 'Bambu Lab', detalle: 'H2, X1, P, A1, A2L' },
        { id: 'prusa', etiqueta: 'Prusa', detalle: 'MK4, XL, CORE One, HT90' },
        { id: 'otra', etiqueta: 'Otra marca o modelo', detalle: 'El corpus sólo cubre dos casas' },
      ],
    },
    {
      id: 'material',
      etiqueta: 'Filamento',
      indicador: 'material',
      para: 'La dureza decide qué máquina lo muerde y qué boquilla admite: el 85A es un umbral de engranaje en las Bambu, y el 90A y el 95A se pueden alimentar por el camino de siempre —el 90A por el tubo PTFE y el 95A aflojando el idler—, que es lo que los separa del 85A.',
      necesaria: true,
      /*
       * `campos: ['material']` aquí y `campos: []` en la guía entera.
       *
       * No es una contradicción: el campo del panel que esta guía **explica** es
       * ninguno —el material ya tiene dueño, la guía `material`— y el que
       * **lee** es el material. La barra «Tu archivo» sólo pinta lo que la guía
       * declara, así que aquí enseña el material del G-code y lo lleva a la
       * casilla donde se declara. Es el mismo mecanismo que `secar-filamento`.
       */
      campos: ['material'],
      opciones: [
        { id: 'tpu', etiqueta: 'TPU sin dureza conocida', detalle: 'El G-code sólo dice TPU' },
        { id: '85a', etiqueta: 'TPU 85A', detalle: 'El más blando que admite una Bambu' },
        { id: '90a', etiqueta: 'TPU 90A', detalle: 'Más duro que el 85A' },
        { id: '95a', etiqueta: 'TPU 95A', detalle: 'Prusament; el 95A HF no tiene guía' },
        { id: 'tpu-ams', etiqueta: 'TPU for AMS', detalle: 'El que sí alimenta por el canal' },
      ],
    },
    {
      id: 'ams',
      etiqueta: 'AMS',
      indicador: 'maquina',
      para: 'Cada AMS es un aparato distinto: el AMS y el AMS lite no dejan pasar un TPU blando, y el AMS HT admite el material pero no lo alimenta por su canal normal.',
      opciones: [
        { id: 'ams', etiqueta: 'AMS, AMS lite o AMS 2 Pro', detalle: 'No pasan un TPU blando' },
        { id: 'amsht', etiqueta: 'AMS HT', detalle: 'Cámara estanca, no alimentador' },
        { id: 'ninguno', etiqueta: 'Sin AMS', detalle: 'El filamento va a mano' },
      ],
    },
    {
      id: 'sintoma',
      etiqueta: '¿Qué se ve?',
      indicador: 'general',
      para: 'El síntoma separa lo que es el engranaje de lo que es la boquilla y de lo que es la retracción: cada uno tiene su remedio y no son el mismo.',
      opciones: [
        { id: 'ruido', etiqueta: 'Ruido de extrusor', detalle: 'El engranaje aprieta o no muerde' },
        { id: 'atasco', etiqueta: 'Atasco al alimentar', detalle: 'No entra, o se atasca al entrar' },
        { id: 'capas', etiqueta: 'Capas saltadas', detalle: 'La boquilla no deja salir material' },
        { id: 'hilos', etiqueta: 'Hilos finos', detalle: 'Telarañas entre piezas' },
        { id: 'goteo', etiqueta: 'Goteo o boquilla pegajosa', detalle: 'Sale material de más' },
        { id: 'nada', etiqueta: 'Nada raro todavía', detalle: 'Quiero la configuración' },
      ],
    },
  ],

  conocimiento: [
    {
      id: 'que-es-tpu',
      titulo: 'TPU es un uretano, y su cifra es la Shore',
      puntos: [
        'El TPU es el termoplástico de uretano: un filamento muy elástico que se estira y vuelve a su forma original.',
        'Su dureza se mide con la escala Shore, y el número va con la letra detrás: **Shore A** es la escala blanda, **Shore D** la dura.',
        'Y un número más alto significa material más duro y menos flexible.',
        'El TPU es además un subtipo de TPE, y la diferencia entre los dos es exactamente la dureza.',
      ],
      indicador: 'material',
      cuerpo:
        'El TPU es el termoplástico de uretano: un filamento muy elástico que se estira y vuelve a su forma original. Su dureza se mide con la escala Shore, y el número va con la letra detrás: **Shore A** es la escala blanda, **Shore D** la dura, y un número más alto significa material más duro y menos flexible. El TPU es además un subtipo de TPE, y la diferencia entre los dos es exactamente la dureza.',
      cifra: {
        valor: '95A · 90A · 85A',
        nota: 'Shore A: un número más alto es material más duro y menos flexible',
      },
      cita: {
        texto: 'the main difference between TPU and TPE is its shore hardness',
        fuente: 'Prusa Research',
      },
    },
    {
      id: 'umbral-85a',
      titulo: 'El 85A es un umbral de engranaje, no de gusto',
      puntos: [
        'Por debajo de 85A los engranajes del extrusor **no muerden** el filamento, y el resultado no es una impresión mala.',
        'Es que la máquina no lo alimenta. Bambu lo enuncia sin rodeos para sus impresoras, y su página de diagnóstico añade el mecanismo.',
        'Un filamento demasiado blando no queda bien agarrado por los engranajes y la extrusión falla.',
        'El alcance importa: **Prusa no publica ningún umbral de dureza**, su regla es cualitativa —cuanto más blando.',
        'Más difícil de imprimir— y su TPU es un 95A, así que aquí no se escribe que por debajo de 85A ninguna impresora pueda con TPU.',
      ],
      indicador: 'maquina',
      cuerpo:
        'Por debajo de 85A los engranajes del extrusor **no muerden** el filamento, y el resultado no es una impresión mala: es que la máquina no lo alimenta. Bambu lo enuncia sin rodeos para sus impresoras, y su página de diagnóstico añade el mecanismo: un filamento demasiado blando no queda bien agarrado por los engranajes y la extrusión falla. El alcance importa: **Prusa no publica ningún umbral de dureza**, su regla es cualitativa —cuanto más blando, más difícil de imprimir— y su TPU es un 95A, así que aquí no se escribe que por debajo de 85A ninguna impresora pueda con TPU.',
      cifra: {
        valor: '85A',
        nota: 'umbral de las impresoras Bambu: por debajo, sus engranajes no muerden el filamento',
      },
      cita: {
        texto:
          'Bambu Lab printers do not currently support printing with TPU filaments rated below 85A hardness.',
        fuente: 'Bambu Lab',
      },
    },
    {
      id: 'variantes',
      titulo: 'Cuatro variantes que no son cuatro nombres',
      puntos: [
        'La tabla de la guía general de Bambu cruza cuatro variantes con tres grupos de impresoras: el 85A, el 90A, el 95A HF y el "TPU for AMS".',
        'La única incompatibilidad explícita es la **A1 con el 85A**; todo lo demás sale compatible, y la A2L admite el 85A.',
        'El 95A HF, en cambio, no tiene guía propia en este corpus: sólo aparece en las tablas, sin procedimiento de carga ni de ajustes.',
      ],
      indicador: 'maquina',
      cuerpo:
        'La tabla de la guía general de Bambu cruza cuatro variantes con tres grupos de impresoras: el 85A, el 90A, el 95A HF y el «TPU for AMS». La única incompatibilidad explícita es la **A1 con el 85A**; todo lo demás sale compatible, y la A2L admite el 85A. El 95A HF, en cambio, no tiene guía propia en este corpus: sólo aparece en las tablas, sin procedimiento de carga ni de ajustes.',
    },
    {
      id: 'boquilla-04',
      titulo: 'El 0,4 mm con el 85A: dos fuentes y dos respuestas',
      puntos: [
        'La tabla general de materiales de Bambu marca el 0,4 mm como **Compatible** en la fila del 85A.',
        'La guía de TPU dice lo contrario, y en texto: "85A TPU filaments cannot be printed with 0.4mm nozzles".',
        'Con el 0,2 y el 0,4 en la columna de no compatibles; la guía de la serie P repite esa fila.',
        'El corpus no explica la discrepancia, así que se publican las dos: **la fuente que habla del 85A es la que dice que no**.',
        'Y el 0,2 además difiere en grado —"Not Recommended" en la tabla, "Not compatible" en la guía.',
      ],
      indicador: 'material',
      cuerpo:
        'La tabla general de materiales de Bambu marca el 0,4 mm como **Compatible** en la fila del 85A. La guía de TPU dice lo contrario, y en texto: «85A TPU filaments cannot be printed with 0.4mm nozzles», con el 0,2 y el 0,4 en la columna de no compatibles; la guía de la serie P repite esa fila. El corpus no explica la discrepancia, así que se publican las dos: **la fuente que habla del 85A es la que dice que no**, y el 0,2 además difiere en grado —«Not Recommended» en la tabla, «Not compatible» en la guía.',
      cuando: { material: '85a' },
      cifra: {
        valor: '0,4 mm',
        nota: 'el 85A no se imprime con 0,4 mm según la guía de TPU; la tabla general lo marca compatible',
      },
      cita: {
        texto: '85A TPU filaments cannot be printed with 0.4mm nozzles.',
        fuente: 'Bambu Lab',
      },
    },
    {
      id: 'mecanismos-camino',
      titulo: 'El problema del TPU es el camino, no el ajuste',
      puntos: [
        'El TPU es blando, y un filamento blando se dobla, se engancha y opone resistencia en cuanto tiene que recorrer un camino.',
        'Cuatro casos del corpus lo ilustran, y ninguno es una regla general.',
        'La XL de Prusa tiene "a long path from the loading to the extruder nozzle"; el 85A de Bambu **no se puede cargar por el tubo PTFE**.',
        'La resistencia del tubo PTFE por abolladuras o polvo atasca la alimentación.',
        'Y con el 90A hay que colocar la pieza al frente de la cama "to reduce friction between the filament and the PTFE tube".',
      ],
      indicador: 'cama',
      cuerpo:
        'El TPU es blando, y un filamento blando se dobla, se engancha y opone resistencia en cuanto tiene que recorrer un camino. Cuatro casos del corpus lo ilustran, y ninguno es una regla general: la XL de Prusa tiene «a long path from the loading to the extruder nozzle»; el 85A de Bambu **no se puede cargar por el tubo PTFE**; la resistencia del tubo PTFE por abolladuras o polvo atasca la alimentación; y con el 90A hay que colocar la pieza al frente de la cama «to reduce friction between the filament and the PTFE tube».',
      cita: {
        texto:
          'Due to its softness, Flexible filaments need special attention when being loaded in this printer',
        fuente: 'Prusa Research',
      },
    },
    {
      id: 'hueco-corpus',
      titulo: 'Tu máquina no está en el corpus',
      cuando: { maquina: 'otra' },
      puntos: [
        'Ninguna de las siete fuentes de este tema nombra una marca que no sea Bambu o Prusa.',
        'Y **ninguna menciona un extrusor bowden** ni una máquina de filamento remoto.',
        'Si tu impresora es de husillo, aquí no hay respuesta: ni a favor ni en contra, y no se puede deducir de los casos de Bambu y Prusa.',
        'Lo que sí puedes aplicar es lo general del material flexible —imprimir despacio.',
        'Cuidar el ventilador y vigilar la sequedad— y lo que diga el fabricante de tu filamento.',
      ],
      indicador: 'ventilacion',
      cuerpo:
        'Ninguna de las siete fuentes de este tema nombra una marca que no sea Bambu o Prusa, y **ninguna menciona un extrusor bowden** ni una máquina de filamento remoto. Si tu impresora es de husillo, aquí no hay respuesta: ni a favor ni en contra, y no se puede deducir de los casos de Bambu y Prusa. Lo que sí puedes aplicar es lo general del material flexible —imprimir despacio, cuidar el ventilador y vigilar la sequedad— y lo que diga el fabricante de tu filamento.',
    },
    {
      id: 'ams-mecanismo',
      titulo: 'El AMS y el AMS lite no pasan un TPU blando',
      cuando: { maquina: 'bambu' },
      puntos: [
        'La fila "TPU" de la tabla de materiales marca **Not Compatible** en la columna de AMS y AMS lite.',
        'Y la razón está en la misma tabla: un filamento demasiado blando "cannot pass smoothly through the AMS / AMS lite channel".',
        'La diferencia entre los dos aparatos es de mecanismo: el AMS tiene un engranaje de transmisión que el AMS lite no tiene.',
        'Y por eso puede con algunos filamentos blandos o rugosos.',
        'Es una limitación del aparato, no del TPU.',
      ],
      indicador: 'cama',
      cuerpo:
        'La fila «TPU» de la tabla de materiales marca **Not Compatible** en la columna de AMS y AMS lite, y la razón está en la misma tabla: un filamento demasiado blando «cannot pass smoothly through the AMS / AMS lite channel». La diferencia entre los dos aparatos es de mecanismo: el AMS tiene un engranaje de transmisión que el AMS lite no tiene, y por eso puede con algunos filamentos blandos o rugosos. Es una limitación del aparato, no del TPU.',
      cita: {
        texto:
          'Too soft (e.g., TPU 95A/85A/83A/80A…): These cannot pass smoothly through the AMS / AMS lite channel',
        fuente: 'Bambu Lab',
      },
    },
    {
      id: 'ams-ht-tarjeta',
      titulo: 'El AMS HT: cámara estanca, no alimentador',
      cuando: { maquina: 'bambu', ams: 'amsht' },
      puntos: [
        'El AMS HT es el único AMS que admite TPU, y su función se reduce a una: **funciona sólo como cámara sellada**.',
        'Y su salida estándar y la alimentación automática no se pueden usar.',
        'El filamento entra por la salida TPU dedicada, en la parte de atrás.',
        'Y un matiz que importa: la tabla de materiales **no menciona el AMS HT en ninguna fila**.',
        'Así que no lo contradice —simplemente no habla de él.',
      ],
      indicador: 'material',
      cuerpo:
        'El AMS HT es el único AMS que admite TPU, y su función se reduce a una: **funciona sólo como cámara sellada**, y su salida estándar y la alimentación automática no se pueden usar. El filamento entra por la salida TPU dedicada, en la parte de atrás. Y un matiz que importa: la tabla de materiales **no menciona el AMS HT en ninguna fila**, así que no lo contradice —simplemente no habla de él.',
      cita: {
        texto:
          'the AMS HT functions solely as a sealed enclosure — its standard outlet and automatic feeding functionality cannot be used',
        fuente: 'Bambu Lab',
      },
    },
    {
      id: 'tpu-ams-producto',
      titulo: 'El «TPU for AMS» es otro filamento',
      cuando: { material: 'tpu-ams' },
      puntos: [
        'La guía de Bambu tiene una excepción de producto.',
        '"TPU for AMS filament is compatible with the standard feeding functionality of all AMS series models".',
        'Eso es lo que hace legible la contradicción interna de la misma página.',
        'Que a la vez dice que el AMS, el AMS lite y el AMS 2 Pro no son compatibles con TPU.',
        'Las dos frases sólo conviven si "TPU for AMS" es un filamento distinto del TPU corriente, que es lo que dice el nombre.',
        'Lo que **no** se escribe es que el 85A de la gama normal sea inyectable en el AMS.',
      ],
      indicador: 'material',
      cuerpo:
        'La guía de Bambu tiene una excepción de producto: «TPU for AMS filament is compatible with the standard feeding functionality of all AMS series models». Eso es lo que hace legible la contradicción interna de la misma página, que a la vez dice que el AMS, el AMS lite y el AMS 2 Pro no son compatibles con TPU: las dos frases sólo conviven si «TPU for AMS» es un filamento distinto del TPU corriente, que es lo que dice el nombre. Lo que **no** se escribe es que el 85A de la gama normal sea inyectable en el AMS.',
      cita: {
        texto:
          'TPU for AMS filament is compatible with the standard feeding functionality of all AMS series models for loading and printing.',
        fuente: 'Bambu Lab',
      },
    },
    {
      id: 'boquilla-bambu',
      titulo: 'La boquilla en Bambu: dos cifras y una pieza de desgaste',
      cuando: { maquina: 'bambu' },
      puntos: [
        'La tabla de materiales da **200–250 °C** para las cuatro filas de TPU.',
        'Con una tolerancia de ±10 °C, y las guías de serie eligen **225 °C** como temperatura de impresión recomendada.',
        'El 225 °C es un punto dentro del rango de la tabla, y las dos cifras tienen el alcance del filamento de Bambu en una Bambu.',
        'Así que no se llevan a otra máquina.',
        'La boquilla, además, es una pieza de desgaste: la serie A recomienda "a new hotend or a dedicated hotend for printing TPU".',
        'Y la guía general avisa de que "Nozzle history matters" y pide cold pull previo.',
      ],
      indicador: 'maquina',
      cuerpo:
        'La tabla de materiales da **200–250 °C** para las cuatro filas de TPU, con una tolerancia de ±10 °C, y las guías de serie eligen **225 °C** como temperatura de impresión recomendada: el 225 °C es un punto dentro del rango de la tabla, y las dos cifras tienen el alcance del filamento de Bambu en una Bambu, así que no se llevan a otra máquina. La boquilla, además, es una pieza de desgaste: la serie A recomienda «a new hotend or a dedicated hotend for printing TPU», y la guía general avisa de que «Nozzle history matters» y pide cold pull previo.',
      cifra: {
        valor: '225 · 200–250 °C',
        nota: 'la temperatura que recomiendan las guías de serie de Bambu · el rango de la tabla de materiales (±10 °C)',
      },
      cita: {
        texto: 'The recommended printing temperature for TPU 85A & 90A is 225°C',
        fuente: 'Bambu Lab',
      },
    },
    {
      id: 'boquilla-prusa',
      titulo: 'La boquilla en Prusa: dos rangos y dos alcances',
      cuando: { maquina: 'prusa' },
      puntos: [
        'Prusa publica **220–240 °C** para su Prusament TPU 95A.',
        'Que es un filamento concreto, y **230–245 °C** para el material flexible en general, con la coletilla "Depending on hardness and brand".',
        'Los dos rangos se solapan y no se promedian: uno describe una marca y una dureza, el otro describe la familia.',
        'Y la regla de ajuste es relativa, no una cifra, "subir 5 °C" respecto al ajuste previo.',
        'Con la boquilla de alto flujo dentro de una cámara, Prusa pide dejar la puerta abierta: es un caso de máquina, no de material.',
      ],
      indicador: 'maquina',
      cuerpo:
        'Prusa publica **220–240 °C** para su Prusament TPU 95A, que es un filamento concreto, y **230–245 °C** para el material flexible en general, con la coletilla «Depending on hardness and brand». Los dos rangos se solapan y no se promedian: uno describe una marca y una dureza, el otro describe la familia; y la regla de ajuste es relativa, no una cifra, «subir 5 °C» respecto al ajuste previo. Con la boquilla de alto flujo dentro de una cámara, Prusa pide dejar la puerta abierta: es un caso de máquina, no de material.',
      cifra: {
        valor: '220–240 · 230–245 °C',
        nota: 'Prusament TPU 95A · material flexible en general, «Depending on hardness and brand»',
      },
      cita: {
        texto: 'Increase the nozzle temperature by 5 °C, this will lower filament resistance.',
        fuente: 'Prusa Research',
      },
    },
    {
      id: 'cama-y-camara',
      titulo: 'La cama del TPU no es una cifra del material',
      puntos: [
        'La temperatura de cama de un TPU no es un valor del material: cambia con el filamento y con la casa, y en Bambu también con la chapa.',
        'En Prusa ninguna fuente da una cifra distinta por lámina —su lista de láminas es una recomendación de superficie.',
        'No una tabla de temperaturas—, así que allí la chapa no mueve la cifra.',
        'Las cifras de cama están en su propia guía.',
        'El adhesivo es una condición de superficie aparte —la fila del TPU da la misma cifra con glue stick y con glue líquido—.',
        'Así que lo que decide es si hay que aplicarlo, y eso lo dice la chapa.',
        'Y el TPU tampoco pide cámara cerrada: la fila de Bambu agrupa PLA, PETG y TPU y dice "Not prone to warping".',
        'Con "Open-frame or enclosed printer" como impresora recomendada; el aviso de cámara cerrada de esa tabla es para el PETG, no para el TPU.',
        'Pero con la cama por encima de 45 °C y un material que reblandece por debajo de 60 °C hay que abrir la puerta o quitar la tapa de cristal.',
        'Y esa segunda regla es de la casa de Bambu, con su valor de cámara, no de cama.',
      ],
      indicador: 'maquina',
      cuerpo:
        'La temperatura de cama de un TPU no es un valor del material: cambia con el filamento y con la casa, y en Bambu también con la chapa. En Prusa ninguna fuente da una cifra distinta por lámina —su lista de láminas es una recomendación de superficie, no una tabla de temperaturas—, así que allí la chapa no mueve la cifra. Las cifras de cama están en su propia guía. El adhesivo es una condición de superficie aparte —la fila del TPU da la misma cifra con glue stick y con glue líquido—, así que lo que decide es si hay que aplicarlo, y eso lo dice la chapa. Y el TPU tampoco pide cámara cerrada: la fila de Bambu agrupa PLA, PETG y TPU y dice «Not prone to warping», con «Open-frame or enclosed printer» como impresora recomendada; el aviso de cámara cerrada de esa tabla es para el PETG, no para el TPU. Pero con la cama por encima de 45 °C y un material que reblandece por debajo de 60 °C hay que abrir la puerta o quitar la tapa de cristal, y esa segunda regla es de la casa de Bambu, con su valor de cámara, no de cama.',
      enlaza: { guia: 'temperatura-cama', etiqueta: 'Temperatura de cama' },
      cita: {
        texto: 'Not prone to warping; no mandatory temperature requirements',
        fuente: 'Bambu Lab',
      },
    },
    {
      id: 'retraccion-caso',
      titulo: 'La retracción con material flexible es un caso aparte',
      puntos: [
        'Las dos recomendaciones apuntan en direcciones opuestas porque hablan de síntomas distintos: Prusa previene del **atasco y del enredado**.',
        'Y por eso bajar o desactivar la retracción es una salida legítima en material flexible.',
        'Bambu atiende el **goteo severo**, y para eso un pequeño aumento de la retracción ayuda.',
        'Lo que no se escribe es "baja la retracción a 0,2 mm", que ninguna fuente dice.',
      ],
      indicador: 'material',
      cuerpo:
        'Las dos recomendaciones apuntan en direcciones opuestas porque hablan de síntomas distintos: Prusa previene del **atasco y del enredado**, y por eso bajar o desactivar la retracción es una salida legítima en material flexible; Bambu atiende el **goteo severo**, y para eso un pequeño aumento de la retracción ayuda. Lo que no se escribe es «baja la retracción a 0,2 mm», que ninguna fuente dice.',
      cita: {
        texto:
          'It’s alright to turn the retractions off completely and then try to raise them and watch the results.',
        fuente: 'Prusa Research',
      },
      enlaza: { guia: 'stringing', etiqueta: 'Stringing' },
    },
    {
      id: 'sintomas-propios',
      titulo: 'Los tres problemas propios del TPU',
      puntos: [
        'Las dos guías de serie de Bambu listan los mismos tres: **infraextrusión** (boquilla obstruida.',
        'Resistencia de carga y deslizamiento del filamento).',
        '**Obstrucción del extrusor** (el filamento se dobla y se enreda en el engranaje) y **hilos y goteo**.',
        'Es una lista de síntomas del material, no de ajustes.',
        'Por eso el camino de alimentación y la boquilla aparecen en casi todas las reglas de esta guía.',
      ],
      indicador: 'temperatura',
      cuerpo:
        'Las dos guías de serie de Bambu listan los mismos tres: **infraextrusión** (boquilla obstruida, resistencia de carga y deslizamiento del filamento), **obstrucción del extrusor** (el filamento se dobla y se enreda en el engranaje) y **hilos y goteo**. Es una lista de síntomas del material, no de ajustes: por eso el camino de alimentación y la boquilla aparecen en casi todas las reglas de esta guía.',
      cita: {
        texto:
          'TPU filament is prone to the following problems: … Under extrusion (Nozzle clogging, loading resistance, filament slipping)',
        fuente: 'Bambu Lab',
      },
    },
    {
      id: 'higroscopico',
      titulo: 'El TPU se bebe la humedad del ambiente',
      puntos: [
        'El TPU es **muy higroscópico**: un filamento húmedo produce hilos.',
        'Burbujas y mala adhesión entre capas, y es la primera causa que da Prusa cuando aparecen hilos.',
        'Bambu la lista la cuarta, después de la secuencia de impresión, la temperatura y la retracción: el orden de cada lista es el de su página.',
        'No una jerarquía de frecuencia. Las cifras de secado no se repiten aquí.',
      ],
      indicador: 'calibracion',
      cuerpo:
        'El TPU es **muy higroscópico**: un filamento húmedo produce hilos, burbujas y mala adhesión entre capas, y es la primera causa que da Prusa cuando aparecen hilos. Bambu la lista la cuarta, después de la secuencia de impresión, la temperatura y la retracción: el orden de cada lista es el de su página, no una jerarquía de frecuencia. Las cifras de secado no se repiten aquí.',
      cita: { texto: 'TPU filaments are highly hygroscopic', fuente: 'Bambu Lab' },
      enlaza: { guia: 'secar-filamento', etiqueta: 'Secar filamento' },
    },
    {
      id: 'modulo-asistencia',
      titulo: 'El módulo TPU Feed Assist',
      cuando: { maquina: 'bambu' },
      puntos: [
        'Es un accesorio que existe **por el TPU**: reduce la resistencia de alimentación en cualquier orientación del carrete.',
        'Evita atascos y roturas y deja alimentar por una entrada TPU dedicada.',
        'El módulo sale del modo de alimentación a los ~135 segundos.',
        'Y si la ausencia de empuje persiste más de ese tiempo se dispara la protección de extrusión en seco.',
        'La página enumera **tres** escenarios anómalos que la disparan: deslizamiento del engranaje, tubería desconectada o filamento agotado.',
        'La dirección de rotación del carrete no está entre ellos: es una de las cuatro causas del problema del módulo.',
        'Junto al carrete mal colocado, el filamento demasiado fino y los residuos dentro del extrusor.',
        'Es para H, X y P.',
      ],
      indicador: 'material',
      cuerpo:
        'Es un accesorio que existe **por el TPU**: reduce la resistencia de alimentación en cualquier orientación del carrete, evita atascos y roturas y deja alimentar por una entrada TPU dedicada. El módulo sale del modo de alimentación a los ~135 segundos, y si la ausencia de empuje persiste más de ese tiempo se dispara la protección de extrusión en seco. La página enumera **tres** escenarios anómalos que la disparan: deslizamiento del engranaje, tubería desconectada o filamento agotado. La dirección de rotación del carrete no está entre ellos: es una de las cuatro causas del problema del módulo, junto al carrete mal colocado, el filamento demasiado fino y los residuos dentro del extrusor. Es para H, X y P.',
      cifra: {
        valor: '135 s',
        nota: 'protección de extrusión en seco del módulo: sale del modo de alimentación a los ~135 s',
      },
    },
  ],

  reglas: [
    {
      id: 'dureza-85a',
      accion: 'Comprueba la dureza Shore del carrete antes de montar nada',
      valor: '85A',
      cuando: { maquina: 'bambu' },
      porque:
        'Por debajo de 85A los engranajes no muerden el filamento: es demasiado blando para que lo agarren bien y la extrusión falla, así que la máquina no lo alimenta en vez de imprimir mal.',
      fuente: 'Bambu Lab',
      alcance:
        'El umbral es de las impresoras Bambu, no del material: Prusa no enuncia ninguno y por eso aquí no se escribe que por debajo de 85A ninguna impresora pueda con TPU. La guía general de Bambu recomienda 85A o más duro para una impresión estable, porque un TPU más blando se dobla durante la alimentación y se enreda.',
    },
    {
      id: 'bambu-85a-boquilla',
      accion: 'Con el 85A, monta una boquilla de 0,6 o de 0,8 mm',
      valor: '0,6 · 0,8 mm',
      cuando: { maquina: 'bambu', material: '85a' },
      porque:
        'Bambu lo dice: «85A TPU filaments cannot be printed with 0.4mm nozzles», y su tabla deja el 0,2 y el 0,4 en no compatibles con el 85A. Con el 90A, el 95A HF y el «TPU for AMS» el 0,4 sí es compatible.',
      fuente: 'Bambu Lab',
      alcance:
        'Es la fila del 85A de la guía general de TPU de Bambu y de la guía de la serie P, que la repite. La tabla general de materiales marca el 0,4 mm como «Compatible» para el 85A: el corpus no explica la discrepancia y aquí se publican las dos, con el 0,2 además en un grado distinto —«Not Recommended» en la tabla, «Not compatible» en la guía.',
    },
    {
      id: 'bambu-85a-carga',
      accion: 'Carga el 85A directamente en el extrusor, sin pasar por el tubo PTFE',
      cuando: { maquina: 'bambu', material: '85a' },
      porque:
        'En la serie P, con 85A «loading through the PTFE tube is not supported»: quitar la tapa de cristal, desconectar el tubo PTFE y cargar el filamento al extrusor. Con el 90A sí se puede, por el PTFE.',
      fuente: 'Bambu Lab',
      alcance:
        'Es el procedimiento de la serie P. La A2L marca el 85A como compatible en la tabla, pero ninguna fuente de este tema da su procedimiento de carga, así que no se puede dar por válido ahí. Es una diferencia de trazado, no de ajuste.',
    },
    {
      id: 'ams-no',
      accion: 'Saca el TPU del AMS: ese aparato no lo va a alimentar',
      cuando: { maquina: 'bambu', ams: 'ams', material: ['tpu', '85a', '90a', '95a'] },
      porque:
        'La fila «TPU» de la tabla marca «Not Compatible» en la columna de AMS y AMS lite, y la guía lo dice del AMS 2 Pro. La razón es del canal, no del filamento: un TPU demasiado blando no lo recorre.',
      fuente: 'Bambu Lab',
      alcance:
        'Es una limitación del aparato. El AMS tiene un engranaje de transmisión que el AMS lite no tiene, y por eso puede con algunos filamentos blandos o rugosos. Y la tabla de materiales no menciona el AMS HT en ninguna fila: no lo contradice, no habla de él. La excepción es el filamento «TPU for AMS», que sí alimenta por el canal normal de cualquier AMS: con ese carrete no aplica esta regla.',
    },
    {
      id: 'ams-ht',
      accion: 'Con el AMS HT, alimenta el filamento por la salida TPU de la parte de atrás',
      cuando: { maquina: 'bambu', ams: 'amsht' },
      porque:
        'El AMS HT es el único que admite TPU y sólo funciona como «…sealed enclosure — its standard outlet and automatic feeding functionality cannot be used». El filamento entra por la salida TPU de atrás.',
      fuente: 'Bambu Lab',
      alcance:
        'El AMS HT no alimenta por su canal normal: como cámara estanca y de secado sí. La tabla de materiales no lo menciona en ninguna fila, así que no lo contradice —no habla de él—, y la excepción de producto del «TPU for AMS» es la que sí alimenta por cualquier AMS.',
    },
    {
      id: 'tpu-para-ams',
      accion: 'Con el filamento «TPU for AMS», alimenta por el canal normal de cualquier AMS',
      cuando: { material: 'tpu-ams' },
      porque:
        'Excepción de Bambu: «TPU for AMS filament is compatible with the standard feeding functionality of all AMS series models for loading and printing». Por eso alimenta donde el TPU corriente no.',
      fuente: 'Bambu Lab',
      alcance:
        'Es un filamento distinto del TPU corriente, y de ahí la tensión interna de la misma página, que a la vez dice que AMS, AMS lite y AMS 2 Pro no son compatibles con TPU. Aquí no se elige una de las dos frases. Lo que no se dice es que el 85A de la gama normal sea inyectable en el AMS.',
    },
    {
      id: 'velocidad',
      accion: 'Imprime despacio y no subas la velocidad',
      valor: '20 mm/s',
      porque:
        'Prusa lo dice primero: «Print slowly. The slower, the better», con 20 mm/s como típica y 30–40 mm/s como máximo: a más velocidad se tapa la boquilla o el filamento se enreda en los engranajes.',
      fuente: 'Prusa Research',
      alcance:
        'La cifra es de Prusa para material flexible en general, no de un modelo. Bambu da la misma dirección sin número, y en inglés literal: la serie P pide «Please keep the default volumetric speed limit during printing, and it is not recommended to increase the print speed», y la serie A, «Please keep the default max volumetric speed limit during printing, and avoid increasing the print speed». El límite de flujo máximo tiene su propia guía. No se condiciona a la máquina ni al síntoma porque es una pauta de base del material, no un remedio para una avería concreta.',
    },
    {
      id: 'calibracion-flujo',
      accion: 'Desactiva la calibración de dinámica de flujo',
      cuando: { maquina: 'bambu' },
      porque:
        'Bambu lo pide antes de imprimir TPU, en la guía general y en la de la serie A: «Before TPU printing, please turn off the flow dynamics calibration».',
      fuente: 'Bambu Lab',
      alcance:
        'Es una instrucción de la casa, y el corpus no da el motivo por el que la pide. No tiene equivalente publicado en Prusa para el material flexible. El ratio de extrusión, que es otra cosa, tiene su propia guía.',
    },
    {
      id: 'ventilador',
      accion: 'Mantén apagado el ventilador de impresión',
      indicador: 'desactivar',
      cuando: { maquina: ['prusa', 'otra'] },
      porque:
        'Prusa lo pide para el material flexible en general, y es una de las pocas recomendaciones del TPU que la casa enuncia sin explicación: «Keep print cooling turned off».',
      fuente: 'Prusa Research',
      alcance:
        'Es la formulación de Prusa para material flexible en general; en el troubleshooting del 95A dice «lowering the fan speed», no «apagarlo», así que aquí no se escribe «ventilador a 0» como regla del TPU. Bambu no publica nada equivalente: su tabla dice que el TPU no es propenso al warping. Para una marca que no sea Prusa, el fabricante de tu máquina puede pedir otra cosa.',
    },
    {
      id: 'soporte-pla',
      accion: 'Usa PLA como filamento de soporte, no TPU',
      porque:
        'Bambu lo recomienda: «When printing TPU, PLA is recommended as the support filament», porque el TPU como soporte «is often difficult to remove, easily causing surface scratches or deformation».',
      fuente: 'Bambu Lab',
      alcance:
        'Para manchar menos, Bambu pide PLA de color claro o del mismo color que la pieza. Los voladizos y soportes tienen su propia guía. No se condiciona a la máquina ni al síntoma porque es una decisión de material de soporte que aplica siempre que la pieza lleve soportes.',
    },
    {
      id: 'carga-250',
      accion: 'Calienta el hotend a 250 °C antes de cargar el TPU',
      valor: '250 °C',
      cuando: { maquina: 'bambu' },
      porque:
        'Es la temperatura de carga de Bambu, no de impresión: el módulo la llama «standard temperature for loading TPU» y las guías de serie P y A dan los mismos 250 °C al precalentar el hotend.',
      fuente: 'Bambu Lab',
      alcance:
        'El 250 °C es del proceso de carga y descarga, no de impresión: la temperatura de impresión en las guías de serie de Bambu es 225 °C. Las cuatro cifras de boquilla que da el corpus tienen alcances distintos y no se funden en una.',
    },
    {
      id: 'prusa-idler',
      accion: 'Afloja el idler hasta que los engranajes empujen con suavidad',
      valor: '1,5 vueltas',
      cuando: { maquina: 'prusa', sintoma: ['ruido', 'atasco'] },
      porque:
        'Prusa describe el ruido de extrusor exactamente así: «Loosen the idler so the gears push the filament through only very gently. If they press too hard, the filament might get entangled in the gears».',
      fuente: 'Prusa Research',
      alcance:
        'El 1,5 es la medida de la guía del Prusament TPU 95A para cuando el filamento ya se ha enredado en los engranajes; la regla general de aflojar no lleva cifra. Bambu no habla de idler: habla del engranaje que debe morder el filamento, que es la idea al revés.',
    },
    {
      id: 'bambu-engranaje',
      accion: 'Comprueba el engranaje del extrusor: si está gastado, cámbialo',
      cuando: { maquina: 'bambu', sintoma: ['ruido', 'atasco'] },
      porque:
        'Serie A: «If the extruder gear is worn, it needs to be replaced (Otherwise, there may be issues with filament slipping)». Por eso el filamento se desliza, causa de infraextrusión.',
      fuente: 'Bambu Lab',
      alcance:
        'Es desgaste de la máquina, no del filamento. La frase citada está en el apartado del extrusor de la serie A, no en la lista de los tres problemas del material, que es otra cosa. Y es distinto del módulo de asistencia, que es un accesorio: aquí se habla del engranaje del extrusor de la impresora.',
    },
    {
      id: 'bambu-feed-assist',
      accion: 'Baja el engranaje del módulo de asistencia en modo alimentación',
      cuando: { maquina: 'bambu', sintoma: ['ruido', 'atasco'] },
      porque:
        'Tras la calibración del módulo, reduce el engranaje en modo alimentación: la asistencia excesiva deforma el TPU. Si se acumula en la salida, cambia el tramo de filamento, pon en descarga y recalibra.',
      fuente: 'Bambu Lab',
      alcance:
        'La calibración del módulo no está en el corpus de este tema: lo que se publica es el ajuste posterior a la calibración y el remedio. El accesorio es para H, X y P.',
    },
    {
      id: 'ptfe',
      accion: 'Cambia el tubo PTFE si tiene abolladuras o polvo dentro',
      cuando: { maquina: 'bambu', sintoma: 'atasco' },
      porque:
        'Bambu la nombra: «Dents, deformation or accumulated filament dust inside the PTFE tube leading to increased resistance». Los remedios son de máquina: subir el engranaje del módulo o cambiar el tubo.',
      fuente: 'Bambu Lab',
      alcance:
        'Es resistencia del tubo, no del filamento. Prusa cuenta un rodeo del mismo tipo desde el otro extremo: en el CORE One hay que desconectar el tubo PTFE del lado del Nextruder para poder cargar el filamento.',
    },
    {
      id: 'hotend-residuo',
      accion: 'Haz un cold pull antes de empezar: un TPU no expulsa el resto de filamento',
      cuando: { sintoma: 'atasco' },
      porque:
        'Bambu lo explica con una frase: «TPU isn\'t stiff enough to push the previous filament out the nozzle, so it jams». Un resto de filamento atascado en el hotend no lo saca un material blando.',
      fuente: 'Bambu Lab, Prusa Research',
      alcance:
        'Bambu, página de diagnóstico del módulo. Prusa pide lo mismo en otro lenguaje: «Make sure the nozzle is unobstructed. If you’re not sure, do a cold pull to clean it completely». Los tutoriales de cold pull no están en el corpus: aquí sólo se cita la recomendación.',
    },
    {
      id: 'boton-extrusion',
      accion: 'Pulsa el botón de extrusión de uno en uno',
      cuando: { maquina: 'bambu', sintoma: 'atasco' },
      porque:
        'Serie P: «When clicking the extrusion button, do not click continuously, as this could cause the TPU to get caught in the extruder gears, leading to a clog». El filamento se atrapa en los dientes.',
      fuente: 'Bambu Lab',
      alcance:
        'Bambu, serie P. La página de diagnóstico del módulo TPU Feed Assist cuenta la otra mitad de lo mismo: la protección de extrusión en seco del accesorio, con sus tres escenarios de disparo.',
    },
    {
      id: 'descarga-manual',
      accion: 'Descarga el filamento a mano, con el hotend calentado',
      cuando: { maquina: 'bambu' },
      porque:
        'Bambu, en las dos familias: en la serie P «Automatic unloading with a cutter is not supported» y en la serie A «…manual unloading is required after heating up the hotend». El cutter no corta el TPU.',
      fuente: 'Bambu Lab',
      alcance:
        'Es una limitación de la máquina: el cutter automático no corta el TPU. La frase de la serie A es de las impresoras A1 («For A1 series printers, manual unloading is required…»), y la de la serie P, de las P. Prusa tiene la suya y es del mismo tipo —«automatic filament change might not work properly with flexible filaments»—, así que en las dos casas el cambio automático de filamento no es una vía fiable con este material.',
    },
    {
      id: 'boquilla-tapada',
      accion: 'Limpia la boquilla: una capa saltada es una boquilla tapada',
      cuando: { sintoma: 'capas' },
      porque:
        'Prusa lo dice sin rodeos: «Skipped layers: The nozzle got clogged at some point. Deal with it as you would deal with a clogged nozzle».',
      fuente: 'Prusa Research',
      alcance:
        'No es un problema de adhesión entre capas ni de humedad. Bambu cuenta la obstrucción de boquilla entre las cuatro causas de infraextrusión, junto a la resistencia de carga, el deslizamiento del filamento y el hotend con residuo. La separación entre capas, como diagnóstico, tiene su propia guía.',
    },
    {
      id: 'retract-off',
      accion: 'Prueba a desactivar la retracción',
      cuando: { sintoma: 'hilos' },
      porque:
        'Prusa publica el caso aparte: «It’s alright to turn the retractions off completely and then try to raise them and watch the results»: con menos retracción hay menos riesgo de atasco o de enredado.',
      fuente: 'Prusa Research',
      alcance:
        'Es la recomendación de Prusa para material flexible en general, y va contra el atasco y el enredado. Bambu atiende el goteo severo en el sentido contrario, con su propio +0,2 mm: son dos síntomas distintos, no dos reglas que se contradigan. Y no se escribe «baja la retracción a 0,2 mm», que ninguna fuente dice.',
    },
    {
      id: 'goteo-retract',
      accion: 'Si el goteo es severo, alarga la retracción',
      valor: '0,2 mm',
      cuando: { sintoma: 'goteo' },
      porque:
        'Bambu da el remedio: «If severe leaking occurs, try increasing the retraction distance by 0.2 mm from the original value». El TPU gotea por su fluidez: la retracción corta el hilo entre capas.',
      fuente: 'Bambu Lab',
      alcance:
        'Son 0,2 mm sobre el valor original, y sólo para goteo severo. Con hilos finos la salida es la contraria: desactivar la retracción, como recomienda Prusa. La retracción en general tiene su propia guía.',
    },
    {
      id: 'goteo-ajustes',
      accion: 'Baja la boquilla unos 5 °C y el flujo volumétrico',
      valor: '5 °C · 0,4 mm³/s',
      cuando: { sintoma: 'goteo' },
      porque:
        'El exceso de temperatura da goteo: «…reduce the nozzle temperature (by about 5 °C from the original setting) to decrease filament flow» y «…decrease the maximum volumetric flow rate by 0.4 mm³/s».',
      fuente: 'Bambu Lab',
      alcance:
        'Son unos 5 °C sobre el ajuste original y 0,4 mm³/s sobre el flujo máximo, no una temperatura de impresión: las cuatro cifras de boquilla del corpus tienen alcances distintos y no se funden. El flujo máximo tiene su propia guía.',
    },
    {
      id: 'imprime-objeto',
      accion: 'Imprime por objeto, o quita modelos de la placa',
      cuando: { sintoma: 'goteo' },
      porque:
        'Bambu lo pone el primero en su lista de causas de hilos y goteo: el modo de impresión «Print sequence By object», o menos modelos en la placa, para reducir los viajes de la boquilla.',
      fuente: 'Bambu Lab',
      alcance:
        'Es la primera de las cuatro causas que da Bambu, no la más frecuente: la lista sigue con la temperatura, la retracción y la sequedad del filamento. El modo de impresión por objeto es un ajuste del slicer, y la propia página de Bambu ofrece la alternativa de simplificar el modelo cuando los viajes en vacío son largos.',
    },
    {
      id: 'filamento-seco',
      accion: 'Comprueba que el filamento está seco',
      cuando: { sintoma: ['hilos', 'goteo'] },
      porque:
        'El TPU es «highly hygroscopic», y un filamento húmedo produce hilos, burbujas y mala adhesión entre capas. Es la primera causa que da Prusa cuando aparecen hilos.',
      fuente: 'Bambu Lab, Prusa Research',
      alcance:
        'Bambu pone la sequedad la cuarta entre las causas de hilos y Prusa la primera en el troubleshooting del 95A: el orden de cada lista es el de su página, no una jerarquía de frecuencia. Las cifras de secado y de humedad no se repiten aquí: están en la guía de secado.',
    },
    {
      id: 'bambu-placa',
      accion: 'Cambia de chapa: la Cool Plate SuperTack no sirve con TPU',
      cuando: { maquina: 'bambu' },
      porque:
        'Valen todas salvo una: «Except for the Cool Plate SuperTack, all other types of plates are compatible with TPU filaments». La serie A la descarta por «may result in overly strong adhesion».',
      fuente: 'Bambu Lab',
      alcance:
        'La serie A recomienda Cool Plate, Engineering Plate y HT/Smooth PEI, y avisa de que la Textured PEI no admite adhesivo, porque «may become overly sticky after applying adhesive». Las chapas y sus temperaturas tienen su propia guía.',
    },
    {
      id: 'prusa-placa',
      accion: 'Elige PA Nylon o Satin como superficie en Prusa',
      cuando: { maquina: 'prusa' },
      porque:
        'PA Nylon y Satin son «The most recommended print surface» y Smooth PEI es «Not recommended»: si se usa, con capa separadora, pues la adhesión es demasiado fuerte y retirar la pieza dañaría la chapa.',
      fuente: 'Prusa Research',
      alcance:
        'El corpus tiene dos grados distintos sobre la lámina satinada: el artículo general de flexibles pide una capa separadora en ella y la guía del 95A la da como la más recomendada sin mencionarla. Para materiales muy blandos, Prusa propone la Textured con muelle como alternativa. Las chapas tienen su propia guía.',
    },
    {
      id: 'bambu-camara',
      accion: 'Si la cama pasa de 45 °C, abre la puerta o quita la tapa de cristal',
      valor: '45 °C',
      cuando: { maquina: 'bambu' },
      porque:
        'Bambu ata cámara y material: los que reblandecen por debajo de 60 °C, como el TPU, con la cama por encima de 45 °C obligan a «opening the front door and/or removing the upper glass cover plate».',
      fuente: 'Bambu Lab',
      alcance:
        'Es una regla de cámara de Bambu, y su valor es de cámara, no de cama. El TPU no exige impresora cerrada: su tabla dice «Not prone to warping» y admite «Open-frame or enclosed printer». La cifra de cama del TPU en Bambu cambia con el filamento y con la chapa —no con el adhesivo, que es un requisito de superficie—, y está en la guía de temperatura de cama.',
    },
    {
      id: 'prusa-perfil',
      accion: 'Usa el perfil de PrusaSlicer del material',
      cuando: { maquina: 'prusa', material: '95a' },
      porque:
        'El Prusament TPU 95A trae perfil en el slicer: «You can find print profiles for this material in PrusaSlicer». Para materiales de terceros, Prusa nombra Semiflex o Flexfill 98A y Filatech FilaFlex40.',
      fuente: 'Prusa Research',
      alcance:
        'Prusa. El perfil del 95A es del filamento de Prusa; los tres nombres de terceros son de otros fabricantes y el corpus no da sus ajustes. La temperatura de cada perfil está en la guía de hotend.',
    },
  ],

  fueraDeAlcance: [
    {
      sintoma: 'Qué material elegir y para qué',
      porQue:
        'La escala Shore, la ordenación de durezas y la elección de variante son del material. Lo que aquí se publica es el requisito de máquina de cada variante, no cuál te conviene.',
      guia: 'material',
    },
    {
      sintoma: 'El secado del filamento',
      porQue:
        'El TPU es muy higroscópico y hay que secarlo, pero las temperaturas, los tiempos y los cuatro métodos de secado tienen su propia guía, con sus contradicciones ya anotadas.',
      guia: 'secar-filamento',
    },
    {
      sintoma: 'Los hilos y el goteo en general',
      porQue:
        'Con TPU la retracción es un caso aparte, y el resto de las causas de los hilos —distancia de viaje, boquilla gastada, temperatura— están en su propia guía.',
      guia: 'stringing',
    },
    {
      sintoma: 'El flujo y la subextrusión',
      porQue:
        'La infraextrusión con TPU la lista Bambu como velocidad, resistencia de carga y hotend con residuo: el ratio de flujo no aparece, y el ajuste del flujo tiene su propia guía.',
      guia: 'flow-rate',
    },
    {
      sintoma: 'Las esquinas levantadas',
      porQue:
        'El TPU no es propenso al warping según la tabla de materiales de Bambu, y ninguna fuente de este tema relaciona la flexibilidad con las esquinas levantadas. El warping tiene su propio diagnóstico.',
      guia: 'warping-pla',
    },
    {
      sintoma: 'La separación entre capas',
      porQue:
        'Con TPU, una capa saltada es una boquilla obstruida —eso dice Prusa—, no un problema de adhesión entre capas. Ese diagnóstico, con el resto de sus causas, tiene su propia guía.',
      guia: 'separaciones-entre-capas',
    },
  ],

  fuentes: [
    {
      url: 'https://wiki.bambulab.com/en/knowledge-sharing/tpu-printing-guide',
      quien: 'Bambu Lab',
      que:
        'La guía general de TPU: la matriz de variantes por impresora, la tabla de boquillas, el AMS y el AMS HT, el módulo de asistencia, el historial de la boquilla, los ajustes y el FAQ de hilos y goteo. La recomendación de hotend nuevo o dedicado no está aquí: es de la serie A.',
    },
    {
      url: 'https://wiki.bambulab.com/en/general/troubleshooting/tpu-feed-assist-module',
      quien: 'Bambu Lab',
      que:
        'Diagnóstico del módulo TPU Feed Assist: las causas de un atasco al alimentar, el umbral de 85A con su mecanismo, la resistencia del tubo PTFE y la protección de extrusión en seco.',
    },
    {
      url: 'https://wiki.bambulab.com/en/filament-acc/filament/tpu-85a-90a-printing-guide-for-p-series',
      quien: 'Bambu Lab',
      que:
        'Serie P: la carga del 85A sin tubo PTFE frente al 90A con PTFE, las boquillas por variante, la descarga sin cutter y el botón de extrusión.',
    },
    {
      url: 'https://wiki.bambulab.com/en/filament-acc/filament/tpu-85a-90a-printing-guide-for-a-series',
      quien: 'Bambu Lab',
      que:
        'Serie A: el hotend nuevo o dedicado, el desgaste del engranaje, el carrete elevado, la temperatura de cama, la chapa con adhesivo y la Cool Plate SuperTack descartada, la descarga manual y la pieza alta y fina que se queda oscilando.',
    },
    {
      url: 'https://wiki.bambulab.com/en/general/filament-guide-material-table',
      quien: 'Bambu Lab',
      que:
        'La tabla de materiales: la fila TPU y su compatibilidad con el AMS y el AMS lite, la boquilla 200–250 °C, la temperatura de cama por chapa y la regla de cámara.',
    },
    {
      url: 'https://help.prusa3d.com/article/flexible-materials_2057',
      quien: 'Prusa Research',
      que:
        'Materiales flexibles en general: la regla del idler, las cifras de velocidad, boquilla y cama, la retracción como caso aparte, el cambio automático de filamento y las láminas de impresión.',
    },
    {
      url: 'https://help.prusa3d.com/article/prusament-tpu-95a-material-guide_899653',
      quien: 'Prusa Research',
      que:
        'El Prusament TPU 95A: requisitos de impresora, superficies recomendadas, la capa saltada como boquilla obstruida, los rodeos de carga de la XL y el CORE One, y el aflojado del idler en 1,5 vueltas.',
    },
  ],

  /*
   * Esta guía **lee** el material del archivo y no **explica** ningún campo del
   * panel: el material ya tiene dueño, que es la guía `material`. Por eso el
   * campo del panel va vacío y el material va en `leeDelAnalisis`, igual que en
   * `secar-filamento`.
   */
  campos: [],
  leeDelAnalisis: ['material'],
};
