/*
 * El lector de trayectoria del G-code.
 *
 * ## Qué lee
 *
 * El **cuerpo** del G-code, que `ParserService` no toca: aquel lee la cabecera —los
 * metadatos que escribió el slicer—, y éste lee los movimientos, las capas y el tipo
 * de rasgo de cada tramo.
 *
 * ## Por qué no basta con la cabecera
 *
 * Porque la cabecera dice **cuánto** se imprime, y el cuerpo dice **cómo**. Las dos
 * cosas que un visor de trayectoria necesita son las que sólo están en el cuerpo:
 *
 * - **dónde** va la cabeza en cada momento → la trayectoria.
 * - **qué está haciendo** en cada tramo → el tipo de rasgo, que es lo que permite
 *   distinguir un perímetro de un relleno, o un soporte de una superficie.
 *
 * ## La diferencia entre las tres familias de slicer
 *
 * No es un detalle: la sintaxis de los marcadores **no es la misma** y se parece
 * poco.
 *
 * | Familia | Capa | Tipo de rasgo |
 * |---|---|---|
 * | Cura, Creality Print | `;LAYER_CHANGE` | `;TYPE:Outer wall` |
 * | PrusaSlicer, OrcaSlicer | `;LAYER_CHANGE` | `;TYPE:Bridge` |
 * | Bambu Studio | `; CHANGE_LAYER` | `; FEATURE: Bridge` |
 *
 * Los dos últimos se distinguen de los otros por la firma de versión, que el
 * `ParserService` ya sabe leer. Aquí se aceptan **las tres** sintaxis a la vez,
 * porque leer un archivo de Bambu con la tabla de Cura daría una trayectoria sin
 * capas: los Z seguirían ahí, pero el reparto en capas y los tipos de rasgo se
 * perderían.
 *
 * ## Los arcos
 *
 * `G2` y `G3` son arcos, y en el fixture hay **432**: casi una de cada diez líneas
 * de movimiento. Se leen como un tramo de la posición anterior a la nueva, que es
 * la cuerda del arco. La diferencia con el arco real es de menos de un milímetro
 * en una curva de radio pequeño, y a cambio el lector no tiene que hacer
 * trigonometría por segmento: 432 arcos son 432 segmentos más, y en un G-code
 * real hay cientos de miles de movimientos.
 */

/** Un movimiento de la cabeza, con su extrusión y su contexto. */
export interface Tramo {
  /** La X de destino, en milímetros de cama. */
  x: number;
  /** La Y de destino, en milímetros de cama. */
  y: number;
  /** La Z de destino, en milímetros de cama. */
  z: number;
  /** Los milímetros de filamento de este tramo. `0` en un viaje. */
  e: number;
  /** La velocidad de avance, en mm/min. `0` si el tramo no la trae. */
  feed: number;
  /** El índice de la capa, empezando en cero. */
  capa: number;
  /** Qué está haciendo la cabeza: `Outer wall`, `Gap infill`… `null` si no lo dice. */
  tipo: string | null;
  /** `true` si la cabeza se movió sin extruir. */
  viaje: boolean;
  /** `true` si el tramo es un arco (`G2`/`G3`) y no una recta. */
  arco: boolean;
  /** Los milímetros recorridos en este tramo. */
  avance: number;
  /**
   * El caudal volumétrico, en mm³/s.
   *
   * Es el volumen que sale por la boquilla por segundo: el filamento del tramo
   * dividido por el tiempo que tarda. Y es **la cifra que decide si una
   * impresora puede imprimir**: una máquina tiene un caudal máximo, y un G-code
   * que lo supera no se va a imprimir bien aunque todo lo demás esté bien.
   *
   * `0` en los viajes, que no depositan nada.
   */
  caudal: number;
}

