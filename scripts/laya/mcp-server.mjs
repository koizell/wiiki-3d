#!/usr/bin/env node
/**
 * Servidor MCP (stdio) para Laya.
 *
 * Expone Laya como herramienta de OpenCode sobre el transporte stdio de MCP. No
 * carga pesos ni usa Python: habla por HTTP con un `laya-system-one` en marcha
 * (por defecto `http://127.0.0.1:8080`), que sirve el wire `/v1/systemone`
 * compatible con Jev.
 *
 * Réplica de las herramientas principales del MCP oficial de Laya
 * (`laya-mcp-server`), que aquí no se puede instalar porque `laya` depende de
 * torch y `download.pytorch.org` no es alcanzable en este entorno:
 *   - `laya_status`  → GET /health
 *   - `laya_predict` → POST /v1/systemone (choice / score / noul)
 *
 * Uso: se lanza desde OpenCode (ver `opencode.json` → `mcp.servers.laya`).
 * Variables: `LAYA_URL` (por defecto http://127.0.0.1:8080), `LAYA_MODEL`
 * (por defecto `laya-multilingual`), `LAYA_TIMEOUT_MS`.
 */
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { z } from 'zod';

const LAYA = (process.env.LAYA_URL ?? 'http://127.0.0.1:8080').replace(/\/+$/, '');
const MODELO = process.env.LAYA_MODEL ?? 'laya-multilingual';
const TIMEOUT = Number(process.env.LAYA_TIMEOUT_MS ?? '120000');

/** Llama al servidor de Laya con timeout y devuelve `{ ok, status, texto }`. */
async function llamar(ruta, init) {
  try {
    const res = await fetch(`${LAYA}${ruta}`, { ...init, signal: AbortSignal.timeout(TIMEOUT) });
    return { ok: res.ok, status: res.status, texto: await res.text() };
  } catch (err) {
    const detalle = err instanceof Error ? err.message : String(err);
    return {
      ok: false,
      status: 0,
      texto: `No se pudo contactar con Laya en ${LAYA}: ${detalle}. ¿Está en marcha? (npx laya-system-one --port 8080)`,
    };
  }
}

const servidor = new McpServer({ name: 'laya', version: '1.0.0' });

servidor.registerTool(
  'laya_status',
  {
    title: 'Estado de Laya',
    description:
      'Comprueba que el servidor local de Laya está en marcha y devuelve el modelo ' +
      'cargado, la versión y el protocolo. Úsalo antes de la primera decisión si ' +
      'dudas de si Laya está disponible.',
    inputSchema: {},
  },
  async () => {
    const r = await llamar('/health');
    return { isError: !r.ok, content: [{ type: 'text', text: r.texto }] };
  }
);

servidor.registerTool(
  'laya_predict',
  {
    title: 'Decisión tipada con Laya',
    description:
      'Haz una decisión tipada con Laya: dale un estado (texto o JSON) y preguntas ' +
      'tipadas, y devuelve respuestas con probabilidades calibradas. Los tipos son ' +
      '`choice` (criterios = objeto id→etiqueta), `score` (criterios = array de ' +
      'etiquetas ordenadas) y `noul` (probabilidad de verdadero, sin criterios). No ' +
      'genera texto libre.',
    inputSchema: {
      state: z
        .union([z.string(), z.record(z.string(), z.unknown())])
        .describe('El estado a evaluar: un texto o un objeto JSON (p. ej. una cabecera de G-code).'),
      questions: z
        .record(
          z.string(),
          z.object({
            type: z.enum(['choice', 'score', 'noul']),
            instructions: z.string().describe('Qué se pregunta, en lenguaje natural.'),
            criteria: z
              .union([z.record(z.string(), z.string()), z.array(z.string())])
              .optional()
              .describe('choice: objeto id→etiqueta. score: array de etiquetas ordenadas. noul: se omite.'),
          })
        )
        .describe('Preguntas indexadas por su id.'),
      model: z.string().optional().describe('Checkpoint: `laya-multilingual` (por defecto) o `laya-english`.'),
    },
  },
  async ({ state, questions, model }) => {
    const r = await llamar('/v1/systemone', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ state, questions, model: model ?? MODELO }),
    });
    if (!r.ok) {
      return { isError: true, content: [{ type: 'text', text: `Laya ${r.status}: ${r.texto.slice(0, 600)}` }] };
    }
    return { content: [{ type: 'text', text: r.texto }] };
  }
);

const transporte = new StdioServerTransport();
await servidor.connect(transporte);
console.error(`[laya-mcp] listo · ${LAYA} · modelo ${MODELO}`);
