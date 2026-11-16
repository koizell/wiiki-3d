---
titulo: "PrusaSlicer 2.9.4 — detección de objetos fuera del volumen"
url: https://raw.githubusercontent.com/prusa3d/PrusaSlicer/version_2.9.4/src/slic3r/GUI/GLCanvas3D.cpp
url_final: https://raw.githubusercontent.com/prusa3d/PrusaSlicer/version_2.9.4/src/slic3r/GUI/GLCanvas3D.cpp
sitio: raw.githubusercontent.com
tipo: oficial
autor: "Prusa Research y colaboradores; BambuStudio; SuperSlicer"
idioma: en
publicado: "sin fecha visible"
actualizado: "sin fecha visible"
capturado: 2026-11-16
alcance: "Código del canvas en tag version_2.9.4; detección y avisos; incluye ramas FFF y SLA"
estado: parcial
---

```cpp
///|/ Copyright (c) Prusa Research 2018 - 2023 Enrico Turri @enricoturri1966, Oleksandra Iushchenko @YuSanka, Tomáš Mészáros @tamasmeszaros, Lukáš Matěna @lukasmatena, Vojtěch Bubník @bubnikv, David Kocík @kocikdav, Filip Sykala @Jony01, Lukáš Hejl @hejllukas, Vojtěch Král @vojtechkral
///|/ Copyright (c) BambuStudio 2023 manch1n @manch1n
///|/ Copyright (c) SuperSlicer 2023 Remi Durand @supermerill
///|/ Copyright (c) 2020 Benjamin Greiner
///|/ Copyright (c) 2019 John Drake @foxox
```

```cpp
    const Slic3r::BuildVolume& build_volume = m_bed.build_volume();

    const std::vector<unsigned int> volumes_idxs = volumes_to_process_idxs();
    for (unsigned int vol_idx : volumes_idxs) {
        GLVolume* volume = volumes.volumes[vol_idx];
        if (!volume->is_modifier && (volume->shader_outside_printer_detection_enabled || (!volume->is_wipe_tower() && volume->composite_id.volume_id >= 0))) {
            BuildVolume::ObjectState state;
            int bed_idx = -1;
            if (volume_below(*volume))
                state = BuildVolume::ObjectState::Below;
            else {
                switch (build_volume.type()) {
                case BuildVolume::Type::Rectangle:
                    //FIXME this test does not evaluate collision of a build volume bounding box with non-convex objects.
                    state = build_volume.volume_state_bbox(volume_bbox(*volume), true, &bed_idx);
                    break;
                case BuildVolume::Type::Circle:
                case BuildVolume::Type::Convex:
                //FIXME doing test on convex hull until we learn to do test on non-convex polygons efficiently.
                case BuildVolume::Type::Custom:
                    state = build_volume.object_state(volume_convex_mesh(*volume).its, volume->world_matrix().cast<float>(), volume_sinking(*volume), true, &bed_idx);
                    break;
                default:
                    // Ignore, don't produce any collision.
                    state = BuildVolume::ObjectState::Inside;
                    break;
                }
                assert(state != BuildVolume::ObjectState::Below);
            }
            volume->is_outside = state != BuildVolume::ObjectState::Inside;
            if (volume->printable) {
                if (overall_state == ModelInstancePVS_Inside && volume->is_outside)
                    overall_state = ModelInstancePVS_Fully_Outside;
                if (overall_state == ModelInstancePVS_Fully_Outside && volume->is_outside && state == BuildVolume::ObjectState::Colliding) {
                    overall_state = ModelInstancePVS_Partly_Outside;
                }
                contained_min_one |= !volume->is_outside;
```

```cpp
    // checks for geometry outside the print volume to render it accordingly
    if (!m_volumes.empty()) {
        ModelInstanceEPrintVolumeState state;
        check_volumes_outside_state(m_volumes, &state, !force_full_scene_refresh);
        const bool partlyOut = (state == ModelInstanceEPrintVolumeState::ModelInstancePVS_Partly_Outside);
        const bool fullyOut = (state == ModelInstanceEPrintVolumeState::ModelInstancePVS_Fully_Outside);

        if (printer_technology != ptSLA) {
            _set_warning_notification(EWarning::ObjectClashed, partlyOut);
            _set_warning_notification(EWarning::ObjectOutside, fullyOut);
            _set_warning_notification(EWarning::SlaSupportsOutside, false);
        }
```

```cpp
    case EWarning::ObjectOutside:      text = _u8L("An object outside the print area was detected."); break;
    case EWarning::ToolpathOutside:    text = _u8L("A toolpath outside the print area was detected."); error = ErrorType::SLICING_ERROR; break;
    case EWarning::SlaSupportsOutside: text = _u8L("SLA supports outside the print area were detected."); error = ErrorType::PLATER_ERROR; break;
    case EWarning::SomethingNotShown:  text = _u8L("Some objects are not visible during editing."); break;
    case EWarning::ObjectClashed:
        text = _u8L("An object outside the print area was detected.\n"
            "Resolve the current problem to continue slicing.");
        error = ErrorType::PLATER_ERROR;
        break;
```

## Notas del recolector

- Extractos del código etiquetado, no un ensayo ni un manual de uso. El propio código contiene comentarios FIXME sobre las aproximaciones geométricas.
- Los mensajes del objeto y de las trayectorias son distintos. No se ha probado visualmente en qué momento aparece cada aviso ni si su ausencia demuestra encaje físico.
- El vínculo de configuración y dimensiones de cama se recoge en el fichero independiente `escala-stl-prusaslicer-294-config-cama-2026-11-16.md`.
