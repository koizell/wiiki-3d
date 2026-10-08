# Revisión de temperatura-cama — séptima vuelta, lint 2026-10-04

**Veredicto: RECHAZADO** — 12 fallos agrupados, 5 bloqueantes.

Artículo: `src/content/wiki/temperatura-cama.md`. Cocinado: `wiki/cooked/temperatura-cama.md`.
Referencia histórica: `wiki/reviews/temperatura-cama-revision-6.md`.

Se leyeron las seis fuentes crudas correspondientes y se buscaron citas, cifras y nombres propios por fragmentos. El único hilo partido se comprobó también por mitades. Las aprobaciones previas y las notas del recolector no sustituyen el cuerpo de las fuentes. No se consultó internet ni código del analizador.

## Comprobaciones

| # | Comprobación | Resultado |
|---|---|---|
| 1 | Afirmaciones con respaldo | FALLA — paráfrasis más fuertes que sus fuentes e inferencias de cooked presentadas como hechos |
| 2 | Contradicciones internas | FALLA — cifra máxima, diagnóstico térmico y tratamiento de 0 frente a ausencia |
| 3 | Relleno y frases de IA | FALLA — párrafos sin dato concreto; ninguna frase canónica de IA encontrada |
| 4 | Longitud y estructura | PASA — 6.465 palabras, un H1 y frontmatter completo con slug correcto |
| 5 | Citas correctas | FALLA — citas presentes, pero atribución/contexto no siempre fiel; 6 URLs válidas, únicas; relación a `slicer` prometida por cooked y no nombrada como página |

Recuento calculado en JavaScript sobre transcripción del cuerpo visible, con `/[\p{L}\p{N}]+(?:[’'_-][\p{L}\p{N}]+)*/gu`: excluye frontmatter, URLs y marcas Markdown; incluye títulos, tablas, textos visibles de enlaces y pie. No se reutiliza la estimación de 6.200 palabras de la revisión anterior.

Hay problema en la introducción, explicación de rangos/superficies, ajustes, pruebas de foro y `## Qué puede salir mal` con contenido. La primera referencia está en la línea 35, antes de la mitad.

## Fallos, con dónde y qué hacer

### 1 · Bloqueante · La chapa de Bambu se usa para explicar cifras ajenas sin evidencia

**Dónde:** líneas 23–25, 80–95; descripción del frontmatter.
**Qué dice:** que cada cifra de los tres proveedores describe una chapa; que 60 °C de Prusa es exclusivamente el valor para PEI y que aplicarlo a vidrio/Kapton sería inventarlo.
**Por qué falla:** `temperatura-cama-bambu-wiki-filament-guide-material-table.md:96–99` sí separa por chapa. `temperatura-cama-prusa-kb-filament-material-guide.md:13–14` da un rango general para PLA; Orca `material-temperatures.md:21–25` avisa de variación por bobina y modelo, sin atribuir 50–60 a Textured PEI. La ficha Prusa `pla.md:18–19,46` recomienda 60 °C, recomienda Satin/Smooth por adhesión y menciona vidrio/Kapton: **no restringe expresamente los 60 °C a PEI** ni declara falsa su aplicación a otra superficie. Además el artículo dice en `:85–86` que Prusa recomienda esas chapas «sin decir a qué temperatura», aunque arriba presenta el 60 como su cifra para ellas.
**Qué hacer:** mostrar las recomendaciones con su alcance real. Que un rango esté contenido en otro no demuestra que la chapa sea la causa de toda diferencia entre fabricantes. Retirar la exclusividad añadida en cooked `:247–251,357–361`.

### 2 · Bloqueante · «No elimina bien» se convierte en «no elimina nada» y en corroboración oficial

**Dónde:** líneas 284–288, 515–518 y 597–600.
**Qué dice:** «el IPA no quita el aceite de los dedos», deja la grasa «exactamente donde estaba» y el foro dice «exactamente» lo mismo que la KB.
**Por qué falla:** Prusa `first-layer-issues.md:31` habla de **algunos aceites y azúcares acumulados** que el IPA no elimina; no identifica todos con las huellas. El foro `adjusting-settings-warping-pla.md:111–112` dice «It does not remove finger oils **well**», no que no quite ninguno. Son alcances distintos. Cooked `:228–234` ya los da por corroboración exacta.
**Qué hacer:** preservar «algunos» y «no bien», atribuir cada frase a su fuente y retirar la afirmación de eliminación nula/universal.

