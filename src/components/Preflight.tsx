import type { ProjectMetadata } from '../services/types';
import type { Trayectoria } from '../services/GcodeTrayectoria';
import { MAQUINAS } from '../content/maquinas/catalogo';
import { preflight } from '../lib/preflight';
import { useMaquinaSeleccionada } from '../state/useMaquinaSeleccionada';

/**
 * Comprobaciones previas (pre-flight) para un archivo.
 *
 * Encapsula el selector de máquina y la lista de avisos, para que se pueda
 * pintar tanto en la ruta con archivo como en la restaurada del historial sin
 * duplicar el bloque.
 *
 * La máquina no vive aquí: la trae `useMaquinaSeleccionada`, que la guarda en
 * `localStorage` y la comparte con los demás flujos de la página (el informe
 * del STL). Es una preferencia del navegador, no un dato del análisis.
 */
export default function Preflight({ metadata, trayectoria }: { metadata: ProjectMetadata; trayectoria?: Trayectoria | null }) {
  const { slug: maquinaSlug, maquina, setSlug } = useMaquinaSeleccionada();
  const avisos = preflight(metadata, trayectoria ?? null, maquina);

  return (
    <div className="preflight">
      <div className="preflight-maquina">
        <label className="preflight-etiqueta" htmlFor="preflight-maquina">
          Tu máquina (opcional)
        </label>
        <select
          id="preflight-maquina"
          className="preflight-select"
          value={maquinaSlug}
          onChange={(e) => setSlug(e.target.value)}
        >
          <option value="">Sin seleccionar</option>
          {MAQUINAS.map((m) => (
            <option key={m.slug} value={m.slug}>
              {m.marca} {m.modelo}
            </option>
          ))}
        </select>
        <p className="preflight-ayuda">
          Sin máquina se comprueban sólo los datos del archivo. Con máquina se
          cruzan con sus límites (boquilla, cama, cerramiento).
        </p>
      </div>

      {avisos.length === 0 ? (
        <p className="preflight-ok">
          Sin avisos: los datos del archivo están dentro de los límites
          {maquina ? ` de tu ${maquina.marca} ${maquina.modelo}` : ''}. Eso no
          garantiza el resultado: la geometría y la calibración deciden el resto.
        </p>
      ) : (
        <ul className="preflight-lista">
          {avisos.map((a) => (
            <li key={a.id} className={`preflight-aviso preflight-aviso--${a.nivel}`}>
              <span className="preflight-nivel">{a.nivel}</span>
              <span className="preflight-texto">{a.texto}</span>
              {a.guia && (
                <a className="preflight-enlace" href={`/wiki/${a.guia}`}>
                  Ver la guía →
                </a>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
