/*
 * Los imports llevan extensión por el mismo motivo que en `lib/guias.ts`: este
 * módulo lo importa `scripts/verify/guias.mjs` en Node con `--experimental-strip-types`,
 * y el resolver de Node exige la extensión explícita. La de los tipos es un
 * `import type`, que desaparece al compilar, así que nada de `src/services/` entra
 * en el bundle por este fichero.
 */
import type { Guia } from '../content/guias/tipos.ts';
import type { JevClassification, ProjectMetadata, SlicerKind } from '../services/types.ts';

/**
 * La barra «Tu archivo»: los datos del archivo que ha subido quien lee, y dónde
 * se explican dentro de esta guía.
 *
 * ## Por qué la barra no pinta los datos del panel entero
 *
 * Porque la guía no los explica todos. `temperatura-cama` explica la temperatura
 * de cama y no explica el peso de filamento; enseñarle el peso sería un dato
 * certaino que no lleva a ninguna parte, y una fila que no lleva a ninguna parte
 * es ruido con apariencia de información. La lista sale de lo que la guía
 * declara —`leeDelAnalisis` y `campos`— y de nada más, así que **añadir un campo a
 * la barra es escribir su nombre en la guía**.
 *
 * ## Por qué el valor ausente es `null` y no «0» ni «—»
 *
 * Porque son tres cosas distintas y el archivo sólo tiene dos. `undefined` es
 * «el slicer no lo escribió»; `0` es un valor real, y en `bedTemp` es físicamente
 * imposible, igual que en cualquier otra temperatura. Y el guion del panel no se
 * reutiliza aquí: en el panel significa «todavía no hay dato», y en la barra
 * acabaría diciendo dos cosas distintas con un mismo símbolo, que es exactamente
 * como se pierde la diferencia entre «no medido» y «medido y es cero».
 *
 * ## Por qué el enlace sale de los datos y no de una convención sobre nombres
 *
 * Porque los nombres no coinciden. La variable `cama` de `warping-pla` recoge
 * `bedTemp`; en `temperatura-cama` la que lo recoge es `material`, porque sus
 * opciones llevan escrito el rango de cama de cada filamento. Inferirlo del nombre
 * mandaría el dato a un sitio distinto en cada guía, y sólo una de las dos sería
 * la correcta.
 *
 * Y un campo sin ancla declarada **no recibe enlace**: se dice el valor y punto.
 * Un enlace a la sección equivocada es peor que ningún enlace, porque parece que
 * la guía explica ese dato cuando no lo explica.
 */

/** De dónde sale el dato: del archivo que se subió, o del diagnóstico. */
export type OrigenDato = 'archivo' | 'panel';

/** Un dato del archivo, tal como lo pinta la barra. */
export interface DatoTuArchivo {
  /** El nombre del campo en `ProjectMetadata` o `JevClassification`. */
  campo: string;
  /** Cómo se llama en la barra. */
  etiqueta: string;
  /** El valor ya formateado, o `null` si el archivo no lo trae. */
  valor: string | null;
  /** `#v-…` o `#c-…` de donde se explica, o `null` si esta guía no lo explica. */
  ancla: string | null;
  /** De dónde sale, y por eso cambia el texto cuando falta. */
  origen: OrigenDato;
}

/** Lo que la barra tiene que pintar. */
export interface LecturaTuArchivo {
  datos: DatoTuArchivo[];
  /** Cuántos traen valor. El resto se enseña como ausentes, nunca como 0. */
  conValor: number;
  /** Cuántos son campos del diagnóstico y no del archivo subido. */
  delPanel: number;
}

/** El prefijo del ancla de una variable. Vive aquí y en ninguna parte más. */
const PREFIJO_VARIABLE = 'v-';
/** El prefijo del ancla de una tarjeta de conocimiento. */
const PREFIJO_CONOCIMIENTO = 'c-';

