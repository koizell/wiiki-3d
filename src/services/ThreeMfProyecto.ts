/*
 * El 3MF de proyecto: la malla y el G-code en un solo archivo.
 *
 * ## Por qué esto importa
 *
 * Porque un 3MF de proyecto —lo que exportan Bambu Studio, OrcaSlicer y
 * PrusaSlicer— lleva dentro **la malla y el G-code que la máquina va a
 * ejecutar**, y los dos están en **coordenadas de cama**. La pieza y la
 * trayectoria vienen alineadas por construcción: no hay que emparejar dos
 * archivos ni medir nada.
 *
 * Es el caso bueno del visor, y es el que evita el problema de verdad: un STL
 * exportado desde un CAD cualquiera no tiene marco de cama, así que su G-code no
 * se puede alinear con fiabilidad. Un 3MF de proyecto sí.
 *
 * ## El ZIP
 *
 * Un 3MF es un ZIP, y `three` **ya trae** `fflate` dentro —es lo que usa su propio
 * `3MFLoader` para abrirlo—. Importarlo de ahí no añade ninguna dependencia al
 * proyecto: el unzip va a vivir en el chunk del visor, que ya es `lazy`.
 *
 * Y el unzip es **filtrado**: sólo se descomprime el G-code, no la malla. Un
 * 3MF de proyecto con la malla laminada pesa decenas de megabytes, y la malla
 * la sabe abrir `three` sin que nosotros la toquemos.
 */
import { unzip, unzipSync } from 'three/examples/jsm/libs/fflate.module.js';

/** Lo que se ha encontrado dentro de un 3MF. */
export interface Proyecto3mf {
  /**
   * El G-code de la primera placa, o `null` si el archivo no lleva ninguno.
   *
   * Un 3MF de **malla** —el que exporta un CAD, o el que genera un slicer sin
   * laminar— no lleva G-code, y eso no es un fallo: es un 3MF de otro tipo.
   */
  gcode: string | null;
  /** Las placas que trae el archivo, por su nombre dentro del ZIP. */
  placas: string[];
}

/** El nombre de las entradas que llevan el G-code de una placa. */
const PLACA_GCODE = /^Metadata\/plate_(\d+)\.gcode$/;

/**
 * Abre un 3MF y busca su G-code.
 *
 * @param datos El contenido del archivo.
 */
export function leerProyecto3mf(datos: ArrayBuffer): Proyecto3mf {
  const zip = unzipSync(new Uint8Array(datos));
  return delZip(zip);
}

/**
 * Abre un 3MF **sin bloquear** y busca su G-code.
 *
 * El unzip descomprime en el hilo principal, y un 3MF de proyecto con la malla
 * laminada pesa lo que pesa. Por eso:
 *
 * - se descomprime **sólo** el G-code, con un filtro: la malla la sabe abrir
 *   `three` por su cuenta y aquí no hace falta;
 * - y se hace **por trozos**, con la API asíncrona de `fflate`.
 *
 * @param datos El contenido del archivo.
 */
export function leerProyecto3mfAsync(datos: ArrayBuffer): Promise<Proyecto3mf> {
  return new Promise((resolver, rechazar) => {
    unzip(new Uint8Array(datos), { filter: (fichero) => PLACA_GCODE.test(fichero.name) }, (error, zip) => {
      if (error) {
        rechazar(error);
        return;
      }
      // El filtro deja pasar sólo los G-code, pero `unzip` puede devolver
      // además las entradas que no se han descomprimido; se ignoran.
      resolver(delZip(zip));
    });
  });
}

/** El G-code y las placas de un ZIP ya abierto. */
function delZip(zip: Record<string, Uint8Array>): Proyecto3mf {
  const placas = Object.keys(zip)
    .filter((nombre) => PLACA_GCODE.test(nombre))
    .sort((a, b) => numeroDePlaca(a) - numeroDePlaca(b));

  if (placas.length === 0) {
    return { gcode: null, placas: [] };
  }

  const primero = zip[placas[0]];
  return {
    gcode: new TextDecoder().decode(primero),
    placas,
  };
}

/** El número de placa de una entrada `Metadata/plate_N.gcode`. */
function numeroDePlaca(nombre: string): number {
  const match = PLACA_GCODE.exec(nombre);
  return match ? Number(match[1]) : 0;
}
