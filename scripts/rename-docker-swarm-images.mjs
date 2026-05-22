#!/usr/bin/env node
import { readFileSync, writeFileSync, renameSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const imageDir = 'public/blog/migrated/2016/10';
const post = 'src/content/blog/docker-swarm-mode-beggining-built-in-orchestration-and-service-creation.md';

const mapping = [
  ['Compose.png', 'docker-swarm-compose-cover.png',
   'Docker Compose logo — cover image for the Docker 1.12 Swarm Mode tutorial'],
  ['docker_1_12.png', 'docker-1-12-built-in-orchestration-diagram.png',
   'Docker 1.12 built-in orchestration diagram — multi-host and multi-container orchestration baked into the Docker Engine'],
  ['SNAG-0006.png', 'docker-swarm-init-listen-addr-command.png',
   'Terminal screenshot: docker swarm init --listen-addr 0.0.0.0:2377 — initializing a local Swarm manager'],
  ['SNAG-0005.png', 'docker-swarm-init-output-swarm-token.png',
   'Terminal output after docker swarm init — shows the join token and confirms the node was promoted to Swarm Manager'],
  ['SNAG-0004.png', 'docker-node-ls-swarm-status.png',
   "Terminal: docker node ls showing a single-node Swarm with the manager status — verifying the Swarm is running"],
  ['SNAG-0003.png', 'docker-service-create-ping-localhost.png',
   "Terminal: docker service create with a ping localhost service running on the Swarm — first deployment"],
  ['SNAG-0002.png', 'docker-service-ls-running-ping.png',
   "Terminal: docker service ls listing the ping service as running with 1 replica on the Swarm"],
  ['SNAG-0001.png', 'docker-service-scale-3-replicas.png',
   "Terminal: docker service scale=3 — scaling the ping service from 1 to 3 instances across the Swarm"],
  ['SNAG-0000.png', 'docker-service-ps-after-scale-verification.png',
   "Terminal: docker service ps showing the ping service now running 3 task replicas after scale — verifying orchestration"],
];

let renamed = 0;
for (const [oldName, newName] of mapping) {
  const oldPath = join(imageDir, oldName);
  const newPath = join(imageDir, newName);
  if (!existsSync(oldPath)) { console.warn(`MISSING: ${oldName}`); continue; }
  if (existsSync(newPath)) { console.warn(`SKIP target exists: ${newName}`); continue; }
  renameSync(oldPath, newPath);
  renamed++;
}
console.log(`Renamed ${renamed}/${mapping.length} files`);

let md = readFileSync(post, 'utf8');
for (const [oldName, newName, alt] of mapping) {
  const oldUrl = `/blog/migrated/2016/10/${oldName}`;
  const newUrl = `/blog/migrated/2016/10/${newName}`;
  const re = new RegExp(`!\\[[^\\]]*\\]\\(${oldUrl.replace(/[.*+?^${}()|[\\]\\\\]/g, '\\\\$&')}\\)`, 'g');
  md = md.replace(re, `![${alt}](${newUrl})`);
  md = md.split(oldUrl).join(newUrl);
}
writeFileSync(post, md, 'utf8');
console.log('Markdown rewritten.');
