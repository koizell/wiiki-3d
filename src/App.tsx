import './App.css';
import { Suspense, lazy } from 'react';
import {
  BrowserRouter,
  NavLink,
  Navigate,
  Outlet,
  Route,
  Routes,
  useLocation,
} from 'react-router-dom';
import UploadRoute from './routes/UploadRoute';
import TallerRoute from './routes/TallerRoute';
import HistorialRoute from './routes/HistorialRoute';
import PlaceholderRoute from './routes/PlaceholderRoute';
import AnalysisPanel from './components/AnalysisPanel';
import SiteFooter from './components/SiteFooter';
import { articuloParaCampo } from './lib/wiki-campos';
import { AnalysisProvider } from './state/AnalysisContext';
import { useAnalysis, useAnalysisActions } from './state/useAnalysis';

/*
 * Las rutas de la wiki y las tres páginas de información van en `lazy`, y no por
 * gusto sino por tamaño: `src/lib/wiki.ts` carga los artículos con
 * `import.meta.glob` en modo `eager`, así que el texto entero de la wiki entra en
 * el chunk que importa ese módulo. En el chunk inicial serían unos 4 kB gzip con
 * el artículo de prueba, y unos 37 kB con los diez que AdSense va a pedir. Todo
 * eso para quien quizá no llegue a leer ni uno.
 *
 * `WikiIndexRoute` y `WikiArticleRoute` comparten `wiki.ts`, así que el
 * empaquetador lo saca a un chunk común y se descarga una sola vez. No hay
 * duplicación por el hecho de ser dos rutas.
 *
 * `InfoRoute` también va en `lazy`, pero por el motivo contrario: son tres
 * páginas de texto y casi nadie las va a ver en una sesión.
 */
const WikiIndexRoute = lazy(() => import('./routes/WikiIndexRoute'));
const WikiArticleRoute = lazy(() => import('./routes/WikiArticleRoute'));
const InfoRoute = lazy(() => import('./routes/InfoRoute'));

/**
 * Las rutas cuyo contenido se lee haciendo scroll en lugar de caber en la caja.
 *
 * No es una lista de rutas «largas»: es la lista de rutas cuyo texto no cabe en
 * la zona central, y eso depende de la ruta y no de la ruta sola. `/taller` está
 * aquí por la razón contraria, que es la interesante: **antes se suponía que
 * necesitaría scroll y medido no lo necesita** —`npm run verify:taller` comprueba
 * que la caja no recorta en ninguno de los cinco estados ni en los cuatro tramos—,
 * así que no está en la lista. Cuando se añada `/historial`, esta es la misma
 * pregunta, y la respuesta hay que medirla, no suponerla: un formulario corto
 * dentro de `.canvas-area`, que es `overflow: hidden`, se recorta en silencio.
 *
 * Vive aquí y no en la propia ruta por una razón de layout: quien decide cómo se
 * desplaza la caja central es el shell, porque el shell es quien conoce su
 * geometría. Una ruta que se desplazara a sí misma tendría que saber a qué
 * altura está la barra superior.
 */
const RUTAS_DESPLAZABLES = [/^\/wiki(\/|$)/, /^\/acerca-de$/, /^\/contacto$/, /^\/privacidad$/];

/**
 * El shell: el grid, la barra superior, la navegación y las dos columnas.
 *
 * Es una ruta de layout —no tiene `path`— así que `<Outlet/>` pinta la ruta
 * activa dentro de `<main>`. El orden importa: `<Routes>` por fuera porque es lo
 * que resuelve la ruta, y el shell por dentro porque es quien tiene el `<Outlet/>`
 * donde meter el resultado.
 *
 * El panel de análisis se monta aquí, y no dentro de una ruta, por una razón de
 * layout: es una columna del shell. Si estuviera en la ruta de subida, navegar a
 * `/taller` lo desmontaría —y con D8 el análisis sobrevive a la navegación por
 * decisión— y la columna aparecería y desaparecería en cada cambio de ruta, lo
 * que haría saltar el grid.
 *
 * Por eso el panel se ve también en los otros módulos: con un G-code cargado y
 * estando en `/taller`, sigue enseñando el análisis de ese G-code. Es coherente
 * con que el estado sobreviva, y evita el salto del layout. Cuando no hay
 * archivo, `AnalysisPanel` pinta su propio estado vacío, así que no hace falta
 * ocultarlo.
 *
 * Y eso es justo lo que hace útil tener la wiki al lado: el panel dice «riesgo de
 * warping, 35 %» y el artículo que explica ese 35 % está en la columna de al lado.
 */
function AppShell() {
  const { fileType, metadata, classification, status, error } = useAnalysis();
  const { loadFile, openFilePicker, fileInputRef } = useAnalysisActions();
  const { pathname } = useLocation();
  const desplazable = RUTAS_DESPLAZABLES.some((r) => r.test(pathname));

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
                    🏠 Inicio
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/taller" className={() => 'nav-item'}>
                    🧰 Taller
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/wiki" className={() => 'nav-item'}>
                    📚 Wiki 3D
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/proyectos" className={() => 'nav-item'}>
                    🌐 Proyectos
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

          <aside className="sidebar-right">
            <div className="panel-header">
              {/*
                `h2`, y no `h3`. El panel es una sección de la página, y va debajo
                del `h1` de la vista, así que le corresponde un nivel 2. Con `h3`
                la jerarquía saltaba de 1 a 3, y quien navega por encabezados se
                perdía ese tramo entero.
              */}
              <h2>Panel de Análisis</h2>
              <span className="badge">Jev</span>
            </div>
            <AnalysisPanel
              status={status}
              metadata={metadata}
              classification={classification}
              error={error}
              fileType={fileType ?? undefined}
              /*
               * `articuloParaCampo` viene de un módulo que no importa nada, así que
               * el texto de los artículos sigue fuera del chunk inicial. El panel
               * recibe sólo la función.
               */
              explicar={articuloParaCampo}
            />
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
 * misma vista. Si algún día se mueve, se actualizan los scripts en el mismo
 * commit.
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
 * Los módulos todavía vacíos llevan su propósito en la propia pantalla. Esa línea
 * sale de la sección correspondiente de `docs/historias-de-usuario.md`, donde las
 * lecturas están marcadas como supuesto y no como requisito cerrado, así que el
 * texto se cambia con la decisión de producto, no al revés.
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
      <BrowserRouter>
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
            <Route path="/wiki/:slug" element={<WikiArticleRoute />} />
            <Route
              path="/proyectos"
              element={
                <PlaceholderRoute
                  title="Proyectos"
                  purpose="Aquí vivirán los proyectos con nombre. El historial ya guarda los análisis; un proyecto es un análisis con un nombre y una decisión alrededor, y eso todavía no se ha decidido qué es."
                />
              }
            />
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
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AnalysisProvider>
  );
}

export default App;
