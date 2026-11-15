import * as THREE from 'three';

/** Centra la unión en el mundo sin alterar las posiciones relativas de sus hijos. */
export function recentrarGrupo3mf(grupo: THREE.Group): void {
  grupo.updateWorldMatrix(true, true);
  const caja = new THREE.Box3().setFromObject(grupo);
  if (caja.isEmpty()) return;
  const centro = caja.getCenter(new THREE.Vector3());
  if (grupo.parent) {
    // La posición del grupo está en coordenadas del padre, no del mundo.
    const origen = grupo.parent.worldToLocal(new THREE.Vector3());
    centro.copy(grupo.parent.worldToLocal(centro).sub(origen));
  }
  grupo.position.sub(centro);
}
