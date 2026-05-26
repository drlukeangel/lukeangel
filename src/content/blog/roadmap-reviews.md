---
title: "Roadmap reviews when half the work is non-deterministic"
date: 2026-04-14
category: teams
tags: [roadmaps, evals, meetings]
excerpt: "The four columns I steal from my therapist for running roadmap reviews when half the engineering work is non-deterministic."
pullquote: "I stole four columns from my therapist; my engineers stopped sighing."
notebook: building-with-ai-ml
notebookOrder: 12
cover: "../../assets/blog/roadmap-reviews-cover.svg"
coverAlt: "Roadmap reviews — four columns stolen from a therapist, for AI work that won't sit still"
---

Half the engineering work on an AI product is non-deterministic. The model layer underneath your feature changes on its own schedule. Your roadmap can't pretend it's a Gantt chart and survive.

Here's a template that does. I borrowed it, embarrassingly, from a therapist.

![A clean Gantt bar above a wobbly line — same start, same ship date, but the AI feature's path wiggles between them](../../assets/blog/roadmap-reviews-determinism.svg)

## Why the Gantt chart breaks here

A Gantt bar assumes the work is a straight line between two dates. That's a fine model for "rewrite the billing service" and a terrible model for "make the support copilot actually helpful." Both features sit in the same calendar week. Only one of them has a deterministic floor under it.

When the model layer can move, your roadmap has to make room for *the wobble*. Re-evaling. Re-prompting. Discovering the thing your CEO loved last sprint is the thing tanking the eval this sprint. A Gantt bar painted over that wobble is just a lie with corporate fonts on it.

What survives is a meeting and a written artifact that *names the wobble*. That's the whole trick.

## The four columns

I sat in a therapist's office a few years back and watched her draw four columns on a yellow legal pad. CBT thought records. *What happened. What I thought. What's actually true. What I'll try next.* I copied the page on my phone. Two weeks later I ran my standing roadmap review off it.

It worked. Then I did it again. It kept working.

![The four columns — Observed, Assumed, Evidence, Committing to — with example rows from a real roadmap review](../../assets/blog/roadmap-reviews-4-columns.svg)

> I stole four columns from my therapist; my engineers stopped sighing.

Translated for a PM running an AI feature, the columns become:

### 01 · Observed

What actually happened last sprint, in numbers and incidents, not vibes. Eval scores. p95 latency. Support tickets with quotes. Regression flags. *Where did the line go.* This is the most boring column and the most important one. No editorializing.

### 02 · Assumed

What we believed when we planned this sprint. The hypotheses, written down honestly. *We thought `gpt-4o-mini` was a drop-in for `gpt-4o` here. We thought users liked the new date format.* Most teams skip this column. That's why their roadmap reviews feel like blame sessions — they're comparing today's evidence to *yesterday's vibes,* not yesterday's stated bets.

### 03 · Evidence

What's actually true now, given column 1 minus column 2. This is the reframe. *We were wrong about `4o-mini` — the eval shows a 9% format-axis drop. We were wrong about users liking the new format — the tickets are from power users, not new ones.* This is where the model layer's wobble gets named, out loud, on the artifact.

### 04 · Committing to

What we're going to do this week. Small. Testable. Reviewable next Thursday. *Revert the prompt on prod. Add the failing examples to the eval set. Ship the format fix behind a flag.* Crucially — these are not Gantt bars. They're bets, with a re-review date.

## How to actually run the meeting

The whole review is ninety minutes. Six features, fifteen minutes each, plus a five-minute buffer at the end for the thing that always blows up.

For each feature, two people in the room get screen time:

1. **The PM reads column 1.** Numbers and incidents only. No story yet.
2. **The tech lead reads column 2.** What we believed; no defending it.
3. **The two of them write column 3 together,** out loud, in the doc. The room can chip in but doesn't drive.
4. **The PM closes with column 4.** Three to five lines. A re-review date.

The artifact is the doc, not the slide. Slides are for boards; docs are for the team. If you have to send a slide upstream, the slide is just column 4 with one sentence of context — never the whole record. The record is for honesty, not for sharing.

## What changes when you do this

Three things, in order:

1. **Sighs stop, mostly.** When the engineers know assumption-naming is a step in the process, the meeting stops being a vibes-court and starts being a notebook entry.
2. **The roadmap shortens.** Column 4 won't fit nine items if you're being honest about how much each bet costs to re-review. Two to five per feature is the natural shape.
3. **You catch model drift earlier.** Column 2 is the diary. When `4o-mini` was a drop-in for `4o` six weeks ago and it suddenly isn't, the only place that fact gets written down is here, the second time you fill in the columns.

## The disclaimers

This is not a project plan. It is not a stakeholder doc. It is not a substitute for a quarterly. It is a *standing weekly artifact* that lives next to whatever quarterly mechanism your org already has, and it gives that mechanism real data to feed on.

It also doesn't replace the therapist. You probably still need that one.

But on Wednesdays at 2pm, when the model layer has wobbled again and the eval is six points off where you wanted it, four columns and ninety minutes is the closest thing to a roadmap that an AI product actually has.
