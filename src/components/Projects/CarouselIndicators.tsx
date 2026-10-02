import { useEffect, useRef } from "react";
import type { MouseEvent } from "react";
import { animate, utils } from "animejs";
import { MOTION, prefersReducedMotion } from "../../utils/motion";

interface ProgressProps {
  activeIndex: number;
  total: number;
  label: string;
  onSelect: (index: number) => void;
}

/** Barra de progreso del carrusel: el relleno se anima con scaleX (no width). */
export function CarouselProgress({ activeIndex, total, label, onSelect }: ProgressProps) {
  const fillRef = useRef<HTMLSpanElement>(null);
  const ratio = total > 1 ? (activeIndex + 1) / total : 1;

  useEffect(() => {
    const fill = fillRef.current;
    if (!fill) return;
    if (prefersReducedMotion()) {
      utils.set(fill, { scaleX: ratio });
      return;
    }
    const animation = animate(fill, { scaleX: ratio, duration: MOTION.fast + 60, ease: MOTION.ease });
    return () => {
      animation.pause();
    };
  }, [ratio]);

  const onClick = (event: MouseEvent<HTMLButtonElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    onSelect(Math.round(((event.clientX - rect.left) / rect.width) * (total - 1)));
  };

  return (
    <button type="button" className="carousel-progress" aria-label={label} onClick={onClick}>
      <span ref={fillRef} className="carousel-progress__fill" />
    </button>
  );
}

interface DotsProps {
  activeIndex: number;
  total: number;
  getLabel: (n: number) => string;
  onSelect: (index: number) => void;
  className?: string;
}

/** Puntos del carrusel: el activo se estira (scaleX) con anime.js. */
export function CarouselDots({ activeIndex, total, getLabel, onSelect, className = "" }: DotsProps) {
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dots = Array.from(listRef.current?.querySelectorAll<HTMLElement>(".carousel-dots__dot span") ?? []);
    const params = (i: number) => ({ scaleX: i === activeIndex ? 2.4 : 1 });
    if (prefersReducedMotion()) {
      dots.forEach((dot, i) => utils.set(dot, params(i)));
      return;
    }
    const animations = dots.map((dot, i) => animate(dot, { ...params(i), duration: MOTION.fast, ease: MOTION.ease }));
    return () => animations.forEach((animation) => animation.pause());
  }, [activeIndex, total]);

  return (
    <div ref={listRef} className={`carousel-dots ${className}`.trim()}>
      {Array.from({ length: total }, (_, i) => (
        <button
          key={i}
          type="button"
          className={`carousel-dots__dot ${i === activeIndex ? "is-active" : ""}`}
          aria-label={getLabel(i + 1)}
          aria-current={i === activeIndex ? "true" : undefined}
          onClick={() => onSelect(i)}
        >
          <span aria-hidden="true" />
        </button>
      ))}
    </div>
  );
}
