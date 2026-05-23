---
title: "Wemo plugs and the multi-vendor app problem"
date: 2013-06-22T14:00:00-04:00
category: tools
tags:
  - smart-home
  - wifi
  - wemo
  - upnp
  - soap
notebook: smart-home-iot-journey
notebookOrder: 5
excerpt: "I now have a Wemo Insight plug controlling the coffee maker. The Wemo app is fine for the plug. It can't see my Hue bulbs. The multi-vendor app problem starts here."
pullquote: "Three apps open just to turn off the kitchen lights and the coffee maker. There's a startup waiting for the unification problem."
---

Wemo Insight Switch arrived this morning. Plugs into a wall outlet, the coffee maker plugs into it, install the Wemo app, find the new SSID `WemoNet.xxxxxx`, join it, hand over home WiFi credentials, switch back, online. Eight steps. Twelve minutes.

The plug works. The Wemo app works. The Wemo app cannot see my Hue bulbs. The Hue app cannot see my Wemo plug. I now have two apps, two clouds, zero shared state.

This is the problem that's going to drive everything else for the next two years.

## Wemo on the wire

I left tcpdump running while commissioning the plug. The traffic is illuminating.

**Discovery — UPnP SSDP** (per the [WiFi primer](/blog/wifi-as-smart-home-transport-the-always-on-tax/)):

```
M-SEARCH * HTTP/1.1
HOST: 239.255.255.250:1900
MAN: "ssdp:discover"
ST: urn:Belkin:device:**
MX: 2
```

Plug responds:

```
HTTP/1.1 200 OK
LOCATION: http://192.168.1.155:49153/setup.xml
ST: urn:Belkin:device:insight:1
USN: uuid:Insight-1_0-221404K1101...
SERVER: Unspecified, UPnP/1.0, Unspecified
```

The app then GETs `setup.xml`, which describes the plug's services (`BasicEvent`, `InsightEvent`, `MetaInfo`, etc.) and their SOAP control endpoints.

**Control — SOAP over HTTP:**

```xml
POST /upnp/control/basicevent1 HTTP/1.1
Host: 192.168.1.155:49153
Content-Type: text/xml; charset="utf-8"
SOAPACTION: "urn:Belkin:service:basicevent:1#SetBinaryState"

<?xml version="1.0" encoding="utf-8"?>
<s:Envelope xmlns:s="http://schemas.xmlsoap.org/soap/envelope/" 
            s:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/">
  <s:Body>
    <u:SetBinaryState xmlns:u="urn:Belkin:service:basicevent:1">
      <BinaryState>1</BinaryState>
    </u:SetBinaryState>
  </s:Body>
</s:Envelope>
```

SOAP. In 2013. The protocol's been considered antiquated for five years. But it's well-documented (Wemo's UPnP descriptors are public), works on the LAN, and Belkin's API is at least *callable from a script*. Better than what most cheap WiFi vendors are doing.

## A minimum-viable Wemo client in Python

```python
import requests

WEMO_IP = "192.168.1.155"
WEMO_PORT = 49153
SOAP_ACTION = "urn:Belkin:service:basicevent:1#SetBinaryState"

def wemo_set(state):
    body = f"""<?xml version="1.0"?>
<s:Envelope xmlns:s="http://schemas.xmlsoap.org/soap/envelope/" 
            s:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/">
  <s:Body>
    <u:SetBinaryState xmlns:u="urn:Belkin:service:basicevent:1">
      <BinaryState>{1 if state else 0}</BinaryState>
    </u:SetBinaryState>
  </s:Body>
</s:Envelope>"""
    headers = {
        "Content-Type": 'text/xml; charset="utf-8"',
        "SOAPACTION": f'"{SOAP_ACTION}"',
    }
    r = requests.post(
        f"http://{WEMO_IP}:{WEMO_PORT}/upnp/control/basicevent1",
        data=body, headers=headers, timeout=3.0,
    )
    return r.status_code

# Turn coffee maker on
wemo_set(True)
```

The Insight model also reports **power consumption** — useful for "did I leave the coffee maker on" automations:

```python
def wemo_insight():
    # action: GetInsightParams
    # returns: "1|1390000000|600|...|180|2400|0.234"
    # fields: state | last_change | onfor_today | ... | currentpower_mW | todaympower_mW | average_kwh
    ...
```

Power readings update every second. The Insight has decent calibration (within 5% of a Kill-a-Watt meter I checked against).

## What works

- **Local control via SOAP**: I can hit the plug from a Python script with no Belkin cloud involvement at all. SOAP is verbose; it's just HTTP.
- **Discovery**: UPnP works reliably on my home network. The plug shows up `< 1` second after powering on.
- **Schedules on the plug itself**: it has an internal RTC, syncs to NTP. Schedules survive router reboots.

## What doesn't

- **Stability**: drops off WiFi about once a week. Factory reset and re-pair required to recover. Belkin's WiFi stack is not industrial-grade.
- **Vendor sprawl**: Wemo app is decent for Wemo. It can't see Hue. The Hue app can't see Wemo. I have two apps for what should be one room of automation.
- **Cloud dependency for off-LAN control**: if I want to turn off the coffee maker from my office, I need Belkin's cloud. It's been down twice in six months.
- **Idle draw is real**: ~1.2 W constant for the Insight plug. Acceptable for one plug; concerning at fleet scale.

## The multi-vendor problem, articulated

Today's state: three apps to control my house — Hue (3 bulbs), Wemo (1 plug), my router. Each app has its own:

- Authentication system (Hue uses a bearer token, Wemo uses a Belkin account, router is plain HTTP basic auth).
- Discovery mechanism (Hue config endpoint, Wemo UPnP, router static IP).
- Concept of "room" / "scene" / "device" (Hue has scenes, Wemo has timers, router has nothing).

This isn't going to scale to ten devices. Or five.

I see three candidates for the unifier:

1. **IFTTT** — shipping in 2010, web-based "if this then that," cross-vendor recipes. Latency is poor (5-15 s) but it's the only thing that works today. Next post.
2. **SmartThings** — startup, Kickstarter just shipped to backers, hub-based, dual-radio (Zigbee + Z-Wave). Pre-Samsung-acquisition; retail launch pending.
3. **Apple HomeKit** — rumored. No product yet. Apple's smart-home story is opaque.

Whichever wins, **the multi-vendor problem is the real product opportunity of the next two years**. Vendors aren't going to solve it — they're causing it.

## What's next

Trying IFTTT as the unifier. Spoiler: it works, slowly.
