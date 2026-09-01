import { useState } from "react";
import { mailtoHref, siteConfig } from "../../data/siteConfig";
import { assetUrl } from "../../utils/assetPath";
import { useT } from "../../i18n/LanguageContext";
import Reveal from "../Reveal";
import "./Contact.css";

export default function Contact() {
  const t = useT();
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(siteConfig.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard API no disponible (permisos o contexto no seguro) — el link mailto sigue funcionando.
    }
  };

  return (
    <section id="contacto" className="section section--dark contact">
      <div className="container contact__grid">
        <Reveal as="div" className="contact__intro">
          <p className="eyebrow">{t.contact.eyebrow}</p>
          <h2 className="section-title contact__title reveal--mask">
            {t.contact.titleLead} <em className="contact__title-accent">{t.contact.titleAccent}</em>
            {t.contact.titleEnd}
          </h2>
          <p className="contact__text">{t.contact.availabilityText}</p>
        </Reveal>

        <Reveal as="div" className="contact__cta-panel card" delay={120}>
          <span className="contact__folder" aria-hidden="true">
            <span className="contact__folder-tab" />
          </span>

          <a href={mailtoHref} className="btn btn-primary contact__cta-email" aria-label={t.contact.emailCtaAria}>
            {t.contact.emailCta}
          </a>
          <div className="contact__cta-secondary">
            <a href={siteConfig.linkedin} target="_blank" rel="noreferrer" className="btn btn-outline">
              {t.contact.linkedin}
            </a>
            <a href={assetUrl(siteConfig.cvPath)} className="btn btn-outline" download>
              {t.contact.downloadCv}
            </a>
          </div>
          <button type="button" className="contact__copy-email" onClick={copyEmail}>
            {copied ? t.contact.emailCopied : t.contact.copyEmail(siteConfig.email)}
          </button>
        </Reveal>
      </div>
    </section>
  );
}
