---
title: Cool robot farmers — agribots in the field
date: 2017-04-18T21:09:43.000Z
category: tools
tags:
  - automation
  - autonomous
  - farming
  - robots
  - ai
excerpt: "Most ag-tech startups build dashboards. A few build robots that actually walk into the field and pull weeds. Here's why the small physical ones might matter more than the giant data ones."
pullquote: "The dashboard tells you the weeds are there. The robot pulls the weed. Guess which one the farmer is going to pay for."
cover: ../../assets/blog/041917_0400_FrenchAgrib1.jpg
coverAlt: Cool Robot Farmers — French agribot from Naïo Technologies weeding a row crop
---

Love to see robots in new fields. (Pun fully intended.)

I just stumbled onto **[Naïo Technologies](http://naio-technologies.com/)**, a French startup manufacturing **agribots** for vegetable farms. Their machines patrol the rows, use lasers and camera-guidance to spot the *difference between a lettuce and a weed*, and pull the weeds without disturbing the crop. A robot doing the most tedious manual job on a small farm, in the middle of the field, with no human babysitting it. That's not a deck. That's a thing in dirt.

## What they're actually doing

The Naïo robots:

- Move autonomously between crop rows (camera + laser guidance, no GPS-only)
- Recognize different plant species in real time
- Mechanically remove weeds without herbicides
- Run a full work shift on a single charge

They started selling in 2015, doubled sales in 2016, and have been racking up European startup awards — including the CleanTech Republic award during COP21 in Paris. The product is reportedly maturing well enough that some of the early-adopter farms are now running fleets, not single units.

## The other interesting player

Stateside, **[Blue River Technology](http://www.bluerivert.com/)** has been doing similar work — *weeding, spraying, and thinning* — primarily on California lettuce farms, with plans to expand into other vegetable crops. Their headline product, *See & Spray*, uses computer vision to distinguish crops from weeds and applies herbicide only on the weed pixel, cutting herbicide use by a reported 80-90% in trial fields. (Worth noting: John Deere acquired Blue River in 2017 for $305M — *somebody* on the buyer side ran the same math I'm running here.)

## Why this matters more than another data startup

The crowded part of ag-tech right now is **dashboards**. Climate Corp, Granular, FarmLogs, and a dozen smaller players all build the same shape of product: ingest field data, show it in a dashboard, recommend an action to the farmer. *The farmer still has to do the action.*

Robot farmers flip that. They don't recommend pulling the weed; they *pull the weed*. They don't recommend spraying less herbicide; they *spray less herbicide*. The unit of work delivered to the customer is the same unit the customer was already paying labor (or themselves) to perform.

The PM read: **a recommendation engine for farmers competes with the farmer's intuition**, which is usually pretty good after 30 years of working the same field. **A robot competes with the farmer's tired back**, which is universal. The second market is much easier to sell into.

![Dashboard startup vs robot startup — side-by-side comparison showing the dashboard delivers a recommendation while the robot delivers the actual labor; the value gap on the left vs the value delivered on the right](../../assets/blog/robot-vs-dashboard-startups-2017.svg)

## What's coming next

- **Specialized smaller robots** — not one big tractor-replacement but small swarms, each tuned to a crop or a job (weeding, scouting, thinning, harvest assist)
- **Drones for the airborne tier** — spraying, scouting, and predictive modeling for stress (water, nutrient, pest pressure)
- **Inter-operability** — the same farm running mixed brands of agribots, talking over shared field maps. This is the part that's still mostly vaporware
- **Energy autonomy** — solar charging, swappable batteries, and the eventual hybrid diesel/electric platform that takes 12-hour shifts

It's super cool and refreshing to see a startup building **machinery for execution in the field** rather than yet another data dashboard nobody opens. The dashboard plays come and go. The robots stay in the field.

## What I'm grateful for

Thank you to every engineer and roboticist working on the unglamorous *physical world* problems while the rest of the industry argues about whether AI is a hype cycle. Vegetables are real. Weeds are real. The 12-hour back-breaking shift in the sun is real. The robot that takes it on is the right kind of moonshot.

Can't wait to see what drones are going to bring to the table.

## Looking at this years later

I'm rereading this post knowing how the next several years played out. Two predictions held up, one didn't:

**Held up: small specialized robots beat the big tractor-replacement.** Naïo kept shipping. Blue River got acquired and the See & Spray tech is now standard kit on Deere's higher-end equipment. Swarm robotics in row crops is genuinely happening — just slower than the breathless 2017 coverage suggested.

**Held up: physical work eats dashboard work for lunch.** The pure-dashboard ag-tech companies have been quietly merging, pivoting, or dying. The robotics ones — the ones doing actual *labor in dirt* — are the ones with durable revenue.

**Did not hold up: inter-operability.** Every robotics company built proprietary stacks. A farm running three brands today still uses three separate apps and three separate field-map formats. Open standards were promised. They have not arrived. *Maybe in another five years.*

## The product lesson worth keeping

If you're a PM trying to evaluate a category of startup, ask: **what does the customer have to do after they buy?**

If the answer is "make a decision" or "interpret a dashboard," the startup is selling a recommendation. Recommendations compete with intuition, which is free.

If the answer is "the work happens automatically," the startup is selling labor. *Labor competes with payroll, which is expensive.* Easier sell, bigger market, more durable revenue.

This pattern shows up everywhere — not just ag-tech. Same story in legal-tech, finance-tech, ops-tech. The "build the robot, not the dashboard" advice has aged well across the board.

## Gratitude beat

Big thanks to every engineer who chose to build something *physical* during the years when every venture dollar was chasing pure-software plays. The world needs working machines in dirt. *Thank you.*

![Blue River Drone over a lettuce field — agricultural drone for crop scouting and targeted spraying](https://i0.wp.com/res.cloudinary.com/hrscywv4p/image/upload/c_limit,fl_lossy,h_9000,w_1200,f_auto,q_auto/v1/77075/blue_river_drone_wic5d3.png?w=1200)
