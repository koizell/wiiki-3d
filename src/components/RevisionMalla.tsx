import { useState } from 'react';
import type { RevisionMalla as Estado } from '../state/useRevisionMalla';
import type { AnalisisMalla } from '../services/reparacionMalla';
import type { Maquina } from '../content/maquinas/tipos';
import { MAQUINAS } from '../content/maquinas/catalogo';
import { cabeEnLaMaquina, type Encaje } from '../lib/maquinas';
import { useMaquinaSeleccionada } from '../state/useMaquinaSeleccionada';
import { Link } from 'react-router-dom';
import './revision-malla.css';

const nombres: Record<string, string> = {
  non_manifold_vertices: 'Vértices no manifold', non_manifold_edges: 'Aristas no manifold',
  flipped_normals: 'Normales invertidas', degenerate_triangles: 'Triángulos degenerados',
  holes: 'Aberturas', duplicate_faces: 'Caras duplicadas', isolated_vertices: 'Vértices aislados',
  not_watertight: 'Malla no cerrada', multiple_components: 'Componentes separados',
};

/** Las tres dimensiones de una pieza, en milímetros: X ancho, Y fondo, Z alto. */
type Caja = [number, number, number];

/** Milímetros con separador de miles y sin decimales: el redondeo es sólo de presentación. */
function mm(valor: number): string {
  return Math.round(valor).toLocaleString('es-ES');
}

/** Ancho × fondo × alto, con el Z del archivo como alto (la convención de los laminadores). */
function textoDeCaja(caja: Caja): string {
  return `${mm(caja[0])} × ${mm(caja[1])} × ${mm(caja[2])} mm`;
}

/**
 * Las dimensiones que el motor ha medido, o `null` si no las hay.
 *
 * Sin dimensiones no hay medidas, ni volumen, ni veredicto: no se inventa una
 * caja a partir de nada. El análisis real siempre las trae; el guardián existe
 * para que un análisis incompleto no pinte «undefined».
 */
function cajaDe(analisis: AnalisisMalla | null | undefined): Caja | null {
  if (!analisis) return null;
  const { dimX, dimY, dimZ } = analisis.analysis;
  if (![dimX, dimY, dimZ].every((n) => Number.isFinite(n))) return null;
  return [dimX, dimY, dimZ];
}

/**
 * El aviso de escala: dos reglas en sentidos opuestos.
 *
 * - **Menor de 5 mm**: una pieza así no es imprimible, y la explicación más
 *   probable es que el archivo venga en pulgadas. Si es así, el tamaño real es
 *   **×25,4** el que se ve.
 * - **Mayor de 350 mm**: supera la cama de casi todas las impresoras de casa.
 *   Si el archivo está en pulgadas, el tamaño real es **÷25,4** el que se ve.
 *
 * Son hipótesis, no veredictos: el STL no declara unidades y esta web no puede
 * saberlo. Por eso el aviso ofrece la conversión y no bloquea.
 */
type AvisoEscala = { estado: 'pequena' | 'grande'; real: string };

function avisoDeEscala(caja: Caja): AvisoEscala | null {
  const mayor = Math.max(...caja);
  if (mayor < 5) return { estado: 'pequena', real: textoDeCaja([caja[0] * 25.4, caja[1] * 25.4, caja[2] * 25.4]) };
  if (mayor > 350) return { estado: 'grande', real: textoDeCaja([caja[0] / 25.4, caja[1] / 25.4, caja[2] / 25.4]) };
  return null;
}

function textoAvisoEscala(aviso: AvisoEscala, caja: Caja): string {
  return aviso.estado === 'pequena'
    ? `La pieza mide ${textoDeCaja(caja)}, un tamaño muy pequeño. Puede ser una pieza diminuta de verdad, o un archivo en pulgadas: en ese caso el tamaño real sería ×25,4 (${aviso.real}), no lo que se ve. Esta web no puede saberlo.`
    : `La pieza mide ${textoDeCaja(caja)}, más grande que la cama de casi cualquier impresora. Si el archivo está en pulgadas, el tamaño real sería ÷25,4 (${aviso.real}), no lo que se ve. Esta web no puede saberlo.`;
}

/** Texto corto de cada veredicto, para la línea de cambio. */
const TEXTO_ENCAJE: Record<Encaje, string> = {
  cabe: 'cabe',
  'cabe-girada': 'cabe girada',
  'no-cabe': 'no cabe',
  indeterminado: 'no se puede determinar',
};

const DESCRIPCION_ORIENTACION: Record<string, string> = { yxz: 'en planta', xzy: 'de canto' };

/**
 * La frase del veredicto de encaje.
 *
 * `indeterminado` tiene dos lecturas: sin máquina elegida, se pide elegirla;
 * con máquina pero sin volumen útil fichado, se dice que no se puede
 * determinar. La ausencia de un dato no es un cero.
 */
function textoDeEncaje(estado: Encaje, orientacion: string | undefined, maquina: Maquina | null, caja: Caja): string {
  const nombre = maquina ? `tu ${maquina.marca} ${maquina.modelo}` : 'tu impresora';
  const cama = maquina?.vol;
  const camaTexto = cama ? ` (${cama.map(mm).join(' × ')} mm)` : '';
  if (estado === 'cabe') return `Cabe en la cama de ${nombre}${camaTexto}.`;
  if (estado === 'cabe-girada') {
    const giro = orientacion ? DESCRIPCION_ORIENTACION[orientacion] ?? `en orientación ${orientacion}` : 'en una orientación distinta';
    return `Cabe girada 90° ${giro} en la cama de ${nombre}${camaTexto}.`;
  }
  if (estado === 'no-cabe') {
    return `No cabe: mide ${textoDeCaja(caja)} y la cama de ${nombre} es ${cama ? `${cama.map(mm).join(' × ')} mm` : 'desconocida'}.`;
  }
  return maquina
    ? `No se puede determinar si cabe: ${nombre} no tiene el volumen útil fichado.`
    : 'Elige tu impresora para saber si cabe.';
}

