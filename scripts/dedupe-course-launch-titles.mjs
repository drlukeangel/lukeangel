#!/usr/bin/env node
// The "New Course – " prefix strip left 5 blog launch-announcement posts sharing
// titles with their matching course pages. Re-add a short "New: " prefix to the
// blog version so each title is unique without re-breaking the 65-char cap.

import { readFileSync, writeFileSync } from 'node:fs';
import yaml from 'js-yaml';

const files = [
  'src/content/blog/new-course-agile-product-ownership-from-beginner-to-professional.md',
  'src/content/blog/new-course-agile-reporting-beginner-to-rock-star.md',
  'src/content/blog/new-course-learn-how-to-drive-effective-efficient-agile-meetings.md',
  'src/content/blog/new-course-microsoft-flow-up-and-running-code-less-automated-workflows.md',
  'src/content/blog/new-course-wordpress-e-commerce-with-woocommerce-novice-to-store-owner.md',
];

let fixed = 0;
for (const path of files) {
  const raw = readFileSync(path, 'utf8');
  const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!m) continue;
  let fm;
  try { fm = yaml.load(m[1]); } catch { continue; }
  if (!fm?.title || fm.title.startsWith('New: ')) continue;
  fm.title = 'New: ' + fm.title;
  const newFm = yaml.dump(fm, { lineWidth: -1, noRefs: true, sortKeys: false }).trimEnd();
  writeFileSync(path, `---\r\n${newFm}\r\n---\r\n${m[2]}`, 'utf8');
  fixed++;
  console.log(`${path.split('/').pop()}: -> "${fm.title}" (${fm.title.length})`);
}
console.log(`Fixed: ${fixed}`);
