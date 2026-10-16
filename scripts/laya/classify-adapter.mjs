#!/usr/bin/env node
/**
 * Adaptador local: expone el `POST /classify` que espera `JevService` y lo
 * traduce al `POST /v1/systemone` de Laya, que es wire-compatible con el
 * protocolo de Jev.
 *
 * Por qué hace falta, si "Laya es compatible con Jev":
 *   - La ruta no coincide: el cliente llama a `/classify`; Laya sirve
 *     `/v1/systemone`.
 *   - La envoltura no coincide: `JevService.toClassification` lee
 *     `data.answers` (envoltura de Jev `{ code, message, data }`), mientras que
 *     Laya devuelve `{ answers, model, usage }` en la raíz.
 *
 * Todo lo demás ya encaja: los tipos de pregunta (`choice` / `score` / `noul`),
 * el `state` + `questions` y la forma de `criteria` (objeto en `choice`, array
 * en `score`) son idénticos.
 *
 * Uso (desarrollo local, dos terminales):
 *   1) Laya:     npx laya-system-one --port 8080
 *   2) Adaptador: node scripts/laya/classify-adapter.mjs
 *   3) App:      VITE_JEV_USE_MOCK=false VITE_JEV_PROXY_URL=http://127.0.0.1:8787 npm run dev
 *
 * Sólo escucha en 127.0.0.1: no está pensado para exponerse a internet.
 */
import http from 'node:http';

/** Lee `--clave valor` de la línea de órdenes. */
function arg(nombre, porDefecto) {
  const i = process.argv.indexOf(`--${nombre}`);
  return i !== -1 && process.argv[i + 1] !== undefined ? process.argv[i + 1] : porDefecto;
}

const PUERTO = Number(arg('port', process.env.LAYA_ADAPTER_PORT ?? '8787'));
const LAYA = (arg('laya', process.env.LAYA_URL ?? 'http://127.0.0.1:8080')).replace(/\/+$/, '');
const MODELO = arg('model', process.env.LAYA_MODEL ?? 'laya-multilingual');
const ORIGEN = arg('origin', process.env.ALLOWED_ORIGIN ?? '*');

const cors = {
  'Access-Control-Allow-Origin': ORIGEN,
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
  Vary: 'Origin',
};

function responder(res, status, cuerpo) {
  res.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8', ...cors });
  res.end(JSON.stringify(cuerpo));
}

const servidor = http.createServer((req, res) => {
  if (req.method === 'OPTIONS') {
    res.writeHead(204, cors);
    return res.end();
  }
  if (req.method !== 'POST' || !(req.url ?? '').startsWith('/classify')) {
    return responder(res, 404, { error: 'Sólo POST /classify' });
  }

  let crudo = '';
  req.on('data', (trozo) => {
    crudo += trozo;
  });
  req.on('end', async () => {
    try {
      const payload = JSON.parse(crudo);
      const arriba = await fetch(`${LAYA}/v1/systemone`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...payload, model: payload.model ?? MODELO }),
      });
      const texto = await arriba.text();
      if (!arriba.ok) {
        return responder(res, arriba.status, { error: texto.slice(0, 400) });
      }
      const laya = JSON.parse(texto);
      // La forma que `JevService.toClassification` sabe leer: `data.answers`
      // (y `data.guidance` opcional).
      return responder(res, 200, {
        code: 0,
        message: null,
        data: { answers: laya.answers, guidance: laya.guidance ?? null },
      });
    } catch (err) {
      const detalle = err instanceof Error ? err.message : String(err);
      return responder(res, 502, { error: `Adaptador Laya: ${detalle}` });
    }
  });
});

servidor.listen(PUERTO, '127.0.0.1', () => {
  console.log(
    `[laya-adapter] POST /classify -> ${LAYA}/v1/systemone  ·  http://127.0.0.1:${PUERTO}  ·  modelo ${MODELO}`
  );
});
