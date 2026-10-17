---
titulo: Relleno: patrones, densidad y resistencia
tema: relleno-patrones
fuentes:
  - wiki/raw/relleno-patrones-orcaslicer-wiki-strength-settings-patterns.md
  - wiki/raw/relleno-patrones-orcaslicer-wiki-strength-settings-infill.md
  - wiki/raw/relleno-patrones-orcaslicer-wiki-strength-settings-patterns-quick-reference.md
  - wiki/raw/relleno-patrones-ultimaker-infill-density.md
  - wiki/raw/relleno-patrones-simplify3d-weak-infill.md
  - wiki/raw/relleno-patrones-prusa-kb-infill-patterns.md
cocinado: 2026-10-17
---

## Afirmaciones

### Qué es el relleno y la densidad

- El relleno es la estructura interna de la pieza impresa, aporta resistencia y soporte, y se ajusta para equilibrar uso de material, tiempo de impresión y resistencia de la pieza. — [OrcaSlicer, infill]
- La densidad de relleno se expresa como porcentaje, del 0 % (hueco) al 100 % (sólido). — [Ultimaker, density]
- Mayor densidad aumenta: resistencia, uso de material y tiempo de impresión. — [OrcaSlicer, infill]
- La densidad se calcula como porcentaje del volumen total de relleno, no del volumen total de impresión. — [OrcaSlicer, infill]
- No todos los patrones interpretan la densidad de la misma manera, por lo que el uso real de material puede variar. — [OrcaSlicer, infill]
- Para muchos usos, densidades entre 20 % y 40 % ofrecen buena relación resistencia/peso con tiempos y material razonables. — [Ultimaker, density]
- No ignorar el número de paredes: dos perímetros extra suelen aportar más resistencia que subir el relleno de 20 % a 30 %. Las paredes son el camino de carga principal; el relleno es el respaldo. — [Ultimaker, density]
- El porcentaje de solapamiento del relleno con las paredes controla el enlace entre estructura interna y perímetro; la mayoría de usos se benefician de 10 %–25 %, según material y condiciones. — [Ultimaker, density]
- Superficies bajas pueden mostrar imperfecciones con densidad baja (falta de soporte interno) y abultamientos con densidad alta (tensiones internas al enfriar). — [Ultimaker, density]

### Densidad por material (matriz Ultimaker)

- PLA: 20–30 % para piezas rígidas. Fácil de imprimir; frágil; se ablanda ≈ 60 °C. — [Ultimaker, density]
- PETG: 25–40 %. Tenaz, ligeramente flexible; resistente al calor ≈ 80 °C. — [Ultimaker, density]
- ABS: 30–50 %. Mayor tolerancia térmica (≈ 95 °C); necesita cámara cerrada para evitar warping. — [Ultimaker, density]
- Nylon (PA-12/PA-6): 35–50 %. Excelente resistencia al impacto; higroscópico, secar antes de imprimir. — [Ultimaker, density]
- PLA/PETG rellenos de fibra de carbono: 15–25 %. Las fibras refuerzan la rigidez, permitiendo bajar la densidad. — [Ultimaker, density]
- Las cifras asumen 2–3 perímetros y un patrón orientado a resistencia (cubic, gyroid, tri-hex). — [Ultimaker, density]

### Anisotropía del patrón: resistencia en X-Y vs Z

- Los patrones se valoran por resistencia en dos direcciones: horizontal (plano X-Y) y vertical (eje Z), porque la adhesión entre capas es el eslabón débil en FDM. — [OrcaSlicer, patterns]
- Rectilinear: resistencia normal-baja en X-Y y baja en Z; baja adhesión vertical. OrcaSlicer recomienda usar Zig Zag en su lugar. — [OrcaSlicer, patterns]
- Aligned Rectilinear: normal-baja en X-Y y normal en Z; buena resistencia horizontal perpendicular a las líneas, muy pobre en la dirección paralela. Recomendado con anclaje de capas para mejorar la resistencia no perpendicular. — [OrcaSlicer, patterns]
- Grid: alta en X-Y y alta en Z. — [OrcaSlicer, patterns]
- Triangles: alta en X-Y, normal en Z; triple solape en las intersecciones. — [OrcaSlicer, patterns]
- Tri-hexagon: alta en X-Y, normal-alta en Z; combina triángulos y hexágonos. — [OrcaSlicer, patterns]
- Cubic: alta en X-Y y alta en Z; distribuye la fuerza en todas las direcciones. — [OrcaSlicer, patterns]
- Honeycomb: alta en X-Y y alta en Z; doble pared en cada hexágono aumenta consumo. — [OrcaSlicer, patterns]
- Gyroid: alta en X-Y y alta en Z; superficie matemática isotrópica con resistencia igual en todas las direcciones. — [OrcaSlicer, patterns]
- TPMS-D: alta en X-Y y alta en Z; isotrópico. — [OrcaSlicer, patterns]
- Concentric: baja en X-Y, normal en Z; alto uso de material. — [OrcaSlicer, patterns]
- Lightning: baja en X-Y y baja en Z. — [OrcaSlicer, patterns]
- Gyroid no se auto-intersecta en una misma capa y tiene buena relación resistencia/peso. — [Prusa, infill]

