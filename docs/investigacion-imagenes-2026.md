# Generación de imágenes propias para wiiki-3d.com (Vite 8 + React 19, GitHub Pages)

**Investigación fechada en octubre de 2026.** Lo que no he podido verificar se declara en la última sección.

---

## 1. Skills/plugins de generación de imágenes para agentes de código

### 1.1 Nano Banana y su v2

Nano Banana es el nombre popular de la familia `gemini-*-flash-image`. Estado real en 2026: **`gemini-3-pro-image-preview` (Nano Banana Pro) fue apagado por Google el 9 de marzo de 2026**; el modelo vivo es `gemini-3.1-flash-image-preview` ("Nano Banana 2"), con `gemini-2.5-flash-image` como opción económica. Es la conclusión de un [survey de repos de skills](https://github.com/MohamedAbdallah-14/prompt-to-asset/blob/main/docs/research/34-installable-skills-survey/nano-banana-skills.md) que verificó los model IDs en el código. Consecuencia: **cinco de los seis repos más populares están parcial o totalmente rotos**.

| Skill | Instalación | Edición con entrada | ¿Fuera de Claude Code? |
|---|---|---|---|
| [AgriciDaniel/banana-claude](https://github.com/AgriciDaniel/banana-claude) | `/plugin marketplace add AgriciDaniel/banana-claude` | **Sí** (`/banana edit`) | Sí, Python stdlib |
| [shinpr/mcp-image](https://github.com/shinpr/mcp-image) | `claude mcp add mcp-image --env GEMINI_API_KEY=... -- npx -y mcp-image` | **Sí** (`inputImagePath`) | **Sí: es MCP** |
| [runapi-ai/nano-banana](https://github.com/runapi-ai/nano-banana) | `npx skills add runapi-ai/nano-banana -g` | Sí (variante `edit`) | Sí, "50+ agentes" |
| [kingbootoshi/nano-banana-2-skill](https://github.com/kingbootoshi/nano-banana-2-skill) | `git clone` + `bun install` + `bun link` | **Sí**, multi-ref `--ref` | Sí, es CLI |

**Respuesta directa:** sí funciona fuera de OpenCode (vía MCP o CLI), sí acepta edición, y la v2 es `gemini-3.1-flash-image-preview`. La pega es el coste: **~$0.039-0.067/imagen**; según ese survey, **Google retiró la generación de imágenes del tier gratuito de la API en diciembre de 2025** (dato de terceros).

### 1.2 Cloudflare Workers AI vía MCP — la opción que mejor encaja

Catálogo de imagen según la [página oficial de precios](https://developers.cloudflare.com/workers-ai/platform/pricing/) (9 de octubre de 2026):

| Modelo | Precio | Entrada de imagen |
|---|---|---|
| `flux-1-schnell` | $0.0000528/tile + $0.0001056/step | No |
| `flux-2-dev` | $0.00021/tile entrada·step + $0.00041/tile salida·step | **Sí, hasta 4** |
| `flux-2-klein-4b` | $0.000059 input / $0.000287 output por tile | Sí |
| `flux-2-klein-9b` | $0.015 primer MP + $0.002/MP extra + $0.002/MP entrada | Sí |
| `leonardo/lucid-origin`, `phoenix-1.0` | ~$0.006-0.007/tile + steps | No |

El modelo clave es **FLUX.2 [dev]**, lanzado el 25 de noviembre de 2025 ([changelog oficial](https://developers.cloudflare.com/changelog/post/2025-11-25-flux-2-dev-workers-ai/)). Acepta **4 imágenes de entrada de 512×512** y el prompt puede referirse a ellas por índice ("aplica el estilo de la imagen 0"). Soporta **JSON prompting con `color_palette` de exactamente 3 colores** más `style` y `seed`: justo lo que necesitas para bloquear tu paleta. Es más lento que el resto del catálogo y exige `multipart/form-data` aun sin imágenes.

**Cuota gratuita: 10.000 Neurons/día**, a $0.011 por 1.000 después. Con flux-1-schnell (4,8 neurons/tile + 9,6/step), una imagen 1024×1024 con 4 steps ≈ 58 neurons → **unas 170 imágenes/día gratis** (extrapolación mía).

**MCP:** [dotlab-hq/cloudflare-image-mcp](https://github.com/dotlab-hq/cloudflare-image-mcp) despliega un Worker que expone API compatible con OpenAI (`/v1/images/generations` y `/v1/images/edits`) **y** servidor MCP por HTTP/SSE, con las tools `list_models`, `describe_model` y `run_model`. Se conecta con `claude mcp add cloudflare-image https://tu-worker.workers.dev/mcp`. La API key vive en el Worker, nunca en el bundle: **encaja con tu repo público**.

### 1.3 Alternativas comerciales

| Proveedor | Precio/imagen | Edición | Paleta fijable |
|---|---|---|---|
| **Recraft** V4.1 / V4 Styles ([pricing](https://www.recraft.ai/docs/api-reference/pricing)) | Flash **$0.007**, raster $0.035, **vector $0.05-0.08**, pro 2K $0.21 | Sí (i2i $0.04) | **Sí, explícita**: style reference, +$0.005/request |
| OpenAI `gpt-image-2` ([Lumenfall](https://lumenfall.ai/models/openai/gpt-image-2), abr-2026) | low ~$0.006, medium ~$0.041-0.053, **high ~$0.165-0.211** | **Sí, hasta 10 imágenes** | Indirecta. **Sin alpha** |
| Vertex AI / Imagen 4 Fast | ~$0.02 (terceros) | Sí | Indirecta |
| Ideogram / Stability / fal.ai / Replicate | **No verificado** (páginas JS sin renderizar) | Sí | Indirecta |

Dato relevante para tu restricción editorial: los únicos modelos que renderizan texto de forma fiable son **`gpt-image-1`, Ideogram 3 Turbo y Nano Banana Pro** ([research de pipeline de assets](https://github.com/MohamedAbdallah-14/prompt-to-asset/blob/main/docs/research/18-asset-pipeline-tools/18d-image-processing-libraries.md)). Es decir, **no necesitas los modelos caros**: tu requisito de "sin texto" te permite usar los baratos, que fallan el texto de forma predecible.

### 1.4 Skills comunitarias

**Ninguna de las dos colecciones principales genera imágenes.** [vercel-labs/agent-skills](https://github.com/vercel-labs/agent-skills) (`npx skills add vercel-labs/agent-skills`) aporta `web-design-guidelines`, con una categoría "Images" (dimensiones, lazy loading, alt text). [addyosmani/web-quality-skills](https://github.com/addyosmani/web-quality-skills) (`npx skills add addyosmani/web-quality-skills`) aporta `performance` y `core-web-vitals`: útil para el punto 4, con presupuestos de <500 KB above-the-fold, LCP ≤2,5 s y CLS ≤0,1.

---

## 2. Identidad visual consistente

**a) Style reference.** Recraft es el único proveedor comercial con esto como primitiva de primera clase: creas un estilo ($0.005) y lo reutilizas (+$0.005/request). Genera además **vectores SVG nativos** desde $0.05 y tiene `vectorize` a $0.01 — relevante porque tu estilo "flat, líneas limpias" es lo que el vectorial hace bien y ya tienes 2 SVG a mano.

**b) Multi-referencia con imagen semilla propia — la vía recomendada.** FLUX.2 [dev] acepta 4 referencias de 512×512: generas **una imagen semilla aceptable**, la guardas en el repo y la pasas como `input_image_0` en todas las generaciones siguientes. Con `color_palette` de 3 colores y `seed` fijo, la consistencia sale por **~$0**.

**c) Prompt-as-spec (complemento obligatorio de b).** El survey documenta palabras que degradan la salida — "8K", "masterpiece", "ultra-realistic", "high resolution" — y recomienda anclas de contexto en su lugar. Y un fichero de estilo versionado (paleta hex + geometría + descripción de línea) inyectado siempre.

**d) LoRA propia — no realista aquí.** Requiere 15-30 imágenes de entrenamiento, GPU o servicio de fine-tuning, y Workers AI solo expone LoRA para modelos concretos ([docs](https://developers.cloudflare.com/workers-ai/features/fine-tunes/loras/)). Con estilo flat y sin texto, el espacio de variación es tan pequeño que (b)+(c) basta. **Realista para ti: (b) + (c), coste ≈ $0.**

---

## 3. Conversión a WebP en WSL/Ubuntu

**Usa `sharp`.** Datos verificados del [research de librerías de imagen](https://github.com/MohamedAbdallah-14/prompt-to-asset/blob/main/docs/research/18-asset-pipeline-tools/18d-image-processing-libraries.md) (2026-04-21):

- **`squoosh-cli` está abandonado** (`@squoosh/lib` y `@squoosh/cli`), el CLI se eliminó del repo y **falla en Node 20**. No lo uses.
- **sharp: 64,42 ops/s** en resize JPEG 2725×2225 → 720×588 con ~50 MB de pico. **jimp: 2,40 ops/s con ~800 MB** (27× más lento). **ImageMagick 7: ~7,7× más lento y ~16× más memoria** (1,5 GB vs 94 MB).
- `cwebp` (libwebp) sigue siendo válido en Ubuntu, pero sharp hace resize + formato + metadatos en un paso.

**Lossless vs lossy — la decisión crítica.** En arte de línea sobre fondo plano `#0f1115`, WebP con pérdida introduce *ringing* y halos alrededor de bordes de alto contraste: exactamente las aristas de tus diagramas.

| Tipo | Modo | Ajustes |
|---|---|---|
| Diagramas, iconos | **Lossless** | `webp({ lossless: true, effort: 6 })` — preserva bordes y alpha bit a bit |
| Portadas planas | Lossy | `quality: 82-88`, `smartSubsample: true`, `effort: 5-6` |
| Portadas con degradado | Lossy | `quality: 88-92`; por debajo de 85 aparecen bandas en zonas oscuras |

Regla práctica: **prueba lossless primero**. Si el diagrama pesa <150 KB, quédate con lossless y elimina toda la clase de problemas de artefactos; baja a lossy solo si el peso es prohibitivo. **Ganancia real:** WebP lossy sobre PNG de diagramas, **60-80% menos**; WebP lossless sobre PNG optimizado, **20-35% menos**. En tu caso la ganancia *sin riesgo visual* es la de lossless.

**¿AVIF?** Según [modpagespeed (junio 2026)](https://modpagespeed.com/blog/avif-vs-webp-2026/), AVIF es **20-30% más pequeño que WebP a calidad equivalente** en fotografía y, al soportar 10-12 bits, **reduce el banding en zonas planas**. Soporte ~93-94% (WebP ~97%). Pega: **codificar AVIF es ~10× más lento**. Recomendación: **AVIF solo para portadas** y **WebP lossless para diagramas** (AVIF no aporta ahí y puede dañar líneas finas).

---

## 4. Integración en Vite

### `public/` vs importadas → **importadas**

Con GitHub Pages **no hay negociación de contenido por `Accept`** (no hay servidor), así que `<picture>` no es opcional: es la única forma de servir formatos alternativos. Las imágenes importadas desde `src/assets/` ganan hash de cache-busting, optimización en build, srcset automático y detección de huérfanos (el build falla si falta el fichero). `public/` solo para favicon y og:image, que necesitan URL estable.

### `vite-imagetools`

Es la pieza correcta: transforma en compile-time con sharp y genera srcset con directivas en el import ([README](https://github.com/JonasKruckenberg/imagetools/blob/main/packages/vite/README.md)):

```ts
import srcWebp from './assets/warping.png?w=720;1440&format=webp&lossless&as=srcset'
```

Detalles verificados de la doc: las transformaciones usan sharp; `exclude` por defecto es `public/**/*`; `removeMetadata` es `true` por defecto; formatos incluidos por defecto `heif|avif|jpeg|jpg|png|tiff|webp|gif`.

### `srcset`, `sizes`, dimensiones

Tu restricción de 45-75 caracteres fija el ancho real de columna. A ~8 px/carácter con 16 px de fuente, **75 caracteres ≈ 600 px y el rango cómodo queda en ~680-720 px de contenido**, que es el ancho renderizado de un diagrama a todo el ancho de columna:

```tsx
const SIZES = '(max-width: 760px) 100vw, 720px';
<picture>
  <source type="image/avif" srcSet={avif} sizes={SIZES} />
  <source type="image/webp" srcSet={webp} sizes={SIZES} />
  <img src={png} width={1440} height={960} sizes={SIZES}
       loading="lazy" decoding="async" alt="Diagrama del warping en la primera capa"
       style={{ aspectRatio: '1440 / 960', maxWidth: '100%', height: 'auto' }} />
</picture>
```

`width`/`height` + `aspect-ratio` eliminan el CLS; `sizes` evita que el navegador descargue el 1440 cuando basta el 720. `loading="lazy"` es correcto para diagramas bajo el pliegue; **para la portada del artículo, que suele ser el LCP, no la pongas lazy** y añade `fetchpriority="high"`.

### Qué NO añadir al build

**`unplugin-imagemin` y `vite-plugin-image-optimizer` minifican lo que ya está en `dist/`**, es decir *después* de Vite: no generan variantes ni srcset, y añaden peso. Un script propio con sharp tampoco va en el build: va en el **repo**, para normalizar lo que produce la IA. **Recomendación:** `vite-imagetools` (que ya trae sharp) + `scripts/prepare-image.mjs` invocado al añadir una imagen nueva. Nada más.

---

## 5. Plan concreto

**Cadena de generación:** Cloudflare Workers AI con **FLUX.2 [dev]** como primario y **flux-1-schnell** para borradores: cuota gratuita, 4 referencias de entrada para consistencia, `color_palette` de 3 colores, `seed`, y credencial fuera del bundle. Plan B con presupuesto: **Recraft** para portadas (único style reference bloqueable y verificable del mercado, más salida vectorial).

### Identidad congelada y sidecar de prompts

Crea `assets/style/identity.json` con la paleta (`#0f1115`, `#161a20`, `#2563eb`, `#60a5fa`, `#e8ecf1`), la geometría (`flat`, `no gradients`, `clean 2px strokes`, `dark theme`), las palabras prohibidas y la cláusula negativa (`no text, no letters, no numbers, no labels, no watermarks`). Genera **una semilla aceptable por tipo** (diagrama, portada, icono) en `assets/style/seed-*.png` a 512×512: desde ahí, **toda** generación la pasa como `input_image_0` con `seed` fijo. Y por cada imagen, un sidecar `content/images/<slug>.json` escrito **antes** de generar:

```json
{ "slug": "warping-primera-capa", "kind": "diagram",
  "prompt": "flat technical diagram, dark background #0f1115, strokes #60a5fa, accent #2563eb, clean orthogonal lines, no text",
  "color_palette": ["#0f1115", "#60a5fa", "#2563eb"],
  "model": "@cf/black-forest-labs/flux-2-dev", "seed": 41827,
  "reference": "assets/style/seed-diagram.png", "generated_at": "2026-10-12",
  "editorial_note": "ilustra, no es fuente; sin cifras técnicas",
  "output": { "width": 1440, "height": 960, "role": "article-inline", "lcp": false } }
```

Sin sidecar, en seis meses no sabrás por qué una imagen parece distinta.

### Verificación de "sin texto" y de la columna de lectura

Con **Playwright** (ya instalado) y **`tesseract.js`** en Node:
- **Texto:** OCR sobre el PNG renderizado; **falla si detecta más de 4 caracteres alfanuméricos**. Es la única comprobación real de "no hay texto". Complementa con un check de histograma: más de 12 colores dominantes fuera de tolerancia de paleta indica artefactos de "texto borroso".
- **Columna:** abre la ruta del artículo y mide `document.querySelector('p').getBoundingClientRect().width`; **falla si supera 780 px** (≈78 caracteres) o baja de 600 px (≈60). Comprueba también que el ancho de la imagen ≤ ancho de párrafo y que el `width` del sidecar es `renderWidth × 2` con `renderWidth ≤ 720`.
- **CLS y peso:** falla si alguna `<img>` carece de `width` y `height`, si un diagrama supera 150 KB o si una portada supera 250 KB.

Los cinco pasos ejecutables están en el apartado **(b)** al final.

---

## (a) Tabla resumen

| Herramienta | Qué aporta | Coste | ¿Acepta edición? | Encaje |
|---|---|---|---|---|
| **Cloudflare Workers AI – FLUX.2 [dev]** | 4 refs de entrada, `color_palette` de 3 colores, `seed`, credencial fuera del bundle, MCP listo | **10.000 neurons/día gratis**; $0.011/1.000 después | **Sí**, hasta 4 refs 512×512 | **Alto** |
| Cloudflare – flux-1-schnell | Text-to-image baratísimo para borradores | ~58 neurons/img → gratis de facto | No | Alto (borrador) |
| Cloudflare – flux-2-klein-9b | Edición con entrada, precio por MP | $0.015 1er MP + $0.002/MP extra | Sí | Medio-alto |
| **Recraft V4.1 / V4 Styles** | **Style reference bloqueable**, **vector SVG nativo**, vectorize | $0.007 Flash / $0.035 raster / $0.05-0.08 vector / +$0.005 por style | Sí (i2i $0.04) | **Alto** (portadas; iguala tus SVG) |
| Nano Banana 2 | Alta calidad, multi-ref, ecosistema de skills maduro | ~$0.039-0.067/img; **sin free tier programático** | Sí (`--ref`, `inputImagePath`) | Medio (coste) |
| Nano Banana **Pro** | — | — | — | **Nulo: apagado 9-mar-2026** |
| OpenAI `gpt-image-2` | Máxima calidad, 10 entradas, hasta 4K | high ~$0.165-0.211; medium ~$0.041-0.053 | Sí | Bajo (caro, sin alpha) |
| Ideogram / Stability / fal.ai / Replicate | Alternativas generalistas | **No verificado** | Sí | Bajo |
| Vertex AI Imagen 4 Fast | Integración GCP | ~$0.02/img | Sí | Bajo |
| `sharp` | WebP/AVIF, resize, flatten, strip metadata | Gratis (Apache-2.0) | n/a | **Alto** |
| `cwebp` | Encoder libwebp puro | Gratis | n/a | Medio |
| ImageMagick | Fallback para formatos exóticos | Gratis | n/a | Bajo (7,7× más lento, 16× memoria) |
| `squoosh-cli` | — | — | — | **Nulo: abandonado, falla en Node 20** |
| `vite-imagetools` | srcset + formatos en build, usa sharp | Gratis (MIT) | n/a | **Alto** |
| `unplugin-imagemin` | Minifica `dist/` post-build | Gratis | n/a | **Bajo: capa equivocada** |
| Skills `vercel-labs/agent-skills` | `web-design-guidelines` (categoría Images) | Gratis | n/a | Medio |
| Skills `addyosmani/web-quality-skills` | `performance`, `core-web-vitals` | Gratis | n/a | Medio-alto |

## (b) Recomendación en 5 pasos

1. **Aprovisiona (30 min).** Despliega [cloudflare-image-mcp](https://github.com/dotlab-hq/cloudflare-image-mcp) con `CLOUDFLARE_ACCOUNT_ID` y `CLOUDFLARE_API_TOKEN` como *secrets del Worker* (nunca en el repo) y regístralo con `claude mcp add cloudflare-image https://tu-worker.workers.dev/mcp`. Verifica con `list_models` que ves `flux-2-dev` y `flux-1-schnell`. Añade `.dev.vars` y `.env` a `.gitignore`.
2. **Genera con FLUX.2 [dev]**, usando `flux-1-schnell` para explorar composición y FLUX.2 [dev] para las definitivas. Coste real: **$0** dentro de los 10.000 neurons/día. Bloquea el estilo con las semillas propias de `assets/style/seed-*.png` como `input_image_0`, más `color_palette` de 3 colores y `seed` fijo de `identity.json`.
3. **Convierte con `sharp` en `scripts/prepare-image.mjs`**, fuera del build de Vite: recorta al ratio del sidecar con `.flatten({ background: '#0f1115' })`, exporta a 720 y 1440 px de ancho, **WebP lossless (`effort: 6`) para diagramas e iconos** (si supera 200 KB, reintenta `quality: 90` con `smartSubsample` y avisa), **AVIF `quality: 60` + WebP `quality: 86` + PNG para portadas**, y `.withMetadata(false)` siempre. Salida en `src/assets/images/` (importadas, con hash) y original en `assets/raw/`. Nombrado `<kind>-<slug>-<width>.<ext>`.
4. **Sirve desde las imágenes importadas**, con `vite-imagetools` para los srcset y `<picture>` AVIF→WebP→PNG: `sizes="(max-width: 760px) 100vw, 720px"`, `width`/`height` explícitos + `aspect-ratio`, `loading="lazy"` salvo en la portada del artículo (`fetchpriority="high"`). **No añadas `unplugin-imagemin`.**
5. **Verifica en CI con Playwright + OCR** según el punto 5: falla si el OCR detecta texto, si el ancho de columna medido sale de 600-780 px, si falta `width`/`height` en alguna `<img>` o si un diagrama supera 150 KB. Cada imagen lleva su sidecar `.json` con prompt, seed, referencia, modelo y fecha.

## Lo que NO he podido verificar

- **Precios de Ideogram**: la página de API pricing no renderizó la tabla (contenido tras JS).
- **Precios de Stability AI**: [platform.stability.ai/pricing](https://platform.stability.ai/pricing) devolvió una página vacía (SPA sin SSR).
- **Precios por imagen de fal.ai y Replicate**: no encontré página oficial comparativa; depende del modelo subyacente.
- **La retirada del free tier de Gemini (dic-2025)** y **el apagado del 9-mar-2026** provienen de un survey de terceros, no de una página oficial de Google que haya podido abrir.
- **Calidad cualitativa de cada modelo en "flat design oscuro"**: juicio subjetivo no verificable con fuentes. Requiere que generes 5-10 pruebas comparativas con tu semilla y tu paleta antes de comprometerte.
- **El número exacto de imágenes gratis/día en Workers AI**: mis ~170 img/día son extrapolación aritmética de la tabla oficial de tarifas, no una cifra publicada por Cloudflare.
