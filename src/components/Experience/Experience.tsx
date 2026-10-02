import { useId, useState } from "react";
import { experienceEntries as experienceEntriesEs } from "../../data/experience";
import { experienceEntries as experienceEntriesEn } from "../../data/experience.en";
import { assetUrl } from "../../utils/assetPath";
import { useLocalized, useT } from "../../i18n/LanguageContext";
import Collapse from "../Collapse";
import Reveal from "../Reveal";
import ResponsibilityGrid from "./ResponsibilityGrid";
import "./Experience.css";

export default function Experience() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const baseId = useId();
  const t = useT();
  const experienceEntries = useLocalized(experienceEntriesEs, experienceEntriesEn);

  return (
    <section id="experiencia" className="section section--alt experience">
      <div className="container">
        <Reveal as="div" className="section-head" variant="head">
          <p className="eyebrow">{t.experience.eyebrow}</p>
          <h2 className="section-title">{t.experience.title}</h2>
        </Reveal>

        <Reveal as="ol" className="experience__timeline" variant="card" stagger>
          {experienceEntries.map((entry, index) => {
            const isOpen = openIndex === index;
            const triggerId = `${baseId}-exp-trigger-${index}`;
            const panelId = `${baseId}-exp-panel-${index}`;

            return (
              <li key={entry.id}>
                <article
                  className={`experience__item card ${entry.focusTag ? "experience__item--primary" : ""} ${isOpen ? "is-open" : ""}`}
                >
                  <h3 className="experience__heading">
                    <button
                      type="button"
                      id={triggerId}
                      className="experience__trigger"
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      onClick={() => setOpenIndex(isOpen ? null : index)}
                    >
                      <span className="experience__trigger-main">
                        <span className="experience__company">{entry.company}</span>
                        <span className="experience__role">{entry.role}</span>
                      </span>
                      <span className="experience__trigger-meta">
                        <span className="tag">{entry.period}</span>
                        {entry.modality && <span className="experience__modality">{entry.modality}</span>}
                      </span>
                      <span className="experience__toggle" aria-hidden="true">
                        {isOpen ? "−" : "+"}
                      </span>
                    </button>
                  </h3>

                  <ul className="experience__impact-tags" aria-hidden="true">
                    {entry.impactTags.map((tag) => (
                      <li key={tag}>{tag}</li>
                    ))}
                  </ul>

                  <Collapse open={isOpen} id={panelId} role="region" aria-labelledby={triggerId}>
                    <div className="experience__panel">
                      {entry.focusTag && (
                        <div className="experience__focus" aria-hidden="true">
                          <img src={assetUrl("/images/logos/meta.svg")} alt="" className="experience__focus-logo" />
                          <span className="experience__focus-tag">{entry.focusTag}</span>
                          <svg className="experience__focus-spark" viewBox="0 0 64 22" aria-hidden="true">
                            <polyline
                              points="2,18 16,14 30,15 44,6 62,3"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <circle cx="62" cy="3" r="2.4" fill="currentColor" />
                          </svg>
                        </div>
                      )}

                      <p className="experience__summary">{entry.summary}</p>

                      <ResponsibilityGrid modules={entry.responsibilities} />
                    </div>
                  </Collapse>
                </article>
              </li>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}
