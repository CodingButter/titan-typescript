import { FaMousePointer, FaArrowsAlt, FaSync, FaExpand, FaEye, FaSearch } from "react-icons/fa"
const ToolBar = () => {
  const tools = [
    { icon: <FaMousePointer />, label: "Select" },
    { icon: <FaArrowsAlt />, label: "Move" },
    { icon: <FaSync />, label: "Rotate" },
    { icon: <FaExpand />, label: "Scale" },
    { icon: <FaEye />, label: "Pan" },
    { icon: <FaSearch />, label: "Zoom" },
  ]
  return (
    <div
      className="flex flex-wrap justify-center h-full w-full items-start bg-primary-background text-primary-text shadow-md"
      role="toolbar"
      aria-label="Main Toolbar">
      <div className="flex flex-col w-full items-center justify-start">
        {tools.map((tool, index) => (
          <button
            key={index}
            className="flex flex-col w-full h-12 items-center justify-center cursor-pointer 
        rounded hover:bg-accent-background hover:text-accent-text 
        focus:bg-accent-background focus:text-accent-text 
        focus:outline-none focus:ring-2 focus:ring-accent-background text-sm "
            title={tool.label}
            aria-label={tool.label}>
            {tool.icon}
            <span className="mt-1">{tool.label}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

export default ToolBar
