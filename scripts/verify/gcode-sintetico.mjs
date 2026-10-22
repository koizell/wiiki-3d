/*
 * El G-code y el 3MF sintéticos.
 *
 * ## Por qué sintéticos y no el archivo real
 *
 * Porque `test-fixtures/` está en el `.gitignore` a propósito: «G-codes reales de
 * usuario, no se suben». Una comprobación que dependa de un archivo que no está en
 * el repositorio no es una comprobación: es una que funciona en mi máquina.
 *
 * Así que el material de la comprobación se **genera aquí**, y es determinista:
 * las mismas cifras en cada ejecución, en cualquier máquina y en el CI.
 *
 * Y el archivo real, si está en la máquina de quien la ejecuta, sigue usándose
 * como **comprobación extra**: el G-code de un archivo real tiene arcos, retracciones
 * y marcadores de tres familias de slicer, y eso no se puede fabricar. Por eso las
 * dos cosas van: la sintética para el CI, la real para la red de seguridad.
 */
import { zipSync, strToU8 } from 'three/examples/jsm/libs/fflate.module.js';

/**
 * Un G-code de tres capas, con la sintaxis de Cura.
 *
 * Las cifras están **elegidas** para que la comprobación pueda comprobarlas:
 *
 * - 16,00 mm de filamento netos: 5 + 8 + 3.
 * - Una retracción de 0,5 mm y su contrarretracción, que es lo que separa la
 *   cuenta **neta** del slicer de la suma de las positivas.
 * - Tres tipos de rasgo, para que el lector los tenga que distinguir.
 * - `M83` y un `G92 E0`, que es la sintaxis que hace que un lector que sume mal
 *   los `E` dé un número equivocado.
 */
export function crearGcodeSintetico() {
  return `; HEADER_BLOCK_START
; Generated with Cura_SteamEngine 5.4.0
; Material:PLA
; TIME:176
; PRINT_TEMPERATURE:220
; BED_TEMPERATURE:50
; Layer height:0.20
; total layer number: 3
; filament_density: 1.24
; filament_diameter: 1.75
; MINX = 10.00
; MINY = 10.00
; MINZ = 0.00
; MAXX = 20.00
; MAXY = 20.00
; MAXZ = 0.60
; filament used [mm] = 16.00
; filament used [g] = 0.0477
; HEADER_BLOCK_END
M83
G92 E0
G1 Z0.2 F600
;LAYER_CHANGE
;Z:0.2
;TYPE:Bottom surface
G1 X10 Y10 E1.0 F1200
G1 X20 Y10 E1.0 F1200
G1 X20 Y20 E1.0 F1200
G1 X10 Y20 E1.0 F1200
G1 X10 Y10 E1.0 F1200
;LAYER_CHANGE
;Z:0.4
;TYPE:Outer wall
G1 E-.5 F2400
G1 E.5 F2400
G1 X10 Y10 E2.0 F1200
G1 X20 Y10 E2.0 F1200
G1 X20 Y20 E2.0 F1200
G1 X10 Y20 E2.0 F1200
;LAYER_CHANGE
;Z:0.6
;TYPE:Top surface
G1 X10 Y10 E1.0 F1200
G1 X20 Y10 E1.0 F1200
G1 X20 Y20 E1.0 F1200
`;
}

/** La caja que la malla del 3MF tiene que ocupar, la misma que la del G-code. */
export const CAJA_SINTETICA = { x0: 10, x1: 20, y0: 10, y1: 20, z0: 0, z1: 0.6 };

/**
 * Un 3MF de proyecto con el G-code dentro.
 *
 * La malla es una caja con la envoltura exacta de la pieza del G-code: no es la
 * pieza, es una caja que ocupa su sitio en la cama, que es lo que hace falta
 * para comprobar que la trayectoria y la malla se alinean.
 */
export function crear3mfSintetico(gcode) {
  const { x0, x1, y0, y1, z0, z1 } = CAJA_SINTETICA;
  const vertices = [
    [x0, y0, z0], [x1, y0, z0], [x1, y1, z0], [x0, y1, z0],
    [x0, y0, z1], [x1, y0, z1], [x1, y1, z1], [x0, y1, z1],
  ];
  const triangulos = [
    [0, 2, 1], [0, 3, 2], [4, 5, 6], [4, 6, 7],
    [0, 1, 5], [0, 5, 4], [1, 2, 6], [1, 6, 5],
    [2, 3, 7], [2, 7, 6], [3, 0, 4], [3, 4, 7],
  ];

  const modelo = `<?xml version="1.0" encoding="UTF-8"?>
<model unit="millimeter" xml:lang="en-US" xmlns="http://schemas.microsoft.com/3dmanufacturing/core/2015/02">
  <metadata name="Application">wiiki-3d sintético</metadata>
  <resources>
    <object id="1" type="model">
      <mesh>
        <vertices>
${vertices.map(([x, y, z]) => `          <vertex x="${x}" y="${y}" z="${z}" />`).join('\n')}
        </vertices>
        <triangles>
${triangulos.map(([a, b, c]) => `          <triangle v1="${a}" v2="${b}" v3="${c}" />`).join('\n')}
        </triangles>
      </mesh>
    </object>
  </resources>
  <build>
    <item objectid="1" transform="1 0 0 0 1 0 0 0 1 0 0 0" />
  </build>
</model>
`;

  const contentTypes = `<?xml version="1.0" encoding="UTF-8"?>
<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">
  <Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml" />
  <Default Extension="model" ContentType="application/vnd.ms-package.3dmanufacturing-3dmodel+xml" />
  <Default Extension="gcode" ContentType="text/plain" />
</Types>
`;

  const rels = `<?xml version="1.0" encoding="UTF-8"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Target="/3D/3dmodel.model" Id="rel0" Type="http://schemas.microsoft.com/3dmanufacturing/2013/01/3dmodel" />
</Relationships>
`;

  return zipSync(
    {
      '[Content_Types].xml': strToU8(contentTypes),
      '_rels/.rels': strToU8(rels),
      '3D/3dmodel.model': strToU8(modelo),
      'Metadata/plate_1.gcode': strToU8(gcode),
    },
    { level: 6 }
  );
}