### Patrones y cuándo usarlos

- Gyroid: resistencia igual en todas las direcciones; no se cruza consigo mismo en una capa; permite rellenar con resina u otro líquido; distribuye la contracción a lo largo de sus líneas curvas, ayudando a reducir warping; más lento de laminar por los puntos de las curvas. — [OrcaSlicer, patterns] [Prusa, infill]
- Gyroid Optimized: tensa la onda del gyroid a lo largo de Z a baja densidad para acortar la columna vertical efectiva y mejorar la resistencia a pandeo por compresión en Z; sin efecto a ~30 % de densidad o más; conserva el consumo de filamento. — [OrcaSlicer, patterns]
- Cubic: rejilla 3D con esquinas hacia abajo; uniforme en todas las direcciones; buena para piezas mecánicas. — [Ultimaker, density] [OrcaSlicer, patterns]
- Adaptive Cubic: más denso cerca de las paredes, más hueco en el centro; ahorra material y tiempo manteniendo resistencia; ideal para piezas grandes. Consumo de material aprox. 1/4 menos que rectilinear. — [OrcaSlicer, patterns] [Prusa, infill]
- Support Cubic: variante de Cubic para soportar capas superiores; resistencia baja; el consumo de material y tiempo más bajos de los rellenos de soporte; no mejora cualidades mecánicas. — [OrcaSlicer, patterns] [Prusa, infill]
- Honeycomb: alta resistencia; consumo de material aprox. 25 % más que otros patrones; tiempo de impresión hasta el doble. — [Prusa, infill] [OrcaSlicer, patterns]
- 3D Honeycomb: cuadrados y octágonos; resistencia normal-alta; cálculo de densidad desconocido; consumo y tiempo ligeramente peores que honeycomb normal. — [OrcaSlicer, patterns] [Prusa, infill]
- Lightning: consumo ultra-bajo y tiempo extra-bajo; resistencia baja; para prototipos rápidos y piezas no estructurales; basado en Cura. — [OrcaSlicer, patterns] [Prusa, infill]
- Tri-hexagon: combina la eficiencia estructural de triángulos con la eficiencia de material de hexágonos; buena resistencia a compresión y tracción. — [Ultimaker, density] [OrcaSlicer, patterns]
- Rectilinear: líneas paralelas alternando dirección por capa; rápido y eficiente en material; adecuado para prototipos y usos no críticos. Es el único recomendado para 100 % de relleno; PrusaSlicer cambia automáticamente a rectilinear al poner 100 %. — [Ultimaker, density] [Prusa, infill]
- Grid: dos conjuntos de líneas perpendiculares en cada capa; fuerte en X-Y y Z; el material se acumula en los cruces, puede generar ruido o fallo de impresión. — [OrcaSlicer, patterns] [Prusa, infill]
- Concentric: sigue los contornos del perímetro; bueno para cilindros/curvas; proporciona flexibilidad controlada; ideal para 100 % de relleno o piezas flexibles; alto uso de material. — [Ultimaker, density] [OrcaSlicer, patterns] [Prusa, infill]
- Hilbert curve: curva que rellena el espacio; estética; tiempo alto; no recomendado para piezas estructurales; útil para rellenar con resina/epoxi. — [OrcaSlicer, patterns] [Prusa, infill]
- Archimedean chords: espiral de arcos concéntricos; permite rellenar con resina; ayuda a la flexibilidad con filamento flexible; ahorra material y tiempo frente a rectilinear. — [OrcaSlicer, patterns] [Prusa, infill]
- Octagram spiral: compartimentos grandes que permiten rellenar con líquido; ayuda a la flexibilidad; sobre todo estético; tiempo algo mayor que Archimedean. — [OrcaSlicer, patterns] [Prusa, infill]
- TPMS-D (Schwarz Diamond): híbrido entre Cross Hatch y Gyroid; isótropo y fuerte en todas las direcciones; más rápido de laminar que Gyroid pero más lento que Cross Hatch. — [OrcaSlicer, patterns]
- TPMS-FK (Fischer-Koch S): geometría similar a hueso trabecular; normal-alta en X-Y/Z; tiempo extra-alto; mejora distribución de carga y absorción de impacto. — [OrcaSlicer, patterns]
- Cross Hatch: normal-alto en X-Y/Z; patrón lineal con puntos débiles en esquinas internas; más fácil de laminar que Gyroid/TPMS. — [OrcaSlicer, patterns]
- Lateral Honeycomb / Lateral Lattice: para estructuras de baja densidad como alas; resistencia normal-baja; rigidez torsional aceptable. — [OrcaSlicer, patterns]
- Monotonic (superficie): rectilinear con planificación de trayectoria izquierda-a-derecha monotónica; textura uniforme sin crestas; usa Ant Colony System. — [Prusa, infill] [OrcaSlicer, patterns]
- Monotonic line: como Monotonic pero evita solaparse con el perímetro, reduciendo material sobrante en las uniones; puede introducir costuras visibles y aumentar el tiempo. — [Prusa, infill] [OrcaSlicer, patterns]
- Zigzag: como rectilinear pero con línea continua en zigzag sin levantar el cabezal; más rápido, menos retracción; resistencia normal-baja en X-Y y baja en Z. — [Prusa, infill] [OrcaSlicer, patterns]
- Aligned rectilinear: las últimas capas de todas las superficies superiores se alinean en la misma dirección; útil para modelos con capas superiores a distintas alturas. — [Prusa, infill]

