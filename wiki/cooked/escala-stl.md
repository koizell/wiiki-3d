---
titulo: Escala y tamaño de archivos STL
tema: escala-stl
brief: .superpowers/guia-escala-stl/brief.md
fuentes:
  - wiki/raw/escala-stl-shapr3d-3mf-2026-11-16.md
  - wiki/raw/escala-stl-nist-unidades-longitud-2026-11-16.md
  - wiki/raw/escala-stl-ultimaker-volumen-2026-11-16.md
  - wiki/raw/escala-stl-prusaslicer-26-medicion-corte-2026-11-16.md
  - wiki/raw/escala-stl-prusaslicer-23-unidades-2026-11-16.md
  - wiki/raw/escala-stl-simplify3d-panel-modelo-2026-11-16.md
  - wiki/raw/escala-stl-simplify3d-paredes-delgadas-2026-11-16.md
  - wiki/raw/escala-stl-orcaslicer-medicion-2026-11-16.md
  - wiki/raw/escala-stl-orcaslicer-manipulacion-2026-11-16.md
  - wiki/raw/escala-stl-prusaslicer-294-release-2026-11-16.md
  - wiki/raw/escala-stl-prusaslicer-294-codigo-medicion-2026-11-16.md
  - wiki/raw/escala-stl-prusaslicer-294-seleccion-distancias-2026-11-16.md
  - wiki/raw/escala-stl-prusaslicer-294-config-cama-2026-11-16.md
  - wiki/raw/escala-stl-prusaslicer-294-volumen-canvas-2026-11-16.md
cocinado: 2026-11-16
revision: 3
estado: parcial
---

## Afirmaciones

### A-001 · STL no guarda unidades de medida

- **Dice:** «STL: Stores polygonal mesh geometry without measurement units or color information.» [STL guarda geometría de malla poligonal sin unidades de medida ni información de color.]
- **Fuente:** `wiki/raw/escala-stl-shapr3d-3mf-2026-11-16.md`
- **URL:** https://support.shapr3d.com/hc/en-us/articles/7874502103068-Working-with-3MF-files-in-Shapr3D
- **Localización:** «3MF vs. STL», segunda viñeta.
- **Tipo:** hecho de fabricante.
- **Alcance:** comparación general del formato; no identifica las unidades pretendidas para un archivo concreto.
- **Vigencia:** artículo actualizado el 2026-11-11; versión de Shapr3D no indicada.
- **Confianza:** alta para lo que afirma la documentación; fragmento parcial, no especificación normativa.

### A-002 · 3MF admite unidades de medida

- **Dice:** «3MF: Stores mesh geometry and supports additional information, including measurement units and colors.» [3MF guarda geometría de malla y admite información adicional, incluidas unidades de medida y colores.]
- **Fuente:** `wiki/raw/escala-stl-shapr3d-3mf-2026-11-16.md`
- **URL:** https://support.shapr3d.com/hc/en-us/articles/7874502103068-Working-with-3MF-files-in-Shapr3D
- **Localización:** «3MF vs. STL», primera viñeta.
- **Tipo:** hecho de fabricante.
- **Alcance:** capacidad de almacenar información; no garantiza que todos los programas la conserven o interpreten igual.
- **Vigencia:** actualización 2026-11-11; versión no indicada.
- **Confianza:** alta para la capacidad descrita; fragmento parcial.

### A-003 · Equivalencia exacta de longitud

- **Dice:** «The value for the inch […] is exactly equivalent to 25.4 mm.» [El valor de la pulgada equivale exactamente a 25,4 mm.]
- **Fuente:** `wiki/raw/escala-stl-nist-unidades-longitud-2026-11-16.md`
- **URL:** https://www.nist.gov/pml/owm/si-units-length
- **Localización:** «When did the metric redefinition of the inch occur?», primer párrafo, última frase.
- **Tipo:** definición metrológica de organismo oficial.
- **Alcance:** longitud; no describe importación de STL ni conversión de volumen.
- **Vigencia:** página creada el 2010-04-12 y actualizada el 2025-09-19; definición efectiva desde 1959 según el texto.
- **Confianza:** alta; fuente metrológica oficial y equivalencia expresamente exacta.

### A-004 · Importar y revertir unidades imperiales en PrusaSlicer

