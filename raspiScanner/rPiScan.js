'use strict'

const os = require('os')
const networkInterfaces = os.networkInterfaces()
const nmap = require('libnmap')
const devices = require('./devices.json')

const networkMasks = Array.from(
  new Set(
    Object.keys(networkInterfaces)
      .map(interfaceName => {
        let alias = 0

        return networkInterfaces[interfaceName]
          .map(networkInterface => {
            if (
              'IPv4' !== networkInterface.family ||
              networkInterface.internal !== false
            ) {
              // skip over internal (i.e. 127.0.0.1) and non-ipv4 addresses
              return
            }

            ++alias

            if (alias > 1) {
              // this single interface has multiple ipv4 addresses

              return {
                adapterName: interfaceName + ':' + alias,
                ipMask: networkInterface.address.replace(
                  /(.*)\.(.*)\.(.*)\.(.*)/,
                  '$1.$2.$3.0'
                ),
              }
            } else {
              // this interface has only one ipv4 adress
              return {
                adapterName: interfaceName,
                ipMask: networkInterface.address.replace(
                  /(.*)\.(.*)\.(.*)\.(.*)/,
                  '$1.$2.$3.0'
                ),
              }
            }
          })
          .filter(val => !!val)
          .map(val => val.ipMask)
      })
      .filter(list => !!list.length)
      .map(l => l[0])
  )
)

async function runScan(ipMask) {
  const opts = {
    range: [`${ipMask}/24`],
    ports: '22',
  }
  return new Promise((resolve, reject) => {
    nmap.scan(opts, (err, report) => {
      try {
        if (err) throw new Error(err)

        const bar = Object.keys(report)
          .map(item => {
            if (!report[item].host) {
              return null
            }
            return report[item].host
              .map(({ address, hostnames }) => {
                const deviceAddress = address.reduce(
                  (acc, current) => {
                    try {
                      if (current.item.addrtype === 'ipv4') {
                        acc.ip = current.item.addr
                      } else if (current.item.addrtype === 'mac') {
                        acc.mac = current.item.addr
                        acc.vendor = current.item.vendor
                      }
                    } catch (e) {
                      console.trace(e)
                    }
                    return acc
                  },
                  { ip: '', mac: '', vendor: '' }
                )
                return {
                  deviceAddress,
                  hostnames,
                }
              })
              .filter(val => !!val)
          })
          .filter(val => !!val)

        resolve(bar)
      } catch (e) {
        reject(e)
      }
    })
  })
}

const flatten = (acc, current) => {
  while (Array.isArray(current) && Array.isArray(current[0])) {
    current = current.reduce(flatten, [])
  }
  return [...acc, ...current]
}

async function scanAll() {
  let results = []
  for (const ip of networkMasks) {
    const res = await runScan(ip)
    results.push(res)
  }

  results = results.reduce(flatten, []).reduce(
    (acc, { deviceAddress }) => {
      const isRasPi = deviceAddress.vendor === 'Raspberry Pi Foundation'
      const matched = devices.find(({ mac }) => mac === deviceAddress.mac)

      if (matched) {
        acc.matched.push({
          owner: matched.owner,
          ip: deviceAddress.ip,
          mac: deviceAddress.mac,
        })
      } else if (isRasPi) {
        acc.unmatched.push({
          owner: 'unknown',
          ip: deviceAddress.ip,
          mac: deviceAddress.mac,
        })
      }

      return acc
    },
    { matched: [], unmatched: [] }
  )
  console.clear()
  console.log(
    'Scanresult: ',
    new Date().toLocaleTimeString('de', { hour12: false }),
    networkMasks.map(mask => mask.adapterName).join(', ')
  )
  if (results.matched.length > 0) {
    console.log('###################')
    console.log('Matched Raspberry Pis:')
    console.log('###################')
    console.log(
      results.matched.map(({ owner, ip }) => `${owner} - IP: ${ip}`).join('\n')
    )
  } else {
    console.log('###################')
    console.log('Found no devices from the list')
    console.log('###################')
  }
  if (results.unmatched.length > 0) {
    console.log('###################')
    console.log('Found following unmatched Raspberry Pis in network')
    console.log('###################')
    console.log(
      results.unmatched
        .map(({ mac, ip }) => `MAC: ${mac}, IP: ${ip}`)
        .join('\n')
    )
  }
}

setInterval(() => {
  scanAll()
}, 5000)