### Rectilinear vs Grid (Prusa)

- Rectilinear crea una rejilla imprimiendo una capa en una dirección y la siguiente rotada 90°; ahorra filamento y no acumula material en los cruces (a diferencia de Grid). — [Prusa, infill]
- Rectilinear tiene el doble de soporte para capas superiores usando la misma cantidad de material que Grid. — [Prusa, infill]
- Grid se imprime en ambas direcciones en cada capa; acumula material donde se cruzan; más sólido y mejor adhesión entre capas, pero ruido o fallo por golpear los cruces. — [Prusa, infill]

### Multiline (Fill Multiline)

- Fill Multiline permite generar el patrón seleccionado con hasta 10 líneas de extrusión paralelas por trayectoria, preservando la densidad definida y el uso total de material. — [OrcaSlicer, infill]
- Enfoque de OrcaSlicer: mantiene la sección constante para la densidad fijada; otros laminadores simplemente multiplican líneas y material, generando un relleno más denso de lo esperado. — [OrcaSlicer, infill]
- Multiline puede mejorar la resistencia y la velocidad de impresión sin aumentar el uso de material. — [OrcaSlicer, infill]
- Casos de uso: espesor mínimo 1,5–3 mm para aplicaciones retardantes de llama; patrones estéticos con varios anchos de línea; mayor estabilidad en patrones débiles como Lightning; engranajes y mecanismos (mejor transmisión de par). — [OrcaSlicer, infill]
- Classic Strategy (multiline): para rellenos que se auto-intersectan, genera bucles cerrados para evitar solapes; puede aumentar el tiempo. — [OrcaSlicer, infill]
- Non-Crossing Strategy (multiline): Grid, Triangles, Tri-hexagon, Cubic, Adaptive Cubic, Support Cubic y 3D Honeycomb generan trayectorias trapezoidales sin auto-intersección; rotan por capa para resistencia isótropa; mejoran tiempos evitando bucles. — [OrcaSlicer, infill]

### Relleno adaptativo (TPMS / Gyroid)