### 3 · Bloqueante · Productos químicos: posibilidad convertida en composición segura y producto cambiado

**Dónde:** líneas 331–339 y 607–609.
**Qué dice:** que quitaesmalte o «limpiaparabrisas» llevan acetona dentro y que la etiqueta no lo dice.
**Por qué falla:** `first-layer-issues.md:37` dice «Nail polish remover or **brake-cleaner**, **can also contain** acetone (acetates)». Es una posibilidad, no composición universal. Brake-cleaner es limpiador de frenos, no limpiaparabrisas. La fuente tampoco afirma que la etiqueta o composición oculten la acetona. «Sin decirlo» ya aparece en cooked `:148–151,615` y no queda respaldado por raw.
**Qué hacer:** conservar el producto correcto y el modal «pueden contener»; retirar las afirmaciones no verificadas sobre etiquetas. Es un aviso de seguridad, no un detalle estilístico.

### 4 · Bloqueante · La torre de purga se convierte en parte unida a la pieza

**Dónde:** líneas 361–364 y 620–622.
**Qué dice:** que la torre sale con la pieza, que no se separa antes y que no hay nada que separar/cortar.
**Por qué falla:** Bambu `filament-guide-material-table.md:78` dice que se flexione la chapa para soltar **el modelo y la torre de purga, si la hay**. No dice que estén unidos, que deban soltarse simultáneamente ni que cortar una base para separarlos corte la pieza. Cooked `:325–327` inventa esa tercera instrucción a partir de una conjunción.
**Qué hacer:** conservar enfriar y flexionar para liberar ambos elementos de la chapa, sin introducir unión, orden de separación o corte.

### 5 · Importante · Se elige un umbral y se llama conservador en el sentido inverso

**Dónde:** líneas 389–398.
**Qué dice:** que 70 °C es la lectura «más conservadora» para abrir puerta/quitar tapa con PETG.
**Por qué falla:** Bambu `filament-guide-material-table.md:89–92` recomienda la acción por encima de **60 °C**, y la tabla `:102–103` por encima de **70 °C**. El artículo muestra bien la discrepancia, pero escoger el segundo retrasa la mitigación entre 60 y 70 °C; no demuestra mayor prudencia frente al exceso de calor. La fuente no decide cuál manda. Cooked `:431–434` ya etiqueta 70 como conservador sin justificarlo.
**Qué hacer:** publicar la discrepancia sin resolverla en una recomendación atribuida al fabricante, o identificar explícitamente el criterio editorial y su alcance. No llamar más preventiva a la activación tardía.

### 6 · Bloqueante · Semántica de 0, ausencia y panel sin respaldo

**Dónde:** líneas 534–541, 566–572 y 624–626; también 287–288 y 637–638.
**Qué dice:** «ninguna es un fallo del analizador», que algunos slicers escriben 0 en la cabecera para indicar que no usan cama, que el panel trata 0 y ausencia igual y que avisa de soportes/voladizos.
**Por qué falla:** Bambu `filament-guide-material-table.md:115` sólo dice que **0 en el preset impide laminar** hasta poner un valor no nulo. No describe escritura de 0 en G-code. Orca `material-temperatures.md:49` lista variables de configuración, no explica cómo llegan a una cabecera o cómo las interpreta este panel. Cooked `:273–281` tampoco establece esos comportamientos. El bloque de `bed_temperature` sí está marcado como dato interno no respaldado por las fuentes, pero estas otras afirmaciones no. Decir primero que 0 y hueco son distintos y luego que «desde fuera son el mismo hueco» exige documentar el comportamiento que los colapsa.
**Qué hacer:** retirar estas explicaciones causales/garantías o documentarlas como datos internos antes de cocinar/publicar. Mantener separado el rechazo de un preset de Bambu del significado de un valor en el archivo. La implementación no se ha inspeccionado en este lint.

### 7 · Importante · Efectos posibles convertidos en progresión y diagnóstico excluyente

