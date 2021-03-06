import { str } from "./prelude"

export const range = function* (begin: number, end: number, step = 1) {
  let nxt = begin
  const cmp =
    step > 0
      ? (l: number, r: number) => l <= r
      : (l: number, r: number) => l >= r
  while (cmp(nxt, end)) {
    yield nxt
    nxt = nxt + step
  }
}

export const generate = function* <T>(gen: () => T, n: number) {
  for (const _ of range(1, n)) {
    yield gen()
  }
}

export const enumerate = function* <T>(
  iterable: Iterable<T>,
): Generator<[number, T]> {
  let idx = 0
  for (const el of iterable) {
    yield [idx, el]
    idx += 1
  }
}

export const take = function* <T>(n: number, iterable: Iterable<T>) {
  for (const [idx, el] of enumerate(iterable)) {
    if (idx >= n) {
      break
    }
    yield el
  }
}

export const drop = function* <T>(n: number, iterable: Iterable<T>) {
  for (const [idx, el] of enumerate(iterable)) {
    if (idx >= n) {
      yield el
    }
  }
}

export const map = function* <T, U>(trans: (_: T) => U, iterable: Iterable<T>) {
  for (const el of iterable) {
    yield trans(el)
  }
}

export const flat_map = function* <T, U>(
  trans: (_: T) => Iterable<U>,
  iterable: Iterable<T>,
) {
  for (const el of iterable) {
    yield* trans(el)
  }
}

export const compact_map = function* <T, U>(
  trans: (_: T) => U | undefined,
  iterable: Iterable<T>,
) {
  for (const el of iterable) {
    const nxt = trans(el)
    if (nxt !== undefined) {
      yield nxt
    }
  }
}

export const filter = function* <T>(
  predicate: (_: T) => boolean,
  iterable: Iterable<T>,
) {
  for (const el of iterable) {
    if (predicate(el)) {
      yield el
    }
  }
}

export const reduce = <T, U>(
  trans: (_: U, __: T) => U,
  init: U,
  iterable: Iterable<T>,
) => {
  let acc = init
  for (const el of iterable) {
    acc = trans(acc, el)
  }
  return acc
}

export const count_by = <T>(
  predicate: (_: T) => boolean | number,
  iterable: Iterable<T>,
) => reduce((a, e) => a + (predicate(e) as number), 0, iterable)

export const find_by = <T>(
  predicate: (_: T) => boolean,
  iterable: Iterable<T>,
) => {
  for (const el of iterable) {
    if (predicate(el)) {
      return el
    }
  }
  return undefined
}

export const has = <T>(predicate: (_: T) => boolean, iterable: Iterable<T>) => {
  for (const el of iterable) {
    if (predicate(el)) {
      return true
    }
  }
  return false
}

export const zip = function* <T, U>(
  iterable1: Iterable<T>,
  iterable2: Iterable<U>,
): Generator<[T, U]> {
  const [iter1, iter2] = [
    iterable1[Symbol.iterator](),
    iterable2[Symbol.iterator](),
  ]
  while (true) {
    const [r1, r2] = [iter1.next(), iter2.next()]
    if (r1.done || r2.done) {
      break
    } else {
      yield [r1.value, r2.value]
    }
  }
}

export const longzip = function* <T, U>(
  iterable1: Iterable<T>,
  iterable2: Iterable<U>,
): Generator<[T | undefined, U | undefined]> {
  const [iter1, iter2] = [
    iterable1[Symbol.iterator](),
    iterable2[Symbol.iterator](),
  ]
  while (true) {
    const [r1, r2] = [iter1.next(), iter2.next()]
    if (r1.done && r2.done) {
      break
    } else {
      yield [r1.value, r2.value]
    }
  }
}

export const interlace = function* <T>(e: T, iterable: Iterable<T>) {
  let fst = true
  for (const el of iterable) {
    if (!fst) {
      yield e
    }
    yield el
    fst = false
  }
}

export const any = <T>(predicate: (_: T) => boolean, iterable: Iterable<T>) => {
  let acc = false
  for (const el of iterable) {
    acc = acc || predicate(el)
  }
  return acc
}

export const all = <T>(predicate: (_: T) => boolean, iterable: Iterable<T>) => {
  let acc = true
  for (const el of iterable) {
    acc = acc && predicate(el)
  }
  return acc
}

export const group_by = <T, U extends keyof any>(
  key_by: (_: T) => U,
  iterable: Iterable<T>,
) => {
  const res = new Map<U, T[] | undefined>()
  for (const el of iterable) {
    const key = key_by(el)
    if (!res.has(key)) {
      res.set(key, [])
    }
    res.get(key)!.push(el)
  }
  return res
}

export const sort_by = <T>(key_by: (_: T) => number, iterable: Iterable<T>) => {
  const sort = (a: T, b: T) => key_by(a) - key_by(b)
  return [...iterable].sort(sort)
}

export const sort_by_keys = <T>(
  keys_by: (_: T) => number[],
  iterable: Iterable<T>,
) => {
  const sort = (a: T, b: T) => {
    const zipped = zip(keys_by(a), keys_by(b))
    for (const [lhs, rhs] of zipped) {
      if (lhs !== rhs) {
        return lhs - rhs
      }
    }
    return 0
  }
  return [...iterable].sort(sort)
}

export const unique_by = function* <T, U>(
  key_by: (_: T) => U,
  iterable: Iterable<T>,
) {
  const set = new Set<U>()
  for (const el of iterable) {
    const key = key_by(el)
    if (!set.has(key)) {
      yield el
    }
    set.add(key)
  }
}

export const chunk = function* <T>(size: number, iterable: Iterable<T>) {
  let coll: T[] = []
  for (const [idx, el] of enumerate(iterable)) {
    if (idx % size === 0 && idx !== 0) {
      yield coll
      coll = []
    }
    coll.push(el)
  }
  yield coll
}

export const join = <T>(sep: string, iterable: Iterable<T>) => {
  let s = ""
  for (const el of interlace(sep, map(str, iterable))) {
    s += el
  }
  return s
}
