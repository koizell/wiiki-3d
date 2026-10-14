import type { ReactElement } from 'react';
import type { Filamento, Maquina } from '../content/maquinas/tipos.ts';
import { duracionCiclo, rizaria } from '../lib/maquinas.ts';

/**
 * La previsualización 2D de una máquina.
 *
 * ## Por qué SVG en línea y no una imagen
 *
 * Porque la ilustración **se mueve con la ficha**: la velocidad de la animación
 * sale de `velMax`, el rizado sale de la combinación máquina-filamento, y las
 * capas se contienen en el propio SVG. Una imagen fija no podría, y un lienzo
 * 3D pesaría cientos de kilobytes por máquina y fallaría sin WebGL. El SVG
 * funciona sin JavaScript y se lee igual en la exportación estática.
 *
 * ## Qué dibuja cada familia
 *
 * No es un esquema: es la silueta del modelo. La bed-slinger desliza la cama y
 * sube el pórtico con la boquilla; la CoreXY mantiene el cabezal fijo y sube la
 * cama por husillos; la resina cura cada capa en el film y sube la plataforma.
 * Lo que se mueve y a qué velocidad lo decide la ficha, no el dibujante.
 *
 * ## Las clases
 *
 * Los estilos están en `src/estilos/maquinas.css`. Todo lo que se mueve lleva
 * clase `moviendo` (azul de acento), igual que los dibujos de síntoma: la
 * convención del repo es que el color de acento marca la parte en movimiento.
 */

interface Props {
  maquina: Maquina;
  filamento: Filamento | null;
  /** Accesible: descripción de lo que se ve, para quien no ve el dibujo. */
  className?: string;
}

/** Capas de la pieza: 12 capas visibles (exageradas para leerse). */
const CAPAS = 12;
const CAPA_H = 5;
const ANCHO = 74;

/** Una extrusión vertical con su ranura. */
function ExtrusionV({ x, y, h, w = 12 }: { x: number; y: number; h: number; w?: number }): ReactElement {
  return (
    <g>
      <rect className="est" x={x} y={y} width={w} height={h} />
      <line className="ranura" x1={x + w / 2} y1={y} x2={x + w / 2} y2={y + h} />
    </g>
  );
}

/** Una extrusión horizontal con su ranura. */
function ExtrusionH({ x, y, w, h = 12 }: { x: number; y: number; w: number; h?: number }): ReactElement {
  return (
    <g>
      <rect className="est" x={x} y={y} width={w} height={h} />
      <line className="ranura" x1={x} y1={y + h / 2} x2={x + w} y2={y + h / 2} />
    </g>
  );
}

/** Rejilla de ventilación de un panel. */
function Rejilla({ x, y, h, n = 9 }: { x: number; y: number; h: number; n?: number }): ReactElement {
  return (
    <g>
      {Array.from({ length: n }, (_, i) => {
        const ly = y + 14 + (i * (h - 28)) / (n - 1);
        return <line key={i} className="rejilla" x1={x} y1={ly} x2={x + 10} y2={ly} />;
      })}
    </g>
  );
}

/** Las capas de la pieza, con las pestañas de warping si toca. */
function Capas({ rizar, yBase, anchoFn }: { rizar: boolean; yBase: number; anchoFn: (i: number) => number }): ReactElement {
  return (
    <g>
      {Array.from({ length: CAPAS }, (_, i) => {
        const y = yBase - (i + 1) * CAPA_H;
        const w = anchoFn(i);
        const retardo = `${(i * 0.6).toFixed(2)}s`;
        return (
          <g key={i}>
            <rect className="capa pieza" x={240 - w / 2} y={y} width={w} height={CAPA_H - 0.6} style={{ animationDelay: retardo }} />
            {rizar && i >= CAPAS - 3
              ? [-1, 1].map((sx) => (
                  <g className="riza" key={sx} style={{ animationDelay: retardo }}>
                    <rect className="pieza" x={240 + sx * (w / 2) - (sx > 0 ? 0 : 7)} y={y} width={7} height={CAPA_H - 0.6} />
                  </g>
                ))
              : null}
          </g>
        );
      })}
    </g>
  );
}

