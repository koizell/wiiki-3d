---
titulo: "Start-End G‐Code | Ultimaker Cura Wiki"
url: https://github.com/Ultimaker/Cura/wiki/Start-End-G%E2%80%90Code
sitio: github.com
tipo: oficial
capturado: 2026-10-13
autor: Remco Burema (Ultimaker)
idioma: en
---

# Start-End G‐Code

Cura allows you to add some custom G-Code parts into your generated files. This
can be very handy to setup some specific features of a printer, or to customize
the way your printer starts according to your workflow. Custom G-Code can be
inserted at different points:

- Machine Start G-Code: inserted at the beginning of the file, before any other
  G-Code command
- Machine End G-Code: inserted at the end of the file, after any other G-Code
  command
- Extruder Start G-Code: inserted every time an extruder starts being used (can
  be different per extruder)
- Extruder End G-Code: inserted every time an extruder stop being used (can be
  different per extruder)

⚠️ Editing the G-Code manually can damage your printer. Always check the G-Code
output before sending it to the printer.

## How to set custom G-Code

In Cura, select your active printer, then go to Preferences > Configure Cura...
> Printers > Machine Settings

In the Printer tab, you can set the Machine Start and End G-Code.

In each extruder's tab, you can set the Extruder Start and End G-Code.

⚠️ Some printers have custom G-Code setup by the manufacturers, with custom
commands that may be necessary. Remove them only if you know what they are used
for.

## Syntax

### Static G-Code

The simplest syntax is to just add static G-Code commands that will be directly
inserted into the file without any transformation, for example:

    G90 ; use absolute positioning
    M82 ; absolute extrusion mode
    G28 ; home all
    G29 ; mesh bed leveling

### Settings values

#### Classic settings

In order to make the custom G-Code more flexible, you can also insert the value
of settings that will be resolved at run-time with the proper output. Just use
the raw name of the setting (which can be found in the definition files) and add
{} around it:

    {<setting_name>}

For example, you can write the following:

    M140 S{material_bed_temperature_layer_0} ; set bed temp

The output will be something like:

    M140 S50.0 ; set bed temp

When doing so, the value of the setting will be retrieved from the global stack,
which contains the settings that are global to the printer. However, sometimes
you may want to get the value of a setting specific to an extruder, especially
when you have a multi-extruders printer. You can then use the following syntax:

    {<setting_name>, <extruder_index>}

ℹ️ The extruder index is 0-based, which means "Extruder 1" in the UI will have
index 0, "Extruder 2" will have index 1, and so on.

You can then write the following:

    M109 T0 S{material_print_temperature_layer_0, 0}
    M109 T1 S{material_print_temperature_layer_0, 1}

Which could output to:

    M109 T0 S230.0
    M109 T1 S210.0

ℹ️ The extruder_index can also be retrieved from a setting value

⚠️ This does not apply to settings that are marked as "settable_per_extruder":
false, for them we will always use the value from the global stack

#### Extra settings

In addition to settings that are declared in definition files, some extra
settings are added at run-time that you can use for convenience:

- material_id: ID of the used material (per extruder)
- material_type: Type of used material (per extruder)
- material_name: Name of used material (per extruder)
- material_brand: Brand of used material (per extruder)
- quality_name: Name of the used quality profile
- quality_changes_name: Name of the specific applied quality changes profile
- print_bed_temperature: Alias to material_bed_temperature
- print_temperature: Alias to material_print_temperature
- travel_speed: Alias to speed_travel
- time: Current time, using format %H:%M:%S, e.g. 09:17:35
- date: Current date, using format %d-%m-%Y, e.g. 06-09-2024
- day: First three letters of the current day, e.g. Fri
- initial_extruder_nr: Index of the first used extruder (which may sometimes be
  incorrect)

Starting with Cura 5.12, some additional variables are also provided in the
extruder GCode:

- previous_extruder_nr: in the extruder start/prestart GCode, contains the ID of
  the extruder we are switching from
- next_extruder_nr: in the extruder end GCode, contains the ID of the extruder
  we are switching to

Starting with Cura 5.14, more additional variables will be provided:

Variables starting with initial_layer_bb_... contain the 2D bounding box of the
effective print on the first layer (this includes every helper; e.g. brim,
skirt, prime tower, etc.)

- initial_layer_bb_min_x Has the minimum X-coordinate of the axis-aligned
  bounding rectangle of the first layer.
- initial_layer_bb_max_x Has the maximum X-coordinate of the axis-aligned
  bounding rectangle of the first layer.
- initial_layer_bb_min_y Has the minimum Y-coordinate of the axis-aligned
  bounding rectangle of the first layer.
- initial_layer_bb_max_y Has the maximum Y-coordinate of the axis-aligned
  bounding rectangle of the first layer.
- initial_layer_bb_width Has the total width of the first layer.
- initial_layer_bb_height Has the total 'height' of the first layer (not the
  actual height of the print or layer, just the extents in the Y-direction).

Variables starting with total_bb_... which contain the 3D bounding box of the
models to be printed.

- total_bb_min_x Has the minimum X-coordinate of the total axis-aligned bounding
  box of the model.
- total_bb_max_x Has the maximum X-coordinate of the total axis-aligned bounding
  box of the model.
