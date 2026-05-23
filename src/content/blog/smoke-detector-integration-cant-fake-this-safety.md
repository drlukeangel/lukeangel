---
title: "Smoke detector integration — alerts that actually matter"
date: 2018-10-21T20:00:00-04:00
category: tools
tags:
  - smart-home
  - smart-home-security
  - zwave
  - smoke-detector
  - safety
series: smart-home-iot-journey
seriesOrder: 26
excerpt: "First Alert ZCOMBO smoke + CO detector on Z-Wave. Three of them throughout the house, replacing the dumb battery-only smokes that were 12 years old."
pullquote: "Smoke detectors are the one device class where ALL the automation around them is downstream of one signal you absolutely cannot afford to miss. The integration matters; the dependency on the network for the actual alert does not. Standalone alarm first; HA second."
---

Three First Alert ZCOMBO smoke + CO detectors installed last weekend. They replace the dumb battery-only Kidde models that had been beeping at 3 AM for years on dying 9V batteries.

## Hardware

**First Alert ZCOMBO:**
- Ionization smoke + electrochemical CO detection.
- **Z-Wave Plus** (and crucially, also operates as a standalone smoke detector — the alarm sounds locally even when Z-Wave is broken).
- 2× AA batteries, claimed 10-year life on the detector itself (not the batteries — batteries claim 3 years).
- UL-217 + UL-2034 certified — meets US residential smoke + CO code.
- Interconnect-compatible via Z-Wave — when one detects smoke, the other two also sound (via HA orchestration; not hardwired).

$45 each, $135 total.

## The design principle: standalone first, network second

The most important architectural decision with smoke + CO detection is this:

**The local alarm cannot depend on the network.**

If the WiFi is down, the Z-Wave mesh is broken, the Pi is unplugged — the detector still has to scream when there's smoke. UL-217 requires it. Code requires it. Common sense requires it.

The ZCOMBO does this correctly: when its onboard sensor detects smoke or CO, **the buzzer sounds immediately**, locally, with zero network involvement. The Z-Wave radio is a *secondary* notification path that sends events to HA. It is not the primary alert.

This is the same architectural decision Apple made with HomeKit security: the device functions standalone; the integration is bonus. Compare to "smart" smoke detectors I'm avoiding:
- **Nest Protect**: relies on WiFi for many features, has had reliability issues with cloud outages.
- **First Alert OneLink**: WiFi-only for connected features.

The Z-Wave + standalone-buzzer design wins on dependency-failure mode.

## The HA automation

```yaml
- alias: "Smoke detected — full alarm response"
  trigger:
    - platform: state
      entity_id:
        - binary_sensor.smoke_living_room
        - binary_sensor.smoke_upstairs_hall
        - binary_sensor.smoke_basement
      to: "on"
  action:
    # First: lights to max brightness, white, all rooms — for evacuation
    - service: light.turn_on
      data:
        entity_id: group.all_lights
        brightness: 255
        rgb_color: [255, 255, 255]
        transition: 0   # instant
    # Second: push notifications to all phones, critical priority
    - service: notify.mobile_app_luke_iphone
      data:
        title: "🔥 SMOKE: {{ trigger.to_state.attributes.friendly_name }}"
        message: "Time: {{ now() }}. Evacuate."
        data:
          push:
            sound:
              name: "default"
              critical: 1
              volume: 1.0
    - service: notify.mobile_app_wife_iphone
      data:
        title: "🔥 SMOKE: {{ trigger.to_state.attributes.friendly_name }}"
        message: "Time: {{ now() }}. Evacuate."
        data:
          push:
            sound:
              name: "default"
              critical: 1
              volume: 1.0
    # Third: unlock the front door (when we have a smart lock — coming)
    # - service: lock.unlock
    #   data:
    #     entity_id: lock.front_door
    # Fourth: turn off the HVAC fan to slow smoke spread
    - service: climate.set_fan_mode
      data:
        entity_id: climate.ecobee_main_floor
        fan_mode: "off"
    # Fifth: log
    - service: logbook.log
      data:
        name: "Fire"
        message: "Smoke detected: {{ trigger.to_state.attributes.friendly_name }}. Full response."
```

