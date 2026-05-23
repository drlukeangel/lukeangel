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
series: smart-home-iot-journey
seriesOrder: 29
excerpt: "Two Ecolink Z-Wave glass-break detectors plus six Aqara vibration sensors. The first sensor class that catches what contact sensors miss."
pullquote: "Door sensors catch the opening. Glass-break sensors catch the breaking. The second one matters because the first one assumes the intruder walks in like a guest."
---

Two **Ecolink Z-Wave glass-break detectors** (GBHA1-ECO) and six **Aqara DJT11LM vibration sensors**. The first sensors I've added that catch the failure mode my door/window contact sensors miss.

## The threat model

A door sensor fires when the door opens. Useful for tracking entries and detecting the casual intrusion. But a real burglary scenario in residential is more like:

- Break the kitchen sliding glass door (contact sensor on the frame doesn't fire — door is still "closed" structurally, just shattered).
- Cut the screen on a window the contact sensor isn't on.
- Pry a basement window open from outside.

None of these trigger a typical reed-switch contact sensor. They need a different sensor class:

- **Glass-break detectors**: acoustic sensors tuned to the frequency signature of breaking glass.
- **Vibration sensors**: accelerometers on windows and doors that detect tampering.

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

- **Outdoor motion sensors on the exterior corners.** A motion event in the yard + after midnight + nobody home → notification + camera-record. The Reolink cameras have built-in motion detection but it's primitive; Frigate-based detection would be much better.
- **A door / window pre-arm state.** When everyone leaves, the system should escalate door/window opens automatically. Coming when I have time to write the state machine.
- **Smart lock integration.** Forecast #5 from last year — still haven't installed one. Yale Assure Z-Wave is on the list.
- **Geofence-aware arming.** When the last family member leaves the geofence by 100m, automatically arm the system. When they return, disarm.
