export const $ = <E extends HTMLElement = HTMLElement>(
  selector: string,
  base = document.body,
) => (base.querySelector(selector) ?? undefined) as E | undefined

export const $$ = <E extends HTMLElement = HTMLElement>(
  selector: string,
  base = document.body,
) => [...base.querySelectorAll(selector)] as E[]

export const ready = () =>
  new Promise<void>((resolve) =>
    document.addEventListener("DOMContentLoaded", resolve as any, {
      once: true,
    }),
  )

export const wait_frame = () => new Promise<number>(requestAnimationFrame)

export const animation_loop = async function* () {
  while (true) {
    const elapsed = await wait_frame()
    yield elapsed
  }
}

export const download = (uri: string, name = "") => {
  const a = document.createElement("a")
  a.style.display = "none"
  a.target = "_blank"
  a.download = name
  a.href = uri
  document.body.append(a)
  a.click()
  a.remove()
}
