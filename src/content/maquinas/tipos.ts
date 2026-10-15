/**
 * El catálogo de máquinas: qué es cada modelo y de dónde sale cada cifra.
 *
 * ## Por qué esto es un dato y no una guía
 *
 * Una guía explica un síntoma y calcula acciones. Una máquina es **un dato con
 * origen**: su ficha decide qué filamento cabe, a qué velocidad se mueve y qué
 * fallos va a tener. Si la ficha no está verificada, la simulación miente.
 *
 * ## La regla del origen
 *
 * Cada cifra lleva su origen, y hay tres:
 *
 * - `F` — la ha publicado el fabricante (su página de producto o su ficha).
 * - `T` — la ha publicado un tercero que compara máquinas, no quien la vende.
 * - `P` — **pendiente**: nadie la ha verificado todavía. Se declara pendiente en
 *   lugar de escribir la cifra que "suena bien", que es exactamente cómo un
 *   catálogo se llena de mentiras plausibles.
 *
 * El pipeline (`recolector → cocinero → revisor`) es quien convierte una `P` en
 * `F` o `T`, con su fuente en `fuentes`. Hasta entonces, la interfaz debe
 * mostrar la `P` como pendiente, no como dato.
 */

/** Las familias cinemáticas que la ilustración sabe dibujar. */
export type Familia = 'bed-slinger' | 'corexy-cerrada' | 'corexy-abierta' | 'resina';

/** De dónde sale una cifra. Ver la regla del origen en la cabecera. */
export type OrigenDato = 'F' | 'T' | 'P';

/** Una máquina del catálogo. */
export interface Maquina {
  /** Identificador estable para URLs y selects. */
  slug: string;
  marca: string;
  modelo: string;
  familia: Familia;
  /**
   * Cerrada = con cerramiento (cámara). Determina el warping de ABS/ASA.
   *
   * `null` = **no está verificado**. No es `false`: decir que una máquina está
   * abierta es una afirmación, y sin fuente no se hace. La consecuencia práctica
   * es que la compatibilidad con materiales que necesitan cámara no se puede
   * determinar, y la interfaz lo dice en vez de elegir una.
   */
  cerrada: boolean | null;
  /** Color de carcaja en la ilustración (hex). */
  color: number;
  /** Color de acento (pantalla, tirador, logos) en la ilustración. */
  acento: number;
  /** Precio de referencia en texto, para la ficha. No es una recomendación. */
  precioRef: string;
  /** Dimensiones exteriores en cm. `null` = pendiente de fichar. */
  dims: [number, number, number] | null;
  /** Volumen útil en mm (X × Y × Z). */
  vol: [number, number, number];
  /** Velocidad máxima declarada en mm/s. `null` = no aplica (resina) o pendiente. */
  velMax: number | null;
  /** Temperatura máxima de boquilla en °C. `null` = no aplica (resina). */
  tNozMax: number | null;
  /** Temperatura máxima de cama en °C. `null` = no aplica (resina). */
  tCamaMax: number | null;
  extrusor: string | null;
  boquilla: string;
  nivelacion: string | null;
  sensorFilamento: boolean;
  /**
   * Origen por campo, con las mismas claves que los campos de arriba.
   *
   * `null` significa "este campo no aplica a esta máquina" (la resina no tiene
   * temperatura de boquilla), que es distinto de `P` ("aplica y está pendiente")
   * y de no declararlo ("no se ha pensado en este campo").
   *
   * `familia` y `cerrada` están aquí **a propósito**: son los dos campos que
   * deciden la física —la cinemática dibuja la máquina y el cerramiento decide si
   * un material warpea—, y eran los únicos sin origen declarado. Un booleano sin
   * fuente es una afirmación disfrazada de dato.
   *
   * Regla que `verify:maquinas` comprueba: **un campo con origen `P` no puede
   * llevar valor**. Llevar los dos es mostrar «120 °C · pendiente de fichar», que
   * se contradice a sí mismo.
   */
  origen: Partial<Record<'familia' | 'cerrada' | 'dims' | 'vol' | 'velMax' | 'tNozMax' | 'tCamaMax' | 'extrusor' | 'nivelacion', OrigenDato | null>>;
  /** Fuentes que respaldan la ficha. Vacío = todo pendiente. */
  fuentes: { url: string; titulo: string; origen: OrigenDato }[];
  /**
   * Los rasgos que la ilustración dibuja de este modelo, y de dónde salen.
   *
   * **Sólo lo que una fuente afirma.** Cada rasgo apunta a su origen y a la
   * fuente concreta; si ninguna fuente lo dice, el rasgo no está y la
   * ilustración usa el valor neutro de su familia. Es la misma regla de la ficha
   * aplicada al dibujo: un rasgo inventado es una ficha inventada con más
   * trabajo.
   *
   * Los rasgos disponibles son los que se distinguen en un esquema de frente o de
   * lado, que es lo que esta ilustración dibuja.
   */
  rasgos: RasgosDibujo;
}

/**
 * Los rasgos que cambian el dibujo de una máquina.
 *
 * Todos son opcionales: `false`/ausente significa «este modelo no lo tiene o no
 * está verificado», y la ilustración pinta la silueta neutra de su familia. No
 * hay un valor «por defecto del modelo» que invente lo que la calla.
 */
export interface RasgosDibujo {
  /** Dos ventiladores de refrigeración de pieza, uno a cada lado del cabezal. */
  ventiladoresDobles?: boolean;
  /** Carril lineal en X, en vez de varilla con rodamientos. */
  carrilLinealX?: boolean;
  /** Bobina alojada en un hueco lateral de la máquina, a ras. */
  bobinaLateral?: boolean;
  /** Filtro de carbón activado visible en un lateral. */
  filtroCarbon?: boolean;
  /** Alimentador integrado con varias bobinas dentro de la máquina. */
  ifsBobinas?: number;
  /** Tres husillos en Z, en vez de uno. */
  zTriple?: boolean;
  /** Pantalla táctil, en vez de botonera con pantalla pequeña. */
  pantallaTactil?: boolean;
}

/** Un filamento: genérico por familia, o de marca con perfil propio. */
export interface Filamento {
  id: string;
  nombre: string;
  /** `null` = genérico; si no, la marca que publica el perfil. */
  marca: string | null;
  familia: string;
  /** Rango de boquilla en °C. */
  noz: [number, number];
  /** Rango de cama en °C. */
  cama: [number, number];
  /** Si se puede imprimir en máquina abierta (determina el warping). */
  abierta: boolean;
}

/** Los campos que la ficha muestra, en el orden en que se leen. */
export const CAMPOS_FICHA: (keyof Maquina)[] = [
  'familia', 'vol', 'dims', 'velMax', 'tNozMax', 'tCamaMax', 'extrusor', 'nivelacion', 'sensorFilamento',
];

/** Texto del origen, para no repetir el mapa en cada componente. */
export const TEXTO_ORIGEN: Record<OrigenDato, string> = {
  F: 'fabricante',
  T: 'terceros',
  P: 'pendiente de fichar',
};
