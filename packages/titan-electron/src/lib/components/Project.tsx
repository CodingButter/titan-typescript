import ApeECS from "ape-ecs"
import { Text } from "react-control-panel"

class Project extends ApeECS.Component {
  static poolSize = 10
  static properties = {
    name: "New Project",
    description: "A New Project",
  }
  static serialize = true
  static serializeFields = ["name", "description"]
  static changeEvents = true
  static typeName = "Project"
  get name() {
    return this._meta.values.name
  }
  set name(value) {
    this._meta.values.name = value
  }
  get description() {
    return this._meta.values.description
  }
  set description(value) {
    this._meta.values.description = value
  }
  getControlComponent() {
    return {
      name: <Text label="Name" />,
      description: <Text label="Description" />,
    }
  }
}

export default Project