- total_bb_min_y Has the minimum Y-coordinate of the total axis-aligned bounding
  box of the model.
- total_bb_max_y Has the maximum Y-coordinate of the total axis-aligned bounding
  box of the model.
- total_bb_min_z Has the minimum Z-coordinate of the total axis-aligned bounding
  box of the model.
- total_bb_max_z Has the maximum Z-coordinate of the total axis-aligned bounding
  box of the model.
- total_bb_width Has the total width of the axis-aligned bounding-box of the
  model.
- total_bb_depth Has the total depth of the axis-aligned bounding-box of the
  model.
- total_bb_height Has the total height of the axis-aligned bounding-box of the
  model.
- is_extruder_used Whether or not the extruder is used (per extruder)

#### Formulas

Starting with Cura 5.6, you can also write simple formulas to tweak the values
of the setting for a specific purpose. Formulas are based on Python syntax and
are widely used in printers settings definitions. For example, you can write:

    M104 T0 S{material_print_temperature_layer_0 - 50, 0}
    M104 T1 S{material_print_temperature_layer_0 - 50, 1}
    M190 S{material_bed_temperature_layer_0 / 2}
    M109 T{initial_extruder_nr} S{material_print_temperature_layer_0 + 10, initial_extruder_nr}
    M109 T{(initial_extruder_nr + 1) % 2} S{material_print_temperature_layer_0 - 20, (initial_extruder_nr + 1) % 2}

#### Conditional parts of G-Code

Starting with Cura 5.9, you can make some parts of your custom G-Code dependant
on some conditions, which can be handy to enable or disable a whole feature of
your printer. The syntax for this is slightly more complex:

    {if|elif|else|endif <condition_formula>, <extruder_index>}

These statements will be evaluated and not exported to the file, but will enable
or disable the following lines, for example:

    {if material_bed_temperature_layer_0 < 40}
    M190 S{material_bed_temperature_layer_0}
    {elif material_bed_temperature_layer_0 >= 40 and material_bed_temperature_layer_0 < 50}
    M190 S{material_bed_temperature_layer_0 - 10}
    M140 S{material_bed_temperature_layer_0}
    {else}
    M140 S{material_bed_temperature_layer_0}
    {endif}

⚠️ Note that this functionality is limited to one level of condition. Nested
conditions are not supported (yet).

## Notas del recolector

- **Comprobación:** HTTP 200, 146.544 bytes de HTML, 14.654 caracteres de texto
  extraído. No es una cáscara. Es una página del wiki de GitHub del repo oficial
  `Ultimaker/Cura`, editada por Remco Burema el 12/08/2026 (4 revisiones).
- **Es la fuente más valiosa del lote para el encargo de metadatos, y sostiene
  algo que ninguna otra fuente sostiene:** que el valor de un ajuste del slicer
  acaba **dentro del fichero**, resuelto en el momento de exportar.
  - «you can also insert the value of settings that will be resolved at
    run-time with the proper output»
  - El ejemplo concreto es literal y es exactamente el campo que lee el panel de
    wiiki-3d: `M140 S{material_bed_temperature_layer_0} ; set bed temp` →
    `M140 S50.0 ; set bed temp`.
- **Ojo con esto, que es un riesgo de sobre-lectura grande:** el valor viaja en
  la **instrucción** (`M140 S50.0`), no en un comentario. El comentario
  (`; set bed temp`) lo escribe **quien configura el perfil**, no el slicer. Un
  panel que lea «temperatura de cama» de un G-code generado por Cura la está
  sacando del parámetro M140/M190, no de un comentario. **Quien cocine no debe
  escribir que Cura documenta sus metadatos como comentarios.**
- **Variables «extra» literales y relevantes para el campo `material`:**
  `material_id`, `material_type`, `material_name`, `material_brand`. La página
  las presenta como disponibles para insertar en el G-code, **no** como campos
  que Cura escriba por su cuenta. La distinción importa.
- `quality_name` y `quality_changes_name` son literales: el nombre del perfil de
  calidad es un dato que Cura puede resolver. Es la conexión directa con
  «perfiles de impresión».
- Versiones literales: fórmulas desde Cura 5.6, condicionales desde 5.9,
  `previous_extruder_nr`/`next_extruder_nr` desde 5.12, bounding boxes desde
  5.14.
- La notación `%H:%M:%S` y el ejemplo `09:17:35` son literales, y sostienen que
  la hora de generación del fichero es un metadato disponible.
- **Contradicción real con la fuente de OrcaSlicer, para declarar:** Orca
  documenta un único interruptor booleano (`gcode_comments`, «Verbose G-code»)
  que añade comentarios descriptivos a líneas y bloques. Cura, en cambio,
  **no documenta ningún interruptor de comentarios**: lo que documenta son
  plantillas de inicio/fin que el usuario escribe, con marcadores que el slicer
  resuelve. Los dos modelos son distintos y ninguno se puede usar para explicar
  el otro.
- He omitido la navegación de GitHub y el listado de páginas del wiki. Los
  enlaces «definition files», «global stack» y «printers settings definitions»
  no dejan URL legible en el HTML servido; **no los he resuelto**.
- No se ha traducido nada. Se han conservado los símbolos ⚠️ e ℹ️ de la fuente.
