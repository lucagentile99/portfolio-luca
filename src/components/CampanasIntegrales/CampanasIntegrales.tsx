import { useState } from "react";
import { academicCampaigns as academicCampaignsEs, academicIntro as academicIntroEs } from "../../data/academic";
import { academicCampaigns as academicCampaignsEn, academicIntro as academicIntroEn } from "../../data/academic.en";
import { academicCampaignToModalContent } from "../../utils/caseModal";
import { assetUrl } from "../../utils/assetPath";
import { useLocalized, useT } from "../../i18n/LanguageContext";
import Reveal from "../Reveal";
import CaseModal from "../Projects/CaseModal";
import "./CampanasIntegrales.css";

function triggerId(id: string) {
  return `academic-trigger-${id}`;
}

export default function CampanasIntegrales() {
  const t = useT();
  const academicCampaigns = useLocalized(academicCampaignsEs, academicCampaignsEn);
  const academicIntro = useLocalized(academicIntroEs, academicIntroEn);
  const [openId, setOpenId] = useState<string | null>(null);
  const openIndex = academicCampaigns.findIndex((c) => c.id === openId);
  const openCampaign = openIndex >= 0 ? academicCampaigns[openIndex] : null;

  const closeModal = () => {
    const id = openId;
    setOpenId(null);
    if (id) {
      document.getElementById(triggerId(id))?.focus();
    }
  };

  const goPrev = openIndex > 0 ? () => setOpenId(academicCampaigns[openIndex - 1].id) : undefined;
  const goNext =
    openIndex >= 0 && openIndex < academicCampaigns.length - 1
      ? () => setOpenId(academicCampaigns[openIndex + 1].id)
      : undefined;

  return (
    <section id="campanas" className="section section--dark campanas">
      <div className="container">
        <Reveal as="div" className="section-head reveal--mask">
          <p className="eyebrow-editorial">{academicIntro.eyebrow}</p>
          <h2 className="section-title">{t.academic.title}</h2>
          <p className="section-subtitle campanas__phrase">{academicIntro.phrase}</p>
        </Reveal>

        <div className="campanas__grid">
          {academicCampaigns.map((campaign, index) => (
            <Reveal as="article" key={campaign.id} className="case-card case-card--dark card" delay={index * 60}>
              {campaign.gallery[0] && (
                <div className={`case-card__image ${index % 2 === 1 ? "case-card__image--celeste" : ""}`}>
                  <img src={assetUrl(campaign.gallery[0].src)} alt={campaign.gallery[0].alt} loading="lazy" />
                  <span className="case-card__tab" aria-hidden="true">
                    PROJECT_{String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="case-card__sticker" aria-hidden="true">
                    *
                  </span>
                </div>
              )}
              <div className="case-card__body">
                <div className="case-card__meta">
                  <span className="case-card__rubro">
                    {String(index + 1).padStart(2, "0")} · {campaign.industry.toUpperCase()}
                  </span>
                  <span className="badge-academic">{t.academic.badge}</span>
                </div>
                <h3 className="case-card__title">
                  <button
                    type="button"
                    id={triggerId(campaign.id)}
                    className="case-card__title-btn"
                    onClick={() => setOpenId(campaign.id)}
                  >
                    {campaign.name}
                  </button>
                </h3>
                <p className="case-card__description">{campaign.cardDescription}</p>
                <div className="case-card__tags">
                  {campaign.cardTags.slice(0, 2).map((tag) => (
                    <span key={tag} className="tag">
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="case-card__footer">
                  <span className="btn btn-outline btn-sm case-card__cta" aria-hidden="true">
                    {t.projects.openProject}
                  </span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      {openCampaign && (
        <CaseModal
          content={academicCampaignToModalContent(openCampaign, academicIntro.disclaimer)}
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
