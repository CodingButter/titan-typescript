import React from "react"
import { WorkspaceProvider } from "@/hooks/useWorkspace"
import { WebSocketProvider } from "@hooks/useWebSocket"
import { GameStateProvider } from "@hooks/useGameState"
import { LoggerProvider } from "@hooks/useLogger"
import { VSCodeProvider } from "@hooks/useVSCode" // Import the new provider
import { loggerConfig } from "./config/logger.config"
import { CommandProvider } from "./hooks/useGetCommands"

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <LoggerProvider config={loggerConfig}>
      <WebSocketProvider url={new URL("ws://localhost:8080")}>
        <GameStateProvider>
          <VSCodeProvider>
            <WorkspaceProvider>
              <CommandProvider>{children}</CommandProvider>
            </WorkspaceProvider>
          </VSCodeProvider>
        </GameStateProvider>
      </WebSocketProvider>
    </LoggerProvider>
  )
}
