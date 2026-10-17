# Verificación del layout

Scripts de Playwright que miden el layout responsivo en un navegador real y
comprueban que se uphold las condiciones que importan. Están aquí porque un
`tsc` limpio no dice nada de si el visor 3D mide 165px o 313px: eso sólo se ve
midiendo el DOM después de que el navegador haayout.

Son la herramienta con la que se eligieron los valores del layout. Sin ellos,
cualquier cambio en `App.css` se aprueba a ciegas.

## Requisitos

Playwright está en `devDependencies`:

```bash
npm install
npx playwright install chromium
```

### Dependencias del sistema

El Chromium de Playwright necesita tres librerías que **no vienen en la imagen
de Node de Docker**: `libnspr4`, `libnss3` y `libasound2`. Si el navegador no
arranca con un error de `shared libraries`, hay que instalarlas:

```bash
# con sudo
npx playwright install-deps chromium

# sin sudo: descargarlas y apuntar el loader a ellas
mkdir -p /tmp/chromium-deps && cd /tmp/chromium-deps
for p in libnspr4 libnss3 libasound2t64; do apt-get download $p; dpkg-deb -x *.deb root/; done
export LD_LIBRARY_PATH=/tmp/chromium-deps/root/usr/lib/x86_64-linux-gnu
```

Si `LD_LIBRARY_PATH` hace falta, hay que exportarlo en cada invocación; los
scripts no loponen porque sería una cadena absoluta y dependiente de la máquina.

## Uso

Los scripts arrancan `vite preview` ellos mismos si no hay uno vivo en el puerto
4173, así que hay que tener `npm run build` al día antes.

```bash
npm run build              # los scripts miden dist/, no el código fuente

npm run verify:layout      # barrido: 29 viewports x 3 estados + aserciones
npm run verify:teclado     # ¿las acciones son alcanzables con teclado?
npm run verify:rutas       # las cuatro rutas x los cuatro tramos de ancho
npm run verify:overlay     # estado del overlay del Suspense
npm run verify:shots       # capturas de 768x667 y 768x1024
npm run verify:wiki        # la wiki: buscador, índice, riel, ancho de línea
npm run verify:seo         # metas, canónica y sitemap de la exportación
npm run verify:taller      # los seis estados de la calculadora
npm run verify:historial   # el historial y los proyectos
npm run verify:guias       # el motor de guías y la barra «Tu archivo»
npm run verify:maquinas    # el catálogo contra sus propias reglas
npm run verify:subida     # la subida: arrastre, varios archivos, coste
npm run verify:ui          # la auditoría de interfaz, repetible
```

### Regresiones de UI centrada en tareas

```bash
VITE_JEV_USE_MOCK=true npm run build
node scripts/verify/ux-tareas.mjs
# Con un preview propio ya abierto:
BASE_URL=http://127.0.0.1:5288 node scripts/verify/preview-base.mjs
```

`ux-tareas.mjs` usa el puerto 5287 cuando abre su propio preview y bloquea
peticiones externas. Comprueba subida visible sobre la barra móvil, análisis
principal, recorrido de guías, agrupación, coste, avisos y controles del visor.
La geometría se compara sin texto ni foco superpuestos, para no confundir un
cambio de etiqueta con un zoom real. También reproduce G-code → STL con
Recientes y exige ancho completo y controles fuera del lienzo.
`silueta.mjs` compara los bordes del fixture azul con tolerancia de un píxel de
antialiasing: no confunde ruido mínimo de sombreado con un movimiento real.

`BASE_URL` tiene prioridad en los helpers compartidos y en Historial. Si se
proporciona, `detener()` no cierra ese servidor. `preview-base.mjs` comprueba
ambas garantías para evitar medir o cerrar el servidor de otra sesión.

`verify:layout`, `verify:teclado`, `verify:rutas`, `verify:wiki`, `verify:seo`,
`verify:taller`, `verify:historial`, `verify:guias`, `verify:maquinas`,
`verify:subida` y `verify:ui` salen con código 1 si alguna comprobación falla, así
que valen como paso de CI.

## Qué mide cada script

