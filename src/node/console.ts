export const big_print = (str: string, top = " ", btm = " ") => {
  const { columns } = process.stdout
  const t = top.repeat(columns)
  const b = btm.repeat(columns)
  return `${t}\n${str}\n${b}`
}
