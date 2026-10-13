#!/usr/bin/env node
/**
 * Verificación de las fuentes de la wiki.
 *
 * ## Qué resuelve
 *
 * El pipeline tiene tres fases de ida (recolector → cocinero → redactor) y una
 * de vuelta (revisor), pero nada comprobaba que las ~50 fuentes de `wiki/raw/`
 * sigan vivas: una KB que muda un artículo, una URL que se retira o una página
 * que se convierte en un aviso de 551 caracteres dejaban la guía vieja sin
 * que nadie lo supiera. Este script convierte la fase de «revisión» en algo
 * medible: dice qué fuente cambió, cuál se rompió y cuál ya no es fuente.
 *
 * ## Los dos modos
 *
 * ```
 * node scripts/wiki/fuentes.mjs --verificar   # va a la red, respeta robots.txt
 * node scripts/wiki/fuentes.mjs --cambios     # igual, pero sólo imprime cambios
 * ```
 *
 * Sale con código 1 si alguna fuente está ROTA, BLOQUEADA o es CÁSCARA. Una
 * fuente CAMBIADA no es un fallo: es el aviso para reprocesarla.
 *
 * ## Por qué respeta el robots.txt, y cómo
 *
 * No por cortesía genérica: `help.prusa3d.com`, la fuente principal de la
 * wiki, sirve `Crawl-delay: 10` —máximo seis peticiones por minuto— y este
 * script la visita decenas de veces por pasada. El respeto se implementa
 * según lo que dice la norma (RFC 9309) y lo que dicen las fuentes:
 *
 *   - **User-Agent identificable**, con URL a la que escribir. La norma lo
 *     recomienda y es lo que permite que un operario de Prusa sepa quién
 *     llama y diga algo si molesta.
 *   - **Crawl-delay del grupo `*`** leído del robots.txt de cada host, con
 *     espera real entre peticiones al mismo host. Si el host no declara
 *     nada, se usa 1 s: no hay razón para llamar más rápido.
 *   - **Caché de robots.txt en memoria** durante la ejecución (la norma pone
 *     el techo en 24 h; aquí no hace falta caché en disco porque cada pasada
 *     empieza limpia).
 *   - **`allow`/`disallow` respetados**: si el robots del host prohíbe la
 *     ruta, la fuente sale BLOQUEADA y no se pide.
 *
 * ## El anti-cáscara
 *
 * Se mide el **tamaño del cuerpo**, no sólo el código HTTP. La trampa que ya
 * coló una afirmación falsa en `warping-pla` fue una página 200 con 551
 * caracteres de texto de aviso: pasa cualquier comprobación mecánica y
 * envenena el material. Menos de 1.000 caracteres de texto útil ⇒ CÁSCARA.
 *
 * ## El registro
 *
 * `wiki/fuentes.json` guarda, por URL: bytes y sha256 del cuerpo remoto de
 * la última verificación. Con eso **CAMBIÓ** significa que el cuerpo ya no
 * es el mismo, no que la página «parece distinta». El fichero se versiona:
 * es la memoria del proyecto sobre sus fuentes.
 */

import { createHash } from 'node:crypto';
import { readFileSync, writeFileSync, readdirSync, existsSync } from 'node:fs';
import { join } from 'node:path';

/** Dónde viven las fuentes crudas. Inmutable: este script nunca escribe ahí. */
const RAW_DIR = new URL('../../wiki/raw/', import.meta.url).pathname;
/** La memoria de las verificaciones. Versionada en git. */
const REGISTRO = new URL('../../wiki/fuentes.json', import.meta.url).pathname;

/**
 * Versión del registro. La 1 guardaba el sha del HTML crudo, que cambia con
 * los nonces que inyectan las KB de Prusa aunque no cambie una palabra; la 2
 * guarda el del texto normalizado. Un registro en versión anterior se descarta
 * entero y la pasada siguiente trata todo como primera verificación: comparar
 * métricas distintas habría marcado las cincuenta fuentes como CAMBIÓ.
 */
const VERSION_REGISTRO = 2;

/** User-Agent del crawler, con contacto. RFC 9309 recomienda identificarse. */
const UA = 'wiiki-3d-fuentes/1.0 (+https://wiiki-3d.com)';
/** Cuerpo útil por debajo de esto = página-aviso, no fuente. */
const MIN_CARACTERES = 1000;
/** Timeout por petición, en ms. */
const TIMEOUT_MS = 20000;

const args = new Set(process.argv.slice(2));
const SOLO_CAMBIOS = args.has('--cambios');
const limite = (() => {
  const i = process.argv.indexOf('--limite');
  return i > -1 ? Number(process.argv[i + 1]) : Infinity;
})();

/* ------------------------------------------------------------------ *
 * Lectura de wiki/raw/
 * ------------------------------------------------------------------ */

