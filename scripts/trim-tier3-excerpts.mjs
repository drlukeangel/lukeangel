#!/usr/bin/env node
import { readFileSync, writeFileSync } from 'node:fs';
import yaml from 'js-yaml';

const fixes = [
  ['src/content/blog/autonomous-office-chairs.md', { excerpt: "Nissan built self-parking office chairs as a marketing stunt for their intelligent parking tech. Best 'show, don't tell' demo I've seen — and a model for any team." }],
  ['src/content/blog/big-bother-and-sister.md', { excerpt: "Being a Big through Big Brothers Big Sisters is the most fun volunteering I've ever done. Low time commitment, big payoff for the kid, embarrassingly high for the adult." }],
  ['src/content/blog/volunteer-fight-fighting.md', { excerpt: "Most public fire stations accept volunteer firefighters. Harder than mentoring, easier than full-time fire service, one of the most rewarding things I've done." }],
  ['src/content/blog/why-mentor-with-spark.md', { excerpt: "Spark matches middle-schoolers with workplace mentors for 10 weeks. Two hours a week of the most fun work you'll do all month — and it makes a real dent in a kid's trajectory." }],
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
