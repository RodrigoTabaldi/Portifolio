import assert from 'node:assert/strict';
import { readFile, stat } from 'node:fs/promises';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import rehypeSanitize from 'rehype-sanitize';
import rehypeSlug from 'rehype-slug';

const projects = JSON.parse(await readFile('src/data/github-projects.json', 'utf8'));
const diagrams = JSON.parse(await readFile('src/data/architecture-diagrams.json', 'utf8'));
const technologyIcons = JSON.parse(await readFile('src/data/technology-icons.json', 'utf8'));
for (const [definition, src] of Object.entries(diagrams)) {
  assert.ok(definition.trim(), 'Empty architecture definition');
  const svg = await readFile(`public${src}`, 'utf8');
  assert.ok(svg.includes('<svg') && svg.includes('viewBox='), `Invalid architecture image: ${src}`);
  assert.ok(!svg.includes('<script'), `Executable architecture image: ${src}`);
}
for (const src of Object.values(technologyIcons)) assert.ok((await stat(`public${src}`)).size > 0, `Missing technology icon: ${src}`);
const render = content => renderToStaticMarkup(createElement(Markdown, {
  remarkPlugins: [remarkGfm], rehypePlugins: [rehypeRaw, rehypeSlug, rehypeSanitize], children: content,
}));
assert.equal(new Set(projects.map(project => project.repo)).size, projects.length, 'Duplicate projects');
let readmes = 0;
let images = 0;
for (const project of projects) {
  for (const image of project.images) {
    assert.ok((await stat(`public${image.src}`)).size > 0, `Missing image: ${image.src}`);
    images++;
  }
  if (!project.readme) continue;
  const content = await readFile(`public${project.readme}`, 'utf8');
  const original = await readFile(`public/readmes/${project.repo}.source.md`, 'utf8');
  assert.ok(content.trim().length, `Empty README: ${project.repo}`);
  const headings = original.match(/^#{1,6} .+$/gm) || [];
  for (const heading of headings) assert.ok(content.includes(heading), `Lost section: ${project.repo} ${heading}`);
  const html = render(content);
  for (const block of content.matchAll(/^```mermaid\s*\r?\n([\s\S]*?)^```/gm)) {
    assert.ok(diagrams[block[1].trim()], `Architecture not rendered: ${project.repo}`);
  }
  assert.ok(html.length, `Empty rendered README: ${project.repo}`);
  for (const match of html.matchAll(/src="(\/github\/[^"?#]+)"/g)) {
    assert.ok((await stat(`public${match[1]}`)).size > 0, `Missing README image: ${match[1]}`);
  }
  readmes++;
}
const unsafe = render('<script>alert(1)</script><img src="x" onerror="alert(1)"><a href="javascript:alert(1)">click</a>');
assert.ok(!unsafe.includes('<script') && !unsafe.includes('onerror') && !unsafe.includes('javascript:'), 'Unsafe README HTML');
assert.ok(render('| Header |\n| --- |\n| Value |').includes('<table>'), 'Markdown tables must render');
assert.ok(render('## Overview').includes('id="user-content-overview"'), 'README heading links must have safe targets');
console.log(`Verified ${projects.length} projects, ${readmes} full READMEs, ${images} gallery images, local assets and HTML sanitization.`);
console.log(`Verified ${Object.keys(diagrams).length} architecture diagrams and ${Object.keys(technologyIcons).length} technology icons.`);
