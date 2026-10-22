/**
 * La cabecera de plano de una ruta: `02 · TALLER` a la izquierda, el estado a la
 * derecha, y el titular debajo.
 *
 * ## Qué es
 *
 * La pide la spec de identidad visual (§5 y §7.2): **cada ruta abre con una
 * cabecera de plano**. La portada la tenía desde el 21 de octubre; el índice de
 * la wiki, desde el rediseño de la guía; y las demás rutas seguían sin ella.
 *
 * ## Por qué el estado no es adorno
 *
 * Porque dice **qué está pasando en la pantalla**, y eso es información que no
 * está en ninguna otra parte. En la portada es «Sin archivo» —ahí no hay
 * ninguno— o «Modo lectura», que es lo que ve el HTML exportado, que no tiene
 * analizador. En Taller es si hay un archivo con el que calcular. En la wiki es
 * si el buscador tiene algo que filtrar.
 *
 * ## Por qué un componente y no tres copias
 *
 * Porque las tres versiones que había —la de la portada, la de la guía y la que
 * faltaba— se separaron en el nombre de las clases (`.plano-ruta` y
 * `.guia-plano-ruta` son lo mismo con dos nombres) y en el formato. Un
 * componente es lo que evita que la cuarta copia se escriba otra vez.
 */
export default function CabeceraRuta({
  numero,
  nombre,
  estado,
}: {
  /** El número de plano de la ruta: `01`, `02`… */
  numero: string;
  /** El nombre de la ruta, en mayúsculas: `Taller`, `Wiki`… */
  nombre: string;
  /** Qué está pasando en la pantalla. Sin estado, no se pinta el hueco. */
  estado?: string;
}) {
  return (
    <p className="plano-ruta">
      <span>
        {numero} · {nombre}
      </span>
      {estado ? <span className="plano-ruta-estado">{estado}</span> : null}
    </p>
  );
}
