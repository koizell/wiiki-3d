---
titulo: Malla de cama y nivelación
tema: malla-de-cama
fuentes:
  - wiki/raw/adhesion-primera-capa-prusa-kb-mesh-bed-leveling.md
  - wiki/raw/elephant-foot-klipper-docs-probe-calibrate.md
  - wiki/raw/elephant-foot-bambu-wiki-a1-first-layer-too-low.md
  - wiki/raw/adhesion-primera-capa-bambu-wiki-first-layer-not-sticking.md
  - wiki/raw/placas-prusa-kb-smooth-steel-sheet.md
  - wiki/raw/adhesion-primera-capa-prusa-kb-first-layer-calibration-i3.md
  - wiki/raw/warping-pla-bambu-wiki-warping-falling-off-collapsing.md
cocinado: 2026-10-16
---

# Malla de cama y nivelación

> **Nota de procesado.** No existían ficheros `wiki/raw/malla-de-cama-*.md` en el repositorio
> al cocinar este tema, así que se ha usado el conjunto de crudos disponibles que tratan
> malla de cama, sensor/probe, Z-offset y nivelación manual (listados en el frontmatter).
> El crudo compartido `first-layer-calibration-i3` aporta los estados visuales del Z-offset y
> los desencadenantes de recalibración; el de `smooth-steel-sheet`, la readaptación al
> cambiar de chapa; `warping-falling-off-collapsing` aporta la dirección del Z-offset
> cuando la boquilla queda demasiado alta.

## Afirmaciones

### Qué es la malla de cama

