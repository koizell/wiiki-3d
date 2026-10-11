import type { ReactNode } from 'react';

/**
 * Negrita dentro de un texto de guía.
 *
 * ## Por qué hace falta
 *
 * El contenido de una guía lleva `**negrita**` en los sitios donde la negrita **carga
 * significado**, no para decorar. En `alcance` casi siempre marca el matiz que
 * separa una afirmación acotada de una general: *«El 0,04 mm **es** de la Textured PEI»*,
 * *«**siempre que** los ajustes sean correctos»*. Ese matiz es lo que separa esta wiki de
 * un consejo cualquiera, así que perderlo por un asterisco es perder el contenido.
 *
 * Antes de esto salía literal: `**no puede detectar qué chapa está instalada**`, con los
 * asteriscos dentro de la frase. Cincuenta y dos apariciones en las cuatro guías.
 *
 * ## Por qué un componente y no el renderizador de Markdown
 *
 * Porque aquí sólo hay una construcción —negrita— y el renderizador de la wiki ya no
 * existe: el contenido es TypeScript, no un fichero de texto que nadie pueda inyectar.
 * Traer un parser entero para esto sería desproporcionado, y `dangerouslySetInnerHTML`
 * sería aceptar un riesgo real —una guía con `<script>` en un `porque`— a cambio de
 * escribir ocho líneas.
 *
 * ## Lo que no hace
 *
 * No interpreta nada más. Sin `*` simples, sin `_`, sin enlaces, sin `código`. Una
 * construcción que no reconoce la deja tal cual, y eso es lo correcto: si algún día una
 * guía trae algo que no es negrita, se ve como un typo raro en vez de desaparecer.
 *
 * Y **escapa por construcción**: devuelve nodos de texto de React, nunca una cadena de
 * HTML. No hay ninguna ruta por la que una guía pueda inyectar una etiqueta.
 */
export function Negrita({ children }: { children: string }): ReactNode {
  const partes = children.split(/(\*\*[^*]+\*\*)/g).filter(Boolean);
  if (partes.length === 1) return children;
  return partes.map((parte, i) =>
    parte.startsWith('**') && parte.endsWith('**') && parte.length > 4 ? (
      <strong key={i}>{parte.slice(2, -2)}</strong>
    ) : (
      <span key={i}>{parte}</span>
    )
  );
}
