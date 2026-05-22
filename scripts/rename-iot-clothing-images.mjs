#!/usr/bin/env node
// Rename the 31 images in how-does-iot-work-with-the-smart-clothing-market.
// Each image is mapped to its containing section (Nike/Apple, Adidas, Under Armor,
// Samsung, Heddoko, Hexoskin, OMsignal, etc.) and given a descriptive filename plus
// an alt that combines the visual subject with the section's company/product.

import { readFileSync, writeFileSync, renameSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const imageDir = 'public/blog/migrated/2016/10';
const post = 'src/content/blog/how-does-iot-work-with-the-smart-clothing-market.md';

const mapping = [
  ['101816_1407_HowdoesIoTw1.jpg', 'smart-clothing-adidas-numetrex-heart-rate-sports-bra.jpg',
   'Woman wearing an Adidas / NuMetrex smart sports bra with woven heart-rate sensor electrodes — header image for the smart clothing roundup'],
  ['apple-watch-nile.png', 'smart-clothing-nike-apple-watch.png',
   'Custom Apple Watch Nike+ edition — the Nike-branded smartwatch from the Nike/Apple partnership'],
  ['nike-hyperadap.png', 'smart-clothing-nike-hyperadapt-self-lacing-shoe.png',
   'Nike HyperAdapt 1.0 self-tightening shoe — heel sensor triggers automatic lacing with +/- adjustment buttons'],
  ['nikeapp.jpg', 'smart-clothing-nike-plus-app-screenshot.jpg',
   'Nike+ app screenshot — relaunched product-focused app for the connected sneaker and apparel ecosystem'],
  ['nike-patent-shirt.jpeg', 'smart-clothing-nike-patent-shirt-concept-1.jpeg',
   'Patent illustration of a Nike connected shirt concept — embedded sensors woven into the fabric'],
  ['nike-patent-shirt-1.jpeg', 'smart-clothing-nike-patent-shirt-concept-2.jpeg',
   'Second view of the Nike patented smart-shirt concept showing the sensor placement'],
  ['shirt.jpeg', 'smart-clothing-athos-biosignal-monitoring-shirt-emg.jpeg',
   'Athos biosignal-monitoring performance shirt and shorts — 14 EMG, 2 heart-rate, and 2 breathing sensors woven into the fabric'],
  ['adidas2-1.jpg', 'smart-clothing-adidas-micoach-elite-soccer-uniform.jpg',
   'Adidas miCoach Elite soccer uniform — wearable tech base station collecting heart-rate, sweat, and hydration data in real time'],
  ['adidas1.jpg', 'smart-clothing-adidas-micoach-base-station.jpg',
   'Adidas miCoach base station hardware — M2M hub gathering player data on the sidelines'],
  ['under-armor-health-box.png', 'smart-clothing-under-armour-healthbox-connected-fitness.png',
   'Under Armour HealthBox connected fitness system — activity band, heart-rate chest strap, and smart scale bundle ($400)'],
  ['102016_1404_Thebestsmar8.jpg', 'smart-clothing-samsung-rogatis-nfc-smart-suit.jpg',
   'Samsung NFC smart suit built with Rogatis — unlocks phones, swaps business cards, and toggles office/drive modes via the wearer\'s cuff'],
  ['SamsungSmartpary.jpg', 'smart-clothing-samsung-smart-pay-jacket.jpg',
   'Samsung Smart Pay smart-clothing concept — contactless payment functionality embedded in the garment'],
  ['101816_1407_HowdoesIoTw2.jpg', 'smart-clothing-heddoko-biomechanics-3d-smart-shirt.jpg',
   'Heddoko smart shirt — biomechanics tracker that maps body posture in 3D and flags overload on specific muscle groups'],
  ['101816_1407_HowdoesIoTw3.jpg', 'smart-clothing-hexoskin-biometric-smart-shirt.jpg',
   'Hexoskin biometric smart shirt — Italian-fabric machine-washable wearable that tracks heart rate, breathing rate, and sleep'],
  ['omsignalBra.jpg', 'smart-clothing-omsignal-om-bra-running.jpg',
   'OMsignal OM Bra running wearable — records distance, breathing rate, heart rate, and recovery readiness on adjustable smart fabric'],
  ['101816_1407_HowdoesIoTw4.jpg', 'smart-clothing-ralph-lauren-polo-tech-shirt-silver-fibers.jpg',
   'Ralph Lauren Polo Tech Shirt — biosensing silver fibres woven into compression fabric to track calories burned and movement intensity'],
  ['101816_1407_HowdoesIoTw5.jpg', 'smart-clothing-cityzen-sciences-d-shirt-digital.jpg',
   'Cityzen Sciences D-Shirt (Digital Shirt) — French smart garment with embedded microsensors for temperature, heart rate, and workout intensity'],
  ['101816_1407_HowdoesIoTw6.jpg', 'smart-clothing-omsignal-biometric-smartwear.jpg',
   'OMsignal biometric smartwear shirt — woven sensors plus a small black-box module track heart rate and breathing'],
  ['102016_1404_Thebestsmar9.jpg', 'smart-clothing-lyle-and-scott-bpay-contactless-jacket.jpg',
   'Lyle & Scott contactless payment jacket with Barclaycard bPay chip in the right cuff — pay up to £30 contactlessly across 300,000 UK locations'],
  ['101816_1407_HowdoesIoTw7.jpg', 'smart-clothing-athos-emg-fitness-apparel-the-core.jpg',
   'Athos smart fitness apparel — warped-knit shirt and shorts with 14 EMG sensors, heart-rate sensors, and a Core wireless data module'],
  ['lumoRun-SMart.jpg', 'smart-clothing-lumo-run-shorts-running-sensor.jpg',
   'Lumo Run smart running shorts and capris — embedded sensor tracks cadence, ground contact, pelvic rotation, and stride length with live audio coaching'],
  ['102016_1404_Thebestsmar6.jpg', 'smart-clothing-clothing-plus-embedded-sensors.jpg',
   'Clothing+ embedded-sensor garment — Finnish company that produced the first heart-rate-sensing shirt in 1998 and now supplies Adidas, Garmin, and Under Armour'],
  ['101816_1407_HowdoesIoTw8.jpg', 'smart-clothing-gymi-fitness-tracking-shirt.jpg',
   'Gymi Australian smart fitness shirt — sensors throughout the bicep and forearm track heartbeat, reps, and head-to-head duo workouts'],
  ['101816_1407_HowdoesIoTw9.jpg', 'smart-clothing-aiq-kings-metal-fiber-shirt.jpg',
   'AiQ Smart Clothing garment — built on Kings Metal Fiber stainless-steel yarn for durable, machine-washable wearable tech'],
  ['101816_1407_HowdoesIoTw10.png', 'smart-clothing-mimo-smart-baby-onesie-turtle-monitor.png',
   'Mimo Smart Baby onesie with the turtle-shaped sensor monitor — tracks sleep status, breathing, and body position via iPhone or Android'],
  ['101816_1407_HowdoesIoTw11.png', 'smart-clothing-mimo-smart-nursery-app.png',
   'Mimo Smart Nursery companion app screenshot — real-time baby vitals dashboard'],
  ['101816_1407_HowdoesIoTw12.png', 'smart-clothing-owlet-baby-smart-sock-monitor.png',
   "Owlet Baby Care smart sock — slides over baby's foot to alert parents to breathing changes and heart-rate concerns via iPhone"],
  ['101816_1407_HowdoesIoTw13.png', 'smart-clothing-owlet-base-station-bluetooth.png',
   'Owlet Baby Care BaseStation — Bluetooth hub that pairs with the smart sock when the smartphone app is unavailable'],
  ['101816_1407_HowdoesIoTw14.jpg', 'smart-clothing-my-sensible-baby-sensor-onesie.jpg',
   'My Sensible Baby sensor embedded in a baby onesie — low-energy radio monitor for sleep and breathing with a six-month battery'],
  ['101816_1407_HowdoesIoTw15.jpg', 'smart-clothing-monbaby-mondevices-smart-button-monitor.jpg',
   'MonBaby smart-button monitor by MonDevices — Bluetooth 4.0 accelerometer that tracks newborn sleep patterns and orientation (CES 2016 winner)'],
  ['102016_1404_Thebestsmar10.jpg', 'smart-clothing-neopenda-newborn-vital-signs-hat.jpg',
   "Neopenda newborn vital-signs monitor built into a baby hat — measures temperature, heart rate, respiratory rate, and blood oxygen for up to 24 babies on one tablet"],
];

let renamed = 0;
for (const [oldName, newName] of mapping) {
  const oldPath = join(imageDir, oldName);
  const newPath = join(imageDir, newName);
  if (!existsSync(oldPath)) { console.warn(`MISSING: ${oldName}`); continue; }
  if (existsSync(newPath)) { console.warn(`SKIP target exists: ${newName}`); continue; }
  renameSync(oldPath, newPath);
  renamed++;
}
console.log(`Renamed ${renamed}/${mapping.length} files`);

let md = readFileSync(post, 'utf8');
for (const [oldName, newName, alt] of mapping) {
  const oldUrl = `/blog/migrated/2016/10/${oldName}`;
  const newUrl = `/blog/migrated/2016/10/${newName}`;
  const re = new RegExp(`!\\[[^\\]]*\\]\\(${oldUrl.replace(/[.*+?^${}()|[\\]\\\\]/g, '\\\\$&')}\\)`, 'g');
  md = md.replace(re, `![${alt}](${newUrl})`);
  md = md.split(oldUrl).join(newUrl);
}
writeFileSync(post, md, 'utf8');
console.log('Markdown rewritten.');
