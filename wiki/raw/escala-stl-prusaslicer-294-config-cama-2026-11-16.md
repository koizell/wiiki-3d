---
titulo: "PrusaSlicer 2.9.4 — configuración de cama y altura"
url: https://raw.githubusercontent.com/prusa3d/PrusaSlicer/version_2.9.4/src/slic3r/GUI/Plater.cpp
url_final: https://raw.githubusercontent.com/prusa3d/PrusaSlicer/version_2.9.4/src/slic3r/GUI/Plater.cpp
sitio: raw.githubusercontent.com
tipo: oficial
autor: "sin autor visible"
idioma: en
publicado: "sin fecha visible"
actualizado: "sin fecha visible"
capturado: 2026-11-16
alcance: "Código Plater del tag version_2.9.4; configuración de forma de cama y altura máxima"
estado: parcial
---

```cpp
void Plater::priv::set_bed_shape(const Pointfs& shape, const double max_print_height, const std::string& custom_texture, const std::string& custom_model, bool force_as_custom)
{
    bool new_shape = bed.set_shape(shape, max_print_height, custom_texture, custom_model, force_as_custom);
    if (new_shape) {
        if (view3D) view3D->bed_shape_changed();
        if (preview) preview->bed_shape_changed();
    }
}
```

```cpp
        else if (opt_key == "bed_shape" || opt_key == "bed_custom_texture" || opt_key == "bed_custom_model") {
            bed_shape_changed = true;
            update_scheduled = true;
        }
```

```cpp
        else if (opt_key == "max_print_height") {
            bed_shape_changed = true;
            update_scheduled = true;
        }
        else if (opt_key == "printer_model") {
            p->reset_gcode_toolpaths();
            // update to force bed selection(for texturing)
            bed_shape_changed = true;
            update_scheduled = true;
        }
    }

    if (bed_shape_changed)
        set_bed_shape();
```

```cpp
void Plater::set_bed_shape() const
{
    set_bed_shape(p->config->option<ConfigOptionPoints>("bed_shape")->values,
        p->config->option<ConfigOptionFloat>("max_print_height")->value,
        p->config->option<ConfigOptionString>("bed_custom_texture")->value,
        p->config->option<ConfigOptionString>("bed_custom_model")->value);
}
```

```cpp
    // This updates the "Slice now", "Export G-code", "Arrange" buttons status.
    // Namely, it refreshes the "Out of print bed" property of all the ModelObjects, and it enables
    // the "Slice now" and "Export G-code" buttons based on their "out of bed" status.
    this->object_list_changed();
```

## Notas del recolector

- Extractos no contiguos del código de configuración, no una secuencia de selección de perfil probada. Se complementan con `escala-stl-prusaslicer-294-volumen-canvas-2026-11-16.md`.
- La página oficial https://help.prusa3d.com/article/first-print-with-prusaslicer-2-9_1753 mostró sólo navegación al consultar la URL final; una ficha de búsqueda mostró texto, pero no se ha capturado como cuerpo verificable.
- El código no acredita que los valores de un perfil dado coincidan con la impresora física ni cubre por sí solo todas las restricciones de cabezal o trayectorias.
