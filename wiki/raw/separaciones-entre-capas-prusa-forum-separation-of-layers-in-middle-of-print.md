---
titulo: "Separation of layers in middle of print"
url: https://forum.prusa3d.com/forum/original-prusa-i3-mk3s-mk3-how-do-i-print-this-printing-help/separation-of-layers-in-middle-of-print/
sitio: forum.prusa3d.com
tipo: foro
capturado: 2026-10-04
autor: jaychatt (hilo iniciado), bobstro (respuesta principal)
idioma: en
---

## Separation of layers in middle of print

**jaychatt** — 13/12/2020 4:03 am

I've had this happen a few times now, where there are layers that are almost completely detached. You can see it here with PLA. Any advice? Thanks.

[IMAGE]

## RE: Separation of layers in middle of print

**bobstro** — 13/12/2020 4:47 am

A few possible causes:

- Excessively high layers for your nozzle size. Ideally, you want to keep layer heights below 80% of your nozzle size. Any higher and you start to get extrusions with a circular cross-section and little squish with the layer underneath. This can result in poor inter-layer adhesion. I can't make out what layer height you're using from the pic, but it's worth verifying.

- Excessive speed. The filament needs some time to fully bond with the underlying layers. This may be accompanied by under-extrusion on long straight extrusions.

- Excessive cooling/insufficient heat. Try reducing cooling first. Increasing heat can also introduce stringing, but adding 5-10C may help.

Those are the things I usually check. If you save your part & settings off in a 3MF project file, zip it up, and attach it to a reply here, we can check other settings for possible suggestions.

My notes and disclaimers on 3D printing

and miscellaneous other tech projects
**He is intelligent, but not experienced. His pattern indicates two dimensional thinking.** -- Spock in **Star Trek: The Wrath of Khan Unfortunately,**&hellip;

## RE: Separation of layers in middle of print

**jaychatt** — 14/12/2020 9:38 pm (Topic starter answered)

@bobstro

Thanks. I will try to reduce cooling and slow the speed. I don't think it was a layer size issue, since I was doing 0.2mm layers with a 0.4mm nozzle. But to be honest with you, I also suspect the filament. I've been having other weird things happen with this filament that I haven't seen in the past.

## Notas del recolector

- Hilo del foro de Prusa, subforo "How do I print this? (Printing help)", de diciembre de
  **2020**. **3 posts**. La respuesta útil es la de **bobstro**, usuario con rango
  "Eminent Member" (su firma lleva su propia nota de descargo, que queda abajo).

- **La regla del 80 % es lo más valioso de este lote para el campo `layerHeight` del
  panel**, que es el campo que el artículo tiene que justificar. Textualmente: "you want
  to keep layer heights **below 80% of your nozzle size**. Any higher and you start to get
  extrusions with a circular cross-section and little squish with the layer underneath.
  This can result in poor inter-layer adhesion". Traducido a lo que significa: por encima
  de ese 80 % la extrusión deja de aplastarse contra la capa de debajo, y al no
  aplastarse no se pega. Con capa de 0.4 mm el techo sería 0.32 mm.

- **Aviso de fiabilidad: esa regla la da un usuario del foro, no Prusa.** No aparece en
  la Knowledge Base. En el hilo nadie la contrasta con una fuente oficial y el autor
  original la descarta sin comprobarla. Es una fuente de foro, de nivel alto, pero no
  oficial. El artículo la puede usar citing el hilo, no presentándola como norma de Prusa.

- **El hilo tampoco se resuelve.** El autor dice que va a reducir refrigeración y bajar
  velocidad, pero **nunca vuelve a informar del resultado**. Y además **descarta la causa
  de la altura de capa sin haberla medido** ("I don't think it was a layer size issue,
  since I was doing 0.2mm layers with a 0.4mm nozzle"). Con 0.2 y 0.4 está al 50 %, muy
  por debajo del 80 % que proponía bobstro, así que en este caso concreto la regla no
  explica el fallo. No es una confirmación de la regla.

- El autor sospecha **del filamento**: "I also suspect the filament. I've been having
  other weird things happen with this filament". No lo desarrolla y no se identifica la
  marca. Es una pista sin resolver.

- La segunda causa que da bobstro, **velocidad excesiva**, viene con un síntoma que
  encaja con la distinción del artículo: "This may be accompanied by **under-extrusion
  on long straight extrusions**". Es el mismo aviso que hace Bambu con el atasco de
  boquilla: la capa que falta y la capa que se separa se parecen.

- La tercera, "Excessive cooling/insufficient heat", con el orden explícito de
  **bajar la refrigeración primero**, y **+5-10C**, que es el mismo incremento de 5 °C que
  dan el KB de Prusa y (al revés) Bambu. Los tres coinciden en el orden magnitud 5-10 °C,
  aunque no en **qué** temperatura.

- **El material es PLA**, dicho de pasada por el autor ("You can see it here with PLA"),
  sin marca. Es lo poco que hay del contexto del material, y no hay cifras.

- La firma de bobstro ha quedado dentro porque estaba en el original: dos líneas sueltas
  ("My notes and disclaimers on 3D printing / and miscellaneous other tech projects"), una
  cita de Spock y un enlace truncado que acaba en "Unfortunately,&hellip;". **No es
  contenido**, y la cita aparece cortada por la mitad de la frase. El cocinero puede
  descartarla entera.
- No se ha traducido nada; el original está en inglés.