- **La malla es una medida, no una corrección mecánica.** El sensor recorre la cama en una
  rejilla, mide distancia en cada punto e **interpola una malla virtual** de la superficie;
  durante la impresión la boquilla la sigue punto por punto: *"if the bed is slightly
  warped, the sensor will still precisely follow the surface according to its measured
  mesh"*.
  — [Prusa Research](https://help.prusa3d.com/article/mesh-bed-leveling_112163)
  (`mesh-bed-leveling:45`). Cubre el caso de una cama **ligeramente combada**; no el de
  una deformación grande ni una chapa doblada.

- **Dos procedimientos distintos según el sensor, y es una diferencia de alcance escrita.**
  En el bloque PINDA la malla se extiende *"spread across the build-plate"* y construye
  *"a virtual mesh of the bed"*; en el bloque LoadCell (MK4/MK3.9/XL) dice: *"Before a
  print, the nozzle will **check the distance to the print sheet in several places to
  create a virtual height map**. **The points are measured within the area of the chosen
  print.**"* (`mesh-bed-leveling:45`, `:93`). Con LoadCell no se da tamaño de rejilla ni
  opciones de menú; con el bloque PINDA sí. El 3×3/7×7 no se traslada tal cual a un MK4 o
  a una XL, porque lo que mide cada sistema y dónde no es lo mismo.

### Cuándo sirve

- **Adhesión irregular en la primera capa.** *"if you still experience uneven first layer
  adhesion, you can increase the density in Settings - Mesh bed leveling - Mesh to 7x7
  (49 points)"*. — [Prusa Research](https://help.prusa3d.com/article/mesh-bed-leveling_112163)
  (`mesh-bed-leveling:67`). El condicionante es *uneven first layer adhesion*: resuelve
  adhesión **irregular**, no pieza que no pega en absoluto ni esquina levantada.

- **Cama anteriormente nivelada que ha quedado inexacta.** Bambu: *"In some rare cases,
  the bed leveling from previous calibrations might be inaccurate leading to inconsistent
  adhesion to the plate."* (`first-layer-not-sticking:41`). Dos límites del mismo dato:
  *some rare cases* e *inconsistent adhesion*.

- **Cambiar o sustituir la chapa.** Bambu: *"It is crucial to perform heat bed leveling,
  particularly when changing or replacing the build plate, to ensure accurate leveling for
  the new print task."* (`a1-first-layer-too-low:36, :38, :41-49`).

- **Dejar la opción activa antes de cada impresión.** Bambu: *"We also strongly recommend
  to keep the **Bed Leveling Calibration option turned on** when starting a print, for the
  highest chances of success."* (`first-layer-not-sticking:45`).

### Cuándo no sirve / no es la causa

- **No corrige un Z-offset demasiado alto.** *"Check your Z-offset, first layer must be
  squished"* en el listado de comprobación de Bambu, y la causa asociada es *"Z-offset
  too high, the nozzle is too far from the bed, during the first layer."*
  (`warping-falling-off-collapsing:23, :69`). La malla mide la cama; si la boquilla queda
  alta en toda la pieza, el problema es el offset, no la forma de la chapa.

- **No corrige suciedad o grasa.** Bambu: *"We strongly recommend to **wash the plates
  with hot water and detergent** before printing to remove any debris or contaminants."*
  Y la nivelación va **después** de la limpieza: *"performing a bed leveling calibration
  from the calibration menu **after ensuring the nozzle tip is clean and free of any
  debris**"* (`first-layer-not-sticking:33, :43`). Tres sitios nombran el residuo en la
  boquilla como condición previa; ver sección `## Tirado` / crudo `mesh-bed-leveling`
  (`:53, :75`).

- **No compensa un probe que no es repetible.** Klipper: *"If repeatable results can not
  be obtained then **don't use the probe for bed leveling**."* (`probe-calibrate:83`). Ver
  umbral en `Sensor / probe`.

- **No corrige una chapa mal seleccionada en el slicer.** Bambu: *"First layer adhesion
  issues could be related to **incorrectly selecting the plate type** in Bambu Studio"*
  porque *"The same material is usually printed at **different heatbed temperatures**
  depending on the build plate"* y la temperatura resultante es demasiado baja
  (`first-layer-not-sticking:23, :25`). Ese fallo no lo resuelve ninguna malla.

### Malla automática vs manual

- **Automática (software/sensor).** Prusa: el sensor recorre la rejilla y la sigue durante
  la impresión, con opciones en *Settings → Mesh bed Leveling* del LCD: **Mesh (3×3 a
  7×7)**, **Z-probe nr. (1 / 3 / 5)**, **Magnet comp. (ON / OFF)**; feature disponible
  desde **firmware 3.7.0** (`mesh-bed-leveling:57-71`). Bambu (A1): se activa la opción
  *Bed Leveling* en el slicer antes de imprimir (`a1-first-layer-too-low:53`).

- **Diferencias por familia de sensor.**
  - PINDA/SuperPINDA (MK2/S a MK3S, MK3S+/MK3.5S): rejilla **3×3 por defecto, hasta
    7×7**; SuperPINDA en MK3S+/MK3.5S (`mesh-bed-leveling:49-53`).
  - MINI/MINI+: M.I.N.D.A. o SuperPINDA, rejilla **4×4** (`mesh-bed-leveling:83`).
  - MK4/S, MK3.9/S, XL: **LoadCell**; los puntos se miden **dentro del área de la
    impresión elegida** y no se documentan opciones de menú ni tamaño de rejilla
    (`mesh-bed-leveling:91-93`).

- **Manual (cuando la automática no basta).** Klipper: si el probe no da resultados
  repetibles, *"Klipper has several **manual probing tools** that can be used instead"*
  (`probe-calibrate:83`). También la **corrección del bed level** cuando la anchura de
  la línea varía a lo largo de una misma línea (`first-layer-calibration-i3:105`). Y el
  retensado mecánico previo (Bambu A1: recalcular después de fijar los tornillos del
  hotend / buckle) (`a1-first-layer-too-low:57-96`).

- **Fijación manual temporal del offset (no calibración).** Bambu A1 propone ajustar
  `G29.1 Z{xxx}` en el Start G-code y da rangos: **Texture board: -0,02 ~ 0 mm**;
  **Non-texture board: -0,01 ~ 0,01 mm**, con la advertencia de que es *"only for a
  quick temporary fix ... may introduce new local defects elsewhere"* y de que al
  resolver la causa hay que **restaurar los ajustes por defecto** (`a1-first-layer-too-low:100-120`). Es un
  parche, no sustituye al bed leveling.

### Sensor / probe

- **Tipos de sensor por modelo.** PINDA/SuperPINDA (MK2/S a MK3.5/S), M.I.N.D.A. o
  SuperPINDA (MINI), LoadCell (MK4/S, MK3.9/S, XL) — la LoadCell detecta que la boquilla
  está lo bastante cerca de la chapa *"to avoid damage that would be caused by the nozzle
  digging into the steel sheet"* (`mesh-bed-leveling:49-51, :83, :91`). En el ecosistema
  Klipper se admite `[probe]` o `[bltouch]` (`probe-calibrate:15`).

- **Umbral de repetibilidad (Klipper).** `PROBE_ACCURACY` ejecuta diez sondeos. Lo normal
  es una diferencia de **un paso Z o hasta 5 µm**; si el **range** es **mayor de 25 µm
  (.025 mm)**, el probe *"does not have sufficient accuracy for typical bed leveling
  procedures"* y conviene ajustar velocidad/altura de arranque o pasar a sondas manuales;
  con resultados mayoritariamente repetibles pero con algún outlier, usar **varias
  muestras** por punto (`probe-calibrate:61-83`). Umbrales solo documentados aquí; no
  corroborados por las otras fuentes de este lote.

- **Sesgo por ubicación (location bias).** El `z_offset` debería ser constante en toda la
  cama. Si la diferencia entre el mínimo y el máximo Z-offset medido en distintos
  puntos supera **25 µm**, el probe *"is not suitable for typical bed leveling
  procedures"*; se recomienda medir cerca de las cuatro esquinas (cartesianas/corexy) o
  cerca de las torres (delta) (`probe-calibrate:85-97`).

- **Sesgo térmico (temperature bias).** Muchos sensores disparan a una altura distinta
  según su temperatura. Klipper recomienda *"run the bed leveling tools at a consistent
  temperature"*, ya sea siempre a temperatura ambiente o siempre a temperatura de
  impresión, **esperando varios minutos tras alcanzarla**; comprobación con
  `PROBE_ACCURACY` antes y después de calentar, sin re-homing (`probe-calibrate:99-105`).

- **Calibración del probe (Klipper).** El `z_offset` es *"the distance between the nozzle
  and bed when the probe triggers"* y es crítico. Flujo: `PROBE_CALIBRATE` (sondeo
  automático + manual con *paper test*), `ACCEPT` y `SAVE_CONFIG`; calibrar X/Y con
  cinta azul de pintor, `PROBE`, `GET_POSITION` y fórmula `x_offset =
  nozzle_x − probe_x` (`probe-calibrate:21-52`).

