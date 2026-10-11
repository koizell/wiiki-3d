# Estado actual de wiiki-3d

> Informe de la **Fase 0** (análisis y descubrimiento). Todo lo de aquí se ha
> leído del árbol de trabajo, del `git log` y de los docs existentes. Nada está
> supuesto: donde no hay datos, se dice.
>
> Fecha de la inspección: rama `dev`, HEAD `fc2e079`, con trabajo sin commitear.

---

## Resumen en una frase

**No es un proyecto a medias: está al borde de publicarse.** La app funciona y
está verificada; lo que hay ahora mismo en el árbol de trabajo **no compila** por
un único campo huérfano, y arreglarlo es el paso que desbloquea todo lo demás.

El prompt de partida describía «medianamente construida, con posible scraping
existente» y pedía habilidades de scraping y de planificación desde cero. La
realidad del repo es distinta y más avanzada:

| Supuesto del prompt | Realidad del repo |
|---|---|
| Proyecto a medias | Frontend, backend-proxy, contenido y verificación hechos |
| Scraping roto o inexistente | Pipeline de contenido con 4 agentes (`recolector → cocinero → redactor → revisor`), con 40+ fuentes crudas ya en `wiki/raw/` |
| Sin skills instaladas | 27 skills de UX en `.opencode/skills/`, ~17 globales (Cloudflare, web-perf…), y skills de Addy Osmani ya presentes |
| Falta planificación | `docs/estado.md`, `docs/plan-guias.md`, `docs/kanban.md`, 6 fases documentadas |
| Sin desplegar | CI de GitHub Pages lista (`.github/workflows/deploy.yml`) |

---

## Stack detectado

| Capa | Tecnología | Dónde |
|---|---|---|
| Frontend | React 19 + TypeScript, Vite 8, React Router 7 | `src/` |
| Visor 3D | Three.js 0.186 | `src/components/Viewer3D.tsx` |
| Backend | Cloudflare Worker (proxy de Jev, oculta la API key) | `worker/src/index.ts` |
| Persistencia | IndexedDB en el navegador | `src/lib/storage.ts` |
| Contenido | Guías tipadas `.ts` (no Markdown) | `src/content/guias/*.ts` |
| Despliegue | GitHub Pages vía Actions; export HTML estático para SEO | `.github/`, `scripts/export-static.mjs` |
| Herramientas | Node 24, npm 11, Playwright, ESLint 10, TS 6 | `package.json` |

---

## Qué está construido y verificado

Los cuatro módulos de la app (`/`, `/taller`, `/wiki`, `/proyectos`):

| Módulo | Estado | Nota |
|---|---|---|
| Wiki 3D (9 guías) | Hecho | `warping-pla`, `separaciones`, `temperatura-cama`, `adhesion-primera-capa`, `enclosure-y-warping`, `material`, `voladizos-y-soportes`, `altura-capa`, `temperatura-hotend` |
| Taller (calculadora) | Hecho | 5 estados con verificación propia |
| Inicio | Hecho (en curso de cierre) | Cabecera, 3 síntomas, subida, historial |
| Proyectos | Hecho (en curso) | Biblioteca con nombre sobre IndexedDB |
| Capa «web» | Hecho | og:/twitter:, iconos, `manifest.webmanifest`, privacidad, contacto |

Suite de verificación disponible (todas salen con código 1 si fallan, sirven de
CI): `lint`, `build`, `verify:layout`, `verify:teclado`, `verify:rutas`,
`verify:wiki`, `verify:seo`, `verify:taller`, `verify:historial`,
`verify:overlay`, `verify:guias`.

---

## 🔴 El problema que bloquea todo: el build está roto

```
npm run build  →  tsc -b  →  9 errores TS2353:
'entrada' does not exist in type 'Guia'
```

**Causa raíz.** En el trabajo sin commitear, las 9 guías añadieron un campo nuevo,
`entrada`, que es un párrafo introductorio más largo que `resumen`:

> warping → «El PLA es el material rígido que menos warpea, así que cuando sus
> esquinas se levantan casi nunca es el filamento…»

Pero ese campo:

- **no está declarado** en el tipo `Guia` (`src/content/guias/tipos.ts`);
- **no lo renderiza** ningún componente (`GuiaRoute` sólo pinta `resumen`);
- **no tiene CSS** asociado (no hay clase `.guia-entrada`);
- **no lo verifica** ningún script ni lo menciona ningún agente.

Es decir: es un **dato huérfano añadido a medias**. El proyecto tiene un principio
explícito contra esto mismo («ninguna variable puede ser decorativa»; «un dato
mal escrito no se ve mal: no compila»), así que hay que decidir qué hacer con él
antes de seguir.

### Otro trabajo sin commitear (sí coherente y documentado)

El resto del árbol sucio es una fase de publicación completa y con sentido:
rediseño de Inicio (`Inicio.tsx`), módulo Proyectos (`ProyectosRoute.tsx`),
SEO/og (`seo.ts`, `index.html`), iconos PNG y `manifest.webmanifest`, movimiento
(App.css, +375 líneas), borrado de `PlaceholderRoute.tsx`. Está documentado en el
`docs/estado.md` sin commitear.

---

## Bloqueantes externos (fuera del código)

| Qué | Estado | Impacto |
|---|---|---|
| API de Jev | **De pago, cuenta a $0** → `401` | La clasificación real no funciona. La app usa una heurística local (`VITE_JEV_USE_MOCK`). No se puede arreglar sin recargar saldo. |
| Dominio/Email Routing | `contacto@wiiki-3d.com` por verificar a mano | Ninguna prueba automática distingue una dirección que rebota. |

---

## Riesgos técnicos

1. **El build roto frena el despliegue.** El CI corre `npm run build` sobre `main`;
   mientras `tsc` falle, nada llega a GitHub Pages.
2. **Decidir mal con `entrada`.** Renderizarlo inventa una decisión de diseño
   visible en 9 páginas; dejarlo como metadata deja dato muerto. Es una bifurcación
   difícil de revertir → se pregunta antes de tocar (ver `PLAN.md`, D-1).
3. **Rama `dev` vs `main`.** El despliegue se dispara desde `main`. Hay que definir
   cómo baja el trabajo de `dev` a `main` (PR/merge).

---

## Cómo comprobar este informe

```bash
npm run build         # reproduce el rojo (los 9 errores de 'entrada')
npm run lint          # estado del lint
git status --short    # el trabajo sin commitear descrito arriba
git diff --stat       # alcance de la fase de publicación
```
