import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { articuloPorSlug } from '../lib/wiki';
import { renderizar } from '../lib/markdown';
import type { WikiArticleMeta } from '../lib/wiki';

/**
 * Un artículo de la wiki: el texto, la tabla de contenidos y las fuentes.
 *
 * ## Por qué el espía de la tabla de contenidos no usa IntersectionObserver
 *
 * Porque `IntersectionObserver` responde a «este elemento se ve ahora», y lo que
 * hace falta es «en qué sección estoy», que es otra pregunta distinta. En un
 * artículo con secciones de medio kilo de palabras hay un tramo largo en el que
 * **ningún** encabezado está en pantalla: se está leyendo dentro de una sección y
 * ninguno de sus títulos ha entrado todavía. Con `IntersectionObserver` la tabla
 * apuntaría a la anterior durante todo ese tramo, y en el artículo de prueba, cuyas
 * secciones son largas, sería casi siempre.
 *
 * La solución es medir: en cada scroll se busca el último encabezado cuya parte
 * superior ha pasado de una línea a un 28 % de la altura de la ventana. Esa
 * respuesta es correcta incluso con una sección de mil palabras.
 *
 * El `requestAnimationFrame` no es un adorno: sin él el manejador se ejecuta en
 * cada evento de scroll, y en un móvil con scroll inercial eso son decenas de
 * llamadas por fotograma.
 */

/** Fracción de la altura de la ventana por la que tiene que pasar un encabezado. */
const MARGEN_ACTIVO = 0.28;

export default function WikiArticleRoute() {
  const { slug } = useParams();
  const articulo = articuloPorSlug(slug);

  /*
   * El renderizado ocurre una vez y aquí. Se resolvió primero pedir el HTML a
   * `renderizar` y luego, dentro del componente, volver a llamarlo para sacar los
   * encabezados: el mismo texto recorrido dos veces para que la tabla de
   * contenidos y el artículo no puedan desincronizarse, pero mal. Ahora el paseo es
   * uno y sus dos resultados viajan juntos.
   */
  const render = useMemo(
    () =>
      articulo
        ? renderizar(articulo.body, {
            // Los enlaces cruzados preguntan qué páginas existen. Es lo que
            // permite escribir «[[tal-cual]]» en el artículo y que el enlace se
            // encienda solo el día que la otra página esté escrita.
            tituloDe: (s) => articuloPorSlug(s)?.title ?? null,
          })
        : null,
    [articulo]
  );

  if (!articulo || !render) {
    return (
      <div className="wiki-articulo">
        <div className="wiki-contenedor wiki--entrada">
          <NoEncontrado slug={slug} />
        </div>
      </div>
    );
  }

  return (
    <div className="wiki-articulo">
      {/*
        La `key` es lo que hace que la animación de entrada se repita al cambiar de
        artículo: al cambiar la clave, React desmonta el nodo y monta otro, y una
        animación CSS de entrada se vuelve a ejecutar. Sin ella, cambiar de slug
        reutilizaría el mismo nodo y la animación sólo pasaría la primera vez.
      */}
      <div className="wiki-contenedor wiki--entrada" key={articulo.slug}>
        <Articulo article={articulo} html={render.html} titulos={render.encabezados} />
      </div>
    </div>
  );
}

