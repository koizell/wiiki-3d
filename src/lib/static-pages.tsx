/*
 * Este módulo NO entra en el bundle del navegador: sólo lo carga
 * `scripts/export-static.mjs` con `server.ssrLoadModule()` durante el build
 * estático. Nunca pasa por el HMR, así que la regla de fast-refresh
 * (`react-refresh/only-export-components`) no aplica: es un falso positivo.
 * El fichero exporta dos funciones de render (`paginasEstaticas` y
 * `paginasDeHerramienta`) y, para montarlas, define varios componentes
 * privados. Extraerlos a otro fichero no aportaría nada —son de un solo uso y
 * sólo existen en el render del servidor—, así que se desactiva aquí, con motivo.
 */
/* eslint-disable react-refresh/only-export-components */
import { renderToStaticMarkup } from 'react-dom/server';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import WikiIndexRoute from '../routes/WikiIndexRoute';
import GuiaRoute from '../routes/GuiaRoute';
import InfoRoute from '../routes/InfoRoute';
import Inicio from '../components/Inicio';
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
 *
 * ## Y por eso la etapa 4 se exporta en modo recetario
 *
 * «No puede contener el diagnóstico interactivo» no puede significar «no puede
 * contener las acciones», y durante un tiempo significó eso: sin respuestas,
 * `reglasQueSalen` devuelve el array vacío y **ocho de las nueve guías publicaban
 * «Qué cambiar» con cero acciones**. La etapa que es el producto de la guía era la
 * única que no aparecía.
 *
 * La salida es `exportEstatico`: la misma etapa, contada como recetario completo
 * agrupado por la variable que lo desbloquea. Misma información, forma distinta, y
 * sin necesidad de estado. Ver `accionesPosibles` en `lib/guias.ts`.
 *
 * El flag se pasa **a la ruta** y no se lee de un contexto a propósito: es una
 * propiedad del render —se está exportando o no— y no un estado de la aplicación.
 * Un contexto lo convertiría en algo que alguien puede cambiar en tiempo de
 * ejecución, y eso no tiene ningún sentido para una bandera de compilación.
 *
 * ## La portada, que antes no estaba aquí
 *
 * `/` se exportaba en `export-static.mjs` con un HTML escrito a mano que decía
 * «Esta herramienta necesita JavaScript». Era **toda** la portada: 44 palabras, y
 * ninguna de ellas contenido. La página que ve quien llega desde un buscador —y la
 * que ve un revisor— no podía decir menos.
 *
 * Ahora `/` se renderiza como las demás, con `Inicio`, que es contenido
 * real: qué es el sitio, la tabla de temperaturas por material con su fuente, cómo
 * funciona el análisis, los nueve problemas cubiertos y las preguntas frecuentes.
 * Y `/taller` deja de ser un aviso para ser una página que explica qué calcula, con
 * qué fórmula y qué **no** calcula.
 */
function Pagina({ children }: { children: React.ReactNode }) {
  return (
    <>
      <header className="wiki-info">
        <nav aria-label="Navegación del sitio">
          <a href="/">Inicio</a> · <a href="/wiki">Wiki 3D</a> · <a href="/taller">Taller</a>
        </nav>
        <noscript>
          <p>
            Las guías y esta página se pueden leer sin JavaScript. El diagnóstico
            interactivo y las herramientas necesitan activarlo.
          </p>
        </noscript>
      </header>
      <main>{children}</main>
      <SiteFooter />
    </>
  );
}

/**
 * Una página de herramienta: contenido de verdad, sin la herramienta.
 *
 * Las tres rutas que necesitan JavaScript para funcionar —`/taller`, `/historial`
 * y `/proyectos`— se exportan con su texto y **sin** el formulario ni la lista: lo
 * que no se puede hacer sin el navegador es usar la herramienta, no entender para
 * qué sirve. Antes eran un párrafo de aviso; ahora son una página.
 *
 * El aviso de que hace falta JavaScript **se queda**, pero al final y después de
 * haber dicho lo que hay. Un aviso primero es una disculpa; un aviso después es una
 * instrucción.
 */
function PaginaHerramienta({
  titulo,
  children,
  aviso,
}: {
  titulo: string;
  children: React.ReactNode;
  aviso: string;
}) {
  return (
    <article className="wiki-info inicio-estatico">
      <h1>{titulo}</h1>
      {children}
      <p className="inicio-estatico-aviso">{aviso}</p>
    </article>
  );
}

/** El texto de `/taller`: qué calcula, con qué, y qué no. */
function TallerEstatico() {
  return (
    <PaginaHerramienta
      titulo="Calculadora de coste de impresión 3D"
      aviso="Para calcular hace falta JavaScript y un G-code cargado: la herramienta toma los gramos del propio archivo, no de un número que se teclee."
    >
      <p>
        El taller convierte los gramos de filamento que trae tu G-code en un coste,
        con el precio por kilogramo que teclees tú. Nada más, y eso es deliberado.
      </p>
      <h2>Por qué los gramos no se teclean</h2>
      <p>
        Porque un coste calculado sobre un número escrito a mano tiene exactamente el
        mismo aspecto que uno calculado sobre un número medido, y no valen lo mismo.
        Los gramos salen del archivo que exportó el slicer, que es el único sitio
        donde están de verdad.
      </p>
      <h2>Qué calcula exactamente</h2>
      <p>
        Gramos de filamento × precio por kilogramo. El resultado es el coste de
        material de esa pieza, sin electricidad, sin horas de máquina y sin mano de
        obra: no son datos que estén en el G-code, y pedirlos a mano convertiría esta
        calculadora en una hoja de cálculo con otra cara.
      </p>
      <h2>Qué no calcula</h2>
      <ul>
        <li>Electricidad: depende de la potencia de tu máquina y del precio de tu tarifa.</li>
        <li>Desgaste de la máquina, boquilla y mantenimiento.</li>
        <li>El precio del filamento: no se guarda, se teclea cada vez. Un precio de hoy es un dato falso dentro de un año.</li>
      </ul>
      <h2>Con qué se combina</h2>
      <p>
        Con la guía de <a href="/wiki/material">material</a> para entender por qué dos
        filamentos con el mismo precio no cuestan lo mismo por pieza —densidad,
        contracción y humedad cambian el resultado—, y con el{' '}
        <a href="/wiki">índice de síntomas</a> cuando el problema no es el coste sino
        el resultado.
      </p>
    </PaginaHerramienta>
  );
}

