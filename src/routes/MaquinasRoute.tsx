import { useMemo, useState } from 'react';
import MaquinaSVG from '../components/MaquinaSVG';
import { FILAMENTOS, MAQUINAS, filamentoPorId } from '../content/maquinas/catalogo';
import { CAMPOS_FICHA, TEXTO_ORIGEN } from '../content/maquinas/tipos';
import type { Maquina } from '../content/maquinas/tipos';
import { estadoFilamento } from '../lib/maquinas';

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
 * se renderiza con el valor inicial (PLA genérico) y sin interacción, igual que
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
      return `${v} °C boquilla`;
    case 'tCamaMax':
      return `${v} °C cama`;
    case 'sensorFilamento':
      return v ? 'Sí' : 'No';
    default:
      return String(v);
  }
}

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
  const clase = { ok: 'ok', 'limite-boquilla': 'aviso', 'necesita-camara': 'aviso', resina: 'info' }[r.estado];
  let texto: string;
  switch (r.estado) {
    case 'resina':
      texto = 'Impresora de resina: no lleva filamento, sino resina.';
      break;
    case 'limite-boquilla':
      texto = `Boquilla insuficiente: el filamento pide ${(r as { faltan: number }).faltan} °C más de lo que esta máquina puede dar.`;
      break;
    case 'necesita-camara':
      texto = 'Necesita cámara cerrada: en equipo abierto este material warpea.';
      break;
    default:
      texto = filamento ? `Compatible con ${filamento.nombre.toLowerCase()}.` : 'Elige un filamento para ver la compatibilidad.';
  }
  return <p className={`maquina-veredicto maquina-veredicto--${clase}`}>{texto}</p>;
}

export default function MaquinasRoute() {
  const [filId, setFilId] = useState('pla-gen');
  const filamento = useMemo(() => filamentoPorId(filId), [filId]);

  return (
    <div className="maquinas">
      <header className="maquinas-cabecera">
        <p className="maquinas-migas">
          <a href="/wiki">Wiki 3D</a> · Catálogo
        </p>
        <h1>Catálogo de impresoras 3D</h1>
        <p>
          Ocho modelos habituales y cómo se comportan con un filamento. Cada cifra
          lleva de dónde sale —<strong>fabricante</strong>, <strong>terceros</strong>{' '}
          o <strong>pendiente de fichar</strong>—, y lo que nadie ha verificado se
          muestra como pendiente, no se rellena. Elige un filamento para ver si cabe
          en cada máquina, si necesita cámara cerrada y si el warping rizaría la
          pieza.
        </p>
      </header>

      <div className="maquinas-filamento">
        <label htmlFor="maquinas-fil">Filamento de prueba</label>
        <select
          id="maquinas-fil"
          value={filId}
          onChange={(e) => setFilId(e.target.value)}
        >
          {FILAMENTOS.map((f) => (
            <option key={f.id} value={f.id}>
              {f.nombre}
            </option>
          ))}
        </select>
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
                  const origenTexto =
                    valor === null
                      ? 'no aplica'
                      : raw === 'F' || raw === 'T' || raw === 'P'
                        ? TEXTO_ORIGEN[raw]
                        : TEXTO_ORIGEN.P;
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
