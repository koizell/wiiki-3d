# Plan para que wiiki-3d pase la revisión de AdSense (y atraiga lectores)

> Fase 0 actualizada: auditoría del sitio publicado, del repositorio y del material
> editorial, con investigación externa de las políticas vigentes en 2026.
> Fecha: **2026-10-11**. Rama auditada: `dev`, HEAD `87be4c1`.
> Investigaciones de apoyo: [AdSense 2026](investigacion-adsense-2026.md) ·
> [benchmark de mercado](investigacion-benchmark-2026.md) ·
> [Search Console y GA4](investigacion-gsc-ga4-2026.md).

> **Actualización · 2026-10-16.** El trabajo de `dev` está desplegado y la fase 3, en
> marcha. La ficha lleva un **rechazo del
> 16-sep-2026** («Contenido de poco valor»): **no se borra ni se vuelve a añadir** —se
> corrige sobre la misma ficha y se espera la fecha del Policy center—. Propiedad
> verificada, pagos completos, `ads.txt` correcto y CMP de Google elegida; el detalle
> técnico está en `docs/medicion-setup.md`.

---

## El diagnóstico en una frase

**No se puede pedir AdSense hoy, y no por el contenido: porque el sitio publicado no
es este sitio.** Lo que hay en `wiiki-3d.com` es un despliegue del 2 de octubre con el
`<div id="root">` vacío y **todas las rutas internas en 404**; el trabajo real —9
guías, 11.614 palabras, HTML sin JavaScript— sólo existe en la rama `dev` y en `dist/`
de esta máquina. Cualquier solicitud enviada ahora se revisa sobre una página en
blanco, y un rechazo por eso se paga con semanas de espera.

Lo segundo, ya sobre el contenido: **el sitio real está a una capa de profundidad de
ser aprobable, no a dos.** Las guías son buenas de verdad —procedimiento, fuentes,
contradicciones declaradas— y fallan en tres cosas concretas: no tienen autor ni
fecha, no tienen una sola imagen propia, y una de sus cuatro etapas sale vacía en el
HTML estático.

---

## 1 · Estado verificado

Todo lo de esta sección está medido sobre el árbol de trabajo o sobre HTTP, no
recordado. Los comandos que lo reproducen están al final de cada tabla.

### 1.1 El sitio publicado

| URL | Respuesta | Evidencia |
|---|---|---|
| `/` | 200, 922 bytes, `lang="en"`, `<div id="root"></div>` vacío | `curl -sI https://wiiki-3d.com/` |
| `/wiki/`, `/wiki/warping-pla/`, `/taller/`, `/privacidad/`, `/contacto/`, `/acerca-de/` | **404** (9.379 bytes: la página 404 de GitHub) | sonda HTTP del 2026-10-11 |
| `/sitemap.xml`, `/ads.txt` | **404** | ídem |
| `/robots.txt` | 200, con la línea del sitemap **comentada** (`# Sitemap: …`) | ídem |
| `/CNAME` | 200, `wiiki-3d.com` | ídem |

| Dato | Valor | Evidencia |
|---|---|---|
| Rama desplegada | `main`, HEAD `9ec33f5` del **2026-10-02** | `git log -1 main` |
| Trabajo sin desplegar | **54 commits** en `dev` que no están en `main` | `git rev-list --count main..dev` |
| Hosting | **GitHub Pages** (`server: GitHub.com`, `x-served-by: cache-…`, IPs `185.199.108-111.153`) | cabeceras |
| Dominio | propio, `wiiki-3d.com`, HTTPS, `www` también responde | DNS + cabeceras |
| Registrador / DNS | **Name.com** (`ns1psw.name.com`), SPF `v=spf1 a mx ~all`, MX de Name.com, **sin DMARC** | DNS over HTTPS |
| Search Console | imposible de confirmar desde aquí; **no hay registro TXT de verificación** | ídem |

### 1.2 Lo que hay en `dev` (y no está publicado)

