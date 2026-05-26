---
title: How Instagram scales — what I learned from Mike Krieger's deck
date: 2016-09-26T05:08:29.000Z
category: tools
tags:
  - architecture
  - scaling
  - product
excerpt: Mike Krieger's deck on scaling Instagram is the single best resource I've found on the 'keep it boring until you absolutely can't' principle. Five things every architect should steal from it.
pullquote: Most architecture failures I've seen weren't because the team picked the wrong tool. They were because the team picked the *exciting* tool when boring would have worked.
cover: ../../assets/blog/scaling-instagram.png
coverAlt: Slide cover from Mike Krieger's "Scaling Instagram" talk at Airbnb
---

If you've never read [Mike Krieger's deck on scaling Instagram](https://www.scribd.com/doc/89025069/Mike-Krieger-Instagram-at-the-Airbnb-tech-talk-on-Scaling-Instagram), close this tab and go read it first. It's the single best resource I've found on **"keep it boring until you absolutely can't"** — a principle that's saved me from dozens of bad architecture calls.

![Slide cover from Mike Krieger's "Scaling Instagram" talk at Airbnb](../../assets/blog/scaling-instagram.png)

Krieger was Instagram's co-founder and the engineer behind the system that went from zero users to 27 million in 14 months on a *single engineer's* infrastructure decisions. The deck walks through what he picked, what he changed, and what he wishes he'd done differently. Below is what I took away on a re-read after building a few systems of my own.

## 1. Boring tools first

Instagram launched on **Django + PostgreSQL + Redis** — a 2010s stack that any junior engineer in the room could read. They didn't pre-optimize for Twitter-scale. They picked the tools that let them ship the product fastest, then *graduated* tools only as they actually hit walls.

PM read: **most architecture failures I've seen weren't because the team picked the wrong tool. They were because the team picked the *exciting* tool when boring would have worked.** Cassandra in week one. Kafka in week three. Microservices in month two. None of which were the bottleneck. All of which slowed the team down.

## 2. Vertical scaling first, horizontal scaling second

The deck walks through Instagram's progression: bigger boxes first, *then* sharding. Their early growth ran on a single Postgres instance with read replicas. They only started sharding when the vertical-scaling option ran out.

This is unfashionable advice. The default 2016 engineering conversation is "design for horizontal scale from day one." Krieger's deck is the receipts that **vertical first is cheaper, faster, and easier to debug** for the first 18-24 months of any product.

## 3. Cache aggressively, invalidate honestly

Memcached + Redis sat in front of nearly every query in the early Instagram stack. *Every* read path had a cache layer. **The hard part wasn't the caching.** The hard part was the cache invalidation — a discipline that Krieger talks about more than the caching itself.

This is the engineering bromide ("there are only two hard problems in computer science…") but the deck makes it concrete. A worth-borrowing pattern: every write path *explicitly* invalidates every relevant cache key. Not "wait for TTL to expire." Explicit invalidation, every time.

## 4. Observability before optimization

Instagram instrumented heavily from the early days — **StatsD, Munin, Pingdom**, custom dashboards. The principle: *if you can't see it, don't optimize it.* Optimization without measurement is just busywork in a hoodie.

PM read: this is the deeply unglamorous discipline that determines whether your engineering org makes good decisions or just *feels* like it's making good decisions. The team that knows their p99 latency by heart will outperform the team that knows their architectural diagram by heart. Every time.

## 5. Hire the right shape

A pattern Krieger calls out: Instagram's small team punched above its weight because of *what* they hired, not just *how many*. Generalist engineers who could ship across the stack, including ops. Not specialist-in-microservices, specialist-in-search, specialist-in-mobile. **Generalists at small scale ship; specialists at small scale wait.**

This is the part of the deck most easily ignored because it's a hiring call disguised as an architecture call. They're the same call.

## My key takeaway for new projects

The whole deck reinforces one habit that I keep coming back to: **build the boring thing first.** Optimize later. **Optimization is a tax you pay when the product is winning**; if you pay it up front, you go bankrupt before the product is even validated.

I see teams fall into the over-engineering trap most often when they're early-stage and *aspirational* — wanting to feel like they're a "real" engineering org. The real engineering orgs I've worked with are usually shipping ugly PHP, monolithic Django, or a Rails app that's far simpler than the consultant deck claims. Boring scales. Excitement doesn't.

## Gratitude beat

Big thank-you to Mike Krieger for posting that talk in the first place. The number of decks like that one that *don't* get posted publicly is the part the industry should worry about. Open-sourcing the *thinking* — not just the code — is the biggest accelerant we have.
