import type { Filamento, Maquina } from '../content/maquinas/tipos.ts';

/**
 * La física que relaciona una máquina con un filamento.
 *
 * Es lógica pura, sin React, y se prueba en Node (`npm run verify:maquinas`):
 * de aquí sale qué avisos ve la interfaz y a qué velocidad corre la
 * ilustración. Nada de eso puede depender de un componente.
 *
 * ## Las dos reglas que importan
 *
 * 1. **La boquilla tiene un techo.** Si el filamento pide más grados que la
 *    boquilla de la máquina puede dar, la combinación no es viable: no es un
 *    aviso de "con cuidado", es un límite físico.
 * 2. **Los materiales que necesitan cámara la necesitan.** ABS y ASA en
 *    máquina abierta es warping casi seguro. La simulación lo muestra, no lo
 *    esconde: si la máquina no puede, el resultado sale con las esquinas
 *    levantadas.
 */

/** Estado de compatibilidad entre una máquina y un filamento. */
export type Compatibilidad =
  | { estado: 'ok' }
  | { estado: 'limite-boquilla'; faltan: number }
  | { estado: 'necesita-camara' }
  | { estado: 'camara-desconocida' }
  | { estado: 'resina' };

/**
 * Evalúa si un filamento es viable en una máquina.
 *
 * El orden de las comprobaciones importa: si es una máquina de resina, ninguna
 * de las otras aplica (no hay boquilla ni cama), y devolver "no viable" sería
 * falso: simplemente no lleva filamento.
 *
 * ## Las dos reglas, y lo que NO afirman
 *
 * 1. **La boquilla tiene un techo.** Si el filamento pide más grados que la
 *    boquilla puede dar, la combinación no es viable.
 *
 *    Lo que esta regla **no** dice es lo contrario: que quedarse por debajo del
 *    techo baste. El techo es un límite, no una recomendación. La interfaz habla
 *    del rango quepublica el fabricante del filamento y del máximo de la ficha, y
 *    deja la decisión en quien lee.
 *
 * 2. **Los materiales que necesitan cámara la necesitan.** ABS y ASA en máquina
 *    abierta levantan warping.
 *
 *    Y aquí está la que estaba mal: **si el cerramiento de la máquina no está
 *    verificado, la regla no se puede evaluar**. Antes `cerrada` era un booleano
 *    y `!maquina.cerrada` convertía cualquier máquina sin dato en «abierta», así
 *    que la regla afirmaba warping sobre una máquina cuyo cerramiento nadie había
 *    comprobado. Ahora devuelve `camara-desconocida` y la interfaz lo dice.
 */
export function estadoFilamento(maquina: Maquina, filamento: Filamento | null): Compatibilidad {
  if (maquina.familia === 'resina') return { estado: 'resina' };
  if (!filamento) return { estado: 'ok' };
  if (maquina.tNozMax !== null && filamento.noz[1] > maquina.tNozMax) {
    return { estado: 'limite-boquilla', faltan: filamento.noz[1] - maquina.tNozMax };
  }
  // El cerramiento sólo condiciona los materiales que no admiten máquina abierta.
  if (!filamento.abierta && maquina.cerrada === null) return { estado: 'camara-desconocida' };
  if (!filamento.abierta && !maquina.cerrada) return { estado: 'necesita-camara' };
  return { estado: 'ok' };
}

/**
 * Si esta combinación acabará con las esquinas levantadas.
 *
 * Sólo pasa con material que necesita cámara en máquina **comprobada como
 * abierta**. Si el cerramiento no está verificado, no se dibuja el rizado: sería
 * anunciar un fallo que no se ha comprobado.
 *
 * Se usa para decidir si la ilustración dibuja el rizado, y el aviso lo dice
 * antes de imprimir, no después.
 */
export function rizaria(maquina: Maquina, filamento: Filamento | null): boolean {
  if (!filamento || maquina.cerrada !== false) return false;
  return !filamento.abierta;
}

