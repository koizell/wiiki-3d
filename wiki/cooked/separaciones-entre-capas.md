---
titulo: Separaciones entre capas
tema: separaciones-entre-capas
fuentes:
  - wiki/raw/separaciones-entre-capas-prusa-kb-layer-separation-and-splitting-fdm.md
  - wiki/raw/separaciones-entre-capas-bambu-wiki-interlayer-cracking.md
  - wiki/raw/separaciones-entre-capas-prusa-kb-layer-shifting.md
  - wiki/raw/separaciones-entre-capas-prusa-forum-layer-separation-delamination-help.md
  - wiki/raw/separaciones-entre-capas-prusa-forum-separation-of-layers-in-middle-of-print.md
  - wiki/raw/warping-pla-prusa-forum-warping-at-corners.md
  - wiki/raw/temperatura-cama-prusa-kb-filament-material-guide.md
cocinado: 2026-10-04
---

# Separaciones entre capas

> **Este fichero no parte de cero.** `wiki/cooked/warping-pla.md` ya tiene la tabla
> diferencial de modos de fallo y el issue 11914 de PrusaSlicer. Aquí se **reutilizan**
> y no se repiten: la tabla se amplía con la frontera que aporta `layer-shifting_2020` y
> se remite al fichero cocinado de warping para lo demás. Lo único que se cita de
> `warping-pla-prusa-forum-warping-at-corners.md` es el 11914, y por un motivo que está
> explicado en `## Sin respaldo`.
>
> **La sexta fuente entra por un hueco, no por una necesidad.** La tabla de
> materiales de Prusa ya estaba en `wiki/raw/` y ya se citaba en la contradicción 2, pero
> **decía explícitamente «no se recocina aquí»** y por eso no estaba en `## Afirmaciones`
> ni en la lista `fuentes`. Eso era trabajo sin hacer: la fila `PLA | No, -, No | 185-235
> °C, 50-60 °C` es legible, literal y citable, y su URL sí es un `url:` de frontmatter
> verificable. Ahora está cocinada con su cita y con su matiz, que es el que importa: **es
> la fila del PLA en una tabla de conjunto, y el alcance del dato es el de esa tabla.**
> **Deja de ser «el rango de trabajo» frente a «el rango de diagnóstico» del KB**: esa
> taxonomía era editorial nuestra y Prusa no la declara.
>
> **Esta es una recocina, no un fichero nuevo.** El informe
> `wiki/reviews/separaciones-entre-capas-revision-4.md` aprobó la tabla de los cuatro
> métodos de Bambu, los rangos con su matiz de marca, las cifras de Belt Status y la regla de
> foro del 80 % (con su «por debajo»), y los siete defectos que enumera están corregidos
> aquí. Lo que se conserva es lo aprobado; lo que cambia son las afirmaciones que
> sobre-atribuían, las que unían dos voces en una causa y las que inventaban propósitos,
> alcances o nombres de pieza. Al final, `## Tirado` recoge lo que se ha dejado de
> afirmar.
>
> **Nada de lo que hay aquí es una afirmación del artículo.** Donde dos fuentes oficiales
> discrepan, las dos están cocinadas y separadas con su atribución. Unirla es trabajo del
> redactor, y es un trabajo legítimo si se explica el matiz: si no, es una contradicción
> resuelta en silencio.

## Afirmaciones

### Qué es, y en qué eje se rompe

