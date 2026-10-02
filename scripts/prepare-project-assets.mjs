import { readFile, writeFile, mkdir, copyFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import puppeteer from 'puppeteer';
import { renderMermaid } from '@mermaid-js/mermaid-cli';
import * as icons from 'simple-icons';

const catalog = [
  ['C#', /C#|\bCSharp\b/i, null], ['ASP.NET', /ASP\.NET/i, null],
  ['.NET MAUI', /\bMAUI\b/i, 'siDotnet'], ['.NET', /\.NET\b/i, 'siDotnet'],
  ['React', /\bReact\b/i, 'siReact'], ['TypeScript', /\bTypeScript\b/i, 'siTypescript'],
  ['JavaScript', /\bJavaScript\b/i, 'siJavascript'], ['Next.js', /\bNext\.js\b/i, 'siNextdotjs'],
  ['Node.js', /\bNode\.js\b/i, 'siNodedotjs'], ['NestJS', /\bNestJS\b/i, 'siNestjs'],
  ['Python', /\bPython\b/i, 'siPython'], ['HTML', /\bHTML5?\b/i, 'siHtml5'],
  ['CSS', /\bCSS3?\b/i, 'siCss'], ['Tailwind CSS', /\bTailwind\b/i, 'siTailwindcss'],
  ['Vite', /\bVite\b/i, 'siVite'], ['React Router', /\bReact Router\b/i, 'siReactrouter'],
  ['Firebase', /\bFirebase\b|\bFirestore\b/i, 'siFirebase'], ['PostgreSQL', /\bPostgreSQL\b/i, 'siPostgresql'],
  ['SQL Server', /\bSQL Server\b/i, null], ['SQLite', /\bSQLite\b/i, 'siSqlite'],
  ['Redis', /\bRedis\b/i, 'siRedis'], ['RabbitMQ', /\bRabbitMQ\b/i, 'siRabbitmq'],
  ['Docker', /\bDocker\b/i, 'siDocker'], ['GitHub Actions', /\bGitHub Actions\b/i, 'siGithubactions'],
  ['AWS', /\bAWS\b|\bAmazon Web Services\b/i, null], ['Vercel', /\bVercel\b/i, 'siVercel'],
  ['Netlify', /\bNetlify\b/i, 'siNetlify'], ['Cloudflare', /\bCloudflare\b/i, 'siCloudflare'],
  ['Nginx', /\bNginx\b/i, 'siNginx'], ['Terraform', /\bTerraform\b/i, 'siTerraform'],
  ['Kubernetes', /\bKubernetes\b/i, 'siKubernetes'], ['Vitest', /\bVitest\b/i, 'siVitest'],
  ['pandas', /\bpandas\b/i, 'siPandas'], ['Matplotlib', /\bMatplotlib\b/i, null],
  ['Flet', /\bFlet\b/i, null], ['PowerShell', /\bPowerShell\b/i, null],
  ['Markdown', /\bMarkdown\b/i, 'siMarkdown'], ['GSAP', /\bGSAP\b/i, 'siGreensock'],
  ['Bootstrap', /\bBootstrap\b/i, 'siBootstrap'], ['jQuery', /\bjQuery\b/i, 'siJquery'],
  ['Socket.IO', /\bSocket\.IO\b/i, 'siSocketdotio'], ['Zod', /\bZod\b/i, 'siZod'],
];
await mkdir('public/technology-icons', { recursive: true });
await copyFile('node_modules/simple-icons/LICENSE.md', 'public/technology-icons/LICENSE.md');
const technologyIcons = {};
for (const [name, , iconName] of catalog) {
  const icon = icons[iconName];
  if (!icon) continue;
  const src = `/technology-icons/${icon.slug}.svg`;
  // Light brand marks remain legible against the portfolio's dark surfaces.
  await writeFile(`public${src}`, icon.svg.replace('<svg ', '<svg fill="#b9c8ff" '));
  technologyIcons[name] = src;
}
await writeFile('src/data/technology-icons.json', JSON.stringify(technologyIcons, null, 2) + '\n');
const projects = JSON.parse(await readFile('src/data/github-projects.json', 'utf8'));
const diagrams = {};
let browser;
let diagramCount = 0;
try {
  for (const project of projects) {
    const source = project.readme ? await readFile(`public/readmes/${project.repo}.source.md`, 'utf8') : '';
    const techSections = [...source.matchAll(/^(#{1,6})\s+(?:Tech stack|Stack(?:\s.*)?|Tecnologias(?:\s.*)?|Technologies(?:\s.*)?)\s*\r?\n([\s\S]*?)(?=^#{1,6}\s|$(?![\s\S]))/gim)].map(match => match[2]).join('\n');
    const techSource = techSections || `${project.description}\n${project.language}`;
    project.technologies = catalog.filter(([, pattern]) => pattern.test(techSource)).map(([name]) => name);
    const markdownPath = project.readme ? `public${project.readme}` : null;
    if (!markdownPath) continue;
    let markdown = await readFile(markdownPath, 'utf8');
    // Repair locally imported badges accidentally treated as repository hyperlinks.
    markdown = markdown.replace(/https:\/\/github\.com\/RodrigoTabaldi\/[^/]+\/blob\/[^/]+\/(github\/[^\s)]+)/g, '/$1');
    const blocks = [...markdown.matchAll(/^```mermaid\s*\r?\n([\s\S]*?)^```/gm)];
    for (const block of blocks) {
      const definition = block[1].trim();
      const digest = createHash('sha256').update(definition).digest('hex').slice(0, 16);
      const src = `/architectures/${project.repo}/${digest}.svg`;
      if (!diagrams[definition]) {
        browser ??= await puppeteer.launch({ executablePath: process.env.PROJECT_DIAGRAM_BROWSER || 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe', headless: true });
        const rendered = await renderMermaid(browser, definition, 'svg', {
          mermaidConfig: { theme: 'dark', securityLevel: 'strict', flowchart: { htmlLabels: false } },
          backgroundColor: '#0d1523', viewport: { width: 1600, height: 1000, deviceScaleFactor: 1 },
        });
        await mkdir(`public/architectures/${project.repo}`, { recursive: true });
        await writeFile(`public${src}`, rendered.data);
        diagrams[definition] = src;
        diagramCount++;
      }
    }
    await writeFile(markdownPath, markdown);
    console.log(`${project.repo}: ${project.technologies.length} tecnologias, ${blocks.length} diagramas`);
  }
} finally { await browser?.close(); }
await writeFile('src/data/github-projects.json', JSON.stringify(projects, null, 2) + '\n');
await writeFile('src/data/architecture-diagrams.json', JSON.stringify(diagrams, null, 2) + '\n');
console.log(`Gerados ${diagramCount} diagramas de arquitetura e ${Object.keys(technologyIcons).length} icones locais.`);
