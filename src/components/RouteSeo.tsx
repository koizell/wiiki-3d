import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { actualizarSeo, SEO_PAGINAS } from '../lib/seo';

/** Los artículos establecen sus propios metadatos dentro del chunk de la wiki. */
export default function RouteSeo() {
  const { pathname } = useLocation();
  useEffect(() => {
    const path = pathname.replace(/\/+$/, '') || '/';
    if (path.startsWith('/wiki/')) return;
    actualizarSeo(SEO_PAGINAS[path] ?? {
      path, title: 'Página no encontrada | wiiki-3d',
      description: 'Esta página no existe. Consulta el índice de la wiki o vuelve al inicio.',
      noindex: true,
    });
  }, [pathname]);
  return null;
}
