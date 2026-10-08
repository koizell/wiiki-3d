---
titulo: Temperatura de cama
tema: temperatura-cama
fuentes:
  - wiki/raw/temperatura-cama-bambu-wiki-filament-guide-material-table.md
  - wiki/raw/temperatura-cama-orcaslicer-wiki-material-temperatures.md
  - wiki/raw/temperatura-cama-prusa-kb-filament-material-guide.md
  - wiki/raw/temperatura-cama-prusa-kb-first-layer-issues.md
  - wiki/raw/temperatura-cama-prusa-kb-pla.md
  - wiki/raw/warping-pla-prusa-forum-adjusting-settings-warping-pla.md
cocinado: 2026-10-03
revisado: 2026-10-04
---

# Temperatura de cama

> **Nota de revisión (quinta vuelta del material cocinado, sobre el brief
> `temperatura-cama-quirurgico`).** Corrige **cinco defectos** señalados por
> `wiki/reviews/temperatura-cama-revision-8.md`, y **sólo cinco**: los doce defectos de la
> séptima vuelta siguen resueltos y no se han tocado. Los dos de fondo **nacían en este
> fichero**, así que también aquí: **el PETG tiene dos rangos y no tres fuentes** —la tabla de
> OrcaSlicer no tiene fila de PETG, así que el «60, 70 y 90» no tenía de dónde salir—, y **la
> banda de contradicción del umbral de cámara es de 60 a 70 °C**, no «por encima de 60»: por
> encima de 70 las dos mitades de la página de Bambu recomiendan lo mismo. Los otros tres: la
> afirmación de que `first-layer-issues` «no publica ninguna cifra de cama», que es **falsa**
> contra el fichero crudo —su único número es el incremento de +5–10 °C sobre el perfil—, la
> equiparación de la limpieza de Bambu con la inmersión que Prusa prohíbe —Prusa prohíbe
> **sumergir**, Bambu manda **limpiar la superficie**, y son dos acciones que ninguna fuente
> equipara—, y la cita de OrcaSlicer cerrada en «for each Bed type», justo donde empezaba la
> condición que la limita. Cada corrección lleva el pasaje crudo al lado. Lo demás —las tablas
> de los tres fabricantes, el recorrido de limpieza, el antes y después del hilo y el bloque
> del campo opcional— queda como estaba.

> **Nota de revisión (cuarta vuelta del material cocinado).** Esta vuelta no repite las
> anteriores: corrige los doce defectos de
> `wiki/reviews/temperatura-cama-revision-7.md`. **Todos nacían en este mismo fichero, y
> ninguno en `wiki/raw/`.** Lo que cambia por fondo son cuatro cosas: **se retira la
> exclusividad de la chapa de Prusa** —su 60 °C no está condicionado a PEI—, **el 0 de Bambu
> deja de ser un dato del G-code** y pasa a ser lo que dice, un comportamiento del *preset* en
> Bambu Studio, **la torre de purga deja de estar unida a la pieza**, y **la frase de
> OrcaSlicer sobre la cámara deja de producir los umbrales de Bambu**. Los cambios de alcance
> conservan el verbo de la fuente en cada caso: «no elimina **bien**» en vez de «no elimina»,
> «**pueden** contener» en vez de «llevan», «su propia **temperatura** de boquilla» en vez de
> «su propia boquilla». Se conservan sin tocar las tablas de los tres fabricantes, el
> recorrido de limpieza, el bloque de variables de Orca y el antes y después del hilo, que las
> revisiones anteriores aprobaron. Lo que se ha eliminado por completo está en `## Tirado`,
> con su motivo.
>
> **Nota de revisión (tercera vuelta del material cocinado).** Esta vuelta no repite
> el repaso anterior: la contradicción del PETG en la página de Bambu, la acetona
> prohibida por uno y autorizada por el otro, y el dato de la cama sucia ya estaban
> resueltos. Lo que queda es otra cosa — **había texto en `wiki/raw/` que nunca llegó
> aquí**. Dos avisos de seguridad sin cocinar —la acetona que viene **dentro** de otros
> disolventes, y la espera a que la pieza se enfríe antes de soltarla—, una
> contraindicación de lavado que ha salido al hacerlo, y trece puntos sueltos que estaban
> en las fuentes y en ninguna lista. Dos de ellos han resultado ser **contradicciones
> nuevas** (5 y 6), que es la clase de cosa que no se busca: se encuentra. Lo que se ha
> mirado y se ha dejado fuera está en `### Revisado y no incorporado`, al final de
> `## Sin respaldo`, para que el silencio no se confunda con no haber leído.
>
> **Nota de revisión (segunda vuelta).** Se ha repasado todo el fichero contra
> `wiki/raw/` con tres preguntas: quién dijo la afirmación, si es tan exacta como
> aquí, y si el nombre propio es el correcto. Tres cambios de fondo: **una cita
> inventada que se ha borrado**, **una paráfrasis de foro que se ha reescrito**,
> y **una contradicción dentro de la propia página de Bambu que no estaba anotada**.
> El apartado 4 recoge lo que no se pudo resolver.

## Afirmaciones

### Las cifras, por material y por fabricante

Tres fabricantes dan cifras de cama, y para el PLA **no coinciden**. Eso no es un
problema de las fuentes: es el contenido del artículo.

