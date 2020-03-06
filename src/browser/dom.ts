type E = HTMLElementTagNameMap & Record<string, HTMLElement>

export const $ = <T extends keyof E>(selector: string, base = document.body) =>
  (base.querySelector(selector) ?? undefined) as E[T] | undefined

export const $$ = <T extends keyof E>(selector: string, base = document.body) =>
  [...base.querySelectorAll(selector)] as E[T][]

export const wait_frame = () => new Promise<number>(requestAnimationFrame)

export const img_loaded = (img: HTMLImageElement) => {
  const err = new Error(`img failed to load: ${img.src}`)
  const unsub = () => {
    img.onload = null
    img.onerror = null
  }
  return new Promise((resolve, reject) => {
    if (img.complete) {
      img.naturalWidth === 0 ? reject(err) : resolve()
    } else {
      img.onload = () => (unsub(), resolve())
      img.onerror = () => (unsub(), reject(err))
    }
  })
}
