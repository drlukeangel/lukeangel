// Surgical metadata trim. Each entry is { slug: { title?, excerpt? } } where the new
// title is ≤65 chars and the new excerpt is ≤200 chars. Voice: Luke's — terse,
// dry, slight humor. Each replacement does EXACT string match on the existing
// frontmatter value to avoid touching anything else.

import fs from 'node:fs';
import path from 'node:path';
import yaml from 'js-yaml';

const trims = {
  '2013-in-review-and-2014-forecast': {
    title: '2013 review — three vendors, one annoyed homeowner',
  },
  '2014-in-review-and-2015-forecast': {
    title: '2014 review — SmartThings + Alexa change everything',
    excerpt: 'Big year. SmartThings + Samsung happened, Echo arrived, Lutron Caseta solved the no-neutral problem, HomeKit got announced.',
  },
  '2015-in-review-and-2016-forecast': {
    title: '2015 review — voice + HomeKit land. Security starts',
    excerpt: 'Echo went GA, Alexa Skills Kit shipped, HomeKit got real with iOS 9, first piece of a security system built.',
  },
  '2016-in-review-and-2017-forecast': {
    title: '2016 review — Google Home, HomeKit, Hue automation',
    excerpt: 'Google Home shipped (predicted), Hue Motion shipped (predicted), Apple\'s HomeKit hub didn\'t (missed). 2015 forecast scored 88%.',
  },
  '2017-in-review-and-2018-forecast': {
    title: '2017 review — Home Assistant lands, cheap Zigbee opens',
    excerpt: 'HA on the Pi. Z-Wave + Zigbee local. Six Aqara door sensors. SmartThings hub heading to the spare-parts drawer.',
  },
  '2018-in-review-and-2019-forecast': {
    title: '2018 review — Lovelace, leak shutoff, smoke + CO',
    excerpt: 'HA Lovelace shipped (predicted). HomePod shipped — mediocre (predicted). Water shutoff + smoke / CO on the platform (predicted).',
  },
  '2019-in-review-and-2020-forecast': {
    title: '2019 review — local-first arrives, security maturing',
    excerpt: 'BLE presence finally works. Glass-break sensors caught the failure mode contact sensors miss. The kid\'s bedroom dashboard joined the kitchen.',
  },
  '2020-in-review-and-2021-forecast': {
    title: '2020 review — local-first arrived early, alarm landed',
    excerpt: 'The pandemic year. Internet outages cost more, local-first paid off. Z2M migration done. Z-Wave JS replaced OpenZWave. Yale Assure lock — finally.',
  },
  '2021-in-review-and-2022-forecast': {
    excerpt: 'Five PoE cameras + one WiFi cam, all routing through Frigate + Coral. The doorbell experience finally landed. Wink folded for real.',
  },
  '2022-in-review-and-2023-forecast': {
    title: '2022 review — Matter shipped, LoRa garden worked',
    excerpt: 'Matter 1.0 ratified, LoRa garden automation working, Frigate matured. House sale process started — we\'re building.',
  },
  '2023-in-review-and-2024-forecast': {
    title: '2023 review — built the house, kitchen has an OS',
    excerpt: 'Construction finished. Move-in October. Family Hub fridge running. 42 Cat6 drops paying off already. 2022 forecast scored 85%.',
  },
  '2024-in-review-and-2025-forecast': {
    title: '2024 review — Bespoke kitchen, Frame TV, Matter bridges',
    excerpt: 'Full Samsung Bespoke kitchen + laundry. Frame TV as household display. Three Matter bridges live. EV charger installed.',
  },
  '2025-in-review-and-2026-forecast': {
    title: '2025 review — Edge drivers local, robots choreographed',
    excerpt: 'Final year-in-review of the series, for now. SmartThings Edge drivers finally local. Frame TV + appliances genuinely cooperating.',
  },
  'amazon-echo-arrives-alexa-lights-first-voice-automation': {
    title: 'Amazon Echo arrives — Alexa, lights, first voice automation',
  },
  'aqara-zigbee-sensors-at-scale': {
    title: 'Aqara Zigbee door/window sensors at scale — $10 each',
    excerpt: 'Forecast #4 hit: Aqara/Xiaomi Zigbee sensors available in the US (via AliExpress). Six door/window sensors ordered.',
  },
  'aeotec-multisensor-6-five-sensors-one-zwave': {
    excerpt: 'Aeotec shipped Multisensor 6 — motion, temperature, humidity, light, UV, and vibration in one Z-Wave Plus device.',
  },
  'ble-presence-detection-ha-companion-app': {
    title: 'BLE presence detection — HA Companion + iBeacons',
    excerpt: 'iOS 12.2 shipped with better BLE background scan permissions. HA Companion App 2.0 uses them properly. Room-level presence works.',
  },
  'bringing-legacy-devices-onto-matter': {
    excerpt: 'Two years after Matter 1.0, the legacy-device bridge story is finally usable. Aqara M2 bridges Aqara Zigbee. Hue bridge bridges Hue.',
  },
  'building-first-connected-product': {
    title: 'Building a connected hardware product — month one',
  },
  'building-security-alarm-panel-in-ha': {
    excerpt: 'Five years of piecemeal security automations. Six door sensors, two glass-break, six vibration, two presence signals. Tonight all of it became one panel.',
  },
  'cutting-my-teeth-on-medical-iot-products': {
    title: 'Two years on medical IoT — the platform retrospective',
    excerpt: 'September 2017 to September 2019 — timeline of building the API platform behind a connected-health portfolio, things I got right, things I got wrong.',
  },
  'designing-a-connected-consumer-health-device-with-ble-4-2': {
    title: 'Designing a connected health device with BLE 4.2',
    excerpt: 'Taking over the API platform behind a connected toothbrush line means first reckoning with what BLE 4.2 actually offers — and what it doesn\'t.',
  },
  'designing-new-build-for-smartthings-day-one': {
    title: 'Designing the new build for SmartThings from day one',
    excerpt: 'Construction starts in six weeks. Plans approved last month, framing scheduled for May. Tonight I finished the connected-home wire spec.',
  },
  'doorbell-camera-on-google-home-hub-display': {
    title: 'Doorbell camera on the Google Home Hub display',
    excerpt: 'Reolink doorbell PoE camera + WebRTC bridge + Google Home Hub display + Frigate-detected person events. When someone rings, every display shows them.',
  },
  'first-home-assistant-install-yaml-configs': {
    title: 'First Home Assistant install — YAML and local-first',
    excerpt: 'Raspberry Pi 3, microSD, Hass.io image flashed in eight minutes. Home Assistant 0.49 is on the local network. First integrations: Hue, SmartThings.',
  },
  'first-samsung-family-hub-fridge': {
    title: 'First Samsung Family Hub fridge — kitchen has an OS',
    excerpt: 'Samsung Bespoke 4-Door Flex with Family Hub installed. 21" touchscreen on the front door. SmartThings integrated. Talks to the Frame TV.',
  },
  'first-security-automation-door-presence-smartthings': {
    title: 'First security automation — door/window + presence',
    excerpt: 'Six months on SmartThings. Starter kit\'s door/window sensors and Arrival Sensors sat in a drawer waiting for the first useful automation.',
  },
  'four-and-a-half-years-of-connected-products': {
    title: '4.5 years of connected products — what I\'d do again',
    excerpt: 'Across two connected hardware products and 4.5 years of active build — a BLE-connected consumer-health platform 2017-2019, a payment-and-identity cart 2023-2025.',
  },
  'frame-tv-as-household-display-surface': {
    title: 'Frame TV as household display — art, dashboards, hub',
    excerpt: 'The 65" Frame TV has been the great room\'s center for eight months. Art display when off, TV when on, SmartThings hub always.',
  },
  'frame-tv-kitchen-appliance-sync': {
    title: 'Frame TV + kitchen appliance sync — kitchen talks',
    excerpt: 'Eighteen months into the full Bespoke ecosystem. Fridge, oven, dishwasher, washer/dryer, Frame TV, and SmartThings hub now genuinely cooperate.',
  },
  'frigate-coral-object-detection-cookbook': {
    title: 'Frigate + Coral cookbook — eight months of tuning',
    excerpt: 'Eight months of Frigate tuning. Confidence thresholds, masks, zones, motion masks, retained / discarded events. The cookbook of what to set.',
  },
  'from-eight-device-apis-to-one-entity-domain-model': {
    excerpt: 'The connected-health portfolio I inherited has eight separate device APIs in production. Each has its own user model, its own session contract.',
  },
  'glass-break-and-vibration-sensors': {
    excerpt: 'Two Ecolink Z-Wave glass-break detectors plus six Aqara vibration sensors. The first sensor class that catches what contact sensors miss.',
  },
  'google-home-two-voice-assistants-one-house': {
    excerpt: 'Google Home launched November 4. Mine arrived three days ago. Echo and Google Home in the same house, both listening for wake words.',
  },
  'hipaa-fda-class-i-and-what-counts-as-medical-device-data': {
    excerpt: 'Before the API platform can matter, we have to know what kind of regulated product we\'re building — and which categories of data trigger which regimes.',
  },
  'home-assistant-lovelace-dashboards': {
    title: 'Home Assistant Lovelace — building kitchen wall display',
    excerpt: 'HA 0.72 shipped Lovelace as the new default UI. Six months of waiting; six weekends to build the kitchen wall-mounted dashboard.',
  },
  'homekit-and-the-mfi-chip-moat': {
    title: 'HomeKit and the MFi chip moat — the hardware tax',
    excerpt: 'Nine months with HomeKit (since iOS 9). Three HomeKit devices working, ten more I wish would work but can\'t. The MFi chip is the moat.',
  },
  'hue-motion-sensor-purpose-built-lighting-automation': {
    excerpt: 'Philips finally shipped the Hue Motion sensor. Battery-powered, Zigbee Light Link, joins the Hue bridge natively. First hardware that lets us automate without rules.',
  },
  'humidity-triggered-bathroom-fans': {
    title: 'Humidity-triggered bathroom fans — the daily automation',
    excerpt: 'Four years of humidity-triggered bathroom fan automation. Three different sensors. Two different fan controllers. One algorithm that finally works.',
  },
  'iot-predictions-2020': {
    excerpt: 'AirPods Pro launched and instantly sold out, Google bought Fitbit, and Matter (still CHIP) was announced. The 2019 score sheet plus 2020 bets.',
  },
  'iot-predictions-2021': {
    excerpt: 'Pandemic-fueled IoT surge crushed forecasts, Apple Watch SE became the gateway drug, and Sonos still hasn\'t shipped headphones. 2020 scored.',
  },
  'iot-predictions-2024': {
    excerpt: 'Vision Pro got announced as forecast, Matter expansion shipped, Humane shipped vapor. 2023 score sheet plus the year AI hardware proves hard.',
  },
  'iot-predictions-2026': {
    excerpt: 'Ray-Ban Meta Display landed as the product of the year, Humane got vacuumed up by HP, Vision Pro 2 cheaper finally shipped. 2025 scored.',
  },
  'light-switches-wemo-failed-lutron-won-no-neutral-nightmare': {
    title: 'Light switches — Wemo failed, Lutron won, no-neutral pain',
  },
  'matter-1-0-ships-protocol-primer': {
    excerpt: 'CSA ratified Matter 1.0 on October 4 and Apple, Google, Amazon, and Samsung committed support on November 3. After ten years of standards drama.',
  },
  'migrating-smartthings-security-to-home-assistant': {
    excerpt: 'Three months on Home Assistant. The Z-Wave stick arrived in September; door sensors moved off SmartThings onto direct Z-Wave on the Pi.',
  },
  'outdoor-watering-with-soil-moisture': {
    title: 'Outdoor watering automation — the LoRa-and-rain story',
    excerpt: 'Six raised garden beds + three planters + a sprinkler zone. Eight soil-moisture sensors on LoRa-WAN. Three valves on Z-Wave.',
  },
  'philips-hue-gen-1-zigbee-light-link-debut': {
    excerpt: 'Day one. Picked up the Hue starter kit at the Apple Store on launch morning — Philips and Apple did an exclusive launch. Three bulbs, one bridge.',
  },
  'phone-as-gateway-auth-model': {
    title: 'Phone-as-gateway — the auth model for BLE-only devices',
    excerpt: 'A consumer device with no WiFi can\'t authenticate to the cloud directly. The trust model has to bridge two separate auth domains.',
  },
  'picking-the-zigbee-stack-z2m-deconz-zha': {
    excerpt: 'Three options for talking Zigbee to Home Assistant: ZHA (built in), deCONZ (Phoscon-based), Zigbee2MQTT (MQTT-bridged). Trade-offs differ.',
  },
  'poe-cameras-and-frigate-nvr': {
    title: 'PoE cameras + Frigate NVR — local object detection',
    excerpt: 'Four Reolink PoE cameras + Frigate 0.10 + Coral USB Accelerator. Object detection runs locally on the home server at 10 fps per stream.',
  },
  'prd-part-1-hardware-specs': {
    title: 'v2 PRD, Part 1 — hardware specs for a battery device',
    excerpt: 'The PRD I\'m writing before v2 hardware goes into prototyping. Part 1 of three — the hardware spec for a wheeled scanner-and-payment workstation.',
  },
  'prd-part-2-application-and-data': {
    title: 'v2 PRD, Part 2 — applications, data model, cloud',
    excerpt: 'Part 2 of the v2 PRD. What the cart, the customer\'s mobile app, the store-staff tablet, and the ops dashboard each do — plus the entity model.',
  },
  'prd-part-3-identity-and-compliance': {
    title: 'v2 PRD, Part 3 — identity, payment, PII, compliance',
    excerpt: 'Part 3 of the v2 PRD. The identity model, the payment-data-handling architecture, the PII classification scheme, and the compliance threat model.',
  },
  'ripping-out-vendor-clouds-local-first-ha': {
    excerpt: 'Three years on HA. A weekend audit + migration: every device on a vendor cloud got either replaced or migrated to a local integration.',
  },
  'robots-roomba-braava-daily-routine': {
    title: 'Robots in the routine — Roomba + Braava choreography',
    excerpt: 'Five years of iRobot Roomba + Braava in the house. The vacuum is a Roomba i7+; the mop is a Braava jet m6. Both join the home routine via SmartThings.',
  },
  'samsung-oven-dishwasher-washer-dryer': {
    title: 'Samsung Bespoke oven + dishwasher + washer/dryer',
    excerpt: 'Three more Bespoke appliances installed. Slide-in induction oven, dishwasher, washer/dryer combo. All on SmartThings, all on the Family Hub fridge.',
  },
  'smartthings-edge-drivers-local-first-samsung': {
    excerpt: 'Samsung\'s Edge driver framework matured into a real platform. Custom Lua-based drivers run locally on the SmartThings hub (the Family Hub fridge).',
  },
  'smartthings-starter-kit-unboxing-zwave-zigbee-first-hub': {
    title: 'SmartThings starter kit unboxing — first credible hub',
    excerpt: 'Samsung just closed the SmartThings acquisition two weeks ago. The hub they ship today (Kickstarter-era v1 design) is the first credible all-in-one.',
  },
  'smoke-detector-integration-cant-fake-this-safety': {
    title: 'Smoke detector integration — alerts that actually matter',
    excerpt: 'First Alert ZCOMBO smoke + CO detector on Z-Wave. Three of them throughout the house, replacing the dumb battery-only smokes that were 12 years old.',
  },
  'structured-wiring-conduit-poe-backbone': {
    title: 'Structured wiring + conduit + PoE backbone for framing',
    excerpt: 'Framing finished last week. Today I walked the house with the low-voltage installer and signed off on every Cat6 run, every conduit, every PoE drop.',
  },
  'thirteen-years-on-long-arc-retrospective': {
    excerpt: 'Thirteen years since the first Hue bulb on the dining-room pendant. Two houses, ten major platform transitions, ~250 connected devices today.',
  },
  'water-leak-sensors-automatic-shutoff': {
    title: 'Water leak sensors + automatic shutoff — $800 insurance',
    excerpt: 'Five Z-Wave water leak sensors (basement, laundry, dishwasher, under both bathroom sinks) plus a Z-Wave motorized ball valve on the main.',
  },
  'where-hardware-specs-meet-api-contracts': {
    title: 'Where hardware specs meet API contracts — the room',
    excerpt: 'Connected hardware products live or die in the cross-functional meeting where hardware, firmware, API, mobile, and ops engineers negotiate.',
  },
  'wireless-cameras-and-bandwidth-tradeoff': {
    title: 'Wireless cameras and bandwidth — when WiFi cams work',
    excerpt: 'Three months ago I\'d have said WiFi cameras are a bad idea. Then the kids needed a temporary camera in the garage where there\'s no PoE.',
  },
  'wifi-as-smart-home-transport-the-always-on-tax': {
    excerpt: 'A year on SmartThings + Hue. WiFi smart bulbs and plugs sounded great — until the router was rebooted and 30 devices went offline at once.',
  },
  'zwave-vs-zigbee-vs-wifi-year-with-smartthings': {
    title: 'Z-Wave vs Zigbee vs WiFi — a year on SmartThings',
    excerpt: 'A year living with all three protocols on the SmartThings hub plus Hue\'s separate Zigbee bridge. The frequency bands, the mesh behaviors.',
  },
  'ota-firmware-over-bluetooth-pushing-the-rom-through-the-phone': {
    title: 'OTA firmware over Bluetooth — pushing through the phone',
    excerpt: 'The hardest single problem on the connected platform is firmware updates. The device has no WiFi, no internet, no way to download anything on its own.',
  },
};

