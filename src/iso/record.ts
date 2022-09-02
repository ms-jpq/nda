import { map } from "./iterator.js"

export const constructor = (thing: any): Function => thing.constructor
export const is_object = (thing: unknown) => thing && constructor(thing) === Object
export const is_array = (thing: unknown) => thing && constructor(thing) === Array

export const reconciliate = <T>(lhs: any, rhs: any, replace = false): T => {
  if (is_object(lhs) && is_object(rhs)) {
    const gen = map(
      ([k, v]) => [k, reconciliate(lhs[k], v, replace)] as [string, T],
      Object.entries(rhs),
    )
    const append = Object.fromEntries(gen)
    return { ...lhs, ...append }
  }
  if (is_array(lhs) && is_array(rhs)) {
    return replace ? rhs : [...lhs, ...rhs]
  }
  return rhs
}

export const reconciliate_all = <T>(
  replace: boolean,
  ds1: any,
  ...dss: any[]
): T => {
  let res = ds1
  for (const ds2 of dss) {
    res = reconciliate(ds1, ds2, replace)
  }
  return res
}
