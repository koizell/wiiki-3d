# Estado del proyecto

> Una página para responder a dos preguntas: **¿en qué punto está esto?** y
> **¿qué falta?**
>
> Todo lo de aquí sale de [`docs/historias-de-usuario.md`](historias-de-usuario.md)
> y de los commits. Si algo no aparece, es porque no está en ninguno de los dos.
> Las cifras del layout y del tamaño de un análisis vienen de scripts que se
> pueden volver a ejecutar; están enlazados.

---

## Los cuatro módulos

| Módulo | Historias | Estado | Qué lo bloquea |
|---|---|---|---|
| **Inicio** | H-3.1, H-3.2, H-3.3 | En curso | La pantalla de subida **está hecha** (`/`) y el historial también (`/historial`, con tres vistas). Falta el enlace a `/proyectos` desde el historial, y decidir si `/proyectos` deja de ser una pantalla vacía (P5). |
| **Taller** | H-2.1, H-2.2 | Hecho | La calculadora está hecha y los cinco estados tienen comprobación propia (`verify:taller`, 180). |
| **Wiki 3D** | H-1.1, H-1.2 | Hecho | Nada técnico. Rutas, buscador, riel, barra «Tu archivo» y **las cinco** guías están escritas y verificadas. El plan es [`plan-guias.md`](plan-guias.md) y el tablero [`kanban.md`](kanban.md). |
| **Proyectos** | H-4.1 | Bloqueado | **S1 + S3**: sin backend, los datos viven en la máquina de quien los guarda. Y con P2 resuelto, guardar el análisis no permite volver a abrir el archivo en el visor. |

Las cuatro rutas existen y responden. Dos pintan una pantalla que dice qué
módulo van a ser y que no está implementado; la wiki tiene cinco guías completas.

---

## Wiki 3D: el formato cambió y el módulo se rehízo

**Los cuatro artículos de 5.600–7.900 palabras están borrados y las guías están
escritas.** Son cinco: `warping-pla`, `separaciones-entre-capas`, `temperatura-cama`,
`adhesion-primera-capa` y `enclosure-y-warping`. El plan está en [`plan-guias.md`](plan-guias.md).

| Antes | Ahora |
|---|---|
| `src/content/wiki/*.md`, un artículo por tema | `src/content/guias/<slug>.ts`, una guía tipada por tema |
| Un `h1` y nueve secciones, en orden de redacción | Cuatro etapas: diferencial, variables, conocimiento, reglas |
| Las cifras dentro de frases | Cada cifra con su `valor` y su `nota` de alcance |
| Enlaces cruzados como `[[slug]]`, que se encendían al existir la página | `enlaza: { guia }`, y `verify:guias` falla si la guía no existe |
| 5.600–7.900 palabras por artículo | Reglas y tarjetas cortas, filtradas por lo que declara quien lee |

Lo que no cambió: `wiki/raw/` sigue siendo inmutable, `wiki/cooked/` sigue siendo el
filtro y las tres capas siguen teniendo la misma frontera. Lo que cambió es lo que
produce el redactor, y `.opencode/agents/redactor.md` y `revisor.md` están escritos
para el formato nuevo. Si no se hubieran cambiado, el redactor seguiría produciendo
Markdown y la guía nueva no aparecería: un fallo silencioso.

### Lo que hace que la página no sea un documento

1. **El diferencial va primero y tiene salida.** Warping y separación entre capas se
   parecen en la foto; las tres preguntas del principio los separan, y si la respuesta
   es «no», el enlace lleva a la otra guía y **limpia las respuestas** de la anterior.
2. **La recomendación se calcula.** Sin marcar nada no sale ninguna acción, y la lista
   se llena a medida que se declara el montaje. Cambiar la chapa de la Textured PEI a
   la Cool Plate cambia la cifra de 45–65 °C a 35–45 °C. Y con un G-code cargado, la
   acción que da un intervalo dice **dónde cae tu valor**: «Tu cama: 50 °C · objetivo
   35–45 °C · 5 °C por encima».
