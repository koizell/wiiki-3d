# UI centrada en tareas — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Aplicar la recomendación aprobada: entrada clara, resultados protagonistas y guías más fáciles de recorrer, conservando la identidad visual.

**Architecture:** React y CSS existentes, sin dependencias nuevas. El shell reserva la columna auxiliar para el visor y las guías; el análisis G-code se muestra dentro de Inicio. Los cambios de presentación no modifican fuentes ni reglas de las guías.

**Tech Stack:** React 19, TypeScript, Vite, CSS, verificadores Node/Playwright.

**Spec:** Auditoría aprobada en conversación y `/tmp/opencode/ux-laya-2026-10-16/informe.md` (UX01–UX13). Este documento conserva las decisiones de implementación para no depender del fichero temporal.

## Global Constraints

- Mantener paleta oscura/azul y cuatro destinos principales; no instalar librerías de animación.
- No tocar `wiki/raw/`, `wiki/cooked/` ni el contenido técnico de las guías.
- No integrar Laya en decisiones automáticas de UI ni enviar datos de visitantes.
- No modificar anuncios, consentimiento, servicios remotos ni trabajos de otras sesiones.
- No bajar umbrales ni omitir pruebas para obtener verde.
- Trabajar en `feature/ux-tareas-usuario`; no fusionar ni publicar sin autorización.

## Review Focus

- Pantalla 375×667 y foco: el botón de subida debe caber sobre la navegación fija.
- Análisis restaurado sin archivo: mantener datos, enlaces y acceso al coste.
- STL y 3MF: no perder el espacio del visor al cambiar la composición de G-code.
- Guías sin JavaScript: diferencial, contenido y fuentes siguen accesibles.
- Cerramiento desconocido: distinguir materiales que admiten máquina abierta de los que no.

## Task 1: Entrada y resultado protagonistas

**Files:** `src/App.tsx`, `src/App.css`, `src/components/Inicio.tsx`, `src/components/SeccionAnalisis.tsx`, `src/routes/UploadRoute.tsx`, `scripts/verify/ux-tareas.mjs`.

**Interfaces:** consumir contexto de análisis existente; `SeccionAnalisis()` presenta el mismo `AnalysisPanel` en un solo lugar, sin duplicar regiones vivas. El visor sigue en la ruta de subida.

- [x] Escribir comprobaciones de botón completamente visible, acceso temprano a síntomas/Máquinas y análisis principal sin visor vacío.
- [x] Ejecutar `node scripts/verify/ux-tareas.mjs`; comprobar fallos por las condiciones actuales.
- [x] Compactar cabecera y subida; añadir accesos contextuales; mover análisis de G-code al contenido principal, incluido restaurado; recuperación de formato no admitido.
- [x] Ejecutar build, pruebas nuevas y `verify:subida`, `verify:historial`, `verify:wiki`, `verify:overlay`.

## Task 2: Recorrido de guías y estructura compartida

**Files:** `src/routes/GuiaRoute.tsx`, `src/components/RielWiki.tsx`, `src/routes/WikiIndexRoute.tsx`, `src/App.tsx`, `src/App.css`, `scripts/verify/ux-tareas.mjs`.

**Interfaces:** conservar las cuatro etapas en orden y los identificadores de variables; añadir navegación de etapas mediante anclas. Limitar relacionados a tres y enlazar al índice completo. Buscador mantiene URL/recuento y todas las guías.

- [x] Añadir pruebas: entrada al diferencial en primera pantalla, cuatro destinos de etapa válidos, relacionadas limitadas y agrupación del índice sin perder resultados.
- [x] Ver fallar las pruebas nuevas antes de cambiar UI.
- [x] Compactar ilustración/entrada; conservar introducción ampliable, autoría y fuentes; navegación temprana; agrupar índice por tarea sin afirmar frecuencias no medidas.
- [x] Reservar lateral a vistas donde aporta; Taller/biblioteca/textos con alineación superior y ancho de lectura; fallback accesible al cargar rutas.
- [x] Ejecutar pruebas nuevas, `verify:guias`, `verify:rutas`, `verify:teclado`, `verify:seo`, `verify:ui`.

## Task 3: Catálogo, coste y recuperación del visor

**Files:** `src/lib/maquinas.ts`, `src/routes/MaquinasRoute.tsx`, `src/estilos/maquinas.css`, `src/routes/TallerRoute.tsx`, `src/components/Viewer3D.tsx`, `src/App.css`, `scripts/verify/ux-tareas.mjs`, `scripts/verify/maquinas.mjs`.

**Interfaces:** `estadoFilamento` conserva unión `Compatibilidad`; consultar cerramiento sólo cuando `filamento.abierta` es falso. Coste conserva precio local y aritmética existente. Controles del visor actúan sobre la cámara y OrbitControls ya existentes.

- [x] Prueba negativa PLA+cerramiento desconocido, ABS desconocido/abierto/cerrado; primera ficha móvil identificable antes del pliegue; coste destacado sin perder fórmula; controles de visor por botón/teclado.
- [x] Ver fallar antes de implementar.
- [x] Reducir explicación inicial del catálogo sin eliminar transparencia; destacar coste con sus límites; controles de encuadre/zoom y ayuda; errores con elección de otro archivo; quitar OBJ de formatos anunciados como admitidos sin borrar su recuperación al arrastrarlo.
- [x] Ejecutar pruebas nuevas y suite de verificadores, registrar cualquier deuda previa separada. El aviso de chunk 3D ya aparecía en baseline; no bloquea el build.

## Cierre

- [x] Capturas antes/después a 375, 768 y 1440; barrido de rutas a 320/375/768/1024/1440; contraste, foco y movimiento reducido.
- [x] Revisión independiente del diff; corregir hallazgos importantes con pruebas (dos Important: espacio del visor y falsa comparación de zoom; overlay sin salto y controles geométricos comprobados con mutación).
- [x] `graphify update .`, estado/diff final y notas de alcance real. No publicar ni fusionar.

### Decisiones de alcance

Se ejecuta aquí la recomendación aprobada sin otra ronda de preguntas. Proyectos e Historial conservan sus rutas y modelo de datos; se mejora composición, no se fusionan servicios. La priorización de Laya no validada queda fuera. Las transiciones retenidas por React pueden mostrar la pantalla anterior; el fallback se cubre, pero cualquier indicador adicional deberá probarse sin introducir cambios de router innecesarios.
