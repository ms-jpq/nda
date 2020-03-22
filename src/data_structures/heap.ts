// Priority Queue
export const heap = <T>(key_by: (_: T) => number) => {
  const coll: { val: T; key: number }[] = []

  const parent = (i: number) => Math.floor((i - 1) / 2)
  const left = (i: number) => i * 2 + 1
  const right = (i: number) => i * 2 + 2

  // Min goes down
  const swap_down = () => {
    let i = 0
    while (true) {
      const [l, r] = [left(i), right(i)]
      // IF coll[l] === undefined -> Go Left
      const big = coll[l]?.val < coll[r]?.val ? r : l
      if (coll[i]?.val < coll[big]?.val) {
        ;[coll[i], coll[big]] = [coll[big], coll[i]]
        i = big
      } else {
        break
      }
    }
  }

  // Max goes up
  const swap_up = () => {
    let i = coll.length - 1
    while (true) {
      const p = parent(i)
      if (coll[i]?.val > coll[p]?.val) {
        ;[coll[i], coll[p]] = [coll[p], coll[i]]
        i = p
      } else {
        break
      }
    }
  }

  const peak = (): T | undefined => coll[0]?.val

  const take = (): T | undefined => {
    const val = coll[0]?.val
    const last = coll.pop()
    if (coll.length > 0 && last) {
      coll[0] = last
    }
    swap_down()
    return val
  }

  const put = (val: T) => {
    coll.push({ val, key: key_by(val) })
    swap_up()
  }

  return {
    peak,
    take,
    put,
  }
}