The "critical" push notification flag (iOS 12+) makes the notification bypass Do Not Disturb and silent mode. The phone is louder than it normally would be. Critical alerts require Apple's permission grant — I approved it for HA.

## CO is a different category

CO is invisible. Slow. You don't smell it. By the time symptoms appear (headache, drowsiness), it's already affecting your judgment. Smoke is "fire, evacuate." CO is "leave the house *now*, and call the gas company."

The CO automation is similar to smoke but with different messaging:

```yaml
- alias: "CO detected — evacuate"
  trigger:
    - platform: state
      entity_id:
        - binary_sensor.co_living_room
        - binary_sensor.co_upstairs_hall
        - binary_sensor.co_basement
      to: "on"
  action:
    - service: light.turn_on
      data:
        entity_id: group.all_lights
        brightness: 255
        rgb_color: [255, 100, 0]   # red-orange — distinguishes from smoke
        transition: 0
    - service: notify.mobile_app_luke_iphone
      data:
        title: "☠️ CARBON MONOXIDE"
        message: >
          {{ trigger.to_state.attributes.friendly_name }}. Open windows, evacuate,
          call gas company: (800) 555-0100.
        data:
          push:
            sound:
              name: "default"
              critical: 1
    # Open windows: smart window operators don't exist in this house yet.
    # In the future: trigger a Z-Wave-controlled ceiling fan to ventilate.
```

The orange vs white lighting differentiates smoke (white) from CO (orange-red) so anyone in the house knows which protocol applies just by looking at the lights.

## Interconnect — when one fires, all three sound

The original Kidde smokes I replaced were hardwired-interconnect — when the basement detector alarmed, the upstairs ones also alarmed via the 3-conductor hardwiring code requires.

The ZCOMBOs are *not* hardwired-interconnected; they're standalone buzzers. To get equivalent "one fires, all sound" behavior I had to implement it in HA:

```yaml
- alias: "Smoke interconnect — one fires, all sound"
  trigger:
    - platform: state
      entity_id:
        - binary_sensor.smoke_living_room
        - binary_sensor.smoke_upstairs_hall
        - binary_sensor.smoke_basement
      to: "on"
  action:
    - service: switch.turn_on
      data:
        entity_id:
          - switch.smoke_living_room_test_alarm  # exposed Z-Wave "alarm test" command
          - switch.smoke_upstairs_hall_test_alarm
          - switch.smoke_basement_test_alarm
```

Z-Wave exposes a "test alarm" command on each ZCOMBO that triggers the local buzzer remotely. Activating all three when any one fires gives the interconnect behavior. This is a network-dependent feature, so it might not work in a power outage — but the local alarm of the detector that actually saw the smoke does.

## What I'm wishing for

- **A camera correlation**. When smoke fires, the indoor cameras should start recording and upload to off-site storage. Implementing this with Reolink + Synology Surveillance Station; ffmpeg dance is more complex than it should be.
- **A way to know which sensor is "real" vs nuisance.** Burned toast triggers the kitchen smoke sometimes. A debounce period would help (was a leak-sensor pattern); for smoke, even a 5-second debounce is dangerous. Better: a "fire actually present" verification using a temperature sensor near each smoke — if smoke detected AND temperature rising rapidly, real fire.
- **Eventually: a connection to a monitoring service.** Self-monitoring is fine for me (phone alerts) but my insurance company offers a 10% discount for monitored fire/smoke. The monitored services (ADT, SimpliSafe) get the signal and call you, then dispatch FD. Worth $300/yr for the discount alone.

## What's not on this list (yet)

- A **siren**. Z-Wave Aeotec Doorbell 6 in siren mode is on order. The ZCOMBO buzzers are loud but localized; a bigger central siren makes "smoke + family asleep" much more effective.
- **Heat sensors in attic/garage** (the rooms where heat-rise fire detection is preferred over smoke detection because they're dusty / fume-prone environments).
- **A water-mist suppression system** in the basement near the furnace. Overkill for residential; would be cool.
