import { createServer } from 'node:http';
import { spawn } from 'node:child_process';

const escuchar = (server) => new Promise((resolve, reject) => {
  server.once('error', reject);
  server.listen(0, '127.0.0.1', resolve);
});
const cerrarServidor = (server) => new Promise((resolve, reject) => {
  server.close((error) => error ? reject(error) : resolve());
  server.closeAllConnections();
});

export async function crearProxy(upstream) {
  const retenidas = new Set();
  const pendientes = new Set();
  const externo = createServer((req) => {
    retenidas.add(new URL(req.url, 'http://externo').searchParams.get('documento'));
    // La respuesta queda abierta hasta cerrar el proxy.
  });
  await escuchar(externo);
  const proxy = createServer(async (req, res) => {
    const controller = new AbortController();
    pendientes.add(controller);
    const abortar = () => { if (!res.writableFinished) controller.abort(); };
    res.on('close', abortar);
    try {
      const headers = { ...req.headers, 'accept-encoding': 'identity' };
      delete headers.host;
      delete headers.connection;
      const opciones = { method: req.method, headers, redirect: 'manual', signal: controller.signal };
      if (req.method !== 'GET' && req.method !== 'HEAD') {
        opciones.body = req;
        opciones.duplex = 'half';
      }
      const respuesta = await fetch(new URL(req.url, upstream), opciones);
      const salida = Object.fromEntries(respuesta.headers);
      const cookies = respuesta.headers.getSetCookie();
      if (cookies.length) salida['set-cookie'] = cookies;
      delete salida.connection;
      delete salida['transfer-encoding'];
      const html = respuesta.ok && req.method !== 'HEAD' &&
        (respuesta.headers.get('content-type') ?? '').includes('text/html');
      if (html) {
        const contenido = await respuesta.text();
        const documento = encodeURIComponent(new URL(req.url, upstream).pathname);
        const inyeccion = `<script async src="http://127.0.0.1:${externo.address().port}/retenido.js?documento=${documento}"></script>`;
        delete salida['content-length'];
        delete salida['content-encoding'];
        delete salida.etag;
        res.writeHead(respuesta.status, salida);
        res.end(contenido.replace('</head>', `${inyeccion}</head>`));
      } else {
        const contenido = Buffer.from(await respuesta.arrayBuffer());
        // fetch descomprime respuestas codificadas incluso si se pidió identity.
        if (salida['content-encoding']) {
          delete salida['content-encoding'];
          delete salida['content-length'];
        }
        res.writeHead(respuesta.status, salida);
        res.end(contenido);
      }
    } catch (error) {
      if (!res.destroyed) {
        if (!res.headersSent) res.writeHead(502);
        res.end(String(error));
      }
    } finally {
      pendientes.delete(controller);
      res.off('close', abortar);
    }
  });
  try {
    await escuchar(proxy);
  } catch (error) {
    await cerrarServidor(externo);
    throw error;
  }
  return {
    base: `http://127.0.0.1:${proxy.address().port}`,
    retenidas,
    async cerrar() {
      for (const controller of pendientes) controller.abort();
      await Promise.all([cerrarServidor(proxy), cerrarServidor(externo)]);
    },
  };
}

export async function ejecutar(comando, args, env, timeoutMs) {
  const child = spawn(comando, args, {
    env, detached: true, stdio: ['ignore', 'pipe', 'pipe'],
  });
  let output = '';
  child.stdout.on('data', (data) => { output += data; });
  child.stderr.on('data', (data) => { output += data; });
  let agotado = false;
  const timeout = setTimeout(() => {
    agotado = true;
    if (child.pid) {
      try { process.kill(-child.pid, 'SIGKILL'); }
      catch (error) { if (error.code !== 'ESRCH') throw error; }
    }
  }, timeoutMs);
  try {
    const exit = await new Promise((resolve, reject) => {
      child.on('error', reject);
      child.on('close', resolve);
    });
    return { exit, output, agotado };
  } finally {
    clearTimeout(timeout);
  }
}