- **Dice:** «Importing STLs saved in inches by menu File->Import->Import STL (Imperial Units). STLs are converted from inches to millimeters on import.» [Importación de STL guardados en pulgadas mediante ese menú; se convierten a milímetros al importar.] «Object and Volume context menu newly contain "Convert from Imperial Unit" […]» y «"Revert conversion from Imperial Unit" […]» [los menús contextuales ofrecen convertir y revertir].
- **Fuente:** `wiki/raw/escala-stl-prusaslicer-23-unidades-2026-11-16.md`
- **URL:** https://github.com/prusa3d/PrusaSlicer/releases/tag/version_2.3.0-alpha1
- **Localización:** «Support for imperial units», párrafo después de las primeras tres viñetas y tres primeras viñetas siguientes.
- **Tipo:** hecho de fabricante.
- **Alcance:** STL cuyas coordenadas se pretendían en pulgadas; también describe revertir una importación imperial aplicada a un objeto en mm. No usar ambas conversiones acumulativamente.
- **Vigencia:** PrusaSlicer 2.3.0-alpha1, versión alfa histórica publicada el 2020-10-17; controles actuales no comprobados.
- **Confianza:** alta para esa versión, no extrapolable a versiones actuales.

### A-005 · Mostrar pulgadas no cambia las unidades internas

- **Dice:** «If enabled, the object position and scaling is presented and accepted in inches. PrusaSlicer still keeps the internal dimensions in mm» [activada la casilla, la posición y escala se muestran y aceptan en pulgadas; internamente conserva dimensiones en mm].
- **Fuente:** `wiki/raw/escala-stl-prusaslicer-23-unidades-2026-11-16.md`
- **URL:** https://github.com/prusa3d/PrusaSlicer/releases/tag/version_2.3.0-alpha1
- **Localización:** «Support for imperial units», primera viñeta, casilla «Inches» de «Object manipulation».
- **Tipo:** hecho de fabricante.
- **Alcance:** visualización y entrada de posición y escala; no equivale a identificar o corregir la unidad pretendida del archivo.
- **Vigencia:** 2.3.0-alpha1, alfa histórica de 2020-10-17; no verificado en versiones posteriores.
- **Confianza:** alta para esa versión.

### A-006 · Oferta automática para modelos pequeños

- **Dice:** «If the model loaded is very small, a conversion from inches to millimeters is newly offered» [si el modelo cargado es muy pequeño, se ofrece una conversión de pulgadas a milímetros].
- **Fuente:** `wiki/raw/escala-stl-prusaslicer-23-unidades-2026-11-16.md`
- **URL:** https://github.com/prusa3d/PrusaSlicer/releases/tag/version_2.3.0-alpha1
- **Localización:** «Support for imperial units», última viñeta.
- **Tipo:** hecho de fabricante.
- **Alcance:** oferta condicionada al tamaño, no prueba de unidades originales ni conversión obligatoria.
- **Vigencia:** 2.3.0-alpha1, alfa histórica de 2020-10-17.
- **Confianza:** alta para la oferta documentada; no sirve para inferir intención de diseño.

### A-007 · Medición y escala desde la medición

- **Dice:** «Users can check model sizes and angles directly in the slicer» y «the tool allows to uniformly scale the object to the required length by clicking a button in the scene.» [Se pueden comprobar tamaños y ángulos y escalar uniformemente a una longitud mediante un botón en la escena.]
- **Fuente:** `wiki/raw/escala-stl-prusaslicer-26-medicion-corte-2026-11-16.md`
- **URL:** https://github.com/prusa3d/PrusaSlicer/releases/tag/version_2.6.0-alpha2
- **Localización:** «Measurement tool», primer párrafo.
- **Tipo:** hecho de fabricante.
- **Alcance:** puntos, aristas, círculos y planos; mide entre partes dentro de objetos, no entre objetos separados.
- **Vigencia:** PrusaSlicer 2.6.0-alpha2, alfa histórica publicada el 2023-01-31; no verificado en versiones actuales.
- **Confianza:** alta para la versión descrita; la captura no ofrece una secuencia completa de clics.

### A-008 · Limitaciones de la medición en la alfa

- **Dice:** «edges created by the intersections are not detected, and planes hidden inside other parts are. The tool also does not work well with negative volumes» [no detecta aristas creadas por intersecciones, sí detecta planos ocultos dentro de otras partes y no funciona bien con volúmenes negativos].
- **Fuente:** `wiki/raw/escala-stl-prusaslicer-26-medicion-corte-2026-11-16.md`
- **URL:** https://github.com/prusa3d/PrusaSlicer/releases/tag/version_2.6.0-alpha2
- **Localización:** «Measurement tool», segundo párrafo.
- **Tipo:** hecho de fabricante.
- **Alcance:** objetos con partes superpuestas y volúmenes negativos; estos últimos se consideran partes.
- **Vigencia:** 2.6.0-alpha2, alfa histórica de 2023-01-31; limitaciones posteriores no verificadas.
- **Confianza:** alta para la versión indicada.

