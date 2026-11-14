# AdSense y crecimiento — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Track progress with checkboxes.

**Goal:** Mejorar la preparación para AdSense y la captación orgánica con agentes fiables y verificaciones reproducibles.
**Architecture:** Mantener las tres capas editoriales y la exportación estática. Corregir defectos medidos, no rehacer el sitio.
**Tech Stack:** React, TypeScript, Vite, Node, agentes Markdown OpenCode V2.
**Spec:** `docs/superpowers/specs/2026-11-12-adsense-crecimiento-design.md`.

## Global Constraints

- Ejecutar sin preguntas intermedias, según encargo explícito.
- Sin modelo fijo; fuentes raw existentes inmutables; preservar cambios ajenos.
- No prometer aprobación, tráfico ni indexación; no inventar acceso a cuentas.
- Fuentes oficiales vigentes comprobadas; antigüedad y vigencia no son lo mismo.

## Review Focus

- Una fuente cocinada errónea debe poder ser rechazada aun si la guía coincide.
- Una página 200 con sólo navegación no debe pasar como fuente técnica.
- Las guías sin cambios sustanciales no deben obtener fechas nuevas artificiales.
- Navegación SPA, etiquetas de medición y sitemap deben coincidir con rutas reales.
- IDs públicos configurados no prueban acceso, consentimiento ni recepción en GA4.

## Tareas

### 1. Diagnóstico actual e investigación
- [x] Leer planes existentes y separar estado histórico de evidencia actual.
- [x] Consultar Shopify y documentación oficial de Google/OpenCode.
- [x] Consolidar auditorías técnica/editorial y benchmark en `docs/investigacion-crecimiento-2026-11-13.md`.

### 2. Agentes editoriales utilizables
Archivos: `.opencode/agents/{recolector,cocinero,redactor,revisor}.md`, nuevos roles
de estrategia/auditoría si aportan una responsabilidad distinta, y runbook en docs.
Entrada: brief y rutas. Salida: artefactos y estado reproducible.
- [x] Migrar contratos a sintaxis V2 documentada, sin campos de modelo.
- [x] Exigir actualidad, alcance por equipo/versión, extractos localizables y separación hecho/inferencia.
- [x] Limitar iteraciones y registrar pendientes; evitar repetición tras agotar contexto.
- [x] Comprobar carga/configuración y revisar contradicciones.

### 3. Correcciones técnicas basadas en auditoría
Archivos candidatos: `scripts/export-static.mjs`, `src/lib/seo.ts`, medición,
`scripts/verify/seo.mjs`, documentación de puesta en marcha.
- [x] Registrar fallos reproducibles y prueba correspondiente antes de corregir.
- [x] Corregir sólo hallazgos demostrados y actualizar instrucciones operativas.
- [x] Verificar HTML, sitemap, robots, canonicals y medición según cambios.

### 4. Piloto de revisión editorial
Entrada: una guía existente elegida por evidencia de necesidad y fuentes actuales.
- [x] Crear brief acotado y ejecutar revisión con contratos nuevos.
- [x] Si se necesita actualizar: nuevas raw → cooked → guía → revisión independiente.
- [x] Registrar cobertura, rechazos y límites; no ocultar huecos con texto de relleno.

### 5. Crecimiento y cierre
- [x] Plan de consultas/agrupaciones, enlaces internos y distribución útil; métricas GA4/GSC y revisión a 28 días.
- [x] `npm run lint`, `npm run build`, `npm run verify:contenido`, `npm run verify:dist`, `npm run verify:revision` y checks específicos de cambios.
- [x] `git diff --check`, comprobar inmutabilidad raw y cambios previos.
- [x] Ejecutar `graphify update .` tras cambios de código; registrar si herramienta no disponible.
- [x] Informe final con trabajo implementado, pruebas y bloqueos externos.

## Ejecución

Auditorías independientes delegadas; integración y verificación en esta sesión.
No hay espera de aprobación del diseño: el propietario pidió expresamente
ejecutar sin preguntas. No se presupone autorización para publicar cambios ajenos.
