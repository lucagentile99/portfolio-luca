import { useLang, useT } from "../i18n/LanguageContext";
import "./LanguageSwitcher.css";

interface LanguageSwitcherProps {
  className?: string;
}

export default function LanguageSwitcher({ className = "" }: LanguageSwitcherProps) {
  const { lang, setLang } = useLang();
  const t = useT();

  return (
    <div className={`lang-switch ${className}`} role="group" aria-label={t.langSwitcher.label}>
      <button
        type="button"
        className={`lang-switch__option ${lang === "es" ? "is-active" : ""}`}
        aria-pressed={lang === "es"}
        aria-label={t.langSwitcher.ariaEs}
        onClick={() => setLang("es")}
      >
        {t.langSwitcher.es}
      </button>
      <button
        type="button"
        className={`lang-switch__option ${lang === "en" ? "is-active" : ""}`}
        aria-pressed={lang === "en"}
        aria-label={t.langSwitcher.ariaEn}
        onClick={() => setLang("en")}
      >
        {t.langSwitcher.en}
      </button>
    </div>
  );
}
