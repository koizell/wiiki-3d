# Informe de la revisión de AdSense — 2026-10-19

> **Qué es este documento.** La evidencia de qué encuentra un revisor en cada
> página del sitio, con cifras medidas y no estimadas, y el estado de cada
> punto de la lista de congelación del plan 60 (§2.1).
>
> **Cómo se reproduce todo.** Los comandos están en §8. La tabla de cifras sale
> de `scripts/verify/investigacion/cifras-revision.mjs`, y la comprobación de
> que el sitio cumple lo que se dice aquí es `npm run verify:revision`.
>
> **Ciclo:** C0 · Blindaje de la revisión. Rama `ciclo/c0-blindaje`.

---

## 1 · El resumen

| Dato | Valor | Cómo se midió |
|---|---:|---|
| Páginas exportadas | **40** (39 rutas + `404.html`) | `npm run build` |
| URLs en el sitemap | **37** (2 con `noindex` fuera: `/historial/`, `/proyectos/`) | `dist/sitemap.xml` |
| Guías publicadas | **29** | `src/lib/guias.ts` |
| Palabras visibles | **84.471** | `cifras-revision.mjs` (el método está en el script) |
| Enlaces de fuente en las guías | **178** | `cifras-revision.mjs` |
| Acciones («qué cambiar») en las guías | **503** | `cifras-revision.mjs` |
| Guías con menos de 800 palabras | **0** | `cifras-revision.mjs` |
| Guías con 0 acciones | **0** | `cifras-revision.mjs` |
| Guías por encima de 1.500 palabras | **22 de 29** | `cifras-revision.mjs` |
| Imágenes en las guías | **3**, todas en `torre-temperatura` (el piloto SVG) | `cifras-revision.mjs` |
| Unidades de anuncio | **0** | `verify:revision` |
| `<iframe>` | **0** | `verify:revision` |
| Rutas del sitio publicado | **28 de 28** en 200 | sonda HTTP |

**El sitio no es una pantalla sin contenido.** Hay 39 páginas, 29 guías con
fuentes y con la cuarta etapa poblada, y 84.471 palabras que se leen sin
ejecutar JavaScript.

---

## 2 · Lo que hay en cada página

La tabla completa sale de `cifras-revision.mjs`. Las cifras de «palabras» son
las que lee una persona: sin etiquetas, sin scripts, sin el menú.

### Las páginas de sección

| Ruta | Palabras | Fuentes | Imágenes | Qué encuentra el revisor |
|---|---:|---:|---:|---|
| `/` | 1.755 | 0 | 0 | Portada con título, tres síntomas que abren la wiki, los módulos y las preguntas frecuentes. Enlazada a las 29 guías. |
| `/wiki/` | 1.237 | 0 | 0 | El índice de la wiki, con buscador y las 29 guías. |
| `/privacidad/` | 859 | 8 | 0 | La política de privacidad, con las cláusulas que AdSense exige (§4). |
| `/maquinas/` | 699 | 14 | 0 | El catálogo de 8 impresoras, cada campo con su fuente. |
| `/autor/` | 419 | 0 | 0 | Quién escribe y con qué criterio. |
| `/acerca-de/` | 323 | 0 | 0 | El método de trabajo. |
| `/taller/` | **249** | 0 | 0 | La calculadora de coste, explicada. **Es la página más corta del sitio** (§6). |
| `/contacto/` | 100 | 0 | 0 | Canal de contacto. Google no exige esta página: es E-E-A-T, no requisito. |
| `/historial/` | 131 | 0 | 0 | `noindex`. Son los datos del visitante, no contenido del editor. |
| `/proyectos/` | 121 | 0 | 0 | `noindex`. Ídem. |

### Las 29 guías

