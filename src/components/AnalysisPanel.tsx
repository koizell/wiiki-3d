import { Link } from 'react-router-dom';
import type { ArticuloDeCampo } from '../lib/wiki-campos';
import { etiquetaSlicer, formatoWarping } from '../lib/tu-archivo';
import type { JevClassification, ProjectMetadata, RiskLevel } from '../services/types';
import { materialUnico, textoMaterial } from '../lib/materiales';

/**
 * AnalysisPanel — muestra el diagnóstico técnico de la pieza que está
 * subiendo el usuario.
 *
 * El componente es tonto a propósito: no dispara promesas ni conoce servicios,
 * solo pinta el estado que le entrega `App`. Así el orquestado del análisis
 * (parseo -> clasificación) vive en un único sitio y el panel se puede probar
 * renderizando cada estado por separado.
 *
 * Con `explicar` ocurre lo mismo. El panel no sabe qué artículos hay ni cómo se
 * llama ninguno: sólo recibe una función que, dado el nombre de un campo del
 * análisis, dice si hay un artículo que lo explique. Quien decide eso es
 * `src/lib/wiki-campos.ts`, y llegar hasta aquí con la tabla entera atada al
 * panel convertiría un componente de presentación en el punto donde vive la
 * wiki.
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
  modoClasificacion: 'demo' | 'real';
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
  /**
   * Qué artículo de la wiki explica cada campo del análisis.
   *
   * Se pasa como función y no como tabla para que el panel no dependa de
   * `src/lib/wiki-campos.ts`. Con una tabla importada, el panel arrastraría la
   * correspondencia entre campos y artículos sin poder probarlos por separado.
   */
  explicar?: (campo: string) => ArticuloDeCampo | null;
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

