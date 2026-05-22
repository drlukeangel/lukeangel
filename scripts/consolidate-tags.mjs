// Quality-focused tag consolidation.
// - Fix typos
// - Collapse synonyms/duplicates
// - Replace WP-era SEO bloat lists with a small set of meaningful tags
// - Add tags to untagged posts
// - Drop genuinely vague tags
// - Keep specific singletons (kafka, netflix, instagram, etc.) — they're informative

import fs from 'node:fs';
import path from 'node:path';
import yaml from 'js-yaml';

const dir = 'src/content/blog';
const fmRe = /^(---\n[\s\S]*?\n---)([\s\S]*)$/;

// 1) Direct rename map (a -> b). Applied per-tag.
const rename = {
  // typos
  'inovation': 'innovation',
  'orchenstraton': 'orchestration',
  'shceudling': 'scheduling',
  'stakeholder-managemnet': 'stakeholder-management',
  'project-management-traingle': 'iron-triangle',
  // synonyms / pluralization
  'quote': 'quotes',
  'angular-2': 'angular',
  'communication-in-project-management': 'communication',
  'soft-skills-project-management-tools': 'soft-skills',
  'project-management-soft-skills': 'soft-skills',
  'leadership-skills': 'leadership',
  'problem-solving-skill': 'problem-solving',
  // role / discipline consolidation
  'stakeholder': 'stakeholder-management',
  'product-management': 'product',
  'product-success': 'product',
  'project-success': 'project-management',
};

// 2) Tags to drop entirely (too vague to be useful)
const drop = new Set([
  'give',
  'success',
  'code',
  'developer',
  'engineering',
  'learning',
  'community',
  // ITIL SEO-stuffing tags — collapsed into a smaller set below per-post
  'applying-itil-principles',
  'creating-business-value-with-it',
  'customer-satisfaction',
  'improving-user-experience-with-itil',
  'itil-best-practices',
  'itil-focus-on-value-example',
  'itil-for-small-business',
  'itil-principles',
  'it-management',
  'it-service-delivery',
  'it-support',
  'itil-4',
  'itsm',
  // stakeholder SEO-stuffing
  'stakeholder-analysis',
  'stakeholder-engagement',
]);

// 3) Add tags to untagged posts (slug -> tags)
const adds = {
  'crush-goals-with-data-2-real-world-program-management-wins': ['program-management', 'data-driven', 'leadership', 'product'],
  'rock-product-decisions-with-data': ['product', 'data-driven', 'leadership', 'ai'],
  'help-your-community-out-by-becoming-cert-certified': ['volunteer', 'gratitude', 'preparedness'],
  'save-two-lives-at-once-by-fostering-a-pet-at-your-home': ['volunteer', 'gratitude', 'pets'],
};

function normalizeTags(tags) {
  const out = [];
  const seen = new Set();
  for (const raw of tags) {
    if (!raw) continue;
    const t = (rename[raw] || raw).trim();
    if (drop.has(t)) continue;
    if (seen.has(t)) continue;
    seen.add(t);
    out.push(t);
  }
  return out;
}

const files = fs.readdirSync(dir).filter(f => f.endsWith('.md'));
let changed = 0;

for (const f of files) {
  const p = path.join(dir, f);
  const txt = fs.readFileSync(p, 'utf8');
  const m = txt.match(fmRe);
  if (!m) continue;
  const fm = yaml.load(m[1].replace(/^---\n/, '').replace(/\n---$/, '')) || {};
  const slug = f.replace(/\.md$/, '');
  const before = fm.tags || [];
  let after = normalizeTags(before);
  if (adds[slug] && before.length === 0) {
    after = adds[slug];
  }
  // identical? skip
  if (JSON.stringify(before) === JSON.stringify(after)) continue;
  fm.tags = after;
  const newFront = '---\n' + yaml.dump(fm, { lineWidth: 1000, noRefs: true, quotingType: '"' }).trimEnd() + '\n---';
  fs.writeFileSync(p, newFront + m[2]);
  console.log(`${slug}: [${before.length}] -> [${after.length}]`);
  changed++;
}
console.log(`\n${changed} files updated`);