| Ruta | Palabras | Fuentes | Acciones | Actualizado |
|---|---:|---:|---:|---|
| `/wiki/tolerancias-y-encaje/` | 6.604 | 7 | 31 | 2026-10-17 |
| `/wiki/despegue-a-mitad/` | 5.235 | 6 | 40 | 2026-10-16 |
| `/wiki/agujeros-ovalados/` | 3.940 | 7 | 24 | 2026-10-16 |
| `/wiki/piezas-grandes-grietas/` | 3.957 | 8 | 41 | 2026-10-16 |
| `/wiki/torre-temperatura/` | 3.833 | 5 | 26 | 2026-10-17 |
| `/wiki/elephant-foot/` | 3.802 | 7 | 26 | 2026-10-16 |
| `/wiki/flow-rate/` | 3.300 | 10 | 24 | 2026-10-16 |
| `/wiki/slicer/` | 3.240 | 9 | 10 | 2026-10-13 |
| `/wiki/adhesion-primera-capa/` | 3.061 | 8 | 12 | 2026-10-11 |
| `/wiki/relleno-patrones/` | 2.831 | 6 | 25 | 2026-10-17 |
| `/wiki/placas/` | 2.819 | 6 | 21 | 2026-10-16 |
| `/wiki/voladizos-y-soportes/` | 2.869 | 3 | 15 | 2026-10-11 |
| `/wiki/brim-y-skirt/` | 2.788 | 6 | 15 | 2026-10-16 |
| `/wiki/esquinas-petg/` | 2.753 | 8 | 25 | 2026-10-16 |
| `/wiki/malla-de-cama/` | 2.681 | 7 | 12 | 2026-10-16 |
| `/wiki/capas-desplazadas/` | 2.537 | 8 | 22 | 2026-10-16 |
| `/wiki/paredes-y-perimetros/` | 2.417 | 7 | 16 | 2026-10-17 |
| `/wiki/orientacion-resistencia/` | 2.183 | 6 | 15 | 2026-10-17 |
| `/wiki/warping-pla/` | 1.988 | 5 | 13 | 2026-10-11 |
| `/wiki/piezas-curvadas-z/` | 1.937 | 3 | 15 | 2026-10-17 |
| `/wiki/stringing/` | 1.908 | 3 | 9 | 2026-10-18 |
| `/wiki/max-volumetric-speed/` | 1.766 | 6 | 9 | 2026-10-17 |
| `/wiki/ventilador-warping/` | 1.701 | 8 | 7 | 2026-10-16 |
| `/wiki/temperatura-cama/` | 1.652 | 6 | 9 | 2026-10-11 |
| `/wiki/enclosure-y-warping/` | 1.561 | 5 | 9 | 2026-10-11 |
| `/wiki/separaciones-entre-capas/` | **1.456** | 5 | 7 | 2026-10-11 |
| `/wiki/altura-capa/` | **1.368** | 4 | 7 | 2026-10-11 |
| `/wiki/material/` | **1.306** | 4 | 9 | 2026-10-11 |
| `/wiki/temperatura-hotend/` | **1.079** | 5 | 9 | 2026-10-11 |

**Las cuatro en negrita son las que quedan por debajo de 1.500 palabras.** Son
exactamente las cuatro que el ciclo C2 tiene como objetivo, y las cuatro tienen
material cocinado sin usar para crecer.

---

## 3 · El defecto que encontró este ciclo

**`/wiki/stringing/` devolvía 404 en producción.**

La guía `stringing` se escribió, se revisó y se commitó (`ff9944d`), pero su
línea de registro en `src/lib/guias.ts` no entró en ese commit. Sin esa línea
la guía no se exporta: no hay página, no hay enlace y el sitemap no la
menciona. El sitemap de producción tenía **36 URLs** en vez de 37.

No lo detectó ninguna de las 17 comprobaciones que había, y no es casualidad:
todas miraban lo que estaba publicado, y lo que estaba publicado era
consistente consigo mismo. La comprobación que faltaba es la que mira **el
registro contra el disco**, y es la primera de `verify:revision`.

Corregido en `1ff10c2`.

---

## 4 · La política de privacidad, contra lo que AdSense exige

La política exige, con su texto literal, que el editor tenga una política que
"clearly discloses any data collection, sharing, and usage... including your
use of cookies, web beacons, IP addresses, or other identifiers", y en
particular que "**third parties may be placing and reading cookies** on your
users' browsers".

| Cláusula | Estado | Dónde |
|---|---|---|
| Que haya terceros que colocan y leen cookies | ✅ | «Con los anuncios activos, **terceros —incluido Google— podrán colocar y leer cookies** en tu navegador, junto con identificadores de terceros» |
| Enlace a «cómo usa Google la información de los sitios» | ✅ | `<a href="https://policies.google.com/technologies/partner-sites">` |
| Cookies de terceros y web beacons | ✅ | Sección «Cookies y seguimiento» |
| Dirección IP y datos de conexión | ✅ | «GitHub Pages… puede registrar datos de conexión —dirección IP, agente de navegador y la página pedida—» |
| Identificadores de terceros | ✅ | «junto con identificadores de terceros» |
| Responsable del tratamiento y contacto | ✅ | `contacto@wiiki-3d.com`, con enlace `mailto:` |
| Base legal | ✅ | Sección «Finalidad y base legal», una base legal por finalidad |
| Conservación | ✅ | Sección «Conservación» |
| Transferencias internacionales | ✅ | Sección «Destinatarios y transferencias internacionales» |
| Que hoy no hay publicidad | ✅ | «**Hoy esta aplicación no muestra publicidad.** El sitio está en revisión de Google AdSense y ya carga su etiqueta… pero no sirve ningún anuncio» |

**La última fila es la que hay que mirar dos veces.** Si mañana se pone un
anuncio, esa frase se queda y la página miente. `verify:revision` comprueba
que las dos cosas van juntas: **si hay unidades de anuncio, la frase tiene que
haber desaparecido**, y si no las hay, la frase tiene que estar.

---

## 5 · La congelación, comprobada por código

Los ocho puntos del plan 60 §2.1, y dónde está cada uno:

