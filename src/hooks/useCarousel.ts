import { useCallback, useEffect, useRef, useState } from "react";
import type { KeyboardEvent, PointerEvent } from "react";
import { prefersReducedMotion } from "../utils/motion";

/**
 * Carrusel sobre scroll horizontal NATIVO con scroll-snap. El touch nunca se
 * intercepta (swipe real del navegador); con mouse se puede arrastrar, y el
 * índice activo se deriva del scroll real para mantener sincronizados
 * contador, barra o puntos. `slideSelector` identifica las tarjetas.
 */
export function useCarousel(slideSelector: string) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [hasInteracted, setHasInteracted] = useState(false);
  // `dragging` solo se confirma (y solo entonces se captura el puntero)
  // cuando el desplazamiento supera el umbral: un click normal nunca queda
  // bloqueado por haber pasado por pointerdown/pointerup.
  const dragState = useRef({ pointerId: null as number | null, startX: 0, startScroll: 0, dragging: false });

  const getSlides = useCallback(
    () => Array.from(trackRef.current?.querySelectorAll<HTMLElement>(slideSelector) ?? []),
    [slideSelector]
  );

  // Posición de scroll que alinea una tarjeta con el borde de snap (respeta
  // scroll-padding: el carrusel académico tiene margen interno lateral).
  const slideScrollLeft = (track: HTMLElement, slide: HTMLElement) =>
    slide.offsetLeft - (parseFloat(getComputedStyle(track).scrollPaddingLeft) || 0);

  const scrollToIndex = useCallback(
    (index: number) => {
      const track = trackRef.current;
      if (!track) return;
      const slides = getSlides();
      const card = slides[Math.max(0, Math.min(index, slides.length - 1))];
      if (card) {
        track.scrollTo({ left: slideScrollLeft(track, card), behavior: prefersReducedMotion() ? "auto" : "smooth" });
      }
    },
    [getSlides]
  );

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const slides = getSlides();
        // En el borde derecho la última tarjeta puede no llegar a alinearse:
        // si el scroll terminó, la activa es la última.
        if (track.scrollLeft + track.clientWidth >= track.scrollWidth - 2) {
          setActiveIndex(Math.max(0, slides.length - 1));
          return;
        }
        let closest = 0;
        let closestDist = Infinity;
        slides.forEach((slide, i) => {
          const dist = Math.abs(slideScrollLeft(track, slide) - track.scrollLeft);
          if (dist < closestDist) {
            closestDist = dist;
            closest = i;
          }
        });
        setActiveIndex(closest);
      });
    };
    track.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      track.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, [getSlides]);

  const markInteracted = () => setHasInteracted(true);

  const go = (index: number) => {
    markInteracted();
    scrollToIndex(index);
  };

  const trackProps = {
    ref: trackRef,
    onPointerDown: (event: PointerEvent<HTMLDivElement>) => {
      if (event.pointerType !== "mouse") return; // touch y lápiz: scroll nativo
      const track = trackRef.current;
      if (!track) return;
      dragState.current = { pointerId: event.pointerId, startX: event.clientX, startScroll: track.scrollLeft, dragging: false };
    },
    onPointerMove: (event: PointerEvent<HTMLDivElement>) => {
      const track = trackRef.current;
      const state = dragState.current;
      if (state.pointerId !== event.pointerId || !track) return;
      const dx = event.clientX - state.startX;
      if (!state.dragging) {
        if (Math.abs(dx) <= 6) return;
        state.dragging = true;
        markInteracted();
        track.setPointerCapture(event.pointerId);
        track.classList.add("is-dragging");
      }
      track.scrollLeft = state.startScroll - dx;
    },
    onPointerUp: (event: PointerEvent<HTMLDivElement>) => endDrag(event.pointerId),
    onPointerCancel: (event: PointerEvent<HTMLDivElement>) => endDrag(event.pointerId),
    onLostPointerCapture: (event: PointerEvent<HTMLDivElement>) => endDrag(event.pointerId),
    onScroll: () => {
      if (!hasInteracted) markInteracted();
    },
    onKeyDown: (event: KeyboardEvent<HTMLDivElement>) => {
      if (event.target !== event.currentTarget) return;
      if (event.key === "ArrowRight") {
        event.preventDefault();
        go(activeIndex + 1);
      } else if (event.key === "ArrowLeft") {
        event.preventDefault();
        go(activeIndex - 1);
      }
    },
  };

  function endDrag(pointerId: number) {
    if (dragState.current.pointerId !== pointerId) return;
    dragState.current.pointerId = null;
    const track = trackRef.current;
    if (track?.classList.contains("is-dragging")) {
      track.classList.remove("is-dragging");
      // Al soltar, alinea a la tarjeta más cercana (el snap nativo no actúa
      // mientras se movía scrollLeft a mano).
      scrollToIndex(activeIndex);
    }
  }

  /** Para el click de una tarjeta: si fue un arrastre, no abre el proyecto. */
  const consumeDrag = () => {
    if (!dragState.current.dragging) return false;
    dragState.current.dragging = false;
    return true;
  };

  return { trackProps, activeIndex, hasInteracted, go, consumeDrag };
}
