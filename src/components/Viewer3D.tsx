import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

interface Viewer3DProps {
  file: File;
}

function Viewer3D({ file }: Viewer3DProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!mountRef.current || !file) return;

    const currentMount = mountRef.current;
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

    // 4. Cargar el archivo STL
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const contents = e.target?.result as ArrayBuffer;
        const loader = new STLLoader();
        const geometry = loader.parse(contents);

        // Centrar la geometría
        geometry.center();
        geometry.computeVertexNormals();

        const material = new THREE.MeshStandardMaterial({
          color: 0x3b82f6,
          metalness: 0.3,
          roughness: 0.4,
        });

        const mesh = new THREE.Mesh(geometry, material);
        scene.add(mesh);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError('Error al procesar el archivo STL.');
        setLoading(false);
      }
    };
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
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationId);
      controls.dispose();
      renderer.dispose();
      if (currentMount.contains(renderer.domElement)) {
        currentMount.removeChild(renderer.domElement);
      }
    };
  }, [file]);

  return (
    <div className="viewer-3d-container" ref={mountRef}>
      {loading && <div className="viewer-overlay">Cargando modelo 3D...</div>}
      {error && <div className="viewer-overlay error">{error}</div>}
    </div>
  );
}

export default Viewer3D;