| Script | Qué mide |
|---|---|
| `barrido.mjs` | 29 viewports × 3 estados (vacío, STL, G-code). Alto del visor, alto del canvas WebGL, proporción, tamaño del modelo en pantalla, quién scrollea, si algo se recorta, alto del `.top-bar`, errores de consola. Cinco aserciones. |
| `teclado.mjs` | Si el input de fichero y los items de navegación están en el orden de tabulación. Recorre el orden real con `Tab`. |
| `rutas.mjs` | Las cuatro rutas × los cuatro tramos de ancho (375, 700, 900, 1280). En cada uno: los cuatro enlaces son `<a href>` focables, el recorrido con `Tab` los alcanza en orden, `Enter` navega, `aria-current="page"` está en el enlace de la ruta activa y sólo en él, y el enlace activo tiene foco visible por dentro de su fondo. Más la jerarquía de encabezados, en **cinco** casos: las cuatro rutas más `/` con un archivo cargado. |
| `overlay.mjs` | Si el overlay del `Suspense` tiene un ancestro posicionado o se ancla al viewport. |
| `wiki.mjs` | La wiki: `/wiki`, `/wiki/:slug` y las tres páginas de información. La búsqueda filtra sin recargar y va en la URL, la tabla de contenidos marca la sección activa **al subir y al bajar**, la barra de «dónde estoy» aparece sin empujar el texto, los enlaces cruzados a páginas que no existen salen como texto y no como enlaces rotos, el ancho de línea se mide en caracteres reales en cinco viewports, `prefers-reduced-motion` apaga las tres animaciones y deja el texto visible, y la tabla de campos atados apunta a artículos que existen y declaran ese campo. |
| `shots.mjs` | Capturas de los dos viewports donde el reparto de altura se nota, en viewport y en página completa. |
| `taller.mjs` | Los seis estados de `/taller` en los cuatro tramos de ancho, incluido el análisis restaurado del historial. La aritmética con la coma y el punto, los precios inválidos, y que los estados que no saben no enseñen ningún número. |
| `historial.mjs` | El historial: guardar, abrir, borrar, el aviso de almacenamiento y los proyectos. |
| `guias.mjs` | El motor de guías: las condiciones, la coherencia de cada guía, el diferencial, las variables, y la barra «Tu archivo». |
| `maquinas.mjs` | El catálogo contra sus propias reglas: sin slugs repetidos, un campo pendiente sin valor, cerramiento declarado con origen, y la regla sin afirmar lo que no puede saber. **No comprueba que las cifras sean verdaderas**: eso lo decide la fuente cocinada. |
| `subida-ui.mjs` | La subida por arrastre y por selector: que el arrastre cancele la acción del navegador, que varios archivos se rechacen, y que el G-code llegue al coste. También que se pueda subir desde `/taller` sin salir de la ruta. |
| `ui.mjs` | La auditoría de interfaz del 14/10/2026, repetible: 11 rutas × 3 anchos con un solo `h1` y sin desbordamiento, las fichas dentro de su tarjeta, los nombres accesibles de las ilustraciones, el contraste calculado de los tokens, `prefers-reduced-motion`, y la mecánica del SVG medida en 7 fracciones del ciclo. |
| `ux-tareas.mjs` | Las 14 regresiones de tareas, incluido acceso a variables de escritorio y llegada real a anclas tras lazy loading; se puede seleccionar `--grupo=entrada`, `guias` o `herramientas`. |
| `preview-base.mjs` | El servidor indicado por `BASE_URL` se utiliza y sigue vivo después de `detener()`. |

## La comprobación de encabezados

`rutas.mjs` comprueba que cada ruta tiene **exactamente un `<h1>` visible** y que
**no hay saltos de nivel** en los encabezados de la página. Son cinco casos, no
cuatro: la raíz tiene dos estados, y cada uno tiene su `<h1>`.

- `/` sin archivo: el título es el de la zona de subida.
- `/` con archivo: el título es el nombre del archivo, en `.file-info`.
- `/taller`, `/wiki`, `/proyectos`: el título es el de cada módulo.

Dos detalles que hacen que la comprobación mida algo:

- **Cuenta sólo encabezados visibles.** Uno con `display: none`, `visibility:
  hidden` o tamaño cero no existe para quien navega con lector de pantalla, y
  contarlo daría un falso "la jerarquía está bien".
- **El orden es el del documento, no el visual.** El panel de análisis está a la
  derecha y sus encabezados van después del del centro, y ésa es la jerarquía
  correcta.

Comprobado que **falla contra el código anterior**: sin el cambio, da `h1=0` en los
dos estados de `/` y salto `1 → 3` en las tres rutas que sí tenían `<h1>`.

## Cómo saber que una comprobación no está vacía

