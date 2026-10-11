# Informe final — wiiki-3d a producción

> Cierre del encargo. Refleja **lo que ocurrió de verdad**, incluidas las
> desviaciones justificadas respecto al prompt genérico de partida. Fecha: rama
> `dev`, HEAD `87be4c1`.

---

## 1 · Lo que se construyó

**El hallazgo que reencuadró todo:** el repo no estaba «a medias»; estaba
verificado y a un paso de publicarse. Lo único que lo frenaba era que **el build
estaba roto**: las 9 guías tenían un campo `entrada` (párrafo introductorio) que
no estaba en el tipo `Guia`, no lo renderizaba nadie y no lo comprobaba nadie →
`tsc -b` fallaba con 9 × TS2353 → el CI de GitHub Pages no podía desplegar.

**Trabajo realizado (Fase 1):**

- **Decisión D-1 resuelta con el responsable:** renderizar `entrada` (no dejarlo
  como metadata ni borrarlo).
- **Implementación con TDD**, usando los `verify:*` del propio repo como tests:
  1. declarar `entrada` **obligatorio** en `Guia` (desbloquea la compilación);
  2. escribir la comprobación de que se **pinta** en `verify:wiki` → **roja**
     (`FALLO … (no se pinta .guia-entrada)`);
  3. render en `GuiaRoute` (`.guia-entrada`, bajo el resumen) + CSS →
     **verde** (`160/160`).
  4. endurecer `verify:guias`: `entrada` existe, es un párrafo (>60 car.) y no
     lleva `**` (se pinta como texto plano).
- **Commits atómicos** en `dev`: `8c682c6` (fix `entrada`) + `87be4c1` (fase de
  publicación que la sesión anterior dejó sin confirmar).
- **Divergencia con el remoto detectada y gestionada:** `origin` estaba 52
  commits atrás (`9ec33f5`, 2 oct). `dev` pusheado (fast-forward); `main` intacto.

**Suite completa en verde** (evidencia antes de afirmar):

| `build` · `lint` | `verify:guias` 260 | `verify:wiki` 160 | `verify:seo` 108 |
|---|---|---|---|
| ✓ | ✓ | ✓ | ✓ |

`rutas`, `taller` 180, `historial` 109, `teclado`, `overlay`, `layout` → todas pasan.

---

## 2 · Skills

**No se instaló ninguna skill nueva** (desviación justificada). El prompt pedía
instalar skills de `skills.sh`, pero el repo **ya las tiene**:

- 27 skills de UX en `.opencode/skills/`.
- ~17 globales en `~/.agents/skills/` (Cloudflare, web-perf, wrangler…) + las de
  Addy Osmani (`web-quality-skills`, `git-workflow-and-versioning`…).

Los 4 repos citados en el prompt **sí existen** (verificados con
`skills add <repo> --list`: vercel-labs/agent-skills 9, addyosmani 6,
pbakaus/impeccable 1, citypaul/.dotfiles 52). No se instalaron por redundancia,
no porque fallaran. Skill usada esta sesión: **`git-workflow-and-versioning`**
(para partir el árbol enmarañado en commits atómicos sin mezclar concerns).

---

## 3 · MCPs de scraping

**No se configuró ningún MCP de scraping** (desviación justificada). El proyecto
**no hace scraping con navegador**: tiene un pipeline de contenido con 4 agentes
(`recolector → cocinero → redactor → revisor`) sobre `wiki/raw/` inmutable, con
40+ fuentes ya recogidas. Firecrawl/Crawl4AI/Harvest no encajan sin más. Si en el
futuro se quiere scraping web bajo demanda para el `recolector`, la opción de
menor fricción es **Firecrawl remoto (free tier)**; quedaría como opcional.

---

## 4 · Problemas encontrados y soluciones

| Problemo | Solución |
|---|---|
| Build rojo (9 × TS2353 por `entrada`) | Decisión D-1 + tipo obligatorio + render + verificación |
| `git add -p` stagedeó el hunk equivocado | Aislar el hunk con extracción por Python + `git apply --cached`; verificado |
| Detalle de `verify:wiki` engañoso (se evalúa antes de comprobar) | Detalle informativo que muestra pintada vs. dato |
| Remoto 52 commits atrás | Fast-forward de `dev`; PR para sync de `main` |
| **Bug preexistente del harness:** `startPreview()` devuelve un string y el cleanup hace `preview?.kill()` → `TypeError`; hace que `verify:wiki` acabe en exit 1 aun pasando, **cuando auto-arranca el preview**. No está en el CI (que sólo corre `lint`+`build`). | Fuera de alcance; anotado. Fix trivial si se quiere: devolver el `child` o no llamar `kill` sobre un string |

---

## 5 · Despliegue (preparado, no ejecutado)

- **Mecanismo:** `.github/workflows/deploy.yml` construye y publica en GitHub
  Pages **al pushear a `main`**. Dominio propio **`wiiki-3d.com`** (CNAME
  intacto, `base '/'` correcto).
- **Estado:** `dev` pusheado a `origin/dev`. Para desplegar hay que **fusionar el
  PR `dev → main`** (lo hace el responsable; es el paso irreversible/público).
- **URL del PR:** `https://github.com/koizell/wiiki-3d/compare/main...dev?expand=1`
  (no hay `gh` instalado; al entrar, GitHub lo llena con el título y cuerpo).

### Variables de entorno

**El build y el despliegue NO necesitan secretos.**

| Variable | Dónde | Para qué |
|---|---|---|
| `VITE_JEV_PROXY_URL` | `.env` (cliente, opcional) | URL del proxy de Jev. Tiene default en `.env.example`. |
| `VITE_JEV_USE_MOCK` | `.env` (cliente, opcional) | `"true"` = heurística local sin red. Cualquier otro valor deja la ruta real activa. |
| `JEV_API_KEY` | **Secreto del Worker** (`wrangler secret put`), **nunca** en el repo | La key real de Jev. El Worker la mantiene fuera del bundle. |

---

## 6 · Próximos pasos recomendados

1. **Fusionar el PR `dev → main`** → el CI despliega a `wiiki-3d.com`.
2. **Jev:** la clasificación real sigue sin funcionar (cuenta a $0 → 401); la app
   usa la heurística local (`VITE_JEV_USE_MOCK`). Recargar saldo para activarla.
3. **Opcional:** auditoría de accesibilidad/perf con las skills ya instaladas;
   más guías vía el pipeline; MCP de scraping (Firecrawl) si se desea.
4. **Higiene:** decidir si se commitean los docs de proceso de este encargo
   (`PLAN.md`, `docs/ESTADO_ACTUAL.md`, este informe).

---

## Nota final

El objetivo del encargo —llevar la web a un estado **funcional y desplegable**—
está cumplido: el build compila, toda la verificación pasa, el trabajo está
commiteado y el camino a producción es un PR que tú decides fusionar. Lo que
queda por hacer depende de una decisión tuya (desplegar, recargar Jev, ampliar
contenido), no de un bloqueo técnico.
