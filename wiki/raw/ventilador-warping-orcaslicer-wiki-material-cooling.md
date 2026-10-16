---
titulo: "Material Cooling"
url: https://github.com/OrcaSlicer/OrcaSlicer/wiki/material_cooling
sitio: github.com
tipo: oficial
capturado: 2026-10-16
autor: OrcaSlicer project
idioma: en
---

Material Cooling

Material Cooling for Specific Layer

No cooling for the first
First layer fan speed
Full fan speed at layer

Material Part Cooling Fan

Fan speed threshold

Min fan speed threshold
Max fan speed threshold

Keep fan always on
Slow printing down for better layer cooling
Don't slow down outer walls
Min print speed
Force cooling for overhangs and bridges
Overhang cooling activation threshold
Overhangs and external bridges fan speed
Internal bridges fan speed
Support interface fan speed
Ironing fan speed
Auxiliary part cooling fan

Exhaust fan

Activate air filtration
During print
Complete print

Material Cooling for Specific Layer

This setting allows you to customize the cooling behavior of your 3D printer for specific layers of your print.
Proper cooling is essential for achieving high-quality prints, especially when dealing with overhangs and bridges.

No cooling for the first

Mode: Simple.
Variable: close_fan_the_first_x_layers.
Type: Integer list.
CLI Example: --close-fan-the-first-x-layers=1.
Number of initial layers during which part-cooling fans are disabled.
Disabling the fan for the first few layers improves build-plate adhesion and reduces early-layer warping.

First layer fan speed

Mode: Advanced.
Variable: initial_layer_fan_speed.
Type: Integer list.
CLI Example: --initial-layer-fan-speed=1.
Important NEW FEATURE: First layer fan speed
Available in: Nightly builds or Releases greater than 2.4.2.

Sets an exact fan speed (in %) for the first layer, overriding all other cooling
settings. This is useful for protecting 3D-printed toolhead parts (e.g. Voron-style
ABS/ASA ducts) from a hot bed: a small amount of airflow cools the ducts down
without using full cooling, which may in certain conditions hurt first-layer adhesion. From the second layer onwards, normal cooling resumes.
If Full fan speed at layer is also set, the fan ramps smoothly from this value on
the first layer up to your target by the chosen layer.
Only available when No cooling for the first is 0. Set to -1 to disable it.

Full fan speed at layer

Mode: Advanced.
Variable: full_fan_speed_layer.
Type: Integer list.
CLI Example: --full-fan-speed-layer=1.
Fan speed is increased linearly from 0% starting at the layer specified by
close_fan_the_first_x_layers up to the maximum part-cooling speed at this
specified layer. If this layer is less than or equal to close_fan_the_first_x_layers,
it is ignored and the fan will reach the maximum allowed speed on the layer immediately
after close_fan_the_first_x_layers (i.e. at layer close_fan_the_first_x_layers + 1).
Set this option to 0 to disable the automatic ramp.

Material Part Cooling Fan

Mode: Simple.
Variables: fan_min_speed, fan_cooling_layer_time, fan_max_speed, slow_down_layer_time.
Type: Float list.
CLI Example: --fan-min-speed=1 (same pattern for the other variables above).
These settings control the behavior of the part cooling fan during printing. Proper
configuration of these parameters can significantly enhance print quality by
optimizing cooling for different features and layer times.

Fan speed threshold

These settings define how the slicer manages part-cooling behavior and printing speed
based on the estimated time it takes to print each layer.

Min fan speed threshold

When a layer’s estimated print time falls below the minimum time, the slicer begins
enabling the part-cooling fan. The fan speed is gradually interpolated between the
configured minimum and maximum fan speeds, depending on how short the layer time is.
If a minimum speed threshold is defined, the slicer may also slow down the G-code
printing speed for layers faster than this value to ensure adequate cooling.

Max fan speed threshold

Layers with an estimated time below the maximum time may trigger additional
print-speed reduction to improve cooling.
When auto-cooling is enabled, the fan speed may increase as needed, up to the
defined maximum fan speed, which acts as the upper limit for cooling adjustments.

Keep fan always on

Mode: Simple.
Variable: reduce_fan_stop_start_freq.
Type: Boolean list.
CLI Example: --reduce-fan-stop-start-freq=1.
Enabling this setting means that part cooling fan will never stop entirely and will
instead run at least at minimum speed to reduce the frequency of starting and
stopping.

Slow printing down for better layer cooling

Mode: Simple.
Variable: slow_down_for_layer_cooling.
Type: Boolean list.
CLI Example: --slow-down-for-layer-cooling=1.
Enable this option to slow printing speed down to ensure that the final layer time
is not shorter than the layer time threshold in Max fan speed threshold, so that
the layer can be cooled for a longer time. This can improve the quality for small
details.

Don't slow down outer walls

Mode: Simple.
Variable: dont_slow_down_outer_wall.
Type: Boolean list.
CLI Example: --dont-slow-down-outer-wall=1.
If enabled, this setting will ensure external perimeters are not slowed down to
meet the minimum layer time. This is particularly helpful in the below scenarios:

To avoid changes in shine when printing glossy filaments
To avoid changes in external wall speed which may create slight wall artifacts that
appear like Z banding
To avoid printing at speeds which cause VFAs (fine artifacts) on the external walls

Min print speed