- **Invalidación en cascada.** Cambiar sistema de movimiento, posición del hotend o
  ubicación del probe invalida `PROBE_CALIBRATE`; cambiar la inclinación de la cama
  (tornillos, `DELTA_CALIBRATE`, `Z_TILT_ADJUST`, `QUAD_GANTRY_LEVEL`) también. Al
  invalidar el probe, **la malla de cama anterior queda invalidada** y hay que repetir
  `BED_MESH_CALIBRATE` (`probe-calibrate:53-57`).

- **Interrupciones por residuo o contacto.** Con el bloque PINDA, *StallGuard* del eje Z
  está activo durante la malla: si la boquilla choca contra la cama antes de que dispare
  el sensor, el proceso se interrumpe y pide revisar la boquilla. El mismo aviso se
  dispara si hay **residuo en la boquilla empujando la cama al sondear** o si se
  **toca y presiona la cama mientras sonda**; entonces aparece *"Enforcing the
  Z-calibration"* y el procedimiento se repite, hasta tres veces antes de cancelar la
  impresión (`mesh-bed-leveling:53, :75`). El mensaje en pantalla **no distingue entre
  las dos causas**, porque la fuente las enumera en la misma frase.

- **Compensación de imanes (solo malla 7×7 en bloques con PINDA).** *"3 of the 49 points
  are so close to magnets, that the reading can be off by as much as 80μm (microns)"*;
  la compensación ignora esos tres puntos y los calcula desde los vecinos; se recomienda
  dejarla activada (`mesh-bed-leveling:71`). Sondas por punto: **3 o 5** mediciones,
  promediadas (`mesh-bed-leveling:69`).

