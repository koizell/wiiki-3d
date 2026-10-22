import CabeceraRuta from '../components/CabeceraRuta';
import { useId, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAnalysis, useAnalysisActions } from '../state/useAnalysis';
import { conComa, costeEuros, lineaCalculo, validarPrecio } from '../lib/coste';

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
  const { openFilePicker } = useAnalysisActions();
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
      {/*
        La cabecera de plano de la ruta (§5 y §7.2 de la spec).

        El estado dice **qué se puede hacer aquí**, y en Taller son dos cosas
        distintas según haya archivo o no: con un G-code se costea la pieza; sin
        él, sólo se explica qué es esto. Antes el rótulo era el mismo en los dos
        casos, así que la pantalla no decía en qué estado estaba.
      */}
      <CabeceraRuta
        numero="02"
        nombre="Taller"
        estado={esGcode ? 'Con análisis' : 'Sin archivo'}
      />
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

      {(!esGcode || gramos === undefined) && (
        <button type="button" className="btn-primary" onClick={openFilePicker}>
          Seleccionar G-code
        </button>
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
            <div className="taller-resumen-coste">
              <p>Coste de filamento</p>
              <output className="taller-total" htmlFor={campoId} aria-live="polite">{conComa(costeEuros(gramos, precioLeido.precioKg))} €</output>
              <p className="taller-resultado">{lineaCalculo(gramos, precioLeido.precioKg)}</p>
              {/*
                El `÷ 1000` de la línea es la conversión de gramos a kilogramos, y
                es la única parte de la operación que no es obvia. Se dice aquí
                para que nadie tenga que deducirlo: la línea está para poder
                comprobarse, y una comprobación que hay que interpretar no se
                puede comprobar.
              */}
              <p className="taller-resultado-nota">El ÷ 1000 pasa los gramos a kilogramos.</p>
            </div>
          )}
          <p className="taller-limites">Sólo filamento: no incluye electricidad, máquina ni mano de obra.</p>
        </div>
      )}

      {/*
        Los tres estados sin cálculo van con una explicación, y es la mitad del
        arreglo del hueco.

        Antes, en `/taller` sin G-code, la columna central enseñaba un `h1` de 20 px y
        una línea, dentro de una caja de 850 px de alto. Es el módulo que no estaba
        bloqueado por nada y el que menos explicaba: se llegaba, se veía que no se
        podía hacer nada, y no se sabía qué era lo que sí se podía hacer ni por qué
        faltaba el dato.

        **Va después del aviso, no antes.** La primera versión lo puso delante y el
        orden quedó invertido: primero se leía un párrafo sobre qué hace el módulo y
        después, en una línea suelta debajo de la caja, la instrucción que pedía el
        archivo. Quien llega aquí para calcular algo necesita saber primero que tiene
        que subir un G-code; el resto es contexto.

        **Por qué sólo en estos tres estados.** Los otros tres ya muestran la
        aritmética, y ahí el sitio está ocupado —y bien ocupado—. Añadirles texto
        encima sería quitarle sitio al único número que importa. Además estos tres son
        los únicos que miden casi nada, así que es donde cabe algo sin que
        `.canvas-area`, que es `overflow: hidden`, recorte en silencio. La caja se
        vuelve a medir después del cambio con `npm run verify:taller`, que es la
        comprobación que vigila esto.

        Y el enlace a la wiki no es decoración: es la interconexión de verdad, porque
        quien llega a Taller sin G-code cargado ya no puede costear, pero sí puede
        diagnosticar el problema que le trajo.
      */}
      {!file && !esGcode && (
        <div className="taller-explica">
          <p className="taller-explica-que">
            Calcula lo que te cuesta una pieza en filamento, con los gramos que trae
            tu G-code y el precio del kilo que tengas en casa.
          </p>
          <p className="taller-explica-como">
            Son dos cosas y sólo una se teclea: el slicer escribe los gramos, tú
            escribes el precio, y el cálculo sale con la aritmética a la vista para que
            se pueda comprobar sin leer nada más.
          </p>
          <p className="taller-explica-fuera">
            No incluye electricidad, máquina ni mano de obra: sólo el filamento que se
            gasta la pieza. Y si tu problema no es el coste sino que la impresión sale
            mal, <Link className="enlace-guia" to="/wiki">empieza por el síntoma</Link>.
          </p>
        </div>
      )}

    </div>
  );
}

export default TallerRoute;
