# Visor STL: plan de implementación

> **Para agentes:** usar `subagent-driven-development` o `executing-plans`.

**Objetivo:** mostrar el STL apoyado sobre la cama y permitir elegir su color.
**Arquitectura:** posición visual calculada con la caja del STL ya rotado;
estado de color independiente de la carga y aplicado únicamente a su material.
**Tecnología:** React, Three.js y Playwright existentes.
**Spec:** `docs/superpowers/specs/2026-11-15-visor-stl-color.md`.

## Restricciones globales

- Trabajar en `feat/reparacion-stl`; no fusionar ni publicar sin autorización.
- No modificar geometría ni contenido del archivo o descarga; conservar la orientación.
- No cambiar materiales ni posición de 3MF, OBJ o G-code.
- No tocar `opencode.json`, `wiki/raw/` ni `public/wiki/` no versionados.

## Review Focus

- Mallas con coordenadas negativas y alturas distintas: base en plano de cama.
- Cambio de color durante carga y después: resultado correcto sin reconstruir escena.
- Cambiar de archivo o formato: sin contaminación del color de 3MF o trayectoria.
- Uso móvil y teclado: selector accesible y controles sin desbordamiento.
- Reparación y descarga: bytes originales y resultado sin cambios por color.

### Task 1: Cama y selector STL

**Archivos:** `src/components/Viewer3D.tsx`, controles y estilos asociados,
`scripts/verify/reparacion-stl.mjs`.

**Interfaces:** extender el visor existente sin cambiar la API del motor STL.

- [ ] Añadir pruebas para los cinco casos de Review Focus, con cajas de malla
  antes y después de la rotación; observar fallo antes de implementar.
- [ ] Implementar posición visual de STL y selector diseñado para escritorio y
  móvil. El color inicial es azul; no rehacer renderer ni leer archivo otra vez.
- [ ] Ejecutar `npm run verify:reparacion-stl`, `npm run lint`, `npm run build`,
  `npm run verify:teclado`, `npm run verify:e2e`; registrar códigos y evidencias.
- [ ] Revisar capturas y probar visualmente el modelo en el navegador; commit
  de los archivos de la tarea sin incluir cambios ajenos.
