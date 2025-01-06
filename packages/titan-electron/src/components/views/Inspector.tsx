import { FunctionArgument } from "@/utils/FunctionParser"
import { Command, useGetCommands } from "@hooks/useGetCommands"
import ReactJson from "react-json-view"

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
      {commands && <ReactJson src={commands} />}
    </div>
  )
}

export default Inspector
