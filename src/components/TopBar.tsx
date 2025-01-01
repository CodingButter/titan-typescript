import React, { useState, KeyboardEvent } from "react"
import { useWorkspace } from "@hooks/useWorkspace"
import classNames from "classnames"

interface DropdownState {
  file: boolean
  view: boolean
  tools: boolean
}

const TopBar: React.FC = () => {
  const { colorMode, setColorMode } = useWorkspace()

  const [dropdowns, setDropdowns] = useState<DropdownState>({
    file: false,
    view: false,
    tools: false,
  })

  const toggleColorMode = () => {
    setColorMode(colorMode === "light" ? "dark" : "light")
  }

  const fileOptions = [
    { label: "Open", action: () => console.log("Open clicked") },
    { label: "Save", action: () => console.log("Save clicked") },
    { label: "Export", action: () => console.log("Export clicked") },
    { label: "Settings", action: () => console.log("Settings clicked") },
  ]

  const viewOptions = [
    { label: "Toggle Layout", action: () => console.log("Toggle Layout clicked") },
    { label: "Show/Hide Panels", action: () => console.log("Show/Hide Panels clicked") },
    { label: `${colorMode[0].toUpperCase()}${colorMode.slice(1)} Theme`, action: toggleColorMode },
  ]

  const toolsOptions = [
    { label: "Select", action: () => console.log("Select clicked") },
    { label: "Move/Translate", action: () => console.log("Move/Translate clicked") },
    { label: "Rotate", action: () => console.log("Rotate clicked") },
    { label: "Scale", action: () => console.log("Scale clicked") },
    { label: "Pan", action: () => console.log("Pan clicked") },
    { label: "Zoom", action: () => console.log("Zoom clicked") },
  ]

  const toggleDropdown = (key: keyof DropdownState) => {
    setDropdowns((prev) => {
      const newState: DropdownState = { file: false, view: false, tools: false }
      newState[key] = !prev[key]
      return newState
    })
  }

  const closeDropdowns = () => {
    setDropdowns({ file: false, view: false, tools: false })
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLButtonElement>, key: keyof DropdownState) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault()
      toggleDropdown(key)
    }
  }

  const renderDropdownItems = (items: { label: string; action: () => void }[]) => (
    <ul role="menu" className="bg-surface-background text-surface-text shadow-lg rounded">
      {items.map((item, index) => (
        <li
          key={index}
          role="menuitem"
          tabIndex={0}
          className="px-8 py-2 cursor-pointer focus:outline-none hover:bg-accent-background hover:text-accent-text"
          onClick={() => {
            item.action()
            closeDropdowns()
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault()
              item.action()
              closeDropdowns()
            }
          }}>
          {item.label}
        </li>
      ))}
    </ul>
  )

  return (
    <div
      id="top-bar"
      className="relative z-10 flex items-center justify-start h-12 w-full bg-primary-background text-primary-text shadow-lg rounded-sm"
      onClick={closeDropdowns}>
      {/* File Dropdown */}
      <div
        className={classNames(dropdowns.file && "focused", "relative")}
        onClick={(e) => e.stopPropagation()}>
        <button
          className="px-4 py-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-background"
          onClick={() => toggleDropdown("file")}
          onKeyDown={(e) => handleKeyDown(e, "file")}
          aria-haspopup="true"
          aria-expanded={dropdowns.file}
          aria-label="File Menu">
          File
        </button>
        {dropdowns.file && (
          <div role="menu" className="absolute left-0 rounded shadow-md">
            {renderDropdownItems(fileOptions)}
          </div>
        )}
      </div>

      {/* View Dropdown */}
      <div
        className={classNames(dropdowns.view && "focused", "relative")}
        onClick={(e) => e.stopPropagation()}>
        <button
          className="px-4 py-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-background"
          onClick={() => toggleDropdown("view")}
          onKeyDown={(e) => handleKeyDown(e, "view")}
          aria-haspopup="true"
          aria-expanded={dropdowns.view}
          aria-label="View Menu">
          View
        </button>
        {dropdowns.view && (
          <div role="menu" className="absolute left-0 rounded shadow-md">
            {renderDropdownItems(viewOptions)}
          </div>
        )}
      </div>

      {/* Tools Dropdown */}
      <div
        className={classNames(dropdowns.tools && "focused", "relative")}
        onClick={(e) => e.stopPropagation()}>
        <button
          className="px-4 py-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-background"
          onClick={() => toggleDropdown("tools")}
          onKeyDown={(e) => handleKeyDown(e, "tools")}
          aria-haspopup="true"
          aria-expanded={dropdowns.tools}
          aria-label="Tools Menu">
          Tools
        </button>
        {dropdowns.tools && (
          <div role="menu" className="absolute left-0 rounded shadow-md">
            {renderDropdownItems(toolsOptions)}
          </div>
        )}
      </div>
    </div>
  )
}

export default TopBar
