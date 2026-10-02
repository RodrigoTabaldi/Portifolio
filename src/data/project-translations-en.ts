type ProjectTranslationEn = {
  title: string;
  category: string;
  tagline: string;
  description: string;
  imageLabel: string;
  coverLabel?: string;
  status: string;
  features: string[];
  architecture: string[];
  technologyAreas: string[];
};

export const projectTranslationsEn: Record<string, ProjectTranslationEn> = {
  vistora: {
    title: "Vistora · Property inspection SaaS",
    category: "Full Stack",
    tagline: "Organized inspections, from property to report.",
    description: "A multi-company property inspection platform with reusable checklists, photographic evidence, and report generation.",
    imageLabel: "Project interface",
    coverLabel: "Brand identity",
    status: "In development. Electronic acceptance is recorded by the application; it is not a certified digital signature.",
    features: [
      "Admin, Inspector, and Reader roles with organization-level data isolation.",
      "Properties, units, invitations, and reusable checklist templates.",
      "Move-in and move-out inspections with photos, recorded acceptance, and auditable approval.",
      "Background PDF generation through a queue and worker; files stored in S3-compatible storage.",
    ],
    architecture: ["Browser", "Next.js", "ASP.NET Core API", "PostgreSQL + Redis", "RabbitMQ → .NET Worker", "S3 Storage"],
    technologyAreas: ["Web", "API & Documents", "Data & Messaging", "Delivery & Quality"],
  },
  triar: {
    title: "Triar · Cross-platform speech and language screening",
    category: "Full Stack",
    tagline: "Guided triage on the web and in the app.",
    description: "Web and app software for speech and language screening, developed with the goal of expanding access across Brazil. Combines questionnaires, scoring, and history in local and connected modes.",
    imageLabel: "Project interface",
    coverLabel: "Brand identity",
    status: "Academic prototype in development. The catalog has not been clinically validated, and results are educational.",
    features: [
      "Triage questionnaires with weighted scoring and history.",
      "Individual web mode using SQLite through WebAssembly, persisted locally in the browser.",
      "Group mode with JWT authentication, PostgreSQL, and Redis caching.",
      "MAUI app connected to the API, with history export to Excel.",
    ],
    architecture: ["React Web / MAUI App", "Local mode: SQLite → IndexedDB", "Group mode: ASP.NET Core API", "PostgreSQL + Redis"],
    technologyAreas: ["API", "Application", "Web", "Data & Tools"],
  },
  voytek: {
    title: "Voytek · Fintech with AI agents",
    category: "AI & Governance",
    tagline: "Agent autonomy, with clear boundaries.",
    description: "A fintech MVP focused on AI agent governance: autonomy with policies, budget limits, human approval, and traceable decisions.",
    imageLabel: "Project interface",
    coverLabel: "Brand identity",
    status: "MVP in development. Budgets are logical limits: the system does not hold funds, process payments, or execute external tasks.",
    features: [
      "ALLOW, DENY, or HUMAN_APPROVAL decisions based on configured policies.",
      "Shadow Mode evaluates and records requests without executing external actions or reserving a budget.",
      "Agent lifecycle, kill switch, audit trail, and outcome records.",
      "API credentials stored as hashes, request limits, and signing recommendations.",
    ],
    architecture: ["React Application", "ASP.NET Core API", "Modules: agents, policies, limits, and audit", "PostgreSQL", "Redis + RabbitMQ + worker (local environment)"],
    technologyAreas: ["API", "Web", "Data", "Operations"],
  },
  kronos: {
    title: "Kronos · Financial management for better decisions",
    category: "Full Stack",
    tagline: "Clarity for better financial decisions.",
    description: "Financial management with cash flow, debt planning, simulations, and reports for individuals and small businesses.",
    imageLabel: "Brand identity",
    coverLabel: "Brand identity",
    status: "MVP in development. Cloud deployment and the complete distributed workflow have not yet been validated in the README.",
    features: [
      "Cash-flow dashboard, transactions, CSV reports, and browser printing.",
      "Debt planning with Avalanche and Snowball strategy comparisons.",
      "Simulations, calculators, and advanced analysis using deterministic local rules.",
      "Firebase mode and an alternative architecture with a REST API and Socket.IO communication.",
    ],
    architecture: ["React → Firebase Auth → Firestore (default)", "Alternative: React → NestJS REST / Socket.IO", "PostgreSQL + Redis → worker → SNS / SQS / S3 (LocalStack)"],
    technologyAreas: ["Frontend", "API & Services", "Data & Infrastructure", "Quality"],
  },
  fastcare: {
    title: "FASTcare · Technology supporting caregivers",
    category: "Frontend",
    tagline: "Accessible information for caregivers.",
    description: "An educational guide to the seven stages of the FAST scale, with practical guidance for families and caregivers.",
    imageLabel: "Project illustration",
    coverLabel: "Brand identity",
    status: "Educational project. The checklist does not provide a diagnosis or replace professional assessment.",
    features: [
      "Interactive navigation through the seven stages, contextual tips, and illustrations.",
      "A 20-item observation checklist with selections kept in React state.",
      "Expandable glossary, references, and keyboard-accessible controls.",
    ],
    architecture: ["Browser", "Static Next.js", "Local typed content", "Local illustrations"],
    technologyAreas: ["Interface", "Content & Typography", "Deployment"],
  },
  atlas: {
    title: "Atlas UFR · Visual learning platform for morphology",
    category: "Frontend",
    tagline: "Knowledge brought to life.",
    description: "A digital morphology atlas with a visual catalog, searchable glossary, and content organized by study area.",
    imageLabel: "Project interface",
    coverLabel: "Project cover",
    status: "In development. Topic content is still being written and reviewed; exercise PDFs have not been published yet.",
    features: [
      "Catalog planned with 15 topics and pages based on a reusable template.",
      "Searchable glossary with filters for Cytology, Histology, Embryology, and Anatomy.",
      "Typed content and local images sized for both the catalog and topic pages.",
      "Support for reduced-motion preferences.",
    ],
    architecture: ["Browser", "React + React Router SPA", "Typed content and local images", "No API or database"],
    technologyAreas: ["Application", "Development"],
  },
};
