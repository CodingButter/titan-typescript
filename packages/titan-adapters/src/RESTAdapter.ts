import { Auth } from "@titan-engine/schema"
import Assert from "assert-js"
import RemoteAdapter, { RemoteAdapterOptions, GetAPIProps } from "./RemoteAdapter"

export interface RESTAdapterOptions extends RemoteAdapterOptions {}

export default class RESTAdapter extends RemoteAdapter {
  protected async getData<T extends UserSchema>({ data, options }: GetAPIProps): Promise<any> {
    Assert.true(data !== undefined)
    Assert.true(options !== undefined)
    throw new Error("Method not implemented.")
  }
  constructor(options: RESTAdapterOptions) {
    Assert.true(options !== undefined)
    options = { ...options, storage_quota: options.storage_quota || 1024 * 1024 * 1024 } // 1GB
    super(options)
  }
}
