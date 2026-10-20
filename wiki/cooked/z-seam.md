---
titulo: La costura Z
tema: z-seam
fuentes:
  - wiki/raw/z-seam-bambu-wiki-bambu-studio-seam.md
  - wiki/raw/z-seam-bambu-wiki-print-quality-seam.md
  - wiki/raw/z-seam-bambu-wiki-retraction-parameter.md
  - wiki/raw/z-seam-prusa-kb-seam-position.md
  - wiki/raw/z-seam-prusa-kb-seam-painting.md
  - wiki/raw/secar-filamento-bambu-wiki-common-print-quality-problem.md
cocinado: 2026-10-19
---

## Afirmaciones

### Qué es la costura y por qué no es un defecto

- La costura Z es el punto en el que **empieza y acaba cada perímetro de la capa**: «The seam is a kind of gap between the start and end points of each perimeter of the layer […] It leaves vertical seams on the surface of the model, **which is unavoidable in FDM 3D printing**». — [Bambu Lab Wiki – Seam settings](https://wiki.bambulab.com/en/software/bambu-studio/Seam), capturado 2026-10-19.
- La misma casa lo dice en la sección de calidad de impresión, con la definición más laxa: «In FDM 3D printing, a seam is formed at the junction of the starting point and the end point of **each layer** of printing, **which is a normal phenomenon**». — [Bambu Lab Wiki – Seam (print quality)](https://wiki.bambulab.com/en/filament-acc/filament/print-quality/seam), capturado 2026-10-19; texto idéntico en el apartado «Seam» de [Bambu Lab Wiki – Common print quality problems and solutions](https://wiki.bambulab.com/en/knowledge-sharing/common-print-quality-problem), capturado 2026-10-19.
- Prusa lo dice con su propia redacción: «each perimeter loop has to start and end somewhere. This start/endpoint creates a potentially visible vertical seam on the side of the object. **It's also commonly called zits, layer seams, or scars.**» — [Prusa Research KB – Seam position](https://help.prusa3d.com/article/seam-position_151069), capturado 2026-10-19.
- Y la formulación explícita de que **no se puede eliminar**: «With the FFF/FDM technology, **it is not possible to eliminate the seam**. It will always be somewhat visible. However, with well-tuned settings, it shouldn't be too noticeable.» — [Prusa Research KB – Seam position, íd.](https://help.prusa3d.com/article/seam-position_151069), 2026-10-19.
- **Corroboración cruzada:** las dos casas, con redactores distintos, afirman lo mismo — la costura es un fenómeno normal e inevitable en FDM, no un fallo. Cualquier texto de la guía que la presente como «problema a corregir» contradice a sus dos fuentes primarias.

### Cuándo se nota: depende de la forma de la pieza, no del material

- En superficies irregulares con vértices cóncavos y convexos la costura se esconde bien; en superficies circulares (cilindros) **no se puede esconder y será muy evidente**: «Seams can be well hidden on irregular surfaces such as those with concave and convex vertices. On the other hand, some models with circular surfaces (such as cylinders) will not be able to hide the seams, which will be very obvious.» — [Bambu Lab Wiki – Seam settings, íd.](https://wiki.bambulab.com/en/software/bambu-studio/Seam), 2026-10-19.
- Prusa coincide: «This seam will be obvious if the object's shape is cylindrical, without any sharp corners.» — [Prusa Research KB – Seam position, íd.](https://help.prusa3d.com/article/seam-position_151069), 2026-10-19.
- Consecuencia para la escena 1 del brief (cilindro con línea vertical): **las dos fuentes dicen que en esa forma la costura se nota y que eso es normal**, no que el filamento o la impresora estén mal. Ninguna fuente da un porcentaje de «cuánto se nota» ni una medida objetiva.

### Las cuatro posiciones de costura

Las dos casas implementan las mismas cuatro lógicas con nombres ligeramente distintos (Bambu: *Nearest / Aligned / Back / Random*; Prusa: *Nearest / Aligned / Random / Rear*). Prusa documenta además la ruta del ajuste: *Print settings → Layers and perimeters → Seam position*, y avisa de que «some options will only appear when Expert mode is selected». — [Prusa Research KB – Seam position, íd.](https://help.prusa3d.com/article/seam-position_151069), 2026-10-19.

**Nearest** — la misma búsqueda de candidatos en las dos casas: primero un vértice cóncavo sin voladizo, luego uno convexo sin voladizo, luego cualquier vértice sin voladizo, y por último uno con voladizo.
- Bambu: «it will preferentially select concave or convex non-overhanging vertices to make the seam position more hidden. **If your model has sharp corners, this will effectively make the seam invisible.** […] it selects from among the other candidate non-overhang vertices so that it is closest to the end of the previous print path. As a result, this option optimizes the traveling path to minimize the impact of filament stringing.» — [Bambu Lab Wiki – Seam settings, íd.](https://wiki.bambulab.com/en/software/bambu-studio/Seam), 2026-10-19.
- Prusa: «If your model has sharp corners, this will make the seam effectively **invisible**. […] The choice among the candidates is made so that the start point is the nearest to the previous extruder position. **So this option is optimized for speed, low travel, and acceptable strength.**» — [Prusa Research KB – Seam position, íd.](https://help.prusa3d.com/article/seam-position_151069), 2026-10-19.

**Aligned** — idéntico en las dos casas: misma lógica de candidatos que *Nearest*, pero eligiendo el más cercano al **punto de inicio de la capa anterior**, de modo que la costura queda alineada a lo largo de todo el objeto.
- Bambu: «The seam placing logic is the same as "Nearest" for finding the candidates, but it will choose the one that is nearest to the start point of the previous layer. This will ensure the seam is mostly aligned throughout the whole object.» — [Bambu Lab Wiki – Seam settings, íd.](https://wiki.bambulab.com/en/software/bambu-studio/Seam), 2026-10-19.
- Prusa: «This will use the same logic as the Nearest for finding the candidates, but it will choose the one that is nearest to the start point of the previous layer.» — [Prusa Research KB – Seam position, íd.](https://help.prusa3d.com/article/seam-position_151069), 2026-10-19.

**Back (Bambu) / Rear (Prusa)** — colocar la costura detrás de la pieza.
- Bambu: «The seam will be set behind the model. If you want to get a smooth surface in the front, such as an Iron Man mask, it will be a good choice.» — [Bambu Lab Wiki – Seam settings, íd.](https://wiki.bambulab.com/en/software/bambu-studio/Seam), 2026-10-19.
- Prusa: «it will try to position the seam close to max Y (rear of the print bed). It still tries to avoid overhangs and tries to put the seams in the corners. **This option is useful for objects that will be displayed with a specific orientation.**» — [Prusa Research KB – Seam position, íd.](https://help.prusa3d.com/article/seam-position_151069), 2026-10-19.

**Random** — posición distinta en cada capa.
- Bambu: «Random seams will select a different location on each layer to place the seams, making the seams look less uniform and less obvious than "aligned" or "back". **But it will cause some "zits" effects on the surface of the model.**» — [Bambu Lab Wiki – Seam settings, íd.](https://wiki.bambulab.com/en/software/bambu-studio/Seam), 2026-10-19.
- Prusa: «This will choose a different point for each layer, making the seam less noticeable at the cost of a less smooth surface (small zits scattered across the surface). **This option increases the overall strength of the print.**» — [Prusa Research KB – Seam position, íd.](https://help.prusa3d.com/article/seam-position_151069), 2026-10-19.
- Prusa añade cuándo conviene: «It makes little sense to use Random seam position on models with corners/sharp edges; it's much better to use Nearest or Aligned in such cases. On the other hand, **when printing cylindrical shapes without any sharp edges, the Random seam position is a viable option.**» — íd.

### Seam gap: cuánto se interrumpe el perímetro para disimular la costura

- **Bambu Studio:** para que la costura se vea menos, la extrusión **se detiene por adelantado** al imprimir las paredes interior y exterior, dejando un hueco en la posición de la costura para acomodar el material sobrante. Esa longitud se expresa **como porcentaje del diámetro actual de la boquilla**, y **el valor por defecto es 15 %**. — [Bambu Lab Wiki – Seam settings, íd.](https://wiki.bambulab.com/en/software/bambu-studio/Seam), 2026-10-19.
- **PrusaSlicer:** «The distance between the endpoints of a closed loop perimeter. **Positive values will shorten and interrupt the loop slightly to reduce the seam. Negative values will extend the loop, causing the endpoints to overlap slightly.** When percents are used, the distance is derived from the nozzle diameter. **Set to zero to disable this feature.**» — [Prusa Research KB – Seam position, íd.](https://help.prusa3d.com/article/seam-position_151069), 2026-10-19.
- Los dos ajustes tienen **signo**: en Prusa el valor puede ser negativo para solapar los extremos en vez de interrumpirlos; en Bambu la página no describe el signo. Ninguna de las dos fuentes da un valor por defecto en milímetros, y ninguna lo da como propiedad del material.

### Wipe speed (ajuste de la costura, con mecanismo en otra guía)

- En la página de costura de Bambu, «Seam Position, Seam Gap, Wipe Speed, and Role-Based Wipe Speed apply to all seam types» (el resto de ajustes de esa página son específicos del *scarf seam*). — [Bambu Lab Wiki – Seam settings, íd.](https://wiki.bambulab.com/en/software/bambu-studio/Seam), 2026-10-19.
- El wipe speed se expresa como porcentaje de la velocidad de desplazamiento: «**setting the wiping speed to 80% means that the wiping speed = the traveling speed * 80%.**» — íd.
- La página no describe qué es el «Role-Based Wipe Speed»: sólo lo nombra. Cualquier texto de la guía sobre ese ajuste sería invención.

### El mecanismo: por qué la costura se nota (el cambio de capa y la retracción)

- La retracción «usually occurs before the traveling, and **at the end of the traveling, the filament will be reloaded to the hot end**, allowing it to be extruded properly to continue printing». Ese punto de recarga del filamento —donde acaba una capa y empieza la siguiente— es el que el lector ve como costura. — [Bambu Lab Wiki – Retraction](https://wiki.bambulab.com/en/software/bambu-studio/parameter/retraction), capturado 2026-10-19.
- Existe un interruptor que fuerza la retracción justo en ese punto: «**Retract on layer change** — Enable this will force the retraction on layer changes.» — [Bambu Lab Wiki – Retraction, íd.](https://wiki.bambulab.com/en/software/bambu-studio/parameter/retraction), 2026-10-19.
- La página de costura de Bambu conecta explícitamente la retracción con la costura: «**When retraction, a short wiping is usually performed to clean the nozzle** (details can be found in Retraction | Bambu Lab Wiki)». — [Bambu Lab Wiki – Seam settings, íd.](https://wiki.bambulab.com/en/software/bambu-studio/Seam), 2026-10-19.
- **La única mención literal de «Z-seam» en las páginas de Bambu** está en el parámetro «Retract amount before wipe»: «This is the length of fast retraction before a wipe, this value is the percentage relative to retraction length. **The default value is 0. If it doesn't retract before wiping, the Z-seam effect on the outer wall will be better** (in the case of the default inner-outer wall printing sequence)». Es decir: **no retraer antes de limpiar mejora el acabado de la costura en la pared exterior**, y el resultado depende del orden de impresión por defecto (pared interior-exterior), o sea de la configuración, no del material. — [Bambu Lab Wiki – Retraction, íd.](https://wiki.bambulab.com/en/software/bambu-studio/parameter/retraction), 2026-10-19.
- El «wipe while retracting» mueve la boquilla por el último camino de extrusión mientras retrae, para limpiar el material fugado de la boquilla y minimizar los blobs al imprimir una pieza nueva tras un desplazamiento. — íd.
- **Alcance real de la retracción, según su propia página:** existe para evitar el *stringing* y el *oozing*, no para la costura («the retraction is to prevent stringing and oozing from affecting the appearance of the model»). — íd.
- **Límite material de la retracción, con el que la guía puede dar forma a su variable `material`:** con materiales flexibles como el TPU la retracción «may affect the diameter of the filament and cause it to shrink, leading to clogging and other extrusion problems», mientras que «for all other materials such as PLA, ABS, and PETG, the printing effect is better when the retraction is enabled». — [Bambu Lab Wiki – Retraction, íd.](https://wiki.bambulab.com/en/software/bambu-studio/parameter/retraction), 2026-10-19.

### Scarf seam (Bambu) / scarf joint (Prusa): la misma idea con dos nombres

**Definición y alcance**
- Bambu Studio introdujo el *scarf seam* en la **versión 1.9**: «which in most cases can reduce the visibility of seams. This feature changes the routing of the seam, **making it overlap like a scarf**. Segmented flow control and wipe speed control, improve riveting to weaken the seam.» — [Bambu Lab Wiki – Seam settings, íd.](https://wiki.bambulab.com/en/software/bambu-studio/Seam), 2026-10-19. («riveting» es una traducción automática de *joining* en el original; así está en la fuente.)
- Desde la **versión 1.10** se puede decidir por filamento si se activa el *scarf seam*, en los ajustes de filamento. — íd.
- Prusa: «The Scarf seams **overlap extrusions at the end and start of the perimeter loop**, hiding visible seams on smooth perimeters. […] **This setting reduces visible z seams, which is especially useful in curved surfaces, and improves overall part strength.**» — [Prusa Research KB – Seam position, íd.](https://help.prusa3d.com/article/seam-position_151069), 2026-10-19.
- Se puede visualizar el efecto en la vista previa del impresora con las opciones *Volumetric flow rate (mm³/s)* o *Actual volumetric flow rate (mm³/s)* de la leyenda de la vista previa. — [Prusa Research KB – Seam position, íd.](https://help.prusa3d.com/article/seam-position_151069), 2026-10-19.

**Tipos disponibles (no son los mismos conjuntos)**
- Bambu, en *Quality → Override filament scarf seam setting*: **None / Contour / Contour and Hole**. — [Bambu Lab Wiki – Seam settings, íd.](https://wiki.bambulab.com/en/software/bambu-studio/Seam), 2026-10-19.
- Prusa: **Nowhere** (desactivado) / **Contour** (sólo en el contorno del objeto) / **Everywhere** (en el perímetro exterior y en las paredes interiores que rodean los huecos de la pieza). — [Prusa Research KB – Seam position, íd.](https://help.prusa3d.com/article/seam-position_151069), 2026-10-19.

**Parámetros de la costura bufanda**
- Bambu *Scarf start height*: altura Z a la que la boquilla empieza a imprimir la pared; se puede expresar en milímetros o como porcentaje de la altura de capa actual («10%» = el inicio de la bufanda está al 10 % de la altura de capa). «**If the starting height is set to 100%, it will become an ordinary seam.**» — [Bambu Lab Wiki – Seam settings, íd.](https://wiki.bambulab.com/en/software/bambu-studio/Seam), 2026-10-19.
- Prusa *Scarf start height*: «vertical offset for the start of the scarf ramp, specified as a fraction of the current layer. **A value of 0 means the scarf begins at the same height as the current layer and ramps up to the full layer height over the scarf length.**» — [Prusa Research KB – Seam position, íd.](https://help.prusa3d.com/article/seam-position_151069), 2026-10-19.
- Bambu *Scarf slope gap*: al activarlo, la pared interior se recorta para acomodar el material sobrante; expresado en porcentajes, la holgura se calcula multiplicando un factor por un porcentaje del diámetro de la boquilla. — [Bambu Lab Wiki – Seam settings, íd.](https://wiki.bambulab.com/en/software/bambu-studio/Seam), 2026-10-19.
- Bambu *Scarf length*: longitud de la costura bufanda; **la costura bufanda se desactiva cuando la longitud es 0**; si está activo «scarf around the entire wall», el ajuste de longitud deja de funcionar. — íd.
- Prusa *Scarf joint length*: «horizontal length of the scarf ramp transition. **Using 0 in this setting disables the scarf joint.**» — [Prusa Research KB – Seam position, íd.](https://help.prusa3d.com/article/seam-position_151069), 2026-10-19.
- Bambu *Scarf steps*: número mínimo de secciones en las que se divide la rampa; «some seam positions cannot be accurately divided into the set number of steps, so **the actual scarf steps ≥ the set scarf steps**». — [Bambu Lab Wiki – Seam settings, íd.](https://wiki.bambulab.com/en/software/bambu-studio/Seam), 2026-10-19.
- Prusa *Max scarf joint segment length*: define cómo se divide la bufanda; «The Z-height change is applied every 1 mm by default. If you use a larger value, there will be fewer points where the Z-height changes». — [Prusa Research KB – Seam position, íd.](https://help.prusa3d.com/article/seam-position_151069), 2026-10-19.
- Bambu *Scarf joint for inner walls*: al activarlo, las paredes interiores también adoptan costura bufanda; **esta opción viene activada por defecto**. — [Bambu Lab Wiki – Seam settings, íd.](https://wiki.bambulab.com/en/software/bambu-studio/Seam), 2026-10-19.
- Prusa *Scarf joint on inner perimeters*: «The scarf seams are usually only added to external perimeters. Checking this option adds the scarf seam on the inner perimeters.» — [Prusa Research KB – Seam position, íd.](https://help.prusa3d.com/article/seam-position_151069), 2026-10-19.

**Cuándo se aplica (y cuándo no): la aplicación inteligente de Bambu**
- Bambu tiene una selección automática: «selects whether to apply scarf seams based on the characteristics of the model. **When the overhang of the seam position is too large, and when the angle of the seam position is small enough to conceal the seam, it will not use scarf seams. When the wall does not have a suitable sharp angle that traditional seams cannot effectively conceal, then scarf seams are applied.** Turn off this option to apply scarf seams to all areas.» — [Bambu Lab Wiki – Seam settings, íd.](https://wiki.bambulab.com/en/software/bambu-studio/Seam), 2026-10-19.
- Bambu *Scarf application angle threshold*: las costuras bufanda **no se activan por defecto cuando la superficie del modelo tiene ángulos vivos**, porque ahí la costura se puede esconder directamente; el umbral es configurable y decide si se aplica. — íd.
- Prusa *Scarf joint only on smooth perimeters* (opción por defecto): «**The Scarf joint is not applied on non-smooth surfaces as the seam can be hidden on curves and corners of the object.** If this option is unchecked, the Scarf joint will also be applied to these non-smooth surfaces.» — [Prusa Research KB – Seam position, íd.](https://help.prusa3d.com/article/seam-position_151069), 2026-10-19.

**Contraindicaciones escritas por las propias fuentes**
- Bambu *Scarf around entire wall*: extender la bufanda a toda la pared «**requires caution as it may result in using a smaller extrusion amount for the entire perimeter, which may cause poor adhesion between lines and result in surface defects**». — [Bambu Lab Wiki – Seam settings, íd.](https://wiki.bambulab.com/en/software/bambu-studio/Seam), 2026-10-19.
- Bambu *Seam placement away from overhangs (experimental)*: «Due to the small extrusion of the scarf seam, **the lines may be difficult to bond properly in the hanging area**. To ensure normal printing of the appearance surface, this option should only be applied to areas with low overhang degrees. Ordinary seams are still used in areas with high overhang degrees.» — íd.
- Prusa: «**Note that using scarf seams increases print time, and is less effective in sharp corners and overhangs.**» — [Prusa Research KB – Seam position, íd.](https://help.prusa3d.com/article/seam-position_151069), 2026-10-19.

### Colocación manual de la costura (seam painting)

- Bambu: la página de ajustes de costura incluye una función de pintado manual: «**Sometimes the auto seam position may be not ideal, you can customize the seam position by manually painting the method.**» — [Bambu Lab Wiki – Seam settings, íd.](https://wiki.bambulab.com/en/software/bambu-studio/Seam), 2026-10-19.
- Prusa: «Starting from **PrusaSlicer version 2.3**, it is possible to paint on seams on your model. The seam painting tool provides more detailed control over the seam placement. The tool is accessible from the left toolbar, and it is only shown in Advanced and Expert modes. After clicking on the icon, the user can paint '**Seam enforcers**' or '**Seam blockers**' on the model.» — [Prusa Research KB – Seam painting](https://help.prusa3d.com/article/seam-painting_168620), capturado 2026-10-19.
- La lógica de colocación de Prusa, que es el dato que hace útil la herramienta: «**If there is a seam enforcer, it always places seams into the enforcer area. If there is a blocker, its area is excluded from possible seam candidates. The Nearest, Rear, and Random Seam position options are still respected. When the Aligned option is active and enforcers are used, the seam is placed in the middle of the enforcer area.**» — [Prusa Research KB – Seam painting, íd.](https://help.prusa3d.com/article/seam-painting_168620), 2026-10-19.
- **Consecuencia para el diferencial:** el pintado manual **no anula** la posición elegida, la restringe. Elegir el modo de posición y colocar la costura a mano son cosas distintas, no alternativas.

### Qué se puede hacer para que la costura se note menos

**Bambu, lista de cuatro métodos de su sección de calidad de impresión** — [Bambu Lab Wiki – Seam (print quality), íd.](https://wiki.bambulab.com/en/filament-acc/filament/print-quality/seam), 2026-10-19; texto idéntico en [Common print quality problems and solutions, íd.](https://wiki.bambulab.com/en/knowledge-sharing/common-print-quality-problem), 2026-10-19:
1. Poner el número de perímetros de pared en **3**.
2. **Evitar imprimir varias piezas en la misma plato** para reducir el desplazamiento del cabezal.
3. **Subir la temperatura de boquilla y bajar la velocidad de impresión de la pared exterior** (la página lo dice sin cifras: «Appropriately raise the nozzle temperature and reduce the printing speed of the outer wall»).
4. Activar el modo **Spiral vase** para «some special models», con las condiciones del apartado siguiente.

**Prusa, qué reduce la visibilidad de la costura** — [Prusa Research KB – Seam position, íd.](https://help.prusa3d.com/article/seam-position_151069), 2026-10-19:
- «Settings that affect the visibility of the seam are **Linear Advance and Extrusion multiplier calibration**. Original Prusa profiles have these settings already tuned, but if you're fine-tuning a custom profile, you can try lowering the extrusion multiplier and calibrating the linear advance value to lower the visibility of the seam.»
- Prusa no da cifras: remite a la calibración de flow y de presión avanzada, que pertenecen a otras guías.

### La resistencia de la pieza y la costura

- Prusa es la única de las dos casas que aporta un dato de resistencia, y lo hace en dos sitios distintos: «Having the inner seam not aligned with the perimeter seam **makes the part stronger, as the seams are weak spots for the prints**» (apartado *Staggered inner seams*, que desplaza las costuras interiores hacia atrás según su profundidad formando un zigzag). — [Prusa Research KB – Seam position, íd.](https://help.prusa3d.com/article/seam-position_151069), 2026-10-19.
- La otra mitad de ese mismo dato: el modo *Random* «**increases the overall strength of the print**». — íd.
- Bambu **no dice nada de resistencia** en ninguna de sus tres páginas sobre costura: su marco es el de la costura como «gap» inevitable. El redactor no debe atribuirle esa afirmación.

### Spiral vase: el único modo que evita la costura, y lo que cuesta

- Qué hace: con el modo activo, «the model will be printed in a linear spiral, and **the seams will only appear on the bottom shell layers, and not on the outer walls at all**». — [Bambu Lab Wiki – Seam (print quality), íd.](https://wiki.bambulab.com/en/filament-acc/filament/print-quality/seam), 2026-10-19.
- **Sus condiciones, escritas por la fuente:** «the model printed by this mode has **only a single outer wall, no infill and top shell**, and **only applies to some simple models** (complex models cannot be completed with a single line, resulting in some suspended sections when slicing)». — íd.
- Prusa, con su redacción equivalente: «You can use the Vase mode to avoid the seam, but then **you'll be limited to using only one perimeter and no infill**». — [Prusa Research KB – Seam position, íd.](https://help.prusa3d.com/article/seam-position_151069), 2026-10-19.
- El modo no es de esta guía: la página «Spiral Vase | Bambu Lab Wiki» que ambas fuentes enlazan es de la guía `relleno-patrones` y no se ha descargado. Lo que aquí se publica es el **alcance y las condiciones**, con su fuente.

## Contradicciones

### Seam gap: el 15 % de Bambu y la distancia de Prusa no son la misma cifra

- Bambu: la extrusión se detiene por adelantado y el hueco «is expressed as a percentage of the current nozzle diameter. **The default value is 15%.**» — [Bambu Lab Wiki – Seam settings](https://wiki.bambulab.com/en/software/bambu-studio/Seam), 2026-10-19.
- Prusa: distancia entre los extremos de un perímetro cerrado, con **signo** (positivo interrumpe el lazo, negativo lo prolonga para solapar los extremos), «derived from the nozzle diameter», y **0 desactiva la función**. — [Prusa Research KB – Seam position](https://help.prusa3d.com/article/seam-position_151069), 2026-10-19.
- **Se contradicen en la presentación, no necesariamente en el valor.** Son dos parametrizaciones distintas de dos slicers distintos: Bambu da un **porcentaje por defecto** (15 %) y no describe el signo; Prusa da una **distancia con signo y unidad configurable** y no publica un valor por defecto. El 15 % de Bambu no es «el» seam gap de la wiki: es el default de su slicer. **El redactor no debe fundir las dos en un único número ni traducir el 15 % a milímetros sin hacerlo como una cuenta propia y explícita.**

### Random: el coste en ambas casas, la resistencia sólo en una

- Bambu: *Random* hace la costura menos uniforme y menos llamativa, «**but it will cause some "zits" effects on the surface of the model**». — [Bambu Lab Wiki – Seam settings, íd.](https://wiki.bambulab.com/en/software/bambu-studio/Seam), 2026-10-19.
- Prusa: *Random* hace la costura menos perceptible «at the cost of a less smooth surface (small zits scattered across the surface)» y además «**increases the overall strength of the print**». — [Prusa Research KB – Seam position, íd.](https://help.prusa3d.com/article/seam-position_151069), 2026-10-19.
- **No se contradicen: se complementan, y la guía no debe fusionarlas.** La consecuencia práctica es la misma en las dos casas (menos línea visible, más puntos en la superficie), pero la bonificación de resistencia es un dato de Prusa y sólo de Prusa. **El redactor tiene que decir «según Prusa» al hablar de resistencia, y no encadenar «*Random* → zits → más resistencia» como si las dos fuentes lo dijeran.**

### El alcance del scarf: lo que cada casa dice que es y lo que lo contraindica

- Bambu: la costura bufanda reduce la visibilidad de las costuras «in most cases», se aplica automáticamente **sólo donde la costura tradicional no se puede esconder**, y su contraindicación es de **adhesión**: extenderla a toda la pared «may result in using a smaller extrusion amount for the entire perimeter, which may cause poor adhesion between lines and result in surface defects»; y en voladizos, «the lines may be difficult to bond properly in the hanging area». — [Bambu Lab Wiki – Seam settings, íd.](https://wiki.bambulab.com/en/software/bambu-studio/Seam), 2026-10-19.
- Prusa: la costura bufanda «**reduces visible z seams, which is especially useful in curved surfaces, and improves overall part strength**», pero «**increases print time, and is less effective in sharp corners and overhangs**». — [Prusa Research KB – Seam position, íd.](https://help.prusa3d.com/article/seam-position_151069), 2026-10-19.
- **El matiz es el alcance, y las dos fuentes son complementarias:** Bambu publica una advertencia de calidad superficial y adhesión; Prusa publica un coste de tiempo y una menor eficacia en esquinas y voladizos, y además una ganancia de resistencia. Ninguna de las dos dice que el scarf sea «la solución». **El redactor debe publicar cada contraindicación con su casa, y no presentar el scarf como un ajuste sin coste.**

### Spiral vase: «elimina la costura» frente a «sólo la quita de la pared exterior»

- Bambu: con el modo activo «**the seams will only appear on the bottom shell layers, and not on the outer walls at all**» — la costura desaparece de las paredes exteriores, pero sigue estando en las capas del fondo. — [Bambu Lab Wiki – Seam (print quality), íd.](https://wiki.bambulab.com/en/filament-acc/filament/print-quality/seam), 2026-10-19.
- Prusa: «**You can use the Vase mode to avoid the seam**, but then you'll be limited to using only one perimeter and no infill». — [Prusa Research KB – Seam position, íd.](https://help.prusa3d.com/article/seam-position_151069), 2026-10-19.
- **La diferencia es de alcance y ninguna de las dos dice que la costura desaparezca de la pieza.** Bambu es más precisa: la pared exterior queda sin costura, el fondo no. **El redactor debe mantener la formulación de Bambu (la costura se va de la pared exterior, no de la pieza) y no escribir que el modo «elimina la costura».**

### Granularidad de la definición: «cada capa» o «cada perímetro»

- Bambu, sección de calidad de impresión: «a seam is formed at the junction of the starting point and the end point of **each layer** of printing». — [Bambu Lab Wiki – Seam (print quality), íd.](https://wiki.bambulab.com/en/filament-acc/filament/print-quality/seam), 2026-10-19.
- Bambu, página de ajustes: «a kind of gap between the start and end points of **each perimeter of the layer**». — [Bambu Lab Wiki – Seam settings, íd.](https://wiki.bambulab.com/en/software/bambu-studio/Seam), 2026-10-19.
- Prusa: «**each perimeter loop** has to start and end somewhere». — [Prusa Research KB – Seam position, íd.](https://help.prusa3d.com/article/seam-position_151069), 2026-10-19.
- **No es contradicción sino dos granularidades de lo mismo, y la diferencia importa.** La definición fina (por perímetro) es la que explica que en una pieza con varios perímetros por capa haya más de un punto de costura por capa. **El redactor debe usar la formulación por perímetro (Bambu Studio y Prusa), que es la más precisa, y no alternar con «cada capa» sin hacerlo de forma consciente.**

### Nomenclatura: los mismos modos con nombres distintos en cada casa

- La cuarta posición se llama **Back** en Bambu y **Rear** en Prusa; el modo de buffanda se llama **scarf seam** en Bambu y **scarf joint** en Prusa; los tipos del modo de buffanda no coinciden: Bambu da **None / Contour / Contour and Hole**, Prusa da **Nowhere / Contour / Everywhere**. — [Bambu Lab Wiki – Seam settings](https://wiki.bambulab.com/en/software/bambu-studio/Seam), 2026-10-19; [Prusa Research KB – Seam position](https://help.prusa3d.com/article/seam-position_151069), 2026-10-19.
- **No son contradicciones: son dos vocabularios para la misma función, pero los conjuntos de opciones no son equivalentes** (Bambu tiene un tipo «Contour and Hole» que Prusa no tiene; Prusa tiene un «Everywhere» que cubre «Contour and Hole» más las paredes interiores de los huecos). **El redactor debe publicar las dos listas con su nombre original y no traducirlas a un menú común.**

## Sin respaldo

Ninguna afirmación de este tema procede de una fuente secundaria: las seis fuentes son documentación oficial del fabricante (wiki de Bambu Lab y base de conocimiento de Prusa Research). No hay foro, blog ni wiki de comunidad en este lote, así que **no hay ninguna afirmación que haya que marcar por venir de un foro**.

Lo que sí hay son afirmaciones que **sólo hace una de las dos casas**, y que por tanto no se pueden presentar como propiedades generales de la costura ni atribuir al otro slicer. Se listan aquí con su marca:

- El modo *Random* **aumenta la resistencia total de la impresión**. **[UNA SOLA CASA — Prusa Research KB, sin corroboración de Bambu]** — [Prusa Research KB – Seam position](https://help.prusa3d.com/article/seam-position_151069), 2026-10-19.
- **Las costuras son puntos débiles de la impresión** («the seams are weak spots for the prints»), y de ahí que descuadrar la costura interior de la exterior haga la pieza más fuerte. **[UNA SOLA CASA — Prusa Research KB, sin corroboración de Bambu]** — íd.
- La costura bufanda **mejora la resistencia de la pieza** («improves overall part strength»). **[UNA SOLA CASA — Prusa Research KB, sin corroboración de Bambu]** — íd.
- La costura bufanda **aumenta el tiempo de impresión**. **[UNA SOLA CASA — Prusa Research KB, sin corroboración de Bambu]** — íd.
- **No retraer antes de limpiar** (parámetro «Retract amount before wipe» a 0, que es su valor por defecto) **mejora el Z-seam en la pared exterior**, en el orden de impresión por defecto interior-exterior. **[UNA SOLA CASA — Bambu Lab Wiki, sin corroboración de Prusa]** — [Bambu Lab Wiki – Retraction](https://wiki.bambulab.com/en/software/bambu-studio/parameter/retraction), 2026-10-19.
- El interruptor **«Retract on layer change»** fuerza la retracción en cada cambio de capa. **[UNA SOLA CASA — Bambu Lab Wiki, sin corroboración en las fuentes de Prusa de este lote]** — íd.
- El modo *Scarf around entire wall* **puede provocar mala adhesión entre líneas y defectos de superficie** por usar una menor extrusión en todo el perímetro. **[UNA SOLA CASA — Bambu Lab Wiki, sin corroboración de Prusa]** — [Bambu Lab Wiki – Seam settings](https://wiki.bambulab.com/en/software/bambu-studio/Seam), 2026-10-19.
- El ajuste **«Role-Based Wipe Speed»** aplica a todos los tipos de costura; la fuente **no lo describe** en ninguna de las páginas descargadas. **[SIN DESCRIPCIÓN EN LA FUENTE — no publicable]** — íd.
- La página de Prusa **no dice nada de la resistencia del material**: su marco es la costura como «weak spot» de la pieza, no una propiedad del filamento. Cualquier frase sobre «materiales que resisten peor la costura» sería invención.

## Tirado

- **Navegación, migas de pan, botones y finales de página** en las seis fuentes: «End Notes», «We hope this guide has provided clear and practical support», «If the issue remains unresolved, please submit a support ticket…», «You can also visit Bambu AI…», menús de Prusa, y cualquier enlace de «compartir» o «suscríbete».
- **Contenido duplicado: la sección «Seam» de `secar-filamento-bambu-wiki-common-print-quality-problem.md` es, párrafo por párrafo, el mismo texto que `z-seam-bambu-wiki-print-quality-seam.md`.** Se conserva una sola afirmación y la otra fuente se cita como corroboración, no como fuente independiente.
- **Vídeo y figuras.** El apartado «Video Guide» de la página de costura de Bambu no tiene texto (sólo un vídeo incrustado, no transcrito). Todas las figuras quedan como `[imagen:]` o como nombre de fichero (`seam_types.png`, `scarf_seam_setting.png`, `seam_type.png`, `none.png`, `contour_option.png`, `contour2.png`, `scarf_start_height.png`, `scarf_slope_gap.png`, `scarf_length.png`, `scarf_seam_overhangs.png`, `angle.png`, `angle_threshold.png`, `filament_settings.png`). **Una imagen no es una fuente**: no se ha extraído ningún dato de ellas ni se les da como respaldo.
- **Cifras de retracción y de hotend que pertenecen a `stringing-retraccion`:** el límite de 5 mm del Z hop, el umbral de distancia de viaje (con sus ejemplos de 1 mm y 3 mm en figura), la velocidad de retracción y de derretracción, la longitud de retracción, la湿度 del filamento (→ `secar-filamento`) y el stringing/oozing como síntomas de la retracción. De la página de retracción sólo se conserva aquí **el mecanismo** (recarga del filamento al final del desplazamiento, «Retract on layer change») y la mención literal al Z-seam.
- **Ajustes de flow que pertenecen a `flow-rate`:** el *extrusion multiplier* y el *linear advance* se citan sólo como «afectan a la visibilidad de la costura», sin cifras ni sus procedimientos de calibración.
- **Número de perímetros de pared**: el «3 perímetros» que recomienda Bambu pertenece a `paredes-y-perimetros`; aquí sólo se publica como uno de los cuatro métodos que la casa da para la costura, sin sus cifras.
- **Temperatura de boquilla y velocidad de pared exterior**: Bambu las da sin cifras («appropriately raise… reduce…»); no se ha publicado ninguna cifra inventada, y las que existen en otras guías (`temperatura-hotend`, `paredes-y-perimetros`) no se repiten aquí.
- **Página «Spiral Vase | Bambu Lab Wiki»**: ambas fuentes la enlazan, pero no se ha descargado porque es de la guía `relleno-patrones`. De ella sólo se conserva lo que las dos fuentes descargadas dicen sobre sus condiciones.
- **Detalles de uso del pintado de Prusa que no son afirmaciones del tema**: tipos de cursor (esférico por defecto / circular), «Clipping of view» para alcanzar zonas ocultas y los atajos de ratón. Se conservan en la fuente, pero no se publican: son ayuda de uso de la herramienta, no propiedades de la costura.
- **Erratas y rarezas del original, conservadas en la fuente pero no reproducidas como redactadas:** «bottom shell ayers» (por *layers*), el punto y coma chino «。」 de la wiki de Bambu, «Segmented flow control and wipe speed control, improve riveting to weaken the seam» (traducción automática), «The length of the scarf seam and the scarf seam will be disabled when the length is 0», «Shift + Left moue button», «the Nearest for finding», «Using 0 in this setting disables the scarf joint».
- **Fechas de las páginas** (creación y última actualización, y firma del autor) quedan en las cabeceras de `wiki/raw/`: no son parte del tema.

## Relaciones

| Concepto | Se relaciona con | Cómo |
|---|---|---|
| costura Z | retracción | la retracción recarga el filamento al final del desplazamiento, justo en el punto donde acaba una capa y empieza la siguiente; ese es el punto que se ve como costura |
| retracción | stringing / oozing | el alcance real de la retracción es evitar hilos y blobs, no la costura: son dos síntomas distintos con la misma causa de fondo |
| retracción | TPU | con materiales flexibles la retracción encoge el diámetro del filamento y puede atascar; con PLA, ABS y PETG el resultado es mejor con ella activada |
| costura Z | forma de la pieza | en superficies con vértices cóncavos y convexos la costura se esconde; en cilindros no se puede esconder y se ve mucho |
| costura Z | posición de costura (*Nearest / Aligned / Back / Random*) | la posición decide dónde cae la línea visible; *Nearest* y *Aligned* la alinean con esquinas, *Back*/*Rear* la esconde detrás, *Random* la dispersa capa a capa |
| costura Z | resistencia de la pieza | según Prusa, las costuras son puntos débiles; descuadrar la costura interior de la exterior o usar *Random* aumenta la resistencia |
| *Random* | zits | el precio de dispersar la costura es una superficie menos suave con pequeños bultos repartidos (ambas casas lo dicen) |
| costura Z | seam gap | el hueco que se deja en el perímetro para disimular la costura: 15 % del diámetro de boquilla en Bambu, distancia con signo en Prusa |
| seam gap | calibre / extrusión | acortar o solapar el lazo cambia la cantidad de material depositada en el punto de la costura |
| scarf seam / scarf joint | forma de la pieza | se aplica donde la costura tradicional no se puede esconder: en ángulos vivos la costura se esconde sola y el scarf no se activa |
| scarf seam / scarf joint | adhesión entre líneas | extenderla a toda la pared reduce la extrusión de todo el perímetro y puede dejar mala adhesión (contraindicación de Bambu) |
| scarf seam / scarf joint | tiempo de impresión | el scarf joint aumenta el tiempo de impresión (dato de Prusa) |
| costura Z | spiral vase / vase mode | único modo que quita la costura de la pared exterior; a cambio, una sola pared, sin relleno ni tapa superior, y sólo en modelos simples |
| spiral vase | relleno y paredes | el modo es de la guía `relleno-patrones`; aquí sólo se publica su alcance |
| seam painting | posición de costura | el pintado manual **restringe** la posición elegida, no la anula: *Nearest*, *Rear* y *Random* se siguen respetando, y con *Aligned* la costura va al centro del *enforcer* |
| seam painting |orientation / cara visible | es la herramienta para decidir el punto exacto de la costura cuando la cara que se ve no tiene esquinas donde esconderla |
| costura Z | Elephant's foot | un bulto en la base, justo donde empieza la primera capa, no es la costura: es `elephant-foot` |
| costura Z | separación entre capas | una línea vertical constante es la costura; una capa que se suelta es `separaciones-entre-capas` |
| costura Z | warping | una pieza que se despega de la cama y se deforma no es un problema de costura: es `warping-pla` |
| costura Z | orden de impresión de paredes | con el orden por defecto interior-exterior la primera extrusión de cada capa cae en la superficie visible; `paredes-y-perimetros` es la dueña de ese orden y de sus efectos |
| costura Z | flow y presión | con *linear advance* y *extrusion multiplier* calibrados la costura se nota menos (dato de Prusa; las cifras son de `flow-rate`) |
| lineal Advance / calibración | flow-rate | las cifras de flow y de presión avanzada no se repiten aquí: viven en `flow-rate` |
