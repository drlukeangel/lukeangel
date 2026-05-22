#!/usr/bin/env node
// Demote every markdown heading by one level (H1→H2, H2→H3, …, H5→H6).
// Skips fenced code blocks so shell comments like `# Run this` stay as-is.
// Usage: node scripts/demote-headings.mjs <file> [<file>...]

import { readFileSync, writeFileSync } from 'node:fs';

const files = process.argv.slice(2);
if (files.length === 0) {
  console.error('Usage: node scripts/demote-headings.mjs <file>...');
  process.exit(1);
}

for (const path of files) {
  const raw = readFileSync(path, 'utf8');
  const m = raw.match(/^(---\r?\n[\s\S]*?\r?\n---\r?\n?)([\s\S]*)$/);
  const head = m ? m[1] : '';
  const body = m ? m[2] : raw;

  let inFence = false;
  const out = body.split(/\r?\n/).map((line) => {
    if (/^\s{0,3}(```|~~~)/.test(line)) {
      inFence = !inFence;
      return line;
    }
    if (inFence) return line;
    const h = line.match(/^(\s{0,3})(#{1,5})( .+)$/);
    if (h) return h[1] + h[2] + '#' + h[3];
    return line;
  }).join('\r\n');

  writeFileSync(path, head + out, 'utf8');
  console.log(`Demoted: ${path}`);
}
