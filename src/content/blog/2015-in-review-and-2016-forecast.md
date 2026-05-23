---
title: "2015 review — voice + HomeKit land. Security starts"
date: 2015-12-22T18:00:00-05:00
category: tools
tags:
  - smart-home
  - year-in-review
  - forecast
notebook: smart-home-iot-journey
notebookOrder: 15
excerpt: "Echo went GA, Alexa Skills Kit shipped, HomeKit got real with iOS 9, first piece of a security system built."
pullquote: "Looking back at the 2014 forecast: 5/7 hit, 2 missed. ~71% accurate. Worse than 2013's 83% — partly because I was more confident this year, partly because Apple and Google moved at different speeds than I predicted."
---

End of year. Time to grade 2014's forecast and place bets for 2016.

## Scoring the 2014 forecast

Seven predictions for 2015. Let me grade:

| Prediction | Confidence | Outcome | Verdict |
|---|---|---|---|
| Alexa Skills Kit launches; ASK explodes | 95% | ASK released June; 1,000+ skills by Q4 | ✓ |
| HomeKit ships with hardware-security tax | 85% | iOS 9 (Sept) plus a handful of MFi devices (Lutron, Ecobee, August) | ✓ |
| Google ships voice — but not in home device | 60% | Google Now improvements, no home device | ✓ |
| Hub-or-cloud divide cements | 80% | Wink had two major outages; SmartThings cloud also wobbled. Hub model not vindicated *yet* | ✗ (both shaky) |
| First wave of security-arc posts | 100% | [March 2015 first security automation](/blog/first-security-automation-door-presence-smartthings/) shipped | ✓ |
| Unifying multi-vendor standard? | 5% | Nothing | ✓ (the "no" prediction held) |
| Aeotec Multisensor 6 launches Q2 2015 | 80% | Shipped October, not Q2 — half-credit | ½ |

5/7 hit, 1 missed, 1 half. **~71% accurate.** Worse than 2013's 83%. Two reasons: bolder forecasts, and Apple/Google moved at different speeds than I predicted.

## What got added to the house this year

- **Apple TV 4** (October): bought it expecting HomeKit hub functionality. Works. The HomeKit ecosystem in 2015 is small but high-quality.
- **Three more Lutron Caseta switches** (March, June, September): no-neutral problem solved everywhere.
- **One LIFX A19 bulb** (April): WiFi-only color bulb. Bright but the always-on tax is real — runs warm, draws ~1W constant. Comparing it side-by-side with Hue this winter.
- **Two Aeotec Multisensor 6** (October): six sensors in one. Humidity-fan automation works.
- **An Ecobee3 thermostat** (November): HomeKit-compatible, has its own remote sensors for room-by-room temp control.
- **Hue v2 bridge** (June): replaces the original round bridge with a square one that adds HomeKit support.
- **Second Echo** (July): bedroom. Two Echoes in the house works *if* you put them far enough apart (~10 m) that one always wins the wake-word arbitration.

## What works at year-end

- **Security automation** running for nine months. False-alarm rate dropped from 1/week to roughly 1/month after switching to phone-based geofencing.
- **Voice as the default control surface.** "Alexa, dim the dining room to 30" gets used four times a day. I haven't opened the Hue app in a month.
- **HomeKit for the iPhone family members.** My wife uses Siri on her iPhone to control HomeKit-enabled devices (Lutron, Ecobee). Latency 1-2s, reliable.
- **Bathroom humidity → fan.** Saves the bathroom paint. Quietly the best automation in the house.

## What still doesn't

- **SmartThings cloud reliability.** Two major outages this year (one a four-hour Friday-evening outage). When the cloud dies, custom SmartApps die. My security automation goes silent. I need local execution and I don't have it.
- **HomeKit's walled garden.** Lutron + Ecobee + Hue work great with Siri; nothing else in my house does. The MFi tax keeps the Z-Wave and Zigbee-HA-only world out of HomeKit. I'm running two parallel automation systems.
- **LIFX vs Hue, by year-end.** Hue won. LIFX bulbs run hot, drop off WiFi about once a week, and the colors are slightly less accurate than Hue. The WiFi-only approach isn't winning on my network.

## Forecast for 2016

**1. Google Home ships in 2016. (Confidence: 75%)**

Google's been quiet on home devices but they have to respond to Echo. Late 2016 — Q3 or Q4 launch is plausible. Expect a smaller, music-first form factor.

**2. Hue ships a motion sensor. (Confidence: 80%)**

The Hue app's automation is anemic next to SmartThings. Hue's own motion sensor (battery-powered, Zigbee, designed-for-Hue-bulbs) would be the natural next product. Rumors are it's coming.

**3. Apple HomeKit gets a dedicated hub. (Confidence: 60%)**

Apple TV is the de facto HomeKit hub today. A dedicated, smaller device would make more sense — and the rumored AppleHome smart speaker (Apple's answer to Echo) might be it. 2016 is when Apple needs to ship that.

**4. Zigbee 3.0 starts shipping in real consumer products. (Confidence: 60%)**

The spec was ratified late 2014. The first 3.0-certified products should appear in 2016 — hopefully unifying HA and ZLL profiles, which would let Hue and SmartThings finally see each other natively without bridging.

**5. The Thread Group ships first products. (Confidence: 50%)**

Thread protocol announced 2014, devices have been "coming" for 18 months. Nest's next thermostat is rumored to ship Thread. 2016 is the year or it's vapor.

**6. Home Assistant becomes a thing I notice. (Confidence: 40%)**

There's a Python project called Home Assistant that some hobbyists are talking about. Local-only, YAML config, integrates with Hue, SmartThings, and a growing list of others. If it gets to 0.30 or so by mid-2016 with a sane UI, I might try it. The local-execution gap on SmartThings is the trigger.

**7. SmartThings cracks under cloud reliability issues. (Confidence: 55%)**

Two major outages this year. If they have three more in 2016, the community starts seriously looking for alternatives. Wink already lost a year's worth of users to cloud outages. SmartThings can absolutely follow.

**8. The first useful PoE smart-home camera. (Confidence: 65%)**

WiFi cameras are unreliable on a saturated 2.4 GHz network. PoE cameras (Reolink, Amcrest, Ubiquiti) at the prosumer level should drop in price in 2016. Once they do, smart-home folks will start adopting them with NVRs.

## What I'm buying in 2016

- **Hue Motion sensor** (whenever it ships).
- **Google Home** (whenever it ships).
- **A Reolink PoE camera or two** if prices drop below $80.
- **Maybe a Home Assistant install on a Raspberry Pi** as a sandbox.

## What's next

Next post: HomeKit + the MFi chip moat, expected in June (the [Lutron Caseta integration](/blog/light-switches-wemo-failed-lutron-won-no-neutral-nightmare/) was my first HomeKit-enabled device).
