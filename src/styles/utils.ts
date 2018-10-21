export const px = (val: number) => `${val}px`

export const gradient = (deg = 0) => (...colors: string[]) =>
  `linear-gradient(${deg}deg, ${colors.join(', ')})`

export const textShadow = (depth: number, color: string) => {
  return Array.from({ length: depth })
    .map((_, index) => {
      return `-${index + 1}px ${index + 1}px 0px ${color}`
    })
    .join(', ')
}
