#!/usr/bin/env node
// For each new-course post, inject an inline body image right after the frontmatter
// using the cover + coverAlt from the frontmatter. Avoids duplicates if one already exists.
import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import yaml from 'js-yaml';

const dir = 'src/content/blog';
const files = readdirSync(dir).filter((f) => f.startsWith('new-course-') && f.endsWith('.md'));

let fixed = 0;
for (const name of files) {
  const path = join(dir, name);
  const raw = readFileSync(path, 'utf8');
  const m = raw.match(/^(---\r?\n)([\s\S]*?)(\r?\n---\r?\n?)([\s\S]*)$/);
  if (!m) continue;
  const fm = yaml.load(m[2]);
  if (!fm?.cover) continue;
  const body = m[4];
  // Already has any inline image? Skip.
  if (/!\[[^\]]*\]\(\/images\//.test(body)) continue;
  // Otherwise inject cover image right after the first paragraph
  const altText = fm.coverAlt || fm.title || 'Course cover';
  const inline = `\n![${altText}](${fm.cover})\n`;
  // Insert after the first standalone paragraph (the lead)
  const newBody = body.replace(
    /^(\s*\r?\n)([^\n]+(?:\r?\n[^\n]+)*?)(\r?\n\r?\n)/,
    (full, lead, p1, br) => `${lead}${p1}${br}${inline}\n`
  );
  if (newBody === body) continue;
  writeFileSync(path, m[1] + m[2] + m[3] + newBody, 'utf8');
  fixed++;
  console.log(`added inline cover: ${name}`);
}
console.log(`Done: ${fixed}`);
