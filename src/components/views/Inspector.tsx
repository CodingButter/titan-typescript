import { Entity } from "ape-ecs"
import { useGameState } from "@hooks/useGameState"

const Inspector = () => {
  const { selectedEntity } = useGameState()
  const entity = selectedEntity ? selectedEntity : new Entity()
  return <h1>Inspector</h1>
}

export default Inspector
