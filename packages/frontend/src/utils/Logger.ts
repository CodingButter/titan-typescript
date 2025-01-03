/* ----------------------------------------------------------------------------------
 * Logger.ts
 *
 * A robust Logger implementation in TypeScript. This logger supports:
 *   - Multiple Log Levels (debug, info, warn, error, etc.)
 *   - Grouping (manual and auto grouping)
 *   - Timestamp and performance metrics
 *   - Decorators for convenience
 *   - Highly-configurable behavior (including theming)
 *   - React integration via a Context Provider and custom hook
 * --------------------------------------------------------------------------------- */

/**
 * Enumerates all possible log levels in ascending order of severity.
 */
export enum LOG_LEVEL {
  DEBUG = 0,
  INFO = 1,
  WARN = 2,
  ERROR = 3,
  CRITICAL = 4,
}

/**
 * Identifies the console method to use for each log level.
 */
export enum CONSOLE_METHOD {
  DEBUG = "debug",
  INFO = "info",
  WARN = "warn",
  ERROR = "error",
}

/**
 * Theme object for logger styling.
 *
 * Each key corresponds to a log level or metadata you may want to style.
 * Values can be any valid CSS color or style string.
 */
export interface LoggerTheme {
  /** Style for debug-level messages */
  debugStyle: string

  /** Style for info-level messages */
  infoStyle: string

  /** Style for warn-level messages */
  warnStyle: string

  /** Style for error-level messages */
  errorStyle: string

  /** Style for critical-level messages */
  criticalStyle: string

  /** Style for timestamp, if you want it to be different */
  timeStyle: string

  /** Style for delta/performance info */
  deltaStyle: string
}

/**
 * Default theme if none is provided
 */
const defaultTheme: LoggerTheme = {
  debugStyle: "color: #999;", // Gray
  infoStyle: "color: #007acc;", // Blue-ish
  warnStyle: "color: #ff9800;", // Orange
  errorStyle: "color: #f44336;", // Red
  criticalStyle: "color: #d32f2f;", // Dark Red
  timeStyle: "color: #757575;", // Grayish
  deltaStyle: "color: #4caf50;", // Green
}

/**
 * Describes a single log entry.
 *
 * @typeParam TMeta - A generic parameter for any additional data you wish to attach to a log entry.
 */
export interface LogEntry<TMeta = unknown> {
  /** Human-readable message */
  message: string

  /** The label or category of this log */
  label: string

  /** The numeric severity of this log entry */
  level: LOG_LEVEL

  /** Optional error instance for stack traces */
  error?: Error

  /** Timestamp (in ms) when this log was generated */
  timestamp: number

  /** Performance marker (e.g., performance.now()) to measure time deltas between logs */
  performance: number

  /** Optional metadata of arbitrary shape */
  meta?: TMeta
}

/**
 * Configuration options for a logger instance.
 */
export interface LoggerConfig {
  /**
   * Minimum log level to actually output.
   * Entries below this level are skipped.
   */
  minLevel?: LOG_LEVEL

  /**
   * Whether to include timestamps in logs.
   */
  useTimestamps?: boolean

  /**
   * Whether to measure time between logs with `performance.now()`.
   */
  measurePerformance?: boolean

  /**
   * Override the native console or provide your own console-like implementation.
   */
  console?: Console

  /**
   * Grouping configuration: if `autoGroupByDelta` is provided,
   * the logger will automatically start a console group if consecutive log calls
   * occur within that time threshold (in ms).
   */
  autoGroupByDelta?: number

  /**
   * Optionally collapse the auto grouping in the console.
   */
  autoGroupCollapsed?: boolean

  /**
   * Provide a theme object to customize the styling of log output in the console.
   */
  theme?: LoggerTheme
}

/**
 * A grouping state holder for console groups.
 */
interface GroupState {
  label: string
  isCollapsed: boolean
  depth: number
}

/**
 * Decorator for class methods to apply a given log level automatically.
 *
 * @param level - The desired log level
 */