/** Una capa de la impresión. */
export interface Capa {
  /** El índice de la capa, empezando en cero. */
  indice: number;
  /** La Z de la capa, en milímetros de cama. */
  z: number;
  /** El primer tramo de la capa, dentro de `tramos`. */
  desde: number;
  /** Los tipos de rasgo que aparecen en la capa. */
  tipos: string[];
  /**
   * `true` si la Z la ha anunciado el slicer en un comentario `;Z:`.
   *
   * Es interno al lector: existe para no sobrescribir con un movimiento una Z que
   * el propio archivo ha declarado.
   */
  zFijada?: boolean;
}

/** La caja envolvente de la trayectoria, en coordenadas de cama. */
export interface Caja {
  min: { x: number; y: number; z: number };
  max: { x: number; y: number; z: number };
}

/** Todo lo que se ha leído de un G-code. */
export interface Trayectoria {
  /** Los movimientos, en orden. */
  tramos: Tramo[];
  /** Las capas, en orden. */
  capas: Capa[];
  /** La caja envolvente de la trayectoria. */
  caja: Caja;
  /**
   * Los milímetros de filamento **gastados**, con la cuenta neta del slicer.
   *
   * Es la cifra que declara la cabecera del archivo, y la que hay que comprobar:
   * el lector no la lee, la deriva de los avances que ha visto.
   */
  filamento: number;
  /** Los milímetros de filamento **depositados** en la pieza. */
  depositado: number;
  /** Cuántos tramos han extruido. */
  extrusionados: number;
  /** Cuántos tramos han sido viajes. */
  viajes: number;
  /** Cuántos movimientos de cabeza ha leído, arcos incluidos. */
  movimientos: number;
  /** Cuántos de esos movimientos eran arcos. */
  arcos: number;
  /** La velocidad máxima de avance, en mm/min. `0` si no se declaró. */
  velocidadMaxima: number;
  /** Cuántas retracciones se hicieron (G10/G11 o E negativo). */
  retracciones: number;
  /** La velocidad del ventilador de pieza, en % (0–100). `null` si no se declaró. */
  ventilador: number | null;
  /** El pressure advance configurado, en segundos. `null` si no se declaró. */
  pressureAdvance: number | null;
  /** La aceleración máxima, en mm/s². `null` si no se declaró. */
  aceleracion: number | null;
  /** Las temperaturas de hotend vistas, en °C. Vacío si no hubo cambios. */
  temperaturasHotend: number[];
  /** Las temperaturas de cama vistas, en °C. Vacío si no hubo cambios. */
  temperaturasCama: number[];
}

/**
 * Los tipos de rasgo que el lector reconoce.
 *
 * Es una lista **abierta** a propósito: el slicer puede escribir los que quiera y
 * lo que se guarda es lo que venga. La lista sirve para saber qué se ha visto, no
 * para decidir qué se acepta.
 */
export const TIPOS_RECONOCIDOS = [
  'Outer wall',
  'Inner wall',
  'Overhang wall',
  'Top surface',
  'Bottom surface',
  'Internal solid infill',
  'Gap infill',
  'Bridge',
  'Support interface',
  'Support material',
  'Custom',
];

/** Los marcadores de capa de las tres familias. */
const MARCA_CAPA = /^\s*;\s*(?:LAYER_CHANGE|CHANGE_LAYER)\s*$/i;

/** Los marcadores de tipo de rasgo de las tres familias. */
const MARCA_TIPO = /^\s*;\s*(?:TYPE:|FEATURE:)\s*(.+?)\s*$/i;

/**
 * La Z que anuncia la capa.
 *
 * Cura la escribe justo después del cambio de capa, y es **más fiable que
 * deducirla**: el marcador llega antes de que la cabeza suba, y la subida ocurre
 * al final de la capa anterior. Sin este comentario, la última capa salía con la
 * Z de la anterior.
 *
 * Es de Cura: PrusaSlicer y OrcaSlicer no lo escriben, y ahí la Z se deduce del
 * primer movimiento de la capa.
 */
const MARCA_Z = /^\s*;\s*Z\s*:\s*(-?\d*\.?\d+)\s*$/i;

/** Un movimiento: `G0`, `G1`, `G2` o `G3` con sus coordenadas. */
const MOVIMIENTO = /^([Gg][0-3])\b(.*)$/;

