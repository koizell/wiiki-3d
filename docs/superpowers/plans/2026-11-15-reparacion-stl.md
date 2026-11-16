# Reparación de STL: plan de implementación

> **Para agentes:** usar `subagent-driven-development` o `executing-plans` para ejecutar las tareas. Las casillas permiten seguir el progreso.

**Objetivo:** detectar problemas de malla al cargar un STL y ofrecer una copia reparada descargable, sin enviar el archivo a un servidor.

**Arquitectura:** una única revisión vive en el shell común a la ruta y al panel, sin modificar `AnalysisContext`. Un adaptador de `meshfix-wasm` ejecuta el trabajo en un worker; la interfaz muestra resultados y conserva el visor original.

**Tecnología:** React, TypeScript, Vite, Three.js existente, `meshfix-wasm@0.6.1`, Playwright.

**Diseño:** `docs/superpowers/specs/2026-11-15-reparacion-stl-design.md`.

## Restricciones globales

- Trabajar y versionar en `feat/reparacion-stl`; no fusionar ni desplegar en `main` sin autorización.
- No incluir `opencode.json`, `public/wiki/*` no versionados ni cambiar `wiki/raw/`.
- Sólo STL; análisis automático local; reparación por acción explícita, original intacto y visor original.
- Avisar por encima de 60 MB; rechazar por encima de 150 MB antes de leer el archivo para analizarlo. No garantizar que archivos menores quepan en memoria.
- Carga diferida del motor y sus assets; no usar APIs de navegador durante el render estático.
- Informar límites y problemas pendientes; no garantizar imprimibilidad ni clasificar como intencionada una abertura con certeza.
- Asegurar que el resultado y el botón se encuentren también en móvil, donde el panel lateral podría no mostrarse.

## Revisión enfocada

1. STL corrupto o vacío: error claro, sin descarga falsa ni bloqueo.
2. Archivo sustituido durante análisis o reparación: cancelar worker y descartar resultados y URLs antiguas.
3. Abertura deliberada o reparación incompleta: conservar por defecto, mostrar lo omitido y advertir antes de una acción destructiva.
4. Worker o WASM inaccesible: error recuperable sin romper el visor ni el resto de la aplicación.
5. Móvil y navegación con teclado: acceso al diagnóstico, acción y descarga sin depender del panel de escritorio.

## Mapa de archivos

- `scripts/copiar-meshfix.mjs`, `package.json`, `package-lock.json`: dependencia fijada y assets del worker clásico.
- `src/services/reparacionMalla.ts`: sesión aislada y tipos de análisis, reparación y cancelación.
- `src/state/useRevisionMalla.ts`: ciclo de vida, límites, progreso, descargas y protección frente a resultados antiguos.
- `src/App.tsx`, `src/routes/UploadRoute.tsx`, `src/components/AnalysisPanel.tsx`: una instancia compartida entre panel y visor mediante el mecanismo de contexto de ruta o proveedor independiente.
- `src/components/RevisionMalla.tsx` y estilos asociados: presentación adaptable, acciones y límites.
- `scripts/verify/reparacion-stl.mjs`: fixtures y pruebas reales en navegador, incluida la integración de assets.

### Task 1: motor y assets

**Archivos:** `package.json`, `package-lock.json`, `scripts/copiar-meshfix.mjs`, `src/services/reparacionMalla.ts`, `scripts/verify/reparacion-stl.mjs`.

**Interfaces:** `crearSesionMalla(): Promise<SesionMalla>`; la sesión expone `analizar(buffer: ArrayBuffer)`, `reparar(onProgreso)`, `rellenarAberturas(onProgreso)`, `exportar(): Promise<ArrayBuffer>` y `dispose()`. Los resultados tipados incluyen análisis, incidencias y resumen de cambios de la librería.

- [ ] Crear prueba de navegador con STL binario de cubo cerrado de 12 triángulos y otro al que se eliminan **dos** triángulos de una cara. Comprobar cerrado/manifold para el primero y borde abierto para el segundo; el segundo debe poder repararse y exportarse como STL legible. Ejecutar `npm run verify:reparacion-stl` y confirmar fallo inicial.
- [ ] Instalar exactamente `meshfix-wasm@0.6.1`; añadir copia determinista de `worker.js`, `meshfix-core.js`, `meshfix-core.wasm` en `predev` y `prebuild`, con URLs explícitas y compatibles con la base de Vite. Decidir de forma coherente si los assets generados se ignoran o versionan; no duplicar versiones silenciosamente.
- [ ] Implementar la sesión con carga dinámica. Verificar en los tipos y código reales del paquete cómo se activa `fillFeatures`: **no asumir que `repair()` acepta esa opción**. Si requiere `fillHoles(..., true)`, hacer una nueva sesión desde el original y aplicar la secuencia explícita, conservando el resultado anterior hasta tener éxito.
- [ ] Ampliar la prueba con cubo invertido, STL vacío y truncado, fallo de worker y exportación reanalizada. No asumir que volumen firmado o la heurística de agujeros son idénticos a lo esperado sin comprobarlos con el motor.
- [ ] Ejecutar `npm run verify:reparacion-stl` y `npm run build`; ambos deben terminar con código 0 y los assets deben cargarse desde `dist` con `vite preview`.
- [ ] Registrar los archivos de esta tarea en un commit de la rama.

