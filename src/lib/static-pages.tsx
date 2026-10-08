import { renderToStaticMarkup } from 'react-dom/server';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import WikiIndexRoute from '../routes/WikiIndexRoute';
import GuiaRoute from '../routes/GuiaRoute';
import InfoRoute from '../routes/InfoRoute';
import SiteFooter from '../components/SiteFooter';
import { AnalysisProvider } from '../state/AnalysisContext';
import { ProveedorGuia } from '../state/useGuia.tsx';
import { GUIAS } from './guias';
import { SEO_PAGINAS, seoGuia } from './seo';
import type { SeoPagina } from './seo';

/**
 * Las páginas que se exportan a HTML estático.
 *
 * ## Por qué aquí hay los mismos proveedores que en el navegador
 *
 * Porque el árbol tiene que ser **el mismo**, no uno equivalente. Las rutas de la
 * wiki leen dos contextos: `useAnalysis`, para saber si hay un G-code que preconteste
 * el material de una variable, y `useGuiaEstado`, para leer y escribir las
 * respuestas del diagnóstico.
 *
 * La primera vez que se exportó sin ellos, el fallo fue inmediato y delataba
 * exactamente el problema: `useAnalysis()` fuera de `<AnalysisProvider>` tira, y
 * el build se moría con un error que no señalaba la línea del componente que lo
 * pidió. Dos opciones:
 *
 * - **Que las rutas no leyeran los contextos.** Habría que pasar el estado por
 *   props desde otro sitio, y en la exportación estática no hay a quién pasarle nada.
 * - **Poner los proveedores aquí también.** Una línea, y el HTML exportado es el
 *   mismo que el que pinta React en el navegador para la misma ruta.
 *
 * Se eligió la segunda, y además deja una ventaja: como el estado inicial de los
 * dos contextos es vacío, lo que se exporta es exactamente la guía sin
 * diagnosticar, que es lo que puede leer alguien con JavaScript apagado.
 *
 * ## Lo que el HTML exportado no puede contener
 *
 * El diagnóstico interactivo, porque no hay quién lo maneje. Las etapas 1, 2 y las
 * fuentes sí están, y son texto. El `<noscript>` lo dice.
 */
export function paginasEstaticas(): { seo: SeoPagina; html: string }[] {
  const paginas = [
    SEO_PAGINAS['/wiki'],
    SEO_PAGINAS['/acerca-de'],
    SEO_PAGINAS['/contacto'],
    SEO_PAGINAS['/privacidad'],
    ...GUIAS.map(seoGuia),
  ];
  return paginas.map((seo) => ({
    seo,
    html: renderToStaticMarkup(
      <AnalysisProvider>
        <ProveedorGuia>
          <MemoryRouter initialEntries={[seo.path]}>
            <header className="wiki-info">
              <nav aria-label="Navegación del sitio">
                <a href="/">Inicio</a> · <a href="/wiki">Wiki 3D</a> ·{' '}
                <a href="/taller">Taller</a>
              </nav>
              <noscript>
                <p>
                  Las guías se pueden leer sin JavaScript. El diagnóstico interactivo y
                  las herramientas necesitan activarlo.
                </p>
              </noscript>
            </header>
            <main>
              <Routes>
                <Route path="/wiki" element={<WikiIndexRoute />} />
                <Route path="/wiki/:slug" element={<GuiaRoute />} />
                <Route path="/acerca-de" element={<InfoRoute pagina="acerca-de" />} />
                <Route path="/contacto" element={<InfoRoute pagina="contacto" />} />
                <Route path="/privacidad" element={<InfoRoute pagina="privacidad" />} />
              </Routes>
            </main>
            <SiteFooter />
          </MemoryRouter>
        </ProveedorGuia>
      </AnalysisProvider>
    ),
  }));
}