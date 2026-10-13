---
titulo: "FAQ - PrusaSlicer | Prusa Knowledge Base"
url: https://help.prusa3d.com/article/faq-prusaslicer_1789
sitio: help.prusa3d.com
tipo: oficial
capturado: 2026-10-13
autor: Prusa Research
idioma: en
---

# FAQ - PrusaSlicer

Relevant for

MMU family
MINI family
MK3 family
OLD PRODUCTS
SLA family

## Q: Is PrusaSlicer free?

A: Yes. It's also open-source, so anyone can contribute to the development.
Check our GitHub.

## Q: Can I use it with other printers (not Original Prusa)?

A: Yes. The community has made profiles for printers from many manufacturers.
Many of them are now built-in to PrusaSlicer, you can add them via the
Configuration Wizard. For printers that are not yet included, you can check
your printer's Facebook group or a forum, download the profiles and import them
manually.

## Q: Where are user profiles stored?

Select Help - Show Configuration Folder

- Windows C:/Users/username/AppData/Roaming/PrusaSlicer
- Mac "HDD" ▸ Users ▸ username ▸ Library ▸ Application Support ▸ PrusaSlicer
- Linux ~/.config/PrusaSlicer

If you're using an alpha or beta version, the folder name will be
PrusaSlicer-alpha or PrusaSlicer-beta respectively

## Q: Did an update erase all my custom print profiles?

A: No, PrusaSlicer always creates a backup of all print profiles before an
update. Check the snapshots folder.

- Windows C:Users/username/AppData/Roaming/PrusaSlicer/snapshots
- Mac "HDD" ▸ Users ▸ username ▸ Library ▸ Application Support ▸ PrusaSlicer ▸ snapshots
- Linux ~/.config/PrusaSlicer/snapshots

## Q: Does it have custom supports?

A: Yes. Check the Paint-on supports and support blockers and enforcers.

## Q: How to orient my model so that one of its faces is on the print bed?

A: Check the Place on Face function.

## Q: Can I schedule a pause or a color change in PrusaSlicer?

A: Yes, click the plus icon on the slider in the Preview mode.

## Q: What is the correct spelling: Plater or Platter?

A: Feel free to discuss at #2074 or #1226, we're keeping it as Plater.

## Q: Does it have tree supports for FDM?

A: No, at least for the time being. We are looking into how to make them work
with FDM.

## Q: How accurate are the print time estimates?

A: Very accurate, often less than a minute difference on a print that takes 10+
hours. However, this is only true if you select the correct printer profile that
matches your actual printer. The print time estimate takes into account
acceleration, jerk and other settings that differ from machine to machine.

## Q: How do I import a custom profile

A: File - Import - Import config

## Q: Why is there an extrusion hanging in the air over a MMU (multi-material)
wipe tower?

A: That is the final ramming before the filament is pulled from the nozzle and
parked into the filament switcher. See #1355 for further details.

## Q: Why is the jerk unit in mm/s, if the physical unit should be the rate of
change in acceleration = mm/s^3?

A: The GRBL project overloaded the term "jerk" to define maximum instantaneous
velocity change, which is easier to be implemented by 8bit controllers, and most
of today's 3D printer firmware is based on the GRBL planner. See #1355 for
further details.

## Q: PrusaSlicer won't start on Ubuntu

A: This may be due to missing package, install it using the following command:

## Q: When exporting a G-code, the file save dialog shows tag in the file name
instead of the actual print time, why?

A: This happens if you click on the Export G-code button right after slicing and
the G-code analysis is still running on the background. If you save the file,
the tag will be properly replaced with the time estimate.

## Q: Strange pattern on a flat surface

A: A perfectly flat surface may not stay perfectly flat after being rotated in
a 3D modeling software. If PrusaSlicer happens to slice across such a no more
perfectly flat surface, weird one layer thick islands may show up. See #2434 for
further details.

## Q: PrusaSlicer freezes or gets stuck after launch and is not responding
(often when opened on 2nd monitor), what's wrong?

A1: This is likely caused by the Nahimic audio driver, which some notebook/pc
manufacturers pre-install on their machines. You can solve the issue by stopping
and disabling the Nahimic driver. You can learn more in this forum thread or on
this GitHub issue page.

A2: You may be running an app that integrates with other applications, such as
the Blue Cielo "Application Integration". Such apps autoload at startup and
inspect/change menu bars etc. If you discover such an app on your device,
whitelist PrusaSlicer. More info on this GitHub issue.

## Q: How can I move a model up in the Z direction?

A: Place your base object normally, then right click on it and 'add part',
select the model that you want to place on top. More information is in this
article. As well as the explanation why this can't be done easier at the moment.

## FAQ for other vendors:

## Q: We would like to modify (possibly re-skin) PrusaSlicer and release it for
our customers, is that ok?

A: Yes. However, you will have to release the full source code including all the
changes that you've made. Please check the GNU Affero General Public License,
version 3.

## Q: We would like to use PrusaSlicer to create a cloud slicing service

A: Feel free to do so, but just like when releasing a modified version, you will
have to release the full source code including all the changes that you've made.
Please check the GNU Affero General Public License, version 3.

## Notas del recolector

- **Comprobación:** HTTP 200, 1.177.928 bytes de HTML, 13.877 caracteres de
  texto extraído. No es una cáscara.
- La pregunta **«When exporting a G-code, the file save dialog shows tag in the
  file name instead of the actual print time»** es la más cercana de todo este
  lote a los metadatos del fichero exportado. Ojo: en el HTML servido falta
  literalmente el nombre del tag (se ha extraído como `shows tag`), porque va
  dentro de un elemento que no atraviesa el texto plano. **No lo he
  reconstruido ni inventado: quien cocine no tiene ese dato.**
- La respuesta de los perfiles de terceros («The community has made profiles…
  Many of them are now built-in») sostiene que un perfil de impresión no es
  propiedad del fabricante del slicer.
- Las tres rutas de `snapshots` son literales y sostienen que el slicer guarda
  copia de los perfiles antes de una actualización.
- La pregunta de la precisión de la estimación de tiempo contiene la única
  cifra de este lote sobre eso: «less than a minute difference on a print that
  takes 10+ hours», con la condición de elegir bien el perfil de impresora.
- Lo que **no** hay aquí: ninguna descripción de qué comentarios escribe el
  slicer en la cabecera del G-code. Para eso están las fuentes de OrcaSlicer y
  Cura.
- He omitido el menú, el bloque de idiomas y los 11 comentarios. Las respuestas
  que remiten a «this forum thread» / «this GitHub issue» vienen como texto, sin
  URL legible en el HTML servido; **no las he resuelto**.
- No se ha traducido nada.
