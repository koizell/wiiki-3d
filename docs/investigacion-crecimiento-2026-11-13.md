# Crecimiento y competencia — auditoría del 2026-11-13

**Qué es este documento:** la foto del sitio que se puede comprobar hoy, el
benchmark de competencia consultado y las tácticas que se pueden aplicar sin
inventar datos ni producir contenido en masa.

**Qué no es:** un informe de tráfico. No hay export de Search Console ni de GA4 en
este repositorio, así que **no hay una sola cifra de sesiones, impresiones o CTR**
en este documento. Cualquier número de ese tipo sería inventado.

---

## 1 · Estado real del sitio

Comprobado contra el build local del 2026-11-13 y contra producción con `curl`:

| Comprobación | Resultado |
|---|---|
| Páginas exportadas | 44 |
| URLs indexables en `dist/sitemap.xml` | 41 |
| Páginas `noindex` | 2 (`/historial`, `/proyectos`) + 404 |
| Guías publicadas | 33 |
| `canonical` con barra final | Sí, en todas las rutas de GitHub Pages |
| `robots.txt` | `Allow: /` + sitemap declarado |
| `ads.txt` | `google.com, pub-1976099124866284` |
| Meta de verificación AdSense | `ca-pub-1976099124866284` |
| Consent Mode v2 | Los cuatro parámetros en `denied` por defecto, antes de la etiqueta |
| Unidades de anuncio | **Ninguna** (deliberado mientras dure la revisión) |
| GA4 | `G-6W0LKP3ETS`, `gtag('config')` en `index.html` |
| Producción | 200 en `/`, `/wiki/`, guías, información, `robots.txt`, `ads.txt`, `sitemap.xml`; 404 real en URL inexistente |

Producción sigue sirviendo el despliegue del **22-oct-2026**: los cambios locales de
esta sesión no están publicados. El `last-modified` de GitHub Pages lo confirma.

### Lo que esto significa para AdSense

La parte técnica que depende del sitio está preparada: contenido propio, navegación,
autoría de publicación, política de privacidad que menciona cookies de terceros,
consentimiento antes de la etiqueta, `ads.txt`, sitemap y páginas de información.
**No hay ninguna señal de que la cuenta esté aprobada**, y no se puede comprobar
desde aquí. Quedan pasos que exigen la cuenta:

1. Publicar un mensaje CMP europeo (Google CMP o CMP certificada) en AdSense.
2. Solicitar la revisión del sitio.
3. Tener la cuenta, los datos fiscales y el método de pago completos.
4. No introducir unidades de anuncio hasta que la revisión termine.

Un sitio preparado no es un sitio aprobado. El informe final separa las dos cosas.

---

## 2 · Medición: lo que hay y lo que falta

### GA4

`index.html` envía el `page_view` inicial al ejecutar `gtag('config', …)`. Las
navegaciones internas de una SPA **no generan un `page_view` por sí solas**: GA4 las
recoge sólo si está activa la medición mejorada «Page changes based on browser
history events» (activada por defecto en muchos flujos), y esa configuración vive en
la interfaz de GA4, no en el repositorio.

Consecuencia práctica: antes de tocar código hay que abrir GA4 → Administrar → Flujos
de datos → Medición mejorada y comprobar si esa opción está activa. Si se implanta el
patrón explícito (`send_page_view: false` + `page_view` manual en cada cambio de
ruta), hay que desactivarla el mismo día o se cuentan las páginas dos veces. Sin
acceso a la cuenta no se puede verificar ninguna de las dos cosas, así que **no se
cambia el código de medición a ciegas**.

Eventos que merece la pena definir cuando haya acceso:

- `page_view` por ruta (si se opta por el envío explícito).
- `guia_variable` al contestar una variable de una guía.
- `guia_accion_visible` cuando aparece al menos una acción calculada.
- `gcode_analizado` al completar un análisis.
- `taller_calculo` al calcular coste.
- `outbound_click` en los enlaces a fuentes externas.

### Search Console

El sitemap publicado tiene 41 URLs y responde 200. Lo que falta es la comprobación
autenticada: que GSC lo haya leído, cuántas URLs están indexadas y qué consultas
reciben impresiones. Eso no se puede deducir del HTML.

### Métricas de los primeros 28 días

Sin línea base no hay mejora que demostrar. Cuando haya export, la revisión a 28 días
debe mirar:

| Métrica | Dónde | Para qué |
|---|---|---|
| Impresiones y clics por página | GSC → Rendimiento | Detecta páginas que aparecen pero no se pulsan |
| CTR por consulta | GSC | Título y descripción que no responden a la intención |
| Posición media | GSC | Distingue «no existe» de «existe y está lejos» |
| Páginas indexadas / excluidas | GSC → Indexación | Comprueba que el sitemap se lee y no hay canibalización |
| Sesiones orgánicas | GA4 | Tráfico real, no impresiones |
| Páginas por sesión y eventos de guía | GA4 | Si la guía se usa o sólo se rebota |
| Core Web Vitals | GSC | La plantilla no debe penalizar en móvil |