- Gyroid, TPMS-D y TPMS-FK pueden graduar la densidad dentro del objeto: celdas finas junto a paredes y superficies superior/inferior, más espaciadas hacia el centro, ahorrando material y tiempo. — [OrcaSlicer, patterns]
- Modos de adaptación: disabled, distance_warp, smooth_blend, stepped_shells, lobes, normal_z, normal_y, normal_x. — [OrcaSlicer, patterns]
- La densidad interior puede ser mayor que la densidad de relleno disperso, para hacer el núcleo más denso que la superficie. — [OrcaSlicer, patterns]
- Gradientes de densidad: linear (cambio constante), quadratic (cerca de la superficie se mantiene, cambia más rápido hacia el centro; más material si la superficie es más densa), exponential (cambia rápido justo bajo la superficie y se estabiliza hacia el centro; menos material si la superficie es más densa). — [OrcaSlicer, patterns]
- Con densidad de relleno disperso al 100 %, el relleno se imprime sólido y las opciones adaptativas se ocultan. — [OrcaSlicer, patterns]

### Velocidad, tiempo de capa y suavizado

- El tiempo de impresión varía significativamente entre patrones por diferencias en la trayectoria y la estrategia de relleno. — [OrcaSlicer, patterns]
- La variabilidad del tiempo de capa son diferencias de tiempo entre capas de un mismo patrón; puede afectar el aspecto exterior por diferencias de enfriamiento y flujo entre capas. Se mide sobre el cubo (capas de misma forma), para que los cambios vengan del patrón y no del modelo. — [OrcaSlicer, patterns]
- OrcaSlicer: Lightning tiene el menor tiempo (extra-bajo) y el menor material (ultra-bajo); Honeycomb el mayor tiempo (extra-alto). — [OrcaSlicer, patterns] [OrcaSlicer, quickref]
- Smooth Factor: redondea las esquinas del relleno disperso con curvas Bézier quínticas; 0 % mantiene esquinas afiladas, 100 % las curvas máximas; reduce vibración, ringing y contracción del plástico en los giros. Solo ciertos patrones. — [OrcaSlicer, infill]
- Relleno débil o hiloso: causas típicas: patrón débil, velocidad de relleno demasiado alta (sub-extrusión), ancho de extrusión insuficiente. Soluciones: cambiar de patrón (Grid, Triangular, Solid Honeycomb son fuertes; Rectilinear y Fast Honeycomb sacrifican resistencia por velocidad), bajar la velocidad (ej. de 3600 mm/min a la mitad), aumentar el ancho de extrusión del relleno (ej. 200 %). — [Simplify3D, weak]

### Cómo elegir por pieza

- La elección del patrón depende del uso: un jarrón decorativo funciona con relleno mínimo; una pieza mecánica bajo tensión repetida requiere densidad y patrón elegidos con cuidado. — [Ultimaker, density]
- Para fuerza estructural: Cubic (rejilla 3D uniforme), Gyroid (igual en todas las direcciones, distribuye tensiones) y Tri-hexagon (combina compresión y tracción). — [Ultimaker, density]
- Para velocidad: Lines/rectilinear (geometría simple, trayectorias largas) y Zigzag (continuo, menos retracción); Lightning para prototipos no funcionales. — [Ultimaker, density]
- Variable infill density: distintas regiones de la misma pieza con distintas densidades, concentrando material donde hay tensión. — [Ultimaker, density]
- Adaptive infill: ajusta la densidad automáticamente según las necesidades geométricas de cada región (paredes finas, voladizos, geometría compleja reciben más). — [Ultimaker, density]
- Checklist previo: boquilla ≥ 0,4 mm (o ajustar ancho de línea), multiplicador de flujo calibrado con cubo de pared única, feature mínimo ≥ 1,2× diámetro de boquilla, nivelación de cama y altura de primera capa verificadas, filamento seco (PETG, ABS, nylon), perfil de ventilador acorde al material, firmware y laminador actualizados. — [Ultimaker, density]
- Extra solid infill: insertar capas sólidas en posiciones específicas para reforzar puntos críticos sin cambiar la densidad dispersa (formatos intervalo `N`, `N#K` o lista explícita de capas). — [OrcaSlicer, infill]

### Cómo se miden las pruebas (metodología OrcaSlicer)

- Los ratings son la media de un cubo de 100 mm, un 3DBenchy y el Stanford bunny, laminados a 5, 15, 30 y 50 % de densidad de relleno disperso sin paredes ni capas superior/inferior, comparados entre sí con el mismo modelo y densidad. Los patrones que solo imprimen relleno sólido se valoran al 100 % contra los demás sólidos. — [OrcaSlicer, patterns] [OrcaSlicer, quickref]
- La resistencia (X-Y y Z) se asigna a mano (infill_patterns.csv); el uso de material, tiempo de impresión y variabilidad de tiempo de capa se miden con infill_analysis.py sobre las estadísticas del laminador. — [OrcaSlicer, quickref]
- Las estimaciones son guía estándar y NO serán iguales para todos los modelos. — [OrcaSlicer, quickref]

