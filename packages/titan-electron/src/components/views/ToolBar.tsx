import ToolButton, { ITool } from "../ToolButton"
import tools from "@/config/tools.json"

const ToolBar = () => {
  return (
    <div
      className="flex flex-wrap justify-center h-full w-full items-start bg-primary-background text-primary-text shadow-md"
      role="toolbar"
      aria-label="Main Toolbar">
      <div className="flex flex-col w-full items-center justify-start">
        {tools.map((tool: ITool, index: number) => (
          <ToolButton key={index} tool={tool} />
        ))}
      </div>
    </div>
  )
}

export default ToolBar