---

## 3 · Competencia: qué hacen y qué se puede copiar

Consultado el 2026-11-13. No se copian cifras de tráfico de terceros porque no hay
una fuente verificable.

### Ellis' Print Tuning Guide (`ellis3dp.com/Print-Tuning-Guide`)

Referencia técnica del nicho. Método paso a paso, herramientas interactivas
(generador de G-code para pressure advance), pruebas descargables, páginas de
troubleshooting y honestidad sobre errores frecuentes. Su autoridad no viene de
escribir más, sino de **datos de prueba propios y un método reproducible**.

**Aplicable:** convertir cada guía en un procedimiento con una prueba que se pueda
repetir; publicar el antes/después; enlazar la herramienta desde la guía. No hay un
equivalente claro en español para este nivel de detalle.

### All3DP (`all3dp.com/es/`)

Listas, comparativas y noticias con mucho interlinking y actualización frecuente.
Sirve para descubrimiento, no para resolver un problema concreto.

**Aplicable:** enlaces internos entre guías y una portada que agrupe por síntoma. **No
aplicable:** competir en volumen de noticias o comparativas sin datos propios.

### Prusa Knowledge Base (`help.prusa3d.com/es/`)

Documentación oficial por problema, categorías de troubleshooting y enlaces a
producto. Estructura muy clara y confianza de fabricante.

**Aplicable:** una URL por problema, con el síntoma en el título y el alcance en la
primera frase. **No aplicable:** su autoridad de fabricante; wiiki-3d no la tiene y no
debe fingirla.

### Bambu Lab Wiki (español)

Guías visuales por máquina y material: primera capa, spaghetti, artefactos por capas.
Muy específicas.

**Aplicable:** alcance por máquina/versión y recursos visuales propios. **No
aplicable:** copiar sus capturas o sus cifras sin citarlas.

### `control3d.com`

El dominio está en venta (HugeDomains). No es un competidor activo y no debe usarse
como referencia ni enlazarse.

### El hueco que queda

Nadie de los anteriores escribe en español con **trazabilidad afirmación → fuente →
fecha** y con una guía que **calcula** la recomendación según el montaje. Eso ya es
la propuesta de wiiki-3d; el trabajo pendiente es demostrarlo con pruebas y no con
más páginas.

---

## 4 · Tácticas aplicables, por orden de retorno

### P0 · Antes de pedir la revisión

1. **Cerrar la cadena de confianza.** Página de autor que diga quién responde, cómo
   se corrige un error y con qué método se revisa una guía. Ya existe `/autor/`; hay
   que comprobar que no promete credenciales que no hay.
2. **Revisar títulos y descripciones de las guías con más intención de búsqueda.**
   Son la corrección más barata cuando GSC muestre impresiones sin clics.
3. **Enlazado interno por síntoma.** Cada guía debe llevar a la guía vecina que
   descarta el diagnóstico equivocado. El diferencial ya lo hace; faltan enlaces en
   el cuerpo y desde la portada.
4. **Imágenes propias y fechas reales.** Ya hay ilustraciones. No se añade una fecha
   nueva si el contenido no cambió.
5. **Comprobar la política de privacidad contra lo que el sitio hace hoy**, no contra
   lo que hacía en octubre. `verify:revision` ya lo prueba.

### P1 · Cuando haya datos

6. **Reescribir sólo las páginas con impresiones y CTR bajo.** No las 33.
7. **Añadir una prueba reproducible a las guías que más tráfico reciban** (torre de
   temperatura, flow rate, pressure advance). Una foto del resultado vale más que
   tres párrafos.
8. **Actualizar por versión de slicer/máquina** sólo donde la versión cambie la
   recomendación. Una guía de 2024 sigue siendo válida si dice a qué versión aplica.
9. **Distribución útil:** responder en comunidades con el enlace a la guía cuando
   resuelva la pregunta, sin spam y sin enlaces automáticos. Foros de Prusa, grupos
   hispanos de impresión 3D, repositorios de perfiles. Medir con `outbound` no; medir
   con sesiones de referencia.
10. **Una página de método** que explique cómo se cocina una fuente y cómo se revisa.
    Es contenido de confianza, no de relleno, y responde a la pregunta «¿por qué te
    creo?».

### Lo que no se hace

- Publicar 30 artículos generados para llenar el sitemap. Es la política de *scaled
  content abuse* y es el camino más rápido a un rechazo.
- Comprar enlaces, intercambiar enlaces en masa o usar redes de blogs.
- Poner unidades de anuncio antes de la aprobación.
- Inventar cifras de tráfico, volúmenes de búsqueda o resultados de pruebas.
- Copiar tablas de fabricantes sin citar la fuente y la fecha.

---

## 5 · Agrupaciones de consultas y enlaces internos

