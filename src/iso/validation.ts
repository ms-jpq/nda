export const non_empty = (thing: string | number | null | undefined) =>
  (thing ?? "") !== ""
