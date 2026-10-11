# Por qué Google AdSense rechaza sitios y qué exige para aprobarlos (2026)

**Fechas.** *AdSense Program policies*: "Last updated: **August 4, 2026**" ([1](https://support.google.com/adsense/answer/48182)). Guía de Search sobre IA: "Last updated **2026-10-01**" ([2](https://developers.google.com/search/docs/fundamentals/using-gen-ai-content)). Registro de anuncios hasta el **11 sep 2026** ([3](https://support.google.com/adsense/announcements/9189068)). Las páginas de ayuda de AdSense no publican fecha propia.

## 1. "Low value content": definición operativa y disparadores

**Definición oficial y su trampa.** El glosario define *low-value content* de forma estrecha: "Unintelligible content that has no value to the user (e.g., filler text or 'ipsum lorem' text)" ([4](https://support.google.com/publisherpolicies/table/10563033)). Pero el rechazo que reciben los editores usa "low value content" como paraguas de calidad global, mucho más amplio; esa política remite a ese mismo glosario.

**Qué lo dispara.** La política *"Google-served ads on screens without publisher-content"* prohíbe anuncios en pantallas "without publisher-content or with low-value content", "that are under construction" o "used for alerts, navigation or other behavioral purposes", con tres ejemplos ([5](https://support.google.com/publisherpolicies/answer/11112688)):

- "Ads should not be placed on 'dead end' or no content screens (e.g., **Thank You, Exit, Error pages**, etc.)" → gracias y utilitarias están **explícitamente** cubiertas.
- "Don't place ads on **automatically generated content without manual review or curation**."

**Contenido insuficiente.** Google pide "enough unique content so that we can determine what your site is about" y condena el scraping: copiar y republicar sin valor; copiar y "modify it slightly (for example, by substituting synonyms or using automated techniques)"; y sitios que solo incrustan vídeo/imagen ajeno "without substantial added value". Con muchas páginas similares, "consider expanding each page or consolidating the pages into one" ([6](https://support.google.com/adsense/answer/10015918)). Desaconseja *cloaking*, *doorway pages* y "pages with little to no content" ([6](https://support.google.com/adsense/answer/10015918)).

**Umbrales: no existen oficialmente. No hay número de palabras, de artículos ni extensión mínima en la documentación de Google.** Las cifras que circulan ("300 palabras", "20 artículos") son de terceros. La guía de AdSense Community da una lista cualitativa: duplicado/plagiado; "**Texto gerado automaticamente: Conteúdo produzido por softwares sem revisão humana**"; parafraseo sin aportar nada; y "**Thin content/baixo valor**: Páginas com pouco texto, muita imagem sem contexto, ou apenas links de afiliados sem valor agregado" ([7, 26 jul 2025](https://support.google.com/adsense/community-guide/360816628)). Es contenido comunitario y la página advierte que "may not be verified or up-to-date" ([7](https://support.google.com/adsense/community-guide/360816628)).

**About/Contact no son requisito.** Google **no exige** About o Contact en ninguna política publicada; solo la **política de privacidad** es obligatoria (§5). Aparecen únicamente como recomendación E-E-A-T en la guía comunitaria: "Tenha uma seção 'Sobre Nós' ou 'Sobre o Autor' clara... como os usuários podem entrar em contato e as políticas de privacidade" ([7](https://support.google.com/adsense/community-guide/360816628)).

## 2. Contenido generado por IA (2025-2026)

**AdSense.** No hay política dedicada a "IA", pero el efecto es directo: se prohíben anuncios en "automatically generated content without manual review or curation" ([5](https://support.google.com/publisherpolicies/answer/11112688)), y la guía comunitaria traduce eso a "texto produzido por softwares sem revisão humana" como causa de rechazo ([7](https://support.google.com/adsense/community-guide/360816628)).

**Search.** Usar IA "to generate many pages without adding value for users may violate Google's spam policy on **scaled content abuse**" ([2](https://developers.google.com/search/docs/fundamentals/using-gen-ai-content); política en [8](https://developers.google.com/search/docs/essentials/spam-policies#scaled-content)). Remite a los Quality Rater Guidelines, secciones 4.6.5 (scaled content abuse) y 4.6.6 (contenido "created with little to no effort, little to no originality, and little to no added value") ([2](https://developers.google.com/search/docs/fundamentals/using-gen-ai-content), [9](https://static.googleusercontent.com/media/guidelines.raterhub.com/en//searchqualityevaluatorguidelines.pdf)).

**¿Exige divulgación?** La palabra exacta es "**consider**": "consider adding information on how your content was created" ([2](https://developers.google.com/search/docs/fundamentals/using-gen-ai-content)). No es obligatorio en webs; el único etiquetado obligatorio es en Merchant Center para imágenes/datos de producto con IA ([2](https://developers.google.com/search/docs/fundamentals/using-gen-ai-content)). Sí es exigible verificar: "It is critical to manually factcheck and review all AI-generated content" ([2](https://developers.google.com/search/docs/fundamentals/using-gen-ai-content)). El marco "people-first" sigue vigente ([10](https://developers.google.com/search/docs/fundamentals/creating-helpful-content)), ya integrado en las core updates y no como sistema aparte.

## 3. Requisitos técnicos, navegación, ads.txt y dominios

**Propiedad.** Debes acceder al HTML e insertar el código entre `<head>`. "If you sign up with a site you don't own (e.g., www.google.com), we won't be able to verify that you're the site owner and we won't set up your account" ([11](https://support.google.com/adsense/answer/91205)). Métodos: snippet, ads.txt, meta tag `google-adsense-account` o Search Console ([12](https://support.google.com/adsense/answer/12169212), [13](https://support.google.com/adsense/answer/12176698)).

**ads.txt no es obligatorio.** Literal: "**Use of ads.txt is not mandatory, but it's highly recommended**" ([14](https://support.google.com/adsense/answer/12171612)). Sí es obligatorio no quedar excluido como vendedor autorizado en tu propio dominio ([15](https://support.google.com/adsense/answer/9335564)). Estados: Not found / Unauthorized / Authorized / Not applicable ([16](https://support.google.com/adsense/answer/12170222)).

**Páginas y navegación.** Solo la política de privacidad es exigible. Se exige navegación usable y sin enlaces rotos ([6](https://support.google.com/adsense/answer/10015918)), con criterios de menú: alineación, legibilidad, funcionamiento de desplegables y precisión ([17](https://support.google.com/adsense/answer/7299563)).

**Antigüedad y nº de artículos: no verificable. No existe requisito oficial de antigüedad mínima ni de número de artículos.** Solo "enough unique content" y "update your site regularly" ([6](https://support.google.com/adsense/answer/10015918)).

**Subdominios gratuitos.** No hay regla publicada que los prohíba, pero sí el mecanismo oficial: en estado "Requires review", "your site **or subdomain** might not yet be eligible for AdSense" ([16](https://support.google.com/adsense/answer/12170222)). El consenso de terceros coincide en el patrón y la causa (no controlas el dominio raíz). Un desarrollador documenta el caso con fecha **6 may 2026**: rechazo atribuido al contenido durante tres rondas hasta concluir que "AdSense will not approve a `*.vercel.app` site... Because the domain is not yours", con el mismo patrón en Netlify, GitHub Pages `*.github.io` sin dominio propio, Replit y render.com; solución: dominio propio ([18](https://dev.to/morinaga/why-google-adsense-will-not-approve-a-vercelapp-site-110b)). **Fiabilidad:** relato personal; el autor reconoce que "isn't published as a hard rule anywhere I can find" y el artículo declara asistencia de IA. Evidencia anecdótica convergente, no política. Existe una lista oficial de *host partners* (Blogger, etc.) con flujo distinto ([12](https://support.google.com/adsense/answer/12169212)).

## 4. Site behavior policies

De [1](https://support.google.com/adsense/answer/48182) y [15](https://support.google.com/adsense/answer/9335564):

- **Anuncios que interfieren:** nada que "overlay or are adjacent to navigational or other action items", que "severely interfere with consumption of content including overlaying the content or pushing the content off the display", ni en "dead end" sin salida ([15](https://support.google.com/adsense/answer/9335564)).
- **Navegación engañosa:** prohibido colocar anuncios "in a way that might be mistaken for menu, navigation or download links"; ejemplos: "False claims of streaming content, or downloads", "Linking to content that doesn't exist", redirecciones a páginas irrelevantes ([1](https://support.google.com/adsense/answer/48182)).
- **Emplazamientos prohibidos:** pop-ups/pop-unders, emails, toolbars, "screens where private communication is the primary focus", "**any non-content-based page**", "pages published specifically for the purpose of showing ads", y contenido enmarcado ([1](https://support.google.com/adsense/answer/48182), [19](https://support.google.com/adsense/answer/1346295)).
- **Comportamiento:** no "change user preferences, redirect users to unwanted websites, initiate downloads, include malware or contain pop-ups or pop-unders that interfere with site navigation" ([1](https://support.google.com/adsense/answer/48182)).
- **Better Ads Standards:** obligatorio cumplirlos ([15](https://support.google.com/adsense/answer/9335564), [20](https://www.betterads.org/standards/)).
- **"Ads above the fold": no he encontrado prohibición oficial genérica.** Lo prohibido es solapar navegación, tapar contenido y hacer indistinguible anuncio y contenido ([15](https://support.google.com/adsense/answer/9335564)).
- Dato 2026: desde el **15 jun 2026** el botón "atrás" ya no dispara vignettes, por la política de Search contra el "back button hijacking" ([3, 7 may 2026](https://support.google.com/adsense/announcements/9189068)).

## 5. Consentimiento y privacidad

**CMP certificada obligatoria.** Se exige una CMP "certified by Google" integrada con el TCF de IAB para anuncios personalizados: **EEA y Reino Unido desde el 16 ene 2024**; **Suiza desde el 31 jul 2024** ([21](https://support.google.com/adsense/answer/13554116)). Esa página incluye la **lista oficial de CMP certificadas** (Didomi, Usercentrics, Sourcepoint, OneTrust, Cookiebot, Ezoic, Google LLC CMP…), actualizada semanalmente ([21](https://support.google.com/adsense/answer/13554116)).

**Si no la tienes:** "Only traffic from a certified CMP is eligible for personalized ads... Traffic from a non-certified CMP may be eligible for non-personalized ads or limited ads" ([21](https://support.google.com/adsense/answer/13554116)). No pierdes la cuenta: pierdes personalización e ingresos.

**Endurecimiento 2025-2026.** Todos los editores y CMP debían migrar a **TCF v2.3 antes del 28 feb 2026**; incumplir "may cause the associated ad request to be defaulted to limited ads or dropped entirely" ([3, 3 nov 2025 y 2 mar 2026](https://support.google.com/adsense/announcements/9189068)). El **11 sep 2026** se añadió "maximize message coverage": la CMP de Google recoge consentimiento de respaldo si falta el *TC string* ([3](https://support.google.com/adsense/announcements/9189068)).

**Consent Mode en 2026: opcional, no sustituto.** El requisito es la CMP certificada/TCF. La integración de la CMP de Google con Consent Mode llegó el **25 mar 2025** como **dos flags a nivel de cuenta, desactivados por defecto** ([22](https://support.google.com/adsense/answer/16088460)). Es decir, opcional y recomendado.

**¿Extendido a otras regiones? No he encontrado evidencia** de extensión más allá de EEA/UK/Suiza. Sí se extendió lo de EE. UU.: nuevos estados (Indiana, Kentucky, Rhode Island desde 1 ene 2026) y **GPC → Restricted Data Processing** para Delaware y Oregon desde el 17 nov 2025 ([3](https://support.google.com/adsense/announcements/9189068)).

**Política de privacidad: obligatoria y con cláusulas concretas.** El editor debe "have and abide by a privacy policy that clearly discloses any data collection, sharing, and usage... including information about the technologies used, such as your use of cookies, web beacons, IP addresses, or other identifiers". Y en particular: "The privacy policy must disclose to users that **third parties may be placing and reading cookies** on your users' browsers" ([15](https://support.google.com/adsense/answer/9335564)). Vale como cumplimiento un enlace prominente a [How Google uses data](https://www.google.com/policies/privacy/partners/) ([15](https://support.google.com/adsense/answer/9335564)).

**Auditoría de la EU User Consent Policy.** Google audita periódicamente y enumera fallos típicos: falta el banner (debe estar certificado por Google); falta la mención literal a "**ads personalization**" en la primera capa; falta acción afirmativa ("clicking an 'OK' button or an 'I agree' button"); falta divulgar la cesión de datos a terceros incluido Google; falta enlace a [Google's Business Data Responsibility Site](https://business.safety.google/privacy/) desde el banner; señal de consentimiento mal configurada; **cookies antes del consentimiento**; CMP mal configurada (strings TC/AC). Si no se corrige: "for publishers, only Limited Ad / programmatic limited ads will be eligible to serve" ([23](https://support.google.com/adsense/answer/16758589), [24](https://www.google.com/about/company/user-consent-policy/)). El *Ad choice control* se eliminó de los ajustes europeos el **19 may 2025** ([3](https://support.google.com/adsense/announcements/9189068)).

## 6. Site review

**Proceso.** Añadir sitio → "Requires review" → verificar propiedad → **Request review** → "Getting ready" → "Ready" o "Needs attention" ([12](https://support.google.com/adsense/answer/12169212), [16](https://support.google.com/adsense/answer/12170222)). Si faltan tareas de cuenta (p. ej. datos de pago), "your site will not be reviewed and will remain in the 'Getting ready' status"; y "don't remove your site and resubmit it because this can delay the process" ([16](https://support.google.com/adsense/answer/12170222)).

**Duración.** "This usually takes a few days, but in some cases can take **2-4 weeks**" ([12](https://support.google.com/adsense/answer/12169212), [13](https://support.google.com/adsense/answer/12176698)).

**Reintentos: sin número publicado, con límite funcional.** "The **Start review process** button will be inactive if your site has been reviewed and rejected several times recently. Check the date provided to find out when you can request another review" ([25](https://support.google.com/adsense/answer/7003627)). Para nivel de página: "You can request a certain number of page-level reviews during a 30 day period. This limit is refreshed daily" ([25](https://support.google.com/adsense/answer/7003627)). Conclusión: **el "límite de 3 intentos" no está documentado por Google**; existe un *cooldown* dinámico con fecha visible en el Policy center.

**¿Revisión tras low value content?** Sí: "If your review is rejected... Once you've re-reviewed the policies and made additional changes, you can request another review" ([25](https://support.google.com/adsense/answer/7003627)). Alternativa: quitar todo el código; "Within 7-10 days of removing the ad code, the policy issue will no longer be displayed in the Policy center, but will remain in our system" ([25](https://support.google.com/adsense/answer/7003627)).

## 7. Causas más frecuentes 2025-2026

**Google no publica ningún ranking de frecuencia.** Lo más cercano a fuente oficial es la guía de AdSense Community, que enumera en orden: (1) contenido insuficiente, (2) baja calidad (genérico, duplicado, automatizado, sin valor real), (3) violación de políticas, (4) problemas de navegación, (5) fuentes de tráfico sospechosas ([7](https://support.google.com/adsense/community-guide/360816628)). Esa guía afirma que "cerca de **95% a 97%** das inscrições para o AdSense são rejeitadas" — **cifra no verificable y comunitaria** ([7](https://support.google.com/adsense/community-guide/360816628)).

Los hilos oficiales 2025-2026 muestran que **"low value content" domina el volumen de quejas** ([26](https://support.google.com/adsense/thread/362377069), [27](https://support.google.com/adsense/thread/332403887), [28](https://support.google.com/adsense/thread/362829728)). Un caso de terceros del **24 jun 2026** ilustra el patrón: 126 páginas rastreadas, solo 4 indexadas, rechazo por "low value content" y plantilla repetida 90 veces ([29](https://www.indiehackers.com/post/google-indexed-4-of-my-126-pages-then-adsense-called-the-site-low-value-content-YHythgHogESw5LrJ0Jpv)).

## 8. Idioma y mercado (español; nicho técnico)

El español está soportado en ambas variantes, "Spanish (European)" y "Spanish (Latin American)" ([30](https://support.google.com/adsense/answer/9727)); declaras el idioma principal al registrarte y Google sirve anuncios en el idioma adecuado aunque el sitio tenga varios soportados ([30](https://support.google.com/adsense/answer/9727)). Límite duro: usar como principal un idioma **no soportado** está prohibido ([30](https://support.google.com/adsense/answer/9727)). Edad mínima del solicitante: 18 años ([31](https://support.google.com/adsense/answer/9724)).

**Impresión 3D: no existe restricción específica**, ni en políticas ni en restricciones ([15](https://support.google.com/adsense/answer/9335564), [32](https://support.google.com/adsense/answer/10437795)). **Inferencia mía, señalada como tal:** distribuir STL/modelos de terceros puede chocar con *Intellectual property abuse*, y tutoriales de modding agresivo de firmware pueden rozar la prohibición de promover *hacking/cracking* ([15](https://support.google.com/adsense/answer/9335564)).

---

## Tabla: Causa de rechazo → Cómo se arregla

| # | Causa | Cómo se arregla | Fuente |
|---|---|---|---|
| 1 | "Low value content" (paraguas de calidad) | Aportar valor y originalidad sustancial frente a otros sitios del tema; no parafrasear lo ya publicado | [6](https://support.google.com/adsense/answer/10015918) |
| 2 | Contenido insuficiente / páginas con poco texto | Ampliar cada página o consolidar las similares en una | [6](https://support.google.com/adsense/answer/10015918) |
| 3 | Duplicado o raspado (incluida sinonimia automática) | Eliminar lo copiado; aportar conocimiento propio, opiniones, revisiones | [6](https://support.google.com/adsense/answer/10015918) |
| 4 | Texto generado por IA sin revisión humana | Curación y verificación manual; aportar contexto de creación | [5](https://support.google.com/publisherpolicies/answer/11112688), [2](https://developers.google.com/search/docs/fundamentals/using-gen-ai-content) |
| 5 | Páginas de "gracias", salida o error con anuncios | No monetizar pantallas "dead end": retirar el código o `noindex` | [5](https://support.google.com/publisherpolicies/answer/11112688) |
| 6 | Páginas creadas solo para mostrar anuncios o sin contenido base | Convertirlas en contenido real o eliminarlas | [1](https://support.google.com/adsense/answer/48182) |
| 7 | Falta política de privacidad o sin cláusulas de cookies de terceros | Publicarla divulgando cookies de terceros, web beacons e IP; enlazar a "How Google uses data" | [15](https://support.google.com/adsense/answer/9335564) |
| 8 | Navegación confusa, menús rotos, enlaces inexistentes | Menú alineado, legible, funcional y preciso; sin enlaces muertos ni falsas promesas de descarga | [17](https://support.google.com/adsense/answer/7299563), [1](https://support.google.com/adsense/answer/48182) |
| 9 | Anuncios que solapan navegación o tapan contenido | Reposicionar: sin overlay sobre menús/acciones, sin empujar el contenido fuera de pantalla | [15](https://support.google.com/adsense/answer/9335564) |
| 10 | Pop-ups, pop-unders o redirecciones que interfieren | Eliminarlos; no cambiar preferencias ni iniciar descargas | [1](https://support.google.com/adsense/answer/48182) |
| 11 | Navegación engañosa (anuncio con aspecto de menú o botón) | Separar visualmente anuncio y contenido; sin flechas ni etiquetas engañosas | [1](https://support.google.com/adsense/answer/48182) |
| 12 | Anuncios en pantallas sin contenido del editor | Contenido propio en cada pantalla monetizada | [5](https://support.google.com/publisherpolicies/answer/11112688) |
| 13 | ads.txt no encontrado o ID no autorizado | Publicar `google.com, pub-XXXXXXXX, DIRECT, f08c47fec0942fa0` en la raíz y "Check for updates" | [14](https://support.google.com/adsense/answer/12171612) |
| 14 | Sitio inaccesible, con login, sin redirección HTTPS o bloqueado en robots.txt | Publicarlo, permitir el crawler, SSL válido y HTTP→HTTPS | [13](https://support.google.com/adsense/answer/12176698) |
| 15 | Código ausente o mal colocado / en un sitio distinto al registrado | Insertarlo entre `<head>` y `</head>` en el sitio verificado correcto | [13](https://support.google.com/adsense/answer/12176698), [11](https://support.google.com/adsense/answer/91205) |
| 16 | Dominio/subdominio no elegible (`*.github.io`, `*.vercel.app`) | Mover a dominio propio | [16](https://support.google.com/adsense/answer/12170222) (oficial) + [18](https://dev.to/morinaga/why-google-adsense-will-not-approve-a-vercelapp-site-110b) (anecdótico) |
| 17 | Falta CMP certificada (EEA/UK/Suiza) o TCF desactualizado (v2.3) | Implementar/actualizar una CMP de la lista oficial y publicar el mensaje GDPR | [21](https://support.google.com/adsense/answer/13554116), [3](https://support.google.com/adsense/announcements/9189068) |
| 18 | Cookies colocadas antes del consentimiento | Configurar CMP y etiquetas para no leer/escribir cookies sin consentimiento | [23](https://support.google.com/adsense/answer/16758589) |
| 19 | Idioma principal no soportado | Usar un idioma de la lista (el español está soportado) | [30](https://support.google.com/adsense/answer/9727) |
| 20 | Tráfico no genuino (paid-to-click, autosurf, emails masivos, toolbars) | Eliminar esas fuentes; buscar tráfico orgánico real | [1](https://support.google.com/adsense/answer/48182) |
| 21 | Violación de políticas de contenido | Retirar el contenido infractor según la política concreta | [15](https://support.google.com/adsense/answer/9335564) |
| 22 | Tareas de cuenta incompletas (p. ej. datos de pago) | Completarlas; si no, el sitio no se revisa y queda en "Getting ready" | [16](https://support.google.com/adsense/answer/12170222) |
| 23 | Reenvíos excesivos recientes | Esperar la fecha que muestra el Policy center; no borrar y reañadir el sitio | [25](https://support.google.com/adsense/answer/7003627) |

---

## Lo que NO pude verificar

1. **Ningún umbral numérico oficial**: ni palabras por página, ni número de artículos, ni antigüedad mínima de dominio o sitio.
2. **Ningún ranking oficial de frecuencia de rechazos**; el "95-97%" viene de una guía comunitaria, no de Google.
3. **Ninguna regla oficial publicada que prohíba `*.github.io` u otros subdominios gratuitos**; solo el aviso de que "your site or subdomain might not yet be eligible" y evidencia anecdótica.
4. **Ningún límite numérico publicado de reintentos** (el "3 intentos" no está documentado).
5. **No encontré artículos de Search Engine Journal ni Search Engine Land** sobre rechazo por *low value content* en 2025-2026 con URL y fecha que pudiera citar; no les atribuyo afirmaciones que no he leído. Las fuentes de terceros que sí verifiqué son dev.to (6 may 2026, autoidentificado como asistido por IA) e IndieHackers (24 jun 2026), ambas anecdóticas.
6. **No encontré extensión de la obligación de CMP certificada** fuera de EEA/UK/Suiza a 2026.
7. **No existe restricción específica de impresión 3D**; mi nota sobre STL/copyright y modding es inferencia.
