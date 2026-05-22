---
title: "Docker 1.13 – Released"
date: 2017-01-24T09:58:41
category: tools
tags: ["docker", "updates"]
excerpt: "Docker 1.13 is Out with lots of new features, improvements and fixes to help Docker users with New Year&#8217;s resolutions to build more and better container apps. Docker 1.13 builds on and improv…"
wpCategory: "docker"
wpUrl: "/docker/docker-1-13-released/"
cover: "/blog/migrated/2017/01/012417_1758_Docker113R1.jpg"
coverAlt: "Docker 1.13 – Released"
---

~~Docker 1.13 is Out with lots of new features, improvements and fixes to help Docker users with New Year’s resolutions to build more and better container apps. Docker 1.13 builds on and improves [Docker swarm mode introduced in Docker 1.12](https://docs.docker.com/engine/swarm/) and has lots of other fixes. Read on for Docker 1.13 highlights.~~

~~Use compose-files to deploy swarm mode services**
~~

~~Docker 1.13 adds Compose-file support to the `docker stack deploy` command so that services can be deployed using a `docker-compose.yml` file directly. Powering this is a [major effort to extend the swarm service API](https://github.com/docker/docker/issues/25303) to make it more flexible and useful.~~

~~Benefits include:~~**
~~~~

- ~~Specifying the number of desired instances for each service~~

- ~~Rolling update policies~~

- ~~Service constraints~~

~~Deploying a multi-host, multi-service stack is now as simple as:~~**
~~~~

~~docker stack deploy –compose-file=docker-compose.yml my_stack**
~~

## ~~Improved CLI backwards compatibility**
~~

~~Ever been bitten by the dreaded Error response from daemon: client is newer than server problem because your Docker CLI was updated, but you still need to use it with older Docker engines?~~**
~~~~

~~Starting with 1.13, [newer CLIs can talk to older daemons](https://github.com/docker/docker/pull/27745). We’re also adding feature negotiation so that proper errors are returned if a new client is attempting to use features not supported in an older daemon. This greatly improves interoperability and makes it much simpler to manage Docker installs with different versions from the same machine.~~

## ~~Clean-up commands**
~~

~~Docker 1.13 introduces a couple of nifty commands to help users understand how much disk space Docker is using, and help remove unused data.~~**
~~~~

- ~~docker system df will show used space, similar to the unix tool df~~

- ~~docker system prune will remove all unused data.~~

~~Prune can also be used to clean up just some types of data. For example: docker volume prune removes unused volumes only.~~**
~~~~

## ~~CLI restructured**
~~

~~Docker has grown many features over the past couple years and the Docker CLI now has a lot of commands (40 at the time of writing). Some, like build or run are used a lot, some are more obscure, like pause or history. The many top-level commands clutters help pages and makes tab-completion harder.~~**
~~~~

~~In Docker 1.13, we regrouped every command to sit under the logical object it’s interacting with. For example list and startof containers are now subcommands of docker container and history is a subcommand of docker image.**
~~

~~docker container list docker container start docker image history**
~~

~~These changes let us clean up the Docker CLI syntax, improve help text and make Docker simpler to use. The old command syntax is still supported, but we encourage everybody to adopt the new syntax.**
~~

## ~~Monitoring improvements**
~~

~~docker service logs is a powerful new experimental command that makes debugging services much simpler. Instead of having to track down hosts and containers powering a particular service and pulling logs from those containers, docker service logs pulls logs from all containers running a service and streams them to your console.~~**
~~~~

~~Docker 1.13 also [adds an experimental Prometheus-style endpoint](https://github.com/docker/docker/pull/25820) with basic metrics on containers, images and other daemon stats.~~

## ~~Build improvements**
~~

~~docker build has a new experimental –squash flag. When squashing, Docker will take all the filesystem layers produced by a build and collapse them into a single new layer. This can simplify the process of creating minimal container images, but may result in slightly higher overhead when images are moved around (because squashed layers can no longer be shared between images). Docker still caches individual layers to make subsequent builds fast.~~**
~~~~

~~1.13 also has [support for compressing the build context](https://github.com/docker/docker/pull/25837) that is sent from CLI to daemon using the –compress flag. This will speed up builds done on remote daemons by reducing the amount of data sent.~~

## ~~Docker for AWS and Azure out of beta**
~~

~~Docker for AWS and Azure are out of public beta and ready for production. We’ve spent the past 6 months perfecting Docker for AWS and Azure and incorporating user feedback, and we’re incredibly grateful to all the users that helped us test and identify problems. Also, stay tuned for more updates and enhancements over the coming months.~~**
~~~~

## ~~Get started with Docker 1.13**
~~

~~Docker for Mac and Windows users on both beta and stable channels will get automatic upgrade notifications (in fact, beta channel users have been running Docker 1.13 release clients for the past couple of months). If you’re new to Docker, download Docker for [Mac](https://docs.docker.com/docker-for-mac/) and [Windows](https://docs.docker.com/docker-for-windows/) to get started.~~

~~To deploy [Docker for AWS](https://docs.docker.com/docker-for-aws/) or [Docker for Azure](https://docs.docker.com/docker-for-azure/), check out the docs or use these buttons to get started:~~

[![](/blog/migrated/2017/01/012417_1758_Docker113R2.png)](https://console.aws.amazon.com/cloudformation/home)

[![](/blog/migrated/2017/01/012417_1758_Docker113R3.png)](https://portal.azure.com/)

~~ ~~**
~~~~
