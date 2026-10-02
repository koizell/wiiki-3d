import type { ProjectMetadata, SlicerKind } from './types';

/**
 * ParserService — extrae los metadatos de impresión de un archivo G-code.
 *
 * La lectura es parcial a propósito: los slicers escriben todos los metadatos en
 * los primeros kilobytes del archivo (Cura los emite justo después de la línea
 * de Genius), así que no hay motivo para traerse un G-code de 200 MB a memoria.
 *
 * TODO: el parseo sigue devolviendo datos simulados. Cuando implemente el
 * parseo real habrá que detectar el slicer (Cura, PrusaSlicer, BambuStudio...)
 * y mapear sus comentarios de cabecera a `ProjectMetadata`.
 */

/** Extensiones que este servicio sabe interpretar. */
const GCODE_EXTENSIONS = ['.gcode', '.gco'] as const;

/**
 * Tamaño de la ventana de lectura inicial, en bytes.
 *
 * 256 KiB es un margen muy holgado: las cabeceras reales ocupan entre 1 y
 * 10 KiB. Bajarlo afinaría la lectura, pero cualquier slicer futuro con más
 * metadatos (perfiles, datos deodo, notas de usuario) se quedaría fuera.
 */
/** Latencia simulada para que los estados de carga de la UI sean visibles. */
const MOCK_LATENCY_MS = 400;

/** Resuelve tras `ms` milisegundos. Sustituye al trabajo real de lectura. */
const wait = (ms: number): Promise<void> =>
  new Promise((resolve) => {
    setTimeout(resolve, ms);
  });

const HEADER_BYTES = 256 * 1024;

/**
 * Separador entre las dos ventanas de lectura.
 *
 * Es un comentario G-code vacío para que el texto unido siga siendo G-code
 * válido: si alguien lo vuelca a un visor o lo pasa por un parser externo, la
 * frontera no rompe nada. También marca visualmente dónde acaba el head y
 * empieza el tail, de modo que quien lea el texto en un depurador sepa que hay
 * un salto en el que puede haber metadata repetido.
 */
const HEAD_TAIL_SEPARATOR = '\n;\n';

/**
 * Lee los primeros {@link HEADER_BYTES} del archivo.
 *
 * Se usa `slice()` en lugar de `file.text()` porque `text()` trae el archivo
 * entero a memoria de una sentada: en un G-code de 200 MB eso significa 200 MB
 * de string en el hilo principal más el coste de decodificarlo, y la interfaz se
 * congela mientras ocurre. `slice()` es perezoso —no lee nada del disco hasta
 * que se consume— y `Blob.text()` decodifica solo ese trozo.
 */
async function readGcodeHead(file: File): Promise<string> {
  return file.slice(0, HEADER_BYTES).text();
}

/**
 * Lee los últimos {@link HEADER_BYTES} del archivo.
 *
 * El offset se calcula desde `file.size`, de modo que el recorte cae en un
 * límite conocido y no en uno arbitrario. Aun así, el corte puede partir una
 * línea por la mitad; eso lo resuelve {@link readGcodeText}, que es quien sabe
 * si la ventana llegó completa o no.
 */
async function readGcodeTail(file: File): Promise<string> {
  const start = Math.max(0, file.size - HEADER_BYTES);
  return file.slice(start, file.size).text();
}

/**
 * Une las dos ventanas en un único texto listo para tokenizar por líneas.
 *
 * Hay dos ventanas porque los slicers no ponen la cabecera en el mismo sitio.
 * La familia Cura/Prusa abre con el bloque de configuración, así que la lectura
 * del principio basta. La familia Orca/Bambu/Creality lo cierra, después de todo
 * el G-code ejecutable: sobre un archivo real de Creality, `filament_type` está
 * en el offset 182.693 y `nozzle_temperature` en el 188.669, muy por debajo de
 * los 256 KiB que cubre el head. Leer solo el principio perdería esos datos y
 * devolvería "no se han encontrado metadatos" justo en el caso más habitual.
 *
 * El descarte de fragmentos va aquí y no en el tokenizador para que quien
 * consuma este texto no tenga que saber nada de tamaños de ventana: recibe
 * líneas enteras y puede partir por `\n` sin más.
 *
 * Decodificación: siempre UTF-8, sin intentar detectar Latin-1. Es una decisión
 * consciente y no un descuido. Todas las claves de los tres slicers son ASCII
 * (temperaturas, alturas, tiempos, flags), así que esos valores nunca se ven
 * afectados. El único campo con riesgo real es el material, cuyo nombre puede
 * llevar acentos; por eso el extractor lo sanea antes de usarlo en vez de
 * confiar en la decodificación.
 *
 * @param file Archivo `.gcode` / `.gco` seleccionado por el usuario.
 * @returns Hasta {@link HEADER_BYTES} * 2 de texto, sin líneas partidas.
 */
