import './App.css';
import { Suspense, lazy } from 'react';
import {
  BrowserRouter,
  Link,
  NavLink,
  Navigate,
  Outlet,
  Route,
  Routes,
  useLocation,
} from 'react-router-dom';
import UploadRoute from './routes/UploadRoute';
import AnalysisPanel from './components/AnalysisPanel';import RielWiki from './components/RielWiki';
import { IconoInicio, IconoProyectos, IconoTaller, IconoWiki } from './components/NavIconos';
import SiteFooter from './components/SiteFooter';
import RouteSeo from './components/RouteSeo';
import { articuloParaCampo } from './lib/wiki-campos';
import { MODO_CLASIFICACION } from './services/JevService';
import { AnalysisProvider } from './state/AnalysisContext';
import { useAnalysis, useAnalysisActions } from './state/useAnalysis';
import { ProveedorGuia } from './state/useGuia.tsx';

/*
 * Las rutas de la wiki y las tres páginas de información van en `lazy`, y no por
 * gusto sino por tamaño: `src/lib/guias.ts` importa los ficheros de
 * `src/content/guias/`, así que el contenido entero de la wiki entra en el chunk
 * que importa ese módulo. En el chunk inicial serían unos 4 kB gzip con dos guías,
 * y decenas de kilobytes con las quince que la wiki va a tener. Todo eso para
 * quien quizá no llegue a abrir ninguna.
 *
 * `WikiIndexRoute` y `GuiaRoute` comparten `lib/guias.ts`, así que el
 * empaquetador lo saca a un chunk común y se descarga una sola vez. No hay
 * duplicación por el hecho de ser dos rutas.
 *
 * `InfoRoute` también va en `lazy`, pero por el motivo contrario: son tres
 * páginas de texto y casi nadie las va a ver en una sesión.
 */
const WikiIndexRoute = lazy(() => import('./routes/WikiIndexRoute'));
const GuiaRoute = lazy(() => import('./routes/GuiaRoute'));
const InfoRoute = lazy(() => import('./routes/InfoRoute'));

/**
 * Las tres rutas secundarias, también en `lazy`.
 *
 * `WikiIndexRoute`, `GuiaRoute` e `InfoRoute` ya lo eran; éstas tres se
 * quedaron estáticas y su código se coló en el chunk de entrada: quien
 * llegaba desde Google a leer una guía bajaba también el taller, el
 * historial y los proyectos sin abrirlos ninguno. Medido antes del
 * cambio: el chunk de entrada eran 432 KB.
 *
 * `UploadRoute` sigue estática a propósito, y no es olvido: es la
 * portada —la ruta más visitada— y su código vive con el shell. Darla
 * aire pondría un `Suspense` delante de lo único que todo el mundo
 * viene a ver. La regla, escrita para que no se discuta cada vez:
 * la portada entra; lo que se abre por decisión de quien navega,
 * espera.
 */
const TallerRoute = lazy(() => import('./routes/TallerRoute'));
const HistorialRoute = lazy(() => import('./routes/HistorialRoute'));
const ProyectosRoute = lazy(() => import('./routes/ProyectosRoute'));

/**
 * Las rutas en las que la columna derecha es el panel de análisis.
 *
 * ## Por qué esta lista, y por qué no es «cuando hay un G-code»
 *
 * Porque el panel no sólo muestra datos: es también el sitio donde se sube el
 * archivo. En `/wiki`, `/taller`, `/historial`, `/contacto`, `/privacidad` y
 * `/acerca-de` no hay nada que un G-codeAnalyze pueda explicar —o no debería
 * haberlo—, y durante casi toda la sesión de quien lee la guía no hay ningún
 * archivo cargado. En esas rutas el panel pintaba «Sube un archivo para ver el
 * análisis técnico automático» en 320 px, que es lo que quedaba a la derecha de
 * media pantalla.
 *
 * La condición **no** es «hay un archivo». Sería más inteligente y sería peor: en
 * una sesión real el archivo aparece después de la guía, no antes, y un layout
 * que cambia a mitad de uso se lee como un fallo. Lo que decide es qué información
 * pertenece a la vista, y esa decisión no cambia sola.
 */
