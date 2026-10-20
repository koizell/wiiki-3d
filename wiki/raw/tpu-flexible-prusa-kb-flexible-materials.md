---
titulo: "Flexible materials | Prusa Knowledge Base"
url: https://help.prusa3d.com/article/flexible-materials_2057
sitio: help.prusa3d.com
tipo: oficial
capturado: 2026-10-19
autor: Prusa Research
idioma: en
---

**
[IMAGE]
**

### Basic info

**Flexible materials** are characterized by their **excellent flexibility, tenacity, and chemical resistance**. These materials are relatively uncommon, expensive, and suitable mostly for advanced users due to high print difficulty.
 
**Recommended nozzle temperature:** 230 **°**C - 245 **°**C (Depending on hardness and brand).
 
**Recommended bed temperature:** 60 °C - 75 °C (Depending on the size of the object, bigger objects tend to need higher bed temperature).

### Description

Flexible filaments (https://www.prusa3d.com/category/flex/) are **chemically and mechanically resistant** materials. Individual layers hold strongly together and there is a great print surface adhesion (applies only for TPU and TPEE). Due to these qualities, it is necessary to print on a powder-coated sheet or use a special separator on the print surface (glue stick or Kapton tape). Flexible filaments are **TPE** (thermoplastic elastomer) material, however, they are distributed under various names, such as **TPU, TPEE,** etc. For example, TPU is basically a subtype of TPE material and the main difference between TPU and TPE is its **shore hardness**. TPU is usually around 60A-90A on the shore hardness scale. Generally speaking, **the softer the filament is, the harder it is to print.**

| [IMAGE] |
| Shore hardness scale, source: smooth-on.com |

Flexible filaments are usually very **resistant to wear** (scratching), **stay flexible** even in cold environments, and show **great resistance against various solvents**. Dimensions are stable, there is **little to no shrinking or warping**. Their **tenacity and tensile strength are excellent:** 3D-printed parts can withstand great stress before breaking. These properties make it suitable for printing spacing washers and other high-stress parts. With proper print settings, you could print stamps, RC tires, shoe soles, belts, etc.

Some very soft flex materials can bond to the bed too much and require the use of glue stick on the bed as a separator to prevent PEI damage. A good alternative is the **Textured Spring-steel sheet**.

Printing with flexible filaments is recommended **only for experienced makers**, considering various challenges during printing. We’re talking about frequent nozzle clogging, poor bridging and overhang characteristics, filament tangling into extruder gears, stringing, and oozing.

To compare supported material properties, see our material table. (/en/materials)

| Pros | Cons |
| ✔ Flexibility & tenacity | ✖ High print difficulty |
| ✔ Dimensional stability (low shrinkage) | ✖ Low printing speed |
| ✔ Good layer adhesion | ✖ Very bad bridging and overhangs |
| ✔ High mechanical and chemical resistance | ✖ Difficult support removal |
|  | ✖ Stringing |
|  | ✖ Hygroscopic material (absorbs moisture) |

### Best use

The best use of flexible filament is for printing **spacing washers** and other high-stress parts. With proper print settings, you could print **stamps, RC tires, shoe soles, belts, etc.**

### **Important rules for successful printing with flexible filaments**

- **Make sure the nozzle is unobstructed.** If you’re not sure, do a cold pull to clean it completely.  

- **Loosen the idler** so the gears push the filament through only very gently. If they press too hard, the filament might get entangled in the gears.

- **If you print on a smooth or satin sheet, apply a separation layer on it** (glue stick or Kapton tape should work). The powder-coated TXT sheet does not need any separation layer - the print will stick just fine and can be easily removed without damaging the surface.

- **Print slowly.** The slower, the better. A typical speed for flexible filaments is usually 20 mm/s, the maximal recommended speed is somewhere between 30 and 40 mm/s. With higher speeds, you risk clogging the nozzle or tangling filament into the gears. For Original Prusa printers, we recommend using the “Semiflex or Flexfill 98A” or “Filatech FilaFlex40” profiles that have proper speed settings.

- **Increase the nozzle temperature by 5 °C**, this will lower filament resistance. Keep print cooling turned off.

- **Keep the filament dry.** Flexible filaments tend to absorb moisture and can be hard to print when wet.

### **Tips for successful printing**

**Flexibility and slicer settings**

Do you need **better mechanical resistance?** Set more infill and perimeters in PrusaSlicer. But if you need to **retain the material flexibility**, try to lower the number of perimeters and top/bottom layers. However, keep in mind that flexible filaments are not good at bridging and overhangs. A combination of thin layers and poor bridging can lead to ugly holes and protrusions.

**Retractions**

If you use a different program than **PrusaSlicer** (https://www.prusa3d.com/page/prusaslicer_424/)**,** try to adjust retractions a little bit. With lower retractions, there is a lower risk of clogging the nozzle or filament tangling. It’s alright to **turn the retractions off** completely and then try to raise them and watch the results. 

**Printing supports**

Supports may need more space in Z-axis. Try to **increase it to 0,3 mm**. Supports that are closer to your model might stick to it too strongly and might be difficult to remove. Increase 'XY separation between an object and its support to at least 100%.

**Filament sensor**

Remember that automatic filament change might not work properly with flexible filaments.

Do you want to know more about printing with flexible filaments? Check **our blog article** (https://blog.prusaprinters.org/how-to-print-with-flexible-filament_29672/).

### XL

The Original Prusa XL has a long path from the loading to the extruder nozzle. Due to its softness, Flexible filaments need special attention when being loaded in this printer. You can print the flex filament bypass (https://www.printables.com/model/858033-flex-filament-bypass), and follow the instructions in the video below:

*

### CORE One+ and CORE One L

The CORE One+ and CORE One L have a hardware switch on the side filament sensor case that allows the filament sensor lever to be looser, allowing for easier loading of flexible filaments to the extruder.

Moving the latch to the **front**, the side with the x, will loosen the lever, allowing you to load the flexible filament. Moving the latch to the **back **will tighten the lever.

[IMAGE]

### Sample prints

| [IMAGE] | [IMAGE] |
| Stamps, hoses, and tires | Example of filament flexibility |
| [IMAGE] | [IMAGE] |
| RC tires | GoPro and phone protection sleeve |

Was this article helpful?

This action is available only to registered users. Please log-in (/wp-login.php?redirect=/article/flexible-materials_2057).

## Notas del recolector

- **Aviso técnico sobre cómo se obtuvo el cuerpo:** el KB de Prusa se sirve como
  aplicación React. El texto **no** está en el cuerpo visible: está dentro del
  fragmento oculto `<div hidden id="S:1">`, que en esta captura son 20.270 bytes de
  HTML. Un 200 con cuerpo vacío aquí **no** es una página vacía. El texto de arriba
  sale de ese fragmento, con las etiquetas convertidas a Markdown. Los `[IMAGE]` son
  las imágenes del original, sustituidas por una marca neutra.

- **Ésta es la fuente del KB de Prusa sobre materiales flexibles en general** que pedía
  el brief, y aporta lo que la guía de TPU 95A de Prusament (que ya está en
  `wiki/raw/`) **no** da: el comportamiento de la **máquina**, no del filamento.
  En concreto:
  - **El idler hay que aflojarlo**: «Loosen the idler so the gears push the filament
    through only very gently. If they press too hard, the filament might get entangled
    in the gears.» Esta es la regla que explica el ruido de extrusor y el atasco por
    engranajes, y es una regla de **máquina**.
  - **La retracción con material flexible es un caso aparte**: «It's alright to turn
    the retractions off completely and then try to raise them and watch the results.»
    Coincide con el gate 4 del brief: se publica como «desactivar», no como una cifra
    menor.
  - **Velocidad**: 20 mm/s como típica, máximo recomendado entre 30 y 40 mm/s.
  - **Temperatura**: boquilla 230-245 °C, cama 60-75 °C, **subir 5 °C la boquilla**
    respecto al ajuste previo y **dejar el ventilador apagado**.
  - **El sensor de filamento y el cambio automático**: «automatic filament change
    might not work properly with flexible filaments». Es el equivalente de Prusa a la
    limitación del AMS.
  - **Dos diferencias de máquina concretas**: en el **XL** el camino de carga es largo
    y el filamento blando necesita atención (hay un «flex filament bypass»
    imprimible); en el **CORE One+ / CORE One L** hay un **interruptor físico** en la
    carcasa del sensor de filamento que afloja la palanca para poder cargar material
    flexible.
  - **TPU = subtipo de TPE**, diferencia por la **dureza Shore**, y «TPU is usually
    around 60A-90A». Y la regla que sostiene el eje del brief: «the softer the
    filament is, the harder it is to print».

- **Lo que esta fuente NO dice, y el brief debe tener en cuenta:** no menciona en
  ningún momento los **extrusores bowden** ni el tubing. La escena 1 de la prueba de
  utilidad (TPU 95A en una bowden que se atasca en la primera capa) **no tiene
  respaldo en ninguna de las cinco fuentes de este lote**. Si el cocinero la quiere
  cubrir, tiene que decirlo como ausencia de evidencia, no rellenarlo.

- **Contradicción con la guía de Prusament TPU 95A que ya está en `wiki/raw/`:**
  - Temperaturas: esta fuente da **boquilla 230-245 °C y cama 60-75 °C**; la guía de
    TPU 95A da **boquilla 220-240 °C y cama 55-75 °C**. No son la misma comparación
    (una es el material flexible en general, la otra un filamento concreto), pero el
    cocinero tiene las dos y no debe fundirlas.
  - Superficie: esta fuente dice que hay que imprimir en **lámina con recubrimiento
    powder-coated** o poner un **separador (glue stick o Kapton)**, y que la **TXT
    powder-coated no necesita separador**; la guía de TPU 95A recomienda **PA Nylon,
    Satin, PP y Textured**, y marca **Smooth PEI como no recomendada**, sin mencionar
    la TXT. El diferenciador que esta fuente da es la **Textured Spring-steel** como
    alternativa al PEI para materiales muy blandos.

- **Enlaces del original que NO se han descargado, y por qué:** el enlace «our
  material table» apunta a `/en/materials` (ruta de `prusa3d.com`, no del KB, y fuera
  de los prefijos permitidos `/article/`, `/filament-material-guide/`, `/category/`,
  `/glossary/`, `/product/`); el «our blog article» apunta a `blog.prusaprinters.org`
  (dominio `prusa-blog`, estado **pending** en `wiki/policy/sources.json`); y el
  «flex filament bypass» apunta a `printables.com` (fuera del registro). **No se debe
  citar nada de esas tres páginas.** Los enlaces de MakerWorld y de la wiki de Bambu
  que aparecen en las otras fuentes de este lote están en la misma situación.

- **Detalles del artículo que el cocinero no debe pasar por alto:**
  - El artículo es de tipo «help» de la base de conocimiento, **no** una guía de
    material: no es el sitio donde buscar cifras de un filamento concreto.
  - Recomienda perfiles de PrusaSlicer concretos para materiales de terceros:
    «Semiflex or Flexfill 98A» y «Filatech FilaFlex40».
  - Tiene una tabla **Pros/Cons** que es una lista de problemas propios del material
    (tDifficulty, bridging, soporte, goteo, higroscopia).
  - La última línea («Was this article helpful? … Please log-in») es de la
    aplicación, no del artículo.
  - El bloque `**` / `[IMAGE]` / `**` del principio es la **imagen de la escala
    Shore** (fuente smooth-on.com) envuelta en negrita.

- **Erratas y rarezas del original, conservadas:** «0,3 mm» con coma decimal,
  «Increase 'XY separation» con la comilla simple mal cerrada, «Moving the latch to
  the **back **» con espacio antes del cierre, las dobles negritas sueltas
  (`**°**C`, `**,**`), y el `*` suelto donde iría un vídeo incrustado. No se ha
  corregido nada.
- El texto original está en inglés y no lo he traducido.
