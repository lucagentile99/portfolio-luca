import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { caseStudies as caseStudiesEs } from "../../data/projects";
import { caseStudies as caseStudiesEn } from "../../data/projects.en";
import { caseStudyToModalContent } from "../../utils/caseModal";
import { assetUrl } from "../../utils/assetPath";
import { useLocalized, useT } from "../../i18n/LanguageContext";
import Reveal from "../Reveal";
import CaseModal from "./CaseModal";
import { PerformanceCoverMini } from "./PerformanceVisual";
import "./Projects.css";

function triggerId(id: string) {
  return `case-trigger-${id}`;
}

function prefersReducedMotion() {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export default function Projects() {
  const t = useT();
  const caseStudies = useLocalized(caseStudiesEs, caseStudiesEn);
  const [openCaseId, setOpenCaseId] = useState<string | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [hasInteracted, setHasInteracted] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);
  // `dragging` solo se confirma (y solo entonces se activa pointer capture)
  // cuando el desplazamiento supera el umbral — así un click/tap normal
  // nunca queda bloqueado por haber pasado por pointerdown/pointerup.
  const dragState = useRef({ pointerId: null as number | null, startX: 0, startScroll: 0, dragging: false });

  const activeCases = useMemo(() => caseStudies.filter((c) => c.active !== false), [caseStudies]);

  const openIndex = activeCases.findIndex((c) => c.id === openCaseId);
  const openCase = openIndex >= 0 ? activeCases[openIndex] : null;

  const closeModal = () => {
    const id = openCaseId;
    setOpenCaseId(null);
    if (id) {
      document.getElementById(triggerId(id))?.focus();
    }
  };

  const goPrev = openIndex > 0 ? () => setOpenCaseId(activeCases[openIndex - 1].id) : undefined;
  const goNext =
    openIndex >= 0 && openIndex < activeCases.length - 1
      ? () => setOpenCaseId(activeCases[openIndex + 1].id)
      : undefined;

  const getSlides = () => Array.from(trackRef.current?.querySelectorAll<HTMLElement>(".projects__slide") ?? []);

  const scrollToIndex = useCallback((index: number) => {
    const track = trackRef.current;
    if (!track) return;
    const slides = getSlides();
    const clamped = Math.max(0, Math.min(index, slides.length - 1));
    const card = slides[clamped];
    if (card) {
      track.scrollTo({ left: card.offsetLeft, behavior: prefersReducedMotion() ? "auto" : "smooth" });
    }
  }, []);

  // Mantiene el contador/progreso sincronizados con el scroll manual (drag/swipe).
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const slides = getSlides();
        let closest = 0;
        let closestDist = Infinity;
        slides.forEach((slide, i) => {
          const dist = Math.abs(slide.offsetLeft - track.scrollLeft);
          if (dist < closestDist) {
            closestDist = dist;
            closest = i;
          }
        });
        setActiveIndex(closest);
      });
    };
    track.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      track.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  const markInteracted = () => setHasInteracted(true);

  const onPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "touch") return; // el touch ya hace scroll nativo
    const track = trackRef.current;
    if (!track) return;
    dragState.current = { pointerId: event.pointerId, startX: event.clientX, startScroll: track.scrollLeft, dragging: false };
  };

  const onPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const track = trackRef.current;
    const state = dragState.current;
    if (state.pointerId !== event.pointerId || !track) return;
    const dx = event.clientX - state.startX;
    if (!state.dragging) {
      // Todavía no se confirma como arrastre: no tocar el scroll ni
      // capturar el puntero, para no interferir con un click/tap normal.
      if (Math.abs(dx) <= 6) return;
      state.dragging = true;
      markInteracted();
      track.setPointerCapture(event.pointerId);
    }
    track.scrollLeft = state.startScroll - dx;
  };

  const endDrag = (event: React.PointerEvent<HTMLDivElement>) => {
    if (dragState.current.pointerId === event.pointerId) {
      dragState.current.pointerId = null;
    }
  };

  const onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      markInteracted();
      scrollToIndex(activeIndex + 1);
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      markInteracted();
      scrollToIndex(activeIndex - 1);
    }
  };

  const onProgressClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const ratio = (event.clientX - rect.left) / rect.width;
    const index = Math.round(ratio * (activeCases.length - 1));
    markInteracted();
    scrollToIndex(index);
  };

  const openProject = (id: string) => {
    if (dragState.current.dragging) {
      dragState.current.dragging = false;
      return;
    }
    setOpenCaseId(id);
  };

  const renderCard = (project: (typeof activeCases)[number], index: number) => (
    <Reveal as="article" key={project.id} className="case-card card projects__slide" delay={Math.min(index, 4) * 60}>
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
        <h3 className="case-card__title">
          <button type="button" id={triggerId(project.id)} className="case-card__title-btn" onClick={() => openProject(project.id)}>
            {project.name}
          </button>
        </h3>
        <p className="case-card__description">{project.cardDescription}</p>
        <div className="case-card__tags">
          {project.cardTags.slice(0, 2).map((tag) => (
            <span key={tag} className="tag">
              {tag}
            </span>
          ))}
        </div>
        <div className="case-card__footer">
          <span className="btn btn-primary case-card__cta" aria-hidden="true">
            {t.projects.openProject}
          </span>
        </div>
      </div>
    </Reveal>
  );

  const progressPercent = activeCases.length > 1 ? (activeIndex / (activeCases.length - 1)) * 100 : 100;

  const prevDisabled = activeIndex === 0;
  const nextDisabled = activeIndex === activeCases.length - 1;

  const handlePrev = () => {
    markInteracted();
    scrollToIndex(activeIndex - 1);
  };
  const handleNext = () => {
    markInteracted();
    scrollToIndex(activeIndex + 1);
  };

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
            <button
              type="button"
              className="projects__progress"
              aria-label={t.projects.progressAria}
              onClick={onProgressClick}
            >
              <span className="projects__progress-fill" style={{ width: `${progressPercent}%` }} />
            </button>
          </div>
        </Reveal>
      </div>

      <div className="projects__carousel">
        <button type="button" className="projects__side-arrow projects__side-arrow--prev" onClick={handlePrev} disabled={prevDisabled}>
          <span className="visually-hidden">{t.projects.prevProject}</span>
          <span aria-hidden="true">←</span>
        </button>

        <div
          ref={trackRef}
          className="projects__track"
          role="region"
          aria-label={t.projects.carouselAria}
          tabIndex={0}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerLeave={endDrag}
          onPointerCancel={endDrag}
          onKeyDown={onKeyDown}
        >
          <span className="projects__track-spacer" aria-hidden="true" />
          {activeCases.map((project, index) => renderCard(project, index))}
          <span className="projects__track-spacer" aria-hidden="true" />
        </div>

        <button type="button" className="projects__side-arrow projects__side-arrow--next" onClick={handleNext} disabled={nextDisabled}>
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
