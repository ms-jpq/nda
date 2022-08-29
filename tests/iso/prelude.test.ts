import { tiktok } from "../../src/iso/prelude.js"
import { test } from "node:test"

test("tik_tok_1", async () => {
  for await (const i of tiktok(5)) {
    if (i === 3) {
      break
    }
  }
})
