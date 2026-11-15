# Informe STL: plan de implementación

> **Para agentes:** ejecutar con `subagent-driven-development` o `executing-plans`.

**Objetivo:** trasladar el informe STL al flujo principal y aplicar la propuesta visual aprobada.
**Arquitectura:** una única revisión compartida; la ruta de subida presenta el visor y el informe, sin panel lateral STL ni scroll anidado. Los otros formatos conservan su comportamiento.
**Tecnología:** React, TypeScript, CSS existente y Playwright.
**Spec:** `docs/superpowers/specs/2026-11-15-informe-stl-diseno.md`.

## Restricciones globales

- Seguir en `feat/reparacion-stl`; no fusionar ni desplegar sin autorización.
- Preservar original, reparación, descarga, avisos y una sola sesión de análisis.
- No tocar `opencode.json`, `wiki/raw/` ni `public/wiki/` no versionados.

## Review Focus

- Vista móvil estrecha: informe y acciones visibles sin desplazamiento lateral.
- STL sano, en curso o con error: estado correcto, sin acción engañosa.
- Reparación parcial: mantener advertencias, incidencias y descarga previa.
- Navegación por teclado: enlace, controles, informe y botones accesibles.
- Otros formatos: G-code y 3MF conservan los flujos y paneles existentes.

### Task 1: Informe y presentación

**Archivos:** `src/App.tsx`, `src/routes/UploadRoute.tsx`, `src/components/RevisionMalla.tsx`, `src/components/revision-malla.css`, `scripts/verify/reparacion-stl.mjs`.

**Interfaces:** consumir `RevisionMalla` compartida existente; no cambiar las APIs del motor ni crear una segunda instancia del hook.

- [ ] Añadir pruebas de navegador que exijan el informe debajo del visor, sin panel STL lateral ni scroll independiente; comprobar escritorio y móvil, teclado, controles y los cinco casos de Review Focus.
- [ ] Ejecutar `npm run verify:reparacion-stl` y registrar el fallo esperado antes de cambiar la interfaz.
- [ ] El diseñador implementa la propuesta aprobada y conserva todos los estados y advertencias, incluidos datos iniciales y posteriores, confirmación de aberturas y enlace de contacto.
- [ ] Ejecutar `npm run verify:reparacion-stl`, `npm run lint`, `npm run build`, `npm run verify:subida`, `npm run verify:teclado` y `npm run verify:dist`; comprobar códigos 0 y capturas de escritorio y móvil.
- [ ] Revisar el diff y documentar pruebas; commit sólo de los archivos de esta tarea en la rama.
