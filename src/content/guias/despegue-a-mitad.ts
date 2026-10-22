import type { Guia } from './tipos';
import { AUTOR } from './autor.ts';

export const despegueAMitad: Guia = {
  slug: 'despegue-a-mitad',
  titulo: 'Despegue a mitad de impresión',
  resumen:
    'La pieza se despega, tumba o se desmorona a mitad.',
  resumenExtra:
    'Antes de subir la temperatura, distingue si es warping de esquinas, adhesión de cama o colapso: las causas y los ajustes no son los mismos.',
  sintoma: 'La pieza se despega o tumba a mitad',
  dibujo: 'colapso',
  entrada:
    'La pieza se despega o tumba a mitad de la impresión. Puede ser que las esquinas se levanten, que la pieza deslice o salte de la cama, o un colapso estructural con las capas superiores corridas. El punto de partida común es el agarre de la primera capa y el enfriamiento, pero el ajuste que arregla cada caso no es el mismo y cambiar la temperatura sin distinguirlos es la forma más directa de no resolver nada.',
  autor: AUTOR,
  actualizado: '2026-10-16',
  minutos: 5,

  diferencial: {
    contra: 'warping de esquinas, separación entre capas, desplazamiento y pie de elefante',
    contraCorto: 'warping o separación',
    comprobaciones: [
      {
        id: 'cuando',
        mira: '¿Cuándo falla la pieza?',
        si: 'Empieza bien y falla a mitad, con la pieza levantada en esquinas, saltada de cama o tumbada. Es despegue a mitad.',
        no: 'Falla desde la primera capa o la base está mal. Eso no es este caso.',
      },
      {
        id: 'forma',
        mira: '¿Cómo es el daño?',
        si: 'Esquinas o bordes curvados hacia arriba, pieza deslizada o salida en bloque, o nido de pájaro con capas superiores corridas.',
        no: 'Corte limpio por dentro (separación), pieza entera corrida (desplazamiento) o base más ancha (pie de elefante). No es este.',
      },
      {
        id: 'union',
        mira: '¿La unión entre capas está intacta?',
        si: 'Sí: no se abre por dentro. Entonces el problema es de adhesión a la cama o mecánico, no de unión de capas.',
        no: 'Se abre con corte limpio o desgarrado. Es separación entre capas y el ajuste es otro.',
      },
    ],
    siNo: { guia: 'capas-desplazadas', etiqueta: 'Capas desplazadas' },
  },

  variables: [
    {
      id: 'material',
      etiqueta: 'Material',
      indicador: 'material',
      para: 'El ranking de riesgo de warping va de PC a PLA, y los rangos de cama cambian por material.',
      necesaria: true,
      campos: ['material'],
      opciones: [
        { id: 'pla', etiqueta: 'PLA', detalle: 'El menos propenso de los rígidos' },
        { id: 'pla-cf', etiqueta: 'PLA-CF' },
        { id: 'petg', etiqueta: 'PETG', detalle: 'Similar al PLA en riesgo de warping' },
        { id: 'abs', etiqueta: 'ABS o ASA', detalle: 'Warpean casi siempre sin cámara cerrada' },
        { id: 'pa', etiqueta: 'PA o variantes' },
        { id: 'pc', etiqueta: 'PC o PC-CF', detalle: 'El extremo alto del ranking de riesgo' },
      ],
    },
    {
      id: 'chapa',
      etiqueta: 'Chapa',
      indicador: 'cama',
      para: 'Decide la cifra de cama y la adhesión de la primera capa; más que el fabricante.',
      necesaria: true,
      opciones: [
        { id: 'cool', etiqueta: 'Cool Plate', detalle: 'PLA: 35–45 °C' },
        { id: 'textured', etiqueta: 'Textured PEI', detalle: 'PLA: 45–65 °C' },
        { id: 'smooth', etiqueta: 'Smooth PEI', detalle: 'PLA: 45–65 °C' },
        { id: 'engineering', etiqueta: 'Engineering Plate', detalle: 'PLA: 45–65 °C' },
        { id: 'acero', etiqueta: 'Acero liso' },
      ],
    },
    {
      id: 'fallo',
      etiqueta: 'Tipo de fallo',
      indicador: 'general',
      para: 'Las tres caras del despegue a mitad no se arreglan con lo mismo.',
      necesaria: true,
      opciones: [
        { id: 'esquinas', etiqueta: 'Esquinas o bordes que se levantan' },
        { id: 'cama', etiqueta: 'La pieza se desliza o salta de la cama' },
        { id: 'colapso', etiqueta: 'Nido de pájaro o capas superiores corridas' },
      ],
    },
    {
      id: 'tamaño',
      etiqueta: 'Tamaño o forma de la pieza',
      indicador: 'geometria',
      para: 'Los modelos grandes y planos warpean más; los altos y finos se tumban.',
      necesaria: true,
      opciones: [
        { id: 'grande', etiqueta: 'Grande y plana', detalle: 'La más propensa al warping' },
        { id: 'mediana', etiqueta: 'Mediana' },
        { id: 'pequena', etiqueta: 'Pequeña', detalle: 'Poco apoyo en la cama' },
        { id: 'alta-delgada', etiqueta: 'Alta y delgada', detalle: 'Propensa a tumba' },
      ],
    },
    {
      id: 'cama',
      etiqueta: 'Temperatura de cama ahora',
      indicador: 'cama',
      para: 'La contradicción entre fabricantes se explica por esto: con la cama alta y el filamento blando, el calor de la cámara pasa a ser un problema propio.',
      campos: ['bedTemp'],
      opciones: [
        { id: 'baja', etiqueta: 'Baja o sin cama', detalle: 'PLA en Cool Plate a 35 °C' },
        { id: 'media', etiqueta: 'Media', detalle: 'El rango habitual del PLA' },
        { id: 'alta', etiqueta: 'Alta', detalle: 'Por encima de 45 °C' },
      ],
    },
    {
      id: 'infill',
      etiqueta: 'Patrón de relleno',
      indicador: 'velocidad',
      para: 'Grid y Triangles cruzan en una capa y generan bultos que la boquilla golpea o tensión lineal interna.',
      opciones: [
        { id: 'cruzado', etiqueta: 'Grid o Triangles', detalle: 'Cruzan en una sola capa' },
        { id: 'gyroid', etiqueta: 'Gyroid o similar', detalle: 'Se contrae uniforme' },
        { id: 'otro', etiqueta: 'Otro patrón' },
      ],
    },
    {
      id: 'ventana',
      etiqueta: '¿Dónde está la impresora?',
      indicador: 'entorno',
      para: 'Por debajo de 20 °C aparece warping incluso en PLA, y una corriente de aire basta para enfriar un lado.',
      opciones: [
        { id: 'cerrada', etiqueta: 'Estructura cerrada' },
        { id: 'abierta', etiqueta: 'Estructura abierta' },
        { id: 'corriente', etiqueta: 'Con corriente de aire cerca', detalle: 'Ventana, aire acondicionado, ventilador' },
      ],
    },
    {
      id: 'camara',
      etiqueta: '¿Trabajabas con puerta/tapa cerrada?',
      indicador: 'maquina',
      para: 'La contradicción entre fabricantes se explica por esto, no por la marca.',
      opciones: [
        { id: 'cerrada', etiqueta: 'Sí, cerrada' },
        { id: 'abierta', etiqueta: 'No, abierta o sin tapa' },
      ],
    },
  ],

  conocimiento: [
    {
      id: 'mecanismo',
      titulo: 'Por qué se levanta',
      puntos: [
        'Es contracción térmica, no un ajuste mal puesto.',
        'El filamento sale fundido y la pieza se enfría; los bordes exteriores se enfrían antes que el centro,.',
        'y esa diferencia genera una tensión que tira de las esquinas hacia arriba y puede terminar en despegue total.',
      ],
      indicador: 'temperatura',
      cuerpo:
        'Es contracción térmica, no un ajuste mal puesto. El filamento sale fundido y la pieza se enfría; los bordes exteriores se enfrían antes que el centro, y esa diferencia genera una tensión que tira de las esquinas hacia arriba y puede terminar en despegue total.',
      cita: {
        texto: 'the edges cool down quicker which causes the material to shrink and pull the corners up',
        fuente: 'wiki.bambulab.com',
      },
    },
    {
      id: 'tres-caras',
      titulo: 'Las tres caras del despegue a mitad',
      puntos: [
        'Warping o corner lifting: las esquinas o bordes se curvan hacia arriba fuera de la cama, a veces a mitad,.',
        'y se puede ver una línea horizontal ondulada en el lateral donde la boquilla volvió a golpear la capa levantada.',
        'Fallo de adhesión: el modelo completo se desplaza, desliza o salta de la cama.',
        'Colapso estructural: la parte superior parece un nido de pájaro o las capas superiores quedan desplazadas lateralmente respecto a la base.',
        'Las tres pasan en plena impresión, pero son causas distintas.',
      ],
      indicador: 'calibracion',
      cuerpo:
        'Warping o corner lifting: las esquinas o bordes se curvan hacia arriba fuera de la cama, a veces a mitad, y se puede ver una línea horizontal ondulada en el lateral donde la boquilla volvió a golpear la capa levantada. Fallo de adhesión: el modelo completo se desplaza, desliza o salta de la cama. Colapso estructural: la parte superior parece un nido de pájaro o las capas superiores quedan desplazadas lateralmente respecto a la base. Las tres pasan en plena impresión, pero son causas distintas.',
      cita: {
        texto: 'Corner lifting / warping: ... Bed adhesion failure: ... Structural collapse: ...',
        fuente: 'wiki.bambulab.com',
      },
    },
    {
      id: 'riesgo',
      titulo: 'El ranking de riesgo de warping',
      puntos: [
        'Bambu ordena por riesgo de warping los materiales propensos a contraerse: PC → PA-CF → PA → ABS → ASA → PETG → PLA.',
        'Son siete, y el PLA es el último.',
        'Ordena esos siete, no todos los rígidos, y no dice cuántas veces viene del ajuste y cuántas del material.',
      ],
      indicador: 'material',
      cuerpo:
        'Bambu ordena por riesgo de warping los materiales propensos a contraerse: PC → PA-CF → PA → ABS → ASA → PETG → PLA. Son siete, y el PLA es el último. Ordena esos siete, no todos los rígidos, y no dice cuántas veces viene del ajuste y cuántas del material.',
      cifra: { valor: '7 → 1', nota: 'PC el más propenso; PLA el menos' },
    },
    {
      id: 'easy',
      titulo: 'La primera capa y el problema a mitad no son lo mismo',
      puntos: [
        'Filamento que se contrae al enfriarse levanta las esquinas sólo si la base no se sujetó bien.',
        'por eso el agarre inicial es el Tier 1 que Bambu atribuye a aproximadamente el 80 % de los fallos de warping y adhesión.',
        'Si las esquinas levantan pero la pieza no se suelta, no es adhesión nula: es contracción sobre una unión que no aguantó.',
      ],
      indicador: 'calibracion',
      cuerpo:
        'Filamento que se contrae al enfriarse levanta las esquinas sólo si la base no se sujetó bien; por eso el agarre inicial es el Tier 1 que Bambu atribuye a aproximadamente el 80 % de los fallos de warping y adhesión. Si las esquinas levantan pero la pieza no se suelta, no es adhesión nula: es contracción sobre una unión que no aguantó.',
      cifra: { valor: '~80 %', nota: 'limpieza + nivelación + boquilla (Bambu)' },
    },
    {
      id: 'cama-bambu',
      titulo: 'La cifra de cama depende de la chapa',
      cuando: { material: ['pla', 'pla-cf'], fallo: 'esquinas' },
      puntos: [
        'Bambu da dos rangos para el PLA por chapa: 35–45 °C con Cool Plate y 45–65 °C con Textured PEI, Smooth PEI y Engineering Plate.',
        'No se contradicen: son la misma fila leída por columnas distintas.',
        'Si tu chapa no es la Cool Plate, el 35–45 no es el tuyo.',
      ],
      indicador: 'cama',
      cuerpo:
        'Bambu da dos rangos para el PLA por chapa: 35–45 °C con Cool Plate y 45–65 °C con Textured PEI, Smooth PEI y Engineering Plate. No se contradicen: son la misma fila leída por columnas distintas. Si tu chapa no es la Cool Plate, el 35–45 no es el tuyo.',
      cifra: { valor: '35–65 °C', nota: 'PLA según chapa (Bambu)' },
      cita: {
        texto: 'with the Cool Plate the PLA asks for 35 – 45 ℃',
        fuente: 'wiki.bambulab.com',
      },
      enlaza: { guia: 'temperatura-cama', etiqueta: 'Ver las seis cifras' },
    },
    {
      id: 'cama-abs',
      titulo: 'ABS, ASA y cama alta',
      cuando: { material: 'abs', fallo: ['esquinas', 'cama'] },
      puntos: [
        'Simplify3D sitúa el ABS en 100–120 °C y Bambu en 90–100 °C. Para ABS, ASA, PA y PC la cámara cerrada con cama calentada es esencial.',
        'en impresoras open-frame conviene subir la cama unos +10 °C para compensar cuando hace frío.',
        'Una pieza de ABS de 100 mm que enfría de 230 °C a 30 °C se encoge casi 1,5 mm.',
      ],
      indicador: 'maquina',
      cuerpo:
        'Simplify3D sitúa el ABS en 100–120 °C y Bambu en 90–100 °C. Para ABS, ASA, PA y PC la cámara cerrada con cama calentada es esencial; en impresoras open-frame conviene subir la cama unos +10 °C para compensar cuando hace frío. Una pieza de ABS de 100 mm que enfría de 230 °C a 30 °C se encoge casi 1,5 mm.',
      cifra: { valor: '100–120 °C', nota: 'ABS (Simplify3D)' },
    },
    {
      id: 'abs-contraccion',
      titulo: 'La contracción del ABS por tamaño',
      cuando: { material: 'abs' },
      puntos: [
        'El ABS se contrae casi un 1,5 % al pasar de 230 °C a temperatura ambiente.',
        'una pieza de 100 mm de ABS que enfría de 230 °C a 30 °C se encoge casi 1,5 mm. Por eso los modelos grandes y planos en ABS warpean casi.',
        'siempre sin cámara cerrada.',
      ],
      indicador: 'temperatura',
      cuerpo:
        'El ABS se contrae casi un 1,5 % al pasar de 230 °C a temperatura ambiente: una pieza de 100 mm de ABS que enfría de 230 °C a 30 °C se encoge casi 1,5 mm. Por eso los modelos grandes y planos en ABS warpean casi siempre sin cámara cerrada.',
      cifra: { valor: '1,5 %', nota: 'ABS al pasar de 230 °C a ambiente' },
    },
    {
      id: 'petg-alcance',
      titulo: 'PETG: parecido al PLA en riesgo',
      cuando: { material: 'petg', fallo: ['esquinas', 'cama'] },
      puntos: [
        'Bambu sitúa el PETG justo por encima del PLA en el ranking de riesgo, y su rango de cama es 60–80 °C en la tabla por filamento.',
        'El mismo cuidado de enfriamiento y adhesión que con el PLA,.',
        'pero sin bajar la guardia en la humedad ni en la adhesión excesiva con superficies PEI.',
      ],
      indicador: 'calibracion',
      cuerpo:
        'Bambu sitúa el PETG justo por encima del PLA en el ranking de riesgo, y su rango de cama es 60–80 °C en la tabla por filamento. El mismo cuidado de enfriamiento y adhesión que con el PLA, pero sin bajar la guardia en la humedad ni en la adhesión excesiva con superficies PEI.',
      cifra: { valor: '60–80 °C', nota: 'PETG (Bambu)' },
    },
    {
      id: 'cooling-pla',
      titulo: 'Enfriamiento del PLA: suficiente, pero no a lo loco',
      cuando: { material: ['pla', 'pla-cf', 'petg'], fallo: 'esquinas' },
      puntos: [
        'PLA y PETG necesitan mucho cooling, pero PLA puede warpear por cooling excesivo.',
        'deshabilitar el cooling en las primeras 3 capas ayuda a que la primera capa se pegue y el conjunto se asiente.',
        'El ventilador auxiliar a alta velocidad enfría las paredes exteriores demasiado rápido: bajarlo a 40–50 % o reducirlo 20–30 % ayuda,.',
        'sobre todo en objetos pequeños o con voladizos.',
      ],
      indicador: 'ventilacion',
      cuerpo:
        'PLA y PETG necesitan mucho cooling, pero PLA puede warpear por cooling excesivo; deshabilitar el cooling en las primeras 3 capas ayuda a que la primera capa se pegue y el conjunto se asiente. El ventilador auxiliar a alta velocidad enfría las paredes exteriores demasiado rápido: bajarlo a 40–50 % o reducirlo 20–30 % ayuda, sobre todo en objetos pequeños o con voladizos.',
      cita: {
        texto: 'PLA and PETG benefit from as much cooling as possible',
        fuente: 'help.prusa3d.com',
      },
    },
    {
      id: 'cooling-contradiccion',
      titulo: 'Dos fuentes, dos direcciones de ventilador',
      cuando: { material: ['pla', 'pla-cf', 'petg'] },
      puntos: [
        'Bambu parte de que el cooling excesivo (sobre todo el auxiliar) desencadena el warping de esquinas y recomienda bajarlo.',
        'Prusa parte de que PLA necesita mucho cooling y que un ventilador parado o insuficiente puede levantar las esquinas,.',
        'y sugiere activarlo y subirlo.',
        'Ambas coinciden en los extremos (0 % en ABS; full demasiado pronto perjudica ABS).',
        'El corpus no resuelve cuál aplicar en un caso intermedio; ambas se exponen.',
      ],
      indicador: 'ventilacion',
      cuerpo:
        'Bambu parte de que el cooling excesivo (sobre todo el auxiliar) desencadena el warping de esquinas y recomienda bajarlo. Prusa parte de que PLA necesita mucho cooling y que un ventilador parado o insuficiente puede levantar las esquinas, y sugiere activarlo y subirlo. Ambas coinciden en los extremos (0 % en ABS; full demasiado pronto perjudica ABS). El corpus no resuelve cuál aplicar en un caso intermedio; ambas se exponen.',
      cifra: { valor: 'Bambu ↓ vs Prusa ↑', nota: 'desacuerdo sin resolver' },
    },
    {
      id: 'ambiente',
      titulo: 'Temperatura ambiente y corrientes',
      puntos: [
        'Si la habitación está por debajo de 20 °C aparece warping incluso con PLA y PETG.',
        'Corrientes de aire (ventana, aire acondicionado, ventilador de mesa) enfrían un lado más rápido que el otro.',
        'Bloquear el flujo, cerrar puerta y tapa superior en máquinas cerradas, o aislar la impresora si está al aire.',
      ],
      indicador: 'ventilacion',
      cuerpo:
        'Si la habitación está por debajo de 20 °C aparece warping incluso con PLA y PETG. Corrientes de aire (ventana, aire acondicionado, ventilador de mesa) enfrían un lado más rápido que el otro. Bloquear el flujo, cerrar puerta y tapa superior en máquinas cerradas, o aislar la impresora si está al aire.',
      cita: {
        texto: 'if the room temperature is lower than 20 degrees C, there may be warping issues even when printing PLA & PETG',
        fuente: 'wiki.bambulab.com',
      },
    },
    {
      id: 'recinto-cautela',
      titulo: 'Recinto: esencial en unas, problemático en otras',
      puntos: [
        'Para ABS, ASA, PA y PC la impresora cerrada con cámara calentada es esencial.',
        'En impresoras open-frame (A1) conviene subir la cama otros +10 °C para compensar cuando hace frío.',
        'Pero imprimir PLA o PETG en recinto puede no ser buena idea,.',
        'porque necesitan mucho cooling y es difícil lograrlo con temperatura ambiente alta.',
      ],
      indicador: 'ventilacion',
      cuerpo:
        'Para ABS, ASA, PA y PC la impresora cerrada con cámara calentada es esencial. En impresoras open-frame (A1) conviene subir la cama otros +10 °C para compensar cuando hace frío. Pero imprimir PLA o PETG en recinto puede no ser buena idea, porque necesitan mucho cooling y es difícil lograrlo con temperatura ambiente alta.',
      cita: {
        texto: 'printing PLA or PETG in an enclosure might not be a good idea',
        fuente: 'help.prusa3d.com',
      },
    },
    {
      id: 'infill',
      titulo: 'Relleno: cantidad y patrón',
      puntos: [
        'Relleno por defecto 15 %; evitar más de 50 % (caso típico que provoca warping: 60 %).',
        'Para piezas estructurales, 5 paredes y unos 25 %; para no estructurales, 2 paredes y 15 %.',
        'Grid y Triangles crean tensión lineal interna; Gyroid se contrae de forma uniforme en todas direcciones.',
        'Los patrones que cruzan (Grid, Triangles) además generan un bulto mínimo dentro de una capa que la boquilla engancha en el siguiente pase,.',
        'que es la vía del colapso.',
      ],
      indicador: 'temperatura',
      cuerpo:
        'Relleno por defecto 15 %; evitar más de 50 % (caso típico que provoca warping: 60 %). Para piezas estructurales, 5 paredes y unos 25 %; para no estructurales, 2 paredes y 15 %. Grid y Triangles crean tensión lineal interna; Gyroid se contrae de forma uniforme en todas direcciones. Los patrones que cruzan (Grid, Triangles) además generan un bulto mínimo dentro de una capa que la boquilla engancha en el siguiente pase, que es la vía del colapso.',
      cifra: { valor: '≤25 %', nota: 'Gyroid, techo recomendado' },
    },
    {
      id: 'brim',
      titulo: 'Brim, brim ears y raft',
      puntos: [
        'Brim de 8–10 mm para PLA que levanta esquinas; si sólo fallan dos esquinas,.',
        'brim ears pintados dirigidos únicamente a ellas es mejor que un brim entero.',
        'El brim aumenta el área de contacto con la cama; si no basta, añadir una pequeña geometría (un cilindro) en la zona problemática.',
        'El brim o el raft ayudan a sujetar los bordes; por su altura (pocas capas) warpean menos.',
        'Para piezas pequeñas sin suficiente apoyo, brim o raft aumenta el área de contacto con la cama.',
      ],
      indicador: 'cama',
      cuerpo:
        'Brim de 8–10 mm para PLA que levanta esquinas; si sólo fallan dos esquinas, brim ears pintados dirigidos únicamente a ellas es mejor que un brim entero. El brim aumenta el área de contacto con la cama; si no basta, añadir una pequeña geometría (un cilindro) en la zona problemática. El brim o el raft ayudan a sujetar los bordes; por su altura (pocas capas) warpean menos. Para piezas pequeñas sin suficiente apoyo, brim o raft aumenta el área de contacto con la cama.',
      cifra: { valor: '8–10 mm', nota: 'brim para esquinas que levantan' },
    },
    {
      id: 'limpieza-placa',
      titulo: 'Limpiar la placa: tres rutinas, complementarias',
      puntos: [
        'Bambu prioriza agua templada y jabón, enjuagar y secar al aire, sin tocar con las manos después.',
        'Prusa combina IPA al 90 %+ antes de imprimir, con acetona una vez al mes en las rutinas del foro.',
        'Simplify3D acepta agua o alcohol isopropílico.',
        'Las rutinas no se excluyen: son alternativas según fabricante y superficie.',
        'Acetona mensual aparece sólo en el foro de Prusa.',
      ],
      indicador: 'geometria',
      cuerpo:
        'Bambu prioriza agua templada y jabón, enjuagar y secar al aire, sin tocar con las manos después. Prusa combina IPA al 90 %+ antes de imprimir, con acetona una vez al mes en las rutinas del foro. Simplify3D acepta agua o alcohol isopropílico. Las rutinas no se excluyen: son alternativas según fabricante y superficie. Acetona mensual aparece sólo en el foro de Prusa.',
      cita: {
        texto: 'wash the plate with warm water and soap',
        fuente: 'wiki.bambulab.com',
      },
    },
    {
      id: 'adhesion-fallos',
      titulo: 'Adhesión de primera capa: las causas mecánicas',
      puntos: [
        'La placa debe estar nivelada; la boquilla demasiado lejos o demasiado cerca empeora la adhesión.',
        'Las huellas o grasa son la causa número uno.',
        'Seleccionar mal el tipo de placa en el slicer desactiva el descenso de 0,04 mm de la Textured PEI y deja la boquilla demasiado alta.',
        'Z-offset demasiado alto deja la boquilla lejos.',
        'La primera capa debe quedar ligeramente aplastada, no flotando.',
      ],
      indicador: 'calibracion',
      cuerpo:
        'La placa debe estar nivelada; la boquilla demasiado lejos o demasiado cerca empeora la adhesión. Las huellas o grasa son la causa número uno. Seleccionar mal el tipo de placa en el slicer desactiva el descenso de 0,04 mm de la Textured PEI y deja la boquilla demasiado alta. Z-offset demasiado alto deja la boquilla lejos. La primera capa debe quedar ligeramente aplastada, no flotando.',
      cita: {
        texto: 'Z-offset is set too high ... nozzle being too far away from the bed',
        fuente: 'wiki.bambulab.com',
      },
    },
    {
      id: 'z-offset-detalle',
      titulo: 'Offset fino para mejorar adhesión',
      puntos: [
        'Z-offset físico: subirlo 0,05–0,1 mm (Simplify3D usa −0,05 mm para acercar 0,05 mm).',
        'Cada layer suele ser de unos 0,2 mm, de modo que un ajuste pequeño tiene gran efecto.',
        'Bajar un poco el Live Adjust Z aumenta la adhesión sin sobrecosquir la primera capa.',
        'con PETG o PC la adhesión puede ser excesiva y dañar la chapa PEI.',
      ],
      indicador: 'calibracion',
      cuerpo:
        'Z-offset físico: subirlo 0,05–0,1 mm (Simplify3D usa −0,05 mm para acercar 0,05 mm). Cada layer suele ser de unos 0,2 mm, de modo que un ajuste pequeño tiene gran efecto. Bajar un poco el Live Adjust Z aumenta la adhesión sin sobrecosquir la primera capa; con PETG o PC la adhesión puede ser excesiva y dañar la chapa PEI.',
      cifra: { valor: '0,05–0,1 mm', nota: 'subir Z-offset (Creality)' },
    },
    {
      id: 'first-layer-slow',
      titulo: 'Primera capa lenta',
      puntos: [
        'Imprimir el primer layer más despacio ayuda a que el plástico se pegue antes de la siguiente capa.',
        'Bambu y Simplify3D lo citan como ajuste directo para la adhesión de la primera capa.',
        'Suele bastar con ponerla al 50 %.',
      ],
      indicador: 'calibracion',
      cuerpo:
        'Imprimir el primer layer más despacio ayuda a que el plástico se pegue antes de la siguiente capa; Bambu y Simplify3D lo citan como ajuste directo para la adhesión de la primera capa. Suele bastar con ponerla al 50 %.',
      cifra: { valor: '50 %', nota: 'velocidad de primera capa' },
    },
    {
      id: 'adhesivos',
      titulo: 'Adhesivos, cintas y superficies',
      puntos: [
        'Glue stick como booster de emergencia para filamentos tozudos (ABS, ASA, PA, PC), en capa fina y uniforme.',
        'también actúa como capa de separación que protege la chapa.',
        'PLA suele pegar bien sobre cinta de pintor azul; ABS, sobre Kapton/Polyimide film; BuildTak suele sujetar PLA.',
        'el vidrio borosilicato va bien con ABS caliente.',
        'Spray de cabello y glue sticks funcionan si todo lo demás falla.',
      ],
      indicador: 'cama',
      cuerpo:
        'Glue stick como booster de emergencia para filamentos tozudos (ABS, ASA, PA, PC), en capa fina y uniforme; también actúa como capa de separación que protege la chapa. PLA suele pegar bien sobre cinta de pintor azul; ABS, sobre Kapton/Polyimide film; BuildTak suele sujetar PLA; el vidrio borosilicato va bien con ABS caliente. Spray de cabello y glue sticks funcionan si todo lo demás falla.',
      cita: {
        texto: 'Glue stick as an emergency booster for stubborn filaments',
        fuente: 'wiki.bambulab.com',
      },
    },
    {
      id: 'peí-excesiva',
      titulo: 'Adhesión excesiva daña la chapa',
      puntos: [
        'Con PETG o PC la adhesión puede ser excesiva y dañar la superficie PEI: riesgo mecánico y químico.',
        'Por eso el glue stick actúa también como capa de separación en esos materiales.',
      ],
      indicador: 'calibracion',
      cuerpo:
        'Con PETG o PC la adhesión puede ser excesiva y dañar la superficie PEI: riesgo mecánico y químico. Por eso el glue stick actúa también como capa de separación en esos materiales.',
    },
    {
      id: 'collapse',
      titulo: 'Colapso estructural: mecánica, no temperatura',
      puntos: [
        'La parte superior parece un nido de pájaro o las capas superiores quedan desplazadas lateralmente respecto a la base.',
        'Causa mecánica o de adhesión: la boquilla derribó un modelo alto y delgado por vibración a alta velocidad.',
        'los patrones de relleno que cruzan (Grid, Triangles) generan pequeños bultos que la boquilla engancha en el siguiente pase.',
        'o las correas flojas dan "slop" mecánico.',
      ],
      indicador: 'calibracion',
      cuerpo:
        'La parte superior parece un nido de pájaro o las capas superiores quedan desplazadas lateralmente respecto a la base. Causa mecánica o de adhesión: la boquilla derribó un modelo alto y delgado por vibración a alta velocidad; los patrones de relleno que cruzan (Grid, Triangles) generan pequeños bultos que la boquilla engancha en el siguiente pase; o las correas flojas dan "slop" mecánico.',
      cita: {
        texto: 'the nozzle knocked down a tall and thin model through vibration at high speed',
        fuente: 'wiki.bambulab.com',
      },
    },
    {
      id: 'belts',
      titulo: 'Correas y su tensión',
      puntos: [
        'Una correa floja produce un clic o traqueteo irregular en los ejes X o Y durante la impresión; una correa bien tensada se siente firme,.',
        'como una cuerda de guitarra, con ligero rebote.',
        'Es la causa principal de capas desplazadas y también entra en el colapso.',
      ],
      indicador: 'general',
      cuerpo:
        'Una correa floja produce un clic o traqueteo irregular en los ejes X o Y durante la impresión; una correa bien tensada se siente firme, como una cuerda de guitarra, con ligero rebote. Es la causa principal de capas desplazadas y también entra en el colapso.',
      cita: {
        texto: 'a properly tensioned belt should feel firm, like a guitar string, with a slight bounce',
        fuente: 'wiki.bambulab.com',
      },
    },
    {
      id: 'speed-collapse',
      titulo: 'Velocidad y aceleración en modelos altos',
      cuando: { tamaño: 'alta-delgada', fallo: 'colapso' },
      puntos: [
        'Para modelos altos y finos que se tumban, reducir velocidad de impresión y aceleración en 20–30 %,.',
        'activar supports y considerar reorientar el modelo para que quede tumbado.',
        'Reducir velocidad puede ayudar mucho en materiales de alta propensión al warping para que el conjunto se asiente y las capas se fundan',
        'correctamente.',
      ],
      indicador: 'maquina',
      cuerpo:
        'Para modelos altos y finos que se tumban, reducir velocidad de impresión y aceleración en 20–30 %, activar supports y considerar reorientar el modelo para que quede tumbado. Reducir velocidad puede ayudar mucho en materiales de alta propensión al warping para que el conjunto se asiente y las capas se fundan correctamente.',
      cifra: { valor: '−20–30 %', nota: 'velocidad y aceleración' },
    },
    {
      id: 'infill-cruce',
      titulo: 'Patrones que cruzan: el bulto que golpea',
      cuando: { infill: 'cruzado', fallo: 'colapso' },
      puntos: [
        'Grid y Triangle cruzan en una sola capa y generan un bulto mínimo que la boquilla engancha en el siguiente pase.',
        'Cambiar a Line, Rectilinear, Gyroid o Concentric evita el cruce.',
        'Además, infill alto genera tensión lineal interna que contribuye al warping.',
      ],
      indicador: 'temperatura',
      cuerpo:
        'Grid y Triangle cruzan en una sola capa y generan un bulto mínimo que la boquilla engancha en el siguiente pase. Cambiar a Line, Rectilinear, Gyroid o Concentric evita el cruce. Además, infill alto genera tensión lineal interna que contribuye al warping.',
      cita: {
        texto: 'Grid and Triangle patterns create a small bump that the nozzle catches on the next pass',
        fuente: 'wiki.bambulab.com',
      },
    },
    {
      id: 'humedad',
      titulo: 'Humedad del filamento y adhesión',
      puntos: [
        'Si se oyen crujidos o petardeos al imprimir, o se ven superficies ásperas, burbujeantes o stringy, el filamento ha absorbido humedad.',
        'secar antes de reintentar.',
        'Guardar el filamento no usado en bolsas selladas o contenedores herméticos con gel de sílice.',
        'Nylon y PC absorben humedad en pocas horas en ambiente húmedo, no dejar en el portabobinas durante la noche.',
        'El PETG es el peor caso documentado para capas internas débiles.',
      ],
      indicador: 'calibracion',
      cuerpo:
        'Si se oyen crujidos o petardeos al imprimir, o se ven superficies ásperas, burbujeantes o stringy, el filamento ha absorbido humedad; secar antes de reintentar. Guardar el filamento no usado en bolsas selladas o contenedores herméticos con gel de sílice. Nylon y PC absorben humedad en pocas horas en ambiente húmedo, no dejar en el portabobinas durante la noche. El PETG es el peor caso documentado para capas internas débiles.',
    },
    {
      id: 'mantenimiento',
      titulo: 'Mantenimiento antes de diagnosticar',
      puntos: [
        'Revisar residuos en el piñón del extrusor; inspeccionar el tubo PTFE por grietas, amarilleo o bloqueos.',
        'confirmar que el cabezal se mueve libremente en X, Y, Z sin tirones ni rozaduras.',
        'Ejecutar el ABL tras mover la impresora, hacer mantenimiento o actualizar firmware.',
        'Comprobar que la boquilla esté instalada correctamente, con los clips bien fijados.',
      ],
      indicador: 'maquina',
      cuerpo:
        'Revisar residuos en el piñón del extrusor; inspeccionar el tubo PTFE por grietas, amarilleo o bloqueos; confirmar que el cabezal se mueve libremente en X, Y, Z sin tirones ni rozaduras. Ejecutar el ABL tras mover la impresora, hacer mantenimiento o actualizar firmware. Comprobar que la boquilla esté instalada correctamente, con los clips bien fijados.',
    },
    {
      id: 'no-es',
      titulo: 'Cuatro fallos que no son este',
      puntos: [
        'Warping mínimo puede pasar desapercibido pero aún así dejar defectos visibles en paredes laterales y capas superiores.',
        'es fácil confundirlo con extrusión o flujo.',
        'El colapso de piezas altas es mecánico, no térmico.',
        'La base plana con capas sueltas por dentro es separación.',
        'La base más ancha es pie de elefante.',
        'Y la pieza entera corrida es desplazamiento.',
      ],
      indicador: 'temperatura',
      cuerpo:
        'Warping mínimo puede pasar desapercibido pero aún así dejar defectos visibles en paredes laterales y capas superiores; es fácil confundirlo con extrusión o flujo. El colapso de piezas altas es mecánico, no térmico. La base plana con capas sueltas por dentro es separación. La base más ancha es pie de elefante. Y la pieza entera corrida es desplazamiento.',
      enlaza: { guia: 'separaciones-entre-capas', etiqueta: 'Separación entre capas' },
    },
  ],

  reglas: [
    {
      id: 'tier-limpiar',
      accion: 'Limpia la chapa con agua templada y jabón',
      valor: 'Enjuaga y deja secar al aire',
      porque:
        'Es el primero de los tres pasos que Bambu atribuye al 80 % de los fallos de warping y adhesión, y sale en la lista de correcciones rápidas. Después de limpiar, no toques la superficie con las manos.',
      cuando: { material: ['pla', 'pla-cf', 'petg', 'abs', 'pa', 'pc'], fallo: ['esquinas', 'cama', 'colapso'] },
      fuente: 'Bambu Lab',
      alcance: 'Los tres pasos resuelven ~80 % según el fabricante. El ventilador no está en esa lista.',
    },
    {
      id: 'tier-nivelar',
      accion: 'Nivela la cama',
      valor: 'Calibración automática completa',
      porque:
        'Segundo paso del mismo Tier 1, y Bambu lo pide especialmente después de mover la impresora, hacer mantenimiento o cambiar de chapa.',
      cuando: { material: ['pla', 'pla-cf', 'petg', 'abs', 'pa', 'pc'], fallo: ['esquinas', 'cama', 'colapso'] },
      fuente: 'Bambu Lab',
    },
    {
      id: 'tier-boquilla',
      accion: 'Comprueba que la boquilla está bien instalada',
      porque: 'Los clips tienen que estar apretados en la forma correcta para que no quede floja.',
      cuando: { material: ['pla', 'pla-cf', 'petg', 'abs', 'pa', 'pc'], fallo: ['esquinas', 'cama', 'colapso'] },
      fuente: 'Bambu Lab',
    },
    {
      id: 'plate-select',
      accion: 'Comprueba el tipo de placa seleccionado en el slicer',
      porque:
        'La placa Textured PEI baja la boquilla 0,04 mm tras nivelar. Si laminaste para otra placa, ese descenso no se aplica, la boquilla queda demasiado alta y empeora la adhesión del primer layer.',
      cuando: { chapa: 'textured', fallo: ['esquinas', 'cama'] },
      fuente: 'Bambu Lab',
      alcance: 'Es un error de una línea de perfil, no de la máquina.',
    },
    {
      id: 'z-offset',
      accion: 'Baja ligeramente la boquilla o sube el Z-offset',
      valor: 'Primer layer ligeramente aplastado',
      porque:
        'La primera capa debe quedar ligeramente aplastada, no flotando; la boquilla demasiado lejos empeora la adhesión. Bajar el Z-offset aumenta el aplastamiento. Simplify3D: −0,05 mm acerca 0,05 mm.',
      cuando: { fallo: ['cama', 'esquinas'], material: ['pla', 'pla-cf', 'petg', 'abs', 'pa', 'pc'] },
      fuente: 'Bambu Lab, Simplify3D',
      alcance: 'Si el primer layer ya está sobrecoplado, invertir: subir 0,05–0,1 mm.',
    },
    {
      id: 'z-offset-fisico',
      accion: 'Sube el Z-offset si la primera capa está sobrecoplada',
      valor: '0,05–0,1 mm',
      cuando: { fallo: 'cama', material: ['pla', 'pla-cf', 'petg', 'abs', 'pa', 'pc'], cama: ['alta', 'media'] },
      porque:
        'La boquilla demasiado cerca aplasta el filamento y la primera capa sobresale. Subir 0,05–0,1 mm y reimprimir un patrón de prueba.',
      fuente: 'Creality',
      alcance: 'Ajuste físico, no comparable ni promediable con el offset de firmware de la macro G29.1.',
    },
    {
      id: 'first-layer-slow',
      accion: 'Imprime la primera capa más despacio',
      valor: '50 %',
      porque:
        'Da tiempo a que el plástico se pegue antes de la siguiente capa; es ajuste directo de adhesión de primera capa.',
      cuando: { fallo: 'cama', material: ['pla', 'pla-cf', 'petg', 'abs', 'pa', 'pc'] },
      fuente: 'Bambu Lab, Simplify3D',
    },
    {
      id: 'limpiar-ipa',
      accion: 'Limpia la superficie con IPA al 90 %+ antes de imprimir',
      valor: 'IPA 90 % +',
      porque:
        'Prusa lo recomienda como rutina de limpieza primaria. Alternativa complementaria al jabón de Bambu, no excluyente.',
      cuando: { fallo: ['cama', 'esquinas'], material: ['pla', 'pla-cf', 'petg', 'abs', 'pa', 'pc'] },
      fuente: 'Prusa Research',
    },
    {
      id: 'seco',
      accion: 'Seca el filamento',
      porque:
        'Si se oyen crujidos o petardeos, o se ven superficies ásperas, burbujeantes o stringy, el filamento ha absorbido humedad: secar y reintentar. Nylon y PC absorben humedad en pocas horas.',
      cuando: { fallo: ['cama', 'esquinas'], material: ['pa', 'pc', 'petg'] },
      fuente: 'Bambu Lab',
      alcance: 'Sin temperatura de secado respaldada por estas fuentes; se deja la instrucción al secador del fabricante.',
    },
    {
      id: 'glue',
      accion: 'Aplica glue stick en capa fina y uniforme',
      porque:
        'Booster de emergencia para filamentos tozudos (ABS, ASA, PA, PC); actúa también como capa de separación que protege la chapa.',
      cuando: { material: ['abs', 'pa', 'pc'], fallo: 'cama' },
      fuente: 'Bambu Lab, Prusa Research',
    },
    {
      id: 'brim-adhesion',
      accion: 'Añade brim o raft para piezas pequeñas',
      valor: '5–10 mm',
      porque:
        'Aumenta el área de contacto con la cama; útil si la pieza no tiene superficie de apoyo suficiente para sujetarse.',
      cuando: { tamaño: 'pequena', fallo: 'cama' } ,
      fuente: 'Simplify3D',
      alcance: 'Ayuda a la adherencia; no corrige reborde (pie de elefante) ni reemplaza nivelación.',
    },
    {
      id: 'openframe-abs',
      accion: 'Sube la cama +10 °C en impresoras open-frame',
      valor: '+10 °C',
      porque:
        'Para ABS, ASA, PA y PC, en impresoras open-frame (A1) el +10 °C compensa la falta de cámara cuando hace frío.',
      cuando: { material: ['abs', 'pa', 'pc'], ventana: 'abierta', fallo: ['esquinas', 'cama'] },
      fuente: 'Bambu Lab',
    },
    {
      id: 'cama-cool',
      accion: 'Sube la temperatura de cama',
      valor: '35–45 °C',
      rango: { campo: 'bedTemp', min: 35, max: 45, unidad: '°C' },
      porque:
        'La dirección no tiene discusión: hay que subir. En Cool Plate el rango de la tabla es 35–45 °C, así que 65 °C queda fuera de él.',
      cuando: { chapa: 'cool', material: ['pla', 'pla-cf'], fallo: 'esquinas' },
      fuente: 'Bambu Lab',
      alcance: 'Ninguna fuente de este lote dice qué ocurre por salirse de rango en la Cool Plate.',
    },
    {
      id: 'cama-textured',
      accion: 'Sube la temperatura de cama',
      valor: '45–65 °C, objetivo 55–65 °C',
      rango: { campo: 'bedTemp', min: 45, max: 65, unidad: '°C' },
      porque:
        'Los 55–65 °C son el objetivo de diagnóstico de la página de warping y el 45–65 °C el intervalo de la tabla por chapa. No son lo mismo: el objetivo es una ventana más estrecha dentro del intervalo.',
      cuando: { chapa: ['textured', 'smooth', 'engineering'], material: ['pla', 'pla-cf'], fallo: 'esquinas' },
      fuente: 'Bambu Lab',
    },
    {
      id: 'cama-petg',
      accion: 'Sube la temperatura de cama',
      valor: '60–80 °C',
      rango: { campo: 'bedTemp', min: 60, max: 80, unidad: '°C' },
      porque:
        'Es el único rango del material que da Bambu en su tabla por filamento para PETG.',
      cuando: { material: 'petg', fallo: ['esquinas', 'cama'] },
      fuente: 'Bambu Lab',
    },
    {
      id: 'cama-abs',
      accion: 'Sube la temperatura de cama',
      valor: '90–100 °C',
      rango: { campo: 'bedTemp', min: 90, max: 100, unidad: '°C' },
      porque:
        'Rango de Bambu para ABS y ASA en su tabla por filamento. La opción «ABS o ASA» cubre los dos porque comparten fila en esa tabla.',
      cuando: { material: 'abs', fallo: ['esquinas', 'cama'] },
      fuente: 'Bambu Lab',
      alcance: 'Simplify3D sitúa ABS en 100–120 °C. El número depende de la chapa y del fabricante.',
    },
    {
      id: 'petg-cama-alta',
      accion: 'Baja la temperatura de cama si la base sale blanda',
      valor: 'PETG: bajar ~5 °C por prueba',
      porque:
        'Si la primera capa sobresale por calor, el reblandecimiento se corrige bajando la cama en incrementos de 5 °C. Con materiales que exigen cama alta, van antes los fixes mecánicos que la compensación.',
      cuando: { material: 'petg', fallo: 'esquinas', cama: 'alta', tamaño: 'grande' },
      fuente: 'Creality',
    },
    {
      id: 'ventilador-3',
      accion: 'Apaga el enfriamiento en las 3 primeras capas',
      valor: 'No cooling for the first 3 layers',
      porque:
        'Es el ajuste que Bambu señala como el más importante para el warping. Sin enfriamiento en esas capas la primera capa se enfría más despacio y se pega mejor.',
      cuando: { material: ['pla', 'pla-cf', 'petg'], fallo: 'esquinas' },
      fuente: 'Bambu Lab',
      alcance: 'Son las primeras capas de esta opción, no las del ventilador auxiliar. Son dos ajustes distintos.',
    },
    {
      id: 'aux-fan',
      accion: 'Ajusta el ventilador auxiliar',
      valor: '40–50 % o −20–30 %',
      porque:
        'Bambu lo dice de dos maneras en dos páginas: bajarlo a 40–50 %, o reducirlo 20–30 %. El corpus no resuelve cuál aplicar. El auxiliar a alta velocidad enfría demasiado rápido las paredes exteriores.',
      cuando: { material: ['pla', 'pla-cf', 'petg'], fallo: 'esquinas' },
      fuente: 'Bambu Lab',
      alcance: 'Dos cifras de la misma fuente en dos páginas; no se promedian.',
    },
    {
      id: 'fan-piezas-pequenas',
      accion: 'Activa ventilador de pieza bajo y lento en voladizos',
      valor: '10–20 %',
      porque:
        'Prusa pone los voladizos inclinados y las piezas pequeñas como condición: activarlo despacio, aunque el material no necesite refrigeración. El objetivo: «ni demasiado rápido ni demasiado despacio».',
      cuando: { tamaño: 'alta-delgada', material: ['abs', 'pc', 'pa'], fallo: 'esquinas' },
      fuente: 'Prusa Research',
      alcance: 'Es un «you may try», no una recomendación categórica; demasiada velocidad puede levantar el objeto entero.',
    },
    {
      id: 'brim',
      accion: 'Añade un brim o brim ears en las esquinas',
      valor: '8–10 mm de ancho',
      porque:
        'Un brim de 8 a 10 mm aumenta la superficie en contacto con la cama. Si sólo se levantan dos esquinas, brim ears dirigidos sólo a ellas es mejor que un brim entero.',
      cuando: { fallo: 'esquinas', material: ['pla', 'pla-cf', 'petg', 'abs', 'pa', 'pc'] },
      fuente: 'Bambu Lab',
    },
    {
      id: 'relleno',
      accion: 'Cambia el relleno a Gyroid',
      valor: '25 % como techo',
      porque:
        'Grid y Triangle crean tensión lineal interna y el Gyroid se contrae por igual en todas las direcciones. Bambu lo pone como opción con el 25 % de densidad como techo.',
      cuando: { infill: 'cruzado', fallo: ['esquinas', 'cama'] },
      fuente: 'Bambu Lab',
      alcance: 'Que Gyroid mejora lo dicen las dos fuentes; que cubic sea mejor tiene una sola fuente, de foro.',
    },
    {
      id: 'reducir-infill',
      accion: 'Reduce la densidad de relleno',
      valor: '≤25 % (estructural), 15 % (no estructural)',
      porque:
        'Relleno por defecto 15 %; evitar más de 50 % porque genera warping. Para piezas estructurales, 5 paredes y unos 25 %; para no estructurales, 2 paredes y 15 %.',
      cuando: { tamaño: 'grande', fallo: 'esquinas', material: ['pla', 'pla-cf', 'petg', 'abs'] },
      fuente: 'Bambu Lab',
    },
    {
      id: 'no-50',
      accion: 'Evita relleno por encima del 50 %',
      valor: '>50 % provoca warping',
      porque:
        'El caso típico de infill alto que provoca warping es el 60 %. Más relleno, más tensión lineal interna.',
      cuando: { infill: 'cruzado', fallo: ['esquinas'] },
      fuente: 'Bambu Lab',
      alcance: 'Es un ejemplo con número, no un umbral validado por todas las fuentes.',
    },
    {
      id: 'corriente',
      accion: 'Corta la corriente de aire alrededor de la impresora',
      porque:
        'Una ventana abierta, un aire acondicionado o un ventilador de mesa basta para enfriar un lado más que otro, y esa diferencia es la que genera la tensión.',
      cuando: { ventana: 'corriente', fallo: ['esquinas', 'cama'] },
      fuente: 'Bambu Lab, Simplify3D',
    },
    {
      id: 'abierta',
      accion: 'Abre la puerta frontal y quita la tapa superior',
      porque:
        'Con filamentos que se reblandecen por debajo de 60 °C (PLA, PVA, TPU) y cama por encima de 45 °C, Bambu recomienda abrir la puerta y/o quitar la tapa: así el calor no reblandece el filamento.',
      cuando: { material: ['pla', 'pla-cf'], camara: 'cerrada', cama: 'alta', fallo: ['esquinas', 'cama'] },
      fuente: 'Bambu Lab',
      alcance: 'Es un «y/o» de la fuente: la puerta basta, o la tapa basta. Traducirlo como «las dos cosas» le exigiría una conjunción que no pidió.',
    },
    {
      id: 'ambiente-frio',
      accion: 'Sube la cama +10 °C si la habitación está por debajo de 20 °C',
      valor: '+10 °C',
      porque:
        'En entorno frío conviene aumentar la temperatura de cama +10 °C para frenar el enfriamiento entre capas y asegurar que no haya corrientes de aire.',
      cuando: { fallo: ['esquinas', 'cama'], material: ['pla', 'pla-cf', 'petg', 'abs', 'pa', 'pc'] },
      fuente: 'Bambu Lab',
    },
    {
      id: 'grande-seco',
      accion: 'Usa cámara cerrada o cambia de material para impresiones grandes y planas',
      porque:
        'Los modelos grandes y planos en ABS, ASA o PC warpean casi siempre sin cámara cerrada. Si no hay cámara, la alternativa es cambiar a PLA, PLA-CF, PETG o PETG-CF.',
      cuando: { tamaño: 'grande', material: ['abs', 'pa', 'pc'], fallo: 'esquinas' },
      fuente: 'Bambu Lab',
      alcance: 'El único sitio donde el material decide mucho, y va en la dirección contraria al ranking: allí el PLA era el más seguro, aquí es la salida.',
    },
    {
      id: 'cama-lenta',
      accion: 'Sube la temperatura de cama si imprimes en frío con material de alta temperatura',
      valor: '+10 °C',
      porque:
        'Con el filamento expuesto al aire en el portabobinas, el ambiente por debajo de 20 °C agrava el warping incluso en PLA y PETG. Bloquear las corrientes y cerrar la máquina es el primer gesto.',
      cuando: { ventana: 'abierta', fallo: ['esquinas', 'cama'], material: ['abs', 'pa', 'pc'] },
      fuente: 'Bambu Lab, Prusa Research',
    },
    {
      id: 'reducir-velocidad',
      accion: 'Reduce la velocidad y la aceleración',
      valor: '−20 a −30 %',
      porque:
        'Puede ayudar mucho en materiales de alta propensión al warping, haciendo que el conjunto se asiente y las capas se fundan correctamente.',
      cuando: { material: ['abs', 'pa', 'pc'], fallo: 'esquinas' },
      fuente: 'Prusa Research, Bambu Lab',
    },
    {
      id: 'collapse-speed',
      accion: 'Reduce velocidad y aceleración del modelo alto y delgado',
      valor: '−20 a −30 %',
      porque:
        'La boquilla tumba un modelo alto por vibración a alta velocidad. Reducir un 20–30 %, activar soportes y considerar reorientar la pieza para que quede tumbada.',
      cuando: { tamaño: 'alta-delgada', fallo: 'colapso' },
      fuente: 'Bambu Lab',
    },
    {
      id: 'collapse-supports',
      accion: 'Activa soportes',
      porque:
        'Evita que el modelo alto y delgado se tumba durante la impresión y distribuye la carga. Reorientar la pieza para que quede tumbada es la alternativa si el soporte no basta.',
      cuando: { tamaño: 'alta-delgada', fallo: 'colapso' },
      fuente: 'Bambu Lab',
    },
    {
      id: 'collapse-infill',
      accion: 'Cambia el relleno a un patrón sin cruce',
      valor: 'Line, Rectilinear, Gyroid o Concentric',
      porque:
        'Grid y Triangles cruzan en una sola capa y generan un bulto que la boquilla engancha en el siguiente pase. Usar patrones que no se cruzan evita el golpe.',
      cuando: { infill: 'cruzado', fallo: 'colapso' },
      fuente: 'Bambu Lab',
    },
    {
      id: 'collapse-belts',
      accion: 'Comprueba la tensión de las correas',
      porque:
        'Correas flojas dan "slop" mecánico al cabezal. Una correa bien tensada se siente firme, como una cuerda de guitarra, con ligero rebote; si hay clic o traqueteo, está floja.',
      cuando: { fallo: 'colapso', tamaño: ['mediana', 'alta-delgada'] },
      fuente: 'Bambu Lab',
      alcance: 'El procedimiento por modelo y las geometrías de correa/polea están en la guía de capas desplazadas.',
    },
    {
      id: 'collapse-humidity',
      accion: 'Seca el filamento si aparecen burbujas o chasquidos',
      porque:
        'La humedad empeora la adhesión entre capas y la superficie, y en piezas altas se nota como fragilidad. Guardar con desecante y no dejar nylon ni PC en el portabobinas durante la noche.',
      cuando: { fallo: 'colapso', material: ['pa', 'pc', 'petg'] },
      fuente: 'Bambu Lab',
    },
    {
      id: 'adhesion-cama-limpia',
      accion: 'Elimina polvo, grasa o aceites de la placa',
      porque:
        'Las huellas son la causa número uno del fallo de adhesión; cualquier aceite de la piel basta para que la pieza deslice a mitad.',
      cuando: { fallo: 'cama', material: ['pla', 'pla-cf', 'petg', 'abs', 'pa', 'pc'] },
      fuente: 'Bambu Lab, Simplify3D',
    },
    {
      id: 'textured-painted',
      accion: 'Si imprimes en Textured PEI, selecciona esa placa al laminar',
      porque:
        'Si laminaste para la Cool Plate e imprimes en Textured PEI, la altura de la boquilla queda demasiado alta y empeora la adhesión del primer layer.',
      cuando: { chapa: 'textured', fallo: 'cama' },
      fuente: 'Bambu Lab',
    },
    {
      id: 'recinto',
      accion: 'Cierra la cámara para ABS, ASA, PA y PC',
      porque:
        'Para materiales de alta temperatura la impresora cerrada con cámara calentada es esencial; en open-frame (A1) compensar con +10 °C de cama.',
      cuando: { material: ['abs', 'pa', 'pc'], fallo: ['esquinas', 'cama', 'colapso'] },
      fuente: 'Bambu Lab',
      alcance: 'Bambu no prohíbe el recinto con PLA, pero su guía de recinto va a materiales de alta temperatura; Prusa lo desaconseja explícitamente para PLA/PETG por el cooling.',
    },
    {
      id: 'pecado',
      accion: 'No usar recinto para PLA o PETG que necesiten mucho cooling',
      porque:
        'PLA y PETG necesitan mucho cooling, y es difícil lograrlo con temperatura ambiente alta. Si la pieza es grande y plana en PLA, mejor controlar corrientes que cerrar la máquina.',
      cuando: { material: ['pla', 'pla-cf', 'petg'], fallo: ['esquinas', 'cama'] },
      fuente: 'Prusa Research',
      alcance: 'Matiz, no contradicción: Bambu no lo prohíbe para PLA, pero toda su guía de recinto va a materiales de alta temperatura. Prusa lo desaconseja explícitamente.',
    },
    {
      id: 'brim-warp',
      accion: 'Añade un brim de 8–10 mm o brim ears en las esquinas',
      valor: '8–10 mm',
      porque:
        'Aumenta el área en contacto con la cama y evita que las esquinas se despeguen a mitad.',
      cuando: { fallo: 'esquinas', chapa: ['cool', 'textured', 'smooth', 'engineering'] },
      fuente: 'Bambu Lab',
    },
  ],

  fueraDeAlcance: [
    {
      sintoma: 'Las esquinas se levantan desde la primera capa',
      porQue:
        'Es warping puro y el protocolo es el de esa guía, con la cifra de cama por chapa. Aquí se asume que la impresión ya iba bien antes de despegar.',
      guia: 'warping-pla',
    },
    {
      sintoma: 'Las capas se sueltan por dentro con corte limpio',
      porQue:
        'Es separación entre capas: la unión falla, aunque no haya movimiento. Cambiar la temperatura o el ventilador no lo arregla.',
      guia: 'separaciones-entre-capas',
    },
    {
      sintoma: 'La pieza sale enteramente corrida',
      porQue:
        'Es una capa desplazada: la unión está intacta y el hotend no fue donde el firmware ordenó. Es otro diagnóstico.',
      guia: 'capas-desplazadas',
    },
    {
      sintoma: 'La base sale más ancha que arriba',
      porQue:
        'Eso es pie de elefante: reborde lateral por primera capa reblandecida. La compensación geométrica es otra guía.',
      guia: 'elephant-foot',
    },
    {
      sintoma: 'Obstrucción, nozzle clog o nivelación/Z-probe',
      porQue:
        'No están en las fuentes de este lote. La obstrucción leve puede manifestarse como una capa que falta y está en la guía de separaciones.',
    },
  ],

  fuentes: [
    {
      url: 'https://wiki.bambulab.com/en/filament-acc/filament/print-quality/warping-falling-off-collapsing',
      quien: 'Bambu Lab',
      que: 'Página de warping, despegue y colapso: mecanismo, ranking, Tier 1, adhesión, offset, correas, infill y limpieza.',
    },
    {
      url: 'https://wiki.bambulab.com/en/knowledge-sharing/printed-model-warping',
      quien: 'Bambu Lab',
      que: 'Página de warping en modelos: enfriamiento, ventilador auxiliar, ambiente e infill.',
    },
    {
      url: 'https://help.prusa3d.com/article/warping_2011',
      quien: 'Prusa Research',
      que: 'Knowledge base de warping: ventilador de pieza, recinto, adhesión y condiciones.',
    },
    {
      url: 'https://forum.prusa3d.com/forum/original-prusa-i3-mk3s-mk3-how-do-i-print-this-printing-help/adjusting-settings-for-warping-of-pla/',
      quien: 'Foro de Prusa, 2019',
      que: 'Hilo con el antes y el intento de después; limpieza, adhesivos y ajustes de slicer.',
    },
    {
      url: 'https://www.simplify3d.com/resources/print-quality-troubleshooting/warping/',
      quien: 'Simplify3D',
      que: 'Página de warping: contracción del ABS, brim/raft y enfriamiento.',
    },
    {
      url: 'https://www.simplify3d.com/resources/print-quality-troubleshooting/not-sticking-to-the-bed/',
      quien: 'Simplify3D',
      que: 'Página de no adherencia a la cama: temperaturas, offset, limpieza, adhesivos.',
    },
  ],

  campos: [],
  leeDelAnalisis: ['material', 'bedTemp'],
};