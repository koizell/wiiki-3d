import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader.js';
import { ThreeMFLoader } from 'three/examples/jsm/loaders/3MFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

/**
 * Formatos de malla que Viewer3D sabe construir en la escena. El enrutado desde
 * la extensión del archivo hasta aquí lo hace `App`.
 */
export type ViewerFormat = 'stl' | '3mf';

interface Viewer3DProps {
  file: File;
  fileType: ViewerFormat;
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
};

/**
 * Un 3MF bien formado puede no traer geometría: un proyecto recién creado,
 * solo con ajustes de laminado, o con objetos vacíos.
 */
const EMPTY_3MF_MESSAGE = 'El archivo 3MF no contiene geometría que se pueda mostrar.';

function Viewer3D({ file, fileType }: Viewer3DProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

    // 2. Luces
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);

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

        scene.add(model);

        // Solo el 3MF reencuadra: viene del slicer con sus coordenadas reales
        // (sobre la cama de impresión) y con un número de piezas variable. El
        // STL conserva la cámara por defecto, que ya está afinada para piezas
        // en milímetros.
        if (fileType === '3mf') frameCamera(camera, controls, model);

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

  return (
    <div className="viewer-3d-container" ref={mountRef}>
      {loading && <div className="viewer-overlay">Cargando modelo 3D...</div>}
      {error && <div className="viewer-overlay error">{error}</div>}
    </div>
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
  return buildThreeMf(data);
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

  return new THREE.Mesh(geometry, material);
}

/**
 * 3MF: un grupo con todas las piezas del proyecto.
 *
 * A diferencia del STL, aquí se respetan los materiales que declara el archivo
 * (grupos de color, texturas o propiedades PBR del slicer): son información de
 * la pieza que el usuario espera ver, no algo que la app deba pisar.
 */
function buildThreeMf(data: ArrayBuffer): THREE.Object3D | null {
  const group = new ThreeMFLoader().parse(data);

  let meshCount = 0;
  group.traverse((child) => {
    if (child instanceof THREE.Mesh) meshCount += 1;
  });

  if (meshCount === 0) return null;

  // El grupo llega en el origen pero con las coordenadas reales del slicer, que
  // miden en milímetros y tienen su origen en una esquina de la cama de
  // impresión: se recentra el conjunto entero para que la escena quede limpia.
  const box = new THREE.Box3().setFromObject(group);
  if (!box.isEmpty()) {
    const center = box.getCenter(new THREE.Vector3());
    group.position.set(-center.x, -center.y, -center.z);
  }

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
  const maxDimension = Math.max(size.x, size.y, size.z);

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