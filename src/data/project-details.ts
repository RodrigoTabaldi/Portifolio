export type ProjectDetails = {
  overview: string;
  features: string[];
  architecture: string[];
  technologyGroups: { area: string; technologies: string[] }[];
};

export const projectDetails: Record<string, ProjectDetails> = {
  vistora: {
    overview: "Centraliza vistorias imobiliárias em organizações, propriedades e unidades. Checklists reutilizáveis e evidências fotográficas alimentam laudos rastreáveis; a comparação com a vistoria aprovada de entrada ajuda a identificar alterações.",
    features: [
      "Perfis Admin, Vistoriador e Leitor, com isolamento de dados por organização.",
      "Imóveis, unidades, convites e modelos de checklist reutilizáveis.",
      "Vistorias de entrada e saída com fotos, aceite registrado e aprovação auditável.",
      "Geração de PDF em segundo plano por fila e worker; arquivos em armazenamento compatível com S3.",
    ],
    architecture: ["Navegador", "Next.js", "API ASP.NET Core", "PostgreSQL + Redis", "RabbitMQ → Worker .NET", "Armazenamento S3"],
    technologyGroups: [
      { area: "Web", technologies: ["Next.js 16", "React 19", "TypeScript 5", "App Router"] },
      { area: "API e documentos", technologies: ["C#", ".NET 10", "ASP.NET Core Minimal APIs", "EF Core 10", "Npgsql", "PDFsharp", "MigraDoc"] },
      { area: "Dados e mensageria", technologies: ["PostgreSQL 17", "Row-Level Security", "Redis 7", "RabbitMQ 4", "RustFS", "AWS SDK S3"] },
      { area: "Entrega e qualidade", technologies: ["Docker Compose", "GitHub Actions", "GHCR", "xUnit", "Testcontainers"] },
    ],
  },
  triar: {
    overview: "Sistema de triagem educacional com cliente .NET MAUI, aplicação web e API. A web oferece modo individual local, sem conta, e modo em grupo conectado ao serviço central.",
    features: [
      "Questionários de triagem com pontuação ponderada e histórico.",
      "Modo individual web com SQLite via WebAssembly, persistido localmente no navegador.",
      "Modo em grupo com autenticação JWT, PostgreSQL e cache Redis.",
      "Aplicativo MAUI conectado à API e exportação do histórico para Excel.",
    ],
    architecture: ["Web React / App MAUI", "Modo local: SQLite → IndexedDB", "Modo em grupo: API ASP.NET Core", "PostgreSQL + Redis"],
    technologyGroups: [
      { area: "API", technologies: ["C#", ".NET 10", "ASP.NET Core Web API", "EF Core 10", "Npgsql", "JWT Bearer", "OpenAPI"] },
      { area: "Aplicativo", technologies: [".NET MAUI", "C#", "XAML", "HttpClient", "Android", "Windows", "iOS / Mac Catalyst"] },
      { area: "Web", technologies: ["React 19", "TypeScript 5.9", "React Router 7", "Vite 7", "Service Worker", "PWA"] },
      { area: "Dados e ferramentas", technologies: ["PostgreSQL 17", "SQLite", "sql.js / WebAssembly", "IndexedDB", "Docker Compose", "Nginx", "Redis 7", "ClosedXML", "Playwright"] },
    ],
  },
  voytek: {
    overview: "Camada de governança para operações de agentes de IA. A API avalia políticas, limites lógicos e necessidade de aprovação humana antes de registrar a decisão.",
    features: [
      "Decisões ALLOW, DENY ou HUMAN_APPROVAL conforme as políticas configuradas.",
      "Shadow Mode registra avaliações sem executar tarefas externas ou reservar orçamento.",
      "Ciclo de vida de agentes, kill switch, auditoria e registro de resultados.",
      "Credenciais de API armazenadas com hash, limites de requisição e recomendações de assinatura.",
    ],
    architecture: ["Aplicação React", "API ASP.NET Core", "Módulos: agentes, políticas, limites e auditoria", "PostgreSQL", "Redis + RabbitMQ + worker (ambiente local)"],
    technologyGroups: [
      { area: "API", technologies: ["C#", ".NET 8", "ASP.NET Core Minimal APIs", "Identity", "JWT"] },
      { area: "Web", technologies: ["React 18", "TypeScript 5.6", "Vite 6", "CSS"] },
      { area: "Dados", technologies: ["PostgreSQL 16", "EF Core 8", "Npgsql", "Redis", "RabbitMQ"] },
      { area: "Operação", technologies: ["Docker", "Docker Compose", "Nginx", "GitHub Actions", "GHCR", "Azure Container Apps workflow"] },
    ],
  },
  kronos: {
    overview: "Aplicação de organização financeira para acompanhar fluxo de caixa, transações e dívidas. O modo padrão usa Firebase; o repositório também inclui uma API NestJS opcional.",
    features: [
      "Painel de fluxo de caixa, transações, relatórios CSV e impressão pelo navegador.",
      "Planejamento de dívidas com comparação Avalanche e Bola de Neve.",
      "Simulações, calculadoras e análises avançadas com regras locais determinísticas.",
      "Modo Firebase e arquitetura alternativa com API REST e comunicação Socket.IO.",
    ],
    architecture: ["React → Firebase Auth → Firestore (padrão)", "Alternativa: React → NestJS REST / Socket.IO", "PostgreSQL + Redis → worker → SNS / SQS / S3 (LocalStack)"],
    technologyGroups: [
      { area: "Frontend", technologies: ["React 19", "TypeScript strict", "Vite 6", "React Router", "Tailwind CSS", "React Hook Form", "Zod", "Lucide"] },
      { area: "API e serviços", technologies: ["Node.js 24", "NestJS 11", "Express", "Socket.IO", "Firebase Admin", "AWS SDK"] },
      { area: "Dados e infraestrutura", technologies: ["Firebase Auth", "Firestore", "PostgreSQL 17", "MikroORM 6", "Redis 7", "Docker Compose", "Nginx", "LocalStack"] },
      { area: "Qualidade", technologies: ["Vitest", "GitHub Actions", "Terraform (fundação)", "Kubernetes (fundação)"] },
    ],
  },
  fastcare: {
    overview: "Site educacional em português sobre os sete estágios da escala FAST, voltado a familiares e cuidadores. O conteúdo é estático e não depende de API, banco de dados ou autenticação.",
    features: [
      "Navegação pelos sete estágios, sinais observáveis e orientações de cuidado.",
      "Checklist educativo de 20 observações, sem finalidade de diagnóstico.",
      "Dicas contextuais, glossário e referências bibliográficas em estilos ABNT e APA.",
      "Navegação por teclado e preferência por movimento reduzido.",
    ],
    architecture: ["Navegador", "Next.js estático", "Conteúdo tipado local", "Ilustrações locais"],
    technologyGroups: [
      { area: "Interface", technologies: ["Next.js 15", "React 18", "TypeScript 5", "CSS"] },
      { area: "Conteúdo e tipografia", technologies: ["Dados estáticos TypeScript", "Manrope", "Roboto Mono", "Google Fonts"] },
      { area: "Publicação", technologies: ["Vercel configuration", "Netlify configuration"] },
    ],
  },
  atlas: {
    overview: "Atlas digital de morfologia para apoio ao estudo. A aplicação organiza tópicos, glossário e exercícios em uma SPA com dados e ilustrações locais.",
    features: [
      "Catálogo planejado com 15 tópicos e páginas baseadas em um template reutilizável.",
      "Glossário pesquisável com filtros por Citologia, Histologia, Embriologia e Anatomia.",
      "Ilustrações locais em versões adequadas à listagem e à página do tópico.",
      "Suporte à preferência de movimento reduzido.",
    ],
    architecture: ["Navegador", "SPA React + React Router", "Conteúdo tipado e imagens locais", "Sem API ou banco de dados"],
    technologyGroups: [
      { area: "Aplicação", technologies: ["React 19", "TypeScript 6", "React Router 7", "CSS"] },
      { area: "Desenvolvimento", technologies: ["Vite 8", "npm", "TypeScript compiler", "Oxlint"] },
    ],
  },
};
