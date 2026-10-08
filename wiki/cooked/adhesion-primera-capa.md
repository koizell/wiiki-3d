---
titulo: Adhesión en la primera capa
tema: adhesion-primera-capa
fuentes:
  - wiki/raw/adhesion-primera-capa-bambu-wiki-first-layer-not-sticking.md
  - wiki/raw/adhesion-primera-capa-prusa-kb-first-layer-calibration-i3.md
  - wiki/raw/adhesion-primera-capa-prusa-kb-mesh-bed-leveling.md
  - wiki/raw/adhesion-primera-capa-prusa-kb-skirt-and-brim.md
  - wiki/raw/temperatura-cama-prusa-kb-first-layer-issues.md
  - wiki/raw/adhesion-primera-capa-prusa-kb-under-extrusion.md
  - wiki/raw/adhesion-primera-capa-prusa-kb-steel-sheet-profiles.md
  - wiki/raw/adhesion-primera-capa-prusa-kb-extrusion-multiplier-calibration.md
cocinado: 2026-10-04
---

# Adhesión en la primera capa

> **SEGUNDA VUELTA. Este fichero cocina siete fuentes nuevas y una compartida, y no parte de
> cero en ningún sentido.** Nada de lo que había se ha eliminado. **Lo que sí ha cambiado son
> ocho sitios, y todos están señalados en su propio sitio con la marca CORREGIDO o con la
> redacción nueva:** (1) la frase de las cuatro salidas de Prusa, que ya **no** puede decir
> «esta página no desarrolla ninguno de los cuatro»; (2) la contradicción 3, que pasa de cinco
> a ocho fuentes y de tres a **cuatro** listas de causas, y que es donde se anotan las dos
> contradicciones nuevas —6 y 7—; (3) el recuento de imágenes de `## Tirado`, que estaba mal
> contado —decía catorce, son quince en las cinco primeras— y que se rehace con la cuenta
> entera; (4) la entrada de `print-settings` en `## Sin respaldo`, que era doble y ahora son
> dos, porque `under-extrusion` ya no comparte destino con ella; (5) la entrada del nombre «Live
> Z adjust», que pasa de una aparición en una fuente a tres en dos; (6) la del *knob* del LCD,
> que no cambia de veredicto pero se contrasta con la página nueva; (7) la lista de páginas
> internas no descargadas, de la que sale «Steel sheet profiles»; y (8) las filas de
> `## Relaciones` y la lista de páginas propias. **Los cinco puntos de la prueba de utilidad del
> brief no se han vuelto a responder**, y las contradicciones 1, 2, 4 y 5 quedan intactas.
>
> **Lo que aportan las tres nuevas, y es el motivo de esta vuelta:** `under-extrusion` cierra
> una de las cuatro salidas de Prusa y trae **el mecanismo que faltaba para el diagnóstico
> diferencial** —una adhesión mala que **no** es un fallo de adhesión, porque una primera capa
> apretada de más impide que el filamento salga (`under-extrusion:61`). `steel-sheet-profiles`
> explica las dos frases que `first-layer-calibration-i3:45` y `:81` dejaban sin justificar, y
> añade la segunda limitación silenciosa del lote: **la impresora no sabe qué chapa tiene
> montada** (`steel-sheet-profiles:51`). `extrusion-multiplier-calibration` **no menciona la
> cama ni la primera capa**: su valor es negativo, y es el que permite **descartar extrusión**.
> Las otras cinco causas de `under-extrusion` están cocinadas y **marcadas fuera de alcance**
> en un apartado propio, porque el brief deja los fallos de extrusión en general fuera.
>
> **Lo que NO cambia, y es lo que más pesa:** el producto principal del brief es un
> **diagnóstico diferencial con un orden de comprobación**, y **ninguna de las ocho fuentes
> escribe un orden**. Lo único nuevo que se acerca es la **posición** de un elemento en una
> lista de Prusa, y su alcance exacto está en la contradicción 3. **La 3 sigue siendo el hueco
> central del lote.**
>
> **La quinta fuente, `first-layer-issues_1804`, sigue siendo compartida** y ya está cocinada
> en `wiki/cooked/temperatura-cama.md`. De ella se reutiliza **con su alcance intacto** y **sin
> ampliar**: el alcohol isopropílico al 90 %, el «no los quita bien» del aceite de los dedos,
> el acetona sólo en PEI lisa y alrededor de una vez al mes, el agua con jabón con sus tres
> contraindicaciones, y el incremento de **+5 a +10 °C de cama** sobre el valor del perfil.
> La torre de purga y el Warm Tower **no** salen de esta fuente: vienen de la página de
> materiales de Bambu, que no está en este lote, así que aquí sólo se enlazan a
> `temperatura-cama.md`. Ver `## Afirmaciones`, bloque final, para lo que se enlaza y para lo
> que no.
>
> **El artículo no declara campo del panel.** `bedTemp` es de `temperatura-cama` y aquí sólo
> se enlaza. La razón la da la regla «un campo, un artículo» del brief, y este fichero no
> publica ninguna cifra de cama propia: la única que sale de las ocho fuentes es el
> incremento de `first-layer-issues`, y ése ya está cocinado allí. **Las tres fuentes nuevas no
> traen ninguna cifra de cama**, y las que traen de boquilla —+5 a 10 °C, ±5-15 °C— o de altura
> de capa —0,1-0,2 mm, 0,20 mm, 0,2 mm— son de `[[temperatura-hotend]]` y `[[altura-capa]]` y
> salen sólo como condición de validez de sus propias fórmulas, marcadas como tales.
>
> **Aviso de alcance sobre las tres nuevas, y es lo primero que hay que leer antes de usarlas.**
> Sus cabeceras «Relevant for» son listas de productos antiguos o parciales:
> `under-extrusion` lista MK2.5, MK2.5S, MK3, MK3S, MK3.5 y «+»; `steel-sheet-profiles` lista
> MINI family, MK3 family, MK3.5 family y OLD PRODUCTS; `extrusion-multiplier-calibration` es
> la única que incluye la familia MK4 y la MK3.9. **Lo que la etiqueta no liste no significa
> que la página no aplique** —eso lo dice el recolector en sus notas, no el cuerpo de las
> páginas, y por eso no se publica como hecho—, pero **tampoco se puede extender nada de las
> tres a una máquina cuya aplicabilidad la página no declara.** Ver `## Sin respaldo`.
>
> **Dos referencias de otros ficheros cocidos que han quedado desfasadas por esta vuelta, y que
> se dejan escritas aquí en vez de tocar esos ficheros** (esta vuelta es de un solo tema):
> (1) `separaciones-entre-capas.md` dice en dos sitios que la guía de calibración del extrusion
> multiplier «**no está en `wiki/raw/`**» — §«Revisado y no incorporado» y §«Páginas propias»—
> y **ya está**: es `adhesion-primera-capa-prusa-kb-extrusion-multiplier-calibration.md`. Esa
> página es de otro tema y su cocinado corresponde a otro fichero, así que **la referencia
> está mal pero el contenido no está cocinado donde ese artículo lo necesita**.
> (2) `warping-pla` y `separaciones-entre-capas` tienen, cada una, páginas de Prusa sobre
> infraextrusión que este fichero cocina desde otro ángulo; **ninguna de las dos ha cambiado**.

## Afirmaciones

### Lo que dice Prusa cuando la calibración de primera capa se ve bien y aun así no pega

Esta es la afirmación más útil del lote para el producto del brief, y es una frase.

