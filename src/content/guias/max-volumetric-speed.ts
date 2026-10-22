import type { Guia } from './tipos';
import { AUTOR } from './autor.ts';

/**
 * Velocidad volumétrica máxima (MVS).
 *
 * El caudal que el hotend puede fundir por segundo es el techo real de la
 * velocidad de impresión. Subir la velocidad sin tocar ese techo no acelera
 * nada: sólo subextruye.
 */
export const maxVolumetricSpeed: Guia = {
  slug: 'max-volumetric-speed',
  titulo: 'Velocidad volumétrica máxima (MVS)',
  resumen:
    'La pieza se subextruye o se atasca sólo a alta velocidad.',
  resumenExtra:
    'Antes de tocar temperatura se descarta flow rate y warping: lo que falla aquí es el techo de caudal que el hotend puede fundir.',
  sintoma: 'Subextrusión o atascos a alta velocidad',
  dibujo: 'hotend',
  entrada:
    'La pieza está bien adherida y las capas no se abren por dentro, pero al acelerar aparecen huecos, líneas débiles o el extrusor se atasca. A velocidad normal todo va bien. Lo que falla no es la cantidad de filamento que sale ni la temperatura de cama: es el volumen por segundo que el hotend puede fundir, y ese techo es el que limita la velocidad real.',
  autor: AUTOR,
  actualizado: '2026-10-17',
  minutos: 7,

  diferencial: {
    contra: 'warping, separación entre capas, flow rate y subextrusión por obstrucción',
    contraCorto: 'flow y subextrusión',
    comprobaciones: [
      {
        id: 'base',
        mira: 'La base de la pieza: ¿se levanta por las esquinas?',
        si: 'Arqueada o con las esquinas levantadas desde la cama. Es warping: el contraste térmico tira de los extremos.',
        no: 'Plana. Entonces no es warping: sigue comprobando.',
      },
      {
        id: 'corte',
        mira: '¿Se abre la pieza por dentro, entre capas?',
        si: 'Se abre por dentro con corte limpio. Es separación entre capas; la temperatura y el enfriamiento son el ajuste.',
        no: 'No se abre: la unión está intacta y lo que falla es la cantidad o el caudal de material.',
      },
      {
        id: 'flow',
        mira: '¿Hay huecos entre líneas o material acumulado a velocidad normal?',
        si: 'Huecos o acumulación incluso a velocidad normal: es un problema de flow, no de caudal máximo.',
        no: 'Líneas uniformes a velocidad normal; el problema aparece sólo al acelerar.',
      },
      {
        id: 'velocidad',
        mira: '¿El defecto aparece sólo a alta velocidad o con infill continuo?',
        si: 'Sólo a alta velocidad o en piezas voluminosas: es el techo de caudal del hotend, el MVS.',
        no: 'Aparece siempre o a baja velocidad: no es MVS; revisa flow y obstrucción de la boquilla.',
      },
    ],
    siNo: { guia: 'flow-rate', etiqueta: 'Flow rate y calibración del flujo' },
  },

  variables: [
    {
      id: 'slicer',
      etiqueta: 'Slicer',
      indicador: 'slicer',
      para: 'El procedimiento de calibración y los campos que se tocan cambian por ecosistema; OrcaSlicer y Simplify3D no se mezclan.',
      necesaria: true,
      opciones: [
        { id: 'orca', etiqueta: 'OrcaSlicer' },
        { id: 'simplify3d', etiqueta: 'Simplify3D' },
        { id: 'otro', etiqueta: 'Otro / no lo sé' },
      ],
    },
    {
      id: 'hotend',
      etiqueta: 'Hotend',
      indicador: 'temperatura',
      para: 'Un hotend de alto flujo cambia el techo de caudal y la recomendación de subir el MVS en el slicer.',
      necesaria: true,
      opciones: [
        { id: 'stock', etiqueta: 'Stock / estándar' },
        { id: 'highflow', etiqueta: 'High flow (alto flujo)' },
      ],
    },
    {
      id: 'material',
      etiqueta: 'Material',
      indicador: 'material',
      para: 'El MVS varía por material, marca y color; incluso dentro del mismo tipo (PLA) cambia de forma significativa.',
      opciones: [
        { id: 'pla', etiqueta: 'PLA' },
        { id: 'petg', etiqueta: 'PETG' },
        { id: 'abs', etiqueta: 'ABS o ASA' },
        { id: 'otro', etiqueta: 'Otro' },
      ],
    },
    {
      id: 'defecto',
      etiqueta: 'Síntoma visible',
      indicador: 'general',
      para: 'Si ya hay subextrusión a alta velocidad, el ajuste es subir la temperatura de boquilla; si no, basta con calibrar el techo.',
      opciones: [
        { id: 'sub', etiqueta: 'Subextrusión a alta velocidad', detalle: 'Falta material al acelerar' },
        { id: 'ok', etiqueta: 'Sin defecto visible' },
        { id: 'nose', etiqueta: 'No lo sé' },
      ],
    },
  ],

  conocimiento: [
    {
      id: 'que-es-mvs',
      titulo: 'Qué es la velocidad volumétrica máxima',
      puntos: [
        'El volumetric flow rate es la cantidad de filamento que el hotend puede empujar a través de la boquilla por segundo, medida en mm³/s.',
        'En OrcaSlicer, el Max Volumetric Speed es el volumen de filamento que se puede fundir y extruir por segundo.',
        'La velocidad de impresión se limita a ese valor para evitar atascos, subextrusión o mala adhesión entre capas.',
      ],
      indicador: 'calibracion',
      cuerpo:
        'El volumetric flow rate es la cantidad de filamento que el hotend puede empujar a través de la boquilla por segundo, medida en mm³/s. En OrcaSlicer, el Max Volumetric Speed es el volumen de filamento que se puede fundir y extruir por segundo; la velocidad de impresión se limita a ese valor para evitar atascos, subextrusión o mala adhesión entre capas.',
      cifra: { valor: 'mm³/s', nota: 'unidad de caudal volumétrico' },
      cita: {
        texto: 'El volumetric flow rate es la cantidad de filamento que el hotend puede empujar a través de la boquilla por segundo, medida en mm³/s.',
        fuente: 'E3D',
      },
    },
    {
      id: 'no-es-numero-unico',
      titulo: 'No es un número único por material',
      puntos: [
        'El MVS varía con el hardware (extrusor y cinemática) y con la forma del modelo; no es un número único por material.',
        'Hay que calibrarlo por impresora y por filamento, y dentro del mismo tipo (PLA) la marca y el color afectan de forma significativa.',
      ],
      indicador: 'calibracion',
      cuerpo:
        'El MVS varía con el hardware (extrusor y cinemática) y con la forma del modelo; no es un número único por material. Hay que calibrarlo por impresora y por filamento, y dentro del mismo tipo (PLA) la marca y el color afectan de forma significativa.',
      cita: {
        texto: 'El MVS varía con el hardware (extrusor y cinemática) y con la forma del modelo; no es un número único por material.',
        fuente: 'Prusa Research',
      },
    },
    {
      id: 'highflow-vs-highspeed',
      titulo: 'High flow y high speed no son lo mismo',
      puntos: [
        'High flow y high speed están relacionados, pero no son intercambiables.',
        'En la mayoría de perfiles estándar el sistema de movimiento (velocidad, aceleración y jerk), no el hotend, ya es el cuello de botella.',
        'Actualizar el hotend no acelera la impresión sin actualizar también los perfiles del slicer.',
      ],
      indicador: 'slicer',
      cuerpo:
        'High flow y high speed están relacionados, pero no son intercambiables. En la mayoría de perfiles estándar el sistema de movimiento (velocidad, aceleración y jerk), no el hotend, ya es el cuello de botella. Actualizar el hotend no acelera la impresión sin actualizar también los perfiles del slicer.',
      cita: {
        texto: 'High flow y high speed no son lo mismo: están relacionados, pero no son intercambiables.',
        fuente: 'E3D',
      },
    },
    {
      id: 'highflow-beneficios',
      titulo: 'Hotend de alto flujo: mejor fusión',
      puntos: [
        'Un hotend de alto flujo (geometría interna de 4 canales) da una fusión más uniforme.',
        'Y una salida a temperatura y viscosidad más consistentes.',
        'E3D afirma que eso da una adhesión entre capas típicamente 3× más fuerte y más consistente.',
        'Y paredes exteriores más lisas, incluso sin cambiar los ajustes de velocidad.',
        'Es un dato de fabricante, sin corroborar por otra fuente.',
        'No confundir con el daño por imprimir por encima del techo de fusión.',
        'Eso es un problema de velocidad (empujar material por encima del límite), no de geometría del hotend.',
      ],
      indicador: 'calibracion',
      cuerpo:
        'Un hotend de alto flujo (geometría interna de 4 canales) da una fusión más uniforme y una salida a temperatura y viscosidad más consistentes. E3D afirma que eso da una adhesión entre capas típicamente 3× más fuerte y más consistente, y paredes exteriores más lisas, incluso sin cambiar los ajustes de velocidad. Es un dato de fabricante, sin corroborar por otra fuente. No confundir con el daño por imprimir por encima del techo de fusión: eso es un problema de velocidad (empujar material por encima del límite), no de geometría del hotend.',
      cuando: { hotend: 'highflow' },
      cifra: { valor: '3×', nota: 'adhesión entre capas, sólo E3D (sin corroborar)' },
      cita: {
        texto: 'Hotend de alto flujo (geometría interna de 4 canales): fusión más uniforme → salida a temperatura/viscosidad más consistentes → mejor adhesión entre capas (vínculo entre capas típicamente 3× más fuerte y más consistente) y paredes exteriores más lisas.',
        fuente: 'E3D',
      },
    },
    {
      id: 'pla-high-speed',
      titulo: 'PLA High Speed de Prusa',
      puntos: [
        'Prusament PLA High Speed tiene un MVS de 28 mm³/s en la CORE One+ a 220 °C; el Prusament PLA normal tiene 24 mm³/s (mismo hardware.',
        'Para comparación). El PLA High Speed tiene MFI más alto y shear-thinning (la viscosidad baja al empujar más rápido).',
        'Absorción rápida de calor y enfriamiento optimizado.',
        'No reemplaza al PLA clásico: las características visuales y mecánicas son distintas.',
      ],
      indicador: 'maquina',
      cuerpo:
        'Prusament PLA High Speed tiene un MVS de 28 mm³/s en la CORE One+ a 220 °C; el Prusament PLA normal tiene 24 mm³/s (mismo hardware, para comparación). El PLA High Speed tiene MFI más alto y shear-thinning (la viscosidad baja al empujar más rápido), absorción rápida de calor y enfriamiento optimizado. No reemplaza al PLA clásico: las características visuales y mecánicas son distintas.',
      cuando: { material: 'pla' },
      cifra: { valor: '28 mm³/s', nota: 'Prusa PLA High Speed en CORE One+ a 220 °C' },
      cita: {
        texto: 'Prusament PLA High Speed tiene un MVS de 28 mm³/s en la CORE One+ a 220 °C; el Prusament PLA normal tiene 24 mm³/s.',
        fuente: 'Prusa Research',
      },
    },
    {
      id: 'calibracion-orca',
      titulo: 'Cómo se calibra en OrcaSlicer',
      puntos: [
        'Valores por defecto: 5 mm³/s de inicio, 20 mm³/s de fin, paso 0,5.',
        'Imprimir, anotar dónde empiezan a fallar las capas.',
        'Y dónde baja la calidad (un cambio de brillo brillante/mate es pista visual de degradación del material o mala adhesión).',
        'Medir con calibre la altura justo antes de los defectos.',
        'Fórmula: MVS = inicio + (altura medida × paso).',
        'Ejemplo con 19 mm: 5 + (19 × 0,5) = 14,5 mm³/s.',
        'Verificar cruzado en la pestaña Preview, esquema de color "flow", bajando hasta la altura medida.',
      ],
      indicador: 'calibracion',
      cuerpo:
        'Valores por defecto: 5 mm³/s de inicio, 20 mm³/s de fin, paso 0,5. Imprimir, anotar dónde empiezan a fallar las capas y dónde baja la calidad (un cambio de brillo brillante/mate es pista visual de degradación del material o mala adhesión). Medir con calibre la altura justo antes de los defectos. Fórmula: MVS = inicio + (altura medida × paso). Ejemplo con 19 mm: 5 + (19 × 0,5) = 14,5 mm³/s. Verificar cruzado en la pestaña Preview, esquema de color "flow", bajando hasta la altura medida.',
      cuando: { slicer: 'orca' },
      cifra: { valor: '5 / 20 / 0,5', nota: 'inicio, fin y paso (OrcaSlicer)' },
      cita: {
        texto: 'Procedimiento OrcaSlicer: valores por defecto 5 mm³/s de inicio, 20 mm³/s de fin, paso 0,5. Fórmula: MVS = inicio + (altura medida × paso). Ejemplo con 19 mm: 5 + (19 × 0,5) = 14,5 mm³/s.',
        fuente: 'OrcaSlicer',
      },
    },
    {
      id: 'adaptive-vol',
      titulo: 'Adaptive volumetric speed (experimental)',
      puntos: [
        'En OrcaSlicer, el Adaptive volumetric speed (filament_adaptive_volumetric_speed.',
        'Modo Developer) es experimental e incompleto (importado de BBS) y funcional sólo para algunos perfiles.',
        'Con él habilitado, el flujo se limita por el menor entre el valor ajustado (calculado desde ancho de línea.',
        'Y altura de capa) y el máximo definido por el usuario.',
        'Deshabilitado, sólo se aplica el máximo del usuario.',
      ],
      indicador: 'slicer',
      cuerpo:
        'En OrcaSlicer, el Adaptive volumetric speed (filament_adaptive_volumetric_speed, modo Developer) es experimental e incompleto (importado de BBS) y funcional sólo para algunos perfiles. Con él habilitado, el flujo se limita por el menor entre el valor ajustado (calculado desde ancho de línea y altura de capa) y el máximo definido por el usuario; deshabilitado, sólo se aplica el máximo del usuario.',
      cuando: { slicer: 'orca' },
      cita: {
        texto: 'Adaptive volumetric speed es experimental e incompleto (importado de BBS) y funcional sólo para algunos perfiles.',
        fuente: 'OrcaSlicer',
      },
    },
    {
      id: 'simplify3d-extrusion-multiplier',
      titulo: 'Extrusion multiplier en Simplify3D (otro concepto)',
      puntos: [
        'Simplify3D usa el extrusion multiplier (flow rate) como control de flujo: se ajusta por extrusor en la pestaña Extruder.',
        'Con valores típicos ~0,9 para PLA y ~1,0 para ABS; se aumenta un 5 % y se reimprime el cubo de prueba.',
        'Es un factor del flujo esperado, no un techo de velocidad por capacidad de fusión: no confundirlo con el MVS (mm³/s) de OrcaSlicer.',
      ],
      indicador: 'slicer',
      cuerpo:
        'Simplify3D usa el extrusion multiplier (flow rate) como control de flujo: se ajusta por extrusor en la pestaña Extruder, con valores típicos ~0,9 para PLA y ~1,0 para ABS; se aumenta un 5 % y se reimprime el cubo de prueba. Es un factor del flujo esperado, no un techo de velocidad por capacidad de fusión: no confundirlo con el MVS (mm³/s) de OrcaSlicer.',
      cuando: { slicer: 'simplify3d' },
      cifra: { valor: '~0,9 / ~1,0', nota: 'extrusion multiplier típico PLA / ABS (Simplify3D)' },
      cita: {
        texto: 'El extrusion multiplier (flow rate) se ajusta por extrusor en la pestaña Extruder; valores típicos ~0,9 para PLA y ~1,0 para ABS.',
        fuente: 'Simplify3D',
      },
    },
    {
      id: 'subir-temperatura',
      titulo: 'Subir la temperatura al aumentar flujo',
      puntos: [
        'Si se va a subir velocidad o flujo, conviene subir la temperatura de boquilla hacia el extremo alto del rango del filamento (usar una torre.',
        'De temperatura para encontrarlo). A mayor flujo, menos tiempo para introducir el calor en el filamento.',
      ],
      indicador: 'temperatura',
      cuerpo:
        'Si se va a subir velocidad o flujo, conviene subir la temperatura de boquilla hacia el extremo alto del rango del filamento (usar una torre de temperatura para encontrarlo). A mayor flujo, menos tiempo para introducir el calor en el filamento.',
      cuando: { defecto: 'sub' },
      cita: {
        texto: 'Si se va a subir velocidad o flujo, conviene subir la temperatura de boquilla hacia el extremo alto del rango del filamento (usar una torre de temperatura para encontrarlo).',
        fuente: 'OrcaSlicer',
      },
    },
  ],

  reglas: [
    {
      id: 'calibrar-por-impresora',
      accion: 'Calibra el MVS por impresora y por filamento antes de subir la velocidad',
      porque:
        'El MVS depende de material, máquina, diámetro de boquilla y montaje del extrusor; dentro del mismo tipo (PLA) marca y color afectan de forma significativa. No hay un número único para todos.',
      fuente: 'OrcaSlicer, Prusa Research',
      alcance: 'Regla general: el procedimiento concreto depende del slicer (OrcaSlicer o Simplify3D); no se puede condicionar a una variable porque aplica a cualquier montaje.',
    },
    {
      id: 'orca-calibrar',
      accion: 'Calibra el MVS midiendo la altura justo antes de los defectos',
      valor: '5 mm³/s inicio, 20 mm³/s fin, paso 0,5 (ej. 5 + 19 × 0,5 = 14,5 mm³/s)',
      porque:
        'El MVS es el caudal que el hotend aguanta: se mide con calibre la altura justo antes de los defectos y el MVS se fija en los ajustes del filamento. El brillo brillante/mate avisa de la calidad baja.',
      cuando: { slicer: 'orca' },
      fuente: 'OrcaSlicer',
      alcance: 'La prueba es el mejor caso: no tiene en cuenta retracciones ni otros ajustes que pueden aumentar atascos o subextrusión.',
    },
    {
      id: 'orca-seguridad',
      accion: 'Reduce el valor calculado un 10–20 %, o más, por seguridad',
      valor: '-10 a -20 %',
      porque:
        'La prueba de caudal volumétrico es el mejor caso: no tiene en cuenta retracciones ni otros ajustes que aumentan atascos o subextrusión. Imprimir a alto caudal puede dar mala adhesión o atascos.',
      cuando: { slicer: 'orca' },
      fuente: 'OrcaSlicer',
      alcance: 'No es una pérdida de rendimiento: es el margen frente a retracciones y cambios de caudal.',
    },
    {
      id: 'orca-no-adaptive',
      accion: 'No uses Adaptive volumetric speed como ajuste definitivo',
      porque:
        'Es experimental e incompleto (importado de BBS) y sólo funciona en algunos perfiles. Habilitado, el flujo se limita por el menor entre el valor ajustado y el máximo del usuario: mide antes el MVS.',
      cuando: { slicer: 'orca' },
      fuente: 'OrcaSlicer',
      alcance: 'Puede usarse como complemento, no como sustituto del valor medido.',
    },
    {
      id: 'simplify3d-test',
      accion: 'Haz el test del cubo de 20 mm: gaps entre los 3 perímetros indican subextrusión',
      valor: 'cubo de 20 mm, al menos 3 perímetros',
      porque:
        'Gaps entre los 3 perímetros arriba indican subextrusión. El extrusion multiplier se ajusta por extrusor en la pestaña Extruder: +5 % y reimprimir el cubo. El diámetro va en Other: 1,75 y 2,85 mm.',
      cuando: { slicer: 'simplify3d' },
      fuente: 'Simplify3D',
      alcance: 'El extrusion multiplier es un factor de flujo, no un techo de velocidad por capacidad de fusión; no confundir con el MVS.',
    },
    {
      id: 'highflow-aprovechar',
      accion: 'Para aprovechar un hotend de alto flujo, sube las velocidades, el MVS en el slicer y, si hace falta, la altura de capa o el ancho de línea',
      porque:
        'Sin ellos es conducir un coche más rápido con el mismo límite: el movimiento se rige por velocidad, aceleración y jerk, y en la mayoría de perfiles estándar ése es el cuello de botella, no el hotend.',
      cuando: { hotend: 'highflow' },
      fuente: 'E3D',
      alcance: 'Aprovecha el alto flujo sólo si el sistema de movimiento (speed/accel/jerk) y el ventilador acompañan; si no, las impresiones siguen lentas o de mala calidad.',
    },
    {
      id: 'subir-temperatura-regla',
      accion: 'Sube la temperatura de boquilla hacia el extremo alto del rango del filamento',
      valor: 'extremo alto del rango',
      porque:
        'A mayor flujo, menos tiempo para introducir el calor en el filamento. Usar una torre de temperatura para encontrar el extremo alto del rango del filamento.',
      cuando: { defecto: 'sub' },
      fuente: 'OrcaSlicer',
      alcance: 'Recomendación de OrcaSlicer al aumentar velocidad o flujo; el número de Prusa (220 °C para PLA High Speed) es la temperatura de su ensayo, no un valor fijo universal.',
    },
    {
      id: 'valorar-pla-high-speed',
      accion: 'Si buscas velocidad con PLA, valora un PLA de alto flujo (MFI alto y shear-thinning)',
      valor: '28 mm³/s · ahorro 20-40 %',
      porque:
        'Prusament PLA High Speed alcanza 28 mm³/s en CORE One+ a 220 °C: su MFI alto y shear-thinning llevan la impresora al límite sin clogs ni hardware especializado.',
      cuando: { material: 'pla' },
      fuente: 'Prusa Research',
      alcance:
        'Dato de fabricante, sin corroborar; el MVS depende del hardware y la forma del modelo, y comparar números entre fabricantes no es válido. El ahorro depende de la forma y el tamaño (Prusa acota 20–40 %) y se consigue sin hardware especializado: el filamento es la alternativa a un hotend de alto caudal.',
    },
    {
      id: 'recalibrar-cambios',
      accion: 'Recalibra el MVS si cambias material, boquilla, extrusor o temperatura',
      porque:
        'El MVS depende del extrusor, la boquilla y el filamento. Lo que cambia el montaje cambia el valor calibrado.',
      fuente: 'OrcaSlicer, Prusa Research, E3D',
      alcance: 'Cada fabricante calibra con su propio procedimiento; ver las fuentes para los rangos.',
    },
  ],

  fueraDeAlcance: [
    {
      sintoma: 'Huecos o exceso de material en las líneas',
      porQue: 'Es un problema de flow, no de caudal máximo. El ajuste es el Extrusion Multiplier o el Flow Ratio, no el MVS.',
      guia: 'flow-rate',
    },
    {
      sintoma: 'Las esquinas se levantan de la cama',
      porQue: 'Es warping: contracción térmica en los exteriores. El diagnóstico y la cifra de cama son otros.',
      guia: 'warping-pla',
    },
    {
      sintoma: 'Las capas se sueltan por dentro',
      porQue: 'Es separación entre capas: la unión falla y no es cantidad de material. Se arregla con temperatura y enfriamiento.',
      guia: 'separaciones-entre-capas',
    },
    {
      sintoma: 'Obstrucción, clog o retracción excesiva',
      porQue: 'La retracción y la obstrucción no están cubiertas aquí: afectan al flujo pero su ajuste es de temperatura y de limpieza de la boquilla.',
      guia: 'temperatura-hotend',
    },
  ],

  fuentes: [
    {
      url: 'https://e3d-online.com/blogs/news/why-high-flow-printing-doesnt-always-mean-high-speed-printing',
      quien: 'E3D',
      que: 'High flow vs high speed: cuellos de botella, escenarios, beneficios más allá de la velocidad.',
    },
    {
      url: 'https://e3d-online.com/blogs/news/the-evolution-of-e3d-s-high-flow-technology',
      quien: 'E3D',
      que: 'Evolución del alto flujo: Volcano, SuperVolcano, Revo 4 canales, tablas PLA/PETG.',
    },
    {
      url: 'https://www.simplify3d.com/resources/print-quality-troubleshooting/under-extrusion/',
      quien: 'Simplify3D',
      que: 'Subextrusión: extrusion multiplier, test del cubo, diámetro de filamento.',
    },
    {
      url: 'https://github.com/OrcaSlicer/OrcaSlicer/wiki/material_volumetric_speed_limitation',
      quien: 'OrcaSlicer',
      que: 'Max Volumetric Speed: definición, no puede ser cero, adaptive volumetric speed.',
    },
    {
      url: 'https://github.com/OrcaSlicer/OrcaSlicer/wiki/volumetric_speed_calib',
      quien: 'OrcaSlicer',
      que: 'Calibración de MVS por altura medida, reducción 10–20 %, cambio de brillo.',
    },
    {
      url: 'https://blog.prusa3d.com/prusament-pla-high-speed-a-perfect-choice-for-rapid-prototyping_137192/',
      quien: 'Prusa Research',
      que: 'PLA High Speed: MVS 28 vs 24 mm³/s, MFI, shear-thinning, ahorro de tiempo.',
    },
  ],

  campos: [],
  leeDelAnalisis: [],
};