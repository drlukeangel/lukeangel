#!/usr/bin/env node
import { readFileSync, writeFileSync } from 'node:fs';
import yaml from 'js-yaml';

const fixes = [
  ['src/content/blog/netflix-deck-on-data-pipeline-with-kafka.md', { excerpt: "Netflix posted a deck on their Kafka-based data pipeline in 2016 and I haven't stopped pointing at it. Four ideas every PM and engineer should steal." }],
  ['src/content/blog/new-course-agile-product-ownership-from-beginner-to-professional.md', { excerpt: "New course on Agile Product Ownership — the role most teams hire badly for and then quietly blame for everything. What's in it, who it's for." }],
  ['src/content/blog/new-course-microsoft-project-reporting-beginner-to-rock-star.md', { excerpt: "Most MS Project files look great inside MS Project and incomprehensible everywhere else. The new course teaches reports stakeholders actually open." }],
  ['src/content/blog/new-course-project-management-fundamentals-stake-holder-management.md', { excerpt: "Stakeholder management is the soft skill nobody trains for that decides whether your project ships. The new course teaches the full discipline." }],
  ['src/content/blog/new-course-wordpress-e-commerce-with-woocommerce-novice-to-store-owner.md', { title: 'New: WordPress E-Commerce With WooCommerce' }],
  ['src/content/blog/opportunity-is-missed-by-most-because-it-is-dressed-in-overalls-and-looks-like-work.md', { excerpt: "Thomas Edison nailed it: opportunity is not a lottery ticket. It's the unglamorous Tuesday-morning slog nobody wants. Where I see it hiding now." }],
  ['src/content/courses/node-js-the-essentials-api-frameworks-express-koa-sails.md', { summary: "Node.js from zero to your first working API. The course walks the runtime, the package ecosystem, and three frameworks: Express, Koa, and Sails." }],
  ['src/content/courses/project-management-fundamentals-stake-holder-management.md', { summary: "Stakeholder management is the unglamorous skill that decides whether your project ships. Identification, mapping, engagement, and interpersonal patterns." }],
];

for (const [path, updates] of fixes) {
  const raw = readFileSync(path, 'utf8');
  const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!m) continue;
  const fm = yaml.load(m[1]);
  for (const [k, v] of Object.entries(updates)) fm[k] = v;
  const newFm = yaml.dump(fm, { lineWidth: -1, noRefs: true, sortKeys: false }).trimEnd();
  writeFileSync(path, `---\r\n${newFm}\r\n---\r\n${m[2]}`, 'utf8');
  console.log(`fixed: ${path.split('/').pop()}`);
}
