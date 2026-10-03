/**
 * Un renderizador de Markdown para los artículos de la wiki.
 *
 * ## Por qué no hay librería
 *
 * Porque el subconjunto que usan los artículos está medido, no supuesto. El
 * artículo de prueba usa encabezados, negritas, enlaces, una lista y una tabla.
 * Eso son seis construcciones, y ninguna más. Una librería de Markdown trae un
 * analizador completo, su sanitizer, su gestor de imágenes y suurel de
 * extensiones —html, footnotes, tablas GFD, definiciones— para resolver un
 * problema que este contenido no tiene.
 *
 * Además hay una razón que no es de tamaño: los enlaces cruzados entre artículos.
 * `[[slug]]` no es Markdown estándar, así que con una librería habría que
 * procesarlos antes o después, y las dos opciones son frágiles. Aquí el
 * renderizador los conoce, y la degradación —un enlace a una página que todavía
 * no existe se vuelve texto— está en el mismo sitio que el resto.
 *
 * ## Por qué devuelve una cadena y no JSX
 *
 * Porque el contenido es un fichero de texto que se carga entero, y no un árbol
 * de componentes. Recorrer el HTML con un parser de DOM para sacar los
 * encabezados de la tabla de contenidos sería un segundo parser; en su lugar el
 * renderizador devuelve los encabezados que ya ha construido, que es información
 * que tenía a mano y gratis.
 */

/** Un encabezado del artículo, ya con su identificador. */
export interface Encabezado {
  id: string;
  texto: string;
  nivel: number;
}

/** Lo que devuelve el renderizador: el HTML y los encabezados, en el mismo paseo. */
export interface Renderizado {
  html: string;
  encabezados: Encabezado[];
}

/**
 * Qué sabe el renderizador del mundo exterior: si una página existe.
 *
 * Se pasa como función y no se importa de `wiki.ts` a propósito. El renderizador
 * no debería saber de dónde salen los artículos; sólo necesita poder preguntar si
 * un identificador es real. Así se puede probar pasándole un `Set` de un solo
 * elemento.
 */
export interface OpcionesRender {
  /** Devuelve el título de un artículo a partir de su slug, o `null` si no existe. */
  tituloDe?: (slug: string) => string | null;
}

/**
 * Escapa el texto que va dentro del HTML.
 *
 * El orden importa y no es caprichoso: `&` primero, o escaparlo después
 * convertiría los `&amp;` en `&amp;amp;`.
 *
 * Las comillas no se escapan, y es deliberado. Este valor sólo llega a nodos de
 * texto, nunca a un atributo: los atributos que genera este renderizador —
`id`, `href`, `class`, `title`— los construye él a partir de identificadores que
él mismo genera, y ninguno puede contener un carácter de comilla. Escapar el
texto en vez de construirlo es lo que evita necesitarlo.
 */
function escapar(texto: string): string {
  return texto.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

/**
 * Convierte un texto de encabezado en un identificador válido.
 *
 * Sin acentos, sin puntuación y en minúsculas, que es lo que hace pulsable el
 * enlace y lo que hace que la URL siga siendo legible. Un identificador con
 * espacios y signos de interrogación no se puede compartir por correo, y en una
 * wiki compartir es la mitad del uso.
 */
function aIdentificador(texto: string): string {
  return texto
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 60);
}

/**
 * Quita el formato de un texto para usarlo como etiqueta.
 *
 * Los encabezados del artículo traen negritas y acentos graves, y `## Qué puede
 * salir mal` no puede ser a la vez el texto de la tabla de contenidos y una
 * cadena con `##` dentro.
 */
