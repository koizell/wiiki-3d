# Hallazgos previos a AdSense — 2026-10-04

Esto es un informe de estado, **no una solicitud**. La tabla editorial de P0 que sigue
es histórica: R0 está en revisión y sus resultados se registrarán por separado.
Distingue siempre entre lo que está
hecho y comprobado en local, y lo que existe en el sitio publicado, porque en este
momento no son lo mismo y la diferencia decide casi todo lo que queda pendiente.

## 1. Resumen

| | Estado |
|---|---|
| Contenido local | 3 artículos, **1 aprobado** y 2 bloqueados por rechazos consecutivos |
| Pruebas locales | 12 de 13 en verde; la que falla es deuda preexistente |
| Sitio publicado | Funciona la raíz; **la wiki, el contacto, la privacidad y el sitemap dan 404** |
| Imágenes | 2 SVG conceptuales y `imagenes.json` en `public/wiki/warping-pla/`; los otros dos artículos no tienen imágenes integradas |
| SEO | Sitemap, canonicals, `robots.txt`, JSON-LD y HTML sin JavaScript comprobados |
| AdSense | Preparación editorial y técnica local; sin script, ID de editor ni `ads.txt` |
| Despliegue | No se ha hecho push ni despliegue en esta fase |

## 2. Lo que se ha arreglado en esta fase

### 2.1 Los tres artículos, contra sus fuentes

El lint previo (`wiki/reviews/lint-pre-adsense-2026-10-04.md`) rechazó los tres. El
problema no era falta de texto: eran afirmaciones más fuertes que sus fuentes, casos sin
resolver publicados como resueltos y errores que ya nacían en `wiki/cooked/`.

| Artículo | Defectos de partida | Informe nuevo | Veredicto |
|---|---|---|---|
| `separaciones-entre-capas` | 7 | `revision-5` | **APROBADO** — 5.159 palabras |
| `warping-pla` | 13 | `revision-7` | RECHAZADO — 3, uno bloqueante |
| `temperatura-cama` | 12 | `revision-8` | RECHAZADO — 5, uno bloqueante |

Los informes documentan avances, pero no un cierre completo: temperatura conserva
una corrección parcial del umbral y warping señala un residuo sobre el desenlace del
caso. Los defectos restantes incluyen afirmaciones técnicas falsas, no sólo estilo:

- `warping-pla`: una frase afirma que una columna de la tabla de Prusa no existe cuando
  la fuente sí la publica desalineada; queda un «ciclo completo» de un caso que el propio
  artículo declara sin medir; y una inferencia no marcada que contradice la tabla de
  Bambu.
- `temperatura-cama`: una frase dice que una fuente no publica ninguna cifra de cama
  cuando publica un incremento de 5–10 °C; «las tres fuentes» del PETG cuando una de
  ellas no tiene fila; y la banda de contradicción entre 60 y 70 °C está mal ubicada.

Los dos artículos acumulan dos rechazos seguidos, así que **P0 termina BLOCKED** y no se
pide un tercer intento entero con el mismo material. La salida es una vuelta quirúrgica
sobre ocho pasajes, con Informes 8 y 9.

### 2.2 Una afirmación sobre la aplicación que era falsa

El artículo de temperatura afirmaba que el panel trata un `0` y la ausencia del dato
igual. Se comprobó el código sin modificarlo: `formatCelsius` y `formatMillimetres`
devuelven guion sólo con `undefined`, y `ParserService` prueba cinco alias de cama
quedándose con el primer valor presente, el `0` incluido. La afirmación era falsa y se
retiró, junto con la idea de que un slicer escribe `0` para decir que no usa cama: el
aviso de Bambu habla del **preset** de filamento, no del G-code.

### 2.3 Metadatos que prometían de más

La descripción de `/taller/` anunciaba coste de material **y electricidad** con peso,
tiempo y tarifas. Taller calcula gramos de filamento × precio por kilogramo, y nada más.
Corregido en `src/lib/seo.ts`.

### 2.4 Dos regresiones que introdujo la redacción

`verify:wiki` bajó a 110/112 y las encontró:

1. Una celda de tabla del artículo de separaciones traía barras verticales dentro de un
   fragmento de código. El renderizador parte las celdas por `|` sin reconocer escapes, y
   la tabla contaba ocho columnas donde tiene tres. Corregido con comillas, sin perder
   ningún valor.
2. El apartado del campo opcional de `temperatura-cama` se había retitulado y dejó de
   cumplir el contrato que comprueba `verify:wiki`. Retitulado; el contenido no cambió.

Vuelven a estar **112/112**. Los informes 5 y 8 describen el fichero en esos dos puntos
exactos, no el estado actual.

## 3. Evidencia de las pruebas

| Comprobación | Resultado |
|---|---|
| `npm run lint` | limpio |
| `npx tsc -b` | limpio |
| `npm run build` | 7 páginas de contenido + 4 herramientas; sitemap con 9 URLs |
| `verify:markdown` | 15/15 |
| `verify:wiki` | 112/112 |
| `verify:seo` | 40/40 |
| `verify:rutas` | todas pasan |
| `verify:teclado` | todas pasan |
| `verify:taller` | 180 |
| `verify:historial` | 102 |
| `verify:overlay` | todas pasan |
| `verify:layout` | **falla, y es preexistente**: 640×360 da 144 px donde el script exige 150 |
| `idiomacheck.py` | limpio |
| Hashes de `wiki/raw/` | 15/15 intactos; `git diff wiki/raw/` vacío |

