---
title: "Robots in the routine — Roomba + Braava choreography"
date: 2025-09-22T16:00:00-04:00
category: tools
tags:
  - smart-home
  - robots
  - irobot
  - roomba
  - automation
notebook: smart-home-iot-journey
notebookOrder: 54
excerpt: "Five years of iRobot Roomba + Braava in the house. The vacuum is a Roomba i7+; the mop is a Braava jet m6. Both join the home routine via SmartThings."
pullquote: "The Roomba doesn't make the floor cleaner than I would. It makes the floor cleaner more often. Frequency beats thoroughness for whole-house hygiene."
---

Five years of iRobot Roomba i7+ (vacuum) and Braava jet m6 (mop). Both joined the family before the new-house move. Both are part of the daily routine now in ways that wouldn't work without the connected-home integration.

This is what they do and how it's automated.

## The hardware

- **Roomba i7+** ($800, bought December 2020): brushless suction, lidar-equivalent vSLAM mapping, self-emptying base. House map stored on-device + synced to iRobot cloud. Wi-Fi + cellular-fallback connectivity.
- **Braava jet m6** ($500, bought June 2022): mop. Same vSLAM mapping platform as the Roomba. Refillable water reservoir + microfiber pads (disposable or washable).

Both run iRobot's HOME app. Both expose to Home Assistant via the official iRobot integration (cloud-mediated — iRobot doesn't have a local API).

## The schedule

```
Monday-Friday:
  08:30 - Roomba: vacuum entire downstairs (kitchen, dining, living room, hallway)
  09:15 - Braava jet: mop kitchen + dining + hallway (no living room — carpet)
  10:00 - Both return to base, finish cleaning
  
Saturday:
  09:00 - Roomba: vacuum upstairs (bedrooms + hall — done while kids are still asleep)
  10:00 - Braava jet: mop bathrooms
  
Sunday: rest day (the robots, anyway)
```

## The HA integration

```yaml
# iRobot integration loaded via HA UI
# Devices appear as vacuum.roomba_i7 and vacuum.braava_m6

- alias: "Weekday: vacuum downstairs at school dropoff"
  trigger:
    - platform: time
      at: "08:30"
  condition:
    - condition: time
      weekday:
        - mon
        - tue
        - wed
        - thu
        - fri
    - condition: state
      entity_id: group.family
      state: "not_home"  # only when nobody's home (kids at school, parents working)
  action:
    - service: vacuum.send_command
      data:
        entity_id: vacuum.roomba_i7
        command: "clean_zone"
        params:
          zone:
            - kitchen
            - dining_room
            - living_room
            - hallway
    - service: notify.mobile_app_luke_iphone
      data:
        title: "🤖 Roomba started"
        message: "Cleaning downstairs at {{ now().strftime('%H:%M') }}"
```

The "only when nobody's home" condition is what makes the schedule work. Family was working from home during the pandemic; the Roomba running during meetings was annoying. Now it runs during school + workday.

## No-go zones

The Roomba maps the house and learns. I've configured **no-go zones**:

- **The cat's litter box area** (Roomba would otherwise vacuum litter into its base — gross).
- **The kid's room while toys are on the floor** (Roomba navigates around them but sometimes gets stuck).
- **Under the dining table chairs** when they're pulled out (Roomba ramps the chair legs and gets confused).
- **The Christmas tree base** (December only — temporary no-go zone added via the iRobot app).

No-go zones are stored on the Roomba and synced to the iRobot cloud. They persist through firmware updates and re-mappings.

## Cat coordination

The cat — yes, we have one — hates the Roomba. Avoids it. But the cat's routine is to nap on the kitchen counter during the day, and the Braava jet sometimes mops the kitchen while the cat is napping nearby. The cat doesn't care about the Braava (it's quiet).

Automation: when the Roomba starts, the cat's feeder gets a small treat dispensed (it has a Z-Wave-controlled relay). The cat associates Roomba sound → treat → moves to the kitchen counter. Conditioning works.

```yaml
- alias: "Roomba starts → cat treat"
  trigger:
    - platform: state
      entity_id: vacuum.roomba_i7
      to: "cleaning"
  action:
    - service: switch.turn_on
      data:
        entity_id: switch.cat_feeder_treat
    - delay: "00:00:02"
    - service: switch.turn_off
      data:
        entity_id: switch.cat_feeder_treat
```

The cat is, technically, part of the smart home routine.

## The "we're going on vacation" routine

When we're away for >1 day:

```yaml
- alias: "Away mode: robots clean daily"
  trigger:
    - platform: state
      entity_id: input_boolean.vacation_mode
      to: "on"
  action:
    - service: vacuum.send_command
      data:
        entity_id: vacuum.roomba_i7
        command: "start"
    - service: notify.mobile_app_luke_iphone
      data:
        title: "🤖 Vacation cleaning started"
        message: "Daily Roomba runs scheduled until you return"
```

The Roomba runs daily while we're away. House comes back to a clean floor regardless of how long we're gone.

## What works that I didn't expect

- **The cat actually moved off the floor more.** Cat naps moved to the couch + the kitchen counter (which is technically prohibited, but Roomba doesn't reach it).
- **Frequency >> thoroughness.** Vacuuming 5x/week at "good enough" beats vacuuming 1x/week at "thorough." Pet hair accumulation is the failure mode that frequency solves.
- **The Braava with the disposable wet pads is the best mop I've ever owned.** Better than a human-pushed mop because it goes under furniture without me bending over.

## What I'd buy in 2025

The Roomba i7+ is now five years old. iRobot's newer j7 and j9+ models have:
- Better obstacle detection (avoids the cat's bowl, pet accidents, charging cables).
- Faster vSLAM with PrecisionVision.
- Steeper price ($1000+).

I'd probably upgrade when the i7+ dies. Until then, the i7+ is fine.

## What I'm doing next

- **A wall-mounted Braava jet bay** in the laundry room. Currently it lives next to the Roomba dock; relocating to its own spot makes refilling water easier.
- **Cross-floor coordination.** Currently the upstairs Roomba run is manual. Adding a second Roomba is on the table for 2026.
- **Dog (planned for 2026) coordination.** When we add a dog, the cleanup-after-pets workload increases. May need a second pass robot. Or, you know, training the dog.

## What this fits into

The robots are part of the daily routine in the way the security alarm panel and the morning lighting scenes are part of the daily routine. They aren't separate devices; they're choreography. The house is starting to operate as a system.

That's the actual smart-home win. Not "lights you can control with your phone." House that runs itself when you're not paying attention.