No hay volúmenes de búsqueda verificables, así que esto es un mapa de **intención**,
no una predicción de tráfico. Los slugs existen todos en `src/lib/guias.ts`.

| Grupo | Guía de entrada | Guías que deben enlazarse entre sí |
|---|---|---|
| La pieza se levanta | `warping-pla` | `ventilador-warping`, `enclosure-y-warping`, `temperatura-cama`, `placas`, `separaciones` |
| La pieza se rompe o se abre | `separaciones` | `capas-desplazadas`, `temperatura-hotend`, `flow-rate`, `paredes-y-perimetros` |
| Primera capa | `adhesion-primera-capa` | `malla-de-cama`, `brim-y-skirt`, `altura-capa`, `elephant-foot`, `placas` |
| Calibración | `ruta-de-calibracion` | `flow-rate`, `max-volumetric-speed`, `torre-temperatura`, `stringing`, `pressure advance` (si se publica) |
| Material | `material` | `secar-filamento`, `tpu-flexible`, `temperatura-cama`, `temperatura-hotend` |
| Acabado y dimensiones | `tolerancias-y-encaje` | `agujeros-ovalados`, `piezas-curvadas-z`, `z-seam`, `paredes-y-perimetros` |

**Regla de enlace:** un enlace interno sólo se añade si ayuda a tomar la decisión, no
para subir el número de enlaces. El texto del enlace dice el síntoma, no «haz clic
aquí».

---

## 6 · Plan de 28 días

### Semana 1 — línea base

- Exportar de GSC: consultas, páginas, países, dispositivos, 28 días.
- Exportar de GA4: páginas de entrada, sesiones orgánicas, eventos.
- Comprobar en GSC que el sitemap está leído y cuántas URLs están indexadas.
- Comprobar en GA4 si la medición mejorada de historial está activa.

### Semana 2 — correcciones baratas

- Títulos y descripciones de las 5 páginas con más impresiones y peor CTR.
- Enlaces internos del grupo con más tráfico.
- Revisar que las guías con imagen no tengan la imagen rota en producción.

### Semana 3 — una prueba propia

- Elegir la guía con más demanda y añadirle una prueba reproducible (temperatura,
  flujo o primera capa), con foto y condiciones.
- No tocar las demás.

### Semana 4 — medir y decidir

- Comparar con la línea base: impresiones, CTR, posición, sesiones, eventos.
- Decidir una sola cosa: qué guía se actualiza, qué título se cambia o qué enlace
  falta. No abrir diez frentes.

**Criterio de éxito a 28 días:** al menos una página con mejora medible de CTR o
posición, y cero páginas nuevas publicadas sin evidencia. La aprobación de AdSense no
es una métrica de contenido y no se promete.

---

## 7 · Backlog priorizado

| Prioridad | Tarea | Por qué |
|---|---|---|
| P0 | Verificar en GSC el sitemap y la indexación | Sin esto no se sabe si el problema es contenido o rastreo |
| P0 | Confirmar en GA4 el envío de `page_view` en navegación SPA | Sin esto las páginas vistas están subcontadas o duplicadas |
| P0 | Publicar CMP y solicitar revisión de AdSense | Único paso que desbloquea la monetización |
| P1 | Revisar títulos/descripciones con datos de GSC | Corrección más barata |
| P1 | Añadir prueba reproducible a la guía líder | Diferenciación real frente a competidores |
| P1 | Enlazado interno por grupos de síntoma | Retención y descubrimiento |
| P2 | Página de método editorial | Confianza y transparencia |
| P2 | Eventos GA4 de guía y herramientas | Medir uso, no sólo visitas |

---

## 8 · Fuentes consultadas

- AdSense, requisitos de elegibilidad: https://support.google.com/adsense/answer/9724
- AdSense, sitio listo para revisión: https://support.google.com/adsense/answer/7299563
- AdSense, añadir sitio y revisión: https://support.google.com/adsense/answer/12169212
- AdSense, CMP: https://support.google.com/adsense/answer/7670013
- Google Search, contenido generado con IA: https://developers.google.com/search/docs/fundamentals/using-gen-ai-content
- Google Search, contenido útil: https://developers.google.com/search/docs/fundamentals/creating-helpful-content
- Google Search, guía de optimización para IA: https://developers.google.com/search/docs/fundamentals/ai-optimization-guide
- GA4, SPA y `page_view`: https://developers.google.com/analytics/devguides/collection/ga4/views?client_type=gtag
- Ellis' Print Tuning Guide: https://ellis3dp.com/Print-Tuning-Guide
- All3DP español: https://all3dp.com/es/
- Prusa Knowledge Base: https://help.prusa3d.com/es/
- Bambu Lab Wiki: https://wiki.bambulab.com/en/home
- Shopify, qué es AdSense (contexto, no política): https://www.shopify.com/es/blog/ques-google-adsense

Las páginas de soporte se consultaron el 2026-11-13. Las de competencia, el mismo
día. No se usa ninguna cifra de terceros que no esté citada.
