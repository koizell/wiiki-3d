---
titulo: "Simplify3D Print Quality Troubleshooting Guide"
url: https://www.simplify3d.com/support/print-quality-troubleshooting/
sitio: simplify3d.com
tipo: oficial
capturado: 2026-10-16
autor: Simplify3D
idioma: en
---

# Print Quality Troubleshooting Guide

This guide is a great place to start if you are trying to improve the quality of your 3D printed parts. We have compiled an extensive list of the most common 3D printing issues along with the software settings that you can use to solve them.

## Layer Shifting

Most 3D printers use an open-loop control system, which is a fancy way to say that they have no feedback about the actual location of the toolhead. The printer simply attempts to move the toolhead to a specific location, and hopes that it gets there. In most cases, this works fine because the stepper motors that drive the printer are quite powerful, and there are no significant loads to prevent the toolhead from moving. However, if something does go wrong, the printer would have no way to detect this. For example, if you happened to bump into your printer while it was printing, you might cause the toolhead to move to a new position. The machine has no feedback to detect this, so it would just keep printing as if nothing had happened. If you notice misaligned layers in your print, it is usually due to one of the causes below. Unfortunately, once these errors occur, the printer has no way to detect and fix the problem, so we will explain how to resolve these issues below.

### Common Solutions

#### Toolhead is moving too fast

If you are printing at a very high speed, the motors for your 3D printer may struggle to keep up. If you attempt to move the printer faster than the motors can handle, you will typically hear a clicking sound as the motor fails to achieve the desired position. If this happens, the remainder of the print will be misaligned with everything that was printed before it. If you feel that your printer may be moving too fast, try to reduce the printing speed by 50% to see if it helps. To do this, click "Edit Process Settings" and select the Speeds tab. Adjust both the "Default Printing Speed" and the "X/Y Axis Movement Speed." The default printing speed controls the speed of any movements where the extruder is actively extruding plastic. The X/Y axis movement speed controls the speed of rapid movements where no plastic is being extruded. If either of those speeds are too high, it can cause shifting to occur. If you are comfortable adjusting more advanced settings, you may also want to consider lowering the acceleration settings in your printer's firmware to provide a more gradual speed up and slow down.

#### Mechanical or Electrical Issues

If the layer misalignment continues, even after reducing your print speed, then it is likely due to mechanical or electrical issues with the printer. For example, most 3D printers use belts that allow the motors to control the position of the toolhead. The belts are typically made of a rubber material and reinforced with some type of fiber to provide additional strength. Over time, these belts may stretch, which can impact the belt tension that is used to position the toolhead. If the tension becomes too loose, the belt may slip on top of the drive pulley, which means the pulley is rotating, but the belt is not moving. If the belt was originally installed too tight, this can also cause issues. An overtightened belt can create excess friction in the bearings that will prevent the motors from spinning. Ideal assembly requires a belt that is somewhat tight to prevent slipping, but not too tight to where the system is unable to rotate. If you start noticing issues with misaligned layers, you should verify that your belts all have the appropriate tension, and none appear to be too loose or too tight. If you think there may be a problem, please consult the printer manufacturer for instructions on how to adjust the belt tension.

Many 3D printers also include a series of belts that are driven by pulleys attached to a stepper motor shaft using a small set-screw (otherwise known as a grub screw). These set-screws anchor the pulley to the shaft of the motor so that the two items spin together. However, if the set-screw loosens, the pulley will no longer rotate together with the motor shaft. This means that the motor may be spinning, but the pulley and belts are not moving. When this happens, the toolhead does not get to the desired location, which can impact the alignment of all future layers of the print. So if layer misalignment is a reoccurring problem, you should verify that all of your motor fasteners are properly tightened.

There are also several other common electrical issues that can cause the motors to lose their position. For example, if there is not enough electrical current getting to the motors, they won't have enough power to spin. It is also possible that the motor driver electronics could overheat, which causes the motors to stop spinning temporarily until the electronics cool down. While this is not an exhaustive list, it provides a few ideas for common electrical and mechanical causes that you may want to check if layer shifting is a persistent problem.

## Warping

Warping of large parts, particularly with high temperature materials such as ABS.

## Curling or Rough Corners

Corners of the print tend to curl and deform after they are printed.

## Lines on the Side of Print

Side walls are not smooth, lines are visible on the side of the print.

## Vibrations and Ringing

Vibrations that cause oscillations on the surface of the print, otherwise known as "ringing".

## Not Sticking to the Bed

The first layer does not stick to the bed and the print quickly fails.

## Under-Extrusion

Printer does not extrude enough plastic, gaps between perimeters and infill.

## Over-Extrusion

Printer extrudes too much plastic, prints looks very messy.

## Gaps in Top Layers

Holes or gaps in the top layers of the print.

## Stringing or Oozing

Lots of strings and hairs left behind when moving between different sections of the print.

## Overheating

Small features become overheated and deformed.

## Layer Separation and Splitting

Layers are separating and splitting apart while printing.

## Grinding Filament

Plastic is being ground away until the filament no longer moves, otherwise known as "stripped" filament.

## Clogged Extruder

Extruder is clogged or jammed and will no longer extrude plastic from the nozzle tip.

## Stops Extruding Mid Print

Printer stops extruding plastic randomly in the middle of a print.

## Weak Infill

Very thin, stringy infill that creates a weak interior and does not bond together well.

## Blobs and Zits

Small blobs on the surface of print, otherwise known as zits.

## Gaps Between Infill and Outline

Gaps between the outline of the part and the outer solid infill layers.

## Scars on Top Surface

The nozzle drags across the top of the print and creates a scar on the surface.

## Gaps in Floor Corners

Gaps in the corners of the print, where the top layer does not join to the outline of the next layer.

## Gaps in Thin Walls

Gaps between thin walls of the print where the perimeters do not touch.

## Small Features Not Printed

Very small features are not printed or are missing from the software preview.

## Inconsistent Extrusion

Extrusion amount tends to vary and is not consistent enough to produce an accurate shape.

## Poor Surface Above Supports

Poor surface quality on the underside of the part where it touches the support structures.

## Dimensional Accuracy

Dimensional issues where the measured dimensions do not match the original design intent.

## Poor Bridging

Sagging, drooping, or gaps between the extruded segments of your bridging regions.

## Not Extruding at Start of Print

Printer does not extrude plastic at the beginning of the print.

## Notas del recolector

- El documento es el índice principal de la guía de calidad de impresión de Simplify3D. Las secciones específicas (Layer Shifting, Warping, Curling or Rough Corners, Lines on the Side of Print, Vibrations and Ringing) contienen contenido detallado sobre cada problema.
- La sección de Layer Shifting es la más relevante para el tema de piezas curvadas en Z: describe causas mecánicas (belt tension, set-screws, motor current) y de velocidad que pueden causar desalineación de capas.
- El texto original está en inglés y no ha sido traducido.
- Simplify3D es un slicer comercial, no un fabricante de impresoras, pero su guía de calidad de impresión es una referencia ampliamente utilizada en la comunidad FDM.
