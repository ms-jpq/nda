import { range } from "../isomorphic/iterator"

const MIN_SIZE = 8

const inc = (i: number, len: number) => (i + 1) % len

const dec = (i: number, len: number) => (i - 1 + len) % len

export const queue = <T>() => {
  const buf: (T | undefined)[] = []
  buf.length = MIN_SIZE

  let [h, t, c] = [0, 0, 0]

  const len = () => c

  const size_up = () => {
    buf.length *= 2
    for (const i of range(c - 1, 0, -1)) {
      h = dec(h, c)
      const j = c + i
      ;[buf[h], buf[j]] = [buf[j], buf[h]]
    }
    h = 0
    t = c
  }

  const take = (): T | undefined => {
    if (c === 0) {
      return undefined
    }
    const val = buf[t]
    buf[t] = undefined
    c -= 1
    t = inc(t, buf.length)
    return val
  }

  const put = (val: T) => {
    buf[h] = val
    c += 1
    h = inc(h, buf.length)
    if (c === buf.length) {
      size_up()
    }
  }

  const take_n = function*(n: number) {
    for (const _ of range(1, n)) {
      if (c === 0) {
        break
      }
      yield take()
    }
  }

  const put_n = (iterable: Iterable<T>) => {
    for (const el of iterable) {
      put(el)
    }
  }

  return {
    len,
    take,
    put,
    take_n,
    put_n,
  }
}
