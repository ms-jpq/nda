#!/usr/bin/env ts-node
import { big_print } from "../src/node/console"
import { run_heap } from "./data_structures/heap"
import { run_queue } from "./data_structures/queue"
import { run_iterator } from "./isomorphic/iterator"

const main = async () => {
  await run_heap()
  await run_queue()
  await run_iterator()
  console.log(big_print("DONE", "-", "-"))
}

main()