**Dónde:** líneas 208–215, 230–242 y 640–643.
**Qué dice:** una progresión fija que acaba en daño mecánico; vincula el aviso de daño a PEI a subir la cama; descarta la cama para separaciones internas.
**Por qué falla:** Orca `material-temperatures.md:59` enumera **posibles** efectos de cama fría con «or» y daño **potencial**, no etapas inevitables ni daño confirmado. Prusa `first-layer-issues.md:25` advierte de adhesión excesiva para determinados materiales en PEI lisa, sin decir que ese párrafo sea un efecto de cama demasiado caliente. Y excluir temperatura de cama en `:640–643` contradice la misma cita de Orca sobre «weak layer bonding» y el apartado propio de cama fría. Cooked contiene las citas, no esas exclusiones/certezas.
**Qué hacer:** preservar alternativas, posibilidades y alcance de cada fuente. Remitir a diagnóstico de capas sin asegurar que la cama no puede intervenir.

### 8 · Importante · Cámara: se inventa una regla que produce los umbrales y se excluye la cama

**Dónde:** líneas 400–420.
**Qué dice:** que la regla de Orca produce los umbrales concretos de Bambu; «la cámara es el factor y no la cama».
**Por qué falla:** Orca `material-temperatures.md:78` recomienda vigilar que la cámara no supere la temperatura de deformación. No deduce 45 °C de **cama** para PLA ni 60/70 para PETG. Bambu `:82–92` publica condiciones de cama y matices ambientales; no identifica la frase de Orca como su cálculo. Orca `:67–68` dice que la cámara es **un factor importante**, no que la cama deje de serlo. Ambas exageraciones ya están en cooked `:111–117,123–128`.
**Qué hacer:** presentar reglas complementarias de fuentes distintas, sin derivación numérica no documentada ni exclusión de la cama.

### 9 · Importante · Superlativo incompatible con la cifra dudosa que sí se menciona

**Dónde:** líneas 164–171.
**Qué dice:** 130 °C es la cifra de cama más alta de las tres fuentes; a continuación reconoce 150 °C para PEI en una de ellas.
**Por qué falla:** la fila `filament-material-guide.md:31` contiene 150, con dudas de alineación anotadas. Excluir una fila de la tabla publicada por fiabilidad no hace que el número deje de estar en la fuente. Cooked `:65,71–72` contiene ambos y no justifica el superlativo general.
**Qué hacer:** limitar la comparación a las filas consideradas legibles/publicadas. Mantener el 150 como dudoso, no usarlo como recomendación.

### 10 · Importante · PETG HT: cifra de boquilla convertida en boquilla distinta

**Dónde:** líneas 193–197 y 589–590.
**Qué dice:** PETG HT tiene «su propia boquilla».
**Por qué falla:** Prusa `filament-material-guide.md:13,15–16` distingue **temperaturas de boquilla**: PETG 215–270 y PETG HT 270 °C. La columna de boquilla endurecida dice «No» para ambos. No establece una boquilla de hardware propia. Cooked `:446–449` arrastra la misma redacción.
**Qué hacer:** escribir que tiene su propia **temperatura recomendada de boquilla**, no una boquilla distinta. La separación de 110 °C de cama para HT frente a 70–90 para PETG sí está respaldada.

### 11 · Importante · Afirmación de coste sin cocinar ni respaldar

**Dónde:** líneas 633–635.
**Qué dice:** «La temperatura de cama no cuesta dinero por sí sola. Lo que cuesta es el filamento [...]».
**Por qué falla:** ninguna de las seis fuentes ni el cooked sostiene esa exclusión de coste. Declarar que este artículo no calcula costes es una decisión editorial; afirmar qué no cuesta es un dato distinto.
**Qué hacer:** limitar el párrafo al alcance editorial o retirarlo. No sustituirlo por cifras económicas sin pasar por el pipeline.

### 12 · Menor · Relleno y relación de cooked no cubierta

**Dónde:** líneas 183–184 y 224; relación de cooked `:613`.
**Qué dice:** «El PETG es el material [...] donde el error más caro está en una fila que se lee por encima»; «Aquí los efectos van en dos direcciones, y la segunda se olvida».
**Por qué falla:** son anuncios sin dato concreto; las tablas y párrafos siguientes ya aportan el contenido. Además cooked promete `[[slicer|Qué slicer escribió esto]]`, pero la lista «Si te interesa» no nombra esa página. Hablar del slicer como herramienta no equivale a conservar la relación editorial prometida.
**Qué hacer:** retirar anuncios de relleno y conciliar la relación a `slicer`: nombrarla con sintaxis wiki o indicar en la siguiente vuelta de cooked que se descarta. No es un enlace roto: es cobertura de relaciones incompleta.