function aTextoPlano(texto: string): string {
  return texto
    .replace(/`([^`]*)`/g, '$1')
    .replace(/\*\*([^*]*)\*\*/g, '$1')
    .replace(/\*([^*]*)\*/g, '$1')
    .replace(/\[\[([^\]|]+)(?:\|([^\]]*))?\]\]/g, (_, slug, etiqueta) => etiqueta ?? slug)
    .trim();
}

/**
 * Todas las construcciones de formato en línea, en una sola expresión.
 *
 * El orden de las alternativas **es** la prioridad: código, enlace cruzado,
 * enlace, negrita, cursiva. Un Regex alternado prueba de izquierda a derecha y se
 * queda con el primero que encaja, así que escribirlas en orden resuelve de paso la
 * ambigüedad real entre ellas: en `**negrita**` la alternativa de negrita tiene que
 * ir antes que la de cursiva, y el contenido de un bloque de código no debe
 * reinterpretarse nunca.
 *
 * Se procesa en una sola pasada y no sustituyendo por pasos. La versión de pasos
 * —apartar el código, escapar, aplicar negritas, devolver el código— necesita un
 * marcador para recordar qué parte era código, y ese marcador tiene que ser una
 * cadena que no pueda aparecer en el texto. No hay ninguna: los dígitos se
 * solaparían con los números del texto y cualquier cosa visible se colaría en el
 * HTML. Con una sola pasada no hay marcador que elegir, y por eso tampoco hay forma
 * de que un `**` dentro de un bloque de código acabe siendo negrita.
 */
const EN_LINEA =
  /`([^`]*)`|\[\[([^\]|]+)(?:\|([^\]]*))?\]\]|\[([^\]]+)\]\(([^)\s]+)\)|\*\*([^*]+)\*\*|\*([^*\s][^*]*)\*/g;

/** Un enlace a un artículo de la wiki, o la marca de que todavía no existe. */
function wikiLink(
  slugCrudo: string,
  etiqueta: string | undefined,
  opcion: (slug: string) => string | null
): string {
  const slug = slugCrudo.trim();
  const titulo = opcion(slug);
  const visible = (etiqueta ?? titulo ?? slug).trim();

  if (titulo === null) {
    // No enlaza, y lo dice. El redactor escribe los artículos en cualquier orden y
    // nombra las páginas que van a existir; un enlace roto en un artículo ya
    // revisado sería un fallo de revisión. Con esto el enlace se enciende solo el
    // día que la otra página está escrita, sin volver a tocar este fichero.
    return `<span class="wiki-pendiente" title="Todavía sin escribir">${escapar(visible)}</span>`;
  }
  return `<a class="wiki-link" href="/wiki/${escapar(slug)}">${escapar(visible)}</a>`;
}

/** Enlaces cruzados, enlaces, negritas, cursivas y código en línea, de una pasada. */
function enLinea(texto: string, opcion: (slug: string) => string | null): string {
  let salida = '';
  let cursor = 0;

  for (const m of texto.matchAll(EN_LINEA)) {
    // Lo que hay entre un elemento y el siguiente es texto corriente y se escapa.
    salida += escapar(texto.slice(cursor, m.index));
    cursor = m.index + m[0].length;

    const [, codigo, wikiSlug, wikiEtiqueta, etiqueta, url, negrita, cursiva] = m;

    if (codigo !== undefined) {
      salida += `<code>${escapar(codigo)}</code>`;
    } else if (wikiSlug !== undefined) {
      salida += wikiLink(wikiSlug, wikiEtiqueta, opcion);
    } else if (url !== undefined && etiqueta !== undefined) {
      const externo = /^https?:\/\//.test(url);
      const atributos = externo ? ' target="_blank" rel="noopener noreferrer"' : '';
      salida += `<a href="${escapar(url)}"${atributos}>${escapar(etiqueta)}</a>`;
    } else if (negrita !== undefined) {
      salida += `<strong>${escapar(negrita)}</strong>`;
    } else if (cursiva !== undefined) {
      salida += `<em>${escapar(cursiva)}</em>`;
    }
  }

  return salida + escapar(texto.slice(cursor));
}

/**
 * Divide una fila de tabla en celdas.
 *
 * Se parte por `|` y se descarta el primero y el último, que en Markdown son los
 * separadores de los extremos. Una celda puede contener `|` escapado con
 * barra invertida, y ese caso se respeta: partirlo sin mirar sería el error
 * clásico.
 */
function celdas(linea: string): string[] {
  const bruto = linea.trim().replace(/^\|/, '').replace(/\|$/, '');
  const salida: string[] = [];
  let actual = '';
  for (let i = 0; i < bruto.length; i++) {
    const ch = bruto[i];
    if (ch === '\\' && bruto[i + 1] === '|') {
      actual += '|';
      i++;
    } else if (ch === '|') {
      salida.push(actual.trim());
      actual = '';
    } else {
      actual += ch;
    }
  }
  salida.push(actual.trim());
  return salida;
}

