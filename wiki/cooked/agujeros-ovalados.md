---
titulo: Agujeros ovalados y compensación dimensional XY
tema: agujeros-ovalados
fuentes:
  - wiki/raw/agujeros-ovalados-bambulab-xy-compensation.md
  - wiki/raw/agujeros-ovalados-prusa-forum-hole-dimension.md
  - wiki/raw/agujeros-ovalados-prusa-forum-hole-size.md
  - wiki/raw/agujeros-ovalados-orcaslicer-tolerance-calib.md
  - wiki/raw/agujeros-ovalados-slic3r-dimension-errors.md
  - wiki/raw/agujeros-ovalados-orcaslicer-precision.md
  - wiki/raw/agujeros-ovalados-simplify3d-dimensional-accuracy.md
cocinado: 2026-10-16
---

## Afirmaciones

### Causas de agujeros más pequeños

- El plástico se contrae al enfriar; diferentes materiales exhiben diferente contracción, que también depende de la temperatura. — [Slic3r Manual](wiki/raw/agujeros-ovalados-slic3r-dimension-errors.md)
- Al extruir a lo largo de una curva, se deposita más material por unidad de distancia en el lado cóncavo, lo que hace el radio interno más corto. — [Slic3r Manual](wiki/raw/agujeros-ovalados-slic3r-dimension-errors.md)
- El lado interior del anillo tiene menos volumen que el exterior y se pega a la huella previa, así que el diámetro interior sale menor. — [Foro Prusa, VH](wiki/raw/agujeros-ovalados-prusa-forum-hole-dimension.md)
- El plástico tiende a redondear las esquinas, reduciendo aún más el área interna del agujero. — [Slic3r Manual](wiki/raw/agujeros-ovalados-slic3r-dimension-errors.md)
- Z wobble por problemas mecánicos reduce el tamaño del agujero a la envolvente interna de las capas apiladas. — [Slic3r Manual](wiki/raw/agujeros-ovalados-slic3r-dimension-errors.md)
- La sección irregular del filamento (diámetro no constante) produce flujo irregular y el agujero resultante es la envolvente interna de todas las capas. — [Slic3r Manual](wiki/raw/agujeros-ovalados-slic3r-dimension-errors.md)
- Backlash (holgura mecánica, generalmente correas flojas) produce errores dimensionales distintos en X e Y. En impresoras con cama móvil, el eje Y es más propenso por la inercia. — [Slic3r Manual](wiki/raw/agujeros-ovalados-slic3r-dimension-errors.md)
- La contracción del material puede hacer los agujeros más pequeños. — [Bambu Lab Wiki](wiki/raw/agujeros-ovalados-bambulab-xy-compensation.md)
- El pie de elefante por exceso de aplastamiento en la primera capa afecta las dimensiones. — [Bambu Lab Wiki](wiki/raw/agujeros-ovalados-bambulab-xy-compensation.md)
- Filamento húmedo causa extrusión inconsistente. — [Bambu Lab Wiki](wiki/raw/agujeros-ovalados-bambulab-xy-compensation.md)
- Agujeros con diámetro cercano al tamaño de la boquilla (menores de 1 mm) son difíciles de ajustar. — [Bambu Lab Wiki](wiki/raw/agujeros-ovalados-bambulab-xy-compensation.md)
- La costura (seam) puede afectar la precisión del agujero. — [Bambu Lab Wiki](wiki/raw/agujeros-ovalados-bambulab-xy-compensation.md)
- Falta de chaflanes o lead-in en los agujeros dificulta el encaje. — [Bambu Lab Wiki](wiki/raw/agujeros-ovalados-bambulab-xy-compensation.md)

### Contracción del filamento (shrinkage)

- Cada combinación de filamento e impresora puede resultar en tolerancias diferentes; incluso con el mismo filamento y perfil, las tolerancias varían de una impresora a otra. — [OrcaSlicer Wiki](wiki/raw/agujeros-ovalados-orcaslicer-tolerance-calib.md)
- OrcaSlicer separa la compensación de filamento (Shrinkage XY y Z) de la compensación de proceso (X-Y hole/contour compensation). — [OrcaSlicer Wiki](wiki/raw/agujeros-ovalados-orcaslicer-tolerance-calib.md)
- El error dimensional que aumenta con el tamaño de la pieza es atribuible a la contracción térmica; el porcentaje de contracción = error / tamaño. Ejemplo: 0.1 mm en 20 mm = 0.5 %. — [Simplify3D](wiki/raw/agujeros-ovalados-simplify3d-dimensional-accuracy.md)
- La contracción térmica es un problema común en materiales de alta temperatura como ABS. — [Simplify3D](wiki/raw/agujeros-ovalados-simplify3d-dimensional-accuracy.md)
- La contracción del filamento es diferente según el material y cómo se aplica. — [Foro Prusa, Swiss_Cheese](wiki/raw/agujeros-ovalados-prusa-forum-hole-dimension.md)

