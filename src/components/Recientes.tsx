import { useAnalysis } from '../state/useAnalysis';
import { useAnalysisActions } from '../state/useAnalysis';
import { useAlmacenamiento, useHistorial } from '../state/useHistorial';
import { Link } from 'react-router';
import { textoMaterial, riesgoDelMaterial } from '../lib/materiales';

/**
 * Los últimos análisis, con un enlace al historial completo.
 *
 * Vive en su propio componente y no dentro de `UploadRoute` porque **se pinta en
 * los dos estados de la ruta**: sin archivo, debajo de la zona de subida, y con
 * archivo, debajo de la barra del visor. Es el mismo dato en los dos, y escribirlo
 * dos vecesGuaría que un día uno de los dos se quede viejo.
 *
 * No hay mensaje de «no hay nada». Es una decisión, no un descuido: un historial
 * vacío no es un problema que la persona tenga que resolver, y encima de la zona
 * de subida un «todavía no hay nada» ocuparía el sitio donde va el botón de
 * subir. El estado vacío de `/` es, literalmente, no pintar nada.
 *
 * **Cinco, no más.** Es un resumen de lo que acabas de hacer, no un archivo. Quien
 * quiera la lista entera tiene el enlace de debajo, que es una decisión —no un
 *Lippshack— que obliga a mirar `/historial` para ver que existe.
 *
 * El enlace es `<Link>` y no un `<a>` a pelo, porque enrutado sin recarga es lo que
 * hace que el estado del análisis sobreviva a cambiar de vista —D8—.
 */
export function Recientes() {
  const disponible = useAlmacenamiento();
  const { restaurarAnalisis } = useAnalysisActions();
  const { status } = useAnalysis();
  // 0 o 1: sólo importa que ha pasado algo, no cuántas veces.
  const terminados = status === 'done' ? 1 : 0;
  const { entradas } = useHistorial(disponible === true, terminados);

  const cinco = entradas?.slice(0, 5) ?? [];
  const hay = disponible === true && entradas !== null && entradas.length > 0;

  // Sin almacenamiento ni historial vacío no se pinta nada, y con eso se
  // quedan fuera los dos estados que el diseño llama «sin historial» y «sin
  // IndexedDB». El aviso del segundo lo pone la vista que lo necesita; aquí
  // sería un segundo sitio que puede quedarse sin él.
  if (!hay) return null;

  return (
    <section className="recientes" aria-labelledby="recientes-titulo">
      <h2 className="recientes-titulo" id="recientes-titulo">
        Últimos análisis
      </h2>
      <ul className="recientes-lista">
        {cinco.map((e) => (
          <li key={e.id} className="recientes-fila">
            {/*
              Un `<button>`, y no un `<li>` con `onClick`.
              *
              * El elemento que se pulsa tiene que ser un control de verdad: con un
              * `<li onClick>` no hay tabulación, ni Enter, ni que un lector de
              * pantalla lo anuncie como pulsable. Es el mismo motivo por el que
              * los dos botones de subida de esta app son `<button>` y no
              * `<label htmlFor>` —y está medido con `npm run verify:teclado`.
              *
              * Es un `<button>` y no un enlace porque **no cambia de ruta**: deja
              * el mismo análisis en la misma pantalla. Un enlace que no navega
              * haría que elMiddlewares del router se activara para nada.
              */}
            <button
              type="button"
              className="recientes-boton"
              onClick={() => restaurarAnalisis(e)}
            >
              <span className="recientes-nombre">{e.filename}</span>
              <span className="recientes-meta">
                {textoMaterial(e.metadata.material)} · {riesgoDelMaterial(e.metadata.material, e.classification.riskLevel)}
              </span>
            </button>
          </li>
        ))}
      </ul>
      <Link to="/historial" className="recientes-enlace">
        Ver el historial completo
      </Link>
    </section>
  );
}

/**
 * El aviso de que el historial no está disponible.
 *
 * Va en su propio componente para que `/` y `/historial` digan exactamente lo
 * mismo con el mismo texto, y **sin botón de reintentar**: no hay nada que
 * reintentar. La decisión la toma el navegador y no cambia durante la sesión, así
 * que un botón que lo dijera otra vez sería un botón que no puede funcionar.
 */
export function AvisoAlmacenamiento() {
  const disponible = useAlmacenamiento();
  if (disponible !== false) return null;
  return (
    <p className="historial-aviso" role="status">
      El historial no está disponible en este navegador. El análisis sigue
      funcionando: es sólo esta lista la que no se guarda.
    </p>
  );
}
