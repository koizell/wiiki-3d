/**
 * El contrato de una guía. Una guía no es un artículo: es un instrumento.
 *
 * ## Por qué un módulo de TypeScript y no un `.md` con frontmatter
 *
 * Porque la guía **calcula**. Su última etapa es una lista de acciones que depende
 * de lo que quien lee ha declarado, y eso no se puede escribir como prosa: en
 * Markdown sería un artículo que dice «si usas Cool Plate, sube la cama», que es
 * exactamente el muro de 5.600 palabras que ya no queremos.
 *
 * Con un `.md` habría que escribir un parser del YAML anidado que la página
 * necesita, y ese parser no lo comprobaría nadie. Con un `.ts`, el compilador
 * comprueba que toda regla tiene su condición, su acción y su fuente, y que
 * ninguna tarjeta apunte a una variable que no existe. Un dato mal escrito no se
 * ve mal: no compila.
 *
 * Y el que escribe la guía es el redactor, que sale de `wiki/cooked/`. Cambiar
 * de formato es cambiar lo que produce el pipeline, no lo que consume la web.
 *
 * ## Las cuatro etapas, y por qué están en este orden
 *
 * 1. `diferencial` — cómo confirmar que el problema es este y no el de al lado.
 * 2. `variables` — lo que la persona declara de su montaje.
 * 3. `conocimiento` — las tarjetas que sus variables hacen pertinentes.
 * 4. `reglas` — las acciones que se calculan con lo declarado.
 *
 * El diferencial va **antes** que las variables a propósito. Subir la cama de un
 * warping que en realidad es una separación entre capas no arregla nada, y la
 * única forma de saberlo antes de tocar nada es el diferencial. Por eso la etapa
 * 1 no es un título: es un filtro con salida —«no es esto» lleva a la guía que sí
 * lo es.
 */

/** Un valor que el lector declara sobre su montaje. */
export interface Opcion {
  id: string;
  etiqueta: string;
  /** Una línea que explica por qué esta opción cambia el resultado. */
  detalle?: string;
}

/** Una variable del diagnóstico. */
export interface Variable {
  id: string;
  etiqueta: string;
  /** Para qué se pregunta. Una frase: esto es lo que va a condicionar la recomendación. */
  para: string;
  opciones: Opcion[];
  /**
   * `true` si el diagnóstico no puede afinar sin ella.
   *
   * No es cosmético: una regla cuya condición incluye esta variable no puede
   * dispararse hasta que esté marcada, y eso se dice en la tarjeta en vez de
   * dejar que la recomendación salga a medias sin avisar.
   */
  necesaria?: boolean;
  /**
   * Los campos del panel de análisis que **esta** variable recoge, si alguno.
   *
   * Es lo que convierte «la guía explica `bedTemp`» —que estaba declarado en la
   * guía entera y no decía dónde— en algo navegable: con un G-code cargado, la
   * barra «Tu archivo» pinta la cifra que trae el archivo y la enlaza al `id`
   * de esta variable, que es el sitio donde el lector declara ese mismo dato.
   *
   * Se declara aquí y no se deduce del nombre de la variable porque los dos no
   * coinciden nunca del todo: la variable `cama` de `warping-pla` recoge
   * `bedTemp`, y la `material` de `temperatura-cama` recoge `material` **y**
   * `bedTemp`, porque en esa guía los rangos de cama son lo que esa variable
   * pregunta. Por eso es una lista y por eso `verify:guias` comprueba que no
   * haya un campo declarado dos veces en sitios distintos de la misma guía.
   */
  campos?: string[];
}

/**
 * Una condición: variable → valores que la satisfacen.
 *
 * Semántica, y es importante que sea una sola: **todas** las claves tienen que
 * estar contestadas y todas tienen que coincidir. Una condición con una variable
 * sin contestar no se cumple, y por tanto la regla no aparece.
 *
 * La alternativa —cumplirse con lo que se sepa— daría una recomendación que
 * cambia según lo que el usuario se ha acordado de contestar, y eso es peor que
 * no dar ninguna: es una recomendación que parece personalizada y no lo está.
 */
