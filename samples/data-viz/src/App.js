import React, { Component } from 'react'
import './App.css'
import app from 'firebase/app'
import 'firebase/firestore'
import { LineChart, XAxis, YAxis, Line, Legend } from 'recharts'
import { format } from 'date-fns'

const config = {
  apiKey: 'AIzaSyBvRhAYjqwvMYG9P4h0CgM3fg_TMYpqwDM',
  databaseURL: 'https://iot-2018-65259.firebaseio.com',
  projectId: 'iot-2018-65259',
}

const firebaseApp = app.initializeApp(config)

const firestore = firebaseApp.firestore()
const settings = { timestampsInSnapshots: true }
firestore.settings(settings)

function subscribeToSensorData(onUpdate) {
  return firestore
    .collection('sensorData') // choose the collection of your data
    .orderBy('date', 'desc') // order the saved documents by date ascending
    .limit(40) // only take the last 500 entries
    .onSnapshot(snapshotData => {
      onUpdate(
        // on an update deliver the data to the callback
        // transform the snapshot data to the actual objects
        snapshotData.docs.map(documentSnapshot => {
          const data = documentSnapshot.data()

          return {
            ...data,
            date: data.date.seconds,
          }
        })
      )
    })
}

class App extends Component {
  // initial state with an empty data array
  state = { sensorData: [] }

  // method that gets called when this component
  // instance got inserted into the view
  componentDidMount() {
    this.unsubscribe = subscribeToSensorData(this.onSensorData)
  }

  // method that gets called when this component
  // instance will be removed
  componentWillUnmount() {
    if (this.unsubscribe) {
      this.unsubscribe()
    }
  }

  // method to store the given data in the component state
  onSensorData = sensorData => {
    this.setState({ sensorData })
  }

  render() {
    return (
      <LineChart width={500} height={300} data={this.state.sensorData}>
        <XAxis
          name="date"
          dataKey="date"
          type="number"
          domain={['dataMin - 1000', 'dataMax + 1000']}
          tickFormatter={val => {
            console.log(val)
            if (Math.abs(val) < Infinity) {
              return format(new Date(val * 1000), 'hh:mm - DD.MM')
            }
          }}
        />
        <YAxis
          orientation="left"
          type="number"
          yAxisId="temperature"
          domain={[-50, 50]}
        />
        <YAxis
          orientation="right"
          type="number"
          yAxisId="humidity"
          domain={[0, 100]}
        />
        <Line
          dot={false}
          type="monotone"
          dataKey="temperature"
          yAxisId="temperature"
          stroke="#ee2142"
        />
        <Line
          dot={false}
          type="monotone"
          dataKey="humidity"
          yAxisId="humidity"
          stroke="#2142ee"
        />
        <Legend
          content={
            <div>
              <div style={{ color: '#ee2142' }}>Temperature in °C</div>
              <div style={{ color: '#2142ee' }}>Humidity in %</div>
            </div>
          }
        />
      </LineChart>
    )
  }
}

export default App
