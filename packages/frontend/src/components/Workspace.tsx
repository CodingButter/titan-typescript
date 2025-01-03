import { PanelGroup, Panel, PanelResizeHandle } from "react-resizable-panels"
import { WSPanel, useWorkspace } from "@/hooks/useWorkspace"
import type { Direction } from "node_modules/react-resizable-panels/dist/declarations/src/types"
import Views from "@views/index"

const ResizeHandle = ({
  direction = "horizontal",
  disabled = false,
}: {
  direction?: Direction
  disabled?: boolean
}) => {
  const isVertical = direction === "vertical"
  const baseClasses =
    "bg-surface-background flex items-center justify-center transition-all duration-300"
  const sizeClasses = isVertical ? "cursor-row-resize h-2" : "cursor-col-resize w-2"
  const hoverClasses = "hover:bg-accent-background"

  return (
    <PanelResizeHandle
      className={`${baseClasses} ${sizeClasses} ${hoverClasses} ${disabled ? "hidden" : ""}`}
      disabled={disabled}>
      <div
        className={`${
          isVertical ? "w-6 h-1" : "h-6 w-1"
        } bg-accent-background rounded transition-all duration-300 hover:${
          isVertical ? "w-8 h-2" : "h-8 w-2"
        }`}
      />
    </PanelResizeHandle>
  )
}

const WorkspaceWSPanel = ({
  wsPanelComponent,
  parent,
}: {
  wsPanelComponent: WSPanel
  parent?: WSPanel
}) => {
  const { children, id, tagName, direction, view, title, resizable, ...rest } = wsPanelComponent
  const Component = view ? Views[view] : null
  const group_id = `${parent?.id || `root`}-${id}`

  const Children = () => (
    <PanelGroup id={group_id} key={group_id} direction={direction as Direction} {...rest}>
      {children &&
        children.map((child: WSPanel, index: number) => (
          <WorkspaceWSPanel
            parent={wsPanelComponent}
            key={`${group_id}-${child.id}-${index}`}
            wsPanelComponent={{
              ...child,
              resizable: child.resizable && index < children.length - 1,
            }}
          />
        ))}
    </PanelGroup>
  )
  return (
    <>
      <Panel tagName={tagName} id={id} {...rest} title={title}>
        {Component && <Component />}
        {children && <Children />}
      </Panel>
      {<ResizeHandle disabled={!resizable} direction={parent?.direction} />}
    </>
  )
}

export default function Workspace() {
  const { layout } = useWorkspace()
  const { direction, children, tagName, autoSaveId, ...rest } = layout
  return (
    <div id={tagName} className="flex flex-col h-full w-full text-surface-text">
      {layout && (
        <PanelGroup autoSaveId={autoSaveId} direction={direction as Direction} {...rest}>
          {children &&
            children.map((child: WSPanel, index: number) => (
              <WorkspaceWSPanel
                key={`${child.id}-${index}`}
                wsPanelComponent={child}
                parent={layout}
              />
            ))}
        </PanelGroup>
      )}
    </div>
  )
}
