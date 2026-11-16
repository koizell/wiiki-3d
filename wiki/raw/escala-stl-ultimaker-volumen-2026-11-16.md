---
titulo: "How to print the maximum build volume in UltiMaker Cura"
url: https://support.ultimaker.com/s/article/1667337565436
url_final: https://support.ultimaker.com/s/article/1667337565436
sitio: support.ultimaker.com
tipo: oficial
autor: "UltiMaker"
idioma: en
publicado: "sin fecha visible"
actualizado: "2026-05-07"
capturado: 2026-11-16
alcance: "Cura con perfiles UltiMaker y MakerBot; versión concreta de Cura no indicada"
estado: parcial
---

## How to print the maximum build volume in UltiMaker Cura

* May 7, 2026
* Knowledge

When you load a big object into Cura, you may notice that the part shows as 'non-printable' (striped). This can happen even if the part is not bigger than the maximum build volume specifications of your UltiMaker or MakerBot 3D printer. Why is this? Are the printer specifications wrong? Actually, there is a difference between the **available build volume** and the **maximum part dimensions** .

This article explains the difference and which Cura settings can be changed to increase the part dimensions.

## Build volume vs part dimensions

The default printing profiles for UltiMaker and MakerBot printers are carefully tuned and tested by our team of print process engineers. These profiles are designed for specific applications but are always optimized for reliability. Some of the settings used in the default profiles reduce the maximum part size and introduce 'non-printable areas'. These areas are displayed in dark grey in Cura:

Cura-MaximumBuildVolume_Non-printable.png

1. **Disallowed area.** This dark grey area indicates that it cannot be used for printing due to print settings or hardware limitations.
2. **Non-printable model.** Models on the build plate that are within non-printable areas are automatically turned striped grey-yellow to indicate they do not fit.

The part size is reduced when, for example, the nozzles must be able to travel around the object (without colliding with it), or when helper structures are added (such as a brim/raft or support). For some printer models (such as the UltiMaker 3), the number of active extruders also affects the build volume.

## Notas del recolector

- Se reproduce solo el comienzo del artículo, obtenido mediante extracción de página renderizada; la lectura directa devolvió «Loading».
- La fecha visible no indica explícitamente si es publicación o actualización; se registra como actualización con esa salvedad.
- El resto contiene un matiz importante: en estos perfiles el brim y el skirt pueden recortarse al borde, mientras el raft reduce la zona disponible; no se reproduce aquí.
- La versión de Cura no consta; las limitaciones descritas dependen de impresora y perfil.
