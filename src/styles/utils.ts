export const px = (val: number) => `${val}px`

export const gradient = (deg = 0) => (...colors: string[]) => `linear-gradient(${deg}deg, ${colors.join(', ')})`
