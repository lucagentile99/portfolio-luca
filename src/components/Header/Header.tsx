import { useEffect, useState } from "react";
import { mailtoHref, navLinks, siteConfig } from "../../data/siteConfig";
import { useActiveSection } from "../../hooks/useActiveSection";
import { assetUrl } from "../../utils/assetPath";
import { useT } from "../../i18n/LanguageContext";
import LanguageSwitcher from "../LanguageSwitcher";
import "./Header.css";

const sectionIds = navLinks.map((link) => link.href.replace("#", ""));

const navKeyById: Record<string, keyof ReturnType<typeof useT>["header"]["nav"]> = {
  inicio: "inicio",
  "sobre-mi": "sobreMi",
  experiencia: "experiencia",
  proyectos: "proyectos",
  campanas: "campanas",
  habilidades: "habilidades",
  educacion: "educacion",
  contacto: "contacto",
};

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const activeId = useActiveSection(sectionIds);
  const t = useT();

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsMenuOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className={`header ${isScrolled ? "header--scrolled" : ""}`}>
      <div className="container header__bar">
        <a href="#inicio" className="header__logo" aria-label={t.header.homeAria(siteConfig.name)}>
          {siteConfig.initials}
        </a>

        <nav className="header__nav" aria-label={t.header.navAria}>
          <ul>
            {navLinks.map((link) => {
              const id = link.href.replace("#", "");
              const isActive = id === activeId;
              return (
                <li key={link.href}>
                  <a href={link.href} aria-current={isActive ? "true" : undefined} className={isActive ? "is-active" : ""}>
                    {t.header.nav[navKeyById[id]]}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="header__actions">
          <LanguageSwitcher />
          <a
            href={siteConfig.linkedin}
            target="_blank"
            rel="noreferrer"
            className="header__icon-link"
            aria-label={t.header.linkedinAria}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <rect x="3" y="3" width="18" height="18" rx="3" stroke="currentColor" strokeWidth="1.6" />
              <path d="M8 10.5v6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              <circle cx="8" cy="7.5" r="0.9" fill="currentColor" />
              <path
                d="M11.5 16.5v-3.4c0-1.2.9-2 1.9-2 1 0 1.6.8 1.6 2v3.4"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path d="M11.5 10.5v6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
          </a>
          <a href={assetUrl(siteConfig.cvPath)} className="btn btn-primary btn-sm" download>
            {t.header.downloadCv}
          </a>
        </div>

        <button
          type="button"
          className="header__toggle"
          aria-expanded={isMenuOpen}
          aria-controls="mobile-nav"
          onClick={() => setIsMenuOpen((open) => !open)}
        >
          <span className="visually-hidden">{isMenuOpen ? t.header.closeMenu : t.header.openMenu}</span>
          <span className={`header__burger ${isMenuOpen ? "is-open" : ""}`} aria-hidden="true">
            <span />
            <span />
            <span />
          </span>
        </button>
      </div>

      <div id="mobile-nav" className={`header__mobile ${isMenuOpen ? "is-open" : ""}`}>
        <nav aria-label={t.header.mobileNavAria}>
          <ul>
            {navLinks.map((link) => {
              const id = link.href.replace("#", "");
              const isActive = id === activeId;
              return (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className={isActive ? "is-active" : ""}
                    onClick={closeMenu}
                    aria-current={isActive ? "true" : undefined}
                  >
                    {t.header.nav[navKeyById[id]]}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
        <div className="header__mobile-actions">
          <LanguageSwitcher />
          <a href={assetUrl(siteConfig.cvPath)} className="btn btn-primary" download onClick={closeMenu}>
            {t.header.downloadCv}
          </a>
          <a href={siteConfig.linkedin} target="_blank" rel="noreferrer" className="btn btn-outline" onClick={closeMenu}>
            LinkedIn
          </a>
          <a href={mailtoHref} className="header__mobile-email" onClick={closeMenu}>
            {siteConfig.email}
          </a>
        </div>
      </div>
    </header>
  );
}
