---
title: "BLE presence detection — HA Companion + iBeacons"
date: 2019-04-08T20:00:00-04:00
category: tools
tags:
  - smart-home
  - ble
  - ibeacon
  - presence
  - home-assistant
series: smart-home-iot-journey
seriesOrder: 28
excerpt: "iOS 12.2 shipped with better BLE background scan permissions. HA Companion App 2.0 uses them properly. Room-level presence works."
pullquote: "Room-level presence isn't 'where is the phone.' It's 'is a human here right now.' That distinction is what makes automations feel intentional instead of creepy."
cover: "../../assets/blog/ble-presence-detection-ha-companion-app-cover.png"
coverAlt: "BLE presence detection — HA Companion + iBeacons"
---

iOS 12.2 (late March) granted apps better BLE-background-scan permissions. HA Companion App 2.0 shipped early April with proper iBeacon-region-monitoring support. Room-level presence in my house is now reliable enough to build automations on.

## The setup

**Eight iBeacons** placed throughout the house:

- Kitchen (above the dishwasher)
- Living room (behind the TV)
- Master bedroom (on the dresser)
- Kid's room (on the bookshelf)
- Master bathroom (above the medicine cabinet)
- Basement workshop (on the workbench)
- Garage (above the door)
- Office (on the desk)

Beacons: **Estimote stickers** (older but still working) and **RadBeacon Dot** for the newer ones. ~$10-$15 per beacon. Each runs on a CR2032 for ~2 years.

Each beacon advertises an iBeacon-format BLE packet:

```
Beacon UUID:  E2C56DB5-DFFB-48D2-B060-D0F5A71096E0
Major:        1   (region — my house)
Minor:        1, 2, 3, ...  (per-beacon, identifies the specific room)
TX Power:     -59 dBm at 1m  (for distance estimation)
```

## How the Companion App uses them

iOS supports two iBeacon scanning modes:

**1. Region monitoring** (low-power, background-friendly):
- iOS wakes the app on enter/exit events for known regions.
- Battery cost: negligible (~1% per day extra).
- Latency: 10-30 seconds (iOS coalesces events).
- Available even when app is killed (iOS will relaunch the app for region events).

**2. Ranging** (high-power, foreground-only):
- App actively scans and reports beacon proximity by RSSI band (immediate, near, far).
- Battery cost: significant (~10% per hour if continuous).
- Latency: 1-2 seconds.
- Requires app in foreground or recent active use.

The Companion App uses **region monitoring** by default. When you walk into the kitchen, iOS fires an enter event for the kitchen beacon's region. The Companion App reports to HA, and HA updates the `sensor.luke_room` entity to `kitchen`.

```yaml
# Inferred from Companion App's beacon report
sensor.luke_room: "kitchen"
sensor.wife_room: "living_room"
sensor.kid_room: "bedroom"
```

## The automation primitive

Room-level presence enables a class of automations that GPS geofencing can't:

**Walk into the kitchen after dark → lights warm:**

```yaml
- alias: "Kitchen presence after dark"
  trigger:
    - platform: state
      entity_id: sensor.luke_room
      to: "kitchen"
  condition:
    - condition: sun
      after: sunset
      after_offset: "00:00:00"
    - condition: state
      entity_id: light.kitchen
      state: "off"
  action:
    - service: scene.turn_on
      data:
        entity_id: scene.kitchen_evening  # warm 2700K, 60% brightness
```

**Walk out of a room → lights off after delay** (the inverse — also needed):

```yaml
- alias: "Leave kitchen → lights off"
  trigger:
    - platform: state
      entity_id: sensor.luke_room
      from: "kitchen"
      for: "00:05:00"   # 5 min after leaving
  condition:
    - condition: state
      entity_id: group.family
      state: "home"
    - condition: template
      value_template: >
        {% set rooms = [
          states('sensor.luke_room'),
          states('sensor.wife_room'),
          states('sensor.kid_room')
        ] %}
        {{ 'kitchen' not in rooms }}
  action:
    - service: light.turn_off
      data:
        entity_id: light.kitchen
```

