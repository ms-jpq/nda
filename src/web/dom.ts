export const $ = <E extends Element = HTMLElement>(
  selector: string,
  base = document.body,
) => (base.querySelector(selector) ?? undefined) as E | undefined

export const $$ = <E extends Element = HTMLElement>(
  selector: string,
  base = document.body,
) => [...base.querySelectorAll(selector)] as E[]

export const ready = () =>
  new Promise<Event>((resolve) =>
    document.addEventListener("DOMContentLoaded", resolve, {
      once: true,
    }),
  )

export const animation_frame = () => new Promise<number>(requestAnimationFrame)

export const animation_loop =
  async function* (): AsyncIterableIterator<number> {
    let t0 = undefined as number | undefined;
    while (true) {
      const now = await animation_frame();
      yield t0 ?? now - now;
      t0 = now;
    }
  };

export const download = (uri: string, name = ""): undefined => {
  const a = document.createElement("a")
  a.style.display = "none"
  a.target = "_blank"
  a.download = name
  a.href = uri
  document.body.append(a)
  a.click()
  a.remove()
  return
}
