import { assert } from "../../src/isomorphic/assertion"
import { enumerate, generate } from "../../src/isomorphic/iterator"
import { id } from "../../src/isomorphic/prelude"
import { int } from "../../src/isomorphic/rand"
import {
  Heap,
  put,
  heapify,
  take,
  take_n,
} from "../../src/data_structures/heap"

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
  const heap: Heap<number> = heapify(
    id,
    generate(() => int(1, 50), 50),
  )

  assert(heap.length === 50)

  let max = -Infinity
  let len = 0
  for (const [l, val] of enumerate(take_n(Infinity, heap))) {
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
