import { aggregateParameters } from "./aggregator.js";
import { broadcastParameters } from "./broadcastHandler.js";
import { log } from "../utils/logger.js";

const parametersFromClients = new Map();

export function handleMessage(ws, session, data) {
  try {

    if (data.type === "sendParameters") {
          const { parameters } = data;
          const clientId = data.client_id;
          if (!parametersFromClients.has(clientId)) {
            parametersFromClients.set(clientId, []);
          }
      parametersFromClients.get(clientId).push(parameters);
      console.log(parametersFromClients.get(clientId).length);
      console.log(session.totalClients)
      console.log(session)
      // console.log(parametersFromClients.get(clientId).length);
      log(`Received parameters from client: ${clientId}`);
      if (parametersFromClients.get(clientId).length === session.totalClients) {
        log("All clients have sent parameters. Aggregating...");
        const allParameters = parametersFromClients.get(clientId);
        const aggregatedParameters = aggregateParameters(allParameters);
        log("Broadcasting aggregated parameters to all clients...");
        broadcastParameters(session, aggregatedParameters);

        parametersFromClients.get(clientId).length=0;
      }
    } else {
      log("Unknown message type received");
    }
  } catch (error) {
    log(`Error processing message: ${error.message}`);
  }
}