/**
 * Duración del ciclo de la ilustración, en segundos.
 *
 * Sale de la velocidad de la ficha: una máquina de 500 mm/s completa el ciclo en
 * la mitad de tiempo que una de 250. La animación no es un reloj, es una
 * lectura de la ficha.
 */
export function duracionCiclo(maquina: Maquina): number {
  if (maquina.velMax === null) return 26;
  return Math.round((24 * 500) / maquina.velMax);
}

/** Las limitaciones de la combinación, en texto para la interfaz. */
export function avisos(maquina: Maquina, filamento: Filamento | null): string[] {
  const fuera: string[] = [];
  if (maquina.familia === 'resina') {
    fuera.push('Las impresoras de resina no llevan filamento: curan resina líquida capa a capa.');
    return fuera;
  }
  if (!filamento) return fuera;
  // Las dos comprobaciones son independientes: una combinación puede fallar por
  // las dos cosas a la vez (la boquilla no llega Y la máquina está abierta), y
  // quedarse con el primer aviso escondería el otro.
  if (maquina.tNozMax !== null && filamento.noz[1] > maquina.tNozMax) {
    fuera.push(`${filamento.nombre} pide hasta ${filamento.noz[1]} °C y la boquilla de la ${maquina.modelo} llega a ${maquina.tNozMax} °C.`);
  }
  // Cerramiento sin verificar: se dice, no se supone.
  if (!filamento.abierta && maquina.cerrada === null) {
    fuera.push(`${filamento.familia} necesita cámara cerrada, y el cerramiento de la ${maquina.modelo} no está verificado: no se puede determinar.`);
    return fuera;
  }
  if (!filamento.abierta && maquina.cerrada === false) {
    fuera.push(`${filamento.familia} necesita cámara cerrada: en la ${maquina.modelo} abierta levanta warping.`);
  }
  return fuera;
}

/** Texto del alcance de un dato, para la ficha. */
export function textoPendiente(campo: 'dims' | 'velMax' | 'tNozMax' | 'tCamaMax' | 'nivelacion'): string {
  switch (campo) {
    case 'dims': return 'dimensiones sin fichar';
    case 'velMax': return 'velocidad sin fichar';
    case 'tNozMax': return 'temperatura de boquilla sin fichar';
    case 'tCamaMax': return 'temperatura de cama sin fichar';
    case 'nivelacion': return 'nivelación sin fichar';
  }
}

/**
 * El veredicto de encaje: si una pieza entra en la cama de una máquina.
 *
 * - `cabe`: entra tal cual.
 * - `cabe-girada`: entra girada 90°, y `orientacion` dice en cuál.
 * - `no-cabe`: no entra en ninguna de las orientaciones probadas.
 * - `indeterminado`: no hay máquina elegida, o la máquina no tiene volumen
 *   útil fichado. **La ausencia de un dato no es un cero**: una máquina sin
 *   volumen declarado no es una máquina donde nada cabe, y decirlo al revés
 *   sería afirmar algo que nadie ha comprobado.
 */
export type Encaje = 'cabe' | 'cabe-girada' | 'no-cabe' | 'indeterminado';

/** Las tres orientaciones en las que se prueba una pieza, en el orden en que se prueban. */
type Orientacion = 'xyz' | 'yxz' | 'xzy';

/**
 * Las tres orientaciones, con los ejes de la pieza que van a cada eje de la cama.
 *
 * `xyz` es la pieza tal cual. `yxz` la gira en planta (intercambia X e Y) y
 * `xzy` la gira de canto (intercambia Y e Z).
 *
 * Son tres de las seis permutaciones posibles, y no todas: una pieza puede
 * caber en una orientación que aquí no se prueba. Por eso `no-cabe` quiere
 * decir «no cabe en ninguna de las tres que se han probado», y no «no cabe
 * de ninguna manera posible».
 */
