import type { Guia } from './tipos';
import { AUTOR } from './autor.ts';

export const elephantFoot: Guia = {
  slug: 'elephant-foot',
  titulo: 'Pie de elefante (elephant foot)',
  resumen:
    'La base sale más ancha que el resto.',
  resumenExtra:
    'Antes de compensar, mide dónde está el ensanchamiento y si la máquina está demasiado baja: la compensación mueve el contorno, no cura la causa.',
  sintoma: 'La base sale más ancha que arriba',
  dibujo: 'primera-capa',
  entrada:
    'La primera capa y a veces las primeras salen más anchas que las superiores y dejan un anillo saliente en el borde inferior. La causa nominal es que la primera capa se prensa sobre la cama caliente todavía blanda; el peso de las capas superiores y la temperatura de la cama deciden cuánto se nota.',
  autor: AUTOR,
  actualizado: '2026-10-16',
  minutos: 3,

  diferencial: {
    contra: 'warping, separación entre capas o adhesión excesiva',
    contraCorto: 'warping o separación',
    comprobaciones: [
      {
        id: 'borde',
        mira: '¿Dónde está el ensanchamiento?',
        si: 'Sólo en la base: un anillo saliente en el borde inferior, y las capas superiores tienen el tamaño correcto. Es pie de elefante.',
        no: 'También en capas superiores o en el centro: no es un defecto de la primera capa.',
      },
      {
        id: 'base',
        mira: '¿La base está plana o arqueada?',
        si: 'Plana, con el reborde lateral. Es pie de elefante.',
        no: 'Arqueada hacia arriba desde la cama. Es warping, y el ajuste es otro.',
      },
      {
        id: 'pegado',
        mira: '¿La pieza se puede despegar?',
        si: 'Se va con la mano: es falta de adhesión o pie de elefante, no adhesión excesiva.',
        no: 'No sale, o se lleva la chapa: esa es la rama opuesta, no esta guía.',
      },
    ],
    siNo: { guia: 'warping-pla', etiqueta: 'Warping en PLA' },
  },

  variables: [
    {
      id: 'material',
      etiqueta: 'Material',
      indicador: 'material',
      para: 'Solo PLA y ABS traen cifras por material; el resto sigue el mismo procedimiento, con valores aún no acotados por las fuentes.',
      necesaria: true,
      campos: ['material'],
      opciones: [
        { id: 'pla', etiqueta: 'PLA' },
        { id: 'petg', etiqueta: 'PETG' },
        { id: 'abs', etiqueta: 'ABS o ASA' },
        { id: 'pa', etiqueta: 'PA o TPU' },
      ],
    },
    {
      id: 'cama',
      etiqueta: 'Temperatura de cama ahora',
      indicador: 'cama',
      para: 'Decide si el ajuste es bajar o subir, y eso depende del diagnóstico real, no de la apariencia.',
      campos: ['bedTemp'],
      opciones: [
        { id: 'alta', etiqueta: 'Alta (≥60 °C)' },
        { id: 'media', etiqueta: 'Media (40–55 °C)' },
        { id: 'baja', etiqueta: 'Baja o sin cama' },
      ],
    },
    {
      id: 'chapa',
      etiqueta: 'Chapa',
      indicador: 'cama',
      para: 'El valor de compensación no es intercambiable entre tipos de placa, y algunas máquinas ajustan fino según texturizada o no.',
      necesaria: true,
      opciones: [
        { id: 'cool', etiqueta: 'Cool Plate o lisa' },
        { id: 'textured', etiqueta: 'Textured PEI' },
        { id: 'smooth', etiqueta: 'Smooth PEI' },
        { id: 'engineering', etiqueta: 'Engineering Plate' },
        { id: 'acero', etiqueta: 'Chapa de acero flexible' },
      ],
    },
    {
      id: 'brim',
      etiqueta: '¿Usabas brim?',
      indicador: 'geometria',
      para: 'Con compensación activa el brim parece separado en la previsualización y eso no es un error; el exceso de compensación sí se separa en la pieza real.',
      opciones: [
        { id: 'si', etiqueta: 'Sí' },
        { id: 'no', etiqueta: 'No' },
      ],
    },
    {
      id: 'severidad',
      etiqueta: '¿Qué tan grave es?',
      indicador: 'general',
      para: 'Leve: la compensación del slicer basta. Severo: hay que centrarse en nivelación, Z-offset y temperatura de cama.',
      opciones: [
        { id: 'leve', etiqueta: 'Leve, no afecta al ensamble' },
        { id: 'severo', etiqueta: 'Severo o afecta a tolerancias' },
      ],
    },
    {
      id: 'medicion',
      etiqueta: '¿Qué dice la medición?',
      indicador: 'calibracion',
      para: 'Distingue el pie de elefante clásico del abultamiento por contracción diferencial, que se ven igual pero piden ajustes opuestos.',
      opciones: [
        { id: 'primera', etiqueta: 'Solo la primera capa sobresale' },
        { id: 'posteriores', etiqueta: 'También las capas 2–5' },
        { id: 'no-medido', etiqueta: 'No lo he medido' },
      ],
    },
    {
      id: 'slicer',
      etiqueta: 'Slicer',
      indicador: 'slicer',
      para: 'Los parámetros, las rutas y las fórmulas cambian según el programa, y Orca generaliza a varias capas la compensación que Prusa y Bambu aplican a la primera.',
      opciones: [
        { id: 'prusa', etiqueta: 'PrusaSlicer' },
        { id: 'bambu', etiqueta: 'Bambu Studio' },
        { id: 'orca', etiqueta: 'OrcaSlicer' },
        { id: 'cura', etiqueta: 'Cura' },
        { id: 'otro', etiqueta: 'Otro' },
      ],
    },
  ],

  conocimiento: [
    {
      id: 'concepto',
      titulo: 'Qué es el pie de elefante',
      puntos: [
        'La primera capa y a veces las primeras salen más anchas que las superiores y dejan un anillo saliente en el borde inferior.',
        'La causa física nominal es que esa capa se prensa contra la cama caliente y, antes de haber enfriado,.',
        'sigue blanda y se deforma con facilidad.',
        'La segunda causa mecánica es el peso de las capas superiores sobre una base que todavía no ha fraguado.',
        'cuanto más grande el modelo y más ancha la base, más se nota.',
      ],
      indicador: 'calibracion',
      cuerpo:
        'La primera capa y a veces las primeras salen más anchas que las superiores y dejan un anillo saliente en el borde inferior. La causa física nominal es que esa capa se prensa contra la cama caliente y, antes de haber enfriado, sigue blanda y se deforma con facilidad. La segunda causa mecánica es el peso de las capas superiores sobre una base que todavía no ha fraguado: cuanto más grande el modelo y más ancha la base, más se nota.',
      cita: {
        texto: '(usually layer 1, and sometimes the first few layers)',
        fuente: 'wiki.bambulab.com',
      },
    },
    {
      id: 'termica',
      titulo: 'Dos temperaturas, dos sentidos',
      puntos: [
        'Creality da el ajuste en una dirección —bajar la cama en incrementos de unos 5 °C para que la base deje de reblandecerse— y un reporte del.',
        'foro de Bambu propone la contraria para el mismo aspecto,.',
        'subir de 55 a 60 °C para mejorar la adherencia.',
        'Son dos problemas con la misma apariencia aparente: Creality asume base reblandecida por calor.',
        'el hilo del foro es identificado por varios participantes como warping por contracción diferencial.',
        'El ajuste de temperatura va en direcciones opuestas según el diagnóstico real, por eso hay que medir y no adivinar por la apariencia.',
      ],
      indicador: 'cama',
      cuerpo:
        'Creality da el ajuste en una dirección —bajar la cama en incrementos de unos 5 °C para que la base deje de reblandecerse— y un reporte del foro de Bambu propone la contraria para el mismo aspecto, subir de 55 a 60 °C para mejorar la adherencia. Son dos problemas con la misma apariencia aparente: Creality asume base reblandecida por calor; el hilo del foro es identificado por varios participantes como warping por contracción diferencial. El ajuste de temperatura va en direcciones opuestas según el diagnóstico real, por eso hay que medir y no adivinar por la apariencia.',
      cita: {
        texto: 'A high bed temperature causes the layers to be "more fluid" and consequently "spread outwards" when squished by the nozzle.',
        fuente: 'creality.com',
      },
    },
    {
      id: 'compensacion',
      titulo: 'Compensación: mueve el contorno, no cura la causa',
      puntos: [
        'El slicer reduce intencionalmente el contorno de la primera capa para alinearla con las superiores.',
        'Es una corrección geométrica, no un remedio de nozzle bajo ni de cama sobrecalentada,.',
        'por eso sirve como estándar cuando la máquina ya está bien calibrada.',
        'Prusa la trae activada por defecto en sus perfiles oficiales con unos 0,2 mm para la boquilla de 0,4 mm.',
        'Bambu dice que el valor del sistema sirve para modelos generales y, para precisión alta, hay que medir y calcular.',
      ],
      indicador: 'calibracion',
      cuerpo:
        'El slicer reduce intencionalmente el contorno de la primera capa para alinearla con las superiores. Es una corrección geométrica, no un remedio de nozzle bajo ni de cama sobrecalentada, por eso sirve como estándar cuando la máquina ya está bien calibrada. Prusa la trae activada por defecto en sus perfiles oficiales con unos 0,2 mm para la boquilla de 0,4 mm; Bambu dice que el valor del sistema sirve para modelos generales y, para precisión alta, hay que medir y calcular.',
      cifra: { valor: '0,2 mm', nota: 'típico para boquilla de 0,4 mm (Prusa)' },
      cita: {
        texto: 'Values around 0.2 mm usually work well for the default 0.4 mm nozzle.',
        fuente: 'help.prusa3d.com',
      },
    },
    {
      id: 'medicion',
      titulo: 'Cómo medir el valor exacto',
      cuando: { severidad: 'severo' },
      puntos: [
        'Limpiar la placa, hacer auto bed leveling completo y flow dynamics calibration,.',
        'imprimir la pieza de prueba (cubo de 25 × 25 × 10 mm o el gauge block de pie de elefante) con compensación a cero y sin brim,.',
        'dejar enfriar del todo a temperatura ambiente.',
        'Medir en la mitad de cada lado, no en las esquinas, con calibre o micrómetro de al menos 0,01 mm.',
        'desviación X igual a tamaño de foot X menos tamaño de referencia X,.',
        'y el valor de compensación igual a (desviación X + desviación Y) entre 2. El ejemplo del propio wiki da 0,10 mm.',
      ],
      indicador: 'calibracion',
      cuerpo:
        'Limpiar la placa, hacer auto bed leveling completo y flow dynamics calibration, imprimir la pieza de prueba (cubo de 25 × 25 × 10 mm o el gauge block de pie de elefante) con compensación a cero y sin brim, dejar enfriar del todo a temperatura ambiente. Medir en la mitad de cada lado, no en las esquinas, con calibre o micrómetro de al menos 0,01 mm; desviación X igual a tamaño de foot X menos tamaño de referencia X, y el valor de compensación igual a (desviación X + desviación Y) entre 2. El ejemplo del propio wiki da 0,10 mm.',
      cifra: { valor: '≥0,01 mm', nota: 'resolución mínima del calibre' },
      cita: {
        texto: 'Elephant foot compensation value: (X deviation + Y deviation) / 2 = Elephant foot compensation value',
        fuente: 'wiki.bambulab.com',
      },
    },
    {
      id: 'criterio',
      titulo: 'Cuándo compensación y cuándo fixes mecánicos',
      puntos: [
        'Abultamiento menor y dimensiones no críticas: compensación del slicer o expansión horizontal negativa como fix rápido.',
        'Abultamiento severo o tolerancias ajustadas: nivelación, Z-offset y bajada de temperatura de cama.',
        'Con causa incierta, calibrar primero y aplicar compensación si queda residuo; con materiales que exigen cama alta (ABS y similares),.',
        'enfriamiento y detalle CAD antes que compensación.',
      ],
      indicador: 'calibracion',
      cuerpo:
        'Abultamiento menor y dimensiones no críticas: compensación del slicer o expansión horizontal negativa como fix rápido. Abultamiento severo o tolerancias ajustadas: nivelación, Z-offset y bajada de temperatura de cama. Con causa incierta, calibrar primero y aplicar compensación si queda residuo; con materiales que exigen cama alta (ABS y similares), enfriamiento y detalle CAD antes que compensación.',
      cita: {
        texto: 'Over-adjusting compensation: Setting an excessive negative expansion or compensation value can make the base undersized or cause brim separation.',
        fuente: 'creality.com',
      },
    },
    {
      id: 'z-offset',
      titulo: 'Nozzle demasiado cerca: la causa más directa',
      puntos: [
        'La boquilla demasiado próxima a la cama aplasta el filamento sobre la placa y la primera capa sobresale.',
        'Si la primera capa está sobrecoplada, subir el Z-offset 0,05–0,1 mm y reimprimir un patrón de prueba.',
        'Las camas desiguales dan abultamientos localizados de un lado, por eso conviene re-nivelar.',
        'Los ajustes físico de nozzle (0,05–0,1 mm) y el offset de firmware en la macro G29.1 de la serie A1 (−0,02 ~ 0 mm en texturizada,.',
        '−0,01 ~ 0,01 en no texturizada) no son comparables ni promediables.',
      ],
      indicador: 'calibracion',
      cuerpo:
        'La boquilla demasiado próxima a la cama aplasta el filamento sobre la placa y la primera capa sobresale. Si la primera capa está sobrecoplada, subir el Z-offset 0,05–0,1 mm y reimprimir un patrón de prueba. Las camas desiguales dan abultamientos localizados de un lado, por eso conviene re-nivelar. Los ajustes físico de nozzle (0,05–0,1 mm) y el offset de firmware en la macro G29.1 de la serie A1 (−0,02 ~ 0 mm en texturizada, −0,01 ~ 0,01 en no texturizada) no son comparables ni promediables.',
      cita: {
        texto: 'If your first layer is being oversquished, you should try raising your Z offset by 0.05-0.1 mm.',
        fuente: 'creality.com',
      },
    },
    {
      id: 'first-layer-low',
      titulo: 'First layer too low en la serie A1',
      cuando: { slicer: 'bambu' },
      puntos: [
        'El defecto se ve como pelado, abultamiento y líneas onduladas en la primera capa.',
        'Causas: bed leveling no realizado, hotend más cerca de la cama que cuando se niveló, o extrusión excesiva de la primera capa.',
        'Bambu recomienda hacer el bed leveling automático antes de imprimir, especialmente tras cambiar la placa PEI.',
        'También propone re-apretar los tornillos del heater assembly y comprobar que su clip esté bien fijado,.',
        'porque el hotend puede desplazarse hacia abajo con la presión de extrusión.',
      ],
      indicador: 'calibracion',
      cuerpo:
        'El defecto se ve como pelado, abultamiento y líneas onduladas en la primera capa. Causas: bed leveling no realizado, hotend más cerca de la cama que cuando se niveló, o extrusión excesiva de la primera capa. Bambu recomienda hacer el bed leveling automático antes de imprimir, especialmente tras cambiar la placa PEI. También propone re-apretar los tornillos del heater assembly y comprobar que su clip esté bien fijado, porque el hotend puede desplazarse hacia abajo con la presión de extrusión.',
      cita: {
        texto: '"First layer too low" means that the distance between the nozzle and the build plate is too close, resulting defects such as "peeling," "bulging," and "wavy lines" on the first layer.',
        fuente: 'wiki.bambulab.com (A1)',
      },
    },
    {
      id: 'orca-formula',
      titulo: 'La fórmula capa a capa (OrcaSlicer)',
      cuando: { slicer: 'orca' },
      puntos: [
        'Compensación positiva que achica la primera capa decreciendo linealmente en N capas: capa 1 al 100 %,.',
        'capas intermedias decrecimiento lineal, y cero por encima de N. Fórmula por capa.',
        'compensation = input_compensation_distance − (input_compensation_distance / input_compensation_layers) × (current_layer − 1),.',
        'para current_layer ≤ input_compensation_layers.',
        'Se omite por completo con raft.',
        '«Elephant Foot Compensation Density» (80–90 % como punto de partida,.',
        '1–2 capas) reduce la densidad del infill sólido interno en las capas compensadas para mitigar ripples.',
      ],
      indicador: 'calibracion',
      cuerpo:
        'Compensación positiva que achica la primera capa decreciendo linealmente en N capas: capa 1 al 100 %, capas intermedias decrecimiento lineal, y cero por encima de N. Fórmula por capa: compensation = input_compensation_distance − (input_compensation_distance / input_compensation_layers) × (current_layer − 1), para current_layer ≤ input_compensation_layers. Se omite por completo con raft. «Elephant Foot Compensation Density» (80–90 % como punto de partida, 1–2 capas) reduce la densidad del infill sólido interno en las capas compensadas para mitigar ripples.',
      cifra: { valor: '80–90 %', nota: 'densidad EFC, punto de partida (Orca)' },
      cita: {
        texto: 'compensation = input_compensation_distance − (input_compensation_distance / input_compensation_layers) × (current_layer − 1)',
        fuente: 'github.com/OrcaSlicer',
      },
    },
    {
      id: 'brim-preview',
      titulo: 'Con compensación, el brim parece separado',
      cuando: { brim: 'si' },
      puntos: [
        'Con compensación activa el brim aparece separado del modelo en la previsualización.',
        'en la impresión real el hueco se rellena por el material aplastado y el brim queda unido.',
        'Si con brim-object gap a 0 mm sigue habiendo hueco a la vista, la causa más probable es la propia compensación.',
        'Si el brim se separa en la pieza real, la compensación es excesiva.',
        'El brim estabiliza los bordes y distribuye el aplastamiento, pero no corrige el reborde.',
      ],
      indicador: 'calibracion',
      cuerpo:
        'Con compensación activa el brim aparece separado del modelo en la previsualización; en la impresión real el hueco se rellena por el material aplastado y el brim queda unido. Si con brim-object gap a 0 mm sigue habiendo hueco a la vista, la causa más probable es la propia compensación. Si el brim se separa en la pieza real, la compensación es excesiva. El brim estabiliza los bordes y distribuye el aplastamiento, pero no corrige el reborde.',
      cita: {
        texto: 'During actual printing, that gap is usually filled by the squished material.',
        fuente: 'help.prusa3d.com',
      },
    },
    {
      id: 'temperatura',
      titulo: 'Temperatura de cama, con valores por material',
      cuando: { material: 'pla' },
      puntos: [
        'Temperatura de cama demasiado alta hace la base más fluida: se extiende al ser aplastada por la boquilla.',
        'Bajarla en incrementos de unos 5 °C y re-probar.',
        'Valores indicativos: PLA 50–60 °C (no necesita mucho más que ~60 °C) y ABS alrededor de 90–100 °C. OrcaSlicer lista la temperatura de cama.',
        'demasiado alta entre las causas explícitas.',
        'Con materiales que exigen cama alta, los fixes mecánicos van antes que la compensación.',
      ],
      indicador: 'calibracion',
      cuerpo:
        'Temperatura de cama demasiado alta hace la base más fluida: se extiende al ser aplastada por la boquilla. Bajarla en incrementos de unos 5 °C y re-probar. Valores indicativos: PLA 50–60 °C (no necesita mucho más que ~60 °C) y ABS alrededor de 90–100 °C. OrcaSlicer lista la temperatura de cama demasiado alta entre las causas explícitas. Con materiales que exigen cama alta, los fixes mecánicos van antes que la compensación.',
      cifra: { valor: '50–60 °C', nota: 'PLA indicativo (Creality)' },
      cita: {
        texto: 'For example, PLA typically needs only ~60 °C.',
        fuente: 'creality.com',
      },
    },
    {
      id: 'extrusion-enfriamiento',
      titulo: 'Over-extrusión, enfriamiento y fixes mecánicos',
      puntos: [
        'Over-extrusión en la primera capa (flow alto o ancho de línea alto de primera capa) hace que sobresalga.',
        'bajar el flow de la primera capa al 90–100 % o reducir el ancho de línea.',
        'Falta de enfriamiento mantiene la base blanda con el peso de las capas superiores; activar el ventilador pronto (capa 2 o 3 en adelante),.',
        'con PLA desde el principio.',
        'Chaflán o redondeo de 0,5–5 mm a 45° en los bordes de la base hace que el abultamiento se asiente en la cara inclinada y no en la base',
        'funcional.',
        'Brim de 5–10 mm distribuye el aplastamiento pero no elimina el reborde; raft para casos severos.',
      ],
      indicador: 'ventilacion',
      cuerpo:
        'Over-extrusión en la primera capa (flow alto o ancho de línea alto de primera capa) hace que sobresalga: bajar el flow de la primera capa al 90–100 % o reducir el ancho de línea. Falta de enfriamiento mantiene la base blanda con el peso de las capas superiores; activar el ventilador pronto (capa 2 o 3 en adelante), con PLA desde el principio. Chaflán o redondeo de 0,5–5 mm a 45° en los bordes de la base hace que el abultamiento se asiente en la cara inclinada y no en la base funcional. Brim de 5–10 mm distribuye el aplastamiento pero no elimina el reborde; raft para casos severos.',
      cita: {
        texto: 'In your CAD model, add a small chamfer or fillet (e.g. 0.5-5 mm at 45°) to the edges of the base.',
        fuente: 'creality.com',
      },
    },
  ],

  reglas: [
    {
      id: 'medir',
      accion: 'Mide el abultamiento antes de cambiar nada',
      valor: 'calibre o micrómetro ≥0,01 mm',
      porque:
        'La misma apariencia puede ser pie de elefante, warping o contracción diferencial, y los ajustes van en sentidos distintos. Bambu exige medir para obtener el valor de compensación; sin medida no se sabe qué se está corrigiendo.',
      fuente: 'Bambu Lab',
      alcance:
        'La resolución mínima publicada es 0,01 mm. Medir en la mitad de cada lado, no en las esquinas, que se ven afectadas por flow dynamics. Medir el problema no resuelve por sí solo la causa, pero evita ajustar en la dirección equivocada.',
    },
    {
      id: 'limpiar-placa',
      accion: 'Limpia la placa con agua caliente y jabón',
      valor: 'agua caliente + jabón',
      porque:
        'Es el primer paso del procedimiento de calibración medido de Bambu y condición previa a la nivelación. Evitar tocar la superficie después.',
      fuente: 'Bambu Lab',
      alcance:
        'La fuente prescribe el paso de limpieza; no cuantifica su eficacia ni lo compara con otros fabricantes. Si la chapa o los ajustes no coinciden con el perfil, la limpieza no arregla el reborde por sí sola.',
    },
    {
      id: 'autolevel',
      accion: 'Haz un auto bed leveling completo y flow dynamics calibration',
      porque:
        'Son los pasos segundo y tercero del procedimiento de calibración de Bambu. La nivelación mal hecha es causa explícita del defecto en la serie A1.',
      fuente: 'Bambu Lab',
    },
    {
      id: 'testcube',
      accion: 'Imprime la pieza de prueba con compensación a cero y sin brim',
      valor: 'cubo 25 × 25 × 10 mm',
      porque:
        'Bambu propone cubo de 25 × 25 × 10 mm o el gauge block «elephant foot», con compensación a cero y brim desactivado, para obtener el valor exacto sin que el brim confunda la medida.',
      fuente: 'Bambu Lab',
      alcance:
        'El cubo es el ejemplo del wiki; la fórmula vale para cualquier pieza de prueba equivalente siempre que se mida en la mitad de cada lado y se deje enfriar del todo a temperatura ambiente.',
    },
    {
      id: 'enfriar',
      accion: 'Deja enfriar la pieza a temperatura ambiente antes de medir',
      porque:
        'Bambu exige esperar a que la cama se enfríe del todo a temperatura ambiente antes de retirar la pieza; medir en caliente falsea la dimensión real. La segunda causa mecánica del defecto es el peso de las capas superiores sobre una base blanda, así que el enfriado es parte del fenómeno.',
      fuente: 'Bambu Lab',
    },
    {
      id: 'punto-medio',
      accion: 'Mide en la mitad de cada lado, no en las esquinas',
      porque:
        'Las esquinas se ven afectadas por flow dynamics, así que no representan el ensanchamiento real. Mide tocando suavemente con las mordazas el borde escamado de la primera capa.',
      fuente: 'Bambu Lab',
    },
    {
      id: 'z-offset',
      accion: 'Sube el Z-offset si la primera capa está sobrecoplada',
      valor: '0,05–0,1 mm',
      cuando: { medicion: 'primera' },
      porque:
        'La boquilla demasiado cerca de la cama es la causa directa más mencionada: aplasta el filamento y la primera capa sobresale. Subir 0,05–0,1 mm y reimprimir un patrón de prueba para confirmar que la base no se aplasta en exceso.',
      fuente: 'Creality',
      alcance:
        'Es un ajuste físico del nozzle. No es comparable ni promediable con el offset de firmware de la macro G29.1 de la serie A1 (−0,02 ~ 0 mm en texturizada y −0,01 ~ 0,01 en no texturizada), que es otro mecanismo. No se promedian aquí.',
    },
    {
      id: 'relevel',
      accion: 'Re-nivela la cama, especialmente si el defecto es local',
      cuando: { medicion: 'primera' },
      porque:
        'Camas desiguales producen abultamientos localizados de un lado, y Bambu cita re-nivelar y subir ligeramente el nozzle. Bambu sitúa la nivelación como causa rara («in some rare cases») con adhesión inconsistente, no como causa de una esquina levantada.',
      fuente: 'Creality, Bambu Lab',
      alcance:
        'La formulación «raro» de Bambu viene con la acción y no puede separarse de ella: es la única de las fuentes de este lote que menciona la nivelación como causa y la única que adjetiva su frecuencia.',
    },
    {
      id: 'a1-textured',
      accion: 'Ajusta el offset fino en la Bambu A1 con placa texturizada',
      valor: 'G29.1 Z −0,02 ~ 0 mm',
      cuando: { slicer: 'bambu', chapa: 'textured', medicion: 'primera' },
      porque:
        'La primera capa demasiado baja en la serie A1 se ve como pelado, abultamiento y líneas onduladas. El rango temporal para placa texturizada va de −0,02 a 0 mm. Si la primera capa está demasiado baja, sube el offset; si está demasiado alta, bájalo.',
      fuente: 'Bambu Lab (A1)',
      alcance:
        'Fix temporal sobre la marcha: puede introducir defectos locales, y conviene restaurar el valor por defecto tras corregir la causa raíz. No es el ajuste físico del Z-offset, sino el offset de firmware en la macro G29.1.',
    },
    {
      id: 'a1-lisa',
      accion: 'Ajusta el offset fino en la Bambu A1 con placa no texturizada',
      valor: 'G29.1 Z −0,01 ~ 0,01 mm',
      cuando: { slicer: 'bambu', chapa: ['cool', 'smooth', 'engineering', 'acero'], medicion: 'primera' },
      porque:
        'Para las placas no texturizadas el rango temporal de la serie A1 es de −0,01 a 0,01 mm, y la regla es la misma: primera capa demasiado baja sube el offset, demasiado alta lo baja.',
      fuente: 'Bambu Lab (A1)',
      alcance:
        'Mismo aviso que la regla anterior: fix temporal que conviene revertir a default tras corregir la causa raíz, y no comparable con el rango texturizado ni con el ajuste físico del nozzle.',
    },
    {
      id: 'reapretar-hotend',
      accion: 'Re-aprieta los tornillos del heater assembly y comprueba su clip',
      cuando: { slicer: 'bambu', medicion: 'primera' },
      porque:
        'Si el clip que fija el heater assembly no está bien asegurado, el hotend puede desplazarse hacia abajo con la presión de extrusión durante la impresión y dejar la primera capa demasiado baja. Validación: sin movimiento apreciable al mover el hotend manualmente.',
      fuente: 'Bambu Lab (A1)',
      alcance:
        'Aplica a la serie A1 (3 tornillos M3×10 + 4 tornillos M2×6 con arandela plana y de presión). La fuente no lo extiende a otras impresoras, así que no se presenta como procedimiento general.',
    },
    {
      id: 'bajar-temp-pla',
      accion: 'Baja la temperatura de cama',
      valor: 'PLA 50–60 °C (~5 °C por prueba)',
      cuando: { material: 'pla', cama: ['alta', 'media'], medicion: 'primera' },
      rango: { campo: 'bedTemp', min: 50, max: 60, unidad: '°C' },
      porque:
        'Temperatura de cama demasiado alta hace la base más fluida: se extiende al ser aplastada por la boquilla. Bajar en incrementos de unos 5 °C y re-probar. PLA normalmente sólo necesita alrededor de 60 °C; imprimir PLA con temperaturas muy altas produce una base excesivamente blanda.',
      fuente: 'Creality',
      alcance:
        'El rango es indicativo por material. Con la textura de las cifras, ningún fabricante de este lote dice qué ocurre por salirse de rango en una Cool Plate. Material de este lote con indicación por material: PLA y ABS.',
    },
    {
      id: 'bajar-temp-abs',
      accion: 'Baja la temperatura de cama',
      valor: 'ABS ~90–100 °C (~5 °C por prueba)',
      cuando: { material: 'abs', cama: ['alta', 'media'], medicion: 'primera' },
      rango: { campo: 'bedTemp', min: 90, max: 100, unidad: '°C' },
      porque:
        'Mismo mecanismo que con PLA: base demasiado blanda por calor que se extiende al ser aplastada. ABS alrededor de 90–100 °C. Bajar en incrementos de unos 5 °C y re-probar.',
      fuente: 'Creality',
      alcance:
        'El rango es indicativo por material. La guía no inventa cifras para PETG o PA porque ninguna fuente de este lote las da para el pie de elefante.',
    },
    {
      id: 'bajar-temp-otros',
      accion: 'Baja la temperatura de cama',
      valor: '−5 °C por prueba',
      cuando: { material: ['petg', 'pa'], cama: ['alta', 'media'], medicion: 'primera' },
      porque:
        'Mismo mecanismo —base demasiado blanda que se extiende al ser aplastada— pero ninguna fuente de este lote da una cifra por material para PETG o PA. Reducir en incrementos de unos 5 °C y re-probar.',
      fuente: 'Creality, OrcaSlicer',
      alcance:
        'Sin cifra propia: el rango exacto lo decide el material y la chapa, y OrcaSlicer sólo lista «temperatura de cama demasiado alta» entre las causas. No se interpola desde PLA ni ABS.',
    },
    {
      id: 'subir-temp-experimento',
      accion: 'Sube la cama de 55 a 60 °C como experimento',
      valor: '55 → 60 °C',
      cuando: { material: 'pla', cama: 'baja', medicion: 'posteriores' },
      porque:
        'Un único reporte (sin respaldo) atribuye el mismo aspecto a contracción diferencial por filamento húmedo y propone subir la cama de 55 a 60 °C. Va en la dirección contraria a bajarla, porque busca mejorar la adherencia, no reducir un reblandecimiento.',
      fuente: 'Bambu Lab forum',
      alcance:
        'UNA SOLA FUENTE, sin corroborar. No se presenta como solución general del pie de elefante clásico ni para la primera capa. Si la medición muestra ensanchamiento sólo en la primera capa, no aplicar este cambio.',
    },
    {
      id: 'flow-primera-capa',
      accion: 'Baja el flow de la primera capa',
      valor: '90–100 %',
      cuando: { medicion: 'primera' },
      porque:
        'Over-extrusión en la primera capa (flow alto o ancho de línea alto) hace que esa capa sobresalga. Alternativamente, reducir el ancho de línea de la primera capa.',
      fuente: 'Creality',
      alcance:
        'Es un ajuste de la primera capa, no del flujo global. Reducir el flujo global cambiaría todas las capas; la fuente no lo propone.',
    },
    {
      id: 'enfriamiento',
      accion: 'Activa el ventilador antes',
      valor: 'desde capa 2–3',
      cuando: { medicion: 'primera' },
      porque:
        'Falta de enfriamiento de las primeras capas mantiene la base blanda y la hace sobresalir con el peso de las capas superiores. Activarlo pronto solidifica la base antes de recibir ese peso; con PLA desde el principio, y algunos sistemas permiten unos 50 % en la primera capa y velocidad completa en la segunda.',
      fuente: 'Creality',
      alcance:
        'La fuente no fija un porcentaje único de ventilador; el «50 % en la primera capa» es un caso posible, no una recomendación universal.',
    },
    {
      id: 'compensacion',
      accion: 'Aplica la compensación del slicer de forma medida',
      valor: '0,05–0,1 mm por prueba',
      cuando: { severidad: 'leve', medicion: ['primera', 'no-medido'] },
      porque:
        'La compensación achica la primera capa para que se alinee con las superiores, y Creality la presenta como fix rápido para abultamiento menor con dimensiones no críticas, siempre después de calibrar. Ajustar en pasos pequeños y volver a probar; un exceso deja la base infradimensionada o separa el brim.',
      fuente: 'Creality',
      alcance:
        'Es una corrección geométrica del contorno, no una cura de nozzle bajo ni de cama sobrecalentada. Por eso va después de calibrar la máquina y se afina con 0,05–0,1 mm por prueba. Prusa la trae por defecto en sus perfiles; no contradice a Creality, que la sitúa como fallback.',
    },
    {
      id: 'orca-density',
      accion: 'Baja la densidad EFC si hay ripples en capas bajas',
      valor: '80–90 %, 1–2 capas',
      cuando: { slicer: 'orca', severidad: 'leve' },
      porque:
        '«Elephant Foot Compensation Density» reduce la densidad del infill sólido interno en las capas compensadas por encima de la capa base para mitigar ripples y marcas de boquilla. Sólo afecta al infill sólido interno dentro de la zona de compensación, no al infill disperso, a las superficies superiores ni a la capa base.',
      fuente: 'OrcaSlicer',
      alcance:
        'Recomendación práctica de empezar con 80–90 % y 1–2 capas y ajustar según los ripples visibles o las marcas en las capas sólidas bajas. No cambia ni la capa base ni las capas por encima de N.',
    },
    {
      id: 'cura-horizontal',
      accion: 'Initial Layer Horizontal Expansion con valor negativo',
      valor: '−0,1 mm',
      cuando: { slicer: 'cura', severidad: 'leve' },
      porque:
        'Cura no tiene parámetro específico de pie de elefante; un valor negativo (por ejemplo −0,1 mm) hace que la primera capa se imprima dentro de los límites del modelo.',
      fuente: 'Creality',
      alcance:
        'Equivalente funcional al EFC del resto de slicers, pero sin fórmula de decrecimiento por capas publicada en este lote. El valor es un ejemplo, no el único posible.',
    },
    {
      id: 'calibrar-antes',
      accion: 'Calibra la máquina antes de usar compensación',
      cuando: { severidad: 'severo' },
      porque:
        'Creality presenta la compensación del slicer como el último recurso, siempre después de calibrar. Con abultamiento severo o tolerancias ajustadas, el centro del trabajo es la nivelación, el Z-offset y la temperatura de cama.',
      fuente: 'Creality',
      alcance:
        'No contradice a Prusa, que la trae por defecto en sus perfiles: la compensación es la corrección geométrica estándar cuando la máquina ya está bien calibrada. Las dos posiciones son compatibles.',
    },
    {
      id: 'chamfer',
      accion: 'Añade un chaflán o redondeo en los bordes de la base',
      valor: '0,5–5 mm a 45°',
      cuando: { severidad: 'severo', medicion: 'primera' },
      porque:
        'Fix de diseño: el abultamiento se asienta en la cara inclinada y no en la base funcional. Útil cuando el problema residual persiste tras los fixes mecánicos.',
      fuente: 'Creality',
      alcance:
        'La cifra da un rango y un ángulo, no un valor único: el chaflán se escoge dentro de ese rango según la pieza y la tolerancia. No es una cura del reblandecimiento por calor.',
    },
    {
      id: 'brim-on',
      accion: 'Activa un brim para distribuir el aplastamiento',
      valor: '5–10 mm',
      cuando: { brim: 'no' },
      porque:
        'Un brim de 5–10 mm puede distribuir el aplastamiento sobre un área mayor y estabilizar los bordes. No elimina el pie de elefante por sí solo, pero ayuda a la adherencia y a la estabilidad.',
      fuente: 'Creality',
      alcance:
        'Ayuda a la adherencia y a la estabilización; no corrige el reborde. Si el defecto es severo, el brim no sustituye a la nivelación ni al Z-offset.',
    },
    {
      id: 'brim-caution',
      accion: 'Si el brim se separa en la pieza real, reduce la compensación',
      valor: '0,05 mm por paso',
      cuando: { brim: 'si' },
      porque:
        'La separación en la previsualización es esperada y se rellena por el material aplastado; la separación en la pieza real indica compensación excesiva. Ajustar en pasos de 0,05 mm y re-probar.',
      fuente: 'Bambu Lab, Creality',
      alcance:
        'Dos fenómenos que se parecen: previsualización (esperada y se rellena) frente a pieza real (exceso de compensación). No promediar pasos de 0,05 con los ajustes de Z-offset: son magnitudes de mecanismos distintos.',
    },
    {
      id: 'raft',
      accion: 'Usa un raft en casos severos',
      cuando: { severidad: 'severo' },
      porque:
        'El raft absorbe la deformación y la base del modelo sale plana. Es la opción de último recurso para abultamiento que persiste tras los fixes mecánicos.',
      fuente: 'Creality',
    },
    {
      id: 'recalcular-placa',
      accion: 'Recalcula la compensación al cambiar de placa',
      porque:
        'El valor de compensación varía según el tipo de placa de impresión y no es intercambiable entre tipos. Tras un cambio de placa hay que recalcular. El valor no se inventa aquí: se obtiene midiendo, como en el procedimiento anterior.',
      fuente: 'Bambu Lab',
      alcance:
        'La guía no da una cifra por placa porque la fuente no la da; la condición es procedimental. La chapa declarada sirve para no suponer que un valor medido en una Cool Plate vale para una Textured PEI.',
    },
  ],

  fueraDeAlcance: [
    {
      sintoma: 'La base arqueada hacia arriba, con las esquinas que se levantan',
      porQue:
        'Es warping: contracción térmica, no reblandecimiento de la primera capa. Cambiar el Z-offset o la compensación no lo arregla; la primera capa puede estar perfecta y la esquina levantarse igual.',
      guia: 'warping-pla',
    },
    {
      sintoma: 'La base plana y las capas que se sueltan por dentro',
      porQue:
        'Es separación entre capas, no pie de elefante. Cambiar la temperatura o el ventilador no lo arregla; el protocolo es otro.',
      guia: 'separaciones-entre-capas',
    },
    {
      sintoma: 'La base no se pega o no se puede despegar',
      porQue:
        'Eso es un problema de adhesión de la primera capa (demasiada o insuficiente), no un reborde lateral. El ajuste Z y la limpieza de chapa cubren ese caso.',
      guia: 'adhesion-primera-capa',
    },
  ],

  fuentes: [
    {
      url: 'https://help.prusa3d.com/article/elephant-foot-compensation_114487',
      quien: 'Prusa Research',
      que: 'Compensación: ruta, 0,2 mm, perfiles por defecto, brim desconectado en previsualización.',
    },
    {
      url: 'https://wiki.bambulab.com/en/software/bambu-studio/parameter/elephant-foot',
      quien: 'Bambu Lab',
      que: 'Compensación: procedimiento de calibración medido, fórmula, chapa no intercambiable, brim en previsualización.',
    },
    {
      url: 'https://github.com/OrcaSlicer/OrcaSlicer/wiki/quality_settings_precision',
      quien: 'OrcaSlicer',
      que: 'Parámetros, fórmula decreciente por capas, density y ripples.',
    },
    {
      url: 'https://www.creality.com/blog/3d-printer-elephant-foot',
      quien: 'Creality',
      que: 'Causas, criterio compensación vs fixes, Z-offset, temperatura de cama, extrusión, enfriamiento, brim, raft, chamfer.',
    },
    {
      url: 'https://www.klipper3d.org/Probe_Calibrate.html',
      quien: 'Klipper',
      que: 'Calibración de sonda: z_offset, PROBE_CALIBRATE, sesgos de ubicación y temperatura.',
    },
    {
      url: 'https://wiki.bambulab.com/en/a1-mini/troubleshooting/print-issues-troubleshooting',
      quien: 'Bambu Lab',
      que: 'First layer too low en la serie A1: G29.1 Z y tornillos del heater assembly.',
    },
    {
      url: 'https://forum.bambulab.com/t/elephants-foot-mushrooming/110247',
      quien: 'Foro de Bambu Lab',
      que: 'Reporte sin respaldo: posible contracción diferencial por humedad y experimento de subir la cama.',
    },
  ],

  leeDelAnalisis: ['material', 'bedTemp'],
};
