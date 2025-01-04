import express, { Router } from "express"
import fs from "fs"
import path from "path"

const chatRouter = Router()

export interface Reaction {
    emoji: string
    count: number
    reactors: User[]
}

export interface Message {
    id: string
    sender: string
    content: string
    timestamp: number
    reactions: Reaction[]
}

export interface User {
    id: string
    name: string
    avatar: string
    messages: Message[]
    favoriteRooms: string[]
    blockedUsers: string[]
    bannedRooms: string[]
}

export interface Role{
    name: string
    permissions: string[]
    users: string[]
}

export interface RoomConfig {
    id: string
    name: string
    users: string[]
    messages: string[]
    isPrivate: boolean
    password?: string
    bannedUsers: string[]
    blockedUsers: string[]
    isDeleted: boolean
    isArchived: boolean
    isMuted: boolean
    roles: Role[]
    owner: string
}

export class Room {
    private static rooms: Map<string, Room> = new Map()
    private _id: string 
    private _name: string
    private _users: string[]
    private _messages: string[]
    private _isPrivate: boolean
    private _password?: string
    private _bannedUsers: string[]
    private _blockedUsers: string[]
    private _isDeleted: boolean
    private _isArchived: boolean
    private _isMuted: boolean
    private _roles: Role[]
    private _owner: string
    constructor(config: RoomConfig) {
        this._id = config.id || Math.random().toString(36).substr(2, 9)
        this._name = config.name || "New Room"
        this._users = config.users || []
        this._messages = config.messages || []
        this._isPrivate = config.isPrivate || false
        this._password = config.password || undefined
        this._bannedUsers = config.bannedUsers || []
        this._blockedUsers = config.blockedUsers || []
        this._isDeleted = config.isDeleted || false
        this._isArchived = config.isArchived || false
        this._isMuted = config.isMuted || false
        this._roles = config.roles || []
        this._owner = config.owner || ""
    }

}

class ChatRoomManager{
    private users: Map<string,User> = new Map()
    private rooms: Map<string,Room> = new Map()

const STATIC_DIR = path.resolve(__dirname, import.meta.env.VITE_STATIC_DIR || "/public")

if (!fs.existsSync(STATIC_DIR)) {
  fs.mkdirSync(STATIC_DIR)
}

// Serve uploaded assets
chatRouter.use("/uploads", express.static(STATIC_DIR))

chatRouter.ws("/ws", (ws, req) => {
  console.log("Client connected")

  // Handle incoming messages
  ws.on("message", (data) => {
    try {
      const parsed = JSON.parse(data.toString())
      console.log(`Received message: ${JSON.stringify(parsed)}`)
      if (parsed.type === "message") {
        ws.send(JSON.stringify({ type: "message", status: "received" }))
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

export default chatRouter
