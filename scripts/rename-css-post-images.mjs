#!/usr/bin/env node
// One-off: rename the 15 hash-named CSS post-it images to descriptive filenames,
// and rewrite the post's markdown so every image reference uses (a) the new URL
// and (b) a context-aware alt derived from what's actually on the post-it plus the
// section heading that introduces it.

import { readFileSync, writeFileSync, renameSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';

const imageDir = 'public/blog/migrated/2016/09';
const post = 'src/content/blog/learn-css-in-16-post-it-notes.md';

// [oldBasename, newBasename, alt]
const mapping = [
  ['1_tWr6PETyR0OwGJMKtopNkA_001.png',
   'css-cascading-inheritance-postit.png',
   'Hand-drawn post-it note titled CASCADING STYLE SHEETS with arrows below illustrating CSS inheritance and ancestor-descendant relationships'],
  ['1_-OQSvC07kme6PbQlLMA2vQ.png',
   'css-key-value-pairs-postit.png',
   'Post-it note titled KEY VALUE PAIRS showing HTML angle-bracket tags on the left paired with CSS curly-brace selectors on the right'],
  ['1_ukbN78VNJkxSt7kFwIcLig.png',
   'css-website-layout-divs-postit.png',
   'Post-it note titled WEBSITE showing a layout broken into colored block divs — a sidebar of three squares, a main content area, and a wide footer'],
  ['1-zqQA6OtQbJv4cbIF33QdCw.png',
   'css-tree-structure-body-divs-postit.png',
   'Post-it note diagramming the same website as a DOM tree — a BODY element branching into nested DIV children, labeled "same website"'],
  ['1-P0X9RYYgHA5YYB5JBB34AQ.png',
   'css-display-block-vs-inline-postit.png',
   'Post-it note titled DISPLAY showing a full-width BLOCK element above a narrow INLINE element on a colored sticky'],
  ['1-jhwKfvknbXf8SaT2Q9fVPw.png',
   'css-display-inline-block-grid-postit.png',
   'Post-it note titled DISPLAY: INLINE-BLOCK showing a uniform 3×3 grid of orange squares — illustrating inline-block elements with width and height'],
  ['1-vqkvd_6WRSpnHFS4VgfxYw.png',
   'css-box-model-margin-border-padding-content-postit.png',
   'Post-it note titled BOX MODEL with concentric nested colored boxes labeled MARGIN, BORDER, PADDING, and CONTENT'],
  ['1-qtTO5lquCptRDkZ3jfiZGQ.png',
   'css-margins-outside-arrows-postit.png',
   'Post-it note labeled MARGINS with arrows pointing outward in all eight directions, showing how margins push away from an element'],
  ['1-JxmE8oPpJaIDvzohARVoEQ.png',
   'css-padding-inside-arrows-postit.png',
   'Post-it note labeled PADDING with arrows pointing inward toward a CONTENT block, showing how padding pushes inward on content'],
  ['1-rlc-Ccon3x0Jhb0pGsJtSA.png',
   'css-margin-auto-centering-postit.png',
   'Post-it note labeled MARGIN: AUTO with horizontal arrows showing equal space on the left and right of a centered blue block'],
  ['1-aMwjNnCQrG8dZ0uS7K5lEA.png',
   'css-max-width-narrow-block-postit.png',
   'Post-it note labeled MAX-WIDTH showing a narrow blue block constrained inside a wider green sticky — illustrating max-width capping element size'],
  ['1-oWCUvy2oHzi56nIzMDOR8w.png',
   'css-position-relative-absolute-parent-child-postit.png',
   'Post-it note explaining CSS position: PARENT set to RELATIVE and CHILD set to ABSOLUTE, with a note that BODY is parent by default'],
  ['1-cM8r7a_7VDd9AtGEJm_GoQ.png',
   'css-float-image-text-wrap-postit.png',
   'Post-it note labeled FLOAT showing a red IMG block on the right with handwritten "bunch of text" wrapping around it on the left and below'],
  ['1-OC8oPisveckrnz4LyLV62w.png',
   'css-position-fixed-scroll-postit.png',
   'Post-it note labeled POSITION with SCROLL arrows up and down, and a yellow sticky labeled FIXED that stays anchored — illustrating position: fixed'],
  ['1-0Le9AX2zcYDgQ5-N3WIeA.png',
   'css-unlinked-stylesheet-crumpled-postit.png',
   "A crumpled green post-it note on marble — a visual joke about how your site looks when you forget to link your CSS stylesheet in the HTML head"],
];

// 1. Rename files on disk
let renamed = 0;
for (const [oldName, newName] of mapping) {
  const oldPath = join(imageDir, oldName);
  const newPath = join(imageDir, newName);
  if (!existsSync(oldPath)) {
    console.warn(`SKIP (missing): ${oldName}`);
    continue;
  }
  if (existsSync(newPath)) {
    console.warn(`SKIP (target exists): ${newName}`);
    continue;
  }
  renameSync(oldPath, newPath);
  renamed++;
}
console.log(`Renamed: ${renamed}/${mapping.length} files`);

// 2. Rewrite markdown
let md = readFileSync(post, 'utf8');
for (const [oldName, newName, alt] of mapping) {
  const oldUrl = `/blog/migrated/2016/09/${oldName}`;
  const newUrl = `/blog/migrated/2016/09/${newName}`;
  // Replace inner markdown image reference: `![<anything>](oldUrl)` → `![alt](newUrl)`
  const re = new RegExp(`!\\[[^\\]]*\\]\\(${oldUrl.replace(/[.*+?^${}()|[\\]\\\\]/g, '\\\\$&')}\\)`, 'g');
  md = md.replace(re, `![${alt}](${newUrl})`);
  // Also swap any plain-link references to the same path (e.g., the trailing crumpled-paper link)
  md = md.split(oldUrl).join(newUrl);
}
writeFileSync(post, md, 'utf8');
console.log('Markdown rewritten.');
