#!/usr/bin/env ts-node
import nodemon, { Settings } from "nodemon"
//@ts-ignore
import parse from "parse-gitignore"
import { big_print } from "./src/node/console"
import { join } from "./src/isomorphic/iterator"
import { slurp } from "./src/node/fs"

const watch = (settings: Settings) =>
  nodemon(settings)
    .on("start", () => {
      console.log(big_print("STARTED", "$"))
    })
    .on("restart", (files) => {
      console.log(big_print("RESTARTED", "$"))
      console.log(files)
    })

const main = async () => {
  const exts = ["ts"]
  const git_ignore = await slurp(".gitignore")
  const ignore = parse(git_ignore)
  watch({
    ext: join(",", exts),
    colours: true,
    ignore,
  })
}

main()

