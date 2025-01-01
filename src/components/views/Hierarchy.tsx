import { useGameState } from "@hooks/useGameState"
import classNames from "classnames"

const Hierarchy = () => {
  const { world, setWorld, selectedEntities, setSelectedEntities } = useGameState()

  const handleAddEntity = () => {
    world.createEntity({
      components: [],
    })
    setWorld(world)
  }

  const handleRemoveEntity = (id: string) => {
    world.removeEntity(id)
    setWorld(world)
  }

  const handleEntitySelect = (id: string) => {
    if (selectedEntities.includes(id)) {
      setSelectedEntities(selectedEntities.filter((entityId) => entityId !== id))
    } else {
      setSelectedEntities([...selectedEntities, id])
    }
  }

  return (
    <div className="EntityPanel w-full flex flex-col justify-center bg-surface-background text-surface-text">
      <button
        onClick={handleAddEntity}
        className="w-full px-4 py-2 mb-4 rounded bg-primary-background text-primary-text 
                   hover:bg-accent-background hover:text-accent-text focus:outline-none 
                   focus:ring-2 focus:ring-accent-background">
        Add Entity
      </button>
      <ul className="flex flex-col gap-2 justify-start items-center w-full">
        {world?.getObject()?.map((entity) => {
          const selected = selectedEntities.includes(entity.id)
          return (
            <li
              key={entity.id}
              className={classNames(
                "cursor-pointer w-full rounded p-2",
                selected
                  ? "bg-accent-background text-accent-text"
                  : "hover:bg-accent-background hover:text-accent-text"
              )}>
              <h3
                id={entity.id}
                onClick={() => handleEntitySelect(entity.id)}
                className="p-2 w-full cursor-pointer text-center">
                {entity.id}
              </h3>
              {selected && (
                <button
                  className="w-full px-4 py-2 mt-2 rounded bg-danger-background text-danger-text 
                             hover:bg-danger-background-light focus:outline-none 
                             focus:ring-2 focus:ring-danger-background"
                  onClick={() => handleRemoveEntity(entity.id)}>
                  Remove
                </button>
              )}
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default Hierarchy
