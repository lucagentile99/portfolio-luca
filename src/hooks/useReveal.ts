import { useEffect, useRef, useState } from "react";

/**
 * Devuelve un ref y un flag `isVisible` para animar la entrada de un
 * elemento al aparecer en el viewport. Respeta prefers-reduced-motion
 * dejando el contenido visible de entrada (el CSS ya lo maneja también).
 */
export function useReveal<T extends HTMLElement>(threshold = 0.15) {
  const ref = useRef<T | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (typeof IntersectionObserver === "undefined") {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold }
    );

    observer.observe(node);

    // Red de seguridad: si por algún motivo el navegador nunca dispara el
    // observer (tab en background, throttling, etc.), el contenido no debe
    // quedar invisible de forma permanente.
    const fallback = window.setTimeout(() => setIsVisible(true), 1200);

    return () => {
      observer.disconnect();
      window.clearTimeout(fallback);
    };
  }, [threshold]);

  return { ref, isVisible };
}
