export const float = (floor: number, celi: number) =>
  Math.random() * (celi - floor) + floor

export const int = (floor: number, celi: number) =>
  Math.floor(Math.random() * (celi - floor + 1)) + floor

export const choice = <T>(pool: T[]): T | undefined =>
  pool[int(0, pool.length - 1)]

// https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle
export const shuffle = <T>(pool: T[]) => {
  const res = [...pool]
  for (let i = res.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[res[i], res[j]] = [res[j], res[i]]
  }
  return res
}
