// Regresión: un script externo sin respuesta no debe impedir verificar Taller.
import assert from 'node:assert/strict';
import { crearProxy, ejecutar, iniciarSitio } from './taller-navegacion-proxy.mjs';

const sitio = await iniciarSitio(process.env.BASE_URL);
let proxy;
try {
  proxy = await crearProxy(sitio.base);
  const { exit, output, agotado } = await ejecutar(
    process.execPath,
    ['scripts/verify/taller.mjs'],
    { ...process.env, BASE_URL: proxy.base },
    Number(process.env.TALLER_TEST_TIMEOUT_MS ?? 120000),
  );
  assert.ok([...proxy.documentos.values()].includes('/taller'), 'no se sirvió /taller');
  assert.ok(!agotado, 'verify:taller quedó bloqueado esperando load');
  assert.equal(exit, 0, `verify:taller falló:\n${output}`);
  assert.match(output, /TODAS LAS COMPROBACIONES PASAN/);
  assert.ok([...proxy.documentos.values()].includes('/'), 'no se sirvió /');
  const sinRetener = [...proxy.documentos].filter(([id]) => !proxy.retenidas.has(id));
  assert.deepEqual(sinRetener, [], 'hay documentos sin script retenido');
  console.log('OK: verify:taller termina con scripts externos retenidos en /taller y /');
} finally {
  try {
    if (proxy) await proxy.cerrar();
  } finally {
    await sitio.cerrar();
  }
}
