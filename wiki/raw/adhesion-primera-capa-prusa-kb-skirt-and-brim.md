---
titulo: "Skirt and Brim"
url: https://help.prusa3d.com/article/skirt-and-brim_133969
sitio: help.prusa3d.com
tipo: oficial
capturado: 2026-10-04
autor: Prusa Research
idioma: en
---

# Skirt and Brim

Relevant for
MMU family

MINI family

MK3 family

OLD PRODUCTS

SOFTWARE

36 comments

Article is also available in following languages
[imagen: English]

[imagen: Čeština]

[imagen: Polski]

[imagen: Deutsch]

[imagen: Français]

[imagen: Español]

[imagen: Italiano]

[imagen: 日本語]

Some options will only appear when Expert mode is selected.

## Skirt

The skirt is a printed outline of all of the models on the print bed. It's printed before any of the models and its purpose is mainly to stabilize the flow of the filament through the nozzle.

The skirt is also useful to verify the adhesion of the first layer to the print bed. Since it's printed before the models, you can quickly change the Live Z adjust if you see the first layer not sticking properly or being too squished by the nozzle.

[imagen: ]

## Loops (minimum)

The number of loops of the skirt. If the Minimal filament extrusion length parameter is set, the number of loops may be higher than the one configured here.

Set to 0 to disable the skirt completely.

## Distance from object

Distance between the skirt and object(s).

## Skirt height

The number of skirt layers to be printed.

One-layer tall skirts can be difficult to remove from the print bed. Prusa profiles typically use a three-layers tall skirt for this reason.

## Draft shield

If enabled it creates a skirt as tall as the tallest object in the scene. This can be used to protect ABS, ASA, and other materials from warping by creating a micro-climate around the printed part and protecting the print from draft/wind.

## Minimal filament extrusion length

Forces more skirt loops when necessary to ensure the minimum amount of filament set here is extruded before the skirt is finished. For multi extruder machines, this minimum applies to each extruder.

[imagen: ]

## Brim

Before you consider applying extra adhesion materials onto the bed, consider using the B rim option in PrusaSlicer which increases the surface area of the first layer. You can set the brim size manually in PrusaSlicer by going into Print settings - Skirt and brim - Brim .

You should consider using the brim option when printing:

- Tall objects with a small base

- Multiple small objects at once

## Brim type

You can select to print Outer brim only, Inner brim only or both Outer and inner brim.

## Brim width

The horizontal width of the brim that will be printed around each object on the first layer. Generally, it is advised to use at least a 3 mm brim to increase the adhesion.

## Brim separation gap

The offset of brim from the printed object for easier brim removal. The offset is applied after the Elephant foot compensation.

[imagen: ]

## Brim for individual objects

You can turn on brim just for some of the objects and customize brim settings for each object separately. This feature is only available in the Advanced and Expert modes.

Right-click on a model and select Add settings - Skirt and brim . You can then pick which brim settings you wish to adjust for the selected model. These settings will appear in the right panel and override the global brim settings.

[imagen: ]

## Notas del recolector

- Es un artículo **de software**, de PrusaSlicer. No habla de cama, ni de temperatura, ni de
  la boquilla: habla de la falda y del ala, y de cómo usar la falda como **test de la
  primera capa**. La conexión con el tema del brief es esa, y es una conexión real: la
  página dice que la falda se imprime antes que los modelos y que por eso se puede
  cambiar el ajuste Z en caliente al verla.
- **El nombre que usa Prusa es «Live Z adjust».** El brief avisa de que Z-level, Live Adjust
  Z y Z-compensation no son lo mismo; esta página no habla de Z-level ni de
  Z-compensation, y usa exactamente el término «Live Z adjust». Se deja el término tal
  cual y no se ha normalizado a ninguno de los otros dos.
- **Cifras:** «at least a 3 mm brim» es el único número de medida que da. «three-layers tall
  skirt» es lo que usan los perfiles de Prusa, por razones de **extracción**, no de
  adhesión: una falda de una sola capa cuesta de quitar. «Skirt height» es un número de
  capas, no milímetros. Draft shield toma la altura del objeto más alto de la escena.
- **El orden que propone la página es explícito y es suyo:** «Before you consider applying
  extra adhesion materials onto the bed, consider using the Brim option». O sea: brim
  antes que material adhesivo. Es una frase, no una sección, pero es una prioridad
  explícita y conviene no perderla.
- **Los dos casos que menciona para el brim** son «tall objects with a small base» y
  «multiple small objects at once». No dice qué hacer cuando la pieza es plana y ancha, y
  no da ningún criterio de diagnóstico, sólo una recomendación de cuándo activarlo.
- Brim type (outer / inner / ambos) y Brim separation gap no tienen justificación en la
  página: son descripciones de parámetro. El gap se aplica **después** del Elephant foot
  compensation, que es el único sitio donde aparece el nombre de esa compensación.
- El apartado **Draft shield** es sobre warping de ABS y ASA, y queda fuera del alcance
  del brief. Se conserva sin recortar.
- En el original la palabra «Brim» aparece con un espacio: «the B rim option». Se ha
  conservado la errata.
- La cabecera («Relevant for», «36 comments», «Article is also available in following
  languages») es mobiliario de página, y la nota de arriba de que algunas opciones sólo
  aparecen en modo Expert es del cuerpo. La lista de comentarios no se ha capturado.
- Las imágenes no tienen `alt`: van como `[imagen:]` sin descripción.
- El texto original está en inglés y yo no lo he traducido.