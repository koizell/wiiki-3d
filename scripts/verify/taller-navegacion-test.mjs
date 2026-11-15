// Regresión: un script externo sin respuesta no debe impedir verificar Taller.
import assert from 'node:assert/strict';
import { crearProxy, ejecutar } from './taller-navegacion-proxy.mjs';

const proxy = await crearProxy(process.env.BASE_URL ?? 'http://127.0.0.1:5199');
try {
  const { exit, output, agotado } = await ejecutar(
    process.execPath,
    ['scripts/verify/taller.mjs'],
    { ...process.env, BASE_URL: proxy.base },
    Number(process.env.TALLER_TEST_TIMEOUT_MS ?? 120000),
  );
  assert.ok(proxy.retenidas.has('/taller'), 'no se retuvo un script en /taller');
  assert.ok(!agotado, 'verify:taller quedó bloqueado esperando load');
  assert.equal(exit, 0, `verify:taller falló:\n${output}`);
  assert.match(output, /TODAS LAS COMPROBACIONES PASAN/);
  assert.ok(proxy.retenidas.has('/'), 'no se retuvo un script en /');
  console.log('OK: verify:taller termina con scripts externos retenidos en /taller y /');
} finally {
  await proxy.cerrar();
}