export async function readGcodeText(file: File): Promise<string> {
  const [head, tail] = await Promise.all([readGcodeHead(file), readGcodeTail(file)]);

  // El head está truncado exactamente cuando el archivo no cabe entero en él, y
  // el tail arranca en un offset > 0 bajo esa misma condición. Cuando el archivo
  // cabe, ambas ventanas son el archivo completo y no hay nada que descartar.
  const isTruncated = file.size > HEADER_BYTES;

  return `${dropTrailingFragment(head, isTruncated)}${HEAD_TAIL_SEPARATOR}${dropLeadingFragment(tail, isTruncated)}`;
}

/**
 * Quita la última línea si quedó cortada por el fin de la ventana del head.
 *
 * Un fragmento suelto es peor que un dato ausente: si la línea cortada es
 * `; filament used [g] = 12.3` cuando el valor real era `12.34`, la regex lo
 * aceptaría y devolvería un número silenciosamente incorrecto.
 */
function dropTrailingFragment(window: string, isTruncated: boolean): string {
  if (!isTruncated) return window;

  const lastNewline = window.lastIndexOf('\n');
  // Sin salto de línea el archivo sería una sola línea muy larga, caso
  // patológico: se devuelve la ventana tal cual porque no hay forma de saber
  // dónde empieza el fragmento.
  if (lastNewline === -1) return window;

  return window.slice(0, lastNewline);
}

/** Quita la primera línea del tail, que arranca en un offset arbitrario. */
function dropLeadingFragment(window: string, isTruncated: boolean): string {
  if (!isTruncated) return window;

  const firstNewline = window.indexOf('\n');
  if (firstNewline === -1) return window;

  return window.slice(firstNewline + 1);
}

/*
 * `SlicerKind` se declara en `./types` porque forma parte del contrato que
 * consumen los componentes. Se reexporta aquí para que quien hable de detección
 * de slicers no tenga que saber en qué archivo vive el tipo.
 */
export type { SlicerKind };

/**
 * Señal de detección: un comentario que solo escribe un slicer concreto.
 *
 * Cada señal lleva la razón por la que es discriminante, porque estas regex son
 * el punto donde este servicio se vuelve frágil: una clave demasiado genérica
 * (`; temperature = ...`) aparece en dos de los tres formatos y detectaría el
 * slicer equivocado.
 */
interface SlicerSignal {
  /** Patrón evaluado sobre la cabecera completa, con flags `mi`. */
  pattern: RegExp;
  /** Por qué este comentario identifica al slicer sin ambigüedad. */
  why: string;
}

/**
 * Señales de Cura, en orden de fiabilidad.
 *
 * Cura es el más fácil de identificar porque escribe comentarios en mayúsculas
 * separados por dos puntos (`;TIME:3600`), un estilo que Prusa y Orca no usan:
 * ellos escriben pares `clave = valor` en minúscula.
 */
const CURA_SIGNALS: readonly SlicerSignal[] = [
  {
    // La firma de versión es la señal más fuerte: solo Cura la escribe.
    pattern: /^;\s*Generated with Cura_SteamEngine\s+\S+/im,
    why: 'línea de firma de versión que solo emite CuraEngine',
  },
  {
    pattern: /^;\s*FLAVOR:\s*\S+/im,
    why: '`;FLAVOR:` es una directiva propia del gestor de perfiles de Cura',
  },
  {
    pattern: /^;\s*TIME:\s*\d+\s*$/im,
    why: 'clave `TIME:` en mayúsculas y sin espacios, estilo exclusivo de Cura',
  },
];

/**
 * Señales de PrusaSlicer / SuperSlicer.
 *
 * SuperSlicer es un fork de PrusaSlicer y conserva la cabecera tal cual, así que
 * comparten tabla en la Fase 3.
 */
