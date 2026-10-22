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
