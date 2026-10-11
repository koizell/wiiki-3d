/**
 * El historial, sobre IndexedDB.
 *
 * **Un solo almacén y tres vistas.** El mismo almacenamiento se ve desde `/` —los
 * cinco últimos—, desde `/historial` —todos— y desde `/proyectos` —los que tienen
 * nombre—. El nombre es lo que distingue un proyecto de una entrada del historial,
 * así que las dos listas no son la misma: `/historial` es el registro automático y
 * `/proyectos` es la biblioteca curada.
 *
 * **Sin dependencias.** `indexedDB` es del navegador y su envoltorio son cuarenta
 * líneas de `open()` y `onupgradeneeded`. Una librería aquí añadiría un peso al
 * chunk inicial a cambio de no ahorrar trabajo: la API de IndexedDB es incómoda,
 * pero no es difícil, y lo que hace es abrir y cerrar una base de datos.
 *
 * **`estaDisponible()` decide el tercer estado.** Modo privado de Safari, políticas
 * de empresa que prohíban el almacenamiento, contenedores con cookies de terceros
 * bloqueadas: hay navegadores donde `indexedDB` existe pero `open()` falla. Por eso
 * la pregunta no es «¿existe `indexedDB`?» sino «¿se ha podido abrir?», y esa
 * segunda pregunta **no se puede responder sin intentarlo** —se responde en la
 * primera llamada y se cachea—.
 *
 * Y la regla de cuando falla es la de `JevService`: **si no se puede guardar, no se
 * dice nada y el análisis sigue funcionando**. Perder el historial es una molestia;
 * no poder analizar un G-code porque el navegador no deja guardar, eso ya es
 * romper la app.
 */

import type { FileType } from './files';
import type { JevClassification, ProjectMetadata } from '../services/types';

/** Nombre de la base y del almacén de objetos. */
const DB_NOMBRE = 'wiiki-3d';
const DB_VERSION = 1;
const ALMACEN = 'analisis';

/**
 * Una entrada del historial: todo lo que se ve de un análisis ya hecho.
 *
 * **No guarda el archivo.** Ni su contenido ni su nombre en disco: sólo el
 * `File` construido a partir de los datos guardados, con tamaño 0 y tipo
 * desconocido, porque es lo que necesitan las vistas para pintar una fila y lo que
 * necesita `/taller` para tener gramos. Guardar el G-code entero serían megabytes
 * por entrada, y hoy no hay ninguna vista que lo abra.
 */
export interface EntradaHistorial {
  /** `crypto.randomUUID()`. */
  id: string;
  /** Nombre original del archivo, tal como lo subió quien lo analysó. */
  filename: string;
  fileType: FileType;
  /** `Date.now()`. Es lo que ordena la lista, de más reciente a más antigua. */
  fecha: number;
  metadata: ProjectMetadata;
  classification: JevClassification;
  /**
   * El nombre que le ha puesto quien lo guarda como proyecto.
   *
   * **Es lo que distingue un proyecto de una entrada del historial.** El historial
   * es automático —todo lo que se analiza acaba ahí solo—; un proyecto es lo que
   * alguien ha decidido conservar con un nombre propio. Sin `nombre`, la entrada
   * vive sólo en el historial; con él, aparece también en `/proyectos`.
   */
  nombre?: string;
}

/** Lo que hay que darle a `guardarAnalisis`. El `id` y la `fecha` los pone la función. */
export type EntradaAguardar = Omit<EntradaHistorial, 'id' | 'fecha'>;

/**
 * La disponibilidad, cacheada tras la primera consulta.
 *
 * Es una promesa y no un booleano porqueIndexedDB es asíncrono: no se puede saber
 * si `open()` va a funcionar hasta que se ha intentado. La primera vista que lo
 * pregunta se queda esperando; las siguientes ya tienen la respuesta.
 */
let disponibilidad: Promise<boolean> | null = null;

/**
 * Abre la base y, si hace falta, crea el almacén.
 *
 * El envoltorio de `IDBRequest` es lo que hace falta escribir a mano: `open()` no
 * devuelve promesa, y `onupgradeneeded` sólo se dispara una vez, la primera vez que
 * se crea la base. Si el almacén ya existe de una versión anterior, la transacción
 * se aborta sola con `ConstraintError`, y por eso se comprueba antes con
 * `objectStoreNames.contains`.
 */