### A-009 · Cortar y preparar conectores

- **Dice:** «The model can newly be cut by a generally oriented plane» [el modelo puede cortarse con un plano orientado libremente]; «Users can also control the depth, size, and tolerances of each connector member and negative hole» [se pueden controlar profundidad, tamaño y tolerancias de conectores y agujeros negativos].
- **Fuente:** `wiki/raw/escala-stl-prusaslicer-26-medicion-corte-2026-11-16.md`
- **URL:** https://github.com/prusa3d/PrusaSlicer/releases/tag/version_2.6.0-alpha2
- **Localización:** «Cut tool update», párrafos segundo y tercero.
- **Tipo:** hecho de fabricante.
- **Alcance:** corte del objeto y geometría de conectores; rotación descrita es del plano de corte, no rotación general del objeto; no determina una holgura correcta ni garantiza montaje.
- **Vigencia:** 2.6.0-alpha2, alfa histórica de 2023-01-31.
- **Confianza:** alta para esas capacidades históricas; sin prueba de resultado físico.

### A-010 · Vinculación de partes tras el corte

- **Dice:** «one cannot scale one object and not the other, as that would make the parts not match»; «It is of course possible to break this correspondence» [no se puede escalar una parte sin la otra mientras corresponden; se puede romper esa correspondencia].
- **Fuente:** `wiki/raw/escala-stl-prusaslicer-26-medicion-corte-2026-11-16.md`
- **URL:** https://github.com/prusa3d/PrusaSlicer/releases/tag/version_2.6.0-alpha2
- **Localización:** «Cut tool update», último párrafo de texto.
- **Tipo:** hecho de fabricante.
- **Alcance:** objetos resultantes de un corte y su vinculación; no cuantifica tolerancias de impresión.
- **Vigencia:** 2.6.0-alpha2, alfa histórica de 2023-01-31.
- **Confianza:** alta para el comportamiento descrito.

### A-011 · Tamaño numérico en Simplify3D

- **Dice:** «double click the model on the bed or its name in the Model List» [doble clic en el modelo de la cama o su nombre en la lista]; «you can also scale to an exact size in millimeters» [también se puede escalar a un tamaño exacto en milímetros]; «uncheck Uniform Scaling» [desmarcar escala uniforme] para estirar un eje.
- **Fuente:** `wiki/raw/escala-stl-simplify3d-panel-modelo-2026-11-16.md`
- **URL:** https://www.simplify3d.com/resources/videos/using-the-model-settings-panel/
- **Localización:** transcripción, párrafos segundo y tercero; ejemplo de introducir 75 en Z.
- **Tipo:** hecho de fabricante.
- **Alcance:** panel de modelo y tamaño introducido; el ajuste de un eje sin escala uniforme deforma proporcionalmente de forma distinta.
- **Vigencia:** sin fecha de publicación o revisión visible ni versión de Simplify3D.
- **Confianza:** media para instrucciones reproducibles: transcripción oficial completa, pero versión desconocida.

### A-012 · Rotación numérica en Simplify3D

- **Dice:** «you can rotate to an exact orientation» [se puede girar a una orientación exacta]; el ejemplo cambia la rotación Z a 65 grados.
- **Fuente:** `wiki/raw/escala-stl-simplify3d-panel-modelo-2026-11-16.md`
- **URL:** https://www.simplify3d.com/resources/videos/using-the-model-settings-panel/
- **Localización:** transcripción, penúltimo párrafo.
- **Tipo:** hecho de fabricante.
- **Alcance:** orientación numérica; no demuestra que una pieza girada quepa o sea imprimible.
- **Vigencia:** sin fecha visible ni versión.
- **Confianza:** media; fuente oficial sin versión identificada.

### A-013 · Volumen nominal no equivale a dimensiones máximas de pieza