/**
 * El `id` de una variable en el DOM, sin la almohadilla.
 *
 * Vive aquí y no en el componente por una razón concreta: el `href` de la barra y
 * el `id` del `fieldset` tienen que salir de la misma función. Con dos cadenas
 * escritas en dos ficheros, cambiar el prefijo en uno deja la otra con enlaces
 * apuntando a `#v-…` que ya no existe, y eso no da ningún error visible: el
 * enlace simplemente no hace nada.
 */
export function idVariable(id: string): string {
  return `${PREFIJO_VARIABLE}${id}`;
}

/** El `id` de una tarjeta de conocimiento, sin la almohadilla. */
export function idConocimiento(id: string): string {
  return `${PREFIJO_CONOCIMIENTO}${id}`;
}

/** El ancla de una variable, tal como va en el `href`. */
export function anclaVariable(id: string): string {
  return `#${idVariable(id)}`;
}

/** El ancla de una tarjeta de conocimiento, tal como va en el `href`. */
export function anclaConocimiento(id: string): string {
  return `#${idConocimiento(id)}`;
}

/** Lo que hay que saber de un campo para enseñarlo, y cómo se formatea. */
interface DefinicionCampo {
  etiqueta: string;
  origen: OrigenDato;
  /**
   * El valor formateado, o `null` si el archivo no lo trae.
   *
   * Devolver `null` en vez de un texto de ausencia es deliberado: quien decide
   * cómo se escribe la ausencia es la barra, y depende de si lo que falta es una
   * cabecera del G-code o un diagnóstico que no se ha hecho.
   */
  valor: (metadata: ProjectMetadata | null, classification: JevClassification | null) => string | null;
}

/** La coma decimal, que es la del resto de la app y la que se ve en las cifras. */
function decimal(valor: number, decimales: number): string {
  return valor.toFixed(decimales).replace('.', ',');
}

/**
 * Cómo se llama en la barra cada valor de `SlicerKind`.
 *
 * El nombre de la familia, y no el del programa, porque **el analizador no
 * siempre puede distinguirlos**: OrcaSlicer, Bambu Studio y los forks de
 * Creality comparten el formato de cabecera, y PrusaSlicer y SuperSlicer
 * también. Escribir «OrcaSlicer» sobre un fichero de Bambu Studio sería
 * atribuir el archivo a un programa que no lo generó, que es exactamente lo que
 * el tipo `SlicerKind` dice que no se hace. La guía de `slicer` explica el
 * agrupamiento.
 */
const SLICER_LABEL: Record<SlicerKind, string> = {
  cura: 'Cura',
  prusa: 'PrusaSlicer',
  orca: 'Orca / Bambu Studio',
  unknown: 'Desconocido',
};

/**
 * El nombre con el que se enseña el slicer detectado, o el valor tal cual.
 *
 * Vive aquí y lo importa el panel, para que la fila del panel y la fila de la
 * barra no puedan decir dos cosas distintas del mismo campo. Es un `import` de
 * valor y no de tipo, y no cuesta bundle: este módulo no importa contenido.
 */
export function etiquetaSlicer(kind: SlicerKind | undefined): string | undefined {
  return kind ? SLICER_LABEL[kind] ?? kind : undefined;
}

/**
 * Los campos de los dos contratos de datos, con su etiqueta y su formato.
 *
 * La lista está completa a propósito, no sólo los que hoy usan las cuatro guías:
 * `altura-capa` y `temperatura-hotend` son las dos siguientes del backlog y
 * declaran `layerHeight` y `hotendTemp`. Añadir una guía que use uno de estos
 * campos es escribir su nombre, y no tocar este fichero.
 *
 * El orden de las claves no es el de `types.ts` y no importa: lo que se pinta es
 * el orden de `leeDelAnalisis` y `campos`, que es el de cada guía.
 */
