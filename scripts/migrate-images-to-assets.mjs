// Migrate /public/images/{blog,courses,pages}/ → /src/assets/{blog,courses,pages}/
// Then rewrite all markdown + .astro references to use relative paths so Astro auto-optimizes.

import fs from 'node:fs';
import path from 'node:path';

const moves = [
  { from: 'public/images/blog', to: 'src/assets/blog' },
  { from: 'public/images/courses', to: 'src/assets/courses' },
  { from: 'public/images/pages', to: 'src/assets/pages' },
];

// 1) Physical move
for (const { from, to } of moves) {
  if (!fs.existsSync(from)) continue;
  fs.mkdirSync(to, { recursive: true });
  const entries = fs.readdirSync(from, { withFileTypes: true });
  let moved = 0;
  for (const e of entries) {
    if (!e.isFile()) continue;
    const src = path.join(from, e.name);
    const dst = path.join(to, e.name);
    if (fs.existsSync(dst)) {
      // Collision — overwrite to be safe; both should be the same content
      fs.copyFileSync(src, dst);
    } else {
      fs.renameSync(src, dst);
    }
    moved++;
  }
  console.log(`Moved ${moved} files: ${from} → ${to}`);
}

console.log('\nImage files moved. Run rewrite script next.');
