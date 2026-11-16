---
titulo: "PrusaSlicer 2.9.4 — GLGizmoMeasure.cpp"
url: https://raw.githubusercontent.com/prusa3d/PrusaSlicer/version_2.9.4/src/slic3r/GUI/Gizmos/GLGizmoMeasure.cpp
url_final: https://raw.githubusercontent.com/prusa3d/PrusaSlicer/version_2.9.4/src/slic3r/GUI/Gizmos/GLGizmoMeasure.cpp
sitio: raw.githubusercontent.com
tipo: oficial
autor: "Prusa Research; Lukáš Matěna; Oleksandra Iushchenko; Enrico Turri; Vojtěch Bubník; Filip Sykala"
idioma: en
publicado: "sin fecha visible"
actualizado: "sin fecha visible"
capturado: 2026-11-16
alcance: "Código fuente etiquetado version_2.9.4, herramienta Measure; extractos parciales"
estado: parcial
---

```cpp
///|/ Copyright (c) Prusa Research 2019 - 2023 Lukáš Matěna @lukasmatena, Oleksandra Iushchenko @YuSanka, Enrico Turri @enricoturri1966, Vojtěch Bubník @bubnikv, Filip Sykala @Jony01
///|/
///|/ PrusaSlicer is released under the terms of the AGPLv3 or higher
///|/
```

```cpp
bool GLGizmoMeasure::on_init()
{
    m_shortcut_key = WXK_CONTROL_U;
    return true;
}
```

```cpp
std::string GLGizmoMeasure::on_get_name() const
{
    return _u8L("Measure");
}

bool GLGizmoMeasure::on_is_activable() const
{
    const Selection& selection = m_parent.get_selection();
    bool res = (wxGetApp().preset_bundle->printers.get_edited_preset().printer_technology() == ptSLA) ?
        selection.is_single_full_instance() :
        selection.is_single_full_instance() || selection.is_single_volume() || selection.is_single_modifier();
    if (res)
        res &= !selection.contains_sinking_volumes();

    return res;
}
```

```cpp
        const bool use_inches = wxGetApp().app_config->get_bool("use_inches");
        const double curr_value = use_inches ? ObjectManipulation::mm_to_in * distance : distance;
        const std::string curr_value_str = format_double(curr_value);
        const std::string units = use_inches ? _u8L("in") : _u8L("mm");
        const float value_str_width = 20.0f + ImGui::CalcTextSize(curr_value_str.c_str()).x;
        static double edit_value = 0.0;

        const Vec2d label_position = 0.5 * (v1ss + v2ss);
        ImGuiPureWrap::set_next_window_pos(label_position.x(), viewport[3] - label_position.y(), ImGuiCond_Always, 0.0f, 1.0f);
        ImGuiPureWrap::set_next_window_bg_alpha(0.0f);

        if (!m_editing_distance) {
            ImGui::PushStyleVar(ImGuiStyleVar_WindowBorderSize, 0.0f);
            ImGui::PushStyleVar(ImGuiStyleVar_WindowRounding, 0.0f);
            ImGui::PushStyleVar(ImGuiStyleVar_WindowPadding, { 1.0f, 1.0f });
            ImGuiPureWrap::begin(std::string("distance"), ImGuiWindowFlags_AlwaysAutoResize | ImGuiWindowFlags_NoDecoration);
            ImGui::BringWindowToDisplayFront(ImGui::GetCurrentWindow());
            ImGui::AlignTextToFramePadding();
            ImDrawList* draw_list = ImGui::GetWindowDrawList();
            const ImVec2 pos = ImGui::GetCursorScreenPos();
            const std::string txt = curr_value_str + " " + units;
            ImVec2 txt_size = ImGui::CalcTextSize(txt.c_str());
            const ImGuiStyle& style = ImGui::GetStyle();
            draw_list->AddRectFilled({ pos.x - style.FramePadding.x, pos.y + style.FramePadding.y }, { pos.x + txt_size.x + 2.0f * style.FramePadding.x , pos.y + txt_size.y + 2.0f * style.FramePadding.y },
              ImGuiPSWrap::to_ImU32(ColorRGBA(0.5f, 0.5f, 0.5f, 0.5f)));
            ImGui::SetCursorScreenPos({ pos.x + style.FramePadding.x, pos.y });
            ImGuiPureWrap::text(txt);
            ImGui::SameLine();
            if (m_imgui->image_button(ImGui::SliderFloatEditBtnIcon, _u8L("Edit to scale"))) {
                m_editing_distance = true;
                edit_value = curr_value;
                m_imgui->requires_extra_frame();
            }
            ImGuiPureWrap::end();
            ImGui::PopStyleVar(3);
        }

        if (m_editing_distance && !ImGui::IsPopupOpen("distance_popup"))
            ImGui::OpenPopup("distance_popup");

        ImGui::PushStyleVar(ImGuiStyleVar_WindowBorderSize, 0.0f);
        ImGui::PushStyleVar(ImGuiStyleVar_WindowRounding, 0.0f);
        ImGui::PushStyleVar(ImGuiStyleVar_WindowPadding, { 1.0f, 1.0f });
        ImGui::PushStyleVar(ImGuiStyleVar_ItemSpacing, { 4.0f, 0.0f });
        if (ImGui::BeginPopupModal("distance_popup", nullptr, ImGuiWindowFlags_AlwaysAutoResize | ImGuiWindowFlags_NoDecoration)) {
            auto perform_scale = [this](double new_value, double old_value) {
                if (new_value == old_value || new_value <= 0.0)
                    return;

                const double ratio = new_value / old_value;
                wxGetApp().plater()->take_snapshot(_L("Scale"));
```

