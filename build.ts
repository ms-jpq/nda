#!/usr/bin/env ts-node

import { call } from "./src/node/sub_process"

const main = async () => {
  process.chdir(__dirname)
  await call({
    cmd: "tsc",
    args: ["-p", "src"],
  })
}

main()