function AnalysisPanel({
  status,
  metadata,
  classification,
  error,
  fileType,
  explicar,
  modoClasificacion,
}: AnalysisPanelProps) {
  const demo = modoClasificacion === 'demo';
  const materialAmbiguo = metadata !== null && !materialUnico(metadata.material);
  if (status === 'parsing' || status === 'classifying') {
    return (
      <p className="panel-loading" role="status" aria-live="polite">
        {status === 'classifying' && demo ? 'Calculando estimación local de demostración...' : LOADING_MESSAGE[status]}
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
  if (status === 'idle' || !metadata || (!classification && !materialAmbiguo)) {
    return (
      <div className="panel-empty">
        <p>Sube un archivo para ver el análisis técnico automático.</p>
      </div>
    );
  }

  return (
    <div className="panel-body">
      {materialAmbiguo && (
        <p className="panel-multimaterial" role="status">
          <strong>No evaluable: varios materiales declarados.</strong> La cabecera no identifica
          qué ranuras se usan. Se conservan los datos leídos, pero no se calcula un riesgo único.
          Reexporta el G-code con el material utilizado para obtener una estimación.
          Sin clasificación, esta lectura no se guarda como un análisis nuevo en el historial.
        </p>
      )}
      {demo && !materialAmbiguo && (
        <p className="panel-demo-nota">
          Estimación local de demostración, calculada en tu navegador sin consultar ningún servicio.
          El índice de 0 a 100 no es una probabilidad de fallo validada y no garantiza que la pieza
          se imprima bien. No comprueba la geometría ni verifica si necesita soportes.
        </p>
      )}
      {!materialAmbiguo && classification && <div className="panel-recommendation">
        <strong className="panel-recommendation-title">{demo ? 'Orientación de demostración' : 'Recomendación'}</strong>
        <p>{classification.recommendation}</p>
      </div>}
      <section>
        <h3 className="panel-section-title">Metadatos de impresión</h3>
        <dl className="panel-data">
          {/*
            `campo` es lo que hace que una fila enlace a la guía que explica ese
            dato. **Cada campo que esté en `src/lib/wiki-campos.ts` tiene que
            pasarlo aquí**, o la tabla promete un enlace que la vista no pinta: es
            un fallo silencioso, porque el enlace que no sale no da error.

            Pasó con `bedTemp`, y volvió a pasar con `material`, `hotendTemp`,
            `layerHeight`, `hasOverhangs` y `overhangAngle` al escribir sus guías:
            las entradas estaban en la tabla y estas filas no pedían el campo.
            `verify:wiki` lo comprueba ahora contra `CAMPOS_WIKI`, para que no haya
            que acordarse.
          */}
          <DataRow label="Material" value={textoMaterial(metadata.material)} campo="material" explicar={explicar} />
          {/*
            La fila del slicer va justo debajo del material, y es a propósito: es
            el programa que escribió el valor de al lado. `slicer` es obligatorio
            en `ProjectMetadata`, así que nunca es «—»; si el G-code no trae
            cabecera reconocible, el análisis no llega a esta pantalla.
          */}
          <DataRow
            label="Slicer"
            value={etiquetaSlicer(metadata.slicer)}
            campo="slicer"
            explicar={explicar}
          />
          <DataRow
            label="Temp. hotend"
            value={formatCelsius(metadata.hotendTemp)}
            campo="hotendTemp"
            explicar={explicar}
          />
          <DataRow
            label="Temp. cama"
            value={formatCelsius(metadata.bedTemp)}
            campo="bedTemp"
            explicar={explicar}
          />
          <DataRow
            label="Altura de capa"
            value={formatMillimetres(metadata.layerHeight)}
            campo="layerHeight"
            explicar={explicar}
          />
          <DataRow label="Tiempo estimado" value={formatDuration(metadata.printTime)} />
          <DataRow label="Filamento" value={formatGrams(metadata.filamentUsed)} />
          <DataRow label="Peso total" value={formatGrams(metadata.filamentWeight)} />
          <DataRow
            label="Voladizos"
            value={formatYesNo(metadata.hasOverhangs)}
            campo="hasOverhangs"
            explicar={explicar}
          />
          <DataRow
            label="Ángulo máx."
            value={formatDegrees(metadata.overhangAngle)}
            campo="overhangAngle"
            explicar={explicar}
          />
        </dl>
      </section>

      {!materialAmbiguo && classification && <section>
        <h3 className="panel-section-title">{demo ? 'Estimación local (demo)' : 'Diagnóstico de Jev'}</h3>
        <dl className="panel-data">
          <div className="panel-data-row">
            <dt className="panel-data-key">{demo ? 'Nivel orientativo' : 'Nivel de riesgo'}</dt>
            <dd className="panel-data-value">
              <span className={`risk-badge ${RISK_CLASS[classification.riskLevel]}`}>
                {classification.riskLevel}
              </span>
              {explicar?.('riskLevel') && <Explicar articulo={explicar('riskLevel')!} />}
            </dd>
          </div>
          <DataRow
            label={demo ? 'Índice de warping (demo)' : 'Riesgo de warping'}
            value={formatoWarping(classification.warpingRisk, modoClasificacion)}
            campo="warpingRisk"
            explicar={explicar}
          />
          <DataRow label="Soportes" value={demo ? 'No verificados' : classification.needsSupport ? 'Necesarios' : 'No necesarios'} />
        </dl>
      </section>}

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
 * El enlace de «este dato tiene una explicación larga».
 *
 * Es lo que separa esta wiki de una genérica: el panel acaba de decir «35 %» y a
 * un clic está la tarjeta que explica de dónde sale ese 35 %, con sus fuentes al
 * pie. Sin este enlace, la guía más completa del sitio es un documento suelto al
 * que se llega por búsqueda.
 *
 * Y el enlace lleva al **ancla**, no a la cabecera: quien pulsa «Warping en PLA»
 * desde «Riesgo de warping, 35 %» cae en la tarjeta del riesgo, no al principio de
 * la guía a buscarla. La ancla la declara la guía y el panel la copia en
 * `CAMPOS_WIKI`; `verify:wiki` vigila que las dos coincidan.
 *
 * El texto del enlace es el nombre de la guía, no «más info»: «más info» no dice
 * de qué, y aquí lo interesante es justamente qué.
 */
function Explicar({ articulo }: { articulo: ArticuloDeCampo }) {
  return (
    <Link className="panel-explicar" to={`/wiki/${articulo.slug}#${articulo.ancla}`}>
      {articulo.etiqueta}
    </Link>
  );
}

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
  campo,
  explicar,
}: {
  label: string;
  value: string | number | undefined;
  /**
   * Nombre del campo en `ProjectMetadata`. Opcional porque no todos los campos
   * tienen artículo que los explique —de `printTime` no hay ninguno, y no lo
   * habrá— y no tiene sentido un enlace vacío donde no hay nada que enlazar.
   */
  campo?: string;
  explicar?: AnalysisPanelProps['explicar'];
}) {
  /*
   * El enlace se decide **fuera** de la comprobación del valor, y a propósito.
   *
   * Cuando el slicer no escribe un campo opcional, el panel pinta «—», y ahí el
   * artículo sigue enlazando. El artículo explica el concepto, no esta instancia:
   * que el G-code de este usuario no traiga el campo es **una razón más para
   * leerlo**, porque la sección «Por qué tu slicer puede no escribir este dato» viene
   * justo a contestar eso. Poner el enlace dentro de «si hay valor» dejaría sin
   * salida a quien más lo necesita.
   *
   * Los dos únicos campos atados ahora mismo —`warpingRisk` y `riskLevel`— son
   * obligatorios, así que este camino todavía no se ha visto en un G-code real.
   * `scripts/verify/wiki.mjs` lo vigila con el fixture, que sí deja `Peso total` y
   * `Ángulo máx.` sin dato, para que en cuanto haya artículo para uno de esos dos
   * el enlace con «—» quede comprobado desde el primer día.
   */
  const articulo = campo && explicar ? explicar(campo) : null;
  return (
    <div className="panel-data-row">
      <dt className="panel-data-key">{label}</dt>
      <dd className="panel-data-value">
        {value ?? NO_DATA}
        {articulo && <Explicar articulo={articulo} />}
      </dd>
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

export default AnalysisPanel;
