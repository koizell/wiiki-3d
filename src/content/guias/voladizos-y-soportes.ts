import type { Guia } from './tipos';

/**
 * Voladizos y soportes.
 *
 * La séptima guía, y la que mejor justifica el formato de cálculo: **tres fallos
 * que se ven parecidos y no se arreglan igual**. Un voladizo que se descuelga, unos
 * soportes que se rompen y una cara apoyada rugosa comparten síntoma visual —algo
 * cuelga o sale mal— pero tienen causas distintas y remedios opuestos.
 *
 * ## El aviso del cocinero que este fichero tiene que respetar
 *
 * El material cocinado separa con claridad tres conceptos que se confunden:
 * - **Voladizo**: parte del modelo que se extiende hacia fuera sin material debajo.
 * - **Overhang angle**: el ángulo entre la superficie inclinada y la cama caliente.
 * - **Overhang threshold**: en Bambu es la proporción de ancho de extrusión sin
 *   soporte; en PrusaSlicer es el límite angular. **No son el mismo parámetro** a
 *   pesar del nombre idéntico.
 *
 * Y el cocinero advierte que las temperaturas y velocidades de refrigeración son
 * para **optimizar voladizos que ya pasan el umbral**, no para definir el umbral.
 *
 * ## Qué hace esta guía con eso
 *
 * - El diferencial separa los tres fallos antes de tocar nada.
 * - Las variables preguntan por el ángulo y por si usas soportes.
 * - Las tarjetas publican el ángulo de referencia **con su condición** (boquilla,
 *   refrigeración, material) y la distinción entre ángulo y umbral.
 * - Las reglas calculan acciones según lo declarado.
 */
