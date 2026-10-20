---
titulo: "Seam position"
url: https://help.prusa3d.com/article/seam-position_151069
sitio: help.prusa3d.com
tipo: oficial
capturado: 2026-10-19
autor: Prusa Research
idioma: en
---

Unless you're printing in the Spiral vase mode, each perimeter loop has to start and end somewhere. This start/endpoint creates a potentially visible vertical seam on the side of the object. It's also commonly called zits, layer seams, or scars.

This seam will be obvious if the object's shape is cylindrical, without any sharp corners.

To hide the seam as much as possible, there are several seam placement options available in
Print settings -> Layers and perimeters -> Seam position. Note that some options will only appear when Expert mode is selected.

[imagen:]

Starting with PrusaSlicer 2.3, you can use the Seam painting tool to have detailed control over the seam placement.

### Seam Position

#### Nearest

Attempts to place the seam on the nearest edge of the current layer. If your model has sharp corners, this will make the seam effectively **invisible**.

To be precise, this will try to choose a concave non-overhang vertex so that the seam is hidden inside the concave angle. If no concave non-overhang vertices are available, it will choose a convex non-overhang vertex. If none are available, it will choose a non-overhang vertex. The choice among the candidates is made so that the start point is the nearest to the previous extruder position. So this option is optimized for speed, low travel, and acceptable strength.

[imagen:]

#### Aligned

This will use the same logic as the Nearest for finding the candidates, but it will choose the one that is nearest to the start point of the previous layer. This will ensure the seam is mostly aligned throughout the whole object.

[imagen:]
Random (left) vs Aligned (right) seam position

#### Random

This will choose a different point for each layer, making the seam less noticeable at the cost of a less smooth surface (small zits scattered across the surface). This option increases the overall strength of the print.

It makes little sense to use Random seam position on models with corners/sharp edges; it's much better to use Nearest or Aligned in such cases. On the other hand, when printing cylindrical shapes without any sharp edges, the Random seam position is a viable option.

[imagen:]

#### Rear

The Rear position works similarly to Aligned, but it will try to position the seam close to max Y (rear of the print bed). It still tries to avoid overhangs and tries to put the seams in the corners. This option is useful for objects that will be displayed with a specific orientation.

### Seam gap distance

The distance between the endpoints of a closed loop perimeter. Positive values will shorten and interrupt the loop slightly to reduce the seam. Negative values will extend the loop, causing the endpoints to overlap slightly. When percents are used, the distance is derived from the nozzle diameter. Set to zero to disable this feature.

### Staggered inner seams

This option causes the inner seams to be shifted backward based on their depth, forming a zigzag pattern. Having the inner seam not aligned with the perimeter seam makes the part stronger, as the seams are weak spots for the prints.

### Scarf joint placement

The Scarf seams overlap extrusions at the end and start of the perimeter loop, hiding visible seams on smooth perimeters. You can visualize the seams in the printer preview using the Volumetric flow rate (mm³/s) or Actual volumetric flow rate (mm³/s) options in the preview legend.

This setting reduces visible z seams, which is especially useful in curved surfaces, and improves overall part strength.

Note that using scarf seams increases print time, and is less effective in sharp corners and overhangs.

[imagen:]

#### Nowhere

The function is disabled.

#### Contour

The scarf seams will only be applied to the contour of the object.

#### Everywhere

The scarf seams will be applied on the outer perimeter and inner walls surrounding holes within the part.

### Scarf joint only on smooth perimeters

This is the standard option in case the Scarf joint is enabled. The Scarf joint is not applied on non-smooth surfaces as the seam can be hidden on curves and corners of the object. If this option is unchecked, the Scarf joint will also be applied to these non-smooth surfaces.

### Scarf start height

Defines the vertical offset for the start of the scarf ramp, specified as a fraction of the current layer. A value of 0 means the scarf begins at the same height as the current layer and ramps up to the full layer height over the scarf length.

### Scarf joint around entire perimeter

Extend the scarf around the entire perimeter.

### Scarf joint length

Change the horizontal length of the scarf ramp transition. Using 0 in this setting disables the scarf joint.

