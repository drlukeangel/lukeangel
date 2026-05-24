---
title: "2014 review — SmartThings + Alexa change everything"
date: 2014-12-30T17:00:00-05:00
category: tools
tags:
  - smart-home
  - year-in-review
  - forecast
notebook: smart-home-iot-journey
notebookOrder: 11
excerpt: "Big year. SmartThings + Samsung happened, Echo arrived, Lutron Caseta solved the no-neutral problem, HomeKit got announced."
pullquote: "Looking back at the 2013 forecast: hub-as-unifier (✓), Amazon voice (✓), HomeKit announcement (✓), Zigbee 3.0 (just-barely ✓). Net forecast accuracy: 83%."
cover: "../../assets/blog/2014-in-review-and-2015-forecast-cover.png"
coverAlt: "2014 review — SmartThings + Alexa change everything"
---

Bigger year than I expected. 2014 was when the smart-home tooling caught up to what I needed.

## Scoring the 2013 forecast

Six predictions for 2014. Let's grade:

| Prediction | Confidence | Outcome | Verdict |
|---|---|---|---|
| Hub becomes the unifier (SmartThings) | 90% | SmartThings v2 shipped at retail Aug 2014 | ✓ |
| Amazon ships a voice assistant | 80% | Echo launched Nov 6 (Prime invite); GA expected mid-2015 | ✓ |
| Apple gets serious about smart home | 70% | HomeKit announced WWDC June 2014; first devices Q1 2015 | ✓ (partial — no devices yet) |
| Google answers Apple in 2014 | 50% | Nest acquired Jan 2014, no voice product yet | ✗ |
| Zigbee 3.0 lands | 60% | Spec finalized Q4 2014, devices coming 2015 | ✓ (just barely) |
| Voice becomes table-stakes | 95% | Alexa shipped with Hue working; SmartThings + Wemo skills coming early 2015 | ✓ |

Five out of six. The miss was Google's voice product. Net forecast accuracy: ~**83%**. Suspiciously high — partly because 2014 was a predictable year. 2015 will be the one that actually tests forecasting skill.

## What got added to the house this year

- **2 wall switches** (Lutron Caseta in-wall dimmers + Smart Bridge): March.
- **5 more Hue bulbs** (now 10 total): scattered.
- **SmartThings hub + Home Monitoring Kit** (2 door/window sensors, 1 motion, 1 presence, 1 outlet): August — Samsung acquisition closed two weeks earlier.
- **Amazon Echo**: November.

Vendors brought in: 2 new (Lutron, SmartThings/Samsung). Apps on phone for the smart home: now 4 (Hue, Wemo, Lutron, SmartThings) plus Alexa for voice.

App count: still going in the wrong direction. But each layer is doing different work now: Hue for lighting protocol, Lutron for in-wall, SmartThings for cross-protocol automation, Alexa for ad-hoc voice.

## What works at year-end

- **Voice for lights.** "Alexa, dim the kitchen to 30." Used daily.
- **Door/window + presence on SmartThings.** First security automations being prototyped — full post coming March 2015.
- **Lutron switches.** Reliable. Fast. Untouchable.
- **Hue still the lighting backbone.** All bulbs on Hue. Switches command Hue via SmartThings integration (cloud-mediated, 2-3 s latency).

## What doesn't

- **Wemo plugs** are increasingly the weak link. WiFi drops, slow Alexa response via Belkin cloud (5-7 s), no good way to migrate the data off. Replacement candidates: Z-Wave plugs (Aeotec, GE) in 2015.
- **HomeKit** isn't real yet — announced, no devices on shelves.
- **Multi-room voice** isn't a thing. One Echo, one location.

## Forecast for 2015

Predictions in order of confidence:

**1. Alexa Skills Kit launches; ASK ecosystem explodes. (Confidence: 95%)**

Amazon publishes the SDK in Q1 or Q2. By Q4 there are 1000+ Skills. Every smart-home vendor publishes one. Latency for voice → action improves as direct integrations replace cloud-to-cloud routing.

**2. HomeKit ships, with a hardware-security tax. (Confidence: 85%)**

Apple's MFi chip requirement keeps cheap vendors out. Ecosystem is small but high-quality at launch. I'll try it, find the walled garden tolerable for the Apple house, and probably bounce when it doesn't speak to the SmartThings stuff I already have.

**3. Google ships a voice assistant — but not in a home device. (Confidence: 60%)**

Google's voice lands first in Android Wear / Auto / Assistant-on-phones. A Google Home device is more likely 2016.

**4. The hub-or-cloud divide cements. (Confidence: 80%)**

SmartThings (hub-based, partly local) vs Wink (cloud-only) is the architectural split. Wink struggles as outages happen; SmartThings's hub model is vindicated.

**5. The first wave of dedicated security-arc posts. (Confidence: 100%)**

I'm building a real home-security system this year — door + window + presence + motion sensors with SMS notifications + the SmartThings Smart Home Monitor. Expect 4-6 security-tagged posts. The arc starts March 2015.

**6. A unifying multi-vendor standard? (Confidence: 5%)**

The Thread Group (formed July 2014, Nest + Samsung + ARM + others) is rumored to be working on a 6LoWPAN-based standard. It's three years too early to ship. Not happening in 2015.

**7. The Zigbee deep-dive primer I owe everyone. (Confidence: 100%)**

A year with Zigbee on Hue and now on SmartThings's Zigbee HA radio gives me enough to write the proper Zigbee primer in mid-2015.

**8. Multisensors land. (Confidence: 80%)**

Aeotec's Multisensor 6 (motion + temp + humidity + light + UV + vibration in one Z-Wave device) is launching Q2 2015. I'll buy one. Humidity-triggered bathroom fans become a thing in my house in late 2015.

## What I'm buying in 2015

- Z-Wave window/door sensors (to scale beyond the SmartThings kit's two): ~6 sensors.
- Aeotec Multisensor 6 (motion + temp + humidity + light): 2 of them.
- A Z-Wave water leak sensor for the basement.
- A second Echo for the bedroom.
- Maybe — *maybe* — an Apple TV 4 once HomeKit devices ship, to try it as a HomeKit hub.

## What's next

First real security automation post — door/window + presence combo on SmartThings — coming March 2015. The home-security arc starts there.
