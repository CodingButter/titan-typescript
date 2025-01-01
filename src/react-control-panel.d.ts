declare module "react-control-panel" {
  import React, { ReactNode, CSSProperties } from "react"

  export interface ControlPanelProps {
    theme?: "light" | "dark"
    title?: string
    initialState: Record<string, any>
    onChange?: (key: string, value: any, state: Record<string, any>) => void
    width?: number
    style?: CSSProperties
    children?: ReactNode
  }

  export interface BaseControlProps {
    label: string
    disabled?: boolean
  }

  export interface RangeProps extends BaseControlProps {
    min: number
    max: number
    step?: number
  }

  export interface TextProps extends BaseControlProps {
    placeholder?: string
  }

  export type CheckboxProps = BaseControlProps

  export interface ColorProps extends BaseControlProps {
    format?: "rgb" | "hex"
  }

  export interface SelectProps extends BaseControlProps {
    options: Record<string, any> | string[]
  }

  export interface IntervalProps extends BaseControlProps {
    min: number
    max: number
  }

  export interface MultiboxProps extends BaseControlProps {
    colors?: string[]
    names?: string[]
  }

  export interface ButtonProps extends BaseControlProps {
    action: () => void
  }

  export type ControlType = Range | Text | Checkbox | Color | Select | Interval | Multibox | Button

  export const ControlPanel: React.FC<ControlPanelProps>
  export const Range: React.FC<RangeProps>
  export const Text: React.FC<TextProps>
  export const Checkbox: React.FC<CheckboxProps>
  export const Color: React.FC<ColorProps>
  export const Select: React.FC<SelectProps>
  export const Interval: React.FC<IntervalProps>
  export const Multibox: React.FC<MultiboxProps>
  export const Button: React.FC<ButtonProps>

  export default ControlPanel
}