### Temperaturas

- **Temperatura consistente al nivelar.** Klipper: siempre la misma condición — fría o
  caliente — y esperar varios minutos tras alcanzarla (`probe-calibrate:103-105`). Esto es
  por el sesgo térmico del probe, no por la cama.

- **La chapa determina la temperatura de cama, y un slicer mal configurado la deja baja.**
  Bambu: *"The same material is usually printed at **different heatbed temperatures**
  depending on the build plate. Selecting the wrong build plate type may result in
  insufficient adhesion, because the heatbed temperature used for printing is too low."*
  (`first-layer-not-sticking:25`). La fuente no da cifras de temperatura para ninguna chapa.

- **En acero inoxidable / hotend recién tocado.** Bambu A1, para retensar, exige que el
  hotend esté **por debajo de 50 °C** (`a1-first-layer-too-low:61`). El manual menciona el
  hotend, no la cama; la cama no tiene cifra de nivelación documentada en estas fuentes.

- **Lo que no hay.** Ninguna de las fuentes de este lote da una temperatura de cama
  específica para hacer nivelación, ni la contrapone a otra. Solo la consistencia
  (`probe-calibrate:103`) y la dependencia del tipo de chapa del perfil
  (`first-layer-not-sticking:25`).

### Z-offset

- **Definición y dirección.** Si la boquilla queda demasiado alta, la causa de no
  pegar es *"Z-offset too high, the nozzle is too far from the bed, during the first
  layer."* (`warping-falling-off-collapsing:23, :69`).

- **Consecuencias de los dos extremos (Prusa, i3).** Demasiado lejos: la pieza no
  pega y se forma un *blob*; demasiado cerca: problemas de extrusión, atascos, mala
  calidad e incluso **daño a la chapa flexible** — *"This is not covered by Warranty."*
  (`first-layer-calibration-i3:51, :69`).

