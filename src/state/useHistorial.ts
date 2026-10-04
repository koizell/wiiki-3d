import { useEffect, useState } from 'react';
import { alGuardar, estaDisponible, listarAnalisis, type EntradaHistorial } from '../lib/storage';

/**
 * Lee el historial y se vuelve a leer cuando la vista dice que algo cambió.
 *
 * **No hay bus de eventos entre pestañas.** IndexedDB notifica con el evento
 * `storage` en `localStorage`, no en IndexedDB, así que enterarse de que otra
 * pestaña ha guardado algo exigiría sondeo: abrir la base, contar, comparar. Con
 * una app de un solo usuario y un historial que se consulta en dos sitios, eso es
 * más código del que ahorra. Lo que hay es un `recargar` que las vistas llaman
 * después de borrar o de vaciar, y que es la operación que sí cambia lo que se ve.
 *
 * El valor distingue «todavía no he preguntado» de «he preguntado y no hay
 * nada», y hace falta: los tres estados del diseño son sin historial, con
 * historial y sin almacenamiento, y una lista vacía durante los primeros
 * milisegundos no es «no hay nada», es «no sé todavía».
 *
 * **La lista se relee sola** cuando esta pestaña guarda algo y cuando termina un
 * análisis. Las dos señales hacen falta y se explican en los dos efectos de
 * abajo; una sola tiene un fallo medido.
 */
export function useHistorial(disponible: boolean, analisisTerminados = 0) {
  const [entradas, setEntradas] = useState<EntradaHistorial[] | null>(null);
  // Cambia para forzar una relectura. Es un contador y no un booleano porque dos
  // vaciados seguidos tienen que contar como dos, y un booleano pondría el
  // segundo a `true` cuando ya estaba en `true` y React ni se enteraría.
  const [vuelta, setVuelta] = useState(0);

  useEffect(() => {
    /*
     * Sin almacenamiento no se hace nada, y **no se pone `entradas` a `null`**.
     *
     * Ponerlo sería un `setState` síncrono dentro del efecto, que es lo que
     * dispara un render en cascada y lo que `eslint` marca. Y no hace falta:
     * `entradas` ya empieza en `null`, y las dos vistas que usan este hook sólo
     * lo pintan cuando `disponible === true`. Un `null` que no se vuelve a poner
     * da el mismo resultado visible y no cuesta un render.
     */
    if (!disponible) return;

    let vivo = true;
    void listarAnalisis().then((lista) => {
      // El guard de `vivo` es el mismo patrón que el del análisis: sin él, una
      // lectura que tarde más que un desmontaje pinta entradas en un componente
      // que ya no existe.
      if (vivo) setEntradas(lista);
    });
    return () => {
      vivo = false;
    };
  }, [disponible, vuelta, analisisTerminados]);

  /*
   * Relee cuando **esta pestaña** acaba de guardar algo.
   *
   * Por sí sola no basta, y su fallo está medido: si el análisis termina **antes**
   * de que la vista se suscriba, el aviso se pierde y la lista se queda vacía
   * hasta que se recargue. Con una persona es improbable; subiendo el archivo
   * nada más cargar la página —que es justo lo que hace un script— es lo
   * normal, y el historial no aparecía nunca.
   *
   * Por eso el otro efecto también depende de `analisisTerminados`: la
   * suscripción da inmediatez y la dependencia da corrección. Si el aviso se
   * pierde, el siguiente análisis termina y la lista se relee igual.
   */
  useEffect(() => {
    if (!disponible) return;
    return alGuardar(() => setVuelta((v) => v + 1));
  }, [disponible]);

  return {
    entradas,
    recargar: () => setVuelta((v) => v + 1),
  };
}

/**
 * La disponibilidad del almacenamiento, como valor ya resuelto.
 *
 * Se resuelve una vez por montaje y no en cada render, porque `estaDisponible()`
 * ya cachea la promesa —pero un componente que la llamara en cada render
 * dispararía un efecto cada vez que el valor no cambiase.
 */
export function useAlmacenamiento() {
  const [disponible, setDisponible] = useState<boolean | null>(null);
  useEffect(() => {
    let vivo = true;
    void estaDisponible().then((d) => {
      if (vivo) setDisponible(d);
    });
    return () => {
      vivo = false;
    };
  }, []);
  return disponible;
}
