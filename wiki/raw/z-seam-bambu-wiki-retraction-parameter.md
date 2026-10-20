---
titulo: "Retraction"
url: https://wiki.bambulab.com/en/software/bambu-studio/parameter/retraction
sitio: wiki.bambulab.com
tipo: oficial
capturado: 2026-10-19
autor: Bambu Lab (Jessie)
idioma: en
---

## ¶ Introduction

FDM 3D printing works by melting the filament and extruding it layer by layer to build a 3D model. During the printing process, the tool head is constantly moving, and there are usually many travel paths, we do not want the nozzle to extrude the filament during the traveling. However, due to the high temperature and the internal pressure of the nozzle, the molten filament may still leak out of the nozzle, leaving the stringing and oozing on the printed parts.

The retraction settings can help you reduce stringing during printing. By pulling some of the filaments back from the hot end before the tool head travels, the pressure of the molten filament in the hot end can be reduced, thus reducing the chance of stringing on the traveling path. The retraction usually occurs before the traveling, and at the end of the traveling, the filament will be reloaded to the hot end, allowing it to be extruded properly to continue printing.

[imagen:]

## ¶ Enable retraction

You can enable the retraction and set detailed parameters in the **Printer Settings** and **Filament Settings**. The parameters of the retraction can be set in the **Printer Settings - Extruder.**

|  |  |

You can also set the retraction for a specific filament separately in the **Filament Settings - Settings Overrides**. **If the parameter is not checked and modified on this page (the parameter box still shows gray or N/A), it will default to using the retraction setting in the Printer Settings.**

|  |  |

## ¶ Parameter introduction

### ¶ Length

This is the amount of filament in the extruder that is pulled back to avoid oozing during long travel distances. Set to 0 to disable retraction.

### ¶ Z hop when retracting

Whenever there is a retraction, the nozzle is lifted a little to create clearance between the nozzle and the print. This prevents the nozzle from hitting the print when traveling more. **This value cannot exceed 5mm.**

### ¶ Z Hop type

The following are several ways to lift the nozzle after retraction is complete, **using slope, spiral, and auto lift can effectively reduce oozing and stringing.**

#### ¶ Slope

|  |  |

#### ¶ Normal

|  |  |

#### ¶ Spiral

|  |  |

#### ¶ Auto

Select "Auto" and the printer will adaptively select the Z-lift mode. The specific judgment method is as follows:

- The travel within a single layer will first determine whether it will pass through the overhang area during slope lifting. The overhang area may expand and warp during the printing, and during the process of slope lifting to the highest height, it will pass through a larger XY area, which has a certain chance of colliding and scraping with this wrapped part. If there is no risk of collision, use slope lifting; otherwise, use spiral lift. Because the spiral lifting trajectory is a spiral, it only passes through the smaller XY area above the part surface, with a lower probability of scratching.

- When changing layers, the printer always uses the spiral lift mode.

### ¶ Z hop upper and lower boundary

The Z hop will only take effect when the Z hop is between the Z hop lower and upper boundary. This is related to the Z-axis height range that the printer can print, so the Z-hop range of different printers may vary.

### ¶ Retraction speed

The speed for retraction to pull back the filament.

### ¶ Deretraction speed

The speed for reloading filament into the extruder after a retraction; setting this to 0 means that it will be the same speed as the retraction.

### ¶ Travel distance threshold

Only trigger retraction when the travel distance is longer than this threshold. When printing some models with small gaps, the travel distance may be too small to trigger the retraction, but the nozzle will form strings between the small gaps, and the travel distance threshold can be adjusted to trigger the retration to improve the problem. Here is an example of using this parameter:

[imagen:]

|  |  |
| Travel distance threshold 1mm | Travel distance threshold 3mm |

**Note:**

-

When you enable "**Reduce infill retraction**" in the **Process — Other — G-code output**, it will only pull back the filament printing wall path and layer changes, even the traveling between the internal infill path that meets the travel distance threshold (such as traveling between concentric infill patterns). This option is enabled by default, because the retraction is to prevent stringing and oozing from affecting the appearance of the model, and defects inside the model often can be ignored.

-

The internal path of the support, even if the travel distance threshold is met, will never trigger the retraction. Because the support is not part of the printed model, we usually don't care about defects inside the support.

|  |  |

### ¶ Retract on layer change

Enable this will force the retraction on layer changes.

### ¶ Wipe while retracting

This moves the nozzle along the last extrusion path when retracting to clean any leaked material on the nozzle. This can minimize blobs when printing a new part after traveling.

[imagen:]

Before retraction, the tool head has a "shaking" action that is wiping, as shown in the following figure:

[imagen:]

### ¶ Wipe distance

Once the wipe before retraction is enabled, it determines how long the nozzle will move along the last path while retracting.

[imagen:]

### ¶ Retract amount before wipe

This is the length of fast retraction before a wipe, this value is the percentage relative to retraction length. The default value is 0. If it doesn't retract before wiping, the Z-seam effect on the outer wall will be better (in the case of the default inner-outer wall printing sequence).

## ¶ Matters needing attention

