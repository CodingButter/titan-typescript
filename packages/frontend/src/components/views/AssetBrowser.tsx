import { useState } from "react"
import { FaFolder, FaFileAlt, FaJsSquare, FaImage, FaSearch } from "react-icons/fa"

const ASSET_SERVER = import.meta.env.VITE_ASSET_SERVER

// Define types for files and folders
type File = {
  name: string
  type: "file"
  extension: string
  thumbnail?: string
}

type Folder = {
  name: string
  type: "folder"
  children: (File | Folder)[]
}

type FileOrFolder = File | Folder

// Mock file tree with sprite and other files
const mockFileTree: Folder = {
  name: "Home",
  type: "folder",
  children: [
    {
      name: "src",
      type: "folder",
      children: [
        { name: "index.js", type: "file", extension: "js" },
        { name: "app.js", type: "file", extension: "js" },
      ],
    },
    {
      name: "assets",
      type: "folder",
      children: [
        {
          name: "logo.png",
          type: "file",
          extension: "png",
          thumbnail: "/fluid-sim/thumbnails/logo.png",
        },
        {
          name: "sprite.png",
          type: "file",
          extension: "png",
          thumbnail: "/fluid-sim/thumbnails/sprite.png",
        },
        {
          name: "background.jpg",
          type: "file",
          extension: "jpg",
          thumbnail: "/fluid-sim/thumbnails/background.jpg",
        },
      ],
    },
    {
      name: "styles",
      type: "folder",
      children: [
        { name: "main.css", type: "file", extension: "css" },
        { name: "theme.css", type: "file", extension: "css" },
      ],
    },
    { name: "README.md", type: "file", extension: "md" },
  ],
}

// Helper function to get icons for files and folders
const getFileIcon = (file: FileOrFolder) => {
  if (file.type === "folder") return <FaFolder className="text-yellow-500" />
  if (file.extension === "js") return <FaJsSquare className="text-yellow-400" />
  if (file.extension === "css") return <FaFileAlt className="text-green-500" />
  if (file.extension === "png" || file.extension === "jpg")
    return <FaImage className="text-blue-400 aspect-square" />
  return <FaFileAlt className="text-gray-400 aspect-square" />
}

const AssetBrowser = () => {
  const [currentFolder, setCurrentFolder] = useState<Folder>(mockFileTree) // Current folder state
  const [breadcrumbs, setBreadcrumbs] = useState<string[]>(["Home"]) // Breadcrumb navigation
  const [searchMain, setSearchMain] = useState("")
  const [viewMode, setViewMode] = useState<"grid" | "list" | "details">("grid")

  // Navigate to a folder and update breadcrumbs
  const handleFolderClick = (folder: Folder) => {
    setCurrentFolder(folder)
    setBreadcrumbs((prev) => [...prev, folder.name])
  }

  // Navigate back via breadcrumbs
  const handleBreadcrumbClick = (index: number) => {
    const path = breadcrumbs.slice(0, index + 1) // Slice breadcrumbs to the selected level
    let folder: Folder = mockFileTree

    for (let i = 1; i < path.length; i++) {
      const child = folder.children.find((child) => child.name === path[i]) as Folder
      if (child?.type === "folder") folder = child
    }

    setBreadcrumbs(path)
    setCurrentFolder(folder)
  }

  // Filter files and folders based on search input
  const filteredFiles = currentFolder.children.filter((item) =>
    item.name.toLowerCase().includes(searchMain.toLowerCase())
  )

  return (
    <div className="flex flex-col h-full bg-surface-background text-surface-text p-4">
      {/* Breadcrumbs */}
      <div className="p-2 bg-primary-background text-primary-text rounded mb-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          {breadcrumbs.map((crumb, index) => (
            <span
              key={index}
              className={`text-sm font-medium cursor-pointer ${
                index === breadcrumbs.length - 1 ? "text-accent-text" : ""
              }`}
              onClick={() => handleBreadcrumbClick(index)}>
              {crumb}
              {index < breadcrumbs.length - 1 && <span className="mx-1">/</span>}
            </span>
          ))}
        </div>
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setViewMode("grid")}
            className={`px-3 py-1 rounded text-sm ${
              viewMode === "grid" ? "bg-accent-background text-accent-text" : ""
            }`}>
            Grid
          </button>
          <button
            onClick={() => setViewMode("list")}
            className={`px-3 py-1 rounded text-sm ${
              viewMode === "list" ? "bg-accent-background text-accent-text" : ""
            }`}>
            List
          </button>
          <button
            onClick={() => setViewMode("details")}
            className={`px-3 py-1 rounded text-sm ${
              viewMode === "details" ? "bg-accent-background text-accent-text" : ""
            }`}>
            Details
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="mb-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search files..."
            value={searchMain}
            onChange={(e) => setSearchMain(e.target.value)}
            className="w-full px-4 py-2 rounded bg-surface-background text-surface-text border border-contrast-background-light focus:outline-none focus:ring-2 focus:ring-accent-background"
          />
          <FaSearch className="absolute top-3 right-3 text-contrast-text" />
        </div>
      </div>

      {/* Main Content */}
      <div
        className={`grid gap-4 ${
          viewMode === "grid"
            ? "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4"
            : viewMode === "list"
            ? "grid-cols-1"
            : "grid-cols-1 lg:grid-cols-2"
        }`}>
        {filteredFiles.map((file: FileOrFolder) => (
          <div
            key={file.name}
            className={`aspect-square p-4 bg-surface-background text-surface-text rounded shadow flex ${
              viewMode === "grid"
                ? "flex-col items-center space-y-2"
                : "flex-row items-center space-x-4"
            }`}
            onClick={() => file.type === "folder" && handleFolderClick(file)}>
            {file.type === "file" && file.thumbnail ? (
              <img
                src={`${ASSET_SERVER}${file.thumbnail}`}
                alt={file.name}
                className={`aspect-square rounded border border-contrast-background-light shadow-md ${
                  viewMode === "grid" ? "w-24 h-24 object-cover" : "w-16 h-16 object-cover "
                }`}
              />
            ) : (
              <div
                className={`rounded bg-neutral-200 border border-contrast-background-light flex items-center justify-center shadow-md ${
                  viewMode === "grid" ? "w-24 h-24" : "w-16 h-16"
                }`}>
                <div className="text-3xl aspect-square">{getFileIcon(file)}</div>
              </div>
            )}
            <div className={`${viewMode === "grid" ? "text-center" : "text-left"}`}>
              <p className="text-sm font-medium">{file.name}</p>
              {viewMode === "details" && <p className="text-xs text-contrast-text">{file.type}</p>}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default AssetBrowser
