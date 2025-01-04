import express from "express"
import expressWs, { Application } from "express-ws"
import userRouter from "./routers/userRouter"

const PORT = import.meta.env.VITE_PORT || 3000
const HOST_NAME = import.meta.env.VITE_HOST_NAME || "http://localhost"
// Initialize Express and WebSocket support
const { app } = expressWs(express())

app.use("/users", userRouter)

app.listen(PORT, () => {
  console.log(`Asset server running at ${HOST_NAME}:${PORT}/users`)
})
