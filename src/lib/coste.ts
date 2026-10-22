/**
 * La aritmética de Taller, sin React y sin nada del navegador.
 *
 * Vive aparte de la vista por una razón concreta: **es lo que se puede comprobar
 * sin arrancar nada**. `npm run verify:taller` importa este fichero y le hace
 * preguntas, y si la aritmética se comprobara a través del navegador habría que
 * montar la ruta entera para poder sumar 0,93 × 0,025.
 *
 * Las tres reglas del diseño de `docs/taller.md` que aquí se cumplen:
 *
 * - **Los gramos no se teclean.** No hay ninguna función de este fichero que
 *   reciba gramos como entrada. Se leen del G-code y llegan ya hechos.
 * - **El precio se pide en €/kg.** Toda la conversión a €/g vive en una línea,
 *   `PRECIO_A_GRAMO`, y sólo para poder multiplicar. Si algún día cambia la
 *   unidad, se cambia ahí y en ningún otro sitio.
 * - **Ante la duda, falla; nunca rellena.** Un precio que no se puede leer no
 *   devuelve `0`, devuelve un error. El `0` es el número que un coste alcanzaría
 *   sin coste, y por eso es el único que no puede salir de aquí por defecto.
 */

/**
 * El precio por gramo, derivado del que se pide por kilogramo.
 *
 * `/ 1000` porque el precio entra en €/kg y los gramos del G-code están en gramos.
 * Los dos lados de la multiplicación tienen que estar en la misma unidad, y
 * convertir sólo uno de los dos es el error clásico de estas calculadoras.
 */
const PRECIO_A_GRAMO = 1 / 1000;

/** Lo que la vista necesita saber, según lo que haya escrito la persona. */
export type ResultadoPrecio =
  /** No se ha escrito nada. La vista pide el precio, todavía no lo valida. */
  | { estado: 'vacio' }
  /** Se ha escrito algo y no es un precio usable. Se marca el campo. */
  | { estado: 'invalido' }
  /** Se ha escrito un precio válido, en €/kg. */
  | { estado: 'valido'; precioKg: number };

/**
 * Normaliza y valida lo que se ha tecleado en el campo del precio.
 *
 * **Acepta coma y punto.** En España se teclea con coma, y el teclado numérico de
 * muchos ordenadores produce punto. Rechazar el punto sería dar un error por algo
 * que la persona no ha hecho mal. El criterio es la coma: si hay coma, es el
 * separador decimal y el punto no cuenta —un grupo de miles escrito con puntos
 * no se acepta, porque el diseño dice sin separador de miles—; si no hay coma, el
 * punto es decimal.
 *
 * `sin separador de miles` es una decisión del diseño, no una comodidad: en un
 * campo donde se teclea un precio pequeño, un `1.234` que se leyera como mil
 * doscientos treinta y cuatro daría un coste mil veces mayor, y ese error no se ve
 * en el resultado.
 *
 * Sin valor, o con texto que no es un número, es inválido. Un precio de `0` o
 * negativo también: un filamento gratis no existe, y un precio negativo daría un
 * coste negativo, que es peor que no dar ninguno.
 *
 * @param entrada Lo que hay en el campo, tal cual.
 */
export function validarPrecio(entrada: string): ResultadoPrecio {
  const limpio = entrada.trim();

  // Vacío no es inválido: es el estado de "todavía no lo ha escrito", y la vista
  // lo trata distinto —pide el precio— que un precio que no se puede leer.
  if (limpio === '') {
    return { estado: 'vacio' };
  }

  // La coma manda como decimal. Si hay coma, se quitan los puntos —en formato
  // español el punto es el separador de miles y aquí no se admiten— y **la coma
  // se cambia por un punto**, porque `Number` sólo entiende el punto.
  //
  // El cambio de coma a punto no es un detalle: sin él, `25,00` llegaba a
  // `Number('25,00')`, que es `NaN`, y el precio se marcaba como inválido. Es
  // decir, la forma en que se teclea un precio en España —con coma— no pasaba,
  // y la que no se usa en España sí. `npm run verify:taller` mide las dos.
  const normalizado = limpio.includes(',')
    ? limpio.replaceAll('.', '').replace(',', '.')
    : limpio;

  // `Number` acepta cosas que no son un número —espacios, `Infinity`, hex— así
  // que se filtra antes. Lo que llega aquí es `Number(...)` y no otra cosa.
  const valor = Number(normalizado);
  if (normalizado === '' || !Number.isFinite(valor) || valor <= 0) {
    return { estado: 'invalido' };
  }

  return { estado: 'valido', precioKg: valor };
}

/**
 * El coste en euros de una serie de gramos a un precio por kilogramo.
 *
 * @param gramos Filamento consumido, en gramos, leído del G-code.
 * @param precioKg Precio del filamento, en €/kg, ya validado.
 * @returns El coste en euros, sin redondear. Quien redondea es la vista.
 */
export function costeEuros(gramos: number, precioKg: number): number {
  return gramos * precioKg * PRECIO_A_GRAMO;
}

/**
 * Un número con coma decimal y sin separador de miles.
 *
 * `Intl.NumberFormat` en español saca los miles, y el diseño dice que no. El
 * formato más corto posible para lo que se pinta: el coste, el precio y los
 * gramos, que son cifras de dos o tres cifras.
 *
 * @param decimales Cuántas decimales se ven. El coste se ve a céntimos, que es
 *   la unidad en la que se paga; los gramos y el precio, a dos también.
 */
export function conComa(valor: number, decimales = 2): string {
  return valor.toFixed(decimales).replace('.', ',');
}

/**
 * La aritmética entera de la línea, como la ve la persona: las cifras y el signo
 * entre ellas.
 *
 * Sale de aquí y no de la vista porque es el criterio de aceptación medible: con
 * 0,93 g y 25 €/kg tiene que dar `0,93 g ÷ 1000 × 25,00 €/kg = 0,02 €`. Si esta
 * función cambia, ese número cambia, y eso tiene que verse en la comprobación.
 *
 * ## Por qué el `÷ 1000` está escrito y no escondido
 *
 * Porque la línea **se puede comprobar**, y antes no se podía. `0,93 g × 25,00
 * €/kg` da 23,25 €, no 0,02 €: falta la conversión de gramos a kilogramos, que es
 * la mitad de la operación y la única parte que no es obvia. Un lector que
 * multiplica lo que ve y no le sale la cifra tiene razón para desconfiar del
 * número, y con razón.
 *
 * El orden es el de la aritmética, no el de las unidades: primero se pasan los
 * gramos a kilogramos, y luego se multiplica por el precio del kilogramo.
 *
 * @param gramos Filamento consumido, en gramos.
 * @param precioKg Precio del filamento, en €/kg.
 */
export function lineaCalculo(gramos: number, precioKg: number): string {
  const coste = costeEuros(gramos, precioKg);
  return (
    `${conComa(gramos)} g ÷ 1000 × ${conComa(precioKg)} €/kg = ${conComa(coste)} €`
  );
}
