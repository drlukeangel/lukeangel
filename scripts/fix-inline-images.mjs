// Fix mid-paragraph inline image embeddings that break Markdoc.
//
// Pattern A: text directly followed by image — `clothes.![alt](url)`
//   → `clothes.\n\n![alt](url)\n\n`
// Pattern B: image directly followed by text — `](url)the side`
//   → `](url)\n\nthe side`
//
// Markdoc requires images to be on their own block (preceded and followed
// by blank lines) or properly separated by whitespace. WP migrations often
// jammed images into running prose.
//
// Safe: this only adds whitespace; never removes content.

import fs from 'node:fs';
import path from 'node:path';

const dir = 'src/content/blog';
let totalFixed = 0;
let filesChanged = 0;

for (const f of fs.readdirSync(dir)) {
  if (!f.endsWith('.md')) continue;
  const p = path.join(dir, f);
  let txt = fs.readFileSync(p, 'utf8');
  const before = txt;

  // Pattern A: <text-char>![alt](url)
  //   Add blank line break before the image when text precedes it.
  //   EXCLUDE `[` — that means image is wrapped in a link `[![alt](url)](href)`,
  //   which is valid markdown and must be left alone.
  txt = txt.replace(
    /([^\s\n\[])(!\[[^\]]*\]\([^)]+\))/g,
    (m, before, img) => `${before}\n\n${img}`
  );

  // Pattern B: ](url) followed by non-whitespace non-punctuation char
  //   Add blank line break AFTER the image. EXCLUDE `]` and `)` — those mean
  //   the image is inside a link or other valid bracketed structure.
  txt = txt.replace(
    /(!\[[^\]]*\]\([^)]+\))([^\s\n.,;:!?\)\]])/g,
    (m, img, after) => `${img}\n\n${after}`
  );

  // Collapse triple+ newlines
  txt = txt.replace(/\n{3,}/g, '\n\n');

  if (txt !== before) {
    fs.writeFileSync(p, txt);
    filesChanged++;
    // approximate count: diff length / 2 (each replacement adds 2 newlines)
    const diff = txt.length - before.length;
    totalFixed += Math.round(diff / 2);
  }
}

console.log(`Files updated: ${filesChanged}, approx ${totalFixed} fixes.`);
