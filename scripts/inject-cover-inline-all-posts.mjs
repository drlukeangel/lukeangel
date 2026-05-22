#!/usr/bin/env node
// For every blog post with a cover but no inline body images, inject the cover
// as an inline image after the first body paragraph. Skips files that already
// have at least one inline image.
import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import yaml from 'js-yaml';

const dir = 'src/content/blog';
const files = readdirSync(dir).filter((f) => f.endsWith('.md') || f.endsWith('.mdx'));

let fixed = 0;
for (const name of files) {
  const path = join(dir, name);
  const raw = readFileSync(path, 'utf8');
  const m = raw.match(/^(---\r?\n)([\s\S]*?)(\r?\n---\r?\n?)([\s\S]*)$/);
  if (!m) continue;
  let fm;
  try { fm = yaml.load(m[2]); } catch { continue; }
  if (!fm?.cover) continue;
  const body = m[4];
  // Skip if body already has any inline image
  if (/!\[[^\]]*\]\(/.test(body)) continue;

  const altText = fm.coverAlt || fm.title || 'Post image';
  const safeAlt = String(altText).replace(/[\[\]]/g, '');
  const inline = `\n![${safeAlt}](${fm.cover})\n`;

  // Insert after first non-empty paragraph
  const lines = body.split(/\r?\n/);
  let inserted = false;
  const out = [];
  let firstParaSeen = false;
  for (let i = 0; i < lines.length; i++) {
    out.push(lines[i]);
    // Identify end of first paragraph: a non-empty line followed by an empty line
    if (!inserted && lines[i].trim() !== '' && (lines[i + 1] === undefined || lines[i + 1].trim() === '')) {
      if (firstParaSeen) {
        // skip — only insert after THE FIRST paragraph
      } else {
        // After first paragraph
        out.push('');
        out.push(`![${safeAlt}](${fm.cover})`);
        inserted = true;
      }
      firstParaSeen = true;
    }
  }
  if (!inserted) continue;
  const newBody = out.join('\r\n');
  writeFileSync(path, m[1] + m[2] + m[3] + newBody, 'utf8');
  fixed++;
  console.log(`injected cover: ${name}`);
}
console.log(`Done: ${fixed}`);
