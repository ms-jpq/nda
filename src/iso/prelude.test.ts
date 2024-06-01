import { test } from "node:test"
import { tiktok } from "./prelude.js"

test("tik_tok_1", async () => {
  for await (const i of tiktok(5)) {
    if (i === 3) {
      break
    }
  }
})
