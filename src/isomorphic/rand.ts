import { range } from "./list"

export const float = (celi: number) => Math.random() * celi

export const int = (celi: number) =>
  Math.floor(Math.random() * Math.floor(celi + 1))

export const choice = <T>(pool: T[]) => pool[int(pool.length - 1)]

export const choices = <T>(n: number, pool: T[]) => {
  const res = []
  for (const _ of range(1, n)) {
    res.push(choice(pool))
  }
  return res
}

// https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle
export const shuffle = <T>(pool: T[]) => {
  const res = [...pool]
  for (let i = res.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[res[i], res[j]] = [res[j], res[i]]
  }
  return res
}
