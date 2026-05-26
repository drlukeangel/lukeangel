---
title: "Keeping garbage out of the fleet — validating IoT data at ingestion, three ways"
date: 2024-07-16T11:00:00-04:00
category: tools
tags:
  - connected-products
  - aws-iot-core
  - mqtt
  - api-gateway
  - kafka
  - data-validation
notebook: connected-products
notebookOrder: 7
excerpt: "MQTT acks the moment the broker receives a message — so by the time your validation runs, the cart already thinks it succeeded. That gap between 'received' and 'actually good' decides your whole ingestion architecture. Three patterns, one question: does the device need to know it sent garbage?"
pullquote: "The error path is the part everyone skips. We wired a per-device reject topic and then nothing subscribed to it for six months. Garbage got dropped silently into a topic no one was watching — which is its own kind of garbage."
cover: "../../assets/blog/validating-iot-data-cover.svg"
coverAlt: "Incoming payloads passing through a validation gate — valid ones flow on to storage, an invalid one is dropped."
---

There's a detail about MQTT that quietly shapes your entire data architecture: **the broker acknowledges a message the moment it receives it.** The [cart publishes a `scan` event](/blog/prd-part-2-application-and-data/), AWS IoT Core acks it, the cart moves on and assumes everything went perfectly. Your validation logic hasn't even run yet.

But the payload might be garbage. A corrupted SKU from a flaky 2D imager. A weight-platform delta of 40,000 lbs because a calibration drifted. Malformed JSON from a half-bricked firmware mid-OTA. By the time anything checks, the device already believes it succeeded.

That gap — between "the broker received it" and "the data was actually good" — is where you make one decision that everything downstream inherits:

> **Does the device need to know it sent garbage?**

Answer that, and the pattern picks itself.

![One question picks the pattern: does the device need to know it sent garbage? No → the async filter (IoT Rule to Lambda, drop and dead-letter); yes, immediately → HTTPS with API Gateway returning a 400 in the same round trip; on Kafka or off-AWS → a Kafka-native broker routing rejects to a dead-letter topic.](../../assets/blog/validation-decision-tree.svg)

## Pattern 1 — the async filter (device stays dumb)

The default, and what I shipped for the cart fleet. Keeps the broker fast and the firmware simple.

```
cart → MQTT → AWS IoT Core → IoT Rule → Lambda
                                          ├─ valid?  → DynamoDB / Postgres
                                          └─ invalid → drop + log + publish to
                                                       devices/errors/<cart-id>
```

The IoT Rule routes every message to a Lambda. The Lambda validates the payload against a JSON schema (or a Glue schema). Valid messages get written to the [telemetry store](/blog/dynamodb-for-time-series-iot/); invalid ones get dropped and logged to CloudWatch and an error topic.

![Timeline of a single scan event. The cart publishes, then the broker ACKs almost immediately — at which point the cart moves on and assumes success. The Lambda only validates later, well after the ACK. A red bracket spans the gap between ACK and validation, labelled the device already believes it succeeded. At validation, the path forks: valid messages flow green to the telemetry store (DynamoDB or Postgres), invalid messages drop on a red path the device never learns about.](../../assets/blog/validating-iot-data-ack-gap.svg)

**The catch is structural:** the cart has no idea its data was rejected. It already got its ack. Unless you *explicitly* publish a message back to a per-device error topic — `devices/errors/<cart-id>` — and unless the firmware *subscribes* to it, the rejection is invisible to the device.

And here's the thing AWS docs won't tell you: **the error path is the part everyone skips.** We wired `devices/errors/<cart-id>`. Then nothing subscribed to it for six months. Garbage got dropped silently into a topic no one was watching. We only discovered a batch of carts had miscalibrated weight platforms when the [loss-prevention dashboard](/blog/iot-observability-in-cloudwatch/) started showing impossible weight deltas — the rejects had been piling up, unread, the whole time. The async filter doesn't free you from the error path. It just makes it easy to pretend you have one.

Pattern 1 is the right call when a dropped message is an *annoyance*, not a *safety event*. A dropped `scan` event becomes a flagged-for-review session. Nobody gets hurt; loss-prevention catches it later.

## Pattern 2 — HTTPS + API Gateway (device finds out instantly)

When the device *must* know immediately, you bypass MQTT for ingestion and use HTTPS.

```
cart → POST → API Gateway (native JSON schema validation, zero Lambda)
                ├─ valid   → forward to IoT Core / DynamoDB → 200 OK
                └─ invalid → 400 Bad Request, returned to the cart in the same round trip
```

