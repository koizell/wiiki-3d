/**
 * Pantalla vacía de un módulo que todavía no existe.
 *
 * Se pinta dentro de `.canvas-area`, la columna central del shell. Es
 * suficiente para Taller y Wiki 3D, que van a ser contenido de lectura o cálculo
 * y caben en ese ancho. Si algún módulo necesita la pantalla entera, hay que
 * sacar su ruta fuera del grid, y eso no se decide hasta que exista el primer
 * módulo con contenido.
 *
 * Dice "Sin implementar" a propósito, y no insinúa lo contrario. Una pantalla
 * vacía que finge tener contenido es peor que una que dice la verdad, y aquí el
 * usuario puede ver el resto del sitio en un clic: si el módulo no está, se
 * navega a otro.
 *
 * La línea de qué hará cada módulo sale de la sección correspondiente de
 * `docs/historias-de-usuario.md`, que es donde está la decisión de producto. En
 * ese documento las tres lecturas están marcadas como **supuesto**, no como
 * requisito cerrado: si "Taller" acabara siendo un comparador de laminados en
 * lugar de una calculadora de coste, esta línea cambia con él. Por eso el texto
 * dice qué va a hacer y no qué reglas va a cumplir.
 */
function PlaceholderRoute({ title, purpose }: { title: string; purpose: string }) {
  return (
    <div className="placeholder-route">
      <h1>{title}</h1>
      <p className="placeholder-route-purpose">{purpose}</p>
      <p className="placeholder-route-note">Sin implementar.</p>
    </div>
  );
}

export default PlaceholderRoute;