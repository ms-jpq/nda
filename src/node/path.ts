import p from "path"

export const fn_ext = (path: string) => {
  const ext = p.extname(path)
  const file_name = path.slice(0, path.length - ext.length)
  return [file_name, ext]
}

