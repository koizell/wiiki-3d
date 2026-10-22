import type { Guia } from './tipos';
import { AUTOR } from './autor.ts';

export const brimYSkirt: Guia = {
  slug: 'brim-y-skirt',
  titulo: 'Brim y skirt en OrcaSlicer',
  resumen:
    'Brim para adhesion, skirt para purga y escudo para corrientes: el material y el objetivo deciden el tipo y la anchura; el resto son costes de tiempo, material y limpieza.',
  sintoma: 'La pieza se despega por los bordes o la boquilla purga mal',
  dibujo: 'primera-capa',
  entrada:
    'El brim es una capa plana alrededor de la base que mejora la adhesion; el skirt son perimetros extra que purgan y estabilizan la boquilla; el draft shield es una pared alta que protege de corrientes. Cada uno resuelve un problema distinto y cada uno cuesta tiempo, material o trabajo de limpieza si se usa donde no hace falta.',
  autor: AUTOR,
  actualizado: '2026-10-16',
  minutos: 4,

  diferencial: {
    contra: 'adhesion de la primera capa, warping o pie de elefante',
    contraCorto: 'adhesion o warping',
    comprobaciones: [
      {
        id: 'purge',
        mira: '¿Como arranca la boquilla en la primera capa?',
        si: 'La primera linea no se adhiere o sale discontinua y el resto de la pieza esta sano: falta adhesion o nivelacion, no purga.',
        no: 'La primera linea se pega bien pero la boquilla arranca con saltos, restos o filamento quemado: falta purgado, que es lo que da un skirt.',
      },
      {
        id: 'despegue',
        mira: '¿Cuando se despega la pieza?',
        si: 'Se levanta por una esquina o borde a mitad de impresion y el resto se mantiene: es warping, y el brim solo ayuda a retrasarlo.',
        no: 'La pieza no se despega del todo o la base sale porosa: es adhesion de la primera capa, y el brim es el primer ajuste logico.',
      },
      {
        id: 'proteccion',
        mira: '¿Imprimes ABS o ASA en una maquina abierta?',
        si: 'Hay riesgo de contraccion diferencial por corrientes: el escudo de corriente (draft shield) tiene sentido aqui antes que un brim mas ancho.',
        no: 'Si la maquina esta cerrada o el material es PLA o PETG, el escudo aporta poco y el brim resuelve mejor la adhesion.',
      },
    ],
    siNo: { guia: 'adhesion-primera-capa', etiqueta: 'Adhesion de la primera capa' },
  },

  variables: [
    {
      id: 'objetivo',
      etiqueta: '¿Para que lo necesitas?',
      indicador: 'general',
      para: 'Brim, skirt y escudo resuelven problemas distintos; el ajuste depende de para que se monta.',
      necesaria: true,
      opciones: [
        { id: 'adhesion', etiqueta: 'Mejorar adhesion' },
        { id: 'purga', etiqueta: 'Purgar la boquilla' },
        { id: 'escudo', etiqueta: 'Proteger de corrientes' },
        { id: 'minimal', etiqueta: 'Menos material y tiempo' },
      ],
    },
    {
      id: 'material',
      etiqueta: 'Material',
      indicador: 'material',
      para: 'Auto brim usa un coeficiente de adhesion y una longitud termica por material; el raft tiene materiales donde tiene sentido.',
      necesaria: true,
      campos: ['material'],
      opciones: [
        { id: 'pla', etiqueta: 'PLA' },
        { id: 'petg', etiqueta: 'PETG o PCTG' },
        { id: 'abs', etiqueta: 'ABS o ASA' },
        { id: 'pa', etiqueta: 'PA (Nylon)' },
        { id: 'pc', etiqueta: 'PC' },
        { id: 'tpu', etiqueta: 'TPU' },
      ],
    },
    {
      id: 'impresora',
      etiqueta: 'Tipo de impresora',
      indicador: 'maquina',
      para: 'En una maquina belt el brim se imprime por tiras, el raft no se puede usar y leading/extrawidth pasan a ser los ajustes utiles.',
      necesaria: true,
      opciones: [
        { id: 'normal', etiqueta: 'Cartesiana/CoreXY normal' },
        { id: 'belt', etiqueta: 'Impresora belt' },
      ],
    },
    {
      id: 'superficie',
      etiqueta: 'Superficie de apoyo',
      indicador: 'cama',
      para: 'El raft esta pensado para contacto pequeno, features finas o placas desgastadas; con apoyo normal basta brim.',
      opciones: [
        { id: 'pequena', etiqueta: 'Pequena o con features finas' },
        { id: 'normal', etiqueta: 'Normal' },
        { id: 'grande', etiqueta: 'Grande y plana' },
      ],
    },
    {
      id: 'entorno',
      etiqueta: 'Entorno de impresion',
      indicador: 'entorno',
      para: 'El escudo de corriente aporta sobre todo en maquina abierta o con ventilacion directa sobre la pieza.',
      opciones: [
        { id: 'open', etiqueta: 'Abierta o con corrientes' },
        { id: 'closed', etiqueta: 'Cerrada o sin corrientes' },
      ],
    },
  ],

  conocimiento: [
    {
      id: 'concepto',
      titulo: 'Brim, skirt y escudo no resuelven lo mismo',
      puntos: [
        'El brim es una capa plana impresa alrededor de la base del modelo para mejorar la adhesion a la cama.',
        'el skirt son uno o mas perimetros adicionales en la primera capa que purgan la boquilla,.',
        'estabilizan la extrusion y pueden actuar como barrera basica de viento si se construyen mas alto.',
        'el escudo imprime la skirt como una pared continua tan alta como el modelo mas alto de la cama.',
      ],
      indicador: 'calibracion',
      cuerpo:
        'El brim es una capa plana impresa alrededor de la base del modelo para mejorar la adhesion a la cama; el skirt son uno o mas perimetros adicionales en la primera capa que purgan la boquilla, estabilizan la extrusion y pueden actuar como barrera basica de viento si se construyen mas alto; el escudo imprime la skirt como una pared continua tan alta como el modelo mas alto de la cama.',
    },
    {
      id: 'auto-brim',
      titulo: 'Auto brim calcula la anchura optima',
      puntos: [
        'Auto brim evalua propiedades del material, la geometria de la pieza, la velocidad de impresion y las caracteristicas termicas.',
        'altura del modelo, forma de la primera capa y la diagonal de la base.',
        'La anchura computada queda capada a 18 mm y a 1,5x la longitud termica.',
        'si queda por debajo de 5 mm y tambien por debajo de 1,5x la longitud termica, no se genera brim.',
      ],
      indicador: 'calibracion',
      cuerpo:
        'Auto brim evalua propiedades del material, la geometria de la pieza, la velocidad de impresion y las caracteristicas termicas: altura del modelo, forma de la primera capa y la diagonal de la base. La anchura computada queda capada a 18 mm y a 1,5x la longitud termica; si queda por debajo de 5 mm y tambien por debajo de 1,5x la longitud termica, no se genera brim.',
      cifra: { valor: '18 mm', nota: 'tope de la anchura calculada en auto brim (OrcaSlicer)' },
      cita: {
        texto: 'The computed brim width is capped at 18 mm and at 1.5x the thermal length.',
        fuente: 'OrcaSlicer Wiki, Brim',
      },
    },
    {
      id: 'longitudes-termicas',
      titulo: 'Longitudes termicas por material en auto brim',
      puntos: [
        'La diagonal de la base del modelo es la longitud termica de referencia.',
        'OrcaSlicer trae valores especificos por material: ABS, PA-CF y PET-CF usan 100; PC usa 40; TPU usa 1000.',
        'A mayores velocidades maximas de impresion se recomienda mayor anchura de brim, y el coeficiente de adhesion del material es 1 por defecto,.',
        '2 para PETG/PCTG y 0,5 para TPU.',
      ],
      indicador: 'calibracion',
      cuerpo:
        'La diagonal de la base del modelo es la longitud termica de referencia. OrcaSlicer trae valores especificos por material: ABS, PA-CF y PET-CF usan 100; PC usa 40; TPU usa 1000. A mayores velocidades maximas de impresion se recomienda mayor anchura de brim, y el coeficiente de adhesion del material es 1 por defecto, 2 para PETG/PCTG y 0,5 para TPU.',
      cuando: { material: ['pc', 'tpu'] },
    },
    {
      id: 'tipos-brim',
      titulo: 'Outer, inner o ambos son un trade-off, no una opcion correcta',
      puntos: [
        'outer_only es mas facil de remover pero puede afectar al aspecto si no se limpia bien.',
        'inner_only es mas dificil de remover y menos efectivo, aunque puede ocultar la costura de remocion y los detalles finos internos.',
        'outer_and_inner combina las desventajas de ambos pero mejora la adhesion global,.',
        'y en modelos complejos o materiales exigentes se sugiere considerar un raft.',
      ],
      indicador: 'calibracion',
      cuerpo:
        'outer_only es mas facil de remover pero puede afectar al aspecto si no se limpia bien; inner_only es mas dificil de remover y menos efectivo, aunque puede ocultar la costura de remocion y los detalles finos internos; outer_and_inner combina las desventajas de ambos pero mejora la adhesion global, y en modelos complejos o materiales exigentes se sugiere considerar un raft.',
      cita: {
        texto: 'Easier to remove than an inner brim, but may affect the model\'s appearance if not removed cleanly.',
        fuente: 'OrcaSlicer Wiki, Brim',
      },
    },
    {
      id: 'mouse-ears',
      titulo: 'Mouse ears: adhesion local con menos material que un brim completo',
      puntos: [
        'Las mouse ears son extensiones locales del brim, tipicamente cerca de esquinas y features afiladas,.',
        'que mejoran la adhesion usando menos material.',
        'El analisis de geometria selecciona candidatos por umbral de angulo y radio de deteccion; con brim_ears_max_angle a 0 grados no se generan,.',
        'y con 180 grados se permiten en casi cualquier feature no recto.',
      ],
      indicador: 'calibracion',
      cuerpo:
        'Las mouse ears son extensiones locales del brim, tipicamente cerca de esquinas y features afiladas, que mejoran la adhesion usando menos material. El analisis de geometria selecciona candidatos por umbral de angulo y radio de deteccion; con brim_ears_max_angle a 0 grados no se generan, y con 180 grados se permiten en casi cualquier feature no recto.',
      cita: {
        texto: 'Mouse ears are small, local brim extensions (typically placed near corners and sharp features) that improve bed adhesion and reduce warping while using less material than a full brim.',
        fuente: 'OrcaSlicer Wiki, Brim',
      },
    },
    {
      id: 'draft-shield',
      titulo: 'Escudo de corriente: proteccion termica real',
      puntos: [
        'Con draft_shield habilitado, la skirt se imprime como un escudo de corriente.',
        'una pared continua mas alta alrededor de la pieza para proteger de corrientes y cambios bruscos de temperatura, especialmente en ABS/ASA.',
        'El escudo es tan alto como el modelo mas alto de la cama; con el ajuste desactivado,.',
        'la skirt usa skirt_height. single_loop_draft_shield ahorra material y tiempo,.',
        'pero el escudo queda menos robusto y mas propenso a warping o cracking.',
      ],
      indicador: 'cama',
      cuerpo:
        'Con draft_shield habilitado, la skirt se imprime como un escudo de corriente: una pared continua mas alta alrededor de la pieza para proteger de corrientes y cambios bruscos de temperatura, especialmente en ABS/ASA. El escudo es tan alto como el modelo mas alto de la cama; con el ajuste desactivado, la skirt usa skirt_height. single_loop_draft_shield ahorra material y tiempo, pero el escudo queda menos robusto y mas propenso a warping o cracking.',
      cuando: { entorno: 'open' },
      cita: {
        texto: 'Enabled: the shield is as tall as the tallest printed model on the bed.',
        fuente: 'OrcaSlicer Wiki, Skirt',
      },
    },
    {
      id: 'flow',
      titulo: 'El flow real de brim y skirt',
      puntos: [
        'brim_flow_ratio multiplica el flow ratio del filamento (y el del objeto si lo tiene).',
        'un valor ligeramente mayor que 1,0 puede ayudar al brim a sujetar la impresion, pero dificulta la remocion.',
        'El flow ratio de primera capa no afecta ni a brims ni a skirts; solo al resto de la primera capa.',
      ],
      indicador: 'calibracion',
      cuerpo:
        'brim_flow_ratio multiplica el flow ratio del filamento (y el del objeto si lo tiene); un valor ligeramente mayor que 1,0 puede ayudar al brim a sujetar la impresion, pero dificulta la remocion. El flow ratio de primera capa no afecta ni a brims ni a skirts; solo al resto de la primera capa.',
      cita: {
        texto: 'Setting this value slightly above 1.0 can help the brim hold the print on the plate, but it can also make brims harder to remove.',
        fuente: 'OrcaSlicer Wiki, Brim',
      },
    },
    {
      id: 'efc-preview',
      titulo: 'Con EFC alto el brim puede verse despegado',
      puntos: [
        'El skirt se imprime a skirt_distance del brim o del objeto, por lo que el escudo no interseca con los brims.',
        'Con compensacion de pie de elefante alta, el brim puede verse desconectado del modelo en la previsualizacion,.',
        'pero en la impresion final queda correctamente anexado si la compensacion esta bien calibrada.',
        'Cuando la compensacion altera mucho la huella, conviene alinear el brim con el perimetro compensado; si el setup ya funciona,.',
        'ese ajuste puede ser innecesario y fusionar el brim con las capas superiores.',
      ],
      indicador: 'calibracion',
      cuerpo:
        'El skirt se imprime a skirt_distance del brim o del objeto, por lo que el escudo no interseca con los brims. Con compensacion de pie de elefante alta, el brim puede verse desconectado del modelo en la previsualizacion, pero en la impresion final queda correctamente anexado si la compensacion esta bien calibrada. Cuando la compensacion altera mucho la huella, conviene alinear el brim con el perimetro compensado; si el setup ya funciona, ese ajuste puede ser innecesario y fusionar el brim con las capas superiores.',
    },
    {
      id: 'belt',
      titulo: 'En maquinas belt el brim cambia de comportamiento',
      puntos: [
        'El objeto toca la banda a lo largo de una tira estrecha por capa, y el brim se imprime en la superficie inclinada de la banda,.',
        'una tira a la vez.',
        'Outer, inner, outer and inner y leading edge only funcionan como se describe; auto,.',
        'mouse ears y painted se imprimen como brim outer usando brim_width.',
        'El brim solo se genera si la inclinacion de la banda esta entre 1 y 85 grados.',
      ],
      indicador: 'maquina',
      cuerpo:
        'El objeto toca la banda a lo largo de una tira estrecha por capa, y el brim se imprime en la superficie inclinada de la banda, una tira a la vez. Outer, inner, outer and inner y leading edge only funcionan como se describe; auto, mouse ears y painted se imprimen como brim outer usando brim_width. El brim solo se genera si la inclinacion de la banda esta entre 1 y 85 grados.',
      cuando: { impresora: 'belt' },
      cita: {
        texto: 'A brim is only generated when the [belt tilt](printer_basic_information_belt_printer#belt-tilt) is between 1 and 85 degrees.',
        fuente: 'OrcaSlicer Wiki, Brim',
      },
    },
    {
      id: 'raft',
      titulo: 'Raft: cuando deja de ser mejor el brim',
      puntos: [
        'El raft es una plataforma de soporte material impresa bajo el objeto; ayuda cuando el material tiende a warpear o levantar esquinas (ABS,.',
        'ASA, PC, Nylon), cuando la pieza toca la cama con area pequena o features finas, o cuando la placa esta desigual o desgastada.',
        'A cambio, el fondo queda mas rugoso, la impresion tarda mas, gasta mas material y hay que retirarlo.',
        'Si el problema es solo adhesion o warping, el brim es mas rapido, usa menos material y deja la superficie inferior limpia,.',
        'asi que va primero.',
      ],
      indicador: 'calibracion',
      cuerpo:
        'El raft es una plataforma de soporte material impresa bajo el objeto; ayuda cuando el material tiende a warpear o levantar esquinas (ABS, ASA, PC, Nylon), cuando la pieza toca la cama con area pequena o features finas, o cuando la placa esta desigual o desgastada. A cambio, el fondo queda mas rugoso, la impresion tarda mas, gasta mas material y hay que retirarlo. Si el problema es solo adhesion o warping, el brim es mas rapido, usa menos material y deja la superficie inferior limpia, asi que va primero.',
      cita: {
        texto: 'It is faster, uses less material and keeps the bottom surface clean.',
        fuente: 'OrcaSlicer Wiki, Raft',
      },
    },
  ],

  reglas: [
    {
      id: 'brim-adhesion',
      accion: 'Activa un brim para mejorar la adhesion',
      valor: 'brim_width manual (mm)',
      cuando: { objetivo: 'adhesion' },
      porque:
        'El brim es una capa plana alrededor de la base, para modelos con poca superficie de apoyo o propuestos a warping. Ensancharlo a mano mejora la adhesion a costa de mas material; auto_brim la calcula.',
      fuente: 'OrcaSlicer Wiki, Brim',
      alcance:
        'El brim ayuda a la adhesion y a la estabilizacion, pero no corrige por si solo el warping severo ni una nivelacion mal hecha. No hay una anchura manual universal: brim_width fija la distancia entre el modelo y la linea exterior y cada mm la ensancha (mejora adhesion, mas material). Para el calculo automatico usar usa-auto-brim, que aplica los topes de 18 mm y 1,5x la longitud termica.',
    },
    {
      id: 'usa-auto-brim',
      accion: 'Deja que auto_brim calcule la anchura',
      valor: 'auto_brim',
      cuando: { objetivo: 'adhesion' },
      porque:
        'Auto brim evalua material, geometria, velocidad y caracteristicas termicas, y aplica los topes de 18 mm y 1,5x la longitud termica sin intervencion manual.',
      fuente: 'OrcaSlicer Wiki, Brim',
      alcance:
        'El resultado puede ser cero si la anchura computada queda por debajo de 5 mm y de 1,5x la longitud termica. Con piezas muy pequenas o materiales con longitud termica extrema (TPU 1000) conviene revisar el valor a mano. Es el complemento de brim-adhesion: auto calcula la anchura; brim-adhesion la fija a mano con brim_width.',
    },
    {
      id: 'mouse-ears-minimal',
      accion: 'Usa mouse ears en lugar de un brim completo',
      valor: 'brim_ears',
      cuando: { objetivo: 'minimal' },
      porque:
        'Las mouse ears aportan adhesion local en esquinas y features afiladas con menos material que un brim completo; el umbral de angulo controla donde se generan.',
      fuente: 'OrcaSlicer Wiki, Brim',
      alcance:
        'No cubren toda la base: si el area de contacto es pequena o la pieza tiende a warpear en superficies grandes, unas mouse ears solas no bastan y hay que recurrir a un brim o a un raft.',
    },
    {
      id: 'skirt-purga',
      accion: 'Imprime un skirt de 2 bucles para purgar la boquilla',
      valor: 'skirt_loops = 2',
      cuando: { objetivo: 'purga' },
      porque:
        'El skirt purga y estabiliza la extrusion antes de la pieza; 0 desactiva el skirt, y 2 bucles es la recomendacion habitual, con mas bucles a cambio de mas filamento y tiempo.',
      fuente: 'OrcaSlicer Wiki, Skirt',
      alcance:
        'Si la impresora esta configurada sin linea de purga (prime line), min_skirt_length (mm minimos extruidos) sustituye o refuerza este ajuste. Los bucles extra mejoran el margen entre boquilla y pieza.',
    },
    {
      id: 'no-brim-purga',
      accion: 'Desactiva el brim cuando solo quieres purgar',
      valor: 'brim_type = no_brim',
      cuando: { objetivo: 'purga' },
      porque:
        'no_brim no imprime brim alrededor del modelo; los brims de objetos vecinos se mantienen a una linea de distancia, y es util como setting por objeto para piezas que no necesitan adhesion extra.',
      fuente: 'OrcaSlicer Wiki, Brim',
      alcance:
        'Con no_brim se desactivan el resto de ajustes de brim. No es una medida de ahorro frente a un brim necesario: si la pieza se despega, vuelve al brim.',
    },
    {
      id: 'skirt-velocidad',
      accion: 'Controla la velocidad del skirt',
      valor: 'skirt_speed = 0',
      porque:
        'A 0 usa la velocidad First layer infill en la primera capa y la de Support en las superiores; un skirt muy rapido puede no adherir bien, desprenderse y dar problemas con la pieza.',
      fuente: 'OrcaSlicer Wiki, Skirt',
      alcance:
        'Aplica a skirt y, por herencia, al primer comportamiento de purga. No fija un mm/s concreto: depende de las velocidades declaradas en el perfil.',
    },
    {
      id: 'escudo-abs-abierto',
      accion: 'Activa el escudo de corriente en maquina abierta',
      valor: 'draft_shield = enabled',
      cuando: { entorno: 'open', material: 'abs' },
      porque:
        'El escudo es una pared continua tan alta como el modelo mas alto de la cama y protege de corrientes y cambios bruscos de temperatura, sobre todo en ABS y ASA. En maquinas open-frame aporta mas.',
      fuente: 'OrcaSlicer Wiki, Skirt',
      alcance:
        'Con draft_shield habilitado el skirt usa la altura del modelo mas alto y no skirt_height. single_loop_draft_shield ahorra material pero hace el escudo menos robusto y mas propenso a warping o cracking.',
    },
    {
      id: 'escudo-sin-single-loop',
      accion: 'Evita el escudo de una sola pared si el material encoge',
      valor: 'single_loop_draft_shield = false',
      cuando: { objetivo: 'escudo' },
      porque:
        'single_loop_draft_shield limita el escudo a una pared tras la primera capa y ahorra material y tiempo, pero lo hace menos robusto y mas propenso a warping o cracking.',
      fuente: 'OrcaSlicer Wiki, Skirt',
      alcance:
        'El ahorro es real y el riesgo tambien: es un trade-off consciente, no un error. Si el ahorro de material importa mas que la proteccion, activarlo es una decision valida.',
    },
    {
      id: 'raft-cuando',
      accion: 'Considera un raft en lugar de un brim',
      cuando: { superficie: 'pequena', material: ['abs', 'pa', 'pc'], impresora: 'normal' },
      porque:
        'El raft ayuda si el material tiende a warpear o levantar esquinas (ABS, ASA, PC, Nylon), si el contacto con la cama es pequeno o con features finas, o si la placa esta desigual o desgastada.',
      fuente: 'OrcaSlicer Wiki, Raft',
      alcance:
        'El raft deja el fondo mas rugoso, tarda mas, gasta mas material y hay que retirarlo. No se puede imprimir en maquinas belt. Si el problema es solo adhesion o warping, probar brim primero.',
    },
    {
      id: 'raft-belt',
      accion: 'No uses raft en una maquina belt',
      cuando: { impresora: 'belt', superficie: 'pequena' },
      porque:
        'El raft no se puede imprimir en impresoras belt; en su lugar el brim se apoya en leading length y extra width sobre la banda.',
      fuente: 'OrcaSlicer Wiki, Brim',
      alcance:
        'Aplica solo a maquinas belt. En una maquina normal el raft sigue siendo una opcion cuando el contacto es pequeno y el material warpea.',
    },
    {
      id: 'belt-leading',
      accion: 'Extiende el brim por delante del leading edge',
      valor: 'Brim-object gap + Leading length + Width',
      cuando: { impresora: 'belt', objetivo: 'adhesion' },
      porque:
        'En belt el brim se imprime una tira a la vez en la superficie inclinada de la banda; leading_length ancla el leading edge y extra_brim_width ensancha sin avanzar mas adelante ni atras.',
      fuente: 'OrcaSlicer Wiki, Brim',
      alcance:
        'La anchura efectiva adelante del objeto es Brim-object gap + Leading length + Width, y a cada lado Brim-object gap + Width + Extra width. Auto arrange no reserva espacio para el leading brim, asi que hay que dejar hueco suficiente.',
    },
    {
      id: 'brim-flow',
      accion: 'Sube ligeramente el brim_flow_ratio si la pieza no se sujeta',
      valor: '>1,0',
      cuando: { objetivo: 'adhesion' },
      porque:
        'brim_flow_ratio multiplica el flow del filamento y del objeto; un valor ligeramente mayor que 1,0 puede ayudar al brim a sujetar la impresion sobre la placa, a costa de dificultar la remocion.',
      fuente: 'OrcaSlicer Wiki, Brim',
      alcance:
        'Conviene calibrar el flow ratio antes de usar un valor distinto de 1. El resultado no se ve afectado por el first-layer flow ratio, que solo actua sobre el resto de la primera capa.',
    },
    {
      id: 'efc-outline',
      accion: 'Activa brim use EFC outline solo si la compensacion altera la huella',
      valor: 'brim_use_efc_outline',
      porque:
        'Alinea el brim con el perimetro tras la compensacion de pie de elefante, cuando cambia mucho la huella. Con el setup ya bien, activarlo es innecesario y funde el brim con las capas superiores.',
      fuente: 'OrcaSlicer Wiki, Brim',
      alcance:
        'Ayuda a la anexion del brim con compensacion alta o cuando la previsualizacion muestra el brim despegado; un setup ya calibrado puede no necesitarlo. Con EFC alto, el brim despegado en preview puede ser esperable y no un fallo.',
    },
    {
      id: 'outer-vs-inner',
      accion: 'Elige brim outer por defecto; inner solo si necesitas ocultar la costura',
      cuando: { objetivo: 'adhesion' },
      porque:
        'outer_only es mas facil de remover que inner_only y menos invasivo visualmente; inner_only oculta la costura de remocion pero es menos efectivo y puede tapar detalles finos.',
      fuente: 'OrcaSlicer Wiki, Brim',
      alcance:
        'Si se necesita maxima adhesion global y se acepta limpieza dificil, outer_and_inner combina ambos; en modelos complejos o materiales exigentes se sugiere considerar un raft en lugar.',
    },
    {
      id: 'min-skirt-length',
      accion: 'Ajusta min_skirt_length si no usas linea de purga',
      valor: 'min_skirt_length (mm)',
      porque:
        'min_skirt_length fija los milimetros minimos de filamento extruido al imprimir el skirt; es util cuando la impresora esta configurada para imprimir sin prime line. Ponerlo a 0 desactiva el ajuste.',
      fuente: 'OrcaSlicer Wiki, Skirt',
      alcance:
        'El numero final de bucles no se considera al ordenar objetos ni al validar distancias; si se depende de un minimo de extrusion, aumentar los bucles compensa. No define una cifra universal: depende de la boquilla y del perfil.',
    },
  ],

  fueraDeAlcance: [
    {
      sintoma: 'La pieza se despega por una esquina a mitad de impresion',
      porQue:
        'Es warping: contraccion termica, no falta de brim. Un brim mas ancho puede retrasarlo, pero no corrige la causa, que esta en temperaturas, cerramiento o velocidad.',
      guia: 'warping-pla',
    },
    {
      sintoma: 'La primera capa no se pega o el Z-offset esta mal',
      porQue:
        'Eso es adhesion de la primera capa, no falta de brim. El ajuste Z y la limpieza de chapa cubren ese caso antes que cualquier tipo de brim.',
      guia: 'adhesion-primera-capa',
    },
    {
      sintoma: 'La base sale mas ancha que el resto',
      porQue:
        'Es pie de elefante, no falta de brim ni de adhesion. El brim no corrige el reborde y ademas puede parecerse separado en la previsualizacion con compensacion activa.',
      guia: 'elephant-foot',
    },
  ],

  fuentes: [
    {
      url: 'https://github.com/OrcaSlicer/OrcaSlicer/wiki/others_settings_skirt',
      quien: 'OrcaSlicer',
      que: 'Skirt: funcion, loops, tipos, distancias, velocidades, altura, draft shield y single loop.',
    },
    {
      url: 'https://github.com/OrcaSlicer/OrcaSlicer/wiki/others_settings_brim',
      quien: 'OrcaSlicer',
      que: 'Brim: tipos, auto brim, outer/inner, mouse ears, painted, no_brim, leading/extrawidth, flow y EFC outline.',
    },
    {
      url: 'https://github.com/OrcaSlicer/OrcaSlicer/wiki/prepare_brim_ears_painting',
      quien: 'OrcaSlicer',
      que: 'Brim ears painting: herramienta manual, auto-generate, radio 0,1-100 mm.',
    },
    {
      url: 'https://github.com/OrcaSlicer/OrcaSlicer/wiki/quality_settings_precision',
      quien: 'OrcaSlicer',
      que: 'Elephant foot compensation y su efecto en el brim en preview.',
    },
    {
      url: 'https://github.com/OrcaSlicer/OrcaSlicer/wiki/quality_settings_wall_and_surfaces',
      quien: 'OrcaSlicer',
      que: 'Flow ratio: first layer flow no afecta a brims ni a skirts.',
    },
    {
      url: 'https://github.com/OrcaSlicer/OrcaSlicer/wiki/support_settings_raft',
      quien: 'OrcaSlicer',
      que: 'Raft: cuando usarlo, construccion y limitaciones (belt).',
    },
  ],

  leeDelAnalisis: ['material'],
  campos: [],
};