function Articulo({
  article,
  html,
  titulos,
}: {
  article: WikiArticleMeta;
  html: string;
  titulos: ReturnType<typeof renderizar>['encabezados'];
}) {
  const contenedor = useRef<HTMLDivElement>(null);
  const toc = useRef<HTMLElement>(null);
  const [activo, setActivo] = useState<string | null>(titulos[0]?.id ?? null);
  /*
   * Si la tabla de contenidos sigue a la vista. En el reparto en dos columnas la
   * tabla es fija y esto no importa; en el apilado se va con el scroll, y entonces
   * es lo que decide si la barra de «dónde estoy» se ve o se queda transparente.
   */
  const [tocAislado, setTocAislido] = useState(false);

  /** El último encabezado que ha pasado por encima del margen. */
  const espiar = useCallback(() => {
    const raiz = contenedor.current;
    if (!raiz || titulos.length === 0) return;
    /*
     * La línea de lectura se mide desde **arriba de la ventana**, y no desde la
     * posición del artículo.
     *
     * Medido desde el artículo parece más preciso y es un error. El artículo es
     * largo, así que al bajar su borde superior ya se ha ido varios miles de
     * píxeles hacia arriba, y la línea de lectura lo seguía: ningún encabezado
     * podía alcanzarla nunca y la marca se quedaba clavada en la primera
     * sección durante todo el artículo. El bug era invisible desde arriba —la
     * primera sección es la correcta al principio— y sólo se veía bajando.
     *
     * Con el borde fijo de la ventana, un encabezado cuenta como activo desde que
     * su parte superior pasa del 28 % del alto. El más alto al que se puede llegar
     * es el primero, que es lo que hace la lista al empezar.
     */
    const linea = window.innerHeight * MARGEN_ACTIVO;
    let elegido = titulos[0].id;
    for (const t of titulos) {
      const el = raiz.querySelector(`#${CSS.escape(t.id)}`);
      if (!el) continue;
      if (el.getBoundingClientRect().top <= linea) {
        elegido = t.id;
      } else {
        break;
      }
    }
    setActivo(elegido);
  }, [titulos]);

  /*
   * El `h1` sale del Markdown, no de React, y aun así tiene que recibir el foco al
   * cambiar de artículo: si no, quien navega con teclado llega al final de la
   * página nueva sin haber pasado por su título y no sabe qué ha cambiado.
   *
   * `tabindex="-1"` se pone desde aquí y no en el renderizador, porque es una
   * decisión de esta vista —que cambia de artículo sin recargar— y no una regla
   * del Markdown. El renderizador no tiene por qué saber que hay una aplicación
   * detrás.
   */
  useEffect(() => {
    const h1 = contenedor.current?.querySelector('h1');
    if (!h1) return;
    h1.setAttribute('tabindex', '-1');
    h1.focus({ preventScroll: true });
    contenedor.current?.scrollTo({ top: 0 });
    window.scrollTo({ top: 0 });
  }, [article.slug]);

  /*
   * El espía de scroll y la animación de aparición viven en efectos separados a
   * propósito. Juntos parecían la unions que no son: el espía necesita conocer el
   * margen y se despacha en cada fotograma; la animación necesita un
   * `IntersectionObserver` y se despacha una sola vez por sección. Con un solo
   * efecto, animar obligaba a espiar y espiar a observar.
   */
  /*
   * La barra de «dónde estoy» se enciende cuando la tabla de contenidos sale de
   * la pantalla. Va después de la tabla en el DOM y **siempre ocupa su sitio**, se
   * vea o no: así el texto no da un salto de 34 píxeles en el momento en que
   * aparece. Mostrarla y ocultarla con `display` lo evitaría y a cambio
   * desplazaría el artículo entero, que es justo el tirón que hace que una barra
   * de progreso sea molesta en lugar de útil.
   */
  useEffect(() => {
    const nodo = toc.current;
    if (!nodo) return;
    const observador = new IntersectionObserver(
      ([entrada]) => setTocAislido(!entrada.isIntersecting),
      { threshold: 0 }
    );
    observador.observe(nodo);
    return () => observador.disconnect();
  }, []);

  useEffect(() => {
    const raiz = contenedor.current;
    if (!raiz || titulos.length === 0) return;

    let pedido = 0;
    const alDesplazar = () => {
      cancelAnimationFrame(pedido);
      pedido = requestAnimationFrame(espiar);
    };

    espiar();
    /*
     * El escuchador va en `document` **en fase de captura**, y no en `window`.
     *
     * El motivo es que el elemento que se desplaza no es siempre el mismo. Por
     * debajo de 1200px se desplaza el documento, así que el evento salta por
     * `window`. A partir de 1200px el shell es de altura fija y lo que se
     * desplaza es `.canvas-area`, que es un elemento interior: un `scroll` **no
     * propaga**, así que un escuchador en `window` no se entera nunca y el realce
     * se queda clavado en la primera sección. Comprobado: con el escuchador en
     * `window`, bajar al último encabezado dejaba la marca en «Por qué ocurre».
     *
     * Un evento que no sube **sí** recorre la fase de captura de abajo arriba
     * hasta el objetivo, de modo que en `document` con `capture: true` se ve
     * desde el interior. Es el mismo `{ passive: true }` de siempre, para no
     * obligar al navegador a esperar al manejador.
     */
    document.addEventListener('scroll', alDesplazar, { passive: true, capture: true });
    window.addEventListener('resize', alDesplazar);

    return () => {
      cancelAnimationFrame(pedido);
      document.removeEventListener('scroll', alDesplazar, { capture: true });
      window.removeEventListener('resize', alDesplazar);
    };
  }, [titulos, espiar]);

  useEffect(() => {
    const raiz = contenedor.current;
    if (!raiz || titulos.length === 0) return;

    /*
     * La animación de aparición sólo si el usuario la quiere, y con el estado
     * inicial al revés de lo habitual: las secciones **nacen visibles** y es este
     * efecto quien añade la clase que las oculta y las va revelando.
     *
     * El motivo no es sólo `prefers-reduced-motion`, aunque también. Si el estado
     * inicial fuera oculto y lo revelara JavaScript, cualquier sección que el
     * observador no llegara a ver se quedaría invisible para siempre, y eso en un
     * artículo largo es contenido perdido sin ningún aviso. Con el orden inverso,
     * si el JavaScript falla entero, el artículo se lee completo y sin adornos.
     */
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    raiz.classList.add('wiki--animado');
    const observador = new IntersectionObserver(
      (entradas) => {
        for (const e of entradas) {
          if (!e.isIntersecting) continue;
          e.target.classList.add('wiki-seccion-visible');
          observador.unobserve(e.target);
        }
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.01 }
    );
    for (const t of titulos) {
      const el = raiz.querySelector(`#${CSS.escape(t.id)}`);
      if (el) observador.observe(el);
    }

    return () => {
      observador.disconnect();
      raiz.classList.remove('wiki--animado');
    };
  }, [titulos]);

  return (
    <>
      <nav className="wiki-toc" aria-label="Tabla de contenidos" ref={toc}>
        <p className="wiki-toc-titulo">En este artículo</p>
        <ol>
          {titulos.map((t) => (
            <li key={t.id} className={`wiki-toc-nivel-${t.nivel}`}>
              {/*
                `aria-current="location"` y no `"page"`: este enlace no lleva a otra
                página, lleva a otra parte de la misma. El panel lateral ya usa
                `page` para la ruta, y reutilizar el valor para dos cosas distintas
                es justo lo que hace que un lector de pantalla anuncie el enlace
                equivocado.
              */}
              <a
                href={`#${t.id}`}
                aria-current={activo === t.id ? 'location' : undefined}
                onClick={(e) => {
                  e.preventDefault();
                  const destino = contenedor.current?.querySelector(`#${CSS.escape(t.id)}`);
                  destino?.scrollIntoView({ behavior: comportamiento(), block: 'start' });
                  setActivo(t.id);
                  // El foco va al destino para que el siguiente `Tab` siga desde
                  // donde se está leyendo, no desde el principio del documento.
                  destino?.setAttribute('tabindex', '-1');
                  (destino as HTMLElement | null)?.focus({ preventScroll: true });
                }}
              >
                {t.texto}
              </a>
            </li>
          ))}
        </ol>
      </nav>

      {/*
        La barra que sigue al lector cuando la tabla ya se ha ido. Ocupa su fila
        siempre, se vea o no, para que el texto no salte al aparecer.

        Va después de la tabla a propósito: así, arriba, no hay 34 píxeles de hueco
        antes de ella. Abajo, contra el texto, un hueco transparente no se nota
        porque no hay nada que delate dónde debería estar.

        Es `aria-live="polite"` a propósito y no `role="status"`: el valor cambia en
        cada sección que se cruza, y con `assertive` un lector de pantalla cortaría
        la frase que estuviera leyendo para anunciar un encabezado de navegación.
        Con `polite` espera, y para quien lee con lentitud es información de sobra.
      */}
      <p
        className={`wiki-donde${tocAislado ? ' wiki-donde-visible' : ''}`}
        aria-live="polite"
      >
        <span className="wiki-donde-etiqueta">En este artículo</span>
        <span className="wiki-donde-titulo">
          {titulos.find((t) => t.id === activo)?.texto ?? ''}
        </span>
      </p>

      {/*
        `dangerouslySetInnerHTML` es inevitable, y no por descuido: el contenido es
        un fichero Markdown del repositorio, escrito por nuestros propios agentes,
        no entrada de usuario. Aun así el renderizador escapa todo lo que no es
        markup suyo, así que un `<script>` dentro de un artículo sale como texto y no
        como etiqueta. Lo que se ejecuta es lo que este módulo genera; lo que hay
        en el fichero, no.
      */}
      <div className="wiki-texto" ref={contenedor} dangerouslySetInnerHTML={{ __html: html }} />

      <footer className="wiki-pie">
        <p className="wiki-pie-volver">
          <Link to="/wiki">Ver todos los artículos</Link>
        </p>
        {/*
          Las fuentes van al pie y no en un desplegable. Una fuente que hay que
          abrir para leer es una fuente que no se lee, y aquí es la mitad del valor
          del artículo: es lo que separa una afirmación de una opinión.
        */}
        {article.sources.length > 0 && (
          <section className="wiki-fuentes">
            <h2>Fuentes</h2>
            <p className="wiki-fuentes-nota">
              Las {article.sources.length} fuentes que respaldan este artículo,
              consultadas el {article.updated}.
            </p>
            <ol>
              {article.sources.map((u) => (
                <li key={u}>
                  <a href={u} target="_blank" rel="noopener noreferrer">
                    {anfitrion(u)}
                  </a>
                </li>
              ))}
            </ol>
          </section>
        )}
      </footer>
    </>
  );
}

