import type { v4 } from "uuid"
export declare module "@titan-engine/schema" {
  export type Email = `${string}@${string}.${string}`

  export interface Auth {
    email?: Email
    password?: string
    token?: string
  }

  export interface UserSchema {
    id: v4
    name: string
    auth: Auth
  }
}