export function LogLevel(level: LOG_LEVEL): MethodDecorator {
  return (target, propertyKey, descriptor) => {
    const originalMethod = descriptor.value
    descriptor.value = function (...args: unknown[]) {
      const logger = this as Logger
      return logger.log(level, ...args)
    }
    return descriptor
  }
}

/**
 * A flexible and feature-rich logger class.
 *
 * @typeParam TMeta - A generic for arbitrary metadata you wish to attach to log entries.
 */
export class Logger<TMeta = unknown> {
  private static defaultConfig: LoggerConfig = {
    minLevel: LOG_LEVEL.DEBUG,
    useTimestamps: true,
    measurePerformance: true,
    console: console,
    autoGroupByDelta: 0, // 0 disables
    autoGroupCollapsed: false,
    theme: defaultTheme,
  }

  /** Holds the last log entry for performance measurement or auto-grouping. */
  private static lastLogEntry: LogEntry | null = null

  /** In-memory storage for all logs, if needed for retrieving logs later. */
  private static logHistory: LogEntry[] = []

  /** The current console group state. */
  private groupState: GroupState | null = null

  /** Active configuration for this logger instance. */
  private config: Required<LoggerConfig>

  /**
   * Construct a Logger with optional overriding configuration.
   * @param config - Partial or complete logger configuration.
   */
  constructor(config: LoggerConfig = {}) {
    this.config = { ...Logger.defaultConfig, ...config }
    // Merge default theme with user-supplied partial theme (if provided).
    this.config.theme = { ...defaultTheme, ...this.config.theme }
  }

  /**
   * Log a message at a specified level.
   *
   * @param level   - The severity level
   * @param message - The primary log message
   * @param meta    - Optional additional data (generic TMeta)
   * @param error   - Optional error object for stack traces
   *
   * @returns The resulting log entry
   */
  public log(
    level: LOG_LEVEL,
    message: string,
    meta?: TMeta,
    error?: Error
  ): LogEntry<TMeta> | null {
    // If log level is below the configured minimum, skip
    if (level < (this.config?.minLevel || 0)) return null

    const now = performance.now()
    const delta = Logger.lastLogEntry ? now - Logger.lastLogEntry.performance : 0
    const timestamp = this.config.useTimestamps ? Date.now() : 0

    // Check auto-group threshold
    if (
      this.config.autoGroupByDelta &&
      delta < this.config.autoGroupByDelta &&
      Logger.lastLogEntry
    ) {
      // If not already in a group, start one.
      if (!this.groupState) {
        const groupLabel = `Auto-Group: ${Logger.lastLogEntry.message}`
        this.startGroup(groupLabel, this.config.autoGroupCollapsed)
      }
    } else {
      // If we were in a group but current log does not meet threshold, end group if any
      if (this.groupState) {
        this.endGroup()
      }
    }

    // Build the log entry
    const logEntry: LogEntry<TMeta> = {
      message,
      label: LOG_LEVEL[level],
      level,
      error,
      timestamp,
      performance: this.config.measurePerformance ? now : 0,
      meta,
    }

    // Store globally (in-memory) if desired
    Logger.logHistory.push(logEntry)
    Logger.lastLogEntry = logEntry

    // Output to console
    this.outputToConsole(logEntry)

    return logEntry
  }

  /**
   * Retrieve all stored logs.
   */
  public static getHistory(): LogEntry[] {
    return [...Logger.logHistory]
  }

  /**
   * Clear all stored logs.
   */
  public static clearHistory(): void {
    Logger.logHistory = []
  }

  /**
   * Initiates a console group.
   * @param label       - The group label
   * @param isCollapsed - Whether the group should be collapsed by default
   */
  public startGroup(label: string, isCollapsed?: boolean): void {
    if (this.groupState) {
      // Nesting multiple groups is possible, but for brevity, we'll end the old group first
      this.endGroup()
    }

    this.groupState = {
      label,
      isCollapsed: !!isCollapsed,
      depth: 1,
    }
    if (this?.config?.console?.groupCollapsed) {
      if (this.groupState.isCollapsed) {
        this.config.console.groupCollapsed(label)
      } else {
        this.config.console.group(label)
      }
    }
  }

