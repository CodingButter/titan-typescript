import { PanelGroup, Panel, PanelResizeHandle } from "react-resizable-panels"
import { Section, useWorkspace } from "@/hooks/useWorkspace"
import { Direction } from "node_modules/react-resizable-panels/dist/declarations/src/types"
import { useLogger } from "@/hooks/useLogger"
import Views from "@views/index"

const ResizeHandle = ({ direction = "vertical" }: { direction?: Direction }) => {
  if (direction === "vertical") {
    return (
      <PanelResizeHandle className="bg-surface-background cursor-row-resize h-2 flex items-center justify-center hover:bg-accent-background transition-all duration-300">
        <div className="w-6 h-1 bg-accent-background rounded hover:w-8 hover:h-2 transition-all duration-300" />
      </PanelResizeHandle>
    )
  } else {
    return (
      <PanelResizeHandle className="bg-surface-background cursor-col-resize w-2 flex items-center justify-center hover:bg-accent-background transition-all duration-300">
        <div className="h-6 w-1 bg-accent-background rounded hover:h-8 hover:w-2 transition-all duration-300" />
      </PanelResizeHandle>
    )
  }
}

const WorkspaceSection = ({ section }: { section: Section }) => {
  return (
    <PanelGroup
      key={section.id}
      autoSaveId={`main-layout-${section.id}`}
      direction={section.direction || "horizontal"}
      className="flex-grow">
      {section.children
        ? section.children.map((child: Section, index: number) => (
            <>
              <Panel key={index} className="flex-grow">
                <WorkspaceSection section={child} />
              </Panel>
              {section.children && index < section.children.length - 1 && child.resizable && (
                <ResizeHandle direction={section.direction} />
              )}
            </>
          ))
        : section.View && Views[section.View] && Views[section.View]()}
    </PanelGroup>
  )
}

export default function Workspace() {
  const { layout } = useWorkspace()
  const logger = useLogger()

  logger.debug("Workspace rendered")

  return (
    <div className="flex flex-col h-full w-screen bg-surface-background text-surface-text">
      {layout && <WorkspaceSection section={layout} />}
    </div>
  )
}
