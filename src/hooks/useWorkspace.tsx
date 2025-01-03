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
  setColorMode: (mode: Mode) => void
  layout: WSPanel
  setLayout: (layout: WSPanel) => void
}

const defaultLayout: WSPanel = {
  title: "Root Panel Group",
  id: "root-panel-group",
  direction: "horizontal",
  autoSaveId: "workspace-layout",
  children: [
    /* ToolBar */
    {
      id: "toolbar",
      title: "Toolbar",
      view: "ToolBar",
      resizable: false,
      style: { maxWidth: "60px" },
    },
    {
      id: "hierarchy",
      title: "Hierarchy",
      view: "Hierarchy",
      resizable: true,
    },
    {
      id: "viewport-assets-browser",
      title: "Viewport & Assets Browser",
      direction: "vertical",
      resizable: true,
      children: [
        {
          id: "viewport",
          title: "Viewport",
          view: "Viewport",
          resizable: true,
        },
        {
          id: "asset-browser",
          title: "Asset Browser",
          view: "AssetBrowser",
          resizable: true,
        },
        {
          id: "editor",
          title: "Editor",
          view: "Editor",
          resizable: true,
        },
      ],
    },
    {
      id: "inspector",
      title: "Inspector",
      view: "Inspector",
      resizable: true,
    },
  ],
}

export const WorkspaceContext = createContext<WorkspaceContextInterface>({
  colorMode: "light",
  setColorMode: () => {},
  layout: defaultLayout,
  setLayout: () => {},
})

export const useWorkspace = () => useContext(WorkspaceContext)

export const WorkspaceProvider = ({ children }: { children: React.ReactNode }) => {
  const [colorMode, setColorMode] = useLocalStorage<Mode>("colorMode", "light")
  const [layout, setLayout] = useLocalStorage<WSPanel>("layout", defaultLayout)

  return (
    <WorkspaceContext.Provider value={{ colorMode, setColorMode, layout, setLayout }}>
      {children}
    </WorkspaceContext.Provider>
  )
}
