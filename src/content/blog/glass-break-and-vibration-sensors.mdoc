---
title: "Glass-break and vibration sensors — the second-layer security"
date: 2019-08-19T15:00:00-04:00
category: tools
tags:
  - smart-home
  - smart-home-security
  - zwave
  - zigbee
  - sensors
notebook: smart-home-iot-journey
notebookOrder: 27
excerpt: "Two Ecolink Z-Wave glass-break detectors plus six Aqara vibration sensors. The first sensor class that catches what contact sensors miss."
pullquote: "Door sensors catch the opening. Glass-break sensors catch the breaking. The second one matters because the first one assumes the intruder walks in like a guest."
cover: "../../assets/blog/glass-break-and-vibration-sensors-cover.svg"
coverAlt: "A house cross-section showing two sensing layers — a contact sensor on a door frame catching the opening, and a glass-break detector plus window-mounted vibration sensors catching the breaking the contact sensor misses."
---

Every contact sensor in my house answers exactly one question: *is this door or window open right now?* That's a reed switch and a magnet — a circuit that breaks when the gap exceeds a centimeter or so. It's a good, cheap question to answer, and for two years it was the whole of my perimeter. But it has a blind spot, and the blind spot is the one that matters: a reed switch assumes the intruder walks in like a guest, through an opening, the polite way.

A real residential break-in often doesn't bother with the opening:

- Break the kitchen sliding glass door — the contact sensor on the frame doesn't fire, because the door is still "closed" structurally, just shattered.
- Cut the screen on a window the contact sensor isn't even on.
- Pry a basement window open from outside, slow and quiet.

So I added the first sensor class that catches what the reed switch can't: two **Ecolink Z-Wave glass-break detectors** (GBHA1-ECO) and six **Aqara DJT11LM vibration sensors**. Two different physical signals, two different jobs.

- **Glass-break detectors** — acoustic sensors tuned to the frequency signature of breaking glass.
- **Vibration sensors** — accelerometers stuck to windows and doors that feel the impact before the glass gives.

![Cross-section diagram of a window. A reed-switch contact sensor sits on the frame and only registers the sash being slid open; a glass-break detector mounted nearby listens for the acoustic signature of shattering, and a vibration sensor stuck to the pane senses the impact directly — covering the two failure modes the contact sensor cannot detect.](../../assets/blog/glass-break-sensing-layers.svg)

## Ecolink GBHA1-ECO — glass-break detection

**Hardware:**
- Z-Wave Plus, AA battery (5-year claimed life).
- Acoustic + air-pressure sensing. The combination matters: it has to hear the *thwack* of impact AND the *crash* of falling glass; one without the other is a false positive (e.g., dropping a metal pot).
- Range: 25 feet (7.6 m) coverage radius from the sensor.
- $45 each.

I placed two:
1. **Living room** — covers the kitchen sliding doors and the dining room window.
2. **Master bedroom** — covers the bedroom and master bathroom windows.

The 25-foot radius is generous in theory. In practice, glass that's behind walls (like the basement bulkhead) doesn't reach the upstairs sensors. The 25-foot spec is line-of-sight in the same room.

The dual-signature requirement is worth picturing, because it's the whole reason the thing isn't useless. The sensor only alarms when it hears *both* the sharp impact thump and the higher-frequency shatter-and-fall, in that order, inside a short window — an AND gate, not an OR. A dropped pot gives you the thump but not the shatter; a TV at volume gives you neither signature. Demand both and most of household life stops looking like breaking glass.

![How the Ecolink dual-signature gate works: a microphone feeds two detectors, one tuned to the low-frequency impact thump and one to the high-frequency shatter of falling glass; only when both fire within a short window does the AND gate raise an alarm, so a single-signature noise like a dropped pot is rejected.](../../assets/blog/glass-break-dual-signature.svg)

## Aqara DJT11LM — vibration sensors

**Hardware:**
- Zigbee HA, CR2032 battery (~2-year claimed life).
- 3-axis accelerometer. Reports three event types:
  - **Tilt**: orientation change (10+ degrees from rest).
  - **Vibration**: short impact pulse (e.g., glass being hit, door being kicked).
  - **Drop**: sudden free-fall.
- Tiny — sticks to windows with the included VHB tape.
- $13 each.