3. **El panel enlaza a la sección, no a la cabecera, y el analizador precontesta la
   guía.** «Riesgo de warping, 35 %» lleva a `#c-riesgo`, la tarjeta que explica ese
   número, y `bedTemp` a `#v-material`. Con un G-code cargado, `material` y `bedTemp`
   ya salen marcados, sin que nadie los escriba.
4. **El carril derecho sustituye al panel de análisis** en las rutas de la wiki. Antes
   eran 320 px de «Sube un archivo para ver el análisis técnico automático» junto a
   contenido que no tiene nada que ver con un archivo. Ahora es el estado del
   diagnóstico: cuántas acciones se han desbloqueado y qué variables faltan.
5. **La guía enseña los datos de tu archivo, y cada uno lleva a donde lo explica.**
   Con un G-code cargado, una franja entre la cabecera y el diferencial enseña material,
   cama y los dos veredictos, y cada dato enlaza a la variable o a la tarjeta que explica
   ese dato. Sin archivo no hay franja, ni caja, ni espacio: es el caso de quien llega
   por un buscador y el del HTML exportado para GitHub Pages.

### La barra «Tu archivo», y por qué enseña tan poco

Pinta **los campos que esa guía declara** (`leeDelAnalisis` y `campos`), y nada más:
`warping-pla` enseña cuatro, `temperatura-cama` dos y las otras dos uno cada una. Un
dato que la guía no explica sería una fila que no lleva a ninguna parte, y una fila que
no lleva a ninguna parte es ruido con apariencia de información. Añadir un campo a la
barra es, por tanto, escribir su nombre en la guía.

El destino del enlace lo declara el elemento que lo explica, con `campos` en la
variable o en la tarjeta, y no una convención sobre nombres: la variable `cama` de
`warping-pla` recoge `bedTemp`, y en `temperatura-cama` la que lo recoge es `material`,
porque en esa guía los rangos de cama están escritos en sus opciones. Inferirlo del
nombre mandaría el dato a un sitio distinto en cada guía, y sólo una de las dos sería
la correcta.

Lo que no se puede es prometer un enlace que no lleva a nada. `verify:guias` exige
que todo campo declarado tenga un sitio donde se explique y que una tarjeta con
`campos` no esté filtrada por una condición —una tarjeta con `cuando` no existe hasta
que se declara su variable, y su `id` tampoco—. Ese segundo caso salió al comprobar el
HTML exportado, no al escribir la guía: `cama-bambu` no se pinta sin declarar nada, así
que un enlace a ella no tenía destino.

### La regla que más quebraderos ha causado

**Ninguna variable puede ser decorativa.** Preguntar algo que no cambia el resultado
hace que quien marca la casilla vea que la lista no se mueve, y concluya que la guía no
reacciona. `npm run verify:guias` lo comprueba y encontró dos variables muertas en el
primer borrador.

Y la comprobación **invertida** —que una variable cambie el resultado por sí sola— salió
mal dos veces, por la misma razón: PLA y PLA-CF dan exactamente lo mismo porque
comparten fila en la tabla de Bambu, y `tamaño` no hace nada sin material. La versión
correcta busca **alcanzabilidad**: que las opciones difieran en *alguna* combinación de
las variables que conviven con ella.

### Lo que había antes, y sigue en pie

**Ruta, buscador y panel atado a las guías: hechos, en `d357ddf`.**

Los tres fallos que sólo salieron al medir están en el historial del commit y
vuelven a aparecer aquí porque son el tipo de cosa que no se ve en una captura:

| Fallo | Por qué no se veía |
|---|---|
| Contenido recortado a 375 px | Los hijos del grid vienen con `min-width: auto` y no pueden encogerse: 462 px de contenido en un carril de 335. Con `overflow-x: hidden` **no hay barra horizontal**, así que se recorta sin aviso |
| Línea de 37 caracteres a 1200 px | El umbral del reparto en dos columnas la estrechaba **al activarse**. Medido carácter a carácter, 9,47 px, no `ch` |
| El realce no se movía a partir de 1200 px | El `scroll` lo escuchaba `window` y quien se desplaza es `.canvas-area`; y la línea de lectura nacía del propio artículo, que al bajar arrastraba el umbral |

### Las tres decisiones que cierran el contenido