let updated = 0;
let untouched = 0;
let mismatches = 0;

for (const [slug, changes] of Object.entries(trims)) {
  const file = `src/content/blog/${slug}.md`;
  if (!fs.existsSync(file)) {
    console.log(`SKIP (not found): ${slug}`);
    continue;
  }
  let txt = fs.readFileSync(file, 'utf8');
  const m = txt.match(/^(---\r?\n)([\s\S]*?)(\r?\n---)/);
  if (!m) {
    console.log(`SKIP (no frontmatter): ${slug}`);
    continue;
  }
  const head = m[1];
  const front = m[2];
  const tail = m[3];

  // Parse the frontmatter to get current title + excerpt
  let fm;
  try { fm = yaml.load(front); } catch (e) {
    console.log(`SKIP (YAML err): ${slug} ${e.message}`);
    continue;
  }
  if (!fm) continue;

  let newFront = front;
  let changed = false;

  if (changes.title && fm.title && changes.title !== fm.title) {
    // Replace the title value line. The current title may be quoted or unquoted.
    // We do a YAML-safe re-emit of title only.
    const safeNew = JSON.stringify(changes.title); // double-quoted, safe
    const titleLineRe = /^(title:\s*)(.+)$/m;
    if (titleLineRe.test(newFront)) {
      newFront = newFront.replace(titleLineRe, `$1${safeNew}`);
      changed = true;
    } else {
      console.log(`WARN: no title line in ${slug}`);
    }
  }

  if (changes.excerpt && fm.excerpt && changes.excerpt !== fm.excerpt) {
    const safeNew = JSON.stringify(changes.excerpt);
    // Excerpt may be a folded scalar (`excerpt: >-` followed by indented lines)
    // or a single line. Match either.
    const excerptRe = /^excerpt:\s*(>-|>|\|-|\|)?[ \t]*\r?\n(?:[ \t]+.+\r?\n)+|^excerpt:\s*.+$/m;
    if (excerptRe.test(newFront)) {
      newFront = newFront.replace(excerptRe, `excerpt: ${safeNew}`);
      changed = true;
    } else {
      console.log(`WARN: no excerpt line in ${slug}`);
    }
  }

  if (changed) {
    fs.writeFileSync(file, head + newFront + tail + txt.slice(m[0].length));
    updated++;
    console.log(`updated: ${slug}`);
  } else {
    untouched++;
  }
}

console.log(`\n${updated} files updated, ${untouched} untouched.`);
