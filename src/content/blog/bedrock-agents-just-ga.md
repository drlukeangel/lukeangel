---
title: "Bedrock Agents just GA'd — the parts of it I'd actually use"
date: 2024-07-17T09:00:00-04:00
category: tools
tags:
  - bedrock
  - aws
  - agents
  - llms
  - ai
excerpt: "Bedrock Agents and Knowledge Bases both went GA last week. Three things I'd build on top of them, two things I'd defer, and one decision that's now obvious in hindsight."
pullquote: "Agents are router code with model-shaped opinions. Useful, but not magic."
cover: "../../assets/blog/bedrock-agents-just-ga-cover.svg"
coverAlt: "Cover graphic — Bedrock Agents just GA'd. July 2024."
---

Last week AWS quietly flipped Agents for Amazon Bedrock and Knowledge Bases for Amazon Bedrock from preview to GA. They've been in preview since re:Invent 2023, so this isn't surprising — but "in preview" and "in production" are different products, and now they're the latter.

I spent the weekend trying both against a real workload. Notes.

## What Agents actually is

A managed orchestrator. You define:

- A **base model** — Claude 3 Haiku / Sonnet / Opus, Llama, Titan, Cohere, etc. Anything Bedrock hosts.
- A set of **action groups** — OpenAPI-spec functions that the agent can call. Each action group is backed by a Lambda you write.
- An optional **knowledge base** — a managed vector store (now also GA) that the agent can read from.

You give the agent a goal, and it loops: think, call a tool, observe the result, think again, until it's done or the loop budget runs out. AWS handles the prompt scaffolding, the tool-use formatting, the retry behavior, and the trace logging.

It is not magic. It is **router code with model-shaped opinions**.

## What I'd build on top of it

Three things I'd reach for now that it's GA:

**Customer-support deflection.** Knowledge Base over your support docs, action groups for the three or four things support reps actually do (look up an order, send a refund link, open a ticket). The agent answers the easy ones, opens the ticket on the hard ones. This is the obvious win.

**Internal ops bots.** "Spin me up a dev environment for project X." Action groups around your dev infra. Agent reasons about what the user wants, calls the right tools, reports back. Saves your platform engineers an interrupt-a-day.

**Data-analyst copilot.** Knowledge Base over your data catalog (table schemas, column descriptions, recent queries). Action groups that hit Athena. Agent translates a business question into a SQL query, runs it, returns the result. *Caveat:* you absolutely want a human in the loop on the final query; this is not autopilot for analysts.

## What I'd defer

Two things I'd hold off on:

**Agent-as-the-product.** The current agent loop is good for *task completion under supervision*; it is not yet good for fully autonomous behavior on long-horizon tasks. If your product is *"the user types a thing and the agent runs unsupervised for an hour"*, you'll spend more time on guardrails than on the agent. Wait for the framework to mature.

**Multi-agent orchestration.** Bedrock's pattern is one agent with multiple action groups. Multi-agent — agents calling other agents — is doable but you're writing a lot of the orchestration yourself. Other frameworks (LangChain, LlamaIndex, the new `crewai`) have more developed multi-agent patterns. If multi-agent is core to your design, use Bedrock for the LLM calls and one of those frameworks for the orchestration.

## The one decision now obvious in hindsight

Six months ago we wrote our own minimal agent loop in Python. Tool-use formatting, retry behavior, trace logging, the works. It's about 600 lines of code that one of our engineers maintains.

If Agents had been GA when we started, we wouldn't have written that code. We'd have used Agents. Six months from now, we'll probably port what we have to it.

The lesson, which is the same lesson every time AWS GA's a managed service that overlaps with something you built: *the second you write infrastructure, AWS GA's the managed version six months later*. You can be annoyed about it or you can plan for it. The plan is: don't fall in love with the orchestration code. Fall in love with the rubric, the eval set, the tool definitions. Those are durable. The loop in the middle is interchangeable.

## What about Knowledge Bases?

Briefly: useful, and replaces about 80% of the work of standing up your own RAG pipeline. You point it at an S3 bucket, it chunks the docs, embeds them, and exposes a query API. The chunking strategy and the embedding model are configurable but the defaults are good. The pricing is per-query-per-million-tokens-retrieved, which means you can build something for a fraction of what a Pinecone subscription would cost.

The 20% it doesn't replace: any retrieval logic that isn't "vector search over chunks." If you need hybrid (lexical + vector) search, you're rolling some of it yourself. If you need filters by metadata at retrieval time, the API supports it but it's underdocumented. We'll see if those gaps close in the next six months.

## The thing I'm watching

Bedrock Guardrails went GA last month. Combined with Agents + Knowledge Bases, AWS now has the three pieces of "an LLM app, managed end to end." We are about a year into the post-ChatGPT era of building these things. AWS has shipped the managed versions of *all three* major homemade pieces in twelve months. That cadence is fast even by AWS standards.

What I'd guess gets GA'd next: managed eval/test harnesses. Bedrock has Model Evaluation in preview right now. If that GAs and the harness is good enough to replace what we're maintaining ourselves, I'd port to it.

But that's a post for September. For now, Agents and KBs are GA, they're useful, and the bar to ship an LLM feature inside AWS is lower this week than it was last week.
