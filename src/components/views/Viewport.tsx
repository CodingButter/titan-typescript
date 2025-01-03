import { useEffect, useRef, useState } from "react"
/**
 * This component will place the canvas element in the center of the container and render the scene.
 * It should be absolute positioned to the top left corner and be the entire width and height of the screen. setting the canvas to 100% width and height will make it fill the entire screen. as well as updating the canvas size to the window size.
 */
const Viewport = () => {
  const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null)
  const [size, setSize] = useState<{ width: number; height: number }>({
    width: window.innerWidth,
    height: window.innerHeight,
  })
  const canvasRef = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const resizer = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }
    window.addEventListener("resize", resizer)
    if (canvasRef.current) {
      const canvas = canvasRef.current
      setCtx(canvas.getContext("2d") as CanvasRenderingContext2D)
    }
    return () => {
      window.removeEventListener("resize", resizer)
    }
  }, [])
  useEffect(() => {
    if (ctx) {
      ctx.fillStyle = "blue"
      ctx.fillRect(0, 0, size.width, size.height)
    }
  }, [ctx, size])
  return (
    <div className="absolute top-0 left-0 -z-10">
      <canvas ref={canvasRef} className="w-full h-full" width={size.width} height={size.height} />
    </div>
  )
}

export default Viewport
