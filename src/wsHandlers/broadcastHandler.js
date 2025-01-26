import { log } from '../utils/logger.js'

export function broadcastParameters(ws, aggregatedParameters) {
  
  const message = JSON.stringify({
    type: 'receiveAggregatedParameters',
    parameters: aggregatedParameters,
  })

  ws.connections.forEach((client) => {
    if (client.readyState === client.OPEN) {
      client.send(message)
    }
  })

  log('Broadcasted aggregated parameters to all clients')
}
