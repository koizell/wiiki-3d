import assert from 'node:assert/strict';
import { arrancarPreview } from './probe.mjs';

const base = process.env.BASE_URL;
assert(base, 'Ejecutar con BASE_URL de un preview propio');
const servidor = await arrancarPreview(5287);
try {
  assert.equal(servidor.base, base, 'el verificador debe usar BASE_URL, nunca otra sesión');
  servidor.detener();
  assert((await fetch(base)).ok, 'detener no debe cerrar un servidor proporcionado por BASE_URL');
  console.log('OK: BASE_URL respetada y servidor externo conservado');
} finally { servidor.detener(); }