const PRUSA_SIGNALS: readonly SlicerSignal[] = [
  {
    pattern: /^;\s*generated by PrusaSlicer\b/im,
    why: 'línea de firma que PrusaSlicer escribe en su G-code',
  },
  {
    pattern: /^;\s*generated by SuperSlicer\b/im,
    why: 'SuperSlicer es un fork de PrusaSlicer y firma con su propio nombre',
  },
  {
    // Prusa rotula el gramo como "used"; Orca usa "weight" (ver más abajo).
    pattern: /^;\s*total filament used \[g\]\s*=\s*\S/im,
    why: 'clave `total filament used [g]`, rotulación propia de PrusaSlicer',
  },
  {
    pattern: /^;\s*estimated printing time \(/im,
    why: 'parátesis en `estimated printing time (...)`, que Orca no escribe',
  },
];

/**
 * Señales de OrcaSlicer / BambuStudio.
 *
 * BambuStudio es un fork de OrcaSlicer y comparte cabecera, con la salvedad de
 * que Orca también emite claves de familia Prusa: el orden de las fases 2 y 3
 * tiene que respetar eso para no clasificarlos al revés.
 */
const ORCA_SIGNALS: readonly SlicerSignal[] = [
  {
    pattern: /^;\s*generated by OrcaSlicer\b/im,
    why: 'línea de firma que OrcaSlicer escribe en su G-code',
  },
  {
    pattern: /^;\s*generated by BambuStudio\b/im,
    why: 'BambuStudio es un fork de OrcaSlicer y firma con su propio nombre',
  },
  {
    // Sin esta señal, un G-code de Creality Print se clasifica como Prusa: el
    // fork escribe claves de la familia Prusa y rotula el gramo como
    // `filament used [g]`, que es la clave que distingue a Prusa de Orca. La
    // firma de versión es lo único inequívoco.
    pattern: /^;\s*generated by Creality_Print\b/im,
    why: 'línea de firma que Creality Print escribe en su G-code',
  },
  {
    // "weight" frente al "used" de Prusa: es el rasgo que los separa de verdad.
    pattern: /^;\s*total filament weight \[g\]\s*=\s*\S/im,
    why: 'clave `total filament weight [g]`, rotulación propia de OrcaSlicer',
  },
];

/**
 * Tablas de señales por slicer, indexadas por nombre.
 *
 * El `Record` es exhaustivo a propósito: añadir un slicer nuevo obliga a
 * declarar aquí su tabla de señales, que es justo lo que conviene no dejar para
 * más tarde.
 */
const SIGNALS_BY_SLICER: Record<Exclude<SlicerKind, 'unknown'>, readonly SlicerSignal[]> = {
  cura: CURA_SIGNALS,
  orca: ORCA_SIGNALS,
  prusa: PRUSA_SIGNALS,
};

/**
 * Orden en que se consultan las tablas de señales. Lista explícita, no el
 * orden de inserción de un objeto, porque la precedencia es una decisión de
 * diseño y no un accidente de iteración.
 *
 * El orden importa: Orca deriva de Prusa y escribe también claves de familia
 * Prusa (`nozzle_temperature`, `filament_type`), así que un archivo de Orca
 * cumpliría las señales débiles de Prusa. Por eso Orca se consulta antes: su
 * firma de versión y su clave `weight` son las que de verdad lo delatan, y una
 * vez que han fallado ya no hay mucho más que confundir.
 */
const DETECTION_ORDER: readonly Exclude<SlicerKind, 'unknown'>[] = ['cura', 'orca', 'prusa'];

/**
 * Identifica qué slicer generó el G-code a partir de su cabecera.
 *
 * Se detecta primero y la tabla correspondiente se aplica después, en lugar de
 * lanzar las tres a la vez: mezcladas, un archivo de Orca con
 * `nozzle_temperature` se interpretaría con las reglas de Prusa y su
 * `filament_type` acabaría leído con una convención que no es la suya.
 *
 * @param header Cabecera devuelta por {@link readGcodeText}.
 * @returns El slicer detectado, o `'unknown'` si no aparece ninguna señal fiable.
 */
export function detectSlicer(header: string): SlicerKind {
  for (const kind of DETECTION_ORDER) {
    const matched = SIGNALS_BY_SLICER[kind].some((signal) => signal.pattern.test(header));
    if (matched) return kind;
  }
  return 'unknown';
}

/**
 * Mensaje de error cuando la cabecera no contiene datos utilizables.
 *
 * Es el mismo texto que usa el panel en su estado `unsupported` para el caso
 * "es un G-code pero sin metadatos": el usuario ve el mismo motivo se detects o
 * no la cabecera, porque desde su punto de vista el fallo es el mismo.
 */
const NO_METADATA_MESSAGE =
  'No se han encontrado metadatos de impresión en la cabecera del archivo. Puede que el G-code esté truncado o que el slicer no escriba cabecera.';

/**
 * Convierte una duración en texto humano a segundos.
 *
 * Acepta `d`, `h`, `m` y `s` en cualquier orden y con espacios arbitrarios:
 * `"2d 3h"`, `"1h30m5s"` y `"45m"` valen lo mismo.
 *
 * Texto vacío o sin ninguna unidad reconocible devuelve 0 en lugar de lanzar.
 * La razón es que esta función responde a "qué dice el campo", y un campo
 * ausente no es un error de sintaxis: es un dato que no está. El extractor que
 * la llama es quien decide si un 0 es aceptable, y en el caso del tiempo de
 * impresión lo trata como ausencia de dato (ver `extractRequired`).
 *
 * @param text Valor tal cual aparece en la cabecera, p. ej. `"2m 56s"`.
 * @returns La duración en segundos, o 0 si no se reconoce ninguna unidad.
 */
function parseHumanDuration(text: string): number {
  const UNITS_PER_SECOND = { s: 1, m: 60, h: 3600, d: 86400 } as const;
  const DURATION_PATTERN = /(-?\d+(?:\.\d+)?)\s*([dhms])/gi;

  let seconds = 0;
  let found = false;
  for (const match of text.matchAll(DURATION_PATTERN)) {
    const [, amount, unit] = match;
    // Los dos grupos son obligatorios: si `matchAll` devolvió algo, están.
    if (amount === undefined || unit === undefined) continue;

    seconds += Number(amount) * UNITS_PER_SECOND[unit.toLowerCase() as keyof typeof UNITS_PER_SECOND];
    found = true;
  }

  return found ? seconds : 0;
}

/**
 * Extrae los metadatos de impresión de un archivo G-code.
 *
 * El flujo es deliberadamente lineal: leer dos ventanas, detectar el slicer y
 * aplicar solo la tabla de ese slicer. No hay lectura "por si acaso" de las tres,
 * porque cada familia usa convenciones distintas para el mismo concepto y una
 * lectura a ciegas devuelve valores de la convención equivocada.
 *
 * @param file Archivo `.gcode` / `.gco` seleccionado por el usuario.
 * @throws {Error} Si la extensión no corresponde a un G-code, o si la cabecera
 *   no contiene el material o el tiempo de impresión.
 */
export async function parseGcode(file: File): Promise<ProjectMetadata> {
  const isGcode = GCODE_EXTENSIONS.some((ext) =>
    file.name.toLowerCase().endsWith(ext)
  );
  if (!isGcode) {
    throw new Error(`"${file.name}" no es un archivo G-code válido.`);
  }

  const header = await readGcodeText(file);
  const slicer = detectSlicer(header);

  switch (slicer) {
    case 'cura':
      await wait(MOCK_LATENCY_MS);
      return extractCura(header, file.name);
    case 'prusa':
    case 'orca':
      await wait(MOCK_LATENCY_MS);
      return extractPrusaOrca(header, file.name);
    case 'unknown':
      break;
  }

  throw new Error(NO_METADATA_MESSAGE);
}

/**
 * Metadata que la cabecera debe aportar sí o sí para considerarse reconocida.
 *
 * Material y tiempo son los dos campos que los tres slicers escriben siempre.
 * Si falta alguno, la cabecera no es de un slicer conocido: puede estar
 * truncada, puede ser un G-code generado por una herramienta sin esos comentarios
 * o puede no ser un G-code. En los tres casos la respuesta honesta es no
 * devolver metadatos parciales, porque un panel con medio diagnóstico invita a
 * tomar decisiones sobre datos que en realidad no se han leído.
 */
interface RequiredMetadata {
  material: string;
  printTime: number;
}

/**
 * Valida los campos imprescindibles antes de devolver los metadatos.
 *
 * `printTime` cuenta como ausente cuando vale 0, porque `parseHumanDuration`
 * devuelve 0 tanto para "no hay clave" como para "la clave no se pudo leer". Si
 * ese 0 llegara al panel se pintaría como "0 min", que es un dato falso.
 *
 * @throws {Error} Con {@link NO_METADATA_MESSAGE} si falta alguno.
 */
function extractRequired(required: Partial<RequiredMetadata>): RequiredMetadata {
  const material = required.material;
  const printTime = required.printTime;

  const missingMaterial = material === undefined || material.length === 0;
  if (missingMaterial || printTime === undefined || printTime === 0) {
    throw new Error(NO_METADATA_MESSAGE);
  }

  return { material, printTime };
}

/**
 * Extrae la cabecera de Cura.
 *
 * Cura escribe comentarios en mayúsculas separados por dos puntos y sin
 * espacios alrededor: `;TIME:3600`, `;Layer height: 0.2`, `;Material: PLA`.
 */
function extractCura(header: string, filename: string): ProjectMetadata {
  const required = extractRequired({
    material: readCuraString(header, 'Material'),
    // Cura escribe el tiempo como un número plano de segundos (`;TIME:3600`),
    // no como texto con unidades, así que no pasa por `parseHumanDuration`: esa
    // función busca una letra de unidad y devolvería 0 para "3600".
    printTime: readCuraNumber(header, 'TIME') ?? 0,
  });

  // Cura solo informa de metros de filamento. Convertirlos a gramos exige la
  // densidad del material, que no siempre escribe en la cabecera, así que el
  // campo se deja sin definir en lugar de multiplicar por una densidad inventada.
  return {
    filename,
    slicer: 'cura',
    material: required.material,
    printTime: required.printTime,
    hotendTemp: readCuraNumber(header, 'PRINT_TEMPERATURE') ?? 0,
    bedTemp: readCuraNumber(header, 'BED_TEMPERATURE'),
    layerHeight: readCuraNumber(header, 'Layer height') ?? 0,
    hasOverhangs: readCuraBoolean(header, 'Support'),
  };
}

/**
 * Extrae la cabecera de la familia Prusa/Orca.
 *
 * Un único extractor para PrusaSlicer, SuperSlicer, OrcaSlicer, BambuStudio y
 * Creality Print. Todos descienden de la misma base y escriben pares
 * `clave = valor` en minúscula, pero los forks cambiaron el nombre de algunas
 * claves: Creality, por ejemplo, no escribe `bed_temperature` sino
 * `hot_plate_temp`. En vez de un extractor por producto —que se multiplica con
 * cada clon nuevo— se prueban las claves en orden y gana la primera que exista.
 */
function extractPrusaOrca(header: string, filename: string): ProjectMetadata {
  const required = extractRequired({
    material: readKeyValueString(header, 'filament_type'),
    printTime: parseHumanDuration(
      readKeyValueString(header, 'estimated printing time (normal mode)') ?? ''
    ),
  });

  return {
    filename,
    slicer: detectSlicer(header),
    material: required.material,
    printTime: required.printTime,
    hotendTemp: readKeyValueNumber(header, 'nozzle_temperature') ?? 0,
    bedTemp: readFirstKeyValueNumber(header, BED_TEMPERATURE_KEYS),
    layerHeight: readKeyValueNumber(header, 'layer_height') ?? 0,
    filamentUsed: readFirstKeyValueNumber(header, FILAMENT_GRAM_KEYS),
    hasOverhangs: readFirstKeyValueBoolean(header, SUPPORT_KEYS),
  };
}

/**
 * Claves de temperatura de cama, en orden de preferencia.
 *
 * `bed_temperature` es la canónica de la familia Prusa. Las de Creality Print
 * describen el tipo de placa en lugar de la temperatura (`hot_plate_temp`,
 * `cool_plate_temp`) y `customized_plate_temp` es una tercera variante. El orden
 * refleja cuál es más representativa: la canónica de Prusa, luego la de primera
 * capa, y solo al final las de placa.
 */
const BED_TEMPERATURE_KEYS = [
  'bed_temperature',
  'first_layer_bed_temperature',
  'hot_plate_temp',
  'cool_plate_temp',
  'customized_plate_temp',
] as const;

/**
 * Claves de filamento en gramos, en orden de preferencia.
 *
 * `total filament weight [g]` es la rotulación de Orca y sus forks;
 * `total filament used [g]` la de Prusa; `filament used [g]` la comparten
 * ambos. Ninguna de las tres da un peso total consolidado, por eso `filamentUsed`
 * toma la primera que exista y `filamentWeight` se deja sin definir: este slicer
 * no declara un peso por separado del consumo.
 */
const FILAMENT_GRAM_KEYS = [
  'total filament weight [g]',
  'total filament used [g]',
  'filament used [g]',
] as const;

/**
 * Claves de configuración de soportes, en orden de preferencia.
 *
 * `support_material` es la de la familia Prusa; `enable_support` la de Orca y
 * Creality.
 *
 * El valor refleja la **configuración** del slicer en el momento del laminado, no
 * la geometría real del cuerpo del G-code. Es una limitación conocida, no un
 * fallo: un archivo puede tener `enable_support = 0` y aun así contener
 * `;TYPE:Support interface`, porque esos comentarios los escribe la
 * climatización por objeto y no el flag global. Determinar si hay soportes de
 * verdad exigiría analizar la geometría, que es otro servicio.
 */
const SUPPORT_KEYS = ['support_material', 'enable_support'] as const;

/** Lee `; clave = valor` devolviendo el valor sin espacios, o `undefined`. */
function readKeyValueString(header: string, key: string): string | undefined {
  // Se ancla a la clave exacta y con `=` a la derecha para que no se cuele
  // `default_filament_type` cuando se busca `filament_type`, ni
  // `nozzle_temperature_initial_layer` cuando se busca `nozzle_temperature`.
  const pattern = new RegExp(`^;\\s*${escapeRegExp(key)}\\s*=\\s*(.+)$`, 'im');
  return cleanValue(header.match(pattern)?.[1]);
}

/** Lee `; clave = valor` como número, o `undefined` si no es un número válido. */
function readKeyValueNumber(header: string, key: string): number | undefined {
  const raw = readKeyValueString(header, key);
  if (raw === undefined) return undefined;

  const value = Number(raw);
  return Number.isFinite(value) ? value : undefined;
}

/** Lee `; clave = valor` como booleano, o `undefined` si no parece uno. */
function readKeyValueBoolean(header: string, key: string): boolean | undefined {
  const raw = readKeyValueString(header, key);
  if (raw === undefined) return undefined;

  const normalized = raw.toLowerCase();
  if (normalized === 'true' || normalized === '1' || normalized === 'yes') return true;
  if (normalized === 'false' || normalized === '0' || normalized === 'no') return false;
  return undefined;
}

/** Devuelve el valor de la primera clave de la lista que exista en la cabecera. */
function readFirstKeyValueNumber(header: string, keys: readonly string[]): number | undefined {
  for (const key of keys) {
    const value = readKeyValueNumber(header, key);
    if (value !== undefined) return value;
  }
  return undefined;
}

/** Igual que {@link readFirstKeyValueNumber} para booleanos. */
function readFirstKeyValueBoolean(
  header: string,
  keys: readonly string[]
): boolean | undefined {
  for (const key of keys) {
    const value = readKeyValueBoolean(header, key);
    if (value !== undefined) return value;
  }
  return undefined;
}

/** Lee `;Clave:valor` de Cura, devolviendo el valor sin espacios, o `undefined`. */
function readCuraString(header: string, key: string): string | undefined {
  const pattern = new RegExp(`^;\\s*${escapeRegExp(key)}\\s*:\\s*(.+)$`, 'im');
  return cleanValue(header.match(pattern)?.[1]);
}

/** Lee `;Clave:valor` de Cura como número, o `undefined`. */
function readCuraNumber(header: string, key: string): number | undefined {
  const raw = readCuraString(header, key);
  if (raw === undefined) return undefined;

  const value = Number(raw);
  return Number.isFinite(value) ? value : undefined;
}

/** Lee `;Clave:valor` de Cura como booleano, o `undefined`. */
function readCuraBoolean(header: string, key: string): boolean | undefined {
  const raw = readCuraString(header, key);
  if (raw === undefined) return undefined;

  const normalized = raw.toLowerCase();
  if (normalized === 'true' || normalized === '1' || normalized === 'yes') return true;
  if (normalized === 'false' || normalized === '0' || normalized === 'no') return false;
  return undefined;
}

/**
 * Limpia un valor recién leído de la cabecera.
 *
 * Además del recorte, descarta el carácter de reemplazo Unicode (`\uFFFD`),
 * que es lo que aparece cuando un byte no es UTF-8 válido. Como la lectura es
 * UTF-8 sin detección de Latin-1, un nombre de material con tilde o ñ mal
 * codificado llega aquí como `PLA \uFFFD` en lugar de romperse. Prefiero un
 * material visiblemente marcado antes que propagar un carácter basura a la API de
 * Jev, que compara el material por nombre.
 */
function cleanValue(raw: string | undefined): string | undefined {
  if (raw === undefined) return undefined;

  const cleaned = raw.replace(/[\uFFFD]/g, '').trim();
  return cleaned.length > 0 ? cleaned : undefined;
}

/** Escapa los metacaracteres de una clave para poder usarla dentro de una RegExp. */
function escapeRegExp(text: string): string {
  return text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}