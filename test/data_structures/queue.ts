import { all, range, zip } from "../../src/isomorphic/iterator"
import { assert } from "../../src/isomorphic/assertion"
import { queue } from "../../src/data_structures/queue"

const t1 = () => {
  const q = queue<number>()

  const pool = [...range(1, 5)]

  for (const i of range(1, 25)) {
    for (const n of pool) {
      q.put(n)
    }

    const coll = []
    while (q.len()) {
      const val = q.take()
      coll.push(val)
    }
    assert(all(([p, e]) => p === e, zip(pool, coll)))
  }
}

const t2 = () => {
  const q = queue<number>()

  q.put_n(range(1, 10))
  const c1 = q.take_n(5)
  q.put_n(range(11, 15))
  const c2 = q.take_n(10)

  const tot = [...c1, ...c2]
  assert(all(([p, e]) => p === e, zip(tot, range(1, Infinity))))
}

const t3 = () => {
  const q = queue<number>()

  q.put_n(range(1, 3))
  const c1 = q.take_n(2)
  q.put_n(range(4, 9))
  const c2 = q.take_n(10)

  const tot = [...c1, ...c2]
  assert(all(([p, e]) => p === e, zip(tot, range(1, Infinity))))
}

export const run_queue = async () => {
  t1()
  t2()
  t3()
}