/** Un parámetro de un movimiento: `X12.5`, `E-0.8`, `F3000`. */
const PARAMETRO = /([A-Za-z])\s*(-?\d*\.?\d+)/g;

/**
 * El lector, línea a línea.
 *
 * Es una máquina de estados porque el G-code se lee en orden y el estado —dónde
 * está la cabeza, cuánto filamento lleva, en qué capa está— **es** el resultado.
 */
class Lector {
  /** Los movimientos leídos, en orden. */
  tramos: Tramo[];
  /** Las capas, en orden. */
  capas: Capa[];
  /** La posición de la cabeza. */
  x: number;
  y: number;
  z: number;
  /** El extrusor, en milímetros acumulados desde el último `G92`. */
  e: number;
  /** La última velocidad de avance vista, en mm/min. */
  feed: number;
  /** La capa en la que está la cabeza, o `-1` si es anterior a la primera. */
  capa: number;
  /** El tipo de rasgo que está haciendo la cabeza. */
  tipo: string | null;
  /**
   * `true` si la extrusión es **relativa** (`M83`).
   *
   * Es el detalle que hace que un lector de trayectorias mienta: con `M83` —que
   * es lo que escribe Cura por defecto— cada `E` es el **avance** desde el
   * movimiento anterior, y no un valor acumulado. Leerlo como acumulado da una
   * suma de filamento que no es la de la máquina. En el fixture, la diferencia
   * son 26,87 mm sobre 311: un 8,6 % que se ve en los gramos.
   */
  relativo: boolean;
  /** Los milímetros de filamento gastados, con la cuenta neta del slicer. */
  filamento: number;
  /** Los milímetros de filamento depositados en la pieza. */
  depositado: number;
  /** Cuántos tramos han depositado material. */
  extrusionados: number;
  /** Cuántos tramos han sido viajes. */
  viajes: number;
  /** Cuántos movimientos de cabeza ha leído. */
  movimientos: number;
  /** Cuántos de esos movimientos eran arcos. */
  arcos: number;
  /** La velocidad máxima de avance vista, en mm/min. */
  velocidadMaxima: number;
  /** Cuántas retracciones se hicieron. */
  retracciones: number;
  /** La velocidad del ventilador de pieza, en %. `null` si no se declaró. */
  ventilador: number | null;
  /** El pressure advance configurado, en segundos. `null` si no se declaró. */
  pressureAdvance: number | null;
  /** La aceleración máxima, en mm/s². `null` si no se declaró. */
  aceleracion: number | null;
  /** Las temperaturas de hotend vistas. */
  temperaturasHotend: number[];
  /** Las temperaturas de cama vistas. */
  temperaturasCama: number[];
  /** La caja envolvente de lo depositado. */
  caja: Caja;
  /** El diámetro del filamento que declara la cabecera, en milímetros. */
  diametro: number;
  /** La densidad del filamento que declara la cabecera, en g/cm³. */
  densidad: number;

  constructor() {
    this.tramos = [];
    this.capas = [];
    this.x = 0;
    this.y = 0;
    this.z = 0;
    this.e = 0;
    this.feed = 0;
    this.capa = -1;
    this.tipo = null;
    this.relativo = true;
    this.filamento = 0;
    this.depositado = 0;
    this.extrusionados = 0;
    this.viajes = 0;
    this.movimientos = 0;
    this.arcos = 0;
    this.velocidadMaxima = 0;
    this.retracciones = 0;
    this.ventilador = null;
    this.pressureAdvance = null;
    this.aceleracion = null;
    this.temperaturasHotend = [];
    this.temperaturasCama = [];
    this.caja = {
      min: { x: Infinity, y: Infinity, z: Infinity },
      max: { x: -Infinity, y: -Infinity, z: -Infinity },
    };
    // El diámetro y la densidad salen de la cabecera. Sin ellos no se puede
    // calcular el caudal, y el caudal es la cifra que decide si la máquina puede.
    this.diametro = 1.75;
    this.densidad = 1.24;
  }

