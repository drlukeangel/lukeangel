---
title: "Humidity-triggered bathroom fans — the daily automation"
date: 2019-10-12T09:00:00-04:00
category: tools
tags:
  - smart-home
  - home-assistant
  - humidity
  - fan
  - automation
series: smart-home-iot-journey
seriesOrder: 30
excerpt: "Four years of humidity-triggered bathroom fan automation. Three different sensors. Two different fan controllers. One algorithm that finally works."
pullquote: "Most bathroom fan switches are dumb timers. The fan needs to run until humidity is below the bedroom's level — not for a fixed 15 minutes. Dewpoint-targeting beats time-based by every measure."
---

The humidity-triggered bathroom fan automation has been running in some form since October 2015. It's evolved through three sensors and two fan controllers. The current version, finally, works correctly.

## The wrong way to do this — fixed timers

Most "smart" bathroom fan switches are just digital timers. Push the button, fan runs for 20 minutes, turns off. This is what came with my house.

The problems:

- **Fixed time doesn't account for weather.** A 20-minute fan run in winter (cold outside, low humidity) overshoots — the bathroom is dry in 8 minutes and the fan runs another 12 wasting energy and noise.
- **Fixed time doesn't account for shower duration.** Five-minute shower vs 25-minute shower: very different post-shower humidity load. The 25-minute shower can leave the bathroom still at 80% RH after a 20-minute fan run.
- **Doesn't run when nobody pushes the button.** Someone leaves a damp towel on the floor → no button push → humidity sits at 70% all day → mold starts on the grout.

A humidity-sensing automation does all three correctly.

## Sensors I've used

**v1 (2015): Aeotec Multisensor 6.**
- USB-powered, 5-minute reporting interval.
- 5-minute reporting is the problem — humidity changes fast in a bathroom (10% RH per minute is normal during a shower). Fan response lagged behind the actual humidity by up to 5 minutes.

**v2 (2017): Aqara temperature/humidity sensor WSDCGQ11LM.**
- Battery-powered, faster reporting (default 30s when humidity is changing).
- Better, but the sensor is small and tends to read a few percent off — usually reads 5% higher than reality because it's mounted near the shower.

**v3 (2019, current): Sensirion SHT31 on a Wemos D1 Mini, MQTT to HA.**
- DIY. Calibrated SHT31 sensor (±2% RH accuracy).
- ESP-based, reports every 5 seconds to HA's MQTT broker.
- Cost: $8 total. Cheaper than either commercial option, more accurate, much faster.

```c
// Wemos D1 Mini sketch (essentials)
#include <ESP8266WiFi.h>
#include <PubSubClient.h>
#include "Wire.h"
#include "Adafruit_SHT31.h"

const char* MQTT_HOST = "192.168.1.10";  // Pi running HA + Mosquitto
const char* MQTT_TOPIC = "bathroom/sht31";

Adafruit_SHT31 sht = Adafruit_SHT31();
WiFiClient wifi;
PubSubClient mqtt(wifi);

void setup() {
  WiFi.begin("home-iot", "..."); // dedicated IoT VLAN
  Wire.begin(D2, D1);
  sht.begin(0x44);
  mqtt.setServer(MQTT_HOST, 1883);
}

void loop() {
  if (!mqtt.connected()) mqtt.connect("bathroom-sht31");
  
  float t = sht.readTemperature();
  float h = sht.readHumidity();
  
  char payload[64];
  snprintf(payload, 64, "{\"temp\":%.1f,\"humidity\":%.1f}", t, h);
  mqtt.publish(MQTT_TOPIC, payload);
  
  delay(5000);  // every 5s
}
```

HA's MQTT integration auto-discovers this when configured correctly:

```yaml
mqtt:
  sensor:
    - name: "Bathroom Temperature"
      state_topic: "bathroom/sht31"
      value_template: "{{ value_json.temp }}"
      unit_of_measurement: "°C"
    - name: "Bathroom Humidity"
      state_topic: "bathroom/sht31"
      value_template: "{{ value_json.humidity }}"
      unit_of_measurement: "%"
```

## Fan controllers I've used

**v1: GE Z-Wave 12722 switch** (a regular light-switch wired to the fan circuit).
- Z-Wave Plus, works fine, but it's a relay — fan is either on or off at full speed.