const ORIENTACIONES: { nombre: Orientacion; ejes: readonly [0 | 1 | 2, 0 | 1 | 2, 0 | 1 | 2] }[] = [
  { nombre: 'xyz', ejes: [0, 1, 2] },
  { nombre: 'yxz', ejes: [1, 0, 2] },
  { nombre: 'xzy', ejes: [0, 2, 1] },
];

/**
 * ¿Cabe esta pieza en la cama de esta máquina?
 *
 * Es lógica pura, sin React, y se prueba en Node (`npm run verify:maquinas`):
 * la comparten el aviso de G-code y el informe de malla, y los dos tienen que
 * decir lo mismo, porque son la misma pregunta sobre la misma geometría.
 *
 * ## Lo que compara
 *
 * Cajas envolventes, en milímetros **sin redondear**. Una pieza de 250,4 mm en
 * una cama de 250 mm no cabe, aunque el texto que se pinte después redondee a
 * 250: el redondeo es de presentación, la comparación es de física.
 *
 * Y comparar cajas envolventes es conservador: una pieza puede entrar en la
 * cama aunque su caja no entre, porque quepa en diagonal o porque el recorte
 * real sea menor. Por eso el veredicto es una estimación, y el mensaje del
 * sitio lo dice.
 *
 * ## Lo que NO dice
 *
 * - **Que no quepa no significa que no se pueda imprimir.** Significa que hay
 *   que escalar la pieza o cambiar de máquina.
 * - **Que quepa no significa que vaya a salir bien.** La cama es una de las
 *   tres cosas que decide una impresión, no la única.
 * - **Sin volumen útil fichado no hay veredicto.** `indeterminado` es la
 *   respuesta honesta, y no «no cabe»: la resina no tiene cama, y una máquina
 *   cuya cama no está fichada no es una máquina donde nada cabe.
 *
 * ## El giro
 *
 * Por defecto se prueban las tres orientaciones, y `cabe-girada` es el
 * veredicto de la que entra sólo girada. El G-code es la excepción: un
 * G-code ya está teselado en coordenadas de cama, y girar la pieza es una
 * decisión del laminador que ocurre **después**, así que allí se compara sólo
 * la orientación tal cual (`permitirGiro: false`).
 *
 * @param caja La pieza, en mm: X ancho, Y fondo, Z alto. Sin redondear.
 * @param maquina La máquina elegida, o `null` si no hay ninguna.
 * @param opciones `permitirGiro` (por defecto `true`) decide si se prueban
 *   las orientaciones giradas.
 */
export function cabeEnLaMaquina(
  caja: [number, number, number],
  maquina: Maquina | null,
  opciones?: { permitirGiro?: boolean },
): { estado: Encaje; orientacion?: Orientacion } {
  // Sin máquina elegida, o con una máquina cuyo volumen útil no está fichado,
  // no se puede decir nada. `indeterminado` es la respuesta: no «no cabe».
  const cama = maquina?.vol ?? null;
  if (cama === null) return { estado: 'indeterminado' };

  const candidatas = opciones?.permitirGiro === false ? ORIENTACIONES.slice(0, 1) : ORIENTACIONES;

  for (const { nombre, ejes } of candidatas) {
    const [a, b, c] = [caja[ejes[0]], caja[ejes[1]], caja[ejes[2]]];
    // Una dimensión cabe si es <= que la de la cama, con los valores crudos.
    if (a <= cama[0] && b <= cama[1] && c <= cama[2]) {
      return { estado: nombre === 'xyz' ? 'cabe' : 'cabe-girada', orientacion: nombre };
    }
  }

  // No cabe en ninguna de las orientaciones probadas. `orientacion` sigue
  // siendo `'xyz'` —la tal cual, que es la que se comparó primero— porque el
  // veredicto lo dice el estado, no la orientación.
  return { estado: 'no-cabe', orientacion: 'xyz' };
}
