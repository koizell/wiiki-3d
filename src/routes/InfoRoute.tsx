import { Link } from 'react-router-dom';
import { GUIAS } from '../lib/guias';
import { AUTOR } from '../content/guias/autor';

/**
 * Páginas de información y transparencia: Acerca de, Contacto y Privacidad.
 *
 * ## Por qué el texto está dentro del código y no en ficheros sueltos
 *
 * Porque las tres son cortas y las tres comparten el mismo esqueleto —un título y
 * secciones con encabezado—, así que separarlas en tres ficheros `md` sólo
 * multiplicaría por tres el código de carga, el esqueleto y las reglas de estilo,
 * a cambio de tres párrafos de contenido. Cuando una de las tres crezca de
 * verdad, ésa se extrae.
 *
 * ## Lo que estas páginas no pueden hacer
 *
 * No pueden afirmar cosas que no sean ciertas. Concretamente, este archivo **no
 * dice que la aplicación no mande datos a nadie**, porque no es verdad: al subir un
 * G-code envía sus metadatos —incluido el nombre del archivo— al clasificador de
 * Jev. Tampoco dice que no habrá cookies, porque en cuanto haya publicidad las
 * habrá: puesto el script de AdSense, algunas dejan de ser nuestras. Sí dice lo que
 * no hay hoy, y lo que habría mañana, distinguiéndolo.
 */

/** Una sección de una de estas páginas. */
interface Seccion {
  titulo: string;
  cuerpo: React.ReactNode;
}

/**
 * El canal de contacto: `contacto@wiiki-3d.com`.
 *
 * ## Por qué el dominio y no una bandeja personal
 *
 * Lo que hay detrás es lo que nadie ve desde fuera; lo que se ve en la página es lo
 * que la gente responde, y por eso tiene que ser del dominio. Cloudflare Email
 * Routing reenvía a la bandeja real, y el buzón del dominio es lo único que se
 * escribe en el código.
 *
 * Un sitio que se va a monetizar y que enseña una dirección de correo personal en su
 * página de contacto manda una señal que la revisión de contenido no lee bien: que el
 * proyecto es de alguien suelto y no de una publicación.
 *
 * ## Esta constante y `scripts/verify/wiki.mjs`
 *
 * Las comprobaciones del contacto verifican que el enlace sea un `mailto:` con una
 * dirección dentro, que el texto coincida con él, y que la dirección se lea en el
 * cuerpo de la página. **Ninguna de ellas puede detectar que la dirección sea la
 * equivocada.** Una dirección bien formada que rebota es indistinguible de una que
 * funciona, y ahí es donde queda una página que parece resolver el requisito de
 * AdSense y en realidad no resuelve nada.
 *
 * Ya ha pasado: esta constante fue `hola@wiiki-3d.com` y el enrutado configurado en
 * Cloudflare es `contacto@wiiki-3d.com`. Cuatro comprobaciones automáticas en verde y
 * un `mailto:` que rebotaba.
 *
 * La única defensa que queda es escribirla una vez y contrastarla con la
 * configuración de enrutado antes de publicar. Está anotado en `docs/estado.md`.
 */
const CONTACTO = 'contacto@wiiki-3d.com';

