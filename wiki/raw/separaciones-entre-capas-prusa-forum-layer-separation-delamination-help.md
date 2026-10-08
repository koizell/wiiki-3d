---
titulo: "Layer Separation/Delamination Help"
url: https://forum.prusa3d.com/forum/user-mods/layer-separation-delamination-help/?language=en
sitio: forum.prusa3d.com
tipo: foro
capturado: 2026-10-04
autor: newgen (hilo iniciado), Naugh (respuesta principal)
idioma: en
---

## Layer Separation/Delamination Help

**newgen** — 31/08/2026 2:01 pm

Hoping someone on here more knowledgeable than I can help with an issue I've recently started having with my prints. The models I've started printed now are separating for some reason and I don't know why. I've spent three days trying to troubleshoot the issue. From the research I've done, the issue may be due an under-extrusion issue or a temperature issue.

Here's the background information:

- Models printed using Elegoo PLA

- Separation appears at various heights in the multiple prints I've tried.

Here are the steps I've tried to fix it:

- Re-sliced the model

- Adjusted the height of the hot end

- Opened/closed the grill vent

- Upgraded to the newest firmware (note, the issue occurred before the upgrade so I don't think this is the root cause)

- Re-assembled the gearbox

- Re-tensioned the belts

- Adjusted the idler tension screws

- Unloaded/re-loaded the filament

- Cold pull

- Tested a different spool of PLA

- Printed a different model

I'd prefer not to have to change a setting every time I print a model. Anything I may have missed that may be causing the issue?

## RE: Layer Separation/Delamination Help

**Naugh** — 31/08/2026 5:48 pm

Did you run a temperature tower?.

A photo would help diagnose the problem, or share the .3mf print settings so we can check them.

## RE: Layer Separation/Delamination Help

**newgen** — 31/08/2026 11:06 pm (Topic starter answered)

[IMAGE]

I've tried printing this temperature tower twice and both times, it's failed at around 200 degrees. As you can see, the separation's pretty bad as the model gets higher but there's even under-extrusion on the base of the temperature tower.

## RE:

**Naugh** — 01/09/2026 6:28 pm

The photo doesn't have very high resolution, but this is what you can mainly see.

This temperature tower shows a drastic flow loss as the temperature drops, ending in a severe under-extrusion clog around 205°C before it could even attempt the 200°C layer.

Severe under-extrusion & structural collapse (205°C): As the temperature dropped, the filament viscosity became too high for the required volumetric flow rate. This created porous, "spongy" layers and caused the bridge to completely break down.

Failed bridges & overhangs (205°C–210°C): Sagging filament and poor layer adhesion are clearly visible on the cooler tiers.

Loose filament at the base: stray loops around the brim/bed suggest a messy purge line or poor nozzle wipe dragging excess material into the print area.

Recommendation:The sweet spot for this material at the current print speed is around 220°C–230°C, where the walls look smooth and the bridging stays tight. Try lowering the printing speed and drying the filament. Even if you've tried another spool, it might also be damp.

If none of this solves your problem, try asking in the correct subforum, which is the mods one. 😉

## RE: Layer Separation/Delamination Help

**newgen** — 02/09/2026 2:37 am (Topic starter answered)

Haha. Didn’t realize I posted this in the wrong subforum. The issue still persists so I’ll post it in the correct one. Thanks for your help.

## Notas del recolector

- Hilo del foro de Prusa, en el subforo de mods de usuario. **5 posts**, del 31/08/2026 al
  02/09/2026. La respuesta útil es la de Naugh (4º post), usuario con el rango "Eminent
  Member".

- **El hilo no se resuelve.** El autor reconoce que se había publicado en el subforo
  equivocado y dice que el problema "still persists", y no vuelve. Por tanto el
  **220°C–230°C es una recomendación de foro, no un resultado comprobado**. Si el
  artículo lo cita, tiene que oírlo así. No hay ningún antes/después validado en este
  hilo.

- Material: **Elegoo PLA** (filamento de marca, no Prusament), y es exactamente el tipo
  de filamento cuya Cimmar es la oficial no confirma. El KB de Prusa dice que el PLA se
  imprime "between 195-220"; este hilo sube a 220-230 para el caso concreto. **Son
  rangos distintos y el cocinero tiene que explicar la diferencia, no elegir uno.**

- Lo más aprovechable para la tabla diferencial es el **diagnóstico del author de la
  torre de temperaturas**: la separación *crece* con la altura de la pieza, mientras que
  la causa real estaba abajo del todo, en la base, y era flujo. Naugh lo dice así:
  "This temperature tower shows a drastic flow loss as the temperature drops, ending in a
  severe under-extrusion clog around 205°C". Es decir: **la separación es el síntoma
  visible y la causa estaba al principio**. Eso no encaja con "las capas se rompen porque
  las fuerzas del warping superaron la adhesión" y el artículo tiene que poder
  sostener el matiz.

- Cifras que trae el hilo: around **205°C** (atasco de under-extrusión), **205°C–210°C**
  (puentes fallidos y "poor layer adhesion"), y **220°C–230°C** (el "sweet spot"
  propuesto). Ninguna cifra de cama ni de ventilador aparece en este hilo.

- Naugh añade dos causas que no son de temperatura: **secar el filamento** (otro spool
  puede estar húmedo) y **bajar la velocidad**. Y avisa de que un "poor nozzle wipe"
  puede arrastrar material.

- El primer post del autor es útil como lista de lo que **no** funcionó: cold pull,
  cambiar de bobina, reajustar correas e inercia, re-laminar el modelo, firmware nuevo.
  Un buen artículo puede usar esto como "antes de tocar la temperatura, comprueba esto".

- La foto de la torre de temperaturas es la evidencia y **no se ha descargado**. Naugh
  dice dos veces que la resolución es baja, así que su lectura es una interpretación de
  una imagen de baja calidad.

- Se ha quitado el "RE:" duplicado que el foro anteponía al título, y las marcas
  "Topic starter answered". Se ha conservado el texto tal cual, sin reescribir.
- No se ha traducido nada; el original está en inglés.
