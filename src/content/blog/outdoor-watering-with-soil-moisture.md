---
title: "Outdoor watering automation — the LoRa-and-rain story"
date: 2022-05-21T11:00:00-04:00
category: tools
tags:
  - smart-home
  - esphome
  - lora
  - irrigation
  - sensors
notebook: smart-home-iot-journey
notebookOrder: 40
excerpt: "Six raised garden beds + three planters + a sprinkler zone. Eight soil-moisture sensors on LoRa-WAN. Three valves on Z-Wave."
pullquote: "The sprinkler runs only when soil is dry AND no rain is expected in the next 6 hours. Sounds simple. Took three iterations and two soaked planters before the algorithm was actually right."
---

The vegetable garden is at the far corner of the back yard. ~40m from the house, behind a 6-foot privacy fence. WiFi doesn't reach reliably — measured signal strength below -85 dBm at the planters. Zigbee doesn't reach at all.

LoRa does. This is what I built.

## The hardware

**Soil-moisture sensors (8×):**
- Capacitive soil-moisture probe (not resistive — resistive corrodes in 6-12 months underground).
- Each connected to a RAK Wireless **RAK4631** WisBlock module — ARM Cortex-M4F + Semtech SX1262 LoRa radio (915 MHz US ISM band).
- Battery: 2× AA lithium (3000 mAh combined). Sensor reports every 30 minutes; expected life 2+ years.
- Custom enclosure: 3D-printed PETG, IP54 with foam seals around the probe entry. Total per-sensor cost: $35.

**LoRa gateway:**
- **RAK Wireless RAK7268 indoor gateway**. Connects to home WiFi, talks to the sensors over LoRa.
- ~$200.
- Range tested: 200m through 3 wood-frame buildings + the privacy fence. Plenty.
- Acts as a LoRaWAN concentrator. Sensors join as Class A devices (uplink-only, downlink during the receive windows after uplink).

**Valves (3×):**
- Orbit B-Hyve Z-Wave-compatible valve. Connects to standard 3/4" hose threads. Battery-powered (4× AA).
- Z-Wave Plus. Local control via the Z-Stick.
- $75 each.

Total hardware: $445 for the irrigation system. Compare to professional irrigation controller + sensors: $1500+.

## The protocol — LoRaWAN

LoRa is the long-range, low-power, low-throughput wireless protocol that fills the gap where Zigbee can't reach and WiFi is overkill. Key specs:

- **915 MHz ISM band (US)**. No license required. Different from WiFi/Zigbee 2.4 GHz — uncongested.
- **Range**: typical 1-5 km in suburban environments, line-of-sight further.
- **Data rate**: 0.3-50 kbps depending on spreading factor. Slow.
- **Battery**: years on a coin cell for periodic sensor uplinks.
- **Topology**: star (sensors → gateway). No mesh.
- **Cost**: $5-15 per LoRa module in volume.

LoRaWAN adds a network-layer spec on top of the LoRa PHY:

- **OTAA** (Over-The-Air-Activation): sensors join with a DevEUI + AppKey, get session keys.
- **AES-128 encryption** at the network layer.
- **Class A** (most battery-friendly): uplink, then two short receive windows.
- **Adaptive Data Rate**: gateway tells sensors to use slower/faster rates depending on signal quality.

For my use case (8 sensors uplinking ~5 bytes every 30 min), the bandwidth is laughably overprovisioned. The win is the range.

## The HA integration

RAK gateway publishes sensor uplinks to MQTT. HA's MQTT integration picks them up:

```yaml
mqtt:
  sensor:
    - name: "Garden Bed 1 Moisture"
      state_topic: "rak/sensor/bed1/moisture"
      value_template: "{{ value_json.moisture }}"
      unit_of_measurement: "%"
    - name: "Garden Bed 1 Battery"
      state_topic: "rak/sensor/bed1/battery"
      value_template: "{{ value_json.battery }}"
      unit_of_measurement: "V"

  # × 8 sensors
```

## The watering automation

```yaml
- alias: "Garden bed 1: water if dry and no rain expected"
  trigger:
    - platform: time
      at: "06:30:00"
  condition:
    - condition: numeric_state
      entity_id: sensor.garden_bed_1_moisture
      below: 35   # below 35% volumetric water content = dry
    - condition: template
      value_template: >
        {% set forecast = state_attr('weather.darksky_home', 'forecast') %}
        {% set rain_next_6h = forecast[0:6] | sum(attribute='precipitation', start=0) %}
        {{ rain_next_6h < 5 }}   # < 5mm forecast in next 6h
    - condition: template
      value_template: >
        {% set last_water = states('input_datetime.bed1_last_water') %}
        {% set hours_since = (now() - as_datetime(last_water)).total_seconds() / 3600 %}
        {{ hours_since > 18 }}   # don't water more than once per 18h
  action:
    - service: switch.turn_on
      data:
        entity_id: switch.bhyve_valve_bed1
    - delay: "00:08:00"   # 8 min run
    - service: switch.turn_off
      data:
        entity_id: switch.bhyve_valve_bed1
    - service: input_datetime.set_datetime
      data:
        entity_id: input_datetime.bed1_last_water
        datetime: "{{ now() }}"
```

Three conditions all have to hold:
1. Soil is dry (< 35% VWC).
2. Rain forecast next 6h < 5mm (no point watering if rain coming).
3. Haven't watered in last 18 hours.

If all three pass at 6:30 AM, the valve opens for 8 minutes.

## The disasters that taught me

**Disaster 1** (April): I set up the soil-moisture threshold at 25% (too dry). The system never watered because the sensors were reading slightly higher. Garden tomatoes wilted by mid-May. Adjusted to 35%.

**Disaster 2** (May): Forgot to add the "haven't watered in last 18h" condition. Forecast cleared mid-day, valve opened, ran 8 minutes. Then forecast cleared again at 4 PM (different forecast cycle), valve opened *again*. Bed flooded; soil washed off the lettuce roots.

**Disaster 3** (May): One of the soil sensors malfunctioned and read 5% constantly. Valve opened every morning for a week. Plants drowned. Added an outlier-detection condition to ignore sensors reading suspiciously low.

The algorithm is now:

```
IF soil_moisture < 35% 
   AND soil_moisture > 5%   (outlier guard)
   AND rain_forecast_6h < 5mm
   AND last_water_hours_ago > 18
THEN water for 8 minutes
```

Works.

## What's next

- **A rain-rate sensor at the house.** Currently using Dark Sky forecasts — accurate but lagging real conditions. A tipping-bucket rain gauge ($40, ESP-based with reed switch) would give actual rainfall data.
- **A soil-temperature sensor in the same probe.** Capacitive moisture probes can be combined with a 1-Wire DS18B20 for soil temp. Useful for "is it too cold to germinate seeds?" automations.
- **Solar charging for the LoRa sensors.** Battery life 2+ years is fine, but in-place solar would make them "install and forget."
- **A wider deployment**: front-yard sprinkler zones (currently on a dumb timer), the kid's small playground "is the swing wet?" question.
