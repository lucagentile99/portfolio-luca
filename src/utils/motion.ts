// Sistema de movimiento del portfolio (anime.js v4). Todos los componentes
// leen de acá: duraciones, distancias, escala, curva y stagger. Si algo se
// siente lento o exagerado, se ajusta en un solo lugar.
export const MOTION = {
  /** Microinteracciones: menú, hover, cierre de modal, indicadores. */
  fast: 220,
  /** Entradas de bloques, acordeones, apertura de modal. */
  base: 440,
  /** Desplazamiento de entrada (px). */
  distance: 16,
  /** Desplazamiento corto: header, menú, contenido de acordeón. */
  distanceSmall: 8,
  /** Escala inicial de paneles y tarjetas. */
  scaleFrom: 0.98,
  ease: "out(3)",
  easeStrong: "out(4)",
  /** Separación entre elementos de un mismo grupo (ms). */
  stagger: 60,
} as const;

/** Media queries que comparten todos los scopes de anime.js. */
export const MOTION_QUERIES = {
  reduceMotion: "(prefers-reduced-motion: reduce)",
  mobile: "(max-width: 699px)",
  finePointer: "(hover: hover) and (pointer: fine)",
};

function matches(query: string) {
  return typeof window !== "undefined" && window.matchMedia(query).matches;
}

export function prefersReducedMotion() {
  return matches(MOTION_QUERIES.reduceMotion);
}

/** En celulares todo dura un 25% menos. */
export function duration(ms: number) {
  return matches(MOTION_QUERIES.mobile) ? Math.round(ms * 0.75) : ms;
}
