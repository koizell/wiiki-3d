---
titulo: "Seam painting"
url: https://help.prusa3d.com/article/seam-painting_168620
sitio: help.prusa3d.com
tipo: oficial
capturado: 2026-10-19
autor: Prusa Research
idioma: en
---

Starting from PrusaSlicer version 2.3, it is possible to paint on seams on your model.  The seam painting tool provides more detailed control over the seam placement. The tool is accessible from the left toolbar, and it is only shown in Advanced and Expert modes. After clicking on the icon, the user can paint 'Seam enforcers' or 'Seam blockers' on the model.

### Seam placement logic

If there is a seam enforcer, it always places seams into the enforcer area.

If there is a blocker, its area is excluded from possible seam candidates.

The Nearest, Rear, and Random Seam position options are still respected. When the Aligned option is active and enforcers are used, the seam is placed in the middle of the enforcer area. This allows drawing smooth seams over the model.

### Seam painting

[imagen:]

Left mouse button: Enforce seam

Right mouse button: Block seam

Shift + Left moue button: Erase selection

Brush size: Can also be accessed by the shortcut Alt + Mousewheel. Click the "Edit" icon on the side to add a specific number.

### Cursor type

#### Spherical cursor (default)

Paints everything inside the sphere, regardless of whether it is visible or not from the current view. The preferred method for most cases.

#### Circular cursor

Paints all visible places inside the circle from the current view, possibly leaving unpainted areas, but never painting behind corners.

### Clipping of view

You can use the clipping plane tool to hide a part of the object, so that difficult to reach areas can be easily painted. Move the slider from left to right to move the clipping plane. Click the "Edit" icon on the side to add a specific number.

## Notas del recolector

- **Aviso técnico sobre cómo se obtuvo el cuerpo:** el KB de Prusa se sirve como aplicación
  React. En este artículo el texto **sí** está completo dentro del fragmento oculto
  `<div hidden id="S:1">`, y no hay cuerpo renderizado fuera de él. Aun así, conviene no
  dar por vacía la captura por el 200 con cuerpo vacío del conversor: este artículo es la
  prueba de que el texto estaba ahí. URL verificada: 200, título «Seam painting | Prusa
  Knowledge Base».
- **Es la contraparte de Prusa de la herramienta que Bambu llama «Manual-seam painting».**
  Las dos páginas describen la misma función con nombres distintos: Bambu «manual-seam
  painting» en su página de *Seam settings*, Prusa «Seam painting» con la lógica de
  «enforcers» y «blockers» («enforcers» es el término de Prusa, que no tiene equivalente
  en la página de Bambu).
- **Lo que aporta al diferencial del brief:** es la respuesta a la escena 3 (costura en la
  cara que se va a ver y no se puede girar) cuando **no hay esquinas vivas donde
  esconderla**. Con el pintado manual el usuario decide *en qué punto exacto* va la
  costura, en vez de confiar en el automático. La página de Bambu dice lo mismo con otras
  palabras: «Sometimes the auto seam position may be not ideal, you can customize the seam
  position by manually painting the method».
- **La lógica de colocación, que es lo que hace útil la herramienta:** «If there is a seam
  enforcer, it always places seams into the enforcer area. If there is a blocker, its area
  is excluded from possible seam candidates. The Nearest, Rear, and Random Seam position
  options are still respected. When the Aligned option is active and enforcers are used,
  the seam is placed in the middle of the enforcer area.» Es decir: la pintura **no anula**
  la posición elegida, la restringe. Ése es el dato que hace falta para explicar que
  colocar la costura a mano y elegir el modo de posición son cosas distintas, no
  alternativas.
- **El modo de cursor es un detalle de uso, no un dato del tema:** se conserva porque el
  texto está completo y sin él el apartado quedaría cortado, pero el cocinero no debería
 sacarlo de la guía. Lo mismo con «Clipping of view», que es una ayuda para pintar
 reas ocultas.
- **Lo que esta página NO tiene y conviene saber:** no da cifras de ningún tipo (ni
  retracción, ni temperatura, ni altura de capa), no habla de resistencia, y no dice nada
  del aspecto de la costura. Para eso están las otras dos páginas de Prusa del lote
  (`seam-position` y la de Bambu).
- **Erratas del original, conservadas:** «Shift + Left moue button» (por «mouse»).
- El texto original está en inglés y no lo he traducido.
