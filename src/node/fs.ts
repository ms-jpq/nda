import { dirname, join, relative } from "path"
import { exists as exists_cb, promises as fs } from "fs"
import { flat_map, group_by, map } from "../isomorphic/iterator"

export const exists = (path: string) =>
  new Promise<boolean>((resolve) => exists_cb(path, resolve))

export const isfile = async (path: string) =>
  (await exists(path)) && (await fs.stat(path)).isFile()

export const isdir = async (path: string) =>
  (await exists(path)) && (await fs.stat(path)).isDirectory()

export const mkdir = (path: string) => fs.mkdir(path, { recursive: true })

export const rm = async (path: string) => {
  return fs.rm(path, { force: true, recursive: true })
}

const _slurp = async (file: string): Promise<Buffer> => {
  try {
    return fs.readFile(file)
  } catch (err) {
    console.error(`Failed to read ${file}`)
    throw err
  }
}

export const sip = _slurp
export const slurp = async (file: string) => (await _slurp(file)).toString()

export const spit = async (content: string | Buffer, file: string) => {
  try {
    await mkdir(dirname(file))
    await fs.writeFile(file, content)
  } catch (err) {
    console.error(`Failed to write ${file}`)
    throw err
  }
}

export type DirContent = { dirs: string[]; files: string[] }

export const readdir = async (
  level: number,
  path: string,
): Promise<DirContent> => {
  if (level < 1) {
    return { dirs: [], files: [] }
  }

  const info = await fs.readdir(path, { withFileTypes: true })
  const records = group_by((c) => (c.isDirectory() ? "dirs" : "files"), info)

  const _files = map((f) => join(path, f.name), records.get("files") ?? [])
  const _dirs = map((d) => join(path, d.name), records.get("dirs") ?? [])

  const contents = await Promise.all(map((d) => readdir(level - 1, d), _dirs))
  const files = [..._files, ...flat_map((c) => c.files, contents)]
  const dirs = [..._dirs, ...flat_map((c) => c.dirs, contents)]

  return { dirs, files }
}

export const cp = async (src: string, dest: string) => {
  const stat = await fs.stat(src)
  if (stat.isFile()) {
    await mkdir(dirname(dest))
    await fs.copyFile(src, dest)
  } else if (stat.isDirectory()) {
    const info = await readdir(Infinity, src)

    const dest_files = map(
      (f) => ({ s: f, d: join(dest, relative(src, f)) }),
      info.files,
    )

    await Promise.all(
      map(async (f) => {
        await mkdir(dirname(f.d))
        fs.copyFile(f.s, f.d)
      }, dest_files),
    )
  } else {
    throw new Error(`Not dir or file :: ${src}`)
  }
}
