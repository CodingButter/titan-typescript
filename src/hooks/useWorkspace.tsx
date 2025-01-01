import React, { createContext, useContext } from "react"
import { useLocalStorage } from "@hooks/useLocalStorage"
import Views from "@views/index"
import { Direction } from "node_modules/react-resizable-panels/dist/declarations/src/types"

export interface Section {
  id: string
  title: string
  view?: keyof typeof Views
  children: Section[]
  direction?: Direction
  resizable?: boolean
  width?: number | string
  height?: number | string
  min_width?: number | string
  min_height?: number | string
  collapsable?: boolean
  collapsed?: boolean
  hidden?: boolean
}

export type Mode = "light" | "dark"

export interface WorkspaceContextInterface {
  colorMode: Mode
  setColorMode: (mode: Mode) => void
  layout: Section
  setLayout: (layout: Section) => void
}

const defaultLayout: Section = {
  id: "root",
  title: "Root",
  children: [
    {
      id: "left-sidebar",
      title: "ToolBar",
      view: "ToolBar",
      children: [],
      width: 75,
      min_width: 25,
      resizable: false,
      collapsable: true,
    },
    {
      id: "hierarchy",
      title: "Hierarchy",
      view: "Hierarchy",
      children: [],
      resizable: true,
      collapsable: true,
      width: 200,
      min_width: 25,
    },
    {
      id: "main-Viewport",
      title: "Main Viewport",
      children: [
        {
          id: "Viewport",
          title: "Viewport",
          view: "Viewport",
          resizable: true,
          height: "100%",
        },
        {
          id: "asset-browser",
          title: "Asset Browser",
          view: "AssetBrowser",
          resizable: true,
          height: 250,
        },
      ],
      direction: "vertical",
      resizable: true,
      width: "100%",
    },
    {
      id: "inspector",
      title: "Inspector",
      view: "Inspector",
      resizable: true,
      collapsable: true,
      width: 200,
      min_width: 25,
    },
  ],
  direction: "horizontal",
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
  const [layout, setLayout] = useLocalStorage<Section>("layout", defaultLayout)

  return (
    <WorkspaceContext.Provider value={{ colorMode, setColorMode, layout, setLayout }}>
      {children}
    </WorkspaceContext.Provider>
  )
}
