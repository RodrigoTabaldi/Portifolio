"use client";

import { useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { ShinyButton } from "@/components/ui/shiny-button";
import { BorderChromeRing } from "@/components/ui/border-chrome-ring";
import { useLanguage } from "@/components/language-provider";
import { LanguageFlag } from "@/components/language-flag";

export function Navigation() {
  const [open, setOpen] = useState(false);
  const { language, setLanguage } = useLanguage();
  const english = language === "en";

  return (
    <header className="header">
      <div className="container header-inner">
        <a
          className="brand"
          href="#inicio"
          aria-label={english ? "Rodrigo Tabaldi — home" : "Rodrigo Tabaldi — início"}
          onClick={() => setOpen(false)}
        >
          <svg className="monogram" viewBox="0 0 36 40" fill="none" aria-hidden="true">
            <path d="M3 5h30M3 12h21v9H6v13M16 21l10 14M28 5v31M6 26l9 7" stroke="currentColor" strokeWidth="3.5" strokeLinejoin="miter" />
          </svg>
          <span>rodrigo<span className="muted">.</span>tabaldi</span>
        </a>
        <button
          className="menu-toggle icon-button"
          aria-label={open ? (english ? "Close menu" : "Fechar menu") : (english ? "Open menu" : "Abrir menu")}
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-controls="main-navigation"
        >
          {open ? <X /> : <Menu />}
          <BorderChromeRing />
        </button>
        <nav id="main-navigation" className={open ? "navigation open" : "navigation"} aria-label={english ? "Main navigation" : "Navegação principal"}>
          <a href="#projetos" onClick={() => setOpen(false)}>{english ? "Projects" : "Projetos"}</a>
          <a href="#stack" onClick={() => setOpen(false)}>{english ? "Tech stack" : "Stack"}</a>
          <a href="#experiencias" onClick={() => setOpen(false)}>{english ? "Experience" : "Experiência"}</a>
          <ShinyButton className="nav-contact" label={english ? "Let's talk" : "Vamos conversar"} href="#contato" onClick={() => setOpen(false)}>
            {english ? "Let's talk" : "Vamos conversar"} <ArrowUpRight size={16} />
          </ShinyButton>
        </nav>
        <div className="language-selector" role="group" aria-label={english ? "Language" : "Idioma"}>
          <button type="button" className="language-option" onClick={() => setLanguage("pt")} aria-pressed={!english} lang="pt">
            <span className="language-flags" aria-hidden="true"><LanguageFlag country="br" /><LanguageFlag country="pt" /></span>
            <span>Português</span>
          </button>
          <button type="button" className="language-option" onClick={() => setLanguage("en")} aria-pressed={english} lang="en">
            <span className="language-flags" aria-hidden="true"><LanguageFlag country="us" /><LanguageFlag country="gb" /></span>
            <span>English</span>
          </button>
        </div>
      </div>
    </header>
  );
}
