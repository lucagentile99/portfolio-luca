import type { ElementType, HTMLAttributes, ReactNode } from "react";
import { createTimeline, onScroll } from "animejs";
import { useMotionScope } from "../hooks/useMotionScope";
import { MOTION, duration } from "../utils/motion";

/**
 * Tipos de entrada (valores en utils/motion.ts):
 * - text: descripción/párrafo — opacidad + 20px.
 * - label: etiqueta — opacidad + 18px.
 * - title: título principal — opacidad + 28px.
 * - mask: título editorial — máscara vertical + 18px.
 * - head: encabezado de sección — cada hijo con su tipo (etiqueta con
 *   máscara, título 28px, resto 20px), escalonados.
 * - card: tarjeta — opacidad + 30px + escala 0.96.
 * - card-x: tarjeta de carrusel — opacidad + 30px horizontal + escala 0.96.
 * - photo: foto — opacidad + −30px horizontal + escala 0.96.
 * - from-right: contenido que entra desde la derecha (30px).
 */
export type RevealVariant = "text" | "label" | "title" | "mask" | "head" | "card" | "card-x" | "photo" | "from-right";

interface RevealProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  variant?: RevealVariant;
  delay?: number;
  /** Anima los hijos directos de a uno (MOTION.stagger) con el tipo de entrada indicado. */
  stagger?: boolean;
}

type Params = Record<string, [number | string, number | string]>;

const MASK_FROM = "inset(0% 0% 100% 0%)";
const MASK_TO = "inset(0% 0% 0% 0%)";

function paramsFor(variant: RevealVariant, el: HTMLElement): Params {
  switch (variant) {
    case "label":
      return { opacity: [0, 1], y: [MOTION.y.label, 0] };
    case "title":
      return { opacity: [0, 1], y: [MOTION.y.title, 0] };
    case "mask":
      return { clipPath: [MASK_FROM, MASK_TO], y: [MOTION.y.label, 0] };
    case "head":
      if (el.matches(".eyebrow, .eyebrow-editorial")) return paramsFor("mask", el);
      if (el.matches(".section-title, h2")) return paramsFor("title", el);
      if (el.matches(".projects__title-row")) return paramsFor("title", el);
      return paramsFor("text", el);
    case "card":
      return { opacity: [0, 1], y: [MOTION.y.card, 0], scale: [MOTION.scaleFrom, 1] };
    case "card-x":
      return { opacity: [0, 1], x: [MOTION.distance, 0], scale: [MOTION.scaleFrom, 1] };
    case "photo":
      return { opacity: [0, 1], x: [-MOTION.distance, 0], scale: [MOTION.scaleFrom, 1] };
    case "from-right":
      return { opacity: [0, 1], x: [MOTION.distance, 0] };
    default:
      return { opacity: [0, 1], y: [MOTION.y.text, 0] };
  }
}

// Red de seguridad: un bloque al final de la página puede no llegar nunca al
// umbral del 18% porque no queda más scroll. Al tocar el fondo se disparan
// los pendientes.
const pendingAtBottom = new Set<() => void>();
let bottomListener = false;
function watchBottom(play: () => void) {
  pendingAtBottom.add(play);
  if (bottomListener) return;
  bottomListener = true;
  window.addEventListener(
    "scroll",
    () => {
      const atBottom = window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 4;
      if (atBottom) [...pendingAtBottom].forEach((fn) => fn());
    },
    { passive: true }
  );
}

/**
 * Entrada al entrar en pantalla por primera vez (anime.js timeline + onScroll,
 * una sola vez: no se repite al subir y bajar). Se dispara cuando ~18% del
 * bloque ya es visible. El estado inicial oculto vive en CSS y solo aplica
 * sin reduced motion: con reduced motion todo se ve en su estado final.
 */
export default function Reveal({
  children,
  as: Tag = "div",
  className = "",
  variant = "text",
  delay = 0,
  stagger = false,
  ...rest
}: RevealProps) {
  const isGroup = stagger || variant === "head";

  const ref = useMotionScope<HTMLElement>((node, scope) => {
    const targets = isGroup ? (Array.from(node.children) as HTMLElement[]) : [node];

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
      pendingAtBottom.delete(play);
    };

    // Ya revelado (el scope se reconstruyó por un cambio de media query),
    // reduced motion, el bloque quedó arriba del viewport al cargar con un
    // ancla, o está oculto por CSS (versión desktop/mobile alternativa): se
    // muestra directo, para que nunca quede invisible al cambiar de tamaño.
    if (
      node.dataset.revealed ||
      scope.matches.reduceMotion ||
      node.getClientRects().length === 0 ||
      node.getBoundingClientRect().bottom < 0
    ) {
      finish();
      return;
    }

    const observer = onScroll({
      target: node,
      enter: { target: "top+=18%", container: "bottom" },
      sync: "play",
      repeat: false,
    });

    const timeline = createTimeline({
      defaults: { duration: duration(MOTION.base), ease: MOTION.ease },
      autoplay: observer,
      // Las transiciones CSS propias (hover) no deben suavizar cada frame.
      onBegin: () => targets.forEach((el) => (el.style.transition = "none")),
      onComplete: finish,
    });
    targets.forEach((el, i) => {
      timeline.add(el, paramsFor(variant, el), delay + (isGroup ? i * MOTION.stagger : 0));
    });

    function play() {
      pendingAtBottom.delete(play);
      if (!timeline.began) timeline.play();
    }
    watchBottom(play);

    return () => {
      pendingAtBottom.delete(play);
      observer.revert();
    };
  });

  const classes = ["reveal", `reveal--${variant}`, isGroup ? "reveal--group" : "", className];
  return (
    <Tag ref={ref} className={classes.filter(Boolean).join(" ")} {...rest}>
      {children}
    </Tag>
  );
}
