type Timeout = string | number | NodeJS.Timeout | undefined

export const debounce = <F extends (..._: unknown[]) => unknown>(
  ms: number,
  fn: F,
): ((..._: Parameters<F>) => undefined) => {
  let s: Timeout = undefined

  return (...args: Parameters<F>) => {
    clearTimeout(s)
    s = setTimeout(fn, ms, ...args)
    return undefined
  }
}

export const throttle = <R, F extends (..._: unknown[]) => R>(
  ms: number,
  fn: F,
): ((..._: Parameters<F>) => R | undefined) => {
  let s: Timeout = undefined
  let throttling = false

  const unthrottle = () => (throttling = false)

  const throttled = (...args: Parameters<F>) => {
    if (throttling) {
      return undefined
    }
    throttling = true
    setTimeout(unthrottle, ms)
    return fn(...args)
  }

  return (...args) => {
    clearTimeout(s)
    if (throttling) {
      s = setTimeout(throttled, ms, ...args)
      return undefined
    } else {
      return throttled(...args)
    }
  }
}
