"use client";

import { CalendarDays, MapPin } from "lucide-react";
import type { CSSProperties } from "react";
import { GravityStars } from "@/components/ui/gravity-stars";
import { useLanguage } from "@/components/language-provider";

const experiences = [
  {
    company: "Vitrine Software",
    role: "Engenheiro de Software Full Stack (.NET & React)",
    complement: "Cofundador",
    location: "Remoto",
    period: "Março de 2026 — atual",
    contributions: [
      "Desenvolvi aplicações do zero em C#, .NET e ASP.NET Core, estruturando APIs REST com Clean Architecture, SOLID e injeção de dependência para facilitar a manutenção e a evolução do código.",
      "Modelei bancos relacionais com SQL Server e PostgreSQL usando Entity Framework Core, definindo entidades, relacionamentos, migrations e consultas alinhadas às regras de negócio.",
      "Integrei backends .NET a interfaces em TypeScript e React, entregando aplicações Full Stack com responsabilidades bem definidas entre frontend e backend.",
      "Como cofundador técnico, participei das decisões de stack, arquitetura e roadmap, transformando requisitos de produto em soluções implementáveis.",
    ],
  },
  {
    company: "Elcop Engenharia",
    role: "Assistente de TI",
    complement: "",
    location: "Rondonópolis, MT",
    period: "Abril de 2026 — atual",
    contributions: [
      "Desenvolvi um sistema interno de gestão de TI e estoque em C#/.NET com PostgreSQL para centralizar demandas e inventário e ampliar a rastreabilidade dos ativos.",
      "Analisei, reproduzi e corrigi falhas em sistemas corporativos, documentando ocorrências e contribuindo para a estabilidade das operações.",
      "Presto suporte e manutenção de TI para duas unidades, atendendo demandas de software, infraestrutura e usuários para manter a continuidade operacional.",
      "Evoluo o sistema interno conforme as necessidades da operação, transformando demandas dos usuários em melhorias funcionais e ajustes no software.",
    ],
  },
];

const experiencesEn = [
  {
    role: "Software Engineer Full Stack (.NET & React)",
    complement: "Co-founder",
    location: "Remote",
    period: "March 2026 — Present",
    contributions: [
      "Built applications from the ground up with C#, .NET, and ASP.NET Core, structuring REST APIs with Clean Architecture, SOLID, and dependency injection to support maintainability and future development.",
      "Designed relational databases with SQL Server and PostgreSQL using Entity Framework Core, defining entities, relationships, migrations, and queries aligned with business rules.",
      "Integrated .NET backends with TypeScript and React interfaces, delivering full-stack applications with clear responsibilities between frontend and backend.",
      "As a technical co-founder, contributed to stack, architecture, and roadmap decisions, turning product requirements into implementable software solutions.",
    ],
  },
  {
    role: "IT Assistant",
    complement: "",
    location: "Rondonópolis, MT, Brazil",
    period: "April 2026 — Present",
    contributions: [
      "Built an internal IT and inventory management system with C#/.NET and PostgreSQL to centralize requests and inventory and improve asset traceability.",
      "Investigated, reproduced, and fixed issues in corporate systems, documenting incidents and helping improve operational stability.",
      "Provide IT support and maintenance across two company locations, handling software, infrastructure, and user requests to keep operations running.",
      "Extend the internal system as operational needs evolve, turning user requests into functional improvements and software updates.",
    ],
  },
];

export function Experiences() {
  const { language } = useLanguage();
  const english = language === "en";

  return (
    <section className="experience-section section" id="experiencias" aria-labelledby="experience-title">
      <GravityStars className="section-starfield" count={95} connectDistance={125} glow={3.2} gravity={0.32} speed={0.85} starSize={1} twinkle={0.4} />
      <div className="container">
        <header className="experience-heading" data-reveal>
          <h2 id="experience-title">{english ? "Experience" : "Experiência"}</h2>
        </header>
        <div className="experience-list">
          {experiences.map((experience, index) => {
            const translated = experiencesEn[index];
            return (
              <article className="experience-entry" key={experience.company} data-reveal style={{ "--row-delay": `${index * 100}ms` } as CSSProperties}>
                <div className="experience-role">
                  <span className="experience-company">{experience.company}</span>
                  <h3>
                    {english ? translated.role : experience.role}
                    {(english ? translated.complement : experience.complement) && (
                      <span> · {english ? translated.complement : experience.complement}</span>
                    )}
                  </h3>
                  <div className="experience-facts">
                    <span><MapPin size={14} />{english ? translated.location : experience.location}</span>
                    <span><CalendarDays size={14} />{english ? translated.period : experience.period}</span>
                  </div>
                </div>
                <ul className="experience-contributions">
                  {(english ? translated.contributions : experience.contributions).map((contribution) => (
                    <li key={contribution}><span>{contribution}</span></li>
                  ))}
                </ul>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
