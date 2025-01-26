import { handleMessage } from './messageHandler.js'
import { log } from '../utils/logger.js'

let nextClientId = 1
const connectedClients = new Map()

export function handleConnection(ws, wsServer) {

  const clientId = nextClientId++
  connectedClients.set(clientId, ws)
  log(`New client connected with ID: ${clientId}`)

  ws.send(JSON.stringify({ type: "clientId", clientId }))

  ws.on("message", (message) => {
    handleMessage(ws, wsServer, message, clientId)
  })

  ws.on("close", () => {
    connectedClients.delete(clientId)
    log(`Client ${clientId} disconnected`)
  })
}
