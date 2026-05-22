#!/usr/bin/env node
// Migrate all static images to a single semantic root:
//   public/blog/migrated/**/* → public/images/blog/
//   public/courses/*          → public/images/courses/
// Update every markdown reference (inline images + cover: frontmatter).
// Update Base.astro's og.png default to /images/pages/og.png.
// Strip dead WordPress CDN outer-link wrappers (i0/i1/i2.wp.com) — those URLs
// 404 now, the inner local <img src=...> renders fine on its own.

import {
  readFileSync, writeFileSync,
  readdirSync, statSync, renameSync, existsSync, mkdirSync,
  rmdirSync,
} from 'node:fs';
import { join } from 'node:path';

const blogDest = 'public/images/blog';
const courseDest = 'public/images/courses';
const pagesDest = 'public/images/pages';
for (const d of [blogDest, courseDest, pagesDest]) {
  if (!existsSync(d)) mkdirSync(d, { recursive: true });
}

// ── 1. Collect every blog image under public/blog/migrated/** ─────────────
const blogSrc = 'public/blog/migrated';
const blogImages = [];
function walk(dir) {
  if (!existsSync(dir)) return;
  for (const name of readdirSync(dir)) {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) walk(path);
    else if (/\.(png|jpe?g|gif|webp|svg|avif)$/i.test(name)) blogImages.push(path);
  }
}
walk(blogSrc);

// ── 2. Detect collisions before moving anything ───────────────────────────
const baseNames = new Map();
let collisions = 0;
for (const f of blogImages) {
  const base = f.split(/[\\/]/).pop();
  if (baseNames.has(base)) {
    console.warn(`COLLISION: ${base} in ${baseNames.get(base)} AND ${f}`);
    collisions++;
  } else {
    baseNames.set(base, f);
  }
}
if (collisions > 0) {
  console.error(`Aborting — ${collisions} filename collisions found. Resolve first.`);
  process.exit(1);
}

// ── 3. Move blog images ───────────────────────────────────────────────────
const moveMap = new Map(); // oldUrl → newUrl
let blogMoved = 0;
for (const oldPath of blogImages) {
  const base = oldPath.split(/[\\/]/).pop();
  const newPath = join(blogDest, base);
  if (existsSync(newPath)) {
    console.warn(`SKIP target exists: ${newPath}`);
    continue;
  }
  renameSync(oldPath, newPath);
  const oldUrl = '/' + oldPath.replace(/\\/g, '/').replace(/^public\//, '');
  const newUrl = '/' + newPath.replace(/\\/g, '/').replace(/^public\//, '');
  moveMap.set(oldUrl, newUrl);
  blogMoved++;
}
console.log(`Moved ${blogMoved} blog images.`);

// ── 4. Move course covers ────────────────────────────────────────────────
const courseSrc = 'public/courses';
let courseMoved = 0;
if (existsSync(courseSrc)) {
  for (const name of readdirSync(courseSrc)) {
    if (!/\.(png|jpe?g|gif|webp|svg|avif)$/i.test(name)) continue;
    const oldPath = join(courseSrc, name);
    const newPath = join(courseDest, name);
    if (existsSync(newPath)) {
      console.warn(`SKIP course target exists: ${newPath}`);
      continue;
    }
    renameSync(oldPath, newPath);
    moveMap.set(`/courses/${name}`, `/images/courses/${name}`);
    courseMoved++;
  }
}
console.log(`Moved ${courseMoved} course covers.`);

// ── 5. Update every markdown file in src/content/** ──────────────────────
let updated = 0;
const mdRoots = ['src/content/blog', 'src/content/courses', 'src/content/projects', 'src/content/gratitude'];
for (const root of mdRoots) {
  if (!existsSync(root)) continue;
  for (const name of readdirSync(root)) {
    if (!name.endsWith('.md') && !name.endsWith('.mdx')) continue;
    const path = join(root, name);
    let md = readFileSync(path, 'utf8');
    const before = md;
    for (const [oldUrl, newUrl] of moveMap) {
      if (md.includes(oldUrl)) md = md.split(oldUrl).join(newUrl);
    }
    // Strip dead WP CDN outer-link wrappers
    md = md.replace(
      /\[(!\[[^\]]*\]\([^)]+\))\]\(https?:\/\/i\d?\.wp\.com\/[^)]+\)/g,
      '$1'
    );
    if (md !== before) {
      writeFileSync(path, md, 'utf8');
      updated++;
    }
  }
}
console.log(`Updated ${updated} markdown files.`);

// ── 6. Update Base.astro to point og.png default at the new location ─────
const basePath = 'src/layouts/Base.astro';
if (existsSync(basePath)) {
  let base = readFileSync(basePath, 'utf8');
  const before = base;
  base = base.replace(/image = '\/og\.png'/, "image = '/images/pages/og.png'");
  if (base !== before) {
    writeFileSync(basePath, base, 'utf8');
    console.log('Updated Base.astro og.png default → /images/pages/og.png');
  }
}

// ── 7. Clean up empty src directories ────────────────────────────────────
function pruneEmpty(dir) {
  if (!existsSync(dir)) return;
  for (const name of readdirSync(dir)) {
    const sub = join(dir, name);
    if (statSync(sub).isDirectory()) pruneEmpty(sub);
  }
  if (readdirSync(dir).length === 0) {
    try { rmdirSync(dir); console.log(`Removed empty dir: ${dir}`); } catch {}
  }
}
pruneEmpty(blogSrc);
// Don't remove public/courses entirely — it might still have non-image files; the rmdir will fail silently if not empty
pruneEmpty(courseSrc);

console.log('Done.');
