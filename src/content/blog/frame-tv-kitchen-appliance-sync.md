---
title: "Frame TV + kitchen appliance sync — kitchen talks"
date: 2025-06-18T19:00:00-04:00
category: tools
tags:
  - smart-home
  - samsung
  - frame-tv
  - bespoke
  - automation
notebook: smart-home-iot-journey
notebookOrder: 53
excerpt: "Eighteen months into the full Bespoke ecosystem. Fridge, oven, dishwasher, washer/dryer, Frame TV, and SmartThings hub now genuinely cooperate."
pullquote: "Connected appliances are interesting individually. The collective behavior — when the kitchen knows what's cooking and routes information across screens — is what justifies the ecosystem investment."
cover: "../../assets/blog/frame-tv-kitchen-appliance-sync-cover.png"
coverAlt: "Frame TV + kitchen appliance sync — kitchen talks"
---

Eighteen months in the full Samsung Bespoke ecosystem. Eighteen months of figuring out what cross-appliance routines actually matter. This is the cookbook of what works.

## The architecture

Six connected appliances + the Frame TV + Home Assistant:

```
Family Hub fridge ─┬─ SmartThings hub (Zigbee + Z-Wave + Matter)
                   ├─ Camera (interior x 3)
                   └─ 21" Tizen display
                   
Bespoke oven ──────── SmartThings device + temp probe
Bespoke dishwasher ── SmartThings device
Bespoke washer/dryer ─ SmartThings device

Frame TV ──────────┬─ SmartThings hub (secondary)
                   ├─ AirPlay + Cast receiver
                   └─ Tizen apps
                   
Home Assistant ────── Bridges everything, runs cross-device automations
```

Six SmartThings-natively-controlled devices. One Tizen-native (Frame). All visible to HA. Cross-device automations live in HA where they're testable.

## Routines that actually run

**1. "Cooking mode" routine — when the oven preheats:**

```yaml
- alias: "Cooking: oven preheating → kitchen environment"
  trigger:
    - platform: state
      entity_id: oven.bespoke_main
      attribute: status
      to: "preheating"
  action:
    - service: light.turn_on
      data:
        entity_id: light.kitchen
        brightness: 255
        color_temp: 4000  # neutral white for cooking
    - service: switch.turn_on
      data:
        entity_id: switch.kitchen_range_hood
    - service: notify.alexa_media_kitchen
      data:
        message: "Oven preheating. Vent fan on."
```

Oven preheats → kitchen lights to neutral white (vs warm evening color) + range-hood fan on + Echo confirms. Tested daily for a year. No false positives.

**2. "Dinner is ready" routine — when the oven probe target hits:**

```yaml
- alias: "Cooking: probe target reached → multi-screen notification"
  trigger:
    - platform: state
      entity_id: sensor.oven_probe_target_reached
      to: "on"
  action:
    # The Frame TV shows a notification
    - service: notify.frame_tv
      data:
        title: "🍖 Probe target reached"
        message: "{{ states('sensor.oven_probe_temperature') }}°F — ready to pull"
    # Echo announces
    - service: notify.alexa_media_kitchen
      data:
        message: "The oven probe target temperature has been reached."
    # Phone notifications
    - service: notify.mobile_app_luke_iphone
      data:
        title: "🍖 Roast ready"
        message: "Probe at {{ states('sensor.oven_probe_temperature') }}°F"
```

Probe hits target → Frame TV pops up a banner across the room → Echo says the same thing → phone push. Family knows the roast is ready from anywhere in the open-plan kitchen + great room.

**3. "Recipe display sync" — when the fridge casts a recipe:**

This isn't an HA automation; it's a SmartThings-native Samsung feature. Tap "send to Frame" on the Family Hub fridge → the recipe page mirrors on the Frame TV. Read while cooking at the stove (15 ft away). Used 2-3 times per week.

**4. "Dishwasher + washer concurrent" — kitchen + laundry steam management:**

