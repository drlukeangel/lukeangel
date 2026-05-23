---
title: "Home Assistant Lovelace — building kitchen wall display"
date: 2018-05-19T14:00:00-04:00
category: tools
tags:
  - smart-home
  - home-assistant
  - lovelace
  - yaml
  - ui
series: smart-home-iot-journey
seriesOrder: 24
excerpt: "HA 0.72 shipped Lovelace as the new default UI. Six months of waiting; six weekends to build the kitchen wall-mounted dashboard."
pullquote: "Lovelace is YAML-configurable, custom-card-supporting, and exposes every HA entity as a first-class widget. The dashboard isn't just a control surface — it's the front end of the smart home, the thing the family actually sees."
---

HA 0.72 shipped Lovelace as the new default UI in April. Forecast #1 from last December: confirmed. After a few weeks of tinkering, the kitchen wall dashboard is up. Refurbished iPad mini 2 mounted next to the fridge, running Fully Kiosk Browser fullscreen pointing at the HA Lovelace URL.

## Why a wall dashboard

Two reasons.

**One**: family-friendly interface. My wife uses Siri for everything Apple-touched. The five-year-old can't say "Alexa" reliably. The wall dashboard is a touch surface anyone can tap — no voice required, no app to open, no learning curve.

**Two**: ambient information. Glanceable temperature, who's home, security status, what the bathroom humidity looks like, what's on the calendar. The dashboard is more informational than control, most of the time.

## The hardware

- **iPad mini 2** (2013, picked up refurbished for $80). 7.9" Retina display. Old enough that the battery's swollen-ish, so it lives wall-mounted and plugged in permanently.
- **Heckler Design Wall Mount** ($90). Tilts and swivels. Power passes through the back; the cable runs behind the wall to an outlet I added inside the cabinet.
- **A USB-C → Lightning charge cable** in low-power-charging mode. iPad mini battery sees 100% all day; minimizes battery cycle wear.
- **Fully Kiosk Browser Lockdown** ($7/year license). Locks the iPad to one URL, hides Safari controls, auto-restarts on crash, prevents the kids from navigating away.

Total dashboard hardware cost: ~$180.

## The Lovelace config model

Lovelace YAML lives in `/config/ui-lovelace.yaml`. Each "view" is a tab; each view has cards.

```yaml
title: Home
views:
  - title: Overview
    icon: mdi:home
    badges: []
    cards:
      - type: vertical-stack
        cards:
          - type: glance
            title: "Who's home"
            entities:
              - person.luke
              - person.wife
              - person.kid
          - type: weather-forecast
            entity: weather.darksky_home
            show_forecast: true

      - type: entities
        title: "Climate"
        entities:
          - sensor.bathroom_humidity
          - sensor.kitchen_temperature
          - sensor.master_bedroom_humidity
          - climate.ecobee_main_floor

      - type: light-card  # custom card from HACS
        entity: light.kitchen
        icon: mdi:lightbulb

      - type: history-graph
        entities:
          - sensor.bathroom_humidity
        hours_to_show: 24

  - title: Security
    icon: mdi:shield-home
    cards:
      - type: glance
        title: "Doors & Windows"
        entities:
          - binary_sensor.front_door_contact
          - binary_sensor.back_deck_contact
          - binary_sensor.bulkhead_contact
          - binary_sensor.kitchen_patio_contact
          - binary_sensor.garage_entry_contact
          - binary_sensor.master_window_contact

      - type: picture-glance
        title: "Backyard Camera"
        camera_image: camera.reolink_backyard
        entities:
          - light.backyard_floodlight

  - title: Lights
    icon: mdi:lightbulb-multiple
    cards: ...
```

Three tabs. Touch a card to interact with the entity. Pinch-zoom does what you'd expect. The Lovelace renderer is fast enough on an iPad mini 2 that nothing feels janky.

## Custom cards from HACS

The default Lovelace cards (`glance`, `entities`, `history-graph`, `weather-forecast`) are functional but plain. The community has built dozens of custom cards — installed via HACS (Home Assistant Community Store), an unofficial add-on that gives you a one-click install for community resources.

The custom cards I'm using:

- **`mini-graph-card`**: pretty sparkline graphs of any sensor. Replaces the default `history-graph` with a more compact, more readable visualization.
- **`light-entity-card`**: a single card for a light with color picker, brightness slider, and on/off — much nicer than the default popup.
- **`mushroom-cards`** (just landed this spring; experimental): a coherent design system for HA dashboards. Cards look intentional rather than HA-default.
- **`button-card`**: define custom button styling for any entity. Used for the kid-friendly "All Off" button.

Installing HACS:

```bash
# SSH into the Pi
cd /config
wget -O - https://hacs.xyz/install.sh | bash -
# Restart HA, then add HACS via the UI integrations
```

## The kid-friendly "All Off" button

Last card on the Overview tab is a giant button:

```yaml
- type: custom:button-card
  entity: light.living_room
  name: "Goodnight 🌙"
  size: 30%
  styles:
    card:
      - height: 120px
      - background: linear-gradient(135deg, #2a3f5f 0%, #1a2541 100%)
      - color: white
      - font-size: 24px
      - border-radius: 16px
  tap_action:
    action: call-service
    service: script.goodnight
```

The `script.goodnight` script:

```yaml
goodnight:
  alias: "Goodnight routine"
  sequence:
    - service: light.turn_off
      data:
        entity_id: group.all_lights
    - service: lock.lock
      data:
        entity_id: lock.front_door  # haven't installed yet — coming
    - service: climate.set_temperature
      data:
        entity_id: climate.ecobee_main_floor
        temperature: 65
    - service: notify.mobile_app_luke_iphone
      data:
        message: "Goodnight routine ran"
```

The five-year-old taps "Goodnight 🌙" before bed. House goes dark, thermostat drops, I get a confirmation. Best feature in the house this year.

## What I'm doing next

- **A camera grid view** for the (eventual) 4-camera setup. The picture-glance card works for one; need a custom card for a 2×2 grid.
- **A floorplan-overlay dashboard** using a custom card called `floorplan-card`. SVG of my house floorplan with sensor states overlaid. Project for the summer.
- **Per-room scene buttons** organized by room.
- **An automation status panel** — list of all active automations with last-run timestamps + a kill-switch toggle. Useful for debugging.

## What dashboards changed

Before: voice + phone-app + occasional ad-hoc curl-based scripts.

After: family interacts with the smart home through *one surface*. The dashboard. The Echoes and Google Homes still get used for "set a timer," "play music," "what's the weather" — but anything device-control routes through Lovelace.

The dashboard also became a debugging tool. When something doesn't work, the first place I look is the dashboard's sensor states. Door sensor not reporting? Visible immediately. Aqara device dropped off Zigbee? Visible immediately. The wall display is also the operational dashboard.
