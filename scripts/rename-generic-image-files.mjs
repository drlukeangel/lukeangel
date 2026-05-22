#!/usr/bin/env node
// Rename the last few generically-named image*.png files before flattening
// (they would collide if flattened with the same name in different folders).

import { readFileSync, writeFileSync, renameSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const renames = [
  // 2025/01
  { dir: 'public/blog/migrated/2025/01',
    old: 'image-1.png',
    new: 'crush-goals-with-data-program-manager-dashboards.png',
    posts: ['src/content/blog/crush-goals-with-data-2-real-world-program-management-wins.md'] },
  { dir: 'public/blog/migrated/2025/01',
    old: 'image.png',
    new: 'data-driven-decision-making-6-key-steps-infographic.png',
    posts: ['src/content/blog/crush-goals-with-data-2-real-world-program-management-wins.md'] },
  // 2025/02
  { dir: 'public/blog/migrated/2025/02',
    old: 'image-1.png',
    new: 'wsjf-cost-of-delay-businessman-watching-money-fly-away.png',
    posts: ['src/content/blog/wsjf-prioritize-like-a-product-ninja.md'] },
  { dir: 'public/blog/migrated/2025/02',
    old: 'image-2.png',
    new: 'fishbone-diagram-software-deployment-failure-people-process-technology.png',
    posts: ['src/content/blog/mastering-root-cause-analysis-with-fishbone-diagrams.md'] },
  { dir: 'public/blog/migrated/2025/02',
    old: 'image-3.png',
    new: 'fishbone-diagram-patient-complaints-staffing-communication-procedures.png',
    posts: ['src/content/blog/mastering-root-cause-analysis-with-fishbone-diagrams.md'] },
];

const alts = {
  'crush-goals-with-data-program-manager-dashboards.png':
    'Program manager standing in a data-rich command center surrounded by dashboards, charts, and analytics screens — cover image for the data-driven program-management wins post',
  'data-driven-decision-making-6-key-steps-infographic.png':
    'Infographic: 6 Key Steps of Data-Driven Decision-Making — Define objectives, Identify and collect data, Organize and explore data, Perform data analysis, Draw conclusions, Implement and evaluate',
  'wsjf-cost-of-delay-businessman-watching-money-fly-away.png':
    'Businessman in a suit watching money fly away from his wristwatch — visual metaphor for the cost of delay component of the WSJF prioritization formula',
  'fishbone-diagram-software-deployment-failure-people-process-technology.png':
    'Fishbone (Ishikawa) diagram analyzing a software deployment failure — causes grouped under People (lack of communication, not enough testing, insufficient training), Process (weak rollback, poor version control, bad deployment plan), and Technology (server outage, code errors, database connection, browser compatibility)',
  'fishbone-diagram-patient-complaints-staffing-communication-procedures.png':
    'Fishbone (Ishikawa) diagram for increased patient complaints about scheduling appointments — causes grouped under Staffing, Communication, Technology, and Procedures',
};

for (const r of renames) {
  const oldPath = join(r.dir, r.old);
  const newPath = join(r.dir, r.new);
  if (!existsSync(oldPath)) { console.warn(`MISSING: ${oldPath}`); continue; }
  if (existsSync(newPath)) { console.warn(`SKIP target exists: ${newPath}`); continue; }
  renameSync(oldPath, newPath);
  const oldUrl = `/${r.dir.replace('public/', '')}/${r.old}`;
  const newUrl = `/${r.dir.replace('public/', '')}/${r.new}`;
  const alt = alts[r.new];
  for (const post of r.posts) {
    if (!existsSync(post)) continue;
    let md = readFileSync(post, 'utf8');
    // Replace any inline ![alt](oldUrl) with ![newAlt](newUrl)
    const re = new RegExp(`!\\[[^\\]]*\\]\\(${oldUrl.replace(/[.*+?^${}()|[\\]\\\\]/g, '\\\\$&')}\\)`, 'g');
    md = md.replace(re, `![${alt}](${newUrl})`);
    // Replace any plain URL occurrences (e.g., cover field or wrapper link)
    md = md.split(oldUrl).join(newUrl);
    writeFileSync(post, md, 'utf8');
  }
  console.log(`Renamed: ${r.old} → ${r.new}`);
}
