import type { Guia } from './tipos.ts';
import { AUTOR } from './autor.ts';

export const piezasGrandesGrietas: Guia = {
  slug: 'piezas-grandes-grietas',
  titulo: 'Piezas grandes y grietas',
  resumen:
    'Piezas grandes que se alabean o se agrietan: antes de subir temperaturas, confirma si es warping, separación entre capas o cracking por contracción.',
  sintoma: 'Piezas grandes que se alabean o se agrietan',
  dibujo: 'grieta',
  entrada:
    'Cuando la pieza es grande, la contracción térmica ya no es un detalle de esquina: tira de toda la base, eleva bordes enteros y puede agrietar el interior. Aquí el material, el tamaño y el aire mandan más que el filamento, y varias cosas que parecen lo mismo no lo son: warping de esquinas, separación entre capas y cracking a lo largo del eje Z. Esta guía separa los tres antes de tocar nada.',
  autor: AUTOR,
  actualizado: '2026-10-16',
  minutos: 6,
  diferencial: {
    contra: 'separación entre capas, warping de esquinas y colapso estructural',
    contraCorto: 'separación, corner o colapso',
    comprobaciones: [
      {
        id: 'forma',
        mira: 'La base de la pieza: ¿está plana o arqueada hacia arriba?',
        si: 'Arqueada hacia arriba desde la cama, con tensión visible en esquinas o bordes: es warping por contracción térmica.',
        no: 'Plana, con capas sueltas por dentro: es separación entre capas, no corner warping.',
      },
      {
        id: 'ubicacion',
        mira: '¿Dónde aparece el fallo?',
        si: 'En el borde exterior, esquina o cara larga; a veces con una línea horizontal donde la boquilla volvió a golpear la capa levantada.',
        no: 'Por dentro de la pieza, en el eje Z, o la pieza entera se tumba: no es corner warping localizado.',
      },
      {
        id: 'tipo',
        mira: '¿Se despega toda la pieza o sólo se levantan bordes?',
        si: 'Sólo bordes o esquinas: warping localizado, aunque sea grande.',
        no: 'Deslizamiento total, nido de filamento o capas desplazadas: fallo de adhesión o colapso, otra guía.',
      },
    ],
    siNo: { guia: 'separaciones-entre-capas', etiqueta: 'Separaciones entre capas' },
  },
  variables: [
    {
      id: 'material',
      etiqueta: 'Material',
      indicador: 'material',
      para: 'El ranking de riesgo de warping y las cifras de cama y cámara dependen de él; las piezas grandes en ABS, ASA, PC y PA casi siempre warpean sin enclosure.',
      necesaria: true,
      opciones: [
        { id: 'pla', etiqueta: 'PLA / PLA-CF', detalle: 'El menos propenso de los rígidos' },
        { id: 'petg', etiqueta: 'PETG', detalle: 'Propenso medio' },
        { id: 'abs', etiqueta: 'ABS o ASA', detalle: 'Casi siempre sin enclosure' },
        { id: 'pc', etiqueta: 'PC / PC-CF', detalle: 'Extremo alto del ranking' },
        { id: 'pa', etiqueta: 'PA / Nylon / PA-CF', detalle: 'Alta contracción' },
        { id: 'petg-cf', etiqueta: 'PETG-CF', detalle: 'Seguir la banda base de PETG salvo que el fabricante dé valores propios' },
      ],
    },
    {
      id: 'chapa',
      etiqueta: 'Chapa',
      indicador: 'cama',
      para: 'Decide la cifra de cama correcta; más que el fabricante.',
      necesaria: true,
      opciones: [
        { id: 'cool-plate', etiqueta: 'Cool Plate', detalle: '35-45 °C en PLA' },
        { id: 'textured', etiqueta: 'Textured PEI', detalle: '45-65 °C en PLA' },
        { id: 'smooth', etiqueta: 'Smooth PEI', detalle: '45-65 °C en PLA' },
        { id: 'engineering', etiqueta: 'Engineering Plate', detalle: 'Con pegamento' },
        { id: 'acero', etiqueta: 'Acero liso' },
      ],
    },
    {
      id: 'tamaño',
      etiqueta: 'Tamaño o forma',
      indicador: 'geometria',
      para: 'El warping aparece más en piezas grandes y el colapso en las altas y delgadas.',
      necesaria: true,
      opciones: [
        { id: 'grande', etiqueta: 'Grande y plana', detalle: 'La más propensa' },
        { id: 'mediana', etiqueta: 'Mediana' },
        { id: 'pequeña', etiqueta: 'Pequeña' },
        { id: 'alta-delgada', etiqueta: 'Alta y delgada', detalle: 'Propensa a tumba' },
      ],
    },
    {
      id: 'cama',
      etiqueta: 'Temperatura de cama ahora',
      indicador: 'cama',
      para: 'La acción depende de si estás por debajo, dentro o por encima del rango del material.',
      necesaria: true,
      opciones: [
        { id: 'baja', etiqueta: 'Baja', detalle: 'Por debajo del rango' },
        { id: 'media', etiqueta: 'Media', detalle: 'Dentro del solape' },
        { id: 'alta', etiqueta: 'Alta', detalle: 'Por encima del rango' },
      ],
    },
    {
      id: 'ambiente',
      etiqueta: 'Temperatura ambiente',
      indicador: 'entorno',
      para: 'Por debajo de 20 °C aparece warping incluso en PLA y PETG; el aire alto o con corriente también.',
      necesaria: true,
      opciones: [
        { id: 'frio', etiqueta: 'Frío (<20 °C)' },
        { id: 'templado', etiqueta: 'Templado (20-30 °C)' },
        { id: 'alto', etiqueta: 'Alto (>30 °C)' },
        { id: 'corriente', etiqueta: 'Con corriente de aire cerca' },
      ],
    },
    {
      id: 'recinto',
      etiqueta: '¿Trabajabas con el recinto cerrado?',
      indicador: 'entorno',
      para: 'Los materiales de alta temperatura lo necesitan; en PLA y PETG una cámara demasiado caliente puede ablandar el filamento.',
      opciones: [
        { id: 'abierto', etiqueta: 'Abierto o sin tapa' },
        { id: 'cerrado', etiqueta: 'Cerrado' },
      ],
    },
    {
      id: 'fan',
      etiqueta: 'Ventilador de pieza o auxiliar',
      indicador: 'ventilacion',
      para: 'Dos fuentes dicen direcciones opuestas; la cifra depende de cuál ventilador y de la geometría.',
      opciones: [
        { id: 'desconocido', etiqueta: 'No lo sé' },
        { id: 'apagado', etiqueta: 'Apagado u obstruido' },
        { id: 'bajo', etiqueta: 'Bajo' },
        { id: 'alto', etiqueta: 'Alto' },
      ],
    },
    {
      id: 'infill',
      etiqueta: 'Patrón de relleno',
      indicador: 'velocidad',
      para: 'Grid y Triangle generan tensión lineal interna; Gyroid se encoge de forma más uniforme.',
      opciones: [
        { id: 'cruzado', etiqueta: 'Grid o Triangle' },
        { id: 'gyroid', etiqueta: 'Gyroid o similar' },
        { id: 'otro', etiqueta: 'Otro patrón' },
      ],
    },
    {
      id: 'humedad',
      etiqueta: 'Humedad del filamento',
      indicador: 'entorno',
      para: 'El filamento húmedo da síntomas de burbujas y chasquidos, no de warping.',
      opciones: [
        { id: 'seco', etiqueta: 'Seco y bien guardado' },
        { id: 'humedo', etiqueta: 'Húmedo (crujidos/burbujas)' },
        { id: 'desconocido', etiqueta: 'No lo sé' },
      ],
    },
  ],
  conocimiento: [
    {
      id: 'mecanismo',
      titulo: 'Por qué se alabea una pieza grande',
      puntos: [
        'Es contracción térmica.',
        'Los bordes exteriores se enfrían antes que el centro y esa diferencia genera una tensión que tira de las esquinas hacia arriba.',
        'En una pieza grande la tensión ya no es de esquina: tira del borde entero.',
        'El estrés severo de warping puede producir grietas o fracturas visibles, sobre todo en materiales frágiles.',
      ],
      indicador: 'temperatura',
      cuerpo:
        'Es contracción térmica. Los bordes exteriores se enfrían antes que el centro y esa diferencia genera una tensión que tira de las esquinas hacia arriba. En una pieza grande la tensión ya no es de esquina: tira del borde entero. El estrés severo de warping puede producir grietas o fracturas visibles, sobre todo en materiales frágiles.',
    },
    {
      id: 'ranking',
      titulo: 'El ranking de riesgo de warping',
      puntos: [
        'Bambu ordena por riesgo de warping los materiales propensos a contraerse: PC, PA-CF, PA, ABS, ASA, PETG, PLA.',
        'Es un ranking entre esos siete, no una comparación con todos los rígidos, ni una medida de la frecuencia de las causas del warping en PLA.',
      ],
      indicador: 'material',
      cuerpo:
        'Bambu ordena por riesgo de warping los materiales propensos a contraerse: PC, PA-CF, PA, ABS, ASA, PETG, PLA. Es un ranking entre esos siete, no una comparación con todos los rígidos, ni una medida de la frecuencia de las causas del warping en PLA.',
      cifra: { valor: 'PC -> PLA', nota: 'Siete materiales; PLA el menos propenso' },
    },
    {
      id: 'grande-relleno',
      titulo: 'Piezas grandes y relleno denso',
      puntos: [
        'El warping es más común con piezas grandes y con densidad de relleno alta: Bambu pone el 60 % frente al 15 % por defecto como ejemplo.',
        'A más relleno, más tensión lineal interna.',
      ],
      indicador: 'general',
      cuerpo:
        'El warping es más común con piezas grandes y con densidad de relleno alta: Bambu pone el 60 % frente al 15 % por defecto como ejemplo. A más relleno, más tensión lineal interna.',
      cuando: { tamaño: 'grande' },
    },
    {
      id: 'enclosure-alternativa',
      titulo: 'Piezas grandes de alta temperatura sin enclosure',
      puntos: [
        'Un modelo grande y plano impreso en ABS, ASA o PC warpea casi siempre sin enclosure.',
        'Si no tienes enclosure, la alternativa respaldada es cambiar a PLA, PLA-CF, PETG o PETG-CF para piezas grandes.',
        'Para piezas grandes de ABS, PETG es mejor opción y ASA es más dependiente del entorno.',
      ],
      indicador: 'temperatura',
      cuerpo:
        'Un modelo grande y plano impreso en ABS, ASA o PC warpea casi siempre sin enclosure. Si no tienes enclosure, la alternativa respaldada es cambiar a PLA, PLA-CF, PETG o PETG-CF para piezas grandes. Para piezas grandes de ABS, PETG es mejor opción y ASA es más dependiente del entorno.',
      cuando: { material: ['abs', 'pc', 'pa'], tamaño: 'grande' },
    },
    {
      id: 'sub-20',
      titulo: 'Por debajo de 20 °C',
      puntos: [
        'Por debajo de 20 °C aparece warping incluso con PLA y PETG, que son los materiales más indulgentes.',
        'En estructura abierta conviene aumentar la temperatura de cama +10 °C para compensar y bloquear el flujo de aire.',
      ],
      indicador: 'cama',
      cuerpo:
        'Por debajo de 20 °C aparece warping incluso con PLA y PETG, que son los materiales más indulgentes. En estructura abierta conviene aumentar la temperatura de cama +10 °C para compensar y bloquear el flujo de aire.',
      cuando: { ambiente: ['frio', 'corriente'] },
    },
    {
      id: 'ambiente-estable',
      titulo: 'Ambiente estable y humedad baja',
      puntos: [
        'Prevenir warping: ambiente estable entre 20 y 25 °C con humedad baja.',
        'Es una sola fuente de fabricante, sin corroborar por otra fuente del lote; úsalo como banda orientativa, no como regla general.',
      ],
      indicador: 'temperatura',
      cuerpo:
        'Prevenir warping: ambiente estable entre 20 y 25 °C con humedad baja. Es una sola fuente de fabricante, sin corroborar por otra fuente del lote; úsalo como banda orientativa, no como regla general.',
      cuando: { ambiente: ['templado'] },
      cifra: { valor: '20-25 °C', nota: 'Una fuente, sin corroborar' },
    },
    {
      id: 'corrientes',
      titulo: 'Una corriente de aire basta',
      puntos: [
        'Una corriente de aire enfría un lado más que otro y basta una ventana abierta, un aire acondicionado o un ventilador de mesa.',
        'Por eso se recomienda bloquear el flujo de aire alrededor de la impresora y cerrar la puerta frontal y la cubierta superior en impresoras',
        'cerradas.',
      ],
      indicador: 'ventilacion',
      cuerpo:
        'Una corriente de aire enfría un lado más que otro y basta una ventana abierta, un aire acondicionado o un ventilador de mesa. Por eso se recomienda bloquear el flujo de aire alrededor de la impresora y cerrar la puerta frontal y la cubierta superior en impresoras cerradas.',
      cuando: { ambiente: 'corriente' },
    },
    {
      id: 'warping-real',
      titulo: 'Warping real: bordes que se arquean',
      puntos: [
        'Warping real: las esquinas o bordes se arquean hacia arriba y se despegan de la cama; la pieza se curva como una cáscara de plátano.',
        'La separación entre capas es distinta: el objeto se raja por capas y se identifica por cortes limpios que muestran una ligera curvatura.',
        'hacia arriba o warping.',
      ],
      indicador: 'cama',
      cuerpo:
        'Warping real: las esquinas o bordes se arquean hacia arriba y se despegan de la cama; la pieza se curva como una cáscara de plátano. La separación entre capas es distinta: el objeto se raja por capas y se identifica por cortes limpios que muestran una ligera curvatura hacia arriba o warping.',
    },
    {
      id: 'interlayer',
      titulo: 'Interlayer cracking a lo largo del eje Z',
      puntos: [
        'Cuando la adhesión entre capas es insuficiente y la contracción del material es significativa, aparecen grietas a lo largo del eje Z,.',
        'perpendiculares al plano de la capa.',
        'Es frecuente en ABS, ASA, PC, PET-CF y PA-CF.',
        'Un atasco leve de boquilla puede impedir la extrusión en una capa concreta y manifestarse igual que una grieta.',
      ],
      indicador: 'calibracion',
      cuerpo:
        'Cuando la adhesión entre capas es insuficiente y la contracción del material es significativa, aparecen grietas a lo largo del eje Z, perpendiculares al plano de la capa. Es frecuente en ABS, ASA, PC, PET-CF y PA-CF. Un atasco leve de boquilla puede impedir la extrusión en una capa concreta y manifestarse igual que una grieta.',
      cuando: { material: ['abs', 'pc', 'pa'] },
    },
    {
      id: 'mecanismo-cracking',
      titulo: 'El cracking es consecuencia del warping',
      puntos: [
        'La separación entre capas ocurre cuando las fuerzas de warping superan la resistencia de adhesión entre capas,.',
        'al enfriarse las capas a ritmos distintos.',
        'Es decir, el cracking es consecuencia del warping, no un fenómeno aparte.',
      ],
      indicador: 'calibracion',
      cuerpo:
        'La separación entre capas ocurre cuando las fuerzas de warping superan la resistencia de adhesión entre capas, al enfriarse las capas a ritmos distintos. Es decir, el cracking es consecuencia del warping, no un fenómeno aparte.',
    },
    {
      id: 'cuatro-fallos',
      titulo: 'Cuatro fallos que se confunden',
      puntos: [
        'Bambu separa cuatro tipos: corner warping (esquinas o bordes que se curvan y despegan),.',
        'fallo de adhesión a la cama (la pieza entera se desplaza o salta, por grasa, chapa equivocada o Z-offset alto),.',
        'colapso estructural (modelo alto o fino convertido en nido de pájaro o capas superiores desplazadas por vibración,.',
        'correas flojas o patrones de relleno que se cruzan) e interlayer cracking (grietas a lo largo del eje Z).',
      ],
      indicador: 'calibracion',
      cuerpo:
        'Bambu separa cuatro tipos: corner warping (esquinas o bordes que se curvan y despegan), fallo de adhesión a la cama (la pieza entera se desplaza o salta, por grasa, chapa equivocada o Z-offset alto), colapso estructural (modelo alto o fino convertido en nido de pájaro o capas superiores desplazadas por vibración, correas flojas o patrones de relleno que se cruzan) e interlayer cracking (grietas a lo largo del eje Z).',
    },
    {
      id: 'infill-patron',
      titulo: 'Relleno: Gyroid frente a líneas rectas',
      puntos: [
        'Para piezas planas grandes: cambiar el patrón de relleno a Gyroid con 25 % o menos de densidad.',
        'Grid y Triangle crean tensión lineal interna y se cruzan dentro de una misma capa levantando un resalto que la boquilla roza.',
        'el Gyroid se contrae de forma más uniforme en todas las direcciones.',
      ],
      indicador: 'temperatura',
      cuerpo:
        'Para piezas planas grandes: cambiar el patrón de relleno a Gyroid con 25 % o menos de densidad. Grid y Triangle crean tensión lineal interna y se cruzan dentro de una misma capa levantando un resalto que la boquilla roza; el Gyroid se contrae de forma más uniforme en todas las direcciones.',
      cuando: { infill: ['cruzado', 'gyroid'] },
      cifra: { valor: '≤25 %', nota: 'Gyroid, techo recomendado' },
    },
    {
      id: 'walls',
      titulo: 'Paredes frente a relleno',
      puntos: [
        'Para piezas estructurales con altos requisitos de resistencia: 5 capas de pared y alrededor del 25 % de relleno,.',
        'intentando evitar más del 50 % para reducir la tendencia de contracción.',
        'Para piezas no estructurales con bajos requisitos: 2 capas de pared y 15 % de relleno, valores por defecto. (Unica fuente del lote.',
        'verificar antes de tratarlos como universal.).',
      ],
      indicador: 'temperatura',
      cuerpo:
        'Para piezas estructurales con altos requisitos de resistencia: 5 capas de pared y alrededor del 25 % de relleno, intentando evitar más del 50 % para reducir la tendencia de contracción. Para piezas no estructurales con bajos requisitos: 2 capas de pared y 15 % de relleno, valores por defecto. (Unica fuente del lote; verificar antes de tratarlos como universal.)',
      cuando: { tamaño: ['grande', 'mediana'] },
    },
    {
      id: 'fan-contradiccion',
      titulo: 'Ventilador: dos direcciones y dos ventiladores',
      puntos: [
        'Los excesos de enfriamiento enfrían las paredes exteriores demasiado rápido y desencadenan warping.',
        'Bambu recomienda bajar el ventilador auxiliar a 40-50 % o reducirlo a 20-30 % según la página; además las 3 primeras capas sin enfriamiento.',
        'Prusa, en cambio, habla del ventilador de pieza: en ABS, apagado por completo,.',
        'pero si lo que se curva son voladizos inclinados o piezas pequeñas se puede probar a activarlo al 10-20 %.',
        'Son dos ventiladores distintos y las dos afirmaciones pueden ser ciertas según el caso.',
      ],
      indicador: 'ventilacion',
      cuerpo:
        'Los excesos de enfriamiento enfrían las paredes exteriores demasiado rápido y desencadenan warping: Bambu recomienda bajar el ventilador auxiliar a 40-50 % o reducirlo a 20-30 % según la página; además las 3 primeras capas sin enfriamiento. Prusa, en cambio, habla del ventilador de pieza: en ABS, apagado por completo, pero si lo que se curva son voladizos inclinados o piezas pequeñas se puede probar a activarlo al 10-20 %. Son dos ventiladores distintos y las dos afirmaciones pueden ser ciertas según el caso.',
      cuando: { fan: ['desconocido', 'apagado', 'bajo', 'alto'] },
    },
    {
      id: 'fan-desacuerdo-números',
      titulo: 'No hay una única cifra para el ventilador auxiliar',
      puntos: [
        'Bambu escribe dos cifras en dos páginas para el mismo ventilador auxiliar: bajarlo a 40-50 % en una y reducirlo 20-30 % en otra.',
        'El material cocinado no resuelve cuál aplicar; ambas se exponen y no se promedian.',
      ],
      indicador: 'ventilacion',
      cuerpo:
        'Bambu escribe dos cifras en dos páginas para el mismo ventilador auxiliar: bajarlo a 40-50 % en una y reducirlo 20-30 % en otra. El material cocinado no resuelve cuál aplicar; ambas se exponen y no se promedian.',
      cuando: { fan: 'alto' },
      cifra: { valor: '40-50 % o 20-30 %', nota: 'Bambu, dos páginas, sin resolver' },
    },
    {
      id: 'primeras-3',
      titulo: 'Sin ventilador en las tres primeras capas',
      puntos: [
        'Mantener apagado el enfriamiento en las primeras 3 capas mejora la adhesión y el enfriamiento lento de las capas, evitando warping.',
        'Es el ajuste que Bambu señala como uno de los más importantes para el warping.',
      ],
      indicador: 'ventilacion',
      cuerpo:
        'Mantener apagado el enfriamiento en las primeras 3 capas mejora la adhesión y el enfriamiento lento de las capas, evitando warping. Es el ajuste que Bambu señala como uno de los más importantes para el warping.',
      cifra: { valor: '0 %', nota: 'Enfriamiento en las 3 primeras capas' },
    },
    {
      id: 'placa-offset',
      titulo: 'La Textured PEI baja la boquilla 0,04 mm',
      puntos: [
        'En la placa Textured PEI, la impresora baja la boquilla 0,04 mm tras la nivelación para garantizar la adhesión de la primera capa.',
        'Si laminaste para otra placa, ese descenso no se aplica y la boquilla queda demasiado alta.',
      ],
      indicador: 'calibracion',
      cuerpo:
        'En la placa Textured PEI, la impresora baja la boquilla 0,04 mm tras la nivelación para garantizar la adhesión de la primera capa. Si laminaste para otra placa, ese descenso no se aplica y la boquilla queda demasiado alta.',
      cuando: { chapa: 'textured' },
      cifra: { valor: '0,04 mm', nota: 'Offset automático en PEI texturizada' },
    },
    {
      id: 'cama-por-material',
      titulo: 'Temperatura de cama por material',
      puntos: [
        'Bambu da PETG a 60-80 °C, ABS y ASA a 90-100 °C,.',
        'PC a 100-120 °C y PA o variantes a 90-110 °C. Para PLA da 35-45 °C en Cool Plate y 45-65 °C en Textured, Smooth y Engineering.',
        'OrcaSlicer afina ABS y ASA a 90-100 °C y PC a 100-120 °C.',
      ],
      indicador: 'slicer',
      cuerpo:
        'Bambu da PETG a 60-80 °C, ABS y ASA a 90-100 °C, PC a 100-120 °C y PA o variantes a 90-110 °C. Para PLA da 35-45 °C en Cool Plate y 45-65 °C en Textured, Smooth y Engineering. OrcaSlicer afina ABS y ASA a 90-100 °C y PC a 100-120 °C.',
      cuando: { material: ['petg', 'abs', 'pc', 'pa', 'pla'] },
    },
    {
      id: 'orcaslicer-techo',
      titulo: 'Si la cama está demasiado baja o demasiado alta',
      puntos: [
        'Si la cama está demasiado baja: fallo de adhesión, warping, unión débil o desprendimiento total.',
        'Si está demasiado alta: las capas inferiores se sobrecalientan y deforman (elephant foot).',
        'Margen típico ±5 °C; regla práctica de OrcaSlicer: usar el Tg del material y restar 5-10 °C para estimar el límite superior seguro,.',
        'aunque ninguna fuente del lote da el Tg del PLA.',
      ],
      indicador: 'calibracion',
      cuerpo:
        'Si la cama está demasiado baja: fallo de adhesión, warping, unión débil o desprendimiento total. Si está demasiado alta: las capas inferiores se sobrecalientan y deforman (elephant foot). Margen típico ±5 °C; regla práctica de OrcaSlicer: usar el Tg del material y restar 5-10 °C para estimar el límite superior seguro, aunque ninguna fuente del lote da el Tg del PLA.',
      cuando: { cama: ['baja', 'alta'] },
    },
    {
      id: 'camara-oficial',
      titulo: 'Temperatura de cámara por material',
      puntos: [
        'Cámara recomendada por Bambu: PLA, PETG, TPU y PVA a 0 °C (desactivar); ABS y ASA a 40-50 °C; PC,.',
        'PA-CF y afines a 50-60 °C. ADVERTENCIA oficial: no habilitar temperatura de cámara alta para filamentos de baja temperatura (PLA, PETG, TPU,',
        'PVA, etc.), puede ablandar el filamento y atascar el extrusor.',
        'OrcaSlicer da ABS y ASA a 50-70 °C de cámara, PC a 80-100 °C y PA a 70-100 °C; las dos cifras para ABS son oficiales y no se promedian.',
      ],
      indicador: 'slicer',
      cuerpo:
        'Cámara recomendada por Bambu: PLA, PETG, TPU y PVA a 0 °C (desactivar); ABS y ASA a 40-50 °C; PC, PA-CF y afines a 50-60 °C. ADVERTENCIA oficial: no habilitar temperatura de cámara alta para filamentos de baja temperatura (PLA, PETG, TPU, PVA, etc.), puede ablandar el filamento y atascar el extrusor. OrcaSlicer da ABS y ASA a 50-70 °C de cámara, PC a 80-100 °C y PA a 70-100 °C; las dos cifras para ABS son oficiales y no se promedian.',
      cuando: { material: ['abs', 'pc', 'pa'] },
    },
    {
      id: 'camara-x1e',
      titulo: 'X1E: cámara hasta 60 °C',
      puntos: [
        'X1E: cámara máxima de 60 °C; en filamentos de alta temperatura (PC, PA-CF, PAHT-CF, PET-CF, PPA-CF, PPS,.',
        'PPS-CF) seleccionar 60 °C mejora precisión dimensional, calidad visual, suprime el warping y da mayor adhesión entre capas.',
      ],
      indicador: 'calibracion',
      cuerpo:
        'X1E: cámara máxima de 60 °C; en filamentos de alta temperatura (PC, PA-CF, PAHT-CF, PET-CF, PPA-CF, PPS, PPS-CF) seleccionar 60 °C mejora precisión dimensional, calidad visual, suprime el warping y da mayor adhesión entre capas.',
      cuando: { material: ['pc', 'pa'] },
      cifra: { valor: '60 °C', nota: 'Máximo en X1E' },
    },
    {
      id: 'abs-fan',
      titulo: 'ABS: ventilador apagado y cámara cerrada',
      puntos: [
        'ABS es muy susceptible a la separación de capas con cualquier aire frío antes de que la pieza haya enfriado del todo.',
        'ventilador apagado por completo y cámara cerrada, incluso calentada.',
        'Si lo que se curva son voladizos inclinados o piezas pequeñas, se puede probar a habilitar el ventilador al 10-20 %,.',
        'pero demasiado ventilador puede deformar toda la pieza y reducir la adhesión entre capas.',
      ],
      indicador: 'ventilacion',
      cuerpo:
        'ABS es muy susceptible a la separación de capas con cualquier aire frío antes de que la pieza haya enfriado del todo; ventilador apagado por completo y cámara cerrada, incluso calentada. Si lo que se curva son voladizos inclinados o piezas pequeñas, se puede probar a habilitar el ventilador al 10-20 %, pero demasiado ventilador puede deformar toda la pieza y reducir la adhesión entre capas.',
      cuando: { material: 'abs' },
    },
    {
      id: 'flujo-velocidad',
      titulo: 'Flujo y velocidad: el otro lado del warping',
      puntos: [
        'Imprimir demasiado rápido puede causar warping: peor unión entre capas y enfriamiento más rápido (una sola fuente, fabricante,.',
        'sin corroborar).',
        'Para materiales de alta temperatura (PC-Blend), bajar la velocidad de impresión ayuda a que el conjunto asiente,.',
        'funda las capas entre sí y deforme menos.',
        'En interlayer cracking en ABS: aumentar la temperatura de boquilla o bajar la velocidad (pared interior 150 mm/s y exterior 100 mm/s),.',
        'reducir el ventilador de pieza (referencia.',
        'ventilador máximo del 60 % en paredes) y subir cama 5-10 °C y cámara 5 °C si hay calefacción activa.',
      ],
      indicador: 'ventilacion',
      cuerpo:
        'Imprimir demasiado rápido puede causar warping: peor unión entre capas y enfriamiento más rápido (una sola fuente, fabricante, sin corroborar). Para materiales de alta temperatura (PC-Blend), bajar la velocidad de impresión ayuda a que el conjunto asiente, funda las capas entre sí y deforme menos. En interlayer cracking en ABS: aumentar la temperatura de boquilla o bajar la velocidad (pared interior 150 mm/s y exterior 100 mm/s), reducir el ventilador de pieza (referencia: ventilador máximo del 60 % en paredes) y subir cama 5-10 °C y cámara 5 °C si hay calefacción activa.',
      cuando: { tamaño: ['grande', 'alta-delgada'] },
    },
    {
      id: 'pla-hotend',
      titulo: 'PLA con boquilla insuficiente',
      puntos: [
        'PLA con temperatura de boquilla insuficiente puede sufrir cracking y separación de capas.',
        'según la marca se imprime entre 195 y 220 °C. Si hay problemas, subir en incrementos de 5 °C hasta obtener buena adhesión de capa.',
        'Aumentar el flow rate o extrusion multiplier en incrementos del 5 % crea un vínculo más fuerte entre capas (accesible en PrusaSlicer sólo en',
        'modo Advanced o Expert).',
      ],
      indicador: 'calibracion',
      cuerpo:
        'PLA con temperatura de boquilla insuficiente puede sufrir cracking y separación de capas; según la marca se imprime entre 195 y 220 °C. Si hay problemas, subir en incrementos de 5 °C hasta obtener buena adhesión de capa. Aumentar el flow rate o extrusion multiplier en incrementos del 5 % crea un vínculo más fuerte entre capas (accesible en PrusaSlicer sólo en modo Advanced o Expert).',
      cuando: { material: 'pla' },
      cifra: { valor: '195-220 °C', nota: 'PLA según Prusa' },
    },
    {
      id: 'boquilla-interlayer',
      titulo: 'Boquilla, cama y cámara en cracking inter-capa',
      puntos: [
        'Prusa enfatiza subir la temperatura de boquilla en incrementos de 5 °C hasta conseguir adhesión de capa.',
        'Bambu además permite bajar la velocidad (pared interior 150 mm/s, exterior 100 mm/s en ABS),.',
        'subir la cama 5-10 °C y la cámara +5 °C si hay calefacción activa.',
        'Ambas son oficiales y apuntan a problemas térmicos de adhesión entre capas: una enfatiza la boquilla y el flujo, la otra la cama,.',
        'el ventilador y la cámara.',
      ],
      indicador: 'ventilacion',
      cuerpo:
        'Prusa enfatiza subir la temperatura de boquilla en incrementos de 5 °C hasta conseguir adhesión de capa. Bambu además permite bajar la velocidad (pared interior 150 mm/s, exterior 100 mm/s en ABS), subir la cama 5-10 °C y la cámara +5 °C si hay calefacción activa. Ambas son oficiales y apuntan a problemas térmicos de adhesión entre capas: una enfatiza la boquilla y el flujo, la otra la cama, el ventilador y la cámara.',
      cuando: { material: ['abs', 'pc', 'pa'] },
    },
    {
      id: 'adhesión-chapa',
      titulo: 'Tipo de chapa y limpieza',
      puntos: [
        'Seleccionar el tipo de chapa correcto según el filamento.',
        'laminar para Cool Plate (35 °C para PLA) e imprimir en Textured PEI (55-65 °C para PLA) deja la adhesión demasiado fría.',
        'la Textured PEI baja la boquilla 0,04 mm automáticamente al nivelar,.',
        'desactivando ese offset si el tipo de chapa está mal elegido en el slicer.',
        'Limpiar la chapa con agua templada y jabón, enjuagar y secar al aire; no tocar la superficie con las manos desnudas después de limpiar.',
      ],
      indicador: 'calibracion',
      cuerpo:
        'Seleccionar el tipo de chapa correcto según el filamento: laminar para Cool Plate (35 °C para PLA) e imprimir en Textured PEI (55-65 °C para PLA) deja la adhesión demasiado fría; la Textured PEI baja la boquilla 0,04 mm automáticamente al nivelar, desactivando ese offset si el tipo de chapa está mal elegido en el slicer. Limpiar la chapa con agua templada y jabón, enjuagar y secar al aire; no tocar la superficie con las manos desnudas después de limpiar.',
      cuando: { chapa: ['cool-plate', 'textured', 'smooth', 'engineering'] },
    },
    {
      id: 'brim-alcance',
      titulo: 'Brim completo o brim ears',
      puntos: [
        'Bambu recomienda un brim de 8-10 mm o brim ears pintados sólo en las esquinas que levantan.',
        'Prusa propone un brim normal para aumentar la adhesión.',
        'No se contradicen: el brim completo es la salida básica; los brim ears son la versión dirigida a esquinas concretas.',
      ],
      indicador: 'calibracion',
      cuerpo:
        'Bambu recomienda un brim de 8-10 mm o brim ears pintados sólo en las esquinas que levantan. Prusa propone un brim normal para aumentar la adhesión. No se contradicen: el brim completo es la salida básica; los brim ears son la versión dirigida a esquinas concretas.',
      cuando: { tamaño: ['grande', 'mediana'] },
      cifra: { valor: '8-10 mm', nota: 'Brim para esquinas que levantan' },
    },
    {
      id: 'glue',
      titulo: 'Adhesivos y glue stick',
      puntos: [
        'Glue stick o adhesivos (PVA delgado, hairspray, sprays especializados) como refuerzo para filamentos difíciles (ABS, ASA, PA, PC).',
        'en placas de vidrio, una capa fina de PVA.',
        'Tier 1 de Bambu: tres pasos resuelven aproximadamente el 80 % de los fallos de warping y adhesión: limpiar la placa,.',
        'ejecutar el nivelado automático completo (especialmente tras mover la impresora,.',
        'mantenimiento o firmware) y comprobar que la boquilla esté bien instalada (clips fijados).',
      ],
      indicador: 'calibracion',
      cuerpo:
        'Glue stick o adhesivos (PVA delgado, hairspray, sprays especializados) como refuerzo para filamentos difíciles (ABS, ASA, PA, PC); en placas de vidrio, una capa fina de PVA. Tier 1 de Bambu: tres pasos resuelven aproximadamente el 80 % de los fallos de warping y adhesión: limpiar la placa, ejecutar el nivelado automático completo (especialmente tras mover la impresora, mantenimiento o firmware) y comprobar que la boquilla esté bien instalada (clips fijados).',
    },
    {
      id: 'velocidad-primera',
      titulo: 'Primera capa despacio',
      puntos: [
        'Primera capa: reducir la velocidad a 40-50 mm/s y el valor ideal recomendado para buena adhesión es 20-30 mm/s.',
        'Es una sola fuente de fabricante (Creality), sin corroborar.',
      ],
      indicador: 'calibracion',
      cuerpo:
        'Primera capa: reducir la velocidad a 40-50 mm/s y el valor ideal recomendado para buena adhesión es 20-30 mm/s. Es una sola fuente de fabricante (Creality), sin corroborar.',
      cuando: { cama: ['baja', 'media'] },
      cifra: { valor: '40-50 mm/s', nota: 'Una fuente, sin corroborar' },
    },
    {
      id: 'humedad-secado',
      titulo: 'Humedad: no es warping',
      puntos: [
        'El filamento húmedo no es warping: chasquidos o superficie rugosa y con burbujas apuntan a humedad.',
        'la recomendación es secarlo y reintentar.',
        'PETG absorbe humedad y da crujidos, burbujas y stringing, reduciendo la unión entre capas.',
        'Secar antes de reintentar, según la recomendación del fabricante del filamento o del secador.',
      ],
      indicador: 'material',
      cuerpo:
        'El filamento húmedo no es warping: chasquidos o superficie rugosa y con burbujas apuntan a humedad; la recomendación es secarlo y reintentar. PETG absorbe humedad y da crujidos, burbujas y stringing, reduciendo la unión entre capas. Secar antes de reintentar, según la recomendación del fabricante del filamento o del secador.',
      cuando: { humedad: ['humedo', 'desconocido'] },
    },
    {
      id: 'post-impresion',
      titulo: 'Deformaciones leves tras imprimir',
      puntos: [
        'Post-impresión, sólo para deformaciones leves: lijar la base para aplanar o calentar suavemente con secador,.',
        'con cuidado de no fundir la pieza.',
        'Es una sola fuente de fabricante, sin corroborar.',
      ],
      indicador: 'geometria',
      cuerpo:
        'Post-impresión, sólo para deformaciones leves: lijar la base para aplanar o calentar suavemente con secador, con cuidado de no fundir la pieza. Es una sola fuente de fabricante, sin corroborar.',
      cuando: { tamaño: ['grande'] },
    },
    {
      id: 'recinto-pla',
      titulo: 'PLA y PETG con cámara demasiado caliente',
      puntos: [
        'Los materiales de alta temperatura necesitan enclosure para mantener un ambiente caliente y estable.',
        'imprimir PLA o PETG en enclosure puede ser mala idea porque necesitan mucha refrigeración de pieza,.',
        'más difícil de conseguir con ambiente caliente.',
        'Cuando la temperatura de cama es igual o mayor que la temperatura de reblandecimiento del filamento (PLA ronda los 45 °C, PETG los 70 °C),.',
        'se recomienda abrir la puerta frontal y quitar la cubierta superior: el calor acumulado en la cámara ablanda el filamento.',
      ],
      indicador: 'ventilacion',
      cuerpo:
        'Los materiales de alta temperatura necesitan enclosure para mantener un ambiente caliente y estable; imprimir PLA o PETG en enclosure puede ser mala idea porque necesitan mucha refrigeración de pieza, más difícil de conseguir con ambiente caliente. Cuando la temperatura de cama es igual o mayor que la temperatura de reblandecimiento del filamento (PLA ronda los 45 °C, PETG los 70 °C), se recomienda abrir la puerta frontal y quitar la cubierta superior: el calor acumulado en la cámara ablanda el filamento.',
      cuando: { material: ['pla', 'petg'], cama: 'alta' },
    },
    {
      id: 'recinto-alto',
      titulo: 'Cámara más caliente: ayuda y perjuicio',
      puntos: [
        'Para ABS, ASA, PC y PA, una cámara más caliente puede suprimir o reducir el warping y aumentar la adhesión entre capas,.',
        'pero a la vez reduce la eficacia del filtrado del aire en ABS y ASA.',
        'Por eso las dos cifras oficiales de cámara para ABS (40-50 °C Bambu y 50-70 °C Orca) no se resuelven promediando.',
      ],
      indicador: 'calibracion',
      cuerpo:
        'Para ABS, ASA, PC y PA, una cámara más caliente puede suprimir o reducir el warping y aumentar la adhesión entre capas, pero a la vez reduce la eficacia del filtrado del aire en ABS y ASA. Por eso las dos cifras oficiales de cámara para ABS (40-50 °C Bambu y 50-70 °C Orca) no se resuelven promediando.',
      cuando: { material: ['abs', 'pc', 'pa'] },
    },
  ],
  reglas: [
    {
      id: 'limpiar',
      accion: 'Limpia la chapa con agua templada y jabón',
      valor: 'Enjuaga y deja secar al aire',
      porque:
        'Es el primero de los tres pasos que Bambu atribuye a aproximadamente el 80 % de los fallos de warping y adhesión. Después de limpiar, no toques la superficie con las manos.',
      fuente: 'Bambu Lab',
      alcance: 'Regla general; no depende de material ni de chapa.',
    },
    {
      id: 'nivelar',
      accion: 'Nivela la cama',
      valor: 'Calibración automática completa',
      porque:
        'Segundo paso del mismo Tier 1 de Bambu, especialmente después de mover la impresora, hacer mantenimiento o cambiar de chapa.',
      fuente: 'Bambu Lab',
      alcance: 'Regla general; la nivelación va antes que cualquier cifra de temperatura.',
    },
    {
      id: 'boquilla',
      accion: 'Comprueba que la boquilla está bien instalada',
      porque: 'Los clips tienen que estar apretados en la forma correcta; una boquilla floja da fallos de adhesión que se confunden con warping.',
      fuente: 'Bambu Lab',
      alcance: 'Regla general; una boquilla floja o parcialmente obstruida puede imitar una grieta inter-capa.',
    },
    {
      id: 'secar',
      accion: 'Seca el filamento antes de reintentar',
      valor: 'Según el fabricante',
      porque:
        'El filamento húmedo no es warping; da crujidos, burbujas y stringing y reduce la unión entre capas. Secar es el primer gesto antes de tocar temperaturas.',
      cuando: { humedad: ['humedo', 'desconocido'] },
      fuente: 'Bambu Lab, Prusa Research',
      alcance: 'Sin cifra de secado respaldada más allá de PETG en este lote; usar la recomendación del fabricante del filamento o del secador.',
    },
    {
      id: 'ambiente-frio',
      accion: 'Sube la temperatura de cama +10 °C',
      valor: '+10 °C',
      porque:
        'Por debajo de 20 °C aparece warping incluso con PLA y PETG. En estructura abierta aumentar la cama +10 °C compensa el enfriamiento entre capas, además de bloquear el flujo de aire.',
      cuando: { ambiente: 'frio' },
      fuente: 'Bambu Lab',
      alcance: 'Bambu la da como ajuste directo para entorno frío, incluidas impresoras open-frame.',
    },
    {
      id: 'corriente',
      accion: 'Bloquea la corriente de aire alrededor de la impresora',
      porque:
        'Una ventana abierta, un aire acondicionado o un ventilador de mesa basta para enfriar un lado más que el otro, y esa diferencia genera la tensión que se lleva el borde.',
      cuando: { ambiente: 'corriente' },
      fuente: 'Bambu Lab',
      alcance: 'Recomendación de Bambu para cualquier montaje con corriente de aire; no depende del material.',
    },
    {
      id: 'cerrar',
      accion: 'Cierra la puerta frontal y la tapa superior',
      porque:
        'En ambiente frío, cerrar bloquea corrientes y eleva la temperatura ambiente alrededor de la impresora; protege contra el choque térmico.',
      cuando: { ambiente: 'frio', recinto: 'abierto' },
      fuente: 'Bambu Lab',
      alcance: 'Protección contra corrientes, no contra frío intenso; precaución al recalentar.',
    },
    {
      id: 'abrir',
      accion: 'Abre la puerta frontal y quita la tapa superior',
      porque:
        'Para filamentos con temperatura de reblandecimiento por debajo de 60 °C y cama por encima de 45 °C, el calor de la cámara puede reblandecer el filamento.',
      cuando: { cama: 'alta', recinto: 'cerrado', material: ['pla', 'petg'] },
      fuente: 'Bambu Lab',
      alcance: 'La fuente dice abrir la puerta frontal y/o quitar la tapa; aquí se piden las dos para ventilar la cámara con PLA/PETG y cama alta, no una sola.',
    },
    {
      id: 'ambiente-alto',
      accion: 'Abre la puerta frontal y quita la tapa superior',
      porque:
        'Con temperatura ambiente alta y cama alta, la cámara calienta demasiado PLA o PETG y dificulta el cooling que necesitan.',
      cuando: { material: ['pla', 'petg'], ambiente: 'alto', cama: 'alta' },
      fuente: 'Prusa Research',
      alcance: 'Prusa desaconseja el recinto para PLA/PETG por el cooling; Bambu no lo prohíbe, pero su guía de recinto va a materiales de alta temperatura.',
    },
    {
      id: 'abs-fan-off',
      accion: 'Apaga el ventilador de pieza por completo',
      porque:
        'ABS es muy susceptible a la separación de capas con cualquier aire frío antes de que la pieza haya enfriado del todo; ventilador apagado y cámara cerrada, incluso calentada.',
      cuando: { material: 'abs' },
      fuente: 'Prusa Research',
      alcance: 'Caso general de ABS; para voladizos inclinados o piezas pequeñas, ver la regla de probar 10-20 %.',
    },
    {
      id: 'abs-fan-prueba',
      accion: 'Prueba a activar algo de ventilador de pieza, bajo y a baja velocidad',
      valor: '10-20 %',
      porque:
        'Si lo que se curva son voladizos inclinados o piezas pequeñas, Prusa propone probar a activarlo despacio incluso en materiales que no requieren mucha refrigeración. El punto es probar despacio y comprobar, no subir a tope.',
      cuando: { material: 'abs', tamaño: ['pequeña'] },
      fuente: 'Prusa Research',
      alcance: 'Es un you may try, no una recomendación categórica; demasiado ventilador puede deformar toda la pieza.',
    },
    {
      id: 'abs-alternativa',
      accion: 'Cambia a PETG para piezas grandes de ABS',
      porque:
        'Para piezas grandes de ABS, PETG es mejor opción (no tiende a crack o deslaminar); ASA es alternativa pero más dependiente del entorno que PETG.',
      cuando: { material: 'abs', tamaño: 'grande' },
      fuente: 'Prusa Research',
      alcance: 'Solo para piezas grandes de ABS/ASA; para piezas pequeñas mantén ABS con enclosure o chamber.',
    },
    {
      id: 'camara-abs',
      accion: 'Cierra la cámara y caliéntala',
      valor: '40-50 °C (Bambu) o 50-70 °C (Orca)',
      porque:
        'ABS y ASA necesitan cámara caliente y estable para evitar warping y separación de capas.',
      cuando: { material: 'abs' },
      fuente: 'Bambu Lab, OrcaSlicer',
      alcance: 'Las dos cifras son oficiales y no se resuelven promediando; Orca añade que cámara más caliente ayuda pero empeora el filtrado del aire.',
    },
    {
      id: 'camara-pc',
      accion: 'Cierra la cámara y caliéntala',
      valor: '50-60 °C (Bambu) o 80-100 °C (Orca)',
      porque:
        'PC, PA-CF y afines necesitan chamber alto para suprimir warping y mejorar adhesión entre capas.',
      cuando: { material: 'pc' },
      fuente: 'Bambu Lab, OrcaSlicer',
      alcance: 'Cifra de Bambu para PC/PA-CF; Orca da 80-100 °C para PC; no son intercambiables.',
    },
    {
      id: 'camara-pa',
      accion: 'Cierra la cámara y caliéntala',
      valor: '70-100 °C',
      porque:
        'PA, Nylon y PA-CF necesitan chamber alto para reducir warping y mejorar adhesión entre capas.',
      cuando: { material: 'pa' },
      fuente: 'OrcaSlicer',
      alcance: 'Cámara para PA en OrcaSlicer; Bambu da 50-60 °C para PA-CF y afines.',
    },
    {
      id: 'boquilla-subir',
      accion: 'Sube la temperatura de boquilla en incrementos de 5 °C',
      valor: '+5 °C por paso',
      porque:
        'PLA con temperatura de boquilla insuficiente puede sufrir cracking y separación de capas; subir en incrementos de 5 °C hasta obtener buena adhesión de capa. Es también el enfoque de Prusa para interlayer cracking frente al de Bambu (cama y cámara).',
      cuando: { material: ['pla', 'petg', 'abs', 'pc', 'pa', 'petg-cf'] },
      fuente: 'Prusa Research',
      alcance: 'Incremento por prueba, no una cifra absoluta; el rango propio depende del filamento y del hotend.',
    },
    {
      id: 'interlayer-abs',
      accion: 'Aplica el protocolo de interlayer cracking (ABS)',
      valor: 'Cama +5-10 °C, cámara +5 °C, fan máx. 60 %, velocidad 150/100 mm/s',
      porque:
        'En interlayer cracking en ABS: aumentar la temperatura de la boquilla o bajar la velocidad (pared interior a 150 mm/s, exterior a 100 mm/s), reducir el ventilador de pieza (ventilador máximo del 60 % en paredes) y subir la cama 5-10 °C y la cámara 5 °C si hay calefacción activa.',
      cuando: { material: 'abs', tamaño: 'grande' },
      fuente: 'Bambu Lab',
      alcance: 'Protocolo de Bambu para interlayer cracking en ABS; no sustituye el enfoque de boquilla de Prusa.',
    },
    {
      id: 'fan-apagado-check',
      accion: 'Comprueba que el ventilador de pieza esté activo y sin obstrucciones',
      porque:
        'PETG y PLA necesitan mucho cooling; un ventilador apagado u obstruido reduce la adhesión entre capas y puede levantar los bordes. Verificar que no esté fundido ni bloqueado.',
      cuando: { material: ['pla', 'petg'], fan: ['desconocido', 'apagado'] },
      fuente: 'Prusa Research',
      alcance: 'Prusa: un ventilador de pieza apagado u obstruido reduce la adhesión entre capas y puede levantar bordes; verificar también limpieza.',
    },
    {
      id: 'fan-aux-bajar',
      accion: 'Baja el ventilador auxiliar',
      valor: '20-30 % (o 40-50 % según la página)',
      porque:
        'El auxiliar alto enfría las paredes exteriores demasiado rápido, lo que desencadena warping. Bambu da dos cifras en dos páginas; el material no resuelve cuál aplicar.',
      cuando: { fan: 'alto' },
      fuente: 'Bambu Lab',
      alcance: 'Dos cifras de la misma fuente en dos páginas; no se promedian.',
    },
    {
      id: 'cool-no-petg',
      accion: 'Cambia a chapa PEI y sube la cama',
      valor: '60-80 °C en PEI (PETG)',
      porque:
        'La Cool Plate no está recomendada para PETG en la tabla por placa de Bambu. Con placas PEI el rango oficial es 60-80 °C.',
      cuando: { chapa: 'cool-plate', material: 'petg' },
      fuente: 'Bambu Lab',
      alcance: 'Aplica a PETG/PETG HF/PETG Translucent; el Cool Plate tampoco es apta para piezas grandes por la contracción.',
    },
    {
      id: 'cama-petg',
      accion: 'Sube la temperatura de cama',
      valor: '60-80 °C',
      cuando: { material: 'petg', chapa: ['textured', 'smooth', 'engineering'], cama: ['baja', 'media'] },
      porque: 'Es el rango de Bambu para PETG en placas PEI.',
      fuente: "Bambu Lab, Prusa Research",
      alcance: 'Bambu 60-80 °C; Prusa/Prusament 70-90 °C (fuentes: wiki de Bambu y la guía de materiales de Prusa).',
    },
    {
      id: 'cama-abs',
      accion: 'Sube la temperatura de cama',
      valor: '90-100 °C',
      rango: { campo: 'bedTemp', min: 90, max: 100, unidad: '°C' },
      porque: 'Rango de Bambu para ABS y ASA en su tabla por filamento.',
      cuando: { material: 'abs', cama: ['baja', 'media'] },
      fuente: 'Bambu Lab',
      alcance: 'Bambu 90-100 °C para ABS y ASA; OrcaSlicer afina 90-100 °C. No aplica a PC ni PA.',
    },
    {
      id: 'cama-pc',
      accion: 'Sube la temperatura de cama',
      valor: '100-120 °C',
      rango: { campo: 'bedTemp', min: 100, max: 120, unidad: '°C' },
      porque: 'Rango de Bambu para PC en su tabla por filamento.',
      cuando: { material: 'pc', cama: ['baja', 'media'] },
      fuente: 'Bambu Lab',
      alcance: 'Bambu 100-120 °C para PC; OrcaSlicer afina 100-120 °C. No intercambiable con PA.',
    },
    {
      id: 'cama-pa',
      accion: 'Sube la temperatura de cama',
      valor: '90-110 °C',
      rango: { campo: 'bedTemp', min: 90, max: 110, unidad: '°C' },
      porque: 'Rango de Bambu para PA y variantes en su tabla por filamento.',
      cuando: { material: 'pa', cama: ['baja', 'media'] },
      fuente: 'Bambu Lab',
      alcance: 'Bambu 90-110 °C para PA/nylon y variantes; OrcaSlicer afina 90-110 °C para PA6/PA12.',
    },
    {
      id: 'cama-pla',
      accion: 'Sube la temperatura de cama',
      valor: '35-45 °C (Cool Plate) o 45-65 °C (PEI)',
      cuando: { material: 'pla', chapa: 'cool-plate', cama: ['baja', 'media'] },
      porque:
        'La tabla por chapa de Bambu da dos rangos para el PLA; el de la Cool Plate es 35-45 °C.',
      fuente: 'Bambu Lab',
      alcance: 'Ninguna fuente de este lote dice qué ocurre por salirse de rango en la Cool Plate.',
    },
    {
      id: 'textured-pla',
      accion: 'Sube la temperatura de cama',
      valor: '45-65 °C, objetivo 55-65 °C',
      rango: { campo: 'bedTemp', min: 45, max: 65, unidad: '°C' },
      porque:
        'Para PLA en Textured, Smooth o Engineering Plate el intervalo es 45-65 °C, con 55-65 °C como objetivo de diagnóstico de warping. No son el mismo número.',
      cuando: { material: 'pla', chapa: ['textured', 'smooth', 'engineering'], cama: ['baja', 'media'] },
      fuente: 'Bambu Lab',
      alcance: 'Bambu: 45-65 °C para PLA en Textured/Smooth/Engineering Plate, con 55-65 °C como objetivo de diagnóstico; no es el rango de la Cool Plate.',
    },
    {
      id: 'z-offset',
      accion: 'Baja ligeramente el Z si la primera capa flota',
      valor: 'Primer layer ligeramente aplastado',
      porque:
        'La primera capa debe quedar ligeramente aplastada, no flotando. En PETG la adhesión puede ser excesiva y dañar la chapa PEI, así que ajusta con cuidado.',
      cuando: { chapa: ['textured', 'smooth'], cama: 'baja' },
      fuente: 'Bambu Lab, Prusa Research',
      alcance: 'Prusa/Bambu: primera capa debe quedar ligeramente aplastada; en PETG el exceso de adhesión puede dañar PEI. Aplica a PEI texturizada/lisa, no es un número de Z en mm.',
    },
    {
      id: 'placa-seleccion',
      accion: 'Selecciona la placa correcta al laminar',
      porque:
        'La placa Textured PEI baja la boquilla 0,04 mm tras nivelar. Si laminaste para otra placa, ese descenso no se aplica y la boquilla queda demasiado alta.',
      cuando: { chapa: 'textured' },
      fuente: 'Bambu Lab',
      alcance: 'Bambu: Textured PEI baja la boquilla 0,04 mm tras nivelar; elegir la placa equivocada en el slicer desactiva ese descenso.',
    },
    {
      id: 'primera-capas-speed',
      accion: 'Reduce la velocidad de la primera capa',
      valor: '40-50 mm/s (o 20-30 mm/s como ideal)',
      porque:
        'Primera capa despacio mejora la adhesión y evita que las esquinas se levanten. La cifra es de una sola fuente de fabricante, sin corroborar.',
      cuando: { tamaño: 'grande', cama: ['baja', 'media'] },
      fuente: 'Creality',
      alcance: 'Cifra de Creality, sin corroborar; el valor ideal de 20-30 mm/s no es el mismo que el rango 40-50.',
    },
    {
      id: 'fan-3-capas',
      accion: 'Apaga el enfriamiento en las 3 primeras capas',
      valor: 'Sin cooling en las 3 primeras capas',
      porque:
        'Es el ajuste que Bambu señala como uno de los más importantes para el warping: sin enfriamiento en esas capas la primera capa se enfría más despacio y se pega mejor.',
      cuando: { material: ['pla', 'petg', 'abs'], cama: ['baja', 'media'] },
      fuente: 'Bambu Lab',
      alcance: 'Son las primeras capas de esta opción, no las del ventilador auxiliar; son dos ajustes distintos.',
    },
    {
      id: 'infill-gyroid',
      accion: 'Cambia el relleno a Gyroid',
      valor: '≤25 %',
      porque:
        'Grid y Triangle crean tensión lineal interna y el Gyroid se contrae por igual en todas las direcciones. Bambu lo pone como opción para modelos planos grandes con unas 25 % de densidad como techo.',
      cuando: { infill: 'cruzado', tamaño: ['grande', 'mediana'] },
      fuente: 'Bambu Lab',
      alcance: 'Que Gyroid mejora lo dicen las dos fuentes; cubic no aparece en este lote (sólo en warping-pla).',
    },
    {
      id: 'infill-limit',
      accion: 'Evita relleno por encima del 50 %',
      valor: '>50 % provoca warping',
      porque:
        'El caso típico de infill alto que provoca warping es el 60 % sobre el default del 15 %. Más relleno, más tensión lineal interna.',
      cuando: { infill: 'cruzado', tamaño: 'grande' },
      fuente: 'Bambu Lab',
      alcance: 'Es un ejemplo con número, no un umbral validado por todas las fuentes.',
    },
    {
      id: 'perimetros',
      accion: 'Aumenta primero el número de perimetros, no el relleno',
      porque:
        'La mayor parte de la resistencia proviene de la pared exterior; aumentar perímetros da resistencia sin la tensión lineal interna del relleno alto.',
      cuando: { tamaño: ['grande', 'mediana'] },
      fuente: 'Prusament PETG',
      alcance: 'Consejo de Prusament para partes duraderas; compatible con las cifras de relleno de Bambu.',
    },
    {
      id: 'brim',
      accion: 'Añade un brim o brim ears en las esquinas',
      valor: '8-10 mm',
      porque:
        'Un brim de 8 a 10 mm aumenta la superficie en contacto con la cama. Si sólo fallan dos esquinas, los brim ears dirigidos a ellas son mejor que un brim entero.',
      cuando: { tamaño: ['grande', 'mediana'] },
      fuente: 'Bambu Lab',
      alcance: 'Bambu: brim 8-10 mm o brim ears solo en esquinas que se levantan; no hace falta en piezas pequeñas ni sin warping.',
    },
    {
      id: 'brim-extra',
      accion: 'Si el brim no basta, añade una geometría pequeña en la zona problemática',
      porque:
        'Una pequeña geometría (por ejemplo un cilindro) aumenta la superficie de contacto en la esquina que levanta.',
      cuando: { tamaño: 'grande' },
      fuente: 'Prusa Research',
      alcance: 'Prusa: geometria pequeña en la esquina conflictiva cuando el brim normal no basta. Una sola fuente, sin corroborar.',
    },
    {
      id: 'velocidad',
      accion: 'Reduce la velocidad de impresión',
      valor: 'bajar poco a poco',
      porque:
        'Puede ayudar mucho en piezas grandes o altas y delgadas, haciendo que el conjunto se asiente y las capas se fundan correctamente.',
      cuando: { tamaño: ['grande', 'alta-delgada'], ambiente: ['frio', 'corriente'] },
      fuente: 'Prusa Research, Bambu Lab',
      alcance: 'Consejo general para warping térmico; sin porcentaje respaldado por fuente en este lote. El 20-30 % (Bambu) aplica a colapso mecánico y tiene su regla propia.',
    },
    {
      id: 'collapse-speed',
      accion: 'Reduce velocidad y aceleración',
      valor: '-20 a -30 %',
      porque:
        'Cuando el colapso es mecánico (modelo alto o fino), Bambu recomienda reducir velocidad y aceleración en 20-30 %, habilitar soportes y comprobar la tensión de las correas.',
      cuando: { tamaño: 'alta-delgada' },
      fuente: 'Bambu Lab',
      alcance: 'Bambu: para colapso mecánico en piezas altas y delgadas; no sirve para warping térmico.',
    },
    {
      id: 'ipa',
      accion: 'Limpia la superficie con IPA al 90 % o más',
      valor: 'IPA 90 % +',
      porque:
        'Prusa lo recomienda como rutina de limpieza primaria; es alternativa complementaria al agua y jabón, no excluyente.',
      cuando: { chapa: ['smooth', 'engineering'] },
      fuente: 'Prusa Research',
      alcance: 'Prusa: IPA 90 % + como rutina de limpieza primaria en PEI lisa; alternativa complementaria al agua y jabón, no excluyente.',
    },
    {
      id: 'glue-stick',
      accion: 'Aplica glue stick o PVA fino en la chapa',
      porque:
        'Adhesivos (PVA delgado, hairspray, sprays especializados) como refuerzo para filamentos difíciles: ABS, ASA, PA, PC.',
      cuando: { material: ['abs', 'pc', 'pa'] },
      fuente: 'Bambu Lab, Creality',
      alcance: 'Bambu/Creality: adhesivos (PVA fino, hairspray, sprays) como refuerzo para filamentos difíciles ABS, ASA, PA, PC; en placas de vidrio una capa fina de PVA.',
    },
    {
      id: 'humedad-reintentar',
      accion: 'Reintenta tras secar el filamento',
      porque:
        'Cualquier cifra de temperatura es inútil si el filamento suena a chasquido: seca y vuelve a imprimir antes de tocar la cama.',
      cuando: { humedad: 'humedo' },
      fuente: 'Bambu Lab',
      alcance: 'Sin temperatura de secado respaldada más allá de las cifras para PETG.',
    },
    {
      id: 'post-secador',
      accion: 'Deshaz la deformacion leve con lijado o calor suave',
      porque:
        'Sólo para deformaciones leves, no para grietas estructurales: lijar la base para aplanar o calentar suavemente con secador, con cuidado de no fundir la pieza.',
      cuando: { tamaño: 'grande' },
      fuente: 'Creality',
      alcance: 'Una sola fuente de fabricante, sin corroborar; no sirve para grietas profundas.',
    },
  ],
  fueraDeAlcance: [
    {
      sintoma: 'La pieza se desliza o salta de la cama',
      porQue:
        'Es fallo de adhesión global, no corner warping localizado. Tocar ajustes de warping no lo resuelve.',
      guia: 'despegue-a-mitad',
    },
    {
      sintoma: 'La pieza alta y fina se tumba o sale como nido de pájaro',
      porQue:
        'Es colapso estructural: problema mecánico o de adhesión, no contracción térmica local. Los ajustes son reducir velocidad y aceleración, comprobar correas y habilitar soportes.',
      guia: 'voladizos-y-soportes',
    },
    {
      sintoma: 'La superficie sale con burbujas, chasquidos o stringing',
      porQue:
        'Es humedad del filamento, no warping. La única instrucción respaldada es secar y reintentar.',
    },
  ],
  fuentes: [
    {
      url: 'https://wiki.bambulab.com/en/filament-acc/filament/print-quality/warping-falling-off-collapsing',
      quien: 'Bambu Lab',
      que: 'Página de warping, despegue y colapso: mecanismo, ranking, Tier 1, adhesión, infill, brim y limpieza.',
    },
    {
      url: 'https://wiki.bambulab.com/en/knowledge-sharing/printed-model-warping',
      quien: 'Bambu Lab',
      que: 'Página de warping en modelos: enfriamiento, ventilador auxiliar, ambiente e infill.',
    },
    {
      url: 'https://wiki.bambulab.com/en/filament-acc/filament/print-quality/interlayer-cracking',
      quien: 'Bambu Lab',
      que: 'Interlayer Cracking: grietas a lo largo del eje Z, boquilla, velocidad, cama, cámara y ventilador.',
    },
    {
      url: 'https://wiki.bambulab.com/en/software/bambu-studio/chamber-temperature',
      quien: 'Bambu Lab',
      que: 'Temperatura de cámara por filamento: 0/40-50/50-60 °C y advertencia para filamentos de baja temperatura.',
    },
    {
      url: 'https://www.creality.com/blog/3d-print-warping',
      quien: 'Creality',
      que: 'Blog de warping: mecanismo, signs, post-impresión y tablas de materiales (una sola fuente).',
    },
    {
      url: 'https://help.prusa3d.com/article/warping_2011',
      quien: 'Prusa Research',
      que: 'Knowledge base de warping: ventilador de pieza, recinto y voladizos.',
    },
    {
      url: 'https://help.prusa3d.com/article/layer-separation-and-splitting-fdm_1806',
      quien: 'Prusa Research',
      que: 'Separación entre capas: mecanismo, boquilla en incrementos de 5 °C y flow rate.',
    },
    {
      url: 'https://github.com/OrcaSlicer/OrcaSlicer/wiki/material_temperatures',
      quien: 'OrcaSlicer',
      que: 'Temperaturas por material y advertencias de cama alta/baja, cámara y filtrado del aire.',
    },
  ],
};
