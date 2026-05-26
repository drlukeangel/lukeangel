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
notebook: building-with-ai-ml
notebookOrder: 2
excerpt: "Amazon Bedrock went GA in September. I spent last week pointing one of our LLM features at it. Notes — what's useful, what's missing, and what re:Invent added two weeks ago."
pullquote: "Bedrock isn't a model — it's the absence of a vendor lock-in argument."
cover: "../../assets/blog/first-week-with-bedrock-cover.svg"
coverAlt: "One AWS endpoint fanning out to a row of foundation models from different providers, with a single IAM key and a private network boundary drawn around the whole exchange — one SDK, one bill, many models."
---

Amazon Bedrock went generally available on September 28th. We've been on a private preview waitlist for months. I finally got the team to spend a week last week porting one of our LLM features off of a direct API integration and onto Bedrock. Notes from that week.

## What Bedrock is, in two sentences

It's a single AWS endpoint that lets you call multiple foundation models — Anthropic Claude, AI21 Jurassic-2, Cohere Command, Meta Llama 2 (the 13B and 70B chat models landed on Bedrock just last month), Stability's image models, and Amazon's own Titan family — through one SDK and one IAM model. You pay AWS, AWS pays the model providers, and your data doesn't leave your VPC unless you let it.

It's not a model. It's a model *router*.

![The managed-model-API value prop, drawn as a fan-out. On the left, your app — a Lambda — makes a single boto3 invoke_model() call into the Bedrock endpoint. One IAM policy scopes that endpoint; PrivateLink keeps the whole exchange inside your VPC. From the single endpoint, routing lines fan out to four foundation models from four different providers. The point: one SDK, one IAM model, and one bill reach many models, and swapping between them is a model-ID change rather than a new integration.](../../assets/blog/bedrock-pm-managed-router.svg)

## The two reasons we ported

**Procurement.** Talking to AWS about a model is the same conversation we already have about S3 and Lambda. Talking to Anthropic about a model is a new conversation with a new contract, a new procurement review, a new security questionnaire. Our company's vendor-onboarding process for a *new* AI vendor is a six-week thing. Bedrock collapses that to zero.

**Optionality.** We've been calling Claude 2 directly through Anthropic's API. That works fine until the day a competitor's model is meaningfully better on our task and we need to swap. With Bedrock, the swap is mostly a model-ID change in our code; with a direct integration it's a quarter of work. We're not paying for optionality we won't use — Claude is still the best fit on our task right now — but we wanted the *ability* to swap when the landscape shifts.

![The LLM layer, direct to a provider versus through Bedrock. Going direct means a chain of new gates a brand-new vendor triggers: a new contract, a procurement review, a security questionnaire, and a new data-flow approval — roughly a six-week onboarding before code even reaches the model, and swapping the model later is a quarter of work. Through Bedrock, the same code reaches many models behind a single gate the team already cleared: the existing AWS agreement and IAM, so net-new vendor onboarding is zero and a later model swap is a model-ID change. Same code reaches the model; the difference is everything standing in front of it.](../../assets/blog/bedrock-pm-direct-vs-bedrock.svg)

## What worked in week one

- **The SDK is calm.** `boto3.client('bedrock-runtime').invoke_model(...)`. If you've written boto3 once, you've written this once. No surprises.
- **IAM works the way you'd expect.** Bedrock invocation is just another IAM permission. We were able to scope the API key to "only Claude 2, only from this Lambda" in about ten minutes. Doing this with a direct vendor API key would require us to write our own gateway.
- **PrivateLink is there.** For the parts of our workload that can't make outbound calls, we can keep the whole thing inside our VPC.

## What didn't work

- **Streaming is uneven across models.** Some models support streaming responses; some don't yet. Our UX relies on it, and the abstraction over models leaks here. We had to special-case behavior by model ID, which is exactly what an abstraction is supposed to prevent.
- **The pricing took a minute.** Per-token pricing varies by model, and the dashboard for tracking spend is not as developed as the rest of AWS Cost Explorer. We're going to have to roll our own per-feature cost tracking until that catches up.
- **Provider parity isn't guaranteed day-zero — but it's closer than I expected.** My going-in fear was that Bedrock would always trail the provider's own API by a release or two, and that a managed router means you wait for the latest model feature. The Claude 2.1 timeline argued the other way: Anthropic announced it on November 21st with a 200K context window, and it was generally available *on Bedrock* by the 29th — about a week, and it landed in the same re:Invent window as everything below. So the gap, at least this time, was small. I'm not treating that as a promise. The honest posture is that you can't *assume* same-day parity for a feature your roadmap depends on; you confirm a specific model and capability is on Bedrock before you commit to it. Bedrock earns its place when the model is *good enough* and the procurement/security story matters more than being first to a brand-new capability — not because the capability is necessarily late.

## The re:Invent additions

Two weeks ago at re:Invent (Nov 27 – Dec 1), AWS dropped a pile of Bedrock additions. The headline:

- **Agents for Amazon Bedrock** — orchestrate multi-step calls (call a tool, read a knowledge base, call the model, route the result). Went **GA** at the show. GA two weeks ago is not the same as battle-tested, though — a v1 agent framework still moves under your feet, and I'd rather watch other people find the sharp edges first. We'll run it through a real evaluation, not wire it into anything a customer touches yet.
- **Knowledge Bases for Amazon Bedrock** — a managed RAG pipeline, basically. Also GA at re:Invent. Same posture: worth a serious look, but I'm not migrating our hand-built retrieval onto a two-week-old managed service on faith.
- **Guardrails for Amazon Bedrock** — in **preview**, not yet generally available. Content policies that travel with the model invocation. We need this badly; doing it ourselves at the application layer is fragile. But preview means it can change, so it's not something I'll commit a launch to until it's GA.

Two things newly GA, one in preview, and a lot I'm choosing to wait on. The reality is: we're keeping our app-layer guardrails and our own retrieval for now, and putting Agents and Knowledge Bases through an honest evaluation before we let either near production.

## My take after a week

Bedrock is **the absence of a vendor lock-in argument**. That's the whole pitch. If you're inside a company where the security team and the legal team are the gating risk on shipping LLM features, Bedrock is the answer. If you're inside a startup where the gating risk is "which model is best *this week*," you're still going direct to the provider.

![What GA changed for a product team, drawn as a decision fork. The question at the top: what's the gating risk on shipping an LLM feature? One branch — security and legal — leads to Bedrock, where vendor risk collapses to the AWS contract you already have, and a "good enough" model plus a clean procurement story wins. The other branch — which model is best this week — leads to going direct to the provider, paying the onboarding cost to be first to a new capability. The takeaway: GA didn't pick a model for you, it changed which risk you optimize against.](../../assets/blog/bedrock-pm-which-team.svg)

The team I lead is the first kind of team. So we're on Bedrock now. The port took five working days end to end. I'd do it again.

I'll write a follow-up in a couple months once we've had Agents and Knowledge Bases through a real evaluation. For now: useful, boring, and exactly what the procurement conversation needed.
