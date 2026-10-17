# Plan de Laya en wiiki-3d

> **Estado: borrador verificado parcialmente.** Los pasos 1, 2 y 4 están
> **probados a mano** (con evidencia abajo); el paso 3 está **probado como
> spike** en un navegador headless, no integrado en la app. Lo marcado como
> *propuesta* no está decidido ni construido.
> Fecha: **2026-10-16**.

---

## 0 · Qué es Laya y por qué entra

**Laya** (`convaiinnovations/laya`, Apache-2.0) es un modelo de decisiones
*System 1*, **no generativo**: recibe un *estado* (texto o JSON) y **preguntas
tipadas** (`choice` / `score` / `noul`) y devuelve **respuestas tipadas con
probabilidades calibradas** en un solo paso. Multilingüe (incluye español).
Sustituye a **Jev** como clasificador de la app y sirve para decisiones de
contenido y monetización.

Lo importante para este repo: su *wire* (`POST /v1/systemone`) es **compatible
con el protocolo de Jev que ya usa `JevService`**. Los tipos, el `state` +
`questions` y la forma de `criteria` (objeto en `choice`, array en `score`) son
idénticos; sólo cambian **la ruta** (`/classify` vs `/v1/systemone`) y **la
envoltura** (el cliente lee `data.answers`; Laya devuelve `answers` en la raíz).

---

## 1 · Restricciones duras (medidas, no supuestas)

| Restricción | Dato | Consecuencia |
|---|---|---|
| Python oficial (`laya[serve]`, `laya[mcp]`) | `torch>=2.0.0` es dependencia **core**; `download.pytorch.org` **no responde** en este entorno | La vía Python queda descartada aquí; se usa el paquete npm |
| Modelo | `model.onnx` = **324 MB** + tokenizer 34 MB | No cabe en el repo (ver siguiente fila) |
| GitHub Pages | límite de **100 MB por fichero** | El modelo **no puede versionarse**; en producción debe venir de HF/CDN |
| GH Pages (cabeceras) | no puede enviar **COOP/COEP** | WASM **mono-hilo**; sin `SharedArrayBuffer` |
| Rendimiento WASM | ~**40× más lento** que el binario nativo | Decenas de segundos por pregunta en el navegador |
| WebGPU | aceleración real donde exista | ~125 ms/pregunta (dato del paquete de la comunidad) |

---

## 2 · Lo verificado (pasos 1, 2 y 4)

### Paso 1 — Laya en local (WSL2) ✅

- Paquete: **`laya-system-one` 1.3.3** (binario nativo `laya-serve`, sin torch).
  El modelo viene **dentro del paquete** (13 chunks → `model.onnx`, 324 MB).
- Arranque: `npx laya-system-one --port 8080`.
- Endpoints: `POST /v1/systemone` (wire de Jev) y `GET /health`.
- Evidencia: `/health` → `{"status":"ok","model":"laya-multilingual","protocol":"TypeSafe Jev /v1/systemone compatible"}`; una decisión real devolvió `risk: medium` con probabilidades calibradas.

### Paso 2 — Adaptador `/classify` → Laya ✅

- Fichero: **`scripts/laya/classify-adapter.mjs`** (commit `87cbb08`).
- Cierra los dos únicos desajustes (ruta + envoltura). Probado end-to-end por
  HTTP: `/classify` → Laya → `data.answers.{risk_level, warping_risk, needs_support}`.
- Uso local:
  ```bash
  npx laya-system-one --port 8080
  node scripts/laya/classify-adapter.mjs
  VITE_JEV_USE_MOCK=false VITE_JEV_PROXY_URL=http://127.0.0.1:8787 npm run dev
  ```

### Paso 4 — MCP para OpenCode v2 ✅

- Fichero: **`scripts/laya/mcp-server.mjs`** (commit `b38ce7d`), MCP por stdio.
- Herramientas: `laya_status` y `laya_predict` (subconjunto del MCP oficial de
  Laya, que aquí no se puede instalar por torch).
- Registro: **`opencode.json`** → `mcp.servers.laya` (`type: local`).
- Evidencia: `opencode mcp list` → `✓ laya connected`; llamada real desde
  OpenCode clasificó un borrador en el cluster `warping`.
- Requiere Laya en marcha (`npx laya-system-one --port 8080`).

### Paso 3 — Laya en el navegador (spike) ✅

- Probado en **Chromium headless** (Playwright), sirviendo el modelo por HTTP:
  `Laya.load({ modelDir, wasmBase })` + `predict()`.
- Medido: **carga ~15,7 s**, **decisión ~7 s**, respuesta correcta.
- No integrado en la app todavía.

---

## 3 · Arquitectura decidida

1. **Contenido y monetización (WSL2/CI):** Laya local decide/enruta/valora
   borradores y temas. Coste cero para el visitante.
2. **Clasificador en vivo → Laya en un VPS (API).** Decidido (2026-10-16): el
   veredicto del panel lo dará **Laya alojado en un VPS barato** en modo API, con
   el **Worker de Cloudflare del repo** delante (oculta la clave, añade CORS y
   permite cambiar de upstream sin tocar el cliente). El visitante nunca habla
   con el VPS. Mientras no exista el VPS, producción sigue en **demo/Jev**.
3. **Navegador (opcional, propuesta):** cargar Laya **bajo demanda**, nunca al
   abrir la página.

### Propuesta para el paso 3 en la app (*no construido*)

- Cargar el modelo **sólo cuando el usuario analiza un archivo** (no en el
  arranque), en un **Web Worker**, con barra de progreso y `Cache API`.
- Fuente del modelo: **HF/CDN** (no el repo). Caché agresiva.
- **Fallback**: si no hay WebGPU ni caché, usar Jev/heurística.
- No meter nada de esto en el bundle inicial (Core Web Vitals = AdSense).

---

## 4 · Qué NO está decidido

- De dónde sale el `model.onnx` en producción (HF vs CDN propio vs modelo
  reducido).
- Proveedor y tamaño del VPS (RAM: el modelo son 324 MB INT8; ≥2 GB es una
  estimación, no medida).
- Fine-tuning de Laya con datos propios (el repo tiene el pipeline de contenido
  como fuente de datos etiquetados).

### VPS — piezas a construir cuando haya servidor

- **`worker/src/index.ts`**: cambiar el upstream a la URL del VPS y **envolver**
  la respuesta de Laya en `{ data: { answers } }` (la lógica ya está en
  `scripts/laya/classify-adapter.mjs`).
- **VPS**: `laya-system-one` con `--api-key` y descarga por inactividad
  (`LAYA_IDLE_UNLOAD_SECONDS`), más `Dockerfile`/unidad `systemd`.
- **Cliente**: casi nada (`JevService` ya manda el payload correcto a `/classify`).
- **Privacidad**: el análisis pasaría a un servidor propio; matizar la cláusula.

---

## 5 · Próximos pasos

1. Cerrar el spike en un artefacto reproducible (o documentarlo y borrarlo).
2. Decidir la fuente del modelo en producción y medir con WebGPU.
3. Si se integra en la app: módulo perezoso + Worker + progreso + fallback, con
   pruebas.
4. Escribir aquí los resultados y actualizar el estado de cada paso.

---

## 6 · Referencias

- Modelo: `https://huggingface.co/convaiinnovations/laya`
- Paquete npm: `https://www.npmjs.com/package/laya-system-one`
- Repo de Laya: `https://github.com/NandhaKishorM/laya` (docs `cli-mcp.md`, `http-api.md`)
- Docs de OpenCode v2 (MCP): `https://opencode.ai/v2/docs/mcp-servers`
