import assert from "assert"
import { sort_by_keys, range, drop, take } from "../../src/isomorphic/iterator"

const drop_1 = () => {
  const lst = [...drop(5, range(1, 10))]
  assert(lst.length === 5)
}

const take_1 = () => {
  const lst = [...take(5, range(1, 10))]
  assert(lst.length === 5)
}

const sort_by_keys_1 = () => {
  const set = new Set(range(5, 1, -1))

  const lst = sort_by_keys((e) => [0, e], set)

  assert(lst[0] === 1)
  assert(lst[1] === 2)
  assert(lst[2] === 3)
}

export const run_iterator = async () => {
  drop_1()
  take_1()
  sort_by_keys_1()
}