### Superficie y relleno interno (OrcaSlicer)

- Patrones de relleno interno sólido disponibles: monotonic, monotonicline, rectilinear, alignedrectilinear, concentric, spiralinset, hilbertcurve, archimedeanchords, octagramspiral. — [OrcaSlicer, infill]
- Infill wall overlap: ampliar ligeramente el área de relleno para solaparse con la pared mejora el enlace; ~10–15 % minimiza sobre-extrusión y acumulación. — [OrcaSlicer, infill]
- Apply gap fill: everywhere / topbottom / nowhere; rellena huecos en superficies sólidas para máxima resistencia o solo superior/inferior. — [OrcaSlicer, infill]
- Anchor: conecta una línea de relleno a un perímetro interno con un segmento corto de perímetro adicional; mejora el enlace relleno-pared. — [OrcaSlicer, infill]

## Contradicciones

### 1. ¿Cuál es el patrón más rápido?

- Ultimaker: Lines/rectilinear suele ser el más rápido por su geometría y trayectorias eficientes; Zigzag ofrece equilibrio entre velocidad y resistencia. — [Ultimaker, density]
- OrcaSlicer: Lightning tiene tiempo extra-bajo (el menor de todos); Rectilinear tiene tiempo normal; Line normal-bajo; Zigzag normal. — [OrcaSlicer, patterns] [OrcaSlicer, quickref]

**Se contradicen parcialmente.** Ultimaker habla de los patrones estructurales (rectilinear, zigzag) como los más rápidos; OrcaSlicer mide Lightning como el más rápido de todos, pero con resistencia baja. **El redactor tiene que explicar el matiz: entre patrones estructurales, rectilinear/line son rápidos; si se admite poca resistencia, Lightning es más rápido pero no sirve para piezas funcionales.**

### 2. Gyroid: ¿ahorra material y es rápido o es lento y normal?

- Prusa: Gyroid imprime relativamente rápido, ahorra material, no se auto-intersecta y tiene buena relación resistencia/peso. — [Prusa, infill]
- OrcaSlicer: Gyroid tiene uso de material normal y tiempo de impresión alto (nivel 6); además es más lento de laminar por los puntos de las curvas. — [OrcaSlicer, patterns] [OrcaSlicer, quickref]

**Se contradicen.** Prusa describe Gyroid como relativamente rápido y ahorrador; OrcaSlicer lo valora con tiempo alto y material normal. **El redactor tiene que explicar el matiz: las descripciones son cualitativas y los ratings dependen del laminador, del modelo y de la densidad; además OrcaSlicer advierte que sus estimaciones son guía y no se reproducen en todos los modelos. No elegir un número.**

### 3. Honeycomb: ¿cuánto más material usa?

- Prusa: Honeycomb consume aprox. 25 % más de material que otros patrones y el tiempo puede ser el doble. — [Prusa, infill]
- OrcaSlicer: Honeycomb tiene uso de material normal-alto (nivel 5) y tiempo extra-alto (nivel 7). — [OrcaSlicer, patterns] [OrcaSlicer, quickref]

**Matiz, no contradicción numérica.** Prusa da un porcentaje concreto (~25 %); OrcaSlicer da un nivel cualitativo. Ambos coinciden en que Honeycomb usa más material y tiempo que la mayoría. **El redactor puede citar el ~25 % de Prusa y el rating de OrcaSlicer como corroboración cualitativa, sin promediar.**

### 4. Adaptive Cubic: ahorro de material

- Prusa: Adaptive Cubic consume aprox. 1/4 menos de material que rectilinear. — [Prusa, infill]
- OrcaSlicer: Adaptive Cubic tiene uso de material bajo (nivel 2) y tiempo bajo (nivel 2). — [OrcaSlicer, patterns] [OrcaSlicer, quickref]

**Matiz.** Prusa cuantifica el ahorro frente a rectilinear (~25 % menos); OrcaSlicer lo valora en su escala propia como "bajo". No se contradicen; son dos escalas. **El redactor puede citar ambos con su atribución.**

