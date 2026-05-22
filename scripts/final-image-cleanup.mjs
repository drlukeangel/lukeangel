#!/usr/bin/env node
// Final touch-up: improve pmilogo alts on courses and rename two leftover
// hash-y cover images on blog posts.

import { readFileSync, writeFileSync, renameSync, existsSync } from 'node:fs';
import { join } from 'node:path';

// 1) Replace pmilogo alts with a real description (external WP URL — alt only)
const courseFiles = [
  'src/content/courses/agile-charts-and-boards-how-to-track-and-show-the-progress-of-your-agile-project.md',
  'src/content/courses/agile-product-ownership-from-beginner-to-professional.md',
  'src/content/courses/learn-how-to-drive-effective-efficient-agile-meetings.md',
  'src/content/courses/project-management-fundamentals-the-art-of-scheduling.md',
];
const pmiAlt = 'PMI Registered Education Provider logo — this course qualifies for Project Management Institute professional development units (PDUs)';
for (const f of courseFiles) {
  let md = readFileSync(f, 'utf8');
  const before = md;
  md = md.replace(/!\[pmilogo\]/g, `![${pmiAlt}]`);
  if (md !== before) {
    writeFileSync(f, md, 'utf8');
    console.log(`Updated pmilogo alt: ${f.split('/').pop()}`);
  }
}

// 2) Rename remaining hash-y cover images
const coverRenames = [
  { post: 'src/content/blog/the-docker-ecosystem-scheduling-and-orchestration-digitalocean.md',
    dir:  'public/blog/migrated/2016/10',
    old:  '101416_0440_TheDockerEc1.png',
    name: 'docker-ecosystem-scheduling-orchestration-cover.png',
    alt:  'Docker scheduling and orchestration ecosystem overview — Swarm, Kubernetes, Fleet, and Marathon as cluster managers for containerized workloads' },
  { post: 'src/content/blog/the-internet-of-things-version-0-5.md',
    dir:  'public/blog/migrated/2016/10',
    old:  '101816_1128_TheInternet1.png',
    name: 'iot-version-0-5-cover.png',
    alt:  'Cover graphic for "The Internet of Things, version 0.5" — the half-finished current state of connected devices and protocols' },
];

for (const r of coverRenames) {
  const oldPath = join(r.dir, r.old);
  const newPath = join(r.dir, r.name);
  if (existsSync(oldPath) && !existsSync(newPath)) {
    renameSync(oldPath, newPath);
    console.log(`Renamed: ${r.old} → ${r.name}`);
  }
  let md = readFileSync(r.post, 'utf8');
  const oldUrl = `/${r.dir.replace('public/', '')}/${r.old}`;
  const newUrl = `/${r.dir.replace('public/', '')}/${r.name}`;
  md = md.split(oldUrl).join(newUrl);
  // also update coverAlt if it's still the default
  md = md.replace(/^coverAlt:.*$/m, `coverAlt: "${r.alt}"`);
  writeFileSync(r.post, md, 'utf8');
  console.log(`Updated cover ref + alt in ${r.post.split('/').pop()}`);
}
