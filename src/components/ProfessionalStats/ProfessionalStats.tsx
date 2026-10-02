import { animate, onScroll } from "animejs";
import { professionalStats as professionalStatsEs } from "../../data/stats";
import { professionalStats as professionalStatsEn } from "../../data/stats.en";
import { useLocalized } from "../../i18n/LanguageContext";
import { useMotionScope } from "../../hooks/useMotionScope";
import { MOTION, duration } from "../../utils/motion";
import Reveal from "../Reveal";
import "./ProfessionalStats.css";

// Solo cifras que son un único entero (ej. "+8") cuentan desde cero. Rangos
// o montos ("ARS 3–15M") se muestran tal cual: no se anima lo que no es un
// dato numérico simple.
const COUNTABLE = /^(\D*)(\d+)(\D*)$/;

function StatValue({ value }: { value: string }) {
  const match = value.match(COUNTABLE);

  // El texto de este span lo escribe solo el efecto (React no le pasa
  // children), así un cambio de idioma nunca deja un valor viejo.
  const ref = useMotionScope<HTMLSpanElement>(
    (node, scope) => {
      node.textContent = value;
      if (!match || scope.matches.reduceMotion || node.dataset.counted) return;
      const [, prefix, digits, suffix] = match;
      const counter = { n: 0 };
      const render = () => {
        node.textContent = `${prefix}${Math.round(counter.n)}${suffix}`;
      };
      render();

      const observer = onScroll({ target: node, enter: "bottom-=10% top", sync: "play", repeat: false });
      animate(counter, {
        n: Number(digits),
        duration: duration(MOTION.base * 2),
        ease: MOTION.ease,
        autoplay: observer,
        onUpdate: render,
        onComplete: () => {
          node.textContent = value;
          node.dataset.counted = "true";
        },
      });

      return () => observer.revert();
    },
    [value]
  );

  return (
    <span className="stats__value">
      {/* El valor real siempre está en el DOM para lectores de pantalla. */}
      <span className="visually-hidden">{value}</span>
      <span ref={ref} aria-hidden="true" />
    </span>
  );
}

export default function ProfessionalStats() {
  const professionalStats = useLocalized(professionalStatsEs, professionalStatsEn);
  return (
    <section className="stats" aria-label="Indicadores profesionales">
      <div className="container">
        <Reveal className="stats__grid" variant="card" stagger>
          {professionalStats.map((stat) => (
            <div key={stat.label} className="stats__item">
              <StatValue value={stat.value} />
              <span className="stats__label">{stat.label}</span>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
