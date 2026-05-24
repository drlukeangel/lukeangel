#!/usr/bin/env node
// Generate SVG cover images for every blog post / notebook / course that
// lacks one. Style follows the existing left-accent-bar + serif title
// template already established in src/assets/blog/ and src/assets/courses/.

import { readFileSync, writeFileSync, readdirSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import yaml from 'js-yaml';

const BLOG_DIR = 'src/content/blog';
const NOTEBOOK_DIR = 'src/content/notebooks';
const COURSE_DIR = 'src/content/courses';
const BLOG_ASSETS = 'src/assets/blog';
const COURSE_ASSETS = 'src/assets/courses';

const CATEGORY_ACCENT = {
  tools: '#2a52be',
  craft: '#c87533',
  teams: '#2f5e4e',
  people: '#6a4c93',
  projects: '#c14a3a',
  programs: '#357a8c',
  product: '#a07a3a',
  give: '#b8860b',
  method: '#1a4d3a',
};

const NOTEBOOK_ACCENT = {
  'connected-products': '#2a52be',
  'iot-security': '#c14a3a',
  'pet-iot-field-guide': '#c87533',
  'smart-home-iot-journey': '#6a4c93',
  'docker-ecosystem': '#357a8c',
  'pm-fundamentals': '#2a52be',
  'pm-trends': '#c87533',
  'building-medical-iot-connected-products': '#c14a3a',
  'io-t-and-connected-devices-year-in-review': '#6a4c93',
};

function escapeXml(s) {
  return String(s ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function wrapTitle(text, maxLen = 26) {
  const words = String(text || '').split(/\s+/);
  const lines = [];
  let cur = '';
  for (const w of words) {
    const next = (cur + ' ' + w).trim();
    if (next.length > maxLen && cur) {
      lines.push(cur);
      cur = w;
    } else {
      cur = next;
    }
  }
  if (cur) lines.push(cur);
  return lines.slice(0, 4);
}

function formatTopMeta(fm) {
  const cat = (fm.category || 'POST').toUpperCase();
  if (!fm.date) return cat;
  const d = new Date(fm.date);
  if (isNaN(d.getTime())) return cat;
  const months = ['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC'];
  return `${cat} — ${months[d.getMonth()]} ${d.getFullYear()}`;
}

function formatTopRight(fm) {
  if (fm.notebook) return fm.notebook.toUpperCase().replace(/-/g, ' ');
  if (Array.isArray(fm.tags) && fm.tags.length > 0) {
    return fm.tags[0].toUpperCase().replace(/-/g, ' ');
  }
  return '';
}

function pickAccent(fm) {
  if (fm.notebook && NOTEBOOK_ACCENT[fm.notebook]) return NOTEBOOK_ACCENT[fm.notebook];
  if (fm.category && CATEGORY_ACCENT[fm.category]) return CATEGORY_ACCENT[fm.category];
  return '#2a52be';
}

function generateBlogSvg(fm) {
  const accent = pickAccent(fm);
  const topLeft = escapeXml(formatTopMeta(fm));
  const topRight = escapeXml(formatTopRight(fm));
  const lines = wrapTitle(fm.title);
  const baseY = 280;
  const lineHeight = 64;
  const titleSvg = lines
    .map((line, i) =>
      `<text x="80" y="${baseY + i * lineHeight}" font-family="Newsreader, serif" font-weight="500" font-size="54" fill="#1a1d24" letter-spacing="-1">${escapeXml(line)}</text>`
    )
    .join('\n  ');
  const tagFooter = `L. ANGEL — ${escapeXml((fm.category || 'POST').toUpperCase())}${
    fm.tags && fm.tags[0] ? ' · ' + escapeXml(fm.tags[0].toUpperCase().replace(/-/g, ' ')) : ''
  }`;

  return `<?xml version="1.0"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 630" width="1200" height="630" role="img" aria-label="${escapeXml(fm.title)}">
  <rect width="1200" height="630" fill="#fdfaf2"/>
  <defs>
    <pattern id="dots" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
      <circle cx="10" cy="10" r="1" fill="#1a1d24" opacity="0.06"/>
    </pattern>
  </defs>
  <rect width="1200" height="630" fill="url(#dots)"/>
  <rect x="0" y="0" width="24" height="630" fill="${accent}"/>
  <text x="80" y="92" font-family="ui-monospace, 'JetBrains Mono', monospace" font-size="20" letter-spacing="6" fill="#7a808c">${topLeft}</text>
  <text x="1120" y="92" font-family="ui-monospace, 'JetBrains Mono', monospace" font-size="20" letter-spacing="6" fill="${accent}" text-anchor="end">${topRight}</text>
  <line x1="80" y1="120" x2="1120" y2="120" stroke="#1a1d24" stroke-width="2"/>
  ${titleSvg}
  <line x1="80" y1="490" x2="1120" y2="490" stroke="#1a1d24" stroke-width="2"/>
  <text x="80" y="540" font-family="ui-monospace, 'JetBrains Mono', monospace" font-size="14" letter-spacing="3" fill="#7a808c">${tagFooter}</text>
</svg>
`;
}

function generateNotebookSvg(fm, slug) {
  const accent = NOTEBOOK_ACCENT[slug] || fm.accent || '#2a52be';
  const lines = wrapTitle(fm.title, 22);
  const baseY = 280;
  const lineHeight = 76;
  const titleSvg = lines
    .map((line, i) =>
      `<text x="80" y="${baseY + i * lineHeight}" font-family="Newsreader, serif" font-weight="500" font-size="62" fill="#1a1d24" letter-spacing="-1">${escapeXml(line)}</text>`
    )
    .join('\n  ');
  return `<?xml version="1.0"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 630" width="1200" height="630" role="img" aria-label="${escapeXml(fm.title)}">
  <rect width="1200" height="630" fill="#fdfaf2"/>
  <defs>
    <pattern id="dots" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
      <circle cx="10" cy="10" r="1" fill="#1a1d24" opacity="0.06"/>
    </pattern>
  </defs>
  <rect width="1200" height="630" fill="url(#dots)"/>
  <rect x="0" y="0" width="24" height="630" fill="${accent}"/>
  <text x="80" y="92" font-family="ui-monospace, 'JetBrains Mono', monospace" font-size="20" letter-spacing="6" fill="#7a808c">NOTEBOOK</text>
  <text x="1120" y="92" font-family="ui-monospace, 'JetBrains Mono', monospace" font-size="20" letter-spacing="6" fill="${accent}" text-anchor="end">${escapeXml(slug.toUpperCase().replace(/-/g, ' '))}</text>
  <line x1="80" y1="120" x2="1120" y2="120" stroke="#1a1d24" stroke-width="2"/>
  ${titleSvg}
  <line x1="80" y1="490" x2="1120" y2="490" stroke="#1a1d24" stroke-width="2"/>
  <text x="80" y="540" font-family="ui-monospace, 'JetBrains Mono', monospace" font-size="14" letter-spacing="3" fill="#7a808c">LUKEANGEL.CO — NOTEBOOK</text>
</svg>
`;
}

function generateCourseSvg(fm, slug) {
  const accent = '#2a52be';
  const lines = wrapTitle(fm.title, 24);
  const baseY = 320;
  const lineHeight = 70;
  const titleSvg = lines
    .map((line, i) =>
      `<text x="80" y="${baseY + i * lineHeight}" font-family="Newsreader, serif" font-weight="500" font-size="60" fill="#1a1d24" letter-spacing="-1">${escapeXml(line)}</text>`
    )
    .join('\n  ');
  const orderLabel = fm.order ? `№ ${String(fm.order).padStart(2, '0')}` : 'COURSE';
  return `<?xml version="1.0"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 630" width="1200" height="630" role="img" aria-label="${escapeXml(fm.title)}">
  <rect width="1200" height="630" fill="#fdfaf2"/>
  <defs>
    <pattern id="dots" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
      <circle cx="10" cy="10" r="1" fill="#1a1d24" opacity="0.06"/>
    </pattern>
  </defs>
  <rect width="1200" height="630" fill="url(#dots)"/>
  <rect x="0" y="0" width="24" height="630" fill="${accent}"/>
  <text x="80" y="100" font-family="ui-monospace, 'JetBrains Mono', monospace" font-size="22" letter-spacing="6" fill="#7a808c">COURSE</text>
  <text x="1120" y="100" font-family="ui-monospace, 'JetBrains Mono', monospace" font-size="22" letter-spacing="6" fill="${accent}" text-anchor="end">${escapeXml(orderLabel)}</text>
  <line x1="80" y1="120" x2="1120" y2="120" stroke="#1a1d24" stroke-width="2"/>
  ${titleSvg}
  <line x1="80" y1="560" x2="1120" y2="560" stroke="#1a1d24" stroke-width="2"/>
  <text x="80" y="600" font-family="Newsreader, serif" font-weight="500" font-size="22" fill="#1a1d24">Luke Angel</text>
  <text x="1120" y="600" font-family="ui-monospace, 'JetBrains Mono', monospace" font-size="14" letter-spacing="2" fill="#7a808c" text-anchor="end">LUKEANGEL.CO / COURSES</text>
</svg>
`;
}

function injectCoverField(rawFm, coverPathRelative, coverAlt) {
  // Append cover + coverAlt lines to existing frontmatter YAML text.
  const trimmed = rawFm.trimEnd();
  const safeAlt = String(coverAlt).replace(/"/g, '\\"');
  return `${trimmed}\ncover: "${coverPathRelative}"\ncoverAlt: "${safeAlt}"`;
}

function processCollection(dir, kind, assetDir, relPrefix, generator) {
  if (!existsSync(dir)) return 0;
  const files = readdirSync(dir).filter((f) => f.endsWith('.md') || f.endsWith('.mdx'));
  let count = 0;
  for (const name of files) {
    const path = join(dir, name);
    const raw = readFileSync(path, 'utf8');
    const m = raw.match(/^(---\r?\n)([\s\S]*?)(\r?\n---\r?\n?)([\s\S]*)$/);
    if (!m) continue;
    let fm;
    try {
      fm = yaml.load(m[2]);
    } catch {
      console.warn(`yaml parse failed: ${name}`);
      continue;
    }
    if (!fm || fm.cover) continue;

    const slug = name.replace(/\.(md|mdx)$/, '');
    const coverName = `${slug}-cover.svg`;
    const coverPath = join(assetDir, coverName);
    if (existsSync(coverPath)) {
      // file exists but post doesn't reference it — wire up anyway
    }

    const svg = generator(fm, slug);
    writeFileSync(coverPath, svg, 'utf8');

    const coverRelPath = `${relPrefix}${coverName}`;
    const altText = fm.title || slug;
    const newFm = injectCoverField(m[2], coverRelPath, altText);
    writeFileSync(path, m[1] + newFm + m[3] + m[4], 'utf8');

    count++;
  }
  return count;
}

const blogCount = processCollection(
  BLOG_DIR,
  'blog',
  BLOG_ASSETS,
  '../../assets/blog/',
  generateBlogSvg
);
const notebookCount = processCollection(
  NOTEBOOK_DIR,
  'notebook',
  BLOG_ASSETS,
  '../../assets/blog/',
  generateNotebookSvg
);
const courseCount = processCollection(
  COURSE_DIR,
  'course',
  COURSE_ASSETS,
  '../../assets/courses/',
  generateCourseSvg
);

console.log(`blog: ${blogCount}, notebooks: ${notebookCount}, courses: ${courseCount}`);
console.log(`total covers generated: ${blogCount + notebookCount + courseCount}`);
