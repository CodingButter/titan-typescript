import React, { useContext, createContext, useEffect, useState } from "react"
import { useFunctionDebouncer } from "@hooks/useDebounce"
import type { WebSocketMessage, WebSocketResponse } from "WebSocketServer"
export interface WebSocketContextProps {
  url: URL | string
  sendMessage?: (message: any) => void
  messages: any[]
  isConnected?: boolean
}

export const WebSocketContext = createContext<WebSocketContextProps | undefined>(undefined)

export const useWebSocket = () => {
  const context = useContext(WebSocketContext)
  if (!context) {
    throw new Error("useWebSocket must be used within a WebSocketProvider")
  }
  return context
}

export interface WebSocketProviderProps extends WebSocketContextProps {
  children: React.ReactNode
  url: URL | string
}

export const WebSocketProvider = ({ url = "", children }: Partial<WebSocketProviderProps>) => {
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

  useEffect(() => {
    const ws = new WebSocket(url)
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
  }, [url])

  return (
    <WebSocketContext.Provider value={{ url, sendMessage, isConnected, messages }}>
      {children}
    </WebSocketContext.Provider>
  )
}
