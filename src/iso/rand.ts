export const float = (floor: number, celi: number): number =>
  Math.random() * (celi - floor) + floor

export const int = (floor: number, celi: number): number =>
  Math.floor(Math.random() * (celi - floor + 1)) + floor

export const choice = <T>(pool: T[]): T | undefined =>
  pool[int(0, pool.length - 1)]
