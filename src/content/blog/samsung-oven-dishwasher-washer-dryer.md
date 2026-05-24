---
title: "Samsung Bespoke oven + dishwasher + washer/dryer"
date: 2024-03-18T18:00:00-04:00
category: tools
tags:
  - smart-home
  - samsung
  - bespoke
  - appliances
  - smartthings
notebook: smart-home-iot-journey
notebookOrder: 48
excerpt: "Three more Bespoke appliances installed. Slide-in induction oven, dishwasher, washer/dryer combo. All on SmartThings, all on the Family Hub fridge."
pullquote: "An induction oven that texts you when the roast hits 145°F is useful. A washer that texts you when the cycle ends is useful. The collective 'kitchen + laundry as one system' is what changes how you use the appliances."
cover: "../../assets/blog/samsung-oven-dishwasher-washer-dryer-cover.png"
coverAlt: "Samsung Bespoke oven + dishwasher + washer/dryer"
---

Three more Samsung Bespoke appliances installed today. The kitchen + laundry suite is complete.

## The hardware, briefly

- **Bespoke Slide-In Induction Range NSI6DG9100MS** — induction cooktop (5 zones) + convection oven + smart cooktop control via app/SmartThings.
- **Bespoke Dishwasher DW80B7070US** — third-rack, smart water sensor, AutoOpen door at end of cycle, WiFi + SmartThings.
- **Bespoke Front-Load Washer + Dryer WF50A8800AV + DV50A8800AV** — paired wash/dry, FlexWash dual-load, AI-based smart cycle selection.

All four appliances + the Family Hub fridge connect to the same SmartThings account, exposed to HA via the SmartThings integration.

## What the oven actually does over the network

The induction oven exposes several connected features through SmartThings:

- **Preheat from elsewhere.** "Hey Family Hub, preheat the oven to 425°F." Oven beeps when ready. Saves the time you'd spend running across the kitchen.
- **Temperature probe with notify.** Stick the included Wi-Fi temperature probe into the roast, set target temp (e.g., "med-rare beef = 130°F"). Phone push notification when reached.
- **Multi-mode cooking from the app.** Convection bake, convection roast, air-fry mode — selectable from the SmartThings app while you're still at the grocery store mid-shopping.
- **Cycle complete notification.** Doesn't replace the buzzer; adds a push.

The induction cooktop is *not* networked controllable for individual burners (safety concerns I'd agree with — you don't want random web hits turning on a burner). The temperature control is local-only. SmartThings sees cooktop state (on/off, current power level) read-only.

## The HA automations on the oven

```yaml
- alias: "Oven: preheating, announce on Echo"
  trigger:
    - platform: state
      entity_id: oven.bespoke_main
      attribute: status
      to: "preheating"
  action:
    - service: notify.alexa_media_kitchen
      data:
        message: "The oven is preheating to {{ state_attr('oven.bespoke_main', 'set_temperature') }}."

- alias: "Oven: probe target reached, push to phones"
  trigger:
    - platform: state
      entity_id: sensor.oven_probe_target_reached
      to: "on"
  action:
    - service: notify.mobile_app_luke_iphone
      data:
        title: "🍖 Oven probe target reached"
        message: "Probe at {{ states('sensor.oven_probe_temperature') }}°F"
    - service: notify.alexa_media_kitchen
      data:
        message: "The probe target temperature has been reached."
```

The probe-target-reached notification is genuinely useful. Used to mean checking the meat thermometer every 15 minutes during a long roast; now I get a push when it's actually done.

## The dishwasher's clever thing

The Bespoke dishwasher has **AutoOpen** — at the end of a cycle, the door pops open about 6 inches to vent steam. Results: dishes are dry without the heated dry cycle running (saves ~30% electricity per cycle). Combined with the smart-water-sensor adaptive cycling, the dishwasher uses notably less water + power than the old one.

What's *not* clever: the dishwasher's SmartThings integration. Cycle start can be triggered remotely; cycle status is reported. But the "start cycle when off-peak electricity rates apply" automation I wanted requires solar / grid-tied panel monitoring I don't have yet. Adding that to the 2025 list.

## The washer/dryer pair

The Bespoke laundry pair (washer + heat-pump dryer) are similar architecturally. Cycle status, cycle start, cycle complete notification all flow through SmartThings.

The wash-cycle complete notification is genuinely valuable. Used to mean "remember to move the laundry to the dryer" — now the phone pushes "wash cycle finished. Dryer is ready." Family forgets to swap loads less.

The dryer's smart-cycle-selection (it weighs the wet load to estimate run time) shaved ~25 minutes off the average dryer cycle vs the old time-based one.

## The "kitchen + laundry as one system" win

What's emergent from having all of these on one ecosystem:

```yaml
# When the dishwasher and oven both finish within 10 minutes of each other,
# the dehumidifier kicks on (kitchen humidity spikes from steam + heat dissipation)

- alias: "Kitchen humidity event after big cleanup"
  trigger:
    - platform: state
      entity_id:
        - dishwasher.bespoke
        - oven.bespoke_main
      to: "finished"
  condition:
    - condition: numeric_state
      entity_id: sensor.kitchen_humidity
      above: 60
  action:
    - service: switch.turn_on
      data:
        entity_id: switch.kitchen_dehumidifier
    - delay: "00:30:00"
    - service: switch.turn_off
      data:
        entity_id: switch.kitchen_dehumidifier
```

```yaml
# Kid-friendly: when the oven is on or hot, light up the kitchen counter LED strip in red

- alias: "Oven on → warning LED for kids"
  trigger:
    - platform: state
      entity_id: oven.bespoke_main
      attribute: surface_temperature
      above: 100   # cooktop or oven hot
  action:
    - service: light.turn_on
      data:
        entity_id: light.kitchen_counter_led
        rgb_color: [255, 50, 0]
        brightness: 150

- alias: "Oven cool → counter LED normal"
  trigger:
    - platform: state
      entity_id: oven.bespoke_main
      attribute: surface_temperature
      below: 50
  action:
    - service: light.turn_on
      data:
        entity_id: light.kitchen_counter_led
        rgb_color: [255, 200, 50]   # warm white
        brightness: 100
```

The kid-warning LED is the kind of automation that wouldn't have been possible with a non-connected oven. Now it just works.

## Privacy posture

Same as the fridge: dedicated Samsung account, IoT VLAN with restricted egress, no Bixby. The appliances upload usage data to Samsung; in their privacy policy I've reviewed, it's claimed to be aggregated + anonymized for product improvement. I'm OK with this tradeoff for the integration benefits.

## What still doesn't work

- **The oven's "AI Cook" feature** that tries to identify what you're cooking and suggest settings. Tried it three times. Identified "roast chicken" as "pizza" twice. Disabled.
- **Cross-Samsung-appliance routines** — Samsung's SmartThings Routines feature can chain appliance events ("dishwasher done → start washer cycle"). Setup is finicky in the SmartThings app; I rebuilt the same automations in HA where they're more testable.
- **The Family Hub fridge interior cams accurately tracking food.** Still mediocre. The mirror-to-Frame TV recipe display is the killer use; the AI food recognition isn't.

## What's next

- Frame TV ecosystem post (June).
- A "smart laundry chute" project — DIY ESP-based sensor to detect when the upstairs hamper hits a fullness threshold, push notify when full.
- Solar + battery system planning for 2025.
