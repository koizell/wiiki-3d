---
titulo: "Extrusion multiplier calibration"
url: https://help.prusa3d.com/article/extrusion-multiplier-calibration_2257
sitio: help.prusa3d.com
tipo: oficial
capturado: 2026-10-04
autor: Prusa Research
idioma: en
---

# Extrusion multiplier calibration

Relevant for

MK4 family

MINI family

MK3 family

MK3.5 family

MK3.9 family

+

113 comments

Article is also available in following languages

[imagen: English]

[imagen: Čeština]

[imagen: Polski]

[imagen: Deutsch]

[imagen: Français]

[imagen: Español]

[imagen: Italiano]

[imagen: 日本語]

This is an **advanced calibration**, recommended only to **experienced users**.

The Extrusion Multiplier allows the fine-tuning of the extrusion flow rate - simply described as **how much filament comes out of the nozzle**. In other words, the **Extrusion Multiplier** setting in PrusaSlicer and the **Flow rate** setting in printer firmware are two ways to adjust the same thing, however, adjusting one of those two settings will not influence the value of the other.

**This procedure is not necessary with a new printer coming from the factory**, but rather applies for specific applications and filaments. The ideal value is different for every type of material and every color. It can even differ from spool to spool. Bear this in mind if you change type and brand of filament often or use cheap no-name brands.

[note-callout]
Total flow rate = **Flow multiplier** in firmware (M221) x **Extrusion multiplier** in PrusaSlicer. For those interested in diving deeper, PrusaSlicer uses the same Flow math as Slic3r.
[/note-callout]

### How to spot an issue

This calibration is used to fix two common problems:
- **Overextrusion** - Too much material is extruded (flow is too high). It causes scarring of bottom layers and unnecessary material buildup on top layers.
- **Minor under extrusion** - Not enough material is extruded (flow is too low). It causes small gaps that appear between layer lines or perimeters.

[imagen:]

**Overextrusion** is a common problem with many filament brands. It's especially problematic when you're trying to glue two parts of the model. **If the top layer is over extruded, you'll end up with an uneven surface that will prevent a seamless connection between the two pieces.**

### How to do the calibration

In PrusaSlicer, navigate to Filament Settings and look for Extrusion Multiplier. The default setting (for PLA) is 1, this value represents a percentage, 1 = 100%, 0.95 = 95% etc. Usually, the adjusted values can be between 0.9 and 1.1. To adjust it, simply rewrite the value.

[imagen:]

In the printer menu, during a print, go to the Tune menu and then choose Flow. Again, the usual values can range between 90 and 110, although that does not mean you can't go above or below that.

#### Which method should I use?

There are two methods you can use to calibrate the Extrusion Multiplier, and we'll cover both of them in this article:
- **Precise Method** - using precision tools such as calipers or micrometers.
- **Visual Method** - an easy method based on observing the visual properties of your models.

The choice of the method depends entirely on your preferences; in the end, both yield similar results. Even the visual method will enable you to have perfectly fitting parts with smooth & flat top layers.

#### Precise Method

[note-callout]
Please note that the following guide is based on **default** PrusaSlicer 0.4 nozzle profiles, with a layer height of 0.1mm - 0.2mm. This means that:
- Nozzle size = 0.4
- Extrusion width = 0.45
- Basic materials (PLA, ABS, PETG) Extrusion Multiplier = 1

**If you wish to calibrate the printer with a bigger/smaller nozzle or layer heights above 0.2, then you will need to adjust these values as well.**
[/note-callout]
- Download the Precision Method Cube STL.
- Slice it using the Vase Mode and your most-often used layer height and print it. You can find Vase mode (Print Settings → Layers and perimeters → Spiral vase).
- Make three or more measurements in the middle of each wall and calculate the overall average thickness.
- Calculate the extrusion multiplier using the following formula: **Extrusion multiplier = (Extrusion width (0.45) / Average measured wall thickness)**.
- Adjust the Extrusion Multiplier in Filament Settings → Filament
- Re-print the cube with new settings and go back to step 3 if necessary.

[imagen:]

Please note that cheap digital calipers may not be accurate enough to make reliable measurements of a single perimeter wall.

#### Visual Method

This method does not require any tools, only your sight. The point is to make sure your top layers are **smooth**, **shiny,** and without **scarring or filament buildup** near the perimeters.

[imagen:]
- Download the Visual Method Cube.stl
- Slice it using the default Prusa PLA presets at 0.20mm layer height and print it.
- Inspect the top layer of your cube visually and with the tip of the finger.
- If the top is under extruded or not smooth, then re-adjust the Extrusion Multiplier accordingly by 1-2%.
- Repeat the steps above as long as needed.

If there is **too much material** near the perimeters, **decrease** the Extrusion Multiplier value.

[imagen:]

If there are **visible gaps** between layer lines, **increase** the Extrusion Multiplier value. (Microscopic gaps near the perimeters are OK.)

[imagen:]

## Notas del recolector

- **Aviso tecnico sobre la obtencion del cuerpo, igual que en las otras dos de este lote.** La
  conversion automatica a Markdown devuelve titulo, indice y pie, y deja el cuerpo vacio; el
  texto esta en el HTML servido, dentro del fragmento de carga de React
  (`<div hidden id="S:1">`). Estado 200, 1.530.861 bytes de HTML. **No es un aviso sin
  contenido.**
