import ApeECS from "ape-ecs"
import { Range } from "react-control-panel"

class Position extends ApeECS.Component {
  static poolSize = 100
  static properties = {
    x: 0,
    y: 0,
    coords: `0x0`,
  }
  static serialize = true
  static serializeFields = ["x", "y"]
  static changeEvents = true
  static typeName = "Position"
  static tags = ["Component", "Position"]
  get x() {
    return this._meta.values.x
  }
  set x(value) {
    this._meta.values.x = value
    this.coords = `${this.x.value}x${this.y.value}`
  }
  get y() {
    return this._meta.values.y.value
  }
  set y(value) {
    this._meta.values.y = value
    this.coords = `${this.x.value}x${this.y.value}`
  }
  get values(): any[] {
    return [this.x.value, this.y.value]
  }
  getControlComponent() {
    return {
      x: <Range min={0} max={100} step={1} label="X" />,
      y: <Range min={0} max={100} step={1} label="Y" />,
    }
  }
}

export default Position
