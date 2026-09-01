import { mailtoHref, siteConfig } from "../../data/siteConfig";
import { useT } from "../../i18n/LanguageContext";
import "./Footer.css";

export default function Footer() {
  const t = useT();
  return (
    <footer className="footer">
      <div className="container footer__grid">
        <div>
          <p className="footer__title">{t.footer.credit}</p>
          <p className="footer__year">© {new Date().getFullYear()} {siteConfig.name}</p>
        </div>

        <div className="footer__links">
          <a href="#educacion">{t.footer.education}</a>
          <a href={mailtoHref}>{siteConfig.email}</a>
          <a href={siteConfig.linkedin} target="_blank" rel="noreferrer">
            {t.footer.linkedin}
          </a>
          <a href="#inicio" className="footer__top">
            {t.footer.backToTop}
          </a>
        </div>
      </div>
    </footer>
  );
}
