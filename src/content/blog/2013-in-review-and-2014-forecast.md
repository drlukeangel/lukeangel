---
title: "2013 review — three vendors, one annoyed homeowner"
date: 2013-12-29T17:00:00-05:00
category: tools
tags:
  - smart-home
  - year-in-review
  - forecast
notebook: smart-home-iot-journey
notebookOrder: 7
excerpt: "Year-end check-in. Hue is solid, Wemo is fine, IFTTT is duct tape. Forecast: 2014 is the year of the hub. Samsung just acquired SmartThings; Amazon is rumored to ship Echo; Apple's HomeKit is real."
pullquote: "Voice control is the inflection point. Whoever wins voice in 2014 owns the smart-home conversation for the next decade."
cover: "../../assets/blog/2013-in-review-and-2014-forecast-cover.png"
coverAlt: "2013 review — three vendors, one annoyed homeowner"
---

End of year — time to take stock. The kit is in three buckets:

**Hue (Philips, 5 bulbs now):**
Zigbee + bridge + local REST + cloud-optional. Reliable, fast, expensive. Best-in-class. No complaints.

**Wemo (Belkin, 2 plugs + 1 motion sensor I added in October):**
WiFi + cloud-required for off-LAN + SOAP/UPnP locally. Works most of the time. Drops off WiFi monthly. The motion sensor's PIR is too aggressive — false positives every time the heater kicks on near it.

**IFTTT (cross-vendor):**
Web-only, 5-15 s latency, cross-vendor unifier of last resort. Cheap. Slow. Acceptable for time-and-location triggers; unacceptable for instant-feedback automations.

## What worked this year

- **Hue + Hue Tap** as a self-contained lighting system. Zero latency between button press and bulb change (both on Zigbee, both at the bridge). Battery-free Tap is engineering art.
- **Sunset porch automation.** Started as a Python cron, moved to IFTTT. Still works.
- **Power telemetry from the Wemo Insight.** Useful for "did I leave the iron on" anxiety queries.

## What didn't

- **Multi-vendor app sprawl.** Three apps for one house. The motion-triggers-Hue Recipe through IFTTT misses 1 trigger in 10. Unacceptable for security-class automations (still ahead of me).
- **WiFi reliability on cheap devices.** Wemo's WiFi stack is a known-bad data point — and I expect the same from every $30 WiFi smart plug landing in 2014.
- **No conditionals.** "Porch light at sunset, but only if I'm home" is impossible in IFTTT today.

## Forecast for 2014

Predictions in approximate order of confidence:

**1. The hub becomes the unifier. (Confidence: 90%)**

SmartThings (the Kickstarter-funded startup) shipped to backers this summer. Retail launch is rumored for 2014 — possibly Q2 or Q3. Dual-radio (Z-Wave + Zigbee) plus a Groovy SmartApps platform; if they ship to general retail, this is the first credible local-running multi-protocol hub.

**2. Amazon ships a voice assistant. (Confidence: 80%)**

The rumors of "Amazon Doppler" (voice-activated speaker) have been growing all year. Bezos has been talking publicly about voice. End of 2014 I expect something on shelves.

**3. Apple gets serious about smart home — announcement, not necessarily shipping. (Confidence: 70%)**

WWDC 2014 (June) is when Apple's smart-home play emerges. Rumored branding: "HomeKit." Will require an MFi (Made for iPhone) authentication chip — meaning vendors must add a $1-2 BOM line item to ship "Works with Apple Home." Apple's play is security-first and walled-garden. Expect announcement at WWDC; first devices Q4 or 2015.

**4. Google moves on smart home — acquisition or build. (Confidence: 60%)**

Google needs a smart-home strategy. The Motorola Mobility purchase hasn't taken them where they hoped. Whether they buy their way in (Nest is the obvious target — Tony Fadell's design DNA, complementary to Android — but Honeywell and Lowe's would also make sense) or build organically off Android, I expect a move in 2014. A consumer-device voice assistant from Google probably doesn't ship until 2015 or later — they're well behind Amazon on voice.

**5. Zigbee 3.0 lands and partially unifies the Zigbee profiles. (Confidence: 60%)**

ZLL (lighting) and HA (home automation) are different profiles today; a device built for one isn't guaranteed to interop with the other. Zigbee 3.0 is supposed to merge them. Spec is in late draft; ratification mid-2014.

**6. The "I want to talk to my house" use case becomes table-stakes. (Confidence: 95%)**

If Amazon ships voice, the next 18 months are about getting every smart-home device working with that voice surface. Hue is positioned for this — local REST + Meethue cloud both work. Wemo will scramble. SmartThings will be the integration layer between voice and not-voice devices.

## Net commitments for 2014

What I'll buy:

- SmartThings hub when it ships at retail. Migrate the Wemo automations off IFTTT.
- A few Z-Wave door/window sensors (the SmartThings starter kit comes with two).
- Whatever Amazon ships if the device is real (predicting late 2014).
- A Lutron Smart Bridge for in-wall switches (separate post coming in March).

What I won't buy:

- More WiFi-only plugs without a local API.
- HomeKit-exclusive devices in 2014 — waiting to see what the MFi tax does to BOM and to see if devices actually ship.

## What's next

Next post (March 2014): the first wall-switch attempt. Wemo failed. Lutron Caseta won. There's a story about no-neutral wiring in there.
