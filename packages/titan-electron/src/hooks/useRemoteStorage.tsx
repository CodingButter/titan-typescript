import {  useEffect, useState } from "react"
import { useWebSocket } from "./useWebSocket"

const ASSET_SERVER = import.meta.env.VITE_ASSET_SERVER

class RemoteStorage{
    private static ws:WebSocket
    private static fetchStorage(key: string):Promise<string>{
        return new Promise((resolve, reject) => {
            this.ws.send(JSON.stringify({type: "get", key}))
            this.ws.onmessage = (event) => {
                const data = JSON.parse(event.data)
                if(data.type === "get" && data.key === key){
                    resolve(data.value)
                }
            }
        })
        
    }
    public static
}

const useRemoteStorage = (key: string, defaultValue: string) => {
  const [state, setState] = useState<string>(() => {
    const storedValue = 