- **Dice:** «there is a difference between the available build volume and the maximum part dimensions» [hay una diferencia entre el volumen de construcción disponible y las dimensiones máximas de la pieza]; algunos ajustes de perfiles predeterminados reducen tamaño y crean zonas no imprimibles.
- **Fuente:** `wiki/raw/escala-stl-ultimaker-volumen-2026-11-16.md`
- **URL:** https://support.ultimaker.com/s/article/1667337565436
- **Localización:** «How to print the maximum build volume in UltiMaker Cura», primer párrafo; «Build volume vs part dimensions», primer párrafo.
- **Tipo:** hecho de fabricante.
- **Alcance:** Cura con perfiles de impresoras UltiMaker y MakerBot; no fórmula general para otras impresoras.
- **Vigencia:** fecha visible 2026-05-07, sin aclarar si publicación o revisión; versión de Cura no indicada.
- **Confianza:** alta para el matiz documentado; captura parcial.

### A-014 · Zonas no imprimibles y estructuras auxiliares

- **Dice:** «The part size is reduced when, for example, the nozzles must be able to travel around the object […] or when helper structures are added (such as a brim/raft or support). For some printer models […] the number of active extruders also affects the build volume.» [El tamaño de pieza se reduce, por ejemplo, por desplazamientos de boquillas o estructuras auxiliares; en algunos modelos también influye el número de extrusores activos.]
- **Fuente:** `wiki/raw/escala-stl-ultimaker-volumen-2026-11-16.md`
- **URL:** https://support.ultimaker.com/s/article/1667337565436
- **Localización:** «Build volume vs part dimensions», párrafo posterior a la lista de zonas.
- **Tipo:** hecho de fabricante.
- **Alcance:** perfiles UltiMaker y MakerBot; ejemplos dependientes del modelo y ajustes. El fragmento no permite afirmar que cualquier brim reduzca siempre el área en todos los perfiles.
- **Vigencia:** fecha visible 2026-05-07 de naturaleza no aclarada; versión Cura no indicada.
- **Confianza:** media-alta; documentación oficial parcial, sin el resto de los matices de perfiles.

### A-015 · Pared delgada y ancho de extrusión

- **Dice:** «if you were trying to print a 1.0mm thick wall with a 0.4mm extrusion width, you may need to make some adjustments […] and does not leave a gap in the middle» [una pared de 1,0 mm con ancho de extrusión de 0,4 mm puede necesitar ajustes para evitar un hueco central].
- **Fuente:** `wiki/raw/escala-stl-simplify3d-paredes-delgadas-2026-11-16.md`
- **URL:** https://www.simplify3d.com/resources/print-quality-troubleshooting/gaps-in-thin-walls/
- **Localización:** primer párrafo, ejemplo numérico.
- **Tipo:** hecho de fabricante: posibilidad y ejemplo, no resultado garantizado.
- **Alcance:** impresión por extrusión, pared y ancho indicados; no establece mínimo universal ni estudia directamente escalar.
- **Vigencia:** sin fecha visible ni versión de Simplify3D.
- **Confianza:** media; ejemplo oficial, sin condiciones experimentales ni versión.

### A-016 · Ajustes de pared delgada en Simplify3D

- **Dice:** «click “Edit Process Settings” and select the Advanced tab»; «change the Internal Thin Wall Type to “Allow single extrusion fill”» [abrir ajustes del proceso, pestaña Advanced, y cambiar el tipo de pared delgada interna a relleno de extrusión única].
- **Fuente:** `wiki/raw/escala-stl-simplify3d-paredes-delgadas-2026-11-16.md`
- **URL:** https://www.simplify3d.com/resources/print-quality-troubleshooting/gaps-in-thin-walls/
- **Localización:** segundo párrafo.
- **Tipo:** hecho de fabricante.
- **Alcance:** opción de Simplify3D, no promesa de resolver todo caso ni instrucción para otros laminadores.
- **Vigencia:** sin fecha visible ni versión.
- **Confianza:** media; fuente oficial pero versión desconocida.

### A-017 · Importación de STL en OrcaSlicer

- **Dice:** «Choose one or more files (3MF/STEP/STL/SVG/OBJ/AMF) to import into the current project as Object Sets.» [Elegir uno o más archivos de esos formatos, entre ellos STL, para importarlos al proyecto actual como conjuntos de objetos.]
- **Fuente:** `wiki/raw/escala-stl-orcaslicer-medicion-2026-11-16.md`
- **URL:** https://github.com/OrcaSlicer/OrcaSlicer/wiki/prepare_basic
- **Localización:** «Add Objects», primer párrafo.
- **Tipo:** hecho documentado por el proyecto.
- **Alcance:** formatos y destino de importación en OrcaSlicer; no identifica la unidad pretendida ni describe una conversión de unidades.
- **Vigencia:** versión de OrcaSlicer y fecha de publicación o revisión no indicadas; captura 2026-11-16.
- **Confianza:** media; documentación oficial sin versión ni fecha visibles.

