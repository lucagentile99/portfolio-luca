import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { metaContent, strings } from "./strings";

export type Lang = "es" | "en";

const STORAGE_KEY = "pf-lang";

function isLang(value: string | null): value is Lang {
  return value === "es" || value === "en";
}

function readInitialLang(): Lang {
  if (typeof window === "undefined") return "es";
  const fromUrl = new URLSearchParams(window.location.search).get("lang");
  if (isLang(fromUrl)) return fromUrl;
  const fromStorage = window.localStorage.getItem(STORAGE_KEY);
  if (isLang(fromStorage)) return fromStorage;
  return "es";
}

interface LanguageContextValue {
  lang: Lang;
  setLang: (lang: Lang) => void;
  toggleLang: () => void;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

function applyDocumentMeta(lang: Lang) {
  document.documentElement.lang = lang === "en" ? "en" : "es-AR";
  document.title = metaContent[lang].title;
  const descriptionTag = document.querySelector('meta[name="description"]');
  if (descriptionTag) descriptionTag.setAttribute("content", metaContent[lang].description);
  const ogTitle = document.querySelector('meta[property="og:title"]');
  if (ogTitle) ogTitle.setAttribute("content", metaContent[lang].title);
  const ogDescription = document.querySelector('meta[property="og:description"]');
  if (ogDescription) ogDescription.setAttribute("content", metaContent[lang].description);
  const twitterTitle = document.querySelector('meta[name="twitter:title"]');
  if (twitterTitle) twitterTitle.setAttribute("content", metaContent[lang].title);
  const twitterDescription = document.querySelector('meta[name="twitter:description"]');
  if (twitterDescription) twitterDescription.setAttribute("content", metaContent[lang].description);
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => readInitialLang());

  useEffect(() => {
    applyDocumentMeta(lang);
    window.localStorage.setItem(STORAGE_KEY, lang);
    const url = new URL(window.location.href);
    url.searchParams.set("lang", lang);
    window.history.replaceState(window.history.state, "", url);
  }, [lang]);

  const value = useMemo<LanguageContextValue>(
    () => ({
      lang,
      setLang: setLangState,
      toggleLang: () => setLangState((current) => (current === "es" ? "en" : "es")),
    }),
    [lang]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLang() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLang debe usarse dentro de LanguageProvider");
  return ctx;
}

/** Devuelve el diccionario de textos de interfaz para el idioma activo. */
export function useT() {
  const { lang } = useLang();
  return strings[lang];
}

/** Elige entre un valor en español y uno en inglés según el idioma activo. */
export function useLocalized<T>(es: T, en: T): T {
  const { lang } = useLang();
  return lang === "en" ? en : es;
}