### 5. Rectilinear para relleno al 100 %

- Prusa: Rectilinear es el único recomendado para 100 % de relleno; al poner 100 %, PrusaSlicer cambia automáticamente el patrón a rectilinear. — [Prusa, infill]
- OrcaSlicer: Rectilinear se aplica a relleno disperso, relleno sólido interno y superficie; no menciona auto-cambio a 100 %. — [OrcaSlicer, infill]

**Matiz.** Prusa documenta un comportamiento específico de su laminador (auto-cambio); OrcaSlicer no lo menciona. **No es una contradicción de datos, sino de alcance de documentación: el redactor debe atribuir el auto-cambio a PrusaSlicer y no generalizarlo a otros laminadores.**

### 6. Cálculo de densidad del 3D Honeycomb

- OrcaSlicer (patterns): Density Calculation: Unknown. — [OrcaSlicer, patterns]
- OrcaSlicer (quickref): incluye 3D Honeycomb en la tabla con ratings. — [OrcaSlicer, quickref]

**Se contradicen internamente en la misma fuente.** La página de Patterns dice "Unknown" para el cálculo de densidad de 3D Honeycomb, pero la tabla quick reference lo lista con ratings normales. **El redactor debe marcar que el cálculo de densidad de 3D Honeycomb no está documentado por OrcaSlicer y que sus ratings son estimaciones cualitativas.**

## Sin respaldo

- Que Honeycomb consume "aprox. 25 % más" de material: cifra concreta de una sola fuente (Prusa). OrcaSlicer solo da nivel cualitativo. **[UNA SOLA FUENTE — Prusa KB, sin corroborar por OrcaSlicer]**
- Que Adaptive Cubic consume "aprox. 1/4 menos" que rectilinear: cifra concreta de una sola fuente (Prusa). **[UNA SOLA FUENTE — Prusa KB, sin corroborar por OrcaSlicer]**
- Que Gyroid "ayuda a reducir warping" porque la contracción se distribuye a lo largo de sus líneas curvas: afirmación de una sola fuente (OrcaSlicer). **[UNA SOLA FUENTE — OrcaSlicer, sin corroborar]**
- Que Gyroid Optimized "no tiene efecto a ~30 % de densidad o más": valor umbral de una sola fuente (OrcaSlicer). **[UNA SOLA FUENTE — OrcaSlicer, sin corroborar]**
- Que Rectilinear es "el único recomendado para 100 % de relleno" y que PrusaSlicer auto-cambia a rectilinear: comportamiento de una sola fuente (Prusa). **[UNA SOLA FUENTE — Prusa KB, sin corroborar en OrcaSlicer]**
- Que dos perímetros extra aportan más resistencia que subir el relleno de 20 % a 30 %: regla práctica de una sola fuente (Ultimaker), sin datos de ensayo adjuntos. **[UNA SOLA FUENTE — Ultimaker, sin corroborar]**
- La metodología de pruebas (cubo 100 mm, 3DBenchy, Stanford bunny a 5/15/30/50 %) y la asignación manual de ratings de resistencia: documentadas solo por OrcaSlicer. **[UNA SOLA FUENTE — OrcaSlicer, sin corroborar por otra fuente]**
- La tabla de densidades por material (PLA 20–30 %, PETG 25–40 %, etc.): de una sola fuente (Ultimaker), sin ensayos adjuntos. **[UNA SOLA FUENTE — Ultimaker, sin corroborar]**
- Que Grid puede causar ruido o fallo de impresión por acumulación en los cruces: documentado por Prusa y OrcaSlicer (solapamiento). **[CORROBORADO — Prusa y OrcaSlicer]**

## Tirado

