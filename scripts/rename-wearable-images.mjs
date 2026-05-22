#!/usr/bin/env node
// Rename 49 hash-named images in wearable-predictions-for-2016 to descriptive
// filenames matched to the prediction each image illustrates. Alt text combines
// the prediction topic with a visual cue (product / portrait / logo) inferred
// from the prediction's description in the post.

import { readFileSync, writeFileSync, renameSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const imageDir = 'public/blog/migrated/2016/10';
const post = 'src/content/blog/wearable-predictions-for-2016.md';

// Each row: [oldBasename, newBasename, alt]
const mapping = [
  ['101816_1329_WearablePre1.jpg',  'wearable-2016-frog-design-ticwatch.jpg',
   'Black-and-grey TicWatch smartwatch on a green background — Frog Design wearable from the 2016 predictions list'],
  ['101816_1329_WearablePre2.jpg',  'wearable-2016-meng-li-moov-ceo.jpg',
   'Portrait of Meng Li, co-founder and CEO of fitness wearable company Moov'],
  ['101816_1329_WearablePre3.jpg',  'wearable-2016-kokoon-sleep-headphones.jpg',
   'Kokoon in-ear sleep headphones resting on a pillow — wearable designed to improve sleep quality'],
  ['101816_1329_WearablePre4.jpg',  'wearable-2016-tomtom-sports-gps.jpg',
   'TomTom sports GPS wearable — product photo from the 2016 wearable predictions list'],
  ['101816_1329_WearablePre5.jpg',  'wearable-2016-saschka-unseld-oculus-story-studio.jpg',
   "Portrait of Saschka Unseld, head of Facebook's Oculus Story Studio and former Pixar director"],
  ['101816_1329_WearablePre6.jpg',  'wearable-2016-amazon-echo.jpg',
   'Amazon Echo smart speaker — voice assistant device featured in the 2016 wearable predictions'],
  ['101816_1329_WearablePre7.jpg',  'wearable-2016-nuzzle-gps-pet-collar.jpg',
   'Nuzzle GPS pet collar — wearable activity and location tracker for dogs'],
  ['101816_1329_WearablePre8.jpg',  'wearable-2016-hive-smart-home.jpg',
   'Hive smart home device from British Gas — thermostat and connected home hub'],
  ['101816_1329_WearablePre9.jpg',  'wearable-2016-project-jacquard-levis-google.jpg',
   "Project Jacquard — Levi's and Google's connected clothing partnership for touch-sensitive denim"],
  ['101816_1329_WearablePre10.jpg', 'wearable-2016-xmetrics-swim-tracker.jpg',
   'Xmetrics swimming wearable — head-mounted bio-mechanics tracker for swimmers'],
  ['101816_1329_WearablePre11.jpg', 'wearable-2016-the-void-vr-theme-park.jpg',
   'The Void VR theme park experience — players in physical mazes with VR headsets and haptic suits'],
  ['101816_1329_WearablePre12.jpg', 'wearable-2016-nfl-rfid-player-tracking.jpg',
   'Wearable data in sports coverage — NFL players outfitted with RFID chips for real-time tracking'],
  ['101816_1329_WearablePre13.jpg', 'wearable-2016-christina-mercando-davignon-ringly.jpg',
   'Portrait of Christina Mercando d’Avignon, CEO of smart-ring jewellery company Ringly'],
  ['101816_1329_WearablePre14.jpg', 'wearable-2016-moto-360-sport.jpg',
   'Motorola Moto 360 Sport — second-generation Android Wear smartwatch with GPS and heart-rate monitoring'],
  ['101816_1329_WearablePre15.jpg', 'wearable-2016-life-saving-wearables-athena.jpg',
   'Life-saving wearables — Athena personal safety device worn as a pendant with alarm and GPS alerts'],
  ['101816_1329_WearablePre16.jpg', 'wearable-2016-eunjoo-kim-samsung-gear-s2-designer.jpg',
   'Portrait of Eunjoo Kim, principal designer of the Samsung Gear S2 smartwatch and its rotating bezel'],
  ['101816_1329_WearablePre17.jpg', 'wearable-2016-smart-coaching-fitness.jpg',
   'Smart coaching on a fitness wearable — personalised guidance shown on a wrist-worn screen'],
  ['101816_1329_WearablePre18.jpg', 'wearable-2016-verily-google-life-sciences.jpg',
   'Verily, the rebranded Google Life Sciences division — health-tech research projects including the glucose-detecting contact lens'],
  ['101816_1329_WearablePre19.jpg', 'wearable-2016-disney-playmation-kids-toys.jpg',
   "Disney Playmation kids' wearable toys — Iron Man gauntlet that turns the home into a connected game environment"],
  ['101816_1329_WearablePre20.jpg', 'wearable-2016-intel-americas-greatest-makers-reality-tv.jpg',
   "Intel's wearable tech reality TV show “America's Greatest Makers” — inventor contestants competing for a $1m prize"],
  ['101816_1329_WearablePre21.jpg', 'wearable-2016-smartwatches-untethered-esim.jpg',
   'Smartwatches untethered — devices with embedded e-SIMs that work independently of a smartphone'],
  ['101816_1329_WearablePre22.jpg', 'wearable-2016-chris-milk-vr-filmmaker.jpg',
   'Portrait of Chris Milk, VR filmmaker and founder of Vrse.works, known for VR music videos and UN documentaries'],
  ['101816_1329_WearablePre23.jpg', 'wearable-2016-tag-heuer-connected-smartwatch.jpg',
   'Tag Heuer Connected — luxury Android Wear smartwatch from the Swiss watchmaker'],
  ['101816_1329_WearablePre24.jpg', 'wearable-2016-pebble-smartstraps.jpg',
   'Pebble Smartstraps for Pebble Time — modular watch straps containing third-party sensors and chips'],
  ['101816_1329_WearablePre25.jpg', 'wearable-2016-adidas-fitness-wearables.jpg',
   "Adidas fitness wearable — sports apparel giant's wrist-worn sensor following the $239m Runtastic acquisition"],
  ['101816_1329_WearablePre26.jpg', 'wearable-2016-pret-a-porter-fashion-wearables.jpg',
   'Prêt-à-porter fashion wearables — smart accessories and high-street fashion-tech crossover products'],
  ['101816_1329_WearablePre27.jpg', 'wearable-2016-hearables-smart-earbuds.jpg',
   "Hearables — smart earbuds and in-ear wearables like the Bragi Dash and Microsoft's Clip prototype"],
  ['101816_1329_WearablePre28.jpg', 'wearable-2016-youtube-360-vr-video.jpg',
   "YouTube 360-degree video — VR content viewable on cheap headsets, set to expand in 2016"],
  ['101816_1329_WearablePre29.jpg', 'wearable-2016-xiaomi-low-cost-fitness-tracker.jpg',
   'Low-cost wearable — Xiaomi Mi Band budget fitness tracker exemplifying the affordable tier of the market'],
  ['101816_1329_WearablePre30.jpg', 'wearable-2016-thync-muse-mind-reading-headset.jpg',
   'Mind-reading tech wearable — EEG headband like Muse or Thync that reads brain activity from the user’s scalp'],
  ['101816_1329_WearablePre31.jpg', 'wearable-2016-microsoft-hololens-ar.jpg',
   'Microsoft HoloLens developer edition — augmented-reality headset launching at $3,000'],
  ['101816_1329_WearablePre32.jpg', 'wearable-2016-jabil-clothing-plus-peak-plus-sensors.jpg',
   "Jabil's Peak+ programme and Clothing+ acquisition — sensors embedded into Adidas, Polar and Garmin sportswear"],
  ['101816_1329_WearablePre33.jpg', 'wearable-2016-tony-fadell-project-aura-google.jpg',
   "Portrait of Tony Fadell, head of Nest and leader of Google's Project Aura augmented-reality follow-up to Google Glass"],
  ['101816_1329_WearablePre34.jpg', 'wearable-2016-gesture-control-myo-armband.jpg',
   'Gesture-control wearable like the Myo armband — uses arm muscle signals to navigate devices without touchscreens'],
  ['101816_1329_WearablePre35.jpg', 'wearable-2016-medical-grade-consumer-health-tech.jpg',
   'Medical-grade consumer health wearable — biometric sensor for digital-health applications and insurance use'],
  ['101816_1329_WearablePre36.jpg', 'wearable-2016-invisibles-tech-tattoos.jpg',
   'Invisible wearables — tech tattoos and skin-mounted sensors from Chaotic Moon and New Deal Design'],
  ['101816_1329_WearablePre37.jpg', 'wearable-2016-blocks-modular-smartwatch.jpg',
   'Blocks modular smartwatch — Kickstarter-backed UK device with swappable modules for heart-rate, fingerprint ID, and more'],
  ['101816_1329_WearablePre38.jpg', 'wearable-2016-sonny-vu-fossil-misfit.jpg',
   'Portrait of Sonny Vu, founder of Misfit Wearables and CTO of connected devices at Fossil after the $260m acquisition'],
  ['101816_1329_WearablePre39.jpg', 'wearable-2016-samsung-gear-s2-smartwatch.jpg',
   'Samsung Gear S2 smartwatch with rotating bezel — set to support iPhone and Android devices in 2016'],
  ['101816_1329_WearablePre40.jpg', 'wearable-2016-smart-home-platforms.jpg',
   "Smart home platforms — competing ecosystems including Samsung SmartThings, Apple HomeKit, and Google Brillo"],
  ['101816_1329_WearablePre41.jpg', 'wearable-2016-apple-watch-2.jpg',
   "Apple Watch 2 — Apple's anticipated second-generation smartwatch teased for the 2016 release window"],
  ['101816_1329_WearablePre42.jpg', 'wearable-2016-magic-leap-ar-headset.jpg',
   "Magic Leap augmented-reality concept — light-field display headset described as an “operating system for reality” by Rony Abovitz"],
  ['101816_1329_WearablePre43.jpg', 'wearable-2016-wearable-payments-nfc.jpg',
   'Wearable payments — Apple Pay, Samsung Pay, bPay and MasterCard-backed contactless wearables like Ringly and Nymi'],
  ['101816_1329_WearablePre44.jpg', 'wearable-2016-fitbit-fitness-tracker.jpg',
   "Fitbit fitness tracker — newly-IPO'd category leader defending against cheaper Xiaomi and Moov competitors in 2016"],
  ['101816_1329_WearablePre45.jpg', 'wearable-2016-stress-detection-biometrics.jpg',
   'Stress detection on a wearable — Fitbit and Withings sensors piecing together sleep, heart-rate, and galvanic skin response to flag stress'],
  ['101816_1329_WearablePre46.jpg', "wearable-2016-womens-wearables-smart-jewellery.jpg",
   "Women's wearables — smaller-sized smartwatches and smart jewellery designed for the female market in 2016"],
  ['101816_1329_WearablePre47.jpg', 'wearable-2016-under-armour-fitness-platform.jpg',
   "Under Armour's connected fitness platform — built on the Endomondo, MyFitnessPal, and MapMyFitness acquisitions"],
  ['101816_1329_WearablePre48.jpg', 'wearable-2016-xiaomi-mi-band-amazefit.jpg',
   "Xiaomi Mi Band fitness wearable — Chinese budget tracker challenging Fitbit as it expands westward in 2016"],
  ['101816_1329_WearablePre49.jpg', 'wearable-2016-vr-oculus-htc-vive-playstation.jpg',
   'VR for all — the 2016 virtual reality wave led by Oculus Rift, HTC Vive, and PlayStation VR'],
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
