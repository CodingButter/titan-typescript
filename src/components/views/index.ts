import Editor from "@views/Editor"
import Hierarchy from "@views/Hierarchy"
import Inspector from "@views/Inspector"
import ToolBar from "@views/ToolBar"
import Viewport from "@views/Viewport"
import AssetBrowser from "./AssetBrowser"

const Sections: { [key: string]: () => JSX.Element } = {
  AssetBrowser,
  Editor,
  Hierarchy,
  Inspector,
  ToolBar,
  Viewport,
}

export default Sections
