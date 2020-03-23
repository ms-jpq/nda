#!/usr/bin/env ts-node
import { big_print } from "../src/node/console"
import { run_heap } from "./data_structures/heap"
import { run_queue } from "./data_structures/queue"
import { run_iterator } from "./isomorphic/iterator"
import { run_prelude } from "./isomorphic/prelude"

const main = async () => {
  await run_heap()
  await run_queue()
  await run_iterator()
  await run_prelude()
  console.log(big_print("DONE", "-", "-"))
}

main()
