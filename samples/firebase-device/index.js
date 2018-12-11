#!/usr/bin/env node

const sensorLib = require('node-dht-sensor')
const Gpio = require('onoff').Gpio
const sleep = require('sleep-promise')
const yargs = require('yargs')
const firebase = require('firebase-admin')

/**
 * keyFile to connect to firebase
 */
const serviceAccount = require('./firebase-key.json')

// initialize firebase app with authentication data
firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount),
})

// get the reference to the firebase database
const db = firebase.firestore()
db.settings({
  timestampsInSnapshots: true,
})

const SENSOR_DATA_COLLECTION_NAME = 'sensorData'

/**
 * takes the sensor values for temperature and humidity and the name
 * of the source sensor
 *
 * @param {number} temperature
 * @param {number} humidity
 * @param {string} name
 */
async function writeData(temperature, humidity, name) {
  try {
    await db.collection(SENSOR_DATA_COLLECTION_NAME).add({
      temperature,
      humidity,
      name,
      date: firebase.firestore.FieldValue.serverTimestamp(),
    })
  } catch (e) {
    console.error('error writing to firestore', e)
  }
}

const args = yargs.options({
  interval: { alias: 'i', default: 900000 }, // 15 minutes
  verbose: { alias: 'v', default: false, boolean: true },
}).argv

console.log(`starting reading of sensor data with interval: ${args.interval}`)

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
 * function which reads the sensor values and sends them to the server
 * after waiting for the specified interval time it calls itself to run again
 */
function readSensor() {
  sensorLib.read(
    dhtSensor.type,
    dhtSensor.pin,
    async (error, temperature, humidity) => {
      if (error) {
        console.error('some error ocurred on reading the dht sensor', error)
        if (!deviceHasError) {
          deviceHasError = true
          errorBlink()
        }
      } else {
        deviceHasError = false

        if (args.verbose) {
          console.log('temp:', temperature + '°C', 'humidity: ', humidity + '%')
        }

        writeData(temperature, humidity, dhtSensor.name)
        // wait for the given interval
      }
      await sleep(args.interval)
      // start over
      readSensor()
    }
  )
}

// kick of the sensor reading
readSensor()
