import express from "express"
import expressWs from "express-ws"
import userRouter from "./routers/userRouter"
import dotenv from "dotenv"
dotenv.config()

const PORT = process.env.VITE_PORT || 3000
const HOST_NAME = process.env.VITE_HOST_NAME || "http://localhost"
// Initialize Express and WebSocket support
const { app } = expressWs(express())
app.use(userRouter)

app.get("/", (req, res) => {
  res.send("Asset server running")
})

app.listen(PORT, () => {
  console.log(`Your assets are located at ${HOST_NAME}:${PORT}/users`)
})
