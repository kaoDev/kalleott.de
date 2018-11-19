const { promisify } = require('util')
const { json, send } = require('micro')
const ip = require('ip')
const fs = require('fs')
const mqtt = require('mqtt')

/**
 * connect to the mqtt broker
 * @type {import("mqtt").Client}
 */
const client = mqtt.connect(
  '$MQTT_INSTANCE_ADDRESS$',
  {
    port: $MQTT_INSTANCE_SSL_PORT$,
    protocol: 'mqtts',
    username: '$MQTT_INSTANCE_USER_NAME$',
    password: '$MQTT_INSTANCE_PASSWORD$',
  }
)

/**
 * when connected subscribe to the "sensors/dht11/+" topic
 */
client.on('connect', () => {
  client.subscribe('sensors/dht11/+', err => {
    if (err) {
      console.error('problems on subscribing to sensor values', err)
    }
  })
})

client.on('message', (topic, message) => {
  if (topic.includes('sensors/dht11')) {
    const [temperature, humidity] = Uint8Array.from(message)
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
async function readData() {
  let data = []
  if (await existsFileAsync(DATA_FILE)) {
    try {
      data = require(DATA_FILE)
    } catch (e) {
      console.error('failed reading file', DATA_FILE, e)
    }
  }
  return data
}

/**
 * Writes the collected data as a stringified json object
 * to the ./sensorReadings.json file
 * @param {Array<any>} data
 */
async function writeData(data) {
  await writeFileAsync(DATA_FILE, JSON.stringify(data))
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
  const data = await readData()

  if (req.method === 'GET') {
    send(res, 200, data)
  } else if (req.method === 'POST') {
    const sensorData = await json(req)

    data.push({
      date: new Date().toISOString(),
      payload: sensorData,
    })

    await writeData(data)

    send(res, 200)
  }
}