### A-018 · Medición de distancias en OrcaSlicer

- **Dice:** «Use the Measure Tool to measure distances between points/edges/faces on your 3D model.» [Usa la herramienta de medición para medir distancias entre puntos, aristas o caras del modelo 3D.]
- **Fuente:** `wiki/raw/escala-stl-orcaslicer-medicion-2026-11-16.md`
- **URL:** https://github.com/OrcaSlicer/OrcaSlicer/wiki/prepare_basic
- **Localización:** «Measure Tool», único párrafo.
- **Tipo:** hecho documentado por el proyecto.
- **Alcance:** medición de distancias en el modelo; no especifica la selección de elementos, comparación con referencia ni unidades originales.
- **Vigencia:** versión y fecha de publicación o revisión no indicadas; captura 2026-11-16.
- **Confianza:** media; documentación oficial sin versión ni instrucciones detalladas.

### A-019 · Escala por porcentaje y tamaño en OrcaSlicer

- **Dice:** «Scale: Resize the model by a percentage of its current size.» [Escala: cambiar el tamaño del modelo por un porcentaje de su tamaño actual.] «Size: Set the model to a specific size in millimeters.» [Tamaño: establecer un tamaño concreto en milímetros.]
- **Fuente:** `wiki/raw/escala-stl-orcaslicer-manipulacion-2026-11-16.md`
- **URL:** https://github.com/OrcaSlicer/OrcaSlicer/wiki/prepare_object_manipulation
- **Localización:** «Scale», dos primeras viñetas.
- **Tipo:** hecho documentado por el proyecto.
- **Alcance:** porcentaje respecto al tamaño actual y tamaño introducido en mm; no explica cómo calcular un factor desde una medida interna ni identifica la unidad del STL.
- **Vigencia:** versión y fecha de publicación o revisión no indicadas; captura 2026-11-16.
- **Confianza:** media; documentación oficial sin versión ni secuencia completa.

### A-020 · Escala uniforme en OrcaSlicer

- **Dice:** «Uniform Scale: Maintain the model's proportions while scaling.» [Escala uniforme: mantener las proporciones del modelo al escalar.]
- **Fuente:** `wiki/raw/escala-stl-orcaslicer-manipulacion-2026-11-16.md`
- **URL:** https://github.com/OrcaSlicer/OrcaSlicer/wiki/prepare_object_manipulation
- **Localización:** «Scale», tercera viñeta.
- **Tipo:** hecho documentado por el proyecto.
- **Alcance:** proporciones del modelo; no garantiza tolerancias ni encaje de piezas impresas.
- **Vigencia:** versión y fecha de publicación o revisión no indicadas; captura 2026-11-16.
- **Confianza:** media; documentación oficial sin versión identificada.

### A-021 · Rotación relativa y absoluta en OrcaSlicer

- **Dice:** «Relative: Rotate the model by a specific angle relative to its current orientation.» [Relativa: girar el modelo un ángulo concreto respecto a su orientación actual.] «Absolute: Set the model to a specific angle regardless of its current orientation.» [Absoluta: establecer un ángulo concreto independientemente de su orientación actual.]
- **Fuente:** `wiki/raw/escala-stl-orcaslicer-manipulacion-2026-11-16.md`
- **URL:** https://github.com/OrcaSlicer/OrcaSlicer/wiki/prepare_object_manipulation
- **Localización:** «Rotate», dos viñetas.
- **Tipo:** hecho documentado por el proyecto.
- **Alcance:** orientación del modelo en OrcaSlicer; no demuestra que el giro haga caber la pieza ni que sea imprimible.
- **Vigencia:** versión y fecha de publicación o revisión no indicadas; captura 2026-11-16.
- **Confianza:** media; documentación oficial sin versión ni condiciones de encaje.

### A-022 · Identificación de la versión final 2.9.4

- **Dice:** «This is final release of PrusaSlicer 2.9.4» [Esta es la versión final de PrusaSlicer 2.9.4].
- **Fuente:** `wiki/raw/escala-stl-prusaslicer-294-release-2026-11-16.md`
- **URL:** https://github.com/prusa3d/PrusaSlicer/releases/tag/version_2.9.4
- **Localización:** cuerpo de la release, primer párrafo, primera frase.
- **Tipo:** hecho de fabricante.
- **Alcance:** identifica una versión final, no prueba que fuera la última disponible ni documenta medición, escala o encaje.
- **Vigencia:** release publicada el 2025-11-07; actualización registrada el 2026-05-13, que puede corresponder a los archivos de distribución; captura 2026-11-16.
- **Confianza:** alta para la identificación de la versión; las fechas proceden de la API oficial según el raw.