/** El artículo no existe. */
function NoEncontrado({ slug }: { slug: string | undefined }) {
  return (
    <div className="wiki-no-encontrado">
      <h1>Ese artículo no existe</h1>
      {slug && (
        <p>
          No hay nada en <code>/wiki/{slug}</code>. Puede que el enlace sea de una
          versión anterior, o que la página esté todavía sin escribir.
        </p>
      )}
      <p>
        <Link to="/wiki">Volver al índice de la wiki</Link>
      </p>
    </div>
  );
}

/**
 * Si el usuario ha pedido menos movimiento, el salto es instantáneo.
 *
 * `smooth` en un desplazamiento largo es desorientador además de lento: el punto
 * de destino pasa por debajo de la barra y no hay forma de saber dónde ha acabado
 * el salto. Con `auto` es un corte y se ve dónde ha quedado.
 */
function comportamiento(): ScrollBehavior {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth';
}

/**
 * El anfitrión de una URL, sin la ruta: `forum.prusa3d.com`, y no
 * `https://forum.prusa3d.com/forum/how-do-i-print-this-printing-help/…`.
 *
 * La ruta no se quita por descuido. Una lista de doce enlaces de foro donde todos
 * dicen «foro de Prusa» no dice de dónde salió cada dato, y en un artículo que se
 * apoya en dos hilos distintos del mismo foro esa es justo la información que hace
 * falta para distinguirlos.
 */
function anfitrion(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, '');
  } catch {
    return url;
  }
}
