const { promisify } = require('util')
const { send } = require('micro')
const ip = require('ip')
const fs = require('fs')
const mqtt = require('mqtt')

let secrets = {}
try {
  secrets = require('./secrets.json')
} catch (e) {}

/**
 * connect to the mqtt broker
 * @type {import("mqtt").Client}
 */
const client = mqtt.connect(
  process.env.MQTT_SERVICE || secrets.service,
  {
    port: process.env.MQTT_PORT || secrets.port,
    username: process.env.MQTT_USER || secrets.user,
    password: process.env.MQTT_PASSWORD || secrets.password,
  }
)

/**
 * when connected subscribe to the "sensors/dht11/+" topic
 */
client.on('connect', () => {
  console.log('connected to cloudmqtt service')
  client.subscribe('sensors/dht11/+', err => {
    if (err) {
      console.error('problems on subscribing to sensor values', err)
    }
  })
})

client.on('message', async (topic, message) => {
  console.log('got message from sensor', topic)
  if (topic.includes('sensors/dht11')) {
    const [temperature, humidity] = Uint8Array.from(message)

    const data = await readData()

    data.push({
      date: new Date().toISOString(),
      topic,
      temperature,
      humidity,
    })

    writeData(data)
  } else {
    console.log(message.toString())
  }
})

const writeFileAsync = promisify(fs.writeFile)
const existsFileAsync = promisify(fs.exists)

const DATA_FILE = './sensorReadings.json'

/**
 * tries to read the json data stored in the
 * ./sensorReadings.json file, if it fails an
 * empty array is returned
 */
let sensorData = []
async function readData() {
  if (await existsFileAsync(DATA_FILE)) {
    try {
      const fileContent = require(DATA_FILE)
      if (Array.isArray(fileContent)) {
        sensorData = fileContent
      }
    } catch (e) {
      console.error('failed reading file', DATA_FILE, e)
    }
  }
  return sensorData
}

/**
 * Writes the collected data as a stringified json object
 * to the ./sensorReadings.json file
 * @param {Array<any>} data
 */
async function writeData(data) {
  sensorData = data
  try {
    await writeFileAsync(DATA_FILE, JSON.stringify(data))
  } catch (e) {
    console.error('error on saving data to file', e)
  }
}

console.log('started sensor data collection service')
console.log('running at ', `http://${ip.address()}:${process.env.PORT || 3000}`)

/**
 * If the server gets a POST request read the posted json data and store it
 * if it is a GET request send the collected data to the client
 * @param {import("http").IncomingMessage} req
 * @param {import("http").ServerResponse} res
 */
module.exports = async function handleRequest(req, res) {
  console.log('data requested')
  const data = await readData()

  send(res, 200, data)
}
