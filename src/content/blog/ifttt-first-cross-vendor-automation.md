---
title: "IFTTT — first cross-vendor automation attempt"
date: 2013-09-08T16:00:00-04:00
category: tools
tags:
  - smart-home
  - ifttt
  - webhooks
  - integration
notebook: smart-home-iot-journey
notebookOrder: 6
excerpt: "IFTTT recipes connect Hue to Wemo to Gmail. The latency is bad, the reliability is patchy, but it's the first thing that's crossed vendor lines. Notes on what works and what doesn't."
pullquote: "5-15 second latency on a cross-vendor automation is the lower bound of 'I would not have noticed myself'. It is not the lower bound of 'good UX'."
cover: "../../assets/blog/ifttt-first-cross-vendor-automation-cover.svg"
coverAlt: "A trigger from one vendor's cloud routed up through IFTTT and back down to a second vendor's cloud and device — cross-vendor automation that works, but only by round-tripping the public internet."
---

IFTTT (If This Then That) launched in 2011 with Gmail as one of the original channels. They added channels for **Philips Hue** and **Belkin Wemo** this year — that's the cross-vendor unification I've been waiting for. A few months in — here's what I've built and what's broken.

## How IFTTT actually works

IFTTT runs as a web service. Each "channel" (a vendor integration) is implemented on IFTTT's servers using whatever API the vendor exposes:

- **Hue channel**: IFTTT registered as an OAuth client with Philips's Meethue cloud. When the user authorizes Hue → IFTTT, IFTTT gets a token to call the Meethue API on the user's behalf. Commands route through Philips cloud → bridge → bulbs.
- **Wemo channel**: IFTTT calls a Belkin cloud endpoint that mirrors the local SOAP API. Belkin's cloud holds a persistent connection to the plug.
- **Gmail channel**: IFTTT polls Gmail via IMAP for new messages matching a filter.

An IFTTT "Recipe" is a `{trigger, action}` pair:

```
TRIGGER: New email arriving in Gmail with label "package-delivered"
ACTION:  Hue → blink "Living Room" three times
```

When the trigger fires, IFTTT calls the action's API. End-to-end latency: poll Gmail (~1 min), match filter, dispatch action, action vendor's cloud, action vendor's bridge/cloud, action device. Total: 60-180 seconds for email triggers, 5-15 seconds for instant-trigger Recipes.

![The path of one cross-vendor recipe, drawn left to right with the latency accumulating at each hop. A trigger condition is detected by the trigger vendor's cloud (or polled from it), travels up to the IFTTT servers in the middle, which evaluate the recipe and dispatch the action down into the action vendor's cloud, which finally relays the command through its bridge to the device. A bracket under the whole chain marks the 5-15 second total, and a note points out that both the phone and the device are often on the same LAN milliseconds apart — yet every command takes the long way around through three clouds.](../../assets/blog/ifttt-cross-vendor-latency-path.svg)

## Three working Recipes

**1. Weather → porch light on at sunset (Hue)**

Replaces my Python cron job. IFTTT's "Weather" channel triggers at sunset for my zip code.

```
IF (Weather: Sunset for 02139)
THEN (Philips Hue: Turn "Porch" on, brightness 200, color "warm")
```

Latency: 1-3 minutes after actual sunset. Acceptable for a porch light.

**2. Weekday alarm time → Wemo coffee plug on**

There's no physical button I can wire into IFTTT yet — Hue has no switch accessory, and IFTTT has no "button" trigger — so the closest thing to "start the coffee on my way out of bed" is a time trigger. The Date & Time channel fires at a fixed weekday time and flips the Wemo coffee plug.

```
IF (Date & Time: Every day at 06:30 on weekdays)
THEN (WeMo Switch: Turn "Coffee Maker" on)
```

Latency: 5-15 seconds from the scheduled minute to the plug actually clicking. For a fixed-time trigger it doesn't matter — but it's a preview of why this won't work for anything I want to feel *instant*. A rigid clock is a poor substitute for "when I actually get up," and there's no way today to make that the trigger.

**3. iPhone geofence → multi-device "I'm home"**

iPhone GPS geofence (via IFTTT iOS app) → fan-out to Hue (3 bulbs) and Wemo (1 plug). Implementation: two separate Recipes because IFTTT doesn't support multi-action triggers yet.

```
Recipe A:
IF (iOS Location: Enter area "Home")
THEN (Philips Hue: Turn "Living Room" on, brightness 200)

Recipe B (same trigger, second action — IFTTT doesn't fan-out, so two Recipes):
IF (iOS Location: Enter area "Home")
THEN (WeMo Switch: Turn "Hallway Lamp" on)
```

Latency: 30-60 seconds for the geofence to fire, then 5-15 s per device. Total: a minute before the lights are actually on.

## What's broken

**Latency.** A 5-15 second delay is invisible on a sunset or a fixed-time trigger and intolerable on anything I'd want to feel immediate. The router-LAN ping to both endpoints is `< 5 ms`; IFTTT inserts 5-15 seconds of internet round-tripping on top. The day I want a *real* button — press, and the thing happens now — this architecture can't deliver it.

**Reliability.** IFTTT misses about 5-10% of triggers in my logs. The Hue trigger side is polled, not pushed — the cloud checks bridge state only every so often, so a fast-changing condition can slip through the gap and never fire. Wemo's cloud has nightly maintenance windows where Recipes silently no-op.

**No conditionals.** A 2013 Recipe is one trigger and one action. No `if it's already on, skip`. No `between sunset and 11 pm`. No `unless I'm not home`. Chaining Recipes is brittle and hard to debug.

**No native scene support.** I can turn one Hue bulb on through the Hue channel, but there's no action for "recall a Hue *scene*" — so a multi-bulb scene means one Recipe per bulb, and they fire raggedly one after another instead of snapping on together.

## What this tells me about the unifier

IFTTT works. IFTTT is **not** the unifier. The latency floor (5-15s cross-vendor) is too high for "real" smart-home use; it's fine only for time-based or location-based automations where seconds don't matter.

![A tolerance scale sorting automations by how much the 5-15 second cloud latency hurts. On the forgiving end: sunset and fixed-time triggers, and arriving-home geofences — all fine, because nobody is standing there waiting. In the middle, marginal: an "I'm home" lights fan-out, where a slow minute is noticeable but survivable. On the intolerable end: anything that should feel instant — a wall button, a motion-triggered light, a switch you press and expect to act now — where 5-15 seconds reads as broken. A caption draws the line: the cloud round-trip is acceptable only when no human is waiting on the result.](../../assets/blog/ifttt-latency-tolerance-scale.svg)

The real unifier needs to:

- **Run locally** (no cloud round-trip for cross-vendor commands).
- **Speak multiple protocols natively** (Zigbee, Z-Wave, WiFi — at minimum).
- **Allow conditional logic and scenes.**
- **Survive vendor cloud outages.**

That's a hub. SmartThings is the only thing shipping that close to this spec in 2013, and even they haven't shipped to the general public yet (Kickstarter backers got units this summer; retail availability is pending Samsung's acquisition).

I'll wait until next year.

## What's next

End-of-year wrap-up coming. Three vendors, three apps, one annoyed homeowner. Predicting how 2014 plays out.
