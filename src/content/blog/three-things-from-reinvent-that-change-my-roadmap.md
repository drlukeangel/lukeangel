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
cover: "../../assets/blog/reinvent-2024-three-things-cover.svg"
coverAlt: "Cover graphic — Three things from re:Invent 2024 that actually change my roadmap. December 2024."
---

re:Invent 2024 ended Friday. I was there. The announcement pace was, as always, deliberately overwhelming. I spent yesterday afternoon writing the list of *everything* AWS announced; it was four pages.

The list of things that actually change *my* team's roadmap is much shorter. Three items. Here they are, with the reasoning.

## 1. Bedrock Prompt Caching — agent costs got cheaper by an order of magnitude

What it is: Bedrock now lets you mark portions of your prompt as cached. On subsequent calls that share the same prefix (system prompt, tool definitions, knowledge-base context), you pay a fraction of the input-token cost for the cached portion.

Why this matters for us: our agent loops re-send the same 4K-token system prompt + tool definitions on *every* iteration. With a 10-step agent run, we were paying for that 4K prefix ten times. With prompt caching, we pay full price once and cache rate after.

The math: at Claude 3.5 Sonnet pricing, our agent's per-run cost drops from roughly $0.18 to $0.04. We run about 50,000 agent invocations a month. That's $7K/month back, which we'll redirect into more aggressive evaluation runs we'd been deferring on cost.

**Roadmap change:** the cost ceiling that was capping our agent rollout to power users lifts. We're planning to ship agent-assisted features to free-tier users in Q1, which was off the table at the old cost shape.

## 2. The SageMaker rebrand + unification — data and ML stop being two separate orgs

What happened: the product formerly known as SageMaker is now **SageMaker AI**. The umbrella product called **SageMaker** (no "AI") is the new unified data + ML platform that wraps SageMaker AI, Athena, Redshift, QuickSight, EMR, Glue, and Lake Formation under a shared workspace and lineage model.

Why this matters for us: at our company, "the data team" and "the ML team" report to different VPs, build on different stacks, and meet to argue about ownership boundaries about once a quarter. The unified SageMaker doesn't fix the org problem, but it does mean the tooling stops *reinforcing* the org problem.

Specifically: a SageMaker Unified Studio notebook can now query Redshift, materialize the result into a Lake Formation–governed table, train a model on it via SageMaker AI, and run drift monitoring against it — all with the same lineage graph behind it. Previously, each of those steps lived in a different tool with different permissions and no shared lineage.

**Roadmap change:** we were planning to invest a quarter in stitching together our own data+ML lineage tooling. That project is now scoped down to "evaluate whether SageMaker Unified does enough of it." The honest answer is *probably*, with caveats; we'll know by end of Q1.

## 3. Bedrock Marketplace + the Nova family — pricing pressure on every model we use

What happened: AWS announced **Amazon Nova** — a family of in-house foundation models (Micro, Lite, Pro, with Premier coming in early 2025) priced aggressively underneath the equivalent tier from Anthropic, OpenAI, or Cohere. Separately, **Bedrock Marketplace** opened the door to over 100 third-party models including DeepSeek variants, more Mistrals, fine-tuned specialty models — all behind the same Bedrock API.

Why this matters: the *model* layer in our application has been a Claude-3.5-Sonnet monopoly for nine months. That was fine when Claude was clearly the best fit; it's stopped being a defensible monopoly now that Nova Pro exists at lower price and Marketplace has fine-tuned specialists for specific tasks.

**Roadmap change:** we're going to run our eval suite against Nova Pro and a couple of Marketplace models in Q1 to see if we can split the work — Nova for the high-volume cheap-classification path, Claude for the harder reasoning path. If the eval comes out favorable, that's another 30 – 40% cost reduction on top of prompt caching.

This is the most interesting kind of roadmap change: not a *capability* change, but an *optionality* change. The work we do is now eval-driven on the model choice, not vendor-driven.

## Three things I'm not (yet) changing my roadmap for

To be honest about scope:

- **Aurora DSQL.** Announced as a distributed SQL database with multi-region active-active writes. Genuinely interesting; we don't have a workload that needs it today. I'm watching it for the next greenfield service.
- **S3 Tables.** Apache Iceberg natively on S3, with automatic compaction and snapshot management. We have an Iceberg-on-S3 setup we maintain ourselves. The migration to managed S3 Tables is a Q2 candidate, not a Q1 one.
- **Trainium2.** New chip, big speedups for model training. We don't train foundation models, so this is a "watch the per-token pricing on Nova" effect for us, not a direct change. The teams that *do* train are absolutely going to look at it.

## The pattern that's emerging

Three patterns I noticed across the announcements:

1. **AWS is making the LLM-app stack cheaper to operate**, not more capable. Prompt caching, model distillation, intelligent prompt routing — all cost-optimization features for workloads that work. The capability frontier moved less this year; the cost frontier moved a lot.

2. **The "managed AI" pattern is converging with the "managed data" pattern**. SageMaker unification, S3 Tables, Aurora DSQL — these are all bets that the data infrastructure under an AI app is *the* infrastructure under any modern app. We're going to talk about "AI platforms" less in 2025 and "data platforms with AI on top" more.

3. **First-party AWS models are credible threats to first-party choices.** Nova Pro is not Claude 3.5 Sonnet. It is, however, good enough that the choice now requires running an eval. That was not the case at this time last year, when Titan was the only Amazon-built foundation model and nobody was using it for anything serious.

## The flight home

I'm typing this on the plane. The list of *announcements* is four pages; the list of *roadmap changes* is three items. That ratio is normal for re:Invent and I think it's healthy.

The temptation, especially as a leader, is to come back from a conference like this and want to rewrite the roadmap to chase what you saw. Don't. The roadmap that was right two weeks ago is mostly still right. Three new things changed; the rest didn't.

Back to work tomorrow.
