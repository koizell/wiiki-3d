---
titulo: "PrusaSlicer General info | Prusa Knowledge Base"
url: https://help.prusa3d.com/article/prusaslicer-general-info_1910
sitio: help.prusa3d.com
tipo: oficial
capturado: 2026-10-13
autor: Prusa Research
idioma: en
---

# PrusaSlicer General info

Relevant for

PrusaSlicer

To start printing, you need to convert your model to layer-by-layer
instructions for the printer with a slicer. We recommend using the
PrusaSlicer, especially if you have an Original Prusa Printer.

## Download

The PrusaSlicer program can be found in our Drivers page, or directly in the
PrusaSlicer product page.

## First use

When opening the program for the first time, it will prompt the Configuration
Wizard (Configuration assistant for Mac). There, you can select your printer and
filament.

After finishing the configuration setup, you can try your First print with
PrusaSlicer (2.9).

We have many articles describing specific functions in the slicer: PrusaSlicer
Support.

## User interface

The PrusaSlicer settings are divided into Print Settings, Filaments, and
Printers, accessed by tabs on the top left. The Print settings will define
details of the model to be printed, like infill and supports. In "Filaments",
you can adjust the settings for the specific filament being used, like
temperature. The Printers tab is where you will find settings that can be
changed in the printer's functioning, like retraction and firmware details. You
can read more about the PrusaSlicer interface in our dedicated articles.

We have a PrusaSlicer FAQ.

## PrusaSlicer history

The Slic3r project was born in 2011 within the RepRap community as an effort to
provide the growing 3D printing technology under the leadership of Alessandro
Ranellucci, an open-source slicer. Slic3r spread among users quickly. When Josef
Prusa was looking for a leading slicing software for Original Prusa printers,
the choice fell on Slic3r. It was (and still is) an open-source and very
powerful software.

Jo and Alessandro in 2012 (video interview)

However, as Prusa Research was growing (very, very, very fast), we needed to be
more flexible with the slicing software development. We needed to make changes
to the software, and the changes had to be done asap. We also needed to add more
features. At this point, the co-operation with the detached original Slic3r team
was unsustainable. The bottom line is that we decided to establish a fork of the
original Slic3r project.

Slic3r Prusa Edition was released in November 2016 – read more about the launch
here. A dedicated team of full-time Slic3r PE developers was established, and
new functions were being added rapidly. These changes culminated in May 2019,
when we released a new version with a major UI overhaul under a new name -
PrusaSlicer 2.0.

Why the name change? First of all, the old name was really confusing. Even in
our own materials, we often didn't include the "PE" suffix, and the community
used Slic3r and Slic3r PE pretty much interchangeably. New users could
mistakenly download Slic3r and wonder why it looks different from the
screenshots in the 3D Printing Handbook and why it's not configured for their
Prusa printer. Speaking about the original Slic3r: with each update, Slic3r PE
was moving further and further away from its original code. We've rewritten all
of the Perl source code into C++, and especially with the 2.0 update, there were
so many differences that it seemed appropriate to make the name more distinct.

Of course, it's still open-source, and you'll find everything on our GitHub.
And we're still proud that our slicer is based on the original project written
by Alessandro Ranellucci! Both projects now happily coexist, and new features
are frequently merged between them.

## Notas del recolector

- **Comprobación:** HTTP 200, 1.179.152 bytes de HTML, 10.966 caracteres de
  texto extraído. No es una cáscara.
- **Es la fuente de la definición.** La primera frase es literal y es la que
  sostiene «qué es un slicer»: «To start printing, you need to convert your
  model to layer-by-layer instructions for the printer with a slicer.» No hay
  otra frase en el lote que defina el concepto.
- **La separación de perfiles en tres pestañas es literal y es el equivalente
  exacto de lo que hace Bambu:** Print Settings / Filaments / Printers frente a
  printer / filament / process. Es la mejor evidencia de que los dos slicers
  organizan lo mismo con nombres distintos.
- Fechas literales de la historia: Slic3r nace en 2011 en la comunidad RepRap;
  Slic3r Prusa Edition en noviembre de 2016; PrusaSlicer 2.0 en mayo de 2019.
  También que se reescribió de Perl a C++.
- **Riesgo de confusión, y conviene que el cocinero lo sepa:** el artículo habla
  de Slic3r y de PrusaSlicer como proyectos distintos que siguen coexistiendo.
  Si la guía menciona PrusaSlicer, nada de este párrafo de historia sostiene
  una afirmación sobre el Slic3r actual.
- Lo que **no** hay aquí: nada sobre el contenido del fichero exportado. El
  artículo termina en la historia y no menciona el G-code.
- He omitido el menú, el bloque de idiomas, los 40 comentarios y la leyenda
  «Jo and Alessandro in 2012 (video interview)», que en el HTML es texto de una
  imagen y no lleva URL legible.
- No se ha traducido nada.