### Compensación XY en el slicer

- **XY Hole Compensation** (Bambu Studio): ajusta el tamaño de agujeros (áreas cerradas, huecas) en cada capa; solo afecta agujeros, no cambia el tamaño exterior del modelo. — [Bambu Lab Wiki](wiki/raw/agujeros-ovalados-bambulab-xy-compensation.md)
- **XY Contour Compensation** (Bambu Studio): ajusta el contorno exterior del modelo; aumenta o disminuye el tamaño XY manteniendo los agujeros sin cambios. — [Bambu Lab Wiki](wiki/raw/agujeros-ovalados-bambulab-xy-compensation.md)
- La compensación del agujero se aplica por radio: el diámetro del agujero aumentará el doble del valor de compensación. — [Bambu Lab Wiki](wiki/raw/agujeros-ovalados-bambulab-xy-compensation.md)
- Fórmula de calibración de contour en Bambu: (55 − valor medido) / 2. — [Bambu Lab Wiki](wiki/raw/agujeros-ovalados-bambulab-xy-compensation.md)
- **X-Y hole compensation** (OrcaSlicer): los agujeros se expanden o contraen en el plano XY por el valor configurado; valores positivos hacen agujeros más grandes, negativos más pequeños. — [OrcaSlicer Wiki](wiki/raw/agujeros-ovalados-orcaslicer-precision.md)
- **X-Y contour compensation** (OrcaSlicer): los contornos se expanden o contraen en el plano XY; positivos = más grandes, negativos = más pequeños. — [OrcaSlicer Wiki](wiki/raw/agujeros-ovalados-orcaslicer-precision.md)
- **XY Size Compensation** (Slic3r): si los agujeros salen 0.1 mm pequeños, se introduce -0.05 (signo negativo = encoger hacia dentro); se compensa la mitad del error porque actúa en cada lado. — [Slic3r Manual](wiki/raw/agujeros-ovalados-slic3r-dimension-errors.md)
- **Horizontal Size Compensation** (Simplify3D): -0.1 mm encoge el modelo 0.1 mm en X e Y; funciona mejor cuando el error dimensional es constante, incluso imprimiendo modelos de diferentes tamaños. — [Simplify3D](wiki/raw/agujeros-ovalados-simplify3d-dimensional-accuracy.md)
- SuperSlicer tiene un parámetro específico de compensación de agujeros (`hole_size_compensation`). — [Foro Prusa, Sebastian](wiki/raw/agujeros-ovalados-prusa-forum-hole-dimension.md) **[UNA SOLA FUENTE — foro, sin corroborar]**
- El XY size compensation de PrusaSlicer impacta todo el modelo, no solo los agujeros. — [Foro Prusa, ed brakus](wiki/raw/agujeros-ovalados-prusa-forum-hole-size.md) **[UNA SOLA FUENTE — foro, sin corroborar]**

### Calibración y tolerancias

- La calibración de compensación es específica para cada filamento; debe repetirse cuando se cambia de material. — [Bambu Lab Wiki](wiki/raw/agujeros-ovalados-bambulab-xy-compensation.md)
- Un tornillo M6 nominal tiene un diámetro real de ~5.9 mm por la norma ISO 6g (la rosca es ligeramente menor para facilitar el ensamblaje). — [Bambu Lab Wiki](wiki/raw/agujeros-ovalados-bambulab-xy-compensation.md)
- El modelo "Orca Tolerance Test" tiene 6 agujeros hexagonales con tolerancias de 0.0, 0.05, 0.1, 0.2, 0.3 y 0.4 mm, además de un probador hexagonal. — [OrcaSlicer Wiki](wiki/raw/agujeros-ovalados-orcaslicer-tolerance-calib.md)
- No hay un truco único para compensar agujeros; depende de la geometría, las tolerancias de la impresora y las propiedades del material. — [Foro Prusa, FoxRun3D](wiki/raw/agujeros-ovalados-prusa-forum-hole-size.md) **[UNA SOLA FUENTE — foro, sin corroborar]**
- Diseñar el modelo con tolerancias de impresora penaliza a quien lo comparte o lo imprime en otra máquina; la compensación debe ser una decisión del usuario/imprimidor, no del modelo. — [Foro Prusa, Golf League Tracker](wiki/raw/agujeros-ovalados-prusa-forum-hole-size.md) **[UNA SOLA FUENTE — foro, sin corroborar]**