  /** Lee una línea del archivo. */
  linea(linea: string) {
    if (linea.charCodeAt(0) === 59 /* ; */) {
      this.comentario(linea);
      return;
    }
    const c = linea.charCodeAt(0);
    if (c === 71 /* G */ || c === 77 /* M */) {
      this.comando(linea);
    }
  }

  /** Un comentario: puede ser un marcador de capa o de tipo de rasgo. */
  comentario(linea: string) {
    if (MARCA_CAPA.test(linea)) {
      this.nuevaCapa();
      return;
    }
    const diametro = linea.match(/^\s*;\s*filament_diameter\s*[=:]\s*([\d.]+)/i);
    if (diametro) {
      this.diametro = Number(diametro[1]);
      return;
    }
    const densidad = linea.match(/^\s*;\s*filament_density\s*[=:]\s*([\d.]+)/i);
    if (densidad) {
      this.densidad = Number(densidad[1]);
      return;
    }
    const z = linea.match(MARCA_Z);
    if (z && this.capas.length > 0) {
      const capa = this.capas[this.capas.length - 1];
      if (!capa.zFijada) {
        capa.z = Number(z[1]);
        capa.zFijada = true;
      }
      return;
    }
    const tipo = linea.match(MARCA_TIPO);
    if (tipo) {
      this.tipo = tipo[1] ?? null;
      // El tipo pertenece a la capa que empieza ahora: si la capa ya existe, se le
      // añade; si no, la siguiente capa lo heredará.
      if (this.capas.length > 0 && this.capas[this.capas.length - 1].tipos.length === 0) {
        this.capas[this.capas.length - 1].tipos.push(this.tipo);
      }
    }
  }

