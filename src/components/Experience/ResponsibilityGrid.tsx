import type { ResponsibilityIcon, ResponsibilityModule } from "../../types";
import { useT } from "../../i18n/LanguageContext";
import "./ResponsibilityGrid.css";

function ResponsibilityIconGraphic({ icon }: { icon: ResponsibilityIcon }) {
  switch (icon) {
    case "target":
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth="1.6" />
          <circle cx="12" cy="12" r="4.5" stroke="currentColor" strokeWidth="1.6" />
          <circle cx="12" cy="12" r="1.4" fill="currentColor" />
        </svg>
      );
    case "trending":
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M4 17l5-6 4 3 6-8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M15 6h4v4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "chart":
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M5 19V11M12 19V5M19 19v-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      );
    case "folders":
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M3 8.5A1.5 1.5 0 0 1 4.5 7H9l1.5 2H15a1.5 1.5 0 0 1 1.5 1.5V16A1.5 1.5 0 0 1 15 17.5H4.5A1.5 1.5 0 0 1 3 16V8.5Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          <path
            d="M8 6.5A1.5 1.5 0 0 1 9.5 5H14l1.5 2H19a1.5 1.5 0 0 1 1.5 1.5V13"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinejoin="round"
            opacity="0.55"
          />
        </svg>
      );
    case "spark":
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M12 3v5M12 16v5M3 12h5M16 12h5M6 6l3 3M18 6l-3 3M6 18l3-3M18 18l-3-3"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
          />
        </svg>
      );
    case "arrow":
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M7 17 17 7M9 7h8v8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    default:
      return null;
  }
}

function ResponsibilityCard({ module }: { module: ResponsibilityModule }) {
  return (
    <div className={`responsibility-card ${module.accent ? `responsibility-card--${module.accent}` : ""}`}>
      <span className="responsibility-card__dots" aria-hidden="true">
        <span />
        <span />
        <span />
      </span>
      <div className="responsibility-card__top">
        <span className="responsibility-card__icon">
          <ResponsibilityIconGraphic icon={module.icon} />
        </span>
        <span className="index-number responsibility-card__number">{module.number}</span>
      </div>
      <p className="responsibility-card__keyword">{module.keyword}</p>
      <p className="responsibility-card__description">{module.description}</p>
    </div>
  );
}

interface ResponsibilityGridProps {
  modules: ResponsibilityModule[];
}

export default function ResponsibilityGrid({ modules }: ResponsibilityGridProps) {
  const t = useT();
  return (
    <div className="responsibility-grid">
      <p className="responsibility-grid__label">{t.experience.areasLabel}</p>
      <div className={`responsibility-grid__primary responsibility-grid__primary--${modules.length}`}>
        {modules.map((module) => (
          <ResponsibilityCard key={module.number} module={module} />
        ))}
      </div>
    </div>
  );
}