/** El texto de `/historial`. */
function HistorialEstatico() {
  return (
    <PaginaHerramienta
      titulo="Historial local de análisis"
      aviso="La lista de análisis vive en el almacenamiento de tu navegador, así que necesita JavaScript para leerse."
    >
      <p>
        Cada vez que analizas un G-code, wiiki-3d guarda el resultado en tu propio
        navegador para que puedas volver a consultarlo sin subir el archivo otra vez.
      </p>
      <h2>Qué se guarda</h2>
      <p>
        El nombre y el tamaño del archivo, su tipo, la fecha, los metadatos extraídos
        y el diagnóstico. <strong>El archivo completo no se guarda</strong>, ni su
        geometría, y nada se sincroniza con otros dispositivos.
      </p>
      <h2>Dónde está y cómo se borra</h2>
      <p>
        En IndexedDB, la base de datos local del navegador: no hay cuentas ni
        servidor. Cerrar la pestaña no lo borra; puedes eliminar una entrada o
        vaciarlo desde la propia página, o borrar los datos del sitio desde tu
        navegador. Los detalles están en la{' '}
        <a href="/privacidad">política de privacidad</a>.
      </p>
    </PaginaHerramienta>
  );
}

/** El texto de `/proyectos`. */
function ProyectosEstatico() {
  return (
    <PaginaHerramienta
      titulo="Proyectos: tus análisis guardados"
      aviso="Los proyectos se leen del almacenamiento de tu navegador, así que la lista necesita JavaScript."
    >
      <p>
        Un proyecto es un análisis guardado con un nombre propio. Sirve para volver a
        él sin acordarse del nombre del archivo, que es como se llaman las cosas por
        defecto y no como las recuerdas.
      </p>
      <h2>Qué lo distingue del historial</h2>
      <p>
        El historial es lo que acabas de hacer y se ordena por fecha. Un proyecto es
        lo que has decidido conservar y se ordena por el nombre que le pusiste.
      </p>
      <h2>Dónde vive</h2>
      <p>
        En el almacenamiento de tu navegador, igual que el historial. No hay cuentas,
        no se sube nada y no se sincroniza entre dispositivos: si borras los datos
        del sitio, se van con ellos.
      </p>
    </PaginaHerramienta>
  );
}

export function paginasEstaticas(): { seo: SeoPagina; html: string }[] {
  const paginas = [
    SEO_PAGINAS['/'],
    SEO_PAGINAS['/taller'],
    SEO_PAGINAS['/wiki'],
    SEO_PAGINAS['/acerca-de'],
    SEO_PAGINAS['/contacto'],
    SEO_PAGINAS['/privacidad'],
    SEO_PAGINAS['/autor'],
    ...GUIAS.map(seoGuia),
  ];
  return paginas.map((seo) => ({
    seo,
    html: renderToStaticMarkup(
      <AnalysisProvider>
        <ProveedorGuia>
          <MemoryRouter initialEntries={[seo.path]}>
            <Pagina>
              <Routes>
                <Route path="/" element={<Inicio interactivo={false} />} />
                <Route path="/taller" element={<TallerEstatico />} />
                <Route path="/wiki" element={<WikiIndexRoute />} />
                <Route path="/wiki/:slug" element={<GuiaRoute exportEstatico />} />
                <Route path="/acerca-de" element={<InfoRoute pagina="acerca-de" />} />
                <Route path="/contacto" element={<InfoRoute pagina="contacto" />} />
                <Route path="/privacidad" element={<InfoRoute pagina="privacidad" />} />
                <Route path="/autor" element={<InfoRoute pagina="autor" />} />
              </Routes>
            </Pagina>
          </MemoryRouter>
        </ProveedorGuia>
      </AnalysisProvider>
    ),
  }));
}

/**
 * Las páginas de herramienta que sólo existen como texto.
 *
 * Van aparte de `paginasEstaticas()` porque su ruta **no** se puede renderizar: en
 * la aplicación, `/historial` y `/proyectos` leen el almacenamiento del navegador y
 * su primer render no tiene nada que enseñar. Exportarlas con el renderizador daría
 * una página vacía con el pie, que es peor que el texto de arriba.
 */
export function paginasDeHerramienta(): { seo: SeoPagina; html: string }[] {
  const definiciones: { seo: SeoPagina; nodo: React.ReactNode }[] = [
    { seo: SEO_PAGINAS['/historial'], nodo: <HistorialEstatico /> },
    { seo: SEO_PAGINAS['/proyectos'], nodo: <ProyectosEstatico /> },
  ];
  return definiciones.map(({ seo, nodo }) => ({
    seo,
    html: renderToStaticMarkup(
      <MemoryRouter initialEntries={[seo.path]}>
        <Pagina>{nodo}</Pagina>
      </MemoryRouter>
    ),
  }));
}
