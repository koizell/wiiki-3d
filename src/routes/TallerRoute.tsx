import { useId, useState } from 'react';
import { useAnalysis } from '../state/useAnalysis';
import { conComa, lineaCalculo, validarPrecio } from '../lib/coste';

/**
 * Taller: cuánto cuesta una pieza.
 *
 * La ruta es la única parte de la app que **no lee nada**: sólo espera a que haya
 * un G-code y calcula sobre los gramos que traía. Los gramos no se teclean, y esa
 * es la decisión que sostiene todo lo demás —ver `docs/taller.md`—: un coste
 * sobre un número tecleado por la persona tendría el mismo aspecto que un coste
 * sobre un número medido, y esa es la forma de engañar sin querer.
 *
 * Por eso el estado 3 no enseña ningún número, ni provisional ni orientativo.
 *
 * El precio **no se guarda**. Ni en el estado de esta vista, ni en
 * `localStorage`, ni en IndexedDB: se teclea cada vez y se pierde al salir. Un
 * precio de filamento de 2026 es un dato falso en 2027, y guardarlo convertiría
 * el único módulo no bloqueado en uno bloqueado por el módulo de almacenamiento.
 *
 * Sólo lee `metadata` del contexto y no añade nada, para que el análisis sobreviva
 * a la navegación: se viene de `/`, se mira el coste, y al volver sigue ahí.
 */
function TallerRoute() {
  const { file, fileType, metadata } = useAnalysis();
  // El precio vive aquí, no en el contexto: es de esta vista y de nadie más.
  const [precio, setPrecio] = useState('');
  const campoId = useId();

  const precioLeido = validarPrecio(precio);
  const gramos = metadata?.filamentUsed;

  /*
   * `esGcode` y no `file && fileType === 'gcode'`.
   *
   * Los estados se decidían por el archivo, y un análisis restaurado del
   * historial no tiene archivo —P2 no lo guarda—, así que caía en el estado 1
   * («Sube un G-code para calcular cuánto te cuesta») **aunque tuviera los
   * gramos y se pudiera costear la pieza**. El estado que decide es si hay un
   * análisis de G-code, no si hay un fichero en la memoria.
   *
   * Lo que sí se mantiene en `file` es el estado 2 —«el visor 3D no lleva datos
   * de impresión»—, porque ese caso es justamente un archivo presente que no
   * sirve. Sin archivo no hay estado 2 que pintar.
   */
  const esGcode = fileType === 'gcode' && metadata !== null;

  return (
    <div className="taller">
      <h1 className="taller-titulo">Taller</h1>

      {/*
        Los cinco estados del diseño, en su orden. El primero que se cumple gana,
        y sólo se pinta uno: cinco bloques con `hidden` serían cinco bloques que
        hay que mantener sincronizados con la condición de debajo.
      */}

      {/* 1 · Sin archivo. Sin archivo *ni* análisis: restaurarlo da un estado
           *distinto*, y en el que se puede calcular. */}
      {!file && !esGcode && (
        <p className="taller-aviso">
          Sube un G-code para calcular cuánto te cuesta.
        </p>
      )}

      {/* 2 · Hay archivo, pero no es G-code. */}
      {file && fileType !== 'gcode' && (
        <p className="taller-aviso">
          El visor 3D no lleva datos de impresión. Sube un G-code para calcular el
          coste.
        </p>
      )}

      {/* 3 · Es G-code pero no escribió los gramos. El motivo, no «datos insuficientes». */}
      {esGcode && gramos === undefined && (
        <p className="taller-aviso">
          Tu slicer no escribió los gramos consumidos. Sin ese dato no se puede
          calcular el coste.
        </p>
      )}

      {/* 4 y 5 · Hay gramos. El precio se pide sólo aquí, cuando hay algo que multiplicar. */}
      {esGcode && gramos !== undefined && (
        <div className="taller-caja">
          <p className="taller-gramos">
            Filamento consumido: <strong>{conComa(gramos)} g</strong>
          </p>

          <div className="taller-campo">
            <label className="taller-etiqueta" htmlFor={campoId}>
              Precio del filamento (€/kg)
            </label>
            <input
              id={campoId}
              className={`taller-input${
                precioLeido.estado === 'invalido' ? ' taller-input-invalido' : ''
              }`}
              type="text"
              inputMode="decimal"
              // El `0,25` con coma es lo que se teclea en España; el design dice
              // que la salida lleva coma, y no tiene sentido cambiar de signo al
              // teclear y al ver el resultado.
              placeholder="0,25"
              value={precio}
              onChange={(e) => setPrecio(e.target.value)}
              aria-invalid={precioLeido.estado === 'invalido'}
              aria-describedby={precioLeido.estado === 'invalido' ? `${campoId}-error` : undefined}
            />
            {precioLeido.estado === 'invalido' && (
              <p className="taller-error" id={`${campoId}-error`}>
                El precio tiene que ser un número mayor que cero.
              </p>
            )}
          </div>

          {/*
            El precio vacío e el precio inválido se pintan como dos estados
            distintos a propósito. Uno pide el dato; el otro dice que el dato
            escrito no sirve, que son cosas que no se pueden confundir.
          */}
          {precioLeido.estado === 'vacio' && (
            <p className="taller-aviso">Falta el precio por kilogramo.</p>
          )}

          {precioLeido.estado === 'valido' && (
            // La aritmética entera, con las tres cifras a la vista. Es el
            // criterio de aceptación del diseño, y a simple vista se puede
            // comprobar que está bien sin leer nada más.
            <p className="taller-resultado">{lineaCalculo(gramos, precioLeido.precioKg)}</p>
          )}
        </div>
      )}
    </div>
  );
}

export default TallerRoute;
