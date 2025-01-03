/* ----------------------------------------------------------------
 * LoggerContext.tsx
 *
 * Provides a React Context for the Logger, along with a custom hook.
 * ---------------------------------------------------------------- */

import React, { createContext, useContext, useMemo } from "react"
import { Logger, LoggerConfig } from "@utils/Logger"

/**
 * Shape of the LoggerContext value.
 */
interface LoggerContextValue {
  logger: Logger
}

/**
 * Create the actual context object.
 */
const LoggerContext = createContext<LoggerContextValue | null>(null)

/**
 * Props for the LoggerProvider
 */
interface LoggerProviderProps {
  /**
   * (Optional) You can pass a custom logger configuration or
   * an already instantiated Logger object if you prefer.
   */
  config?: LoggerConfig
  logger?: Logger
  children: React.ReactNode
}

/**
 * A Context Provider that supplies a shared Logger instance
 * to all consumers in the React tree.
 */
export const LoggerProvider: React.FC<LoggerProviderProps> = ({ config, logger, children }) => {
  // Create a memoized logger instance if none is provided
  const loggerInstance = useMemo(() => {
    if (logger) return logger
    return new Logger(config)
  }, [logger, config])

  return (
    <LoggerContext.Provider value={{ logger: loggerInstance }}>{children}</LoggerContext.Provider>
  )
}

/**
 * Custom hook to retrieve the shared Logger instance.
 *
 * @throws Error if used outside of a LoggerProvider
 */
export function useLogger(): Logger {
  const context = useContext(LoggerContext)
  if (!context) {
    throw new Error("useLogger must be used within a LoggerProvider")
  }
  return context.logger
}
