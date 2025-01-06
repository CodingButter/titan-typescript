import { File } from "buffer"
import fs, { PathOrFileDescriptor } from "fs"
import path from "path"

export default class FileStorage {
  private static readonly STATIC_DIR = path.resolve(
    process.cwd(),
    (process.env.STATIC_DIR || "/public") as string
  )
  private static readonly HOST_URL: string = (process.env.HOST_URL ||
    "http://localhost:3000") as string
  private _dirname: string
  private _baseUrlPath: string
  constructor({ dirname }: { dirname: string }) {
    this._dirname = `${FileStorage.STATIC_DIR}/${dirname}`
    this._baseUrlPath = FileStorage.HOST_URL + dirname
    FileStorage.makePath(this._dirname)
  }
  public static makePath(folder: string) {
    /**
     *
     */
    !fs.existsSync(folder) && fs.mkdirSync(folder, { recursive: true })
  }
  public listFiles(): PathOrFileDescriptor[] {
    return fs.readdirSync(this._dirname).filter((file: string) => fs.statSync(file))
  }

  public getFileUrl(filePath: string): string {
    const relativePath = filePath.replace(this._dirname, "")
    return `${this._baseUrlPath}/${relativePath}`
  }
}
