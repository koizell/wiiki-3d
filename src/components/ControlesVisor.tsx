interface ControlesVisorProps {
  mensaje: string;
  disabled?: boolean;
  onAcercar?: () => void;
  onAlejar?: () => void;
  onGirar?: () => void;
  onEncuadrar?: () => void;
}

/** Ligero: también reserva el espacio del toolbar mientras se descarga three.js. */
export default function ControlesVisor({ mensaje, disabled, onAcercar, onAlejar, onGirar, onEncuadrar }: ControlesVisorProps) {
  return (
    <div className="visor-herramientas">
      <p className="visor-estado" role="status">{mensaje}</p>
      <div className="visor-controles" role="group" aria-label="Controles del visor">
        <button type="button" disabled={disabled} className="btn-ghost" aria-label="Acercar modelo" onClick={onAcercar}>+</button>
        <button type="button" disabled={disabled} className="btn-ghost" aria-label="Alejar modelo" onClick={onAlejar}>−</button>
        <button type="button" disabled={disabled} className="btn-ghost" onClick={onGirar}>Girar modelo</button>
        <button type="button" disabled={disabled} className="btn-ghost" onClick={onEncuadrar}>Encuadrar modelo</button>
      </div>
    </div>
  );
}
