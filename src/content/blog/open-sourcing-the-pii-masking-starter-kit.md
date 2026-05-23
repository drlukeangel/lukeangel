---
title: "Open-sourcing the PII Masking Starter Kit"
date: 2026-02-26T11:00:00-05:00
category: tools
tags:
  - aws
  - aws-glue
  - databrew
  - pii
  - gdpr
  - data-engineering
  - privacy
  - open-source
excerpt: "A four-bucket PII rubric, a runnable PySpark Glue job, an AWS DataBrew recipe, and a verify script that fails CI when the rubric drifts. Open-sourced today after nine months of running it in private."
pullquote: "Get the rubric right, the rest is bookkeeping."
cover: "../../assets/blog/open-sourcing-pii-masking-kit-cover.svg"
coverAlt: "Cover graphic — Open-sourcing the PII Masking Starter Kit. February 2026."
featured: true
---

Nine months ago I started writing down a PII rubric for the connected-products data pipeline the team I lead runs in production. The rubric got reused on a second pipeline last quarter. Then a third. It's been the most-screenshot artifact in our internal docs for about half a year.

Today I cleaned it up, paired it with the runnable infrastructure code that enforces it, and pushed it public.

→ **[github.com/drlukeangel/PII-Masking-Starter-Kit-Product-Management](https://github.com/drlukeangel/PII-Masking-Starter-Kit-Product-Management)**

## What's in the box

Five files and a rubric:

| Path | What it does |
| --- | --- |
| `rubric.md` | The four-bucket PII rubric — categories × treatment, one page |
| `data/generate_synthetic.py` | Generate fake tool-telemetry data with realistic PII surface |
| `data/sample_tool_telemetry.csv` | 20 rows of synthetic data, ready to run |
| `glue/pii_masking_job.py` | PySpark job — production path |
| `databrew/recipe.json` | DataBrew recipe — analyst-friendly path |
| `verify.py` | Post-mask invariants check that fails CI on rubric drift |

Stack: `python` · `pyspark` · `aws glue` · `aws databrew`. The whole repo runs locally (with PySpark installed) or deploys as a Glue Job in AWS unchanged.

## The rubric, in one paragraph

PII isn't one thing. It's four:

- **Direct identifiers** (email, device serial, government ID) → **hashed with a rotating salt** (HMAC-SHA256). Output is irreversible and unjoinable across rotation windows.
- **Quasi-identifiers** (name, employee ID, MAC) → **tokenized to a stable random string**. Same value maps to the same token within the dataset, so joins still work. Mapping table lives in a separately-secured location.
- **Sensitive attributes** (location, biometric, health, salary) → **generalized**. GPS to 0.01° grid (~1.1 km). Ages bucketed in five-year bins. Timestamps rounded to the hour. Free text run through NER and redacted.
- **Behavioral / non-PII** (battery level, usage minutes, error codes) → **kept**. This is what the product runs on; don't touch it.

That's the rubric. Three questions decide which bucket any new column lands in. Full table and worked example in `rubric.md`.

## Why it exists (and why it's small)

Most teams handle PII three ways: ignore it (illegal), hash everything (useless), or argue about it for six weeks before a single byte moves (expensive). The rubric is the minimal opinionated alternative — short enough that legal will read it, runnable enough that engineering will use it.

I kept the repo deliberately small. Five files. One rubric. No framework. No abstractions you have to learn before you can read the code. The whole thing fits in your head after 30 minutes; the whole thing runs end-to-end in 10 minutes.

## How teams use it

Different audiences read different files. From the README:

- **Engineering managers** fork as a starting template for the data-pipeline repo.
- **Product managers** read `rubric.md` and stop there. The rubric is the conversation, not the code.
- **Data engineers** lift the Glue job structure, swap in their own schema, keep the rubric.
- **Privacy and legal partners** audit `rubric.md` and `verify.py`. The verify script is the contract — if it passes, the rubric is honored.

The shape that's worked for us: hand legal the rubric, hand engineering the Glue job, run `verify.py` in CI on every pull request that touches the data pipeline. The argument moves from "what counts as PII" (which is a six-week conversation with no end) to "is this column a direct identifier, quasi-identifier, sensitive attribute, or behavioral data" (which is a five-minute conversation that ends).

## Why the example is tool telemetry

The synthetic dataset isn't e-commerce customers — it's **industrial tool telemetry**: connected drills and torque wrenches sending readings to the cloud, tagged with the operator who used them and the job site they were on. The PII surface looks like this:

- `tool_serial` — direct identifier of the device
- `operator_id`, `operator_email`, `operator_name` — direct PII
- `gps_lat`, `gps_lon` — sensitive (location)
- `job_site_address` — quasi-identifier
- `battery_pct`, `torque_nm`, `usage_minutes` — behavioral, no PII

That's a real PII surface anyone running a connected-product pipeline hits in week two. The rubric handles each. If your dataset has a different shape, the *buckets* still apply — only the column-to-bucket mapping changes.

## What it pairs with

This kit ships data; the [Connected Products Starter Kit](/projects/connected-products-kit/) emits it. The two kits work together: one ingests telemetry from the fleet, the other masks it before anything else touches it.

For most connected-product teams, the masking is the hard part to get right early — not the ingestion. If you're standing up a fleet today and don't yet have a PII story for the data it produces, start with the rubric. The infrastructure follows from the decisions you make there.

## When to outgrow it

Listed in the README. Short version:

- **Privacera** for enterprise data-access governance integrated with Glue and Lake Formation.
- **Immuta** for policy-as-code data masking, especially Snowflake-heavy stacks.
- **Microsoft Presidio** (open source) for PII *detection* in free-text — pairs nicely with the rubric for the columns that contain user-generated content.
- **AWS Macie** for PII *discovery* in S3 — run it on your raw bucket to surface columns the rubric missed.

This kit covers the first 80%. Graduate when it stops fitting.

## What I'll write up later

Two follow-up pieces I'm planning:

- A three-months-in reflection on running this in production — what worked, what we'd change, what the auditors made us add.
- A deeper dive on the structured-data masking path that doesn't fit cleanly in the rubric (free-text fields containing PII, semi-structured logs).

For now: clone, run, mask. The repo's job is to make the PII conversation cheaper. The discipline is in the rubric. The code is the part that makes the rubric load-bearing.
