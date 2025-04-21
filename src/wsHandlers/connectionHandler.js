import { handleMessage } from "./messageHandler.js";
import { log } from "../utils/logger.js";

let nextClientId = 1
const connectedClients = new Map()

export function handleConnection(ws, wsServer) {

  const clientId = nextClientId++
  connectedClients.set(clientId, ws)
  log(`New client connected with ID: ${clientId}`)

  ws.send(JSON.stringify({ type: "clientId", clientId }))
  ws.on("message", (message) => {
    // console.log(message)
    handleMessage(ws, message, clientId, connectedClients)
  })

  ws.on("close", () => {
    connectedClients.delete(clientId)
    log(`Client ${clientId} disconnected`)
  })
}

// function handleHostSession(ws, data) {
//   const sessionId = s++;

//   // Create a session object that includes:
//   // - The host's WebSocket (for identification, if needed)
//   // - The password and total expected clients
//   // - A Map (or an array) to store client connections
//   const session = {
//     host: ws,
//     password: data.password,
//     totalClients: data.total_clients,
//     clients: new Map(), // store clientId -> clientWs
//   };
//   session.clients.set(nextClientId, ws);
//   nextClientId++;
//   activeSessions.set(sessionId, session);
//   ws.send(JSON.stringify({ type: "hostRegistered", clientId: sessionId }));
//   log(`New host session started with ID: ${sessionId}`);
// }


// function handleJoinRequest(ws, data) {
//   // Assume that the client provides the host session ID in data.hostId.
//   const session = activeSessions.get(data.client_id);
//   if (!session) {
//     ws.send(
//       JSON.stringify({ type: "error", message: "No active host found." })
//     );
//     ws.close();
//     return;
//   }

//   if (data.password !== session.password) {
//     ws.send(JSON.stringify({ type: "error", message: "Incorrect password." }));
//     ws.close();
//     return;
//   }

//   // Create a new client ID for this connection.
//   const clientId = nextClientId++;
//   // Save the client connection in the session's clients map.
//   session.clients.set(clientId, ws);

//   ws.send(JSON.stringify({ type: "clientApproved", clientId }));
//   log(`Client ${clientId} joined session ${data.hostId}`);

//   // Optionally, set up additional message handling for this client...
//   ws.on("close", () => {
//     session.clients.delete(clientId);
//     log(`Client ${clientId} disconnected from session ${data.hostId}`);
//   });
// }


// function removeClient(ws) {
//   for (const [sessionId, session] of activeSessions) {
//     if (session.host === ws) {
//       log(`Host ${sessionId} disconnected. Closing session.`);
//       session.clients.forEach((client) => client.close());
//       activeSessions.delete(sessionId);
//       return;
//     }

//     for (const [clientId, clientWs] of session.clients) {
//       if (clientWs === ws) {
//         session.clients.delete(clientId);
//         log(`Client ${clientId} removed from session ${sessionId}`);
//         return;
//       }
//     }
//   }
// }
