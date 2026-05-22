---
title: "First week with Bedrock: a PM's read on the September GA"
date: 2023-12-12T11:05:00-05:00
category: tools
tags:
  - bedrock
  - aws
  - llms
  - ai
  - claude
excerpt: "Amazon Bedrock went GA in September. I spent last week pointing one of our LLM features at it. Notes — what's useful, what's missing, and what re:Invent added two weeks ago."
pullquote: "Bedrock isn't a model — it's the absence of a vendor lock-in argument."
cover: "../../assets/blog/first-week-with-bedrock-cover.svg"
coverAlt: "Cover graphic — First week with Amazon Bedrock. A PM's read on the September 2023 GA."
---

Amazon Bedrock went generally available on September 28th. We've been on a private preview waitlist for months. I finally got the team to spend a week last week porting one of our LLM features off of a direct API integration and onto Bedrock. Notes from that week.

## What Bedrock is, in two sentences

It's a single AWS endpoint that lets you call multiple foundation models — Anthropic Claude, AI21 Jurassic-2, Cohere Command, Meta Llama (announced for Bedrock but not yet available), Stability's image models, and Amazon's own Titan family — through one SDK and one IAM model. You pay AWS, AWS pays the model providers, and your data doesn't leave your VPC unless you let it.

It's not a model. It's a model *router*.

## The two reasons we ported

**Procurement.** Talking to AWS about a model is the same conversation we already have about S3 and Lambda. Talking to Anthropic about a model is a new conversation with a new contract, a new procurement review, a new security questionnaire. Our company's vendor-onboarding process for a *new* AI vendor is a six-week thing. Bedrock collapses that to zero.

**Optionality.** We've been calling Claude 2 directly through Anthropic's API. That works fine until the day a competitor's model is meaningfully better on our task and we need to swap. With Bedrock, the swap is mostly a model-ID change in our code; with a direct integration it's a quarter of work. We're not paying for optionality we won't use — Claude is still the best fit on our task right now — but we wanted the *ability* to swap when the landscape shifts.

## What worked in week one

- **The SDK is calm.** `boto3.client('bedrock-runtime').invoke_model(...)`. If you've written boto3 once, you've written this once. No surprises.
- **IAM works the way you'd expect.** Bedrock invocation is just another IAM permission. We were able to scope the API key to "only Claude 2, only from this Lambda" in about ten minutes. Doing this with a direct vendor API key would require us to write our own gateway.
- **PrivateLink is there.** For the parts of our workload that can't make outbound calls, we can keep the whole thing inside our VPC.

## What didn't work

- **Streaming is uneven across models.** Some models support streaming responses; some don't yet. Our UX relies on it, and the abstraction over models leaks here. We had to special-case behavior by model ID, which is exactly what an abstraction is supposed to prevent.
- **The pricing took a minute.** Per-token pricing varies by model, and the dashboard for tracking spend is not as developed as the rest of AWS Cost Explorer. We're going to have to roll our own per-feature cost tracking until that catches up.
- **Anthropic-specific features lag.** Anthropic just released Claude 2.1 with a 200K context window earlier this month. As of this week, that's not yet on Bedrock. If you need bleeding-edge model features, you'll still go direct to the provider. Bedrock is for when the model is *good enough* and the procurement/security story is more important than the latest feature.

## The re:Invent additions

Two weeks ago at re:Invent (Nov 27 – Dec 1), AWS announced a pile of Bedrock additions. The headline:

- **Agents for Amazon Bedrock** — orchestrate multi-step calls (call a tool, read a knowledge base, call the model, route the result). In **preview**. I'd test this once it goes GA; preview-stage agent frameworks have a way of changing under your feet.
- **Knowledge Bases for Amazon Bedrock** — a managed RAG pipeline, basically. Also in preview. Same wait-for-GA caveat.
- **Guardrails** — *announced*, not yet available. Content policies that travel with the model invocation. We need this badly; doing it ourselves at the application layer is fragile.

Three previews and a roadmap. The reality is: we're going to keep our app-layer guardrails for now, and check back on Bedrock's versions when they actually land.

## My take after a week

Bedrock is **the absence of a vendor lock-in argument**. That's the whole pitch. If you're inside a company where the security team and the legal team are the gating risk on shipping LLM features, Bedrock is the answer. If you're inside a startup where the gating risk is "which model is best *this week*," you're still going direct to the provider.

The team I lead is the first kind of team. So we're on Bedrock now. The port took five working days end to end. I'd do it again.

I'll write a follow-up in a couple months once we've had Agents and Knowledge Bases through a real evaluation. For now: useful, boring, and exactly what the procurement conversation needed.
