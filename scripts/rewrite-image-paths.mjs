// Rewrite all /images/{blog,courses,pages}/foo.png references.
//
// Strategy:
// - Body images in markdown (inside src/content/**/*.md) → relative paths from the .md
//   so Astro processes them at build time and emits optimized WebP/AVIF + responsive srcsets.
// - Frontmatter `cover:` paths in markdown → relative paths too (the schema will be updated
//   to use image() so Astro processes them).
// - .astro templates that hardcode /images/... → resolved imports.
// - .astro templates that take a string cover and feed <img src=...> → need the Image component
//   wired separately; this script just rewrites the path strings.

import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const oldRoot = '/images';
const newRootRel = '../../assets'; // from src/content/{blog,courses,...}/foo.md
const newRootAbs = '/src/assets';  // for sanity

// Walk a directory recursively
function* walk(dir) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) yield* walk(p);
    else yield p;
  }
}

// --- Step 1: Rewrite markdown files ---
let mdChanged = 0;
let mdHits = 0;
for (const f of walk('src/content')) {
  if (!f.endsWith('.md')) continue;
  let txt = fs.readFileSync(f, 'utf8');
  const before = txt;
  // Body and frontmatter both: /images/blog/foo.png → ../../assets/blog/foo.png
  txt = txt.replace(/(["'(\s])\/images\/(blog|courses|pages)\//g, `$1${newRootRel}/$2/`);
  if (txt !== before) {
    fs.writeFileSync(f, txt);
    mdChanged++;
    mdHits += (before.match(/\/images\/(blog|courses|pages)\//g) || []).length;
  }
}
console.log(`Rewrote ${mdHits} references in ${mdChanged} markdown files.`);

// --- Step 2: Rewrite .astro / .ts / .tsx / .mjs files ---
// These pass the cover string to <img src={post.data.cover}>. The string lives in frontmatter,
// already rewritten. Templates that hardcode an /images/... path get rewritten here.
let astroChanged = 0;
let astroHits = 0;
const srcDirs = ['src/pages', 'src/layouts', 'src/components'];
for (const dir of srcDirs) {
  if (!fs.existsSync(dir)) continue;
  for (const f of walk(dir)) {
    if (!/\.(astro|ts|tsx|mjs|js)$/.test(f)) continue;
    let txt = fs.readFileSync(f, 'utf8');
    const before = txt;
    // Default OG image path stays in /images/pages/... but those files moved. We'll keep
    // serving the og.png from a NEW /public/og.png location separately.
    txt = txt.replace(/\/images\/(blog|courses|pages)\//g, `${newRootAbs}/$1/`);
    if (txt !== before) {
      // Only commit the rewrite if the file uses an image-component pattern;
      // otherwise these will need manual review. For now: keep as-is and let next step handle.
      // BUT a path like "/images/pages/og.png" inside Base.astro is for OG image meta tag
      // and CAN be a public path — only public paths work for og:image in social previews.
      // So we DON'T want to rewrite those. Revert.
      txt = before;
    }
    if (txt !== before) {
      fs.writeFileSync(f, txt);
      astroChanged++;
      astroHits += (before.match(/\/images\/(blog|courses|pages)\//g) || []).length;
    }
  }
}
console.log(`Rewrote ${astroHits} references in ${astroChanged} template files.`);
