import { useState } from 'react';
import type { RevisionMalla as Estado } from '../state/useRevisionMalla';
import type { AnalisisMalla } from '../services/reparacionMalla';
import { Link } from 'react-router-dom';
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
        : revision.resumen && ((!revision.resumen.rellenoForzado && revision.resumen.reparacion.fillHoles.holesSkippedAsFeature > 0) || (actual && (actual.incidencias.length > 0 || !actual.esCerrada || !actual.esManifold))) ? 'Reparación parcial: problemas pendientes'
          : revision.resumen ? 'Reparación completada'
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
  return <section id="revision-malla" className="revision-malla" aria-label="Detalle de revisión STL" tabIndex={0}>
    <span className="malla-eyebrow">REVISIÓN DE MALLA</span>
    <h2>{revision.resumen ? 'Resultado de la copia' : 'Diagnóstico inicial'}</h2>
    <p className="malla-intro">La revisión se realiza en tu navegador. El visor muestra siempre el archivo original; la reparación crea una copia.</p>
    {revision.avisoTamano && <p className="malla-aviso">Archivo de más de 60 MB (millones de bytes). Puede necesitar mucha memoria; el límite es 150 MB.</p>}
    {!!revision.analisis?.bytesAdicionales && <p className="malla-aviso">El archivo contiene {revision.analisis.bytesAdicionales.toLocaleString('es-ES')} bytes adicionales al final. Esos datos no se han analizado y no se conservarán en la descarga reparada. El archivo original no se modifica.</p>}
    {ocupado && <p role="status" className="malla-estado">{revision.fase === 'analizando' ? 'Analizando geometría…' : `Reparando la copia…${revision.progreso ? ` Paso ${revision.progreso.stepIndex + 1} de ${revision.progreso.totalSteps}.` : ''}`}</p>}
    {revision.error && <div role="alert" className="malla-error"><p>No se ha podido completar la operación: {revision.error}</p><p>El visor y el resto de la aplicación siguen disponibles. Si el problema continúa, puedes <Link to="/contacto">Contactar</Link>.</p></div>}
    {revision.analisis && <Perdidas titulo="Lectura inicial" analisis={revision.analisis} />}
    {revision.resumen && <Perdidas titulo="Copia reparada" analisis={revision.resumen.analisis} />}
    {actual && <>
      <div className="malla-resumen">
        <span className="malla-eyebrow">{revision.resumen ? 'RESULTADO DE LA COPIA' : 'DIAGNÓSTICO INICIAL'}</span>
        <h3>{revision.resumen ? 'Incidencias pendientes' : problemas ? 'Incidencias detectadas' : 'Sin incidencias detectadas'}</h3>
        <p>{actual.incidencias.length ? `${actual.incidencias.length} ${actual.incidencias.length === 1 ? 'tipo de incidencia' : 'tipos de incidencia'}` : 'No se han detectado incidencias en esta revisión.'}</p>
        {actual.incidencias.length > 0 && <ul>{actual.incidencias.map((i, index) => <li key={`${i.type}-${index}`}><span>{nombres[i.type] ?? i.type}</span><strong>{i.count}</strong></li>)}</ul>}
        {!revision.resumen && problemas && <button className="btn-primary malla-accion" type="button" disabled={ocupado} onClick={revision.reparar}>Reparar copia</button>}
        {revision.urlDescarga && <a className="btn-primary malla-descarga" href={revision.urlDescarga} download={`${nombre.replace(/\.stl$/i, '')}-reparado.stl`}>Descargar STL reparado</a>}
        <h3>Datos de la {revision.resumen ? 'copia' : 'malla'}</h3>
        <dl><div><dt>Vértices</dt><dd>{actual.analysis.vertexCount.toLocaleString('es-ES')}</dd></div><div><dt>Caras</dt><dd>{actual.analysis.faceCount.toLocaleString('es-ES')}</dd></div><div><dt>Malla cerrada</dt><dd>{actual.esCerrada ? 'Sí' : 'No'}</dd></div><div><dt>Manifold</dt><dd>{actual.esManifold ? 'Sí' : 'No'}</dd></div>
          <div><dt>Componentes</dt><dd>{actual.analysis.connectedComponents}</dd></div>
          <div><dt>Agujeros</dt><dd>{actual.analysis.holeCount}</dd></div>
          <div><dt>Aristas de borde</dt><dd>{actual.analysis.boundaryEdges}</dd></div>
          <div><dt>Normales invertidas</dt><dd>{actual.analysis.flippedNormalCount}</dd></div>
          <div><dt>Triángulos degenerados</dt><dd>{actual.analysis.degenerateTriangleCount}</dd></div>
          <div><dt>Caras duplicadas</dt><dd>{actual.analysis.duplicateFaceCount}</dd></div>
        </dl>
      </div>
    </>}
    {revision.fase === 'error' && !revision.analisis && <p>Prueba a seleccionar el archivo de nuevo o elige otro STL.</p>}
      {revision.resumen && <div className="malla-resumen" aria-label="Cambios de la reparación" role="group">
        <span className="malla-eyebrow">ANTES → DESPUÉS</span>
        <h3>Qué cambió en la copia</h3>
        <dl>
          <div><dt>Vértices</dt><dd>{revision.resumen.reparacion.verticesBefore} → {revision.resumen.analisis.analysis.vertexCount}</dd></div>
          <div><dt>Caras</dt><dd>{revision.resumen.reparacion.facesBefore} → {revision.resumen.analisis.analysis.faceCount}</dd></div>
          <div><dt>Aberturas rellenadas</dt><dd>{revision.resumen.reparacion.fillHoles.holesFilled + (revision.resumen.rellenoForzado?.holesFilled ?? 0)}</dd></div>
          <div><dt>Normales corregidas (caras)</dt><dd>{revision.resumen.reparacion.fixNormals.facesFlipped}</dd></div>
          <div><dt>Caras eliminadas al soldar</dt><dd>{revision.resumen.reparacion.weld.facesRemoved}</dd></div>
          <div><dt>Caras degeneradas eliminadas</dt><dd>{revision.resumen.reparacion.removeDegenerates.degenerateRemoved}</dd></div>
          <div><dt>Caras duplicadas eliminadas</dt><dd>{revision.resumen.reparacion.removeDegenerates.duplicateRemoved}</dd></div>
          <div><dt>Triángulos aislados eliminados</dt><dd>{revision.resumen.reparacion.fillHoles.flapsRemoved}</dd></div>
          {revision.resumen.rellenoForzado && <div><dt>Triángulos aislados eliminados en relleno adicional</dt><dd>{revision.resumen.rellenoForzado.flapsRemoved}</dd></div>}
          <div><dt>Caras omitidas al soldar</dt><dd>{revision.resumen.reparacion.weld.skippedFaces}</dd></div>
          <div><dt>Caras omitidas al separar vértices</dt><dd>{revision.resumen.reparacion.splitVertices.skippedFaces}</dd></div>
          <div><dt>Caras omitidas al orientar normales</dt><dd>{revision.resumen.reparacion.fixNormals.skippedFaces}</dd></div>
        </dl>
        <p className="malla-limite">Las caras omitidas se cuentan por operación; una misma cara puede aparecer en más de un recuento. El motor puede omitir caras por problemas de conectividad.</p>
      </div>}
      {revision.resumen && revision.analisis && <div className="malla-resumen">
        <span className="malla-eyebrow">ANTES DE REPARAR</span>
        <h3>Diagnóstico inicial</h3>
        <p>{revision.analisis.incidencias.length ? `${revision.analisis.incidencias.length} tipos de incidencia` : 'Sin incidencias detectadas.'}</p>
        <dl><div><dt>Vértices</dt><dd>{revision.analisis.analysis.vertexCount.toLocaleString('es-ES')}</dd></div><div><dt>Caras</dt><dd>{revision.analisis.analysis.faceCount.toLocaleString('es-ES')}</dd></div><div><dt>Malla cerrada</dt><dd>{revision.analisis.esCerrada ? 'Sí' : 'No'}</dd></div></dl>
        {revision.analisis.incidencias.length > 0 && <ul>{revision.analisis.incidencias.map((i, index) => <li key={`${i.type}-${index}`}><span>{nombres[i.type] ?? i.type}</span><strong>{i.count}</strong></li>)}</ul>}
      </div>}
    {(posibles > 0 || omitidas > 0) && <div className="malla-aberturas">
      <h3>Aberturas que podrían ser parte del diseño</h3>
      <p>El motor usa una heurística, no puede saber si son intencionadas. {omitidas > 0 && `La reparación dejó ${omitidas} sin rellenar.`}</p>
      {revision.resumen && !revision.resumen.rellenoForzado && <ConfirmarRelleno ocupado={ocupado} rellenar={revision.rellenarAberturas} />}
    </div>}
    <p className="malla-limite">Esta revisión no garantiza que la pieza sea imprimible. Comprueba la copia antes de usarla.</p>
  </section>;
}

