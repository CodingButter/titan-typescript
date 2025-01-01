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
      className="h-full flex flex-col items-center w-16 p-2 bg-surface-background text-surface-text"
      role="toolbar"
      aria-label="Main Toolbar">
      {tools.map((tool, index) => (
        <button
          key={index}
          className="flex flex-col items-center justify-center w-12 h-12 mb-4 cursor-pointer 
                     rounded hover:bg-accent-background hover:text-accent-text 
                     focus:bg-accent-background focus:text-accent-text 
                     focus:outline-none focus:ring-2 focus:ring-accent-background text-sm"
          title={tool.label}
          aria-label={tool.label}>
          {tool.icon}
          <span className="mt-1">{tool.label}</span>
        </button>
      ))}
    </div>
  )
}

export default ToolBar
