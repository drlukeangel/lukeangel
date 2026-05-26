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
excerpt: "AgentCore went GA in October; we've run it in production since the preview in August. Seven months on Strands, plus a tour of the alternatives. What I'd recommend for a 2026 agent project, by team shape and constraint."
pullquote: "Pick the framework that matches your team's experience, not the one with the loudest blog posts."
notebook: building-with-ai-ml
notebookOrder: 10
cover: "../../assets/blog/strands-agentcore-year-end-inventory-cover.svg"
coverAlt: "Three stacked layers of an agent platform — an SDK layer, a managed-runtime layer, and a row of pluggable services (memory, gateway, identity, observability) — with a column of team-shape choices on the left routing to a recommended stack on the right."
---

A reader emailed last week asking what stack I'd recommend for a new agent project starting in early 2026. I've been on the phone with three CTOs in the last month asking variants of the same question. Year-end inventory post, written in service of that conversation.

## Where I land, by team shape

| Team shape | What I'd pick | Why |
| --- | --- | --- |
| AWS-native, agents in production, > 5 engineers | **Strands SDK + AgentCore** | Best operational story, lowest maintenance burden, GA since October |
| AWS-native, first agent, small team | **Bedrock Agents** (still) | Lowest cognitive cost, fully managed, GA'd two years |
| Multi-cloud or vendor-agnostic | **LangGraph** + your own infra | Best portability, biggest community |
| Heavy multi-agent, role-based orchestration | **CrewAI** | Cleanest multi-agent abstraction |
| Research / fast iteration, willing to write infra | **DSPy or LangGraph** | Most expressive |
| Microsoft shop | **AutoGen / Semantic Kernel** | Better Azure / M365 integration |

If you came here for the punchline and you're an AWS-native team running real production traffic, the short answer is: **Strands + AgentCore**. The rest of the post is why.

