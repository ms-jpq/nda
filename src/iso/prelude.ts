export const id = <T>(x: T) => x

export const future = <T>() => {
  let resolve: (value: T) => void = undefined as unknown as any
  let reject: (err: unknown) => void = undefined as unknown as any
  const promise = new Promise<T>((res, rej) => {
    resolve = (value) => res(value)
    reject = (err) => rej(err)
  })
  return { promise, resolve, reject }
}

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
