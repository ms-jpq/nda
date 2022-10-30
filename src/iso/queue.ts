export const queue = <T>() => {
  const a = new Array<T>()
  const b = new Array<T>()

  return Object.freeze(
    Object.assign(Object.create(null) as {}, {
      enqueue: (...items: T[]) => a.push(...items),
      enqueue_back: (...items: T[]) => b.push(...items),
      dequeue: (): T | undefined => {
        if (!b.length) {
          while (a.length) {
            b.push(a.pop()!)
          }
        }
        return b.pop()
      },
    }),
  )
}
