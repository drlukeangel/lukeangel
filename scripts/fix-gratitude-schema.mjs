#!/usr/bin/env node
// Older gratitude entries use {topic, level} instead of {tag} required by the schema.
// Map: topic → tag, drop level (collapsed into tag where ambiguous).
import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import yaml from 'js-yaml';

const dir = 'src/content/gratitude';
let fixed = 0;
for (const name of readdirSync(dir)) {
  if (!name.endsWith('.md')) continue;
  const path = join(dir, name);
  const raw = readFileSync(path, 'utf8');
  const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!m) continue;
  let fm;
  try { fm = yaml.load(m[1]); } catch { continue; }
  if (fm.tag) continue;  // already correct
  // Build tag from topic/level. If topic is generic ('everyday', 'general'), use level.
  let tag = fm.topic;
  if (!tag || /^(everyday|general|misc)$/i.test(tag)) tag = fm.level || 'small';
  fm.tag = tag;
  delete fm.topic;
  delete fm.level;
  const newFm = yaml.dump(fm, { lineWidth: -1, noRefs: true, sortKeys: false }).trimEnd();
  writeFileSync(path, `---\r\n${newFm}\r\n---\r\n${m[2]}`, 'utf8');
  fixed++;
}
console.log(`Fixed ${fixed} gratitude entries.`);