### Poliholes

- Un polyhole representa el agujero como un polígono con un número reducido de lados planos, lo que fuerza al slicer a tratar cada segmento como una línea recta que se imprime de forma más fiable. — [OrcaSlicer Wiki](wiki/raw/agujeros-ovalados-orcaslicer-precision.md)
- La técnica polyhole fue implementada originalmente en SuperSlicer; la idea y las matemáticas son de Hydraraptor (nophead). — [OrcaSlicer Wiki](wiki/raw/agujeros-ovalados-orcaslicer-precision.md)
- OpenSCAD tiene la función `polyhole()` desarrollada por nophead que calcula el número óptimo de segmentos. — [Slic3r Manual](wiki/raw/agujeros-ovalados-slic3r-dimension-errors.md)
- Aumentar el número de segmentos en el CAD antes de exportar el STL reduce el error de aproximación poligonal. — [Slic3r Manual](wiki/raw/agujeros-ovalados-slic3r-dimension-errors.md)
- **Polyhole detection margin**: cuánto pueden desviarse los puntos de un agujero de su círculo estimado para seguir detectándolo como circular; solo se consideran agujeros convexos con más de 8 puntos. — [OrcaSlicer Wiki](wiki/raw/agujeros-ovalados-orcaslicer-precision.md)
- **Polyhole twist**: rota el polyhole en cada capa para que las esquinas no se alineen verticalmente; cada capa usa una de cinco orientaciones, con un espaciado de un quinto del ángulo entre dos esquinas. — [OrcaSlicer Wiki](wiki/raw/agujeros-ovalados-orcaslicer-precision.md)
- **Maximum Polyhole edge count**: el número de lados se calcula a partir del tamaño del agujero y el diámetro de la boquilla (aproximadamente el doble del diámetro del agujero en mm con boquilla de 0.4 mm, nunca menos de 3). — [OrcaSlicer Wiki](wiki/raw/agujeros-ovalados-orcaslicer-precision.md)

### Sobre/subextrusión y flujo

- Extrusion multiplier demasiado bajo → huecos entre perímetros, agujeros en superficies superiores y piezas más pequeñas de lo previsto. — [Simplify3D](wiki/raw/agujeros-ovalados-simplify3d-dimensional-accuracy.md)
- Extrusion multiplier demasiado alto → capas superiores que tienden a abombarse hacia arriba y piezas más grandes de lo previsto. — [Simplify3D](wiki/raw/agujeros-ovalados-simplify3d-dimensional-accuracy.md)
- El Extrusion Multiplier también afecta a las superficies sólidas, por lo que no es la solución ideal para ajustar dimensiones. — [Slic3r Manual](wiki/raw/agujeros-ovalados-slic3r-dimension-errors.md)
- **External Perimeters First** previene el desplazamiento causado por el solape de extrusión; imprimir perímetros internos primero oculta mejor las costuras. — [Slic3r Manual](wiki/raw/agujeros-ovalados-slic3r-dimension-errors.md)
- **Precise Wall** (OrcaSlicer): establece el solape entre la pared exterior y su pared interior adyacente en cero, mejorando la precisión dimensional sin afectar la resistencia. — [OrcaSlicer Wiki](wiki/raw/agujeros-ovalados-orcaslicer-precision.md)
- Slic3r y sus forks (PrusaSlicer, SuperSlicer, OrcaSlicer) asumen que el camino de extrusión tiene forma ovalada, lo que explica los solapes; dos paredes de 0.4 mm con altura de capa de 0.2 mm producen un espesor combinado de 0.714 mm en lugar de 0.8 mm. — [OrcaSlicer Wiki](wiki/raw/agujeros-ovalados-orcaslicer-precision.md)
- Cura asume que el camino de extrusión es rectangular y no incluye solape; dos paredes de 0.4 mm producen un espesor de 0.8 mm. — [OrcaSlicer Wiki](wiki/raw/agujeros-ovalados-orcaslicer-precision.md)

### Orientación

- Según la orientación de impresión, un agujero circular siempre sale elíptico. — [Foro Prusa, gigiga](wiki/raw/agujeros-ovalados-prusa-forum-hole-dimension.md) **[UNA SOLA FUENTE — foro, sin corroborar]**
- El problema de los agujeros no es simple; es mejor diseñar los agujeros para impresión 3D desde el principio. — [Foro Prusa, Robin](wiki/raw/agujeros-ovalados-prusa-forum-hole-dimension.md) **[UNA SOLA FUENTE — foro, sin corroborar]**

### Limitaciones técnicas

