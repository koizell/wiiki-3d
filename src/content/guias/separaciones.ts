import type { Guia } from './tipos';
import { AUTOR } from './autor.ts';

/**
 * Separaciones entre capas.
 *
 * La segunda guía, y existe por dos razones. Una es de producto: es el problema
 * que más se confunde con el warping y por lo tanto la prueba de que el
 * diferencial funciona. La otra es de formato: sin una segunda guía, el
 * `siNo` del diferencial de warping apuntaría a una página que no existe, que es
 * exactamente el tipo de enlace roto que había antes.
 *
 * Del material cocinado sale el hallazgo que hace esta guía útil: **las dos
 * fuentes oficiales dicen cosas distintas y ninguna se resuelve.** Prusa sube la
 * boquilla; Bambu sube la cama. Ese desacuerdo no se promedia, se enseña.
 */
export const separaciones: Guia = {
  slug: 'separaciones-entre-capas',
  titulo: 'Separaciones entre capas',
  resumen:
    'Qué ajuste une las capas cuando se separan por dentro, y qué contradicción hay entre las dos fuentes oficiales.',
  resumenExtra:
    'Antes de tocar la temperatura hay una comprobación que decide el ajuste, y las dos listas oficiales no dicen lo mismo.',
  sintoma: 'Las capas se sueltan por dentro',
  dibujo: 'grieta',
  entrada: 'Las capas se abren por dentro y la base queda plana. Parece warping y no lo es: el arreglo es otro, y subir la cama no lo arregla. Aquí se distinguen mirando dónde está la rotura y si la base se levanta o no.',
  autor: AUTOR,
  actualizado: '2026-10-21',
  minutos: 3,

  diferencial: {
    contra: 'warping',
    comprobaciones: [
      {
        id: 'base',
        mira: 'La base de la pieza, pegada a la cama: ¿está plana?',
        si: 'Plana, y las capas se sueltan por dentro. Es separación entre capas.',
        no: 'Arqueada hacia arriba desde la cama, con la superficie superior rugosa. Es warping.',
      },
      {
        id: 'corte',
        mira: '¿Cómo es el corte de la rotura?',
        si: 'Viene limpio y se puede separar la pieza en dos, sin material desgarrado. Falta adhesión entre capas.',
        no: 'Se rompe dejando hilos y material arrancado. No llegó material suficiente: es otro fallo.',
      },
      {
        id: 'altura',
        mira: '¿En qué altura de la pieza aparece?',
        si: 'A media altura o en un tramo concreto: un punto concreto donde no llegó material o donde cambió algo.',
        no: 'Desde el principio y de forma progresiva: más probable que sea un ajuste de temperatura constante.',
      },
    ],
    siNo: { guia: 'warping-pla', etiqueta: 'Warping en PLA' },
  },

  variables: [
    {
      id: 'material',
      etiqueta: 'Material',
      indicador: 'material',
      para: 'Cada material contrae distinto, y el ajuste que lo arregla no es el mismo.',
      necesaria: true,
      // El material es lo único que esta guía lee del archivo. La barra «Tu
      // archivo» lo enseña junto con el sitio donde se usa, y no enseña nada más.
      campos: ['material'],
      opciones: [
        { id: 'pla', etiqueta: 'PLA' },
        { id: 'petg', etiqueta: 'PETG', detalle: 'El peor caso documentado: capas más débiles' },
        { id: 'abs', etiqueta: 'ABS o ASA' },
        { id: 'pa', etiqueta: 'PA o variantes' },
        { id: 'pc', etiqueta: 'PC' },
      ],
    },
    {
      id: 'esquinas',
      etiqueta: 'Dónde se abre',
      indicador: 'geometria',
      para: 'El borde exterior es warping; por dentro es separación. Decidir esto antes evita cambiar lo que no toca.',
      necesaria: true,
      opciones: [
        { id: 'borde', etiqueta: 'En el borde exterior' },
        { id: 'dentro', etiqueta: 'Por dentro de la pieza' },
        { id: 'horizontal', etiqueta: 'En una sección horizontal entera' },
      ],
    },
    {
      id: 'altura',
      etiqueta: '¿Dónde en la pieza?',
      indicador: 'altura',
      para: 'Un punto concreto y un tramo que se deteriora apuntan a cosas distintas que la temperatura no arregla.',
      opciones: [
        { id: 'inicio', etiqueta: 'Desde el principio' },
        { id: 'punto', etiqueta: 'En una altura concreta' },
        { id: 'tarde', etiqueta: 'A mitad o al final' },
      ],
    },
    {
      id: 'enfriamiento',
      etiqueta: 'Enfriamiento por capa',
      indicador: 'ventilacion',
      para: 'Enfriar más rápido de lo que la capa pega es la vía por la que se abre una unión.',
      opciones: [
        { id: 'alto', etiqueta: 'Alto' },
        { id: 'medio', etiqueta: 'Medio' },
        { id: 'bajo', etiqueta: 'Bajo o nulo' },
      ],
    },
    {
      id: 'traslado',
      etiqueta: 'Movimiento durante la impresión',
      indicador: 'entorno',
      para: 'La pieza abierta de golpe se separa; la pieza abierta poco a poco se despega.',
      opciones: [
        { id: 'descalce', etiqueta: 'Se ha movido o se ha soltado de la cama' },
        { id: 'sujeta', etiqueta: 'No se ha movido' },
      ],
    },
  ],

  conocimiento: [
    {
      id: 'frontera',
      titulo: 'La frontera que hay que tener clara',
      puntos: [
        'Separada y desplazada son dos fallos distintos.',
        'En la separación la pieza se abre por dentro y la base está plana: material que no llegó a pegarse.',
        'En el desplazamiento la pieza se ha movido: la base tampoco está donde debía, y la causa es que la primera capa no se sujetó.',
        'Se parecen en la foto y no se arreglan con lo mismo.',
      ],
      indicador: 'calibracion',
      cuerpo:
        'Separada y desplazada son dos fallos distintos. En la separación la pieza se abre por dentro y la base está plana: material que no llegó a pegarse. En el desplazamiento la pieza se ha movido: la base tampoco está donde debía, y la causa es que la primera capa no se sujetó. Se parecen en la foto y no se arreglan con lo mismo.',
      enlaza: { guia: 'warping-pla', etiqueta: 'Ver warping' },
    },
    {
      id: 'corte-punto',
      titulo: 'Se abre en una altura concreta: puedes cortarlo ahí',
      cuando: { altura: 'punto' },
      puntos: [
        'Es el mejor caso para diagnosticar, y la razón es práctica.',
        'Como sabes a qué altura se abre, puedes cortar la pieza justo por ahí y mirar el corte.',
        'Eso separa los dos fallos que se parecen en la foto y decide qué protocolo sigue.',
        'Si además sabes qué ajuste cambió justo antes de esa altura, ya tienes el candidato.',
      ],
      indicador: 'general',
      cuerpo:
        'Es el mejor caso para diagnosticar, y la razón es práctica: como sabes a qué altura se abre, puedes cortar la pieza justo por ahí y mirar el corte. Eso separa los dos fallos que se parecen en la foto y decide qué protocolo sigue. Si además sabes qué ajuste cambió justo antes de esa altura, ya tienes el candidato.',
      enlaza: { guia: 'warping-pla', etiqueta: 'Ver el warping' },
    },
    {
      id: 'corte-inicio',
      titulo: 'Se abre desde el principio: el corte dice menos',
      cuando: { altura: 'inicio' },
      puntos: [
        'Si la separación lleva desde la base, el corte te dice que faltó adhesión pero no dónde: es un ajuste constante, no un cambio puntual.',
        'Eso deja la temperatura de boquilla y el enfriamiento por capa como las dos variables.',
        'Y descarta de entrada toda la investigación sobre iteraciones o transiciones del perfil.',
      ],
      indicador: 'calibracion',
      cuerpo:
        'Si la separación lleva desde la base, el corte te dice que faltó adhesión pero no dónde: es un ajuste constante, no un cambio puntual. Eso deja la temperatura de boquilla y el enfriamiento por capa como las dos variables, y descarta de entrada toda la investigación sobre iteraciones o transiciones del perfil.',
    },
    {
      id: 'material-alcance',
      titulo: 'Qué material y con qué aviso',
      puntos: [
        'El PETG es el peor caso documentado en este lote, con capas internas más débiles.',
        'Y hay un aviso de alcance que este artículo tiene que decir: la fuente que describe capas débiles habla del PETG.',
        'Y trasladar ese criterio a otro material sin más no está respaldado.',
      ],
      indicador: 'material',
      cuerpo:
        'El PETG es el peor caso documentado en este lote, con capas internas más débiles. Y hay un aviso de alcance que este artículo tiene que decir: la fuente que describe capas débiles habla del PETG, y trasladar ese criterio a otro material sin más no está respaldado.',
      cuando: { material: 'petg' },
    },
    {
      id: 'diagnostico',
      titulo: 'Cómo se diagnostica',
      puntos: [
        'La comprobación que decide es cortar la pieza en la altura donde se abre y mirar el corte.',
        'Si viene limpio y falta material entre capas, el problema es que no hubo adhesión suficiente.',
        'Si el corte viene desgarrado con material arrancado, no llegó material: es un problema de flujo, y la temperatura no lo arregla.',
      ],
      indicador: 'calibracion',
      cuerpo:
        'La comprobación que decide es cortar la pieza en la altura donde se abre y mirar el corte. Si viene limpio y falta material entre capas, el problema es que no hubo adhesión suficiente. Si el corte viene desgarrado con material arrancado, no llegó material: es un problema de flujo, y la temperatura no lo arregla.',
    },
    {
      id: 'borde',
      titulo: 'Si se abre por el borde, esto no es separación',
      cuando: { esquinas: 'borde' },
      puntos: [
        'Una rotura en el borde exterior, en las esquinas o a lo largo de una pared larga.',
        'Es territorio del warping: es el patrón que produce la contracción térmica al enfriarse los exteriores antes que el centro.',
        'Lo que los distingue es la base —si arquea desde la cama, es warping— y no el sitio donde se abre la grieta, que es el dato que más engaña.',
      ],
      indicador: 'cama',
      cuerpo:
        'Una rotura en el borde exterior, en las esquinas o a lo largo de una pared larga, es territorio del warping: es el patrón que produce la contracción térmica al enfriarse los exteriores antes que el centro. Lo que los distingue es la base —si arquea desde la cama, es warping— y no el sitio donde se abre la grieta, que es el dato que más engaña.',
      enlaza: { guia: 'warping-pla', etiqueta: 'Ver warping en PLA' },
    },
    {
      id: 'horizontal',
      titulo: 'Una sección horizontal entera es otro caso',
      cuando: { esquinas: 'horizontal' },
      puntos: [
        'Si la pieza se parte por una línea horizontal completa, el corte sigue siendo el dato: si viene limpio y falta material entre capas.',
        'Es adhesión insuficiente. Y si la línea se ve repetida en toda la altura.',
        'Lo que estás mirando puede no ser la rotura sino un cambio de ajuste en ese punto —una iteración distinta.',
        'Un cambio de temperatura o de velocidad—, y eso esta guía no lo cubre.',
      ],
      indicador: 'calibracion',
      cuerpo:
        'Si la pieza se parte por una línea horizontal completa, el corte sigue siendo el dato: si viene limpio y falta material entre capas, es adhesión insuficiente. Y si la línea se ve repetida en toda la altura, lo que estás mirando puede no ser la rotura sino un cambio de ajuste en ese punto —una iteración distinta, un cambio de temperatura o de velocidad—, y eso esta guía no lo cubre.',
    },
    {
      id: 'desacuerdo',
      titulo: 'Las dos fuentes oficiales no dicen lo mismo',
      puntos: [
        'Prusa sube la temperatura de boquilla; Bambu sube la cama.',
        'Es un desacuerdo real entre dos fabricantes, y aquí no se promedia ni se elige por gusto.',
        'Lo que sí se puede decir es que ambos actúan sobre la misma causa —contracción al enfriarse—.',
        'Y que la diferencia es cuál de los dos lados de la unión es el débil en su equipo.',
      ],
      indicador: 'cama',
      cuerpo:
        'Prusa sube la temperatura de boquilla; Bambu sube la cama. Es un desacuerdo real entre dos fabricantes, y aquí no se promedia ni se elige por gusto. Lo que sí se puede decir es que ambos actúan sobre la misma causa —contracción al enfriarse— y que la diferencia es cuál de los dos lados de la unión es el débil en su equipo.',
      cifra: { valor: 'Prusa ↑ boquilla · Bambu ↑ cama', nota: 'desacuerdo sin resolver' },
      enlaza: { guia: 'temperatura-cama', etiqueta: 'Ver las cifras de cama' },
    },
    {
      id: 'boquilla',
      titulo: 'La boquilla del PLA: tres cifras, tres sitios',
      puntos: [
        'El rango de temperatura de boquilla para el PLA aparece como 185–235 °C en la tabla de materiales.',
        'Como 215 °C en la ficha del PLA y como un valor concreto en un hilo de foro.',
        'No se contradicen necesariamente, pero el corpus no lo resuelve y esta guía no elige por ti.',
      ],
      indicador: 'temperatura',
      cuerpo:
        'El rango de temperatura de boquilla para el PLA aparece como 185–235 °C en la tabla de materiales, como 215 °C en la ficha del PLA y como un valor concreto en un hilo de foro. No se contradicen necesariamente, pero el corpus no lo resuelve y esta guía no elige por ti.',
      cuando: { material: 'pla' },
      cifra: { valor: '185–235 °C', nota: 'tabla de materiales' },
    },
    {
      id: 'hilos',
      titulo: 'Los dos hilos: ninguno se resuelve',
      puntos: [
        'Los dos casos de foro que acompañan esta guía están sin resolver.',
        'Uno terminó sin mejoría con el ajuste que le recomendó la fuente; el otro describe una mejora sin publicar con qué valor acabó.',
        'Leídos así, son el límite de lo que un caso de foro puede demostrar.',
      ],
      indicador: 'general',
      cuerpo:
        'Los dos casos de foro que acompañan esta guía están sin resolver. Uno terminó sin mejoría con el ajuste que le recomendó la fuente; el otro describe una mejora sin publicar con qué valor acabó. Leídos así, son el límite de lo que un caso de foro puede demostrar.',
    },
  ],

  reglas: [
    {
      id: 'corte',
      accion: 'Corta la pieza en la altura donde se abre y mira el corte',
      valor: 'Antes de tocar nada',
      porque:
        'Es la comprobación que decide el resto. El tipo de corte separa los dos fallos parecidos: si viene limpio faltó adhesión; si viene desgarrado, no llegó material y cambiar la temperatura no lo arregla.',
      cuando: { material: ['pla', 'petg', 'abs', 'pa', 'pc'] },
      fuente: 'Prusa, Bambu',
      alcance: 'Aplica a los dos fallos de esta guía. Es el primer paso de ambos protocolos.',
    },
    {
      id: 'sujeta',
      accion: 'Aumenta el enfriamiento por capa',
      cuando: { material: ['pla', 'petg', 'abs', 'pa', 'pc'], enfriamiento: 'bajo' },
      valor: 'Gradualmente, y comprobando la adhesión',
      porque:
        'La capa se contrae al enfriarse; si se enfría antes de pegarse con la de abajo, se abre. Subir el enfriamiento es lo que más rápido se nota y lo más fácil de revertir.',
      fuente: 'Prusa',
    },
    {
      id: 'reduccion',
      accion: 'Reduce el enfriamiento si la adhesión entre capas cae',
      cuando: { material: ['pla', 'petg'] },
      porque:
        'Es el término inverso del anterior: demasiado enfriamiento abre la unión, demasiado poco la reblandece. El objetivo de la fuente es cools la pieza «ni demasiado rápido ni demasiado despacio».',
      fuente: 'Prusa',
      alcance: 'Es un ensayo con su remedio, no una exclusión: no dice que no haya que bajar el ventilador.',
    },
    {
      id: 'boquilla-prusa',
      accion: 'Sube la temperatura de boquilla',
      cuando: { material: ['pla', 'petg'], enfriamiento: 'alto' },
      porque:
        'Es lo que recomienda Prusa cuando la capa se enfría más de lo que pega. El corpus registra que Bambu dice lo contrario en el mismo tipo de fallo, y ese desacuerdo está sin resolver.',
      fuente: 'Prusa',
      alcance: 'Bambu sube la cama en este mismo caso. No se han reconciled las dos.',
    },
    {
      id: 'cama-bambu',
      accion: 'Sube la temperatura de cama',
      cuando: { material: ['pla', 'petg'], enfriamiento: 'alto' },
      porque:
        'Es lo que recomienda Bambu para la separación entre capas, en dirección contraria a Prusa. El desacuerdo es real y esta guía no lo resuelve: prueba una y comprueba el corte antes de pasar a la otra.',
      fuente: 'Bambu',
      alcance: 'Prusa sube la boquilla en este mismo caso. Desacuerdo sin resolver.',
    },
    {
      id: 'tasa',
      accion: 'Revisa la tasa de flujo si el corte sale desgarrado',
      cuando: { material: ['pla', 'petg', 'abs', 'pa', 'pc'] },
      porque:
        'Un corte con material arrancado no es un problema de adhesión: es que no llegó filamento. Subir temperatura lo hace peor. El ajuste que corresponde es de flujo, y no está en esta guía.',
      fuente: 'Prusa',
    },
    {
      id: 'primeras',
      accion: 'Comprueba que la primera capa se sujetó antes de diagnosticar nada',
      cuando: { material: ['pla', 'petg', 'abs', 'pa', 'pc'], traslado: 'descalce' },
      porque:
        'Si la pieza se ha movido, lo que se está viendo no es separación: es desplazamiento. La base tampoco está donde debía, y el ajuste es de primera capa y de sujeción, no de capas internas.',
      fuente: 'Bambu',
      alcance: 'Si el movimiento ha dejado la base plana y las capas abiertas por dentro, entonces sí es separación.',
    },
  ],

  fueraDeAlcance: [
    {
      sintoma: 'La pieza se ha movido sobre la cama',
      porQue:
        'Es desplazamiento, no separación: la base tampoco está donde debía. El ajuste es de primera capa y de sujeción, no de capas internas.',
    },
    {
      sintoma: 'El corte sale con material arrancado',
      porQue:
        'No llegó filamento suficiente. Es un problema de flujo o de retracción, y subir la temperatura lo empeora.',
    },
    {
      sintoma: 'Las esquinas de la base se levantan',
      porQue:
        'Eso sí es warping. La diferencia la hace la base: si arquea desde la cama, el diagnóstico entero cambia de guía.',
      guia: 'warping-pla',
    },
  ],

  fuentes: [
    {
      url: 'https://help.prusa3d.com/article/layer-separation-and-splitting-fdm_1806',
      quien: 'Prusa Research',
      que: 'Página de separación entre capas: diagnóstico y protocolo.',
    },
    {
      url: 'https://wiki.bambulab.com/en/filament-acc/filament/print-quality/interlayer-cracking',
      quien: 'Bambu Lab',
      que: 'Página de grieta entre capas: protocolo y contradicción con Prusa.',
    },
    {
      url: 'https://help.prusa3d.com/article/layer-shifting_2020',
      quien: 'Prusa Research',
      que: 'Página de desplazamiento: cómo separarlo de la separación.',
    },
    {
      url: 'https://forum.prusa3d.com/forum/user-mods/layer-separation-delamination-help/?language=en',
      quien: 'Foro de Prusa',
      que: 'Caso de delaminación. Sin resolver.',
    },
    {
      url: 'https://forum.prusa3d.com/forum/original-prusa-i3-mk3s-mk3-how-do-i-print-this-printing-help/separation-of-layers-in-middle-of-print/',
      quien: 'Foro de Prusa',
      que: 'Caso de separación a media altura. Sin valor final publicado.',
    },
  ],

  campos: [],
  leeDelAnalisis: ['material'],
};