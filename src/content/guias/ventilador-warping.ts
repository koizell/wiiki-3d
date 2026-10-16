import type { Guia } from './tipos';
import { AUTOR } from './autor.ts';

/**
 * Ventilador de capa y warping.
 *
 * Escrita desde `wiki/cooked/ventilador-warping.md`. El material cocinado
 * separa dos ventiladores distintos —el de capa y el auxiliar— y documenta
 * tres contradicciones sin resolver entre fuentes oficiales. Esta guía no
 * las resuelve: las explica con su matiz y deja que quien lee decida.
 *
 * ## Las tres contradicciones
 *
 * 1. **Ventilador auxiliar**: Bambu dice «reducir 20–30 %» en una página y
 *    «bajar al 40–50 %» en otra. La primera es correctiva (reducir del valor
 *    actual), la segunda es preventiva (valor objetivo).
 * 2. **ABS**: Prusa dice «apagar ventiladores por completo» en la página de
 *    separación de capas, pero «habilitar al 10–20 % para overhangs» en la
 *    de warping. El apagado es la regla general; el 10–20 % es excepción
 *    para voladizos.
 * 3. **PLA**: Prusa dice «aumentar ventilador si las esquinas se levantan»;
 *    Bambu dice «demasiado enfriamiento puede causar warping». El ventilador
 *    ayuda a la primera capa y a los voladizos, pero un exceso en primeras
 *    capas o piezas grandes warpea.
 */
