/**
 * Los artículos de la Wiki 3D, cargados desde `src/content/wiki/`.
 *
 * ## Por qué van todos dentro y no hay un índice aparte
 *
 * Un índice declarado a mano se desincroniza: el redactor escribe un artículo y
 * el índice no se entera, y el fallo es silencioso. Con `import.meta.glob` eager el
 * índice **se deriva del propio contenido**, así que no puede quedar desfasado.
 *
 * El coste son **5,28 kB gzip por artículo**, medido sobre el de prueba: 14,9 kB
 * crudos, ratio 2,82×, más unos 2 kB de este módulo. Este módulo lo importan sólo
 * las rutas de la wiki, que van en `lazy`, de modo que **no entra en el chunk
 * inicial**: medido en `dist/`, el chunk `wiki-*.js` pesa 6,33 kB gzip y el
 * principal sube menos de 1 kB.
 *
 * El umbral en el que esto deja de funcionar son unos **veinte artículos**, unos
 * 105 kB gzip, y no porque deje de ser rápido sino porque se descarga la wiki
 * entera para leer una página. Para entonces hay que partir el índice del cuerpo,
 * aceptar un `wiki/manifest.json` que mantenga el pipeline —y que entonces hay que
 * verificar, como ya se verifica `src/lib/wiki-campos.ts`— y el índice pasa a ser
 * un fichero en vez de derivarse del contenido.
 *
 * La cifra de arriba extrapola de un solo artículo, así que es una cota. Al
 * compartir encabezados y fuentes entre artículos el lote comprime algo mejor que
 * la suma de las partes, pero nada como comprimir copias idénticas, que da 0,66 kB
 * por artículo y es un número que no significa nada.
 */

/** Un artículo de la wiki, con su frontmatter ya interpretado. */
export interface WikiArticleMeta {
  slug: string;
  title: string;
  /** Una frase, para el índice y para la búsqueda. */
  description: string;
  date: string;
  updated: string;
  tags: string[];
  /**
   * Campos del parser a los que este artículo da contexto.
   *
   * Los mismos nombres que `ProjectMetadata` y `JevClassification`. Un artículo
   * puede atarse a varios: el de warping sirve para `warpingRisk` y para `riskLevel`,
   * que son el mismo dato dicho de dos maneras.
   */
  campos: string[];
  sources: string[];
  /** El Markdown entero, con el frontmatter ya quitado. */
  body: string;
}

/**
 * Lo que el renderizador necesita saber del artículo una vez convertido a HTML.
 *
 * Los encabezados van aparte porque la tabla de contenidos los necesita y no
 * tiene sentido volver a recorrer el HTML para sacarlos.
 */
export interface WikiHeading {
  id: string;
  texto: string;
  nivel: number;
}

const MODULOS = import.meta.glob('../content/wiki/*.md', {
  eager: true,
  query: '?raw',
  import: 'default',
}) as Record<string, string>;

/**
 * Lee el frontmatter.
 *
 * Es un subconjunto de YAML, no YAML: sólo `clave: valor`, `clave: [a, b]` y
 * `clave:` seguido de líneas `  - valor`. Es todo lo que el redactor escribe, y
 * añadir un parser completo por esto sería una dependencia para resolver un
 * problema que no existe.
 *
 * Los valores que no son cadenas llegan sin comillas y se devuelven tal cual,
 * sin interpretar: el redactor los escribe como `[a, b]`, no como `['a', 'b']`.
 */
function leerFrontmatter(texto: string): { datos: Record<string, string[]>; cuerpo: string } {
  const datos: Record<string, string[]> = {};
  const lineas = texto.split('\n');

  if (lineas[0]?.trim() !== '---') {
    return { datos, cuerpo: texto };
  }
  let i = 1;

  let claveActual = '';
  for (; i < lineas.length; i++) {
    const linea = lineas[i];
    if (linea.trim() === '---') {
      i++;
      break;
    }

    // Lista en líneas siguientes, que es como se escriben `sources`.
    const elemento = linea.match(/^\s+-\s+(.*)$/);
    if (elemento && claveActual) {
      datos[claveActual].push(sinComillas(elemento[1].trim()));
      continue;
    }

    const par = linea.match(/^([A-Za-z][A-Za-z0-9_]*):\s*(.*)$/);
    if (!par) continue;
    const [, clave, bruto] = par;
    claveActual = clave;

    if (bruto.trim() === '') {
      datos[clave] = [];
    } else if (bruto.trim().startsWith('[')) {
      datos[clave] = bruto
        .trim()
        .replace(/^\[/, '')
        .replace(/\]$/, '')
        .split(',')
        .map((p) => sinComillas(p.trim()))
        .filter(Boolean);
    } else {
      datos[clave] = [sinComillas(bruto.trim())];
    }
  }

  return { datos, cuerpo: lineas.slice(i).join('\n') };
}

