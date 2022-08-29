import {
  chunk,
  drop,
  interlace,
  range,
  sort_by_keys,
  take,
} from "../../src/iso/iterator.js"
import { ok as assert } from "node:assert"
import { test } from "node:test"

test("range_1", async () => {
  const coll = [...range(0, 1)]

  assert(coll.length === 2)
})

test("range_2", async () => {
  const coll = [...range(0, 0)]

  assert(coll.length === 1)
})

test("chunk_1", async () => {
  const long = range(1, 7)
  const lst = [...chunk(3, long)]

  assert(lst.length === 3)
  assert(lst[0]?.length === 3)
  assert(lst[1]?.length === 3)
  assert(lst[2]?.length === 1)
})

test("chunk_2", async () => {
  const long = range(1, 6)
  const lst = [...chunk(3, long)]

  assert(lst.length === 2)
  assert(lst[0]?.length === 3)
  assert(lst[1]?.length === 3)
})

test("chunk_3", async () => {
  const long = range(1, 2)
  const lst = [...chunk(3, long)]

  assert(lst.length === 1)
  assert(lst[0]?.length === 2)
})

test("drop_1", async () => {
  const lst = [...drop(5, range(1, 10))]

  assert(lst.length === 5)

  assert
})

test("drop_2", async () => {
  const lst = [...take(5, drop(5, range(1, Infinity)))]

  assert(lst.length === 5)
  assert(lst[0] === 6)
})

test("take_1", async () => {
  const lst = [...take(5, range(1, 10))]

  assert(lst.length === 5)
})

test("take_2", async () => {
  const lst = [...take(5, range(1, Infinity))]

  assert(lst.length === 5)
})

test("interlace_1", async () => {
  const lst = [...interlace(0, range(1, 5))]

  assert(lst.length === 9)
})

test("sort_by_keys_1", async () => {
  const set = new Set(range(5, 1, -1))
  const lst = sort_by_keys((e) => [0, e], set)

  assert(lst[0] === 1)
  assert(lst[1] === 2)
  assert(lst[2] === 3)
})