I placed six:
1. Kitchen sliding glass door (interior side).
2. Master bedroom window (interior side, lower sash).
3. Front double-hung window (lower sash).
4. Basement bulkhead door (interior side, on the latch).
5. Garage entry door (interior side).
6. Master bathroom small window (the one a child could climb through but adults can't).

The Aqara reports vibration events directly to HA via the deCONZ stack. No tuning needed; the sensitivity is reasonable out of the box.

## The combined security automation

The glass-break + vibration sensors layer on top of the existing door-sensor + presence security automation:

```yaml
- alias: "Tier-1 security: contact opens while away"
  # Existing — sends notification only
  ...

- alias: "Tier-2 security: glass break OR violent vibration"
  trigger:
    - platform: state
      entity_id:
        - binary_sensor.glass_break_living
        - binary_sensor.glass_break_master_bedroom
      to: "on"
    - platform: event
      event_type: deconz_event
      event_data:
        type: vibration
        # All six DJT11LMs
        unique_id: ["01:..:24", "01:..:25", "01:..:26", "01:..:27", "01:..:28", "01:..:29"]
  action:
    # Whether family is home or not, this is suspicious enough to escalate
    - service: notify.mobile_app_luke_iphone
      data:
        title: "🚨🚨 GLASS BREAK / VIBRATION"
        message: >
          {{ trigger.platform == 'state' and trigger.to_state.attributes.friendly_name 
             or 'Vibration event' }} at {{ now().strftime('%H:%M') }}
        data:
          push:
            sound:
              name: "default"
              critical: 1
    - service: notify.mobile_app_wife_iphone
      data:
        # same
        ...
    - service: light.turn_on
      data:
        entity_id: group.all_lights
        brightness: 255
        rgb_color: [255, 0, 0]
    - service: switch.turn_on
      data:
        entity_id: switch.basement_siren  # Aeotec Doorbell 6 in siren mode
```

**Tier 1** (door/window contact opens while away) → notification + scare-light. Suspicious but might be a delivery person ringing the doorbell, then leaving.

**Tier 2** (glass break or violent vibration) → notification + scare-light + siren. *Always* escalates. This is the "someone is actively breaking into my house" signal — escalation is correct even if I'm home.

The split matters because the two tiers are wired to different *certainties*. A contact open is ambiguous — it could be a kid, a delivery, me forgetting I armed the system. A glass-break or a violent vibration event is not ambiguous: nothing in normal household life shatters a window or hammers a door frame. So the louder response is gated behind the less-ambiguous signal.

![Two-tier security escalation flow. A door or window contact opening while away routes to Tier 1, firing a notification and the scare-light. A glass-break or violent vibration event routes to Tier 2, firing the notification, the scare-light, and the siren together, and always escalating regardless of whether anyone is home.](../../assets/blog/glass-break-tier-escalation.svg)

## False positives, observed and tuned

**Glass-break false positives:**

- **Day 1**: dropping a heavy ceramic pot in the kitchen. Triggered the living-room glass-break detector. Same dual-signature (impact + crash) as glass.
- **Day 3**: child slammed the screen door hard enough that the impact pulse hit the sensor's threshold.

Tunings:
- Tilted the sensor's microphone away from the kitchen counter area where the pot landed.
- Increased the sensor's sensitivity setting one notch lower in HA's Z-Wave parameters.

Three months in, zero false positives since the tuning. The two failures were the only ones.

**Vibration false positives:**

- **Lots, initially.** Kid running through the house. Cat jumping onto the bookshelf next to the bedroom window. The washing machine on spin cycle (one of the sensors is in a wall shared with the laundry).
- Filtered down by adjusting Aqara DJT11LM sensitivity (Zigbee cluster `0x0500`, attribute `0x0055`) from default to lowest sensitivity for the four interior-window sensors. The two on exterior doors stayed at default — they should be sensitive enough to catch someone shaking the door handle.

Three months in, ~1 false positive per month. Acceptable.

## What the siren-mode does

The Aeotec Doorbell 6 has 100+ pre-loaded sounds and a siren mode. I configured siren mode 1 (alarm) at volume 5/5 (~104 dB measured at 1m). Triggered by the Tier-2 automation.

Tested it once intentionally. Effect: every dog within 100m started barking. Within ten seconds I was on the phone explaining to my neighbor what I was doing. Useful test.

In a real intrusion scenario, the siren plus all-house lights-red would (a) wake any sleeping family, (b) make the intruder aware they've been detected, (c) significantly raise the cost of completing whatever they're doing. The combination is more effective than either alone.

## What's still on my list

- **Outdoor motion sensors on the exterior corners.** A motion event in the yard + after midnight + nobody home → notification + camera-record. The Reolink cameras have built-in motion detection but it's primitive — it fires on every passing cat, headlight, and swaying branch. What I really want is on-frame object detection that can tell a person from a raccoon, but the open-source options for that aren't there yet; for now it's PIR sensors and crude camera motion zones.
- **A door / window pre-arm state.** When everyone leaves, the system should escalate door/window opens automatically. Coming when I have time to write the state machine.
- **Smart lock integration.** Forecast #5 from last year — still haven't installed one. Yale Assure Z-Wave is on the list.
- **Geofence-aware arming.** When the last family member leaves the geofence by 100m, automatically arm the system. When they return, disarm.
