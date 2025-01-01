import MonicoEditor from "@monaco-editor/react"
import { useVSCode } from "@hooks/useVSCode"

const Editor = () => {
  const { editorRef, setValue, getValue } = useVSCode()

  return (
    <div className="h-screen w-full bg-surface-background text-surface-text p-4">
      <h1 className="text-xl font-bold mb-4">VSCode Editor Example</h1>
      <div className="w-full h-96">
        <MonicoEditor
          defaultLanguage="typescript"
          defaultValue="// Start coding here..."
          theme="vs-dark"
          onMount={(editor) => {
            editorRef.current = editor // Attach the editor instance to the ref
          }}
        />
      </div>
      <button
        onClick={() => setValue("// Updated Content")}
        className="mt-4 px-4 py-2 bg-accent-background text-accent-text rounded">
        Update Editor Content
      </button>
      <button
        onClick={() => console.log("Current Content:", getValue())}
        className="mt-4 ml-4 px-4 py-2 bg-accent-background text-accent-text rounded">
        Log Editor Content
      </button>
    </div>
  )
}

export default Editor
