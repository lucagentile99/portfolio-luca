import { useEffect, useId, useLayoutEffect, useRef, useState } from "react";
import { educationEntries as educationEntriesEs, educationIntro as educationIntroEs } from "../../data/education";
import { educationEntries as educationEntriesEn, educationIntro as educationIntroEn } from "../../data/education.en";
import { useLocalized, useT } from "../../i18n/LanguageContext";
import Reveal from "../Reveal";
import "./Education.css";

function FolderIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M3 8.5A1.5 1.5 0 0 1 4.5 7H9l1.5 2H19a1.5 1.5 0 0 1 1.5 1.5V16A1.5 1.5 0 0 1 19 17.5H4.5A1.5 1.5 0 0 1 3 16V8.5Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function EntryVisual({ entryId }: { entryId: string }) {
  switch (entryId) {
    case "isec-publicidad":
      return (
        <svg width="52" height="52" viewBox="0 0 52 52" fill="none" aria-hidden="true">
          <circle cx="26" cy="26" r="24" stroke="var(--color-border)" strokeWidth="1.5" />
          <path
            d="M14 24v6l4 1v-8l-4 1Z"
            stroke="var(--color-accent-strong)"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
          <path d="M18 22.5 32 18v16l-14-4.5v-7Z" stroke="var(--color-accent-strong)" strokeWidth="1.8" strokeLinejoin="round" />
          <path d="M19 31l1.5 5" stroke="var(--color-accent-strong)" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      );
    case "home-brother":
      return (
        <svg width="52" height="52" viewBox="0 0 52 52" fill="none" aria-hidden="true">
          <circle cx="26" cy="26" r="24" stroke="var(--color-border)" strokeWidth="1.5" />
          <path
            d="M26 15a9 9 0 0 0-5 16.5c.6.45 1 1.2 1 2v1.5h8V33.5c0-.8.4-1.55 1-2A9 9 0 0 0 26 15Z"
            stroke="var(--color-secondary)"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
          <path d="M22.5 38h7" stroke="var(--color-secondary)" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      );
    case "luzzi-digital":
      return (
        <svg width="52" height="52" viewBox="0 0 52 52" fill="none" aria-hidden="true">
          <circle cx="26" cy="26" r="24" stroke="var(--color-border)" strokeWidth="1.5" />
          <circle cx="26" cy="26" r="9.5" stroke="var(--color-accent-strong)" strokeWidth="1.8" />
          <circle cx="26" cy="26" r="4.5" stroke="var(--color-accent-strong)" strokeWidth="1.8" />
          <circle cx="26" cy="26" r="1.2" fill="var(--color-accent-strong)" />
        </svg>
      );
    default:
      return (
        <svg width="52" height="52" viewBox="0 0 52 52" fill="none" aria-hidden="true">
          <circle cx="26" cy="26" r="24" stroke="var(--color-border)" strokeWidth="1.5" />
          <rect x="15" y="19" width="22" height="15" rx="2" stroke="var(--color-accent-deep)" strokeWidth="1.8" />
          <circle cx="26" cy="26.5" r="4.5" stroke="var(--color-accent-deep)" strokeWidth="1.8" />
          <path d="M20 19l1.4-2.5h9.2L32 19" stroke="var(--color-accent-deep)" strokeWidth="1.8" strokeLinejoin="round" />
        </svg>
      );
  }
}

export default function Education() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const baseId = useId();
  const panelRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [panelHeights, setPanelHeights] = useState<number[]>([]);
  const t = useT();
  const educationEntries = useLocalized(educationEntriesEs, educationEntriesEn);
  const educationIntro = useLocalized(educationIntroEs, educationIntroEn);

  useLayoutEffect(() => {
    setPanelHeights(panelRefs.current.map((el) => el?.scrollHeight ?? 0));
  }, [openIndex]);

  useEffect(() => {
    const measure = () => setPanelHeights(panelRefs.current.map((el) => el?.scrollHeight ?? 0));
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  return (
    <section id="educacion" className="section education" aria-labelledby="educacion-titulo">
      <div className="container">
        <Reveal as="div" className="section-head reveal--mask">
          <p className="eyebrow">{t.education.eyebrow}</p>
          <h2 className="section-title" id="educacion-titulo">
            {educationIntro}
          </h2>
        </Reveal>

        <ol className="education__timeline">
          {educationEntries.map((entry, index) => {
            const isOpen = openIndex === index;
            const triggerId = `${baseId}-edu-trigger-${index}`;
            const panelId = `${baseId}-edu-panel-${index}`;

            return (
              <li key={entry.id} className="education__node">
                <span className="education__node-marker">0{index + 1}</span>
                <Reveal
                  as="article"
                  className={`education__card card ${isOpen ? "is-open" : ""}`}
                  delay={140 + index * 60}
                >
                  <h3 className="education__heading">
                    <button
                      type="button"
                      id={triggerId}
                      className="education__trigger"
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      onClick={() => setOpenIndex(isOpen ? null : index)}
                    >
                      <span className="education__folder-icon">
                        <FolderIcon />
                      </span>
                      <span className="education__folder-name">{entry.folderName}</span>
                      <span className="education__toggle" aria-hidden="true">
                        {isOpen ? "−" : "+"}
                      </span>
                      <span className="education__program">{entry.program}</span>
                      <span className="file-tag education__file-tag">
                        {entry.institution}
                        {entry.period && ` · ${entry.period}`}
                      </span>
                    </button>
                  </h3>

                  {(entry.description || entry.learnings) && (
                    <div
                      className="education__panel-wrapper"
                      style={{ maxHeight: isOpen ? `${panelHeights[index] ?? 260}px` : "0px" }}
                    >
                      <div
                        className="education__panel"
                        id={panelId}
                        role="region"
                        aria-labelledby={triggerId}
                        ref={(el) => {
                          panelRefs.current[index] = el;
                        }}
                      >
                        <div className="education__panel-grid">
                          <div className="education__panel-copy">
                            {entry.description && <p className="education__description">{entry.description}</p>}
                            {entry.learnings && (
                              <ul className="education__learnings">
                                {entry.learnings.map((item) => (
                                  <li key={item}>{item}</li>
                                ))}
                              </ul>
                            )}
                          </div>
                          <div className="education__visual">
                            <EntryVisual entryId={entry.id} />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </Reveal>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
