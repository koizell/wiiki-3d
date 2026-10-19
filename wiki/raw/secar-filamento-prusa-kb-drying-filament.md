---
titulo: "Drying filament"
url: https://help.prusa3d.com/article/drying-filament_332086
sitio: help.prusa3d.com
tipo: oficial
capturado: 2026-10-19
autor: Prusa Research
idioma: en
---

# Drying filament

The materials used for FFF 3D printing are mostly hygroscopic. This means that they readily attract water molecules from the environment they are in. When used for printing, a material that has gathered humidity might not behave as expected.

### Prevention

Some filaments are more hygroscopic than others. When using a new material, make sure to research its properties and the best way to store it. It is best to avoid having to dry the filament if possible.

It is best to store your filaments in a closed space or box, with some desiccant material in it. If you have limited availability for this type of storage, prioritize storing filaments that are more hygroscopic. PLA, for example, doesn't change properties too much by uptaking humidity, whereas Polyamide is affected quite significantly.

[tip-callout]
To prevent any issues with the highly hygroscopic materials (polyamide, polypropylene, PVA, BVOH, ...), it is recommended to either ensure they are stored in a dry environment or dry them before every print.
[/callout]

You can purchase a box with the specific purpose of keeping the filament dry (such as Prusa USS Drybox), or make your own.

Another popular solution to keep your filament dry is using vacuum bags for storage. There are bags specific for filaments, but you can use any that will fit a filament inside. Keep a desiccant in the bag when storing the filament.

### Multi-Tool Printing

In printers like the Original Prusa XL, where filament is loaded directly into toolheads, any humidity in the filament is critical. When printing with multiple toolheads, the unused tools remain heated (the idle temperature is set to 70°C by default). If the filament is wet, moisture is released into the tool, causing stringing in the toolhead. In such cases, even PLA can absorb enough moisture to create printing issues. This makes the XL more susceptible to filament moisture compared to single-tool printers, therefore we recommend drying the filament before printing on the Original Prusa XL.

### How to recognize if the filament has gathered humidity

In case a material is affected by humidity, the general first signal will be a poor quality of the model surface.

[note-callout]
Some filaments are naturally more stringy than others. Make sure to compare different results from your prints, and check our Stringing and oozing guide.
[/callout]

In some cases, the high content of water in the filament can cause low layer adhesion, blobs on the prints, and bubbling and smoke during extrusion.

Polyamide, PVA, and TPU (Flex) are filaments more often in need of drying than more popular filaments like PLA.

### Prusament spool types

Prusament filaments are wound on a redesigned spool that introduces several improvements for an even better printing experience, starting in October 2025. The new spool features a simple locking mechanism that makes disassembly quick and easy, allowing effortless refills. It also stays secure during filament drying, even at higher temperatures.

For standard (low-temperature) filaments, we use a black spool, which resists drying temperatures as high as 90 °C. And for high-temperature filaments (Prusament PEI 1010), we use a grey spool, which is usable for temperatures reaching 150 °C. The new spools don't require any extra preparations before drying.

However, there is still a significant number of old spools on the market, which need extra preparation before drying filament.

#### Prusament black spool (old version)

The black plastic sides of Prusament spools are firmly pressed into the cardboard cylinder. The plastic sides expand with rising temperature and cause the expansion of the cardboard center as well. When the temperature decreases, plastic shrinks back to its original shape, but the cardboard stays expanded, which causes loosen spool. **The spools can be heated up safely up to 45 ºC without this happening.**

Alternatively, it is possible to add a screw holding the two sides of the plastic together. The screw needs to have a thread of at least 65 mm. In the pictures, we use an M4x65 screw, tightened by a 3.5mm Allen key.

After heating the spool to above 45 ºC, the screw must hold the spool until the end of its use, or else the spool will fall apart.

| [imagen:] | [imagen:] |
| [imagen:] | [imagen:] |

#### Prusament Grey spool (old version)