- **X-Y Hole Compensation solo aplica a caminos cerrados**: si el modelo tiene aberturas en los lados que producen caminos no cerrados en una capa, la compensación no se aplica a esas capas. — [Bambu Lab Wiki](wiki/raw/agujeros-ovalados-bambulab-xy-compensation.md)
- Si se aplica X-Y Hole Compensation a un modelo con caminos no cerrados, se produce una separación de capa notable en las ubicaciones de los agujeros. — [Bambu Lab Wiki](wiki/raw/agujeros-ovalados-bambulab-xy-compensation.md)
- Solo X-Y Contour Compensation puede aplicarse a capas con caminos no cerrados. — [Bambu Lab Wiki](wiki/raw/agujeros-ovalados-bambulab-xy-compensation.md)
- No hay ningún hack de software que pueda compensar razonablemente una impresora mal ensamblada (backlash). — [Slic3r Manual](wiki/raw/agujeros-ovalados-slic3r-dimension-errors.md)
- Los valores de steps/mm deben ser exactos según correas, poleas y husillos; no calibrar por ensayo y error. — [Slic3r Manual](wiki/raw/agujeros-ovalados-slic3r-dimension-errors.md)

### Medición y primera capa

- La configuración de la primera capa puede afectar las siguientes 10-20 capas de la pieza. — [Simplify3D](wiki/raw/agujeros-ovalados-simplify3d-dimensional-accuracy.md)
- Para minimizar el impacto de la primera capa, imprimir un modelo con 50-100 capas y medir solo las 20 superiores. — [Simplify3D](wiki/raw/agujeros-ovalados-simplify3d-dimensional-accuracy.md)
- Si la boquilla está demasiado baja en la primera capa, el plástico extra crea capas más grandes en la base que afectan las dimensiones. — [Simplify3D](wiki/raw/agujeros-ovalados-simplify3d-dimensional-accuracy.md)

## Contradicciones

### Separación de compensación: solo agujeros vs. todo el modelo

- **XY Hole Compensation separado** (Bambu Lab, OrcaSlicer): existe un ajuste específico que solo afecta agujeros y otro que solo afecta contornos. — [Bambu Lab Wiki](wiki/raw/agujeros-ovalados-bambulab-xy-compensation.md), [OrcaSlicer Wiki](wiki/raw/agujeros-ovalados-orcaslicer-precision.md)
- **XY Size Compensation unificado** (PrusaSlicer, según ed brakus): el ajuste impacta todo el modelo, no solo los agujeros. — [Foro Prusa, ed brakus](wiki/raw/agujeros-ovalados-prusa-forum-hole-size.md)

**Se contradicen.** La diferencia es de slicer, de fondo: Bambu Studio y OrcaSlicer ofrecen dos parámetros independientes (hole y contour), mientras que PrusaSlicer (según el usuario del foro) tiene un único parámetro que afecta a todo. **El redactor tiene que explicar que la separación de parámetros es una ventaja de Bambu/Orca, no una contradicción de valores.**

### Algoritmo de Adrian Bowyer: implementado y luego retirado

- Slic3r implementó un algoritmo de compensación para el lado cóncavo de las curvas (propuesto por Adrian Bowyer), pero muchos usuarios se quejaron de que los agujeros salían demasiado grandes, por lo que fue retirado. — [Slic3r Manual](wiki/raw/agujeros-ovalados-slic3r-dimension-errors.md)

**No es una contradicción entre fuentes, pero es un antecedente histórico relevante:** la compensación automática del lado cóncavo existe pero fue retirada porque los agujeros grandes son peor que los agujeros pequeños (que se pueden taladrar). **El redactor debe mencionar que la compensación manual es preferible a la automática porque permite elegir el punto exacto.**

### Modelo de flujo: ovalado vs. rectangular

- Slic3r y sus forks asumen extrusión ovalada con solape (0.4 mm wall + 0.2 mm layer = 0.714 mm). — [OrcaSlicer Wiki](wiki/raw/agujeros-ovalados-orcaslicer-precision.md)
- Cura asume extrusión rectangular sin solape (dos paredes de 0.4 mm = 0.8 mm). — [OrcaSlicer Wiki](wiki/raw/agujeros-ovalados-orcaslicer-precision.md)

**No es una contradicción, pero explica por qué los agujeros salen pequeños en Slic3r/Orca y no en Cura:** el modelo ovalado con solape hace que el material ocupe más espacio en el lado interior de las curvas. **El redactor debe conectar esto con la causa "más material en el lado cóncavo" del Slic3r Manual.**

## Sin respaldo

