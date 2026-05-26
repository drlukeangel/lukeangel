---
title: "Agent-based DevOps with Q Developer — kept vs tossed"
date: 2026-03-26T15:22:00-04:00
category: tools
tags:
  - aws
  - q-developer
  - agents
  - devops
  - ci-cd
  - ai
excerpt: "Eight months running Amazon Q Developer agents in our engineering org. The four agentic workflows that earned their keep, the two we shut off, and the metric that made the case to keep going."
pullquote: "An agent that's wrong 5% of the time is not a 5% problem. It's a trust problem with a percentage attached."
notebook: building-with-ai-ml
notebookOrder: 11
cover: "../../assets/blog/agent-based-devops-q-developer-cover.svg"
coverAlt: "A central agent hub fans out to several DevOps workflow lanes; two lanes pass with green checks and two are crossed off in red and dropped — the workflows that earned their keep versus the ones shut off."
---

We've been running Amazon Q Developer agents across our engineering org for about eight months. Started cautiously, expanded carefully, and pruned hard. What's stayed, what's gone, and the metric that made the case to leadership to keep going.

## What we kept

### 1. Dependency-upgrade agent

The biggest win. Q Developer reads our `package.json` / `pom.xml` / `Cargo.toml` on a schedule, identifies dependencies behind the current safe version, opens PRs one at a time, runs the test suite, and labels the PR by risk.

Three categories of upgrade get auto-merged after CI passes:

- **Patch versions** with no breaking-change notes
- **Minor versions** of dev dependencies (linters, type checkers, formatters)
- **Security-only updates** on dependencies flagged by Dependabot

Everything else opens a PR for human review.

**Why it stuck:** dependency upgrades are toil. They're not interesting. They're a never-ending background workload that gets deferred until something breaks. An agent that handles 80% of them automatically and surfaces the 20% that need judgment is *exactly* the right shape for this kind of work.

**Number on it:** we landed 1,200 dependency-upgrade PRs in 2025 across our repos. Of those, ~950 were auto-merged. The engineering time that recovered is roughly half an engineer-year. Real money.

### 2. PR review agent (advisory, not blocking)

Every PR gets an automated review pass from Q Developer. It comments on:

- Tests it thinks should exist but don't
- Edge cases it suspects aren't handled
- Patterns inconsistent with the rest of the codebase

The agent's comments are **advisory** — never blocking. A human reviewer is still required to approve. The reviewer can take or ignore the agent's suggestions.

**Why it stuck:** it doesn't replace review, it *prompts* better review. We measured this: human reviewers leave 30% more substantive comments on PRs that the agent has commented on first. The agent isn't smarter than the reviewer; it just *primes* the reviewer to look harder.

**Important nuance:** the agent's comments are *visibly attributed* to the agent. We tried hiding the attribution for a month to see if reviewers would treat them as peer comments. They didn't — they trusted them less. Attribution is a feature, not a bug.

### 3. Documentation-drift agent

Every time a public API changes in a service, the agent checks whether the corresponding docs were updated in the same PR. If not, it opens a follow-up PR adding the doc changes. The author can edit or close the suggestion.

**Why it stuck:** doc drift is the single biggest support-ticket source we have. The agent catches about 70% of API changes that would have shipped without doc updates. The other 30% it misses are typically renames or refactors where the doc update is ambiguous.

### 4. Incident-investigation agent

When PagerDuty fires, the agent automatically pulls together a brief: recent deploys, recent flag flips, related alerts in the last 24 hours, log samples from the affected service, and links to similar incidents from the runbook. Posts it as the first comment in the incident channel.

**Why it stuck:** the first 10 minutes of an incident are exactly the same 10 minutes every time — somebody pulling up the deploy log, somebody else searching logs, somebody else looking for prior runs of the same incident. Having an agent assemble the brief while humans are still typing "/oncall" buys back those 10 minutes.

**Important caveat:** the agent does *not* take action. No flag flips, no deploys, no anything that mutates state. It assembles the brief; humans decide.

That caveat isn't specific to the incident agent — it's the line that runs under all four kept workflows. Every one of them assembles, suggests, or drafts; not one of them mutates state on its own. The human is always on the trigger.

![Where the line sits between the agent and the human across all four kept workflows. On the left, the agent, marked read-only: it opens the upgrade PR, comments on the review, drafts the doc follow-up, and assembles the incident brief — it surfaces work but never mutates state. A dashed boundary labelled "the trigger" separates the two, with an arrow crossing from agent to human. On the right, the human, who holds the action: approves the merge, takes or ignores the comment, edits or closes the draft, and flips the flag or runs the deploy — every state change is a human decision. The one noted exception is auto-merge, and only after CI passes on patch, dev-dependency, and security-only upgrades.](../../assets/blog/agent-based-devops-action-boundary.svg)

## What we tossed

### 1. Test-generation agent

Tried for three months. The agent would propose new tests for code that lacked coverage. The tests were syntactically valid, would pass against the current implementation, and were *almost universally useless* — they tested the implementation rather than the contract, and changed every time the code changed.

