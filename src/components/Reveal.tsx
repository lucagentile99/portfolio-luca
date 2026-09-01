import type { ElementType, HTMLAttributes, ReactNode } from "react";
import { useReveal } from "../hooks/useReveal";

interface RevealProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  delay?: number;
}

export default function Reveal({ children, as: Tag = "div", className = "", delay = 0, ...rest }: RevealProps) {
  const { ref, isVisible } = useReveal<HTMLElement>();

  return (
    <Tag
      ref={ref}
      className={`reveal ${isVisible ? "is-visible" : ""} ${className}`.trim()}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
      {...rest}
    >
      {children}
    </Tag>
  );
}
