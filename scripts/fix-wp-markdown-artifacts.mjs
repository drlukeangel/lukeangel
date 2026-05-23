// Fix WordPress migration artifacts that break Markdoc parsing in Keystatic.
//
// Patterns found in the corpus:
//   1) ![alt](file:///C:/Users/...) — clipboard temp-file image refs
//   2) ~~[~~text~~](url)~~  — malformed strikethrough wrapping a link
//   3) ~~[~~text~~](url)    — half-malformed variant
//   4) Empty heading lines  — `## ` followed by nothing
//   5) Trailing orphan `**` at end of lines (stray bold-open with no close)
//
// Astro's markdown renderer is forgiving and renders these as gibberish on
// the live site. Keystatic's Markdoc-based editor refuses to open the file
// when it hits any of these. Cleaning them fixes both.

import fs from 'node:fs';
import path from 'node:path';

const dir = 'src/content/blog';

const stats = {
  files: 0,
  fileImg: 0,
  brokenStrike: 0,
  emptyHeading: 0,
  trailingBold: 0,
  wpAttrChunk: 0,
};

// 1) image with file:/// URL (clipboard temp files) — delete the whole image.
//    Alt text may span multiple lines but MUST NOT contain `]` (otherwise the
//    regex over-matches into the next image and deletes huge swaths). [^\]]
//    allows newlines but stops at the next bracket.
const fileProtocolImg = /!\[[^\]]*\]\(file:\/\/\/[^)]+\)/g;

// 2) ~~[~~text~~](url)~~  — full malformed strike-link → [text](url)
const brokenStrike1 = /~~\[~~([^\]\n]+?)~~\]\(([^)]+)\)~~/g;
// 3) ~~[~~text~~](url)    — half malformed → [text](url)
const brokenStrike2 = /~~\[~~([^\]\n]+?)~~\]\(([^)]+)\)/g;

// 4) empty heading line — heading marker with whitespace-only content
const emptyHeading = /^#{1,6}\s*$/gm;

// 5) trailing orphan ** at end of a line where there's no matching open
//    (heuristic: line ends with `**` but the line has an odd count of **).
function fixTrailingBold(txt) {
  return txt.split('\n').map((line) => {
    if (!line.endsWith('**')) return line;
    const count = (line.match(/\*\*/g) || []).length;
    if (count % 2 === 1) {
      stats.trailingBold++;
      return line.replace(/\*\*\s*$/, '');
    }
    return line;
  }).join('\n');
}

// Existing leftover WP <img> attribute chunks (in case the prior pass missed any).
// CRLF-tolerant: allow \r? on each newline so Windows line endings work too.
const wpAttrChunk = /\[[^\]\n]*\r?\n\r?\n"\s*data-medium-file="[\s\S]*?\/>\]\([^)]+\)/g;

for (const f of fs.readdirSync(dir)) {
  if (!f.endsWith('.md')) continue;
  const p = path.join(dir, f);
  let txt = fs.readFileSync(p, 'utf8');
  const before = txt;

  const c1 = (txt.match(fileProtocolImg) || []).length; stats.fileImg += c1;
  txt = txt.replace(fileProtocolImg, '');

  const c2a = (txt.match(brokenStrike1) || []).length;
  txt = txt.replace(brokenStrike1, '[$1]($2)');
  const c2b = (txt.match(brokenStrike2) || []).length;
  txt = txt.replace(brokenStrike2, '[$1]($2)');
  stats.brokenStrike += c2a + c2b;

  const c3 = (txt.match(emptyHeading) || []).length; stats.emptyHeading += c3;
  txt = txt.replace(emptyHeading, '');

  const c4 = (txt.match(wpAttrChunk) || []).length; stats.wpAttrChunk += c4;
  txt = txt.replace(wpAttrChunk, '');

  txt = fixTrailingBold(txt);

  // Collapse runs of 3+ blank lines to 2
  txt = txt.replace(/\n{3,}/g, '\n\n');

  if (txt !== before) {
    fs.writeFileSync(p, txt);
    stats.files++;
  }
}

console.log(`Files updated: ${stats.files}`);
console.log(`  file:/// image refs removed: ${stats.fileImg}`);
console.log(`  broken ~~[~~..~~](..)~~ patterns fixed: ${stats.brokenStrike}`);
console.log(`  empty heading lines removed: ${stats.emptyHeading}`);
console.log(`  trailing orphan ** removed: ${stats.trailingBold}`);
console.log(`  WP <img> attribute chunks removed: ${stats.wpAttrChunk}`);
