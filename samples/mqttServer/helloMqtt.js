const mqtt = require('mqtt')
const client = mqtt.connect(
  '$MQTT_INSTANCE_PASSWORD$',
  {
    port: $MQTT_INSTANCE_SSL_PORT$,
    protocol: 'mqtts',
    username: '$MQTT_INSTANCE_USER_NAME$',
    password: '$MQTT_INSTANCE_PASSWORD$',
  }
)

client.on('connect', () => {
  client.subscribe('presence', err => {
    if (!err) {
      client.publish('presence', 'Hello mqtt')
    }
  })
})

client.on('message', (topic, message) => {
  // message is Buffer
  console.log(message.toString())
  client.end()
})
