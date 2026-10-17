---
titulo: "The evolution of E3D’s high flow technology"
url: https://e3d-online.com/blogs/news/the-evolution-of-e3d-s-high-flow-technology
sitio: e3d-online.com
tipo: fabricante
capturado: 2026-10-17
autor: E3D
idioma: en
---

# The evolution of E3D’s high flow technology

May 22, 2026

*TL;DR: Same form-factor, wildly different results*

We've never been ones to just go with the flow at E3D. We like to innovate, shake things up, and move the industry along as much as possible. So it’s not surprising that we’ve turned our attention to increasing flow rates many times over the years and continue to do so.

Lesson time. To increase maximum flow rate you need to increase the amount of heat transfer possible into the filament. As the flow increases you have less time to get the necessary heat in to melt the plastic, so improving the heat transfer allows you to print faster whilst maintaining an appropriately molten filament. To achieve this, you need to increase the surface area and you have two options:

- Keep the cross-section area circular and increase the length of the meltzone
- Change to a different cross-sectional area shape

Allow us to walk you through how we’ve utilised these two designs over the years to bump up volumetric flow rates.

## Where it started

Cast your minds back to 2014. During this year we launched Volcano, a lengthy HotEnd with a melt zone almost double that of the previous length of the standard E3D-V6. The change in length allowed the filament to take in more heat as it passed through the nozzle. Alongside this the heater cartridge was rotated so that it was parallel to the axis of the HotEnd and much closer to the nozzle, in turn increasing the efficiency of heat transfer even further.

The original Volcano and Supervolcano HotEnds

Fast-forward 5 years to 2019 and we launched the SuperVolcano. Same principle as the volcano, just supersized. This new tech had up to 11x the volumetric throughput of the market-leading V6 nozzle! SuperVolcano’s chart topping flow rates demonstrated that it was an extremely effective way to improve throughput. But, this approach came at a cost; your HotEnd assembly becomes considerably, and problematically, longer. Upgrading to high-flow systems like these involved reworking your fan shroud and most likely your Z-endstop/auto leveling too. In some cases, the whole Toolhead might have needed re-designing and you might have had to make changes in your firmware. This wasn’t such an issue in the earlier days of RepRap, but consumer 3D printers were steadily becoming less and less hackable.

## The current state of play

So, it was back to the drawing board for our engineers who needed to come up with a way of increasing flow *without* increasing HotEnd length. Were you paying attention earlier when we said there were TWO options for meltier filament? Well, it wasn't long before we had perfected the method for achieving option 2 - “increase the surface area in contact with the filament”.

Our originally named “High Flow Technology” was first launched for our Revo nozzles in 2023 and it did exactly what it said on the tin, increased volumetric flow rates by a significant amount. Our High Flow design has since been rolled out across countless printers, and although the nozzles and HotEnds that are equipped with this revolutionary technology may look the same on the outside, the engineering that goes on inside the products is fascinating and we want to tell you all about it!

## Optimised internal geometry

The key to achieving this drop-in status is hidden on the inside of the nozzle in the form of some carefully optimised internal geometry. Through our explorative R&D we studied how geometry and thermal transfer combine to provide a flow rate. It’s one thing to work out what the perfect geometry would look like but successfully manufacturing that geometry is another thing entirely. To achieve this we were balancing several trade-offs; fluid dynamics, thermal transfer, manufacturability, and practicality of assembly.

Another key consideration is the required extrusion force. If you can get double the flow rate, but it takes 8x the extrusion force to achieve, that’s not such a good trade-off...

Some geometry prototypes

When you 3D print, your HotEnd is converting a solid into a non-Newtonian, multi-phase fluid. If this sounds complicated, that’s because it is. Perhaps unsurprisingly, it’s difficult to accurately capture this process in computational simulations, which can make working out optimal geometry a real challenge. This resulted in A LOT of prototypes. When all was said and done we’d tested 28 different geometries to find the very best match for Revo, including the CHT geometry from Bondtech. You can read all about how the Revo High Flow project navigated Bondtech’s intellectual property in this blog by Clare.

## The chosen geometry

This was the design we settled on; internally, we affectionately referred to it as the ‘spaceship’ insert. Fun fact: We had to consider the pointiness of the insert in the final design as we didn’t want any of our production team cutting themselves on its sharp end!

