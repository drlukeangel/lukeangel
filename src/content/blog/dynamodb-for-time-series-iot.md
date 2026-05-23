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
coverAlt: "Cover graphic — DynamoDB for time-series IoT, when the relational urge is wrong. March 2024."
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

## Why DynamoDB fits the shape

DynamoDB's data model is *exactly* the shape of IoT telemetry, by accident:

- **Partition key = `device_id`**, **sort key = `event_ts`**. The most common query — recent events for one device — is a *single-partition range scan*, the fastest operation Dynamo does. It costs single-digit milliseconds at any table size.
- **Pay-per-request mode** matches the spiky-but-steady write pattern of a device fleet. You don't have to size provisioned capacity for peak; you don't have to autoscale based on guesswork.
- **TTL** is a first-class attribute. Set `expires_at` on every record; DynamoDB deletes them for you when the time comes. No cron job, no archival script.
- **Streams** are built in. When you eventually want analytics — and you eventually will — you turn on a stream and pipe it to Kinesis Firehose, which lands the data in S3 as Parquet, which Athena can query like a data lake. The transactional and analytical paths split cleanly.

## The shape, in twelve lines

```text
Table: device_telemetry
  Partition key: device_id (S)
  Sort key:      event_ts  (S — ISO 8601)
  TTL attribute: expires_at (N — epoch seconds)
  Billing:       PAY_PER_REQUEST
  GSI:           job_site_index (job_site_id, event_ts) — for site queries
  Streams:       NEW_IMAGE → Kinesis Firehose → S3 (Parquet) → Athena
```

That's it. Twelve lines that handle 144M writes a day without you thinking about indexes again.

## The honest tradeoffs

Three things you genuinely lose by leaving Postgres:

- **Ad-hoc analytical queries.** You cannot write `SELECT job_site_id, AVG(battery_pct) FROM device_telemetry GROUP BY job_site_id` against Dynamo. That's what the Firehose-to-S3-to-Athena path is for, and it adds a layer to your infra. For our team, that's been a worthwhile tradeoff; for a smaller team without a data engineer, it's friction.
- **Joins.** Dynamo is the wrong store for relational lookups. Use Postgres for *the things that need joins* — your customer table, your device-to-customer mapping, your job sites — and keep Dynamo for the telemetry. Two stores, two purposes.
- **Pay-per-request can be more expensive at very high steady volumes.** If you're writing a billion rows a day and the load is predictable, provisioned-capacity Dynamo (or even moving to a purpose-built time-series store like Timestream) is cheaper. We're not at that scale yet; when we get there I'll revisit. For now, pay-per-request is the right shape for a starting team.

## When I'd reach for something other than Dynamo

Two cases:

- **You need sub-second analytical queries against months of data.** Dynamo + S3 + Athena does this but Athena queries take seconds-to-minutes. If you need OLAP latency, Timestream is purpose-built for this exact use case (Timestream LiveAnalytics now, with the recent rebrand). I'd evaluate Timestream first.
- **You're doing tight per-device aggregations server-side.** Greengrass on the device pre-aggregates so the cloud sees one summary row per minute instead of 60 raw rows. This is an edge-compute decision more than a database decision, but it changes the math on which store you need.

## The lesson, in one sentence

The Postgres urge is your team's *experience* talking, not their *judgment*. Listen to the urge, write down the volume and access patterns, and the urge usually retracts itself. The pattern that wins in IoT is partition-key + sort-key + TTL + stream-to-S3-for-analytics. Get that right and the relational urge dies on its own.

Next service we build, I expect the same engineer to suggest Postgres again. The argument is more pleasant now that I can hand them this.
