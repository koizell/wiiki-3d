import { useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import type { AnalysisStatus } from '../components/AnalysisPanel';
import { parseGcode } from '../services/ParserService';
import { classifyWithJev } from '../services/JevService';
import type { JevClassification, ProjectMetadata } from '../services/types';
import { detectFileType, toErrorMessage, type FileType } from '../lib/files';
import { ActionsContext, StateContext } from './contexts';

/**
 * Estado del archivo cargado y de su análisis.
 *
 * Vive aquí, y no en un componente de ruta, por una razón concreta: el
 * proveedor envuelve al `BrowserRouter`, así que cambiar de ruta no desmonta el
 * estado. Un G-code de 200 MB no puede perderse por haber tocado un enlace.
 *
 * Lo que **no** cubre: recargar la página. El estado sigue en memoria, sin
 * persistencia, así que un F5 devuelve la app al estado de primera vez. Eso está
 * sin resolver a propósito — depende de la arquitectura de backend, que aún no
 * está decidida.
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

  const loadFile = (selected: File) => {
    const detectedType = detectFileType(selected.name);

    setFile(selected);
    setFileType(detectedType);
    // El análisis anterior se descarta: si el nuevo archivo es un STL o no es
    // analizable, el panel debe volver a su estado inicial, no al anterior.
    setMetadata(null);
    setClassification(null);
    setAnalysisError(null);
    // Solo el G-code entra en la cola de análisis. El resto no está "pendiente":
    // el panel explica desde el principio que ese formato no se analiza, en
    // lugar de seguir invitando a subir un archivo que el usuario ya ha subido.
    setAnalysisStatus(detectedType === 'gcode' ? 'idle' : 'unsupported');
  };

  const clearFile = () => {
    setFile(null);
    setFileType(null);
    setMetadata(null);
    setClassification(null);
    setAnalysisError(null);
    setAnalysisStatus('idle');
  };

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
    }),
    [file, fileType, metadata, classification, analysisStatus, analysisError]
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
    () => ({ loadFile, clearFile, openFilePicker, fileInputRef }),
    []
  );

  return (
    <StateContext.Provider value={state}>
      <ActionsContext.Provider value={actions}>{children}</ActionsContext.Provider>
    </StateContext.Provider>
  );
}