## Contradicciones

No se ha identificado una contradicción directa entre las afirmaciones de las fuentes incluidas. La diferencia entre dimensiones máximas de pieza y volumen de construcción en A-013 es un matiz documentado, no una contradicción.

## Inferencias

### I-001 · Sentido de conversión de longitudes

**INFERENCIA.** A-003 establece 1 pulgada = 25,4 mm. Por aritmética dimensional, una longitud conocida en pulgadas se multiplica por 25,4 para expresarla en mm; una longitud conocida en mm se divide por 25,4 para expresarla en pulgadas. Esto convierte la representación de la misma longitud; no identifica la unidad pretendida de un STL ni justifica aplicar el factor dos veces.

### I-002 · Comprobación de paredes tras reducir

**INFERENCIA.** Si un escalado es geométricamente uniforme, una dimensión lineal de la pieza, incluido un espesor, se multiplica por el mismo factor. A-015 documenta un posible hueco para una combinación concreta de espesor y ancho de extrusión. Por tanto, tras reducir uniformemente, conviene comprobar el espesor resultante y la vista de laminado; no se ha demostrado un umbral general ni que vaya a aparecer un hueco.

### I-003 · Comparación de una referencia con la misma dimensión

**INFERENCIA.** A-003 permite expresar una referencia conocida y una medición en la misma unidad; A-018 documenta que OrcaSlicer mide distancias. Si ambas describen inequívocamente la misma dimensión, compararlas puede revelar coincidencia o discrepancia numérica. Una coincidencia no prueba la unidad original ni el encaje físico; una discrepancia tampoco demuestra por sí sola que la causa sea una conversión de unidades. Una referencia expresada en pulgadas no demuestra que las coordenadas del STL se pretendieran en pulgadas.

### I-004 · Factor de escala de una dimensión conocida

**INFERENCIA.** Si una dimensión medida es positiva y se conoce la dimensión deseada correspondiente en la misma unidad, el cociente deseada/medida es el factor geométrico uniforme; multiplicado por 100 da su porcentaje. A-019 documenta el porcentaje respecto al tamaño actual y A-020 la conservación de proporciones. Esto requiere que las dos medidas correspondan a la misma dimensión y que se desee escalar todo el modelo; no demuestra la unidad original, no debe acumularse con una conversión ya aplicada y no garantiza encaje, tolerancias ni resultado físico. La documentación aportada no describe una secuencia de controles para aplicar el cálculo a una medida interna.

### I-005 · Activación de Measure según código etiquetado

**INFERENCIA DEL CÓDIGO, NO PRUEBA EN UI.** En el tag 2.9.4, `on_get_name` devuelve `return _u8L("Measure");` [devuelve el nombre «Measure»] y `on_init` asigna `m_shortcut_key = WXK_CONTROL_U;` [asigna esa constante de tecla]. `on_is_activable` distingue SLA de otras tecnologías y exige que la selección no contenga volúmenes hundidos. Se infiere que el código prevé condiciones de activación y una tecla asociada; no se ha comprobado el atajo, su plataforma, la selección ni el recorrido en la aplicación.

- **Fuente:** `wiki/raw/escala-stl-prusaslicer-294-codigo-medicion-2026-11-16.md`
- **URL:** https://raw.githubusercontent.com/prusa3d/PrusaSlicer/version_2.9.4/src/slic3r/GUI/Gizmos/GLGizmoMeasure.cpp
- **Localización:** bloques `on_init`, `on_get_name` y `on_is_activable` del raw, líneas 23–48; localizadores corregidos en el archivo original: comienzan respectivamente en 529, 563 y 568, según `wiki/raw/escala-stl-prusaslicer-294-seleccion-distancias-2026-11-16.md`, notas del recolector.
- **Vigencia y confianza:** tag 2.9.4, fecha de revisión del código no indicada; captura 2026-11-16. Confianza media en la lectura parcial, no validada en ejecución.

### I-006 · Selección y tipos de distancia en Measure

