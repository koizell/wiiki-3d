import type { Guia } from './tipos';
import { AUTOR } from './autor.ts';

export const mallaDeCama: Guia = {
  slug: 'malla-de-cama',
  titulo: 'Malla de cama y nivelación',
  resumen:
    'Qué corrige la malla de cama, qué no, y cuándo conviene ajustar el Z-offset a mano en vez de medir.',
  resumenExtra:
    'La malla mide la cama y la sigue, pero no corrige un offset alto ni una chapa sucia.',
  sintoma: 'La primera capa se pega a trozos',
  dibujo: 'cama',
  entrada:
    'La primera capa no pega del mismo modo en toda la base: unas zonas agarran y otras no. Eso es lo que la malla de cama puede arreglar, y lo arregla midiendo, no empujando la boquilla. Aquí se separa lo que la malla corrige de lo que no, y cuándo conviene pasar a mano.',
  autor: AUTOR,
  actualizado: '2026-10-21',
  minutos: 4,

  diferencial: {
    contra: 'warping, pie de elefante o adhesión que no pega en absoluto',
    contraCorto: 'warping o adhesión total',
    comprobaciones: [
      {
        id: 'dónde',
        mira: '¿Dónde falla: en toda la base o en unas zonas?',
        si: 'En unas zonas pega y en otras no, o cambia entre impresiones. Eso es la geometría de la cama.',
        no: 'La base entera no pega, o se levanta una esquina grande. Eso es otra cosa.',
      },
      {
        id: 'offset',
        mira: '¿La boquilla ha quedado demasiado alta o baja?',
        si: 'En toda la pieza queda pegada de menos o de más, y en toda la base. Es el offset, no la forma de la cama.',
        no: 'El fallo va por zonas, así que el offset no es la causa y hay que mirar la cama.',
      },
      {
        id: 'chapa',
        mira: '¿Has cambiado de chapa y la impresión ahora va peor?',
        si: 'La máquina no detecta la chapa y puede estar usando el offset de la anterior. Es cambio de chapa, no deformación de la cama.',
        no: 'La chapa es la misma y el fallo es de geometría. Sigue con la malla.',
      },
    ],
    siNo: { guia: 'warping-pla', etiqueta: 'Warping en PLA' },
  },

  variables: [
    {
      id: 'sintoma',
      etiqueta: '¿Qué falla en la primera capa?',
      indicador: 'general',
      para: 'Cada ramal tiene un remedio distinto: irregular es malla, no pega es otra guía.',
      necesaria: true,
      opciones: [
        { id: 'irregular', etiqueta: 'Se pega a trozos', detalle: 'Adhesión irregular' },
        { id: 'nopega', etiqueta: 'No pega en absoluto' },
        { id: 'esquina', etiqueta: 'Se levanta una esquina' },
      ],
    },
    {
      id: 'donde',
      etiqueta: '¿Dónde falla?',
      indicador: 'entorno',
      para: 'Un punto es geometría; toda la base es ajuste.',
      necesaria: true,
      opciones: [
        { id: 'toda', etiqueta: 'En toda la base' },
        { id: 'punto', etiqueta: 'En un punto concreto' },
        { id: 'inconsistente', etiqueta: 'A veces sí, a veces no' },
      ],
    },
    {
      id: 'chapa',
      etiqueta: 'Chapa montada',
      indicador: 'cama',
      para: 'Cambia el offset automático y la temperatura de cama.',
      necesaria: true,
      opciones: [
        { id: 'textured', etiqueta: 'Textured PEI', detalle: 'Baja la boquilla 0,04 mm' },
        { id: 'cool', etiqueta: 'Cool Plate o lisa' },
        { id: 'smooth', etiqueta: 'Smooth PEI' },
        { id: 'engineering', etiqueta: 'Engineering Plate' },
        { id: 'acero', etiqueta: 'Acero flexible' },
      ],
    },
    {
      id: 'sensor',
      etiqueta: 'Sensor de la impresora',
      indicador: 'calibracion',
      para: 'El probe y su menú dependen de la familia.',
      necesaria: true,
      opciones: [
        { id: 'pinda', etiqueta: 'PINDA / SuperPINDA' },
        { id: 'mini', etiqueta: 'M.I.N.D.A. (MINI)' },
        { id: 'loadcell', etiqueta: 'LoadCell (MK4/XL)' },
        { id: 'klipper', etiqueta: 'Sonda Klipper' },
      ],
    },
    {
      id: 'probe',
      etiqueta: '¿La sonda da resultados repetibles?',
      indicador: 'calibracion',
      para: 'Si no es repetible, el probe no sirve para nivelar.',
      opciones: [
        { id: 'si', etiqueta: 'Sí, repetible' },
        { id: 'no', etiqueta: 'No, varía' },
      ],
    },
    {
      id: 'calibrada',
      etiqueta: '¿Has hecho la calibración de primera capa?',
      indicador: 'calibracion',
      para: 'Filtra qué consejos de Z-offset aplican.',
      opciones: [
        { id: 'si', etiqueta: 'Sí, bien' },
        { id: 'no', etiqueta: 'No o no me acuerdo' },
      ],
    },
    {
      id: 'offset',
      etiqueta: 'Z-offset (boquilla)',
      indicador: 'calibracion',
      para: 'Alto = no pega; bajo = aprieta y daña la chapa.',
      opciones: [
        { id: 'alto', etiqueta: 'Demasiado alta' },
        { id: 'bajo', etiqueta: 'Demasiado baja' },
        { id: 'ok', etiqueta: 'Correcto' },
      ],
    },
  ],

  conocimiento: [
    {
      id: 'que-es-malla',
      titulo: 'La malla es una medida, no una corrección mecánica',
      puntos: [
        'El sensor recorre la cama en una rejilla, mide la distancia en cada punto e interpola una malla virtual de la superficie.',
        'Durante la impresión la boquilla la sigue punto por punto.',
        'Cubre el caso de una cama **ligeramente combada**: no una deformación grande ni una chapa doblada.',
      ],
      indicador: 'cama',
      cuerpo:
        'El sensor recorre la cama en una rejilla, mide la distancia en cada punto e interpola una malla virtual de la superficie; durante la impresión la boquilla la sigue punto por punto. Cubre el caso de una cama **ligeramente combada**: no una deformación grande ni una chapa doblada.',
      cita: {
        texto:
          'if the bed is slightly warped, the sensor will still precisely follow the surface according to its measured mesh',
        fuente: 'help.prusa3d.com',
      },
    },
    {
      id: 'adhesion-irregular',
      titulo: 'La malla densa es para adhesión irregular, y sólo eso',
      cuando: { donde: ['inconsistente', 'punto'] },
      puntos: [
        'La densidad por defecto es de 3×3, y Prusa propone subirla a 7×7 **si sigues con adhesión irregular en la primera capa**.',
        'No es un recurso para cuando la base no pega en absoluto ni para una esquina levantada: es para una adhesión que va y viene por zonas.',
      ],
      indicador: 'calibracion',
      cuerpo:
        'La densidad por defecto es de 3×3, y Prusa propone subirla a 7×7 **si sigues con adhesión irregular en la primera capa**. No es un recurso para cuando la base no pega en absoluto ni para una esquina levantada: es para una adhesión que va y viene por zonas.',
      cifra: { valor: '7×7', nota: 'sólo para adhesión irregular, no para no-pega' },
      cita: {
        texto:
          'if you still experience uneven first layer adhesion, you can increase the density in Settings - Mesh bed leveling - Mesh to 7x7 (49 points)',
        fuente: 'help.prusa3d.com',
      },
    },
    {
      id: 'cama-inexacta',
      titulo: 'Una nivelación anterior puede quedar inexacta',
      cuando: { donde: 'inconsistente' },
      puntos: [
        'Bambu lo describe como caso raro: la nivelación de calibraciones anteriores puede quedar inexacta y provocar adhesión inconsistente.',
        'Es una causa poco frecuente, y la palabra **rara** viene con el dato: no se puede convertir en regla general sin saltársela.',
      ],
      indicador: 'calibracion',
      cuerpo:
        'Bambu lo describe como caso raro: la nivelación de calibraciones anteriores puede quedar inexacta y provocar adhesión inconsistente. Es una causa poco frecuente, y la palabra **rara** viene con el dato: no se puede convertir en regla general sin saltársela.',
      cita: {
        texto:
          'In some rare cases, the bed leveling from previous calibrations might be inaccurate leading to inconsistent adhesion to the plate.',
        fuente: 'wiki.bambulab.com',
      },
    },
    {
      id: 'cambio-chapa',
      titulo: 'Cambiar de chapa es el caso crucial',
      puntos: [
        'Bambu dice que es crucial realizar la nivelación de cama, sobre todo al cambiar o sustituir la chapa.',
        'Para asegurar un nivelado correcto para la nueva tarea.',
        'La frecuencia y el evento son cosas distintas: aquí es el cambio de hardware el que obliga.',
      ],
      indicador: 'calibracion',
      cuerpo:
        'Bambu dice que es crucial realizar la nivelación de cama, sobre todo al cambiar o sustituir la chapa, para asegurar un nivelado correcto para la nueva tarea. La frecuencia y el evento son cosas distintas: aquí es el cambio de hardware el que obliga.',
      enlaza: { guia: 'temperatura-cama', etiqueta: 'Ver limpieza y chapa' },
      cita: {
        texto: 'It is crucial to perform heat bed leveling, particularly when changing or replacing the build plate',
        fuente: 'wiki.bambulab.com',
      },
    },
    {
      id: 'mantener-activo',
      titulo: 'Deja la nivelación activa antes de cada impresión',
      puntos: [
        'Bambu recomienda encarecidamente mantener la opción de calibración de nivelación de cama activada al iniciar una impresión.',
        'Para las mayores posibilidades de éxito.',
        'Es una recomendación de ajuste, no un diagnóstico.',
      ],
      indicador: 'calibracion',
      cuerpo:
        'Bambu recomienda encarecidamente mantener la opción de calibración de nivelación de cama activada al iniciar una impresión, para las mayores posibilidades de éxito. Es una recomendación de ajuste, no un diagnóstico.',
      cita: {
        texto: 'We also strongly recommend to keep the Bed Leveling Calibration option turned on when starting a print',
        fuente: 'wiki.bambulab.com',
      },
    },
    {
      id: 'no-z-offset',
      titulo: 'La malla no corrige un Z-offset demasiado alto',
      cuando: { offset: 'alto' },
      puntos: [
        'La malla mide la forma de la cama; si la boquilla queda alta en **toda** la pieza, el problema es el offset, no la forma de la chapa.',
        'Bambu lo sitúa entre las causas de primera capa que no pega por Z-offset demasiado alto.',
      ],
      indicador: 'calibracion',
      cuerpo:
        'La malla mide la forma de la cama; si la boquilla queda alta en **toda** la pieza, el problema es el offset, no la forma de la chapa. Bambu lo sitúa entre las causas de primera capa que no pega por Z-offset demasiado alto.',
      enlaza: { guia: 'adhesion-primera-capa', etiqueta: 'Ver calibración de primera capa' },
      cita: {
        texto: 'Z-offset too high, the nozzle is too far from the bed, during the first layer.',
        fuente: 'wiki.bambulab.com',
      },
    },
    {
      id: 'no-suciedad',
      titulo: 'La malla no corrige suciedad o grasa',
      puntos: [
        'Nivelar va **después** de limpiar: la punta limpia es condición previa.',
        'Bambu recomienda lavar las chapas con agua caliente y detergente para quitar restos y contaminantes.',
        'Y hacer la calibración después de asegurar que la punta está limpia.',
      ],
      indicador: 'calibracion',
      cuerpo:
        'Nivelar va **después** de limpiar: la punta limpia es condición previa. Bambu recomienda lavar las chapas con agua caliente y detergente para quitar restos y contaminantes, y hacer la calibración después de asegurar que la punta está limpia.',
      cita: {
        texto:
          'performing a bed leveling calibration from the calibration menu after ensuring the nozzle tip is clean and free of any debris',
        fuente: 'wiki.bambulab.com',
      },
    },
    {
      id: 'no-probe',
      titulo: 'La malla no compensa un probe que no es repetible',
      cuando: { probe: 'no' },
      puntos: [
        'Klipper dice expresamente que si no se pueden obtener resultados repetibles, **no se use el probe para nivelar la cama**.',
        'La malla depende de que la sonda mida bien: sin repetibilidad, cualquier malla se construye sobre números malos.',
      ],
      indicador: 'calibracion',
      cuerpo:
        'Klipper dice expresamente que si no se pueden obtener resultados repetibles, **no se use el probe para nivelar la cama**. La malla depende de que la sonda mida bien: sin repetibilidad, cualquier malla se construye sobre números malos.',
      enlaza: { guia: 'adhesion-primera-capa', etiqueta: 'Ver calibración de primera capa' },
      cita: {
        texto: 'If repeatable results can not be obtained then don\'t use the probe for bed leveling.',
        fuente: 'klipper3d.org',
      },
    },
    {
      id: 'no-chapa-mal',
      titulo: 'No corrige una chapa mal seleccionada en el slicer',
      puntos: [
        'Bambu avisa: problemas de adhesión pueden deberse a seleccionar mal el tipo de chapa en Bambu Studio.',
        'Porque **el mismo material se imprime a distintas temperaturas de cama según la chapa** y la resultante es demasiado baja.',
        'Ninguna malla arregla un perfil con la temperatura mal puesta.',
      ],
      indicador: 'calibracion',
      cuerpo:
        'Bambu avisa: problemas de adhesión pueden deberse a seleccionar mal el tipo de chapa en Bambu Studio, porque **el mismo material se imprime a distintas temperaturas de cama según la chapa** y la resultante es demasiado baja. Ninguna malla arregla un perfil con la temperatura mal puesta.',
      enlaza: { guia: 'temperatura-cama', etiqueta: 'Ver temperaturas de cama' },
      cita: {
        texto:
          'The same material is usually printed at different heatbed temperatures depending on the build plate.',
        fuente: 'wiki.bambulab.com',
      },
    },
    {
      id: 'pinda-malla',
      titulo: 'PINDA y SuperPINDA: rejilla 3×3 por defecto, hasta 7×7',
      cuando: { sensor: 'pinda' },
      puntos: [
        'En el bloque PINDA la malla se extiende por toda la superficie de la chapa y construye una malla virtual.',
        'La rejilla por defecto es 3×3 y se puede subir hasta 7×7; también existen opciones de Z-probe (1, 3 o 5) y compensación de imanes.',
      ],
      indicador: 'calibracion',
      cuerpo:
        'En el bloque PINDA la malla se extiende por toda la superficie de la chapa y construye una malla virtual. La rejilla por defecto es 3×3 y se puede subir hasta 7×7; también existen opciones de Z-probe (1, 3 o 5) y compensación de imanes.',
      cifra: { valor: '3×3 a 7×7', nota: 'sólo bloques con sensor PINDA/SuperPINDA' },
      cita: {
        texto: 'The default grid density is 3x3 (9 points).',
        fuente: 'help.prusa3d.com',
      },
    },
    {
      id: 'mini-malla',
      titulo: 'MINI y MINI+: malla 4×4',
      cuando: { sensor: 'mini' },
      puntos: [
        'El MINI usa sensor M.I.N.D.A. o SuperPINDA y su malla es de 4×4.',
        'Es el único tamaño de rejilla que la fuente da para esta familia; no se generaliza a otras máquinas ni se corrobora con otros fabricantes.',
      ],
      indicador: 'maquina',
      cuerpo:
        'El MINI usa sensor M.I.N.D.A. o SuperPINDA y su malla es de 4×4. Es el único tamaño de rejilla que la fuente da para esta familia; no se generaliza a otras máquinas ni se corrobora con otros fabricantes.',
      cifra: { valor: '4×4', nota: 'sólo MINI/MINI+, una sola fuente' },
    },
    {
      id: 'loadcell-malla',
      titulo: 'LoadCell: los puntos se miden dentro del área de la impresión',
      cuando: { sensor: 'loadcell' },
      puntos: [
        'En el bloque LoadCell (MK4, MK3.9, XL) la boquilla comprueba la distancia a la chapa en varios puntos **dentro del área de la impresión.',
        'Elegida**, creando un mapa de alturas.',
        'La fuente no da tamaño de rejilla ni opciones de menú, así que el 3×3/7×7 no se traslada tal cual a estas máquinas.',
      ],
      indicador: 'maquina',
      cuerpo:
        'En el bloque LoadCell (MK4, MK3.9, XL) la boquilla comprueba la distancia a la chapa en varios puntos **dentro del área de la impresión elegida**, creando un mapa de alturas. La fuente no da tamaño de rejilla ni opciones de menú, así que el 3×3/7×7 no se traslada tal cual a estas máquinas.',
      cita: {
        texto:
          'Before a print, the nozzle will check the distance to the print sheet in several places to create a virtual height map of the surface. The points are measured within the area of the chosen print.',
        fuente: 'help.prusa3d.com',
      },
    },
    {
      id: 'interrupcion-residuo',
      titulo: 'Residuo o tocar la cama interrumpe la malla',
      cuando: { sensor: 'pinda' },
      puntos: [
        'Con el bloque PINDA, StallGuard del eje Z está activo durante la malla: si la boquilla golpea la cama antes de que el sensor dispare.',
        'El proceso se interrumpe y pide revisar la boquilla.',
        'El mismo aviso salta si hay residuo en la boquilla empujando la cama al sondear, o si se toca y presiona la cama mientras sonda.',
        'El mensaje **no distingue entre las dos causas**.',
      ],
      indicador: 'cama',
      cuerpo:
        'Con el bloque PINDA, StallGuard del eje Z está activo durante la malla: si la boquilla golpea la cama antes de que el sensor dispare, el proceso se interrumpe y pide revisar la boquilla. El mismo aviso salta si hay residuo en la boquilla empujando la cama al sondear, o si se toca y presiona la cama mientras sonda. El mensaje **no distingue entre las dos causas**.',
      cita: {
        texto: 'Enforcing the Z-calibration',
        fuente: 'help.prusa3d.com',
      },
    },
    {
      id: 'imanes',
      titulo: 'Compensación de imanes en malla 7×7',
      cuando: { sensor: 'pinda' },
      puntos: [
        'En malla 7×7, tres de los 49 puntos quedan tan cerca de los imanes que la lectura puede desviarse hasta 80 µm.',
        'La compensación los ignora y los calcula desde los vecinos, y Prusa recomienda dejarla activada.',
        'Sondas por punto: 3 o 5 mediciones, promediadas.',
      ],
      indicador: 'calibracion',
      cuerpo:
        'En malla 7×7, tres de los 49 puntos quedan tan cerca de los imanes que la lectura puede desviarse hasta 80 µm. La compensación los ignora y los calcula desde los vecinos, y Prusa recomienda dejarla activada. Sondas por punto: 3 o 5 mediciones, promediadas.',
      cifra: { valor: '80 µm', nota: '3 de los 49 puntos, sólo PINDA en 7×7' },
    },
    {
      id: 'umbral-probe',
      titulo: 'Umbral de repetibilidad del probe (Klipper)',
      cuando: { sensor: 'klipper' },
      puntos: [
        'PROBE_ACCURACY ejecuta diez sondeos. Lo normal es una diferencia de un paso Z o hasta 5 µm.',
        'Si el **range** es mayor de 25 µm (0,025 mm).',
        'El probe no tiene suficiente precisión para nivelar la cama típico y conviene ajustar velocidad o altura, o pasar a sondas manuales.',
        'Con resultados mayoritariamente repetibles pero algún outlier, usar varias muestras por punto.',
      ],
      indicador: 'calibracion',
      cuerpo:
        'PROBE_ACCURACY ejecuta diez sondeos. Lo normal es una diferencia de un paso Z o hasta 5 µm. Si el **range** es mayor de 25 µm (0,025 mm), el probe no tiene suficiente precisión para nivelar la cama típico y conviene ajustar velocidad o altura, o pasar a sondas manuales. Con resultados mayoritariamente repetibles pero algún outlier, usar varias muestras por punto.',
      cifra: { valor: '25 µm', nota: 'sólo documentado en Klipper, sin corroborar' },
    },
    {
      id: 'sesgo-termico',
      titulo: 'Sesgo térmico: nivelar siempre a la misma temperatura',
      cuando: { sensor: 'klipper' },
      puntos: [
        'Muchos sensores disparan a una altura distinta según su temperatura.',
        'Klipper recomienda usar las herramientas de nivelación siempre a la misma condición.',
        'Fría o caliente, esperando varios minutos tras alcanzarla.',
        'Se comprueba con PROBE_ACCURACY antes y después de calentar, sin re-homing.',
        'Es por el sensor, no por la cama.',
      ],
      indicador: 'calibracion',
      cuerpo:
        'Muchos sensores disparan a una altura distinta según su temperatura. Klipper recomienda usar las herramientas de nivelación siempre a la misma condición, fría o caliente, esperando varios minutos tras alcanzarla. Se comprueba con PROBE_ACCURACY antes y después de calentar, sin re-homing. Es por el sensor, no por la cama.',
      cita: {
        texto: 'run the bed leveling tools at a consistent temperature',
        fuente: 'klipper3d.org',
      },
    },
    {
      id: 'invalidacion',
      titulo: 'Invalidación en cascada del probe y la malla',
      cuando: { sensor: 'klipper' },
      puntos: [
        'Cambiar el sistema de movimiento, la posición del hotend o la ubicación del probe invalida PROBE_CALIBRATE.',
        'Cambiar la inclinación de la cama también.',
        'Al invalidar el probe, **la malla de cama anterior queda invalidada** y hay que repetir BED_MESH_CALIBRATE.',
      ],
      indicador: 'calibracion',
      cuerpo:
        'Cambiar el sistema de movimiento, la posición del hotend o la ubicación del probe invalida PROBE_CALIBRATE. Cambiar la inclinación de la cama también. Al invalidar el probe, **la malla de cama anterior queda invalidada** y hay que repetir BED_MESH_CALIBRATE.',
    },
    {
      id: 'textured-004',
      titulo: 'Textured PEI: la máquina baja la boquilla 0,04 mm',
      cuando: { chapa: 'textured' },
      puntos: [
        'La Textured PEI tiene superficie granular.',
        'Así que la impresora **baja la boquilla 0,04 mm** tras el nivelado de cama para asegurar la adhesión.',
        'Si laminaste para otra chapa e imprimes en Textured, ese descenso no se aplica y la boquilla queda demasiado alta.',
        'La máquina **no puede detectar qué chapa está instalada**.',
        'Es geometría, no temperatura.',
      ],
      indicador: 'calibracion',
      cuerpo:
        'La Textured PEI tiene superficie granular, así que la impresora **baja la boquilla 0,04 mm** tras el nivelado de cama para asegurar la adhesión. Si laminaste para otra chapa e imprimes en Textured, ese descenso no se aplica y la boquilla queda demasiado alta. La máquina **no puede detectar qué chapa está instalada**. Es geometría, no temperatura.',
      cifra: { valor: '0,04 mm', nota: 'sólo Textured PEI y su superficie granular' },
      cita: {
        texto: 'the printer lowers the nozzle by 0.04 mm after heatbed leveling to ensure first-layer adhesion',
        fuente: 'wiki.bambulab.com',
      },
    },
    {
      id: 'live-z',
      titulo: 'El número del LCD no es un objetivo',
      cuando: { calibrada: 'no' },
      puntos: [
        'Prusa da un rango de −0,400 a −1,500 para el Live Z adjust, y en la misma página dice que el valor **es único para cada máquina**.',
        'Que **no significa nada sin una referencia visual** y que cambia algo con el uso.',
        'Es un valor de pantalla, no milímetros: se ajusta mirando, no por un número fijo.',
        'No se compara con el 0,04 mm de Bambu.',
      ],
      indicador: 'maquina',
      cuerpo:
        'Prusa da un rango de −0,400 a −1,500 para el Live Z adjust, y en la misma página dice que el valor **es único para cada máquina**, que **no significa nada sin una referencia visual** y que cambia algo con el uso. Es un valor de pantalla, no milímetros: se ajusta mirando, no por un número fijo. No se compara con el 0,04 mm de Bambu.',
      cifra: { valor: '−0,4 a −1,5', nota: 'valor de LCD, único por máquina, no un objetivo' },
      cita: {
        texto: 'unique to each machine and means nothing without a visual reference',
        fuente: 'help.prusa3d.com',
      },
    },
    {
      id: 'cambio-chapa-readjust',
      titulo: 'Al cambiar de chapa hay que readaptar el offset',
      puntos: [
        'Las chapas tienen grosor distinto, y las máquinas con sensor PINDA guardan hasta **ocho** perfiles de chapa, cada uno con su offset.',
        'La máquina **no detecta qué chapa está montada** y **no avisa de cambiar de perfil**.',
        'Si no se cambia, se imprime con el offset de la anterior.',
      ],
      indicador: 'calibracion',
      cuerpo:
        'Las chapas tienen grosor distinto, y las máquinas con sensor PINDA guardan hasta **ocho** perfiles de chapa, cada uno con su offset. La máquina **no detecta qué chapa está montada** y **no avisa de cambiar de perfil**: si no se cambia, se imprime con el offset de la anterior.',
      enlaza: { guia: 'placas', etiqueta: 'Ver la guía de chapas' },
      cita: {
        texto: 'The live Z value needs to be readjusted if you switch sheet type',
        fuente: 'help.prusa3d.com',
      },
    },
    {
      id: 'curling',
      titulo: 'Chapa texturizada y el patrón de prueba',
      cuando: { chapa: 'textured' },
      puntos: [
        'Para la chapa texturizada hay que acercar algo la boquilla y buscar el mismo resultado que con la lisa.',
        'Si queda muy bajo, **el filamento puede empezar a curvarse hacia arriba por los bordes**.',
        'Como si no se pegara, en el **cuadrado final del patrón de prueba**, no en la pieza impresa.',
      ],
      indicador: 'cama',
      cuerpo:
        'Para la chapa texturizada hay que acercar algo la boquilla y buscar el mismo resultado que con la lisa. Si queda muy bajo, **el filamento puede empezar a curvarse hacia arriba por los bordes**, como si no se pegara, en el **cuadrado final del patrón de prueba**, no en la pieza impresa.',
      cita: {
        texto: 'the filament can start curling up around the edges like it is not adhering',
        fuente: 'help.prusa3d.com',
      },
    },
    {
      id: 'recalibrar',
      titulo: 'Cuándo repetir la calibración del Z-offset',
      cuando: { calibrada: 'no' },
      puntos: [
        'Prusa repite la calibración ante cambios importantes de montaje: cambiar la boquilla, cambiar extrusor, cambios en un eje.',
        'O mover la impresora.',
        'Las impresoras de fábrica ya vienen afinadas y la calibración se necesita sobre todo si montaste el kit en casa o cambiaste la boquilla.',
        'Bambu propone recalcular el Auto Bed Leveling tras arreglar los tornillos del hotend.',
      ],
      indicador: 'calibracion',
      cuerpo:
        'Prusa repite la calibración ante cambios importantes de montaje: cambiar la boquilla, cambiar extrusor, cambios en un eje, o mover la impresora. Las impresoras de fábrica ya vienen afinadas y la calibración se necesita sobre todo si montaste el kit en casa o cambiaste la boquilla. Bambu propone recalcular el Auto Bed Leveling tras arreglar los tornillos del hotend.',
    },
    {
      id: 'curl-prohibido',
      titulo: 'Prohibido calibrar midiendo con calibre',
      puntos: [
        'Prusa dice expresamente que **medir la capa impresa con calibre no es un método recomendado** para calibrar la primera capa.',
        'El ajuste se hace mirando el patrón, no por un valor fijo.',
      ],
      indicador: 'calibracion',
      cuerpo:
        'Prusa dice expresamente que **medir la capa impresa con calibre no es un método recomendado** para calibrar la primera capa. El ajuste se hace mirando el patrón, no por un valor fijo.',
      cita: {
        texto: 'measuring the printed layer with calipers is not a recommended method to calibrate the first layer',
        fuente: 'help.prusa3d.com',
      },
    },
    {
      id: 'frecuencia',
      titulo: 'Rare vs crucial: no es lo mismo y no se promedian',
      puntos: [
        'Las tres fuentes dicen cosas distintas y las tres pueden ser ciertas según el caso.',
        'Bambu habla de **frecuencia en uso estable** (caso raro.',
        'Adhesión inconsistente), el mismo Bambu habla de **cambio de chapa** (crucial al cambiar la chapa).',
        'Y Prusa de **síntoma visual concreto** (adhesión irregular pide malla más densa).',
        'El redactor conserva las tres palabras tal como las escribe la fuente: rare, crucial, uneven.',
      ],
      indicador: 'calibracion',
      cuerpo:
        'Las tres fuentes dicen cosas distintas y las tres pueden ser ciertas según el caso: Bambu habla de **frecuencia en uso estable** (caso raro, adhesión inconsistente), el mismo Bambu habla de **cambio de chapa** (crucial al cambiar la chapa), y Prusa de **síntoma visual concreto** (adhesión irregular pide malla más densa). El redactor conserva las tres palabras tal como las escribe la fuente: rare, crucial, uneven.',
    },
    {
      id: 'chapa-temperatura',
      titulo: 'El tipo de chapa determina la temperatura de cama',
      puntos: [
        'Bambu avisa de que el mismo material se imprime a **distintas temperaturas de cama** según la chapa.',
        'Y seleccionar mal el tipo de chapa puede dar adhesión insuficiente porque la temperatura resultante es demasiado baja.',
        'Ninguna de estas fuentes da cifras de temperatura para nivelar; sólo la dependencia del tipo de chapa.',
      ],
      indicador: 'calibracion',
      cuerpo:
        'Bambu avisa de que el mismo material se imprime a **distintas temperaturas de cama** según la chapa, y seleccionar mal el tipo de chapa puede dar adhesión insuficiente porque la temperatura resultante es demasiado baja. Ninguna de estas fuentes da cifras de temperatura para nivelar; sólo la dependencia del tipo de chapa.',
      enlaza: { guia: 'temperatura-cama', etiqueta: 'Ver temperaturas de cama' },
      cita: {
        texto:
          'The same material is usually printed at different heatbed temperatures depending on the build plate. Selecting the wrong build plate type may result in insufficient adhesion, because the heatbed temperature used for printing is too low.',
        fuente: 'wiki.bambulab.com',
      },
    },
    {
      id: 'g29-1',
      titulo: 'Ajuste temporal G29.1 en el Start G-code (A1)',
      puntos: [
        'Bambu A1 propone ajustar `G29.1 Z{xxx}` en el Start G-code como **fix temporal**.',
        'Con rangos Texture board -0,02 ~ 0 mm y Non-texture board -0,01 ~ 0,01 mm.',
        'Con la advertencia de que puede introducir nuevos defectos locales en otros sitios.',
        'Y de que al resolver la causa hay que restaurar los ajustes por defecto.',
        'Es un parche, no sustituye al bed leveling.',
      ],
      indicador: 'general',
      cuerpo:
        'Bambu A1 propone ajustar `G29.1 Z{xxx}` en el Start G-code como **fix temporal**, con rangos Texture board -0,02 ~ 0 mm y Non-texture board -0,01 ~ 0,01 mm, con la advertencia de que puede introducir nuevos defectos locales en otros sitios y de que al resolver la causa hay que restaurar los ajustes por defecto. Es un parche, no sustituye al bed leveling.',
      cifra: { valor: '-0,02 a 0 mm / -0,01 a 0,01 mm', nota: 'fix temporal, sólo A1, restaurar después' },
      cita: {
        texto: 'only for a quick temporary fix ... may introduce new local defects elsewhere',
        fuente: 'wiki.bambulab.com',
      },
    },
  ],

  reglas: [
    {
      id: 'limpiar-chapa',
      accion: 'Limpia la chapa',
      valor: 'Agua templada y jabón; no toques la superficie después',
      cuando: { sintoma: ['irregular', 'nopega'] },
      porque:
        'Bambu recomienda lavar con agua caliente y detergente: quita restos y contaminantes. Resuelve la mayoría de los casos de adhesión **siempre que los ajustes y la chapa del slicer sean los correctos**.',
      fuente: 'Bambu Lab',
      alcance:
        'Prusa dice lo contrario en el mismo registro: si no tocas la superficie, no hace falta limpiarla antes de cada impresión. Las dos están escritas y no se promedian.',
    },
    {
      id: 'limpiar-boquilla',
      accion: 'Limpia la punta de la boquilla antes de nivelar',
      porque:
        'La punta limpia es condición previa a la nivelación, no un paso aparte. Si la boquilla golpea la cama antes de que el sensor dispare, la calibración se interrumpe y pide revisar la punta.',
      fuente: 'Bambu Lab, Prusa Research',
      alcance:
        'Es una condición previa que se cumple siempre, y por eso la acción no se filtra por ninguna variable. El aviso de Prusa salta también si tocas la cama mientras está sondeando, sin distinguir las dos causas.',
    },
    {
      id: 'nivela-cama',
      accion: 'Nivela la cama',
      cuando: { donde: ['toda', 'inconsistente'] },
      porque:
        'La nivelación es una de las salidas cuando la calibración se ve bien y el problema persiste. Una malla mal hecha deja zonas de la base más lejos de la boquilla de lo que deberían.',
      fuente: 'Prusa Research, Bambu Lab',
      alcance:
        '**Bambu la sitúa como causa rara y lo dice con su propio adjetivo**: *«in some rare cases»*, y describe una adhesión **inconsistente**, no una esquina levantada. Es la única de las fuentes que menciona la nivelación como causa, y por eso el «raro» viene con la acción.',
    },
    {
      id: 'malla-7x7',
      accion: 'Sube la densidad de la malla a 7×7',
      valor: '49 puntos en vez de 9',
      cuando: { donde: 'inconsistente', sensor: 'pinda' },
      porque:
        'Prusa propone subir la densidad si la adhesión sigue irregular en la primera capa. De los 49, tres están tan cerca de los imanes que la lectura puede desviarse hasta 80 µm; la compensación los quita.',
      fuente: 'Prusa Research',
      alcance:
        'La condición es «adhesión irregular». **No** es un recurso para cuando la base no pega en absoluto ni para una esquina levantada. Y sólo está en el bloque de máquinas con sensor PINDA y SuperPINDA.',
    },
    {
      id: 'comprobar-chapa-slicer',
      accion: 'Comprueba en el slicer el tipo de chapa seleccionado',
      porque:
        'Seleccionar mal la chapa puede dar adhesión insuficiente: la temperatura de cama resultante es demasiado baja. El mismo material va a distintas temperaturas según la chapa, y ninguna malla lo arregla.',
      fuente: 'Bambu Lab',
      alcance:
        'Es un diagnóstico de configuración, no de geometría: si la chapa seleccionada no es la montada, el remedio es cambiar el perfil, no nivelear.',
    },
    {
      id: 'temperatura-consistente',
      accion: 'Nivela siempre a la misma temperatura y espera minutos',
      cuando: { sensor: 'klipper' },
      porque:
        'El sesgo térmico hace que muchos sensores disparen a otra altura según su temperatura. Klipper recomienda nivelar siempre en la misma condición, fría o caliente, esperando minutos tras alcanzarla.',
      fuente: 'Klipper',
      alcance:
        'Es por el sensor, no por la cama. Consistencia de la sonda, no temperatura objetivo de nivelado: ninguna fuente da una cifra de cama para nivelar.',
    },
    {
      id: 'no-apretar',
      accion: 'No aprietes la boquilla para forzar la adhesión',
      cuando: { offset: 'bajo' },
      porque:
        'Con la boquilla demasiado cerca, Prusa advierte de «extrusion problems and clogging… or even damage to the hardware, like the Flexible steel sheet». Apretar cambia el fallo, no lo arregla.',
      fuente: 'Prusa Research',
      alcance:        'Es un cambio de fallo, no una solución. La calibración correcta hace que el plástico se pegue y se vea ligeramente comprimido, no apretado del todo.',
    },
    {
      id: 'probe-manual',
      accion: 'Pasa a nivelación manual si el probe no es repetible',
      cuando: { probe: 'no' },
      porque:
        'Si el probe no es repetible o tiene sesgo por ubicación por encima de 25 µm, Klipper recomienda las herramientas manuales: la malla construida sobre esos números no vale.',
      fuente: 'Klipper',
      alcance:
        'El umbral de 25 µm (y los 5 µm normales) sólo está documentado en Klipper; ningún otro crudo del lote da cifra comparable.',
    },
    {
      id: 'textured-auto',
      accion: 'Deja que la máquina aplique la compensación de 0,04 mm de la Textured PEI',
      cuando: { chapa: 'textured' },
      valor: '0,04 mm',
      porque:
        'La Textured PEI tiene superficie granular y la impresora baja la boquilla 0,04 mm tras el nivelado. Si el perfil dice otra chapa, el descenso no se aplica y la boquilla queda demasiado alta.',
      fuente: 'Bambu Lab',
      alcance:
        'El 0,04 mm es de la Textured PEI y de su superficie granular. La fuente no dice que haya un descenso equivalente para las otras chapas.',
    },
    {
      id: 'al-cambiar-chapa',
      accion: 'Recalibra el offset al cambiar de chapa',
      porque:
        'Cada chapa tiene grosor distinto y necesita su calibración propia. Donde se permiten, se guardan hasta ocho perfiles con su offset, y la máquina no detecta la chapa ni avisa de cambiar de perfil.',
      fuente: 'Prusa Research',
      alcance:
        'Es una prohibición, no una recomendación: no se puede usar la misma calibración de primera capa si se cambia entre la lisa y la texturizada. El motivo, el grosor, está escrito en palabras y en ningún número: ninguna de las fuentes da el milímetro.',
    },
    {
      id: 'recalibrar-tras-cambios',
      accion: 'Repite la calibración si has movido la impresora o has cambiado la boquilla',
      cuando: { calibrada: 'no' },
      porque:
        'Prusa repite la calibración tras cambios de montaje: boquilla, extrusor, un eje o mover la impresora. Las de fábrica vienen afinadas; hace falta más si montaste el kit en casa o cambiaste la boquilla.',
      fuente: 'Prusa Research',
      alcance:
        'Dos desencadenantes concretos, no una obligación periódica: ninguna de las fuentes dice «cada impresión».',
    },
    {
      id: 'probe-invalidacion',
      accion: 'Repite BED_MESH_CALIBRATE tras cambiar algo del probe o de la cama',
      cuando: { sensor: 'klipper' },
      porque:
        'Cambiar el sistema de movimiento, el hotend o la ubicación del probe invalida la calibración; la inclinación de la cama también. Al invalidar el probe, la malla anterior queda invalidada: repetirla.',
      fuente: 'Klipper',
      alcance:
        'La invalidación es en cascada: el probe primero, y la malla después. Hacer una sin la otra deja una malla construida sobre números ya viejos.',
    },
  ],

  fueraDeAlcance: [
    {
      sintoma: 'La pieza sale con una esquina levantada',
      porQue:
        'Es warping: contracción térmica, no geometría de la cama. La primera capa puede estar perfecta y la esquina levantarse igual. Cambiar la malla no lo arregla.',
      guia: 'warping-pla',
    },
    {
      sintoma: 'La pieza no pega en absoluto o sale con capas rotas',
      porQue:
        'Es adhesión o extrusión, no cama. Aprietar la boquilla para forzarla cambia de fallo, no lo arregla.',
      guia: 'adhesion-primera-capa',
    },
    {
      sintoma: 'La base queda con forma de pie de elefante',
      porQue:
        'Es exceso de material en la primera capa por demasiada extrusión, no por la forma de la cama.',
      guia: 'elephant-foot',
    },
    {
      sintoma: 'La pieza se despega a mitad de la impresión',
      porQue:
        'Es un problema distinto de la adhesión inicial; tiene su propia guía.',
      guia: 'despegue-a-mitad',
    },
  ],

  fuentes: [
    {
      url: 'https://help.prusa3d.com/article/mesh-bed-leveling_112163',
      quien: 'Prusa Research',
      que: 'Malla 3×3 y 7×7, compensación de imanes y el aviso del StallGuard por residuo.',
    },
    {
      url: 'https://www.klipper3d.org/Probe_Calibrate.html',
      quien: 'Klipper',
      que: 'Umbral de repetibilidad, sesgo térmico y por ubicación, invalidación en cascada.',
    },
    {
      url: 'https://wiki.bambulab.com/en/a1-mini/troubleshooting/print-issues-troubleshooting',
      quien: 'Bambu Lab (A1)',
      que: 'G29.1 temporal, retensado de tornillos y Z-offset demasiado alto.',
    },
    {
      url: 'https://wiki.bambulab.com/en/knowledge-sharing/first-layer-not-sticking',
      quien: 'Bambu Lab',
      que: 'Primer capa que no se pega: chapa, limpieza, nivelación y el 0,04 mm de la Textured PEI.',
    },
    {
      url: 'https://help.prusa3d.com/article/smooth-steel-sheet_196550',
      quien: 'Prusa Research',
      que: 'Cambio de chapa: el grosor como motivo y la readaptación del Live Z.',
    },
    {
      url: 'https://help.prusa3d.com/article/first-layer-calibration-i3_112364',
      quien: 'Prusa Research (i3)',
      que: 'Los tres estados del patrón, la asimetría alto/bajo y la calibración por cambio de montaje.',
    },
    {
      url: 'https://wiki.bambulab.com/en/filament-acc/filament/print-quality/warping-falling-off-collapsing',
      quien: 'Bambu Lab',
      que: 'Z-offset demasiado alto como causa de no pegar en la primera capa.',
    },
  ],

  campos: [],
  leeDelAnalisis: [],
};