- **Bambu Lab**, por filamento y pegamento: PLA y PLA-CF **35 – 65 °C**. PETG 60–80.
  ABS y ASA 90–100. TPU 30–45. PET-CF/GF 80–100. PC 100–120. PA y variantes 90–110.
  — [Bambu Lab](https://wiki.bambulab.com/en/general/filament-guide-material-table)
- **Bambu Lab**, por filamento y **chapa**, que es una segunda tabla de la misma página y
  no la misma: con la **Cool Plate el PLA pide 35 – 45 ℃** y con la Engineering Plate,
  la Smooth PEI y la Textured PEI pide **45 – 65 ℃**. El TPU baja a 30–35 ℃ en
  Engineering Plate y sube a 35–45 ℃ en las otras dos, en las que sí tiene valor.
  — [Bambu Lab](https://wiki.bambulab.com/en/general/filament-guide-material-table)
- **Prusa Research**, en su tabla de materiales: PLA **50 – 60 °C**. PETG 70–90.
  ASA 90–110. ABS 95–110. PC 100–115. Flex 40–85. nGen 90. PVB 75.
  — [Prusa Research](https://help.prusa3d.com/filament-material-guide)
- **Prusa Research**, en la ficha del PLA: «Recommended bed temperature: **60 °C**»,
  con «Heatbed: Satin or Smooth PEI sheet will provide the best adhesion».
  — [Prusa Research](https://help.prusa3d.com/article/pla_2062)
- **OrcaSlicer**, en su tabla de rangos estándar —son once filas de material—: PLA
  **50 – 60 °C** de cama, cámara ambiente. ABS 90–100, ASA 90–100, PC 100–120, TPU 40–60.
  **No tiene fila de PETG**: los once son PLA, ABS, ASA, Nylon 6, Nylon 12, TPU, PC, PC-ABS,
  HIPS, PP y Acetal (POM), así que para el PETG esta tabla no aporta nada y **no cuenta como
  una tercera voz** a favor ni en contra (ver la contradicción 5).
  — [OrcaSlicer](https://www.orcaslicer.com/wiki/material_settings/filament/material_temperatures.html)
- **Las filas menos conocidas de las dos tablas, que no se habían usado todavía y que
  sirven para los materiales que no son PLA, PETG ni ABS.** De Prusa: PETG HT **110 °C**,
  HIPS 100–110, PP 70–100, CPE 90–110, Glow in the dark 85, PVA / BVOH 60, Wood / metal
  filled 60–100, PA (Nylon) 70–115, y una fila agregada «Composite materials» de
  40–120 °C. De OrcaSlicer: Nylon 6 y Nylon 12 **90–110 °C**, PC-ABS 95–110, HIPS 90–110,
  PP 80–105, Acetal (POM) **100–130 °C**, que es **el valor de cama más alto entre las
  filas que en este lote se han podido leer con confianza**. Ese superlativo va acotado así a
  propósito: hay un 150 °C en la tabla de Prusa que no entra en la comparación porque su fila
  viene desalignada (ver las advertencias siguientes).
  — [Prusa Research](https://help.prusa3d.com/filament-material-guide),
  [OrcaSlicer](https://www.orcaslicer.com/wiki/material_settings/filament/material_temperatures.html)

  **Dos advertencias al publicarlas.** «Composite materials, 40–120 °C» es una fila
  que **agrega** composites distintos, no un material: no se puede leer como «el
  filamento con fibra va a 120 °C» sin más. Y la fila de **PEI (150 °C) queda fuera de la
  comparación**, porque viene desalignada en el original. **Que quede fuera no significa que
  no esté en la fuente:** el 150 °C es un dato que Prusa publica en esa tabla, y excluirlo por
  poco fiable es una decisión editorial, no una ausencia. De ahí el acotado del superlativo, y
  de ahí también que **el 150 °C no se publique como recomendación de cama** —sí se puede citar
  marcado como dudoso (ver `## Tirado`).
- **Las tablas son genéricas, y las dos lo dicen.** «Actual optimal temperatures may vary
  based on **specific filament brands and printer models**. Always refer to the filament
  manufacturer's recommendations and calibrations for best results.» Es la razón por la
  que las cifras del artículo no son un valor de tu bobina concreta.
  — [OrcaSlicer](https://www.orcaslicer.com/wiki/material_settings/filament/material_temperatures.html)

### Por qué hay un rango y no una cifra

- «Most materials have a relatively broad optimal range for bed temperature
  (typically **+/-5°C**)». Es la frase que explica por qué las tablas dan intervalos, y
  no sale en ninguna de las otras fuentes.
  — [OrcaSlicer](https://www.orcaslicer.com/wiki/material_settings/filament/material_temperatures.html)

### Qué pasa si la cama está demasiado fría

- «If the bed temperature is too low, the filament may fail to adhere properly, leading
  to **warping, weak layer bonding, or complete detachment**. In severe cases, the
  printed part may dislodge entirely and stick to the nozzle or other printer
  components, potentially causing mechanical damage.»
  — [OrcaSlicer](https://www.orcaslicer.com/wiki/material_settings/filament/material_temperatures.html)

  **El alcance de la cita, que hay que conservar al parafrasear.** La fuente **enumera
  alternativas con «or»**, no etapas: warping **o** unión débil entre capas **o** despegue
  completo. Y el desenlace grave va marcado como **potencial** —«potentially causing mechanical
  damage»—, no como daño confirmado. La cita se puede dar entera; lo que no se puede escribir
  es una secuencia ordenada que acabe en daño mecánico, porque esa secuencia no está en el
  texto.

  **Y una advertencia de alcance para el redactor.** «weak layer bonding» es exactamente lo
  que trata `separaciones-entre-capas`, así que **esta página no puede renunciar a la cama en
  ese caso**: la cita no dice que la temperatura de cama deje de intervenir en una separación
  interna, y enumerar desenlaces posibles no excluye ninguno —el apartado de cama caliente de
  esta misma página va en sentido contrario. Si el artículo manda al lector a la otra página,
  es para el **diagnóstico**, nunca para excluir la cama.

### Qué pasa si está demasiado caliente

- «If the bed temperature is too high, the lower layers can overheat and soften
  excessively, resulting in deformation such as **elephant foot**».
  — [OrcaSlicer](https://www.orcaslicer.com/wiki/material_settings/filament/material_temperatures.html)
- El daño no es sólo en la pieza: «PETG, ABS, ASA, XT, and CPH filaments are an
  exception - the adhesion may be too strong, and you can damage your **Smooth PEI
  sheet**». La página **también propone el remedio**: «We recommend using a separating
  agent (e.g. a glue stick)», y manda a las guías de material.
  — [Prusa Research](https://help.prusa3d.com/article/first-layer-issues_1804)

  **Dónde está ese párrafo y qué no dice.** Sale en la sección de limpieza con IPA, bajo el
  epígrafe «Isopropyl alcohol - smooth, satin, textured sheets», y lo que advierte es que con
  esos materiales la adhesión puede resultar **demasiado fuerte** sobre la PEI lisa. **La
  página no lo presenta como un efecto de la cama demasiado caliente**, y en este párrafo no
  menciona ninguna cifra.

  **Lo que sí se puede decir de las cifras de esa página, con su alcance exacto.**
  `first-layer-issues` **no publica ninguna temperatura de cama recomendada por material ni
  por chapa**, y **su único número de cama es el incremento de +5–10 °C sobre el valor del
  perfil** (`first-layer-issues:66`), que es otra cosa y no un valor recomendado para ningún
  filamento. Ese incremento está cocinado en «Cómo se sube, y cuánto», más abajo, con su
  cita. **Publicable:** las dos mitades, con su matiz. **No publicable: «no publica ninguna
  cifra de cama en todo el lote»**, que es falso contra el fichero crudo, y además se
  contradice con lo que este mismo apartado le atribuye a esa misma página más abajo: es la
  clase de afirmación que este paso existe para cazar.

  **Y que la nota del recolector de ese fichero no se cite como si cerrara el asunto.** Dice
  «esta fuente no da ninguna cifra de temperatura de cama» (`first-layer-issues:86–87`), pero
  dos párrafos más abajo admite que el +5–10 °C «es el único sitio de la página donde sale una
  cifra» (`:95–97`): su primera frase es imprecisa y no puede usarse como respaldo de la
  versión fuerte. Lo que la nota quiere decir es que **no hay cifra recomendada**, no que no
  haya cifra.

  Publicable además, y en el mismo párrafo: la adhesión excesiva es un riesgo con PETG,
  ABS, ASA, XT y CPH sobre PEI lisa, y el separador es el remedio que da la misma frase.
  **No publicable:** «subir la cama provoca adhesión excesiva», que encadenaría un párrafo de
  limpieza con un efecto térmico que la fuente no enuncia.
- **La primera capa tiene su propia temperatura, y es una decisión aparte.** En la
  sección Bed, después de la lista de variables: «Set the bed temperature for the selected
  material for **First Layer and Other Layers** for each Bed type **if Support multi bed
  types is enabled in printer settings**», y «Using a higher temperature for **the first
  layer** can help improve adhesion to the build surface but be cautious of potential
  deformations like elephant foot». Eso es lo que explican las doce variables del apartado de
  abajo: **dos por chapa**, no una.
  — [OrcaSlicer](https://www.orcaslicer.com/wiki/material_settings/filament/material_temperatures.html)

  **La primera cita va condicionada, y la condición es parte de la instrucción.** La frase
  no termina en «for each Bed type»: sigue «**if Support multi bed types is enabled in
  printer settings**» (`material-temperatures:53`). Lo que la limita es que esté activo el
  soporte de varios tipos de cama en los ajustes de la impresora, así que **sin ese soporte
  la instrucción no se aplica tal como está escrita**. Hay dos formas de publicarla y las dos
  valen: **llevar la condición dentro de las comillas**, o **cortarla con puntos suspensivos**
  justo donde empieza —«…for each Bed type»— y decir que va condicionada. Lo que **no** vale
  es cerrar las comillas en «Bed type» y presentar el resto como lo que la página manda sin
  la condición: el resto de las citas de este apartado se miden con tres reglas —modal,
  alcance, condición— y ése era **el único sitio donde se saltaba una de las tres**.
- **Una segunda regla, de otra casa, y complementaria de la de Bambu.** «It is important to
  monitor the chamber temperature to ensure that it does not exceed **the filament's
  deformation temperature**».
  — [OrcaSlicer](https://www.orcaslicer.com/wiki/material_settings/filament/material_temperatures.html)

  **Las dos reglas van juntas y ninguna produce a la otra.** OrcaSlicer enuncia el criterio —
  que la cámara no pase de la temperatura de deformación del filamento— **sin deducir ninguna
  cifra**: de esa frase no salen los 45 °C del PLA ni los 60/70 del PETG. Bambu publica
  umbrales ya calculados por material, con sus notas de ambiente al lado. Publicable como
  **dos reglas de dos fuentes distintas que se refuerzan**: una dice qué vigilar, la otra da el
  número. **No publicable:** «la regla de OrcaSlicer explica por qué Bambu pone 45 °C», que
  es una derivación que ninguna de las dos fuentes enuncia y que por eso no puede escribirse
  como si saliera de ellas.
- **El motivo por el que la temperatura de cama no basta, en tres partes.** «In general,
  following the manufacturer's recommendations, **maintaining a clean bed (free from oils
  or fingerprints), ensuring a stable chamber temperature, and having a properly leveled
  bed** will produce reliable results». Ni una de las tres es la cifra.
  — [OrcaSlicer](https://www.orcaslicer.com/wiki/material_settings/filament/material_temperatures.html)
- **Y para los materiales que se contraen mucho, la cámara es un factor importante.** «For
  challenging prints involving materials with **high shrinkage (e.g., nylons or
  polycarbonate)** or geometries prone to warping, dialed-in settings are critical. In
  these cases, **chamber temperature becomes a major factor in preventing detachment** and
  ensuring print success.»
  — [OrcaSlicer](https://www.orcaslicer.com/wiki/material_settings/filament/material_temperatures.html)

  **«Un factor importante», y no «el factor».** Es lo que dice la frase, y el matiz importa:
  un factor importante no desplaza a los demás, así que **esta cita no autoriza a excluir la
  cama** de ningún diagnóstico. La fuente habla de que la cámara *previene* el despegue en
  materiales que se contraen mucho; no dice que la temperatura de cama deje de intervenir, y
  en ese párrafo no da ninguna cifra de cama.
- **El coste de la cámara caliente, que es el otro lado de «súbela y abre la tapa».** «For
  high-temperature materials like ABS, ASA, PC, and PA, a higher chamber temperature can
  help suppress or reduce warping and potentially lead to higher interlayer bonding
  strength. **However, at the same time, a higher chamber temperature will reduce the
  efficiency of air filtration for ABS and ASA.**» Filtra peor quien más la necesita.
  — [OrcaSlicer](https://www.orcaslicer.com/wiki/material_settings/filament/material_temperatures.html)
- **El reverso de esa adhesión excesiva, del lado de la limpieza, es el acetona —no el
  IPA.** Es lo que la misma página dice, y conviene decirlo porque es el único sitio
  donde el acetona aparece como aparece: la PEI lisa «can lose its adhesive powers after
  a couple of hundred hours», y entonces «wipe the surface thoroughly with acetone to
  restore the adhesion», «only around once per month», porque «Extended use makes PEI
  surface brittle». Y con una prohibición explícita: «For the textured and the satin
  steel sheets, do not use acetone at all!»
  — [Prusa Research](https://help.prusa3d.com/article/first-layer-issues_1804)
- **La prohibición no acaba en la primera frase.** Literal, en la línea siguiente: «Other
  chemical solvents, like **Nail polish remover or brake-cleaner, can also contain acetone
  (acetates)**».
  — [Prusa Research](https://help.prusa3d.com/article/first-layer-issues_1804)

  **Tres precisiones que la cita obliga a conservar. Es un aviso de seguridad, no un detalle
  de estilo.**
  1. El segundo producto es **brake-cleaner**, limpiador de frenos. No es un limpiaparabrisas
     ni ningún producto de automoción ligero, y cambiarle el nombre cambia lo que el consejo
     significa para quien lo busca en un cajón.
  2. El verbo es **«can also contain»**: es una posibilidad sobre esos productos, no una
     composición. La fuente **no afirma que todos los quitaesmaltes y limpiadores de frenos
     lleven acetona**, ni que ninguno la lleve: dice que pueden.
  3. **La fuente no dice nada de las etiquetas.** No afirma que el bote oculte la acetona, ni
     que la composición no la declare, ni que el/envase tenga que decirlo. Lo único que da es
     el nombre de dos productos que pueden contenerla.

  **Lo que sí se puede concluir, y con qué alcance.** La prohibición de Prusa es sobre el
  **acetona** en chapa texturizada y satinada. Para quien tenga uno de esos dos productos en la
  estantería, **la fuente no le da ninguna forma de saber por el nombre si es seguro**, y eso
  es lo que aporta la frase. **Lo que no se puede escribir** es que esos productos «llevan
  acetona dentro sin decirlo en la etiqueta»: eso no está en ninguna parte del fichero, y una
  vuelta anterior lo dio por hecho dos veces. **Las dos frases van juntas en la cita** —citada
  sólo la primera, el aviso pierde su mitad útil—, y eso sí es cierto y sí se puede decir.
- **Y que Prusa prohíba el acetona en la chapa no significa que no lo recomiende en
  ninguna parte.** La misma Knowledge Base, en la ficha del PLA, lo da como pegamento:
  «Some of the PLA filaments can be also partially dissolved and glued with **acetone**
  (or you can simply glue it with superglue)». **No es una contradicción**: la
  prohibición es sobre la *chapa*, y esto es sobre la *pieza*. Pero las dos frases van
  a aparecer el mismo día en la misma búsqueda, y quien lea la segunda sin la primera
  concluye que Prusa ha banido el acetona de la impresión 3D.
  — [Prusa Research](https://help.prusa3d.com/article/pla_2062)
- **Hay un techo, y se puede calcular**: «As a general guideline, you can use the glass
  transition temperature (Tg) of the material and **subtract 5–10 °C** to estimate a safe
  upper limit for bed temperature.»
  — [OrcaSlicer](https://www.orcaslicer.com/wiki/material_settings/filament/material_temperatures.html)

### Cómo se sube, y cuánto

- «If you are experimenting with new materials that don't adhere well, you can try to
  **increase the heatbed temperature by 5-10 °C**. This way the plastic will stick a bit
  better.» Ojo: es un incremento **sobre el valor del perfil**, no el valor del
  fabricante, y la propia página lo dice en la frase siguiente.
  — [Prusa Research](https://help.prusa3d.com/article/first-layer-issues_1804)
- La misma fuente dice que «PrusaSlicer will configure them correctly based on the
  selected material, so you don't need to adjust the temperatures manually on the
  printer itself».
  — [Prusa Research](https://help.prusa3d.com/article/first-layer-issues_1804)

### El hilo de foro: qué pasó y qué no se puede concluir de él

Este hilo es el único **antes y después** del lote, y por eso vale — pero lo que
documenta es una secuencia, no una prueba. Es lo que cuenta, literal:

- **El antes.** «I've tried adding the brim, and decreasing the bed temperature down to
  50 and then 40 degrees», con la pieza warpeando tanto que «it splits off from brim and
  completely loses bed adhesion», ambiente a unos 20 °C, sobre PEI lisa.
  — [Zakalawe, foro de Prusa](https://forum.prusa3d.com/forum/original-prusa-i3-mk3s-mk3-how-do-i-print-this-printing-help/adjusting-settings-for-warping-of-pla/)
- **La respuesta, y son tres cosas, no una.** «From the gaps in your brim, I can say you
  can go a bit lower with your first layer height». «For a cleaned bed, the bed in your
  picture looks dirty. Try to wash it with soap water and wipe it with acetone (once a
  month).» Y «You should set your bed temperature higher and not lower **(max 65°C)**».
  — [Lichtjaeger, foro de Prusa](https://forum.prusa3d.com/forum/original-prusa-i3-mk3s-mk3-how-do-i-print-this-printing-help/adjusting-settings-for-warping-of-pla/)
- **El después, con su matiz entero:** «Thanks, **I increased the bed temperature and
  chamfered the edges of the shape in Fusion**, that seemed to make a big difference».

  Tres límites que el redactor no puede saltarse: **subió dos cosas a la vez**, así que
  el hilo no aísla la cama; **no dice a qué temperatura subió**, de modo que el 65 °C
  nunca aparece como algo probado; y lo dice **con «seemed to»**, que es una impresión
  del autor y no una medición. Que bajara la cama esté ya probado y falló sí se puede
  escribir, y es lo más firme que sale de aquí.
  — [Zakalawe, foro de Prusa](https://forum.prusa3d.com/forum/original-prusa-i3-mk3s-mk3-how-do-i-print-this-printing-help/adjusting-settings-for-warping-of-pla/)
- **Lo que el hilo también probó y falló, y faltaba.** «Google suggested a brim, lower
  bed temp, and **slower print speed, none of which helped so far**» (filas 33-34, partido
  a 80 columnas: buscar `helped so far` o `slower print speed`). Es el mismo tipo de dato
  que bajar la cama a 40 °C: **un fallo declarado por quien lo probó**, no una opinión.
  El «so far» es suyo y hay que conservarlo.
  — [Zakalawe, foro de Prusa](https://forum.prusa3d.com/forum/original-prusa-i3-mk3s-mk3-how-do-i-print-this-printing-help/adjusting-settings-for-warping-of-pla/)
- **Lo que sí funcionó, con su precio.** «Using a **three-layer raft did help**, but that
  made for a nasty surface finish on the part, and seems like rather overkill to fix
  this». Un raft que arregla el despegue arruinando la superficie: es el mismo patrón
  que el +5–10 °C, cambiar una cosa por otra, y por eso lo mismo no es «la cama» como
  respuesta única.
  — [Zakalawe, foro de Prusa](https://forum.prusa3d.com/forum/original-prusa-i3-mk3s-mk3-how-do-i-print-this-printing-help/adjusting-settings-for-warping-of-pla/)
- **El cuarto post, que es de otro usuario, habla de limpieza y no de temperatura.**
  Diagnostica la cama sucia y monta una rutina: «By the looks of the bed, soap and hot
  water is your best choice... but you might want to do an alcohol scrub first to get the
  old PLA residue off», «**Alcohol rinse: every few prints**», «Once in a while, an alcohol
  rinse is helpful to remove PLA residue. **It does not remove finger oils well**» y «**Handle
  the bed only by the edges**».

  **Fichero partido a 80 columnas: filas 106-107, 109 y 111-116.** Los tres fragmentos
  largos no salen con `grep` de una vez, porque la línea se parte por la mitad. Para
  comprobarlos: `soap and hot water is your best choice`, `Alcohol rinse: every few
  prints`, `remove finger oils well`, `Handle the bed only by the edges`.
  — [foro de Prusa, post del 28/06/2019](https://forum.prusa3d.com/forum/original-prusa-i3-mk3s-mk3-how-do-i-print-this-printing-help/adjusting-settings-for-warping-of-pla/)

  **Dos de estas tienen respaldo de fábrica, y una es la que explica el diagnóstico de la
  cama sucia. Pero el respaldo es por el sentido, no palabra por palabra.**
  - «It does not remove finger oils well» es **del foro**, y es la observación de un usuario
    sobre su cama: **no las quita bien**, no dice que no quite ninguna.
  - La Knowledge Base, en el apartado de jabón, dice que el agua con jabón «will dissolve
    **some oils and sugars** that gather over time and **that IPA does not remove**». Son
    **algunos** aceites y azúcares, y el sujeto es el IPA. **La ficha no dice que el aceite de
    los dedos no se quita nunca**, ni identifica expresamente esos «oils» con las huellas.
  - Y «no toques la superficie con las manos» es la primera línea de esa misma página: «If you
    don't touch the print surface with your hands or dirty tools, then you don't have to clean
    it before every print».

  **Las dos frases se corroboran en el sentido —el IPA deja grasa que hay que atacar con
  jabón— y no en el alcance.** Convertirlas en «el IPA no quita el aceite de los dedos» sube
  el «algo» a «todo», y este mismo fichero lo dio antes por corroboración exacta. Se escribe
  **«no los quita bien»** y **«algunos aceites y azúcares»**, con cada frase atribuida a su
  fuente. **La frecuencia —«every few prints»— es sólo del foro y no la corroboran.**

### La chapa cambia la cifra, y no es un detalle

- La tabla por chapa de Bambu: el PLA pide 35–45 ℃ en Cool Plate y 45–65 ℃ en las
  otras tres. El TPU sale «**Not recommended**» en Cool Plate, y el PETG igual.
  — [Bambu Lab](https://wiki.bambulab.com/en/general/filament-guide-material-table)
- La chapa también cambia la **altura**: «With a powder-coated sheet, you should move
  your **live-Z lower**: Filament must fill in the sheet texture. However, you need to be
  careful and not move the nozzle too low, or you will damage your sheet!» Y la lisa
  «works better for printing parts that have a small contact area with the print
  surface».
  — [Prusa Research](https://help.prusa3d.com/article/pla_2062)
- **Y la lista de chapas es más larga que la tabla — con el alcance que realmente tiene.**
  En la misma frase: «PLA is printable **not only on PEI surface, but also on glass, Kapton
  tape, or using a glue stick**».
  — [Prusa Research](https://help.prusa3d.com/article/pla_2062)

  **Lo que esa página dice del 60 °C, y lo que no.** En la cabecera, «Recommended bed
  temperature: **60 °C**», **sin condicionarlo a ninguna superficie**; en la línea siguiente,
  «Heatbed: Satin or Smooth PEI sheet will provide the best adhesion», que es una
  recomendación de **adhesión**; y más abajo, que el PLA también se imprime sobre vidrio,
  Kapton o pegamento. De ahí sale lo que sí se puede escribir: **el 60 °C es la
  recomendación general de esa ficha**, las chapas PEI son las que mejor adhesión dan según
  ella, y **la página no da ninguna cifra distinta por superficie**.

  **Lo que no sale de ahí, y que una vuelta anterior le hizo decir:** que el 60 °C sea
  **exclusivamente** el valor de PEI, o que aplicarlo a vidrio o a Kapton sea inventarlo. La
  ficha **no restringe** el número a PEI ni declara falsa su aplicación a otra superficie. Del
  mismo modo, tampoco es cierto que la ficha recomiende las chapas PEI «sin decir a qué
  temperatura»: el 60 °C está en su cabecera, a tres líneas de la recomendación de chapa. Y
  por el mismo motivo **el 60 °C de Prusa no puede usarse para explicar la diferencia entre
  fabricantes**: la ficha no dice que su cifra sea «la de PEI» frente a otra superficie, así
  que no hay ninguna exclusividad que atribuírsela.

### Subir la cama tiene un segundo efecto: la cámara

- «Filaments with a softening temperature below 60 ℃ (e.g., **PLA**, PVA, TPU), when
  the heatbed is set above **45 ℃**: We recommend **opening the front door and/or removing
  the upper glass cover plate** to prevent excessive chamber heat from softening and
  deforming the filament.» Para el PETG el umbral cambia, y **no es el mismo número en
  las dos mitades de la página**: es la contradicción 4.
  — [Bambu Lab](https://wiki.bambulab.com/en/general/filament-guide-material-table)
- Del lado contrario: «**Low temperature Filaments like PLA can clog the nozzle if the
  chamber temperature is too high.**» Y para PLA, PETG, TPU, PVA y otros materiales de
  baja temperatura, el control de cámara «should be disabled (set to 0)».
  — [OrcaSlicer](https://www.orcaslicer.com/wiki/material_settings/filament/material_temperatures.html)

### Por qué el campo puede venir vacío

- «PLA **does not require a heated bed**, can be printed fast and with low temperatures
  (melting point is somewhere around 175 °C)». Los 60 °C de la misma página son una
  recomendación, no una exigencia del material.
  — [Prusa Research](https://help.prusa3d.com/article/pla_2062)
- **El 0 de Bambu es un dato del preset, y nada más.** «In Bambu Studio, if a heatbed
  temperature **in the filament preset** is set to **0 ℃**, the software will report that the
  filament is incompatible with slicing. Manually change the bed temperature to a non-zero
  value, and the prompt will disappear; slicing will then proceed according to your setting.»
  — [Bambu Lab](https://wiki.bambulab.com/en/general/filament-guide-material-table)

  **Qué admite esta frase y qué no.** Describe un comportamiento de **Bambu Studio sobre su
  preset de filamento**: con 0 ahí, el laminado queda bloqueado hasta poner un valor no nulo. Es
  un dato del programa de laminado, y ahí es donde se queda. Lo que **no** dice, y hay que
  dejarlo escrito para que no vuelva a crecer hacia ningún lado: **que algún slicer escriba un
  `0` en la cabecera del G-code para indicar que no usa cama**, ni que ese `0` sea «un valor
  puesto» frente a «un campo ausente», ni qué hace el analizador de este proyecto al
  encontrarlo. **Son tres cosas distintas** —un valor en un preset de un programa, un valor en
  un archivo, y lo que pinta un panel— y la fuente sólo cubre la primera.

  Lo que el artículo **sí** puede decir es lo verificado en `## Sin respaldo`: cómo pinta el
  panel un `0` y cómo pinta un campo que no está. Y **no son lo mismo**, lo que además deja
  sin base la frase «el panel los trata igual» y la que dice que «desde fuera son el mismo
  hueco».
- Los nombres literales de las variables que **sí** salen en la fuente de OrcaSlicer:
  `supertack_plate_temp`, `cool_plate_temp`, `textured_cool_plate_temp`,
  `eng_plate_temp`, `hot_plate_temp`, `textured_plate_temp`, y la gemela
  `_initial_layer` de cada una.
  — [OrcaSlicer](https://www.orcaslicer.com/wiki/material_settings/filament/material_temperatures.html)

  **Con su alcance.** Lo que sale en la fuente es una **lista de variables de configuración de
  la sección Bed**, con su tipo (`Integer list`) y su ejemplo de CLI. No explica cómo llegan
  esos valores a una cabecera de G-code, ni cómo los interpreta ningún lector. Lo que
  autoriza es **el nombre**, y nada más.

### Limpieza, porque es la otra mitad

- La mejor opción para ABS, PLA y muchos otros es **alcohol isopropílico al 90 %**; los
  productos de grado cosmético o dérmico llevan hidratantes y aceites que no valen.
  Con agua templada y jabón se disuelven «some oils and sugars that gather over time and
  that IPA does not remove». El acetono sólo en la PEI lisa, y «around once per month»,
  porque su uso prolongado «makes PEI surface brittle». Y una advertencia que se pierde
  de vista: al retirar una pieza de gran superficie hay que usar una espátula y tener
  cuidado al flexionar la chapa, «as the smooth PEI foil can tear» —que sale en la
  sección de pegamento, no en la de acetona.
  — [Prusa Research](https://help.prusa3d.com/article/first-layer-issues_1804)
- **Las tres contraindicaciones del lavado con jabón, que son concretas y no estaban
  cocinadas.** De la misma frase, completa: «a few drops of dish soap and **warm water
  (not hot!)**. This should **not be done often**, and **do not submerge the sheet
  completely in hot water** [...] Make sure to use **only dish soap** and **dry the sheet
  well before using it**». Tres cosas que se pueden hacer mal sin querer: echarle agua
  demasiado caliente, dejarla en remojo, y aclarar con un detergente de los de casa en
  lugar de jabón de platos.
  — [Prusa Research](https://help.prusa3d.com/article/first-layer-issues_1804)

  **Cuidado con esta una:** Prusa escribe «warm water (not hot!)» y Bambu escribe «hot
  water» para la misma operación. Es la contradicción 6, y no se resuelve aquí.
- Bambu dice lo mismo con otras palabras y una advertencia **más fuerte**: «Regularly
  clean the plate surface with dish soap and hot water to remove dust, grease, and other
  residues that affect adhesion» y «**Do not clean the plate with acetone**, as it may
  damage the surface». Donde Prusa concede el acetona en la PEI lisa, Bambu lo prohíbe
  en general.
  — [Bambu Lab](https://wiki.bambulab.com/en/general/filament-guide-material-table)

### Antes de soltar la pieza: hay que esperar a que se enfríe

De la sección **«2. Removing Prints»** de la página de Bambu, fila 78 del fichero. No
había ninguna palabra de esto en el material cocinado, y es la otra mitad de la
adhesión: una cama bien puesta no sirve de nada si la pieza se arranca en caliente.

- **Esperar.** «After printing, wait a few minutes until the plate and model have fully
  cooled before removing the print. This makes removal easier and helps **avoid
  scratching the plate or damaging the bottom of the model**.»
  — [Bambu Lab](https://wiki.bambulab.com/en/general/filament-guide-material-table)
- **Cómo se suelta, una vez fría: una acción, dos elementos.** «remove the build plate and
  **gently flex it** to release the model **and the purge tower (if any)**».
  — [Bambu Lab](https://wiki.bambulab.com/en/general/filament-guide-material-table)

  La acción cubre **los dos elementos a la vez**: quitar la chapa y flexionarla con cuidado
  libera el modelo y la torre de purga. **Y hasta ahí llega la fuente.** De la conjunción «the
  model **and** the purge tower» salen **dos cosas que liberar**, y no salen dos cosas unidas
  entre sí: la página **no dice** que la torre vaya pegada a la pieza, ni que haya que
  separarlas en algún orden, ni que cortar una base sirva para separarlas —de hecho, **no
  menciona cortar nada en ningún punto de esa sección**. Publicable: esperar a que enfríe,
  quitar la chapa, flexionar con cuidado, y sueltan modelo y torre. **No publicable:** «la
  torre va unida a la pieza», y todo lo que se derivaba de ahí, incluido el aviso de que quien
  busque su pieza puede acabar cortándola: son instrucciones que esta frase no contiene.

**Lo que dice la fuente y lo que no.** La fuente dice las dos cosas, y da el motivo de la
primera: rayar la chapa o **dañar la base de la pieza**. Lo que **no** dice —y por eso
no puede publicarse como si lo dijera— es que quitar en caliente deforma la base y que
ese resultado se confunde después con warping. Es una inferencia física razonable, pero
ninguna de las seis fuentes de este fichero la enuncia, y este artículo no la va a
enunciar como dato.

**Corroboración, y viene de la otra casa.** Prusa, en la misma página que recomienda no
tocar la chapa con las manos: «When removing prints with a large surface area, you may
have to assist the process using a spatula. Be gentle when flexing the sheet and
removing the print as **the smooth PEI foil can tear**». Dos fabricantes, el mismo gesto
—flexionar con cuidado— y el mismo riesgo sobre la chapa. Lo que **no** dice Prusa es
esperar a que enfríe: eso sale sólo de Bambu, y no lo corrobora nadie en este lote.
  — [Prusa Research](https://help.prusa3d.com/article/first-layer-issues_1804)

## Contradicciones

**No se resuelven aquí.** Se anotan con su matiz, y el redactor explica el matiz en
vez de elegir un número.

### 1. Para el mismo PLA hay tres cifras distintas: 35–65, 50–60 y 60

- Bambu: **35 – 65 °C**, y por chapa **35 – 45** en Cool Plate frente a **45 – 65** en
  las otras tres.
- Prusa (tabla de materiales): **50 – 60 °C**.
- Prusa (ficha del PLA): **60 °C**.
- OrcaSlicer: **50 – 60 °C**.

**El matiz, y el límite que no se puede cruzar.** Las cuatro cifras **no se explican por la
chapa**, y aquí está el error que este mismo fichero cometió: **que un rango esté contenido
en otro no demuestra que la chapa sea la causa de la diferencia.** 50–60 cae dentro de 45–65,
sí; pero eso también valdría para cualquier otro par de números, y **ninguna de las tres
fuentes dice que su cifra sea «la de PEI» frente a otra superficie**. Lo que las tres publican
difiere en **alcance**, y eso sí es lo que hay que escribir:

- **Bambu** da un rango general por filamento (35–65) **y** una tabla que lo parte por chapa
  (35–45 en Cool Plate, 45–65 en las otras tres). Es **la única de las tres que dice, con
  valores, que la chapa cambia la cifra**: lo dice con una tabla, no con una frase. Prusa
  tiene columnas de chapa en la página, pero su contenido no se puede publicar (ver abajo).
- **Prusa** da un rango general en su tabla de materiales (50–60) y un 60 °C suelto en la
  ficha del PLA, **sin condicionar ninguno de los dos a una superficie**. Su columna de chapas
  existe en la página pero **está desaliñada y no se publica** (ver `## Tirado`), así que de
  Prusa no se puede decir nada por chapa.
- **OrcaSlicer** da un rango general (50–60) más el margen típico de ±5 °C, sin desglose por
  superficie.

Y hay un segundo matiz, que es el de las tolerancias: Bambu da un rango de 30 grados
para el PLA; Prusa da uno de 10. OrcaSlicer explica por qué existen los rangos —±5 °C
de margen típico alrededor del óptimo— pero eso justifica un intervalo pequeño, no
uno de treinta grados. **Nadie explica de dónde sale un rango tan ancho**, así que la
tabla de Bambu hay que presentarla como lo que es: el rango más ancho que ha publicado
un fabricante, y la única que publica los valores de su separación por chapa. La tabla de
Prusa también tiene un grupo de seis columnas de chapa; lo que no se puede publicar es su
contenido, desalineado respecto a su cabecera.

La conclusión que el artículo puede escribir es **de alcance, no de chapa**: las tres casas
dan tres cifras para el mismo PLA porque cada una publica con un alcance distinto —una
publica sus valores por chapa, otra da una recomendación general, otra da un intervalo con
margen— y sólo
una te dice además qué le pasa a la cifra si cambias de superficie. **«60 °C está bien» es una
respuesta correcta —es lo que recomienda Prusa— y también incompleta**, porque no dice contra
qué cifra de fabricante se compara. Lo que el artículo **no** puede escribir es que el 60 °C
de Prusa sea el valor de PEI y no el de otras superficies: la ficha no lo dice, y sin esa
atribución la chapa deja de explicar por sí sola la diferencia entre los tres.

### 2. El 65 °C del hilo: la cifra ya no es sólo de un foro, la palabra «techo» sí

- Un usuario del foro de Prusa, con la cama a 50 °C y luego a 40 °C y la pieza curvada,
  recibe como respuesta: «You should set your bed temperature higher and not lower
  **(max 65°C)**».
  — [Lichtjaeger, foro de Prusa, 27/06/2019](https://forum.prusa3d.com/forum/original-prusa-i3-mk3s-mk3-how-do-i-print-this-printing-help/adjusting-settings-for-warping-of-pla/)
- La tabla por chapa de Bambu da **45 – 65 ℃** para el PLA en Textured PEI, Smooth PEI
  y Engineering Plate. El 65 °C **es el extremo alto de un rango de fabricante**.
  — [Bambu Lab](https://wiki.bambulab.com/en/general/filament-guide-material-table)
- La tabla de Prusa para PLA dice 50–60 °C, y la ficha del PLA 60 °C.
  — [Prusa Research](https://help.prusa3d.com/filament-material-guide)

**El matiz, en tres partes.**

1. **La cifra está corroborada.** El 65 °C cae dentro del 45–65 que da un fabricante
   para tres de sus chapas, así que no es una rareza de foro.
2. **La palabra «techo» es lo único que sigue siendo de un usuario.** El hilo dice
   «max 65°C» entre paréntesis; **ningún fabricante de este lote dice que no se pueda
   pasar de ahí**. Prusa se queda en 50–60 °C. Que el hilo se aparte de su propia casa
   no lo hace falso: lo hace **opinión de usuario sobre su propio caso**.
3. **El hilo tampoco probó el 65.** Quien sube la cama dice que la subió **y además**
   chaflanó las aristas en Fusion, con un «seemed to». El 65 °C no aparece como
   resultado medido en ninguna parte.

El artículo puede decir que 65 °C es un valor con el que se resolvió un caso real,
apoyándose en la tabla de Bambu. **No puede presentarlo como un límite impuesto por
Prusa**, ni como un techo que la evidencia établzca.

### 3. El 60 °C como techo del PLA aparece dos veces y significa dos cosas

- La ficha del PLA: «It doesn't resist high temperatures (it **gets soft and deforms at
  temperatures over 60 °C**)». Ahí el 60 °C se refiere **a la pieza**, no a la cama.
  — [Prusa Research](https://help.prusa3d.com/article/pla_2062)
- La tabla de Bambu: la Cool Plate pide 35–45 ℃ y las otras chapas 45–65 ℃, así que
  60 °C de cama está en mitad de rango.
  — [Bambu Lab](https://wiki.bambulab.com/en/general/filament-guide-material-table)

**El matiz.** El mismo número aparece como techo de la pieza y como valor legítimo de
cama. **No se pueden citar como la misma afirmación.** El techo de la cama es el de la
temperatura de transición del material menos 5–10 °C, y esa regla la da OrcaSlicer, no
esta página. Quien las mezcle va a decir que el PLA no puede ir a 60 °C de cama, y la
tabla de Bambu dice justo lo contrario para tres de sus cuatro chapas.

### 4. El umbral de la cámara para PETG: 60 °C o 70 °C, en la misma página

Ésta **no la signaled nadie hasta esta vuelta**, y es una contradicción **dentro de una
sola fuente**, no entre dos. La página de Bambu da dos números distintos para la misma
decisión:

- **En la prosa:** «② Filaments with a softening temperature of 60–80 ℃ (e.g., **PETG**),
  when the heatbed is set above **60 ℃**: We recommend opening the front door and/or
  removing the upper glass cover plate».
- **En la columna final de la tabla**, para las filas de PETG: «If bed > **70** ℃,
  Recommended». Para el PLA, en cambio, los dos sitios coinciden en 45 °C.

**El matiz.** Para el PLA la página es coherente: 45 °C en la prosa y 45 °C en la
tabla. Para el PETG no. **No se puede decir «el umbral sube a 60 y luego a 70 °C»**,
porque no hay un «luego»: son dos mitigaciones de la misma decisión en dos formatos de
la misma página, y la fuente no explica por qué difieren. **La contradicción se publica y
no se resuelve**: ninguna fuente de este lote decide cuál de las dos mitades manda, así que el
artículo da las dos y dice de dónde sale cada una.

**Dónde está exactamente el desacuerdo, que es la mitad técnica de la frase.** La prosa
activa la mitigación **por encima de 60 °C**; la tabla la marca **por encima de 70 °C**. De
ahí sale la banda, y sólo la banda:

- **A 60 °C o menos**, ninguna de las dos mitades recomienda nada: las dos son coherentes, y
  tampoco se contradicen.
- **Entre 60 y 70 °C**, la prosa ya pide abrir la puerta o quitar la tapa y la tabla todavía
  no lo marca: **ahí está el desacuerdo**, y es el único sitio donde está.
- **Por encima de 70 °C**, las dos mitades recomiendan lo mismo, y la página vuelve a ser
  coherente.

**El desacuerdo no se extiende a «todo lo que pase de 60».** Escribir «hasta 60 °C no hay
desacuerdo y por encima de 60 la página se contradice consigo misma» extiende el conflicto a
una zona —de 70 °C para arriba— donde la página es **coherente**, y es el error que el informe
8 rechaza: la contradicción se publicaba bien, ubicada mal.

**Y ninguna de las dos es «la más prudente».** Llamar conservador a un umbral es una decisión
editorial, no un dato, y aquí además apunta en dirección contraria a la prudencia: **entre 60
y 70 °C, la mitigación de la prosa todavía no está aplicada y la de la tabla ya lo está.** Si el
redactor prefiere recomendar un número en vez de publicar las dos mitades, **tiene que decirlo
como criterio propio y con su alcance** —«la página se contradice entre 60 y 70 °C de cama y
coincide en el resto»—, y nunca como recomendación del fabricante. Lo que no vale en ningún
caso es encadenar las dos como si fuera una progresión, ni presentar la activación tardía como
más preventiva: es el tipo de frase que se fabrica sin querer al resumir, y que nadie comprueba
después porque suena a verdad.

### 5. El PETG tiene dos rangos de cama, y una tercera cifra que es de otro material

Ésta tampoco la había señalado nadie, y sale de las tablas, no de la página de Bambu.

- **Bambu**, por filamento y pegamento **y** en las tres chapas de la segunda tabla:
  PETG **60 – 80 °C**. La página es coherente consigo misma aquí.
  — [Bambu Lab](https://wiki.bambulab.com/en/general/filament-guide-material-table)
- **Prusa**, tabla de materiales, fila PETG: **70 – 90 °C**.
  — [Prusa Research](https://help.prusa3d.com/filament-material-guide)
- **Prusa**, misma tabla, **fila distinta**: «PETG HT | No, No, No | 270 °C, **110 °C**».
  No es el PETG de la fila de arriba: es una variante aparte, con su propio nombre y **su propia
  temperatura recomendada de boquilla** —270 °C frente a los 215–270 °C del PETG—, y su propia
  cifra de cama, 110 °C frente a 70–90 °C. Lo que cambia en la columna HARDWARE es **cero**: las
  dos filas dicen «No, No, No», es decir, ni cámara cerrada, ni secador, ni boquilla endurecida
  para ninguno de los dos. **La fuente no establece ninguna boquilla de hardware distinta para
  el HT**, y una vuelta anterior escribió justo eso.
  — [Prusa Research](https://help.prusa3d.com/filament-material-guide)

**El matiz, en tres partes.**

1. **Para el PETG hay dos rangos, no tres.** Los dan Bambu y Prusa, y son **los dos únicos del
   lote que lo listan**. **La tabla de OrcaSlicer no tiene fila de PETG**: sus once materiales
   son PLA, ABS, ASA, Nylon 6, Nylon 12, TPU, PC, PC-ABS, HIPS, PP y Acetal (POM)
   (`material-temperatures:24–35`), y el PETG no está entre ellos. Para este material **no hay
   una tercera voz**, ni a favor ni en contra, así que cualquier frase que compare el PETG con
   «las tres» o con «las otras dos» no tiene a qué referirse. Y la cifra que se suele contar como
   tercera —**110**— es del PETG HT, que es el punto 3.
2. **60–80 y 70–90 no son el mismo rango**, aunque se solapen entre 70 y 80: una chapa de
   65 °C está dentro del de Bambu y **fuera** del de Prusa, y una de 85 °C al revés. Es el
   mismo caso que el del PLA en la contradicción 1 —fabricantes distintos, materiales de
   familia parecidos— y se escribe como contraste, no promediando.
3. **El 110 °C es el PETG HT, y por eso no se puede subir al PETG.** Es el error que esta
   entrada existe para impedir: una tabla con «PETG 70–90» y «PETG HT 110» al lado
   invita a escribir «Prusa lleva el PETG hasta 110 °C». **No lo dice nadie en este
   lote**, y quien lo escriba se está saltando el nombre de la fila.

Lo que sí se puede escribir es lo contrario y es más útil: **en las filas de la tabla de
contraste —PLA, PETG, ABS, ASA y PC— el PETG es la única en la que Prusa mueve los dos
extremos a la vez**, 70–90 contra los 60–80 de Bambu, diez grados por arriba y diez por abajo.
En el resto, Prusa se aparta **por un solo extremo**: ABS 95–110 contra 90–100, ASA 90–110
contra 90–100, PC 100–115 contra 100–120, y con el PLA se queda dentro del rango de Bambu. Lo
que separa a las dos casas con el PETG es **el resto de la ventana**, no un techo suelto, y las
ventanas sólo se tocan en 70–80.

**Ojo con el alcance de esa frase:** el PA también se aparta por los dos lados —Bambu da
90–110 °C por pegamento y 100–120 °C por chapa, Prusa 70–115 °C—, así que «el PETG es el
material donde las fuentes se separan más» vale **para las filas de la tabla de contraste**, no
para toda la tabla de Prusa. Si se escribe, se escribe con ese alcance.

El HT se sale de las dos ventanas por veinte grados, y es otro material. Si el PETG es tu
material, la fuente que manda es la del fabricante de tu bobina, no la tabla de otro.

### 6. Para limpiar la chapa, un fabricante dice agua caliente y el otro dice que no

Pequeña, y con una contraindicación detrás, que es por lo que no vale descartarla como
una diferencia de redacción.

- **Prusa:** «you can clean the steel sheet with a few drops of dish soap and **warm water
  (not hot!)**», y además «**do not submerge the sheet completely in hot water**».
  — [Prusa Research](https://help.prusa3d.com/article/first-layer-issues_1804)
- **Bambu:** «Regularly clean the plate surface with dish soap and **hot water** to remove
  dust, grease, and other residues that affect adhesion».
  — [Bambu Lab](https://wiki.bambulab.com/en/general/filament-guide-material-table)

**El matiz.** Los dos juegan con agua y jabón, así que la operación es la misma; lo que
difieren es la temperatura, y Prusa además pone un paréntesis para que no se pueda leer
de otra manera. **No es un error tipográfico de uno de los dos**: Bambu enlaza a su propia
guía de limpieza de la Textured PEI, que es donde uno acaba si quiere el dato exacto de
su chapa. **Esa guía no está en `wiki/raw/`**, así que aquí no se puede decir qué
recomienda.

**Lo que el artículo tiene que hacer con esto, y lo que no:** puede publicar las dos
citas y decir que los dos fabricantes se contradicen en un punto pequeño, y puede
recomendar «agua tibia y jabón» como la lectura que no se equivoca ninguna de las dos,
porque Prusa lo dice y Bambu no lo prohíbe para su chapa. Lo que no vale es **elegir una y
borrar la otra**.

**Y lo que tampoco vale es equiparar las dos acciones, que son distintas.** Lo que Prusa
prohíbe por escrito es **sumerger la chapa**: «**do not submerge the sheet completely in hot
water**» (`first-layer-issues:31`), y lo pone en la misma frase de la operación de agua y
jabón. Lo que Bambu manda es **limpiar la superficie de la placa** con jabón y agua
caliente: «Regularly clean the **plate surface** with dish soap and hot water»
(`filament-guide-material-table:120`). **Seguir a Bambu no lleva a sumergir la chapa**,
porque su instrucción habla de la superficie y no de la chapa entera, y **ninguna de las dos
fuentes equipara una cosa con la otra**: la frase «meter la chapa en agua caliente por seguir
a Bambu es exactamente lo que Prusa prohíbe por escrito» **no tiene respaldo en este lote**,
y además empuja el alcance de las dos justo en el punto que se está defendiendo. Lo que sí
se puede escribir es lo acotado: **Prusa prohíbe por escrito sumergir la chapa en agua
caliente; Bambu manda limpiar la superficie con agua caliente; son dos acciones distintas y
ninguna fuente las equipara.**

**Y «hot water» es agua caliente, no agua hirviendo.** La palabra «hirviendo» no sale de
ninguna de las dos páginas y no debe aparecer al hablar de esta cita.

**Tampoco vale la inferencia inversa, la de que Bambu no lo prohíba para su chapa
signifique que lo recomiende.** Su página remite a la guía de limpieza de la Textured PEI, que
no está en `wiki/raw/` y cuyo contenido nadie ha visto aquí.

## Sin respaldo

Una sola fuente, o ninguna. El redactor puede usarlas marcadas como lo que son.

- **Que 65 °C sea «el techo» del PLA.** **[LA CIFRA ESTÁ CORROBORADA POR UN
  FABRICANTE; LA PALABRA «TECHO», NO]** Ya no es una cifra de foro: el 65 °C es el
  extremo alto del 45–65 ℃ que Bambu da para el PLA en Textured PEI. Lo que sigue
  sin respaldo es la idea de **máximo**, y viene del paréntesis «(max 65°C)» de un
  usuario del foro de Prusa. Ningún fabricante de este lote pone un techo al PLA.
  La tabla de Prusa se queda en 50–60 °C y la ficha en 60 °C. Publicable: «en una
  Textured PEI, 65 °C es el máximo que da un fabricante». **No publicable:** «el techo
  del PLA son 65 °C».
- **Que subir la cama hasta 65 °C arreglara el warping del hilo.** **[NO ESTÁ — es un
  desenlace que el hilo no demuestra]** El autor subió la temperatura **y** chaflanó
  las aristas, sin decir a qué temperatura llegó, y lo remedialó con «seemed to». El
  hilo sí documenta que **bajar** la cama a 40 °C no funcionó; eso sí se puede escribir.
- **La explicación de por qué el techo es Tg menos 5–10 °C.** OrcaSlicer da la regla y
  enlaza a un artículo que explica el porqué, pero **el destino del enlace no aparece
  como URL legible en el HTML servido**. La regla se cita; la justificación, no.
- **Que `bed_temperature` sea la clave que escribe la familia Prusa/Orca.**
  **[DATO DEL PROYECTO, NO DE FUENTE — no debe citarse como si fuera de Prusa]**
  Está documentado en `src/services/types.ts` y `src/services/ParserService.ts`, y es
  cierto, pero en estas cinco fuentes **no sale ese nombre a secas**. Lo que sale,
  literalmente, es `hot_plate_temp` y `cool_plate_temp` en la sección Bed de OrcaSlicer.
  Quien lo escriba tiene que marcarlo como dato interno del analizador.
- **Que `bed_temperature_initial_layer_single` exista en la wiki de OrcaSlicer.**
  **[SEGUNDA MANO — sale en las notas del recolector, no en un fichero de fuente.]**
  El nombre aparece citado en las notas de `temperatura-cama-orcaslicer-wiki-material-temperatures.md`
  como lo que las notas dan por visto en la página de Machine G-code, **que no está en
  `wiki/raw/`**. No es un nombre que se pueda dar por verificado aquí.
- **Que el panel pinte un `0` y un campo ausente de la misma manera.** **[RETAIRADA — es
  FALSA contra el código, comprobada sin modificarlo]** `AnalysisPanel.tsx` devuelve guion
  **sólo cuando el valor es `undefined`**, así que un `0` se pinta como `0 °C`, y
  `ParserService.ts` gana el primer valor presente entre cinco alias, el `0` incluido.
  Consecuencia doble, y las dos hay que respetarlas: «el panel trata 0 y ausencia igual» y
  «desde fuera son el mismo hueco» **se borran**. Lo que el artículo **sí** puede decir, y
  sólo como **dato interno de la aplicación** —nunca atribuido a documentación de
  impresora— es exactamente esto: *la clave se busca entre cinco alias y gana el primer valor
  presente; si no hay ninguno, el campo queda vacío y se pinta con un guion, y un `0` se pinta
  como `0 °C`*. **Sin causas, sin avisos y sin advertencias**: el panel no emite ninguna, así
  que nada sobre voladizos, soportes ni por qué el slicer dejó el campo así.
- **Que un `0` en la cabecera signifique que el slicer no usa cama.** **[NINGUNA FUENTE LO
  DICE — retirado]** Lo que dice la fuente de Bambu es que un 0 **en el preset de filamento
  de Bambu Studio** impide laminar hasta poner un valor no nulo. Eso es un comportamiento del
  programa de laminado sobre su propia configuración, y no describe ni escritura de G-code ni
  intención de ningún otro slicer.
- **Que la torre de purga salga unida a la pieza.** **[NINGUNA FUENTE LO DICE — retirado]**
  La sección «Removing Prints» dice flexionar la chapa para soltar «the model **and** the purge
  tower (if any)». De ahí sale que hay dos elementos que liberar, y **no** sale unión entre
  ellos, ni un orden de separación, ni ninguna instrucción de corte. **La consecuencia
  práctica sí se mantiene y se escribe por lo que la fuente dice:** quien intente separar la
  torre cortando la base está haciendo algo que la página no pide, porque la página pide
  flexionar.
- **Que 130 °C sea el techo de cama más alto de las tres fuentes.**
  **[SUPERLATIVO ACOTADO A LAS FILAS LEGIBLES]** El **150 °C del PEI está en la tabla de
  Prusa** (`filament-material-guide`, fila 31). Queda fuera de la comparación porque su fila
  viene desaliñada, pero excluir una fila por poco fiable **no la saca de la fuente**. Lo que se
  publica es «el valor más alto **entre las filas que se han podido leer con confianza**»; el
  150 °C se puede citar **marcado como dudoso** y **no como recomendación de cama**.
- **Que la temperatura de cama no cueste dinero, y que lo que cuesta sea el filamento.**
  **[DECISIÓN EDITORIAL, NO UN DATO]** Ninguna de las seis fuentes habla de costes y este
  fichero tampoco. Decir que este artículo **no publica precios** es una decisión de alcance y
  puede decirse; **afirmar qué no cuesta es una afirmación distinta y no tiene respaldo aquí.**
  Si el artículo hace esa cuenta, hay que limitarla a su alcance o quitarla, y no sustituirla
  por cifras económicas sin pasar por el pipeline entero.
- **Que el IPA no quite el aceite de los dedos.** **[ALCANCE MAYOR QUE EL DE SUS DOS
  FUENTES]** El foro dice «It does not remove finger oils **well**», y es la observación de un
  usuario sobre su cama. La ficha de Prusa dice que el agua con jabón disuelve «**some** oils
  and sugars that gather over time and **that IPA does not remove**», y **no identifica esos
  «oils» con las huellas**. Se escribe «no los quita bien» y «algunos aceites y azúcares», y
  se para ahí. La grasa no se queda «exactamente donde estaba» porque eso no lo dice nadie.
- **Que el quitaesmalte y el limpiador de frenos lleven acetona.** **[POSIBILIDAD, NO
  COMPOSICIÓN — y es un aviso de seguridad, no un matiz de redacción]** La fuente dice «can
  **also** contain acetone (acetates)». Se publica con el modal, con el nombre correcto del
  producto —**brake-cleaner**, limpiador de frenos— y **sin ninguna afirmación sobre
  etiquetas**, que la fuente no hace en ningún punto.
- **Que Bambu exija pegamento para el PLA en Engineering Plate.** La tabla lo dice con
  dos palabras en la celda —«45 - 65 ℃ Glue Required»— pero **no explica por qué**, y no
  hay ninguna frase de la página que lo desarrolle. La página añade un matiz que sí
  está: «The old Engineering Plates are not recommended for printing PLA», así que la
  obligación es de la versión actual de la placa. Es un dato, no un argumento.
- **Los 190 – 240 °C de boquilla para PLA de Bambu, con su ±10 °C.** Están en la
  segunda tabla de la misma página. Es de otro campo —el de hotend— y entra aquí sólo
  porque comparte documento. **[FUENTE PARA OTRO ARTÍCULO]**

### Revisado y no incorporado

Lo que se ha encontrado leyendo las seis fuentes enteras y **se ha dejado fuera a
propósito**. No es relleno: es material que existe, que está en `wiki/raw/` con su línea,
y que alguien tiene que coger para otro artículo. Se anota para que el revisor vea que
está mirado, y para que no se pierda.

| Qué | Dónde está | Por qué fuera de aquí |
|---|---|---|
| **Los siete consejos de slicer del segundo post del hilo**: brim, subir la altura de primera capa, subir el ancho de línea, reducir capas de fondo, reducir infill, esquinas redondeadas, raft | hilo, filas 56-87 | Son de warping, no de temperatura, y llegan como lista de consejos de un usuario. Los redondeados ya entran por el «chamfered the edges» del antes y después. Van a [[warping-pla]] |
| **La columna HARDWARE de la tabla de Prusa** (enclosure, drybox, boquilla endurecida): ABS, ASA, PC y PA con «Recommended»; secador para PETG y PA; boquilla endurecida para compuestos | `prusa-kb-filament-material-guide`, filas 18-31 | Es requisito de máquina, no temperatura de cama. Corrobora la fila «Enclosed printer» de Bambu y es de [[enclosure-y-warping]] y del artículo de materiales |
| **La fila del PETG HT, aparte de su cifra de cama** | `prusa-kb-filament-material-guide`, fila 16 | El material es de otro artículo; de él aquí sólo la cifra, y con la advertencia de la contradicción 5 |
| **Biodegradabilidad del PLA, compostaje a más de 80 °C, y contacto con alimentos** | `prusa-kb-pla`, filas 25 y 27 | Contexto de qué es el PLA. No es temperatura de cama. El recolector ya avisó de que se podía descartar |
| **Alisado químico del PLA: cloroformo, benceno caliente, tetraidrofurano** | `prusa-kb-pla`, fila 54 | **Aviso de seguridad de verdad, pero de otro proceso.** No es temperatura de cama ni limpieza de chapa: es post-proceso con disolventes peligrosos. Pasa al artículo de post-proceso, donde «sólo se puede en condiciones de laboratorio» y «sólo por técnicos especializados» es el titular |
| **Los 12 comentarios de usuario de la ficha del PLA** | no están en el fichero | No los trajo el recolector y no hay nada que cocinar |
| **El M191 y el M141, y los ejemplos de CLI (`--supertack-plate-temp=1`)** | `orcaslicer`, filas 41, 51 y 83-85 | Mecánica interna de cómo se manda el comando, no qué valor poner. Los **nombres de variables sí están cocinados**, que es lo que le sirve a este artículo |
| **«I will setup an enclosure» del que abrió el hilo**, y el «**first layer hotter**» de Peter M | hilo, filas 31 y 135 | Los dos son intención y consejos sin cifra ni resultado. El primero nunca se probó en el hilo. Publicables sólo marcados como lo que son, y no hacen falta aquí |
| **La fila de PEI (150 °C) de la tabla de Prusa** | `prusa-kb-filament-material-guide`, fila 31 | Ya está en `## Tirado`: viene desaliñada en el original. No se ha vuelto a tocar |

## Tirado

Qué se ha eliminado y por qué. El redactor no usa nada de esto.

- **Una cita entrecomillada que no está en ninguna fuente.** «IPA + PETG will cause the
  print to adhere very strongly to the sheet. Removing it could be extremely difficult.»
  Se atribuía a `first-layer-issues`, y **no sale de ahí ni de ningún otro fichero de
  `wiki/raw/`**: `adhere very strongly`, `Removing it could`, `extremely difficult` y
  `PETG will cause` dan cero, por partes y por el fragmento entero. Estaba pegada a una
  cita real de la misma página y bajo el mismo enlace, que es como pasó dos revisiones:
  quien comprueba la cita de al lado no comprueba la segunda. **Borrada.** Lo que la
  página dice de verdad sobre adhesión excesiva y limpieza está en `## Afirmaciones`,
  y es el acetona, no el IPA.
- **La frase «el hilo habla de salir de un warping real, donde subir más de lo
  recomendado es defendible».** Era una defensa del 65 °C escrita sin comprobar el
  desenlace. El hilo no prueba que subir arreglara nada: subió dos variables y lo dijo
  con «seemed to». Sustituida por el antes y después completo, con sus límites.
- **«up to 65 °C as a maximum».** No era una cita: la fuente escribe «(max 65°C)», en
  un paréntesis y con otra construcción. Una cita reformulada es una cita fabricada.
- **Las columnas de chapa de la tabla de materiales de Prusa.** No por dificultad sino
  por error: en varias filas los valores se desalinean respecto a su cabecera —en PETG,
  «with glue stick» cae bajo Smooth PEI pero «Cleaned with water» no queda claro si es
  Satin o Special PA Nylon—. Publicarlas mal atribuidas es peor que no publicarlas.
  Quien necesite la columna de chapa, que vaya a la ficha del material.
- **La fila de PEI de esa tabla.** Viene desalineada en el original: la celda de
  enclosure arrastra texto de las columnas de propiedades físicas. Se deja tal cual y
  fuera.
- **«Storage and Material Specifications» y «End Notes» de la página de Bambu.** Son
  secado, humedad y propiedades mecánicas. Ninguna de las tres cosas es temperatura de
  cama.
- **Las ocho columnas de diámetro de boquilla de Bambu.** Una tabla de cama con nueve
  columnas de las que ocho son de boquilla ocupa el artículo entero si no se
  recorta, y aquí no toca.
- **`https://wiki.bambulab.com/en/general/build-plate`.** Venía en la lista de
  candidatas verificadas y **responde 200 pero es un stub**: 551 caracteres de cuerpo y
  todo el texto es «Please get more information from the Wiki Introduction to the Build
  Plates». Una URL que responde 200 puede no servir para nada, que es un motivo más para
  abrir lo que se cita.
- **`mesh-bed-leveling_112163` y `bed-level-correction_2267`.** Las dos dan 200 y las
  dos son inútiles para este tema: cero apariciones de «bed temperature» y cero de «°C»
  en el texto servido. Son nivelación, no temperatura.
- **`https://www.orcaslicer.com/wiki/developer_reference/placeholders_variables.html`**
  → 404. Es donde estaría la lista de variables del G-code, y no existe.
- **`prusaslicer-custom-gcode_2115` y `g-code-variables_2256`** → 404. Con lo que no se
  ha encontrado documentación oficial que nombre `bed_temperature`.
- **`prusament.com/materials/petg` y `/asa`** → 404. Sólo existe `/materials/pla/`, que
  daría cama 40–60 °C con «Heated Bed Optional». **No se ha traído**: es una sexta fuente
  y el lote es de cinco, y además solapa casi todo con lo recogido. Queda anotada por si
  el redactor la necesita para una cifra de fabricante de filamento.
- **Reddit.** Devuelve la cáscara vacía, comprobado antes.
- **All3DP.** Carga pero su HTML no trae el texto del artículo, ni en `/amp/`.
- **Las erratas del original.** Se conservan en `first-layer-issues`. Corregirlas sería
  reescribir la fuente.

### Retirado en esta cuarta vuelta, con su motivo

Ocho afirmaciones que **nacieron en este fichero** y que
`wiki/reviews/temperatura-cama-revision-7.md` signals. **Ninguna se retira porque la fuente la
desmienta**: se retiran por ser más fuertes, más causales o más exclusivas que lo que la
fuente dice. Se anotan para que no vuelvan por la misma puerta.

| Afirmación retirada | Por qué | Qué queda en su lugar |
|---|---|---|
| El 60 °C de Prusa es **el valor de PEI**, y aplicarlo a vidrio o Kapton es inventarlo | `pla.md` da el 60 °C sin condicionar superficie y admite vidrio, Kapton y pegamento | el 60 °C es la recomendación general de la ficha; la ficha no da cifra por superficie |
| «It does not remove finger oils well» es **exactamente** lo que dice la Knowledge Base | el foro dice «**well**» y la ficha dice «**some** oils and sugars» | dos frases que se corroboran en el sentido, no en el alcance |
| El disolvente **lleva acetona dentro y no lo pone en la etiqueta** | la fuente no habla de etiquetas ni de composición, sólo de una posibilidad | «**pueden** contener», con el nombre correcto del producto |
| La torre de purga **sale con la pieza**, no se separa antes | de una conjunción («the model **and** the purge tower») salen dos elementos que liberar, no dos unidos | una acción: flexionar la chapa, y sueltan ambos |
| **70 °C es la lectura más conservadora** para PETG | ninguna fuente decide, y entre 60 y 70 la mitigación de la prosa aún no está aplicada | la contradicción, sin resolver; criterio propio si se recomienda |
| Un `0` en la cabecera es **un valor puesto, no un campo ausente** | la fuente habla del **preset** en Bambu Studio, no de un G-code | el comportamiento del preset, y el dato interno del panel en `## Sin respaldo` |
| La regla de OrcaSlicer es **el principio que produce** los umbrales de Bambu | de esa frase no sale ninguna cifra | dos reglas complementarias de dos fuentes |
| Para los materiales que se contraen mucho la cámara es **el factor, no la cama** | la fuente dice «a major factor», y un factor no desplaza a los demás | la cámara es un factor importante, y la cama sigue dentro |

Y cuatro cosas más que estaban en el artículo sin origen posible en este fichero:

- **El corte de la base para separar la torre de purga.** Salió de la afirmación sobre la
  unión, que ya no está. La instrucción no existe en ninguna fuente.
- **Los dos anuncios de relleno** «El PETG es el material donde el error más caro está en una
  fila que se lee por encima» y «Aquí los efectos van en dos direcciones, y la segunda se
  olvida». No hay ninguna afirmación detrás: las tablas y los párrafos que siguen ya llevan el
  contenido. El segundo además insinúa una progresión que la fuente de cama fría no enuncia.
- **La cuenta de coste del apartado «Lo que este artículo no te va a resolver».** Sin fuente y
  sin respaldo en este fichero; ver `## Sin respaldo`.
- **El aviso sobre soportes y voladizos.** El panel no lo emite, y ninguna fuente de este lote
  lo dice.

### Retirado en esta quinta vuelta, con su motivo

Cinco frases que **nacieron en este fichero** y que señala
`wiki/reviews/temperatura-cama-revision-8.md`. Cuatro se retiran por ser **falsas contra el
fichero crudo** o por tener el alcance equivocado; la quinta, por cortar una cita donde
empezaba su condición. Se anotan para que no vuelvan por la misma puerta.

| Afirmación retirada | Por qué | Qué queda en su lugar |
|---|---|---|
| `first-layer-issues` **no publica ninguna cifra de cama en todo el lote** | `:66` da «increase the heatbed temperature by **5-10 °C**», y la página es citada por esa frase más abajo | no publica temperatura **recomendada** por material ni por chapa; su único número es el incremento de +5–10 °C **sobre el perfil** |
| Para el PETG, **las tres fuentes** se separan más —60, 70 y 90— | la tabla de OrcaSlicer **no tiene fila de PETG**, y el 110 es del **PETG HT**, otra variante | dos rangos —Bambu 60–80 y Prusa 70–90, solapados sólo en 70–80— y el 110 pertenece a la fila del PETG HT |
| «Hasta 60 °C no hay desacuerdo y **por encima de 60** la página se contradice» | la tabla recomienda **por encima de 70**, así que por encima de 70 **las dos mitades coinciden** | el desacuerdo está **entre 60 y 70 °C**; a 60 o menos no recomienda ninguna, y por encima de 70 coinciden |
| Limpiar como Bambu es **exactamente lo que Prusa prohíbe**: «agua hirviendo» | Prusa prohíbe **sumerger** (`:31`); Bambu manda **limpiar la superficie** (`:120`). Son dos acciones, y «hot water» no es agua hirviendo | dos acciones distintas, sin equiparar, y «agua caliente» en las dos citas |
| La instrucción de OrcaSlicer cierra en «**for each Bed type**» | la frase sigue «**if Support multi bed types is enabled in printer settings**» (`material-temperatures:53`) | la condición dentro de la cita, o la cita cortada con puntos suspensivos y dicha condicionada |

## Relaciones

| Concepto | Se relaciona con | Cómo |
|---|---|---|
| temperatura de cama | [[warping-pla\|Warping en PLA]] | El warping es una consecuencia posible de la cama fría, y es la más citada: OrcaSlicer la enumera con «warping **or** weak layer bonding **or** complete detachment», así que no es la única ni la palabra final. La contradicción 1 de aquel artículo la explica la tabla de Bambu por chapa |
| temperatura de cama | [[adhesion-primera-capa\|Adhesión en la primera capa]] | La otra mitad del problema: la limpieza pesa tanto como la cifra, y el hilo del foro diagnostica una cama sucia antes que una cama fría |
| temperatura de cama | [[material\|Qué cambia entre materiales]] | Las cifras de esta página son por material; comparar PLA con PC es otro artículo |
| temperatura de cama | [[enclosure-y-warping\|Enclosure y warping]] | Bambu recomienda **abrir la puerta y/o quitar la tapa de cristal** por encima de 45 °C de cama con PLA. Con PETG, la página se contradice: 60 °C en la prosa y 70 °C en la tabla, sin decidir, y **el desacuerdo sólo está entre 60 y 70 °C** — por encima de 70 las dos mitades dicen lo mismo |
| temperatura de cama | acetona frente a IPA | Dos recomendaciones opuestas de dos fabricantes sobre el mismo disolvente: Prusa lo concede en la PEI lisa, Bambu lo prohíbe |
| temperatura de cama | disolventes que pueden contener acetona | La prohibición de Prusa es sobre el acetona, y quitaesmalte y **brake-cleaner** pueden contenerla: la fuente no da ninguna forma de saberlo por el nombre del producto, así que el aviso no llega |
| temperatura de cama | esperar a que enfríe antes de soltar la pieza | Dos fabricantes coinciden en el gesto —flexionar con cuidado, sin rayar la chapa— y sólo Bambu dice esperar a que enfríe. **[La segunda mitad de la relación no es publicable:]** que una base deformada en caliente acabe diagnosticada como warping es una inferencia que **ninguna de las seis fuentes enuncia**, y este fichero lo dice más abajo |
| temperatura de cama | temperatura de primera capa | OrcaSlicer da dos por chapa, `_initial_layer` y normal; subir sólo la primera es un ajuste distinto de subir la cama entera |
| temperatura de cama | PETG HT | Es la fila que hace que «Prusa lleva el PETG a 110 °C» sea falso: es otro material con otro nombre. Lo que cambia es la **cifra de cama y la de boquilla**, no el requisito de boquilla endurecida, que es «No» en las dos filas |
| temperatura de cama | limpieza con agua y jabón | Un fabricante dice caliente y el otro «not hot!», y el segundo además prohíbe sumergir la chapa |
| temperatura de cama | alisado químico | El mismo disolvente que daña la chapa sirve, en la página del PLA, para pegar la pieza: son objetos distintos y dos frases del mismo fabricante |
| bedTemp | limpieza de la chapa | El IPA deja **algunos** aceites y azúcares acumulados que no quita —y no los quita bien—, así que la limpieza es parte del problema de adhesión y no se arregla con grados |
| bedTemp | live-Z | Cambiar de chapa cambia también la altura de la boquilla, no sólo la temperatura |

**Relación descartada en esta vuelta: `[[slicer|Qué slicer escribió esto]]`.** Se quita de
la lista y se deja constancia del motivo, para que no vuelva a colarse en la siguiente vuelta.

- **La página no está comprometida a existir.** No existe en `src/content/wiki/`, no aparece en
  la lista de páginas pendientes que da esta revisión (`adhesion-primera-capa`,
  `enclosure-y-warping`, `material`) y ningún brief la encarga. Nombrarla aquí dejaría una
  referencia editorial colgada, que es justo lo que la séptima vuelta marca como cobertura de
  relaciones incompleta.
- **El contenido que la justificaba era en parte el que este fichero retira.** «El perfil pone
  la temperatura solo, y el nombre de la clave decide si el dato llega» se apoyaba en una
  inferencia sobre el analizador —qué clave busca y cómo la interpreta—, que ya no es
  publicable como afirmación de fuente.
- **Lo que queda con fuente es una frase, y es del propio artículo:** que PrusaSlicer configura
  las temperaturas a partir del material seleccionado
  (`first-layer-issues`, «PrusaSlicer will configure them correctly based on the selected
  material»), más los nombres literales de las variables de la sección Bed de OrcaSlicer. Eso
  va en el cuerpo del artículo, y no necesita página aparte.

**Se vuelve a añadir cuando exista la página `slicer`**, y entonces la relación se nombra con
sintaxis wiki en la lista del artículo, no aquí.
