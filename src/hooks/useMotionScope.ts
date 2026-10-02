import { useEffect, useRef } from "react";
import type { DependencyList } from "react";
import { createScope } from "animejs";
import type { Scope } from "animejs";
import { MOTION_QUERIES } from "../utils/motion";

type MotionSetup<T extends HTMLElement> = (root: T, scope: Scope) => void | (() => void);

/**
 * Crea un scope de anime.js limitado al elemento del ref. Todo lo que se
 * crea dentro de `setup` (animate, timelines, onScroll, animatables) queda
 * registrado en el scope y se limpia con scope.revert() al desmontar. Si
 * cambia una de las media queries (reduce motion, mobile, puntero fino), el
 * scope revierte y vuelve a correr `setup` con scope.matches actualizado.
 * `setup` puede devolver una función de limpieza (listeners propios).
 */
export function useMotionScope<T extends HTMLElement>(setup: MotionSetup<T>, deps: DependencyList = []) {
  const ref = useRef<T | null>(null);
  const setupRef = useRef(setup);
  setupRef.current = setup;

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const scope = createScope({ root: ref, mediaQueries: MOTION_QUERIES }).add((self) => setupRef.current(root, self!));
    return () => scope.revert();
    // Las dependencias las define cada componente (por defecto, solo montaje).
    // oxlint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return ref;
}