/** Bed-slinger: el pórtico sube con la boquilla, la cama se desliza. */
function VistaBedSlinger({ maquina, rizar }: { maquina: Maquina; rizar: boolean }): ReactElement {
  return (
    <>
      <ExtrusionH x={46} y={44} w={388} />
      <ExtrusionV x={46} y={52} h={232} />
      <ExtrusionV x={422} y={52} h={232} />
      <rect className="est" x={36} y={278} width={408} height={18} rx={3} />
      <rect className="panel" x={36} y={292} width={408} height={10} />

      {/* bobina girando en su soporte, con el filamento bajando al cabezal */}
      <g className="giro">
        <circle className="bobina" cx={104} cy={88} r={21} />
        <circle className="metal" cx={104} cy={88} r={6} />
        <line className="moviendo" x1={104} y1={67} x2={104} y2={109} />
      </g>
      <line className="metal" x1={104} y1={44} x2={104} y2={56} strokeWidth={3} />
      <path className="hilo fluye" d="M104 88 Q170 120 214 150" fill="none" />

      {/* pórtico + carro y cabezal: sube con Z y barrea en X */}
      <g className="portico">
        <rect className="panel" x={70} y={132} width={340} height={9} />
        <rect className="metal" x={66} y={128} width={12} height={17} rx={2} />
        <rect className="metal" x={402} y={128} width={12} height={17} rx={2} />
        <g className="traza-x">
          <rect className="moviendo-r" x={226} y={122} width={28} height={14} rx={2} />
          <path className="moviendo" d="M240 136 L240 168" fill="none" />
          <path className="est" d="M232 168 L248 168 L244 186 L236 186 Z" fill="none" />
          <path className="boquilla" d="M236 186 L244 186 L240 196 Z" />
          <g className="aspas">
            <circle cx={254} cy={158} r={7} className="vent-il" />
            <line x1={247} y1={158} x2={261} y2={158} className="vent-asp" />
            <line x1={254} y1={151} x2={254} y2={165} className="vent-asp" />
          </g>
        </g>
      </g>

      {/* cama deslizando en Y con su chapa y la pieza creciendo */}
      <g className="cama-y">
        <rect className="est" x={96} y={252} width={288} height={16} rx={2} />
        <rect className="chapa" x={96} y={244} width={288} height={8} />
        <Capas rizar={rizar} yBase={236} anchoFn={(i) => ANCHO - i * 1.2} />
      </g>

      <rect className="pant" x={376} y={252} width={38} height={24} rx={2} />
      <rect className="pant-luz" x={380} y={270} width={30} height={3} />
      <title>{`${maquina.marca} ${maquina.modelo}: armazón, pórtico con cabezal, cama deslizante y bobina`}</title>
    </>
  );
}

/** CoreXY: cabezal fijo arriba, cama subiendo por husillos, hub de filamento. */
function VistaCoreXY({ maquina, rizar, abierta }: { maquina: Maquina; rizar: boolean; abierta: boolean }): ReactElement {
  return (
    <>
      <ExtrusionH x={44} y={40} w={392} />
      <ExtrusionV x={44} y={48} h={236} />
      <ExtrusionV x={424} y={48} h={236} />
      {abierta ? null : (
        <>
          <rect className="panel" x={34} y={56} width={10} height={222} />
          <Rejilla x={34} y={56} h={222} />
          <rect className="panel" x={436} y={56} width={10} height={222} />
          <Rejilla x={436} y={56} h={222} />
        </>
      )}
      <rect className="est" x={34} y={278} width={412} height={20} rx={3} />

      {abierta ? null : (
        <>
          <rect className="est" x={62} y={54} width={8} height={228} />
          <rect className="est" x={410} y={54} width={8} height={228} />
          <rect className="cristal" x={70} y={58} width={340} height={220} />
          <rect className="metal" x={398} y={120} width={26} height={4} rx={2} />
        </>
      )}

      {/* husillos con su rosca girando; las tuercas van en la cama */}
      <line className="metal" x1={140} y1={96} x2={140} y2={268} strokeWidth={5} />
      <line className="metal" x1={340} y1={96} x2={340} y2={268} strokeWidth={5} />
      <g className="husillo-marca">
        <line className="moviendo" x1={134} y1={130} x2={146} y2={130} />
      </g>
      <g className="husillo-marca">
        <line className="moviendo" x1={334} y1={200} x2={346} y2={200} />
      </g>

      {/* viga y cabezal: sólo traza en X (la Z la hace la cama) */}
      <rect className="panel" x={86} y={62} width={308} height={9} />
      <rect className="metal" x={82} y={58} width={14} height={17} rx={2} />
      <rect className="metal" x={384} y={58} width={14} height={17} rx={2} />
      <g className="traza-x">
        <rect className="moviendo-r" x={226} y={56} width={28} height={13} rx={2} />
        <path className="moviendo" d="M240 69 L240 94" fill="none" />
        <path className="est" d="M231 94 L249 94 L245 110 L235 110 Z" fill="none" />
        <path className="boquilla" d="M235 110 L245 110 L240 120 Z" />
        <g className="aspas">
          <circle cx={256} cy={84} r={7} className="vent-il" />
          <line x1={249} y1={84} x2={263} y2={84} className="vent-asp" />
          <line x1={256} y1={77} x2={256} y2={91} className="vent-asp" />
        </g>
      </g>

      {/* hub de filamento con sus cuatro tubos hasta el cabezal */}
      {['#2fa8e0', '#e05fa0', '#e0d05f', '#e8eaee'].map((c, i) => (
        <path key={c} d={`M${344 + i * 12} 44 Q${300 + i * 8} 76 ${248 + i * 4} 94`} fill="none" stroke={c} strokeWidth={2.2} opacity={0.9} />
      ))}

      {/* cama que sube en Z, con tuercas montadas en los husillos */}
      <g className="sube-z">
        <rect className="est" x={128} y={244} width={224} height={12} rx={2} />
        <rect className="metal" x={134} y={238} width={12} height={22} rx={2} />
        <rect className="metal" x={334} y={238} width={12} height={22} rx={2} />
        <rect className="chapa" x={128} y={236} width={224} height={8} />
        <Capas rizar={rizar} yBase={232} anchoFn={(i) => ANCHO - i} />
      </g>

      <rect className="panel" x={336} y={16} width={80} height={28} rx={3} />
      {[342, 356, 370, 384].map((x) => (
        <rect key={x} className="pant-luz" x={x} y={36} width={10} height={3} />
      ))}
      <rect className="pant" x={58} y={12} width={62} height={34} rx={3} />
      <rect className="pant-luz" x={64} y={18} width={50} height={5} />
      <rect className="pant-luz" x={64} y={27} width={34} height={4} opacity={0.6} />
      <title>{`${maquina.marca} ${maquina.modelo}: CoreXY ${abierta ? 'abierta' : 'cerrada con puerta de cristal'}, husillos y cama que sube`}</title>
    </>
  );
}