| Dato | Valor | Evidencia |
|---|---|---|
| Build | **verde** (`tsc -b && vite build && node scripts/export-static.mjs`) | `npm run build` |
| Exportación | 13 páginas de contenido + 4 herramientas; sitemap de 15 URLs | salida del build |
| Palabras publicables | **11.614** en 18 páginas HTML | `.local/contar.js` (temporal) |
| Guías | 9, entre **707 y 1.837** palabras, media 1.196 | ídem |
| Fuentes | **44 enlaces de salida** a fichas y foros de Prusa, Bambu y OrcaSlicer | `.local/salientes.js` |
| HTML sin JavaScript | sí: las guías se leen enteras sin ejecutar JS, con `noscript` que lo explica | lectura de `dist/wiki/*/index.html` |
| Metadatos | `canonical` + `og:` + `twitter:` + `robots` por ruta; JSON-LD `HowTo` en las 9 guías | ídem |
| Material cocinado sin publicar | `wiki/cooked/` tiene **~74.000 palabras**; los artículos publican ~11.600 | `wc -w wiki/cooked/*.md` |
| Imágenes | **0** `<img>` en todo el sitio (sólo SVG de interfaz) | auditoría de `dist` |

### 1.3 Medición de contenido, página a página

| Página | Palabras | Salientes | Tarjetas | Acciones |
|---|---:|---:|---:|---:|
| `/wiki/adhesion-primera-capa/` | 1.837 | 8 | 7 | **2** |
| `/wiki/voladizos-y-soportes/` | 1.753 | 3 | 11 | **0** |
| `/wiki/warping-pla/` | 1.089 | 5 | 4 | **0** |
| `/wiki/temperatura-cama/` | 1.069 | 6 | 4 | **0** |
| `/wiki/enclosure-y-warping/` | 1.015 | 5 | 4 | **0** |
| `/wiki/altura-capa/` | 954 | 4 | 6 | **0** |
| `/wiki/separaciones-entre-capas/` | 922 | 5 | 4 | **0** |
| `/wiki/material/` | 825 | 4 | 5 | **0** |
| `/wiki/temperatura-hotend/` | **707** | 5 | 3 | **0** |
| `/wiki/` (índice) | 419 | 0 | — | — |
| `/privacidad/` | 451 | 3 | — | — |
| `/acerca-de/` | 297 | 0 | — | — |
| `/contacto/` | 100 | 0 | — | — |
| **`/` (home)** | **44** | 0 | — | — |
| `/taller/` | **49** | 0 | — | — |
| `/proyectos/` | **40** | 0 | — | — |
| `/historial/` | **37** | 0 | — | — |

La columna «Acciones» es la etapa 4 de cada guía, «Qué cambiar». **En 8 de 9 guías vale
cero**: las acciones salen de `reglasQueSalen(guia, elegidas)`, y sin variables
marcadas el array viene vacío, así que el HTML estático imprime «Con lo declarado
hasta ahora no sale ninguna acción». La única excepción es la guía que tiene reglas sin
condición.

### 1.4 Señales de autoría, frescura y legalidad

| Qué | Estado | Por qué importa |
|---|---|---|
| Autor visible | **No existe** en ninguna página | Es la carencia nº 1 del nicho en español y lo que miran los evaluadores de calidad |
| Fecha de publicación o de actualización | **No existe**; tampoco `datePublished`/`dateModified` en el JSON-LD | Frescura y confianza; el propio `seo.ts` explica que no se inventa la fecha —correcto— pero la solución es declararla, no omitirla |
| `lastmod` en `sitemap.xml` | 0 apariciones | Señal de frescura regalada |
| JSON-LD en home y en páginas de información | **ninguno**: sólo las 9 guías llevan `HowTo` | Falta `WebSite`, `Organization`/`Person`, `BreadcrumbList` |
| Política de privacidad | 451 palabras, honesta y bien escrita, pero **sin**: cláusula literal de cookies de terceros, enlace a «How Google uses data», base legal, derechos RGPD, plazos de conservación, transferencias internacionales, CMP | La política de privacidad **sí** es requisito de política de AdSense, y es lo único que Google exige explícitamente además del contenido |
| `ads.txt` | no existe | Recomendado, no obligatorio |
| Script de AdSense | no existe | El código va entre `<head>` y `</head>` |
| CMP certificada | no existe | Obligatoria para anuncios personalizados en EEE/UK (desde 2024-01-16) y Suiza (2024-07-31) |
| Analítica | **ninguna**, ni cookies ni sin cookies | Sin datos no se puede decidir nada |
| Banner de cookies | no existe | Correcto hoy: sin cookies no hace falta |
| DMARC | no existe | Entregabilidad del correo de contacto y confianza |
| `noindex` | `/historial` y `/proyectos` lo llevan a propósito; `/taller` sale en el sitemap | Coherente, pero deja tres páginas casi vacías indexables o marcadas |

