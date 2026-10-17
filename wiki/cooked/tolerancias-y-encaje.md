---
titulo: Tolerancias y encaje en impresión 3D FDM
tema: tolerancias-y-encaje
fuentes:
  - wiki/raw/tolerancias-y-encaje-slic3r-dimension-errors.md
  - wiki/raw/tolerancias-y-encaje-prusa-forum-dimensional-accuracy.md
  - wiki/raw/tolerancias-y-encaje-orcaslicer-precision.md
  - wiki/raw/tolerancias-y-encaje-orcaslicer-tolerance-calib.md
  - wiki/raw/tolerancias-y-encaje-all3dp-tolerances-test-fdm.md
  - wiki/raw/tolerancias-y-encaje-simplify3d-dimensional-accuracy.md
cocinado: 2026-10-17
---

## Afirmaciones

### Definiciones: tolerancia vs. holgura

- Una tolerancia es el rango de desviación aceptable respecto a un valor nominal (ejemplo: filamento de 1,75 mm ±0,02 mm, es decir, entre 1,73 y 1,77 mm). — [All3DP](https://all3dp.com/2/3d-printing-tolerances-test-fdm/), capturado 2026-10-17.
- Una holgura (clearance) es el espacio entre dos piezas que deben encajar. — [All3DP](https://all3dp.com/2/3d-printing-tolerances-test-fdm/), capturado 2026-10-17.
- Las tolerancias de las máquinas de impresión 3D indican cuánto puede desviarse una pieza de sus dimensiones nominales; una tolerancia más estrecha (más cercana a cero) indica mayor precisión dimensional consistente. — [All3DP](https://all3dp.com/2/3d-printing-tolerances-test-fdm/), capturado 2026-10-17.
- No hay dos impresoras con la misma tolerancia, ni siquiera del mismo modelo; hay que calibrar la propia máquina y no confiar en valores ajenos. — [All3DP](https://all3dp.com/2/3d-printing-tolerances-test-fdm/), capturado 2026-10-17.
- Ejemplo de tolerancia de filamento: Prusament PLA listado a 1,75 mm ±0,02 mm. — [All3DP](https://all3dp.com/2/3d-printing-tolerances-test-fdm/), capturado 2026-10-17.

### Tipos de encaje (fits)

Para una unión eje-agujero de diámetro nominal 50 mm, All3DP da tres tipos de encaje con valores de ejemplo para un nozzle estándar de 0,4 mm (las cifras son ejemplos, no valores absolutos):

- **Encaje con holgura (clearance fit):** el diámetro del eje es sensiblemente menor que el del agujero (ejemplo 49,8 mm y 50,2 mm); el eje entra y sale con facilidad y gira dentro del agujero. Regla de pulgar: diferencia de 0,5 mm o más entre diámetros, lo que deja un gap teórico de al menos 0,25 mm. — [All3DP](https://all3dp.com/2/3d-printing-tolerances-test-fdm/), capturado 2026-10-17.
- **Encaje por interferencia (interference fit):** el eje es igual o ligeramente mayor que el agujero (ejemplo 50,2 mm y 49,8 mm); no entra sin mucha fuerza y, una vez entrado, no sale sin romper las piezas. Regla de pulgar: diferencia de 0,1 mm o menos, gap teórico de 0,05 mm o menos. Se usa cuando se requiere alta concentricidad y movimiento mutuo (p. ej. eje en rodamiento). — [All3DP](https://all3dp.com/2/3d-printing-tolerances-test-fdm/), capturado 2026-10-17.
- **Encaje de transición (transition fit):** el eje es ligeramente menor o ligeramente mayor que el agujero (ejemplo 49,9 mm y 50,0 mm); entra con presión mínima y mantiene concentricidad relativa. Regla de pulgar: diferencia de 0,15–0,4 mm, gap teórico de 0,08–0,2 mm. — [All3DP](https://all3dp.com/2/3d-printing-tolerances-test-fdm/), capturado 2026-10-17.
- Cada tipo de encaje abarca un espectro de combinaciones admisibles; las dimensiones dadas son solo ejemplos. Para seleccionar correctamente un encaje y diseñar en consecuencia existen estándares internacionales (tolerancia ISO), pero el artículo no los desarrolla. — [All3DP](https://all3dp.com/2/3d-printing-tolerances-test-fdm/), capturado 2026-10-17.

### Causas de inexactitud en FDM

**Software:**

- Al convertir un modelo digital a STL se pierden detalles: los objetos redondos se facultan y se convierten en superficies y vértices rectos; a mayor resolución de conversión, menor error dimensional. — [All3DP](https://all3dp.com/2/3d-printing-tolerances-test-fdm/), capturado 2026-10-17.
- Los slicers introducen sus propios errores según sus algoritmos y ajustes; la forma en que alteran los vértices del STL afecta al G-code y al comportamiento de la impresora. — [All3DP](https://all3dp.com/2/3d-printing-tolerances-test-fdm/), capturado 2026-10-17.
- Las curvas se aproximan por polígonos en el STL; aumentar el número de segmentos en el CAD antes de exportar el STL reduce el error. — [Slic3r Manual](https://manual.slic3r.org/troubleshooting/dimension-errors), capturado 2026-10-17.
- OpenSCAD ofrece la función `polyhole()` de nophead, que calcula el número óptimo de segmentos. — [Slic3r Manual](https://manual.slic3r.org/troubleshooting/dimension-errors), capturado 2026-10-17.

**Máquina:**

- Los motores paso a paso tienen resolución de movimiento finita; la precisión de una trayectoria es solo tan buena como la resolución máxima de los motores. — [All3DP](https://all3dp.com/2/3d-printing-tolerances-test-fdm/), capturado 2026-10-17.
- Los motores típicos de FDM no tienen bucle de control de posición, así que pequeños errores de posición pueden acumularse en trabajos largos. — [All3DP](https://all3dp.com/2/3d-printing-tolerances-test-fdm/), capturado 2026-10-17.
- La protección térmica de los drivers puede detener el motor si se sobrecalienta, provocando saltos de paso. — [All3DP](https://all3dp.com/2/3d-printing-tolerances-test-fdm/), capturado 2026-10-17.
- Los E-steps del extrusor son un factor crucial que puede causar inexactitudes dimensionales si no están calibrados. — [All3DP](https://all3dp.com/2/3d-printing-tolerances-test-fdm/), capturado 2026-10-17.
- Si los ejes no son suficientemente ortogonales entre sí, aparecen inexactitudes estructurales (un rectángulo se convierte en paralelogramo). — [All3DP](https://all3dp.com/2/3d-printing-tolerances-test-fdm/), capturado 2026-10-17.
- En cada cambio de dirección de un eje hay una pequeña cantidad de backlash (holgura); a menor tensión de la correa, mayor backlash. Las correas también sufren creep y elongación con el tiempo, que reducen la tensión y pueden provocar resbalones y pasos perdidos. — [All3DP](https://all3dp.com/2/3d-printing-tolerances-test-fdm/), capturado 2026-10-17.
- Al imprimir una línea de filamento se espera un ancho uniforme, pero el inicio de la línea puede ser más delgado y ensancharse al final a medida que aumenta la presión en la boquilla; se exagera al tomar curvas. — [All3DP](https://all3dp.com/2/3d-printing-tolerances-test-fdm/), capturado 2026-10-17.
- La sobre-extrusión general produce una línea de impresión más ancha y la dimensión total sale demasiado grande; la sub-extrusión produce el efecto contrario. — [All3DP](https://all3dp.com/2/3d-printing-tolerances-test-fdm/), capturado 2026-10-17.
- La calidad y el estado del filamento (diámetro irregular, boquilla mal mecanizada) producen irregularidades de extrusión que se traducen en superficies irregulares. — [All3DP](https://all3dp.com/2/3d-printing-tolerances-test-fdm/), capturado 2026-10-17; [Slic3r Manual](https://manual.slic3r.org/troubleshooting/dimension-errors), capturado 2026-10-17.
- Una altura Z inicial incorrecta provoca elephant foot: la primera capa se extiende más que las siguientes por el peso de la impresión. — [All3DP](https://all3dp.com/2/3d-printing-tolerances-test-fdm/), capturado 2026-10-17.

**Materiales y contracción:**

- El plástico se contrae al enfriar; diferentes materiales exhiben diferente contracción, que también depende de la temperatura. — [Slic3r Manual](https://manual.slic3r.org/troubleshooting/dimension-errors), capturado 2026-10-17; [Bambu Lab Wiki](https://wiki.bambulab.com/en/software/bambu-studio/parameter/xy-compensation), capturado 2026-10-17 (corroboración).
- Al extruir a lo largo de una curva se deposita más material por unidad de distancia en el lado cóncavo, lo que hace el radio interno más corto. — [Slic3r Manual](https://manual.slic3r.org/troubleshooting/dimension-errors), capturado 2026-10-17.
- El plástico tiende a redondear las esquinas, reduciendo aún más el área interna del agujero. — [Slic3r Manual](https://manual.slic3r.org/troubleshooting/dimension-errors), capturado 2026-10-17.
- La sección irregular del filamento (diámetro no constante) produce flujo irregular y el agujero resultante es la envolvente interna de todas las capas. — [Slic3r Manual](https://manual.slic3r.org/troubleshooting/dimension-errors), capturado 2026-10-17.
- Z wobble por problemas mecánicos reduce el tamaño del agujero a la envolvente interna de las capas apiladas. — [Slic3r Manual](https://manual.slic3r.org/troubleshooting/dimension-errors), capturado 2026-10-17.
- Backlash (holgura mecánica, generalmente correas flojas) produce errores dimensionales distintos en X e Y; en impresoras con cama móvil, el eje Y es más propenso por la inercia. — [Slic3r Manual](https://manual.slic3r.org/troubleshooting/dimension-errors), capturado 2026-10-17.
- El lado interior del anillo tiene menos volumen que el exterior y se pega a la huella previa, así que el diámetro interior sale menor. — [Foro Prusa, VH](https://forum.prusa3d.com/forum/original-prusa-i3-mk3s-mk3-improvements-archive/dimensional-accuracy/), capturado 2026-10-17.
- La contracción del material puede hacer los agujeros más pequeños. — [Bambu Lab Wiki](https://wiki.bambulab.com/en/software/bambu-studio/parameter/xy-compensation), capturado 2026-10-17.
- El pie de elefante por exceso de aplastamiento en la primera capa afecta las dimensiones. — [Bambu Lab Wiki](https://wiki.bambulab.com/en/software/bambu-studio/parameter/xy-compensation), capturado 2026-10-17.
- Filamento húmedo causa extrusión inconsistente. — [Bambu Lab Wiki](https://wiki.bambulab.com/en/software/bambu-studio/parameter/xy-compensation), capturado 2026-10-17.
- Agujeros con diámetro cercano al tamaño de la boquilla (menores de 1 mm) son difíciles de ajustar. — [Bambu Lab Wiki](https://wiki.bambulab.com/en/software/bambu-studio/parameter/xy-compensation), capturado 2026-10-17.
- La costura (seam) puede afectar la precisión del agujero. — [Bambu Lab Wiki](https://wiki.bambulab.com/en/software/bambu-studio/parameter/xy-compensation), capturado 2026-10-17.
- Falta de chaflanes o lead-in en los agujeros dificulta el encaje. — [Bambu Lab Wiki](https://wiki.bambulab.com/en/software/bambu-studio/parameter/xy-compensation), capturado 2026-10-17.

### Contracción térmica (shrinkage)

- Cada combinación de filamento e impresora puede resultar en tolerancias diferentes; incluso con el mismo filamento y perfil, las tolerancias varían de una impresora a otra. — [OrcaSlicer Wiki – tolerance_calib](https://github.com/OrcaSlicer/OrcaSlicer/wiki/tolerance_calib), capturado 2026-10-17.
- OrcaSlicer separa la compensación de filamento (Shrinkage XY y Z) de la compensación de proceso (X-Y hole/contour compensation). — [OrcaSlicer Wiki – tolerance_calib](https://github.com/OrcaSlicer/OrcaSlicer/wiki/tolerance_calib), capturado 2026-10-17.
- El error dimensional que aumenta con el tamaño de la pieza es atribuible a la contracción térmica; el porcentaje de contracción = error / tamaño. Ejemplo: 0,1 mm en 20 mm = 0,5 %. — [Simplify3D](https://www.simplify3d.com/resources/print-quality-troubleshooting/dimensional-accuracy/), capturado 2026-10-17.
- La contracción térmica es un problema común en materiales de alta temperatura como ABS. — [Simplify3D](https://www.simplify3d.com/resources/print-quality-troubleshooting/dimensional-accuracy/), capturado 2026-10-17.
- La contracción del filamento es diferente según el material y cómo se aplica. — [Foro Prusa, Swiss_Cheese](https://forum.prusa3d.com/forum/original-prusa-i3-mk3s-mk3-improvements-archive/dimensional-accuracy/), capturado 2026-10-17 **[UNA SOLA FUENTE — foro, sin corroborar]**.

### Orientación de la pieza

- Los agujeros se imprimen mejor en horizontal (paralelos al plano XY de la impresora). Si hay que imprimir un agujero vertical, usar la técnica del teardrop: la parte superior del agujero se diseña en forma puntiaguda en lugar de completamente redonda, eliminando inexactitudes por voladizo del filamento al cerrar la parte superior. — [All3DP](https://all3dp.com/2/3d-printing-tolerances-test-fdm/), capturado 2026-10-17.
- Por la naturaleza por capas de la impresión FDM, los rasgos verticales suelen ser menos precisos (solo tan finos como la altura de capa); los rasgos horizontales (XY) tienden a ser más precisos, limitados solo por la resolución de los motores paso a paso y la correa. — [All3DP](https://all3dp.com/2/3d-printing-tolerances-test-fdm/), capturado 2026-10-17.
- Según la orientación de impresión, un agujero circular siempre sale elíptico. — [Foro Prusa, gigiga](https://forum.prusa3d.com/forum/original-prusa-i3-mk3s-mk3-improvements-archive/dimensional-accuracy/), capturado 2026-10-17 **[UNA SOLA FUENTE — foro, sin corroborar]**.

### Compensación XY en el slicer

**Bambu Studio:**

- **XY Hole Compensation:** ajusta el tamaño de los agujeros (áreas cerradas, huecas) en cada capa; solo afecta a agujeros, no cambia el tamaño exterior del modelo. — [Bambu Lab Wiki](https://wiki.bambulab.com/en/software/bambu-studio/parameter/xy-compensation), capturado 2026-10-17.
- **XY Contour Compensation:** ajusta el contorno exterior del modelo; aumenta o disminuye el tamaño XY manteniendo los agujeros sin cambios. — [Bambu Lab Wiki](https://wiki.bambulab.com/en/software/bambu-studio/parameter/xy-compensation), capturado 2026-10-17.
- La compensación del agujero se aplica por radio: el diámetro del agujero aumentará el doble del valor de compensación. — [Bambu Lab Wiki](https://wiki.bambulab.com/en/software/bambu-studio/parameter/xy-compensation), capturado 2026-10-17.
- Fórmula de calibración de contorno en Bambu: (55 − valor medido) / 2. — [Bambu Lab Wiki](https://wiki.bambulab.com/en/software/bambu-studio/parameter/xy-compensation), capturado 2026-10-17.
- La calibración de compensación es específica para cada filamento; debe repetirse al cambiar de material. — [Bambu Lab Wiki](https://wiki.bambulab.com/en/software/bambu-studio/parameter/xy-compensation), capturado 2026-10-17.
- Un tornillo M6 nominal tiene un diámetro real de ~5,9 mm por la norma ISO 6g (la rosca es ligeramente menor para facilitar el ensamblaje). — [Bambu Lab Wiki](https://wiki.bambulab.com/en/software/bambu-studio/parameter/xy-compensation), capturado 2026-10-17.
- **Limitación:** XY Hole Compensation solo aplica a caminos cerrados; si el modelo tiene aberturas laterales que producen caminos no cerrados en una capa, la compensación no se aplica a esas capas; aplicarla en ese caso produce una separación de capa notable en las ubicaciones de los agujeros. Solo XY Contour Compensation puede aplicarse a capas con caminos no cerrados. — [Bambu Lab Wiki](https://wiki.bambulab.com/en/software/bambu-studio/parameter/xy-compensation), capturado 2026-10-17.

**OrcaSlicer:**

- **X-Y hole compensation:** los agujeros se expanden o contraen en el plano XY por el valor configurado; valores positivos hacen agujeros más grandes, negativos más pequeños. — [OrcaSlicer Wiki – quality_settings_precision](https://github.com/OrcaSlicer/OrcaSlicer/wiki/quality_settings_precision), capturado 2026-10-17.
- **X-Y contour compensation:** los contornos se expanden o contraen en el plano XY; positivos = más grandes, negativos = más pequeños. — [OrcaSlicer Wiki – quality_settings_precision](https://github.com/OrcaSlicer/OrcaSlicer/wiki/quality_settings_precision), capturado 2026-10-17.
- **X-Y Compensation** se usa para compensar la expansión o contracción del material en XY, que puede deberse al tipo de filamento, fluctuaciones de temperatura o problemas de calibración de la impresora. — [OrcaSlicer Wiki – quality_settings_precision](https://github.com/OrcaSlicer/OrcaSlicer/wiki/quality_settings_precision), capturado 2026-10-17.
- Ambas compensaciones son de modo Advanced; la wiki recomienda seguir la Calibration Guide y la Filament Tolerance Calibration para determinar el valor correcto para cada combinación impresora/filamento. — [OrcaSlicer Wiki – quality_settings_precision](https://github.com/OrcaSlicer/OrcaSlicer/wiki/quality_settings_precision), capturado 2026-10-17.

**Slic3r:**

- **XY Size Compensation:** si los agujeros salen 0,1 mm pequeños, se introduce −0,05 (signo negativo = encoger hacia dentro); se compensa la mitad del error porque actúa en cada lado. — [Slic3r Manual](https://manual.slic3r.org/troubleshooting/dimension-errors), capturado 2026-10-17.

**Simplify3D:**

- **Horizontal Size Compensation** (pestaña Other de Process Settings): −0,1 mm encoge el modelo 0,1 mm en X e Y; funciona mejor cuando el error dimensional es constante, incluso imprimiendo modelos de diferentes tamaños. — [Simplify3D](https://www.simplify3d.com/resources/print-quality-troubleshooting/dimensional-accuracy/), capturado 2026-10-17.

**SuperSlicer (según foro):**

- SuperSlicer tiene un parámetro específico de compensación de agujeros (`hole_size_compensation`). — [Foro Prusa, Sebastian](https://forum.prusa3d.com/forum/original-prusa-i3-mk3s-mk3-improvements-archive/dimensional-accuracy/), capturado 2026-10-17 **[UNA SOLA FUENTE — foro, sin corroborar]**.
- El XY size compensation de PrusaSlicer impacta todo el modelo, no solo los agujeros. — [Foro Prusa, ed brakus](https://forum.prusa3d.com/forum/original-prusa-i3-mk3s-mk3-improvements-archive/dimensional-accuracy/), capturado 2026-10-17 **[UNA SOLA FUENTE — foro, sin corroborar]**.

### Calibración y pruebas de tolerancia

- Para probar las tolerancias de la impresora: calibrar la impresora y el extrusor, imprimir 3 a 5 cubos de calibración, medir cada impresión en el mismo lugar con calibre, anotar la orientación del modelo (las letras grandes del cubo), registrar al menos 3 mediciones por cada una de las 3 direcciones (X, Y, Z). — [All3DP](https://all3dp.com/2/3d-printing-tolerances-test-fdm/), capturado 2026-10-17.
- Para cada dirección, restar la medición más pequeña de la más grande; ese número es un buen punto de partida para diseñar holguras. La tolerancia de la impresora será ± la mitad del valor de la holgura. Ejemplo: mediciones 20,1 / 20,0 / 19,9 mm en Y → holgura = 20,1 − 19,9 = 0,2 mm → tolerancia ±0,1 mm. — [All3DP](https://all3dp.com/2/3d-printing-tolerances-test-fdm/), capturado 2026-10-17.
- El valor obtenido no es permanente: depende del estado actual de la impresora y del material usado. — [All3DP](https://all3dp.com/2/3d-printing-tolerances-test-fdm/), capturado 2026-10-17.
- Alternativamente, probar directamente holguras con tests de clearance (Maker's Muse, zapta en Thingiverse, 3DMakerNoob en Printables). — [All3DP](https://all3dp.com/2/3d-printing-tolerances-test-fdm/), capturado 2026-10-17.
- Para minimizar el impacto de la primera capa en la medición: imprimir un modelo con 50–100 capas y medir solo las 20 superiores. — [Simplify3D](https://www.simplify3d.com/resources/print-quality-troubleshooting/dimensional-accuracy/), capturado 2026-10-17.
- Si la boquilla está demasiado baja en la primera capa, el plástico extra crea capas más grandes en la base que afectan las dimensiones. — [Simplify3D](https://www.simplify3d.com/resources/print-quality-troubleshooting/dimensional-accuracy/), capturado 2026-10-17.
- La configuración de la primera capa puede afectar las siguientes 10–20 capas de la pieza. — [Simplify3D](https://www.simplify3d.com/resources/print-quality-troubleshooting/dimensional-accuracy/), capturado 2026-10-17.
- Los valores de steps/mm deben ser exactos según correas, poleas y husillos; no calibrar por ensayo y error. Usar la calculadora de Josef Prusa. — [Slic3r Manual](https://manual.slic3r.org/troubleshooting/dimension-errors), capturado 2026-10-17.
- No hay ningún hack de software que pueda compensar razonablemente una impresora mal ensamblada (backlash): hay que apretar la correa. — [Slic3r Manual](https://manual.slic3r.org/troubleshooting/dimension-errors), capturado 2026-10-17.

**Modelos de calibración de OrcaSlicer:**

- OrcaSlicer incluye modelos handy accesibles con clic derecho en la placa en modo Prepare → "Add Handy Model". — [OrcaSlicer Wiki – tolerance_calib](https://github.com/OrcaSlicer/OrcaSlicer/wiki/tolerance_calib), capturado 2026-10-17.
- **Orca Tolerance Test:** base con seis agujeros hexagonales de tolerancia creciente (0,0 / 0,05 / 0,1 / 0,2 / 0,3 / 0,4 mm) más un probador hexagonal. Se puede comprobar la tolerancia con una llave Allen de 6 mm o con el probador impreso; medir con calibre los agujeros y el probador interior; a partir de los resultados ajustar X-Y hole compensation y X-Y contour compensation; repetir hasta lograr la precisión deseada. — [OrcaSlicer Wiki – tolerance_calib](https://github.com/OrcaSlicer/OrcaSlicer/wiki/tolerance_calib), capturado 2026-10-17.

### Ajustes de precisión del slicer (OrcaSlicer)

- **Slice gap closing radius:** las grietas menores que 2× el radio de cierre de huecos se rellenan durante el slicing; operación que puede reducir la resolución final, por lo que conviene mantener el valor bajo. — [OrcaSlicer Wiki – quality_settings_precision](https://github.com/OrcaSlicer/OrcaSlicer/wiki/quality_settings_precision), capturado 2026-10-17.
- **Resolution:** el camino G-code se genera simplificando el contorno del modelo para evitar demasiados puntos y líneas; valores más pequeños = mayor resolución y más tiempo de slicing. — [OrcaSlicer Wiki – quality_settings_precision](https://github.com/OrcaSlicer/OrcaSlicer/wiki/quality_settings_precision), capturado 2026-10-17.
- **Arc fitting:** sustituye muchos movimientos rectos cortos (segmentos G1) por menos comandos de arco circular (G2/G3); reduce el tamaño del G-code y ayuda a controladores lentos, pero introduce aproximación y depende de que el firmware soporte G2/G3; no es una función para mejorar la calidad de impresión. En Klipper el default es 1,0 mm por segmento (muy burdo). — [OrcaSlicer Wiki – quality_settings_precision](https://github.com/OrcaSlicer/OrcaSlicer/wiki/quality_settings_precision), capturado 2026-10-17.
- **Precise Wall:** aumenta ligeramente la separación entre la pared exterior y la interior al imprimir en orden interior/exterior, poniendo el solape entre ambas en cero; mejora la precisión dimensional y la consistencia de capas sin afectar la resistencia. — [OrcaSlicer Wiki – quality_settings_precision](https://github.com/OrcaSlicer/OrcaSlicer/wiki/quality_settings_precision), capturado 2026-10-17.
  - Contexto técnico: Slic3r y sus forks asumen que el camino de extrusión tiene forma ovalada, lo que explica los solapes (dos paredes de 0,4 mm con capa de 0,2 mm = 0,714 mm combinados en lugar de 0,8 mm). Cura asume camino rectangular sin solape (dos paredes de 0,4 mm = 0,8 mm). — [OrcaSlicer Wiki – quality_settings_precision](https://github.com/OrcaSlicer/OrcaSlicer/wiki/quality_settings_precision), capturado 2026-10-17.
- **Precise Z Height:** asegura la altura Z exacta del modelo tras el slicing, incluso si la altura del modelo no es múltiplo de la altura de capa; ajusta la altura de las últimas 5 capas para que la altura final coincida (ejemplo: cubo de 20,1 mm con capa de 0,2 mm → sin la opción resulta 20,2 mm; con ella, 20,1 mm). — [OrcaSlicer Wiki – quality_settings_precision](https://github.com/OrcaSlicer/OrcaSlicer/wiki/quality_settings_precision), capturado 2026-10-17.
- **Polyholes:** técnica FFF para mejorar la precisión de agujeros circulares; el agujero se representa como un polígono de pocos lados planos, forzando al slicer a tratar cada segmento como línea recta, que se imprime de forma más fiable. Idea y matemáticas de Hydraraptor (nophead); implementación original en SuperSlicer. — [OrcaSlicer Wiki – quality_settings_precision](https://github.com/OrcaSlicer/OrcaSlicer/wiki/quality_settings_precision), capturado 2026-10-17.
  - **Polyhole detection margin:** cuánto pueden desviarse los puntos de un agujero de su círculo estimado para seguir detectándolo como circular; solo agujeros convexos con más de 8 puntos. — [OrcaSlicer Wiki – quality_settings_precision](https://github.com/OrcaSlicer/OrcaSlicer/wiki/quality_settings_precision), capturado 2026-10-17.
  - **Polyhole twist:** rota el polyhole en cada capa para que las esquinas no se alineen verticalmente; cada capa usa una de cinco orientaciones, con un espaciado de un quinto del ángulo entre dos esquinas; la secuencia se repite cada 5 capas. — [OrcaSlicer Wiki – quality_settings_precision](https://github.com/OrcaSlicer/OrcaSlicer/wiki/quality_settings_precision), capturado 2026-10-17.
  - **Maximum Polyhole edge count:** el número de lados se calcula a partir del tamaño del agujero y el diámetro de la boquilla (aproximadamente el doble del diámetro del agujero en mm con boquilla de 0,4 mm, nunca menos de 3); con el default de 50, los agujeros mayores de ~25 mm quedan limitados con boquilla de 0,4 mm. Función nueva: disponible en nightly o releases >2.4.2. — [OrcaSlicer Wiki – quality_settings_precision](https://github.com/OrcaSlicer/OrcaSlicer/wiki/quality_settings_precision), capturado 2026-10-17.

### Poliholes y aproximación poligonal (resumen de causas)

- Slic3r implementó un algoritmo de compensación del lado cóncavo propuesto por Adrian Bowyer, pero muchos usuarios se quejaron de que los agujeros salían demasiado grandes, por lo que fue retirado; los agujeros pequeños son preferibles a los grandes porque se pueden taladrar. — [Slic3r Manual](https://manual.slic3r.org/troubleshooting/dimension-errors), capturado 2026-10-17.

### Soluciones por diseño

- En casi todos los casos, si dos piezas deben encajar, hay que diseñar una más pequeña que la otra. — [All3DP](https://all3dp.com/2/3d-printing-tolerances-test-fdm/), capturado 2026-10-17.
- No se puede esperar que una impresora FDM común acierte una dimensión a 100 micras (0,1 mm) de forma consistente; todas las dimensiones deben diseñarse asumiendo que pueden salir mayores o menores en ese valor. — [All3DP](https://all3dp.com/2/3d-printing-tolerances-test-fdm/), capturado 2026-10-17.
- Diseñar los agujeros un poco más grandes para que quepa la dimensión exacta requerida. — [Foro Prusa, David T.](https://forum.prusa3d.com/forum/original-prusa-i3-mk3s-mk3-improvements-archive/dimensional-accuracy/), capturado 2026-10-17 **[UNA SOLA FUENTE — foro, sin corroborar]**.
- Para piezas con agujeros que deben ser exactos, diseñar los agujeros de forma que se puedan ream/taladrar a la medida exacta. — [Foro Prusa, Carsten](https://forum.prusa3d.com/forum/original-prusa-i3-mk3s-mk3-improvements-archive/dimensional-accuracy/), capturado 2026-10-17 **[UNA SOLA FUENTE — foro, sin corroborar]**.
- Tener en cuenta el encogimiento posterior a la impresión. — [Foro Prusa, Carsten](https://forum.prusa3d.com/forum/original-prusa-i3-mk3s-mk3-improvements-archive/dimensional-accuracy/), capturado 2026-10-17 **[UNA SOLA FUENTE — foro, sin corroborar]**.
- Diseñar los agujeros 0,01" (≈0,25 mm) más grandes. — [Foro Prusa, SPCAS](https://forum.prusa3d.com/forum/original-prusa-i3-mk3s-mk3-improvements-archive/dimensional-accuracy/), capturado 2026-10-17 **[UNA SOLA FUENTE — foro, sin corroborar]**.
- Método de plantilla: imprimir el objeto y detenerlo tras 4 capas; tomar el contorno impreso y colocarlo en el mundo real; se pueden hacer 3 plantillas cortando el objeto sobre la cama en cada eje. — [Foro Prusa, david.b14](https://forum.prusa3d.com/forum/original-prusa-i3-mk3s-mk3-improvements-archive/dimensional-accuracy/), capturado 2026-10-17 **[UNA SOLA FUENTE — foro, sin corroborar]**.
### Soluciones por software (slicer)

- Para imprimir con máxima precisión: usar cinemática más lenta (velocidad, aceleración y jerk), alturas de capa más pequeñas y enfriamiento activo de la pieza. Recomendación: velocidad de impresión < 60 mm/s, aceleración < 3.000 mm/s², jerk < 15 mm/s para la mayoría de impresoras de sobremesa. — [All3DP](https://all3dp.com/2/3d-printing-tolerances-test-fdm/), capturado 2026-10-17.
- **Outer before inner walls:** imprimir las paredes exteriores primero mejora teóricamente la precisión dimensional al no ser empujadas por las paredes internas o el relleno. — [All3DP](https://all3dp.com/2/3d-printing-tolerances-test-fdm/), capturado 2026-10-17.
- **External Perimeters First** (Slic3r): previene el desplazamiento causado por el solape de extrusión; imprimir perímetros internos primero oculta mejor las costuras. — [Slic3r Manual](https://manual.slic3r.org/troubleshooting/dimension-errors), capturado 2026-10-17.
- **Coasting:** el extrusor deja de extruir hacia el final de un movimiento y se apoya en la presión residual de la boquilla para imprimir el resto del filamento. — [All3DP](https://all3dp.com/2/3d-printing-tolerances-test-fdm/), capturado 2026-10-17.
- **Horizontal expansion:** aumenta o disminuye las dimensiones de la pieza en un porcentaje específico; útil solo si toda la pieza sale demasiado pequeña o grande; si las dimensiones generales son aceptables y solo hay que ajustar agujeros, usar "Hole horizontal expansion". — [All3DP](https://all3dp.com/2/3d-printing-tolerances-test-fdm/), capturado 2026-10-17.
- **Linear advance** (Marlin y otros firmwares): ajusta el flujo del filamento según los movimientos de impresión previstos, anticipando la variación de presión en la boquilla que produce extrusión inconsistente, convirtiendo un ancho de línea irregular en uno más uniforme; efecto similar a coasting pero generalmente más fácil de calibrar. — [All3DP](https://all3dp.com/2/3d-printing-tolerances-test-fdm/), capturado 2026-10-17.
- **Extrusion multiplier:** afecta al caudal de toda la impresión; demasiado bajo → huecos entre perímetros, agujeros en superficies superiores y piezas más pequeñas; demasiado alto → capas superiores que abomban hacia arriba y piezas más grandes. — [Simplify3D](https://www.simplify3d.com/resources/print-quality-troubleshooting/dimensional-accuracy/), capturado 2026-10-17.
- El Extrusion Multiplier también afecta a las superficies sólidas, por lo que no es la solución ideal para ajustar dimensiones. — [Slic3r Manual](https://manual.slic3r.org/troubleshooting/dimension-errors), capturado 2026-10-17.
- **Constant dimensional error:** si la pieza siempre sale 0,1 mm grande, independientemente del tamaño del modelo, usar compensación de tamaño horizontal. — [Simplify3D](https://www.simplify3d.com/resources/print-quality-troubleshooting/dimensional-accuracy/), capturado 2026-10-17.
- **Increasing dimensional error:** si el error crece con el tamaño de la pieza, la causa probable es la contracción térmica; determinar el porcentaje de contracción (error / tamaño) y escalar el modelo (ejemplo: 0,1 mm en 20 mm = 0,5 % → escalar a 100,5 %). — [Simplify3D](https://www.simplify3d.com/resources/print-quality-troubleshooting/dimensional-accuracy/), capturado 2026-10-17.
- Si la cama está demasiado caliente puede causar problemas de precisión dimensional (elephant foot); si el extrusor está demasiado caliente para un filamento dado, puede causar stringing y blobs que también desplazan las holguras. — [All3DP](https://all3dp.com/2/3d-printing-tolerances-test-fdm/), capturado 2026-10-17.

### Soluciones por máquina

- La forma más importante de lograr la máxima precisión es calibrar la propia impresora; ninguna impresora de sobremesa viene perfectamente calibrada de fábrica, ni siquiera las pre-ensambladas; requieren calibración adicional con el tiempo como mantenimiento rutinario. — [All3DP](https://all3dp.com/2/3d-printing-tolerances-test-fdm/), capturado 2026-10-17.
- Los elementos más importantes a calibrar son el extrusor y los E-steps; siempre es vital empezar con una buena primera capa. — [All3DP](https://all3dp.com/2/3d-printing-tolerances-test-fdm/), capturado 2026-10-17.
- Seleccionar boquillas y filamento de buena calidad; la precisión dimensional depende de que el filamento extruido tenga el ancho que debería. Los mejores filamentos tienen bajas tolerancias, menos impurezas y almacenamiento adecuado. — [All3DP](https://all3dp.com/2/3d-printing-tolerances-test-fdm/), capturado 2026-10-17.
- Los componentes deteriorados hacen la impresora menos precisa: asegurar que las correas estén tensas y que haya mínimo desgaste en varillas o rodamientos; si no, apretar o sustituir. — [All3DP](https://all3dp.com/2/3d-printing-tolerances-test-fdm/), capturado 2026-10-17.

### Post-procesado

- Incluso tras calibración, diseño y configuración de slicing, las piezas pueden seguir fuera de tolerancia y requerir post-procesado. — [All3DP](https://all3dp.com/2/3d-printing-tolerances-test-fdm/), capturado 2026-10-17.
- El post-procesado suele ser sustractivo, por lo que es más relevante para piezas sobredimensionadas que para infradimensionadas. — [All3DP](https://all3dp.com/2/3d-printing-tolerances-test-fdm/), capturado 2026-10-17.
- Lijar y limar piezas para eliminar elephant foot, restos de soportes y otros artefactos de impresión. — [All3DP](https://all3dp.com/2/3d-printing-tolerances-test-fdm/), capturado 2026-10-17.
- Medir las piezas continuamente durante el post-procesado hasta alcanzar las dimensiones deseadas. — [All3DP](https://all3dp.com/2/3d-printing-tolerances-test-fdm/), capturado 2026-10-17.
- Taladrar o ream cualquier agujero impreso en 3D. — [All3DP](https://all3dp.com/2/3d-printing-tolerances-test-fdm/), capturado 2026-10-17; [Foro Prusa, Carsten](https://forum.prusa3d.com/forum/original-prusa-i3-mk3s-mk3-improvements-archive/dimensional-accuracy/), capturado 2026-10-17 (corroboración).
- Intentar evitar soportes si es posible; es mucho más fácil re-taladrar un agujero que extraer soportes pequeños con alicates. — [All3DP](https://all3dp.com/2/3d-printing-tolerances-test-fdm/), capturado 2026-10-17.
- Ciertos requisitos de GD&T (geometric dimensioning and tolerancing) no se pueden lograr fácilmente a nivel DIY; por ejemplo, corregir el runout de un eje impreso en 3D está fuera del alcance de la mayoría de configuraciones. — [All3DP](https://all3dp.com/2/3d-printing-tolerances-test-fdm/), capturado 2026-10-17.

### Dimensiones verticales (eje Z)

- Si las dimensiones verticales son incorrectas (a lo largo de Z) y el objeto suele salir más corto de lo esperado, significa que la boquilla está demasiado baja y la primera capa se prensa demasiado contra la cama. Para corregirlo: subir el endstop Z o aumentar la opción Z offset en Slic3r. — [Slic3r Manual](https://manual.slic3r.org/troubleshooting/dimension-errors), capturado 2026-10-17.
- **Precise Z Height** (OrcaSlicer) corrige la altura Z final cuando la altura del modelo no es múltiplo de la altura de capa (ver arriba). — [OrcaSlicer Wiki – quality_settings_precision](https://github.com/OrcaSlicer/OrcaSlicer/wiki/quality_settings_precision), capturado 2026-10-17.

### Flujo y matemática de extrusión

- La matemática de flujo usada en Slic3r desempeña un buen papel en hacer dimensiones correctas, ya que intenta adivinar la forma del material extruido y el grosor de la extrusión en el plano horizontal; al ser una aproximación, lleva error. — [Slic3r Manual](https://manual.slic3r.org/troubleshooting/dimension-errors), capturado 2026-10-17.
- La forma habitual de lidiar con estos problemas es ajustar el Extrusion Multiplier para aumentar/reducir la cantidad de plástico, haciendo las extrusiones más gruesas o más finas; pero esto también afecta a las superficies sólidas. — [Slic3r Manual](https://manual.slic3r.org/troubleshooting/dimension-errors), capturado 2026-10-17.
- Imprimir perímetros externos primero evita el desplazamiento causado por el solape de extrusión; imprimir perímetros internos primero oculta mejor las costuras. — [Slic3r Manual](https://manual.slic3r.org/troubleshooting/dimension-errors), capturado 2026-10-17.

## Contradicciones

### Compensación separada (hole/contour) vs. unificada

- Bambu Studio y OrcaSlicer ofrecen dos parámetros independientes: uno que solo afecta a agujeros y otro que solo afecta al contorno exterior. — [Bambu Lab Wiki](https://wiki.bambulab.com/en/software/bambu-studio/parameter/xy-compensation), capturado 2026-10-17; [OrcaSlicer Wiki](https://github.com/OrcaSlicer/OrcaSlicer/wiki/quality_settings_precision), capturado 2026-10-17.
- Según un usuario del foro de Prusa, el XY Size Compensation de PrusaSlicer impacta todo el modelo, no solo los agujeros. — [Foro Prusa, ed brakus](https://forum.prusa3d.com/forum/original-prusa-i3-mk3s-mk3-improvements-archive/dimensional-accuracy/), capturado 2026-10-17.

**Se contradicen en el alcance del parámetro, pero el matiz es de slicer, no de valor.** Bambu Studio y OrcaSlicer separan la compensación de agujeros de la de contorno; PrusaSlicer (según el usuario) tiene un único parámetro que afecta a todo. **El redactor debe explicar que la separación de parámetros es una ventaja de Bambu/Orca, no una contradicción de valores, y marcar el dato de PrusaSlicer como procedente de foro.**

### Signo de la compensación: convención opuesta

- Slic3r: para agujeros 0,1 mm pequeños se introduce −0,05 (negativo = encoger hacia dentro, se compensa la mitad del error porque actúa en cada lado). — [Slic3r Manual](https://manual.slic3r.org/troubleshooting/dimension-errors), capturado 2026-10-17.
- OrcaSlicer y Bambu Studio: valores positivos hacen agujeros más grandes, negativos más pequeños. — [OrcaSlicer Wiki](https://github.com/OrcaSlicer/OrcaSlicer/wiki/quality_settings_precision), capturado 2026-10-17; [Bambu Lab Wiki](https://wiki.bambulab.com/en/software/bambu-studio/parameter/xy-compensation), capturado 2026-10-17.

**No se contradicen en el efecto, solo en la convención del signo.** En Slic3r el signo se refiere a la dirección de encogimiento del contorno (negativo = achicar el modelo); en Orca/Bambu el signo se refiere al cambio del agujero (positivo = agujero mayor). **El redactor no debe presentar un único "valor de compensación" sin decir qué slicer y qué convención de signo.**

### Modelo de flujo: ovalado vs. rectangular

- Slic3r y sus forks (PrusaSlicer, SuperSlicer, OrcaSlicer) asumen que el camino de extrusión tiene forma ovalada, lo que explica los solapes (dos paredes de 0,4 mm con capa de 0,2 mm = 0,714 mm combinados). — [OrcaSlicer Wiki](https://github.com/OrcaSlicer/OrcaSlicer/wiki/quality_settings_precision), capturado 2026-10-17.
- Cura asume que el camino de extrusión es rectangular y no incluye solape (dos paredes de 0,4 mm = 0,8 mm). — [OrcaSlicer Wiki](https://github.com/OrcaSlicer/OrcaSlicer/wiki/quality_settings_precision), capturado 2026-10-17.

**No es una contradicción entre fuentes, pero explica por qué los agujeros salen pequeños en Slic3r/Orca y no en Cura:** el modelo ovalado con solape hace que el material ocupe más espacio en el lado interior de las curvas, reduciendo el radio interno. **El redactor debe conectar esto con la causa "más material en el lado cóncavo" del Slic3r Manual.**

### Algoritmo de Adrian Bowyer: implementado y retirado

- Slic3r implementó un algoritmo de compensación para el lado cóncavo de las curvas (propuesto por Adrian Bowyer), pero muchos usuarios se quejaron de que los agujeros salían demasiado grandes, por lo que fue retirado. — [Slic3r Manual](https://manual.slic3r.org/troubleshooting/dimension-errors), capturado 2026-10-17.

**Antecedente histórico relevante, no contradicción entre fuentes:** la compensación automática del lado cóncavo existe pero fue retirada porque los agujeros grandes son peor que los agujeros pequeños (que se pueden taladrar). **El redactor debe mencionar que la compensación manual es preferible a la automática porque permite elegir el punto exacto.**

### Magnitud del error típico: foro vs. publicaciones

- Un usuario del foro de Prusa reporta un cubo de 1" con agujeros de 0,5", 0,375" y 0,25" todos impresos ~0,1" (≈2,5 mm) más pequeños que el modelo, con Z ligeramente mayor de 1,0" y X/Y ligeramente menores. — [Foro Prusa, SPCAS](https://forum.prusa3d.com/forum/original-prusa-i3-mk3s-mk3-improvements-archive/dimensional-accuracy/), capturado 2026-10-17.
- Las publicaciones técnicas (All3DP, Simplify3D) sitúan el error típico de FDM en torno a 0,1 mm (100 micras) de forma consistente, y los ajustes de compensación se expresan en décimas de milímetro. — [All3DP](https://all3dp.com/2/3d-printing-tolerances-test-fdm/), capturado 2026-10-17; [Simplify3D](https://www.simplify3d.com/resources/print-quality-troubleshooting/dimensional-accuracy/), capturado 2026-10-17.

**Se contradicen en la magnitud reportada.** El dato del foro (2,5 mm de error) es dos órdenes de magnitud mayor que el error típico documentado y puede deberse a error de medición, a confusión de unidades (pulgadas vs. milímetros) o a un problema mecánico grave (correas muy flojas, steps/mm mal configurados). **El redactor debe marcar este dato como sin corroborar y no usarlo como referencia de error típico.**

### "No se puede acertar 0,1 mm" vs. compensación software

- All3DP: no se puede esperar que una impresora FDM común acierte una dimensión a 100 micras (0,1 mm) de forma consistente; diseñar asumiendo desviación de ±0,1 mm. — [All3DP](https://all3dp.com/2/3d-printing-tolerances-test-fdm/), capturado 2026-10-17.
- Los slicers ofrecen compensación XY (hole/contour), Precise Wall, Precise Z Height y polyholes que corrigen errores de ese orden. — [OrcaSlicer Wiki](https://github.com/OrcaSlicer/OrcaSlicer/wiki/quality_settings_precision), capturado 2026-10-17; [Slic3r Manual](https://manual.slic3r.org/troubleshooting/dimension-errors), capturado 2026-10-17.

**No se contradicen, pero el matiz es importante.** La regla de los 100 micras es una regla de diseño (no asumir precisión que la máquina no garantiza); la compensación software es una corrección posterior que reduce el error pero no lo elimina. **El redactor debe presentar la compensación como reducción del error, no como garantía de precisión.**

### Valores de encaje: All3DP vs. foro Prusa

- All3DP: para nozzle de 0,4 mm, clearance fit con diferencia de 0,5 mm o más (gap teórico ≥0,25 mm), interference fit con diferencia de 0,1 mm o menos, transition fit con diferencia de 0,15–0,4 mm. — [All3DP](https://all3dp.com/2/3d-printing-tolerances-test-fdm/), capturado 2026-10-17.
- Foro Prusa: diseñar los agujeros 0,01" (≈0,25 mm) más grandes. — [Foro Prusa, SPCAS](https://forum.prusa3d.com/forum/original-prusa-i3-mk3s-mk3-improvements-archive/dimensional-accuracy/), capturado 2026-10-17.

**No se contradicen en la dirección (ambos agrandan el agujero), pero difieren en escala y contexto.** All3DP da reglas generales por tipo de encaje para nozzle de 0,4 mm; el foro da un valor concreto para un caso particular. **El redactor debe presentar All3DP como regla de pulgar y el foro como dato anecdótico sin corroborar.**

## Sin respaldo

Todas las siguientes afirmaciones provienen de una única fuente secundaria (foro de Prusa, 2017, MK2/MK3), sin corroboración independiente. Se registran para que el redactor decida si las usa marcadas o las omite. El acuerdo entre varios usuarios dentro del mismo hilo no convierte sus respuestas en fuentes independientes.

- Cubo de 1" con agujeros de 0,5", 0,375" y 0,25", todos impresos ~0,1" (≈2,5 mm) más pequeños que el modelo; Z ligeramente mayor de 1,0" y X/Y ligeramente menores. **[UNA SOLA FUENTE — foro, sin corroborar]** — [Foro Prusa, SPCAS](https://forum.prusa3d.com/forum/original-prusa-i3-mk3s-mk3-improvements-archive/dimensional-accuracy/), capturado 2026-10-17.
- Diseñar los agujeros 0,01" (≈0,25 mm) más grandes. **[UNA SOLA FUENTE — foro, sin corroborar]** — íd.
- Los agujeros internos salen 0,2–0,3 mm más pequeños tras calibrar la impresora y el material. **[UNA SOLA FUENTE — foro, sin corroborar]** — [Foro Prusa, Sebastian](https://forum.prusa3d.com/forum/original-prusa-i3-mk3s-mk3-improvements-archive/dimensional-accuracy/), capturado 2026-10-17.
- Un agujero de 10 mm nominales mide 9,7 mm reales, con mayor desviación cuanto más pequeño es el agujero. **[UNA SOLA FUENTE — foro, sin corroborar]** — [Foro Prusa, VH](https://forum.prusa3d.com/forum/original-prusa-i3-mk3s-mk3-improvements-archive/dimensional-accuracy/), capturado 2026-10-17.
- Un tornillo roscado de 5,72 mm encaja en un agujero impreso de 6 mm (PLA). **[UNA SOLA FUENTE — foro, sin corroborar]** — [Foro Prusa, george](https://forum.prusa3d.com/forum/original-prusa-i3-mk3s-mk3-improvements-archive/dimensional-accuracy/), capturado 2026-10-17.
- SuperSlicer tiene un parámetro `hole_size_compensation` que funciona bien. **[UNA SOLA FUENTE — foro, sin corroborar]** — [Foro Prusa, Sebastian](https://forum.prusa3d.com/forum/original-prusa-i3-mk3s-mk3-improvements-archive/dimensional-accuracy/), capturado 2026-10-17.
- El XY Size Compensation de PrusaSlicer impacta todo el modelo, no solo los agujeros. **[UNA SOLA FUENTE — foro, sin corroborar]** — [Foro Prusa, ed brakus](https://forum.prusa3d.com/forum/original-prusa-i3-mk3s-mk3-improvements-archive/dimensional-accuracy/), capturado 2026-10-17.
- No hay un truco único para compensar agujeros; depende de la geometría, las tolerancias de la impresora y las propiedades del material. **[UNA SOLA FUENTE — foro, sin corroborar]** — [Foro Prusa, FoxRun3D](https://forum.prusa3d.com/forum/original-prusa-i3-mk3s-mk3-improvements-archive/dimensional-accuracy/), capturado 2026-10-17.
- Diseñar con tolerancias de impresora penaliza a quien comparte o imprime el modelo en otra máquina; la compensación debe ser decisión del usuario/imprimidor, no del modelo. **[UNA SOLA FUENTE — foro, sin corroborar]** — [Foro Prusa, Golf League Tracker](https://forum.prusa3d.com/forum/original-prusa-i3-mk3s-mk3-improvements-archive/dimensional-accuracy/), capturado 2026-10-17.
- Según la orientación de impresión, un agujero circular siempre sale elíptico. **[UNA SOLA FUENTE — foro, sin corroborar]** — [Foro Prusa, gigiga](https://forum.prusa3d.com/forum/original-prusa-i3-mk3s-mk3-improvements-archive/dimensional-accuracy/), capturado 2026-10-17.
- Es mejor diseñar los agujeros para impresión 3D desde el principio. **[UNA SOLA FUENTE — foro, sin corroborar]** — [Foro Prusa, Robin](https://forum.prusa3d.com/forum/original-prusa-i3-mk3s-mk3-improvements-archive/dimensional-accuracy/), capturado 2026-10-17.
- La contracción del filamento es diferente según el material y cómo se aplica. **[UNA SOLA FUENTE — foro, sin corroborar]** — [Foro Prusa, Swiss_Cheese](https://forum.prusa3d.com/forum/original-prusa-i3-mk3s-mk3-improvements-archive/dimensional-accuracy/), capturado 2026-10-17.
- Para piezas con agujeros que deben ser exactos, diseñar los agujeros de forma que se puedan ream/taladrar a la medida exacta. **[UNA SOLA FUENTE — foro, sin corroborar]** — [Foro Prusa, Carsten](https://forum.prusa3d.com/forum/original-prusa-i3-mk3s-mk3-improvements-archive/dimensional-accuracy/), capturado 2026-10-17.
- Tener en cuenta el encogimiento posterior a la impresión. **[UNA SOLA FUENTE — foro, sin corroborar]** — [Foro Prusa, Carsten](https://forum.prusa3d.com/forum/original-prusa-i3-mk3s-mk3-improvements-archive/dimensional-accuracy/), capturado 2026-10-17.
- Diseñar los agujeros un poco más grandes para que quepa la dimensión exacta requerida. **[UNA SOLA FUENTE — foro, sin corroborar]** — [Foro Prusa, David T.](https://forum.prusa3d.com/forum/original-prusa-i3-mk3s-mk3-improvements-archive/dimensional-accuracy/), capturado 2026-10-17.
- Método de plantilla: imprimir el objeto y detenerlo tras 4 capas para verificar el contorno en cada eje. **[UNA SOLA FUENTE — foro, sin corroborar]** — [Foro Prusa, david.b14](https://forum.prusa3d.com/forum/original-prusa-i3-mk3s-mk3-improvements-archive/dimensional-accuracy/), capturado 2026-10-17.
- Holes come out a bit smaller almost every time (with FDM process); con el tiempo se aprende a diseñar todos los agujeros un poco más grandes. — [Foro Prusa, David T.](https://forum.prusa3d.com/forum/original-prusa-i3-mk3s-mk3-improvements-archive/dimensional-accuracy/), capturado 2026-10-17 **[UNA SOLA FUENTE — foro, sin corroborar]**.
- Getting holes and dimensions in FDM correct is like making a technical drawing with a 2 inch brush; no se ha encontrado mejor solución que conocer la impresora y construir alrededor de sus limitaciones. — [Foro Prusa, Carsten](https://forum.prusa3d.com/forum/original-prusa-i3-mk3s-mk3-improvements-archive/dimensional-accuracy/), capturado 2026-10-17 **[UNA SOLA FUENTE — foro, sin corroborar]**.

## Tirado

- **Navegación y menús:** índices, migas de pan, botones («submit support ticket», «share», «suscríbete»), enlaces de navegación del wiki de GitHub. Sin contenido técnico.
- **Anuncios y banners:** ninguno en estas fuentes.
- **Piezas de producto:** ninguna (no hay enlaces de compra ni precios).
- **Cuestionarios y surveys:** ninguno.
- **Texto de navegación de wiki:** «Related wiki links» sin el contenido enlazado (OrcaSlicer wiki).
- **Notas del recolector:** se han omitido del cuerpo cocinado pero se han usado para verificar la autoría y el tipo de cada fuente.
- **Imágenes y diagramas:** referencias a imágenes en los textos originales (capturas de Bambu Studio, diagramas de polyholes, Z-wobble, sección irregular de filamento, First Layer Impact de Simplify3D) no se han incluido porque no son afirmaciones textuales; una imagen no es una fuente ni respalda afirmaciones.
- **Repetidos:** la explicación de que el plástico se contrae al enfriar aparece en Slic3r, Bambu Lab y Simplify3D; se ha mantenido una versión combinada en Afirmaciones con las demás citadas como corroboración. La causa "agujeros más pequeños en FDM" se repite en Slic3r y en el foro de Prusa; se han mantenido las afirmaciones distintas y las redundantes se han consolidado.
- **Contenido de elephant foot:** la compensación de elephant foot (fórmula, Z-offset, temperatura de cama) ya está cocinada en `wiki/cooked/elephant-foot.md`; aquí solo se menciona su relación con las tolerancias, sin duplicar la fórmula ni los valores.
- **Contenido de agujeros ovalados:** la compensación XY y las causas de agujeros pequeños ya están cocinadas en `wiki/cooked/agujeros-ovalados.md`; aquí se amplía con tipos de encaje, soluciones por diseño/software/máquina/post-procesado y pruebas de tolerancia, evitando duplicar literalmente las afirmaciones ya existentes donde es posible.
- **Chaflán de 0,5–5 mm a 45° en los bordes de la base** (fix de diseño para elephant foot): procede de la fuente Creality, que no está en el conjunto de fuentes de este tema; se omite aquí y está cocinado en `wiki/cooked/elephant-foot.md`.

## Relaciones

| Concepto | Se relaciona con | Cómo |
|---|---|---|
| tolerancias y encaje | contracción del filamento | la contracción al enfriar reduce dimensiones, especialmente en materiales de alta temperatura como ABS |
| tolerancias y encaje | orientación de impresión | los agujeros horizontales son más precisos; los verticales requieren teardrop |
| tipos de encaje | diseño paramétrico | clearance/interference/transition definen la diferencia de diámetro entre eje y agujero |
| compensación XY | calibración por filamento | la compensación es específica para cada combinación filamento/impresora |
| compensación XY | caminos cerrados | XY Hole Compensation solo aplica a caminos cerrados; aberturas laterales producen caminos abiertos |
| poliholes | aproximación poligonal | los polyholes reducen el error de aproximación de curvas por polígonos al forzar segmentos rectos |
| Precise Wall | modelo de flujo del slicer | pone a cero el solape entre paredes exterior e interior, mejorando precisión sin perder resistencia |
| Precise Z Height | altura de capa | corrige la altura final cuando el modelo no es múltiplo de la altura de capa |
| backlash | errores distintos en X e Y | el backlash produce errores dimensionales diferentes en cada eje; se corrige apretando correas, no con software |
| steps/mm | calibración de máquina | deben ser exactos según correas, poleas y husillos; no calibrar por ensayo y error |
| post-procesado | piezas sobredimensionadas | el post-procesado es sustractivo, más relevante para piezas grandes que para pequeñas |
| tolerancias | elephant foot | la primera capa sobredimensionada por aplastamiento afecta las dimensiones de la base |
| tolerancias | primera capa | la primera capa afecta las siguientes 10–20 capas; medir solo las 20 superiores de una pieza de 50–100 capas |
| error creciente | contracción térmica | el error que aumenta con el tamaño de la pieza es atribuible a la contracción térmica |
| modelo de flujo | agujeros pequeños | el modelo ovalado con solape (Slic3r/Orca) deposita más material en el lado cóncavo, reduciendo el radio interno |
