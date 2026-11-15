// Regresión: un script externo sin respuesta no debe impedir verificar Taller.
// Requiere el servidor de BASE_URL (por defecto, http://127.0.0.1:5199).
import assert from 'node:assert/strict';
import { createServer } from 'node:http';
import { spawn } from 'node:child_process';

const upstream = process.env.BASE_URL ?? 'http://127.0.0.1:5199';
const retenidas = new Set();
const sockets = new Set();
const externo = createServer((req, res) => {
  retenidas.add(new URL(req.url, 'http://externo').searchParams.get('documento'));
  // No responder: cada documento permanece sin alcanzar el evento load.
  res.on('error', () => {});
});
const escuchar = (server) => new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
await escuchar(externo);
const proxy = createServer(async (req, res) => {
  try {
    const respuesta = await fetch(new URL(req.url, upstream), {
      headers: { 'accept-encoding': 'identity' },
    });
    const tipo = respuesta.headers.get('content-type') ?? '';
    res.writeHead(respuesta.status, { 'content-type': tipo });
    if (tipo.includes('text/html')) {
      const html = await respuesta.text();
      const documento = encodeURIComponent(new URL(req.url, upstream).pathname);
      res.end(html.replace('</head>', `<script async src="http://127.0.0.1:${externo.address().port}/retenido.js?documento=${documento}"></script></head>`));
    } else {
      res.end(Buffer.from(await respuesta.arrayBuffer()));
    }
  } catch (error) {
    res.writeHead(502).end(String(error));
  }
});
for (const server of [externo, proxy]) {
  server.on('connection', (socket) => {
    sockets.add(socket);
    socket.on('close', () => sockets.delete(socket));
  });
}
await escuchar(proxy);

try {
  const child = spawn(process.execPath, ['scripts/verify/taller.mjs'], {
    env: { ...process.env, BASE_URL: `http://127.0.0.1:${proxy.address().port}` },
    detached: true,
    stdio: ['ignore', 'pipe', 'pipe'],
  });
  let output = '';
  child.stdout.on('data', (data) => { output += data; });
  child.stderr.on('data', (data) => { output += data; });
  let agotado = false;
  const timeout = setTimeout(() => {
    agotado = true;
    process.kill(-child.pid, 'SIGKILL');
  }, Number(process.env.TALLER_TEST_TIMEOUT_MS ?? 120000));
  const exit = await new Promise((resolve, reject) => {
    child.on('error', reject);
    child.on('close', (code) => resolve(code));
  });
  clearTimeout(timeout);
  assert.ok(retenidas.has('/taller'), 'no se retuvo un script en /taller');
  assert.ok(!agotado, 'verify:taller quedó bloqueado esperando load');
  assert.equal(exit, 0, `verify:taller falló:\n${output}`);
  assert.match(output, /TODAS LAS COMPROBACIONES PASAN/);
  assert.ok(retenidas.has('/'), 'no se retuvo un script en /');
  console.log('OK: verify:taller termina con scripts externos retenidos en /taller y /');
} finally {
  for (const socket of sockets) socket.destroy();
  proxy.close();
  externo.close();
}
