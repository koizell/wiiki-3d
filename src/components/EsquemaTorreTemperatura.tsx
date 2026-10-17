const DETALLES = [
  {
    archivo: 'puenteado.svg',
    alt: 'Puente horizontal apoyado entre dos pilares, con un vano libre debajo.',
    etiqueta: 'Puenteado',
    destino: 'c-puenteado',
    descripcion: 'Compara la forma del vano entre las secciones de la torre.',
  },
  {
    archivo: 'hilos.svg',
    alt: 'Hilos finos de plástico cruzando el hueco entre dos columnas.',
    etiqueta: 'Hilos',
    destino: 'c-stringing',
    descripcion: 'Observa los hilos que quedan entre los pilares.',
  },
  {
    archivo: 'capas.svg',
    alt: 'Pared de plástico con sus capas horizontales alineadas y visibles.',
    etiqueta: 'Capas',
    destino: 'c-adhesion-capas',
    descripcion: 'El aspecto de las capas no demuestra por sí solo la resistencia de su unión.',
  },
];

/** Piloto de lectura: las imágenes ilustran las tarjetas, no añaden un diagnóstico. */
export default function EsquemaTorreTemperatura() {
  return (
    <figure className="esquema-torre" aria-labelledby="esquema-torre-titulo">
      <figcaption>
        <strong id="esquema-torre-titulo">Tres detalles para comparar en la torre</strong>
        <p>Esquema conceptual. No representa un ensayo ni asigna una temperatura a cada aspecto.</p>
      </figcaption>
      <ul className="esquema-torre__detalles">
        {DETALLES.map((detalle) => (
          <li key={detalle.archivo}>
            <img
              src={`/wiki/torre-temperatura/${detalle.archivo}`}
              width="200"
              height="200"
              loading="lazy"
              decoding="async"
              alt={detalle.alt}
            />
            <div>
              <a href={`#${detalle.destino}`}>{detalle.etiqueta}</a>
              <p>{detalle.descripcion}</p>
            </div>
          </li>
        ))}
      </ul>
    </figure>
  );
}
