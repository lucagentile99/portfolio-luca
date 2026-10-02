import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { animate, onScroll, utils } from "animejs";
import { mailtoHref, navLinks, siteConfig } from "../../data/siteConfig";
import { siteConfigEn } from "../../data/siteConfig.en";
import { useActiveSection } from "../../hooks/useActiveSection";
import { assetUrl } from "../../utils/assetPath";
import { useLang, useLocalized, useT } from "../../i18n/LanguageContext";
import { useMotionScope } from "../../hooks/useMotionScope";
import { MOTION, duration, prefersReducedMotion } from "../../utils/motion";
import { lockScroll, unlockScroll } from "../../utils/scrollLock";
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
  // El menú queda montado mientras corre su animación de cierre.
  const [isMenuMounted, setIsMenuMounted] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const toggleRef = useRef<HTMLButtonElement | null>(null);
  const navListRef = useRef<HTMLUListElement | null>(null);
  const indicatorRef = useRef<HTMLSpanElement | null>(null);
  const activeId = useActiveSection(sectionIds);
  const t = useT();
  const { lang } = useLang();
  const cvPath = useLocalized(siteConfig.cvPath, siteConfigEn.cvPath);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Entrada del header (opacidad + 8px) y barra de progreso de lectura,
  // cuya escala sigue el scroll de todo el <main> (onScroll en modo sync).
  // Con reduced motion no hay ninguna de las dos (la barra se oculta en CSS).
  const headerRef = useMotionScope<HTMLElement>((header, scope) => {
    const bar = header.querySelector<HTMLElement>(".header__progress");
    const main = document.getElementById("main-content");
    let observer: ReturnType<typeof onScroll> | undefined;
    if (bar && main && !scope.matches.reduceMotion) {
      observer = onScroll({ target: main, enter: "top top", leave: "bottom bottom", sync: true });
      animate(bar, { scaleX: [0, 1], ease: "linear", autoplay: observer });
    }

    if (!scope.matches.reduceMotion && !header.dataset.introPlayed) {
      animate(header, {
        opacity: [0, 1],
        y: [-MOTION.distanceSmall, 0],
        duration: duration(MOTION.base),
        ease: MOTION.ease,
        onBegin: () => (header.dataset.introPlayed = "true"),
        // Sin estilos residuales en el header sticky.
        onComplete: () => {
          header.style.removeProperty("transform");
          header.style.removeProperty("opacity");
        },
      });
    }

    return () => observer?.revert();
  });

  // Indicador del enlace activo (desktop): una sola línea que se desliza
  // hasta el link activo. Se recalcula al cambiar de sección, de idioma
  // (cambian los anchos) o de tamaño de ventana.
  useLayoutEffect(() => {
    const list = navListRef.current;
    const indicator = indicatorRef.current;
    if (!list || !indicator) return;

    const place = (instant: boolean) => {
      const link = list.querySelector<HTMLElement>("a.is-active");
      if (!link || link.offsetWidth === 0) {
        utils.set(indicator, { opacity: 0 });
        return;
      }
      const target = { x: link.offsetLeft, scaleX: link.offsetWidth / 100, opacity: 1 };
      if (instant || prefersReducedMotion() || indicator.style.opacity !== "1") {
        utils.set(indicator, target);
      } else {
        animate(indicator, { ...target, duration: MOTION.fast + 60, ease: MOTION.ease });
      }
    };

    place(false);
    const onResize = () => place(true);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [activeId, lang]);

  // Menú mobile: se monta, anima la entrada (opacidad + 8px) y al cerrar
  // anima la salida antes de desmontarse. Bloquea solo el scroll de fondo.
  useEffect(() => {
    if (isMenuOpen) setIsMenuMounted(true);
  }, [isMenuOpen]);

  useLayoutEffect(() => {
    const menu = menuRef.current;
    if (!isMenuMounted || !menu) return;
    const ms = duration(MOTION.fast);

    if (isMenuOpen) {
      menu.querySelector<HTMLElement>(".header__mobile-close")?.focus();
      if (prefersReducedMotion()) return;
      const content = menu.querySelectorAll<HTMLElement>(".header__mobile-nav, .header__mobile-actions");
      const animations = [
        animate(menu, { opacity: [0, 1], duration: ms, ease: MOTION.ease }),
        animate(content, { opacity: [0, 1], y: [MOTION.distanceSmall, 0], duration: ms + 80, ease: MOTION.ease, delay: utils.stagger(40) }),
      ];
      return () => animations.forEach((animation) => animation.cancel());
    }

    if (prefersReducedMotion()) {
      setIsMenuMounted(false);
      return;
    }
    const closing = animate(menu, {
      opacity: 0,
      y: -MOTION.distanceSmall,
      duration: ms,
      ease: MOTION.ease,
      onComplete: () => setIsMenuMounted(false),
    });
    return () => {
      closing.cancel();
    };
  }, [isMenuOpen, isMenuMounted]);

  useEffect(() => {
    if (!isMenuOpen) return;
    lockScroll();
    return () => unlockScroll();
  }, [isMenuOpen]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsMenuOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const closeMenu = () => {
    setIsMenuOpen(false);
    toggleRef.current?.focus({ preventScroll: true });
  };

  return (
    <header ref={headerRef} className={`header ${isScrolled ? "header--scrolled" : ""}`}>
      <div className="container header__bar">
        <a href="#inicio" className="header__logo" aria-label={t.header.homeAria(siteConfig.name)}>
          {siteConfig.initials}
        </a>

        <nav className="header__nav" aria-label={t.header.navAria}>
          <ul ref={navListRef}>
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
            <span ref={indicatorRef} className="header__nav-indicator" aria-hidden="true" />
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
          <a href={assetUrl(cvPath)} className="btn btn-primary btn-sm" download target="_blank" rel="noreferrer">
            {t.header.downloadCv}
          </a>
        </div>

        <button
          ref={toggleRef}
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

      {isMenuMounted &&
        createPortal(
      <div
        ref={menuRef}
        id="mobile-nav"
        className="header__mobile"
        role="dialog"
        aria-modal="true"
        aria-label={t.header.mobileNavAria}
      >
        <div className="header__mobile-top">
          <a href="#inicio" className="header__logo" aria-label={t.header.homeAria(siteConfig.name)} onClick={closeMenu}>
            {siteConfig.initials}
          </a>
          <button type="button" className="header__mobile-close" onClick={closeMenu}>
            <span className="visually-hidden">{t.header.closeMenu}</span>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M5 5l14 14M19 5 5 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        <nav className="header__mobile-nav" aria-label={t.header.mobileNavAria}>
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
          <LanguageSwitcher className="header__mobile-lang" onAfterChange={closeMenu} />
          <a href={assetUrl(cvPath)} className="btn btn-primary" download target="_blank" rel="noreferrer" onClick={closeMenu}>
            {t.header.downloadCv}
          </a>
          <a href={siteConfig.linkedin} target="_blank" rel="noreferrer" className="btn btn-outline" onClick={closeMenu}>
            LinkedIn
          </a>
          <a href={mailtoHref} className="header__mobile-email" onClick={closeMenu}>
            {siteConfig.email}
          </a>
        </div>
      </div>,
          document.body
        )}
      <span className="header__progress" aria-hidden="true" />
    </header>
  );
}