export type Condicion = Record<string, string | string[]>;

/** Una fuente. Es el motivo de que la guía exista. */
export interface Fuente {
  /** Para el `href` y para el texto que se ve. */
  url: string;
  /** Quien publica la página, no el dominio entero: dos hilos del mismo foro son dos fuentes. */
  quien: string;
  /** Qué es exactamente este documento. */
  que: string;
}

/** Un passo del diferencial: «si ves esto, sí es esto». */
export interface Comprobacion {
  id: string;
  /** Lo que se mira, en la pregunta que alguien se haría. */
  mira: string;
  /** Lo que significa cada respuesta. Se pinta como dos tarjetas enfrentadas. */
  si: string;
  no: string;
}

/** El filtro de entrada de la guía. */
export interface Diferencial {
  /** Una frase: qué dos problemas se están confundiendo aquí. */
  contra: string;
  /**
   * La versión corta de `contra`, para el título de la etapa.
   *
   * El título es «Antes de tocar nada: descártalo como …» y `contra` puede ser una
   * enumeración entera —«voladizo que cuelga, soportes que fallan y cara apoyada
   * rugosa»—, que ahí se lee como un trabalenguas. La enumeración se queda en la
   * introducción; el título usa esto. Si no se pone, el título usa `contra`.
   */
  contraCorto?: string;
  comprobaciones: Comprobacion[];
  /**
   * A dónde ir si el resultado es «no».
   *
   * Es la interconexión que hace que la wiki no sea un conjunto de páginas: el
   * punto de salida de equivocarse es otro diagnóstico, y está a un clic.
   */
  siNo?: { guia: string; etiqueta: string };
}

/** Una tarjeta de conocimiento. Corta, y con su cifra y su cita. */
export interface Conocimiento {
  id: string;
  titulo: string;
  /** Dos o tres frases. Es una tarjeta, no una sección. */
  cuerpo: string;
  /** Si se pone, la tarjeta sólo aparece si se cumple. Vacío = siempre. */
  cuando?: Condicion;
  /** La cifra destacada, si el tema tiene una. */
  cifra?: { valor: string; nota: string };
  /** La cita exacta. Corta: es la prueba, no un adorno. */
  cita?: { texto: string; fuente: string };
  /**
   * Un enlace a otra guía desde dentro de la tarjeta.
   *
   * Es el segundo sitio donde la wiki se interconecta, y el más útil: la tarjeta
   * de la temperatura de cama lleva a la guía de warping, porque subir la cama
   * es una de las cinco acciones de aquélla.
   */
  enlaza?: { guia: string; etiqueta: string };
  /**
   * Los campos del panel que **esta** tarjeta explica, si alguno.
   *
   * Igual que en `Variable`, y por el mismo motivo: es lo que permite que el
   * dato que trae el archivo del visitante llegue a la tarjeta que lo explica y
   * no a un ancla inventada. El orden de preferencia al resolver el enlace es
   * variable primero y tarjeta después, porque lo que quien lee necesita
   * **declarar** está más arriba que lo que necesita **entender**.
   */
  campos?: string[];
}

/**
 * El intervalo de la fuente, en números, para compararlo con el valor del archivo.
 *
 * `valor` dice el rango en texto —«45–65 °C»— y sirve para leerlo; esto es el mismo
 * intervalo en números, y sirve para **calcular**. Es lo que permite que la guía,
 * con un G-code cargado, diga si tu cama cae dentro, por encima o por debajo, y de
 * cuánto. Sin él habría que interpretar el texto, que es donde un guion de rango se
 * confunde con un signo menos.
 */
export interface RangoFuente {
  /** El campo de `ProjectMetadata` que se compara. */
  campo: string;
  min: number;
  max: number;
  unidad: string;
}

