---
title: "Bedrock AgentCore at Summit NY — what it actually changes"
date: 2025-07-23T16:48:00-04:00
category: tools
tags:
  - bedrock
  - aws
  - agents
  - agentcore
  - llms
  - ai
excerpt: "AWS announced Bedrock AgentCore at Summit NY last week. Not the same as Bedrock Agents — different product, different shape. What it actually changes for teams already running agents."
pullquote: "AgentCore is what Bedrock Agents should have been from the start. That doesn't make it the wrong answer now."
notebook: building-with-ai-ml
notebookOrder: 9
cover: "../../assets/blog/bedrock-agentcore-summit-ny-cover.svg"
coverAlt: "On the left, a single opinionated monolith — one fused slab with baked-in internal seams. An arrow leads to the right, where the same capability is broken into five separate building blocks with gaps between them: a runtime (a play triangle), memory (stacked layers), tools (a gear), identity (a key), and observability (a trace waveform). The visual contrast is the post's whole point — Bedrock Agents is the slab, AgentCore is the separable set."
---

AWS Summit NY was last week. The keynote announced **Amazon Bedrock AgentCore** in preview. I've spent the last few days reading the docs, the blog posts, and the recordings, and pointing a small internal experiment at it to see if the shape is what I think it is.

The short version: AgentCore is not "Bedrock Agents 2.0." It's a fundamentally different product, aimed at a different problem, and it changes how I'd architect a new agent system today.

## What AgentCore actually is

A set of **modular, individually-priced services** for running agents in production. Specifically:

- **Runtime** — serverless execution environment for agent code (Strands, LangGraph, CrewAI, your own — doesn't matter, AgentCore is framework-agnostic).
- **Memory** — managed short-term and long-term memory store, with built-in summarization and retrieval.
- **Identity** — agent-side IAM, including delegated access to call tools as different end-users.
- **Tools** — managed tool registry with built-in browser, code interpreter, and external API tools (Gateway exposes APIs and Lambda functions as MCP-compatible tools).
- **Observability** — distributed tracing across agent steps, native OpenTelemetry.

You don't have to use all five. You can plug in just the memory layer alongside your existing LangChain stack. Or just the runtime. Or just the observability. *That* is the meaningful shift.

![Your agent code sits at the center, framework-agnostic — Strands, LangGraph, CrewAI, or your own loop. Five managed AgentCore building blocks fan out from it as spokes: Runtime (serverless execution), Memory (short- and long-term store), Gateway and Tools (APIs and Lambda functions exposed as MCP-compatible tools), Identity (the agent can act as the end user), and Observability (OpenTelemetry traces across agent steps). The point of the spoke layout is that each block attaches independently — you wire in the ones you want and leave the rest.](../../assets/blog/agentcore-five-building-blocks.svg)

## How it differs from Bedrock Agents

Bedrock Agents — the older product, GA at re:Invent in November 2023 — is a **monolithic, opinionated** agent stack: the loop, the prompt scaffolding, the tool-calling format, the model choice — all integrated. You define action groups, knowledge bases, and a base model, and Agents orchestrates the whole thing.

AgentCore is the **opposite design**:

| | Bedrock Agents | Bedrock AgentCore |
| --- | --- | --- |
| Shape | Monolithic, opinionated | Modular, composable |
| Framework | AWS-defined loop | BYO (Strands, LangGraph, etc.) |
| Coupling to Bedrock models | Tight | Loose — any model that supports tool use |
| Pricing | All-or-nothing | Per-service |
| Production maturity | GA | Preview |

![Two stacks side by side. On the left, Bedrock Agents drawn as a single fused slab — the loop, prompt scaffolding, tool-call format, action groups plus knowledge bases, and a Bedrock model, all baked into one block with no gaps between the pieces; the caption reads all-or-nothing, you take the whole stack. On the right, AgentCore in preview, drawn as five separate rounded blocks with space between them — Runtime, Memory, Identity, Gateway/Tools, Observability — and a dashed callout: adopt one and leave the rest, for example just Memory beside your own stack, framework-agnostic, bring your own loop.](../../assets/blog/agentcore-monolith-vs-composable.svg)

If you're shipping a brand-new agent today, AgentCore is the right shape *if* you can live with preview status. If you're already on Bedrock Agents in production, you don't have to migrate — but you'll probably want to.

## What it changes for us

We've been running agents on a homegrown stack: Strands Agents SDK (open-sourced by AWS back in May) for orchestration, our own memory layer on DynamoDB, our own tool registry, OpenTelemetry to Honeycomb for tracing. About 4,000 lines of code we maintain.

AgentCore replaces roughly **2,800 of those lines** with managed services. The work to migrate is real — re-wiring the memory layer is a couple of weeks, swapping our home-rolled OTel pipeline for AgentCore's is another — but it's bounded. Six weeks of engineering for a permanent reduction in surface area.

The math we ran:
- Code we maintain: 4,000 → 1,200 lines.
- Engineers needed to babysit the agent infra: 1.5 → 0.5.
- Per-request cost of memory + tracing infra: ~$0.002 → roughly comparable (AgentCore prices these as managed services; the savings are in maintenance, not unit cost).

The reduction in *engineering surface area* is the win, not the cost. We get a 0.5-FTE back to build product.

## What I'd defer

Preview status is real. Three things to watch before I'd put this fully on the critical path:

- **GA timeline.** AWS said "later this year" at the Summit. That usually means re:Invent (December). If your launch is in Q4, you're betting on a preview holding up.
- **Multi-region failover.** The preview runs in a few regions. Once you've moved your memory layer to AgentCore, you depend on its regional availability. Production-shaped HA isn't yet documented.
- **Cost predictability at scale.** Per-service pricing means agent runs that previously had a single $0.18 model cost now have a $0.18 model cost plus a memory call cost plus a tool registry cost plus a trace cost. We're modeling it on our actual workload; the answers depend on workload shape.

## The thing nobody's saying out loud

Bedrock Agents is going to feel slowly deprecated.

AWS won't say that — they'll keep the product around — but the *architectural energy* has moved to AgentCore. Every example in the Summit talks, every reference architecture, every new feature announcement is in AgentCore terms. Bedrock Agents will continue to exist; it'll continue to get bugfixes. The new patterns are not going to land there.

If you're starting today: AgentCore.
If you're already on Bedrock Agents in production: ride it, migrate when AgentCore goes GA, expect to migrate.

## Where this fits in the broader picture

Back in May, AWS open-sourced **Strands Agents SDK** — a Python framework for building agents that's framework-agnostic at the model layer. Now AgentCore.

![A left-to-right timeline of AWS unbundling agent infrastructure. November 2023: Bedrock Agents goes GA — the bundle. May 2025: Strands SDK is open-sourced — the loop. July 2025, marked as you-are-here in the notebook accent: AgentCore arrives in preview — the runtime plus memory plus observability. The caption ties it together: the same Lambda plus API Gateway plus DynamoDB move — ship the pieces, let customers compose.](../../assets/blog/agentcore-unbundling-timeline.svg)

The pattern, looking back: AWS is shipping the *unbundled* version of "agent infrastructure" piece by piece. Strands is the SDK. AgentCore is the runtime + memory + observability. Bedrock provides the models. Q Developer provides the developer-facing agent surface.

This is the same playbook AWS ran with Lambda + API Gateway + DynamoDB ten years ago — provide the pieces, let customers compose, win on the composition. It worked then. The signs are that it'll work for agents too. AgentCore is the keystone piece that makes the composition tractable.

## What I'd do this week

If your team is shipping agents:

1. Spin up an experiment in a non-production account. Take a single agent feature, put it on AgentCore Runtime with whatever framework you already use.
2. Wire AgentCore Memory in alongside your current memory layer. Run both in parallel for a week. Compare what you get.
3. Decide by end of August whether AgentCore is on your post-re:Invent migration list.

We're doing this. I'll write a follow-up in November once we've had AgentCore through a real load test. For now: this is the most consequential agent announcement of 2025, and it's going to reshape how we architect agent systems for the next several years.