- **Navegación, menús, migas de pan, "compartir", "suscríbete".** Estándar en todas las fuentes; omitidos.
- **Anuncios y banners.** No presentes en estas fuentes.
- **Piezas de producto, tiendas, precios, enlaces de compra.** No presentes (Ultimaker menciona UltiMaker S8 en la conclusión; tirado como promoción de producto).
- **Cuestionarios, surveys y texto generado por foros.** No presentes en estas fuentes.
- **Imágenes y SVG de rating.** Las URLs de imágenes (infill-top-*.png, level-to-better-*.svg) son ilustraciones; no se incluyen como afirmaciones. Los niveles de rating se transcriben como texto (alto/normal/bajo).
- **Repeticiones entre fuentes.** Las descripciones de patrones (Gyroid, Cubic, Lightning, Rectilinear, Concentric, Honeycomb, Hilbert, Archimedean, Octagram, Triangles, Grid, Zigzag, Concentric) aparecen en Ultimaker, Prusa y OrcaSlicer con variaciones; se queda una formulación por patrón y las demás se citan como corroboración.
- **OrcaSlicer - Patterns (fichero completo):** se omiten las secciones de variables CLI, modos (Simple/Advanced/Expert) y ejemplos de línea de comandos para patrones específicos (Cross Zag, Locked Zag, Lightning, 3D Honeycomb, Lateral Honeycomb, Lateral Lattice, Adaptive TPMS), porque son detalles de interfaz del laminador, no afirmaciones de resistencia/densidad. Se conservan los ratings y las descripciones funcionales.
- **OrcaSlicer - Infill:** se omiten los parámetros de dirección/rotación, symmetric infill Y axis, separated infills, top-bottom direction, smooth factor (parcialmente conservado), anchor, gap fill y filter out tiny gaps cuando son detalles de interfaz; se conservan los que afectan a resistencia/material (multiline, densidad, solid infill extra, overlap).
- **Prusa KB:** se omiten las imágenes de cada patrón (no reproducidas) y la navegación de la wiki.
- **Simplify3D - Weak Infill:** los enlaces a temas relacionados (Under-Extrusion, Gaps in Top Layers, etc.) son navegación; se omiten. Se conservan las tres soluciones (patrón, velocidad, ancho de extrusión).
- **Ultimaker:** los enlaces internos ("More information on lightning infill", "how to 3D print faster") son navegación; se omiten. El webinar y "3D printing clear plastic parts" son promoción/relacionados.
- **Notas del recolector** de los seis ficheros: metadatos del proceso, no afirmaciones. Tiradas, pero informan el alcance.

## Relaciones

| Concepto | Se relaciona con | Cómo |
|---|---|---|
| relleno (infill) | densidad | 0–100 %; mayor densidad aumenta resistencia, material y tiempo |
| densidad | resistencia | relación no lineal; punto de rendimientos decrecientes variable |
| paredes (shells) | resistencia | dos perímetros extra suelen aportar más que subir relleno 20→30 % |
| patrón | anisotropía | cada patrón tiene resistencia distinta en X-Y y en Z |
| patrón | tiempo de impresión | Lightning el más rápido; Honeycomb el más lento |
| patrón | uso de material | no todos interpretan la densidad igual; Honeycomb ~25 % más |
| Gyroid | isotropía | resistencia igual en todas las direcciones; no se auto-intersecta |
| Gyroid | warping | distribuye la contracción a lo largo de líneas curvas |
| Gyroid | relleno con resina | estructura interconectada permite rellenar con líquido |
| Cubic | resistencia uniforme | rejilla 3D con esquinas hacia abajo |
| Adaptive Cubic | piezas grandes | más denso cerca de paredes, hueco en el centro; ahorra ~1/4 |
| Tri-hexagon | compresión y tracción | combina triángulos y hexágonos |
| Lightning | prototipos | consumo ultra-bajo; resistencia baja; no funcional |
| Honeycomb | resistencia alta | alto consumo y tiempo |
| Concentric | flexibilidad | sigue contornos; ideal para piezas flexibles o 100 % |
| Rectilinear | 100 % relleno | único recomendado para sólido; auto-cambio en PrusaSlicer |
| Multiline | resistencia y velocidad | hasta 10 líneas sin aumentar material |
| relleno débil | velocidad de impresión | velocidad alta causa sub-extrusión; bajar velocidad o subir ancho |
| relleno débil | ancho de extrusión | aumentar a 200 % engrosa las líneas de relleno |
| patrón | elección por pieza | estructural: cubic/gyroid/tri-hex; velocidad: lines/zigzag; prototipo: lightning |
| pruebas (OrcaSlicer) | ratings | media de cubo 100 mm, 3DBenchy y Stanford bunny a 5/15/30/50 % |
| pruebas (OrcaSlicer) | limitación | estimaciones guía, no iguales para todos los modelos |
| adaptive TPMS | densidad graduada | celdas finas en superficie, espaciadas en el centro |
| smooth factor | vibración/ringing | redondea esquinas con Bézier quínticas |