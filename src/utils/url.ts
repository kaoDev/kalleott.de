export const isAbsolute = (url: string) => {
  return /^[a-z][a-z0-9+.-]*:/.test(url)
}
export const isRelative = (url: string) => {
  return !isAbsolute(url)
}
