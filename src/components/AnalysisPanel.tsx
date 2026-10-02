import type { JevClassification, ProjectMetadata, RiskLevel } from '../services/types';

/**
 * AnalysisPanel — muestra el diagnóstico técnico de la pieza que está
 * subiendo el usuario.
 *
 * El componente es tonto a propósito: no dispara promesas ni conoce servicios,
 * solo pinta el estado que le entrega `App`. Así el orquestado del análisis
 * (parseo -> clasificación) vive en un único sitio y el panel se puede probar
 * renderizando cada estado por separado.
 */

/**
 * Fases del análisis, en el orden en las que se recorren.
 *
 * `unsupported` no es una fase: es el estado terminal de los formatos que se
 * pueden ver pero no analizar. Existe para que el panel no invite a subir un
 * archivo cuando ya hay uno cargado, y para no gastar ese mensaje en errores.
 */
export type AnalysisStatus =
  | 'idle'
  | 'parsing'
  | 'classifying'
  | 'done'
  | 'error'
  | 'unsupported';

/**
 * Formatos que el panel sabe nombrar en su aviso. El `Record` obliga a
 * declararlos todos: si `App` aprende a enrutar un formato nuevo, el
 * compilador reclama el texto que falta.
 */
type AnalysisFileType = 'stl' | 'gcode' | '3mf' | 'obj' | 'unknown';

interface AnalysisPanelProps {
  status: AnalysisStatus;
  metadata: ProjectMetadata | null;
  classification: JevClassification | null;
  error: string | null;
  /**
   * Formato del archivo cargado. Solo se usa en el estado `unsupported`, para
   * decir en concreto por qué ese archivo no se analiza; opcional porque el
   * resto de estados no lo necesitan.
   */
  fileType?: AnalysisFileType;
}

/**
 * Aviso por formato: informativo, no un error. Solo el G-code lleva metadatos de
 * impresión (material, temperaturas, altura de capa...), así que el resto de
 * formatos se aclara en lugar de analizarse.
 */
const UNSUPPORTED_MESSAGE: Record<AnalysisFileType, string> = {
  stl:
    'Los archivos STL no contienen metadatos de impresión. Para ver el ' +
    'análisis técnico, sube un archivo G-code (.gcode o .gco).',
  '3mf':
    'Los archivos .3mf se pueden visualizar en 3D, pero el análisis técnico ' +
    'está reservado a archivos G-code. Para un análisis completo, exporta tu ' +
    'proyecto como G-code.',
  obj: 'El análisis técnico está disponible para archivos G-code. Los archivos .obj no se analizan.',
  unknown: 'Formato no compatible. Sube un archivo .stl, .3mf, .gcode o .gco.',
  gcode:
    'No se han encontrado metadatos de impresión en este G-code. Vuelve a ' +
    'exportarlo desde el slicer para que incluya la cabecera con los ajustes.',
};

/** Mensaje de carga asociado a cada fase en curso. */
const LOADING_MESSAGE: Record<'parsing' | 'classifying', string> = {
  parsing: 'Parseando G-code...',
  classifying: 'Consultando a Jev...',
};

/**
 * Clase CSS de cada nivel de riesgo. El `Record` obliga a declarar las cuatro
 * variantes: si `RiskLevel` crece, el compilador avisa aquí.
 */
const RISK_CLASS: Record<RiskLevel, string> = {
  Bajo: 'risk-bajo',
  Moderado: 'risk-moderado',
  Alto: 'risk-alto',
  'Crítico': 'risk-critico',
};

