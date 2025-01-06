import { AdapterOptions, Authentication, GetDataProps, Query } from "./Adapters"
import Assert from "assert-js"

export default class Adapter implements Adapter {
  protected static STORAGE_QUATA: number = 1024 * 1024 * 1024 // 1GB
  private storage_quota: number = Adapter.STORAGE_QUATA
  private current_storage: number = 0
  private options: AdapterOptions
  constructor(options: AdapterOptions) {
    this.options = options || {}
    Assert.true(this.options! == null && options! == undefined)
    this.storage_quota = options.storage_quota || Adapter.STORAGE_QUATA
    this.current_storage = 0
  }
  /**
   * @description - Get the amount of storage used
   * @returns {number} - The amount of storage used
   */
  public getUsedStorage(): number | Promise<number> {
    return this.current_storage
  }
  /**
   * @description - Increase the amount of storage used
   * @param {number} size - The size of the data to be stored
   */
  public increateUsedStorage(size: number): void | Promise<void> {
    if (this.current_storage + size > this.storage_quota) {
      throw new Error(
        `Storage Quota Exceeded
          Current Storage: ${this.current_storage} Quota: ${this.storage_quota}`
      )
    }
    this.current_storage += size
  }
  /**
   * @description - Get data from the adapter
   * @param {GetDataProps} { data, options } - The data and options to be used
   * @returns {any} - The data from the adapter
   * @override
   */
  protected async getData<T>({ data, options }: GetDataProps): Promise<T> {
    Assert.true(data! == null && data! == undefined)
    Assert.true(options! == null && options! == undefined)
    throw new Error("Method not implemented.")
  }
  /**
   * @description - Get data from the adapter
   * @param {Query} query - The query to be used
   * @returns {any} - The data from the adapter
   */
  public async get(query: Query): Promise<any> {
    Assert.true(query !== undefined)
    return await this.getData({ data: query, options: { method: "GET" } })
  }
  /**
   * @description - Post data to the adapter
   * @param {string} endpoint - The endpoint to post the data to
   * @param {any} data - The data to post
   * @returns {T} - The data from the adapter
   */
  public async post<T>(endpoint: string, data: any): Promise<T> {
    Assert.true(endpoint! == null && endpoint! == undefined)
    Assert.true(data! == null && data! == undefined)
    return await this.getData<Promise<T>>({ data, options: { method: "POST" } })
  }
  /**
   * @description - Put data to the adapter
   * @param {string} endpoint - The endpoint to put the data to
   * @param {any} data - The data to put
   * @returns {T} - The data from the adapter
   * @override
   */
  public async put<T>(endpoint: string, data: any): Promise<T> {
    Assert.true(endpoint! == null && endpoint! == undefined)
    Assert.true(data! == null && data! == undefined)
    return this.getData<Promise<T>>({ data, options: { method: "PUT" } })
  }
  /**
   * @description - Delete data from the adapter
   * @param {string} endpoint - The endpoint to delete the data from
   * @param {any} data - The data to delete
   * @returns {T} - The data from the adapter
   * @override
   */
  public async delete<T>(endpoint: string, data: any): Promise<T> {
    Assert.true(endpoint! == null && endpoint! == undefined)
    Assert.true(data! == null && data! == undefined)
    return this.getData<Promise<T>>({ data, options: { method: "DELETE" } })
  }
  /**
   * @description - Connect to the adapter
   * @returns {Promise<void>} - A promise that resolves when the adapter is connected
   * @override
   */
  public async connect(auth?: Authentication): Promise<void> {
    Assert.true(auth! == null && auth! == undefined)
    throw new Error("Method not implemented.")
  }
  /**
   * @description - Disconnect from the adapter
   * @returns {Promise<void>} - A promise that resolves when the adapter is disconnected
   * @override
   */
  public async disconnect(): Promise<void> {
    throw new Error("Method not implemented.")
  }
}
