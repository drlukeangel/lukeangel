// Strip leftover WordPress image-export artifacts that broke into malformed
// markdown link syntax during the original migration.
//
// Pattern: opens with `[<alt text>` on one line, blank line, then raw HTML
// attributes starting with `"` and containing `data-medium-file=`, followed
// later by `/>](url)`. Markdoc can't parse this — Keystatic refuses to load
// the file. We replace the whole multi-line chunk with a blank line.

import fs from 'node:fs';
import path from 'node:path';

const dir = 'src/content/blog';
const broken = /\[[^\]\n]*\n\n"\s*data-medium-file="[\s\S]*?\/>\]\([^)]+\)/g;

let changed = 0;
let totalRemovals = 0;
for (const f of fs.readdirSync(dir)) {
  if (!f.endsWith('.md')) continue;
  const p = path.join(dir, f);
  const txt = fs.readFileSync(p, 'utf8');
  const matches = txt.match(broken) || [];
  if (matches.length === 0) continue;
  const cleaned = txt.replace(broken, '');
  // Collapse 3+ blank lines down to 2
  const final = cleaned.replace(/\n{3,}/g, '\n\n');
  fs.writeFileSync(p, final);
  console.log(`${f}: removed ${matches.length} broken chunk(s)`);
  changed++;
  totalRemovals += matches.length;
}
console.log(`\n${changed} files updated, ${totalRemovals} broken chunks removed.`);
