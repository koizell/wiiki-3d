import type { Guia } from './tipos.ts';
import { AUTOR } from './autor.ts';

export const orientacionResistencia: Guia = {
  slug: 'orientacion-resistencia',
  titulo: 'Orientación y resistencia',
  resumen: 'Cómo cambia la resistencia de una pieza impresa según su orientación, y cómo mejorar la adhesión entre capas para que el eje Z no sea el eslabón débil.',
  sintoma: 'Resistencia distinta según el eje o pieza que se rompe en una dirección',
  dibujo: 'capas',
  entrada:
    'Una pieza impresa en FDM no es isótropa: resiste distinto según el eje porque la adhesión entre capas es el punto débil. Esta guía separa el problema de orientación y resistencia del de separación entre capas, y dice qué cambiar para que el eje Z deje de ser el eslabón débil: orientación, temperatura, ancho de extrusión, altura de capa, ventilador y cama.',
  autor: AUTOR,
  actualizado: '2026-10-17',
  minutos: 5,
  campos: [],
  diferencial: {
    contra: 'separación entre capas',
    contraCorto: 'separación entre capas',
    comprobaciones: [
      {
        id: 'rotura',
        mira: '¿La pieza se rompe al cargarla en una dirección concreta, o se abren capas visibles?',
        si: 'Se rompe en una dirección concreta sin que se vean capas abiertas: es anisotropía por orientación, no separación.',
        no: 'Se abren capas visibles o la base arquea: es separación entre capas o warping, no un problema de orientación.',
      },
      {
        id: 'eje',
        mira: '¿El fallo aparece sólo cuando la carga va perpendicular a las capas (eje Z)?',
        si: 'Sí, la pieza es fuerte en el plano XY y débil en Z: es el eslabón débil de la adhesión entre capas.',
        no: 'Se rompe por igual en todas las direcciones: no es anisotropía, es material, geometría o defecto de impresión.',
      },
      {
        id: 'orientacion',
        mira: '¿Orientaste la pieza pensando en minimizar soportes y no en la carga?',
        si: 'Sí, la orientación salió del slicer por soportes: la resistencia puede estar perjudicada aunque la pieza imprima bien.',
        no: 'Ya orientaste pensando en la carga: el problema está en los parámetros de adhesión entre capas.',
      },
    ],
    siNo: { guia: 'separaciones-entre-capas', etiqueta: 'Separaciones entre capas' },
  },
  variables: [
    {
      id: 'material',
      etiqueta: 'Material',
      indicador: 'material',
      para: 'Los materiales propensos a grietas intercapa y las cifras de temperatura dependen de él; el ABS necesita más temperatura que el PLA para adherir bien.',
      necesaria: true,
      opciones: [
        { id: 'pla', etiqueta: 'PLA' },
        { id: 'petg', etiqueta: 'PETG' },
        { id: 'abs', etiqueta: 'ABS o ASA', detalle: 'Propenso a grietas intercapa' },
        { id: 'pc', etiqueta: 'PC', detalle: 'Propenso a grietas intercapa' },
        { id: 'pa', etiqueta: 'PA / Nylon', detalle: 'Semicristalino, estrés adicional' },
        { id: 'pet-cf', etiqueta: 'PET-CF', detalle: 'Propenso a grietas intercapa' },
        { id: 'pa-cf', etiqueta: 'PA-CF', detalle: 'Propenso a grietas intercapa' },
      ],
    },
    {
      id: 'carga',
      etiqueta: 'Eje de carga principal',
      indicador: 'general',
      para: 'Decide si la orientación actual expone el eje Z (el débil) a la carga principal.',
      necesaria: true,
      opciones: [
        { id: 'z', etiqueta: 'Perpendicular a las capas (Z)', detalle: 'El eje débil soporta la carga' },
        { id: 'xy', etiqueta: 'En el plano de las capas (XY)', detalle: 'La carga va a lo largo de las capas' },
        { id: 'no-se', etiqueta: 'No lo sé', detalle: 'No está claro qué eje carga' },
      ],
    },
    {
      id: 'orientacionSlicer',
      etiqueta: 'Cómo se orientó la pieza',
      indicador: 'slicer',
      para: 'Auto Orientation optimiza soportes, no resistencia; saberlo decide si hay que revisar la orientación sugerida.',
      opciones: [
        { id: 'auto', etiqueta: 'Auto Orientation', detalle: 'El slicer eligió la orientación' },
        { id: 'manual', etiqueta: 'Manual', detalle: 'Orientación elegida a mano' },
        { id: 'no-se', etiqueta: 'No lo sé', detalle: 'No recuerdo cómo se orientó' },
      ],
    },
    {
      id: 'boquilla',
      etiqueta: 'Diámetro de boquilla',
      indicador: 'temperatura',
      para: 'Pone el techo de la altura de capa admisible para que las capas se adhieran bien.',
      opciones: [
        { id: '04', etiqueta: '0,4 mm', detalle: 'Boquilla estándar' },
        { id: '06', etiqueta: '0,6 mm', detalle: 'Boquilla grande' },
        { id: '08', etiqueta: '0,8 mm', detalle: 'Boquilla extragrande' },
      ],
    },
    {
      id: 'altura',
      etiqueta: 'Altura de capa',
      indicador: 'altura',
      para: 'Por encima del 80 % del diámetro de boquilla aumenta el riesgo de mala adhesión entre capas.',
      opciones: [
        { id: 'ok', etiqueta: 'Dentro del rango (≤80 %)', detalle: 'Adhesión correcta' },
        { id: 'alta', etiqueta: 'Por encima del 80 %', detalle: 'Riesgo de mala adhesión' },
      ],
    },
    {
      id: 'ancho',
      etiqueta: 'Ancho de extrusión',
      indicador: 'geometria',
      para: 'Un mayor ancho aumenta la superficie de contacto y el entrelazado entre capas.',
      opciones: [
        { id: 'estandar', etiqueta: 'Estándar', detalle: 'Ancho por defecto' },
        { id: 'aumentado', etiqueta: 'Aumentado', detalle: 'Más superficie de contacto' },
      ],
    },
    {
      id: 'ventilador',
      etiqueta: 'Ventilador de capa',
      indicador: 'ventilacion',
      para: 'Enfriar demasiado rápido reduce la adhesión entre capas.',
      opciones: [
        { id: 'alto', etiqueta: 'Alto', detalle: 'Enfría rápido' },
        { id: 'bajo', etiqueta: 'Bajo', detalle: 'Enfría despacio' },
        { id: 'apagado', etiqueta: 'Apagado', detalle: 'Sin enfriamiento forzado' },
      ],
    },
    {
      id: 'tempBoquilla',
      etiqueta: 'Temperatura de boquilla',
      indicador: 'temperatura',
      para: 'Más tiempo por encima de Tg permite más entrelazado de cadenas poliméricas.',
      opciones: [
        { id: 'baja', etiqueta: 'Baja', detalle: 'Poca adhesión' },
        { id: 'ok', etiqueta: 'Adecuada', detalle: 'Adhesión correcta' },
        { id: 'alta', etiqueta: 'Alta', detalle: 'Máxima adhesión' },
      ],
    },
    {
      id: 'tempCama',
      etiqueta: 'Temperatura de cama',
      indicador: 'temperatura',
      para: 'Subir la cama 5-10 °C ayuda a la adhesión entre capas en grietas intercapa.',
      opciones: [
        { id: 'baja', etiqueta: 'Baja', detalle: 'Por debajo del rango' },
        { id: 'media', etiqueta: 'Media', detalle: 'Dentro del rango' },
        { id: 'alta', etiqueta: 'Alta', detalle: 'Por encima del rango' },
      ],
    },
    {
      id: 'camara',
      etiqueta: 'Calefacción de cámara',
      indicador: 'maquina',
      para: 'Si el equipo tiene calefacción activa de cámara, subir la cámara 5 °C ayuda a la adhesión.',
      opciones: [
        { id: 'sin', etiqueta: 'Sin calefacción activa', detalle: 'Cámara pasiva' },
        { id: 'con', etiqueta: 'Con calefacción activa', detalle: 'Se puede subir 5 °C' },
      ],
    },
  ],
  conocimiento: [
    {
      id: 'anisotropia',
      titulo: 'La resistencia depende de la orientación',
      puntos: [
        'Las características de resistencia de la pieza impresa pueden variar con la orientación debido a la adhesión entre capas.',
        'Cambiar la orientación cambia qué eje soporta la carga, y el eje Z depende de esa adhesión.',
      ],
      indicador: 'calibracion',
      cuerpo:
        'Las características de resistencia de la pieza impresa pueden variar con la orientación debido a la adhesión entre capas. Cambiar la orientación cambia qué eje soporta la carga, y el eje Z depende de esa adhesión.',
      cita: { texto: 'Las características de resistencia de la pieza impresa pueden variar con la orientación debido a la adhesión entre capas.', fuente: 'OrcaSlicer Wiki - Auto Orientation' },
    },
    {
      id: 'eslabon-debil',
      titulo: 'El eje Z como eslabón débil',
      cuando: { carga: 'z' },
      puntos: [
        'Las fuentes dicen que la resistencia varía con la orientación por la adhesión entre capas (OrcaSlicer).',
        'Y que las grietas se manifiestan a lo largo del eje Z (Bambu).',
        'La etiqueta "eslabón débil" es nuestra síntesis del concepto, no una cita literal.',
      ],
      indicador: 'calibracion',
      cuerpo:
        'Las fuentes dicen que la resistencia varía con la orientación por la adhesión entre capas (OrcaSlicer) y que las grietas se manifiestan a lo largo del eje Z (Bambu). La etiqueta «eslabón débil» es nuestra síntesis del concepto, no una cita literal.',
      cita: { texto: 'Las grietas intercapa aparecen cuando la adhesión entre capas es insuficiente y la contracción del material es significativa; se manifiestan a lo largo del eje Z.', fuente: 'Bambu Lab Wiki - Interlayer Cracking' },
    },
    {
      id: 'materiales-propensos',
      titulo: 'Materiales propensos a grietas intercapa',
      cuando: { material: ['abs', 'pc', 'pet-cf', 'pa-cf'] },
      puntos: [
        'Los materiales en los que las grietas intercapa son comunes: ABS, ASA, PC, PET-CF y PA-CF.',
        'En estos, la adhesión entre capas es el punto crítico y la orientación pesa más.',
      ],
      indicador: 'calibracion',
      cuerpo:
        'Los materiales en los que las grietas intercapa son comunes: ABS, ASA, PC, PET-CF y PA-CF. En estos, la adhesión entre capas es el punto crítico y la orientación pesa más.',
      cita: { texto: 'Los materiales en los que las grietas intercapa son comunes: ABS, ASA, PC, PET-CF y PA-CF.', fuente: 'Bambu Lab Wiki - Interlayer Cracking' },
    },
    {
      id: 'nylon-cristalizacion',
      titulo: 'Nylon: estrés adicional por cristalización',
      cuando: { material: 'pa' },
      puntos: [
        'Los polímeros semicristalinos (Nylon) tienen un estrés adicional por cristalización; pueden warpear incluso con la cama a 45 °C.',
        'El Nylon es el caso donde la adhesión entre capas sufre por partida doble.',
      ],
      indicador: 'calibracion',
      cuerpo:
        'Los polímeros semicristalinos (Nylon) tienen un estrés adicional por cristalización; pueden warpear incluso con la cama a 45 °C. El Nylon es el caso donde la adhesión entre capas sufre por partida doble.',
      cifra: { valor: '45 °C', nota: 'Nylon puede warpear incluso con la cama a esta temperatura' },
      cita: { texto: 'Los polímeros semicristalinos (Nylon) tienen un estrés adicional por cristalización; pueden warpear incluso con la cama a 45 °C.', fuente: 'Polymaker Wiki - Warping' },
    },
    {
      id: 'adhesion-mecanismo',
      titulo: 'Adhesión entre capas: entrelazado de cadenas',
      puntos: [
        'La adhesión entre capas se basa en el entrelazado de cadenas poliméricas cuando ambas capas están por encima de Tg.',
        'Por eso la temperatura de extrusión y la de cámara son la palanca principal.',
      ],
      indicador: 'calibracion',
      cuerpo:
        'La adhesión entre capas se basa en el entrelazado de cadenas poliméricas cuando ambas capas están por encima de Tg. Por eso la temperatura de extrusión y la de cámara son la palanca principal.',
      cita: { texto: 'La adhesión entre capas se basa en el entrelazado de cadenas poliméricas cuando ambas capas están por encima de Tg.', fuente: 'Polymaker Wiki - Warping' },
    },
    {
      id: 'tiempo-tg',
      titulo: 'Más tiempo por encima de Tg',
      cuando: { tempBoquilla: 'baja' },
      puntos: [
        'Aumentar el tiempo por encima de Tg mejora la adhesión: subir la temperatura de extrusión, subir la temperatura de cámara.',
        'Reducir el enfriamiento. Es la vía principal para reforzar el eje Z.',
      ],
      indicador: 'calibracion',
      cuerpo:
        'Aumentar el tiempo por encima de Tg mejora la adhesión: subir la temperatura de extrusión, subir la temperatura de cámara, reducir el enfriamiento. Es la vía principal para reforzar el eje Z.',
      cita: { texto: 'Aumentar el tiempo por encima de Tg: subir la temperatura de extrusión, subir la temperatura de cámara, reducir el enfriamiento.', fuente: 'Polymaker Wiki - Warping' },
    },
    {
      id: 'superficie-contacto',
      titulo: 'Mayor superficie de contacto entre capas',
      cuando: { ancho: 'estandar' },
      puntos: [
        'Aumentar la superficie de contacto entre capas aumentando el ancho de extrusión mejora la adhesión.',
        'Es complementario a la altura de capa: ésta reduce el aplastamiento, éste aumenta el entrelazado.',
      ],
      indicador: 'calibracion',
      cuerpo:
        'Aumentar la superficie de contacto entre capas aumentando el ancho de extrusión mejora la adhesión. Es complementario a la altura de capa: ésta reduce el aplastamiento, éste aumenta el entrelazado.',
      cita: { texto: 'Aumentar la superficie de contacto entre capas aumentando el ancho de extrusión.', fuente: 'Polymaker Wiki - Warping' },
    },
    {
      id: 'reducir-tension',
      titulo: 'Reducir la creación de tensión',
      cuando: { tempBoquilla: 'baja' },
      puntos: [
        'Reducir la creación de tensión: aumentar el tamaño de boquilla, reducir la tasa de extrusión, aumentar la temperatura de impresión.',
        'Recubrir la superficie interna de la boquilla.',
        'Son medidas de proceso, no de material.',
      ],
      indicador: 'temperatura',
      cuerpo:
        'Reducir la creación de tensión: aumentar el tamaño de boquilla, reducir la tasa de extrusión, aumentar la temperatura de impresión, recubrir la superficie interna de la boquilla. Son medidas de proceso, no de material.',
      cita: { texto: 'Reducir la creación de tensión: aumentar el tamaño de boquilla, reducir la tasa de extrusión, aumentar la temperatura de impresión, recubrir la superficie interna de la boquilla.', fuente: 'Polymaker Wiki - Warping' },
    },
    {
      id: 'altura-capas',
      titulo: 'Altura de capa y adhesión',
      cuando: { altura: 'alta' },
      puntos: [
        'La altura de capa debe ser un 20 % menor que el diámetro de boquilla; con boquilla de 0,4 mm no pasar de 0,32 mm.',
        'O las capas no se adhieren bien. Por encima del 80 % del diámetro aumenta el riesgo de mala adhesión.',
      ],
      indicador: 'calibracion',
      cuerpo:
        'La altura de capa debe ser un 20 % menor que el diámetro de boquilla; con boquilla de 0,4 mm no pasar de 0,32 mm, o las capas no se adhieren bien. Por encima del 80 % del diámetro aumenta el riesgo de mala adhesión.',
      cifra: { valor: '0,32 mm', nota: 'Máximo con boquilla de 0,4 mm (80 % del diámetro)' },
      cita: { texto: 'La altura de capa debe ser un 20 % menor que el diámetro de boquilla; con boquilla de 0,4 mm no pasar de 0,32 mm, o las capas no se adhieren bien.', fuente: 'Simplify3D - Layer Separation' },
    },
    {
      id: 'plastico-caliente',
      titulo: 'El plástico caliente adhiere mejor',
      puntos: [
        'El plástico caliente adhiere mejor que el frío.',
        'Es el mecanismo que explica por qué subir la temperatura de boquilla y reducir el enfriamiento refuerzan el eje Z.',
      ],
      indicador: 'temperatura',
      cuerpo:
        'El plástico caliente adhiere mejor que el frío. Es el mecanismo que explica por qué subir la temperatura de boquilla y reducir el enfriamiento refuerzan el eje Z.',
      cita: { texto: 'El plástico caliente adhiere mejor que el frío.', fuente: 'Simplify3D - Layer Separation' },
    },
    {
      id: 'abs-temp',
      titulo: 'ABS: temperatura para buena adhesión intercapa',
      cuando: { material: 'abs' },
      puntos: [
        'ABS típicamente necesita 220-235 °C para una buena adhesión entre capas.',
        'Es una cifra de Simplify3D, no un rango Bambu; úsala como banda orientativa.',
      ],
      indicador: 'calibracion',
      cuerpo:
        'ABS típicamente necesita 220-235 °C para una buena adhesión entre capas. Es una cifra de Simplify3D, no un rango Bambu; úsala como banda orientativa.',
      cifra: { valor: '220-235 °C', nota: 'ABS, Simplify3D, adhesión intercapa' },
      cita: { texto: 'ABS típicamente necesita 220-235 °C para una buena adhesión entre capas.', fuente: 'Simplify3D - Layer Separation' },
    },
    {
      id: 'auto-orient-objetivo',
      titulo: 'Auto Orientation optimiza soportes, no resistencia',
      cuando: { orientacionSlicer: 'auto' },
      puntos: [
        'Auto Orientation selecciona la orientación de menor "unprintability" (voladizos, soportes, contacto con cama, contorno).',
        'La misma página advierte que las características de resistencia varían con la orientación por la adhesión entre capas.',
        'Son objetivos distintos: la orientación que minimiza soportes no es necesariamente la que maximiza la resistencia.',
        'Porque cambiar la orientación cambia qué eje soporta la carga. (Inferencia nuestra; el cocinado marca que ninguna fuente lo afirma.).',
      ],
      indicador: 'calibracion',
      cuerpo:
        'Auto Orientation selecciona la orientación de menor «unprintability» (voladizos, soportes, contacto con cama, contorno). La misma página advierte que las características de resistencia varían con la orientación por la adhesión entre capas. Son objetivos distintos: la orientación que minimiza soportes no es necesariamente la que maximiza la resistencia, porque cambiar la orientación cambia qué eje soporta la carga. (Inferencia nuestra; el cocinado marca que ninguna fuente lo afirma.)',
      cita: { texto: 'Las características de resistencia de la pieza impresa pueden variar con la orientación debido a la adhesión entre capas.', fuente: 'OrcaSlicer Wiki - Auto Orientation' },
    },
    {
      id: 'auto-orient-limite',
      titulo: 'Auto Orientation puede fallar en modelos complejos',
      cuando: { orientacionSlicer: 'auto' },
      puntos: [
        'Auto Orientation analiza la geometría del mesh (normales y áreas de caras).',
        'Genera orientaciones candidatas, evalúa cada una por área de voladizo, contacto inferior, interfaz de soporte y complejidad de contorno.',
        'Y selecciona la de menor puntuación de "unprintability".',
        'Puede no encontrar la mejor orientación en modelos complejos; siempre revisar la orientación sugerida.',
      ],
      indicador: 'geometria',
      cuerpo:
        'Auto Orientation analiza la geometría del mesh (normales y áreas de caras), genera orientaciones candidatas, evalúa cada una por área de voladizo, contacto inferior, interfaz de soporte y complejidad de contorno, y selecciona la de menor puntuación de «unprintability». Puede no encontrar la mejor orientación en modelos complejos; siempre revisar la orientación sugerida.',
      cita: { texto: 'Auto Orientation puede no encontrar la mejor orientación en modelos complejos; siempre revisar la orientación sugerida.', fuente: 'OrcaSlicer Wiki - Auto Orientation' },
    },
    {
      id: 'lay-on-face',
      titulo: 'Lay on Face: orientación rápida',
      puntos: [
        'Lay on Face permite orientar rápidamente una pieza seleccionando una cara para que quede plana sobre la cama.',
        'La fuente sólo dice que es la forma rápida de orientar para imprimir; no menciona resistencia ni anisotropía.',
        'Úsalo como primer paso, no como decisión de resistencia.',
      ],
      indicador: 'cama',
      cuerpo:
        'Lay on Face permite orientar rápidamente una pieza seleccionando una cara para que quede plana sobre la cama. La fuente sólo dice que es la forma rápida de orientar para imprimir; no menciona resistencia ni anisotropía. Úsalo como primer paso, no como decisión de resistencia.',
      cita: { texto: 'Lay on Face permite orientar rápidamente una pieza seleccionando una cara para que quede plana sobre la cama.', fuente: 'OrcaSlicer Wiki - Object Manipulation' },
    },
    {
      id: 'bambu-protocolo',
      titulo: 'Protocolo Bambu para grietas intercapa',
      cuando: { material: ['abs', 'pc', 'pet-cf', 'pa-cf'] },
      puntos: [
        'Desatascar la boquilla (cold pull). Aumentar la temperatura de boquilla o reducir la velocidad de impresión.',
        'Para dar más tiempo al filamento para adherirse a la capa inferior.',
        'Con ABS: velocidad de pared interior 150 mm/s y exterior 100 mm/s.',
        'Reducir la velocidad del ventilador de capa.',
        'Subir la temperatura de cama 5-10 °C; si el equipo tiene calefacción activa de cámara, subir la cámara 5 °C.',
      ],
      indicador: 'ventilacion',
      cuerpo:
        'Desatascar la boquilla (cold pull). Aumentar la temperatura de boquilla o reducir la velocidad de impresión, para dar más tiempo al filamento para adherirse a la capa inferior. Con ABS: velocidad de pared interior 150 mm/s y exterior 100 mm/s. Reducir la velocidad del ventilador de capa. Subir la temperatura de cama 5-10 °C; si el equipo tiene calefacción activa de cámara, subir la cámara 5 °C.',
      cita: { texto: 'Aumentar la temperatura de boquilla o reducir la velocidad de impresión, para dar más tiempo al filamento para adherirse a la capa inferior. Con ABS: velocidad de pared interior 150 mm/s y exterior 100 mm/s.', fuente: 'Bambu Lab Wiki - Interlayer Cracking' },
    },
    {
      id: 'ensayos-mecanicos',
      titulo: 'Cómo se mide la resistencia',
      puntos: [
        'Tres ensayos mecánicos principales: tracción (tensile), impacto Charpy y flexión en tres puntos.',
        'El ensayo de tracción somete la probeta a tensión hasta la rotura.',
        'El Charpy mide la energía de impacto (kJ/m²) necesaria para fracturar la probeta.',
        'La flexión en tres puntos mide la resistencia a la deformación bajo carga gradual.',
        'Sirven para comparar orientaciones y materiales, no para predecir el fallo de una pieza concreta. (Última frase.',
        'Inferencia nuestra, no respaldada por el raw.).',
      ],
      indicador: 'material',
      cuerpo:
        'Tres ensayos mecánicos principales: tracción (tensile), impacto Charpy y flexión en tres puntos. El ensayo de tracción somete la probeta a tensión hasta la rotura; el Charpy mide la energía de impacto (kJ/m²) necesaria para fracturar la probeta; la flexión en tres puntos mide la resistencia a la deformación bajo carga gradual. Sirven para comparar orientaciones y materiales, no para predecir el fallo de una pieza concreta. (Última frase: inferencia nuestra, no respaldada por el raw.)',
      cita: { texto: 'Tres ensayos mecánicos principales: tracción (tensile), impacto Charpy y flexión en tres puntos.', fuente: 'Polymaker Wiki - Strength Testing' },
    },
  ],
  reglas: [
    {
      id: 'orienta-carga',
      accion: 'Orienta la pieza para que la carga vaya en el plano de las capas (XY)',
      porque:
        'La resistencia varía con la orientación por la adhesión entre capas; poner la carga en XY evita que el eje Z (el débil) sea el que la soporta.',
      cuando: { carga: 'z' },
      fuente: 'OrcaSlicer Wiki - Auto Orientation',
      alcance: 'Aplica cuando la carga principal es perpendicular a las capas; la decisión final es del usuario, la fuente no da una orientación universal.',
    },
    {
      id: 'revisa-auto',
      accion: 'Revisa la orientación sugerida por Auto Orientation',
      porque:
        'Auto Orientation optimiza voladizos, soportes, contacto con cama y contorno, no resistencia; en modelos complejos puede no encontrar la mejor orientación.',
      cuando: { orientacionSlicer: 'auto' },
      fuente: 'OrcaSlicer Wiki - Auto Orientation',
      alcance: 'La fuente advierte revisar siempre la orientación sugerida; no afirma que la sugerida sea la de máxima resistencia.',
    },
    {
      id: 'sube-temp',
      accion: 'Sube la temperatura de boquilla',
      valor: 'Incrementos pequeños',
      porque:
        'Más tiempo por encima de Tg permite más entrelazado de cadenas poliméricas y mejor adhesión entre capas.',
      cuando: { tempBoquilla: 'baja' },
      fuente: 'Polymaker Wiki - Warping',
      alcance: 'Polymaker no da número. Simplify3D habla de 10 °C para el mismo síntoma; no mezclar las cifras sin atribuirlas.',
    },
    {
      id: 'sube-temp-abs',
      accion: 'Sube la temperatura de boquilla a la banda del ABS',
      valor: '220-235 °C',
      porque:
        'ABS típicamente necesita 220-235 °C para una buena adhesión entre capas.',
      cuando: { material: 'abs', tempBoquilla: 'baja' },
      fuente: 'Simplify3D - Layer Separation',
      alcance: 'Cifra de Simplify3D para ABS; no es un rango Bambu ni OrcaSlicer.',
    },
    {
      id: 'aumenta-ancho',
      accion: 'Aumenta el ancho de extrusión',
      porque:
        'Un mayor ancho aumenta la superficie de contacto y el entrelazado entre capas, mejorando la adhesión.',
      cuando: { ancho: 'estandar' },
      fuente: 'Polymaker Wiki - Warping',
      alcance: 'La fuente lo propone como vía para aumentar la superficie de contacto; no da un valor concreto de ancho.',
    },
    {
      id: 'aumenta-boquilla',
      accion: 'Usa una boquilla de mayor diámetro',
      valor: 'boquilla de mayor diámetro',
      porque:
        'Aumentar el tamaño de boquilla reduce la creación de tensión y mejora la adhesión entre capas.',
      cuando: { tempBoquilla: 'baja' },
      fuente: 'Polymaker Wiki - Warping',
      alcance: 'La fuente lo lista como vía para reducir la tensión; no da un diámetro mínimo obligatorio.',
    },
    {
      id: 'reduce-ventilador',
      accion: 'Reduce la velocidad del ventilador de capa',
      porque:
        'Enfriar demasiado rápido reduce el tiempo por encima de Tg y debilita la adhesión entre capas.',
      cuando: { ventilador: 'alto' },
      fuente: 'Bambu Lab Wiki - Interlayer Cracking',
      alcance: 'Bambu lo lista como medida para grietas intercapa; no da una cifra única de ventilador.',
    },
    {
      id: 'sube-cama',
      accion: 'Sube la temperatura de cama',
      valor: '5-10 °C',
      porque:
        'Subir la cama 5-10 °C ayuda a la adhesión entre capas en grietas intercapa.',
      cuando: { tempCama: 'baja' },
      fuente: 'Bambu Lab Wiki - Interlayer Cracking',
      alcance: 'Bambu: subir la cama 5-10 °C para grietas intercapa; no es un rango de cama por material.',
    },
    {
      id: 'sube-camara',
      accion: 'Sube la temperatura de cámara',
      valor: '+5 °C',
      porque:
        'Si el equipo tiene calefacción activa de cámara, subir la cámara 5 °C ayuda a la adhesión entre capas.',
      cuando: { camara: 'con' },
      fuente: 'Bambu Lab Wiki - Interlayer Cracking',
      alcance: 'Bambu: sólo si hay calefacción activa de cámara; no aplica a cámaras pasivas.',
    },
    {
      id: 'reduce-altura-04',
      accion: 'Reduce la altura de capa',
      valor: '0,32 mm',
      porque:
        'Con boquilla de 0,4 mm, por encima de 0,32 mm (el 80 % del diámetro) aumenta el riesgo de mala adhesión entre capas.',
      cuando: { boquilla: '04', altura: 'alta' },
      fuente: 'Simplify3D - Layer Separation',
      alcance: 'Límite para boquilla de 0,4 mm; el 80 % del diámetro es el techo general.',
    },
    {
      id: 'reduce-altura-06',
      accion: 'Reduce la altura de capa',
      valor: '0,48 mm',
      porque:
        'Con boquilla de 0,6 mm, por encima de 0,48 mm (el 80 % del diámetro) aumenta el riesgo de mala adhesión entre capas.',
      cuando: { boquilla: '06', altura: 'alta' },
      fuente: 'Simplify3D - Layer Separation',
      alcance: 'Límite para boquilla de 0,6 mm; el 80 % del diámetro es el techo general.',
    },
    {
      id: 'reduce-altura-08',
      accion: 'Reduce la altura de capa',
      valor: '0,64 mm',
      porque:
        'Con boquilla de 0,8 mm, por encima de 0,64 mm (el 80 % del diámetro) aumenta el riesgo de mala adhesión entre capas.',
      cuando: { boquilla: '08', altura: 'alta' },
      fuente: 'Simplify3D - Layer Separation',
      alcance: 'Límite para boquilla de 0,8 mm; el 80 % del diámetro es el techo general.',
    },
    {
      id: 'cold-pull',
      accion: 'Desatasca la boquilla (cold pull)',
      porque:
        'Un atasco leve puede impedir la extrusión en una capa concreta y manifestarse como grieta intercapa.',
      cuando: { material: ['abs', 'pc', 'pet-cf', 'pa-cf'], tempBoquilla: 'baja' },
      fuente: 'Bambu Lab Wiki - Interlayer Cracking',
      alcance: 'Bambu lo lista como primera medida para grietas intercapa; no sustituye el resto del protocolo.',
    },
    {
      id: 'reduce-velocidad',
      accion: 'Reduce la velocidad de impresión',
      porque:
        'Dar más tiempo al filamento para adherirse a la capa inferior mejora la adhesión entre capas.',
      cuando: { tempBoquilla: 'baja' },
      fuente: 'Bambu Lab Wiki - Interlayer Cracking',
      alcance: 'Bambu: con ABS, pared interior 150 mm/s y exterior 100 mm/s; la fuente no da cifras para otros materiales.',
    },
    {
      id: 'reduce-velocidad-abs',
      accion: 'Reduce la velocidad de pared',
      valor: '150/100 mm/s',
      porque:
        'Con ABS, Bambu da velocidad de pared interior 150 mm/s y exterior 100 mm/s para dar más tiempo a la adhesión.',
      cuando: { material: 'abs', tempBoquilla: 'baja' },
      fuente: 'Bambu Lab Wiki - Interlayer Cracking',
      alcance: 'Cifra de Bambu para ABS; no la extrapolamos a otros materiales.',
    },
  ],
  fueraDeAlcance: [
    {
      sintoma: 'Las capas se sueltan por dentro',
      porQue: 'Es separación entre capas: la adhesión falla de forma localizada. Esta guía cubre la resistencia por orientación y la adhesión general, no la delaminación puntual.',
      guia: 'separaciones-entre-capas',
    },
    {
      sintoma: 'Las esquinas se levantan de la cama',
      porQue: 'Es warping por contracción térmica, no un problema de resistencia por orientación.',
      guia: 'warping-pla',
    },
    {
      sintoma: 'Piezas grandes que se alabean o se agrietan',
      porQue: 'El cracking por contracción en piezas grandes tiene su propio diagnóstico y protocolo.',
      guia: 'piezas-grandes-grietas',
    },
  ],
  fuentes: [
    {
      url: 'https://wiki.polymaker.com/printing-tips/material-science/strength-testing.md',
      quien: 'Polymaker Wiki - Strength Testing',
      que: 'Definiciones de los ensayos mecánicos: tracción, Charpy y flexión en tres puntos.',
    },
    {
      url: 'https://www.simplify3d.com/resources/print-quality-troubleshooting/layer-separation-and-splitting/',
      quien: 'Simplify3D - Layer Separation',
      que: 'Altura de capa, temperatura de ABS para adhesión intercapa y plástico caliente.',
    },
    {
      url: 'https://wiki.polymaker.com/printing-tips/material-science/warping.md',
      quien: 'Polymaker Wiki - Warping',
      que: 'Adhesión entre capas, entrelazado por encima de Tg, superficie de contacto y reducción de tensión.',
    },
    {
      url: 'https://github.com/OrcaSlicer/OrcaSlicer/wiki/prepare_auto_orient',
      quien: 'OrcaSlicer Wiki - Auto Orientation',
      que: 'Auto Orientation: algoritmo y aviso sobre variación de resistencia con orientación.',
    },
    {
      url: 'https://wiki.bambulab.com/en/filament-acc/filament/print-quality/interlayer-cracking',
      quien: 'Bambu Lab Wiki - Interlayer Cracking',
      que: 'Grietas intercapa: materiales propensos, boquilla, velocidad, ventilador, cama y cámara.',
    },
    {
      url: 'https://github.com/OrcaSlicer/OrcaSlicer/wiki/prepare_object_manipulation',
      quien: 'OrcaSlicer Wiki - Object Manipulation',
      que: 'Lay on Face: orientación rápida seleccionando una cara.',
    },
  ],
};