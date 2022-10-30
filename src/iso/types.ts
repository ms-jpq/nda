export const constructor = (thing: unknown): Function | undefined =>
  thing?.constructor

export const is_object = (thing: unknown) =>
  thing && constructor(thing) === Object

export const is_array = (thing: unknown) =>
  thing && constructor(thing) === Array