Part of a Revo High Flow Nozzle that has been sectioned to show the internals

The geometry used for the High Flow portion of the Nozzle

E3D’s High Flow technology inside a Revo nozzle, a Prusa Nextruder Nozzle and a Bambu Lab H2/P2/X2 HotEnd

## Introducing high flow to other form factors

And we didn’t stop at Revo. Soon enough the requests to increase melt rate were flowing in. Now there’s high flow for everything from Prusa Nextruder, to Bambu Lab HotEnds, as well as Creality’s Unicorn and K2 Plus nozzles. The engineering behind all the subsequent products are based on the same principle as the Revo geometry - splitting the filament into 4 channels to create more efficient flow dynamics.

## Testing: How do we benchmark a flow rate?

This brings us on to how we did our testing. We were looking for the best flow rate but as mentioned earlier on, we were also looking at the extrusion force required to achieve said flow rate.

Here’s a word from one of the Engineers behind this project, James:

“We use PLA for all our testing as it is one of the more difficult materials to obtain high flow rates with when compared to PETG or ASA. It’s also the most commonly used plastic in 3D printing. We used Prusament Jet Black PLA for all flow testing due to its dimensional accuracy and consistent and reproducible characteristics across batches. A key aspect of the development was measuring the force required to extrude at increasing flow rates of each design, ensuring that results are repeatable and ensuring the nozzles are strong enough to avoid being damaged by cold extrusion.”

## How well does it flow?

It’s our job to test every other HotEnd on the market so we can benchmark the performance of our products - we often found that their stated flow rate values are quite literally sliced in half when subjected to our testing procedure. We believe it’s important to test a HotEnd under normal use case conditions to ensure values for flow rate aren’t artificially inflated. We also provide a flow rate value for each nozzle size as it has a huge effect on the maximum flow rate.

You can find a full document of flow rates for different nozzle sizes and materials here.

| Nozzle Size | Bambu Lab Hardened Steel | E3D High Flow ObXiDian 500 |
| --- | --- | --- |
| 0.4mm | 35 mm³/s | 65 mm³/s |
| 0.6mm | 39 mm³/s | 63 mm³/s |

This table shows the comparison between Bambu Lab Hardened Steel and ObXiDian 500 High Flow H2/P2/X2 HotEnds when printing with PETG.

| Nozzle Size | Bambu Lab Hardened Steel | E3D High Flow ObXiDian 500 |
| --- | --- | --- |
| 0.4mm | 30 mm³/s | 35 mm³/s |
| 0.6mm | 30 mm³/s | 51 mm³/s |

This table shows the comparison between Bambu Lab Hardened Steel and ObXiDian 500 High Flow H2/P2/X2 HotEnds when printing with PLA.

## FUGE - The future of high flow

And the journey into achieving the highest possible flow rates continues at E3D HQ today. We’re currently working on FUGE, a brand new patented concept that isn’t just about going fast - it’s about going fast smartly. It's the culmination of all our learnings about advanced thermal regulation, optimised melt zone geometry, and precise pressure control.

An example of the inside of a FUGE insert

Unlike previous solutions we’re keeping one, standard length filament path but squishing it out so that the filament becomes super flat. This allows us to get a large surface area and a really small distance between the outside and the inside of the filament so we can get a lot more heat into it even in short form factors.

Engineered for performance, FUGE enables consistent extrusion at extreme volumetric flow rates - without sacrificing precision, print quality, or system stability. Whether pushing the limits of rapid prototyping or maximising throughput in production, FUGE delivers the flow you need to go faster, print stronger, and build bigger and we can’t wait to unleash it’s full potential onto the 3D printing world over the coming months! Watch this space...

## Notas del recolector

- Artículo del blog oficial de E3D (fabricante de hotends). Explica los dos métodos para aumentar el flow rate (aumentar la longitud del meltzone, o cambiar la sección transversal), el historial (Volcano 2014, SuperVolcano 2019, High Flow 2023 con 4 canales), el benchmarking con PLA/PETG y valores comparativos Bambu vs E3D ObXiDian 500.
- Incluye tablas con valores de flow rate para nozzle 0.4/0.6 mm en PLA y PETG.
- El texto está en inglés y no se ha traducido.
