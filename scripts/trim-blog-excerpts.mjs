#!/usr/bin/env node
// Trim blog `excerpt` frontmatter to <=195 chars so seo-graph stops warning.
// Trims on word boundary, ends with "…" if shortened. Also decodes double-encoded
// HTML entities that the WP exporter introduced (e.g. &#38;#8217; → '), which is
// where most of the over-length bytes come from.

import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import yaml from 'js-yaml';

const dir = 'src/content/blog';
const files = readdirSync(dir).filter((f) => f.endsWith('.md') || f.endsWith('.mdx'));

const decodeEntities = (s) => {
  if (!s) return s;
  return s
    // un-double-encode: &#38;#NNNN; → &#NNNN;
    .replace(/&#38;#(\d+);/g, (_, n) => String.fromCharCode(parseInt(n, 10)))
    // standard numeric entities
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(parseInt(n, 10)))
    // common named entities
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#?x?2019;/gi, "'")
    .replace(/&#?x?2018;/gi, "'");
};

const trimSmart = (s, max) => {
  if (s.length <= max) return s;
  const cut = s.slice(0, max - 1);
  const lastSpace = cut.lastIndexOf(' ');
  const safe = lastSpace > max - 30 ? cut.slice(0, lastSpace) : cut;
  return safe.replace(/[,;:.\-–—\s]+$/, '') + '…';
};

let fixed = 0;
let skipped = 0;
const report = [];

for (const name of files) {
  const path = join(dir, name);
  const raw = readFileSync(path, 'utf8');
  const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!m) { skipped++; continue; }
  let fm;
  try { fm = yaml.load(m[1]); } catch { skipped++; continue; }
  if (!fm?.excerpt) { skipped++; continue; }

  const decoded = decodeEntities(fm.excerpt);
  const trimmed = trimSmart(decoded, 195);

  if (trimmed === fm.excerpt) { skipped++; continue; }
  fm.excerpt = trimmed;

  const newFm = yaml.dump(fm, { lineWidth: -1, noRefs: true, sortKeys: false }).trimEnd();
  const out = `---\r\n${newFm}\r\n---\r\n${m[2]}`;
  writeFileSync(path, out, 'utf8');
  fixed++;
  report.push(`${name} (${decoded.length} -> ${trimmed.length})`);
}

console.log(`Fixed: ${fixed}, Skipped: ${skipped}`);
for (const r of report.slice(0, 30)) console.log('  ' + r);
if (report.length > 30) console.log(`  ... and ${report.length - 30} more`);
