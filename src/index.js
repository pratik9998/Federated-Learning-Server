import dotenv from "dotenv"
import http from "http"
import {server as webSocketServer} from "websocket"
import { handleConnection } from './wsHandlers/connectionHandler.js'
import { log } from './utils/logger.js'

dotenv.config()

const server = http.createServer()
const wsServer = new webSocketServer({
    httpServer: server,
    autoAcceptConnections: false,
    maxPayload: 1024 * 1024 * 1024  // 1 GB limit
})

server.listen(process.env.PORT || 5001, () => {
    log(`Server is listening on port ${process.env.PORT}`)
})


wsServer.on("request", (request) => {
    var ws = request.accept(null, request.origin)
    handleConnection(ws, wsServer)
})

