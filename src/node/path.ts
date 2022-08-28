import { extname } from "node:path"

export const ext_split = (path: string): readonly [string, string] => {
  const ext = extname(path)
  const file_name = path.slice(0, path.length - ext.length)
  return [file_name, ext]
}