Bundle: 92.42 kB gzip inicial, visor perezoso 149.59 kB gzip, con el aviso preexistente
de chunk mayor de 500 kB.

## 4. Lo que está en local y no existe en el sitio

Medido por HTTP el 2026-10-04T23:10Z:

| URL | Respuesta |
|---|---|
| `/` | 200 |
| `/robots.txt` | 200 |
| `/wiki/` | **404** |
| `/wiki/warping-pla/` | **404** |
| `/wiki/temperatura-cama/` | **404** |
| `/wiki/separaciones-entre-capas/` | **404** |
| `/contacto/` | **404** |
| `/privacidad/` | **404** |
| `/sitemap.xml` | **404** |
| `/ads.txt` | **404** |

La raíz está publicada; **todo lo demás de este informe —la wiki con sus fuentes, el HTML
estático, el sitemap, las imágenes y los metadatos— existe sólo en `dist/` y en el
repositorio local**. En esta fase no se ha hecho push ni despliegue, así que estos 404 no
son un defecto del código: son que el trabajo aún no ha salido de esta máquina.

La raíz responde sin `Content-Security-Policy`, `Strict-Transport-Security`,
`X-Content-Type-Options` ni `Referrer-Policy`. Son cabeceras que fija el hosting, no la
aplicación, y su ausencia **no demuestra por sí sola una vulnerabilidad explotable**;
conviene medirlas tras el despliegue y decidir si el hosting permite fijarlas.

## 5. Deuda técnica que sigue abierta

1. **`verify:layout` falla a 640×360** (144 px frente a 150). Causa localizada: el suelo de
   altura del visor es **relativo al viewport** —`min-height: 40dvh` en
   `src/App.css:491` y `:594`— y la comprobación es un **mínimo absoluto**
   (`MIN_VIEWER = 150` en `scripts/verify/barrido.mjs:36`). A 360 px de alto, `40dvh` son
   144 px: las dos reglas son correctas por separado y discrepan en viewports muy bajos.
   Hay dos salidas posibles —`max(40dvh, 150px)` en el CSS, que respeta la intención de
   ambas, o un umbral relativo en el test— y las dos tocan ficheros protegidos. **No se ha
   modificado ninguno**: hace falta autorización, y bajar el umbral del test para que quede
   verde sería ocultar el fallo.
2. **Recuentos históricos no reproducibles:** varios informes contaron transcripciones
   manuales. Sus cifras no permiten medir con precisión cuánto creció el artículo.
   Cualquier recuento nuevo debe ejecutarse sobre el archivo e identificar el método.
3. **Imágenes:** sólo `warping-pla` tiene portada y diagrama integrados. Añadir imágenes
   a temperatura o separaciones es una mejora editorial opcional, no prueba de calidad
   ni requisito de aprobación de AdSense aquí acreditado.
4. **Cobertura editorial**: `adhesion-primera-capa`, `enclosure-y-warping`, `material`,
   `capas-desplazadas`, `flow-rate` y `altura-capa` se nombran como referencias y no
   existen. Se renderizan como texto, no como enlaces rotos, y así deben seguir.
5. **Contaminación lingüística previa encontrada**: el informe histórico
   `wiki/reviews/temperatura-cama-revision-3.md:196` tiene dos sílabas Hangul donde
   debería haber una palabra («Una…»). No se ha tocado: los informes anteriores no se
   reescriben, y no afecta al contenido publicado.

## 6. Lo que depende del propietario

Estos puntos requieren datos o decisiones del propietario, aunque parte de la
configuración sí puede prepararse en el repositorio.

1. **Cuenta de AdSense**: número de editor, verificación de dominio y titular. Sin eso no
   hay solicitud posible.
2. **Método de verificación**: por script, por `ads.txt` o por metaetiqueta. Los tres son
   válidos; `ads.txt` es **recomendado, no obligatorio**
   (<https://support.google.com/adsense/answer/12171612?hl=es>).
3. **Consentimiento**: antes de activar anuncios hay que configurar el CMP que exigen las
   regiones cubiertas (<https://support.google.com/adsense/answer/13554116?hl=es>). La
   página de privacidad habla de ello en futuro, coherente mientras
   no haya anuncios.
4. **Correo de contacto**: hay que probar que el envío llega de verdad. Un `mailto:` bien
   escrito no demuestra entrega. Es una comprobación operativa del contacto; este
   informe no acredita que sea un requisito específico de los revisores de AdSense.
5. **Clasificación real o demostración**: el entorno local usa un clasificador de
   demostración y el flujo de GitHub Pages no lleva esa configuración. Hay que decidir y
   declarar qué es cada cosa antes de anunciar funciones.
6. **Despliegue**: hasta que no haya uno autorizado, todo lo anterior es local.

## 7. Orden recomendado

1. Autorizar la vuelta quirúrgica de los ocho pasajes de los informes 7 y 8, y el lint
   conjunto de los tres contra raw.
2. Aplicar las tres correcciones menores del artículo aprobado y revisarlo otra vez.
3. Desplegar con autorización y repetir la comprobación HTTP de la sección 4.
4. Probar el correo con recepción real.
5. Verificar AdSense con el método que elija el propietario, y sólo entonces pedirla.

Mientras no haya nuevas revisiones aprobadas y una comprobación pública posterior al
despliegue, no se debe presentar la wiki como lista para solicitar AdSense. La raíz
está publicada; la accesibilidad pública de las mejoras locales sigue pendiente.
