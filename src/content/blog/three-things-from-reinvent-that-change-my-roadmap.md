---
title: "Three things from re:Invent that actually change my roadmap"
date: 2024-12-09T17:11:00-05:00
category: tools
tags:
  - aws
  - reinvent
  - bedrock
  - sagemaker
  - nova
  - llms
excerpt: "AWS announced two hundred things last week. Three of them actually change what we'll build next year. Notes from re:Invent 2024, written on the plane home."
pullquote: "AWS announces two hundred things. You change your roadmap based on three."
notebook: building-with-ai-ml
notebookOrder: 6
cover: "../../assets/blog/reinvent-2024-three-things-cover.svg"
coverAlt: "A tall stack of paper announcements with three of its cards pulled out and set apart, each marked with a small change arrow — the signal pulled from the volume."
---

re:Invent 2024 ended Friday. I was there. The announcement pace was, as always, deliberately overwhelming. I spent yesterday afternoon writing the list of *everything* AWS announced; it was four pages.

The list of things that actually change *my* team's roadmap is much shorter. Three items. Here they are, with the reasoning.

## 1. Bedrock Prompt Caching — agent costs got cheaper by an order of magnitude

What it is: Bedrock now lets you mark portions of your prompt as cached. On subsequent calls that share the same prefix (system prompt, tool definitions, knowledge-base context), you pay a fraction of the input-token cost for the cached portion. It shipped alongside Intelligent Prompt Routing, the other half of the same cost-optimization push.

The caveat I'm writing down before I get excited: it's a **preview**, not GA. It's live in `us-west-2` for Claude 3.5 Sonnet v2 and Claude 3.5 Haiku, and in `us-east-1` for the new Nova models. A preview feature can change its pricing, its API surface, or its cache TTL between now and GA, so anything I plan on it is planned *in pencil*.

Why this matters for us: our agent loops re-send the same 4K-token system prompt + tool definitions on *every* iteration. With a 10-step agent run, we were paying for that 4K prefix ten times. With prompt caching, we pay full price once and the cache rate after.

The math, on the preview's published discount: at Claude 3.5 Sonnet v2 pricing, our agent's per-run cost drops from roughly $0.18 to $0.04. We run about 50,000 agent invocations a month. That's $7K/month back, which we'll redirect into the more aggressive evaluation runs we'd been deferring on cost.

**Roadmap change:** the cost ceiling that was capping our agent rollout to power users lifts. Opening agent-assisted features to free-tier users in Q1 moves from "off the table at the old cost shape" to "on the table, *if* the feature reaches GA on a timeline and price I can commit to." I'm not promising a launch on a preview. I'm un-blocking the planning.

![Two billing pictures of the same ten-step agent run, side by side. Before prompt caching, every step re-sends the 4K-token system-and-tools prefix at full price plus a small block of new tokens — the prefix is billed ten times, for about $0.18 per run. After, step one pays the prefix at full price and the next nine pay it at the much cheaper cache rate, for about $0.04 per run. At roughly 50,000 runs a month the difference is about $7,000 a month back.](../../assets/blog/reinvent-2024-prompt-caching-agent-loop.svg)

## 2. The SageMaker rebrand + unification — data and ML stop being two separate orgs

What happened: the product formerly known as SageMaker is now **SageMaker AI**. The umbrella product called **SageMaker** (no "AI") is the new unified data + ML platform that wraps SageMaker AI, Athena, Redshift, QuickSight, EMR, Glue, and Lake Formation under a shared workspace and lineage model.

Why this matters for us: at our company, "the data team" and "the ML team" report to different VPs, build on different stacks, and meet to argue about ownership boundaries about once a quarter. The unified SageMaker doesn't fix the org problem, but it does mean the tooling stops *reinforcing* the org problem.

Specifically: the pitch is that a SageMaker Unified Studio notebook can query Redshift, materialize the result into a governed lakehouse table, train a model on it via SageMaker AI, and run drift monitoring against it — all with the same lineage graph behind it. Previously, each of those steps lived in a different tool with different permissions and no shared lineage. The lakehouse sits on an open, Iceberg-compatible architecture, which matters because it means I'm not betting on a proprietary table format to get the unification.

The caveat, same as item 1: **Unified Studio is in preview** (GA slated for 2025). SageMaker AI itself and the lakehouse are GA, but the single-pane studio I'm most interested in is the part that isn't done yet. So this is a "watch it converge," not a "build on it."

**Roadmap change:** we were planning to invest a quarter in stitching together our own data+ML lineage tooling. That project is now scoped down to "evaluate whether SageMaker Unified does enough of it once it's GA." The honest answer is *probably*, with caveats; we'll know by end of Q1.

## 3. Bedrock Marketplace + the Nova family — pricing pressure on every model we use