const RUTAS_ANALISIS = [/^\/$/, /^\/historial$/];

/**
 * Las rutas cuyo texto no cabe en la caja central y por tanto se desplazan.
 *
 * `/wiki` entra aquí desde la primera versión, y por el motivo que sigue siendo el
 * correcto: la columna central es `overflow: hidden` y un texto largo se recorta
 * en silencio, sin barra y sin aviso. No es una lista de rutas «largas», es la
 * lista de rutas cuyo contenido supera la caja, y eso depende de la ruta y no del
 * ancho.
 *
 * **`/` entra con el inicio lleno.** Antes no estaba, y era correcto: sin
 * historial la raíz era la zona de subida, que cabe entera. Ahora el estado sin
 * archivo lleva cabecera, síntomas y módulos, y eso no cabe en la altura fija del
 * shell a partir de 1200px —por debajo el documento ya se desplaza solo—. Sin
 * esta entrada, a 1200×667 el final del inicio se recortaría sin barra ni aviso.
 * La clase se aplica por ruta, así que el estado con un archivo cargado también
 * la lleva; el visor no se entera porque `.viewer-container` se estira con
 * `align-self: stretch`, y `npm run verify:layout` lo comprueba en los 29
 * viewports.
 *
 * Vive aquí y no en cada ruta por una razón de layout: quien decide cómo se
 * desplaza la caja central es el shell, porque el shell es quien conoce su
 * geometría. Una ruta que se desplazara a sí misma tendría que saber a qué altura
 * está la barra superior.
 *
 * `/taller` **no** está, y no por descuido: medido, cabe entero en los cinco
 * estados y en los cuatro tramos (`npm run verify:taller`). Cuando se añada una
 * herramienta que no quepa, la misma pregunta hay que responder midiendo, no
 * suponiendo: un formulario corto dentro de `.canvas-area` se recorta sin aviso.
 */
const RUTAS_DESPLAZABLES = [
  /^\/$/,
  /^\/wiki(\/|$)/,
  /^\/acerca-de$/,
  /^\/contacto$/,
  /^\/privacidad$/,
  /^\/autor$/,
];


/**
 * El shell: el grid, la barra superior, la navegación y las dos columnas.
 *
 * Es una ruta de layout —no tiene `path`— así que `<Outlet/>` pinta la ruta
 * activa dentro de `<main>`. El orden importa: `<Routes>` por fuera porque es lo
 * que resuelve la ruta, y el shell por dentro porque es quien tiene el `<Outlet/>`
 * donde meter el resultado.
 *
 * ## Qué hay en la columna derecha, y por qué no es siempre lo mismo
 *
 * Antes había una sola cosa: `AnalysisPanel`, montada en todas las rutas por una
 * razón de layout que sigue siendo válida —si estuviera dentro de la ruta de
 * subida, el grid daría un tirón en cada navegación—. Pero la consecuencia es que
 * `/wiki`, `/taller`, `/contacto` y las demás tenían 320 px de columna con un único
 * texto: «Sube un archivo para ver el análisis técnico automático». En un portátil
 * eso es media pantalla, y durante casi toda la sesión de quien lee la guía no hay
 * ningún archivo cargado.
 *
 * Ahora la columna decide con `RUTAS_ANALISIS`. Donde el análisis es el sujeto va
 * el panel. Donde no, va `RielWiki`, que pinta el estado del diagnóstico de la
 * guía que se está leyendo: cuántas acciones se han desbloqueado, qué variables
 * faltan, y la salida a la otra guía. En las rutas de contenido sin guía —contacto,
 * privacidad, acerca de— el riel muestra igualmente la navegación entre guías, que
 * siempre sirve y es lo que uno esperaría en el margen de una página de esas.
 *
 * Y el panel de análisis sigue enlazando a la guía: dice «riesgo de warping, 35 %»
 * y el enlace de debajo lleva a la guía que explica ese 35 %. Esa es la
 * interconexión que no depende de que haya un artículo largo detrás.
 */
