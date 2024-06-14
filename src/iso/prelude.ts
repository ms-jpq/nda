export const id = <const T>(x: T) => x

export const sleep = (ms: number): Promise<void> =>
  new Promise<void>((resolve) => setTimeout(resolve, ms))

export const counter: () => () => number = () =>
  (
    (i) => () =>
      i++
  )(0)

export const timer: () => () => number = () => {
  let prev = performance.now()
  return () => {
    const temp = prev
    const next = (prev = performance.now())
    return next - temp
  }
}

export const tiktok = async function* (
  ms: number,
): AsyncIterableIterator<number> {
  const inc = counter()
  while (true) {
    yield inc()
    await sleep(ms)
  }
}
