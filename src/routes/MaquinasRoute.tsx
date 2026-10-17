import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import MaquinaSVG from '../components/MaquinaSVG';
import { FILAMENTOS, MAQUINAS, filamentoPorId } from '../content/maquinas/catalogo';
import { CAMPOS_CLAVE, CAMPOS_FICHA, TEXTO_ORIGEN } from '../content/maquinas/tipos';
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
 * ## La exportación estática, y lo que allí no se puede hacer
 *
 * El HTML exportado lleva las ocho fichas y las ocho ilustraciones completas: se
 * leen enteras sin JavaScript. Lo que no se puede es **comparar con un
 * filamento** ni pausar la animación, porque las dos cosas son estado del
 * componente.
 *
 * En ese render el veredicto no pide que se elija un filamento —no hay con qué— y
 * el botón de pausa no se pinta. Decirlo es la diferencia entre una página que se
 * lee y una que parece rota.
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

/**
 * Una fila de la ficha: etiqueta, valor y de dónde sale.
 *
 * Va como componente porque ahora se pinta en dos sitios —los campos clave y el
 * resto plegado—, y la lógica del origen es la misma en los dos. Con el bucle
 * inline había que mantenerla sincronizada a mano.
 */
function FilaCampo({ maquina, campo }: { maquina: Maquina; campo: (typeof CAMPOS_FICHA)[number] }) {
  const valor = valorCampo(maquina, campo);
  const conOrigen = CON_ORIGEN.has(campo);
  const raw = maquina.origen[campo as keyof Maquina['origen']];
  // La etiqueta sale del ORIGEN, no del valor: un campo sin fichar (valor null,
  // origen P) es «pendiente», y uno que no aplica a esta máquina (origen null) es
  // «no aplica». Antes se miraba el valor y los dos casos salían intercambiados.
  const origenTexto = raw === null ? 'no aplica' : TEXTO_ORIGEN[raw ?? 'P'];
  return (
    <div className="maquina-campo">
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
}

/** El veredicto de compatibilidad, en una línea concreta. */
function Veredicto({ maquina, filamento, exportEstatico }: { maquina: Maquina; filamento: ReturnType<typeof filamentoPorId>; exportEstatico: boolean }) {
  const r = estadoFilamento(maquina, filamento);
  const revisarCamara = maquina.familia !== 'resina' && rizaria(maquina, filamento);
  const clase = !filamento || r.estado === 'resina' || r.estado === 'camara-desconocida' ? 'info' : r.estado === 'ok' ? 'ok' : 'aviso';
  const texto = r.estado === 'resina'
    ? 'Utiliza resina líquida, no filamento.'
    : !filamento
      ? exportEstatico
        ? 'Ficha completa. Compararla con un filamento necesita JavaScript.'
        : 'Selecciona un filamento para comparar los datos de la ficha.'
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

export default function MaquinasRoute({ exportEstatico = false }: { exportEstatico?: boolean } = {}) {
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
        {/*
          La orientación.

          La auditoría del 14/10 lo marcó: en `/maquinas` no queda ningún destino
          de la barra activo, y la miga era la única pista de dónde se está. Se
          resuelve por el sitio que ya existe —la miga, que es el patrón de
          «estoy dentro de una sección»— y se refuerza con el texto de la propia
          miga, que ahora dice qué es la página sin dejarlo sólo en el `<h1>`.

          No se añade un quinto destino a la barra: son cuatro por decisión del
          proyecto, y `/maquinas` se alcanza desde Inicio y desde el pie.
        */}
        <nav className="maquinas-migas" aria-label="Estás aquí">
          <Link to="/">Inicio</Link>
          <span aria-hidden="true">›</span>
          <Link to="/wiki">Wiki 3D</Link>
          <span aria-hidden="true">›</span>
          <span aria-current="page">Catálogo de impresoras</span>
        </nav>
        <h1>Catálogo de impresoras 3D</h1>
        <p>{MAQUINAS.length} modelos: consulta su ficha y compara los datos con un filamento.</p>
        <details className="maquinas-alcance">
          <summary>Alcance de los datos y los dibujos</summary>
        <p>
          Modelos de impresoras con ilustración y ficha técnica. Cada cifra
          lleva de dónde sale —<strong>fabricante</strong>, <strong>terceros</strong>{' '}
          o <strong>pendiente de fichar</strong>—, y lo que nadie ha verificado se
          muestra como pendiente, no se rellena. Elige un filamento para comparar
          los datos disponibles. Las ilustraciones son esquemas por familia con
          los rasgos que sus fuentes afirman, no reproducciones exactas de cada
          modelo ni simulaciones del resultado.
        </p>
        </details>
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
        {exportEstatico ? null : (
          <button
            type="button"
            className="btn-ghost maquinas-movimiento"
            onClick={() => setPausadas(!pausadas)}
          >
            {pausadas ? 'Reanudar animaciones' : 'Pausar animaciones'}
          </button>
        )}
        <p className="maquinas-resumen" role="status">
          {resumen}
        </p>
        {exportEstatico && (
          <p className="maquinas-estatico">
            Comparar con un filamento y pausar la animación necesitan JavaScript.
            Las fichas y las ilustraciones se leen completas sin él.
          </p>
        )}
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
              <Veredicto maquina={m} filamento={filamento} exportEstatico={exportEstatico} />
              <dl className="maquina-campos">
                {CAMPOS_CLAVE.map((campo) => (
                  <FilaCampo key={campo} maquina={m} campo={campo} />
                ))}
              </dl>

              {/*
                El resto de la ficha, plegado.

                La auditoría del 14/10 lo marcó: nueve filas por tarjeta, ocho
                tarjetas, y para comparar dos máquinas había que recorrerlas
                enteras. Los cuatro campos de arriba son los que responden a la
                pregunta de la página; estos cinco son contexto.

                No se pierde nada: el `<details>` está abierto por HTML cuando se
                despliega, y las etiquetas de procedencia siguen dentro.
              */}
              <details className="maquina-resto">
                <summary>Resto de la ficha ({CAMPOS_FICHA.length - CAMPOS_CLAVE.length} campos)</summary>
                <dl className="maquina-campos">
                  {CAMPOS_FICHA.filter((c) => !CAMPOS_CLAVE.includes(c)).map((campo) => (
                    <FilaCampo key={campo} maquina={m} campo={campo} />
                  ))}
                </dl>
              </details>
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
