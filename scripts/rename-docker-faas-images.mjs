#!/usr/bin/env node
import { readFileSync, writeFileSync, renameSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const imageDir = 'public/blog/migrated/2017/04';
const post = 'src/content/blog/docker-servless-faas-functions-as-a-service.md';

const mapping = [
  ['042617_1517_DockerServl2.png', 'docker-faas-technology-evolution-servers-vms-containers.png',
   'Technology evolution diagram — bare servers → VMs → containers → Functions-as-a-Service (FaaS) at the top of the abstraction stack'],
  ['042617_1517_DockerServl3.png', 'docker-faas-application-view-event-driven.png',
   'Application view of a FaaS architecture — short-lived event-driven functions invoked over HTTP, decoupled from infrastructure management'],
  ['042617_1517_DockerServl4.png', 'docker-faas-martin-fowler-serverless-overview.png',
   "Martin Fowler's serverless overview diagram — characteristics of FaaS including event-driven, scaling, and infrastructure abstraction"],
  ['042617_1517_DockerServl5.png', 'docker-faas-gateway-tester-browser-ui.png',
   'FaaS gateway tester UI in the browser — invoke each sample function directly to verify behavior'],
  ['042617_1517_DockerServl6.png', 'docker-faas-ui-sample-functions-installed.png',
   'FaaS web UI showing ~10 sample functions installed by default — word count, Docker Hub repo query, and more'],
  ['042617_1517_DockerServl7.png', 'docker-faas-create-new-function-sha256sum.png',
   'FaaS Create New Function form — using the alpine boilerplate image to wrap a sha256sum UNIX process as a function'],
  ['042617_1517_DockerServl8.png', 'docker-faas-ui-invocation-count-replicas.png',
   'FaaS UI showing the invocation count climbing and the replica count scaling in increments of 5 and 10 under load'],
  ['042617_1517_DockerServl9.png', 'docker-faas-prometheus-scaling-graph.png',
   'Prometheus graph of FaaS replica scaling over time — built-in metrics tracking the auto-scale response to traffic'],
  ['042617_1517_DockerServl10.png', 'docker-faas-grafana-replica-scaling-dashboard.png',
   'Grafana dashboard of FaaS replicas — visualizing how the function scaled up and down with the curl loop traffic'],
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
  const oldUrl = `/blog/migrated/2017/04/${oldName}`;
  const newUrl = `/blog/migrated/2017/04/${newName}`;
  const re = new RegExp(`!\\[[^\\]]*\\]\\(${oldUrl.replace(/[.*+?^${}()|[\\]\\\\]/g, '\\\\$&')}\\)`, 'g');
  md = md.replace(re, `![${alt}](${newUrl})`);
  md = md.split(oldUrl).join(newUrl);
}
writeFileSync(post, md, 'utf8');
console.log('Markdown rewritten.');
