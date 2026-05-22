#!/usr/bin/env node
import { readFileSync, writeFileSync, renameSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const imageDir = 'public/blog/migrated/2016/11';
const post = 'src/content/blog/docker-monitoring-setup-docker-monitoring-with-using-cadvisor-influxdb-and-grafana.md';

const mapping = [
  ['111416_0005_DockerMonit1.png', 'docker-monitoring-influxdb-login-screen.png',
   'InfluxDB login screen at port 8083 — used to verify the time-series database container is running and accessible'],
  ['111416_0005_DockerMonit2.png', 'docker-monitoring-influxdb-create-cadvisor-database.png',
   'InfluxDB UI creating the cadvisor database — where cAdvisor will write Docker container metrics over time'],
  ['111416_0005_DockerMonit3.png', 'docker-monitoring-cadvisor-host-stats-dashboard.png',
   'cAdvisor web UI at port 8080 — Google’s container monitoring tool showing realtime CPU, memory, and filesystem stats for the Docker host and its containers'],
  ['111416_0005_DockerMonit4.png', 'docker-monitoring-grafana-influxdb-data-source-config.png',
   'Grafana Data Sources screen — adding the influxdb container as a data source with proxy access and the cadvisor database selected'],
  ['111416_0005_DockerMonit5.png', 'docker-monitoring-grafana-add-graph-panel.png',
   'Grafana dashboard with the Add Panel → Graph option highlighted — first step in building a monitoring panel'],
  ['111416_0005_DockerMonit6.png', 'docker-monitoring-grafana-edit-graph-title.png',
   'Grafana graph panel with the title area expanded for the Edit action — opens the query editor for the new panel'],
  ['111416_0005_DockerMonit7.png', 'docker-monitoring-grafana-fs-limit-usage-query.png',
   'Grafana query editor with two queries against the stats series — mean(fs_limit) aliased as Limit and mean(fs_usage) aliased as Usage'],
  ['111416_0005_DockerMonit8.png', 'docker-monitoring-grafana-complete-dashboard-cpu-memory-bandwidth.png',
   'Complete Grafana Docker-monitoring dashboard — bandwidth, CPU usage per container, memory usage, and filesystem limit/usage panels'],
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
  const oldUrl = `/blog/migrated/2016/11/${oldName}`;
  const newUrl = `/blog/migrated/2016/11/${newName}`;
  const re = new RegExp(`!\\[[^\\]]*\\]\\(${oldUrl.replace(/[.*+?^${}()|[\\]\\\\]/g, '\\\\$&')}\\)`, 'g');
  md = md.replace(re, `![${alt}](${newUrl})`);
  md = md.split(oldUrl).join(newUrl);
}
writeFileSync(post, md, 'utf8');
console.log('Markdown rewritten.');
