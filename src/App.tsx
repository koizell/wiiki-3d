import { useEffect, useState } from 'react';
import './App.css';
import Viewer3D from './components/Viewer3D';
import AnalysisPanel, { type AnalysisStatus } from './components/AnalysisPanel';
import { parseGcode } from './services/ParserService';
import { classifyWithJev } from './services/JevService';
import type { JevClassification, ProjectMetadata } from './services/types';

/** Formatos que la app sabe enrutar, deducidos de la extensión del archivo. */
type FileType = 'stl' | 'gcode' | 'obj' | 'unknown';

/** Extensiones que el visor 3D sabe maquetar. */
const STL_EXTENSIONS = ['.stl'] as const;
/** Extensiones que el panel de análisis sabe interpretar. */
const GCODE_EXTENSIONS = ['.gcode', '.gco'] as const;
/** Extensiones aceptadas por el input pero aún sin soporte en el visor. */
const OBJ_EXTENSIONS = ['.obj'] as const;

/**
 * Deduce el tipo de archivo a partir de su nombre.
 *
 * Es el punto de decisión de la app: de aquí sale tanto el componente que se
 * pinta en el área central como la cola de análisis que se dispara. Se
 * compara en minúsculas porque los navegadores entregan la extensión tal cual
 * la escribió el sistema de ficheros del usuario (`PIEZA.GCODE` es válido).
 */
function detectFileType(filename: string): FileType {
  const name = filename.toLowerCase();
  if (STL_EXTENSIONS.some((ext) => name.endsWith(ext))) return 'stl';
  if (GCODE_EXTENSIONS.some((ext) => name.endsWith(ext))) return 'gcode';
  if (OBJ_EXTENSIONS.some((ext) => name.endsWith(ext))) return 'obj';
  return 'unknown';
}

/** Explica en el área central por qué un formato todavía no se puede mostrar. */
function unsupportedFileMessage(fileType: FileType, filename: string): string {
  if (fileType === 'obj') {
    return 'El visor 3D para archivos .obj todavía no está disponible. El análisis técnico se reserva a los archivos G-code.';
  }
  return `"${filename}" tiene un formato no compatible. Sube un archivo .stl, .gcode o .gco.`;
}

/** Normaliza cualquier excepción a un mensaje presentable. */
function toErrorMessage(error: unknown): string {
  if (error instanceof Error) return error.message;
  return 'Error inesperado al analizar el archivo.';
}

function App() {
  const [file, setFile] = useState<File | null>(null);
  const [fileType, setFileType] = useState<FileType | null>(null);
  const [metadata, setMetadata] = useState<ProjectMetadata | null>(null);
  const [classification, setClassification] = useState<JevClassification | null>(null);
  const [analysisStatus, setAnalysisStatus] = useState<AnalysisStatus>('idle');
  const [analysisError, setAnalysisError] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selected = event.target.files?.[0];
    if (!selected) return;

    setFile(selected);
    setFileType(detectFileType(selected.name));
    // El análisis anterior se descarta: si el nuevo archivo es un STL o no es
    // analizable, el panel debe volver a su estado inicial, no al anterior.
    setMetadata(null);
    setClassification(null);
    setAnalysisError(null);
    setAnalysisStatus('idle');
  };

  const handleClearFile = () => {
    setFile(null);
    setFileType(null);
    setMetadata(null);
    setClassification(null);
    setAnalysisError(null);
    setAnalysisStatus('idle');
  };

  useEffect(() => {
    // Solo el G-code tiene metadatos de impresión que analizar; el resto de
    // formatos deja el panel en `idle`.
    if (!file || fileType !== 'gcode') return;

    // Los servicios todavía no aceptan una señal de cancelación, así que el
    // `AbortController` actúa como bandera: abortar desde la limpieza impide
    // que una promesa lenta pinte resultados de un archivo ya sustituido o de
    // un componente desmontado.
    const controller = new AbortController();

    const runAnalysis = async () => {
      setAnalysisStatus('parsing');
      setAnalysisError(null);
      try {
        const parsedMetadata = await parseGcode(file);
        if (controller.signal.aborted) return;
        setMetadata(parsedMetadata);

        setAnalysisStatus('classifying');
        const jevResult = await classifyWithJev(parsedMetadata);
        if (controller.signal.aborted) return;
        setClassification(jevResult);

        setAnalysisStatus('done');
      } catch (error) {
        if (controller.signal.aborted) return;
        setAnalysisError(toErrorMessage(error));
        setAnalysisStatus('error');
      }
    };

    void runAnalysis();

    return () => controller.abort();
  }, [file, fileType]);

  const showUploadZone = !file;
  const showViewer = fileType === 'stl';
  const showGcodeNotice = fileType === 'gcode';
  const showUnsupported = fileType === 'obj' || fileType === 'unknown';

  return (
    <div className="app-container">
      <header className="top-bar">
        <div className="logo">
          <span className="logo-icon">◈</span>
          <span className="logo-text">wiiki-3d</span>
        </div>
        <nav className="top-nav">
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

      <div className="main-layout">
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

        <main className="canvas-area">
          {showUploadZone ? (
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

              {showViewer && <Viewer3D file={file} />}

              {showGcodeNotice && (
                <div className="canvas-placeholder">
                  <p>
                    Los archivos G-code no se renderizan en 3D todavía. El
                    análisis técnico de la pieza aparece en el panel derecho.
                  </p>
                </div>
              )}

              {showUnsupported && (
                <div className="canvas-placeholder">
                  <p className="canvas-error">
                    {unsupportedFileMessage(fileType, file.name)}
                  </p>
                </div>
              )}
            </div>
          )}
        </main>

        <aside className="sidebar-right">
          <div className="panel-header">
            <h3>Panel de Análisis</h3>
            <span className="badge">Jev</span>
          </div>
          <AnalysisPanel
            status={analysisStatus}
            metadata={metadata}
            classification={classification}
            error={analysisError}
          />
        </aside>
      </div>
    </div>
  );
}

export default App;