  /** Un comando `G…`. */
  comando(linea: string) {
    // --- Temperaturas de hotend ---
    let m = linea.match(/^M10[49]\b.*\bS(\d+)/i);
    if (m) { const t = Number(m[1]); if (!this.temperaturasHotend.includes(t)) this.temperaturasHotend.push(t); return; }
    // --- Temperaturas de cama ---
    m = linea.match(/^M1[49]0\b.*\bS(\d+)/i);
    if (m) { const t = Number(m[1]); if (!this.temperaturasCama.includes(t)) this.temperaturasCama.push(t); return; }
    // --- Ventilador de pieza ---
    m = linea.match(/^M106\b.*\bS(\d+)/i);
    if (m) { this.ventilador = Math.round((Number(m[1]) / 255) * 100); return; }
    // --- Pressure advance ---
    m = linea.match(/^M572\b.*\bS([\d.]+)/i) || linea.match(/^M900\b.*\bK([\d.]+)/i);
    if (m) { this.pressureAdvance = Number(m[1]); return; }
    // --- Aceleración ---
    m = linea.match(/^M204\b.*\bS(\d+)/i);
    if (m) { this.aceleracion = Number(m[1]); return; }
    // --- Retracción (G10/G11) ---
    if (/^G10\b/i.test(linea) || /^G11\b/i.test(linea)) { this.retracciones += 1; return; }
    // --- Modos de extrusión ---
    if (/^M83\b/i.test(linea)) {
      this.relativo = true;
      return;
    }
    if (/^M82\b/i.test(linea)) {
      this.relativo = false;
      return;
    }
    if (/^G92\b/i.test(linea)) {
      // El extrusor vuelve a cero. El `E` de los movimientos siguientes es el
      // avance **desde aquí**, y por eso la suma de los incrementos da los
      // milímetros de filamento.
      this.e = 0;
      return;
    }
    const movimiento = linea.match(MOVIMIENTO);
    if (!movimiento) return;

    const op = movimiento[1].toUpperCase();
    const parametros = new Map<string, number>();
    PARAMETRO.lastIndex = 0;
    let pm;
    while ((pm = PARAMETRO.exec(movimiento[2])) !== null) {
      parametros.set(pm[1].toUpperCase(), Number(pm[2]));
    }

    if (parametros.has('F')) {
      this.feed = parametros.get('F') ?? this.feed;
      if (this.feed > this.velocidadMaxima) this.velocidadMaxima = this.feed;
    }
    if (!parametros.has('X') && !parametros.has('Y') && !parametros.has('Z') && !parametros.has('E')) {
      return;
    }

    this.movimientos += 1;
    const esArco = op === 'G2' || op === 'G3';
    if (esArco) this.arcos += 1;

    const x = parametros.get('X') ?? this.x;
    const y = parametros.get('Y') ?? this.y;
    const z = parametros.get('Z') ?? this.z;

    // La extrusión, y aquí está el modo que lo decide todo.
    //
    // - **Relativa** (`M83`): el `E` **es** el avance. Un `E1.2` extruye 1,2 mm
    //   y un `E-.8` retrae 0,8 mm.
    // - **Absoluta** (`M82`): el `E` es un valor acumulado y el avance es la
    //   diferencia con el anterior. Un `G92 E0` lo pone a cero.
    let e = 0;
    if (parametros.has('E')) {
      const nuevo = parametros.get('E') ?? 0;
      if (this.relativo) {
        e = nuevo;
        this.e += nuevo;
      } else {
        e = nuevo - this.e;
        this.e = nuevo;
      }
    }

    /*
     * Lo que se deposita y lo que se gasta.
     *
     * `filamento` es la suma **neta** de los avances, y es la cifra que declara el
     * slicer: en el fixture son 311,01 mm, y la suma de los avances positivos da
     * 377,41. La diferencia son 66,4 mm de retracciones, que el slicer resta
     * porque el filamento que se ha tirado hacia atrás se vuelve a empujar y no se
     * cuenta dos veces.
     *
     * `depositado` es lo que de verdad se deposita en la pieza: los avances
     * positivos **con movimiento en X o Y**. Una retracción y su contrarretracción
     * no depositan nada, y un `E0.8` sin mover la cabeza tampoco.
     */
    // Retracción: E negativo es retracción (con o sin movimiento).
    if (parametros.has('E') && e < 0) {
      this.retracciones += 1;
    }

    const mueve = parametros.has('X') || parametros.has('Y');
    const extruido = e > 0 && mueve;
    this.filamento += e;
    if (extruido) {
      this.depositado += e;
      this.extrusionados += 1;
    } else {
      this.viajes += 1;
    }

    /*
     * El caudal volumétrico.
     *
     *   caudal = (avance de filamento × área del filamento) / tiempo
     *
     * El tiempo del tramo es su distancia dividida por la velocidad de avance. Y
     * el área del filamento sale del diámetro que declara la cabecera.
     *
     * Con `M83` el `E` de un tramo son milímetros de filamento, así que el
     * volumen es `E × π × (d/2)²`.
     */
    const avance = Math.hypot(x - this.x, y - this.y, z - this.z);
    const area = Math.PI * (this.diametro / 2) ** 2;
    const segundos = avance > 0 && this.feed > 0 ? (avance / this.feed) * 60 : 0;
    const caudal = extruido && segundos > 0 ? (e * area) / segundos : 0;

    this.tramos.push({
      x,
      y,
      z,
      e: extruido ? e : 0,
      feed: this.feed,
      /**
       * La capa del tramo, o `-1` si el tramo es anterior a la primera capa —la
       * puesta en posición, la purga— y no pertenece a ninguna.
       */
      capa: this.capa,
      tipo: this.tipo,
      viaje: !extruido,
      arco: esArco,
      avance,
      caudal,
    });

    this.x = x;
    this.y = y;
    this.z = z;

    /*
     * La caja es de **lo depositado**, no de todo lo que ha hecho la cabeza.
     *
     * La máquina empieza en el origen —0, 0— y va hasta donde está la pieza antes
     * de imprimir: ese viaje no es la pieza. La caja que importa es la de los
     * tramos que dejaron material, que es la que tiene que coincidir con la que
     * declara la cabecera.
     */
    if (extruido) {
      const caja = this.caja;
      if (x < caja.min.x) caja.min.x = x;
      if (y < caja.min.y) caja.min.y = y;
      if (z < caja.min.z) caja.min.z = z;
      if (x > caja.max.x) caja.max.x = x;
      if (y > caja.max.y) caja.max.y = y;
      if (z > caja.max.z) caja.max.z = z;
    }
  }

