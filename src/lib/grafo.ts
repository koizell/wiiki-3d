/**
 * Consultas al grafo de conocimiento.
 *
 * ## Por qué existe esto y no un article más
 *
 * El problema que cramping a la wiki no era escribir bien: era que **cada artículo
 * repetía los mismos hechos**. La temperatura del PETG aparece en el artículo de cama,
 * en el de warping y en el de adhesión, y cada vez con una redacción distinta. Eso
 * es lo que el lector percibe como «copia y pega», y es un problema real: cuando dos
 * páginas dicen cosas distintas sobre lo mismo, no hay forma de saber cuál tiene
 * razón.
 *
 * La solución no es escribir con más cuidado. Es **que el hecho no viva en el
 * artículo**. Vive aquí, una vez, con su fuente y su alcance. El artículo pasa a ser
 * una vista: selecciona nodos y los enseña. Dos artículos que mencionan lo mismo no
 * pueden divergir, porque no lo escriben: lo referencian.
 *
 * De ahí salen las tres cosas que hacen que una página deje de ser un texto:
 *
 * 1. **Las referencias cruzadas son reales.** Un nodo usado en tres páginas muestra
 *    las tres. La navegación interna no es un mapa escrito a mano que se desincroniza:
 *    sale de las aristas.
 * 2. **El artículo sabe qué mirar en tu archivo.** Cada nodo puede declarar un `campo`,
 *    y eso es un campo que el analizador ya extrae del G-code. La página puede decir
 *    «tu cama está a 0» sin inventarlo, porque lo ha leído.
 * 3. **Las discrepancias se publican enteras.** La relación `contrasta` existe para que
 *    dos fuentes que no coincidan convivan con las dos respuestas, en lugar de que
 *    alguien elija una en silencio.
 *
 * ## Por qué el grafo se carga aparte
 *
 * `import.meta.glob` en modo `eager` traería el JSON al chunk inicial, y el visitante
 * que sólo sube un archivo no necesita el grafo. Se carga con `import()` cuando un
 * artículo lo pide, y el resultado se cachea para que la segunda vista no espere.
 */

import type { Grafo } from './grafo-tipos';

let cache: Promise<Grafo> | null = null;

/** Carga el grafo una vez y lo reutiliza. */
export function cargarGrafo(): Promise<Grafo> {
  if (!cache) {
    cache = import('../../wiki/grafo/nodos.json').then((m) => {
      const datos = (m as { default: unknown }).default ?? m;
      return normalizar(datos as Grafo);
    });
  }
  return cache;
}

function normalizar(grafo: Grafo): Grafo {
  const porId = new Map(grafo.nodos.map((n) => [n.id, n]));
  // Una relación que apunte a un nodo inexistente es un dato roto, no un detalle
  // de presentación: se avisa en consola al cargar y se descarta, para que una
  // página no/#{n} encuentre nunca un href vacío.
  const relaciones = grafo.relaciones.filter((r) => {
    const ok = porId.has(r.desde) && porId.has(r.hacia);
    if (!ok) console.warn(`[grafo] relación descartada, nodo inexistente: ${r.desde} → ${r.hacia}`);
    return ok;
  });
  return { ...grafo, relaciones };
}

/** Nodo por id, o `undefined`. */
export function nodo(grafo: Grafo, id: string) {
  return grafo.nodos.find((n) => n.id === id);
}

/**
 * Nodos de un tipo, en el orden del fichero.
 *
 * El orden es el del fichero y no uno calculado: el orden de un diagrama lo decide
 * quien lo escribe, y una lista alfabética pierde el hilo de una explicación.
 */
export function nodosDe(grafo: Grafo, tipo: string) {
  return grafo.nodos.filter((n) => n.tipo === tipo);
}

/**
 * A qué otras páginas se explica este nodo.
 *
 * Es la navegación interna, y sale de las aristas en lugar de de un mapa escrito a
 * mano. Un artículo al que se enlaza desde el grafo tiene que existir: si no, el
 * enlace es un roto y `verify:wiki` lo detecta.
 */
export function aristasDesde(grafo: Grafo, id: string) {
  return grafo.relaciones
    .filter((r) => r.desde === id)
    .map((r) => ({ ...r, nodo: nodo(grafo, r.hacia) }))
    .filter((r): r is typeof r & { nodo: NonNullable<typeof r.nodo> } => Boolean(r.nodo));
}

/** A qué páginas chega este nodo. */
export function aristasHacia(grafo: Grafo, id: string) {
  return grafo.relaciones
    .filter((r) => r.hacia === id)
    .map((r) => ({ ...r, nodo: nodo(grafo, r.desde) }))
    .filter((r): r is typeof r & { nodo: NonNullable<typeof r.nodo> } => Boolean(r.nodo));
}

/** Nodos que un campo del panel de análisis puedespotlight. */
export function nodosPorCampo(grafo: Grafo, campo: string) {
  return grafo.nodos.filter((n) => 'campo' in n && n.campo === campo);
}
