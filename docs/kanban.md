# Kanban de wiiki-3d

Actualizado: 2026-10-21. Tablero vivo: se actualiza al cerrar cada tarjeta.

### Estado contrastado el 21 de octubre

- **La guía deja de ser un muro de texto.** El módulo más pesado del sitio se ha
  rediseñado como un **instrumento**, en la línea de la portada: la pregunta del
  diferencial manda y el veredicto llega al contestar; las opciones son tarjetas
  con su detalle; las tarjetas de conocimiento llevan la cifra en grande y el
  cuerpo en puntos; las acciones son readouts con la cifra mandando, el porqué en
  una línea y la fuente al lado. Encima, la cabecera de plano con el estado y el
  recorrido con los contadores en vivo. El diseño está en Figma
  ([wiiki-3d · design system](https://www.figma.com/design/DTXR8LOlujQXdC6vv4ks3Y),
  página `02 · Guía redisejada`) y el plan en
  [`2026-10-21-guia-como-instrumento.md`](superpowers/plans/2026-10-21-guia-como-instrumento.md).
- **El contenido también se ha ajustado, no sólo la presentación.** El contrato
  decía que `resumen` era «una frase» y no lo era: media de 164 caracteres y **19 de
  32 guías con más de una frase**. Ahora `resumen` es la primera frase y el resto
  va en `resumenExtra`, dentro del desplegable de contexto. **952 palabras de
  resumen antes y 952 después**: no se ha perdido ni una. Y las 520 tarjetas de
  conocimiento han pasado a tener **tema** (qué va) y **puntos** (el cuerpo
  troceado en líneas de una): el troceado es mecánico y el cotejo lo demuestra.
- **Siete acciones no eran acciones.** «En Prusa, la superficie recomendada es PA
  Nylon o Satin» y «Lo que ves es el modo Random funcionando, no un fallo» son
  frases, no instrucciones. Se han reescrito en imperativo **sin cambiar la
  afirmación, el valor, el porqué ni la fuente**, y las ocho diferencias están
  declaradas una por una en el cotejo.
- **`motion` entra, y la spec se ha actualizado.** La spec §2 D5 decía «ninguna
  dependencia»; ahora admite `motion` para lo que el CSS no cubre, que es la
  **salida** de una etapa. El chunk de entrada crece **0,19 kB** —la librería se va
  con la ruta, que ya era `lazy`— y el hover, el foco y el pulso siguen en CSS.
  `verify:animacion` es la comprobación nueva: 18/18.
- **El CLS de la guía era de 0,586** y no era culpa de la animación: la spec §4
  manda `preload` para los pesos de la primera pantalla y **el `preload` no
  estaba**. Con él, el CLS es de cero.
- **`verify:ux-tareas` llevaba en rojo desde el 20 de octubre** sin que nadie lo
  dijera: seguía buscando la clase `.inicio-accesos`, que el rediseño de la
  portada había borrado. Ahora comprueba el orden —los síntomas antes de la
  documentación larga— y no una altura que ya no describía el diseño.
- **La trayectoria del G-code se ve en 3D.** El aviso de la aplicación decía, textual,
  «El G-code se analiza; su trayectoria no se muestra en 3D». Ahora se lee el **cuerpo**
  del archivo —movimientos, capas y tipo de rasgo de cada tramo— y se dibuja
  coloreado por lo que la cabeza está haciendo: perímetros, rellenos, superficies,
  soportes y puentes. La cortina por capas es un `setDrawRange`, y el archivo se lee
  por trozos porque uno real pesa decenas de megabytes.
- **La prueba de que el lector dice la verdad**: los gramos **no se leen**, se derivan
  de la extrusión que el lector ha visto. 311,01 mm declarados → 310,21 leídos;
  0,93 g declarados → 0,925 g derivados. `verify:gcode` son 16 comprobaciones contra
  el fixture real. Y encontró tres fallos de lectura que ya están corregidos: la
  extrusión es **relativa** (`M83`), el slicer cuenta la extrusión **neta** —las
  retracciones restan— y la Z de la capa la **anuncia** el slicer en un comentario
  `;Z:` que llega antes de que la cabeza suba.
- **El 3MF de proyecto da malla, trayectoria y análisis de un archivo.** Los 3MF de
  proyecto —Bambu Studio, OrcaSlicer, PrusaSlicer— llevan dentro su G-code, y la
  malla y el G-code están los dos en coordenadas de cama: la trayectoria se dibuja
  **encima** de la pieza sin compensar nada. Y como el G-code va dentro, **también
  se analiza**: el panel ya no dice «los 3MF no se analizan». No hace falta ninguna
  dependencia nueva —`three` ya trae dentro el `fflate` que usa su propio
  `3MFLoader`— y el unzip es filtrado y asíncrono, porque un 3MF de proyecto pesa
  decenas de megabytes.
- **El visor tiene mapas de calor**: tipo de rasgo, velocidad y **caudal
  volumétrico**. La escala va del percentil 2 al 98, porque con el mínimo y el
  máximo de verdad la rampa no informaba de nada: el pico de 68 mm³/s aplastaba
  la media de 9 y todo salía en el azul frío.
- **El pico de caudal es el diagnóstico**: «el caudal máximo de tu impresión es de
  68 mm³/s, en la capa 5 haciendo Internal solid infill». La aplicación no dice
  si tu máquina puede —eso depende de la impresora, que ella no conoce—: dice
  cuánto y dónde, y enlaza a la guía que explica qué hacer con ese dato.
- **La comprobación del G-code es autónoma.** `test-fixtures/` está en el
  `.gitignore` a propósito —«G-codes reales de usuario, no se suben»—, así que el
  material de la comprobación **se genera en memoria** y es determinista. El
  archivo real, si está en la máquina, sigue usándose como comprobación extra.
  De 16 a 38 comprobaciones.
- **El recorrido de la guía marca la etapa en la que se está**, y el detalle que
  hizo falta: en este sitio la guía no se desplaza en la ventana, se desplaza en
  `.canvas-area`, y los eventos `scroll` no suben. Hay que escucharlos en el
  documento y en fase de captura.
- **La vuelta de texto está cerrada: los 213 `porque` largos son cero.** De 583
  reglas, las que pasaban de 200 caracteres se han acortado, revisado una a una y
  devueltas donde el matiz se había perdido. El `resumen` de la cabecera es ahora
  **una frase en las 32 guías** —media de 98 caracteres—, y la segunda mitad, cuando
  la había, va en `resumenExtra`, dentro del desplegable de contexto.
  **29.706 palabras de cuerpo antes y 29.706 después**: no se ha perdido ni una.
- **El contenido se revisó con dos mitades, porque una vuelta escrita por agentes lo
  necesita.** La **mecánica** (`verify:recorte`) compara cada guía con `HEAD` con el
  AST de TypeScript y exige que fuera del `porque` no haya cambiado nada, campo por
  campo. La **editorial** (el revisor) lee si el matiz perdido sigue en el `alcance`,
  en la condición o en una tarjeta. De las 51 reglas señaladas, 49 eran
  redundancia, 1 equivalencia y **1 pérdida real**, ya devuelta.
- **Tres bugs reales encontrados por el camino**, ninguno del acortamiento:
  `agujeros-ovalados/usar-hole-compensation` había perdido que el parámetro es
  bidireccional; `esquinas-petg/recinto-abrir` tomaba la fila del PLA en una guía
  de PETG, con un umbral de 60 °C en vez de 45 °C, y no se disparaba en el rango
  recomendado; y el **material cocinado** decía «cama por encima de 70 °C», que era
  otra columna de la tabla de Bambu. Los tres van por el pipeline que les toca.
- **Investigación de Control3D (César Galera).** Sus siete tests de calibración son
  **nuestras guías**, una a una; lo que falta es la **entrada por la puerta de
  atrás**: quien no tiene un síntoma no tiene dónde empezar. Y sus **modelos de test
  gratuitos** con su licencia. En
  [`investigacion-control3d-2026-10-21.md`](investigacion-control3d-2026-10-21.md).
- **Suite en verde**: `verify:layout`, `teclado`, `rutas`, `wiki` (218), `ui`
  (176), `taller` (180), `historial` (114), `esquema` (44), `maquinas`,
  `composicion` (45), `demo` (19), `revision` (16), `multimaterial` (12), `subida`,
  `seo` (450), `animacion` (18), `gcode` (38), `texto` (6), `recorte` (72) y `guias`
(1059). `lint` con 0 errores y las 3
  advertencias preexistentes de las copias de Three de `.superpowers/brainstorm/`.
- **Lo que queda**: la revisión editorial de los 19 `resumenExtra` —la migración fue
  mecánica y esa parte necesita criterio, no un script—, la **ruta de calibración** que
  la investigación de Control3D dejó sobre la mesa, y el emparejamiento de un G-code
  suelto con un STL suelto: con un STL no hay marco de cama, así que la superposición
  no es fiable y no se ofrece.

### Estado contrastado el 19 de octubre

- **La solicitud de revisión de AdSense está abierta.** El plan 60 (§2.1) congela ocho cosas que no se tocan hasta la aprobación, y **la congelación está en código**: `npm run verify:revision` falla si aparece una unidad de anuncio, un iframe, una guía escrita sin publicar, una página fuera del sitemap, si la privacidad deja de decir la verdad del día o si la cadena de AdSense se rompe. Las 16 comprobaciones en verde y **cada una se ha visto fallar** (`verify:revision-selftest`, 17/17).
- **Defecto encontrado y corregido:** `/wiki/stringing/` devolvía **404 en producción**. La guía se escribió y se commitó, pero su línea de registro en `src/lib/guias.ts` no entró en el commit, así que no se exportaba: no había página, no había enlace y el sitemap tenía 36 URLs en vez de 37. Ninguna de las 17 comprobaciones que había lo detectó, y es que todas miraban lo publicado, que era consistente consigo mismo. Corregido en `1ff10c2`; la comprobación que faltaba —el registro contra el disco— es ahora la primera de `verify:revision`.
- **Cifras medidas** (`scripts/verify/investigacion/cifras-revision.mjs`): 39 rutas, 29 guías, **84.471 palabras visibles**, 178 enlaces de fuente, **503 acciones**, 0 guías por debajo de 800 palabras, 0 guías con 0 acciones, 22 de 29 por encima de 1.500, 0 unidades de anuncio, 0 iframes. Informe: [`revision-adsense-2026-10-19.md`](revision-adsense-2026-10-19.md).
- **Dos casillas del DoD estaban marcadas como hechas y no lo estaban:** `/taller/` tiene **249 palabras**, no 741, y `/acerca-de/` tiene 323, no ~600. Corregido en [`plan-adsense.md`](plan-adsense.md) §6.
- **Lo único que queda para poder solicitar la revisión** es el **mensaje europeo de la CMP**, publicado en la cuenta de AdSense: es una acción del titular, y el sitio ya está listo. Prueba: `https://wiiki-3d.com/?fc=alwaysshow&fctype=gdpr`.
- **Laya deja de ser un adorno:** las decisiones que/ha tomado están en [`laya-decisiones.md`](laya-decisiones.md), con su probabilidad y su confianza, y con la regla escrita que manda cuando Laya se equivoca. Lo medido en la segunda pasada: **siete de siete respuestas descartadas**, y la de más confianza de la tabla (0,819) era falsa. La regla del plan 60 §3.2 se corrigió por eso: **la confianza decide si se lee, no si se decide**.
- **C1 · Lote 1, guía 1 de 3: `secar-filamento` publicada.** 4.910 palabras visibles, 6 fuentes, 26 acciones. Revisor **APROBADO** en la segunda vuelta; la primera fue RECHAZADA con 2 bloqueantes (una cita entrecomillada que no existía en ninguna fuente, y una afirmación falsa —«la tabla de Prusa no cubre el PC»— que **nació en el material cocinado** y volvió por la misma puerta). 30 guías y 89.477 palabras visibles en el sitio. La matriz es calculada: material × dispositivo × símbolo devuelven una celda exacta, y el 55 °C que **no** es una temperatura de secado se explica en vez de publicarse.
- **La portada se rediseñó: menos texto, más dibujo y sin huecos.** Medido a 1440 px: **356 px de espacio muerto a la derecha** —la columna iba capada a 832 px dentro de una zona de 1.220 px, pegada a la izquierda—, **5.168 px de alto** y la subida repetida **tres veces** (barra superior, titular y caja). Ahora son dos columnas: titular y caja de subida a la izquierda, y **doce problemas con su dibujo** a la derecha. Quedan **2.161 px** en escritorio y **4.271 px** en móvil (la mitad), **una sola** mención de subir y **cero** espacio muerto. Se fue el muro de treinta problemas en tarjetas de texto, que era el índice de `/wiki` copiado en la portada; la home exportada pasa de 1.755 a **633 palabras visibles** con los doce dibujos, la tabla con fuentes y las preguntas. Seis comprobaciones nuevas en `verify:ui` lo blindan: los dibujos, la subida dicha una vez, el límite de enlaces a guías, el uso del ancho y el alto máximo.
- **El motivo de plano de la spec de identidad visual, aplicado a la portada.** La spec del 8 de octubre (§5) estaba a medio aplicar: la tipografía —IBM Plex Sans y Mono— sí, el **plano de taller** no. Ahora están los tres elementos: la **rejilla** de 18 px en el lienzo de la portada, las **marcas de esquina** en la zona de subida y la **numeración `01 ·` a `05 ·`** en las cabeceras de sección, más la cabecera de ruta `01 · INICIO` con el estado a la derecha («Sin archivo» / «Modo lectura»). Los tokens (`--plano-rejilla`, `--plano-esquina`, `--dur-*`, `--curva-*`) están en el `:root`. **La frontera se respeta**: la rejilla no aparece en el cuerpo de lectura de las guías, que es donde la spec dice que no debe aparecer.

### Estado contrastado el 17 de octubre

- **28 guías registradas**, incluida `torre-temperatura`, aprobada en `wiki/reviews/torre-temperatura-revision-2.md`. No volver a crear `piezas-curvadas-z`: ya está registrada y versionada. El recuento local no acredita por sí solo el despliegue en producción.
- `build`, `verify:guias` **791/791**, `verify:wiki` **204/204**, `verify:seo` **397/397**, `verify:historial` **114/114** y `verify:rutas` pasan (código 0). Las pruebas técnicas **no acreditan la veracidad del contenido**: la primera revisión editorial de la torre rechazó 12 hallazgos, corregidos mediante cocinero → redactor → revisor. Se conservan ambos informes y nueve regresiones nuevas de material.
- **GSC verificado y sitemap enviado; CMP confirmada por el propietario.** No se vuelven a listar como pendientes sin evidencia nueva. La revisión de AdSense no está solicitada y requiere autorización posterior al repaso final.
- **Laya/VPS aplazado.** La clasificación pública sigue en demo; no se toma como siguiente paso recargar Jev por defecto.
- Primer piloto visual: esquema SVG de puenteado, hilos y capas **sólo en `torre-temperatura`**, junto a su explicación y con etiquetas HTML. `verify:esquema` pasa 44/44: móvil/escritorio, sin JS, carga de imágenes, enlaces, aislamiento de otras guías y lectura si las imágenes fallan. No hay portadas nuevas ni extensión automática al resto de guías. El despliegue se comprueba aparte.
- Las demás imágenes editoriales y el recuento de texto visible siguen pendientes. No se considera demostrado que la ausencia de imágenes impida AdSense; palabras o bytes del TypeScript no equivalen a texto visible.
- **Atribuciones corregidas:** `cita.fuente` es texto, no una URL. Cada cita conserva su atribución y enlaza explícitamente a la bibliografía de su guía, sin inventar correspondencias con documentos del mismo editor. Nuevo `verify:enlaces`: 258/258 comprobaciones locales, 340 atribuciones entre los modos con/sin JS y 66 destinos internos HTTP 200. URLs externas originales conservadas; su disponibilidad no forma parte del barrido. Evidencia y límites: `docs/comprobacion-enlaces-2026-10-17.md`.
- **Repetición y demo corregidas:** la exportación publica cada regla una vez, en orden y con todas sus condiciones juntas; `despegue-a-mitad` pasa de 92 bloques a 40 acciones, sin eliminar reglas. La demo se presenta como estimación local con índice orientativo, no porcentaje de fallo validado, sin atribuirla a Jev ni afirmar soportes verificados. Panel, barra de guía, carga, portada y Acerca de distinguen demo de modo real. SEO398/demo19 e historial114 en verde; mínimo de contenido conservado. Detalles: `docs/correccion-repeticion-demo.md`. No implica aprobación de AdSense ni envío de solicitud.
- **Capturas UI/UX atendidas:** wiki centrada con 1/2/3 columnas y contexto del archivo una sola vez; resumen compacto antes de los metadatos y scroll de documento en pantallas sin lateral, sin cambiar geometría del visor. Cabeceras mixtas no generan una falsa valoración ni preseleccionan material; las entradas antiguas se conservan con «No evaluable». Composición45/multimaterial12 y UX por tareas14 en verde. Límites y evidencias: `docs/correccion-ux-capturas-2026-10-17.md`.
- Avisos sin resolver en este bloque: `lint` termina con 0 errores y 3 advertencias preexistentes en copias de Three de `.superpowers/brainstorm/`; el build avisa de chunks superiores a 500 kB. No se modificaron esas copias ni se relajaron umbrales.

## Por qué existe este tablero

El proyecto se pasó seis meses haciendo una cosa: **mejorar la calidad editorial de las
páginas**. Se llegó a cuatro artículos impecables y a cero módulos que se usen juntos.
El error no fue de método sino de objetivo: se perfeccionó el contenido y se dejó sin
construir **la página que el usuario pidió**, que es esta:

> Subes tu G-code, tu STL o tu OBJ, y la página te dice qué le pasa a **ese** archivo y
> qué hacer, con la guía que lo explica.

Cuatro mil palabras bien escritas no sustituyen a que la página te diga qué hacer con
**tu** pieza. Este tablero pone el producto delante del texto.

## Reglas

1. **Una tarjeta = algo que se puede usar**, no algo que se puede escribir. Si no se
   puede demostrar en el navegador, no está terminada.
2. **Ninguna tarjeta se cierra sin prueba ejecutada.** El código de salida va en la
   tarjeta, no de memoria.
3. **Vertical antes que horizontal.** Primero un recorrido completo de punta a punta
   aunque sea feo; después se ensancha. Nunca dos mitades a la vez.
4. **El texto de la wiki se produce con el pipeline** (`recolector` → `cocinero` →
   `redactor` → `revisor`). No se escribe a mano ni se pega de otra web.
5. **Lo que no se puede verificar no se publica.** Una cifra sin fuente no sale, aunque
   quede más bonita la página.

---

## Sprint 0 — Arreglar lo que se ve roto ✅

*Estado: cerrado. Evidencia: capturas antes/después en `/tmp/opencode/pagina/`.*

| # | Tarjeta | Estado | Prueba |
|---|---|---|---|
| 0.1 | Iconos de navegación salen como cuadritos vacíos | ✅ | Eran emoji (🏠🧰📚🌐) sin fuente en el sistema. Sustituidos por SVG en línea (`src/components/NavIconos.tsx`), que heredan `currentColor`. Medido: 4 iconos de 20×20 px, 0 caracteres de reemplazo. |
| 0.2 | El título de los artículos sale dentro de un recuadro blanco | ✅ | Era el anillo de foco: `WikiArticleRoute` mueve el foco al `h1` al cambiar de artículo —bien hecho— y el anillo se quedaba. Anulado sólo para `[tabindex="-1"]:focus`. Medido: `outline: none`. |
| 0.3 | El panel de análisis ocupa 300 px en rutas donde no sirve | ✅ | Resuelto de otra forma que la que decía la tarjeta: la columna no se oculta —eso daría un layout que salta a mitad de sesión—, sino que cambia de contenido. `RUTAS_ANALISIS` en `src/App.tsx` deja el panel sólo en `/` y `/historial`; en el resto va `RielWiki`, que pinta las acciones desbloqueadas y las variables que faltan. |

---

## Sprint 1 — La wiki deja de ser un PDF ✅

*Objetivo: que la guía reaccione al archivo del visitante. Es la diferencia entre
leer un manual y usar una herramienta.*

*Nota de forma: las tarjetas hablan de «el artículo» y ahora las unidades son las
guías tipadas de `src/content/guias/`. «La sección que lo explica» no es un `h2`
sino el `id` de una variable o de una tarjeta, y el enlace se genera desde los
datos en lugar de desde un índice de secciones.*

| # | Tarjeta | Estado | Prueba |
|---|---|---|---|
| 1.1 | Barra «Tu archivo» dentro de la guía | ✅ | `src/components/TuArchivo.tsx`. Aparece sólo con archivo cargado, y **sólo pinta los campos que esa guía declara** (`leeDelAnalisis` y `campos`): 4 en `warping-pla`, 2 en `temperatura-cama`, 1 en las otras dos. `verify:wiki` 119/119. |
| 1.2 | Cada dato enlaza a la sección que lo explica | ✅ | El ancla la declara el propio elemento (`campos` en la variable o en la tarjeta), no una convención sobre nombres: la variable `cama` recoge `bedTemp` en `warping-pla` y en `temperatura-cama` la recoge `material`, porque ahí los rangos de cama están en sus opciones. Sin ancla declarada no hay enlace. `verify:guias` 116/116 y `verify:wiki` mide que cada `href` tiene destino **en el DOM**. |
| 1.3 | Sin archivo, la guía se lee entera y sin adornos | ✅ | Sin archivo, `leerTuArchivo` devuelve una lista vacía y el componente devuelve `null`: no hay caja, ni título, ni filas, ni espacio. Comprobado en navegador (`sin archivo no hay barra`, `ni media barra`, `ni una fila suelta`). |
| 1.4 | Sin datos, no se inventan | ✅ | `undefined` es ausencia y `0` es un valor: `bedTemp: 0` sale como `0 °C`, y sin dato sale «no lo escribió tu slicer». El material se enseña **tal cual lo escribió el slicer**, sin mapear a las opciones de la guía —mapear es lo que hace `precontestar`, y aquí el dato es una lectura—. |
| 1.5 | La barra no rompe el modo sin JavaScript | ✅ | Depende del archivo de quien lee, así que en el HTML exportado no aparece, y no queda ni una caja vacía: `verify:seo` falla si `tu-archivo` aparece en `dist/`. Las anclas **sí** están en el HTML plano, que es lo que hace que un enlace a `#v-cama` funcione con el motor apagado. 63/63. |

### Lo que encontró esta sprint, y no era de la barra

1. **Un `id` puede existir pero no ser el destino del `href`.** Con las dos
   cadenas escritas en dos sitios, cambiar el prefijo en uno deja enlaces que no
   hacen nada y ninguna comprobación se entera. Ahora `id` y `href` salen de la
   misma función (`idVariable`, `anclaVariable` en `src/lib/tu-archivo.ts`).
2. **Una tarjeta con condición y sin ancla rompe el enlace.** Salió al comprobar el
   HTML exportado: `cama-bambu` no se pinta sin declarar variables, así que su
   `id` no existe y un enlace a ella no lleva a nada. `verify:guias` ahora exige
   que una tarjeta con `campos` no tenga `cuando`.
3. **La misma clase en el `li` y en el enlace.** Con `class="tu-archivo-dato"` en
   los dos, el selector del navegador contaba ocho datos donde hay cuatro y había
   que preguntar por el `href` para saber cuál era el enlace. Son
   `tu-archivo-item` y `tu-archivo-dato`.

### Las comprobaciones se han visto fallar

Ninguna de las nuevas se acepta sin romper el código a propósito, porque una
comprobación que nunca ha fallado no está comprobada. Cuatro roturas, cuatro rojos:

| Qué se rompió | Qué lo detectó |
|---|---|
| `campos: ['bedTemp']` borrado de la variable `cama` | `warping-pla declara «bedTemp» y ninguna variable ni tarjeta lo explica` |
| `leeDelAnalisis: ['bedTemparature']` | `no es un campo de ProjectMetadata ni de JevClassification` |
| `id` de la variable con otro sufijo que el `href` | `Material=#v-material (destino inexistente)` |
| La barra se pinta sin archivo | `sin archivo no hay barra -> 1 barras`, y el HTML exportado la trae |

Dos de las cuatro primeras veces salieron en verde **porque el build había fallado**
y la comprobación se ejecutó contra el `dist` viejo: el error de tipos paró la
compilación y el script no se enteró. Se vio mirando el log del build, no el
resultado de la prueba.

---

## Sprint 2 — Que el diagnóstico sea del archivo, no genérico ⏳

| # | Tarjeta | Estado | Detalle |
|---|---|---|---|
| 2.1 | Clasificación real en producción | ⏸ Aplazada | La web sigue en demo. El flujo de Pages ya admite `JEV_USE_MOCK` y `JEV_PROXY_URL` (`182878b`). Laya local y su adaptador se probaron, pero desplegar la API en VPS está aplazado hasta terminar la web; no se da por activada en producción. Véase `plan-laya.md`. |
| 2.2 | El veredicto lleva a la sección, no al artículo | ✅ | El panel enlaza a `/wiki/<slug>#<ancla>`, no a la cabecera: `warpingRisk` y `riskLevel` caen en `#c-riesgo`, y `bedTemp` en `#v-material`. La ancla vive en `CAMPOS_WIKI` y `verify:wiki` la compara con la que declara la guía (`126/126`), así que renombrar la tarjeta sin tocar el panel falla. |
| 2.3 | Comparar tu valor con el de la fuente | ✅ | Con un G-code cargado, la acción que da un intervalo de cama dice dónde cae tu valor: «Tu cama: 50 °C · objetivo 35–45 °C · 5 °C por encima». El intervalo va en `rango` (números) junto al `valor` (texto); `verify:guias` avisa si los dos se separan (`146/146`) y `verify:wiki` comprueba que la posición marcada es la que calcula el motor (`130/130`). |
| 2.4 | Taller recibe los gramos del G-code | ✅ Ya ocurre. Falta QA: hoy no se puede pasar de la barra al artículo que explica ese campo. | Ya ocurre: `/taller/` abre con los gramos extraídos. FaltaQA: hoy no se puede pasar de la barra al artículo que explica ese campo. |

---

## Sprint 3 — Proyectos y la memoria local ⏳

| # | Tarjeta | Estado |
|---|---|---|
| 3.1 | `/proyectos/` deja de ser una pantalla vacía | ✅ `verify:historial` (17-oct, 114/114, código 0): ofrece el análisis para nombrarlo, muestra el nombre y el almacenamiento usado. |
| 3.2 | Un proyecto agrupa análisis guardados | ⏳ Alcance por revisar: hoy un proyecto es un análisis nombrado. La prueba acredita nombrarlo y devolverlo al historial, no agrupar varios análisis. |
| 3.3 | Abrir un proyecto lleva a su análisis | ✅ Corregida la navegación ausente desde Proyectos e Historial. Regresión vista fallar antes del arreglo; `verify:historial` 114/114 comprueba apertura tras recargar, archivo asociado, material/diagnóstico y ausencia de duplicados. |
| 3.4 | Historial y proyectos sin cuentas ni nube | ✅ Persistencia local y estados sin IndexedDB comprobados por `verify:historial` (17-oct, 114/114, código 0). No implica sincronización ni conservación del archivo original. |

---

## Sprint 4 — Publicación ✅

| # | Tarjeta | Estado |
|---|---|---|
| 4.1 | Desplegar con autorización | ✅ Desplegado: `main` → GitHub Pages con `deploy.yml` en cada push. |
| 4.2 | Comprobar que `/wiki/`, artículos, contacto y sitemap responden 200 | ✅ Las 18 rutas del sitemap responden 200 (sonda del 2026-10-16). |
| 4.3 | Corregir `verify:layout` (144 px frente a 150) | ✅ `verify:layout` en verde (2026-10-16, 29 viewports). |
| 4.4 | Verificación de AdSense | ✅ Propiedad verificada por meta. CMP de Google confirmada por el propietario; no se vuelve a pedir crear/publicar el mensaje. Pendiente el repaso final del sitio y autorización para solicitar revisión; la propiedad verificada no significa aprobación de anuncios. |

---

## Sprint 5 — Lo que quedó pendiente en la auditoría ✅

*Estado: cerrado el 15/10/2026. Todas las tarjetas salvo el 5.5 (cerrada hasta el límite de las fuentes actuales). Plan completo:
[`plan-mejoras-frontend.md`](plan-mejoras-frontend.md). Este sprint sólo cubre lo
que* [`auditoria-frontend-2026-10-14.md`](auditoria-frontend-2026-10-14.md)
*dejó pendiente; lo ya corregido no se repite.*

| # | Tarjeta | Estado | Prueba que la cierra |
|---|---|---|---|
| 5.1 | `verify:taller` muere al cerrar el servidor | ✅ | `npm run verify:taller` → 180 ok y código 0 **sin** `BASE_URL`. También `verify:historial` (109 ok), que tenía el mismo fallo: ambos hacían `.kill()` sobre la URL que devuelve `startPreview`. Con `BASE_URL` el servidor vivo sigue en pie. |
| 5.2 | Registrar `verify:subida` en `package.json` | ✅ | `npm run verify:subida` → OK. **Visto fallar**: quitando `event.preventDefault()` del `onDrop`, el script falla con código 1 y el mensaje exacto. |
| 5.3 | La auditoría repetible: `verify:ui` | ✅ | `npm run verify:ui` → 121 ok. **Visto fallar**: quitando el `<title>` del `<svg>`, detecta las 8 ilustraciones sin nombre. |
| 5.4 | Material de referencia por modelo, con fuente | ✅ | El `recolector` trajo 17 ficheros a `wiki/raw/`; el `cocinero` los procesó en 8 ficheros de `wiki/cooked/`: **139 afirmaciones respaldadas y 59 huecos**. Primera vuelta cancelada sin escribir nada; la segunda funcionó. |
| 5.5 | Rasgos por modelo interpretados por `MaquinaSVG` | ✅ Hasta el límite de las fuentes y revisado | Cinco rasgos dibujados, todos con fuente de fabricante: KE (2 ventiladores + carril X), AD5X (IFS de 4 bobinas + 3 husillos), P1S (filtro de carbono), CORE One (bobina lateral). Lo que falta —posición de pantalla, tapa de la Mars, «abierta de fábrica» de la AD5X— lo revisó el `cocinero` y **ninguna fuente lo afirma en los ocho modelos**; ahí la ilustración usa la silueta neutra de la familia, en vez de inventarla. `verify:maquinas` compara firmas y la vi fallar quitándole los rasgos a la KE. |
| 5.6 | La mecánica se mueve junta (filamento al cabezal, cama y pórtico) | ✅ | `verify:ui` lo mide en las 7 fracciones del ciclo y en las 3 familias: filamento que acaba en el cabezal (14 ok), boquilla que no atraviesa la pieza (14 ok), pieza que se mueve con su cama (21 ok). **Visto fallar** devolviendo el filamento a un trazo fijo. |
| 5.7 | Revisión técnica del catálogo campo a campo | ✅ | La A1 no era CoreXY (la fuente oficial dice *Bed Slinger*); la AD5X tenía 3 campos pendientes con valor, uno de ellos 350 °C de un firmware modificado. Añadidas las fuentes de Flashforge que faltaban. Comprobaciones nuevas vistas fallar. |
| 5.8 | Revisar las reglas, no sólo los números | ✅ | `cerrada` pasa a `boolean | null`: sin cerramiento verificado la regla devuelve «no se puede determinar» en vez de afirmar warping, y el rizado no se dibuja. La base física de las dos reglas está escrita en `src/lib/maquinas.ts`. |
| 5.9 | Que la verificación no afirme más de lo que prueba | ✅ | Fuera el comando inexistente y la afirmación falsa de «cada comprobación vista fallar». `scripts/verify/README.md` documenta los siete scripts que faltaban. |
| 5.10 | El inicio explica antes de pedir | ✅ | A 375×667: h1 arriba, propuesta antes del botón, botón y zona enteros en la primera pantalla. `verify:teclado`, `verify:subida` y `verify:ui` (170) en verde. |
| 5.11 | La guía responde al cambiar una variable | ✅ | Con PLA marcado: «1 de 6 contestadas · 6 acciones que se pueden aplicar ya. Ver las 6 →», y el enlace deja `#recomendación` dentro de la pantalla a 375 px. Recuento anunciado con `role=status`. |
| 5.12 | El resultado se ve antes en móvil | ✅ | Va con la 5.11: el atajo del recuento salta al resultado sin recorrer la guía. |
| 5.13 | La ficha no enseña todo de golpe | ✅ | Cuatro campos clave a la vista (cinemática, volumen, boquilla, cama) y cinco plegados en un desplegable que dice cuántos contiene. Fuentes conservadas. `verify:ui` mide el peor caso. |
| 5.14 | Estados vacíos con salida (Proyectos/Historial) | ✅ | Los dos llevan «Subir un archivo» y «Empezar por el síntoma». Caja dentro del viewport a 375 px. |
| 5.15 | Orientación dentro de `/maquinas` | ✅ | La miga pasa a `nav` con `aria-label`, tres niveles y `aria-current="page"`. Sin quinto destino en la barra. |
| 5.16 | Sin JavaScript, la ficha se lee | ✅ | 8 fichas y 8 SVG en el exportado. El veredicto ya no pide elegir filamento cuando no se puede, y el botón de pausa no se pinta. |
| 5.17 | La copia dice lo que el dibujo es | ✅ | La sección «De dónde sale cada ficha» afirma que la ilustración es «esquema por familia con los rasgos que sus fuentes afirman, no reproducciones exactas de cada modelo ni simulaciones del resultado».
`verify:ui` lee el texto de la página y fallaría si dijera sólo «ilustraciones exactas». |

**Regla del sprint:** los bloqueos primero (5.4 → 5.8). Ninguna tarjeta se cierra
sin el comando ejecutado y su salida en el mensaje de commit.

---

## Sprint 6 — La revisión no se rompe por descuido ✅

*Objetivo: que la solicitud de AdSense, que ya está abierta, no se caiga por un
cambio tonto. La congelación del plan 60 §2.1 son ocho puntos que dependían de
que nadie se acordara; ahora son código.*

| # | Tarjeta | Estado | Prueba que la cierra |
|---|---|---|---|
| 6.1 | La congelación es ejecutable | ✅ | `npm run verify:revision` → **16/16**, código 0. Falla si aparece una unidad de anuncio, un `<iframe>`, una guía escrita sin publicar, una página indexable fuera del sitemap, una página con `noindex` dentro, si la privacidad deja de decir la verdad del día o si la cadena de AdSense se rompe (ads.txt, meta, etiqueta, Consent Mode v2 y su orden). |
| 6.2 | Cada comprobación se ve fallar | ✅ | `npm run verify:revision-selftest` → **17/17 mutaciones detectadas**. Cada comprobación se rompe a propósito sobre una copia de `dist/` en `/tmp` y se exige que el script se dé cuenta. |
| 6.3 | Ninguna guía escrita queda sin publicar | ✅ | La comprobación compara el registro (`src/lib/guias.ts`) con el disco (`src/content/guias/`) y con lo exportado. **Pilló el 404 de `stringing`**, que ninguna de las 17 comprobaciones anteriores vio. |
| 6.4 | El sitio publicado responde | ✅ | Sonda HTTP del 2026-10-19: **28 de 28 rutas en 200** (antes del despliegue de este ciclo; la 29ª es `stringing`). Repetida tras el despliegue. |
| 6.5 | El informe de la revisión, con cifras medidas | ✅ | [`revision-adsense-2026-10-19.md`](revision-adsense-2026-10-19.md), con el método de [`cifras-revision.mjs`](cifras-revision.mjs) para que las cifras se puedan repetir. |
| 6.6 | El DoD del plan de AdSense, corregido contra la realidad | ✅ | [`plan-adsense.md`](plan-adsense.md) §6 revisado: dos casillas que estaban marcadas como hechas y no lo estaban (`/taller/` con 249 palabras, no 741; `/acerca-de/` con 323, no ~600). |
| 6.7 | Las decisiones de Laya quedan registradas | ✅ | [`laya-decisiones.md`](laya-decisiones.md): la re-clasificación de la cola con `p`, `conf` y la regla que manda, y lo que se descartó. |
| 6.8 | El mensaje europeo de la CMP | ⏸ **Pendiente del titular de la cuenta** | Publicar en AdSense → «Privacidad y mensajes», con *advanced mode*. El sitio ya está listo: etiqueta de AdSense + Consent Mode v2 en `denied`. Prueba: `?fc=alwaysshow&fctype=gdpr` en incógnito. |

**Dos cosas que sólo aparecieron al romper el sitio a propósito**, y que están
escritas porque son el tipo de fallo que no se ve en una captura:

1. **El script paraba en el primer error.** Al meter una unidad de anuncio, se
   paraba en «ninguna unidad de anuncio» y nunca llegaba a «la privacidad
   coincide con lo que el sitio muestra», que es justo la comprobación que
   avisa de que la política y el sitio han divergido. Ahora se ejecutan todas y
   se informa de todas.
2. **La divulgación de cookies de terceros se comprobaba por vecindad**, y eso
   daba por buena una página que sólo decía «los datos no se venden a
   terceros» al lado de un párrafo que hablaba de cookies de analítica. Ahora
   se exige que la divulgación esté **en una misma frase**, con «terceros» antes
   del verbo y el verbo antes de «cookies».

---

## Backlog de contenido

El contenido **no se escribe a mano**: lo produce el pipeline con fuentes reales. La
prioridad la marca lo que desbloquea la wiki interactiva, no lo que se lee bien solo.

| Prioridad | Tema | Estado |
|---|---|---|
| 1 | `adhesion-primera-capa` | ✅ Article escrito y revisado; 8 fuentes |
| 2 | `enclosure-y-warping` | ✅ Guía escrita y aprobada (`enclosure-y-warping-revision-2`); 4 fuentes nuevas + 1 reutilizada de `warping-pla`; dibujo `camara` |
| 3 | `material` | ✅ Guía escrita y aprobada (`material-revision-2`); 4 fuentes nuevas; campo `material` del panel; dibujo `rugosidad` |
| 4 | `altura-capa` | ✅ Guía escrita y aprobada (`altura-capa-revision-2`); 4 fuentes nuevas; campo `layerHeight`; dibujo `capas` |
| 5 | `temperatura-hotend` | ✅ Guía escrita y aprobada (`temperatura-hotend-revision-2`); campo `hotendTemp`; dibujo `hotend` |
| 6 | `capas-desplazadas` | ✅ Versionada y registrada; comprobaciones generales actuales en verde. |
| 7 | `flow-rate` | ✅ Versionada y registrada; comprobaciones generales actuales en verde. |
| 8 | `voladizos-y-soportes` | ✅ Guía escrita y aprobada (`voladizos-y-soportes-revision-2`); 3 fuentes nuevas; campos `hasOverhangs` y `overhangAngle`; dibujo `voladizo` |

Los artículos con `campo` reservado son los que hacen que la barra «Tu archivo» tenga
enlaces. Sin ellos, el artículo se lee pero no conecta: por eso van primero los que
tienen campo.

**Dónde está el backlog hoy (2026-10-19).** Esta tabla era el backlog de los
ocho primeros artículos y ya no lo es: hay **29 guías** publicadas, todas con su
revisión en `wiki/reviews/`. Lo que queda por delante son tres cosas, y cada una
tiene su ciclo en el plan 60:

| Qué | Estado | Ciclo |
|---|---|---|
| Escribir 2–3 guías nuevas con el pipeline de 4 agentes | **1 de 3 hecha**: `secar-filamento` (4.910 palabras, 6 fuentes, 26 acciones, revisor APROBADO). Siguen `tpu-flexible` y `z-seam`, que son las dos que quedan del lote 1. Hay 9 subclusters y 40 temas planificados en el plan 50-guias; a partir del tercer lote los temas los eligen las consultas de GSC | **C1** |
| Llevar las 4 guías cortas por encima de 1.500 palabras (`temperatura-hotend` 1.079, `material` 1.306, `altura-capa` 1.368, `separaciones-entre-capas` 1.456) | Material cocinado de sobra: 176 ficheros en `wiki/raw/` y 151.737 palabras en `wiki/cooked/`, de las que se publican 89.477 | **C2** |
| Imágenes: portada en cada guía, 6–8 con diagrama, y fotos propias | Hoy hay **3 imágenes en todo el sitio**, las tres del piloto de `torre-temperatura` | **C3** |

---

## Deuda conocida

| Deuda | Por qué no se toca |
|---|---|
| ~~`verify:layout` falla a 640×360~~ | **Cerrada el 2026-10-16** (tarjeta 4.3) y comprobada hoy: las 7 comprobaciones pasan. Se queda aquí el rastro, no la deuda. |
| El renderizador no anida énfasis (`*x **y** z*` sale todo en cursiva) | Tocar el parser a mitad de la ingesta de contenido es el peor momento. **Comprobado el 2026-10-19: ninguna de las 40 páginas exportadas tiene énfasis anidado**, así que no lo sufre ningún contenido publicado. |
| `wiki/raw/` se versiona y las condiciones de uso de los dominios no están revisadas | `wiki/policy/sources.json` lo declara. Es una decisión del propietario, no del agente. |
| `termsReviewed: false` y `rightsEvidenceUrl: null` | Igual: el registro lo dice en vez de fingir que está resuelto. |
| **La spec de identidad visual está aplicada sólo en la portada** | Los otros seis puntos de §7 de [`docs/superpowers/specs/2026-10-08-identidad-visual-y-movimiento-design.md`](../docs/superpowers/specs/2026-10-08-identidad-visual-y-movimiento-design.md) —cabecera de plano en las otras tres rutas, resultados como *readouts*, el botón X como control fantasma, el carril del Taller explicando el cálculo, y el visor sin previsualización como panel de estado— siguen pendientes. Se hicieron de uno en uno, empezando por la portada, porque tocar las cuatro rutas a la vez rompe media suite de comprobaciones. |