### Task 2: ciclo de vida y datos

**Archivos:** `src/state/useRevisionMalla.ts`, `src/services/reparacionMalla.ts`, `scripts/verify/reparacion-stl.mjs`.

**Interfaces:** `useRevisionMalla(file: File | null, fileType: FileType | null): RevisionMalla`; `RevisionMalla` expone fase (`inactivo`, `analizando`, `listo`, `reparando`, `reparado`, `error`), análisis, progreso, resumen, error, aviso de tamaño, URL de descarga, y acciones `reparar()` y `rellenarAberturas()`.

- [ ] Añadir pruebas que suben STL, cambian de archivo en pleno análisis y en reparación, limpian la selección y comprueban que ningún resultado antiguo reaparece. Verificar revocación de URLs y cierre del worker; confirmar fallo antes de implementar.
- [ ] Implementar una sesión por archivo, contador de generación y limpieza al cambiar o desmontar. Descartar resultados tardíos y cerrar el worker al cancelar; no persistir geometría.
- [ ] Probar límites exactos con `File` simulado: a 60 MB no avisa, por encima sí; a 150 MB se permite, por encima se rechaza antes de `arrayBuffer()`. Usar unidades coherentes y declararlas en la interfaz.
- [ ] Comprobar que un fallo inicial, durante reparación o durante exportación muestra error y no publica un resultado incompleto; volver a intentar debe poder iniciar una sesión nueva.
- [ ] Ejecutar `npm run verify:reparacion-stl` y `npm run lint`; código 0. Commit de los archivos de esta tarea.

### Task 3: integración y experiencia

**Responsable de interfaz:** diseñador. **Archivos:** `src/App.tsx`, `src/routes/UploadRoute.tsx`, `src/components/AnalysisPanel.tsx`, `src/components/RevisionMalla.tsx`, estilos, `scripts/verify/reparacion-stl.mjs`.

**Interfaces:** consumir una sola instancia de `RevisionMalla` de la tarea 2; pasar su estado al detalle y veredicto sin crear otra sesión.

- [ ] Añadir prueba de extremo a extremo para selección y arrastre: diagnóstico automático, reparación explícita, descarga `<nombre>-reparado.stl` y archivo original sin modificación. Verificar que STL sano no ofrece reparación y que se muestran incidencias pendientes tras reparar.
- [ ] Instanciar el hook en `AppShell`, ancestro real de `Outlet` y panel lateral; distribuir estado al `UploadRoute` y al panel sin cambiar el contexto de G-code. No presentar la insignia Jev/Demo como motor del análisis STL.
- [ ] Implementar la presentación de detalle, progreso y descarga; veredicto sobre el visor. Mostrar la misma funcionalidad accesible en móvil sin lanzar otra revisión. Actualizar el texto de subida, que actualmente afirma que STL no se analiza.
- [ ] Para aberturas consideradas posibles características, mostrar que es una heurística y requerir acción explícita con advertencia; probar que al fallar la segunda pasada sigue disponible la primera descarga.
- [ ] Probar teclado, estados anunciados, viewport móvil y escritorio, error de motor, cierre de archivo y vuelta a G-code/3MF. `npm run verify:reparacion-stl`, `npm run verify:subida`, `npm run verify:teclado`: código 0.
- [ ] Revisar capturas y copia visible; commit de los archivos de esta tarea.

### Task 4: integración final

- [ ] Ejecutar `npm run lint`, `npm run build`, `npm run verify:reparacion-stl`, `npm run verify:gcode`, `npm run verify:subida`, `npm run verify:teclado`, `npm run verify:dist` y `npm run verify:revision`. Guardar comandos, códigos de salida y extractos de errores; no canalizar las salidas de forma que oculten fallos.
- [ ] Comprobar con navegador y red que la portada sin archivo no descarga WASM; después de subir STL el worker y WASM se cargan desde el build de producción. Confirmar que no se envía el contenido del archivo por red.
- [ ] Ejecutar `git diff --check`, comprobar `git status --short`, `git diff main...HEAD` y ausencia de cambios en `wiki/raw/`; ejecutar `graphify update .` si está disponible y revisar sus cambios antes de incluirlos.
- [ ] Presentar resultados y comparación de la rama; pedir autorización específica antes de fusionar, publicar o desplegar.
