import { createContext, useContext, useState } from "react"

import { useGameState } from "./useGameState"
import { useVSCode } from "./useVSCode"
import { useLogger } from "./useLogger"
import useLocalStorageManager from "./useLocalStorage"
import { useWorkspace } from "./useWorkspace"
import FunctionParser, { FunctionData } from "@utils/FunctionParser"

export type Command = FunctionData

interface CommandContextInterface {
  calculateCommands: () => void
  commands: Command[]
}

export const CommandContext = createContext<CommandContextInterface>({
  calculateCommands: () => {},
  commands: [],
})

export const useGetCommands = () => {
  const commands = useContext(CommandContext)
  return commands
}

const getCommands = function (variable: any): Command[] {
  const commands: Command[] = []
  for (const key in variable) {
    if (typeof variable[key] === "function") {
      try {
        const command = FunctionParser.parseFunction(variable[key])
        commands.push(command)
      } catch (error) {
        console.error(error)
      }
    }
  }
  return commands
}

export const CommandProvider = ({ children }: { children: React.ReactNode }) => {
  const [commands, setCommands] = useState<Command[]>([])
  const loggerCommands = useLogger()
  const gameStateCommands = useGameState()
  const vscodeCommands = useVSCode()
  const localStorageCommands = useLocalStorageManager()
  const workspaceCommands = useWorkspace()

  const calculateCommands = (): void => {
    const commands: Command[] = [
      ...getCommands(loggerCommands),
      ...getCommands(gameStateCommands),
      ...getCommands(vscodeCommands),
      ...getCommands(localStorageCommands),
      ...getCommands(workspaceCommands),
    ] as Command[]
    setCommands(commands)
  }
  return (
    <CommandContext.Provider value={{ calculateCommands, commands }}>
      {children}
    </CommandContext.Provider>
  )
}
