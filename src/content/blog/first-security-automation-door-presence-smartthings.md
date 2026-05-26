---
title: "First security automation — door/window + presence"
date: 2015-03-15T20:00:00-04:00
category: tools
tags:
  - smart-home
  - smart-home-security
  - smartthings
  - groovy
notebook: smart-home-iot-journey
notebookOrder: 12
excerpt: "Six months on SmartThings. Starter kit's door/window sensors and Arrival Sensors sat in a drawer waiting for the first useful automation."
pullquote: "The Arrival Sensor is a Bluetooth dongle the size of a key fob with a CR2450 battery. It's also unreliable enough that I'm already planning to replace it with phone-based presence."
cover: "../../assets/blog/first-security-automation-door-presence-smartthings-cover.svg"
coverAlt: "A front door with a contact sensor, a small Bluetooth key-fob beacon, and a phone, all reporting to a hub that decides whether anyone is home — the door-plus-presence security loop."
---

Six months on the [SmartThings hub I bought last August](/blog/smartthings-starter-kit-unboxing-zwave-zigbee-first-hub/). The starter kit's two door/window sensors and one Arrival Sensor have been sitting in a drawer waiting for me to build something with them. Tonight is the night.

## The setup

Two SmartThings Multipurpose sensors:
- Front door (the only frequently-used external door).
- Basement bulkhead (the door I never check but is structurally the most likely intrusion path).

Two SmartThings Arrival Sensors — one on my keychain, one on my wife's.

$200 of gear total. Hub is the centerpiece.

## The SmartApp

First Groovy SmartApp I've deployed to production (= "my house"):

```groovy
definition(
  name: "Door + Presence Security",
  namespace: "luke",
  description: "SMS me if a door opens while nobody is home.",
  category: "Safety & Security"
)

preferences {
  section("Door sensors") {
    input "doors", "capability.contactSensor", multiple: true
  }
  section("Presence sensors") {
    input "presence", "capability.presenceSensor", multiple: true
  }
  section("Notify") {
    input "phone", "phone"
  }
}

def installed() { subscribe(doors, "contact.open", doorOpened) }
def updated()   { unsubscribe(); installed() }

def doorOpened(evt) {
  def home = presence.any { it.currentValue("presence") == "present" }
  if (!home) {
    sendSms(phone, "${evt.device.displayName} opened while nobody home at ${evt.date}")
    log.warn "SECURITY: ${evt.device.displayName} ${evt.date}"
  }
}
```

Twenty lines. Deployed via the SmartThings IDE — web-based Groovy editor that connects to the hub through SmartThings's cloud. Subscribe is local on the hub; the `sendSms` call routes through the cloud.

End-to-end latency: door opens → SMS arrives in ~3-5 seconds. Acceptable for an alert.

## What works

- Both Multipurpose sensors fire reliably on every open/close. Accelerometer adds vibration detection for the "someone's prying the door" edge case (untested, mercifully).
- SMS arrives within seconds when door opens AND nobody home.
- SmartApp survives hub reboots. Hub crashed during a thunderstorm last week, came back up, automation resumed.

## What doesn't (yet)

**Arrival Sensor reliability is bad.** The keyfob is a battery BLE beacon. It pings the hub every 10s when in range. The hub flips presence → not-present if it misses N beacons (configurable; default 60s out of range).

Miss rate is high enough that I'm getting false alarms:

- I'm in the basement, hub is upstairs. Hub thinks I left because the keyfob signal weakens through the floor. I open the basement door coming back up. SMS fires. "Door opened while nobody home." But I am home.
- I'm in the backyard, 30 feet from the hub. Same problem.
- I walk into the bathroom for 15 minutes; the bathroom is on the far side of the house — hub stops seeing the fob.

False-positive rate so far: ~1 false alarm per week. Going to make the household ignore the SMS, which is the wrong outcome.

![Why the Arrival Sensor produces false alarms. The BLE key-fob has a range of only about three metres from the hub, so its "present" bubble covers part of one floor; step into the basement, the backyard, or a far bathroom and the hub stops hearing the beacon and flips you to "not present" — even though you never left. A phone geofence draws a roughly fifty-metre "present" circle around the whole house and yard, so it keeps reporting you home everywhere the key-fob drops out. The gap between the tiny beacon bubble and the house-sized geofence is exactly where the false "door opened while nobody home" alerts come from.](../../assets/blog/smartthings-presence-beacon-vs-geofence.svg)

**The fix:** phone-based presence. SmartThings has an iOS app that can use GPS geofencing to report presence. More accurate (50m geofence vs ~3m beacon for Arrival Sensor), and the phone is in someone's pocket basically always. Downside is the SmartThings app must run in background, which costs battery.

Going to add the phone as a presence sensor next week, demote the Arrival Sensors to secondary signal, combine them with `(phone_present OR arrival_present)` logic.

## What I want next

- Phone geofencing as primary presence.
- Motion sensor (the kit's Zigbee PIR) as a third signal: "if door opens AND no presence AND no motion in last hour → escalate."
- A glass-break sensor for the kitchen patio doors. Aeotec and Ecolink both make Z-Wave models.
- Something louder than SMS. A Z-Wave siren in the basement, maybe. SMS is silent; if someone's actually breaking in and I'm asleep, SMS won't wake me.

This is the first piece of the security arc. Going to layer on more sensors as I trust the platform.

## What I'm wondering

If a thunderstorm takes out my internet, does the automation fail? The SmartApp Groovy execution is cloud-side; the SMS dispatch is cloud-side. Local-only security automation is a problem I want to figure out — probably impossible on SmartThings v1, possibly something to revisit when they ship a beefier hub.

![Where the security automation actually executes. Inside the house, the door sensor fires contact.open and the v1 hub catches it — but the hub only forwards that event up to the SmartThings cloud. The Groovy SmartApp logic, the presence check, and the sendSms call all run in the cloud, which then dispatches the SMS out through a carrier gateway to my phone. The consequence, flagged in red: if the internet drops, the logic never runs and no SMS goes out — the whole alarm is cloud-gated, with nothing surviving locally on the hub.](../../assets/blog/smartthings-groovy-cloud-execution.svg)