/** Quita las comillas que el redactor pone en los valores con dos puntos dentro. */
function sinComillas(valor: string): string {
  return valor.replace(/^["']/, '').replace(/["']$/, '');
}

/**
 * La primera frase del cuerpo, para la descripción del índice.
 *
 * No se busca la primera frase con un algoritmo: el redactor escribe la descripción
 * en el frontmatter cuando la hay, y esto es sólo el respaldo para cuando no la
 * ha puesto. Sin frontmatter, esta frase es lo que sale en el índice.
 */
function primeraFrase(cuerpo: string): string {
  for (const linea of cuerpo.split('\n')) {
    const limpia = linea.trim();
    if (!limpia || limpia.startsWith('#') || limpia.startsWith('|') || limpia.startsWith('>')) {
      continue;
    }
    // Se quitan los ** de las negritas de arranque para que no salga markup.
    const sinMarkup = limpia.replace(/\*\*/g, '').replace(/\s+/g, ' ');
    if (sinMarkup.length < 40) continue;
    const corte = sinMarkup.indexOf('. ');
    const frase = corte > 40 ? sinMarkup.slice(0, corte + 1) : sinMarkup;
    return frase.length > 180 ? `${frase.slice(0, 177)}...` : frase;
  }
  return '';
}

function construir(texto: string, ruta: string): WikiArticleMeta {
  const { datos, cuerpo } = leerFrontmatter(texto);
  const una = (clave: string) => datos[clave]?.[0] ?? '';
  const slug = una('slug') || ruta.split('/').pop()!.replace(/\.md$/, '');

  return {
    slug,
    title: una('title') || slug,
    description: una('description') || primeraFrase(cuerpo),
    date: una('date'),
    updated: una('updated') || una('date'),
    tags: datos['tags'] ?? [],
    campos: datos['campo'] ?? datos['campos'] ?? [],
    sources: datos['sources'] ?? [],
    body: cuerpo.trim(),
  };
}

const TODOS: WikiArticleMeta[] = Object.entries(MODULOS)
  .map(([ruta, texto]) => construir(texto, ruta))
  .sort((a, b) => a.title.localeCompare(b.title, 'es'));

const POR_SLUG = new Map(TODOS.map((a) => [a.slug, a]));

/** Todos los artículos, ordenados por título. */
export function articulosWiki(): WikiArticleMeta[] {
  return TODOS;
}

/** Un artículo por su slug, o `null` si no existe. */
export function articuloPorSlug(slug: string | undefined): WikiArticleMeta | null {
  if (!slug) return null;
  return POR_SLUG.get(slug) ?? null;
}

/** El artículo que da contexto a un campo del parser, o `null`. */
export function articuloPorCampo(campo: string): WikiArticleMeta | null {
  return TODOS.find((a) => a.campos.includes(campo)) ?? null;
}

/**
 * Busca en el título, la descripción, las etiquetas, los campos y **el cuerpo**.
 *
 * Es un filtro de subcadena sobre cinco campos, y a propósito. Con diez o quince
 * artículos —lo que la revisión de contenido pide— un recorrido lineal da
 * respuesta instantánea, y meter un índice invertido sólo añadiría una cosa que
 * desincronizar.
 *
 * El cuerpo entra, y no por robustez sino porque hace falta. Buscando sólo en los
 * metadatos, «cama» no encontraba el artículo de warping: la primera frase de su
 * descripción no la menciona, y sus etiquetas son `warping`, `pla`, `adhesion`,
 * `temperatura` y `primera-capa`. Es decir, el artículo que más explica la
 * temperatura de cama no se encontraba por la temperatura de cama, que es
 * exactamente lo que alguien con un G-code en la mano está buscando.
 *
 * El cuerpo entra ya normalizado en la caché, una sola vez al cargar el módulo, y
 * de él se quitan los enlaces y el formato: buscar «warping» no debe encontrarlo
 * sólo porque aparece en el `href` de una cita.
 */
export function buscarWiki(consulta: string): WikiArticleMeta[] {
  const limpio = normalizar(consulta.trim());
  if (!limpio) return TODOS;
  // Todas las palabras tienen que aparecer, no sólo una: buscar con varias palabras
  // es acotar, no ampliar.
  const palabras = limpio.split(/\s+/).filter(Boolean);
  return TODOS.filter((a) => palabras.every((p) => heno(a).includes(p)));
}

/**
 * El texto por el que se busca un artículo, normalizado y calculado una vez.
 *
 * Se quita lo que no es texto legible: los enlaces dejan su etiqueta y pierden la
 * URL, el código entre acentos graves pierde los acentos graves y las tablas
 * pierden las barras. Un Markdown plano basta, porque de todos modos está
 * normalizado y las pipes no estorban a una búsqueda por palabras.
 */
function heno(a: WikiArticleMeta): string {
  let listo = HENO.get(a.slug);
  if (listo === undefined) {
    listo = normalizar(
      [
        a.title,
        a.description,
        a.tags.join(' '),
        a.campos.join(' '),
        a.slug,
        a.body
          .replace(/`[^`]*`/g, ' ')
          .replace(/\]\([^)]*\)/g, ']')
          .replace(/^[#>*|\-\s]+/gm, ' '),
      ].join(' ')
    );
    HENO.set(a.slug, listo);
  }
  return listo;
}

const HENO = new Map<string, string>();

/** Minúsculas y sin acentos, para comparar sin que el acento decida. */
function normalizar(texto: string): string {
  return texto
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}
