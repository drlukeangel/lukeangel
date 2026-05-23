---
title: "2016 review — Google Home, HomeKit, Hue automation"
date: 2016-12-19T18:00:00-05:00
category: tools
tags:
  - smart-home
  - year-in-review
  - forecast
notebook: smart-home-iot-journey
notebookOrder: 19
excerpt: "Google Home shipped (predicted), Hue Motion shipped (predicted), Apple's HomeKit hub didn't (missed). 2015 forecast scored 88%."
pullquote: "Looking back at the 2015 forecast: 7/8 hit and the one miss was Apple's HomePod, which slipped. ~88% accurate. The pattern: Apple is always a year later than I predict."
---

2016 done. Time to grade and forecast.

## Scoring the 2015 forecast

Eight predictions for 2016. Let me grade:

| Prediction | Confidence | Outcome | Verdict |
|---|---|---|---|
| Google Home ships in 2016 | 75% | Launched Nov 4 | ✓ |
| Hue ships a motion sensor | 80% | Shipped August | ✓ |
| Apple HomeKit dedicated hub | 60% | Apple TV 4 (already had it); no dedicated speaker yet | ✗ |
| Zigbee 3.0 in real consumer products | 60% | A handful of certified devices; no critical mass | ✗ (partial) |
| Thread Group ships first products | 50% | Nest Protect 2nd gen (Thread-capable but uses WiFi mostly) | ✗ (partial) |
| Home Assistant becomes a thing I notice | 40% | Yes — I've been reading the docs; might install next year | ✓ |
| SmartThings cracks under cloud reliability | 55% | Two more major outages, but no mass exodus yet | ✗ (partial credit) |
| First useful PoE smart-home camera | 65% | Reolink RLC-410 launched; Amcrest IP4M; both under $80 | ✓ |

Counting partials as halves: **5.5/8 = 69%**. Worse than I want. The Apple miss is structural — Apple ships when Apple ships and I keep predicting on a calendar.

## What got added to the house this year

- **Google Home** (November). Now competing with Echo for kitchen real estate.
- **Hue Motion sensor x 2** (September). Hallway + basement stairs. Sub-200ms latency on motion-triggered lights, finally.
- **IKEA TRÅDFRI starter kit** (October). Tested as a Hue-bulb alternative. Cheaper ($15 vs $50 per bulb), Zigbee Light Link, joins the Hue bridge with a touchlink-and-reset dance. Color quality is meaningfully worse than Hue; sticking with Hue but TRÅDFRI bulbs are good for utility lighting (closets, basement).
- **Aeotec Z-Wave water leak sensor** (June). Basement next to the water heater. Hasn't fired yet (thankfully).
- **Reolink RLC-410 PoE camera** (December). Backyard. Need a separate post on this — it's the first camera I've gotten working with both my NVR and Google Home Hub display.

## What works at year-end

- **Voice-driven everything.** "OK Google, dim the kitchen" is now the default. Echo in the bedroom for music + timers. Two ecosystems, working.
- **Hue Motion + Hue Bridge** automations. Hallway light on under 200ms after motion. Basement stairs the same. Best UX upgrade of the year.
- **HomeKit for the Apple-only members of the family.** Three devices (Lutron, Ecobee, Hue) work flawlessly with Siri.
- **The first PoE camera.** Not in dashboard yet, but RTSP working into a Synology NAS for recording.

## What still doesn't

- **The multi-hub problem.** Three hubs now (SmartThings, Hue, Lutron). Each has its own devices. Cross-hub automations have to go through SmartThings (cloud-mediated) or HomeKit (limited devices). I'm running parallel systems.
- **Apple HomePod still vaporware.** Promised for 2016; pushed to 2017.
- **SmartThings cloud reliability.** Two more outages this year (one during Thanksgiving; the security automation was silent for six hours). Cloud-required custom SmartApps remain a structural weakness.
- **Camera-in-dashboard story.** Reolink works for recording. There's no clean way to view the live feed inside SmartThings or HomeKit. Each ecosystem has its own camera support and the Reolink isn't supported by either.

## Forecast for 2017

**1. I finally install Home Assistant on a Raspberry Pi. (Confidence: 90%)**

I've been reading the HA docs for six months. The community has grown enormously (the subreddit went from 5k to 50k+ this year). The Hass.io packaging that shipped in June makes installation a one-card flash. I'm going to install it Q1 2017. Whether it replaces SmartThings or runs alongside, TBD.

**2. Apple HomePod ships. (Confidence: 80%)**

Pushed from 2016. Apple basically has to ship in 2017 or the smart-speaker market is locked out for them. Expect a June (WWDC) announcement, fall release.

**3. SmartThings ships a v2 hub. (Confidence: 70%)**

Samsung's been quiet on the hub side since the acquisition. The current hardware is from 2012. A v2 with more local execution capability — bigger CPU, more RAM, potential for actually running custom SmartApps locally — would address the cloud-outage problem. Rumors say September.

**4. Aqara / Xiaomi Zigbee sensors enter the US market. (Confidence: 70%)**

Aqara's been popular in China — their door/window sensors are tiny (1/3 the size of SmartThings Multipurpose) and $10 each. They're Zigbee 3.0. If they get US distribution in 2017, they replace SmartThings sensors as the default cheap option.

**5. Matter / a unified protocol — still nothing. (Confidence: 10%)**

The CSA hasn't been heard from. Thread Group ships intermittent products. No unification on the horizon. Maybe 2019 or later.

**6. Amazon Echo Show / a screen-based Echo. (Confidence: 75%)**

Amazon's clearly moving toward video calling + camera integration. A device with a screen is the natural Echo expansion. Q2 2017.

**7. Google opens routines / scripting on Google Home. (Confidence: 60%)**

Google needs to catch up to Alexa Skills. They've announced an "Actions on Google" SDK; expect that to mature in 2017.

**8. Wink files for bankruptcy or pivot. (Confidence: 30%)**

Wink's been bleeding users since the 2015 cloud outages. If they don't sell to someone (Best Buy? Lowe's, who already has Iris?), they fold. 2017 might be the year.

## What I'm buying in 2017

- A Raspberry Pi 3 + microSD for Home Assistant.
- Two Aqara door sensors if/when they hit US (replacing the SmartThings Multipurpose sensors which are getting battery-old).
- HomePod if it launches and pricing isn't insane.
- A second PoE camera (front porch).
