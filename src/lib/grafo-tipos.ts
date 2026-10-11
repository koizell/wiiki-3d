/**
 * Tipos del grafo de conocimiento.
 *
 * Van aparte de `grafo.ts` porque los necesita quien consume el grafo, y un `import`
 * de tipos no arrastra el módulo con su `import()` dinámico.
 */

/** Un tipo de nodo. Los valores están en `nodos.json → tiposNodo`. */
export type TipoNodo =
  | 'parametro'
  | 'material'
  | 'maquina'
  | 'chapa'
  | 'defecto'
  | 'metodo'
  | 'equipo'
  | 'sintoma'
  | 'fuente';

/** Qué significa la relación. */
export type TipoRelacion =
  | 'explica'
  | 'seResuelveCon'
  | 'contramedida'
  | 'contraindicado'
  | 'depende'
  | 'acota'
  | 'contrasta'
  | 'seExplicaEn';

export interface NodoBase {
  id: string;
  tipo: TipoNodo | string;
  nombre: string;
  resumen: string;
  /**
   * Campo del panel de análisis que este nodo explica, si alguno.
   *
   * Es lo que permite que la página mire **tu** archivo: el analizador ya extrae
   * estos campos del G-code, así que el artículo puede señalar el valor que tiene
   * el visitante sin adivinarlo.
   */
  campo?: string;
  /** Slug del artículo donde este nodo tiene su explicación larga. */
  seExplicaEn?: string;
}

export interface Relacion {
  desde: string;
  hacia: string;
  tipo: TipoRelacion | string;
  /** Por qué existe esta relación, y con qué alcance. Sin esto el grafo pierde contra el texto. */
  nota?: string;
  /** Ids de `fuentes`. Una relación sin fuente no afirma nada. */
  fuentes?: string[];
}

export interface FuenteGrafo {
  titulo: string;
  url: string;
  /** Ruta del fichero crudo donde se puede comprobar el dato. */
  raw: string;
  /** A qué se aplica y a qué no. Es lo que impide generalizar de más. */
  alcance?: string;
}

export interface Grafo {
  version: number;
  descripcion: string;
  nodos: NodoBase[];
  relaciones: Relacion[];
  fuentes: Record<string, FuenteGrafo>;
}