export const voladizosSoportes: Guia = {
  slug: 'voladizos-y-soportes',
  titulo: 'Voladizos y soportes',
  resumen:
    'Un voladizo que se descuelga, unos soportes que se rompen y una cara apoyada rugosa se ven parecidos pero no se arreglan igual. Aprende a distinguirlos y a decidir si necesitas soportes o con refrigeración y orientación es suficiente.',
  sintoma: 'Un voladizo cuelga, los soportes fallan o la cara apoyada sale rugosa',
  dibujo: 'voladizo',
  entrada: 'Un voladizo que cuelga, unos soportes que no salen o una cara apoyada rugosa son tres problemas que se confunden. Aquí se distinguen por dónde está el fallo y qué ángulo tiene el saliente.',
  minutos: 4,

  /*
   * El diferencial: tres fallos que se confunden.
   *
   * Las tres comprobaciones salen del material cocinado y las tres tienen respaldo.
   * La primera separa el voladizo que cuelga del soporte que falla. La segunda
   * separa el problema de refrigeración del problema de geometría. La tercera
   * separa la cara apoyada rugosa de los otros dos.
   */
  diferencial: {
    contra: 'el warping, que se ve parecido y no se arregla igual',
    contraCorto: 'warping',
    comprobaciones: [
      {
        id: 'que-falla',
        mira: '¿Qué es exactamente lo que falla?',
        si: 'El voladizo se descuelga o los soportes se rompen. Es un problema de voladizos o soportes.',
        no: 'La cara que apoyaba sobre soportes sale rugosa pero los soportes no fallan. Es un problema de calidad de superficie.',
      },
      {
        id: 'cuando-falla',
        mira: '¿Cuándo aparece el problema?',
        si: 'El voladizo se descuelga durante la impresión, o los soportes se rompen a media impresión. Es un fallo estructural.',
        no: 'La impresión termina pero la cara que apoyaba sobre soportes sale rugosa. Es un fallo de calidad, no de estructura.',
      },
      {
        id: 'donde-mira',
        mira: '¿Dónde miras el problema?',
        si: 'En el voladizo que cuelga o en los soportes que se separan. La geometría es el problema.',
        no: 'En la cara que apoyaba sobre soportes. La superficie es el problema, no la geometría.',
      },
    ],
    siNo: { guia: 'warping-pla', etiqueta: 'Warping en PLA' },
  },

  variables: [
    {
      id: 'voladizo',
      etiqueta: '¿Qué ángulo tiene el voladizo más crítico?',
      para: 'El ángulo decide si necesitas soportes o con refrigeración y orientación es suficiente. Es la variable más importante de la guía.',
      necesaria: true,
      campos: ['overhangAngle'],
      opciones: [
        { id: 'menos-45', etiqueta: 'Menos de 45°', detalle: 'Necesita soportes' },
        { id: '45-60', etiqueta: 'Entre 45° y 60°', detalle: 'Puede necesitar soportes o refrigeración' },
        { id: 'mas-60', etiqueta: 'Más de 60°', detalle: 'Con refrigeración suele bastar' },
        { id: 'no-se', etiqueta: 'No lo sé', detalle: 'Mide el ángulo o usa el valor del slicer' },
      ],
    },
    {
      id: 'soporte',
      etiqueta: '¿Usas soportes?',
      para: 'Si usas soportes, la guía te ayuda a ajustarlos. Si no, te ayuda a decidir si los necesitas.',
      necesaria: true,
      campos: ['hasOverhangs'],
      opciones: [
        { id: 'si', etiqueta: 'Sí, uso soportes', detalle: 'Ajusta pattern spacing, velocidad y brim' },
        { id: 'no', etiqueta: 'No uso soportes', detalle: 'Decide si los necesitas o con refrigeración basta' },
        { id: 'no-se', etiqueta: 'No lo sé', detalle: 'El slicer puede no haberlo escrito' },
      ],
    },
    {
      id: 'material',
      etiqueta: 'Material',
      para: 'El material decide la temperatura de boquilla y la velocidad de refrigeración óptimas.',
      opciones: [
        { id: 'pla', etiqueta: 'PLA', detalle: 'El más fácil de enfriar' },
        { id: 'petg', etiqueta: 'PETG', detalle: 'Necesita más refrigeración que PLA' },
        { id: 'abs', etiqueta: 'ABS o ASA', detalle: 'Puede warpear si enfriamos demasiado' },
        { id: 'pa', etiqueta: 'PA o XT', detalle: 'Alta temperatura, cuidado con el warping' },
        { id: 'tpu', etiqueta: 'TPU', detalle: 'Flexible, necesita refrigeración suave' },
      ],
    },
    {
      id: 'orientacion',
      etiqueta: '¿Has probado a rotar la pieza?',
      para: 'La orientación puede eliminar voladizos o reducir la necesidad de soportes.',
      opciones: [
        { id: 'si', etiqueta: 'Sí, y sigue igual', detalle: 'La orientación no resuelve el problema' },
        { id: 'no', etiqueta: 'No, no lo he probado', detalle: 'Rotar puede eliminar voladizos' },
      ],
    },
  ],

  conocimiento: [
    {
      id: 'angulo-referencia',
      titulo: 'El ángulo de referencia: 45° y la distinción entre ángulo y umbral',
      cuerpo:
        'Bambu Lab recomienda añadir soportes cuando el ángulo de voladizo es **menor de 45°** y no cuando es mayor. Pero el ángulo de voladizo y el overhang threshold **no son el mismo concepto**: el ángulo es la inclinación de la superficie, y el umbral es la proporción de ancho de extrusión sin soporte dentro de una línea. En PrusaSlicer, el overhang threshold es el límite angular —la pendiente más horizontal que se puede imprimir sin soporte—. La misma palabra significa cosas distintas en cada sitio.',
      cifra: { valor: '45°', nota: 'ángulo de referencia para añadir soportes' },
      cita: {
        texto: 'Generally, when the overhang tilt angle is smaller than 45°, it is recommended to add supports; when it is larger than 45°, no support is needed.',
        fuente: 'wiki.bambulab.com',
      },
    },
    {
      id: 'refrigeracion',
      titulo: 'Refrigeración: la clave para voladizos que ya pasan el umbral',
      cuerpo:
        'Para voladizos con ángulo **mayor de 45°** —que ya pasan el umbral— se puede bajar ligeramente la temperatura de boquilla para reducir la necesidad de refrigeración. Para PLA, bajar a **~205 °C** y aumentar la velocidad del ventilador de refrigeración de voladizo al **100%**. Para otros filamentos oficiales, bajar **5–10 °C** dentro del rango recomendado. Para filamentos de terceros, imprimir una **torre de temperatura** para determinar la temperatura óptima.',
      cifra: { valor: '205 °C', nota: 'temperatura de boquilla para PLA en voladizos' },
      cita: {
        texto: "For **PLA**, you can lower the **other layers'** nozzle temperature to around **205 °C**, while increasing the **overhang cooling fan speed** to **100%**.",
        fuente: 'wiki.bambulab.com',
      },
    },
    {
      id: 'velocidad-voladizo',
      titulo: 'Velocidad de voladizo: más lento para más calidad',
      cuerpo:
        'Reducir la velocidad de impresión específicamente en regiones de voladizo. Las velocidades de voladizo suelen estar entre **10–60 mm/s**; cuanto mayor es el umbral de voladizo, mayor es el área sin soporte y típicamente se requieren velocidades más lentas. Aumentar el porcentaje del ventilador de refrigeración de pieza y del ventilador de refrigeración auxiliar según sea necesario.',
      cifra: { valor: '10–60 mm/s', nota: 'rango de velocidad de voladizo' },
      cita: {
        texto: 'Overhang speeds are generally set between **10–60 mm/s**. The larger the overhang threshold, the greater the unsupported area—typically requiring slower speeds to ensure quality.',
        fuente: 'wiki.bambulab.com',
      },
    },
    {
      id: 'cara-apoyada',
      titulo: 'La cara sobre soportes: por qué sale rugosa',
      cuerpo:
        'La superficie sobre los soportes sale **peor que el resto de la impresión** debido al **gap** —separación— que se deja entre el soporte y la superficie del objeto. Reducir el gap puede mejorar la calidad de la superficie, pero los soportes pueden ser **más difíciles de quitar**. Ajustar **Contact Z** y **Decrease pattern spacing** en PrusaSlicer para mejorar la calidad de la superficie.',
      cita: {
        texto: "After you remove the support structure, you may notice that the surface above the supports looks worse than the rest of the print. / a small gap is left between the support and the object's surface",
        fuente: 'help.prusa3d.com',
      },
    },
    {
      id: 'interface-layers',
      titulo: 'Interface layers: 3–4 para una superficie más sólida',
      cuerpo:
        'Aumentar el número de **interface layers** a **3–4** proporciona una superficie superior del soporte más sólida, lo que también puede hacer que el punto de contacto del soporte sea **más fácil de quitar**. Es el ajuste que más influye en la calidad de la cara apoyada.',
      cifra: { valor: '3–4', nota: 'interface layers para calidad de cara apoyada' },
      cita: {
        texto: 'Another good thing to try is to increase the number of interface layers to 3-4. You will have a more solid top-surface of your support, which can also make the contact-point of the support easier to remove.',
        fuente: 'help.prusa3d.com',
      },
    },
    {
      id: 'soportes-fallan',
      titulo: 'Soportes que fallan: causas y soluciones',
      cuerpo:
        'Si el material de soporte se rompe, es probable que cause el **fallo de toda la impresión**. PrusaSlicer muestra un **mensaje de advertencia** si detecta problemas de estabilidad en un modelo; en la mayoría de los casos, la solución es añadir material de soporte. El material de soporte se añade típicamente en **voladizos grandes o muy inclinados**. **Evitar torres de soporte aisladas o escasas**: para soportes **Grid y Snug**, reducir el **pattern spacing**; para soportes **Organic**, aumentar la **branch density**.',
      cita: {
        texto: 'If support material breaks, it is likely to cause a failure on the whole print.',
        fuente: 'help.prusa3d.com',
      },
    },
    {
      id: 'patron-soporte',
      titulo: 'Patrón de soporte: cuál elegir',
      cuerpo:
        '**Rectilinear** (por defecto): el más fácil de quitar. **Rectilinear grid**: más resistente y menos propenso a romperse durante la impresión; más difícil de quitar. **Honeycomb**: resistente y algo difícil de quitar. Usar **soportes personalizados** —custom supports— adaptados al modelo.',
      cita: {
        texto: 'The rectilinear pattern is set by default and is the easiest to remove. / The rectilinear grid pattern is sturdier and less prone to breaking during printing compared to the rectilinear pattern and is harder to remove. / The honeycomb pattern is sturdy and somewhat difficult to remove.',
        fuente: 'help.prusa3d.com',
      },
    },
    {
      id: 'brim-soporte',
      titulo: 'Brim alrededor del soporte: estabilidad extra',
      cuerpo:
        'Usar un **Brim** alrededor del soporte —Print settings → Skirt and Brim— mejora la estabilidad de los soportes y evita que se despeguen durante la impresión. Es especialmente útil para soportes altos o aislados.',
      cita: {
        texto: 'Use a Brim around our support, found within *Print settings -> Skirt and Brim*.',
        fuente: 'help.prusa3d.com',
      },
    },
    {
      id: 'orientacion',
      titulo: 'Orientación: la solución más barata',
      cuerpo:
        '**Rotar el objeto** en PrusaSlicer para encontrar una mejor orientación que requiera menos soportes. Usar la **herramienta Cut** para imprimir dos partes más fácilmente y luego pegarlas. Considerar **alterar la orientación del modelo** o **dividir el modelo en múltiples partes** para reducir los voladizos y, consecuentemente, la cantidad de soporte generado.',
      cita: {
        texto: 'It is worth considering altering the orientation of the model or splitting the model into multiple parts in order to possibly reduce overhangs and consequently, the amount of support generated.',
        fuente: 'help.prusa3d.com',
      },
    },
    {
      id: 'abrir-puerta',
      titulo: 'Abrir la puerta: refrigeración extra con riesgos',
      cuerpo:
        '**Abrir la puerta frontal y la cubierta superior** puede mejorar el rendimiento de refrigeración; recomendado solo para **PLA, PETG, TPU**. Para filamentos de alta temperatura, esto puede causar warping o mala adhesión de capas.',
      cuando: { material: ['pla', 'petg', 'tpu'] },
      cita: {
        texto: "**Opening the printer's front door and glass lid** can improve cooling performance (recommended only for materials like **PLA, PETG, TPU**.",
        fuente: 'wiki.bambulab.com',
      },
    },
    {
      id: 'umbral-bambu-prusa',
      titulo: 'Overhang threshold: la misma palabra significa cosas distintas',
      cuerpo:
        'En Bambu Studio, cuanto **mayor** es el ángulo de umbral de soporte configurado, **más soportes** se generan. En PrusaSlicer, el Overhang Threshold es la pendiente más horizontal —medida desde el plano horizontal— que se puede imprimir sin material de soporte —90° = vertical—. **No son el mismo parámetro** a pesar del nombre idéntico.',
      cita: {
        texto: 'The larger the input angle, the more supports will be generated.',
        fuente: 'wiki.bambulab.com',
      },
    },
    {
      id: 'campos-panel',
      titulo: 'Por qué el slicer puede no haber escrito los campos',
      cuerpo:
        'Los campos `hasOverhangs` y `overhangAngle` son **opcionales** en `ProjectMetadata`. No todos los G-code traen el ángulo de voladizo, y «Soportes en el perfil: No» no es «la pieza no tiene voladizos». El slicer puede no haber analizado la geometría o el perfil puede no incluir estos datos. Si el panel muestra «—», mide el ángulo manualmente o usa el valor del slicer.',
    },
  ],

  reglas: [
    {
      id: 'anadir-soportes',
      accion: 'Añade soportes',
      cuando: { voladizo: 'menos-45' },
      valor: 'Ángulo menor de 45°',
      porque:
        'Bambu Lab recomienda añadir soportes cuando el ángulo de voladizo es menor de 45°. El filamento extruido en un voladizo no se enfría a tiempo y se deforma por gravedad, causando que se descuelgue. Los soportes actúan como una red de seguridad bajo los voladizos, proporcionando estabilidad a las capas superiores.',
      fuente: 'Bambu Lab',
      alcance:
        'Es una regla general de Bambu Lab. El ángulo de referencia es 45° medido entre la superficie inclinada y la cama caliente. No es una garantía: la refrigeración, el material y la boquilla también influyen.',
    },
    {
      id: 'refrigeracion-pla',
      accion: 'Baja la temperatura de boquilla y sube el ventilador',
      cuando: { voladizo: ['45-60', 'mas-60'], material: 'pla' },
      valor: '205 °C y ventilador al 100%',
      porque:
        'Para voladizos con ángulo mayor de 45° —que ya pasan el umbral— se puede bajar ligeramente la temperatura de boquilla para reducir la necesidad de refrigeración. Para PLA, bajar a ~205 °C y aumentar la velocidad del ventilador de refrigeración de voladizo al 100%.',
      fuente: 'Bambu Lab',
      alcance:
        'Estas cifras son para **optimizar voladizos que ya pasan el umbral**, no para definir el umbral. Para otros filamentos oficiales, bajar 5–10 °C dentro del rango recomendado. Para filamentos de terceros, imprimir una torre de temperatura.',
    },
    {
      id: 'velocidad-voladizo',
      accion: 'Reduce la velocidad de voladizo',
      cuando: { voladizo: ['45-60', 'mas-60'] },
      valor: '10–60 mm/s',
      porque:
        'Reducir la velocidad de impresión específicamente en regiones de voladizo. Cuanto mayor es el umbral de voladizo, mayor es el área sin soporte y típicamente se requieren velocidades más lentas.',
      fuente: 'Bambu Lab',
      alcance:
        'Las velocidades de voladizo suelen estar entre 10–60 mm/s. Aumentar el porcentaje del ventilador de refrigeración de pieza y del ventilador de refrigeración auxiliar según sea necesario.',
    },
    {
      id: 'abrir-puerta',
      accion: 'Abre la puerta frontal y la cubierta superior',
      cuando: { voladizo: ['45-60', 'mas-60'], material: ['pla', 'petg', 'tpu'] },
      porque:
        'Abrir la puerta frontal y la cubierta superior puede mejorar el rendimiento de refrigeración. Recomendado solo para PLA, PETG, TPU.',
      fuente: 'Bambu Lab',
      alcance:
        'Para filamentos de alta temperatura, esto puede causar warping o mala adhesión de capas. No es universal: depende del material.',
    },
    {
      id: 'pattern-spacing',
      accion: 'Reduce el pattern spacing',
      cuando: { soporte: 'si' },
      porque:
        'Para soportes **Grid y Snug**, reducir el **pattern spacing** —espaciado de patrón— para evitar torres de soporte aisladas o escasas.',
      fuente: 'Prusa Research',
      alcance:
        'Sólo para soportes Grid y Snug. Para soportes Organic, aumentar la **branch density** —densidad de ramificación—.',
    },
    {
      id: 'branch-density',
      accion: 'Aumenta la branch density',
      cuando: { soporte: 'si' },
      porque:
        'Para soportes **Organic**, aumentar la **branch density** —densidad de ramificación— para evitar torres de soporte aisladas o escasas.',
      fuente: 'Prusa Research',
      alcance:
        'Sólo para soportes Organic. Para soportes Grid y Snug, reducir el **pattern spacing**.',
    },
    {
      id: 'velocidad-soporte',
      accion: 'Reduce la velocidad de impresión de soportes',
      cuando: { soporte: 'si' },
      porque:
        'Reducir la velocidad de impresión de soportes en PrusaSlicer —Print settings → Speed— mejora la estabilidad y evita que se rompan.',
      fuente: 'Prusa Research',
      alcance:
        'Es un ajuste de velocidad específico para soportes, no para toda la impresión.',
    },
    {
      id: 'brim-soporte',
      accion: 'Aplica un Brim alrededor del soporte',
      cuando: { soporte: 'si' },
      porque:
        'Usar un **Brim** alrededor del soporte —Print settings → Skirt and Brim— mejora la estabilidad de los soportes y evita que se despeguen durante la impresión.',
      fuente: 'Prusa Research',
      alcance:
        'Es especialmente útil para soportes altos o aislados.',
    },
    {
      id: 'patron-rectilinear-grid',
      accion: 'Cambia el patrón de soporte a Rectilinear grid',
      cuando: { soporte: 'si' },
      porque:
        '**Rectilinear grid** es más resistente y menos propenso a romperse durante la impresión; más difícil de quitar. **Rectilinear** —por defecto— es el más fácil de quitar. **Honeycomb** es resistente y algo difícil de quitar.',
      fuente: 'Prusa Research',
      alcance:
        'Depende de la prioridad: si es más importante que no se rompan, Rectilinear grid. Si es más importante que sean fáciles de quitar, Rectilinear.',
    },
    {
      id: 'soportes-personalizados',
      accion: 'Usa soportes personalizados',
      cuando: { soporte: 'si' },
      porque:
        'Usar **soportes personalizados** —custom supports— adaptados al modelo para mejorar la estabilidad y la calidad de la cara apoyada.',
      fuente: 'Prusa Research',
      alcance:
        'Requiere más tiempo de configuración pero mejora los resultados en geometrías complejas.',
    },
    {
      id: 'overhang-threshold',
      accion: 'Cambia el valor del Overhang Threshold',
      cuando: { soporte: 'si' },
      porque:
        'Cambiar el valor del Overhang Threshold en PrusaSlicer para ajustar cuándo se generan soportes. En Bambu Studio, cuanto mayor es el ángulo de umbral configurado, más soportes se generan.',
      fuente: 'Prusa Research, Bambu Lab',
      alcance:
        '**Cuidado:** el overhang threshold **no es el mismo parámetro** en Bambu y en PrusaSlicer. En Bambu es la proporción de ancho de extrusión sin soporte; en PrusaSlicer es el límite angular.',
    },
    {
      id: 'rotar-pieza',
      accion: 'Rota la pieza para reducir voladizos',
      cuando: { orientacion: 'no' },
      porque:
        '**Rotar el objeto** en PrusaSlicer para encontrar una mejor orientación que requiera menos soportes. La orientación puede eliminar voladizos o reducir la necesidad de soportes.',
      fuente: 'Prusa Research',
      alcance:
        'Es la solución más barata: no requiere ajustes de slicer, sólo cambiar la orientación del modelo.',
    },
    {
      id: 'dividir-pieza',
      accion: 'Divide el modelo en múltiples partes',
      cuando: { orientacion: 'no' },
      porque:
        'Considerar **dividir el modelo en múltiples partes** para reducir los voladizos y, consecuentemente, la cantidad de soporte generado. Usar la **herramienta Cut** para imprimir dos partes más fácilmente y luego pegarlas.',
      fuente: 'Prusa Research',
      alcance:
        'Requiere trabajo de post-procesado —pegado— pero puede eliminar la necesidad de soportes.',
    },
    {
      id: 'contact-z',
      accion: 'Ajusta Contact Z y Decrease pattern spacing',
      cuando: { soporte: 'si' },
      porque:
        'Ajustar **Contact Z** y **Decrease pattern spacing** en PrusaSlicer —Print Settings → Support material— para mejorar la calidad de la superficie sobre soportes.',
      fuente: 'Prusa Research',
      alcance:
        'Reducir el gap puede mejorar la calidad de la superficie, pero los soportes pueden ser **más difíciles de quitar**.',
    },
    {
      id: 'interface-layers',
      accion: 'Aumenta las interface layers a 3–4',
      cuando: { soporte: 'si' },
      valor: '3–4 interface layers',
      porque:
        'Aumentar el número de **interface layers** a **3–4** proporciona una superficie superior del soporte más sólida, lo que también puede hacer que el punto de contacto del soporte sea **más fácil de quitar**.',
      fuente: 'Prusa Research',
      alcance:
        'Es el ajuste que más influye en la calidad de la cara apoyada.',
    },
  ],

  fueraDeAlcance: [
    {
      sintoma: 'La pieza se levanta de la cama',
      porQue:
        'Es un problema de adhesión en la primera capa, no de voladizos. La guía de adhesión cubre las causas y soluciones.',
      guia: 'adhesion-primera-capa',
    },
    {
      sintoma: 'Las capas se separan entre sí',
      porQue:
        'Es un problema de separación entre capas, no de voladizos. La guía de separaciones cubre las causas y soluciones.',
      guia: 'separaciones-entre-capas',
    },
    {
      sintoma: 'La pieza se deforma por contracción térmica',
      porQue:
        'Es warping: contracción térmica, no un problema de voladizos. La guía de warping cubre las causas y soluciones.',
      guia: 'warping-pla',
    },
    {
      sintoma: 'Necesitas ajustar la temperatura de boquilla para un material específico',
      porQue:
        'La temperatura de boquilla es de otra guía. Esta guía sólo publica la temperatura para optimizar voladizos que ya pasan el umbral.',
    },
    {
      sintoma: 'El filamento tiene humedad o stringing',
      porQue:
        'Es un problema de material, no de voladizos. La guía de material cubre las causas y soluciones.',
      guia: 'material',
    },
  ],

  fuentes: [
    {
      url: 'https://wiki.bambulab.com/en/filament-acc/filament/print-quality/overhang',
      quien: 'Bambu Lab',
      que: 'Página de voladizos: ángulo de referencia, refrigeración, velocidad y cuándo hacen falta soportes.',
    },
    {
      url: 'https://help.prusa3d.com/article/failing-supports_1807',
      quien: 'Prusa Research',
      que: 'Soportes que fallan: por qué y qué hacer. Pattern spacing, velocidad, brim y patrones de soporte.',
    },
    {
      url: 'https://help.prusa3d.com/article/bad-looking-surface-above-supports_1803',
      quien: 'Prusa Research',
      que: 'La cara que apoya sobre soportes: por qué sale rugosa y cómo mejorarla. Contact Z, interface layers y orientación.',
    },
  ],

  campos: ['hasOverhangs', 'overhangAngle'],
  leeDelAnalisis: ['hasOverhangs', 'overhangAngle'],
};