  /** Empieza una capa. */
  nuevaCapa() {
    this.capa += 1;
    // La Z se toma del primer tramo de la capa, no del momento del marcador: el
    // slicer marca el cambio de capa **antes** de mover la cabeza a la nueva
    // altura, así que la Z del marcador es siempre la de la capa anterior.
    this.capas.push({
      indice: this.capa,
      z: this.z,
      desde: this.tramos.length,
      tipos: [],
      zFijada: false,
    });
  }

  /** El resultado. */
  resultado() {
    // Los tipos que se leen **después** del primer tramo de la capa no están en la
    // lista de la capa: se las añade aquí, porque en el G-code el marcador va
    // justo antes de los movimientos que le pertenecen.
    for (const capa of this.capas) {
      const tipos = new Set<string>();
      let primerTramo = true;
      for (const tramo of this.tramos) {
        if (tramo.capa !== capa.indice) continue;
        if (tramo.tipo) tipos.add(tramo.tipo);
        // La Z de la capa es la del primer movimiento que la compone: el slicer
        // marca el cambio **antes** de mover la cabeza, así que la Z del marcador
        // es siempre la de la capa anterior.
        if (primerTramo && !capa.zFijada) capa.z = tramo.z;
        primerTramo = false;
      }
      capa.tipos = [...tipos];
    }

    const caja = this.caja;
    if (!Number.isFinite(caja.min.x)) {
      caja.min = { x: 0, y: 0, z: 0 };
      caja.max = { x: 0, y: 0, z: 0 };
    }

    return {
      tramos: this.tramos,
      capas: this.capas,
      caja,
      filamento: this.filamento,
      depositado: this.depositado,
      extrusionados: this.extrusionados,
      viajes: this.viajes,
      movimientos: this.movimientos,
      arcos: this.arcos,
      velocidadMaxima: this.velocidadMaxima,
      retracciones: this.retracciones,
      ventilador: this.ventilador,
      pressureAdvance: this.pressureAdvance,
      aceleracion: this.aceleracion,
      temperaturasHotend: this.temperaturasHotend,
      temperaturasCama: this.temperaturasCama,
      diametro: this.diametro,
      densidad: this.densidad,
    };
  }
}

/**
 * Lee una trayectoria de un texto de G-code.
 *
 * @param texto El G-code entero.
 */
export function analizarGcode(texto: string): Trayectoria {
  const lector = new Lector();
  for (const linea of texto.split('\n')) {
    lector.linea(linea);
  }
  return lector.resultado();
}

/**
 * Lee una trayectoria de un archivo, sin traerlo entero a memoria.
 *
 * Un G-code real pesa entre 20 y 200 MB, y `file.text()` lo deja en el hilo
 * principal mientras decodifica: la interfaz se congela. Aquí el archivo se lee por
 * trozos, se decodifica y se entrega línea a línea.
 *
 * @param file El archivo `.gcode` o `.gco`.
 */
export async function analizarGcodeDeArchivo(file: File): Promise<Trayectoria> {
  const lector = new Lector();
  const lectorTexto = new TextDecoder();
  let resto = '';

  const trozos = file.stream().getReader();
  for (;;) {
    const { done, value } = await trozos.read();
    if (done) break;
    const texto = resto + lectorTexto.decode(value, { stream: true });
    const lineas = texto.split('\n');
    // La última parte puede estar a medias: se queda para el siguiente trozo.
    resto = lineas.pop() ?? '';
    for (const linea of lineas) lector.linea(linea);
  }
  resto += lectorTexto.decode();
  if (resto) lector.linea(resto);

  return lector.resultado();
}