function abrir(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    let peticion: IDBOpenDBRequest;
    try {
      peticion = indexedDB.open(DB_NOMBRE, DB_VERSION);
    } catch (error) {
      // Algunos navegadores lanzan aquí en vez de fallar por `onerror`.
      reject(error instanceof Error ? error : new Error(String(error)));
      return;
    }

    peticion.onupgradeneeded = () => {
      const db = peticion.result;
      if (!db.objectStoreNames.contains(ALMACEN)) {
        db.createObjectStore(ALMACEN, { keyPath: 'id' });
      }
    };
    peticion.onsuccess = () => resolve(peticion.result);
    peticion.onerror = () =>
      reject(peticion.error ?? new Error('No se ha podido abrir el historial'));
    // Un `open()` que se queda bloqueado para siempre dejaría la vista esperando
    // sin límite. Se corta a los dos segundos y se trata como no disponible.
    peticion.onblocked = () =>
      reject(new Error('El historial está bloqueado por otra pestaña abierta'));
  });
}

/**
 * ¿Se puede usar IndexedDB en este navegador y esta pestaña?
 *
 * **Devuelve `false` sin lanzar nunca.** Quien pregunta quiere pintar un aviso, no
 * gestionar una excepción: un `throw` aquí se convertiría en un error en pantalla
 * cada vez que se recargara la página en modo privado, que es justo el caso en el
 * que menos moleste.
 */
export function estaDisponible(): Promise<boolean> {
  if (!disponibilidad) {
    disponibilidad = (async () => {
      // La comprobación de existencia evita hasta abrir el modo privado. Es
      // puramente defensiva: hay entornos donde `indexedDB` ni siquiera está
      // definido, y `abrir()` lanzaría antes de poder rechazarse.
      if (typeof indexedDB === 'undefined') return false;
      try {
        const db = await abrir();
        // Se cierra siempre: una conexión abierta bloquea `onupgradeneeded` de
        // cualquier otra pestaña que quiera subir la versión.
        db.close();
        return true;
      } catch {
        return false;
      }
    })();
  }
  return disponibilidad;
}

/**
 * Guarda un análisis terminado y devuelve su `id`.
 *
 * **Devuelve `null` si no hay almacenamiento**, en vez de lanzar. Es la misma
 * decisión que `estaDisponible()`: la persistencia es un extra, y un extra que
 * falla no puede romper lo que funciona.
 */
export async function guardarAnalisis(entrada: EntradaAguardar): Promise<string | null> {
  if (!(await estaDisponible())) return null;
  const id = crypto.randomUUID();
  const completa: EntradaHistorial = { ...entrada, id, fecha: Date.now() };

  try {
    const db = await abrir();
    await new Promise<void>((resolve, reject) => {
      const tx = db.transaction(ALMACEN, 'readwrite');
      tx.objectStore(ALMACEN).put(completa);
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error ?? new Error('No se ha podido guardar'));
      tx.onabort = () => reject(tx.error ?? new Error('Guardado cancelado'));
    });
    db.close();
    // Se avisa **después** de cerrar, y sólo si se guardó de verdad. Quien esté
    // escuchando va a releer, y releer antes de cerrar daría una lista sin la
    // entrada nueva.
    for (const s of suscriptores) s();
    return id;
  } catch {
    return null;
  }
}

/**
 * Los que quieren enterarse de que **esta misma pestaña** acaba de guardar.
 *
 * Existe por una carrera concreta, que se midió: el guardado ocurre en un efecto
 * de `AnalysisContext` y la relectura en otro de la vista, y los dos se disparan
 * en el mismo commit. La lectura es más rápida que el guardado —abrir la base y
 * hacer `getAll()` es un turno, guardar es una escritura— así que la lista salía
 * **siempre con una entrada de retraso**: subías un G-code y aparecía el
 * anterior, y el segundo sí.
 *
 * Releer cuando `status` pasa a `done` no lo arregla, porque en ese momento el
 * guardado todavía no ha terminado. Lo que hace falta es que el guardado avise
 * **cuando ha acabado**, y eso es lo que esto es.
 *
 * No es el evento `storage` de `localStorage`: ese es entre pestañas y no existe
 * para IndexedDB. Esto es una lista de suscriptores en memoria, y sólo de
 * Para IndexedDB no hay evento entre pestañas. Esto es una lista de
 * suscriptores en memoria, y sólo de esta pestaña.
 */
const suscriptores = new Set<() => void>();

/**
 * Se suscribe a los guardados de esta pestaña, y devuelve la función para
 * dejar de escuchar.
 */
export function alGuardar(alGuardar: () => void): () => void {
  suscriptores.add(alGuardar);
  return () => {
    suscriptores.delete(alGuardar);
  };
}

/**
 * Todas las entradas, **de más reciente a más antigua**.
 *
 * Se lee con `getAll()` y se ordena en memoria, en vez de usar un índice por
 * `fecha`. Con cinco entradas da igual; con ocho mil, ordenar ocho mil números es
 * instantánea y un índice que hay que mantener en cada escritura es una cosa más
 * que puede romperse sin que se note. La decisión no cuesta nada ahora, y el
 * orden es explícito en el sitio donde importa.
 */
