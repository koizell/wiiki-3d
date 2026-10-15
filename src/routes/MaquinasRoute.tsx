import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import MaquinaSVG from '../components/MaquinaSVG';
import { FILAMENTOS, MAQUINAS, filamentoPorId } from '../content/maquinas/catalogo';
import { CAMPOS_FICHA, TEXTO_ORIGEN } from '../content/maquinas/tipos';
import type { Familia, Maquina } from '../content/maquinas/tipos';
import { estadoFilamento, rizaria } from '../lib/maquinas';

/**
 * El catálogo de impresoras: qué es cada modelo y cómo se comporta con un
 * filamento.
 *
 * ## La regla de honestidad que gobierna toda la página
 *
 * Cada cifra de la ficha lleva su origen, y hay tres: `F` (fabricante), `T`
 * (terceros) y `P` (**pendiente de fichar**). Una `P` se muestra *como
 * pendiente*, nunca se rellena «de mientras». Es la diferencia entre un
 * catálogo y una lista de cifras plausibles. Los campos que no aplican a una
 * máquina —la resina no tiene boquilla— se marcan como «no aplica`, que no es
 * lo mismo que «pendiente».
 *
 * ## Por qué no hay un flag de «modo estático»
 *
 * El selector de filamento es estado del componente. En la exportación estática
 * se renderiza sin filamento elegido y sin interacción, igual que
 * las guías exportan su etapa 4 como recetario: **la misma pieza, un estado
 * inicial fijo**. No hace falta una bandera que distinga «estoy exportando».
 */

/** El valor de un campo de ficha, en texto. `null` = la máquina no lo declara. */
function valorCampo(maquina: Maquina, campo: (typeof CAMPOS_FICHA)[number]): string | null {
  const v = maquina[campo];
  if (v === null || v === undefined) return null;
  switch (campo) {
    case 'vol':
    case 'dims': {
      const [x, y, z] = v as [number, number, number];
      return `${x}×${y}×${z} ${campo === 'vol' ? 'mm' : 'cm'}`;
    }
    case 'velMax':
      return `${v} mm/s`;
    case 'tNozMax':
    case 'tCamaMax':
      return `${v} °C`;   // la etiqueta de la fila ya dice de qué es
    case 'sensorFilamento':
      return v ? 'Sí' : 'No';
    default:
      return campo === 'familia' ? TEXTO_FAMILIA[v as Familia] : String(v);
  }
}

/** La cinemática en palabras de usuario, no el identificador del tipo. */
const TEXTO_FAMILIA: Record<Familia, string> = {
  'bed-slinger': 'Cama móvil',
  'corexy-cerrada': 'CoreXY cerrada',
  'corexy-abierta': 'CoreXY abierta',
  resina: 'Resina',
};

/** La etiqueta de un campo en la ficha. `Partial` porque `CAMPOS_FICHA` sólo lista los campos de ficha, no todas las claves de la máquina. */
const ETIQUETA: Partial<Record<keyof Maquina, string>> = {
  familia: 'Cinemática',
  vol: 'Volumen útil',
  dims: 'Tamaño',
  velMax: 'Velocidad máx.',
  tNozMax: 'Boquilla',
  tCamaMax: 'Cama',
  extrusor: 'Extrusor',
  nivelacion: 'Nivelación',
  sensorFilamento: 'Sensor de filamento',
};

/**
 * Los campos cuyo origen se declara y se muestra. `familia` y `sensorFilamento`
 * no tienen origen: uno es la cinemática (intrínseca al modelo) y el otro un sí/no
 * que declara la ficha. Ponerles una etiqueta de origen sería fingir que alguien
 * los «fichó» con una fuente, que es justo lo que esta página evita.
 */
const CON_ORIGEN = new Set<string>(['dims', 'vol', 'velMax', 'tNozMax', 'tCamaMax', 'extrusor', 'nivelacion']);

/** El veredicto de compatibilidad, en una línea concreta. */
function Veredicto({ maquina, filamento }: { maquina: Maquina; filamento: ReturnType<typeof filamentoPorId> }) {
  const r = estadoFilamento(maquina, filamento);
  const revisarCamara = maquina.familia !== 'resina' && rizaria(maquina, filamento);
  const clase = !filamento || r.estado === 'resina' || r.estado === 'camara-desconocida' ? 'info' : r.estado === 'ok' ? 'ok' : 'aviso';
  const texto = r.estado === 'resina'
    ? 'Utiliza resina líquida, no filamento.'
    : !filamento
      ? 'Selecciona un filamento para comparar los datos de la ficha.'
      : r.estado === 'camara-desconocida'
        ? `${filamento.familia} pide cámara cerrada y el cerramiento de esta máquina no está verificado. No se puede determinar con lo que hay.`
        : r.estado === 'limite-boquilla'
          ? `Rango indicado para ${filamento.nombre}: ${filamento.noz[0]}–${filamento.noz[1]} °C. Máximo de boquilla de esta ficha: ${maquina.tNozMax} °C. Revisa el perfil recomendado.`
          : revisarCamara
            ? 'Revisa las condiciones de cámara que recomienda el perfil de este material.'
            : `Sin avisos en esta comparación para ${filamento.nombre}. No confirma compatibilidad completa.`;
  return (
    <p className={`maquina-veredicto maquina-veredicto--${clase}`}>
      {texto}
      {revisarCamara && (
        <>
          {' '}
          <Link to="/wiki/enclosure-y-warping">Consultar cámara y warping →</Link>
        </>
      )}
    </p>
  );
}

