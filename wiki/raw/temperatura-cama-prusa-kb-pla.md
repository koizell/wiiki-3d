---
titulo: "PLA"
url: https://help.prusa3d.com/article/pla_2062
sitio: help.prusa3d.com
tipo: oficial
capturado: 2026-10-03
autor: Prusa Research
idioma: en
---

PLA

Basic info

PLA is one of the easiest materials to print. It is inexpensive and suitable (not only) for beginners. It's usually used for printing detailed models, figures, and quick prototypes that don't require high mechanical, chemical, or temperature resistance.

Recommended nozzle temperature: 215 °C for the first layer, 210 °C for other layers
Recommended bed temperature: 60 °C
Heatbed: Satin or Smooth PEI sheet will provide the best adhesion.

Description

PLA (Polylactic acid) is a plant-based polyester. PLA does not require a heated bed, can be printed fast and with low temperatures (melting point is somewhere around 175 °C). With PLA you can print both small, detailed models and large objects filling almost the entire print volume. Unlike some other filaments, PLA is not prone to significant warping. It is good for quick prototyping and creation of nice, low-cost models: concepts, prototypes, simple toys, jewelry, statues, etc. It is not suitable for technical and outdoor use. It doesn't resist high temperatures (it gets soft and deforms at temperatures over 60 °C), degrades under UV light and its mechanical resistance is also inferior - it breaks along layers or into shards upon impact. Layer adhesion is weaker compared to other materials. Sanding PLA is possible with sandpaper but needs water cooling (wet sanding).

Various sources claim that PLA is biologically degradable. The material is made from corn, sugar cane, or sugar beet and indeed can be decomposed, but only in specialized composting facilities where temperatures exceed 80 °C. It is definitely not a good idea to throw the PLA waste into your garden compost - the material will not disintegrate, plus you will contaminate the soil with plastic microparticles.

Although the PLA material itself is food-safe, we do not recommend it (or any other filament material) for printing dishes or other stuff that comes into direct contact with food. The main reason is tiny print layers/grooves that can support bacterial growth. If you still want 3D printed dishes or food containers, we suggest applying a special layer that seals the surface (food-safe coating) and printing with a stainless steel nozzle.

To compare supported material properties, see our material table.

Pros
✔ Low price
✔ Easy to print, suitable for beginners
✔ Good detail and low warping
✔ Suitable for large models

Cons
✖ Brittle and inflexible
✖ Low UV and temperature resistance
✖ Difficult post-processing

Tips for successful printing

Consider using a smooth PEI sheet

If you print with PLA on our Original Prusa i3 printers, you can print on either a smooth, powder-coated TXT or powder-coated satin sheet. However, the smooth sheet works better for printing parts that have a small contact area with the print surface. With a powder-coated sheet, you should move your live-Z lower: Filament must fill in the sheet texture. However, you need to be careful and not move the nozzle too low, or you will damage your sheet! Info for different printer users: PLA is printable not only on PEI surface, but also on glass, Kapton tape, or using a glue stick.

Try to adjust retractions for better results

PLA is sometimes prone to stringing and oozing - this can be reduced with proper retraction settings.

Chemical smoothing

Chemical smoothing of PLA is possible only in laboratory conditions - PLA can be dissolved in chloroform, hot benzene, or tetrahydrofuran. These are dangerous organic solvents that should be handled only by skilled lab technicians. Some of the PLA filaments can be also partially dissolved and glued with acetone (or you can simply glue it with superglue).

## Notas del recolector

- URL comprobada: 200. Título: «PLA | Prusa Knowledge Base». El artículo declara 12
  comentarios; no los he traído, porque son consultas de usuarios que no hacen falta
  para este artículo.

- **Es la fuente que responde a la pregunta literal del artículo**: alguien ve «Temp.
  cama: 60 °C» en el panel y quiere saber si esa cifra está bien. Aquí está el 60 °C de
  Prusa para PLA, con la chapa recomendada al lado —«Satin or Smooth PEI sheet»— y con
  el efecto de la chapa explicado: la lisa funciona mejor con poca superficie de
  contacto, y con la powder-coated hay que bajar el live-Z porque el filamento tiene
  que rellenar la textura.

  Contrasta con los 35–65 °C de Bambu y con los 50–60 °C de la tabla de la Knowledge
  Base. **Son tres cifras distintas para lo mismo**, y eso es contenido.

- **Dato que conviene al artículo por lo que explica, no por la cifra.** En la misma
  frase en la que da 60 °C dice que «PLA does not require a heated bed». O sea: los
  60 °C son una recomendación de Prusa Research, no una exigencia del material. Eso
  sostiene el punto sobre por qué `bedTemp` puede faltar en un G-code de PLA, o venir
  a 0.

- **Cuidado con el uso de la cifra de 60 °C como techo.** En la misma página aparece
  que la pieza «gets soft and deforms at temperatures over 60 °C». Ahí el 60 °C se
  refiere a **la pieza**, no a la cama, y es tentador leerlo como «no pases de 60 °C de
  cama». La regla de no subir la cama por encima de la temperatura de transición del
  material la da OrcaSlicer, con Tg menos 5–10 °C, y es **otra fuente**. Quien cocine
  no debe mezclarlas: son dos cosas que coinciden en el número y no en el sentido.

- Lo de «la chapa powder-coated hay que bajar el live-Z porque el filamento tiene que
  rellenar la textura» es el mismo efecto que el «Not recommended» de Bambu para la Cool
  Plate con el TPU, pero con distinta explicación. Merece una frase propia: dos
  fabricantes llegan a lo mismo por caminos distintos.

- Se han eliminado el menú lateral, el blog, el formulario de suscripción y los 12
  comentarios. Los pros y contras son una tabla de dos celdas en el original; se han
  puesto como lista, y es lo único que se ha reformateado en todo el fichero.

- Se ha dejado fuera «Sample prints», que es una tabla de enlaces a modelos. La
  composición química, la biodegradabilidad y el contacto con alimentos se quedan
  porque son el contexto de por qué PLA no necesita cama: son tres párrafos y el
  artículo los puede usar o descartar.

- No he traducido nada.
