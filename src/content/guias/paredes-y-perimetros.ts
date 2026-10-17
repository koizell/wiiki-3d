import type { Guia } from './tipos.ts';
import { AUTOR } from './autor.ts';

export const paredesYPerimetros: Guia = {
  slug: 'paredes-y-perimetros',
  titulo: 'Paredes y perímetros',
  resumen: 'Cómo ajustar paredes, perímetros y capas sólidas superiores para que la pieza sea fuerte, tenga buen acabado y no falle en paredes delgadas.',
  sintoma: 'Pieza débil, superficie con huecos o abultamientos, o paredes delgadas que fallan',
  dibujo: 'capas',
  entrada:
    'Las paredes y los perímetros son la estructura que define la resistencia y el acabado de la pieza: más perímetros hacen una pieza más fuerte, y las capas sólidas superiores cierran la superficie. Esta guía separa el problema de paredes y perímetros del de orientación y del de voladizos, y dice cuántas paredes usar, qué generador elegir (Arachne o Classic), cómo ajustar las capas sólidas superiores y el orden de paredes según si hay voladizos.',
  autor: AUTOR,
  actualizado: '2026-10-17',
  minutos: 7,
  campos: [],
  diferencial: {
    contra: 'orientación y resistencia',
    contraCorto: 'orientación',
    comprobaciones: [
      {
        id: 'debilidad',
        mira: '¿La pieza es débil en todas las direcciones o sólo perpendicular a las capas (eje Z)?',
        si: 'Débil en todas las direcciones o con defectos de superficie: es un problema de paredes, perímetros o relleno, no sólo de orientación.',
        no: 'Débil sólo en Z, con la base plana: es anisotropía por orientación, no un problema de paredes.',
      },
      {
        id: 'superficie',
        mira: '¿La superficie superior muestra huecos, abultamientos o falta de soporte interno?',
        si: 'Sí: las capas sólidas superiores o el relleno están mal ajustados, no la orientación.',
        no: 'La superficie es correcta: el problema está en otro sitio.',
      },
      {
        id: 'pared-delgada',
        mira: '¿Las paredes delgadas se rompen, se ignoran o salen con un solo trazo en vez de un bucle cerrado?',
        si: 'Sí: es un problema de detección de paredes delgadas o de generador (Arachne/Classic).',
        no: 'Las paredes delgadas salen bien: el problema no está en los perímetros.',
      },
    ],
    siNo: { guia: 'orientacion-resistencia', etiqueta: 'Orientación y resistencia' },
  },
  variables: [
    {
      id: 'problema',
      etiqueta: 'Problema observado',
      para: 'Decide qué acción concreta aplicar: resistencia, acabado de superficie, paredes delgadas, precisión o vase mode.',
      necesaria: true,
      opciones: [
        { id: 'resistencia', etiqueta: 'Pieza débil', detalle: 'Falta de resistencia' },
        { id: 'superficie', etiqueta: 'Superficie con huecos o abultamientos', detalle: 'Capas sólidas mal ajustadas' },
        { id: 'pared-delgada', etiqueta: 'Paredes delgadas que fallan o se ignoran', detalle: 'Grosor por debajo del mínimo' },
        { id: 'precision', etiqueta: 'Imprecisión dimensional / encaje', detalle: 'Tolerancias fuera' },
        { id: 'vase', etiqueta: 'Vase mode', detalle: 'Un solo perímetro continuo' },
        { id: 'ninguno', etiqueta: 'Ninguno, optimizar', detalle: 'Ajuste fino' },
      ],
    },
    {
      id: 'generador',
      etiqueta: 'Generador de paredes',
      para: 'Arachne ajusta el ancho dinámicamente; Classic es fijo. Cambia el manejo de paredes delgadas y la base del solape.',
      opciones: [
        { id: 'arachne', etiqueta: 'Arachne', detalle: 'Ajusta ancho dinámicamente' },
        { id: 'classic', etiqueta: 'Classic', detalle: 'Ancho fijo, predecible' },
      ],
    },
    {
      id: 'paredes',
      etiqueta: 'Número de paredes (perímetros)',
      para: 'Inner/Outer/Inner exige mínimo 3; con 2 o menos no se puede usar y alternate_extra_wall ancla peor.',
      opciones: [
        { id: 'pocas', etiqueta: '2 o menos', detalle: 'Pocas paredes' },
        { id: 'suficientes', etiqueta: '3 o más', detalle: 'Paredes suficientes' },
      ],
    },
    {
      id: 'voladizos',
      etiqueta: 'Voladizos importantes',
      para: 'Decide el orden de paredes: Inner/Outer favorece voladizos, Inner/Outer/Inner favorece acabado y precisión.',
      opciones: [
        { id: 'si', etiqueta: 'Sí, hay voladizos', detalle: 'Voladizos que cuelgan' },
        { id: 'no', etiqueta: 'No, superficies planas', detalle: 'Acabado prioritario' },
      ],
    },
    {
      id: 'alturaCapa',
      etiqueta: 'Altura de capa',
      para: 'A menor altura de capa, más capas sólidas superiores hacen falta para el mismo grosor mínimo.',
      opciones: [
        { id: 'baja', etiqueta: 'Baja (≤0,15 mm)', detalle: 'Más capas para el mismo grosor' },
        { id: 'media', etiqueta: 'Media (0,2 mm)', detalle: 'Rango habitual' },
        { id: 'alta', etiqueta: 'Alta (≥0,25 mm)', detalle: 'Menos capas, más riesgo de huecos' },
      ],
    },
  ],
  conocimiento: [
    {
      id: 'perimetros-vs-relleno',
      titulo: 'La resistencia la definen los perímetros',
      cuerpo:
        'La resistencia de un modelo está definida principalmente por el número de perímetros, no por el relleno. Si quieres una pieza más fuerte, aumenta el número de perímetros. Esta afirmación es de una sola fuente (Prusa) y no cuantifica la relación ni da un umbral a partir del cual el relleno empieza a importar.',
      cita: { texto: 'The strength of a model is mostly defined by the number of perimeters (not the infill). If you want a stronger print, increase the number of perimeters.', fuente: 'Prusa KB' },
    },
    {
      id: 'alternate-extra-wall',
      titulo: 'Pared extra cada dos capas',
      cuando: { problema: 'resistencia' },
      cuerpo:
        'alternate_extra_wall añade una pared extra cada dos capas para que el relleno quede encajado verticalmente entre las paredes, resultando en impresiones más fuertes. No funciona bien con "Ensure vertical shell thickness: All" (OrcaSlicer ofrece cambiarlo a "Moderate") ni con Lightning infill, porque hay poco relleno al que anclar las paredes extra.',
      cifra: { valor: '1 pared cada 2 capas', nota: 'Contradicciones documentadas: Ensure vertical shell thickness All y Lightning infill' },
      cita: { texto: 'This setting adds an extra wall to every other layer. This way the infill gets wedged vertically between the walls, resulting in stronger prints.', fuente: 'OrcaSlicer — Walls' },
    },
    {
      id: 'minimo-perimetros',
      titulo: 'Mínimo de perímetros y paredes cerradas',
      cuerpo:
        'Por defecto cada pared consta de perímetros externo e interno: mínimo 2 perímetros, incluso en paredes delgadas. Las paredes se imprimen como bucles cerrados; una pared de una sola extrusión (detect thin walls) reduce la calidad superficial y la resistencia por no ser un bucle cerrado.',
      cita: { texto: 'By default, every wall consists of outside and inside perimeters (a minimum of two perimeters for thin walls).', fuente: 'Prusa KB' },
    },
    {
      id: 'detect-thin-walls',
      titulo: 'Detección de paredes delgadas',
      cuando: { problema: 'pared-delgada' },
      cuerpo:
        'Detect thin walls (Prusa) genera un solo perímetro que sirve de cáscara interior y exterior para capturar detalles pequeños; las paredes más delgadas que el ancho de una sola extrusión probablemente se ignoran. Se desactiva automáticamente si el generador Arachne está activo. OrcaSlicer recomienda usar Arachne, que desactiva detect_thin_wall por usar un enfoque distinto.',
      cita: { texto: 'This feature is automatically disabled if the Arachne perimeter generator is active, as it already automatically adjusts for thin walls.', fuente: 'Prusa KB' },
    },
    {
      id: 'grosor-optimo',
      titulo: 'Grosor óptimo de pared delgada',
      cuando: { problema: 'pared-delgada' },
      cuerpo:
        'PrusaSlicer calcula el grosor óptimo de pared delgada para un número de perímetros y una altura de capa dados; no es simplemente número × ancho de extrusión, por el solape entre perímetros. Ejemplo: ancho de extrusión 0,45 mm, 2 perímetros a 0,2 mm de capa → 0,86 mm (no 0,90 mm). Este cálculo es específico de PrusaSlicer (sección asumida: rectángulo con extremos semicirculares) y no está corroborado por OrcaSlicer ni Simplify3D.',
      cifra: { valor: '0,86 mm', nota: '2 perímetros, 0,2 mm de capa, boquilla 0,45 mm (PrusaSlicer)' },
      cita: { texto: 'However, if you look at the recommendation for a 0.2 mm layer height, you will find that this is not true and the suggested value is 0.86 mm.', fuente: 'Prusa KB' },
    },
    {
      id: 'capas-solidas-minimo',
      titulo: 'Grosor mínimo de capas sólidas superiores',
      cuando: { problema: 'superficie' },
      cuerpo:
        'Las fuentes no se ponen de acuerdo en el umbral de grosor objetivo: Prusa apunta a ≈ 0,9 mm (3 capas a 0,3 mm; 9 capas a 0,1 mm), Simplify3D exige mínimo 0,5 mm (2 capas a 0,25 mm; 5 capas a 0,1 mm) y OrcaSlicer recomienda al menos 3 shell layers. A menor altura de capa, más capas sólidas hacen falta para el mismo grosor. El redactor presenta ambos umbrales con atribución, no elige uno.',
      cifra: { valor: '0,5–0,9 mm', nota: 'Simplify3D: 0,5 mm mínimo; Prusa: ≈ 0,9 mm; OrcaSlicer: ≥ 3 capas' },
      cita: { texto: 'As a good rule of thumb, you want the solid section at the top of your print to be at least 0.5mm thick.', fuente: 'Simplify3D — Gaps in Top Layers' },
    },
    {
      id: 'top-solid-bridging',
      titulo: 'Las capas sólidas superiores son bridging sobre el relleno',
      cuerpo:
        'El top solid infill es esencialmente bridging sobre el patrón de relleno; a menor porcentaje de relleno, mayor distancia de bridging y mayor sag. Se contrarresta aumentando las capas sólidas (sugerido al menos 3 superiores) o con un modifier mesh que aumente el relleno en las últimas capas antes del sólido. Las capas sólidas superior e inferior son normalmente 100 % de relleno.',
      cita: { texto: 'The top solid infill is essentially bridging over the infill pattern. Because of that, you\'ll almost always see some sag in the first few solid infill lines. The lower the infill, the longer the bridging distance, and as a result the bigger the sag.', fuente: 'Prusa KB' },
    },
    {
      id: 'solape-relleno-pared',
      titulo: 'Solape relleno-pared',
      cuando: { problema: ['superficie', 'ninguno'] },
      cuerpo:
        'top_bottom_infill_wall_overlap: solape del relleno sólido superior/inferior con las paredes para mejor unión y menos pinholes; 25–30 % es un buen punto de partida. La base del porcentaje cambia según el wall generator: Classic usa mitad del espaciado de pared interior + mitad del espaciado de relleno sólido interno; Arachne usa el espaciado de pared interior; con una sola pared, el espaciado de pared exterior. Cambiar de Classic a Arachne cambia el significado del mismo porcentaje.',
      cifra: { valor: '25–30 %', nota: 'Base de cálculo distinta entre Classic y Arachne' },
      cita: { texto: 'The top solid infill area is slightly enlarged to overlap with walls for better bonding and to minimize pinholes where the infill meets the walls. A value of 25-30% is a good starting point.', fuente: 'OrcaSlicer — Top/Bottom Shells' },
    },
    {
      id: 'orden-paredes',
      titulo: 'Orden de paredes: voladizo vs acabado',
      cuando: { problema: ['resistencia', 'precision', 'ninguno'] },
      cuerpo:
        'Inner/Outer: mejor para voladizos (las paredes voladas se adhieren a un perímetro vecino), a costa de calidad superficial ligeramente reducida. Inner/Outer/Inner: mejor acabado superficial y precisión dimensional, pero reduce el rendimiento de voladizo (no hay perímetro interno contra el que imprimir la pared externa); requiere mínimo 3 paredes y se recomienda sobre Outer/Inner en la mayoría de casos. Outer/Inner: misma calidad superficial y precisión que Inner/Outer/Inner, pero costuras Z menos consistentes. Es un trade-off explícito: mejor voladizo o mejor acabado, no ambos a la vez.',
      cita: { texto: 'Use Inner/Outer/Inner for the best external surface finish and dimensional accuracy as the external wall is printed undisturbed from an internal perimeter. However, overhang performance will reduce as there is no internal perimeter to print the external wall against.', fuente: 'OrcaSlicer — Wall and Surfaces' },
    },
    {
      id: 'arachne-vs-classic',
      titulo: 'Arachne vs Classic',
      cuando: { generador: ['arachne', 'classic'] },
      cuerpo:
        'Classic crea tantas paredes como permite wall_loops extruyendo a lo largo del perímetro con ancho de línea definido; no varía el ancho de extrusión; rápido y predecible. Arachne ajusta dinámicamente el ancho de extrusión para seguir mejor la geometría; mejor manejo de detalles finos y transiciones suaves entre número de paredes. Prusa: para la mayoría de impresiones Arachne es superior; para piezas funcionales donde la precisión de esquinas cóncavas es importante, Classic puede ser mejor. OrcaSlicer describe ambos sin declarar preferencia explícita.',
      cita: { texto: 'The Arachne wall generator dynamically adjusts extrusion width to follow the shape of the model more closely. This allows better handling of thin features and smooth transitions between wall counts.', fuente: 'OrcaSlicer — Wall Generator' },
    },
    {
      id: 'vase-mode',
      titulo: 'Vase mode: un solo perímetro continuo',
      cuando: { problema: 'vase' },
      cuerpo:
        'Vase mode crea un contenedor de un solo perímetro continuo con altura Z gradual. Con vase mode activo, PrusaSlicer ajusta automáticamente: 1 perímetro, 0 % de relleno, capas sólidas superiores desactivadas, soportes desactivados, "ensure vertical shell thickness" desactivado. Se puede ajustar el número de capas sólidas inferiores y el ancho de extrusión de los perímetros externos para un vaso más grueso/fuerte/estanco (ej. de 0,45 a 0,6). El modelo debe definirse como sólido (solo dimensiones exteriores) y solo se puede imprimir un objeto a la vez.',
      cita: { texto: 'When the vase mode is activated, PrusaSlicer automatically sets related settings accordingly:', fuente: 'Prusa KB' },
    },
    {
      id: 'gap-fill',
      titulo: 'Gap fill',
      cuerpo:
        'Fill gaps rellena huecos entre perímetros individuales y entre el perímetro más interno y el relleno. Classic rellena el medio de paredes de 3 líneas con gap fill, impreso después de ambas paredes externas. Simplify3D usa gap fill por defecto para huecos pequeños entre paredes delgadas, con patrón back-and-forth ajustable al espacio. OrcaSlicer expone gap_fill_flow_ratio como variable de flow ratio para gap fill.',
      cita: { texto: 'Enables filling of gaps between individual perimeters and between the innermost perimeter and infill.', fuente: 'Prusa KB' },
    },
    {
      id: 'narrow-walls',
      titulo: 'Paredes estrechas (narrow walls)',
      cuando: { problema: 'pared-delgada' },
      cuerpo:
        'Cuando una pared es demasiado estrecha para las paredes de ambos lados, contorno y hueco comparten el espacio: con 2 líneas solo las paredes externas del contorno y el hueco, tocándose; con 3 líneas las dos externas y una línea entre ellas. Arachne imprime esa línea como pared interna compartida y sigue el orden de paredes; Classic rellena el medio con gap fill. Ejemplo (tubo de pared 0,5 mm, 3 wall loops, Arachne): 1 mm → 2 líneas; 1,5 mm → 3 líneas; 2 mm → 4 líneas.',
      cita: { texto: 'When a wall is too narrow for the walls of both its sides, like the wall of a thin tube, the contour and the hole share the room between them:', fuente: 'OrcaSlicer — Wall and Surfaces' },
    },
    {
      id: 'ensure-vertical',
      titulo: 'Ensure vertical shell thickness',
      cuerpo:
        'Ensure vertical shell thickness: Disabled (extrusión adicional solo para capas superiores; puede hacer fallar la impresión) / Partial (soporte parcial) / Enabled (estándar; añade relleno sólido cerca de superficies inclinadas para garantizar el grosor de cáscara vertical; aplicado a capas sólidas superior e inferior). alternate_extra_wall no funciona bien con "All" y OrcaSlicer ofrece cambiarlo a "Moderate".',
      cita: { texto: 'Disabled: Produces additional extrusion only to support top layers. Choosing this option may cause your print to fail. Partial: Provides partial support to vertical shells without fully enforcing the required thickness. Enabled: Standard setting. Enables the addition of solid infill near sloping surfaces to guarantee the vertical shell thickness. It is applied to the top and bottom solid layers.', fuente: 'Prusa KB' },
    },
    {
      id: 'only-one-wall',
      titulo: 'Only one wall',
      cuando: { problema: ['superficie', 'ninguno'] },
      cuerpo:
        'Only one perimeter (Prusa) fuerza un solo perímetro en capas superiores o en la primera capa para un acabado más limpio sin sacrificar rigidez; top y bottom controlables por separado. OrcaSlicer expone only_one_wall_first_layer / only_one_wall_top: una sola pared en superficies planas para dar más espacio al patrón de relleno superior; útil en features pequeñas (letras); requiere shell layers > 0.',
      cita: { texto: 'This option forces a single perimeter on top or first layers to achieve a cleaner, more uniform aesthetic finish without sacrificing the object\'s structural rigidity.', fuente: 'Prusa KB' },
    },
    {
      id: 'precision-dimensional',
      titulo: 'Precisión dimensional',
      cuando: { problema: 'precision' },
      cuerpo:
        'Inner/Outer/Inner y Outer/Inner ofrecen mejor precisión dimensional que Inner/Outer (perímetro externo impreso sin perturbar). External perimeters first puede mejorar la precisión dimensional. wall_maximum_deviation afecta la precisión de la pared (mayor valor = menor precisión). Ninguna fuente da valores de holgura o interferencia para piezas que deben encajar; solo afirmaciones genéricas de precisión dimensional.',
      cita: { texto: 'Use Inner/Outer/Inner for the best external surface finish and dimensional accuracy as the external wall is printed undisturbed from an internal perimeter.', fuente: 'OrcaSlicer — Wall and Surfaces' },
    },
    {
      id: 'top-surface-expansion',
      titulo: 'Surface expansion',
      cuando: { problema: 'superficie' },
      cuerpo:
        'top_surface_expansion (novedad ≥ 2.4.2): expande las superficies superiores por una distancia (mm) para conectar superficies distintas y rellenar huecos donde un feature sube a través de ellas; no hace nada si shell layers = 0 o surface density = 0 %. Surface expansion: margin (despeje real respecto a las paredes), direction (inward / outward / inward_and_outward) e interacción con Only one wall (las paredes internas se eliminan sobre la superficie expandida).',
      cita: { texto: 'Expands the top surfaces by this distance (in mm) to connect distinct top surfaces and fill the gaps left where a feature rises through them.', fuente: 'OrcaSlicer — Top/Bottom Shells' },
    },
  ],
  reglas: [
    {
      id: 'mas-perimetros',
      accion: 'Aumenta el número de perímetros',
      porque: 'La resistencia de un modelo está definida principalmente por el número de perímetros, no por el relleno. Si la pieza es débil, subir perímetros es la palanca principal.',
      cuando: { problema: 'resistencia', paredes: 'pocas' },
      fuente: 'Prusa KB',
      alcance: 'Afirmación de una sola fuente (Prusa); no cuantifica la relación ni da un umbral a partir del cual el relleno empieza a importar.',
    },
    {
      id: 'alternate-extra-wall',
      accion: 'Activa alternate_extra_wall',
      porque: 'Añade una pared extra cada dos capas para que el relleno quede encajado verticalmente entre las paredes, resultando en impresiones más fuertes.',
      cuando: { problema: 'resistencia' },
      fuente: 'OrcaSlicer — Walls',
      alcance: 'Contradicciones documentadas: no funciona bien con "Ensure vertical shell thickness: All" (cambiar a "Moderate") ni con Lightning infill (poco relleno al que anclar).',
    },
    {
      id: 'usa-arachne',
      accion: 'Cambia el generador a Arachne',
      porque: 'Arachne ajusta dinámicamente el ancho de extrusión y maneja mejor los detalles finos y las transiciones entre número de paredes; Prusa lo considera superior para la mayoría de las impresiones.',
      cuando: { generador: 'classic' },
      fuente: 'OrcaSlicer — Wall Generator, Prusa KB',
      alcance: 'Prusa reserva Classic para piezas funcionales donde la precisión de esquinas cóncavas es importante; OrcaSlicer no declara preferencia explícita.',
    },
    {
      id: 'desactiva-detect-thin',
      accion: 'Desactiva detect thin walls (o usa Arachne)',
      porque: 'Detect thin walls genera paredes de una sola extrusión que reducen calidad superficial y resistencia. Arachne lo desactiva automáticamente y maneja mejor los detalles finos.',
      cuando: { generador: 'classic', problema: 'pared-delgada' },
      fuente: 'Prusa KB, OrcaSlicer — Walls',
      alcance: 'Prusa lo presenta como desactivación automática con Arachne; OrcaSlicer como recomendación. No hay conflicto.',
    },
    {
      id: 'grosor-optimo-pared',
      accion: 'Diseña el grosor de la pared como múltiplo del grosor óptimo',
      valor: '0,86 mm (2 perímetros, 0,2 mm)',
      porque: 'PrusaSlicer calcula el grosor óptimo de pared delgada para un número de perímetros y una altura de capa dados; no es simplemente número × ancho de extrusión, por el solape entre perímetros.',
      cuando: { problema: 'pared-delgada' },
      fuente: 'Prusa KB',
      alcance: 'Cálculo específico de PrusaSlicer (sección: rectángulo con extremos semicirculares); no corroborado por OrcaSlicer ni Simplify3D. No aplicar a otros slicers o boquillas sin verificar.',
    },
    {
      id: 'capas-solidas-minimo',
      accion: 'Pon al menos 3 capas sólidas superiores',
      valor: '≥ 3 capas',
      porque: 'OrcaSlicer recomienda al menos 3 shell layers; Prusa sugiere 3 a 0,3 mm y 9 a 0,1 mm (≈ 0,9 mm); Simplify3D exige mínimo 0,5 mm. A menor altura de capa, más capas hacen falta.',
      cuando: { problema: 'superficie' },
      fuente: 'OrcaSlicer — Top/Bottom Shells, Prusa KB, Simplify3D — Gaps in Top Layers',
      alcance: 'Umbrales difieren entre fuentes: OrcaSlicer ≥ 3 capas; Prusa ≈ 0,9 mm; Simplify3D ≥ 0,5 mm. El redactor presenta ambos, no elige uno.',
    },
    {
      id: 'capas-solidas-altura',
      accion: 'Aumenta las capas sólidas superiores',
      valor: '3 a 0,3 mm / 9 a 0,1 mm',
      porque: 'A menor altura de capa, más capas sólidas hacen falta para el mismo grosor mínimo; con 0,3 mm usar 3 capas superiores, con 0,1 mm usar 9.',
      cuando: { problema: 'superficie', alturaCapa: 'baja' },
      fuente: 'Prusa KB',
      alcance: 'Cifra de Prusa; Simplify3D exige mínimo 0,5 mm (5 capas a 0,1 mm). Presentar ambos umbrales con atribución.',
    },
    {
      id: 'solape-relleno-pared',
      accion: 'Pon el solape relleno-pared entre 25 % y 30 %',
      valor: '25–30 %',
      porque: 'top_bottom_infill_wall_overlap: solape del relleno sólido superior/inferior con las paredes para mejor unión y menos pinholes; 25–30 % es un buen punto de partida.',
      cuando: { problema: ['superficie', 'ninguno'] },
      fuente: 'OrcaSlicer — Top/Bottom Shells',
      alcance: 'La base del porcentaje cambia según el wall generator: Classic usa mitad del espaciado de pared interior + mitad del espaciado de relleno sólido interno; Arachne usa el espaciado de pared interior; con una sola pared, el espaciado de pared exterior. Cambiar de Classic a Arachne cambia el significado del mismo porcentaje.',
    },
    {
      id: 'inner-outer-voladizos',
      accion: 'Usa orden Inner/Outer',
      porque: 'Inner/Outer es mejor para voladizos: las paredes voladas se adhieren a un perímetro vecino, a costa de calidad superficial ligeramente reducida.',
      cuando: { voladizos: 'si' },
      fuente: 'OrcaSlicer — Wall and Surfaces',
      alcance: 'Trade-off explícito: mejor voladizo o mejor acabado superficial, no ambos a la vez. El usuario prioriza.',
    },
    {
      id: 'inner-outer-inner-acabado',
      accion: 'Usa orden Inner/Outer/Inner',
      porque: 'Inner/Outer/Inner da mejor acabado superficial y precisión dimensional (perímetro externo impreso sin perturbar); recomendado sobre Outer/Inner en la mayoría de casos. Requiere mínimo 3 paredes.',
      cuando: { voladizos: 'no', paredes: 'suficientes' },
      fuente: 'OrcaSlicer — Wall and Surfaces',
      alcance: 'Reduce el rendimiento de voladizo (no hay perímetro interno contra el que imprimir la pared externa). La primera capa se imprime Inner/Outer.',
    },
    {
      id: 'outer-inner-precision',
      accion: 'Usa orden Outer/Inner',
      porque: 'Outer/Inner ofrece la misma calidad superficial y precisión dimensional que Inner/Outer/Inner, pero con costuras Z menos consistentes (la primera extrusión de una nueva capa empieza en superficie visible).',
      cuando: { voladizos: 'no', paredes: 'suficientes', problema: 'precision' },
      fuente: 'OrcaSlicer — Wall and Surfaces',
      alcance: 'La diferencia con Inner/Outer/Inner no está en la calidad superficial (idéntica) sino en la consistencia de la costura Z y en el mínimo de 3 paredes de Inner/Outer/Inner.',
    },
    {
      id: 'reduce-crossing-wall',
      accion: 'Activa reduce crossing wall',
      porque: 'Evita cruzar paredes en movimientos de viaje; reduce defectos superficiales y stringing (PETG/TPU); recomendado para prints detallados/estéticos. Aumenta el tiempo de impresión.',
      cuando: { problema: ['superficie', 'precision', 'ninguno'] },
      fuente: 'OrcaSlicer — Wall and Surfaces',
      alcance: 'Aumenta el tiempo de impresión; max_travel_detour_distance configurable (absoluto, porcentaje o 0 sin límite).',
    },
    {
      id: 'vase-mode-ajustes',
      accion: 'Ajusta capas sólidas inferiores y ancho de extrusión',
      valor: '0,45 → 0,6 mm',
      porque: 'En vase mode se puede ajustar el número de capas sólidas inferiores y el ancho de extrusión de los perímetros externos para un vaso más grueso/fuerte/estanco. El modelo debe definirse como sólido (solo dimensiones exteriores) y solo se imprime un objeto a la vez.',
      cuando: { problema: 'vase' },
      fuente: 'Prusa KB',
      alcance: 'PrusaSlicer ajusta automáticamente el resto (1 perímetro, 0 % relleno, capas sólidas superiores desactivadas, soportes desactivados, ensure vertical shell thickness desactivado).',
    },
    {
      id: 'only-one-wall-letras',
      accion: 'Activa only one wall en superficies planas o letras',
      porque: 'Una sola pared en superficies planas da más espacio al patrón de relleno superior y un acabado más limpio; útil en features pequeñas (letras). Requiere shell layers > 0.',
      cuando: { problema: ['superficie', 'ninguno'], paredes: 'suficientes' },
      fuente: 'OrcaSlicer — Wall and Surfaces, Prusa KB',
      alcance: 'Prusa controla top y bottom por separado; OrcaSlicer expone only_one_wall_first_layer / only_one_wall_top.',
    },
    {
      id: 'top-surface-expansion',
      accion: 'Usa top surface expansion para conectar superficies',
      porque: 'Expande las superficies superiores por una distancia (mm) para conectar superficies distintas y rellenar huecos donde un feature sube a través de ellas.',
      cuando: { problema: 'superficie' },
      fuente: 'OrcaSlicer — Top/Bottom Shells',
      alcance: 'No hace nada si shell layers = 0 o surface density = 0 %. Margin, direction (inward/outward/inward_and_outward) e interacción con Only one wall.',
    },
    {
      id: 'external-perimeters-first',
      accion: 'Considera external perimeters first',
      porque: 'Imprimir de exterior a interior puede mejorar la precisión dimensional (perímetro externo primero, exceso presionado hacia afuera); la superficie queda ligeramente menos suave. Prusa y OrcaSlicer coinciden en la dirección pero difieren en el efecto secundario reportado.',
      cuando: { problema: 'precision' },
      fuente: 'Prusa KB, OrcaSlicer — Wall and Surfaces',
      alcance: 'Prusa: superficie menos suave; OrcaSlicer: costuras Z menos consistentes. Atribuir cada efecto a su fuente, no fusionarlos.',
    },
  ],
  fueraDeAlcance: [
    {
      sintoma: 'Las capas se sueltan por dentro',
      porQue: 'Es separación entre capas: la adhesión falla de forma localizada. Esta guía cubre paredes y perímetros, no la delaminación puntual.',
      guia: 'separaciones-entre-capas',
    },
    {
      sintoma: 'Las esquinas se levantan de la cama',
      porQue: 'Es warping por contracción térmica, no un problema de paredes o perímetros.',
      guia: 'warping-pla',
    },
    {
      sintoma: 'Voladizos que cuelgan o soportes que fallan',
      porQue: 'Es un problema de voladizos y soportes, no de paredes y perímetros.',
      guia: 'voladizos-y-soportes',
    },
    {
      sintoma: 'Pieza débil sólo en el eje Z',
      porQue: 'Es anisotropía por orientación: el eje Z es el eslabón débil de la adhesión entre capas.',
      guia: 'orientacion-resistencia',
    },
  ],
  fuentes: [
    {
      url: 'https://help.prusa3d.com/article/layers-and-perimeters_1748',
      quien: 'Prusa KB',
      que: 'Perímetros, capas sólidas, detect thin walls, grosores óptimos, orden de paredes, vase mode, gap fill.',
    },
    {
      url: 'https://github.com/OrcaSlicer/OrcaSlicer/wiki/strength_settings_walls',
      quien: 'OrcaSlicer — Walls',
      que: 'wall_loops, alternate_extra_wall, detect_thin_wall, recomendación de Arachne.',
    },
    {
      url: 'https://github.com/OrcaSlicer/OrcaSlicer/wiki/strength_settings_top_bottom_shells',
      quien: 'OrcaSlicer — Top/Bottom Shells',
      que: 'shell_layers, shell_thickness, solape, surface density, top_surface_expansion, center_of_surface_pattern.',
    },
    {
      url: 'https://www.simplify3d.com/resources/print-quality-troubleshooting/gaps-in-top-layers/',
      quien: 'Simplify3D — Gaps in Top Layers',
      que: 'Grosor mínimo de capas sólidas superiores (0,5 mm), relleno como base, under-extrusion.',
    },
    {
      url: 'https://github.com/OrcaSlicer/OrcaSlicer/wiki/quality_settings_wall_generator',
      quien: 'OrcaSlicer — Wall Generator',
      que: 'Arachne vs Classic, wall_transition_angle, min_bead_width, min_feature_size, wall_maximum_resolution.',
    },
    {
      url: 'https://github.com/OrcaSlicer/OrcaSlicer/wiki/quality_settings_wall_and_surfaces',
      quien: 'OrcaSlicer — Wall and Surfaces',
      que: 'Orden de paredes, narrow walls, reduce_crossing_wall, only_one_wall, flow ratios, gap fill, precisión dimensional.',
    },
    {
      url: 'https://www.simplify3d.com/resources/print-quality-troubleshooting/gaps-in-thin-walls/',
      quien: 'Simplify3D — Gaps in Thin Walls',
      que: 'Paredes delgadas, gap fill, ajuste de ancho de extrusión, ejemplo 1,0 mm / 0,4 mm.',
    },
  ],
};
