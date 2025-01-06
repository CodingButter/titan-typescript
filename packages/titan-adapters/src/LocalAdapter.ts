import { AdapterOptions, GetDataProps } from "./Adapters"
import Adapter from "./BaseAdapter"
import Assert from "assert-js"

export interface LocalAdapterOptions extends AdapterOptions {
  basePath: string
}
export interface LocalGetDataProps extends GetDataProps {}

export default class LocalAdapter extends Adapter {
  private static STORAGE_QUOTA: number = 1024 * 1024 * 1024 // 1GB
  private basePath: string
  constructor(options: LocalAdapterOptions) {
    super({ ...options, storage_quota: options.storage_quota || LocalAdapter.STORAGE_QUOTA })
    this.basePath = options.basePath
    Assert.true(this.basePath !== undefined)
  }
}
