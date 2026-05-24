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
cover: "../../assets/blog/ifttt-first-cross-vendor-automation-cover.png"
coverAlt: "IFTTT — first cross-vendor automation attempt"
---

IFTTT (If This Then That) launched in 2010 with Gmail as one of the original channels. They added channels for **Philips Hue** in July and **Belkin Wemo** earlier this year — that's the cross-vendor unification I've been waiting for. Three months in — here's what I've built and what's broken.

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

## Three working Recipes

**1. Weather → porch light on at sunset (Hue)**

Replaces my Python cron job. IFTTT's "Weather" channel triggers at sunset for my zip code.

```
IF (Weather: Sunset for 02139)
THEN (Philips Hue: Turn "Porch" on, brightness 200, color "warm")
```

Latency: 1-3 minutes after actual sunset. Acceptable for a porch light.

**2. Hue Tap button → Wemo coffee plug on**

Hue Tap is a battery-free Zigbee button (kinetic-harvested — pressing the button generates the energy to send the Zigbee command). I use it as a wireless coffee-trigger by the bedroom door.

```
IF (Philips Hue: Hue Tap "Living Room Switch" button 1 pressed)
THEN (WeMo Switch: Turn "Coffee Maker" on)
```

Latency: 5-15 seconds. Press button, walk to bathroom, hear the coffee maker click on. The latency is the problem.

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

**Latency.** A 10-second delay between button press and action is unacceptable for a coffee-maker use case. The router-LAN ping for both endpoints is `< 5 ms`; IFTTT introduces 5-15 seconds of internet round-tripping. UX is "did the button work? Maybe? I'll wait..."

**Reliability.** IFTTT misses about 5-10% of triggers in my logs. Hue Tap presses sometimes don't make it to the cloud (the bridge polls only every couple of seconds for state changes; if the polling window misses the tap, the trigger never fires). Wemo's cloud has nightly maintenance windows where Recipes silently no-op.

**No conditionals.** A 2013 Recipe is one trigger and one action. No `if it's already on, skip`. No `between sunset and 11 pm`. No `unless I'm not home`. Chaining Recipes is brittle and hard to debug.

**No native scene support.** I can turn one Hue bulb on, but turning on a Hue scene needs a workaround via the Maker channel.

## What this tells me about the unifier

IFTTT works. IFTTT is **not** the unifier. The latency floor (5-15s cross-vendor) is too high for "real" smart-home use; it's fine only for time-based or location-based automations where seconds don't matter.

The real unifier needs to:

- **Run locally** (no cloud round-trip for cross-vendor commands).
- **Speak multiple protocols natively** (Zigbee, Z-Wave, WiFi — at minimum).
- **Allow conditional logic and scenes.**
- **Survive vendor cloud outages.**

That's a hub. SmartThings is the only thing shipping that close to this spec in 2013, and even they haven't shipped to the general public yet (Kickstarter backers got units this summer; retail availability is pending Samsung's acquisition).

I'll wait until next year.

## What's next

End-of-year wrap-up coming. Three vendors, three apps, one annoyed homeowner. Predicting how 2014 plays out.
