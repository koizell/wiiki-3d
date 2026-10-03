import './App.css';
import { BrowserRouter, NavLink, Navigate, Outlet, Route, Routes } from 'react-router-dom';
import UploadRoute from './routes/UploadRoute';
import PlaceholderRoute from './routes/PlaceholderRoute';
import AnalysisPanel from './components/AnalysisPanel';
import { AnalysisProvider } from './state/AnalysisContext';
import { useAnalysis, useAnalysisActions } from './state/useAnalysis';

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
 */
function AppShell() {
  const { fileType, metadata, classification, status, error } = useAnalysis();
  const { loadFile, openFilePicker, fileInputRef } = useAnalysisActions();

  return (
    <div className="app-container">
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
          <Outlet />
        </main>

        <aside className="sidebar-right">
          <div className="panel-header">
            <h3>Panel de Análisis</h3>
            <span className="badge">Jev</span>
          </div>
          <AnalysisPanel
            status={status}
            metadata={metadata}
            classification={classification}
            error={error}
            fileType={fileType ?? undefined}
          />
        </aside>
      </div>
    </div>
  );
}

/**
 * Las cuatro rutas de la app.
 *
 * La raíz **es** la pantalla de subida, y no un panel de bienvenida aparte. No
 * es una preferencia: los cuatro scripts de `scripts/verify/` cargan ficheros con
 * `page.setInputFiles('#file-upload', …)` sobre la raíz, en 29 viewports y tres
 * estados. Mover la subida a otra ruta los rompería, y habría que parametrizar
 * la ruta en los cuatro scripts.
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
 * Los tres módulos vacíos llevan su propósito en la propia pantalla. Esa línea
 * sale de la sección correspondiente de `docs/historias-de-usuario.md`, donde las
 * tres lecturas están marcadas como supuesto y no como requisito cerrado, así
 * que el texto se cambia con la decisión de producto, no al revés.
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
            <Route
              path="/taller"
              element={
                <PlaceholderRoute
                  title="Taller"
                  purpose="Va a calcular cuánto cuesta una pieza a partir del material y el tiempo del G-code."
                />
              }
            />
            <Route
              path="/wiki"
              element={
                <PlaceholderRoute
                  title="Wiki 3D"
                  purpose="Van a ser guías de impresión 3D para consultar dentro de la aplicación."
                />
              }
            />
            <Route
              path="/proyectos"
              element={
                <PlaceholderRoute
                  title="Proyectos"
                  purpose="Va a guardar los análisis que hagas, para volver a consultarlos sin volver a subir el archivo."
                />
              }
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AnalysisProvider>
  );
}

export default App;