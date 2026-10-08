/** Metadatos compartidos entre la navegación y la exportación estática. */
export const ORIGEN = 'https://wiiki-3d.com';

export interface SeoPagina {
  title: string;
  description: string;
  path: string;
  noindex?: boolean;
  schema?: Record<string, unknown>;
}

export const SEO_PAGINAS: Record<string, SeoPagina> = {
  '/': {
    path: '/', title: 'wiiki-3d: análisis de G-code y guías de impresión 3D',
    description: 'Analiza metadatos de G-code, consulta guías con fuentes sobre impresión 3D y calcula el coste de tus piezas. Visor local para modelos STL y 3MF.',
  },
  '/wiki': {
    path: '/wiki/', title: 'Diagnóstico de impresión 3D por síntomas | wiiki-3d',
    description: 'Encuentra tu problema de impresión por el síntoma que ves en la pieza: warping en PLA o separación entre capas. Cada guía termina con las acciones que aplican a tu montaje, con su fuente.',
  },
  '/taller': {
    path: '/taller/', title: 'Calculadora de coste de impresión 3D | wiiki-3d',
    description: 'Calcula el coste de filamento de una impresión 3D con los gramos extraídos de tu G-code y el precio por kilogramo. Cálculo local; no incluye electricidad ni mano de obra.',
  },
  '/acerca-de': {
    path: '/acerca-de/', title: 'Acerca de wiiki-3d: análisis y wiki de impresión 3D',
    description: 'Conoce wiiki-3d, sus herramientas de análisis local y su wiki de impresión 3D. Los artículos citan fuentes y explican sus discrepancias.',
  },
  '/contacto': {
    path: '/contacto/', title: 'Contacto y correcciones de la wiki | wiiki-3d',
    description: 'Contacta con wiiki-3d para comunicar errores en las guías de impresión 3D, aportar fuentes y enviar consultas sobre la aplicación.',
  },
  '/privacidad': {
    path: '/privacidad/', title: 'Política de privacidad e historial local | wiiki-3d',
    description: 'Qué guarda wiiki-3d en IndexedDB, cómo borrar el historial y qué metadatos puede enviar el clasificador. Información sobre publicidad y privacidad.',
  },
  '/historial': {
    path: '/historial/', title: 'Historial local de análisis | wiiki-3d',
    description: 'Consulta y elimina los análisis guardados en este navegador. Los archivos completos no se almacenan ni se sincronizan entre dispositivos.', noindex: true,
  },
  '/proyectos': {
    path: '/proyectos/', title: 'Proyectos: función en desarrollo | wiiki-3d',
    description: 'La organización de proyectos está en desarrollo. El historial local de análisis ya está disponible desde la página de inicio.', noindex: true,
  },
};

/**
 * Los metadatos de una guía.
 *
 * ## Por qué el `Article` se ha ido y ahora hay un `HowTo`
 *
 * Porque la página ya no es un artículo: es un procedimiento que lleva a una
 * decisión, y el marcado de `Article` prometería algo que no hay —una lectura
 * larga con autor y fecha de revisión—. Lo que sí encaja es `HowTo`, cuyo
 * `step` es exactamente lo que la guía tiene: un diferencial, unas variables y
 * una lista de acciones.
 *
 * La fecha de publicación y la de modificación **no se inventan**. Sin campo de
 * fecha en la guía no se pone `datePublished`, y una fecha inventada es peor que
 * ninguna: Google la lee y no la puede comprobar.
 */
export function seoGuia(guia: {
  slug: string;
  titulo: string;
  sintoma: string;
  resumen: string;
  minutos: number;
  reglas: Array<{ accion: string; valor?: string }>;
}): SeoPagina {
  const path = `/wiki/${guia.slug}/`;
  const pasos = guia.reglas.slice(0, 8).map((r) => ({
    '@type': 'HowToStep',
    name: r.accion,
    text: r.valor ? `${r.accion}: ${r.valor}` : r.accion,
  }));

  return {
    path,
    title: `${guia.sintoma} | ${guia.titulo} | wiiki-3d`,
    description: guia.resumen,
    schema: {
      '@context': 'https://schema.org',
      '@type': 'HowTo',
      name: `${guia.sintoma}: ${guia.titulo}`,
      description: guia.resumen,
      inLanguage: 'es',
      totalTime: `PT${guia.minutos}M`,
      mainEntityOfPage: `${ORIGEN}${path}`,
      step: pasos,
    },
  };
}

/** Se usa en efectos; nunca durante el renderizado de la exportación estática. */
export function actualizarSeo(pagina: SeoPagina): void {
  document.title = pagina.title;
  const meta = (name: string, content: string) => {
    let nodo = document.head.querySelector<HTMLMetaElement>(`meta[name="${name}"]`);
    if (!nodo) {
      nodo = document.createElement('meta');
      nodo.name = name;
      document.head.append(nodo);
    }
    nodo.content = content;
  };
  meta('description', pagina.description);
  meta('robots', pagina.noindex ? 'noindex, follow' : 'index, follow');
  let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!canonical) {
    canonical = document.createElement('link');
    canonical.rel = 'canonical';
    document.head.append(canonical);
  }
  canonical.href = `${ORIGEN}${pagina.path}`;
  document.getElementById('wiki-schema')?.remove();
  if (pagina.schema) {
    const schema = document.createElement('script');
    schema.id = 'wiki-schema';
    schema.type = 'application/ld+json';
    schema.textContent = JSON.stringify(pagina.schema);
    document.head.append(schema);
  }
}
