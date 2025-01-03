const WebSocket = require("ws")
const express = require("express")
const fs = require("fs")
const path = require("path")

const PORT = 8080
const UPLOAD_DIR = path.resolve(__dirname, "uploads")
if (!fs.existsSync(UPLOAD_DIR)) {
  fs.mkdirSync(UPLOAD_DIR)
}

// Create Express server to serve uploaded assets
const app = express()
app.use("/users", express.static(UPLOAD_DIR))
app.listen(3000, () => console.log("Asset server running on http://localhost:3000/users"))

// Create WebSocket server
const wss = new WebSocket.Server({ port: PORT }, () => {
  console.log(`WebSocket server running on ws://localhost:${PORT}`)
})

// Handle WebSocket connections
wss.on("connection", (ws) => {
  console.log("Client connected")

  // Handle incoming messages
  ws.on("message", (data) => {
    try {
      const parsed = JSON.parse(data)
      console.log(`Received message: ${JSON.stringify(parsed)}`)
      if (parsed.type === "state") {
        // Save state to a file
        const stateFilePath = path.resolve(__dirname, "state.json")
        fs.writeFileSync(stateFilePath, JSON.stringify(parsed.payload, null, 2))
        ws.send(JSON.stringify({ type: "state", status: "saved" }))
      } else if (parsed.type === "asset") {
        // Save asset to the uploads directory
        const buffer = Buffer.from(parsed.payload.data, "base64")
        const filePath = path.join(UPLOAD_DIR, parsed.payload.filename)
        fs.writeFileSync(filePath, buffer)
        ws.send(
          JSON.stringify({
            type: "asset",
            status: "uploaded",
            path: `/uploads/${parsed.payload.filename}`,
          })
        )
      }
    } catch (error) {
      console.error("Error processing message:", error)
      ws.send(JSON.stringify({ type: "error", message: "Invalid request" }))
    }
  })

  ws.on("close", () => console.log("Client disconnected"))
})