1. Retraction is very important to the quality of 3D printing. Because if there is no retraction, it is likely to lead to stringing and oozing. However, it is also important to avoid setting the retraction value too high, otherwise, the extruder will pull the filament back too long (or too often), resulting in under-extrusion of the print and layer gaps, and there is a certain probability that the extruder will clog.

2. In some cases, the use of retraction may also have negative effects, especially when printing flexible materials such as TPU. This is because these flexible materials are elastic, and retraction may affect the diameter of the filament and cause it to shrink, leading to clogging and other extrusion problems. However, for all other materials such as PLA, ABS, and PETG, the printing effect is better when the retraction is enabled.

3. Damp filaments are more prone to stringing and oozing during the printing, and usually cannot be completely solved by simply adjusting the retraction settings. You'd better try to dry the filaments first and then adjust the retraction settings to get better print quality.

## ¶ End Notes

We hope this guide has provided clear and practical support.

If the issue remains unresolved, please submit a support ticket and include yourrecent printer logs and additional pictures or other details. Our technical team will review your requestand provide detailed assistance.

You can also visit Bambu AI,which can instantly answer common questions and provide you with operational guidance.

## Notas del recolector

- **Aviso técnico sobre cómo se obtuvo el cuerpo:** el wiki de Bambu Lab se sirve como
  aplicación Vue y el artículo llega renderizado en el servidor dentro de
  `<template slot="contents">`. El conversor a Markdown de esta URL devuelve el cuerpo
  vacío; el texto de arriba está extraído de ese fragmento.
- **Esta es la página que el brief pedía como «fuente sobre retractar antes de empezar la
  capa»**, y es la que enlaza la página de costura de Bambu Studio («When retraction, a short
  wiping is usually performed to clean the nozzle (details can be found in Retraction | Bambu
  Lab Wiki)»). Está en el prefijo permitido `/en/software/`.
- **El mecanismo por el que la costura se nota, con la fuente que lo dice:** la página
  explica que la retracción «usually occurs before the traveling, and at the end of the
  traveling, the filament will be reloaded to the hot end». Es decir, la retracción ocurre
  justo en el punto donde termina una capa y empieza la siguiente, y ahí es donde se
  reinyecta el filamento: ese es el punto que el lector ve como costura. La página no dice
  «esto es la costura Z», pero es el mecanismo, y el texto está íntegro arriba.
- **La afirmación más directamente útil para este tema, y es literal:** en «Retract amount
  before wipe» — «This is the length of fast retraction before a wipe, this value is the
  percentage relative to retraction length. The default value is 0. **If it doesn't retract
  before wiping, the Z-seam effect on the outer wall will be better** (in the case of the
  default inner-outer wall printing sequence)». Es la única mención literal de «Z-seam» que
  he encontrado en las páginas de Bambu, y dice dos cosas: (a) que la retracción previa a la
  limpieza empeora el acabado de la costura en la pared exterior, y (b) que el resultado
  depende del orden de impresión por defecto (pared interior-exterior), o sea, **de la
  configuración, no del material**. Cuidado con el matiz: el valor por defecto de ese
  parámetro es 0, y el texto dice que *no* retraer antes de limpiar mejora el Z-seam.
- **«Retract on layer change» es el interruptor del caso de la costura:** «Enable this will
  force the retraction on layer changes». La página dice que la retracción es para evitar
  el stringing y el oozing, no para la costura: ése es el alcance real de la retracción, y
  es un límite de la fuente que la guía debe respetar.
- **Cifras de esta página que NO deben repetirse en la guía de costura:** el Z-hop «cannot
  exceed 5mm» (es un límite del aparato y pertenece a la guía de retracción), el umbral de
  distancia de viaje (sin valor por defecto en el texto; sólo el ejemplo de 1 mm y 3 mm en
  una figura) y la velocidad de retracción y derretracción (sin cifras en el texto). Tampoco
  hay longitudes de retracción en milímetros: la página deja claro que el ajuste depende
  del filamento («Filament Settings - Settings Overrides») y de si el filamento está seco.
- **Aviso para el diferencial «costura o retracción»:** la página separa dos síntomas que a
  simple vista se confunden. El stringing y el oozing son de la retracción y de la
  humedad («Damp filaments are more prone to stringing and oozing during the printing, and
  usually cannot be completely solved by simply adjusting the retraction settings»); la
  costura es otra cosa. La página de湿度 —`secar-filamento`— y la de stringing son las
  dueñas de esos dos.
- **La retracción no es neutra para los materiales flexibles:** el punto 2 de «Matters
  needing attention» dice que con TPU la retracción «may affect the diameter of the filament
  and cause it to shrink, leading to clogging», mientras que con PLA, ABS y PETG el
  resultado es mejor con la retracción activada. Es el único dato de esta página que
  distingue materiales, y sirve para la variable `material` de la guía.
- **Erratas del original, conservadas:** «include yourrecent printer logs», «yourrequestand»
  y «Bambu AI,which» (la errata «yourrequestand» viene de que la comprobación ortográfica
  de Wiki.js partió «your request» y «and» en dos palabras).
- **Fechas de la página:** creada el 2023-11-28, última actualización 2026-09-04, firma de
  «Jessie». El texto original está en inglés y no lo he traducido.
