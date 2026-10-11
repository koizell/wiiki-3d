import { useEffect, useId, useRef } from 'react';

/**
 * Los dos diálogos modales de la app: confirmar un borrado y poner nombre a un
 * proyecto.
 *
 * ## Por qué están juntos y no cada uno donde se usa
 *
 * Porque ahora los usan dos vistas —el historial y proyectos— y hasta hoy
 * `Confirmacion` vivía dentro de `HistorialRoute`. Copiarlo habría duplicado la
 * gestión de foco y de `Escape`, que es justo la parte que se puede hacer mal en
 * silencio: un diálogo sin foco no se puede cerrar con teclado y no lo delata
 * ninguna captura. Un sitio, una vez.
 *
 * Los dos comparten la capa `.confirmacion-capa` —fija, a pantalla completa, con
 * el fondo fuera de alcance— y el mismo reparto de botones. Lo que cambia es el
 * contenido: uno pide una decisión y el otro, un nombre.
 */

/** Una confirmación modal, con el foco dentro y `Escape` para salir. */
export function Confirmacion({
  texto,
  aceptar,
  onAceptar,
  onCancelar,
}: {
  texto: string;
  aceptar: string;
  onAceptar: () => void;
  onCancelar: () => void;
}) {
  const ref = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    ref.current?.focus();
    const alPulsar = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onCancelar();
    };
    window.addEventListener('keydown', alPulsar);
    return () => window.removeEventListener('keydown', alPulsar);
  }, [onCancelar]);

  // `alertdialog` y no `dialog`: con `alertdialog` el lector de pantalla anuncia
  // que el resto está bloqueado, y quien navega con teclado sabe que hay que
  // decidir antes de seguir.
  return (
    <div className="confirmacion-capa" role="presentation">
      <div className="confirmacion" role="alertdialog" aria-modal="true" aria-label={texto}>
        <p className="confirmacion-texto">{texto}</p>
        <div className="confirmacion-botones">
          <button type="button" className="btn-ghost" onClick={onCancelar}>
            Cancelar
          </button>
          <button ref={ref} type="button" className="btn-danger" onClick={onAceptar}>
            {aceptar}
          </button>
        </div>
      </div>
    </div>
  );
}

/**
 * El diálogo para nombrar un proyecto.
 *
 * Es un `<form>` y no un `div` con un botón a mano: así `Enter` guarda sin que
 * haya que escuchar el teclado, y el navegador asocia la etiqueta con el campo
 * sin que haya que enlazarlos a mano. `role="dialog"` y no `alertdialog`: no hay
 * nada que decidir ni que se pueda perder, sólo un dato que se escribe.
 *
 * El foco entra en el campo y **se selecciona el texto que ya hubiera**, para que
 * renombrar no obligue a borrar lo anterior a mano.
 */
export function DialogoNombre({
  inicial,
  onGuardar,
  onCancelar,
}: {
  inicial: string;
  onGuardar: (nombre: string) => void;
  onCancelar: () => void;
}) {
  const ref = useRef<HTMLInputElement>(null);
  const id = useId();
  const campoId = `${id}-campo`;

  useEffect(() => {
    ref.current?.focus();
    ref.current?.select();
    const alPulsar = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onCancelar();
    };
    window.addEventListener('keydown', alPulsar);
    return () => window.removeEventListener('keydown', alPulsar);
  }, [onCancelar]);

  return (
    <div className="confirmacion-capa" role="presentation">
      <form
        className="confirmacion"
        role="dialog"
        aria-modal="true"
        aria-labelledby={id}
        onSubmit={(e) => {
          e.preventDefault();
          onGuardar(ref.current?.value ?? '');
        }}
      >
        <label className="confirmacion-etiqueta" id={id} htmlFor={campoId}>
          Nombre del proyecto
        </label>
        <input
          id={campoId}
          ref={ref}
          className="confirmacion-campo"
          type="text"
          defaultValue={inicial}
          maxLength={80}
          autoComplete="off"
          placeholder="Por ejemplo: soporte de pared"
        />
        <div className="confirmacion-botones">
          <button type="button" className="btn-ghost" onClick={onCancelar}>
            Cancelar
          </button>
          <button type="submit" className="btn-primary">
            Guardar
          </button>
        </div>
      </form>
    </div>
  );
}