- **Chapa texturizada acerca la boquilla automáticamente.** Bambu: *"since the **Textured
  PEI Plate** has a granular surface, **the printer lowers the nozzle by 0,04 mm after
  heatbed leveling** to ensure first-layer adhesion"*; si se imprime en Textured PEI pero
  se elige otra chapa al laminar, la boquilla queda demasiado alta
  (`first-layer-not-sticking:25`). Cuatro límites del dato: es de la Textured PEI y de su
  superficie granular; es comportamiento automático del *printer* (sujeto "the
  printer", verbo "lowers"), no valor introducido a mano; el fallo explicado va en una
  sola dirección (boquilla alta); y el mecanismo es geométrico, no térmico.

- **Prusa corrobora la dirección, no la cifra.** Con la chapa texturizada *"you need to
  move the nozzle bit closer, but you are seeking the same results as with the smooth
  sheet"* (`first-layer-calibration-i3:85`). Los dos fabricantes dicen que la chapa
  texturizada acerca la boquilla; ninguno da cifra para la chapa contraria.

- **Nombre y valor.** Prusa usa el nombre **Live Z adjust** y lo da como rango
  orientativo *"from -0.400 to -1.500"*, con la advertencia de que *"is unique to each
  machine and means nothing without a visual reference"* y de que hay que **ajustar
  mirando, no por un valor fijo**; la capa del patrón es *"about 0.2 mm"*
  (`first-layer-calibration-i3:73, :93`). Comparado con el 0,04 mm de Bambu, **no es la
  magnitud de la misma cosa**: uno es un LCD de Prusa, el otro una compensación
  automática de Bambu, y ninguno se convierte al otro.

- **Cambio de chapa → readjuste.** En impresoras con PINDA, *"The live Z value needs to
  be **readjusted if you switch sheet type**"* (`smooth-steel-sheet:36`); el motivo es el
  grosor, y los perfiles *Steel sheet profiles* guardan hasta **ocho** perfiles por
  máquina, con un *Offset* sin calibración en la familia Mini/MK3.5
  (`first-layer-calibration-i3` vía adhesion cocinado, `steel-sheet-profiles`). La máquina
  **no detecta qué chapa está montada** y **no avisa de cambiar de perfil**; si no se
  cambia, se imprime con el offset de la anterior chapa
  (`smooth-steel-sheet:36`; `steel-sheet-profiles` citado en el cocinado de adhesión).

- **Cuándo recalibrar el Z-offset.** Prusa: *"every time there is a **major change in the
  assembly**"* (cambiar boquilla, upgrades del extrusor, cambios en un eje, mover la
  impresora) y *"the printers assembled in the Prusa factory are already fine-tuned and
  this calibration is needed only in case you build the kit version at home or change the
  nozzle"* (`first-layer-calibration-i3:43, :99`). Y Bambu A1: recalcular *Auto Bed
  Leveling* tras arreglar tornillos (*a1-first-layer-too-low:96*).

- **Prohibido calibrar midiendo la capa.** Prusa: *"**measuring the printed layer with
  calipers is not a recommended method to calibrate the first layer**"*
  (`first-layer-calibration-i3:93`).

- **Chapa texturizada y el patrón de prueba.** Para la chapa texturizada hay que acercar
  algo la boquilla y buscar el mismo resultado; si queda muy bajo, *"the filament can
  start curling up around the edges like it is not adhering"* (`first-layer-calibration-i3:85`).
  **AVISO DE ALCANCE:** ese *«curling up»* describe el **cuadrado final del patrón de
  prueba**, no una pieza impresa; es el síntoma de boquilla demasiado baja y es el
  inverso del de la esquina levantada (que Prusa asocia a boquilla demasiado lejos).
  No se traduce a pieza impresa.

### Cuándo nivelar manual

- **Sonda no repetible (>25 µm)** → usar las herramientas manuales de Klipper en vez
  del probe (`probe-calibrate:81, :83`).
- **Sesgo por ubicación (>25 µm entre puntos)** → alternativas manuales
  (`probe-calibrate:97`).
- **Sonda que toca la cama o se atasca** → revisar residuo; si tras tres intentos sigue,
  cancela el trabajo (`mesh-bed-leveling:53, :75`).
- **Cama con inclinación mecánica** → `Z_TILT_ADJUST` / `QUAD_GANTRY_LEVEL` etc.
  invalida la calibración del probe y obliga a repetirla (`probe-calibrate:55-57`).
- **Pieza con anchura de línea irregular a lo largo de la misma línea** → corrección
  de nivelado de cama (`first-layer-calibration-i3:105`).
- **Fix mecánico preliminar.** Si la nivelación anterior fallaba y el problema persiste,
  Bambu A1 propone retensar los cuatro tornillos M2×6 del heater assembly y el clip,
  estando el hotend por debajo de 50 °C, y **recalcular Auto Bed Leveling** después
  (`a1-first-layer-too-low:57-96`).
- **No es una obligación por impresión en Prusa.** Factory-assembled ya viene afinado;
  se repite por cambios de montaje o de ubicación (`first-layer-calibration-i3:43, :99`).

