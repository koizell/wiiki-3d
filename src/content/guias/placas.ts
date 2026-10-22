import type { Guia } from './tipos';
import { AUTOR } from './autor.ts';

export const placas: Guia = {
  slug: 'placas',
  titulo: 'Placas de impresión (build plates)',
  resumen:
    'Qué chapa poner según tu material, cómo limpiarla sin arruinarla y por qué una regla de acetona que vale para una placa la estropea en otra.',
  sintoma: 'La pieza no se pega (o no se puede despegar)',
  dibujo: 'cama',
  entrada:
    'La chapa no es un accesorio: es la mitad de la adhesión. Aquí se elige según el filamento, se explica por qué el glue sirve para una cosa distinta según la superficie, y se da la limpieza que no daña la que tienes.',
  autor: AUTOR,
  actualizado: '2026-10-16',
  minutos: 3,

  diferencial: {
    contra: 'warping o problemas de adhesión',
    contraCorto: 'warping o adhesión',
    comprobaciones: [
      {
        id: 'base',
        mira: 'La base de la pieza: ¿está plana o arqueada hacia arriba?',
        si: 'Arqueada desde los bordes: es warping. La chapa decide la cifra de cama, pero el diagnóstico mayor es térmico.',
        no: 'Plana. El problema es de adhesión a la chapa, y esta guía es la del material y la superficie.',
      },
      {
        id: 'pegado',
        mira: '¿La pieza no se pega o no se puede despegar?',
        si: 'No se despega y a veces se lleva la chapa. Es adhesión excesiva sobre PEI lisa, con un arreglo distinto al de falta de adhesión.',
        no: 'No se pega. Antes de la superficie, conviene descartar nivelación y boquilla.',
      },
      {
        id: 'superficie',
        mira: '¿La adhesión ha bajado con el uso aunque no hayas tocado nada?',
        si: 'Casi seguro es grasa en la chapa. La limpieza depende de si es texturizada o lisa.',
        no: 'No hay uso previo o el fallo es constante. Entonces el ajuste es de chapa y material.',
      },
    ],
    siNo: { guia: 'warping-pla', etiqueta: 'Warping en PLA' },
  },

  variables: [
    {
      id: 'chapa',
      etiqueta: 'Chapa',
      indicador: 'cama',
      para: 'Cada superficie tiene su regla de glue, de limpieza y de despegue. Sin chapa, ninguna acción sale filtrada.',
      necesaria: true,
      opciones: [
        { id: 'smooth-prusa', etiqueta: 'Smooth PEI (Prusa)', detalle: 'Film de PEI sobre acero' },
        { id: 'textured-prusa', etiqueta: 'Textured / powder-coated (Prusa)', detalle: 'Producción, PETG' },
        { id: 'satin-prusa', etiqueta: 'Satin (Prusa)', detalle: 'Entre lisa y texturizada' },
        { id: 'pa-nylon-prusa', etiqueta: 'PA Nylon (Prusa)', detalle: 'Poliamidas y PETG' },
        { id: 'pp-prusa', etiqueta: 'PP (Prusa)', detalle: 'Polipropileno' },
        { id: 'hightemp-prusa', etiqueta: 'HighTemp (Prusa, sólo HT90)', detalle: 'PEEK, PEKK, PPSU' },
        { id: 'textured-bambu', etiqueta: 'Textured PEI (Bambu)', detalle: 'Autodesprendimiento al enfriar' },
        { id: 'smooth-bambu', etiqueta: 'Smooth PEI (Bambu)', detalle: 'Superficie plana' },
        { id: 'dual-texture-bambu', etiqueta: 'Dual-Texture PEI (Bambu)', detalle: 'Liso por un lado, texturizado por el otro' },
        { id: 'engineering-bambu', etiqueta: 'Engineering Plate (Bambu)', detalle: 'ABS, ASA, PC, PA' },
        { id: 'cool-supertack-bambu', etiqueta: 'Cool Plate SuperTack (Bambu)', detalle: 'PLA y PETG a baja temperatura' },
        { id: 'cool-legacy-bambu', etiqueta: 'Cool Plate (descatalogada, Bambu)', detalle: 'Sólo PLA' },
        { id: 'hightemp-legacy-bambu', etiqueta: 'High Temperature Plate (descatalogada, Bambu)', detalle: 'PLA directo' },
        { id: 'effect-bambu', etiqueta: '3D Effect Sheet (Bambu)', detalle: 'Film con textura' },
      ],
    },
    {
      id: 'problema',
      etiqueta: '¿Qué te pasa?',
      indicador: 'general',
      para: 'La limpieza, el despegue y el glue cambian según el síntoma, no solo según la chapa.',
      necesaria: true,
      opciones: [
        { id: 'elegir', etiqueta: 'Elegir chapa para un material', detalle: 'Sin fallo actual' },
        { id: 'no-pega', etiqueta: 'La pieza no se pega' },
        { id: 'demasiado-pegada', etiqueta: 'No se puede despegar' },
        { id: 'sucia', etiqueta: 'La adhesión ha bajado con el uso' },
      ],
    },
    {
      id: 'material',
      etiqueta: 'Material',
      indicador: 'material',
      para: 'El mismo glue es obligatorio en una chapa y está prohibido en otra para el mismo material. El filamento cambia la respuesta.',
      necesaria: false,
      campos: ['material'],
      opciones: [
        { id: 'pla', etiqueta: 'PLA', detalle: 'El que peor se pega' },
        { id: 'pla-cf', etiqueta: 'PLA-CF' },
        { id: 'petg', etiqueta: 'PETG', detalle: 'Se pega de más sobre PEI lisa' },
        { id: 'abs', etiqueta: 'ABS o ASA' },
        { id: 'pc', etiqueta: 'PC o PET-CF' },
        { id: 'tpu', etiqueta: 'TPU' },
        { id: 'pa', etiqueta: 'PA o nylon' },
        { id: 'pp', etiqueta: 'Polipropileno' },
      ],
    },
  ],

  conocimiento: [
    {
      id: 'bambu-generaciones',
      titulo: 'Chapas Bambu de 1.ª y 2.ª generación',
      cuando: {
        chapa: ['textured-bambu', 'smooth-bambu', 'cool-supertack-bambu', 'engineering-bambu', 'dual-texture-bambu'],
      },
      puntos: [
        'En 256 × 256 mm hay dos generaciones: la 1.ª compatible con A1 y X1/P1, la 2.ª con P2S/X2D,.',
        'y la diferencia es un código QR. Una placa de 1.ª generación **no soporta el reconocimiento automático** en impresoras de 2.ª generación,.',
        'aunque físicamente encaje; si aparece «Build plate not recognized», elegir «Resolved» o desactivar la detección.',
      ],
      indicador: 'maquina',
      cuerpo:
        'En 256 × 256 mm hay dos generaciones: la 1.ª compatible con A1 y X1/P1, la 2.ª con P2S/X2D, y la diferencia es un código QR. Una placa de 1.ª generación **no soporta el reconocimiento automático** en impresoras de 2.ª generación, aunque físicamente encaje; si aparece «Build plate not recognized», elegir «Resolved» o desactivar la detección.',
      cita: {
        texto: 'First-generation build plates do not support the build plate recognition feature of second-generation printers (P2S and newer).',
        fuente: 'wiki.bambulab.com',
      },
    },
    {
      id: 'acetona',
      titulo: 'Acetona: una chapa la reviven, la otra la estropea',
      cuando: {
        chapa: ['smooth-prusa', 'textured-bambu'],
      },
      puntos: [
        'En la **Textured PEI de Bambu** la acetona daña la superficie PEI y está prohibida.',
        'En la **Smooth PEI de Prusa** puede usarse 1–2 veces al mes si el IPA no es suficiente.',
        'Son superficies y procesos distintos (PEI en polvo sobre acero inox vs. film de PEI pegado con adhesivo 3M).',
        'no se generaliza el permiso ni la prohibición a «todas las placas».',
      ],
      indicador: 'cama',
      cuerpo:
        'En la **Textured PEI de Bambu** la acetona daña la superficie PEI y está prohibida. En la **Smooth PEI de Prusa** puede usarse 1–2 veces al mes si el IPA no es suficiente. Son superficies y procesos distintos (PEI en polvo sobre acero inox vs. film de PEI pegado con adhesivo 3M); no se generaliza el permiso ni la prohibición a «todas las placas».',
      cita: {
        texto: 'Do not clean the Textured PEI with Acetone, as it will damage the PEI surface.',
        fuente: 'wiki.bambulab.com',
      },
    },
    {
      id: 'alcohol-detergente',
      titulo: 'Alcohol vs. detergente en PEI texturizado',
      cuando: { chapa: 'textured-bambu' },
      puntos: [
        'En la Textured PEI de Bambu el alcohol puede simplemente **dispersar** los aceites.',
        'se recomienda agua templada + detergente de cocina + frotado (sin aceites ni cremas hidratantes en el detergente).',
        'El alcohol es la primera opción en la Smooth PEI de Prusa (IPA ~90 % en frío).',
        'El químico depende de la superficie, no del filamento.',
      ],
      indicador: 'cama',
      cuerpo:
        'En la Textured PEI de Bambu el alcohol puede simplemente **dispersar** los aceites; se recomienda agua templada + detergente de cocina + frotado (sin aceites ni cremas hidratantes en el detergente). El alcohol es la primera opción en la Smooth PEI de Prusa (IPA ~90 % en frío). El químico depende de la superficie, no del filamento.',
      cita: {
        texto: 'Alcohol might just spread the oils on the print surface instead of removing it.',
        fuente: 'wiki.bambulab.com',
      },
    },
    {
      id: 'water-flow',
      titulo: 'Diagnóstico por flujo de agua (PEI texturizado)',
      cuando: { chapa: 'textured-bambu', problema: 'sucia' },
      puntos: [
        'En la Textured PEI de Bambu se moja la placa y se observa el flujo: si el agua baja en **hilos o gotas**,.',
        'la placa está sucia (mala adhesión); si forma **lámina fina**, está limpia.',
        'Los aceites de las manos transfieren a la superficie y se ven durante la primera capa.',
        'Casi todos los problemas de adhesión vienen de ahí.',
      ],
      indicador: 'calibracion',
      cuerpo:
        'En la Textured PEI de Bambu se moja la placa y se observa el flujo: si el agua baja en **hilos o gotas**, la placa está sucia (mala adhesión); si forma **lámina fina**, está limpia. Los aceites de las manos transfieren a la superficie y se ven durante la primera capa. Casi todos los problemas de adhesión vienen de ahí.',
    },
    {
      id: 'smooth-prusa-revival',
      titulo: 'Revivir una Smooth PEI de Prusa tras 1–2 años',
      cuando: { chapa: 'smooth-prusa' },
      puntos: [
        'Tras 1–2 años la superficie puede pulirse y perder adhesión.',
        'Se puede **revivir** con lija de grano alto (600–1000),.',
        'lijando suavemente para traer PEI fresco a la superficie (queda con textura muy ligera).',
        'Las burbujas bajo el PEI suelen desaparecer en días o semanas; la abolladura del desembalaje se va dando la vuelta y usando el otro lado,.',
        'con el calor de la cama en 1–2 días de impresión.',
      ],
      indicador: 'calibracion',
      cuerpo:
        'Tras 1–2 años la superficie puede pulirse y perder adhesión. Se puede **revivir** con lija de grano alto (600–1000), lijando suavemente para traer PEI fresco a la superficie (queda con textura muy ligera). Las burbujas bajo el PEI suelen desaparecer en días o semanas; la abolladura del desembalaje se va dando la vuelta y usando el otro lado, con el calor de la cama en 1–2 días de impresión.',
      cita: {
        texto: 'After extended use (1-2 years), the surface can smooth out further, which affects adhesion.',
        fuente: 'help.prusa3d.com',
      },
    },
    {
      id: 'cool-supertack-datos',
      titulo: 'Cool Plate SuperTack: PLA a 40 °C, PETG a 55–60 °C',
      cuando: { chapa: 'cool-supertack-bambu' },
      puntos: [
        'Adhiere fuerte con PLA incluso a 40 °C de cama y con PETG a 55–60 °C (2.ª generación).',
        'en máquinas con parámetros compartidos (X/P series) el PETG puede seguir recomendándose a ~65 °C para reducir warping y *elephant foot* en.',
        'modelos grandes.',
        'Recubrimiento algo más blando que el Textured PEI: más susceptible a arañazos de espátula, que no afectan significativamente a la adhesión.',
      ],
      indicador: 'calibracion',
      cuerpo:
        'Adhiere fuerte con PLA incluso a 40 °C de cama y con PETG a 55–60 °C (2.ª generación); en máquinas con parámetros compartidos (X/P series) el PETG puede seguir recomendándose a ~65 °C para reducir warping y *elephant foot* en modelos grandes. Recubrimiento algo más blando que el Textured PEI: más susceptible a arañazos de espátula, que no afectan significativamente a la adhesión.',
      cifra: { valor: '40 / 55–60 °C', nota: 'PLA / PETG en Cool Plate SuperTack' },
      cita: {
        texto: 'Even at a low bed temperature of just 40 °C, PLA prints adhere firmly to the plate.',
        fuente: 'wiki.bambulab.com',
      },
    },
    {
      id: 'cool-supertack-desgaste',
      titulo: 'Desgaste del Cool Plate SuperTack',
      cuando: { chapa: 'cool-supertack-bambu' },
      puntos: [
        'El Cool Plate SuperTack tiene el único dato cuantitativo de pérdida de adhesión de todas las chapas: menos del 20 % tras 300 impresiones,.',
        'obtenido con PLA Basic en una A1. Bambu declara las demás chapas como consumibles sin porcentaje ni número de impresiones.',
      ],
      indicador: 'calibracion',
      cuerpo:
        'El Cool Plate SuperTack tiene el único dato cuantitativo de pérdida de adhesión de todas las chapas: menos del 20 % tras 300 impresiones, obtenido con PLA Basic en una A1. Bambu declara las demás chapas como consumibles sin porcentaje ni número de impresiones.',
      cifra: { valor: '< 20 %', nota: 'pérdida de adhesión tras 300 impresiones (PLA Basic, A1)' },
    },
    {
      id: 'effect-sheet',
      titulo: '3D Effect Sheet: configuración y límites',
      cuando: { chapa: 'effect-bambu' },
      puntos: [
        'Film con texturas ópticas (diamante, estrellado, galaxia, fibra de carbono) transferidas a la base.',
        'Recomendado PLA y TPU.',
        'Debe aplicarse sólo sobre la plancha de acero oficial Bambu.',
        'El tipo de placa debe configurarse como Smooth PEI / High Temp Plate.',
        'La calibración por LIDAR del X1 no funciona con estos films; conviene omitirla o calibrar con una placa normal.',
        'Son consumibles.',
      ],
      indicador: 'calibracion',
      cuerpo:
        'Film con texturas ópticas (diamante, estrellado, galaxia, fibra de carbono) transferidas a la base. Recomendado PLA y TPU. Debe aplicarse sólo sobre la plancha de acero oficial Bambu. El tipo de placa debe configurarse como Smooth PEI / High Temp Plate. La calibración por LIDAR del X1 no funciona con estos films; conviene omitirla o calibrar con una placa normal. Son consumibles.',
    },
    {
      id: 'hightemp-prusa',
      titulo: 'HighTemp de Prusa, sólo para HT90',
      cuando: { chapa: 'hightemp-prusa' },
      puntos: [
        'Diseñada para materiales especiales de alta temperatura (PEEK, PEEK-CF, PEI, PEKK,.',
        'PPSU) que de otro modo tendrían adhesión pobre o excesiva en chapas estándar.',
        'PLA y PETG básicos no adhieren muy bien porque se desarrolló para materiales de alto rendimiento.',
        'Sólo para la Prusa Pro HT90, que puede usar además Textured, PP y PA Nylon.',
      ],
      indicador: 'calibracion',
      cuerpo:
        'Diseñada para materiales especiales de alta temperatura (PEEK, PEEK-CF, PEI, PEKK, PPSU) que de otro modo tendrían adhesión pobre o excesiva en chapas estándar. PLA y PETG básicos no adhieren muy bien porque se desarrolló para materiales de alto rendimiento. Sólo para la Prusa Pro HT90, que puede usar además Textured, PP y PA Nylon.',
    },
    {
      id: 'generacion-recognition-info',
      titulo: 'Reconocimiento automático de placa en Bambu',
      cuando: {
        chapa: ['textured-bambu', 'smooth-bambu', 'cool-supertack-bambu', 'engineering-bambu', 'dual-texture-bambu', 'cool-legacy-bambu', 'hightemp-legacy-bambu', 'effect-bambu'],
      },
      puntos: [
        'Una P2S/X2D puede usar físicamente chapas de 1.ª generación, pero el tipo no se reconocerá automáticamente.',
        'lo mismo le pasa a una X1 con chapas de 2.ª generación.',
        'A1 y P1 son totalmente compatibles con chapas de 2.ª generación.',
        'Si el tipo no se reconoce, elegir «Resolved» o desactivar la detección de placa.',
      ],
      indicador: 'cama',
      cuerpo:
        'Una P2S/X2D puede usar físicamente chapas de 1.ª generación, pero el tipo no se reconocerá automáticamente; lo mismo le pasa a una X1 con chapas de 2.ª generación. A1 y P1 son totalmente compatibles con chapas de 2.ª generación. Si el tipo no se reconoce, elegir «Resolved» o desactivar la detección de placa.',
    },
    {
      id: 'wipe-zone',
      titulo: 'Zona de wipe: desgaste cosmético normal',
      cuando: {
        chapa: ['textured-bambu', 'smooth-bambu', 'engineering-bambu', 'cool-supertack-bambu', 'dual-texture-bambu'],
      },
      puntos: [
        'Antes de imprimir, el nozzle se limpia en un nozzle wiper y luego se frota en una zona de wipe de la propia chapa.',
        'En X1C, P1S/P1P y A1 puede haber «desgaste» en esa zona, pero no afecta a la función del nozzle ni de la placa.',
        'En la A1 mini la zona de wipe está en el heatbed y no se desgasta la placa.',
      ],
      indicador: 'cama',
      cuerpo:
        'Antes de imprimir, el nozzle se limpia en un nozzle wiper y luego se frota en una zona de wipe de la propia chapa. En X1C, P1S/P1P y A1 puede haber «desgaste» en esa zona, pero no afecta a la función del nozzle ni de la placa. En la A1 mini la zona de wipe está en el heatbed y no se desgasta la placa.',
    },
    {
      id: 'espesor-recalibrar',
      titulo: 'Espesor distinto al cambiar de chapa',
      puntos: [
        'Cada tipo de chapa tiene espesor ligeramente distinto.',
        'En impresoras sin loadcell, cambiar de chapa requiere recalibrar la primera capa (First Layer Calibration en i3) o usar perfiles de chapa.',
        'distintos.',
        'La Smooth PEI de Prusa es más gruesa que la texturizada y la satinada.',
      ],
      indicador: 'calibracion',
      cuerpo:
        'Cada tipo de chapa tiene espesor ligeramente distinto. En impresoras sin loadcell, cambiar de chapa requiere recalibrar la primera capa (First Layer Calibration en i3) o usar perfiles de chapa distintos. La Smooth PEI de Prusa es más gruesa que la texturizada y la satinada.',
    },
    {
      id: 'consumible',
      titulo: 'Las chapas son consumibles',
      puntos: [
        'Las chapas son **consumibles** y no están cubiertas por garantía: los recubrimientos disminuyen con el tiempo.',
        'Sólo las chapas defectuosas de llegada están cubiertas; el daño cosmético (arañazos, grietas,.',
        'etc.) no. Prusa declara la chapa como consumible sin dar porcentaje ni número de impresiones.',
        'sólo el Cool Plate SuperTack tiene cifra cuantitativa de desgaste.',
      ],
      indicador: 'cama',
      cuerpo:
        'Las chapas son **consumibles** y no están cubiertas por garantía: los recubrimientos disminuyen con el tiempo. Sólo las chapas defectuosas de llegada están cubiertas; el daño cosmético (arañazos, grietas, etc.) no. Prusa declara la chapa como consumible sin dar porcentaje ni número de impresiones; sólo el Cool Plate SuperTack tiene cifra cuantitativa de desgaste.',
    },
    {
      id: 'glue-almacenamiento',
      titulo: 'El glue sin usar: dónde se guarda',
      cuando: {
        chapa: ['engineering-bambu', 'smooth-bambu', 'textured-bambu', 'smooth-prusa', 'satin-prusa'],
      },
      puntos: [
        'El glue que no se usa se guarda en un **lugar fresco y seco**, lejos de la luz solar directa.',
        'Es lo que le alarga la vida útil.',
        'La fuente no da meses ni fecha de caducidad: sólo el dónde guardarlo.',
      ],
      indicador: 'entorno',
      cuerpo:
        'El glue que no se usa se guarda en un **lugar fresco y seco**, lejos de la luz solar directa: es lo que le alarga la vida útil. La fuente no da meses ni fecha de caducidad, sólo el dónde guardarlo, así que aquí no se publica ninguna cifra.',
      cita: {
        texto:
          'Please store unused glue in a cool and dry place away from direct sunlight to extend its shelf life',
        fuente: 'Bambu Lab',
      },
    },
  ],

  reglas: [
    {
      id: 'no-glue-cool-supertack',
      accion: 'No uses glue en Cool Plate SuperTack',
      cuando: { chapa: 'cool-supertack-bambu', material: ['pla', 'pla-cf', 'petg'] },
      porque:
        'Diseñada para adherir fuerte sin glue con PLA y PETG; a baja temperatura (PLA a 40 °C, PETG a 55–60 °C) reduce energía, atascos y consumo. El glue no está previsto y puede degradar la superficie.',
      fuente: 'Bambu Lab',
      alcance:
        '**Prohibido otro material:** si marcas ABS, PC, PA, TPU o PP, esta chapa puede dañar su recubrimiento. No la uses con ellos.',
    },
    {
      id: 'cool-supertack-no-compatible',
      accion: 'No imprimas ABS, PC, PA, TPU o PP en Cool Plate SuperTack',
      cuando: { chapa: 'cool-supertack-bambu', material: ['abs', 'pc', 'pa', 'tpu', 'pp'] },
      porque:
        'La placa sólo está pensada para PLA y PETG. Otros materiales pueden dañar el recubrimiento, y la adhesión no está garantizada.',
      fuente: 'Bambu Lab',
      alcance:
        'La restricción viene de una sola página de Bambu; no incluye una matriz completa placa×filamento porque la «Filament Guide» no está en este lote.',
    },
    {
      id: 'engineering-glue',
      accion: 'Aplica glue antes de imprimir en Engineering Plate',
      cuando: { chapa: 'engineering-bambu' },
      porque:
        'El Engineering Plate pide glue **antes de cualquier filamento** (barra o líquido). Su recubrimiento reforzado resiste altas temperaturas y corrosión, y está optimizado para ABS, ASA, PC y PA.',
      fuente: 'Bambu Lab',
      alcance:
        'La elección entre glue stick (mejor estabilidad y primera capa) y liquid glue (mejor extracción) depende del filamento y del entorno; no hay una única respuesta universal.',
    },
    {
      id: 'smooth-bambu-glue',
      accion: 'Aplica glue en Smooth PEI Bambu (salvo PLA)',
      cuando: { chapa: 'smooth-bambu', material: ['petg', 'abs', 'pc', 'pa', 'tpu', 'pla-cf', 'pp'] },
      porque:
        'En la Smooth PEI de Bambu, sólo PLA no necesita glue; todos los demás filamentos lo requieren para evitar que el sheet de PEI se rasgue.',
      fuente: 'Bambu Lab',
      alcance:
        'El motivo no es adhesión débil sino evitar daño al sheet PEI. Usar espátula con cuidado y calentar la cama a ~50 °C si queda demasiado adherido.',
    },
    {
      id: 'textured-bambu-petg-glue-reduce',
      accion: 'Aplica glue en Textured PEI Bambu cuando PETG se pega de más',
      cuando: { chapa: 'textured-bambu', material: 'petg', problema: 'demasiado-pegada' },
      porque:
        'La Textured PEI suele adherir sin glue, pero para PETG aplicar glue reduce la adhesión y evita dañar la chapa al despegar. También reduce el blanqueo de la base si se fuerza la extracción.',
      fuente: 'Bambu Lab',
      alcance:
        'Aquí el glue baja la adhesión, lo contrario que en Smooth PEI o Engineering. La función depende de la placa, no sólo del material.',
    },
    {
      id: 'textured-bambu-abs-pa-glue',
      accion: 'Aplica glue stick en Textured PEI para PC, PA, ABS y ASA',
      cuando: { chapa: 'textured-bambu', material: ['abs', 'pc', 'pa'] },
      porque:
        'Para imprimir PC/PA/ABS/ASA en Textured PEI puede hacer falta una capa de glue stick. Si el modelo se adhiere demasiado, aplicar alcohol en la zona de contacto facilita la extracción; evitar forzar.',
      fuente: 'Bambu Lab',
      alcance:
        'Aparece en una sola página de Bambu; no está corroborado por otra fuente de este lote.',
    },
    {
      id: 'smooth-prusa-petg-glue',
      accion: 'Aplica gluestick en Smooth PEI de Prusa para PETG, ASA, ABS y PC Blend',
      cuando: { chapa: 'smooth-prusa', material: ['petg', 'abs', 'pc'] },
      porque:
        'La Smooth PEI de Prusa tolera bien PLA, HIPS, ABS/ASA y compuestos en directo, pero para PETG, ASA, ABS y PC Blend **puede** hacer falta una capa de gluestick: alto riesgo de daño al despegar.',
      fuente: 'Prusa Research',
      alcance:
        'El «puede» es parte del dato: no es obligatorio en todos los casos; las piezas con esquinas vivas o pequeña área de primera capa se despegan menos. La fila del PETG de la tabla de Prusa dice además «Cleaned with water» —se limpia con agua—, pero el reparto por chapa de esa tabla no es asignable con seguridad: queda como nota de la fuente, no como excepción firme al IPA de la Smooth PEI.',
    },
    {
      id: 'compatibilidad-pa-nylon',
      accion: 'Usa chapas PEI estándar para materiales distintos de poliamidas y PETG',
      cuando: { chapa: 'pa-nylon-prusa', material: ['pla', 'abs', 'pc', 'tpu'] },
      porque:
        'La PA Nylon es para poliamidas (nylon), porque se adhiere generalmente muy mal a las chapas PEI estándar. Es compatible con la mayoría de poliamidas y PETG; con otros, la adhesión puede no bastar.',
      fuente: 'Prusa Research',
      alcance:
        'La chapa es especializada: no es una chapa universal para cualquier material.',
    },
    {
      id: 'pp-solo-pp',
      accion: 'No imprimas otros materiales en PP Prusa',
      cuando: { chapa: 'pp-prusa', material: ['pla', 'petg', 'abs', 'pc', 'tpu', 'pa'] },
      porque:
        'La PP está adecuada sobre todo para polipropileno (especialmente Prusament PP Carbon Fiber Black); la adhesión de otros materiales a esta superficie es muy pobre.',
      fuente: 'Prusa Research',
      alcance:
        'Adecuada «sobre todo» para polipropileno: la fuente no dice que sea imposible con otros.',
    },
    {
      id: 'hightemp-prusa-solo-HT90',
      accion: 'Usa HighTemp Prusa sólo en Prusa Pro HT90',
      cuando: { chapa: 'hightemp-prusa' },
      porque:
        'La HighTemp es para PEEK, PEEK-CF, PEI, PEKK y PPSU. PLA y PETG básicos adhieren mal. Sólo es compatible con la Prusa Pro HT90, que puede usar también Textured, PP y PA Nylon.',
      fuente: 'Prusa Research',
      alcance:
        'Los datos de compatibilidad de filamento para esta chapa sólo se afirman para los materiales nombrados en la fuente.',
    },
    {
      id: 'limpia-textured-bambu',
      accion: 'Lava la Textured PEI con agua y detergente (sin acetona)',
      cuando: { chapa: 'textured-bambu', problema: 'sucia' },
      valor: 'Agua templada + detergente, sin aceites',
      porque:
        'El detergente es desengrasante y penetra en las texturas, cosa que el alcohol no hace: mojar la placa, aplicarlo, frotar con esponja o pad en las ranuras, enjuagar, secar y sujetar por los bordes.',
      fuente: 'Bambu Lab',
      alcance:
        'La acetona está prohibida en esta superficie. Desgastar con lija fina o lana de acero crea superficie nueva y mejora la adhesión; limpiar el polvo de lijado después.',
    },
    {
      id: 'limpia-smooth-prusa',
      accion: 'Limpia la Smooth PEI de Prusa con IPA en frío',
      cuando: { chapa: 'smooth-prusa', problema: 'sucia' },
      valor: 'IPA ~90 % o alcohol desnaturalizado, en frío',
      porque:
        'Toallita sin perfume, en frío. Ni productos para la piel: pueden llevar aceites que arruinan la adhesión. La acetona, 1–2 veces al mes si el IPA no basta. Tras 1–2 años, revivir con lija 600–1000.',
      fuente: 'Prusa Research',
      alcance:
        '**No usar en exceso:** la acetona está permitida sólo de forma ocasional. Si la limpieza con IPA no es suficiente y el problema persiste, revisar desgaste o recuperación con lija.',
    },
    {
      id: 'no-acetona-textured',
      accion: 'No uses acetona en Textured PEI de Bambu',
      cuando: { chapa: 'textured-bambu' },
      porque:
        'La acetona daña la superficie PEI de la Textured PEI de Bambu. La restricción es específica de esta superficie.',
      fuente: 'Bambu Lab',
      alcance:
        'La prohibición es específica de la Textured PEI Bambu. No se extiende a otras placas, ni a la Smooth PEI de Prusa, donde está permitida de forma ocasional.',
    },
    {
      id: 'despega-enfriando-textured',
      accion: 'Deja enfriar y flexiona la placa',
      cuando: { chapa: 'textured-bambu', problema: 'demasiado-pegada' },
      valor: '≤ 35 °C de cama antes de despegar',
      porque:
        'La Textured PEI se despega sola al enfriar: esperar a la cama a temperatura ambiente y, según Bambu, a 35 °C o menos, y flexionar. Con soportes arbóreos, brims o paneles grandes, mejor espátula.',
      fuente: 'Bambu Lab',
      alcance:
        'Es una estrategia distinta a la del recalentado: aquí el PEI libera al enfriar. No mezclarla con el recalentado como si fuera el mismo mecanismo.',
    },
    {
      id: 'despega-recalentando-cool-supertack',
      accion: 'Recalienta a ~50 °C para despegar',
      cuando: { chapa: 'cool-supertack-bambu', problema: 'demasiado-pegada' },
      valor: '~50 °C',
      porque:
        'Si el modelo queda demasiado adherido en Cool Plate SuperTack: placa en la cama a ~50 °C y reintentar, o alcohol debajo y palanca con espátula. Para futuros prints, bajar algo la temperatura de cama.',
      fuente: 'Bambu Lab',
      alcance:
        'Dato de una sola fuente (Bambu), sin segunda corroboración. Las marcas residuales normales de Cool Plate suelen eliminarse con toallitas de alcohol o detergente y agua.',
    },
    {
      id: 'despega-recalentando-prusa',
      accion: 'Recalienta a la temperatura original y deja enfriar',
      cuando: { chapa: ['smooth-prusa', 'textured-prusa', 'satin-prusa'], problema: 'demasiado-pegada' },
      porque:
        'Recalentar la cama unos minutos, dejar enfriar hasta ambiente y despegar flexionando. Con espátula, doblar ligeramente la chapa e insertar debajo en vez de apalancar sobre superficie plana.',
      fuente: 'Prusa Research',
      alcance:
        'Estrategia de recalentado seguida de enfriamiento: distinta a la de autodesprendimiento de la Textured PEI, que se libera al enfriar directamente.',
    },
    {
      id: 'despega-general',
      accion: 'Recalienta la cama y usa espátula con alcohol',
      cuando: { problema: 'demasiado-pegada' },
      porque:
        'Si la pieza no se despega, poner la placa en la cama caliente, aplicar alcohol debajo y palancar con espátula reduce la dificultad y el daño. Para futuros prints, bajar algo la temperatura de cama.',
      fuente: 'Bambu Lab',
      alcance:
        'Recomendación general para despegues difíciles; la fuente no da una cifra única para todos los casos.',
    },
    {
      id: 'effect-config',
      accion: 'Configura la placa como Smooth PEI / High Temp en el slicer',
      cuando: { chapa: 'effect-bambu' },
      porque:
        'El 3D Effect Sheet va sólo sobre la plancha oficial Bambu y su tipo de placa se configura como Smooth PEI / High Temp. El LIDAR del X1 no funciona con estos films: omitirlo o calibrar con otra placa.',
      fuente: 'Bambu Lab',
      alcance:
        'Los films son consumibles y sólo se recomiendan PLA y TPU. La fuente no cubre otros filamentos.',
    },
    {
      id: 'glue-curacion',
      accion: 'Deja curar el glue líquido según la cama',
      cuando: { chapa: ['engineering-bambu', 'smooth-bambu'] , material: ['abs', 'pc', 'petg'] },
      porque:
        'Secar hasta formar film que no forme hilos; basta precalentar la cama. Tiempos: ~1 h a 24 °C, ~45 s a 90 °C, ~2 min a 70 °C. Una capa gruesa pega más que una delgada; más allá de cuatro, disminuye.',
      valor: '4 capas como óptimo',
      fuente: 'Bambu Lab',
      alcance:
        'Datos de una sola fuente (Bambu), sin corroboración. La mejor adhesión no la da más secado sino cómo se aplica. Third-party glues están fuertemente desaconsejados y pueden dañar la placa.',
    },
    {
      id: 'limpieza-glue',
      accion: 'Limpia el residuo de glue antes del siguiente print',
      cuando: { problema: 'sucia' },
      porque:
        'Con residuo de glue, limpiar la placa antes del siguiente print asegura buena adhesión. El glue stick, con agua y jabón (remojo ~30 s si está seco); el liquid glue, con agua y paño no tejido.',
      fuente: 'Bambu Lab',
      alcance:
        'El procedimiento de lavado no es idéntico entre chapas: en la Textured PEI se evita la acetona. Adaptar al material de la placa.',
    },
    {
      id: 'recalibrar-al-cambiar',
      accion: 'Recalibra la primera capa al cambiar de chapa',
      porque:
        'Las chapas cambian de espesor: sin loadcell, cambiar de chapa exige recalibrar la primera capa u otros perfiles. La Smooth PEI es más gruesa que texturizada y satinada; Bambu, perfil por generación.',
      fuente: 'Prusa Research, Bambu Lab',
      alcance:
        'El aviso de Prusa es una prohibición: no se puede usar la misma calibración de primera capa si se cambia entre la lisa y la texturizada. Ninguna fuente da el grosor en milímetros, así que el motivo está escrito en palabras y en ningún número.',
    },
  ],

  fueraDeAlcance: [
    {
      sintoma: 'Las esquinas se levantan (warping)',
      porQue:
        'Es contracción térmica, no un problema de chapa. La chapa decide la cifra de cama, pero el diagnóstico mayor es de warping y tiene su propio orden de comprobación.',
      guia: 'warping-pla',
    },
    {
      sintoma: 'La base sale frágil, con capas rotas por dentro',
      porQue:
        'Es infraextrusión por apretar la primera capa, no falta de adhesión. Cambiar de chapa no lo arregla.',
      guia: 'adhesion-primera-capa',
    },
    {
      sintoma: 'Elephant foot en la base',
      porQue:
        'Es deformación por cama demasiado caliente, una causa física distinta. La chapa no es la primera variable a mirar.',
      guia: 'elephant-foot',
    },
  ],

  campos: [],
  leeDelAnalisis: ['material'],
  fuentes: [
    {
      url: 'https://help.prusa3d.com/article/flexible-steel-sheets-guidepost_2195',
      quien: 'Prusa Research',
      que: 'Guía principal de chapas flexibles: seis tipos, montaje, despegue, garantía.',
    },
    {
      url: 'https://help.prusa3d.com/article/smooth-steel-sheet_196550',
      quien: 'Prusa Research',
      que: 'Smooth PEI: limpieza, acetona ocasional, recuperación con lija, burbujas y abolladuras.',
    },
    {
      url: 'https://help.prusa3d.com/materials',
      quien: 'Prusa Research',
      que: 'Tabla de materiales con temperaturas de cama y notas por chapa.',
    },
    {
      url: 'https://wiki.bambulab.com/en/filament-acc/acc/plates',
      quien: 'Bambu Lab',
      que: 'Introducción a las build plates: tipos, compatibilidad, dimensiones, generaciones, adhesión.',
    },
    {
      url: 'https://wiki.bambulab.com/en/filament-acc/acc/pei-plate-clean-guide',
      quien: 'Bambu Lab',
      que: 'Limpieza de Textured PEI: procedimiento, acetona prohibida, diagnóstico por flujo de agua, lija.',
    },
    {
      url: 'https://wiki.bambulab.com/en/general/how-to-use-bbl-liquid-glue',
      quien: 'Bambu Lab',
      que: 'Glue: por material y por chapa, curado, número de capas, limpieza y almacenamiento.',
    },
  ],
};