Mode: Advanced.
Variable: slow_down_min_speed.
Type: Float list.
CLI Example: --slow-down-min-speed=1.
The minimum print speed to which the printer slows down to maintain the minimum
layer time defined above when the slowdown for better layer cooling is enabled.

Force cooling for overhangs and bridges

Mode: Simple.
Variable: enable_overhang_bridge_fan.
Type: Boolean list.
CLI Example: --enable-overhang-bridge-fan=1.
Enable this option to allow adjustment of the part cooling fan speed for specifically
for overhangs, internal and external bridges. Setting the fan speed specifically for
these features can improve overall print quality and reduce warping.

Overhang cooling activation threshold

Mode: Advanced.
Variable: overhang_fan_threshold.
Type: Choice list.
Options: 0%, 10%, 25%, 50%, 75%, 95%.
CLI Example: --overhang-fan-threshold=0%.
When the overhang exceeds this specified threshold, force the cooling fan to run at
the 'Overhang Fan Speed' set below. This threshold is expressed as a percentage,
indicating the portion of each line's width that is unsupported by the layer beneath
it. Setting this value to 0% forces the cooling fan to run for all outer walls,
regardless of the overhang degree.

Overhangs and external bridges fan speed

Mode: Advanced.
Variable: overhang_fan_speed.
Type: Integer list.
CLI Example: --overhang-fan-speed=1.
Use this part cooling fan speed when printing bridges or overhang walls with an
overhang threshold that exceeds the value set in the 'Overhangs cooling threshold'
parameter above. Increasing the cooling specifically for overhangs and bridges can
improve the overall print quality of these features.
Please note, this fan speed is clamped on the lower end by the minimum fan speed
threshold set above. It is also adjusted upwards up to the maximum fan speed
threshold when the minimum layer time threshold is not met.

Internal bridges fan speed

Mode: Advanced.
Variable: internal_bridge_fan_speed.
Type: Integer list.
CLI Example: --internal-bridge-fan-speed=1.
The part cooling fan speed used for all internal bridges. Set to -1 to use the
overhang fan speed settings instead.
Reducing the internal bridges fan speed, compared to your regular fan speed, can
help reduce part warping due to excessive cooling applied over a large surface for
a prolonged period of time.

Support interface fan speed

Mode: Advanced.
Variable: support_material_interface_fan_speed.
Type: Integer list.
CLI Example: --support-material-interface-fan-speed=1.
This part cooling fan speed is applied when printing support interfaces. Setting
this parameter to a higher than regular speed reduces the layer binding strength
between supports and the supported part, making them easier to separate.
Set to -1 to disable it.
This setting is overridden by disable_fan_first_layers.

Ironing fan speed

Mode: Advanced.
Variable: ironing_fan_speed.
Type: Integer list.
CLI Example: --ironing-fan-speed=1.
This part cooling fan speed is applied when ironing. Setting this parameter to a
lower than regular speed reduces possible nozzle clogging due to the low volumetric
flow rate, making the interface smoother.
Set to -1 to disable it.

Auxiliary part cooling fan

Mode: Simple.
Variable: additional_cooling_fan_speed.
Type: Integer list.
CLI Example: --additional-cooling-fan-speed=1.
Set the speed for the auxiliary part-cooling fan if your printer provides one (see
auxiliary part-cooling fan). The auxiliary fan runs during printing but is disabled
for the initial layers defined by No cooling for the first.
G-code command: M106 P2 S(0-255)

Exhaust fan

Activate air filtration

Mode: Simple.
Variable: activate_air_filtration.
Type: Boolean list.
CLI Example: --activate-air-filtration=1.
Activate for better air filtration.
G-code command: M106 P3 S(0-255)

During print

Mode: Simple.
Variables: activate_air_filtration_during_print, during_print_exhaust_fan_speed.
Type: activate_air_filtration_during_print (Boolean list), during_print_exhaust_fan_speed
(Integer list).
CLI Example: --activate-air-filtration-during-print=1 (activate_air_filtration_during_print
shown; other variables above follow their own type).
Speed of exhaust fan during printing. This speed will override the speed in
filament custom G-code.

Complete print

Mode: Simple.
Variables: activate_air_filtration_on_completion, complete_print_exhaust_fan_speed.
Type: activate_air_filtration_on_completion (Boolean list), complete_print_exhaust_fan_speed
(Integer list).
CLI Example: --activate-air-filtration-on-completion=1 (activate_air_filtration_on_completion
shown; other variables above follow their own type).
Speed of exhaust fan after printing completes.

## Notas del recolector

- Fuente oficial del wiki de OrcaSlicer para los ajustes de refrigeración del
  material. Enlaza de forma explícita la refrigeración con el warping: desactivar
  el fan las primeras capas "reduces early-layer warping"; reducir el fan de
  puentes internos "can help reduce part warping due to excessive cooling
  applied over a large surface"; forzar refrigeración en voladizos/puentes "can
  improve overall print quality and reduce warping".
- Cifras accionables: fan desactivado las primeras X capas; speed del fan para
  voladizos en rampa de 0 % a máximo; umbral de overhang 0/10/25/50/75/95 %;
  fan auxiliar se apaga las primeras capas definidas por "No cooling for the
  first"; exhaust fan P3.
- Texto en inglés, sin traducir. Se ha omitido el menú de navegación y el pie del
  wiki, como en otras fuentes de OrcaSlicer de esta wiki.
