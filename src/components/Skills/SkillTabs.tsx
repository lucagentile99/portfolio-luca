import { type KeyboardEvent, type ReactNode, type RefObject } from "react";
import type { SkillIcon, SkillModule } from "../../types";
import { useT } from "../../i18n/LanguageContext";
import Collapse from "../Collapse";
import Reveal from "../Reveal";
import "./SkillTabs.css";

interface SkillTabProps {
  module: SkillModule;
  isActive: boolean;
  tabId: string;
  panelId: string;
  icon: ReactNode;
  onSelect: () => void;
  onKeyDown: (event: KeyboardEvent<HTMLButtonElement>) => void;
  tabRef: (el: HTMLButtonElement | null) => void;
}

export function SkillTab({ module, isActive, tabId, panelId, icon, onSelect, onKeyDown, tabRef }: SkillTabProps) {
  return (
    <button
      ref={tabRef}
      type="button"
      role="tab"
      id={tabId}
      aria-selected={isActive}
      aria-controls={panelId}
      tabIndex={isActive ? 0 : -1}
      className={`skill-tab ${isActive ? "is-active" : ""}`}
      onClick={onSelect}
      onKeyDown={onKeyDown}
    >
      <span className="skill-tab__icon">{icon}</span>
      <span className="skill-tab__number">{module.number}</span>
      <span className="skill-tab__text">
        <span className="skill-tab__title">{module.title}</span>
        <span className="skill-tab__tagline">{module.tagline}</span>
      </span>
    </button>
  );
}

interface SkillTabsProps {
  modules: SkillModule[];
  activeId: string | null;
  baseId: string;
  onChange: (id: string) => void;
  renderIcon: (icon: SkillIcon) => ReactNode;
  tabRefs: RefObject<(HTMLButtonElement | null)[]>;
}

export function SkillTabs({ modules, activeId, baseId, onChange, renderIcon, tabRefs }: SkillTabsProps) {
  const t = useT();
  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    let nextIndex: number | null = null;
    if (event.key === "ArrowRight") nextIndex = (index + 1) % modules.length;
    else if (event.key === "ArrowLeft") nextIndex = (index - 1 + modules.length) % modules.length;
    else if (event.key === "Home") nextIndex = 0;
    else if (event.key === "End") nextIndex = modules.length - 1;

    if (nextIndex !== null) {
      event.preventDefault();
      onChange(modules[nextIndex].id);
      tabRefs.current[nextIndex]?.focus();
    }
  };

  return (
    <Reveal className="skill-tabs" variant="card" stagger role="tablist" aria-label={t.skills.workAreasAria}>
      {modules.map((module, index) => (
        <SkillTab
          key={module.id}
          module={module}
          isActive={module.id === activeId}
          tabId={`${baseId}-tab-${module.id}`}
          panelId={`${baseId}-panel-${module.id}`}
          icon={renderIcon(module.icon)}
          onSelect={() => onChange(module.id)}
          onKeyDown={(event) => handleKeyDown(event, index)}
          tabRef={(el) => {
            tabRefs.current[index] = el;
          }}
        />
      ))}
    </Reveal>
  );
}

interface SkillPanelProps {
  module: SkillModule;
  tabId: string;
  panelId: string;
}

export function SkillPanel({ module, tabId, panelId }: SkillPanelProps) {
  return (
    <div role="tabpanel" id={panelId} aria-labelledby={tabId} className="skill-panel" tabIndex={0}>
      <p className="skill-panel__title">{module.panelTitle}</p>
      <ul className="skill-panel__details">
        {module.details.map((detail) => (
          <li key={detail}>{detail}</li>
        ))}
      </ul>
    </div>
  );
}

interface SkillAccordionProps {
  modules: SkillModule[];
  activeId: string | null;
  baseId: string;
  onChange: (id: string | null) => void;
  renderIcon: (icon: SkillIcon) => ReactNode;
}

// Versión mobile de SkillTabs+SkillPanel: en vez de pestañas + un panel
// compartido al final, cada módulo es un acordeón real — su detalle se
// despliega inmediatamente debajo de esa misma tarjeta (nunca después de
// las 4). Solo uno abierto a la vez; tocar el que ya está abierto lo cierra.
export function SkillAccordion({ modules, activeId, baseId, onChange, renderIcon }: SkillAccordionProps) {
  return (
    <Reveal className="skill-accordion" variant="card" stagger>
      {modules.map((module) => {
        const isOpen = module.id === activeId;
        const triggerId = `${baseId}-accordion-trigger-${module.id}`;
        const panelId = `${baseId}-accordion-panel-${module.id}`;

        return (
          <div key={module.id} className={`skill-accordion__item ${isOpen ? "is-open" : ""}`}>
            <button
              type="button"
              id={triggerId}
              className="skill-accordion__trigger"
              aria-expanded={isOpen}
              aria-controls={panelId}
              onClick={() => onChange(isOpen ? null : module.id)}
            >
              <span className="skill-accordion__icon">{renderIcon(module.icon)}</span>
              <span className="skill-accordion__number">{module.number}</span>
              <span className="skill-accordion__text">
                <span className="skill-accordion__title">{module.title}</span>
                <span className="skill-accordion__tagline">{module.tagline}</span>
              </span>
              <span className="skill-accordion__toggle" aria-hidden="true">
                {isOpen ? "−" : "+"}
              </span>
            </button>

            <Collapse open={isOpen} id={panelId} role="region" aria-labelledby={triggerId}>
              <div className="skill-accordion__panel">
                <p className="skill-panel__title">{module.panelTitle}</p>
                <ul className="skill-panel__details">
                  {module.details.map((detail) => (
                    <li key={detail}>{detail}</li>
                  ))}
                </ul>
              </div>
            </Collapse>
          </div>
        );
      })}
    </Reveal>
  );
}
