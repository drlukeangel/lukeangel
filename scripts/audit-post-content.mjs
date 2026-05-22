#!/usr/bin/env node
// Audit every blog post: word count (rendered body, not source) and image count.
// Print posts below the targets — defaults: ≥600 words, ≥1 image.

import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const dir = 'src/content/blog';
const files = readdirSync(dir).filter((f) => f.endsWith('.md') || f.endsWith('.mdx'));

const MIN_WORDS = 600;
const MIN_IMAGES = 1;
const TARGET_WORDS_PER_IMAGE = 500;  // suggest extra image per ~500 rendered words

const rows = [];
for (const name of files) {
  const path = join(dir, name);
  const raw = readFileSync(path, 'utf8');
  const m = raw.match(/^---\r?\n[\s\S]*?\r?\n---\r?\n?([\s\S]*)$/);
  const body = m ? m[1] : raw;

  // Image count (markdown ![..](..) only, excluding linked-wrappers double-counting)
  const images = (body.match(/!\[[^\]]*\]\([^)]+\)/g) || []).length;

  // Strip fenced code blocks
  let text = body.replace(/```[\s\S]*?```/g, '');
  // Strip inline code, markdown image syntax, link syntax, headings, list markers
  text = text
    .replace(/!\[[^\]]*\]\([^)]+\)/g, '')        // images
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')      // links → keep visible text
    .replace(/`[^`]+`/g, '')                      // inline code
    .replace(/^#{1,6}\s+/gm, '')                  // headings
    .replace(/[*_~`>]/g, '')                      // formatting marks
    .replace(/^[\s\-*+>]+/gm, '')                 // list markers
    .replace(/\|/g, ' ')                          // table separators
    .replace(/\s+/g, ' ')                         // collapse whitespace
    .trim();

  const words = text ? text.split(' ').filter((w) => /[a-z0-9]/i.test(w)).length : 0;
  const targetImages = Math.max(MIN_IMAGES, Math.round(words / TARGET_WORDS_PER_IMAGE));
  rows.push({ name, words, images, targetImages });
}

rows.sort((a, b) => a.words - b.words);

console.log(`# Audit: ${rows.length} blog posts\n`);
console.log(`Targets: ≥${MIN_WORDS} words, ≥${MIN_IMAGES} image (≈1 per ${TARGET_WORDS_PER_IMAGE} words).\n`);

const below = rows.filter((r) => r.words < MIN_WORDS || r.images < r.targetImages);
console.log(`## ${below.length} posts below target\n`);
console.log('| Words | Images / Target | Slug |');
console.log('|------:|----------------:|------|');
for (const r of below) {
  const issues = [];
  if (r.words < MIN_WORDS) issues.push(`words<${MIN_WORDS}`);
  if (r.images < r.targetImages) issues.push(`needs ${r.targetImages - r.images} more img`);
  console.log(`| ${r.words.toString().padStart(5)} | ${r.images}/${r.targetImages} | ${r.name.replace('.md', '')} — ${issues.join(', ')} |`);
}

console.log(`\n## ${rows.length - below.length} posts at or above target\n`);
const ok = rows.filter((r) => r.words >= MIN_WORDS && r.images >= r.targetImages);
console.log(`(${ok.length} posts pass both thresholds)`);

// Aggregate stats
const totalWords = rows.reduce((s, r) => s + r.words, 0);
const totalImages = rows.reduce((s, r) => s + r.images, 0);
console.log(`\nTotal: ${totalWords.toLocaleString()} words, ${totalImages} images across ${rows.length} posts.`);
console.log(`Median: ${rows[Math.floor(rows.length / 2)].words} words.`);
