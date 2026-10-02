import { useId, useState } from "react";
import { siteConfig } from "../../data/siteConfig";
import { personalIntro as personalIntroEs } from "../../data/personalIntro";
import { personalIntro as personalIntroEn } from "../../data/personalIntro.en";
import { aboutHint as aboutHintEs, aboutPillars as aboutPillarsEs, aboutTitle as aboutTitleEs } from "../../data/about";
import { aboutHint as aboutHintEn, aboutPillars as aboutPillarsEn, aboutTitle as aboutTitleEn } from "../../data/about.en";
import { assetUrl } from "../../utils/assetPath";
import { useLocalized, useT } from "../../i18n/LanguageContext";
import Collapse from "../Collapse";
import Reveal from "../Reveal";
import "./PersonalIntro.css";

// Un único bloque compacto: foto a la izquierda, y a la derecha —en el
// mismo flujo, sin partirse en dos niveles— título, texto breve, CTA y los
// 3 módulos de proceso en acordeón (uno solo abierto a la vez).
export default function PersonalIntro() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const baseId = useId();
  const t = useT();
  const personalIntro = useLocalized(personalIntroEs, personalIntroEn);
  const aboutTitle = useLocalized(aboutTitleEs, aboutTitleEn);
  const aboutHint = useLocalized(aboutHintEs, aboutHintEn);
  const aboutPillars = useLocalized(aboutPillarsEs, aboutPillarsEn);

  return (
    <section id="sobre-mi" className="section personal-intro">
      <div className="container personal-intro__grid">
        <Reveal className="personal-intro__photo-col reveal--photo">
          <div className="personal-intro__frame">
            {siteConfig.photoPath && (
              <img
                src={assetUrl(siteConfig.photoPath)}
                alt={personalIntro.photoAlt}
                className="personal-intro__photo"
              />
            )}
            <span className="personal-intro__tag" aria-hidden="true">
              {t.personalIntro.photoTag}
            </span>
            <span className="index-number personal-intro__index" aria-hidden="true">
              01
            </span>
            <span className="mark-asterisk personal-intro__asterisk" aria-hidden="true">
              *
            </span>
          </div>
        </Reveal>

        <div className="personal-intro__content">
          <Reveal as="p" className="eyebrow" delay={60}>
            {t.personalIntro.eyebrow}
          </Reveal>
          <Reveal as="h2" className="personal-intro__greeting reveal--mask" delay={120}>
            {personalIntro.greeting}
          </Reveal>
          <Reveal as="p" className="personal-intro__text" delay={180}>
            {personalIntro.text}
          </Reveal>

          <Reveal delay={240}>
            <a href="#proyectos" className="btn btn-secondary personal-intro__cta">
              {personalIntro.ctaLabel}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M5 12h13M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </Reveal>

          <Reveal as="p" className="personal-intro__process-label" delay={300}>
            {aboutTitle}
          </Reveal>

          <Reveal className="about__pillars" stagger delay={340}>
            {aboutPillars.map((pillar, index) => {
              const isOpen = openIndex === index;
              const triggerId = `${baseId}-trigger-${index}`;
              const panelId = `${baseId}-panel-${index}`;

              return (
                <article key={pillar.title} className={`about__pillar card ${isOpen ? "is-open" : ""}`}>
                  <h3 className="about__pillar-heading">
                    <button
                      type="button"
                      id={triggerId}
                      className="about__pillar-trigger"
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      onClick={() => setOpenIndex(isOpen ? null : index)}
                    >
                      <span className="about__pillar-index">0{index + 1}</span>
                      <span className="about__pillar-heading-text">
                        <span className="about__pillar-title">{pillar.title}</span>
                        <span className="about__pillar-description">{pillar.description}</span>
                        <span className="about__pillar-hint">{aboutHint}</span>
                      </span>
                      <span className="about__pillar-toggle" aria-hidden="true">
                        {isOpen ? "−" : "+"}
                      </span>
                    </button>
                  </h3>

                  <Collapse open={isOpen} className="about__pillar-panel" id={panelId} role="region" aria-labelledby={triggerId}>
                    <div className="about__pillar-panel-inner">
                      <p className="about__pillar-lead">{pillar.label}</p>
                      <p className="about__pillar-body">{pillar.body}</p>
                      <ul className="about__pillar-points">
                        {pillar.points.slice(0, 3).map((point) => (
                          <li key={point}>{point}</li>
                        ))}
                      </ul>
                    </div>
                  </Collapse>
                </article>
              );
            })}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
