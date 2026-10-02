// Sistema de movimiento del portfolio (anime.js v4). Todos los componentes
// leen de acá: duraciones, distancias, escala, curva y stagger. Si algo se
// siente lento o exagerado, se ajusta en un solo lugar.
export const MOTION = {
  /** Microinteracciones: menú, cierre de modal, indicadores. */
  fast: 280,
  /** Entradas de bloques y apertura de modal. */
  base: 600,
  /** Apertura de acordeones. */
  panel: 350,
  /** Desplazamiento del contenido al abrir un acordeón (px). */
  panelOffset: 14,
  /** Desplazamiento de entrada de tarjetas (px). */
  distance: 30,
  /** Desplazamiento corto: header, menú, botones, contenido de acordeón. */
  distanceSmall: 16,
  /** Desplazamientos por tipo de bloque (px). */
  y: { label: 18, title: 28, text: 20, card: 30 },
  /** Escala inicial de paneles y tarjetas. */
  scaleFrom: 0.96,
  ease: "out(3)",
  easeStrong: "out(4)",
  /** Separación entre elementos de un mismo grupo (ms). */
  stagger: 100,
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

/** En celulares todo dura un 15% menos (sigue siendo claramente visible). */
export function duration(ms: number) {
  return matches(MOTION_QUERIES.mobile) ? Math.round(ms * 0.85) : ms;
}
