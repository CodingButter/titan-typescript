import { Command, useGetCommands } from "@hooks/useGetCommands"

const Inspector = () => {
  const { commands, calculateCommands } = useGetCommands()

  return (
    <div className="w-full h-full flex flex-col justify-start bg-contrast-background text-contrast-text overflow-y-auto">
      <h1 className="text-4xl text-center p-4">Commands</h1>
      <button
        onClick={calculateCommands}
        className="w-full px-4 py-2 mb-4 rounded bg-primary-background text-primary-text 
                   hover:bg-accent-background hover:text-accent-text focus:outline-none 
                   focus:ring-2 focus:ring-accent-background">
        Calculate Commands
      </button>
      <ul className="flex flex-col gap-2 justify-start items-center w-full">
        {commands.map((command: Command, index: number) => (
          <li
            key={`${command.name}-${index}`}
            className="cursor-pointer w-full rounded p-2 bg-surface-background text-surface-text flex flex-col justify-center items-start">
            <h3 className="p-2 w-full cursor-pointer text-center">{command.name}</h3>
            <p>{command.description}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Inspector