**1 · Un artículo puede cubrir varios campos; un campo, nunca dos artículos.**
`warpingRisk` y `riskLevel` son el mismo dato en dos versiones, la categoría y el
número, y que el panel enlace desde dos sitios al mismo artículo no es duplicación.
Al revés sí hay ambigüedad, y el panel no sabría a cuál mandar.
`src/lib/wiki-campos.ts` lo hace cumplir `verify:wiki`: un campo con dos slugs es un
error de datos que el `Record` se tragaría en silencio.

**2 · El panel enlaza siempre, y el artículo explica por qué puede faltar.** Un
artículo atado a un campo **opcional** de `ProjectMetadata` lleva una sección que
contesta por qué el slicer de este G-code no lo escribió. Que el panel haya pintado
«—» es una razón más para leer el artículo, no menos.
`verify:wiki` lee la lista de opcionales de `src/services/types.ts` y no de una copia,
para que añadir un campo opcional al tipo no deje de exigir su sección en silencio.

`warping-pla` **no** lleva esa sección, y está comprobado: `warpingRisk` y
`riskLevel` son obligatorios en `JevClassification`.

**3 · La línea de 35 caracteres a 375 px se queda, y es un límite, no una deuda.**
El suelo de 45 caracteres es **aritméticamente imposible** a 375 px: un carácter
ocupa 9,47 px medidos, así que 45 necesitan 426 px de caja y la pantalla tiene 375.
Medido también cuánto gana quitando relleno: 16 px por lado dan **dos** caracteres,
35 → 37, y llegar a 40 exige quitar los 40 px con el texto pegado al borde de la
pantalla. Comprar un carácter a costa de aire no es una mejora. La otra vía es bajar
el cuerpo, y llegar a 45 con 335 px de caja pide 12,6 px: peor de leer que una línea
corta con 16. Los otros cuatro anchos sí se comprueban contra el rango, y fallan si
salen.

### La publicación ya no está bloqueada por nada

El canal de contacto está puesto: `contacto@wiiki-3d.com`, con su `mailto:` en
`/contacto`. **AdSense ya no tiene el bloqueante de la página de contacto.**

Dos decisiones detrás de esa dirección, y la segunda es la que no se ve:

- **Es un buzón del dominio, no una dirección personal.** Cloudflare Email Routing
  reenvía `contacto@wiiki-3d.com` a la bandeja real; la página enseña la del dominio.
  Un sitio que se va a monetizar y que expone un `@gmail.com` en su página de
  contacto manda una señal que la revisión de contenido no lee bien: que el
  proyecto es de alguien suelto y no de una publicación. `verify:wiki` lo comprueba.
- **El aviso de «canal sin configurar» ha desaparecido de la página.** Cuando
  `CONTACTO` estaba vacío, ese aviso era honesto; con la dirección puesta, el mismo
  `if/else` era la cosa que podía volver a mentir si alguien vacía la constante. Se
  fue el `if/else` entero en vez de dejar la rama muerta encendida, y `verify:wiki`
  comprueba que el enlace `mailto:` existe, que su texto coincide con él y que no
  queda el aviso.

### Lo que ninguna comprobación puede coger aquí

**Que la dirección sea la correcta.** Escribí `hola@wiiki-3d.com` y el enrutado
configurado en Cloudflare es `contacto@wiiki-3d.com`. Cuatro comprobaciones
automáticas en verde, un `mailto:` bien formado y una página de contacto que rebota:
justo el requisito de AdSense que el commit anterior parecía haber desbloqueado.

Ninguna expresión regular distingue una dirección que funciona de otra que rebota.
Las cuatro comprobaciones del contacto verifican la **forma** —que haya un `mailto:`
con algo dentro, que el texto coincida, que la dirección se lea en la página— y todas
pasan con la dirección equivocada.

La defensa es una sola y no es automática: **antes de publicar, contrastar la
constante de `src/routes/InfoRoute.tsx` con la configuración de Email Routing.**
Está en una constante y en un solo sitio a propósito, para que contrastarla sea
mirar una línea.

### Los nueve artículos

`docs/plan-de-contenido.md` los tiene: el orden justificado, las fuentes candidatas
**verificadas una a una con `curl` y con su `<title>` leído**, los comandos de los
cuatro agentes, once criterios de aceptación medibles, y la advertencia de por qué
van en lotes de dos o tres y no de golpe.

