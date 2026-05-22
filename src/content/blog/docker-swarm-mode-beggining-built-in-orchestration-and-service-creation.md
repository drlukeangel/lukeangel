---
title: "Docker Swarm Mode: Beggining Built-In Orchestration and Service Creation"
date: 2016-10-17T20:26:28
category: tools
tags: ["docker", "orchestration", "services"]
excerpt: "What&#8217;s new in Docker 1.12 Multi-Host and Multi-Container Orchestration built-in Docker Service and Node added to Docker Engine Security is built into Swarm by default New File format &#8211; …"
wpCategory: "docker"
wpUrl: "/docker/docker-swarm-mode-beggining-built-in-orchestration-and-service-creation/"
cover: "/blog/migrated/2016/10/Compose.png"
coverAlt: "Docker Swarm Mode: Beggining Built-In Orchestration and Service Creation"
---

[**
](http://lukeangel.co/wp-content/uploads/2016/10/Compose.png)What’s new in Docker 1.12

- ~~Multi-Host and Multi-Container Orchestration built-in~~

- ~~Docker Service and Node added to Docker Engine~~

- ~~Security is built into Swarm by default~~

- ~~New File format – Distributed Application Bundle (DAB) making it easy to distribute multi-service application stacks between hosts.~~

Built-In Orchestration

![Docker Built In Orchenstration](/blog/migrated/2016/10/docker_1_12.png)

~~Orchestration has become an integral component in the container ecosystem. Actually it so much a key component that Docker has taken the lead and built it directly into the Docker Engine! So what does this mean for our applications? ~~~~**
~~

![Docker 1.12](file:///C:/Users/geoff/AppData/Local/Temp/msohtmlclip1/01/clip_image002.png)

~~Starting with Docker 1.12 we now can deploy and manage applications on a ~~[~~Docker Swarm~~](https://docs.docker.com/swarm/)~~.~~

~~If you are using ~~~~**
~~[~~Docker for Mac~~](https://docs.docker.com/engine/installation/mac/)~~ or ~~[~~Docker for Windows~~](https://docs.docker.com/engine/installation/windows/)~~ you are lucky enough to already have Docker 1.12 installed by the latest update. Let’s install a Swarm locally for testing, shall we? ~~

Open your CLI and run:

[![docker swarm init](/blog/migrated/2016/10/SNAG-0006.png)](https://i2.wp.com/lukeangel.co/wp-content/uploads/2016/10/SNAG-0006.png)

The docker swarm init will activate your current Docker Node (Localhost) and promote it to become the Swarm Manager.

[![snag-0005](/blog/migrated/2016/10/SNAG-0005.png)](https://i0.wp.com/lukeangel.co/wp-content/uploads/2016/10/SNAG-0005.png)

Let’s check the status of our Swarm.

[![Socker Swarm Check Status](/blog/migrated/2016/10/SNAG-0004.png)](https://i2.wp.com/lukeangel.co/wp-content/uploads/2016/10/SNAG-0004.png)

We now have a single node Swarm running on our local machine that quickly. Pat yourself on the back as previously this used to be quite some configuration and typing and now we has been achieved faster than you can finish this sentence.

Docker Service

Docker Service is similar to the Docker Run command. With Docker Service we can now build, distribute, load balance and replicate our service across our Docker Swarm.

Since we have a fresh Docker Swarm running waiting for something to do let’s use the new docker service functionality and create a service and push it to our Swarm.

Let’s create a service which Ping’s our Localhost. We will create the service with only 1 instance (replicas) and afterwords scale our service.

First, create the ping service:

[![docker service create](/blog/migrated/2016/10/SNAG-0003.png)](https://i0.wp.com/lukeangel.co/wp-content/uploads/2016/10/SNAG-0003.png)This will now download the image and start the process on your Docker Swarm.

Check the status of our Ping job:

[![snag-0002](/blog/migrated/2016/10/SNAG-0002.png)](https://i0.wp.com/lukeangel.co/wp-content/uploads/2016/10/SNAG-0002.png)

Our service is now running and pinging our Localhost. If you want to see your container running you can still run a $ docker ps to see the container which runs the service.

Docker Service Scale

Now[**
](http://lukeangel.co/wp-content/uploads/2016/10/SNAG-0001.png) that our service is running and successfully pinging Localhost let’s scale the ping service. The next command will scale our service from 1 to 3 instances of our process and orchestrate them onto our Swarm.

Scale the ping service:

![snag-0001](/blog/migrated/2016/10/SNAG-0001.png)

Let’s check to see if the scaling worked.

[![snag-0000](/blog/migrated/2016/10/SNAG-0000.png)](https://i2.wp.com/lukeangel.co/wp-content/uploads/2016/10/SNAG-0000.png)

Summary

We’ve now successfully built a local Docker Swarm on our Docker for Mac/Windows machine, created a service, and scaled this service. With these new features built into the Docker machine it is even easier to deploy distributed, scalable apps across a hybrid or global infrastructure.

Stay tuned as we provide more news from DockerCon. Also, I will take a deep dive of the Docker Service and how we can really use all the benefits combined with Docker Swarm.
