import { siteConfig } from "../../data/siteConfig";
import { siteConfigEn } from "../../data/siteConfig.en";
import { heroContent as heroContentEs } from "../../data/hero";
import { heroContent as heroContentEn } from "../../data/hero.en";
import { assetUrl } from "../../utils/assetPath";
import { useLocalized, useT } from "../../i18n/LanguageContext";
import { createAnimatable, createTimeline, stagger } from "animejs";
import { useMotionScope } from "../../hooks/useMotionScope";
import { MOTION, duration } from "../../utils/motion";
import "./Hero.css";

/** Desplazamiento máximo de la carpeta siguiendo al cursor (px). */
const CURSOR_RANGE = 8;

/** Entrada de cada tipo de bloque del Hero (data-hero-step). */
const HERO_STEPS: Record<string, Record<string, [number, number]>> = {
  label: { opacity: [0, 1], y: [18, 0] },
  title: { opacity: [0, 1], y: [28, 0] },
  text: { opacity: [0, 1], y: [22, 0] },
  actions: { opacity: [0, 1], y: [18, 0], scale: [0.96, 1] },
};
/** Separación entre bloques de la timeline (ms). */
const HERO_STEP_GAP = 100;

export default function Hero() {
  const t = useT();
  const heroContent = useLocalized(heroContentEs, heroContentEn);
  const headline = useLocalized(siteConfig.headline, siteConfigEn.headline);
  const location = useLocalized(siteConfig.location, siteConfigEn.location);
  const availability = useLocalized(siteConfig.availability, siteConfigEn.availability);
  const cvPath = useLocalized(siteConfig.cvPath, siteConfigEn.cvPath);

  const sectionRef = useMotionScope<HTMLElement>((section, scope) => {
    const steps = Array.from(section.querySelectorAll<HTMLElement>("[data-hero-step]"));
    const visual = section.querySelector<HTMLElement>(".hero__visual");
    const tags = Array.from(section.querySelectorAll<HTMLElement>(".hero__tags li"));
    const intro = Array.from(section.querySelectorAll<HTMLElement>("[data-motion=\"intro\"]"));
    const done = () =>
      intro.forEach((el) => {
        el.style.removeProperty("opacity");
        el.style.removeProperty("transform");
        el.dataset.revealed = "true";
      });

    // Entrada: una sola vez por carga. Con reduced motion, estado final directo.
    if (scope.matches.reduceMotion || section.dataset.introPlayed) {
      done();
    } else {
      const ms = duration(MOTION.base);
      // introPlayed se marca al empezar (no al crear): en StrictMode el primer
      // montaje se revierte antes de arrancar y la entrada igual se ve.
      const timeline = createTimeline({
        defaults: { duration: ms, ease: MOTION.ease },
        onBegin: () => (section.dataset.introPlayed = "true"),
        onComplete: done,
      });
      steps.forEach((el, i) => {
        timeline.add(el, HERO_STEPS[el.dataset.heroStep ?? "text"] ?? HERO_STEPS.text, i * HERO_STEP_GAP);
      });
      // Carpeta/foto: entra junto con los botones, desde la derecha y algo más chica.
      const visualAt = 4 * HERO_STEP_GAP;
      if (visual) {
        timeline.add(visual, { opacity: [0, 1], x: [24, 0], scale: [0.94, 1], duration: duration(MOTION.base + 150) }, visualAt);
      }
      if (tags.length) {
        timeline.add(tags, { opacity: [0, 1], y: [MOTION.distanceSmall, 0], scale: [MOTION.scaleFrom, 1] }, stagger(MOTION.stagger, { start: visualAt + 300 }));
      }
    }

    // Desktop con mouse: la carpeta acompaña al cursor (máx. 8px).
    // En táctiles o con reduced motion no se registra nada.
    const folder = section.querySelector<HTMLElement>(".hero__folder");
    if (!folder || !visual || !scope.matches.finePointer || scope.matches.reduceMotion) return;

    const follow = createAnimatable(folder, { x: MOTION.base, y: MOTION.base, ease: MOTION.ease });
    const onMove = (event: PointerEvent) => {
      const rect = visual.getBoundingClientRect();
      const nx = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
      const ny = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
      follow.x(Math.max(-1, Math.min(1, nx)) * CURSOR_RANGE);
      follow.y(Math.max(-1, Math.min(1, ny)) * CURSOR_RANGE);
    };
    const onLeave = () => {
      follow.x(0);
      follow.y(0);
    };
    visual.addEventListener("pointermove", onMove);
    visual.addEventListener("pointerleave", onLeave);
    return () => {
      visual.removeEventListener("pointermove", onMove);
      visual.removeEventListener("pointerleave", onLeave);
    };
  });

  // Resalta la última palabra del título con el color de acento, sin
  // modificar el contenido real (heroContent.title queda intacto).
  const titleParts = heroContent.title.trim().split(" ");
  const titleAccent = titleParts.pop();
  const titleLead = titleParts.join(" ");

  return (
    <section id="inicio" className="hero" ref={sectionRef}>
      <div className="container hero__grid">
        <div className="hero__content">
          <p className="eyebrow-editorial" data-motion="intro" data-hero-step="label">
            {heroContent.kicker}
          </p>

          <p className="eyebrow" data-motion="intro" data-hero-step="label">
            {headline}
          </p>

          <h1 className="hero__title" data-motion="intro" data-hero-step="title">
            {titleLead} <span className="hero__title-accent">{titleAccent}</span>
          </h1>

          <p className="hero__text" data-motion="intro" data-hero-step="text">
            {heroContent.description}
          </p>

          <div className="hero__actions" data-motion="intro" data-hero-step="actions">
            <a href="#proyectos" className="btn btn-primary">
              {t.hero.ctaProjects}
            </a>
            <a href={assetUrl(cvPath)} className="btn btn-outline" download target="_blank" rel="noreferrer">
              {t.hero.ctaCv}
            </a>
          </div>

          <div className="hero__meta" data-motion="intro" data-hero-step="text">
            <span className="hero__meta-item">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d="M12 22s7-6.4 7-12a7 7 0 1 0-14 0c0 5.6 7 12 7 12Z"
                  stroke="currentColor"
                  strokeWidth="1.6"
                />
                <circle cx="12" cy="10" r="2.5" stroke="currentColor" strokeWidth="1.6" />
              </svg>
              {location}
            </span>
            <span className="hero__meta-item">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" />
                <path d="M12 7v5l3 2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              </svg>
              {availability}
            </span>
          </div>
        </div>

        <div className="hero__visual" data-motion="intro">
          <div className="hero__folder">
            <span className="hero__folder-word" aria-hidden="true">
              {heroContent.word}
            </span>
            <span className="hero__folder-year" aria-hidden="true">
              {heroContent.year}
            </span>

            <div className="hero__file">
              {siteConfig.photoPath ? (
                <img
                  src={assetUrl(siteConfig.photoPath)}
                  alt={t.hero.photoAlt(siteConfig.name)}
                  className="hero__photo"
                />
              ) : (
                <div className="hero__monogram" role="img" aria-label={t.hero.monogramAria(siteConfig.name)}>
                  {siteConfig.initials}
                </div>
              )}
            </div>

            <svg className="hero__cursor" width="34" height="34" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M5 3.5 18.5 12l-5.6 1.3L15 19l-2.6 1.1-2.1-5.6L5 18.5V3.5Z"
                fill="var(--color-brown-black)"
                stroke="var(--color-bg)"
                strokeWidth="1"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          <ul className="hero__tags" aria-hidden="true">
            {heroContent.folderTags.map((tag) => (
              <li key={tag} className="folder-tag" data-motion="intro">
                {tag}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
