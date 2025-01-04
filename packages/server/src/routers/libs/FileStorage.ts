import fs from "fs"
import path from "path"

export default class FileStorage {
  private static instance: FileStorage
  private static readonly STATIC_DIR = path.resolve(
    __dirname,
    import.meta.env.VITE_STATIC_DIR || "/public"
  )
  private constructor() {
    if (!fs.existsSync(FileStorage.STATIC_DIR)) {
      fs.mkdirSync(FileStorage.STATIC_DIR)
    }
  }
}
