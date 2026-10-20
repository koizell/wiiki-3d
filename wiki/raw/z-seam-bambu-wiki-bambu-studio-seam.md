---
titulo: "Seam settings"
url: https://wiki.bambulab.com/en/software/bambu-studio/Seam
sitio: wiki.bambulab.com
tipo: oficial
capturado: 2026-10-19
autor: Bambu Lab (Jessie)
idioma: en
---

## ¶ Introduction

The seam is a kind of gap between the start and end points of each perimeter of the layer( Unless you enable the Spiral Vase mode, refer to Spiral Vase | Bambu Lab Wiki). It leaves vertical seams on the surface of the model, which is unavoidable in FDM 3D printing.

Seams can be well hidden on irregular surfaces such as those with concave and convex vertices. On the other hand, some models with circular surfaces (such as cylinders) will not be able to hide the seams, which will be very obvious.

[imagen:]

**Fig.1 Seams on the surface of the cylinder**

As shown in Fig.2-2, the white points are the seams of layer 53.

|  |  |

| Fig.2-1 | Fig.2-2 Seam |

## ¶ Video Guide

## ¶ Seam Settings

The seam settings page is shown below. Seam Position, Seam Gap, Wipe Speed, and Role-Based Wipe Speed apply to all seam types. The remaining settings are specific to Scarf Seams and will be introduced in a separate section below.

Some parameters require enabling "Develop Mode", which can be activated by pressing "Ctrl+P".

[imagen:]

### ¶ Seam Options

For better print quality, the seam position can be set in the process presets. There are four types of seam positions to choose from: Nearest, Aligned, Back, and Random.

[imagen:seam_types.png]

#### ¶ Nearest

“Nearest” first finds all possible candidate positions by the following priority: concave non-overhang vertex > convex non-overhang vertex > a non-overhang vertex > overhang vertex.

That is, it will preferentially select concave or convex non-overhanging vertices to make the seam position more hidden. If your model has sharp corners, this will effectively make the seam **invisible**.

However, if the current layer does not have either of these vertices available, it selects from among the other candidate non-overhang vertices so that it is closest to the end of the previous print path. As a result, this option optimizes the traveling path to minimize the impact of filament stringing.

[imagen:]

**Nearest**

#### ¶ Aligned

The seam placing logic is the same as “Nearest**”** for finding the candidates, but it will choose the one that is nearest to the start point of the previous layer. This will ensure the seam is mostly aligned throughout the whole object.

[imagen:]

**Aligned**

#### ¶ Back

The seam will be set behind the model. If you want to get a smooth surface in the front, such as an Iron Man mask, it will be a good choice.

[imagen:]

**Back**

#### ¶ Random

Random seams will select a different location on each layer to place the seams, making the seams look less uniform and less obvious than "aligned" or "back". But it will cause some "zits" effects on the surface of the model.

[imagen:]

**Random**

### ¶ Seam Gap

To make the seams look more hidden, the extrusion is stopped in advance when printing the inner and outer walls, leaving a gap at the seam position to accommodate excess material. This length is expressed as a percentage of the current nozzle diameter. The default value is 15%.

[imagen:]

### ¶ Wipe speed

When retraction, a short wiping is usually performed to clean the nozzle (details can be found in Retraction | Bambu Lab Wiki), and the wiping speed can be adjusted. This value is expressed as a percentage and will be calculated based on the percentage of traveling speed. For example, **setting the wiping speed to 80% means that the wiping speed = the traveling speed * 80%.**

[imagen:]

### ¶ Manual-seam painting

Sometimes the auto seam position may be not ideal, you can customize the seam position by manually painting the method. The seam painting function can be enabled here:

[imagen:]

Specific operations are shown in the following GIF:

[imagen:]

## ¶ Scarf seam

Bambu Studio introduced scarf seams in version 1.9, which in most cases can reduce the visibility of seams. This feature changes the routing of the seam, making it overlap like a scarf. Segmented flow control and wipe speed control, improve riveting to weaken the seam. The following is a GIF of the scarf seam.

[imagen:]

From the picture, it can be seen that by controlling the nozzle height at the starting point and the amount of extruded material, the joint can be more tightly combined at the starting and ending points. The following is a detailed rendering of the routing:

[imagen:]

### ¶ Filament scarf seam settings

Starting from version 1.10, you can set whether to enable scarf seams for each filament in the filament settings.

[imagen:filament_settings.png]

### ¶ Scarf seam type

To enable the scarf seam, go to **Quality** then enable **Override filament scarf seam setting**. This will display additional settings including the Scarf seam type.

[imagen:scarf_seam_setting.png]

