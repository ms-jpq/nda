export const range = (
  begin: number,
  end: number | undefined = undefined,
  step = 1,
): Iterable<number> =>
  Object.freeze({
    *[Symbol.iterator]() {
      const eof = end ?? begin
      let nxt = end === undefined ? 0 : begin
      const cmp =
        step > 0
          ? (l: number, r: number) => l < r
          : (l: number, r: number) => l > r
      while (cmp(nxt, eof)) {
        yield nxt
        nxt = nxt + step
      }
    },
  })

export const pure = function* <const T>(s: T): IterableIterator<T> {
  yield s
}

export const generate = function* <const T>(
  gen: (_: number) => T,
  n: number = Infinity,
): IterableIterator<T> {
  for (const i of range(1, n)) {
    yield gen(i)
  }
}

export const enumerate = function* <const T>(
  iterable: Iterable<T> | undefined,
  start: number = 0,
): IterableIterator<readonly [number, T]> {
  for (const el of iterable ?? []) {
    yield [start++, el]
  }
}

export const take = function* <const T>(
  n: number,
  iterable: Iterable<T> | undefined,
): IterableIterator<T> {
  for (const [idx, el] of enumerate(iterable)) {
    if (idx >= n) {
      break
    }
    yield el
  }
}

export const drop = function* <const T>(
  n: number,
  iterable: Iterable<T>,
): IterableIterator<T> {
  for (const [idx, el] of enumerate(iterable)) {
    if (idx >= n) {
      yield el
    }
  }
}

export const map = function* <const T, const U>(
  iterable: Iterable<T> | undefined,
  trans: (_: T) => U,
): IterableIterator<U> {
  for (const el of iterable ?? []) {
    yield trans(el)
  }
}

export const flat_map = function* <const T, const U>(
  iterable: Iterable<T> | undefined,
  trans: (_: T) => Iterable<U>,
): IterableIterator<U> {
  for (const el of iterable ?? []) {
    yield* trans(el)
  }
}

export const compact_map = function* <const T, const U>(
  iterable: Iterable<T> | undefined,
  trans: (_: T) => U | undefined,
): IterableIterator<U> {
  for (const el of iterable ?? []) {
    const nxt = trans(el)
    if (nxt !== undefined) {
      yield nxt
    }
  }
}

export const filter = function* <const T>(
  iterable: Iterable<T> | undefined,
  predicate: (_: T) => boolean = Boolean,
): IterableIterator<T> {
  for (const el of iterable ?? []) {
    if (predicate(el)) {
      yield el
    }
  }
}

export const reduce = <const T, U>(
  acc: U,
  iterable: Iterable<T> | undefined,
  trans: (_: U, __: T) => U,
): U => {
  for (const el of iterable ?? []) {
    acc = trans(acc, el)
  }
  return acc
}

export const count_by = <const T>(
  iterable: Iterable<T> | undefined,
  predicate: (_: T) => boolean | number = Boolean,
): number => reduce(0, iterable, (a, e) => a + (predicate(e) as number))

export const find_by = <T>(
  iterable: Iterable<T> | undefined,
  predicate: (_: T) => boolean = Boolean,
): T | undefined => {
  for (const el of iterable ?? []) {
    if (predicate(el)) {
      return el
    }
  }
  return undefined
}

export const zip = function* <
  const T extends (Iterable<unknown> | undefined)[],
  const R extends {
    readonly [K in keyof T]: T[K] extends Iterable<infer V> ? V : never
  },
>(...iterables: T): IterableIterator<R> {
  type Item = R[keyof R]
  const iterators = [...compact_map(iterables, (i) => i?.[Symbol.iterator]())]
  while (iterators.length) {
    const acc = new Array<Item>()
    for (const it of iterators) {
      const { done, value } = it.next()
      if (done) {
        return
      } else {
        acc.push(value as Item)
      }
    }
    yield acc as unknown as R
  }
}