function AppShell() {
  const { fileType, metadata, classification, status, error } = useAnalysis();
  const { loadFile, openFilePicker, fileInputRef } = useAnalysisActions();
  const { pathname } = useLocation();
  const desplazable = RUTAS_DESPLAZABLES.some((r) => r.test(pathname));
  const conPanel = RUTAS_ANALISIS.some((r) => r.test(pathname));

  return (
    <>
      <div className={`app-container${desplazable ? ' app-container--columna' : ''}`}>
        <header className="top-bar">
          <div className="logo">
            <span className="logo-icon">◈</span>
            <span className="logo-text">wiiki-3d</span>
          </div>
          <nav className="top-nav">
            <button type="button" className="btn-primary" onClick={openFilePicker}>
              Subir Archivo
            </button>
            <input
              ref={fileInputRef}
              id="file-upload"
              type="file"
              accept=".stl,.3mf,.gcode,.gco,.obj"
              style={{ display: 'none' }}
              onChange={(event) => {
                const selected = event.target.files?.[0];
                /*
                 * Se vacía el valor **antes** de devolver el control.
                 *
                 * Sin esto, elegir dos veces el mismo archivo no hace nada: el
                 * input ya tiene ese valor, el navegador no dispara `change`, y
                 * quien lo ha elegido dos veces se queda sin ver ningún aviso de
                 * que la segunda no ha contado. Medido: subir el mismo G-code
                 * tres veces guardaba una entrada y no daba ningún error.
                 *
                 * Vaciarlo no borra el archivo elegido —eso ya está en el
                 * estado—, sólo hace que el siguiente `change` sea un `change`
                 * de verdad.
                 */
                event.target.value = '';
                if (selected) loadFile(selected);
              }}
            />
          </nav>
        </header>

        <div className="main-layout">
          <aside className="sidebar-left">
            <nav>
              {/*
                `className` como función, y no como cadena: React Router añade la
                clase `active` por su cuenta al enlace activo, y el CSS ya no la
                usa —el estado sale de `[aria-current="page"]`. Dejar la clase en
                el DOM sin estilos sería ruido, y haría que alguien la encontrara,
                cambiara el CSS por algo que no se aplica y perdiera una tarde.
              */}
              <ul>
                <li>
                  <NavLink to="/" end className={() => 'nav-item'}>
                    <IconoInicio className="nav-icon" />
                    Inicio
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/taller" className={() => 'nav-item'}>
                    <IconoTaller className="nav-icon" />
                    Taller
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/wiki" className={() => 'nav-item'}>
                    <IconoWiki className="nav-icon" />
                    Wiki 3D
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/proyectos" className={() => 'nav-item'}>
                    <IconoProyectos className="nav-icon" />
                    Proyectos
                  </NavLink>
                </li>
              </ul>
            </nav>
          </aside>

          <main className="canvas-area">
            {/*
              `Suspense` envuelve al `Outlet` entero y no a las rutas una por una,
              porque un `Suspense` por ruta duplicaría el mismo `fallback` cinco
              veces y habría que mantenerlos iguales.

              El `fallback` va vacío a propósito. `verify:rutas` exige que haya
              exactamente un `h1` visible en `.canvas-area`, y un marcador del tipo
              «Cargando…» con un encabezado dentro lo rompería durante el primer
              fotograma de cada entrada a la wiki. Con el `fallback` vacío no hay
              nada que comprobar hasta que el chunk llega, que es lo que tarda unos
              milisegundos en local y algo más con la red.
            */}
            <Suspense fallback={null}>
              <Outlet />
            </Suspense>
          </main>

          {/*
            La columna derecha, y qué hay en ella.

            El `if/else` es lo que evita que `/wiki` y las páginas de contenido
            pinten «Sube un archivo para ver el análisis técnico automático» en
            320 px. Las dos ramas comparten el `<aside>` a propósito —el grid, los
            bordes y el scroll interno son los mismos— y lo que cambia es el
            contenido: donde el análisis es el sujeto va el panel, y donde no va el
            riel de la wiki, que en esas rutas siempre tiene algo que enseñar.

            Lo que **no** se hace es ocultar la columna cuando no hay archivo
            cargado. Sería más inteligente y daría un layout que salta en mitad de
            una sesión, que es peor que una columna con contenido. Ver
            `RUTAS_ANALISIS`.
          */}
          <aside className="sidebar-right">
            {conPanel ? (
              <>
                <div className="panel-header">
                  {/*
                    `h2`, y no `h3`. El panel es una sección de la página, y va debajo
                    del `h1` de la vista, así que le corresponde un nivel 2. Con `h3`
                    la jerarquía saltaba de 1 a 3, y quien navega por encabezados se
                    perdía ese tramo entero.
                  */}
                  <h2>Panel de Análisis</h2>
                  {/*
                    La insignia dice en qué modo está la clasificación, y no dice
                    «Jev» a secas.

                    La diferencia no es cosmética: en demostración el veredicto sale
                    de una heurística local que no consulta ningún servicio, así que
                    es una estimación. Poner «Jev» sin más hacía creer que había un
                    modelo de verdad detrás, y no lo había.
                  */}
                  <Link
                    to="/privacidad/"
                    className={'badge badge-modo badge-modo-' + MODO_CLASIFICACION}
                    title={
                      MODO_CLASIFICACION === 'real'
                        ? 'Clasificación por el servicio Jev'
                        : 'Clasificación de demostración: heurística local, no se envía nada'
                    }
                  >
                    {MODO_CLASIFICACION === 'real' ? 'Jev' : 'Demo'}
                  </Link>
                </div>
                <AnalysisPanel
                  status={status}
                  metadata={metadata}
                  classification={classification}
                  error={error}
                  fileType={fileType ?? undefined}
                  /*
                   * `articuloParaCampo` viene de un módulo que no importa nada, así que
                   * el contenido de las guías sigue fuera del chunk inicial. El panel
                   * recibe sólo la función.
                   */
                  explicar={articuloParaCampo}
                />
              </>
            ) : (
              <RielWiki />
            )}
          </aside>
        </div>
      </div>

      {/*
        El pie va fuera del shell, como hermano, por lo que dice el comentario de
        `SiteFooter`. En el shell sería una cuarta fila del grid y le quitaría el
        alto a las otras dos a partir de 1200px.
      */}
      <SiteFooter />
    </>
  );
}