export const ventiladorWarping: Guia = {
  slug: 'ventilador-warping',
  titulo: 'Ventilador de capa y warping',
  resumen:
    'El ventilador puede causar warping cuando enfría demasiado rápido, especialmente en las primeras capas o en piezas grandes. Hay dos ventiladores distintos y tres contradicciones sin resolver entre fuentes oficiales.',
  sintoma: 'El ventilador causa o agrava el warping',
  dibujo: 'capas',
  entrada:
    'El ventilador de capa enfría el filamento después de salir de la boquilla. Si enfría demasiado rápido —especialmente en las primeras capas o en piezas grandes— la contracción térmica genera tensión que levanta las esquinas. Pero no hay un solo ventilador: el de capa y el auxiliar son dos ajustes distintos con efectos distintos. Y las fuentes oficiales se contradicen en tres puntos. Esta guía separa los dos ventiladores, explica las contradicciones con su matiz y termina con las acciones que dependen de tu material y tu montaje.',
  autor: AUTOR,
  actualizado: '2026-10-16',
  minutos: 3,

  diferencial: {
    contra: 'el warping',
    comprobaciones: [
      {
        id: 'primeras-capas',
        mira: '¿El ventilador está activo desde la primera capa?',
        si: 'Sí, y las esquinas se levantan desde la base. El enfriamiento temprano está impidiendo que la primera capa se pegue.',
        no: 'No, las primeras capas pasan sin ventilador y el warping aparece más arriba. El problema no es el enfriamiento temprano.',
      },
      {
        id: 'tipo-ventilador',
        mira: '¿Qué ventilador está enfriando en exceso: el de capa o el auxiliar?',
        si: 'El auxiliar enfría las paredes exteriores demasiado rápido, especialmente en objetos pequeños o con voladizos altos.',
        no: 'El de capa enfría toda la pieza por igual. El problema es la velocidad general, no un ventilador concreto.',
      },
      {
        id: 'corriente',
        mira: '¿Hay una corriente de aire enfriando un lado de la pieza más que otro?',
        si: 'Ventana abierta, aire acondicionado o ventilador de mesa cerca. El enfriamiento desigual causa warping asimétrico.',
        no: 'No hay corrientes de aire. El enfriamiento es uniforme y el warping es simétrico.',
      },
    ],
    siNo: { guia: 'warping-pla', etiqueta: 'Warping en PLA' },
  },

  variables: [
    {
      id: 'material',
      etiqueta: 'Material',
      para: 'Cada material necesita un nivel de ventilador distinto. El PLA y el PETG necesitan mucho; el ABS necesita poco o ninguno.',
      necesaria: true,
      campos: ['material'],
      opciones: [
        { id: 'pla', etiqueta: 'PLA', detalle: 'Necesita ventilador, pero el exceso warpea' },
        { id: 'petg', etiqueta: 'PETG', detalle: 'Evitar ventiladores fuertes' },
        { id: 'abs', etiqueta: 'ABS o ASA', detalle: 'Ventilador apagado (regla general)' },
        { id: 'pa', etiqueta: 'PA o variantes', detalle: 'Poca o ninguna refrigeración' },
        { id: 'pc', etiqueta: 'PC o PC-CF', detalle: 'Poca o ninguna refrigeración' },
      ],
    },
    {
      id: 'ventilador',
      etiqueta: '¿Qué ventilador está activo?',
      para: 'El de capa y el auxiliar son dos ajustes distintos. Saber cuál está enfriando en exceso decide qué ajuste tocar.',
      necesaria: true,
      opciones: [
        { id: 'capa', etiqueta: 'Ventilador de capa', detalle: 'Enfría toda la pieza' },
        { id: 'auxiliar', etiqueta: 'Ventilador auxiliar', detalle: 'Enfría las paredes exteriores' },
        { id: 'ambos', etiqueta: 'Ambos', detalle: 'Los dos ventiladores activos' },
      ],
    },
    {
      id: 'primerasCapas',
      etiqueta: '¿Ventilador en las primeras capas?',
      para: 'Sin ventilador en las primeras 3 capas la primera capa se pega mejor y el warping temprano disminuye.',
      necesaria: true,
      opciones: [
        { id: 'con', etiqueta: 'Sí, activo desde la primera capa' },
        { id: 'sin', etiqueta: 'No, desactivado las primeras capas' },
      ],
    },
    {
      id: 'corriente',
      etiqueta: '¿Corrientes de aire cerca?',
      para: 'Una corriente de aire enfría un lado más que otro y causa warping asimétrico.',
      opciones: [
        { id: 'no', etiqueta: 'No hay corrientes' },
        { id: 'si', etiqueta: 'Ventana, AC o ventilador de mesa cerca' },
      ],
    },
    {
      id: 'tamaño',
      etiqueta: 'Tamaño de la pieza',
      para: 'El warping por ventilador aparece más en piezas grandes y en objetos pequeños con voladizos altos.',
      opciones: [
        { id: 'grande', etiqueta: 'Grande y plana', detalle: 'La más propensa' },
        { id: 'mediana', etiqueta: 'Mediana' },
        { id: 'pequena', etiqueta: 'Pequeña o con voladizos altos' },
      ],
    },
  ],

  conocimiento: [
    {
      id: 'dos-ventiladores',
      titulo: 'Dos ventiladores distintos',
      cuerpo:
        'El ventilador de capa enfría toda la pieza. El auxiliar —auxiliary part cooling fan— enfría las paredes exteriores y puede causar warping cuando lo hace demasiado rápido, especialmente en objetos pequeños o con voladizos altos. El auxiliar se controla con el comando G-code M106 P2 S(0-255) y se desactiva durante las primeras capas definidas por «No cooling for the first X layers».',
      cita: {
        texto: 'auxiliary part cooling fan',
        fuente: 'wiki.bambulab.com',
      },
    },
    {
      id: 'primeras-3-capas',
      titulo: 'Las primeras 3 capas sin ventilador',
      cuerpo:
        'Desactivar el ventilador de capa durante las primeras capas mejora la adhesión a la cama y reduce el warping temprano. Se recomienda «No cooling for the first X layers» = 3 para la mayoría de filamentos comunes (PLA, PETG, TPU). En Bambu Studio, el ajuste está en Filament Settings → Cooling tab.',
      cifra: { valor: '3', nota: 'capas sin ventilador para PLA, PETG, TPU' },
      cita: {
        texto: 'No cooling for the first X layers',
        fuente: 'wiki.bambulab.com',
      },
    },
    {
      id: 'auxiliar-contradiccion',
      titulo: 'Ventilador auxiliar: dos cifras que no son lo mismo',
      cuando: { ventilador: ['auxiliar', 'ambos'] },
      cuerpo:
        'Bambu Lab se contradice en dos páginas oficiales. En una, reducir el auxiliar un 20–30 % cuando ya hay warping. En otra, bajarlo al 40–50 % de forma preventiva. La primera es correctiva —reducir del valor actual— y la segunda es un valor objetivo. No son lo mismo, pero ambas deben aparecer.',
      cifra: { valor: '40–50 %', nota: 'valor objetivo preventivo; la reducción correctiva es 20–30 % del valor actual' },
      cita: {
        texto: '40–50 %',
        fuente: 'wiki.bambulab.com',
      },
    },
    {
      id: 'abs-contradiccion',
      titulo: 'ABS: apagado o 10–20 %',
      cuando: { material: ['abs', 'pc'] },
      cuerpo:
        'Prusa dice «apagar ventiladores por completo» para ABS en la página de separación de capas, pero en la de warping recomienda un 10–20 % para overhangs abruptos incluso en ABS y PC-Blend. El apagado es la regla general; el 10–20 % es una excepción específica para voladizos donde el ventilador es necesario para la calidad, no para el warping.',
      cifra: { valor: '10–20 %', nota: 'excepción para overhangs; la regla general es apagado' },
      cita: {
        texto: '10–20 %',
        fuente: 'help.prusa3d.com',
      },
    },
    {
      id: 'pla-contradiccion',
      titulo: 'PLA: mucho ventilador, pero no demasiado',
      cuando: { material: ['pla', 'petg'] },
      cuerpo:
        'Prusa dice que PLA y PETG necesitan mucha refrigeración y que si las esquinas se levantan hay que verificar que el ventilador funciona y aumentar su velocidad. Bambu dice que demasiado enfriamiento en PLA puede causar warping. El ventilador ayuda a la adhesión de la primera capa y a la calidad de los voladizos, pero un exceso en las primeras capas o en piezas grandes puede causar warping. La clave está en el equilibrio y en el número de capas iniciales sin ventilador.',
      cita: {
        texto: 'moderate fan speed',
        fuente: 'creality.com',
      },
    },
    {
      id: 'corrientes',
      titulo: 'Corrientes de aire: el enemigo silencioso',
      cuerpo:
        'Una ventana abierta, aire acondicionado o ventilador de mesa cerca puede enfriar un lado de la pieza más rápido que el otro, causando warping asimétrico. Las corrientes de aire enfrían el modelo más rápido, aumentando la tensión entre capas. Ventiladores fuertes o ventanas abiertas crean enfriamiento desigual, especialmente en ABS y Nylon.',
      cita: {
        texto: 'air drafts',
        fuente: 'wiki.bambulab.com',
      },
    },
    {
      id: 'cama-material',
      titulo: 'Temperaturas de cama por material',
      cuerpo:
        'La cama caliente compensa el enfriamiento del ventilador. Para PLA en Textured PEI Plate: 55–65 °C. Para ABS/ASA: aumentar cama +10–15 °C y usar cerramiento; la cámara debe alcanzar 40 °C+. Para ABS: cama 100–120 °C. Si la habitación está por debajo de 20 °C, el warping puede ocurrir incluso con PLA y PETG.',
      cifra: { valor: '55–65 °C', nota: 'PLA en Textured PEI Plate; ABS: 100–120 °C' },
      cita: {
        texto: '55–65 °C',
        fuente: 'wiki.bambulab.com',
      },
    },
    {
      id: 'puerta-abierta',
      titulo: 'Abrir la puerta y la cubierta',
      cuerpo:
        'Abrir la puerta y la cubierta de la impresora mejora la refrigeración, pero solo es recomendable para PLA, PETG y TPU. En filamentos de alta temperatura puede causar warping o mala adhesión entre capas. Materiales de alta temperatura (PETG, ABS, ASA, PA, PC) se imprimen con poca o ninguna refrigeración en impresora cerrada para que el ambiente esté más caliente y permita enfriamiento lento.',
      cita: {
        texto: "Opening the printer's front door and glass lid",
        fuente: 'wiki.bambulab.com',
      },
    },
  ],

  reglas: [
    {
      id: 'sin-ventilador-3-capas',
      accion: 'Apaga el enfriamiento en las 3 primeras capas',
      cuando: { primerasCapas: 'con', material: ['pla', 'petg'] },
      valor: 'No cooling for the first 3 layers',
      porque:
        'Es el ajuste que Bambu señala como el más importante para el warping. Sin enfriamiento en esas capas la primera capa se enfría más despacio y se pega mejor.',
      fuente: 'Bambu Lab',
      alcance: 'Bambu lo presenta como ajuste del ventilador de capa; OrcaSlicer precisa que el auxiliar también queda desactivado en esas capas («disabled for the initial layers defined by No cooling for the first»).',
    },
    {
      id: 'bajar-auxiliar',
      accion: 'Baja el ventilador auxiliar al 40–50 %',
      cuando: { ventilador: ['auxiliar', 'ambos'], material: ['pla', 'petg'] },
      valor: '40–50 %',
      porque:
        'Si hay warping, se recomienda bajar el ventilador auxiliar. El valor objetivo preventivo es 40–50 %; si ya hay warping, reducir 20–30 % del valor actual. El filamento que más se beneficia de un auxiliar alto es PLA, pero principalmente en objetos pequeños o con voladizos altos.',
      fuente: 'Bambu Lab',
      alcance: 'Las dos cifras de Bambu no son lo mismo: una es correctiva (20–30 % del valor actual) y la otra es preventiva (40–50 % del máximo).',
    },
    {
      id: 'apagar-abs',
      accion: 'Apaga los ventiladores por completo',
      cuando: { material: ['abs', 'pa', 'pc'] },
      valor: '0 %',
      porque:
        'ABS es altamente susceptible a la separación de capas cuando sopla aire frío sobre la pieza antes de que se enfríe por completo. Es común desactivar cualquier ventilador externo para que las capas se mantengan calientes más tiempo.',
      fuente: 'Prusa Research',
      alcance: 'Regla general para ABS. La excepción es 10–20 % para overhangs abruptos, donde el ventilador es necesario para la calidad del voladizo.',
    },
    {
      id: 'ventilador-overhangs',
      accion: 'Habilita el ventilador al 10–20 % para overhangs',
      cuando: { material: ['abs', 'pc'], tamaño: 'pequena' },
      valor: '10–20 %',
      porque:
        'Para overhangs abruptos en materiales que no requieren mucha refrigeración (ABS, PC-Blend), se puede habilitar el ventilador al 10–20 %. El ventilador es necesario para la calidad del voladizo, no para el warping.',
      fuente: 'Prusa Research',
      alcance: 'Excepción específica para overhangs. No es la regla general para ABS, que es apagado.',
    },
    {
      id: 'cortar-corriente',
      accion: 'Corta la corriente de aire alrededor de la impresora',
      cuando: { corriente: 'si' },
      porque:
        'Una ventana abierta, un aire acondicionado o un ventilador de mesa basta para enfriarte un lado más que otro, y esa diferencia es la que genera la tensión.',
      fuente: 'Bambu Lab',
    },
    {
      id: 'subir-cama-abs',
      accion: 'Sube la temperatura de cama y usa cerramiento',
      cuando: { material: 'abs' },
      valor: '+10–15 °C, cámara 40 °C+',
      porque:
        'Para ABS/ASA, aumentar cama +10–15 °C y usar cerramiento. La cámara debe alcanzar 40 °C+. En impresoras abiertas, aumentar la cama +10 °C para compensar el ambiente frío.',
      fuente: 'Bambu Lab',
      alcance: 'La cámara debe alcanzar 40 °C+ para ABS/ASA con cerramiento.',
    },
    {
      id: 'abrir-puerta',
      accion: 'Abre la puerta frontal o quita la tapa superior',
      cuando: { material: ['pla', 'petg'] },
      porque:
        'Abrir la puerta y la cubierta mejora la refrigeración, pero solo es recomendable para PLA, PETG y TPU. En filamentos de alta temperatura puede causar warping o mala adhesión entre capas.',
      fuente: 'Bambu Lab',
      alcance: 'La fuente dice abrir la puerta y la cubierta (las dos cosas), no una u otra.',
    },
  ],

  fueraDeAlcance: [
    {
      sintoma: 'Las capas se sueltan por dentro y la base está plana',
      porQue:
        'No es warping por ventilador. Es separación entre capas: las capas enfrían a ritmos distintos y las fuerzas de warping superan la adhesión entre capas. El protocolo es otro.',
      guia: 'separaciones-entre-capas',
    },
    {
      sintoma: 'La pieza se ha movido sobre la cama',
      porQue:
        'Es desplazamiento, no warping. La base tampoco está donde debía, y el ajuste es de primera capa y de sujeción.',
    },
    {
      sintoma: 'Voladizos que cuelgan o cara apoyada rugosa',
      porQue:
        'Es un problema de calidad de voladizo, no de warping. El ventilador ayuda a la calidad de los voladizos, pero esta guía no cubre cómo ajustarlo para ese fin.',
      guia: 'voladizos-y-soportes',
    },
  ],

  fuentes: [
    {
      url: 'https://wiki.bambulab.com/en/filament-acc/filament/print-quality/warping-falling-off-collapsing',
      quien: 'Bambu Lab',
      que: 'Página de warping: ventilador auxiliar, corrientes de aire, temperaturas de cama.',
    },
    {
      url: 'https://wiki.bambulab.com/en/knowledge-sharing/printed-model-warping',
      quien: 'Bambu Lab',
      que: 'Página de warping en modelos: enfriamiento, ventilador auxiliar, primeras capas.',
    },
    {
      url: 'https://help.prusa3d.com/article/warping_2011',
      quien: 'Prusa Research',
      que: 'Knowledge base de warping: ventilador de pieza, ABS, PLA, PETG.',
    },
    {
      url: 'https://help.prusa3d.com/article/layer-separation-and-splitting-fdm_1806',
      quien: 'Prusa Research',
      que: 'Página de separación de capas: ABS y ventilador apagado.',
    },
    {
      url: 'https://www.simplify3d.com/resources/print-quality-troubleshooting/warping/',
      quien: 'Simplify3D',
      que: 'Guía de calidad de impresión: ABS, temperatura de cama.',
    },
    {
      url: 'https://www.creality.com/blog/3d-print-warping',
      quien: 'Creality Blog',
      que: 'Blog de warping: velocidad de primeras capas, PLA, PETG.',
    },
    {
      url: 'https://github.com/OrcaSlicer/OrcaSlicer/wiki/material_cooling',
      quien: 'OrcaSlicer Wiki',
      que: 'Wiki de refrigeración: ventilador auxiliar, M106 P2, primeras capas.',
    },
    {
      url: 'https://wiki.bambulab.com/en/filament-acc/filament/print-quality/overhang',
      quien: 'Bambu Lab',
      que: 'Página de overhang: ventilador para voladizos, puerta abierta.',
    },
  ],

  campos: [],
  leeDelAnalisis: ['material'],
};
