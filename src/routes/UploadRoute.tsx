import { lazy, Suspense } from "react";
import { useAnalysis, useAnalysisActions } from "../state/useAnalysis";
import { isViewerFormat, unsupportedFileMessage } from "../lib/files";
import { AvisoAlmacenamiento, Recientes } from "../components/Recientes";
import Inicio from "../components/Inicio";

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
const LazyViewer3D = lazy(() => import("../components/Viewer3D"));

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
  const { file, fileType, metadata } = useAnalysis();
  const { clearFile, openFilePicker } = useAnalysisActions();

  const viewerFormat = isViewerFormat(fileType) ? fileType : null;
  const showGcodeNotice = fileType === "gcode";
  const showUnsupported = fileType === "obj" || fileType === "unknown";

  /*
   * `Recientes` va debajo de la zona de subida en el estado sin archivo, y
   * debajo de la barra del visor en el otro. No es un detalle de maquetación: es
   * que quien acaba de analizar algo lo sigue teniendo delante al buscar otra
   * cosa, y esconderlo detrás de la navegación sería esconder lo único que la
   * app sabe hacer con un G-code.
   *
   * Se pinta en los dos estados y no en un sitio común porque el return de cada
   * rama es distinto, y un envoltorio alrededor de los dos acabaría pidiendo un
   * `flex` con dos hijos que sólo existe para esto.
   */
  /*
   * Tres estados, no dos.
   *
   * Antes eran «no hay archivo» y «hay archivo». Ahora está el tercero, que es el
   * que acaba de aparecer: **hay un análisis pero no hay archivo**. P2 decidió
   * guardar el análisis y no el archivo, así que al abrir una entrada del
   * historial esto es lo que hay: metadatos y diagnóstico, y nada que mirar en el
   * visor.
   *
   * Se pinta la barra de arriba con el nombre del análisis —que es el título real
   * de lo que se está viendo— y un aviso que dice lo que no se puede hacer. La
   * alternativa, fingir que no hay nada o no explicar el visor, es peor: quien
   * pulse una entrada esperando el visor se encontraría una pantalla vacía.
   */
  if (!file && metadata) {
    return (
      <>
        <div className="file-info">
          <h1 className="file-name">Análisis: {metadata.filename}</h1>
          <button className="btn-danger" onClick={clearFile}>
            X
          </button>
        </div>
        <div className="canvas-placeholder">
          <p className="canvas-error">
            Este análisis viene del historial y no se guarda el archivo, así que
            el visor 3D no se puede abrir. Los metadatos y el diagnóstico están
            en el panel de la derecha.
          </p>
        </div>
        <AvisoAlmacenamiento />
        <Recientes />
      </>
    );
  }

  if (!file) {
    return (
      <div className="inicio">
        <section className="inicio-hero">
          {/*
          El `<h1>` de la vista cuando no hay archivo. Antes lo llevaba la zona de
          subida; ahora lo lleva la cabecera, porque con el inicio lleno de
          contenido el título de la página es qué es wiiki-3d y no el gesto de
          arrastrar un archivo. La zona de subida baja a `h2` (ver `App.css`) para
          que siga habiendo **un solo** `<h1>` visible, que es lo que exige
          `verify:rutas`.
        */}
          <h1>¿Va a salir bien tu impresión?</h1>
          <p>
            Sube el archivo que exportó tu slicer y wiiki-3d lee lo que ya está
            escrito dentro —material, temperaturas, gramos, tiempo— antes de que
            gastes filamento. Y si la pieza sale mal, aquí está el porqué.
          </p>
        </section>

        <div className="upload-zone">
          <div className="upload-icon">⬆</div>
          <h2>Arrastra tu archivo aquí</h2>
          <p>Soporta STL, 3MF, G-code (Cura, PrusaSlicer, BambuStudio)</p>
          <button
            type="button"
            className="btn-primary"
            onClick={openFilePicker}
          >
            Seleccionar Archivo
          </button>
        </div>

        {/*
          Síntomas frecuentes y los otros módulos. Va aquí, en el estado sin
          archivo, y no en los otros dos: con un archivo cargado el sujeto es el
          visor y el análisis, y con un análisis restaurado la pantalla explica por
          qué no hay visor. Añadir el inicio en esos dos sería tapar lo que se
          acaba de pedir.
        */}
        <Inicio />

        <AvisoAlmacenamiento />
        <Recientes />
      </div>
    );
  }

  return (
    <>
      <div className="viewer-container">
        <div className="file-info">
          {/*
          El nombre del archivo es el <h1> de esta vista, y no un `h2` con otro
          nombre al lado.

          Cuando hay un archivo cargado, el área central no tiene ningún
          encabezado: lo único que había era el `<h3>` del panel lateral, así que
          la jerarquía saltaba de la nada al 3. Con esto, las cuatro rutas tienen
          exactamente un `<h1>`, y el de `/` dice lo que la pantalla está
          mostrando —el archivo abierto—, que es el título real de esta vista.

          `.file-name` conserva su `font-size: 0.9rem`, y a partir de aquí ese
          valor deja de ser decorativo: sin él, el `<h1>` mide 2em, que en esta
          base son 32 px en vez de 14,4, y la fila de `.file-info` crece.
        */}
          <h1 className="file-name">Archivo: {file.name}</h1>
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
      <AvisoAlmacenamiento />
      <Recientes />
    </>
  );
}

export default UploadRoute;