/** La línea que dice que el veredicto cambió al reparar. */
function textoDeCambio(antes: Encaje, despues: Encaje): string {
  if (antes === 'no-cabe' && despues !== 'no-cabe') return 'Tras reparar, la copia sí cabe; antes no.';
  if (antes !== 'no-cabe' && despues === 'no-cabe') return 'Tras reparar, la copia ya no cabe; antes sí.';
  return `El veredicto cambió al reparar: antes ${TEXTO_ENCAJE[antes]}, ahora ${TEXTO_ENCAJE[despues]}.`;
}

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
  const { slug: maquinaSlug, maquina, setSlug } = useMaquinaSeleccionada();
  const actual = revision.resumen?.analisis ?? revision.analisis;
  const problemas = !!actual && (actual.incidencias.length > 0 || !actual.esCerrada || !actual.esManifold);
  const posibles = (revision.analisis?.aberturas.filter(a => a.looksDeliberate).length ?? 0);
  const omitidas = revision.resumen?.reparacion.fillHoles.holesSkippedAsFeature ?? 0;
  const ocupado = revision.fase === 'analizando' || revision.fase === 'reparando';
  // Lo que se imprime es la copia reparada si existe; si no, el diagnóstico inicial.
  const caja = cajaDe(actual);
  const aviso = caja ? avisoDeEscala(caja) : null;
  const encaje = caja && maquina ? cabeEnLaMaquina(caja, maquina) : null;
  const encajeTexto = !aviso && encaje && caja && maquina ? textoDeEncaje(encaje.estado, encaje.orientacion, maquina, caja) : null;
  // ¿Cambió el veredicto al reparar? Se compara el inicial con la copia, y sólo
  // se dice cuando no hay aviso de escala: con las unidades sin resolver, no
  // hay veredicto que comparar.
  const cajaInicial = cajaDe(revision.analisis);
  const cajaCopia = cajaDe(revision.resumen?.analisis);
  const encajeInicial = cajaInicial && maquina ? cabeEnLaMaquina(cajaInicial, maquina) : null;
  const encajeCopia = cajaCopia && maquina ? cabeEnLaMaquina(cajaCopia, maquina) : null;
  const cambio = !aviso && encajeInicial && encajeCopia && encajeInicial.estado !== encajeCopia.estado
    ? textoDeCambio(encajeInicial.estado, encajeCopia.estado)
    : null;
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
        <dl>{caja && <div><dt>Medidas</dt><dd>{textoDeCaja(caja)}</dd></div>}{caja && actual.analysis.isWatertight && <div><dt>Volumen de la malla</dt><dd>{mm(Math.abs(actual.analysis.volume))} mm³</dd></div>}<div><dt>Vértices</dt><dd>{actual.analysis.vertexCount.toLocaleString('es-ES')}</dd></div><div><dt>Caras</dt><dd>{actual.analysis.faceCount.toLocaleString('es-ES')}</dd></div><div><dt>Malla cerrada</dt><dd>{actual.esCerrada ? 'Sí' : 'No'}</dd></div><div><dt>Manifold</dt><dd>{actual.esManifold ? 'Sí' : 'No'}</dd></div>
          <div><dt>Componentes</dt><dd>{actual.analysis.connectedComponents}</dd></div>
          <div><dt>Agujeros</dt><dd>{actual.analysis.holeCount}</dd></div>
          <div><dt>Aristas de borde</dt><dd>{actual.analysis.boundaryEdges}</dd></div>
          <div><dt>Normales invertidas</dt><dd>{actual.analysis.flippedNormalCount}</dd></div>
          <div><dt>Triángulos degenerados</dt><dd>{actual.analysis.degenerateTriangleCount}</dd></div>
          <div><dt>Caras duplicadas</dt><dd>{actual.analysis.duplicateFaceCount}</dd></div>
        </dl>
        <p className="malla-nota-unidades">El STL no declara unidades: se asumen milímetros. Las medidas son ancho × fondo × alto, y el alto es el Z del archivo, como en los laminadores.</p>
        {aviso && caja && <p className="malla-aviso malla-escala" role="status">{textoAvisoEscala(aviso, caja)}</p>}
      </div>
      <div className="malla-impresora">
        <span className="malla-eyebrow">EN MI IMPRESORA</span>
        <h3>¿Cabe en tu impresora?</h3>
        <label className="malla-impresora-etiqueta" htmlFor="revision-maquina">Tu máquina (opcional)</label>
        <select id="revision-maquina" className="malla-impresora-select" value={maquinaSlug} onChange={(e) => setSlug(e.target.value)}>
          <option value="">Sin seleccionar</option>
          {MAQUINAS.map((m) => <option key={m.slug} value={m.slug}>{m.marca} {m.modelo}</option>)}
        </select>
        {aviso
          ? <p className="malla-ayuda" role="status">No se puede saber si la pieza cabe hasta que se resuelvan las unidades del archivo.</p>
          : !maquina
            ? <p className="malla-ayuda">Elige tu impresora para saber si la pieza cabe en su cama.</p>
            : encajeTexto && <p className="malla-encaje" role="status">{encajeTexto}</p>}
        {cambio && <p className="malla-cambio">{cambio}</p>}
        <p className="malla-nota">El veredicto compara cajas envolventes: la pieza puede entrar en la cama aunque su caja no quepa, por ejemplo en diagonal.</p>
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
