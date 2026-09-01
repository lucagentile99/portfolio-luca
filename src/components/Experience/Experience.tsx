import { useEffect, useId, useLayoutEffect, useRef, useState } from "react";
import { experienceEntries as experienceEntriesEs } from "../../data/experience";
import { experienceEntries as experienceEntriesEn } from "../../data/experience.en";
import { assetUrl } from "../../utils/assetPath";
import { useLocalized, useT } from "../../i18n/LanguageContext";
import Reveal from "../Reveal";
import ResponsibilityGrid from "./ResponsibilityGrid";
import "./Experience.css";

export default function Experience() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const baseId = useId();
  const panelRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [panelHeights, setPanelHeights] = useState<number[]>([]);
  const t = useT();
  const experienceEntries = useLocalized(experienceEntriesEs, experienceEntriesEn);

  useLayoutEffect(() => {
    setPanelHeights(panelRefs.current.map((el) => el?.scrollHeight ?? 0));
  }, [openIndex]);

  useEffect(() => {
    const measure = () => setPanelHeights(panelRefs.current.map((el) => el?.scrollHeight ?? 0));
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  return (
    <section id="experiencia" className="section section--alt experience">
      <div className="container">
        <Reveal as="div" className="section-head reveal--mask">
          <p className="eyebrow">{t.experience.eyebrow}</p>
          <h2 className="section-title">{t.experience.title}</h2>
        </Reveal>

        <ol className="experience__timeline">
          {experienceEntries.map((entry, index) => {
            const isOpen = openIndex === index;
            const triggerId = `${baseId}-exp-trigger-${index}`;
            const panelId = `${baseId}-exp-panel-${index}`;

            return (
              <li key={entry.id}>
                <Reveal
                  as="article"
                  className={`experience__item card ${entry.focusTag ? "experience__item--primary" : ""} ${isOpen ? "is-open" : ""}`}
                  delay={index * 60}
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

                  <div
                    className="experience__panel-wrapper"
                    style={{ maxHeight: isOpen ? `${panelHeights[index] ?? 1200}px` : "0px" }}
                  >
                    <div
                      className="experience__panel"
                      id={panelId}
                      role="region"
                      aria-labelledby={triggerId}
                      ref={(el) => {
                        panelRefs.current[index] = el;
                      }}
                    >
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
                  </div>
                </Reveal>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