The old Prusament spools with grey plastic sides are **glued** to the cardboard center to prevent falling apart. **The glue added can withstand up to 90 ºC**. So there is no need to add the screw to dry this spool if this temperature is not exceeded.

The old version of PA11CF filament uses the grey Prusament spools. It is recommended to keep this filament in a dry box between each use, even if the filament will be used soon. In case that is not possible, dry the filament before each use.

### Drying methods

#### Temperatures

Once you are sure that the spool will not fall apart, the following temperatures and times are recommended for the Prusament materials. It is important not to exceed these temperatures while drying the filament, or the filament will soften and stick together.

Also, it is important to **stick to the recommended drying times to prevent overdrying.**

| Material | Temperature | Time |
| PLA/rPLA | 45 ºC | 6 hours |
| Woodfill | 45 °C | 6 hours |
| PVB | 45 ºC | 8 hours |
| PETG (all versions) | 55 ºC | 6 hours |
| TPU | 60 °C | 4-6 hours |
| PP Carbon Fiber/Glass Fiber | 70 °C | 2-4 hours |
| ASA | 80 ºC | 4 hours |
| PC Blend | 85 ºC | 5 hours |
| PC Blend Carbon Fiber | 90 ºC | 4 hours |
| PC Space Grade | 90 °C | 4-6 hours |
| PA11 Carbon Fiber | 90 ºC | 6 hours |
| PEI | 150 °C | 8 hours |

#### Filament dryer

There are specialized boxes that will not only keep filaments dry but also actively remove the moisture from filaments. Usually, you are also able to keep the filament in the box while printing.

Make sure to check the specifications of the box you intend to use to make sure that it matches the drying temperature of your filament.

[tip-callout]
To maintain low humidity during printing, we recommend using the Prusa Pro Filament Drybox or Prusa USS Drybox.
[/callout]

#### Oven

Since most people have an oven at home, this seems the easiest way to dry filament. However, some things need to be noted for filament drying in a conventional oven.

Home ovens don't have a very precise temperature measurement. The fluctuations that do not affect your food might damage your filament, especially low-temperature ones like PLA. If using an oven, make sure to have an external thermometer to correct the temperature if necessary.

Another issue is that a lot of home ovens cannot be set at a temperature low enough to dry the filaments without damaging them. Even if left for less time than recommended, high temperatures will damage the filament.

#### Professional drying ovens

If you need to dry high-performance or highly hygroscopic materials (such as PEI, PEEK, or carbon-filled nylons) with precise and stable temperature control, we offer laboratory-grade drying ovens.

We offer the **Memmert UF-series ovens**, which feature accurate temperature regulation, adjustable fan speed, and exhaust flap settings suitable for advanced filament drying.

[tip-callout]
For more information about setup and drying workflow, see Drying filament in Memmert UF-series universal oven.
[/callout]

#### Food dehydrator

A different method of drying is adapting a food dehydrator to fit a filament spool inside. The adaptation is usually achieved by taking off the trays between the layers and placing the filaments inside. These dehydrators usually have only low temperatures, so check the drying temperature of your filament before purchasing one.

[tip-callout]
After drying, make sure to store the filament properly.
[/callout]

## Notas del recolector

- **Aviso técnico sobre cómo se obtuvo el cuerpo, porque el conversor automático devuelve
  un 200 con cuerpo vacío.** El KB de Prusa se sirve como aplicación React: el texto del
  artículo está en el fragmento oculto `<div hidden id="S:1">`, que el conversor a Markdown
  descarta por no formar parte del árbol renderizado. El texto de arriba se ha extraído de ahí.
  Un 200 con cuerpo vacío en esta URL **no** es una página vacía.
- **Qué es esta página y qué no es:** es la guía de secado de Prusa para **materiales
  Prusament**, no una tabla de todos los materiales. La tabla de 12 filas es la
  recomendación del fabricante para su propio filamento. No cubre ABS, PA (nylon) sin
  fibra, TPU de otras marcas, PC, PET-CF ni PVA con cifras propias: los que aparecen son
  Woodfill, PVB, PETG, TPU, PP CF/GF, ASA, PC Blend, PC Space Grade, PA11 CF y PEI.
