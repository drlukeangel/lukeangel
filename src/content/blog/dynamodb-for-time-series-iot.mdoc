---
title: "DynamoDB for time-series IoT — when the relational urge is wrong"
date: 2024-03-19T08:33:00-04:00
category: tools
tags:
  - aws
  - dynamodb
  - iot
  - architecture
  - data
notebook: connected-products
notebookOrder: 5
excerpt: "Every six months an engineer on my team proposes putting our device telemetry into Postgres. Every six months I have to explain why DynamoDB is the right answer. Here it is, in writing."
pullquote: "A Postgres query that does a sequential scan on six months of telemetry is a Friday-afternoon meeting waiting to happen."
cover: "../../assets/blog/dynamodb-time-series-iot-cover.svg"
coverAlt: "A device puck streams telemetry points into a time-ordered partition — recent records bright at the top, older ones fading down toward a cold object-store archive, with a branch up to an analytics chart."
---

Every six months a senior engineer on my team has the same idea, with the same energy, and pitches putting our device telemetry into Postgres. *We know SQL. We have an RDS instance running. We could just add a table.* Every six months I have to explain why the answer is no.

I'm writing it down once so the next person can read this instead of me re-explaining it in a meeting.

**Note before the argument:** previously, on my first connected product (the [v1 series](/notebooks/building-medical-iot-connected-products/), 2017-2019), we put a million devices' worth of telemetry into Postgres and it worked fine. So I've actually run the experiment the engineers are proposing. It worked at v1's shape of workload — ~3 sessions per device per day, ~500 bytes per session, mostly relational access patterns. It would *not* have worked at v2's shape, which is what this post is about.

## Why the relational urge happens

It's not a bad instinct. Postgres is well understood, our team has decades of collective experience with it, the query language is more expressive, and operationally a database the team already runs is cheaper to add to than a database they haven't.

The relational urge breaks specifically on **the shape of IoT telemetry**:

- Writes are append-only and continuous. Devices publish every N seconds, forever, never updating an old row.
- Reads are almost always *recent* — "last 100 events for this device" — and almost never *aggregated across the whole table*.
- The schema is wide-ish, low-cardinality on most columns, and never JOINs to anything meaningful.
- The volume grows linearly with device count, not user count. A successful product has 100K devices each writing once a minute. That's 144 million writes per day. Every day. Forever.

The relational urge wins for the first two months and then explodes around month four when the table gets to ten million rows and your `WHERE device_id = ? ORDER BY ts DESC LIMIT 100` query starts doing a sequential scan against an under-tuned index.

![Side-by-side of the same query — last 100 events for one device. On Postgres, one wide device_telemetry table of 10M+ rows: the matching rows are scattered through a heap interleaved with every other device's rows, so the query reads the whole table to find them and latency climbs with every device added. On DynamoDB, partition key device_id plus sort key event_ts: the device's events are one contiguous, time-sorted slice, so the query jumps straight to it — a single-partition range scan that stays flat at single-digit milliseconds at any table size.](../../assets/blog/dynamodb-relational-urge-contrast.svg)

## Why DynamoDB fits the shape

DynamoDB's data model is *exactly* the shape of IoT telemetry, by accident:

- **Partition key = `device_id`**, **sort key = `event_ts`**. The most common query — recent events for one device — is a *single-partition range scan*, the fastest operation Dynamo does. It costs single-digit milliseconds at any table size.