**INFERENCIA DEL CÓDIGO, NO PRUEBA EN UI.** Los bloques incluyen `m_mode = EMode::PointSelection;` al recibir `ShiftDown`, y `m_mode = EMode::FeatureSelection;` al recibir `ShiftUp`; también contienen asignaciones a `m_selected_features.first` y `m_selected_features.second`. Las etiquetas literales incluyen `«Perpendicular distance»` [distancia perpendicular], `«Direct distance»` [distancia directa] y `«Distance XYZ»` [distancia XYZ]. Se infiere que el código contempla dos elementos y modos de selección y presenta distintas medidas bajo condiciones específicas. Los rótulos no aparecen necesariamente todos: dependen de los resultados disponibles y de `show_strict`; no hay selección ni comparación probadas en interfaz.

- **Fuente:** `wiki/raw/escala-stl-prusaslicer-294-seleccion-distancias-2026-11-16.md`
- **URL:** https://raw.githubusercontent.com/prusa3d/PrusaSlicer/version_2.9.4/src/slic3r/GUI/Gizmos/GLGizmoMeasure.cpp
- **Localización:** bloques de selección del primer y segundo elemento, eventos `ShiftDown` y `ShiftUp`, y presentación de medidas, líneas 48–145 del raw.
- **Vigencia y confianza:** tag 2.9.4; fecha de revisión no indicada; captura 2026-11-16. Confianza media en el código parcial, no en una secuencia de uso.

### I-007 · Edición de distancia y cociente de escala en el código

**INFERENCIA DEL CÓDIGO, NO PRUEBA EN UI.** El bloque contiene `«Edit to scale»` [editar para escalar], `const double ratio = new_value / old_value;` y `selection.scale(ratio * Vec3d::Ones(), type);`. También aparece `if (new_value == old_value || new_value <= 0.0) return;`. Se infiere que, en esa ruta de código, un valor nuevo positivo y distinto puede originar un cociente aplicado por igual a los tres componentes de la selección. Los extractos no demuestran una secuencia completa de selección, edición y aplicación ni una prueba instalada; no prueban encaje ni recuperación de unidades.

- **Fuente:** `wiki/raw/escala-stl-prusaslicer-294-codigo-medicion-2026-11-16.md`
- **URL:** https://raw.githubusercontent.com/prusa3d/PrusaSlicer/version_2.9.4/src/slic3r/GUI/Gizmos/GLGizmoMeasure.cpp
- **Localización:** bloques del control `Edit to scale`, función `perform_scale` y aplicación `selection.scale`, líneas 50–118 del raw; entrada y acciones de escala, líneas 120–145.
- **Vigencia y confianza:** tag 2.9.4; fecha de revisión no indicada; captura 2026-11-16. Confianza media en la lectura de extractos no contiguos; ejecución no comprobada.

### I-008 · Configuración y avisos de volumen en el código

**INFERENCIA DEL CÓDIGO, NO PRUEBA EN UI.** El bloque `Plater::set_bed_shape()` pasa las opciones `«bed_shape»` y `«max_print_height»` [forma de cama y altura máxima de impresión] a `set_bed_shape`; el canvas usa `m_bed.build_volume()` y contiene avisos distintos: `«An object outside the print area was detected.»` [Se detectó un objeto fuera del área de impresión.] y `«A toolpath outside the print area was detected.»` [Se detectó una trayectoria fuera del área de impresión.]. Se infiere que el código conecta configuración de cama y altura con el volumen usado en detección y prevé avisos diferenciados; los extractos no prueban cómo seleccionar un perfil ni cuándo aparecen visualmente. El código declara aproximaciones `FIXME` para geometrías no convexas. La ausencia de aviso no demuestra encaje físico, correspondencia del perfil con la máquina ni ausencia de restricciones de cabezal o trayectorias.

- **Fuentes:** `wiki/raw/escala-stl-prusaslicer-294-config-cama-2026-11-16.md` y `wiki/raw/escala-stl-prusaslicer-294-volumen-canvas-2026-11-16.md`
- **URL:** https://raw.githubusercontent.com/prusa3d/PrusaSlicer/version_2.9.4/src/slic3r/GUI/Plater.cpp y https://raw.githubusercontent.com/prusa3d/PrusaSlicer/version_2.9.4/src/slic3r/GUI/GLCanvas3D.cpp
- **Localización:** primer raw, `Plater::set_bed_shape()`, líneas 51–59, y actualización de estado, líneas 61–66; segundo raw, detección y comentarios `FIXME`, líneas 24–62, y avisos, líneas 64–89.
- **Vigencia y confianza:** tag 2.9.4; fechas de revisión no indicadas; captura 2026-11-16. Confianza media para las rutas de código reproducidas, baja para cualquier conclusión sobre comportamiento físico o secuencia de interfaz.

## Sin respaldo

