import { useState } from 'react';
import type { RevisionMalla as Estado } from '../state/useRevisionMalla';
import './revision-malla.css';

const nombres: Record<string, string> = {
  non_manifold_vertices: 'Vértices no manifold', non_manifold_edges: 'Aristas no manifold',
  flipped_normals: 'Normales invertidas', degenerate_triangles: 'Triángulos degenerados',
  holes: 'Aberturas', duplicate_faces: 'Caras duplicadas', isolated_vertices: 'Vértices aislados',
  not_watertight: 'Malla no cerrada', multiple_components: 'Componentes separados',
};

export function VeredictoMalla({ revision }: { revision: Estado }) {
  const actual = revision.resumen?.analisis ?? revision.analisis;
  const texto = revision.fase === 'analizando' || revision.fase === 'inactivo' ? 'Analizando la malla localmente…'
    : revision.fase === 'reparando' ? 'Preparando una copia reparada…'
      : revision.fase === 'error' ? 'No se ha podido completar la revisión.'
        : actual && (actual.incidencias.length || !actual.esCerrada || !actual.esManifold)
          ? 'Incidencias detectadas en la malla' : 'Sin incidencias detectadas';
  return <div className="malla-veredicto" role="status" aria-live="polite">
    <span className="malla-veredicto-marca" aria-hidden="true">◇</span>
    <div><span className="malla-eyebrow">REVISIÓN STL · LOCAL</span><strong>{texto}</strong>
      <a href="#revision-malla">Ver revisión y opciones ↓</a></div>
  </div>;
}

export default function RevisionMalla({ revision, nombre }: { revision: Estado; nombre: string }) {
  const actual = revision.resumen?.analisis ?? revision.analisis;
  const problemas = !!actual && (actual.incidencias.length > 0 || !actual.esCerrada || !actual.esManifold);
  const posibles = (revision.analisis?.aberturas.filter(a => a.looksDeliberate).length ?? 0);
  const omitidas = revision.resumen?.reparacion.fillHoles.holesSkippedAsFeature ?? 0;
  const ocupado = revision.fase === 'analizando' || revision.fase === 'reparando';
  return <section id="revision-malla" className="revision-malla" aria-label="Detalle de revisión STL">
    <p className="malla-intro">La revisión se realiza en tu navegador. El visor muestra siempre el archivo original; la reparación crea una copia.</p>
    {revision.avisoTamano && <p className="malla-aviso">Archivo de más de 60 MB (millones de bytes). Puede necesitar mucha memoria; el límite es 150 MB.</p>}
    {ocupado && <p role="status" className="malla-estado">{revision.fase === 'analizando' ? 'Analizando geometría…' : `Reparando la copia…${revision.progreso ? ` Paso ${revision.progreso.stepIndex + 1} de ${revision.progreso.totalSteps}.` : ''}`}</p>}
    {revision.error && <p role="alert" className="malla-error">No se ha podido completar la operación: {revision.error}</p>}
    {actual && <>
      <div className="malla-resumen">
        <span className="malla-eyebrow">{revision.resumen ? 'RESULTADO DE LA COPIA' : 'DIAGNÓSTICO INICIAL'}</span>
        <h3>{revision.resumen ? 'Incidencias pendientes' : problemas ? 'Incidencias detectadas' : 'Sin incidencias detectadas'}</h3>
        <p>{actual.incidencias.length ? `${actual.incidencias.length} ${actual.incidencias.length === 1 ? 'tipo de incidencia' : 'tipos de incidencia'}` : 'No se han detectado incidencias en esta revisión.'}</p>
        <dl><div><dt>Caras</dt><dd>{actual.analysis.faceCount.toLocaleString('es-ES')}</dd></div><div><dt>Malla cerrada</dt><dd>{actual.esCerrada ? 'Sí' : 'No'}</dd></div><div><dt>Manifold</dt><dd>{actual.esManifold ? 'Sí' : 'No'}</dd></div></dl>
        {actual.incidencias.length > 0 && <ul>{actual.incidencias.map((i, index) => <li key={`${i.type}-${index}`}><span>{nombres[i.type] ?? i.type}</span><strong>{i.count}</strong></li>)}</ul>}
        {(actual.carasNoFinitasEliminadas > 0 || actual.carasPerdidasAuditoria > 0 || actual.colorsDropped) && <p className="malla-aviso">Durante la lectura se descartaron datos: {actual.carasNoFinitasEliminadas} caras no finitas, {actual.carasPerdidasAuditoria} caras en auditoría{actual.colorsDropped ? ' y colores' : ''}.</p>}
      </div>
      {!revision.resumen && problemas && <button className="btn-primary malla-accion" type="button" disabled={ocupado} onClick={revision.reparar}>Reparar copia</button>}
    </>}
    {revision.fase === 'error' && !revision.analisis && <p>Prueba a seleccionar el archivo de nuevo o elige otro STL.</p>}
    {revision.urlDescarga && <a className="btn-primary malla-descarga" href={revision.urlDescarga} download={`${nombre.replace(/\.stl$/i, '')}-reparado.stl`}>Descargar STL reparado</a>}
    {(posibles > 0 || omitidas > 0) && <div className="malla-aberturas">
      <h3>Aberturas que podrían ser parte del diseño</h3>
      <p>El motor usa una heurística, no puede saber si son intencionadas. {omitidas > 0 && `La reparación dejó ${omitidas} sin rellenar.`}</p>
      {revision.resumen && !revision.resumen.rellenoForzado && <ConfirmarRelleno ocupado={ocupado} rellenar={revision.rellenarAberturas} />}
    </div>}
    <p className="malla-limite">Esta revisión no garantiza que la pieza sea imprimible. Comprueba la copia antes de usarla.</p>
  </section>;
}

function ConfirmarRelleno({ ocupado, rellenar }: { ocupado: boolean; rellenar: () => void }) {
  const [confirmado, setConfirmado] = useState(false);
  return <>
    <p>Rellenarlas puede cambiar o cerrar detalles de la pieza. Esta acción vuelve a trabajar desde el original.</p>
    <label><input type="checkbox" checked={confirmado} onChange={e => setConfirmado(e.target.checked)} /> Entiendo que se pueden cerrar detalles de la pieza.</label>
    <button className="malla-secundario" type="button" disabled={!confirmado || ocupado} onClick={() => { setConfirmado(false); rellenar(); }}>Rellenar posibles aberturas</button>
  </>;
}
