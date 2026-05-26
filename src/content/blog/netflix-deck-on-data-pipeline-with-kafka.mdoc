---
title: What I stole from Netflix's Kafka data pipeline deck
date: 2016-05-26T05:10:54.000Z
category: tools
tags:
  - architecture
  - netflix
  - kafka
  - scaling
  - product
excerpt: Netflix posted a deck on their Kafka-based data pipeline in 2016 and I haven't stopped pointing at it. Four ideas every PM and engineer should steal.
pullquote: 'You don''t need Netflix''s scale to use Netflix''s architecture. You just need to want the same things Netflix wanted: decoupling, replay, and one source of truth.'
cover: "../../assets/blog/netflix-deck-on-data-pipeline-with-kafka-cover.png"
coverAlt: "What I stole from Netflix's Kafka data pipeline deck"
---

A long time ago — by tech standards, anyway; it was 2016 — Netflix posted [a SlideShare deck](https://www.slideshare.net/wangxia5/netflix-kafka) walking through their event-based data pipeline built on Apache Kafka. The deck is dated. **The architecture is not.** I keep pointing at it in roadmap reviews ten years later because the ideas underneath are independent of the year.

If you've never opened it, the punchline is: Netflix treats every user action — *play*, *pause*, *seek*, *rate*, *thumbs-up*, *abandoned-session* — as an **event written to a single durable bus**. Every downstream system (recommendations, billing, analytics, ML training, ops dashboards) is a *consumer* of that bus rather than a system that has to query Netflix's transactional databases directly.

![Netflix's event bus architecture — three producer services (playback, ratings, session) emit events to a central Kafka topic; four consumer services (recommendations, analytics, ML, billing) subscribe; events are immutable and replayable](../../assets/blog/netflix-kafka-event-bus-architecture-2016.svg)

The deck is the deck. Read it. But here are the four ideas worth stealing if you're building anything at any scale.

## 1. Decouple producers from consumers

Before the event bus: every new dashboard requires a new query against the production database. Every new recommendation model competes with billing for the same DB resources. Adding a feature means **negotiating contention** in a system that was never designed to be queried by ten teams.

After the event bus: the producer (the playback service, say) emits a `playback_started` event. Whoever wants to know about it — *recommendations, analytics, ops* — subscribes. Nobody hits the playback DB to find out what users are watching.

**PM translation:** decoupling is what lets twelve teams ship without coordinating with each other. If your teams are constantly running into "we can't ship this until the data team gives us access" — your producer/consumer wall is not strong enough.

## 2. Treat events as the source of truth

The trick Netflix made look easy: **the event log is the authoritative record of what happened.** Not the database row that got UPDATEd after the event. Not the analytics warehouse row that was loaded from the database. *The event.*

This sounds like architecture pedantry until the day a downstream system gets it wrong. Then you ask: *what actually happened at 4:17pm on Tuesday?* And the answer is "scroll back through the event bus, replay the events through the corrected logic, ship the fix." You couldn't do that against a mutable DB. **You can do that against an immutable log.**

The PM read: every data pipeline you build will be wrong at some point, and the difference between a small recovery and a small career-limiting recovery is whether your data is *replayable*. Events on a bus are replayable. State in a DB is not.

![Kafka partitions and replay diagram — a topic split across three partitions for parallel consumers; events are ordered within each partition; consumers can start reading at any offset, including replaying the full log from offset 0 to backfill a new dashboard or fix a downstream bug](../../assets/blog/netflix-kafka-partitions-replay-2016.svg)

## 3. Build the pipeline before you need the pipeline

The most expensive moment in any data architecture is the moment you realize you need a pipeline you don't have. The cheapest moment is the one where you decided to emit the events anyway, "just in case."

Netflix's deck makes this point implicitly: by the time the recommendations team needed playback data, **the playback events were already on the bus**. They weren't waiting on a quarter-long migration. They were waiting on a SQL query.

PM lesson: when you ship a new feature, ship the events *too*. Even if you don't have a downstream consumer for them yet. The day you need them, you'll have six months of history sitting there. Future-you will write you a thank-you note.

## 4. Make the pipeline boring on purpose

The genuinely impressive thing about Netflix's setup, in retrospect, is **how unsurprising the moving parts are.** Kafka. Schema registry. Stream processors. Standard warehouse on the back end. They didn't invent a new database. They didn't build a custom message bus. They picked boring, well-understood pieces and *composed* them.

Most failed data platforms I've seen failed because somebody picked the exciting new tool. Most successful ones I've seen succeeded because somebody picked the boring tool and *stayed disciplined about the contract* — schemas, retention, partition keys, the unsexy stuff.

**Pick boring tools. Be disciplined about the contract. Skip the conference-talk-bait.**

## You don't need Netflix's scale to use Netflix's architecture

The thing the deck *doesn't* say — but is implied if you've worked with these systems — is that **none of this requires Netflix-scale traffic.** A 50-person startup with a Kafka topic and three consumers gets most of the leverage on day one. Replayability. Decoupling. A source of truth. Cheap insurance against the inevitable schema fight.

If you're building anything that emits user behavior — and you almost certainly are — the question isn't "do we need Kafka." It's "do we want the option to ask new questions of our own data three months from now without rewriting the pipeline." If yes, build the bus.

Gratitude beat: thanks to the Netflix engineers who put that deck up publicly. Half the data architecture I've shipped in my career is downstream of decks like that one. Open-sourcing your *thinking* is a gift the industry doesn't say thanks for often enough.
