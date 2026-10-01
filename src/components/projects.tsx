"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { ArrowRight, ArrowUpRight, Github, X } from "lucide-react";
import { projects, type Project } from "@/data/projects";
import { projectDetails } from "@/data/project-details";
import { projectTranslationsEn } from "@/data/project-translations-en";
import { ShinyButton } from "@/components/ui/shiny-button";
import { BorderChromeRing } from "@/components/ui/border-chrome-ring";
import { GravityStars } from "@/components/ui/gravity-stars";
import { useLanguage } from "@/components/language-provider";

export function Projects() {
  const { language } = useLanguage();
  const english = language === "en";
  const [selected, setSelected] = useState<Project | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const opener = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (!selected || !dialog.current) return;
    dialog.current.showModal();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [selected]);

  function close() {
    dialog.current?.close();
  }
  function afterClose() {
    setSelected(null);
    opener.current?.focus();
  }

  const selectedText = selected && english ? projectTranslationsEn[selected.slug] : null;

  return (
    <section
      className="projects section container"
      id="projetos"
      aria-labelledby="projects-title"
    >
      <GravityStars
        className="projects-starfield"
        count={90}
        connectDistance={115}
        glow={3}
        gravity={0.3}
        speed={0.85}
        starSize={1}
        twinkle={0.3}
      />
      <div className="section-heading" data-reveal>
        <h2 id="projects-title">{english ? "Projects" : "Projetos"}</h2>
        <span className="project-count" aria-label={english ? "6 selected projects" : "6 projetos selecionados"}>
          <i />
          06
        </span>
      </div>
      <div className="project-grid">
        {projects.map((project, index) => (
          <article
            className={`project-card project-${project.slug}`}
            key={project.slug}
            style={
              {
                "--project-accent": project.accent,
                "--card-delay": `${index * 65}ms`,
              } as CSSProperties
            }
          >
            <button
              className="project-image-button"
              aria-label={english ? `View ${project.name} details` : `Conhecer ${project.name}`}
              onClick={(event) => {
                opener.current = event.currentTarget;
                setSelected(project);
              }}
              >
                <div className={`project-image${project.cover ? " project-cover" : ""}`}>
                <Image
                  src={project.cover ?? project.image}
                  alt={project.cover ? (english ? `${projectTranslationsEn[project.slug].coverLabel ?? "Cover"} for ${project.name}` : `Capa de ${project.name}`) : `${english ? projectTranslationsEn[project.slug].imageLabel : project.imageLabel}: ${project.name}`}
                  fill
                  sizes="(max-width: 640px) 95vw, (max-width: 1050px) 48vw, 32vw"
                  quality={100}
                  unoptimized={Boolean(project.cover)}
                />
                <span className="image-open">
                  <ArrowUpRight size={22} />
                </span>
                <BorderChromeRing />
              </div>
            </button>
            <div className="project-body">
              <div className="project-meta">
                <span>{english ? projectTranslationsEn[project.slug].coverLabel ?? projectTranslationsEn[project.slug].imageLabel : project.coverLabel ?? project.imageLabel}</span>
                <span>{english ? projectTranslationsEn[project.slug].category : project.category}</span>
              </div>
              <h3>{project.name}</h3>
              <p>{english ? projectTranslationsEn[project.slug].description : project.description}</p>
              <div className="project-tags">
                {project.stack.map((tech) => (
                  <span key={tech}>{tech}</span>
                ))}
              </div>
              <ShinyButton
                label={english ? `View project: ${project.name}` : `Ver projeto: ${project.name}`}
                className="project-link"
                onClick={(event) => {
                  opener.current = event.currentTarget as HTMLButtonElement;
                  setSelected(project);
                }}
              >
                {english ? "View project" : "Ver projeto"} <ArrowRight size={19} />
              </ShinyButton>
            </div>
          </article>
        ))}
      </div>
      <a
        className="all-repos"
        href="https://github.com/RodrigoTabaldi?tab=repositories"
        target="_blank"
        rel="noopener noreferrer"
      >
        {english ? "More code, experiments, and ideas on GitHub" : "Mais código, experimentos e ideias no GitHub"} <ArrowUpRight size={17} />
      </a>
      <dialog
        ref={dialog}
        className="project-dialog"
        onClose={afterClose}
        aria-labelledby="dialog-title"
        onClick={(event) => {
          if (event.target === event.currentTarget) {
            const rect = event.currentTarget.getBoundingClientRect();
            if (
              event.clientX < rect.left ||
              event.clientX > rect.right ||
              event.clientY < rect.top ||
              event.clientY > rect.bottom
            )
              close();
          }
        }}
      >
        {selected && (
          <>
            <ShinyButton
              className="dialog-close icon-button"
              label={english ? "Close project details" : "Fechar detalhes"}
              autoFocus
              onClick={close}
            >
              <X size={22} />
            </ShinyButton>
            <div className={`dialog-image project-${selected.slug}`}>
              <Image
                src={selected.image}
                alt={`${selectedText?.imageLabel ?? selected.imageLabel}: ${selected.name}`}
                fill
                sizes="(max-width: 760px) 95vw, 780px"
                quality={100}
              />
            </div>
            <div className="dialog-content">
              <p className="section-index">
                {selectedText?.category ?? selected.category} / {selectedText?.imageLabel ?? selected.imageLabel}
              </p>
              <h2 id="dialog-title">{selected.name}</h2>
              <p className="dialog-tagline">{selectedText?.tagline ?? selected.tagline}</p>
              <p>{selectedText?.description ?? selected.description}</p>
              <h3>{english ? "Engineering decisions" : "Decisões de engenharia"}</h3>
              <ul>
                {(selectedText?.features ?? projectDetails[selected.slug].features).map((feature) => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>
              <h3>{english ? "How it works" : "Como funciona"}</h3>
              <div className="project-architecture" aria-label={english ? "Architecture flow" : "Fluxo da arquitetura"}>
                {(selectedText?.architecture ?? projectDetails[selected.slug].architecture).map((step, index) => (
                  <span className="architecture-step" key={step}>
                    {index > 0 && <ArrowRight aria-hidden="true" size={14} />}
                    {step}
                  </span>
                ))}
              </div>
              <h3>{english ? "Technologies used" : "Tecnologias utilizadas"}</h3>
              <div className="project-tech-groups">
                {projectDetails[selected.slug].technologyGroups.map((group, index) => (
                  <section className="project-tech-group" key={group.area}>
                    <h4>{selectedText?.technologyAreas[index] ?? group.area}</h4>
                    <div className="project-tags">
                      {group.technologies.map((technology) => (
                        <span key={technology}>{technology}</span>
                      ))}
                    </div>
                  </section>
                ))}
              </div>
              <div className="project-tags">
                {selected.stack.map((tech) => (
                  <span key={tech}>{tech}</span>
                ))}
              </div>
              <p className="project-status">{selectedText?.status ?? selected.status}</p>
              <a
                className="project-readme-link"
                href={`https://github.com/RodrigoTabaldi/${selected.repo}#readme`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {english ? "Full README on GitHub" : "README completo no GitHub"} <ArrowUpRight size={15} />
              </a>
              <ShinyButton
                className="button-primary"
                label={english ? "Code and documentation" : "Código e documentação"}
                href={`https://github.com/RodrigoTabaldi/${selected.repo}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github size={18} /> {english ? "Code and documentation" : "Código e documentação"}{" "}
                <ArrowUpRight size={18} />
              </ShinyButton>
            </div>
          </>
        )}
      </dialog>
    </section>
  );
}