/** ¿Es la línea separadora de una tabla? `|---|---|`, `|:---|---:|` y variantes. */
function esSeparador(linea: string): boolean {
  return /^\s*\|?[\s:-]*-[\s:|-]*\|?\s*$/.test(linea) && linea.includes('-');
}

/**
 * Lee la alineación declarada en la fila separadora.
 *
 * `---:` alinea a la derecha y `:---:` al centro. Sirve para las tablas de cifras,
 * donde una columna de porcentajes alineada a la derecha se lee de un vistazo.
 */
function alineaciones(linea: string): string[] {
  return celdas(linea).map((c) => {
    const izquierda = c.startsWith(':');
    const derecha = c.endsWith(':');
    if (izquierda && derecha) return ' style="text-align:center"';
    if (derecha) return ' style="text-align:right"';
    return '';
  });
}

/**
 * Convierte un artículo a HTML.
 *
 * Recorre el bloque de fuera hacia dentro: primero decide qué construcción es cada
 * grupo de líneas, y sólo entonces procesa el formato de dentro. Al revés —parsear
 * cada línea de forma independiente— es lo que rompe las tablas y las listas con
 * líneas partidas, que es justo el caso del artículo de prueba.
 */
export function renderizar(md: string, opciones: OpcionesRender = {}): Renderizado {
  const opcion = (slug: string) => opciones.tituloDe?.(slug) ?? null;
  const html: string[] = [];
  const encabezados: Encabezado[] = [];
  const usados = new Map<string, number>();

  /** Identificador único: dos secciones con el mismo título no pueden compartir `id`. */
  const idUnico = (base: string): string => {
    const limpio = base || 'seccion';
    const veces = usados.get(limpio) ?? 0;
    usados.set(limpio, veces + 1);
    return veces === 0 ? limpio : `${limpio}-${veces + 1}`;
  };

  const lineas = md.split('\n');
  let i = 0;

  while (i < lineas.length) {
    const linea = lineas[i];

    // Línea en blanco: separa bloques, no genera nada.
    if (!linea.trim()) {
      i++;
      continue;
    }

    // Bloque de código con tres acentos graves. Los artículos no lo usan todavía,
    // pero los ficheros de `wiki/cooked/` sí, y el revisor los lee en crudo.
    const valla = linea.match(/^```(\w*)\s*$/);
    if (valla) {
      const cuerpo: string[] = [];
      i++;
      while (i < lineas.length && !/^```\s*$/.test(lineas[i])) {
        cuerpo.push(lineas[i]);
        i++;
      }
      i++;
      html.push(
        `<pre class="wiki-codigo"><code>${escapar(cuerpo.join('\n'))}</code></pre>`
      );
      continue;
    }

    // Encabezado. El `h1` del artículo es el `h1` de la ruta, y no se duplica.
    const encabezado = linea.match(/^(#{1,6})\s+(.*)$/);
    if (encabezado) {
      const nivel = encabezado[1].length;
      const crudo = encabezado[2].trim();
      const texto = aTextoPlano(crudo);
      const id = idUnico(aIdentificador(texto));

      if (nivel === 1) {
        html.push(`<h1 id="${id}">${enLinea(crudo, opcion)}</h1>`);
      } else {
        html.push(
          `<h${nivel} id="${id}">` +
            `${enLinea(crudo, opcion)}` +
            `<a class="wiki-ancla" href="#${id}" aria-label="Enlace a esta sección">#</a>` +
            `</h${nivel}>`
        );
        encabezados.push({ id, texto, nivel });
      }
      i++;
      continue;
    }

    // Separador horizontal: sólo `---` solo en su línea, porque `---` al principio
    // de un bloque es otra cosa.
    if (/^\s*(-{3,}|\*{3,})\s*$/.test(linea)) {
      html.push('<hr class="wiki-regla" />');
      i++;
      continue;
    }

    // Tabla: una fila de cabecera, una separadora y las de cuerpo.
    if (linea.trim().startsWith('|') && esSeparador(lineas[i + 1] ?? '')) {
      const cabeceras = celdas(linea);
      const alin = alineaciones(lineas[i + 1]);
      const cuerpo: string[][] = [];
      i += 2;
      while (i < lineas.length && lineas[i].trim().startsWith('|')) {
        cuerpo.push(celdas(lineas[i]));
        i++;
      }
      html.push(
        '<div class="wiki-tabla-envoltura"><table class="wiki-tabla"><thead><tr>' +
          cabeceras
            .map(
              (c, k) =>
                `<th scope="col"${alin[k] ?? ''}>${enLinea(c, opcion)}</th>`
            )
            .join('') +
          '</tr></thead><tbody>' +
          cuerpo
            .map(
              (fila) =>
                '<tr>' +
                cabeceras
                  .map(
                    (_, k) =>
                      `<td${alin[k] ?? ''}>${enLinea(fila[k] ?? '', opcion)}</td>`
                  )
                  .join('') +
                '</tr>'
            )
            .join('') +
          '</tbody></table></div>'
      );
      continue;
    }

    // Cita.
    if (/^\s*>\s?/.test(linea)) {
      const partes: string[] = [];
      while (i < lineas.length && /^\s*>\s?/.test(lineas[i])) {
        partes.push(lineas[i].replace(/^\s*>\s?/, ''));
        i++;
      }
      html.push(`<blockquote class="wiki-cita">${enLinea(partes.join(' '), opcion)}</blockquote>`);
      continue;
    }

    // Listas con viñeta y numeradas, y sus continuaciones.
    const vineta = linea.match(/^\s*[-*+]\s+(.*)$/);
    const numero = linea.match(/^\s*\d+[.)]\s+(.*)$/);
    if (vineta || numero) {
      const tipo = vineta ? 'ul' : 'ol';
      /*
       * El grupo `(.*)` no es decorativo: `item[1]` es el texto del elemento, y sin
       * el grupo `undefined` entra en `join(' ')` como cadena vacía y el elemento
       * se queda sin su primera línea. El mismo `patron` se usa además para
       * `test()`, con lo que la comprobación y la extracción no pueden separarse.
       */
      const patron = tipo === 'ul' ? /^\s*[-*+]\s+(.*)$/ : /^\s*\d+[.)]\s+(.*)$/;
      const items: string[] = [];

      while (i < lineas.length) {
        const actual = lineas[i];
        const item = actual.match(patron);
        if (item) {
          const partes = [item[1]];
          i++;
          // Continuación: líneas sin viñeta que siguen a un elemento. El artículo
          // de prueba los tiene, porque las viñetas están partidas a lo ancho del
          // fichero y eso es lo legible en el Markdown.
          while (
            i < lineas.length &&
            lineas[i].trim() &&
            !patron.test(lineas[i]) &&
            !/^\s*(#{1,6}\s|\||>|```)/.test(lineas[i])
          ) {
            partes.push(lineas[i].trim());
            i++;
          }
          items.push(`<li>${enLinea(partes.join(' '), opcion)}</li>`);
        } else if (!actual.trim()) {
          // Una línea en blanco dentro de una lista corta la parte, salvo que lo
          // que venga sea otro elemento de la misma lista.
          const siguiente = lineas[i + 1] ?? '';
          if (patron.test(siguiente)) {
            i++;
            continue;
          }
          break;
        } else {
          break;
        }
      }
      html.push(`<${tipo} class="wiki-lista">${items.join('')}</${tipo}>`);
      continue;
    }

    // Párrafo: líneas consecutivas que no abren otra construcción.
    const parrafo: string[] = [];
    while (
      i < lineas.length &&
      lineas[i].trim() &&
      !/^\s*(#{1,6}\s|\||>|```|[-*+]\s|\d+[.)]\s)/.test(lineas[i])
    ) {
      parrafo.push(lineas[i].trim());
      i++;
    }
    if (parrafo.length) {
      html.push(`<p>${enLinea(parrafo.join(' '), opcion)}</p>`);
    } else {
      // Red de seguridad: si la línea no se pudo consumir por ninguna regla, se
      // emite como párrafo en vez de hacer un bucle infinito.
      html.push(`<p>${enLinea(linea.trim(), opcion)}</p>`);
      i++;
    }
  }

  return { html: html.join('\n'), encabezados };
}
