import type { Filamento, Maquina } from './tipos.ts';

/**
 * El catálogo de arranque: 8 modelos, 4 marcas, 3 cinemáticas.
 *
 * El orden es el que propuso la estadística de ventas y uso (cuota de mercado
 * de Context, votos de comunidad y legado instalado): manda lo que la gente
 * tiene en casa, no lo que se anuncia este mes.
 *
 * ** Estado honesto de este catálogo: es una semilla. ** Las cifras con origen
 * `P` están pendientes de que el `recolector` traiga la ficha oficial. La
 * interfaz las muestra como pendientes; ninguna se rellena "de mientras".
 */

export const MAQUINAS: Maquina[] = [
  {
    slug: 'ender-3-v3-se',
    marca: 'Creality',
    modelo: 'Ender 3 V3 SE',
    familia: 'bed-slinger',
    cerrada: false,
    color: 0x2b2f38,
    acento: 0x9a3535,
    precioRef: '199 $',
    dims: [42, 36.6, 49],
    vol: [220, 220, 250],
    velMax: 250,
    tNozMax: 260,
    tCamaMax: 100,
    extrusor: 'Directo (Sprite)',
    boquilla: '0,4 mm',
    nivelacion: 'CR Touch + strain gauge',
    sensorFilamento: false,
    origen: { dims: 'T', vol: 'T', velMax: 'T', tNozMax: 'T', tCamaMax: 'T', extrusor: 'T', nivelacion: 'T' },
    fuentes: [
      { url: 'https://makerspecs.com/en/products/creality-ender-3-v3-se/', titulo: 'MakerSpecs · ficha de la Ender 3 V3 SE', origen: 'T' },
      { url: 'https://gavler.com/products/creality-ender-3-v3-se', titulo: 'Gavler · ficha y votos de comunidad', origen: 'T' },
    ],
  },
  {
    slug: 'ender-3-v3-ke',
    marca: 'Creality',
    modelo: 'Ender 3 V3 KE',
    familia: 'bed-slinger',
    cerrada: false,
    color: 0x2b2f38,
    acento: 0x9a3535,
    precioRef: '299 $',
    dims: [43.3, 36.6, 49],
    vol: [220, 220, 240],
    velMax: 500,
    tNozMax: 300,
    tCamaMax: 100,
    extrusor: 'Directo (Sprite)',
    boquilla: '0,4 mm',
    nivelacion: 'Mesh',
    sensorFilamento: true,
    origen: { dims: 'T', vol: 'T', velMax: 'T', tNozMax: 'T', tCamaMax: 'T', extrusor: 'T', nivelacion: 'T' },
    fuentes: [
      { url: 'https://makerspecs.com/en/compare/creality-ender-3-v3-ke-vs-creality-ender-3-v3-se/', titulo: 'MakerSpecs · comparativa KE vs SE', origen: 'T' },
      { url: 'https://store.creality.com/blogs/all/ender-3-v3-se-vs-ke', titulo: 'Creality · SE vs KE (blog del fabricante)', origen: 'F' },
    ],
  },
  {
    slug: 'ad5x',
    marca: 'Flashforge',
    modelo: 'AD5X',
    familia: 'corexy-cerrada',
    cerrada: true,
    color: 0x2b2f38,
    acento: 0xf07c1f,
    precioRef: '~1.000 $',
    dims: null,
    vol: [220, 220, 220],
    velMax: 600,
    tNozMax: 350,
    tCamaMax: 120,
    extrusor: 'Directo',
    boquilla: '0,4 mm',
    nivelacion: 'Auto',
    sensorFilamento: true,
    origen: { dims: 'P', vol: 'T', velMax: 'T', tNozMax: 'T', tCamaMax: 'P', extrusor: 'T', nivelacion: 'P' },
    fuentes: [
      { url: 'https://github.com/ghzserg/zmod', titulo: 'zmod · configuración Klipper de la AD5X (recorridos, husillo, temperaturas)', origen: 'T' },
      { url: 'https://gavler.com/products/flashforge-ad5x', titulo: 'Gavler · ficha', origen: 'T' },
    ],
  },
  {
    slug: 'bambu-a1',
    marca: 'Bambu Lab',
    modelo: 'A1',
    familia: 'corexy-abierta',
    cerrada: false,
    color: 0xd8dbe0,
    acento: 0x00ae42,
    precioRef: '~350 $',
    dims: null,
    vol: [256, 256, 256],
    velMax: 500,
    tNozMax: 300,
    tCamaMax: 100,
    extrusor: 'Directo',
    boquilla: '0,4 mm',
    nivelacion: 'Auto',
    sensorFilamento: true,
    origen: { dims: 'P', vol: 'F', velMax: 'F', tNozMax: 'F', tCamaMax: 'F', extrusor: 'F', nivelacion: 'F' },
    fuentes: [
      { url: 'https://bambulab.com/en/a1', titulo: 'Bambu Lab · página de producto de la A1', origen: 'F' },
    ],
  },
  {
    slug: 'bambu-p1s',
    marca: 'Bambu Lab',
    modelo: 'P1S',
    familia: 'corexy-cerrada',
    cerrada: true,
    color: 0x1b1e24,
    acento: 0x00ae42,
    precioRef: '399 $',
    dims: null,
    vol: [256, 256, 256],
    velMax: 500,
    tNozMax: 300,
    tCamaMax: 100,
    extrusor: 'Directo',
    boquilla: '0,4 mm',
    nivelacion: 'Auto',
    sensorFilamento: true,
    origen: { dims: 'P', vol: 'F', velMax: 'F', tNozMax: 'F', tCamaMax: 'F', extrusor: 'F', nivelacion: 'F' },
    fuentes: [
      { url: 'https://bambulab.com/en/p1s', titulo: 'Bambu Lab · página de producto de la P1S', origen: 'F' },
    ],
  },
  {
    slug: 'prusa-mk4s',
    marca: 'Prusa',
    modelo: 'MK4S',
    familia: 'bed-slinger',
    cerrada: false,
    color: 0x3c4149,
    acento: 0xf26b21,
    precioRef: '~800 $',
    dims: null,
    vol: [250, 210, 220],
    velMax: 500,
    tNozMax: 300,
    tCamaMax: 120,
    extrusor: 'Directo (Nextruder)',
    boquilla: '0,4 mm',
    nivelacion: 'Mesh + load cell',
    sensorFilamento: true,
    origen: { dims: 'P', vol: 'F', velMax: 'F', tNozMax: 'F', tCamaMax: 'F', extrusor: 'F', nivelacion: 'F' },
    fuentes: [
      { url: 'https://www.prusa3d.com/product/original-prusa-mk4s-3d-printer-6/', titulo: 'Prusa · ficha de la MK4S', origen: 'F' },
    ],
  },
  {
    slug: 'prusa-core-one',
    marca: 'Prusa',
    modelo: 'CORE One',
    familia: 'corexy-cerrada',
    cerrada: true,
    color: 0x3c4149,
    acento: 0xf26b21,
    precioRef: '1.299 $',
    dims: null,
    vol: [250, 220, 270],
    velMax: 500,
    tNozMax: 300,
    tCamaMax: 120,
    extrusor: 'Directo (Nextruder)',
    boquilla: '0,4 mm',
    nivelacion: 'Mesh + load cell',
    sensorFilamento: true,
    origen: { dims: 'P', vol: 'F', velMax: 'F', tNozMax: 'F', tCamaMax: 'F', extrusor: 'F', nivelacion: 'F' },
    fuentes: [
      { url: 'https://www.prusa3d.com/product/prusa-core-one-6/', titulo: 'Prusa · ficha de la CORE One', origen: 'F' },
    ],
  },
  {
    slug: 'elegoo-mars-5-ultra',
    marca: 'Elegoo',
    modelo: 'Mars 5 Ultra',
    familia: 'resina',
    cerrada: true,
    color: 0x1b1e24,
    acento: 0xf07c1f,
    precioRef: '300 $',
    dims: null,
    vol: [153, 77, 165],
    velMax: null,
    tNozMax: null,
    tCamaMax: null,
    extrusor: '— (MSLA)',
    boquilla: '— (LCD 9K)',
    nivelacion: '—',
    sensorFilamento: false,
    origen: { dims: 'P', vol: 'T', velMax: 'T', tNozMax: null, tCamaMax: null, extrusor: 'T', nivelacion: null },
    fuentes: [
      { url: 'https://gavler.com/products/elegoo-mars-5-ultra', titulo: 'Gavler · ficha', origen: 'T' },
    ],
  },
];

