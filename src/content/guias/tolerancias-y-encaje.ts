import type { Guia } from './tipos';
import { AUTOR } from './autor.ts';

/**
 * Tolerancias y encaje en impresión 3D FDM.
 *
 * Cómo medir la tolerancia de la propia máquina, qué encaje elegir para cada
 * unión y qué ajustar (diseño, slicer, máquina, post-procesado) cuando la pieza
 * no sale a medida.
 */
export const toleranciasYEncaje: Guia = {
  slug: 'tolerancias-y-encaje',
  titulo: 'Tolerancias y encaje en impresión 3D FDM',
  resumen:
    'La pieza sale más grande o más pequeña de lo diseñado, o no encaja con otra.',
  resumenExtra:
    'Antes de compensar, mide el error real de tu máquina: no hay dos impresoras con la misma tolerancia.',
  sintoma: 'La pieza no sale a medida o no encaja',
  dibujo: 'slicer',
  entrada:
    'Una pieza impresa en FDM casi nunca sale exactamente a la medida diseñada: el plástico se contrae al enfriar, el slicer deposita más material en el lado cóncavo de las curvas y los errores mecánicos (backlash, steps/mm) producen desviaciones. Esta guía explica qué es una tolerancia y una holgura, qué tipos de encaje existen, cómo medir la tolerancia real de tu máquina y qué ajustar por diseño, software, máquina y post-procesado para que las piezas encajen.',
  autor: AUTOR,
  actualizado: '2026-10-17',
  minutos: 7,

  diferencial: {
    contra: 'warping, separación entre capas, pie de elefante y desplazamiento de capa',
    contraCorto: 'warping o separación',
    comprobaciones: [
      {
        id: 'dimensiones',
        mira: '¿La pieza sale con dimensiones incorrectas o no encaja con otra pieza?',
        si: 'Sí, las dimensiones son incorrectas o el encaje falla. Es un problema de precisión dimensional.',
        no: 'No, las dimensiones son correctas pero hay otro defecto. Puede ser warping, separación o pie de elefante.',
      },
      {
        id: 'warping',
        mira: '¿Las esquinas de la pieza se levantan de la cama?',
        si: 'Sí, hay warping. La contracción térmica está deformando la pieza, no solo las dimensiones.',
        no: 'No hay warping. La pieza está plana y el problema es dimensional.',
      },
      {
        id: 'separacion',
        mira: '¿Las capas se sueltan por dentro?',
        si: 'Sí, hay separación entre capas. La unión falla y no es un problema de tamaño.',
        no: 'No hay separación. Las capas están unidas y el problema es dimensional.',
      },
      {
        id: 'base',
        mira: '¿La base de la pieza sale más ancha que el resto?',
        si: 'Sí, hay pie de elefante. El problema está en la primera capa, no en el resto de las dimensiones.',
        no: 'No hay pie de elefante. La base es correcta y el problema es dimensional.',
      },
    ],
    siNo: { guia: 'warping-pla', etiqueta: 'Warping en PLA' },
  },

  variables: [
    {
      id: 'slicer',
      etiqueta: 'Slicer',
      indicador: 'slicer',
      para: 'Cada slicer tiene parámetros de compensación distintos y no se mezclan entre ecosistemas.',
      necesaria: true,
      opciones: [
        { id: 'prusa', etiqueta: 'PrusaSlicer' },
        { id: 'bambu', etiqueta: 'Bambu Studio' },
        { id: 'orca', etiqueta: 'OrcaSlicer' },
        { id: 'cura', etiqueta: 'Cura' },
        { id: 'simplify3d', etiqueta: 'Simplify3D' },
        { id: 'otro', etiqueta: 'Otro' },
      ],
    },
    {
      id: 'problema',
      etiqueta: 'Problema principal',
      indicador: 'general',
      para: 'La dirección del ajuste depende de si el problema es de agujeros, de dimensiones generales o de encaje entre piezas.',
      opciones: [
        { id: 'agujeros', etiqueta: 'Agujeros pequeños' },
        { id: 'dimensiones', etiqueta: 'Dimensiones incorrectas' },
        { id: 'encaje', etiqueta: 'Piezas no encajan' },
        { id: 'no-se', etiqueta: 'No lo tengo claro' },
      ],
    },
  ],

  conocimiento: [
    {
      id: 'tolerancia-vs-holgura',
      titulo: 'Tolerancia vs. holgura',
      puntos: [
        'Una tolerancia es el rango de desviación aceptable respecto a un valor nominal (ejemplo: filamento de 1,75 mm ±0,02 mm, es decir.',
        'Entre 1,73 y 1,77 mm). Una holgura (clearance) es el espacio entre dos piezas que deben encajar.',
        'Las tolerancias de las máquinas de impresión 3D indican cuánto puede desviarse una pieza de sus dimensiones nominales.',
        'Una tolerancia más estrecha (más cercana a cero) indica mayor precisión dimensional consistente.',
      ],
      indicador: 'maquina',
      cuerpo:
        'Una tolerancia es el rango de desviación aceptable respecto a un valor nominal (ejemplo: filamento de 1,75 mm ±0,02 mm, es decir, entre 1,73 y 1,77 mm). Una holgura (clearance) es el espacio entre dos piezas que deben encajar. Las tolerancias de las máquinas de impresión 3D indican cuánto puede desviarse una pieza de sus dimensiones nominales; una tolerancia más estrecha (más cercana a cero) indica mayor precisión dimensional consistente.',
      cifra: { valor: '1,75 mm ±0,02 mm', nota: 'ejemplo de tolerancia de filamento' },
      cita: {
        texto: 'Una tolerancia es el rango de desviación aceptable respecto a un valor nominal (ejemplo: filamento de 1,75 mm ±0,02 mm, es decir, entre 1,73 y 1,77 mm).',
        fuente: 'All3DP',
      },
    },
    {
      id: 'no-dos-iguales',
      titulo: 'No hay dos máquinas iguales',
      puntos: [
        'No hay dos impresoras con la misma tolerancia.',
        'Ni siquiera del mismo modelo; hay que calibrar la propia máquina y no confiar en valores ajenos.',
        'Cada combinación de filamento e impresora puede resultar en tolerancias diferentes; incluso con el mismo filamento y perfil.',
        'Las tolerancias varían de una impresora a otra.',
      ],
      indicador: 'calibracion',
      cuerpo:
        'No hay dos impresoras con la misma tolerancia, ni siquiera del mismo modelo; hay que calibrar la propia máquina y no confiar en valores ajenos. Cada combinación de filamento e impresora puede resultar en tolerancias diferentes; incluso con el mismo filamento y perfil, las tolerancias varían de una impresora a otra.',
      cita: {
        texto: 'No hay dos impresoras con la misma tolerancia, ni siquiera del mismo modelo; hay que calibrar la propia máquina y no confiar en valores ajenos.',
        fuente: 'All3DP',
      },
    },
    {
      id: 'tipos-encaje',
      titulo: 'Tipos de encaje (fits)',
      puntos: [
        'Para una unión eje-agujero de diámetro nominal 50 mm.',
        'All3DP da tres tipos de encaje con valores de ejemplo para un nozzle estándar de 0,4 mm (las cifras son ejemplos, no valores absolutos).',
        'Encaje con holgura: el eje es sensiblemente menor que el agujero; entra y sale con facilidad.',
        'Encaje por interferencia: el eje es igual o ligeramente mayor; no entra sin mucha fuerza.',
        'Encaje de transición: el eje es ligeramente menor o mayor; entra con presión mínima y mantiene concentricidad.',
      ],
      indicador: 'geometria',
      cuerpo:
        'Para una unión eje-agujero de diámetro nominal 50 mm, All3DP da tres tipos de encaje con valores de ejemplo para un nozzle estándar de 0,4 mm (las cifras son ejemplos, no valores absolutos). Encaje con holgura: el eje es sensiblemente menor que el agujero; entra y sale con facilidad. Encaje por interferencia: el eje es igual o ligeramente mayor; no entra sin mucha fuerza. Encaje de transición: el eje es ligeramente menor o mayor; entra con presión mínima y mantiene concentricidad.',
      cita: {
        texto: 'Para una unión eje-agujero de diámetro nominal 50 mm, All3DP da tres tipos de encaje con valores de ejemplo para un nozzle estándar de 0,4 mm (las cifras son ejemplos, no valores absolutos).',
        fuente: 'All3DP',
      },
    },
    {
      id: 'clearance-fit',
      titulo: 'Encaje con holgura (clearance fit)',
      puntos: [
        'El diámetro del eje es sensiblemente menor que el del agujero (ejemplo 49,8 mm y 50,2 mm).',
        'El eje entra y sale con facilidad y gira dentro del agujero.',
        'Regla de pulgar: diferencia de 0,5 mm o más entre diámetros, lo que deja un gap teórico de al menos 0,25 mm.',
      ],
      indicador: 'geometria',
      cuerpo:
        'El diámetro del eje es sensiblemente menor que el del agujero (ejemplo 49,8 mm y 50,2 mm); el eje entra y sale con facilidad y gira dentro del agujero. Regla de pulgar: diferencia de 0,5 mm o más entre diámetros, lo que deja un gap teórico de al menos 0,25 mm.',
      cifra: { valor: '≥ 0,5 mm diferencia', nota: 'gap teórico ≥ 0,25 mm' },
      cita: {
        texto: 'Encaje con holgura (clearance fit): el diámetro del eje es sensiblemente menor que el del agujero (ejemplo 49,8 mm y 50,2 mm); el eje entra y sale con facilidad y gira dentro del agujero. Regla de pulgar: diferencia de 0,5 mm o más entre diámetros, lo que deja un gap teórico de al menos 0,25 mm.',
        fuente: 'All3DP',
      },
    },
    {
      id: 'interference-fit',
      titulo: 'Encaje por interferencia (interference fit)',
      puntos: [
        'El eje es igual o ligeramente mayor que el agujero (ejemplo 50,2 mm y 49,8 mm); no entra sin mucha fuerza y, una vez entrado.',
        'No sale sin romper las piezas. Regla de pulgar: diferencia de 0,1 mm o menos, gap teórico de 0,05 mm o menos.',
        'Se usa cuando se requiere alta concentricidad y movimiento mutuo (p. ej. eje en rodamiento).',
      ],
      indicador: 'geometria',
      cuerpo:
        'El eje es igual o ligeramente mayor que el agujero (ejemplo 50,2 mm y 49,8 mm); no entra sin mucha fuerza y, una vez entrado, no sale sin romper las piezas. Regla de pulgar: diferencia de 0,1 mm o menos, gap teórico de 0,05 mm o menos. Se usa cuando se requiere alta concentricidad y movimiento mutuo (p. ej. eje en rodamiento).',
      cifra: { valor: '≤ 0,1 mm diferencia', nota: 'gap teórico ≤ 0,05 mm' },
      cita: {
        texto: 'Encaje por interferencia (interference fit): el eje es igual o ligeramente mayor que el agujero (ejemplo 50,2 mm y 49,8 mm); no entra sin mucha fuerza y, una vez entrado, no sale sin romper las piezas. Regla de pulgar: diferencia de 0,1 mm o menos, gap teórico de 0,05 mm o menos.',
        fuente: 'All3DP',
      },
    },
    {
      id: 'transition-fit',
      titulo: 'Encaje de transición (transition fit)',
      puntos: [
        'El eje es ligeramente menor o ligeramente mayor que el agujero (ejemplo 49,9 mm y 50,0 mm).',
        'Entra con presión mínima y mantiene concentricidad relativa.',
        'Regla de pulgar: diferencia de 0,15–0,4 mm, gap teórico de 0,08–0,2 mm.',
      ],
      indicador: 'geometria',
      cuerpo:
        'El eje es ligeramente menor o ligeramente mayor que el agujero (ejemplo 49,9 mm y 50,0 mm); entra con presión mínima y mantiene concentricidad relativa. Regla de pulgar: diferencia de 0,15–0,4 mm, gap teórico de 0,08–0,2 mm.',
      cifra: { valor: '0,15–0,4 mm diferencia', nota: 'gap teórico 0,08–0,2 mm' },
      cita: {
        texto: 'Encaje de transición (transition fit): el eje es ligeramente menor o ligeramente mayor que el agujero (ejemplo 49,9 mm y 50,0 mm); entra con presión mínima y mantiene concentricidad relativa. Regla de pulgar: diferencia de 0,15–0,4 mm, gap teórico de 0,08–0,2 mm.',
        fuente: 'All3DP',
      },
    },
    {
      id: 'contraccion-termica',
      titulo: 'Contracción térmica (shrinkage)',
      puntos: [
        'El plástico se contrae al enfriar; diferentes materiales exhiben diferente contracción, que también depende de la temperatura.',
        'La contracción térmica es un problema común en materiales de alta temperatura como ABS.',
        'El error dimensional que aumenta con el tamaño de la pieza es atribuible a la contracción térmica.',
        'El porcentaje de contracción = error / tamaño.',
        'Ejemplo: 0,1 mm en 20 mm = 0,5 %.',
      ],
      indicador: 'temperatura',
      cuerpo:
        'El plástico se contrae al enfriar; diferentes materiales exhiben diferente contracción, que también depende de la temperatura. La contracción térmica es un problema común en materiales de alta temperatura como ABS. El error dimensional que aumenta con el tamaño de la pieza es atribuible a la contracción térmica; el porcentaje de contracción = error / tamaño. Ejemplo: 0,1 mm en 20 mm = 0,5 %.',
      cifra: { valor: '0,1 mm en 20 mm = 0,5 %', nota: 'ejemplo de cálculo de contracción' },
      cita: {
        texto: 'El error dimensional que aumenta con el tamaño de la pieza es atribuible a la contracción térmica; el porcentaje de contracción = error / tamaño. Ejemplo: 0,1 mm en 20 mm = 0,5 %.',
        fuente: 'Simplify3D',
      },
    },
    {
      id: 'orientacion-pieza',
      titulo: 'Orientación de la pieza',
      puntos: [
        'Los agujeros se imprimen mejor en horizontal (paralelos al plano XY de la impresora).',
        'Si hay que imprimir un agujero vertical.',
        'Usar la técnica del teardrop: la parte superior del agujero se diseña en forma puntiaguda en lugar de completamente redonda.',
        'Eliminando inexactitudes por voladizo del filamento al cerrar la parte superior.',
        'Por la naturaleza por capas de la impresión FDM, los rasgos verticales suelen ser menos precisos (solo tan finos como la altura de capa).',
        'Los rasgos horizontales (XY) tienden a ser más precisos.',
      ],
      indicador: 'maquina',
      cuerpo:
        'Los agujeros se imprimen mejor en horizontal (paralelos al plano XY de la impresora). Si hay que imprimir un agujero vertical, usar la técnica del teardrop: la parte superior del agujero se diseña en forma puntiaguda en lugar de completamente redonda, eliminando inexactitudes por voladizo del filamento al cerrar la parte superior. Por la naturaleza por capas de la impresión FDM, los rasgos verticales suelen ser menos precisos (solo tan finos como la altura de capa); los rasgos horizontales (XY) tienden a ser más precisos.',
      cita: {
        texto: 'Los agujeros se imprimen mejor en horizontal (paralelos al plano XY de la impresora). Si hay que imprimir un agujero vertical, usar la técnica del teardrop: la parte superior del agujero se diseña en forma puntiaguda en lugar de completamente redonda.',
        fuente: 'All3DP',
      },
    },
    {
      id: 'causas-software',
      titulo: 'Causas de software',
      puntos: [
        'Al convertir un modelo digital a STL se pierden detalles.',
        'Los objetos redondos se facultan y se convierten en superficies y vértices rectos.',
        'A mayor resolución de conversión, menor error dimensional.',
        'Las curvas se aproximan por polígonos en el STL; aumentar el número de segmentos en el CAD antes de exportar el STL reduce el error.',
        'Los slicers introducen sus propios errores según sus algoritmos y ajustes.',
        'La forma en que alteran los vértices del STL afecta al G-code y al comportamiento de la impresora.',
      ],
      indicador: 'slicer',
      cuerpo:
        'Al convertir un modelo digital a STL se pierden detalles: los objetos redondos se facultan y se convierten en superficies y vértices rectos; a mayor resolución de conversión, menor error dimensional. Las curvas se aproximan por polígonos en el STL; aumentar el número de segmentos en el CAD antes de exportar el STL reduce el error. Los slicers introducen sus propios errores según sus algoritmos y ajustes; la forma en que alteran los vértices del STL afecta al G-code y al comportamiento de la impresora.',
      cita: {
        texto: 'Al convertir un modelo digital a STL se pierden detalles: los objetos redondos se facultan y se convierten en superficies y vértices rectos; a mayor resolución de conversión, menor error dimensional.',
        fuente: 'All3DP',
      },
    },
    {
      id: 'causas-maquina',
      titulo: 'Causas de máquina',
      puntos: [
        'Los motores paso a paso tienen resolución de movimiento finita.',
        'La precisión de una trayectoria es solo tan buena como la resolución máxima de los motores.',
        'Los motores típicos de FDM no tienen bucle de control de posición.',
        'Así que pequeños errores de posición pueden acumularse en trabajos largos.',
        'Los E-steps del extrusor son un factor crucial que puede causar inexactitudes dimensionales si no están calibrados.',
        'Si los ejes no son suficientemente ortogonales entre sí.',
        'Aparecen inexactitudes estructurales (un rectángulo se convierte en paralelogramo).',
        'En cada cambio de dirección de un eje hay una pequeña cantidad de backlash (holgura); a menor tensión de la correa, mayor backlash.',
        'Las correas también sufren creep y elongación con el tiempo, que reducen la tensión y pueden provocar resbalones y pasos perdidos.',
      ],
      indicador: 'calibracion',
      cuerpo:
        'Los motores paso a paso tienen resolución de movimiento finita; la precisión de una trayectoria es solo tan buena como la resolución máxima de los motores. Los motores típicos de FDM no tienen bucle de control de posición, así que pequeños errores de posición pueden acumularse en trabajos largos. Los E-steps del extrusor son un factor crucial que puede causar inexactitudes dimensionales si no están calibrados. Si los ejes no son suficientemente ortogonales entre sí, aparecen inexactitudes estructurales (un rectángulo se convierte en paralelogramo). En cada cambio de dirección de un eje hay una pequeña cantidad de backlash (holgura); a menor tensión de la correa, mayor backlash. Las correas también sufren creep y elongación con el tiempo, que reducen la tensión y pueden provocar resbalones y pasos perdidos.',
      cita: {
        texto: 'Los motores paso a paso tienen resolución de movimiento finita; la precisión de una trayectoria es solo tan buena como la resolución máxima de los motores.',
        fuente: 'All3DP',
      },
    },
    {
      id: 'materiales-contraccion',
      titulo: 'Materiales y contracción',
      puntos: [
        'El plástico se contrae al enfriar; diferentes materiales exhiben diferente contracción, que también depende de la temperatura.',
        'La contracción del material puede hacer los agujeros más pequeños.',
        'El pie de elefante por exceso de aplastamiento en la primera capa afecta las dimensiones.',
        'Filamento húmedo causa extrusión inconsistente.',
        'Agujeros con diámetro cercano al tamaño de la boquilla (menores de 1 mm) son difíciles de ajustar.',
      ],
      indicador: 'calibracion',
      cuerpo:
        'El plástico se contrae al enfriar; diferentes materiales exhiben diferente contracción, que también depende de la temperatura. La contracción del material puede hacer los agujeros más pequeños. El pie de elefante por exceso de aplastamiento en la primera capa afecta las dimensiones. Filamento húmedo causa extrusión inconsistente. Agujeros con diámetro cercano al tamaño de la boquilla (menores de 1 mm) son difíciles de ajustar.',
      cita: {
        texto: 'El plástico se contrae al enfriar; diferentes materiales exhiben diferente contracción, que también depende de la temperatura.',
        fuente: 'Slic3r Manual',
      },
    },
    {
      id: 'compensacion-xy',
      titulo: 'Compensación XY en el slicer',
      puntos: [
        'Los slicers ofrecen parámetros para compensar la expansión o contracción del material en XY.',
        'Bambu Studio: XY Hole Compensation ajusta el tamaño de los agujeros (áreas cerradas, huecas) en cada capa; solo afecta a agujeros.',
        'No cambia el tamaño exterior del modelo.',
        'XY Contour Compensation ajusta el contorno exterior del modelo.',
        'La compensación del agujero se aplica por radio: el diámetro del agujero aumentará el doble del valor de compensación.',
        'OrcaSlicer: X-Y hole compensation y X-Y contour compensation, valores positivos hacen agujeros/contornos más grandes.',
        'Negativos más pequeños.',
      ],
      indicador: 'calibracion',
      cuerpo:
        'Los slicers ofrecen parámetros para compensar la expansión o contracción del material en XY. Bambu Studio: XY Hole Compensation ajusta el tamaño de los agujeros (áreas cerradas, huecas) en cada capa; solo afecta a agujeros, no cambia el tamaño exterior del modelo. XY Contour Compensation ajusta el contorno exterior del modelo. La compensación del agujero se aplica por radio: el diámetro del agujero aumentará el doble del valor de compensación. OrcaSlicer: X-Y hole compensation y X-Y contour compensation, valores positivos hacen agujeros/contornos más grandes, negativos más pequeños.',
      cita: {
        texto: 'XY Hole Compensation: ajusta el tamaño de los agujeros (áreas cerradas, huecas) en cada capa; solo afecta a agujeros, no cambia el tamaño exterior del modelo.',
        fuente: 'Bambu Lab',
      },
    },
    {
      id: 'signo-compensacion',
      titulo: 'Convención del signo de la compensación',
      puntos: [
        'En Slic3r, para agujeros 0,1 mm pequeños se introduce −0,05 (negativo = encoger hacia dentro).',
        'Se compensa la mitad del error porque actúa en cada lado.',
        'En OrcaSlicer y Bambu Studio, valores positivos hacen agujeros más grandes y negativos más pequeños.',
        'No se contradicen en el efecto, solo en la convención del signo: en Slic3r el signo se refiere a la dirección de encogimiento del contorno.',
        'En Orca/Bambu el signo se refiere al cambio del agujero.',
        'No presentar un único valor de compensación sin decir qué slicer y qué convención de signo.',
      ],
      indicador: 'calibracion',
      cuerpo:
        'En Slic3r, para agujeros 0,1 mm pequeños se introduce −0,05 (negativo = encoger hacia dentro); se compensa la mitad del error porque actúa en cada lado. En OrcaSlicer y Bambu Studio, valores positivos hacen agujeros más grandes y negativos más pequeños. No se contradicen en el efecto, solo en la convención del signo: en Slic3r el signo se refiere a la dirección de encogimiento del contorno; en Orca/Bambu el signo se refiere al cambio del agujero. No presentar un único valor de compensación sin decir qué slicer y qué convención de signo.',
      cita: {
        texto: 'Slic3r: para agujeros 0,1 mm pequeños se introduce −0,05 (negativo = encoger hacia dentro); se compensa la mitad del error porque actúa en cada lado.',
        fuente: 'Slic3r Manual',
      },
    },
    {
      id: 'formula-bambu',
      titulo: 'Fórmula de calibración de Bambu',
      puntos: [
        'Fórmula de calibración de contorno en Bambu: (55 − valor medido) / 2.',
        'La calibración de compensación es específica para cada filamento; debe repetirse al cambiar de material.',
        'Un tornillo M6 nominal tiene un diámetro real de ~5,9 mm por la norma ISO 6g (la rosca es ligeramente menor para facilitar el ensamblaje).',
      ],
      indicador: 'calibracion',
      cuerpo:
        'Fórmula de calibración de contorno en Bambu: (55 − valor medido) / 2. La calibración de compensación es específica para cada filamento; debe repetirse al cambiar de material. Un tornillo M6 nominal tiene un diámetro real de ~5,9 mm por la norma ISO 6g (la rosca es ligeramente menor para facilitar el ensamblaje).',
      cifra: { valor: '(55 − valor medido) / 2', nota: 'fórmula de Bambu Lab' },
      cita: {
        texto: 'Fórmula de calibración de contorno en Bambu: (55 − valor medido) / 2.',
        fuente: 'Bambu Lab',
      },
    },
    {
      id: 'limitaciones-caminos',
      titulo: 'Limitación: caminos cerrados',
      puntos: [
        'XY Hole Compensation solo aplica a caminos cerrados.',
        'Si el modelo tiene aberturas en los lados que producen caminos no cerrados en una capa, la compensación no se aplica a esas capas.',
        'Aplicarla en ese caso produce una separación de capa notable en las ubicaciones de los agujeros.',
        'Solo XY Contour Compensation puede aplicarse a capas con caminos no cerrados.',
      ],
      indicador: 'calibracion',
      cuerpo:
        'XY Hole Compensation solo aplica a caminos cerrados; si el modelo tiene aberturas en los lados que producen caminos no cerrados en una capa, la compensación no se aplica a esas capas; aplicarla en ese caso produce una separación de capa notable en las ubicaciones de los agujeros. Solo XY Contour Compensation puede aplicarse a capas con caminos no cerrados.',
      cita: {
        texto: 'XY Hole Compensation solo aplica a caminos cerrados; si el modelo tiene aberturas en los lados que producen caminos no cerrados en una capa, la compensación no se aplica a esas capas.',
        fuente: 'Bambu Lab',
      },
    },
    {
      id: 'calibracion-medicion',
      titulo: 'Calibración: medición de tolerancia',
      puntos: [
        'Para probar las tolerancias de la impresora: calibrar la impresora y el extrusor, imprimir 3 a 5 cubos de calibración.',
        'Medir cada impresión en el mismo lugar con calibre.',
        'Anotar la orientación del modelo, registrar al menos 3 mediciones por cada una de las 3 direcciones (X, Y, Z).',
        'Para cada dirección, restar la medición más pequeña de la más grande; ese número es un buen punto de partida para diseñar holguras.',
        'La tolerancia de la impresora será ± la mitad del valor de la holgura.',
        'Ejemplo: mediciones 20,1 / 20,0 / 19,9 mm en Y → holgura = 0,2 mm → tolerancia ±0,1 mm.',
      ],
      indicador: 'calibracion',
      cuerpo:
        'Para probar las tolerancias de la impresora: calibrar la impresora y el extrusor, imprimir 3 a 5 cubos de calibración, medir cada impresión en el mismo lugar con calibre, anotar la orientación del modelo, registrar al menos 3 mediciones por cada una de las 3 direcciones (X, Y, Z). Para cada dirección, restar la medición más pequeña de la más grande; ese número es un buen punto de partida para diseñar holguras. La tolerancia de la impresora será ± la mitad del valor de la holgura. Ejemplo: mediciones 20,1 / 20,0 / 19,9 mm en Y → holgura = 0,2 mm → tolerancia ±0,1 mm.',
      cifra: { valor: '± holgura / 2', nota: 'tolerancia a partir de la holgura medida' },
      cita: {
        texto: 'Para cada dirección, restar la medición más pequeña de la más grande; ese número es un buen punto de partida para diseñar holguras. La tolerancia de la impresora será ± la mitad del valor de la holgura.',
        fuente: 'All3DP',
      },
    },
    {
      id: 'primera-capa-medicion',
      titulo: 'Minimizar el impacto de la primera capa',
      puntos: [
        'Para minimizar el impacto de la primera capa en la medición: imprimir un modelo con 50–100 capas y medir solo las 20 superiores.',
        'Si la boquilla está demasiado baja en la primera capa, el plástico extra crea capas más grandes en la base que afectan las dimensiones.',
        'La configuración de la primera capa puede afectar las siguientes 10–20 capas de la pieza.',
      ],
      indicador: 'calibracion',
      cuerpo:
        'Para minimizar el impacto de la primera capa en la medición: imprimir un modelo con 50–100 capas y medir solo las 20 superiores. Si la boquilla está demasiado baja en la primera capa, el plástico extra crea capas más grandes en la base que afectan las dimensiones. La configuración de la primera capa puede afectar las siguientes 10–20 capas de la pieza.',
      cifra: { valor: '20 capas superiores', nota: 'de 50–100 capas impresas' },
      cita: {
        texto: 'Para minimizar el impacto de la primera capa en la medición: imprimir un modelo con 50–100 capas y medir solo las 20 superiores.',
        fuente: 'Simplify3D',
      },
    },
    {
      id: 'steps-mm',
      titulo: 'Pasos por milímetro (steps/mm)',
      puntos: [
        'Los valores de steps/mm deben ser exactos según correas, poleas y husillos; no calibrar por ensayo y error.',
        'Usar la calculadora de Josef Prusa.',
        'No hay ningún hack de software que pueda compensar razonablemente una impresora mal ensamblada (backlash): hay que apretar la correa.',
      ],
      indicador: 'calibracion',
      cuerpo:
        'Los valores de steps/mm deben ser exactos según correas, poleas y husillos; no calibrar por ensayo y error. Usar la calculadora de Josef Prusa. No hay ningún hack de software que pueda compensar razonablemente una impresora mal ensamblada (backlash): hay que apretar la correa.',
      cita: {
        texto: 'Los valores de steps/mm deben ser exactos según correas, poleas y husillos; no calibrar por ensayo y error.',
        fuente: 'Slic3r Manual',
      },
    },
    {
      id: 'orca-tolerance-test',
      titulo: 'Orca Tolerance Test',
      puntos: [
        'OrcaSlicer incluye modelos handy accesibles con clic derecho en la placa en modo Prepare → "Add Handy Model".',
        'El modelo "Orca Tolerance Test" tiene 6 agujeros hexagonales con tolerancias de 0,0.',
        '0,05, 0,1, 0,2, 0,3 Y 0,4 mm, además de un probador hexagonal.',
        'Se puede comprobar la tolerancia con una llave Allen de 6 mm o con el probador impreso.',
        'Medir con calibre los agujeros y el probador interior; a partir de los resultados ajustar X-Y hole compensation y X-Y contour compensation.',
        'Repetir hasta lograr la precisión deseada.',
      ],
      indicador: 'calibracion',
      cuerpo:
        'OrcaSlicer incluye modelos handy accesibles con clic derecho en la placa en modo Prepare → "Add Handy Model". El modelo "Orca Tolerance Test" tiene 6 agujeros hexagonales con tolerancias de 0,0, 0,05, 0,1, 0,2, 0,3 y 0,4 mm, además de un probador hexagonal. Se puede comprobar la tolerancia con una llave Allen de 6 mm o con el probador impreso; medir con calibre los agujeros y el probador interior; a partir de los resultados ajustar X-Y hole compensation y X-Y contour compensation; repetir hasta lograr la precisión deseada.',
      cifra: { valor: '0,0–0,4 mm', nota: 'tolerancias del modelo de prueba' },
      cita: {
        texto: 'El modelo "Orca Tolerance Test" tiene 6 agujeros hexagonales con tolerancias de 0.0, 0.05, 0.1, 0.2, 0.3 y 0.4 mm, además de un probador hexagonal.',
        fuente: 'OrcaSlicer',
      },
    },
    {
      id: 'precision-settings',
      titulo: 'Ajustes de precisión del slicer (OrcaSlicer)',
      puntos: [
        'Slice gap closing radius: las grietas menores que 2× el radio de cierre de huecos se rellenan durante el slicing.',
        'Resolution: el camino G-code se genera simplificando el contorno del modelo.',
        'Valores más pequeños = mayor resolución y más tiempo de slicing.',
        'Arc fitting: sustituye muchos movimientos rectos cortos por menos comandos de arco circular (G2/G3).',
        'Reduce el tamaño del G-code pero introduce aproximación.',
        'Precise Wall: aumenta ligeramente la separación entre la pared exterior y la interior, poniendo el solape entre ambas en cero.',
        'Mejora la precisión dimensional y la consistencia de capas sin afectar la resistencia.',
        'Precise Z Height: asegura la altura Z exacta del modelo tras el slicing, ajustando la altura de las últimas 5 capas.',
      ],
      indicador: 'slicer',
      cuerpo:
        'Slice gap closing radius: las grietas menores que 2× el radio de cierre de huecos se rellenan durante el slicing. Resolution: el camino G-code se genera simplificando el contorno del modelo; valores más pequeños = mayor resolución y más tiempo de slicing. Arc fitting: sustituye muchos movimientos rectos cortos por menos comandos de arco circular (G2/G3); reduce el tamaño del G-code pero introduce aproximación. Precise Wall: aumenta ligeramente la separación entre la pared exterior y la interior, poniendo el solape entre ambas en cero; mejora la precisión dimensional y la consistencia de capas sin afectar la resistencia. Precise Z Height: asegura la altura Z exacta del modelo tras el slicing, ajustando la altura de las últimas 5 capas.',
      cita: {
        texto: 'Precise Wall: aumenta ligeramente la separación entre la pared exterior y la interior al imprimir en orden interior/exterior, poniendo el solape entre ambas en cero; mejora la precisión dimensional y la consistencia de capas sin afectar la resistencia.',
        fuente: 'OrcaSlicer',
      },
    },
    {
      id: 'poliholes',
      titulo: 'Poliholes y aproximación poligonal',
      puntos: [
        'Un polyhole representa el agujero como un polígono de pocos lados planos, forzando al slicer a tratar cada segmento como línea recta.',
        'Que se imprime de forma más fiable. Idea y matemáticas de Hydraraptor (nophead); implementación original en SuperSlicer.',
        'OpenSCAD ofrece la función polyhole() de nophead, que calcula el número óptimo de segmentos.',
        'Aumentar el número de segmentos en el CAD antes de exportar el STL reduce el error de aproximación poligonal.',
      ],
      indicador: 'slicer',
      cuerpo:
        'Un polyhole representa el agujero como un polígono de pocos lados planos, forzando al slicer a tratar cada segmento como línea recta, que se imprime de forma más fiable. Idea y matemáticas de Hydraraptor (nophead); implementación original en SuperSlicer. OpenSCAD ofrece la función polyhole() de nophead, que calcula el número óptimo de segmentos. Aumentar el número de segmentos en el CAD antes de exportar el STL reduce el error de aproximación poligonal.',
      cita: {
        texto: 'Polyholes: técnica FFF para mejorar la precisión de agujeros circulares; el agujero se representa como un polígono de pocos lados planos, forzando al slicer a tratar cada segmento como línea recta, que se imprime de forma más fiable.',
        fuente: 'OrcaSlicer',
      },
    },
    {
      id: 'modelo-flujo',
      titulo: 'Modelo de flujo: ovalado vs rectangular',
      puntos: [
        'Slic3r y sus forks (PrusaSlicer, SuperSlicer, OrcaSlicer) asumen que el camino de extrusión tiene forma ovalada.',
        'Lo que explica los solapes (dos paredes de 0,4 mm con capa de 0,2 mm = 0,714 mm combinados en lugar de 0,8 mm).',
        'Cura asume que el camino de extrusión es rectangular y no incluye solape (dos paredes de 0,4 mm = 0,8 mm).',
        'Esto explica por qué los agujeros salen pequeños en Slic3r/Orca y no en Cura.',
      ],
      indicador: 'slicer',
      cuerpo:
        'Slic3r y sus forks (PrusaSlicer, SuperSlicer, OrcaSlicer) asumen que el camino de extrusión tiene forma ovalada, lo que explica los solapes (dos paredes de 0,4 mm con capa de 0,2 mm = 0,714 mm combinados en lugar de 0,8 mm). Cura asume que el camino de extrusión es rectangular y no incluye solape (dos paredes de 0,4 mm = 0,8 mm). Esto explica por qué los agujeros salen pequeños en Slic3r/Orca y no en Cura.',
      cifra: { valor: '0,714 mm vs 0,8 mm', nota: 'espesor combinado de dos paredes de 0,4 mm' },
      cita: {
        texto: 'Slic3r y sus forks asumen que el camino de extrusión tiene forma ovalada, lo que explica los solapes (dos paredes de 0,4 mm con capa de 0,2 mm = 0,714 mm combinados en lugar de 0,8 mm).',
        fuente: 'OrcaSlicer',
      },
    },
    {
      id: 'soluciones-diseno',
      titulo: 'Soluciones por diseño',
      puntos: [
        'En casi todos los casos, si dos piezas deben encajar, hay que diseñar una más pequeña que la otra.',
        'No se puede esperar que una impresora FDM común acierte una dimensión a 100 micras (0,1 mm) de forma consistente.',
        'Todas las dimensiones deben diseñarse asumiendo que pueden salir mayores o menores en ese valor (All3DP, corroborado).',
        'Para piezas con agujeros que deben ser exactos, diseñar los agujeros de forma que se puedan ream/taladrar a la medida exacta (foro.',
        'Sin corroborar). Tener en cuenta el encogimiento posterior a la impresión (foro, sin corroborar).',
      ],
      indicador: 'maquina',
      cuerpo:
        'En casi todos los casos, si dos piezas deben encajar, hay que diseñar una más pequeña que la otra. No se puede esperar que una impresora FDM común acierte una dimensión a 100 micras (0,1 mm) de forma consistente; todas las dimensiones deben diseñarse asumiendo que pueden salir mayores o menores en ese valor (All3DP, corroborado). Para piezas con agujeros que deben ser exactos, diseñar los agujeros de forma que se puedan ream/taladrar a la medida exacta (foro, sin corroborar). Tener en cuenta el encogimiento posterior a la impresión (foro, sin corroborar).',
      cifra: { valor: '±0,1 mm', nota: 'desviación asumible en FDM' },
      cita: {
        texto: 'No se puede esperar que una impresora FDM común acierte una dimensión a 100 micras (0,1 mm) de forma consistente; todas las dimensiones deben diseñarse asumiendo que pueden salir mayores o menores en ese valor.',
        fuente: 'All3DP',
      },
    },
    {
      id: 'soluciones-software',
      titulo: 'Soluciones por software (slicer)',
      puntos: [
        'Para imprimir con máxima precisión: usar cinemática más lenta (velocidad de impresión < 60 mm/s.',
        'Aceleración < 3.000 mm/s², jerk < 15 mm/s), alturas de capa más pequeñas y enfriamiento activo de la pieza.',
        'Outer before inner walls: imprimir las paredes exteriores primero mejora teóricamente la precisión dimensional.',
        'Coasting: el extrusor deja de extruir hacia el final de un movimiento y se apoya en la presión residual de la boquilla.',
        'Linear advance (Marlin y otros firmwares): ajusta el flujo del filamento según los movimientos previstos.',
        'Horizontal expansion: aumenta o disminuye las dimensiones de la pieza en un porcentaje específico.',
        'Útil solo si toda la pieza sale demasiado pequeña o grande.',
        'La compensación reduce el error, no lo elimina: es corrección posterior, no garantía de precisión.',
      ],
      indicador: 'calibracion',
      cuerpo:
        'Para imprimir con máxima precisión: usar cinemática más lenta (velocidad de impresión < 60 mm/s, aceleración < 3.000 mm/s², jerk < 15 mm/s), alturas de capa más pequeñas y enfriamiento activo de la pieza. Outer before inner walls: imprimir las paredes exteriores primero mejora teóricamente la precisión dimensional. Coasting: el extrusor deja de extruir hacia el final de un movimiento y se apoya en la presión residual de la boquilla. Linear advance (Marlin y otros firmwares): ajusta el flujo del filamento según los movimientos previstos. Horizontal expansion: aumenta o disminuye las dimensiones de la pieza en un porcentaje específico; útil solo si toda la pieza sale demasiado pequeña o grande. La compensación reduce el error, no lo elimina: es corrección posterior, no garantía de precisión.',
      cifra: { valor: '< 60 mm/s', nota: 'velocidad de impresión recomendada' },
      cita: {
        texto: 'Para imprimir con máxima precisión: usar cinemática más lenta (velocidad, aceleración y jerk), alturas de capa más pequeñas y enfriamiento activo de la pieza. Recomendación: velocidad de impresión < 60 mm/s, aceleración < 3.000 mm/s², jerk < 15 mm/s para la mayoría de impresoras de sobremesa.',
        fuente: 'All3DP',
      },
    },
    {
      id: 'extrusion-multiplier',
      titulo: 'Extrusion Multiplier y compensación',
      puntos: [
        'El Extrusion Multiplier afecta al caudal de toda la impresión; demasiado bajo → huecos entre perímetros.',
        'Agujeros en superficies superiores y piezas más pequeñas; demasiado alto → capas superiores que abomban hacia arriba y piezas más grandes.',
        'El Extrusion Multiplier también afecta a las superficies sólidas, por lo que no es la solución ideal para ajustar dimensiones.',
        'Constant dimensional error: si la pieza siempre sale 0,1 mm grande, independientemente del tamaño del modelo.',
        'Usar compensación de tamaño horizontal.',
        'Increasing dimensional error: si el error crece con el tamaño de la pieza, la causa probable es la contracción térmica.',
        'Determinar el porcentaje de contracción (error / tamaño) y escalar el modelo.',
      ],
      indicador: 'calibracion',
      cuerpo:
        'El Extrusion Multiplier afecta al caudal de toda la impresión; demasiado bajo → huecos entre perímetros, agujeros en superficies superiores y piezas más pequeñas; demasiado alto → capas superiores que abomban hacia arriba y piezas más grandes. El Extrusion Multiplier también afecta a las superficies sólidas, por lo que no es la solución ideal para ajustar dimensiones. Constant dimensional error: si la pieza siempre sale 0,1 mm grande, independientemente del tamaño del modelo, usar compensación de tamaño horizontal. Increasing dimensional error: si el error crece con el tamaño de la pieza, la causa probable es la contracción térmica; determinar el porcentaje de contracción (error / tamaño) y escalar el modelo.',
      cita: {
        texto: 'Extrusion multiplier: afecta al caudal de toda la impresión; demasiado bajo → huecos entre perímetros, agujeros en superficies superiores y piezas más pequeñas; demasiado alto → capas superiores que abomban hacia arriba y piezas más grandes.',
        fuente: 'Simplify3D',
      },
    },
    {
      id: 'soluciones-maquina',
      titulo: 'Soluciones por máquina',
      puntos: [
        'La forma más importante de lograr la máxima precisión es calibrar la propia impresora.',
        'Ninguna impresora de sobremesa viene perfectamente calibrada de fábrica.',
        'Ni siquiera las pre-ensambladas; requieren calibración adicional con el tiempo como mantenimiento rutinario.',
        'Los elementos más importantes a calibrar son el extrusor y los E-steps; siempre es vital empezar con una buena primera capa.',
        'Seleccionar boquillas y filamento de buena calidad.',
        'La precisión dimensional depende de que el filamento extruido tenga el ancho que debería.',
        'Los componentes deteriorados hacen la impresora menos precisa.',
        'Asegurar que las correas estén tensas y que haya mínimo desgaste en varillas o rodamientos.',
      ],
      indicador: 'calibracion',
      cuerpo:
        'La forma más importante de lograr la máxima precisión es calibrar la propia impresora; ninguna impresora de sobremesa viene perfectamente calibrada de fábrica, ni siquiera las pre-ensambladas; requieren calibración adicional con el tiempo como mantenimiento rutinario. Los elementos más importantes a calibrar son el extrusor y los E-steps; siempre es vital empezar con una buena primera capa. Seleccionar boquillas y filamento de buena calidad; la precisión dimensional depende de que el filamento extruido tenga el ancho que debería. Los componentes deteriorados hacen la impresora menos precisa: asegurar que las correas estén tensas y que haya mínimo desgaste en varillas o rodamientos.',
      cita: {
        texto: 'La forma más importante de lograr la máxima precisión es calibrar la propia impresora; ninguna impresora de sobremesa viene perfectamente calibrada de fábrica, ni siquiera las pre-ensambladas.',
        fuente: 'All3DP',
      },
    },
    {
      id: 'post-procesado',
      titulo: 'Post-procesado',
      puntos: [
        'Incluso tras calibración, diseño y configuración de slicing, las piezas pueden seguir fuera de tolerancia y requerir post-procesado.',
        'El post-procesado suele ser sustractivo, por lo que es más relevante para piezas sobredimensionadas que para infradimensionadas.',
        'Lijar y limar piezas para eliminar elephant foot, restos de soportes y otros artefactos de impresión.',
        'Medir las piezas continuamente durante el post-procesado hasta alcanzar las dimensiones deseadas.',
        'Taladrar o ream cualquier agujero impreso en 3D.',
        'Intentar evitar soportes si es posible; es mucho más fácil re-taladrar un agujero que extraer soportes pequeños con alicates.',
      ],
      indicador: 'calibracion',
      cuerpo:
        'Incluso tras calibración, diseño y configuración de slicing, las piezas pueden seguir fuera de tolerancia y requerir post-procesado. El post-procesado suele ser sustractivo, por lo que es más relevante para piezas sobredimensionadas que para infradimensionadas. Lijar y limar piezas para eliminar elephant foot, restos de soportes y otros artefactos de impresión. Medir las piezas continuamente durante el post-procesado hasta alcanzar las dimensiones deseadas. Taladrar o ream cualquier agujero impreso en 3D. Intentar evitar soportes si es posible; es mucho más fácil re-taladrar un agujero que extraer soportes pequeños con alicates.',
      cita: {
        texto: 'Incluso tras calibración, diseño y configuración de slicing, las piezas pueden seguir fuera de tolerancia y requerir post-procesado.',
        fuente: 'All3DP',
      },
    },
    {
      id: 'dimensiones-z',
      titulo: 'Dimensiones verticales (eje Z)',
      puntos: [
        'Si las dimensiones verticales son incorrectas (a lo largo de Z) y el objeto suele salir más corto de lo esperado.',
        'Significa que la boquilla está demasiado baja y la primera capa se prensa demasiado contra la cama.',
        'Para corregirlo: subir el endstop Z o aumentar la opción Z offset en Slic3r.',
        'Precise Z Height (OrcaSlicer) corrige la altura Z final cuando la altura del modelo no es múltiplo de la altura de capa.',
      ],
      indicador: 'calibracion',
      cuerpo:
        'Si las dimensiones verticales son incorrectas (a lo largo de Z) y el objeto suele salir más corto de lo esperado, significa que la boquilla está demasiado baja y la primera capa se prensa demasiado contra la cama. Para corregirlo: subir el endstop Z o aumentar la opción Z offset en Slic3r. Precise Z Height (OrcaSlicer) corrige la altura Z final cuando la altura del modelo no es múltiplo de la altura de capa.',
      cita: {
        texto: 'Si las dimensiones verticales son incorrectas (a lo largo de Z) y el objeto suele salir más corto de lo esperado, significa que la boquilla está demasiado baja y la primera capa se prensa demasiado contra la cama.',
        fuente: 'Slic3r Manual',
      },
    },
    {
      id: 'flujo-matematica',
      titulo: 'Flujo y matemática de extrusión',
      puntos: [
        'La matemática de flujo usada en Slic3r desempeña un buen papel en hacer dimensiones correctas.',
        'Ya que intenta adivinar la forma del material extruido y el grosor de la extrusión en el plano horizontal.',
        'Al ser una aproximación, lleva error.',
        'La forma habitual de lidiar con estos problemas es ajustar el Extrusion Multiplier para aumentar/reducir la cantidad de plástico.',
        'Haciendo las extrusiones más gruesas o más finas; pero esto también afecta a las superficies sólidas.',
        'Imprimir perímetros externos primero evita el desplazamiento causado por el solape de extrusión.',
        'Imprimir perímetros internos primero oculta mejor las costuras.',
      ],
      indicador: 'altura',
      cuerpo:
        'La matemática de flujo usada en Slic3r desempeña un buen papel en hacer dimensiones correctas, ya que intenta adivinar la forma del material extruido y el grosor de la extrusión en el plano horizontal; al ser una aproximación, lleva error. La forma habitual de lidiar con estos problemas es ajustar el Extrusion Multiplier para aumentar/reducir la cantidad de plástico, haciendo las extrusiones más gruesas o más finas; pero esto también afecta a las superficies sólidas. Imprimir perímetros externos primero evita el desplazamiento causado por el solape de extrusión; imprimir perímetros internos primero oculta mejor las costuras.',
      cita: {
        texto: 'La matemática de flujo usada en Slic3r desempeña un buen papel en hacer dimensiones correctas, ya que intenta adivinar la forma del material extruido y el grosor de la extrusión en el plano horizontal; al ser una aproximación, lleva error.',
        fuente: 'Slic3r Manual',
      },
    },
  ],

  reglas: [
    {
      id: 'medir-tolerancia',
      accion: 'Mide la tolerancia real de tu máquina antes de compensar',
      valor: 'calibre',
      porque:
        'No hay dos impresoras con la misma tolerancia, ni siquiera del mismo modelo: hay que calibrar la propia máquina y no confiar en valores ajenos. Cada combinación de filamento e impresora varía.',
      fuente: 'All3DP, OrcaSlicer',
      alcance:
        'La medición debe hacerse con un instrumento de precisión (calibre). El valor obtenido no es permanente: depende del estado actual de la impresora y del material usado. No puede condicionarse porque es el primer paso de cualquier calibración.',
    },
    {
      id: 'cubos-calibracion',
      accion: 'Imprime 3 a 5 cubos de calibración y mide en X, Y, Z',
      valor: '3–5 cubos',
      porque:
        'Para probar las tolerancias: calibrar la impresora y el extrusor, imprimir 3 a 5 cubos, medirlos en el mismo lugar con calibre y registrar al menos 3 mediciones por cada dirección (X, Y, Z).',
      fuente: 'All3DP',
      alcance:
        'El protocolo requiere al menos 3 mediciones por dirección. La tolerancia de la impresora será ± la mitad de la holgura medida. No puede condicionarse porque es un protocolo de medición universal.',
    },
    {
      id: 'medir-capas-superiores',
      accion: 'Mide solo las capas superiores de la pieza',
      valor: '20 capas superiores de 50-100',
      porque:
        'Para minimizar el impacto de la primera capa: imprime 50–100 capas y mide las 20 superiores. Con la boquilla demasiado baja en la primera capa, el plástico extra agranda la base y falsea la medida.',
      fuente: 'Simplify3D',
      alcance:
        'La medición debe hacerse en las capas superiores, no en la base. La primera capa y las siguientes 10-20 pueden tener dimensiones distintas debido a la configuración de la primera capa. No puede condicionarse porque es una regla general de medición.',
    },
    {
      id: 'verificar-steps',
      accion: 'Verifica que los pasos por milímetro estén correctamente calibrados',
      porque:
        'Los valores de steps/mm deben ser exactos según correas, poleas y husillos; no calibrar por ensayo y error. Usar la calculadora de Josef Prusa.',
      fuente: 'Slic3r Manual',
      alcance:
        'Los steps/mm deben calibrarse según las especificaciones mecánicas de la impresora (correas, poleas, husillos). No se deben calibrar por ensayo y error. No puede condicionarse porque es una verificación mecánica previa a cualquier compensación.',
    },
    {
      id: 'corregir-backlash',
      accion: 'Corrige el backlash mecánicamente antes de compensar',
      cuando: { problema: 'dimensiones' },
      porque:
        'Ningún hack de software compensa razonablemente una impresora mal ensamblada (backlash). El backlash produce errores distintos en X e Y, y a menor tensión de la correa, mayor backlash.',
      fuente: 'Slic3r Manual',
      alcance:
        'El backlash es un problema mecánico (generalmente correas flojas) que debe corregirse físicamente. La compensación de software no puede arreglar un problema mecánico. Esta regla se dispara cuando el problema principal son dimensiones incorrectas.',
    },
    {
      id: 'usar-hole-compensation',
      accion: 'Usa XY Hole Compensation, no XY Contour Compensation',
      cuando: { problema: 'agujeros' },
      porque:
        'XY Hole Compensation ajusta el tamaño de agujeros (áreas cerradas, huecas) en cada capa: solo afecta a agujeros, no al tamaño exterior. XY Contour Compensation ajusta el contorno exterior del modelo.',
      fuente: 'Bambu Lab',
      alcance:
        'Esta regla solo aplica cuando el problema principal son agujeros pequeños. Si el agujero tiene aberturas laterales, la compensación no se aplica.',
    },
    {
      id: 'calcular-mitad-error',
      accion: 'Calcula la mitad del error como valor de compensación',
      valor: 'error / 2',
      porque:
        'Se aplica por radio: el diámetro aumentará el doble del valor. Si salen 0,1 mm pequeños, introduce -0,05 (negativo = encoger hacia dentro); la mitad del error: actúa en cada lado.',
      fuente: 'Bambu Lab, Slic3r Manual',
      alcance:
        'El valor es la mitad del error diametral porque actúa por radio. El signo lo fija la convención del slicer. Es aritmética, no depende del material. No puede condicionarse porque es una regla matemática que se aplica independientemente del material o el slicer.',
    },
    {
      id: 'formula-bambu',
      accion: 'Usa la fórmula de Bambu para calcular la compensación',
      valor: '(55 − valor medido) / 2',
      cuando: { slicer: 'bambu' },
      porque:
        'Fórmula de calibración de contorno en Bambu: (55 − valor medido) / 2. Esta fórmula permite calcular el valor de compensación necesario para que el agujero mida lo diseñado.',
      fuente: 'Bambu Lab',
      alcance:
        'La fórmula usa 55 como valor de referencia. El valor medido es el diámetro real del agujero impreso. Solo aplica a Bambu Studio.',
    },
    {
      id: 'orca-hole-compensation',
      accion: 'Configura X-Y hole compensation en OrcaSlicer',
      cuando: { slicer: 'orca' },
      porque:
        'X-Y hole compensation (OrcaSlicer): los agujeros se expanden o contraen en el plano XY por el valor configurado; valores positivos hacen agujeros más grandes, negativos más pequeños.',
      fuente: 'OrcaSlicer',
      alcance:
        'Este parámetro solo afecta a los agujeros, no a los contornos exteriores. Los valores positivos agrandan los agujeros y los negativos los encogen. Solo aplica a OrcaSlicer.',
    },
    {
      id: 'slic3r-xy-size',
      accion: 'Usa XY Size Compensation en Slic3r',
      cuando: { slicer: 'prusa' },
      porque:
        'XY Size Compensation (Slic3r): si los agujeros salen 0,1 mm pequeños, se introduce -0,05 (signo negativo = encoger hacia dentro); se compensa la mitad del error porque actúa en cada lado.',
      fuente: 'Slic3r Manual',
      alcance:
        'Este parámetro afecta todo el modelo, no solo los agujeros. Es una compensación general de tamaño XY. Solo aplica a PrusaSlicer/Slic3r.',
    },
    {
      id: 'simplify3d-horizontal',
      accion: 'Usa Horizontal Size Compensation en Simplify3D',
      valor: '-0,1 mm',
      cuando: { slicer: 'simplify3d' },
      porque:
        'Horizontal Size Compensation (Simplify3D): encoge el modelo 0,1 mm en X e Y; funciona mejor cuando el error dimensional es constante, incluso imprimiendo modelos de diferentes tamaños.',
      fuente: 'Simplify3D',
      alcance:
        'Este parámetro afecta todo el modelo. Funciona mejor cuando el error es constante independientemente del tamaño de la pieza. Solo aplica a Simplify3D.',
    },
    {
      id: 'no-compensar-abiertos',
      accion: 'No uses XY Hole Compensation en agujeros con aberturas laterales',
      cuando: { problema: 'agujeros' },
      porque:
        'X-Y Hole Compensation sólo aplica a caminos cerrados: con aberturas laterales no se aplica a las capas con caminos no cerrados, y produce una separación de capa notable en los agujeros.',
      fuente: 'Bambu Lab',
      alcance:
        'Los agujeros con aberturas laterales producen caminos no cerrados en algunas capas. En esos casos, solo X-Y Contour Compensation puede aplicarse. Esta regla se dispara cuando el problema principal son agujeros pequeños.',
    },
    {
      id: 'calibrar-por-filamento',
      accion: 'Calibra la compensación para cada filamento',
      porque:
        'Cada combinación de filamento e impresora da tolerancias diferentes, aun con el mismo filamento y perfil. La compensación es específica de cada filamento: repetir al cambiar de material.',
      fuente: 'OrcaSlicer, Bambu Lab',
      alcance:
        'La calibración debe repetirse cada vez que se cambia de filamento. No hay un valor universal que sirva para todos los materiales.',
    },
    {
      id: 'usar-poliholes',
      accion: 'Usa poliholes en el CAD para agujeros críticos',
      cuando: { problema: 'agujeros' },
      porque:
        'Un polyhole representa el agujero como un polígono con un número reducido de lados planos, lo que fuerza al slicer a tratar cada segmento como una línea recta que se imprime de forma más fiable.',
      fuente: 'OrcaSlicer',
      alcance:
        'Los poliholes son una técnica de diseño CAD, no un parámetro del slicer. Requieren modificar el modelo antes de exportar el STL. Esta regla se dispara cuando el problema principal son agujeros pequeños.',
    },
    {
      id: 'aumentar-segmentos',
      accion: 'Aumenta el número de segmentos en el CAD antes de exportar el STL',
      valor: '≈ 2 × diámetro agujero (mm)',
      porque:
        'Más segmentos en el CAD antes de exportar el STL reducen el error de aproximación poligonal. Los lados: el doble del diámetro del agujero en mm con boquilla de 0,4 mm, nunca menos de 3.',
      fuente: 'Slic3r Manual, OrcaSlicer',
      alcance:
        'La fórmula aproximada es 2 × diámetro del agujero en mm para boquilla de 0,4 mm. El mínimo es 3 lados. Esto reduce el error de aproximación poligonal pero no lo elimina por completo. No puede condicionarse porque es una regla general de diseño.',
    },
    {
      id: 'usar-orca-tolerance-test',
      accion: 'Usa el modelo Orca Tolerance Test para calibrar',
      valor: '0,0–0,4 mm',
      cuando: { slicer: 'orca' },
      porque:
        'El modelo "Orca Tolerance Test" tiene 6 agujeros hexagonales con tolerancias de 0,0 a 0,4 mm, además de un probador hexagonal. Permite calibrar la compensación de agujeros de forma sistemática.',
      fuente: 'OrcaSlicer',
      alcance:
        'El modelo de prueba tiene tolerancias de 0,0 a 0,4 mm. Es una herramienta de calibración específica para OrcaSlicer.',
    },
    {
      id: 'orientar-horizontal',
      accion: 'Orienta los agujeros en horizontal (paralelos a XY)',
      cuando: { problema: 'agujeros' },
      porque:
        'Los agujeros se imprimen mejor en horizontal (paralelos al plano XY): los rasgos verticales son menos precisos, solo tan finos como la altura de capa, por la naturaleza por capas del FDM.',
      fuente: 'All3DP',
      alcance:
        'La orientación horizontal aprovecha la mayor precisión del plano XY. Si hay que imprimir un agujero vertical, usar la técnica del teardrop. Esta regla se dispara cuando el problema principal son agujeros pequeños.',
    },
    {
      id: 'disenar-mas-pequeno',
      accion: 'Diseña una de las dos piezas más pequeña para el encaje',
      valor: '±0,1 mm',
      cuando: { problema: 'encaje' },
      porque:
        'En casi todos los casos, si dos piezas deben encajar, hay que diseñar una más pequeña: una FDM común no acierta una dimensión a 100 micras (0,1 mm) de forma consistente.',
      fuente: 'All3DP',
      alcance:
        'Regla de diseño general: asumir desviación de ±0,1 mm en todas las dimensiones. Esta regla se dispara cuando el problema principal es que las piezas no encajan.',
    },
    {
      id: 'post-procesado-ream',
      accion: 'Taladra o ream los agujeros críticos tras imprimir',
      porque:
        'Taladrar o ream cualquier agujero impreso en 3D.',
      fuente: 'All3DP',
      alcance:
        'El post-procesado es sustractivo: más relevante para piezas sobredimensionadas. Medir las piezas continuamente durante el post-procesado hasta alcanzar las dimensiones deseadas.',
    },
    {
      id: 'ajustar-z-offset',
      accion: 'Ajusta el Z offset si las dimensiones verticales son incorrectas',
      cuando: { problema: 'dimensiones' },
      porque:
        'Si las dimensiones en Z son incorrectas y el objeto sale más corto, la boquilla está demasiado baja y la primera capa se prensa contra la cama. Corrige subiendo el endstop Z o el Z offset de Slic3r.',
      fuente: 'Slic3r Manual',
      alcance:
        'El problema vertical se debe a que la boquilla está demasiado baja en la primera capa. Precise Z Height (OrcaSlicer) corrige la altura Z final cuando la altura del modelo no es múltiplo de la altura de capa. Esta regla se dispara cuando el problema principal son dimensiones incorrectas.',
    },
    {
      id: 'reducir-velocidad',
      accion: 'Reduce velocidad, aceleración y jerk para máxima precisión',
      valor: '< 60 mm/s',
      porque:
        'Para imprimir con máxima precisión: cinemática más lenta (velocidad < 60 mm/s, aceleración < 3.000 mm/s², jerk < 15 mm/s), alturas de capa más pequeñas y enfriamiento activo de la pieza.',
      fuente: 'All3DP',
      alcance:
        'La reducción de velocidad mejora la precisión dimensional. No puede condicionarse porque es una recomendación general de precisión.',
    },
    {
      id: 'outer-before-inner',
      accion: 'Imprime los perímetros exteriores primero',
      porque:
        'Imprimir primero las paredes exteriores mejora la precisión dimensional: no las empujan las internas ni el relleno. En Slic3r, External Perimeters First previene el desplazamiento por el solape.',
      fuente: 'All3DP, Slic3r Manual',
      alcance:
        'Imprimir perímetros externos primero puede mejorar la precisión dimensional pero puede hacer las costuras más visibles. No puede condicionarse porque es una recomendación general de precisión.',
    },
    {
      id: 'no-extrusion-multiplier',
      accion: 'No uses Extrusion Multiplier para ajustar dimensiones',
      cuando: { problema: 'dimensiones' },
      porque:
        'El Extrusion Multiplier también afecta a las superficies sólidas, por lo que no es la solución ideal para ajustar dimensiones: afecta toda la pieza, no solo los agujeros.',
      fuente: 'Slic3r Manual',
      alcance:
        'El Extrusion Multiplier afecta toda la pieza, no solo los agujeros. No es la herramienta adecuada para ajustar dimensiones específicas. Esta regla se dispara cuando el problema principal son dimensiones incorrectas.',
    },
    {
      id: 'usar-precise-wall',
      accion: 'Activa Precise Wall en OrcaSlicer',
      cuando: { slicer: 'orca' },
      porque:
        'Precise Wall (OrcaSlicer): establece el solape entre la pared exterior y su pared interior adyacente en cero, mejorando la precisión dimensional sin afectar la resistencia.',
      fuente: 'OrcaSlicer',
      alcance:
        'Precise Wall elimina el solape entre paredes adyacentes. Esto mejora la precisión dimensional. Solo aplica a OrcaSlicer.',
    },
    {
      id: 'usar-precise-z',
      accion: 'Activa Precise Z Height en OrcaSlicer',
      valor: 'últimas 5 capas',
      cuando: { slicer: 'orca' },
      porque:
        'Precise Z Height (OrcaSlicer) asegura la altura Z exacta tras el slicing, aunque la altura no sea múltiplo de la de capa: ajusta las últimas 5 capas para que la final coincida.',
      fuente: 'OrcaSlicer',
      alcance:
        'Precise Z Height ajusta las últimas 5 capas. Solo aplica a OrcaSlicer. Ejemplo: cubo de 20,1 mm con capa de 0,2 mm → sin la opción resulta 20,2 mm; con ella, 20,1 mm.',
    },
    {
      id: 'secar-filamento',
      accion: 'Seca el filamento si sospechas humedad',
      cuando: { problema: 'encaje' },
      porque:
        'Filamento húmedo causa extrusión inconsistente.',
      fuente: 'Bambu Lab',
      alcance:
        'La humedad causa extrusión inconsistente, lo que puede afectar las dimensiones. Secar el filamento es una medida preventiva, no una solución directa al problema dimensional. Esta regla se dispara cuando el problema principal es que las piezas no encajan.',
    },
    {
      id: 'calibrar-extrusor',
      accion: 'Calibra el extrusor y los E-steps',
      porque:
        'Los elementos más importantes a calibrar son el extrusor y los E-steps, y siempre es vital una buena primera capa. Los E-steps sin calibrar causan inexactitudes dimensionales.',
      fuente: 'All3DP',
      alcance:
        'La calibración del extrusor afecta la precisión dimensional. Debe hacerse antes de cualquier compensación de software. No puede condicionarse porque es una verificación mecánica previa.',
    },
    {
      id: 'componentes-tensos',
      accion: 'Asegura que las correas estén tensas y los componentes sin desgaste',
      porque:
        'Componentes deteriorados restan precisión: tensa las correas y revisa varillas o rodamientos; si no, aprieta o sustituye. Las correas sufren creep y elongación con el tiempo, y pierden tensión.',
      fuente: 'All3DP',
      alcance:
        'El mantenimiento de los componentes mecánicos es previo a cualquier compensación de software. No puede condicionarse porque es una verificación mecánica universal.',
    },
    {
      id: 'post-procesado-lijar',
      accion: 'Lija y lima las piezas para eliminar artefactos',
      porque:
        'El post-procesado es sustractivo, así que sirve para piezas sobredimensionadas. Lijar y limar para eliminar elephant foot y restos de soportes, midiendo hasta las dimensiones deseadas.',
      fuente: 'All3DP',
      alcance:
        'El post-procesado es sustractivo: más relevante para piezas sobredimensionadas. Medir continuamente durante el proceso. No puede condicionarse porque es una recomendación general de post-procesado.',
    },
    {
      id: 'evitar-soportes',
      accion: 'Evita soportes si es posible en agujeros críticos',
      porque:
        'Intentar evitar soportes si es posible; es mucho más fácil re-taladrar un agujero que extraer soportes pequeños con alicates.',
      fuente: 'All3DP',
      alcance:
        'Los soportes pequeños son difíciles de extraer y pueden dañar los agujeros. Evitarlos facilita el post-procesado. No puede condicionarse porque es una recomendación general de diseño.',
    },
    {
      id: 'usar-chaflanes',
      accion: 'Añade chaflanes o lead-in en los agujeros',
      cuando: { problema: 'encaje' },
      porque:
        'Falta de chaflanes o lead-in en los agujeros dificulta el encaje.',
      fuente: 'Bambu Lab',
      alcance:
        'Los chaflanes y lead-in son modificaciones de diseño que facilitan el encaje. No corrigen el error dimensional pero pueden hacer que el ensamblaje sea más fácil. Esta regla se dispara cuando el problema principal es que las piezas no encajan.',
    },
  ],

  fueraDeAlcance: [
    {
      sintoma: 'Las capas se han desplazado respecto a las anteriores',
      porQue:
        'Es un problema de mecánica (correas, poleas, holgura), no dimensional. La compensación XY no lo arregla.',
      guia: 'capas-desplazadas',
    },
    {
      sintoma: 'Las esquinas de la pieza se levantan de la cama',
      porQue:
        'Es warping: contracción térmica en los exteriores. La compensación XY no lo arregla; el ajuste es de temperatura y enfriamiento.',
      guia: 'warping-pla',
    },
    {
      sintoma: 'Las capas se sueltan por dentro',
      porQue:
        'Es separación entre capas: la unión falla y no es un problema de tamaño. Se arregla con temperatura y enfriamiento.',
      guia: 'separaciones-entre-capas',
    },
    {
      sintoma: 'La base sale más ancha que el resto',
      porQue:
        'Es pie de elefante: el problema está en la primera capa, no en el resto de las dimensiones. La compensación XY no lo arregla.',
      guia: 'elephant-foot',
    },
    {
      sintoma: 'Los agujeros salen ovalados o elípticos',
      porQue:
        'Es un problema específico de agujeros ovalados con causas propias (backlash, modelo de flujo). Esta guía cubre tolerancias generales; para agujeros ovalados hay una guía específica.',
      guia: 'agujeros-ovalados',
    },
  ],

  fuentes: [
    {
      url: 'https://all3dp.com/2/3d-printing-tolerances-test-fdm/',
      quien: 'All3DP',
      que: 'Tolerancias y encaje en FDM: definiciones, tipos de fit, causas de inexactitud, calibración y soluciones.',
    },
    {
      url: 'https://manual.slic3r.org/troubleshooting/dimension-errors',
      quien: 'Slic3r Manual',
      que: 'Precisión dimensional: causas de errores, compensación XY y soluciones.',
    },
    {
      url: 'https://wiki.bambulab.com/en/software/bambu-studio/xy-hole-contour-compensation',
      quien: 'Bambu Lab',
      que: 'XY Hole Compensation y XY Contour Compensation: separación de parámetros, fórmula y limitaciones.',
    },
    {
      url: 'https://github.com/OrcaSlicer/OrcaSlicer/wiki/quality_settings_precision',
      quien: 'OrcaSlicer',
      que: 'Precisión: poliholes, compensación y parámetros de calidad.',
    },
    {
      url: 'https://github.com/OrcaSlicer/OrcaSlicer/wiki/tolerance_calib',
      quien: 'OrcaSlicer',
      que: 'Calibración de tolerancias: separación de compensación de filamento y de proceso.',
    },
    {
      url: 'https://www.simplify3d.com/resources/print-quality-troubleshooting/dimensional-accuracy/',
      quien: 'Simplify3D',
      que: 'Precisión dimensional: contracción, compensación y medición.',
    },
    {
      url: 'https://forum.prusa3d.com/forum/original-prusa-i3-mk3s-mk3-improvements-archive/dimensional-accuracy/',
      quien: 'Foro Prusa',
      que: 'Dimensiones de agujeros: causas, compensación y discusiones de usuarios.',
    },
  ],

  campos: [],
  leeDelAnalisis: [],
};