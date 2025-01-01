import { LOG_LEVEL, LoggerTheme } from "@utils/Logger"

// Create a custom theme
const myTheme: LoggerTheme = {
  debugStyle: "color: purple; font-weight: lighter;",
  infoStyle: "color: navy; font-weight: bold;",
  warnStyle: "color: orange; font-weight: bold;",
  errorStyle: "color: red; background: #ffeeee;",
  criticalStyle: "color: white; background: #ff0000; font-weight: bold;",
  timeStyle: "color: #757575; font-style: italic;",
  deltaStyle: "color: green; font-weight: bold;",
}

export const loggerConfig = {
  minLevel: LOG_LEVEL.DEBUG, // Show all logs
  autoGroupByDelta: 100, // Auto group logs that happen within 100ms
  autoGroupCollapsed: false, // Expand them by default
  theme: myTheme, // Apply our custom theme
}
