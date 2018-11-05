const Gpio = require('onoff').Gpio
const sleep = require('sleep-promise')

const led = new Gpio(23, 'out')

async function blink(blinks) {
  console.log('starting blink with ', blinks, 'steps')
  console.log('led on')
  led.writeSync(1)
  await sleep(500)
  console.log('led off')
  led.writeSync(0)
  await sleep(500)

  if (blinks > 0) {
    blink(blinks - 1)
  }
}

blink(20)
