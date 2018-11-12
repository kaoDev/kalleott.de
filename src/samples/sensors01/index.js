const sensorLib = require('node-dht-sensor')
const Gpio = require('onoff').Gpio
const sleep = require('sleep-promise')
const yargs = require('yargs')
const axios = require('axios')

const args = yargs.options({
  backend: { alias: 'b' },
  interval: { alias: 'i', default: 5000 },
  verbose: { alias: 'v', default: false, boolean: true },
}).argv

console.log(
  `starting reading of sensor data with backend: ${
    args.backend
  } and interval: ${args.interval}`
)

const errorLed = new Gpio(23, 'out')

// local state holding variable used to indicate some kind of error
let deviceHasError = false
/**
 * function to let an led connected to the pin 23 blink frantically
 * runs as long as the `deviceHasError` state is true
 */
async function errorBlink() {
  errorLed.writeSync(1)
  await sleep(100)
  errorLed.writeSync(0)
  await sleep(100)

  if (deviceHasError) {
    errorBlink()
  }
}

/**
 * some data to describe the connected DHT sensor
 * type can be 11 or 22, it depends on the device
 * the number of the gpio pin connected to the data pin of the sensor
 */
const dhtSensor = {
  type: 11,
  pin: 4,
  name: "Kalle's DHT11",
}

/**
 * function which tries to send the given data to the server,
 * which is set through the `--backend` start argument
 * @param {*} params data to send to the server
 */
async function postDataToServer(params) {
  try {
    await axios.post(args.backend, JSON.stringify(params), {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    if (args.verbose) {
      console.log('sent sensor data to server')
    }
  } catch (e) {
    console.error('failed sending sensor data to server', e)
  }
}

/**
 * function which reads the sensor values and sends them to the server
 * after waiting for the specified interval time it calls itself to run again
 */
async function readSensor() {
  sensorLib.read(
    dhtSensor.type,
    dhtSensor.pin,
    (error, temperature, humidity) => {
      if (error) {
        console.error('some error ocurred on reading the dht sensor', error)
        if (!deviceHasError) {
          deviceHasError = true
          errorBlink()
        }
      } else {
        deviceHasError = false

        if (args.backend) {
          postDataToServer({ temperature, humidity, sensor: dhtSensor.name })
        }

        if (args.verbose) {
          console.log('temp:', temperature + '°C', 'humidity: ', humidity + '%')
        }
      }
    }
  )

  // wait for the given interval
  await sleep(args.interval)
  // start over
  readSensor()
}

// kick of the sensor reading
readSensor()