There are a total of 3 options for scarf seam types:

- **None**

- **Contour**

- **Contour and Hole**

[imagen:seam_type.png]

Here are some examples of using torus:

[imagen:none.png]

Select "Contour" at the scarf seam:

[imagen:contour_option.png]

Select "contour and hole" at the scarf seam:

[imagen:contour2.png]

### ¶ Scarf start height

The scarf start height refers to the Z height when the nozzle begins to print the wall, and this value can be expressed in millimeters or as a percentage of the current layer height, such as 10% represents the starting height of the scarf seam is 10% of the current layer height. If the starting height is set to 100%, it will become an ordinary seam.

[imagen:scarf_start_height.png]

[imagen:]

[imagen:]

### ¶ Scarf slope gap

When the scarf slope gap is enabled, the inner wall is cut to accommodate the excess material. This parameter, if expressed in percentages, is calculated by multiplying a specific factor by a percentage of the nozzle diameter to determine the gap.

[imagen:]

### ¶ Scarf length

The length of the scarf seam and the scarf seam will be disabled when the length is 0. If 'scarf around the entire wall' is enabled, the scarf length set will not work.

[imagen:scarf_length.png]

### ¶ Smart scarf seam application

Bambu Studio has a smart seam selection function, which selects whether to apply scarf seams based on the characteristics of the model. When the overhang of the seam position is too large, and when the angle of the seam position is small enough to conceal the seam, it will not use scarf seams. When the wall does not have a suitable sharp angle that traditional seams cannot effectively conceal, then scarf seams are applied. Turn off this option to apply scarf seams to all areas.

### ¶ Seam placement away from overhangs(experimental)

Due to the small extrusion of the scarf seam, the lines may be difficult to bond properly in the hanging area. To ensure normal printing of the appearance surface, this option should only be applied to areas with low overhang degrees. Ordinary seams are still used in areas with high overhang degrees.

[imagen:scarf_seam_overhangs.png]

### ¶ Scarf application angle threshold

Due to the ability to effectively conceal seams at sharp angles, scarf seams are not enabled by default when the model surface has sharp angles. Instead, seams can be directly hidden at sharp angles. If you want to apply scarf seams at sharp angles or need to adjust the application range of scarf seams, you can adjust the angle threshold parameter.

This option sets the angle threshold to determine whether to apply the scarf seam. If the seam angle within the perimeter of a single layer exceeds this value (indicating that the model surface does not have a sharp enough angle), scarf seams should be applied, otherwise, scarf seams will not be applied.

[imagen:angle.png]

[imagen:angle_threshold.png]

## ¶ Scarf seam effect adjustment

If you are not satisfied with the effect of the scarf seam, you can adjust the following parameters to optimize the seam effect.

### ¶ Scarf around entire wall

As the name suggests, extend the scarf seam to the entire wall. **Enabling this option requires caution as it may result in using a smaller extrusion amount for the entire perimeter, which may cause poor adhesion between lines and result in surface defects.**

[imagen:]

### ¶ Scarf steps

The minimum number of sections required for the scarf seam, that is, the slope of the starting position of the scarf seam is divided into several steps. However, it should be noted that some seam positions cannot be accurately divided into the set number of steps, so **the actual scarf steps ≥ the set scarf steps.**

[imagen:]

### ¶ Scarf joint for inner walls

Enabling this option, the inner walls will also adopt scarf seams, and this option is enabled by default.

## ¶ End Notes

We hope this guide has provided clear and practical support.

If the issue remains unresolved, please submit a support ticket and include your recent printer logs and additional pictures or other details. Our customer support team will review your request and provide detailed assistance.

You can also visit Bambu AI, which can instantly answer common questions and provide you with operational guidance.

## Notas del recolector

- **Esta es la página dedicada a la costura que el brief señalaba como candidata principal**, y
  es la que enlaza la fuente ya descargada con el rótulo «Seam | Bambu Lab Wiki». Está
  en el prefijo permitido `/en/software/`. Es la fuente más específica del lote: explica
  qué es la costura, cómo se coloca y qué ajustes la hacen menos visible.
- **Aviso técnico sobre cómo se obtuvo el cuerpo:** el wiki de Bambu Lab se sirve como
  aplicación Vue y el artículo llega renderizado en el servidor dentro de
  `<template slot="contents">`. El conversor a Markdown de esta URL devuelve el cuerpo
  vacío; el texto de arriba está extraído de ese fragmento.
