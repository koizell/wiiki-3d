import { useState } from 'react';
import type { ProjectMetadata } from '../services/types';
import { MAQUINAS, maquinaPorSlug } from '../content/maquinas/catalogo';
import { preflight } from '../lib/preflight';

/**
 * Comprobaciones previas (pre-flight) para un archivo.
 *
 * Encapsula el selector de máquina y la lista de avisos, para que se pueda
 * pintar tanto en la ruta con archivo como en la restaurada del historial sin
 * duplicar el bloque.
 *
 * La máquina se persiste en `localStorage` para no pedirla cada vez: es una
 * preferencia del navegador, no un dato del análisis.
 */
export default function Preflight({ metadata }: { metadata: ProjectMetadata }) {
  const [maquinaSlug, setMaquinaSlug] = useState<string>(() => {
    try { return localStorage.getItem('wiiki-maquina') ?? ''; } catch { return ''; }
  });
  const maquina = maquinaSlug ? maquinaPorSlug(maquinaSlug) : null;
  const avisos = preflight(metadata, maquina);

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
          onChange={(e) => {
            setMaquinaSlug(e.target.value);
            try { localStorage.setItem('wiiki-maquina', e.target.value); } catch { /* localStorage puede no estar disponible (modo privado). */ }
          }}
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
