import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import type { CaseModalContent } from "../../types";
import { assetUrl } from "../../utils/assetPath";
import { useT } from "../../i18n/LanguageContext";
import RoleGrid, { FolderIcon } from "./RoleGrid";
import PerformanceVisual from "./PerformanceVisual";
import "./CaseModal.css";

interface CaseModalProps {
  content: CaseModalContent;
  onClose: () => void;
  onPrev?: () => void;
  onNext?: () => void;
  prevLabel?: string;
  nextLabel?: string;
}

export default function CaseModal({ content, onClose, onPrev, onNext, prevLabel, nextLabel }: CaseModalProps) {
  const t = useT();
  const dialogRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const lightboxCloseRef = useRef<HTMLButtonElement>(null);
  const galleryButtonRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const lightboxIndexRef = useRef<number | null>(null);
  const lastOpenedGalleryIndex = useRef<number | null>(null);
  const galleryLengthRef = useRef(content.gallery.length);
  lightboxIndexRef.current = lightboxIndex;
  galleryLengthRef.current = content.gallery.length;

  useEffect(() => {
    if (lightboxIndex !== null) {
      lastOpenedGalleryIndex.current = lightboxIndex;
      lightboxCloseRef.current?.focus();
    } else if (lastOpenedGalleryIndex.current !== null) {
      galleryButtonRefs.current[lastOpenedGalleryIndex.current]?.focus();
    }
  }, [lightboxIndex]);

  useEffect(() => {
    closeButtonRef.current?.focus();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      const openLightboxIndex = lightboxIndexRef.current;
      if (event.key === "Escape") {
        if (openLightboxIndex !== null) {
          setLightboxIndex(null);
        } else {
          onClose();
        }
        return;
      }
      if (openLightboxIndex !== null) {
        const len = galleryLengthRef.current;
        if (event.key === "ArrowRight") {
          setLightboxIndex((i) => (i === null ? i : (i + 1) % len));
        } else if (event.key === "ArrowLeft") {
          setLightboxIndex((i) => (i === null ? i : (i - 1 + len) % len));
        }
        return;
      }
      if (event.key !== "Tab" || !dialogRef.current) return;
      const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
      );
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [onClose]);

  // Vuelve a poner el scroll interno arriba cada vez que cambia de caso (prev/next).
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: 0 });
    setLightboxIndex(null);
  }, [content.id]);

  return (
    <div className="case-modal__backdrop" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div
        className="case-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="case-modal-title"
        ref={dialogRef}
      >
        <header className="case-modal__topbar">
          {(onPrev || onNext) && (
            <div className="case-modal__nav">
              <button type="button" className="case-modal__nav-btn" onClick={onPrev} disabled={!onPrev}>
                <span aria-hidden="true">←</span> {prevLabel ?? t.projects.prevProject}
              </button>
              <button type="button" className="case-modal__nav-btn" onClick={onNext} disabled={!onNext}>
                {nextLabel ?? t.projects.nextProject} <span aria-hidden="true">→</span>
              </button>
            </div>
          )}
          <div className="case-modal__topbar-info">
            <span className="file-tag case-modal__topbar-tag">{content.id}.case</span>
          </div>
          <button type="button" className="case-modal__close" onClick={onClose} ref={closeButtonRef}>
            <span className="visually-hidden">{t.caseModal.closeCase}</span>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M5 5l14 14M19 5 5 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </header>

        <div className="case-modal__scroll" ref={scrollRef}>
        <div className="case-modal__body">
          <div className="case-modal__meta">
            {content.kind === "academico" && <span className="badge-academic">{t.caseModal.academicBadge}</span>}
            <span className="case-modal__rubro">{content.industry.toUpperCase()}</span>
          </div>
          <h3 id="case-modal-title" className="case-modal__title">
            {content.name}
          </h3>
          {(content.tagline || content.concept) && (
            <p className="case-modal__tagline">{content.tagline ?? content.concept}</p>
          )}

          {content.gallery.length > 0 && (
            <div className="case-modal__gallery">
              <p className="case-modal__gallery-label">
                {t.caseModal.gallery} <span aria-hidden="true">· {String(content.gallery.length).padStart(2, "0")}</span>
              </p>
              <div className="case-modal__gallery-strip">
                {content.gallery.slice(0, 4).map((image, index) => {
                  const remaining = content.gallery.length - 4;
                  const showMore = index === 3 && remaining > 0;
                  return (
                    <button
                      type="button"
                      key={image.src}
                      ref={(el) => {
                        galleryButtonRefs.current[index] = el;
                      }}
                      className="case-modal__gallery-item"
                      onClick={() => setLightboxIndex(index)}
                    >
                      <img src={assetUrl(image.src)} alt={image.alt} loading={index === 0 ? undefined : "lazy"} />
                      {showMore && (
                        <span className="case-modal__gallery-more" aria-hidden="true">
                          {t.caseModal.morePieces(remaining)}
                        </span>
                      )}
                      <span className="case-modal__gallery-zoom" aria-hidden="true">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                          <circle cx="11" cy="11" r="6.5" stroke="currentColor" strokeWidth="1.8" />
                          <path d="M20 20l-4.3-4.3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                          <path d="M11 8.5v5M8.5 11h5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                        </svg>
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {content.participation && content.participation.length > 0 ? (
            <div className="case-modal__section">
              <RoleGrid items={content.participation} tools={content.tools} />
            </div>
          ) : (
            // Campañas académicas: sin autoría individual (no hay `participation`),
            // pero el desarrollo real del trabajo grupal se muestra igual, como chips.
            content.strategy &&
            content.strategy.length > 0 && (
              <div className="case-modal__section role-grid">
                <p className="role-grid__eyebrow">{t.roleGrid.whatWasDone}</p>
                <div className="role-grid__folders">
                  <div className="role-grid__folder">
                    <span className="role-grid__folder-tab" aria-hidden="true" />
                    <p className="role-grid__folder-title">
                      <FolderIcon />
                      {t.roleGrid.development}
                    </p>
                    <div className="role-grid__chips">
                      {content.strategy.map((item) => (
                        <span key={item} className="role-grid__chip">
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )
          )}

          {content.resultPeriods && content.resultPeriods.length > 0 && (
            <div className="case-modal__section">
              <PerformanceVisual periods={content.resultPeriods} conclusion={content.resultsConclusion} />
            </div>
          )}

          {content.challenge && (
            <div className="case-modal__section">
              <h4>{t.caseModal.challenge}</h4>
              <p className="case-modal__challenge">{content.challenge}</p>
            </div>
          )}

          {content.learnings && (
            <div className="case-modal__section">
              <h4>{t.caseModal.learnings}</h4>
              <p className="case-modal__learnings">{content.learnings}</p>
            </div>
          )}

          {(content.authorsNote || content.disclaimer) && (
            <div className="case-modal__footnotes">
              {content.authorsNote && <p>{content.authorsNote}</p>}
              {content.disclaimer && <p>{content.disclaimer}</p>}
            </div>
          )}
        </div>
        </div>
      </div>

      {lightboxIndex !== null &&
        content.gallery[lightboxIndex] &&
        createPortal(
          <div
            className="case-lightbox"
            role="dialog"
            aria-modal="true"
            aria-label={content.gallery[lightboxIndex].alt}
            onMouseDown={(e) => e.target === e.currentTarget && setLightboxIndex(null)}
          >
            <button
              type="button"
              className="case-lightbox__close"
              onClick={() => setLightboxIndex(null)}
              ref={lightboxCloseRef}
            >
              <span className="visually-hidden">{t.caseModal.closeLightbox}</span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M5 5l14 14M19 5 5 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>

            {content.gallery.length > 1 && (
              <>
                <button
                  type="button"
                  className="case-lightbox__arrow case-lightbox__arrow--prev"
                  onClick={() =>
                    setLightboxIndex((i) => (i === null ? i : (i - 1 + content.gallery.length) % content.gallery.length))
                  }
                >
                  <span className="visually-hidden">{t.caseModal.prevImage}</span>
                  <span aria-hidden="true">←</span>
                </button>
                <button
                  type="button"
                  className="case-lightbox__arrow case-lightbox__arrow--next"
                  onClick={() => setLightboxIndex((i) => (i === null ? i : (i + 1) % content.gallery.length))}
                >
                  <span className="visually-hidden">{t.caseModal.nextImage}</span>
                  <span aria-hidden="true">→</span>
                </button>
              </>
            )}

            <figure className="case-lightbox__figure">
              <img src={assetUrl(content.gallery[lightboxIndex].src)} alt={content.gallery[lightboxIndex].alt} />
              <figcaption>{content.gallery[lightboxIndex].alt}</figcaption>
            </figure>
          </div>,
          document.body
        )}
    </div>
  );
}
