import { useMemo, useState } from "react";
import { caseStudies as caseStudiesEs } from "../../data/projects";
import { caseStudies as caseStudiesEn } from "../../data/projects.en";
import { caseStudyToModalContent } from "../../utils/caseModal";
import { assetUrl } from "../../utils/assetPath";
import { useLocalized, useT } from "../../i18n/LanguageContext";
import { useCarousel } from "../../hooks/useCarousel";
import Reveal from "../Reveal";
import CaseModal from "./CaseModal";
import { CarouselProgress } from "./CarouselIndicators";
import { PerformanceCoverMini } from "./PerformanceVisual";
import "./Projects.css";

function triggerId(id: string) {
  return `case-trigger-${id}`;
}

export default function Projects() {
  const t = useT();
  const caseStudies = useLocalized(caseStudiesEs, caseStudiesEn);
  const [openCaseId, setOpenCaseId] = useState<string | null>(null);
  const { trackProps, activeIndex, hasInteracted, go, consumeDrag } = useCarousel(".projects__slide");

  const activeCases = useMemo(() => caseStudies.filter((c) => c.active !== false), [caseStudies]);

  const openIndex = activeCases.findIndex((c) => c.id === openCaseId);
  const openCase = openIndex >= 0 ? activeCases[openIndex] : null;

  const closeModal = () => {
    const id = openCaseId;
    setOpenCaseId(null);
    if (id) {
      document.getElementById(triggerId(id))?.focus({ preventScroll: true });
    }
  };

  const goPrev = openIndex > 0 ? () => setOpenCaseId(activeCases[openIndex - 1].id) : undefined;
  const goNext =
    openIndex >= 0 && openIndex < activeCases.length - 1
      ? () => setOpenCaseId(activeCases[openIndex + 1].id)
      : undefined;

  const openProject = (id: string) => {
    if (consumeDrag()) return;
    setOpenCaseId(id);
  };

  // Toda la tarjeta abre el proyecto: el botón "Abrir proyecto" es el único
  // control real y su ::after se estira sobre la tarjeta (un solo tab stop).
  const renderCard = (project: (typeof activeCases)[number], index: number) => (
    <Reveal as="article" key={project.id} className="case-card card projects__slide" delay={Math.min(index, 3) * 60}>
      <div className={`case-card__image ${index % 2 === 1 ? "case-card__image--celeste" : ""}`}>
        {project.gallery[0] ? (
          <img src={assetUrl(project.gallery[0].src)} alt={project.gallery[0].alt} loading="lazy" draggable={false} />
        ) : (
          project.coverStats && (
            <PerformanceCoverMini eyebrow={project.coverStats.eyebrow} metrics={project.coverStats.metrics} />
          )
        )}
        <span className="case-card__tab" aria-hidden="true">
          PROJECT_{String(index + 1).padStart(2, "0")}
        </span>
        <span className="case-card__sticker" aria-hidden="true">
          *
        </span>
      </div>
      <div className="case-card__body">
        <div className="case-card__meta">
          <span className="case-card__rubro">
            {String(index + 1).padStart(2, "0")} · {project.industry.toUpperCase()}
          </span>
          {project.statusLabel && <span className="badge-status">{project.statusLabel}</span>}
        </div>
        <h3 className="case-card__title">{project.name}</h3>
        <p className="case-card__description">{project.cardDescription}</p>
        <div className="case-card__tags">
          {project.cardTags.slice(0, 2).map((tag) => (
            <span key={tag} className="tag">
              {tag}
            </span>
          ))}
        </div>
        <div className="case-card__footer">
          <button
            type="button"
            id={triggerId(project.id)}
            className="btn btn-primary case-card__cta case-card__open"
            aria-label={t.projects.openProjectAria(project.name)}
            onClick={() => openProject(project.id)}
          >
            {t.projects.openProject}
          </button>
        </div>
      </div>
    </Reveal>
  );

  return (
    <section id="proyectos" className="section projects">
      <div className="projects__wide">
        <Reveal as="div" className="section-head projects__head reveal--mask">
          <p className="eyebrow">{t.projects.eyebrow}</p>
          <div className="projects__title-row">
            <h2 className="section-title">{t.projects.title}</h2>
            <span className="projects__counter" aria-hidden="true">
              {String(activeIndex + 1).padStart(2, "0")} / {String(activeCases.length).padStart(2, "0")}
            </span>
          </div>
          <p className="section-subtitle">{t.projects.subtitle}</p>

          <div className="projects__hint-row">
            <p className={`projects__hint ${hasInteracted ? "is-hidden" : ""}`} aria-hidden="true">
              <span className="projects__hint-desktop">{t.projects.hintDesktop}</span>
              <span className="projects__hint-mobile">{t.projects.hintMobile}</span>
            </p>
            <CarouselProgress activeIndex={activeIndex} total={activeCases.length} label={t.projects.progressAria} onSelect={go} />
          </div>
        </Reveal>
      </div>

      <div className="projects__carousel">
        <button
          type="button"
          className="projects__side-arrow projects__side-arrow--prev"
          onClick={() => go(activeIndex - 1)}
          disabled={activeIndex === 0}
        >
          <span className="visually-hidden">{t.projects.prevProject}</span>
          <span aria-hidden="true">←</span>
        </button>

        <div {...trackProps} className="projects__track carousel-track" role="region" aria-label={t.projects.carouselAria} tabIndex={0}>
          <span className="projects__track-spacer" aria-hidden="true" />
          {activeCases.map((project, index) => renderCard(project, index))}
          <span className="projects__track-spacer" aria-hidden="true" />
        </div>

        <button
          type="button"
          className="projects__side-arrow projects__side-arrow--next"
          onClick={() => go(activeIndex + 1)}
          disabled={activeIndex === activeCases.length - 1}
        >
          <span className="visually-hidden">{t.projects.nextProject}</span>
          <span aria-hidden="true">→</span>
        </button>
      </div>

      {openCase && (
        <CaseModal
          content={caseStudyToModalContent(openCase)}
          onClose={closeModal}
          onPrev={goPrev}
          onNext={goNext}
          prevLabel={t.projects.prevProject}
          nextLabel={t.projects.nextProject}
        />
      )}
    </section>
  );
}
