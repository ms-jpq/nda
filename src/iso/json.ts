export const loads = <const T = unknown>(json: string) =>
  JSON.parse(json, (_, v) =>
    v !== null && typeof v === "object"
      ? Object.assign(Object.create(null), v)
      : v,
  ) as T

export const dumps = (value: unknown, space?: number) =>
  JSON.stringify(
    value,
    (_, v) =>
      v instanceof Map
        ? Object.fromEntries(v)
        : v instanceof Set
          ? Array.from(v)
          : v,
    space,
  )
