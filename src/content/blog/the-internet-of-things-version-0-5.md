---
title: "The Internet of Things Version 0.5"
date: 2014-02-18T04:28:37
category: tools
tags: ["home-automation", "iot"]
excerpt: "Last night when my friend showed up to my house I answered the doorbell through my phone while still down the street picking up dinner. I told her I would be there in a few minutes, and unlocked th…"
wpCategory: "iot"
wpUrl: "/iot/the-internet-of-things-version-0-5/"
cover: "/blog/migrated/2016/10/101816_1128_TheInternet1.png"
coverAlt: "The Internet of Things Version 0.5"
---

~~~~Last night when my friend showed up to my house I answered the doorbell through my phone while still down the street picking up dinner.  I told her I would be there in a few minutes, and unlocked the door to let her into the house – all from my phone.As she walked in, the scene became alive as lights shined a golden orange hue, and the TV flipped on with Pandora Streaming. When I showed up a few moments later she asked if she was in the “Back To the Future” movie.I replied, “No, the house is just filled with Internet of Things (IoC).” We laughed and I gave her the full tour of my newly spruced up, connected home.Although home automation systems are making our world start to feel like the future has finally arrived (and soon we may be on pseudo-hover boards thanks to [OneWheel](http://www.core77.com/blog/kickstarter/the_onewheel_a_self-balancing_electric_monowheel_skateboard_26294.asp)), we are still at version 0.5 of the IoC.Ultimately, the Internet of Things will allow us to connect in ways we never dreamed possible. We will go much farther than connected homes into to the quantified self and to connected devices like Google Glass, bringing infinite possibilities to life.~~**
~~

~~**What is this Internet of Things you’re talking about?****
~~

~~~~As technology prices drop, so does the barrier to entry for innovation. New networking capabilities are allowing ever-smaller chips and sensors to communicate with one another, and as a result, take actions or pass data to the cloud for additional processing, making these “things” smart.In short, the Internet of Things is the aggregate of objects that have the ability to communicate some piece of information to some other object, and possibly the cloud. In the future, the Internet of Smart Things will occur when these objects take action on the information being passed to them without needing the cloud, Either way, hopefully the data will be stored somewhere we can access it, allowing for future analysis and machine learning to spot trends across devices. Sound complicated? Remember, we are only at version 0.5, and we still have a long way to go before it starts to become easy and affordable. The good part is, we are getting better about agility and releasing Minimal Viable Products into the market to discover what the public will do with them, instead of making them wait for the perfect all-in-one solution. Your [door bell](http://www.getdoorbot.com/) doesn’t communicate with your [door lock](http://www.homedepot.com/p/Schlage-Camelot-Satin-Nickel-Touchscreen-Deadbolt-with-Alarm-BE469NX-CAM-619/203814065) over the network? First world problem.~~**
~~

~~**Save money and help the environment: enter the IoT eMonitors****
~~

[![](/blog/migrated/2016/10/101816_1128_TheInternet2.jpg)](https://i2.wp.com/techzulu.com/wp-content/uploads/2014/01/eMonitor.jpg)

~~~~Why would I want my refrigerator to communicate over the internet? Maybe you don’t, but when you attach an IoT device like the [Belkin insight switch](http://www.belkin.com/us/p/P-F7C029/) between your wall and fridge you quickly find out your refrigerator’s annual energy consumption alone costs more than a brand new appliance.I find once I’m informed about how much devices really cost to operate I’m more conscious about turning off my cable box and shutting down my computer instead of just letting it sleep.If you’re not interested in saving your pennies then you could always think about the environment when you unnecessarily keep the lights on in that empty room.At CES I was pretty blown away by the objects that now have sensors, what these sensors are reporting, and the actions you can take from all this data. We are now seeing the benefits of this connection in our homes, on our phones, and within our bodies. Unfortunately all this data and sensors have a big problem. They do not play nice with each other.~~**
~~

~~**Siloed towers Of babble ****
~~

~~~~For example, let’s follow my friend’s walk into my house. A [Shlage door lock](http://www.homedepot.com/p/Schlage-Camelot-Satin-Nickel-Touchscreen-Deadbolt-with-Alarm-BE469NX-CAM-619/203814065) communicated over [Zwave](http://g1.geoffreyemery.com/iot/theinternetofthingsversion0-5/%20http:/www.z-wave.com/) to let her in. [WeMo](http://www.belkin.com/us/Products/home-automation/c/wemo-home-automation/) Switches flipped on over [uPnP](http://en.wikipedia.org/wiki/Universal_Plug_and_Play)triggering [Hue Lights](http://www.meethue.com/en-US) to communicate over [ZigBee](http://www.zigbee.org/Home.aspx) to their proprietary base to light the room a nice sunset orange hue as she entered.With so many different transport protocols going on and none of them speaking the same language, how does all this automation happen? Enter the IoT hubs commonly referred to as Smart Hubs –  more on this in future~~**
~~

[![](/blog/migrated/2016/10/101816_1128_TheInternet3.jpg)](https://i1.wp.com/techzulu.com/wp-content/uploads/2014/01/SiloedTowerPofBabel.jpg)

~~~~articles, but in short, my [Smartthings](http://smartthings.com/) hub acts as the negotiator in this communication mess.Where does all this data go once it’s transmitted from these objects? In this nascent version of IoC, most data is sent from objects to their self-contained silos of vendor-controlled servers.  There, it is locked away with no real visibility to the other devices and there’s no real way to do any analysis on it to develop predictions. Even if devices are able to get the data, they wouldn’t understand it because they generally don’t speak each other’s [language](http://www.iotprimer.com/2013/11/iot-protocol-wars-mqtt-vs-coap-vs-xmpp.html). Why does this matter if in the end it still works? Because the real benefits will come by tying all these pieces of data together and letting the machines start to predict the things we want before we even know we want them*.*  You left your house and didn’t turn the stove off? Let your smart home turn it off without you needing to finally remember and then press a button on your phone.The need to interact with a device to tell it do something should be eliminated  – this is one thing Google Glass and Nest are on the path to solving, but without the full data set we can only make so much progress.~~**
~~

~~**Punching holes in the silos and uncaging our data****
~~

~~~~Ian Malcolm said it best in Jurassic Park, “[Life will find a way](http://www.youtube.com/watch?v=SkWeMvrNiOM).” If the objects that make up the IoT sense and report, you can think of them as nerve endings in the body with companies like IFFT and Zapier forming the spinal cord, relaying those messages to your other body parts.Want a lights to turn on as you get close to home? Well that’s done via a location recipe on your phone that integrates with your GE Light Switches. Want an alarm to chirp when you get a new lead on Salesforce? Attach an email trigger to your smart Philips Hue light bulb.  You can be clever if you really want to be, but for now it’s not going to be straightforward.~~**
~~

~~**What will IoT 1.0/2.0 look like? ****
~~

[![](/blog/migrated/2016/10/101816_1128_TheInternet4.png)](https://i1.wp.com/techzulu.com/wp-content/uploads/2014/01/GoogleGlass.png)

~~Moore’s Law is great, but Emery’s Hypothesis is that the connected devices will increase 100 fold every year until all devices let you tap into some piece of data easily.For me, version 1.0 will come around when these little smart home networks and wearables are easy enough for my older sister to install, wear and use. And 2.0 will be when we take these data sets and use the massive increases in data storage and cloud computing power and sprinkle some big data crunching.The result will be that devices themselves will inform and make smart decisions for us, permitting us to not think about things like turning off lights or locking doors – while of course keeping out the black hats of the world. Who ultimately takes over our life’s nervous system and becomes our virtual brain is yet to be seen.**
~~

~~From <[http://www.geoffreyemery.com/iot/theinternetofthingsversion05/](http://www.geoffreyemery.com/iot/theinternetofthingsversion05/)>**
~~
