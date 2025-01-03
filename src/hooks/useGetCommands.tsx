import { createContext, useContext, useState, useEffect } from "react"

import { useGameState } from "./useGameState"
import { useVSCode } from "./useVSCode"
import { useLogger } from "./useLogger"
import useLocalStorageManager from "./useLocalStorage"
import { useWorkspace } from "./useWorkspace"

export interface Command {
  name: string
  func: (...args: any) => any
  description: string
}

interface CommandContextInterface {
  calculateCommands: () => void
  commands: Command[]
}

export const CommandContext = createContext<CommandContextInterface>({})

export const useGetCommands = () => {
  const commands = useContext(CommandContext)
  return commands
}

const STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/gm
const ARGUMENT_NAMES = /([^\s,]+)/g
function getParamNames(func) {
  const fnStr = func.toString() //.replace(STRIP_COMMENTS, "")
  let result = fnStr //.slice(fnStr.indexOf("(") + 1, fnStr.indexOf(")")).match(ARGUMENT_NAMES)
  if (result === null) result = []
  return result
}

function wrapDescription(func: (...args: any) => any): (...args: any) => any {
  return function (...args: any) {
    return getParamNames(func)
  }
}

/**
 * @description This is a function that takes a variable and checks its type.
 * if its an object it loops through its keys and calls the function recursively.
 * the goal of the function is to return an array of function objects that will have
 * a name a callable reference to the function and a description of the function.
 * it will check if the function returns a description when called with the current scope which
 * will contain a veriable show_description set to true. if it errors we will catch the error and ingore the function
 * @params {any} variable - variable to check for functions
 * @returns Command[] - array of function objects
 */
const getCommands = function (variable: any): Command[] {
  const commands: Command[] = []
  for (const key in variable) {
    if (typeof variable[key] === "function") {
      try {
        const description = wrapDescription(variable[key]).call({ show_description: true })
        commands.push({ name: key, func: variable[key], description })
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
