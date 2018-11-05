---
title: Setup and first steps with the Raspberry Pi Zero
date: '2018-11-05T20:55:47.678Z'
course: Internet of Things
draft: false
---

The first step of using a Raspberry Pi is the preparation of the operating
system, the Pi uses an SD card as primary hard drive so this step can be done
with every computer equipped with a SD card reader. For this course I will use
the [Raspian OS](https://www.raspberrypi.org/downloads/raspbian/) which is the
official system by the Raspberry Pi foundation.

After downloading and extracting the OS image you have to create a bootable SD
card with this file. To do so I recommend
[Etcher](https://www.balena.io/etcher/) which is an easy to use tool to flash OS
images to portable drives. For a more specific setup guide please follow the
official
[readme](https://www.raspberrypi.org/documentation/installation/installing-images/README.md).

Before starting the Raspberry Pi with the freshly flashed SD card there are two
more steps necessary. To work with the device it should connect to the WiFi and
ssh must be enabled for remote control.

To enable ssh just create an empty file named `ssh` without any extension in the
root folder of the SD card.

To connect the Raspberry Pi to a wireless network you create a file named
`wpa_supplicant.conf`, also in the root folder of the SD card. In this file you
can list networks the device should connect to.

```conf
country=DE
ctrl_interface=DIR=/var/run/wpa_supplicant GROUP=netdev
update_config=1
# Network 1
network={
	ssid="NameOfMyWiFi"
	psk="passwordOfMyWiFi"
	key_mgmt=WPA-PSK
}

# Network 2
network={
    ssid="SSID2"
    psk="password2"
    key_mgmt=WPA-PSK
}
```

Now the Raspberry Pi is ready to go.

## Finding the Raspberry on the network

After connecting the small computer to a power source it will boot and
automatically connect to one of the listed wireless networks if available. So it
should be connected but at the moment the IP address is unknown. Finding out
under which address the Raspberry Pi can be reached is unfortunately not very
comfortable. There is one easy way, but it's not supported on all networks. A
Raspberry Pi has a default hostname of `raspberrypi` and (if supported) you can
connect to it with `ssh pi@raspberrypi.local`.

If the hostname resolution is not supported you have to find the IP address, one
way is checking the router and looking in the list of connected devices. The
last option is to use a network scanner like [nmap](https://nmap.org/)(available
on linux and MacOS, installer available vor Windows). To list all devices
connected to the network with the open port 22 (ssh port) use the command
`nmap -p22 192.168.178.0/24`, change `192.168.178.0` to represent the ip address
range in use.

After finding the IP address you can connect via `ssh` with the user `pi` and
the password `raspberry`

`ssh pi@192.168.178.28`

When you are connected one of the first things you do should be a password
change. The command for this is `passwd`.

## Installing Node.js

The Raspberry Pi Zero uses an ARMv6 processor and because of this it's not
possible to install Node via the officially documented `apt-get` command.
Instead you have to download the binary published from the
[Node.js distribution site](https://nodejs.org/dist/). For this course I
recommend the latest version which is at the moment 11.1.0 so the correct
download link for the Pi Zero is
`https://nodejs.org/dist/latest-v11.x/node-v11.1.0-linux-armv6l.tar.gz`. To
download the binary on the device connect via ssh and run the command

#### `curl -o node-v11.1.0-linux-armv6l.tar.gz https://nodejs.org/dist/latest-v11.x/node-v11.1.0-linux-armv6l.tar.gz`

After downloading extract the contents of the tar-file

#### `tar -xzf node-v11.1.0-linux-armv6l.tar.gz`

The last step is to copy the binaries to the usr/local path so they are found as
executables.

#### `sudo cp -r node-v11.1.0-linux-armv6l/* /usr/local/`

Now you should be able to run the command `node -v` which should print
`v11.1.0`.

Because npm [(the node package manager)](https://www.npmjs.com/) is using git
for some dependencies, and because it is in general very useful install git as
the last step

#### `sudo apt-get install git`

## Say hello to the LED with Node.js

Now that the Pi is ready it is time for the hello world of IoT. It's called
blinky and as name suggests it let's an LED blink. At first create a new folder
for the "blinky" project, in this folder create a `package.json` and an
`index.js` file.

Working with node relies heavily on the usage of packages and for blinky there
are two very useful packages:

1. [onoff](https://www.npmjs.com/package/onoff) - a package to get easy access
   to the GPIO pins
2. [sleep-promise](https://www.npmjs.com/package/sleep-promise) - a package
   which enables easy async sleep calls

Because it makes no sense to run this program on your normal computer don't
install these dependencies with npm but only list them in the `package.json`:

```json
{
  "name": "blinky",
  "version": "1.0.0",
  "main": "index.js",
  "scripts": {
    "start": "node index.js"
  },
  "dependencies": {
    "onoff": "^3.2.2",
    "sleep-promise": "^8.0.1"
  }
}
```

The "onoff" package gives easy access to the GPIO pins via the exported `Gpio`
class. To control a pin create a new Gpio object with the pin number and the
direction:

```javascript
const Gpio = require('onoff').Gpio

const led = new Gpio(23, 'out')

led.writeSync(1) // set the output of the pin to high
```

To see which pin has which number take a look on
[pinout.xyz/](https://pinout.xyz/), this site has a great interactive overview.

The "sleep-promise" package provides a simple sleep function which takes a
number of milliseconds to wait and returns a promise which gets resolved after
the given time. Promises can be awaited in `async` functions.

```javascript
const sleep = require('sleep-promise')

async function awaitSleep() {
  console.log('before sleep') // gets printed without delay
  await sleep(5000)
  console.log('after sleep') // gets printed with a delay of 5 seconds
}

awaitSleep()
```

A program switching the output of pin 23 to high and after 1 second to low again
would look like this:

```javascript
const Gpio = require('onoff').Gpio
const sleep = require('sleep-promise')

const led = new Gpio(23, 'out')

async function blink() {
  console.log('led on')
  led.writeSync(1)
  await sleep(1000)
  console.log('led off')
  led.writeSync(0)
}

blink()
```

The last step left is getting the program on the Pi and start it. First create a
new folder on the raspberry pi:

#### `mkdir blinky`

And then use `scp` on your local computer to copy the index.js file and the
package.json to the Raspberry Pi:

```bash
scp ./package.json pi@192.168.178.28:~/blinky/package.json
scp ./index.js pi@192.168.178.28:~/blinky/index.js
```

Or use a GUI based tool like [cyberduck](https://cyberduck.io/download/) to
manage files.

When the blinky project is on the Pi you need to install the packages to do so,
run `npm install` in the "blinky" folder on the Raspberry Pi. After the
installation there should be a "node_modules" folder and you should be able to
run the program with the command `npm start`.

### Tasks

- Prepare a SD card with raspian so that the Raspberry Pi connects to your WiFi
- connect to the Pi via ssh and install node
- connect a LED and let it blink with JavaScript
- extend the program to blink X times
- alter the blinky program to use a random rhythm