export default function MaquinasRoute() {
  const [filId, setFilId] = useState('');
  const [pausadas, setPausadas] = useState(false);
  const filamento = useMemo(() => filamentoPorId(filId), [filId]);

  // El resumen anuncia los cambios sin tener que recorrer todas las fichas.
  const resumen = useMemo(() => {
    if (!filamento) return `Sin comparar filamento: ${MAQUINAS.length} fichas con su ilustración.`;
    const estados = MAQUINAS.map((m) => estadoFilamento(m, filamento).estado);
    const bien = estados.filter((e) => e === 'ok').length;
    const mal = estados.filter((e) => e === 'limite-boquilla' || e === 'necesita-camara').length;
    const dudoso = estados.filter((e) => e === 'camara-desconocida').length;
    const resina = estados.filter((e) => e === 'resina').length;
    return [
      `${filamento.nombre}: ${bien} fichas sin avisos`,
      mal > 0 ? `${mal} por revisar` : null,
      dudoso > 0 ? `${dudoso} sin cerramiento verificado` : null,
      resina > 0 ? `${resina} de resina (no aplica)` : null,
    ].filter(Boolean).join(' · ') + '.';
  }, [filamento]);

  return (
    <div className={`maquinas${pausadas ? ' maquinas--pausadas' : ''}`}>
      <header className="maquinas-cabecera">
        <p className="maquinas-migas">
          <Link to="/wiki">Wiki 3D</Link> · Catálogo
        </p>
        <h1>Catálogo de impresoras 3D</h1>
        <p>
          Modelos de impresoras con ilustración y ficha técnica. Cada cifra
          lleva de dónde sale —<strong>fabricante</strong>, <strong>terceros</strong>{' '}
          o <strong>pendiente de fichar</strong>—, y lo que nadie ha verificado se
          muestra como pendiente, no se rellena. Elige un filamento para comparar
          los datos disponibles. Las ilustraciones son esquemas por familia,
          no reproducciones exactas de cada modelo ni simulaciones del resultado.
        </p>
      </header>

      <div className="maquinas-filamento">
        <label htmlFor="maquinas-fil">Filamento de prueba</label>
        <select
          id="maquinas-fil"
          value={filId}
          onChange={(e) => setFilId(e.target.value)}
        >
          <option value="">Sin comparar filamento</option>
          <optgroup label="Genéricos">
            {FILAMENTOS.filter((f) => !f.marca).map((f) => (
              <option key={f.id} value={f.id}>
                {f.nombre}
              </option>
            ))}
          </optgroup>
          <optgroup label="De marca">
            {FILAMENTOS.filter((f) => f.marca).map((f) => (
              <option key={f.id} value={f.id}>
                {f.nombre}
              </option>
            ))}
          </optgroup>
        </select>
        <button
          type="button"
          className="btn-ghost maquinas-movimiento"
          onClick={() => setPausadas(!pausadas)}
        >
          {pausadas ? 'Reanudar animaciones' : 'Pausar animaciones'}
        </button>
        <p className="maquinas-resumen" role="status">
          {resumen}
        </p>
      </div>

      <div className="maquinas-lista">
        {MAQUINAS.map((m) => (
          <article className="maquina" key={m.slug}>
            <MaquinaSVG maquina={m} filamento={filamento} className="maquina-ilustracion" />
            <div className="maquina-ficha">
              <h2>
                {m.marca} {m.modelo}
              </h2>
              <p className="maquina-precio">{m.precioRef}</p>
              <Veredicto maquina={m} filamento={filamento} />
              <dl className="maquina-campos">
                {CAMPOS_FICHA.map((campo) => {
                  const valor = valorCampo(m, campo);
                  const conOrigen = CON_ORIGEN.has(campo);
                  const raw = m.origen[campo as keyof Maquina['origen']];
                  // La etiqueta sale del ORIGEN, no del valor: un campo sin
                  // fichar (valor null, origen P) es «pendiente», y uno que no
                  // aplica a esta máquina (origen null) es «no aplica». Antes se
                  // miraba el valor y los dos casos salían intercambiados.
                  const origenTexto =
                    raw === null ? 'no aplica' : TEXTO_ORIGEN[raw ?? 'P'];
                  return (
                    <div className="maquina-campo" key={campo}>
                      <dt>{ETIQUETA[campo] ?? campo}</dt>
                      <dd>
                        <span className="maquina-campo-valor">{valor ?? '—'}</span>
                        {conOrigen && (
                          <span className={`maquina-origen maquina-origen--${origenTexto.replace(/\s+/g, '-')}`}>
                            {origenTexto}
                          </span>
                        )}
                      </dd>
                    </div>
                  );
                })}
              </dl>
              <details className="maquina-fuentes">
                <summary>Fuentes de esta ficha ({m.fuentes.length})</summary>
                <ul>
                  {m.fuentes.map((f) => (
                    <li key={f.url}>
                      <a href={f.url} target="_blank" rel="nofollow noopener noreferrer">
                        {f.titulo}
                      </a>
                    </li>
                  ))}
                </ul>
              </details>
            </div>
          </article>
        ))}
      </div>

      <footer className="maquinas-nota">
        <h2>De dónde sale cada ficha</h2>
        <p>
          Las fuentes de cada máquina son fichas de terceros que comparan modelos y,
          cuando existe, la página del fabricante. Los campos sin verificar quedan
          marcados como pendientes hasta que el proceso de revisión los respalde con
          una fuente.
        </p>
      </footer>
    </div>
  );
}