- Los agujeros internos salen 0.2-0.3 mm más pequeños tras calibrar la impresora y el material. **[UNA SOLA FUENTE — foro Prusa, Sebastian, sin corroborar]**
- Un agujero de 10 mm nominales mide 9.7 mm reales, con mayor desviación cuanto más pequeño es el agujero. **[UNA SOLA FUENTE — foro Prusa, VH, sin corroborar]**
- Un tornillo roscado de 5.72 mm encaja en un agujero impreso de 6 mm (PLA). **[UNA SOLA FUENTE — foro Prusa, george, sin corroborar]**
- SuperSlicer tiene un parámetro `hole_size_compensation` que funciona bien. **[UNA SOLA FUENTE — foro Prusa, Sebastian, sin corroborar]**
- El XY size compensation de PrusaSlicer impacta todo el modelo, no solo los agujeros. **[UNA SOLA FUENTE — foro Prusa, ed brakus, sin corroborar]**
- No hay un truco único para compensar agujeros; depende de geometría, tolerancias y material. **[UNA SOLA FUENTE — foro Prusa, FoxRun3D, sin corroborar]**
- Diseñar con tolerancias de impresora penaliza a quien comparte el modelo. **[UNA SOLA FUENTE — foro Prusa, Golf League Tracker, sin corroborar]**
- Según la orientación, un agujero circular siempre sale elíptico. **[UNA SOLA FUENTE — foro Prusa, gigiga, sin corroborar]**
- Es mejor diseñar los agujeros para impresión 3D desde el principio. **[UNA SOLA FUENTE — foro Prusa, Robin, sin corroborar]**

## Tirado

- **Navegación y menús**: índices de navegación del wiki de GitHub (167 páginas), enlaces de "Related Topics", "Topic Tags", migas de pan. Sin contenido técnico.
- **Anuncios y banners**: ninguno en estas fuentes.
- **Piezas de producto**: ninguna (no hay enlaces de compra ni precios).
- **Cuestionarios y surveys**: ninguno.
- **Repetidos**: la explicación de que el plástico se contrae al enfriar aparece en Slic3r, Bambu Lab y Simplify3D; se ha mantenido una versión por fuente porque cada una añade matices diferentes (temperatura, material, humedad).
- **Texto de navegación de wiki**: "Related wiki links" sin el contenido enlazado.
- **Notas del recolector**: se han omitido del cuerpo cocinado pero se han usado para verificar la autoría y el tipo de cada fuente.
- **Imágenes y diagramas**: las referencias a imágenes en los textos originales (capturas de Bambu Studio, diagramas de polyholes) no se han incluido porque no son afirmaciones textuales.

## Relaciones

| Concepto | Se relaciona con | Cómo |
|---|---|---|
| Agujeros ovalados | Contracción del filamento | La contracción al enfriar reduce el diámetro del agujero, especialmente en materiales como ABS |
| Agujeros ovalados | Modelo de flujo del slicer | El modelo ovalado con solape (Slic3r/Orca) deposita más material en el lado cóncavo, reduciendo el radio interno |
| Agujeros ovalados | Orientación de impresión | Según la orientación, un agujero circular sale elíptico |
| Compensación XY | Calibración por filamento | La compensación es específica para cada combinación filamento/impresora |
| Compensación XY | Tolerancias de impresora | Incluso con el mismo filamento, las tolerancias varían de una impresora a otra |
| Poliholes | Aproximación poligonal | Los polyholes reducen el error de aproximación de curvas por polígonos al forzar segmentos rectos |
| Poliholes | OpenSCAD `polyhole()` | La función de nophead calcula el número óptimo de segmentos para un agujero dado |
| Sobre/subextrusión | Extrusion multiplier | Multiplicador bajo → piezas más pequeñas; alto → piezas más grandes |
| Sobre/subextrusión | External Perimeters First | Imprimir perímetros externos primero previene el desplazamiento por solape |
| Primera capa | Precisión dimensional | La primera capa afecta las siguientes 10-20 capas; medir solo las 20 superiores de una pieza de 50-100 capas |
| Backlash | Errores distintos en X e Y | El backlash produce errores dimensionales diferentes en cada eje; se corrige apretando correas, no con software |
| XY Hole Compensation | Caminos cerrados | Solo aplica a caminos cerrados; aberturas laterales producen caminos abiertos que no se compensan |
| Shrinkage XY/Z | Error dimensional creciente | El error que aumenta con el tamaño de la pieza es atribuible a la contracción térmica |
| Tolerancias de impresora | Diseño paramétrico | Diseñar con tolerancias de impresora penaliza a quien comparte; la compensación debe ser decisión del usuario |
