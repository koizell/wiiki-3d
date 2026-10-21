import type { Guia } from './tipos.ts';
import { AUTOR } from './autor.ts';

export const esquinasPetg: Guia = {
  slug: 'esquinas-petg',
  titulo: 'Esquinas levantadas en PETG (warping)',
  resumen:
    'El PETG ensombrece el warping del PLA pero sus esquinas se levantan igual. Confirma primero que no es fallo de adhesión ni colapso, y ajusta chapa, cama y enfriamiento según tu montaje.',
  sintoma: 'Esquinas levantadas en PETG',
  dibujo: 'esquinas',
  entrada:
    'El PETG es menos propenso a warpear que ABS, ASA, PC o PA, pero sus esquinas se levantan igual cuando la base no sujeta o el enfriamiento es inadecuado. Aquí casi nunca es el filamento: es la chapa, la cama, el aire y el ventilador. Antes de subir la cama, confirma que el daño son esquinas levantadas y no un deslizamiento de la pieza o un colapso.',
  autor: AUTOR,
  actualizado: '2026-10-16',
  minutos: 5,
  diferencial: {
    contra: 'fallo de adhesión a la cama y colapso estructural',
    contraCorto: 'adhesión o colapso',
    comprobaciones: [
      {
        id: 'borde',
        mira: 'La base de la pieza pegada a la cama: ¿está plana o arqueada hacia arriba?',
        si: 'Arqueada hacia arriba desde la cama, con tensión visible en las esquinas: es corner warping.',
        no: 'Plana, con las capas sueltas por dentro. Es separación entre capas; no se arregla tocando la cama.',
      },
      {
        id: 'rotura',
        mira: '¿Dónde aparece el defecto en la pieza?',
        si: 'En el borde o esquina exterior; a veces con una línea horizontal en el lateral donde la boquilla volvió a golpear la capa levantada.',
        no: 'En el centro, en una sección horizontal o la pieza salta/rueda: no es corner warping.',
      },
      {
        id: 'suelta',
        mira: '¿La pieza se despega entera o se tumba, o sólo levanta esquinas?',
        si: 'Sólo esquinas o bordes: corner warping localizado.',
        no: 'Deslizamiento de toda la pieza o nido de filamento en la parte superior: fallo de adhesión o colapso, otra guía.',
      },
    ],
    siNo: { guia: 'despegue-a-mitad', etiqueta: 'Despegue a mitad de impresión' },
  },
  variables: [
    {
      id: 'chapa',
      etiqueta: 'Chapa',
      indicador: 'cama',
      para: 'Decide si PETG está recomendado y la cifra de cama; más que el fabricante.',
      necesaria: true,
      opciones: [
        { id: 'cool-plate', etiqueta: 'Cool Plate', detalle: 'No recomendada para PETG' },
        { id: 'textured', etiqueta: 'Textured PEI', detalle: '60–80 °C' },
        { id: 'smooth', etiqueta: 'Smooth PEI', detalle: '60–80 °C' },
        { id: 'engineering', etiqueta: 'Engineering Plate', detalle: '60–80 °C' },
        { id: 'acero', etiqueta: 'Acero liso' },
      ],
    },
    {
      id: 'tamaño',
      etiqueta: 'Tamaño o forma de la pieza',
      indicador: 'geometria',
      para: 'Los modelos grandes y planos warpean más; los altos y delgados se tumban.',
      necesaria: true,
      opciones: [
        { id: 'grande', etiqueta: 'Grande y plana', detalle: 'La más propensa' },
        { id: 'mediana', etiqueta: 'Mediana' },
        { id: 'pequena', etiqueta: 'Pequeña' },
        { id: 'alta-delgada', etiqueta: 'Alta y delgada', detalle: 'Propensa a tumba' },
      ],
    },
    {
      id: 'cama',
      etiqueta: 'Temperatura de cama ahora',
      indicador: 'cama',
      para: 'Bambu da 60–80 °C y Prusa/Prusament 70–90 °C; la acción depende de si estás por encima o por debajo.',
      necesaria: true,
      opciones: [
        { id: 'baja', etiqueta: 'Baja', detalle: 'Por debajo de 60 °C' },
        { id: 'media', etiqueta: 'Media', detalle: 'Dentro del solape' },
        { id: 'alta', etiqueta: 'Alta', detalle: 'Por encima de 80 °C' },
      ],
    },
    {
      id: 'ambiente',
      etiqueta: 'Temperatura ambiente',
      indicador: 'entorno',
      para: 'Por debajo de 20 °C aparece warping incluso en PETG y conviene actuar; el aire alto o con corriente también.',
      necesaria: true,
      opciones: [
        { id: 'frio', etiqueta: 'Frío (<20 °C)' },
        { id: 'templado', etiqueta: 'Templado (20–30 °C)' },
        { id: 'alto', etiqueta: 'Alto (>30 °C)' },
        { id: 'corriente', etiqueta: 'Con corriente de aire cerca' },
      ],
    },
    {
      id: 'recinto',
      etiqueta: '¿Trabajabas con el recinto cerrado?',
      indicador: 'entorno',
      para: 'Proteger de corrientes ayuda, pero PETG necesita cooling y no debe superar ~40 °C de ambiente.',
      opciones: [
        { id: 'abierto', etiqueta: 'Abierto o sin tapa' },
        { id: 'cerrado', etiqueta: 'Cerrado' },
        { id: 'sin-tapa', etiqueta: 'Sin tapa superior' },
      ],
    },
    {
      id: 'fan',
      etiqueta: 'Ventilador de pieza / auxiliar',
      indicador: 'ventilacion',
      para: 'Dos fuentes dicen direcciones opuestas: Bambu baja el cooling, Prusa comprueba que esté activo y sube.',
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
      para: 'PETG absorbe humedad; los síntomas son crujidos, burbujas, stringing y capas internas débiles.',
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
      titulo: 'Por qué se levanta en PETG',
      puntos: [
        'Es contracción térmica.',
        'Los bordes exteriores se enfrían antes que el centro, y esa diferencia genera una tensión que tira de las esquinas hacia arriba.',
        'PETG tiene baja expansión térmica y raramente warpea, pero un enfriamiento desigual o una base que no sujetó basta para levantarlo.',
      ],
      indicador: 'temperatura',
      cuerpo:
        'Es contracción térmica. Los bordes exteriores se enfrían antes que el centro, y esa diferencia genera una tensión que tira de las esquinas hacia arriba. PETG tiene baja expansión térmica y raramente warpea, pero un enfriamiento desigual o una base que no sujetó basta para levantarlo.',
    },
    {
      id: 'ranking',
      titulo: 'El ranking de riesgo de warping',
      puntos: [
        'Bambu ordena por riesgo de warping los materiales propensos a contraerse: PC, PA-CF, PA, ABS, ASA, PETG, PLA.',
        'PETG queda justo por encima del PLA.',
        'Son siete materiales del propio filtro de Bambu, no todos los rígidos.',
      ],
      indicador: 'material',
      cuerpo:
        'Bambu ordena por riesgo de warping los materiales propensos a contraerse: PC, PA-CF, PA, ABS, ASA, PETG, PLA. PETG queda justo por encima del PLA. Son siete materiales del propio filtro de Bambu, no todos los rígidos.',
      cifra: { valor: '7 -> 1', nota: 'PC el mas propenso; PLA el menos' },
    },
    {
      id: 'cama-bambu',
      titulo: 'Cama para PETG segun Bambu',
      puntos: [
        'Bambu da 60-80 °C en la tabla por filamento, con glue stick o liquid glue en el mismo rango.',
        'En la tabla por placa, las placas PEI (Engineering, Smooth, High-Temp y Textured) piden 60-80 °C para PETG.',
        'la Cool Plate no está recomendada.',
      ],
      indicador: 'cama',
      cuerpo:
        'Bambu da 60-80 °C en la tabla por filamento, con glue stick o liquid glue en el mismo rango. En la tabla por placa, las placas PEI (Engineering, Smooth, High-Temp y Textured) piden 60-80 °C para PETG; la Cool Plate no está recomendada.',
      cifra: { valor: '60-80 °C', nota: 'PETG en placas PEI (Bambu)' },
    },
    {
      id: 'cama-prusa',
      titulo: 'Cama para PETG segun Prusa y Prusament',
      puntos: [
        'Prusa da 70-90 °C para PETG en la guía de materiales,.',
        'y Prusament PETG afina el mismo rango como 80 ± 10 °C. Las tres bandas solapan entre 70 y 80 °C.',
      ],
      indicador: 'cama',
      cuerpo:
        'Prusa da 70-90 °C para PETG en la guía de materiales, y Prusament PETG afina el mismo rango como 80 ± 10 °C. Las tres bandas solapan entre 70 y 80 °C.',
      cifra: { valor: '70-90 °C', nota: 'PETG (Prusa / Prusament)' },
    },
    {
      id: 'cama-contradiccion',
      titulo: 'Las dos cifras no son un único número',
      puntos: [
        'Bambu mide sobre sus placas propias y deja un margen de ±5 °C admitido por OrcaSlicer.',
        'Prusa y Prusament sobre PEI estándar y redondean distinto.',
        'Lo útil es dar el rango propio de cada fabricante y placa.',
        'El acuerdo está en 70-80 °C.',
      ],
      indicador: 'slicer',
      cuerpo:
        'Bambu mide sobre sus placas propias y deja un margen de ±5 °C admitido por OrcaSlicer; Prusa y Prusament sobre PEI estándar y redondean distinto. Lo útil es dar el rango propio de cada fabricante y placa. El acuerdo está en 70-80 °C.',
    },
    {
      id: 'recinto-matiz',
      titulo: 'Recinto: util y limitado para PETG',
      puntos: [
        'PETG no necesita temperatura ambiente obligatoria y tolera grandes objetos sin recinto.',
        'El recinto protege de corrientes y ambiente frío, pero PETG necesita mucho cooling y una cámara demasiado caliente lo dificulta.',
        'Las piezas de la impresora son de PETG y se deforman por encima de 40-50 °C, así que el ambiente no debe pasar de ahí.',
      ],
      indicador: 'ventilacion',
      cuerpo:
        'PETG no necesita temperatura ambiente obligatoria y tolera grandes objetos sin recinto. El recinto protege de corrientes y ambiente frío, pero PETG necesita mucho cooling y una cámara demasiado caliente lo dificulta. Las piezas de la impresora son de PETG y se deforman por encima de 40-50 °C, así que el ambiente no debe pasar de ahí.',
      cuando: { ambiente: ['frio', 'alto'] },
    },
    {
      id: 'recinto-sin-corroborar',
      titulo: 'Banda razonable de ambiente en recinto',
      puntos: [
        'Un usuario del foro de Prusa propone 20-40 °C de ambiente para PETG en recinto.',
        'Es una sola fuente secundaria, sin corroborar.',
        'el extremo alto choca con los 40-50 °C a partir de los cuales las piezas PETG de la impresora se deforman.',
      ],
      indicador: 'maquina',
      cuerpo:
        'Un usuario del foro de Prusa propone 20-40 °C de ambiente para PETG en recinto. Es una sola fuente secundaria, sin corroborar; el extremo alto choca con los 40-50 °C a partir de los cuales las piezas PETG de la impresora se deforman.',
      cifra: { valor: '20-40 °C', nota: 'Una sola fuente, sin corroborar' },
      cuando: { recinto: ['cerrado'] },
    },
    {
      id: 'fan-contradiccion',
      titulo: 'Ventilador: dos direcciones segun qué ventilador',
      puntos: [
        'Bambu habla del auxiliar: exceso de cooling enfría las paredes exteriores demasiado rápido y desencadena warping; recomendado 40-50 %,.',
        'bajarlo a 20-30 % si hay warping, y sin ventilador en las 3 primeras capas.',
        'Prusa habla del ventilador de pieza: PETG necesita mucho cooling y, si las esquinas se levantan,.',
        'hay que comprobar que esté activo y sin obstrucciones y probar a subir la velocidad.',
        'Ambas pueden ser ciertas según qué ventilador y qué ha fallado: comprobar primero si está activo y sin obstrucciones; si ya está alto,.',
        'bajarlo.',
      ],
      indicador: 'ventilacion',
      cuerpo:
        'Bambu habla del auxiliar: exceso de cooling enfría las paredes exteriores demasiado rápido y desencadena warping; recomendado 40-50 %, bajarlo a 20-30 % si hay warping, y sin ventilador en las 3 primeras capas. Prusa habla del ventilador de pieza: PETG necesita mucho cooling y, si las esquinas se levantan, hay que comprobar que esté activo y sin obstrucciones y probar a subir la velocidad. Ambas pueden ser ciertas según qué ventilador y qué ha fallado: comprobar primero si está activo y sin obstrucciones; si ya está alto, bajarlo.',
      cuando: { fan: ['desconocido', 'apagado', 'bajo', 'alto'] },
    },
    {
      id: 'fan-desacuerdo',
      titulo: 'No hay una unica respuesta sobre el ventilador auxiliar',
      puntos: [
        'Bambu escribe dos cifras en dos paginas para el mismo ventilador auxiliar: bajarlo a 40-50 % en una, y reducirlo 20-30 % en otra.',
        'El material cocinado no resuelve cuál aplicar; ambas se exponen y no se promedian.',
      ],
      indicador: 'ventilacion',
      cuerpo:
        'Bambu escribe dos cifras en dos paginas para el mismo ventilador auxiliar: bajarlo a 40-50 % en una, y reducirlo 20-30 % en otra. El material cocinado no resuelve cuál aplicar; ambas se exponen y no se promedian.',
      cifra: { valor: '40-50 % o 20-30 %', nota: 'Bambu, dos paginas, sin resolver' },
      cuando: { fan: ['alto'] },
    },
    {
      id: 'primeras-3',
      titulo: 'Sin ventilador en las tres primeras capas',
      puntos: [
        'Mantener apagado el enfriamiento en las primeras 3 capas mejora la adhesión y el enfriamiento lento de las capas, evitando warping.',
        'Es el ajuste que Bambu señala como el mas importante para el warping.',
      ],
      indicador: 'ventilacion',
      cuerpo:
        'Mantener apagado el enfriamiento en las primeras 3 capas mejora la adhesión y el enfriamiento lento de las capas, evitando warping. Es el ajuste que Bambu señala como el mas importante para el warping.',
      cifra: { valor: '0 %', nota: 'Enfriamiento en las primeras 3 capas' },
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
      cifra: { valor: '-0,04 mm', nota: 'Offset automatico en PEI texturizada' },
      cuando: { chapa: 'textured' },
    },
    {
      id: 'petg-extrusor',
      titulo: 'Temperatura de boquilla para PETG',
      puntos: [
        'Bambu da 240-270 °C, Prusa 215-270 °C y Prusament 250 ± 10 °C. El rango propio depende del filamento y del hotend.',
        'Si el ventilador excesivo ha levantado la pieza, subir la temperatura de boquilla recupera la union entre capas.',
      ],
      indicador: 'ventilacion',
      cuerpo:
        'Bambu da 240-270 °C, Prusa 215-270 °C y Prusament 250 ± 10 °C. El rango propio depende del filamento y del hotend. Si el ventilador excesivo ha levantado la pieza, subir la temperatura de boquilla recupera la union entre capas.',
      cifra: { valor: '240-270 °C', nota: 'PETG según Bambu Lab' },
    },
    {
      id: 'infill-patron',
      titulo: 'Relleno y patron para PETG',
      puntos: [
        'Modelos planos grandes: Gyroid a unas 25 % como techo; Grid y Triangle generan tension lineal interna,.',
        'Gyroid se encoge de forma mas uniforme.',
        'Piezas estructurales: 5 paredes y unos 25 %; no estructurales: 2 paredes y 15 %.',
        'Evitar mas de 50 %.',
        'Para partes duraderas, aumentar primero el número de perimetros, no el porcentaje de relleno.',
      ],
      indicador: 'material',
      cuerpo:
        'Modelos planos grandes: Gyroid a unas 25 % como techo; Grid y Triangle generan tension lineal interna, Gyroid se encoge de forma mas uniforme. Piezas estructurales: 5 paredes y unos 25 %; no estructurales: 2 paredes y 15 %. Evitar mas de 50 %. Para partes duraderas, aumentar primero el número de perimetros, no el porcentaje de relleno.',
      cifra: { valor: '≤25 %', nota: 'Gyroid, techo recomendado' },
      cuando: { infill: ['cruzado', 'gyroid'] },
    },
    {
      id: 'brim-alcance',
      titulo: 'Brim completo o brim ears',
      puntos: [
        'Bambu recomienda un brim de 8-10 mm o brim ears pintados solo en las esquinas que levantan.',
        'Prusa propone un brim normal para aumentar la adhesion.',
        'No se contradicen: el brim completo es la salida basica; los brim ears son la versión dirigida a esquinas concretas.',
      ],
      indicador: 'calibracion',
      cuerpo:
        'Bambu recomienda un brim de 8-10 mm o brim ears pintados solo en las esquinas que levantan. Prusa propone un brim normal para aumentar la adhesion. No se contradicen: el brim completo es la salida basica; los brim ears son la versión dirigida a esquinas concretas.',
      cifra: { valor: '8-10 mm', nota: 'Brim para esquinas que levantan' },
      cuando: { tamaño: ['grande', 'mediana'] },
    },
    {
      id: 'superficie',
      titulo: 'Superficie limpia y adhesion excesiva',
      puntos: [
        'PETG tiene adhesión fuerte a la cama; IPA puede dejarla demasiado fuerte.',
        'Limpiar con limpiacristales o agua con detergente cuando la cama esta fría.',
        'Bambu da agua templada y jabon, enjuagar y secar al aire; no tocar con las manos desnudas.',
      ],
      indicador: 'calibracion',
      cuerpo:
        'PETG tiene adhesión fuerte a la cama; IPA puede dejarla demasiado fuerte. Limpiar con limpiacristales o agua con detergente cuando la cama esta fría. Bambu da agua templada y jabon, enjuagar y secar al aire; no tocar con las manos desnudas.',
    },
    {
      id: 'ambiente-20',
      titulo: 'Ambiente por debajo de 20 °C',
      puntos: [
        'Si la habitacion esta por debajo de 20 °C, aparecen problemas de warping incluso con PLA y PETG, que son materiales permisivos.',
        'Las corrientes de aire enfrían un lado antes que el otro y aumentan la tensión entre capas.',
        'conviene bloquear el flujo alrededor de la impresora.',
      ],
      indicador: 'maquina',
      cuerpo:
        'Si la habitacion esta por debajo de 20 °C, aparecen problemas de warping incluso con PLA y PETG, que son materiales permisivos. Las corrientes de aire enfrían un lado antes que el otro y aumentan la tensión entre capas; conviene bloquear el flujo alrededor de la impresora.',
      cuando: { ambiente: ['frio', 'corriente'] },
    },
    {
      id: 'humedad-secado',
      titulo: 'Humedad en PETG y secado',
      puntos: [
        'PETG absorbe humedad.',
        'Filamento húmedo da sonidos de crujido o popping, superficies rugosas, burbujas, stringing y resistencia reducida.',
        'Secar antes de reintentar: 70 °C durante 8 h en horno de secado, o 65 °C durante 12 h en AMS.',
      ],
      indicador: 'temperatura',
      cuerpo:
        'PETG absorbe humedad. Filamento húmedo da sonidos de crujido o popping, superficies rugosas, burbujas, stringing y resistencia reducida. Secar antes de reintentar: 70 °C durante 8 h en horno de secado, o 65 °C durante 12 h en AMS.',
      cifra: { valor: '70 °C/8 h o 65 °C/12 h', nota: 'Secado de PETG' },
      cuando: { humedad: ['humedo', 'desconocido'] },
    },
  ],
  reglas: [
    {
      id: 'limpiar',
      accion: 'Limpia la chapa con agua templada y jabón',
      valor: 'Enjuaga y deja secar al aire',
      porque:
        'Es el primero de los tres pasos que Bambu atribuye a aproximadamente el 80 % de los fallos de warping y adhesion. Después de limpiar, no toques la superficie con las manos.',
      fuente: 'Bambu Lab',
      alcance: 'Regla general para PETG en esta guía; no depende de la chapa ni del filamento.',
    },
    {
      id: 'nivelar',
      accion: 'Nivela la cama',
      valor: 'Calibración automática completa',
      porque:
        'Segundo paso del mismo Tier 1, y Bambu lo pide especialmente después de mover la impresora, hacer mantenimiento o cambiar de chapa.',
      fuente: 'Bambu Lab',
      alcance: 'Regla general; la nivelación va antes que cualquier cifra de temperatura.',
    },
    {
      id: 'boquilla',
      accion: 'Comprueba que la boquilla está bien instalada',
      porque: 'Los clips tienen que estar apretados en la forma correcta para que no quede floja.',
      fuente: 'Bambu Lab',
      alcance: 'Regla general; una boquilla floja da fallos de adhesion que se confunden con warping.',
    },
    {
      id: 'secar',
      accion: 'Seca el PETG antes de reintentar',
      valor: '70 °C/8 h (horno) o 65 °C/12 h (AMS)',
      porque:
        'PETG absorbe humedad y el filamento humedo da crujidos, burbujas y stringing, reduciendo la unión entre capas. Secar es el primer gesto antes de tocar temperaturas.',
      cuando: { humedad: ['humedo', 'desconocido'] },
      fuente: 'Bambu Lab',
      alcance: 'Sin mas cifras respaldadas por estas fuentes; usar el programa del fabricante del secador.',
    },
    {
      id: 'cool-plate-no',
      accion: 'Cambia a chapa PEI y sube la cama',
      valor: '60-80 °C en PEI',
      rango: { campo: 'bedTemp', min: 60, max: 80, unidad: '°C' },
      porque:
        'La Cool Plate no está recomendada para PETG en la tabla por placa de Bambu. Con otras placas PEI el rango oficial es 60-80 °C.',
      cuando: { chapa: 'cool-plate' },
      fuente: 'Bambu Lab',
      alcance: 'Aplica a PETG/PETG HF/PETG Translucent; no incluye segunda marca.',
    },
    {
      id: 'cama-petg',
      accion: 'Sube la temperatura de cama',
      valor: '60-80 °C',
      rango: { campo: 'bedTemp', min: 60, max: 80, unidad: '°C' },
      porque:
        'Es el rango de Bambu para PETG en placas PEI. La acción no inventa una cifra única para todos los fabricantes.',
      cuando: { chapa: ['textured', 'smooth', 'engineering'], cama: ['baja', 'media'] },
      fuente: 'Bambu Lab',
      alcance: 'Bambu 60-80 °C; Prusa/Prusament 70-90 °C. El acuerdo está en 70-80 °C.',
    },
    {
      id: 'cama-alta',
      accion: 'Baja la cama si la primera capa sale blanda',
      valor: 'Baja en pasos de 5 °C (sin cifra absoluta)',
      porque:
        'Si el PETG se reblandece por exceso de calor y la primera capa sobresale, reducir la cama en incrementos ayuda. Los fixes mecánicos (limpieza, nivelación) van antes.',
      cuando: { cama: 'alta', tamaño: 'grande' },
      fuente: 'Creality',
      alcance: 'Incremento por prueba, no una cifra absoluta ni un promedio entre fabricantes.',
    },
    {
      id: 'ambiente-frio',
      accion: 'Sube la cama +10 °C',
      valor: '+10 °C',
      porque:
        'En ambiente por debajo de 20 °C conviene aumentar la temperatura de cama +10 °C para frenar el enfriamiento entre capas y asegurar que no haya corrientes de aire.',
      cuando: { ambiente: 'frio' },
      fuente: 'Bambu Lab',
      alcance: 'Bambu la da como ajuste directo para entorno frío, incluidas impresoras open-frame.',
    },
    {
      id: 'ambiente-alto',
      accion: 'Abre la puerta frontal y quita la tapa superior',
      porque:
        'Con temperatura ambiente alta y cama alta, la cámara calienta demasiado PETG y dificulta el cooling que necesita.',
      cuando: { ambiente: 'alto' },
      fuente: 'Prusa Research',
      alcance: 'Prusa desaconseja el recinto para PLA/PETG por el cooling; Bambu no lo prohíbe, pero su guía de recinto va a materiales de alta temperatura.',
    },
    {
      id: 'corriente',
      accion: 'Bloquea la corriente de aire alrededor de la impresora',
      porque:
        'Una ventana abierta, un aire acondicionado o un ventilador de mesa basta para enfriar un lado más que el otro, y esa diferencia genera la tensión que levanta las esquinas.',
      cuando: { ambiente: 'corriente' },
      fuente: 'Bambu Lab, Simplify3D',
    },
    {
      id: 'recinto-abrir',
      accion: 'Abre la puerta frontal y/o quita la tapa',
      porque:
        'Para filamentos con temperatura de reblandecimiento por debajo de 60 °C y cama por encima de 45 °C, Bambu recomienda abrir la puerta y/o quitar la tapa para que el calor de la cámara no reblandezca el filamento.',
      cuando: { cama: 'alta', recinto: 'cerrado' },
      fuente: 'Bambu Lab',
      alcance: 'Es un y/o de la fuente; traducirlo como "las dos cosas" exigiría una conjunción que no pidió.',
    },
    {
      id: 'recinto-cerrar',
      accion: 'Cierra la puerta y la tapa',
      porque:
        'Si la habitacion esta fría, cerrar bloquea corrientes y eleva la temperatura ambiente alrededor de la impresora. Sin pasar de 40-50 °C, por el riesgo de deformar piezas PETG de la impresora.',
      cuando: { ambiente: 'frio', recinto: 'abierto' },
      fuente: 'Bambu Lab',
      alcance: 'PETG no necesita cámara caliente; la protección es contra corrientes, no contra el frío intenso.',
    },
    {
      id: 'fan-primeras-3',
      accion: 'Apaga el enfriamiento en las 3 primeras capas',
      valor: 'Sin cooling en las 3 primeras capas',
      porque:
        'Es el ajuste que Bambu señala como el mas importante para el warping. Sin enfriamiento en esas capas la primera capa se enfría mas despacio y se pega mejor.',
      cuando: { cama: ['baja', 'media'] },
      fuente: 'Bambu Lab',
      alcance: 'Son las primeras capas de esta opción, no las del ventilador auxiliar. Son dos ajustes distintos.',
    },
    {
      id: 'fan-comprobar',
      accion: 'Comprueba que el ventilador de pieza esté activo y sin obstrucciones',
      porque:
        'PETG necesita mucho cooling; un ventilador apagado u obstruido reduce la adhesión entre capas y puede levantar las esquinas. Verificar que no esté fundido ni bloqueado.',
      cuando: { fan: ['desconocido', 'apagado'] },
      fuente: 'Prusa Research',
    },
    {
      id: 'fan-aux-bajar',
      accion: 'Baja el ventilador auxiliar',
      valor: '20-30 % (o 40-50 % segun la pagina)',
      porque:
        'El auxiliar alto enfría las paredes exteriores demasiado rápido. Bambu da dos cifras en dos paginas; el material no resuelve cuál aplicar.',
      cuando: { fan: 'alto' },
      fuente: 'Bambu Lab',
      alcance: 'Dos cifras de la misma fuente en dos paginas; no se promedian.',
    },
    {
      id: 'fan-exceso',
      accion: 'Si el ventilador excesivo ha levantado la pieza, sube la temperatura de boquilla',
      valor: '240-270 °C',
      porque:
        'Aumentar demasiado la velocidad del ventilador puede levantar el objeto entero y reducir la adhesion entre capas; subir la temperatura de boquilla recupera la unión.',
      cuando: { fan: 'alto' },
      fuente: 'Prusa Research, Bambu Lab',
      alcance: 'El extremo alto del ventilador es el que levanta la pieza; si no lo está, esta regla no aplica.',
    },
    {
      id: 'placa-texturizada',
      accion: 'Selecciona la placa Textured PEI al laminar',
      porque:
        'La placa Textured PEI baja la boquilla 0,04 mm tras nivelar. Si laminaste para otra placa, ese descenso no se aplica y la boquilla queda demasiado alta.',
      cuando: { chapa: 'textured' },
      fuente: 'Bambu Lab',
      alcance: 'Es un error de una línea de perfil, no de la máquina.',
    },
    {
      id: 'z-offset',
      accion: 'Baja ligeramente el Z para mejorar la adhesion',
      valor: 'Primer layer ligeramente aplastado',
      porque:
        'La primera capa debe quedar ligeramente aplastada, no flotando. Bajar el Z aumenta el aplastamiento; con PETG la adhesion puede ser excesiva y dañar la chapa PEI, por eso se ajusta con cuidado.',
      cuando: { chapa: ['textured', 'smooth'], cama: 'baja' },
      fuente: 'Bambu Lab, Prusa Research',
      alcance: 'Ajustar sólo si el primer layer ya está sobrecoplado, invertir el sentido del ajuste.',
    },
    {
      id: 'infill-gyroid',
      accion: 'Cambia el relleno a Gyroid',
      valor: '≤25 %',
      porque:
        'Grid y Triangle crean tensión lineal interna y el Gyroid se contrae por igual en todas las direcciones. Bambu lo pone como opción para modelos planos grandes con unas 25 % de densidad como techo.',
      cuando: { infill: 'cruzado', tamaño: ['grande', 'mediana'] },
      fuente: 'Bambu Lab',
      alcance: 'Que Gyroid mejora lo dicen las dos fuentes; que cubic sea mejor tiene una sola fuente, de foro.',
    },
    {
      id: 'infill-limit',
      accion: 'Evita relleno por encima del 50 %',
      valor: '>50 % provoca warping',
      porque:
        'El caso típico de infill alto que provoca warping es el 60 %, sobre el default del 15 %. Mas relleno, mas tensión lineal interna.',
      cuando: { infill: 'cruzado', tamaño: 'grande' },
      fuente: 'Bambu Lab',
      alcance: 'Es un ejemplo con número, no un umbral validado por todas las fuentes.',
    },
    {
      id: 'perimetros',
      accion: 'Aumenta primero el número de perimetros, no el relleno',
      porque:
        'Para partes duraderas, la mayor parte de la resistencia proviene de la pared exterior. Aumentar perimetros da resistencia sin la tensión lineal interna del relleno alto.',
      cuando: { tamaño: ['grande', 'mediana'] },
      fuente: 'Prusament PETG',
      alcance: 'Consejo de Prusament para partes duraderas; compatible con las cifras de relleno de Bambu.',
    },
    {
      id: 'limpiar-ipa',
      accion: 'Limpia la superficie con IPA al 90 %+ antes de imprimir',
      valor: 'IPA 90 % +',
      porque:
        'Prusa lo recomienda como rutina de limpieza primaria. Es alternativa complementaria al agua y jabón, no excluyente.',
      cuando: { chapa: ['smooth', 'engineering'] },
      fuente: 'Prusa Research',
    },
    {
      id: 'brim',
      accion: 'Añade un brim o brim ears en las esquinas',
      valor: '8-10 mm',
      porque:
        'Un brim de 8 a 10 mm aumenta la superficie en contacto con la cama. Si solo fallan dos esquinas, brim ears dirigidos solo a ellas es mejor que un brim entero.',
      cuando: { tamaño: ['grande', 'mediana'] },
      fuente: 'Bambu Lab',
    },
    {
      id: 'brim-extra',
      accion: 'Si el brim no basta, añade una geometría pequeña en la zona problemática',
      porque:
        'Una pequeña geometría (por ejemplo un cilindro) aumenta la superficie de contacto en la esquina que levanta.',
      cuando: { tamaño: 'grande' },
      fuente: 'Prusa Research',
    },
    {
      id: 'velocidad',
      accion: 'Reduce la velocidad de impresión',
      valor: '-20 a -30 %',
      porque:
        'Puede ayudar mucho en piezas grandes o altas y delgadas, haciendo que el conjunto se asiente y las capas se fundan correctamente.',
      cuando: { tamaño: ['grande', 'alta-delgada'], ambiente: ['frio', 'corriente'] },
      fuente: 'Prusa Research, Bambu Lab',
      alcance: 'Consejo general para warping; la cifra es de primera capa en otras fuentes y aquí se aplica a la impresión.',
    },
  ],
  fueraDeAlcance: [
    {
      sintoma: 'La pieza se desliza o salta de la cama',
      porQue:
        'Es fallo de adhesion global, no corner warping localizado. Tocar ajustes de warping no lo resuelve.',
      guia: 'despegue-a-mitad',
    },
    {
      sintoma: 'La pieza entera se tumba o sale como un nido de pájaro',
      porQue:
        'Es colapso estructural: problema mecanico o de adhesion, no de contracción termica local.',
      guia: 'despegue-a-mitad',
    },
    {
      sintoma: 'La superficie sale con burbujas, chasquidos o stringing',
      porQue:
        'Es humedad del filamento, no warping. La unica instrucción respaldada es secar y reintentar.',
    },
  ],
  fuentes: [
    {
      url: 'https://wiki.bambulab.com/en/filament-acc/filament/print-quality/warping-falling-off-collapsing',
      quien: 'Bambu Lab',
      que: 'Página de warping, despegue y colapso: mecanismo, ranking, Tier 1, adhesion, infill, brim y limpieza.',
    },
    {
      url: 'https://wiki.bambulab.com/en/knowledge-sharing/printed-model-warping',
      quien: 'Bambu Lab',
      que: 'Página de warping en modelos: enfriamiento, ventilador auxiliar, ambiente e infill.',
    },
    {
      url: 'https://wiki.bambulab.com/en/general/filament-guide-material-table',
      quien: 'Bambu Lab',
      que: 'Tabla de materiales: cama 60-80 °C para PETG, placa por placa y enclose para ambiente frío.',
    },
    {
      url: 'https://help.prusa3d.com/article/warping_2011',
      quien: 'Prusa Research',
      que: 'Knowledge base de warping: ventilador de pieza, recinto, adhesion y condiciones.',
    },
    {
      url: 'https://help.prusa3d.com/filament-material-guide',
      quien: 'Prusa Knowledge Base',
      que: 'Guía de materiales: PETG 70-90 °C de cama.',
    },
    {
      url: 'https://prusament.com/materials/prusament-petg/',
      quien: 'Prusament',
      que: 'Prusament PETG: cama 80 ± 10 °C, low warping, adhesion y secado.',
    },
    {
      url: 'https://www.orcaslicer.com/wiki/material_settings/filament/material_temperatures.html',
      quien: 'OrcaSlicer Wiki',
      que: 'Temperaturas de material: umbral de cama ±5 °C y ventilador de recinto para PLA/PETG/TPU/PVA.',
    },
    {
      url: 'https://forum.prusa3d.com/forum/original-prusa-i3-mk3s-mk3-user-mods-octoprint-enclosures-nozzles/optimal-enclosure-temps-for-pla-petg-abs',
      quien: 'Foro de Prusa',
      que: 'Temperaturas de enclosure por filamento y banda 20-40 °C (sin corroborar).',
    },
  ],
};