### 1.5 Diseño, movimiento y accesibilidad (medido en navegador)

| Qué | Medición | Veredicto |
|---|---|---|
| Consola del navegador | **0 errores** en las 8 rutas × 2 viewports | Limpio |
| Ancho de línea, guías | 73–80 caracteres a 1440 px | Dentro de lo legible |
| Ancho de línea, home | 77 caracteres | Bien |
| Ancho de línea, `/privacidad`, `/contacto`, `/acerca-de` | **87 caracteres** (692 px) | **Fuera del rango 45–75**; el resto del sitio sí está acotado |
| Ancho de línea, `/wiki/` en escritorio | 36 caracteres | Corto (documentado como decisión en `docs/estado.md`) |
| Movimiento | 12 `@keyframes`, entrada por filas/tarjetas/chips con `cubic-bezier(0.22,0.7,0.3,1)`, y **4 bloques `prefers-reduced-motion: reduce`** que lo apagan | Es lo mejor del sitio y no se toca |
| Táctil | 1–4 elementos por página por debajo de 24 px | Marginal |
| Scripts externos | **ninguno**: sólo el bundle propio | Ideal para la revisión, y hay que mantenerlo |
| `iframe`s y anuncios | cero | Ídem |

### 1.6 Alcance: `/` es una aplicación, no una página de inicio

