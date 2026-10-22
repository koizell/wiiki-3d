import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader.js';
import { ThreeMFLoader } from 'three/examples/jsm/loaders/3MFLoader.js';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import ControlesVisor from './ControlesVisor';
import { geometriaTrayectoria } from '../lib/trayectoria-render';
import type { Trayectoria } from '../services/GcodeTrayectoria';

/**
 * Formatos de malla que Viewer3D sabe construir en la escena. El enrutado desde
 * la extensión del archivo hasta aquí lo hace `App`.
 */
export type ViewerFormat = 'stl' | '3mf' | 'obj';

interface Viewer3DProps {
  file: File;
  fileType: ViewerFormat;
  /**
   * La trayectoria del G-code, si el archivo la trae.
   *
   * Sólo la traen los 3MF **de proyecto**, que llevan dentro su G-code. Y como
   * la malla y el G-code están los dos en coordenadas de cama, la trayectoria se
   * dibuja **encima** de la pieza, sin medir ni compensar nada.
   */
  trayectoria?: Trayectoria | null;
  onChooseFile?: () => void;
}

/** Margen extra al encuadrar, para que el modelo no toque los bordes del visor. */
const FRAME_MARGIN = 1.3;

/**
 * Dirección desde la que se mira la escena al encuadrar: tres cuartos, no
 * frontal, que es donde se aprecia mejor el volumen de la pieza.
 */
const CAMERA_DIRECTION = new THREE.Vector3(0.6, 0.45, 1).normalize();

/** Fallo de carga por formato: cada loader se rompe por su propio motivo. */
const LOAD_ERROR_MESSAGE: Record<ViewerFormat, string> = {
  stl: 'Error al procesar el archivo STL.',
  '3mf': 'El archivo 3MF está dañado o no se reconoce como un proyecto válido.',
  obj: 'Error al procesar el archivo OBJ.',
};

/**
 * Un 3MF bien formado puede no traer geometría: un proyecto recién creado,
 * solo con ajustes de laminado, o con objetos vacíos.
 */
const EMPTY_3MF_MESSAGE = 'El archivo 3MF no contiene geometría que se pueda mostrar.';

/**
 * Añade la trayectoria al grupo de la escena.
 *
 * La malla y la trayectoria están en el **mismo marco de cama**, así que la
 * trayectoria gira igual que la malla —Z arriba en los dos, Y arriba en `three`—
 * y el recentrado del grupo las afecta a las dos.
 *
 * Si ya había una trayectoria, se quita antes: la escena puede receberla dos
 * veces —si ya estaba cuando se leyó el archivo y vuelve a llegar después— y
 * dibujarla dos veces es dibujar el mismo G-code encima.
 */
function anadirTrayectoria(grupo: THREE.Group, trayectoria: Trayectoria): void {
  const anterior = grupo.getObjectByName('trayectoria');
  if (anterior) grupo.remove(anterior);

  const { posiciones, colores } = geometriaTrayectoria(trayectoria);
  const geometria = new THREE.BufferGeometry();
  geometria.setAttribute('position', new THREE.BufferAttribute(posiciones, 3));
  geometria.setAttribute('color', new THREE.BufferAttribute(colores, 3));

  const grupoTrayectoria = new THREE.Group();
  grupoTrayectoria.name = 'trayectoria';
  grupoTrayectoria.rotation.x = -Math.PI / 2;
  grupoTrayectoria.add(
    new THREE.LineSegments(
      geometria,
      new THREE.LineBasicMaterial({ vertexColors: true, transparent: true, opacity: 0.95 })
    )
  );
  grupo.add(grupoTrayectoria);
}

