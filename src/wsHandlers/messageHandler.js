import { aggregateParameters } from "./aggregator.js";
import { broadcastParameters } from "./broadcastHandler.js";
import { log } from "../utils/logger.js";

const parametersFromClients = new Map();

export function handleMessage(ws, message, clientId, connectedClients) {
  try {
    const data = JSON.parse(message.utf8Data)
    log(data)

    if (data.type === "sendParameters") {
      
      const { parameters } = data
      // console.log(parameters)
      parametersFromClients.set(clientId, parameters)
      log(`Received parameters from client: ${clientId}`)

      if (parametersFromClients.size === 2) {
        log('All clients have sent parameters. Aggregating...')
        const aggregatedParameters = aggregateParameters(parametersFromClients)
        log('Broadcasting aggregated parameters to all clients...')
        broadcastParameters(ws, aggregatedParameters, connectedClients)
        parametersFromClients.clear()
      }
    } else {
      log("Unknown message type received");
    }
  } catch (error) {
    log(`Error processing message: ${error.message}`);
  }
}