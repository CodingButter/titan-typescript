import { IconProp } from "@fortawesome/fontawesome-svg-core"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { CSSProperties } from "react"
import React, { useState, useEffect } from "react"

export type IconStyle = { [key: string]: string }
export interface IState {
  kit?: string
  icon?: string
  style?: CSSProperties
}

export type StateKey = "hover" | "focus" | "active" | "disabled"
export interface IStateObject {
  hover?: IState
  focus?: IState
  active?: IState
  disabled?: IState
}

export interface ITool {
  label: string
  icon: string
  kit: string
  style?: CSSProperties
  states?: IStateObject
}

export interface IToolProps extends React.ComponentProps<"button"> {
  tool: ITool
}

const ToolButton = ({ tool, disabled }: IToolProps) => {
  const [buttonState, setButtonState] = useState<StateKey | null>(disabled ? "disabled" : null)
  const { kit, icon } = tool

  return (
    <button
      onMouseEnter={() => setButtonState("hover")}
      onMouseLeave={() => setButtonState(null)}
      onFocus={() => setButtonState("focus")}
      onBlur={() => setButtonState(null)}
      onMouseDown={() => setButtonState("active")}
      onMouseUp={() => setButtonState(null)}
      disabled={buttonState === "disabled"}
      className="flex flex-col w-full h-12 items-center justify-center cursor-pointer 
        rounded hover:bg-accent-background hover:text-accent-text 
        focus:bg-accent-background focus:text-accent-text 
        focus:outline-none focus:ring-2 focus:ring-accent-background text-sm "
      title={tool.label}
      aria-label={tool.label}
      style={tool?.style}>
      <FontAwesomeIcon icon={[kit, icon] as IconProp} />
      <span className="mt-1">{tool.label}</span>
    </button>
  )
}

export default ToolButton
