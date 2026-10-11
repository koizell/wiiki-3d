---
titulo: "First layer issues"
url: https://help.prusa3d.com/article/first-layer-issues_1804
sitio: help.prusa3d.com
tipo: oficial
capturado: 2026-10-03
autor: Prusa Research
idioma: en
---

First layer issues

This is by far the most common 3D printing problem, and probably the first one you may encounter. The first layer is the essential one because it is the base of the printed object. Therefore, if it isn’t perfect, the chance of print failure increases. Many common 3D printing problems stem from a poor first layer. There are a couple of things that can go wrong when printing your first layer, so let’s take a look at what can be done to avoid these problems.

The print surface should be regularly maintained to achieve optimal printing quality and minimize the chance of failed prints. It's an easy procedure, so let's take a look at our tips and recommendations.

How to prepare your print surface

If you don't touch the print surface with your hands or dirty tools, then you don't have to clean it before every print. Clean your tools the same way you would the bed, and you will be able to start your print right away.

Isopropyl alcohol - smooth, satin, textured sheets

To achieve the best adhesion of the print surface, it is vital to keep it clean. The best option when printing with ABS, PLA, and many other materials is 90% Isopropyl alcohol, which can usually be sourced locally at drugstores or hardware stores. Denatured alcohol is also an option. We recommend always using 90% IPA. Solutions with lower percentages may contain unsuitable chemicals and oils.

PETG, ABS, ASA, XT, and CPH filaments are an exception - the adhesion may be too strong, and you can damage your Smooth PEI sheet. We recommend using a separating agent (e.g. a glue stick). For more information on how to print with these materials, check out our Material guides.

Any cleaning agent (e.g. IPA) that is dermal/cosmetic, i.e. for skin or nails, may contain additives like moisturizers and oils which are not suitable.

Dish soap and water

If the adhesion seems to decrease over time even when using IPA, you can clean the steel sheet with a few drops of dish soap and warm water (not hot!). This should not be done often, and do not submerge the sheet completely in hot water, but it will dissolve some oils and sugars that gather over time and that IPA does not remove. Make sure to use only dish soap and dry the sheet well before using it.

Acetone

PEI can lose its adhesive powers after a couple of hundred hours. When you see models coming loose regularly, wipe the surface thoroughly with acetone to restore the adhesion. This should only be used in the smooth PEI sheet and only around once per month. Do not overuse acetone. Extended use makes PEI surface brittle. Also, do not use acetone before printing with PETG.

For the textured and the satin steel sheets, do not use acetone at all! Other chemical solvents, like Nail polish remover or brake-cleaner, can also contain acetone (acetates).

Glue

Glue is a great, easy-to-use tool to increase adhesion. It also creates a protective separation layer. No need for glue specially made for 3D printing. You can use a basic (PVA-based) glue stick. From our experience, it is not needed when printing PLA, but it may be advisable when printing:

- Polyamide (Nylon)
- PETG
- Polycarbonate (PC)
- PET-based materials
- ABS
- ASA
- Other more exotic materials
- Flexible materials

You can easily wipe off PVA glue with dish soap and water.

Other types of glue should not be used as a substitute. Don't put Superglue on your sheet! When removing prints with a large surface area, you may have to assist the process using a spatula. Be gentle when flexing the sheet and removing the print as the smooth PEI foil can tear.

In case you are using ABS juice, do not use it on the textured and satin steel sheets at all!

Speed and temperature

Decrease the printing speed

If the steps described above didn't help, then try decreasing the printing speed. The easiest way how to do it is by rotating the knob during the printing process, lowering the percentage. Counterclockwise = decrease speed, Clockwise = increase speed. We suggest decreasing the speed to about 75% for the first three layers, and then returning it to normal.

Use recommended printing temperatures

Make sure to use the recommended nozzle and heatbed temperatures. PrusaSlicer will configure them correctly based on the selected material, so you don't need to adjust the temperatures manually on the printer itself. If you are experimenting with new materials that don't adhere well, you can try to increase the heatbed temperature by 5-10 °C. This way the plastic will stick a bit better.

## Notas del recolector

- URL comprobada: 200. Título: «First layer issues | Prusa Knowledge Base».

- El artículo es largo y es de limpieza y nivelación casi entero. **Lo que le importa a
  este artículo son tres frases**, y las señalo:
  1. «If you are experimenting with new materials that don't adhere well, you can try to
     increase the heatbed temperature by 5-10 °C.» Es el punto 6 del encargo: subir un
     poco, contra subir hasta el techo del rango. También dice que PrusaSlicer configura
     las temperaturas solo a partir del material seleccionado, lo que es relevante para
     el punto 7.
  2. «PETG, ABS, ASA, XT, and CPH filaments are an exception - the adhesion may be too
     strong, and you can damage your Smooth PEI sheet.» Es el punto 4 por el lado del
     daño: con adhesión de PETG, ABS o ASA sobre PEI lisa, la pieza se pega de más.
  3. La recomendación de barra de pegamento para PETG, materiales con base de PET, ABS,
     ASA, poliamida, PC y flexibles, que es el mismo mecanismo que la tabla de Bambu por
     pegamento.

- **Matiz que no se debe perder: esta fuente no da ninguna cifra de temperatura de
  cama**, ni por material ni por chapa. Da un incremento de +5–10 °C y la advertencia
  de adhesión excesiva. Quien afirme «Prusa dice que PETG va a 85 °C» citando esto está
  inventándoselo: esa cifra está en `filament-material-guide` y en la ficha de PETG.

- **El incremento va en más, no en igual.** Sobre el perfil por defecto, +5–10 °C.
  Quien lo combine con una tabla de cama tiene que sumarlo y avisar de que se sale del
  rango del fabricante, no presentarlo como el valor del fabricante.

- El texto de «increase the heatbed temperature by 5-10 °C» está en la sección «Speed and
  temperature», bajo el epígrafe «Use recommended printing temperatures», no en una
  sección propia de cama. Es el único sitio de la página donde sale una cifra.

- **Extracción: el cuerpo del artículo llega dentro de un JSON escapado en la página**,
  con las etiquetas como `\u003ch3\u003e`. Hay que decodificarlo antes de limpiar el
  HTML; si se limpia a ciegas sale el texto entre barras invertidas y no se lee. Lo
  dejo dicho para que nadie repita el intento.

- Se han eliminado el menú, el pie, la barra lateral de cursos, los botones de «Related
  articles» y la navegación de modelos. Las erratas de la fuente se conservan, que es
  lo correcto.

- No he traducido nada.
