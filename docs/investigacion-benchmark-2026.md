# Benchmark del mercado de impresión 3D (2026)

> Investigación de apoyo para [`docs/plan-adsense.md`](plan-adsense.md). Responde a
> «¿qué hace la competencia que sí monetiza, y qué le falta a este sitio?».
> Fecha de consulta: 2026-10-11. Lo no verificable se marca como tal en vez de rellenarse.

## 1. Referentes en inglés

| Sitio | Qué es | Autoría | Anuncios |
|---|---|---|---|
| [All3DP](https://all3dp.com/about-us/) | Reviews y listas | Nominal, con [página de autor](https://all3dp.com/authors/matthew-mensley/) | Sí, vía SSP externo (`cdn.fuseplatform.net` en su `/ads.txt`), no AdSense puro |
| [CNC Kitchen](https://cnckitchen.com/about) | Pruebas de resistencia con metodología | Stefan Hermann, ingeniería aeroespacial, declara cómo se financia | Patrocinios + afiliados + tienda |
| [Ellis' Print Tuning Guide](https://github.com/AndrewEllis93/Print-Tuning-Guide) | Guía de calibración mantenida en GitHub | Sí | Ninguno |
| [Prusa KB](https://help.prusa3d.com/es) / [Bambu Wiki](https://wiki.bambulab.com) | Base de conocimiento del fabricante | Corporativa | Ninguno (monetizan hardware) |
| [Teaching Tech](https://github.com/GadgetAngel/teachingtechYT.github.io) | `calibration.html`: calculadora interactiva en GitHub Pages | Sí | Ninguno |
| [r/3Dprinting](https://www.reddit.com/r/3Dprinting/) | Comunidad | — | Ad system propio |

## 2. Referentes en español

| Sitio | Volumen | Monetización | Autoría |
|---|---|---|---|
| [3Dnatives ES](https://www.3dnatives.com/es/publicidad-3dnatives/) | 1,3 M lectores únicos/mes en 5 idiomas | Media kit: publicidad, patrocinio, webinars | Medio B2B/industrial |
| [Bitfab](https://bitfab.io/es/blog/page/6/) | ~100-110 artículos (estimado por paginación) | Cursos, servicio | De marca |
| [Creality ES](https://store.creality.com/es/blogs/tutorial/problemas-impresion-3d) | Tutoriales por síntoma | Venta de impresoras | **Sin autoría nominal** |

**El hueco real:** las SERPs en español de «problemas de impresión 3D causas y
soluciones» y «guía de calibración» están copadas por bases de conocimiento de
fabricante (Prusa ES, Creality ES) y por traducciones automáticas de herramientas
SaaS. **No existe un equivalente en español de Ellis' Print Tuning Guide**: una guía
de diagnóstico independiente, fechada, con datos propios y autor identificable.

## 3. Qué comparten las páginas que rankean y monetizan

1.500–4.000 palabras en guías de diagnóstico; 8–25 **imágenes propias** (fallos
reales, no stock); tablas de parámetros por material; **calculadoras interactivas**
como imán de enlaces; fecha visible de publicación y actualización; **autoría nominal
con credenciales**; enlaces a fichas técnicas primarias.

Las tres palancas que más correlacionan con autoridad: **calculadora + datos de prueba
propios + autor con credenciales reales.**

Marco de Google aplicable: [contenido útil](https://developers.google.com/search/docs/fundamentals/creating-helpful-content)
(«¿quién, cómo, por qué?») y [políticas de spam](https://developers.google.com/search/docs/essentials/spam-policies)
(*scaled content abuse*, *scraped content*, *thin affiliate pages*).

## 4. Monetización: umbrales reales

| Red | Mínimo | Fuente |
|---|---|---|
| AdSense | Sin tráfico mínimo publicado; sí revisión de contenido | [Eligibility](https://support.google.com/adsense/answer/9724) |
| Mediavine | 50.000 sesiones/mes; desde enero 2026, programas por ingresos (Official desde 5.000 USD/año) | [Mediavine](https://help.mediavine.com/programs-and-the-publisher-path-to-growth) |
| Raptive | 25.000 pageviews/mes, dominio ≥6 meses, **50 % tráfico US/UK/CA/NZ/AU** | [Raptive](https://help.raptive.com/hc/en-us/articles/360032840891-Who-is-eligible-for-Raptive) |
| Ezoic | 250.000 usuarios activos/mes desde 2026-02-19 (hay Incubator) | [Ezoic](https://support.ezoic.com/kb/article/getting-started-ezoics-requirements) |
| Amazon Associates | Contenido original y público; 2,5 % PC, 3 % herramientas, 4 % resto | [Operating Agreement](https://affiliate-program.amazon.com/help/operating/agreement), [comisiones](https://affiliate-program.amazon.com/help/node/topic/GRXPHT8U84RAYDXZ) |

Alcanzabilidad para un sitio nuevo, de más a menos: **afiliación directa de tiendas de
filamento + AdSense**. Las redes premium son inalcanzables sin tráfico, y Raptive exige
mayoría de tráfico anglosajón, lo que excluye de hecho a un sitio en español.

## 5. Qué no hacer

- **Raspar o reescribir las wikis de fabricante.** Es *scraped content*. La licencia
  del contenido de Prusa KB / Bambu Wiki **no se ha verificado** y hay que comprobarla
  antes de reutilizar nada.
- **Reescribir fichas técnicas sin aportar nada**: *thin* + *scraped*.
- **«Top 10 impresoras» sin pruebas**: activa el sistema de opiniones, que exige
  evidencia de primera mano.
- **Traducción automática a escala** sin revisión humana.
- **Fotos de producto del fabricante** sin licencia.

## 6. Lo que no se pudo verificar

- Número de slots publicitarios por artículo en All3DP; su longitud media es
  estimación por inspección.
- Estado societario de All3DP en 2026; tráfico de Tom's Hardware.
- Recuento de artículos de Filament2Print (bloquea `fetch`, HTTP 403) y de Sicnova.
- Licencia del contenido de las wikis de Prusa y Bambu.
- Umbral práctico de Amazon Associates; la regla de «3 ventas en 180 días» no apareció
  en el texto oficial recuperado.
