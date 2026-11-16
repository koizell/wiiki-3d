---
titulo: "Orca Slicer very nice caliper utility. Makes scaling easier"
url: https://forum.bambulab.com/t/orca-slicer-very-nice-caliper-utility-makes-scaling-easier/84670
url_final: https://forum.bambulab.com/t/orca-slicer-very-nice-caliper-utility-makes-scaling-easier/84670
sitio: forum.bambulab.com
tipo: foro
autor: "Olias"
idioma: en
publicado: 2024-06-29
actualizado: "sin fecha visible"
capturado: 2026-11-16
alcance: "Caso de caja y tapa STL en Orca Slicer v2.1.1, según el autor; selección y escala mediante medición, con imágenes enlazadas"
estado: parcial
---

When it comes to slicer features, the volunteers at Softfever are enhancing their version of the slicer with tweaks that are true quality of life improvements. I could go on about all the settings I discover over time, but for this post, I’ll focus on the caliper scale feature I recently discovered and how it saved me from losing my mind with a troublesome STL I downloaded from Thingiverse. This feature, which I think was introduced in version 1.9, is being demonstrated here with v2.1.1. I believe this was also added in subsequent releases of Bambu Studio in their “measurement tool,” but I’m not sure which came first.

Note: Yes, I realize this can be done in CAD but this is a shortcut in the slicer using just two steps.

