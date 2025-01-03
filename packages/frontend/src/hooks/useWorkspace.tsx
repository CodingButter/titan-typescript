import React, { createContext, useContext } from "react"
import { useLocalStorage } from "@hooks/useLocalStorage"
import Views from "@views/index"
import { type Direction } from "node_modules/react-resizable-panels/dist/declarations/src/types"
export interface WSPanel {
  id: string
  title: string
  view?: keyof typeof Views
  children?: WSPanel[]
  direction?: Direction
  maxSize?: number
  minSize?: number
  defaultSize?: number
  collapsedSize?: number
  collapsable?: boolean
  collapsed?: boolean
  resizable?: boolean
  hidden?: boolean
  tagName?: keyof HTMLElementTagNameMap
  style?: { [key: string]: string }
  order?: number
  autoSaveId?: string
}

export type Mode = "light" | "dark"

export interface WorkspaceContextInterface {
  colorMode: Mode
  layout: WSPanel
  getColorMode: () => Mode
  getLayout: () => WSPanel
  handleSetColorMode: (mode: Mode) => void
  handleSetLayout: (layout: WSPanel) => void
}

const defaultLayout: WSPanel = 

export const WorkspaceContext = createContext<WorkspaceContextInterface>({
  colorMode: "light",
  layout: defaultLayout,
  getColorMode: () => "light",
  getLayout: () => defaultLayout,
  handleSetColorMode: () => {},
  handleSetLayout: () => {},
})

export const useWorkspace = () => useContext(WorkspaceContext)

export const WorkspaceProvider = ({ children }: { children: React.ReactNode }) => {
  const [colorMode, setColorMode] = useLocalStorage<Mode>("colorMode", "light")
  const [layout, setLayout] = useLocalStorage<WSPanel>("layout", defaultLayout)

  const getColorMode = () => {
    /**
     * @description: Get the color mode from the local storage
     * @returns {Mode} The color mode
     * @usage
     * const colorMode = getColorMode()
     * @preserve
     */
    return colorMode
  }

  const handleSetColorMode = (mode: Mode) => {
    /**
     * @description: Set the color mode in the local storage
     * @param mode
     *  type {Mode}
     *  description The color mode
     *  required true
     * @returns void
     * @usage
     * setColorMode("dark")
     * @preserve
     */
    setColorMode(mode)
  }

  const getLayout = () => {
    /**
     * @description: Get the layout from the local storage
     * @returns {WSPanel} The layout
     * @usage
     * const layout = getLayout()
     * @preserve
     */
    return layout
  }

  const handleSetLayout = (layout: WSPanel) => {
    /**
     * @description: Set the layout in the local storage
     * @param layout
     *  type {WSPanel}
     *  description The layout
     *  required true
     * @returns void
     * @usage
     * setLayout({ title: "Root Panel Group", id: "root-panel-group", direction: "horizontal", autoSaveId: "workspace-layout", children: [ { id: "toolbar", title: "Toolbar", view: "ToolBar", resizable: false, style: { maxWidth: "60px" } }, { id: "hierarchy", title: "Hierarchy", view: "Hierarchy", resizable: true }, { id: "viewport-assets-browser", title: "Viewport & Assets Browser", direction: "vertical", resizable: true, children: [ { id: "viewport", title: "Viewport", view: "Viewport", resizable: true }, { id: "asset-browser", title: "Asset Browser", view: "AssetBrowser", resizable: true }, { id: "editor", title: "Editor", view: "Editor", resizable: true } ] }, { id: "inspector", title: "Inspector", view: "Inspector", resizable: true } ] })
     * @preserve
     */
    setLayout(layout)
  }

  return (
    <WorkspaceContext.Provider
      value={{ colorMode, getColorMode, handleSetColorMode, layout, getLayout, handleSetLayout }}>
      {children}
    </WorkspaceContext.Provider>
  )
}
