"use client";

import Image from "next/image";
import {
  Blocks,
  Braces,
  Bot,
  Cloud,
  Database,
  Layers,
  ListChecks,
  PanelsTopLeft,
  PlugZap,
  Sparkles,
  Server,
  Workflow,
} from "lucide-react";
import type { CSSProperties } from "react";
import { GravityStars } from "@/components/ui/gravity-stars";
import { useLanguage } from "@/components/language-provider";

const englishGroups: Record<string, { title: string; description: string }> = {
  Backend: { title: "Backend", description: "Services, integrations, and business logic." },
  Frontend: { title: "Frontend", description: "Web interfaces and applications built for people." },
  "Dados & Cache": { title: "Data & Caching", description: "Data persistence and fast access." },
  "Arquitetura & Integração": { title: "Architecture & Integration", description: "Organized, cohesive systems built to evolve." },
  "DevOps & Ferramentas": { title: "DevOps & Tools", description: "Continuous delivery and day-to-day collaboration." },
};

const englishTechnologies: Record<string, string> = {
  "Arquitetura em camadas": "Layered architecture",
  "Arquitetura modular": "Modular architecture",
  "Integração de APIs": "API integration",
};

const groups = [
  {
    title: "Backend",
    description: "Serviços, integrações e regras de negócio.",
    Icon: Server,
    technologies: [
      ["C#", "csharp"], [".NET", "dotnet"], ["ASP.NET", "dotnetcore"],
      ["Python", "python"], ["Node.js", "nodedotjs"],
      ["NestJS", "nestjs"], ["REST APIs", "swagger"],
    ],
  },
  {
    title: "Frontend",
    description: "Interfaces web e aplicações para pessoas.",
    Icon: PanelsTopLeft,
    technologies: [
      ["TypeScript", "typescript"], ["React", "react"], ["Next.js", "nextdotjs"],
      ["JavaScript", "javascript"], ["HTML", "html5"], ["CSS", "css3"], [".NET MAUI", "dotnet"],
    ],
  },
  {
    title: "Dados & Cache",
    description: "Persistência e acesso rápido aos dados.",
    Icon: Database,
    technologies: [
      ["PostgreSQL", "postgresql"], ["SQL Server", "microsoftsqlserver"],
      ["SQLite", "sqlite"], ["NoSQL", "firebase"], ["Redis", "redis"],
    ],
  },
  {
    title: "Arquitetura & Integração",
    description: "Sistemas organizados, coesos e preparados para evoluir.",
    Icon: Workflow,
    technologies: [
      ["Arquitetura em camadas", "layers"], ["SOLID", "visualstudiocode"],
      ["Arquitetura modular", "stackblitz"], ["Integração de APIs", "zapier"],
    ],
  },
  {
    title: "DevOps & Ferramentas",
    description: "Entrega contínua e colaboração no dia a dia.",
    Icon: Cloud,
    technologies: [
      ["Git / GitHub", "github"], ["Docker", "docker"], ["CI/CD", "githubactions"],
      ["AWS", "amazonaws"], ["Linux", "linux"], ["Jira", "jira"],
      ["Scrum", "scrumalliance"], ["Kanban", "trello"],
      ["OpenAI Codex", "openai"], ["Claude", "anthropic"],
    ],
  },
] as const;

function TechnologyIcon({ name, slug }: { name: string; slug: string }) {
  const wordmarks: Record<string, string> = {
    "C#": "C#",
    ".NET": ".NET",
    "ASP.NET": "ASP.NET",
    "SQL Server": "SQL",
  };
  const icons: Record<string, typeof Layers> = {
    "REST APIs": Braces,
    NoSQL: Database,
    "Arquitetura em camadas": Layers,
    SOLID: Blocks,
    "Arquitetura modular": Blocks,
    "Integração de APIs": PlugZap,
    Scrum: ListChecks,
    AWS: Cloud,
    "OpenAI Codex": Sparkles,
    Claude: Bot,
  };
  const Wordmark = wordmarks[name];
  const FallbackIcon = icons[name];

  return (
    <span className={`stack-tech-icon${Wordmark ? " stack-tech-wordmark" : ""}`} aria-hidden="true">
      {Wordmark ? (
        <span>{Wordmark}</span>
      ) : FallbackIcon ? (
        <FallbackIcon size={21} strokeWidth={1.8} />
      ) : (
        <>
          <span className="stack-tech-fallback">{name.slice(0, 2).toUpperCase()}</span>
          <Image
            src={`https://cdn.simpleicons.org/${slug}`}
            alt=""
            loading="lazy"
            width={22}
            height={22}
            unoptimized
            onLoad={(event) => {
              event.currentTarget.parentElement?.classList.add("has-icon");
            }}
            onError={(event) => {
              event.currentTarget.hidden = true;
            }}
          />
        </>
      )}
    </span>
  );
}

export function StackSection() {
  const { language } = useLanguage();
  const english = language === "en";
  return (
    <section className="stack-section section" id="stack" aria-labelledby="stack-title">
      <GravityStars className="section-starfield" count={85} connectDistance={135} glow={3} speed={0.85} starSize={1} twinkle={0.4} />
      <div className="container">
        <div className="section-heading" data-reveal>
          <div>
            <h2 id="stack-title">{english ? "Tech stack" : "Stack e tecnologias"}</h2>
          </div>
        </div>
        <div className="stack-list">
          {groups.map(({ title, description, Icon, technologies }, index) => (
            <article
              className="stack-row"
              key={title}
              data-reveal
              style={{ "--row-delay": `${index * 90}ms` } as CSSProperties}
            >
              <div className="stack-row-category">
                <span className="stack-category-icon"><Icon size={18} strokeWidth={1.6} /></span>
                <div>
                  <span className="stack-number">0{index + 1}</span>
                  <h3>{english ? englishGroups[title].title : title}</h3>
                  <p>{english ? englishGroups[title].description : description}</p>
                </div>
              </div>
              <div className="stack-technologies">
                {technologies.map(([name, slug]) => (
                  <span className={`stack-tech${slug === "nextdotjs" ? " stack-tech-next" : ""}`} key={name}>
                    <TechnologyIcon name={name} slug={slug} />
                    <span>{english ? englishTechnologies[name] ?? name : name}</span>
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}


