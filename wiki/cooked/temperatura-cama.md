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
revisado: 2026-10-03
---

# Temperatura de cama

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
  — [OrcaSlicer](https://www.orcaslicer.com/wiki/material_settings/filament/material_temperatures.html)
- **Las filas menos conocidas de las dos tablas, que no se habían usado todavía y que
  sirven para los materiales que no son PLA, PETG ni ABS.** De Prusa: PETG HT **110 °C**,
  HIPS 100–110, PP 70–100, CPE 90–110, Glow in the dark 85, PVA / BVOH 60, Wood / metal
  filled 60–100, y una fila agregada «Composite materials» de 40–120 °C. De OrcaSlicer:
  Nylon 6 y Nylon 12 **90–110 °C**, PC-ABS 95–110, HIPS 90–110, PP 80–105, Acetal (POM)
  **100–130 °C**, que es el techo de cama más alto de todo el lote.
  — [Prusa Research](https://help.prusa3d.com/filament-material-guide),
  [OrcaSlicer](https://www.orcaslicer.com/wiki/material_settings/filament/material_temperatures.html)

  **Dos advertencias al publicarlas.** «Composite materials, 40–120 °C» es una fila
  que **agrega** composites distintos, no un material: no se puede leer como «el
  filamento con fibra va a 120 °C» sin más. Y la fila de **PEI (150 °C) queda fuera**,
  porque viene desalignada en el original —ya está anotado en `## Tirado`—.
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

### Qué pasa si está demasiado caliente

- «If the bed temperature is too high, the lower layers can overheat and soften
  excessively, resulting in deformation such as **elephant foot**».
  — [OrcaSlicer](https://www.orcaslicer.com/wiki/material_settings/filament/material_temperatures.html)
- El daño no es sólo en la pieza: «PETG, ABS, ASA, XT, and CPH filaments are an
  exception - the adhesion may be too strong, and you can damage your **Smooth PEI
  sheet**». La página **también propone el remedio**: «We recommend using a separating
  agent (e.g. a glue stick)», y manda a las guías de material.
  — [Prusa Research](https://help.prusa3d.com/article/first-layer-issues_1804)
- **La primera capa tiene su propia temperatura, y es una decisión aparte.** En la
  sección Bed, después de la lista de variables: «Set the bed temperature for the selected
  material for **First Layer and Other Layers** for each Bed type», y «Using a higher
  temperature for **the first layer** can help improve adhesion to the build surface but
  be cautious of potential deformations like elephant foot». Eso es lo que explican las
  doce variables del apartado de abajo: **dos por chapa**, no una.
  — [OrcaSlicer](https://www.orcaslicer.com/wiki/material_settings/filament/material_temperatures.html)
- **El principio que hay detrás de los umbrales de Bambu, escrito por otra casa.** «It
  is important to monitor the chamber temperature to ensure that it does not exceed **the
  filament's deformation temperature**». Bambu publica el umbral ya calculado por
  material —45 °C para el PLA, 60 o 70 para el PETG— y esta frase es la regla general que
  los produce. **No hay que elegir entre las dos:** la una es el principio y la otra la
  tabla.
  — [OrcaSlicer](https://www.orcaslicer.com/wiki/material_settings/filament/material_temperatures.html)
- **El motivo por el que la temperatura de cama no basta, en tres partes.** «In general,
  following the manufacturer's recommendations, **maintaining a clean bed (free from oils
  or fingerprints), ensuring a stable chamber temperature, and having a properly leveled
  bed** will produce reliable results». Ni una de las tres es la cifra.
  — [OrcaSlicer](https://www.orcaslicer.com/wiki/material_settings/filament/material_temperatures.html)
- **Y para los materiales que se contraen mucho, la cámara es el factor, no la cama.**
  «For challenging prints involving materials with **high shrinkage (e.g., nylons or
  polycarbonate)** or geometries prone to warping, dialed-in settings are critical. In
  these cases, **chamber temperature becomes a major factor in preventing detachment** and
  ensuring print success.»
  — [OrcaSlicer](https://www.orcaslicer.com/wiki/material_settings/filament/material_temperatures.html)
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
- **La prohibición no acaba en la primera frase, y la segunda es la que cuesta dinero.**
  Literal, en la línea siguiente: «Other chemical solvents, like **Nail polish remover
  or brake-cleaner, can also contain acetone (acetates)**».
  — [Prusa Research](https://help.prusa3d.com/article/first-layer-issues_1804)

  **Lo que esto cambia:** el problema no es el bote que pone «acetona» en la etiqueta,
  es cualquier disolvente que **la lleve dentro sin decirlo**. Quien tenga un
  quitaesmalte y una chapa texturizada no está usando acetona —está usando
  quitaesmalte— y la prohibición no le llega, con el mismo daño. **Las dos frases van
  juntas en la cita; citada sólo la primera, el aviso pierde su mitad útil.** Es el
  mismo error de forma que el de la columna de chapa de Prusa: el dato no es falso,
  está mal atribuido.
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

  **Dos de estas tienen respaldo de fábrica, y una es la que explica el diagnóstico de
  la cama sucia.** «It does not remove finger oils well» es exactamente lo que dice la
  Knowledge Base al recomendar jabón para «some oils and sugars that gather over time
  and **that IPA does not remove**». Y «no toques la superficie con las manos» es la
  primera línea de esa misma página: «If you don't touch the print surface with your hands
  or dirty tools, then you don't have to clean it before every print». **La frecuencia
  —«every few prints»— es sólo del foro y no la corroboran.**

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
- **Y la lista de chapas es más larga que la tabla.** En la misma frase: «PLA is
  printable **not only on PEI surface, but also on glass, Kapton tape, or using a glue
  stick**». O sea, el 60 °C de la cabecera es el valor para PEI; fuera de ella la
  cifra no se dice en ninguna parte de esa página, y quien la aplique a cristal o a
  Kapton se la está inventando.
  — [Prusa Research](https://help.prusa3d.com/article/pla_2062)

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
- Bambu Studio avisa en el otro sentido: «if a heatbed temperature in the filament
  preset is set to **0 ℃**, the software will report that the filament is incompatible
  with slicing». O sea, un 0 en la cabecera es un valor puesto, no un campo ausente.
  — [Bambu Lab](https://wiki.bambulab.com/en/general/filament-guide-material-table)
- Los nombres literales de las variables que **sí** salen en la fuente de OrcaSlicer:
  `supertack_plate_temp`, `cool_plate_temp`, `textured_cool_plate_temp`,
  `eng_plate_temp`, `hot_plate_temp`, `textured_plate_temp`, y la gemela
  `_initial_layer` de cada una.
  — [OrcaSlicer](https://www.orcaslicer.com/wiki/material_settings/filament/material_temperatures.html)

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
- **Cómo se suelta, una vez fría.** «remove the build plate and **gently flex it** to
  release the model **and the purge tower (if any)**».
  — [Bambu Lab](https://wiki.bambulab.com/en/general/filament-guide-material-table)
- **La torre de purga sale con la pieza**, no se separa antes. Detalle pequeño, y es el
  que impide que quien busque su pieza corte la base al intentar separarla.
  — [Bambu Lab](https://wiki.bambulab.com/en/general/filament-guide-material-table)

**Lo que dice la fuente y lo que no.** La fuente dice las tres cosas, y el motivo de la
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

**El matiz.** No es que un fabricante se equivoque y los otros dos no. Los cuatro
números encajan con la tabla de Bambu por chapa: 50–60 está **dentro** de 45–65,
que es lo que pide la Textured PEI, y el 35 del Cool Plate está en el otro extremo de
la fila. Lo que cambia entre las cifras es **la chapa**, y Bambu es el único de los tres
que lo dice con una tabla.

Y hay un segundo matiz, que es el de las tolerancias: Bambu da un rango de 30 grados
para el PLA; Prusa da uno de 10. OrcaSlicer explica por qué existen los rangos —±5 °C
de margen típico alrededor del óptimo— pero eso justifica un intervalo pequeño, no
uno de treinta grados. **Nadie explica de dónde sale un rango tan ancho**, así que la
tabla de Bambu hay que presentarla como lo que es: el rango más fiel que ha
publicado un fabricante, y el único que separa por chapa.

La conclusión que el artículo tiene que escribir es que **«60 °C está bien» es una
respuesta correcta y también incompleta**: depende de qué chapa tengas encima.

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
la misma página, y la fuente no explica por qué difieren. Lo prudente es dar **la más
conservadora de las dos para PETG —70 °C—** y decir de dónde sale, o bien publicar las
dos dejando claro que la página se contradice consigo misma. Lo que no vale es
encadenarlas como si fuera una progresión: es el tipo de frase que se fabrica sin
querer al resumir, y que nadie comprueba después porque suena a verdad.

### 5. El PETG tiene tres cifras de cama, y una de ellas es de otro material

Ésta tampoco la había señalado nadie, y sale de las tablas, no de la página de Bambu.

- **Bambu**, por filamento y pegamento **y** en las tres chapas de la segunda tabla:
  PETG **60 – 80 °C**. La página es coherente consigo misma aquí.
  — [Bambu Lab](https://wiki.bambulab.com/en/general/filament-guide-material-table)
- **Prusa**, tabla de materiales, fila PETG: **70 – 90 °C**.
  — [Prusa Research](https://help.prusa3d.com/filament-material-guide)
- **Prusa**, misma tabla, **fila distinta**: «PETG HT | No, No, No | 270 °C, **110 °C**».
  No es el PETG de la fila de arriba: es una variante aparte, con su propio nombre y su
  propia boquilla.
  — [Prusa Research](https://help.prusa3d.com/filament-material-guide)

**El matiz, en dos partes.**

1. **60–80 y 70–90 no son el mismo rango**, aunque se solapen entre 70 y 80: una chapa de
   65 °C está dentro del de Bambu y **fuera** del de Prusa, y una de 85 °C al revés. Es el
   mismo caso que el del PLA en la contradicción 1 —fabricantes distintos, materiales de
   familia parecidos— y se escribe como contraste, no promediando.
2. **El 110 °C es el PETG HT, y por eso no se puede subir al PETG.** Es el error que esta
   entrada existe para impedir: una tabla con «PETG 70–90» y «PETG HT 110» al lado
   invita a escribir «Prusa lleva el PETG hasta 110 °C». **No lo dice nadie en este
   lote**, y quien lo escriba se está saltando el nombre de la fila.

Lo que sí se puede escribir es lo contrario y es más útil: **el PETG es el material donde
las tres fuentes se separan más**, 60, 70 y 90, y donde la variante HT se sale del rango
de las otras dos por 20 grados. Si el PETG es tu material, la fuente que manda es la del
fabricante de tu bobina, no la tabla de otro.

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
borrar la otra**: quien limpie una chapa Textured PEI con agua hirviendo porque Bambu lo
dijo habrá hecho exactamente lo que Prusa prohíbe por escrito.

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

## Relaciones

| Concepto | Se relaciona con | Cómo |
|---|---|---|
| temperatura de cama | [[warping-pla\|Warping en PLA]] | El warping es la consecuencia de una cama fría; y la contradicción 1 de aquel artículo se explica con la tabla de Bambu por chapa |
| temperatura de cama | [[adhesion-primera-capa\|Adhesión en la primera capa]] | La otra mitad del problema: la limpieza pesa tanto como la cifra, y el hilo del foro diagnostica una cama sucia antes que una cama fría |
| temperatura de cama | [[material\|Qué cambia entre materiales]] | Las cifras de esta página son por material; comparar PLA con PC es otro artículo |
| temperatura de cama | [[enclosure-y-warping\|Enclosure y warping]] | Subir la cama por encima de 45 °C con PLA obliga a abrir la tapa |
| temperatura de cama | [[slicer\|Qué slicer escribió esto]] | El perfil pone la temperatura solo, y el nombre de la clave decide si el dato llega |
| temperatura de cama | acetona frente a IPA | Dos recomendaciones opuestas de dos fabricantes sobre el mismo disolvente: Prusa lo concede en la PEI lisa, Bambu lo prohíbe |
| temperatura de cama | acetona que no dice que es acetona | La prohibición de Prusa no llega a quien usa quitaesmalte: el disolvente lleva acetona dentro y no lo pone en la etiqueta |
| temperatura de cama | esperar a que enfríe antes de soltar la pieza | Una base deformada al arrancar en caliente acaba diagnosticada como warping, y el warping se busca en la cama |
| temperatura de cama | temperatura de primera capa | OrcaSlicer da dos por chapa, `_initial_layer` y normal; subir sólo la primera es un ajuste distinto de subir la cama entera |
| temperatura de cama | PETG HT | Es la fila que hace que «Prusa lleva el PETG a 110 °C» sea falso: es otro material con otro nombre |
| temperatura de cama | limpieza con agua y jabón | Un fabricante dice caliente y el otro «not hot!», y el segundo además prohíbe sumergir la chapa |
| temperatura de cama | alisado químico | El mismo disolvente que daña la chapa sirve, en la página del PLA, para pegar la pieza: son objetos distintos y dos frases del mismo fabricante |
| bedTemp | limpieza de la chapa | El aceite de la piel es la causa número uno de fallo de adhesión, y no se arregla con grados |
| bedTemp | live-Z | Cambiar de chapa cambia también la altura de la boquilla, no sólo la temperatura |
