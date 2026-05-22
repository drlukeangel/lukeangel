#!/usr/bin/env node
// Batch rename + alt update for medium-sized posts:
// run-windows-and-linux-containers (7), a-shortlist-of-where-to-find-docker-hosting (6),
// docker-networking-drivers-use-cases (6), robots-take-on-the-small-farm (5).

import { readFileSync, writeFileSync, renameSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';

const jobs = [
  {
    post: 'src/content/blog/run-windows-and-linux-containers-on-windows-10.md',
    dir: 'public/blog/migrated/2016/10',
    mapping: [
      ['101416_0423_RunLinuxand1.gif', 'docker-for-windows-tray-icon-switch-linux-windows-containers.gif',
       'Animated demo of the Docker for Windows tray-icon menu — clicking "Switch to Windows containers" toggles the engine without changing environment variables'],
      ['101416_0423_RunLinuxand2.png', 'docker-windows-process-monitor-tree-engine-switch.png',
       'Sysinternals Process Monitor tree — dockerd.exe and com.docker.proxy.exe processes before and after the switch from Linux to Windows containers'],
      ['101416_0423_RunLinuxand3.png', 'docker-windows-dockercli-switch-daemon-powershell.png',
       'PowerShell running DockerCli.exe -SwitchDaemon — command-line equivalent of the tray-icon switch between engines'],
      ['101416_0423_RunLinuxand4.png', 'docker-windows-edge-browser-nginx-linux-container.png',
       'Microsoft Edge displaying the nginx welcome page served from a Linux container still running on Docker for Windows'],
      ['101416_0423_RunLinuxand5.png', 'docker-windows-build-run-nanoserver-node-webserver.png',
       'PowerShell terminal building and running a Windows Nanoserver Node.js webserver container with docker build and docker run -p 81:81'],
      ['101416_0423_RunLinuxand6.png', 'docker-windows-container-ip-curl-output.png',
       'PowerShell using docker inspect to read the Windows container IP, then opening it in the browser to confirm the Node.js webserver responds'],
      ['101416_0423_RunLinuxand7.png', 'docker-windows-port-forward-host-machine-access.png',
       'Browser on the host machine reaching the Windows container webserver on port 81 via Docker port forwarding'],
    ],
  },
  {
    post: 'src/content/blog/a-shortlist-of-where-to-find-docker-hosting.md',
    dir: 'public/blog/migrated/2017/01',
    mapping: [
      ['011017_2125_AShortlisto1.png', 'docker-hosting-shortlist-cover-btreepress.png',
       'Header graphic for the Docker hosting shortlist post — links to BTreePress Docker courses'],
      ['011017_2125_AShortlisto2.png', 'docker-hosting-aws-ecs-fargate-options.png',
       'AWS EC2 Container Service (ECS) and Fargate diagrams — managed Docker hosting on AWS'],
      ['011017_2125_AShortlisto3.png', 'docker-hosting-google-container-engine-gke.png',
       'Google Container Engine (GKE) console — managed Kubernetes-based Docker hosting on Google Cloud'],
      ['011017_2125_AShortlisto4.png', 'docker-hosting-azure-container-service-acs.png',
       'Microsoft Azure Container Service (ACS) — Docker hosting on Azure with DC/OS, Swarm, or Kubernetes orchestrator options'],
      ['011017_2125_AShortlisto5.png', 'docker-hosting-digitalocean-docker-droplet.png',
       'DigitalOcean Docker droplet setup screen — one-click Docker host provisioning'],
      ['011017_2125_AShortlisto6.png', 'docker-hosting-tutum-docker-cloud-dashboard.png',
       "Tutum / Docker Cloud dashboard — Docker's own managed hosting and orchestration platform"],
    ],
  },
  {
    post: 'src/content/blog/docker-networking-drivers-use-cases-and-definitions.md',
    dir: 'public/blog/migrated/2017/01',
    mapping: [
      ['docker-networking-diagram-4.png', 'docker-networking-bridge-driver-diagram.png',
       'Docker bridge network driver diagram — default isolated network for single-host containers communicating through a virtual bridge'],
      ['docker-networking-diagram-3.png', 'docker-networking-overlay-driver-multi-host.png',
       'Docker overlay network driver diagram — VXLAN-based network connecting containers across multiple Docker hosts in a Swarm'],
      ['docker-networking-diagram-2.png', 'docker-networking-host-driver-no-isolation.png',
       'Docker host network driver diagram — container shares the host network namespace directly without isolation'],
      ['docker-networking-diagram-1.png', 'docker-networking-macvlan-driver-diagram.png',
       'Docker macvlan network driver diagram — assigns containers their own MAC and IP on the physical LAN'],
    ],
  },
  {
    post: 'src/content/blog/robots-take-on-the-small-farm.md',
    dir: 'public/blog/migrated/2017/04',
    mapping: [
      ['041917_0415_RobotsTakeo2.jpg', 'small-farm-robot-precision-weeding-machine.jpg',
       'Autonomous precision-weeding robot working a row crop — agricultural automation reducing herbicide use on small farms'],
      ['041917_0415_RobotsTakeo3.jpg', 'small-farm-robot-rowbot-corn-fertilizer.jpg',
       'Rowbot field robot driving between corn rows — applies side-dress fertilizer late in the growing season without crushing plants'],
      ['041917_0415_RobotsTakeo4.jpg', 'small-farm-robot-blue-river-see-and-spray.jpg',
       "Blue River Technology's See & Spray robot — computer-vision system that distinguishes crops from weeds and sprays only the weeds"],
      ['041917_0415_RobotsTakeo5.jpg', 'small-farm-robot-autonomous-tractor.jpg',
       'Autonomous tractor working a small farm field — GPS-guided machinery enabling smaller-scale agricultural mechanization'],
      ['041917_0415_RobotsTakeo6.png', 'small-farm-robot-startup-funding-chart.png',
       'Chart of small-farm robotics startup funding growth — illustrating the surge of investment in agricultural automation'],
    ],
  },
];

for (const job of jobs) {
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
  console.log(`${job.post.split('/').pop()}: renamed ${renamed}/${job.mapping.length}`);
}
