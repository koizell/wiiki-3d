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
```

`verify:layout`, `verify:teclado` y `verify:rutas` salen con código 1 si alguna
comprobación falla, así que valen como paso de CI.

## Qué mide cada script

| Script | Qué mide |
|---|---|
| `barrido.mjs` | 29 viewports × 3 estados (vacío, STL, G-code). Alto del visor, alto del canvas WebGL, proporción, tamaño del modelo en pantalla, quién scrollea, si algo se recorta, alto del `.top-bar`, errores de consola. Cinco aserciones. |
| `teclado.mjs` | Si el input de fichero y los items de navegación están en el orden de tabulación. Recorre el orden real con `Tab`. |
| `rutas.mjs` | Las cuatro rutas × los cuatro tramos de ancho (375, 700, 900, 1280). En cada uno: los cuatro enlaces son `<a href>` focables, el recorrido con `Tab` los alcanza en orden, `Enter` navega, `aria-current="page"` está en el enlace de la ruta activa y sólo en él, y el enlace activo tiene foco visible por dentro de su fondo. No carga ficheros: el enrutado no depende del estado del análisis. |
| `overlay.mjs` | Si el overlay del `Suspense` tiene un ancestro posicionado o se ancla al viewport. |
| `shots.mjs` | Capturas de los dos viewports donde el reparto de altura se nota, en viewport y en página completa. |

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