#!/usr/bin/env node
// One-off: replace WP-shortcode course summaries with the first real paragraph from the body.
// Usage: node scripts/clean-course-summaries.mjs
import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import yaml from 'js-yaml';

const dir = 'src/content/courses';
const files = readdirSync(dir).filter((f) => f.endsWith('.md'));

const isJunk = (s) => !s || /\[vc_/.test(s) || /^\s*summary\s*$/i.test(s) || s.trim().length < 30;

const extractFirstParagraph = (body) => {
  let clean = body;
  clean = clean.replace(/\[\/?vc_[^\]]*\]/g, '');
  clean = clean.replace(/\[\/?[a-zA-Z][a-zA-Z0-9_]*[^\]]*\]/g, '');
  clean = clean.replace(/!\[[^\]]*\]\([^)]*\)/g, '');
  clean = clean
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&#8217;/g, "'")
    .replace(/&#8220;/g, '"')
    .replace(/&#8221;/g, '"');
  clean = clean.replace(/[*_`#>]/g, '');
  const paras = clean
    .split(/\r?\n\r?\n/)
    .map((p) => p.replace(/\s+/g, ' ').trim())
    .filter((p) => p.length >= 60 && !/^[-\s]+$/.test(p));
  if (paras.length === 0) return null;
  let first = paras[0];
  if (first.length > 195) first = first.slice(0, 192).trimEnd() + '...';
  return first;
};

let fixed = 0;
let skipped = 0;
const report = [];

for (const name of files) {
  const path = join(dir, name);
  const raw = readFileSync(path, 'utf8');
  const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!m) {
    report.push(`SKIP (no frontmatter): ${name}`);
    skipped++;
    continue;
  }
  const fmRaw = m[1];
  const body = m[2];
  let fm;
  try {
    fm = yaml.load(fmRaw);
  } catch (e) {
    report.push(`SKIP (yaml error): ${name} — ${e.message}`);
    skipped++;
    continue;
  }
  if (!isJunk(fm.summary)) {
    report.push(`OK: ${name}`);
    skipped++;
    continue;
  }
  const newSummary = extractFirstParagraph(body);
  if (!newSummary) {
    report.push(`NO BODY: ${name}`);
    skipped++;
    continue;
  }
  fm.summary = newSummary;
  // Preserve field order by serializing all keys via dump's default sort=false
  const newFmRaw = yaml.dump(fm, { lineWidth: -1, noRefs: true, sortKeys: false }).trimEnd();
  const out = `---\r\n${newFmRaw}\r\n---\r\n${body}`;
  writeFileSync(path, out, 'utf8');
  fixed++;
  report.push(`FIXED: ${name} -> ${newSummary.slice(0, 90)}...`);
}

console.log(`Fixed: ${fixed}\nSkipped: ${skipped}\n`);
for (const r of report) console.log(r);
