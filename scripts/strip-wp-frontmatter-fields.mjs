// Remove legacy wpUrl: and wpCategory: lines from every content collection .md
// frontmatter block. They were kept during the WP→Astro migration as potential
// inputs to 301 redirects; user confirmed no redirects are needed.

import fs from 'node:fs';
import path from 'node:path';

const dirs = ['src/content/blog', 'src/content/courses'];
const wpLine = /^(wpUrl|wpCategory):\s*.*\r?\n/gm;

let totalRemoved = 0;
let filesChanged = 0;
for (const dir of dirs) {
  for (const f of fs.readdirSync(dir)) {
    if (!f.endsWith('.md')) continue;
    const p = path.join(dir, f);
    const txt = fs.readFileSync(p, 'utf8');
    // Only operate inside the leading frontmatter block.
    const m = txt.match(/^(---\r?\n[\s\S]*?\r?\n---)([\s\S]*)$/);
    if (!m) continue;
    const front = m[1];
    const rest = m[2];
    const removals = (front.match(wpLine) || []).length;
    if (removals === 0) continue;
    const cleaned = front.replace(wpLine, '');
    fs.writeFileSync(p, cleaned + rest);
    filesChanged++;
    totalRemoved += removals;
  }
}
console.log(`Removed ${totalRemoved} legacy wpUrl/wpCategory lines across ${filesChanged} files.`);
