import React, { createContext, useContext, useState, useEffect } from "react"
import { useWebSocket } from "./useWebSocket"
import { useLocalStorage } from "./useLocalStorage"
import { IEntityObject, System, World } from "ape-ecs"
import Components from "@lib/components"
import { useLogger } from "@hooks/useLogger"

export interface GameStateContextProps {
  getEntities: (ids: string[]) => IEntityObject[]
  addEntities: (entities: IEntityObject[]) => void
  updateEntities: (entities: IEntityObject[]) => void
  removeEntities: (ids: string[]) => void
  systems: System[]
  addSystem: (system: System) => void
  removeSystem: (id: string) => void
  enableSystems: (ids: string[]) => void
  disableSystems: (ids: string[]) => void
  updateState: (entities: IEntityObject[]) => void
  getState: () => IEntityObject[]
  startGame: () => void
  pauseGame: () => void
  stopGame: () => void
  updateWorld: (world: World) => void
  saveGameState: () => void
  loadGameState: (gameState: IEntityObject[]) => void
  getWorld: () => World
  selectedEntities: string[]
  setSelectedEntities: (ids: string[]) => void
}

export const GameStateContext = createContext<GameStateContextProps>({} as GameStateContextProps)

export const useGameState = () => {
  const context = useContext(GameStateContext)
  if (!context) {
    throw new Error("useGameState must be used within a GameStateProvider")
  }
  return context
}

const ProjectEntity = {
  id: "Project",
  tags: ["Project Tag"],
  components: [
    {
      type: "Project",
      name: "New Project",
      description: "A Brand New Project",
    },
  ],
}

const initializeWord = (entities?: any[] | null) => {
  const newEntities = entities ? entities : [ProjectEntity]
  const world = new World()
  Components.forEach((component) => {
    world.registerComponent(component)
  })
  world.registerTags("Project Tag")
  world.createEntities(newEntities)
  return world
}

export const GameStateProvider = ({ children }: { children: React.ReactNode }) => {
  const logger = useLogger()
  const { messages, sendMessage } = useWebSocket()
  const [gameState, setGameState] = useLocalStorage<IEntityObject[]>(
    "gameState",
    initializeWord().getObject()
  )
  const [world, setWorld] = useLocalStorage<World>("gameState", initializeWord())
  const [selectedEntities, setSelectedEntities] = useState<string[]>([])

  const loadGameState = (locadedGameState: IEntityObject[]) => {
    /**
     * @description Load the game state
     * @param {IEntityObject[]} locadedGameState - The game state to load
     * @returns {void}
     * @example
     * loadGameState([{ id: "1", components: [{ type: "Position", x: 0, y: 0 }] }])
     */
    setGameState(locadedGameState)
    setWorld(initializeWord(locadedGameState))
  }

  const saveGameState = () => {
    try {
      if (sendMessage) sendMessage({ type: "gameState", payload: gameState })
    } catch (error) {
      console.error("Error saving game state:", error)
    }
  }

  useEffect(() => {
    let newWorld: World | null = null
    const message = messages[messages.length - 1]
    if (message && message.type === "gameState") {
      newWorld = initializeWord(message.payload)
      setWorld(newWorld)
    }
    return () => {
      if (newWorld) newWorld = null
    }
  }, [messages, setWorld, setGameState])

  return (
    <GameStateContext.Provider
      value={{
        getEntities: (ids: string[]) => {
          /**
           * @description Get entities by id
           * @param {string[]} ids - The ids of the entities to get
           * @returns {IEntityObject[]} - The entities
           * @example
           * getEntities(["1", "2"])
           */
          return world.getObject().filter((entity) => ids.includes(entity.id))
        },
        addEntities: (entities: IEntityObject[]) => {
          world.createEntities(entities)
          setWorld(world)
        },
        updateEntities: (entities: IEntityObject[]) => {
          entities.forEach((entity) => {
            const existingEntity = world.getEntity(entity.id)
            if (existingEntity) {
              existingEntity.destroy()
              world.createEntity(entity)
            }
          })
          setWorld(world)
        },
        removeEntities: (ids: string[]) => {
          ids.forEach((id) => {
            world.removeEntity(id)
          })
          setWorld(world)
        },
        systems: world.systems,
        addSystem: (system: System) => {
          world.addSystem(system)
          setWorld(world)
        },
        removeSystem: (id: string) => {
          world.removeSystem(id)
          setWorld(world)
        },
        enableSystems: (ids: string[]) => {
          world.enableSystems(ids)
          setWorld(world)
        },
        disableSystems: (ids: string[]) => {
          world.disableSystems(ids)
          setWorld(world)
        },
        updateState: (entities: IEntityObject[]) => {
          world.updateState(entities)
          setWorld(world)
        },
        getState: () => world.getState(),
        startGame: () => {
          world.start()
          setWorld(world)
        },
        pauseGame: () => {
          world.pause()
          setWorld(world)
        },
        stopGame: () => {
          world.stop()
          setWorld(world)
        },
        updateWorld: (newWorld: World) => {
          setWorld(newWorld)
        },
        saveGameState,
        loadGameState,
        getWorld: () => world,
        selectedEntities,
        setSelectedEntities,
      }}>
      {children}
    </GameStateContext.Provider>
  )
}
