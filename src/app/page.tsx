"use client";

import Image from "next/image";
import { ArrowUp, ArrowUpRight, Github, Languages, Linkedin, Mail, MessageCircle } from "lucide-react";
import { Navigation } from "@/components/navigation";
import { Motion } from "@/components/motion";
import { Projects } from "@/components/projects";
import { StackSection } from "@/components/stack-section";
import { Experiences } from "@/components/experiences";
import { FeaturedStack } from "@/components/featured-stack";
import { ShinyButton } from "@/components/ui/shiny-button";
import { useLanguage } from "@/components/language-provider";

export default function Home() {
  const { language } = useLanguage();
  const english = language === "en";

  return (
    <>
      <a className="skip-link" href="#conteudo">
        {english ? "Skip to content" : "Pular para o conteúdo"}
      </a>
      <Navigation />
      <main id="conteudo">
        <section className="hero" id="inicio" aria-labelledby="hero-title">
          <div className="container hero-layout">
            <div className="hero-copy">
              <h1 id="hero-title">Rodrigo Tabaldi</h1>
              <p className="hero-description">
                {english ? (
                  <><strong>Software Engineer</strong> · Backend · Full Stack, focused on building scalable software products and modern web applications.</>
                ) : (
                  <><strong>Engenheiro de Software</strong> · Backend · Full Stack, focado em construir produtos de software escaláveis e aplicações web modernas.</>
                )}
              </p>
              <p className="hero-language">
                <Languages size={16} strokeWidth={1.7} aria-hidden="true" />
                <span>{english ? "Advanced English" : "Inglês avançado"}</span>
              </p>
              <FeaturedStack />
              <div className="hero-actions">
                <div className="hero-primary-actions">
                  <ShinyButton className="hero-compact button-primary" label={english ? "View projects" : "Ver projetos"} href="#projetos">
                    {english ? "View projects" : "Ver projetos"} <ArrowUpRight size={18} />
                  </ShinyButton>
                  <ShinyButton className="hero-compact hero-contact" label={english ? "Email rodrigotabaldi01@gmail.com" : "Enviar e-mail para rodrigotabaldi01@gmail.com"} href="mailto:rodrigotabaldi01@gmail.com">
                    <Mail size={18} /> rodrigotabaldi01@gmail.com
                  </ShinyButton>
                  <ShinyButton className="hero-compact hero-contact" label={english ? "Message on WhatsApp: +55 66 99630-8666" : "Conversar pelo WhatsApp: +55 66 99630-8666"} href="https://wa.me/5566996308666" target="_blank" rel="noopener noreferrer">
                    <MessageCircle size={18} /> +55 66 99630-8666
                  </ShinyButton>
                </div>
                <div className="hero-social-actions" aria-label={english ? "Professional profiles" : "Redes profissionais"}>
                  <ShinyButton className="hero-compact social-button" label={english ? "Rodrigo Tabaldi on LinkedIn (opens in new tab)" : "LinkedIn de Rodrigo Tabaldi (abre em nova aba)"} href="https://www.linkedin.com/in/rodrigotabaldi/" target="_blank" rel="noopener noreferrer">
                    <Linkedin size={19} /> LinkedIn
                  </ShinyButton>
                  <ShinyButton className="hero-compact social-button" label={english ? "Rodrigo Tabaldi on GitHub (opens in new tab)" : "GitHub de Rodrigo Tabaldi (abre em nova aba)"} href="https://github.com/RodrigoTabaldi" target="_blank" rel="noopener noreferrer">
                    <Github size={19} /> GitHub
                  </ShinyButton>
                </div>
              </div>
            </div>
            <div className="portrait-composition">
              <div className="portrait-frame">
                <Image
                  src="/images/rodrigo-original.png"
                  alt={english ? "Rodrigo Tabaldi, software engineer" : "Rodrigo Tabaldi, engenheiro de software"}
                  fill
                  quality={100}
                  sizes="(max-width: 760px) 80vw, 32vw"
                  priority
                />
              </div>
            </div>
          </div>
        </section>
        <Projects />
        <StackSection />
        <Experiences />
        <section className="contact section container" id="contato" aria-label={english ? "Email contact" : "Contato por e-mail"} data-reveal>
          <p className="contact-invitation">
            {english
              ? "Have an interesting project or opportunity? Get in touch. I'm always open to new challenges."
              : "Tem um projeto ou uma oportunidade interessante? Me chame. Estou sempre disposto a novos desafios."}
          </p>
          <a className="contact-email-only" href="mailto:rodrigotabaldi01@gmail.com">rodrigotabaldi01@gmail.com</a>
        </section>
      </main>
      <footer className="footer">
        <div className="container footer-inner">
          <a href="#inicio" className="brand">rodrigo.tabaldi</a>
          <span>{english ? "Built with Next.js & TypeScript" : "Feito com Next.js & TypeScript"}</span>
          <a href="#inicio" className="back-top">{english ? "Back to top" : "Voltar ao topo"} <ArrowUp size={17} /></a>
        </div>
      </footer>
      <Motion />
    </>
  );
}
