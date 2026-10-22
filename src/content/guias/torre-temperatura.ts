import type { Guia } from './tipos.ts';
import { AUTOR } from './autor.ts';

export const torreTemperatura: Guia = {
  slug: 'torre-temperatura',
  titulo: 'Torre de temperatura (nozzle)',
  resumen:
    'Cómo calibrar la temperatura de boquilla con una torre de temperatura: qué mide, cómo configurarla en cada slicer y cómo leer el resultado.',
  sintoma: 'No sé qué temperatura de boquilla usar para mi filamento',
  dibujo: 'hotend',
  entrada:
    'Una torre compara temperaturas de boquilla para un filamento observando hilos, unión entre capas, puentes y voladizos. Se busca cambiar sólo la temperatura entre secciones, sin dar por descartados otros factores: incluso los huecos pueden aparecer por temperatura baja. Aquí puedes preparar la prueba y comparar resultados sin confundir la sección más bonita con una garantía de imprimibilidad.',
  autor: AUTOR,
  actualizado: '2026-10-17',
  minutos: 6,
  campos: [],
  diferencial: {
    contra: 'síntomas compatibles con temperatura que también requieren otras comprobaciones',
    contraCorto: 'un diagnóstico por el aspecto',
    comprobaciones: [
      {
        id: 'hilos',
        mira: '¿Hay hilos finos entre piezas o en voladizos?',
        si: 'La torre permite comparar los hilos entre temperaturas; según Orca, tanto el exceso de calor como demasiado frío pueden producirlos. No identifican una causa única.',
        no: 'No hay hilos visibles que comparar; observa también la unión entre capas, los puentes y el acabado.',
      },
      {
        id: 'adhesion',
        mira: '¿Ves capas abiertas o separadas?',
        si: 'Una temperatura baja puede contribuir a una unión débil. La torre permite comparar adhesión, pero no confirma por sí sola la causa.',
        no: 'Sin separación visible, aún puedes comparar hilos o puentes; una unión intacta no descarta problemas de extrusión.',
      },
      {
        id: 'lineas',
        mira: '¿Hay huecos o falta de material entre líneas?',
        si: 'Son compatibles con subextrusión, que también puede aparecer por temperatura baja. No bastan para decidir entre temperatura y flujo.',
        no: 'Sin huecos visibles, compara las otras características; unas líneas uniformes no garantizan que la temperatura sea la adecuada.',
      },
    ],
    siNo: { guia: 'flow-rate', etiqueta: 'Si buscas calibrar flujo: prueba separada, no diagnóstico por descarte' },
  },
  variables: [
    {
      id: 'material',
      etiqueta: 'Material',
      indicador: 'material',
      para: 'El material filtra los rangos orientativos y evita aplicar los ejemplos PLA a otros filamentos.',
      necesaria: true,
      opciones: [
        { id: 'pla', etiqueta: 'PLA' },
        { id: 'abs', etiqueta: 'ABS' },
        { id: 'petg', etiqueta: 'PETG' },
        { id: 'tpu', etiqueta: 'TPU' },
        { id: 'otro', etiqueta: 'Otro' },
      ],
    },
    {
      id: 'slicer',
      etiqueta: 'Slicer',
      indicador: 'slicer',
      para: 'Cada slicer configura el cambio de temperatura por sección con un procedimiento distinto.',
      necesaria: true,
      opciones: [
        { id: 'creality', etiqueta: 'Creality Print' },
        { id: 'cura', etiqueta: 'Cura' },
        { id: 'prusa', etiqueta: 'PrusaSlicer' },
        { id: 'orca', etiqueta: 'OrcaSlicer' },
        { id: 'otro', etiqueta: 'Otro' },
      ],
    },
    {
      id: 'uso',
      etiqueta: 'Uso previsto',
      indicador: 'general',
      para: 'La sección ganadora cambia según se priorice resistencia, acabado o un equilibrio.',
      opciones: [
        { id: 'funcional', etiqueta: 'Piezas funcionales' },
        { id: 'visual', etiqueta: 'Modelos visuales' },
        { id: 'general', etiqueta: 'Uso general' },
      ],
    },
  ],
  conocimiento: [
    {
      id: 'que-es',
      titulo: 'Qué es una torre de temperatura',
      puntos: [
        'Es un modelo de calibración: una torre vertical con varias secciones.',
        'Cada una impresa a una temperatura distinta de boquilla (por ejemplo 240 °C en la base, luego 235 °C, 230 °C…).',
        'Sirve para determinar la temperatura ideal de boquilla para un filamento concreto.',
      ],
      indicador: 'calibracion',
      cuerpo:
        'Es un modelo de calibración: una torre vertical con varias secciones, cada una impresa a una temperatura distinta de boquilla (por ejemplo 240 °C en la base, luego 235 °C, 230 °C…). Sirve para determinar la temperatura ideal de boquilla para un filamento concreto.',
      cifra: { valor: '240, 235, 230 °C…', nota: 'ejemplo de secciones decrecientes' },
      cita: {
        texto:
          'each level produced at a slightly different temperature',
        fuente: 'Creality',
      },
    },
    {
      id: 'que-evalua',
      titulo: 'Qué evalúa',
      puntos: [
        'Cada sección permite comparar stringing, adhesión entre capas, deformación de voladizos y puenteado.',
        'La mención de Orca a "warping (overhang)" no diagnostica despegue de la cama: se busca equilibrar los defectos observados.',
      ],
      indicador: 'calibracion',
      cuerpo:
        'Cada sección permite comparar stringing, adhesión entre capas, deformación de voladizos y puenteado. La mención de Orca a "warping (overhang)" no diagnostica despegue de la cama: se busca equilibrar los defectos observados.',
      cita: {
        texto:
          'The optimal temperature is the one that produces the highest-quality print with the fewest issues, such as stringing, layer adhesion problems, warping (overhang), and poor bridging.',
        fuente: 'OrcaSlicer',
      },
    },
    {
      id: 'que-no-mide',
      titulo: 'Qué NO mide',
      puntos: [
        'La torre no sustituye las calibraciones de flujo, retracción, velocidad volumétrica máxima.',
        'Pressure advance o VFA que Bambu Lab documenta por separado; tampoco calibra cama o ambiente.',
        'Que existan pruebas separadas no excluye la temperatura como posible causa de subextrusión.',
      ],
      indicador: 'calibracion',
      cuerpo:
        'La torre no sustituye las calibraciones de flujo, retracción, velocidad volumétrica máxima, pressure advance o VFA que Bambu Lab documenta por separado; tampoco calibra cama o ambiente. Que existan pruebas separadas no excluye la temperatura como posible causa de subextrusión.',
      cita: {
        texto: 'Flow Rate ... Pressure Advance ... Retraction Test ... Max Flowrate ... VFA (Vertical Fined Artifacts)...',
        fuente: 'Bambu Lab Wiki',
      },
    },
    {
      id: 'aislar',
      titulo: 'Aislar la temperatura como única variable',
      puntos: [
        '3D Printer Stuff propone conservar los ajustes habituales para cambiar sólo la temperatura entre secciones.',
        'Es una guía secundaria, sin corroborar este procedimiento.',
        'Es el objetivo de la prueba, no una garantía de que no intervengan otros factores.',
        'En Orca se respeta además la capa calculada por su autoescalado.',
      ],
      indicador: 'temperatura',
      cuerpo:
        '3D Printer Stuff propone conservar los ajustes habituales para cambiar sólo la temperatura entre secciones; es una guía secundaria, sin corroborar este procedimiento. Es el objetivo de la prueba, no una garantía de que no intervengan otros factores; en Orca se respeta además la capa calculada por su autoescalado.',
      cita: {
        texto: 'Use your normal print settings for everything except temperature. The point is to isolate temperature as the only variable',
        fuente: '3D Printer Stuff',
      },
    },
    {
      id: 'por-material',
      titulo: 'Cada material requiere su propia torre',
      puntos: [
        'Cada material requiere su propia torre, según Creality, porque funde y se adhiere de forma distinta.',
        'No traslades una secuencia de PLA a ABS, PETG o TPU.',
      ],
      indicador: 'material',
      cuerpo:
        'Cada material requiere su propia torre, según Creality, porque funde y se adhiere de forma distinta. No traslades una secuencia de PLA a ABS, PETG o TPU.',
      cita: {
        texto:
          'every material melts and bonds differently.',
        fuente: 'Creality',
      },
    },
    {
      id: 'rango-pla',
      titulo: 'Rango orientativo para PLA',
      puntos: [
        'Creality sitúa habitualmente PLA entre 190 y 220 °C.',
        'Es una orientación que varía por marca, color y configuración, no una temperatura universal.',
      ],
      indicador: 'temperatura',
      cuerpo:
        'Creality sitúa habitualmente PLA entre 190 y 220 °C. Es una orientación que varía por marca, color y configuración, no una temperatura universal.',
      cuando: { material: 'pla' },
      cifra: { valor: '190–220 °C', nota: 'Creality FAQ; varía por marca, color e impresora' },
      cita: {
        texto:
          'The best temperature for PLA usually falls between 190 °C and 220 °C, but it varies depending on the filament brand, color, and printer setup.',
        fuente: 'Creality',
      },
    },
    {
      id: 'rango-abs',
      titulo: 'Rango orientativo para ABS',
      puntos: [
        'Creality sitúa habitualmente ABS entre 230 y 260 °C.',
        'El rango es orientativo y varía por marca, color y configuración.',
      ],
      indicador: 'temperatura',
      cuerpo:
        'Creality sitúa habitualmente ABS entre 230 y 260 °C. El rango es orientativo y varía por marca, color y configuración.',
      cuando: { material: 'abs' },
      cifra: { valor: '230–260 °C', nota: 'orientación ABS de Creality; varía por marca, color e impresora' },
      cita: {
        texto: 'ABS typically prints between 230 °C and 260 °C.',
        fuente: 'Creality',
      },
    },
    {
      id: 'rango-petg',
      titulo: 'Rango orientativo para PETG',
      puntos: [
        'Creality sitúa PETG entre 220 y 250 °C. Es una orientación que varía por marca, color y configuración.',
      ],
      indicador: 'temperatura',
      cuerpo:
        'Creality sitúa PETG entre 220 y 250 °C. Es una orientación que varía por marca, color y configuración.',
      cuando: { material: 'petg' },
      cifra: { valor: '220–250 °C', nota: 'orientación PETG de Creality; varía por marca, color e impresora' },
      cita: {
        texto: 'PETG performs best between 220 °C and 250 °C.',
        fuente: 'Creality',
      },
    },
    {
      id: 'secciones-pla',
      titulo: 'Ejemplo de secciones para PLA',
      puntos: [
        'La versión PLA descrita por 3D Printer Stuff cubre 190–220 °C en siete secciones de 5 °C.',
        'Es un ejemplo de una sola guía secundaria, sin corroborar la secuencia; no obliga a elegir ese modelo.',
      ],
      indicador: 'temperatura',
      cuerpo:
        'La versión PLA descrita por 3D Printer Stuff cubre 190–220 °C en siete secciones de 5 °C. Es un ejemplo de una sola guía secundaria, sin corroborar la secuencia; no obliga a elegir ese modelo.',
      cuando: { material: 'pla' },
      cifra: { valor: '7 secciones', nota: 'ejemplo PLA de 3D Printer Stuff: 190–220 °C en pasos de 5 °C' },
      cita: {
        texto: 'For PLA, grab the version that covers 190-220°C in 5°C increments. That gives you 7 sections: 220, 215, 210, 205, 200, 195, 190.',
        fuente: '3D Printer Stuff',
      },
    },
    {
      id: 'caracteristicas',
      titulo: 'Características sensibles a la temperatura',
      puntos: [
        'El modelo descrito por 3D Printer Stuff incluye puentes, voladizos de 30°, 45° y 60°, pilares para observar hilos.',
        'Detalle fino y paredes planas. La geometría depende del modelo: es una descripción de una sola guía secundaria, sin corroborar.',
      ],
      indicador: 'temperatura',
      cuerpo:
        'El modelo descrito por 3D Printer Stuff incluye puentes, voladizos de 30°, 45° y 60°, pilares para observar hilos, detalle fino y paredes planas. La geometría depende del modelo: es una descripción de una sola guía secundaria, sin corroborar.',
      cita: {
        texto:
          'angled surfaces at 30°, 45°, and 60°',
        fuente: '3D Printer Stuff',
      },
    },
    {
      id: 'creality-print',
      titulo: 'Configuración en Creality Print',
      puntos: [
        'En Creality Print, pulsar el botón "Filament" y luego el icono de pincel para fijar la temperatura del extrusor a alturas de capa exactas.',
        'Coincidiendo con cada nivel de la torre.',
        'Buscar un modelo con niveles claramente espaciados y visibles.',
      ],
      indicador: 'temperatura',
      cuerpo:
        'En Creality Print, pulsar el botón "Filament" y luego el icono de pincel para fijar la temperatura del extrusor a alturas de capa exactas, coincidiendo con cada nivel de la torre. Buscar un modelo con niveles claramente espaciados y visibles.',
      cuando: { slicer: 'creality' },
      cita: {
        texto:
          'press the \'Filament\' button and afterward the brush icon to set the extruder temperature to exact layer heights, matching each level of the tower.',
        fuente: 'Creality',
      },
    },
    {
      id: 'cura',
      titulo: 'Cura: procedimiento general',
      puntos: [
        'Creality indica Extensions > Post Processing > Modify G-Code > Add a script > Change at Height.',
        'Configura la altura Z y la temperatura de cada sección y previsualiza el G-code.',
        'Calcula las alturas con el grosor de capa y las capas de tu modelo; este mecanismo no fija un rango térmico para todos los materiales.',
      ],
      indicador: 'temperatura',
      cuerpo:
        'Creality indica Extensions > Post Processing > Modify G-Code > Add a script > Change at Height: configura la altura Z y la temperatura de cada sección y previsualiza el G-code. Calcula las alturas con el grosor de capa y las capas de tu modelo; este mecanismo no fija un rango térmico para todos los materiales.',
      cuando: { slicer: 'cura' },
      cita: {
        texto:
          'Click Add a script and select Change at Height',
        fuente: 'Creality',
      },
    },
    {
      id: 'cura-ejemplo-pla',
      titulo: 'Cura: ejemplo PLA, no receta universal',
      puntos: [
        '3D Printer Stuff empieza su ejemplo PLA a 220 °C y cambia a 215 °C a 8,2 mm, 210 °C a 16,4 mm y 205 °C a 24,6 mm.',
        'La guía secundaria recomienda como contexto el Smart Compact Temperature Tower de gaaZolee.',
        'No es un modelo obligatorio ni un aval independiente.',
        'Y la secuencia y las alturas no están corroboradas ni se trasladan sin comprobar el modelo y la capa.',
      ],
      indicador: 'slicer',
      cuerpo:
        '3D Printer Stuff empieza su ejemplo PLA a 220 °C y cambia a 215 °C a 8,2 mm, 210 °C a 16,4 mm y 205 °C a 24,6 mm. La guía secundaria recomienda como contexto el Smart Compact Temperature Tower de gaaZolee; no es un modelo obligatorio ni un aval independiente, y la secuencia y las alturas no están corroboradas ni se trasladan sin comprobar el modelo y la capa.',
      cuando: { slicer: 'cura', material: 'pla' },
      cifra: { valor: '220 → 215 → 210 → 205 °C', nota: 'ejemplo PLA; cambios a 8,2 / 16,4 / 24,6 mm dependientes del modelo y la capa' },
      cita: {
        texto: 'Set your starting temperature to the highest value (220°C for PLA)',
        fuente: '3D Printer Stuff',
      },
    },
    {
      id: 'prusa',
      titulo: 'PrusaSlicer: límite documental',
      puntos: [
        '3D Printer Stuff describe cambios de temperatura por rango mediante "Add height range modifier".',
        'Es una sola guía secundaria, sin corroboración oficial ni prueba del programa en este corpus.',
        'No se ofrece aquí esa ruta de interfaz como procedimiento verificado.',
      ],
      indicador: 'slicer',
      cuerpo:
        '3D Printer Stuff describe cambios de temperatura por rango mediante "Add height range modifier". Es una sola guía secundaria, sin corroboración oficial ni prueba del programa en este corpus: no se ofrece aquí esa ruta de interfaz como procedimiento verificado.',
      cuando: { slicer: 'prusa' },
      cita: {
        texto:
          'set a new temperature for each range',
        fuente: '3D Printer Stuff',
      },
    },
    {
      id: 'orca',
      titulo: 'Configuración en OrcaSlicer (auto-escalado por boquilla)',
      puntos: [
        'El modelo de referencia está diseñado para boquilla de 0,4 mm a 0,2 mm de altura de capa.',
        'Con "Auto-scale for nozzle" activo (por defecto).',
        'La torre se escala al diámetro de boquilla y la altura de capa se fija a la mitad de este.',
        'Para que las características se mantengan visibles; desactivar sólo para imprimir el modelo original a 0,4 mm.',
      ],
      indicador: 'slicer',
      cuerpo:
        'El modelo de referencia está diseñado para boquilla de 0,4 mm a 0,2 mm de altura de capa. Con "Auto-scale for nozzle" activo (por defecto), la torre se escala al diámetro de boquilla y la altura de capa se fija a la mitad de este, para que las características se mantengan visibles; desactivar sólo para imprimir el modelo original a 0,4 mm.',
      cuando: { slicer: 'orca' },
      cita: {
        texto:
          'the tower is scaled to your nozzle diameter and the layer height is set to half of it',
        fuente: 'OrcaSlicer',
      },
    },
    {
      id: 'orca-belt',
      titulo: 'Impresora de banda (belt) en OrcaSlicer',
      puntos: [
        'En impresora de banda, el diálogo de prueba incluye selección de modelo.',
        'Standard imprime una torre seccionada; Overhang imprime piezas en L invertida para evaluar voladizos por temperatura.',
      ],
      indicador: 'slicer',
      cuerpo:
        'En impresora de banda, el diálogo de prueba incluye selección de modelo. Standard imprime una torre seccionada; Overhang imprime piezas en L invertida para evaluar voladizos por temperatura.',
      cuando: { slicer: 'orca' },
      cita: {
        texto:
          'On a belt printer, the test dialog includes a Test model selection. Standard prints a sectioned tower, while Overhang prints test pieces shaped like an inverted L to assess overhang quality at each temperature.',
        fuente: 'OrcaSlicer',
      },
    },
    {
      id: 'ajustes-impresion',
      titulo: 'Un ejemplo de perfil, no ajustes obligatorios',
      puntos: [
        '3D Printer Stuff ejemplifica capa de 0,2 mm, velocidad de 50–60 mm/s y relleno de 10–15 %, subordinados a conservar el perfil habitual.',
        'Son cifras secundarias sin corroborar, no una orden de cambiar tu velocidad o retracción.',
        'En Orca rige la capa calculada por autoescalado, no una imposición de 0,2 mm.',
        'La estimación de 35–50 min y 8–15 g depende de velocidad, modelo y configuración, sin garantía para otras torres.',
      ],
      indicador: 'velocidad',
      cuerpo:
        '3D Printer Stuff ejemplifica capa de 0,2 mm, velocidad de 50–60 mm/s y relleno de 10–15 %, subordinados a conservar el perfil habitual; son cifras secundarias sin corroborar, no una orden de cambiar tu velocidad o retracción. En Orca rige la capa calculada por autoescalado, no una imposición de 0,2 mm. La estimación de 35–50 min y 8–15 g depende de velocidad, modelo y configuración, sin garantía para otras torres.',
      cifra: { valor: '0,2 mm · 50–60 mm/s', nota: 'ejemplo secundario sin corroborar; no sustituye el perfil habitual ni el autoescalado Orca' },
      cita: {
        texto:
          'Use your normal print settings for everything except temperature.',
        fuente: '3D Printer Stuff',
      },
    },
    {
      id: 'perfil-pla',
      titulo: 'Cama y ventilador: sólo el ejemplo PLA',
      puntos: [
        'El ejemplo PLA de 3D Printer Stuff cita cama habitual de 60 °C y ventilador al 100 % tras la capa 3.',
        'Son valores de una sola guía secundaria, sin corroborar: no sustituyen obligatoriamente tu perfil PLA ni se aplican a otros materiales.',
      ],
      indicador: 'ventilacion',
      cuerpo:
        'El ejemplo PLA de 3D Printer Stuff cita cama habitual de 60 °C y ventilador al 100 % tras la capa 3. Son valores de una sola guía secundaria, sin corroborar: no sustituyen obligatoriamente tu perfil PLA ni se aplican a otros materiales.',
      cuando: { material: 'pla' },
      cifra: { valor: '60 °C · 100 % tras capa 3', nota: 'sólo ejemplo PLA; conservar los ajustes habituales, no imponer esta receta' },
      cita: {
        texto: '100% fan after layer 3 (normal PLA settings)',
        fuente: '3D Printer Stuff',
      },
    },
    {
      id: 'seccion-altura',
      titulo: 'Altura de cada sección',
      puntos: [
        '3D Printer Stuff describe secciones típicas de 8,0–8,2 mm, equivalentes a 40–41 capas si la capa es de 0,2 mm.',
        'Es un dato dependiente del modelo de una sola guía secundaria, sin corroborar: comprueba las alturas de tu torre.',
      ],
      indicador: 'general',
      cuerpo:
        '3D Printer Stuff describe secciones típicas de 8,0–8,2 mm, equivalentes a 40–41 capas si la capa es de 0,2 mm. Es un dato dependiente del modelo de una sola guía secundaria, sin corroborar: comprueba las alturas de tu torre.',
      cifra: { valor: '8,0–8,2 mm', nota: 'una sola fuente, modelo-dependiente, sin corroborar' },
      cita: {
        texto: 'Each section is typically 8.0-8.2 mm tall... With 0.2 mm layers, each section is 40-41 layers.',
        fuente: '3D Printer Stuff',
      },
    },
    {
      id: 'puenteado',
      titulo: 'Cómo leer el puenteado (bridging)',
      puntos: [
        '3D Printer Stuff propone comparar puentes planos: atribuye comba al exceso de calor y fallos de anclaje al frío.',
        'Es un criterio detallado de una sola guía secundaria, sin corroborar los anclajes ni una causa exclusiva.',
        'Orca respalda la tendencia al combado por exceso de temperatura.',
      ],
      indicador: 'temperatura',
      cuerpo:
        '3D Printer Stuff propone comparar puentes planos: atribuye comba al exceso de calor y fallos de anclaje al frío. Es un criterio detallado de una sola guía secundaria, sin corroborar los anclajes ni una causa exclusiva; Orca respalda la tendencia al combado por exceso de temperatura.',
      cita: {
        texto:
          'Pick the section where the bridge is flattest.',
        fuente: '3D Printer Stuff',
      },
    },
    {
      id: 'stringing',
      titulo: 'Cómo leer el stringing',
      puntos: [
        '3D Printer Stuff busca cero hilos y atribuye el aumento con calor a un fundido menos viscoso.',
        'Si hay hilos en todas las secciones, propone revisar la retracción aparte.',
        'El mecanismo y esa inferencia proceden de una sola guía secundaria, sin corroborar, no de un diagnóstico exclusivo.',
        'Orca advierte que bajar demasiado la temperatura también puede producir hilos.',
      ],
      indicador: 'temperatura',
      cuerpo:
        '3D Printer Stuff busca cero hilos y atribuye el aumento con calor a un fundido menos viscoso; si hay hilos en todas las secciones, propone revisar la retracción aparte. El mecanismo y esa inferencia proceden de una sola guía secundaria, sin corroborar, no de un diagnóstico exclusivo. Orca advierte que bajar demasiado la temperatura también puede producir hilos.',
      cita: {
        texto:
          'If every section strings, your retraction settings also need tuning',
        fuente: '3D Printer Stuff',
      },
    },
    {
      id: 'stringing-bajo',
      titulo: 'Stringing a temperaturas bajas',
      puntos: [
        'Según Orca, bajar la temperatura suele reducir los hilos, pero demasiado frío también puede causarlos.',
        'Orca advierte asimismo de subextrusión y mala adhesión por temperatura baja: no elijas siempre el mínimo.',
      ],
      indicador: 'calibracion',
      cuerpo:
        'Según Orca, bajar la temperatura suele reducir los hilos, pero demasiado frío también puede causarlos. Orca advierte asimismo de subextrusión y mala adhesión por temperatura baja: no elijas siempre el mínimo.',
      cita: {
        texto: 'Stringing: lower temperatures typically reduce stringing, but going too low can cause it too.',
        fuente: 'OrcaSlicer',
      },
    },
    {
      id: 'voladizos',
      titulo: 'Cómo leer los voladizos (overhangs)',
      puntos: [
        'En su modelo, 3D Printer Stuff usa el voladizo de 60° para comparar frente al de 45° y propone buscar el más suave.',
        'Describe comba con calor y curvatura por mala unión en frío.',
        'Es un criterio dependiente del modelo de una sola guía secundaria.',
        'Sin corroborar: no garantiza limpieza universal a 45° ni esos ángulos en cualquier torre.',
      ],
      indicador: 'entorno',
      cuerpo:
        'En su modelo, 3D Printer Stuff usa el voladizo de 60° para comparar frente al de 45° y propone buscar el más suave; describe comba con calor y curvatura por mala unión en frío. Es un criterio dependiente del modelo de una sola guía secundaria, sin corroborar: no garantiza limpieza universal a 45° ni esos ángulos en cualquier torre.',
      cita: {
        texto:
          'Find the temp where the 60° overhang is smoothest.',
        fuente: '3D Printer Stuff',
      },
    },
    {
      id: 'adhesion-capas',
      titulo: 'Cómo leer la adhesión entre capas',
      puntos: [
        'Creality propone comparar las secciones por flexión o rotura.',
        'Priorizar la más difícil de romper para piezas funcionales, aunque sea menos bonita, es el criterio de 3D Printer Stuff.',
        'Una sola guía secundaria, sin corroborar esa prioridad, no un ensayo normalizado de resistencia.',
      ],
      indicador: 'calibracion',
      cuerpo:
        'Creality propone comparar las secciones por flexión o rotura. Priorizar la más difícil de romper para piezas funcionales, aunque sea menos bonita, es el criterio de 3D Printer Stuff: una sola guía secundaria, sin corroborar esa prioridad, no un ensayo normalizado de resistencia.',
      cita: {
        texto:
          'prioritize the section that\'s hardest to break, even if the surface finish isn\'t quite as pretty.',
        fuente: '3D Printer Stuff',
      },
    },
    {
      id: 'adhesion-orca',
      titulo: 'Adhesión en OrcaSlicer',
      puntos: [
        'Según Orca, las temperaturas más altas generalmente mejoran la adhesión entre capas.',
        'Es una tendencia, no una garantía de que cada aumento mejore la resistencia.',
      ],
      indicador: 'calibracion',
      cuerpo:
        'Según Orca, las temperaturas más altas generalmente mejoran la adhesión entre capas. Es una tendencia, no una garantía de que cada aumento mejore la resistencia.',
      cita: {
        texto: 'Layer adhesion / strength: higher temperatures generally improve adhesion.',
        fuente: 'OrcaSlicer',
      },
    },
    {
      id: 'acabado',
      titulo: 'Cómo leer el acabado superficial',
      puntos: [
        '3D Printer Stuff busca paredes suaves y consistentes: describe brillos y blobs por calor, y textura mate o rugosa por frío.',
        'Creality respalda los defectos por calor, pero la explicación de la textura en frío procede sólo de esa guía secundaria.',
        'Sin corroborar; bajar no garantiza mejor acabado.',
      ],
      indicador: 'entorno',
      cuerpo:
        '3D Printer Stuff busca paredes suaves y consistentes: describe brillos y blobs por calor, y textura mate o rugosa por frío. Creality respalda los defectos por calor, pero la explicación de la textura en frío procede sólo de esa guía secundaria, sin corroborar; bajar no garantiza mejor acabado.',
      cita: {
        texto:
          'Too cold and you\'ll see matte, slightly rough texture from incomplete inter-layer flow.',
        fuente: '3D Printer Stuff',
      },
    },
    {
      id: 'overhangs-orca',
      titulo: 'Voladizos y puenteado en OrcaSlicer',
      puntos: [
        'Según Orca, aumentar la temperatura puede ayudar al flujo en puentes y voladizos.',
        'Un exceso puede provocar combado: no basta con buscar el extremo más caliente.',
      ],
      indicador: 'slicer',
      cuerpo:
        'Según Orca, aumentar la temperatura puede ayudar al flujo en puentes y voladizos. Un exceso puede provocar combado: no basta con buscar el extremo más caliente.',
      cita: {
        texto: 'Overhangs / bridging: higher temperatures can help flow, but too high causes sagging.',
        fuente: 'OrcaSlicer',
      },
    },
    {
      id: 'creality-lectura',
      titulo: 'Criterios de lectura (Creality)',
      puntos: [
        'Creality propone comparar unión entre capas por flexión o rotura, comba en puentes y voladizos, hilos, paredes y detalle fino.',
        'Describe acabado nítido pero posible subextrusión en frío, frente a flujo más suave con riesgo de blobs y brillo en caliente.',
        'También señala anillos en esquinas y detalle desgastado.',
      ],
      indicador: 'temperatura',
      cuerpo:
        'Creality propone comparar unión entre capas por flexión o rotura, comba en puentes y voladizos, hilos, paredes y detalle fino. Describe acabado nítido pero posible subextrusión en frío, frente a flujo más suave con riesgo de blobs y brillo en caliente; también señala anillos en esquinas y detalle desgastado.',
      cita: {
        texto:
          'Layer adhesion: Try flexing or snapping the printed pieces... Bridging and overhangs... Surface finish and detail... Stringing/oozing... Miscellaneous artifacts...',
        fuente: 'Creality',
      },
    },
    {
      id: 'orca-rango-medio',
      titulo: 'OrcaSlicer: rango bueno → usar el medio',
      puntos: [
        'Si un rango de temperaturas se ve bien, usar el medio del rango como óptimo.',
        'Si se planea imprimir a mayor velocidad o mayor flujo, considerar el extremo alto del rango.',
      ],
      indicador: 'slicer',
      cuerpo:
        'Si un rango de temperaturas se ve bien, usar el medio del rango como óptimo. Si se planea imprimir a mayor velocidad o mayor flujo, considerar el extremo alto del rango.',
      cuando: { slicer: 'orca' },
      cita: {
        texto:
          'If a range of temperatures looks good, use the middle of that range as the optimal temperature. If you plan to print at higher speeds or flow rates, consider using the higher end of that range.',
        fuente: 'OrcaSlicer',
      },
    },
    {
      id: 'resolucion-contradictoria',
      titulo: 'Resolver resultados contradictorios',
      puntos: [
        'En el ejemplo de 3D Printer Stuff, 210 °C da mejor puenteado, 215 °C mejor adhesión y 205 °C menos hilos.',
        'Propone priorizar adhesión para uso funcional, acabado e hilos para visual y el medio del rango bueno para uso general.',
        'Normalmente 5 °C sobre el mejor stringing.',
        'Las prioridades y el margen numérico proceden de una sola guía secundaria.',
        'Sin corroborar: compara resultados dentro de un rango que imprima correctamente, sin asumir que bajar o subir siempre mejora.',
      ],
      indicador: 'calibracion',
      cuerpo:
        'En el ejemplo de 3D Printer Stuff, 210 °C da mejor puenteado, 215 °C mejor adhesión y 205 °C menos hilos; propone priorizar adhesión para uso funcional, acabado e hilos para visual y el medio del rango bueno para uso general, normalmente 5 °C sobre el mejor stringing. Las prioridades y el margen numérico proceden de una sola guía secundaria, sin corroborar: compara resultados dentro de un rango que imprima correctamente, sin asumir que bajar o subir siempre mejora.',
      cuando: { material: 'pla' },
      cita: {
        texto:
          'pick the temperature in the middle of the range that performs well across all categories.',
        fuente: '3D Printer Stuff',
      },
    },
    {
      id: 'no-ultima-palabra',
      titulo: 'La torre no es la última palabra',
      puntos: [
        'En el foro Prusa, samuel.jimenez prefirió visualmente 180 °C en su torre PLA de 180–250 °C.',
        'Y relató un paro al intentar imprimir a ese ajuste.',
        'Sospechó obstrucción, sin confirmarla.',
        'Después informó de que volvió a extruir tras reinsertar filamento y calentar, sin aislar una causa: es un único testimonio sin corroborar.',
        'No evidencia de un atasco causado por esa temperatura.',
        'La preferencia visual no es una garantía de imprimibilidad.',
      ],
      indicador: 'temperatura',
      cuerpo:
        'En el foro Prusa, samuel.jimenez prefirió visualmente 180 °C en su torre PLA de 180–250 °C y relató un paro al intentar imprimir a ese ajuste; sospechó obstrucción, sin confirmarla. Después informó de que volvió a extruir tras reinsertar filamento y calentar, sin aislar una causa: es un único testimonio sin corroborar, no evidencia de un atasco causado por esa temperatura. La preferencia visual no es una garantía de imprimibilidad.',
      cuando: { material: 'pla' },
      cita: {
        texto:
          'I feel like the nozzle got cloaked, I\'m checking it up now.',
        fuente: 'foro Prusa, samuel.jimenez',
      },
    },
    {
      id: 'filamento-seco',
      titulo: 'Filamento "nuevo" no significa "seco"',
      puntos: [
        'Diem, en el foro Prusa, recuerda que un carrete nuevo podría estar húmedo por almacén o transporte y propone probar a secarlo.',
        'Es una posibilidad de una sola fuente de foro, sin corroborar la humedad de ese carrete ni un ensayo de secado.',
        'El autor sí relató desaparición de hilos al bajar a 200 °C, sin demostrar una causa única.',
      ],
      indicador: 'temperatura',
      cuerpo:
        'Diem, en el foro Prusa, recuerda que un carrete nuevo podría estar húmedo por almacén o transporte y propone probar a secarlo. Es una posibilidad de una sola fuente de foro, sin corroborar la humedad de ese carrete ni un ensayo de secado; el autor sí relató desaparición de hilos al bajar a 200 °C, sin demostrar una causa única.',
      cita: {
        texto:
          'New does not mean dry.',
        fuente: 'foro Prusa, Diem',
      },
    },
    {
      id: 'colores',
      titulo: 'Colores del mismo fabricante',
      puntos: [
        '3D Printer Stuff afirma que los colores de un fabricante pueden diferir 5–10 °C por los pigmentos.',
        'Es un dato de una sola guía secundaria, sin corroborar.',
      ],
      indicador: 'temperatura',
      cuerpo:
        '3D Printer Stuff afirma que los colores de un fabricante pueden diferir 5–10 °C por los pigmentos. Es un dato de una sola guía secundaria, sin corroborar.',
      cita: {
        texto:
          'Different colors from the same manufacturer can have different optimal temperatures by 5-10°C because the pigments affect the melt behavior.',
        fuente: '3D Printer Stuff',
      },
    },
    {
      id: 'carretes-pla',
      titulo: 'Variación entre carretes de PLA',
      puntos: [
        '3D Printer Stuff afirma un rango de 195–218 °C entre carretes de PLA y desaconseja asumir que todos usan 200 °C.',
        'Es una sola guía secundaria, sin corroborar y sin muestra ni método de ensayo documentados aquí.',
        'No sustituye el rango orientativo de Creality.',
      ],
      indicador: 'temperatura',
      cuerpo:
        '3D Printer Stuff afirma un rango de 195–218 °C entre carretes de PLA y desaconseja asumir que todos usan 200 °C. Es una sola guía secundaria, sin corroborar y sin muestra ni método de ensayo documentados aquí; no sustituye el rango orientativo de Creality.',
      cuando: { material: 'pla' },
      cita: {
        texto:
          'Optimal temperatures across PLA spools range from 195°C to 218°C.',
        fuente: '3D Printer Stuff',
      },
    },
    {
      id: 'ambiente',
      titulo: 'Temperatura ambiente y corrientes',
      puntos: [
        'Según Creality, el ambiente y las corrientes pueden afectar al resultado.',
        'Una caída brusca puede enfriar demasiado rápido y dejar uniones frágiles.',
        'Una habitación muy caliente o con corrientes puede producir enfriamiento no uniforme.',
      ],
      indicador: 'temperatura',
      cuerpo:
        'Según Creality, el ambiente y las corrientes pueden afectar al resultado. Una caída brusca puede enfriar demasiado rápido y dejar uniones frágiles; una habitación muy caliente o con corrientes puede producir enfriamiento no uniforme.',
      cita: {
        texto:
          'Room temperature and drafts can impact print results.',
        fuente: 'Creality',
      },
    },
    {
      id: 'sin-indicadores',
      titulo: 'Modelos sin indicadores de temperatura',
      puntos: [
        'La mayoría de STL de torre estándar no llevan indicadores de temperatura impresos.',
        'Lo que dificulta recordar qué temperatura corresponde a cada nivel.',
        'Usar un modelo ajustable con cada paso marcado.',
      ],
      indicador: 'temperatura',
      cuerpo:
        'La mayoría de STL de torre estándar no llevan indicadores de temperatura impresos, lo que dificulta recordar qué temperatura corresponde a cada nivel. Usar un modelo ajustable con cada paso marcado.',
      cita: {
        texto:
          'Most standard tower STLs lack printed temperature indicators, so it\'s harder to review the result... use a adjustable tower model where every step is marked with its temperature or height.',
        fuente: 'Creality',
      },
    },
    {
      id: 'alturas-z',
      titulo: 'Alturas Z incorrectas en el script',
      puntos: [
        'Según Creality, una altura Z incorrecta puede aplicar el cambio de temperatura demasiado pronto, demasiado tarde o no aplicarlo.',
        'Comprueba que los cambios coincidan con el inicio de cada sección.',
      ],
      indicador: 'temperatura',
      cuerpo:
        'Según Creality, una altura Z incorrecta puede aplicar el cambio de temperatura demasiado pronto, demasiado tarde o no aplicarlo. Comprueba que los cambios coincidan con el inicio de cada sección.',
      cita: {
        texto:
          'If your temperature change triggers are set at the incorrect layer height, the script may apply the new temperature too early, too late, or not at all.',
        fuente: 'Creality',
      },
    },
    {
      id: 'opinion-pla-foro',
      titulo: 'Otra cifra PLA: una opinión, no un rango universal',
      puntos: [
        'Avinash propone 205–215 °C para PLA según su experiencia en el foro Prusa.',
        'Es una opinión de una sola fuente, sin corroborar, no una recomendación oficial ni demostrada para todas las marcas.',
        'No se promedia con los otros rangos.',
      ],
      indicador: 'temperatura',
      cuerpo:
        'Avinash propone 205–215 °C para PLA según su experiencia en el foro Prusa. Es una opinión de una sola fuente, sin corroborar, no una recomendación oficial ni demostrada para todas las marcas; no se promedia con los otros rangos.',
      cuando: { material: 'pla' },
      cifra: { valor: '205–215 °C', nota: 'experiencia de Avinash en un foro; sin corroborar, no universal' },
    },
  ],
  reglas: [
    {
      id: 'aislar',
      accion: 'Conserva tu perfil habitual y cambia sólo la temperatura entre secciones',
      porque:
        '3D Printer Stuff propone aislar la temperatura sin cambiar a la vez velocidad, retracción, cama o refrigeración. No garantiza que los demás factores dejen de influir.',
      alcance: 'Una sola guía secundaria, procedimiento sin corroborar; sus cifras de ejemplo no sustituyen el perfil habitual. En Orca se respeta la capa generada por autoescalado y se mantiene entre secciones.',
      fuente: '3D Printer Stuff',
    },
    {
      id: 'rango-pla',
      accion: 'Toma el rango PLA de Creality como orientación',
      valor: '190–220 °C',
      porque:
        'Es el rango que da Creality para PLA, aunque varía por marca, color y configuración de impresora.',
      alcance: 'Creality FAQ; no es un valor único para todas las marcas.',
      cuando: { material: 'pla' },
      fuente: 'Creality',
    },
    {
      id: 'rango-abs',
      accion: 'Toma el rango ABS de Creality como orientación',
      valor: '230–260 °C',
      porque: 'Es el rango orientativo que da Creality para ABS.',
      alcance: 'Creality FAQ; varía por marca, color y configuración, no es universal.',
      cuando: { material: 'abs' },
      fuente: 'Creality',
    },
    {
      id: 'rango-petg',
      accion: 'Toma el rango PETG de Creality como orientación',
      valor: '220–250 °C',
      porque: 'Es el rango orientativo que da Creality para PETG.',
      alcance: 'Creality FAQ; varía por marca, color y configuración, no es universal.',
      cuando: { material: 'petg' },
      fuente: 'Creality',
    },
    {
      id: 'secciones-pla',
      accion: 'Si eliges el modelo PLA descrito, configura su secuencia de secciones',
      valor: '7 secciones · pasos de 5 °C: 220, 215, 210, 205, 200, 195, 190 °C',
      porque:
        'Es la secuencia del ejemplo PLA de 3D Printer Stuff, no una obligación de usar ese modelo.',
      alcance: 'Una sola guía secundaria, secuencia sin corroborar; ejemplo PLA dependiente del modelo y la capa, no receta para otros materiales.',
      cuando: { material: 'pla' },
      fuente: '3D Printer Stuff',
    },
    {
      id: 'modelo-visible',
      accion: 'Busca un modelo con niveles claramente espaciados y visibles',
      porque:
        'La mayoría de STL de torre estándar no llevan indicadores de temperatura impresos; un modelo ajustable con cada paso marcado facilita la lectura.',
      alcance: 'Creality: buscar modelo con niveles claros y visibles.',
      fuente: 'Creality',
    },
    {
      id: 'creality-print',
      accion: 'En Creality Print, fija la temperatura a alturas de capa exactas',
      porque:
        'Pulsar "Filament" y luego el icono de pincel permite fijar la temperatura del extrusor a la altura de cada nivel de la torre.',
      alcance: 'Creality Print; alturas Z incorrectas aplican el cambio demasiado pronto o tarde.',
      cuando: { slicer: 'creality' },
      fuente: 'Creality',
    },
    {
      id: 'cura-changeatz',
      accion: 'En Cura, añade un script ChangeAtZ por sección',
      porque:
        'Creality indica Extensions > Post Processing > Modify G-Code > Add a script > Change at Height. Fija la altura Z y la temperatura de cada sección según tu modelo y previsualiza el G-code.',
      alcance: 'Procedimiento general de Creality; alturas según grosor de capa y capas del modelo, temperaturas según material, sin trasladar la secuencia PLA a otros materiales.',
      cuando: { slicer: 'cura' },
      fuente: 'Creality',
    },
    {
      id: 'cura-ejemplo-pla',
      accion: 'Usa la secuencia del ejemplo PLA sólo si coincide con tu modelo y capa',
      valor: 'Inicio 220 °C; 215 °C a 8,2 mm; 210 °C a 16,4 mm; 205 °C a 24,6 mm',
      porque:
        'Ilustra cómo enlazar los cambios con cada sección, no obliga a elegir este modelo. Comprueba los límites de las secciones antes de trasladar el ejemplo.',
      alcance: '3D Printer Stuff: una sola guía secundaria, sin corroborar; ejemplo PLA del modelo descrito, alturas dependientes del modelo y la capa.',
      cuando: { slicer: 'cura', material: 'pla' },
      fuente: '3D Printer Stuff',
    },
    {
      id: 'prusa-modifier',
      accion: 'No des por verificada la ruta de interfaz descrita para PrusaSlicer',
      porque:
        'El procedimiento por rangos sólo aparece en una guía secundaria. Este corpus no permite ofrecerlo como instrucciones oficialmente verificadas ni probadas en el programa.',
      alcance: '3D Printer Stuff: una sola fuente secundaria, sin corroboración oficial ni prueba del programa; límite documental, no afirmación de que el procedimiento sea falso.',
      cuando: { slicer: 'prusa' },
      fuente: '3D Printer Stuff',
    },
    {
      id: 'orca-auto-scale',
      accion: 'Deja activo "Auto-scale for nozzle" en OrcaSlicer',
      valor: 'Capa = mitad del diámetro; referencia: boquilla 0,4 mm / capa 0,2 mm',
      porque:
        'Escala la torre y calcula su capa para mantener visibles las características. Desactívalo sólo si quieres imprimir el modelo original de referencia.',
      alcance: 'Documentación de OrcaSlicer; activo por defecto, no sobrescribir la capa calculada para forzar la del ejemplo secundario.',
      cuando: { slicer: 'orca' },
      fuente: 'OrcaSlicer',
    },
    {
      id: 'orca-belt',
      accion: 'En impresora de banda, elige Standard u Overhang',
      porque:
        'Standard imprime una torre seccionada; Overhang imprime piezas en L invertida para evaluar voladizos por temperatura.',
      alcance: 'OrcaSlicer; sólo en impresora de banda.',
      cuando: { slicer: 'orca' },
      fuente: 'OrcaSlicer',
    },
    {
      id: 'cama-normal',
      accion: 'Conserva tu cama habitual de PLA, sin imponer la del ejemplo',
      valor: '60 °C: sólo ejemplo de cama PLA',
      porque:
        'La guía secundaria cita ese valor como habitual de PLA, pero el objetivo es mantener tu perfil, no cambiarlo para copiar la receta.',
      alcance: '3D Printer Stuff: una sola guía secundaria, cifra sin corroborar; sólo ejemplo PLA, no obligatorio ni aplicable a otros materiales.',
      cuando: { material: 'pla' },
      fuente: '3D Printer Stuff',
    },
    {
      id: 'ventilador',
      accion: 'Conserva tu refrigeración PLA; usa el ejemplo sólo si ya corresponde a tu perfil',
      valor: '100 % tras capa 3: ejemplo PLA',
      porque:
        '3D Printer Stuff lo llama un ajuste normal de PLA. No propone sustituir obligatoriamente cualquier perfil PLA: conserva el enfriamiento entre secciones.',
      alcance: 'Una sola guía secundaria, cifra sin corroborar; sólo ejemplo PLA, no una receta para ABS, PETG, TPU u otros materiales.',
      cuando: { material: 'pla' },
      fuente: '3D Printer Stuff',
    },
    {
      id: 'seco',
      accion: 'Considera probar el secado si sospechas humedad, aunque el carrete sea nuevo',
      porque:
        'Diem plantea esa posibilidad y propone secar, sin confirmar humedad ni documentar un ensayo de secado. El autor relató también menos hilos al bajar temperatura: no hay una causa única demostrada.',
      alcance: 'Foro Prusa, Diem: consejo de una sola fuente, sin corroborar el estado del carrete; no prueba de causalidad independiente de la temperatura ni de secado exitoso.',
      fuente: 'foro Prusa',
    },
    {
      id: 'leer-puente',
      accion: 'Compara las secciones buscando el puente más plano',
      porque:
        '3D Printer Stuff propone ese criterio y describe comba por calor y fallos de anclaje en frío. La forma por sí sola no identifica una causa exclusiva.',
      alcance: 'Una sola guía secundaria, sin corroborar el criterio detallado de anclajes/selección; Orca respalda la tendencia al combado por exceso de temperatura.',
      fuente: '3D Printer Stuff',
    },
    {
      id: 'leer-voladizo',
      accion: 'Si tu modelo incluye esos voladizos, compara su suavidad',
      valor: '60° frente a 45° en el modelo descrito',
      porque:
        '3D Printer Stuff usa el voladizo más exigente de su modelo para comparar comba y curvatura entre temperaturas.',
      alcance: 'Una sola guía secundaria, criterio dependiente del modelo y sin corroborar; no garantiza limpieza del ángulo menor en cualquier torre.',
      fuente: '3D Printer Stuff',
    },
    {
      id: 'leer-stringing',
      accion: 'Busca la sección con cero hilos entre pilares',
      porque:
        '3D Printer Stuff propone buscar menos hilos y revisar la retracción aparte si persisten en toda la torre. Orca advierte que demasiado frío también puede producir stringing y subextrusión.',
      alcance: 'Objetivo y revisión de retracción de una sola guía secundaria, inferencia sin corroborar y no exclusiva; bajar suele ayudar, pero no elegir siempre el mínimo.',
      fuente: '3D Printer Stuff',
    },
    {
      id: 'leer-adhesion',
      accion: 'Para piezas funcionales, prioriza la sección más difícil de romper',
      porque:
        '3D Printer Stuff propone esa prioridad aunque el acabado sea peor. Compara secciones que impriman correctamente, sin asumir que cada aumento de temperatura mejora la resistencia.',
      alcance: 'Una sola guía secundaria, prioridad funcional y selección por rotura sin corroborar; no ensayo normalizado. Orca sólo respalda la tendencia general de adhesión.',
      cuando: { uso: 'funcional' },
      fuente: '3D Printer Stuff',
    },
    {
      id: 'leer-visual',
      accion: 'Para modelos visuales, prioriza acabado y mínimo stringing',
      porque:
        'Compara los resultados observados dentro de un rango que imprima correctamente, no bajes sin límite. Demasiado frío también puede producir hilos, subextrusión o peor acabado.',
      alcance: 'Prioridad visual de 3D Printer Stuff: una sola guía secundaria, sin corroborar; no ley de mejora al bajar. Orca respalda el aviso de hilos y subextrusión por frío.',
      cuando: { uso: 'visual' },
      fuente: '3D Printer Stuff',
    },
    {
      id: 'leer-general',
      accion: 'Para uso general, elige el medio del rango que funcione bien en todo',
      valor: 'normalmente 5 °C por encima del mejor stringing',
      porque:
        'Busca equilibrio entre adhesión, acabado e hilos dentro del rango que imprima correctamente. El margen numérico es la propuesta de esa guía, no una corrección obligatoria.',
      alcance: '3D Printer Stuff: una sola guía secundaria, prioridad y margen sin corroborar; no desplaza la comparación de las secciones.',
      cuando: { uso: 'general' },
      fuente: '3D Printer Stuff',
    },
    {
      id: 'orca-medio',
      accion: 'Si un rango se ve bien, usa el medio como óptimo',
      porque:
        'OrcaSlicer recomienda usar el medio del rango bueno; si se imprimirá a mayor velocidad o flujo, considerar el extremo alto.',
      alcance: 'OrcaSlicer: considerar el extremo alto para mayor velocidad/flujo, no elevar sin límite.',
      cuando: { slicer: 'orca' },
      fuente: 'OrcaSlicer',
    },
    {
      id: 'validar-real',
      accion: 'Elige la temperatura según velocidad, flujo y resistencia previstos',
      porque:
        'OrcaSlicer pide equilibrar esos factores y considerar el extremo alto del rango bueno para mayor velocidad o flujo. Una preferencia visual no basta para garantizar imprimibilidad.',
      alcance: 'Criterio de OrcaSlicer, no ensayo de velocidad o caudal del foro; no se documentan allí comparaciones de tamaño, velocidad ni causa confirmada del paro.',
      fuente: 'OrcaSlicer',
    },
    {
      id: 'ambiente-estable',
      accion: 'Imprime la torre en un ambiente estable, sin corrientes',
      porque:
        'Una caída brusca de temperatura ambiente enfría el filamento demasiado rápido (uniones frágiles); una habitación muy caliente o con corrientes da enfriamiento no uniforme.',
      alcance: 'Creality: temperatura ambiente y corrientes.',
      fuente: 'Creality',
    },
    {
      id: 'colores',
      accion: 'Repite la torre si cambias de color del mismo fabricante',
      valor: '5–10 °C: diferencia posible según la fuente secundaria',
      porque:
        '3D Printer Stuff atribuye diferencias de temperatura óptima a los pigmentos. No asumas que el ajuste anterior se traslada sin comparar.',
      alcance: 'Una sola guía secundaria, diferencia y explicación sin corroborar; no una compensación que deba sumarse automáticamente.',
      fuente: '3D Printer Stuff',
    },
    {
      id: 'recalibrar',
      accion: 'Repite la comparación al cambiar de carrete o marca de PLA',
      valor: '195–218 °C: rango entre carretes afirmado por la fuente',
      porque:
        'La guía secundaria advierte que cada carrete e impresora puede tener un ajuste distinto; no asumas una temperatura única para todo PLA.',
      alcance: '3D Printer Stuff: una sola guía secundaria, sin corroborar y sin muestra ni método de ensayo documentados aquí; el rango no es universal.',
      cuando: { material: 'pla' },
      fuente: '3D Printer Stuff',
    },
  ],
  fueraDeAlcance: [
    {
      sintoma: 'Flow rate y caudal volumétrico',
      porQue: 'La torre no mide flujo; el flow rate y el max volumetric speed son pruebas aparte.',
      guia: 'flow-rate',
    },
    {
      sintoma: 'Temperatura de cama',
      porQue: 'La temperatura de cama se mantiene normal durante la prueba; su calibración es otro tema.',
      guia: 'temperatura-cama',
    },
    {
      sintoma: 'Retracción y stringing por humedad',
      porQue: '3D Printer Stuff propone revisar retracción si persisten hilos en todas las secciones, sin diagnóstico exclusivo; la humedad es una posibilidad no confirmada por ese aspecto.',
      guia: 'temperatura-hotend',
    },
    {
      sintoma: 'Altura de capa',
      porQue: 'La elección general de capa es otro tema: aquí no hay una altura universal; Orca calcula la capa con su autoescalado y los valores de la guía secundaria son ejemplos.',
      guia: 'altura-capa',
    },
    {
      sintoma: 'Voladizos y soportes como tema completo',
      porQue: 'La torre incluye pruebas de voladizos, pero el diseño de soportes es otro tema.',
      guia: 'voladizos-y-soportes',
    },
  ],
  fuentes: [
    {
      url: 'https://www.creality.com/blog/temperature-tower',
      quien: 'Creality',
      que: 'Torre de temperatura: definición, rangos por material, configuración en Creality Print, criterios de lectura.',
    },
    {
      url: 'https://www.3dprinterstuff.com/workshop/temperature-tower-calibration',
      quien: '3D Printer Stuff',
      que: 'Guía secundaria: ejemplos de configuración y perfil, criterios detallados y prioridades de uso sin corroborar en los aspectos señalados; no verificación oficial de PrusaSlicer.',
    },
    {
      url: 'https://github.com/OrcaSlicer/OrcaSlicer/wiki/temp_calib',
      quien: 'OrcaSlicer',
      que: 'Calibración de temperatura: auto-escalado por boquilla, interpretación y resolución.',
    },
    {
      url: 'https://wiki.bambulab.com/en/bambu-studio/Calibration',
      quien: 'Bambu Lab Wiki',
      que: 'Pruebas de calibración: flow rate, PA, retracción, max flowrate, VFA.',
    },
    {
      url: 'https://forum.prusa3d.com/forum/original-prusa-i3-mk3s-mk3-assembly-and-first-prints-troubleshooting/temperature-tower-3/',
      quien: 'foro Prusa',
      que: 'Testimonio de torre PLA y paro posterior, con sospecha de obstrucción no confirmada; consejo de Diem sobre posible humedad y opinión PLA de Avinash. Sin ensayo causal ni secado documentado.',
    },
  ],
};