## Contradicciones

### Frecuencia: ¿nivelar es raro o es crítico?

- "In some rare cases, the bed leveling from previous calibrations might be
  inaccurate..." — [Bambu Lab](https://wiki.bambulab.com/en/knowledge-sharing/first-layer-not-sticking)
  (`first-layer-not-sticking:41`)
- "It is crucial to perform heat bed leveling, particularly when changing or
  replacing the build plate" — [Bambu Lab](https://wiki.bambulab.com/en/a1-mini/troubleshooting/print-issues-troubleshooting)
  (`a1-first-layer-too-low:36-49`)
- "if you still experience uneven first layer adhesion, you can increase the density to
  7x7" — [Prusa Research](https://help.prusa3d.com/article/mesh-bed-leveling_112163)
  (`mesh-bed-leveling:67`)

**Se contradicen aparentemente.** Las tres pueden ser ciertas según el caso: la primera
habla de **frecuencia** en uso estable (caso raro, adhesión inconsistente); la
segunda de un **cambio de hardware/plate** (discrepancia respecto al nivelado
anterior); la tercera de un **síntoma visual concreto** (adhesión irregular) que pide
malla más densa. **El redactor tiene que mantener las tres palabras tal como las
escribe la fuente (rare / crucial / uneven) y no convertir ninguna en regla general.**

### Qué tan importante es el acuerdo de temperatura para la malla

- "run the bed leveling tools at a consistent temperature ... wait several minutes
  after the desired temperature is reached" — [Klipper](https://www.klipper3d.org/Probe_Calibrate.html)
  (`probe-calibrate:103-105`)