const CAMPOS: Record<string, DefinicionCampo> = {
  material: {
    etiqueta: 'Material',
    origen: 'archivo',
    /*
     * Tal cual lo escribió el slicer, sin mapear a las opciones de la guía.
     *
     * Mapearlo es lo que hace `precontestar`, y allí tiene sentido porque el
     * resultado es una casilla marcada. Aquí el dato no es una elección de quien
     * lee sino una lectura: «Resina XYZ» es lo que dice la cabecera, y escribir
     * otra cosa sería corregir el archivo sin avisar. Si la guía no cubre ese
     * material, el enlace sigue llevando a la variable donde se declararía —que
     * tampoco tiene esa opción—, y por eso el texto de la barra no promete que
     * la guía lo cubra.
     */
    valor: (m) => (m?.material ? m.material : null),
  },
  slicer: {
    etiqueta: 'Slicer',
    origen: 'archivo',
    /*
     * Obligatorio en `ProjectMetadata`, así que jamás es una fila ausente. En la
     * práctica tampoco llega a valer «Desconocido»: un G-code cuya cabecera no
     * trae la firma de ninguna de las tres familias no produce metadatos —el
     * parseo se detiene con un aviso— y la barra no se llega a pintar. La
     * etiqueta existe porque `SlicerKind` la declara y el `Record` la exige, no
     * porque se espere verla.
     */
    valor: (m) => (m?.slicer ? SLICER_LABEL[m.slicer] : null),
  },
  bedTemp: {
    etiqueta: 'Cama',
    origen: 'archivo',
    valor: (m) => (typeof m?.bedTemp === 'number' ? `${m.bedTemp} °C` : null),
  },
  hotendTemp: {
    etiqueta: 'Hotend',
    origen: 'archivo',
    valor: (m) => (typeof m?.hotendTemp === 'number' ? `${m.hotendTemp} °C` : null),
  },
  layerHeight: {
    etiqueta: 'Altura de capa',
    origen: 'archivo',
    valor: (m) => (typeof m?.layerHeight === 'number' ? `${decimal(m.layerHeight, 2)} mm` : null),
  },
  filamentUsed: {
    etiqueta: 'Filamento',
    origen: 'archivo',
    valor: (m) => (typeof m?.filamentUsed === 'number' ? `${decimal(m.filamentUsed, 2)} g` : null),
  },
  filamentWeight: {
    etiqueta: 'Peso total',
    origen: 'archivo',
    valor: (m) => (typeof m?.filamentWeight === 'number' ? `${decimal(m.filamentWeight, 2)} g` : null),
  },
  hasOverhangs: {
    etiqueta: 'Soportes en el perfil',
    origen: 'archivo',
    /*
     * `false` se enseña como «No», y `undefined` como ausente. Es la distinción que
     * el panel ya hace y la que importa: «el slicer no escribió el flag» no es
     * «el slicer dijo que no hay soportes», y con una pieza que sí los lleva en el
     * G-code la diferencia es si hay que buscarlos o no.
     */
    valor: (m) => (typeof m?.hasOverhangs === 'boolean' ? (m.hasOverhangs ? 'Sí' : 'No') : null),
  },
  overhangAngle: {
    etiqueta: 'Voladizo más crítico',
    origen: 'archivo',
    valor: (m) => (typeof m?.overhangAngle === 'number' ? `${m.overhangAngle}°` : null),
  },
  warpingRisk: {
    etiqueta: 'Riesgo de warping',
    origen: 'panel',
    /*
     * `warpingRisk` va de 0 a 1 en `JevClassification` y el panel lo enseña en
     * porcentaje. Aquí se hace lo mismo con un redondeo explícito, porque la barra
     * es la única vista de este dato en las rutas de la wiki —el panel no se
     * monta ahí— y si las dos cifras seieran de otra forma serían dos datos.
     */
    valor: (_m, c) =>
      typeof c?.warpingRisk === 'number' ? `${Math.round(c.warpingRisk * 100)} %` : null,
  },
  riskLevel: {
    etiqueta: 'Nivel de riesgo',
    origen: 'panel',
    valor: (_m, c) => c?.riskLevel ?? null,
  },
};

