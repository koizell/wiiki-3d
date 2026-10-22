import { lazy, Suspense, useState } from "react";
import VisorTrayectoria from "../components/VisorTrayectoria";
import { useTrayectoria } from "../state/useTrayectoria";
import { useAnalysis, useAnalysisActions } from "../state/useAnalysis";
import { isViewerFormat, unsupportedFileMessage } from "../lib/files";
import { AvisoAlmacenamiento, Recientes } from "../components/Recientes";
import Inicio from "../components/Inicio";
import SeccionAnalisis from "../components/SeccionAnalisis";
import ControlesVisor from "../components/ControlesVisor";

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
  const { clearFile, openFilePicker, loadFile } = useAnalysisActions();
  const [arrastrando, setArrastrando] = useState(false);
  const [errorSubida, setErrorSubida] = useState('');

  const viewerFormat = isViewerFormat(fileType) ? fileType : null;
  const showGcodeNotice = fileType === "gcode";

  /*
   * La trayectoria del G-code.
   *
   * El aviso de antes decía, textualmente, «El G-code se analiza; su trayectoria no
   * se muestra en 3D». Esa frase era cierta y **ya no lo es**: el lector del
   * cuerpo del archivo sabe dónde va la cabeza en cada momento y qué está
   * haciendo, y eso se puede dibujar.
   *
   * El análisis del cuerpo es asíncrono —un G-code real pesa decenas de megabytes—
   * así que mientras se lee se dice que se está leyendo, y si falla se dice por
   * qué, sin dejar un hueco en la pantalla.
   */
  const trayectoria = useTrayectoria(showGcodeNotice ? file : null);
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
          <button className="btn-danger" onClick={clearFile} aria-label="Cerrar análisis">
            X
          </button>
        </div>
        <SeccionAnalisis />
        <p className="archivo-nota">Este análisis viene del historial: no se guarda el archivo, así que el visor 3D no se puede abrir.</p>
        <AvisoAlmacenamiento />
        <Recientes />
      </>
    );
  }

  if (!file) {
    return (
      <div className="inicio-ruta">
        {/*
          El orden, y por qué.

          La auditoría del 14/10 lo marcó como jerarquía invertida: en la raíz el
          `<h2>Arrastra tu archivo aquí</h2>` caía ANTES que el `<h1>` de la
          cabecera, porque la zona de subida vive en esta ruta y la cabecera en
          `Inicio`. Quien llegaba veía la petición antes de saber qué iba a
          recibir.

          No se ha movido la cabecera aquí —eso rompería la exportación estática,
          que pinta `Inicio` y no esta ruta— sino que la subida va como hija de
          `Inicio`, que la pinta justo detrás de la propuesta de valor. El HTML
          exportado no cambia porque allí se pinta `Inicio` sin hijos.

          Y la capa que envuelve todo esto se llama `.inicio-ruta`, no `.inicio`:
          la que da la forma a la portada la pinta `Inicio`, para que la página
          exportada y la del navegador tengan las mismas medidas. Antes el
          contenedor estaba aquí, y el HTML exportado se quedaba sin él.
        */}
        <Inicio>
  <div
    className={`upload-zone${arrastrando ? ' upload-zone--activa' : ''}`}
    onDragOver={(event) => {
      if (!event.dataTransfer.types.includes('Files')) return;
      event.preventDefault();
      event.dataTransfer.dropEffect = 'copy';
      setArrastrando(true);
    }}
    onDragLeave={(event) => {
      if (event.relatedTarget instanceof Node && event.currentTarget.contains(event.relatedTarget)) return;
      setArrastrando(false);
    }}
    onDrop={(event) => {
      event.preventDefault();
      setArrastrando(false);
      const archivos = event.dataTransfer.files;
      if (archivos.length !== 1) {
        setErrorSubida('Arrastra un solo archivo cada vez.');
        return;
      }
      setErrorSubida('');
      loadFile(archivos[0]);
    }}
  >
    <div className="upload-icon" aria-hidden="true">⬆</div>
    <h2>{arrastrando ? 'Suelta el archivo para abrirlo' : 'Sube tu archivo'}</h2>
    <p>
               <strong>G-code:</strong> consulta material, temperaturas, gramos y tiempo.
    </p>
    <p>
      <strong>STL o 3MF</strong>: visor 3D. No se analiza: no lleva datos de
      impresión dentro.
    </p>
    <button
      type="button"
      className="btn-primary"
      onClick={openFilePicker}
    >
      Seleccionar Archivo
    </button>
    {errorSubida && <p role="alert">{errorSubida}</p>}
  </div>
        </Inicio>

        <AvisoAlmacenamiento />
        <Recientes />
      </div>
    );
  }

  return (
    <>
       <div className={showGcodeNotice ? 'analisis-trabajo' : 'viewer-container'}>
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
          <button className="btn-danger" onClick={clearFile} aria-label="Cerrar archivo">
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
            <>
            <div className="viewer-3d-container">
              <div className="viewer-overlay">Cargando visor 3D...</div>
            </div>
            <ControlesVisor disabled mensaje="Preparando el visor…" />
            </>
          }
        >
          {viewerFormat && <LazyViewer3D file={file} fileType={viewerFormat} onChooseFile={openFilePicker} />}
        </Suspense>

        {showGcodeNotice && (
          <>
            {trayectoria.fase === "vacia" && (
              <p className="archivo-nota">El G-code se analiza; su trayectoria se dibuja en 3D.</p>
            )}
            {trayectoria.fase === "leyendo" && (
              <div className="visor-trayectoria-cargando" role="status">
                Leyendo la trayectoria del G-code…
              </div>
            )}
            {trayectoria.fase === "error" && (
              <p className="archivo-nota" role="alert">
                No se ha podido dibujar la trayectoria: {trayectoria.mensaje}
              </p>
            )}
            {trayectoria.fase === "lista" && <VisorTrayectoria trayectoria={trayectoria.trayectoria} />}
            <SeccionAnalisis />
          </>
        )}

        {showUnsupported && (
          <div className="canvas-placeholder">
            <p className="canvas-error">
              {unsupportedFileMessage(fileType, file.name)}
            </p>
            <button type="button" className="btn-primary" onClick={openFilePicker}>Elegir otro archivo</button>
          </div>
        )}
      </div>
      <AvisoAlmacenamiento />
      <Recientes />
    </>
  );
}

export default UploadRoute;
