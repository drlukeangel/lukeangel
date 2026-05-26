---
title: "Prompt regression — the rough first version of our test set"
date: 2023-11-15T09:18:00-05:00
category: tools
tags:
  - prompting
  - llms
  - ai
  - testing
excerpt: "We don't have a name for it yet. A spreadsheet of inputs, a spreadsheet of expected outputs, and the smallest script that runs one against the other. Notes from week two."
pullquote: "We're testing prompts the same way we test code. We just haven't earned the vocabulary yet."
notebook: building-with-ai-ml
notebookOrder: 1
cover: "../../assets/blog/prompt-regression-first-test-set-cover.svg"
coverAlt: "A column of input-and-expected-output pairs feeding a comparison check, where a fresh model output is matched against the expected one — a regression is caught at the check before it can reach the customer on the far side."
---

The engineers I lead shipped a feature last quarter that uses a model behind it. Twice now we've noticed that a small change to the prompt made the outputs *worse* in a way nobody caught for ten days. That's not a process problem. That's a missing test bed.

I sat down this week to try to fix it. This is what week two looks like.

## What we have so far

A spreadsheet. About forty rows. Each row has:

- An **input** — a real user query we pulled from production logs (anonymized).
- An **expected output** — the answer one of the PMs sitting in the room thought was the best version. Sometimes that's a paragraph. Sometimes it's a single sentence. Once, it's "the assistant should refuse politely."
- A **note** about *why* that's the expected output — what we'd lose if the model said something different.

That's it. Forty rows in a Google Sheet. Two columns load-bearing, one column is justification.

![One row of the test set, laid out as three cells. The input is a real anonymized user query pulled from production logs. The expected output is the answer a PM in the room judged best — sometimes a paragraph, sometimes one sentence, once just "refuse politely." The third cell is a note on why that output is the expected one — what we'd lose if the model said something else. The input and expected-output cells are marked load-bearing; the note is marked justification.](../../assets/blog/prompt-regression-test-set-row.svg)

## The script

The script around it isn't much smarter. For each row, it sends the input to our model, captures the output, and dumps the pair into a second spreadsheet for a human to review. The human is me on Sundays for now.

![The loop the script runs. A prompt change goes in. For each row in the test set, the script sends the input to the model and captures a fresh output. Each fresh output lands next to its expected output for a human — me, on Sundays — to compare. If a fresh output is worse than expected, that is a caught regression, and it stops at the review step instead of shipping. The dashed path shows what happens without the loop: the regression flows straight past, unnoticed, to the customer.](../../assets/blog/prompt-regression-catch-loop.svg)

What it doesn't do yet:

- It doesn't score anything automatically. I've read about using a stronger model to grade outputs (a paper went around earlier this year — "LLM as a judge" — that I'm still chewing on). For now, my eyes are the grader.
- It doesn't fail anything in CI. If the outputs look worse, I have to *notice*, and notice is doing a lot of work in that sentence.
- It doesn't have a rubric. I keep wanting to call this thing a rubric, but a rubric implies I've decided what "good" *means* on each axis. I haven't. The spreadsheet's "note" column is doing that job badly.

## What's already useful

Two surprises after two weeks:

**One,** the act of writing the expected output forces an opinion. Our team had been arguing for a month about whether the assistant should hedge ("I might be wrong, but…") or commit. The argument felt unresolvable. The moment we had to *write down* the expected response for ten queries, we settled it in an afternoon. The expected outputs were all committed and direct. Argument over. The spreadsheet ended the meeting.

**Two,** the worst regressions were *format* regressions, not content regressions. A prompt change made the model start answering in bullet points when the downstream UI expected a paragraph. The content was fine. The shape of it broke a parser two hops away. I would not have predicted that.

![Two tracks over a sequence of prompt changes. The top track is the golden set — the frozen expected outputs the PMs wrote — drawn as a flat, unchanging reference line. The bottom track is the model's live output, which holds close to the reference through the first few prompt changes, then jumps away at one change. The gap that opens at that change is the drift, and it is exactly the quantity the test set exists to measure. Without the frozen reference there is nothing to measure the drift against.](../../assets/blog/prompt-regression-golden-vs-drift.svg)

## What I'm trying next week

Three things:

- Tag each row with a **scenario** — "first-time user", "power user follow-up", "ambiguous query", "refusal-required". Right now they're undifferentiated. If we lose ground on the refusal-required rows, that's a much bigger deal than losing ground on the easy ones, and the average score is hiding it.
- Add a column for **what would make this answer worse** — the failure mode we're trying to avoid. That's closer to a rubric than what I have, but I'm not ready to commit to four axes yet. Maybe next month.
- Get one of the engineers to **run the script on every prompt change** before we ship. Right now it runs when I get to it on a Sunday. That doesn't scale.

## What I still don't know

I don't know what to call this. "Tests" is wrong because the outputs aren't deterministic. "Regression suite" is half-right but oversells how rigorous it is. The paper I mentioned uses the word "evals." Maybe that's where this goes.

I also don't know what the threshold for "good enough" is supposed to be on a forty-row spreadsheet where the grader is me. Probably I need both more rows and a less-biased grader before that question has an answer.

For now, the test set exists. It already caught one regression that would have shipped. That's enough to keep going.

More next month.
