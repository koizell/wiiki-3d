/** Exportación HTML para GitHub Pages, sin servidor ni dependencias nuevas. */
import { createServer } from 'vite';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const raiz = fileURLToPath(new URL('../', import.meta.url));
const dist = join(raiz, 'dist');
const plantilla = await readFile(join(dist, 'index.html'), 'utf8');
const escapar = (s) => s.replaceAll('&', '&amp;').replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;').replaceAll('"', '&quot;').replaceAll("'", '&#39;');

function documento(seo, html) {
  const canonical = `${ORIGEN}${seo.path}`;
  const head = `<link rel="canonical" href="${escapar(canonical)}" />\n` +
    `<meta name="robots" content="${seo.noindex ? 'noindex, follow' : 'index, follow'}" />\n` +
    (seo.schema ? `<script id="wiki-schema" type="application/ld+json">${JSON.stringify(seo.schema).replaceAll('<', '\\u003c')}</script>\n` : '');
  /*
   * El título y la descripción se reescriben en los tres sitios donde aparecen:
   * `<title>`/`description` para buscadores, y `og:`/`twitter:` para las tarjetas
   * al compartir. Sin esto, cada página compartida enseñaría el título de la
   * raíz, porque los `og:` vienen de la plantilla y no se enteran de la ruta.
   *
   * `og:image` y `og:type` no se tocan: la portada es la misma para todo el sitio.
   * Las expresiones de `og:description` y `twitter:description` aceptan saltos de
   * línea porque en `index.html` esas etiquetas están partidas en tres líneas.
   */
  return plantilla
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${escapar(seo.title)}</title>`)
    .replace(/<meta\s+name="description"\s+content="[^"]*"\s*\/>/, `<meta name="description" content="${escapar(seo.description)}" />`)
    .replace(/(<meta\s+property="og:title"\s+content=")[^"]*(")/, `$1${escapar(seo.title)}$2`)
    .replace(/(<meta\s+property="og:description"[\s\S]*?content=")[^"]*(")/, `$1${escapar(seo.description)}$2`)
    .replace(/(<meta\s+property="og:url"\s+content=")[^"]*(")/, `$1${escapar(canonical)}$2`)
    .replace(/(<meta\s+name="twitter:title"\s+content=")[^"]*(")/, `$1${escapar(seo.title)}$2`)
    .replace(/(<meta\s+name="twitter:description"[\s\S]*?content=")[^"]*(")/, `$1${escapar(seo.description)}$2`)
    .replace('</head>', `${head}</head>`)
    .replace('<div id="root"></div>', `<div id="root">${html}</div>`);
}

const servidor = await createServer({ root: raiz, server: { middlewareMode: true }, appType: 'custom' });
let ORIGEN;
try {
  const { paginasEstaticas } = await servidor.ssrLoadModule('/src/lib/static-pages.tsx');
  const seo = await servidor.ssrLoadModule('/src/lib/seo.ts');
  ORIGEN = seo.ORIGEN;
  const paginas = paginasEstaticas();
  for (const { seo: pagina, html } of paginas) {
    const directorio = resolve(dist, `.${pagina.path}`);
    if (!directorio.startsWith(`${dist}/`)) throw new Error(`Ruta inválida: ${pagina.path}`);
    await mkdir(directorio, { recursive: true });
    await writeFile(join(directorio, 'index.html'), documento(pagina, html));
  }
  // Rutas de herramientas: sólo metadatos y mensaje sin JS; no resultados personales.
  const herramientas = ['/', '/taller', '/historial', '/proyectos'];
  for (const path of herramientas) {
    const pagina = seo.SEO_PAGINAS[path];
    const html = `<main class="wiki-info"><h1>${escapar(pagina.title)}</h1><p>${escapar(pagina.description)}</p><p>Esta herramienta necesita JavaScript. Las <a href="/wiki">guías de la wiki</a> pueden leerse sin él.</p></main>`;
    const directorio = path === '/' ? dist : join(dist, path.slice(1));
    await mkdir(directorio, { recursive: true });
    await writeFile(join(directorio, 'index.html'), documento(pagina, html));
  }
  await writeFile(join(dist, '404.html'), documento({
    title: 'Página no encontrada | wiiki-3d', path: '/404', noindex: true,
    description: 'Esta página no existe. Consulta las guías disponibles en la wiki.',
  }, '<main class="wiki-info"><h1>Página no encontrada</h1><p><a href="/wiki">Consultar la wiki</a></p></main>'));
  const indexables = [seo.SEO_PAGINAS['/'], seo.SEO_PAGINAS['/taller'], ...paginas.map((p) => p.seo)];
  await writeFile(join(dist, 'sitemap.xml'), '<?xml version="1.0" encoding="UTF-8"?>\n' +
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
    indexables.map((p) => `<url><loc>${escapar(`${ORIGEN}${p.path}`)}</loc></url>`).join('\n') + '\n</urlset>\n');
  console.log(`Exportadas ${paginas.length} páginas de contenido y 4 herramientas; sitemap: ${indexables.length} URLs.`);
} finally {
  await servidor.close();
}