![A decision matrix that routes a team's shape to a recommended agent stack. A vertical column of team-shape inputs on the left — AWS-native with agents in production, AWS-native first-time small team, multi-cloud or vendor-agnostic, heavy role-based multi-agent, research and fast iteration, and Microsoft shop. Each routes rightward to a recommended stack: the AWS-native-in-production row lands on Strands plus AgentCore, drawn as the highlighted primary path in the notebook's indigo; the small-team row lands on Bedrock Agents; multi-cloud and research rows land on LangGraph; the role-based row on CrewAI; the Microsoft row on AutoGen and Semantic Kernel. The diagram's point: the choice is driven by team shape and constraint, not by which framework has the loudest blog posts.](../../assets/blog/strands-agentcore-team-shape-matrix.svg)

## What changed in 2025

Year-end review of what shipped:

- **Strands Agents SDK** (open-sourced by AWS, May 2025) — Python framework for agent orchestration. Model-agnostic, framework-agnostic. Replaces the "I'll write my own agent loop" instinct with something AWS now maintains.
- **Bedrock AgentCore** (announced in preview July 2025 at NY Summit; **GA October 13**) — modular runtime + memory + gateway + tools + observability + identity. Composable; you can adopt one piece without the rest. GA brought the things that were missing in preview: VPC + PrivateLink, CloudFormation, resource tagging, eight-hour runtime sessions, A2A protocol support, and Gateway connecting to existing MCP servers (not just wrapping your APIs and Lambdas).
- **Bedrock Marketplace** (re:Invent 2024 → matured throughout 2025) — third-party models behind the same Bedrock API. DeepSeek, more Mistrals, specialized fine-tunes.
- **Bedrock Prompt Caching** (GA early 2025) — order-of-magnitude cost reduction on repeated prefix prompts. *The single biggest lever for agent cost.*
- **AgentCore Browser + Code Interpreter tools** (managed) — replaces the "let's run Playwright in our own Lambda" pattern with a managed alternative.

The story across all five: AWS is shipping the *unbundled* pieces of agent infrastructure. You get to compose. The composition story is now actually tractable.

![A three-layer stack showing where the pieces sit. The top layer is the SDK / orchestration layer — the agent loop — where Strands, LangGraph, CrewAI, and DSPy are interchangeable choices; Strands is drawn as the indigo-highlighted default. The middle layer is the managed runtime — AgentCore Runtime — labeled framework-agnostic, meaning any SDK above it plugs in. The bottom layer is a row of four pluggable managed services drawn as separate composable blocks: Memory, Gateway, Identity, and Observability, each one adoptable on its own. A side note marks that the model itself — Claude, Nova, or a Bedrock Marketplace model — is reached through Bedrock and is orthogonal to all three layers. The point of the diagram: AWS unbundled agent infrastructure into independent layers you compose, rather than one monolithic stack.](../../assets/blog/strands-agentcore-stack-layers.svg)

## How we use Strands + AgentCore

We rode the preview through real traffic from August, then cut over to the GA APIs in the two weeks after October 13 — mostly a matter of re-pinning the SDK, moving our runtime into a VPC now that GA supports it, and putting the whole thing under CloudFormation. Our agent stack today:

![The preview-to-GA cutover for AgentCore, and what GA did not solve. On the left, the preview APIs we ran in production since August; an indigo arrow labeled two weeks of work crosses to the GA APIs we ran in production since the October 13 release. Below, the small green cutover tasks: re-pin the SDK, move the runtime into a VPC, put the whole stack under CloudFormation. Below that, the red items GA did not hand us and that stay our problem: cross-region active-active state, and cost modeling under bursty workloads. The point: GA closed the gaps that made the preview a gamble, but a few hard parts are still yours to build.](../../assets/blog/strands-plus-agentcore-year-end-inventory-fig-1.svg)

- **Strands SDK** for the agent loop. Python, model-agnostic, exposes a clean event-driven hook system.
- **Claude 3.7 Sonnet** as the primary reasoning model. Claude 3.5 Haiku for cheap-classification routing. Nova Pro on a few high-volume paths where the cost differential matters and the quality is good enough.
- **AgentCore Memory** for short-term and long-term memory. Replaced our DynamoDB layer.
- **AgentCore Gateway** for tool registry. Exposes 20-odd internal APIs as MCP-compatible tools. Replaced the registry we'd built ourselves.
- **AgentCore Runtime** for the production execution surface.
- **AgentCore Identity** for delegated authorization (the agent calls tools as the *end-user*, not as a service principal).
- **Bedrock Prompt Caching** for the shared system prompt and tool definitions across loop iterations.
- **OpenTelemetry → Honeycomb** for traces (AgentCore emits native OTel; we kept Honeycomb).

That stack runs about 80,000 agent invocations per day. We maintain about 1,200 lines of code on top — almost all of it business logic and tool implementations. Down from 4,000 lines before the migration.

![A before-and-after of the agent stack's surface area, drawn as two columns of blocks. On the left, the homegrown stack: a tall stack of self-maintained blocks — own agent loop, own memory layer on DynamoDB, own tool registry, own OpenTelemetry pipeline — summing to roughly four thousand lines of code we owned. On the right, the AgentCore stack: a short stack where most of the blocks are now labeled managed — AgentCore Memory, Gateway, Runtime, Identity — leaving only a thin self-maintained block of business logic and tool implementations, roughly twelve hundred lines. An arrow between the columns is labeled with the real win: not a unit-cost reduction but a surface-area reduction, freeing engineering time back to product.](../../assets/blog/strands-agentcore-surface-area.svg)

## What I'd defer

Three things to be honest about, even now that AgentCore is GA:

**We rode the preview to get here, and that was a real bet.** GA landed October 13, but we'd already been on the preview APIs in production since August because we believed the architecture. That paid off — but if you're starting now, you start on GA, and you don't have to make the bet we did. The honest read: GA closed most of the gaps that made the preview a gamble.

**Multi-region failover is still mostly on you.** GA added VPC, PrivateLink, and CloudFormation support, and the runtime now spans nine regions — but cross-region active-active for your memory and gateway state isn't a turnkey feature. If your business demands it, you're still writing parts of this yourself.

**Cost predictability under bursty workloads.** AgentCore's per-service pricing means agent cost is now (model) + (memory ops) + (gateway/tool ops) + (runtime time). Modeling cost under spikes requires more care than it did with the monolithic Bedrock Agents pricing. GA didn't change the pricing shape; it just made it the shape you're committing to.

## When I'd reach for the alternatives

Honest assessments of where the others win:

**LangGraph + your own infra.** Win: framework portability and community velocity. The LangGraph community ships patterns faster than AWS does. Win: multi-cloud is real (we run a backup of one agent on Azure OpenAI for compliance reasons; LangGraph handles this without complaint). Loss: more infra you maintain.

**CrewAI.** Win: best abstractions I've seen for multi-agent role-based orchestration. "The researcher agent talks to the writer agent talks to the editor agent" is a paragraph of CrewAI code. Loss: smaller community, less production-tested.

**DSPy.** Win: most expressive way to compose LM programs. Lets you optimize prompts via compilation, not hand-tuning. Loss: still feels research-y. The teams I know running it in production are the teams with research-shaped engineers.

**AutoGen / Semantic Kernel.** Win: if you're a Microsoft shop, the Azure OpenAI + Semantic Kernel + M365 integration is genuinely tighter than AWS's equivalents. Loss: if you're not a Microsoft shop, you're swimming upstream.

## What I'm watching for next month

re:Invent 2025 is December 1-5, and with AgentCore already GA, the announcements I'm watching for are the layer *above* the runtime. Three things:

1. **A managed eval story specific to agents.** Bedrock Model Evaluation exists; it's not yet agent-aware — it grades a model on a prompt, not an agent on a multi-step task. The teams I talk to are all writing their own agent-specific eval setups (mine on top of the [open-source eval kit](/blog/open-source-eval-starter-kit-for-pms/)). With the runtime now GA, this is the obvious next gap for AWS to close.
2. **AgentCore feature depth post-GA.** GA shipped the enterprise table-stakes — VPC, CloudFormation, A2A, MCP-server gateway connections. What's missing is the operational depth: turnkey cross-region state, finer cost controls, richer Memory strategies. re:Invent is where I'd expect the first post-GA wave.
3. **Better cross-cloud / cross-model abstraction.** Strands is half this story; AgentCore is half. The third half — true vendor-agnostic agent observability and lineage — is still missing.

## The honest framing

The most important framing I've landed on this year: **the framework choice matters less than people make it.**

A good agent system is mostly: a clear task definition, a good eval set, a tight rubric, well-scoped tools, and a model that's right-sized for the task. Strands vs LangGraph vs CrewAI is a coordination-cost decision, not a quality decision. The teams that ship great agents are the teams with great evals. The framework is downstream.

That said: ride the maintenance curve. If you're an AWS team, having AWS maintain the framework and the runtime saves you a person. Worth it.

re:Invent in a week. I'll write a follow-up if anything significant lands in the agent space. For now: pick the framework that matches your team's experience, not the one with the loudest blog posts, and *go ship the eval set first*.
