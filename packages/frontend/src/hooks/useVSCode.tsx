import React, { createContext, useContext, useRef } from "react"
import { useMonaco } from "@monaco-editor/react"
import * as monaco from "monaco-editor" // Explicitly import the monaco namespace

interface VSCodeContextValue {
  monacoInstance: monaco.editor.IStandaloneCodeEditor | null
  editorRef: React.MutableRefObject<monaco.editor.IStandaloneCodeEditor | null>
  setValue: (value: string) => void
  getValue: () => string
  executeCommand: (command: string) => void
  registerLanguage: (
    languageId: string,
    configuration: monaco.languages.LanguageConfiguration
  ) => void
}

const VSCodeContext = createContext<VSCodeContextValue | undefined>(undefined)

export const VSCodeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null)
  const monacoInstance = useMonaco()

  const setValue = (value: string) => {
    editorRef.current?.setValue(value)
  }

  const getValue = () => {
    return editorRef.current?.getValue() || ""
  }

  const executeCommand = (command: string) => {
    if (editorRef.current) {
      editorRef.current.trigger("keyboard", command, null)
    }
  }

  const registerLanguage = (
    languageId: string,
    configuration: monaco.languages.LanguageConfiguration
  ) => {
    if (monacoInstance) {
      monaco.languages.register({ id: languageId })
      monaco.languages.setLanguageConfiguration(languageId, configuration)
    }
  }

  return (
    <VSCodeContext.Provider
      value={{
        monacoInstance: editorRef.current,
        editorRef,
        setValue,
        getValue,
        executeCommand,
        registerLanguage,
      }}>
      {children}
    </VSCodeContext.Provider>
  )
}

export const useVSCode = () => {
  const context = useContext(VSCodeContext)
  if (!context) {
    throw new Error("useVSCode must be used within a VSCodeProvider")
  }
  return context
}
