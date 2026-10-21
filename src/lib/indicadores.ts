/*
 * Los indicadores: lo que convierte una lista de frases en un instrumento.
 *
 * ## Qué es un indicador
 *
 * Un glifo y una etiqueta. `subir` es «↑» y «subir»; `temperatura` es «°» y
 * «temperatura». Se pinta al lado de una acción, de una variable o de una tarjeta
 * de conocimiento, y con eso el lector sabe **de qué va** antes de leer una palabra.
 *
 * ## De dónde sale
 *
 * - **De una acción**, por su verbo. «Sube la temperatura de cama» es `subir`. No
 *   hay campo que escribir: el verbo ya está en el texto y escribirlo dos veces
 *   sería mantenerlo en dos sitios.
 * - **De una tarjeta o de una variable**, por su tema, que es una clasificación y
 *   no un dato. La tarjeta lo declara, porque el tema no se deduce del texto con
 *   fiabilidad.
 *
 * ## Por qué el vocabulario es cerrado
 *
 * Porque un verbo que la tabla no conoce es un verbo que se pinta sin indicador, y
 * eso es exactamente el muro de texto que este trabajo viene a quitar. `verify:guias`
 * hace fallar la acción con el verbo desconocido, así que la deuda se ve.
 *
 * ## Lo que esto NO es
 *
 * No es un dato. Un indicador no dice «tu cama está a 60 °C», dice «esto que viene
 * habla de temperatura». La cifra la pone `Conocimiento.cifra` y `Regla.valor`, que
 * son medidas, y que se pintan con su regla de alcance.
 */
import type { IndicadorAccion, IndicadorTema } from '../content/guias/tipos.ts';

/** Los doce verbos con los que se puede actuar sobre una impresión. */
export const INDICADORES_ACCION: readonly IndicadorAccion[] = [
  'subir',
  'bajar',
  'cambiar',
  'activar',
  'desactivar',
  'limpiar',
  'medir',
  'esperar',
  'ajustar',
  'mantener',
  'evitar',
  'instalar',
];

/** Los doce temas de los que puede hablar una tarjeta o una variable. */
export const INDICADORES_TEMA: readonly IndicadorTema[] = [
  'temperatura',
  'cama',
  'material',
  'altura',
  'velocidad',
  'calibracion',
  'slicer',
  'maquina',
  'entorno',
  'ventilacion',
  'geometria',
  'general',
];

/**
 * El glifo de cada indicador.
 *
 * Son todos del juego de caracteres de Unicode que ya está en el sitio, así que no
 * hace falta ni una fuente nueva ni un SVG: el mismo repertoire que usa `DibujoSintoma`
 * para las flechas de las esquinas.
 */
export const GLIFO: Record<IndicadorAccion | IndicadorTema, string> = {
  subir: '↑',
  bajar: '↓',
  cambiar: '⇄',
  activar: '⏻',
  desactivar: '⏼',
  limpiar: '✦',
  medir: '⌖',
  esperar: '⏱',
  ajustar: '⚙',
  mantener: '⊙',
  evitar: '⊘',
  instalar: '+',
  temperatura: '°',
  cama: '▤',
  material: '◈',
  altura: '↕',
  velocidad: '⏩',
  calibracion: '⊞',
  slicer: '⌘',
  maquina: '▣',
  entorno: '☁',
  ventilacion: '✧',
  geometria: '◰',
  general: '·',
};

/**
 * El nombre del indicador, para quien no ve el glifo.
 *
 * Se pinta en el `aria-label` y en el `title`, así que el glifo nunca es el único
 * canal de información.
 */
export const ETIQUETA: Record<IndicadorAccion | IndicadorTema, string> = {
  subir: 'subir',
  bajar: 'bajar',
  cambiar: 'cambiar',
  activar: 'activar',
  desactivar: 'desactivar',
  limpiar: 'limpiar',
  medir: 'medir',
  esperar: 'esperar',
  ajustar: 'ajustar',
  mantener: 'mantener',
  evitar: 'evitar',
  instalar: 'instalar',
  temperatura: 'temperatura',
  cama: 'cama',
  material: 'material',
  altura: 'altura',
  velocidad: 'velocidad',
  calibracion: 'calibración',
  slicer: 'slicer',
  maquina: 'máquina',
  entorno: 'entorno',
  ventilacion: 'ventilación',
  geometria: 'geometría',
  general: 'general',
};