![How partition key and sort key lay time-series data out. The partition key device_id decides which device's data this is; every device gets its own partition. The sort key event_ts orders that device's items by time inside the partition, so one device's events sit together as a sorted run. A hundred thousand devices means a hundred thousand independent partitions. The query for recent events — Query with pk = one device, sk descending, limit 100 — touches exactly one partition as a single-partition range scan, the cheapest operation Dynamo does, and it never gets slower as the fleet grows. A separate expires_at TTL attribute (epoch seconds) lets DynamoDB delete old items for you with no cron job and no archival script.](../../assets/blog/dynamodb-partition-sort-key-schema.svg)

- **Pay-per-request mode** matches the spiky-but-steady write pattern of a device fleet. You don't have to size provisioned capacity for peak; you don't have to autoscale based on guesswork.
- **TTL** is a first-class attribute. Set `expires_at` on every record; DynamoDB deletes them for you when the time comes. No cron job, no archival script.
- **Streams** are built in. When you eventually want analytics — and you eventually will — you turn on a stream and pipe it to Kinesis Firehose, which lands the data in S3 as Parquet, which Athena can query like a data lake. The transactional and analytical paths split cleanly.

## The shape, in a handful of lines

```text
Table: device_telemetry
  Partition key: device_id (S)
  Sort key:      event_ts  (S — ISO 8601)
  TTL attribute: expires_at (N — epoch seconds)
  Billing:       PAY_PER_REQUEST
  GSI:           job_site_index (job_site_id, event_ts) — for site queries
  Streams:       NEW_IMAGE → Kinesis Firehose → S3 (Parquet) → Athena
```

That's it. A handful of lines that handle 144M writes a day without you thinking about indexes again.

The one line that does real work there is the GSI. The base table answers "recent events for one device." The `job_site_index` re-indexes the *same items* under a different partition key — `job_site_id` — so "all devices at one site, by time" becomes its own single-partition range scan. No JOIN, no second table to keep in sync: one write, two ways to read it.

![One item set, two access patterns, no JOIN. In the middle is the set of device_telemetry items, each carrying both a device_id and a job_site_id alongside its event_ts, payload, and expires_at. The base table uses pk = device_id, sk = event_ts, answering "recent events for one device." The GSI job_site_index uses pk = job_site_id, sk = event_ts, answering "all devices at one site" — re-indexing the exact same items under a different key. Each of the two is a single-partition range scan: no full-table scan and no relational JOIN.](../../assets/blog/dynamodb-access-patterns-gsi.svg)

## The honest tradeoffs

Three things you genuinely lose by leaving Postgres:

- **Ad-hoc analytical queries.** You cannot write `SELECT job_site_id, AVG(battery_pct) FROM device_telemetry GROUP BY job_site_id` against Dynamo. That's what the Firehose-to-S3-to-Athena path is for, and it adds a layer to your infra. For our team, that's been a worthwhile tradeoff; for a smaller team without a data engineer, it's friction.

![The transactional and analytical paths split cleanly. The fleet writes into a hot DynamoDB store that holds only the last N days and serves transactional reads in single-digit milliseconds. A TTL on each row expires it and deletes it from the hot store, so that store stays small and fast. In parallel, a DynamoDB Stream feeds Kinesis Firehose, which lands every row in S3 as Parquet — a cheap cold lake — and Athena runs SQL over that lake for analytical reads that take seconds to minutes. One write ends up with two lifetimes: fast and recent in Dynamo, cheap and permanent in S3.](../../assets/blog/dynamodb-hot-to-cold-archival.svg)
- **Joins.** Dynamo is the wrong store for relational lookups. Use Postgres for *the things that need joins* — your customer table, your device-to-customer mapping, your job sites — and keep Dynamo for the telemetry. Two stores, two purposes.
- **Pay-per-request can be more expensive at very high steady volumes.** If you're writing a billion rows a day and the load is predictable, provisioned-capacity Dynamo (or even moving to a purpose-built time-series store like Timestream) is cheaper. We're not at that scale yet; when we get there I'll revisit. For now, pay-per-request is the right shape for a starting team.

## When I'd reach for something other than Dynamo

Two cases:

- **You need sub-second analytical queries against months of data.** Dynamo + S3 + Athena does this but Athena queries take seconds-to-minutes. If you need OLAP latency, Timestream is purpose-built for this exact use case (Timestream LiveAnalytics now, with the recent rebrand). I'd evaluate Timestream first.
- **You're doing tight per-device aggregations server-side.** Greengrass on the device pre-aggregates so the cloud sees one summary row per minute instead of 60 raw rows. This is an edge-compute decision more than a database decision, but it changes the math on which store you need.

## The lesson, in one sentence

The Postgres urge is your team's *experience* talking, not their *judgment*. Listen to the urge, write down the volume and access patterns, and the urge usually retracts itself. The pattern that wins in IoT is partition-key + sort-key + TTL + stream-to-S3-for-analytics. Get that right and the relational urge dies on its own.

Next service we build, I expect the same engineer to suggest Postgres again. The argument is more pleasant now that I can hand them this.

## What's next

This post settles *where* telemetry lands. It says nothing about whether the telemetry that lands is any *good* — a corrupted SKU, a calibration that drifted, malformed JSON from a half-bricked device mid-update. A single-partition range scan over garbage is still fast, and still garbage. [Keeping the bad data out at ingestion](/blog/validating-iot-data-at-ingestion-three-patterns/) — and deciding whether the device even needs to know it sent garbage — is the next post.