/** El nombre de un campo del panel, o `null` si esta app no tiene ese campo. */
export function etiquetaCampo(campo: string): string | null {
  return CAMPOS[campo]?.etiqueta ?? null;
}

/**
 * Los campos que la guía declara, en el orden en que los declara.
 *
 * Primero lo que **lee** del archivo y después lo que **explica** del panel, y sin
 * repetir: `warping-pla` lee `material` y `bedTemp` y explica `warpingRisk` y
 * `riskLevel`, que es el orden en que tienen sentido —primero lo que ya sabes de
 * tu archivo, después el veredicto que le pone la app.
 *
 * Un campo que la guía declara y esta tabla no conoce **se queda, pero sin datos**:
 * no se descarta en silencio, porque un nombre mal escrito tiene que verse, y
 * `verify:guias` lo detecta contra `src/services/types.ts` y contra esta misma
 * tabla. Aquí sale como una fila sin etiqueta ni valor, que es un fallo visible en
 * lugar de una barra más corta de lo que debía.
 */
export function camposDeLaGuia(guia: Guia): string[] {
  return [...new Set([...(guia.leeDelAnalisis ?? []), ...(guia.campos ?? [])])];
}

/**
 * De cada campo que la guía declara, dónde se explica.
 *
 * Primero variables y después tarjetas, y en el orden de la guía dentro de cada
 * grupo. El orden no es decorativo: si un campo aparece en las dos listas, gana la
 * variable, porque lo que quien lee necesita **declarar** va antes que lo que
 * necesita **entender**, y el que tiene la variable ya está marcado por
 * `precontestar` al entrar.
 *
 * Dos elementos con el mismo campo y anclas distintas es un error de datos, no una
 * ambigüedad tolerable: quien pulse el enlace iría a una de las dos explanations
 * según el orden de escritura. `verify:guias` lo hace fallar; aquí gana la primera
 * y el aviso está en la comprobación, no en una excepción en producción.
 */
export function anclasDeCampos(guia: Guia): Record<string, string> {
  const anclas: Record<string, string> = {};
  for (const variable of guia.variables) {
    for (const campo of variable.campos ?? []) {
      if (!(campo in anclas)) anclas[campo] = anclaVariable(variable.id);
    }
  }
  for (const tarjeta of guia.conocimiento) {
    for (const campo of tarjeta.campos ?? []) {
      if (!(campo in anclas)) anclas[campo] = anclaConocimiento(tarjeta.id);
    }
  }
  return anclas;
}

/**
 * Qué se pinta en la barra, y a dónde lleva cada dato.
 *
 * Sin archivo devuelve una lectura vacía, y no una barra con guiones: quien llega
 * por un buscador no ha subido nada, y una fila vacía con el título «Tu archivo» es
 * una promesa que la página no puede cumplir. Es también lo que deja el HTML
 * exportado sin la barra, porque allí el contexto de análisis arranca vacío.
 */
export function leerTuArchivo(
  guia: Guia,
  metadata: ProjectMetadata | null,
  classification: JevClassification | null
): LecturaTuArchivo {
  if (!metadata) return { datos: [], conValor: 0, delPanel: 0 };

  const anclas = anclasDeCampos(guia);
  const datos: DatoTuArchivo[] = [];

  for (const campo of camposDeLaGuia(guia)) {
    const definicion = CAMPOS[campo];
    datos.push({
      campo,
      etiqueta: definicion?.etiqueta ?? campo,
      valor: definicion ? definicion.valor(metadata, classification) : null,
      ancla: anclas[campo] ?? null,
      origen: definicion?.origen ?? 'archivo',
    });
  }

  return {
    datos,
    conValor: datos.filter((d) => d.valor !== null).length,
    delPanel: datos.filter((d) => d.origen === 'panel').length,
  };
}

/** Cuántos datos de la lectura son un enlace, para el texto de la barra. */
export function enlazados(lectura: LecturaTuArchivo): number {
  return lectura.datos.filter((d) => d.ancla !== null).length;
}