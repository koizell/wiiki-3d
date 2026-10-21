import type { Guia } from './tipos';
import { AUTOR } from './autor.ts';

/**
 * Agujeros ovalados y compensación dimensional XY.
 *
 * Los agujeros salen más pequeños o elípticos por varias causas físicas:
 * contracción térmica, modelo de flujo ovalado del slicer, más material en
 * el lado cóncavo de las curvas y errores mecánicos. La compensación XY
 * del slicar puede corregir parte del error, pero no es un truco único:
 * depende del material, la geometría y la impresora.
 */
export const agujerosOvalados: Guia = {
  slug: 'agujeros-ovalados',
  titulo: 'Agujeros ovalados y compensación dimensional XY',
  resumen:
    'Los agujeros salen más pequeños o elípticos.',
  resumenExtra:
    'Antes de compensar, mide el error y descarta warping, separación y pie de elefante: la compensación mueve el contorno, no cura la causa.',
  sintoma: 'Los agujeros salen más pequeños o elípticos',
  dibujo: 'slicer',
  entrada:
    'Los agujeros de una pieza salen más pequeños de lo diseñado o con forma ovalada. Esto ocurre por varias causas físicas: el plástico se contrae al enfriar, el slicer deposita más material en el lado cóncavo de las curvas, y los errores mecánicos como el backlash producen errores distintos en X e Y. La compensación XY del slicer puede corregir parte del error, pero no es un truco único: depende del material, la geometría y la impresora. Esta guía te ayuda a medir el error, elegir la compensación adecuada y saber cuándo el problema es mecánico y no de software.',
  autor: AUTOR,
  actualizado: '2026-10-16',
  minutos: 6,

  diferencial: {
    contra: 'warping, separación entre capas, pie de elefante y sub/sobreextrusión',
    contraCorto: 'warping o separación',
    comprobaciones: [
      {
        id: 'agujeros',
        mira: '¿Los agujeros de la pieza son más pequeños de lo diseñado o tienen forma ovalada?',
        si: 'Sí, los agujeros son más pequeños o elípticos. Es un problema de precisión dimensional XY.',
        no: 'No, los agujeros son correctos pero hay otro defecto. Puede ser warping, separación o pie de elefante.',
      },
      {
        id: 'warping',
        mira: '¿Las esquinas de la pieza se levantan de la cama?',
        si: 'Sí, hay warping. La contracción térmica está deformando la pieza, no solo los agujeros.',
        no: 'No hay warping. La pieza está plana y el problema es solo dimensional.',
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
        si: 'Sí, hay pie de elefante. El problema está en la primera capa, no en los agujeros.',
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
      id: 'material',
      etiqueta: 'Material',
      indicador: 'material',
      para: 'La contracción térmica depende del material: ABS se contrae más que PLA, y esto afecta cuánto compensar.',
      necesaria: true,
      opciones: [
        { id: 'pla', etiqueta: 'PLA' },
        { id: 'petg', etiqueta: 'PETG' },
        { id: 'abs', etiqueta: 'ABS o ASA' },
        { id: 'pa', etiqueta: 'PA / nylon' },
        { id: 'pc', etiqueta: 'PC' },
        { id: 'tpu', etiqueta: 'TPU' },
      ],
    },
    {
      id: 'tipo-agujero',
      etiqueta: 'Tipo de agujero',
      indicador: 'geometria',
      para: 'La compensación XY Hole solo aplica a caminos cerrados; los agujeros con aberturas laterales no se compensan.',
      opciones: [
        { id: 'cerrado', etiqueta: 'Cerrado (anillo completo)' },
        { id: 'abierto', etiqueta: 'Con aberturas laterales' },
        { id: 'no-se', etiqueta: 'No lo sé' },
      ],
    },
    {
      id: 'tamano-agujero',
      etiqueta: 'Tamaño del agujero',
      indicador: 'geometria',
      para: 'Los agujeros muy pequeños (menores de 1 mm) son difíciles de ajustar y pueden requerir enfoque distinto.',
      opciones: [
        { id: 'pequeno', etiqueta: 'Menos de 1 mm' },
        { id: 'medio', etiqueta: '1–5 mm' },
        { id: 'grande', etiqueta: 'Más de 5 mm' },
        { id: 'no-se', etiqueta: 'No lo sé' },
      ],
    },
    {
      id: 'sintoma',
      etiqueta: 'Síntoma visible',
      indicador: 'general',
      para: 'La dirección del ajuste depende de si el agujero sale pequeño, ovalado o simplemente no encaja.',
      opciones: [
        { id: 'pequeno', etiqueta: 'Más pequeño de lo diseñado' },
        { id: 'ovalado', etiqueta: 'Ovalado o elíptico' },
        { id: 'no-encaja', etiqueta: 'No encaja con la pieza destino' },
        { id: 'no-se', etiqueta: 'No lo tengo claro' },
      ],
    },
  ],

  conocimiento: [
    {
      id: 'causas-contraccion',
      titulo: 'Contracción térmica',
      puntos: [
        'El plástico se contrae al enfriar; diferentes materiales exhiben diferente contracción, que también depende de la temperatura.',
        'La contracción térmica es un problema común en materiales de alta temperatura como ABS.',
        'El error dimensional que aumenta con el tamaño de la pieza es atribuible a la contracción térmica.',
        'el porcentaje de contracción = error / tamaño.',
      ],
      indicador: 'temperatura',
      cuerpo:
        'El plástico se contrae al enfriar; diferentes materiales exhiben diferente contracción, que también depende de la temperatura. La contracción térmica es un problema común en materiales de alta temperatura como ABS. El error dimensional que aumenta con el tamaño de la pieza es atribuible a la contracción térmica; el porcentaje de contracción = error / tamaño.',
      cifra: { valor: '0.1 mm en 20 mm = 0,5 %', nota: 'ejemplo de cálculo de contracción' },
      cita: {
        texto: 'El error dimensional que aumenta con el tamaño de la pieza es atribuible a la contracción térmica; el porcentaje de contracción = error / tamaño. Ejemplo: 0.1 mm en 20 mm = 0.5 %.',
        fuente: 'Simplify3D',
      },
    },
    {
      id: 'causas-concavo',
      titulo: 'Más material en el lado cóncavo',
      puntos: [
        'Al extruir a lo largo de una curva, se deposita más material por unidad de distancia en el lado cóncavo,.',
        'lo que hace el radio interno más corto.',
        'El lado interior del anillo tiene menos volumen que el exterior y se pega a la huella previa, así que el diámetro interior sale menor.',
        'El plástico tiende a redondear las esquinas, reduciendo aún más el área interna del agujero.',
      ],
      indicador: 'material',
      cuerpo:
        'Al extruir a lo largo de una curva, se deposita más material por unidad de distancia en el lado cóncavo, lo que hace el radio interno más corto. El lado interior del anillo tiene menos volumen que el exterior y se pega a la huella previa, así que el diámetro interior sale menor. El plástico tiende a redondear las esquinas, reduciendo aún más el área interna del agujero.',
      cita: {
        texto: 'Al extruir a lo largo de una curva, se deposita más material por unidad de distancia en el lado cóncavo, lo que hace el radio interno más corto.',
        fuente: 'Slic3r Manual',
      },
    },
    {
      id: 'causas-mecanicas',
      titulo: 'Errores mecánicos',
      puntos: [
        'El backlash (holgura mecánica, generalmente correas flojas) produce errores dimensionales distintos en X e Y. En impresoras con cama móvil,.',
        'el eje Y es más propenso por la inercia.',
        'El Z wobble por problemas mecánicos reduce el tamaño del agujero a la envolvente interna de las capas apiladas.',
        'La sección irregular del filamento (diámetro no constante) produce flujo irregular y el agujero resultante es la envolvente interna de todas',
        'las capas.',
      ],
      indicador: 'maquina',
      cuerpo:
        'El backlash (holgura mecánica, generalmente correas flojas) produce errores dimensionales distintos en X e Y. En impresoras con cama móvil, el eje Y es más propenso por la inercia. El Z wobble por problemas mecánicos reduce el tamaño del agujero a la envolvente interna de las capas apiladas. La sección irregular del filamento (diámetro no constante) produce flujo irregular y el agujero resultante es la envolvente interna de todas las capas.',
      cita: {
        texto: 'Backlash (holgura mecánica, generalmente correas flojas) produce errores dimensionales distintos en X e Y.',
        fuente: 'Slic3r Manual',
      },
    },
    {
      id: 'modelo-flujo',
      titulo: 'Modelo de flujo: ovalado vs rectangular',
      puntos: [
        'Slic3r y sus forks (PrusaSlicer, SuperSlicer, OrcaSlicer) asumen que el camino de extrusión tiene forma ovalada, lo que explica los solapes.',
        'dos paredes de 0,4 mm con altura de capa de 0,2 mm producen un espesor combinado de 0,714 mm en lugar de 0,8 mm. Cura asume que el camino de',
        'extrusión es rectangular y no incluye solape.',
        'dos paredes de 0,4 mm producen un espesor de 0,8 mm. Esto explica por qué los agujeros salen pequeños en Slic3r/Orca y no en Cura.',
      ],
      indicador: 'slicer',
      cuerpo:
        'Slic3r y sus forks (PrusaSlicer, SuperSlicer, OrcaSlicer) asumen que el camino de extrusión tiene forma ovalada, lo que explica los solapes; dos paredes de 0,4 mm con altura de capa de 0,2 mm producen un espesor combinado de 0,714 mm en lugar de 0,8 mm. Cura asume que el camino de extrusión es rectangular y no incluye solape; dos paredes de 0,4 mm producen un espesor de 0,8 mm. Esto explica por qué los agujeros salen pequeños en Slic3r/Orca y no en Cura.',
      cifra: { valor: '0,714 mm vs 0,8 mm', nota: 'espesor combinado de dos paredes de 0,4 mm' },
      cita: {
        texto: 'Slic3r y sus forks asumen que el camino de extrusión tiene forma ovalada, lo que explica los solapes; dos paredes de 0.4 mm con altura de capa de 0.2 mm producen un espesor combinado de 0.714 mm en lugar de 0.8 mm.',
        fuente: 'OrcaSlicer',
      },
    },
    {
      id: 'compensacion-radio',
      titulo: 'La compensación se aplica por radio',
      puntos: [
        'La compensación del agujero se aplica por radio: el diámetro del agujero aumentará el doble del valor de compensación.',
        'Si los agujeros salen 0,1 mm pequeños, se introduce -0,05 (signo negativo = encoger hacia dentro).',
        'se compensa la mitad del error porque actúa en cada lado.',
      ],
      indicador: 'calibracion',
      cuerpo:
        'La compensación del agujero se aplica por radio: el diámetro del agujero aumentará el doble del valor de compensación. Si los agujeros salen 0,1 mm pequeños, se introduce -0,05 (signo negativo = encoger hacia dentro); se compensa la mitad del error porque actúa en cada lado.',
      cifra: { valor: 'diámetro = 2 × compensación', nota: 'la compensación actúa por radio' },
      cita: {
        texto: 'La compensación del agujero se aplica por radio: el diámetro del agujero aumentará el doble del valor de compensación.',
        fuente: 'Bambu Lab',
      },
    },
    {
      id: 'compensacion-formula',
      titulo: 'Fórmula de calibración',
      puntos: [
        'Fórmula de calibración de contour en Bambu.',
        '(55 − valor medido) / 2. Esta fórmula permite calcular el valor de compensación necesario para que el agujero mida lo diseñado.',
      ],
      indicador: 'calibracion',
      cuerpo:
        'Fórmula de calibración de contour en Bambu: (55 − valor medido) / 2. Esta fórmula permite calcular el valor de compensación necesario para que el agujero mida lo diseñado.',
      cifra: { valor: '(55 − valor medido) / 2', nota: 'fórmula de Bambu Lab' },
      cita: {
        texto: 'Fórmula de calibración de contour en Bambu: (55 − valor medido) / 2.',
        fuente: 'Bambu Lab',
      },
    },
    {
      id: 'poliholes',
      titulo: 'Poliholes',
      puntos: [
        'Un polyhole representa el agujero como un polígono con un número reducido de lados planos,.',
        'lo que fuerza al slicer a tratar cada segmento como una línea recta que se imprime de forma más fiable.',
        'La técnica polyhole fue implementada originalmente en SuperSlicer; la idea y las matemáticas son de Hydraraptor (nophead).',
        'OpenSCAD tiene la función polyhole() desarrollada por nophead que calcula el número óptimo de segmentos.',
      ],
      indicador: 'slicer',
      cuerpo:
        'Un polyhole representa el agujero como un polígono con un número reducido de lados planos, lo que fuerza al slicer a tratar cada segmento como una línea recta que se imprime de forma más fiable. La técnica polyhole fue implementada originalmente en SuperSlicer; la idea y las matemáticas son de Hydraraptor (nophead). OpenSCAD tiene la función polyhole() desarrollada por nophead que calcula el número óptimo de segmentos.',
      cita: {
        texto: 'Un polyhole representa el agujero como un polígono con un número reducido de lados planos, lo que fuerza al slicer a tratar cada segmento como una línea recta que se imprime de forma más fiable.',
        fuente: 'OrcaSlicer',
      },
    },
    {
      id: 'poliholes-segmentos',
      titulo: 'Número de segmentos en el CAD',
      puntos: [
        'Aumentar el número de segmentos en el CAD antes de exportar el STL reduce el error de aproximación poligonal.',
        'El número de lados se calcula a partir del tamaño del agujero y el diámetro de la boquilla (aproximadamente el doble del diámetro del.',
        'agujero en mm con boquilla de 0,4 mm,.',
        'nunca menos de 3).',
      ],
      indicador: 'temperatura',
      cuerpo:
        'Aumentar el número de segmentos en el CAD antes de exportar el STL reduce el error de aproximación poligonal. El número de lados se calcula a partir del tamaño del agujero y el diámetro de la boquilla (aproximadamente el doble del diámetro del agujero en mm con boquilla de 0,4 mm, nunca menos de 3).',
      cifra: { valor: '≈ 2 × diámetro agujero (mm)', nota: 'con boquilla de 0,4 mm' },
      cita: {
        texto: 'Aumentar el número de segmentos en el CAD antes de exportar el STL reduce el error de aproximación poligonal.',
        fuente: 'Slic3r Manual',
      },
    },
    {
      id: 'limitaciones-caminos',
      titulo: 'Limitaciones: caminos cerrados',
      puntos: [
        'X-Y Hole Compensation solo aplica a caminos cerrados.',
        'si el modelo tiene aberturas en los lados que producen caminos no cerrados en una capa, la compensación no se aplica a esas capas.',
        'Si se aplica X-Y Hole Compensation a un modelo con caminos no cerrados,.',
        'se produce una separación de capa notable en las ubicaciones de los agujeros.',
        'Solo X-Y Contour Compensation puede aplicarse a capas con caminos no cerrados.',
      ],
      indicador: 'calibracion',
      cuerpo:
        'X-Y Hole Compensation solo aplica a caminos cerrados: si el modelo tiene aberturas en los lados que producen caminos no cerrados en una capa, la compensación no se aplica a esas capas. Si se aplica X-Y Hole Compensation a un modelo con caminos no cerrados, se produce una separación de capa notable en las ubicaciones de los agujeros. Solo X-Y Contour Compensation puede aplicarse a capas con caminos no cerrados.',
      cita: {
        texto: 'X-Y Hole Compensation solo aplica a caminos cerrados: si el modelo tiene aberturas en los lados que producen caminos no cerrados en una capa, la compensación no se aplica a esas capas.',
        fuente: 'Bambu Lab',
      },
    },
    {
      id: 'calibracion-filamento',
      titulo: 'Calibración específica por filamento',
      puntos: [
        'Cada combinación de filamento e impresora puede resultar en tolerancias diferentes; incluso con el mismo filamento y perfil,.',
        'las tolerancias varían de una impresora a otra.',
        'La calibración de compensación es específica para cada filamento; debe repetirse cuando se cambia de material.',
      ],
      indicador: 'calibracion',
      cuerpo:
        'Cada combinación de filamento e impresora puede resultar en tolerancias diferentes; incluso con el mismo filamento y perfil, las tolerancias varían de una impresora a otra. La calibración de compensación es específica para cada filamento; debe repetirse cuando se cambia de material.',
      cuando: { material: ['abs', 'pa', 'pc'] },
      cita: {
        texto: 'Cada combinación de filamento e impresora puede resulten en tolerancias diferentes; incluso con el mismo filamento y perfil, las tolerancias varían de una impresora a otra.',
        fuente: 'OrcaSlicer',
      },
    },
    {
      id: 'tornillo-m6',
      titulo: 'Tornillo M6: diámetro real vs nominal',
      puntos: [
        'Un tornillo M6 nominal tiene un diámetro real de ~5,9 mm por la norma ISO 6g (la rosca es ligeramente menor para facilitar el ensamblaje).',
        'Esto explica por qué un agujero de 6 mm puede no encajar con un tornillo M6.',
      ],
      indicador: 'geometria',
      cuerpo:
        'Un tornillo M6 nominal tiene un diámetro real de ~5,9 mm por la norma ISO 6g (la rosca es ligeramente menor para facilitar el ensamblaje). Esto explica por qué un agujero de 6 mm puede no encajar con un tornillo M6.',
      cifra: { valor: 'M6 → ~5,9 mm', nota: 'norma ISO 6g' },
      cuando: { sintoma: 'no-encaja' },
      cita: {
        texto: 'Un tornillo M6 nominal tiene un diámetro real de ~5.9 mm por la norma ISO 6g (la rosca es ligeramente menor para facilitar el ensamblaje).',
        fuente: 'Bambu Lab',
      },
    },
    {
      id: 'orca-tolerance-test',
      titulo: 'Orca Tolerance Test',
      puntos: [
        'El modelo "Orca Tolerance Test" tiene 6 agujeros hexagonales con tolerancias de 0,0, 0,05, 0,1, 0,2, 0,3 y 0,4 mm,.',
        'además de un probador hexagonal.',
        'Este modelo permite calibrar la compensación de agujeros de forma sistemática.',
      ],
      indicador: 'calibracion',
      cuerpo:
        'El modelo "Orca Tolerance Test" tiene 6 agujeros hexagonales con tolerancias de 0,0, 0,05, 0,1, 0,2, 0,3 y 0,4 mm, además de un probador hexagonal. Este modelo permite calibrar la compensación de agujeros de forma sistemática.',
      cifra: { valor: '0,0–0,4 mm', nota: 'tolerancias del modelo de prueba' },
      cita: {
        texto: 'El modelo "Orca Tolerance Test" tiene 6 agujeros hexagonales con tolerancias de 0.0, 0.05, 0.1, 0.2, 0.3 y 0.4 mm, además de un probador hexagonal.',
        fuente: 'OrcaSlicer',
      },
    },
    {
      id: 'medicion-capa',
      titulo: 'Medición y primera capa',
      puntos: [
        'La configuración de la primera capa puede afectar las siguientes 10-20 capas de la pieza.',
        'Para minimizar el impacto de la primera capa, imprimir un modelo con 50-100 capas y medir solo las 20 superiores.',
        'Si la boquilla está demasiado baja en la primera capa, el plástico extra crea capas más grandes en la base que afectan las dimensiones.',
      ],
      indicador: 'calibracion',
      cuerpo:
        'La configuración de la primera capa puede afectar las siguientes 10-20 capas de la pieza. Para minimizar el impacto de la primera capa, imprimir un modelo con 50-100 capas y medir solo las 20 superiores. Si la boquilla está demasiado baja en la primera capa, el plástico extra crea capas más grandes en la base que afectan las dimensiones.',
      cifra: { valor: '10–20 capas', nota: 'afectadas por la primera capa' },
      cita: {
        texto: 'La configuración de la primera capa puede afectar las siguientes 10-20 capas de la pieza.',
        fuente: 'Simplify3D',
      },
    },
    {
      id: 'algoritmo-bowyer',
      titulo: 'Algoritmo de Adrian Bowyer: implementado y retirado',
      puntos: [
        'Slic3r implementó un algoritmo de compensación para el lado cóncavo de las curvas (propuesto por Adrian Bowyer),.',
        'pero muchos usuarios se quejaron de que los agujeros salían demasiado grandes, por lo que fue retirado.',
        'La compensación manual es preferible a la automática porque permite elegir el punto exacto.',
        'los agujeros grandes son peor que los agujeros pequeños (que se pueden taladrar).',
      ],
      indicador: 'calibracion',
      cuerpo:
        'Slic3r implementó un algoritmo de compensación para el lado cóncavo de las curvas (propuesto por Adrian Bowyer), pero muchos usuarios se quejaron de que los agujeros salían demasiado grandes, por lo que fue retirado. La compensación manual es preferible a la automática porque permite elegir el punto exacto: los agujeros grandes son peor que los agujeros pequeños (que se pueden taladrar).',
      cita: {
        texto: 'Slic3r implementó un algoritmo de compensación para el lado cóncavo de las curvas (propuesto por Adrian Bowyer), pero muchos usuarios se quejaron de que los agujeros salían demasiado grandes, por lo que fue retirado.',
        fuente: 'Slic3r Manual',
      },
    },
    {
      id: 'separacion-parametros',
      titulo: 'Separación de parámetros: ventaja de Bambu/Orca',
      puntos: [
        'Bambu Studio y OrcaSlicer ofrecen dos parámetros independientes (hole y contour),.',
        'mientras que PrusaSlicer (según el usuario del foro) tiene un único parámetro que afecta a todo.',
        'La separación de parámetros es una ventaja de Bambu/Orca, no una contradicción de valores.',
        'permite ajustar agujeros y contornos por separado.',
      ],
      indicador: 'slicer',
      cuerpo:
        'Bambu Studio y OrcaSlicer ofrecen dos parámetros independientes (hole y contour), mientras que PrusaSlicer (según el usuario del foro) tiene un único parámetro que afecta a todo. La separación de parámetros es una ventaja de Bambu/Orca, no una contradicción de valores: permite ajustar agujeros y contornos por separado.',
      cita: {
        texto: 'Bambu Studio y OrcaSlicer ofrecen dos parámetros independientes (hole y contour), mientras que PrusaSlicer (según el usuario del foro) tiene un único parámetro que afecta a todo.',
        fuente: 'Bambu Lab, OrcaSlicer',
      },
    },
  ],

  reglas: [
    {
      id: 'medir-error',
      accion: 'Mide el error dimensional antes de compensar',
      valor: 'calibre o micrómetro',
      porque:
        'No hay un truco único para compensar agujeros; depende de la geometría, las tolerancias de la impresora y las propiedades del material. Medir el error permite calcular la compensación exacta necesaria.',
      fuente: 'OrcaSlicer, Simplify3D',
      alcance:
        'La medición debe hacerse con un instrumento de precisión (calibre o micrómetro). El error se calcula como la diferencia entre el diámetro diseñado y el diámetro medido. No puede condicionarse porque es el primer paso de cualquier calibración: sin medida no hay compensación posible.',
    },
    {
      id: 'usar-hole-compensation',
      accion: 'Usa XY Hole Compensation, no XY Contour Compensation',
      cuando: { 'tipo-agujero': 'cerrado' },
      porque:
        'XY Hole Compensation ajusta el tamaño de agujeros (áreas cerradas, huecas) en cada capa; solo afecta agujeros, no cambia el tamaño exterior del modelo. XY Contour Compensation ajusta el contorno exterior del modelo; aumenta o disminuye el tamaño XY manteniendo los agujeros sin cambios.',
      fuente: 'Bambu Lab',
      alcance:
        'Esta regla solo aplica a agujeros cerrados (anillo completo). Si el agujero tiene aberturas laterales, la compensación no se aplica.',
    },
    {
      id: 'calcular-mitad-error',
      accion: 'Calcula la mitad del error como valor de compensación',
      valor: 'error / 2',
      porque:
        'La compensación del agujero se aplica por radio: el diámetro del agujero aumentará el doble del valor de compensación. Si los agujeros salen 0,1 mm pequeños, se introduce -0,05 (signo negativo = encoger hacia dentro); se compensa la mitad del error porque actúa en cada lado.',
      fuente: 'Bambu Lab, Slic3r Manual',
      alcance:
        'El valor es la mitad del error diametral porque actúa por radio. El signo lo fija la convención del slicer: en Slic3r, negativo encoge el contorno, así que un agujero pequeño se compensa con un valor negativo (p. ej. -0,05). Es aritmética, no depende del material.',
    },
    {
      id: 'formula-bambu',
      accion: 'Usa la fórmula de Bambu para calcular la compensación',
      valor: '(55 − valor medido) / 2',
      cuando: { slicer: 'bambu' },
      porque:
        'Fórmula de calibración de contour en Bambu: (55 − valor medido) / 2. Esta fórmula permite calcular el valor de compensación necesario para que el agujero mida lo diseñado.',
      fuente: 'Bambu Lab',
      alcance:
        'La fórmula usa 55 como valor de referencia (probablemente el diámetro de la pieza de prueba). El valor medido es el diámetro real del agujero impreso.',
    },
    {
      id: 'orca-hole-compensation',
      accion: 'Configura X-Y hole compensation en OrcaSlicer',
      cuando: { slicer: 'orca' },
      porque:
        'X-Y hole compensation (OrcaSlicer): los agujeros se expanden o contraen en el plano XY por el valor configurado; valores positivos hacen agujeros más grandes, negativos más pequeños.',
      fuente: 'OrcaSlicer',
      alcance:
        'Este parámetro solo afecta a los agujeros, no a los contornos exteriores. Los valores positivos agrandan los agujeros y los negativos los encogen.',
    },
    {
      id: 'slic3r-xy-size',
      accion: 'Usa XY Size Compensation en Slic3r',
      cuando: { slicer: 'prusa' },
      porque:
        'XY Size Compensation (Slic3r): si los agujeros salen 0,1 mm pequeños, se introduce -0,05 (signo negativo = encoger hacia dentro); se compensa la mitad del error porque actúa en cada lado.',
      fuente: 'Slic3r Manual',
      alcance:
        'Este parámetro afecta todo el modelo, no solo los agujeros. Es una compensación general de tamaño XY.',
    },
    {
      id: 'simplify3d-horizontal',
      accion: 'Usa Horizontal Size Compensation en Simplify3D',
      cuando: { slicer: 'simplify3d' },
      porque:
        'Horizontal Size Compensation (Simplify3D): -0,1 mm encoge el modelo 0,1 mm en X e Y; funciona mejor cuando el error dimensional es constante, incluso imprimiendo modelos de diferentes tamaños.',
      fuente: 'Simplify3D',
      alcance:
        'Este parámetro afecta todo el modelo. Funciona mejor cuando el error es constante independientemente del tamaño de la pieza.',
    },
    {
      id: 'usar-poliholes',
      accion: 'Usa poliholes en el CAD para agujeros críticos',
      porque:
        'Un polyhole representa el agujero como un polígono con un número reducido de lados planos, lo que fuerza al slicer a tratar cada segmento como una línea recta que se imprime de forma más fiable.',
      fuente: 'OrcaSlicer',
      alcance:
        'Los poliholes son una técnica de diseño CAD, no un parámetro del slicer. Requieren modificar el modelo antes de exportar el STL. No puede condicionarse porque es una recomendación de diseño que se aplica a cualquier material y slicer.',
    },
    {
      id: 'aumentar-segmentos',
      accion: 'Aumenta el número de segmentos en el CAD antes de exportar el STL',
      valor: '≈ 2 × diámetro agujero (mm)',
      porque:
        'Aumentar el número de segmentos en el CAD antes de exportar el STL reduce el error de aproximación poligonal. El número de lados se calcula a partir del tamaño del agujero y el diámetro de la boquilla (aproximadamente el doble del diámetro del agujero en mm con boquilla de 0,4 mm, nunca menos de 3).',
      fuente: 'Slic3r Manual, OrcaSlicer',
      alcance:
        'La fórmula aproximada es 2 × diámetro del agujero en mm para boquilla de 0,4 mm. El mínimo es 3 lados. Esto reduce el error de aproximación poligonal pero no lo elimina por completo. No puede condicionarse porque es una regla general de diseño que se aplica independientemente del material o el slicer.',
    },
    {
      id: 'calibrar-por-filamento',
      accion: 'Calibra la compensación para cada filamento',
      cuando: { material: ['abs', 'pa', 'pc'] },
      porque:
        'Cada combinación de filamento e impresora puede resultar en tolerancias diferentes; incluso con el mismo filamento y perfil, las tolerancias varían de una impresora a otra. La calibración de compensación es específica para cada filamento; debe repetirse cuando se cambia de material.',
      fuente: 'OrcaSlicer, Bambu Lab',
      alcance:
        'La calibración debe repetirse cada vez que se cambia de filamento. No hay un valor universal que sirva para todos los materiales. Esta regla se aplica a materiales con mayor contracción (ABS, PA, PC).',
    },
    {
      id: 'no-compensar-abiertos',
      accion: 'No uses XY Hole Compensation en agujeros con aberturas laterales',
      cuando: { 'tipo-agujero': 'abierto' },
      porque:
        'X-Y Hole Compensation solo aplica a caminos cerrados: si el modelo tiene aberturas en los lados que producen caminos no cerrados en una capa, la compensación no se aplica a esas capas. Si se aplica X-Y Hole Compensation a un modelo con caminos no cerrados, se produce una separación de capa notable en las ubicaciones de los agujeros.',
      fuente: 'Bambu Lab',
      alcance:
        'Los agujeros con aberturas laterales producen caminos no cerrados en algunas capas. En esos casos, solo X-Y Contour Compensation puede aplicarse.',
    },
    {
      id: 'corregir-backlash',
      accion: 'Corrige el backlash mecánicamente antes de compensar',
      cuando: { sintoma: 'ovalado' },
      porque:
        'No hay ningún hack de software que pueda compensar razonablemente una impresora mal ensamblada (backlash). El backlash produce errores dimensionales distintos en X e Y, lo que causa agujeros ovalados.',
      fuente: 'Slic3r Manual',
      alcance:
        'El backlash es un problema mecánico (generalmente correas flojas) que debe corregirse físicamente. La compensación de software no puede arreglar un problema mecánico.',
    },
    {
      id: 'medir-capas-superiores',
      accion: 'Mide solo las capas superiores de la pieza',
      valor: '20 capas superiores de 50-100',
      porque:
        'La configuración de la primera capa puede afectar las siguientes 10-20 capas de la pieza. Para minimizar el impacto de la primera capa, imprimir un modelo con 50-100 capas y medir solo las 20 superiores.',
      fuente: 'Simplify3D',
      alcance:
        'La medición debe hacerse en las capas superiores, no en la base. La primera capa y las siguientes 10-20 pueden tener dimensiones distintas debido a la configuración de la primera capa. No puede condicionarse porque es una regla general de medición que se aplica independientemente del material o el slicer.',
    },
    {
      id: 'considerar-chaflanes',
      accion: 'Considera añadir chaflanes o lead-in en los agujeros',
      cuando: { sintoma: 'no-encaja' },
      porque:
        'Falta de chaflanes o lead-in en los agujeros dificulta el encaje. Un chaflán o lead-in guía la pieza destino hacia el agujero y facilita el ensamblaje.',
      fuente: 'Bambu Lab',
      alcance:
        'Los chaflanes y lead-in son modificaciones de diseño que facilitan el encaje. No corrigen el error dimensional pero pueden hacer que el ensamblaje sea más fácil.',
    },
    {
      id: 'agujeros-pequenos',
      accion: 'Ten precaución con agujeros menores de 1 mm',
      valor: '< 1 mm',
      cuando: { 'tamano-agujero': 'pequeno' },
      porque:
        'Agujeros con diámetro cercano al tamaño de la boquilla (menores de 1 mm) son difíciles de ajustar. La compensación puede no ser suficiente para agujeros tan pequeños.',
      fuente: 'Bambu Lab',
      alcance:
        'Los agujeros menores de 1 mm son difíciles de ajustar porque están cerca del límite de resolución de la impresora. La compensación puede no ser suficiente.',
    },
    {
      id: 'costura-afecta',
      accion: 'Considera la posición de la costura (seam)',
      cuando: { sintoma: 'ovalado' },
      porque:
        'La costura (seam) puede afectar la precisión del agujero. La costura es el punto donde el slicer comienza y termina un perímetro, y puede crear una irregularidad que afecte la forma del agujero.',
      fuente: 'Bambu Lab',
      alcance:
        'La costura es un parámetro del slicer que puede afectar la precisión dimensional. No todas las fuentes coinciden en su impacto exacto.',
    },
    {
      id: 'filamento-humedo',
      accion: 'Seca el filamento si sospechas humedad',
      cuando: { sintoma: 'no-encaja' },
      porque:
        'Filamento húmedo causa extrusión inconsistente. La humedad en el filamento puede causar variaciones en el flujo que afecten las dimensiones de los agujeros.',
      fuente: 'Bambu Lab',
      alcance:
        'La humedad causa extrusión inconsistente, lo que puede afectar las dimensiones. Secar el filamento es una medida preventiva, no una solución directa al problema de dimensional.',
    },
    {
      id: 'steps-mm',
      accion: 'Verifica que los pasos por milímetro estén correctamente calibrados',
      cuando: { sintoma: 'ovalado' },
      porque:
        'Los valores de steps/mm deben ser exactos según correas, poleas y husillos; no calibrar por ensayo y error. Un error en steps/mm puede causar errores dimensionales distintos en X e Y.',
      fuente: 'Slic3r Manual',
      alcance:
        'Los steps/mm deben calibrarse según las especificaciones mecánicas de la impresora (correas, poleas, husillos). No se deben calibrar por ensayo y error.',
    },
    {
      id: 'tornillo-m6-ajuste',
      accion: 'Mide el tornillo M6 real: unos 5,9 mm',
      valor: 'M6 → ~5,9 mm',
      cuando: { sintoma: 'no-encaja' },
      porque:
        'Un tornillo M6 nominal tiene un diámetro real de ~5,9 mm por la norma ISO 6g (la rosca es ligeramente menor para facilitar el ensamblaje). Esto explica por qué un agujero de 6 mm puede no encajar con un tornillo M6.',
      fuente: 'Bambu Lab',
      alcance:
        'El diámetro real de un tornillo M6 es ~5,9 mm según la norma ISO 6g. Esto es relevante al diseñar agujeros para tornillos M6.',
    },
    {
      id: 'orca-tolerance-test',
      accion: 'Usa el modelo Orca Tolerance Test para calibrar',
      cuando: { slicer: 'orca' },
      porque:
        'El modelo "Orca Tolerance Test" tiene 6 agujeros hexagonales con tolerancias de 0,0, 0,05, 0,1, 0,2, 0,3 y 0,4 mm, además de un probador hexagonal. Este modelo permite calibrar la compensación de agujeros de forma sistemática.',
      fuente: 'OrcaSlicer',
      alcance:
        'El modelo de prueba tiene tolerancias de 0,0 a 0,4 mm. Es una herramienta de calibración específica para OrcaSlicer.',
    },
    {
      id: 'no-extrusion-multiplier',
      accion: 'No uses Extrusion Multiplier para ajustar dimensiones',
      cuando: { sintoma: 'pequeno' },
      porque:
        'El Extrusion Multiplier también afecta a las superficies sólidas, por lo que no es la solución ideal para ajustar dimensiones. Ajustar el Extrusion Multiplier afecta toda la pieza, no solo los agujeros.',
      fuente: 'Slic3r Manual',
      alcance:
        'El Extrusion Multiplier afecta toda la pieza, no solo los agujeros. No es la herramienta adecuada para ajustar dimensiones específicas.',
    },
    {
      id: 'external-perimeters-first',
      accion: 'Considera External Perimeters First para mejorar precisión',
      cuando: { slicer: ['prusa', 'orca'] },
      porque:
        'External Perimeters First previene el desplazamiento causado por el solape de extrusión; imprimir perímetros internos primero oculta mejor las costuras. Esto puede mejorar la precisión dimensional de los agujeros.',
      fuente: 'Slic3r Manual',
      alcance:
        'Este parámetro afecta el orden de impresión de los perímetros. Puede mejorar la precisión dimensional pero no es una solución directa al problema de agujeros pequeños.',
    },
    {
      id: 'precise-wall',
      accion: 'Considera Precise Wall en OrcaSlicer',
      cuando: { slicer: 'orca' },
      porque:
        'Precise Wall (OrcaSlicer): establece el solape entre la pared exterior y su pared interior adyacente en cero, mejorando la precisión dimensional sin afectar la resistencia.',
      fuente: 'OrcaSlicer',
      alcance:
        'Precise Wall elimina el solape entre paredes adyacentes. Esto mejora la precisión dimensional pero puede afectar la adhesión entre paredes.',
    },
    {
      id: 'repetir-cambio-material',
      accion: 'Repite la calibración al cambiar de material',
      cuando: { material: ['abs', 'pa', 'pc'] },
      porque:
        'La calibración de compensación es específica para cada filamento; debe repetirse cuando se cambia de material. Cada material tiene distinta contracción y propiedades de flujo.',
      fuente: 'Bambu Lab, OrcaSlicer',
      alcance:
        'La calibración debe repetirse cada vez que se cambia de filamento. No hay un valor universal que sirva para todos los materiales. Esta regla se aplica a materiales con mayor contracción (ABS, PA, PC).',
    },
  ],

  fueraDeAlcance: [
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
        'Es pie de elefante: el problema está en la primera capa, no en los agujeros. La compensación XY no lo arregla.',
      guia: 'elephant-foot',
    },
    {
      sintoma: 'La pieza sale corrida de su sitio',
      porQue:
        'Es desplazamiento de capa: la unión está intacta y el hotend no fue donde debía.',
      guia: 'capas-desplazadas',
    },
  ],

  fuentes: [
    {
      url: 'https://wiki.bambulab.com/en/software/bambu-studio/xy-hole-contour-compensation',
      quien: 'Bambu Lab',
      que: 'XY Hole Compensation y XY Contour Compensation: separación de parámetros, fórmula y limitaciones.',
    },
    {
      url: 'https://forum.prusa3d.com/forum/prusaslicer/hole-dimension-compensation/',
      quien: 'Foro Prusa',
      que: 'Dimensiones de agujeros: causas, compensación y discusiones de usuarios.',
    },
    {
      url: 'https://forum.prusa3d.com/forum/prusaslicer/hole-size-compensation/',
      quien: 'Foro Prusa',
      que: 'Tamaño de agujeros: compensación y tolerancias.',
    },
    {
      url: 'https://github.com/SoftFever/OrcaSlicer/wiki/tolerance_calib',
      quien: 'OrcaSlicer',
      que: 'Calibración de tolerancias: separación de compensación de filamento y de proceso.',
    },
    {
      url: 'https://manual.slic3r.org/troubleshooting/dimension-errors',
      quien: 'Slic3r Manual',
      que: 'Precisión dimensional: causas de errores y compensación XY.',
    },
    {
      url: 'https://github.com/SoftFever/OrcaSlicer/wiki/quality_settings_precision',
      quien: 'OrcaSlicer',
      que: 'Precisión: poliholes, compensación y parámetros de calidad.',
    },
    {
      url: 'https://www.simplify3d.com/resources/print-quality-troubleshooting/dimensional-accuracy/',
      quien: 'Simplify3D',
      que: 'Precisión dimensional: contracción, compensación y medición.',
    },
  ],

  campos: [],
  leeDelAnalisis: [],
};
