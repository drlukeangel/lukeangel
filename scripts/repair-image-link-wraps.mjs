// Repair `[<blank>![alt](path)<blank>](link)` blocks that an earlier inline-image
// fix mistakenly split. Re-collapse to the single-line `[![alt](path)](link)`.
//
// Safe: only touches the broken split pattern. Leaves normal block images alone.

import fs from 'node:fs';
import path from 'node:path';

const dir = 'src/content/blog';
const broken = /\[\s*\n\n(!\[[^\]]*\]\([^)]+\))\s*\n\n\]\(([^)]+)\)/g;

let totalFixed = 0;
let filesChanged = 0;

for (const f of fs.readdirSync(dir)) {
  if (!f.endsWith('.md')) continue;
  const p = path.join(dir, f);
  const txt = fs.readFileSync(p, 'utf8');
  const matches = txt.match(broken) || [];
  if (matches.length === 0) continue;
  const fixed = txt.replace(broken, (_, img, link) => `[${img}](${link})`);
  fs.writeFileSync(p, fixed);
  filesChanged++;
  totalFixed += matches.length;
  console.log(`${f}: repaired ${matches.length} image-link wrap(s)`);
}

console.log(`\n${filesChanged} files updated, ${totalFixed} image-link wraps restored.`);
