import { assert } from "../../src/isomorphic/assertion"
import { generate, range } from "../../src/isomorphic/iterator"
import { Heap, put, take } from "../../src/data_structures/heap"
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

export const run_heap = async () => {
  t1()
}
