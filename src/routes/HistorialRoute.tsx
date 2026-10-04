import { useEffect, useRef, useState } from 'react';
import { useAnalysisActions } from '../state/useAnalysis';
import { useAlmacenamiento, useHistorial } from '../state/useHistorial';
import { borrarAnalisis, vaciarHistorial } from '../lib/storage';

/**
 * El historial completo: todas las entradas guardadas, con borrar una y vaciar
 * todas.
 *
 * **Es la tercera vista del mismo almacén**, no un módulo aparte: `/` enseña los
 * cinco últimos y esto enseña todo. `/proyectos` sigue siendo un placeholder
 * porque hoy no habría nada que lo distinguiera de esta lista.
 *
 * El borrado pide confirmación, y la del vaciado **dice cuántos se van**. Sin el
 * número, «¿vaciar el historial?» es una pregunta que se acepta sin leer, y
 * vaciar es la única operación de la app que no se puede deshacer.
 */
function HistorialRoute() {
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
        <p className="historial-aviso">
          Todavía no hay análisis guardados. Los que analices aparecerán aquí solos.
        </p>
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
                  onClick={() => restaurarAnalisis(e)}
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

/**
 * Una confirmación modal, con el foco dentro y `Escape` para salir.
 *
 * Va en el propio fichero y no en un componente compartido porque es el único
 * sitio de la app que necesita uno, y un componente para un solo uso que además
 * hay que mantener es peor que unas líneas aquí.
 */
function Confirmacion({
  texto,
  aceptar,
  onAceptar,
  onCancelar,
}: {
  texto: string;
  aceptar: string;
  onAceptar: () => void;
  onCancelar: () => void;
}) {
  const ref = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    ref.current?.focus();
    const alPulsar = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onCancelar();
    };
    window.addEventListener('keydown', alPulsar);
    return () => window.removeEventListener('keydown', alPulsar);
  }, [onCancelar]);

  // `alertdialog` y no `dialog`: con `alertdialog` el lector de pantalla anuncia
  // que el resto está bloqueado, y quien navega con teclado sabe que hay que
  // decidir antes de seguir.
  return (
    <div className="confirmacion-capa" role="presentation">
      <div className="confirmacion" role="alertdialog" aria-modal="true" aria-label={texto}>
        <p className="confirmacion-texto">{texto}</p>
        <div className="confirmacion-botones">
          <button type="button" className="btn-ghost" onClick={onCancelar}>
            Cancelar
          </button>
          <button ref={ref} type="button" className="btn-danger" onClick={onAceptar}>
            {aceptar}
          </button>
        </div>
      </div>
    </div>
  );
}

/** La fecha en corto y en español, sin librerías de formato. */
function formatarFecha(ms: number): string {
  return new Date(ms).toLocaleDateString('es-ES', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
}

/**
 * Una clase por nivel de riesgo, para que el color venga del CSS y no de aquí.
 *
 * El `riskLevel` es un texto en castellano que viene del clasificador, y usarlo
 * directamente como clase ataría el color al valor. Con esta tabla, un nivel
 * nuevo sale sin color en vez de salir con el color del nivel equivocado.
 */
function riesgoClase(riskLevel: string): string {
  switch (riskLevel) {
    case 'Bajo':
      return 'bajo';
    case 'Moderado':
      return 'moderado';
    case 'Alto':
      return 'alto';
    case 'Crítico':
      return 'critico';
    default:
      return 'desconocido';
  }
}

export default HistorialRoute;