We shut it off. Test coverage that doesn't catch real regressions is worse than no coverage; it gives false confidence.

What might work: an agent that generates tests *from* a specification document (input/output examples, behavioral contracts), not from the existing code. We haven't built it yet.

### 2. Auto-fix-the-lint agent

Tried for a month. The agent would auto-fix lint and style violations. Sounded great. In practice, it kept "fixing" things in ways that broke contextual decisions an engineer had made deliberately (a `// eslint-disable-next-line` that was load-bearing, a formatting choice that aligned with a generated file).

We shut it off and went back to humans plus `pre-commit`. The lesson: the cost of "an agent fixing the wrong thing" is much higher than the cost of "an engineer running `npm run lint:fix` themselves."

![The six agentic workflows sorted into two columns. The kept column holds four: dependency upgrades (around 950 of 1,200 PRs auto-merged), advisory PR review (30 percent more substantive human comments on PRs the agent commented on first), documentation-drift detection (catches about 70 percent of undocumented API changes), and incident-brief assembly (assembles context but never mutates state). The tossed column holds two: test generation, which tested the implementation rather than the contract and gave false confidence worse than no coverage, and auto-fix-the-lint, which kept "fixing" load-bearing deliberate decisions so the wrong-fix cost beat the savings. The kept workflows are boring, judgment-shaped, and advisory; the tossed ones were impressive but quietly wrong.](../../assets/blog/agent-based-devops-kept-vs-tossed.svg)

The pattern across the divide is clear once you see it laid out: the agents that stuck were the boring, advisory ones that surfaced judgment rather than substituting for it. The ones we shut off were the impressive ones that quietly produced wrong work a human then had to find and undo.

## The metric that kept the program alive

About four months in, our VP of Engineering started asking the right question: *is this saving time or generating noise?* I'd been measuring agent activity (PRs opened, comments posted) which is the wrong metric — it measures the agent, not the impact.

We switched to **engineering-hours-recovered**, calculated as:

- Hours we'd have spent on the work the agent automated (dependency-upgrade time, PR-priming time, incident-assembly time)
- *Minus* hours we spent reviewing agent output that was wrong or unhelpful
- *Minus* hours we spent maintaining the agent integrations

![The engineering-hours-recovered formula drawn as three terms over an equals bar. The first term, in green, adds the hours the agent automated — upgrade toil, PR-priming, incident assembly. The second and third terms, in red, subtract the hours spent reviewing wrong or unhelpful agent output and the hours spent maintaining the integration. Below the bar, two outcomes: the four kept agents net out to roughly plus 0.7 FTE recovered per quarter, while the two tossed agents net negative because review time exceeded the savings.](../../assets/blog/agent-based-devops-hours-recovered.svg)

For the four kept agents, the answer was roughly **0.7 FTE of recovered engineering time per quarter** across our 24-person engineering org. For the two tossed agents, the answer was *negative* — we spent more time reviewing wrong agent output than the agent saved.

That metric made the case to leadership. It also gave us the discipline to shut off the tossed ones without arguing about it. The math is the math.

## What I'm watching for next

Three near-term things on the watch list:

- **Agent-led migrations.** AWS Transform is the obvious play here for re-platforming workloads. We have a Java 11 → Java 21 migration coming up. The pilot starts next month.
- **Cross-repo refactors.** "Rename this concept across 40 repos consistently." Q Developer can technically do this; we haven't trusted it yet. Watching for stories from other teams.
- **Compliance evidence collection.** We have a SOC 2 audit every year. The evidence-collection part of it is the most agent-shaped work in the world — go to N places, pull M things, format them into the auditor's template. Not yet productized, but it should be.

## The thing I'd tell another VP

If you're considering rolling out agentic DevOps in your org:

**Start with one workflow. Pick the boring one** — dependency upgrades, doc-drift, incident-brief assembly. Avoid the impressive ones (test gen, refactors) until you've built the eval discipline to know when the agent is wrong.

**Insist on a metric.** Agent-activity counts will fool you. Recovered-engineering-time will not.

**Be willing to shut things off.** The hardest part of running an agent program isn't standing things up; it's accepting that some of them aren't working and turning them off without feeling like you've failed.

An agent that's wrong 5% of the time is not a 5% problem. It's a *trust* problem with a percentage attached. The agent has to be right enough that engineers don't develop the habit of double-checking everything — because that habit eats the savings.

![The value of an agent drawn as three zones along an axis from more errors on the left to fewer errors on the right. The leftmost zone is "shut it off" — too wrong to use, marked with a red cross. The rightmost zone is "trust the agent" — right enough that engineers stop checking its work, marked with a green check. Between them sits the widest zone, "the expensive middle," marked with a magnifier: the agent is right enough to keep but wrong often enough that engineers double-check everything it does, and that double-checking habit eats the savings. The point is that an agent's value is a step function, not a smooth slope — the middle is the worst place to be.](../../assets/blog/agent-based-devops-trust-curve.svg)

Get to "trust the agent" or shut it off. The middle is the most expensive place to be.

I'll write a year-in review in November.
