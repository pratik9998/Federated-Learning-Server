import dotenv from "dotenv";
import http from "http";
import { server as WebSocketServer } from "websocket";
import { handleConnection } from "./wsHandlers/connectionHandler.js";
import { log } from "./utils/logger.js";

dotenv.config();

<<<<<<< HEAD
const server = http.createServer()
const wsServer = new webSocketServer({
    httpServer: server,
    autoAcceptConnections: false,
    maxPayload: 1024 * 1024 * 1024  // 1 GB limit
})

server.listen(process.env.PORT || 5001, () => {
    log(`Server is listening on port ${process.env.PORT}`)
})

=======
const server = http.createServer();
const wsServer = new WebSocketServer({
  httpServer: server,
  autoAcceptConnections: false,
});

server.listen(process.env.PORT || 5000, () => {
  log(`Server is listening on port ${process.env.PORT || 5000}`);
});
>>>>>>> 778ea47052445f21b00f6de96523d27f2b13a77e

wsServer.on("request", (request) => {
  const ws = request.accept(null, request.origin);
  // console.log(ws);
  handleConnection(ws);
});
