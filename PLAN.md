# PLAN — llevar wiiki-3d a producción

> **Fase 1** del encargo. Derivado de [`ESTADO_ACTUAL.md`](ESTADO_ACTUAL.md).
> Regla de oro del repo que este plan respeta: *no se escribe código de producción
> hasta cerrar la decisión **D-1** de abajo*, porque es una bifurcación visible y
> difícil de revertir.

---

## Contexto que reencuadra el plan

El proyecto **no se construye desde cero**: está verificado y a un paso de
publicar. El trabajo real es:

1. **Desbloquear el build** (una sola causa: el campo `entrada`).
2. **Ordenar y comitear** la fase de publicación que está sin commitear.
3. **Verificar en verde** toda la suite.
4. **Bajar a `main`** para que el CI de GitHub Pages despliegue.

Las fases 2 y 3 del encargo original (instalar skills de scraping/planificación y
MCPs de scraping) se tratan al final como **opcionales**, con la justificación de
por qué aquí no aplican igual.

---

## Decisión crítica (bloquea la Fase 1)

### D-1 · ¿Qué hacer con el campo `entrada`?

`entrada` es un párrafo introductorio escrito ya en las 9 guías, pero huérfano
(sin tipo, sin render, sin CSS, sin verificación). Tres salidas:

| Opción | Qué implica | A favor | En contra |
|---|---|---|---|
| **A · Renderizarlo** | Declarar `entrada` en el tipo, pintarlo como intro de la guía (bajo la cabecera, antes del diferencial), añadir CSS mínimo | Da sentido al dato ya escrito; mejora la guía | Inventa una decisión de diseño visible en 9 páginas |
| **B · Declararlo y dejarlo como metadata** | Añadir `entrada?: string` al tipo; el build compila; no se pinta | Mínimo, reversible, desbloquea ya | Deja dato muerto, contra el principio anti-decorativo del repo |
| **C · Quitarlo** | Borrar `entrada` de las 9 guías | Vuelve al estado que compilaba | Tira el texto ya escrito |

**Recomendación: A.** El contenido está claramente escrito para leerse (no es un
identificador), y el repo ya distingue `resumen` (una frase, para la tarjeta del
índice y el SEO) de un texto de cuerpo más largo. Renderizarlo completa la
intención a medias. Se haría con verificación nueva para que no quede
decorativo (ver A-3).

> **Se pregunta al responsable antes de ejecutar la Fase 1.** Ver conversación.

---

## Fase 1 · Fundación: build verde y trabajo ordenado

| # | Tarea atómica | Dep. | Criterio de aceptación |
|---|---|---|---|
| 1.1 | Resolver **D-1** según lo decidido | — | `npm run build` termina en verde |
| 1.2 | Si A: render de `entrada` + CSS mínimo en `GuiaRoute` | 1.1 | Se ve la intro en las 9 guías; `lint` en verde |
| 1.3 | Si A: verificación de que `entrada` no queda decorativa (existe en las 9, se pinta) | 1.2 | `verify:guias` ampliada o check nuevo pasa; se ve fallar si se borra |
| 1.4 | Commits **atómicos** de la fase de publicación (Inicio / Proyectos / SEO+iconos / movimiento) | 1.1 | Cada commit compila; mensajes descriptivos |
| 1.5 | Actualizar el `.env.example`/README si el equipo lo pide para desplegar | — | Documentado |

**Herramientas:** test-driven-development (para 1.3), git-workflow-and-versioning,
las skills de UX ya instaladas (`page-structure-patterns`, `react-ux-patterns`).

## Fase 2 · Verificación completa

| # | Tarea atómica | Dep. | Criterio de aceptación |
|---|---|---|---|
| 2.1 | `npm run lint` | Fase 1 | 0 errores |
| 2.2 | `npm run build` | Fase 1 | Verde |
| 2.3 | Los `verify:*` (layout, teclado, rutas, wiki, seo, taller, historial, overlay, guias) | 2.2 | Todos en verde sobre `dist` recién construido |

**Nota del repo:** los `verify:*` de navegador levantan su propio `vite preview`;
hay que reconstruir `dist` antes o se mide un `dist` viejo.

## Fase 3 · Publicación

| # | Tarea atómica | Dep. | Criterio de aceptación |
|---|---|---|---|
| 3.1 | Confirmar `.github/workflows/deploy.yml` (Node 22, lint, build sobre `main`) | — | Revisado |
| 3.2 | Llevar `dev` a `main` (PR/merge) | Fase 2 | Push a `main` |
| 3.3 | Comprobar el artefacto HTML exportado (canonical, og por ruta, lectura sin JS) | 3.2 | Sitio responde; `verify:seo` refleja lo servido |

## Fase 4 · Optimización y accesibilidad (con lo ya instalado)

| # | Tarea atómica | Dep. | Criterio de aceptación |
|---|---|---|---|
| 4.1 | Auditoría a11y con `wcag-accessibility` / `accessibility-auditor` | Fase 2 | Informe |
| 4.2 | Revisión web-perf / SEO con skills existentes | Fase 2 | Notas acordadas |

## Fase 5 · Opcional del encargo original: skills.sh y MCP de scraping

**Evaluación honesta: casi todo redundante aquí.**

| Petición original | Estado real | Acción |
|---|---|---|
| `npx skills add …planning` | Ya hay planificación escrita y skills de UX | No añadir |
| `addyosmani/web-quality-skills` | **Ya instalado** globalmente | No reinstalar |
| skills de React/Next | Proyecto es React+Vite, ya cubierto por skills de UX | No añadir |
| MCP Firecrawl / Crawl4ai / Harvest | El scraping de contenido usa un pipeline de 4 agentes sobre `wiki/raw/`, no navegador | **Opcional**: sólo si se quiere scraping web bajo demanda para el `recolector`. Firecrawl remoto (free tier) es el de menor fricción; se configura en `opencode.json` si se aprueba |

Los 4 repos de skills citados en el prompt **sí existen** (verificados con
`skills add <repo> --list`: vercel-labs/agent-skills 9, addyosmani 6,
pbakaus/impeccable 1, citypaul/.dotfiles 52). No se instalan por redundancia, no
porque fallen.

---

## Definition of Done del plan entero

- `npm run build` y `npm run lint` en verde.
- Los `verify:*` en verde.
- El trabajo publicado en `main` y desplegado por el CI.
- `docs/INFORME_FINAL.md` con lo hecho, decisiones y próximos pasos.