### Max scarf joint segment length

This setting defines how the scarf is divided. The Z-height change is applied every 1 mm by default. If you use a larger value, there will be fewer points where the Z-height changes.

### Scarf joint on inner perimeters

The scarf seams are usually only added to external perimeters. Checking this option adds the scarf seam on the inner perimeters.

### How to reduce the visibility of the seam

With the FFF/FDM technology, it is not possible to eliminate the seam. It will always be somewhat visible. However, with well-tuned settings, it shouldn't be too noticeable.

Settings that affect the visibility of the seam are Linear Advance and Extrusion multiplier calibration. Original Prusa profiles have these settings already tuned, but if you're fine-tuning a custom profile, you can try lowering the extrusion multiplier and calibrating the linear advance value to lower the visibility of the seam.

You can use the Vase mode to avoid the seam, but then you'll be limited to using only one perimeter and no infill.

## Notas del recolector

- **Aviso técnico sobre cómo se obtuvo el cuerpo, y es importante para este caso:** el KB de
  Prusa se sirve como aplicación React. El texto de este artículo **no** está entero en el
  `<div hidden id="S:1">`: ese fragmento sólo contiene la introducción (los tres primeros
  párrafos y el enlace a la herramienta de pintado). **El cuerpo del artículo —los
  apartados «Seam Position», «Seam gap distance», «Staggered inner seams», todo el bloque de
  «Scarf joint…» y el apartado final «How to reduce the visibility of the seam»— está
  renderizado en el DOM normal, después de ese fragmento oculto.** Un conversor ingenuo
  que se quede con el `S:1` se queda con el 20 % del artículo y pierde precisamente lo
  interesting: las cuatro posiciones de costura, el *seam gap distance* y el *scarf joint*.
  Conviene que el resto del pipeline lo sepa.
- **Es la fuente del KB de Prusa sobre la posición de la costura y sobre qué la hace
  visible**, que es el segundo encargo del brief. URL verificada: 200, título «Seam
  position | Prusa Knowledge Base».
- **Definición y sinónimos, con la redacción de Prusa:** «each perimeter loop has to start
  and end somewhere. This start/endpoint creates a potentially visible vertical seam on the
  side of the object. **It's also commonly called zits, layer seams, or scars.**» El término
  «zits» es el que usa Bambu para el efecto del modo *Random* («some "zits" effects»), así
  que las dos páginas comparten vocabulario: eso es un dato útil para el diferencial.
- **La costura es inevitable y visible, pero no un fallo — y Prusa lo dice con esas
  palabras:** «With the FFF/FDM technology, **it is not possible to eliminate the seam**. It
  will always be somewhat visible. However, with well-tuned settings, it shouldn't be too
  noticeable.» Es el equivalente del gate 1 del brief en la casa de Prusa, y conviene
  publicarlo junto con el de Bambu, no uno en lugar del otro.
- **Las cuatro posiciones, con su texto y su coste:**
  - *Nearest* — la misma lógica de candidatos que Bambu (cóncavo sin voladizo > convexo sin
    voladizo > vértice sin voladizo), pero Prusa añade el criterio explícito: «The choice
    among the candidates is made so that the start point is the nearest to the previous
    extruder position. So this option is optimized for speed, low travel, and acceptable
    strength.» Es el único sitio donde aparece la palabra «strength» junto a la elección de
    posición, así que es la fuente para el vínculo entre posición de costura y resistencia.
  - *Aligned* — idéntica a *Nearest* en la búsqueda de candidatos, pero elige el más
    cercano al punto de inicio de la capa anterior.
  - *Random* — «This will choose a different point for each layer, making the seam less
    noticeable at the cost of a less smooth surface (small zits scattered across the
    surface). **This option increases the overall strength of the print.**» Ojo: Prusa
    **sí** afirma que *Random* aumenta la resistencia, y Bambu **no** lo dice (Bambu sólo
    dice que *Random* produce zits). Es una asimetría real entre las dos fuentes y el
    cocinero tiene que decidir si se publica como contraste o si se deja cada afirmación
    con su casa.
  - *Rear* — «it will try to position the seam close to max Y (rear of the print bed) […]
    **This option is useful for objects that will be displayed with a specific
    orientation**». Es la respuesta de Prusa a la escena 3 del brief (costura en la cara
    que se ve y no se puede girar). Bambu llama a esta opción *Back* y da el mismo ejemplo
    (máscara de Iron Man).
