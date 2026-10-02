import { useMemo, useRef, useState } from "react";
import type { SkillIcon, ToolGroupId } from "../../types";
import {
  aiTools as aiToolsEs,
  languages as languagesEs,
  languagesIntro as languagesIntroEs,
  skillModules as skillModulesEs,
  skillsIntro as skillsIntroEs,
  toolGroupLabels as toolGroupLabelsEs,
  toolStack as toolStackEs,
  toolStackIntro as toolStackIntroEs,
} from "../../data/skills";
import {
  aiTools as aiToolsEn,
  languages as languagesEn,
  languagesIntro as languagesIntroEn,
  skillModules as skillModulesEn,
  skillsIntro as skillsIntroEn,
  toolGroupLabels as toolGroupLabelsEn,
  toolStack as toolStackEn,
  toolStackIntro as toolStackIntroEn,
} from "../../data/skills.en";
import { assetUrl } from "../../utils/assetPath";
import { useLocalized, useT } from "../../i18n/LanguageContext";
import IconTooltip from "../IconTooltip";
import Reveal from "../Reveal";
import { SkillAccordion, SkillPanel, SkillTabs } from "./SkillTabs";
import "./Skills.css";

const aiShortNames: Record<string, string> = {
  "chatgpt-codex": "ChatGPT",
  "claude-code": "Claude",
  gemini: "Gemini",
};

// Grilla simétrica 2×2 — un módulo por área (Paid Media / Organización /
// Creatividad / IA), cada uno con exactamente 3 herramientas en una sola
// fila. La IA es un módulo más, del mismo tamaño que el resto (antes era
// una franja aparte, y antes de eso se repetía también en la fila de
// herramientas). El "usageTag" de cada IA (ej. "Research + web") ya no se
// muestra siempre visible: vive solo dentro del tooltip, para no romper la
// simetría de alto entre los 4 módulos.
const toolGroupOrder: ToolGroupId[] = ["paid-media", "organizacion", "creatividad"];

function SkillIconGraphic({ icon }: { icon: SkillIcon }) {
  switch (icon) {
    case "compass":
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" />
          <path d="M15 9l-2 6-4 2 2-6 4-2z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
        </svg>
      );
    case "trending":
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M4 17l5-6 4 3 6-8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M15 6h4v4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "pencil":
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M4 20l1-4.5L15.5 5 19 8.5 8.5 19 4 20Z"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
          <path d="M13.5 6.9 17 10.4" stroke="currentColor" strokeWidth="1.6" />
        </svg>
      );
    case "folders":
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M3 8.5A1.5 1.5 0 0 1 4.5 7H9l1.5 2H15a1.5 1.5 0 0 1 1.5 1.5V16A1.5 1.5 0 0 1 15 17.5H4.5A1.5 1.5 0 0 1 3 16V8.5Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          <path
            d="M8 6.5A1.5 1.5 0 0 1 9.5 5H14l1.5 2H19a1.5 1.5 0 0 1 1.5 1.5V13"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinejoin="round"
            opacity="0.55"
          />
        </svg>
      );
    default:
      return null;
  }
}

export default function Skills() {
  const t = useT();
  const skillsIntro = useLocalized(skillsIntroEs, skillsIntroEn);
  const skillModules = useLocalized(skillModulesEs, skillModulesEn);
  const toolStackIntro = useLocalized(toolStackIntroEs, toolStackIntroEn);
  const toolStack = useLocalized(toolStackEs, toolStackEn);
  const toolGroupLabels = useLocalized(toolGroupLabelsEs, toolGroupLabelsEn);
  const aiTools = useLocalized(aiToolsEs, aiToolsEn);
  const languages = useLocalized(languagesEs, languagesEn);
  const languagesIntro = useLocalized(languagesIntroEs, languagesIntroEn);

  const toolGroups = useMemo(
    () => [
      ...toolGroupOrder.map((id) => ({
        id,
        label: toolGroupLabels[id],
        items: toolStack
          .filter((tool) => tool.group === id)
          .map((tool) => ({ key: tool.name, name: tool.name, logo: tool.logo, description: tool.description })),
      })),
      {
        id: "ia" as const,
        label: t.skills.groupAi,
        items: aiTools.map((tool) => ({
          key: tool.id,
          name: aiShortNames[tool.id] ?? tool.title,
          logo: tool.logos[0].src,
          description: tool.usageTag ? `${tool.usageTag} — ${tool.description}` : tool.description,
        })),
      },
    ],
    [toolGroupLabels, toolStack, aiTools, t]
  );

  const [activeId, setActiveId] = useState<string | null>(skillModulesEs[0].id);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const baseId = "skills";
  const activeModule = skillModules.find((mod) => mod.id === activeId) ?? skillModules[0];

  return (
    <section id="habilidades" className="section section--alt skills">
      <div className="container">
        <Reveal as="div" className="section-head" variant="head">
          <p className="eyebrow-editorial">{skillsIntro.eyebrow}</p>
          <h2 className="section-title">{skillsIntro.title}</h2>
          <p className="section-subtitle">{skillsIntro.subtitle}</p>
        </Reveal>

        <div>
          <SkillTabs
            modules={skillModules}
            activeId={activeId}
            baseId={baseId}
            onChange={setActiveId}
            renderIcon={(icon) => <SkillIconGraphic icon={icon} />}
            tabRefs={tabRefs}
          />
          <SkillPanel
            module={activeModule}
            tabId={`${baseId}-tab-${activeModule.id}`}
            panelId={`${baseId}-panel-${activeModule.id}`}
          />
          <SkillAccordion
            modules={skillModules}
            activeId={activeId}
            baseId={baseId}
            onChange={setActiveId}
            renderIcon={(icon) => <SkillIconGraphic icon={icon} />}
          />
        </div>

        <div className="tool-stack">
          <p className="eyebrow-editorial">{toolStackIntro.title}</p>
          <p className="tool-stack__subtitle">{toolStackIntro.subtitle}</p>

          <Reveal className="tool-stack__grid" variant="card" stagger>
            {toolGroups.map((group) => (
              <div className={`tool-stack__module tool-stack__module--${group.id}`} key={group.id}>
                <p className="tool-stack__module-title">{group.label}</p>
                <div className="tool-stack__module-row">
                  {group.items.map((item) => (
                    <IconTooltip
                      key={item.key}
                      icon={<img src={assetUrl(item.logo)} alt="" />}
                      label={item.name}
                      tooltip={item.description}
                    />
                  ))}
                </div>
              </div>
            ))}
          </Reveal>
        </div>

        <Reveal as="div" className="languages">
          <div className="languages__head">
            <h3>{t.skills.languagesTitle}</h3>
            <p className="languages__intro">{languagesIntro}</p>
          </div>

          <div className="languages__row">
            {languages.map((lang, index) => (
              <Reveal as="article" key={lang.code} className="language-card" variant="card" delay={index * 100}>
                <h4>
                  {lang.code} / {lang.language}
                </h4>
                <p className="language-card__level">{lang.level}</p>
                <div className="language-card__scale" role="img" aria-label={`Nivel: ${lang.level}`}>
                  {Array.from({ length: 6 }, (_, i) => (
                    <span key={i} className={i < lang.scale ? "is-filled" : ""} />
                  ))}
                </div>
                <p className="language-card__description">{lang.description}</p>
              </Reveal>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
