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
  | { estado: 'resina' };

/**
 * Evalúa si un filamento es viable en una máquina.
 *
 * El orden de las comprobaciones importa: si es una máquina de resina, ninguna
 * de las otras aplica (no hay boquilla ni cama), y devolver "no viable" sería
 * falso: simplemente no lleva filamento.
 */
export function estadoFilamento(maquina: Maquina, filamento: Filamento | null): Compatibilidad {
  if (maquina.familia === 'resina') return { estado: 'resina' };
  if (!filamento) return { estado: 'ok' };
  if (maquina.tNozMax !== null && filamento.noz[1] > maquina.tNozMax) {
    return { estado: 'limite-boquilla', faltan: filamento.noz[1] - maquina.tNozMax };
  }
  if (!filamento.abierta && !maquina.cerrada) return { estado: 'necesita-camara' };
  return { estado: 'ok' };
}

/**
 * Si esta combinación acabará con las esquinas levantadas.
 *
 * Sólo pasa con material que necesita cámara en máquina abierta. Se usa para
 * decidir si la ilustración dibuja el rizado, y el aviso lo dice antes de
 * imprimir, no después.
 */
export function rizaria(maquina: Maquina, filamento: Filamento | null): boolean {
  if (!filamento || maquina.cerrada) return false;
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
  if (!filamento.abierta && !maquina.cerrada) {
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
