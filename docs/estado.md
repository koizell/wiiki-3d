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
| **Inicio** | H-3.1, H-3.2, H-3.3 | En curso | La pantalla de subida **está hecha** (`/`). Falta el historial, y dónde vive es P6. |
| **Taller** | H-2.1, H-2.2 | No empezado | **Nada.** Es el único que no depende de ninguna decisión pendiente. |
| **Wiki 3D** | H-1.1, H-1.2 | En curso | Nada técnico. Las rutas, el buscador y el primer artículo **están hechos**; falta contenido, que es trabajo de pipeline y no de código. El plan está en [`plan-de-contenido.md`](plan-de-contenido.md): nueve artículos por escribir. |
| **Proyectos** | H-4.1 | Bloqueado | **S1 + S3**: sin backend, los datos viven en la máquina de quien los guarda. Y con P2 resuelto, guardar el análisis no permite volver a abrir el archivo en el visor. |

Las cuatro rutas existen y responden. Dos pintan una pantalla que dice qué
módulo van a ser y que no está implementado; la wiki ya tiene contenido.

---

## Wiki 3D: fase 3 cerrada, contenido pendiente

**Ruta, buscador, tabla de contenidos y el panel atado a los artículos: hechos, en
`d357ddf`.** Verificado con `scripts/verify/wiki.mjs`, nuevo, 84 de 84.

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

### Lo único que bloquea la publicación

**El canal de contacto.** `CONTACTO` en `src/routes/InfoRoute.tsx` está vacío a
propósito y la página de Contacto lo dice en pantalla en vez de enseñar un correo
inventado. Es un paso de publicación, no de desarrollo: poner la dirección real en
ese sitio. **Una página de contacto sin forma de contacto falla la revisión de
AdSense**, así que es el bloqueante único.

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
| **Visor por debajo de 150 px a 640×360** | Abierto, conocido | Es la única aserción que falla de `verify:layout`: el visor mide 144 px, y por debajo de 150 px el modelo en pantalla baja de 115 px. Los otros seis controles pasan, y los 29 números dan lo mismo que antes de este trabajo. |
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
npm run build
npm run verify:layout     # 29 viewports x 3 estados. 6 de 7 aserciones pasan
npm run verify:teclado    # orden de tabulación y foco visible
npm run verify:rutas      # las cuatro rutas, la jerarquía de encabezados, el foco
npm run verify:wiki       # la wiki y las tres páginas de información. 77 de 77
```

Los cuatro salen con código 1 si algo falla. `verify:layout` falla a propósito en
640×360: es la deuda abierta de la tabla de arriba.