import { lazy, Suspense } from 'react';
import { useAnalysis, useAnalysisActions } from '../state/useAnalysis';
import { isViewerFormat, unsupportedFileMessage } from '../lib/files';

/**
 * El visor 3D se carga bajo demanda, y desde aquí.
 *
 * three.js pesa unos 648 KB sin minificar, y el visor solo se usa cuando el
 * usuario sube un STL o un 3MF. Con el import estático, ese peso viajaba en el
 * chunk inicial y se descargaba antes de que hubiera nada que ver, retrasando el
 * primer contenido visible para una pantalla de subida que no lo necesita. Con
 * `lazy` queda en un chunk aparte que el navegador pide cuando el visor se va a
 * montar de verdad.
 *
 * El `lazy` va en este fichero, y no en el shell, porque el chunk se pide cuando
 * se monta el visor —o sea, en la ruta `/`— y no al arrancar la app. En las otras
 * tres rutas no hay nada que lazy-cargar, y con el `lazy` en el shell se pediría
 * el chunk de three.js para pintar «Sin implementar».
 */
const LazyViewer3D = lazy(() => import('../components/Viewer3D'));

/**
 * La pantalla de subida, que es la ruta `/`.
 *
 * Aquí vive todo lo que depende de que haya o no un archivo cargado: la zona de
 * subida, la barra con el nombre del archivo, el visor y los avisos de formato.
 * El estado no está aquí —vive en `AnalysisContext`— para que cambiar de ruta no
 * lo destruya.
 *
 * La clasificación de formatos está en `src/lib/files.ts`, no aquí: la consumen
 * el contexto (al cargar) y esta vista (al decidir qué pintar), y es lógica pura
 * sin React.
 *
 * Los dos botones de subida —este y el de la barra superior— son `<button>` y
 * llaman a `openFilePicker`, en vez de `<label htmlFor>`. Un `<label>` no es un
 * control enfocable en ningún navegador, así que con `<label>` la acción principal
 * de la app sería inalcanzable con teclado. Medido con `npm run verify:teclado`.
 */
function UploadRoute() {
  const { file, fileType } = useAnalysis();
  const { clearFile, openFilePicker } = useAnalysisActions();

  const viewerFormat = isViewerFormat(fileType) ? fileType : null;
  const showGcodeNotice = fileType === 'gcode';
  const showUnsupported = fileType === 'obj' || fileType === 'unknown';

  if (!file) {
    return (
      <div className="upload-zone">
        <div className="upload-icon">⬆</div>
        <h2>Arrastra tu archivo aquí</h2>
        <p>Soporta STL, 3MF, G-code (Cura, PrusaSlicer, BambuStudio)</p>
        <button type="button" className="btn-primary" onClick={openFilePicker}>
          Seleccionar Archivo
        </button>
      </div>
    );
  }

  return (
    <div className="viewer-container">
      <div className="file-info">
        <span className="file-name">Archivo: {file.name}</span>
        <button className="btn-danger" onClick={clearFile}>
          X
        </button>
      </div>

      {/* El `Suspense` acota solo al visor: barra, sidebars y zona de subida
          pintan de inmediato mientras llega el chunk.

          El fallback es un `.viewer-3d-container` con su overlay dentro, y no un
          `.viewer-overlay` suelto. La razón es que `.viewer-overlay` es
          `position: absolute` y su ancestro posicionado importa: aquí no hay
          ninguno, así que se anclaba al viewport inicial y medía 768x667 en
          lugar de su recuadro, tapando la pantalla entera con `z-index: 10`
          mientras bajaba el chunk.

          Ponerlo dentro de un `.viewer-3d-container` —que sí es
          `position: relative`— resuelve tres cosas a la vez: el overlay se ancla
          a su recuadro, mide lo mismo que medirá el visor montado (mismo `flex: 1`
          a >=1200 y mismo `aspect-ratio` en 768-1199), y el layout no salta al
          montar.

          Los dos mensajes son distintos a propósito: éste es la descarga del chunk
          (590 KB) y el del visor montado, la lectura del archivo. Son dos fases,
          no ruido. */}
      <Suspense
        fallback={
          <div className="viewer-3d-container">
            <div className="viewer-overlay">Cargando visor 3D...</div>
          </div>
        }
      >
        {viewerFormat && <LazyViewer3D file={file} fileType={viewerFormat} />}
      </Suspense>

      {showGcodeNotice && (
        <div className="canvas-placeholder">
          <p>
            Los archivos G-code no se renderizan en 3D todavía. Puedes ver su
            análisis técnico en el panel de Jev.
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
  );
}

export default UploadRoute;