function Viewer3D({ file, fileType, trayectoria, onChooseFile }: Viewer3DProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const comandos = useRef<{ encuadrar: () => void; zoom: (factor: number) => void; girar: () => void } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [vista, setVista] = useState('Arrastra para girar; también puedes usar los botones.');

  /*
   * La trayectoria llega **después** de que el archivo esté montado.
   *
   * El archivo se lee con un `FileReader` y el G-code de un 3MF de proyecto se
   * analiza aparte: las dos cosas son lentas y no tienen por qué acabar a la vez.
   *
   * Estos tres `ref` son la puerta por la que la trayectoria entra cuando llega
   * tarde. El efecto de abajo depende del **archivo**, no de la trayectoria, así
   * que no se vuelve a ejecutar cuando ésta llega: sin estas referencias, la
   * trayectoria se leía y no se pintaba nunca.
   */
  const trayectoriaRef = useRef<Trayectoria | null>(null);
  const grupoRef = useRef<THREE.Group | null>(null);
  const recentrarRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    trayectoriaRef.current = trayectoria ?? null;
  }, [trayectoria]);

  useEffect(() => {
    const currentMount = mountRef.current;
    if (!currentMount) return;

    setLoading(true);
    setError(null);

    // 1. Configurar escena, cámara y renderizador
    const scene = new THREE.Scene();
    scene.background = new THREE.Color('#0f1115');

    const camera = new THREE.PerspectiveCamera(
      45,
      currentMount.clientWidth / currentMount.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 100);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    currentMount.appendChild(renderer.domElement);
    renderer.domElement.setAttribute('role', 'img');
    renderer.domElement.setAttribute('aria-label', `Vista 3D del archivo ${fileType.toUpperCase()} ${file.name}`);

    // 2. Luces
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);

    // 2b. La cama de impresión.
    //
    // Sin ella, el modelo flota en el espacio y el usuario no puede juzgar si
    // está bien orientado para imprimir. La cama es el marco de referencia:
    // la pieza se posa sobre ella, y la trayectoria (en 3MF de proyecto) se
    // dibuja encima, en el mismo plano.
    //
    // Grid de 200×200 mm (volumen típico de una impresora de escritorio) con
    // divisiones de 10 mm, y un plano semitransparente como superficie.
    const bedSize = 220;
    // GridHelper ya está en el plano XZ (Y = 0), que es donde queda la cama
    // tras la conversión Z-up → Y-up del 3MF.
    const grid = new THREE.GridHelper(bedSize, 22, 0x2563eb, 0x1e242c);
    scene.add(grid);

    const bedGeometry = new THREE.PlaneGeometry(bedSize, bedSize);
    const bedMaterial = new THREE.MeshStandardMaterial({
      color: 0x161a20,
      transparent: true,
      opacity: 0.4,
      side: THREE.DoubleSide,
    });
    const bed = new THREE.Mesh(bedGeometry, bedMaterial);
    bed.rotation.x = -Math.PI / 2; // PlaneGeometry es XY por defecto; lo ponemos en XZ
    scene.add(bed);

    // 3. Controles de órbita
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;

    // 4. Cargar el archivo
    //
    // `cancelled` evita que una lectura lenta (un 3MF con toda la geometría
    // laminada puede pesar cientos de MB) pinte su resultado sobre un visor que
    // ya se ha desmontado o que el usuario ya ha sustituido por otro archivo.
    let cancelled = false;

    const fail = (message: string) => {
      if (cancelled) return;
      setError(message);
      setLoading(false);
    };

    const reader = new FileReader();
    reader.onload = () => {
      if (cancelled) return;
      const contents = reader.result;
      if (!(contents instanceof ArrayBuffer)) {
        fail(LOAD_ERROR_MESSAGE[fileType]);
        return;
      }
      try {
        const model = buildModel(fileType, contents);

        // Un 3MF sin geometría no está roto: es un proyecto recién creado, solo
        // con ajustes. Por eso tiene su propio mensaje en lugar del genérico de
        // "archivo dañado", que sería un diagnóstico falso.
        if (!model) {
          fail(EMPTY_3MF_MESSAGE);
          return;
        }

        /*
         * La malla y la trayectoria, en el **mismo grupo**.
         *
         * El grupo es lo que lleva la rotación de Z arriba a Y arriba y el
         * recentrado, y las dos cosas se mueven con él. Por eso la trayectoria
         * cae **encima** de la pieza sin compensar nada: los dos están en
         * coordenadas de cama y el recentrado es el mismo para los dos.
         */
        const grupo = new THREE.Group();
        grupo.add(model);

        /*
         * La trayectoria, si ya está.
         *
         * Si llega después de este punto, la pinta el efecto de más abajo. Si
         * llegó antes, se pinta aquí y aquél no tendrá nada que hacer.
         */
        const tr = trayectoriaRef.current;
        if (tr && fileType === '3mf') {
          anadirTrayectoria(grupo, tr);
        }

        /*
         * El recentrado, sobre el grupo y **después** de rotar: la caja envolvente
         * sólo refleja la rotación si las matrices del grupo ya están al día, y
         * calcularla antes dejaría la pieza descentrada.
         */
        if (fileType === '3mf') {
          grupo.updateMatrixWorld(true);
          const box = new THREE.Box3().setFromObject(grupo);
          if (!box.isEmpty()) {
            const center = box.getCenter(new THREE.Vector3());
            grupo.position.set(-center.x, -center.y, -center.z);
          }
        }

        /*
         * Recentrar otra vez, para cuando la trayectoria llegue tarde.
         *
         * El centro del grupo se calculó con la malla y, si la trayectoria ya
         * estaba, con la trayectoria también. Si llega después, hace falta
         * recalcularlo: sin esto la línea de colores sale al lado de la pieza en
         * vez de encima, que es justo lo que el mismo marco de cama debería
         * evitar.
         */
        recentrarRef.current = () => {
          if (fileType !== '3mf') return;
          grupo.updateMatrixWorld(true);
          const caja = new THREE.Box3().setFromObject(grupo);
          if (caja.isEmpty()) return;
          const centro = caja.getCenter(new THREE.Vector3());
          grupo.position.set(-centro.x, -centro.y, -centro.z);
        };
        grupoRef.current = grupo;

        scene.add(grupo);

        // Se reencuadra siempre: con la cama de impresión como marco mínimo,
        // una pieza de 20 mm y una de 250 mm se ven igual de bien, y la cama
        // queda dentro del encuadre. Antes el STL conservaba la cámara por
        // defecto, lo que dejaba piezas pequeñas lejos y la cama fuera de vista.
        frameCamera(camera, controls, grupo);

        comandos.current = {
          encuadrar: () => frameCamera(camera, controls, model),
          zoom: (factor) => {
            const offset = camera.position.clone().sub(controls.target);
            const distancia = THREE.MathUtils.clamp(offset.length() * factor, 1, camera.far * 0.8);
            camera.position.copy(controls.target).add(offset.setLength(distancia));
            controls.update();
          },
          girar: () => {
            const offset = camera.position.clone().sub(controls.target);
            offset.applyAxisAngle(new THREE.Vector3(0, 1, 0), Math.PI / 6);
            camera.position.copy(controls.target).add(offset);
            controls.update();
          },
        };

        setLoading(false);
      } catch (err) {
        console.error(err);
        fail(LOAD_ERROR_MESSAGE[fileType]);
      }
    };
    reader.onerror = () => fail(LOAD_ERROR_MESSAGE[fileType]);
    reader.readAsArrayBuffer(file);

    // 5. Bucle de animación
    let animationId: number;
    const animate = () => {
      animationId = requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    // 6. Redimensionamiento
    const handleResize = () => {
      if (!currentMount) return;
      camera.aspect = currentMount.clientWidth / currentMount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    // Limpieza al desmontar
    return () => {
      cancelled = true;
      comandos.current = null;
      grupoRef.current = null;
      recentrarRef.current = null;
      if (reader.readyState === FileReader.LOADING) reader.abort();
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationId);
      controls.dispose();
      renderer.dispose();
      if (currentMount.contains(renderer.domElement)) {
        currentMount.removeChild(renderer.domElement);
      }
    };
  }, [file, fileType]);

  /*
   * La trayectoria, cuando llega después de que la escena esté montada.
   *
   * El efecto de arriba construye la escena cuando el archivo está leído, y su
   * lista de dependencias es el archivo y el tipo: **no la trayectoria**, porque
   * la trayectoria no es parte de la lectura del archivo sino de un análisis
   * aparte, que va por su cuenta y puede tardar más.
   *
   * El resultado de eso era que la trayectoria se leía, se tenía en la mano, y
   * no se pintaba nunca: el efecto no se volvía a ejecutar y el grupo se había
   * construido sin ella.
   *
   * Aquí está la otra puerta. Y el recentrado se recalcula, porque el centro del
   * grupo se calculó sin la trayectoria y sin recalcularlo la línea de colores
   * sale al lado de la pieza en vez de encima.
   */
  useEffect(() => {
    const grupo = grupoRef.current;
    if (!grupo || !trayectoria || fileType !== '3mf') return;
    anadirTrayectoria(grupo, trayectoria);
    recentrarRef.current?.();
  }, [trayectoria, fileType]);

  return (
    <>
    <div className="viewer-3d-container" ref={mountRef}>
      {loading && <div className="viewer-overlay">Cargando modelo 3D...</div>}
      {error && <div className="viewer-overlay error" role="alert"><p>{error}</p>{onChooseFile && <button type="button" className="btn-primary" onClick={onChooseFile}>Elegir otro archivo</button>}</div>}
    </div>
    <ControlesVisor disabled={loading || !!error}
      mensaje={loading ? 'Preparando el visor…' : error ? 'Puedes elegir otro archivo para continuar.' : vista}
      onAcercar={() => { comandos.current?.zoom(0.8); setVista('Vista ampliada.'); }}
      onAlejar={() => { comandos.current?.zoom(1.25); setVista('Vista alejada.'); }}
      onGirar={() => { comandos.current?.girar(); setVista('Modelo girado 30 grados.'); }}
      onEncuadrar={() => { comandos.current?.encuadrar(); setVista('Modelo encuadrado.'); }} />
    </>
  );
}