/**
 * Normaliza un texto para buscarlo en las tablas.
 *
 * Quita mayúsculas y diacríticos, y deja la `ñ` como `n` —que es lo que hace
 * `normalize('NFD')`— para que la tabla no tenga que llevar acentos y el buscador
 * no tenga que acordarse de ellos.
 */
export function normalizar(texto: string): string {
  return texto
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim();
}

/**
 * La tabla de verbos.
 *
 * Está construida con los verbos que **de verdad** usan las 583 acciones escritas
 * hasta hoy, y no con una lista ideal: una tabla ideal no cubre ni la mitad de lo
 * que hay. Lo que no esté aquí es un verbo que hay que decidir a mano, y esa
 * decisión es la que hace que una acción sea una acción.
 */
const VERBOS: Record<string, IndicadorAccion> = {
  // Subir y bajar un valor.
  sube: 'subir',
  aumenta: 'subir',
  calienta: 'subir',
  eleva: 'subir',
  baja: 'bajar',
  reduce: 'bajar',
  bajes: 'bajar',

  // Cambiar una cosa por otra.
  usa: 'cambiar',
  usas: 'cambiar',
  pon: 'instalar',
  aplica: 'cambiar',
  selecciona: 'cambiar',
  elige: 'cambiar',
  cambia: 'cambiar',
  imprime: 'cambiar',
  pasa: 'cambiar',
  configura: 'cambiar',
  acepta: 'cambiar',
  convierte: 'cambiar',
  deshaz: 'cambiar',
  guarda: 'cambiar',
  carga: 'cambiar',
  compila: 'cambiar',
  controla: 'cambiar',
  extiende: 'cambiar',
  combina: 'cambiar',
  disena: 'cambiar',
  vuelve: 'cambiar',
  toma: 'cambiar',
  rota: 'cambiar',
  pinta: 'ajustar',
  haz: 'cambiar',
  alimenta: 'instalar',
  monta: 'instalar',
  coloca: 'instalar',

  // Encender y apagar.
  activa: 'activar',
  habilita: 'activar',
  abre: 'activar',
  lanza: 'activar',
  pulsa: 'activar',
  desactiva: 'desactivar',
  apaga: 'desactivar',
  deshabilita: 'desactivar',
  cierra: 'desactivar',
  bloquea: 'desactivar',
  para: 'desactivar',
  descarga: 'desactivar',

  // Limpiar.
  limpia: 'limpiar',
  seca: 'limpiar',
  lava: 'limpiar',
  lija: 'limpiar',
  desatasca: 'limpiar',
  elimina: 'limpiar',
  descarta: 'limpiar',
  saca: 'limpiar',

  // Medir y comprobar.
  comprueba: 'medir',
  calibra: 'medir',
  revisa: 'medir',
  mide: 'medir',
  prueba: 'medir',
  verifica: 'medir',
  calcula: 'medir',
  compara: 'medir',
  inspecciona: 'medir',
  confirma: 'medir',
  asegura: 'medir',
  busca: 'medir',
  considera: 'medir',
  mira: 'medir',
  recalibra: 'medir',
  recalcula: 'medir',
  ten: 'evitar',

  // Esperar.
  deja: 'esperar',
  repite: 'esperar',
  recalienta: 'esperar',
  reintenta: 'esperar',

  // Mantener como está.
  conserva: 'cambiar',
  manten: 'mantener',
  prioriza: 'cambiar',

  // Ajustar.
  ajusta: 'ajustar',
  ajuste: 'ajustar',
  alarga: 'ajustar',
  gestiona: 'ajustar',
  nivela: 'ajustar',
  aprieta: 'ajustar',
  reaprieta: 'ajustar',
  renivela: 'ajustar',
  afloja: 'ajustar',
  corrige: 'ajustar',
  orienta: 'ajustar',
  compensa: 'ajustar',
  fija: 'ajustar',
  taladra: 'ajustar',
  divide: 'ajustar',
  parte: 'ajustar',
  corta: 'ajustar',
  aleja: 'ajustar',
  initial: 'ajustar',

  // Evitar.
  no: 'evitar',
  evita: 'evitar',
  evites: 'evitar',

  // Instalar.
  anade: 'instalar',
  inserta: 'instalar',
  almacena: 'instalar',
  valora: 'cambiar',
  recuerda: 'medir',
};

