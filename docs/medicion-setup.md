# Puesta en marcha de la medición

> Runbook de los pasos que **sólo puede hacer una persona con las cuentas**.
> La parte de código está hecha: GA4 con Consent Mode v2 y la etiqueta de
> AdSense viven en `index.html`, y el sitemap se genera solo en cada build.
> Última revisión: **2026-10-16**.

## Lo que ya está hecho

| Pieza | Estado |
|---|---|
| Consent Mode v2: los cuatro parámetros, `denied` por defecto | En `index.html`, declarados antes de que cargue cualquier etiqueta de Google |
| Etiqueta de AdSense (`adsbygoogle.js`) | En `index.html`. Sin ella Google no puede entregar el aviso europeo de consentimiento; aún no sirve anuncios |
| Etiqueta de GA4 (`G-6W0LKP3ETS`) | En `index.html`; recoge en **modo limitado** hasta que haya consentimiento |
| `dist/sitemap.xml` con URLs canónicas y `lastmod` | Lo genera `scripts/export-static.mjs` en cada build |
| `dist/robots.txt` con la línea `Sitemap:` | Ya presente |
| Verificación de propiedad de AdSense | Meta `google-adsense-account`; pagos completos y `ads.txt` correcto |
| Search Console | Propiedad de dominio verificada **por CNAME**; sitemap enviado |

## Paso 1 · GA4 ✅

Hecho. Resumen por si hay que rehacerlo: cuenta y propiedad creadas (categoría
«Ordenadores y electrónica», zona horaria Madrid), flujo web `wiiki-3d.com`, y el ID
vive en `index.html` (`const GA_ID = 'G-6W0LKP3ETS'`). Comprobación: *Informes →
Tiempo real*.

## Paso 2 · Search Console ✅

Hecho, con una particularidad que conviene no tocar:

1. Propiedad de tipo **Dominio** (`wiiki-3d.com`, sin `https://`).
2. La verificación de este dominio se apoya en un **CNAME que gestiona Search
   Console** (`4hs3jubjc3fb` → `gv-ve3w2ce72ka2ka.dv.googlehosted.com`), no en un
   TXT. **No borrarlo nunca**: GSC recomprueba la propiedad periódicamente.
   Si algún día hay que rehacerlo a mano, el respaldo clásico sigue siendo un TXT
   `google-site-verification=…` en `@`.
3. *Sitemaps*: `sitemap.xml` enviado y en *Correcto*.
4. *Inspección de URLs*: pedir indexación manual de las URLs que importan cada vez
   que se publique algo nuevo.

## Paso 3 · Las primeras cuatro semanas

De la investigación propia (`docs/investigacion-gsc-ga4-2026.md`), el calendario que da Google:

| Semana | Mirar |
|---|---|
| 1 | Indexación (cobertura), sitemap leído |
| 2 | Rendimiento: impresiones, clics, CTR por consulta |
| 3 | Core Web Vitals (LCP sobre todo: aquí el bundle del visor pesa) |
| 4 | Consultas reales, país, enlaces |

## La regla que conecta esto con el contenido

**Las guías siguientes salen de las consultas reales, no del plan.** El plan
(`docs/plan-de-contenido.md`) decidió el orden con criterio editorial cuando no
había datos; cuando GSC lleve un mes dando consultas, la pregunta «¿qué guía
escribimos?» se responde con las búsquedas que ya traen impresiones sin
clic. Hasta entonces, producir una guía más del plan sigue siendo la mejor
estimación disponible.

## Lo que falta y no es automático

- **El mensaje europeo de consentimiento (CMP).** Se configura a mano en
  AdSense → «Privacidad y mensajes» (la CMP de Google está en la lista de
  certificadas y su mensaje soporta TCF v2.3). Solo se muestra a visitantes del
  EEE, Reino Unido y Suiza; fuera de ahí el estado queda `denied` y la medición
  sigue en modo limitado. El sitio ya está listo (etiqueta de AdSense + Consent
  Mode v2): con *advanced mode* —el que se activa en la configuración del
  mensaje— el aviso actualiza el consentimiento sin tocar la página.
  Para probarlo desde aquí, con el mensaje ya publicado:
  `https://wiiki-3d.com/?fc=alwaysshow&fctype=gdpr` (en incógnito; fuerza el
  aviso aunque la región de quien mira no lo pida). Si algún día se quiere
  medición completa en Latinoamérica, la vía es un `default` de Consent Mode
  por región más un matiz en la política de privacidad.
- **Solicitar la revisión de AdSense.** Cuando el mensaje esté publicado y el
  repaso final pase: *Confirmo que he resuelto los problemas* + *Solicitar
  revisión*. **No borrar el sitio ni volver a añadirlo** si se rechaza: se
  corrige sobre la misma ficha.
- **DMARC** (no es medición, pero vive en el mismo cuaderno): falta el registro
  `_dmarc` con `p=none` en el DNS de Name.com.
- **Recargar la API de Jev** (el clasificador real sigue en modo demo). No
  tiene que ver con la medición, pero el badge DEMO que arreglamos depende de
  ello.