/** Extrae el frontmatter YAML mínimo de una fuente cruda. */
function leerFuente(ruta) {
  const texto = readFileSync(ruta, 'utf8');
  const m = texto.match(/^---\n([\s\S]*?)\n---/);
  if (!m) return null;
  const campos = {};
  for (const linea of m[1].split('\n')) {
    const kv = linea.match(/^([a-z]+):\s*(.+)$/);
    if (kv) campos[kv[1]] = kv[2].replace(/^["']|["']$/g, '');
  }
  if (!campos.url) return null;
  return {
    fichero: ruta.replace(RAW_DIR, ''),
    url: campos.url,
    sitio: campos.sitio ?? new URL(campos.url).hostname,
    titulo: campos.titulo ?? campos.url,
    capturado: campos.capturado ?? '—',
  };
}

/* ------------------------------------------------------------------ *
 * robots.txt, con la semántica mínima que importa aquí
 * ------------------------------------------------------------------ */

/**
 * Cache de robots por host, en memoria y con caducidad.
 *
 * La RFC 9309 §2.4 pone el techo de uso en 24 h; esta ejecución no necesita
 * más. Un 4xx (salvo 429) significa, según la propia norma, que el robots no
 * existe y no hay reglas; un 5xx o error de red significa «undefined» y se
 * asume disallow completo —la interpretación conservadora, que es la correcta.
 */
const robotsCache = new Map();

async function robotsDe(host) {
  if (robotsCache.has(host)) return robotsCache.get(host);
  let reglas = { crawlDelay: 1, disallow: [], allow: [], ilegible: false };
  try {
    const r = await fetch(`https://${host}/robots.txt`, {
      headers: { 'User-Agent': UA },
      signal: AbortSignal.timeout(TIMEOUT_MS),
    });
    if (r.ok) {
      const texto = await r.text();
      let enGrupoNuestro = false;
      for (const linea of texto.split('\n')) {
        const l = linea.replace(/#.*$/, '').trim();
        const m = l.match(/^([a-zA-Z-]+)\s*:\s*(.*)$/);
        if (!m) continue;
        const [, campo, valor] = m;
        if (campo.toLowerCase() === 'user-agent') {
          enGrupoNuestro = valor.trim() === '*';
        } else if (enGrupoNuestro) {
          if (campo.toLowerCase() === 'crawl-delay') {
            const d = Number(valor);
            if (Number.isFinite(d) && d > 0) reglas.crawlDelay = d;
          } else if (campo.toLowerCase() === 'disallow') {
            if (valor.trim()) reglas.disallow.push(valor.trim());
          } else if (campo.toLowerCase() === 'allow') {
            if (valor.trim()) reglas.allow.push(valor.trim());
          }
        }
      }
    } else if (r.status >= 500) {
      reglas.ilegible = true;
    }
    // 4xx: sin robots → sin reglas (RFC 9309 §2.3.1.3).
  } catch {
    reglas.ilegible = true; // red caída: interpretar como disallow.
  }
  robotsCache.set(host, reglas);
  return reglas;
}

/** ¿El robots de este host permite esta ruta? Later-match gana (RFC 9309). */
function permitida(reglas, url) {
  const path = new URL(url).pathname;
  const especifico = (lista) =>
    lista.filter((p) => path.startsWith(p)).sort((a, b) => b.length - a.length)[0];
  const disallow = especifico(reglas.disallow);
  const allow = especifico(reglas.allow);
  if (disallow && allow) return allow.length > disallow.length;
  if (disallow) return false;
  return true;
}

/* ------------------------------------------------------------------ *
 * Ritmo: una petición por host cada crawl-delay
 * ------------------------------------------------------------------ */

const ultimaPorHost = new Map();

async function esperarTurno(host, delaySeg) {
  const ultima = ultimaPorHost.get(host) ?? 0;
  const espera = ultima + delaySeg * 1000 - Date.now();
  if (espera > 0) await new Promise((r) => setTimeout(r, espera));
  ultimaPorHost.set(host, Date.now());
}

/* ------------------------------------------------------------------ *
 * Verificación de una URL
 * ------------------------------------------------------------------ */

async function verificar(fuente, registroPrevio) {
  const host = new URL(fuente.url).hostname;
  const reglas = await robotsDe(host);
  if (reglas.ilegible) return { ...fuente, estado: 'BLOQUEADA', nota: `robots ilegible (${host})` };
  if (!permitida(reglas, fuente.url)) {
    return { ...fuente, estado: 'BLOQUEADA', nota: 'robots.txt lo prohíbe' };
  }

  await esperarTurno(host, reglas.crawlDelay);
  let r;
  try {
    r = await fetch(fuente.url, {
      headers: { 'User-Agent': UA, Accept: 'text/html,*/*' },
      redirect: 'follow',
      signal: AbortSignal.timeout(TIMEOUT_MS),
    });
  } catch {
    return { ...fuente, estado: 'ROTA', nota: 'no responde' };
  }
  if (r.status >= 400) return { ...fuente, estado: 'ROTA', nota: `HTTP ${r.status}` };

  const cuerpo = await r.text();
  const bytes = Buffer.byteLength(cuerpo);
  // Hash del TEXTO, no del HTML: las KB de Prusa inyectan nonces y tokens en
  // sus <script>, así que el sha del cuerpo crudo cambia sin que cambie una
  // palabra del artículo —la primera pasada marcaba cinco CAMBIÓ que no lo
  // eran. Normalizar primero es la diferencia entre «cambió el texto» y
  // «cambió el ruido».
  const util = cuerpo
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ').trim();
  const sha = createHash('sha256').update(util).digest('hex').slice(0, 16);

  if (util.length < MIN_CARACTERES) {
    return {
      ...fuente, estado: 'CÁSCARA', nota: `200 con ${util.length} caract. de texto`,
      bytes, sha,
    };
  }

  if (registroPrevio && registroPrevio.sha !== sha) {
    return { ...fuente, estado: 'CAMBIÓ', nota: `${registroPrevio.bytes} → ${bytes} bytes`, bytes, sha };
  }
  if (!registroPrevio) return { ...fuente, estado: 'VIVA', nota: 'primera verificación', bytes, sha };
  return { ...fuente, estado: 'VIVA', bytes, sha };
}

/* ------------------------------------------------------------------ *
 * Main
 * ------------------------------------------------------------------ */

const fuentes = readdirSync(RAW_DIR)
  .filter((f) => f.endsWith('.md'))
  .map((f) => leerFuente(join(RAW_DIR, f)))
  .filter(Boolean)
  .slice(0, limite);

/*
 * Deduplicar por URL antes de salir a la red.
 *
 * Varios ficheros crudos comparten fuente —dos guías citan la misma tabla de
 * materiales de Bambu, y «chamber temperature» se recogió dos veces—. Pedirla
 * dos veces es gastar una petición al host y un turno de crawl-delay por un
 * dato que ya se tiene: se verifica una vez y el resultado se aplica a todos
 * los ficheros que la apuntan.
 */
const porUrl = new Map();
for (const f of fuentes) {
  if (!porUrl.has(f.url)) porUrl.set(f.url, []);
  porUrl.get(f.url).push(f);
}

const registro = existsSync(REGISTRO) ? JSON.parse(readFileSync(REGISTRO, 'utf8')) : {};
const previo = {};
if (registro.version === VERSION_REGISTRO) {
  for (const s of registro.sitios ?? []) previo[s.url] = s;
} else if (Object.keys(registro).length) {
  console.log(`  (registro en versión ${registro.version ?? '?'}: se reinicia la comparación)\n`);
}

console.log(`\nVerificando ${fuentes.length} ficheros · ${porUrl.size} fuentes únicas…\n`);
const porFuente = {};
for (const [url, grupo] of porUrl) {
  const res = await verificar(grupo[0], previo[url]);
  for (const f of grupo) porFuente[f.fichero] = { ...res, fichero: f.fichero };
  const marca = { VIVA: '✓', CAMBIÓ: '~', CÁSCARA: '!', ROTA: '✗', BLOQUEADA: '✗' }[res.estado] ?? '?';
  const compartida = grupo.length > 1 ? ` ×${grupo.length}` : '';
  console.log(`${marca} ${res.estado.padEnd(9)} ${res.sitio} — ${res.titulo.slice(0, 50)}${compartida}${res.nota ? ' · ' + res.nota : ''}`);
}
const resultados = fuentes.map((f) => porFuente[f.fichero]);

if (!SOLO_CAMBIOS) {
  /*
   * Fusionar, no reemplazar.
   *
   * Una pasada parcial —`--limite`, o un corte a mitad— sólo verifica unas
   * URLs: sobrescribir el registro con ellas borraría la memoria de las
   * demás, y la siguiente pasada las trataría como nuevas. Sólo se fusiona
   * sobre un registro de la misma versión: mezclar hashes de métrica vieja
   * con nueva reinfecta el problema que la versión evita.
   */
  const consolidadas = new Map();
  if (registro.version === VERSION_REGISTRO) {
    for (const s of registro.sitios ?? []) consolidadas.set(s.url, s);
  }
  for (const r of resultados.filter((r) => r.sha)) {
    consolidadas.set(r.url, { url: r.url, sitio: r.sitio, bytes: r.bytes, sha: r.sha });
  }
  writeFileSync(REGISTRO, JSON.stringify({
    version: VERSION_REGISTRO,
    actualizado: new Date().toISOString().slice(0, 10),
    sitios: [...consolidadas.values()],
  }, null, 2) + '\n');
}

const malas = resultados.filter((r) => ['ROTA', 'BLOQUEADA', 'CÁSCARA'].includes(r.estado));
const cambiadas = resultados.filter((r) => r.estado === 'CAMBIÓ');

console.log(`\n  ${resultados.filter((r) => r.estado === 'VIVA').length} vivas · ${cambiadas.length} cambiadas · ${malas.length} rota/cáscara/bloqueada`);
if (cambiadas.length) {
  console.log('\n  Cambiadas —reprocesar por el pipeline:');
  for (const c of cambiadas) console.log(`    ${c.url}`);
}
if (SOLO_CAMBIOS && !cambiadas.length) console.log('\n  Sin cambios desde la última verificación.');

process.exit(malas.length ? 1 : 0);
