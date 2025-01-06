import { useState, useContext, createContext } from "react"

import { Adapter, IPCAdapter, WSAdapter, RESTAdapter } from "@titan-engine/adapters/client"

export interface AdapterContextType {
  adapter: IPCAdapter | WSAdapter | RESTAdapter | null
  connect: (auth: Adapter.Authentication) => void
  connected: boolean
  disconnect: () => void
}

const AdapterContext = createContext<AdapterContextType>({
  adapter: null,
  connect: () => {},
  connected: false,
  disconnect: () => {},
})

export const useAdapter = () => {
  const adapter = useContext(AdapterContext)
  if (!adapter) {
    throw new Error("useAdapter must be used within an AdapterProvider")
  }
  return adapter
}

export interface AdapterProviderProps extends React.PropsWithChildren<{}> {
  adapter: IPCAdapter | WSAdapter | RESTAdapter
}

export const AdapterProvider = ({ children, adapter }: AdapterProviderProps) => {
  const [connected, setConnected] = useState(false)

  const connect = async (auth: Adapter.Authentication) => {
    if (adapter && adapter?.connect) {
      await adapter.connect(auth)
      setConnected(true)
    }
  }
  const disconnect = async () => {
    await adapter?.disconnect()
    setConnected(false)
  }

  return (
    <AdapterContext.Provider value={{ adapter, connect, connected, disconnect }}>
      {children}
    </AdapterContext.Provider>
  )
}
