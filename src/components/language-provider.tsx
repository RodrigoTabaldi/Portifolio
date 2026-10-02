"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Language = "pt" | "en";

const LanguageContext = createContext<{
  language: Language;
  setLanguage: (language: Language) => void;
} | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("pt");

  useEffect(() => {
    document.documentElement.lang = language === "pt" ? "pt-BR" : "en";
    document.title = language === "pt"
      ? "Rodrigo Tabaldi — Engenheiro de Software"
      : "Rodrigo Tabaldi — Software Engineer";
    const description = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    if (description) {
      description.content = language === "pt"
        ? "Portfólio de Rodrigo Tabaldi, engenheiro de software com foco em Backend, APIs e Full Stack."
        : "Portfolio of Rodrigo Tabaldi, a software engineer focused on backend, APIs, and full stack development.";
    }
  }, [language]);

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used within LanguageProvider");
  return context;
}
