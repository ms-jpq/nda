import { deepEqual } from "node:assert/strict"
import { test } from "node:test"
import {
  chunk,
  drop,
  interlace,
  range,
  sort_by_keys,
  take,
} from "./iterator.js"

test("range_1", async () => {
  const coll = [...range(0, 1)]

  deepEqual(coll, [0])
})

test("range_2", async () => {
  const coll = [...range(0, 0)]

  deepEqual(coll, [])
})

test("range_3", async () => {
  const coll = [...range(0)]

  deepEqual(coll, [])
})

test("range_4", async () => {
  const coll = [...range(0, -1)]

  deepEqual(coll, [])
})

test("range_5", async () => {
  const coll = [...range(3, 1, -1)]

  deepEqual(coll, [3, 2])
})

test("chunk_1", async () => {
  const long = range(1, 8)
  const lst = [...chunk(3, long)]

  deepEqual(lst, [[1, 2, 3], [4, 5, 6], [7]])
})

test("chunk_2", async () => {
  const long = range(1, 6)
  const lst = [...chunk(3, long)]

  deepEqual(lst, [
    [1, 2, 3],
    [4, 5],
  ])
})

test("chunk_3", async () => {
  const long = range(1, 2)
  const lst = [...chunk(3, long)]

  deepEqual(lst, [[1]])
})

test("drop_1", async () => {
  const lst = [...drop(5, range(1, 10))]

  deepEqual(lst, [6, 7, 8, 9])
})

test("drop_2", async () => {
  const lst = [...take(5, drop(5, range(1, Infinity)))]

  deepEqual(lst, [6, 7, 8, 9, 10])
})

test("take_1", async () => {
  const lst = [...take(5, range(1, 10))]

  deepEqual(lst, [1, 2, 3, 4, 5])
})

test("take_2", async () => {
  const lst = [...take(5, range(1, Infinity))]

  deepEqual(lst, [1, 2, 3, 4, 5])
})

test("interlace_1", async () => {
  const lst = [...interlace(0, range(1, 5))]

  deepEqual(lst, [1, 0, 2, 0, 3, 0, 4])
})

test("sort_by_keys_1", async () => {
  const set = new Set(range(5, 1, -1))
  const lst = sort_by_keys(set, (e) => [0, e])

  deepEqual([...lst], [2, 3, 4, 5])
})