- "The same material is usually printed at different heatbed temperatures depending on
  the build plate ... selecting the wrong build plate type may result in insufficient
  adhesion, because the heatbed temperature used for printing is too low"
  — [Bambu Lab](https://wiki.bambulab.com/en/knowledge-sharing/first-layer-not-sticking)
  (`first-layer-not-sticking:25`)

**Se contradicen en foco, no en valor.** Klipper pone la condición de **consistencia**
sobre el probe; Bambu pone la **dependencia del tipo de chapa** sobre la cama. Las dos
hablan de temperatura y ninguna da cifra para nivelar. **El redactor tiene que decir
las dos cosas sin elegir una: la consistencia importa al sensor y el tipo de chapa
importa a la cama.**

### Temporal vs definitivo: ajustar el offset a mano

- Rango `G29.1 Z{xxx}` (texture -0,02~0 mm; non-texture -0,01~0,01 mm) con aviso de
  que es **fix temporal** y que crea defectos locales — [Bambu Lab](https://wiki.bambulab.com/en/a1-mini/troubleshooting/print-issues-troubleshooting)
  (`a1-first-layer-too-low:100-120`)
- "measuring the printed layer with calipers is **not a recommended method**" y
  ajustar mirando, no por valor fijo — [Prusa Research](https://help.prusa3d.com/article/first-layer-calibration-i3_112364)
  (`first-layer-calibration-i3:93`, `:47, :73`)
- Auto compensación de 0,04 mm en Textured PEI, sin intervención del usuario
  — [Bambu Lab](https://wiki.bambulab.com/en/knowledge-sharing/first-layer-not-sticking)
  (`first-layer-not-sticking:25`)

**Se contradicen en filosofía.** Bambu A1 ofrece un ajuste numérico temporal con
rangos; Prusa prohíbe calibrar midiendo y propone ajustar visualmente; Bambu, en
paralelo, resuelve el caso texturizado sin que el usuario introduzca número. **El
redactor tiene que explicar que una es mitigación temporal, otra es método de
calibración y la tercera es compensación automática; no son tres formas de hacer lo
mismo.**

### Unidades que no se convierten entre fabricantes

- "common range is from **-0.400 to -1.500**" (LCD i3, por máquina, sin referencia
  visual inútil) — [Prusa Research](https://help.prusa3d.com/article/first-layer-calibration-i3_112364)
  (`first-layer-calibration-i3:73`)
- "the printer lowers the nozzle by **0.04 mm** after heatbed leveling" (auto, Textured
  PEI) — [Bambu Lab](https://wiki.bambulab.com/en/knowledge-sharing/first-layer-not-sticking)
  (`first-layer-not-sticking:25`)
- "-0.02 mm ~ 0 mm" / "-0.01 ~ 0.01 mm" (G29.1 temporal, A1)
  — [Bambu Lab](https://wiki.bambulab.com/en/a1-mini/troubleshooting/print-issues-troubleshooting)
  (`a1-first-layer-too-low:106-107`)

**Se contradicen en magnitud aparente.** Son cifras de sistemas distintos
(LCD de Prusa, compensación automática de Bambu, parche G-code de A1) y ninguna
fuente las relaciona. **El redactor no puede promediarlas ni convertirlas.** Comparar
solo el sentido: ambos fabricantes que tocan chapa texturizada acercan la boquilla.

## Sin respaldo

- **Rejilla 4×4 para MINI y 3×3/7×7 para la familia PINDA** aparecen una sola vez, en
  la página de Prusa, y **no se generalizan** a otras máquinas ni se corroboran con
  otros fabricantes. **[UNA SOLA FUENTE — Prusa, primaria]**
- **LoadCell mide dentro del área de impresión** sin tamaño de rejilla ni opciones de
  menú; no se da densidad equivalente para MK4/XL. **[UNA SOLA FUENTE — Prusa,
  primaria]**
- **Compensación de imanes ±80 µm en 3/49 puntos** y **Z-probe 3 o 5 mediciones**
  solo para bloques con PINDA y malla 7×7. **[UNA SOLA FUENTE — Prusa, primaria]**
- **Umbral 25 µm de repetibilidad y 5 µm normales** en el probe (Klipper):
  ningún otro crudo del lote da cifra comparable; el crudo de Prusa no evalúa la
  repetibilidad del probe. **[UNA SOLA FUENTE — Klipper, primaria]**
- **Sesgo térmico / por ubicación del probe** provienen solo del documento de
  Klipper. **[UNA SOLA FUENTE — Klipper, primaria]**
- **Rango `G29.1 Z`** y el carácter temporal del fix solo se documentan en el crudo
  de Bambu para la serie A1; no hay corroboración para otras series. **[UNA SOLA
  FUENTE — Bambu A1, primaria]**
- **"Some rare cases"** para la nivelación como causa: frecuencia cualitativa sin
  definición; no cuantificada por Bambu ni por otros. **[UNA SOLA FUENTE — Bambu,
  primaria]**
- **0,04 mm de compensación automática solo para Textured PEI**, por superficie
  granular; Bambu no documenta compensación equivalente para otras chapas.
  **[UNA SOLA FUENTE — Bambu, primaria]**
- **"Live Z adjust" como rango -0.400…-1.500** y el *"curling up around the edges"
  like it is not adhering* son del crudo de calibración del i3, y describen el
  **patrón de prueba**, no una pieza impresa. **[UNA SOLA FUENTE — Prusa i3,
  primaria]**
- **"Nivelación no es un problema frecuente"** (Bambu) no debe sobreescribir el caso
  *"crucial al cambiar de chapa"* (Bambu A1); las dos vienen del mismo fabricante pero
  de páginas distintas. **[MATIZ PENDIENTE DE CORROBORACIÓN]**
- Este fichero **no declara campo del artículo**: no publica un valor numérico de
  cama propio, y cualquier cifra de temperatura sigue perteneciendo a
  `[[temperatura-cama]]`. El único número documentado aquí es la compensación de
  0,04 mm y los rangos temporales de A1.

## Tirado

- **Cabeceras y mobiliario de página:** *"Relevant for"*, *"50 comments"*, lista de
  idiomas, `[imagen: ]` sin `alt` en el crudo de Prusa mesh; se conserva el texto y
  se descartan las imágenes por carecer de descripción. (6 imágenes en `a1-first-layer-too-low`,
  más las de Bambu.)
- **Repetición entre fuentes.** La afirmación sobre residuo en la boquilla como
  condición previa a nivelar viene **tres veces** (Bambu `first-layer-not-sticking:43`,
  Prusa `mesh-bed-leveling:53` y `:75`); se conserva la de Bambu como orden de
  comprobación y las de Prusa como mecanismo/correlación.
- **Repetición de Bambu sobre el 0,04 mm y el tipo de chapa** (el mismo fragmento
  aparece también en `warping-pla-bambu-wiki-printed-model-warping.md`); se cita una
  vez.
- **Navegación interna no descargada:** *"P.I.N.D.A./SuperPINDA Sensor testing"*,
  *"M.I.N.D.A./SuperPINDA sensor testing (MINI/MINI+)"*, *"Bed Level Correction"* y
  la *"Material table"* de Prusa quedan como nombres sin contenido.
- **Lo que no se ha procesado** por no existir en `wiki/raw/`:
  `wiki/raw/malla-de-cama-*.md`. Este fichero se cocinó a partir de los siete
  crudos del frontmatter, seleccionados por cubrir malla/sensor/probe/Z-offset/nivelación
  manual. **Un tema "malla de cama" con fuentes dedicadas podría añadir sensor
  inductivo/BLTouch/CR Touch fuera de Klipper y el menú de otros fabricantes.**
- **Fuera de alcance por decisión de brief:** los fallos de extrusión
  (`under-extrusion`), las temperaturas de boquilla por boquilla especial y los
  ajustes de slicer quedan en `[[adhesion-primera-capa]]` y `[[temperatura-hotend]]`;
  este fichero solo los menciona para separarlos.

## Relaciones

| Concepto | Se relaciona con | Cómo |
|---|---|---|
| malla de cama | warping en PLA | la malla sigue una cama ligeramente combada, pero no corrige un warping por contracción del material ni un offset demasiado alto |
| malla de cama | adhesión a la cama | recurso cuando la adhesión es **irregular**; no cuando la pieza no pega en absoluto ni cuando se levanta una esquina |
| malla de cama | Z-offset | la malla mide la forma de la cama; el Z-offset fija la distancia boquilla-cama; son dos parámetros independientes |
| malla de cama | adhesion-primera-capa | el crudo compartido `mesh-bed-leveling` ya está cocinado en `adhesion-primera-capa.md`; aquí se reutiliza sin duplicar |
| sensor / probe | temperatura ambiente/impresión | sesgo térmico: nivelar siempre a la misma temperatura y esperar minutos |
| Z-offset | cambio de chapa | live Z se readapta al cambiar de chapa en máquinas PINDA (grosor diferente) y la máquina no detecta cuál hay montada |
| Z-offset | Textured PEI | acerca la boquilla automáticamente (0,04 mm) o a mano (A1); el sentido es el mismo en los dos fabricantes que lo tocan |
| nivelación manual | sensor / probe | si el probe no es repetible (>25 µm) o tiene sesgo por ubicación, usar herramientas manuales |
| malla automática | nivelación manual | la automática compensa la forma de la cama; la manual corrige tornillos, ejes y hotend suelto; se complementan |
| malla de cama | placas (chapas) | el tipo de chapa seleccionado en el slicer determina temperatura de cama y offset |
<|end|> malla de cama | temperatura-cama | no se documenta temperatura específica para nivelar; solo consistencia y dependencia del tipo de chapa |
| malla de cama | capas-desplazadas | `bed_mesh` / `bed_tilt` son movimientos no comandados del Z que afectan a los motores (Klipper) |