/** Filamentos: genéricos por familia, más tres marcas que publican su perfil. */
export const FILAMENTOS: Filamento[] = [
  { id: 'pla-gen', nombre: 'PLA genérico', marca: null, familia: 'PLA', noz: [190, 220], cama: [50, 60], abierta: true },
  { id: 'petg-gen', nombre: 'PETG genérico', marca: null, familia: 'PETG', noz: [230, 250], cama: [70, 85], abierta: true },
  { id: 'abs-gen', nombre: 'ABS genérico', marca: null, familia: 'ABS', noz: [240, 270], cama: [90, 100], abierta: false },
  { id: 'asa-gen', nombre: 'ASA genérico', marca: null, familia: 'ASA', noz: [240, 270], cama: [90, 100], abierta: false },
  { id: 'tpu-gen', nombre: 'TPU genérico', marca: null, familia: 'TPU', noz: [210, 230], cama: [40, 60], abierta: true },
  { id: 'bambu-basic', nombre: 'Bambu Lab PLA Basic', marca: 'Bambu Lab', familia: 'PLA', noz: [190, 230], cama: [35, 65], abierta: true },
  { id: 'prusament', nombre: 'Prusament PLA', marca: 'Prusa', familia: 'PLA', noz: [205, 225], cama: [55, 60], abierta: true },
  { id: 'esun-pla', nombre: 'eSUN PLA+', marca: 'eSUN', familia: 'PLA', noz: [205, 225], cama: [45, 60], abierta: true },
];

/** Busca una máquina por su slug. Devuelve `null` si no existe. */
export function maquinaPorSlug(slug: string): Maquina | null {
  return MAQUINAS.find((m) => m.slug === slug) ?? null;
}

/** Busca un filamento por su id. Devuelve `null` si no existe. */
export function filamentoPorId(id: string): Filamento | null {
  return FILAMENTOS.find((f) => f.id === id) ?? null;
}