/** Resina: la capa nace en el film y la plataforma sube con la pieza. */
function VistaResina({ maquina }: { maquina: Maquina }): ReactElement {
  return (
    <>
      <rect className="est" x={184} y={64} width={112} height={6} rx={2} />
      <rect className="cristal" x={190} y={70} width={100} height={114} />
      <rect className="pieza" x={192} y={84} width={96} height={96} opacity={0.22} />
      <rect className="metal" x={190} y={182} width={100} height={5} />
      <rect className="panel" x={160} y={188} width={160} height={90} rx={3} />
      <rect className="est" x={146} y={276} width={188} height={12} rx={2} />

      {/* plataforma que sube y corona la pila al final del ciclo */}
      <g className="sube-z">
        <rect className="metal" x={300} y={58} width={7} height={130} />
        <rect className="panel" x={294} y={172} width={18} height={26} rx={2} />
        <rect className="panel" x={200} y={174} width={100} height={6} rx={2} />
        <rect className="metal" x={216} y={177} width={84} height={5} rx={1} />
      </g>

      {/* cada capa se cura en el film: la pila crece hacia arriba */}
      <g>
        {Array.from({ length: CAPAS }, (_, i) => (
          <rect
            key={i}
            className="capa pieza"
            x={222}
            y={177 - i * CAPA_H}
            width={36}
            height={CAPA_H - 0.6}
            style={{ animationDelay: `${(i * 0.5).toFixed(2)}s` }}
          />
        ))}
        {Array.from({ length: CAPAS }, (_, i) => (
          <rect key={`c${i}`} className="cura" x={200} y={182} width={80} height={2} style={{ animationDelay: `${(i * 0.5).toFixed(2)}s` }} />
        ))}
      </g>

      <rect className="est" x={140} y={54} width={200} height={12} rx={3} />
      <rect className="pant-luz" x={150} y={57} width={44} height={6} opacity={0.85} />
      <rect className="pant" x={196} y={246} width={88} height={26} rx={3} />
      <rect className="pant-luz" x={202} y={252} width={60} height={4} />
      <rect className="pant-luz" x={202} y={260} width={38} height={4} opacity={0.6} />
      <title>{`${maquina.marca} ${maquina.modelo}: tanque de resina, LCD en el fondo y plataforma que sube capa a capa`}</title>
    </>
  );
}

/** La ilustración completa de la máquina elegida. */
export default function MaquinaSVG({ maquina, filamento, className }: Props) {
  const rizar = rizaria(maquina, filamento);
  const ciclo = duracionCiclo(maquina);
  const v = (maquina.velMax ?? 150) / 500;
  const vars = {
    '--ciclo': `${ciclo}s`,
    '--v': String(v),
    '--x0': '-118px',
    '--x1': '118px',
    '--z0': maquina.familia === 'resina' ? '-55px' : '-58px',
    '--z1': '-46px',
  } as React.CSSProperties;

  return (
    <svg
      viewBox="0 0 480 320"
      /* La clase propia del SVG va siempre, y la del llamador se añade: si el
         llamador pone `maquina` (como hacía la página del catálogo), los
         selectores de `maquinas.css` —que son descendientes de `.maquina-svg`—
         dejarían de aplicar y la ilustración saldría sin estilo. */
      className={['maquina-svg', className].filter(Boolean).join(' ')}
      role="img"
      style={vars}
    >
      <g className="ciclo">
        {maquina.familia === 'resina' ? (
          <VistaResina maquina={maquina} />
        ) : maquina.familia === 'bed-slinger' ? (
          <VistaBedSlinger maquina={maquina} rizar={rizar} />
        ) : (
          <VistaCoreXY maquina={maquina} rizar={rizar} abierta={!maquina.cerrada} />
        )}
      </g>
    </svg>
  );
}
