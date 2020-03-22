import { sort_by_keys, range } from "../../src/isomorphic/iterator"
import assert from "assert"

const sort_by_keys_1 = () => {
  const set = new Set(range(5, 1, -1))

  const lst = sort_by_keys((e) => [0, e], set)

  assert(lst[0] === 1)
  assert(lst[1] === 2)
  assert(lst[2] === 3)
}

export const run_iterator = async () => {
  sort_by_keys_1()
}
