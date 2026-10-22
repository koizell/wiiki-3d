import { useEffect, useMemo, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import type { Trayectoria } from '../services/GcodeTrayectoria';

/**
 * El visor de la trayectoria del G-code.
 *
 * ## Qué enseña
 *
 * La trayectoria **de la máquina**, no el modelo. No hay malla: lo que hay es lo
 * que la cabeza va a hacer, en el orden en que lo va a hacer, con el color de lo
 * que está haciendo en cada momento.
 *
 * Y esa última parte es la que no tiene ningún otro sitio: **el tipo de rasgo**.
 * El slicer escribe en cada tramo si la cabeza está haciendo un perímetro, un
 * relleno, un soporte o una superficie, y esa información está **tirada** en el
 * archivo de texto: nadie la lee a ojo y una maqueta no la enseña. Con la
 * trayectoria coloreada por tipo, un soporte se ve como un soporte y un puente se
 * ve como un puente.
 *
 * ## La cortina por capas
 *
 * Un deslizador enseña las capas **hasta** la que se elija. Es la vista en la que
 * una pieza se convierte en capas: subes el deslizador y la pieza crece, capa a
 * capa, que es exactamente lo que hace la máquina.
 *
 * ## Dos geometrías y por qué
 *
 * Una para lo que deposita material y otra para los viajes. Con una sola, el
 * interruptor de viajes no se podría resolver sin reordenar los segmentos, y el
 * reordenado rompe la **continuidad** de la línea: cada tramo tiene que empezar
 * donde acabó el anterior, o la trayectoria sale hecha trozos.
 *
 * Con dos, cada una está en orden de capa y la cortina es un `setDrawRange`: no
 * se reconstruye nada, y por eso el deslizador va fluido con un G-code de cientos
 * de miles de movimientos.
 */
export default function VisorTrayectoria({
  trayectoria,
}: {
  trayectoria: Trayectoria;
}) {
  const mountRef = useRef<HTMLDivElement>(null);
  const lineasRef = useRef<{ extraccion: THREE.LineSegments; viajes: THREE.LineSegments } | null>(null);
  const [capa, setCapa] = useState<number | null>(null);
  const [mostrarViajes, setMostrarViajes] = useState(false);

  const totalCapas = trayectoria.capas.length;

  /**
   * El color de cada tipo de rasgo.
   *
   * Diez tipos y diez colores. Se eligen de la paleta del sitio y de tres más que
   * hacen falta para distinguir los rellenos, que son los que más se parecen
   * entre sí: un relleno normal y un relleno interno tienen que poder
   * distinguirse de un vistazo o el color no informa.
   */
  const colorPorTipo = useMemo<Record<string, string>>(
    () => ({
      'Outer wall': '#60a5fa',
      'Inner wall': '#3b82f6',
      'Overhang wall': '#f97316',
      'Top surface': '#22c55e',
      'Bottom surface': '#16a34a',
      'Internal solid infill': '#a855f7',
      'Gap infill': '#7c3aed',
      Bridge: '#ef4444',
      'Support interface': '#f59e0b',
      'Support material': '#fb923c',
      Custom: '#8b949e',
    }),
    []
  );

  /**
   * Las dos geometrías y el corte de cada capa.
   *
   * `cortePorCapa[i]` son los **vértices** de cada geometría que hay al terminar
   * la capa `i`. Los vértices van de dos en dos —un segmento son dos puntos—, así
   * que el número es par y `setDrawRange` corta en un segmento.
   */
  const { extraccion, viajes, cortePorCapa } = useMemo(() => {
    const tramos = trayectoria.tramos;
    const puntosExtraccion: number[] = [];
    const coloresExtraccion: number[] = [];
    const puntosViajes: number[] = [];
    const coloresViajes: number[] = [];

    // Cuántos vértices de cada geometría hay al final de cada capa.
    const cortes: { extraccion: number; viajes: number }[] = [];
    for (let c = 0; c < totalCapas; c++) cortes.push({ extraccion: 0, viajes: 0 });

    const color = new THREE.Color();
    let x = 0;
    let y = 0;
    let z = 0;

    for (let i = 0; i < tramos.length; i++) {
      const tramo = tramos[i];
      const desde = [x, y, z];
      x = tramo.x;
      y = tramo.y;
      z = tramo.z;

      if (tramo.viaje) {
        puntosViajes.push(...desde, x, y, z);
        const gris = new THREE.Color('#39414d');
        for (let v = 0; v < 2; v++) coloresViajes.push(gris.r, gris.g, gris.b);
      } else {
        puntosExtraccion.push(...desde, x, y, z);
        color.set(colorPorTipo[tramo.tipo ?? ''] ?? '#8b949e');
        for (let v = 0; v < 2; v++) coloresExtraccion.push(color.r, color.g, color.b);
      }

      // El corte de la capa en la que cae este tramo.
      const indice = tramo.capa;
      if (indice >= 0 && indice < totalCapas) {
        cortes[indice].extraccion = puntosExtraccion.length;
        cortes[indice].viajes = puntosViajes.length;
      }
    }

    // Los cortes tienen que ser **acumulados**: el corte de la capa `i` son los
    // vértices de todas las capas hasta la `i`.
    for (let c = 1; c < totalCapas; c++) {
      cortes[c].extraccion = Math.max(cortes[c].extraccion, cortes[c - 1].extraccion);
      cortes[c].viajes = Math.max(cortes[c].viajes, cortes[c - 1].viajes);
    }

    return {
      extraccion: { posiciones: new Float32Array(puntosExtraccion), colores: new Float32Array(coloresExtraccion) },
      viajes: { posiciones: new Float32Array(puntosViajes), colores: new Float32Array(coloresViajes) },
      cortePorCapa: cortes,
    };
  }, [trayectoria, colorPorTipo, totalCapas]);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const escena = new THREE.Scene();
    escena.background = new THREE.Color('#0f1115');

    const camara = new THREE.PerspectiveCamera(
      45,
      mount.clientWidth / mount.clientHeight,
      0.1,
      10000
    );

    const render = new THREE.WebGLRenderer({ antialias: true });
    render.setSize(mount.clientWidth, mount.clientHeight);
    render.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mount.appendChild(render.domElement);
    render.domElement.setAttribute('role', 'img');
    render.domElement.setAttribute(
      'aria-label',
      'Trayectoria de impresión en tres dimensiones, coloreada por el tipo de rasgo'
    );

    escena.add(new THREE.AmbientLight(0xffffff, 0.9));
    const luz = new THREE.DirectionalLight(0xffffff, 0.7);
    luz.position.set(1, 1, 1);
    escena.add(luz);

    const controles = new OrbitControls(camara, render.domElement);
    controles.enableDamping = true;

    const geometriaExtraccion = new THREE.BufferGeometry();
    geometriaExtraccion.setAttribute('position', new THREE.BufferAttribute(extraccion.posiciones, 3));
    geometriaExtraccion.setAttribute('color', new THREE.BufferAttribute(extraccion.colores, 3));
    const lineasExtraccion = new THREE.LineSegments(
      geometriaExtraccion,
      new THREE.LineBasicMaterial({ vertexColors: true })
    );

    const geometriaViajes = new THREE.BufferGeometry();
    geometriaViajes.setAttribute('position', new THREE.BufferAttribute(viajes.posiciones, 3));
    geometriaViajes.setAttribute('color', new THREE.BufferAttribute(viajes.colores, 3));
    const lineasViajes = new THREE.LineSegments(
      geometriaViajes,
      new THREE.LineBasicMaterial({ vertexColors: true })
    );

    escena.add(lineasExtraccion);
    escena.add(lineasViajes);
    lineasRef.current = { extraccion: lineasExtraccion, viajes: lineasViajes };

    // La cama, como referencia de dónde está la pieza.
    const caja = trayectoria.caja;
    const ancho = Math.max(caja.max.x - caja.min.x, 1);
    const fondo = Math.max(caja.max.y - caja.min.y, 1);
    const plano = new THREE.Mesh(
      new THREE.PlaneGeometry(ancho, fondo),
      new THREE.MeshBasicMaterial({
        color: 0x1b2130,
        transparent: true,
        opacity: 0.35,
        side: THREE.DoubleSide,
      })
    );
    plano.rotation.x = -Math.PI / 2;
    plano.position.set((caja.min.x + caja.max.x) / 2, (caja.min.y + caja.max.y) / 2, 0);
    escena.add(plano);

    // El encuadre: la pieza, de tres cuartos.
    const centro = new THREE.Vector3(
      (caja.min.x + caja.max.x) / 2,
      (caja.min.y + caja.max.y) / 2,
      (caja.min.z + caja.max.z) / 2
    );
    /*
     * El encuadre, de tres cuartos y desde arriba.
     *
     * Es el mismo ángulo que el visor de malla (`Viewer3D`): una trayectoria que
     * se ve de canto no dice nada, porque el plano de la pieza queda de perfil.
     * La distancia sale de la diagonal de la caja, que es lo que hace que un G-code
     * de 20 mm y otro de 300 mm se vean igual de bien.
     */
    const diagonal = Math.hypot(ancho, fondo, Math.max(caja.max.z - caja.min.z, 1));
    const distancia = diagonal * 1.15;
    const direccion = new THREE.Vector3(0.6, 0.45, 1).normalize();
    camara.position.copy(centro).addScaledVector(direccion, distancia);
    camara.near = Math.max(distancia / 100, 0.1);
    camara.far = distancia * 20;
    camara.updateProjectionMatrix();
    controles.target.copy(centro);
    controles.update();

    let animacion = 0;
    const dibujar = () => {
      animacion = requestAnimationFrame(dibujar);
      controles.update();
      render.render(escena, camara);
    };
    dibujar();

    const redimensionar = () => {
      if (!mount) return;
      camara.aspect = mount.clientWidth / mount.clientHeight;
      camara.updateProjectionMatrix();
      render.setSize(mount.clientWidth, mount.clientHeight);
    };
    window.addEventListener('resize', redimensionar);

    return () => {
      cancelAnimationFrame(animacion);
      window.removeEventListener('resize', redimensionar);
      controles.dispose();
      geometriaExtraccion.dispose();
      geometriaViajes.dispose();
      render.dispose();
      lineasRef.current = null;
      if (mount.contains(render.domElement)) mount.removeChild(render.domElement);
    };
  }, [extraccion, viajes, trayectoria]);

  /*
   * La cortina por capas: un `setDrawRange`, que no reconstruye nada.
   */
  useEffect(() => {
    const lineas = lineasRef.current;
    if (!lineas) return;
    const corte = cortePorCapa[capa === null ? totalCapas - 1 : capa] ?? {
      extraccion: extraccion.posiciones.length / 3,
      viajes: viajes.posiciones.length / 3,
    };
    lineas.extraccion.geometry.setDrawRange(0, corte.extraccion);
    lineas.viajes.geometry.setDrawRange(0, corte.viajes);
    lineas.viajes.visible = mostrarViajes;
  }, [capa, cortePorCapa, totalCapas, extraccion, viajes, mostrarViajes]);

  const capaVisible = capa === null ? totalCapas : capa + 1;

  return (
    <div className="visor-trayectoria">
      <div className="visor-trayectoria-lienzo" ref={mountRef} />

      <div className="visor-trayectoria-controles">
        <label className="visor-trayectoria-capas">
          <span>
            Capa <strong>{capaVisible}</strong> de {totalCapas}
          </span>
          <input
            type="range"
            min={0}
            max={Math.max(totalCapas - 1, 0)}
            value={capa === null ? Math.max(totalCapas - 1, 0) : capa}
            onChange={(e) => setCapa(Number(e.target.value))}
            aria-label="Capa de la trayectoria"
          />
        </label>

        <label className="visor-trayectoria-viajes">
          <input
            type="checkbox"
            checked={mostrarViajes}
            onChange={(e) => setMostrarViajes(e.target.checked)}
          />
          <span>Ver los viajes</span>
        </label>

        <ul className="visor-trayectoria-leyenda">
          {[...new Set(trayectoria.tramos.filter((t) => !t.viaje).map((t) => t.tipo))]
            .filter((t): t is string => Boolean(t))
            .map((tipo) => (
              <li key={tipo}>
                <span
                  className="visor-trayectoria-muestra"
                  style={{ background: colorPorTipo[tipo] ?? '#8b949e' }}
                  aria-hidden="true"
                />
                {tipo}
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}
