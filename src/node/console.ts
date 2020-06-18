export const big_print = (str: string, top = " ", btm = " ") => {
  const { columns } = process.stdout
  const t = top.repeat(columns - 2)
  const b = btm.repeat(columns - 2)
  return `${t}\n${str}\n${b}`
}

