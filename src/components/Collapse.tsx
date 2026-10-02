import { useLayoutEffect, useRef } from "react";
import type { HTMLAttributes, ReactNode } from "react";
import { animate } from "animejs";
import type { JSAnimation } from "animejs";
import { MOTION, duration, prefersReducedMotion } from "../utils/motion";

interface CollapseProps extends HTMLAttributes<HTMLDivElement> {
  open: boolean;
  children: ReactNode;
  className?: string;
}

/**
 * Panel de acordeón con anime.js: mide el contenido real, anima la altura
 * (más opacidad y 8px de desplazamiento del contenido) y al terminar deja
 * height: auto, así un texto traducido más largo nunca queda cortado.
 * Cerrado, el panel queda `hidden`: fuera del orden de tabulación y del
 * árbol de accesibilidad. Con reduced motion abre y cierra al instante.
 */
export default function Collapse({ open, children, className = "", ...rest }: CollapseProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  // Estado anterior: solo se anima un cambio real de open (no el montaje,
  // ni la doble ejecución de efectos de StrictMode, ni un re-render).
  const prevOpen = useRef<boolean | null>(null);
  const running = useRef<JSAnimation[]>([]);

  useLayoutEffect(() => {
    const panel = ref.current;
    if (!panel) return;
    const inner = panel.firstElementChild as HTMLElement | null;

    const wasOpen = prevOpen.current;
    prevOpen.current = open;
    if (wasOpen === null || wasOpen === open) {
      panel.hidden = !open;
      return;
    }

    running.current.forEach((animation) => animation.cancel());
    running.current = [];

    const settle = () => {
      panel.style.removeProperty("height");
      panel.style.removeProperty("overflow");
      inner?.style.removeProperty("opacity");
      inner?.style.removeProperty("transform");
      panel.hidden = !open;
    };

    if (prefersReducedMotion()) {
      settle();
      return;
    }

    const ms = duration(open ? MOTION.base : MOTION.fast + 60);
    // Si se reabre a mitad de un cierre (o al revés), parte de la altura actual.
    const from = panel.hidden ? 0 : panel.offsetHeight;
    panel.hidden = false;
    const to = open ? panel.scrollHeight : 0;
    panel.style.overflow = "hidden";

    running.current.push(
      animate(panel, { height: [from, to], duration: ms, ease: MOTION.ease, onComplete: settle })
    );
    if (inner) {
      running.current.push(
        animate(inner, {
          opacity: open ? [0, 1] : [1, 0],
          y: open ? [-MOTION.distanceSmall, 0] : [0, -MOTION.distanceSmall],
          duration: ms,
          ease: MOTION.ease,
        })
      );
    }
  }, [open]);

  useLayoutEffect(() => () => running.current.forEach((animation) => animation.revert()), []);

  return (
    <div ref={ref} className={className} {...rest}>
      {children}
    </div>
  );
}
