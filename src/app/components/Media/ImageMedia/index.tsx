'use client'

import { cn } from '@/utilities/cn'
import type { StaticImageData } from 'next/image'
import NextImage from 'next/image'
import React from 'react'
import cssVariables from '../../../cssVariables'
import type { Props as MediaProps } from '../types'

const { breakpoints } = cssVariables

export function ImageMedia(props: MediaProps) {
  const {
    alt: altFromProps,
    fill,
    imgClassName,
    onClick,
    onLoad: onLoadFromProps,
    priority,
    resource,
    size: sizeFromProps,
    src: srcFromProps,
    className,
  } = props

  let width: number | undefined
  let height: number | undefined
  let alt = altFromProps
  let src: StaticImageData | string = srcFromProps || ''
  let focalX = 50
  let focalY = 50

  if (!src && resource && typeof resource === 'object') {
    const { alt: altFromResource, height: fullHeight, url, width: fullWidth } = resource

    focalX = resource.focalX ?? focalX
    focalY = resource.focalY ?? focalY

    width = fullWidth ?? undefined
    height = fullHeight ?? undefined
    alt = altFromResource

    src = `${process.env.NEXT_PUBLIC_SERVER_URL}${url}`
  }

  // NOTE: this is used by the browser to determine which image to download at different screen sizes
  const sizes = sizeFromProps
    ? sizeFromProps
    : Object.entries(breakpoints)
        .map(([, value]) => `(max-width: ${value}px) ${value}px`)
        .join(', ')

  return (
    <NextImage
      alt={alt || ''}
      className={cn(imgClassName, className, {
        'object-cover': fill,
      })}
      fill={fill}
      height={!fill ? height : undefined}
      onClick={onClick}
      onLoad={() => {
        if (typeof onLoadFromProps === 'function') {
          onLoadFromProps()
        }
      }}
      priority={priority}
      quality={90}
      sizes={sizes}
      src={src}
      width={!fill ? width : undefined}
      style={{ objectPosition: `${focalX}% ${focalY}%` }}
    />
  )
}
