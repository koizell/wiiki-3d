import { useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import type { AnalysisStatus } from '../components/AnalysisPanel';
import { parseGcode, parseGcodeTexto } from '../services/ParserService';
import { analizarGcode, type Trayectoria } from '../services/GcodeTrayectoria';
import { leerProyecto3mfAsync } from '../services/ThreeMfProyecto';
import { classifyWithJev } from '../services/JevService';
import type { JevClassification, ProjectMetadata } from '../services/types';
import { detectFileType, toErrorMessage, type FileType } from '../lib/files';
import { guardarAnalisis } from '../lib/storage';
import { materialUnico } from '../lib/materiales';
import { ActionsContext, StateContext, type EntradaRestaurable } from './contexts';

/**
 * Estado del archivo cargado y de su análisis.
 *
 * Vive aquí, y no en un componente de ruta, por una razón concreta: el
 * proveedor envuelve al `BrowserRouter`, así que cambiar de ruta no desmonta el
 * estado. Un G-code de 200 MB no puede perderse por haber tocado un enlace.
 *
 * Lo que **no** cubre: recargar la página devuelve la app al estado de primera
 * vez. El panel no se restaura, y no se va a restaurar: un G-code de 200 MB no
 * vuelve a leerse al arrancar.
 *
 * Lo que **sí** sobrevive al F5 es el análisis, como entrada del historial. Eso lo
 * guarda `src/lib/storage.ts` en cuanto `status` pasa a `done`, y es la diferencia
 * entre perder el trabajo y perder el visor: la fila sigue ahí con su nombre, su
 * fecha, su material y su nivel de riesgo, aunque el panel vuelva a estar vacío.
 */
export function AnalysisProvider({ children }: { children: ReactNode }) {
  /*
   * El input de fichero real, que no se ve ni se enfoca.
   *
   * El ref vive en el proveedor, no en el shell, porque hay dos botones que lo
   * abren —el de la barra superior y el de la zona de subida— y están en ramas
   * distintas del árbol. El `<input>` sí se pinta en el shell; aquí sólo está el
   * ref que hay que engancharle.
   *
   * `display: none` no impide el `.click()` programático, así que el input puede
   * seguir oculto y a la vez quedar fuera del árbol de accesibilidad: lo que el
   * teclado alcanza son los botones, que son controles reales.
   */
  const fileInputRef = useRef<HTMLInputElement>(null);
  const openFilePicker = () => fileInputRef.current?.click();

  const [file, setFile] = useState<File | null>(null);
  const [fileType, setFileType] = useState<FileType | null>(null);
  const [metadata, setMetadata] = useState<ProjectMetadata | null>(null);
  const [classification, setClassification] = useState<JevClassification | null>(null);
  const [analysisStatus, setAnalysisStatus] = useState<AnalysisStatus>('idle');
  const [analysisError, setAnalysisError] = useState<string | null>(null);
  /**
   * La trayectoria del G-code, cuando el archivo la trae.
   *
   * Vive aquí y no en la vista porque la necesitan **dos** sitios: el visor 3D,
   * que la dibuja, y la ruta, que decide si hay trayectoria que enseñar. Y porque
   * es parte del **mismo** archivo: un 3MF de proyecto lleva dentro su G-code, y
   * ese G-code es a la vez lo que se analiza y lo que se dibuja.
   */
  const [trayectoria, setTrayectoria] = useState<Trayectoria | null>(null);

  const loadFile = (selected: File) => {
    const detectedType = detectFileType(selected.name);

    setFile(selected);
    setFileType(detectedType);
    // El análisis anterior se descarta: si el nuevo archivo es un STL o no es
    // analizable, el panel debe volver a su estado inicial, no al anterior.
    setMetadata(null);
    setClassification(null);
    setAnalysisError(null);
    setTrayectoria(null);
    // Solo el G-code entra en la cola de análisis. El resto no está "pendiente":
    // el panel explica desde el principio que ese formato no se analiza, en
    // lugar de seguir invitando a subir un archivo que el usuario ya ha subido.
    //
    // El 3MF es la excepción: un 3MF **de proyecto** lleva dentro su G-code, y
    // entonces sí se puede analizar. El estado no se decide por la extensión sino
    // por lo que traiga el archivo, y por eso aquí se pone 'unsupported' y el
    // efecto de más abajo lo cambia si encuentra un G-code dentro.
    setAnalysisStatus(detectedType === 'gcode' ? 'idle' : 'unsupported');
  };

  const clearFile = () => {
    setFile(null);
    setFileType(null);
    setMetadata(null);
    setClassification(null);
    setAnalysisError(null);
    setTrayectoria(null);
    setAnalysisStatus('idle');
  };

  /*
   * Devolver un análisis del historial al estado.
   *
   * **`setFile(null)` es lo que define este estado.** No es que se olvide el
   * archivo: es que no está. P2 decidió guardar el análisis y no el archivo, así
   * que restaurarlo devuelve todo menos lo que el visor necesita, y el panel tiene
   * que ser honesto sobre eso en vez de fingir que tiene un archivo entre manos.
   *
   * El estado es `'done'` y no `'idle'` porque no hay nada que analizar: el
   * análisis ya está hecho, y volver a ponerlo en cola haría que la pantalla
   * parpadeara como si estuviera trabajando.
   */
  const restaurarAnalisis = ({ fileType: tipo, metadata: meta, classification: clasif }: EntradaRestaurable) => {
    setFile(null);
    setFileType(tipo);
    setMetadata(meta);
    setClassification(materialUnico(meta.material) ? clasif : null);
    setAnalysisError(null);
    setAnalysisStatus('done');
  };

  /*
   * El 3MF de proyecto: la malla, la trayectoria y el análisis, de un archivo.
   *
   * Un 3MF de proyecto —el que exportan Bambu Studio, OrcaSlicer y
   * PrusaSlicer— lleva dentro el G-code que la máquina va a ejecutar. Abrirlo es
   * abrir un ZIP, y `three` ya trae dentro el unzip que hace falta, así que
   * **no hace falta ninguna dependencia nueva**.
   *
   * Y el G-code que sale de ahí es el mismo que se subiría suelto: los mismos
   * metadatos, la misma trayectoria, y —esto es lo importante— **las coordenadas
   * de cama**, que es lo que permite superponer la trayectoria y la malla sin
   * medir nada.
   */
  useEffect(() => {
    if (!file || fileType !== '3mf') return;

    const controller = new AbortController();

    const runProyecto = async () => {
      try {
        const datos = await file.arrayBuffer();
        if (controller.signal.aborted) return;

        const proyecto = await leerProyecto3mfAsync(datos);
        if (controller.signal.aborted) return;

        // Un 3MF de malla —el que exporta un CAD— no lleva G-code, y eso no es un
        // fallo: se queda como estaba, con el aviso de que no se analiza.
        if (!proyecto.gcode) return;

        setAnalysisStatus('parsing');
        const meta = parseGcodeTexto(proyecto.gcode, `${file.name} · placa 1`);
        if (controller.signal.aborted) return;
        setMetadata(meta);

        setTrayectoria(analizarGcode(proyecto.gcode));
        if (controller.signal.aborted) return;

        if (!materialUnico(meta.material)) {
          setAnalysisStatus('done');
          return;
        }

        setAnalysisStatus('classifying');
        const jevResult = await classifyWithJev(meta);
        if (controller.signal.aborted) return;
        setClassification(jevResult);
        setAnalysisStatus('done');
      } catch (error) {
        if (controller.signal.aborted) return;
        // Un 3MF que no se puede abrir no es un fallo de la aplicación: es un
        // archivo que no lleva lo que se le pidió. Se avisa y se sigue.
        setAnalysisError(toErrorMessage(error));
        setAnalysisStatus('unsupported');
      }
    };

    void runProyecto();

    return () => controller.abort();
  }, [file, fileType]);

  // Solo el G-code tiene metadatos de impresión que analizar; el resto de
  // formatos ya quedó en `unsupported` al subir el archivo.
  useEffect(() => {
    if (!file || fileType !== 'gcode') return;

    // Los servicios todavía no aceptan una señal de cancelación, así que el
    // `AbortController` actúa como bandera: abortar desde la limpieza impide
    // que una promesa lenta pinte resultados de un archivo ya sustituido o de un
    // componente desmontado.
    const controller = new AbortController();

    const runAnalysis = async () => {
      setAnalysisStatus('parsing');
      setAnalysisError(null);
      try {
        const parsedMetadata = await parseGcode(file);
        if (controller.signal.aborted) return;
        setMetadata(parsedMetadata);

        if (!materialUnico(parsedMetadata.material)) {
          setAnalysisStatus('done');
          return;
        }

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

  /*
   * El guardado al historial, en cuanto el análisis termina.
   *
   * Es un `useEffect` aparte y no el último paso de `runAnalysis`, por una razón
   * concreta: **el estado del análisis y la persistencia son cosas distintas.** Si
   * el guardado viviera dentro de `runAnalysis`, un fallo de IndexedDB —o el navegador
   * en modo privado— podrían convertir un análisis correcto en un error en pantalla, y
   * eso sería justo lo contrario de lo que quiere el diseño: la persistencia es un
   * extra, y un extra que falla no puede romper lo que funciona.
   *
   * Depende de `status === 'done'` y no de `metadata`, porque `metadata` cambia a
   * `parsing` y a `classifying` antes de tener la clasificación completa, y una
   * entrada sin `classification` no se puede enseñar en ninguna vista.
   *
   * El `fileType` está en la guarda y no se fuerza a `gcode`. A `done` sólo se
   * llega con un G-code —los demás formatos se quedan en `unsupported`—, pero eso
   * es una propiedad del flujo y no del tipo, y escribir `gcode` a mano sería
   * poner en el historial un tipo que nadie ha comprobado. Los ficheros guardados
   * llevan lo que el análisis vio.
   *
   * Sin botón y sin preguntar: H-3.1 habla de «análisis guardados», y un G-code que
   * alguien ha subido y ha esperado a que se analice ya es un análisis que ha
   * hecho. Preguntar sería un paso más para conseguir lo mismo.
   */
  useEffect(() => {
    if (analysisStatus !== 'done') return;
    if (!metadata || !classification || !fileType) return;
    /*
     * **Y sólo si hay archivo.** Es lo que impide que restaurar una entrada del
     * historial la vuelva a guardar: `restaurarAnalisis` deja `status` en
     * `'done'`, así que sin esta guarda cada vez que se pulsara una fila de la
     * lista se creaba una entrada duplicada. Y el motivo de fondo es que lo que
     * se guarda es un análisis *hecho*, no un análisis mostrado: uno restaurado
     * ya está en la base desde que se hizo.
     */
    if (!file) return;

    void guardarAnalisis({
      filename: metadata.filename,
      fileType,
      metadata,
      classification,
    });
  }, [analysisStatus, metadata, classification, fileType, file]);

  /*
   * El objeto de valores va memoizado, y no por rutina. `useMemo` no evita
   * repintar a los consumidores por sí solo —eso lo decide el contexto en el que
   * viven— pero sí evita que el objeto del contexto sea una referencia nueva en
   * cada render. Sin esto, cualquier render del proveedor entregaría un objeto
   * distinto a `StateContext` y dispararía el repintado de todos sus
   * consumidores, aunque ninguno de los seis valores hubiera cambiado.
   */
  const state = useMemo(
    () => ({
      file,
      fileType,
      metadata,
      classification,
      status: analysisStatus,
      error: analysisError,
      trayectoria,
    }),
    [file, fileType, metadata, classification, analysisStatus, analysisError, trayectoria]
  );

  /*
   * Las acciones van en un `useMemo` con dependencias vacías, y no por descuido.
   * Lo que guardan es estable para toda la vida del componente: `loadFile` y
   * `clearFile` sólo usan los `setState`, y `fileInputRef` viene de un `useRef`.
   * No hay nada que reinstalar cuando el estado cambia.
   *
   * Sin este memo el objeto sería nuevo en cada render, y eso deshace justo lo
   * que el contexto separado compra: un consumidor de `useAnalysisActions` se
   * repintaría en cada tick del análisis aunque no use ninguna acción.
   */
  const actions = useMemo(
    () => ({ loadFile, clearFile, restaurarAnalisis, openFilePicker, fileInputRef }),
    []
  );

  return (
    <StateContext.Provider value={state}>
      <ActionsContext.Provider value={actions}>{children}</ActionsContext.Provider>
    </StateContext.Provider>
  );
}
