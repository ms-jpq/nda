import { join } from "./iterator.js"

export const cn = (...classes: (string | Record<string, boolean>)[]): string =>
  join(
    " ",
    (function* () {
      for (const c of classes) {
        if (typeof c === "string") {
          yield c
        } else {
          for (const [k, v] of Object.entries(c)) {
            if (v) {
              yield k
            }
          }
        }
      }
    })(),
  )
