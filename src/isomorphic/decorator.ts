export const debounce = <F extends (...args: any[]) => any>(
  ms: number,
  fn: F,
) => {
  let s: any = undefined

  return (...args: Parameters<F>) => {
    clearTimeout(s)
    s = setTimeout(fn, ms, ...args)
  }
}

export const throttle = <F extends (...args: any[]) => any>(
  ms: number,
  fn: F,
) => {
  let s: any = undefined
  let throttling = false

  const throttled = (...args: Parameters<F>) => {
    if (throttling) {
      return
    }
    throttling = true
    fn(...args)
  }

  return (...args: Parameters<F>) => {
    clearTimeout(s)
    if (throttling) {
      s = setTimeout(throttled, ms, ...args)
    } else {
      setTimeout(() => (throttling = false), ms)
      throttled(...args)
    }
  }
}