What happened: AWS announced **Amazon Nova** — a family of in-house foundation models (Micro, Lite, Pro now GA, with Premier coming in early 2025) that AWS is pricing at least 75% under the best performer in each intelligence class on Bedrock. Separately, **Bedrock Marketplace** opened the door to over 100 additional models — Mistral's NeMo Instruct, TII's Falcon, Writer's Palmyra-Fin for finance, biology-specific models from EvolutionaryScale, and a long tail of specialty and fine-tuned models. They reach through the same Bedrock APIs, but the mechanism is worth noting: a Marketplace model deploys onto a SageMaker endpoint you provision, so it's not the serverless, pay-per-token shape the first-party Bedrock models have. That changes the cost math for anything I'd run through it.

Why this matters: the *model* layer in our application has been a Claude-3.5-Sonnet monopoly for nine months. That was fine when Claude was clearly the best fit; it's stopped being a defensible monopoly now that Nova Pro exists at lower price and Marketplace has fine-tuned specialists for specific tasks.

**Roadmap change:** we're going to run our eval suite against Nova Pro and a couple of Marketplace models in Q1 to see if we can split the work — Nova for the high-volume cheap-classification path, Claude for the harder reasoning path. If the eval comes out favorable, that's another 30 – 40% cost reduction on top of prompt caching.

This is the most interesting kind of roadmap change: not a *capability* change, but an *optionality* change. The work we do is now eval-driven on the model choice, not vendor-driven.

![The model layer before and after. Before: our app sends every request to a single reasoning model — one model carries the cheap classification work and the hard reasoning alike, and there is no choice to make. After: the app's requests pass through an eval-driven router that splits them by task — high-volume cheap classification goes to a low-cost model, the harder path goes to the reasoning model. The shift is from vendor-driven to eval-driven: the model choice is now an evaluation, not a contract.](../../assets/blog/reinvent-2024-model-optionality.svg)

## Three things I'm not (yet) changing my roadmap for

To be honest about scope:

- **Aurora DSQL.** Announced as a distributed SQL database with multi-region active-active writes. Genuinely interesting; we don't have a workload that needs it today. I'm watching it for the next greenfield service.
- **S3 Tables.** Apache Iceberg natively on S3, with automatic compaction and snapshot management. We have an Iceberg-on-S3 setup we maintain ourselves. The migration to managed S3 Tables is a Q2 candidate, not a Q1 one.
- **Trainium2.** New chip, big speedups for model training. We don't train foundation models, so this is a "watch the per-token pricing on Nova" effect for us, not a direct change. The teams that *do* train are absolutely going to look at it.

## The pattern that's emerging

The caveat that runs under all three items is maturity. Two of the things I care about most are still in preview, and a preview can move its price, API, or cache TTL before GA — so I sort the roadmap by what I can build on now versus what I can only plan in pencil:

![A two-column sort of the re:Invent roadmap items by maturity. On the left, under GA build on it now, two green cards: the Nova family Micro Lite Pro driving an eval-driven model split in Q1, and SageMaker AI plus the Iceberg-compatible lakehouse, GA today. On the right, under PREVIEW plan in pencil, two dashed amber cards: Bedrock Prompt Caching, live only in us-west-2 and us-east-1 with a TTL that may change, and SageMaker Unified Studio, GA slated for 2025, watch it converge. A bottom row contrasts the consequence: a GA item lets you commit a launch on a fixed price and timeline, while a preview item only un-blocks planning — no promise made on a preview.](../../assets/blog/three-things-from-reinvent-that-change-my-roadmap-fig-1.svg)

Three patterns I noticed across the announcements:

1. **AWS is making the LLM-app stack cheaper to operate**, not more capable. Prompt caching, model distillation, intelligent prompt routing — all cost-optimization features for workloads that work. The capability frontier moved less this year; the cost frontier moved a lot.

2. **The "managed AI" pattern is converging with the "managed data" pattern**. SageMaker unification, S3 Tables, Aurora DSQL — these are all bets that the data infrastructure under an AI app is *the* infrastructure under any modern app. We're going to talk about "AI platforms" less in 2025 and "data platforms with AI on top" more.

3. **First-party AWS models are credible threats to first-party choices.** Nova Pro is not Claude 3.5 Sonnet. It is, however, good enough that the choice now requires running an eval. That was not the case at this time last year, when Titan was the only Amazon-built foundation model and nobody was using it for anything serious.

## The flight home

I'm typing this on the plane. The list of *announcements* is four pages; the list of *roadmap changes* is three items. That ratio is normal for re:Invent and I think it's healthy.

The temptation, especially as a leader, is to come back from a conference like this and want to rewrite the roadmap to chase what you saw. Don't. The roadmap that was right two weeks ago is mostly still right. Three new things changed; the rest didn't.

Back to work tomorrow.
