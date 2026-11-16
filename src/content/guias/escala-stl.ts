import type { Guia } from './tipos';
import { AUTOR } from './autor.ts';

export const escalaStl: Guia = {
  slug: 'escala-stl',
  titulo: 'Escala y tamaño de archivos STL',
  resumen: 'Interpreta las medidas de un STL y comprueba su tamaño frente al espacio disponible en la impresora.',
  entrada: 'Un STL no indica las unidades de sus coordenadas: antes de cambiar su escala, busca una medida de referencia del diseño. Esta guía compara medidas y explica límites del espacio disponible, pero no se ha verificado un recorrido completo en una versión actual de un laminador. Que el modelo quepa no garantiza que las piezas encajen entre sí.',
  autor: AUTOR,
  actualizado: '2026-11-16',
  sintoma: 'El STL aparece con un tamaño inesperado o no cabe',
  dibujo: 'slicer',
  minutos: 6,
  diferencial: {
    contra: 'tamaño del modelo frente a encaje de piezas impresas',
    contraCorto: 'problemas de encaje',
    comprobaciones: [
      // evidencia: A-001, A-007
      {
        id: 'referencia',
        mira: '¿La medida mostrada del modelo difiere de una medida conocida del diseño?',
        si: 'Compara las unidades y la medida de referencia antes de cambiar la escala.',
        no: 'Una medida coincidente no demuestra por sí sola que una pieza impresa encaje con otra.',
      },
      // evidencia: A-013, A-014
      {
        id: 'espacio',
        mira: '¿El modelo queda fuera del espacio disponible mostrado para el perfil y sus ajustes?',
        si: 'Revisa el tamaño del modelo y las limitaciones de ese perfil.',
        no: 'Que aparezca dentro del espacio no determina el ajuste entre piezas impresas.',
      },
    ],
    siNo: { guia: 'tolerancias-y-encaje', etiqueta: 'Tolerancias y encaje' },
  },
  variables: [
    // evidencia: A-001, A-003, A-004
    {
      id: 'unidad',
      etiqueta: 'Unidad de la medida de referencia',
      para: 'Expresar la referencia en la misma unidad que la medición, sin deducir la unidad de las coordenadas.',
      indicador: 'geometria',
      opciones: [
        { id: 'pulgadas', etiqueta: 'Conozco la medida en pulgadas' },
        { id: 'mm', etiqueta: 'Conozco la medida en milímetros' },
        { id: 'desconocida', etiqueta: 'No conozco una medida de referencia' },
      ],
    },
    // evidencia: A-004, A-007, A-011, A-013, A-017, A-018, A-019
    {
      id: 'programa',
      etiqueta: 'Programa y versión',
      para: 'Mostrar las capacidades documentadas para el programa y, cuando se conoce, la versión indicada.',
      indicador: 'slicer',
      opciones: [
        { id: 'prusa23', etiqueta: 'PrusaSlicer 2.3.0-alpha1' },
        { id: 'prusa26', etiqueta: 'PrusaSlicer 2.6.0-alpha2' },
        { id: 'simplify', etiqueta: 'Simplify3D' },
        { id: 'cura', etiqueta: 'Cura con perfil UltiMaker o MakerBot' },
        { id: 'orca', etiqueta: 'OrcaSlicer (documentación sin versión)' },
        { id: 'otro', etiqueta: 'Otro programa o versión' },
      ],
    },
    // evidencia: A-001, A-003, A-004, A-018, A-019, A-020, I-003, I-004
    {
      id: 'comparacion',
      etiqueta: 'Estado de conversión y comparación',
      para: 'Separar una conversión pendiente de una comparación hecha después del último cambio del modelo; actualiza esta respuesta después de convertir o escalar.',
      indicador: 'geometria',
      opciones: [
        { id: 'imperial-pendiente', etiqueta: 'Tengo evidencia de coordenadas en pulgadas y aún no he convertido el STL' },
        { id: 'volver-a-medir', etiqueta: 'He convertido o cambiado la escala y aún no he vuelto a medir' },
        { id: 'coincide', etiqueta: 'Sin conversión pendiente: la medición tras el último cambio coincide con la referencia' },
        { id: 'difiere-escalar', etiqueta: 'Sin conversión pendiente: la medición tras el último cambio difiere y quiero escalar uniformemente' },
        { id: 'sin-decision', etiqueta: 'No tengo conversión pendiente ni decisión de escala' },
      ],
    },
    // evidencia: A-009, A-010, A-015, I-002
    {
      id: 'cambio',
      etiqueta: 'Cambio que planteas',
      para: 'Advertir de las comprobaciones particulares al reducir o cortar.',
      indicador: 'geometria',
      opciones: [
        { id: 'reducir', etiqueta: 'Reducir el modelo uniformemente' },
        { id: 'cortar', etiqueta: 'Cortar el modelo' },
        { id: 'ninguno', etiqueta: 'Ninguno de los anteriores' },
      ],
    },
  ],
  conocimiento: [
    // evidencia: A-001, A-002, I-003
    {
      id: 'unidades',
      titulo: 'El STL no declara unidades',
      indicador: 'geometria',
      cuerpo: 'El STL guarda geometría de malla sin unidades de medida. Una referencia expresada en pulgadas no demuestra que las coordenadas del STL se pretendieran en pulgadas. El 3MF admite unidades, aunque no todos los programas tienen por qué conservarlas o interpretarlas igual.',
      puntos: ['El STL guarda geometría de malla sin unidades de medida.', 'Una referencia expresada en pulgadas no demuestra que las coordenadas del STL se pretendieran en pulgadas.', 'El 3MF admite unidades, aunque no todos los programas tienen por qué conservarlas o interpretarlas igual.'],
      cita: { texto: 'without measurement units or color information', fuente: 'Shapr3D, comparación de STL y 3MF' },
    },
    // evidencia: A-003
    {
      id: 'equivalencia',
      titulo: 'Una equivalencia de longitud',
      indicador: 'geometria',
      cuerpo: 'Una pulgada equivale exactamente a 25,4 mm. La equivalencia convierte una longitud conocida, pero no revela la unidad pretendida de un STL.',
      puntos: ['Una pulgada equivale exactamente a 25,4 mm.', 'La equivalencia convierte una longitud conocida, pero no revela la unidad pretendida de un STL.'],
      cifra: { valor: '1 pulgada = 25,4 mm', nota: 'Equivalencia exacta de longitud, no de volumen.' },
      cita: { texto: 'exactly equivalent to 25.4 mm', fuente: 'NIST, unidades de longitud' },
    },
    // evidencia: A-006
    {
      id: 'oferta',
      titulo: 'Una oferta no identifica unidades',
      indicador: 'slicer',
      cuerpo: 'PrusaSlicer 2.3.0-alpha1 ofrecía convertir un modelo muy pequeño de pulgadas a milímetros. Esa oferta histórica no prueba la unidad pretendida ni obliga a convertir.',
      puntos: ['PrusaSlicer 2.3.0-alpha1 ofrecía convertir un modelo muy pequeño de pulgadas a milímetros.', 'Esa oferta histórica no prueba la unidad pretendida ni obliga a convertir.'],
      cuando: { programa: 'prusa23' },
      cita: { texto: 'a conversion from inches to millimeters is newly offered', fuente: 'PrusaSlicer 2.3.0-alpha1' },
    },
    // evidencia: A-007, A-008
    {
      id: 'medicion-prusa',
      titulo: 'Límites de la medición en la alfa',
      indicador: 'slicer',
      cuerpo: 'PrusaSlicer 2.6.0-alpha2 mide dentro de objetos, no entre objetos separados. En esa alfa no detecta aristas de intersección y no funciona bien con volúmenes negativos.',
      puntos: ['PrusaSlicer 2.6.0-alpha2 mide dentro de objetos, no entre objetos separados.', 'En esa alfa no detecta aristas de intersección y no funciona bien con volúmenes negativos.'],
      cuando: { programa: 'prusa26' },
      cita: { texto: 'edges created by the intersections are not detected', fuente: 'PrusaSlicer 2.6.0-alpha2' },
    },
    // evidencia: A-017, A-018, A-019, A-020, I-003, I-004
    {
      id: 'orca-capacidades',
      titulo: 'Medición y escala en OrcaSlicer',
      indicador: 'slicer',
      cuerpo: 'La documentación de OrcaSlicer describe importar STL, medir distancias y cambiar el tamaño mediante porcentaje o una medida en milímetros. La escala uniforme conserva las proporciones. La documentación no identifica versión ni demuestra una secuencia completa para seleccionar y comparar una medida interna.',
      puntos: ['La documentación de OrcaSlicer describe importar STL, medir distancias y cambiar el tamaño mediante porcentaje o una medida en milímetros.', 'La escala uniforme conserva las proporciones.', 'La documentación no identifica versión ni demuestra una secuencia completa para seleccionar y comparar una medida interna.'],
      cuando: { programa: 'orca' },
      cita: { texto: "Uniform Scale: Maintain the model's proportions while scaling.", fuente: 'OrcaSlicer, manipulación de objetos' },
    },
    // evidencia: A-013, A-014
    {
      id: 'espacio-cura',
      titulo: 'Volumen nominal y espacio disponible',
      indicador: 'maquina',
      cuerpo: 'En Cura con perfiles UltiMaker y MakerBot, el volumen de construcción y las dimensiones máximas de la pieza pueden diferir. Los desplazamientos de boquillas, estructuras auxiliares o extrusores activos pueden limitar el espacio según modelo y ajustes.',
      puntos: ['En Cura con perfiles UltiMaker y MakerBot, el volumen de construcción y las dimensiones máximas de la pieza pueden diferir.', 'Los desplazamientos de boquillas, estructuras auxiliares o extrusores activos pueden limitar el espacio según modelo y ajustes.'],
      cuando: { programa: 'cura' },
      cita: { texto: 'a difference between the available build volume and the maximum part dimensions', fuente: 'UltiMaker, volumen de construcción en Cura' },
    },
    // evidencia: A-015, I-002
    {
      id: 'paredes',
      titulo: 'Las paredes también se reducen',
      indicador: 'geometria',
      cuerpo: 'Al reducir uniformemente, el espesor se multiplica por el mismo factor que las demás longitudes. Simplify3D describe un posible hueco para una pared de 1,0 mm y ancho de extrusión de 0,4 mm; no establece un mínimo universal.',
      puntos: ['Al reducir uniformemente, el espesor se multiplica por el mismo factor que las demás longitudes.', 'Simplify3D describe un posible hueco para una pared de 1,0 mm y ancho de extrusión de 0,4 mm; no establece un mínimo universal.'],
      cuando: { cambio: 'reducir' },
      cifra: { valor: '1,0 mm / 0,4 mm', nota: 'Ejemplo de pared y ancho de extrusión de Simplify3D, sin versión indicada; no es un umbral general.' },
      cita: { texto: 'a 1.0mm thick wall with a 0.4mm extrusion width', fuente: 'Simplify3D, huecos en paredes delgadas' },
    },
  ],
  reglas: [
    // evidencia: A-001, A-003
    {
      id: 'buscar-referencia',
      accion: 'Busca una medida de referencia del diseño',
      indicador: 'medir',
      porque: 'El STL no guarda unidades y el tamaño aparente no identifica la intención del autor.',
      fuente: 'Shapr3D, comparación de STL y 3MF',
      alcance: 'Sin una medida de referencia no puedes comparar esa dimensión; podría existir otra evidencia independiente sobre las unidades pretendidas de las coordenadas.',
      cuando: { unidad: 'desconocida' },
    },
    // evidencia: A-003, I-001
    {
      id: 'pulgadas-a-mm',
      accion: 'Convierte la referencia a milímetros si la comparación lo requiere',
      indicador: 'cambiar',
      valor: 'Multiplica por 25,4',
      porque: 'Una pulgada equivale exactamente a 25,4 mm; compara después con la medida mostrada.',
      fuente: 'NIST, unidades de longitud',
      alcance: 'Sólo convierte la representación de la referencia, no las coordenadas del STL; no identifica su unidad ni indica escalar.',
      cuando: { unidad: 'pulgadas' },
    },
    // evidencia: A-003, I-001
    {
      id: 'mm-a-pulgadas',
      accion: 'Convierte a pulgadas si necesitas comparar en esa unidad',
      indicador: 'cambiar',
      valor: 'Divide por 25,4',
      porque: 'Una pulgada equivale exactamente a 25,4 mm; la conversión expresa la misma longitud.',
      fuente: 'NIST, unidades de longitud',
      alcance: 'Sólo para una longitud conocida en milímetros; no identifica las unidades originales del STL.',
      cuando: { unidad: 'mm' },
    },
    // evidencia: A-003, A-018, I-003
    {
      id: 'comparar-referencia',
      accion: 'Compara la misma dimensión en la misma unidad',
      indicador: 'medir',
      porque: 'La comparación puede mostrar coincidencia o discrepancia, pero ninguna de las dos identifica por sí sola la unidad original.',
      fuente: 'NIST, unidades de longitud; OrcaSlicer, herramienta de medición',
      alcance: 'Inferencia: mide la dimensión correspondiente y expresa referencia y medida en la misma unidad; tras convertir o cambiar la escala vuelve a medir y actualizar el estado. No es una secuencia de controles comprobada.',
      cuando: { unidad: ['pulgadas', 'mm'], comparacion: ['volver-a-medir', 'coincide', 'difiere-escalar', 'sin-decision'] },
    },
    // evidencia: A-001, A-003, I-003
    {
      id: 'coincide',
      accion: 'Mantén la escala por esa medida',
      porque: 'La misma dimensión coincide con la referencia; esa coincidencia no prueba la unidad original ni el encaje físico.',
      fuente: 'Shapr3D, comparación de STL y 3MF; NIST, unidades de longitud',
      alcance: 'Inferencia para esa dimensión en la misma unidad; no garantiza otras medidas ni la impresión.',
      cuando: { unidad: ['pulgadas', 'mm'], comparacion: 'coincide' },
    },
    // evidencia: A-019, A-020, I-004
    {
      id: 'factor-uniforme',
      accion: 'Calcula el factor de escala uniforme',
      indicador: 'ajustar',
      valor: 'Medida deseada / medida actual; porcentaje = factor × 100',
      porque: 'Si la medida actual es positiva y ambas corresponden a la misma dimensión y unidad, el cociente da el factor geométrico uniforme.',
      fuente: 'OrcaSlicer, manipulación de objetos',
      alcance: 'Inferencia condicional, no diagnóstico ni procedimiento probado: usa una medición nueva tras cualquier conversión, no acumules su factor de conversión y actualiza el estado tras escalar. No garantiza encaje.',
      cuando: { unidad: ['pulgadas', 'mm'], comparacion: 'difiere-escalar' },
    },
    // evidencia: A-001, I-003, I-004
    {
      id: 'sin-decision',
      accion: 'Evita convertir o escalar por la discrepancia sola',
      porque: 'Una diferencia no demuestra que la causa sea una conversión de unidades.',
      fuente: 'Shapr3D, comparación de STL y 3MF; NIST, unidades de longitud',
      alcance: 'Inferencia para una comparación pendiente o discrepante; busca evidencia adicional antes de decidir.',
      cuando: { unidad: ['pulgadas', 'mm'], comparacion: 'sin-decision' },
    },
    // evidencia: A-004, A-005
    {
      id: 'importar-prusa',
      accion: 'Usa la importación imperial para coordenadas acreditadas en pulgadas',
      indicador: 'ajustar',
      porque: 'La alfa histórica convierte el STL de pulgadas a milímetros al importarlo y permite revertir una conversión aplicada por error.',
      fuente: 'PrusaSlicer 2.3.0-alpha1, soporte de unidades imperiales',
      alcance: 'Sólo si hay evidencia independiente de coordenadas en pulgadas y aún no se han convertido: File → Import → Import STL (Imperial Units) en esa alfa. Después selecciona «He convertido o cambiado la escala y aún no he vuelto a medir»; vuelve a medir antes de comparar o calcular. Una referencia en pulgadas no basta.',
      cuando: { programa: 'prusa23', comparacion: 'imperial-pendiente' },
    },
    // evidencia: A-003, A-004, A-018, I-003, I-004
    {
      id: 'medir-de-nuevo',
      accion: 'Vuelve a medir después del cambio',
      porque: 'Una medición anterior a la conversión o al escalado ya no describe el tamaño actual del modelo.',
      fuente: 'PrusaSlicer 2.3.0-alpha1; OrcaSlicer, herramienta de medición',
      alcance: 'Inferencia: actualiza el estado de comparación con la nueva medida; sin referencia, búscala antes de decidir una escala. No es una secuencia de interfaz comprobada.',
      cuando: { comparacion: 'volver-a-medir' },
    },
    // evidencia: A-007, A-008
    {
      id: 'medir-prusa',
      accion: 'Mide la longitud de referencia en el modelo',
      porque: 'La herramienta de medición de la alfa permite comprobar tamaños y escalar uniformemente a una longitud.',
      fuente: 'PrusaSlicer 2.6.0-alpha2, herramienta de medición',
      alcance: 'Sólo esa alfa histórica; sus límites incluyen intersecciones, volúmenes negativos y objetos separados.',
      cuando: { programa: 'prusa26' },
    },
    // evidencia: A-011
    {
      id: 'medir-simplify',
      accion: 'Revisa el tamaño en el panel del modelo',
      indicador: 'medir',
      porque: 'La documentación de Simplify3D describe introducir un tamaño exacto en milímetros y desmarcar la escala uniforme para estirar un eje.',
      fuente: 'Simplify3D, panel de ajustes del modelo',
      alcance: 'Versión no indicada: haz doble clic en el modelo o su nombre; cambiar un eje sin escala uniforme altera las proporciones.',
      cuando: { programa: 'simplify' },
    },
    // evidencia: A-017, A-018, A-019, A-020
    {
      id: 'medir-orca',
      accion: 'Mide la distancia correspondiente en el modelo',
      porque: 'OrcaSlicer documenta medición entre puntos, aristas o caras y escala por porcentaje o tamaño en milímetros.',
      fuente: 'OrcaSlicer, preparación y manipulación de objetos',
      alcance: 'Documentación sin versión ni secuencia completa de selección o de aplicación del cálculo a una medida interna; no se atribuye a una versión actual identificada.',
      cuando: { programa: 'orca' },
    },
    // evidencia: A-013, A-014
    {
      id: 'comprobar-espacio',
      accion: 'Comprueba el espacio disponible con tu perfil y ajustes',
      indicador: 'medir',
      porque: 'El volumen nominal puede diferir de las dimensiones máximas de pieza cuando intervienen zonas o estructuras auxiliares.',
      fuente: 'UltiMaker, volumen de construcción en Cura',
      alcance: 'Documentado para perfiles UltiMaker y MakerBot en Cura; no establece márgenes universales.',
      cuando: { programa: 'cura' },
    },
    // evidencia: A-015, I-002
    {
      id: 'revisar-paredes',
      accion: 'Comprueba el espesor y la vista de laminado',
      indicador: 'medir',
      porque: 'Al reducir uniformemente también se reducen las paredes; una combinación concreta de espesor y ancho de extrusión puede dejar un hueco.',
      fuente: 'Simplify3D, huecos en paredes delgadas',
      alcance: 'La comprobación tras reducir es una inferencia; el ejemplo de la fuente no establece un límite universal.',
      cuando: { cambio: 'reducir' },
    },
    // evidencia: A-009, A-010
    {
      id: 'corte',
      accion: 'Mantén la correspondencia de las partes cortadas',
      porque: 'En la alfa histórica, la vinculación impide escalar una parte sin la otra, aunque se puede romper.',
      fuente: 'PrusaSlicer 2.6.0-alpha2, actualización de corte',
      alcance: 'Sólo para las partes vinculadas en esa alfa; cortar no garantiza que quepan o encajen.',
      cuando: { programa: 'prusa26', cambio: 'cortar' },
    },
  ],
  fueraDeAlcance: [
    { sintoma: 'Las piezas impresas no encajan', porQue: 'Esta guía trata el tamaño del modelo, no determina holguras ni tolerancias de impresión.', guia: 'tolerancias-y-encaje' },
    { sintoma: 'Unidad original desconocida', porQue: 'El STL no declara unidades y no hay procedimiento documentado aquí para recuperar la intención del autor sin referencia.' },
    { sintoma: 'Volumen de material', porQue: 'Las fuentes disponibles no definen cómo compararlo con las medidas del archivo.' },
    { sintoma: 'Girar o cortar para que quepa', porQue: 'Los controles documentados no garantizan que una orientación o división permita imprimir o unir las partes.' },
    { sintoma: 'Recorrido completo comprobado en un laminador actual', porQue: 'No se ha verificado la secuencia completa de medición, comparación, escala y comprobación del espacio. Las páginas de OrcaSlicer y Simplify3D tampoco indican versión.' },
  ],
  fuentes: [
    // evidencia: A-001, A-002
    { url: 'https://support.shapr3d.com/hc/en-us/articles/7874502103068-Working-with-3MF-files-in-Shapr3D', quien: 'Shapr3D', que: 'Comparación de STL y 3MF; versión no indicada.' },
    // evidencia: A-003
    { url: 'https://www.nist.gov/pml/owm/si-units-length', quien: 'NIST', que: 'Equivalencia exacta de la pulgada y el milímetro.' },
    // evidencia: A-004, A-005, A-006
    { url: 'https://github.com/prusa3d/PrusaSlicer/releases/tag/version_2.3.0-alpha1', quien: 'Prusa Research', que: 'Notas de PrusaSlicer 2.3.0-alpha1, alfa histórica.' },
    // evidencia: A-007, A-008, A-009, A-010
    { url: 'https://github.com/prusa3d/PrusaSlicer/releases/tag/version_2.6.0-alpha2', quien: 'Prusa Research', que: 'Medición y corte en PrusaSlicer 2.6.0-alpha2, alfa histórica.' },
    // evidencia: A-011
    { url: 'https://www.simplify3d.com/resources/videos/using-the-model-settings-panel/', quien: 'Simplify3D', que: 'Panel de ajustes del modelo; versión no indicada.' },
    // evidencia: A-013, A-014
    { url: 'https://support.ultimaker.com/s/article/1667337565436', quien: 'UltiMaker', que: 'Volumen de construcción en Cura y perfiles UltiMaker y MakerBot; versión no indicada.' },
    // evidencia: A-015
    { url: 'https://www.simplify3d.com/resources/print-quality-troubleshooting/gaps-in-thin-walls/', quien: 'Simplify3D', que: 'Ejemplo de huecos en paredes delgadas; versión no indicada.' },
    // evidencia: A-017, A-018
    { url: 'https://github.com/OrcaSlicer/OrcaSlicer/wiki/prepare_basic', quien: 'OrcaSlicer', que: 'Importación y medición; documentación sin fecha ni versión indicadas.' },
    // evidencia: A-019, A-020
    { url: 'https://github.com/OrcaSlicer/OrcaSlicer/wiki/prepare_object_manipulation', quien: 'OrcaSlicer', que: 'Escala por porcentaje, tamaño y escala uniforme; documentación sin fecha ni versión indicadas.' },
  ],
};
