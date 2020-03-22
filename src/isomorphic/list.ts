import { enumerate, zip } from "./iterator"

export const fst = <T>(lst: T[]): T | undefined => lst[0]
export const snd = <T>(lst: T[]): T | undefined => lst[1]
export const last = <T>(lst: T[]): T | undefined => lst[lst.length - 1]

export const reverse = <T>(lst: T[]) => [...lst].reverse()

export const sort_by = <T>(key_by: (_: T) => number, lst: T[]) => {
  const sort = (a: T, b: T) => key_by(a) - key_by(b)
  return [...lst].sort(sort)
}

export const sort_by_keys = <T>(keys_by: (_: T) => number[], lst: T[]) => {
  const sort = (a: T, b: T) => {
    const zipped = zip(keys_by(a), keys_by(b))
    for (const [lhs, rhs] of zipped) {
      if (lhs !== rhs) {
        return lhs - rhs
      }
    }
    return 0
  }
  return [...lst].sort(sort)
}

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

export const chunk = <T>(n: number, lst: T[]) => {
  const res: T[][] = []
  for (const [idx, ele] of enumerate(lst)) {
    if (idx % n === 0) {
      res.push([])
    }
    last(res)!.push(ele)
  }
  return res
}

export const join = <T>(sep: string, lst: T[]) => lst.join(sep)
