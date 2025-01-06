import Assert from "assert-js"
import RemoteAdapter, { RemoteAdapterOptions, GetAPIProps } from "./RemoteAdapter"

export interface WSAdapterOptions extends RemoteAdapterOptions {}

export default class WSAdapter extends RemoteAdapter {
  protected async getData({ data, options }: GetAPIProps): Promise<any> {
    console.assert(data !== undefined, "data is required")
    console.assert(options !== undefined, "options is required")
    throw new Error("Method not implemented.")
  }
  constructor(options: WSAdapterOptions) {
    Assert.true(options !== undefined)
    options = { ...options, storage_quota: options.storage_quota || 1024 * 1024 * 1024 } // 1GB
    super(options)
  }
}
