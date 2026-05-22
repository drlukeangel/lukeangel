#!/usr/bin/env node
// Strip the "New Course[ –:] " prefix from blog post titles — the WP migration
// kept the announcement framing, but the post date already signals it's a launch
// and the prefix burns characters Google won't show in SERP.

import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import yaml from 'js-yaml';

const dir = 'src/content/blog';
const files = readdirSync(dir).filter((f) => f.endsWith('.md') || f.endsWith('.mdx'));

let fixed = 0;
for (const name of files) {
  const path = join(dir, name);
  const raw = readFileSync(path, 'utf8');
  const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!m) continue;
  let fm;
  try { fm = yaml.load(m[1]); } catch { continue; }
  if (!fm?.title) continue;
  const stripped = fm.title.replace(/^New\s+Course\s*[–\-:]?\s+/i, '');
  if (stripped === fm.title) continue;
  fm.title = stripped;
  const newFm = yaml.dump(fm, { lineWidth: -1, noRefs: true, sortKeys: false }).trimEnd();
  writeFileSync(path, `---\r\n${newFm}\r\n---\r\n${m[2]}`, 'utf8');
  fixed++;
  console.log(`${name}: -> "${stripped}"`);
}
console.log(`Fixed: ${fixed}`);