function Perdidas({ titulo, analisis }: { titulo: string; analisis: AnalisisMalla }) {
  if (!analisis.carasNoFinitasEliminadas && !analisis.carasPerdidasAuditoria && !analisis.analysis.skippedFaces && !analisis.colorsDropped) return null;
  return <p className="malla-aviso"><strong>{titulo}:</strong> se descartaron {analisis.carasNoFinitasEliminadas} caras no finitas, {analisis.carasPerdidasAuditoria} caras en auditoría{analisis.colorsDropped ? ' y colores' : ''}. El análisis informó de {analisis.analysis.skippedFaces} caras omitidas; este recuento puede solaparse con otros.</p>;
}

function ConfirmarRelleno({ ocupado, rellenar }: { ocupado: boolean; rellenar: () => void }) {
  const [confirmado, setConfirmado] = useState(false);
  return <>
    <p>Rellenarlas puede cambiar o cerrar detalles de la pieza. Esta acción vuelve a trabajar desde el original.</p>
    <label><input type="checkbox" checked={confirmado} onChange={e => setConfirmado(e.target.checked)} /> Entiendo que se pueden cerrar detalles de la pieza.</label>
    <button className="malla-secundario" type="button" disabled={!confirmado || ocupado} onClick={() => { setConfirmado(false); rellenar(); }}>Rellenar posibles aberturas</button>
  </>;
}
