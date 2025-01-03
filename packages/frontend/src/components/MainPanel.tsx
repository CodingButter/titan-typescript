import VSCodeEditor from "@/components/views/Editor"
import RenderingCanvas from "@/components/views/Viewport"
import { useEffect, useState } from "react"

enum Utility {
  RENDERING = 1,
  VSCODE = 2,
}

const Utilities = [Utility.RENDERING, Utility.VSCODE]

export default function MainPanel() {
  const [utility, setUtility] = useState<Utility>(Utility.VSCODE)

  useEffect(() => {
    /* Use CTRL + enum to change between utilities */
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.altKey) {
        e.preventDefault()
        if (e.key >= "1" && e.key <= "9") {
          setUtility(Utilities[parseInt(e.key) - 1])
        }
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [])
  return (
    <div className="relative flex flex-row h-full w-full bg-surface-background text-surface-text">
      {(() => {
        switch (utility) {
          case Utility.VSCODE:
            return <VSCodeEditor />
          case Utility.RENDERING:
            return <RenderingCanvas />
        }
      })()}
    </div>
  )
}
