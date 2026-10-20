---
titulo: "Seam"
url: https://wiki.bambulab.com/en/filament-acc/filament/print-quality/seam
sitio: wiki.bambulab.com
tipo: oficial
capturado: 2026-10-19
autor: Bambu Lab (Dora Ding)
idioma: en
---

# ¶ Seam

**In FDM 3D printing, a seam is formed at the junction of the starting point and the end point of each layer of printing, which is a normal phenomenon. To learn more about seams, refer to this wiki: ****Seam | Bambu Lab Wiki。**

[imagen:]
[imagen:]
**You can use the following methods to properly improve the quality of the seam:**

1. Set the number of wall loops to 3;

2. Try to avoid printing multiple models on one plate to reduce tool head travel;

3. Appropriately raise the nozzle temperature and reduce the printing speed of the outer wall;

4. For some special models, you can enable the “Spiral vase” mode. When the "Spiral Vase" mode is enabled, the model will be printed in a linear spiral, and the seams will only appear on the bottom shell ayers , and not on the outer walls at all. Note: The model printed by this mode has only a single outer wall, no infill and top shell, and only applies to some simple models (complex models cannot be completed with a single line, resulting in some suspended sections when slicing). Please refer to this wiki for more details: Spiral Vase | Bambu Lab Wiki。

[imagen:]

## Notas del recolector

- **Aviso técnico sobre cómo se obtuvo el cuerpo:** el wiki de Bambu Lab se sirve como
  aplicación Vue y el artículo llega renderizado en el servidor dentro de
  `<template slot="contents">`. El conversor a Markdown de esta URL devuelve el cuerpo
  vacío; el texto de arriba está extraído de ese fragmento.
- **Es la página dedicada de la sección «Print quality» de la wiki de Bambu**, distinta de la
  página general ya descargada (`common-print-quality-problem`). Vive en el prefijo
  permitido `/en/filament-acc/`.
- **Aviso de solapamiento con la fuente que ya estaba en `wiki/raw/`:** el apartado «Seam»
  de `secar-filamento-bambu-wiki-common-print-quality-problem.md` es, párrafo por párrafo,
  el mismo texto que esta página. Lo único que esta aporta de más es el **enlace a la
  página dedicada «Seam | Bambu Lab Wiki»**, que es el corazón del tema y que he
  descargado aparte en este lote. El cocinero tiene que saber que tiene el mismo
  contenido dos veces, por si decide citar una u otra y no repetir la fuente.
- **Lo que la página dice de la costura, con su redacción:** «a seam is formed at the
  junction of the starting point and the end point of each layer of printing, **which is a
  normal phenomenon**». Es la frase que sostiene el gate 1 del brief: la costura no es un
  defecto, es un fenómeno normal. Obsérvese que la definición dice «each **layer**», mientras
  que la página de settings de Bambu Studio dice «each **perimeter** of the layer». Son dos
  formulaciones distintas de la misma casa y de la misma idea; la del apartado de print
  quality es más laxa.
- **Los cuatro métodos** son los mismos cuatro de la página general, pero aquí se leen
  como la lista de acciones de la propia sección de calidad de impresión: 3 perímetros de
  pared, evitar varias piezas en la misma plato, subir la temperatura de boquilla y bajar la
  velocidad de la pared exterior, y el modo *spiral vase*.
- **El punto 3 es el único que lleva cifras implícitas y NO las trae explícitas:** la página
  dice «Appropriately raise the nozzle temperature and reduce the printing speed of the outer
  wall», sin números. Las cifras de temperatura y de velocidad exterior pertenecen a otras
  guías (hotend, paredes y perímetros) y aquí no hay nada que publicar.
- **El punto 4 es exactamente el caso que el brief marca como puerta del gate 4:** el modo
  *spiral vase* «only applies to some simple models (complex models cannot be completed with
  a single line, resulting in some suspended sections when slicing)» y el modelo impreso así
  tiene «only a single outer wall, no infill and top shell». La página de *Spiral Vase* es
  de la guía `relleno-patrones`, no de esta: no se ha descargado.
- **Erratas del original, conservadas:** «bottom shell ayers» (por «layers») y el punto y coma
  chino «。」 que aparece dos veces, copiado de la versión china de la wiki.
- **Fechas de la página:** creada el 2023-12-10, última actualización 2024-05-28, firma de
  «Dora Ding». El texto original está en inglés y no lo he traducido.
