export const range = function* (
  begin: number,
  end: number,
  step = 1,
): IterableIterator<number> {
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

export const generate = function* <T>(
  gen: () => T,
  n: number,
): IterableIterator<T> {
  for (const _ of range(1, n)) {
    yield gen()
  }
}

export const enumerate = function* <T>(
  iterable: Iterable<T>,
  start: number = 0,
): IterableIterator<readonly [number, T]> {
  for (const el of iterable) {
    yield [start++, el]
  }
}

export const take = function* <T>(
  n: number,
  iterable: Iterable<T>,
): IterableIterator<T> {
  for (const [idx, el] of enumerate(iterable)) {
    if (idx >= n) {
      break
    }
    yield el
  }
}

export const drop = function* <T>(
  n: number,
  iterable: Iterable<T>,
): IterableIterator<T> {
  for (const [idx, el] of enumerate(iterable)) {
    if (idx >= n) {
      yield el
    }
  }
}

export const map = function* <T, U>(
  trans: (_: T) => U,
  iterable: Iterable<T>,
): IterableIterator<U> {
  for (const el of iterable) {
    yield trans(el)
  }
}

export const flat_map = function* <T, U>(
  trans: (_: T) => Iterable<U>,
  iterable: Iterable<T>,
): IterableIterator<U> {
  for (const el of iterable) {
    yield* trans(el)
  }
}

export const compact_map = function* <T, U>(
  trans: (_: T) => U | undefined,
  iterable: Iterable<T>,
): IterableIterator<U> {
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
): IterableIterator<T> {
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
): U => {
  let acc = init
  for (const el of iterable) {
    acc = trans(acc, el)
  }
  return acc
}

export const count_by = <T>(
  predicate: (_: T) => boolean | number,
  iterable: Iterable<T>,
): number => reduce((a, e) => a + (predicate(e) as number), 0, iterable)

export const find_by = <T>(
  predicate: (_: T) => boolean,
  iterable: Iterable<T>,
): T | undefined => {
  for (const el of iterable) {
    if (predicate(el)) {
      return el
    }
  }
  return undefined
}

export const has = <T>(
  predicate: (_: T) => boolean,
  iterable: Iterable<T>,
): boolean => {
  for (const el of iterable) {
    if (predicate(el)) {
      return true
    }
  }
  return false
}

export const zip = function* <
  T extends Iterable<unknown>[],
  R extends {
    readonly [K in keyof T]: T[K] extends Iterable<infer V> ? V : never
  },
>(...iterables: T): IterableIterator<R> {
  const iterators = iterables.map((i) => i[Symbol.iterator]())
  while (true) {
    const acc = []
    for (const it of iterators) {
      const { done, value } = it.next()
      if (done) {
        return
      } else {
        acc.push(value)
      }
    }
    yield acc as unknown as R
  }
}

export const long_zip = function* <
  T extends Iterable<unknown>[],
  R extends {
    readonly [K in keyof T]: T[K] extends Iterable<infer V>
      ? V | undefined
      : never
  },
>(...iterables: T): IterableIterator<R> {
  const iterators = iterables.map((i) => i[Symbol.iterator]())
  while (true) {
    const acc = iterators.map((i) => i.next())
    if (all((r) => r.done ?? false, acc)) {
      break
    } else {
      yield acc.map((r) => r.value) as unknown as R
    }
  }
}

export const interlace = function* <T>(
  e: T,
  iterable: Iterable<T>,
): IterableIterator<T> {
  let fst = true
  for (const el of iterable) {
    if (!fst) {
      yield e
    }
    yield el
    fst = false
  }
}

export const any = <T>(
  predicate: (_: T) => boolean,
  iterable: Iterable<T>,
): boolean => {
  let acc = false
  for (const el of iterable) {
    acc = acc || predicate(el)
    if (acc) {
      break
    }
  }
  return acc
}

export const all = <T>(
  predicate: (_: T) => boolean,
  iterable: Iterable<T>,
): boolean => {
  let acc = true
  for (const el of iterable) {
    acc = acc && predicate(el)
    if (!acc) {
      break
    }
  }
  return acc
}

export const group_by = <T, U>(
  key_by: (_: T) => U,
  iterable: Iterable<T>,
): Map<U, T[]> => {
  const res = new Map<U, T[]>()

  for (const el of iterable) {
    const key = key_by(el)
    let acc = res.get(key)
    if (!acc) {
      acc = []
      res.set(key, acc)
    }
    acc.push(el)
  }

  return res
}

export const sort_by = <T>(
  key_by: (_: T) => number,
  iterable: Iterable<T>,
): T[] => {
  const sort = (a: T, b: T) => key_by(a) - key_by(b)
  return [...iterable].sort(sort)
}

export const sort_by_keys = <T>(
  keys_by: (_: T) => number[],
  iterable: Iterable<T>,
): T[] => {
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
): IterableIterator<T> {
  const set = new Set<U>()
  for (const el of iterable) {
    const key = key_by(el)
    if (!set.has(key)) {
      yield el
    }
    set.add(key)
  }
}

export const chunk = function* <T>(
  size: number,
  iterable: Iterable<T>,
): IterableIterator<T[]> {
  let coll = new Array<T>()
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
  return [map(String, iterable)].join(sep)
}