- **Es la fuente que separa «higroscópico» de «está húmedo», que es el gate 2 del brief.**
  La primera frase dice que los materiales son «mostly hygroscopic» —una propiedad— y a
  continuación que «a material that has gathered humidity might not behave as expected»:
  una condición. También dice, en Prevention, que conviene **evitar tener que secar** y que
  PLA «doesn't change properties too much by uptaking humidity» mientras que la poliamida
  «is affected quite significantly».
- **Aporta el apartado de cómo se reconoce la humedad**, que es lo que pide el brief para el
  diferencial: «the general first signal will be a poor quality of the model surface» y,
  cuando el contenido de agua es alto, «low layer adhesion, blobs on the prints, and bubbling
  and smoke during extrusion». Añade que PA, PVA y TPU necesitan secado más a menudo que PLA.
- **Aporta el almacenamiento**, que es la mitad del problema: caja cerrada o bolsa con
  desecante, y priorización de los materiales más higroscópicos si no hay sitio para todos.
  También las **bolsas al vacío con desecante** como alternativa.
- **Los límites de carrete son del carrete, no del material.** La página da cuatro datos
  distintos y no deben fusionarse: carrete negro viejo «safe up to 45 ºC» (por encima hace
  falta un tornillo M4x65 que sujete las dos tapas; sin él, el carrete se deshace), carrete
  gris viejo con pegamento «up to 90 ºC», carrete negro nuevo «resists drying temperatures as
  high as 90 °C» y carrete gris nuevo «usable for temperatures reaching 150 °C» (PEI 1010).
  Esto entra de lleno en el gate 4 del brief: un límite de accesorio no es una propiedad del
  filamento.
- **Discrepancia con la tabla de Bambu, que el cocinero debe publicar, no promediar.**
  Prusa: PLA 45 ºC / 6 h; PETG 55 ºC / 6 h; ASA 80 ºC / 4 h. Bambu (material-bambulab-drying.md,
  Appendix I): PLA en AMS 2 Pro 45 °C / 12 h, PETG en AMS 2 Pro 65 °C / 12 h, ABS/ASA en AMS HT
  80 °C / 8 h. Ni el tiempo coincide para el mismo material y método, ni la temperatura
  coincide para PETG. Además Prusa da un tiempo para el horno doméstico (6 h PLA) donde Bambu
  da 8 h para el horno de convección forzada. Cada cifra tiene que ir con su fuente y su
  método.
- **Una temperatura de la página es de impresora, no de secado.** En «Multi-Tool Printing» se
  menciona que en la Prusa XL las herramientas inactivas se mantienen a 70 °C. Es la
  temperatura de reposo del cabezal, no una temperatura de secado, y no debe aparecer en la
  guía como cifra de este tema.
- **Erratas y rarezas del original, conservadas:** la tabla mezcla dos unidades de grado,
  «45 ºC» (ordinal, con la «o» subrayada) y «45 °C» (ordinal también) —las dos formas
  aparecen en filas distintas—, y lo mismo en «90 ºC» frente a «90 °C». En la tabla de
  temperaturas, la fila de Woodfill usa «45 °C» y las de PLA/rPLA y PVB usan «45 ºC». No se
  ha unificado nada.
- **La cabecera «Relevant for» de la página indica «MK4 family»:** la etiqueta de productos
  de Prusa no es exhaustiva y no incluye CORE One ni XL. No significa que el contenido no
  aplique a esos equipos.
- **La página no da tiempo de secado genérico**, ni temperatura de «método horno» aparte de la
  tabla por material. Si la guía necesita un tiempo para un método, no está aquí.
- No se han capturado los comentarios de la página. Las imágenes no tienen texto alternativo
  y van como `[imagen:]`.
- El texto original está en inglés y no lo he traducido.