The model I am using can be found here: [https://www.thingiverse.com/thing:4792927/files](https://www.thingiverse.com/thing:4792927/files)

For whatever reason, the main STL model for the main feature does not scale correctly upon loading into the slicer. I tried it in both Bambu Studio and Orca, and both offer to scale to inches or meters and size it to fit on the plate. That’s helpful if all you want to do is print, but it does not help with two dissimilar-sized items that are meant to mate, such as a box and a lid in this example.

## [](#p-222419-problem-summary-1)Problem summary

1.  Two models of different scales that are supposed to mate.
2.  Scaling using the scale tool doesn’t allow for precision unless you know the specific dimensions. Although one could use trial and error using the scaling tool, it will only give allow you to scale the dimensions, there is no aid to what that dimension should be.

## [](#p-222419-ucalipers-as-scaling-toolu-2)Calipers as scaling tool

This is how the model and the lid load into the slicer. The error is shown at the bottom right.

[![image](https://bbl-forum.s3.dualstack.us-west-1.amazonaws.com/optimized/3X/4/4/442172d71cd4ce65274f11c8cc0f8cd789e70f1a_2_690x397.png)](https://cdn-forum.bambulab.com/original/3X/4/4/442172d71cd4ce65274f11c8cc0f8cd789e70f1a.png "image")

We don’t know what the exact model dimensions should be but we do know that the lid fits inside the box. So we use the caliper tool to measure the outside lip(70.335mm in this case.)  

[![image](https://bbl-forum.s3.dualstack.us-west-1.amazonaws.com/optimized/3X/1/6/16ca82228339dd87d01d01d4f91b9f98d0d324ba_2_690x379.png)](https://cdn-forum.bambulab.com/original/3X/1/6/16ca82228339dd87d01d01d4f91b9f98d0d324ba.png "image")

Now measure the inside vertices of the box. This is very tricky and I will show the new navigation tool at the end and how to make pivoting easer.

[![image](https://bbl-forum.s3.dualstack.us-west-1.amazonaws.com/optimized/3X/5/e/5e0a51b880a0ffb2f1d17ecc053427652918109b_2_510x375.png)](https://cdn-forum.bambulab.com/original/3X/5/e/5e0a51b880a0ffb2f1d17ecc053427652918109b.png "image")

Select inside corner vertex 1, this can be very tricky to get the exact pixel so be patient, zoomed in makes it easier. At the end of this post, I’ll show the recently added navigation box and how it can make this process easier by allowing quick pivots.  

[![image](https://bbl-forum.s3.dualstack.us-west-1.amazonaws.com/optimized/3X/2/e/2e2d79b72ff331caed1e3886041b93b5276e4a43_2_517x196.png)](https://cdn-forum.bambulab.com/original/3X/2/e/2e2d79b72ff331caed1e3886041b93b5276e4a43.png "image")

Select inside corner 2 and you will now be presented with the option to edit the dimension. Simply enter the dimension you measured from the object you wanted to fit, in this example it was 70.335mm, the slicer will do the scaling of the entire model based on that one dimension.

[![image](https://bbl-forum.s3.dualstack.us-west-1.amazonaws.com/optimized/3X/7/2/7245f736602c4e4d03041a0dab20668b63a9a200_2_517x294.png)](https://cdn-forum.bambulab.com/original/3X/7/2/7245f736602c4e4d03041a0dab20668b63a9a200.png "image")

If you did it correctly, it will look like this on the plate.

[![image](https://bbl-forum.s3.dualstack.us-west-1.amazonaws.com/optimized/3X/6/6/669435a6a49e9a5b14a3d71759dce3b6b518c5a9_2_489x375.png)](https://cdn-forum.bambulab.com/original/3X/6/6/669435a6a49e9a5b14a3d71759dce3b6b518c5a9.png "image")

## [](#p-222419-h-_____________________________________________________________-3)\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

## [](#p-222419-new-cool-xyz-cad-like-navigation-box-tool-bambu-studio-does-not-have-this-feature-i-believe-this-was-introduced-in-orca-v19-4)New Cool X/Y/Z CAD-Like navigation box tool – Bambu Studio does not have this feature. I believe this was introduced in Orca v1.9

Clearly “borrowed” from Fusion 360 or FreeCAD. This tool allows you to quickly click on a face, corner or edge and the model will pivot to that orientation and scale to fit in the window. Very helpful and much easier than mouse dragging.

Fusion 360’s version — Arguably the gold standard in navigation cubes because they allow you to not just click for quick orientation but you can smoothly drag the cube to orient the model. The other two CAD programs mentioned below do not allow this, you can only click on corners, edges and faces.  

[![image](https://cdn-forum.bambulab.com/original/3X/9/5/95136e7a01cb717befe6dd9d287cbbe01e2d7d70.png)](https://cdn-forum.bambulab.com/original/3X/9/5/95136e7a01cb717befe6dd9d287cbbe01e2d7d70.png "image")

FreeCAD’s version  

[![image](https://cdn-forum.bambulab.com/original/3X/0/f/0fbad31610411cb327d4b2dfc86b7e234e104ec9.png)](https://cdn-forum.bambulab.com/original/3X/0/f/0fbad31610411cb327d4b2dfc86b7e234e104ec9.png "image")

OnShape’s version

[![image](https://cdn-forum.bambulab.com/original/3X/9/1/9154ff856f63f8883dd7d4d17d94caf4c89fb400.png)](https://cdn-forum.bambulab.com/original/3X/9/1/9154ff856f63f8883dd7d4d17d94caf4c89fb400.png "image")

Orca Slicer’s version. Acts just like Fusion 360 where you can chose to click or simply drag the cube for finer adjustments.

[![image](https://cdn-forum.bambulab.com/original/3X/3/7/374115a61ce9f3991b882d32e2f72e7bca281488.png)](https://cdn-forum.bambulab.com/original/3X/3/7/374115a61ce9f3991b882d32e2f72e7bca281488.png "image")

Here’s how that works in animation. Give it a few moments for your browser to load as it is a larger image.

Image omitted

## Notas del recolector

- Primera intervención de Olias, de 2024-06-29: localización `#p-222419-ucalipers-as-scaling-toolu-2`. La versión 2.1.1 y el caso de caja y tapa están declarados por el autor. Las imágenes originales enlazadas son parte importante del caso; no se han transcrito sus valores ni verificado visualmente.
- La extracción contiene solo la primera intervención; las respuestas del hilo y la animación final no aparecen. El autor y la fecha se identificaron en el índice de búsqueda del hilo.
- El texto describe medición de referencia, selección de vértices y edición de dimensión con escala de todo el modelo. No documenta explícitamente volver a medir después, verificar el perfil y volumen disponible, ni un encaje físico impreso; la imagen de la placa no prueba por sí sola esos pasos. No atribuirle un recorrido completo.
- Es una observación comunitaria histórica de Orca Slicer 2.1.1, no documentación oficial ni prueba de vigencia en versiones posteriores. Tampoco demuestra cómo evitar una doble conversión de unidades.
