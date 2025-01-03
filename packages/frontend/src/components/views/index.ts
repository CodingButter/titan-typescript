import Editor from "@views/Editor"
import Hierarchy from "@views/Hierarchy"
import Inspector from "@views/Inspector"
import ToolBar from "@views/ToolBar"
import Viewport from "@views/Viewport"
import AssetBrowser from "./AssetBrowser"
import { Direction } from "node_modules/react-resizable-panels/dist/declarations/src/types"

export interface ViewProps extends React.HTMLAttributes<HTMLDivElement> {
  direction: Direction
}

const Sections: { [key: string]: () => JSX.Element } = {
  AssetBrowser,
  Editor,
  Hierarchy,
  Inspector,
  ToolBar,
  Viewport,
}

export default Sections
