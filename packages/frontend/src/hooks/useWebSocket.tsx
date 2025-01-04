import React, { useContext, createContext, useState } from "react"
import { useFunctionDebouncer } from "@hooks/useDebounce"
import type { WebSocketMessage, WebSocketResponse } from "WebSocketServer"
export interface WebSocketContextProps {
  sendMessage?: (message: any) => void
  messages: any[]
  isConnected?: boolean
  connect?: (credentials: ConnectionCredentials) => void
}

export const WebSocketContext = createContext<WebSocketContextProps | undefined>(undefined)

export const useWebSocket = () => {
  const context = useContext(WebSocketContext)
  if (!context) {
    throw new Error("useWebSocket must be used within a WebSocketProvider")
  }
  return context
}

export type Token = string

export interface ConnectionCredentials {
  username?: string
  password?: string
  token?: string
}
export interface WebSocketProviderProps {
  url: URL | string
  children: React.ReactNode
}

const buildUrl = ({ username, password, token }: ConnectionCredentials, url: URL | string): URL => {
  url = new URL(url.toString())
  if (username && password) {
    url.username = username
    url.password = password
  } else if (token) {
    url.username = token
  }
  return url
}

export const WebSocketProvider = ({ url: wsUrl, children }: WebSocketProviderProps) => {
  const [socket, setSocket] = useState<WebSocket | null>(null)
  const [isConnected, setIsConnected] = useState(false)
  const [messages, setMessages] = useState<WebSocketResponse[]>([])

  const sendMessage = useFunctionDebouncer(
    () => (message: WebSocketMessage) => {
      console.log(`Sending message: ${JSON.stringify(message)}`)
      if (socket && socket.readyState === WebSocket.OPEN) {
        socket.send(JSON.stringify(message))
      } else {
        console.error("WebSocket is not open")
      }
    },
    1000
  )

  const connect = (credentials: ConnectionCredentials) => {
    const ws = new WebSocket(buildUrl(credentials, wsUrl).toString())
    setSocket(ws)

    ws.onopen = () => {
      console.log("WebSocket connected")
      setIsConnected(true)
    }

    ws.onclose = () => {
      console.log("WebSocket disconnected")
      setIsConnected(false)
    }

    ws.onerror = (err) => console.error("WebSocket error:", err)

    ws.onmessage = (event) => {
      try {
        const message: WebSocketResponse = JSON.parse(event.data)
        console.log(message)
        setMessages((prevMessages) => [...prevMessages, message])
      } catch (error) {
        console.error("Error parsing WebSocket message:", error)
      }
    }

    return () => ws.close()
  }

  return (
    <WebSocketContext.Provider value={{ connect, sendMessage, isConnected, messages }}>
      {children}
    </WebSocketContext.Provider>
  )
}