```yaml
- alias: "High-humidity event: dishwasher OR washer running with damp ambient"
  trigger:
    - platform: state
      entity_id:
        - dishwasher.bespoke
        - washer.bespoke
      to: "running"
  condition:
    - condition: numeric_state
      entity_id: sensor.kitchen_humidity
      above: 55
  action:
    - service: switch.turn_on
      data:
        entity_id: switch.kitchen_dehumidifier
    - service: switch.turn_on
      data:
        entity_id: switch.kitchen_range_hood  # low setting
        data:
          speed: low
```

When two humidity-generating appliances are running and kitchen RH is climbing, the dehumidifier kicks in + range hood fan turns on at low speed. Quietly prevents the kitchen from becoming a sauna.

**5. "Laundry done" — washer + dryer routing:**

```yaml
- alias: "Wash cycle done → notify + remind dryer"
  trigger:
    - platform: state
      entity_id: washer.bespoke
      to: "finished"
  action:
    - service: notify.mobile_app_luke_iphone
      data:
        title: "🧺 Wash cycle done"
        message: "Move to dryer when convenient."
    - delay: "00:30:00"  # if not moved in 30 min, escalate
    - condition: state
      entity_id: washer.bespoke
      state: "finished"
    - service: notify.mobile_app_luke_iphone
      data:
        title: "🧺 Wash still in washer — 30 min"
        message: "Don't let it sit and stink."
```

Wash cycle finishes → phone push. 30 minutes later, if still no dryer-cycle-started event, escalation push.

**6. "Frame TV state coordination" — different art for different times:**

```yaml
- alias: "Frame TV art rotation by time of day"
  trigger:
    - platform: time
      at: ["06:00", "12:00", "18:00", "22:00"]
  action:
    - service: media_player.play_media
      data:
        entity_id: media_player.frame_tv
        media_content_type: "image/jpeg"
        media_content_id: >
          {% set hour = now().hour %}
          {% if hour < 12 %}
            https://hass.example.com/local/art/morning.jpg
          {% elif hour < 18 %}
            https://hass.example.com/local/art/daytime.jpg
          {% elif hour < 22 %}
            https://hass.example.com/local/art/evening.jpg
          {% else %}
            https://hass.example.com/local/art/night.jpg
          {% endif %}
```

## What didn't work

- **"Auto-start washer when dishwasher finishes"** — tried this for the off-peak energy schedule. Required user to load the washer the night before. Family resented being told what to do; removed.
- **"Fridge interior camera + AI food expiration"** — the Family Hub claims to track this. Accuracy too low; removed dependency.
- **"Voice command from Echo to start the dishwasher"** — works but the safety question (am I sure the dishwasher is loaded?) makes this dangerous. Removed.

## The Family Hub fridge as the kitchen's center

The 21" Family Hub display has become the kitchen's primary information surface:

- **Calendar + family events.** Two color-coded calendars (mine + wife's). Kids check it for after-school activities.
- **Shared shopping list.** Voice or touch — adds items to the list, syncs to phones.
- **Recipe browser.** Tap a recipe, cast to the Frame TV across the room.
- **Interior cams.** Glance at what's in the fridge from across the kitchen without opening the door.
- **Family memos.** Whiteboard-style for messages.

The Frame TV is the secondary surface for cooking content + the great-room display for everything else.

## What I'd buy again

- The fridge ($4,800 — the 21" model). Yes. Worth it for the SmartThings hub + the display.
- The oven ($2,200). Yes. Induction + probe alerts.
- The dishwasher ($1,400). Yes. AutoOpen saves the most electricity per cycle.
- The washer/dryer ($1,800 + $1,400). Maybe. The cycle notifications are useful; the AI smart-cycle selection is marginal.
- The Frame TV ($2,300, 65"). Yes — but for the SmartThings hub function, the matte screen, and the art mode. The TV quality is good, not best-in-class.

## What's next

- **Robots post** in September — the iRobot Roomba + Braava routines that have been quietly running.
- **The thirteen-year retrospective** in November.
- **The 2025 year-in-review** in December.
