---
title: "Bedrock Agents, half a year in — the parts I actually use"
date: 2024-07-17T09:00:00-04:00
category: tools
tags:
  - bedrock
  - aws
  - agents
  - llms
  - ai
notebook: building-with-ai-ml
notebookOrder: 5
excerpt: "Agents and Knowledge Bases for Bedrock have been GA since re:Invent. I said I'd run them through a real evaluation before trusting them; here's the verdict after about six months — what I kept, what I deferred, and the call that's obvious in hindsight."
pullquote: "Agents are router code with model-shaped opinions. Useful, but not magic — and that's exactly why I kept some of it."
cover: "../../assets/blog/bedrock-agents-just-ga-cover.svg"
coverAlt: "An agent orchestration loop drawn as a closed cycle — a model node thinks, reaches out to a tool, takes back an observation, and loops, with a managed boundary wrapped around the whole cycle and a knowledge store feeding it from the side."
---

Back in December I [wrote that I'd put Agents and Knowledge Bases for Bedrock through a real evaluation](/blog/first-week-with-bedrock-a-pm-read/) before letting either near anything a customer touches. Both went GA at re:Invent — November 28th — and "GA two weeks ago" is not the same as "battle-tested," so the honest posture then was to watch other people find the sharp edges first.

It's mid-July now. We've had both running against real workloads for the better part of six months. This is the verdict I promised: the parts I actually use, the parts I deferred, and the one call that's obvious in hindsight.

## What Agents actually is

A managed orchestrator. You define:

- A **base model** — Claude 3 Haiku / Sonnet / Opus, Llama, Titan, Cohere, whatever Bedrock hosts.
- A set of **action groups** — functions described by an OpenAPI spec that the agent is allowed to call. Each is backed by a Lambda you write.
- An optional **knowledge base** — a managed vector store the agent can read from.

You give the agent a goal, and it loops: think, call a tool, observe the result, think again, until it's done or the loop budget runs out. AWS owns the prompt scaffolding, the tool-use formatting, the retry behavior, and the trace logging. You own the tools and the goal.

It is not magic. It is **router code with model-shaped opinions**. Six months of running it hasn't changed that sentence — it's confirmed it. Which is the whole reason I trust it for some jobs and not others.

![An agent orchestration loop drawn as a cycle. A goal enters at the top into the model, which thinks and emits a tool call; the tool call hits one of several action groups, each a Lambda; the result returns as an observation back into the model, which thinks again. The cycle repeats until the goal is met or a loop budget — a maximum number of turns — is exhausted, at which point the agent emits an answer. A knowledge base sits to the side, queried like any other tool. A dashed box labeled managed wraps the loop, the scaffolding, and the retries — the part AWS owns; the action groups and the goal sit outside it, the part you own.](../../assets/blog/bedrock-agents-loop.svg)

## What I kept

Three things made it past the evaluation and into something real.

**Customer-support deflection.** Knowledge Base over our support docs, action groups for the three or four things a support rep actually does — look up an order, send a refund link, open a ticket. The agent answers the easy questions and opens a ticket on the hard ones. This was the obvious win, and it's the one I'd start a team on if they asked. The failure mode is benign: worst case, the agent opens a ticket a human was going to open anyway.

**Internal ops bots.** "Spin me up a dev environment for project X." Action groups wrapped around our dev infra. The agent reasons about what the engineer wants, calls the right tools, reports back. Saves the platform team an interrupt a day. This one lives behind the VPN, which matters — I'd never have shipped it this fast facing the public internet.

**Data-analyst copilot, with a human on the trigger.** Knowledge Base over the data catalog — table schemas, column descriptions, recent queries — and an action group that hits Athena. The agent turns a business question into SQL and runs it. The hard rule we settled on after the evaluation: a human reviews the final query before it executes against anything that costs money or touches PII. This is not autopilot for analysts. It's a faster first draft with a person in the loop, and the loop is non-negotiable.

The common thread in all three: a wrong answer is cheap. That's the line I'd draw for anyone deciding what to put an agent on first.

![A use-or-defer decision split on one question: what does a wrong answer cost? On the cheap-mistake side — a ticket gets opened, a draft query gets reviewed, an ops task gets retried — three boxes: support deflection, internal ops bots, and an analyst copilot with a human reviewing the final query. On the expensive-mistake side — an unsupervised run goes sideways for an hour, or one agent's bad output feeds another — two boxes marked defer: agent-as-the-product running unsupervised, and multi-agent orchestration. The dividing question sits at the top; the cost of being wrong is what sorts each use case.](../../assets/blog/bedrock-agents-use-defer.svg)

## What I deferred

Two things I looked hard at and chose to wait on.

**Agent-as-the-product.** The current loop is good for *task completion under supervision*. It is not good for *fully autonomous behavior on a long-horizon task* — the thing where a user types a request and the agent runs unsupervised for an hour. I ran exactly that experiment during the evaluation, and I spent more time writing guardrails for the failure cases than I spent on the agent itself. The loop is reliable for ten-minute tasks with a human watching the trace. Stretch it to an hour alone and the error rate compounds turn over turn. If your *product* is the unsupervised agent, the framework isn't there yet. Wait.

![A decay curve explaining why short supervised tasks succeed and long unsupervised ones fail. The vertical axis is the probability that every turn in the loop is correct; the horizontal axis is the number of turns until the loop budget is exhausted. The curve starts high on the left and falls as turns accumulate, crossing below a dashed "roughly 90% reliable" threshold partway across. A green band on the left marks the ten-minute task: few turns, a human watching the trace, well above the threshold. A red band on the right marks the one-hour unsupervised run: many turns, where a small per-turn error compounds turn over turn and drags overall reliability down. The point is that whole-task reliability is the product of every turn's reliability, so a per-turn error rate that's harmless over a handful of turns becomes fatal across dozens.](../../assets/blog/bedrock-agents-error-compounding.svg)

The math is unforgiving: if each turn is right 97% of the time, ten turns land near 74% end-to-end and thirty turns near 40%. That's the whole reason the supervised ten-minute task ships and the autonomous hour doesn't.

**Multi-agent orchestration.** Bedrock's model today is one agent with multiple action groups. Agents calling other agents is something you build yourself on top — there's no managed multi-agent primitive in Bedrock right now. You can do it: have one agent's action group invoke a second agent. But you're writing the coordination, the message passing, and the failure handling by hand. The open-source frameworks — LangChain, LlamaIndex, and the newer `crewai` — have more developed patterns for that today. If multi-agent is core to your design, the pragmatic split is: Bedrock for the model calls and the procurement story, one of those frameworks for the orchestration on top. I'm watching to see whether AWS ships a managed version of this; I'd bet they do, but I'm not building my roadmap on a bet.

## The one decision now obvious in hindsight

A year ago — before re:Invent — we wrote our own minimal agent loop in Python. Tool-use formatting, retry behavior, trace logging, the works. About 600 lines that one engineer maintains.

If Agents had been GA when we started, we wouldn't have written that code. We'd have used Agents from the jump. Now that I've run both side by side for six months, the honest read is: the 600 lines and the managed Agent do the same job, and the managed one does it with logging and traces I don't have to maintain. We're porting our home-grown loop onto Agents this quarter for the support and ops use cases — the cheap-mistake ones — and keeping our own loop only where we need control the managed version doesn't expose yet.

The lesson is the same one I relearn every time AWS GAs a managed service that overlaps something we built: *the moment you write infrastructure, AWS GAs the managed version six months later.* You can be annoyed about it or you can plan for it. The plan is — don't fall in love with the orchestration code. Fall in love with the rubric, the eval set, and the tool definitions. Those are durable and portable. The loop in the middle is interchangeable, and now it's interchangeable with something AWS keeps the lights on for.

![Two stacks, side by side, sorting the pieces of an LLM app into interchangeable and durable. On the interchangeable side: the agent loop itself, the prompt scaffolding, the retry logic, and the trace plumbing — each marked as something a managed service can swap in for. On the durable side: the eval set and rubric, the tool definitions, and the action-group contracts — the assets that survive the swap and carry over to whatever runs the loop next. An arrow shows the loop being lifted from a hand-written box into a managed box, while the durable assets stay put underneath both. The point: port the loop, keep the assets.](../../assets/blog/bedrock-agents-durable-vs-loop.svg)

What it cost me to learn that: roughly a quarter of an engineer's time maintaining a loop that a managed service now does for free. Not catastrophic. But it's the second time, and I'd like it to be the last.

## What about Knowledge Bases?

Six months in: useful, and it replaced about 80% of the work of standing up our own RAG pipeline. You point it at an S3 bucket, it chunks the documents, embeds them, and exposes a query API. Chunking strategy and embedding model are configurable; the defaults are good enough that I left them alone for the support corpus. Pricing is driven by retrieval volume and embedding, not a flat per-seat fee, so a low-traffic internal tool costs a rounding error compared to standing up and babysitting our own vector store.

The 20% it didn't replace, and where I still hand-roll:

- **Hybrid search.** If you need lexical *and* vector retrieval — keyword exact-match alongside semantic — you're assembling that yourself. The managed path is vector search over chunks, full stop.
- **Metadata filtering at retrieval time.** The API supports it, but it was thinly documented when I built on it, and I lost an afternoon to trial-and-error getting filter syntax right. It works; it just wasn't the smooth path the rest of it is.

Neither gap was a dealbreaker for the support use case, which is plain semantic search over docs. Both would matter a lot more if I were retrieving over structured records. Know which one you have before you commit.

## The thing I'm watching

[Guardrails for Bedrock went GA in April](https://aws.amazon.com/about-aws/whats-new/2024/04/guardrails-amazon-bedrock-available-safety-privacy-controls/) — denied topics, content filters, sensitive-information redaction, word filters, applied at invocation. With Agents and Knowledge Bases GA since re:Invent and Guardrails GA since the spring, AWS now has the three pieces of "an LLM app, managed end to end." A year and a half after the post-ChatGPT scramble started, the managed versions of all three homemade pieces — orchestration, retrieval, and safety — are shipping. That cadence is fast even by AWS standards, and it's why the "don't fall in love with the loop" lesson keeps paying off.

The piece I'm still maintaining myself, and watching for a managed replacement, is the [eval harness](/blog/prompt-regression-first-test-set/). Bedrock has Model Evaluation in preview right now. If it GAs and it's good enough to retire the regression set we run by hand, I'll port to it the same way I'm porting the agent loop — and I'll fall in love with the rubric, not the runner.

For now: Agents and Knowledge Bases are GA, they earned their place on the cheap-mistake jobs, and the bar to ship a supervised LLM feature inside AWS is genuinely lower than it was when I last wrote about this. The autonomous-agent dream is still a roadmap item, not a product. Knowing the difference is most of the job.
