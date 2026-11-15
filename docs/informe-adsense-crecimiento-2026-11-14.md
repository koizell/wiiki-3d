# Informe final — AdSense y crecimiento

**Fecha:** 2026-11-14
**Plan:** `docs/superpowers/plans/2026-11-12-adsense-crecimiento.md`
**Diseño:** `docs/superpowers/specs/2026-11-12-adsense-crecimiento-design.md`

## Resumen

El trabajo de esta sesión está **publicado y verificado en producción** (commits
`9c4b950`, `fe14424`, `6860cce` y `e5b6ac2`; último despliegue correcto:
`actions/runs/43657605789`). La aprobación de AdSense y el crecimiento orgánico no se
pueden declarar desde aquí: dependen de cuentas y de decisiones externas.

Lo que sí está hecho y comprobado: los cuatro agentes editoriales tienen contratos
nuevos con evidencia localizable, se añadió un estratega de crecimiento, se
corrigieron tres defectos reproducibles con su prueba, se ejecutó un piloto de
revisión sobre `warping-pla` que encontró y corrigió errores reales, se publicaron 28
puentes para las rutas legacy de Blogger, y todas las verificaciones del proyecto
pasan sobre un build fresco.

El diagnóstico de Search Console está cerrado: 30 páginas indexadas y 71 no
indexadas. De las no indexadas, sólo dos grupos requieren trabajo —16 errores de
redirección y 10 errores 404, casi todos rutas del blog antiguo—; el resto son
normalizaciones de GitHub Pages y páginas nuevas que Google todavía no ha rastreado.

## 1 · Qué se ha implementado

### Agentes editoriales

Reescritos en sintaxis OpenCode V2 (`permissions` como lista de reglas, sin modelo
fijo, sin `temperature`):

- `recolector`: exige cuerpo útil, URL final, fecha, vigencia y alcance; no acepta
  una página 200 con sólo navegación; declara cobertura y huecos.
- `cocinero`: afirmaciones con ID `A-###`, cita literal, archivo, URL, localización,
  tipo, alcance, vigencia y confianza; conserva contradicciones; separa inferencias.
- `redactor`: sólo escribe desde `wiki/cooked/`; trazas `// evidencia: A-###`; cuatro
  etapas; no inventa autoría ni fechas; ejecuta `verify:guias`.
- `revisor`: comprueba contra `wiki/raw/`, no sólo contra cooked; seis
  comprobaciones; dos iteraciones máximo; informe en `wiki/reviews/`.
- `estratega`: nuevo; convierte exports de GSC/GA4 en briefs priorizados; no
  inventa métricas y no escribe guías.

Runbook: `docs/runbook-agentes-editoriales.md`.
Brief del piloto: `docs/briefs/warping-pla-revision.md`.

### Correcciones técnicas

1. **Barra final en rutas canónicas.** `src/App.tsx` normaliza el `pathname` antes
   de compararlo con `RUTAS_DESPLAZABLES`. Antes, entrar por `/privacidad/` dejaba
   la página sin la columna desplazable. Prueba: `scripts/verify/seo.mjs` comprueba
   la clase `app-container--columna` con la URL real.
2. **`datePublished` inventado.** `src/lib/seo.ts` ya no publica `datePublished`;
   sólo `dateModified`, que es la fecha real de revisión. Prueba:
   `scripts/verify/seo.mjs` exige `datePublished === undefined`.
3. **Descripción del autor desactualizada.** Decía «las diez publicadas»; ahora no
   fija un número que el tiempo vuelve falso.

### Piloto editorial

Se revisó `warping-pla` contra las nueve fuentes crudas. La iteración 1 fue
**RECHAZADA** con tres fallos bloqueantes:

- dos citas entrecomilladas que no eran literales;
- la regla de abrir la cámara se aplicaba a ABS/PC y explicaba la causa al revés.

También se encontraron dos fallos importantes (cuatro fuentes omitidas y un
autoenlace) y una deuda (el cooked no tiene IDs `A-###`). Se corrigió la guía con
las fuentes existentes, sin inventar material nuevo, y la iteración 2 fue
**APROBADA**. Informes:

- `wiki/reviews/warping-pla-2026-11-14.md`
- `wiki/reviews/warping-pla-2026-11-14-iteracion-2.md`

La aprobación es local: la hizo la misma sesión porque el subagente revisor no pudo
arrancar por el límite de uso del proveedor. No sustituye a una revisión
independiente de otra persona.

### Redirecciones legacy y favicon

Search Console mostró 16 «Errores de redirección» y 10 «404». La causa no era el
sitemap: el dominio antiguo `www.wiiki-3d.com` hace un 301 que **conserva la ruta**
hacia `wiiki-3d.com`, y esa ruta ya no existe; la cadena termina en 404. GitHub Pages
no permite redirecciones de servidor, así que se generan 28 páginas puente estáticas
en el export (`scripts/redirecciones-legacy.mjs`): `canonical`, `meta refresh` a la
guía equivalente y enlace visible. No llevan `noindex`, porque un noindex puede hacer
que Google ignore el refresco. Los temas sin guía equivalente apuntan a `/wiki/`, no
a la portada. Se añadió `verify:redirecciones` (5 comprobaciones) al build y al
workflow, y un `favicon.ico` real para cerrar el 404 de `/favicon.ico`.

Las 12 «Páginas con redirección», las 8 «Alternativas canónicas», la única bloqueada
por `robots.txt` y las 13 «Descubiertas sin indexar» son normales en un sitio joven:
no se tocan.

