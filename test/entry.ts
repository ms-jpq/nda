#!/usr/bin/env ts-node
import { big_print } from "../src/node/console"
import { run_iterator } from "./isomorphic/iterator"

const main = async () => {
  await run_iterator()
  console.log(big_print("DONE", "-", "-"))
}

main()
