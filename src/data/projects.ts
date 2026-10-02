import githubProjects from "./github-projects.json";

export type Category = "Todos" | "Full Stack" | "Frontend" | "IA & Governança" | "Software";
export type Project = {
  slug: string;
  name: string;
  category: Exclude<Category, "Todos">;
  tagline: string;
  description: string;
  image: string;
  cover?: string;
  coverLabel?: string;
  imageLabel: string;
  stack: string[];
  highlights: string[];
  status: string;
  repo: string;
  website?: string;
  accent: string;
};

const featuredProjects: Project[] = [
  {
    slug: "vistora",
    name: "Vistora",
    category: "Full Stack",
    tagline: "Vistorias organizadas. Do imóvel ao laudo.",
    description:
      "Plataforma multiempresa para vistorias imobiliárias, com checklists reutilizáveis, evidências fotográficas e geração de laudos.",
    image: "/images/vistora.png",
    cover: "/images/vistora-logo.png",
    coverLabel: "Identidade visual",
    imageLabel: "Interface do projeto",
    stack: ["Next.js", ".NET", "PostgreSQL", "RabbitMQ"],
    highlights: [
      "Isolamento por organização com filtros do EF Core e Row-Level Security no PostgreSQL.",
      "Geração assíncrona de PDFs com RabbitMQ e um worker .NET.",
      "Controle de acesso por perfis, evidências em armazenamento compatível com S3 e aceite eletrônico.",
    ],
    status:
      "Em desenvolvimento. O aceite eletrônico é um registro da aplicação; não é uma assinatura digital certificada.",
    repo: "VistoraSaas",
    accent: "#91aaff",
  },
  {
    slug: "triar",
    name: "Triar",
    category: "Full Stack",
    tagline: "Triagem guiada, na web e no aplicativo.",
    description:
      "Questionários, pontuação e histórico em uma experiência web e .NET MAUI, com modos individual local e conectado à API.",
    image: "/images/triar.png",
    cover: "/images/triar-logo.png",
    coverLabel: "Identidade visual",
    imageLabel: "Interface do projeto",
    stack: ["C#", ".NET MAUI", "React", "SQLite"],
    highlights: [
      "SQLite no navegador, persistido em IndexedDB, para o modo individual sem conta.",
      "API ASP.NET Core com JWT, PostgreSQL e cache compartilhado em Redis.",
      "Questionários personalizáveis, pontuação ponderada e exportação de histórico em Excel.",
    ],
    status:
      "Protótipo acadêmico em desenvolvimento. O catálogo não tem validação clínica e os resultados são educacionais.",
    repo: "TriarCompleto",
    accent: "#c5b4ec",
  },
  {
    slug: "voytek",
    name: "Voytek",
    category: "IA & Governança",
    tagline: "Autonomia de agentes, com limites claros.",
    description:
      "Governança de operações de agentes de IA com políticas, limites lógicos, aprovação humana e registros de auditoria.",
    image: "/images/voytek.png",
    cover: "/images/voytek-logo.png",
    coverLabel: "Identidade visual",
    imageLabel: "Interface do projeto",
    stack: [".NET", "React", "TypeScript", "PostgreSQL"],
    highlights: [
      "Avaliação de políticas com decisões ALLOW, DENY ou HUMAN_APPROVAL.",
      "Shadow Mode para avaliar e registrar solicitações sem executar ações externas.",
      "Monólito modular com identidade, agentes, objetivos, limites e auditoria.",
    ],
    status:
      "MVP em desenvolvimento. Os budgets são lógicos: não há custódia de dinheiro, pagamentos ou execução externa de tarefas.",
    repo: "FintechVoytek",
    accent: "#c5f277",
  },
  {
    slug: "kronos",
    name: "Kronos",
    category: "Full Stack",
    tagline: "Clareza para decidir sobre as finanças.",
    description:
      "Gestão financeira com fluxo de caixa, planejamento de dívidas, simulações e relatórios para pessoas e pequenos negócios.",
    image: "/images/kronos.png",
    imageLabel: "Identidade visual",
    stack: ["React", "TypeScript", "NestJS", "Firebase"],
    highlights: [
      "Comparação das estratégias Avalanche e Bola de Neve para pagamento de dívidas.",
      "Firebase no modo padrão e API opcional NestJS com PostgreSQL e Redis.",
      "Calculadoras e recomendações calculadas por regras locais em TypeScript.",
    ],
    status:
      "MVP em desenvolvimento. A implantação em nuvem e o fluxo distribuído completo ainda não estão validados no README.",
    repo: "Kronos",
    website: "https://kronosgestaofinanceira.vercel.app/",
    accent: "#e2c07b",
  },
  {
    slug: "fastcare",
    name: "FASTcare",
    category: "Frontend",
    tagline: "Informação acessível para quem cuida.",
    description:
      "Guia educacional sobre os sete estágios da escala FAST, com orientações práticas para familiares e cuidadores.",
    image: "/images/fastcare.webp",
    cover: "/images/fastcare-logo.png",
    coverLabel: "Identidade visual",
    imageLabel: "Ilustração do projeto",
    stack: ["Next.js", "React", "TypeScript", "CSS"],
    highlights: [
      "Navegação interativa por estágios, dicas contextuais e ilustrações.",
      "Checklist de observação com 20 itens e seleção mantida em estado React.",
      "Glossário expansível, referências e controles acessíveis por teclado.",
    ],
    status:
      "Projeto educacional. O checklist não determina diagnóstico nem substitui avaliação profissional.",
    repo: "FASTcare",
    website: "https://fastcare-nine.vercel.app/",
    accent: "#edb990",
  },
  {
    slug: "atlas",
    name: "Atlas de Morfologia UFR",
    category: "Frontend",
    tagline: "Conhecimento que ganha forma.",
    description:
      "Atlas digital de morfologia com catálogo visual, glossário pesquisável e conteúdos organizados por área de estudo.",
    image: "/images/atlas.png",
    cover: "/images/atlas-cover.png",
    coverLabel: "Capa do projeto",
    imageLabel: "Interface do projeto",
    stack: ["React", "TypeScript", "React Router", "CSS"],
    highlights: [
      "15 rotas de tópicos organizadas em um template reutilizável.",
      "Glossário com busca e filtros por Citologia, Histologia, Embriologia e Anatomia.",
      "Conteúdo tipado e imagens locais em tamanhos adequados ao catálogo e às páginas.",
    ],
    status:
      "Em desenvolvimento. Conteúdos dos tópicos estão sendo produzidos e revisados; ainda não há PDFs de exercícios publicados.",
    repo: "Atlas-Morfologia-UFR",
    website: "https://atlasmorfologiaufr.vercel.app/",
    accent: "#a5ccc0",
  },
];

export const projects: Project[] = [
  ...featuredProjects.map(project => {
    const imported = githubProjects.find(entry => entry.repo === project.repo);
    return { ...project, website: project.website ?? (imported?.website || undefined) };
  }),
];