| # | Congelado | Cómo se comprueba |
|---|---|---|
| F1 | Ninguna unidad de anuncio | `verify:revision`: ni `adsbygoogle.push()`, ni `<ins class="adsbygoogle">`, ni `<iframe>` en las 40 páginas exportadas |
| F2 | No borrar ni volver a añadir el sitio en AdSense | Es una acción en la cuenta, no en el código. Queda escrito en el plan y en `docs/mapa-anuncios.md` |
| F3 | La privacidad no afirma publicidad activa | `verify:revision`: la frase y las unidades de anuncio van juntas |
| F4 | No cambiar la estructura de páginas | `verify:revision`: el sitemap coincide con lo exportado, y toda guía registrada tiene página |
| F5 | No mandar datos a un servidor propio sin actualizar privacidad | Bloqueado por el plan: el ciclo C7 empieza por reescribir la privacidad |
| F6 | No tocar `wiki/raw/` | `git diff wiki/raw/` antes de cada commit |
| F7 | No tocar el módulo `maquinas` | No se ha tocado |
| F8 | No bajar umbrales | Ninguna comprobación de este ciclo baja un umbral |

Y una más, que no estaba en la lista y ahora sí:

> **F9 · Ninguna guía escrita puede quedar sin publicar.** La comprueba
> `verify:revision`, contra el registro y contra el disco. Es la que habría
>pillado el 404 de `stringing`.

---

## 6 · Lo que todavía no está

| Qué | Estado | Por qué |
|---|---|---|
| **Mensaje europeo de la CMP publicado** | **Pendiente, y sólo lo puede hacer el titular de la cuenta** | Es una acción dentro de AdSense → «Privacidad y mensajes». El sitio ya está listo: etiqueta de AdSense + Consent Mode v2. Para probarlo: `https://wiiki-3d.com/?fc=alwaysshow&fctype=gdpr`, en incógnito |
| **`/taller/` con 249 palabras** | El plan del 11-oct daba 741; la cifra real es **249** | El DoD de «atraer» es que `/taller/` sea un activo enlazable. Con 249 palabras es la página más corta del sitio. Entra en el ciclo C2 |
| **`/acerca-de/` con 323 palabras** | El DoD pedía ~600 | Entra en el ciclo C2 |
| **4 guías por debajo de 1.500 palabras** | 22 de 29 la superan | Las cuatro son el objetivo de C2 |
| **Imágenes propias: 3, todas de un piloto** | El sitio tiene 0 fotos y 0 ilustraciones fuera de `torre-temperatura` | Ciclo C3 |
| **Sin eventos de retención** | No hay forma de saber si un visitante llega al final | Ciclo C6 |

**Las cifras del plan del 11-oct que han resultado equivocadas**, y que quedan
corregidas aquí: `/taller/` no tiene 741 palabras sino 249, y `/acerca-de/`
tiene 323. Las dos están medidas con el método de
`cifras-revision.mjs`, que es el mismo para todas las páginas.

---

## 7 · La sonda del sitio publicado

28 de 28 rutas en 200, el 19 de octubre de 2026:

```
200  /            200  /privacidad/     200  /proyectos/    200  /sitemap.xml
200  /wiki/       200  /contacto/       200  /historial/    200  /robots.txt
200  /taller/     200  /acerca-de/      200  /maquinas/     200  /ads.txt
200  /autor/      200  /404.html
```

Las 28 guías del sitemap de producción devuelven 200. **Pendiente de repetir
después del despliegue de este ciclo**, que añade la 29ª (`stringing`).

---

## 8 · Cómo repetir todo esto

```bash
npm run build                                  # 40 páginas, sitemap de 37 URLs
npm run verify:revision                        # 16/16: la congelación, en código
npm run verify:revision-selftest               # 17/17: cada comprobación se ve fallar
node scripts/verify/investigacion/cifras-revision.mjs   # la tabla de cifras

# El sitio publicado
for u in / /wiki/ /taller/ /privacidad/ /contacto/ /acerca-de/ \
         /maquinas/ /autor/ /proyectos/ /historial/ /sitemap.xml \
         /robots.txt /ads.txt; do
  curl -s -o /dev/null -w "%{http_code}  https://wiiki-3d.com$u\n" -L "https://wiiki-3d.com$u"
done

# El aviso de la CMP, una vez publicado
# https://wiiki-3d.com/?fc=alwaysshow&fctype=gdpr  (en incógnito)
```

---

## 9 · Lo que este informe no dice

- **No dice que el sitio vaya a aprobar.** Dice qué hay, con cifras. La
  decisión la toma el revisor.
- **No comprueba que las cifras técnicas sean verdaderas.** De eso se ocupa el
  pipeline (`recolector` → `cocinero` → `redactor` → `revisor`), y cada guía
  tiene su informe de revisión en `wiki/reviews/`.
- **No comprueba la disponibilidad de las fuentes externas.** Los 178 enlaces
  de fuente se comprobaron como enlaces con destino interno o externo
  (`verify:enlaces`), no como páginas que respondan hoy.
