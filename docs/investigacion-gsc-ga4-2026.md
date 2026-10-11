# Guía operativa: Search Console + GA4 para wiiki-3d.com (GitHub Pages + Vite/React + GitHub Actions)

Documentación oficial consultada en agosto de 2026. Dato de partida: **si publicas con un workflow de Actions, el archivo `CNAME` se ignora**; el dominio se configura en Settings → Pages ([GitHub Docs](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site)).

---

## 1. Google Search Console (2026)

**Propiedades: crea las dos.** La *Domain property* (`wiiki-3d.com`) agrega http/https, `www` y subdominios; la *URL-prefix* (`https://wiiki-3d.com/`) permite aislar protocolo o ruta. La Domain property **solo se verifica por DNS**. El límite ya no es de 20: **hasta 1.000 propiedades por cuenta** ([tipos de propiedad](https://support.google.com/webmasters/answer/34592?hl=en)).

**Método recomendado: DNS (TXT).** Es la única vía para Domain property y la más resistente: no se rompe cuando el build regenera `dist/` ([Verify your site ownership](https://support.google.com/webmasters/answer/9008080?hl=en)).

1. En el registrador crea un `TXT` con nombre `@` y valor `google-site-verification=XXXXXXXXXXXX` (el string exacto que da GSC).
2. Comprueba con `Resolve-DnsName -Name wiiki-3d.com -Type TXT` (o `dig wiiki-3d.com TXT`).
3. Pulsa **Verify**. Si tu registrador aparece en el asistente, la verificación es inmediata tras el login OAuth. No borres el registro: GSC lo revisa periódicamente y la verificación caduca si desaparece.

**Comparativa de métodos** ([tabla oficial](https://support.google.com/webmasters/answer/9008080?hl=en)):

| Método | Sirve para | Ventaja | Riesgo |
|---|---|---|---|
| DNS TXT/CNAME | Domain property | Cubre todo el dominio; inmune a despliegues | Requiere acceso al registrador |
| Archivo HTML en `/` | URL-prefix | Sencillo | Se pierde al limpiar `dist/` |
| Etiqueta `<meta>` | URL-prefix | Vive en el código React | Se cae al cambiar `index.html` |
| Analytics / GTM | URL-prefix | Cero trabajo extra | Si cambias de tag, pierdes verificación |

Recomendación: **DNS para la Domain property + etiqueta meta como respaldo** en la URL-prefix ([métodos múltiples](https://support.google.com/webmasters/answer/9008080?hl=en)). En 2025-2026 no hay método nuevo; sí existen ya las *platform properties* (Instagram, TikTok, X, YouTube) como tipo aparte ([Add a property](https://support.google.com/webmasters/answer/34592?hl=en)).

**Sitemap.**
1. Genera `dist/sitemap.xml` con URLs absolutas canónicas (`https://wiiki-3d.com/...`).
2. Verifica que `https://wiiki-3d.com/sitemap.xml` responde 200 sin login.
3. Sitemaps → *Add a new sitemap* → `sitemap.xml` → **Submit**; debe quedar en `Success` ([Sitemaps report](https://support.google.com/webmasters/answer/7451001?hl=en)).
4. Sin permisos de owner puedes declararlo en `robots.txt` con `Sitemap: https://wiiki-3d.com/sitemap.xml`: es una directiva real, y un `#` delante la convierte en comentario inútil ([robots.txt](https://developers.google.com/search/docs/crawling-indexing/robots/create-robots-txt?hl=en)).

**Cobertura.** *Page indexing* (indexadas vs. no indexadas, con motivos como *Discovered – currently not indexed*, *Crawled – currently not indexed*, *Duplicate without user-selected canonical*), *URL Inspection* para pedir indexación de las 10-20 URLs clave, y *Sitemaps* para confirmar lectura ([All reports and tools](https://support.google.com/webmasters/answer/7576553?hl=en)).

**Primeras 4 semanas.** Semana 1: verificación, sitemap, Page indexing. Semana 2: Performance (impresiones, CTR, consultas). Semana 3: Core Web Vitals y Crawl stats. Semana 4: consultas/país, Links y datos estructurados si usas Article/SoftwareApplication.

---

## 2. Google Analytics 4 (2026)

**Instalación.** GA4 se instala con el **Google tag**; el flujo oficial es cuenta → propiedad → *data stream* web → snippet en todas las páginas ([Set up Analytics](https://support.google.com/analytics/answer/9304153?hl=en)). Firebase es solo para apps móviles ([Introducing GA4](https://support.google.com/analytics/answer/10089681?hl=en)). Con Consent Mode v2 y AdSense en el horizonte, **GTM es la opción recomendada** (CMP con plantilla de consentimiento y cambios sin redeploy). Con gtag.js directo, el snippet `G-XXXXXXXXXX` va en `index.html` y `gtag('consent','default',…)` **antes** de `config` ([consent mode](https://developers.google.com/tag-platform/security/guides/consent?hl=en)).

Pasos GTM: contenedor web → snippet en `index.html` → etiqueta *Google Tag* con `G-XXXXXXXXXX` → trigger *Initialization – All Pages* → vista previa → publicar.

**Flujo de datos web.** Admin → *Data collection and modification* → *Data streams* → **Add stream → Web**; URL `https://wiiki-3d.com`, nombre `wiiki-3d.com (web)`. Con **Enhanced measurement ON** obtienes gratis `page_view`, `scroll` (90 % de profundidad), `click` (salientes), `view_search_results`, `video_start`/`video_progress`/`video_complete`, `file_download` y `form_start`/`form_submit` ([Enhanced measurement events](https://support.google.com/analytics/answer/9216061?hl=en)). Activa *Page changes based on browser history events* para que React Router cuente pageviews, y **desactívalo en GA4 si lo haces por GTM** para no duplicar ([Measure SPAs](https://developers.google.com/analytics/devguides/collection/ga4/single-page-applications?hl=en)).

**Eventos propios.** Nombres reservados prohibidos (`page_view`, `scroll`, `file_download`, `click`…), deben empezar por letra, solo letras/números/guion bajo y **< 40 caracteres** ([naming rules](https://support.google.com/analytics/answer/13316687?hl=en)).

| Objetivo | Evento | Cómo |
|---|---|---|
| Descargar STL | `file_download` (automático) | Añade `file_name`, `file_extension` |
| Subir un modelo | `file_upload` (**custom**) | `gtag('event','file_upload',{file_type:'stl',file_size_kb:…})` |
| Usar calculadora | `calculator_use` (custom) | En el handler "Calcular"; params `calculator_name`, `material` |
| Terminar guía | `guide_complete` (custom) | Al 100 % de scroll o último paso; `guide_id`, `steps` |
| Clic saliente | `click` con `outbound: true` (automático) | Si quieres nombre propio, custom `outbound_click` + `link_domain` |
| Contacto / tutorial | `generate_lead`, `tutorial_begin`, `tutorial_complete` (recomendados) | Preferibles a nombres inventados: desbloquean informes ([Recommended events](https://support.google.com/analytics/answer/9267735?hl=en)) |

Marca `file_upload`, `calculator_use`, `guide_complete` y `generate_lead` como **key events** y pon la retención en **14 meses** (máximo no-360) ([Data retention](https://support.google.com/analytics/answer/7667196?hl=en)).

---

## 3. Privacidad y consentimiento (Consent Mode v2 + CMP)

**v2 exige cuatro parámetros**: `ad_storage`, `analytics_storage`, `ad_user_data`, `ad_personalization` (los dos últimos son la novedad) ([consent mode](https://developers.google.com/tag-platform/security/guides/consent?hl=en)).

```js
gtag('consent','default',{ ad_storage:'denied', ad_user_data:'denied',
  ad_personalization:'denied', analytics_storage:'denied',
  region:['ES'], wait_for_update:500 });
gtag('consent','update',{ ad_storage:'granted', ad_user_data:'granted',
  ad_personalization:'granted', analytics_storage:'granted' });
```

Añade `gtag('set','url_passthrough',true)` y `gtag('set','ads_data_redaction',true)` para mejorar la medición sin cookies ([consent mode](https://developers.google.com/tag-platform/security/guides/consent?hl=en)).

**Si el usuario rechaza.** Con *basic consent mode* los tags no cargan: **cero pings, cero modelado, pérdida total**. Con *advanced* (tags siempre cargados, consent *denied* por defecto) se envían *cookieless pings* con dimensiones gruesas y Google rellena con **modelado conductual y de conversiones** ([Consent mode en GA4](https://support.google.com/analytics/answer/9976101?hl=en)). Ese modelado no es inmediato: exige consent mode en todas las páginas en implementación avanzada, ≥1.000 eventos/día con `analytics_storage='denied'` durante ≥7 días y ≥1.000 usuarios diarios con `analytics_storage='granted'` en ≥7 de los últimos 28 días; **con poco tráfico no habrá modelado** y esos datos simplemente no aparecen ([Behavioral modeling](https://support.google.com/analytics/answer/11161109?hl=en)). Sin consentimiento, en la UE solo cabe lo estrictamente necesario para prestar el servicio (seguridad, balanceo, idioma); las *cookieless pings* siguen siendo transmisión de datos a Google, así que el modelado es una técnica de Google, no una base jurídica ([EU user consent policy](https://www.google.com/about/company/user-consent-policy/)).

**CMP obligatoria con AdSense.** Para anuncios personalizados en EEE y Reino Unido se exige **CMP certificada por Google e integrada con IAB TCF v2 desde el 16-01-2024**, y en Suiza desde el 31-07-2024; sin ella no eres elegible para anuncios personalizados ([AdSense: requisitos de consentimiento](https://support.google.com/adsense/answer/13554020?hl=en)). Usa la plantilla de Consent Mode de tu CMP en GTM ([guía para CMPs](https://developers.google.com/tag-platform/tag-manager/templates/consent-apis)).

---

## 4. Alternativa sin cookies (y por qué empezar por ahí)

| Herramienta | Cookies | Banner | Para wiiki-3d.com |
|---|---|---|---|
| [Cloudflare Web Analytics](https://developers.cloudflare.com/web-analytics/about/) | No | No | Gratis, RUM y Core Web Vitals, sin proxear DNS; sin eventos custom |
| [Plausible](https://plausible.io/privacy-focused-web-analytics) | No | No | UE, eventos y objetivos, script ligero; de pago |
| [Umami](https://umami.is/docs) | No | No | Open source, self-host o cloud, eventos |
| [Matomo](https://matomo.org/) | Opcional | Solo con cookies | Control total y autoalojamiento |

**Recomendación**: antes de AdSense instala **solo** una analítica sin cookies (Cloudflare por coste cero, Plausible si necesitas eventos como `calculator_use`) y **no cargues GA4 ni GTM**: sin cookies no necesitas banner de analítica y mides el 100 % del tráfico ([Plausible](https://plausible.io/privacy-focused-web-analytics)).

**Migración**: (1) publica política de privacidad y cookies y contrata la CMP certificada; (2) añade GTM con Consent Mode v2 en *denied* por defecto; (3) lanza GA4 con enhanced measurement y los eventos de §2; (4) mantén ambas 4-8 semanas comparando sesiones; (5) retira la antigua cuando converjan, o consérvala como control de la pérdida por rechazo. Aviso: **ninguna analítica sin cookies sustituye a GA4 si vas a monetizar con AdSense**, porque la personalización publicitaria exige banner y TCF.

---

## 5. Rendimiento y Core Web Vitals en 2026

**Umbrales vigentes** (percentil 75, móvil y escritorio por separado): **LCP ≤ 2,5 s**, **INP ≤ 200 ms**, **CLS ≤ 0,1** ([Web Vitals](https://web.dev/articles/vitals)). INP sustituyó a FID en marzo de 2024 y Chrome retiró FID de sus herramientas ([INP is officially a Core Web Vital](https://web.dev/blog/inp-cwv-launch)). El conjunto LCP + INP + CLS sigue vigente: **no hay un cuarto Core Web Vital** a agosto de 2026.

**Novedad para SPAs**: Chrome 151 añadió APIs de **soft navigations**, que permiten medir LCP/CLS de cada cambio de ruta en React sin recarga completa ([Soft navigations](https://developer.chrome.com/docs/web-platform/soft-navigations)).

**Informes GSC**: *Core Web Vitals* agrupa por estado (Poor / Need improvement / Good) y grupo de URLs, con datos de campo reales; **solo aparecen URLs indexadas con datos suficientes** y si no los hay muestra "No data available" ([Core Web Vitals report](https://support.google.com/webmasters/answer/9205520?hl=en)).

**Campo con poquísimo tráfico**: CrUX exige origen públicamente descubrible (200 y sin `noindex`) y **suficientemente popular**, umbral no publicado; un sitio nuevo probablemente no aparecerá en CrUX ni en PageSpeed Insights con datos de campo ([CrUX methodology](https://developer.chrome.com/docs/crux/methodology)). Alternativas: (1) lab con PageSpeed Insights/Lighthouse; (2) **RUM propio** con la librería `web-vitals` enviando LCP/INP/CLS a GA4 como eventos (`cwv_lcp`, `cwv_inp`, `cwv_cls`) y agregando por percentil 75 en Explorations; (3) Cloudflare Web Analytics, que expone CWV de campo sin mínimo de tráfico ([Cloudflare](https://developers.cloudflare.com/web-analytics/about/)).

---

## 6. Errores típicos en GitHub Pages

1. **`www` vs sin `www`**: deja una sola versión sirviendo 200 y redirige 301 la otra en el registrador. A records de Pages: `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153` (AAAA `2606:50c0:8000::153`–`…8003::153`) o ALIAS/ANAME al dominio por defecto ([Managing a custom domain](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site)).
2. **HTTPS**: marca *Enforce HTTPS* solo cuando el certificado esté emitido; si el DNS no resuelve exacto, no se emite ([Troubleshooting](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/troubleshooting-custom-domains-and-github-pages)).
3. **`CNAME`**: con Actions se ignora; desde rama debe existir en la raíz, en MAYÚSCULAS, con un solo dominio y solo el nombre, sin `https://` ni barra ([Troubleshooting](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/troubleshooting-custom-domains-and-github-pages)).
4. **Rutas SPA**: React Router por history da 404 en acceso directo; usa un `404.html` que replique `index.html` o hash router, y activa el seguimiento por *browser history* en GA4 ([Measure SPAs](https://developers.google.com/analytics/devguides/collection/ga4/single-page-applications?hl=en)).
5. **Etiqueta duplicada**: GTM + gtag.js a la vez, o dos componentes que inyectan el tag en cada render, duplican pageviews; verifica con Tag Assistant y DebugView.
6. **Sitemap comentado**: `# Sitemap: …` es un comentario y se ignora; debe ser `Sitemap: https://wiiki-3d.com/sitemap.xml` sin `#`, en la raíz, y solo puede haber un `robots.txt` ([robots.txt](https://developers.google.com/search/docs/crawling-indexing/robots/create-robots-txt?hl=en)).
7. **Verificación HTML borrada** en cada deploy: por eso conviene DNS.
8. **`noindex` heredado** de la plantilla o del `404.html`: bloquea indexación y CrUX ([CrUX methodology](https://developer.chrome.com/docs/crux/methodology)).

---

## Checklist: qué comprobar a los 7 días de publicar

1. `Resolve-DnsName wiiki-3d.com -Type A` devuelve las 4 IPs de Pages y `www` redirige 301 al dominio sin `www`.
2. HTTPS válido y *Enforce HTTPS* activo en Settings → Pages.
3. Domain property `wiiki-3d.com` verificada, y la meta de respaldo presente en el `<head>` de producción.
4. Sitemaps report en `Success` con "Discovered URLs" > 0.
5. `https://wiiki-3d.com/robots.txt` responde 200 con la línea `Sitemap:` sin comentar.
6. URL Inspection sobre 5 rutas internas: `Page fetch` = Successful y ninguna 404 directa (SPA).
7. Page indexing revisado: sin 404/5xx inesperados y motivos de no indexación entendidos.
8. Core Web Vitals abierto sin "No data" inesperado, o RUM propio enviando `cwv_lcp`/`cwv_inp`/`cwv_cls`.
9. 0 errores en datos estructurados (Article/SoftwareApplication si aplica).
10. GA4 Realtime: tu visita = 1 usuario y 1 `page_view`, **no 2**.
11. DebugView: disparan `page_view` (incluidas rutas SPA), `scroll`, `file_download` y tus custom (`calculator_use`, etc.).
12. Key events: `file_upload`, `calculator_use`, `guide_complete` con conteos.
13. Tag Assistant: sin tocar el banner todo queda en *denied* y sin cookies; al aceptar pasa a `granted` sin recargar.
14. Admin → *Data retention* configurado en **14 meses**.
15. Si conviven analítica sin cookies y GA4, ambas registran tu visita sin duplicar pageviews.

---

### Fuentes oficiales

- GSC: [verificación](https://support.google.com/webmasters/answer/9008080?hl=en) · [propiedades](https://support.google.com/webmasters/answer/34592?hl=en) · [sitemaps](https://support.google.com/webmasters/answer/7451001?hl=en) · [Core Web Vitals](https://support.google.com/webmasters/answer/9205520?hl=en)
- GA4: [setup](https://support.google.com/analytics/answer/9304153?hl=en) · [enhanced measurement](https://support.google.com/analytics/answer/9216061?hl=en) · [naming](https://support.google.com/analytics/answer/13316687?hl=en) · [retención](https://support.google.com/analytics/answer/7667196?hl=en)
- Consentimiento: [Consent Mode](https://developers.google.com/tag-platform/security/guides/consent?hl=en) · [consent mode en GA4](https://support.google.com/analytics/answer/9976101?hl=en) · [modelado](https://support.google.com/analytics/answer/11161109?hl=en) · [CMP AdSense](https://support.google.com/adsense/answer/13554020?hl=en)
- Rendimiento: [Web Vitals](https://web.dev/articles/vitals) · [INP](https://web.dev/blog/inp-cwv-launch) · [soft navigations](https://developer.chrome.com/docs/web-platform/soft-navigations) · [CrUX](https://developer.chrome.com/docs/crux/methodology)
- Infraestructura: [GitHub Pages](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site) · [troubleshooting](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/troubleshooting-custom-domains-and-github-pages) · [robots.txt](https://developers.google.com/search/docs/crawling-indexing/robots/create-robots-txt?hl=en)