## 2 · Pruebas ejecutadas

| Comprobación | Resultado |
|---|---|
| `npm run lint` | Sin errores |
| `npm run build` | 43 páginas exportadas, 41 URLs, 2 noindex |
| `npm run verify:guias` | 1124/1124 |
| `npm run verify:contenido` | Todas pasan; 0 porqués largos, 0 tarjetas sin puntos |
| `npm run verify:seo` | 467/467 |
| `npm run verify:dist` | 220/220 + 5/5 de redirecciones |
| `npm run verify:redirecciones` | 5/5; 28 rutas, 16 destinos distintos |
| `npm run verify:revision` | 16/16 |
| `npm run verify:revision-selftest` | 17/17 mutaciones detectadas |
| `git diff --check` | Sin errores |
| `git diff --stat wiki/raw/` | Vacío |
| JSON-LD local | 0 `datePublished`, 33 `dateModified` |

Producción comprobada con `curl`: `/`, `/wiki/`, `/taller/`, `/acerca-de/`,
`/contacto/`, `/privacidad/`, `/autor/`, `/maquinas/`, `/wiki/warping-pla/`,
`/wiki/material/`, `/wiki/slicer/`, `robots.txt`, `ads.txt` y `sitemap.xml`
devuelven 200; una URL inexistente devuelve 404. Las 41 URLs del sitemap responden
200 y ninguna publica `datePublished`. Los 28 puentes devuelven 200 con canonical y
refresco al destino; la cadena completa `www` → ápice → guía funciona en navegador
(probada con Playwright en cuatro rutas). `/favicon.ico` devuelve 200 como
`image/vnd.microsoft.icon` y el sitemap sigue teniendo 41 URLs, sin puentes.

## 3 · AdSense: qué está listo y qué no

**Listo en el repositorio:**

- contenido propio y navegación clara;
- autoría de publicación y páginas de información;
- privacidad que declara cookies de terceros y enlaza a Google;
- Consent Mode v2 en `denied` antes de la etiqueta;
- `ads.txt`, meta de verificación y sitemap;
- ninguna unidad de anuncio durante la revisión.

**Pendiente y fuera de este repositorio:**

- publicar un mensaje CMP europeo en AdSense;
- solicitar la revisión del sitio;
- completar datos fiscales y de pago;
- confirmar que la cuenta no tiene incidencias.

No hay forma de verificar desde aquí si la cuenta está aprobada. **Un sitio
preparado no es un sitio aprobado.**

## 4 · Medición y crecimiento

El informe completo está en `docs/investigacion-crecimiento-2026-11-13.md`.
Resumen:

- GA4 `G-6W0LKP3ETS` envía el `page_view` inicial. Las navegaciones SPA dependen de
  la medición mejorada de historial, que se configura en la interfaz de GA4. **No se
  cambia el código a ciegas**: primero hay que comprobar esa opción.
- Search Console tiene el sitemap correcto, con 41 URLs y última lectura el 11-nov.
  El diagnóstico de indexación está hecho (30 indexadas, 71 no indexadas) y las
  causas accionables ya están corregidas; queda esperar el re rastreo. GA4 y AdSense
  siguen sin inspeccionar con acceso autenticado.
- El benchmark (Ellis, All3DP, Prusa KB, Bambu Wiki) deja un hueco claro: nadie en
  español combina trazabilidad afirmación→fuente con una guía que calcula la
  recomendación según el montaje.
- El plan de 28 días prioriza corregir títulos/descripciones con datos, enlazar por
  síntoma y añadir una prueba reproducible a la guía líder. No se propone producir
  contenido en masa.

## 5 · Bloqueos externos

1. **Sin acceso autenticado a AdSense y GA4.** Search Console se pudo leer con la
   sesión del navegador, pero sigue sin verificar la recepción de eventos ni la
   aprobación de AdSense.
2. **El subagente revisor no pudo arrancar** por `Free usage limit reached`. El
   piloto se completó a mano; la limitación queda declarada.
3. **`graphify` no está instalado.** No se pudo ejecutar `graphify update .`; no hay
   `graphify-out/` que actualizar.

## 6 · Qué no se ha tocado

- `wiki/raw/` no tiene ninguna modificación.
- `opencode.json` sigue con los cambios previos del usuario; no se ha editado.
- Los directorios no versionados `public/wiki/{material,max-volumetric-speed,...}`
  se han preservado. Sus imágenes no se referencian desde las guías y no se han
  borrado.
- Se publicaron cuatro commits en `main`: `9c4b950` (agentes y documentación),
  `fe14424` (rutas, fechas y piloto), `6860cce` (reintento de CI) y `e5b6ac2`
  (puentes legacy y favicon). No se ha validado ninguna corrección dentro de Search
  Console.

## 7 · Próximos pasos recomendados

1. En Search Console, esperar el re rastreo de las 16 URLs con error y comprobar que
   bajan; si se quiere acelerar, pulsar «Validar corrección» es una acción de la
   cuenta, no del repositorio.
2. En GA4, comprobar la medición mejorada de historial antes de tocar el código.
3. En AdSense, publicar el mensaje CMP y solicitar la revisión.
4. Cuando haya datos, ejecutar el plan de 28 días del informe de crecimiento.
5. En la próxima actualización de `warping-pla`, retrofitear los IDs `A-###` del
   cooked para que la traza sea reutilizable.
