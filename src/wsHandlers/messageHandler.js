import { aggregateParameters } from './aggregator.js'
import { broadcastParameters } from './broadcastHandler.js'
import { log } from '../utils/logger.js'

const parametersFromClients = new Map()

export function handleMessage(ws, wsServer, message, clientId) {
  try {

    const data = JSON.parse(message.utf8Data)
    // log(`data: ${data}`)

    if (data.type === "sendParameters") {
      const { parameters } = data
      parametersFromClients.set(clientId, parameters)
      log(`Received parameters from client: ${clientId}`)

      if (parametersFromClients.size === 4) {
        log('All clients have sent parameters. Aggregating...')

        const aggregatedParameters = aggregateParameters([...parametersFromClients.values()])
        log('Broadcasting aggregated parameters to all clients...')
        broadcastParameters(wsServer, aggregatedParameters)

        parametersFromClients.clear()
      }
    } else {
      log('Unknown message type received')
    }
  } catch (error) {
    log(`Error processing message: ${error.message}`)
  }
}
