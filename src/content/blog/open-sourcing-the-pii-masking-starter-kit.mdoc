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
notebook: connected-products
notebookOrder: 12
excerpt: "A four-bucket PII rubric, a runnable PySpark Glue job, an AWS DataBrew recipe, and a verify script that fails CI when the rubric drifts. The privacy layer that sits on the telemetry a connected-product fleet emits — open-sourced today after nine months of running it in private."
pullquote: "Get the rubric right, the rest is bookkeeping."
cover: "../../assets/blog/open-sourcing-pii-masking-kit-cover.svg"
coverAlt: "Four streams of fleet telemetry — direct identifiers, quasi-identifiers, sensitive attributes, and behavioral data — flowing through a masking gate, where three are transformed and the behavioral stream passes through untouched."
featured: true
---

A connected-product fleet emits telemetry, and a lot of that telemetry is about a person. Who used the tool, where they used it, when, for how long. The moment that data leaves the device and lands in a cloud bucket, you own a privacy problem — and "we'll mask it later" is how that problem becomes a breach notification.

Nine months ago I started writing down a PII rubric for the connected-products data pipeline the team I lead runs in production. The rubric got reused on a second pipeline last quarter. Then a third. It's been the most-screenshot artifact in our internal docs for about half a year — because it's the layer that sits *between* the fleet and everything downstream, and every team that ships connected hardware eventually needs it.

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

![The four-bucket PII rubric: each column from the fleet lands in exactly one bucket with exactly one treatment. Direct identifiers (operator_email, tool_serial) are hashed with HMAC-SHA256 and a rotating salt, irreversibly. Quasi-identifiers (operator_name, job_site_address, MAC) are tokenized to a stable random token so joins still work. Sensitive attributes (gps_lat/gps_lon, biometric, salary) are generalized — GPS to a 0.01-degree grid, ages into five-year bins. Behavioral, non-PII data (battery_pct, torque_nm, usage_minutes) is kept untouched because it's what the product runs on.](../../assets/blog/pii-masking-four-bucket-rubric.svg)

The "rotating salt" on the direct-identifier bucket is doing two jobs at once, and it's worth seeing why. Run the same `operator_email` through HMAC-SHA256 with this quarter's salt and you get a digest no key can reverse. Rotate the salt next quarter and the *same* email produces a *different* digest — so the value can't be used to join one rotation window to the next. Irreversible and unjoinable, from one cheap primitive.

![Why the direct-identifier bucket uses a rotating salt. The same operator_email is fed into HMAC-SHA256 twice — once with the Q1 salt, once with the Q2 salt. The Q1 salt yields one digest (a3f9c1…) and the Q2 salt yields a different one (7b20e4…) for the identical input. A red break between the two outputs marks that the digests don't match across windows: the hash is irreversible because no key recovers the input, and unjoinable across windows because rotating the salt means the same value never produces a stable key.](../../assets/blog/open-sourcing-the-pii-masking-starter-kit-fig-1.svg)

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

![The mask pipeline end to end: raw fleet telemetry from connected drills and torque wrenches, with PII still in the clear, flows into the masking step where the rubric is applied — a PySpark Glue job for the production path or a DataBrew recipe for the analyst path — producing masked output where direct identifiers are hashed, quasi-identifiers tokenized, sensitive attributes generalized, and behavioral data kept intact. A verify.py check runs in CI on the output; if the masking drifts from the rubric, the build fails and you fix the masking, not the test.](../../assets/blog/pii-masking-pipeline.svg)

The `verify.py` step is the part that keeps this honest. A rubric in a doc rots — a new column lands, someone forgets which bucket it's in, and three months later there's an `operator_email` column sitting unmasked in the analytics warehouse. The verify script re-derives the invariants from the rubric and asserts them against the masked output: no value in a hashed column is reversible, every quasi-identifier is tokenized, no raw GPS survives. If the masking drifts from the rubric, the build goes red. You don't get to merge a pipeline change that quietly de-anonymizes the fleet.

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