**v2 (current): Lutron Caseta PD-5NE fan controller.**
- Specifically for variable-speed bathroom fans.
- Three speed levels.
- Same ClearConnect Type A protocol as my other Caseta switches — local-fast control.
- $80.

Variable-speed lets the fan ramp up during peak humidity and down as it clears — quieter on average + lower energy use.

## The algorithm — dewpoint-targeting

Bathrooms grow mold when relative humidity stays above ~60% for extended periods. But RH alone isn't quite the right metric — what matters is dewpoint differential between the bathroom and the rest of the house.

If the bathroom is at 75% RH at 24°C, dewpoint is ~19°C. The bedroom next door is at 45% RH at 21°C, dewpoint ~9°C. The 10°C dewpoint differential means moisture migrates from the bathroom to the bedroom walls and condenses on the cooler-side wall surface — that's where mold grows.

The automation targets **bathroom dewpoint ≤ bedroom dewpoint + 3°C**:

```yaml
sensor:
  - platform: template
    sensors:
      bathroom_dewpoint:
        value_template: >
          {% set t = states('sensor.bathroom_temperature') | float %}
          {% set h = states('sensor.bathroom_humidity') | float %}
          {{ (t - (100 - h) / 5) | round(2) }}
      bedroom_dewpoint:
        value_template: >
          {% set t = states('sensor.master_bedroom_temperature') | float %}
          {% set h = states('sensor.master_bedroom_humidity') | float %}
          {{ (t - (100 - h) / 5) | round(2) }}
      bathroom_dewpoint_delta:
        value_template: >
          {{ (states('sensor.bathroom_dewpoint') | float
              - states('sensor.bedroom_dewpoint') | float) | round(2) }}

automation:
  - alias: "Bathroom fan — humidity"
    trigger:
      - platform: state
        entity_id: sensor.bathroom_dewpoint_delta
    action:
      - choose:
          - conditions:
              - condition: numeric_state
                entity_id: sensor.bathroom_dewpoint_delta
                above: 5
            sequence:
              - service: fan.set_speed
                data:
                  entity_id: fan.bathroom
                  speed: "high"
          - conditions:
              - condition: numeric_state
                entity_id: sensor.bathroom_dewpoint_delta
                above: 3
              - condition: numeric_state
                entity_id: sensor.bathroom_dewpoint_delta
                below: 5
            sequence:
              - service: fan.set_speed
                data:
                  entity_id: fan.bathroom
                  speed: "medium"
        default:
          - service: fan.turn_off
            data:
              entity_id: fan.bathroom
```

The fan runs at high when dewpoint differential > 5°C (active shower), medium when 3-5°C (post-shower drying), off below 3°C (normal residual humidity).

## Side benefits

- **Energy use down.** The fan runs ~12 minutes per shower instead of the 20-30 minutes the dumb timer would have. Combined with variable-speed, the fan's monthly kWh dropped by ~60%.
- **The bathroom is quieter.** Variable-speed fan at low is whisper-quiet; the old single-speed fan at full was noticeable from the master bedroom.
- **Bathroom paint lasts longer.** No more peeling near the shower ceiling.
- **The mirror clears faster** after showers — because the fan ramps up during the peak rather than running constant.

## What this changed about the platform

This was the first automation where the *sensor data quality* was the limiting factor. The Aeotec Multisensor 6 was technically capable; its 5-minute reporting was the wrong shape for the problem.

Moving to a DIY ESP-based sensor reporting every 5 seconds changed the automation from "best effort, mediocre" to "actually correct."

Pattern I'm taking forward: when an automation isn't working, the first place to look is *the sensor's reporting cadence*, not the automation logic.

## What's next

- **A second SHT31 in the kid's bathroom.** Same automation, separate fan.
- **An outdoor SHT31** to measure dewpoint outside. When outside dewpoint > indoor, opening windows would *add* moisture; bathroom fan should not vent to outdoors during high outdoor dewpoint (humid summer day). Adds an outdoor-dewpoint condition to the automation.
- **Move to ESPHome** instead of hand-rolled Wemos sketches. ESPHome's YAML-based ESP firmware is more maintainable for the dozen or so DIY sensors I'm planning.
