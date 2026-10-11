---
titulo: Warping en PLA
tema: warping-pla
fuentes:
  - wiki/raw/warping-pla-bambu-wiki-warping-falling-off-collapsing.md
  - wiki/raw/warping-pla-bambu-wiki-printed-model-warping.md
  - wiki/raw/warping-pla-prusa-knowledge-base-warping.md
  - wiki/raw/warping-pla-prusa-forum-adjusting-settings-warping-pla.md
  - wiki/raw/warping-pla-prusa-forum-warping-at-corners.md
  - wiki/raw/temperatura-cama-prusa-kb-filament-material-guide.md
  - wiki/raw/temperatura-cama-bambu-wiki-filament-guide-material-table.md
  - wiki/raw/temperatura-cama-prusa-kb-pla.md
  - wiki/raw/temperatura-cama-orcaslicer-wiki-material-temperatures.md
cocinado: 2026-10-04
---

# Warping en PLA

## Afirmaciones

### Causa

- El warping es contracción térmica. Los bordes exteriores de la pieza se enfrían
  antes que el centro, y esa diferencia genera una tensión que levanta las esquinas.
  — [Bambu Lab, warping-falling-off-collapsing](https://wiki.bambulab.com/en/filament-acc/filament/print-quality/warping-falling-off-collapsing)
- La causa inmediata son las contracciones de las tiradas largas de filamento.
  — [Diem, foro de Prusa](https://forum.prusa3d.com/forum/how-do-i-print-this-printing-help/warping-at-corners/)
- Es un choque térmico entre la temperatura de fusión de la boquilla y la
  ambiente. — [Prusa Research, Knowledge Base](https://help.prusa3d.com/article/warping_2011)

### De qué depende

- **Ranking de riesgo de warping entre los filamentos que la fuente llama propensos a
  contraerse.** Bambu los ordena así, de mayor a menor:
  **PC → PA-CF → PA → ABS → ASA → PETG → PLA**, y añade que para piezas grandes y
  planas conviene elegir PLA, PLA-CF, PETG o PETG-CF cuando sea posible.
  — [Bambu Lab, warping-falling-off-collapsing](https://wiki.bambulab.com/en/filament-acc/filament/print-quality/warping-falling-off-collapsing)
  **LO QUE ESTE RANKING NO ES**, porque ya se ha usado como si lo fuera: es un orden
  entre **esos siete** filamentos y no una comparación con todos los materiales
  rígidos, y no dice nada sobre la frecuencia de las causas del warping en PLA.
  **De aquí no sale "PLA es el material rígido que menos se deforma"** —dicho así
  abarca materiales que la lista no contiene—, ni **"el problema casi nunca es el
  filamento: es cómo está configurado"**. Lo segundo es un diagnóstico, y un
  ranking de riesgo no diagnostica.
- **Y en esa misma fuente hay un caso donde el material sí decide**, que es el
  contraejemplo a la lectura automática del ranking: *«Large flat models printed
  in ABS, ASA, or PC will almost always warp without an enclosure. If an enclosure
  is not available, switch to PLA, PLA-CF, PETG, or PETG-CF for large prints»*.
  — [Bambu Lab, warping-falling-off-collapsing](https://wiki.bambulab.com/en/filament-acc/filament/print-quality/warping-falling-off-collapsing)
- Y la misma página avisa de una confusión que va en el otro sentido: *«it's easy to
  mistake warping for an extrusion or flow problem»*. Un defecto de extrusión o de
  flujo **puede** ser en realidad warping, no al revés.
  — [Bambu Lab, warping-falling-off-collapsing](https://wiki.bambulab.com/en/filament-acc/filament/print-quality/warping-falling-off-collapsing)
- El tamaño cuenta: los warping aparecen más en piezas grandes. El literal es *«This is
  more common with larger prints»*, y está en el párrafo de la causa del warping de
  esquinas, junto con la densidad de relleno y los materiales que se contraen.
  — [Bambu Lab](https://wiki.bambulab.com/en/filament-acc/filament/print-quality/warping-falling-off-collapsing)
  **LO QUE ESTE DATO NO ES, y que ya se ha usado como si lo fuera: un diagnóstico que
  manda a otro ajuste.** «Si a tu PLA sólo se le levantan las piezas grandes, el tamaño
  ya está haciendo su parte y el ajuste va en otro lado» es una **inferencia del
  artículo**, no de ninguna fuente, y además apunta **en contra de la tabla de la misma
  página**, que prescribe ajustes precisamente para ese caso: `Corners lifting — PLA →
  Bed temperature → Increase by + 5 to 10 °C` (:129–133) y `Large flat model warping →
  Infill pattern + density → Switch to Gyroid at ≤25 %` (:162–169). Si el redactor usa
  el razonamiento, va **marcado como criterio del artículo**, igual que la hipótesis de
  chaflán y radio de arriba, y **no puede empujar a saltarse los pasos 3 y 5**, que son
  los que la fuente da para piezas grandes y planas.
  — [Bambu Lab](https://wiki.bambulab.com/en/filament-acc/filament/print-quality/warping-falling-off-collapsing)
- La geometría cuenta: las esquinas vivas de 90° concentran más tensión que las
  redondeadas. En el hilo de Prusa, el consejo es textual: *«Sharp angles can be more
  prone to warping»*, y la solución que propone es añadir un **redondeo
  (filleted edge) en el eje Z**, que aumenta el contacto con la cama.
  — [Lichtjaeger, foro de Prusa](https://forum.prusa3d.com/forum/original-prusa-i3-mk3s-mk3-how-do-i-print-this-printing-help/adjusting-settings-for-warping-of-pla/)
- **El chaflán del caso de 2019 se hizo en el modelo, en Fusion.** Quien cerró el
  hilo lo dice literal: *«I increased the bed temperature and **chamfered the
  edges of the shape in Fusion**»*. **Lo único que dice el literal es que el chaflán
  se lo hizo a la forma, en Fusion, que es un programa de CAD.**
  — [Zakalawe, foro de Prusa](https://forum.prusa3d.com/forum/original-prusa-i3-mk3s-mk3-how-do-i-print-this-printing-help/adjusting-settings-for-warping-of-pla/)
  **LO QUE EL HILO NO DOCUMENTA, y que no se escribe:** ninguna capacidad ni
  limitación de un laminador concreto. **No hay en `wiki/raw/` ninguna fuente que
  diga qué operaciones de chaflán trae un laminador**, así que "el laminador sólo
  trae chaflán de esquina y no de arista" y "quien intente replicarlo allí no puede"
  son inventados. Tampoco dice el hilo que el chaflán sea "un paso antes de
  exportar": dice **dónde** lo hizo, no dónde va en el flujo de trabajo. Y cambió
  **dos** variables a la vez, cama y chaflán, sin decir con qué valor de cama quedó.
- **Radios de 3 mm: son de otro hilo y de otra persona.** En «Warping at corners»
  (2024, cinco años y un hilo después) quien abrió el tema cuenta: *«I tried to round
  off the 90°-corners with 3mm radii **but the crinkles remained**»*, más perímetros
  extra, sin efecto. **Ningún caso prueba que los radios fallen y el chaflán funcione**,
  porque no están en la misma conversación ni en la misma pieza.
  — [Elias Spors, foro de Prusa](https://forum.prusa3d.com/forum/how-do-i-print-this-printing-help/warping-at-corners/)
  **INFERENCIA, si al redactor le sirve:** chaflán y radio atacan la misma esquina
  por el mismo mecanismo, así que es razonable esperar resultados parecidos. Es una
  deducción a partir de las dos afirmaciones, **no un dato que diga ninguna fuente**, y
  las dos van además sobre piezas y geometrías distintas. Si se usa, va marcada.
- Por debajo de **20 °C de ambiente**, el warping aparece incluso con PLA y PETG,
  que son los materiales más indulgentes. — [Bambu Lab](https://wiki.bambulab.com/en/filament-acc/filament/print-quality/warping-falling-off-collapsing)
- Una corriente de aire enfría un lado más que otro. Basta una ventana abierta, un
  aire acondicionado o un ventilador de mesa. — [Bambu Lab](https://wiki.bambulab.com/en/filament-acc/filament/print-quality/warping-falling-off-collapsing), [Prusa Research](https://help.prusa3d.com/article/warping_2011)

### Cómo distinguirlo de otro fallo

- **Warping real:** arquea la pieza hacia arriba desde la cama, lo que comprime las
  capas y suele dejar superficie rugosa arriba. Es el criterio que Neophyl escribe en
  el hilo de las fotos: *«Warping corners is when it bows upwards from the bed… This
  causes compression of the layers and usually a rough surface on the top»*.
  — [Neophyl, foro de Prusa](https://forum.prusa3d.com/forum/how-do-i-print-this-printing-help/warping-at-corners/)
- **Un caso concreto del mismo hilo, que NO es la definición de todas las
  separaciones entre capas.** Leyendo **unas fotos concretas** de unas esquinas
  arrugadas, Neophyl escribe que *«those pics just look like the under extrusion and
  gaps at the seams caused by the recent firmware/prusa slicer changes»*, y
  enlaza los hilos del foro y el issue
  [PrusaSlicer #11914](https://github.com/prusa3d/PrusaSlicer/issues/11914).
  Es una lectura de fotos —*"just look like"*— dentro de un caso: **no establece que
  la deslaminación tenga base plana y superficie superior normal**, ni que la
  produzcan los cambios de firmware o de PrusaSlicer. Esas causas están
  documentadas en otro sitio, en `wiki/cooked/separaciones-entre-capas.md`, y allí
  también hay causas térmicas, de ventilación y de flujo. **La categoría se conserva;
  lo que se acota es la columna.**
  — [Neophyl, foro de Prusa](https://forum.prusa3d.com/forum/how-do-i-print-this-printing-help/warping-at-corners/)
- **Ni siquiera está cerrado que aquel caso fuera eso y no warping.** Diem matiza en
  el mismo hilo: *«there is very little first-layer corner distortion… however there
  is enough top surface effect to suggest some warping is involved… It may well be
  compounded by other factors»*. Es decir, warping y junta iban juntos en ese caso.
  — [Diem, foro de Prusa](https://forum.prusa3d.com/forum/how-do-i-print-this-printing-help/warping-at-corners/)

### Qué se ha probado y funciona

**Esta lista es un orden del redactor, no el de Bambu.** Existe para que el artículo
tenga una secuencia, y su orden **no** coincide con el de la fuente. La fuente tiene
dos listas distintas, y la del 80 % es la segunda.

Los ajustes que el corpus respalda, sin que eso implique que sea el orden de nadie:

1. **Limpiar la chapa con agua templada y jabón.** Enjuagar, secar al aire y no
   tocar la superficie con las manos desnudas después de limpiar. El aceite de la piel
   es, textual, *«the #1 cause»* — con el alcance bien puesto: la fuente lo lista
   bajo **Bed Adhesion Failure**, no bajo *Corner Warping*, y son dos tipos de fallo
   que ella misma separa.
   — [Bambu Lab, warping-falling-off-collapsing](https://wiki.bambulab.com/en/filament-acc/filament/print-quality/warping-falling-off-collapsing)
2. **No cooling durante las 3 primeras capas.** *«One of the most important setting
   to change when it comes to warping is the No cooling for the first X layers
   option»*, con las tres primeras capas sin enfriamiento en los filamentos habituales.
   — [Bambu Lab, printed-model-warping](https://wiki.bambulab.com/en/knowledge-sharing/printed-model-warping)
3. **Subir la temperatura de cama**, +5 a +10 °C según Bambu. La cifra concreta
   depende de la chapa y del fabricante, y está en la tabla de abajo y en la
   contradicción 1.
   — [Bambu Lab, warping-falling-off-collapsing](https://wiki.bambulab.com/en/filament-acc/filament/print-quality/warping-falling-off-collapsing)
4. **Añadir un brim**, de 8 a 10 mm de ancho, o mejor **brim ears** dirigidos sólo a
   las esquinas que se levantan.
   — [Bambu Lab, warping-falling-off-collapsing](https://wiki.bambulab.com/en/filament-acc/filament/print-quality/warping-falling-off-collapsing)
5. **Cambiar el patrón de relleno a Gyroid** con el 25 % de densidad como techo. La fuente
   lo escribe con su comparador literal: «Switch to Gyroid at ≤25 %». Grid y
   Triangle crean tensión lineal interna.
   — [Bambu Lab, warping-falling-off-collapsing](https://wiki.bambulab.com/en/filament-acc/filament/print-quality/warping-falling-off-collapsing)

### El 80 % pertenece a otra lista, y esa lista no es la de arriba

Bambu publica un **Tier 1** de tres pasos, y es a **esos tres** a los que atribuye
la cifra:

> *«These three steps resolve approximately 80 % of all warping and adhesion failures. Do all three before touching any slicer settings.»*

1. **Clean the build plate** — lavar con agua templada y jabón, enjuagar a fondo y
   secar al aire. (:108–110)
2. **Run Automatic Bed Levelling** — la calibración completa, especialmente después
   de mover la impresora, hacer mantenimiento o actualizar el firmware. (:112–114)
3. **Check if the nozzle is installed correctly** — los clips deben estar fijados en
   la forma correcta, para que no estén sueltos. (:116–117)

— [Bambu Lab, warping-falling-off-collapsing](https://wiki.bambulab.com/en/filament-acc/filament/print-quality/warping-falling-off-collapsing)

**Lo que no se puede hacer con esa cifra:** colgarla de una lista de ajustes que no
es la suya. En el Tier 1 **no aparece el ventilador**, y no aparecen ni el brim ni la
cama. La limpieza sí aparece en las dos listas —Bambu la pone también en *Quick
Fixes* para *Corner lifting / Warping* (:16–19)—, pero que un paso esté en dos
listas no convierte a la otra en el Tier 1. Y la página tiene además un cuarto punto
marcado como *Advanced method - Adjust the First Layer* (:119–123), así que "tres
pasos" son tres y no cuatro.

### La temperatura de cama que dan los fabricantes

Estas cifras no estaban en las cinco fuentes de este tema. Vienen de las tablas de
materiales, que estaban en `wiki/raw/` y se leían bien. Ver `wiki/cooked/temperatura-cama.md`.

- **Prusa Research** da para el PLA **50–60 °C de cama** y 185–235 °C de boquilla, sin
  pedir enclosure, drybox ni boquilla endurecida. — [Prusa Research](https://help.prusa3d.com/filament-material-guide)
- **Bambu Lab**, por filamento y pegamento: PLA y PLA-CF **35 – 65 °C**.
  — [Bambu Lab](https://wiki.bambulab.com/en/general/filament-guide-material-table)
- **Bambu Lab**, por filamento y **chapa**, que es una segunda tabla de la misma
  página: la fila del PLA es `35 – 45 ℃ | 45 – 65 ℃ | 45 – 65 ℃ | 45 – 65 ℃` para
  Cool Plate, Engineering Plate, Smooth PEI y Textured PEI. La Engineering Plate
  lleva *«Glue Required»** en esa fila.
  — [Bambu Lab](https://wiki.bambulab.com/en/general/filament-guide-material-table)
  **La diferencia entre chapas no es un número fijo, y hay que decir qué extremos se
  comparan.** En esa fila, en el extremo **bajo**, 35 contra 45 son **10 °C**; en el
  extremo **alto**, 45 contra 65 son **20 °C**. Cualquier redacción que diga "la
  diferencia entre chapas es de veinte grados", o de treinta, o de diez, sin declarar
  los extremos que compara, se está inventando una constante que la fila no tiene.
- **Y la página de warping da una tercera cifra que no es el mismo intervalo:** al
  hablar del tipo de chapa, escribe *«If you slice for the Cool Plate (35 °C for
  PLA) but print on the Textured PEI Plate (needs 55–65 °C for PLA), the adhesion
  temperature will be far too low»*, y en su tabla de ajustes, *«Target 55 – 65 °C on
  Textured PEI»*. Los **55–65 °C son un objetivo de troubleshooting**, una ventana
  más estrecha **dentro** del 45–65 de la tabla general: el objetivo y el intervalo
  recomendado no son lo mismo, y no hay que intercambiarlos.
  — [Bambu Lab, warping-falling-off-collapsing](https://wiki.bambulab.com/en/filament-acc/filament/print-quality/warping-falling-off-collapsing)
- La tabla de Prusa **sí tiene columna de chapa, y son seis**: *«The table also has a
  SHEETS group of six columns and a PHYSICAL FEATURES group of four. The SHEETS column
  headers are: Textured, Smooth PEI, Satin, Special PA Nylon, PP, HT»*.
  — [Prusa Research](https://help.prusa3d.com/filament-material-guide)
  **El motivo por el que no se publica es la desalineación del contenido, no la ausencia
  de la columna.** En varias filas los valores no caen bajo su cabecera —en PETG,
  *«with glue stick»* queda bajo Smooth PEI pero *«Cleaned with water»* no se sabe si es
  Satin o Special PA Nylon—, y atribuir mal un valor a una chapa es peor que no
  atribuirlo. Eso está en las notas del recolector del fichero crudo
  (`:65-69`), no en el cuerpo de la página.
  **La conclusión no cambia: de Prusa no se puede decir nada por chapa.** El 50–60 °C
  del PLA sale de la columna de temperaturas, que no está condicionada a ninguna chapa;
  las seis de chapas no son publicables, y quien necesite esa columna que vaya a la ficha
  del material.
- Los rangos **no llevan tolerancia** en Prusa; Bambu sí pone ±10 °C en la tabla de
  boquilla. La diferencia de notación es de la fuente, no del material.
  — [Prusa Research](https://help.prusa3d.com/filament-material-guide), [Bambu Lab](https://wiki.bambulab.com/en/general/filament-guide-material-table)

Y el fallo de chapa no se paga sólo en temperatura. Si se laminó para la Cool Plate
(35 °C) y se imprime en la Textured PEI, la adhesión sale demasiado fría; y la Textured
PEI **baja la boquilla 0,04 mm automáticamente al nivelar**, así que elegir el tipo de
chapa equivocado en el slicer desactiva ese offset y deja la primera capa demasiado
alta. Son los dos síntomas del mismo error de una línea.
— [Bambu Lab](https://wiki.bambulab.com/en/filament-acc/filament/print-quality/warping-falling-off-collapsing)

### Filamento húmedo no es warping

- Si durante la impresión se oyen chasquidos o chisporroteo, o la superficie sale
  rugosa, con burbujas o filamentos sueltos, el filamento ha absorbido humedad del
  aire. Lo que la fuente dice es *«Dry the filament before retrying»*: **secar y
  reintentar**. **No menciona la temperatura en ninguna dirección**, así que ni
  «cambiar la temperatura no lo arregla» ni su contrario se escriben: la fuente no
  enuncia ninguna imposibilidad térmica.
  — [Bambu Lab](https://wiki.bambulab.com/en/filament-acc/filament/print-quality/warping-falling-off-collapsing)
- El almacenamiento sale de la misma página: guardar el filamento sin usar en bolsas
  selladas o recipientes herméticos con sobres de gel de sílice desecante. La fuente
  añade que el nailon y el PC absorben humedad en horas en un ambiente húmedo, y que
  no hay que dejarlos en el portabobinas toda la noche.
  — [Bambu Lab](https://wiki.bambulab.com/en/filament-acc/filament/print-quality/warping-falling-off-collapsing)

### El hilo de 2019, con el antes y el intento de después

Hay un hilo —«Adjusting settings for warping of PLA», del 27 al 30/06/2019— donde está
documentado **el antes y el intento de después**, y es el más útil del lote porque
muestra **qué no funcionó**. **El nombre del caso no afirma resolución**: lo que sigue
al antes es un intento, dicho por quien lo hizo con un *"that seemed to"*, con dos
variables movidas y sin la temperatura final publicada. Los tres límites van
desarrollados en el tercer punto.

- Con cama a **50 °C** y luego a **40 °C**, más brim, la pieza se curvaba tanto que
  se separaba del brim. Ambiente a unos 20 °C. PEI lisa. Escribió que ya había
  probado el brim, la cama más baja y la velocidad, y que *"none of which helped so
  far"*; que lo que le proponía Google era justo eso.
  — [Zakalawe, foro de Prusa](https://forum.prusa3d.com/forum/original-prusa-i3-mk3s-mk3-how-do-i-print-this-printing-help/adjusting-settings-for-warping-of-pla/)
- La respuesta fue la contraria: *«You should set your bed temperature higher and not
  lower (max 65°C)»*. Ese 65 °C es **el techo que un usuario le pone a otro en un
  hilo**, no un valor de fabricante. Y del hueco del brim, Lichtjaeger lee que la
  primera capa puede ir más baja: es **su** lectura de una foto, no una medición.
  — [Lichtjaeger, foro de Prusa](https://forum.prusa3d.com/forum/original-prusa-i3-mk3s-mk3-how-do-i-print-this-printing-help/adjusting-settings-for-warping-of-pla/)
- El desenlace, textual: *«Thanks, **I increased the bed temperature and chamfered the
  edges of the shape in Fusion**, that seemed to make a big difference»*.
  **Tres cosas que este desenlace no dice**, y por eso no puede redactarse como
  resultado:
  1. **Cambió dos variables a la vez** —cama y chaflán—, y nadie en el hilo midió
     cuál de las dos hizo el trabajo.
  2. **No dijo con qué valor de cama acabó.** El 65 °C del punto anterior es el
     consejo de Lichtjaeger, no el valor que Zakalawe puso. El hilo no lo publica.
  3. **Es una impresión, no un resultado medido**: su propio *«that seemed to»*. No
     hay detrás ni una medición ni una segunda impresión de control.
  — [Zakalawe, foro de Prusa](https://forum.prusa3d.com/forum/original-prusa-i3-mk3s-mk3-how-do-i-print-this-printing-help/adjusting-settings-for-warping-of-pla/)
- Lo que **sí** se puede decir del hilo, porque lo cuenta él: bajar la temperatura de
  cama es de lo primero que se probó en ese caso, y no funcionó.

### Cuatro fallos que no son warping de esquinas

El corpus separa cuatro cosas, cada una con su fuente y su alcance, y el artículo tiene
que atribuirlas por separado:

- **Voladizos inclinados y piezas pequeñas.** Prusa: *«If steep overhangs and small
  parts of your print are warping, you may try enabling the print fan at low speeds
  (10-20%) even for materials that do not require a lot of print-cooling such as ABS
  or PC-Blend»*. Lo que Prusa **no** dice, y por eso no se escribe: **ni hacia qué
  lado se curva el voladizo, ni que la causa sea el enfriamiento**. La fuente pone
  una condición y un ajuste, y nada más.
  — [Prusa Research](https://help.prusa3d.com/article/warping_2011)
- **Colapso de piezas altas y finas: es mecánico, no es contracción.** Bambu lo
  cataloga aparte como *Failure Type 3, Structural Collapse*, con causa mecánica o de
  adhesión: la boquilla tumba un modelo alto y fino por vibración a alta velocidad,
  las correas flojas dan holgura al cabezal, y los patrones de relleno que se cruzan
  levantan un bump que la boquilla roce en la siguiente pasada. Los ajustes que da
  para **ese** fallo son reducir **velocidad y aceleración un 20–30 %**, **habilitar
  soportes** para modelos altos o finos y comprobar la tensión de las correas.
  — [Bambu Lab, warping-falling-off-collapsing](https://wiki.bambulab.com/en/filament-acc/filament/print-quality/warping-falling-off-collapsing)
- **La boquilla contra el relleno es una fila distinta**, con su propio motivo
  mecánico: *«Nozzle hitting / scraping the print → Slow infill speed; switch to Line,
  Rectilinear, Gyroid, or Concentric»*, y la explicación es que Grid y Triangle se
  cruzan dentro de una capa y levantan un bump. Es el mismo bump que produce el
  colapso, y además es una fila distinta: **tampoco es warping de esquinas**.
  — [Bambu Lab, warping-falling-off-collapsing](https://wiki.bambulab.com/en/filament-acc/filament/print-quality/warping-falling-off-collapsing)
- **PC-Blend, y sólo eso, es de Prusa: bajar la velocidad.** *«Decrease the print
  speed. This may help a lot with high-warping materials. Although Prusament
  PC-Blend is low-warping compared to other PC-Blend filaments, decreasing the print
  speed will help your part as a whole to settle down, melt individual layers together
  properly and warp less.»* Es un consejo para materiales de alta temperatura y para
  un filamento concreto. **En ese párrafo no aparecen la aceleración ni los soportes,
  y no es PLA.** PC-Blend es policarbonato.
  — [Prusa Research](https://help.prusa3d.com/article/warping_2011)

**Las dos atribuciones no se encadenan.** Bambu es quien dice "baja velocidad y
aceleración, añade soportes", y es para el **colapso** de piezas altas. Prusa es quien
dice "baja la velocidad", y es para **PC-Blend** y materiales que se deforman mucho.
Que las dos hablen de bajar la velocidad no convierte el protocolo de Bambu en algo
que Prusa corrobore entero, y **ninguna de las dos fuentes lo aplica al warping de
esquinas en PLA**.

## Contradicciones

**No se resuelven aquí.** Se anotan con su matiz, y el redactor tiene que explicar
el matiz en el artículo en vez de elegir un número.

### 1. La temperatura de cama: el objetivo depende de la chapa, no del material

Aquí **no hay discrepancia entre fuentes de Bambu: hay una variable que faltaba**, y
era la chapa. Los dos números que parecían discrepar son los dos extremos de la misma
fila, leídos por columnas distintas.

- **Subir +5 a +10 °C, objetivo 55–65 °C en Textured PEI.** Y, en la misma página,
  **35 °C para el PLA en Cool Plate**. Los dos son de Bambu y los dos son ciertos.
  — [Bambu Lab](https://wiki.bambulab.com/en/filament-acc/filament/print-quality/warping-falling-off-collapsing)
- La tabla por chapa de la wiki de Bambu lo confirma y lo explica: la fila del PLA es
  `35–45 | 45–65 | 45–65 | 45–65` para Cool Plate, Engineering Plate, Smooth PEI y
  Textured PEI. El **35 °C de la Cool Plate** es un extremo; el **65 °C de la Textured
  PEI** es el otro.
  — [Bambu Lab](https://wiki.bambulab.com/en/general/filament-guide-material-table)
- **50–60 °C**, en la tabla de materiales de Prusa, y **sin condicionarla a ninguna
  chapa**: las seis columnas de chapa que esa tabla tiene están desalineadas en el
  original y no se publican (ver `## Afirmaciones` y `## Tirado`).
  — [Prusa Research](https://help.prusa3d.com/filament-material-guide)
- **«Sube la cama y no la bajes», con un máximo de 65 °C.** Es el consejo que un
  usuario le da a otro, para el caso de ese hilo.
  — [Lichtjaeger, foro de Prusa](https://forum.prusa3d.com/forum/original-prusa-i3-mk3s-mk3-how-do-i-print-this-printing-help/adjusting-settings-for-warping-of-pla/)
- La Knowledge Base de Prusa habla de Live Adjust Z y de brim para el warping, pero
  **no da una cifra de temperatura de cama para PLA**. La cifra de Prusa sale de su
  tabla de materiales, que es otro documento.
  — [Prusa Research](https://help.prusa3d.com/article/warping_2011)
- **OrcaSlicer es la única fuente del lote que da una regla de techo**, y no un
  número: *«you can use the glass transition temperature (Tg) of the material and
  subtract 5–10 °C to estimate a safe upper limit for bed temperature»*. **El Tg del
  PLA no lo da ninguna fuente de este lote**, así que la regla no se puede aplicar
  aquí y no se convierte en cifra.
  — [OrcaSlicer](https://www.orcaslicer.com/wiki/material_settings/filament/material_temperatures.html)

**El matiz, en tres partes.**

1. **Entre las dos cifras de Bambu no hay contradicción.** La fuente de warping las da
   por chapa; la tabla de materiales confirma que son la misma fila. Cualquiera de las
   dos está bien si la chapa es la que le corresponde.
2. **El 50–60 de Prusa es una tercera postura, y no encaja del todo con el 65 del
   foro.** Prusa da 50–60 para el PLA en una columna de temperaturas que no está
   condicionada a ninguna chapa; el hilo de Prusa sube a 65.
   Los dos son de "la casa Prusa" y no dicen lo mismo. El 50–60 cae **dentro** del
   45–65 que Bambu pide para la Textured PEI, así que no se contradicen: son el mismo
   rango leído con distinta anchura.
3. **"Sube la cama" es correcto en la dirección y está incompleto en el número.** El
   artículo tiene que decir "a la temperatura que corresponda a tu chapa", y sólo
   entonces las cifras. **Con la Cool Plate, 65 °C queda fuera del rango recomendado
   para esa fila**, que es 35–45 ℃. Y con la Textured PEI, quedarse en 35 °C es la
   razón de que las esquinas se levanten, porque la fuente lo dice literal: al laminar
   para una chapa e imprimir en otra, *"the adhesion temperature will be far too
   low"*.
   — [Bambu Lab, warping-falling-off-collapsing](https://wiki.bambulab.com/en/filament-acc/filament/print-quality/warping-falling-off-collapsing)

**Y lo que NO se escribe: que 65 °C en la Cool Plate queme la placa.** Ninguna fuente
de este lote dice que imprimir fuera de un rango recomendado dañe la chapa. Lo único
que el corpus documenta sobre una cama demasiado alta es otra cosa, y es de OrcaSlicer:
*«If the bed temperature is too high, the lower layers can overheat and soften
excessively, resulting in deformation such as elephant foot»*.
— [OrcaSlicer](https://www.orcaslicer.com/wiki/material_settings/filament/material_temperatures.html)
**Fuera del rango recomendado** es todo lo que se puede decir, y `elephant foot` es un
documentado, no un mecanismo inventado para el caso de la Cool Plate.

**Y una trampa con la misma cifra, que ya se ha cogido dos veces.** La ficha del PLA de
Prusa dice que la pieza *«gets soft and deforms at temperatures over 60 °C»*: esos
60 °C son **de la pieza**, no de la cama, y no pueden leerse como "no pases de 60 °C de
cama". En esa misma página se dice *«PLA does not require a heated bed»»: el 60 °C que
Prusa recomienda es recomendación suya, no una exigencia del material.
— [Prusa, ficha del PLA](https://help.prusa3d.com/article/pla_2062)

**Y el 65 °C del hilo, con su alcance.** Coincide con el extremo alto del intervalo que
Bambu publica para la Textured PEI, pero **no es lo mismo**: uno es un techo que un
usuario le pone a otro, y el otro el extremo de un intervalo de fabricante para esa
chapa. Que dos números coincidan no convierte al del foro en recomendación de
fabricante, y el hilo **no publica el valor al que Zakalawe dejó la cama**: cambió dos
variables a la vez y describió su resultado como *"that seemed to make a big difference"*.
Ver `## Sin respaldo`.

### 2. El ventilador: el auxiliar de Bambu y el general de Prusa

- **Bambu, página de warping:** sin cooling las 3 primeras capas, y *«we also
  recommend adjusting the Auxiliary part cooling fan if needed, by lowering it to
  about 40-50%»*. **Ojo al alcance del segundo consejo:** la fuente **no** lo limita
  a las primeras capas; dice que el ventilador auxiliar alto es el problema *«mostly
  applies on small objects or models that have high overhangs»*. Las "primeras
  capas" son para la opción de no enfriamiento, no para el ventilador auxiliar.
  — [Bambu Lab, printed-model-warping](https://wiki.bambulab.com/en/knowledge-sharing/printed-model-warping)
- **Bambu, la otra página, con otra cifra:** para *«Auxiliary fan causing warp»*
  recomienda *«Reduce around 20 to 30 %»*. Son dos páginas del mismo fabricante y no
  dicen lo mismo: una habla de **bajar el ventilador hasta ese nivel** y la otra de
  **reducirlo en esa cantidad**. **El corpus no resuelve cuál aplicar**, y el redactor
  tiene que decirlo así en vez de elegir un número.
  — [Bambu Lab, warping-falling-off-collapsing](https://wiki.bambulab.com/en/filament-acc/filament/print-quality/warping-falling-off-collapsing)
- **Prusa:** PLA y PETG necesitan mucha refrigeración; si las esquinas se levantan,
  comprobar que el ventilador de pieza esté activo y **probar a subirlo**, y
  comprobar que funciona y que la carcasa no está obstruida. Si lo que se curva son
  **voladizos inclinados y piezas pequeñas**, se puede probar a habilitarlo al 10–20 %
  incluso en materiales que no lo necesitan, como ABS o PC-Blend. Avisa de que
  demasiado ventilador *«may warp and lift up the whole object and may decrease
  layer-to-layer adhesion»*, y que si eso ocurre después de haberlo subido,
  *«try increasing the nozzle temperature»*.
  — [Prusa Research](https://help.prusa3d.com/article/warping_2011)

**El matiz, en tres partes.**

1. **No hablan del mismo ventilador, y eso sí está en las dos fuentes.** Bambu habla
   del **auxiliar** y Prusa del **general de pieza**. Lo que **ninguna** de las dos
   fuentes hace es acotar su consejo a un tramo de la impresión: el "en las primeras
   capas" de Bambu pertenece a la opción de no enfriamiento, no al ventilador
   auxiliar. Ese acotamiento se inventó aquí y **no se escribe**.
2. **Prusa no descarta bajar el ventilador.** Su objetivo declarado es *«to cool the
   part neither too fast nor too slow»*, y subir la boquilla es lo que **se prueba**
   si al subir el ventilador cae la adhesión entre capas. Es un diagnóstico con su
   remedio, no una exclusión. **"La respuesta no es bajar el ventilador sino subir la
   temperatura de boquilla" no está en ninguna fuente.**
3. **Los dos son ensayos, no recetas.** Prusa escribe *«try»* y *«you may try»*;
   Bambu da sus dos ajustes como recomendación. Redactado así, el matiz se sostiene
   sin elegir ninguna de las dos posturas.

### 3. El enclosure: la puerta cerrada y la puerta abierta están en la misma casa

- **Imprimir PLA dentro de un enclosure puede ser mala idea.** PLA y PETG necesitan
  mucha refrigeración, y con temperatura ambiente alta es más difícil conseguirla.
  Para los materiales de alta temperatura, al revés: conviene un enclosure.
  — [Prusa Research](https://help.prusa3d.com/article/warping_2011)
- **Bambu, sobre las corrientes:** *«Block airflow around the printer during printing.
  **Close the front door and top cover on enclosed printers.**»*
  — [Bambu Lab, warping-falling-off-collapsing](https://wiki.bambulab.com/en/filament-acc/filament/print-quality/warping-falling-off-collapsing)
- **El ambiente estable y por encima de 20 °C importa**, y por debajo de 20 °C hay
  warping incluso con PLA. Si la impresora es de estructura abierta, +10 °C de cama
  para compensar. — [Bambu Lab](https://wiki.bambulab.com/en/filament-acc/filament/print-quality/warping-falling-off-collapsing)
- **Bambu, tabla de materiales:** para filamentos con temperatura de reblandecimiento
  por debajo de 60 ℃ —PLA, PVA, TPU— **y cama por encima de 45 ℃**, *«we recommend
  opening the front door **and/or** removing the upper glass cover plate to prevent
  excessive chamber heat from softening and deforming the filament»*. Con ambiente
  alto la cámara sube más y eso lo hace *«more necessary»*; con ambiente bajo, menos
  necesario.
  — [Bambu Lab, tabla de materiales](https://wiki.bambulab.com/en/general/filament-guide-material-table)
- **OrcaSlicer va en la misma dirección:** para PLA, PETG, TPU, PVA y demás materiales
  de baja temperatura, el control de temperatura de cámara *«should be disabled (set
  to 0) as the chamber temperature should be low to avoid extruder clogging caused by
  material softening at the heat break»*, y avisa de que *«low temperature filaments
  like PLA can clog the nozzle if the chamber temperature is too high»*.
  — [OrcaSlicer](https://www.orcaslicer.com/wiki/material_settings/filament/material_temperatures.html)

**El matiz, en tres partes.**

1. **La contradicción aparente está dentro de la misma marca.** Bambu manda **cerrar**
   puerta y tapa contra las corrientes, y en su tabla de materiales **abrir y/o quitar
   la tapa** cuando la cama pasa de 45 ℃ con PLA. Lo que separa las dos instrucciones
   es **la temperatura de cama** y qué se quiere de la puerta: cortar una corriente de
   aire, o bajar el calor de la cámara.
2. **«Y/o» es «y/o».** La fuente escribe *«opening the front door and/or removing the
   upper glass cover plate»*, y es una **recomendación** (*«we recommend»*) con dos
   matices de ambiente. Redactado como "la puerta abierta **y** la tapa fuera" se le
   está exigiendo a Bambu una conjunción que no pidió, y como "hay que abrirlo" se le
   convierte una recomendación en una obligación.
3. **Las tres fuentes apuntan al mismo lado en la dirección que importa.** Con PLA,
   Prusa no quiere la cámara cerrada, Bambu quiere cámara fresca por encima de 45 ℃ de
   cama y OrcaSlicer quiere el control de cámara a 0. **Ninguna dice que un enclosure
   cerrado en sí mismo produzca warping.**

**Lo que no se escribe:** que dejar la puerta abierta "ayude a mantener el ambiente
estable y por encima de 20 °C". El corpus dice lo contrario: para cortar las
corrientes Bambu manda **cerrar** puerta y tapa, y los +10 °C de cama para compensar un
ambiente frío son para estructura abierta.

**El hilo del foro no aporta un tercer dato aquí.** El de 2019 dice sólo *"Longer term
I will setup an enclosure…"*: un plan, en futuro y sospechando. **No dice que lo
montara, ni que fuera sin tapa, ni que llevara espuma.** Ese caso no existe en el
material cocinado y no se escribe.

### 4. El patrón de relleno: Gyroid gana a Grid en las dos fuentes, cubic no está claro

- **Gyroid ≤25 %.** Grid y Triangle crean tensión lineal interna.
  — [Bambu Lab](https://wiki.bambulab.com/en/filament-acc/filament/print-quality/warping-falling-off-collapsing)
- **Grid es de los peores; probaría cubic, si falla gyroid, o mejor 3D Honeycomb.**
  — [Diem, foro de Prusa](https://forum.prusa3d.com/forum/how-do-i-print-this-printing-help/warping-at-corners/)

**El matiz:** las dos coinciden en que Grid es mala idea y en que Gyroid es mejor
que Grid. Difieren en la cabeza de la lista: Bambu pone Gyroid la primera,
Diem pondría cubic por delante. Gyroid tiene fuente oficial y cubic no, así que el
redactor debería recomendar Gyroid y **mencionar que hay quien prefiere cubic por
encima**, sin decidir quién tiene razón.

## Sin respaldo

Una sola fuente secundaria, sin corroboración; o una fuente oficial a la que se le ha
pedido más de lo que dice. El redactor puede usarlas **marcadas como lo que son**, no
como reglas generales.

- **El «techo» de 65 °C de cama.** **[CONSEJO DE UN USUARIO EN UN HILO, no un
  límite y no una medida]** Lichtjaeger escribe *«You should set your bed temperature
  higher and not lower (max 65°C)»*. La cifra tiene un eco oficial **distinto del
  suyo**: es el extremo alto del intervalo que Bambu publica para el PLA en Textured
  PEI (45–65 ℃), y el objetivo de su página de warping es 55–65 °C. Dos fuentes de
  distinto tipo, entonces, pero cada una por su lado. **Lo que no hay:** ninguna
  fuente de este lote dice que 65 °C sea un límite, y la tabla de Prusa para PLA se
  queda en 50–60 °C.
  **Y lo que ese hilo no demuestra, en ninguna redacción:** que 65 °C sea «el valor con
  el que se resolvió un caso real». Quien cambió la cama **no publicó el valor al que
  la dejó**, cambió también el chaflán en la misma intervención y describió el
  resultado como *"that seemed to make a big difference"*. Eso es una impresión de
  mejora con dos variables movidas a la vez, y no un resultado medido.
- **Que si sólo fallan las piezas grandes «el ajuste va en otro lado».**
  **[INFERENCIA DEL ARTÍCULO, no de las fuentes; si se usa, marcada como criterio del
  artículo]** La fuente sólo dice *«This is more common with larger prints»*: una
  frecuencia, no una dirección, y en el mismo párrafo van la densidad de relleno y los
  materiales que se contraen. **No es un diagnóstico que redsirige el ajuste.** Y la
  tabla de la misma página prescribe cama +5–10 °C (:129–133) y Gyroid ≤25 % (:162–169)
  para ese mismo caso, así que la inferencia apunta en contra de la fuente que la
  sostiene: si se deja el razonamiento, **no puede empujar a saltarse los pasos 3 y
  5**.
- **Que aquel caso no fuera por filamento ni por temperatura.** Diem escribe *«It is
  **unlikely** to be filament or temperature related»*: es una **opinión de
  probabilidad** dentro de un hilo, y viene después de proponer reimprimir mucho más
  despacio y de admitir que el efecto *"may well be compounded by other factors"*.
  **No es un descarte.** Redactado como «se descartó que fuera filamento» dice algo
  que la fuente no dice. **[UNA SOLA FUENTE — foro, y es opinión]**
- **Cubic por encima de Gyroid**, y **3D Honeycomb** como tercera opción.
  **[UNA SOLA FUENTE — foro]**
- **Abrir huecos decorativos en la pieza** para romper las tiradas largas y dar
  puntos de expansión. **[UNA SOLA FUENTE — foro]**
- **Mouse-ears** como alternativa al brim. **[UNA SOLA FUENTE — foro]**
- **Lavar la chapa con agua caliente y jabón a menudo, y con alcohol cada pocas
  impresiones**, por separado. Prusa sí recomienda limpiar, pero no da esta
  cadencia. **[UNA SOLA FUENTE — foro]**
- **Reducir la velocidad de impresión contra el warping de esquinas en PLA.**
  **[AFIRMACIÓN QUE SE HA IDO MÁS ALLÁ DE SUS FUENTES — no debe usarse sin marcarla]**
  Las dos fuentes la mencionan, cada una en otro sitio: Bambu para el **colapso** de
  piezas altas y finas, y para la boquilla que raspa el relleno; Prusa para el
  **Prusament PC-Blend**. **Ninguna la aplica a PLA contra warping de esquinas.**
- **Hacia dónde se curva un voladizo, y por qué.** Prusa pone los voladizos inclinados y
  las piezas pequeñas como **condición** de su consejo de ventilador, y **no dice** ni el
  sentido de la deformación ni su causa. Esos dos detalles no aparecen en ninguna fuente
  de este lote. **[NO SE ESCRIBE]**
- **Qué puede y qué no puede hacer un laminador con los chaflanes.** Ninguna fuente de
  `wiki/raw/` describe las capacidades de un laminador concreto. **[NO SE ESCRIBE]**
- **Que imprimir fuera de un rango recomendado daña la chapa.** Ninguna fuente del lote
  lo dice. **[NO SE ESCRIBE]**
- **Que cambiar la temperatura no arregla el filamento húmedo.** La fuente recomienda
  secar y reintentar, y no menciona la temperatura en ninguna dirección.
  **[NO SE ESCRIBE, en ninguna de las dos]**

### Reglas que salen de este fichero: comprueba contra el crudo, no contra lo cocinado

**Vuelta anterior.** Las tres afirmaciones encargadas corregir eran de hilos de foro, y
al abrirlas contra el crudo ninguna salió como estaba escrita: dos no estaban en su
fuente (el chaflán en el laminador, el enclosure sin tapa con espuma) y una era real
pero de **otro hilo y otro autor** (los radios de 3 mm). Al comprobarlas apareció una
cuarta, una cita entera que tampoco estaba en ningún fichero de `wiki/raw/`.

Lo que lo hizo pasar es que **el artículo y el material cocinado coinciden**: cuando
los dos dicen lo mismo, revisar el artículo contra lo cocinado **no puede ver un error
que nació en lo cocinado**, porque los dos están mal a la vez. Estas afirmaciones
llevaban dos revisiones aprobadas encima.

**Esta vuelta.** Los trece fallos salen de la misma raíz y la confirman: **un verbo
categórico donde la fuente tiene un matiz, y una cifra movida de sitio**. Concretamente:
un ranking de siete materiales convertido en prevalencia y en diagnóstico; el 80 %
atribuido a una lista que no es el Tier 1 de la fuente; una limitación de laminador que
no está en ninguna parte; salir de un rango recomendado convertido en daño a la chapa;
«y/o» convertido en dos obligaciones; *unlikely* convertido en descarte; una
recomendación de secado convertida en imposibilidad térmica; y dos atribuciones
distintas encadenadas como una sola. **Ninguno nació en el artículo solo: todos estaban
ya en este fichero de cocinado**, y el artículo los copió bien, que es lo que hace que
copiar bien no baste.

De los trece, cinco venían de hilos de foro y dos de páginas **oficiales**. Que la
fuente sea del fabricante no la convierte en prueba de un resultado: una tabla
publica un intervalo recomendado, no dice qué pasa al salirse de él. Y una tabla de
materiales es **un ranking entre los materiales de esa tabla**, no una prevalencia de
causas.

Un hilo de foro es además el peor caso: es conversación, con acentos, con gente que
cuenta planes y con alguien que corrige a otro. **Lo que dice una persona sobre lo que
va a hacer no es lo que hizo**, y lo que responde una persona en un hilo no es lo que
probó quien abrió el hilo.

Reglas prácticas:

1. **Una afirmación se abre en `wiki/raw/` y se cita la línea.** Si la cita literal no
   aparece en el fichero crudo, la afirmación no se escribe.
2. **Una cifra viaja con el sujeto que la emitió.** El 80 % es de sus tres pasos, el
   65 °C es del consejo que un usuario le da a otro, el 55–65 °C es un objetivo de
   troubleshooting y el 45–65 °C es un intervalo de tabla. Un número sin su sujeto no
   se publica.
3. **And/or sigue siendo and/or**, y *try* sigue siendo *try*. Lo que la fuente
   plantea como ensayo se redacta como ensayo.
4. **Cada fuente en su idioma, y sin promediar.** Cuando dos dicen cosas distintas, el
   redactor explica el matiz; no elige una en silencio.
5. **Un orden de pasos pertenece a su fuente.** Que dos fuentes compartan una causa no
   significa que compartan una prioridad.

## Tirado

Qué se ha eliminado y por qué. El redactor no usa nada de esto.

**Lista de no reintroducir.** Cada línea es un pasaje que estuvo cocinado, pasó dos
revisiones y era falso. Salió al abrirlo contra `wiki/raw/`, no por una queja de
estilo:

- **«El laminador sólo trae chaflán de esquina y no de arista», y «quien intente
  replicarlo allí no puede».** No hay en `wiki/raw/` ninguna fuente que describa las
  capacidades de un laminador concreto. Del hilo sólo sale **dónde** lo hizo
  Zakalawe. Cualquier capacidad de laminador que aparezca en el artículo está
  inventada.
- **«El chaflán es un paso antes de exportar».** El hilo dice dónde chaflanó la forma,
  no dónde va ese paso en el flujo de trabajo. Se queda el literal y sale el orden.
- **«La diferencia entre chapas para el mismo material es de veinte grados»** (o de
  treinta, o de diez, sin declarar los extremos). La fila `35–45 | 45–65` **no tiene un
  desplazamiento constante**: 10 °C en el extremo bajo, 20 °C en el alto. Lo que sí sale
  de las fuentes es el objetivo 55–65 °C de la página de warping, que es una ventana
  más estrecha dentro del intervalo de la tabla.
- **El 80 % pegado a una lista de ajustes que no es el Tier 1.** La cita es literal —
  *«These three steps resolve approximately 80 % of all warping and adhesion
  failures»* — pero es de **limpiar la chapa, ejecutar el nivelado automático y
  comprobar la instalación de la boquilla**. En esa lista no está el ventilador. Se
  conserva la cita con sus tres pasos y no se vuelve a colgar de otra secuencia.
- **«Con la Cool Plate, 65 °C quema la placa».** Ninguna fuente de este lote dice que
  imprimir fuera de un rango recomendado dañe la chapa. Se sustituye por lo que sí está
  documentado: 65 °C queda fuera del 35–45 ℃ de esa fila, y OrcaSlicer documenta
  `elephant foot` con cama demasiado alta. **No se escribe «quema».**
- **«La respuesta no es bajar el ventilador sino subir la temperatura de boquilla».**
  Prusa escribe *«try increasing the nozzle temperature»*, que es una prueba, y su
  objetivo declarado es *«to cool the part neither too fast nor too slow»*. No excluye
  bajar el ventilador.
- **«Prusa habla del ventilador general durante el resto de la pieza».** Acotamiento
  inventado: ninguna fuente acota su consejo a un tramo de la impresión.
- **«La puerta abierta y la tapa fuera».** La fuente dice *«opening the front door
  and/or removing the upper glass cover plate»*, y es *«we recommend»*. And/or sigue
  siendo and/or, y una recomendación no es una obligación.
- **«Dejar el enclosure abierto ayuda a mantener el ambiente estable por encima de
  20 °C».** El corpus dice lo contrario para el caso de las corrientes: Bambu manda
  **cerrar** puerta y tapa.
- **«Cambiar la temperatura no lo arregla»**, del apartado de humedad. La fuente
  recomienda secar y reintentar y **no habla de temperatura** en ninguna dirección. No
  se escribe en ninguno de los dos sentidos.
- **«Se descartó que fuera filamento».** Diem dice *«It is unlikely to be»*: es
  probabilidad, no descarte.
- **El sentido y la causa del voladizo**, y **la aceleración, los soportes y el colapso
  de piezas altas atribuidos a Prusa.** Prusa pone voladizos inclinados y piezas
  pequeñas como condición de un consejo de ventilador, y sobre PC-Blend dice sólo bajar
  la velocidad. Velocidad, aceleración, soportes y colapso son de la tabla de Bambu para
  *Collapsed model*.
- **«PLA es el material rígido que menos se deforma», «el problema casi nunca es el
  filamento: es cómo está configurado» y «ninguna de las tres cosas es el material».**
  El ranking de Bambu ordena **siete** filamentos y no mide la frecuencia de las causas.
  La misma fuente tiene un caso donde el material sí decide: los modelos grandes y
  planos en ABS, ASA o PC, que warpean casi siempre sin enclosure.

**Resto de tirados, de vueltas anteriores:**

- **El caso del foro con enclosure sin tapa y espuma** de la contradicción 3.
  **Fabricado en este fichero, no estaba en la fuente.** El hilo sólo dice *"Longer
  term I will setup an enclosure…"*: un plan en futuro y en condicional. De ahí no
  salen ni que lo montara, ni que fuera sin tapa, ni que hubiera espuma. **No se
  cita como caso resuelto**, y el redactor no debe reintroducirlo. La contradicción 3
  se sostiene sin él, con Prusa y Bambu.
- **La cita *"Zero warping… none on the bed"* y la prueba sobre placa de vidrio**, del
  apartado «el hilo de 2019». **No están en `wiki/raw/`.** Se han
  sustituido por la frase que sí está en el crudo, la de Zakalawe. La primera capa, la
  cama a 50 y 40 °C, el ambiente a 20 °C y el consejo de Lichtjaeger de subir la cama,
  con 65 °C como máximo, **sí están y se quedan**.
- **Reddit.** No hay contenido. Ni `reddit.com` ni `old.reddit.com` devuelven el
  texto de los hilos: sale la estructura del sitio y nada más. Está comprobado, no
  supuesto. Por eso dos de las cinco fuentes de warping son hilos de foro de Prusa.
- **All3DP.** La página carga pero su HTML no contiene el texto del artículo, ni en
  la versión normal ni en `/amp/`. No es citable desde aquí.
- **Tabla de materiales de Prusa** (`help.prusa3d.com/filament-material-guide`).
  **Corrección de una vuelta anterior.** Este apartado decía que la tabla «sale
  **aplastada en texto plano** y no es usable», y la descartaba. **Es falso, y la
  fuente ya estaba en `wiki/raw/`.** Lo cierto es otra cosa: la página **no trae ni
  una etiqueta `<table>`**, son cero, porque la monta con `div` y atributos de ARIA. Se
  lee sacando las celdas por `role="cell"` —20 `role="row"` y 309 `role="cell"` en el
  HTML servido—, y así salen las **18 filas de material** con sus tres columnas. Para el
  PLA queda `PLA | No, -, No | 185-235 °C, 50-60 °C`, y las cifras concuerdan con las que
  devuelve la búsqueda de la página.

  **No hay etiquetas `<table>` y «la tabla no se puede leer» son afirmaciones
  distintas, y aquí sólo la segunda era falsa.** Confundirlas costó una cifra oficial
  entera.

  — la tabla está subida en `wiki/raw/temperatura-cama-prusa-kb-filament-material-guide.md`
  y ya está cocinada en `## Afirmaciones`. La nota del recolector en
  `wiki/raw/warping-pla-prusa-knowledge-base-warping.md` conserva el mismo error, pero
  ese fichero es inmutable y no se toca.
- **Las columnas de chapa de la tabla de Prusa**, que se descartan aparte por
  desalineación en el original, no por dificultad de lectura. **Lo que se tira es el
  contenido, no la columna:** las seis cabeceras —Textured, Smooth PEI, Satin, Special
  PA Nylon, PP, HT— sí existen en la página y así constan en el fichero crudo
  (`:33-34`). Escribir que esa tabla «no desglosa por chapa» es falso; lo cierto es que
  sus valores no se pueden atribuir a una chapa. Coincide con
  `wiki/cooked/temperatura-cama.md`, `## Tirado`.
- **Comentarios en checo** de la Knowledge Base de Prusa.
- **Navegación, menús, estadísticas, etiquetas y posts relacionados** de los foros.
- **Imágenes y vídeo** de la wiki de Bambu: sólo queda la marca de posición.
- **Cierres de las páginas de Bambu** ("envía un ticket técnico"), que no son
  contenido.
- **Enlaces de tienda y precios** que aparecen en los comentarios del foro.
- **El consejo de bajar la velocidad con Prusament PC-Blend** de la Knowledge Base
  de Prusa, **como recomendación para este artículo**: es específico de ese filamento
  y no aplica a PLA. El literal sí queda cocinado y con su autor, en «Cuatro fallos que
  no son warping de esquinas».
- **"Use a skirt and print more objects at once"** de la Knowledge Base de Prusa:
  va dirigido a materiales de alta temperatura.

## Relaciones

| Concepto | Se relaciona con | Cómo |
|---|---|---|
| warping en PLA | adhesión a la cama | sin adhesión, la contracción levanta la pieza desde el borde |
| warping en PLA | temperatura ambiente | por debajo de 20 °C ocurre incluso con PLA |
| warping en PLA | enfriamiento de la primera capa | sin cooling 3 capas, la primera capa se enfría demasiado rápido |
| warping en PLA | [[temperatura-cama\|Temperatura de cama]] | **este artículo usó sus cifras**: la contradicción 1 no se entiende sin la tabla por chapa de Bambu, y el 50–60 °C de Prusa sale de su tabla de materiales |
| warping en PLA | tipo de chapa | 35–45 ℃ en Cool Plate frente a 45–65 ℃ en las otras tres, para el mismo PLA. Son los extremos de una misma fila, no dos cifras que se pelean; y el objetivo 55–65 °C de la página de warping es una ventana más estrecha, no el mismo intervalo |
| warping en PLA | temperatura de cama, cuándo se sube | **una tabla oficial publica un intervalo recomendado, no un resultado**: 65 °C en la Cool Plate está fuera del 35–45 ℃ de esa fila, y ninguna fuente del lote dice qué ocurre por salirse |
| warping en PLA | altura de la primera capa | la Textured PEI baja la boquilla 0,04 mm al nivelar; elegir mal la chapa en el slicer desactiva ese offset y la primera capa queda demasiado alta |
| warping en PLA | patrón y densidad de relleno | Grid y Triangle crean tensión lineal; Gyroid reparte |
| warping en PLA | geometría de las esquinas | aristas vivas concentran tensión; redondear o chaflanar las reparte. **El chaflán del caso de 2019 se hizo en el modelo, en Fusion** —el hilo no dice dónde va ese paso, y ninguna fuente dice qué puede hacer un laminador—; el redondeo en eje Z es lo que propone el foro |
| warping en PLA | ventilador | **auxiliar** en Bambu, **general de pieza** en Prusa, y ninguna de las dos fuentes acota su consejo a un tramo de la impresión. Los dos son ensayos, no recetas |
| warping | separaciones entre capas | **son fallos distintos**, y confundirlos lleva a cambiar lo que no toca. El caso de Neophyl es una lectura de fotos concretas: **el criterio de base plana y superficie normal no sale de ese hilo** |
| warping en PLA | colapso de piezas altas y finas | es **mecánico, no térmico**, y es otro apartado de la tabla de Bambu. Velocidad, aceleración y soportes son suyos; Prusa, sobre PC-Blend, dice sólo bajar la velocidad |
| warping en PLA | enclosure | **la contradicción está dentro de la misma marca**: Bambu manda cerrar puerta y tapa contra las corrientes y abrir **y/o** quitar la tapa con cama de más de 45 °C en PLA. Prusa dice que PLA en enclosure puede ser mala idea, y OrcaSlicer que el control de cámara debería estar a 0 |
| warping en PLA | humedad del filamento | chasquidos o superficie rugosa y con burbujas son otro problema, no warping |

**Páginas propias que este tema sugiere:**

- *enclosure y warping*, porque la contradicción de puerta y tapa **está dentro de la
  misma marca** y el matiz —qué se quiere de la puerta, y a qué temperatura de cama— es
  el contenido entero de la página.
- *colapso de piezas altas y finas*, porque es un fallo mecánico con su propio
  apartado en la tabla de Bambu, y confundirse con el warping lleva a cambiar lo que
  no toca igual que en el caso de las separaciones entre capas.