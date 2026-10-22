/**
 * Comprobaciones previas (pre-flight) para un archivo subido.
 *
 * ## Qué es
 *
 * El analizador lee lo que el slicer escribió en el G-code y el panel enseña
 * los datos. Esta capa va un paso más allá: **cruza esos datos con la máquina
 * que va a imprimir** y dice lo que puede salir mal **antes** de imprimir.
 *
 * Es lógica pura, sin React, y se prueba en Node: de aquí sale qué avisos ve
 * la interfaz y a qué guía enlaza cada uno. Nada de eso puede depender de un
 * componente.
 *
 * ## Por qué máquina Y archivo
 *
 * Un G-code no dice qué máquina lo va a imprimir. El mismo archivo puede ir
 * bien en una P1S y mal en una Ender 3 V3 SE: la boquilla de la primera da
 * 300 °C y la segunda 260 °C; la primera está cerrada y la segunda no se sabe.
 * Por eso la máquina es una entrada, no una constante, y por eso el aviso
 * dice **tu máquina**, no «la máquina».
 *
 * ## Lo que NO afirma
 *
 * No afirma que una combinación sin avisos vaya a salir bien: un archivo puede
 * tener todo dentro de los límites y aun así fallar por geometría, soportes o
 * calibración. Lo que afirma es el contrario: si hay un aviso, **no** se puede
 * ignorar sin consecuencia. Es el mismo criterio que la compatibilidad de
 * máquinas y filamentos: el límite es un límite, no una recomendación.
 */

import type { ProjectMetadata } from '../services/types';
import type { Maquina } from '../content/maquinas/tipos';
import type { Trayectoria } from '../services/GcodeTrayectoria';

/** Nivel del aviso: determina el color y el orden en la lista. */
export type NivelAviso = 'bloqueante' | 'importante' | 'atencion';

/** Un aviso de pre-flight. */
export interface PreflightAviso {
  /** Identificador estable, para keys de React y para tests. */
  id: string;
  /** Nivel: bloqueante (rojo), importante (ámbar), atención (gris). */
  nivel: NivelAviso;
  /** Texto que se pinta. Corto, y con la cifra que lo justifica. */
  texto: string;
  /** Slug de la guía que lo explica, si hay una. */
  guia?: string;
}

/**
 * Materiales que necesitan cámara cerrada para no warpear.
 *
 * Es una lista corta y deliberada: los materiales que se contraen mucho al
 * enfriar y que una corriente de aire levanta. PLA y PETG no la necesitan;
 * TPU tampoco (aunque se beneficia de ella). ABS, ASA, PC y PA (nylon) sí.
 *
 * No se deriva de `Filamento.abierta` porque no hay catálogo de filamentos en
 * el repo: el material del G-code es una cadena. Esta lista es la que usan las
 * guías (`enclosure-y-warping`, `warping-pla`) y es la única fuente de verdad.
 */
const MATERIALES_QUE_NECESITAN_CAMARA = new Set(['ABS', 'ASA', 'PC', 'PA', 'NYLON', 'PC-CF', 'PA-CF', 'ABS-CF', 'ASA-CF']);

/**
 * Materiales que en una extrusora Bowden dan problemas.
 *
 * TPU flexible en Bowden es el caso clásico: se dobla en el tubo y se atasca.
 * No es imposible, pero es el primer aviso que se le debe dar a quien lo
 * intenta.
 */
const MATERIALES_FLEXIBLES = new Set(['TPU', 'TPE', 'TPEE', 'FLEX']);

/** Diámetro de boquilla por defecto, en mm. */
const BOQUILLA_DEFAULT_MM = 0.4;

/** Parsea «0,4 mm» o «0.4mm» a número. */
function parsearBoquilla(texto: string | null): number {
  if (!texto) return BOQUILLA_DEFAULT_MM;
  const m = texto.match(/(\d+[.,]\d+|\d+)/);
  if (!m) return BOQUILLA_DEFAULT_MM;
  return parseFloat(m[1].replace(',', '.'));
}

/** Normaliza el nombre del material a una clave comparable. */
function normalizarMaterial(material: string): string {
  return material.trim().toUpperCase().replace(/[^A-Z0-9-]/g, '');
}

/** ¿El extrusor es Bowden? */
function esBowden(extrusor: string | null): boolean {
  if (!extrusor) return false;
  return /bowden/i.test(extrusor);
}

/**
 * Las comprobaciones previas para un archivo, contra una máquina.
 *
 * Si no hay máquina seleccionada, devuelve los avisos que no dependen de ella
 * (los que sólo miran el archivo). Si hay máquina, añade los que cruzan
 * archivo y máquina.
 *
 * El orden de la lista es el orden en que se pintan: bloqueantes primero,
 * luego importantes, luego atención. Dentro del mismo nivel, por orden de
 * aparición en esta función.
 */
