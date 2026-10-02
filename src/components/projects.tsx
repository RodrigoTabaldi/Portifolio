"use client";

import Image from "next/image";
import dynamic from "next/dynamic";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { ArrowRight, ArrowUpRight, Github, X } from "lucide-react";
import { projects, type Project } from "@/data/projects";
import githubProjects from "@/data/github-projects.json";
import { ProjectTechnology } from "@/components/project-technology";
import { projectTranslationsEn } from "@/data/project-translations-en";
import { ShinyButton } from "@/components/ui/shiny-button";
import { BorderChromeRing } from "@/components/ui/border-chrome-ring";
import { GravityStars } from "@/components/ui/gravity-stars";
import { useLanguage } from "@/components/language-provider";

const ProjectReadme = dynamic(() => import("@/components/project-readme").then(module => module.ProjectReadme));

export function Projects() {
  const { language } = useLanguage();
  const english = language === "en";
  const [selected, setSelected] = useState<Project | null>(null);
  const [readmeOpen, setReadmeOpen] = useState(false);
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
    setReadmeOpen(false);
    opener.current?.focus();
  }

  const selectedText = selected && english ? projectTranslationsEn[selected.slug] : null;
  const selectedImport = selected ? githubProjects.find(project => project.repo === selected.repo) : undefined;

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
        <span className="project-count" aria-label={english ? `${projects.length} projects` : `${projects.length} projetos`}>
          <i />
          {String(projects.length).padStart(2, "0")}
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
                  alt={project.cover ? (english ? `${projectTranslationsEn[project.slug]?.coverLabel ?? "Cover"} for ${project.name}` : `Capa de ${project.name}`) : `${english ? projectTranslationsEn[project.slug]?.imageLabel ?? "Project image" : project.imageLabel}: ${project.name}`}
                  fill
                  sizes="(max-width: 760px) 95vw, (max-width: 1050px) 44vw, 24vw"
                  quality={75}
                />
                <span className="image-open">
                  <ArrowUpRight size={22} />
                </span>
                <BorderChromeRing />
              </div>
            </button>
            <div className="project-body">
              <h3>{english ? projectTranslationsEn[project.slug]?.title ?? project.title : project.title}</h3>
              <p>{english ? projectTranslationsEn[project.slug]?.description ?? project.description : project.description}</p>
              <div className="project-tags">
                {project.stack.map((tech) => (
                  <ProjectTechnology key={tech} name={tech} />
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
                {english ? "Explore solution" : "Conhecer solução"} <ArrowRight size={19} />
              </ShinyButton>
              {project.website && (
                <a className="project-web-link" href={project.website} target="_blank" rel="noopener noreferrer" aria-label={english ? `Visit ${project.name} website (opens in new tab)` : `Acessar site de ${project.name} (abre em nova aba)`}>
                  {english ? "Visit website" : "Acessar site"} <ArrowUpRight size={16} aria-hidden="true" />
                </a>
              )}
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
                quality={75}
              />
            </div>
            <div className="dialog-content">
              <h2 id="dialog-title">{selectedText?.title ?? selected.title}</h2>
              <p className="dialog-tagline">{selectedText?.tagline ?? selected.tagline}</p>
              <p>{selectedText?.description ?? selected.description}</p>
              <h3>{english ? "Technologies used" : "Tecnologias utilizadas"}</h3>
              <div className="project-tags">
                {(selectedImport?.technologies.length ? selectedImport.technologies : selected.stack).map(tech => <ProjectTechnology key={tech} name={tech} />)}
              </div>
              {Boolean(selectedImport?.images.length) && (
                <section className="project-gallery" aria-label={english ? "Project images" : "Imagens do projeto"}>
                  {selectedImport?.images.map(image => (
                    <a href={image.src} target="_blank" rel="noopener noreferrer" key={image.src} aria-label={english ? `Open image: ${image.alt}` : `Abrir imagem: ${image.alt}`}>
                      <Image src={image.src} alt={image.alt} width={800} height={500} sizes="(max-width: 760px) 90vw, 380px" quality={75} />
                    </a>
                  ))}
                </section>
              )}
              <details className="project-documentation" onToggle={event => setReadmeOpen(event.currentTarget.open)}>
                <summary>{english ? "Read full documentation and architecture" : "Ler documentação completa e arquitetura"}</summary>
                <p className="readme-source-note">{english ? "Original content from GitHub, in the author's language." : "Conteúdo original do GitHub, no idioma do autor."}</p>
                {readmeOpen && <ProjectReadme key={selected.repo} path={selectedImport?.readme ?? null} english={english} />}
              </details>
              <div className="project-tags">
                {selected.stack.map((tech) => (
                  <ProjectTechnology key={tech} name={tech} />
                ))}
              </div>
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
              {selected.website && (
                <a className="project-web-link" href={selected.website} target="_blank" rel="noopener noreferrer" aria-label={english ? `Visit ${selected.name} website (opens in new tab)` : `Acessar site de ${selected.name} (abre em nova aba)`}>
                  {english ? "Visit website" : "Acessar site"} <ArrowUpRight size={16} aria-hidden="true" />
                </a>
              )}
            </div>
          </>
        )}
      </dialog>
    </section>
  );
}
