import { assert } from "../isomorphic/assertion.js"
import { EOL } from "node:os"
import { stdout } from "node:process"

export const big_print = (str: string, top = " ", btm = " ") => {
  assert(top.length == 1 && btm.length == 1)
  const { columns } = stdout
  const t = top.repeat(columns)
  const b = btm.repeat(columns)
  return `${t}${EOL}${str}${EOL}${b}`
}