/**
 * Construye el objeto que se añade a la escena a partir del archivo subido.
 *
 * Cada loader tiene su propio contrato de salida, y por eso los dos caminos no
 * comparten nada más que el buffer: STL devuelve una única `BufferGeometry`,
 * mientras que 3MF devuelve un `Group` con las mallas del proyecto ya
 * trianguladas y con los materiales declarados en el propio archivo.
 *
 * @throws {Error} Si el archivo no se puede interpretar.
 * @returns El objeto ya centrado en el origen, o `null` si el archivo es
 *   válido pero no trae geometría que enseñar.
 */
function buildModel(format: ViewerFormat, data: ArrayBuffer): THREE.Object3D | null {
  if (format === 'stl') return buildStl(data);
  if (format === 'obj') return buildObj(data);
  return buildThreeMf(data);
}

/** OBJ: un grupo con las mallas declaradas en el archivo. Se respetan los
 * materiales del .mtl si los hay; si no, se aplica el material de la app. */
function buildObj(data: ArrayBuffer): THREE.Object3D | null {
  const texto = new TextDecoder().decode(data);
  const objeto = new OBJLoader().parse(texto);

  // Centrar la geometría
  // Z-up -> Y-up (convención de los slicers)
  objeto.rotation.x = -Math.PI / 2;
  objeto.updateMatrixWorld(true);

  const box = new THREE.Box3().setFromObject(objeto);
  if (box.isEmpty()) return null;
  const centro = box.getCenter(new THREE.Vector3());
  objeto.position.sub(centro);

  // Si el OBJ no traía materiales, aplicar el material de la app a todas las mallas
  let tieneMaterial = false;
  objeto.traverse((child) => {
    if (child instanceof THREE.Mesh && child.material) {
      const mat = Array.isArray(child.material) ? child.material[0] : child.material;
      if (mat && (mat as THREE.MeshStandardMaterial).color) tieneMaterial = true;
    }
  });
  if (!tieneMaterial) {
    const material = new THREE.MeshStandardMaterial({
      color: 0x3b82f6,
      metalness: 0.3,
      roughness: 0.4,
    });
    objeto.traverse((child) => {
      if (child instanceof THREE.Mesh) child.material = material;
    });
  }

  return objeto;
}