export const zip_longest = function* <
  const T extends Iterable<unknown>[],
  const R extends {
    readonly [K in keyof T]: T[K] extends Iterable<infer V>
      ? V | undefined
      : never
  },
>(...iterables: T): IterableIterator<R> {
  const iterators = iterables.map((i) => i[Symbol.iterator]())
  while (iterators.length) {
    const acc = iterators.map((i) => i.next())
    if (acc.every((r) => r.done ?? false)) {
      break
    } else {
      yield acc.map((r) => r.value) as unknown as R
    }
  }
}

export const interlace = function* <const T>(
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

export const interleave = function* <const T, const U>(
  iterable1: Iterable<T>,
  iterable2: Iterable<U>,
): IterableIterator<T | U> {
  const iters = [iterable1, iterable2].map((it) => it[Symbol.iterator]())
  if (!iters.length) return

  l1: while (true) {
    for (const it of iters) {
      const { done, value } = it.next()
      if (done) {
        break l1
      }
      yield value
    }
  }
}

export const any = <const T>(
  iterable: Iterable<T>,
  predicate: (_: T) => boolean = Boolean,
): boolean => {
  for (const el of iterable) {
    if (predicate(el)) {
      return true
    }
  }
  return false
}

export const all = <const T>(
  iterable: Iterable<T>,
  predicate: (_: T) => boolean = Boolean,
): boolean => {
  for (const el of iterable) {
    if (!predicate(el)) {
      return false
    }
  }
  return true
}

export const group_by = <const T, const U>(
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

export const sort_by = <const T>(
  iterable: Iterable<T>,
  key_by: (_: T) => number,
): T[] => {
  const sort = (a: T, b: T) => key_by(a) - key_by(b)
  return [...iterable].sort(sort)
}

export const sort_by_keys = <
  const T,
  const R extends (number | bigint | string)[],
>(
  iterable: Iterable<T>,
  keys_by: (_: T) => R,
): T[] => {
  const sort = (a: T, b: T) => {
    const zipped = zip(keys_by(a), keys_by(b))
    for (const [lhs, rhs] of zipped) {
      const tl = typeof lhs
      const tr = typeof rhs
      if (tl !== tr) {
        throw new TypeError(`${tl} <> ${tr}`)
      } else if (tl === "string") {
        return (lhs as string).localeCompare(rhs as string)
      } else {
        const d = (lhs as number) - (rhs as number)
        if (d) {
          return d
        }
      }
    }
    return 0
  }
  return [...iterable].sort(sort)
}

export const unique_by = function* <const T, const U>(
  iterable: Iterable<T>,
  key_by: (_: T) => U,
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

export const chunk = function* <const T>(
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

export const join = <const T>(sep: string, iterable: Iterable<T>) => {
  return [...map(iterable, String)].join(sep)
}

const wrap = async <const T, const M>(
  meta: M,
  promise: Promise<T>,
): Promise<T & M> => {
  const result = await promise
  return { ...result, ...meta }
}

export const merge = async function* <const T>(
  ...sts: AsyncIterable<T>[]
): AsyncIterableIterator<T> {
  const aiters = sts.map((st) => st[Symbol.asyncIterator]())
  const running = new Map(
    aiters.map((st) => [st, wrap({ st }, st.next())] as const),
  )
  try {
    while (running.size) {
      const { st, done, value } = await Promise.race(running.values())
      if (done) {
        running.delete(st)
        await st.return?.()
      } else {
        running.set(st, wrap({ st }, st.next()))
        yield value
      }
    }
  } finally {
    const fin = await Promise.allSettled(
      [...running.keys()].map((st) => st.return?.()),
    )

    const errors = [
      ...(function* () {
        for (const result of fin) {
          if (result.status === "rejected") {
            yield result.reason
          }
        }
      })(),
    ]
    if (errors.length) {
      throw new AggregateError(errors)
    }
  }
}
