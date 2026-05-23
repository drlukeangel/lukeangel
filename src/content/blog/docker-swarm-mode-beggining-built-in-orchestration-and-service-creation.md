---
title: 'Docker Swarm Mode: Built-In Orchestration'
date: 2016-10-17T20:26:28.000Z
category: tools
tags:
  - docker
  - orchestration
  - services
excerpt: What’s new in Docker 1.12 Multi-Host and Multi-Container Orchestration built-in Docker Service and Node added to Docker Engine Security is built into Swarm by default New File format – …
cover: ../../assets/blog/docker-swarm-compose-cover.png
coverAlt: 'Docker Swarm Mode: Beggining Built-In Orchestration and Service Creation'
---

[
](http://lukeangel.co/wp-content/uploads/2016/10/Compose.png)What’s new in Docker 1.12

- ~~Multi-Host and Multi-Container Orchestration built-in

- ~~Docker Service and Node added to Docker Engine

- ~~Security is built into Swarm by default

- ~~New File format – Distributed Application Bundle (DAB) making it easy to distribute multi-service application stacks between hosts.

Built-In Orchestration

![Docker 1.12 built-in orchestration diagram — multi-host and multi-container orchestration baked into the Docker Engine](../../assets/blog/docker-1-12-built-in-orchestration-diagram.png)

Orchestration has become an integral component in the container ecosystem. Actually it so much a key component that Docker has taken the lead and built it directly into the Docker Engine! So what does this mean for our applications? 

Starting with Docker 1.12 we now can deploy and manage applications on a [Docker Swarm](https://docs.docker.com/swarm/).

If you are using 
[~~Docker for Mac~~](https://docs.docker.com/engine/installation/mac/)~~ or [Docker for Windows](https://docs.docker.com/engine/installation/windows/) you are lucky enough to already have Docker 1.12 installed by the latest update. Let’s install a Swarm locally for testing, shall we? 

Open your CLI and run:

![Terminal screenshot: docker swarm init --listen-addr 0.0.0.0:2377 — initializing a local Swarm manager](../../assets/blog/docker-swarm-init-listen-addr-command.png)

The docker swarm init will activate your current Docker Node (Localhost) and promote it to become the Swarm Manager.

![Terminal output after docker swarm init — shows the join token and confirms the node was promoted to Swarm Manager](../../assets/blog/docker-swarm-init-output-swarm-token.png)

Let’s check the status of our Swarm.

![Terminal: docker node ls showing a single-node Swarm with the manager status — verifying the Swarm is running](../../assets/blog/docker-node-ls-swarm-status.png)

We now have a single node Swarm running on our local machine that quickly. Pat yourself on the back as previously this used to be quite some configuration and typing and now we has been achieved faster than you can finish this sentence.

Docker Service

Docker Service is similar to the Docker Run command. With Docker Service we can now build, distribute, load balance and replicate our service across our Docker Swarm.

Since we have a fresh Docker Swarm running waiting for something to do let’s use the new docker service functionality and create a service and push it to our Swarm.

Let’s create a service which Ping’s our Localhost. We will create the service with only 1 instance (replicas) and afterwords scale our service.

First, create the ping service:

![Terminal: docker service create with a ping localhost service running on the Swarm — first deployment](../../assets/blog/docker-service-create-ping-localhost.png)

This will now download the image and start the process on your Docker Swarm.

Check the status of our Ping job:

![Terminal: docker service ls listing the ping service as running with 1 replica on the Swarm](../../assets/blog/docker-service-ls-running-ping.png)

Our service is now running and pinging our Localhost. If you want to see your container running you can still run a $ docker ps to see the container which runs the service.

Docker Service Scale

Now[
](http://lukeangel.co/wp-content/uploads/2016/10/SNAG-0001.png) that our service is running and successfully pinging Localhost let’s scale the ping service. The next command will scale our service from 1 to 3 instances of our process and orchestrate them onto our Swarm.

Scale the ping service:

![Terminal: docker service scale=3 — scaling the ping service from 1 to 3 instances across the Swarm](../../assets/blog/docker-service-scale-3-replicas.png)

Let’s check to see if the scaling worked.

![Terminal: docker service ps showing the ping service now running 3 task replicas after scale — verifying orchestration](../../assets/blog/docker-service-ps-after-scale-verification.png)

Summary

We’ve now successfully built a local Docker Swarm on our Docker for Mac/Windows machine, created a service, and scaled this service. With these new features built into the Docker machine it is even easier to deploy distributed, scalable apps across a hybrid or global infrastructure.

Stay tuned as we provide more news from DockerCon. Also, I will take a deep dive of the Docker Service and how we can really use all the benefits combined with Docker Swarm.

## What changed with built-in Swarm — and why it matters

Pre-1.12, you had three options for orchestrating containers across a fleet: standalone Swarm (separate binary), Kubernetes (steep learning curve), or build-your-own with a config-management tool. Each had a real cost. Swarm-the-separate-tool was conceptually clean but felt bolted on. Kubernetes was (and still is) operationally heavy. Build-your-own was lock-in-by-accident.

Docker 1.12's built-in orchestration changed the math by removing the *install-an-orchestrator* step entirely. The result: a small team could go from "I have Docker on my laptop" to "I have a three-node Swarm with a load-balanced service" in under five minutes. Below that bar, the ROI calculation for "should we orchestrate" tilts heavily toward yes.

## When Swarm is the right choice (and when it isn't)

**Swarm wins when:**

- Team is small (1-10 engineers), wants the orchestration mental load close to zero
- The application is fairly standard — stateless services, a database, maybe a cache
- The team is already invested in Docker and Docker Compose and would rather not adopt a parallel ecosystem
- Cluster size stays modest (a few dozen nodes, hundreds of containers, not thousands)

**Kubernetes wins when:**

- Team is larger or has dedicated platform engineers
- You need fine-grained scheduling, sophisticated network policies, or first-class secrets/config management
- You're building a multi-tenant platform or running across many clouds
- You need the rich ecosystem of operators, service meshes, and observability that Kubernetes' size attracts

Most "we have to use Kubernetes" decisions in small startups in 2016-2017 were status-driven rather than ROI-driven. Swarm would have served those teams better. Hindsight is generous; the lesson holds.

## What I'd add to this post in 2026

Two updates worth noting for readers reaching this post years later:

1. Docker Swarm-the-built-in-orchestrator is still supported but development has slowed. For new projects, Kubernetes is the default expectation in most enterprises now.
2. The pattern this post demonstrates — *built-in orchestration as a competitive advantage* — has fully won. Every modern container platform ships with orchestration baked in. The 2016 surprise of "wait, you don't have to install a separate tool?" is now table stakes.

If you're standing this up fresh today, evaluate against Kubernetes-the-managed-service (EKS, GKE, AKS) rather than Swarm. Swarm is still a valid choice for small homelab and edge deployments. *The map has changed; the territory has not.*

## Gratitude beat

Big thanks to the Docker engineering team for shipping built-in orchestration without breaking the world. *Backward compatibility is a love language.*
