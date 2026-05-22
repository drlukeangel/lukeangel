#!/usr/bin/env node
// Shorten the remaining long blog titles to fit under Google's 65-char SERP cutoff.
// Each entry below is one editorial decision; the full original title moves into the body
// implicitly via the existing post content — we are only changing what shows in <title>.

import { readFileSync, writeFileSync } from 'node:fs';
import yaml from 'js-yaml';

const renames = [
  ['src/content/blog/the-break-neck-automation-of-tasks-once-performed-by-people-by-intelligent-software-and-physical-infrastructure-will-bring-new-expectations-of-efficiency-value-convenience-an.md',
    'Break-neck automation will reset our expectations'],
  ['src/content/blog/when-forming-a-solution-to-a-problem-we-have-two-eyes-two-ears-and-one-mouth-and-we-should-use-them-in-that-proportion-iise-crawford.md',
    'Two eyes, two ears, one mouth — use them in proportion'],
  ['src/content/blog/use-ssh-on-windows-to-connect-to-linux-virtual-machines-or-docker-containers-on-microsoft-azure-from-a-mac-or-windows-machine.md',
    'SSH from Windows or Mac to Linux VMs and Docker on Azure'],
  ['src/content/blog/project-management-program-management-product-management-and-portfolio-management-a-comprehensive-guide-with-examples.md',
    'Project, Program, Product, Portfolio Management — a guide'],
  ['src/content/blog/how-to-get-to-your-mobile-app-to-market-faster-by-optimizing-your-mobile-development-release-pipeline.md',
    'Ship Mobile Faster: Optimize Your Release Pipeline'],
  ['src/content/blog/entrepreneurs-are-the-only-people-who-will-work-80-hours-a-week-to-avoid-working-40-hours-a-week.md',
    'Entrepreneurs work 80 hours a week to avoid 40'],
  ['src/content/blog/bridging-the-gap-how-itils-focus-on-value-principle-transforms-a-frustrating-user-experience.md',
    "How ITIL's “Focus on Value” transforms a frustrating UX"],
  ['src/content/blog/traditional-vwaterfall-vs-agile-project-management-for-innovators-product-managers.md',
    'Waterfall vs Agile for Innovators & Product Managers'],
  ['src/content/blog/docker-monitoring-setup-docker-monitoring-with-using-cadvisor-influxdb-and-grafana.md',
    'Docker Monitoring with cAdvisor, InfluxDB, and Grafana'],
  ['src/content/blog/unleash-your-inner-jedi-7-mind-blowing-soft-skills-to-skyrocket-project-success--f0-9f-9a-80.md',
    'Unleash Your Inner Jedi: 7 Soft Skills for PM Success'],
  ['src/content/blog/opportunity-is-missed-by-most-because-it-is-dressed-in-overalls-and-looks-like-work.md',
    'Opportunity is dressed in overalls — and looks like work'],
  ['src/content/blog/docker-swarm-mode-beggining-built-in-orchestration-and-service-creation.md',
    'Docker Swarm Mode: Built-In Orchestration'],
  ['src/content/blog/we-dont-see-things-as-they-are-we-see-them-as-we-are.md',
    "We Don't See Things As They Are, We See Them As We Are"],
  ['src/content/blog/prompt-journal.md',
    "A PM's prompt journal — write prompts by hand first"],
];

let fixed = 0;
for (const [path, newTitle] of renames) {
  const raw = readFileSync(path, 'utf8');
  const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!m) { console.warn(`SKIP (no fm): ${path}`); continue; }
  let fm;
  try { fm = yaml.load(m[1]); } catch (e) { console.warn(`SKIP (yaml): ${path} — ${e.message}`); continue; }
  fm.title = newTitle;
  const newFm = yaml.dump(fm, { lineWidth: -1, noRefs: true, sortKeys: false }).trimEnd();
  writeFileSync(path, `---\r\n${newFm}\r\n---\r\n${m[2]}`, 'utf8');
  fixed++;
  console.log(`${path.split('/').pop()} (${newTitle.length} chars)`);
}
console.log(`\nRenamed: ${fixed}`);