- **Alcance: esta es la fuente de apoyo, y su alcance es estrecho.** No habla de adhesion a
  la cama en ningun momento: no menciona la primera capa pegandose ni despegandose, ni la
  chapa, ni la temperatura de cama. Es un articulo de calibracion de **flujo de extrusion**,
  marcado por la propia Prusa como «**advanced calibration**, recommended only to
  **experienced users**» y con la advertencia de que **no hace falta en una impresora nueva
  de fabrica**. Su valor para el brief es el de **distinguir un fallo de adhesion de un fallo
  de extrusion**, y en ese sentido loUtil es el apartado «How to spot an issue».
- **Lo que aporta como criterio de diferenciacion, y es lo unico que aporta:**
  - El sintoma del **under-extrusion leve** es «small gaps that appear between **layer lines
    or perimeters**». Es decir, huecos **entre lineas y perimetros de una capa ya
    pegada**, no la pieza levantada de la cama.
  - El sintoma del **over-extrusion** es «scarring of bottom layers and unnecessary material
    buildup on top layers».
  - El metodo visual se define por el estado de la **capa superior** —«smooth», «shiny», sin
    «scarring or filament buildup» cerca de los perimetros—, no por como se sujeta la pieza a
    la cama. Por eso **esta pagina no puede usarse para decidir si la primera capa se pega**:
    sus criterios miran la superficie del cubo, no su base.
- **Cuidado con una confusion de escala que la propia pagina propaga, y que conviene no
  arrastrar.** Da el parametro en **dos escalas distintas segun donde se toque**, y son la
  misma magnitud:
  - En PrusaSlicer, Extrusion Multiplier = **1 = 100 %**, «usually, the adjusted values can be
    between **0.9 and 1.1**», y «0.95 = 95 %».
  - En el firmware (menu Tune → Flow), «the usual values can range between **90 and 110**».
  Los numeros no se contradicen: son la misma cifra en escala de 1 y en escala de 100. Si se
  citan en el articulo hay que decir siempre en cual de los dos sitios esta el valor.
- **La relacion entre los dos ajustes es multiplicativa y el pagina lo dice con una formula:**
  «Total flow rate = **Flow multiplier** in firmware (M221) x **Extrusion multiplier** in
  PrusaSlicer». `M221` es el comando real de Marlin. Y anade algo que conviene no perder:
  **ajustar uno de los dos NO cambia el valor del otro**, aunque los dos ajusten «the same
  thing». Es decir, los dos no son el mismo ajuste en el mismo sitio.
- **Valores por defecto que da, con su unidad y su ambito:**
  - «The default setting (for PLA) is 1».
  - Guia del metodo preciso, sobre perfiles por defecto de boquilla 0.4: «Nozzle size =
    **0.4**», «Extrusion width = **0.45**», «Extrusion Multiplier = **1**» para PLA, ABS y
    PETG, con altura de capa «**0.1mm - 0.2mm**» (sin espacio en el original).
  - Formula: «Extrusion multiplier = (Extrusion width (**0.45**) / Average measured wall
    thickness)».
  - Metodo visual: «re-adjust the Extrusion Multiplier accordingly by **1-2%**» y «at
    **0.20mm** layer height».
- **Una incoherencia del original que no he tocado:** el parametro se describe como
  porcentaje («1 = 100 %») y luego el ajuste del metodo visual se pide «by **1-2%**». En la
  escala de 0.9-1.1, «1-2%» no corresponde a «0.01-0.02» de forma obvia. La pagina no lo
  aclara. Se deja tal cual; que el cocinero lo sepa antes de convertirlo en una instruccion.
- **El metodo preciso es el unico que da una formula comprobable,** pero la pagina le pone
  dos limites: hay que hacer «three or more measurements in the middle of each wall» y promedia,
  y «cheap digital calipers may not be accurate enough to make reliable measurements of a
  single perimeter wall». Ademas el recuadro avisa de que la guia asuma 0.4 / 0.45 / altura
  0.1-0.2 mm, y de que con otra boquilla u altura hay que ajustar esos valores.
- **Rangos que la pagina da como habituel pero no como limite:** los 0.9-1.1 y los 90-110
  llevan «Usually» / «usual», y del firmware anade explicitamente «that does not mean you
  can't go above or below that». No hay ningun valor limite en toda la pagina.
- **La pagina no da ningun valor de temperatura, ni de cama, ni de altura de capa por
  defecto de un perfil material.** No hay tablas: **cero** elementos `<table>` en el cuerpo.
  Los valores de referencia son una lista dentro de un recuadro.
- **Alcance fuera del brief, conservado sin recortar:** los dos metodos de calibracion
  completos, el metodo preciso con su formula y el visual con sus pasos. El brief deja los
  fallos de extrusion general fuera de alcance; se conservan porque son el contexto que
  distingue adhesion de extrusion, que es lo que se pidio de esta pagina.
- Los enlaces se han reducido a su texto; los enlaces internos a los STL («Precision Method
  Cube STL», «Visual Method Cube.stl») **no son descargables desde aqui sin salir de
  `/article/`** y no se han seguido. No hay recursion de enlaces.
- La cabecera «Relevant for» es MK4 family, MINI family, MK3 family, MK3.5 family, MK3.9
  family y «+». Los 113 comentarios no se han capturado. Las imagenes no tienen `alt` y van
  como `[imagen:]`.
- El texto original esta en ingles y yo no lo he traducido.