Dos cosas que salieron de recoger esas fuentes y que **no se han aplicado**:

- **La tabla de materiales de Bambu sí se lee** —seis `<table>` reales— y da la
  temperatura de cama por material: PLA **35–65 °C**, PETG 60–80, ABS y ASA
  90–100, PC 100–120. Eso **resuelve la contradicción 1** del material cocinado: los
  dos números que allí parecían discrepar son los dos extremos de un mismo rango por
  material. Y el techo de 65 °C deja de ser «una sola fuente, de foro» y pasa a estar
  en la tabla oficial de Bambu.
- **La contradicción 3 del enclosure tiene respuesta oficial**: para PLA, con la cama
  por encima de 45 °C, Bambu recomienda abrir la puerta frontal y quitar la tapa
  superior. Los dos fabricantes llegan a lo mismo desde lados opuestos.

No se ha tocado `wiki/cooked/` ni el artículo: son salida del pipeline, y el artículo
ya pasó revisión. Queda anotado para que lo haga el pipeline.

---

## Decisiones pendientes

Sólo las abiertas. Las resueltas están en el documento de historias, marcadas
**RESUELTA**, y no se repiten aquí.

| ID | Qué hay que decidir | Quién decide |
|---|---|---|
| **P3** | ¿Cuántos artículos tendrá la Wiki 3D y quién los escribe? Decide si el buscador de H-1.2 hace falta o basta un `includes()` sobre un array. | Producto |
| **P4** | ¿Cómo se desglosa el coste en la calculadora? Sólo material, o material + máquina. Si el desglose necesita potencia y precio de la energía, hay que decidir si la app se los pide a la persona. | Producto |
| **P5** | ¿Cuál de los cuatro se construye primero? | Producto |
| **P6** | *(resuelta en parte)* La raíz `/` es la pantalla de subida. Sigue abierta dónde vive el historial de H-3.1. Hay una propuesta medida en [la discusión de P6](#p6-propuesta-medida). | Producto |
| **P8** | ¿Puede usarse la app sin sesión, y qué se pierde? Necesario para escribir los criterios de aceptación de cualquier historia que toque datos persistentes. | Producto |
| **P9** | ¿Es multi-usuario? Si sí, S1 y S2 caen los dos y el documento de historias hay que reescribirlo entero. | Producto |
| **P10** | ¿Se cambia algo de lo actual antes de añadir nada? Formatos soportados, visor de G-code sin implementar, y la ruta real de Jev (S5) son decisiones abiertas. | Producto |
| **P11** | ¿Se puede tocar `JevService.ts`? Está marcado como cerrado. Entender su contrato hace falta para H-2.1. | Producto |

Los cuatro supuestos —**S1** sin backend, **S2** sin cuentas, **S3** persistencia en
IndexedDB, **S5** diagnóstico heurístico— no son decisiones: son lecturas de cómo
está el mundo hoy, y cada uno dice qué cambia si es falso. **S4**, el alcance
realista de 2 módulos, es una lectura de producto y se resuelve con P5.

---

## Lo que no está bloqueado por nada: **Taller**

Es la respuesta a "¿qué puedo hacer ahora?".

No necesita persistencia, ni backend, ni cuentas, ni ninguna de las preguntas
abiertas para su historia principal. **Los datos ya están**: el parser extrae
material, gramos y tiempo, y `AnalysisContext` los expone cuando hay un G-code
cargado.

Único supuesto suyo: que "Taller" sea una calculadora de coste a partir de esos
metadatos. Está marcado como lectura en el documento de historias, no como
requisito cerrado.

---

## Lo que no necesita conexiones ni credenciales

**Taller y Wiki 3D se pueden construir enteros sin backend.** Ninguno guarda
nada, ninguno llama a un servidor.

**Inicio y Proyectos también, con una condición**: que la persistencia sea local.
Sin backend, es IndexedDB en el navegador de quien los usa, y con la limitación
ya escrita en H-4.1 —un análisis guardado no se puede volver a abrir en el
visor porque no está el archivo.

La app **no** necesita cuenta de API para funcionar hoy. La única ruta que
consume un servicio externo es la clasificación de Jev, y está en modo simulado
(ver S5).

---

## Lo que sí necesita algo externo

| Qué | Estado | Detalle |
|---|---|---|
| El pack de desarrollador | **Pendiente** | Sin rellenar. No se afirma ninguna oferta ni ninguna versión: hasta que la plantilla se devuelva, no hay nada que evaluar. |
| API real de Jev | **No disponible** | La cuenta está sin crédito y su API rechaza la clave con `401`. La ruta nunca ha devuelto un `200`. Hay un Worker de Cloudflare desplegado que hace de proxy y mantiene la clave fuera del bundle; la ruta simulada es la activa. |
| Backend propio | **No decidido** | Depende de S1. Si algún día se quiere, la sección [Qué cambia si hay backend](historias-de-usuario.md#qué-cambia-si-hay-backend) del documento de historias dice qué se resuelve solo y qué hay que reemplazar. |

---

## Deuda técnica

### Cerrada

| Punto | Commit | Qué era |
|---|---|---|
| **Subida inalcanzable con teclado** | `e2fabbb` | Los dos disparadores eran `<label htmlFor>`, que no es un control enfocable: su `tabIndex` es −1. El input tenía `display: none`, que lo saca del orden. El único control alcanzable era «Iniciar Sesión», que no hace nada. Ahora son `<button type="button">`. |
| **Overlay del `Suspense` anclado al viewport** | `e2fabbb` | `.viewer-overlay` es `position: absolute` y su padre aquí era `position: static` sin ancestro posicionado: medía 768×667 en (0,0) y pintaba encima con `z-index: 10`. El fallback ahora es un `.viewer-3d-container` con su overlay dentro. |
| **Copy que nombraba una posición falsa** | `e2fabbb` | El aviso de los G-code decía «el panel derecho», y por debajo de 1200 px el panel está debajo. Ahora no nombra la posición. |
| **Comentario del `ParserService` que mentía** | `ef4ae53` | Decía que el parseo era simulado, y no lo es. |
| **Boilerplate de Vite en `index.css`** | `85b2824` | Paleta clara, tipografía de 18 px y `#root { width: 1126px; text-align: center }`. No era cosmético: la escala tipográfica cambiaba sola a mitad de pantalla, y `h1, h2 { color: var(--text-h) }` pintaba el título de la zona de subida casi negro sobre fondo oscuro. |
| **Sin `<h1>` en ninguna ruta, y salto de nivel** | `df1f3f0` | Medido: `/` sin archivo tenía `h2, h3`; `/` con archivo tenía `h3, h4, h4` y **ningún encabezado en la columna central**; las otras tres rutas tenían `h1, h3`, un salto de 1 a 3. Ahora hay un `h1` por ruta y la jerarquía no salta. Verificado por `verify:rutas`, y comprobado que **falla** contra el código anterior. |

### Abierta

| Punto | Estado | Detalle |
|---|---|---|
| **`CAMPOS_WIKI` es una tabla escrita a mano** | Abierto, verificado | `src/lib/wiki-campos.ts` no puede derivarse del contenido sin meter los artículos en el chunk inicial. `scripts/verify/wiki.mjs` lo comprueba contra el frontmatter real, así que desfasarse rompe la verificación y no la aplicación. Con siete campos atados habrá que vigilar que no aparezcan dos enlaces al mismo artículo en la misma sección del panel. |
|---|---|---|
| **Visor por debajo de 150 px a 640×360** | **Cerrado** | El suelo del visor era `min-height: 40dvh` sin suelo propio, y 40% de 360 px son 144. Ahora es `max(40dvh, 150px)`, con el mismo número que el umbral del script. Medido que sólo cambia en **un** viewport de los 29: los otros 28 dan los mismos píxeles, porque donde `40dvh` ya supera 150 el `max()` devuelve el porcentaje, y a 768+ el suelo está anulado por el tramo de 1200px. `verify:layout` pasa las 7 de 7. |
| **`modelPixels()` es una réplica manual** | Abierto, documentado | `scripts/verify/probe.mjs` replica la aritmética de `frameCamera()` de `Viewer3D.tsx`, y `scripts/verify/investigacion/frame.mjs` es una tercera copia. Si la función cambia, el barrido compararía números viejos **sin avisar**. Está escrito en ambos README, pero no hay ninguna comprobación automática que detecte la desincronización. |
| **Comunidad del grafo sin nombre** | Abierto, cosmético | Sin clave de API, `graphify cluster-only .` deja las etiquetas como `Community N`. Los nodos y las aristas sirven; las etiquetas no describen nada. |
| **Relaciones escritas en prosa** | Abierto, no automatizable | Hay 0 aristas entre `src/` y `scripts/verify/` porque la relación entre `Viewer3D.tsx` y `probe.mjs` es una duplicación documentada, no un import. Ningún extractor de AST puede verla; hay que seguir leyendo el README. |

### La lista de ocho

La fase anterior dejó una lista de **ocho** puntos de deuda. **No está
versionada**: no aparece en el README, ni en el documento de historias, ni en los
mensajes de los commits. Los seis cerrados y los cuatro abiertos de arriba se
reconstruyeron desde `git log`, no desde esa lista.

Los dos puntos que no aparecen en las tablas de arriba **faltan por eso**, y no
se inventan. Si existe la lista, pegarla aquí y se completa.

---

## P6, propuesta medida

Decisión tomada: **`/historial` es una ruta propia**, la barra inferior mantiene
**cuatro** destinos —Inicio, Taller, Wiki 3D, Proyectos— porque ése es el conjunto
de módulos, y se llega a `/historial` con un enlace de una línea desde `/`, visible
siempre. Sin implementar: va después de la persistencia, que no está decidida.

Lo que se midió para sostener esa decisión, y que queda aquí para que no haya que
repetirlo:

**La lista dentro de `/` era viable**, y en la primera medición pareció que no. La
La primera vez se concluyó que no cabía, y esa conclusión estaba mal: se
medía el estado actual en vez del estado con la lista dentro. Al inyectarla:

| Viewport | `.canvas-area` antes | después | ¿se recorta? |
|---|---|---|---|
| 375×667 | 326 px | 798 px (+472) | **No, cabe entero** |
| 700×900 | 346 px | 421 px (+75) | **No, cabe entero** |
| 1200×900 | 831 px | 831 px (+0) | **No, cabe entero** |

La fila del grid es `auto`, así que crece, y lo único que cambia es que a 375×667
el documento pasa de 667 a 1135 px y empieza a hacer scroll. Con un STL cargado,
donde el visor tiene `aspect-ratio: 16/10`, tampoco recorta.

**El enlace de una línea cabe en todas partes**, y es lo que hace que la decisión
sea barato: a 375 px son 36 px de alto y hace que `.canvas-area` crezca 38 px.

---

## Cómo comprobar el estado

```bash
npm run lint
npm run build
npm run verify:layout     # 29 viewports x 3 estados. 7 de 7 aserciones pasan
npm run verify:guias      # el motor, las cinco guías y la barra «Tu archivo». 139 de 139
npm run verify:teclado    # orden de tabulación y foco visible
npm run verify:rutas      # las cuatro rutas, la jerarquía de encabezados, el foco
npm run verify:wiki       # las guías en navegador, con y sin archivo. 121 de 121
npm run verify:seo        # HTML estático, canonical y lectura sin JavaScript. 72 de 72
npm run verify:taller     # los cinco estados de la calculadora. 180
npm run verify:historial  # el historial y sus tres vistas. 102
npm run verify:overlay    # el overlay del visor
```

Los nueve salen con código 1 si algo falla. Los de navegador levantan su propio
`vite preview` si no hay uno escuchando, así que no hace falta levantar el servidor
antes: ejecutarlos contra un `dist` viejo mide el `dist` viejo. Ha pasado dos veces
esta semana, y en las dos el `tsc` había parado el build sin que se viera en el
resultado de la prueba.

Y una comprobación que no se ha visto fallar no está comprobada: las de la barra
«Tu archivo» se rompieron a propósito una vez cada una —borrando el `campos` de una
variable, escribiendo mal un nombre de campo, cambiando un `id` para que dejara de
coincidir con su `href`, y pintando la barra sin archivo— para ver cuál salía en rojo.
La tabla está en [`kanban.md`](kanban.md).