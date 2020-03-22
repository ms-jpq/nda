export const id = <T>(x: T) => x

export const str = (thing: any): string => thing.toString()

export const future = <T>() => {
  let resolve: (value: T) => void = (undefined as any) as (err: any) => void
  let reject: (err: any) => void = (undefined as any) as (err: any) => void
  const promise = new Promise<T>((res, rej) => {
    resolve = (value) => res(value)
    reject = (err) => rej(err)
  })
  return { promise, resolve, reject }
}

export const sleep = (ms: number) =>
  new Promise<void>((resolve) => setTimeout(resolve, ms))

export const counter = () => ((i) => () => (i += 1))(0)

export const timer = () => {
  let prev = performance.now()
  return () => {
    const temp = prev
    const next = (prev = performance.now())
    return next - temp
  }
}