API Gateway has built-in request validation against a JSON schema model — no Lambda required to reject a malformed body. Valid requests forward on; invalid ones get a `400` *synchronously*, in the same connection the cart is already holding open.

What you give up: MQTT's fire-and-forget efficiency, the [store-and-forward buffering](/blog/prd-part-2-application-and-data/) on connectivity loss, and the per-message cost advantage. HTTPS request/response is heavier per event than an MQTT publish.

You pay that cost when a bad payload is something the device can *act on* — retry with corrected data, surface an error to the user, halt and wait. The cart's `session-end` payment leg is the obvious case: a malformed checkout can't be silently dropped, because the customer is standing there with a cart full of groceries and a tapped card. That message gets the synchronous path. The 5,000 routine `health` pings a day do not.

## Pattern 3 — Kafka-native (at scale, or off-AWS)

If your backbone is Kafka instead of AWS IoT Core — because you already run it, or you want [the replay and multi-consumer story Kafka gives](/blog/netflix-deck-on-data-pipeline-with-kafka/) — you put a Kafka-native MQTT layer in front:

- **Zilla** (Aklivity) — open-source, multi-protocol, Kafka-native proxy. Handles MQTT connections (including over WebSocket and UDP/QUIC), maintains the state of millions of devices, and translates MQTT payloads straight into Kafka records.
- **Waterstream** — a Confluent-verified, Kafka-native MQTT broker. A thin layer where MQTT messages are written immediately as native Kafka records, and all MQTT state (subscriptions, retained messages) lives directly in Kafka topics.

Validation moves into stream processing: a consumer validates each record, routes good ones downstream, and sends bad ones to a dead-letter topic. Same "drop and log" shape as Pattern 1, but the dead-letter topic is a first-class Kafka topic you can replay, reprocess, and alert on — which makes the error path harder to forget than an MQTT topic nobody subscribed to.

## The decision table

| | Pattern 1: Async filter | Pattern 2: HTTPS webhook | Pattern 3: Kafka-native |
|---|---|---|---|
| Device learns of rejection | No (unless you wire it back) | Yes, instantly (`400`) | No (dead-letter topic) |
| Transport efficiency | Best (MQTT) | Worst (HTTP req/resp) | Best (MQTT) |
| Validation cost | Lambda per message | **Free** (API Gateway schema) | Stream consumer |
| Store-and-forward on dropout | Yes | No | Yes |
| Best for | High-volume routine telemetry | Payloads the device can act on | Kafka shops / replay needs |

## The regulated angle

My [first connected-product platform was a medical device](/notebooks/building-medical-iot-connected-products/), and it *could not* use Pattern 1. When the payload is a physiological reading or a dose confirmation, "drop it and log it to a topic" is not an acceptable failure mode — the device and the user have to know the data didn't land. Regulated devices force you toward Pattern 2, or toward Pattern 1 with a **mandatory, monitored, acknowledged** error path (the kind you can prove exists in an audit).

![Two worlds side by side, answering whether a dropped message is safe to lose. Left, the consumer cart fleet: a lost scan is a reviewable session, nobody gets hurt, so Pattern 1 is fine — the async filter drops and dead-letters, loss-prevention catches it later, routine telemetry takes the cheapest path. Right, regulated and payment: a dose confirmation, a physiological reading, or a checkout leg with the user standing right there, so Pattern 1 is not acceptable — you take Pattern 2 with an instant 400, or Pattern 1 plus a mandatory monitored acknowledgement, an error path you can prove in an audit.](../../assets/blog/validating-iot-data-regulated-fork.svg)

The consumer cart fleet had the luxury of Pattern 1 because a lost scan is a reviewable session, not a clinical event. Knowing *which* world you're in is the first thing the [identity-and-compliance work](/blog/prd-part-3-identity-and-compliance/) forces you to write down.

## What I'd tell past me

- **Decide the "does the device need to know?" question before you pick a transport**, not after. It's easier to start on HTTPS for the payloads that need it than to bolt synchronous feedback onto MQTT later.
- **If you choose Pattern 1, build the error path on day one and put a consumer on it.** A reject topic nobody reads is worse than no reject topic — it's the *illusion* of handling.
- **Alert on reject *rate*, not just reject events.** A slow climb in the reject rate is a fleet-wide firmware or calibration problem announcing itself early. We learned that the expensive way.
- **API Gateway's free schema validation is underused.** For the subset of payloads that genuinely need synchronous rejection, getting it with zero Lambda code is a real win.

## What's next

The reject rate is now a first-class metric on the [observability dashboard](/blog/iot-observability-in-cloudwatch/) — which is the next post: what good IoT observability actually looks like when you're watching a fleet instead of a server.