/** STL: una sola malla sin color, así que se le aplica el material de la app. */
function buildStl(data: ArrayBuffer): THREE.Object3D {
  const geometry = new STLLoader().parse(data);

  // Centrar la geometría
  geometry.center();
  geometry.computeVertexNormals();

  const material = new THREE.MeshStandardMaterial({
    color: 0x3b82f6,
    metalness: 0.3,
    roughness: 0.4,
  });

  const mesh = new THREE.Mesh(geometry, material);
  // STL no tiene convención de ejes fiable (Thingiverse, Printables, Tinkercad...
  // cada uno exporta como quiere). Se asume Z-up (la convención de los slicers)
  // y se convierte a Y-up, que es lo que espera three.js por defecto. El usuario
  // puede girar con los controles si la pieza venía con otra orientación.
  mesh.rotation.x = -Math.PI / 2;
  return mesh;
}

/**
 * 3MF: un grupo con todas las piezas del proyecto.
 *
 * A diferencia del STL, aquí se respetan los materiales que declara el archivo
 * (grupos de color, texturas o propiedades PBR del slicer): son información de
 * la pieza que el usuario espera ver, no algo que la app deba pisar.
 *
 * El 3MF sí trae una convención de ejes fiable: la especificación lo define
 * siempre Z-up, con el origen en una esquina de la cama. El STL, en cambio, se
 * exporta desde fuentes con criterios dispares (Thingiverse, Printables,
 * Tinkercad...) y muchos ya se ven bien sin tocar, así que se deja como llega.
 */
