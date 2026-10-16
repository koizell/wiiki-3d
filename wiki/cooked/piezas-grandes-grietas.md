---
titulo: Piezas grandes y grietas
tema: piezas-grandes-grietas
fuentes:
  - wiki/raw/piezas-grandes-grietas-bambu-wiki-chamber-temperature.md
  - wiki/raw/piezas-grandes-grietas-prusa-kb-layer-separation-and-splitting-fdm.md
  - wiki/raw/piezas-grandes-grietas-bambu-wiki-printed-model-warping.md
  - wiki/raw/piezas-grandes-grietas-creality-blog-warping.md
  - wiki/raw/piezas-grandes-grietas-prusa-kb-warping.md
  - wiki/raw/piezas-grandes-grietas-bambu-wiki-warping-falling-off-collapsing.md
  - wiki/raw/piezas-grandes-grietas-bambu-wiki-interlayer-cracking.md
  - wiki/raw/piezas-grandes-grietas-orcaslicer-wiki-material-temperatures.md
cocinado: 2026-10-16
---

# Piezas grandes y grietas

## Afirmaciones

### Qué es el warping y qué lo provoca

- El warping es **contracción térmica**: los bordes exteriores de la pieza se enfrían y contraen antes que el centro, y esa diferencia genera una tensión que **levanta las esquinas o los bordes**. — [Bambu Lab, warping-falling-off-collapsing](https://wiki.bambulab.com/en/filament-acc/filament/print-quality/warping-falling-off-collapsing)
- El warping aparece como un **arco hacia arriba desde la cama**: las esquinas se curvan, a veces con un efecto "piel de plátano". — [Creality, 3D Print Warping](https://www.creality.com/blog/3d-print-warping)
- Es un **choque térmico** entre la temperatura de fusión de la boquilla y la temperatura ambiente: al enfriar rápido, el plástico se contrae y se deforma. — [Prusa Research, Warping](https://help.prusa3d.com/article/warping_2011)
- Una **corriente de aire** enfría un lado más que otro; basta una ventana abierta, un aire acondicionado o un ventilador de mesa. Por eso se recomienda bloquear el flujo de aire alrededor de la impresora y **cerrar la puerta frontal y la cubierta superior en impresoras cerradas**. — [Bambu Lab, warping-falling-off-collapsing](https://wiki.bambulab.com/en/filament-acc/filament/print-quality/warping-falling-off-collapsing), [Prusa Research, Warping](https://help.prusa3d.com/article/warping_2011)
- El warping es más común en **materiales de alta temperatura** (PC, ASA, ABS), porque requieren un ambiente más caliente para enfriar despacio. — [Prusa Research, Warping](https://help.prusa3d.com/article/warping_2011), [Bambu Lab, printed-model-warping](https://wiki.bambulab.com/en/knowledge-sharing/printed-model-warping)

### Tamaño de la pieza, relleno y grietas

- El warping es **más común con piezas grandes y con densidad de relleno alta**; el ejemplo que da Bambu es un 60 % de relleno frente al 15 % por defecto. — [Bambu Lab, warping-falling-off-collapsing](https://wiki.bambulab.com/en/filament-acc/filament/print-quality/warping-falling-off-collapsing), [Bambu Lab, printed-model-warping](https://wiki.bambulab.com/en/knowledge-sharing/printed-model-warping)
- Un modelo grande y plano impreso en **ABS, ASA o PC warpea casi siempre sin enclosure**. Si no hay enclosure disponible, la recomendación es cambiar a **PLA, PLA-CF, PETG o PETG-CF** para piezas grandes. — [Bambu Lab, warping-falling-off-collapsing](https://wiki.bambulab.com/en/filament-acc/filament/print-quality/warping-falling-off-collapsing)
- **Riesgo de warping entre los filamentos que la propia fuente llama "propensos a contraerse"**, de mayor a menor: **PC → PA-CF → PA → ABS → ASA → PETG → PLA**. Es un ranking entre esos siete, no una comparación con todos los materiales rígidos, y no mide la frecuencia de las causas del warping en PLA. — [Bambu Lab, warping-falling-off-collapsing](https://wiki.bambulab.com/en/filament-acc/filament/print-quality/warping-falling-off-collapsing)
- El **estrés de warping severo puede producir grietas o fracturas visibles**, sobre todo en materiales frágiles. — [Creality, 3D Print Warping](https://www.creality.com/blog/3d-print-warping)
- **Por debajo de 20 °C de ambiente**, el warping aparece **incluso con PLA y PETG**, que son los materiales más indulgentes. — [Bambu Lab, printed-model-warping](https://wiki.bambulab.com/en/knowledge-sharing/printed-model-warping), [Bambu Lab, warping-falling-off-collapsing](https://wiki.bambulab.com/en/filament-acc/filament/print-quality/warping-falling-off-collapsing)
- Si la impresora es de estructura abierta y el ambiente es frío, se recomienda **aumentar la temperatura de cama en +10 °C** para compensar. — [Bambu Lab, printed-model-warping](https://wiki.bambulab.com/en/knowledge-sharing/printed-model-warping), [Bambu Lab, warping-falling-off-collapsing](https://wiki.bambulab.com/en/filament-acc/filament/print-quality/warping-falling-off-collapsing)
- Prevenir warping: **ambiente estable entre 20 y 25 °C con humedad baja**. — [Creality, 3D Print Warping](https://www.creality.com/blog/3d-print-warping) **[UNA SOLA FUENTE — fabricante, sin corroborar]**
- Temperatura de reblandecimiento: la mayoría de los PLA ronda los **45 °C**, y el PETG los **70 °C**. Cuando la cama llega a esa cifra, el calor acumulado en la cámara ablanda el filamento. — [Bambu Lab, chamber temperature](https://wiki.bambulab.com/en/software/bambu-studio/chamber-temperature)

### Distinción: warping vs separación entre capas

- **Warping real:** las esquinas o bordes se arquean hacia arriba y se despegan de la cama; la pieza se curva ("como una cáscara de plátano"). — [Creality, 3D Print Warping](https://www.creality.com/blog/3d-print-warping), [Bambu Lab, warping-falling-off-collapsing](https://wiki.bambulab.com/en/filament-acc/filament/print-quality/warping-falling-off-collapsing)
- **Separación entre capas (delaminación):** el objeto se raja por capas. Se identifica por **cortes limpios que muestran una ligera curvatura hacia arriba o warping** (la señal que separa una grieta de una capa que falta por sub-extrusión). — [Prusa Research, Layer separation and splitting FDM](https://help.prusa3d.com/article/layer-separation-and-splitting-fdm_1806)
- Mecanismo (Prusa): la separación entre capas ocurre **cuando las fuerzas de warping superan la resistencia de adhesión entre capas**, al enfriarse las capas a ritmos distintos. Es decir, **el cracking es consecuencia del warping**, no un fenómeno aparte. — [Prusa Research, Layer separation and splitting FDM](https://help.prusa3d.com/article/layer-separation-and-splitting-fdm_1806)
- **Interlayer cracking (Bambu):** cuando la adhesión entre capas es insuficiente y la contracción del material es significativa, **aparecen grietas a lo largo del eje Z** (perpendiculares al plano de la capa). Frecuente en ABS, ASA, PC, PET-CF y PA-CF. Un atasco leve de boquilla puede impedir la extrusión en una capa concreta y **manifestarse igual que una grieta**. — [Bambu Lab, Interlayer Cracking](https://wiki.bambulab.com/en/filament-acc/filament/print-quality/interlayer-cracking)
- **Los cuatro fallos que se confunden y que hay que distinguir** (Bambu los separa como tipos distintos):
  - *Corner warping*: esquinas/bordes que se curvan y se despegan.
  - *Bed adhesion failure*: la pieza entera se desplaza o salta de la cama a mitad de impresión (causa: grasa en la placa, tipo de chapa equivocado, Z-offset alto).
  - *Structural collapse*: el modelo alto/fino se convierte en "nido de pájaro" o las capas superiores quedan desplazadas (causa mecánica: vibración a alta velocidad, correas flojas, patrones de relleno que se cruzan y levantan un resalto que la boquilla roza).
  - Interlayer cracking: grietas a lo largo del eje Z. — [Bambu Lab, warping-falling-off-collapsing](https://wiki.bambulab.com/en/filament-acc/filament/print-quality/warping-falling-off-collapsing), [Bambu Lab, Interlayer Cracking](https://wiki.bambulab.com/en/filament-acc/filament/print-quality/interlayer-cracking)

### Ambiente: frío, corrientes y enclosure

- **Sub-20 °C:** warping incluso con PLA/PETG (ver arriba); en cabina abierta (p. ej. A1), subir la cama **+10 °C** para compensar. — [Bambu Lab, printed-model-warping](https://wiki.bambulab.com/en/knowledge-sharing/printed-model-warping)
- Los materiales de alta temperatura necesitan **enclosure** para mantener un ambiente caliente y estable; imprimir PLA o PETG en enclosure puede ser una mala idea porque necesitan mucha refrigeración de pieza, más difícil de conseguir con ambiente caliente. — [Prusa Research, Warping](https://help.prusa3d.com/article/warping_2011)
- **ABS**: es muy susceptible a la separación de capas con cualquier aire frío antes de que la pieza haya enfriado del todo; **ventilador apagado por completo** y **cámara cerrada (incluso calentada)**. — [Prusa Research, Layer separation and splitting FDM](https://help.prusa3d.com/article/layer-separation-and-splitting-fdm_1806)
- Para piezas grandes de ABS: PETG es mejor opción (no tiende a crack/deslaminar); ASA es alternativa pero más dependiente del entorno que PETG. — [Prusa Research, Layer separation and splitting FDM](https://help.prusa3d.com/article/layer-separation-and-splitting-fdm_1806)
- Cuando la **temperatura de cama es igual o mayor que la temperatura de reblandecimiento del filamento**, Bambu Lab recomienda **abrir la puerta frontal y/o quitar la cubierta superior**: el calor de la cámara ablanda el filamento. Con ambiente alto la cámara sube más y eso lo hace **más necesario**; con ambiente bajo, menos. — [Bambu Lab, chamber temperature](https://wiki.bambulab.com/en/software/bambu-studio/chamber-temperature)

### Infill Gyroid frente a patrones con líneas rectas

- Si la pieza es grande y el relleno alto (p. ej. 60 %, con 15 % por defecto) y aparece warping, **ajustar adecuadamente**; además, **el patrón con más líneas rectas tiende más a encoger**; se puede cambiar el patrón a **Gyroid** para reducir el riesgo de contracción. — [Bambu Lab, printed-model-warping](https://wiki.bambulab.com/en/knowledge-sharing/printed-model-warping)
- Para piezas planas grandes: **cambiar el patrón de relleno a Gyroid con ≤25 % de densidad**; Grid y Triangle crean tensión lineal interna, y Gyroid se contrae de forma más uniforme en todas las direcciones. — [Bambu Lab, warping-falling-off-collapsing](https://wiki.bambulab.com/en/filament-acc/filament/print-quality/warping-falling-off-collapsing)
- Grid y Triangle se **cruzan dentro de una misma capa** y levantan un resalto que la boquilla roza en la siguiente pasada (problema mecánico, no de contracción). — [Bambu Lab, warping-falling-off-collapsing](https://wiki.bambulab.com/en/filament-acc/filament/print-quality/warping-falling-off-collapsing)

### Paredes vs relleno: piezas estructurales y no estructurales

- Para piezas **estructurales** con altos requisitos de resistencia: **5 capas de pared y alrededor del 25 % de relleno**, intentando evitar más del 50 % para reducir la tendencia de contracción. — [Bambu Lab, printed-model-warping](https://wiki.bambulab.com/en/knowledge-sharing/printed-model-warping)
- Para piezas **no estructurales** con bajos requisitos de resistencia: **2 capas de pared y 15 % de relleno** (valores por defecto). — [Bambu Lab, printed-model-warping](https://wiki.bambulab.com/en/knowledge-sharing/printed-model-warping)
- Ventilador auxiliar: si provoca warping, **bajarlo alrededor del 20–30 %**; se aplica sobre todo a objetos pequeños o zonas de mucho voladizo, porque enfría las paredes exteriores demasiado rápido. — [Bambu Lab, warping-falling-off-collapsing](https://wiki.bambulab.com/en/filament-acc/filament/print-quality/warping-falling-off-collapsing)
- En Bambu hay **dos cifras distintas para el ventilador auxiliar**: por un lado "bajarlo a alrededor del 40–50 %", y por otro "reducirlo alrededor del 20–30 %". Son dos páginas del mismo fabricante y **no dicen lo mismo**; el corpus no resuelve cuál aplicar. — [Bambu Lab, printed-model-warping](https://wiki.bambulab.com/en/knowledge-sharing/printed-model-warping), [Bambu Lab, warping-falling-off-collapsing](https://wiki.bambulab.com/en/filament-acc/filament/print-quality/warping-falling-off-collapsing)

### Flujo y velocidad: el otro lado del warping

- Imprimir **demasiado rápido** puede causar warping: peor unión entre capas y enfriamiento más rápido. — [Creality, 3D Print Warping](https://www.creality.com/blog/3d-print-warping) **[UNA SOLA FUENTE — fabricante, sin corroborar]**
- Para **materiales de alta temperatura** (PC-Blend), bajar la velocidad de impresión ayuda a que el conjunto asiente, funda las capas entre sí y deforme menos. — [Prusa Research, Warping](https://help.prusa3d.com/article/warping_2011)
- Cuando el colapso es mecánico (modelo alto/fino), Bambu recomienda **reducir velocidad y aceleración un 20–30 %**, habilitar soportes y comprobar la tensión de las correas. — [Bambu Lab, warping-falling-off-collapsing](https://wiki.bambulab.com/en/filament-acc/filament/print-quality/warping-falling-off-collapsing)
- **Interlayer cracking en ABS:** aumentar la temperatura de boquilla o bajar la velocidad (ejemplo: pared interior a **150 mm/s** y exterior a **100 mm/s**), reducir el ventilador de pieza (referencia: ventilador máximo del 60 % en paredes) y subir cama 5–10 °C y cámara 5 °C si hay calefacción activa. — [Bambu Lab, Interlayer Cracking](https://wiki.bambulab.com/en/filament-acc/filament/print-quality/interlayer-cracking)
- PLA con temperatura de boquilla insuficiente puede sufrir cracking y separación de capas; según la marca se imprime entre **195 y 220 °C**; si hay problemas, **subir en incrementos de 5 °C** hasta obtener buena adhesión de capa. — [Prusa Research, Layer separation and splitting FDM](https://help.prusa3d.com/article/layer-separation-and-splitting-fdm_1806)
- **Flow rate / extrusion multiplier:** aumentar el multiplicador de extrusión **en incrementos del 5 %** crea un vínculo más fuerte entre capas; en PrusaSlicer sólo es accesible en modo Advanced o Expert. — [Prusa Research, Layer separation and splitting FDM](https://help.prusa3d.com/article/layer-separation-and-splitting-fdm_1806)
- Primera capa: reducir la velocidad a **40–50 mm/s** (Creality) y el valor ideal recomendado para buena adhesión es **20–30 mm/s**. — [Creality, 3D Print Warping](https://www.creality.com/blog/3d-print-warping) **[UNA SOLA FUENTE — fabricante, sin corroborar]**

### Temperatura de cama: el aumento de 5–10 °C cuando ya hay warping

- Subir la cama **+5 a +10 °C** para mejorar la adhesión cuando las esquinas se levantan; **para ABS/ASA, +10 a +15 °C** y cerrar puertas/tapa (cámara ≥40 °C). — [Bambu Lab, warping-falling-off-collapsing](https://wiki.bambulab.com/en/filament-acc/filament/print-quality/warping-falling-off-collapsing)
- En general: aumentar la temperatura de cama **5–10 °C** para mejorar la adhesión; márgenes típicos por material: **PLA alrededor de 50–60 °C, ABS 90–110 °C, PETG 70 °C, Nylon 100–110 °C**. — [Creality, 3D Print Warping](https://www.creality.com/blog/3d-print-warping) **[UNA SOLA FUENTE — fabricante, sin corroborar para las cifras de ABS/Nylon]**
- OBJETIVO de troubleshooting de Bambu en Textured PEI: **55–65 °C** la cama para PLA que levanta esquinas; y **35 °C** si se laminó para Cool Plate. — [Bambu Lab, warping-falling-off-collapsing](https://wiki.bambulab.com/en/filament-acc/filament/print-quality/warping-falling-off-collapsing)
- La elevación de la boquilla **0,04 mm automáticamente al nivelar en Textured PEI**: laminar para la chapa equivocada desactiva ese offset y deja la primera capa demasiado alta. — [Bambu Lab, printed-model-warping](https://wiki.bambulab.com/en/knowledge-sharing/printed-model-warping), [Bambu Lab, warping-falling-off-collapsing](https://wiki.bambulab.com/en/filament-acc/filament/print-quality/warping-falling-off-collapsing)

### ABS: temperatura de cama y de cámara

- Rangos oficiales de OrcaSlicer: **ABS 90–100 °C de cama y 50–70 °C de cámara**; ASA 90–100 / 50–70; PC 100–120 / 80–100; PA6/PA12 90–110 / 70–100. — [OrcaSlicer, Material Temperatures](https://github.com/OrcaSlicer/OrcaSlicer/wiki/material_temperatures)
- **Cámara recomendada por Bambu**: PLA, PETG, TPU y PVA a **0 °C (desactivar)**; **ABS y ASA a 40–50 °C**; PC, PA-CF y afines a **50–60 °C**. — [Bambu Lab, chamber temperature](https://wiki.bambulab.com/en/software/bambu-studio/chamber-temperature)
- **ADVERTENCIA oficial de Bambu**: no habilitar temperatura de cámara alta para filamentos de baja temperatura (PLA, PETG, TPU, PVA, etc.): puede ablandar el filamento y atascar el extrusor. — [Bambu Lab, chamber temperature](https://wiki.bambulab.com/en/software/bambu-studio/chamber-temperature)
- X1E: cámara máxima de **60 °C**; en filamentos de alta temperatura (PC, PA-CF, PAHT-CF, PET-CF, PPA-CF, PPS, PPS-CF) seleccionar **60 °C** mejora precisión dimensional, calidad visual, suprime el warping y da mayor adhesión entre capas. — [Bambu Lab, chamber temperature](https://wiki.bambulab.com/en/software/bambu-studio/chamber-temperature)
- Para ABS/ASA/PC/PA, una cámara más caliente **puede suprimir o reducir el warping y aumentar la adhesión entre capas**, pero a la vez **reduce la eficacia del filtrado del aire** (ABS/ASA). — [OrcaSlicer, Material Temperatures](https://github.com/OrcaSlicer/OrcaSlicer/wiki/material_temperatures)
- **Campos oficiales de OrcaSlicer**: PLA 180–220 °C boquilla / 50–60 °C cama / cámara ambiente; ABS 230–250 / 90–100 / 50–70; ASA 240–260 / 90–100 / 50–70; PC 270–310 / 100–120 / 80–100; PA6 230–260 / 90–110 / 70–100. — [OrcaSlicer, Material Temperatures](https://github.com/OrcaSlicer/OrcaSlicer/wiki/material_temperatures)
- **Riesgo de warping por material** (Creality): PLA bajo (cama ideal 60 °C), PETG medio (70 °C), ABS alto (100 °C), Nylon muy alto (100–110 °C). — [Creality, 3D Print Warping](https://www.creality.com/blog/3d-print-warping) **[UNA SOLA FUENTE — fabricante, sin corroborar]**
- **Si la cama está demasiado baja**: fallo de adhesión, warping, unión débil o desprendimiento total. **Si está demasiado alta**: las capas inferiores se sobrecalientan y deforman (elephant foot). Margen típico ±5 °C; regla práctica: usar el Tg del material y restar **5–10 °C** para estimar el límite superior seguro. — [OrcaSlicer, Material Temperatures](https://github.com/OrcaSlicer/OrcaSlicer/wiki/material_temperatures)

### Adhesión a la cama y tipo de chapa

- Seleccionar el **tipo de chapa correcto** según el filamento: laminar para Cool Plate (35 °C para PLA) e imprimir en Textured PEI (55–65 °C para PLA) deja la adhesión demasiado fría; y la Textured PEI **baja la boquilla 0,04 mm automáticamente al nivelar**, desactivando ese offset si el tipo de chapa está mal elegido en el slicer. — [Bambu Lab, warping-falling-off-collapsing](https://wiki.bambulab.com/en/filament-acc/filament/print-quality/warping-falling-off-collapsing)
- **Limpiar la chapa con agua templada y jabón**, enjuagar y secar al aire; no tocar la superficie con las manos desnudas después de limpiar (aceite de la piel = causa principal de fallo de adhesión). — [Bambu Lab, warping-falling-off-collapsing](https://wiki.bambulab.com/en/filament-acc/filament/print-quality/warping-falling-off-collapsing)
- **Brim de 8–10 mm** o **brim ears** dirigidos sólo a las esquinas que se levantan (en Bambu Studio: Brim type = Painted, luego Brim Ears). — [Bambu Lab, warping-falling-off-collapsing](https://wiki.bambulab.com/en/filament-acc/filament/print-quality/warping-falling-off-collapsing)
- **Glue stick / adhesivos** (PVA delgado, hairspray, sprays especializados) como refuerzo para filamentos difíciles (ABS, ASA, PA, PC); en placas de vidrio, una capa fina de PVA. — [Creality, 3D Print Warping](https://www.creality.com/blog/3d-print-warping), [Bambu Lab, warping-falling-off-collapsing](https://wiki.bambulab.com/en/filament-acc/filament/print-quality/warping-falling-off-collapsing)
- **Tier 1 (Bambu)**: tres pasos que resuelven aproximadamente el 80 % de los fallos de warping y adhesión — limpiar la placa, ejecutar el nivelado automático completo (especialmente tras mover la impresora, mantenimiento o firmware) y comprobar que la boquilla esté bien instalada (clips fijados). — [Bambu Lab, warping-falling-off-collapsing](https://wiki.bambulab.com/en/filament-acc/filament/print-quality/warping-falling-off-collapsing)

### Cómo se ve en la práctica

- **Signos de warping**: esquinas/bordes que se despegan (a veces a media impresión), base ondulada/distorsionada, grietas o fracturas por tensión, pieza que salta de la cama, warping asimétrico en un solo lado. — [Creality, 3D Print Warping](https://www.creality.com/blog/3d-print-warping)
- **Post-impresión** (sólo deformaciones leves): lijar la base para aplanar o calentar suavemente con secador, con cuidado de no fundir la pieza. — [Creality, 3D Print Warping](https://www.creality.com/blog/3d-print-warping) **[UNA SOLA FUENTE — fabricante, sin corroborar]**
- **Diferencia warping vs curling**: el warping levanta las esquinas/bordes fuera de la cama por contracción térmica; el curling es la forma más leve, con los bordes doblados hacia arriba sin que la pieza se despegue. — [Creality, 3D Print Warping](https://www.creality.com/blog/3d-print-warping)
- El filamento húmedo **no es warping**: chasquidos/chisporroteo o superficie rugosa y con burbujas apuntan a humedad; la recomendación es secarlo y reintentar. — [Bambu Lab, warping-falling-off-collapsing](https://wiki.bambulab.com/en/filament-acc/filament/print-quality/warping-falling-off-collapsing) **[NO SE MENCIONA LA TEMPERATURA EN NINGUNA DIRECCIÓN]**

## Contradicciones

**No se resuelven aquí.** Se anotan con su matiz, y el redactor tiene que explicar el matiz en el artículo en vez de elegir un número.

### 1. Cuánto subir la cama cuando ya hay warping: +5–10, +10–15 o cama fija

- **Bambu (página de warping):** corners lifting en PLA → **+5 a +10 °C**; **+10 a +15 °C** para ABS/ASA con cierre de puerta/tapa y cámara ≥40 °C. — [Bambu Lab, warping-falling-off-collapsing](https://wiki.bambulab.com/en/filament-acc/filament/print-quality/warping-falling-off-collapsing)
- **Creality (blog):** aumentar la cama **5–10 °C** de forma general cuando hay warping. — [Creality, 3D Print Warping](https://www.creality.com/blog/3d-print-warping)
- **Bambu (interlayer cracking):** aumentar la cama **5–10 °C** (y la cámara +5 °C si hay calefacción activa). — [Bambu Lab, Interlayer Cracking](https://wiki.bambulab.com/en/filament-acc/filament/print-quality/interlayer-cracking)

**Se contradicen.** Las tres pueden ser correctas según la situación: la primera distingue PLA (+5–10) de ABS/ASA (+10–15) y cámara, la segunda es una regla general para cualquier material, la tercera responde a cracking entre capas, no a warping de esquinas. **El redactor tiene que explicar el matiz, no elegir un número.**

### 2. Temperatura de cama para PLA: 35 °C (Cool Plate) vs 50–60 °C (Orca/Creality)

- **Bambu (warping):** **35 °C** para PLA en Cool Plate; **55–65 °C** como objetivo en Textured PEI. — [Bambu Lab, warping-falling-off-collapsing](https://wiki.bambulab.com/en/filament-acc/filament/print-quality/warping-falling-off-collapsing)
- **OrcaSlicer (tabla):** PLA **50–60 °C** de cama (sin condicionarla a la chapa). — [OrcaSlicer, Material Temperatures](https://github.com/OrcaSlicer/OrcaSlicer/wiki/material_temperatures)
- **Creality (tabla/blog):** PLA con riesgo bajo, cama ideal **60 °C** (y "en la mayoría de los casos 50–60 °C"). — [Creality, 3D Print Warping](https://www.creality.com/blog/3d-print-warping)

**Se contradicen aparentemente.** El matiz está en la **chapa**: el 35 °C es para la Cool Plate y el 55–65 °C para la Textured PEI; el 50–60/60 °C son intervalos sin condicionar a ninguna chapa. **El redactor tiene que explicar el matiz, no elegir un número.**

### 3. Temperatura de cámara para ABS: 40–50 °C (Bambu) vs 50–70 °C (Orca)

- **Bambu:** ABS y ASA a **40–50 °C** de cámara. — [Bambu Lab, chamber temperature](https://wiki.bambulab.com/en/software/bambu-studio/chamber-temperature)
- **OrcaSlicer:** ABS/ASA a **50–70 °C** de cámara. — [OrcaSlicer, Material Temperatures](https://github.com/OrcaSlicer/OrcaSlicer/wiki/material_temperatures)

**Se contradicen.** Las dos son oficiales y **no se resuelven promediando**. Además, OrcaSlicer añade que cámara más caliente ayuda a suprimir warping y mejorar adhesión entre capas, pero empeora la eficacia del filtrado del aire en ABS/ASA. **El redactor tiene que explicar el matiz, no elegir un número.**

### 4. Ventilador para ABS: apagado total vs 10–20 % para voladizos pronunciados

- **Prusa (layer separation):** para ABS, **ventilador apagado por completo**. — [Prusa Research, Layer separation and splitting FDM](https://help.prusa3d.com/article/layer-separation-and-splitting-fdm_1806)
- **Prusa (warping):** si lo que se curva son **voladizos inclinados o piezas pequeñas**, se puede probar a habilitar el ventilador al **10–20 %** incluso en materiales que no requieren mucha refrigeración (ABS, PC-Blend). — [Prusa Research, Warping](https://help.prusa3d.com/article/warping_2011)

**Se contradicen aparentemente.** El matiz es la **geometría**: la primera habla del caso general de ABS, la segunda de voladizos pronunciados y piezas pequeñas. Además, Prusa avisa de que demasiado ventilador puede deformar toda la pieza y reducir la adhesión entre capas. **El redactor tiene que explicar el matiz, no elegir un número.**

### 5. Interlayer cracking: boquilla (Prusa) vs cama y cámara (Bambu)

- **Prusa (layer separation):** subir la temperatura de boquilla **en incrementos de 5 °C** hasta conseguir adhesión de capa. — [Prusa Research, Layer separation and splitting FDM](https://help.prusa3d.com/article/layer-separation-and-splitting-fdm_1806)
- **Bambu (interlayer cracking):** aumentar la temperatura de la boquilla **o** bajar la velocidad (pared interior 150 mm/s, exterior 100 mm/s en ABS), subir la cama **5–10 °C** y la cámara **+5 °C** si hay calefacción activa. — [Bambu Lab, Interlayer Cracking](https://wiki.bambulab.com/en/filament-acc/filament/print-quality/interlayer-cracking)

**Se contradicen en el enfoque, no en el número.** Las dos son oficiales y apuntan a problemas térmicos de adhesión entre capas; una enfatiza la boquilla y el flujo, la otra la cama, el ventilador y la cámara. **El redactor tiene que explicar el matiz, no elegir una receta.**

### 6. PLA en enclosure: puede ayudar (corrientes frías) vs puede ser mala idea (refrigeración)

- **Prusa (warping):** imprimir PLA o PETG dentro de un enclosure **puede ser mala idea** porque necesitan mucha refrigeración de pieza; con ambiente alto es más difícil enfriar. — [Prusa Research, Warping](https://help.prusa3d.com/article/warping_2011)
- **Bambu (chamber):** filamentos de baja temperatura deben ir a **0 °C de cámara** (desactivar), y por encima de 45 °C de cama con PLA se recomienda **abrir puerta y/o quitar tapa** para que el calor excesivo de la cámara no ablande el filamento. — [Bambu Lab, chamber temperature](https://wiki.bambulab.com/en/software/bambu-studio/chamber-temperature)
- **Bambu (warping-falling):** por debajo de 20 °C hay warping incluso con PLA/PETG; en estructura abierta, **+10 °C de cama** para compensar. — [Bambu Lab, warping-falling-off-collapsing](https://wiki.bambulab.com/en/filament-acc/filament/print-quality/warping-falling-off-collapsing)

**Se contradicen aparentemente.** El matiz es la **temperatura ambiente y la chapa**: el enclosure sirve para cortar corrientes y elevar ligeramente el ambiente; en PLA con cama alta (Textured PEI) y ambiente alto, abrir evita heat creep. **El redactor tiene que explicar el matiz, no elegir un número.**

## Sin respaldo

Una sola fuente secundaria, sin corroboración; o una fuente oficial a la que se le ha pedido más de lo que dice. El redactor puede usarlas **marcadas como lo que son**, no como reglas generales.

- **Humedad/temperatura ambiente estable de 20–25 °C con baja humedad**. **[UNA SOLA FUENTE — fabricante (Creality), sin corroborar]** — [Creality, 3D Print Warping](https://www.creality.com/blog/3d-print-warping)
- **Riesgo de warping por material (PLA bajo 60 °C / PETG medio 70 °C / ABS alto 100 °C / Nylon muy alto 100–110 °C)**. **[UNA SOLA FUENTE — fabricante (Creality), sin corroborar]** — [Creality, 3D Print Warping](https://www.creality.com/blog/3d-print-warping)
- **Imprimir demasiado rápido puede causar warping**. **[UNA SOLA FUENTE — fabricante (Creality), sin corroborar]** — [Creality, 3D Print Warping](https://www.creality.com/blog/3d-print-warping)
- **Primera capa a 40–50 mm/s y valor ideal de adhesión 20–30 mm/s**. **[UNA SOLA FUENTE — fabricante (Creality), sin corroborar]** — [Creality, 3D Print Warping](https://www.creality.com/blog/3d-print-warping)
- **Post-impresión con secador o lijado leve**. **[UNA SOLA FUENTE — fabricante (Creality), sin corroborar]** — [Creality, 3D Print Warping](https://www.creality.com/blog/3d-print-warping)
- **Temperaturas de cama de Creality (PLA 50–60 / ABS 90–110 / PETG 70 / Nylon 100–110)**. **[UNA SOLA FUENTE — fabricante (Creality), sin corroborar]**; OrcaSlicer da PLA 50–60, ABS 90–100, ASA 90–100, PC 100–120, PA 90–110. — [Creality, 3D Print Warping](https://www.creality.com/blog/3d-print-warping), [OrcaSlicer, Material Temperatures](https://github.com/OrcaSlicer/OrcaSlicer/wiki/material_temperatures)
- **Ventilador auxiliar "bajarlo a alrededor del 40–50 %"** (frente al "reducirlo alrededor del 20–30 %"). Las dos son oficiales de Bambu pero aparecen en páginas distintas y **el corpus no resuelve cuál**. **[VER CONTRADICCIÓN 4 arriba]** — [Bambu Lab, printed-model-warping](https://wiki.bambulab.com/en/knowledge-sharing/printed-model-warping), [Bambu Lab, warping-falling-off-collapsing](https://wiki.bambulab.com/en/filament-acc/filament/print-quality/warping-falling-off-collapsing)
- **Separación de capas rara en el hardware de la serie MK con presets de PrusaSlicer**, sobre todo con PLA y PETG. Afirmación de una sola fuente oficial, útil como contexto, no como regla. — [Prusa Research, Layer separation and splitting FDM](https://help.prusa3d.com/article/layer-separation-and-splitting-fdm_1806)
- **9 capas/paredes/valores:** los ejemplos de paredes/relleno estructurales (5 paredes y ~25 %) y no estructurales (2 paredes y 15 %) son de **una sola fuente** (Bambu). **[UNA SOLA FUENTE — oficial, sin corroborar por otra fuente]** — [Bambu Lab, printed-model-warping](https://wiki.bambulab.com/en/knowledge-sharing/printed-model-warping)
- **La regla del Tg − (5–10) °C como techo seguro de cama** (OrcaSlicer) no se puede aplicar aquí: **ninguna fuente del lote da el Tg del PLA**. Es una regla, no una cifra. — [OrcaSlicer, Material Temperatures](https://github.com/OrcaSlicer/OrcaSlicer/wiki/material_temperatures)
- **Que un patrón con "más líneas rectas" tiende más a encoger** (Bambu) se da sin explicar el mecanismo ni comparar con datos. **[UNA SOLA FUENTE — oficial, sin corroborar]** — [Bambu Lab, printed-model-warping](https://wiki.bambulab.com/en/knowledge-sharing/printed-model-warping)

## Tirado

Qué se ha eliminado y por qué. El redactor no usa nada de esto.

- **Navegación, menús, migas de pan, "compartir", "suscríbete".** Presentes en todas las páginas wiki/blog; descartadas por defecto.
- **Anuncios y banners.** Descartados por defecto.
- **Piezas de producto: tiendas, precios y enlaces de compra.** No presentes en estas fuentes.
- **Cuestionarios y surveys.** No presentes.
- **Texto de navegación de wiki ("Related wiki links") sin el contenido enlazado.** En Bambu, "Model Warping, Falling Off, or Collapsing" se menciona como enlace relacionado sin contenido; descartado.
- **Boilerplate de soporte** ("submit a technical ticket", "Bambu AI", "End Notes") en las páginas de Bambu. Descartado como no técnico.
- **Imágenes** ([IMAGE]) sin texto alternativo extra. No aportan afirmación verificable.
- **Repetidos consolidados**: varias páginas (Bambu warping, Creality, Prusa) repiten el mismo mecanismo de contracción térmica y corrientes de aire; se ha dejado una sola formulación con varias fuentes, y las demás se citan como corroboración.
- **Tablas de materiales parcialmente duplicadas**: las de OrcaSlicer y Creality solapan en PLA/ABS/PETG; se han cruzado como corroboración o se han movido a "Sin respaldo" cuando sólo una las da.
- **Procedimiento de desatasco del extrusor** (H2D, H2C, H2S, serie A, X1/P1) en Bambu Interlayer Cracking: enlaces internos sin descargar; se conserva sólo la afirmación relevante (un atasco leve puede imitar una grieta).
- **Pasos de mantenimiento preventivo y comprobación de correas** del artículo de Bambu: útiles pero mecánicos, y encajan mejor con el artículo de colapso; aquí se mantienen sólo los ligados a warping/grietas (nivelación, boquilla, limpieza de placa).
- **Recomendación de hacer pruebas de calibración (torre de temperatura, test de adhesión)** de Creality: no es un dato técnico verificable; descartada como relleno.

## Relaciones

| Concepto | Se relaciona con | Cómo |
|---|---|---|
| warping en piezas grandes | tamaño de la pieza | es más común en piezas grandes y con relleno denso; la contracción térmica levanta esquinas |
| warping en piezas grandes | densidad de relleno | rellenos altos (60 % vs 15 % por defecto) aumentan la contracción; Gyroid a ≤25 % reduce el riesgo |
| warping en piezas grandes | patrón de relleno | Grid/Triangle crean tensión lineal interna; Gyroid se contrae de forma más uniforme |
| warping en piezas grandes | paredes vs relleno | piezas estructurales: 5 paredes y ~25 %; no estructurales: 2 paredes y 15 % |
| warping en piezas grandes | temperatura ambiente | por debajo de 20 °C hay warping incluso con PLA y PETG |
| warping en piezas grandes | corrientes de aire | un lado se enfría antes y levanta la esquina; cerrar puerta/tapa o bloquear flujo |
| warping en piezas grandes | temperatura de cama | +5 a +10 °C (+10–15 en ABS/ASA) cuando las esquinas ya se levantan |
| warping en piezas grandes | adhesión a la cama | sin adhesión suficiente, la contracción levanta la pieza desde el borde |
| warping vs separación entre capas | warping | la separación de capas ocurre cuando las fuerzas de warping superan la adhesión entre capas |
| separación entre capas | boquilla | un atasco leve puede imitar una grieta; por eso se revisa antes de subir temperaturas |
| separación entre capas | temperatura de boquilla | PLA 195–220 °C; subir en incrementos de 5 °C hasta lograr adhesión de capa |
| separación entre capas | flow rate | aumentar el multiplicador de extrusión en incrementos del 5 % mejora el vínculo entre capas |
| flujo/aceleración | warping | imprimir demasiado rápido favorece enfriamiento desigual y mala unión entre capas |
| flujo/aceleración | colapso estructural | reducir velocidad y aceleración 20–30 % y usar soportes en piezas altas y finas |
| temperatura de cama | tipo de chapa | 35 °C (Cool Plate) vs 55–65 °C (Textured PEI) para PLA; el error de chapa falsea la adhesión |
| temperatura de cama | temperatura de reblandecimiento | cuando la cama iguala o supera el Tg del filamento, conviene abrir puerta/tapa |
| temperatura de cámara | tipo de filamento | baja temperatura (PLA/PETG/TPU/PVA): 0 °C (desactivar); ABS/ASA: 40–50 °C; PC/PA: 50–60 °C |
| temperatura de cámara | filtrado del aire | en ABS/ASA, cámara más caliente empeora la eficacia del filtrado |
| ABS | enclosure | ABS warpea casi siempre sin enclosure; PETG es mejor alternativa para piezas grandes |
| curvatura del warping | interlayer cracking | las grietas a lo largo del eje Z aparecen cuando la adhesión entre capas es insuficiente |
| interlayer cracking | densidad de infill | contracción significativa; patrón de líneas rectas y relleno denso aumentan la tensión |