export async function listarAnalisis(): Promise<EntradaHistorial[]> {
  if (!(await estaDisponible())) return [];
  try {
    const db = await abrir();
    const entradas = await new Promise<EntradaHistorial[]>((resolve, reject) => {
      const tx = db.transaction(ALMACEN, 'readonly');
      const peticion = tx.objectStore(ALMACEN).getAll();
      peticion.onsuccess = () => resolve(peticion.result as EntradaHistorial[]);
      peticion.onerror = () =>
        reject(peticion.error ?? new Error('No se ha podido leer el historial'));
    });
    db.close();
    return entradas.sort((a, b) => b.fecha - a.fecha);
  } catch {
    return [];
  }
}

/** Borra una entrada por su `id`. Devuelve si se ha borrado algo. */
export async function borrarAnalisis(id: string): Promise<boolean> {
  if (!(await estaDisponible())) return false;
  try {
    const db = await abrir();
    await new Promise<void>((resolve, reject) => {
      const tx = db.transaction(ALMACEN, 'readwrite');
      tx.objectStore(ALMACEN).delete(id);
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error ?? new Error('No se ha podido borrar'));
      tx.onabort = () => reject(tx.error ?? new Error('Borrado cancelado'));
    });
    db.close();
    return true;
  } catch {
    return false;
  }
}

/**
 * Pone o quita el nombre de una entrada: la convierte en proyecto o la devuelve al
 * historial.
 *
 * **Leer, cambiar un campo y volver a escribir, en una sola transacción.** El
 * almacén ya tiene `id` como clave, así que no hace falta un segundo almacén ni un
 * índice: nombrar es `get` + `put`. Las dos operaciones van en la misma
 * transacción para que entre la lectura y la escritura no se cuele otra pestaña y
 * se pierda un campo.
 *
 * Un nombre **vacío quita el nombre**, no guarda una cadena vacía. «Sin nombre»
 * tiene que ser una sola cosa: si el vacío se guardara, habría dos formas de no
 * ser un proyecto y las dos se pintarían igual.
 *
 * Avisa a los suscriptores **después de cerrar**, como `guardarAnalisis`, porque
 * quien escucha va a releer y una relectura antes del cierre daría la lista vieja.
 */
export async function nombrarAnalisis(id: string, nombre: string): Promise<boolean> {
  if (!(await estaDisponible())) return false;
  const limpio = nombre.trim();
  try {
    const db = await abrir();
    await new Promise<void>((resolve, reject) => {
      const tx = db.transaction(ALMACEN, 'readwrite');
      const store = tx.objectStore(ALMACEN);
      const peticion = store.get(id);
      peticion.onsuccess = () => {
        const entrada = peticion.result as EntradaHistorial | undefined;
        if (!entrada) {
          reject(new Error('La entrada no existe'));
          return;
        }
        const actualizada: EntradaHistorial = { ...entrada };
        if (limpio) actualizada.nombre = limpio;
        else delete actualizada.nombre;
        store.put(actualizada);
      };
      peticion.onerror = () =>
        reject(peticion.error ?? new Error('No se ha podido leer la entrada'));
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error ?? new Error('No se ha podido nombrar'));
      tx.onabort = () => reject(tx.error ?? new Error('Operación cancelada'));
    });
    db.close();
    for (const s of suscriptores) s();
    return true;
  } catch {
    return false;
  }
}

/**
 * Vacía el historial entero.
 *
 * `clear()` y no un bucle de `delete()`: una transacción en vez de ocho mil, y es
 * atómico. Si a somebody le importa el qué había antes, no hay copia: por eso el
 * botón que lo llama tiene que pedir confirmación diciendo cuántos se van.
 */
export async function vaciarHistorial(): Promise<boolean> {
  if (!(await estaDisponible())) return false;
  try {
    const db = await abrir();
    await new Promise<void>((resolve, reject) => {
      const tx = db.transaction(ALMACEN, 'readwrite');
      tx.objectStore(ALMACEN).clear();
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error ?? new Error('No se ha podido vaciar'));
      tx.onabort = () => reject(tx.error ?? new Error('Vaciado cancelado'));
    });
    db.close();
    return true;
  } catch {
    return false;
  }
}

/**
 * Cuántas entradas hay. Va aparte de `listarAnalisis()` porque el botón de «vaciar
 * todo» lo necesita **antes** de borrar, para la confirmación.
 */
export async function contarAnalisis(): Promise<number> {
  if (!(await estaDisponible())) return 0;
  try {
    const db = await abrir();
    const n = await new Promise<number>((resolve, reject) => {
      const tx = db.transaction(ALMACEN, 'readonly');
      const peticion = tx.objectStore(ALMACEN).count();
      peticion.onsuccess = () => resolve(peticion.result);
      peticion.onerror = () =>
        reject(peticion.error ?? new Error('No se ha podido contar el historial'));
    });
    db.close();
    return n;
  } catch {
    return 0;
  }
}
