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
  const documentos = new Map();
  const pendientes = new Set();
  const proxy = createServer(async (req, res) => {
    const solicitud = new URL(req.url, 'http://proxy');
    if (solicitud.pathname === '/__taller_test_retenido__.js') {
      retenidas.add(solicitud.searchParams.get('id'));
      return; // La respuesta queda abierta hasta cerrar el proxy.
    }
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
      if (salida.location && respuesta.status >= 300 && respuesta.status < 400) {
        const destino = new URL(salida.location, respuesta.url);
        if (destino.origin !== new URL(upstream).origin) {
          throw new Error(`Redirección fuera del proxy: ${destino.href}`);
        }
        salida.location = `${destino.pathname}${destino.search}${destino.hash}`;
      }
      const html = respuesta.ok && req.method !== 'HEAD' &&
        (respuesta.headers.get('content-type') ?? '').includes('text/html');
      if (html) {
        const contenido = await respuesta.text();
        if (!/<\/head\s*>/i.test(contenido)) throw new Error('HTML sin cierre de head');
        const id = String(documentos.size + 1);
        documentos.set(id, new URL(req.url, upstream).pathname);
        const inyeccion = `<script async src="/__taller_test_retenido__.js?id=${id}"></script>`;
        delete salida['content-length'];
        delete salida['content-encoding'];
        delete salida.etag;
        res.writeHead(respuesta.status, salida);
        res.end(contenido.replace(/<\/head\s*>/i, `${inyeccion}</head>`));
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
  await escuchar(proxy);
  return {
    base: `http://127.0.0.1:${proxy.address().port}`,
    retenidas,
    documentos,
    async cerrar() {
      for (const controller of pendientes) controller.abort();
      await cerrarServidor(proxy);
    },
  };
}

export async function iniciarSitio(base) {
  if (base) return { base, cerrar: async () => {} };
  const { createServer: createViteServer } = await import('vite');
  const server = await createViteServer({ server: { host: '127.0.0.1', port: 0 } });
  try {
    await server.listen();
    return {
      base: `http://127.0.0.1:${server.httpServer.address().port}`,
      cerrar: () => server.close(),
    };
  } catch (error) {
    await server.close();
    throw error;
  }
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