function AnalysisPanel({ status, metadata, classification, error, fileType }: AnalysisPanelProps) {
  if (status === 'parsing' || status === 'classifying') {
    return (
      <p className="panel-loading" role="status" aria-live="polite">
        {LOADING_MESSAGE[status]}
      </p>
    );
  }

  if (status === 'error') {
    return (
      <p className="panel-error" role="alert">
        {error ?? 'No se ha podido completar el análisis del archivo.'}
      </p>
    );
  }

  // Hay archivo cargado pero este formato no lleva datos analizables. Se
  // distingue del `idle` porque el mensaje de "sube un archivo" sería falso
  // aquí: el usuario ya lo ha subido, simplemente no es analizable.
  if (status === 'unsupported') {
    return (
      <p className="panel-unsupported" role="status">
        {UNSUPPORTED_MESSAGE[fileType ?? 'unknown']}
      </p>
    );
  }

  // Estado idle o un `done` a medias (Jev aún no ha respondido): sin datos que
  // pintar, se muestra el mensaje de invitación a subir un archivo.
  if (status === 'idle' || !metadata || !classification) {
    return (
      <div className="panel-empty">
        <p>Sube un archivo para ver el análisis técnico automático.</p>
      </div>
    );
  }

  return (
    <div className="panel-body">
      <section>
        <h4 className="panel-section-title">Metadatos de impresión</h4>
        <dl className="panel-data">
          <DataRow label="Material" value={metadata.material} />
          <DataRow label="Temp. hotend" value={formatCelsius(metadata.hotendTemp)} />
          <DataRow label="Temp. cama" value={formatCelsius(metadata.bedTemp)} />
          <DataRow label="Altura de capa" value={formatMillimetres(metadata.layerHeight)} />
          <DataRow label="Tiempo estimado" value={formatDuration(metadata.printTime)} />
          <DataRow label="Filamento" value={formatGrams(metadata.filamentUsed)} />
          <DataRow label="Peso total" value={formatGrams(metadata.filamentWeight)} />
          <DataRow label="Voladizos" value={formatYesNo(metadata.hasOverhangs)} />
          <DataRow label="Ángulo máx." value={formatDegrees(metadata.overhangAngle)} />
        </dl>
      </section>

      <section>
        <h4 className="panel-section-title">Diagnóstico de Jev</h4>
        <dl className="panel-data">
          <div className="panel-data-row">
            <dt className="panel-data-key">Nivel de riesgo</dt>
            <dd className="panel-data-value">
              <span className={`risk-badge ${RISK_CLASS[classification.riskLevel]}`}>
                {classification.riskLevel}
              </span>
            </dd>
          </div>
          <DataRow label="Riesgo de warping" value={formatPercent(classification.warpingRisk)} />
          <DataRow label="Soportes" value={classification.needsSupport ? 'Necesarios' : 'No necesarios'} />
        </dl>
      </section>

      <div className="panel-recommendation">
        <strong className="panel-recommendation-title">Recomendación</strong>
        <p>{classification.recommendation}</p>
      </div>
    </div>
  );
}

/**
 * Marca que se pinta en un campo que el parser no pudo rellenar.
 *
 * Los campos opcionales de `ProjectMetadata` quedan sin definir cuando el slicer
 * no escribe el dato, y eso no es lo mismo que valerse cero: `0` gramos o `0°` de
 * voladizo son afirmaciones que el G-code no contiene. El guion dice "aquí no
 * hay dato" sin inventar uno.
 */
const NO_DATA = '—';

/**
 * Una fila clave-valor del panel.
 *
 * Acepta `undefined` para que quien la llama pueda pasar un campo opcional tal
 * cual, sin tener que decidir en el JSX si está presente. `value` llega ya
 * formateado: el formateo vive en las funciones de abajo porque cada unidad
 * decide su propia manera de mostrar la ausencia de dato.
 */
function DataRow({
  label,
  value,
}: {
  label: string;
  value: string | number | undefined;
}) {
  return (
    <div className="panel-data-row">
      <dt className="panel-data-key">{label}</dt>
      <dd className="panel-data-value">{value ?? NO_DATA}</dd>
    </div>
  );
}

/** `5400` -> `"1 h 30 min"`, para no pedirle al usuario que haga la cuenta. */
function formatDuration(totalSeconds: number): string {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.round((totalSeconds % 3600) / 60);
  if (hours === 0) return `${minutes} min`;
  return `${hours} h ${String(minutes).padStart(2, '0')} min`;
}

/** `215` -> `"215 °C"`. Sin dato -> guion. */
function formatCelsius(value: number | undefined): string | undefined {
  return value === undefined ? undefined : `${value} °C`;
}

/** `0.2` -> `"0.2 mm"`. Sin dato -> guion. */
function formatMillimetres(value: number | undefined): string | undefined {
  return value === undefined ? undefined : `${value} mm`;
}

/** `0.93` -> `"0.93 g"`. Sin dato -> guion. */
function formatGrams(value: number | undefined): string | undefined {
  return value === undefined ? undefined : `${value} g`;
}

/** `45` -> `"45°"`. Sin dato -> guion. */
function formatDegrees(value: number | undefined): string | undefined {
  return value === undefined ? undefined : `${value}°`;
}

/**
 * `true` -> `"Sí"`, `false` -> `"No"`, sin dato -> guion.
 *
 * El caso `false` importa: el slicer puede declarar que no hay soportes
 * (`enable_support = 0`), y eso es un dato. Ausencia de dato es otra cosa.
 */
function formatYesNo(value: boolean | undefined): string | undefined {
  if (value === undefined) return undefined;
  return value ? 'Sí' : 'No';
}

/** `0.35` -> `"35 %"`. */
function formatPercent(ratio: number): string {
  return `${Math.round(ratio * 100)} %`;
}

export default AnalysisPanel;