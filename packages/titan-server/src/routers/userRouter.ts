import express, { Router } from "express"
import fs from "fs"
import path from "path"

const STATIC_DIR = path.resolve(__dirname, process.env.STATIC_DIR || "/public")
const userRouter = Router()
if (!fs.existsSync(STATIC_DIR)) {
  fs.mkdirSync(STATIC_DIR)
}

// Serve uploaded assets
userRouter.use("/uploads", express.static(STATIC_DIR))

userRouter.ws("/ws", (ws, req) => {
  console.log("Client connected")

  // Handle incoming messages
  ws.on("message", (data) => {
    try {
      const parsed = JSON.parse(data.toString())
      console.log(`Received message: ${JSON.stringify(parsed)}`)
      if (parsed.type === "state") {
        const stateFilePath = path.resolve(__dirname, "state.json")
        fs.writeFileSync(stateFilePath, JSON.stringify(parsed.payload, null, 2))
        ws.send(JSON.stringify({ type: "state", status: "saved" }))
      } else if (parsed.type === "asset") {
        const buffer = Buffer.from(parsed.payload.data, "base64")
        const filePath = path.join(STATIC_DIR, parsed.payload.filename)
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

  ws.on("close", () => {
    console.log("Client disconnected")
  })
})

export default userRouter
