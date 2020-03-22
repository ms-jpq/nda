export const assert: (cond: unknown, _?: string) => asserts cond = (
  cond,
  msg,
) => {
  if (!cond) {
    throw new Error(`- Assertion Error - ${msg ?? ""}`)
  }
}
