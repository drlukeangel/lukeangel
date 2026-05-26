---
title: "Lambda vs Fargate vs ECS — the napkin decision tree"
date: 2024-02-06T16:20:00-05:00
category: tools
tags:
  - aws
  - lambda
  - fargate
  - ecs
  - architecture
notebook: building-with-ai-ml
notebookOrder: 3
excerpt: "Four questions, in order. The right AWS compute choice usually picks itself by question two. Notes from an architecture review the team kept losing the same way."
pullquote: "Cold-start tolerance is the question; everything else is a follow-up."
cover: "../../assets/blog/lambda-fargate-ecs-napkin-tree-cover.svg"
coverAlt: "A branching path forking from a single trunk into three landing pads of increasing size — a small serverless puck, a single container box, and a rack of boxes on a host — the compute choice narrowing as the workload grows."
---

My team has been running the same forty-minute architecture-review meeting for a year. New service, three engineers in the room, the question is *Lambda, Fargate, or ECS,* and we re-derive the answer from first principles every single time.

I got tired of it. So I drew a four-question decision tree on a napkin at lunch last week and made everyone agree to use it. Notes here so it lives somewhere besides the napkin, which I have lost.

## The four questions, in order

![The four-question decision tree drawn as a flowchart. Start at the top. Question 1: must it be ready in under 100 ms cold? If yes, not Lambda — fall through to the container side. Question 2: does it run longer than 15 minutes at a stretch? If yes, not Lambda. If both answers are no, Lambda is the default for the cold-tolerant, short workload. On the container side, Question 3: does it need a runtime Lambda doesn't ship? and Question 4: is utilization high enough or do you need instance control? High utilization or instance control routes to ECS on EC2; otherwise Fargate. The three leaves are Lambda, Fargate, and ECS.](../../assets/blog/lambda-fargate-ecs-decision-tree.svg)

### 1. Does this workload have to be ready in under 100 ms cold?

If yes — interactive user-facing path, real-time event processing where 200 ms tail latency tanks the experience — you can't use Lambda for the cold path. Lambda cold-starts on Node are around 200 ms; on Java without SnapStart it's a second or two. SnapStart helps for Java, but Python and .NET don't have it yet.

For the cold-tolerant workload — async jobs, scheduled tasks, webhooks, things on a queue — Lambda is the right default.

### 2. Will this run for more than 15 minutes at a stretch?

Lambda has a 15-minute execution cap. Always has, probably always will. If the workload is a long-running batch process, ML training, video encoding, anything where the per-invocation budget is genuinely longer than 15 minutes, Lambda's out.

Fargate or ECS for those.

### 3. Do you need a *specific* runtime environment that Lambda doesn't ship?

Lambda has a fixed set of runtimes and a Linux Amazon Linux 2 base. If the workload needs a system library Lambda doesn't have, a custom kernel module, a specific FFmpeg build, or anything that needs a particular Docker base image — you can do this with Lambda container images, but the friction is enough that Fargate or ECS is usually the right move.

### 4. Are you running enough hours per month that "always on" is cheaper than "pay per request"?

This is the only question with real math behind it. The rule of thumb on my team: if a service runs more than about 40% of the hours in a month, ECS Fargate ends up cheaper than Lambda at typical request rates. Below that, Lambda's per-invocation pricing wins. AWS publishes a calculator; we don't trust it without checking against our own request-pattern data.

![The cost crossover, drawn as two lines on a utilization-versus-cost plot. The horizontal axis is the fraction of hours per month the service is busy, from idle on the left to always-on on the right. Lambda's cost line starts near zero and climbs steeply with utilization, because you pay per invocation. Fargate's line starts higher — there's a floor for keeping a task running — but climbs gently, because an always-on task costs roughly the same whether it's busy or idle. The two lines cross at roughly 40 percent utilization: left of the crossover Lambda is cheaper, right of it Fargate is cheaper.](../../assets/blog/lambda-fargate-cost-crossover.svg)

Different question: do you need to control instance shape (memory + CPU ratio, GPU access, specific networking) more tightly than Fargate exposes? If yes, ECS on EC2.

## The flowchart, in two sentences

*If cold-start sensitive or runs > 15 min → not Lambda.*
*If high enough utilization or needs instance control → ECS over Fargate; otherwise Fargate.*
*Else Lambda.*

That's it. Four questions, three sentences, one decision.

## Where this breaks

The decision tree assumes you're already inside AWS. If you're greenfield and could go to a different cloud, that's a bigger conversation. The tree also assumes the workload is a service — for *batch* workloads, AWS Batch is the obvious answer and isn't in the tree because the question doesn't come up the same way.

It also doesn't address EKS. We use EKS at our company for the workloads where Kubernetes is a hard requirement from elsewhere in the org. That's a different decision than the compute one. If you're standing up a new service and asking "should I use Kubernetes" without an external constraint forcing the answer, the answer is no.

## The meeting that doesn't happen anymore

The point of the tree isn't that I think compute decisions are simple. It's that they're not the most expensive decision in the architecture, and they deserve five minutes of room, not forty.

Our team's architecture reviews are now back to spending the bulk of the hour on the actual hard parts — data model, failure modes, observability — instead of relitigating Lambda vs ECS for the fifth time this quarter.

Print the tree. Tape it to the conference room wall. Get the time back.
