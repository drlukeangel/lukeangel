---
title: "Strands + AgentCore — a year-end agent-stack inventory"
date: 2025-11-26T10:50:00-05:00
category: tools
tags:
  - bedrock
  - aws
  - agents
  - agentcore
  - strands
  - llms
  - ai
excerpt: "Six months on AgentCore, eight months on Strands, and a tour of the alternatives. What I'd recommend for a 2026 agent project, by team shape and constraint."
pullquote: "Pick the framework that matches your team's experience, not the one with the loudest blog posts."
cover: "../../assets/blog/strands-agentcore-year-end-inventory-cover.svg"
coverAlt: "Cover graphic — Strands + AgentCore, a year-end agent-stack inventory. November 2025."
---

A reader emailed last week asking what stack I'd recommend for a new agent project starting in early 2026. I've been on the phone with three CTOs in the last month asking variants of the same question. Year-end inventory post, written in service of that conversation.

## Where I land, by team shape

| Team shape | What I'd pick | Why |
| --- | --- | --- |
| AWS-native, agents in production, > 5 engineers | **Strands SDK + AgentCore (when GA)** | Best operational story, lowest maintenance burden |
| AWS-native, first agent, small team | **Bedrock Agents** (still) | Lowest cognitive cost, fully managed, GA'd 18 months |
| Multi-cloud or vendor-agnostic | **LangGraph** + your own infra | Best portability, biggest community |
| Heavy multi-agent, role-based orchestration | **CrewAI** | Cleanest multi-agent abstraction |
| Research / fast iteration, willing to write infra | **DSPy or LangGraph** | Most expressive |
| Microsoft shop | **AutoGen / Semantic Kernel** | Better Azure / M365 integration |

If you came here for the punchline and you're an AWS-native team running real production traffic, the short answer is: **Strands + AgentCore**. The rest of the post is why.

## What changed in 2025

Year-end review of what shipped:

- **Strands Agents SDK** (open-sourced by AWS, May 2025) — Python framework for agent orchestration. Model-agnostic, framework-agnostic. Replaces the "I'll write my own agent loop" instinct with something AWS now maintains.
- **Bedrock AgentCore** (preview, July 2025 at NY Summit) — modular runtime + memory + tools + observability + identity. Composable; you can adopt one piece without the rest.
- **Bedrock Marketplace** (re:Invent 2024 → matured throughout 2025) — third-party models behind the same Bedrock API. DeepSeek, more Mistrals, specialized fine-tunes.
- **Bedrock Prompt Caching** (GA early 2025) — order-of-magnitude cost reduction on repeated prefix prompts. *The single biggest lever for agent cost.*
- **AgentCore Browser + Code Interpreter tools** (managed, GA'd at Summit NY) — replaces the "let's run Playwright in our own Lambda" pattern with a managed alternative.

The story across all five: AWS is shipping the *unbundled* pieces of agent infrastructure. You get to compose. The composition story is now actually tractable.

## How we use Strands + AgentCore

Our agent stack today, after the Q3 migration:

- **Strands SDK** for the agent loop. Python, model-agnostic, exposes a clean event-driven hook system.
- **Claude 3.7 Sonnet** as the primary reasoning model. Claude 3.5 Haiku for cheap-classification routing. Nova Pro on a few high-volume paths where the cost differential matters and the quality is good enough.
- **AgentCore Memory** for short-term and long-term memory. Replaced our DynamoDB layer.
- **AgentCore Gateway** for tool registry. Exposes 20-odd internal APIs as MCP-compatible tools. Replaced the registry we'd built ourselves.
- **AgentCore Runtime** for the production execution surface.
- **AgentCore Identity** for delegated authorization (the agent calls tools as the *end-user*, not as a service principal).
- **Bedrock Prompt Caching** for the shared system prompt and tool definitions across loop iterations.
- **OpenTelemetry → Honeycomb** for traces (AgentCore emits native OTel; we kept Honeycomb).

That stack runs about 80,000 agent invocations per day. We maintain about 1,200 lines of code on top — almost all of it business logic and tool implementations. Down from 4,000 lines before the migration.

## What I'd defer

Three things to be honest about:

**AgentCore is still preview-status** as of this writing. AWS has talked about GA "by re:Invent 2025" which is next week. If GA doesn't happen at re:Invent (and even if it does), production-readiness in your context depends on your willingness to ride a preview through real traffic. We did because we believed the architecture; you might not.

**Multi-region failover is not yet documented end-to-end.** If your business demands cross-region active-active, you'll be writing parts of this yourself.

**Cost predictability under bursty workloads.** AgentCore's per-service pricing means agent cost is now (model) + (memory ops) + (tool registry ops) + (runtime time). Modeling cost under spikes requires more care than it did with the monolithic Bedrock Agents pricing.

## When I'd reach for the alternatives

Honest assessments of where the others win:

**LangGraph + your own infra.** Win: framework portability and community velocity. The LangGraph community ships patterns faster than AWS does. Win: multi-cloud is real (we run a backup of one agent on Azure OpenAI for compliance reasons; LangGraph handles this without complaint). Loss: more infra you maintain.

**CrewAI.** Win: best abstractions I've seen for multi-agent role-based orchestration. "The researcher agent talks to the writer agent talks to the editor agent" is a paragraph of CrewAI code. Loss: smaller community, less production-tested.

**DSPy.** Win: most expressive way to compose LM programs. Lets you optimize prompts via compilation, not hand-tuning. Loss: still feels research-y. The teams I know running it in production are the teams with research-shaped engineers.

**AutoGen / Semantic Kernel.** Win: if you're a Microsoft shop, the Azure OpenAI + Semantic Kernel + M365 integration is genuinely tighter than AWS's equivalents. Loss: if you're not a Microsoft shop, you're swimming upstream.

## What I'm watching for next month

re:Invent 2025 is December 1-5. Three things I'm watching for:

1. **AgentCore GA.** Strongly expected. If it doesn't happen, the AWS agent story takes a real hit.
2. **A managed eval / observability story specific to agents.** Bedrock Model Evaluation exists; it's not yet agent-aware. The teams I talk to are all writing their own agent-specific eval setups (mine on top of the [open-source eval kit](/blog/open-source-eval-starter-kit-for-pms/)). I'd expect AWS to announce something in this space.
3. **Better cross-cloud / cross-model abstraction.** Strands is half this story; AgentCore is half. The third half — true vendor-agnostic agent observability and lineage — is still missing.

## The honest framing

The most important framing I've landed on this year: **the framework choice matters less than people make it.**

A good agent system is mostly: a clear task definition, a good eval set, a tight rubric, well-scoped tools, and a model that's right-sized for the task. Strands vs LangGraph vs CrewAI is a coordination-cost decision, not a quality decision. The teams that ship great agents are the teams with great evals. The framework is downstream.

That said: ride the maintenance curve. If you're an AWS team, having AWS maintain the framework and the runtime saves you a person. Worth it.

re:Invent in a week. I'll write a follow-up if anything significant lands in the agent space. For now: pick the framework that matches your team's experience, not the one with the loudest blog posts, and *go ship the eval set first*.
