import { range } from "../isomorphic/iterator"

const heap_key = Symbol.for("_heap_")

export type Heap<T> = (T & { [heap_key]: number })[]

const parent = (i: number) => Math.floor((i - 1) / 2)

const left = (i: number) => i * 2 + 1

const right = (i: number) => i * 2 + 2

// Max goes down
const swap_down = <T>(heap: Heap<T>) => {
  const len = heap.length
  let i = 0
  let [l, r] = [left(i), right(i)]
  while (l < len) {
    const smol = r >= len ? l : heap[l][heap_key] < heap[r][heap_key] ? l : r

    if (heap[i][heap_key] > heap[smol][heap_key]) {
      ;[heap[i], heap[smol]] = [heap[smol], heap[i]]
      i = smol
      ;[l, r] = [left(i), right(i)]
    } else {
      break
    }
  }
}

// Min goes up
const swap_up = <T>(heap: Heap<T>) => {
  let i = heap.length - 1
  let p = parent(i)
  while (p >= 0) {
    if (heap[i][heap_key] < heap[p][heap_key]) {
      ;[heap[i], heap[p]] = [heap[p], heap[i]]
      i = p
      p = parent(i)
    } else {
      break
    }
  }
}

export const peak = <T>(heap: Heap<T>): T | undefined => heap[0]

export const take = <T>(heap: Heap<T>): T | undefined => {
  if (heap.length === 0) {
    return undefined
  }
  const val = heap[0]
  const idx = heap.length - 1
  heap[0] = heap[idx]
  heap.length = idx
  swap_down(heap)
  return val
}

export const put = <T>(key: number, val: T, heap: Heap<T>) => {
  heap.push(Object.assign(val, { [heap_key]: key }))
  swap_up(heap)
}

export const take_n = function*<T>(n: number, heap: Heap<T>) {
  for (const _ of range(1, n)) {
    const val = take(heap)
    if (val !== undefined) {
      yield val
    }
  }
}

export const put_n = <T>(iterable: Iterable<[number, T]>, heap: Heap<T>) => {
  for (const [key, val] of iterable) {
    put(key, val, heap)
  }
}

export const heapify = <T>(key_by: (_: T) => number, iterable: Iterable<T>) => {
  const heap: Heap<T> = []
  for (const el of iterable) {
    put(key_by(el), el, heap)
  }
  return heap
}
