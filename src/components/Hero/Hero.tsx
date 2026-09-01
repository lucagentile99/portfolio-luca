import { siteConfig } from "../../data/siteConfig";
import { siteConfigEn } from "../../data/siteConfig.en";
import { heroContent as heroContentEs } from "../../data/hero";
import { heroContent as heroContentEn } from "../../data/hero.en";
import { assetUrl } from "../../utils/assetPath";
import { useLocalized, useT } from "../../i18n/LanguageContext";
import Reveal from "../Reveal";
import "./Hero.css";

export default function Hero() {
  const t = useT();
  const heroContent = useLocalized(heroContentEs, heroContentEn);
  const headline = useLocalized(siteConfig.headline, siteConfigEn.headline);
  const location = useLocalized(siteConfig.location, siteConfigEn.location);
  const availability = useLocalized(siteConfig.availability, siteConfigEn.availability);

  // Resalta la última palabra del título con el color de acento, sin
  // modificar el contenido real (heroContent.title queda intacto).
  const titleParts = heroContent.title.trim().split(" ");
  const titleAccent = titleParts.pop();
  const titleLead = titleParts.join(" ");

  return (
    <section id="inicio" className="hero">
      <div className="container hero__grid">
        <div className="hero__content">
          <Reveal as="p" className="eyebrow-editorial">
            {heroContent.kicker}
          </Reveal>

          <Reveal as="p" className="eyebrow" delay={40}>
            {headline}
          </Reveal>

          <Reveal as="h1" className="hero__title reveal--mask" delay={80}>
            {titleLead} <span className="hero__title-accent">{titleAccent}</span>
          </Reveal>

          <Reveal as="p" className="hero__text" delay={160}>
            {heroContent.description}
          </Reveal>

          <Reveal className="hero__actions" delay={240}>
            <a href="#proyectos" className="btn btn-primary">
              {t.hero.ctaProjects}
            </a>
            <a href={assetUrl(siteConfig.cvPath)} className="btn btn-outline" download>
              {t.hero.ctaCv}
            </a>
          </Reveal>

          <Reveal className="hero__meta" delay={300}>
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
          </Reveal>
        </div>

        <Reveal className="hero__visual reveal--photo" delay={160}>
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
              <li key={tag} className="folder-tag">
                {tag}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
