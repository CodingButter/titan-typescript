import { Auth } from "@titan-engine/schema"
import { AdapterOptions, Query } from "./Adapters"
import BaseAdapter from "./BaseAdapter"

export interface RemoteAdapterOptions extends AdapterOptions {
  baseURL?: string | URL
  auth?: Auth
}

export interface GetAPIData {
  [key: string]: any
}

export interface GetAPIOptions {
  method?: string
  headers?: Headers
  body?: string
}

export interface GetAPIProps {
  data: GetAPIData
  options?: GetAPIOptions
}

/**
 * @class RemoteAdapter
 * @extends {BaseAdapter}
 * @description This class is a base class for all remote adapters. It provides a common interface for making requests to remote APIs.
 */
export default class RemoteAdapter extends BaseAdapter {
  constructor(options: RemoteAdapterOptions) {
    options = { ...options, storage_quota: options.storage_quota || 1024 * 1024 * 1024 } // 1GB
    super(options)
  }
  /**
   * @override
   * @param {GetAPIProps} { data, options }
   * @returns {Promise<any>}
   * @memberof RemoteAdapter
   * @throws {Error} Method not implemented.
   * @description This method must be implemented by the subclass. in order to make a request to the remote API.
   * @override
   */
  protected async getData({ data, options }: GetAPIProps): Promise<any> {
    console.assert(data !== undefined, "data is required")
    console.assert(options !== undefined, "options is required")
    throw new Error("Method not implemented.")
    return null
  }
  /**
   * @override
   * @param {Query} query
   * @returns {Promise<any>}
   * @memberof RemoteAdapter
   * @throws {Error} query is required
   * @description This method makes a GET request to the remote API. It is an implementation of the get method in the Adapter interface.
   */
  public async get(query: Query): Promise<any> {
    console.assert(query !== undefined, "query is required")
    return await this.getData({ data: query, options: { method: "GET" } })
  }
  public async post(endpoint: string, data: any): Promise<any> {
    console.assert(endpoint !== undefined, "endpoint is required")
    console.assert(data !== undefined, "data is required")
    return await this.getData({ data, options: { method: "POST" } })
  }
  public async put(endpoint: string, data: any): Promise<any> {
    console.assert(endpoint !== undefined, "endpoint is required")
    console.assert(data !== undefined, "data is required")
    return await this.getData({ data, options: { method: "PUT" } })
  }
  public async delete(endpoint: string, data: any): Promise<any> {
    console.assert(endpoint !== undefined, "endpoint is required")
    console.assert(data !== undefined, "data is required")
    return await this.getData({ data, options: { method: "DELETE" } })
  }
}
