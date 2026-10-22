---
titulo: "Ruta de calibración: qué orden sigue cada fabricante y cómo llama cada uno a la función"
tema: ruta-de-calibracion
fuentes:
  - wiki/raw/ruta-de-calibracion-control3d-7-tests-imprescindibles.md
  - wiki/raw/ruta-de-calibracion-orcaslicer-calibration-guide.md
  - wiki/raw/ruta-de-calibracion-prusa-kb-linear-advance.md
  - wiki/raw/ruta-de-calibracion-bambu-wiki-flow-dynamics-calibration.md
  - wiki/raw/ruta-de-calibracion-duet3d-pressure-advance.md
cocinado: 2026-10-21
---

# Ruta de calibración: qué orden sigue cada fabricante y cómo llama cada uno a la función

> Esta guía **no repite** los criterios de cada test: están cocinados en sus guías
> (`torre-temperatura`, `flow-rate`, `max-volumetric-speed`, `stringing`,
> `tolerancias-y-encaje`, `voladizos-y-soportes`). Aquí están **el orden**, **la
> nomenclatura de cada firmware** y **las contradicciones** que hay que declarar en
> vez de resolver.

## Afirmaciones

### Qué es una "ruta de calibración"

- Una ruta de calibración **se puede partir en dos grupos**: lo que se calibra **por
  filamento** (se repite con cada bobina nueva) y lo que se calibra **por
  impresora** (opcional, sólo hay que repetirlo tras un cambio de hardware).
  — [OrcaSlicer](https://github.com/OrcaSlicer/OrcaSlicer/wiki/calibration_guide),
  capturado 2026-10-21
- Los tests asumen que **el extrusor ya está calibrado en el firmware** (E-steps o
  *rotation distance*); la mayoría de impresoras modernas de fábrica ya lo están, y las
  diferencias pequeñas entre filamentos se corrigen después, en el paso de Flow Ratio.
  — [OrcaSlicer](https://github.com/OrcaSlicer/OrcaSlicer/wiki/calibration_guide),
  capturado 2026-10-21
- **Un perfil por combinación de impresora y filamento**, guardado con los valores
  obtenidos; y **una sola variable cada vez**, para que se sepa qué ajuste mejoró o
  empeoró el resultado. — [Control3D](https://control3d.net/como-calibrar-una-impresora-3d-los-7-tests-imprescindibles/),
  capturado 2026-10-21
- Al terminar el proceso de calibración hay que **crear un proyecto nuevo** para salir
  del modo calibración. — [OrcaSlicer](https://github.com/OrcaSlicer/OrcaSlicer/wiki/calibration_guide),
  capturado 2026-10-21
- Antes de tocar el PA hay que **determinar y probar los movimientos del extrusor a
  velocidad completa**, y comprobar que la aceleración está bien ajustada para el rango
  en el que se va a medir el PA. — [Duet3D](https://docs.duet3d.com/User_manual/Tuning/Pressure_advance),
  capturado 2026-10-21

### El orden: hay tres variantes, no uno

**OrcaSlicer (documentación oficial, y la única que razona cada paso):**

1. **Temperature** — «affects the viscosity of the filament, which in turn influences
   how well it flows through the nozzle and adheres to the print bed, so every
   following test depends on it»; sobre todo importante en materiales con un rango de
   temperatura estrecho.
2. **Max Volumetric Speed** — «sets a safe limit so the following tests don't
   under-extrude or clog the nozzle»; avisa de que «some manufacturers overstate this
   value, so don't rely on the one on the spool»; **usar un 10–20 % por debajo** del
   resultado.
3. **Pressure Advance** — «It is done before Flow Ratio because it is the value most
   often wrong (or never calibrated at all), while the flow ratio in most filament
   profiles is already close. A tuned pressure advance also gives cleaner line ends
   and corners, which makes the Flow Ratio test easier to read».
4. **Flow Ratio** — la prueba parte del flow ratio del perfil de filamento
   seleccionado, así que suele ser una corrección pequeña.
5. **Retraction** — «The default values usually work well, but if you calibrate them,
   do it after Pressure Advance and Flow Ratio, as both change the pressure in the
   nozzle. Retraction doesn't depend on the advanced tests below, so it is part of the
   filament calibration».
   — *Advertencia lateral de la misma fuente:* «Pressure advance and flow ratio affect
   each other slightly, so either can be calibrated first. If the flow ratio changed a
   lot in the Flow Ratio step, run a quick Pressure Advance test again».

   Luego, **Advanced Calibration** (opcional, ajusta la impresora, no el filamento):
   **Cornering** (jerk / *junction deviation*), **Input Shaping**, **VFA** y
   **Adaptive Pressure Advance**; «Do them after the filament calibration, as a badly
   tuned filament affects their results».
   - **Cornering**: sirve sobre todo para subir la velocidad de esquina; la mayoría de
     impresoras ya lo limitan en firmware —«above that limit (especially in Klipper) a
     higher value doesn't make real prints any faster»— y OrcaSlicer no tiene forma
     de comprobarlo.
   - **Input Shaping**: compensa vibraciones; las impresoras recientes traen su propia
     calibración automática, «usually more accurate than this manual test», así que
     conviene usarla cuando exista.
   - **VFA**: se hace **después** del Input Shaping, para encontrar los artefactos
     verticales finos que el input shaping no eliminó.
   - **Adaptive PA**: necesita un PA y un Flow Ratio ya calibrados, y sus pruebas no
     deben pasar del límite de aceleración encontrado con el Input Shaping.

   Y **Tolerance al final**: «Do it last, as the result depends on every calibration
   above».
   — [OrcaSlicer](https://github.com/OrcaSlicer/OrcaSlicer/wiki/calibration_guide),
   capturado 2026-10-21

**Control3D (blog de autor; el orden es un método, no una especificación):**
1. Temperatura · 2. Flujo · 3. Pressure Advance · 4. Velocidad volumétrica máxima ·
5. Retracciones · 6. Tolerancias · 7. Voladizos y puentes · 8. Pieza final de
comprobación.
La única justificación que da es que «algunos parámetros afectan directamente a los
siguientes» y que «no conviene realizar las pruebas de forma aleatoria».
— [Control3D](https://control3d.net/como-calibrar-una-impresora-3d-los-7-tests-imprescindibles/),
capturado 2026-10-21

**Duet3D (documentación oficial, pero sólo un sub-orden):** «It is recommend to first
tune Input Shaping, then Pressure Advance, then Retraction.»
— [Duet3D](https://docs.duet3d.com/User_manual/Tuning/Pressure_advance),
capturado 2026-10-21

**Prusa y Bambu no publican un orden.** La página de Prusa es una pieza suelta de la
categoría «Advanced calibration», sin secuencia; la wiki de Bambu lista sus pasos
(Temperature → Flow Rate → Pressure Advance → Retraction Test → Max Flowrate → VFA)
sin justificarlo.
— [Prusa Research](https://help.prusa3d.com/article/linear-advance_2252),
[Flow Dynamics Calibration — Bambu Lab](https://wiki.bambulab.com/en/software/bambu-studio/calibration_pa),
capturados 2026-10-21
**No se deduce un orden para Prusa ni para Bambu a partir del de los demás.**

### La nomenclatura: cada fabricante llama a la función de una manera, y el valor no se porta

| Fabricante / firmware | Cómo lo llama | Cómo se configura | Dónde está el valor |
|---|---|---|---|
| **Prusa** | *Linear Advance* (K-value) en MK2.5/MK2.5S/MK3/MK3S/MMU2S; *Pressure Advance* desde la familia MK4, XL y MINI/+ **con firmware 5.0.0** | `M900 Kxx` en el G-code de inicio (Simplify3D, Cura) | En PrusaSlicer, en el bloque de **G-code personalizado de la pestaña Filament Settings** —no en el G-code personalizado de la impresora— |
| **OrcaSlicer** | *Pressure Advance* (y *Adaptive Pressure Advance*) | `enable_pressure_advance` / `pressure_advance` por filamento | En el perfil de material |
| **Bambu** | *Flow Dynamics*, con el parámetro **Factor K**; internamente, el perfil de PA | Menú Calibration → Flow Dynamics | En la impresora (se guarda en ella) y en el perfil del filamento |
| **Duet3D / RepRapFirmware** | *Pressure advance* | `M572 D<drive> S<valor>` | En el G-code, por unidad de extrusor |
| **Marlin** | *Linear Advance* | `M900 Kxx` / `LIN_ADVANCE` | Ya cocinado en `flow-rate` |
| **Klipper** | `pressure_advance` | `SET_PRESSURE_ADVANCE` | Ya cocinado en `flow-rate` |

— [Prusa Research](https://help.prusa3d.com/article/linear-advance_2252),
[OrcaSlicer](https://github.com/OrcaSlicer/OrcaSlicer/wiki/calibration_guide),
[Bambu Lab](https://wiki.bambulab.com/en/software/bambu-studio/calibration_pa),
[Duet3D](https://docs.duet3d.com/User_manual/Tuning/Pressure_advance),
capturados 2026-10-21

- El artículo de Control3D lo llama **«Pressure Advance»** de forma genérica y llama
  **«calibración de dinámica de flujo»** a la función de Bambu Studio; no dice de qué
  firmware habla en ninguno de los dos casos.
  — [Control3D](https://control3d.net/como-calibrar-una-impresora-3d-los-7-tests-imprescindibles/),
  capturado 2026-10-21
- **Prusa:** la función es *firmware-específica* y no se porta entre firmwares — un
  K-value de una MK3 no es lo mismo que el PA de una MK4.
  — [Prusa Research](https://help.prusa3d.com/article/linear-advance_2252),
  capturado 2026-10-21
- Cada test tiene un ancestro distinto, y por eso cada empresa tiene un patrón
  distinto: el test de flujo y el de retracción de OrcaSlicer están inspirados en
  **SuperSlicer**; el método **PA Line**, en el *K-factor Calibration Pattern* de
  **Marlin**; el método **PA Tower**, en **Klipper**; la torre de temperatura es un
  remix de la *Smart compact temperature calibration tower*; el test de caudal máximo
  es de **CNC Kitchen** (Stefan), con su *Extrusion Test Structure* como modelo.
  — [OrcaSlicer](https://github.com/OrcaSlicer/OrcaSlicer/wiki/calibration_guide),
  capturado 2026-10-21

### Los pasos y su criterio, una vez cada uno

Cada criterio, con su detalle, ya está en su guía; aquí va el enlace, no la copia.

- **Temperatura** — imprimir la torre **empezando por la temperatura más alta y
  bajando**, para que los primeros niveles no fallen por falta de fusión y no
  arrastren el resto de la prueba. En cada tramo se busca: superficies uniformes,
  buena definición del detalle, sin acumulaciones, puentes razonablemente limpios y
  paredes consistentes. En materiales que no son mates, **un acabado excesivamente
  apagado puede indicar temperatura demasiado baja**. Si no hay un nivel perfecto, se
  elige el que tenga menos defectos y el comportamiento más estable.
  → Criterios de lectura: `torre-temperatura`.
  — [Control3D](https://control3d.net/como-calibrar-una-impresora-3d-los-7-tests-imprescindibles/),
  capturado 2026-10-21
- **Flujo** — el factor de caudal determina cuánto filamento sale por la boquilla.
  **Exceso**: las líneas se aplastan entre sí, aparecen acumulaciones, la boquilla
  puede llegar a rozar lo ya impreso y los soportes quedan demasiado unidos a la
  pieza. **Insuficiente**: huecos entre líneas, superficies abiertas, piezas débiles.
  El objetivo es que las líneas se unan sin dejar huecos y sin acumular material.
  → Criterios y métodos: `flow-rate`.
  — [Control3D](https://control3d.net/como-calibrar-una-impresora-3d-los-7-tests-imprescindibles/),
  capturado 2026-10-21
- **Pressure Advance** — el patrón de líneas combina un segmento corto a baja
  velocidad, una aceleración, un segmento largo a mayor velocidad, una frenada y otro
  segmento corto a baja velocidad. Se escoge la línea que mantenga **un grosor más
  homogéneo durante todo el recorrido, sin pegotes ni zonas excesivamente finas**.
  En los laminadores que permiten introducir el valor directamente, se guarda en el
  perfil del filamento; en Bambu Studio, mediante la calibración de dinámica de flujo,
  asignada después al material cargado, y **el perfil creado debe corresponder al
  mismo tipo de filamento usado en la calibración**.
  → Criterios y escalas: `flow-rate`.
  — [Control3D](https://control3d.net/como-calibrar-una-impresora-3d-los-7-tests-imprescindibles/),
  capturado 2026-10-21
- **Velocidad volumétrica máxima** — la velocidad real depende de la capacidad
  mecánica de la máquina, del tipo de boquilla, de la capacidad de fusión del sistema
  de extrusión y del comportamiento del filamento. La prueba imprime una espiral que
  acelera a medida que gana altura; **que la pieza se rompa no es un fallo del test**,
  el objetivo es localizar el límite. El valor se calcula con la **altura desde la
  base hasta el primer defecto × incremento + velocidad volumétrica inicial**, y se
  introduce en el perfil del filamento para que el laminador no supere la capacidad
  real de extrusión aunque la velocidad lineal sea mayor. La fórmula coincide con la
  de OrcaSlicer, ya cocinada en `max-volumetric-speed`.
  → Procedimiento y margen: `max-volumetric-speed`.
  — [Control3D](https://control3d.net/como-calibrar-una-impresora-3d-los-7-tests-imprescindibles/),
  capturado 2026-10-21
- **Retracciones** — el objetivo es **la distancia mínima de retracción que permita
  imprimir sin hilos**. Si la primera prueba sale limpia, se **reduce en intervalos de
  0,2 mm** hasta que aparezcan hilos (el último resultado limpio es el valor bueno); si
  aparecen hilos desde el principio, se **aumenta en intervalos de 0,2 mm**. En
  **extrusión directa, 2 mm ya sería un valor muy elevado**; en **Bowden, el límite
  puede situarse aproximadamente entre 6 y 7 mm**, según la longitud del tubo. Si los
  hilos siguen apareciendo al llegar a esos valores, hay que **revisar primero la
  temperatura, el flujo y el PA**, y puede ayudar aumentar la velocidad de
  desplazamiento o modificar la separación entre costuras.
  → Rangos ya cocinados: `stringing`.
  — [Control3D](https://control3d.net/como-calibrar-una-impresora-3d-los-7-tests-imprescindibles/),
  capturado 2026-10-21
- **Tolerancias** — se empieza con el **ajuste de tolerancias del laminador en cero** y
  se imprimen combinaciones de pilares, orificios o anillos con separaciones
  progresivas. El objetivo es **el ajuste más pequeño que permita mover o encajar las
  piezas sin fuerza excesiva**. Si un anillo no entra en su pilar, esa tolerancia es
  demasiado ajustada y la opción inmediatamente anterior es la referencia más segura.
  Las tolerancias varían con el material, la orientación de la pieza y la impresora, así
  que conviene hacer la prueba **antes** de fabricar modelos con encajes precisos.
  → Tipos de encaje y cifras: `tolerancias-y-encaje`.
  — [Control3D](https://control3d.net/como-calibrar-una-impresora-3d-los-7-tests-imprescindibles/),
  capturado 2026-10-21
- **Voladizos y puentes** — la prueba sirve para comprobar **hasta qué ángulo puede
  imprimir sin soportes** y **qué longitud de puente mantiene una calidad aceptable**.
  Se revisa en qué ángulo empiezan a deformarse las superficies, cuándo dejan de
  quedar unidas las líneas inferiores, a partir de qué longitud se descuelgan los
  puentes y si la refrigeración mantiene la calidad uniforme. **Es preferible analizar
  cada variable por separado** en vez de mezclar demasiadas pruebas en una pieza.
  → Umbrales y soportes: `voladizos-y-soportes`.
  — [Control3D](https://control3d.net/como-calibrar-una-impresora-3d-los-7-tests-imprescindibles/),
  capturado 2026-10-21
- **Pieza final de comprobación** — después de los siete tests, una pieza sencilla que
  combine situaciones reales: un **Benchy, un Cali Cat, un Cali Dragon** o cualquier
  modelo rápido con paredes, curvas, retracciones, puentes y voladizos. **No sustituye
  a los tests**: comprueba que los valores funcionan aplicados a la vez. Si aparecen
  defectos, hay que revisar los tests relacionados con esa zona antes de tocar
  parámetros al azar.
  — [Control3D](https://control3d.net/como-calibrar-una-impresora-3d-los-7-tests-imprescindibles/),
  capturado 2026-10-21

### Pressure Advance: los datos de cada firmware

- **Duet3D — de dónde viene el error.** Hay al menos **tres fuentes de elasticidad**:
  el filamento dentro del tubo Bowden se comporta como comprimible (su diámetro suele
  ser 0,25 mm menor que el del tubo; en tracción toma el camino más directo y en
  compresión serpentea de lado a lado, de modo que hay más longitud de filamento en el
  tubo), el propio filamento es algo comprimible, y el **motor paso a paso es
  «elástico»**: el ángulo del rotor tiene que retrasarse respecto al comandado por la
  corriente, y cuanto más se resiste el filamento mayor es el retraso.
  — [Duet3D](https://docs.duet3d.com/User_manual/Tuning/Pressure_advance),
  capturado 2026-10-21
- **Duet3D — qué hace el PA.** Compensa la elasticidad **dando más filamento cuando la
  velocidad de extrusión aumenta y menos cuando disminuye**; esto puede llegar a
  **retraer filamento de verdad** en la última parte de la fase de deceleración.
  Fórmula: `actual_extrusion_speed = requested_extrusion_speed + (K * current_extruder_acceleration)`.
  — [Duet3D](https://docs.duet3d.com/User_manual/Tuning/Pressure_advance),
  capturado 2026-10-21
- **Duet3D — el parámetro es por unidad de extrusor** y su unidad **son segundos**:
  `M572 D0 S0.1` (D = número de unidad de extrusor, S = cantidad de PA); para varios
  extrusores con el mismo valor, `M572 D0:1 S0.1`; con valores distintos, comandos
  separados.
  — [Duet3D](https://docs.duet3d.com/User_manual/Tuning/Pressure_advance),
  capturado 2026-10-21
- **Duet3D — valores de arranque para PLA** (la fuente dice explícitamente que son
  *sólo* puntos de partida): extrusión directa **S0.025 y en adelante**; Bowden corto
  (200 mm) **S0.1**; medio (400 mm) **S0.3**; largo (600 mm) **S0.5**; muy largo
  (800 mm+) **S0.7**. Un tubo de 1 m puede pedir valores que se acerquen a 1.0 o
  incluso 2.0; un direct drive tipo Titan Aero funciona bien con ~0.05. **El factor
  predominante es la longitud del tubo Bowden.**
  — [Duet3D](https://docs.duet3d.com/User_manual/Tuning/Pressure_advance),
  capturado 2026-10-21
- **Duet3D — restricciones de firmware con el PA activo.** RRF limita automáticamente la
  aceleración del extrusor (`M201 E`) al menor valor entre `M201 E` y el cambio
  instantáneo de velocidad permitido (`M566 E`, el jerk, en mm/s) **dividido por la
  constante de PA (`M572 S`, en segundos)**, para que el PA no provoque saltos de
  paso. En movimientos sólo de extrusor se aplica únicamente el límite de `M201`.
  Velocidad máxima del extrusor (`M203 E`): 30–60 mm/s (1800–3600 mm/min). Jerk del
  extrusor (`M566 E`): 2000–6000 mm/min en un NEMA17 direct drive, 200–500 mm/min en un
  NEMA14 pequeño y muy reducido (que suele usarse justamente en direct drive, donde el
  PA necesario es pequeño); el jerk alto es un problema en extrusores remotos con eje
  flexible. Aceleración (`M201 E`): 2000–4000 mm/s², más baja en extrusores pequeños y
  muy reducidos. Ejemplo numérico: jerk de 50 mm/s (3000 mm/min) con PA de 0.02 s →
  aceleración máxima del extrusor de 50 / 0.02 = **2500 mm/s²**.
  — [Duet3D](https://docs.duet3d.com/User_manual/Tuning/Pressure_advance),
  capturado 2026-10-21
- **Duet3D — el método más simple.** Cubo de 100 mm, 1 capa inferior, 1 o 2 perímetros,
  relleno mínimo o nulo, refrigeración adecuada, costura Z alineada a un punto único en
  el centro de una cara, velocidad cercana a la habitual y **E-steps ya calibrados**;
  con *wipe* y *coasting* desactivados. Se empieza con el PA **desactivado** y, tras
  unas capas, se envía el `M572` con el valor a probar desde la consola; se prueban
  valores por encima y por debajo y se vigila la costura Z. El valor elegido es aquel
  en el que **la costura queda más uniforme y las esquinas no abomban**.
  — [Duet3D](https://docs.duet3d.com/User_manual/Tuning/Pressure_advance),
  capturado 2026-10-21
- **Duet3D — efectos secundarios que hay que conocer antes de ordenar los pasos.** Con
  una cantidad grande de PA el extrusor puede retraer al final del movimiento, y si ese
  movimiento va seguido de un viaje con retracción, **la retracción total puede ser
  excesiva para el hotend**: conviene **reducir la retracción al activar el PA**. Si
  el jerk del extrusor (`M566 E`) es demasiado bajo, la aceleración del extrusor queda
  restringida y **la impresión se ralentiza**; puede aparecer además un hueco entre
  perímetros y relleno sólido, que se corrige con el solape de relleno del laminador.
  — [Duet3D](https://docs.duet3d.com/User_manual/Tuning/Pressure_advance),
  capturado 2026-10-21
- **Prusa — qué es el Linear Advance.** Predice la **acumulación de presión** en el
  extrusor al imprimir a alta velocidad; el firmware **disminuye el filamento que
  extruye justo antes de parar y desacelerar**, lo que evita blobs o artefactos en las
  esquinas vivas. Los «K-values» son los parámetros que determinan **cuánto afecta el
  Linear Advance a la impresión**.
  — [Prusa Research](https://help.prusa3d.com/article/linear-advance_2252),
  capturado 2026-10-21
- **Prusa — historia de firmware.** Con el firmware **3.9.0** se introdujo el
  **Linear Advance 1.5** para la MK3S, MK3, MK2.5S y MK2.5, mejorado en el **3.9.1**
  para artefactos de escenarios y geometrías concretos; es retrocompatible con la 1.0,
  y un G-code con LA 1.0 lo analiza y convierte automáticamente. En el MINI original
  nunca existió LA 1.0, así que no hace falta conversión.
  — [Prusa Research](https://help.prusa3d.com/article/linear-advance_2252),
  capturado 2026-10-21
- **Prusa — geometría del patrón.** Se imprime una serie de líneas con distintos
  K-values; **los primeros y los últimos 25 mm se imprimen despacio, y entre las
  marcas (cuadrados rojos) se imprimen 100 mm deprisa**. Hay que mirar la transición de
  lento a rápido y de rápido a lento: la línea **puede ser irregular o estar rota
  enteramente** cuando el valor no es óptimo, sobre todo en las líneas superiores
  (cuadrados rojos), y está presente en todas salvo en la del K óptimo. El artículo se
  refiere principalmente a **boquilla de latón de 0,4 mm**; otros diámetros o materiales
  pueden dar K-values distintos.
  — [Prusa Research](https://help.prusa3d.com/article/linear-advance_2252),
  capturado 2026-10-21
- **Prusa — K-values óptimos del fabricante (boquilla 0,4 mm):** PLA **0,05**; PETG
  **0,08**; CPE **0,07**; PC Blend **0,07**; ASA/ABS **0,04**; HIPS **0,04** (algunas
  marcas pueden necesitar más); Nylon Taulman **0,08**; Nylon FX256 **0,1**.
  **Boquilla 0,6 mm:** PLA **0,04**; PETG **0,04–0,05**; PC Blend **0,04**; ASA/ABS
  **0,02–0,03**; HIPS **0,03**. Marcas y colores distintos del mismo material pueden
  necesitar un K algo distinto a velocidades extremas.
  — [Prusa Research](https://help.prusa3d.com/article/linear-advance_2252),
  capturado 2026-10-21
- **Prusa — el cambio de valor se hace en el G-code, y hay que hacerlo por material.**
  En PrusaSlicer el K-value está en el bloque de G-code personalizado de la pestaña
  **Filament Settings** (no en el G-code personalizado de la impresora). En otros
  laminadores hay que editar el script de inicio a mano: en Simplify3D y Cura, añadir
  **`M900 Kxx`**, y cambiarlo al cambiar de material. Prusa advierte de que **cambiar
  los K-values se recomienda sólo a usuarios con experiencia** y de hacer copia de
  seguridad antes.
  — [Prusa Research](https://help.prusa3d.com/article/linear-advance_2252),
  capturado 2026-10-21
- **Bambu — qué es Flow Dynamics.** Es la función que compensa **el retardo de la
  presión de extrusión**: al acelerar aumenta ligeramente la tasa de extrusión para
  construir presión antes, y al desacelerar **reduce o invierte el flujo** (como una
  mini-retracción) para aliviar la presión acumulada. El **Factor K** mide **cuánta
  compensación se aplica**; es una **constante proporcional** y es **específico de la
  combinación impresora + filamento** (cada filamento comprese una cantidad distinta y
  cada impresora tiene una holgura distinta en su sistema de extrusión). Un K más alto
  significa más compensación, es decir, más «slop» o más retardo.
  — [Bambu Lab](https://wiki.bambulab.com/en/software/bambu-studio/calibration_pa),
  capturado 2026-10-21
- **Bambu — manual y automático usan sensores distintos.** En el modo **automático**, la
  serie **X1** imprime líneas de calibración en la cama y las **escanea con el lidar**;
  la **A1 y la H2D** llevan el cabezal al purgador, expulsan filamento y leen la
  **fuerza de extrusión con un sensor de corriente de Foucault (eddy current)**. En el
  modo **manual**, el usuario juzga a la vista la calidad de la línea o del patrón
  impreso. La calibración automática existe en **H2D, X1 y A1** (la A1, desde el
  firmware **01.04.00.00**); la **P1 sólo admite calibración manual**.
  — [Bambu Lab](https://wiki.bambulab.com/en/software/bambu-studio/calibration_pa),
  capturado 2026-10-21
- **Bambu — el método manual tiene sus propias reglas.** Se recomienda usar una chapa
  lisa (Smooth PEI; la texturizada también sirve), seleccionar diámetro de boquilla,
  tipo de chapa y filamento, y elegir el **método de patrón**; el **método de línea
  recta es menos preciso** porque no muestra los problemas de extrusión como sí lo
  hacen los patrones de esquina, y **puede dar un K más bajo y menos fiable**. El paso
  de intervalo recomendado es **0,002**, para tener un degradado más fino de líneas.
  El valor elegido es el que da **la esquina más limpia y más nítida, sin señales de
  subextrusión**.
  — [Bambu Lab](https://wiki.bambulab.com/en/software/bambu-studio/calibration_pa),
  capturado 2026-10-21
- **Bambu — el automático y el manual no dan el mismo número, y es normal.** El
  **H2D fija el Factor K más alto que el modo patrón manual**, para evitar el
  apilamiento de material en las esquinas; la calibración automática de la **X1 da un
  K menor que la del H2D** porque el método de medición es distinto (dibujo de líneas +
  radar láser frente a sensor de corriente de Foucault). Con A1 y H2D, el valor
  automático puede ser **significativamente más alto** que el manual, y eso es lo
  previsto. Los hotends de **0,2 mm** tienen una probabilidad alta de dar resultados
  automáticos inexactos o de fallar: para ellos se recomienda el método manual.
  — [Bambu Lab](https://wiki.bambulab.com/en/software/bambu-studio/calibration_pa),
  capturado 2026-10-21
- **Bambu — cuándo hay que recalibrar (y es la lista que engancha con el orden).**
  1. Filamento nuevo de otra marca o modelo. 2. Boquilla gastada (más fricción).
  3. Boquilla sustituida (tolancias de fabricación). 4. **Cuando cambia la velocidad
  volumétrica máxima o la temperatura de impresión en los ajustes del filamento.**
  — [Bambu Lab](https://wiki.bambulab.com/en/software/bambu-studio/calibration_pa),
  capturado 2026-10-21
- **Bambu — cuándo el resultado NO es fiable.** Filamento húmedo; filamento
  transparente (afecta al escaneo lidar de la serie X1); chapa que no agarra (hay que
  lavarla o aplicar stick); boquilla gastada o tapada; material muy blando como el
  TPU, que tiene alta probabilidad de fallo; **hotend de terceros**, sobre todo en A1
  y H2D, donde el sensor de eddy current puede dar valores inexactos. Fuera de esos
  casos, los resultados son fiables.
  — [Bambu Lab](https://wiki.bambulab.com/en/software/bambu-studio/calibration_pa),
  capturado 2026-10-21
- **Bambu — el ajuste antes de cada impresión.** La opción «Flow Dynamics Calibration»
  marcada antes de imprimir hace que la impresora calibre durante la preparación del
  trabajo y **use el K calibrado en lugar del K manual**. En la **X1** imprime una línea
  de calibración en la cama para el primer filamento del trabajo (los demás materiales
  usan el K manual, o el valor por defecto si no hay ninguno configurado). En la
  **serie A** se calibra cada filamento la primera vez que se sustituye en el trabajo.
  En la **H2D/H2S/P2S/X2D** hay tres posiciones: *Automatic* (usa el último valor si no
  han cambiado filamento ni boquilla, y recalibra si han cambiado), *Open* (calibra
  antes de cada impresión) y *Off* (usa el K del perfil de PA manual, o el valor por
  defecto del sistema). La **P1 no tiene esta opción** porque no soporta la
  calibración automática.
  — [Bambu Lab](https://wiki.bambulab.com/en/software/bambu-studio/calibration_pa),
  capturado 2026-10-21
- **Bambu — el alcance del K manual.** El conmutador «Whether PA parameters apply to
  the same type of filament and nozzle» está **activado por defecto**: activado, el K
  manual se aplica si coinciden el **tipo** de filamento y de boquilla con los del
  archivo de PA; desactivado, sólo se aplica si coinciden **exactamente** filamento y
  boquilla. En la H2D, si el perfil de PA está en «Default», el sistema ya no muestra
  un K concreto porque su algoritmo ajusta por modelo, boquilla y material.
  — [Bambu Lab](https://wiki.bambulab.com/en/software/bambu-studio/calibration_pa),
  capturado 2026-10-21
- **Bambu — se puede crear un perfil de PA sin calibrar**, para fijar un parámetro de
  compensación a un filamento que ya conoces (requiere Bambu Studio 1.9.1 o superior).
  Si no hay perfil de PA y no se marca la calibración automática, la impresora usa los
  **parámetros de compensación por defecto**, que en la mayoría de los casos dan
  buenos resultados.
  — [Bambu Lab](https://wiki.bambulab.com/en/software/bambu-studio/calibration_pa),
  capturado 2026-10-21

### La calibración automática no sustituye a los tests manuales

- Las calibraciones automáticas de flujo o PA **son útiles como punto de partida pero
  no garantizan el mejor resultado**: pueden variar entre trabajos y dificultar que la
  misma pieza se reproduzca siempre igual. Mantener perfiles calibrados a mano reduce
  variables y da una referencia con la que comparar el comportamiento de la máquina.
  — [Control3D](https://control3d.net/como-calibrar-una-impresora-3d-los-7-tests-imprescindibles/),
  capturado 2026-10-21
- Lo mismo, del lado del fabricante: la calibración automática de Bambu Studio es
  «fully automated» y **el resultado se guarda en la impresora**, pero la propia wiki
  enumera los casos en que **no es fiable** (ver arriba) y admite que **el K es
  específico de cada combinación impresora + filamento**.
  — [Bambu Lab](https://wiki.bambulab.com/en/software/bambu-studio/calibration_pa),
  capturado 2026-10-21

### Lo que hay que declarar antes de empezar (lo que la guía tendrá que preguntar)

Cada punto sale de una fuente, no de una intuición del redactor:

- **Qué slicer** usas: cambia dónde vive cada valor (PrusaSlicer → campo de
  Filament Settings; OrcaSlicer → perfil de material; Bambu Studio → menú
  Calibration; Duet3D → G-code).
  — [Prusa Research](https://help.prusa3d.com/article/linear-advance_2252),
  [OrcaSlicer](https://github.com/OrcaSlicer/OrcaSlicer/wiki/calibration_guide),
  [Bambu Lab](https://wiki.bambulab.com/en/software/bambu-studio/calibration_pa),
  [Duet3D](https://docs.duet3d.com/User_manual/Tuning/Pressure_advance),
  capturados 2026-10-21
- **Qué firmware**: *Linear Advance* (K) y *Pressure Advance* (M572) no son
  intercambiables, y Bambu llama a lo suyo *Flow Dynamics*.
  — [Prusa Research](https://help.prusa3d.com/article/linear-advance_2252),
  [Bambu Lab](https://wiki.bambulab.com/en/software/bambu-studio/calibration_pa),
  [Duet3D](https://docs.duet3d.com/User_manual/Tuning/Pressure_advance),
  capturados 2026-10-21
- **Extrusión directa o Bowden, y longitud del tubo**: determina la escala del valor
  de PA (Duet3D) y el rango de retracción (Control3D).
  — [Duet3D](https://docs.duet3d.com/User_manual/Tuning/Pressure_advance),
  [Control3D](https://control3d.net/como-calibrar-una-impresora-3d-los-7-tests-imprescindibles/),
  capturados 2026-10-21
- **Qué modelo de impresora y de boquilla**: la función disponible cambia por modelo
  (MK4 frente a MK3) y los K-values cambian por diámetro de boquilla.
  — [Prusa Research](https://help.prusa3d.com/article/linear-advance_2252),
  [Bambu Lab](https://wiki.bambulab.com/en/software/bambu-studio/calibration_pa),
  capturados 2026-10-21
- **Qué filamento y en qué máquina**: el K es específico de la combinación, y una
  bobina nueva obliga a recalibrar.
  — [Bambu Lab](https://wiki.bambulab.com/en/software/bambu-studio/calibration_pa),
  capturado 2026-10-21

### Los modelos de test de Control3D

El autor enlaza sus propios modelos en Printables y MakerWorld (cinco tests, dos
enlaces cada uno). **No se ha descargado ninguno ni se ha comprobado su contenido**:
se conservan como referencia de dónde está el modelo, no como una fuente.

| Test | Printables | MakerWorld |
|---|---|---|
| Retracciones | [235583](https://www.printables.com/model/235583-test-de-retracciones_control3d) | [547642](https://makerworld.com/es/models/547642-test-de-retracciones-control-3d#profileId-606009) |
| Tolerancias | [478599](https://www.printables.com/model/478599-test-de-tolerancias-control-3d) | [589818](https://makerworld.com/es/models/589818-test-de-tolerancias-control-3d#profileId-549275) |
| Velocidad | [421852](https://www.printables.com/model/421852-test-de-velocidad-version-montmelo-montmelo-speed) | [589826](https://makerworld.com/es/models/589826-test-de-velocidad-version-montmelo-speed-test#profileId-659441) |
| Voladizos | [1719705](https://www.printables.com/model/1719705-test-de-voladizos-control3d/comments) | [2795024](https://makerworld.com/es/models/2795024-control3d-overhang-test) |
| Cali Nozzle | [421834](https://www.printables.com/model/421834-cali-nozzle-nozzle-test-control3d) | [589836](https://makerworld.com/es/models/589836-cali-nozzle-nozzle-test-control3d#profileId-547493) |

— [Control3D](https://control3d.net/como-calibrar-una-impresora-3d-los-7-tests-imprescindibles/),
capturado 2026-10-21. El enlace de Printables del test de voladizos apunta a la
pestaña `/comments` del modelo, no a su ficha.

## Contradicciones

**No se resuelven aquí.** Se anotan con su matiz; el redactor debe explicar el matiz,
no elegir un número.

### 1. El orden de los pasos: tres variantes que se contradicen en lo que va antes

- **Control3D**: 1 Temperatura · 2 **Flujo** · 3 PA · 4 **Velocidad volumétrica
  máxima** · 5 Retracciones · 6 **Tolerancias** · 7 Voladizos y puentes · 8 Pieza final.
  — [Control3D](https://control3d.net/como-calibrar-una-impresora-3d-los-7-tests-imprescindibles/)
- **OrcaSlicer**: 1 Temperatura · 2 **Velocidad volumétrica máxima** · 3 **PA** · 4
  **Flujo** · 5 Retracciones → Advanced (Cornering, Input Shaping, VFA, Adaptive PA)
  → **Tolerancias al final**.
  — [OrcaSlicer](https://github.com/OrcaSlicer/OrcaSlicer/wiki/calibration_guide)
- **Duet3D** (sólo un tramo): **Input Shaping → PA → Retracción**.
  — [Duet3D](https://docs.duet3d.com/User_manual/Tuning/Pressure_advance)

**Se contradicen.** Y no se promedian ni se elige uno:

- Control3D pone el **flujo antes** que la velocidad volumétrica y la PA; OrcaSlicer
  pone la **velocidad volumétrica antes** que el flujo y la PA antes que el flujo.
  Control3D pone las **tolerancias en el 6**; OrcaSlicer las pone **al final de todo**,
  porque «the result depends on every calibration above».
- Duet3D mete el **Input Shaping antes de la retracción**, y OrcaSlicer lo pone en el
  grupo avanzado, **después** de la retracción (que es del grupo de filamento). Es un
  desacuerdo real entre dos fuentes oficiales sobre el orden de dos pasos.
- **Matiz**: **el orden no es un dato de fabricante, es un método.** El orden de
  OrcaSlicer es el único que razona cada paso con una dependencia explícita, y es
  documentación oficial. El de Control3D es el método de un autor de blog, cuya única
  justificación es que «algunos parámetros afectan directamente a los siguientes». El
  de Duet3D es un tramo suelto, no una ruta completa. **Prusa y Bambu no publican un
  orden**, así que no hay un orden canónico al que atenerse: lo que hay son **al menos
  tres métodos**, y el redactor tiene que declarar cuál usa y por qué en vez de
  presentarlo como *el* orden correcto.
- Matiz dentro de OrcaSlicer: **PA y flow ratio se influyen mutuamente** y la propia
  fuente dice que «either can be calibrated first»; si el flow ratio cambió mucho, hay
  que repetir un test rápido de PA. Es decir, ni siquiera el orden razonado de OrcaSlicer
  es una cadena rígida entre esos dos pasos.

### 2. La dirección del síntoma del Pressure Advance: no hay un criterio único

Cada fabricante describe el defecto con **palabras distintas** y, en un caso, **atribuye
la misma forma de esquina a lados opuestos del rango**. El redactor **no puede escribir
una regla única** del tipo «bulging ⇒ K bajo».

- **Bambu** (método de patrón, manual): un K de **0,006 es demasiado bajo** y la
  esquina **«is bulging and it's round»**; a partir de **0,024** aparece
  **«underextrusion in the corner»**; el valor elegido en su ejemplo es **0,018**.
  — [Bambu Lab](https://wiki.bambulab.com/en/software/bambu-studio/calibration_pa)
- **Prusa**: «If sharp corners have **blobs**, increase the K value. If you see
  **missing filament**, decrease the K value.»
  — [Prusa Research](https://help.prusa3d.com/article/linear-advance_2252)
- **Duet3D**: «**Too little PA** may result in a **bulge at the end of the perimeter**
  before the layer change. **Too much PA** may result in a **gap at the seam**»; y al
  interpretar: se elige el valor «where the seam is most even and the corners do not
  bulge. If there is a **gap at the seam** or corners, the PA value is too high».
  — [Duet3D](https://docs.duet3d.com/User_manual/Tuning/Pressure_advance)
- **Klipper**, ya cocinado en `flow-rate`: «Layers **below** the ideal pressure_advance
  setting will have **blobbing at the corners**, and layers **above** the ideal setting
  can lead to **rounded corners** and poor extrusion leading up to the corner.»
  — [Klipper3d](https://www.klipper3d.org/Pressure_Advance.html)
- **Marlin**, ya cocinado en `flow-rate`: K demasiado bajo → línea «starved» al acelerar
  y **blob** al decelerar; K demasiado alto → exceso al arrancar y **hambre** al
  decelerar. — [Marlin Firmware](https://marlinfw.org/docs/features/lin_advance.html)

**Se contradicen**, en dos planos distintos, y conviene separarlos:

1. **El plano de la dirección numérica**: leyendo literalmente las fuentes, la
   familia «abombado / blob» aparece **del lado bajo** del valor (Bambu, Prusa,
   Duet3D, Klipper y Marlin coinciden) y la familia «hueco / filamento que falta /
   subextrusión» **del lado alto**. Lo que **no** coincide es el vocabulario ni el punto
   donde se mira: esquina de un patrón (Bambu), esquinas vivas de un G-code (Prusa),
   final del perímetro antes del cambio de capa y la costura Z (Duet3D), o línea de la
   torre por capas (Klipper). **Un mismo defecto visible significa cosas distintas
   según el patrón con el que se esté mirando**, y ése es el riesgo real: elegir el
   valor equivocado en la dirección equivocada.
2. **El plano de la atribución de la forma de la esquina**, que sí es un desacuerdo
   frontal: Bambu llama «bulging and it's **round**» a la esquina del **K bajo**, y
   Klipper llama «**rounded** corners» a la del **PA alto**. La misma forma —esquina
   redondeada— queda atribuida a lados opuestos del rango. Quien traduzca «la esquina
   está redondeada, subo el K» se equivocará con el patrón de Bambu, y quien la
   interprete al revés se equivocará con la torre de Klipper.
- **Matiz**: la regla que **sí** es común a todas las fuentes es la que no depende del
   vocabulario: **se elige el valor en el que la línea o la forma es más uniforme**.
   Todo lo demás —qué palabra usar, en qué punto mirar, hacia qué lado mover el
   valor— hay que citarlo **con su fabricante delante**, porque las fuentes describen
   puntos de observación distintos con nombres distintos. **La guía no debe publicar un
   «K bajo = bulging» sin decir de qué patrón se habla.**

### 3. La escala y las unidades del «K» no son comparables entre fabricantes

- Bambu: ejemplo de **0,006 a 0,024**, en un Factor K propio.
  — [Bambu Lab](https://wiki.bambulab.com/en/software/bambu-studio/calibration_pa)
- Prusa: **PLA 0,05** (0,4 mm), **ASA/ABS 0,04**, etc.
  — [Prusa Research](https://help.prusa3d.com/article/linear-advance_2252)
- Duet3D: **`M572 S` en segundos**; 0,025 en direct drive, hasta 0,7–2,0 en Bowden
  largo. — [Duet3D](https://docs.duet3d.com/User_manual/Tuning/Pressure_advance)
- Marlin (ya cocinado en `flow-rate`): K v1.5 ≈ **0,1–2,0** en mm/mm/s.
  — [Marlin Firmware](https://marlinfw.org/docs/features/lin_advance.html)
- Klipper (ya cocinado en `flow-rate`): PA típico **0,050–1,000**.
  — [Klipper3d](https://www.klipper3d.org/Pressure_Advance.html)

**Se contradicen en la escala, no en el fenómeno.** La misma letra K designa una
constante proporcional sin unidades (Prusa, Bambu, Klipper), una cantidad con unidades
de **mm/mm/s** (Marlin v1.5) y un parámetro **en segundos** (Duet3D). La cifra de Prusa
para PLA (0,05) y el S0.025 de Duet3D para direct drive **no son el mismo número con
distinto nombre**: son magnitudes distintas. El redactor **no debe traducir ni
comparar** cifras entre fabricantes, y la guía no debe presentar «el K correcto» sin
decir de qué firmware y de qué patrón se obtuvo.

### 4. La retracción en Bowden: un tercer valor, en otra fuente

- Control3D: en Bowden «el límite puede situarse **aproximadamente entre 6 y 7 mm**»,
  según la longitud del tubo; en extrusión directa **2 mm ya sería muy elevado**.
  — [Control3D](https://control3d.net/como-calibrar-una-impresora-3d-los-7-tests-imprescindibles/)
- OrcaSlicer, ya cocinado en `stringing`: **1–6 mm con paso de 0,2 mm** para Bowden.
  — [OrcaSlicer](https://github.com/OrcaSlicer/OrcaSlicer/wiki/retraction_calib)
- Simplify3D, ya cocinado en `stringing`: **hasta 15 mm** de distancia de retracción en
  Bowden. — [Simplify3D](https://www.simplify3d.com/support/print-quality-troubleshooting/stringing-or-oozing/)

**Se contradicen.** Control3D se mueve dentro del rango de OrcaSlicer (6–7 mm frente a
1–6 mm: se solapan en el 6) y los dos quedan muy por debajo del máximo de Simplify3D.
**Matiz**: el valor depende de la longitud del tubo Bowden, que las tres fuentes tratan
distinto; el 15 mm de Simplify3D es un techo teórico y el 1–6 mm de OrcaSlicer un rango
práctico recomendado. La contradicción **ya está declarada** en
`wiki/cooked/stringing-retraccion.md`; esta fuente la amplía con un tercer valor, y
no la resuelve. **El paso de 0,2 mm sí está corroborado** por OrcaSlicer; los **límites
de 2 mm y 6–7 mm**, no.

## Sin respaldo

Afirmaciones que aparecen en **una sola fuente** y que conviene no redactar como regla
general. Las de origen fabricante se marcan como tales; las de Control3D son de un
**blog de autor** (fuente secundaria), no documentación de fabricante.

- El **orden de ocho pasos** de Control3D. No hay ninguna cita a Prusa, OrcaSlicer,
  Bambu ni Marlin que lo respalde; es un método del autor.
  **[UNA SOLA FUENTE — blog de autor, sin corroborar]**
  — [Control3D](https://control3d.net/como-calibrar-una-impresora-3d-los-7-tests-imprescindibles/)
- Los **límites de retracción «2 mm» en extrusión directa y «6–7 mm» en Bowden**.
  **[UNA SOLA FUENTE — blog de autor, sin corroborar]** El **paso de 0,2 mm** sí lo
  corrobora OrcaSlicer (ya cocinado en `stringing`).
  — [Control3D](https://control3d.net/como-calibrar-una-impresora-3d-los-7-tests-imprescindibles/)
- Que el test de voladizos debe llegar **hasta unos 75°**. **[UNA SOLA FUENTE — blog de
  autor, sin corroborar]** Y con un aviso: **los 75° son el final del test, no un
  umbral**; el umbral de 45° que hay en la wiki es de Bambu y ya está cocinado en
  `voladizos-y-soportes`. La guía no puede publicar «los voladizos fallan a 75°».
  — [Control3D](https://control3d.net/como-calibrar-una-impresora-3d-los-7-tests-imprescindibles/)
- El **ejemplo numérico de flujo en dos fases** del autor (factor 1 → mejor loseta
  −5 % → 0,95 → mejor −3 % → 0,92). **[UNA SOLA FUENTE — blog de autor, sin
  corroborar]** No es el método coarse/fine de Bambu ni el YOLO de OrcaSlicer, ya
  cocinados en `flow-rate`.
  — [Control3D](https://control3d.net/como-calibrar-una-impresora-3d-los-7-tests-imprescindibles/)
- Los **criterios de lectura de la torre** tal como los formula Control3D, en
  particular que **un acabado excesivamente apagado puede indicar temperatura
  demasiado baja** en materiales no mates. **[UNA SOLA FUENTE — blog de autor, sin
  corroborar]** Los criterios de lectura de la torre ya están cocinados en
  `torre-temperatura`; el criterio del acabado mate debe llegar allí con esta marca.
  — [Control3D](https://control3d.net/como-calibrar-una-impresora-3d-los-7-tests-imprescindibles/)
- La **regla de que el test de tolerancias empieza en 0 y se busca el mínimo que
  encaja**. **[UNA SOLA FUENTE — blog de autor, sin corroborar]** Las cifras de
  holgura y los tipos de encaje ya están cocinados en `tolerancias-y-encaje`.
  — [Control3D](https://control3d.net/como-calibrar-una-impresora-3d-los-7-tests-imprescindibles/)
- La **fórmula del límite volumétrico** («distancia × incremento + velocidad
  volumétrica inicial») en Control3D. **Sí corroborada** por OrcaSlicer, ya cocinada
  en `max-volumetric-speed`; Control3D la da sin las cifras de ejemplo.
  — [Control3D](https://control3d.net/como-calibrar-una-impresora-3d-los-7-tests-imprescindibles/)
- El **margen de seguridad del 10–20 %** bajo el límite volumétrico. Es de **OrcaSlicer**
  (documentación oficial), y aparece en **dos páginas del mismo wiki**, no en dos
  fuentes independientes. — sólo OrcaSlicer.
  — [OrcaSlicer](https://github.com/OrcaSlicer/OrcaSlicer/wiki/calibration_guide)
- Los **valores de arranque de Duet3D** (S0.025 / 0,1 / 0,3 / 0,5 / 0,7 según longitud
  del tubo). La propia fuente los llama «only starting points» y advierte de que cada
  montaje puede necesitar más o menos: **no son valores finales**.
  — [Duet3D](https://docs.duet3d.com/User_manual/Tuning/Pressure_advance)
- El **jitter de ~10 %** entre calibraciones de Bambu, y que la causa sigue bajo
  investigación. — sólo Bambu Lab.
  — [Bambu Lab](https://wiki.bambulab.com/en/software/bambu-studio/calibration_pa)
- Los **valores de ejemplo de Bambu** (0,015 automático; 0,006 / 0,018 / 0,024 en el
  manual; paso de intervalo 0,002) y que el automático de la X1 da un K menor que el
  del H2D. Son ejemplos del método, **no recomendaciones de K**.
  — [Bambu Lab](https://wiki.bambulab.com/en/software/bambu-studio/calibration_pa)
- Los **K-values de Prusa** (PLA 0,05; PETG 0,08; ASA/ABS 0,04; … en 0,4 mm y 0,6 mm)
  y las **temperaturas de los G-code de calibración** (PLA 215 °C, ABS 255 °C,
  PETG 240 °C). Son del fabricante, sin corroboración cruzada — y **no son
  transferibles** a otro firmware (ver contradicción 3).
  — [Prusa Research](https://help.prusa3d.com/article/linear-advance_2252)
- Los **modelos de test** de Control3D: no se ha descargado ninguno ni se ha
  comprobado su contenido.
  — [Control3D](https://control3d.net/como-calibrar-una-impresora-3d-los-7-tests-imprescindibles/)
- **Prusa y Bambu no publican un orden de calibración.** No es un dato: es una
  ausencia. La guía debe decirlo así, sin reconstruirlo a partir de OrcaSlicer,
  Control3D o Duet3D.
- Los **comentarios de usuario** de la página de Prusa (los valores PLA 0,045 en 0,4 mm
  y 0,03 en 0,6 mm HF, y el recordatorio de que la XL usa `M572`) **no son
  documentación de Prusa** y quedan fuera de las afirmaciones. La página oficial
  confirma la parte del firmware en el cuerpo del artículo; las cifras de usuario, no.

## Tirado

Qué se eliminó y por qué (el redactor no usa nada de esto).

- **Navegación, menús, migas de pan, barra lateral, cookies, pie de página, "artículos
  relacionados", "Topics", "Was this article helpful?", "Show older comments",
  "Leave a comment", "Show more"** de los cuatro sitios. — no son datos técnicos.
- **Los 80 comentarios de usuario** de la página de Prusa, incluidos los que aportan
  cifras de K y el enlace a una herramienta de calibración de PA. — no son
  documentación del fabricante; separarlos del cuerpo del artículo era explícito en
  la captura.
- **La promoción de la Academia Control3D** y el CTA «Descarga nuestros test GRATIS».
  Los **enlaces a los modelos** sí se conservan (son la única forma de llegar al
  modelo), pero la pieza comercial no.
- **La tabla de descargas de los G-code de calibración de Prusa**, reproducida con el
  texto «Download» porque las URL no aparecieron en la extracción. — sin URL no es
  citable. Se conservan las **temperaturas** con las que se imprimieron esos G-code
  (PLA 215 °C, ABS 255 °C, PETG 240 °C), que aparecen en el cuerpo del artículo; las
  alturas de capa (0,2 / 0,3 mm) y las velocidades (45 / 60 / 50 mm/s) sólo aparecían en
  esa tabla y **no se han cocinado**.
- **Los hilos de foro de Duet3D** (las macros de Phaedrux, el script de Python de un
  usuario, el método detallado en otro hilo, el script de K-factor de Marlin): son
  enlaces a fuentes que **no se han descargado**. Se conserva en cambio el **método
  más simple** y el **método de post-proceso**, que están en el cuerpo de la página.
- **Los scripts de ejemplo completos** de Duet3D para PrusaSlicer y Simplify3D
  (bloques `{if layer_num== …}` y `{REPLACE …}`). — son código de terceros; se conserva
  el hecho de que existe un automatismo por *g-code antes del cambio de capa* y por
  post-proceso en Simplify3D.
- **La navegación, los botones y las imágenes sin texto** de la wiki de Bambu, y la
  **frase duplicada** («When considering the Flow Dynamics calibration…») que aparece
  dos veces en el original. — duplicación y cromado.
- **Los enlaces internos al wiki de OrcaSlicer** (temp_calib, volumetric_speed_calib,
  pressure_advance_calib, flow_ratio_calib, retraction_calib, cornering_calib,
  input_shaping_calib, vfa_calib, adaptive_pressure_advance_calib, tolerance_calib):
  esas páginas ya existen en `wiki/raw/` con otro nombre de fichero y su contenido ya
  está cocinado en `flow-rate` y `max-volumetric-speed`. No se vuelven a traer. Se
  conserva, en cambio, la **lista de créditos**, que dice de qué proyecto procede
  cada patrón — es lo que sostiene el punto de «los nombres no se portan».
- **Repetidos condensados**: el argumento «la calibración automática no sustituye a los
  tests» aparece en Control3D y en Bambu (modos manual/automático): se queda la versión
  de Control3D y la de Bambu se cita como corroboración. La **fórmula del límite
  volumétrico** aparece en Control3D y OrcaSlicer: se queda la de OrcaSlicer (ya
  cocinada) y Control3D se cita como corroboración. El **paso de 0,2 mm** en
  retracciones aparece en Control3D y en OrcaSlicer: se queda el de OrcaSlicer.
- **Las notas del recolector** (`## Notas del recolector`) de los cinco ficheros: se
  usaron como guía de lectura y para detectar las contradicciones, no se copiaron como
  afirmaciones.
- **La discrepancia de autoría del artículo de Control3D**: el *byline* es «Posted by
  Juan Alejandro Santana Delgado Delgado» (usuario «estudioka»), mientras que la barra
  lateral se presenta como «Hola, soy César» (Control3D / EstudioKA). Se cita al
  **autor del byline** como autor del artículo; la nota se conserva aquí sólo para que
  el redactor no atribuya el texto a la persona de la barra lateral.

## Relaciones

| Concepto | Se relaciona con | Cómo |
|---|---|---|
| ruta de calibración | temperatura-hotend / torre-temperatura | el paso 1 de ambas rutas; los criterios de lectura están cocinados allí |
| ruta de calibración | flow-rate | el paso de flujo y el de PA; sus métodos y escalas ya están cocinados allí |
| ruta de calibración | max-volumetric-speed | el paso de velocidad volumétrica y su fórmula |
| ruta de calibración | stringing | el paso de retracciones, con el paso de 0,2 mm y los límites de Bowden |
| ruta de calibración | tolerancias-y-encaje | el paso de tolerancias, que OrcaSlicer pone al final de todo |
| ruta de calibración | voladizos-y-soportes | el paso de voladizos y puentes; el umbral de 45° es de Bambu y no el final del test de 75° |
| ruta de calibración | z-seam | la costura Z es el punto de observación del método de Duet3D para el PA |
| ruta de calibración | slicer | el slicer decide dónde vive cada valor: perfil de material, campo de filamento o G-code |
| orden de calibración | método, no especificación | tres variantes distintas (Control3D, OrcaSlicer, Duet3D); Prusa y Bambu no publican ninguno |
| Flow Dynamics (Bambu) | Pressure Advance (Prusa/Orca/Duet) | mismo fenómeno, distinto nombre y distinta escala de valor |
| Linear Advance (Marlin/Prusa) | Pressure Advance (Duet/Orca) | mismo fenómeno; el parámetro no se porta entre firmwares |
| Factor K (Bambu) | K-value (Prusa) | misma letra, magnitudes distintas: no comparar cifras entre fabricantes |
| PA antes de flujo (Orca) | flujo antes de PA (Control3D) | contradicción declarada; Orca razona que el PA es lo que peor suele estar |
| PA antes de retracción (Duet3D) | retracción antes de Input Shaping (Orca) | contradicción declarada entre dos fuentes oficiales |
| Input Shaping antes de PA (Duet3D) | Adaptive PA después de Input Shaping (Orca) | coinciden en esta dependencia |
| PA activa | retracción | con PA alta el extrusor puede retraer: conviene reducir la retracción al activarlo |
| PA / jerk del extrusor | M566 E (Duet3D) | un jerk bajo restringe la aceleración y hace que imprimir con PA vaya más lento |
| PA baja / alta | bulging / gap | el vocabulario y el punto de observación difieren entre Bambu, Prusa, Duet3D y Klipper |
| recalibrar el K (Bambu) | cambiar temperatura o velocidad volumétrica | la propia Bambu obliga a recalibrar cuando cambian esos dos ajustes del filamento |
| calibración automática | perfil guardado a mano | la automática sirve de punto de partida; la manual da la referencia reproducible |
