---
title: "PII masking with Glue DataBrew — the rubric we ended up with"
date: 2026-05-19T14:30:00-04:00
category: tools
tags:
  - aws
  - aws-glue
  - databrew
  - pii
  - gdpr
  - data-engineering
  - privacy
excerpt: "Three months after open-sourcing the PII masking kit. What held up, what didn't, and the one bucket the rubric got wrong."
pullquote: "A rubric that survives contact with auditors is a rubric. Everything else is a draft."
cover: "../../assets/blog/pii-rubric-three-months-later-cover.svg"
coverAlt: "Cover graphic — PII masking with Glue DataBrew, the rubric we ended up with. May 2026."
---

Three months ago I [open-sourced the PII Masking Starter Kit](/blog/open-sourcing-the-pii-masking-starter-kit/). The rubric had been in private use for nine months at that point; I figured it was settled.

Three months of real-world contact later — including one audit and three new pipelines that adopted it — I have a slightly different rubric. This is the follow-up.

## What held up

Three of the four buckets survived contact with the auditors and the new pipelines without changes:

**Direct identifiers (hash with rotating salt).** Held up. The salt-rotation discipline turned out to be the thing the auditors cared about most, more than the hash itself. Quarterly salt rotation with old-salt-readable-for-30-days was the pattern that satisfied both "rotation happens" and "you can still join against last quarter's data for 30 days."

**Sensitive attributes (generalize).** Held up. The 0.01° GPS grid (≈1.1 km) is the bucket size that the privacy team agreed on. Smaller (0.001° ≈ 110m) was deemed too identifying given typical job-site density. Larger (0.1° ≈ 11km) made the analytics useless.

**Behavioral data (keep).** Held up. The discipline of *naming* the columns we deliberately kept turned out to matter — when a new data source came in with an unfamiliar column, the conversation became "is this behavioral or did someone sneak PII in?" instead of "should we mask it." The whitelist is more useful than the blacklist.

## What didn't hold up

The **quasi-identifier** bucket is where the rubric needed work.

Original rule: tokenize quasi-identifiers (employee ID, MAC address, names) to stable random strings, so within-dataset joins work but cross-dataset re-identification breaks.

What went wrong: **stable tokenization across multiple datasets in the same org turned out to create a cross-dataset join key by accident.** When two pipelines tokenized the same operator name using the same namespace, the resulting tokens *matched*. The privacy team's whole point in tokenizing was to prevent cross-dataset linking; we'd defeated the purpose without realizing it.

The fix that landed: **namespace tokens per data domain, not per organization**. The PII masking job now takes a `--domain` argument (e.g., `tool-telemetry`, `support-tickets`, `billing`) and the token namespace is mixed into the hash so the same name in different domains gets different tokens.

This was a real bug that ran in production for six weeks before someone in the privacy team caught it during a routine audit. Embarrassing. The rubric now has a much louder note about it.

## What we added

**A fifth bucket — free-text fields with embedded PII.**

The original rubric covered structured columns. It didn't really address free-text fields where PII appears in arbitrary positions — error message strings that contain operator emails, notes fields users have typed names into, comment columns with phone numbers.

Our first attempt: regex. Worked for emails and phone numbers (mostly); failed for names, addresses, and anything not pattern-shaped.

What we landed on: **Microsoft Presidio** for named-entity recognition on free-text columns. The Glue job now routes free-text columns through Presidio, redacts identified entities, and passes the redacted text downstream. Presidio is open source, integrates cleanly with the PySpark pipeline, and gets us about 92% recall on the entity types our docs contain.

Added to the rubric as **Bucket 5: Free-text → redact via NER, log identified entities for audit, fail closed on suspect columns.**

## What the audit asked for

We had our first external audit on this pipeline in March. The auditors asked for three things I hadn't built:

**A masking decision log.** For every column we mask, log: which bucket, which treatment, which version of the rubric. Append-only. The auditor wanted "show me, for this exact row, exactly what was done to it." We added a per-row metadata block to the masked output that records the rubric version applied. Not free in storage, but bounded.

**A "what was kept, and why" report.** The auditor wanted us to defend the *behavioral* bucket — which columns we'd kept and the reasoning. We had this informally in the rubric file; the audit needed it as a structured artifact. Added a `kept_columns.md` per dataset that gets reviewed in PR.

**A rollback story.** "If we discover next year that a column we classified as behavioral was actually PII, what's the remediation?" Forced us to write a runbook for re-masking historical data with an updated rubric. The runbook is uncomfortable but the audit pushed us to write it down, which I'm grateful for.

## What I'd change in the rubric, if starting over

Three things, ordered by regret:

**Make domain-namespacing explicit from day one.** The six-week cross-dataset leak was the worst find. Two extra lines of rubric copy could have prevented it.

**Include the audit-evidence shape in v1.** Building "what counts as PII" without simultaneously building "how do we *prove* we masked it correctly" is doing half the job. Auditors are downstream stakeholders; design for them.

**Free-text isn't optional; it's everywhere.** I left it out of v1 because it was hard. It came back as Bucket 5 within six months because the problem doesn't care that you found it hard.

## What's in the next revision

I'll push a v2 of the kit to GitHub later this quarter. Changes from v1:

- Domain-namespacing on quasi-identifier tokenization
- Free-text Bucket 5 with the Presidio integration
- The masking decision log
- The kept_columns / audit-evidence templates
- An updated `rubric.md` that incorporates all of the above

The first ten teams to adopt the v1 rubric were our internal teams. The next ten are external — engineering managers who emailed me after the launch post. The fact that v2 exists at all is because of the questions they asked. Open-sourcing the kit was the single most useful thing I did to *improve* the kit, which is the whole reason to open-source things.

## The framing that lasted

The bigger lesson from three months of running the rubric is the one I started with: **get the rubric right, the rest is bookkeeping.** A rubric that survives contact with auditors, with new pipelines, with hostile re-identification attempts, is a rubric. Everything else is a draft.

We're three drafts in now. The fourth one ships next quarter.
