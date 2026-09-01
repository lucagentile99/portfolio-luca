import { professionalStats as professionalStatsEs } from "../../data/stats";
import { professionalStats as professionalStatsEn } from "../../data/stats.en";
import { useLocalized } from "../../i18n/LanguageContext";
import Reveal from "../Reveal";
import "./ProfessionalStats.css";

export default function ProfessionalStats() {
  const professionalStats = useLocalized(professionalStatsEs, professionalStatsEn);
  return (
    <section className="stats" aria-label="Indicadores profesionales">
      <div className="container">
        <div className="stats__grid">
          {professionalStats.map((stat, index) => (
            <Reveal key={stat.label} className="stats__item" delay={index * 60}>
              <span className="stats__value">{stat.value}</span>
              <span className="stats__label">{stat.label}</span>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
