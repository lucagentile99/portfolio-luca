import type { ElementType, HTMLAttributes, ReactNode } from "react";
import { animate, onScroll, stagger as staggerDelay } from "animejs";
import { useMotionScope } from "../hooks/useMotionScope";
import { MOTION, duration } from "../utils/motion";

interface RevealProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  delay?: number;
  /** Si es true, anima los hijos directos de a uno (MOTION.stagger) en vez del bloque entero. */
  stagger?: boolean;
}

/**
 * Entrada al entrar en pantalla por primera vez (anime.js animate + onScroll,
 * una sola vez: no se repite al subir y bajar). Variantes por clase:
 * - reveal--mask: titulares, barrido vertical sin mover el layout.
 * - reveal--photo: fotos, opacidad + desplazamiento horizontal corto.
 * - por defecto: opacidad + desplazamiento vertical corto.
 * El estado inicial oculto vive en CSS y solo aplica sin reduced motion:
 * con reduced motion el contenido se ve directamente en su estado final.
 */
export default function Reveal({ children, as: Tag = "div", className = "", delay = 0, stagger = false, ...rest }: RevealProps) {
  const ref = useMotionScope<HTMLElement>((node, scope) => {
    const targets = stagger ? (Array.from(node.children) as HTMLElement[]) : [node];

    // Al terminar se limpian los estilos en línea y queda data-revealed
    // (React no lo pisa al re-renderizar className): así no se pisan los
    // transform de hover de cada componente.
    const finish = () => {
      targets.forEach((el) => {
        el.style.removeProperty("opacity");
        el.style.removeProperty("transform");
        el.style.removeProperty("clip-path");
        el.style.removeProperty("transition");
      });
      node.dataset.revealed = "true";
    };

    // Ya revelado (p. ej. el scope se reconstruyó por un cambio de media
    // query), reduced motion, o el bloque quedó arriba del viewport al
    // cargar con un ancla: se muestra directo, sin animar.
    if (node.dataset.revealed || scope.matches.reduceMotion || node.getBoundingClientRect().bottom < 0) {
      finish();
      return;
    }

    const isMask = node.classList.contains("reveal--mask");
    const isPhoto = node.classList.contains("reveal--photo");

    const params: Parameters<typeof animate>[1] = isMask
      ? { clipPath: ["inset(0% 0% 100% 0%)", "inset(0% 0% 0% 0%)"] }
      : isPhoto
        ? { opacity: [0, 1], x: [-MOTION.distance, 0] }
        : { opacity: [0, 1], y: [MOTION.distance, 0] };

    const observer = onScroll({ target: node, enter: "bottom-=10% top", sync: "play", repeat: false });

    animate(targets, {
      ...params,
      duration: duration(MOTION.base),
      ease: MOTION.ease,
      delay: stagger ? staggerDelay(MOTION.stagger, { start: delay }) : delay,
      autoplay: observer,
      // Las transiciones CSS propias (hover) no deben suavizar cada frame.
      onBegin: () => targets.forEach((el) => (el.style.transition = "none")),
      onComplete: finish,
    });

    return () => observer.revert();
  });

  return (
    <Tag
      ref={ref}
      className={`reveal ${stagger ? "reveal--stagger" : ""} ${className}`.replace(/\s+/g, " ").trim()}
      {...rest}
    >
      {children}
    </Tag>
  );
}
