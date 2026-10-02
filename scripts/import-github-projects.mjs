import { mkdir, writeFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import path from 'node:path';

const owner = 'RodrigoTabaldi';
const root = process.cwd();
const headers = { 'User-Agent': 'Rodrigo-Portfolio', Accept: 'application/vnd.github+json' };
const failures = [];
async function request(url) {
  const response = await fetch(url, { headers, signal: AbortSignal.timeout(30000) });
  if (!response.ok) throw new Error(`${response.status} ${url}`);
  return response;
}
async function json(url) { return (await request(url)).json(); }
const repositories = await json(`https://api.github.com/users/${owner}/repos?per_page=100&sort=updated`);
const imported = [];
for (const repo of repositories.filter(repo => !repo.fork && ![owner, 'Portifolio'].includes(repo.name))) {
  const base = `https://api.github.com/repos/${owner}/${repo.name}`;
  const rawBase = `https://raw.githubusercontent.com/${owner}/${repo.name}/${repo.default_branch}/`;
  const entry = { repo: repo.name, description: repo.description || '', website: repo.homepage || '', language: repo.language || '', readme: null, images: [], source: repo.html_url, branch: repo.default_branch };
  let readme;
  try { readme = await json(`${base}/readme`); }
  catch (error) {
    if (!error.message.startsWith('404 ')) throw error;
    console.log(`${repo.name}: sem README`);
  }
  const images = new Map();
  const readmeFolder = readme ? path.posix.dirname(readme.path) : '.';
  function resolveResource(value) {
    const decoded = value.replaceAll('&amp;', '&');
    if (/^https?:\/\//i.test(decoded)) {
      return decoded.replace(/https:\/\/github.com\/([^/]+)\/([^/]+)\/blob\//, 'https://raw.githubusercontent.com/$1/$2/').replace(/\?raw=true$/, '');
    }
    return new URL(path.posix.normalize(`${readmeFolder}/${decoded}`), rawBase).href;
  }
  async function downloadImage(value, alt = '') {
    const source = resolveResource(value);
    if (images.has(source)) return images.get(source);
    // Badges are kept inside the README, but do not become gallery images.
    const isBadge = /shields\.io|badge|readme-stats|skillicons|github-readme|typing-svg/i.test(source);
    try {
      const response = await request(source);
      const mime = response.headers.get('content-type') || '';
      if (!mime.startsWith('image/')) throw new Error(`Not an image: ${source}`);
      const extension = { 'image/png': '.png', 'image/jpeg': '.jpg', 'image/webp': '.webp', 'image/gif': '.gif', 'image/svg+xml': '.svg', 'image/avif': '.avif' }[mime.split(';')[0]];
      if (!extension) throw new Error(`Unsupported image: ${mime}`);
      const digest = createHash('sha256').update(source).digest('hex').slice(0, 16);
      const local = `/github/${repo.name}/${digest}${extension}`;
      await mkdir(path.join(root, 'public/github', repo.name), { recursive: true });
      await writeFile(path.join(root, 'public', local.slice(1)), Buffer.from(await response.arrayBuffer()));
      images.set(source, local);
      if (!isBadge) entry.images.push({ src: local, alt: alt || path.posix.basename(new URL(source).pathname), source });
      return local;
    } catch (error) {
      failures.push({ repo: repo.name, resource: source, error: error.message });
      images.set(source, source);
      return source;
    }
  }
  if (readme) {
    const original = Buffer.from(readme.content, 'base64').toString('utf8');
    let markdown = original;
    const references = [...original.matchAll(/^\s*\[([^\]]+)\]:\s*<?([^\s>]+)>?/gm)];
    const referenceMap = new Map(references.map(match => [match[1].toLowerCase(), match[2]]));
    markdown = markdown.replace(/!\[([^\]]*)\]\[([^\]]*)\]/g, (match, alt, key) => {
      const target = referenceMap.get((key || alt).toLowerCase());
      return target ? `![${alt}](${target})` : match;
    });
    const visibleMarkdown = markdown.replace(/<!--[\s\S]*?-->/g, comment => ' '.repeat(comment.length));
    const matches = [...visibleMarkdown.matchAll(/!\[([^\]]*)\]\(<?([^\s)]+)>?(?:\s+"[^"]*")?\)|<img\b[^>]*\bsrc=["']([^"']+)["'][^>]*>/gi)];
    for (const match of matches) {
      const resource = match[2] || match[3];
      const local = await downloadImage(resource, match[1]);
      markdown = markdown.replace(match[0], match[0].replace(resource, local));
    }
    // Preserve links to repository files without routing them to the portfolio.
    markdown = markdown.replace(/(?<!!)\[([^\[\]]+)\]\(([^\s)]+)\)/g, (match, label, href) => {
      if (/^(https?:|mailto:|#)/i.test(href)) return match;
      const target = path.posix.normalize(`${readmeFolder}/${href}`);
      return `[${label}](https://github.com/${owner}/${repo.name}/blob/${repo.default_branch}/${target})`;
    });
    await mkdir(path.join(root, 'public/readmes'), { recursive: true });
    await writeFile(path.join(root, 'public/readmes', `${repo.name}.md`), markdown);
    await writeFile(path.join(root, 'public/readmes', `${repo.name}.source.md`), original);
    entry.readme = `/readmes/${repo.name}.md`;
  }
  const tree = await json(`${base}/git/trees/${repo.default_branch}?recursive=1`);
  if (tree.truncated) throw new Error(`Incomplete repository tree: ${repo.name}`);
  const screenshots = tree.tree.filter(file => file.type === 'blob' && /\.(png|jpe?g|webp|gif)$/i.test(file.path) && /screenshot|screenshots|captura|preview|mockup|(?:docs|readme)\/.*(?:images|img)\//i.test(file.path));
  for (const file of screenshots) await downloadImage(rawBase + file.path);
  imported.push(entry);
  console.log(`${repo.name}: README ${Boolean(readme)}, ${entry.images.length} imagens`);
}
await mkdir(path.join(root, 'src/data'), { recursive: true });
await writeFile(path.join(root, 'src/data/github-projects.json'), JSON.stringify(imported, null, 2) + '\n');
await writeFile(path.join(root, 'src/data/github-import-report.json'), JSON.stringify({ importedAt: new Date().toISOString(), failures }, null, 2) + '\n');
console.log(`Importados ${imported.length} projetos; falhas de imagens: ${failures.length}`);