/** Una acción recomendada. Se calcula, no se escribe por caso. */
export interface Regla {
  id: string;
  /** Qué hacer, en imperativo y corto: «Limpia la chapa». */
  accion: string;
  /** El número concreto, cuando lo hay. */
  valor?: string;
  /** Por qué, con su alcance. Una o dos frases: nunca «porque sí». */
  porque: string;
  /**
   * La condición que la dispara.
   *
   * **Es opcional desde `adhesion-primera-capa`, y antes no lo era.** El tipo la exigía
   * con el principio «sin condición no es una regla», que es un buen principio para
   * atrapar reglas que se escriben sin pensar… y que además era falso. Hay reglas
   * legítimamente generales: «recalibra la primera capa al cambiar de chapa» depende
   * del grosor, no del material ni del síntoma, y ponerle `cuando: { chapa: [las cinco
   * opciones] }` es no filtrar mientras aparenta que sí.
   *
   * El riesgo real —una regla que sale siempre por descuido— no lo cubre el tipo, lo
   * cubre `verify:guias`, que exige que **toda** regla tenga acción, porqué y fuente, y
   * que ninguna variable quede decorativa. Una regla sin condición no puede hacer
   * daño a ninguna de las dos cosas: no depende de variables, y `porque` sigue siendo
   * obligatorio.
   */
  cuando?: Condicion;
  /** De dónde sale. */
  fuente: string;
  /** Qué hace la fuente exactamente aquí. */
  alcance?: string;
  /**
   * El mismo intervalo de `valor`, en números, si se puede comparar con el archivo.
   *
   * Opcional, y sólo en las reglas cuyo objetivo es un intervalo de un campo del
   * panel —hoy, la temperatura de cama—. Una regla con `rango` tiene que llevar
   * `valor`, y el `valor` tiene que contener los dos extremos: son el mismo dato en
   * texto y en número, y `verify:guias` avisa si se separan.
   */
  rango?: RangoFuente;
}

/** Lo que esta guía no resuelve. */
export interface FueraDeAlcance {
  sintoma: string;
  porQue: string;
  /** A dónde llevar el caso si hay otra guía. */
  guia?: string;
}

/** Una guía completa. */
export interface Guia {
  slug: string;
  titulo: string;
  /** Una frase. Sale en la tarjeta del índice y en el `description`. */
  resumen: string;
  /** Cómo lo ve alguien, en sus palabras. Es el título de la tarjeta del índice. */
  sintoma: string;
  /** Qué dibujo lleva la tarjeta del índice. */
  dibujo: Dibujo;
  /** Cuánto se tarda. Es el número que hace elegible una guía sobre otra. */
  minutos: number;
  diferencial: Diferencial;
  variables: Variable[];
  conocimiento: Conocimiento[];
  reglas: Regla[];
  fueraDeAlcance: FueraDeAlcance[];
  fuentes: Fuente[];
  /** El campo del panel que esta guía explica, si alguno. */
  campos?: string[];
  /**
   * Del `ProjectMetadata` que esta guía lee, si la lectura puede precontestar
   * una variable por sí sola.
   *
   * Es la interconexión entre la herramienta y la wiki: con un G-code cargado,
   * `material` y `bedTemp` ya vienen escritos y quien llega a la guía no tiene
   * que declararlos a mano. La guía no inventa el dato: lo lee del análisis que
   * la propia app acaba de hacer, con su incertidumbre incluida.
   */
  leeDelAnalisis?: string[];
}

/** Los dibujos del índice. Cada uno es un SVG en línea, no una imagen. */
export type Dibujo =
  | 'esquinas'
  | 'primera-capa'
  | 'grieta'
  | 'rugosidad'
  | 'colapso'
  | 'cama'
  | 'camara'
  | 'voladizo'
  | 'capas'
  | 'hotend';