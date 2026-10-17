import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAnalysisActions } from '../state/useAnalysis';
import { useAlmacenamiento, useHistorial } from '../state/useHistorial';
import { borrarAnalisis, vaciarHistorial } from '../lib/storage';
import { Confirmacion } from '../components/Dialogos';
import { formatarFecha, riesgoClase } from '../lib/formato';

/**
 * El historial completo: todas las entradas guardadas, con borrar una y vaciar
 * todas.
 *
 * **Es la vista completa del mismo almacén**, no un módulo aparte: `/` enseña los
 * cinco últimos y esto enseña todo. `/proyectos` es la otra cara: lo que has
 * guardado con nombre propio, sobre la misma base.
 *
 * El borrado pide confirmación, y la del vaciado **dice cuántos se van**. Sin el
 * número, «¿vaciar el historial?» es una pregunta que se acepta sin leer, y
 * vaciar es la única operación de la app que no se puede deshacer.
 */
function HistorialRoute() {
  const navigate = useNavigate();
  const disponible = useAlmacenamiento();
  const { restaurarAnalisis } = useAnalysisActions();
  const { entradas, recargar } = useHistorial(disponible === true);
  const [porBorrar, setPorBorrar] = useState<string | null>(null);
  const [vaciando, setVaciando] = useState(false);

  const borrar = async (id: string) => {
    await borrarAnalisis(id);
    setPorBorrar(null);
    recargar();
  };

  const vaciar = async () => {
    await vaciarHistorial();
    setVaciando(false);
    recargar();
  };

  return (
    <div className="historial">
      <h1 className="historial-titulo">Historial</h1>

      {disponible === false && (
        <p className="historial-aviso" role="status">
          El historial no está disponible en este navegador. El análisis sigue
          funcionando: es sólo esta lista la que no se guarda.
        </p>
      )}

      {/*
        El estado vacío es `null`, no `[]`. Con `[]` no se sabe si el almacén
        está vacío o si todavía no ha respondido, y durante esos milisegundos
        aparecería un «no hay nada» que puede no ser cierto.
      */}
      {disponible === true && entradas === null && (
        <p className="historial-aviso">Cargando el historial…</p>
      )}

      {disponible === true && entradas !== null && entradas.length === 0 && (
        <div className="historial-aviso historial-vacio">
          <p>
            Todavía no hay análisis guardados. Los que analices aparecerán aquí solos.
          </p>
          {/*
            Igual que en Proyectos: el aviso decía qué faltaba y no daba ninguna
            salida. Los dos botones son los caminos que la página ya tiene.
          */}
          <div className="historial-vacio-acciones">
            <Link className="btn-primary" to="/">
              Subir un archivo
            </Link>
            <Link className="btn-ghost" to="/wiki">
              Empezar por el síntoma
            </Link>
          </div>
        </div>
      )}

      {disponible === true && entradas !== null && entradas.length > 0 && (
        <>
          <ul className="historial-lista">
            {entradas.map((e) => (
              <li key={e.id} className="historial-fila">
                {/*
                  Dos controles en la fila, y por eso el nombre es un `<button>`
                  y no un `<div onClick>`: si toda la fila fuera pulsable, el
                  botón de borrar quedaría dentro del área activable y borraría
                  analyses al pulsarla donde se lee.
                */}
                <button
                  type="button"
                  className="historial-abrir"
                  onClick={() => {
                    restaurarAnalisis(e);
                    navigate('/');
                  }}
                >
                  <span className="historial-nombre">{e.filename}</span>
                  <span className="historial-meta">
                    {formatarFecha(e.fecha)} · {e.metadata.material} ·{' '}
                    <span
                      className={`historial-riesgo historial-riesgo--${riesgoClase(
                        e.classification.riskLevel
                      )}`}
                    >
                      {e.classification.riskLevel}
                    </span>
                  </span>
                </button>
                <button
                  type="button"
                  className="btn-danger"
                  onClick={() => setPorBorrar(e.id)}
                >
                  Borrar
                </button>
              </li>
            ))}
          </ul>

          {/*
            Las dos confirmaciones son el mismo componente con otro texto y otra
            acción. Escribir dos veces un diálogo con su gestión de foco es
            escribir dos veces el sitio donde se puede ir mal.
          */}
          {porBorrar && (
            <Confirmacion
              texto={`¿Borrar «${entradas.find((e) => e.id === porBorrar)?.filename ?? ''}» del historial?`}
              aceptar="Borrar"
              onAceptar={() => void borrar(porBorrar)}
              onCancelar={() => setPorBorrar(null)}
            />
          )}

          {vaciando && (
            <Confirmacion
              texto={`Se van a borrar ${entradas.length} análisis. No se puede deshacer.`}
              aceptar="Borrar todo"
              onAceptar={() => void vaciar()}
              onCancelar={() => setVaciando(false)}
            />
          )}

          {!porBorrar && !vaciando && (
            <button
              type="button"
              className="btn-danger historial-vaciar"
              onClick={() => setVaciando(true)}
            >
              Vaciar el historial
            </button>
          )}
        </>
      )}
    </div>
  );
}

export default HistorialRoute;
