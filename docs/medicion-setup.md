# Puesta en marcha de la medición

> Runbook de los pasos que **sólo puede hacer una persona con las cuentas**.
> La parte de código está hecha: el snippet de GA4 vive en `index.html` con
> Consent Mode v2 y el sitemap se genera solo en cada build.

## Lo que ya está hecho

| Pieza | Estado |
|---|---|
| Snippet de GA4 con `consent` denegado por defecto | En `index.html`. **No se inyecta** mientras `GA_ID` sea `G-XXXXXXXXXX` |
| `dist/sitemap.xml` con URLs canónicas | Lo genera `scripts/export-static.mjs` en cada build |
| `dist/robots.txt` con la línea `Sitemap:` | Ya presente |
| Verificación de propiedad de AdSense | Meta en `index.html` (no mide, sólo verifica) |

## Paso 1 · GA4 (15 min)

1. [analytics.google.com](https://analytics.google.com) → **Admin** → *Crear cuenta* y *Crear propiedad*. Categoría: «Ordenadores y electrónica»; zona horaria **Madrid** (los datos se agrupan por día).
2. En la propiedad: *Flujos de datos* → **Añadir flujo → Web**. URL `https://wiiki-3d.com`, nombre `wiiki-3d.com`.
3. Copia el **ID de medición** (formato `G-XXXXXXXXXX`).
4. Sustitúyelo en `index.html`, en la línea `const GA_ID = 'G-XXXXXXXXXX';`.
5. `npm run build` y publicar. A partir de ahí, GA4 recoge en **modo limitado** (sin cookies identificadoras) hasta que exista el banner.
6. Comprueba en *Informes → Tiempo real* que entra tu propia visita.

## Paso 2 · Search Console (10 min + propagación DNS)

1. [search.google.com/search-console](https://search.google.com/search-console) → **Añadir propiedad** → tipo **Dominio** (`wiiki-3d.com`, sin `https://`).
2. El método es DNS: en el registrador, un registro **TXT** con nombre `@` y el valor `google-site-verification=…` que te da GSC.
3. Comprueba que propaga antes de pulsar *Verificar*:

   ```bash
   dig wiiki-3d.com TXT +short
   ```

4. **No borres el TXT nunca**: GSC comprueba la propiedad periódicamente.
5. *Sitemaps* → añadir `sitemap.xml` → debe quedar en *Correcto*.
6. *Inspección de URLs* → pide indexación manual de las 10–15 URLs que importan (portada, `/wiki`, las guías que ya existen, `/taller`).

> Método de respaldo, por si el registrador se resiste: propiedad tipo **Prefijo de URL** con la etiqueta `<meta name="google-site-verification">` añadida a `index.html` —sustituible por la misma constante de arriba—.

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
(`docs/plan-de-contenido.md`) deció el orden con criterio editorial cuando no
había datos; cuando GSC lleve un mes dando consultas, la pregunta «¿qué guía
escribimos?» se responde con las búsquedas que ya traen impresiones sin
clic. Hasta entonces, producir una guía más del plan sigue siendo la mejor
estimación disponible.

## Lo que falta y no es automático

- **El banner de consentimiento (CMP).** Hasta que exista, GA4 mide en modo
  limitado y los anuncios no se sirven. El snippet ya está preparado para que
  el banner sólo tenga que llamar a
  `gtag('consent', 'update', { analytics_storage: 'granted', ad_storage: 'granted' })`.
- **Recargar la API de Jev** (el clasificador real sigue en modo demo). No
  tiene que ver con la medición, pero el badge DEMO que arreglamos depende de
  ello.
