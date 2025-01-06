import MainLayout from "@/components/Workspace"
import TopBar from "@components/TopBar"
import { useWorkspace } from "@/hooks/useWorkspace"
import classnames from "classnames"

function App() {
  const { colorMode } = useWorkspace()
  return (
    <div className={classnames(colorMode, "w-screen h-screen flex flex-col")}>
      <TopBar />
      <div className="w-full flex h-full items-start justify-start">
        <MainLayout />
      </div>
    </div>
  )
}

export default App
