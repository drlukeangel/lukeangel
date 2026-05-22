#!/usr/bin/env node
// Fill empty markdown image alts (`![](url)`) with text derived from the filename,
// falling back to the post title if the derived text is junky (UUIDs, short
// numeric tokens). Operates only on blog content — courses don't currently have
// inline markdown images.
//
// This is a best-effort pass. Filename-derived alts are imperfect SEO copy but
// strictly better than the empty alts WP exported. A future manual pass in
// Keystatic can refine the high-value ones.

import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import yaml from 'js-yaml';

const dir = 'src/content/blog';
const files = readdirSync(dir).filter((f) => f.endsWith('.md') || f.endsWith('.mdx'));

const looksLikeUuid = (s) => /^[0-9a-f-]{20,}$/i.test(s.replace(/\s/g, ''));
const containsHash = (s) => {
  // any 12+ char alphanumeric token containing at least two digits — almost always a hash/UUID slice
  for (const word of s.split(/[\s\-_]+/)) {
    if (word.length >= 12 && /\d.*\d/.test(word) && /[a-zA-Z]/.test(word)) return true;
  }
  // CamelCase + digits run
  if (/[A-Z][a-z]+[A-Z]|[a-z]+[A-Z]+[a-z]+[A-Z]/.test(s) && /\d/.test(s)) return true;
  // 10+ char hex-ish word
  if (/\b[0-9a-fA-F]{10,}\b/.test(s)) return true;
  // 8+ char run with no vowels (consonants + digits only)
  if (/\b[bcdfghjklmnpqrstvwxyzBCDFGHJKLMNPQRSTVWXYZ0-9]{8,}\b/.test(s)) return true;
  return false;
};
const looksJunky = (s) => !s || s.length < 6 || looksLikeUuid(s) || /^[\d\s.\-_]+$/.test(s) || containsHash(s);

const deriveAlt = (url, fallback) => {
  let name = url.split('/').pop().split('?')[0].split('#')[0];
  name = name.replace(/\.(png|jpe?g|gif|webp|svg|avif)$/i, '');
  // strip WP date/time prefixes like 011017_2125_ or 122916_2125_
  name = name.replace(/^\d{6,8}_\d{2,4}_/, '');
  // strip trailing dimension suffixes (-150x150, _001)
  name = name.replace(/[-_]\d+x\d+$/, '').replace(/[-_]\d{3,}$/, '');
  // separators → spaces
  name = name.replace(/[-_]+/g, ' ').replace(/\s+/g, ' ').trim();
  // trim trailing punctuation/numbers added by WP
  name = name.replace(/[\s.\-_0-9]+$/, '').trim();

  if (looksJunky(name)) return fallback;
  // sentence-case if it's all-lowercase
  if (name === name.toLowerCase()) {
    name = name.replace(/\b\w/g, (c) => c.toUpperCase());
  }
  return name;
};

let imagesFixed = 0;
let filesFixed = 0;

for (const name of files) {
  const path = join(dir, name);
  const raw = readFileSync(path, 'utf8');
  const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!m) continue;
  let fm;
  try { fm = yaml.load(m[1]); } catch { continue; }
  const fallback = fm?.title ?? 'Figure';

  let count = 0;
  // First pass: fill empty alts.
  let newBody = m[2].replace(/!\[\]\(([^)]+)\)/g, (_, url) => {
    count++;
    const alt = deriveAlt(url, fallback).replace(/[\[\]\\]/g, '');
    return `![${alt}](${url})`;
  });
  // Second pass: replace any alt text that looks junky (hash-like) with the post title.
  newBody = newBody.replace(/!\[([^\]]+)\]\(([^)]+)\)/g, (full, alt, url) => {
    if (!looksJunky(alt)) return full;
    count++;
    return `![${fallback}](${url})`;
  });

  if (count > 0) {
    writeFileSync(path, `---\r\n${m[1]}\r\n---\r\n${newBody}`, 'utf8');
    imagesFixed += count;
    filesFixed++;
  }
}

console.log(`Filled ${imagesFixed} empty alts across ${filesFixed} files.`);
