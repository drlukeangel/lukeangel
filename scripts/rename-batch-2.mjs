#!/usr/bin/env node
// Final batch: process all remaining posts with images.
// Strategy per post: improve alt text (better context), rename only when current
// filename is generic ("image.png", UUIDs, or WP timestamp-prefixed names).

import { readFileSync, writeFileSync, renameSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const jobs = [
  // ---- 2025 trends and similar posts (already-decent filenames; just better alts) ----
  {
    post: 'src/content/blog/10-game-changing-project-management-trends-for-2019.md',
    dir: 'public/blog/migrated/2025/01',
    mapping: [
      ['10-Game-Changing-Project-Management-Trends-for-2019-.png',
       '10-game-changing-project-management-trends-for-2019-cover.png',
       'Cover graphic for "10 Game-Changing Project Management Trends for 2019" — overview of project management trends'],
      ['Data-Driven-Decisions.png',
       'data-driven-project-management-decisions-2019.png',
       'Illustration of data-driven decision-making — 2019 project management trend toward using analytics to guide PM choices'],
    ],
  },
  {
    post: 'src/content/blog/10-game-changing-project-management-trends-for-2022.md',
    dir: 'public/blog/migrated/2025/01',
    mapping: [
      ['10-Game-Changing-Project-Management-Trends-for-2022.png',
       '10-game-changing-project-management-trends-for-2022-cover.png',
       'Cover graphic for "10 Game-Changing Project Management Trends for 2022" — hybrid work, agile evolution, and AI-assisted PM'],
      ['3cb4b5ce-b496-4cd9-bf37-9c1c85235be0.png',
       '2022-project-management-trends-hybrid-team-illustration.png',
       'Illustration of a distributed hybrid project team — 2022 project management trend toward remote-first collaboration'],
    ],
  },
  {
    post: 'src/content/blog/10-game-changing-project-management-trends-for-2025.md',
    dir: 'public/blog/migrated/2025/01',
    mapping: [
      ['10-Game-Changing-Project-Management-Trends-for-2025.png',
       '10-game-changing-project-management-trends-for-2025-cover.png',
       'Cover graphic for "10 Game-Changing Project Management Trends for 2025" — AI, hybrid work, sustainability, and squad-based teams'],
      ['8.-Squad-Based-Teams-Reduce-Bureaucracy-.png',
       '2025-squad-based-teams-reduce-bureaucracy.png',
       'Illustration of squad-based project teams — 2025 trend toward small autonomous squads that cut through organizational bureaucracy'],
    ],
  },
  {
    post: 'src/content/blog/10-game-changing-project-management-trends-to-dominate-2024.md',
    dir: 'public/blog/migrated/2025/01',
    mapping: [
      ['10-Game-Changing-Project-Management-Trends-to-Dominate-2024-.jpg',
       '10-game-changing-project-management-trends-2024-cover.jpg',
       'Cover graphic for "10 Game-Changing Project Management Trends to Dominate 2024" — AI dominance, hybrid wins, and the evolving PM toolkit'],
      ['automation.jpg',
       '2024-project-management-automation-tools.jpg',
       'Illustration of automated project management workflows — 2024 trend toward automating repetitive PM tasks with AI and rules engines'],
      ['crypto-yoda.jpg',
       '2024-blockchain-project-management-trust-yoda-meme.jpg',
       'Meme-style illustration of "blockchain Yoda" — playful take on blockchain/trustless tooling as a 2024 PM trend'],
    ],
  },
  {
    post: 'src/content/blog/2023-project-management-ai-dominance-hybrid-wins.md',
    dir: 'public/blog/migrated/2025/01',
    mapping: [
      ['Sustainability-Becomes-the-Ultimate-KPI.jpg',
       '2023-sustainability-becomes-ultimate-kpi-project-management.jpg',
       'Illustration of sustainability KPIs in project management — 2023 trend toward measuring environmental and social impact alongside cost and schedule'],
    ],
  },
  {
    post: 'src/content/blog/2021s-pm-tsunami-10-trends-you-cant-surf-past--f0-9f-8c-8a.md',
    dir: 'public/blog/migrated/2025/01',
    mapping: [
      ['2021-PM-Tsunami-10-Trends-You-Cant-Surf-Past.png',
       '2021-pm-tsunami-10-trends-cover.png',
       'Cover graphic for "2021\'s PM Tsunami: 10 Trends You Can\'t Surf Past" — hybrid work, emotional IQ, and 2021 project management waves'],
      ['5-Emotional-IQ-Arms-Race.png',
       '2021-emotional-intelligence-project-management-trend.png',
       'Illustration of emotional intelligence as a PM superpower — 2021 trend toward EQ as a measurable team-leadership skill'],
      ['10-Continuous-Learning-Gets-Caffeinated.png',
       '2021-continuous-learning-project-management-trend.png',
       'Illustration of continuous learning culture — 2021 PM trend toward always-on upskilling on agile, AI, and remote-team practices'],
    ],
  },
  // ---- short posts ----
  {
    post: 'src/content/blog/crush-goals-with-data-2-real-world-program-management-wins.md',
    dir: 'public/blog/migrated/2025/01',
    mapping: [
      ['dataBFF.png', 'data-driven-program-management-bff-illustration.png',
       'Illustration of data as a program manager\'s "best friend forever" — using analytics to crush program goals with real-world wins'],
    ],
  },
  {
    post: 'src/content/blog/good-fast-cheap-the-golden-triangle-of-project-management.md',
    dir: 'public/blog/migrated/2020/03',
    mapping: [
      ['a-lot-good-fast-cheap.jpg', 'good-fast-cheap-iron-triangle-pick-two.jpg',
       'The iron / golden triangle of project management — "Good, Fast, Cheap: pick two" diagram showing the inherent tradeoffs'],
    ],
  },
  {
    post: 'src/content/blog/stakeholder-management-your-secret-weapon-for-success.md',
    dir: 'public/blog/migrated/2025/01',
    mapping: [
      ['Stakeholder-Management-Your-Secret-Weapon-for-Project-Program-and-Product-Success.png',
       'stakeholder-management-secret-weapon-project-program-product-success.png',
       'Cover graphic for "Stakeholder Management: Your Secret Weapon for Project, Program and Product Success" — diagram of stakeholder mapping and influence'],
    ],
  },
  {
    post: 'src/content/blog/whats-a-workback-schedule.md',
    dir: 'public/blog/migrated/2016/10',
    mapping: [
      ['Project-Management-Triangle.png', 'workback-schedule-project-management-iron-triangle.png',
       'Project management iron triangle — scope, time, and cost constraints relevant to building a backward-planned workback schedule'],
    ],
  },
  {
    post: 'src/content/blog/wsjf-prioritize-like-a-product-ninja.md',
    dir: 'public/blog/migrated/2025/02',
    mapping: [
      ['image.png', 'wsjf-weighted-shortest-job-first-formula-illustration.png',
       'Illustration of the WSJF (Weighted Shortest Job First) prioritization formula — cost of delay divided by job size, ranking SAFe backlog items'],
    ],
  },
  {
    post: 'src/content/blog/project-management-program-management-product-management-and-portfolio-management-a-comprehensive-guide-with-examples.md',
    dir: 'public/blog/migrated/2025/01',
    mapping: [
      ['Project-Management-Program-Management-Product-Management-and-Portfolio-Management-A-Comprehensive-Guide-with-Examples.png',
       'project-program-product-portfolio-management-comprehensive-guide-cover.png',
       'Comprehensive comparison graphic — Project, Program, Product, and Portfolio Management arranged hierarchically with overlapping responsibilities'],
    ],
  },
  {
    post: 'src/content/blog/top-10-project-management-trends-2020.md',
    dir: 'public/blog/migrated/2025/01',
    mapping: [
      ['PMOs-Got-Sexy.png', '2020-pmo-modern-evolution-trend.png',
       'Illustration of the modern PMO evolution — 2020 trend toward strategic Project Management Offices serving as innovation accelerators'],
    ],
  },
  {
    post: 'src/content/blog/unleash-data-driven-superpowers-pm-s-guide-to-epic-decisions.md',
    dir: 'public/blog/migrated/2025/01',
    mapping: [
      ['Product-Managers-The-Data-Whisperers.png', 'product-managers-data-whisperers-illustration.png',
       'Illustration: Product Managers as "Data Whisperers" — analyzing user data and behavior to find product opportunities like Netflix or Spotify'],
      ['Porjectt-Managers-The-Data-juggling.png', 'project-managers-data-jugglers-illustration.png',
       'Illustration: Project Managers as "Data Jugglers" — keeping many data sources balanced, like Airbnb pricing or Amazon delivery routes'],
      ['Program-Managers-The-Data-Conductors.png', 'program-managers-data-conductors-illustration.png',
       'Illustration: Program Managers as "Data Conductors" — orchestrating data across multiple projects like IBM Watson Health or NASA Mars missions'],
      ['Portfolio-Managers-The-Data-Alchemists.png', 'portfolio-managers-data-alchemists-illustration.png',
       'Illustration: Portfolio Managers as "Data Alchemists" — turning data into strategic portfolio decisions like Google X or P&G brand management'],
    ],
  },
  {
    post: 'src/content/blog/unleash-your-inner-jedi-7-mind-blowing-soft-skills-to-skyrocket-project-success--f0-9f-9a-80.md',
    dir: 'public/blog/migrated/2025/01',
    mapping: [
      ['SoftSkills-Leadership-Channeling-Your-Inner-Yoda.png', 'soft-skills-leadership-channeling-inner-yoda.png',
       'Illustration: Channeling your inner Yoda — leadership soft skill for project success'],
      ['SoftSkills-Communication-The-Art-of-Not-Sounding-Like-a-Malfunctioning-Robot.png',
       'soft-skills-communication-not-sounding-like-robot.png',
       'Illustration: Communication soft skill — the art of speaking in plain human terms rather than corporate robot-speak'],
      ['SoftSkills-EmotionalIntelligence-lemon-powered-rocket.png',
       'soft-skills-emotional-intelligence-lemon-powered-rocket.png',
       'Illustration: Emotional Intelligence as a "lemon-powered rocket" — turning team frustration into forward momentum'],
      ['softskills-6.-Team-Building-Creating-Your-Very-Own-Avengers.png',
       'soft-skills-team-building-create-your-avengers.png',
       'Illustration: Team-building soft skill — assembling your project team like Marvel\'s Avengers, each member with a unique power'],
    ],
  },
  {
    post: 'src/content/blog/unlock-soft-skills-for-project-triumphs.md',
    dir: 'public/blog/migrated/2025/01',
    mapping: [
      ['Softskills-communcation.png', 'unlock-soft-skills-communication-project-managers.png',
       'Illustration: Communication soft skill for project triumphs — clear, direct, and human PM-to-team interactions'],
      ['Conflict-Resolution-From-Fight-Club-to-Kumbaya.png',
       'unlock-soft-skills-conflict-resolution-fight-club-kumbaya.png',
       'Illustration: Conflict resolution soft skill — moving project teams from Fight Club intensity to Kumbaya harmony'],
    ],
  },
  {
    post: 'src/content/blog/rock-product-decisions-with-data.md',
    dir: 'public/blog/migrated/2025/01',
    mapping: [
      ['database-rockstar.png', 'rock-product-decisions-data-database-rockstar.png',
       'Illustration of a database "rockstar" — using product analytics as the lead instrument for confident product decisions'],
      ['Sustainability-Becomes-the-Ultimate-KPI.jpg',
       'rock-product-decisions-sustainability-kpi.jpg',
       'Illustration of sustainability KPIs in product decisions — using data to weigh environmental and social impact alongside revenue'],
    ],
  },
  {
    post: 'src/content/blog/mastering-root-cause-analysis-with-fishbone-diagrams.md',
    dir: 'public/blog/migrated/2025/01',
    mapping: [],  // already decent — no migrated assets to rename
  },
  // ---- Docker series posts ----
  {
    post: 'src/content/blog/docker-1-13-released.md',
    dir: 'public/blog/migrated/2017/01',
    mapping: [
      ['012417_1758_Docker113R2.png', 'docker-1-13-release-notes-features-summary.png',
       'Docker 1.13 release notes summary — Compose v3 format, image squashing, secrets management, and CLI restructuring'],
      ['012417_1758_Docker113R3.png', 'docker-1-13-cli-management-commands-restructure.png',
       'Docker 1.13 CLI restructure — new management commands grouping container, image, network, and volume operations'],
    ],
  },
  {
    post: 'src/content/blog/dockerizing-a-node-js-web-app.md',
    dir: 'public/blog/migrated/2016/11',
    mapping: [
      ['dockerhub.png', 'dockerizing-nodejs-dockerhub-logo.png',
       'Docker Hub logo — public registry where the dockerized Node.js web app image is published'],
      ['github-logo-icon-30.png', 'dockerizing-nodejs-github-source-icon.png',
       'GitHub logo — source-control destination for the dockerized Node.js web app and its Dockerfile'],
    ],
  },
  {
    post: 'src/content/blog/the-docker-ecosystem-an-introduction-to-common-components.md',
    dir: 'public/blog/migrated/2016/10',
    mapping: [
      ['101416_0439_TheDockerEc2.png', 'docker-ecosystem-host-engine-containers-diagram.png',
       'Docker host architecture diagram — Docker Engine running multiple isolated containers on a single Linux host'],
      ['101416_0439_TheDockerEc3.png', 'docker-ecosystem-images-layers-stack-diagram.png',
       'Docker image and layer stack diagram — each Dockerfile instruction adds a read-only layer, container adds a writable layer on top'],
      ['101416_0439_TheDockerEc4.png', 'docker-ecosystem-registry-hub-deployment-flow.png',
       'Docker registry / Hub deployment flow — build image locally, push to registry, pull on production hosts'],
    ],
  },
  // ---- Other posts ----
  {
    post: 'src/content/blog/how-to-get-to-your-mobile-app-to-market-faster-by-optimizing-your-mobile-development-release-pipeline.md',
    dir: 'public/blog/migrated/2016/10',
    mapping: [
      ['101416_1628_HowtoGettoY1.png', 'mobile-release-pipeline-typical-stages-diagram.png',
       'Typical mobile app release pipeline stages — design, develop, build, test, beta, app-store submission, and post-release monitoring'],
      ['101416_1628_HowtoGettoY2.png', 'mobile-release-pipeline-bottlenecks-diagram.png',
       'Mobile release pipeline bottlenecks — common slowdowns in build, test, and approval stages that delay app-store launches'],
      ['101416_1628_HowtoGettoY3.png', 'mobile-release-pipeline-ci-cd-automation-diagram.png',
       'Mobile CI/CD automation diagram — automated build, test, sign, and beta-distribution stages that compress release cycles'],
      ['101416_1628_HowtoGettoY4.png', 'mobile-release-pipeline-feature-flag-deployment-diagram.png',
       'Mobile feature-flag deployment diagram — ship features dark behind flags, then flip on for a controlled rollout'],
    ],
  },
  {
    post: 'src/content/blog/the-internet-of-things-version-0-5.md',
    dir: 'public/blog/migrated/2016/10',
    mapping: [
      ['101816_1128_TheInternet2.jpg', 'iot-version-0-5-current-state-connected-devices.jpg',
       'IoT v0.5 — current state of connected devices: thermostats, fitness trackers, and smart-home gadgets each siloed in their own apps'],
      ['101816_1128_TheInternet3.jpg', 'iot-version-0-5-future-mesh-interconnected-devices.jpg',
       'IoT future-mesh diagram — interconnected devices sharing data via open standards rather than vendor-walled apps'],
      ['101816_1128_TheInternet4.png', 'iot-version-0-5-architecture-cloud-edge-diagram.png',
       'IoT architecture diagram — sensors at the edge, gateway aggregating data, and cloud platform for analytics and rules'],
    ],
  },
  // ---- Angular series ----
  {
    post: 'src/content/blog/angular-2-dependency-injection.md',
    dir: 'public/blog/migrated/2016/09',
    mapping: [
      ['di-in-angular2-5.png', 'angular-2-dependency-injection-component-tree.png',
       'Angular 2 dependency injection diagram — hierarchical injector tree mirroring the component tree, services flowing down to children'],
      ['transient-dependencies-4.png', 'angular-2-transient-dependencies-injector-chain.png',
       'Angular 2 transient dependencies diagram — how the injector chain resolves dependencies up through parent injectors'],
    ],
  },
  {
    post: 'src/content/blog/new-course-angular-2-router-up-and-running.md',
    dir: 'public/blog/migrated/2017/02',
    mapping: [
      ['learn-angular2-WithLukeAngel-Banner1.png', 'learn-angular-2-with-luke-angel-course-banner.png',
       'Course banner for "Learn Angular 2 Router: Up and Running with Luke Angel" — Pluralsight/Udemy promotional graphic'],
    ],
  },
  {
    post: 'src/content/blog/new-course-node-js-the-essentials-api-frameworks-express-koa-sails.md',
    dir: 'public/blog/migrated/2017/03',
    mapping: [
      ['learn-Nodejs-WithLukeAngel-Banner1.png', 'learn-nodejs-essentials-with-luke-angel-course-banner.png',
       'Course banner for "Learn Node.js: The Essentials + API Frameworks (Express, KOA, Sails) with Luke Angel" — promotional graphic'],
    ],
  },
  {
    post: 'src/content/blog/pet-finder-api-javascript-library.md',
    dir: 'public/blog/migrated/2017/02',
    mapping: [
      ['npm-icon.png', 'pet-finder-api-javascript-library-npm-published.png',
       'npm logo — the Pet Finder API JavaScript library is published to npm for easy installation'],
    ],
  },
  // ---- Use SSH ----
  {
    post: 'src/content/blog/use-ssh-on-windows-to-connect-to-linux-virtual-machines-or-docker-containers-on-microsoft-azure-from-a-mac-or-windows-machine.md',
    dir: 'public/blog/migrated/2016/12',
    mapping: [],  // already decent named files
  },
];

let totalRenamed = 0;
let totalImages = 0;
for (const job of jobs) {
  if (job.mapping.length === 0) {
    console.log(`${job.post.split('/').pop()}: skipped (no rename targets)`);
    continue;
  }
  let renamed = 0;
  for (const [oldName, newName] of job.mapping) {
    const oldPath = join(job.dir, oldName);
    const newPath = join(job.dir, newName);
    if (!existsSync(oldPath)) { console.warn(`MISSING: ${oldPath}`); continue; }
    if (existsSync(newPath)) { console.warn(`SKIP target exists: ${newPath}`); continue; }
    renameSync(oldPath, newPath);
    renamed++;
  }
  let md = readFileSync(job.post, 'utf8');
  for (const [oldName, newName, alt] of job.mapping) {
    const oldUrl = `/${job.dir.replace('public/', '')}/${oldName}`;
    const newUrl = `/${job.dir.replace('public/', '')}/${newName}`;
    const re = new RegExp(`!\\[[^\\]]*\\]\\(${oldUrl.replace(/[.*+?^${}()|[\\]\\\\]/g, '\\\\$&')}\\)`, 'g');
    md = md.replace(re, `![${alt}](${newUrl})`);
    md = md.split(oldUrl).join(newUrl);
  }
  writeFileSync(job.post, md, 'utf8');
  console.log(`${job.post.split('/').pop()}: ${renamed}/${job.mapping.length}`);
  totalRenamed += renamed;
  totalImages += job.mapping.length;
}
console.log(`\nTotal: renamed ${totalRenamed}/${totalImages} files across ${jobs.length} posts`);
