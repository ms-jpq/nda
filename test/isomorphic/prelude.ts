import { assert } from "../../src/isomorphic/assertion"
import { tiktok } from "../../src/isomorphic/prelude"

const tik_tok_1 = async () => {
  for await (const i of tiktok(5)) {
    if (i === 3) {
      break
    }
  }
}

export const run_prelude = async () => {
  await tik_tok_1()
}