/**
 * La cláusula inicial que se aparta antes de buscar el verbo.
 *
 * Muchas acciones empiezan por una condición —«Si el brim no basta,»— o por un
 * contexto —«En Cura,», «Con el AMS HT,»— y el verbo de verdad va después de la
 * coma. Sin apartar esa cláusula, «Si el brim no basta, añade una geometría…» se
 * leería como una acción que empieza por «si», que no dice nada.
 *
 * **La coma es obligatoria** en el patrón: sin ella, «Enciende el ventilador» —que
 * empieza por «en»— no se toca.
 */
const CLAUSULA_INICIAL =
  /^(?:si|en|con|para|cuando|segun)\b[^,]{0,90},\s*/i;

/**
 * El verbo de una acción, con la cláusula inicial apartada.
 *
 * @returns El verbo en minúsculas y sin diacríticos, o `null` si la acción no
 *   empieza por un verbo reconocible.
 */
export function primerVerbo(accion: string): string | null {
  const sinClausula = accion.replace(CLAUSULA_INICIAL, '');
  const primera = sinClausula.split(/\s+/)[0] ?? '';
  const limpio = normalizar(primera).replace(/[^a-z]/g, '');
  return limpio.length > 0 ? limpio : null;
}

/**
 * El indicador de una acción, deducido de su verbo.
 *
 * @param accion El texto de `Regla.accion`.
 * @returns El indicador, o `null` si el verbo no está en la tabla. Un `null` es un
 *   fallo de contenido, no un caso raro: significa que la acción no se puede leer
 *   como una acción.
 */
export function indicadorDeAccion(accion: string): IndicadorAccion | null {
  const verbo = primerVerbo(accion);
  if (verbo === null) return null;
  return VERBOS[verbo] ?? null;
}

/**
 * El indicador de una acción, con el declarado por encima del deducido.
 *
 * @param accion El texto de `Regla.accion`.
 * @param declarado El `Regla.indicador`, si lo hay.
 */
export function indicadorDeRegla(
  accion: string,
  declarado?: IndicadorAccion
): IndicadorAccion | null {
  return declarado ?? indicadorDeAccion(accion);
}

/**
 * La tabla de temas por identificador de variable.
 *
 * El `id` de una variable **es** su taxonomía: `cama`, `chapa`, `material`,
 * `ventilador`. Son las mismas palabras en todas las guías, y por eso el tema se
 * puede deducir del `id` sin preguntárselo a nadie.
 *
 * Una variable con un `id` que no está en esta tabla es una variable que la vista
 * no sabe pintar, y `verify:guias` la hace fallar. La lista es corta a propósito: las
 * 78 variables escritas cubren estos doce temas.
 */
export const TEMA_POR_VARIABLE: Record<string, IndicadorTema> = {
  // Material y filamento.
  material: 'material',
  densidad: 'material',
  filamento: 'material',

  // La cama y lo que se pone encima.
  chapa: 'cama',
  cama: 'cama',
  placa: 'cama',
  superficie: 'cama',

  // Temperaturas.
  boquilla: 'temperatura',
  hotend: 'temperatura',
  temperatura: 'temperatura',
  tempboquilla: 'temperatura',
  tempcama: 'temperatura',

  // Altura de capa y capas.
  altura: 'altura',
  alturacapa: 'altura',
  zcontouring: 'altura',
  primerascapas: 'altura',

  // Velocidad, caudal y aceleración.
  infill: 'velocidad',
  travelspeed: 'velocidad',
  ventana: 'entorno',
  corriente: 'velocidad',
  jerk: 'velocidad',
  aceleracion: 'velocidad',

  // Calibración y compensación.
  calibrada: 'calibracion',
  medicion: 'calibracion',
  sensor: 'calibracion',
  probe: 'calibracion',
  offset: 'calibracion',
  desplazamiento: 'calibracion',
  interpolacion: 'calibracion',
  cambiomecanico: 'calibracion',
  hold: 'calibracion',

  // El programa que laminó.
  slicer: 'slicer',
  orientacionslicer: 'slicer',
  perfil: 'slicer',
  generador: 'slicer',
  formato: 'slicer',

  // La máquina y su firmware.
  camara: 'maquina',
  extrusor: 'maquina',
  firmware: 'maquina',
  driver: 'maquina',
  psu: 'maquina',
  dispositivo: 'maquina',
  maquina: 'maquina',
  impresora: 'maquina',
  ams: 'maquina',

  // El entorno donde se imprime.
  humedad: 'entorno',
  ambiente: 'entorno',
  recinto: 'entorno',
  donde: 'entorno',
  entorno: 'entorno',
  traslado: 'entorno',

  // Refrigeración.
  ventilador: 'ventilacion',
  fan: 'ventilacion',
  enfriamiento: 'ventilacion',

  // La forma de la pieza.
  tamano: 'geometria',
  tamanoagujero: 'geometria',
  tipoagujero: 'geometria',
  forma: 'geometria',
  posicion: 'geometria',
  orientacion: 'geometria',
  ancho: 'geometria',
  paredes: 'geometria',
  esquinas: 'geometria',
  voladizo: 'geometria',
  voladizos: 'geometria',
  soporte: 'geometria',
  brim: 'geometria',

  // Lo que no es un tema: el estado y el objetivo.
  sintoma: 'general',
  problema: 'general',
  defecto: 'general',
  fallo: 'general',
  objetivo: 'general',
  uso: 'general',
  modo: 'general',
  carga: 'general',
  severidad: 'general',
};