## Trazabilidad que sí pasa

| Datos o citas | Evidencia cruda comprobada |
|---|---|
| PLA/PLA-CF, PETG, ABS, ASA, TPU, PC y PA por pegamento | `temperatura-cama-bambu-wiki-filament-guide-material-table.md:66–74` |
| PLA, PLA-CF, TPU y PETG por chapa; pegamento para Engineering; versión antigua | mismo fichero `:96–116` |
| PLA, PETG/HT, ABS, ASA, PC, Flex y filas menos habituales de Prusa | `temperatura-cama-prusa-kb-filament-material-guide.md:13–31`, con PEI declarado dudoso |
| Once filas de Orca y ausencia de PETG; margen típico ±5 °C | `temperatura-cama-orcaslicer-wiki-material-temperatures.md:24–35,56` |
| Primera capa/resto y doce variables | Orca `:49–54`; la condición multi-bed está en `:53` |
| Elephant foot, Tg−5–10 °C, obstrucción por cámara alta, control desactivado y filtración | Orca `:60–64,78–90`; no se han usado para demostrar las derivaciones señaladas arriba |
| IPA 90 %, jabón tibio, restricciones de acetona, agente separador y cuidado al flexionar | `temperatura-cama-prusa-kb-first-layer-issues.md:19–37,54` |
| PLA no exige cama; reblandecimiento de la pieza >60 °C; algunas variantes se pegan con acetona | `temperatura-cama-prusa-kb-pla.md:18–23,54` |
| Incremento de cama +5–10 °C y configuración por PrusaSlicer | `first-layer-issues.md:66`; las sumas 60+5=65 y 60+10=70 son correctas |
| Antes/después de Zakalawe, consejo de Lichtjaeger y rutina de otro usuario | `warping-pla-prusa-forum-adjusting-settings-warping-pla.md:14–37,42–52,92–116` |

Las citas largas en inglés existen en sus cuerpos de fuente. Se comprobaron por partes las que cruzan líneas en el hilo: antes `:20–23`, brim `:46–47`, limpieza `:49–50`, Fusion `:96–97`, velocidad `:33–34`, raft `:36–37`, lavado `:106–107` y aceites `:111–112`. Las otras cinco fuentes tienen el cuerpo en líneas largas. Se aceptan cambios de énfasis, puntuación de cierre y apóstrofo tipográfico, sin confundirlos con frases inventadas. El problema principal es lo que el artículo **deduce después** de citas reales.

El párrafo `:490–493` sí mantiene correctamente que el hilo no informa temperatura final, cambió dos variables y dice «seemed to». Esa cautela debe trasladarse también a `warping-pla`, donde se pierde.

## Cobertura y notas que no bloquean

- Las seis URLs de `sources` tienen exactamente ese `url:` en raw, sin duplicados. No se ha comprobado disponibilidad HTTP actual.
- Relaciones a artículos existentes: `warping-pla` y `separaciones-entre-capas`. Páginas aún pendientes: `adhesion-primera-capa`, `enclosure-y-warping` y `material`. Son referencias `[[slug|texto]]`, no enlaces rotos.
- No hay enlaces Markdown normales a páginas internas pendientes. La relación a `slicer` que falta se anota en el fallo 12, por cobertura, no por inexistencia de esa página.
- `bed_temperature` está declarado como dato interno no respaldado por las fuentes, y `bed_temperature_initial_layer_single` se declara no verificado. Esta revisión no confirma la implementación ni convierte notas del recolector en documentación del analizador.
- Las diferencias de agua tibia/caliente y acetona entre fabricantes se citan de forma visible. Recomendación futura: mantener los procedimientos acotados a las chapas/marcas descritas; que Bambu no prohíba agua tibia no demuestra por sí solo una equivalencia de limpieza.
- Varias inferencias incorrectas nacen en cooked. La nueva vuelta debe corregir esa capa antes de redactar, sin tocar raw ni sobrescribir informes previos.
