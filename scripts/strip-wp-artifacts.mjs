#!/usr/bin/env node
// Strip WordPress-export artifacts from blog post bodies. The WP exporter
// wrapped most lines in `~~...~~**` thinking it was preserving formatting;
// in markdown those marks render as literal strikethrough + orphan bold,
// turning legitimate prose into visible gibberish.
//
// Conservative transformations only. Operates on the body (post-frontmatter)
// to avoid breaking YAML.

import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const dir = 'src/content/blog';
const files = readdirSync(dir).filter((f) => f.endsWith('.md') || f.endsWith('.mdx'));

let totalTouched = 0;
let totalLinesStripped = 0;

for (const name of files) {
  const path = join(dir, name);
  const raw = readFileSync(path, 'utf8');
  const m = raw.match(/^(---\r?\n[\s\S]*?\r?\n---\r?\n?)([\s\S]*)$/);
  if (!m) continue;
  const head = m[1];
  let body = m[2];
  const before = body;
  let strippedLines = 0;

  // Normalize: split by line, transform per-line, then rejoin.
  const eol = body.includes('\r\n') ? '\r\n' : '\n';
  const lines = body.split(/\r?\n/);
  const out = [];

  for (let line of lines) {
    // 1) Drop lines that are ONLY noise: whitespace + ~~/**/~ markers only
    if (/^[\s\t]*[~*]+[\s\t]*[~*]*[\s\t]*$/.test(line) && /[~*]/.test(line)) {
      strippedLines++;
      continue;
    }
    // 2) Drop trailing tab+~ orphan lines (e.g. "\t\t\t~")
    if (/^[\s\t]+~+[\s]*$/.test(line)) {
      strippedLines++;
      continue;
    }
    // 3) Strip leading ~~ or ~~~~ (4+ tildes are never legitimate markdown).
    //    Conservative: only strip when at start of line, no other meaningful chars before.
    line = line.replace(/^(\s*)~~+/, '$1');
    // 4) Strip trailing ~~**, ~~*, **~~, ~~ at end of line — orphan close marks.
    line = line.replace(/~~+\*+\s*$/, '');
    line = line.replace(/\*+~~+\s*$/, '');
    line = line.replace(/~~+\s*$/, '');
    // 5) Collapse runs of 3+ tildes inside the line to nothing (never legitimate).
    line = line.replace(/~{3,}/g, '');
    // 6) Strip orphan ~~ that wraps an entire paragraph with no closing pair.
    //    If a line starts with ~~ and contains no other ~~ pair, remove the opening.
    if (/^~~[^~]/.test(line) && (line.match(/~~/g) || []).length === 1) {
      line = line.replace(/^~~/, '');
    }
    out.push(line);
  }

  // 7) Collapse 3+ consecutive blank lines to a single blank line
  body = out.join(eol).replace(/(?:\r?\n[\s\t]*){3,}/g, eol + eol);

  if (body !== before) {
    writeFileSync(path, head + body, 'utf8');
    totalTouched++;
    totalLinesStripped += strippedLines;
    console.log(`${name}: stripped ${strippedLines} noise lines`);
  }
}

console.log(`\nTouched ${totalTouched} files, stripped ${totalLinesStripped} lines total.`);
