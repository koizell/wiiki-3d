import { useState } from 'react';
import './App.css';

function App() {
  const [file, setFile] = useState<File | null>(null);

  // Función que se ejecuta cuando el usuario selecciona un archivo
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setFile(event.target.files[0]);
    }
  };

  // Función para limpiar el archivo seleccionado
  const handleClearFile = () => {
    setFile(null);
  };

  return (
    <div className="app-container">
      {/* Barra superior */}
      <header className="top-bar">
        <div className="logo">
          <span className="logo-icon">◈</span>
          <span className="logo-text">wiiki-3d</span>
        </div>
        <nav className="top-nav">
          {/* El label activa el input oculto */}
          <label htmlFor="file-upload" className="btn-primary">
            Subir Archivo
          </label>
          <input
            id="file-upload"
            type="file"
            accept=".stl,.gcode,.gco,.obj"
            style={{ display: 'none' }}
            onChange={handleFileChange}
          />
          <button className="btn-ghost">Iniciar Sesión</button>
        </nav>
      </header>

      {/* Cuerpo principal: 3 columnas */}
      <div className="main-layout">
        {/* Sidebar izquierda */}
        <aside className="sidebar-left">
          <nav>
            <ul>
              <li className="nav-item active">🏠 Inicio</li>
              <li className="nav-item">🧰 Taller</li>
              <li className="nav-item">📚 Wiki 3D</li>
              <li className="nav-item">🌐 Proyectos</li>
            </ul>
          </nav>
        </aside>

        {/* Área central */}
        <main className="canvas-area">
          {!file ? (
            <div className="upload-zone">
              <div className="upload-icon">⬆</div>
              <h2>Arrastra tu archivo aquí</h2>
              <p>Soporta STL, G-code (Cura, PrusaSlicer, BambuStudio)</p>
              <label htmlFor="file-upload" className="btn-primary">
                Seleccionar Archivo
              </label>
            </div>
          ) : (
            <div className="viewer-container">
              <div className="file-info">
                <span className="file-name">Archivo: {file.name}</span>
                <button className="btn-danger" onClick={handleClearFile}>X</button>
              </div>
              <div className="viewer-placeholder">
                <p>Visor 3D (Próximamente)</p>
                <p>Aquí se renderizará: <strong>{file.name}</strong></p>
              </div>
            </div>
          )}
        </main>

        {/* Panel derecho */}
        <aside className="sidebar-right">
          <div className="panel-header">
            <h3>Panel de Análisis</h3>
            <span className="badge">Jev</span>
          </div>
          <div className="panel-empty">
            {!file ? (
              <p>Sube un archivo para ver el análisis técnico automático.</p>
            ) : (
              <p>Preparando análisis para <strong>{file.name}</strong>...</p>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
}

export default App;