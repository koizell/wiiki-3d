import type { Trayectoria } from '../services/GcodeTrayectoria';

/**
 * El color de cada tipo de rasgo.
 *
 * Diez tipos y diez colores. Se eligen de la paleta del sitio y de tres más que
 * hacen falta para distinguir los rellenos, que son los que más se parecen
 * entre sí: un relleno normal y un relleno interno tienen que poder distinguirse
 * de un vistazo o el color no informa.
 *
 * Vive aquí y no en el visor porque **lo usan dos visores**: el de la trayectoria
 * suelta y el de la malla con la trayectoria superpuesta. Que compartan el
 * vocabulario de colores no es una casualidad: es la misma trayectoria, y tiene
 * que hablar el mismo idioma en los dos sitios.
 */
export const COLOR_POR_TIPO: Record<string, string> = {
  'Outer wall': '#60a5fa',
  'Inner wall': '#3b82f6',
  'Overhang wall': '#f97316',
  'Top surface': '#22c55e',
  'Bottom surface': '#16a34a',
  'Internal solid infill': '#a855f7',
  'Gap infill': '#7c3aed',
  Bridge: '#ef4444',
  'Support interface': '#f59e0b',
  'Support material': '#fb923c',
  Custom: '#8b949e',
};

/** El color de los viajes: la cabeza se mueve sin dejar material. */
export const COLOR_VIAJE = '#39414d';

/**
 * La geometría de la trayectoria que **deposita material**, en coordenadas de cama.
 *
 * Son dos buffers planos —posiciones y colores— porque un G-code real tiene
 * cientos de miles de movimientos y un tubo por movimiento son millones de
 * triángulos. Con `LineSegments` el navegador los pinta de sobra.
 *
 * La continuidad de la línea es la parte que no se puede negociar: cada tramo
 * empieza donde acabó el anterior, o la trayectoria sale hecha trozos.
 */
export function geometriaTrayectoria(trayectoria: Trayectoria): {
  posiciones: Float32Array;
  colores: Float32Array;
} {
  const puntos: number[] = [];
  const colores: number[] = [];

  const color = { r: 0, g: 0, b: 0 };
  const aColor = (hex: string) => {
    color.r = parseInt(hex.slice(1, 3), 16) / 255;
    color.g = parseInt(hex.slice(3, 5), 16) / 255;
    color.b = parseInt(hex.slice(5, 7), 16) / 255;
  };

  let x = 0;
  let y = 0;
  let z = 0;

  for (const tramo of trayectoria.tramos) {
    const desde = [x, y, z];
    x = tramo.x;
    y = tramo.y;
    z = tramo.z;

    // Los viajes no se dibujan aquí: en la malla superpuesta serían un enredo de
    // líneas grises por encima de la pieza, sin informar de nada.
    if (tramo.viaje) continue;

    puntos.push(...desde, x, y, z);
    aColor(COLOR_POR_TIPO[tramo.tipo ?? ''] ?? '#8b949e');
    for (let v = 0; v < 2; v++) colores.push(color.r, color.g, color.b);
  }

  return {
    posiciones: new Float32Array(puntos),
    colores: new Float32Array(colores),
  };
}

/* ------------------------------------------------------------------------------------
 * Los modos de color
 * ---------------------------------------------------------------------------------- */

/** Lo que el color de un tramo quiere decir. */
export type ModoColor = 'tipo' | 'velocidad' | 'caudal';

/**
 * La rampa de calor.
 *
 * De frío a caliente, con los tonos de la propia aplicación: el azul del acento,
 * el verde del acierto, el ámbar del aviso y el rojo del peligro. Es la misma
 * escala que usa el panel de riesgo, y por eso el ojo la lee sin instrucciones.
 */
const RAMPA = ['#2563eb', '#60a5fa', '#22c55e', '#f59e0b', '#ef4444'];

/**
 * El color de un valor dentro de una escala.
 *
 * @param valor El valor.
 * @param min El mínimo de la escala.
 * @param max El máximo de la escala.
 */
export function colorDeEscala(valor: number, min: number, max: number): string {
  if (max <= min) return RAMPA[Math.floor(RAMPA.length / 2)];
  const t = Math.min(1, Math.max(0, (valor - min) / (max - min)));
  const pos = t * (RAMPA.length - 1);
  const indice = Math.floor(pos);
  const siguiente = Math.min(indice + 1, RAMPA.length - 1);
  const mezcla = pos - indice;
  return mezclaRampa(RAMPA[indice], RAMPA[siguiente], mezcla);
}

/** Mezcla dos colores hexadecimales. */
function mezclaRampa(a: string, b: string, t: number): string {
  const canal = (x: string, i: number) => parseInt(x.slice(i, i + 2), 16);
  const parte = (i: number) => {
    const ca = canal(a, i);
    const cb = canal(b, i);
    return Math.round(ca + (cb - ca) * t).toString(16).padStart(2, '0');
  };
  return `#${parte(1)}${parte(3)}${parte(5)}`;
}

/**
 * El mínimo y el máximo de una magnitud en la trayectoria, **por percentiles**.
 *
 * ## Por qué no el mínimo y el máximo de verdad
 *
 * Porque el máximo se lo lleva un puñado de tramos y **aplasta el resto de la
 * escala**. Con el caudal del fixture —pico de 68 mm³/s y media de 9— una escala
 * lineal de 1 a 68 deja la trayectoria entera en el azul frío: la rampa está
 *falta de información, aunque los datos sean distintos entre sí.
 *
 * La escala va del percentil 2 al 98: casi todos los tramos caen dentro y se ven
 * distintos entre sí, y los valores extremos se quedan en los extremos de la
 * rampa. Es lo que se hace con cualquier mapa de calor que tenga valores
 * extremos.
 *
 * @param tramos Los tramos.
 * @param modo La magnitud.
 */
export function escalaDe(
  tramos: Trayectoria['tramos'],
  modo: ModoColor
): { min: number; max: number } {
  const valores: number[] = [];
  for (const tramo of tramos) {
    if (tramo.viaje) continue;
    const valor = modo === 'velocidad' ? tramo.feed : modo === 'caudal' ? tramo.caudal : 0;
    if (valor > 0) valores.push(valor);
  }
  if (valores.length === 0) return { min: 0, max: 1 };

  valores.sort((a, b) => a - b);
  const percentil = (p: number) =>
    valores[Math.min(valores.length - 1, Math.max(0, Math.round((p / 100) * (valores.length - 1))))];

  const min = percentil(2);
  const max = percentil(98);
  if (max <= min) return { min, max: min + 1 };
  return { min, max };
}

/**
 * El tramo con más caudal, que es el que decide si la máquina puede imprimir.
 *
 * El caudal volumétrico máximo es **la cifra que limita una impresora**: por
 * encima de él, el filamento no llega y la capa sale mal. Saber **dónde** está
 * ese pico —en qué capa y haciendo qué— es lo que convierte una línea de colores
 * en un diagnóstico.
 */
export function picoDeCaudal(trayectoria: Trayectoria): {
  caudal: number;
  capa: number;
  tipo: string | null;
} | null {
  let pico: { caudal: number; capa: number; tipo: string | null } | null = null;
  for (const tramo of trayectoria.tramos) {
    if (tramo.viaje || tramo.caudal <= 0) continue;
    if (!pico || tramo.caudal > pico.caudal) {
      pico = { caudal: tramo.caudal, capa: tramo.capa, tipo: tramo.tipo };
    }
  }
  return pico;
}