Sin afirmaciones basadas exclusivamente en fuentes secundarias entre las fuentes entregadas. La ausencia de una fuente primaria de especificación STL se señala en H-001; Shapr3D es documentación de fabricante, no la especificación del formato.

## Huecos

- **H-001 · Unidad pretendida de un STL concreto y especificación primaria.** STL no declara unidades según A-001, pero no se aportó una fuente normativa del formato ni un procedimiento documentado para recuperar la intención del autor si faltan medidas de referencia. No se puede diagnosticar automáticamente la unidad.
- **H-002 · Slicers actuales y procedimiento verificable.** PrusaSlicer 2.9.4 es una versión final identificada, pero no se ha establecido que sea la última. Sus extractos de código apoyan I-005–I-008, no una secuencia comprobada en interfaz de selección, medición, comparación, escala y comprobación de espacio. Simplify3D y OrcaSlicer carecen de versión identificada en las fuentes aportadas. Sigue faltando una fuente o caso comprobado que complete ese recorrido; el ajuste de alcance autorizado del brief ya no exige documentarlo. La guía debe señalar que no se ha verificado, limitar las instrucciones a su respaldo y no presentar inferencias ni documentación parcial como prueba empírica.
- **H-003 · Giro y división: límites prácticos.** Hay controles de rotación y corte, pero no una fuente que establezca cuándo un giro hace caber la pieza, las consecuencias de orientación o las condiciones de impresión y unión de las partes. No prometer que girar o cortar resuelve el problema.
- **H-004 · Ajuste y tolerancias tras escalar.** Hay controles de conectores y un ejemplo de pared, pero no mediciones de antes/después ni reglas de holgura o tolerancia dimensional para piezas escaladas. No dar tolerancias numéricas.
- **H-005 · Dimensiones del archivo frente a volumen de material.** No hay fuente aportada que defina y compare medidas de envolvente, tolerancias dimensionales y volumen de material o cálculo de este último. No confundirlos ni dar fórmula como hecho documentado.
- **H-006 · Avisos de la herramienta del sitio.** El brief los caracteriza como heurísticos, pero las fuentes entregadas no documentan sus umbrales o implementación. No presentar avisos de tamaño extremo como prueba de unidades ni como orden automática; faltan pruebas verificables para describir su funcionamiento concreto.
- **H-007 · Perfiles y espacio útil cuantificados.** El artículo de Cura está recortado y no aporta márgenes numéricos ni matices completos por brim, skirt, raft y modelo. No ofrecer cifras ni reglas universales de reducción de espacio.
- **H-008 · Interpretación de coordenadas y decisión de escala.** I-007 identifica en código una ruta de escala por cociente, pero no un procedimiento en interfaz comprobado para una medida interna ni una forma de determinar la unidad pretendida. I-003 e I-004 son razonamientos condicionales, no un diagnóstico ni un procedimiento probado. Falta un caso o documentación que distinga la unidad de referencia de la interpretación de coordenadas y compruebe cómo evitar la doble conversión.

## Tirado

- Del raw de UltiMaker, nota del recolector sobre recorte de brim y skirt y reducción por raft: el propio texto dice que el pasaje original no está reproducido; no es cita comprobable.
- Interpretar la oferta de conversión por tamaño como detección fiable de pulgadas: A-006 solo documenta una oferta.
- Presentar los ejemplos de pared y de conectores como resultados garantizados o tolerancias universales: las fuentes no los sostienen.
- Presentar extractos de código 2.9.4 como recorrido probado en una aplicación instalada, o la ausencia de aviso como garantía de encaje: no consta tal comprobación.

## Relaciones

- **Unidades y escala:** A-001, A-003, A-004 y I-001 distinguen unidad pretendida, equivalencia y operación de importación.
- **Medición, corte y volumen útil:** A-007–A-010 y A-013–A-014 conectan tamaño y preparación de piezas con el perfil de impresora; no garantizan imprimibilidad.
- **Paredes y ajuste entre piezas:** A-015, A-016 e I-002 conectan escala y pared delgada; H-004 remite el ajuste a la guía de tolerancias entre piezas mencionada en el brief, sin presumir ruta existente.
- **OrcaSlicer y decisión de escala:** A-017–A-021 documentan capacidades sin versión; I-003 e I-004 separan comparación y aritmética de la identificación de unidades y de un procedimiento probado (H-002, H-008).
- **PrusaSlicer 2.9.4:** A-022 identifica la release; I-005–I-008 interpretan extractos del tag sin sustituir la prueba de interfaz pendiente en H-002.