- **Lo que la página afirma sobre la naturaleza de la costura** (texto literal): «The seam is
  a kind of gap between the start and end points of each perimeter of the layer […] It leaves
  vertical seams on the surface of the model, **which is unavoidable in FDM 3D printing**».
  Es la fuente del gate «la costura no es un defecto» del brief, con la redacción de la
  propia casa.
- **El criterio de visibilidad por forma de la pieza está en el primer párrafo:** «Seams can
  be well hidden on irregular surfaces such as those with concave and convex vertices. On the
  other hand, some models with circular surfaces (such as cylinders) will not be able to hide
  the seams, which will be very obvious.» Es exactamente la escena 1 de la prueba de utilidad
  del brief (pieza cilíndrica con línea vertical visible), y la respuesta de la casa es que
  en esa forma la costura **no se puede esconder**, no que esté mal.
- **Las cuatro posiciones de costura y lo que gana cada una**, con su texto:
  - *Nearest* — busca vértices candidatos por prioridad (cóncavo sin voladizo > convexo sin
    voladizo > vértice sin voladizo > vértice con voladizo); con esquinas vivas la costura
    queda «effectively invisible»; además optimiza el recorrido para minimizar el stringing.
  - *Aligned* — misma lógica de candidatos que *Nearest*, pero elige el más cercano al
    **punto de inicio** de la capa anterior, de modo que la costura queda alineada a lo largo
    del objeto.
  - *Back* — «The seam will be set behind the model», con el ejemplo explícito de una máscara
    de Iron Man: es la respuesta directa a la escena 3 del brief (costura en la cara que se
    va a ver y no se puede girar).
  - *Random* — posición distinta en cada capa: la costura parece menos uniforme y menos
    llamativa, pero «it will cause some "zits" effects on the surface of the model». El texto
    dice lo mismo que la página de Prusa sobre el coste de *Random* (zits), pero aquí no se
    dice que *Random* dé más resistencia: eso sólo lo dice Prusa. **La guía no debe unir las
    dos cosas.**
- **Los dos ajustes que la página da como número:** «Seam Gap […] This length is expressed as
  a percentage of the current nozzle diameter. The default value is 15%.» y el Wipe speed
  («setting the wiping speed to 80% means that the wiping speed = the traveling speed *
  80%»). El 15 % es un valor por defecto de Bambu Studio, no una propiedad del material: la
  guía tiene que presentarlo como el valor por defecto de su slicer.
- **El *scarf seam* (la «costura bufanda») es la parte más específica de la página:** Bambu
  Studio 1.9 la introdujo, 1.10 permite activarla por filamento. La página da sus
  condiciones de uso, que encajan con el gate 4 del brief: sólo se aplica donde la costura
  tradicional no se puede esconder, **no** se aplica por defecto en ángulos vivos (donde la
  costura se puede esconder directamente) y su aplicación tiene un umbral de ángulo
  configurable. Sus contraindicaciones están escritas: «Scarf around entire wall […] may
  result in using a smaller extrusion amount for the entire perimeter, which may cause poor
  adhesion between lines and result in surface defects», y «Seam placement away from
  overhangs (experimental)» avisa de que, por la poca extrusión de la costura bufanda, «the
  lines may be difficult to bond properly in the hanging area».
- **Prusa llama a lo mismo *scarf joint* y da más opciones de tipo** (Nowhere / Contour /
  Everywhere, frente a None / Contour / Contour and Hole de Bambu). Las dos páginas son de
  slicers distintos y usan nomenclatura distinta: es un caso de contraste que el cocinero
  debe señalar, no de promediar.
- **La página remite a la página de retracción** («details can be found in Retraction | Bambu
  Lab Wiki»), que también he descargado en este lote: es el mecanismo por el que la costura
  se nota en la pared exterior.
- **El apartado «Video Guide» no tiene texto:** sólo hay un vídeo incrustado, que no se ha
  transcrito. Las capturas de las figuras no tienen texto alternativo, salvo los nombres de
  fichero que sí los traía el atributo `alt` (`seam_types.png`, `scarf_seam_setting.png`, etc.).
- **Erratas y rarezas del original, conservadas:** «The seam is a kind of gap between the start
  and end points of each perimeter of the layer( Unless you enable the Spiral Vase mode…» —
  paréntesis sin cerrar y espacio antes de «Unless»; «The length of the scarf seam and the
  scarf seam will be disabled when the length is 0» (redacción defectuosa, se deja como
  está); «Segmented flow control and wipe speed control, improve riveting to weaken the
  seam» (traducción automática: «riveting» por «riveting/joining»).
- **Fechas de la página:** creada el 2022-08-23, última actualización 2026-08-05, firma de
  «Jessie». El texto original está en inglés y no lo he traducido.
