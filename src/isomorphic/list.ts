import { enumerate, zip } from "./iterator"

export const fst = <T>(lst: T[]): T | undefined => lst[0]
export const snd = <T>(lst: T[]): T | undefined => lst[1]
export const last = <T>(lst: T[]): T | undefined => lst[lst.length - 1]

export const reverse = <T>(lst: T[]) => [...lst].reverse()

export const unique_by = <T>(key_by: (_: T) => any, lst: T[]) => {
  const set = new Set()
  const unique: T[] = []
  for (const ele of lst) {
    const key = key_by(ele)
    if (!set.has(key)) {
      unique.push(ele)
    }
    set.add(key)
  }
  return unique
}