**Vacía el valor que comprueba y mira si cae.** Ese es el método, y no hay atajo.

Una comprobación que pasa en verde no dice que comprueba algo: dice que el valor que
comprueba tiene el valor que tenía cuando se escribió. Las cuatro de aquí no se
detectaron ni por lectura ni mirando si el nombre de la comprobación guardaba
relación con lo que hacía. Se detectaron vaciando una constante a propósito.

### Los cuatro casos reales, y por qué pasaban

| Comprobación | Por qué pasaba en vacío |
|---|---|
| «el texto del enlace es su `href`» | Con la constante vacía el texto es `''` y el `href` es `mailto:`. Y `mailto:` + `''` **es** `mailto:`: comparaba dos cosas iguales y daba verde |
| «no queda el aviso de «canal sin configurar»» | Buscaba un texto que ya no se podía escribir, porque el `if/else` que lo contenía se había ido. Una comprobación de algo imposible es una comprobación muerta |
| «la dirección se lee en el texto de la página» | `slice(7)` de un `mailto:` vacío es `''`, y `texto.includes('')` es **siempre** cierto. Pasaba con la dirección en blanco, que era justo lo que tenía que cazar |
| «`/contacto` menciona «contacto»» | Pasaba porque la palabra estaba **dentro del aviso que se acababa de quitar**: «falta por poner la dirección de contacto». Comprobaba la existencia del aviso, no la del contenido |

El cuarto es el más interesante porque no fallaba al vaciar nada: falló solo al quitar
una cosa que no tenía nada que ver. Una comprobación puede quedar mirando lo
equivocado sin que nadie toque su valor, y sigue en verde.

### Las tres formas de que pase sin comprobar

1. **Comparar dos vacíos.** `a === a - prefijo` cuando `a` está vacío. Siempre
   añade la condición de longitud.
2. **`includes('')`, `startsWith('')` y `'' === ''`.** Vacíos que siempre son ciertos.
   Corta la cadena antes de buscar.
3. **Buscar algo que ya no se puede escribir.** Si el código que producía el texto ya
   no está, la comprobación es histórica, y lo que vigila es la ausencia de algo en
   vez de la presencia de lo que importa.

### Y la que no se puede automatizar

Una dirección de correo bien formada que rebota es indistinguible de una que
funciona. Cuatro comprobaciones en verde y un `mailto:` que no llega a nadie. Eso no
se caza vaciando la constante, porque **la constante está bien escrita**: lo que
está mal es el mundo exterior. Queda una defensa manual —contrastar con la
configuración real— y conviene dejarla escrita junto al código, para que quien lea
sepa que la comprobación automática no la cubre.

## Los dos scripts con los que hay que tener cuidado

`barrido.mjs` corre sobre la raíz y `wiki.mjs` sobre la wiki, y por eso los dos
tienen su propia lista de viewports y no comparten la misma. `barrido.mjs` mide el
visor 3D, que en la wiki no existe, así que los 29 viewports suyos no dicen nada
del ancho de línea de un artículo. `wiki.mjs` mide cinco, porque lo que importa ahí
es dónde cae el corte del reparto en dos columnas, y ese depende de la caja
central y no de la pantalla.

Los dos usan `LD_LIBRARY_PATH` para las dependencias de Chromium, por el motivo que
está en «Dependencias del sistema» más arriba.

## Otro pipeline que usa estos scripts

La Wiki 3D tiene su propio pipeline de generación, con cuatro agentes, en
[`scripts/wiki/`](../wiki/README.md). No comparte nada con estos scripts salvo el
hábito de que un número citado en un informe tiene que ser reproducible.

## Ficheros de apoyo

`probe.mjs` tiene las sondas y la aritmética de `frameCamera`. La comparte
`barrido.mjs` con `modelPixels()`, que replica la fórmula de
`src/components/Viewer3D.tsx:260-263` para estimar cuántos píxeles ocupará el
modelo en cada viewport. **Si esa función cambia en `Viewer3D.tsx`, hay que
cambiarla aquí también**: si no, `barrido.mjs` seguiría comparando números viejos
sin avisar.

`fixtures.mjs` genera el STL de prueba en un directorio temporal del sistema. No
se escribe nada en el repo.

## Salida

`scripts/verify/out/`, ignorado por git. `barrido.mjs` deja ahí un
`barrido.json` con todas las mediciones en bruto, por si hace falta comparar
entre commits sin volver a ejecutar.
