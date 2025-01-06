import Assert from "assert-js"

import LocalAdapter, { LocalAdapterOptions, LocalGetDataProps } from "./LocalAdapter"

export interface IPCAdapterOptions extends LocalAdapterOptions {
  ipcRenderer: Electron.IpcRenderer
}
export interface IPCGetDataProps extends LocalGetDataProps {}

class IPCAdapter extends LocalAdapter {
  private ipcRenderer: Electron.IpcRenderer
  constructor(options: IPCAdapterOptions) {
    options.storage_quota = options.storage_quota || 1024 * 1024 * 1024 // 1GB
    super(options)
    this.ipcRenderer = options.ipcRenderer
    Assert.true(this.ipcRenderer !== undefined)
  }
  protected getData({ data, options }: IPCGetDataProps): Promise<any> {
    Assert.true(data !== undefined)
    Assert.true(options !== undefined)
    throw new Error("Method not implemented.")
  }
  public async connect(): Promise<any> {}
  public async disconnect(): Promise<any> {}
}

export default IPCAdapter
