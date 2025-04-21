import { log } from '../utils/logger.js'

export function broadcastParameters(ws, aggregatedParameters, connectedClients) {
  const message = JSON.stringify({
    type: 'receiveAggregatedLayer',
    parameters: aggregatedParameters,
  });

  connectedClients.forEach((clientWs) => {
    if (clientWs.readyState === clientWs.OPEN) {
      clientWs.send(message);
    }
  })

  log('Broadcasted aggregated parameters to all clients');
}
