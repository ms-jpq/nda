export const $ = <E extends HTMLElement = HTMLElement>(
  selector: string,
  base = document.body,
) => (base.querySelector(selector) ?? undefined) as E | undefined

export const $$ = <E extends HTMLElement = HTMLElement>(
  selector: string,
  base = document.body,
) => [...base.querySelectorAll(selector)] as E[]

export const wait_frame = () => new Promise<number>(requestAnimationFrame)

export const download = (name: string, uri: string) => {
  const a = document.body.appendChild(document.createElement("a"))
  a.target = "_blank"
  a.download = name
  a.href = uri
  a.click()
  a.remove()
}

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
