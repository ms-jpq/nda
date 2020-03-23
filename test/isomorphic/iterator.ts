import { assert } from "../../src/isomorphic/assertion"
import {
  chunk,
  drop,
  interlace,
  range,
  sort_by_keys,
  take,
} from "../../src/isomorphic/iterator"

const chunk_1 = () => {
  const long = range(1, 7)
  const lst = [...chunk(3, long)]

  assert(lst.length === 3)
  assert(lst[0].length === 3)
  assert(lst[1].length === 3)
  assert(lst[2].length === 1)
}

const chunk_2 = () => {
  const long = range(1, 6)
  const lst = [...chunk(3, long)]

  assert(lst.length === 2)
  assert(lst[0].length === 3)
  assert(lst[1].length === 3)
}

const chunk_3 = () => {
  const long = range(1, 2)
  const lst = [...chunk(3, long)]

  assert(lst.length === 1)
  assert(lst[0].length === 2)
}

const drop_1 = () => {
  const lst = [...drop(5, range(1, 10))]

  assert(lst.length === 5)
}

const drop_2 = () => {
  const lst = [...take(5, drop(5, range(1, Infinity)))]

  assert(lst.length === 5)
  assert(lst[0] === 6)
}

const take_1 = () => {
  const lst = [...take(5, range(1, 10))]

  assert(lst.length === 5)
}

const take_2 = () => {
  const lst = [...take(5, range(1, Infinity))]

  assert(lst.length === 5)
}

const interlace_1 = () => {
  const lst = [...interlace(0, range(1, 5))]

  assert(lst.length === 9)
}

const sort_by_keys_1 = () => {
  const set = new Set(range(5, 1, -1))
  const lst = sort_by_keys((e) => [0, e], set)

  assert(lst[0] === 1)
  assert(lst[1] === 2)
  assert(lst[2] === 3)
}

export const run_iterator = async () => {
  chunk_1()
  chunk_2()
  chunk_3()
  drop_1()
  drop_2()
  take_1()
  take_2()
  interlace_1()
  sort_by_keys_1()
}
