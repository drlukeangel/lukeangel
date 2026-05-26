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
excerpt: "Google Home shipped (predicted), Hue Motion shipped (predicted), Apple's rumored smart speaker didn't (missed again). The 2015 forecast came in at a humbling 69% — and the year's real problem is still three hubs that won't talk to each other."
pullquote: "Grading the 2015 forecast honestly lands me at 69%, not the 88% I'd hoped — and the miss is the same one every year: Apple's rumored smart speaker that keeps not shipping. The pattern is that I forecast Apple on a calendar, and Apple ships when Apple ships."
cover: "../../assets/blog/2016-in-review-and-2017-forecast-cover.svg"
coverAlt: "Two smart speakers on a kitchen counter — a tall cylinder with a light ring and a shorter angled speaker with four status dots — each emitting voice-wave arcs toward the other but stopping short, a faint dashed gap between them. Two voice ecosystems sharing a house and not quite talking to each other."
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

![Grading the 2015 forecast: four clean green checks (Google Home ships, Hue ships a motion sensor, a first useful PoE camera, Home Assistant gets on my radar), three purple half-marks for partials (Zigbee 3.0 in real products, Thread ships first products, SmartThings cracks on reliability), and one red cross — Apple ships a dedicated HomeKit hub or speaker. A callout notes the miss is the same one every year: Apple's smart speaker slips again, because I keep forecasting Apple on a calendar. Tally: 5.5 of 8, about 69 percent counting partials as halves.](../../assets/blog/2016-forecast-scorecard.svg)

## What got added to the house this year

- **Google Home** (November). Now competing with Echo for kitchen real estate.
- **Hue Motion sensor x 2** (September). Hallway + basement stairs. Sub-200ms latency on motion-triggered lights, finally.
- **IKEA TRÅDFRI starter kit** (October). Tested as a Hue-bulb alternative. Cheaper ($15 vs $50 per bulb), Zigbee Light Link, joins the Hue bridge with a touchlink-and-reset dance. Color quality is meaningfully worse than Hue; sticking with Hue but TRÅDFRI bulbs are good for utility lighting (closets, basement).
- **Aeotec Z-Wave water leak sensor** (June). Basement next to the water heater. Hasn't fired yet (thankfully).
- **Reolink RLC-410 PoE camera** (December). Backyard. Need a separate post on this — it's the first camera I've gotten working with both my NVR and Google Home Hub display.

## What works at year-end

- **Voice-driven everything.** "OK Google, dim the kitchen" is now the default. Echo in the bedroom for music + timers. Two ecosystems, working.

![Two voice surfaces sharing one house at the end of 2016. On the left, an Echo cylinder with its light ring (Alexa, in the bedroom since 2014) drives its own slice — music, timers, Hue and SmartThings via their Alexa Skills. On the right, the newly arrived Google Home (kitchen, November 2016) drives "dim the kitchen," Hue and Chromecast, with no routines yet. Between them a red dashed gap labelled "don't share state": the two assistants each command their own slice of the house and nothing bridges them, because the rumored Siri speaker that might have hasn't shipped.](../../assets/blog/2016-in-review-and-2017-forecast-fig-3.svg)
- **Hue Motion + Hue Bridge** automations. Hallway light on under 200ms after motion. Basement stairs the same. Best UX upgrade of the year.
- **HomeKit for the Apple-only members of the family.** Three devices (Lutron, Ecobee, Hue) work flawlessly with Siri.
- **The first PoE camera.** Not in dashboard yet, but RTSP working into a Synology NAS for recording.

## What still doesn't

- **The multi-hub problem.** Three hubs now (SmartThings, Hue, Lutron). Each has its own devices. Cross-hub automations have to go through SmartThings (cloud-mediated) or HomeKit (limited devices). I'm running parallel systems.

![Three hub islands across the top — the SmartThings hub with its Z-Wave and Zigbee sensors, locks, and the security automation; the Hue Bridge with its Zigbee bulbs and motion sensors; and Lutron Caséta with its Clear Connect dimmers and switches. Below them, two awkward bridges: a red cloud labelled cross-hub-via-SmartThings-cloud that dies in an outage, and a HomeKit box that only carries the three MFi devices and leaves most of the house out. Dashed lines run from each hub down to whichever bridge can reach it. A caption notes every cross-hub automation rides the cloud or HomeKit, and each leaves something important out.](../../assets/blog/2016-multi-hub-problem.svg)
- **Apple's rumored smart speaker still vaporware.** The Siri-in-a-speaker device the rumor mill has been promising hasn't materialized; if it's coming, it's a 2017 story.
- **SmartThings cloud reliability.** Two more outages this year (one during Thanksgiving; the security automation was silent for six hours). Cloud-required custom SmartApps remain a structural weakness.
- **Camera-in-dashboard story.** Reolink works for recording. There's no clean way to view the live feed inside SmartThings or HomeKit. Each ecosystem has its own camera support and the Reolink isn't supported by either.

## Forecast for 2017

**1. I finally install Home Assistant on a Raspberry Pi. (Confidence: 90%)**

I've been reading the HA docs for six months. The community has grown enormously (the subreddit went from 5k to 50k+ this year). Installation is still a manual Python-venv-on-Raspbian affair today, but the project's clearly heading toward a flash-and-go image, and I'm going to set it up Q1 2017 either way. Whether it replaces SmartThings or runs alongside, TBD.

**2. Apple ships its rumored Siri speaker. (Confidence: 80%)**

The smart-speaker device the rumors keep describing has to land in 2017, or Apple cedes the kitchen to Amazon and Google entirely. My bet: a June (WWDC) announcement, fall release — and knowing Apple, an MFi-gated, HomeKit-only walled garden rather than anything that talks to my SmartThings devices.

**3. SmartThings finally makes the v2 hub run automations locally. (Confidence: 55%)**

The v2 hub shipped in 2015 with the *hardware* for local execution — more CPU and RAM than the 2012 original — and Samsung has barely used it. Almost everything still round-trips through the cloud, which is why a Thanksgiving outage left my security automation silent for six hours. The bet for 2017 is that Samsung ships a firmware update that actually runs a meaningful slice of automations on the hub itself. I'm only at 55% because they've sat on this capability for over a year already; the will, not the silicon, is the blocker.

**4. Aqara / Xiaomi Zigbee sensors enter the US market. (Confidence: 70%)**

Aqara's been popular in China — their door/window sensors are tiny (1/3 the size of SmartThings Multipurpose) and $10 each. They're Zigbee 3.0. If they get US distribution in 2017, they replace SmartThings sensors as the default cheap option.

**5. Matter / a unified protocol — still nothing. (Confidence: 10%)**

The Zigbee Alliance is busy certifying Zigbee 3.0, not bridging to anyone else. Thread Group ships intermittent products. AllSeen and the Open Connectivity Foundation each claim they're the unifier; neither has shipped a device I can buy. No real unification on the horizon. Maybe 2019 or later.

**6. Amazon Echo Show / a screen-based Echo. (Confidence: 75%)**

Amazon's clearly moving toward video calling + camera integration. A device with a screen is the natural Echo expansion. Q2 2017.

**7. Google opens routines / scripting on Google Home. (Confidence: 60%)**

Google needs to catch up to Alexa Skills. They've announced an "Actions on Google" SDK; expect that to mature in 2017.

**8. Wink files for bankruptcy or pivot. (Confidence: 30%)**

Wink's been bleeding users since the 2015 cloud outages. If they don't sell to someone (Best Buy? Lowe's, who already has Iris?), they fold. 2017 might be the year.

## What I'm buying in 2017

- A Raspberry Pi 3 + microSD for Home Assistant.
- Two Aqara door sensors if/when they hit US (replacing the SmartThings Multipurpose sensors which are getting battery-old).
- Apple's Siri speaker if it actually launches and the pricing isn't insane.
- A second PoE camera (front porch).
