import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAnalysisActions } from '../state/useAnalysis';
import { useAlmacenamiento, useHistorial } from '../state/useHistorial';
import { borrarAnalisis, nombrarAnalisis, type EntradaHistorial } from '../lib/storage';
import { Confirmacion, DialogoNombre } from '../components/Dialogos';
import { formatarFecha, formatoBytes, riesgoClase } from '../lib/formato';

/**
 * Proyectos: los análisis guardados con nombre propio.
 *
 * ## Qué es un proyecto y qué no
 *
 * El historial es **automático**: todo lo que analizas acaba ahí solo, sin
 * preguntar. Un proyecto es lo contrario: lo que alguien ha decidido conservar y
 * ha nombrado. Los dos viven en el mismo almacén de IndexedDB —un proyecto es una
 * entrada del historial con `nombre`—, y por eso esta página no necesita ninguna
 * base de datos nueva: lee la misma lista y separa las que tienen nombre.
 *
 * Eso resuelve el motivo por el que `/proyectos` fue un placeholder durante tanto
 * tiempo. El comentario de `lib/storage.ts` decía que no había nada que lo
 * distinguiera del historial; lo que lo distingue es **el nombre**. Sin él, esta
 * página sería una segunda vista de la misma lista; con él, es una biblioteca
 * curada.
 *
 * ## Los dos bloques
 *
 * «Tus proyectos» son las entradas con nombre. «Sin guardar» son las que todavía
 * no lo tienen, y están aquí para poder nombrarlas: es el único sitio donde un
 * análisis se convierte en proyecto. Se muestran todas y no una muestra, porque
 * una muestra dejaría análisis imposibles de nombrar sin pasar por el historial,
 * que tampoco tiene esta acción.
 *
 * El uso de espacio (H-4.1) es una estimación declarada como tal: `Blob` da los
 * bytes UTF-8 de lo que se guarda, no la cuota del navegador. Sirve para
 * responder «¿cuánto ocupa esto?», no para prometer un número exacto.
 */
export default function ProyectosRoute() {
  const disponible = useAlmacenamiento();
  const { restaurarAnalisis } = useAnalysisActions();
  const { entradas, recargar } = useHistorial(disponible === true);

  const [renombrando, setRenombrando] = useState<EntradaHistorial | null>(null);
  const [porBorrar, setPorBorrar] = useState<EntradaHistorial | null>(null);

  const lista = entradas ?? [];
  const proyectos = lista.filter((e) => e.nombre);
  const sinNombre = lista.filter((e) => !e.nombre);
  const bytes = lista.reduce((n, e) => n + new Blob([JSON.stringify(e)]).size, 0);

  const guardarNombre = async (nombre: string) => {
    if (!renombrando) return;
    await nombrarAnalisis(renombrando.id, nombre);
    setRenombrando(null);
    recargar();
  };

  const borrar = async (id: string) => {
    await borrarAnalisis(id);
    setPorBorrar(null);
    recargar();
  };

  return (
    <div className="proyectos">
      <h1 className="proyectos-titulo">Proyectos</h1>
      <p className="proyectos-intro">
        Un proyecto es un análisis guardado con nombre propio. El historial recoge
        todo lo que analizas; aquí conservas lo que te importa y le pones un nombre
        para volver a ello sin subir el archivo otra vez.
      </p>

      {disponible === false && (
        <p className="historial-aviso" role="status">
          El almacenamiento no está disponible en este navegador, así que no se
          pueden guardar proyectos. El análisis sigue funcionando.
        </p>
      )}

      {disponible === true && entradas === null && (
        <p className="historial-aviso">Cargando…</p>
      )}

      {disponible === true && entradas !== null && lista.length === 0 && (
        <p className="historial-aviso">
          Todavía no hay nada. Analiza un G-code y aparecerá aquí para ponerle
          nombre.
        </p>
      )}

      {proyectos.length > 0 && (
        <section className="proyectos-bloque">
          <h2 className="proyectos-subtitulo">
            Tus proyectos <span className="proyectos-cuenta">{proyectos.length}</span>
          </h2>
          <ul className="historial-lista">
            {proyectos.map((e) => (
              <li key={e.id} className="historial-fila">
                <button
                  type="button"
                  className="historial-abrir"
                  onClick={() => restaurarAnalisis(e)}
                >
                  <span className="historial-nombre">{e.nombre}</span>
                  <span className="historial-meta">
                    {e.filename} · {e.metadata.material} ·{' '}
                    <span
                      className={`historial-riesgo historial-riesgo--${riesgoClase(
                        e.classification.riskLevel
                      )}`}
                    >
                      {e.classification.riskLevel}
                    </span>
                  </span>
                </button>
                <div className="proyectos-acciones">
                  <button
                    type="button"
                    className="btn-ghost"
                    onClick={() => setRenombrando(e)}
                  >
                    Renombrar
                  </button>
                  <button
                    type="button"
                    className="btn-danger"
                    onClick={() => setPorBorrar(e)}
                  >
                    Borrar
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </section>
      )}

      {sinNombre.length > 0 && (
        <section className="proyectos-bloque">
          <h2 className="proyectos-subtitulo">
            Sin guardar <span className="proyectos-cuenta">{sinNombre.length}</span>
          </h2>
          <p className="proyectos-nota">
            Estos análisis están en tu historial pero todavía no son proyectos.
            Ponles un nombre para conservarlos aquí.
          </p>
          <ul className="historial-lista">
            {sinNombre.map((e) => (
              <li key={e.id} className="historial-fila">
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
                <div className="proyectos-acciones">
                  <button
                    type="button"
                    className="btn-primary"
                    onClick={() => setRenombrando(e)}
                  >
                    Guardar como proyecto
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <Link className="recientes-enlace" to="/historial">
            Ver todos los análisis
          </Link>
        </section>
      )}

      {lista.length > 0 && (
        <p className="proyectos-uso" role="status">
          {lista.length} {lista.length === 1 ? 'análisis' : 'análisis'} en este
          navegador · {formatoBytes(bytes)} en total
        </p>
      )}

      {renombrando && (
        <DialogoNombre
          inicial={renombrando.nombre ?? ''}
          onGuardar={(nombre) => void guardarNombre(nombre)}
          onCancelar={() => setRenombrando(null)}
        />
      )}

      {porBorrar && (
        <Confirmacion
          texto={`¿Borrar «${porBorrar.nombre ?? porBorrar.filename}»? No se puede deshacer.`}
          aceptar="Borrar"
          onAceptar={() => void borrar(porBorrar.id)}
          onCancelar={() => setPorBorrar(null)}
        />
      )}
    </div>
  );
}