- **La comparación entre modelos con y sin esquinas, que es la clave de la escena 1 del
  brief:** «This seam will be obvious if the object's shape is cylindrical, without any sharp
  corners» y, sobre *Random*, «when printing cylindrical shapes without any sharp edges, the
  Random seam position is a viable option». Prusa y Bambu coinciden: en una pieza cilíndrica
  la costura se nota, y no es un fallo del filamento.
- **Dos ajustes numéricos que no son cifras de material, sino de slicer:** «Seam gap
  distance […] When percents are used, the distance is derived from the nozzle diameter.
  Set to zero to disable this feature» (equivalente al *Seam Gap* de Bambu, que da el 15 %
  por defecto) y «Max scarf joint segment length […] The Z-height change is applied every
  1 mm by default». La guía no debe publicarlos como propiedades del material.
- **El dato que más pesa en el diferencial de este tema, y es el único con frase de
  «puntos débiles»:** en «Staggered inner seams» — «Having the inner seam not aligned with
  the perimeter seam **makes the part stronger, as the seams are weak spots for the
  prints**». Es la afirmación de la resistencia de la costura que el brief exige con dato
  («no una afirmación de que la costura debilita la pieza sin dato»): aquí hay dato, y la
  frase es de Prusa. La contraparte de Bambu (la costura como «unavoidable gap») está en la
  otra fuente.
- **Qué reduce la visibilidad de la costura según Prusa:** «Settings that affect the
  visibility of the seam are Linear Advance and Extrusion multiplier calibration […] you
  can try lowering the extrusion multiplier and calibrating the linear advance value to
  lower the visibility of the seam.» Son ajustes de flow y de presión avanzada, que son
  de las guías `flow-rate` y de calibración: aquí sólo se cita el hecho de que la costura
  se nota menos con esos ajustes calibrados, sin sus cifras.
- **El límite del modo que evita la costura, con sus condiciones:** «You can use the Vase
  mode to avoid the seam, but then you'll be limited to using only one perimeter and no
  infill.» Coincide con el modo *spiral vase* de Bambu y con las condiciones del gate 4 del
  brief (una sola pared exterior, sin relleno). La página *Spiral Vase* de Bambu es de la
  guía `relleno-patrones` y no se ha descargado.
- **El *scarf joint* de Prusa y el *scarf seam* de Bambu son la misma idea con nombres
  distintos**, y las páginas también se diferencian en las opciones de tipo: Prusa da
  *Nowhere* / *Contour* / *Everywhere* y Bambu da *None* / *Contour* / *Contour and Hole*.
  Prusa además dice dos cosas que Bambu no dice con la misma claridad: que el scarf joint
  «increases print time, and is less effective in sharp corners and overhangs» y que sólo
  se aplica por defecto en perímetros suaves («The Scarf joint is not applied on non-smooth
  surfaces as the seam can be hidden on curves and corners»). Con esto se puede publicar
  que el modo tiene contraindicaciones (esquinas vivas, voladizos, tiempo de impresión).
- **Erratas del original, conservadas:** «Using 0 in this setting disables the scarf
  joint» (el texto debería decir «Using 0»), y la falta de espacio en «the Nearest for
  finding». También el texto arranca con una línea en blanco al principio del bloque de
  código de la captura, que es el artefacto de la extracción y no del original.
- **Lo que NO está en esta fuente, por si el chef lo busca y no lo encuentra:** no hay
  ninguna cifra de retracción, ni de temperatura, ni de altura de capa; y la página no
  habla de la resistencia del material, sólo de la costura como «weak spot». Tampoco hay
  imagen con texto alternativo: todas las figuras quedan como `[imagen:]`.
- El texto original está en inglés y no lo he traducido.