export function preflight(metadata: ProjectMetadata, trayectoria: Trayectoria | null, maquina: Maquina | null): PreflightAviso[] {
  const avisos: PreflightAviso[] = [];
  const material = normalizarMaterial(metadata.material);

  // --- 1. Boquilla: temperatura pedida vs techo de la máquina ---
  if (maquina && metadata.hotendTemp !== undefined && maquina.tNozMax !== null) {
    if (metadata.hotendTemp > maquina.tNozMax) {
      avisos.push({
        id: 'nozmax',
        nivel: 'bloqueante',
        texto: `La boquilla de tu máquina llega a ${maquina.tNozMax} °C y el G-code pide ${metadata.hotendTemp} °C. No se puede imprimir así: sube la temperatura de boquilla en el slicer o cambia de material.`,
        guia: 'temperatura-hotend',
      });
    }
  }

  // --- 2. Cama: temperatura pedida vs techo de la máquina ---
  if (maquina && metadata.bedTemp !== undefined && maquina.tCamaMax !== null) {
    if (metadata.bedTemp > maquina.tCamaMax) {
      avisos.push({
        id: 'camamax',
        nivel: 'bloqueante',
        texto: `La cama de tu máquina llega a ${maquina.tCamaMax} °C y el G-code pide ${metadata.bedTemp} °C. No se puede imprimir así.`,
        guia: 'temperatura-cama',
      });
    }
  }

  // --- 3. Material × máquina: cámara ---
  if (maquina && MATERIALES_QUE_NECESITAN_CAMARA.has(material)) {
    if (maquina.cerrada === false) {
      avisos.push({
        id: 'camara',
        nivel: 'bloqueante',
        texto: `${metadata.material} necesita cámara cerrada y tu máquina está abierta. El warping es casi seguro. Cierra la máquina o cambia de material.`,
        guia: 'enclosure-y-warping',
      });
    } else if (maquina.cerrada === null) {
      avisos.push({
        id: 'camara-desconocida',
        nivel: 'atencion',
        texto: `${metadata.material} necesita cámara cerrada y no está verificado si tu máquina la tiene. Compruébalo antes de imprimir: si está abierta, habrá warping.`,
        guia: 'enclosure-y-warping',
      });
    }
  }

  // --- 4. TPU en Bowden ---
  if (maquina && MATERIALES_FLEXIBLES.has(material) && esBowden(maquina.extrusor)) {
    avisos.push({
      id: 'tpu-bowden',
      nivel: 'importante',
      texto: `${metadata.material} en una extrusora Bowden se atasca con facilidad. Sube la retracción con cuidado y baja la velocidad de impresión, o usa una máquina con extrusor directo.`,
      guia: 'tpu-flexible',
    });
  }

  // --- 5. Altura de capa vs boquilla ---
  if (metadata.layerHeight !== undefined) {
    const boquilla = maquina ? parsearBoquilla(maquina.boquilla) : BOQUILLA_DEFAULT_MM;
    if (metadata.layerHeight > boquilla * 0.8) {
      avisos.push({
        id: 'capa-alta',
        nivel: 'importante',
        texto: `La altura de capa (${metadata.layerHeight} mm) es alta para una boquilla de ${boquilla} mm. La regla es que no pase del 75 % del diámetro de la boquilla. Sube el tiempo de impresión o baja la capa.`,
        guia: 'altura-capa',
      });
    }
    if (metadata.layerHeight < 0.05) {
      avisos.push({
        id: 'capa-fina',
        nivel: 'atencion',
        texto: `La altura de capa (${metadata.layerHeight} mm) es muy fina: el tiempo de impresión se multiplica y el riesgo de atasco sube. Vale la pena si la superficie lo exige.`,
        guia: 'altura-capa',
      });
    }
  }

  // --- 6. Soportes ---
  if (metadata.hasOverhangs === false) {
    // El slicer dice que no hay soportes. No podemos saber si la geometría
    // los necesita (overhangAngle no se deriva de la cabecera), así que no
    // afirmamos nada. Sólo anotamos si el ángulo declarado es alto.
    if (metadata.overhangAngle !== undefined && metadata.overhangAngle > 45) {
      avisos.push({
        id: 'soportes',
        nivel: 'importante',
        texto: `El G-code no tiene soportes activados y el voladizo más crítico es de ${metadata.overhangAngle}°. Revisa si la geometría los necesita: por encima de 45°, sin soporte, la cara apoyada sale rugosa.`,
        guia: 'voladizos-y-soportes',
      });
    }
  }

  // --- 7. Velocidad vs máquina ---
  // No hay velocidad en los metadatos. Se omite.

  // --- 8. Temperatura de hotend baja para el material ---
  // (Heurística simple: si el material es ABS/PC/PA y el hotend es < 240, aviso.)
  if (metadata.hotendTemp !== undefined) {
    const minHotend: Record<string, number> = {
      ABS: 240, ASA: 240, PC: 260, PA: 260, NYLON: 260, PETG: 220,
    };
    const min = minHotend[material];
    if (min !== undefined && metadata.hotendTemp < min) {
      avisos.push({
        id: 'hotend-bajo',
        nivel: 'importante',
        texto: `${metadata.material} necesita al menos ${min} °C y el G-code usa ${metadata.hotendTemp} °C. La pieza va a salir débil entre capas.`,
        guia: 'temperatura-hotend',
      });
    }
  }

  // --- 9. Temperatura de cama baja para el material ---
  if (metadata.bedTemp !== undefined) {
    const minCama: Record<string, number> = {
      ABS: 90, ASA: 90, PC: 80, PA: 70, NYLON: 70, PETG: 60,
    };
    const min = minCama[material];
    if (min !== undefined && metadata.bedTemp < min) {
      avisos.push({
        id: 'cama-baja',
        nivel: 'importante',
        texto: `${metadata.material} necesita al menos ${min} °C de cama y el G-code usa ${metadata.bedTemp} °C. Riesgo de despegue.`,
        guia: 'temperatura-cama',
      });
    }
  }

  // --- 10. Área de impresión vs cama de la máquina ---
  if (trayectoria && maquina && maquina.vol) {
    const caja = trayectoria.caja;
    const ancho = caja.max.x - caja.min.x;
    const profundo = caja.max.y - caja.min.y;
    const alto = caja.max.z - caja.min.z;
    if (ancho > maquina.vol[0] || profundo > maquina.vol[1] || alto > maquina.vol[2]) {
      avisos.push({
        id: 'area-maquina',
        nivel: 'bloqueante',
        texto: `La pieza mide ${Math.round(ancho)}×${Math.round(profundo)}×${Math.round(alto)} mm y la cama de tu ${maquina.marca} ${maquina.modelo} es ${maquina.vol[0]}×${maquina.vol[1]}×${maquina.vol[2]} mm. No cabe: escala la pieza o cambia de máquina.`,
        guia: 'voladizos-y-soportes',
      });
    }
  }

  // --- 11. Velocidad máxima vs máquina ---
  if (trayectoria && maquina && trayectoria.velocidadMaxima > 0 && maquina.velMax !== null) {
    const velMaxMms = trayectoria.velocidadMaxima / 60; // mm/min → mm/s
    if (velMaxMms > maquina.velMax) {
      avisos.push({
        id: 'velocidad-maquina',
        nivel: 'importante',
        texto: `La velocidad máxima del G-code es ${Math.round(velMaxMms)} mm/s y tu ${maquina.marca} ${maquina.modelo} declara ${maquina.velMax} mm/s. La máquina no va a alcanzar esa velocidad: el tiempo real será mayor.`,
        guia: 'max-volumetric-speed',
      });
    }
  }

  // --- 12. Ventilador de pieza ---
  if (trayectoria && trayectoria.ventilador !== null) {
    const necesitaFan = ['PLA', 'PLA-CF', 'PETG'].includes(material);
    if (necesitaFan && trayectoria.ventilador === 0) {
      avisos.push({
        id: 'fan-apagado',
        nivel: 'importante',
        texto: `El ventilador de pieza está apagado (${trayectoria.ventilador} %) y el material es ${metadata.material}. Sin enfriamiento la superficie sale peor y el warping sube. Actívalo al menos en las capas superiores.`,
        guia: 'ventilador-warping',
      });
    }
  }

  // --- 13. Pressure advance ---
  if (trayectoria && trayectoria.pressureAdvance === null) {
    const necesitaPA = ['PLA', 'PLA-CF', 'PETG', 'ABS', 'ASA'].includes(material);
    if (necesitaPA) {
      avisos.push({
        id: 'sin-pa',
        nivel: 'atencion',
        texto: `El G-code no configura pressure advance (M572/M900). Sin él, el stringing puede ser peor en cambios de dirección. Configúralo en el slicer para tu filamento.`,
        guia: 'flow-rate',
      });
    }
  }

  // --- 14. Temperatura variable ---
  if (trayectoria && trayectoria.temperaturasHotend.length > 1) {
    const min = Math.min(...trayectoria.temperaturasHotend);
    const max = Math.max(...trayectoria.temperaturasHotend);
    avisos.push({
      id: 'temp-variable',
      nivel: 'atencion',
      texto: `La temperatura de hotend cambia durante la impresión (${min}–${max} °C). Si no es intencional (torre de temperatura, cambio de material), puede indicar un problema de configuración.`,
      guia: 'temperatura-hotend',
    });
  }

  // --- 15. Retracciones ---
  if (trayectoria && trayectoria.retracciones > 100) {
    avisos.push({
      id: 'muchas-retracciones',
      nivel: 'atencion',
      texto: `El G-code tiene ${trayectoria.retracciones} retracciones. Muchas retracciones aumentan el riesgo de stringing y el desgaste del extrusor. Revisa la configuración de retracción del slicer.`,
      guia: 'stringing',
    });
  }

  // Orden: bloqueantes, importantes, atención.
  const orden: Record<NivelAviso, number> = { bloqueante: 0, importante: 1, atencion: 2 };
  avisos.sort((a, b) => orden[a.nivel] - orden[b.nivel]);

  return avisos;
}
