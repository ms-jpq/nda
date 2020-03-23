import { assert } from "../../src/isomorphic/assertion"
import { generate, map, enumerate } from "../../src/isomorphic/iterator"
import { Heap, put, put_n, take, take_n } from "../../src/data_structures/heap"
import { int } from "../../src/isomorphic/rand"

const t1 = () => {
  const heap: Heap<number> = []

  for (const n of generate(() => int(1, 50), 50)) {
    put(n, n, heap)
  }

  let max = -Infinity
  while (heap.length) {
    const val = take(heap)
    assert(val !== undefined)
    assert(val >= max)
    max = Math.max(val, max)
  }
}

const t2 = () => {
  const pool = map(
    (el) => [el, el] as [number, number],
    generate(() => int(1, 50), 50),
  )

  const heap: Heap<number> = []
  put_n(pool, heap)

  assert(heap.length === 50)

  let max = -Infinity
  let len = 0
  for (const [l, val] of enumerate(take_n(100, heap))) {
    assert(val !== undefined)
    assert(val >= max)
    max = Math.max(val, max)
    len = l
  }
  assert(len === 49)
  assert(heap.length === 0 + 0)
}

export const run_heap = async () => {
  t1()
  t2()
}