- **La definición de Prusa es de laminado:** *"This refers to the de-lamination of the
  printed layers"*. Causa principal, según el mismo artículo: un preset o perfil
  personalizado con temperaturas incorrectas **y/o** demasiada refrigeración, ya sea del
  ventilador de impresión o del entorno. — [Prusa Research](https://help.prusa3d.com/article/layer-separation-and-splitting-fdm_1806)
- **El mecanismo, y es la frase que sostiene el enlace con `warping-pla`:** *"Layer
  separation occurs when the object cracks due to forces exerted on the print when layers
  cool down at different rates. **Warping forces exceed the layer adhesion strength and
  the layers separate.**"* El propio Prusa dice que la separación entre capas es
  **consecuencia del warping**, no un fenómeno paralelo. — [Prusa Research](https://help.prusa3d.com/article/layer-separation-and-splitting-fdm_1806)
- **La definición de Bambu enuncia el eje, y sólo el eje:** *"When the interlayer adhesion
  of a model is insufficient and the material shrinkage is significant, cracks may appear on
  the printed part **along the Z direction**"*.
  **LÍMITE DE LO QUE DICE ESA FRASE:** sitúa la dirección de la grieta. **No establece que la
  base sea plana, ni que una grieta a lo largo de Z sea incompatible con que la base también
  se deforme.** Y Prusa dice lo contrario en su propio texto: su criterio de grieta es el
  corte *"limpio con una ligera curvatura hacia arriba"* (*"the clean cuts that show a bit of
  an upward bend or warp"*), y su mecanismo es que *"warping forces exceed the layer adhesion
  strength"*.
  **INFERENCIA NUESTRA, marcada como tal:** «along the Z direction» se puede leer como grieta
  perpendicular al plano de capa. Es una lectura de la frase, no una frase de Bambu, y no
  debe presentarse como criterio de la marca.
  **Los síntomas no son mutuamente excluyentes:** una capa que se separa siguiendo Z y una
  pieza con la base arqueada pueden ser el mismo fallo. **Nada en estas siete fuentes
  autoriza a excluir un mecanismo por el aspecto del otro.**
  — [Bambu Lab](https://wiki.bambulab.com/en/filament-acc/filament/print-quality/interlayer-cracking), [Prusa Research](https://help.prusa3d.com/article/layer-separation-and-splitting-fdm_1806)
- **Las dos definiciones no son la misma afirmación.** La de Prusa explica por qué se
  separan (fuerza de warping contra adhesión); la de Bambu describe por dónde se abre
  (a lo largo de Z). Se complementan, y el artículo puede usar las dos sin fundirlas.
  — [Prusa Research](https://help.prusa3d.com/article/layer-separation-and-splitting-fdm_1806), [Bambu Lab](https://wiki.bambulab.com/en/filament-acc/filament/print-quality/interlayer-cracking)

### Qué materiales, y un aviso de alcance que el artículo tiene que decir

- **Bambu no menciona PLA ni PETG en esta página.** Los cinco materiales que da como
  propensos son ABS, ASA, PC, PET-CF y PA-CF. — [Bambu Lab](https://wiki.bambulab.com/en/filament-acc/filament/print-quality/interlayer-cracking)
  **Aviso para el redactor: el silencio de Bambu sobre el PLA no es una recomendación
  en contra del PLA.** Es que la página se ocupa de los materiales donde el problema es
  común. Y sus dos cifras concretas **no tienen el mismo grado de atribución al material**,
  que es una diferencia que hay que mantener:
  - **Los 150 y 100 mm/s sí llevan material delante, textual:** *"For example, **with ABS**,
    you can reduce the inner wall speed to 150 mm/s and the outer wall speed to 100 mm/s."*
    Para esas dos velocidades, el ABS está escrito.
  - **El 60 % del paso 3 no lleva material al lado.** El paso dice *"If the fan speed for the
    inner and outer walls is 60% as shown below, reduce the "Max fan speed""* y no menciona
    ninguno. **Que sea un consejo pensado para ABS es una inferencia**, y es razonable —
    la página entera va de materiales propensos, y el ABS es el primero de la lista—, pero
    **no es una cita**. Si el artículo lo pone junto a un caso de PLA, tiene que decirlo
    como lo que es.
  En los dos casos, la página **no menciona el PLA en ningún momento**, así que ninguno de
  los dos números es un dato de PLA.
- **Prusa dice lo contrario sobre la frecuencia, y también es oficial:** *"Layer-separation
  is more an issue from the "old days" of unheated print-beds and less accessible materials,
  past ABS. This is rarely an issue on the MK-series hardware with PrusaSlicer presets,
  especially with materials like PLA and PETG."* — [Prusa Research](https://help.prusa3d.com/article/layer-separation-and-splitting-fdm_1806)
- **ABS es el material que Prusa describe como más propenso**, y la causa que da es el
  aire frío sobre la pieza antes de que se enfríe del todo: *"ABS is highly susceptible to
  layer separation when there's any sort of cold air blowing on the print before it has
  cooled down fully. We suggest turning fans OFF for ABS prints completely."* Y recomienda
  además cámara cerrada, incluso con calefacción. — [Prusa Research](https://help.prusa3d.com/article/layer-separation-and-splitting-fdm_1806)
- **PETG como sustituto del ABS, con la comparación explícita:** *"PETG has similar
  advantages ABS, but it’s much better for printing large objects and it does not have the
  same tendency to crack/de-laminate. ASA is also a great alternative but is still more
  dependent on a stable environment when printing than PETG."* — [Prusa Research](https://help.prusa3d.com/article/layer-separation-and-splitting-fdm_1806)
  Esto es una afirmación de fabricante y sostiene un criterio de elección de material,
  no una recomendación de artículo.

### Cómo se diagnostica

- **Prusa, el criterio de grieta frente a capa que falta:** *"It is the best way to tell the
  difference between cracking and missing layers. **Best way to identify cracked layers are
  the clean cuts that show a bit of an upward bend or warp.**"* Corte limpio con una
  ligera curvatura hacia arriba. — [Prusa Research](https://help.prusa3d.com/article/layer-separation-and-splitting-fdm_1806)
- **Bambu: una obstrucción leve de boquilla puede hacer que falte una capa, y eso se parece
  a una grieta.** *"A slight nozzle clog **may** prevent filament extrusion during a specific
  layer, **manifesting similarly to cracking**."* — [Bambu Lab](https://wiki.bambulab.com/en/filament-acc/filament/print-quality/interlayer-cracking)
  **Lo que esto da es una comprobación y un diagnóstico de causas posibles, no una
  prohibición.** El verbo del original es *may*: Bambu **no** dice que toda capa que falta
  sea un atasco. Y su paso 2 es *"Appropriately Increase Nozzle Temperature or Decrease Print
  Speed"*: **la vía térmica está en la misma lista, inmediatamente después.**
  **Y el caso térmico del hilo de 2026 apunta en sentido contrario:** Naugh atribuyó la
  pérdida de flujo a la **viscosidad al bajar la temperatura** y recomendó 220-230 °C para
  aquel caso. **Ninguna de las siete fuentes dice «el ajuste no es térmico» ni «la
  temperatura no lo arregla nunca»**, y el artículo no puede reproducir ese diagnóstico y
  luego fundar una imposibilidad incompatible con él.
- **Bobstro, el mismo aviso por el otro lado:** el exceso de velocidad *"may be accompanied
  by **under-extrusion on long straight extrusions**"*. — [bobstro, foro de Prusa](https://forum.prusa3d.com/forum/original-prusa-i3-mk3s-mk3-how-do-i-print-this-printing-help/separation-of-layers-in-middle-of-print/)
- **El hilo de 2026 aporta dos cosas y las dos van con etiqueta. Observación e
  interpretación van separadas y con autor.**
  - **newgen observa, y no leen su observación como una causa única:** *"As you can see,
    **the separation's pretty bad as the model gets higher** but **there's even
    under-extrusion on the base** of the temperature tower."* Y antes, del conjunto de sus
    pruebas: *"Separation appears at various heights in the multiple prints I've tried."*
    — [newgen, foro de Prusa](https://forum.prusa3d.com/forum/user-mods/layer-separation-delamination-help/?language=en)
    **Lo que newgen NO dice es dónde estaba la causa.** Su observación la sitúa junto a la
    base, y **eso no convierte la base en la causa**: es el mismo posteo que dice que la
    torre *falló* «around 200 degrees», y en una torre la temperatura varía con la altura.
  - **Naugh interpreta la foto, y el hilo mismo marca el límite de la foto:** *"**The photo
    doesn't have very high resolution**, but this is what you can mainly see."* Su lectura es
    un tapón de flujo **localizado en temperatura**: *"This temperature tower shows a drastic
    flow loss as the temperature drops, ending in a **severe under-extrusion clog around
    205°C before it could even attempt the 200°C layer**."*
    — [Naugh, foro de Prusa](https://forum.prusa3d.com/forum/user-mods/layer-separation-delamination-help/?language=en)
    **Naugh no atribuye el tapón a la base de la pieza ni verifica una causa única:** 205 °C
    y 200 °C son **capas de la torre de temperatura**, no un lugar del objeto.
  - **El mecanismo físico que da es suyo, y es la parte más detallada del lote:** *"As the
    temperature dropped, the filament viscosity became too high for the required volumetric
    flow rate. This created porous, "spongy" layers and caused the bridge to completely break
    down."*, y entre 205 y 210 °C *"Sagging filament and poor layer adhesion are clearly
    visible on the cooler tiers."*
    **[UNA SOLA FUENTE — foro, hilo sin resolver, y lectura de una imagen que el propio autor
    califica de baja resolución. Ver `## Sin respaldo`.]**
  - **Y de este caso sale además una vía térmica que las otras fuentes no tienen:** Naugh
    atribuye la pérdida de flujo a la **viscosidad al bajar la temperatura** y concluye
    *"The sweet spot for this material at the current print speed is around 220°C–230°C"*.
    **Por eso ninguna fuente sostiene «si falta material, no es la temperatura».**
  - **Única regla de lectura que sale, y es del autor del hilo, no de un documento:** newgen
    describe un empeoramiento hacia arriba junto a una under-extrusión en la base. **Que el
    síntoma empeore hacia arriba no localiza la causa, y este caso tampoco permite afirmar
    dónde estaba.** **Y las tres etiquetas acompañan a cada mención del caso:**
    **diagnóstico de foro, foto de baja resolución, caso sin resolver.**
- **Un tercer frente, del hilo de 2024 de Prusa, que ya está cocinado en
  `wiki/cooked/warping-pla.md` y aquí no se repite:** hay fallos de separación en las
  juntas de las capas que **no son de adhesión ni de warping**, sino under-extrusión y
  juntas por los cambios recientes de firmware y PrusaSlicer. Neophyl lo dice de otro
  modo, sobre las fotos de ese caso: *"Those pics just look like the **under extrusion and
  gaps at the seams** caused by the recent firmware/prusa slicer changes that many have
  reported and been complaining about"*. Se reporta en el issue
  **PrusaSlicer #11914**. — [Neophyl, foro de Prusa](https://forum.prusa3d.com/forum/how-do-i-print-this-printing-help/warping-at-corners/)
  **RESTRICCIÓN DE FUENTE — ver `## Sin respaldo`: la URL de GitHub no puede ir en
  `sources`.**

### La frontera diagnóstica: capas **separadas** frente a capas **desplazadas**

Esto es lo que aporta `layer-shifting_2020`, y **es la mitad de su valor**. La otra mitad
—cifras de correa y de polea— no es de adhesión y no se usa como tal. Va al final de este
apartado, y con la advertencia puesta.

- **Prusa define el otro fallo en una frase, y no es de adhesión:** *"Layer shifting is a
  printing issue that causes the layers of the printed object to **shift from their
  intended positions.** It is usually associated with an abnormal movement of the
  X-axis and/or the Y-axis, leading the extruder head to be misaligned mid-printing."*
  — [Prusa Research](https://help.prusa3d.com/article/layer-shifting_2020)
- **La causa es mecánica, y el artículo lo dice sin rodeos:** *"Layer shifts are most often
  caused by the **wrong tension of the belts or pulleys not being secure**."* Y sobre las
  poleas: *"A loose or misaligned pulley is usually the main cause of staircase layer
  shifts."* — [Prusa Research](https://help.prusa3d.com/article/layer-shifting_2020)
- **El criterio para distinguirlos, que es lo que el artículo necesita: en qué eje se
  desplazó.** *"it is crucial to recognize in which axis the layers shifted… Troubleshooting
  is the same for both axes."* — [Prusa Research](https://help.prusa3d.com/article/layer-shifting_2020)
- **La tabla que resuelve el eje, ACOTADA al modelo donde Prusa la enuncia:** movimiento
  inconsistente en X o en Y → tensión de correa; movimiento inconsistente **en diagonal** →
  *"the motor that controls that diagonal, or the pulley attached to it"*. Pero ese párrafo
  va **bajo el encabezado `Prusa CORE One`**, dentro de «Check the XY axes movement and the
  belt tension», y es una comprobación de tres movimientos —X, Y y **las dos diagonales**, a
  mano y con la impresora fría— que además avisa: *"When adjusting the belt tension, **do not
  lose alignment of the CoreXY**."*
  **ALCANCE, y es parte del dato: es una comprobación del árbol del CORE One, con
  geometría CoreXY. NO es un diagnóstico universal de cualquier impresora.** El alcance
  **MK3/S/+** es el del **Belt Status**, que está en otra sección y en otro apartado.
  — [Prusa Research](https://help.prusa3d.com/article/layer-shifting_2020)
- **La diferencia que hay que poder escribir:** en una capa desplazada **la unión entre
  capas se conserva** y lo que cambia es la posición; en una capa separada lo que se pierde
  es la unión. Por eso una pieza que sale corrida en bloque es un problema de correas, y
  subir la temperatura de cama no la toca.
  **INFERENCIA, si al redactor le sirve:** sale de las dos definiciones de Prusa juntas,
  una de cada artículo. **No lo dice ninguna fuente con esas palabras**, y si se usa, va
  marcado como inferencia.
- **Las cifras de `layer-shifting_2020` son geometría de correa, y aquí sólo sirven como
  frontera diagnóstica.** Se citan con su valor para que el redactor sepa qué buscar, y
  **no deben aparecer como datos de adhesión en ningún sitio del artículo**:
  - En MK3/S/+ el **Belt Status** se consulta en `LCD Menu -> Support -> Belt Status`.
    Mejor valor aproximado, según Prusa: **~250 en el eje X y ~275 en el Y**, con un rango
    óptimo de **±15** alrededor de esos valores en cualquier eje.
    — [Prusa Research](https://help.prusa3d.com/article/layer-shifting_2020)
  - **Por debajo de (o cerca de) 240 hay que aflojar la correa; por encima de (o cerca de)
    290 hay que apretarla.** Los valores se actualizan en cada Selftest o en
    `LCD menu -> Calibration -> Belt test`.
    — [Prusa Research](https://help.prusa3d.com/article/layer-shifting_2020)
  - **El valor no es una magnitud física.** El artículo lo dice: *"The value does not
    represent a physical quantity, but an arbitrary number inversely proportional to the
    motor load."* Esto es importante: el 250 no es una fuerza ni una tensión, y quien lo
    cite tiene que decirlo. — [Prusa Research](https://help.prusa3d.com/article/layer-shifting_2020)
  - En modelos sin Belt Status: *"the belt should sound roughly like a low bass string when
    plucked. It should be possible to pinch the two sides together with your thumb and index
    finger, but you should feel a little bit of resistance."*
    — [Prusa Research](https://help.prusa3d.com/article/layer-shifting_2020)
  - Geometría de polea: **llave allen de 2 mm** para apretar el tornillo de la polea en
    MINI. En XL, la polea izquierda queda **2,5 mm** por encima del inicio de la parte plana
    del eje del motor —con la llave de 2,5 mm como referencia—, o, alternativamente, se
    mide una distancia de **3,6 mm** entre el principio del eje del motor y la polea; la
    derecha va a ras con el borde superior del eje. Cada polea lleva **dos tornillos**, y
    uno tiene que apoyarse contra la parte plana del eje del motor.
    — [Prusa Research](https://help.prusa3d.com/article/layer-shifting_2020)
  - **Apretar un tornillo de polea suelto es sólo un arreglo temporal** y sirve
    sobre todo para *identificar* el problema: *"you will not be able to see if the set
    screw is aligned with the flat side of the motor-rod and **tightening it will only be a
    temporary fix**, but it is a great way of knowing if this is the issue and what needs to
    be disassembled."* — [Prusa Research](https://help.prusa3d.com/article/layer-shifting_2020)

### Un punto de contacto con el warping, que es warping y no separación

- *"Some overhangs might even **warp** upwards during the print, and the nozzle might crash
  into them."* Esto pasa también *"if you choose a **very small infill percentage**"*. Es
  warping localizado en un voladizo. — [Prusa Research](https://help.prusa3d.com/article/layer-shifting_2020)
- **CUIDADO con el consejo de ese mismo apartado, que es la trampa de este fichero.** Su
  prevención para el voladizo es **subir la velocidad del ventilador** de impresión o
  aumentar la longitud de retracción. Eso **no va con la adhesión entre capas**, y puesto
  junto al paso 3 de Bambu (reducir el ventilador) **parece una contradicción que no
  existe**: son dos problemas distintos. Si el redactor cita una, tiene que decir de qué
  problema habla. — [Prusa Research](https://help.prusa3d.com/article/layer-shifting_2020), [Bambu Lab](https://wiki.bambulab.com/en/filament-acc/filament/print-quality/interlayer-cracking)

### Qué hacer: los dos protocolos oficiales, separados

**Prusa Research** — [Knowledge Base, layer separation and splitting](https://help.prusa3d.com/article/layer-separation-and-splitting-fdm_1806):

- **Boquilla, para PLA, en pasos de 5 °C:** *"PLA may suffer from cracking and layer
  separation problems if you’re printing with insufficient temperature. Depending on the
  brand, PLA is printed at a range between **195-220**. If you are having issues, **try
  increasing the printing temperature in 5°C increments, until you get a good layer
  adhesion.**"* — **Ojo: el rango 195-220 viene sin unidad en el original.** No lo
  completes con un °C que no está, y si lo traduces, dilo.
- **Flow rate / extrusion multiplier, en pasos del 5 %:** *"Increase your printer’s flow rate
  (in PrusaSlicer called extrusion multiplier). **More material extruded will create a
  stronger bond between layers.** increase on 5% increments."* En PrusaSlicer está donde
  se ponen las temperaturas, pero **sólo se ve en modo Advanced o Expert**.
- ABS: ventilador a cero del todo, y cámara cerrada, incluso con calefacción.

**Y el rango de trabajo del material, que sale de otro documento de Prusa y no de este
artículo.** La fila del PLA de la tabla de materiales, literal:

> `MATERIAL | HARDWARE (Enclosure, Drybox, Hardened nozzle) | TEMPERATURES (Nozzle, Bed)`
> `PLA | No, -, No | 185-235 °C, 50-60 °C`

— [Prusa Research, tabla de materiales](https://help.prusa3d.com/filament-material-guide)

**Éste es el 185-235 °C. Los dos son de Prusa y los dos son de boquilla para PLA, pero NO hay
un rango «de trabajo» y otro «de diagnóstico»:** son dos documentos distintos, y cada uno
escribe su cifra sin remitir al otro.

| | Documento, con su texto literal | Contexto en el que está escrita |
|---|---|---|
| **185-235 °C** — tabla de materiales | `PLA \| No, -, No \| 185-235 °C, 50-60 °C`, en la columna `TEMPERATURES (Nozzle, Bed)` | Es la fila del PLA en una tabla de conjunto. **La tabla no menciona** separación, adhesión, grieta ni deslaminado en ninguna parte. |
| **195-220** — KB de separación entre capas | *"PLA may suffer from cracking and layer separation problems if you're printing with insufficient temperature. **Depending on the brand, PLA is printed at a range between 195-220**"* | Va **dentro del párrafo de prevención del PLA**, después de los dos párrafos de ABS. Lleva su matiz de marca, *"depending on the brand"*, y **no lleva unidad en el original**. |

**Lo que sí se puede afirmar de la relación entre los dos es un hecho de los documentos, y
nada más:** el KB **escribe su propio rango y no lo toma de la tabla**. Lo único que remite
a las guías de material es el párrafo del ABS, y para **elegir con qué material imprimir**,
no para ajustar una temperatura: *"You can check the material guides for choosing the best
material for your print"*. Y la tabla, por su parte, no menciona la separación entre capas.
**Son las dos remitencias que no se dan**, y por eso el artículo puede tener las dos cifras
sin que ninguna sea la versión corregida de la otra.
**LO QUE NO SE PUEDE AFIRMAR: que uno sea el rango de trabajo y el otro el de diagnóstico.**
**Es una taxonomía editorial nuestra, no una declaración de Prusa**, y el título del
documento no la demuestra. Ni el KB dice que 185 °C sea poco, ni la tabla dice que 220 °C
baste. Si el redactor necesita explicar por qué hay dos cifras, que lo presente **como
interpretación propia declarada**, y que no seleccione ninguna.
— [Prusa Research, KB](https://help.prusa3d.com/article/layer-separation-and-splitting-fdm_1806), [Prusa Research, tabla de materiales](https://help.prusa3d.com/filament-material-guide)

**Y en sentido inverso tampoco hay enlace: la tabla de materiales no menciona la separación
entre capas.** Ni una palabra de separación, adhesión, grieta ni deslaminado en ella. Son
las dos remitencias que no se dan, y por eso el artículo puede tener las dos cifras sin que
ninguna sea la versión corregida de la otra.

**Y lo que la misma fila dice sobre el hardware, que sí corrobora al KB:** la columna de
hardware del PLA es `No, -, No` — sin enclosure, sin drybox, sin boquilla endurecida. Es
la misma postura que el KB de separación entre capas cuando dice que es un problema de *"the
"old days" of unheated print-beds"* y que es raro en la serie MK con presets de PrusaSlicer.
**Dos documentos de Prusa que coinciden en que el PLA es el caso fácil**, y eso es lo que
hace que este artículo tenga que empezar por el diagnóstico y no por la cifra.
— [Prusa Research, tabla de materiales](https://help.prusa3d.com/filament-material-guide), [Prusa Research, KB](https://help.prusa3d.com/article/layer-separation-and-splitting-fdm_1806)

**AVISO — el 50-60 °C de esa misma fila NO es un ajuste de adhesión para este artículo.**
Es la temperatura de cama del PLA, y el KB de separación entre capas **no da ninguna cifra
de cama**. La cifra de cama de Prusa está ya cocinada en `wiki/cooked/temperatura-cama.md`,
donde se cruza con la tabla por chapa de Bambu (35–45 ℃ en Cool Plate, 45–65 ℃ en las
otras tres) y con la contradicción de `warping-pla`. **Si el redactor pone la cama en
este artículo, la tiene que sacar de `temperatura-cama.md`, no de esta fila.**

**Bambu Lab** — [wiki, interlayer cracking](https://wiki.bambulab.com/en/filament-acc/filament/print-quality/interlayer-cracking). Los cuatro métodos van **numerados en el original**, y el orden importa. Cifras: **cama +5-10 °C**, **cámara +5 °C** si el equipo tiene calefacción activa.

1. **Desatasascar la boquilla** (cold pull). Los tutoriales están por modelo —H2D, H2C,
   H2S, serie A, X1/P1— y **no se han descargado**.
2. **Aumentar apropiadamente la temperatura de boquilla O bajar la velocidad.** El
   mecanismo lo dice: *"This method allows the extruded filament more time to bond with the
   layer below, thereby improving interlayer adhesion."* La única cifra de velocidades de la
   página **lleva el material escrito, textual**: *"For example, **with ABS**, you can reduce
   the inner wall speed to **150 mm/s** and the outer wall speed to **100 mm/s**."*
3. **Reducir la velocidad del ventilador de refrigeración.** Previsualizar la velocidad
   tras laminar; *"If the fan speed for the inner and outer walls is 60% as shown below,
   reduce the "Max fan speed"."* **Este 60 % no lleva ningún material al lado en el
   original**: es el número de un ejemplo de captura, no una cifra atribuida a un material.
   Que el consejo sea para ABS es **una inferencia**, no una cita — ver el aviso de
   `## Afirmaciones`, que separa las dos atribuciones.
4. **Subir la cama 5-10 °C**, y **la cámara 5 °C** si hay calefacción activa.

**El hilo de 2020, que es el único sitio donde las tres cosas van juntas:**

- **El orden de bobstro es explícito, y es "ventilador primero":** *"Excessive
  cooling/insufficient heat. **Try reducing cooling first.** Increasing heat can also
  introduce stringing, but adding **5-10C** may help."*
  **ALCANCE DEL «PRIMERO»: es el orden de la lista de bobstro, que él mismo abre con *"A few
  possible causes"*.** **No es un orden compartido con Bambu ni con Prusa**: Bambu pone el
  ventilador en el paso 3, después de un método térmico, y el KB no prescribe ese orden.
  — [bobstro, foro de Prusa](https://forum.prusa3d.com/forum/original-prusa-i3-mk3s-mk3-how-do-i-print-this-printing-help/separation-of-layers-in-middle-of-print/)
- Y las otras dos causas que da: altura de capa excesiva para la boquilla (va en
  `## Sin respaldo`, es una sola fuente de foro) y **exceso de velocidad**, que ya está en
  el apartado de diagnóstico.
- **La altura de capa, que es el campo `layerHeight` del panel y sólo tiene una fuente:**
  *"you want to keep layer heights **below 80% of your nozzle size**. Any higher and you start
  to get extrusions with a circular cross-section and little squish with the layer
  underneath. This can result in poor inter-layer adhesion."* Con boquilla de 0,4 mm el
  techo sería 0,32 mm. **[UNA SOLA FUENTE — foro.]**

### Los dos hilos: **ninguno se resuelve, y hay que oírlos así**

- **Hilo de 2026 (`layer-separation-delamination-help`), 5 posts.** El autor, newgen,
  había probado antes de escribir: re-laminar, ajustar la altura del hotend, abrir y cerrar
  la rejilla, actualizar el firmware (y dice que el fallo era previo), reensamblar el
  gearbox, retensar las correas, **ajustar los tornillos de tensión del idler**, recargar el
  filamento, **cold pull**, probar otra bobina de PLA e imprimir otro modelo. Eso es una
  lista de descartes, y es utilizable como «antes de tocar la temperatura, comprueba esto» —
  pero como *lo que no funcionó*, que no es lo mismo que *la causa*.
  **NOMBRE LITERAL, sin traducir ni atribuirle función: el post dice *"Adjusted the idler
  tension screws"*.** Es un ajuste de tensión del idler. **No es «tornillos de inercia»** —
  ese nombre no aparece en la intervención, sólo en las notas del recolector— y **no se le
  atribuye aquí ninguna función de inercia ni ninguna pieza concreta**, porque el post no
  dice qué pieza ajusta.
  — [newgen, foro de Prusa](https://forum.prusa3d.com/forum/user-mods/layer-separation-delamination-help/?language=en)
- **El hilo acaba sin cerrar:** *"The issue still persists so I’ll post it in the correct
  one."* Y no vuelve. **El 220-230 °C es una recomendación, no un antes/después validado.**
  — [newgen, foro de Prusa](https://forum.prusa3d.com/forum/user-mods/layer-separation-delamination-help/?language=en)
- **Lo que sí propuso Naugh, con su recomendación completa:** *"The sweet spot for this
  material at the current print speed is around **220°C–230°C**, where the walls look smooth
  and the bridging stays tight. **Try lowering the printing speed and drying the filament.
  Even if you've tried another spool, it might also be damp.**"* Además avisa de que un
  *"poor nozzle wipe"* puede arrastrar material hacia la zona de impresión, lo que se ve
  como *"stray loops around the brim/bed"*. — [Naugh, foro de Prusa](https://forum.prusa3d.com/forum/user-mods/layer-separation-delamination-help/?language=en)
- **Hilo de 2020 (`separation-of-layers-in-middle-of-print`), 3 posts.** El autor,
  jaychatt, responde: *"Thanks. **I will try to reduce cooling and slow the speed.**"*
  **Y no vuelve a informar del resultado.** — [jaychatt, foro de Prusa](https://forum.prusa3d.com/forum/original-prusa-i3-mk3s-mk3-how-do-i-print-this-printing-help/separation-of-layers-in-middle-of-print/)
- **Lo más delicado de este hilo: el autor descarta la altura de capa sin medirla.**
  *"I don't think it was a layer size issue, since I was doing 0.2mm layers with a 0.4mm
  nozzle."* Con 0,2 mm y boquilla de 0,4 mm está al **50 %**, muy por debajo del 80 % que
  proponía bobstro. — [jaychatt, foro de Prusa](https://forum.prusa3d.com/forum/original-prusa-i3-mk3s-mk3-how-do-i-print-this-printing-help/separation-of-layers-in-middle-of-print/)
  **Esto NO refuta la regla del 80 %**, porque nadie la comprobó en ese caso: la descarta
  de oído, con una cuenta que el propio bobstro no verificó en la máquina. **Y NO la
  confirma**, porque el hilo se quedó sin resultado. Los dos hilos sirven de **criterio**,
  no de **prueba**, y así hay que oírlos.
- **El material del hilo de 2020 es PLA** sin marca (*"You can see it here with PLA"*), y
  **el de 2026 es Elegoo PLA**, filamento de terceros. Los dos son los dos casos que
  existen de antes/después en este lote, y ninguno está cerrado.
- **Lo que el autor del hilo de 2020 deja abierto y no desarrolla:** *"I also suspect the
  filament. I've been having other weird things happen with this filament that I haven't
  seen in the past."* No dice la marca ni qué le pasaba. Es una pista, no un dato.

## Contradicciones

**No se resuelven aquí.** Se anotan con su matiz, y el redactor tiene que explicar el matiz
en el artículo en vez de elegir un número. Y hay una advertencia que va antes: **las tres
son afirmaciones del artículo que el redactor puede escribir, no datos que este fichero
cocine.** Lo que aquí se deja son las cifras cocinadas y separadas, con su atribución; la
unión es trabajo del redactor, y es legítimo si explica el matiz.

### 1. Qué subir: Prusa sube la boquilla, Bambu sube la cama

- **Prusa, boquilla, en pasos de 5 °C:** *"try increasing the printing temperature in 5°C
  increments, until you get a good layer adhesion"*, para el PLA.
  — [Prusa Research](https://help.prusa3d.com/article/layer-separation-and-splitting-fdm_1806)
- **Bambu, cama +5-10 °C y cámara +5 °C**, y en cuanto a boquilla: *"**Appropriately
  Increase Nozzle Temperature or Decrease Print Speed**"*, sin tocar la cama en el paso 2
  —la cama está en el paso 4, al final—. — [Bambu Lab](https://wiki.bambulab.com/en/filament-acc/filament/print-quality/interlayer-cracking)
- **Y el orden real de Bambu es éste: boquilla, temperatura, ventilador, cama.** El
  ventilador es el **paso 3**, y llega **después** del método térmico del paso 2. Eso es lo
  que dice la numeración del original. — [Bambu Lab](https://wiki.bambulab.com/en/filament-acc/filament/print-quality/interlayer-cracking)
- **bobstro tiene otro orden, y pone el ventilador el primero:** *"Excessive
  cooling/insufficient heat. **Try reducing cooling first.**"* El calor —**+5-10 °C**— es la
  segunda mitad de su propia línea, con su aviso, *"increasing heat can also introduce
  stringing"*. **Su orden y el de Bambu no coinciden, y ninguno de los dos es el de Prusa.**
  — [bobstro, foro de Prusa](https://forum.prusa3d.com/forum/original-prusa-i3-mk3s-mk3-how-do-i-print-this-printing-help/separation-of-layers-in-middle-of-print/)

**El matiz, en cuatro partes.**

1. **Las dos son oficiales y ninguna anula a la otra.** Prusa sube boquilla; Bambu sube
   cama. **Lo que las une es la dirección** —más adhesión entre capas— y lo que las
   separa es el **parámetro**. No son dos cifras que se pelen por un rango: son dos rutas
   distintas hacia el mismo objetivo.
2. **No hay orden compartido, y el «primero» es de bobstro y sólo suyo.** Su texto es
   *"Excessive cooling/insufficient heat. **Try reducing cooling first.**"* — pero lo dice
   **dentro de una lista que abre con *"A few possible causes"***, así que es el orden de su
   propia lista, no un consenso entre fuentes. **Bambu pone el ventilador en el paso 3,
   después de un método térmico** (*"Appropriately Increase Nozzle Temperature or Decrease
   Print Speed"*). **Y Prusa identifica el exceso de refrigeración como causa** (*"too much
   cooling from either the print fan or the surrounding environment"*) **sin prescribir ese
   orden**: su recomendación es subir la boquilla en pasos de 5 °C.
   **Una causa compartida no es una prioridad compartida.** Cada protocolo se escribe con su
   orden real, y «primero» se atribuye a quien lo dice: sólo bobstro.
3. **Lo que de verdad las diferencia es el orden de cada lista, y Prusa no tiene una
   lista numerada.** El KB llega a la boquilla en un párrafo de prevención, después de los
   de ABS; Bambu pone la cama en el paso 4, al final. **El orden de cada fuente es el orden
   de su propio documento, y no hay forma de deducir de aquí cuál de los dos parámetros
   resuelve más casos.** Si el redactor escribe «suba la cama» o «suba la boquilla»
   eligiendo, acaba de resolver la contradicción en silencio. Lo que puede escribir es **la
   lista completa de cada fuente**, con su orden y con su atribución.
4. **Un matiz que el redactor no debe dejar pasar: el artículo es de PLA y Bambu no habla
   de PLA en esta página.** Los cuatro pasos de Bambu están pensados para ABS, ASA, PC,
   PET-CF y PA-CF. De sus dos cifras, **las velocidades —150 y 100 mm/s— llevan "with ABS"
   escrito en el original**, y **el 60 % del paso 3 no lleva ningún material al lado**: ese
   es un número de ejemplo, y atribuirlo al ABS es inferencia. **Ninguno de los dos es un
   dato de PLA.** Prusa, en cambio, tiene un párrafo específico de PLA. **Bambu cubre mejor
   el fenómeno en general; Prusa cubre mejor este material.** Ese reparto es un hecho del
   artículo y puede escribirse.

### 2. El rango de temperatura de boquilla para el PLA: tres cifras y tres sitios distintos

- **195-220**, *"Depending on the brand"*, **sin unidad en el original**, y escrito dentro
  del párrafo de prevención del PLA del KB de separación entre capas. No es una tabla de
  materiales. — [Prusa Research](https://help.prusa3d.com/article/layer-separation-and-splitting-fdm_1806)
- **185-235 °C**, la fila del PLA de la tabla de materiales de Prusa: `PLA | No, -, No |
  185-235 °C, 50-60 °C`. **Ya está cocinado en `## Afirmaciones`, en el bloque de Prusa**, y
  también en `wiki/cooked/temperatura-cama.md`.
  — [Prusa Research](https://help.prusa3d.com/filament-material-guide)
- **220-230 °C** como *"sweet spot"*, para **Elegoo PLA** y **a la velocidad de impresión
  de aquel caso**. Recomendación de un hilo que **no se resolvió**.
  — [Naugh, foro de Prusa](https://forum.prusa3d.com/forum/user-mods/layer-separation-delamination-help/?language=en)

**El matiz.** Los tres pueden ser ciertos a la vez y **no se eligen**:

1. El 185-235 es la fila del **PLA en una tabla de conjunto**. El KB **no lo toma de la
   tabla**: escribe su propio rango en su propio texto, y sólo remite a las guías de
   material en el párrafo del ABS, para elegir material. Y la tabla, por su parte, no
   menciona la separación entre capas. **Dos documentos de Prusa que no se remiten el uno
   al otro para esa cifra.**
2. El 195-220 lo da el KB de separación entre capas, con su matiz de marca, *"depending on
   the brand"*. **Que no coincida con el 185-235 no es una contradicción y no hace falta
   inventarles dos propósitos.** Atribuir uno a «rango de trabajo» y el otro a «rango de
   diagnóstico» **es una taxonomía editorial nuestra**: ni el KB dice que 185 °C sea poco,
   ni la tabla dice que 220 °C baste, y el título del documento no demuestra que los dos
   números respondan a criterios distintos. **Si el redactor usa esa lectura, la declara
   como interpretación propia y no elige un número.**
3. El 220-230 **sí explica** por qué el caso de 2026 no lo resolvió el KB: es filamento de
   terceros, y el propio KB dice que el PLA varía según marca. **Pero explicar por qué
   pueden coexistir no es respaldarlo:** es una recomendación de foro sin resultado. Si
   el artículo lo usa, lo usa como lo que es.

### 3. La separación entre capas es consecuencia del warping… ¿siempre?

Aquí Prusa y el foro de 2026 no se contradicen en cifras sino en **qué se puede
afirmar**, y es la contradicción que más fácilmente se resuelve mal, porque resolverla
suena a matiz y en realidad es una afirmación.

- **Prusa, mecanismo general:** *"Layer separation occurs when the object cracks due to forces
  exerted on the print when layers cool down at different rates. **Warping forces exceed the
  layer adhesion strength and the layers separate.**"* La separación es, según el KB, el
  efecto de una fuerza de warping que gana.
  — [Prusa Research](https://help.prusa3d.com/article/layer-separation-and-splitting-fdm_1806)
- **Y el mismo KB impide excluir warping por el aspecto:** su criterio de grieta es *"the
  **clean cuts that show a bit of an upward bend or warp**"*. **Una capa que se separa
  mostrando curvatura es justamente la que el KB llama grieta**, así que **una base arqueada
  no expulsa el mecanismo**, y las dos cosas pueden convivir.
  — [Prusa Research](https://help.prusa3d.com/article/layer-separation-and-splitting-fdm_1806)
- **El hilo de 2026, con las dos voces separadas:** **newgen observa** que la separación
  empeora hacia arriba *"but there's even under-extrusion on the base"*, y **Naugh interpreta
  una foto que él mismo califica de baja resolución**, atribuyéndola a la viscosidad al
  bajar la temperatura, con un tapón *"around 205°C before it could even attempt the 200°C
  layer"* y una recomendación de 220-230 °C.
  **Lo que ya es newgen en su primer post, no Naugh:** *"the issue may be due an
  under-extrusion issue or a temperature issue"*.
  **Lo que este caso NO demuestra es dónde estaba la causa: ninguna intervención la
  localiza.** El hilo termina **sin resolver** (*"The issue still persists"*).
  — [newgen y Naugh, foro de Prusa](https://forum.prusa3d.com/forum/user-mods/layer-separation-delamination-help/?language=en)
- Y hay un tercer frente en `## Afirmaciones`: el issue **PrusaSlicer #11914**, separaciones
  en las juntas por cambios de firmware y PrusaSlicer, que tampoco es warping.
  — [Neophyl, foro de Prusa](https://forum.prusa3d.com/forum/how-do-i-print-this-printing-help/warping-at-corners/)

**El matiz.** El KB describe el **mecanismo típico**, y por eso este artículo tiene que
enlazarse con `warping-pla` en ambos sentidos. El hilo **no deroga** al KB —es un caso de
foro, con foto de baja resolución y sin resolver, contra una fuente oficial—, pero **sí
impide una frase concreta: «si se separan capas, es warping».**
Lo que sale de los dos es una afirmación diagnóstica y es del artículo: **la separación es
un síntoma con varias causas posibles, y la primera pregunta es si el corte es limpio y
curvo o si falta material, porque la respuesta cambia qué ajuste toca.** **Y la pregunta
no cierra ninguna vía**: el caso térmico del hilo va en sentido contrario, así que un corte
que no parece limpio **no autoriza a descartar la temperatura**. Sin esa frase, el artículo
explica demasiado.

**Y una advertencia de atribución, que viene de `wiki/cooked/warping-pla.md`:** el
consejo de reimprimir «a mucha menos velocidad» para descartar efectos de los perfiles
rápidos es de **Diem, en ese mismo hilo de 2024**, y es una sospecha razonada, no una
prueba. No lo cuelgues de Naugh.

## Sin respaldo

Una sola fuente secundaria, sin corroboración. El redactor puede usarlas **marcadas** como
lo que son. Y aquí hay una restricción que no es una afirmación sino una condición sobre
el frontmatter del artículo.

- **La regla del 80 %: altura de capa por debajo del 80 % del diámetro de la boquilla.**
  **[UNA SOLA FUENTE — foro, usuario con rango "Eminent Member", NO oficial.]** No
  aparece en la Knowledge Base de Prusa, y en el hilo nadie la contrasta con una fuente
  oficial. Es la afirmación que sostiene el campo `layerHeight` del panel, y por eso el
  redactor tiene que poder decir **de dónde sale**: de un foro, no de Prusa.
- **Y que el propio caso del hilo la desmienta o la confirme: ninguna de las dos cosas.**
  El autor descartó la altura de capa sin medir el laminado (*"I was doing 0.2mm layers
  with a 0.4mm nozzle"*, o sea al 50 %). **[NO ES NI UNA COSA NI LA OTRA: nadie midió
  nada en ese caso.]** El redactor no puede escribir ni que la regla falló ni que se
  confirmó; lo único honesto es que **el hilo se quedó sin resultado**, que es exactamente
  lo mismo que obliga a tratar el 220-230 °C de la contradicción 2 como recomendación y no
  como dato.
- **El "sweet spot" de 220-230 °C** para PLA, y con él todo lo que se apoya en él: bajar la
  velocidad y secar el filamento. **[UNA SOLA FUENTE — foro, hilo sin resolver.]** El KB
  oficial da pasos de 5 °C desde 195-220; el 220-230 sale de una foto de baja
  resolución.
- **El diagnóstico completo de Naugh sobre la torre de temperatura**: la pérdida de flujo
  drástica al bajar la temperatura, el tapón alrededor de 205 °C, las capas «esponjosas», los
  puentes rotos entre 205 y 210 °C, el *nozzle wipe* pobre arrastrando material.
  **[UNA SOLA FUENTE — foro, Y lectura de una imagen que el propio autor califica de baja
  resolución.]** Es el análisis más detallado del lote y no está verificado por nada más. Si
  se usa, **sin presentarlo como más de lo que es**: lo que sale de la foto es la
  observación, y el mecanismo físico es lo que el foro infiere a partir de ella.
  **Y con las etiquetas, siempre: diagnóstico de foro, foto de baja resolución, caso sin
  resolver.**
- **Dónde estaba la causa en aquel caso: no se sabe, y está prohibido afirmarlo.** Ni newgen
  ni Naugh la localisation. La extrapolación «la separación crecía hacia arriba mientras la
  causa estaba abajo del todo» salía de las notas del recolector, no de las intervenciones:
  newgen escribió que la torre *falló* «around 200 degrees», que es una cota de temperatura,
  y Naugh/localizó el tapón **en 205 °C**, no en la base de la pieza. **[NO TIENE
  RESPALDO EN NINGUNA FUENTE.]** El redactor no puede escribir dónde estaba la causa, ni
  como ejemplo demostrado de que el warping no explica nada.
- **La observación de newgen es suya y sigue siendo una observación de foto.** *"the
  separation's pretty bad as the model gets higher but there's even under-extrusion on the
  base"* es una descripción de la torre, en un hilo sin resolver y sin foto descargada.
  **[UNA SOLA FUENTE — foro.]** De ella **sí** sale una regla de lectura útil —que el
  síntoma empeore hacia arriba no localiza la causa— y esa regla no depende de saber dónde
  estaba.
- **«Grieta perpendicular al plano de capa», como criterio de Bambu: es una lectura nuestra.**
  Lo que el original dice es *"cracks may appear on the printed part **along the Z
  direction**"*. La perpendicularidad es la interpretación de esa frase, y **ninguna fuente
  de las siete la escribe ni la respalda**. **[INFERENCIA NUESTRA — se usa marcada como tal,
  nunca como criterio de la marca.]** Y al revés tampoco: **ninguna fuente establece que la
  base tenga que ser plana**, y Prusa dice lo contrario al llamar grieta al corte con
  curvatura.
- **El «+5-10 °C» de bobstro** como remedio del calor insuficiente.
  **[UNA SOLA FUENTE — foro.]** El número coincide con los 5-10 °C de **cama** de Bambu y
  con los 5 °C de boquilla de Prusa, pero **coincidir la magnitud no es corroborar**: son
  parámetros distintos y en fuentes distintas.
- **La lista de cosas que no funcionaron** en el hilo de 2026 (cold pull, otra bobina,
  retensar correas, re-laminar, firmware nuevo). **[UNA SOLA FUENTE — foro, y es «no
  funcionó», que no es «es la causa».]** Utilizable como lista de descartes del autor, no
  como lista de descarte de causas.
- **Que otro spool pueda estar húmedo aunque lo cambiaras**, y que un *poor nozzle wipe*
  arrastre material. **[UNA SOLA FUENTE — foro.]** Para la humedad hay una afirmación
  oficial en otro artículo, en `wiki/cooked/warping-pla.md`: chasquidos o superficie
  rugosa con burbujas son de filamento húmedo. **Pero es de warping, no de grietas**, y la
  página de interlayer-cracking de Bambu no menciona la humedad. La corroboración es
  parcial y por otro artículo: si el redactor la usa, con ese matiz.
- **La sospecha de filamento del hilo de 2020** (*"I also suspect the filament"*), sin marca
  ni desarrollo. **[UNA SOLA FUENTE — foro, y sin desarrollar.]**
- **Que bajar la velocidad solucione el problema.** Bambu da cifras concretas
  (150/100 mm/s) **pero las dice para ABS**; los dos hilos de foro sólo dicen «baja la
  velocidad» y **ninguno vuelve a informar**. **[SIN RESULTADO EN NINGÚN CASO.]**
- **RESTRICCIÓN DE FUENTE — la URL de PrusaSlicer #11914 no puede ir en `sources`.**
  `https://github.com/prusa3d/PrusaSlicer/issues/11914` aparece **en el cuerpo** de
  `wiki/raw/warping-pla-prusa-forum-warping-at-corners.md`, y **ningún fichero de
  `wiki/raw/` la tiene como `url:` de frontmatter**. Se puede **hablar** del issue —está
  documentado en una fuente cruda, con su contexto— pero **la cita va al hilo del foro**:
  `[Neophyl, foro de Prusa](https://forum.prusa3d.com/forum/how-do-i-print-this-printing-help/warping-at-corners/)`,
  que sí es un `url:` verificable. La comprobación #5 exige que cada URL de `sources`
  exista en `wiki/raw/` con ese mismo `url`, y esta no. **Escribir la URL de GitHub
  inline como enlace de apoyo es aceptable; ponerla en `sources` es motivo de rechazo.**

## Tirado

Qué se ha eliminado y por qué. El redactor no usa nada de esto.

- **Todo el `layer-shifting_2020` que es hardware por modelo.** Es un artículo largo y
  casi todo son procedimientos para CORE One, serie MK, MINI/+ y XL: comprobar el modo de
  alimentación, mover los ejes con los menús del LCD y a mano, varillas lisas y
  lubricación, clips y haces de cables, obstrucciones en el recorrido del extrusor o de la
  cama, tornillos de montaje de motor, tensores de correa, y los seis `[IMAGE]` de
  esquema con sus subtítulos de modelo. **Lo único que se queda es la definición, el
  criterio del eje y las cifras de correa como frontera diagnóstica**, porque nada de eso
  toca la adhesión entre capas.
- **El apartado «Print geometry and settings» de `layer-shifting_2020`, entero**, salvo el
  contacto con el warping. Subir el ventilador y la retracción para voladizos es consejo de
  otra cosa, y dejarlo suelto se lee como contradicción con el paso 3 de Bambu. Se queda
  la advertencia, con su etiqueta.
- **La mitad del `layer-separation-and-splitting-fdm` que es de ABS**: mesa IKEA como
  cámara, la recomendación de no poder cubrir toda el área de impresión con ABS, y los
  enlaces a los *material guides*, a la guía de calibración del extrusion multiplier y al
  post del blog de la cámara. **Son ejemplos y navegación**, no afirmaciones. Lo que sí se
  queda es la comparación **PETG / ASA / ABS**, que es un criterio de material y está
  escrito en el artículo.
- **Los «End Notes» de la página de Bambu**: *"We hope this guide has provided clear and
  practical support"*, el ticket de soporte y el Bambu AI. Boilerplate de soporte.
- **Los enlaces a los tutoriales de desatasascado de Bambu** (H2D, H2C, H2S, serie A,
  X1/P1) y al ticket: no descargados, y aquí sólo están los textos. Son navegación interna
  de la wiki.
- **La firma de bobstro**, entera: dos líneas sueltas (*"My notes and disclaimers on 3D
  printing / and miscellaneous other tech projects"*), la cita de Spock **cortada por la
  mitad de la frase** y un enlace que acaba en *"Unfortunately,&hellip;"*. No es contenido.
- **Los comentarios del CMS**: 2 en el artículo de separación entre capas y 67 en el de
  capas desplazadas. No descargados, y en su mayoría de soporte.
- **Erratas y rarezas de los originales**, que se conservan en `wiki/raw/` porque esa capa
  no se toca, y que aquí no aportan nada: *"sorrounding"*, *"past ABS"* (que el original
  dice literalmente), *"(custom)profile"* sin espacio, *"increase on 5% increments"* con el
  verbo en minúscula, *"A quick to check this aspect"*, *"Even it is loose"*, las
  mayúsculas sueltas tras una negrita de *"Left"* y *"Right"*, la palabra suelta
  *"screenshots"* al final de `layer-shifting_2020`, y dos `**` sin texto de vídeo
  embebido.
- **Las fotos, que son la evidencia de dos hilos y no se han descargado.** La torre de
  temperaturas del hilo de 2026 —que es la base de todo el diagnóstico de Naugh—, y las
  fotos de grietas del KB y del hilo de 2020. Naugh dice dos veces que la resolución de la
  suya es baja. **La foto no ha soutenu ninguna afirmación; ha servido para un diagnóstico
  marcado.**
- **El `195-220` sin unidad no se ha completado.** Se cita con la falta, y no se le pone
  un °C que el original no trae.
- **Lo que el redactor tiene que NO reintroducir**, porque es lo que este fichero ha
  descartado y no está en ninguna parte: que los dos hilos se resolvieran, que el 80 %
  estuviera medido, que la URL del issue 11914 sea citable como fuente, y que las cifras de
  correa sean datos de adhesión.
- **Lo que este mismo fichero afirmaba antes y la revisión 4 ha quitado.** No es relleno ni
  duplicado: son afirmaciones que sobre-atribuían, y el redactor tiene que saber que ya no
  están respaldadas aunque las dos lingieran bien escritas. Van aquí porque desaparecen de
  `## Afirmaciones` sin dejar rastro:
  - **«Tornillos de inercia».** El post dice *"Adjusted the idler tension screws"*. El nombre
    español estaba en las notas del recolector, no en la intervención.
  - **«La separación crecía con la altura mientras la causa estaba abajo del todo»**, y su
    uso como contraejemplo ya demostrado de que el warping no explica nada. **Nadie
    localización la causa.**
  - **«Las tres coinciden en el orden: ventilador primero».** Una causa compartida no es una
    prioridad compartida; el «primero» es de bobstro y sólo suyo.
  - **«El ajuste no es térmico: es la boquilla»** y **«si el problema es flujo, la
    temperatura no lo arregla nunca»**. Ninguna fuente lo dice, y el hilo de 2026 dice lo
    contrario para su caso.
  - **La taxonomía «rango de trabajo» / «rango de diagnóstico»** para el 185-235 y el
    195-220. Era editorial nuestra; los dos salen ahora atribuidos a dos documentos.
  - **La regla de movimiento en diagonal** presentada como diagnóstico universal. Es del
    árbol del CORE One, con su aviso de CoreXY.
  - **«Base plana + grieta perpendicular al plano + ajustes contrarios al warping»** como
    reglas de diagnóstico. Lo único que hay es *"along the Z direction"* en Bambu y el
    criterio del corte limpio con curvatura en Prusa, y **las dos se contradicen sobre si
    pueden convivir: pueden.**

## Relaciones

| Concepto | Se relaciona con | Cómo |
|---|---|---|
| separaciones entre capas | [[warping-pla\|Warping en PLA]] | **el mismo fenómeno visto en otro eje.** El KB de Prusa dice literalmente que las fuerzas de warping superan la adhesión y las capas se separan: la separación *es* la consecuencia del warping. **Los dos artículos se escriben el uno para el otro, y en los dos sentidos** |
| separaciones entre capas | [[warping-pla\|Warping en PLA]] (diagnóstico) | corte limpio con ligera curvatura arriba = grieta. Ese es el criterio de Prusa, y es la pregunta que decide qué ajuste se toca. **Lo que Prusa NO da es la regla complementaria**: no dice que un corte que no es limpio sea siempre boquilla, y ninguna fuente prohíbe la vía térmica en ese caso |
| separaciones entre capas | síntomas no excluyentes | **una grieta a lo largo de Z y una base arqueada pueden ser el mismo fallo.** El criterio de Prusa llama grieta al corte *con* curvatura, y su mecanismo es el warping: **el aspecto no expulsa el mecanismo, y nada permite excluir la combinación de fallos** |
| separaciones entre capas | flujo / under-extrusión | **la colisión central.** Una obstrucción leve de boquilla *puede* manifestarse como una grieta, y por eso el paso 1 de Bambu es el cold pull. **Y el paso 2 es térmico**, así que la comprobación es «¿hay obstrucción?», no «¿es o no térmico?». En el KB de Prusa, la causa principal incluye un perfil mal puesto |
| separaciones entre capas | capas desplazadas (layer shifting) | **la frontera que este artículo necesita y que `layer-shifting_2020` define.** La capa desplazada conserva su unión y cambia de sitio: es desalineación mecánica por correas y poleas. Apretar la cama no la toca. Reconocer en qué eje se deslocó es el paso uno, y el movimiento en diagonal apunta al motor o a la polea de esa diagonal — **en el árbol del CORE One, con el aviso de no perder la alineación CoreXY** |
| separaciones entre capas | [[temperatura-cama\|Temperatura de cama]] | **sólo la aporta Bambu** en este tema: +5-10 °C de cama y +5 °C de cámara. El KB de separación entre capas de Prusa **no da una cifra de cama**; la de Prusa sale de su tabla de materiales, que ya está cocinada en `temperatura-cama.md` |
| separaciones entre capas | temperatura de boquilla | **tres cifras de tres sitios distintos:** el 185-235 es la fila del PLA en la tabla de materiales de Prusa, el 195-220 «según marca» es el párrafo de prevención del PLA del KB de separación entre capas, y el 220-230 es el *sweet spot* que propuso un foro sin resultado. **No hay rango «de trabajo» ni «de diagnóstico»: eso era editorial nuestro.** Los tres pueden ser ciertos a la vez, y el KB nunca dice que 185 sea demasiado poco |
| separaciones entre capas | tabla de materiales de Prusa | `PLA | No, -, No | 185-235 °C, 50-60 °C`. La columna `No, -, No` dice que el PLA no pide enclosure, drybox ni boquilla endurecida, que es la misma postura que el KB cuando llama a la separación entre capas un problema de los "old days" de camas sin calentar |
| separaciones entre capas | ventilador de refrigeración | **cada protocolo con su orden, y el «primero» sólo es de bobstro** (*"Try reducing cooling first"*, dentro de su lista de «a few possible causes»). **Bambu lo pone en el paso 3, después del método térmico**, y Prusa lo identifica como causa sin prescribir orden |
| separaciones entre capas | flow rate / extrusion multiplier | +5 % da una unión más fuerte entre capas, en PrusaSlicer, y sólo accesible en modo Advanced o Expert |
| separaciones entre capas | altura de capa (`layerHeight`) | **única fuente de foro:** por debajo del 80 % del diámetro de la boquilla la extrusión se aplasta contra la capa de debajo; por encima, deja de aplastarse y no pega. Con boquilla de 0,4 mm, techo de 0,32 mm |
| separaciones entre capas | humedad del filamento | chasquidos y rugosidad son de humedad en `warping-pla`; aquí sólo un foro lo insinúa para grietas, y la página de Bambu no lo menciona. Corroboración parcial y por otro artículo |
| separaciones entre capas | PrusaSlicer #11914 | separaciones en las juntas por cambios de firmware y PrusaSlicer: ni warping ni adhesión. Documentado en un hilo de foro, y **su URL no puede ir en `sources`** porque ningún fichero de `wiki/raw/` la tiene como `url:` de frontmatter |
| separaciones entre capas | elección de material | ABS es el más propenso, y por aire frío antes de enfriar del todo; PETG «no tiene la misma tendencia a crack/de-laminate» que el ABS, y ASA es alternativa con más dependencia de un entorno estable. Todo de Prusa, todo oficial |
| separaciones entre capas | boquilla obstruida | el **paso 1** del protocolo de Bambu es el cold pull. Es el orden de su lista, no una prohibición de la vía térmica: su paso 2 es subir boquilla o bajar velocidad |

**Páginas propias que este tema sugiere:**

- **Capas desplazadas (layer shifting).** El artículo de Prusa es entero, y de él aquí sólo
  se ha cocinado la frontera. Es un fallo distinto con su propio diagnóstico por eje, sus
  cifras de correa y su árbol de comprobación por modelo: merece página.
- **Flow rate y extrusion multiplier.** El KB lo nombra como palanca de adhesión entre
  capas y remite a un artículo de calibración que **no está en `wiki/raw/`**. Si se
  busca, es página.
- **El campo `layerHeight` del panel.** Es opcional, y como es opcional el artículo tiene
  que poder justificar por qué puede faltar. Lo que hay para esa justificación es la regla
  del 80 %, y es de foro: **hace falta una fuente oficial antes de escribir ese campo como
  dato duro.**