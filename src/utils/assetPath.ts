/**
 * Resuelve una ruta de `public/` (ej. "/images/foo.jpg") contra el `base`
 * configurado en vite.config.ts (actualmente relativo: "./"), para que
 * funcione tanto en un hosting real como al abrir el HTML directamente
 * con doble clic (protocolo file://).
 *
 * Los datos en src/data siguen escribiéndose con el prefijo "/" habitual
 * (es más legible y es la convención de `public/`) — esta función es el
 * único lugar que traduce esa ruta a la que corresponde en tiempo de
 * ejecución.
 */
export function assetUrl(path: string): string {
  const base = import.meta.env.BASE_URL || "/";
  const normalizedBase = base.endsWith("/") ? base : `${base}/`;
  const normalizedPath = path.startsWith("/") ? path.slice(1) : path;
  return `${normalizedBase}${normalizedPath}`;
}
