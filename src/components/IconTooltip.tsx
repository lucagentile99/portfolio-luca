import { useEffect, useId, useRef, useState } from "react";
import "./IconTooltip.css";

interface IconTooltipProps {
  className?: string;
  icon: React.ReactNode;
  label: string;
  /** Segunda línea opcional, visible siempre debajo del nombre (ej. "Research + web"). */
  meta?: string;
  tooltip: string;
}

/**
 * Ícono + nombre con tooltip descriptivo. En desktop se abre con hover/focus
 * (CSS puro); en touch se abre con tap y se cierra al tocar afuera o con
 * Escape (no hay :hover en mobile, así que hace falta JS para ese caso).
 */
export default function IconTooltip({ className = "", icon, label, meta, tooltip }: IconTooltipProps) {
  const [isOpen, setIsOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const bubbleRef = useRef<HTMLSpanElement>(null);
  const tooltipId = useId();

  // Evita que el globo del tooltip se corte contra el borde de la pantalla
  // cuando el ícono está cerca del margen (última columna de la fila, etc.).
  // Se calcula a partir del ícono (no se remide el propio globo, que ya
  // puede estar desplazado por un cálculo anterior) para que el resultado
  // no dependa del orden de lectura/escritura del transform.
  const keepInViewport = () => {
    const bubble = bubbleRef.current;
    const root = rootRef.current;
    if (!bubble || !root) return;
    const rootRect = root.getBoundingClientRect();
    const iconCenterX = rootRect.left + rootRect.width / 2;
    const bubbleWidth = bubble.offsetWidth;
    const unshiftedLeft = iconCenterX - bubbleWidth / 2;
    const margin = 12;
    let shift = 0;
    if (unshiftedLeft < margin) {
      shift = margin - unshiftedLeft;
    } else if (unshiftedLeft + bubbleWidth > window.innerWidth - margin) {
      shift = window.innerWidth - margin - (unshiftedLeft + bubbleWidth);
    }
    bubble.style.setProperty("--bubble-shift", `${shift}px`);
  };

  useEffect(() => {
    if (!isOpen) return;

    const onPointerDown = (event: PointerEvent) => {
      if (rootRef.current && !rootRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };

    document.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen]);

  return (
    <div
      ref={rootRef}
      className={`icon-tooltip ${isOpen ? "is-open" : ""} ${className}`}
      onMouseEnter={keepInViewport}
      onFocus={keepInViewport}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node)) setIsOpen(false);
      }}
    >
      <button
        type="button"
        className="icon-tooltip__trigger"
        aria-describedby={tooltipId}
        onClick={() => {
          keepInViewport();
          setIsOpen((open) => !open);
        }}
      >
        <span className="icon-tooltip__icon">{icon}</span>
        <span className="icon-tooltip__label">{label}</span>
        {meta && <span className="icon-tooltip__meta">{meta}</span>}
      </button>
      <span role="tooltip" id={tooltipId} ref={bubbleRef} className="icon-tooltip__bubble">
        {tooltip}
      </span>
    </div>
  );
}
