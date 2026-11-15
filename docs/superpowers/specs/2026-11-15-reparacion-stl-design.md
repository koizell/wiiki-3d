# Revisión y reparación de STL en el navegador

**Fecha:** 2026-11-15
**Rama:** `feat/reparacion-stl`
**Estado:** aprobado; decisiones de implementación posteriores al final del documento.

## Qué se quiere y por qué

Hoy, cuando alguien sube un `.stl` a `wiiki-3d.com`, el visor lo pinta y el
panel derecho dice que ese formato no trae metadatos. El archivo entra, se ve
la pieza y ahí se acaba todo: no se dice si la malla está rota, ni qué le
falta, ni se ofrece arreglarlo.

La referencia es [JustFixSTL](https://www.justfixstl.com/es/): soltar un STL,
ver un análisis de topología y repararlo con un clic, sin subirlo a ningún
servidor. Quien imprime sabe que una malla con agujeros o normales invertidas
arruina la impresión, y descubrirlo después de laminar es tiempo perdido.

La pieza que falta no es un visor más: es un **diagnóstico que aparece solo**
cuando el archivo lo necesita, y una reparación que se pueda descargar. Y
tiene que convivir con lo que ya existe, sin tocar el flujo de G-code ni el
export estático.

## Objetivos

- Al soltar un `.stl`, analizar la malla en el navegador y decir en el panel
  derecho si está sana o rota, con las cifras que lo sostienen: vértices,
  caras, agua-tight, manifold, componentes, agujeros, normales invertidas,
  triángulos degenerados y duplicados.
- Ofrecer una reparación en un clic, y que el resultado se pueda **descargar**
  como STL, con un resumen de qué cambió y qué no se pudo arreglar.
- No bloquear la interfaz: el análisis y la reparación corren en un Web
  Worker.
- No subir el archivo a ningún sitio. Todo ocurre en el navegador, y el sitio
  puede decirlo sin mentir.
- Que el visitante que no sube nada no pague ni un byte de WebAssembly.

## No objetivos

- Editar la malla a mano (mover vértices, cortar, esculpir).
- Decimar o simplificar como función de producto, aunque la librería lo
  permita.
- Soportar OBJ, OFF o PLY en esta versión.
- Guardar el STL o su geometría en IndexedDB, en el historial o en el
  servidor.
- Prometer que la pieza reparada imprime bien: la reparación arregla la
  topología, no la geometría que el diseñador quiso hacer.

## Anti-objetivos

- Presentar el arreglo como una prueba de calidad de impresión.
- Cambiar la forma de la pieza sin decirlo: si se rellena un agujero, el
  informe lo dice y el original sigue descargable.
- Meter el `.wasm` en el chunk inicial o en el render estático de Node.
- Tocar `AnalysisContext`, el panel de G-code o el flujo de `/taller` para
  algo que se puede hacer al lado.

## Enfoques considerados

**A. Analizador propio en TypeScript, dentro de un Web Worker.** Leer el
`ArrayBuffer`, indexar aristas y detectar agujeros, non-manifold, normales
incoherentes y triángulos degenerados; reparar lo conservador y exportar STL.
Es control total y cero dependencias nuevas. Cuesta escribir y mantener el
algoritmo, y rellenar agujeros con robustez es justo la parte difícil. Se
descartó al comprobar que la referencia no lo hace así y que ya existe una
librería que lo resuelve.

**B. El enfoque de JustFixSTL: `meshfix-wasm` en un Web Worker, Three.js para
el visor.** *(Elegido.)* JustFixSTL carga `/assets/meshfix-core-*.wasm`
(638 KB) y su propio pie dice «Powered by meshfix-wasm». El paquete es MIT,
sin dependencias, con el binario compilado desde la PMP Library en C++, y
expone exactamente lo que hace falta: `analyzeDetailed`, `repair`, `reparse`,
`exportMesh`, más un desglose de agujeros que distingue un taladro de un
desgarro. Aporta el motor sin aportar el producto: la interfaz, el veredicto,
la integración y las decisiones de qué reparar son nuestras. Riesgo: el
paquete es joven (0.6.1) y pequeño en adopción; se mitiga degradando a
informe cuando el motor falle.

**C. Otra librería WASM de mallas (`manifold-3d` y similares).** Más madurez
en geometría booleana, pero no trae análisis de topología orientado a
impresión ni informe de agujeros; habría que construir encima la mitad de A.
Peso y complejidad mayores para menos producto.

## Restricciones del proyecto

- **El export estático se renderiza en Node.** `scripts/export-static.mjs`
  llama a `ssrLoadModule('/src/lib/static-pages.tsx')` y `renderToStaticMarkup`
  recorre el árbol. No puede haber `window`, `document`, `Worker`,
  `WebAssembly` ni `FileReader` durante el render: todo lo que use el motor
  vive dentro de un efecto.
- **La portada se exporta sin visor.** `static-pages.tsx` pinta
  `Inicio interactivo={false}` sin hijos, así que tres.js no entra en el HTML
  estático. La herramienta nueva tiene que respetar eso.
- **`public/meshfix/` y un script de copia.** El worker de la librería es un
  *classic worker* que hace `importScripts("meshfix-core.js")` con un string;
  Vite no descubre ese fichero ni el `.wasm`. Se copian los tres a
  `public/meshfix/` antes de `dev` y de `build`, y se pasan las rutas
  explícitas al inicializar.
- **El archivo no se persiste.** `AnalysisContext` guarda el `File` en
  memoria y en IndexedDB sólo el análisis, nunca la geometría. La malla
  reparada vive en memoria hasta que se descarga.
- **Nada de rutas nuevas si se puede evitar.** La herramienta se integra en la
  portada, donde ya está la zona de arrastre. Una ruta nueva obligaría a
  tocar `App.tsx`, `SEO_PAGINAS` y `paginasEstaticas()` a la vez.
- **No se versionan** `opencode.json` ni los directorios no rastreados
  `public/wiki/*`.

## Cómo se construye

### 1. El motor, aislado

`src/services/reparacionMalla.ts` envuelve `meshfix-wasm` y no lo conoce
nadie más. Exporta `analizarMalla(buffer, formato)` y
`repararMalla(buffer, opciones, onProgreso)`, y por dentro:

- Inicializa `MeshFixWorker` una sola vez, con las rutas de `public/meshfix/`,
  y reutiliza la instancia. `dispose()` al desmontar o al cargar otro archivo.
- Traduce los tipos de la librería a los del sitio, sin filtrar nombres en
  inglés a la interfaz.
- Captura cualquier error del worker y lo devuelve como un resultado
  `{ ok: false, motivo }`, nunca como una excepción que tumbe la vista.

### 2. El hook, al lado del contexto

`src/state/useRevisionMalla.ts` lee `file` y `fileType` con `useAnalysis()` y,
si el tipo es `stl`, lanza el análisis automáticamente. Estados: `inactivo`,
`analizando`, `listo`, `reparando`, `reparado`, `error`.

No se toca `AnalysisContext`. La revisión tiene **una sola fuente de verdad**:
el hook se instancia una única vez en el componente que compone el visor y el
panel de la ruta de subida (donde hoy se calcula `analisisVeredicto` y se
renderiza `AnalysisPanel`), y su estado se pasa por props al veredicto sobre el
visor y al bloque de detalle del panel. Así se evita analizar dos veces y se
mantiene un único resultado.

**Cancelación y worker:** cada carga de archivo incrementa una generación; los
resultados de promesas anteriores se descartan si la generación ya no coincide.
Se reutiliza una única instancia sana de `MeshFixWorker`, pero si el archivo
cambia mientras hay trabajo en curso o el worker queda en error, se hace
`dispose()` y se recrea para no colgar la interfaz ni mezclar estados. El
resultado no se guarda en IndexedDB.

### 3. El informe, donde ya está el panel

`AnalysisPanel` ya recibe `fileType`. Cuando vale `stl`, en lugar del aviso
de «formato sin metadatos» pinta un bloque `RevisionMalla` con el resultado
del hook: un veredicto en una línea y la lista de problemas con su cuenta.
Nada de tarjeta nueva en la portada ni botón antes de subir: el informe
aparece porque hay un archivo y desaparece porque no lo hay.

El veredicto se iza sobre el visor con la clase que ya existe,
`.analisis-veredicto`, igual que el del G-code: «Malla cerrada y manifold»,
«Malla con 2 agujeros», «No se pudo analizar». El panel derecho se queda con
el detalle y la acción.

Las cifras van en un `<dl>` como el resto del panel: vértices, caras,
componentes, agujeros, aristas de borde, normales invertidas, caras
degeneradas y duplicadas. Los problemas se agrupan por severidad con las
clases `risk-*` que ya existen, para no inventar un lenguaje visual nuevo.

### 4. Reparar y descargar

La detección es automática al cargar un `.stl`. Si el análisis encuentra algo
reparable, el panel ofrece el arreglo más seguro por defecto: un botón
«Reparar la malla» que ejecuta `repair()` con las opciones estándar (las que
conservan como deliberados los agujeros que la librería marca así). Mientras
trabaja, nombra el paso en curso —soldar, limpiar degeneradas, cerrar agujeros,
orientar normales— con el `ProgressEvent` que emite la librería.

Al terminar no se sustituye nada en silencio y **el visor 3D sigue mostrando la
pieza original**. El panel pasa a un resumen de antes y después: vértices y
caras, agujeros rellenados, normales corregidas, caras eliminadas. Debajo, un
enlace de descarga con `<original>-reparado.stl`, construido con un `Blob` y
`createObjectURL`, revocado al desmontar. El archivo original sigue donde estaba:
la reparación es una copia descargable, no una edición del archivo cargado.

Cuando el análisis no encuentra nada, no hay botón: el veredicto dice que está
cerrada y ahí se acaba. Un botón «Reparar» que no hace nada enseña a desconfiar
de los botones.

### 5. Los agujeros que no son daño

Un taladro pasante y un desgarro son el mismo bucle de borde. La librería los
separa —`describeHoles()` informa diámetro, desviación de plano, variación de
radio y profundidad— y deja intactos los que parecen deliberados, contándolos
en `holesSkippedAsFeature`.

El arreglo automático por defecto es el conservador: respeta esos agujeros. El
panel los nombra en vez de esconderlos: «5 agujeros parecen geometría deliberada
y no se han tocado», con una acción aparte para «rellenar también los agujeros
deliberados». Esa acción ejecuta una nueva reparación **sobre el buffer original**
con `fillFeatures: true` y produce un nuevo resultado descargable (sin sustituir
silenciosamente el anterior hasta que termine). Así el comportamiento por defecto
es el más seguro, y quien lo necesite puede pedir el arreglo agresivo de forma
explícita.

### 6. Límites, dichos antes de chocar

Solo `.stl` en esta versión. La librería lee OBJ, OFF y PLY, pero la
validación del sitio es por extensión y ampliar formatos es otra decisión,
con sus propias pruebas.

El archivo se copia entero a memoria y al worker, así que el tamaño se
avisa antes: por encima de 60 MB el panel advierte de que el análisis puede
tardar y de que en un móvil puede no terminar; por encima de 150 MB se
rechaza con un mensaje claro. Es un límite honesto, no una promesa de que
todo cabe.

## 7. Cuando el motor no carga

El visor tiene que seguir funcionando aunque `meshfix-wasm` falle, porque
un archivo que no se puede analizar sigue siendo un archivo que se puede
mirar. Si el worker no arranca —red, CSP, un navegador sin WebAssembly,
una versión futura del paquete que cambia la ruta del `.wasm`— el hook
pasa a `error` con un motivo escrito en castellano y el panel muestra tres
cosas: qué pasó, que el visor y el resto de la aplicación siguen
disponibles, y un enlace a `/contacto` para contarlo.

Nada se rompe, nada se queda cargando para siempre. El botón de reparar
no aparece en ese estado: ofrecer una acción que va a fallar es peor que
no ofrecerla.

El motor tampoco es una dependencia del render: el import de
`src/services/reparacionMalla.ts` es dinámico y solo ocurre dentro de un
efecto, después de que haya un archivo. Quien abre la portada no descarga
ni un byte de WebAssembly.

## 8. Cómo se comprueba

Sin pruebas unitarias del motor: el algoritmo es de otro y ya viene
probado. Lo que se prueba es la costura entre la librería y el sitio, que
es lo único que escribimos.

- **Pieza sana**: un cubo cerrado de 12 triángulos da `isWatertight` y
  `isManifold` verdaderos, cero agujeros y cero problemas; el panel dice
  «Malla cerrada» y **no** ofrece reparar.
- **Pieza con un agujero**: el mismo cubo sin una cara da un agujero, un
  bucle de borde y `isWatertight` falso; el panel lo cuenta y el botón
  aparece.
- **Pieza con normales invertidas**: un cubo con las caras hacia dentro
  cuenta como problema y la reparación lo corrige; el volumen cambia de
  signo antes y después.
- **Archivo enorme**: el aviso de 60 MB aparece y el de 150 MB rechaza sin
  intentar analizar.
- **Motor caído**: con la ruta del worker rota a propósito, el panel
  muestra el error y el visor sigue pintando la pieza.
- **El export estático**: `npm run build` sigue exportando las mismas 44
  páginas con el mismo HTML; el `.wasm` no aparece en `dist/assets` ni en
  el HTML de portada.

Las tres piezas de prueba (cubo, cubo abierto, cubo invertido) se generan
en el propio test con un STL binario de 12 o 11 caras escrito a mano: no
hace falta ningún archivo de `public/`.

## 9. Riesgos, dichos antes de empezar

- **El paquete es joven.** `0.6.1`, un autor, dos estrellas. Un cambio de
  ruta del `.wasm` o del worker rompe la herramienta hasta que se ajuste la
  copia a `public/meshfix/`. Mitigación: los tests de la costura fallan
  antes que el usuario.
- **El relleno de agujeros puede tapar algo que no era un error.** La
  librería ya intenta distinguirlo y lo reporta; el diseño lo enseña antes
  de rellenar. Si aun así el resultado no convence, el original sigue ahí:
  la reparación nunca sobrescribe.
- **La reparación no garantiza que la pieza imprima.** Cerrar una malla no
  arregla paredes de 0,2 mm ni un diseño que no cabe en la cama. El panel
  lo dice con esas palabras y no promete más.
- **El tamaño manda.** Un STL de 80 MB puede tardar minutos y calentar un
  portátil. Los avisos de 60 y 150 MB existen para que eso no sorprenda.
- **Peso en el repositorio.** 757 KB de binarios versionados en
  `public/meshfix/`. Es el precio de que el worker sea determinista; se
  documenta en el README de la carpeta junto a la versión de origen.

## 10. Lo que queda al constructor

- El nombre exacto de las clases CSS y su sitio en `App.css`: se reutilizan
  las del panel (`panel-data`, `risk-*`, `analisis-veredicto`) y se añade
  lo mínimo para el bloque de reparación.
- El texto de cada mensaje, que debe hablar de la pieza y no de la
  librería: «4 agujeros», no «boundary loops».
- El umbral exacto de 60 MB, si la medición en un móvil real sugiere otro.
- El script de copia (`scripts/copiar-meshfix.mjs`) en `predev` y
  `prebuild`, con el mismo estilo que el resto de `scripts/`.
---

## Precisiones durante la implementación

- El estado compartido vive en `AppShell`, ancestro de la ruta y del panel.
- La opción de rellenar aberturas se aplica con `fillHoles(100, true)` después
  de reparar una copia del original; `repair` no acepta `fillFeatures`.
- Los assets del worker se generan desde la dependencia fijada y no se
  versionan en `public/meshfix/`.
- Por decisión posterior del usuario, se admiten STL binarios con bytes
  adicionales: el visor y el análisis usan el tramo declarado y se advierte
  que los bytes adicionales no se analizan ni se conservan en la descarga.
