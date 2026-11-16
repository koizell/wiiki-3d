---
titulo: "PrusaSlicer 2.9.4 — selección y presentación de medidas"
url: https://raw.githubusercontent.com/prusa3d/PrusaSlicer/version_2.9.4/src/slic3r/GUI/Gizmos/GLGizmoMeasure.cpp
url_final: https://raw.githubusercontent.com/prusa3d/PrusaSlicer/version_2.9.4/src/slic3r/GUI/Gizmos/GLGizmoMeasure.cpp
sitio: raw.githubusercontent.com
tipo: oficial
autor: "Prusa Research; Lukáš Matěna; Oleksandra Iushchenko; Enrico Turri; Vojtěch Bubník; Filip Sykala"
idioma: en
publicado: "sin fecha visible"
actualizado: "sin fecha visible"
capturado: 2026-11-16
alcance: "Código de la herramienta Measure en el tag PrusaSlicer version_2.9.4; extractos"
estado: parcial
---

```cpp
///|/ Copyright (c) Prusa Research 2019 - 2023 Lukáš Matěna @lukasmatena, Oleksandra Iushchenko @YuSanka, Enrico Turri @enricoturri1966, Vojtěch Bubník @bubnikv, Filip Sykala @Jony01
///|/
///|/ PrusaSlicer is released under the terms of the AGPLv3 or higher
///|/
```

```cpp
static std::string surface_feature_type_as_string(Measure::SurfaceFeatureType type)
{
    switch (type)
    {
    default:
    case Measure::SurfaceFeatureType::Undef:  { return ("No feature"); }
    case Measure::SurfaceFeatureType::Point:  { return _u8L("Vertex"); }
    case Measure::SurfaceFeatureType::Edge:   { return _u8L("Edge"); }
    case Measure::SurfaceFeatureType::Circle: { return _u8L("Circle"); }
    case Measure::SurfaceFeatureType::Plane:  { return _u8L("Plane"); }
    }
}
```

```cpp
    else if (mouse_event.LeftDown()) {
        // let the event pass through to allow panning/rotating the 3D scene
        if (mouse_event.CmdDown())
            return false;

        if (m_hover_id != -1) {
            m_mouse_left_down = true;
```

```cpp
                    case EMode::FeatureSelection: { item = { false, m_curr_feature, m_curr_feature }; break; }
                    case EMode::PointSelection:   { item = { false, m_curr_feature, Measure::SurfaceFeature(*m_curr_point_on_feature_position) }; break; }
```

```cpp
                    if (!processed) {
                        remove_selected_sphere_raycaster(SEL_SPHERE_2_ID);
                        if (m_selected_features.second == item)
                            // 2nd feature deselection
                            m_selected_features.second.reset();
                        else {
                            // 2nd feature selection
                            m_selected_features.second = item;
                            if (requires_sphere_raycaster_for_picking(item))
                                m_selected_sphere_raycasters.push_back(m_parent.add_raycaster_for_picking(SceneRaycaster::EType::Gizmo, SEL_SPHERE_2_ID, *m_sphere.mesh_raycaster));
                        }
                    }
```

```cpp
            else {
                // 1st feature selection
                const SelectedFeatures::Item item = detect_current_item();
                m_selected_features.first = item;
                if (requires_sphere_raycaster_for_picking(item))
                    m_selected_sphere_raycasters.push_back(m_parent.add_raycaster_for_picking(SceneRaycaster::EType::Gizmo, SEL_SPHERE_1_ID, *m_sphere.mesh_raycaster));
            }
```

```cpp
bool GLGizmoMeasure::gizmo_event(SLAGizmoEventType action, const Vec2d& mouse_position, bool shift_down, bool alt_down, bool control_down)
{
    if (action == SLAGizmoEventType::ShiftDown) {
        if (m_shift_kar_filter.is_first()) {
            m_mode = EMode::PointSelection;
            disable_scene_raycasters();
        }
        m_shift_kar_filter.increase_count();
    }
    else if (action == SLAGizmoEventType::ShiftUp) {
        m_shift_kar_filter.reset_count();
        m_mode = EMode::FeatureSelection;
        restore_scene_raycasters_state();
    }
    else if (action == SLAGizmoEventType::Delete) {
        m_selected_features.reset();
        m_selected_sphere_raycasters.clear();
        m_parent.request_extra_frame();
    }
```

```cpp
        if (m_selected_features.second.feature.has_value()) {
            const Measure::MeasurementResult& measure = m_measurement_result;
            if (measure.angle.has_value()) {
                ImGui::PushID("ClipboardAngle");
                add_measure_row_to_table(_u8L("Angle"), ImGuiPureWrap::COL_ORANGE_LIGHT, format_double(Geometry::rad2deg(measure.angle->angle)) + "°",
                    ImGui::GetStyleColorVec4(ImGuiCol_Text));
                ++measure_row_count;
                ImGui::PopID();
            }

            const bool show_strict = measure.distance_strict.has_value() &&
                (!measure.distance_infinite.has_value() || std::abs(measure.distance_strict->dist - measure.distance_infinite->dist) > EPSILON);

            if (measure.distance_infinite.has_value()) {
                double distance = measure.distance_infinite->dist;
                if (use_inches)
                    distance = ObjectManipulation::mm_to_in * distance;
                ImGui::PushID("ClipboardDistanceInfinite");
                add_measure_row_to_table(show_strict ? _u8L("Perpendicular distance") : _u8L("Distance"), ImGuiPureWrap::COL_ORANGE_LIGHT, format_double(distance) + units,
                    ImGui::GetStyleColorVec4(ImGuiCol_Text));
                ++measure_row_count;
                ImGui::PopID();
            }
            if (show_strict) {
                double distance = measure.distance_strict->dist;
                if (use_inches)
                    distance = ObjectManipulation::mm_to_in * distance;
                ImGui::PushID("ClipboardDistanceStrict");
                add_measure_row_to_table(_u8L("Direct distance"), ImGuiPureWrap::COL_ORANGE_LIGHT, format_double(distance) + units,
                    ImGui::GetStyleColorVec4(ImGuiCol_Text));
                ++measure_row_count;
                ImGui::PopID();
            }
            if (measure.distance_xyz.has_value() && measure.distance_xyz->norm() > EPSILON) {
                Vec3d distance = *measure.distance_xyz;
                if (use_inches)
                    distance = ObjectManipulation::mm_to_in * distance;
                ImGui::PushID("ClipboardDistanceXYZ");
                add_measure_row_to_table(_u8L("Distance XYZ"), ImGuiPureWrap::COL_ORANGE_LIGHT, format_vec3(distance),
                    ImGui::GetStyleColorVec4(ImGuiCol_Text));
                ++measure_row_count;
                ImGui::PopID();
            }
        }
```

## Notas del recolector

- Extractos no contiguos del código, no un tutorial ni una prueba de ejecución. Los rótulos dependen de los datos de medición disponibles y de la condición `show_strict`; no se afirma que aparezcan siempre.
- La documentación web de Measurement tool, https://help.prusa3d.com/article/measurement-tool_399451, mostró navegación sin cuerpo útil tanto en extracción directa como en Parallel. No se atribuye al tag.
- Corrección de localizadores de `wiki/raw/escala-stl-prusaslicer-294-codigo-medicion-2026-11-16.md`: `on_init` comienza en la línea 529; `on_get_name`, en la 563; `on_is_activable`, en la 568. El fichero anterior permanece intacto.
- No se han probado en interfaz la selección, los resultados ni el recorrido de comparación.
