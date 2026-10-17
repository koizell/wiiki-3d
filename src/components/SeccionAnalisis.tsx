import { Link } from 'react-router-dom';
import AnalysisPanel from './AnalysisPanel';
import { useAnalysis } from '../state/useAnalysis';
import { articuloParaCampo } from '../lib/wiki-campos';
import { MODO_CLASIFICACION } from '../services/JevService';

/** El resultado pertenece al área de trabajo; el G-code no necesita un visor vacío. */
export default function SeccionAnalisis() {
  const { status, metadata, classification, error, fileType } = useAnalysis();
  return (
    <section className="analisis-principal" aria-labelledby="resultado-titulo">
      <div className="panel-header">
        <h2 id="resultado-titulo">Resultado del análisis</h2>
        <Link to="/privacidad" className={`badge badge-modo badge-modo-${MODO_CLASIFICACION}`}
          title={MODO_CLASIFICACION === 'real' ? 'Clasificación por el servicio Jev' : 'Estimación de demostración: heurística local, no se envía nada'}>
          {MODO_CLASIFICACION === 'real' ? 'Jev' : 'Demo'}
        </Link>
      </div>
      <AnalysisPanel status={status} metadata={metadata} classification={classification}
        modoClasificacion={MODO_CLASIFICACION}
        error={error} fileType={fileType ?? undefined} explicar={articuloParaCampo} />
      {metadata && status === 'done' && (
        <p className="analisis-siguiente"><Link className="boton boton--ruta" to="/taller">Calcular el coste de filamento →</Link></p>
      )}
    </section>
  );
}
