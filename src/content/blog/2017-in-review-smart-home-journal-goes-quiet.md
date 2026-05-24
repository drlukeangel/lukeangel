---
title: "2017 review — Home Assistant arrives, and the journal goes quiet"
date: 2017-12-28T16:00:00-05:00
category: tools
tags:
  - smart-home
  - home-assistant
  - year-in-review
  - forecast
notebook: smart-home-iot-journey
notebookOrder: 22
excerpt: "The year the house went local-first: Home Assistant replaced the cloud-tethered automation layer, and the SmartThings security rules moved onto hardware I own. 2016's forecast scored 70%. A heads-up for 2018 — the day job just became a connected medical device, and this journal is about to slow down."
pullquote: "Local-first isn't a philosophy until the day the cloud you depend on has an outage and your lights still work. 2017 was the year I stopped trusting someone else's servers to run my house."
---

End of 2017. The year the house quietly stopped depending on other people's servers.

## Scoring the 2016 forecast

| Prediction | Confidence | Outcome | Verdict |
|---|---|---|---|
| I move core automations off the SmartThings cloud | 70% | [Home Assistant install in July](/blog/first-home-assistant-install-yaml-configs/), [security rules migrated in October](/blog/migrating-smartthings-security-to-home-assistant/) | ✓ |
| HomeKit gets enough devices to be usable | 60% | Better, but [the MFi chip moat](/blog/homekit-and-the-mfi-chip-moat/) still thins the catalog | ✓ (partial) |
| A second voice assistant in the house | 65% | [Google Home landed in late 2016](/blog/google-home-two-voice-assistants-one-house/); 2017 was consolidation | ✓ |
| Zigbee + Z-Wave both off the starter hub | 40% | Still both on SmartThings — didn't get to it | ✗ |
| A cross-vendor automation that survives a vendor outage | 55% | Home Assistant makes this possible; not fully there yet | ✓ (partial) |

3/5 + 2 partials ≈ 70%. The big one landed: the automation brain is now a box in my closet, not a server in someone's data center.

## What changed in 2017

- **[Home Assistant](/blog/first-home-assistant-install-yaml-configs/)** (July). Running on a Raspberry Pi 3, YAML configs, local control of Hue + a handful of Z-Wave devices. The first time the house's logic lived entirely under my roof.
- **[Security automations migrated off SmartThings](/blog/migrating-smartthings-security-to-home-assistant/)** (October). Door/window sensors, presence, the arm/disarm logic — all now evaluated locally. SmartThings is still the Zigbee/Z-Wave radio, but it's no longer the decision-maker.

## What worked

- **The Pi survived a SmartThings cloud outage in November.** SmartThings went down for a few hours; the cloud-dependent automations across the smart-home world went with it. My door-open-to-light rules kept firing because they run locally now. That was the moment local-first stopped being a preference and became the architecture.
- **YAML is verbose but legible.** Six months in, I can still read my own automations. The config is version-controlled in git. This matters more than it sounds.

## What didn't

- **Zigbee and Z-Wave are still hostage to the SmartThings hub.** Home Assistant talks to them *through* SmartThings' cloud-then-local bridge, which defeats half the point. The radios need to come off that hub and onto coordinators I control. That's the 2018 project — if I get to it.
- **YAML automations are hitting a complexity ceiling.** The presence-based arming logic is now a 60-line nested template that I'm afraid to touch. There's a better tool for stateful flows; I haven't picked it yet.

## A note on cadence

This journal has run 3–4 posts a year since 2012. That's about to change. The day job just turned into building a **connected medical device** — BLE, a phone-gateway architecture, an FDA-shaped compliance surface, on a timeline that doesn't care about my hobby. For the next couple of years the house will keep evolving, but the writeups will be sparser. Fair warning.

The irony isn't lost on me: I'm about to spend two years professionally building the exact kind of connected-product platform I've been tinkering with at home. The lessons will cross-pollinate. Some of what I learn shipping a real device will show up in how I rebuild the house later.

## Forecast for 2018

| # | Prediction | Confidence |
|---|---|---|
| 1 | Zigbee comes off the SmartThings hub onto a dedicated coordinator | 60% |
| 2 | I move complex automations off YAML to a flow-based tool | 65% |
| 3 | The smart-home camera category gets consolidated by a big acquirer | 55% |
| 4 | MQTT becomes the house's internal message bus | 50% |
| 5 | Posts slow to ≤ 3 for the year (day job) | 80% |

## What's next

The Zigbee-off-the-hub project, if the day job allows. The automation-complexity problem needs a real answer. And the camera question — I've been avoiding cloud cameras on principle, and 2018 feels like the year that principle gets tested.

Five years of smart home documented. The house is finally mostly mine, server-side. Now to see how much I can keep building while the day job eats the calendar.