/**
 * Las cuatro rutas de la app.
 *
 * La raíz **es** la pantalla de subida, y no un panel de bienvenida aparte. No
 * es una preferencia: los cuatro scripts de `scripts/verify/` cargan ficheros con
 * `page.setInputFiles('#file-upload', …)` sobre la raíz, en 29 viewports y tres
 * estados. Mover la subida a otra ruta los rompería, y habría que parametrizar la
 * ruta en los cuatro scripts.
 *
 * Cuando "Inicio" tenga contenido, se añade debajo de la zona de subida en esta
 * misma vista. **Ya lo tiene**: `src/components/Inicio.tsx` pone los síntomas
 * frecuentes y los módulos debajo de la caja, y la cabecera del inicio pasa a ser
 * el `<h1>` de la ruta. Si algún día la subida se mueve a otra ruta, se actualizan
 * los scripts en el mismo commit.
 *
 * La redirección con `*` existe para que una ruta inventada no deje la pantalla
 * en blanco: vuelve a la raíz con `replace`, para que el botón "atrás" del
 * navegador no tenga que deshacer el salto.
 *
 * Modo declarativo a propósito: `BrowserRouter` + `Routes` + `Route`. No el
 * "framework mode" de React Router, que trae un plugin de Vite, un servidor y
 * convenciones de ficheros pensadas para renderizado en el servidor. Esta es una
 * aplicación de una sola página, estática y servida desde GitHub Pages, y nada de
 * eso tiene destino aquí.
 *
 * `NavLink` y no `Link` porque da el estado activo y `aria-current="page"`
 * gratis, en los cuatro enlaces. Es justo lo que el bug de navegación por teclado
 * necesitaba, y no conviene reimplementarlo a mano.
 *
 * **Ya no hay ningún módulo vacío en la barra.** `/proyectos` era el último y ahora
 * es una página real: dice qué será un proyecto, por qué todavía no está y qué usar
 * mientras (`src/routes/ProyectosRoute.tsx`). Se fue el `PlaceholderRoute` genérico
 * con él, porque no quedaba ninguna ruta que lo usara.
 *
 * `/acerca-de`, `/contacto` y `/privacidad` son las tres páginas que la revisión
 * de contenido de Google AdSense exige tener presentes, y están enlazadas desde el
 * pie en todas las rutas. No se enlazan desde la barra de navegación porque
 * aquella tiene cuatro destinos decididos y esas páginas no son módulos: son
 * contenido del pie, y de ahí viene su sitio.
 */
