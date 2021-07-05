export const fst = <T>(lst: T[]): T | undefined => lst[0]
export const snd = <T>(lst: T[]): T | undefined => lst[1]
export const last = <T>(lst: T[]): T | undefined => lst[lst.length - 1]

export const reverse = <T>(lst: T[]) => [...lst].reverse()