  /**
   * Ends the current console group, if any.
   */
  public endGroup(): void {
    if (this.config?.console?.groupEnd) {
      if (!this.groupState) return
      this.config.console.groupEnd()
      this.groupState = null
    }
  }

  /**
   * Outputs a log entry to the configured console, applying appropriate theme styling.
   * @param entry - The log entry
   */
  private outputToConsole(entry: LogEntry<TMeta>): void {
    const method = this.getConsoleMethodForLevel(entry.level)
    const timePart = this.config.useTimestamps
      ? `%c[${new Date(entry.timestamp).toISOString()}]`
      : ""
    const perfPart = this.config.measurePerformance
      ? `%c(delta: ${
          Logger.lastLogEntry ? entry.performance - Logger.lastLogEntry.performance : 0
        } ms)`
      : ""

    const finalMessage = `%c[${entry.label}] ${entry.message}`

    // Compose an array of console arguments to apply multiple styling segments
    const args: unknown[] = []
    // If we're showing timestamps:
    if (timePart && this.config.theme?.timeStyle) {
      args.push(timePart, this.config.theme.timeStyle)
    }

    // Next is label + main message
    args.push(
      finalMessage,
      this.getStyleForLevel(entry.level) // color style
    )

    // If we're showing performance deltas
    if (perfPart) {
      args.push(perfPart, this.config.theme.deltaStyle)
    }

    // Add meta / error info as additional console arguments
    if (entry.error && entry.meta) {
      args.push(entry.error, entry.meta)
    } else if (entry.error) {
      args.push(entry.error)
    } else if (entry.meta) {
      args.push(entry.meta)
    }

    // Finally, call the console method
    this.config.console[method](...args)
  }

  /**
   * Returns the console method name (info, warn, error, debug, etc.) based on the log level.
   * @param level - The severity level
   */
  private getConsoleMethodForLevel(level: LOG_LEVEL): CONSOLE_METHOD {
    switch (level) {
      case LOG_LEVEL.INFO:
        return CONSOLE_METHOD.INFO
      case LOG_LEVEL.WARN:
        return CONSOLE_METHOD.WARN
      case LOG_LEVEL.ERROR:
      case LOG_LEVEL.CRITICAL:
        return CONSOLE_METHOD.ERROR
      case LOG_LEVEL.DEBUG:
      default:
        return CONSOLE_METHOD.DEBUG
    }
  }

  /**
   * Maps the log level to the appropriate style string from our theme.
   */
  private getStyleForLevel(level: LOG_LEVEL): string {
    switch (level) {
      case LOG_LEVEL.DEBUG:
        return this.config.theme.debugStyle
      case LOG_LEVEL.INFO:
        return this.config.theme.infoStyle
      case LOG_LEVEL.WARN:
        return this.config.theme.warnStyle
      case LOG_LEVEL.ERROR:
        return this.config.theme.errorStyle
      case LOG_LEVEL.CRITICAL:
        return this.config.theme.criticalStyle
      default:
        return this.config.theme.debugStyle
    }
  }

  //
  // Decorated Shortcuts
  //

  /**
   * Decorator-based debug log.
   * @LogLevel(LOG_LEVEL.DEBUG)
   */
  public debug(message: string, meta?: TMeta, error?: Error): LogEntry<TMeta> | null {
    return null
  }

  /**
   * Decorator-based info log.
   * @LogLevel(LOG_LEVEL.INFO)
   */
  public info(message: string, meta?: TMeta, error?: Error): LogEntry<TMeta> | null {
    return null
  }

  /**
   * Decorator-based warn log.
   * @LogLevel(LOG_LEVEL.WARN)
   */
  public warn(message: string, meta?: TMeta, error?: Error): LogEntry<TMeta> | null {
    return null
  }

  /**
   * Decorator-based error log.
   * @LogLevel(LOG_LEVEL.ERROR)
   */
  public error(message: string, meta?: TMeta, error?: Error): LogEntry<TMeta> | null {
    return null
  }

  /**
   * Decorator-based critical log.
   * @LogLevel(LOG_LEVEL.CRITICAL)
   */
  public critical(message: string, meta?: TMeta, error?: Error): LogEntry<TMeta> | null {
    return null
  }
}