The template condition checks all three family members' current rooms — only turns lights off if *nobody* is in the kitchen.

## The accuracy problem

Three weeks of room-presence data; here's what I'm seeing:

**Works well:**
- Long stays in one room (>3 minutes). Enter event fires within 30s of walking in; stays until exit fires.
- Distinct rooms separated by walls. Kitchen vs living room (open floor plan but different beacons) works.
- Outdoor → garage transitions.

**Doesn't work well:**
- **Adjacent rooms with overlapping BLE signals.** Master bedroom and master bathroom — the bathroom beacon's signal reaches the bedroom. iOS sometimes flips back and forth between the two.
- **Quick transits.** Walking through the living room to the kitchen — sometimes the living-room beacon never fires because iOS coalesces events.
- **Multiple phones in the same room.** All three should report the same room; sometimes one phone lags 30-60 seconds behind the others.

Mitigations:

1. **Beacon placement matters more than you'd think.** I moved the master bathroom beacon to the far wall (away from the bedroom door); cross-room false positives dropped substantially.
2. **Major debouncing in automations.** I use `for: "00:00:30"` on entry triggers to require the phone to remain in the room for 30 seconds before firing. Reduces flicker.
3. **The `group.family_present_room` template sensor.** Computed as "the room where at least one family member has been for >1 minute." Smoothes out short-duration room-flicker.

## The new automations I've built

- **Lights follow me at night.** Walking through the house at 2 AM → only the room I'm in is lit (10% red); other rooms dark. Implemented as a state-machine across `sensor.*_room`.
- **Bathroom occupancy guidance.** When wife enters master bath, lights warm-to-bright. When she leaves, off after 2 min. Used to be motion-based with the Aqara human-body sensor; presence-based is more reliable.
- **Workshop power tools timeout.** When I leave the basement workshop for >10 min, the table-saw outlet de-energizes (safety). Re-energizes when I return.
- **Kid's room nighttime light.** Kid enters bedroom after 7 PM → soft amber light for 20 min, then off. If they wake at night and enter master bedroom, lights low-blue to encourage going-back-to-sleep.

## What doesn't work yet

- **Multi-floor accuracy.** The basement workshop beacon and the kitchen beacon are vertically aligned; iOS sometimes confuses them when I'm on the stairs. Will need to mount the kitchen beacon further from the stairwell.
- **Outdoor presence.** No beacons in the backyard yet (weather-rated iBeacons exist but I haven't tried any). Currently relying on GPS geofence for "in the yard."
- **Visiting guest detection.** Guests don't run the Companion App; I have no way to detect them. The all-room "is anyone here" template is family-only. Going to add a Bluetooth scanner for unknown devices (find-my-friends-style) if I want guest detection.

## The privacy question

Tracking which room family members are in 24/7 is invasive. The data lives only on my local HA installation, never leaves the LAN, but it's still tracking. We had a family conversation about it.

The rules we landed on:

1. **Data retention**: 30 days. After that, room history is automatically purged from HA's recorder database.
2. **Opt-out**: anyone can turn off Companion App's beacon scanning from the app itself. No retaliation.
3. **No automation that calls attention to behavior**. The kid's "bedtime light" only acts; it doesn't notify anyone "kid went to bedroom at X time."
4. **Logbook off for room events**. HA's logbook captures everything by default; I excluded `sensor.*_room` from the logbook.

Family is OK with this. Worth having the conversation explicitly.

## What's next

- **Outdoor beacons** for the backyard and side yard.
- **iBeacons inside the cars** (where the family is sometimes). Tells HA when the cars arrive home.
- **A motion / occupancy double-check.** When `sensor.luke_room` says I'm in the kitchen, also verify the kitchen motion sensor has fired recently; if it hasn't, the beacon's lying.
