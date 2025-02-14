import { log } from '../utils/logger.js'

export function broadcastParameters(session, aggregatedParameters) {
  const message = JSON.stringify({
    type: 'receiveAggregatedParameters',
    parameters: aggregatedParameters,
  });

  // Here we iterate over the session.clients Map
  session.clients.forEach((clientWs) => {
    // Check if the client WebSocket is open before sending
    if (clientWs.readyState === clientWs.OPEN) {
      clientWs.send(message);
    }
  });

  log('Broadcasted aggregated parameters to all clients');
}
