import assert from 'node:assert/strict';
import { createServer } from 'node:http';
import { test } from 'node:test';
import { crearProxy, ejecutar } from './taller-navegacion-proxy.mjs';

const escuchar = (server) => new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
const url = (server) => `http://127.0.0.1:${server.address().port}`;

test('el proxy conserva redirecciones, cabeceras y cookies', async () => {
  const upstream = createServer((req, res) => {
    if (req.url === '/redirect') {
      res.writeHead(302, { location: '/destino', 'set-cookie': ['a=1', 'b=2'], 'content-security-policy': "default-src 'self'" });
      res.end();
    } else {
      res.writeHead(200, { 'content-type': 'text/html', 'content-security-policy': "default-src 'self'", 'set-cookie': ['a=1', 'b=2'] });
      res.end('<head></head>');
    }
  });
  await escuchar(upstream);
  const proxy = await crearProxy(url(upstream));
  try {
    const redir = await fetch(`${proxy.base}/redirect`, { redirect: 'manual' });
    assert.equal(redir.status, 302);
    assert.equal(redir.headers.get('location'), '/destino');
    assert.deepEqual(redir.headers.getSetCookie(), ['a=1', 'b=2']);
    assert.equal(redir.headers.get('content-security-policy'), "default-src 'self'");
    const html = await fetch(`${proxy.base}/`);
    assert.equal(html.headers.get('content-security-policy'), "default-src 'self'");
    assert.deepEqual(html.headers.getSetCookie(), ['a=1', 'b=2']);
    assert.match(await html.text(), /retenido\.js/);
  } finally {
    await proxy.cerrar();
    upstream.closeAllConnections();
    await new Promise((resolve) => upstream.close(resolve));
  }
});

test('cerrar cancela peticiones upstream colgadas', { timeout: 5000 }, async () => {
  let recibida;
  const llegada = new Promise((resolve) => { recibida = resolve; });
  let desconectada;
  const desconexion = new Promise((resolve) => { desconectada = resolve; });
  const upstream = createServer((req) => {
    req.socket.once('close', desconectada);
    recibida();
  });
  await escuchar(upstream);
  const proxy = await crearProxy(url(upstream));
  const request = fetch(proxy.base).catch(() => {});
  try {
    await llegada;
    await proxy.cerrar();
    await request;
    await desconexion;
  } finally {
    upstream.closeAllConnections();
    await new Promise((resolve) => upstream.close(resolve));
  }
});

test('spawn fallido limpia el temporizador', async () => {
  await assert.rejects(ejecutar('/ruta/inexistente/taller', [], {}, 50), { code: 'ENOENT' });
  await new Promise((resolve) => setTimeout(resolve, 100));
});

test('timeout termina el proceso bloqueado', async () => {
  const resultado = await ejecutar(process.execPath, ['-e', 'setInterval(() => {}, 1000)'], process.env, 100);
  assert.equal(resultado.agotado, true);
  assert.equal(resultado.exit, null);
});

test('upstream inaccesible devuelve 502', async () => {
  const upstream = createServer();
  await escuchar(upstream);
  const destino = url(upstream);
  await new Promise((resolve) => upstream.close(resolve));
  const proxy = await crearProxy(destino);
  try {
    assert.equal((await fetch(proxy.base)).status, 502);
  } finally {
    await proxy.cerrar();
  }
});