function App() {
  return (
    // El proveedor envuelve al router, no al revés: si estuviera dentro de las
    // rutas, cambiar de ruta desmontaría el estado del archivo cargado.
    <AnalysisProvider>
      {/*
        `ProveedorGuia` va al mismo nivel y por el mismo motivo. El estado de las
        respuestas de la guía lo leen dos sitios que están en lados distintos del
        árbol: la ruta, que escribe, y el riel de la columna derecha, que pinta. Sin
        un contexto compartido, o el shell baja a la ruta a preguntar —y entonces
        conoce el interior de la guía—, o el riel recibe el estado por props a
        través de dos niveles que no lo usan.

        Y va **fuera** del `BrowserRouter` a propósito, porque no lee de la ruta en
        ningún momento: si leyera, el valor cambiaría con cada navegación y la guía
        perdería las respuestas al ir y venir. La limpieza por cambio de guía la
        hace `GuiaRoute`, en un efecto, que es donde se sabe qué slug es cuál.
      */}
      <ProveedorGuia>
        <BrowserRouter>
          <RouteSeo />
          <Routes>
            <Route element={<AppShell />}>
              <Route path="/" element={<UploadRoute />} />
              {/*
                Taller no va con `lazy` a propósito: son unos pocos kilobytes de
                aritmética y una caja de texto, y se entra desde la barra siempre.
                Pedir otro chunk para esto sólo añadiría una espera.
              */}
              <Route path="/taller" element={<TallerRoute />} />
              <Route path="/wiki" element={<WikiIndexRoute />} />
              {/*
                Va **después** de `/wiki` y no antes a propósito. En React Router el
                orden importa: `/wiki` con `end` implícito no captura `/wiki/nombre`,
                pero dejarlo explícito evita depender de ese detalle. Con
                `<Route path="/wiki" element={…}/>` la coincidencia es exacta, y la
                siguiente sólo entra si la anterior no.
              */}
              <Route path="/wiki/:slug" element={<GuiaRoute />} />
              <Route path="/proyectos" element={<ProyectosRoute />} />
              {/*
                `/historial` **no está en la barra inferior**, y es deliberado: la
                barra tiene cuatro destinos decididos y siguen siendo los mismos.
                El historial se llega desde `/`, debajo de la zona de subida, con un
                enlace. Añadirlo a la barra sería un quinto destino por una lista
                que sólo se mira cuando ya se sabe que existen análisis.
              */}
              <Route path="/historial" element={<HistorialRoute />} />
              <Route path="/acerca-de" element={<InfoRoute pagina="acerca-de" />} />
              <Route path="/contacto" element={<InfoRoute pagina="contacto" />} />
              <Route path="/privacidad" element={<InfoRoute pagina="privacidad" />} />
              <Route path="/autor" element={<InfoRoute pagina="autor" />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ProveedorGuia>
    </AnalysisProvider>
  );
}

export default App;
