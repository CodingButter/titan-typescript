export interface WebSocketMessage {
  type: "state" | "asset" | "error"
  payload: any
}

// State Message Type
export interface StateMessage extends WebSocketMessage {
  type: "state"
  payload: Record<string, any> // Adjust as needed based on state structure
}

// Asset Upload Message Type
export interface AssetMessage extends WebSocketMessage {
  type: "asset"
  payload: {
    filename: string
    data: string // Base64 encoded data
  }
}

// Error Message Type
export interface ErrorMessage extends WebSocketMessage {
  type: "error"
  payload: {
    message: string
  }
}

// Server Response Types
export type WebSocketResponse =
  | { type: "state"; status: "saved" }
  | { type: "asset"; status: "uploaded"; path: string }
  | { type: "error"; message: string }

// Utility Types for Client and Server
export type WebSocketRequest = StateMessage | AssetMessage
