import { Link } from 'react-router-dom';

/**
 * Las tres páginas que la revisión de contenido de Google AdSense exige: Acerca de,
 * Contacto y Privacidad.
 *
 * ## Por qué el texto está dentro del código y no en ficheros sueltos
 *
 * Porque las tres son cortas y las tres comparten el mismo esqueleto —un título y
 * secciones con encabezado—, así que separarlas en tres ficheros `md` sólo
 * multiplicaría por tres el código de carga, el esqueleto y las reglas de estilo,
 * a cambio de tres párrafos de contenido. Cuando una de las tres crezca de
 * verdade, ésa se extrae.
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
const PAGINAS: Record<'acerca-de' | 'contacto' | 'privacidad', { titulo: string; secciones: Seccion[] }> = {
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
              Todo ocurre en tu navegador. El archivo no se sube a ningún sitio
              para guardarlo, y la aplicación no tiene cuentas ni registro.
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
              Los artículos de la wiki no son texto de relleno. Cada uno se escribe
              a partir de fuentes reales, se comprueba contra ellas y se anota lo
              que las fuentes se contradicen entre sí. Cuando dos fuentes
              discrepan, el artículo explica la discrepancia en vez de elegir una y
              callar la otra.
            </p>
            <p>
              Y cada artículo explica un dato que esta aplicación ya está
              midiendo. Si el panel dice «Riesgo de warping», el artículo sobre
              warping está a un clic.
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
        titulo: 'Errores en un artículo',
        cuerpo: (
          <p>
            Si un artículo de la wiki dice algo que sabes que está mal, dilo. Cada
            uno lleva sus fuentes al pie, así que se puede comprobar la afirmación
            concreta. Una fuente que cambió, o un ajuste que dejó de ser
            recomendado, es exactamente el tipo de cosa que hay que corregir.
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
          <p>
            Nada. wiiki-3d no usa <code>localStorage</code>, ni{' '}
            <code>sessionStorage</code>, ni IndexedDB. No hay historial, ni
            favoritos, ni cuentas de usuario. Si cierras la pestaña, se ha acabado
            todo, y volver a abrir la aplicación es empezar de cero.
          </p>
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
              riesgo.
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
          <p>
            wiiki-3d no pone ninguna cookie y no carga ningún script de terceros.
            Tampoco hay analítica de ningún tipo.
          </p>
        ),
      },
      {
        titulo: 'Publicidad',
        cuerpo: (
          <>
            <p>
              <strong>Hoy esta aplicación no muestra publicidad</strong>, y por eso
              todavía no hay cookies de terceros en tu navegador.
            </p>
            <p>
              Está previsto publicitar mediante <strong>Google AdSense</strong>. Si
              se hace, Google actuará como tercero y podrá usar cookies para
              mostrarte anuncios según tus visitas anteriores a este y a otros
              sitios. Ni el contenido que leas en la wiki ni el archivo que subas se
              enviarían con esa llamada, pero su presencia en la página es lo que
              activa las cookies descritas en las
              <a href="https://policies.google.com/technologies/ads" target="_blank" rel="noopener noreferrer">
                políticas de publicidad de Google
              </a>.
            </p>
            <p>
              Puedes gestionar qué permite Google con tu actividad publicitaria en{' '}
              <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer">
                los ajustes de anuncios de Google
              </a>
              , y lo que un editor del sitio tiene que declarar a la hora de
              usar AdSense está en{' '}
              <a href="https://support.google.com/adsense/answer/1348695" target="_blank" rel="noopener noreferrer">
                la ayuda de AdSense sobre el consentimiento
              </a>
              .
            </p>
          </>
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
