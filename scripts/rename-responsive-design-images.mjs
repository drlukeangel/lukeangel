#!/usr/bin/env node
// Improve alt text and tighten filenames in what-is-responsive-design.
// Filenames were already moderately descriptive; this pass adds the topical
// "responsive-design" prefix where it helps SEO and replaces the generic
// "Responsive Design <slug>" alts with section-aware descriptions.

import { readFileSync, writeFileSync, renameSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const imageDir = 'public/blog/migrated/2016/09';
const post = 'src/content/blog/what-is-responsive-design.md';

const mapping = [
  ['portrait-landscape.jpg', 'responsive-design-portrait-vs-landscape-orientations.jpg',
   'Diagram comparing portrait and landscape orientations of a mobile device — challenge of designing for multiple screen orientations'],
  ['sizes.jpg', 'responsive-design-mobile-screen-sizes-2005-2008.jpg',
   "Chart of common mobile device screen sizes (2005-2008) compiled by Morten Hjerde — illustrates the proliferation of resolutions designers must support"],
  ['moreflexible.jpg', 'responsive-design-ethan-marcotte-fluid-flexible-layout.jpg',
   "Ethan Marcotte's sample design demonstrating a fluid, flexible responsive layout from his A List Apart article"],
  ['croppinglogo.jpg', 'responsive-design-logo-cropping-flexible-image.jpg',
   'Responsive logo cropping example — illustration set as a cropped background image while the brand name resizes proportionally'],
  ['filamentgroup.jpg', 'responsive-design-filament-group-responsive-images-demo.jpg',
   "Filament Group's responsive images demo — technique that shrinks image resolution on smaller devices instead of just rescaling large images"],
  ['iphonescale.jpg', 'responsive-design-iphone-simulator-image-resizing-issue.jpg',
   "iPhone simulator rescaling issue — images shrinking proportionally with the page and scaling text smaller than intended"],
  ['movingcontent.jpg', 'responsive-design-mobile-css-content-rearrangement.jpg',
   'Mobile.css child stylesheet rearranging the layout — sidebars cleared, content widened to 100%, structural elements re-floated'],
  ['diggmobile.jpg', 'responsive-design-digg-mobile-vs-desktop-comparison.jpg',
   "Side-by-side comparison of Digg's mobile and desktop views — simpler navigation, more focused content, single-column layout on mobile"],
  ['showinghidingcontent.jpg', 'responsive-design-show-hide-content-display-none.jpg',
   'Showing and hiding content with display: none — sidebars hidden on small screens with their navigation links revealed instead'],
  ['touchscreen.jpg', 'responsive-design-touchscreen-laptop-vs-cursor.jpg',
   'Touchscreen laptop like the HP Touchsmart tm2t — designing for both touch and cursor interaction without relying on CSS hovers'],
  ['artequalswork1.jpg', 'responsive-design-art-equals-work-desktop-view.jpg',
   'Art Equals Work website on a standard desktop browser — sidebar visible, multi-column layout'],
  ['artequalswork2.jpg', 'responsive-design-art-equals-work-mobile-view.jpg',
   'Art Equals Work website on a narrow viewport — sidebar removed, navigation pushed to top, text enlarged for vertical reading'],
  ['thinkvitamin1.jpg', 'responsive-design-think-vitamin-desktop-view.jpg',
   'Think Vitamin website desktop view — sidebar and top bar present with generous white space'],
  ['8faces2.jpg', 'responsive-design-8-faces-mobile-narrow-view.jpg',
   '8 Faces website on a narrow screen — featured issue cut, content shortened and rearranged to essentials only'],
  ['thinkvitamin2.jpg', 'responsive-design-think-vitamin-mobile-view.jpg',
   'Think Vitamin website mobile view — sidebar and top bar removed, navigation moved above the content, logo simplified vertically'],
  ['8faces1.jpg', 'responsive-design-8-faces-desktop-view.jpg',
   '8 Faces magazine website on a wide desktop screen — full layout with featured issue and expanded content'],
  ['8faces2-1.jpg', 'responsive-design-8-faces-tablet-narrower-view.jpg',
   '8 Faces website at a tablet-width viewport — content rearranged and simplified for the narrower layout'],
  ['hicksdesign1.jpg', 'responsive-design-hicksdesign-desktop-three-columns.jpg',
   "Hicksdesign three-column desktop layout — logo on the left, two content columns to the right"],
  ['hicksdesign2.jpg', 'responsive-design-hicksdesign-narrow-rearranged.jpg',
   "Hicksdesign at a narrower width — third column rearranged above the second, logo moves next to the intro text"],
  ['informationarchitects1.jpg', 'responsive-design-information-architects-wide-view.jpg',
   "Information Architects website on a wide screen — full navigation row across the top with proportional flexible images"],
  ['informationarchitects2.jpg', 'responsive-design-information-architects-narrow-dropdown.jpg',
   "Information Architects website at its narrowest width — navigation collapses into a dropdown menu to save space"],
];

let renamed = 0;
for (const [oldName, newName] of mapping) {
  const oldPath = join(imageDir, oldName);
  const newPath = join(imageDir, newName);
  if (!existsSync(oldPath)) { console.warn(`MISSING: ${oldName}`); continue; }
  if (existsSync(newPath)) { console.warn(`SKIP target exists: ${newName}`); continue; }
  renameSync(oldPath, newPath);
  renamed++;
}
console.log(`Renamed ${renamed}/${mapping.length} files`);

let md = readFileSync(post, 'utf8');
for (const [oldName, newName, alt] of mapping) {
  const oldUrl = `/blog/migrated/2016/09/${oldName}`;
  const newUrl = `/blog/migrated/2016/09/${newName}`;
  const re = new RegExp(`!\\[[^\\]]*\\]\\(${oldUrl.replace(/[.*+?^${}()|[\\]\\\\]/g, '\\\\$&')}\\)`, 'g');
  md = md.replace(re, `![${alt}](${newUrl})`);
  md = md.split(oldUrl).join(newUrl);
}
writeFileSync(post, md, 'utf8');
console.log('Markdown rewritten.');