```cpp
                // apply scale
                TransformationType type;
                type.set_world();
                type.set_relative();
                type.set_joint();

                // scale selection
                Selection& selection = m_parent.get_selection();
                const Vec3d old_center = selection.get_bounding_box().center();
                selection.setup_cache();
                selection.scale(ratio * Vec3d::Ones(), type);
                wxGetApp().plater()->canvas3D()->do_scale(""); // avoid storing another snapshot
                wxGetApp().obj_manipul()->set_dirty();
```

```cpp
            ImGuiPureWrap::disable_background_fadeout_animation();
            ImGui::PushItemWidth(value_str_width);
            if (ImGui::InputDouble("##distance", &edit_value, 0.0f, 0.0f, "%.3f")) {
            }

            // trick to auto-select text in the input widgets on 1st frame
            if (m_is_editing_distance_first_frame) {
                ImGui::SetKeyboardFocusHere(0);
                m_is_editing_distance_first_frame = false;
                m_imgui->set_requires_extra_frame();
            }

            // handle keys input
            if (ImGui::IsKeyPressedMap(ImGuiKey_Enter) || ImGui::IsKeyPressedMap(ImGuiKey_KeyPadEnter))
                action_scale(edit_value, curr_value);
            else if (ImGui::IsKeyPressedMap(ImGuiKey_Escape))
                action_exit();

            ImGui::SameLine();
            if (ImGuiPureWrap::button(_CTX_utf8(L_CONTEXT("Scale", "Verb"), "Verb")))
                action_scale(edit_value, curr_value);
            ImGui::SameLine();
            if (ImGuiPureWrap::button(_u8L("Cancel")))
                action_exit();
            ImGui::EndPopup();
        }
```

```cpp
        if (m_mode == EMode::FeatureSelection && m_hover_id != -1) {
            add_strings_row_to_table("Shift", ImGuiPureWrap::COL_ORANGE_LIGHT, _u8L("Enable point selection"), ImGui::GetStyleColorVec4(ImGuiCol_Text));
            ++row_count;
        }

        if (m_selected_features.first.feature.has_value()) {
            add_strings_row_to_table("Delete", ImGuiPureWrap::COL_ORANGE_LIGHT, _u8L("Restart selection"), ImGui::GetStyleColorVec4(ImGuiCol_Text));
            ++row_count;
        }
```

## Notas del recolector

- Extractos literales no contiguos de las líneas 1–4, 461–465, 493–506, 1234–1284, 1335–1347, 1369–1394 y 1973–1981 del archivo etiquetado. La etiqueta corresponde a la release final registrada en `escala-stl-prusaslicer-294-release-2026-11-16.md`.
- El código contiene el control de edición de distancia y la aplicación del mismo cociente a los tres ejes; no es un manual ni una prueba de ejecución. La selección de dos elementos y la comprobación de encaje con perfil no quedan documentadas de forma completa en estos extractos.
- El resto del archivo no se ha guardado; se ha consultado el cuerpo accesible de la URL. No se ha comprobado en una aplicación instalada ni se ha establecido que esta versión sea la más reciente.