`index.html` no define metadatos de la home; los escribe `export-static.mjs` con un
bloque de tres frases, y **el resto de la home nace en JavaScript**. Un revisor que
cargue `wiiki-3d.com` sin ejecutar JS —o Googlebot en su primera pasada— ve una página
que dice, en esencia, «esta herramienta necesita JavaScript». Es exactamente el patrón
«pantalla sin contenido del editor» de la política
[*Google-served ads on screens without publisher-content*](https://support.google.com/publisherpolicies/answer/11112688).

Las 9 guías, en cambio, están exportadas enteras y ese trabajo no hay que rehacerlo.

---

## 2 · Qué dice la política aplicable (2026)

Resumen de [`docs/investigacion-adsense-2026.md`](investigacion-adsense-2026.md), que
cita texto literal de las políticas con la fecha de última actualización de cada
documento. Las cinco conclusiones que ordenan el plan:

1. **«Low value content» oficial es estrecho** —«texto ininteligible o de relleno»— pero
   el rechazo se aplica como paraguas de calidad global. La política que sí lo concreta
   es [*screens without publisher-content*](https://support.google.com/publisherpolicies/answer/11112688):
   prohíbe anuncios en pantallas «under construction», «without publisher-content or
   with low-value content», páginas de «gracias, salida o error» y **contenido generado
   automáticamente sin revisión ni curación humanas**.
2. **No existe ningún umbral numérico oficial**: ni de palabras, ni de artículos, ni de
   antigüedad de dominio. Lo que pide es «suficiente contenido único para determinar de
   qué va tu sitio» y ampliar o consolidar páginas flojas. El objetivo de 800 palabras
   del plan de contenido es del proyecto, no de Google.
3. **`ads.txt` no es obligatorio** («not mandatory, but highly recommended»). **About y
   Contact no son requisito de política.** Lo único exigible es la **política de
   privacidad**, y con cláusulas concretas: divulgación de cookies de terceros, web
   beacons, IP y el uso de esos datos.
4. **El requisito de consentimiento es la CMP certificada**, no Consent Mode (que para
   editores es opcional). Y hay fecha dura: **TCF v2.3 desde el 28 de febrero de 2026**;
   incumplirla degrada la petición a *limited ads* o la descarta.
5. **Los reintentos no tienen límite publicado**: existe un *cooldown* dinámico con
   fecha visible en el Policy center, y **borrar y volver a añadir el sitio retrasa el
   proceso**. Conclusión operativa: no se solicita hasta que todo lo de la fase 3 esté
   hecho y verificado en el sitio publicado.

Del benchmark, la conclusión que más afecta al contenido: **no existe un equivalente en
español de Ellis' Print Tuning Guide**, y las tres palancas que dan autoridad en el
nicho son *calculadora + datos de prueba propios + autor con credenciales*. El sitio ya
tiene la calculadora y el diagnóstico; le faltan las otras dos.

---

## 3 · El plan

Cinco fases. El orden no es negociable en las tres primeras: cada una produce el valor
que la siguiente necesita.

```
P0 desbloquear  ──►  P1 contenido con valor  ──►  P2 fundación técnica y legal
                                                        │
                       P4 crecer y retener  ◄──  P3 consentimiento y AdSense
```

### P0 · Desbloquear la publicación (prerequisito de todo)

| # | Tarea | Criterio de aceptación |
|---|---|---|
| 0.1 | **Llevar `dev` a `main`** (merge, no rebase ni reescritura) y esperar al workflow | El workflow de Pages termina en verde |
| 0.2 | Confirmar el dominio en **Settings → Pages** de GitHub | `wiiki-3d.com` sirve el build nuevo; la raíz ya no tiene el `root` vacío |
| 0.3 | **Descomentar** la línea `Sitemap:` de `public/robots.txt` | `curl https://wiiki-3d.com/robots.txt` muestra la directiva activa |
| 0.4 | Verificación HTTP de las 18 rutas | 200 en todas; `/wiki/warping-pla/` sirve su texto sin JS |
| 0.5 | Certificado y *Enforce HTTPS* | `https://wiiki-3d.com` sin aviso y `http` redirige |

**Decisión de método:** el `CNAME` de `public/` puede quedarse, pero conviene saber que
**con un workflow de Actions GitHub lo ignora** y el dominio vive en Settings → Pages.
Si algún día se publica desde rama, entonces sí tiene que existir en la raíz, en
mayúsculas y con un solo nombre.

**Trampa a evitar:** no tocar `wiki/raw/` (inmutable por diseño) y no dejar que el
merge arrastre el trabajo sin commitear: `PLAN.md`, `docs/ESTADO_ACTUAL.md` y
`docs/INFORME_FINAL.md` están sin trackear.

### P1 · Contenido: que cada pantalla tenga algo que contar

Aquí está el trabajo grande, y el que decide la aprobación. Cinco líneas, ordenadas por
relación valor/coste.

**P1.1 · Que la etapa 4 exista en el HTML estático.** Es el arreglo de mayor impacto y
menor coste. En 8 de 9 guías, un revisor ve «Con lo declarado hasta ahora no sale
ninguna acción». Tres salidas, y hay que elegir una:

| Opción | Qué implica | A favor | En contra |
|---|---|---|---|
| **A · Exportar la unión de reglas** | La exportación estática renderiza cada guía con las reglas que salen para cada valor de cada variable necesaria, o con la unión sin condiciones, marcadas como «ejemplo para tu montaje» | Da contenido real y sustancial en la etapa que es el producto; no cambia la guía interactiva | Hay que diseñar el render estático de reglas y su CSS. Es la única que resuelve el problema en vez de taparlo |
| **B · Añadir a cada guía un apartado estático «las acciones que casi siempre aplican»** | Prosa nueva con las 3–5 acciones del Tier 1 del fabricante, con su fuente | Barato | Duplica contenido que ya está en las reglas, y esa duplicación hay que mantenerla |
| **C · Dejar la etapa 4 sólo para JavaScript** | Nada | Cero coste | Deja 8 páginas cuyo bloque principal dice «no hay nada»; es una señal de poco valor casi literal |

**Recomendación: A**, con la verificación nueva que exige el repo —una comprobación que
falle si alguna guía exporta cero acciones—.

**P1.2 · Autoría y fechas.** Es la carencia que el benchmark señala como la mayor del
nicho en español y lo que un evaluador de calidad busca explícitamente.

- Añadir al contrato de `Guia` tres campos y declararlos en las 9 guías: `autor`
  (nombre, credenciales y URL de perfil), `actualizado` (fecha ISO) y `cambios`
  (opcional).
- Renderizarlos en `GuiaRoute` (bajo la cabecera y al pie) y **verificarlos**: si un
  campo existe en 9 ficheros y no lo pinta nadie, es exactamente el dato decorativo
  que este repo prohíbe —el episodio de `entrada` es el precedente y está documentado
  en [`PLAN.md`](../PLAN.md)—.
- `dateModified` y `author` en el JSON-LD `HowTo`; `BreadcrumbList` en las guías.
- **Crear `/autor/<nombre>/`** con bio, credenciales y qué se ha escrito: es lo que
  tienen All3DP y CNC Kitchen y lo que no tiene ningún sitio español del nicho.
- Ampliar `/acerca-de/` de 297 a ~600 palabras con el método de trabajo (las cuatro
  capas, la inmutabilidad de `wiki/raw/`, cómo se revisa una guía).

**P1.3 · La portada, que es la página que revisa el revisor.** `/` es hoy 44 palabras
estáticas. Propuesta, en el orden de lectura:

1. Titular y párrafo de qué es el sitio (ya existen en `Inicio.tsx`; hay que
   **exportarlos**, no reescribirlos).
2. **Una tabla de referencia propia y determinista**: temperatura de cama y de boquilla
   por material, con la fuente por fila. Es contenido único, útil, sin JavaScript y del
   tipo que captura *snippets*. Los datos ya están verificados en el material cocinado.
3. Cómo funciona el análisis (4 pasos).
4. Enlaces a las 9 guías y a `/taller/` (los enlaces internos también son contenido).
5. Preguntas frecuentes (4–6), con `FAQPage` en JSON-LD.

**P1.4 · Las tres páginas de herramienta.** `/taller/` (49), `/proyectos/` (40) y
`/historial/` (37) son hoy tres pantallas vacías:

- `/taller/`: página real de calculadora, con explicación de la fórmula, ejemplo
  numérico resuelto, de dónde salen los gramos, y aviso de lo que **no** calcula
  (electricidad, mano de obra). Es el activo con más potencial de enlaces del sitio.
- `/proyectos/` y `/historial/`: mantener `noindex`, retirar del sitemap, y darles
  contenido estático de ~250 palabras que explique qué hacen sin JS.
- Metadatos propios en las tres (`SEO_PAGINAS` ya los tiene; la exportación genérica
  de `export-static.mjs` los ignora, y eso hay que arreglarlo).

**P1.5 · Profundidad de las guías, con el material que ya existe.** No hay que
investigar de cero: `wiki/cooked/` tiene ~74.000 palabras y sólo se publican ~11.600.
El ciclo es el del repo, `recolector → cocinero → redactor → revisor`, por lotes de
dos o tres y **no el mismo día** (la razón está escrita en
[`docs/plan-de-contenido.md`](plan-de-contenido.md) y sigue siendo válida: nueve
artículos idénticos el mismo día se leen como producción en serie).

Orden propuesto por relación valor/coste, con la advertencia de que `wiki/raw/` no se
toca y todo pasa por el pipeline:

| Prioridad | Guía | Palabras hoy | Qué añadir |
|---|---:|---:|---|
| 1 | `temperatura-hotend` | 707 | Es la más corta. Tiene tabla oficial de boquilla por material (PLA 190–240 °C ±10) en `wiki/cooked/` y en el plan de contenido |
| 2 | `material` | 825 | Tabla de 26 filas de Bambu ya cocinada; orden de contracción |
| 3 | `separaciones-entre-capas` | 922 | 9.325 palabras cocinadas sin publicar; es el caso con más material por palabra publicada |
| 4 | `altura-capa` | 954 | Falta respaldo oficial de la regla de altura: es una laguna declarada, no un olvido |

**P1.6 · Imágenes propias: hoy hay cero.** El benchmark es unánime y Google lo dice en
su guía de contenido útil: la prueba de experiencia es material propio. Dos niveles, y
el segundo es el que de verdad puntúa:

- **Barato (hacer ya):** diagramas SVG por guía, con el prefijo de estilo que ya está
  definido en `AGENTS.md`, sin texto en la imagen, en `public/wiki/<slug>/` con su
  `.json` sidecar. El repo ya tiene el precedente de `warping-pla`.
- **El que puntúa (decidir):** **fotos propias de fallos reales** —esquinas levantadas,
  grietas entre capas, un voladizo colgando— con la impresora que uses. Son 10–20
  fotos, no 100, y son lo que ningún competidor español tiene.

### P2 · Fundación técnica, SEO y legal

| # | Tarea | Dónde | Criterio |
|---|---|---|---|
| 2.1 | `lastmod` en el sitemap y en el JSON-LD | `scripts/export-static.mjs`, `src/lib/seo.ts` | El sitemap lleva `lastmod` por URL |
| 2.2 | `WebSite` + `Organization`/`Person` en la home; `BreadcrumbList` en guías | `src/lib/seo.ts` | Validan sin errores |
| 2.3 | Metadatos propios para `/taller/` | `export-static.mjs` | `/taller/` deja de usar el título de la home |
| 2.4 | Acotar el ancho de línea de `.wiki-info` | `src/App.css` | `/privacidad/`, `/contacto/` y `/acerca-de/` bajan de 87 a ≤75 caracteres |
| 2.5 | **Política de privacidad de verdad** | `src/routes/InfoRoute.tsx` | Cláusula literal de cookies de terceros + enlace a [How Google uses data](https://www.google.com/policies/privacy/partners/) + responsable, base legal, derechos RGPD, conservación, transferencias, CMP |
| 2.6 | `/cookies/` propia, enlazada desde el pie | nueva | Existe y describe cada cookie cuando exista |
| 2.7 | DMARC | DNS de Name.com | `_dmarc` con política `p=none` y `rua`, y el correo de contacto probado con recepción real |
| 2.8 | **Search Console** por DNS (propiedad de dominio) | DNS + GSC | Verificada; sitemap enviado; 5 rutas inspeccionadas |
| 2.9 | Analítica **sin cookies** (Cloudflare Web Analytics o Plausible) | nueva | Mide el 100 % del tráfico y **no** necesita banner |
| 2.10 | Suite completa antes de cada despliegue | `npm run lint`, `build`, `verify:*` | Todo en verde sobre `dist` recién construido |

**Nota sobre 2.9, que es la decisión con más consecuencias:** empezar sin cookies
permite medir sin CMP y sin banner, y por tanto **no introduce riesgo en la revisión de
AdSense**. GA4 se añade después, con Consent Mode v2 en `denied` por defecto y CMP
certificada, cuando se active la publicidad. El coste de este orden es una migración
posterior; el beneficio es no pedir la revisión con una etiqueta de Google que puede
quedar mal configurada.

### P3 · Consentimiento y AdSense

Nada de esta fase se empieza antes de que P0, P1 y P2 estén en verde **en el sitio
publicado**.

| # | Tarea | Criterio de aceptación |
|---|---|---|
| 3.1 | Cuenta de AdSense y **verificación de propiedad** (snippet en `<head>`, meta `google-adsense-account` o Search Console) | Propiedad verificada, titular y datos de pago completos (sin ellos el sitio queda en «Getting ready» y no se revisa) |
| 3.2 | **`ads.txt`** en la raíz con `google.com, pub-XXXXXXXX, DIRECT, f08c47fec0942fa0` | Responde 200 y AdSense lo lee como *Authorized* |
| 3.3 | **CMP certificada** de la [lista oficial](https://support.google.com/adsense/answer/13554116), con **TCF v2.3** | El mensaje GDPR cubre EEE/UK/Suiza; la primera capa menciona literalmente la personalización de anuncios y tiene acción afirmativa |
| 3.4 | Consent Mode v2 con los cuatro parámetros, `denied` por defecto | Sin tocar el banner, ninguna cookie; al aceptar, pasa a `granted` sin recargar |
| 3.5 | **Mapa de anuncios** antes de colocar el primero | Ver la tabla de abajo |
| 3.6 | Solicitar la revisión | Sólo cuando 3.1–3.5 estén verificados en producción. **No borrar ni volver a añadir el sitio** si se rechaza: se corrige y se espera la fecha del Policy center |

**Estado · 2026-10-16.** 3.1 y 3.2 hechos y comprobados en producción (propiedad
verificada por meta, datos de pago completos, `ads.txt` servido con el `pub-` real).
En 3.3 se eligió la **CMP de Google**: está en la lista de certificadas y su mensaje
europeo soporta TCF v2.3; solo se muestra a visitantes del EEE, Reino Unido y Suiza.
La parte de sitio de 3.3–3.4 ya está desplegada: la etiqueta de AdSense (la que
entrega el aviso) y los cuatro parámetros de Consent Mode v2 en `denied`; con
*advanced mode* el aviso actualiza el consentimiento sin código adicional. **Falta
publicar el mensaje europeo en «Privacidad y mensajes»**. Fuera del EEE no hay aviso
y el estado sigue denegado (medición limitada); si más adelante se quiere medición
completa en Latinoamérica, la vía es un `default` por región. 3.6 queda para el
repaso final.

**Mapa de anuncios (3.5).** Las reglas de *site behavior* prohíben solapar navegación o
acciones, tapar contenido y confundirse con el menú. Y hay pantallas donde **no** se
debe anunciar nunca:

| Pantalla | Decisión | Motivo |
|---|---|---|
| `/historial/`, `/proyectos/` | **Sin anuncios** | Datos privados del visitante; no es contenido del editor |
| `/404` | **Sin anuncios** | Política explícita de «dead end» |
| `/privacidad/`, `/contacto/`, `/acerca-de/` | Sin anuncios al principio | Pantallas funcionales/de información: poco contenido y mucho riesgo por poco ingreso |
| Guías | Uno o dos como máximo: tras la etapa 1 y **después de la etapa 4** | Es donde el lector ya obtuvo valor; nunca entre el síntoma y la solución |
| `/` y `/taller/` | Uno tras el bloque de contenido estático, nunca sobre el formulario | El formulario es una acción: un anuncio al lado está prohibido |
| Móvil | Sin *sticky* ni *anchor* en la primera iteración | Es lo que más rompe la revisión y lo que peor retiene |

### P4 · Crecer y retener (el «que atraiga al usuario»)

Lo que hace que un visitante llegue, se quede y vuelva. Ordenado por efecto/coste:

1. **Publicar el sitio entero es el primer acto de crecimiento.** Hoy el 70 % del
   trabajo es invisible: no está en Internet.
2. **La calculadora es el activo que genera enlaces.** Convertir `/taller/` en una
   página que se pueda enlazar (explicación de la fórmula, ejemplo resuelto, datos de
   entrada claros) es lo que hicieron Teaching Tech y CNC Kitchen.
3. **Contenido único que nadie más tiene**: fotos propias de fallos, medidas propias, y
   las contradicciones entre fabricantes **resueltas y citadas** (el material cocinado
   ya tiene dos resueltas en el plan de contenido y sin publicar).
4. **Fechas y cambios visibles.** Un sitio que dice «actualizado el 12 de octubre de
   2026, y esto es lo que cambió» es un sitio vivo; es la señal más barata que existe.
5. **Distribución honesta, una vez, sin spam**: foros de Prusa y Bambu, comunidades
   hispanohablantes de impresión 3D, y `r/3Dprinting` **respetando sus reglas de
   autopromoción** (14 días para modelos gratuitos, 30 para pagos). Un enlace que
   aporta a un hilo concreto vale más que veinte publicaciones.
6. **Retención medida de verdad**: profundidad de scroll, guía terminada, uso de la
   calculadora. Sin esos tres eventos, cualquier decisión de diseño es una opinión.

---

## 4 · Decisiones que necesitan al responsable

Sin estas cinco respuestas, P1 no puede empezar:

| # | Decisión | Opciones | Recomendación |
|---|---|---|---|
| **D-1** | Cómo se resuelve la etapa 4 en el HTML estático | A unión/ejemplo · B apartado duplicado · C dejarlo como está | **A** |
| **D-2** | Quién firma las guías | Nombre real + credenciales · seudónimo con identidad verificable | **Nombre real**: es lo que tienen los que monetizan y lo que pide E-E-A-T |
| **D-3** | Se consiguen fotos propias de fallos | Sí, con tu impresora · sólo diagramas SVG | **Sí**: es la diferencia entre «explico lo que dicen otros» y «esto lo he visto» |
| **D-4** | Analítica de arranque | Sin cookies (Cloudflare/Plausible) · GA4 con CMP desde el principio | **Sin cookies primero** |
| **D-5** | Quién revisa el contenido contra `wiki/raw/` | El revisor del pipeline · lectura humana final antes de cada despliegue | **Las dos**: el pipeline detecta, la lectura cierra |

---

## 5 · Lo que deliberadamente no se hace

- **No se toca `wiki/raw/`.** Ni para corregir una errata. El material nuevo se escribe
  como fichero nuevo y pasa por `revisor`.
- **No se escribe contenido a mano saltándose el pipeline.** Va contra la regla del
  repo y contra la política de «contenido generado sin curación».
- **No se instalan MCPs de scraping ni skills nuevas.** El cuello de botella no es
  recolectar: es publicar y firmar lo recolectado. La evaluación ya está en
  [`PLAN.md`](../PLAN.md), Fase 5.
- **No se pide la revisión de AdSense «para ver qué dicen».** Un rechazo consume
  semanas y activa el *cooldown*.
- **No se añaden anuncios en pantallas sin contenido propio**, ni *sticky*, ni pop-ups,
  ni intersticiales: son las tres causas de sanción que más rápido se disparan.
- **No se promete ingreso.** Con tráfico inicial de decenas de visitas al mes, AdSense
  son céntimos. El valor de AdSense ahora es la aprobación, no el dinero; el dinero
  llega con el tráfico, y el tráfico con el contenido único.

---

## 6 · Definition of Done

**Para poder solicitar AdSense:**

- [x] `main` desplegado y las rutas del sitemap responden 200 con contenido sin JavaScript (18/18 el 2026-10-16).
- [x] `robots.txt` con la directiva `Sitemap:` sin comentar, y `sitemap.xml` con `lastmod`.
- [x] Ninguna guía exporta cero acciones.
- [x] Las guías muestran autor y fecha, y `/autor/` existe.
- [x] La home tiene contenido estático real (≥600 palabras) y enlaza las guías.
- [x] `/taller/` es una página de contenido, no un hueco (~740 palabras).
- [x] Política de privacidad con las cláusulas de terceros, cookies y RGPD.
- [x] `ads.txt` en la raíz, propiedad verificada, datos de pago completos.
- [x] Consent Mode v2 (`denied` por defecto) con los cuatro parámetros.
- [ ] CMP certificada con TCF v2.3: la CMP de Google está elegida y el sitio preparado; falta publicar el mensaje europeo.
- [x] `npm run lint`, `npm run build` y los `verify:*` en verde (2026-10-16: los doce de UI y contenido, sin `maquinas` —otra sesión— ni `fuentes` —crawl largo—).
- [x] Mapa de anuncios escrito antes de colocar el primer anuncio.

**Para que «atraiga»:**

- [x] Search Console verificada y sitemap enviado (la inspección manual de URLs se repite con cada tanda nueva).
- [ ] Analítica sin cookies midiendo el 100 % del tráfico.
- [ ] 4 guías por encima de 1.500 palabras, con tabla de parámetros y ≥6 fuentes.
- [ ] Al menos 10 imágenes propias (fotos de fallos) además de los SVG.
- [ ] Eventos de retención midiendo profundidad, guía terminada y uso del taller.

---

## 7 · Anexo: cómo se reprodujo la auditoría

```bash
# desde la raíz del repo, dentro de WSL
. ~/.nvm/nvm.sh
npm run build                    # exporta dist/ con las 18 páginas
node .local/contar.js            # palabras visibles por página
node .local/salientes.js         # enlaces de salida por guía
node .local/estructura.js        # variables, tarjetas, acciones por guía
node .local/capturas.mjs         # capturas y medidas en navegador (Playwright)
wc -w wiki/cooked/*.md           # material cocinado disponible
git rev-list --count main..dev   # trabajo sin desplegar
```

Los scripts de `.local/` son herramientas de auditoría, no parte del producto: si se
quieren conservar, su sitio es `scripts/verify/`; si no, se borran.

Sonda del sitio publicado:

```bash
for u in / /wiki/ /wiki/warping-pla/ /taller/ /privacidad/ /contacto/ \
         /acerca-de/ /robots.txt /sitemap.xml /ads.txt; do
  curl -s -o /dev/null -w "%{http_code}  https://wiiki-3d.com$u\n" -L "https://wiiki-3d.com$u"
done
```