function buildThreeMf(data: ArrayBuffer): THREE.Object3D | null {
  const group = new ThreeMFLoader().parse(data);

  let meshCount = 0;
  group.traverse((child) => {
    if (child instanceof THREE.Mesh) meshCount += 1;
  });

  if (meshCount === 0) return null;

  // Z-up -> Y-up, que es lo que espera three.js por defecto.
  //
  // El recentrado **no** se hace aquí: lo hace el grupo que agrupa la malla y la
  // trayectoria, para que las dos se muevan lo mismo. Recentrar aquí separaría
  // la trayectoria de la pieza por el vector de centrado.
  group.rotation.x = -Math.PI / 2;

  return group;
}

/**
 * Sitúa la cámara y el punto de interés para que el modelo completo se vea.
 *
 * La distancia sale de la caja envolvente del modelo y del campo de visión más
 * limitante (el vertical o el horizontal, según la proporción del visor), de
 * modo que un .3mf de 20 mm o de 250 mm de ancho se encuadran igual de bien.
 * La cámara se coloca sobre el centro de esa caja y los controles giran a su
 * alrededor, así el encuadre no depende de dónde venga el modelo.
 */
function frameCamera(
  camera: THREE.PerspectiveCamera,
  controls: OrbitControls,
  model: THREE.Object3D
): void {
  const box = new THREE.Box3().setFromObject(model);
  if (box.isEmpty()) return;

  const size = box.getSize(new THREE.Vector3());
  const center = box.getCenter(new THREE.Vector3());
  // La cama (220×220 mm) es el marco mínimo: una pieza pequeña no debe
  // verse como si flotara en el vacío, sino posada sobre la cama.
  const maxDimension = Math.max(size.x, size.y, size.z, 220);

  const verticalFov = THREE.MathUtils.degToRad(camera.fov);
  const horizontalFov = 2 * Math.atan(Math.tan(verticalFov / 2) * camera.aspect);
  const limitingFov = Math.min(verticalFov, horizontalFov);
  const distance = (maxDimension / (2 * Math.tan(limitingFov / 2))) * FRAME_MARGIN;

  camera.position.copy(center).addScaledVector(CAMERA_DIRECTION, distance);
  // Una pieza grande (lazos de calibración, prototipos de 300 mm) puede
  // quedarse fuera del plano lejano que venía por defecto.
  camera.far = Math.max(camera.far, distance * 4);
  camera.updateProjectionMatrix();

  controls.target.copy(center);
  controls.update();
}

export default Viewer3D;
