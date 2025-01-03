import classNames from "classnames"
import { useState, useEffect } from "react"

export interface FlexFlipperProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  className?: string
  height: number | string
  width: number | string
}

const FlexFlipper = ({ children, className, width, height }: FlexFlipperProps) => {
  const [flexDirection, setFlexDirection] = useState("row")

  useEffect(() => {
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect
        setFlexDirection(width > height ? "row" : "column")
      }
    })
    return () => observer.disconnect()
  }, [])

  return (
    <div
      style={{
        width: flexDirection === "row" ? width : height,
        height: flexDirection === "column" ? height : width,
      }}
      className={classNames(flexDirection === "row" ? "flex" : "flex flex-col", className)}>
      {children}
    </div>
  )
}

export default FlexFlipper