- **«Si tienes problemas de adhesión pero tu calibración de primera capa se ve como la imagen
  'correcta', tu problema está en otro sitio»**, y Prusa nombra cuatro sitios:
  *"if you are having problems with adhesion, but your first layer calibration looks like the
  'good' picture ( center picture ), **your problem lies somewhere else, like a dirty/greasy
  sheet, print-settings, bed leveling/XYZ calibration, or under-extrusion**."*
  — [Prusa Research](https://help.prusa3d.com/article/first-layer-calibration-i3_112364)
  (`first-layer-calibration-i3:77`)

  **Dos límites que la propia frase pone y que hay que conservar.** El original dice
  *"somewhere else"* y *"like"*: **es una lista de derivación, no un orden, y no es una lista
  cerrada** —los cuatro son ejemplos de dónde mirar, no las cuatro únicas causas. Y esta
  página **no desarrolla ninguno de los cuatro**: salen aquí como nombres y remiten a artículos
  que no estaban en `wiki/raw/`.

  **CORREGIDO EN ESTA VUELTA, y es la razón de las tres fuentes nuevas.** Uno de los cuatro sí
  está desarrollado ahora: **`under-extrusion`**, en el apartado «`under-extrusion`: adhesión
  mala que no es un fallo de adhesión» de este mismo fichero, y su primer factor es
  precisamente la calibración de primera capa. **`print-settings` sigue sin página**: lo único
  que se ha descargado es la sección «Slicer settings» de `under-extrusion`, que **no es la
  misma página** y cuyo alcance se dice en su sitio. Lo que la frase puede hacer el artículo es
  **más**: ya no tiene que nombrar `under-extrusion` sin explicarlo. Lo que sigue sin poder es
  elegir entre los cuatro (ver `## Sin respaldo`).

  **El valor diagnóstico de la frase es la condición que la abre, y es negativa:** una
  calibración visualmente correcta **no descarta** el problema de adhesión, sólo lo desplaza
  a cuatro sitios fuera del ajuste Z. Ese es el puente entre la parte de Prusa sobre boquilla
  y la parte sobre cama y chapa.

### `under-extrusion`: adhesión mala que no es un fallo de adhesión

De la página de Prusa que desarrolla **una de las cuatro salidas** del apartado anterior. Es
la única de las tres nuevas que trata de la primera capa, y lo hace para decir que la primera
capa puede ser la causa de un fallo que **no** es de adhesión. **Ésta es la pieza que faltaba
para el diagnóstico diferencial del brief.**

- **La definición, y es lo que la separa de este artículo:** *"You can recognize under
  extrusion when there is **material missing in your print's layers**. Printed objects with
  under extruded layers can be **fragile and tend to break apart**."*
  — [Prusa Research](https://help.prusa3d.com/article/under-extrusion_2007)
  (`under-extrusion:47`)

  **El síntoma es material que falta dentro de las capas, no una pieza que se levanta.** La
  página **no dice en ningún punto** «la primera capa no se pega», y esa ausencia es parte del
  dato: quien llega con la pieza despegada está ante otra página del Knowledge Base.

- **La lista de seis, con su encabezado literal:** *"**Common factors in under extrusions
  are:** First layer calibration too close / Slicer settings / Nozzle / Extruder gears /
  Insufficient hotend cooling / Filament."* (`:51-57`)

  **El encabezado es «Common factors», y no «first check this».** La posición del primer
  elemento es un hecho de la lista; ver la contradicción 3 para lo que esa posición es y lo
  que no es.

- **El primer factor, y el mecanismo escrito:** *"Make sure you have performed the First Layer
  Calibration correctly. **Avoid compensating for a lack of adhesion by squishing the first
  layer too much.** If the nozzle is too close to the build plate, **the filament can be
  obstructed from pushing through.**"* (`:61`)

  **Adhesión mala que no es un fallo de adhesión, con la cadena entera dentro de la frase.** La
  falta de adhesión se «compensa» acercando la boquilla → la primera capa queda apretada de
  más → **el filamento no puede empujarse** → la impresión sale con material menos. **El
  síntoma de esa compensación no es que la pieza no pegue: es que sale infraextruida.** Quien
  baja la boquilla contra la chapa para forzar la adhesión está **cambiando de fallo**, y la
  página lo dice con un imperativo, no con un consejo.

  **Y el resultado de esa compresión es un beneficio falseado.** La comprobación de que la
  calibración está bien hecha —*"Make sure you have performed the First Layer Calibration
  correctly"*— es la primera frase del apartado, **antes** del aviso. Es decir: el orden
  escrito es comprobar la calibración, y el aviso va contra el intento de arreglarlo
  apretando. Ver la contradicción 6, que es por qué estas dos frases de Prusa no se pueden
  ampliar a «acercar la boquilla mejora la adhesión».

- **La corroboración interna del daño, y es lo que convierte el aviso en una consecuencia con
  nombre:** la guía del i3 ya decía que con la boquilla demasiado cerca se producen
  *"extrusion problems and clogging and poor print quality, or even **damage to the hardware,
  like the Flexible steel sheet** due to the print sticking too much"*, con el aviso de garantía
  en la línea siguiente (*"Having the nozzle too low can cause the nozzle to damage your steel
  sheet. **This is not covered by Warranty.**"*).
  — [Prusa Research, guía del i3](https://help.prusa3d.com/article/first-layer-calibration-i3_112364)
  (`first-layer-calibration-i3:51`, `:69`)
  **Dos páginas de Prusa, el mismo efecto: una lo nombra como primer factor de un fallo y la otra
  como modo de fallo de la calibración.**

- **Cuándo repetir la calibración, y ya no es una sola fuente:** *"We recommend running the
  first layer calibration **every time you move the printer to a different location or do
  maintenance on the hotend, like changing the nozzle**."* (`:61`) **Son exactamente los dos
  desencadenantes que escribe `first-layer-calibration-i3:99`** —*"every time there is a major
  change in the assembly"*, que incluye *"changing the nozzle"*, y *"if you move the printer to
  a different location"*. **Dos páginas, los mismos dos, y ninguna dice «cada impresión».**
  *Before* esta vuelta la afirmación de cuándo repetir la calibración se apoyaba en una sola
  fuente; ahora está corroborada, y **sigue sin ser una obligación periódica**.

- **Y el cambio de chapa, que es la tercera fuente de una regla que ya era de dos:** *"when you
  swap the steel sheet **from the textured one to the smooth one** you must recalibrate **due to
  the sheet's different thickness**. That is why we introduced the Steel sheet profiles."*
  (`:61`) El motivo —el grosor— y la página a la que remite están en el apartado siguiente.

- **El heurístico general de la página, que es blando y va marcado como tal:** *"you should also
  think if you **recently did any changes to your printer** (or perhaps no maintenance for a
  long period), as you might find the culprit there"* (`:47`). Es una heurística de fabricante
  **sin ningún dato detrás** —ni frecuencia, ni antes/después, ni un caso—, y no es una
  afirmación técnica. **Publicable como recomendación del fabricante; no como dato.**

- **Y el segundo factor de la lista, «Slicer settings», que es lo más cercano que existe a lo
  que el apartado anterior llama `print-settings`:** *"Each profile in the PrusaSlicer contains
  settings that determine temperature, speeds, and how much filament the 3D printer should
  extrude. **The printer does not provide any feedback on how much filament actually leaves the
  nozzle.** [...] If that happens, you may notice **gaps in and/or in between printed layers**."*
  (`:65`) Y la instrucción que da: *"Make sure you have set up your printer in PrusaSlicer by
  **running the Configuration Wizard** and as a starting point you should use the **stock
  filament profiles which are tailored for your machine, filament type, and nozzle size**."*
  (`:67`)

  **«La impresora no da ninguna realimentación de cuánto filamento sale» es la segunda
  capacidad negativa del lote, y es de otro dominio.** La primera es que **no sabe qué chapa
  tiene montada** (apartado siguiente). **Las dos son limitaciones de la máquina que se pueden
  citar como tales, y un diagnóstico las necesita**: hay fallos que no se pueden descartar
  mirando la impresora.

  **La segunda frase conecta con la tercera escena de la prueba de utilidad del brief** —«ya
  limpié, nivelé y cambié de material, y sigue igual»—: el texto dice que el perfil debe estar
  hecho para *machine, filament type and nozzle size*. **Alcance exacto y es estrecho:** es una
  causa de infraextrusión dentro de una lista de seis, **no** dice que un perfil mal puesto
  provoque una falta de adhesión a la cama, y **no** es la página `print-settings` que
  `first-layer-calibration-i3:77` nombra. Que las dos usen la palabra «settings» **no prueba que
  sean lo mismo**, y el artículo no puede fundirlas.

### La chapa: por qué hay que recalibrar al cambiarla, y por qué nadie te avisa

De la página de Prusa a la que remiten **dos frases que la guía del i3 dejaba escritas y sin
explicar**. Es lo que `first-layer-calibration-i3:45` y `:81` mencionaban sin desarrollar.

- **Las dos frases que esta página explica, y ninguna daba el motivo:**
  *"As each type of sheet (**smooth, satin, and textured**) has a different thickness you must
  use a different First layer calibration for each of them. **For this, we have a convenient
  feature called Steel sheet profiles**."*
  — [Prusa Research, guía del i3](https://help.prusa3d.com/article/first-layer-calibration-i3_112364)
  (`first-layer-calibration-i3:45`)
  Y la repetición, ya como prohibición: *"**You can not use the same first layer calibration if
  you swap between the Smooth and the textured sheet!** For more information, please see Steel
  sheet profiles."* (`:81`)
  El motivo está en la página nueva: *"they also have **different thickness which affects
  calibration**"*.
  — [Prusa Research](https://help.prusa3d.com/article/steel-sheet-profiles_1955)
  (`steel-sheet-profiles:43`)

  **El motivo del recalibrado es el grosor, y ahora lo dicen tres páginas de Prusa**: la guía
  del i3 («has a different thickness»), `under-extrusion` («due to the sheet's different
  thickness») y esta («different thickness which affects calibration»). Antes de esta vuelta
  lo decían dos y ninguno lo justificaba.
  **Ninguna de las tres da un milímetro de grosor ni un valor de Z:** el motivo está escrito en
  palabras, y en ningún número. Ver `## Sin respaldo` para lo que la página **no** permite
  concluir.
  **Y una diferencia de alcance que importa al citar:** `first-layer-calibration-i3:45` nombra
  **tres** tipos de chapa —lisa, satinada y texturizada— y `:81` habla de **dos** —lisa y
  texturizada—. **Ninguna de las dos páginas dice que sean todas las que existen**, y esta
  página nueva **no nombra ninguna chapa en concreto**: sus nombres por defecto son
  «Smooth1» y «Textur1» (`:79`).

- **El mecanismo, y los dos límites que lleva dentro:** *"We implemented **steel sheet
  profiles** for our printers **that need first-layer calibration**. The function allows you to
  create **up to eight** specialized profiles for your printer setup. **For each sheet, set the
  Live Z adjust value.** Once the values for each sheet are stored on the printer, it is
  possible to quickly **bewteen** sheet profiles."*
  (`steel-sheet-profiles:49-51`; la errata «bewteen» es del original y se cita así)

  **«Hasta ocho» es una capacidad del firmware, no un catálogo de chapas.** La página **no dice
  cuántas chapas hay ni cuántas tienen perfil**, y la segunda frase acota el alcance de la
  función: existe para **las impresoras que tienen esa calibración**, no para todas. Ver
  `## Sin respaldo`.

- **La frase que más importa para el síntoma, y es una capacidad negativa:** *"The printer
  **will not remind you** to change the steel sheet profile, as it **cannot sense which steel
  sheet is installed**."* (`:51`)

  **Cambiar de chapa es un cambio silencioso: nadie avisa y la máquina no puede detectar
  cuál hay montada.** Es la otra mitad del caso «con una chapa va bien y con otra no» — y no es
  que la segunda chapa sea peor: es que **el ajuste que vale para la primera se está usando con
  la segunda**. Junto con el «no da realimentación de cuánto filamento sale» de
  `under-extrusion:65`, son las **dos limitaciones de la impresora** que el lote documenta, y
  las dos son de dominios distintos. **Un artículo de diagnóstico puede decir «esto no se
  puede saber desde la máquina» citando las dos.**

- **Y el aviso que la página hace explícito, que es vigilancia y no detección:** *"**Don't
  forget which profile you have attributed to which plate!** Always carefully watch your first
  layer and in case the nozzle is **too high or too low**, **stop the print** and fix it either
  by setting the correct profile or by modifying the Live adjust Z."* (`:74`)

  **Los dos estados que hay que mirar son los de la guía del i3** —boquilla demasiado alta o
  demasiado baja— y la respuesta escrita es una de dos: cambiar de perfil o modificar el
  ajuste. **Es el mismo criterio visual del patrón de prueba, aplicado ahora a la impresión en
  curso, y confirma que Prusa no ofrece ninguna otra forma de saber si el perfil activo es el
  correcto.** También es la única instrucción del lote que dice **«para la impresión»** como
  momento de mirar, sin esperar a la pieza.

- **«Live Z adjust» aparece ahora en dos fuentes, y esto es lo que cambia para el nombre:** en
  esta página, dos veces con esa grafía —`:51`, `:91`— y una vez como «**Live adjust Z**»
  (`:74`). La página de falda y ala ya lo usaba una vez (`skirt-and-brim:49`).
  **Tres apariciones, dos fuentes, dos grafías dentro de la misma página.** Ver
  `## Sin respaldo`: **ninguna fuente del lote nombra Z-level ni Z-compensation**, así que el
  nombre sigue sin poder equipararse con nada, y la regla 3 del brief sigue vigente.

- **Lo que las dos familias de máquina hacen distinto, y es firmware por modelo:** en
  MK2.5/S y MK3/S/+ las opciones por chapa son *Select*, *First layer calibration*, *Rename*
  (hasta siete caracteres) y *Reset*; en MINI/+ y MK3.5/S son *Select*, *First layer
  calibration*, *Reset* y **Offset** —*"sets the Live Z adjust value for the given profile,
  **without calibration**"* (`:87-91`). Las rutas también difieren: *Settings -> HW setup ->
  Steel Sheets* frente a *LCD Menu -> Settings -> Hardware -> Steel Sheets* (`:57`, `:85`), y
  el *quick-toggle* está en el menú principal en la primera y en *Control -> Sheet profile* en
  la segunda (`:69`, `:99`). **Es una diferencia de menú por modelo, y es la misma forma de
  Hardware que ya divide a `mesh-bed-leveling`.**

  **La palabra «without calibration» es la que no se puede convertir en instrucción**, y por
  eso tiene entrada propia en `## Sin respaldo`. Lo publicable es que **una** de las dos
  familias tiene una forma de fijar el valor sin pasar por la calibración. **Lo que no:** que
  esa forma sustituya a la recalibración. **La página no lo dice**, y la guía del i3 escribe lo
  contrario para el caso de cambiar de chapa, con un **«You can not use the same first layer
  calibration»** que no es una recomendación sino una prohibición (`first-layer-calibration-i3:81`).

### `extrusion-multiplier-calibration`: lo que aporta es **lo que descarta**

De la tercera fuente nueva. **No menciona la cama, ni la primera capa, ni la temperatura de
cama en ningún punto**, y su valor para este artículo es **negativo**: sirve para decir qué
**no** es un problema de adhesión. El brief deja los fallos de extrusión en general fuera de
alcance, y esta página se cocina por un solo motivo, que es ése.

- **El alcance, declarado por la propia página:** *"This is an **advanced calibration**,
  recommended only to **experienced users**."* Y: *"This procedure **is not necessary with a new
  printer coming from the factory**, but rather applies for specific applications and
  filaments."* — [Prusa Research](https://help.prusa3d.com/article/extrusion-multiplier-calibration_2257)
  (`extrusion-multiplier-calibration:47`, `:51`)

- **Los dos problemas que dice arreglar, con su síntoma exacto, y son los que separan extrusión
  de adhesión:** *"**Overextrusion** - Too much material is extruded (flow is too high). It
  causes **scarring of bottom layers** and unnecessary material buildup on top layers."* /
  *"**Minor under extrusion** - Not enough material is extruded (flow is too low). It causes
  **small gaps that appear between layer lines or perimeters**."* (`:59-61`)

  **Los dos síntomas están dentro de la capa, y ninguno es una pieza despegada.** El primero
  menciona «bottom layers», que es donde un redactor tendría la tentación de engancharlo con
  este artículo, **pero lo que describe es material en exceso —cicatrices y acumulaciones—,
  no falta de adhesión**; el caso de infraextrusión es **«small gaps»**, y el de
  `under-extrusion:47` es **material que falta en las capas**. **Los dos son fallos de
  cantidad de material, no de sujeción a la cama.**

  **El método visual remata el alcance: el criterio mira la capa superior del cubo.** *"The
  point is to make sure your top layers are **smooth**, **shiny,** and without **scarring or
  filament buildup** near the perimeters"* (`:106`). **Una superficie superior lisa no dice nada
  sobre cómo se sujeta la pieza a la cama.** Ése es el alcance exacto de la página: mirar la
  superficie del cubo, **no su base**.

- **Los dos ajustes que ajusta, y la advertencia de que no se leen el uno al otro:** *"the
  **Extrusion Multiplier** setting in PrusaSlicer and the **Flow rate** setting in printer
  firmware are two ways to adjust the same thing, **however, adjusting one of those two
  settings will not influence the value of the other**"*, con la fórmula del recuadro:
  *"Total flow rate = **Flow multiplier** in firmware (M221) x **Extrusion multiplier** in
  PrusaSlicer."* (`:49`, `:54`)

  **Son la misma magnitud en dos sitios que no se leen entre sí.** El artículo tiene que decir
  en cuál de los dos está cualquier valor que cite, y **no puede llamar «el ajuste» a una cosa
  que son dos ajustes**.

- **Las dos escalas, y el aviso de que ninguna es un límite:** en PrusaSlicer, *"The default
  setting (for PLA) is 1, this value represents a percentage, **1 = 100%, 0.95 = 95%** etc.
  Usually, the adjusted values can be between **0.9 and 1.1**"*; en el firmware, *Tune -> Flow*,
  *"the usual values can range between **90 and 110**, **although that does not mean you can't go
  above or below that**."* (`:69`, `:73`)

  **Los dos pares son la misma cifra en escala de 1 y en escala de 100, y la página los da
  así.** Los dos llevan «usual», y el segundo lleva además el aviso de que no son un tope.
  **No son rangos de diagnóstico y no se pueden convertir en umbrales.**
  **Y esta página tiene una incoherencia de unidad en su propio apartado de ajuste**, que se
  conserva sin resolver en la contradicción 7.

- **Lo único comprobable de la página, y sus tres condiciones:** la fórmula del método preciso,
  *"**Extrusion multiplier = (Extrusion width (0.45) / Average measured wall thickness)**"*
  (`:96`); las dos condiciones que la limitan —*"**three or more measurements** in the middle of
  each wall"* y promediar (`:95`), y *"cheap digital calipers **may not be accurate enough** to
  make reliable measurements of a single perimeter wall"* (`:102`)—; y el recuadro que acota
  **toda** la guía: *"based on **default** PrusaSlicer 0.4 nozzle profiles, with a layer height
  of **0.1mm - 0.2mm**"*, con *"Nozzle size = **0.4** / Extrusion width = **0.45** / Basic
  materials (PLA, ABS, PETG) Extrusion Multiplier = **1**"*, y el aviso de que con otra boquilla
  u otra altura **hay que ajustar esos valores también** (`:86-91`).

  **El 0,1mm-0,2mm y el 0,20 mm del método visual (`:110`) son alturas de capa**, campo de
  `[[altura-capa]]`. Salen aquí **sólo como condición de validez de la fórmula** —sin ellos, el
  0,45 y el 1 no significan lo mismo—, **y este artículo no declara campo**, igual que antes de
  esta vuelta. La cifra de **anchura de extrusión 0,45** no es una altura de capa ni una
  temperatura: es la que entra en la fórmula, y se cita con ese alcance y con el aviso de que
  **hay que cambiarla si la boquilla o la altura no son las de por defecto.**

### Las otras cinco causas de `under-extrusion`: cocinadas, y **fuera del alcance**

El brief deja los fallos de extrusión en general fuera de alcance. **Se cocinan aquí para que
el registro exista y para que el redactor vea que no se han leído por encima, y se marcan
fuera de alcance para que no se conviertan en contenido de este artículo.** Todas están en
`under-extrusion`, con su línea.

| Causa (encabezado literal) | Qué dice, con su línea | Por qué fuera de aquí |
|---|---|---|
| **Slicer settings** | El perfil fija temperatura, velocidades y cuánto filamento debe extruirse; **la impresora no avisa de cuánto sale realmente** (`:65`); *Configuration Wizard* y perfiles de fábrica (`:67`) | **Se usa arriba y sólo la parte del mecanismo**, porque «no hay realimentación» es una limitación que el diagnóstico necesita. **Qué parámetro del slicer produce infraextrusión es de extrusión, no de adhesión** |
| **Nozzle** | Reinstalación correcta, apretado **en caliente**, holgura con el heater block, *Cold pull* si la instalación es correcta (`:71-81`); boquillas especiales de acero: **+5 a 10 °C** por sus propiedades térmicas, «mainly the inter-layer adhesion», y *stringing* como contrapartida (`:85`); diámetros **0,4 / 0,6 / 0,8 mm** y la **0,1 mm «experimental»** (`:87-90`) | **Es boquilla, es `hotendTemp` y es adhesión *entre capas*.** El +5 a 10 °C es un dato de `[[temperatura-hotend]]` |
| **Extruder gears** | Engranajes Bondtech con suciedad o desalineados, y **la tensión del idler**: *"Having the idler screw too loose or too tight can cause under extrusion"* (`:95-97`) | Hardware del extrusor. **No toca la cama ni la primera capa** |
| **Insufficient hotend cooling** | La *melt-zone*, el ventilador del extrusor bloqueado (`:103`), *Heat creep* dentro de un *enclosure* (`:109`), el error del *Fan check* si está desactivado (`:106`) y que *"The hotend fan will always spin if the nozzle is heated above **50 °C**"* (`:116`) | Refrigeración del hotend. **El 50 °C es de `[[temperatura-hotend]]`, no de este artículo** |
| **Filament** | **±5-15 °C** si la marca y el tipo no están en PrusaSlicer (`:121`), compuestos que piden boquilla **≥ 0,6 mm** y **0,2 mm** de capa (`:123`), tolerancia de diámetro **± 0,05 mm** como estándar del sector (`:129`), humedad y *dry box* (`:131`), y la carga al revés: **PLA cargado a la temperatura de ABS o PETG** (`:135`) | **Temperatura de boquilla, altura de capa y filamento: tres campos de otros artículos** |

**Las cifras van con la unidad tal como viene, porque el original es inconsistente:** «a range
of 5-10 °C», «the original 0.4mm brass nozzle» (**sin espacio**), «+/- 5-15°C» (**sin espacio**),
«+/- 0.05 mm», «above 50 °C». **No se les añade una unidad que la página no trae**, ni se
corrige el espacio en la cita.

### El residuo en la boquilla: tres sitios, dos fuentes, y es lo mejor corroborado del lote

- **Bambu lo pone como condición previa a la nivelación, y lo pone en el paso 3:**
  *"If you encounter issues with the quality of the first layer, we recommend performing a bed
  leveling calibration from the calibration menu **after ensuring the nozzle tip is clean and
  free of any debris**."*
  — [Bambu Lab](https://wiki.bambulab.com/en/knowledge-sharing/first-layer-not-sticking)
  (`first-layer-not-sticking:43`)
- **Prusa lo dice dos veces en la misma página, y las dos son síntomas observables.** La
  primera, con el mecanismo: *"The **StallGuard** for the Z-axis is active during the mesh bed
  leveling. In case the **nozzle crashes into the bed before the PINDA/SuperPINDA sensor
  triggers, the calibration process is interrupted and the user is asked to check the nozzle
  for any kind of debris**."*
  — [Prusa Research](https://help.prusa3d.com/article/mesh-bed-leveling_112163)
  (`mesh-bed-leveling:53`)
  La segunda, con el otro disparador y un contador que no aparece en ningún otro sitio de las
  ocho fuentes: *"This can occur if there is **debris on the nozzle pushing the bed down when
  probing, or if you touch and press the bed while it is probing**. [...] **If the problem
  remains, it will repeat this procedure three times before canceling the print.**"*
  — misma fuente, `mesh-bed-leveling:75`

  **Una vez se cita y las otras dos quedan como corroboración.** Las tres son la misma
  afirmación sobre la misma causa, y la cita más útil para el artículo es la de Bambu, porque
  es la que la convierte en **orden de comprobación** y no en síntoma. Las dos de Prusa se
  conservan aquí porque **aportan dos cosas que Bambu no da**: que la nivelación se interrumpe
  sola y lo avisa (*StallGuard*, *«Enforcing the Z-calibration»*), y que **tocar la cama
  durante el sondeo dispara el mismo aviso que un residuo**. Esta última es la que permite
  decir que el mensaje en pantalla **no distingue entre las dos causas**, porque el texto las
  enumera en la misma frase.

### Bambu: el tipo de chapa elegido, y el 0,04 mm con su alcance exacto

- **El mecanismo, y su dirección:** *"First layer adhesion issues could be related to
  incorrectly selecting the plate type in Bambu Studio."* Y la razón: *"**The same material is
  usually printed at different heatbed temperatures depending on the build plate.** Selecting
  the wrong build plate type may result in insufficient adhesion, because the heatbed
  temperature used for printing is too low."*
  — [Bambu Lab](https://wiki.bambulab.com/en/knowledge-sharing/first-layer-not-sticking)
  (`first-layer-not-sticking:23`, `:25`)

  **Esa primera mitad es la única afirmación sobre cama de todo el fichero de Bambu, y va
  sin ninguna cifra.** No se le puede poner un número encima.

- **El 0,04 mm, con el alcance que tiene y no con otro:** *"since the **Textured PEI Plate** has
  a granular surface, **the printer lowers the nozzle by 0.04 mm after heatbed leveling** to
  ensure first-layer adhesion. If you print on a Textured PEI Plate but select a different
  build plate type when slicing, **the nozzle height will be too high**, which affects
  first-layer adhesion."*
  — [Bambu Lab](https://wiki.bambulab.com/en/knowledge-sharing/first-layer-not-sticking)
  (`first-layer-not-sticking:25`)

  **Cuatro límites, y los cuatro son parte del dato:**
  1. **Es de la Textured PEI Plate y de su superficie granular.** La fuente no dice que haya
     un descenso equivalente para las otras chapas, y no lo publica para ninguna.
  2. **Es un comportamiento de la impresora, no un valor que se introduzca a mano.** El sujeto
     es «the printer», el verbo es «lowers», y el momento está escrito: *after heatbed
     leveling*.
  3. **El fallo que explica va en una sola dirección: boquilla demasiado alta.** La página no
     dice que elegir mal la chapa baje la boquilla, y no dice nada del caso contrario.
  4. **El mecanismo no es la temperatura, es la cota de la boquilla.** La frase sobre el calor
     de cama es la anterior; esta es geométrica. Publicar «la Textured PEI necesita 0,04 mm
     menos» es una recomendación extrapolada, y publicar «elegir mal la chapa baja la cama»
     invierte la relación que la página escribe.

- **La conclusión de Bambu, que son dos condiciones a la vez:** *"Selecting the correct plate
  type according to the filament used, while also ensuring the plate is clean before starting a
  print will give you the best chances of success when printing."*
  — misma fuente, `first-layer-not-sticking:27`

### Bambu: lavar la chapa, con la condición que va dentro de la frase

- **El producto y la prohibición que va implícita:** *"We strongly recommend to **wash the
  plates with hot water and detergent** before printing to remove any debris or contaminants,
  and **avoid touching the surface**."*
  — [Bambu Lab](https://wiki.bambulab.com/en/knowledge-sharing/first-layer-not-sticking)
  (`first-layer-not-sticking:33`)

- **Y la eficacia, que es condicional y no se puede citar a medias:** *"This solution **solves
  most issues related to adhesion, as long as the right settings are used for the materials you
  are trying to print, and the correct plate type has been selected in the slicer.**"*
  — misma fuente, `first-layer-not-sticking:35`)

  **La condición es la mitad del valor de la frase.** Publicar «lavar la chapa resuelve la
  mayoría de los problemas de adhesión» sin el «as long as» convierte una afirmación
  condicionada en una garantía. Y la condición incluye **el tipo de chapa del apartado 1**, así
  que los dos primeros apartados de Bambu están enlazados en el propio original.

- **El pegamento de Bambu, con su alcance que es estrecho:** *"In some cases, applying Bambu
  Lab Glue to the build plate is recommended to improve adhesion and increase print success,
  **such as when printing non-PLA materials on the Smooth PEI build plate**."* Remite a «How
  to Use Bambu Lab Glue», que **no está descargado**.
  — misma fuente, `first-layer-not-sticking:37`)

  **El «such as» es una definición del alcance:** la página da el caso de los materiales que
  no son PLA sobre la chapa lisa, y no dice que el pegamento sea la primera opción para nada,
  ni que se aplique a la Textured PEI.

### Bambu: la nivelación, y su «raro»

- **La afirmación de la causa es deliberadamente estrecha, y el adjetivo es suyo:** *"In **some
  rare cases**, the bed leveling from previous calibrations might be inaccurate leading to
  **inconsistent adhesion** to the plate."*
  — [Bambu Lab](https://wiki.bambulab.com/en/knowledge-sharing/first-layer-not-sticking)
  (`first-layer-not-sticking:41`)

  **Este es el alcance que importa para el diagnóstico diferencial:** Bambu **no** presenta la
  nivelación como causa frecuente, y la falta de adhesión que describe es **inconsistente**, no
  una esquina levantada. Publicar «nivela la cama» como la tercera comprobación con la
  autoridad de Bambu exige decir las dos cosas: *some rare cases* e *inconsistent adhesion*.

- **Y la recomendación de mantener la opción activada, que no es lo mismo que recalibrar:**
  *"We also strongly recommend to keep the **Bed Leveling Calibration option turned on** when
  starting a print, for the highest chances of success."*
  — misma fuente, `first-layer-not-sticking:45`

### Prusa: los tres estados visuales de la línea de prueba, y qué se puede mirar

De la guía del **i3**, y el modelo está en la propia página: el campo «Relevant for» de la
página lista **MMU family, MK3 family, MK3.5 family y OLD PRODUCTS**, y nada más
(`first-layer-calibration-i3:13-20`). **Todo lo que sigue es de esa guía y no se generaliza a
MK4, MK3.9, XL ni CORE One** — ver `## Sin respaldo`.

- **Lo que se calibra y con qué criterio:** *"The First Layer Calibration is used to calibrate
  the distance between the tip of the nozzle and the print surface. The aim is to adjust the
  nozzle height until the extruded plastic sticks nicely to the bed **and you can see that it is
  being slightly squished**."*
  — [Prusa Research](https://help.prusa3d.com/article/first-layer-calibration-i3_112364)
  (`:41`)

- **Los dos modos de fallo, que no son simétricos y tienen consecuencias opuestas.**
  *"With the nozzle **too far** from the print surface, you risk your print not sticking
  properly, which can result in a **blob**. On the other side, if set **too close**, you can
  experience extrusion problems and clogging and poor print quality, or even **damage to the
  hardware, like the Flexible steel sheet due to the print sticking too much**."*
  (`:51`)

  **La asimetría es el dato.** Demasiado lejos: no pega y sale un bulto. **Demasiado cerca: la
  pieza se pega de más y se daña la chapa.** El segundo caso tiene una advertencia de garantía
  en la línea siguiente: *"Having the nozzle too low can cause the nozzle to damage your steel
  sheet. **This is not covered by Warranty.**"* (`:69`) Y el daño por «pegar de más» tiene
  corroboración en otra página de Prusa, con otro modelo: la LoadCell del MK4/MK3.9/XL existe
  *"to avoid damage that would be caused by the nozzle digging into the steel sheet"*
  (`mesh-bed-leveling:91`).

- **Los tres criterios visuales, y son texto, no imagen.** En la chapa lisa:
  - **Demasiado alto:** *"You want the line flattened, but not squished. On the square at the
    end of the test line, **you do not want any gaps between the lines** ( left picture ),
    which means it is too high. In that case, **the value will be too close to zero**."* (`:63`)
  - **Demasiado bajo:** *"you will see **the line squished completely flat** and the **end square
    will have ridges between the lines**, which is a clear sign it is set too low and the value
    will be too far away from zero."* (`:67`)
  - **Correcto:** *"A correct adjustment will show you an **even surface** ( center picture ),
    **with no gaps between lines, nor ridges**."* (`:73`)

  **Estas tres frases son publicables tal cual, sin las fotos.** El original remite a «left
  picture», «center picture» y «right picture», y las tres referencias quedan sin resolver
  porque las imágenes del fichero salen como `[imagen: ]` sin `alt`. **Lo que se publica es la
  descripción textual —huecos, surcos, superficie pareja—, que es completa; lo que no se
  publica es cualquier juicio sobre si la foto de la página se parece a la tuya.**

- **El valor numérico, con las dos advertencias que la propia frase trae:**
  *"As stated, the numeric value depends on the exact position of the P.I.N.D.A./SuperPINDA
  sensor, which will be **unique to each machine and means nothing without a visual
  reference**. However, **a common range is from -0.400 to -1.500**."* (`:73`)

  **El rango es del i3 y de esta guía, y es un valor de LCD, no milímetros.** Tres límites: la
  fuente lo declara único por máquina; lo dice explícitamente inútil sin referencia visual; y
  lo da **después** de «However», es decir, como rango orientativo. **La página pide lo
  contrario a usar el número:** *"The value is unique to each printer and it may also slightly
  change with time and use. **You must, therefore, check visually when adjusting the height, not
  by a set value.**"* (`:47`)

  **Comparado con el 0,04 mm de Bambu, el -0.400 a -1.500 no es la magnitud de la misma cosa.**
  Ver la contradicción 4.

- **La chapa texturizada, y el aviso más importante del apartado:** *"The textured sheets are
  thinner than the sheets with smooth PEI, therefore **you need to move the nozzle bit
  closer**, but you are seeking the same results as with the smooth sheet."* Y el criterio se
  repite con otras palabras: *"if it is set too low ( right picture ) the filament **can start
  curling up around the edges like it is not adhering**."* Si está demasiado alto, *"you will
  see **the line being round**, and have gaps between the lines of the end-square."* (`:85-87`)

  **AVISO DE ALCANCE, y es el más fácil de convertir en un diagnóstico falso.** Ese
  «curling up around the edges like it is not adhering» es **del cuadrado del final del patrón
  de prueba**, no de una pieza impresa: el texto dice «the filament can start curling up around
  the edges» dentro de un párrafo sobre la chapa texturizada y el cuadrado final, y el
  capítulo entero describe la calibración. **Es el síntoma de la boquilla demasiado baja, y el
  inverso del de la primera capa levantada**, aunque se parezcan. La dirección importa: el
  lift de una esquina es lo que Prusa asocia a la boquilla **demasiado lejos** (`:51`), y esto
  es lo que asocia a **demasiado cerca** (`:85-87`).

  **Y esto corrobora la dirección del 0,04 mm de Bambu por un camino independiente:** los dos
  fabricantes dicen que la chapa texturizada acerca la boquilla. La coincidencia es de
  **sentido** y ninguno de los dos da una cifra para la casa contraria.

- **Prohibido calibrar midiendo:** *"Having a look at the nozzle and its distance to the sheet
  can also be helpful. However, **measuring the printed layer with calipers is not a
  recommended method to calibrate the first layer.**"* La capa del patrón es *"about 0.2 mm /
  0.00787402 inch"*. (`:93`)

  **La conversión a pulgadas no se cita.** No hay pulgada en ninguna de las otras siete
  fuentes y no sirve para el diagnóstico; el 0,2 mm es «about» y es de la línea de prueba, no
  un consejo de altura de capa (que es campo de `altura-capa`).

- **Cuándo hay que repetirla, que no es «cada impresión»:** *"Generally, the first layer
  calibration should be performed **every time there is a major change in the assembly**. This
  includes changing the nozzle, extruder upgrades, or other updates to any axis. You should
  also run all calibrations if you move the printer to a different location."* (`:99`)

  **Y la razón por la que quizá no haya que hacerla nunca, que es un buen filtro de entrada:**
  *"The printers assembled in the Prusa factory are already fine-tuned and this calibration is
  needed only in case you build the kit version at home or change the nozzle."* (`:43`)

- **La consulta de la propia página, por si el valor no cuadra:** *"If the nozzle comes in
  contact with the bed, the SuperPINDA/P.I.N.D.A. leveling sensor is **not being triggered** by
  the flexible steel sheet and must be **physically moved lower in its holder**. [...] **If you
  move the leveling sensor you must redo the First layer calibration.**"* (`:107`)
  Y el criterio de suelo del ancho de línea, que apunta a otro artículo: *"If the **width of
  the line varies across its length**, you may have to do some **Bed Level Correction**."* (`:105`)

### Mesh bed leveling: el único recurso numérico del lote para la adhesión irregular

De la página de Prusa, y **el alcance de cada cifra es el bloque de máquina donde está
escrito**, que es como la página los separa.

- **El recurso, con su síntoma exacto:** *"The default grid density is 3x3 (9 points). However,
  **if you still experience uneven first layer adhesion, you can increase the density in
  Settings - Mesh bed leveling - Mesh to 7x7 (49 points)**."*
  — [Prusa Research](https://help.prusa3d.com/article/mesh-bed-leveling_112163)
  (`mesh-bed-leveling:67`)

  **El condicionante es «uneven first layer adhesion», y es parte del dato.** La fuente
  propone subir la densidad de la malla cuando la adhesión es **irregular**. No dice que sirva
  cuando la pieza se levanta por una esquina, ni cuando la base está levantada en un punto
  concreto, y no dice que sirva cuando la primera capa no pega en absoluto. **Un artículo que
  lo liste como comprobación para «la pieza no se pega» está ampliando el alcance que la frase
  tiene escrito.**

- **Los otros dos ajustes, con su cifra y su justificación.** *Z-probe nr. (1 - 3 - 5)*:
  *"We suggest either 3 or 5 measurements per point since the final value is calculated as an
  average value."* *Magnet comp. (ON / OFF)*, sólo con malla 7x7: *"**3 of the 49 points are so
  close to magnets, that the reading can be off by as much as 80μm (microns).** Magnet
  compensation ignores readings from these 3 points and calculates them from the surrounding
  points. **We suggest leaving this function on.**"* (`:69`, `:71`)

- **Dónde se cambian, con su condición de firmware:** *"This feature is available starting from
  **firmware 3.7.0**"*, y *"The Mesh bed leveling settings can be found within **Settings -
  Mesh bed Leveling**, on the LCD menu."* (`:57-59`)

- **A qué bloque de máquinas pertenece todo lo anterior.** El apartado de ajustes y el de
  «Enforcing the Z-calibration» están **bajo el encabezado `## Original Prusa MK2/S, MK2.5/S,
  MK3/S/+`**, y ese mismo párrafo precisa el sensor: *"These printer models **up to MK3S** are
  equipped with a PINDA sensor, while the **MK3S+ and MK3.5/S** are equipped with a
  SuperPINDA sensor."* (`:49-51`) **El 3x3/7x7, el Z-probe y la compensación de imanes son de
  esa familia.** Las otras dos máquinas de la página tienen secciones propias y **no dan ruta de
  menú ni ajustes**: el MINI lleva M.I.N.D.A. o SuperPINDA y *"The grid density is 4x4"* (`:83`),
  y el MK4/S, MK3.9/S y XL llevan LoadCell (`:91`).

- **Y una diferencia de procedimiento entre dos bloques que sí está escrita y que es
  citable.** El bloque PINDA mide *"spread across the build-plate"* y construye *"a virtual
  mesh of the bed"*, y el texto dice además que *"if the bed is slightly warped, the sensor
  will still precisely follow the surface according to its measured mesh"*. El bloque LoadCell,
  en cambio, dice: *"Before a print, the nozzle will check the distance to the print sheet in
  several places to create a virtual height map of the surface. **The points are measured
  within the area of the chosen print.**"* (`:45`, `:93`)

  **Lo que se puede escribir:** en el bloque PINDA la malla se extiende por toda la cama y en
  el bloque LoadCell se mide **dentro del área de la impresión elegida**. Eso es una diferencia
  de alcance real, escrita, y explica por qué el 3x3/7x7 no se puede trasladar tal cual a un
  MK4 o a una XL. **Lo que no:** que una malla más densa «soluciona» más casos, que es una
  inferencia que la página no saca.

### Falda y ala: lo que Prusa dice que hacen por la primera capa

De la página de PrusaSlicer. **El nombre que usa la página es «Live Z adjust» y sólo ése** —
una vez, en la frase que va completa en `:49`. **La página no menciona Z-level ni
Z-compensation en ningún punto**, y por eso ninguna equivalencia es publicable (ver
`## Sin respaldo`).

- **Lo que la falda es, y para qué sirve en este artículo:** *"The skirt is a printed outline of
  all of the models on the print bed. It's printed **before any of the models** and its purpose
  is mainly to stabilize the flow of the filament through the nozzle."* Y el uso que le da
  Prusa para este problema: *"**The skirt is also useful to verify the adhesion of the first
  layer to the print bed. Since it's printed before the models, you can quickly change the Live
  Z adjust if you see the first layer not sticking properly or being too squished by the
  nozzle.**"*
  — [Prusa Research](https://help.prusa3d.com/article/skirt-and-brim_133969)
  (`skirt-and-brim:47`, `:49`)

  **Eso es lo que convierte la falda en un test y no en un adorno:** se imprime antes que
  ningún modelo, así que el ajuste se puede cambiar **mientras se ve la línea**, sin esperar a
  que empiece la pieza. Y el texto da los dos estados que hay que mirar: *«not sticking
  properly»* **o** *«being too squished by the nozzle»*, que son los dos lados de la página de
  calibración.

  **Y el término va sin traducir ni normalizar.** El artículo escribe «Live Z adjust» porque es
  lo que escribe la fuente; si el redactor usa «Z en vivo» tiene que decirlo como traducción
  del nombre de Prusa, y **no** puede presentarlo como el Z-level del MK4 ni como el
  Z-compensation de otro sitio, porque esta página no menciona ninguno de los dos.

- **El ala, y la prioridad que sí está escrita:** *"**Before you consider applying extra
  adhesion materials onto the bed, consider using the B rim option in PrusaSlicer which
  increases the surface area of the first layer.** You can set the brim size manually in
  PrusaSlicer by going into Print settings - Skirt and brim - Brim."* (`:81`)

  **Es la única prioridad explícita de todo el lote**, y dice dos cosas: que el ala aumenta la
  superficie de la primera capa, y que **va antes que un material adhesivo**. Publicable tal
  cual. Lo que no es publicable: que el ala deba ir antes que limpiar o que antes que
  nivelar — la página sólo dice «antes que los materiales adhesivos» y nada más.

- **Los dos casos para los que Prusa recomienda el ala, y sólo esos dos:** *"You should
  consider using the brim option when printing: **Tall objects with a small base** /
  **Multiple small objects at once**."* (`:83-87`)

  **Alcance:** es una recomendación de **cuándo activar el ala**, no un criterio de diagnóstico
  y no una explicación de por qué. Y **«objetos altos con base pequeña» no es «la pieza se
  levanta por una esquina»**: son cosas distintas, y la página no dice que una cause la otra.

- **La única medida del apartado:** *"Generally, it is advised to use **at least a 3 mm brim** to
  increase the adhesion."* (`:95`)

  **El adverbio es «generally» y el verbo es «advised».** Es un mínimo recomendado para
  favorecer la adhesión, no un umbral a partir del cual la pieza deja de levantarse, y no
  lleva material ni modelo.

- **La altura de falda, y por qué no es un dato de adhesión:** *"One-layer tall skirts **can be
  difficult to remove from the print bed**. Prusa profiles typically use a three-layers tall
  skirt **for this reason**."* (`:67`)

  **El motivo escrito es la extracción, no la adhesión.** Se cita sólo para que el «tres capas»
  no se lea como un ajuste de adhesión: es un compromiso de facilidad de retirada.

### `first-layer-issues`: lo que aporta y no es limpieza ya cocinada

De la fuente compartida con `temperatura-cama`. **Lo de limpieza y de temperatura ya está
cocinado allí y no se repite** — el último bloque de este apartado dice qué se enlaza.

- **No hay que limpiar antes de cada impresión si no se toca la superficie, y las
  herramientas se limpian como la cama:** *"**If you don't touch the print surface with your
  hands or dirty tools, then you don't have to clean it before every print.** Clean your tools
  the same way you would the bed, and you will be able to start your print right away."*
  — [Prusa Research](https://help.prusa3d.com/article/first-layer-issues_1804)
  (`:19`)

  **La segunda mitad es la que no está cocinada.** En `temperatura-cama.md` esta frase se cita
  como corroboración del aceite de los dedos; el «no tienes que limpiar antes de cada
  impresión» y el «las herramientas se limpian igual» no aparecen allí, y son la parte
  accionable. Y **contrasta directamente con la recomendación de Bambu de lavar antes de
  imprimir**, que es incondicional: es la contradicción 1.

- **Bajar la velocidad es el último recurso de la página, con su cifra y su alcance:** *"**If
  the steps described above didn't help**, then try decreasing the printing speed. The easiest
  way how to do it is by rotating the knob during the printing process, lowering the percentage.
  Counterclockwise = decrease speed, Clockwise = increase speed. **We suggest decreasing the
  speed to about 75% for the first three layers, and then returning it to normal.**"* (`:62`)

  **Tres alcances y una condición.** La condición es «si los pasos anteriores no ayudaron», y
  es lo que sitúa esta acción **al final** de la lista de la página, no la primera. La cifra es
  «about 75 %» para «the first three layers», y **la frase no nombra material, ni modelo de
  impresora, ni chapa**: es lo más general que hay en el lote, y por eso no se puede atribuir al
  PLA ni a un i3 en concreto. Y es una **recomendación**: la página no trae ningún caso con
  antes y después que la respalde.

- **La adhesión también falla al revés, y el remedio es un separador:** *"**PETG, ABS, ASA, XT,
  and CPH filaments are an exception - the adhesion may be too strong, and you can damage your
  Smooth PEI sheet.** We recommend using a separating agent (e.g. a glue stick)."* (`:25`)

  **Este es el otro modo de fallo del diagnóstico diferencial, y es oficial.** La página de
  Prusa no dice que la adhesión sólo pueda faltar: dice que con cinco materiales **puede ser
  demasiado fuerte**, y da el separador. Está cocinado en `temperatura-cama.md` con su
  advertencia de alcance —que la página **no** lo presenta como efecto de una cama demasiado
  caliente, y que en ese párrafo no hay ninguna cifra—, así que **no se repite**, pero **el
  artículo lo necesita para el diagnóstico**: el síntoma «no se pega» y el síntoma «no se
  puede quitar» son ramas distintas de la misma hoja de Prusa.

  **Y una prohibición que sale de la frase del acetona y no está en ninguna otra fuente del
  lote:** *"**Also, do not use acetone before printing with PETG.**"* (`:35`)

- **El pegamento de Prusa, que es una lista de materiales y no una recomendación general.**
  *"Glue is a great, easy-to-use tool to increase adhesion. It also creates a protective
  separation layer. No need for glue specially made for 3D printing. You can use a basic
  (**PVA-based**) glue stick. **From our experience, it is not needed when printing PLA**, but
  it may be advisable when printing: Polyamide (Nylon), PETG, Polycarbonate (PC), PET-based
  materials, ABS, ASA, Other more exotic materials, Flexible materials."* (`:41-49`)

  **El alcance tiene dos pesos distintos.** «It is not needed when printing PLA» es experiencia
  declarada del fabricante y excluye el PLA. La lista que sigue son materiales para los que
  «**may be advisable**», con un modal que hay que conservar. Y las dos frases de prohibición
  alrededor también están escritas: *"Other types of glue should not be used as a substitute.
  **Don't put Superglue on your sheet!**"* (`:54`)

  **Corroboración de dirección con Bambu, y no de alcance.** Bambu recomienda su pegamento
  «such as when printing **non-PLA** materials on the Smooth PEI build plate»
  (`first-layer-not-sticking:37`); Prusa dice que no hace falta con PLA y que puede ser
  advisable con Nylon, PETG, PC, PET, ABS, ASA, exóticos y flexibles. **Las dos páginas
  coinciden en que el pegamento no es la herramienta del PLA, y no coinciden en el resto:** la
  de Bambu añade la chapa lisa y no da lista de materiales; la de Prusa da materiales y no
  nombra chapa para el pegamento. Coincidencia de dirección, no de criterio, y no se puede
  escribir como una regla común de las dos casas.

### Lo que se reutiliza de `temperatura-cama.md`, con su alcance intacto

**No se repite aquí.** Se enlaza, y se deja escrito qué es de cada fuente para que el redactor
no atribuya a este artículo material de otro.

| Dato | Dónde está cocinado y con qué alcance | Nota para este artículo |
|---|---|---|
| **Alcohol isopropílico al 90 %**, y que los productos dermales o cosméticos llevan hidratantes y aceites que no valen | `temperatura-cama.md`, `## Afirmaciones` → «Limpieza, porque es la otra mitad», de `first-layer-issues:23` y `:27` | Es la limpieza de Prusa. **La página de Bambu no menciona ningún disolvente**: su único producto es agua caliente y detergente |
| **El aceite de los dedos: «no los quita bien»** | `temperatura-cama.md`, y la frase es **del foro** (`warping-pla-prusa-forum-adjusting-settings-warping-pla.md`), **que no está en este lote** | **El redactor no puede citar esta mitad desde estas ocho fuentes.** Lo que sí sale de ellas es la otra forma, la de la Knowledge Base: el agua con jabón disuelve «some oils and sugars that gather over time and that IPA does not remove» (`first-layer-issues:31`), que **no identifica esos «oils» con las huellas** |
| **Acetona sólo en PEI lisa y alrededor de una vez al mes**, y el uso prolongado hace la superficie frágil | `temperatura-cama.md`, de `first-layer-issues:35` y `:37` | Localización aquí: `first-layer-issues:35`. La prohibición para texturizada y satinada («do not use acetone at all») y el aviso de los disolventes que pueden contener acetona están cocinados allí con su modal |
| **Agua con jabón: «warm water (not hot!)», no a menudo, no sumergir la chapa** | `temperatura-cama.md`, «Las tres contraindicaciones del lavado con jabón» | Localización aquí: `first-layer-issues:31`. **Es una de las dos mitades de la contradicción 2** |
| **Adhesión excesiva con PETG, ABS, ASA, XT y CPH sobre PEI lisa, y el separador** | `temperatura-cama.md`, con su advertencia de que la página no lo presenta como efecto térmico | Localización aquí: `first-layer-issues:25`. Ver la entrada de arriba: en este artículo entra como rama del diagnóstico |
| **El incremento de +5 a +10 °C de cama** | `temperatura-cama.md`, «Cómo se sube, y cuánto», de `first-layer-issues:66` | Localización aquí: `first-layer-issues:66`. **Es un incremento sobre el valor del perfil**, está en la sección «Speed and temperature», bajo el epígrafe «Use recommended printing temperatures», y va condicionado a materiales nuevos que no adhieren bien |
| **La torre de purga se libera flexionando la chapa**, sin unirla a la pieza ni cortarla | `temperatura-cama.md`, de la página de materiales de Bambu | **Esa página NO está en este lote.** Aquí sólo se enlaza |
| **El Warm Tower no va a material poroso** | `temperatura-cama.md`, de la misma página de materiales | **No está en este lote.** Aquí sólo se enlaza |
| **PrusaSlicer configura las temperaturas a partir del material seleccionado** | `temperatura-cama.md`, de `first-layer-issues:66` | Localización aquí: `first-layer-issues:66`. Es lo que hace que «cambiar el material y no cambiar nada» sea un caso distinto, y por eso toca a la escena 3 de la prueba de utilidad |

## Contradicciones

**No se resuelven aquí.** Se anotan con su matiz, y el redactor explica el matiz en vez de
elegir. **La 3 sigue siendo la más importante del fichero**: es la que dice que el producto
principal del brief no tiene el orden que necesita. **La 6 es la más útil de esta vuelta**,
porque es la que impide convertir dos frases de Prusa en un consejo sobre la boquilla; y **la 7
no es un desacuerdo entre fuentes sino una incoherencia interna de una sola**, que se conserva
tal cual.

### 1. ¿Hay que lavar la chapa antes de cada impresión?

- **Bambu, y es una recomendación fuerte e incondicional:** *"We **strongly recommend** to
  **wash the plates with hot water and detergent before printing** to remove any debris or
  contaminants, and avoid touching the surface."* Y su eficacia, condicionada: *"This solution
  **solves most issues** related to adhesion, as long as the right settings are used for the
  materials you are trying to print, and the correct plate type has been selected in the
  slicer."* — [Bambu Lab](https://wiki.bambulab.com/en/knowledge-sharing/first-layer-not-sticking)
  (`:33`, `:35`)
- **Prusa, y es una exención con condición:** *"**If you don't touch the print surface with your
  hands or dirty tools, then you don't have to clean it before every print.** Clean your tools
  the same way you would the bed, and you will be able to start your print right away."*
  — [Prusa Research](https://help.prusa3d.com/article/first-layer-issues_1804) (`:19`)

**El matiz, en cuatro partes.**

1. **Las dos son oficiales y las dos dicen «antes de imprimir».** No se contradicen en el
   verbo; se contradicen en si hay que hacerlo **siempre**.
2. **No responden del todo a la misma pregunta.** Bambu da una **rutina recomendada**; Prusa
   responde a si hace falta limpiar **y contesta que no, con una condición de comportamiento**:
   si no tocas la superficie con las manos ni con herramientas sucias, no hace falta. **La
   condición es sobre tu costumbre, no sobre el estado de la chapa**, y eso es lo que la hace
   ser una exención y no un permiso.
3. **La página de Prusa que dice «no tienes que» es la misma que insiste en el mantenimiento.**
   Su párrafo abre con *"The print surface should be regularly maintained to achieve optimal
   printing quality and minimize the chance of failed prints"* (`:15`). **Mantener
   regularmente** y «antes de cada impresión» son cosas distintas y ninguna fuente las
   equipara.
4. **Lo que el redactor puede escribir:** las dos frases, con su atribución, y el matiz de que
   una es rutina y la otra es exención condicionada. **Lo que no:** «Prusa dice que no hay que
   limpiar» —eso borra la condición— ni «Bambu dice que hay que limpiar siempre», que
   convierte un «strongly recommend» en un imperativo y añade la condición del «as long as» que
   la página no suelta.

### 2. El agua de la limpieza: caliente, o «not hot»

**Esta es una extensión de la contradicción 6 de `temperatura-cama.md`, y lo que aporta es un
tercer enunciado y una diferencia de verbo.**

- **Prusa, con el paréntesis que no se puede perder:** *"you can clean the steel sheet with a
  few drops of dish soap and **warm water (not hot!)**. This should not be done often, and **do
  not submerge the sheet completely in hot water**."*
  — [Prusa Research](https://help.prusa3d.com/article/first-layer-issues_1804) (`:31`)
- **Bambu, en la página de materiales, con «la superficie»:** *"Regularly clean the **plate
  surface** with dish soap and **hot water** to remove dust, grease, and other residues that
  affect adhesion."* — esa página no está en este lote; está cocinada en `temperatura-cama.md`.
- **Bambu, y aquí con otro verbo:** *"We strongly recommend to **wash the plates** with hot water
  and detergent before printing"*.
  — [Bambu Lab](https://wiki.bambulab.com/en/knowledge-sharing/first-layer-not-sticking) (`:33`)

**El matiz, y es lo único que hay que escribir.**

1. **El lado de Bambu ahora tiene dos páginas que coinciden en la temperatura y no en el
   verbo.** Una dice «clean the **plate surface**» y la otra «**wash the plates**». En el
   material cocinado de `temperatura-cama.md` el verbo «limpiar la superficie» era lo que
   sostenía que seguir a Bambu **no** lleva a sumergir la chapa. **Este «wash the plates» está
   más cerca de la inmersión, y esa diferencia es real y hay que publicarla** — pero **ninguna
   de las dos páginas de Bambu dice si hay que sumergir la chapa**, y Prusa lo prohíbe por
   escrito.
2. **La prohibición de Prusa es una acción, y las dos frases de Bambu son otra cosa.** Prusa
   prohíbe **sumerger la chapa en agua caliente**. Bambu manda **lavar o limpiar** en sus dos
   formulaciones, y **ninguna fuente de este lote dice que una cosa sea la otra**. Es
   exactamente el límite que ya está cocinado en `temperatura-cama.md` y que aquí se repite
   con un verbo distinto del de su otra página.
3. **Y lo que sale de las dos mitades, que es lo publicable:** «agua tibia y jabón» es la
   lectura que no se equivoca ninguna de las dos, porque Prusa la dice y Bambu no la prohíbe.
   **Eso es un criterio editorial propio del artículo, no una cita de nadie**, y si se usa tiene
   que decirlo así.

### 3. No hay ningún orden de comprobación escrito en ninguna de las ocho fuentes, y la lista más cercana tampoco lo dice

Esta sigue siendo la contradicción más importante del fichero, y **no es un desacuerdo entre
fuentes: es la ausencia de un orden en las ocho**. Hay **cuatro** listas de causas y las cuatro
son sin prioridad. **La segunda de esta vuelta acerca una fuente a un orden parcial, y esa
es exactamente la tentación que este apartado tiene que cerrar.**

- **Bambu, tres apartados numerados bajo «Potential causes and solutions»:** 1. *Incorrect plate
  type selected* · 2. *Plate has not been washed before starting a print* · 3. *Bed leveling
  calibration has not been performed*. **En el cuerpo extraído no hay ninguna palabra de
  prioridad** —ni *first*, ni *start with*, ni *most common*, ni una recomendación de por dónde
  empezar. Los títulos están numerados y eso es todo. **Y el tercero lleva su propio adjetivo
  de frecuencia: «In some rare cases»** (`:41`).
  — [Bambu Lab](https://wiki.bambulab.com/en/knowledge-sharing/first-layer-not-sticking) (`:21`,
  `:31`, `:39`)
- **Prusa, una lista de derivación, sin numerar y sin priorizar:** *"your problem lies somewhere
  else, like **a dirty/greasy sheet, print-settings, bed leveling/XYZ calibration, or
  under-extrusion**"*. El original dice «somewhere else» y «like»: **es una lista de ejemplos de
  dónde mirar, no una lista cerrada y no una cola de trabajo.**
  — [Prusa Research](https://help.prusa3d.com/article/first-layer-calibration-i3_112364) (`:77`)
- **Prusa, un condicional con su síntoma:** la malla 7x7 es *"**if you still experience uneven
  first layer adhesion***" (`:67`). No es un orden; es una causa con una condición.
  — [Prusa Research](https://help.prusa3d.com/article/mesh-bed-leveling_112163)
- **Prusa, y ésta es la lista que se acerca a un orden: seis factores en los que el de primera
  capa va el primero.** *"**Common factors in under extrusions are:** First layer calibration too
  close / Slicer settings / Nozzle / Extruder gears / Insufficient hotend cooling / Filament."*
  — [Prusa Research](https://help.prusa3d.com/article/under-extrusion_2007) (`:51-57`)

  **Alcance exacto, y es estrecho —esto es lo que el redactor tiene que escribir:** es **la
  posición del primer elemento de una lista**, tal como la página la escribe. **No es un orden
  de comprobación**, por cuatro razones que están en la propia fuente: (1) el encabezado es
  «**Common factors**», que dice *qué factores son comunes*, no *en qué orden mirar* —no hay
  «first», ni «start with», ni «check this» en ninguna de las seis líneas—; (2) la pregunta que
  responde la página es **qué causa infraextrusión**, no qué causa que la primera capa no pegue;
  (3) la página **no dice en ningún punto** que el primer elemento deba comprobarse antes que
  los otros cinco; (4) los otros cinco factores **no son de adhesión** —son fallos de
  extrusión—, así que la lista **no es una lista de comprobaciones de este artículo**.

  **Lo que sí se puede escribir:** «en la lista de factores comunes que Prusa da sobre
  infraextrusión, la calibración de primera capa demasiado ajustada aparece el primero».
  **Lo que no:** un orden de trabajo para el diagnóstico de adhesión, y menos aún «lo primero
  que hay que comprobar».
- **Y el único orden escrito en todo el lote es de otra clase:** *"**Before you consider applying
  extra adhesion materials onto the bed, consider using the B rim option** in PrusaSlicer"*
  (`:81`). Es una prioridad entre dos cosas concretas —el ala y el pegamento—, y **no es una
  prioridad entre las causas de que la primera capa no pegue**.
  — [Prusa Research](https://help.prusa3d.com/article/skirt-and-brim_133969)
- **Y hay un cuarto orden parcial, también escrito, y tampoco es un orden general:**
  `first-layer-issues` pone bajar la velocidad **al final** y con condición —*"**If the steps
  described above didn't help**, then try decreasing the printing speed"* (`:62`)*, es decir, la
  página sí tiene una secuencia, y en ella la velocidad va después de la limpieza.
  — [Prusa Research](https://help.prusa3d.com/article/first-layer-issues_1804)
- **Y hay un quinto, nuevo de esta vuelta, y es el más parecido a un orden y el más
  engañoso:** `under-extrusion` **sí** tiene un orden escrito dentro de su primer apartado, y es
  *"**Make sure you have performed the First Layer Calibration correctly. Avoid compensating for
  a lack of adhesion by squishing the first layer too much.**"* (`:61`). Leerlo como protocolo es
  un error por dos razones que están en el texto: **el imperativo es un «no hagas esto»** —no
  dice que hacer lo contrario arregle nada—, y **viene después** de «comprueba que la
  calibración está bien hecha», no antes. **Un «no hagas» seguido de un «comprueba» no es una
  cola de trabajo.**

**El matiz, y lo que el redactor tiene que escribir con él.**

1. **Nadie de las ocho fuentes dice qué mirar primero.** No se puede escribir «lo primero es
   X» citando a nadie. Lo que se puede escribir es **la lista de cada fuente con su atribución
   y su falta de prioridad**. **Y el matiz nuevo es que eso ya no es del todo cierto**: hay una
   lista en la que un factor de primera capa ocupa el primer puesto. **Se publica esa posición
   como posición, con su encabezado «Common factors» al lado y con la advertencia de que la
   lista responde a otra pregunta** —infraextrusión, no adhesión— **y de que cinco de sus seis
   elementos no pertenecen a este artículo.**
2. **Los documentos que tienen una secuencia interna tampoco la extrapolan.**
   `first-layer-issues` pone la limpieza antes que la velocidad, y ese es un orden de esa
   página —**no de este artículo**: `skirt-and-brim` habla de PrusaSlicer, `mesh-bed-leveling`
   de la malla y `under-extrusion` de la extrusión, y ninguno se coordina con los otros.
3. **La única prioridad escrita (ala antes que pegamento) es de un solo párrafo y sólo cubre dos
   acciones.** Publicarla es obligatorio; usarla como esqueleto del artículo es una decisión
   del redactor que tiene que declararse como tal.
4. **Y hay un dato de frecuencia, y es de Bambu y es raro:** la nivelación la sitúa en «some
   rare cases». Un artículo que la ponga en la lista de comprobación tiene que conservar el
   «rare», porque **la página que dice que es raro es la única de las ocho que menciona la
   nivelación como causa.**
5. **Lo que sí se puede ordenar, y con respaldo, es la diferencia entre «lista» y «síntoma».**
   Las tres listas de Bambu y la de Prusa son de **factores**; los criterios de la guía del i3 y
   los tres ajustes de la malla son de **estados observables** (huecos entre líneas, surcos en
   el cuadrado, línea redonda, anchura que varía a lo largo, mensaje *Enforcing the
   Z-calibration*). **Eso no es un orden de trabajo: es la distinción entre lo que se comprueba
   y lo que se mira**, y es lo que las fuentes sí separan.

### 4. El 0,04 mm y el -0.400 a -1.500: dos números que no contestan a la misma pregunta

No es un desacuerdo de cifras. Es la razón por la que **no se pueden comparar**, y por eso va
aquí: porque un artículo con las dos en la misma tabla parece estar dando dos valores para lo
mismo.

- **Bambu, 0,04 mm:** *"since the Textured PEI Plate has a granular surface, **the printer lowers
  the nozzle by 0,04 mm** after heatbed leveling to ensure first-layer adhesion."*
  — [Bambu Lab](https://wiki.bambulab.com/en/knowledge-sharing/first-layer-not-sticking) (`:25`)
- **Prusa, -0.400 a -1.500:** *"a **common range is from -0.400 to -1.500**"*, en una página
  que dice antes que ese valor *"depends on the exact position of the P.I.N.D.A./SuperPINDA
  sensor, which will be unique to each machine and **means nothing without a visual
  reference**"* y después *"You must, therefore, check visually when adjusting the height, not by
  a set value."*
  — [Prusa Research](https://help.prusa3d.com/article/first-layer-calibration-i3_112364) (`:73`,
  `:47`)

**El matiz, que es una diferencia de unidades y no de opinión.**

1. **Una es milímetros de recorrido de boquilla y la otra es un valor de pantalla.** El 0,04 mm
   es lo que **hace la impresora** en un paso concreto («the printer lowers the nozzle») sobre
   una chapa concreta. El -0.400 a -1.500 es el **número que aparece en el LCD** mientras se gira
   una perilla, y la fuente dice que ese número depende de dónde esté el sensor y que **no
   significa nada** fuera de la máquina donde se ha medido.
2. **Los dos son, además, de la familia que cada fuente dice.** El 0,04 mm es de la Textured
   PEI Plate de una impresora con esas chapas; el rango es de la guía del i3, cuya página sólo
   lista MMU, MK3, MK3.5 y OLD PRODUCTS.
3. **Y la dirección sí coincide, y eso es lo único comparable.** Bambu dice que la chapa
   texturizada acerca la boquilla; Prusa dice de la texturizada que *"you need to move the
   nozzle bit closer"*. **Coinciden en sentido y ninguna de las dos da una cifra para la casa
   contraria.** Es lo único que este artículo puede decir de las dos a la vez.
4. **Lo que no se puede escribir:** una tabla con las dos columnas como dos «valores de primera
   capa», ni «Prusa usa otras unidades» (la página no da unidades para el valor de LCD), ni
   «el 0,04 mm es el Z-offset» (es un descenso que hace la impresora tras la nivelación, no un
   ajuste que se introduzca).

### 5. Dos bloques que no se traslapan: dónde se mide la malla

- **Bloque PINDA (MK2/S a MK3.5/S):** el sensor recorre *"a number of points, in a grid pattern,
  **spread across the build-plate** (whether it is a powder-coated or smooth PEI sheet does not
  matter)"*, y esos puntos *"are interpolated and used to create **a virtual mesh of the bed**"*.
  (`:45`) Los ajustes de malla son de este bloque.
- **Bloque LoadCell (MK4/S, MK3.9/S, XL):** *"Before a print, the nozzle will check the distance
  to the print sheet in several places to create a virtual height map of the surface. **The
  points are measured within the area of the chosen print.**"* (`:93`) **Este bloque no da ruta de
  menú ni opciones.**
- **Y el MINI va por tercer camino:** rejilla 4x4, M.I.N.D.A. o SuperPINDA (`:83`), y su
  apartado de ajustes no existe.

**El matiz.** Los tres mecanismos de la misma página no son el mismo, y **el 3x3/7x7 y el 80 μm
son del primero**. La diferencia que sí está escrita —la malla se extiende por toda la cama en
un bloque y se mide dentro del área de impresión en el otro— es la razón por la que **una
densidad de malla mayor no se puede trasladar como consejo a un MK4 o a una XL**. Y ninguna de
las dos mitades dice que una malla más densa resuelva más casos: es un recurso para una adhesión
**irregular**, con su condición escrita.

**Lo que no es una contradicción y no se publica como tal:** que las tres máquinas midan de
forma distinta. Es una diferencia de arquitectura escrita en la misma página, y por eso va aquí
para que el redactor no la lea como un desacuerdo.

### 6. Prusa dice «acercarla puede mejorar la adhesión» y también «no la aprietes para compensar la falta de adhesión»

**No es un desacuerdo entre fuentes: son dos frases de Prusa, de dos páginas del mismo
Knowledge Base, y ninguna reconcilia con la otra.** Es la contradicción más útil de esta
vuelta, porque es la que impide convertir el 0,04 mm de Bambu, el «move the nozzle bit closer»
de la propia guía del i3 o el 3 mm de ala en consejo.

- **La guía del i3, con su amortiguador:** *"**Adjusting it closer can in some cases improve
  adhesion.** However, if you are having problems with adhesion, but your first layer
  calibration looks like the 'good' picture ( center picture ), your problem lies somewhere else,
  like a dirty/greasy sheet, print-settings, bed leveling/XYZ calibration, or under-extrusion."*
  — [Prusa Research](https://help.prusa3d.com/article/first-layer-calibration-i3_112364) (`:77`)
- **La página de infraextrusión, y es la razón por la que la anterior no se puede ampliar:**
  *"**Avoid compensating for a lack of adhesion by squishing the first layer too much.** If the
  nozzle is too close to the build plate, the filament can be obstructed from pushing through."*
  — [Prusa Research](https://help.prusa3d.com/article/under-extrusion_2007) (`:61`)
- **Y la tercera frase, del mismo Prusa, con las consecuencias:** *"if set **too close**, you can
  experience **extrusion problems and clogging** and poor print quality, or even **damage to the
  hardware, like the Flexible steel sheet** due to the print sticking too much"*, con el aviso de
  garantía en la línea siguiente —*"Having the nozzle too low can cause the nozzle to damage your
  steel sheet. **This is not covered by Warranty.**"* (`:51`, `:69`,
  `first-layer-calibration-i3`).
- **Y el contrapeso del otro lado, también escrito:** la guía del i3 dice de la chapa texturizada
  que *"you need to **move the nozzle bit closer**"* (`:85`), y Bambu dice que su Textured PEI
  Plate hace que la impresora baje la boquilla 0,04 mm tras la nivelación
  (`first-layer-not-sticking:25`).

**El matiz, y hay que escribirlo con las cuatro frases en el mismo párrafo.**

1. **No se contradicen si se distinguen dos cosas, y esa distinción es lo único que las
   salva.** La frase de la guía habla de lo que **puede ocurrir** al calibrar bien —y su
   amortiguador es literal: *can in some cases*—; la de infraextrusión habla de lo que **no hay
   que hacer** con la calibración: usarla para tapar una falta de adhesión. **Una es una
   propiedad del resultado y la otra es un hábito de uso**, y Prusa no dice en ninguna parte que
   sean la misma cosa.
2. **El aviso de la segunda es más fuerte porque tiene una consecuencia escrita: el filamento
   obstruido.** Acercar la boquilla **no mejora la adhesión en general: cambia el fallo.** La
   pieza pasa de «no se pega» a «sale con material menos», y de ahí pasa a «daño en la chapa,
   sin garantía».
3. **Lo que el redactor puede escribir:** las dos frases de Prusa con su página y su alcance, y
   el matiz de que «puede mejorar la adhesión» y «no la uses para compensar» son afirmaciones
   sobre cosas distintas. **Lo que no:** «acercar la boquilla mejora la adhesión» como regla —la
   fuente pone *in some cases* y la otra página prohíbe usarlo como remedio—; ni «no hay que
   acercar nunca la boquilla», que borraría el *in some cases* y contradiría tanto el *move the
   nozzle bit closer* de la propia guía del i3 como el descenso de 0,04 mm de Bambu; ni
   **cualquier puente entre el 0,04 mm de Bambu y el aviso de obstrucción de Prusa**: son
   mecanismos distintos en dos máquinas distintas y **ninguna fuente los conecta**.
4. **Y un aviso de redacción, porque las tres páginas usan «pegarse» con dos sentidos:** el
   *too close* produce «extrusion problems» **y** «the print sticking too much» (`first-layer-calibration-i3:51`).
   Son dos cosas distintas —infraextrusión por obstrucción y adhesión excesiva— con la misma
   causa. **El artículo no puede resolver la ambigüedad del verbo, y no debe usar la frase para
   ninguno de los dos sin decir cuál está usando.**

### 7. La página del extrusion multiplier se contradice a sí misma sobre la unidad del ajuste

**Ésta no es una contradicción entre fuentes: es una incoherencia interna de
`extrusion-multiplier-calibration`, y por eso está aquí sin candidatos.** **Se conserva tal
cual y no se convierte en instrucción.** Es la única fuente del lote que se contradice a sí
misma, y el brief avisa de ella explícitamente.

- **El parámetro, descrito como porcentaje:** *"The default setting (for PLA) is 1, **this value
  represents a percentage, 1 = 100%, 0.95 = 95%** etc. Usually, the adjusted values can be between
  0.9 and 1.1."* (`extrusion-multiplier-calibration:69`)
- **El ajuste del método visual, pedido en esa misma magnitud sin decir en cuál de las dos
  escalas:** *"If the top is under extruded or not smooth, then **re-adjust the Extrusion
  Multiplier accordingly by 1-2%**."* (`:112`)

**El matiz, y es corto porque la fuente no da nada más.**

1. **En la escala que la propia página define, «1-2 %» no corresponde de forma obvia a
   «0,01-0,02».** Si el parámetro va de 0,9 a 1,1 y se expresa como porcentaje con 1 = 100 %,
   un «1-2 %» puede ser 1,01-1,02, o 0,99-0,98, o 1,00-1,02, según de dónde se mire. **La página
   no lo aclara en ningún punto**: no dice «0,01-0,02», ni «1,01-1,02», y no da ni un ejemplo.
2. **Las dos mitades son del mismo apartado de la misma página**, así que **no se puede
   resolver con otra fuente del lote**: `under-extrusion` trata de infraextrusión y en ningún
   punto da este parámetro, y `skirt-and-brim` no lo menciona.
3. **Lo que el redactor puede escribir:** las dos frases literales y, si hace falta, el hecho de
   que la página no aclara la conversión. **Lo que no:** «sube el multiplicador 0,01-0,02», «súbelo
   1-2 puntos», ni ninguna reformulación que elija una de las dos lecturas. **Y tampoco «usa
   1-2 %» como recomendación**, porque repetir la segunda mitad sin la primera es repetir la
   incoherencia sin señalarla.
4. **Y una advertencia cruzada, con otro fichero cocinado:** `separaciones-entre-capas.md` cita,
   de **otra** página de Prusa —`layer-separation-and-splitting-fdm_1806`—, *"increase your
   printer's flow rate [...] **increase on 5% increments**"*. **Son dos páginas distintas, con
   dos pasos distintos —5 % y 1-2 %—, y no se pueden reconciliar ni comparar.** Si el artículo
   acaba tocando el flujo, tiene que decir **de qué página** sale cada número, porque el mismo
   parámetro tiene dos pasos escritos en dos sitios y uno de los dos está en una unidad ambigua.

## Sin respaldo

Una sola fuente secundaria, una página que **no dice** lo que se le quiere pedir, o sólo las notas
del recolector. El redactor puede usarlas **marcadas** como lo que son, y en varios casos no
puede usarlas de ninguna manera. **Lo que hay en este apartado es, sobre todo, lo que las ocho
fuentes no dicen** —y esa parte ha crecido con esta vuelta: la página de perfiles de chapa cierra
un hueco y abre cuatro, todos ellos sobre el mismo asunto, que es cuánto se sabe de un ajuste que
la propia Prusa describe sin una cifra.

- **Que «First Layer Calibration» no exista en el CORE One (ni en MK4, MK3.9 ni XL).**
  **[SEGUNDA MANO — sale de las notas del recolector, no del cuerpo de ningún fichero.]**
  `adhesion-primera-capa-prusa-kb-first-layer-calibration-i3.md:111-117` lo cuenta leyendo la
  lista de modelos **y** un comentario de los del pie: *"one that says literally 'First Layer
  Calibration' does not exist on CoreOne"*. **Los comentarios no se capturaron** —el fichero
  termina en el formulario de valoración (`:143-145`)*, así que esa frase no está en `wiki/raw/`
  en ninguna parte.
  **Lo que sí es publicable es la versión acotada, y es un hecho del cuerpo:** el campo
  «Relevant for» de la página lista **MMU family, MK3 family, MK3.5 family y OLD PRODUCTS**, y
  **no lista MK4, MK3.9, XL ni CORE One** (`:13-20`). Es un dato sobre **a qué declara
  aplicabilidad la página**, no sobre qué hardware existe.
  **Lo que no es publicable:** «esta guía no aplica a los modelos actuales» (implica una
  valoración del modelo que la página no hace), ni «el ajuste no existe allí» (eso requiere la
  fuente que no está).
- **Que el knob del LCD no exista en MK4, MK3.9 ni XL.** **[MISMA SITUACIÓN — inferencia a
  partir de la lista de modelos y de un comentario no capturado.]** El cuerpo dice que el
  procedimiento es *"from the LCD-menu - Calibration - First Layer Calibration"* y que se hace
  *"rotate the knob"* (`:43`). **Que eso no exista en otra máquina no lo dice ninguna de las
  ocho fuentes.** Y `mesh-bed-leveling` describe el MK4/XL con LoadCell sin mencionar la
  perilla (`:91`), **lo cual no es una prueba de que no la tenga.**
  **Y esta vuelta no lo cambia, sino que lo confirma por el lado contrario:** `steel-sheet-profiles`
  describe la misma mecánica de perilla —*"By turning the knob, you are changing the
  characters, and by clicking it, you confirm"* (`:81`)— para **MK2.5/S, MK3/S/+ y MINI/+,
  MK3.5/S** (`:53`, `:83`), y su cabecera «Relevant for» tampoco lista MK4, XL ni CORE One.
  **Ninguna fuente del lote describe la perilla de una máquina cuya cabecera la incluya.**
  **Y ojo con el tercer caso, porque es el más fácil de malinterpretar:**
  `extrusion-multiplier-calibration` **sí** lista MK4 family y MK3.9 family, y **no menciona
  la perilla ni el LCD ni la pantalla en ninguna línea** —es una página de PrusaSlicer y de
  firmware por menú, sin ninguna mención a un control giratorio—. **Eso es silencio, y el
  silencio no es prueba de que la perilla no exista.**
- **`print-settings` como causa: sigue sin página, y es el hueco que queda abierto.** **[NOMBRADA
  POR UNA FUENTE, DESARROLLADA POR NINGUNA DE LAS OCHO]** `first-layer-calibration-i3:77` la
  nombra y la página no la explica. **Lo que se ha descargado en esta vuelta no la desarrolla:**
  la sección «Slicer settings» de `under-extrusion` es **una causa de infraextrusión dentro de
  una lista de seis** y **no es la página a la que remite la guía del i3**. La lista de enlaces
  que el recolector conservó de `under-extrusion` **no incluye ninguna página de print-settings**,
  pero **esa lista es «entre otros» y no es exhaustiva**, así que lo único comprobable es lo
  negativo: **en `wiki/raw/` no hay ninguna página que desarrolle ese nombre.**
  **Publicable:** que Prusa la nombra entre los cuatro sitios donde puede estar el problema.
  **No publicable:** qué es un problema de *print-settings* en concreto, o cuál de los cuatro es
  más probable.
- **`under-extrusion` como causa: CORREGIDO EN ESTA VUELTA, y este punto ya no es un hueco.**
  Antes se escribía que no había forma de publicarlo «sin cruzar a otro artículo que no
  existía». **Ahora existe** `wiki/raw/adhesion-primera-capa-prusa-kb-under-extrusion.md` y está
  cocinado en `## Afirmaciones`. **Lo que pasa a ser no publicable ya no es el nombre sino tres
  cosas concretas:** (1) **que `under-extrusion` sea la causa *más probable* o la que haya que
  mirar primero** —ver la contradicción 3, que es exactamente lo que su lista de seis no dice—;
  (2) **que esa página sea la `under-extrusion` a la que `first-layer-calibration-i3:77` remite**:
  la guía la nombra como categoría y no enlaza a esta página, **así que la identidad entre las
  dos queda sin comprobar**; (3) **los otros cinco factores de la lista**, que están cocinados y
  marcados fuera de alcance en su propio apartado.
- **Que la opción «Offset» sustituya a la calibración, o que permita cambiar de chapa sin
  recalibrar.** **[NO LO DICE LA PÁGINA, y la página de la guía del i3 dice lo contrario.]**
  `steel-sheet-profiles:91` ofrece, en MINI/+ y MK3.5/S, *"**Offset** - sets the Live Z adjust
  value for the given profile, **without calibration**"*, y `first-layer-calibration-i3:81` escribe
  en cambio *"**You can not use the same first layer calibration if you swap between the Smooth and
  the textured sheet!**"*. **Ninguna de las dos páginas relaciona el Offset con el cambio de
  chapa**, ni dice que el Offset valga lo mismo que una calibración.
  **Publicable:** que una de las dos familias de máquina tiene una forma de fijar el valor de la
  chapa sin pasar por el procedimiento de calibración. **No publicable:** «puedes cambiar de
  chapa sin recalibrar», «el Offset sustituye a la calibración», ni ninguna equivalencia entre
  un valor escrito a mano y un valor medido con el patrón de prueba.
- **Cuántas chapas hay, cuántas tienen perfil, y si «hasta ocho» son ocho chapas.**
  **[NO ESTÁ EN NINGUNA DE LAS TRES PÁGINAS]** `steel-sheet-profiles` dice *"up to eight
  specialized profiles"* (`:49`) y *"There are currently eight sheet profiles available with
  predefined, but customizable names"* (`:55`), y **no enumera las chapas**: sus únicos nombres
  de ejemplo son «Smooth1» y «Textur1» (`:79`). `first-layer-calibration-i3:45` nombra **tres**
  tipos —smooth, satin, textured— y `:81` habla de **dos**.
  **Publicable:** que la función permite hasta ocho perfiles por impresora, que se nombra uno por
  chapa y que la guía del i3 menciona tres tipos de chapa. **No publicable:** «hay ocho
  chapas», «la chapa satinada tiene su perfil», ni ninguna lista de qué chapas son las que
  existen. La guía «Flexible steel sheets (guidepost)», que sí las describiría, **no está
  descargada**.
- **Que exista un milímetro de diferencia entre dos chapas, o un valor de Z por chapa.**
  **[NO ESTÁ, Y ESTE PUNTO ES EL MÁS IMPORTANTE DE LA NUEVA PÁGINA]** Las tres fuentes que
  explican el motivo del recalibrado lo hacen **sólo en palabras** —«different thickness»,
  «different thickness which affects calibration»—, y `steel-sheet-profiles` **no contiene
  ningún milímetro, ningún grosor de chapa y ningún valor de Z** (el recolector lo comprueba y lo
  deja escrito en sus notas).
  **La única dirección escrita en todo el lote es de la guía del i3 y de una sola chapa:**
  *"The textured sheets are **thinner** than the sheets with smooth PEI, therefore you need to
  **move the nozzle bit closer**"* (`first-layer-calibration-i3:85`).
  **Y de ahí no se puede deducir la dirección del cambio de chapa sin inferencia:** unir
  «la texturizada es más fina» con «al pasar de texturizada a lisa hay que recalibrar»
  (`under-extrusion:61`) **sugiere** que hay que alejar la boquilla, **pero ninguna fuente lo
  escribe, y esa composición es de este fichero, no de Prusa.**
  **Publicable:** que el grosor es el motivo, y que la texturizada obliga a acercar la boquilla.
  **No publicable:** «la lisa es 0,X mm más gruesa», «al pasar a la lisa sube N pasos», ni
  presentar el 0,04 mm de Bambu como el mismo tipo de dato que el motivo de Prusa.
- **Que «Live Z adjust», «Z-level» y «Z-compensation» sean lo mismo, o distintos.**
  **[NO HAY RESPALDO EN NINGUNA DE LAS OCHO FUENTES — y la mitad de esta vuelta lo confirma por
  el lado positivo.]** Antes el nombre salía **una vez en una sola fuente**
  (`skirt-and-brim:49`). **Ahora sale en dos fuentes y tres veces:**
  `steel-sheet-profiles:51` y `:91` («Live Z adjust») y `:74` («**Live adjust Z**», sin la Z
  mayúscula), además de la de PrusaSlicer. **Y en ninguna de las dos aparece «Z-level» ni «Z-
  compensation» en ningún punto** —el recolector lo comprueba para `mesh-bed-leveling` y para
  `steel-sheet-profiles` y lo deja escrito en ambos (`mesh-bed-leveling:115-118`,
  `steel-sheet-profiles:142`)*. **`under-extrusion` no nombra ningún ajuste Z**: habla de la
  calibración, no de un parámetro.
  **Publicable:** que **las dos páginas de Prusa** llaman «Live Z adjust» —con dos grafías— al
  ajuste que se guarda por chapa y que se puede cambiar mientras se ve la falda. **No
  publicable:** cualquier equivalencia entre los tres nombres, y cualquier diferencia entre
  ellos. Para afirmar que son distintos hace falta una fuente que los nombre juntos, y aquí no
  la hay. **La regla 3 del brief sigue vigente sin cambios.**
- **Que la etiqueta «Relevant for» desactualizada signifique que la página no aplica a los
  modelos que no lista.** **[SEGUNDA MANO — es la nota del recolector, no el cuerpo de ninguna
  página.]** El recolector lo dice de `under-extrusion`: *"Que no liste las máquinas actuales no
  significa que no aplique a ellas: solo significa que la etiqueta no se ha actualizado"*
  (`under-extrusion:195`, nota). **Es un juicio razonable y no es una cita, así que no se
  publica como hecho.**
  **Lo que sí es del cuerpo de las páginas** —y es lo que se puede escribir— es a qué declara
  aplicabilidad cada una: `under-extrusion` lista MK2.5, MK2.5S, MK3, MK3S, MK3.5 y «+»;
  `steel-sheet-profiles` lista MINI family, MK3 family, MK3.5 family y OLD PRODUCTS;
  `extrusion-multiplier-calibration` lista MK4 family, MINI family, MK3 family, MK3.5 family,
  MK3.9 family y «+». **Ninguna de las tres lista CORE One.**
- **Que el Elephant foot compensation sea una compensación concreta.** El nombre sale una vez
  (`skirt-and-brim:99`) **y la página no lo define**. Publicable: que el margen del ala se aplica
  después de esa compensación. No publicable: qué es, qué corrige ni cómo se ajusta.
- **Que la imagen de la página de Bambu sea la evidencia de su síntoma central.** La sección
  `## ¶ First layer not sticking to the plate` **no tiene texto**: sólo dos imágenes
  (`first-layer-not-sticking:13-18`). **Lo que se puede publicar es la ausencia**, que es un
  hecho del fichero; lo que no se puede es describir la foto, deducir de ella un tipo de daño ni
  compararla con la primera capa de nadie. Y por la misma razón **la página de Bambu no define
  su propio síntoma en texto**: su título lo nombra, y el resto son causas.
- **Que los apartados de Bambu sean un protocolo con un orden.** **[NO ESTÁ EN EL CUERPO]** El
  encabezado que precede a los tres apartados es `## ¶ Potential causes and solutions`
  (`first-layer-not-sticking:19`) —«potenciales causas»—, y no hay ningún texto de introducción
  que los ordene ni ninguna palabra de prioridad en el fichero, de la línea 19 a la 47. Ver la
  contradicción 3, donde está desarrollado.
- **Que los comentarios al pie y la lista de idiomas.** **[NO CAPTURADOS — y el propio recolector lo
  dice de los ficheros de Prusa]** Los comentarios visibles que el recolector menciona son ruido
  y ninguno trae datos verificables (`first-layer-calibration-i3:143-145`,
  `mesh-bed-leveling:123-124`, `skirt-and-brim:141-142`, y en las tres nuevas los 21, 62 y 113
  comentarios). **Ninguna afirmación de este fichero sale de un comentario.**
- **Que «las cuatro causas de Prusa» sean las cuatro únicas.** La fuente dice *"somewhere else,
  **like***" (`first-layer-calibration-i3:77`). **Es una lista abierta y el artículo no puede
  escribir que las cuatro son todas las posibilidades.** Y esta vuelta la refuerza: la lista de
  seis factores de `under-extrusion` **no incluye ni la chapa sucia ni la nivelación**, así que
  **las dos listas de Prusa no se cubren la una a la otra** y ninguna es la lista completa de las
  causas.

### Revisado y no incorporado

Lo que se ha encontrado leyendo las ocho enteras y se deja fuera a propósito. No es relleno:
está en `wiki/raw/` con su línea, y alguien tiene que cogerlo.

| Qué | Dónde está | Por qué fuera de aquí |
|---|---|---|
| **La torre de purga y el Warm Tower** | `temperatura-cama-bambu-wiki-filament-guide-material-table.md`, ya cocinados | **Esa página no está en este lote.** Se enlazan desde `temperatura-cama.md` y no se repiten |
| **La temperatura de boquilla y la de cama de la tabla de materiales de Prusa** (`185-235 °C, 50-60 °C` para PLA) | `temperatura-cama-prusa-kb-filament-material-guide.md`, ya cocinada | Campos de `temperatura-hotend` y `temperatura-cama`. Aquí no hay boquilla ni chapa como cifras propias |
| **El 60 °C como techo del PLA y el 50-60 de la tabla** | `temperatura-cama.md`, contradicción 3 | Es de `temperatura-cama`: es una cifra de cama. Aquí la adhesión excesiva entra como rama del diagnóstico, sin cifras |
| **El borrador de Bambu sobre materiales porosos** | `temperatura-cama-bambu-wiki-filament-guide-material-table.md` | Otro artículo |
| **El Draft shield** | `skirt-and-brim:69-71` | Es warping de ABS y ASA —«protect ABS, ASA, and other materials from warping»—, que el brief deja fuera de alcance. Va a [[warping-pla]] |
| **Los parámetros de falda que no son de adhesión**: *Loops (minimum)*, *Distance from object*, *Minimal filament extrusion length*, *Brim type*, *Brim for individual objects* | `skirt-and-brim:53-75`, `:89-91`, `:103-107` | Descripciones de parámetro sin justificación de adhesión. «Set to 0 to disable the skirt completely» y el modo Advanced/Expert son de interfaz del programa |
| **La rejilla 4x4 del MINI y la descripción de la LoadCell** | `mesh-bed-leveling:81-93` | Hardware por modelo. **Lo único que se conserva es la frase del área de medición**, y va en la contradicción 5, porque es lo que impide trasladar el 3x3/7x7 a otro bloque |
| **El firmware 3.7.0 como mínimo para los ajustes de malla** | `mesh-bed-leveling:57` | Se cita como condición de la ruta de menú en `## Afirmaciones`, no como dato de adhesión. Es un requisito de versión |
| **El 0,2 mm de la capa del patrón de prueba** | `first-layer-calibration-i3:93` | La prohibición de medir con calibre sí se cita; **la altura no**, porque es de la línea de prueba y la altura de capa es campo de [[altura-capa]] |
| **La «0.00787402 inch»** | `first-layer-calibration-i3:93` | Conversión a pulgadas sin ninguna otra fuente que la use |
| **La línea de la wiki de Bambu sobre el PLA en la superficie** | `temperatura-cama-prusa-kb-pla.md` | Ya cocinada en `temperatura-cama.md`; no está en este lote |
| **«The printers assembled in the Prusa factory are already fine-tuned»** | `first-layer-calibration-i3:43` | **Sí se cita**, y a propósito, como filtro de entrada. Va en `## Afirmaciones` |
| **Las otras cinco causas de `under-extrusion`, con sus cifras** | `under-extrusion:63-135` | **Están cocinadas y marcadas fuera de alcance** en su propio apartado de `## Afirmaciones`, que es donde el redactor tiene que buscarlas. El brief deja los fallos de extrusión en general fuera de alcance, y sus cifras (**+5 a 10 °C** de boquilla de acero, **±5-15 °C** de filamento, **0,4 / 0,6 / 0,8 / 0,1 mm** de boquilla, **0,2 mm** de capa, **±0,05 mm** de tolerancia de diámetro, **50 °C** de ventilador) son de `[[temperatura-hotend]]` y `[[altura-capa]]` |
| **Los dos métodos completos de calibración del extrusion multiplier** | `extrusion-multiplier-calibration:83-121` | El brief deja los fallos de extrusión fuera de alcance. **De esta página sólo se cocina el valor negativo —qué síntomas descartan—**, y la fórmula del método preciso con sus tres condiciones |
| **La interfaz de renombrar perfiles de chapa** | `steel-sheet-profiles:77-81` | «hasta 7 caracteres», que la palabra «Sheet» no se puede cambiar, el *chevron* bajo la posición redefinida, y que **no hay forma de borrar un carácter mal escrito** sino que hay que reiniciar el procedimiento. Es interfaz de menú, no es adhesión. **Lo único que sale de este apartado es que los nombres son personalizables**, y eso va en `## Sin respaldo` con el resto de lo que la página no aclara |
| **La definición de la cama magnética y de las chapas flexibles desmontables** | `steel-sheet-profiles:43` | *"The Magnetic heatbed enables you to use **flexible**, **removable** steel sheets. There are different properties and strengths of each sheet..."* — La primera frase es de arquitectura y la segunda no dice cuáles son esas propiedades. **Lo que sí sale del párrafo es el grosor**, y está cocinado |

## Tirado

Qué se ha eliminado y por qué. El redactor no usa nada de esto.

- **Los `[imagen]` y `[imagen: ]` de las ocho fuentes: 31 imágenes de contenido, y el recuento
  anterior de este fichero estaba mal.** Antes decía catorce; **la cuenta correcta de las cinco
  primeras es quince**: cuatro en la página de Bambu —el síntoma (`first_layer_not_sticking_to_
  the_plate.jpg`), las huellas (`fingerprints.jpg`), el `.gif` de cambio de chapa y el `.png` de
  la opción de nivelación activada— y **once `[imagen: ]` sin `alt` en los tres artículos de
  Prusa** (seis en la guía del i3, uno en *mesh bed leveling*, cuatro en *skirt and brim*), no
  ocho. **Las tres fuentes nuevas añaden dieciséis**: doce marcadores `[imagen:]` —tres en
  `under-extrusion`, tres en `steel-sheet-profiles`, seis en `extrusion-multiplier-calibration`—
  más **cuatro imágenes en dos tablas de montaje** de dos columnas sin texto, una en cada celda
  (`under-extrusion:99`, `steel-sheet-profiles:93`). Los iconos de idioma van aparte: **ocho por
  página**, veinticuatro más en las tres nuevas.
  **Ninguna sostiene una afirmación.** La más importante sigue siendo la primera de las dos de
  Bambu: es **la imagen del síntoma del que trata el artículo**, y no se ha descargado.
  **Lo que sí se conserva es la descripción textual de los estados** (`## Afirmaciones`), que es
  completa sin las fotos, y **no se conserva ningún juicio sobre si la foto de la página se parece
  a la del lector.** Una foto de calibración perfecta ilustra el procedimiento; no demuestra que la
  impresora esté bien. **Las capturas de menú de `steel-sheet-profiles` valen menos todavía:**
  son la interfaz de un menú que el artículo no describe.
- **Las referencias a «left picture», «center picture» y «right picture»** de la guía del i3
  (`:63`, `:67`, `:73`, `:85`, `:87`). **No se pueden resolver en este lote** porque las imágenes
  están sin `alt`. Se conserva la descripción textual de cada estado; se descarta cualquier valor
  de la imagen.
- **El encabezado de las seis páginas de Prusa que lo tienen**: «Relevant for», «N comments» —
  **200, 50, 36, 21, 62 y 113**, uno por página— y «Article is also available in following
  languages» con los ocho iconos de idioma. Es mobiliario de página. **Se conserva la lista de
  «Relevant for»**, y sólo como límite de alcance —está en el bloque de apertura, en
  `## Afirmaciones` y en `## Sin respaldo`—, porque es lo que impide generalizar la guía del i3 y
  las tres páginas nuevas. `first-layer-issues` es la única de las siete páginas de Prusa de este
  lote **sin esa cabecera**.
- **Los `[tip-callout]` y `[note-callout]` de las tres nuevas que no son de este artículo.** Se
  conserva el texto de los que sostienen algo —el aviso de que el ventilador del hotend gira por
  encima de 50 °C se cita sólo como cifra de `temperatura-hotend`—, y se descarta el resto:
  el *Cold pull* que resuelve un atasco cuando la boquilla está bien puesta
  (`under-extrusion:80`), el error del *Fan check* (`:106`), la nota de que la 0,1 mm es
  «experimental» (`:90`), y el recuadro de que PrusaSlicer usa los mismos cálculos de flujo que
  Slic3r (`extrusion-multiplier-calibration:54`). **La etiqueta `[tip-callout]` frente a
  `[note-callout]` es parte del texto de Prusa y no una decisión del recolector**, así que el
  redactor puede distinguir un aviso de una nota si lo necesita.
- **El «End Notes» de la página de Bambu** (`:49-55`): «We hope that the detailed guide we
  shared with you was helpful and informative», el encargo de escribir al servicio de atención al
  cliente y el enlace para abrir un ticket. Boilerplate de soporte.
- **Los enlaces internos a páginas no descargadas**: «How to Use Bambu Lab Glue»
  (`first-layer-not-sticking:37`), «PEI print surface preparation» (`:55`), «Bed Level
  Correction» (`:105`), «Warranty» (`:69`), «Preflight check in the Assembly manual» (`:107`), el
  artículo de «First Layer Calibrations with other nozzle diameters» (`:101`),
  «P.I.N.D.A./SuperPINDA Sensor testing» (`mesh-bed-leveling:79`),
  «M.I.N.D.A./SuperPINDA sensor testing (MINI/MINI+)» (`mesh-bed-leveling:87`) y los «Material
  guides» de `first-layer-issues:25`. **Se conservan los nombres donde la frase que los contiene
  es una afirmación** —por ejemplo «Bed Level Correction», que es lo que Prusa señala cuando el
  ancho de línea varía a lo largo—, y se descarta el contenido al que apuntan, que nadie ha visto.
  **CORREGIDO EN ESTA VUELTA:** «Steel sheet profiles» (`:45`, `:81`) **ya no está entre ellos**,
  porque la página está descargada y su contenido se cocina. **De las tres fuentes nuevas siguen
  sin seguir** la guía «Flexible steel sheets (guidepost)», que es la que diría los grosores
  (`steel-sheet-profiles:46`), «Configuration Wizard», «Different nozzle types»,
  «Checking/re-aligning the Bondtech gear», «Idler screw tension», «Cold pull» y las dos guías de
  cambio de boquilla (`under-extrusion:67`, `:71-73`, `:75`, `:80`, `:95`), y **los dos STL del
  extrusion multiplier**, que además no son descargables desde `/article/`
  (`extrusion-multiplier-calibration:93`, `:109`).
- **El símbolo `¶` delante de cada título** de la wiki de Bambu. Es un artefacto del CMS que
  conservó el recolector.
- **La errata «the B rim option»** (`skirt-and-brim:81`), con el espacio. Se cita así porque es
  como está; **no se corrige**, y `wiki/raw/` no se toca.
- **Las erratas y rarezas de las tres fuentes nuevas, que se conservan tal cual y no se
  corrigen:** «**bewteen**» por «between» (`steel-sheet-profiles:51`), «the different flexible
  steel sheet» en singular dentro del recuadro (`:46`), y **doble espacio al final de dos
  párrafos** del principio de esa misma página. En `under-extrusion`: «**in and/or in between
  printed layers**», que repite «in» (`:65`); la **frase sobre el *enclosure* termina sin
  punto** (`:109`); y el encabezado de la lista, que en el HTML venía partido en dos etiquetas
  `<strong>` —«Common factors in under extru» + «sions are:»— y que aquí se escribe entero como
  «under extrusions», que es el texto renderizado. Los apóstrofos rectos de «print's layers» y
  «thermistor's wires» conviven con comillas tipográficas en el resto del original
  (`under-extrusion:47`, `:75`). **Ninguna aporta nada y ninguna se corrige**, porque `wiki/raw/`
  no se toca.
- **El aviso técnico del recolector sobre cómo se obtuvo el cuerpo de las tres nuevas**, que se
  conserva porque **afecta a cualquier descarga futura de `help.prusa3d.com`**: la conversión
  automática a Markdown de esas tres URLs devuelve título, índice y pie y **deja el cuerpo
  vacío**, porque el texto está en un fragmento de carga de React (`<div hidden id="S:1">`) que
  el conversor descarta por no formar parte del árbol renderizado. **Las tres responden 200 con
  cuerpo real** —1.514.187 bytes la de perfiles de chapa y 1.530.861 la del multiplicador—.
  **Lo que el redactor tiene que saber: una conversión vacía de esta URL no es prueba de página
  vacía**, que es el caso que el brief ya conocía.
- **«This is by far the most common 3D printing problem, and probably the first one you may
  encounter»** (`first-layer-issues:13`), y el párrafo que le sigue sobre la primera capa como
  base del objeto. Es una afirmación de fabricante sin ningún dato detrás, y no es una
  afirmación técnica.
- **«To achieve the best adhesion of the print surface, it is vital to keep it clean»**
  (`first-layer-issues:23`). Es la premisa de la sección de limpieza, ya enteramente en
  `temperatura-cama.md`. Se descarta **la premisa**, no el dato: el 90 % de IPA y el aviso de los
  productos dermales se enlazan desde allí.
- **La derivación de que quitar en caliente deforma la base y eso se confunde después con
  warping.** **No la enuncia ninguna fuente de este lote ni ninguna de las de `temperatura-cama`,
  y ya está marcada como no publicable en aquel fichero.** Aquí tampoco.
- **La fila del `PLA | No, -, No` y la tabla de materiales completa de Prusa.** Ya cocinadas en
  `temperatura-cama.md` y `separaciones-entre-capas.md`. De esta fuente sólo se usa
  `first-layer-issues`, y de ella no hay tabla.
- **Lo que el redactor tiene que NO reintroducir**, porque es lo que este fichero ha decidido y
  no está en ninguna parte:
  - **Que los tres apartados de Bambu sean un orden de trabajo.** No lo son: la página los numera
    bajo «Potential causes and solutions» y **no dice en qué orden comprobar** nada.
  - **Que la posición de «First layer calibration too close» en la lista de seis factores sea un
    orden de comprobación.** Es la posición del primer elemento de una lista titulada «**Common
    factors**» que responde a **qué causa infraextrusión**. Contradicción 3.
  - **Que 0,04 mm sea una recomendación general**, o que sea el Z-offset, o que exista para las
    otras chapas. Es un descenso que hace la impresora en la Textured PEI Plate tras la
    nivelación.
  - **Que el 0,04 mm de Bambu y el aviso de obstrucción de Prusa estén relacionados.** Una
    impresora baja la boquilla tras la nivelación en una chapa texturizada; la otra dice que si
    la boquilla está demasiado cerca el filamento no puede empujarse. **Son mecanismos
    distintos en máquinas distintas y ninguna fuente los conecta.** Contradicción 6.
  - **Que acercar la boquilla «mejore la adhesión» sin el «in some cases», o que no se pueda
    acercar nunca.** Las dos frases de Prusa conviven y se distinguen por su propósito; borrar
    cualquiera de las dos produce un consejo falso. Contradicción 6.
  - **Que el -0.400 a -1.500 sea un objetivo.** La página dice que es único por máquina, que no
    significa nada sin referencia visual, y que hay que mirar y no fijar un número.
  - **Que la guía del i3 aplique a MK4, MK3.9, XL o CORE One.** Su propia lista de «Relevant
    for» no los incluye, y lo único que hay en `wiki/raw/` en contra es un comentario que no se
    capturó.
  - **Que ninguna de las tres páginas nuevas aplique a los modelos que su cabecera no lista.** Un
    rótulo desactualizado no es prueba de nada, y a la inversa: la cabecera no demuestra que la
    página sea de un modelo. `## Sin respaldo`.
  - **Que el «curling up around the edges» de la guía sea un síntoma de una pieza levantada.**
    Es del cuadrado del patrón de prueba y es el signo de la boquilla **demasiado cerca**.
  - **Que «wash the plates» de Bambu signifique sumergir la chapa.** Ninguna de sus dos páginas
    lo dice, y Prusa lo prohíbe por escrito.
  - **Que el Live Z adjust sea el Z-level o el Z-compensation.** Las dos páginas que lo nombran
    usan ese nombre —con dos grafías— y **ninguna menciona los otros dos**.
  - **Que «hasta ocho perfiles» sean ocho chapas, ni que la chapa satinada tenga perfil.** La
    página no enumera ninguna chapa. `## Sin respaldo`.
  - **Que exista un milímetro de diferencia entre dos chapas, o que el motivo del recalibrado sea
    un número.** Las tres páginas que lo explican lo hacen **en palabras**. `## Sin respaldo`.
  - **Que la opción Offset permita cambiar de chapa sin recalibrar.** Es de una de las dos
    familias de máquina y **ninguna página la relaciona con el cambio de chapa**.
    `## Sin respaldo`.
  - **Que subir la malla a 7x7 solucione una pieza levantada por una esquina.** Su condición
    escrita es adhesión **irregular**.
  - **Que «tall objects with a small base» sea «la pieza se levanta por una esquina».** Son dos
    cosas distintas y la página no las relaciona.
  - **Que los 3 mm de brim sean un umbral de diagnóstico.** Es «at least», con un «generally
    it is advised» delante.
  - **Que el 75 % de las tres primeras capas sea del PLA o de un i3.** La frase no nombra
    material, ni máquina, ni chapa, y va condicionada a que la limpieza no haya funcionado.
  - **Que el extrusion multiplier sirva para decidir si la primera capa se pega.** Su método
    visual juzga la **capa superior del cubo** y sus dos síntomas están dentro de las capas.
    Su valor aquí es **descartar**, y sólo eso.
  - **Que «1-2 %» sea el paso que hay que hacer.** La página se contradice sobre la unidad y no
    lo aclara. Contradicción 7. **Ni «0,01-0,02», ni «1-2 puntos».**
  - **Que las cinco causas fuera de alcance de `under-extrusion` sean contenido de este
    artículo.** Están cocinadas con su línea y marcadas fuera de alcance, y el brief deja los
    fallos de extrusión en general fuera de alcance.
  - **Que la sección «Slicer settings» de `under-extrusion` sea la página `print-settings` que
    nombra la guía del i3.** Son dos textos de dos páginas distintas, y la guía del i3 no enlaza
    a ninguna de las dos.
  - **Que las dos listas de Prusa —las cuatro salidas y los seis factores comunes— se cubran la
    una a la otra, o que juntas sean la lista completa.** La de infraextrusión no menciona ni la
    chapa sucia ni la nivelación.

## Relaciones

| Concepto | Se relaciona con | Cómo |
|---|---|---|
| adhesión en la primera capa | [[temperatura-cama\|Temperatura de cama]] | **Es el único artículo con una cifra de cama en este lote, y esa cifra no es suya.** El +5 a +10 °C es un incremento sobre el perfil de `first-layer-issues:66`, está cocinado en `temperatura-cama.md` y aquí sólo se enlaza. `bedTemp` es de ese artículo. **Lo que este artículo sí tiene de la cama es la afirmación sin cifra de Bambu:** el mismo material se imprime a distinta temperatura según la chapa, y elegir mal la chapa es una causa de adhesión insuficiente |
| adhesión en la primera capa | [[warping-pla\|Warping en PLA]] | **El lift de una esquina es warping y está fuera del alcance de este brief.** Lo que este artículo aporta es la frontera: la boquilla **demasiado lejos** produce el blob y la falta de adhesión (`first-layer-calibration-i3:51`), y el residuo en la boquilla interrumpe la nivelación —tres fuentes—, y ése es un fallo de ajuste Z, no de warping. Y el «curling up around the edges» del patrón de prueba **no** es un lift: es la boquilla demasiado cerca |
| adhesión en la primera capa | [[separaciones-entre-capas\|Separaciones entre capas]] | **Dos adhesiones distintas y el mismo número en dos lados.** Allí es entre capas y la palanca es térmica; aquí es a la cama y la palanca es superficie y geometría. El punto de contacto es que **la boquilla demasiado baja hace que la pieza se pegue de más** y daña la chapa, y eso tiene corroboración en el bloque de la LoadCell |
| adhesión en la primera capa | residuo en la boquilla | **Lo mejor corroborado del lote, y en tres sitios de dos fuentes.** Bambu lo pone como condición previa a la nivelación; Prusa lo hace interrumpir la malla por dos vías (*StallGuard* y *Enforcing the Z-calibration*), y ese mismo párrafo añade el otro disparador: **tocar la cama durante el sondeo da el mismo aviso**. El mensaje en pantalla no distingue entre las dos causas |
| adhesión en la primera capa | limpieza de la chapa | **Dos contradicciones y ninguna resolución.** Lavar o no lavar cada vez (contradicción 1) y el agua (contradicción 2). Y el aceite de los dedos: la mitad de esa afirmación es del foro, que no está en este lote, así que aquí sólo sale la forma de la Knowledge Base —«some oils and sugars that IPA does not remove»— que **no identifica esos aceites con las huellas** |
| adhesión en la primera capa | pegamento | **Las dos casas coinciden en que no es la herramienta del PLA, y no coinciden en el resto.** Bambu: pegamento «such as» para materiales que no son PLA **sobre la chapa lisa**. Prusa: PVA «not needed when printing PLA» y «may be advisable» para ocho familias de materiales, sin chapa. Y la prioridad que sí está escrita es de Prusa: **el ala va antes que el material adhesivo** |
| adhesión en la primera capa | Live Z adjust | **El nombre ya no es de una sola fuente, y sigue sin poder equipararse con nada.** PrusaSlicer lo usa una vez (`skirt-and-brim:49`), donde la falda permite cambiarlo **mientras se ve la línea**, con los dos estados «not sticking properly» y «being too squished by the nozzle». La página de perfiles de chapa lo usa **dos veces más**, y dice que es el valor que **se guarda por chapa**: «For each sheet, set the Live Z adjust value». **Tres apariciones, dos fuentes, y dos grafías dentro de la misma página** («Live Z adjust» y «Live adjust Z»). **Ni Z-level ni Z-compensation aparecen en ninguna de las ocho fuentes** |
| adhesión en la primera capa | perfiles de chapa (Steel sheet profiles) | **El ajuste Z guardado por chapa, y el motivo del recalibrado.** Hasta ocho perfiles, uno por chapa, el motivo es el **grosor**, y **la impresora no sabe qué chapa hay montada ni avisa del cambio**: el fallo es silencioso. **No hay ni un milímetro de grosor ni un valor de Z en la página.** Ver `## Sin respaldo` |
| adhesión en la primera capa | infraextrusión (under-extrusion) | **El cruce que faltaba, y va en las dos direcciones.** Una de las cuatro salidas de Prusa resulta ser **una adhesión mala que no es un fallo de adhesión**: apretar la boquilla para forzar la adhesión impide que el filamento salga. **Y al revés**: el síntoma de la infraextrusión es material que falta **dentro de las capas**, no una pieza despegada. **La distinción que el artículo puede escribir es entre el síntoma de las dos páginas** —pieza levantada / material que falta en las capas—, **y es una síntesis de este fichero: ninguna de las dos páginas la formula** |
| adhesión en la primera capa | flujo / extrusion multiplier | **Descarta, y por eso es útil.** `extrusion-multiplier-calibration` **no menciona la cama ni la primera capa**: sus dos síntomas son Cicatrices y acumulaciones en exceso, o huecos pequeños entre líneas y perímetros, y su método visual juzga la **capa superior del cubo**. **Lo único que se cocina aquí es ese valor negativo**, más las dos escalas del parámetro —con su incoherencia de unidad, contradicción 7—. La calibración en sí es de `separaciones-entre-capas`, y **su paso de 5 % y el «1-2 %» de esta página no se reconcilian** |
| adhesión en la primera capa | limitaciones de la impresora | **Dos, de dos dominios distintos, y las dos son silenciosas.** La impresora **no puede saber qué chapa tiene montada** (`steel-sheet-profiles:51`) y **no da realimentación de cuánto filamento sale** (`under-extrusion:65`). **Un diagnóstico tiene que poder decir «esto no se descarta mirándola»**, y son las dos frases que lo permiten |
| adhesión en la primera capa | ala (brim) | Aumenta la superficie de la primera capa, y Prusa la recomienda para objetos altos con base pequeña y para varios objetos pequeños a la vez. **Mínimo 3 mm, con «generally it is advised» delante.** El margen se aplica después de la Elephant foot compensation, que la página nombra y no define |
| adhesión en la primera capa | malla de nivelación | El único recurso numérico del lote, y condicionado: 3x3 por defecto, 7x7 (49 puntos) **si la adhesión es irregular**, con 3 o 5 mediciones por punto y 80 μm de desviación posible en 3 de los 49 puntos por los imanes. **Todo eso es del bloque PINDA (MK2/S a MK3.5/S); el MINI va a 4x4 y el MK4/MK3.9/XL miden dentro del área de la impresión** |
| adhesión en la primera capa | adhesión demasiado fuerte | **La otra rama del diagnóstico, y es oficial.** Prusa: con PETG, ABS, ASA, XT y CPH la adhesión *may be too strong* y se puede dañar la PEI lisa; el separador es un pegamento. Y una prohibición que sale de la misma página: **no usar acetona antes de imprimir con PETG** |
| adhesión en la primera capa | orden de comprobación | **No hay ninguno escrito.** Ver la contradicción 3, que es el hueco central de este lote. **Lo único nuevo es la posición de un elemento en una lista** —el factor de calibración es el primero de los «Common factors» de la infraextrusión—, **y su alcance está escrito allí: es la posición, en una lista que responde a otra pregunta** |
| adhesión en la primera capa | `[[slicer\|Qué slicer escribió esto]]` | **Dos páginas son de software, y sólo una trata la primera capa desde el programa.** `skirt-and-brim` habla de PrusaSlicer y de la falda y el ala; `under-extrusion` menciona el *Configuration Wizard* y los perfiles de fábrica, **pero para explicar una causa de infraextrusión, no la primera capa**. `extrusion-multiplier-calibration` es de PrusaSlicer y **no menciona la primera capa** |

**Páginas propias que este tema deja sugeridas:**

- **El ajuste Z y sus nombres.** «Live Z adjust» sale ahora en **dos fuentes y tres veces**, con
  dos grafías, y **junto a él no está ni Z-level ni Z-compensation en ninguna de las ocho**.
  **Hacen falta páginas que los nombren juntos antes de poder escribir que son distintos**, y esa
  es exactamente la contradicción que hoy no se puede cerrar. **Esta vuelta ha movido la ficha
  sin cerrarla**: antes el hueco era que el nombre salía una vez; ahora es que sale pocas veces.
- **Nivelación de cama por máquina.** `mesh-bed-leveling_112163` tiene tres bloques con tres
  mecanismos, dos rejillas distintas y un ajuste que sólo es de uno de ellos. Es un artículo
  entero y este fichero sólo ha cocinado la frontera con el diagnóstico.
- **Bed Level Correction y el ancho de línea.** La guía del i3 lo nombra como destino cuando
  «the width of the line varies across its length», y el artículo al que remite **no está
  descargado**.
- **Steel sheet profiles, o el Z por chapa.** Tiene contenido propio y ya está en `wiki/raw/`:
  hasta ocho perfiles, dos juegos de menú distintos por familia de máquina, una opción *Offset*
  que fija el valor sin calibración, un *quick-toggle* en dos sitios, y la advertencia de que la
  impresora **no detecta la chapa**. **Es el artículo que explica por qué «antes iba bien y
  ahora no» puede ser sólo un cambio de chapa**, y este fichero sólo ha cocinado su frontera con
  la adhesión.
- **Infraextrusión y primera capa: la frontera de dos síntomas.** Las dos páginas ya están
  descargadas y este fichero ha cocinado el lado de la primera capa; **falta el lado de la
  extrusión en un solo sitio**, que es `separaciones-entre-capas`. **Y al revés que en este
  fichero, `separaciones-entre-capas.md` sigue diciendo que la guía del extrusion multiplier «no
  está en `wiki/raw/`»**, así que las dos referencias tienen que cruzarse cuando ese fichero se
  vuelva a pasar.
- **`print-settings`.** Sigue siendo el **único** hueco sin página de las cuatro salidas de
  Prusa. Es el nombre que la guía del i3 usa y del que **ninguna fuente disponible da el
  contenido**: lo único parecido es la sección «Slicer settings» de `under-extrusion`, que es
  otra página y responde a otra pregunta. **Para cerrarlo hace falta la página que Prusa enlaza.**