/**
 * El tema de una variable, por su `id`.
 *
 * @returns El tema, o `null` si el `id` no está en la tabla.
 */
export function temaDeVariable(id: string): IndicadorTema | null {
  return TEMA_POR_VARIABLE[normalizar(id).replace(/[^a-z]/g, '')] ?? null;
}

/**
 * Las reglas de tema, por orden de prioridad.
 *
 * El orden importa: la primera que encaja gana, y las más específicas van primero.
 * «En la cama, la temperatura» es de cama y no de temperatura, y por eso cama está
 * antes; pero «ventilador» es de ventilación y no de máquina, y por eso ventilación
 * va antes que máquina.
 *
 * **Los patrones son estrechos a propósito.** La primera versión llevaba «ajuste» en
 * el patrón del slicer, y una tarjeta sobre por qué se levanta el PLA salía marcada
 * como «slicer» por la palabra «ajuste». Un patrón que se dispara con una palabra
 * suelta clasifica mal medio mundo, así que aquí cada patrón lleva la palabra que
 * de verdad significa esa cosa.
 */
const REGLAS_TEMA: readonly [RegExp, IndicadorTema][] = [
  [/ventilador|\bfan\b|refrigeraci|cooling/i, 'ventilacion'],
  [/calibr|primera capa|primera impresi|nivela|offset|compensaci|adhesi[oó]n|hold.?current/i, 'calibracion'],
  [/slicer|perfil de laminado|preferencias de laminado|orcaslicer|prusaslicer|bambustudio|\bcur[aA]\b.*\d/i, 'slicer'],
  [/impresora|m[aá]quina|firmware|driver|klipper|marlin|hardware|placa base|fuente de alimentaci|aceleraci[oó]n|jerk/i, 'maquina'],
  [/cama|chapa|\bpe[ií]\b|super ?tack|textured|smooth|cool plate|build ?plate/i, 'cama'],
  [/temperatur|hotend|boquilla|\u00b0c|calient|t[eé]rmic|contracci[oó]n|enfriamiento/i, 'temperatura'],
  [/altura de capa|grosor|resoluci[oó]n|primera capa/i, 'altura'],
  [/velocidad|caudal|\bflow\b|aceler|jerk|retract|extrusi[oó]n m[áa]x/i, 'velocidad'],
  [/material|filamento|\bpla\b|\bpetg\b|\babs\b|\basa\b|\btpu\b|\bpc\b|\bpa\b|nylon/i, 'material'],
  [/humedad|recinto|ambiente|entorno|c[aá]lida|fr[ií]o|cerca de la ventana/i, 'entorno'],
  [/esquina|voladizo|geometr|agujero|pared|superficie|tama[nñ]o|forma|brim|raft|skirt/i, 'geometria'],
];

/**
 * El tema de una tarjeta de conocimiento, deducido de su texto.
 *
 * Se usa **sólo** para migrar: el tema que se escribe en el fichero es el que
 * manda. La deducción existe para no tener que decidir 520 tarjetas a mano, y
 * queda en el código para que la decisión sea revisable.
 *
 * @returns El tema deducido, o `'general'` si nada encaja.
 */
export function temaDeTarjeta(titulo: string, cuerpo: string): IndicadorTema {
  const texto = `${titulo} ${cuerpo}`;
  for (const [patron, tema] of REGLAS_TEMA) {
    if (patron.test(texto)) return tema;
  }
  return 'general';
}