/** Las secciones de cada página, en el orden en que se leen. */
const PAGINAS: Record<'acerca-de' | 'contacto' | 'privacidad' | 'autor', { titulo: string; secciones: Seccion[] }> = {
  'acerca-de': {
    titulo: 'Acerca de wiiki-3d',
    secciones: [
      {
        titulo: 'Qué es',
        cuerpo: (
          <>
            <p>
              wiiki-3d analiza archivos G-code y te dice qué lleva dentro: material,
              temperaturas, altura de capa, cuánto filamento consume y cuánto
              tarda. A eso añade un diagnóstico de riesgo —warping, soportes— y un
              visor 3D para los archivos que no tienen metadatos.
            </p>
            <p>
              La lectura del archivo ocurre en tu navegador. El archivo completo
              no se envía para guardarlo. El historial conserva los resultados
              localmente y la aplicación no tiene cuentas ni registro.
            </p>
          </>
        ),
      },
      {
        titulo: 'Qué hace con tu archivo',
        cuerpo: (
          <p>
            Al leer un G-code, wiiki-3d extrae los metadatos y envía <strong>sólo
            esos metadatos</strong> a un servicio de clasificación para que te dé el
            diagnóstico de riesgo. El archivo entero no se envía, pero{' '}
            <strong>el nombre del archivo sí forma parte del envío</strong>. Las
            STL y los 3MF no se analizan y no generan ninguna llamada. Está
            detallado en la <Link to="/privacidad">política de privacidad</Link>.
          </p>
        ),
      },
      {
        titulo: 'La wiki',
        cuerpo: (
          <>
            <p>
              La wiki no son artículos largos. Cada guía se abre por{' '}
              <strong>el síntoma que ves en la pieza</strong> —las esquinas se levantan,
              las capas se sueltan por dentro— y lo primero que hace es comprobar que
              es ese problema y no el de al lado, porque warping y separación entre
              capas se parecen en la foto y no se arreglan con lo mismo.
            </p>
            <p>
              Después tú declaras tu montaje: material, chapa, tamaño, dónde está la
              impresora. Y la guía se estrecha con cada respuesta. Las cifras que no
              apliquen a lo que has marcado desaparecen, y la lista de acciones sale
              con el número concreto y la fuente de donde sale. Si el panel dice
              «Riesgo de warping, 35 %», la guía que explica ese 35 % está a un clic.
            </p>
            <p>
              Cada guía termina con lo que <strong>no</strong> resuelve, y con las
              fuentes de las que sale todo. Cuando dos fabricantes se contradicen, la
              guía enseña la contradicción en vez de elegir una y callar la otra.
            </p>
            <p>
              <Link to="/wiki">Empieza por el síntoma que tienes</Link>.
            </p>
          </>
        ),
      },
    ],
  },

  contacto: {
    titulo: 'Contacto',
    secciones: [
      {
        titulo: 'Cómo escribirnos',
        cuerpo: (
          /*
           * El `?:` que había aquí se ha ido con el aviso que lo acompañaba. Con la
           * dirección puesta, una condición que puede ser falsa es una rama que
           * nadie va a ver nunca y que el compilador tiene que seguir comprobando.
           * Si algún día hay que volver a la versión sin canal, se vuelve a
           * escribir entera, y no a mantenerla encendida.
           *
           * El aviso «este canal no está configurado» era lo correcto cuando
           * `CONTACTO` estaba vacío y es incorrecto ahora: la página mentía al revés,
           * diciendo que no había forma de escribir cuando la hay.
           */
          <p>
            Escríbenos a{' '}
            <a href={`mailto:${CONTACTO}`}>
              <code>{CONTACTO}</code>
            </a>
            . Leemos todo lo que llega, y contestamos los errores de la wiki
            aunque no lleguemos a contestarlo todo lo demás.
          </p>
        ),
      },
      {
        titulo: 'Errores en una guía',
        cuerpo: (
          <p>
            Si una guía dice algo que sabes que está mal, dilo. Cada acción lleva la
            fuente de la que sale y cada ficha lleva sus fuentes al pie, así que se
            puede comprobar la afirmación concreta: una fuente que cambió, una cifra
            que se movió, un ajuste que dejó de ser recomendado. Es exactamente el
            tipo de cosa que hay que corregir, y con la URL del hilo o de la página
            llega antes.
          </p>
        ),
      },
    ],
  },

  privacidad: {
    titulo: 'Política de privacidad',
    secciones: [
      {
        titulo: 'Qué guardamos',
        cuerpo: (
          <>
            <p>
              wiiki-3d guarda un historial local de los análisis completados en
              <strong> IndexedDB</strong>, una base de datos de tu navegador.
              Conserva el nombre y tamaño del archivo, su tipo, la fecha, los
              metadatos extraídos y el resultado de la clasificación. No guarda
              el archivo completo ni su geometría y no lo sincroniza con otros dispositivos.
            </p>
            <p>
              Cerrar la pestaña no borra ese historial. Puedes eliminar una entrada
              o vaciarlo desde <Link to="/historial">Historial</Link>, o borrar los
              datos del sitio en tu navegador. El navegador también puede eliminar
              estos datos; si no permite el almacenamiento, el historial no funciona.
              No hay cuentas de usuario.
            </p>
          </>
        ),
      },
      {
        titulo: 'Qué sale de tu navegador',
        cuerpo: (
          <>
            <p>
              Al subir un archivo <strong>G-code</strong>, la aplicación envía sus
              metadatos de impresión —material, temperaturas, altura de capa, tiempo
              y filamento— a un clasificador para que te dé el diagnóstico de
              riesgo cuando está configurado el servicio real. En modo de
              demostración, la clasificación se calcula localmente y no se hace ese envío.
            </p>
            <p>
              Ese envío va primero a un proxy propio y de ahí al servicio de
              clasificación. Dos cosas conviene que sepas: <strong>el nombre del
              archivo forma parte de los metadatos y viaja con ellos</strong>, y{' '}
              <strong>los archivos STL, 3MF y OBJ no generan ninguna llamada</strong>,
              porque no se analizan.
            </p>
          </>
        ),
      },
      {
        titulo: 'Cookies y seguimiento',
        cuerpo: (
          <>
            <p>
              El código actual no incorpora cookies publicitarias ni herramientas
              de analítica. El historial usa IndexedDB, no cookies, y no hay cuentas
              de usuario.
            </p>
            <p>
              El sitio se sirve desde <strong>GitHub Pages</strong>, que como
              cualquier alojamiento puede registrar datos de conexión —dirección IP,
              agente de navegador y la página pedida— para servirla y proteger el
              servicio.
            </p>
          </>
        ),
      },
      {
        titulo: 'Publicidad',
        cuerpo: (
          <>
            <p>
              <strong>Hoy esta aplicación no muestra publicidad</strong> ni carga
              el script de AdSense.
            </p>
            <p>
              Está previsto publicitar mediante <strong>Google AdSense</strong>. Si
              se activa, <strong>Google y sus socios</strong> actuarán como terceros
              y podrán usar cookies —incluida la de DoubleClick— para mostrarte
              anuncios según tus visitas anteriores a este y a otros sitios, según el
              consentimiento aplicable. Los anuncios pueden procesar la URL de la
              página, la dirección IP y datos del navegador. No se enviará el archivo
              subido como dato publicitario. Antes de activar anuncios se actualizará
              esta política y se configurará la gestión del consentimiento que
              corresponda. Consulta las{' '}
              <a href="https://policies.google.com/technologies/ads" target="_blank" rel="noopener noreferrer">
                políticas de publicidad de Google
              </a>.
            </p>
          </>
        ),
      },
      {
        titulo: 'Tus opciones',
        cuerpo: (
          <>
            <p>
              Puedes gestionar qué permite Google con tu actividad publicitaria en{' '}
              <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer">
                los ajustes de anuncios de Google
              </a>
              , y qué cookies acepta este sitio desde los controles de tu navegador.
              Borrar el historial local no depende de ningún servidor: está en{' '}
              <Link to="/historial">Historial</Link>.
            </p>
            <p>
              Lo que un editor tiene que declarar sobre el consentimiento está en{' '}
              <a href="https://support.google.com/adsense/answer/1348695" target="_blank" rel="noopener noreferrer">
                la ayuda de AdSense sobre el consentimiento
              </a>
              .
            </p>
          </>
        ),
      },
      {
        titulo: 'Cambios en esta política',
        cuerpo: (
          <p>
            Cuando se active la publicidad o una herramienta de analítica, esta
            página se actualizará para decirlo <strong>antes</strong> de que el cambio
            llegue al sitio publicado. Lo que lees aquí describe lo que el código hace
            hoy, no lo que podría llegar a hacer.
          </p>
        ),
      },
    ],
  },
  autor: {
    titulo: 'Quién escribe en wiiki-3d',
    secciones: [
      {
        titulo: 'El autor',
        cuerpo: (
          <>
            <p>
              <strong>{AUTOR.nombre}</strong> — {AUTOR.credencial}. Escribe las guías de
              la wiki y responde de ellas en el{' '}
              <a href={AUTOR.perfil} target="_blank" rel="noopener noreferrer">
                perfil de Instagram
              </a>
              .
            </p>
            <p>
              No es un redactor genérico. Si una guía se equivoca o una fuente cambia,
              hay una persona concreta a la que se le puede pedir la corrección: ésa es
              la mitad del valor de firmar lo que se lee.
            </p>
          </>
        ),
      },
      {
        titulo: 'Cómo se hace cada guía',
        cuerpo: (
          <>
            <p>
              Cuatro pasos, y ninguno se salta. Se recogen fuentes primarias —fichas de
              fabricante y bases de conocimiento—; se extraen sólo las afirmaciones que
              esas fuentes respaldan; se redactan como un instrumento que calcula la
              recomendación según tu montaje; y se revisan contra las fuentes antes de
              publicar.
            </p>
            <p>
              Cuando dos fabricantes se contradicen, la guía enseña la contradicción en
              vez de elegir una y callar la otra. Ninguna cifra aparece sin la fuente de
              la que sale.
            </p>
          </>
        ),
      },
      {
        titulo: 'Las guías publicadas',
        cuerpo: (
          <ul className="autor-guias">
            {GUIAS.map((g) => (
              <li key={g.slug}>
                <Link to={`/wiki/${g.slug}`}>{g.sintoma}</Link> · {g.minutos} min
              </li>
            ))}
          </ul>
        ),
      },
    ],
  },
};

export default function InfoRoute({ pagina }: { pagina: keyof typeof PAGINAS }) {
  const { titulo, secciones } = PAGINAS[pagina];

  return (
    <article className="wiki-info">
      <h1>{titulo}</h1>
      {secciones.map((s) => (
        <section key={s.titulo}>
          <h2>{s.titulo}</h2>
          {s.cuerpo}
        </section>
      ))}
    </article>
  );
}
