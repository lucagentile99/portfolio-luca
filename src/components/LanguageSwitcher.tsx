import { useLang, useT } from "../i18n/LanguageContext";
import "./LanguageSwitcher.css";

interface LanguageSwitcherProps {
  className?: string;
  /** Se ejecuta después de cambiar de idioma (ej. cerrar el menú mobile). */
  onAfterChange?: () => void;
}

export default function LanguageSwitcher({ className = "", onAfterChange }: LanguageSwitcherProps) {
  const { lang, setLang } = useLang();
  const t = useT();

  const selectLang = (next: "es" | "en") => {
    setLang(next);
    onAfterChange?.();
  };

  return (
    <div className={`lang-switch ${className}`} role="group" aria-label={t.langSwitcher.label}>
      <button
        type="button"
        className={`lang-switch__option ${lang === "es" ? "is-active" : ""}`}
        aria-pressed={lang === "es"}
        aria-label={t.langSwitcher.ariaEs}
        onClick={() => selectLang("es")}
      >
        {t.langSwitcher.es}
      </button>
      <button
        type="button"
        className={`lang-switch__option ${lang === "en" ? "is-active" : ""}`}
        aria-pressed={lang === "en"}
        aria-label={t.langSwitcher.ariaEn}
        onClick={() => selectLang("en")}
      >
        {t.langSwitcher.en}
      </button>
    </div>
  );
}
